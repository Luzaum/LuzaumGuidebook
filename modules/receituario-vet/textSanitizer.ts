const DIRECT_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\u00e2\u20ac\u00a2/g, '\u2022'],
  [/\u00e2\u20ac\u201c/g, '\u2013'],
  [/\u00e2\u20ac\u201d/g, '\u2014'],
  [/\u00e2\u20ac\u0153/g, '\u201c'],
  [/\u00e2\u20ac\u009d/g, '\u201d'],
  [/\u00e2\u20ac\u2122/g, '\u2019'],
  [/\u00e2\u20ac\u02dc/g, '\u02dc'],
  [/\u00e2\u20ac\u00a6/g, '\u2026'],
  [/\u00c2\u00ba/g, '\u00ba'],
  [/\u00c2\u00aa/g, '\u00aa'],
  [/\u00c2\u00b5/g, '\u00b5'],
  [/\u00c2\u00b0/g, '\u00b0'],
  [/\u00c2 /g, ' '],
  [/\ufffd/g, ''],
]

function mojibakeScore(value: string): number {
  return (
    (value.match(/\u00c3/g) || []).length +
    (value.match(/\u00c2/g) || []).length +
    (value.match(/\u00e2/g) || []).length +
    (value.match(/\ufffd/g) || []).length
  )
}

function decodeUtf8Mojibake(value: string): string {
  try {
    const bytes = Uint8Array.from(Array.from(value).map((char) => char.charCodeAt(0) & 0xff))
    return new TextDecoder('utf-8', { fatal: false }).decode(bytes)
  } catch {
    return value
  }
}

function normalizePunctuation(value: string): string {
  let text = value
  for (const [pattern, replacement] of DIRECT_REPLACEMENTS) {
    text = text.replace(pattern, replacement)
  }
  return text
}

export function repairMojibakeText(value: unknown): string {
  let text = String(value ?? '')
  if (!text) return ''

  text = normalizePunctuation(text)

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const decoded = decodeUtf8Mojibake(text)
    const normalizedDecoded = normalizePunctuation(decoded)
    if (mojibakeScore(normalizedDecoded) < mojibakeScore(text)) {
      text = normalizedDecoded
      continue
    }
    break
  }

  return text.replace(/\s+\u0000/g, ' ')
}

export function sanitizeVisibleText(value: unknown): string {
  return repairMojibakeText(value)
}

export function sanitizeDeepText<T>(input: T): T {
  if (input == null) return input
  if (typeof input === 'string') return repairMojibakeText(input) as T
  if (Array.isArray(input)) return input.map((entry) => sanitizeDeepText(entry)) as T
  if (typeof input === 'object') {
    const entries = Object.entries(input as Record<string, unknown>).map(([key, entry]) => [key, sanitizeDeepText(entry)])
    return Object.fromEntries(entries) as T
  }
  return input
}
