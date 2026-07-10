/**
 * Decorative QR grid used on the digital member card. This is a deterministic
 * pattern (fixed finder squares + pseudo-random body), NOT a scannable code.
 * In production this should render a real QR encoding the member credential.
 */
export default function QrCode() {
  const n = 21

  const rand = (i: number, j: number) => {
    const v = Math.sin((i + 1) * 12.9898 + (j + 1) * 78.233) * 43758.5453
    return v - Math.floor(v) > 0.5
  }

  const finderBox = (i: number, j: number, r: number, c: number): boolean | null => {
    const li = i - r
    const lj = j - c
    if (li < 0 || li > 6 || lj < 0 || lj > 6) return null
    const border = li === 0 || li === 6 || lj === 0 || lj === 6
    const inner = li >= 2 && li <= 4 && lj >= 2 && lj <= 4
    return border || inner
  }

  const cells = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let on = finderBox(i, j, 0, 0)
      if (on === null) on = finderBox(i, j, 0, n - 7)
      if (on === null) on = finderBox(i, j, n - 7, 0)
      if (on === null) on = rand(i, j)
      cells.push(<div key={`${i}-${j}`} style={{ background: on ? '#0A0A0A' : 'transparent' }} />)
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${n},1fr)`,
        gridTemplateRows: `repeat(${n},1fr)`,
        width: '100%',
        height: '100%',
      }}
    >
      {cells}
    </div>
  )
}
