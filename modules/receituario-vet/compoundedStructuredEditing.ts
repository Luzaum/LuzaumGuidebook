import { sanitizeVisibleText } from './textSanitizer'

export const COMPOUNDED_DOSE_UNIT_OPTIONS = [
  'mg/kg',
  'mcg/kg',
  'mg/animal',
  'mcg/animal',
  'mg/m²',
  'mcg/m²',
  'mg/dose',
  'mcg/dose',
  'mg/aplicação',
  'mcg/aplicação',
  'mg',
  'mcg',
] as const

export const COMPOUNDED_DOSE_UNIT_SELECT_OPTIONS = COMPOUNDED_DOSE_UNIT_OPTIONS.map((value) => ({ value, label: value }))

export const COMPOUNDED_FREQUENCY_MODE_OPTIONS = [
  { value: 'times_per_day', label: 'Vezes por dia' },
  { value: 'interval_hours', label: 'Intervalo em horas' },
] as const

export const COMPOUNDED_TIMES_PER_DAY_OPTIONS = [
  { value: '1', label: '1x ao dia' },
  { value: '2', label: '2x ao dia' },
  { value: '3', label: '3x ao dia' },
  { value: '4', label: '4x ao dia' },
  { value: '6', label: '6x ao dia' },
] as const

export const COMPOUNDED_DURATION_MODE_OPTIONS = [
  { value: 'fixed_days', label: 'Período fixo' },
  { value: 'continuous_until_recheck', label: 'Até reavaliação' },
  { value: 'until_recheck', label: 'Até reavaliação' },
  { value: 'continuous_use', label: 'Uso contínuo' },
  { value: 'until_finished', label: 'Até terminar o medicamento' },
] as const

export const COMPOUNDED_DURATION_UNIT_OPTIONS = [
  { value: 'dias', label: 'dias' },
  { value: 'semanas', label: 'semanas' },
  { value: 'meses', label: 'meses' },
] as const

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  const normalized = String(value ?? '').trim().replace(',', '.')
  if (!normalized) return null
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : null
}

export function formatStructuredDecimal(value: number): string {
  return Number.isInteger(value) ? String(value) : String(Math.round(value * 100) / 100).replace('.', ',')
}

export function normalizeDoseUnit(unit: string): {
  basis: 'kg' | 'animal' | 'm2' | 'dose' | 'application' | 'fixed'
  baseUnit: string
  displayUnit: string
} {
  const safe = sanitizeVisibleText(unit || '').trim()
  const normalized = safe.toLowerCase()
  if (normalized.endsWith('/kg')) return { basis: 'kg', baseUnit: safe.slice(0, -3).trim(), displayUnit: safe }
  if (normalized.endsWith('/animal')) return { basis: 'animal', baseUnit: safe.slice(0, -7).trim(), displayUnit: safe }
  if (normalized.endsWith('/m²') || normalized.endsWith('/m2')) return { basis: 'm2', baseUnit: safe.replace(/\/m²|\/m2/i, '').trim(), displayUnit: safe }
  if (normalized.endsWith('/dose')) return { basis: 'dose', baseUnit: safe.slice(0, -5).trim(), displayUnit: safe }
  if (normalized.endsWith('/aplicação') || normalized.endsWith('/aplicacao')) return { basis: 'application', baseUnit: safe.replace(/\/aplica(c|ç)ão/i, '').replace(/\/aplicacao/i, '').trim(), displayUnit: safe }
  return { basis: 'fixed', baseUnit: safe, displayUnit: safe }
}

export function buildAdministrationDoseText(value: unknown, unit: string, patientWeightKg?: unknown): string {
  const numeric = toNumber(value)
  const safeUnit = sanitizeVisibleText(unit || '').trim()
  if (numeric == null || !safeUnit) return ''
  const parsed = normalizeDoseUnit(safeUnit)
  const weight = toNumber(patientWeightKg)
  if (parsed.basis === 'kg') {
    if (weight && weight > 0) return `${formatStructuredDecimal(numeric * weight)} ${parsed.baseUnit}`.trim()
    return `${formatStructuredDecimal(numeric)} ${parsed.baseUnit}/kg`.trim()
  }
  if (parsed.basis === 'animal') return `${formatStructuredDecimal(numeric)} ${parsed.baseUnit}`.trim()
  if (parsed.basis === 'm2') return `${formatStructuredDecimal(numeric)} ${parsed.baseUnit}/m²`.trim()
  if (parsed.basis === 'dose') return `${formatStructuredDecimal(numeric)} ${parsed.baseUnit}`.trim()
  if (parsed.basis === 'application') return `${formatStructuredDecimal(numeric)} ${parsed.baseUnit}`.trim()
  return `${formatStructuredDecimal(numeric)} ${parsed.baseUnit}`.trim()
}

export function buildCompoundedFrequencyText(params: {
  frequencyMode?: string | null
  timesPerDay?: unknown
  intervalHours?: unknown
  fallbackText?: string | null
}): string {
  const fallback = sanitizeVisibleText(params.fallbackText || '').trim()
  if (params.frequencyMode === 'interval_hours') {
    const hours = toNumber(params.intervalHours)
    if (hours && hours > 0) return `a cada ${formatStructuredDecimal(hours)} horas`
  }
  if (params.frequencyMode === 'times_per_day') {
    const times = toNumber(params.timesPerDay)
    if (times && times > 0) return `${formatStructuredDecimal(times)}x ao dia`
  }
  return fallback
}

export function buildCompoundedDurationText(params: {
  durationMode?: string | null
  durationValue?: unknown
  durationUnit?: string | null
  fallbackText?: string | null
}): string {
  if (params.durationMode === 'continuous_until_recheck' || params.durationMode === 'until_recheck') return 'até reavaliação clínica'
  if (params.durationMode === 'continuous_use') return 'em uso contínuo'
  if (params.durationMode === 'until_finished') return 'até terminar o medicamento'
  if (params.durationMode === 'fixed_days') {
    const value = toNumber(params.durationValue)
    if (value && value > 0) return `por ${formatStructuredDecimal(value)} ${sanitizeVisibleText(params.durationUnit || 'dias')}`
  }
  const fallback = sanitizeVisibleText(params.fallbackText || '').trim()
  if (!fallback) return ''
  if (/^(até|em uso|uso contínuo|uso continuo|dose única|dose unica)/i.test(fallback)) return fallback
  if (/^por\s+/i.test(fallback)) return fallback
  return `por ${fallback}`
}

export function buildCompoundedStructuredInstruction(params: {
  administrationText: string
  routeText: string
  frequencyText: string
  durationText: string
}): string {
  const pieces = [
    `Posologia: Administrar ${sanitizeVisibleText(params.administrationText)}`,
    sanitizeVisibleText(params.routeText),
    sanitizeVisibleText(params.frequencyText),
    sanitizeVisibleText(params.durationText),
  ].filter(Boolean)
  return sanitizeVisibleText(`${pieces.join(', ')}.`)
}

export function buildDoseRecommendationText(minValue: unknown, maxValue: unknown, unit: string): string {
  const min = toNumber(minValue)
  const max = toNumber(maxValue)
  const safeUnit = sanitizeVisibleText(unit || '').trim()
  if (min == null || !safeUnit) return ''
  if (max != null && max !== min) return `${formatStructuredDecimal(min)} a ${formatStructuredDecimal(max)} ${safeUnit}`
  return `${formatStructuredDecimal(min)} ${safeUnit}`
}
