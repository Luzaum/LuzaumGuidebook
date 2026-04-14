/**
 * Normaliza nome de fármaco para comparar duplicatas entre linhas de tratamento.
 */
export function normalizeDrugDisplayName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ')
}

/**
 * Remove IDs internos de regime (`reg_*`) do texto clínico — não devem aparecer na UI.
 */
export function sanitizeInternalRegimenIds(text: string): string {
  if (!text || typeof text !== 'string') return text
  let s = text
  s = s.replace(/\*\*reg_[a-z0-9_]+\*\*/gi, '')
  s = s.replace(/\breg_[a-z0-9_]+\b/gi, '')
  s = s.replace(/\s+e\s+vs\s+/gi, ' e ')
  s = s.replace(/\s+vs\s+vs\s+/gi, ' vs ')
  s = s.replace(/\s+e\s+e\s+/gi, ' e ')
  s = s.replace(/\(\s*\)/g, '')
  s = s.replace(/,\s*,/g, ',')
  s = s.replace(/\s{2,}/g, ' ')
  s = s.replace(/\s+([.,;:])/g, '$1')
  s = s.trim()
  return s
}
