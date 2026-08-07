import { statusItems, type StatusTone } from '../data/content'

// Per-tone colour + dot treatment. This strip is the page's transparency
// device: what's live, what's soon, what's still a plan.
const TONES: Record<StatusTone, { label: string; title: string; body: string; dot: React.CSSProperties }> = {
  active: {
    label: '#C19A5C',
    title: '#F2E8D8',
    body: '#8d8476',
    dot: { background: '#C19A5C' },
  },
  soon: {
    label: '#C19A5C',
    title: '#F2E8D8',
    body: '#8d8476',
    dot: { border: '1px solid #C19A5C' },
  },
  future: {
    label: '#8a8172',
    title: '#b6ada0',
    body: '#7d7466',
    dot: { border: '1px solid #8a8172' },
  },
}

export default function StatusStrip() {
  return (
    <section
      id="o-casa"
      aria-label="Em que estágio o clube está hoje"
      style={{
        borderTop: '1px solid rgba(193,154,92,0.16)',
        borderBottom: '1px solid rgba(193,154,92,0.16)',
        background: '#0d0d0d',
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))' }}>
        {statusItems.map((item, i) => {
          const tone = TONES[item.tone]
          const isLast = i === statusItems.length - 1
          return (
            <div
              key={item.title}
              style={{
                padding: 'clamp(30px,3.6vw,44px) clamp(22px,3vw,44px)',
                borderRight: isLast ? undefined : '1px solid rgba(193,154,92,0.13)',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: "'Jost', sans-serif", fontSize: 10.5, letterSpacing: '0.26em', textTransform: 'uppercase', color: tone.label }}>
                <span aria-hidden="true" style={{ display: 'block', width: 7, height: 7, borderRadius: '50%', ...tone.dot }} />
                {item.label}
              </span>
              <p style={{ margin: '15px 0 0', fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 'clamp(19px,2.4vw,23px)', lineHeight: 1.28, color: tone.title }}>
                {item.title}
              </p>
              <p style={{ margin: '9px 0 0', fontSize: 14.5, lineHeight: 1.55, color: tone.body }}>
                {item.body}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
