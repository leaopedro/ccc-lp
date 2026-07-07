import { useState, useRef, type FormEvent } from 'react'

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false)
  const [firstName, setFirstName] = useState('')
  const sectionRef = useRef<HTMLElement>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      nome: (form.elements.namedItem('nome') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      whatsapp: (form.elements.namedItem('whatsapp') as HTMLInputElement).value,
      carro: (form.elements.namedItem('carro') as HTMLInputElement).value,
      interesse: (form.elements.namedItem('interesse') as HTMLSelectElement).value,
    }
    console.log('CASA CAR CLUB — novo cadastro na lista de espera:', data)
    const first = data.nome.trim().split(' ')[0] || ''
    setFirstName(first)
    setSubmitted(true)
    const top = (sectionRef.current?.offsetTop ?? 0) - 70
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section
      id="waitlist"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px,11vw,140px) clamp(20px,5vw,56px)',
        background: '#0d0d0d',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
          <span className="eyebrow-line" />
          <span className="eyebrow">Lista de Espera</span>
          <span className="eyebrow-line" />
        </div>
        <h2
          style={{
            margin: '0 0 12px',
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            color: '#F2E8D8',
            fontSize: 'clamp(28px,4.2vw,48px)',
            lineHeight: 1.12,
          }}
        >
          Garanta seu lugar no clube
        </h2>
        <p style={{ margin: '0 auto 40px', maxWidth: 480, fontSize: 15, lineHeight: 1.7, color: '#a99f8d' }}>
          Preencha os dados abaixo e entre para a lista dos primeiros membros do CASA CAR CLUB Curitiba.
        </p>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        {submitted ? (
          <div
            style={{
              textAlign: 'center',
              padding: '56px 32px',
              border: '1px solid #D4AF37',
              borderRadius: 6,
              background: 'linear-gradient(180deg, rgba(212,175,55,0.06), rgba(255,255,255,0))',
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                margin: '0 auto 22px',
                border: '1px solid #D4AF37',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4AF37',
                fontSize: 26,
              }}
            >
              ✓
            </div>
            <h3
              style={{
                margin: '0 0 10px',
                fontFamily: "'Jost', sans-serif",
                fontWeight: 400,
                letterSpacing: '0.06em',
                color: '#F2E8D8',
                fontSize: 24,
              }}
            >
              Você está na lista, {firstName}!
            </h3>
            <p style={{ margin: '0 auto', maxWidth: 400, fontSize: 14.5, lineHeight: 1.7, color: '#c7bfb1' }}>
              Recebemos seu cadastro. Em breve entramos em contato com novidades e o convite para o grupo
              privado no WhatsApp.
            </p>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold"
              style={{ marginTop: 26 }}
            >
              Entrar no Grupo WhatsApp
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'grid',
              gap: 18,
              padding: 'clamp(28px,4vw,44px)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0))',
              border: '1px solid rgba(212,175,55,0.20)',
              borderRadius: 6,
            }}
          >
            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 11, color: '#D4AF37' }}>
                Nome
              </span>
              <input name="nome" type="text" required placeholder="Seu nome completo" className="form-input" />
            </label>

            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 11, color: '#D4AF37' }}>
                E-mail
              </span>
              <input name="email" type="email" required placeholder="voce@email.com" className="form-input" />
            </label>

            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 11, color: '#D4AF37' }}>
                WhatsApp
              </span>
              <input name="whatsapp" type="tel" required placeholder="(41) 90000-0000" className="form-input" />
            </label>

            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 11, color: '#D4AF37' }}>
                Carro / Projeto
              </span>
              <input name="carro" type="text" placeholder="Ex.: Golf GTI, projeto de restauro..." className="form-input" />
            </label>

            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 11, color: '#D4AF37' }}>
                Nível de interesse
              </span>
              <select name="interesse" required className="form-input" style={{ appearance: 'none' }}>
                <option value="membro">Quero me tornar membro</option>
                <option value="evento">Quero visitar um evento</option>
                <option value="parceiro">Quero ser parceiro / patrocinador</option>
                <option value="acompanhar">Só quero acompanhar o projeto</option>
              </select>
            </label>

            <button type="submit" className="btn-gold" style={{ marginTop: 6, justifyContent: 'center' }}>
              Entrar na Lista de Espera
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
