export interface UnlockEntry {
  name: string
  email: string
  phone?: string
}

// Única função que a UI chama. A chave da geladeira NUNCA vem para o browser —
// esta rota (/api/register-and-unlock) faz a chamada autenticada server-side.
export async function registerAndUnlock(entry: UnlockEntry): Promise<void> {
  const res = await fetch('/api/register-and-unlock', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error ?? 'Erro ao enviar. Tente novamente.')
  }
}
