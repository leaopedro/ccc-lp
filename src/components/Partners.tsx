import { WHATSAPP_URL } from '../lib/links'

export default function Partners() {
  return (
    <section
      id="parceiros"
      style={{
        position: 'relative',
        padding: 'clamp(80px,11vw,140px) clamp(20px,5vw,56px)',
        backgroundImage: 'url(/assets/applications.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg,rgba(10,10,10,0.94),rgba(10,10,10,0.8))',
        }}
      />
      <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <span className="eyebrow-line" />
          <span className="eyebrow">Marcas &amp; Parceiros</span>
          <span className="eyebrow-line" />
        </div>

        <h2
          style={{
            margin: 0,
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            color: '#F2E8D8',
            fontSize: 'clamp(28px,4.4vw,52px)',
            lineHeight: 1.12,
          }}
        >
          Seja parceiro do clube
        </h2>

        <p style={{ margin: '26px auto 34px', maxWidth: 600, fontSize: 15.5, lineHeight: 1.75, color: '#c7bfb1' }}>
          O CASA CAR CLUB abre espaço para marcas automotivas, empresas de detailing, oficinas,
          criadores, cafés, marcas de lifestyle e negócios locais se conectarem com uma comunidade
          automotiva qualificada.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-gold"
        >
          Falar no WhatsApp
        </a>
      </div>
    </section>
  )
}
