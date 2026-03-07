import { normalizeText, tokenize } from '../../utils/text'

export type RankedField = {
  name: string
  value: string
  weight?: number
}

export function rankTextMatch(query: string, fields: RankedField[]): { score: number; matchedFields: string[] } {
  const normalizedQuery = normalizeText(query)
  if (!normalizedQuery) return { score: 0, matchedFields: [] }

  const queryTokens = tokenize(query)
  const matchedFields: string[] = []

  const score = fields.reduce((total, field) => {
    const normalizedValue = normalizeText(field.value)
    if (!normalizedValue) return total

    let fieldScore = 0
    const weight = field.weight ?? 1

    if (normalizedValue === normalizedQuery) fieldScore += 120
    if (normalizedValue.startsWith(normalizedQuery)) fieldScore += 70
    if (normalizedValue.includes(normalizedQuery)) fieldScore += 30

    queryTokens.forEach((token) => {
      if (normalizedValue.includes(token)) fieldScore += 8
    })

    if (fieldScore > 0) matchedFields.push(field.name)
    return total + fieldScore * weight
  }, 0)

  return { score, matchedFields: [...new Set(matchedFields)] }
}

