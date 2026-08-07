import { communityCells } from '../data/content'
import { WHATSAPP_URL, INSTAGRAM_URL } from '../lib/links'
import { track } from '../lib/analytics'

// Text-only by design: the club has no community photography to supply yet.
// If real photos arrive, swap these cells for 3/2 figures.
export default function Community() {
  return (
    <section id="comunidade" style={{ padding: 'clamp(72px,10vw,132px) clamp(20px,5vw,80px)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: "'Jost', sans-serif", letterSpacing: '0.3em', fontSize: 11, textTransform: 'uppercase', color: '#C19A5C' }}>
          <span aria-hidden="true" style={{ display: 'block', width: 26, height: 1, background: '#C19A5C' }} />
          Comunidade
        </span>
        <h2 style={{ margin: '20px 0 0', maxWidth: 760, fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 'clamp(30px,4.6vw,52px)', lineHeight: 1.07, letterSpacing: '-0.015em', color: '#F2E8D8', textWrap: 'balance' }}>
          Não estamos esperando <span style={{ color: '#D4B584', fontWeight: 400 }}>uma sede para começar.</span>
        </h2>
        <p style={{ margin: '22px 0 0', maxWidth: 560, fontSize: 'clamp(15px,2vw,17px)', lineHeight: 1.62, color: '#a99f8d', textWrap: 'pretty' }}>
          Não tem lista de espera para conversar sobre carro. O grupo está aberto e os encontros já acontecem.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 1,
            marginTop: 'clamp(38px,4.5vw,56px)',
            background: 'rgba(193,154,92,0.16)',
            border: '1px solid rgba(193,154,92,0.16)',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          {communityCells.map((cell) => (
            <div key={cell.label} style={{ background: '#0A0A0A', padding: '30px 26px 32px' }}>
              <p style={{ margin: 0, fontFamily: "'Jost', sans-serif", fontSize: 10.5, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C19A5C' }}>
                {cell.label}
              </p>
              <p style={{ margin: '12px 0 0', fontSize: 14.5, lineHeight: 1.6, color: '#a99f8d' }}>
                {cell.line}
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginTop: 'clamp(32px,4vw,44px)' }}>
          <a href={WHATSAPP_URL} onClick={() => track('whatsapp_group_click')} className="btn-gold" style={{ fontSize: 12.5 }}>
            Entrar no grupo do WhatsApp
          </a>
          <a href={INSTAGRAM_URL} className="btn-outline-neutral" style={{ fontSize: 12.5, borderColor: 'rgba(255,255,255,0.18)' }}>
            Ver no Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
