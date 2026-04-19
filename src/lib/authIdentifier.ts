/**
 * Supabase Auth exige um email para password login. Utilizadores podem digitar só o nome
 * (ex.: "rani"); internamente mapeamos para `nome@vetius.link`.
 */
export const VETIUS_SYNTHETIC_EMAIL_DOMAIN = 'vetius.link'

export function resolveSupabaseAuthEmail(identifier: string): string {
  const raw = identifier.trim()
  if (!raw) {
    throw new Error('Informe usuário ou email.')
  }
  if (raw.includes('@')) {
    return raw
  }
  const local = raw.replace(/\s+/g, '')
  if (!local) {
    throw new Error('Informe usuário ou email.')
  }
  return `${local.toLowerCase()}@${VETIUS_SYNTHETIC_EMAIL_DOMAIN}`
}
