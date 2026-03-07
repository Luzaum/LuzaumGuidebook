export function normalizeText(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function tokenize(value: string): string[] {
  return normalizeText(value)
    .split(/[^a-z0-9]+/i)
    .map((token) => token.trim())
    .filter(Boolean)
}

export function truncateText(value: string, size: number): string {
  if (value.length <= size) return value
  return `${value.slice(0, Math.max(0, size - 1)).trimEnd()}…`
}

export function stripHtml(value: string): string {
  return String(value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

