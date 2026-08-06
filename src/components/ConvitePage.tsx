import { useState, useEffect, useRef, type FormEvent, type ChangeEvent } from 'react'
import { submitToRsvp, type RsvpEntry } from '../lib/rsvp'

type Status = 'idle' | 'loading' | 'success' | 'error'

const CAMISETA_SIZES = ['P', 'M', 'G', 'GG'] as const

const BENEFITS = [
  'Ingresso de exposição',
  'Detailing completo (na Vortex Detail, um dia antes)',
  'Acesso a um espaço exclusivo dentro do evento',
  'Brindes exclusivos',
  'Equipe de foto/vídeo dedicada',
]

// ── Masking & validation ─────────────────────────────────────────────────────

function maskPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function validateNome(v: string) {
  if (!v.trim()) return 'Nome é obrigatório.'
  if (v.trim().length < 2) return 'Nome muito curto.'
  if (!/^[\p{L}\s'-]+$/u.test(v.trim())) return 'Nome inválido.'
  return ''
}

function validateCarro(v: string) {
  if (!v.trim()) return 'Informe seu carro / projeto.'
  return ''
}

function validateTelefone(v: string) {
  if (!v.trim()) return 'Telefone é obrigatório.'
  const digits = v.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 11) return 'Número incompleto. Ex: (41) 99999-9999'
  return ''
}

// ── Styles ───────────────────────────────────────────────────────────────────

const labelStyle = {
  fontFamily: "'Jost', sans-serif",
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  fontSize: 11,
  color: '#D4AF37',
}

const errorStyle = { fontSize: 12, color: '#e07070', marginTop: 4 }

// ── Component ────────────────────────────────────────────────────────────────

export default function ConvitePage() {
  const [status, setStatus] = useState<Status>('idle')
  const [firstName, setFirstName] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [phone, setPhone] = useState('')
  const [camiseta, setCamiseta] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof RsvpEntry, string>>>({})
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = 'Confirme sua presença — CASA CAR CLUB Curitiba'
  }, [])

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    setPhone(maskPhone(e.target.value))
    if (errors.telefone) setErrors(prev => ({ ...prev, telefone: '' }))
  }

  function selectCamiseta(size: string) {
    setCamiseta(size)
    if (errors.camiseta) setErrors(prev => ({ ...prev, camiseta: '' }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    // Honeypot — bail silently if filled by a bot
    const trap = (form.elements.namedItem('_trap') as HTMLInputElement)?.value
    if (trap) return

    const nome = (form.elements.namedItem('nome') as HTMLInputElement).value
    const carro = (form.elements.namedItem('carro') as HTMLInputElement).value

    const newErrors: typeof errors = {
      nome: validateNome(nome),
      carro: validateCarro(carro),
      telefone: validateTelefone(phone),
      camiseta: camiseta ? '' : 'Selecione um tamanho.',
    }
    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors)
      return
    }

    setStatus('loading')
    setSubmitError('')

    const entry: Partial<RsvpEntry> = {
      nome: nome.trim(),
      carro: carro.trim(),
      telefone: phone,
      camiseta,
      consent_at: new Date().toISOString(),
    }

    try {
      await submitToRsvp(entry)
      setFirstName(nome.trim().split(' ')[0] || '')
      setStatus('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.')
      setStatus('error')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        padding: 'clamp(40px,8vw,88px) clamp(20px,5vw,40px)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div ref={topRef} style={{ width: '100%', maxWidth: 560 }}>
        {/* ── Branding ── */}
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <img
            src="/assets/badge.png"
            alt="Casa Car Club"
            style={{ width: 64, height: 64, borderRadius: '50%', margin: '0 auto 16px', display: 'block' }}
          />
          <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, letterSpacing: '0.28em', fontSize: 15, color: '#F2E8D8' }}>
            CASA CAR CLUB
          </div>
          <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, letterSpacing: '0.44em', fontSize: 9.5, color: '#D4AF37', marginTop: 3 }}>
            CURITIBA
          </div>
        </div>

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
            <h1 style={{ margin: '0 0 12px', fontFamily: "'Jost', sans-serif", fontWeight: 400, letterSpacing: '0.06em', color: '#F2E8D8', fontSize: 26 }}>
              Presença confirmada{firstName ? `, ${firstName}` : ''}!
            </h1>
            <p style={{ margin: '0 auto', maxWidth: 420, fontSize: 15, lineHeight: 1.7, color: '#c7bfb1' }}>
              Te esperamos no <strong style={{ color: '#F2E8D8', fontWeight: 400 }}>JDM Experience BBQ Edition</strong>, dia 23 de Agosto às 12h. Em breve entramos em contato com os próximos passos.
            </p>
          </div>
        ) : (
          <>
            {/* ── Invite summary ── */}
            <div style={{ textAlign: 'center', marginBottom: 34 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span className="eyebrow-line" />
                <span className="eyebrow">Convite Exclusivo</span>
                <span className="eyebrow-line" />
              </div>
              <h1
                style={{
                  margin: '0 auto 10px',
                  maxWidth: 460,
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  color: '#F2E8D8',
                  fontSize: 'clamp(24px,4.4vw,34px)',
                  lineHeight: 1.2,
                }}
              >
                Seu projeto foi selecionado para representar a CASA no{' '}
                <span style={{ color: '#D4AF37' }}>JDM Experience BBQ Edition</span>
              </h1>
              <p style={{ margin: 0, fontFamily: "'Jost', sans-serif", letterSpacing: '0.08em', fontSize: 15, color: '#c7bfb1' }}>
                23 de Agosto · 12h
              </p>
            </div>

            {/* ── Benefits ── */}
            <div
              style={{
                marginBottom: 34,
                padding: 'clamp(20px,4vw,26px)',
                border: '1px solid rgba(212,175,55,0.14)',
                borderRadius: 6,
                background: 'rgba(255,255,255,0.015)',
              }}
            >
              <div style={{ ...labelStyle, marginBottom: 14 }}>Por conta da CASA</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 11 }}>
                {BENEFITS.map((b) => (
                  <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14.5, lineHeight: 1.5, color: '#c7bfb1' }}>
                    <span style={{ color: '#D4AF37', flexShrink: 0 }}>◆</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Form ── */}
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{
                position: 'relative',
                display: 'grid',
                gap: 18,
                padding: 'clamp(24px,4vw,36px)',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0))',
                border: '1px solid rgba(212,175,55,0.20)',
                borderRadius: 6,
              }}
            >
              <p style={{ margin: '0 0 4px', textAlign: 'center', fontFamily: "'Jost', sans-serif", fontWeight: 400, letterSpacing: '0.04em', fontSize: 17, color: '#F2E8D8' }}>
                Confirme sua presença
              </p>

              {/* Honeypot — invisible to real users */}
              <input
                type="text"
                name="_trap"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}
              />

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

              <label style={{ display: 'grid', gap: 8 }}>
                <span style={labelStyle}>Carro</span>
                <input
                  name="carro"
                  type="text"
                  required
                  placeholder="Ex.: Nissan Skyline R34"
                  className="form-input"
                  onChange={() => setErrors(prev => ({ ...prev, carro: '' }))}
                />
                {errors.carro && <span style={errorStyle}>{errors.carro}</span>}
              </label>

              <label style={{ display: 'grid', gap: 8 }}>
                <span style={labelStyle}>Telefone</span>
                <input
                  name="telefone"
                  type="tel"
                  required
                  placeholder="(41) 99999-9999"
                  className="form-input"
                  value={phone}
                  onChange={handlePhoneChange}
                  inputMode="numeric"
                />
                {errors.telefone && <span style={errorStyle}>{errors.telefone}</span>}
              </label>

              <div style={{ display: 'grid', gap: 8 }}>
                <span style={labelStyle}>Tamanho de camiseta</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                  {CAMISETA_SIZES.map((size) => {
                    const active = camiseta === size
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => selectCamiseta(size)}
                        aria-pressed={active}
                        style={{
                          padding: '13px 0',
                          fontFamily: "'Jost', sans-serif",
                          fontWeight: 500,
                          letterSpacing: '0.08em',
                          fontSize: 15,
                          cursor: 'pointer',
                          borderRadius: 5,
                          border: active ? '1px solid #D4AF37' : '1px solid rgba(212,175,55,0.22)',
                          background: active ? 'linear-gradient(180deg, rgba(212,175,55,0.22), rgba(212,175,55,0.08))' : 'rgba(0,0,0,0.4)',
                          color: active ? '#F2E8D8' : '#a99f8d',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
                {errors.camiseta && <span style={errorStyle}>{errors.camiseta}</span>}
              </div>

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
                {status === 'loading' ? 'Enviando...' : 'Confirmar presença'}
              </button>

              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: '#a99f8d', textAlign: 'center' }}>
                Confirme até <strong style={{ color: '#c7bfb1', fontWeight: 400 }}>16 de Agosto</strong>.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
