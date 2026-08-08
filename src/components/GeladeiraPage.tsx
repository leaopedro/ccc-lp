import { useState, type FormEvent } from 'react'
import { registerAndUnlock } from '../lib/unlock'

type Status = 'idle' | 'loading' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Página mínima e funcional — sem design. Objetivo único: provar o fluxo
// formulário → servidor → Railway → ESP32 → relé → fechadura.
export default function GeladeiraPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // 1. Validação
    if (!name.trim() || name.trim().length < 2) {
      setStatus('error')
      setMessage('Informe seu nome.')
      return
    }
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error')
      setMessage('Informe um e-mail válido.')
      return
    }

    // 2 + 3. Envia ao backend e solicita o unlock (tudo server-side)
    setStatus('loading')
    setMessage('')
    try {
      await registerAndUnlock({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
      })
      setStatus('success')
      setMessage('Geladeira desbloqueada! Pode abrir.')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.')
    }
  }

  const loading = status === 'loading'

  return (
    <main style={{ maxWidth: 420, margin: '0 auto', padding: '48px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 22, marginBottom: 8 }}>Desbloquear geladeira</h1>
      <p style={{ fontSize: 14, color: '#555', marginBottom: 24 }}>
        Preencha seus dados para liberar a geladeira.
      </p>

      <form onSubmit={handleSubmit} noValidate style={{ display: 'grid', gap: 14 }}>
        <label style={{ display: 'grid', gap: 4 }}>
          <span style={{ fontSize: 13 }}>Nome *</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            style={{ padding: '10px 12px', fontSize: 15, border: '1px solid #ccc', borderRadius: 6 }}
          />
        </label>

        <label style={{ display: 'grid', gap: 4 }}>
          <span style={{ fontSize: 13 }}>E-mail *</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            style={{ padding: '10px 12px', fontSize: 15, border: '1px solid #ccc', borderRadius: 6 }}
          />
        </label>

        <label style={{ display: 'grid', gap: 4 }}>
          <span style={{ fontSize: 13 }}>Telefone (opcional)</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            style={{ padding: '10px 12px', fontSize: 15, border: '1px solid #ccc', borderRadius: 6 }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 16px',
            fontSize: 15,
            fontWeight: 600,
            cursor: loading ? 'default' : 'pointer',
            background: loading ? '#999' : '#0A0A0A',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
          }}
        >
          {loading ? 'Abrindo…' : 'Desbloquear geladeira'}
        </button>
      </form>

      {status === 'success' && (
        <p style={{ marginTop: 20, padding: '12px 14px', background: '#e6f6e6', color: '#1a7f1a', borderRadius: 6, fontSize: 14 }}>
          ✓ {message}
        </p>
      )}
      {status === 'error' && (
        <p style={{ marginTop: 20, padding: '12px 14px', background: '#fdeaea', color: '#c02626', borderRadius: 6, fontSize: 14 }}>
          {message}
        </p>
      )}
    </main>
  )
}
