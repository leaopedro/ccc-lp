import { WHATSAPP_URL, INSTAGRAM_URL } from '../lib/links'
import { track } from '../lib/analytics'

export default function FinalCTA() {
  return (
    <section
      id="contato"
      style={{
        position: 'relative',
        padding: 'clamp(90px,13vw,170px) clamp(20px,5vw,56px)',
        backgroundImage: 'url(/assets/lp/cta-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10,10,10,0.92), rgba(10,10,10,0.86))',
        }}
      />
      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
        <img
          src="/assets/lp/seal.png"
          alt=""
          width={76}
          height={76}
          loading="lazy"
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
          <span style={{ color: '#D4B584', fontWeight: 400 }}>antes de todo mundo.</span>
        </h2>
        <p style={{ margin: '24px auto 40px', maxWidth: 540, fontSize: 16, lineHeight: 1.7, color: '#c7bfb1' }}>
          A CASA Box é a primeira forma de fazer parte.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
          <a href="#pre-venda" onClick={() => track('casa_box_preorder_cta_click')} className="btn-gold">
            Acesso à pré-venda →
          </a>
          <a href={WHATSAPP_URL} onClick={() => track('whatsapp_group_click')} className="btn-outline-gold">
            Grupo WhatsApp
          </a>
          <a href={INSTAGRAM_URL} className="btn-outline-neutral">
            Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
