import { WHATSAPP_URL, INSTAGRAM_URL } from '../lib/links'

export default function Hero() {
  return (
    <section
      id="inicio"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px clamp(20px,5vw,56px) 80px',
        backgroundImage: 'url(/assets/hero-house.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Left-to-right gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(10,10,10,.92) 0%,rgba(10,10,10,.72) 42%,rgba(10,10,10,.35) 100%)' }} />
      {/* Dim scrim */}
      <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: 0.4 }} />
      {/* Top/bottom vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(10,10,10,.4) 0%,transparent 22%,transparent 70%,rgba(10,10,10,.95) 100%)' }} />

      <div style={{ position: 'relative', maxWidth: 1240, width: '100%', margin: '0 auto' }}>
        <div style={{ maxWidth: 720 }}>
          <div className="hero-anim-0" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
            <span style={{ width: 34, height: 1, background: '#D4AF37', flexShrink: 0 }} />
            <span style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.34em', fontSize: 11.5, textTransform: 'uppercase', color: '#D4AF37' }}>
              Clube Automotivo Privado · Curitiba
            </span>
          </div>

          <h1
            className="hero-anim-1"
            style={{
              margin: 0,
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              color: '#F2E8D8',
              fontSize: 'clamp(38px,6vw,74px)',
              lineHeight: 1.04,
              letterSpacing: '-0.01em',
            }}
          >
            Curitiba ganha uma nova{' '}
            <span style={{ color: '#D4AF37', fontWeight: 400 }}>casa para quem vive carros.</span>
          </h1>

          <p
            className="hero-anim-2"
            style={{
              margin: '26px 0 0',
              maxWidth: 560,
              fontSize: 'clamp(15px,1.6vw,18px)',
              lineHeight: 1.65,
              color: '#c7bfb1',
            }}
          >
            Um clubhouse automotivo privado com eventos, lounge, media hub, detailing, bar &amp; café,
            simulador e uma comunidade construída em torno da cultura automotiva.
          </p>

          <div className="hero-anim-3" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 38 }}>
            <a href="#waitlist" className="btn-gold">
              Entrar na Lista de Espera →
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
              Grupo no WhatsApp
            </a>
          </div>

          <div className="hero-anim-4" style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 34, flexWrap: 'wrap' }}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 13, letterSpacing: '0.06em', color: '#a99f8d' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              @casacarclub.curitiba
            </a>
            <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
            <span style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.24em', fontSize: 11, color: '#D4AF37' }}>
              DRIVE · CONNECT · BELONG
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
