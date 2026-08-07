export type Screen = 'home' | 'event' | 'membership' | 'card' | 'community' | 'garage'

export interface AppNav {
  go: (screen: Screen) => void
  booked: boolean
  toggleBooked: () => void
}

// ── Design tokens (shared across screens) ────────────────────────────────
export const GOLD = '#C19A5C'
export const CREAM = '#F2E8D8'
export const GOLD_CTA = 'linear-gradient(135deg,#D4B584,#A5834A)'

/** Cream text at a given opacity — used for dimmed labels throughout the app. */
export const dim = (o: number) => `rgba(242,232,216,${o})`
