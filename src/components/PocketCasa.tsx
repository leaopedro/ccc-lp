import { pocketPoints } from '../data/content'
import { WHATSAPP_URL } from '../lib/links'
import { track } from '../lib/analytics'

export default function PocketCasa() {
  return (
    <section
      id="pocket-casa"
      style={{
        padding: 'clamp(72px,10vw,120px) clamp(20px,5vw,80px)',
        background: '#0d0d0d',
        borderTop: '1px solid rgba(193,154,92,0.13)',
        borderBottom: '1px solid rgba(193,154,92,0.13)',
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(32px,5vw,68px)', alignItems: 'center' }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: "'Jost', sans-serif", letterSpacing: '0.3em', fontSize: 11, textTransform: 'uppercase', color: '#C19A5C' }}>
            <span aria-hidden="true" style={{ display: 'block', width: 26, height: 1, background: '#C19A5C' }} />
            Já está acontecendo
          </span>
          <h2 style={{ margin: '20px 0 0', fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 'clamp(30px,4.4vw,48px)', lineHeight: 1.08, letterSpacing: '-0.015em', color: '#F2E8D8', textWrap: 'balance' }}>
            Um primeiro <span style={{ color: '#D4B584', fontWeight: 400 }}>ponto de encontro</span> para a comunidade.
          </h2>
          <p style={{ margin: '22px 0 0', maxWidth: 500, fontSize: 'clamp(15px,2vw,17px)', lineHeight: 1.62, color: '#a99f8d', textWrap: 'pretty' }}>
            Um espaço do clube dentro da Vortex Detail, em Curitiba. Para tomar um café, trocar ideia e encontrar quem já faz parte.
          </p>
          <ul style={{ listStyle: 'none', margin: '26px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {pocketPoints.map((point) => (
              <li key={point} style={{ display: 'flex', gap: 11, fontSize: 14.5, color: '#a99f8d' }}>
                <span aria-hidden="true" style={{ color: '#C19A5C' }}>—</span>
                {point}
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP_URL}
            onClick={() => track('pocket_casa_cta_click')}
            className="btn-outline-gold"
            style={{ marginTop: 30, fontSize: 12.5 }}
          >
            Acompanhar os próximos encontros →
          </a>
        </div>
        <figure style={{ margin: 0 }}>
          <img
            src="/assets/lp/pocket-casa.png"
            alt="Lounge do Pocket CASA dentro da Vortex Detail: letreiro CASA iluminado, sofá de couro e prateleiras com miniaturas e capacetes."
            width={1456}
            height={1400}
            loading="lazy"
            style={{ width: '100%', height: 'auto', aspectRatio: '4 / 3', objectFit: 'cover', objectPosition: '34% 50%', border: '1px solid rgba(193,154,92,0.18)', borderRadius: 3 }}
          />
          <figcaption style={{ marginTop: 12, fontSize: 12.5, color: '#7d7466' }}>
            Pocket CASA dentro da Vortex Detail, Curitiba.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
