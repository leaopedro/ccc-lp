import { useState, type FormEvent } from 'react'
import { registerAndUnlock } from '../lib/unlock'

type Status = 'idle' | 'loading' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const labelStyle = {
  fontFamily: "'Jost', sans-serif",
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  fontSize: 11,
  color: '#C19A5C',
}

const baseInput = {
  padding: '17px 16px',
  background: 'rgba(0,0,0,0.45)',
  borderRadius: 3,
  color: '#F2E8D8',
  fontSize: 16, // 16px evita o zoom automático do iOS
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s ease, opacity 0.2s ease',
}

function inputStyle(invalid: boolean, loading: boolean) {
  return {
    ...baseInput,
    border: invalid ? '1px solid rgba(224,112,112,0.6)' : '1px solid rgba(255,255,255,0.13)',
    opacity: loading ? 0.5 : 1,
  }
}

const errStyle = { fontSize: 12.5, color: '#e07070' }

export default function GeladeiraPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({})

  const loading = status === 'loading'
  const firstName = name.trim().split(' ')[0]

  function validate() {
    const next: typeof errors = {}
    if (!name.trim() || name.trim().length < 2) next.name = 'Informe seu nome (mínimo 2 letras).'
    if (!EMAIL_RE.test(email.trim())) next.email = 'Informe um e-mail válido.'
    const p = phone.trim()
    if (p && (p.length < 3 || p.length > 32)) next.phone = 'Telefone inválido.'
    return next
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (loading) return // impede duplo submit

    const next = validate()
    if (Object.keys(next).length) {
      setErrors(next)
      setStatus('idle')
      setMessage('')
      return
    }

    setErrors({})
    setStatus('loading')
    setMessage('')

    try {
      await registerAndUnlock({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
      })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.')
    }
  }

  // ── Sucesso: takeover dourado, legível de longe e sob luz forte ──────────
  if (status === 'success') {
    return (
      <main
        style={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '56px 28px',
          background:
            'radial-gradient(120% 70% at 50% 22%, #E5C88E 0%, #C19A5C 46%, #8A6A36 100%)',
        }}
      >
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'rgba(10,10,10,0.10)',
            boxShadow: '0 0 0 1px rgba(10,10,10,0.18)',
            animation: 'gHalo 2.2s ease-in-out infinite',
          }}
        >
          <span className="mi" style={{ fontSize: 78, color: '#0A0A0A' }} aria-hidden="true">
            lock_open
          </span>
        </div>

        <div
          role="status"
          aria-live="assertive"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 34 }}
        >
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              letterSpacing: '0.34em',
              fontSize: 11,
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.62)',
            }}
          >
            Geladeira destravada
          </div>
          <h1
            style={{
              margin: '12px 0 0',
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(52px,15vw,72px)',
              lineHeight: 0.94,
              letterSpacing: '-0.02em',
              color: '#0A0A0A',
              textAlign: 'center',
            }}
          >
            PODE
            <br />
            ABRIR
          </h1>
          <p
            style={{
              margin: '20px 0 0',
              maxWidth: '24ch',
              textAlign: 'center',
              fontSize: 16,
              lineHeight: 1.55,
              color: 'rgba(10,10,10,0.72)',
            }}
          >
            {firstName ? `${firstName}, a` : 'A'} porta está liberada. Pegue sua bebida e feche em
            seguida.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginTop: 40,
            padding: '11px 18px',
            border: '1px solid rgba(10,10,10,0.28)',
            borderRadius: 100,
          }}
        >
          <img
            src="/assets/badge.png"
            alt=""
            style={{ width: 22, height: 22, borderRadius: '50%', filter: 'grayscale(1) brightness(0)' }}
          />
          <span
            style={{
              fontFamily: "'Jost', sans-serif",
              letterSpacing: '0.26em',
              fontSize: 9.5,
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.78)',
            }}
          >
            Casa Car Club · Curitiba
          </span>
        </div>
      </main>
    )
  }

  // ── Formulário (idle / loading / error) ──────────────────────────────────
  return (
    <main
      style={{
        minHeight: '100svh',
        background: '#0A0A0A',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          padding: 'clamp(28px,7vw,52px) clamp(20px,6vw,32px) 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
        }}
      >
        {/* Branding */}
        <div
          className="hero-anim-0"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}
        >
          <img
            src="/assets/badge.png"
            alt="Casa Car Club"
            style={{ width: 62, height: 62, borderRadius: '50%' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 500,
                letterSpacing: '0.28em',
                fontSize: 13,
                color: '#F2E8D8',
              }}
            >
              CASA CAR CLUB
            </div>
            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                letterSpacing: '0.44em',
                fontSize: 9,
                color: '#C19A5C',
              }}
            >
              CURITIBA
            </div>
          </div>
        </div>

        {/* Título */}
        <div className="hero-anim-1" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="eyebrow-line" />
            <span className="eyebrow">Geladeira da CASA</span>
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(32px,9vw,42px)',
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              color: '#F2E8D8',
              textWrap: 'pretty',
            }}
          >
            Deixe seu nome.
            <br />
            <span style={{ color: '#C19A5C' }}>A trava abre.</span>
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 15.5,
              lineHeight: 1.6,
              color: '#a99f8d',
              maxWidth: '34ch',
              textWrap: 'pretty',
            }}
          >
            A bebida é por conta da CASA. Só queremos saber quem passou por aqui.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="hero-anim-2"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            padding: 'clamp(22px,5vw,28px)',
            border: '1px solid rgba(193,154,92,0.20)',
            borderRadius: 6,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.028), rgba(255,255,255,0))',
            overflow: 'hidden',
          }}
        >
          {loading && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: 'rgba(193,154,92,0.14)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '30%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, #D4B584, transparent)',
                  animation: 'gSweep 1.1s linear infinite',
                }}
              />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <label htmlFor="g-name" style={labelStyle}>
              Nome
            </label>
            <input
              id="g-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setErrors((p) => ({ ...p, name: '' }))
              }}
              disabled={loading}
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'g-name-err' : undefined}
              style={inputStyle(!!errors.name, loading)}
            />
            {errors.name && (
              <span id="g-name-err" style={errStyle}>
                {errors.name}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <label htmlFor="g-email" style={labelStyle}>
              E-mail
            </label>
            <input
              id="g-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              placeholder="voce@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setErrors((p) => ({ ...p, email: '' }))
              }}
              disabled={loading}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'g-email-err' : undefined}
              style={inputStyle(!!errors.email, loading)}
            />
            {errors.email && (
              <span id="g-email-err" style={errStyle}>
                {errors.email}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <label htmlFor="g-phone" style={labelStyle}>
              Telefone <span style={{ color: '#7d7466', letterSpacing: '0.08em' }}>· opcional</span>
            </label>
            <input
              id="g-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(41) 99999-9999"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                setErrors((p) => ({ ...p, phone: '' }))
              }}
              disabled={loading}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'g-phone-err' : undefined}
              style={inputStyle(!!errors.phone, loading)}
            />
            {errors.phone && (
              <span id="g-phone-err" style={errStyle}>
                {errors.phone}
              </span>
            )}
          </div>

          {/* Erro do servidor — anunciado */}
          <div aria-live="assertive" role="status" style={{ display: 'flex', flexDirection: 'column' }}>
            {status === 'error' && message && (
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  padding: '13px 15px',
                  border: '1px solid rgba(224,112,112,0.42)',
                  borderRadius: 4,
                  background: 'rgba(224,112,112,0.07)',
                }}
              >
                <span className="mi" style={{ fontSize: 19, color: '#e07070', flexShrink: 0 }} aria-hidden="true">
                  error
                </span>
                <span style={{ fontSize: 14, lineHeight: 1.5, color: '#efb9b9' }}>{message}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              width: '100%',
              minHeight: 60,
              padding: '18px 24px',
              border: 'none',
              borderRadius: 3,
              background: loading
                ? 'rgba(193,154,92,0.35)'
                : 'linear-gradient(135deg, #D4B584, #C19A5C 55%, #A5834A)',
              color: loading ? 'rgba(10,10,10,0.55)' : '#0A0A0A',
              fontFamily: "'Jost', sans-serif",
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontSize: 14,
              boxShadow: loading ? 'none' : '0 10px 34px rgba(193,154,92,0.26)',
              cursor: loading ? 'default' : 'pointer',
              transition: 'all 0.25s ease',
            }}
          >
            <span className="mi" style={{ fontSize: 22 }} aria-hidden="true">
              {loading ? 'hourglass_top' : 'lock_open'}
            </span>
            <span>{loading ? 'Abrindo…' : 'Desbloquear geladeira'}</span>
          </button>

          {/* LGPD */}
          <p
            style={{
              margin: 0,
              fontSize: 11.5,
              lineHeight: 1.6,
              color: '#8d8474',
              textAlign: 'center',
              textWrap: 'pretty',
            }}
          >
            Ao desbloquear, você concorda que a CASA guarde seu nome, e-mail e telefone para contato
            sobre o clube. Nada de spam.
          </p>
        </form>

      </div>
    </main>
  )
}
