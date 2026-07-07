import { appFeatures } from '../data/content'

export default function AppSection() {
  return (
    <section
      id="app"
      style={{ padding: 'clamp(80px,11vw,140px) clamp(20px,5vw,56px)', background: '#0A0A0A' }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(30px,5vw,60px)',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span className="eyebrow-line" />
              <span className="eyebrow">O App do Clube</span>
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                color: '#F2E8D8',
                fontSize: 'clamp(28px,4.2vw,50px)',
                lineHeight: 1.12,
              }}
            >
              Membership, eventos e acesso — tudo em um app.
            </h2>
            <p style={{ margin: '24px 0 30px', fontSize: 15.5, lineHeight: 1.75, color: '#c7bfb1', maxWidth: 500 }}>
              O clube vai ter seu próprio aplicativo, feito para viver a experiência CASA CAR CLUB do bolso.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 14,
              }}
            >
              {appFeatures.map((feature) => (
                <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 14, color: '#c7bfb1' }}>
                  <span style={{ color: '#D4AF37', flexShrink: 0 }}>✦</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <img
              src="/assets/app-screens.png"
              alt="Aplicativo Casa Car Club"
              style={{ width: '100%', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.7))' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
