import { useState, useRef, type FormEvent, type ChangeEvent } from 'react'
import { submitToWaitlist, type WaitlistEntry } from '../lib/waitlist'
import { isDisabled } from '../lib/formConfig'
import { WHATSAPP_URL } from '../lib/links'

type Status = 'idle' | 'loading' | 'success' | 'error'

// ── Masking ────────────────────────────────────────────────────────────────

function maskPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

// ── Validation ─────────────────────────────────────────────────────────────

function validateNome(v: string) {
  if (!v.trim()) return 'Nome é obrigatório.'
  if (v.trim().length < 2) return 'Nome muito curto.'
  if (!/^[\p{L}\s'-]+$/u.test(v.trim())) return 'Nome inválido.'
  return ''
}

function validateEmail(v: string) {
  if (!v.trim()) return 'E-mail é obrigatório.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'E-mail inválido.'
  return ''
}

function validateWhatsApp(v: string) {
  if (!v.trim()) return 'WhatsApp é obrigatório.'
  const digits = v.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 11) return 'Número incompleto. Ex: (41) 99999-9999'
  return ''
}

// ── Styles ─────────────────────────────────────────────────────────────────

const labelStyle = {
  fontFamily: "'Jost', sans-serif",
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  fontSize: 11,
  color: '#D4AF37',
}

const errorStyle = {
  fontSize: 12,
  color: '#e07070',
  marginTop: 4,
}

// ── Component ──────────────────────────────────────────────────────────────

export default function WaitlistForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [firstName, setFirstName] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof WaitlistEntry, string>>>({})
  const sectionRef = useRef<HTMLElement>(null)

  const showNome      = !isDisabled('nome')
  const showEmail     = !isDisabled('email')
  const showWhatsapp  = !isDisabled('whatsapp')
  const showCarro     = !isDisabled('carro')
  const showInteresse = !isDisabled('interesse')

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    setPhone(maskPhone(e.target.value))
    if (errors.whatsapp) setErrors(prev => ({ ...prev, whatsapp: '' }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    // Honeypot — bail silently if filled by a bot
    const trap = (form.elements.namedItem('_trap') as HTMLInputElement)?.value
    if (trap) return

    const values = {
      nome:      showNome      ? (form.elements.namedItem('nome')      as HTMLInputElement).value  : '',
      email:     showEmail     ? (form.elements.namedItem('email')     as HTMLInputElement).value  : '',
      whatsapp:  showWhatsapp  ? phone                                                              : '',
      carro:     showCarro     ? (form.elements.namedItem('carro')     as HTMLInputElement).value  : '',
      interesse: showInteresse ? (form.elements.namedItem('interesse') as HTMLSelectElement).value : '',
    }

    // Client-side validation
    const newErrors: typeof errors = {}
    if (showNome)     newErrors.nome     = validateNome(values.nome)
    if (showEmail)    newErrors.email    = validateEmail(values.email)
    if (showWhatsapp) newErrors.whatsapp = validateWhatsApp(values.whatsapp)

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors)
      return
    }

    setStatus('loading')
    setSubmitError('')

    // Only send fields that are active
    const entry: Partial<WaitlistEntry> = {}
    if (showNome)      entry.nome      = values.nome.trim()
    if (showEmail)     entry.email     = values.email.trim()
    if (showWhatsapp)  entry.whatsapp  = values.whatsapp
    if (showCarro)     entry.carro     = values.carro.trim()
    if (showInteresse) entry.interesse = values.interesse

    entry.consent_at = new Date().toISOString()

    try {
      await submitToWaitlist(entry as WaitlistEntry)
      setFirstName(values.nome.trim().split(' ')[0] || '')
      setStatus('success')
      const top = (sectionRef.current?.offsetTop ?? 0) - 70
      window.scrollTo({ top, behavior: 'smooth' })
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.')
      setStatus('error')
    }
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
        {status === 'success' ? (
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
                width: 64, height: 64, margin: '0 auto 22px',
                border: '1px solid #D4AF37', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#D4AF37', fontSize: 26,
              }}
            >
              ✓
            </div>
            <h3 style={{ margin: '0 0 10px', fontFamily: "'Jost', sans-serif", fontWeight: 400, letterSpacing: '0.06em', color: '#F2E8D8', fontSize: 24 }}>
              Você está na lista{firstName ? `, ${firstName}` : ''}!
            </h3>
            <p style={{ margin: '0 auto', maxWidth: 400, fontSize: 14.5, lineHeight: 1.7, color: '#c7bfb1' }}>
              Recebemos seu cadastro. Em breve entramos em contato com novidades e o convite para o grupo privado no WhatsApp.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ marginTop: 26 }}>
              Entrar no Grupo WhatsApp
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{ position: 'relative',
              display: 'grid', gap: 18,
              padding: 'clamp(28px,4vw,44px)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0))',
              border: '1px solid rgba(212,175,55,0.20)',
              borderRadius: 6,
            }}
          >
            {/* Honeypot — invisible to real users */}
            <input
              type="text"
              name="_trap"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}
            />

            {showNome && (
              <label style={{ display: 'grid', gap: 8 }}>
                <span style={labelStyle}>Nome</span>
                <input
                  name="nome"
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  className="form-input"
                  onChange={() => setErrors(prev => ({ ...prev, nome: '' }))}
                />
                {errors.nome && <span style={errorStyle}>{errors.nome}</span>}
              </label>
            )}

            {showEmail && (
              <label style={{ display: 'grid', gap: 8 }}>
                <span style={labelStyle}>E-mail</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="voce@email.com"
                  className="form-input"
                  onChange={() => setErrors(prev => ({ ...prev, email: '' }))}
                />
                {errors.email && <span style={errorStyle}>{errors.email}</span>}
              </label>
            )}

            {showWhatsapp && (
              <label style={{ display: 'grid', gap: 8 }}>
                <span style={labelStyle}>WhatsApp</span>
                <input
                  name="whatsapp"
                  type="tel"
                  required
                  placeholder="(41) 99999-9999"
                  className="form-input"
                  value={phone}
                  onChange={handlePhoneChange}
                  inputMode="numeric"
                />
                {errors.whatsapp && <span style={errorStyle}>{errors.whatsapp}</span>}
              </label>
            )}

            {showCarro && (
              <label style={{ display: 'grid', gap: 8 }}>
                <span style={labelStyle}>Carro / Projeto</span>
                <input
                  name="carro"
                  type="text"
                  placeholder="Ex.: Golf GTI, projeto de restauro..."
                  className="form-input"
                />
              </label>
            )}

            {showInteresse && (
              <label style={{ display: 'grid', gap: 8 }}>
                <span style={labelStyle}>Nível de interesse</span>
                <select name="interesse" required className="form-input" style={{ appearance: 'none' }}>
                  <option value="membro">Quero me tornar membro</option>
                  <option value="evento">Quero visitar um evento</option>
                  <option value="parceiro">Quero ser parceiro / patrocinador</option>
                  <option value="acompanhar">Só quero acompanhar o projeto</option>
                </select>
              </label>
            )}

            {status === 'error' && (
              <p style={{ margin: 0, fontSize: 13.5, color: '#e07070', textAlign: 'center' }}>
                {submitError}
              </p>
            )}

            <button
              type="submit"
              className="btn-gold"
              disabled={status === 'loading'}
              style={{ marginTop: 6, justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
            >
              {status === 'loading' ? 'Enviando...' : 'Entrar na Lista de Espera'}
            </button>

            <p style={{ margin: '12px 0 0', fontSize: 12, lineHeight: 1.6, color: '#a99f8d', textAlign: 'center' }}>
              Ao enviar, você concorda em receber contato do CASA CAR CLUB. Seus dados são tratados conforme a LGPD.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
