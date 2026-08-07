import { footerLinks } from './content'

export default function Footer() {
  return (
    <footer style={{ padding: 'clamp(50px,7vw,80px) clamp(20px,5vw,56px) 40px', background: '#0A0A0A' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 40,
            paddingBottom: 44,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 18 }}>
              <img src="/assets/badge.png" alt="Casa Car Club" style={{ width: 48, height: 48, borderRadius: '50%' }} />
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, letterSpacing: '0.26em', fontSize: 15, color: '#F2E8D8' }}>
                  CASA CAR CLUB
                </span>
                <span style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.42em', fontSize: 9.5, color: '#C19A5C' }}>
                  CURITIBA
                </span>
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: '#a99f8d' }}>
              Uma casa privada para quem vive carros. Garagem, cultura, eventos e comunidade em Curitiba.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 'clamp(40px,7vw,90px)', flexWrap: 'wrap' }}>
            <div>
              <h3
                style={{
                  margin: '0 0 16px',
                  fontFamily: "'Jost', sans-serif",
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontSize: 11,
                  color: '#C19A5C',
                }}
              >
                Navegue
              </h3>
              <div style={{ display: 'grid', gap: 11 }}>
                {footerLinks.navegue.map((link) => (
                  <a key={link.href} href={link.href} style={{ fontSize: 13.5, color: '#c7bfb1' }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3
                style={{
                  margin: '0 0 16px',
                  fontFamily: "'Jost', sans-serif",
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontSize: 11,
                  color: '#C19A5C',
                }}
              >
                Conecte-se
              </h3>
              <div style={{ display: 'grid', gap: 11 }}>
                {footerLinks.conecte.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    style={{ fontSize: 13.5, color: '#c7bfb1' }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            paddingTop: 26,
          }}
        >
          <span style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.28em', fontSize: 11, color: '#C19A5C' }}>
            DRIVE · CONNECT · BELONG
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', fontSize: 12, color: '#a99f8d' }}>
            <a href="/privacy" style={{ fontSize: 12, color: '#a99f8d' }}>
              Privacidade
            </a>
            <span>© 2026 CASA CAR CLUB Curitiba. Todos os direitos reservados.</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
