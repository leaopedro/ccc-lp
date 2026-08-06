export interface RsvpEntry {
  nome: string
  carro: string
  telefone: string
  camiseta: string
  consent_at?: string
}

// This is the only function the UI calls — the backend is swappable.
export async function submitToRsvp(entry: Partial<RsvpEntry>): Promise<void> {
  const res = await fetch('/api/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error ?? 'Erro ao enviar. Tente novamente.')
  }
}
