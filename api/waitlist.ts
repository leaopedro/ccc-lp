import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const DATABASE_ID = process.env.NOTION_DATABASE_ID ?? ''

const INTERESSE_LABELS: Record<string, string> = {
  membro: 'Quero me tornar membro',
  evento: 'Quero visitar um evento',
  parceiro: 'Quero ser parceiro / patrocinador',
  acompanhar: 'Só quero acompanhar o projeto',
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { nome, email, whatsapp, carro, interesse } = req.body as {
    nome: string
    email: string
    whatsapp: string
    carro?: string
    interesse: string
  }

  if (!nome || !email || !whatsapp || !interesse) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' })
  }

  await notion.pages.create({
    parent: { database_id: DATABASE_ID },
    properties: {
      Nome: {
        title: [{ text: { content: nome } }],
      },
      Email: {
        email,
      },
      WhatsApp: {
        rich_text: [{ text: { content: whatsapp } }],
      },
      Carro: {
        rich_text: [{ text: { content: carro ?? '' } }],
      },
      Interesse: {
        select: { name: INTERESSE_LABELS[interesse] ?? interesse },
      },
    },
  })

  return res.status(200).json({ ok: true })
}
