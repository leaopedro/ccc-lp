import { featureCards } from '../data/content'
import FeatureCard from './FeatureCard'

export default function ClubFeatures() {
  return (
    <section
      id="clube"
      style={{
        padding: 'clamp(70px,9vw,120px) clamp(20px,5vw,56px)',
        background: '#0d0d0d',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 20,
            marginBottom: 52,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <span className="eyebrow-line" />
              <span className="eyebrow">A Experiência</span>
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                color: '#F2E8D8',
                fontSize: 'clamp(28px,4vw,48px)',
                lineHeight: 1.1,
              }}
            >
              O que o clube vai ter
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: 360, fontSize: 14.5, lineHeight: 1.7, color: '#a99f8d' }}>
            Tudo em um só endereço — pensado para quem leva a paixão automotiva a sério.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(268px, 1fr))',
            gap: 20,
          }}
        >
          {featureCards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
