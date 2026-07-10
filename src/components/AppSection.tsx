import { appFeatures } from '../data/content'
import LazyAppPreview from './app-preview/LazyAppPreview'

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
              Todo o clube{' '}
              <span style={{ color: '#D4AF37', fontWeight: 400 }}>na palma da mão.</span>
            </h2>
            <p style={{ margin: '24px 0 30px', fontSize: 15.5, lineHeight: 1.75, color: '#c7bfb1', maxWidth: 500 }}>
              O CASA CAR CLUB vai ter seu próprio app, pra você viver a experiência do clube de onde estiver.
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

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                padding: '9px 16px',
                border: '1px solid rgba(212,175,55,0.4)',
                borderRadius: 100,
                background: 'rgba(212,175,55,0.06)',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#5FD08A', boxShadow: '0 0 9px #5FD08A', animation: 'ccPulse 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 11.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4AF37' }}>
                Protótipo interativo · toque para explorar
              </span>
            </div>

            <LazyAppPreview />

            <p style={{ margin: 0, textAlign: 'center', maxWidth: 360, fontSize: 12.5, lineHeight: 1.65, color: '#a99f8d' }}>
              Navegue pelas telas e abas tocando na barra inferior. Esta é uma versão preliminar para
              demonstração: o app final ainda está em desenvolvimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
