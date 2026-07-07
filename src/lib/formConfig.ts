// Comma-separated list of field IDs to hide from the form.
// Set VITE_DISABLED_FIELDS=carro,interesse in Vercel env vars to disable those fields.
// Available IDs: nome, email, whatsapp, carro, interesse
const raw = import.meta.env.VITE_DISABLED_FIELDS ?? ''

export const disabledFields = new Set<string>(
  raw.split(',').map((s: string) => s.trim()).filter(Boolean)
)

export function isDisabled(fieldId: string): boolean {
  return disabledFields.has(fieldId)
}
