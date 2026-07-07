import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const url = process.env.WHATSAPP_URL

  if (!url) {
    return res.status(404).send('WhatsApp link not configured.')
  }

  return res.redirect(307, url)
}
