import { WHATSAPP_URL, INSTAGRAM_URL } from '../lib/links'

export default function FinalCTA() {
  return (
    <section
      id="contato"
      style={{
        position: 'relative',
        padding: 'clamp(90px,13vw,170px) clamp(20px,5vw,56px)',
        backgroundImage: 'url(/assets/event-hall.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10,10,10,0.9), rgba(10,10,10,0.82))',
        }}
      />
      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
        <img
          src="/assets/badge.png"
          alt="Casa Car Club"
          style={{ width: 76, height: 76, borderRadius: '50%', margin: '0 auto 30px' }}
        />
        <h2
          style={{
            margin: 0,
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            color: '#F2E8D8',
            fontSize: 'clamp(32px,5.4vw,64px)',
            lineHeight: 1.08,
          }}
        >
          Esteja lá{' '}
          <span style={{ color: '#D4AF37', fontWeight: 400 }}>antes de todo mundo.</span>
        </h2>
        <p style={{ margin: '24px auto 40px', maxWidth: 520, fontSize: 16, lineHeight: 1.7, color: '#c7bfb1' }}>
          O primeiro capítulo do CASA CAR CLUB Curitiba começa agora. Faça parte dele.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
          <a href="#waitlist" className="btn-gold">
            Lista de Espera
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
            Grupo WhatsApp
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-neutral">
            Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
