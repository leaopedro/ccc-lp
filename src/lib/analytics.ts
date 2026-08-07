import { track as vercelTrack } from '@vercel/analytics/react'

// Landing-page conversion events. Names are stable — they map to the
// design handoff's analytics table and to Vercel Analytics custom events.
export type AnalyticsEvent =
  | 'casa_box_preorder_cta_click'
  | 'casa_box_lead_submit'
  | 'whatsapp_group_click'
  | 'pocket_casa_cta_click'

type EventData = Record<string, string | number | boolean | null>

// Thin, SSR-safe wrapper. Never throws — analytics must not break the UI.
export function track(name: AnalyticsEvent, data?: EventData): void {
  try {
    vercelTrack(name, data)
  } catch {
    /* no-op */
  }
}
