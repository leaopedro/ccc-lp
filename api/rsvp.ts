import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const DATABASE_ID = process.env.NOTION_RSVP_DATABASE_ID ?? ''

const CAMISETA_SIZES = ['P', 'M', 'G', 'GG']

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { nome, carro, telefone, camiseta } = req.body as {
    nome?: string
    carro?: string
    telefone?: string
    camiseta?: string
  }

  if (!nome || !carro || !telefone || !camiseta) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' })
  }
  if (!CAMISETA_SIZES.includes(camiseta)) {
    return res.status(400).json({ error: 'Tamanho de camiseta inválido.' })
  }

  await notion.pages.create({
    parent: { database_id: DATABASE_ID },
    properties: {
      Nome: { title: [{ text: { content: nome } }] },
      Carro: { rich_text: [{ text: { content: carro } }] },
      Telefone: { phone_number: telefone },
      'Tamanho Camiseta': { select: { name: camiseta } },
    },
  })

  return res.status(200).json({ ok: true })
}
