import { tiers } from '../data/content'
import { track } from '../lib/analytics'

export default function CasaBox() {
  return (
    <section id="casa-box" style={{ padding: 'clamp(72px,10vw,132px) clamp(20px,5vw,80px)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        {/* Intro */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: "'Jost', sans-serif", letterSpacing: '0.3em', fontSize: 11, textTransform: 'uppercase', color: '#C19A5C' }}>
              <span aria-hidden="true" style={{ display: 'block', width: 26, height: 1, background: '#C19A5C' }} />
              O primeiro produto da CASA
            </span>
            <h2 style={{ margin: '20px 0 0', fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 'clamp(32px,5vw,54px)', lineHeight: 1.06, letterSpacing: '-0.015em', color: '#F2E8D8' }}>
              O clube <span style={{ color: '#D4B584', fontWeight: 400 }}>chega até você.</span>
            </h2>
            <p style={{ margin: '22px 0 0', maxWidth: 500, fontSize: 'clamp(15px,2vw,17px)', lineHeight: 1.62, color: '#a99f8d', textWrap: 'pretty' }}>
              Uma assinatura mensal com produtos, colecionáveis e benefícios da comunidade CASA, entregues na sua casa.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="/assets/lp/box-closeup.jpg"
              alt="Caixa CASA Box fechada, preta com o logotipo dourado em relevo."
              width={1500}
              height={1391}
              loading="lazy"
              style={{ width: '100%', maxWidth: 520, height: 'auto', borderRadius: 3 }}
            />
          </div>
        </div>

        {/* Tier cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(16px,2vw,26px)', marginTop: 'clamp(48px,6vw,76px)' }}>
          {tiers.map((tier) => (
            <article key={tier.name} className={tier.featured ? 'tier-card tier-card--featured' : 'tier-card'}>
              <img
                src={tier.image}
                alt={tier.alt}
                width={1200}
                height={1485}
                loading="lazy"
                style={{ width: '100%', height: 'auto', aspectRatio: '4 / 5', objectFit: 'cover', objectPosition: 'center 48%' }}
              />
              <div style={{ padding: '26px 24px 30px' }}>
                <h3 style={{ margin: 0, fontFamily: "'Jost', sans-serif", fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: 15, color: '#F2E8D8' }}>
                  {tier.name}
                </h3>
                {tier.foundingLabel && (
                  <p style={{ margin: '10px 0 0', fontFamily: "'Jost', sans-serif", fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C19A5C' }}>
                    {tier.foundingLabel}
                  </p>
                )}
                <p style={{ margin: '10px 0 0', fontSize: 14.5, lineHeight: 1.58, color: '#a99f8d' }}>
                  {tier.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, marginTop: 'clamp(32px,4vw,48px)' }}>
          <a href="#pre-venda" onClick={() => track('casa_box_preorder_cta_click')} className="btn-gold" style={{ fontSize: 12.5 }}>
            Avisar quando a pré-venda abrir →
          </a>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: '#7d7466', maxWidth: 420 }}>
            Pré-venda em breve. As primeiras entregas são só em Curitiba.
          </p>
        </div>
      </div>
    </section>
  )
}
