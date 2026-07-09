import type { VercelRequest, VercelResponse } from '@vercel/node'
import { redirectWithBeacon } from '../lib/redirect'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  return redirectWithBeacon(res, process.env.INSTAGRAM_URL, 'Instagram')
}
