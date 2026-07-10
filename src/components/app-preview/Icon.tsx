import type { CSSProperties } from 'react'

/** Material Symbols Outlined glyph. Names match the icon font ligatures. */
export default function Icon({
  name,
  size = 24,
  color,
  style,
}: {
  name: string
  size?: number
  color?: string
  style?: CSSProperties
}) {
  return (
    <span className="mi" style={{ fontSize: size, color, ...style }}>
      {name}
    </span>
  )
}
