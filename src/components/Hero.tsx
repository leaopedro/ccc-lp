import { WHATSAPP_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../lib/links'
import { track } from '../lib/analytics'

export default function Hero() {
  return (
    <section
      id="inicio"
      style={{
        position: 'relative',
        minHeight: 'clamp(640px, 94vh, 960px)',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '128px clamp(20px,5vw,80px) clamp(48px,7vh,88px)',
      }}
    >
      <picture>
        <source media="(max-width: 760px)" srcSet="/assets/lp/hero-mobile-v2.jpg" />
        <img
          src="/assets/lp/hero-desktop-v2.jpg"
          alt="Caixa CASA Box sobre uma bancada de oficina, com um carro esportivo escuro ao fundo."
          width={2400}
          height={1324}
          fetchPriority="high"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '62% 42%' }}
        />
      </picture>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(102deg, rgba(10,10,10,.92) 0%, rgba(10,10,10,.7) 30%, rgba(10,10,10,.05) 58%, rgba(10,10,10,.12) 100%)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,.88) 0%, rgba(10,10,10,0) 26%)' }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ maxWidth: 640 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: "'Jost', sans-serif", letterSpacing: '0.3em', fontSize: 'clamp(9.5px,1.6vw,11px)', textTransform: 'uppercase', color: '#C19A5C' }}>
            <span aria-hidden="true" style={{ display: 'block', width: 26, height: 1, background: '#C19A5C', flexShrink: 0 }} />
            CASA CAR CLUB · CURITIBA · EST. 2026
          </span>

          <h1 style={{ margin: '22px 0 0', fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 'clamp(40px,7.2vw,76px)', lineHeight: 1.03, letterSpacing: '-0.015em', color: '#F2E8D8', textWrap: 'balance' }}>
            A comunidade <span style={{ color: '#D4B584', fontWeight: 400 }}>de quem vive carros.</span>
          </h1>

          <p style={{ margin: '26px 0 0', maxWidth: 540, fontSize: 'clamp(15px,2.4vw,18px)', lineHeight: 1.65, color: '#c7bfb1', textWrap: 'pretty' }}>
            Uma comunidade ativa, um ponto de encontro na Vortex Detail e, em breve, a CASA Box.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 34 }}>
            <a href="#pre-venda" onClick={() => track('casa_box_preorder_cta_click')} className="btn-gold" style={{ fontSize: 12.5 }}>
              Quero acesso à pré-venda →
            </a>
            <a href={WHATSAPP_URL} onClick={() => track('whatsapp_group_click')} className="btn-outline-neutral" style={{ fontSize: 12.5, borderColor: 'rgba(255,255,255,0.2)' }}>
              Entrar no grupo do WhatsApp
            </a>
          </div>

          <p style={{ margin: '26px 0 0', fontFamily: "'Jost', sans-serif", fontSize: 11.5, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#8a8172' }}>
            CASA Box em fase final · Primeiras entregas em Curitiba
          </p>

          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 22, marginTop: 30 }}>
            <a href={INSTAGRAM_URL} className="link-muted" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 13, letterSpacing: '0.06em' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              @{INSTAGRAM_HANDLE}
            </a>
            <span aria-hidden="true" style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
            <span style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.24em', fontSize: 11, color: '#C19A5C' }}>
              DRIVE · CONNECT · BELONG
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
