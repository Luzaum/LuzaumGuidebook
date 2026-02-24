export const SPECIES_OPTIONS = [
  { value: 'DOGS', label: 'Cães' },
  { value: 'CATS', label: 'Gatos' },
  { value: 'BOTH', label: 'Geral' },
] as const

export const ROUTE_OPTIONS = [
  { value: 'ORAL', label: 'Oral' },
  { value: 'OTIC', label: 'Otológico' },
  { value: 'OPHTHALMIC', label: 'Oftálmico' },
  { value: 'TOPICAL', label: 'Tópico' },
  { value: 'INTRANASAL', label: 'Intranasal' },
  { value: 'RECTAL', label: 'Retal' },
  { value: 'SC', label: 'Subcutâneo' },
  { value: 'IM', label: 'Intramuscular' },
  { value: 'IV', label: 'Intravenoso' },
  { value: 'INHALATION', label: 'Inalatório' },
  { value: 'TRANSDERMAL', label: 'Transdérmico' },
  { value: 'OTHER', label: 'Outro' },
] as const

export const CONCENTRATION_UNIT_OPTIONS = [
  { value: 'mg/mL', label: 'mg/mL' },
  { value: 'mg/comprimido', label: 'mg/comprimido' },
  { value: 'mg/cápsula', label: 'mg/cápsula' },
  { value: 'mcg/mL', label: 'mcg/mL' },
  { value: 'UI/mL', label: 'UI/mL' },
  { value: 'g/mL', label: 'g/mL' },
  { value: '%', label: '%' },
  { value: 'mg/g', label: 'mg/g' },
] as const

export const DOSE_UNIT_OPTIONS = [
  { value: 'mg/kg', label: 'mg/kg' },
  { value: 'mcg/kg', label: 'mcg/kg' },
  { value: 'g/kg', label: 'g/kg' },
  { value: 'mL/kg', label: 'mL/kg' },
  { value: 'UI/kg', label: 'UI/kg' },
  { value: 'comprimido/kg', label: 'comprimido/kg' },
  { value: 'gota/kg', label: 'gota/kg' },
  { value: 'mg', label: 'mg' },
  { value: 'mL', label: 'mL' },
  { value: 'comprimido', label: 'comprimido' },
  { value: 'gota', label: 'gota' },
  { value: 'cápsula', label: 'cápsula' },
] as const

export const FREQUENCY_TYPE_OPTIONS = [
  { value: 'times_per_day', label: 'X vezes ao dia' },
  { value: 'every_x_hours', label: 'A cada X horas' },
  { value: 'once_daily', label: 'Uma vez ao dia' },
  { value: 'as_needed', label: 'Se necessário (PRN)' },
] as const

export const FREQUENCY_LABELS: Record<string, string> = {
  times_per_day: 'vez(es) ao dia',
  every_x_hours: 'em cada hora(s)',
  once_daily: 'uma vez ao dia',
  as_needed: 'se necessário',
}

export type Species = typeof SPECIES_OPTIONS[number]['value']
export type Route = typeof ROUTE_OPTIONS[number]['value']
export type ConcentrationUnit = typeof CONCENTRATION_UNIT_OPTIONS[number]['value']
export type DoseUnit = typeof DOSE_UNIT_OPTIONS[number]['value']
export type FrequencyType = typeof FREQUENCY_TYPE_OPTIONS[number]['value']
