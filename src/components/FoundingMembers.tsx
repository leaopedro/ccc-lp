import { memberBenefits } from '../data/content'

export default function FoundingMembers() {
  return (
    <section
      id="membros"
      style={{
        padding: 'clamp(80px,11vw,140px) clamp(20px,5vw,56px)',
        background: '#0d0d0d',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(30px,5vw,64px)',
            alignItems: 'center',
          }}
        >
          <div style={{ order: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span className="eyebrow-line" />
              <span className="eyebrow">Acesso Antecipado</span>
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                color: '#F2E8D8',
                fontSize: 'clamp(28px,4.2vw,52px)',
                lineHeight: 1.1,
              }}
            >
              Seja um dos{' '}
              <span style={{ color: '#D4AF37', fontWeight: 400 }}>primeiros nomes do clube.</span>
            </h2>
            <p style={{ margin: '24px 0 30px', fontSize: 15.5, lineHeight: 1.75, color: '#c7bfb1', maxWidth: 520 }}>
              Founding member é quem vai poder dizer "eu tava lá quando tudo era mato",
              e ainda leva vantagem por ter chegado antes de todo mundo.
            </p>
            <ul style={{ listStyle: 'none', margin: '0 0 34px', padding: 0, display: 'grid', gap: 15 }}>
              {memberBenefits.map((benefit) => (
                <li key={benefit} style={{ display: 'flex', alignItems: 'center', gap: 13, fontSize: 15, color: '#c7bfb1' }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 22,
                      height: 22,
                      border: '1px solid #D4AF37',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#D4AF37',
                      fontSize: 11,
                    }}
                  >
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="btn-gold">
              Entrar na Lista de Espera →
            </a>
          </div>

          <div
            style={{
              order: 1,
              position: 'relative',
              border: '1px solid rgba(212,175,55,0.20)',
              borderRadius: 6,
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            }}
          >
            <img src="/assets/member-cards.webp" alt="Cartões de membro Casa Car Club" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
