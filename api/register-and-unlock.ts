import type { VercelRequest, VercelResponse } from '@vercel/node'

// ─────────────────────────────────────────────────────────────────────────────
// Server-side proxy: cadastro → unlock da geladeira.
//
// O browser NUNCA vê a FRIDGE_UNLOCK_API_KEY. O fluxo é:
//   browser → POST /api/register-and-unlock (esta função)
//           → POST {BACKEND}/api/fridge/unlock  (com header X-API-Key)
//
// Este handler é totalmente self-contained (sem imports cross-file): as funções
// serverless deste projeto NÃO são bundladas pela Vercel, então qualquer import
// relativo quebraria em produção.
// ─────────────────────────────────────────────────────────────────────────────

const BACKEND_URL = (
  process.env.FRIDGE_BACKEND_URL ?? 'https://ccc-app-production.up.railway.app'
).replace(/\/$/, '')
const UNLOCK_PATH = process.env.FRIDGE_UNLOCK_PATH ?? '/api/fridge/unlock'
const FRIDGE_ID = process.env.FRIDGE_ID ?? 'fridge-01'
const API_KEY = process.env.FRIDGE_UNLOCK_API_KEY ?? ''

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone } = (req.body ?? {}) as {
    name?: string
    email?: string
    phone?: string
  }

  // 1. Validação dos campos
  if (!name || !name.trim() || name.trim().length < 2) {
    return res.status(400).json({ error: 'Nome é obrigatório.' })
  }
  if (!email || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: 'E-mail inválido.' })
  }

  if (!API_KEY) {
    // Falha de configuração do servidor — não expõe detalhes ao cliente.
    console.error('[register-and-unlock] FRIDGE_UNLOCK_API_KEY não configurada')
    return res.status(500).json({ error: 'Servidor não configurado. Tente novamente mais tarde.' })
  }

  // 2. Chamada autenticada server-side ao backend (Railway).
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
        fridgeId: FRIDGE_ID,
        // dados do lead — o backend pode ignorar ou persistir
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || undefined,
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

    if (!backendRes.ok) {
      console.error(
        `[register-and-unlock] backend respondeu ${backendRes.status}:`,
        rawText.slice(0, 500),
      )
      return res.status(502).json({
        error: 'Não foi possível abrir a geladeira. Tente novamente.',
        backendStatus: backendRes.status,
      })
    }

    return res.status(200).json({ ok: true, unlocked: true, fridgeId: FRIDGE_ID, backend: backendBody })
  } catch (err) {
    const aborted = err instanceof Error && err.name === 'AbortError'
    console.error('[register-and-unlock] erro ao chamar backend:', err)
    return res.status(504).json({
      error: aborted
        ? 'O servidor demorou para responder. Tente novamente.'
        : 'Erro de conexão com o servidor. Tente novamente.',
    })
  } finally {
    clearTimeout(timeout)
  }
}
