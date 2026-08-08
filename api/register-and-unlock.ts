import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Client } from '@notionhq/client'

// ─────────────────────────────────────────────────────────────────────────────
// Server-side proxy: cadastro (Notion) → unlock da geladeira (Railway).
//
// O browser NUNCA vê a FRIDGE_UNLOCK_API_KEY nem o token do Notion. Fluxo:
//   browser → POST /api/register-and-unlock (esta função)
//           → salva o lead no Notion (best-effort)
//           → POST {BACKEND}/api/fridge/unlock  (header X-API-Key)
//
// Handler self-contained (sem imports cross-file relativos): as funções
// serverless deste projeto NÃO são bundladas pela Vercel. Imports de PACOTES
// (@notionhq/client) são ok — igual a api/waitlist.ts.
//
// O device é fixo no servidor (fridge-01): o backend NÃO recebe id nenhum e o
// schema do body é .strict() — qualquer campo extra => 400. Body aceito, todos
// opcionais: { name (1-120), email (válido), phone (3-32) }.
// ─────────────────────────────────────────────────────────────────────────────

const BACKEND_URL = (
  process.env.FRIDGE_BACKEND_URL ?? 'https://ccc-app-production.up.railway.app'
).replace(/\/$/, '')
const UNLOCK_PATH = process.env.FRIDGE_UNLOCK_PATH ?? '/api/fridge/unlock'
const API_KEY = process.env.FRIDGE_UNLOCK_API_KEY ?? ''

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const FRIDGE_DB_ID = process.env.NOTION_FRIDGE_DATABASE_ID ?? ''

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Garante que o database tenha as colunas necessárias e descobre o nome real da
// coluna-título. IMPORTANTE: o SDK v5 usa a API 2026-03-11, em que o schema
// (colunas) vive na DATA SOURCE do database, não no database. Então:
//   databases.retrieve -> pega o data_source_id
//   dataSources.retrieve -> lê as colunas atuais
//   dataSources.update -> cria Email/Phone se faltarem
// (databases.update NÃO altera o schema nessa API — era o bug do "not a property").
// Resultado é cacheado por dbId enquanto a função estiver "quente".
type SchemaInfo = { titleName: string; dataSourceId: string }
const schemaCache = new Map<string, SchemaInfo>()

async function ensureSchema(dbId: string): Promise<SchemaInfo> {
  const cached = schemaCache.get(dbId)
  if (cached) return cached

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = (await notion.databases.retrieve({ database_id: dbId })) as any
  const dataSourceId: string | undefined = db.data_sources?.[0]?.id
  if (!dataSourceId) throw new Error('database sem data source')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ds = (await notion.dataSources.retrieve({ data_source_id: dataSourceId })) as any
  const props: Record<string, { type: string }> = ds.properties ?? {}
  const titleName = Object.keys(props).find((k) => props[k].type === 'title') ?? 'Name'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toAdd: Record<string, any> = {}
  if (!props['Email']) toAdd['Email'] = { email: {} }
  if (!props['Phone']) toAdd['Phone'] = { phone_number: {} }
  if (Object.keys(toAdd).length > 0) {
    await notion.dataSources.update({ data_source_id: dataSourceId, properties: toAdd })
  }

  const info: SchemaInfo = { titleName, dataSourceId }
  schemaCache.set(dbId, info)
  return info
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone } = (req.body ?? {}) as {
    name?: string
    email?: string
    phone?: string
  }

  // 1. Validação
  const cleanName = (name ?? '').trim()
  const cleanEmail = (email ?? '').trim()
  const cleanPhone = (phone ?? '').trim()

  if (!cleanName || cleanName.length < 2) {
    return res.status(400).json({ error: 'Nome é obrigatório.' })
  }
  if (!EMAIL_RE.test(cleanEmail)) {
    return res.status(400).json({ error: 'E-mail inválido.' })
  }

  if (!API_KEY) {
    console.error('[register-and-unlock] FRIDGE_UNLOCK_API_KEY não configurada')
    return res.status(500).json({ error: 'Servidor não configurado. Tente novamente mais tarde.' })
  }

  // Respeitar os limites do schema .strict() do backend
  const nameForBackend = cleanName.slice(0, 120)
  // phone só entra se tiver 3-32 chars (senão o backend rejeita)
  const phoneForBackend =
    cleanPhone.length >= 3 && cleanPhone.length <= 32 ? cleanPhone : undefined

  // 2. Salvar o lead no Notion (best-effort — não bloqueia o unlock se falhar).
  // saveError é um código de diagnóstico SEGURO (não vaza segredos) para
  // sabermos, pela resposta, por que a persistência falhou.
  let saved = false
  let saveError: string | undefined
  if (!FRIDGE_DB_ID) saveError = 'missing_db_id'
  else if (!process.env.NOTION_TOKEN) saveError = 'missing_token'
  else {
    try {
      const { titleName, dataSourceId } = await ensureSchema(FRIDGE_DB_ID)

      type NotionProps = Parameters<typeof notion.pages.create>[0]['properties']
      const properties: NotionProps = {
        [titleName]: { title: [{ text: { content: nameForBackend } }] },
        Email: { email: cleanEmail },
      }
      if (cleanPhone) properties['Phone'] = { phone_number: cleanPhone }

      await notion.pages.create({
        parent: { type: 'data_source_id', data_source_id: dataSourceId },
        properties,
      })
      saved = true
    } catch (err) {
      // Não derruba o unlock por causa do Notion — só registra.
      // Notion SDK expõe `.code` (ex.: object_not_found, unauthorized,
      // validation_error) — seguro para devolver como diagnóstico.
      const code = (err as { code?: string }).code
      const msg = err instanceof Error ? err.message : String(err)
      // Inclui a mensagem do Notion (ex.: qual coluna/tipo falhou) — é segura.
      saveError = (code ? `${code}: ` : '') + msg.slice(0, 300)
      console.error('[register-and-unlock] falha ao salvar lead no Notion:', err)
    }
  }

  // 3. Chamada autenticada server-side ao backend (Railway) → unlock.
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15_000)

  try {
    const backendRes = await fetch(`${BACKEND_URL}${UNLOCK_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify({
        name: nameForBackend,
        email: cleanEmail,
        ...(phoneForBackend ? { phone: phoneForBackend } : {}),
      }),
      signal: controller.signal,
    })

    const rawText = await backendRes.text()
    let backendBody: unknown = rawText
    try {
      backendBody = rawText ? JSON.parse(rawText) : {}
    } catch {
      /* resposta não-JSON — mantém texto cru */
    }

    if (backendRes.ok) {
      return res.status(200).json({ ok: true, unlocked: true, saved, saveError, backend: backendBody })
    }

    // 4. Mapear os erros conhecidos do backend para mensagens claras.
    console.error(
      `[register-and-unlock] backend respondeu ${backendRes.status}:`,
      rawText.slice(0, 500),
    )
    switch (backendRes.status) {
      case 401:
        // API key inválida → problema de config do servidor, não do usuário.
        return res.status(500).json({ error: 'Servidor não configurado. Tente novamente mais tarde.' })
      case 503:
        return res
          .status(503)
          .json({ error: 'A geladeira está offline no momento. Tente novamente em instantes.', saved, saveError })
      case 429:
        return res
          .status(429)
          .json({ error: 'Muitas tentativas. Aguarde um minuto e tente de novo.', saved, saveError })
      default:
        return res.status(502).json({
          error: 'Não foi possível abrir a geladeira. Tente novamente.',
          backendStatus: backendRes.status,
          saved,
          saveError,
        })
    }
  } catch (err) {
    const aborted = err instanceof Error && err.name === 'AbortError'
    console.error('[register-and-unlock] erro ao chamar backend:', err)
    return res.status(504).json({
      error: aborted
        ? 'O servidor demorou para responder. Tente novamente.'
        : 'Erro de conexão com o servidor. Tente novamente.',
      saved,
      saveError,
    })
  } finally {
    clearTimeout(timeout)
  }
}
