import { useState, useRef, type FormEvent, type ChangeEvent } from 'react'
import { submitToWaitlist, type WaitlistEntry } from '../lib/waitlist'
import { isDisabled } from '../lib/formConfig'
import { tierOptions } from '../data/content'
import { track } from '../lib/analytics'

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
  if (digits.length < 10 || digits.length > 11) return 'Número incompleto. Ex: (41) 90000-0000'
  return ''
}

// ── Styles ─────────────────────────────────────────────────────────────────

const labelStyle = {
  fontFamily: "'Jost', sans-serif",
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
  fontSize: 10.5,
  color: '#a99f8d',
}

const errorStyle = {
  fontSize: 12,
  color: '#d98f6e',
  marginTop: 4,
}

// ── Component ──────────────────────────────────────────────────────────────

export default function WaitlistForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [submitError, setSubmitError] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof WaitlistEntry, string>>>({})
  const sectionRef = useRef<HTMLElement>(null)

  const showNome = !isDisabled('nome')
  const showWhatsapp = !isDisabled('whatsapp')
  const showEmail = !isDisabled('email')
  const showInteresse = !isDisabled('interesse')

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    setPhone(maskPhone(e.target.value))
    if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: '' }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    // Honeypot — bail silently if filled by a bot
    const trap = (form.elements.namedItem('_trap') as HTMLInputElement)?.value
    if (trap) return

    const values = {
      nome: showNome ? (form.elements.namedItem('nome') as HTMLInputElement).value : '',
      whatsapp: showWhatsapp ? phone : '',
      email: showEmail ? (form.elements.namedItem('email') as HTMLInputElement).value : '',
      interesse: showInteresse ? (form.elements.namedItem('interesse') as HTMLSelectElement).value : '',
    }

    // Client-side validation
    const newErrors: typeof errors = {}
    if (showNome) newErrors.nome = validateNome(values.nome)
    if (showWhatsapp) newErrors.whatsapp = validateWhatsApp(values.whatsapp)
    if (showEmail) newErrors.email = validateEmail(values.email)

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors)
      return
    }

    setStatus('loading')
    setSubmitError('')

    const entry: Partial<WaitlistEntry> = {}
    if (showNome) entry.nome = values.nome.trim()
    if (showWhatsapp) entry.whatsapp = values.whatsapp
    if (showEmail) entry.email = values.email.trim()
    if (showInteresse) entry.interesse = values.interesse
    entry.consent_at = new Date().toISOString()

    try {
      await submitToWaitlist(entry as WaitlistEntry)
      track('casa_box_lead_submit', { tier: values.interesse || 'indefinido' })
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
      id="pre-venda"
      ref={sectionRef}
      style={{ padding: 'clamp(72px,10vw,124px) clamp(20px,5vw,80px)' }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: "'Jost', sans-serif", letterSpacing: '0.3em', fontSize: 11, textTransform: 'uppercase', color: '#C19A5C' }}>
          <span aria-hidden="true" style={{ display: 'block', width: 26, height: 1, background: '#C19A5C' }} />
          Pré-venda CASA Box
        </span>
        <h2 style={{ margin: '20px 0 0', fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 'clamp(28px,4vw,44px)', lineHeight: 1.1, letterSpacing: '-0.015em', color: '#F2E8D8', textWrap: 'balance' }}>
          Receba primeiro o acesso à pré-venda da CASA Box
        </h2>
        <p style={{ margin: '18px 0 0', fontSize: 15.5, lineHeight: 1.6, color: '#a99f8d' }}>
          Deixe seus dados e a gente avisa assim que abrir.
        </p>

        {status === 'success' ? (
          <div
            role="status"
            style={{
              marginTop: 32,
              padding: '28px 26px',
              border: '1px solid rgba(193,154,92,0.45)',
              borderRadius: 3,
              background: 'rgba(193,154,92,0.06)',
            }}
          >
            <p style={{ margin: 0, fontFamily: "'Jost', sans-serif", fontSize: 18, color: '#F2E8D8' }}>
              Pronto. Você está na lista.
            </p>
            <p style={{ margin: '8px 0 0', fontSize: 14.5, color: '#a99f8d' }}>
              A gente avisa no WhatsApp assim que a pré-venda da CASA Box abrir.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}
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
              <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <span style={labelStyle}>Nome</span>
                <input
                  name="nome"
                  type="text"
                  required
                  autoComplete="name"
                  className="form-input"
                  onChange={() => setErrors((prev) => ({ ...prev, nome: '' }))}
                />
                {errors.nome && <span style={errorStyle}>{errors.nome}</span>}
              </label>
            )}

            {showWhatsapp && (
              <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <span style={labelStyle}>WhatsApp</span>
                <input
                  name="whatsapp"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="(41) 90000-0000"
                  className="form-input"
                  value={phone}
                  onChange={handlePhoneChange}
                  inputMode="numeric"
                />
                {errors.whatsapp && <span style={errorStyle}>{errors.whatsapp}</span>}
              </label>
            )}

            {showEmail && (
              <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <span style={labelStyle}>E-mail</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="form-input"
                  onChange={() => setErrors((prev) => ({ ...prev, email: '' }))}
                />
                {errors.email && <span style={errorStyle}>{errors.email}</span>}
              </label>
            )}

            {showInteresse && (
              <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <span style={labelStyle}>
                  Tier de interesse <span style={{ textTransform: 'none', letterSpacing: 0, color: '#7d7466' }}>(opcional)</span>
                </span>
                <select name="interesse" className="form-input" style={{ appearance: 'none' }} defaultValue="">
                  {tierOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <div style={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginTop: 6 }}>
              <button
                type="submit"
                className="btn-gold"
                disabled={status === 'loading'}
                style={{ fontSize: 12.5, opacity: status === 'loading' ? 0.7 : 1 }}
              >
                {status === 'loading' ? 'Enviando…' : 'Quero ser avisado'}
              </button>
              <p style={{ margin: 0, fontSize: 12.5, color: '#7d7466', maxWidth: 330 }}>
                Usamos seus dados só para avisar sobre a pré-venda da CASA Box.
              </p>
            </div>

            {status === 'error' && (
              <p role="alert" style={{ gridColumn: '1 / -1', margin: 0, fontSize: 13.5, color: '#d98f6e' }}>
                {submitError}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
