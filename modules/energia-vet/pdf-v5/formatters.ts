const MISSING = 'Não informado'

export function formatMissing(value: string | null | undefined): string {
  if (value == null) return MISSING
  const trimmed = value.trim()
  return trimmed.length ? trimmed : MISSING
}

export function formatKcalDay(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return MISSING
  return `${Math.round(value)} kcal/dia`
}

export function formatKcal(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return MISSING
  return `${Math.round(value)} kcal`
}

export function formatGramsDay(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return MISSING
  const abs = Math.abs(value)
  if (abs >= 10) return `${Math.round(value)} g/dia`
  if (abs >= 1) return `${value.toFixed(1)} g/dia`
  if (abs > 0) return `${value.toFixed(2)} g/dia`
  return MISSING
}

export function formatGrams(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return MISSING
  const abs = Math.abs(value)
  if (abs >= 10) return `${Math.round(value)} g`
  if (abs >= 1) return `${value.toFixed(1)} g`
  if (abs > 0) return `${value.toFixed(2)} g`
  return MISSING
}

export function formatMlDay(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return MISSING
  if (value >= 10) return `${Math.round(value)} mL/dia`
  return `${value.toFixed(1)} mL/dia`
}

export function formatPercent(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return MISSING
  return `${value.toFixed(1)}%`
}

export function formatWeightKg(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return MISSING
  return `${value.toFixed(2)} kg`
}

export function formatDatePtBr(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso.slice(0, 10)
  return date.toLocaleDateString('pt-BR')
}

export function formatAgeYears(ageMonths: number | undefined): string {
  if (ageMonths == null || ageMonths < 0) return MISSING
  const years = ageMonths / 12
  if (years < 1) return `${ageMonths} meses`
  return `${years.toFixed(1).replace('.0', '')} anos`
}

export function formatRoundingNote(errorPercent: number | undefined, tolerance = 2): string | null {
  if (errorPercent == null || !Number.isFinite(errorPercent)) return null
  if (Math.abs(errorPercent) < tolerance) return null
  const sign = errorPercent > 0 ? '+' : ''
  return `Diferença após arredondamento: ${sign}${errorPercent.toFixed(1)}% da meta energética.`
}
