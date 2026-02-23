/**
 * Valida se uma string é um UUID válido (v1-v5)
 * Segue o padrão RFC 4122
 */
export function isUuid(v?: string | null): boolean {
  if (!v) return false
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)
}
