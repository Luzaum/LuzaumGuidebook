import { PrescriptionItem, PrescriptionState, PrintDoc, PrintDocItem, PrintDocSection, RouteGroup } from './rxTypes'
import { loadRxDb } from './rxDb'
import {
  buildMedicationDisplayName,
  getDoseEngineMetadata,
  getPresentationFlag,
  getPresentationNumber,
  getPresentationString,
} from '../../src/lib/medicationCatalog'
import { calculatePracticalEquivalent } from './rxUiHelpers'

const SECTION_ORDER: RouteGroup[] = [
  'ORAL',
  'OTOLOGICO',
  'OFTALMICO',
  'TOPICO',
  'INTRANASAL',
  'RETAL',
  'SC',
  'IM',
  'IV',
  'INALATORIO',
  'TRANSDERMICO',
  'OUTROS',
]

const SECTION_LABEL: Record<RouteGroup, string> = {
  ORAL: 'USO ORAL',
  OTOLOGICO: 'USO OTOLÓGICO',
  OFTALMICO: 'USO OFTÁLMICO',
  TOPICO: 'USO TÓPICO',
  INTRANASAL: 'USO INTRANASAL',
  RETAL: 'USO RETAL',
  SC: 'USO SUBCUTÂNEO',
  IM: 'USO INTRAMUSCULAR',
  IV: 'USO INTRAVENOSO',
  INALATORIO: 'USO INALATÓRIO',
  TRANSDERMICO: 'USO TRANSDÉRMICO',
  OUTROS: 'OUTROS',
}

const FREQUENCY_TOKEN_TO_TIMES: Record<'SID' | 'BID' | 'TID' | 'QID', number> = {
  SID: 1,
  BID: 2,
  TID: 3,
  QID: 4,
}

const DISCRETE_UNITS = new Set([
  'comprimido',
  'capsula',
  'gota',
  'ampola',
  'frasco',
  'bisnaga',
  'unidade',
  'sachê',
  'sache',
  'spray',
  'puff',
  'jato',
  'ato',
  'flaconete',
  'pipeta',
  'supositorio',
])

const ADMINISTRATION_UNITS = new Set([
  ...Array.from(DISCRETE_UNITS),
  'ml',
  'l',
])

const UNIT_LABELS: Record<string, { singular: string; plural: string }> = {
  comprimido: { singular: 'comprimido', plural: 'comprimidos' },
  capsula: { singular: 'cápsula', plural: 'cápsulas' },
  gota: { singular: 'gota', plural: 'gotas' },
  ml: { singular: 'mL', plural: 'mL' },
  l: { singular: 'L', plural: 'L' },
  puff: { singular: 'puff', plural: 'puffs' },
  jato: { singular: 'jato', plural: 'jatos' },
  ato: { singular: 'ato', plural: 'atos' },
  spray: { singular: 'spray', plural: 'sprays' },
  sache: { singular: 'sachê', plural: 'sachês' },
  flaconete: { singular: 'flaconete', plural: 'flaconetes' },
  pipeta: { singular: 'pipeta', plural: 'pipetas' },
  supositorio: { singular: 'supositório', plural: 'supositórios' },
  ampola: { singular: 'ampola', plural: 'ampolas' },
  frasco: { singular: 'frasco', plural: 'frascos' },
  bisnaga: { singular: 'bisnaga', plural: 'bisnagas' },
  unidade: { singular: 'unidade', plural: 'unidades' },
}

function normalizeText(value: string): string {
  return (value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

const UNIT_ALIASES: Record<string, string> = {
  mg: 'mg',
  mcg: 'mcg',
  ug: 'mcg',
  'µg': 'mcg',
  g: 'g',
  ml: 'ml',
  l: 'l',
  ui: 'ui',
  u: 'ui',
  unidade: 'unidade',
  unidades: 'unidade',
  un: 'unidade',
  comprimido: 'comprimido',
  comprimidos: 'comprimido',
  capsula: 'capsula',
  capsulas: 'capsula',
  gota: 'gota',
  gotas: 'gota',
  ampola: 'ampola',
  ampolas: 'ampola',
  frasco: 'frasco',
  frascos: 'frasco',
  bisnaga: 'bisnaga',
  bisnagas: 'bisnaga',
  sache: 'sache',
  saches: 'sache',
  flaconete: 'flaconete',
  flaconetes: 'flaconete',
  pipeta: 'pipeta',
  pipetas: 'pipeta',
  supositorio: 'supositorio',
  supositorios: 'supositorio',
  puff: 'puff',
  puffs: 'puff',
  jato: 'jato',
  jatos: 'jato',
  ato: 'ato',
  atos: 'ato',
  spray: 'spray',
  sprays: 'spray',
}

function normalizeUnit(unit: string): string {
  const key = normalizeText(unit).replace(/\./g, '')
  return UNIT_ALIASES[key] || key
}

function toNumber(raw: unknown): number | null {
  if (raw == null) return null
  if (typeof raw === 'number') {
    if (!Number.isFinite(raw)) return null
    return raw
  }
  if (typeof raw === 'string') {
    const normalized = raw.replace(',', '.').trim()
    if (!normalized) return null
    const n = Number(normalized)
    return Number.isNaN(n) ? null : n
  }
  if (import.meta.env.DEV) {
    console.warn('[rxRenderer] toNumber unexpected type', typeof raw, raw)
  }
  const fallback = Number(String(raw))
  return Number.isNaN(fallback) ? null : fallback
}

function formatNumber(n: number, maxFraction = 2): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFraction,
  }).format(n)
}

function inferPresentationUnit(presentation: string): string {
  const text = normalizeText(presentation)
  if (text.includes('comprim')) return 'comprimido'
  if (text.includes('capsul')) return 'capsula'
  if (text.includes('gota')) return 'gota'
  if (text.includes('ampola')) return 'ampola'
  if (text.includes('frasco')) return 'frasco'
  if (text.includes('bisnaga')) return 'bisnaga'
  if (text.includes('sache')) return 'sache'
  if (text.includes('ml')) return 'ml'
  return 'unidade'
}

function isDiscreteUnit(unit: string): boolean {
  return DISCRETE_UNITS.has(normalizeUnit(unit))
}

function isDosePerKg(unit: string) {
  return normalizeText(unit).includes('/kg')
}

function isAdministrationUnit(unit: string) {
  return ADMINISTRATION_UNITS.has(normalizeUnit(unit))
}

function getUnitLabel(unit: string, value: number): string {
  const normalized = normalizeUnit(unit)
  const labels = UNIT_LABELS[normalized]
  if (!labels) return value > 1 ? unit : unit
  return value > 1 ? labels.plural : labels.singular
}

function isIntegerLike(value: number, tolerance = 0.001) {
  return Math.abs(Math.round(value) - value) <= tolerance
}

function quantizeFraction(value: number, step: number): number {
  return Math.round(value / step) * step
}

function formatTabletFraction(value: number): string {
  const quantized = quantizeFraction(value, 0.25)
  const whole = Math.floor(quantized + 0.0001)
  const fraction = Math.round((quantized - whole) * 4)
  const mixedUnit = quantized > 1 && whole > 1 ? 'comprimidos' : 'comprimido'

  if (fraction === 0) return `${formatNumber(quantized, 0)} ${getUnitLabel('comprimido', quantized)}`
  const fractionText =
    fraction === 1 ? '1/4'
      : fraction === 2 ? 'meio (0,5)'
        : '3/4'

  if (whole <= 0) return `${fractionText} comprimido`
  return `${whole} e ${fractionText} ${mixedUnit}`
}

function formatAdministrationAmount(value: number, unit: string): string {
  const normalized = normalizeUnit(unit)
  if (normalized === 'comprimido') return formatTabletFraction(value)
  if (normalized === 'capsula' || normalized === 'ampola' || normalized === 'frasco' || normalized === 'bisnaga' || normalized === 'sache' || normalized === 'flaconete' || normalized === 'pipeta' || normalized === 'supositorio' || normalized === 'unidade') {
    return `${formatNumber(value, 0)} ${getUnitLabel(normalized, value)}`
  }
  if (normalized === 'gota' || normalized === 'puff' || normalized === 'jato' || normalized === 'ato' || normalized === 'spray') {
    return `${formatNumber(value, 0)} ${getUnitLabel(normalized, value)}`
  }
  if (normalized === 'ml' || normalized === 'l') {
    return `${formatNumber(value)} ${getUnitLabel(normalized, value)}`
  }
  return `${formatNumber(value)} ${unit}`.trim()
}

function formatFractionalAmount(value: number, unit: string): string {
  const normalized = normalizeUnit(unit)
  const whole = Math.floor(value + 0.0001)
  const fraction = value - whole
  if (normalized === 'comprimido') return formatTabletFraction(value)
  if (Math.abs(fraction) < 0.001) return formatAdministrationAmount(value, normalized)
  return `${formatNumber(value)} ${getUnitLabel(normalized, value)}`.trim()
}

function formatSupportDose(value: number | null, unit: string): string {
  if (value === null || !unit) return ''
  return `${formatNumber(value)} ${unit}`.trim()
}

function resolvePresentationKind(item: PrescriptionItem, convertedUnit: string): 'tablet' | 'capsule' | 'oral-liquid' | 'drops' | 'actuation' | 'unitary' | 'topical' | 'generic' {
  const mode = getPresentationString({ metadata: item.presentationMetadata || null }, 'administration_mode')
  if (mode === 'tablet') return 'tablet'
  if (mode === 'capsule') return 'capsule'
  if (mode === 'liquid_oral') return 'oral-liquid'
  if (mode === 'drops') return 'drops'
  if (mode === 'actuation') return 'actuation'
  if (mode === 'unit') return 'unitary'
  if (mode === 'topical_manual') return 'topical'

  const form = normalizeText(item.pharmaceuticalForm || item.presentation)
  const unit = normalizeUnit(convertedUnit)
  if (form.includes('comprim') || unit === 'comprimido') return 'tablet'
  if (form.includes('capsul') || unit === 'capsula') return 'capsule'
  if (form.includes('gota') || unit === 'gota') return 'drops'
  if (getPresentationNumber({ metadata: item.presentationMetadata || null }, 'dose_per_actuation') || form.includes('spray') || form.includes('inal') || unit === 'puff' || unit === 'jato' || unit === 'ato' || unit === 'spray') {
    return 'actuation'
  }
  if (form.includes('solucao oral') || form.includes('suspens') || form.includes('xarope') || form.includes('elixir') || unit === 'ml') return 'oral-liquid'
  if (form.includes('pomada') || form.includes('creme') || form.includes('gel') || form.includes('shampoo')) return 'topical'
  if (unit === 'sache' || unit === 'flaconete' || unit === 'pipeta' || unit === 'supositorio' || unit === 'ampola' || unit === 'unidade') return 'unitary'
  return 'generic'
}

function resolveStructuredConcentration(item: PrescriptionItem): ParsedConcentration | null {
  const amount = toNumber(item.presentationValue)
  const amountUnit = (item.presentationValueUnit || '').trim()
  const perValue = toNumber(item.presentationPerValue) || 1
  const perUnit = (item.presentationPerUnit || '').trim() || inferPresentationUnit(item.presentation)
  if (amount !== null && amount > 0 && amountUnit) {
    return {
      amount,
      amountUnit,
      perValue: perValue > 0 ? perValue : 1,
      perUnit,
    }
  }
  return parseConcentration(item.concentration, item.presentation)
}

function getDoseBaseUnit(unit: string) {
  const parts = (unit || '').split('/')
  return (parts[0] || '').trim()
}

function routeToText(route: RouteGroup | undefined): string {
  // ✅ OBJ 3: Corrigir bug "via undefined"
  if (!route) return 'oral' // fallback padrão

  const map: Record<RouteGroup, string> = {
    ORAL: 'oral',
    OTOLOGICO: 'otológica',
    OFTALMICO: 'oftálmica',
    TOPICO: 'tópica',
    INTRANASAL: 'intranasal',
    RETAL: 'retal',
    SC: 'subcutânea',
    IM: 'intramuscular',
    IV: 'intravenosa',
    INALATORIO: 'inalatória',
    TRANSDERMICO: 'transdérmica',
    OUTROS: 'definida pelo prescritor',
  }
  return map[route] || 'oral' // ✅ fallback adicional
}

interface ParsedConcentration {
  amount: number
  amountUnit: string
  perValue: number
  perUnit: string
}

function parseConcentration(concentration: string, presentation: string): ParsedConcentration | null {
  const text = (concentration || '').trim()
  if (!text) return null
  const withDivider = text.match(/(\d+(?:[.,]\d+)?)\s*([a-zA-Z%µ]+)\s*\/\s*(\d+(?:[.,]\d+)?)?\s*([a-zA-Z%µ]+)/)
  if (withDivider) {
    const amount = toNumber(withDivider[1]) || 0
    const amountUnit = withDivider[2]
    const perValue = toNumber(withDivider[3] || '1') || 1
    const perUnit = withDivider[4]
    if (amount <= 0 || perValue <= 0) return null
    return { amount, amountUnit, perValue, perUnit }
  }

  const simple = text.match(/(\d+(?:[.,]\d+)?)\s*([a-zA-Z%µ]+)/)
  if (!simple) return null
  const amount = toNumber(simple[1]) || 0
  const amountUnit = simple[2]
  const perValue = 1
  const perUnit = inferPresentationUnit(presentation)
  if (amount <= 0) return null
  return { amount, amountUnit, perValue, perUnit }
}

export interface QuantityMemory {
  steps: string[]
  baseDose: number | null
  baseDoseUnit: string
  perDoseOutput: number | null
  perDoseOutputUnit: string
  frequencyPerDay: number | null
  durationDays: number | null
  totalOutput: number | null
}

export interface QuantityResult {
  perDose: number | null
  total: number | null
  unit: string
  label: string
  instructionLabel: string
  supportingLabel: string
  warnings: string[]
  memory: QuantityMemory
}

export function resolveFrequency(item: PrescriptionItem): {
  normalizedTimesPerDay: number | null
  label: string
} {
  if (item.frequencyToken) {
    const times = FREQUENCY_TOKEN_TO_TIMES[item.frequencyToken]
    return {
      normalizedTimesPerDay: times,
      label: times === 1 ? 'uma vez por dia' : `${times} vezes ao dia`,
    }
  }

  if (item.frequencyType === 'everyHours') {
    const hours = toNumber(item.everyHours)
    if (!hours || hours <= 0) return { normalizedTimesPerDay: null, label: 'frequência não informada' }
    return { normalizedTimesPerDay: 24 / hours, label: `a cada ${formatNumber(hours, 0)} horas` }
  }

  const times = toNumber(item.timesPerDay)
  if (!times || times <= 0) return { normalizedTimesPerDay: null, label: 'frequência não informada' }
  return {
    normalizedTimesPerDay: times,
    label: times === 1 ? 'uma vez por dia' : `${formatNumber(times, 0)} vezes ao dia`,
  }
}

function frequencyLabelForTutor(item: PrescriptionItem, fallback: string): string {
  if (item.frequencyType === 'everyHours') {
    const hours = toNumber(item.everyHours)
    if (hours && hours > 0) return `a cada ${formatNumber(hours, 0)} horas`
    return fallback
  }

  const tokenTimes = item.frequencyToken ? FREQUENCY_TOKEN_TO_TIMES[item.frequencyToken] : null
  const numericTimes = tokenTimes || toNumber(item.timesPerDay)
  if (!numericTimes || numericTimes <= 0) return fallback

  if (numericTimes === 1) return 'uma vez por dia'
  const interval = 24 / numericTimes
  if (Number.isFinite(interval) && Math.abs(Math.round(interval) - interval) < 0.001) {
    return `a cada ${formatNumber(interval, 0)} horas`
  }
  return `${formatNumber(numericTimes, 0)} vezes por dia`
}

function frequencyEveryHoursLabel(item: PrescriptionItem): string {
  if (item.frequencyType === 'everyHours') {
    const hours = toNumber(item.everyHours)
    if (hours && hours > 0) return `a cada ${formatNumber(hours, 0)} horas`
    return 'a cada 24 horas'
  }

  const tokenTimes = item.frequencyToken ? FREQUENCY_TOKEN_TO_TIMES[item.frequencyToken] : null
  const numericTimes = tokenTimes || toNumber(item.timesPerDay)
  if (!numericTimes || numericTimes <= 0) return 'a cada 24 horas'

  const interval = 24 / numericTimes
  if (Number.isFinite(interval) && Math.abs(Math.round(interval) - interval) < 0.001) {
    return `a cada ${formatNumber(interval, 0)} horas`
  }
  return frequencyLabelForTutor(item, 'a cada 24 horas')
}

function startTimeLabel(startDate?: string): string {
  const raw = (startDate || '').trim()
  if (!raw) return '08:00'

  const isoMatch = raw.match(/T(\d{2}:\d{2})/)
  if (isoMatch?.[1]) return isoMatch[1]

  const genericMatch = raw.match(/(\d{2}:\d{2})/)
  if (genericMatch?.[1]) return genericMatch[1]

  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) return '08:00'
  const hh = String(parsed.getHours()).padStart(2, '0')
  const mm = String(parsed.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

function formatDateLabel(dateRaw?: string): string {
  const raw = (dateRaw || '').trim()
  if (!raw) return ''
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const [year, month, day] = raw.split('-')
    return `${day}/${month}/${year}`
  }
  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toLocaleDateString('pt-BR')
}

function formatStartSegment(item: PrescriptionItem): string {
  const startHour = (item.startHour || startTimeLabel(item.start_date)).trim()
  const startDate = (item.startDate || '').trim()
  if (startDate && startHour) return `iniciando em ${formatDateLabel(startDate)} às ${startHour}`
  if (startHour) return `iniciando às ${startHour}`
  if (startDate) return `iniciando em ${formatDateLabel(startDate)}`
  return ''
}

function uniqueByNormalizedText(lines: string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const line of lines) {
    const trimmed = (line || '').trim()
    if (!trimmed) continue
    const key = normalizeText(trimmed)
    if (!key || seen.has(key)) continue
    seen.add(key)
    result.push(trimmed)
  }
  return result
}

export function calculateMedicationQuantity(item: PrescriptionItem, state: PrescriptionState): QuantityResult {
  const steps: string[] = []
  const warnings: string[] = []
  const doseValue = toNumber(item.doseValue)
  if (!doseValue || doseValue <= 0) {
    return {
      perDose: null,
      total: null,
      unit: '',
      label: 'Quantidade não calculada',
      instructionLabel: '',
      supportingLabel: '',
      warnings: [],
      memory: {
        steps: ['Dose não informada.'],
        baseDose: null,
        baseDoseUnit: '',
        perDoseOutput: null,
        perDoseOutputUnit: '',
        frequencyPerDay: null,
        durationDays: null,
        totalOutput: null,
      },
    }
  }

  const weightKg = toNumber(state.patient.weightKg)
  const doseUnitRaw = (item.doseUnit || '').trim()
  const dosePerKg = isDosePerKg(doseUnitRaw)
  const baseUnitRaw = dosePerKg ? getDoseBaseUnit(doseUnitRaw) : doseUnitRaw
  const baseUnitNorm = normalizeUnit(baseUnitRaw)
  const presentationMeta = { metadata: item.presentationMetadata || null }

  let baseDosePerAdministration = doseValue
  if (dosePerKg) {
    if (!weightKg || weightKg <= 0) {
      return {
        perDose: null,
        total: null,
        unit: '',
        label: 'Peso não informado para cálculo',
        instructionLabel: '',
        supportingLabel: '',
        warnings: [],
        memory: {
          steps: ['Dose por kg exige peso válido do paciente.'],
          baseDose: null,
          baseDoseUnit: baseUnitRaw,
          perDoseOutput: null,
          perDoseOutputUnit: '',
          frequencyPerDay: null,
          durationDays: null,
          totalOutput: null,
        },
      }
    }
    baseDosePerAdministration = doseValue * weightKg
    steps.push(`${formatNumber(doseValue)} ${doseUnitRaw} × ${formatNumber(weightKg)} kg = ${formatNumber(baseDosePerAdministration)} ${baseUnitRaw}`)
  } else {
    steps.push(`Dose por administração: ${formatNumber(baseDosePerAdministration)} ${doseUnitRaw || 'unidade'}`)
  }

  const supportingLabel = formatSupportDose(baseDosePerAdministration, baseUnitRaw)
  
  // ✅ INTEGRATION: Use the new clinical helper
  const practicalResult = calculatePracticalEquivalent({
    presentation: {
      pharmaceutical_form: item.pharmaceuticalForm || item.presentation,
      value: toNumber(item.presentationValue),
      value_unit: item.presentationValueUnit,
      per_value: toNumber(item.presentationPerValue),
      per_unit: item.presentationPerUnit,
      pharmacy_veterinary: !!item.presentationMetadata?.pharmacy_veterinary,
      pharmacy_human: !!item.presentationMetadata?.pharmacy_human,
      pharmacy_compounding: !!item.presentationMetadata?.pharmacy_compounding,
      // Legacy tags if metadata flags are missing
      pharmacyTags: (item.presentationMetadata?.pharmacyTags as any) || []
    } as any,
    totalDosePerAdmin: baseDosePerAdministration,
    doseUnit: baseUnitRaw
  })

  let perDoseOutput: number | null = null
  let perDoseOutputUnit = ''
  let instructionLabel = supportingLabel
  let detailLabel = supportingLabel ? `Dose: ${supportingLabel}` : 'Quantidade não calculada'

  if (practicalResult.success) {
    perDoseOutput = practicalResult.equivalentValue
    perDoseOutputUnit = practicalResult.equivalentUnit
    instructionLabel = practicalResult.label
    detailLabel = `Dose: ${supportingLabel} = ${practicalResult.label}`
    if (practicalResult.alert) {
      warnings.push(practicalResult.alert)
    }
    if (practicalResult.steps) {
      steps.push(...practicalResult.steps)
    }
  } else if (isAdministrationUnit(baseUnitRaw)) {
    // Fallback for cases where dose unit is already the administration unit
    perDoseOutput = baseDosePerAdministration
    perDoseOutputUnit = baseUnitNorm
    instructionLabel = formatAdministrationAmount(perDoseOutput, perDoseOutputUnit)
    detailLabel = `Dose: ${instructionLabel}`
  } else {
    // If helper failed and it's not a direct unit, we log why
    if (practicalResult.steps) {
      steps.push(...practicalResult.steps)
    }
    steps.push(`Cálculo clínico falhou: ${practicalResult.failReason}`)
    if (practicalResult.reasonCode === 'unit_mismatch') {
      warnings.push(`Incompatibilidade de unidade: ${baseUnitRaw} vs apresentação.`)
    }
  }

  const frequency = resolveFrequency(item).normalizedTimesPerDay
  const durationDays = toNumber(item.durationDays)
  let total: number | null = null

  if (perDoseOutput !== null && perDoseOutputUnit && !item.untilFinished && !item.continuousUse && item.durationMode !== 'until_recheck' && frequency && durationDays && durationDays > 0) {
    total = perDoseOutput * frequency * durationDays
    steps.push(`${formatNumber(perDoseOutput)} × ${formatNumber(frequency)} vezes/dia × ${formatNumber(durationDays, 0)} dias = ${formatNumber(total)} ${perDoseOutputUnit}`)
  } else if (item.continuousUse) {
    steps.push('Uso contínuo: total estimado não calculado.')
  } else if (item.untilFinished) {
    steps.push('Até acabar: total estimado não calculado.')
  } else {
    steps.push('Frequência e/ou duração inválidas para cálculo de total.')
  }

  const roundedTotal = total === null || !perDoseOutputUnit
    ? null
    : isDiscreteUnit(perDoseOutputUnit)
      ? Math.ceil(total)
      : Number(total.toFixed(2))
  const label = roundedTotal !== null && perDoseOutputUnit
    ? `${detailLabel} • Total estimado: ${formatAdministrationAmount(roundedTotal, perDoseOutputUnit)}`
    : detailLabel

  return {
    perDose: perDoseOutput,
    total: roundedTotal,
    unit: perDoseOutputUnit,
    label,
    instructionLabel,
    supportingLabel,
    warnings,
    memory: {
      steps,
      baseDose: baseDosePerAdministration,
      baseDoseUnit: baseUnitRaw,
      perDoseOutput,
      perDoseOutputUnit,
      frequencyPerDay: frequency,
      durationDays: durationDays && durationDays > 0 ? durationDays : null,
      totalOutput: roundedTotal,
    },
  }
}

export function buildCalculationMemory(item: PrescriptionItem, state: PrescriptionState): string[] {
  const result = calculateMedicationQuantity(item, state)
  return result.memory.steps
}

export function buildAutoInstruction(item: PrescriptionItem, state: PrescriptionState): string {
  const freq = resolveFrequency(item)
  const qty = calculateMedicationQuantity(item, state)
  const administrationText = qty.instructionLabel || qty.supportingLabel
  const adminSegment = administrationText ? `Administrar ${administrationText}` : 'Administrar volume conforme orientação clínica'
  const routeSegment = `por via ${routeToText(item.routeGroup)}`
  const frequencySegment =
    freq.label === 'frequência não informada'
      ? 'a cada 24 horas'
      : frequencyEveryHoursLabel(item)

  let durationSegment = ''
  if (item.durationMode === 'continuous_until_recheck') {
    durationSegment = 'em uso contínuo até reavaliação clínica'
  } else if (item.durationMode === 'until_recheck') {
    durationSegment = 'até reavaliação clínica'
  } else if (item.untilFinished || item.durationMode === 'until_finished') {
    durationSegment = 'até terminar o medicamento'
  } else {
    const days = toNumber(item.durationDays)
    if (days && days > 0) durationSegment = `durante ${formatNumber(days, 0)} dias`
    else if (item.continuousUse || item.durationMode === 'continuous_use') durationSegment = 'em uso contínuo'
    else durationSegment = 'até reavaliação clínica'
  }

  const startSegment = formatStartSegment(item)

  return [adminSegment, routeSegment, frequencySegment, startSegment, durationSegment]
    .filter(Boolean)
    .join(', ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/,+$/, '') + '.'
}

function resolveInstruction(item: PrescriptionItem, state?: PrescriptionState): string {
  if (item.autoInstruction && !item.manualEdited && state) return buildAutoInstruction(item, state)
  return item.instruction
}

export function itemStatus(item: PrescriptionItem, state?: PrescriptionState): 'ok' | 'incomplete' {
  if (!item.name.trim()) return 'incomplete'
  if (!item.routeGroup) return 'incomplete'
  if (!resolveInstruction(item, state).trim()) return 'incomplete'
  if (state && calculateMedicationQuantity(item, state).warnings.length > 0) return 'incomplete'
  return 'ok'
}

function buildItemTitle(item: PrescriptionItem): string {
  return buildMedicationDisplayName({
    name: item.name,
    commercialName: item.commercialName,
    concentrationText: item.concentration,
  })
}

export function splitPrescriptionByControl(state: PrescriptionState): {
  standard: PrescriptionState | null
  specialControl: PrescriptionState | null
} {
  const catalogControlledById = new Map<string, boolean>()
  try {
    const db = loadRxDb()
    db.catalog.forEach((drug) => {
      catalogControlledById.set(drug.id, !!drug.controlled)
    })
  } catch {
    // No-op: fallback to item flag only.
  }

  const isControlledItem = (item: PrescriptionItem) =>
    !!item.controlled || (!!item.catalogDrugId && catalogControlledById.get(item.catalogDrugId) === true)

  const controlledItems = state.items.filter((item) => isControlledItem(item))
  const standardItems = state.items.filter((item) => !isControlledItem(item))

  if (!controlledItems.length) {
    return { standard: state, specialControl: null }
  }

  const standard = standardItems.length ? { ...state, items: standardItems } : null
  const specialControl = { ...state, items: controlledItems }
  return { standard, specialControl }
}

export function renderRxToPrintDoc(
  state: PrescriptionState,
  opts?: { renderMode?: 'final' | 'template'; documentKind?: 'standard' | 'special-control' }
): PrintDoc {
  const renderMode = opts?.renderMode || 'final'
  const documentKind = opts?.documentKind || 'standard'
  const grouped = new Map<RouteGroup, PrescriptionItem[]>()
  for (const key of SECTION_ORDER) grouped.set(key, [])

  for (const item of state.items) {
    const key = item.routeGroup || 'OUTROS'
    const current = grouped.get(key) || []
    current.push(item)
    grouped.set(key, current)
  }

  const sections = SECTION_ORDER
    .map((key) => {
      const source = grouped.get(key) || []
      if (renderMode === 'template' && key !== 'ORAL') return null
      if (!source.length && renderMode === 'final') return null

      const items: PrintDocItem[] = source.map((item, idx) => {
        const qty = calculateMedicationQuantity(item, state)
        const instruction = resolveInstruction(item, state)
        const subtitleParts = [item.presentation]

        // Mostrar resumo no padrão da receita: "Por dose" ou "Total estimado"
        if (qty.label && qty.label !== 'Quantidade não calculada') {
          subtitleParts.push(qty.label)
        } else if (toNumber(item.doseValue) !== null) {
          const missingWeight = (item.doseUnit || '').includes('/kg') && !toNumber(state.patient.weightKg)
          subtitleParts.push(missingWeight ? 'Peso não informado para cálculo' : 'Sem concentração para cálculo')
        }

        return {
          id: item.id,
          index: idx + 1,
          title: buildItemTitle(item) || 'Medicamento',
          subtitle: subtitleParts.filter(Boolean).join(' — '),
          instruction: instruction || 'Instrução não informada.',
          titleBold: !!item.titleBold,
          titleUnderline: !!item.titleUnderline,
          cautions: uniqueByNormalizedText([...(item.cautions || []), ...(qty.warnings || [])]),
          status: itemStatus(item, state),
        }
      })

      if (!items.length && renderMode === 'template') {
        const placeholderTitle = documentKind === 'special-control' ? 'Amoxicilina + Clavulanato' : 'Dipirona Sódica'
        const placeholderSubtitle = documentKind === 'special-control' ? 'Comprimido - Uso Oral' : 'Gotas - Uso Oral'
        const placeholderInstruction = documentKind === 'special-control' 
          ? 'Administrar 1 comprimido por dose, por via oral, a cada 12 horas, durante 7 dias.'
          : 'Administrar o volume calculado por dose, por via oral, a cada 8 horas.'

        items.push({
          id: `${key}-placeholder`,
          index: 1,
          title: placeholderTitle,
          subtitle: placeholderSubtitle,
          instruction: placeholderInstruction,
          cautions: documentKind === 'special-control' ? ['Uso sob prescrição e acompanhamento veterinário.'] : [],
          status: 'ok',
        })
      }

      return {
        key,
        title: SECTION_LABEL[key],
        items,
      }
    })
    .filter(Boolean) as PrintDocSection[]

  const recommendations =
    documentKind === 'special-control'
      ? []
      : [
        ...state.recommendations.bullets.filter(Boolean),
        ...(state.recommendations.waterMlPerDay.trim()
          ? [`Meta hídrica diária: ${state.recommendations.waterMlPerDay} mL/dia.`]
          : []),
      ]

  const selectedExams = uniqueByNormalizedText([
    ...state.recommendations.exams,
    ...state.recommendations.customExams,
  ])
  const examReasons =
    selectedExams.length > 0
      ? uniqueByNormalizedText((state.recommendations.examReasons || []).filter(Boolean))
      : []

  const patientParts: string[] = []
  if (state.patient.breed.trim()) patientParts.push(state.patient.breed)
  if (state.patient.ageText.trim()) patientParts.push(state.patient.ageText)

  const tutorName = state.tutor.name || state.tutor.fullName || (state.tutor as any).full_name || '-'
  const tutorLineParts: string[] = [tutorName]
  if (state.tutor.cpf?.trim()) tutorLineParts.push(`CPF: ${state.tutor.cpf.trim()}`)
  if (state.tutor.rg?.trim()) tutorLineParts.push(`RG: ${state.tutor.rg.trim()}`)

  const tutorAddressLine = [
    state.tutor.street || '',
    state.tutor.number || '',
    state.tutor.complement || (state.tutor as any).address_complement || '',
    state.tutor.neighborhood || '',
    [state.tutor.city || '', state.tutor.state || ''].filter(Boolean).join('/'),
    state.tutor.zipcode || '',
    state.tutor.phone || '',
  ]
    .filter(Boolean)
    .join(', ')

  return {
    documentKind,
    documentId: state.prescriber.adminId || 'ADMIN',
    dateLabel: new Date().toLocaleDateString('pt-BR'),
    clinicName: state.prescriber.clinicName || 'CLÍNICA VETERINÁRIA VETIUS',
    prescriberName: state.prescriber.name || 'Dr. Silva',
    prescriberCrmv: state.prescriber.crmv || 'CRMV-SP 00000',
    patientLine: patientParts.length ? `${state.patient.name || '-'} (${patientParts.join(', ')})` : (state.patient.name || '-'),
    tutorLine: tutorLineParts.join(' — '),
    addressLine: tutorAddressLine || '',
    sections,
    recommendations,
    exams:
      documentKind === 'special-control'
        ? []
        : [...examReasons, ...selectedExams],
  }
}
