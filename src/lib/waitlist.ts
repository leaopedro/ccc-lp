export interface WaitlistEntry {
  nome: string
  email: string
  whatsapp: string
  carro: string
  interesse: string
}

// This is the only function the UI calls — the backend is swappable.
export async function submitToWaitlist(entry: WaitlistEntry): Promise<void> {
  const res = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error ?? 'Erro ao enviar. Tente novamente.')
  }
}
