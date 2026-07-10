export type Screen = 'home' | 'event' | 'membership' | 'card' | 'community' | 'garage'

export interface AppNav {
  go: (screen: Screen) => void
  booked: boolean
  toggleBooked: () => void
}

// ── Design tokens (shared across screens) ────────────────────────────────
export const GOLD = '#D4AF37'
export const CREAM = '#F2E8D8'
export const GOLD_CTA = 'linear-gradient(135deg,#E8CE86,#C9A227)'

/** Cream text at a given opacity — used for dimmed labels throughout the app. */
export const dim = (o: number) => `rgba(242,232,216,${o})`
