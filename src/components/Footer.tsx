import { WHATSAPP_URL, INSTAGRAM_URL, COMMERCIAL_EMAIL } from '../lib/links'
import { track } from '../lib/analytics'

export default function Footer() {
  return (
    <footer
      style={{
        padding: 'clamp(48px,6vw,72px) clamp(20px,5vw,80px) 40px',
        borderTop: '1px solid rgba(193,154,92,0.16)',
        background: '#0A0A0A',
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 40,
          alignItems: 'start',
        }}
      >
        <div>
          <img
            src="/assets/lp/lockup-horizontal.png"
            alt="CASA CAR CLUB Curitiba"
            width={1220}
            height={440}
            loading="lazy"
            style={{ width: 250, height: 'auto', marginLeft: -8 }}
          />
          <p style={{ margin: '4px 0 0', maxWidth: 330, fontSize: 14.5, lineHeight: 1.6, color: '#8d8476' }}>
            Comunidade automotiva, produtos e experiências para quem vive carros.
          </p>
        </div>

        <nav aria-label="Rodapé" style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14 }}>
          <a href={INSTAGRAM_URL} className="link-muted">Instagram</a>
          <a href={WHATSAPP_URL} onClick={() => track('whatsapp_group_click')} className="link-muted">Grupo do WhatsApp</a>
          <a href={`mailto:${COMMERCIAL_EMAIL}`} className="link-muted">{COMMERCIAL_EMAIL}</a>
          <a href="/privacy" className="link-muted">Política de privacidade</a>
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
          <p style={{ margin: 0, fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#C19A5C' }}>
            Uma CASA se constrói<br />de dentro para fora.
          </p>
          <p style={{ margin: 0, fontSize: 12.5, color: '#6f675b' }}>
            © 2026 CASA CAR CLUB Curitiba. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
