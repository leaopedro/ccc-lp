import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const url = process.env.INSTAGRAM_URL

  if (!url) {
    return res.status(404).send('Instagram link not configured.')
  }

  return res.redirect(307, url)
}
