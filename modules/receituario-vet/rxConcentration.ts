export interface StructuredConcentration {
  value: string
  unit: string
  perValue: string
  perUnit: string
}

export const CONCENTRATION_VALUE_UNIT_OPTIONS = ['mg', 'mcg', 'g', 'mL', 'UI', '%']
export const CONCENTRATION_PER_UNIT_OPTIONS = [
  'comprimido',
  'cápsula',
  'mL',
  'bisnaga',
  'ampola',
  'frasco',
  'gota',
  'sachê',
]

export function formatStructuredConcentration(parts: Partial<StructuredConcentration>): string {
  const value = (parts.value || '').trim()
  const unit = (parts.unit || '').trim()
  const perUnit = (parts.perUnit || '').trim()
  const perValue = (parts.perValue || '').trim() || '1'

  if (!value || !unit || !perUnit) return ''
  const normalizedPerValue = perValue === '1' ? '' : `${perValue} `
  return `${value} ${unit}/${normalizedPerValue}${perUnit}`.trim()
}

export function parseStructuredConcentration(text: string): StructuredConcentration | null {
  const normalized = (text || '').trim()
  if (!normalized) return null

  const withDivider = normalized.match(
    /(\d+(?:[.,]\d+)?)\s*([a-zA-Z%µ]+)\s*\/\s*(\d+(?:[.,]\d+)?)?\s*([a-zA-Z%µ]+)/i
  )
  if (withDivider) {
    return {
      value: (withDivider[1] || '').replace(',', '.'),
      unit: withDivider[2] || '',
      perValue: (withDivider[3] || '1').replace(',', '.'),
      perUnit: withDivider[4] || '',
    }
  }

  const simple = normalized.match(/(\d+(?:[.,]\d+)?)\s*([a-zA-Z%µ]+)/i)
  if (!simple) return null

  return {
    value: (simple[1] || '').replace(',', '.'),
    unit: simple[2] || '',
    perValue: '1',
    perUnit: '',
  }
}


