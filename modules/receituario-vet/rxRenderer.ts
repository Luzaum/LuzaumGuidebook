import { PrescriptionItem, PrescriptionState, PrintDoc, PrintDocItem, RouteGroup } from './rxTypes'
import { loadRxDb } from './rxDb'

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

const DISCRETE_UNITS = new Set(['comprimido', 'capsula', 'gota', 'gotas', 'ampola', 'frasco', 'bisnaga', 'sachê', 'sachet'])

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
  comprimido: 'comprimido',
  comprimidos: 'comprimido',
  comp: 'comprimido',
  comps: 'comprimido',
  cp: 'comprimido',
  capsula: 'capsula',
  capsulas: 'capsula',
  cap: 'capsula',
  caps: 'capsula',
  gota: 'gotas',
  gotas: 'gotas',
  ampola: 'ampola',
  ampolas: 'ampola',
  frasco: 'frasco',
  frascos: 'frasco',
  bisnaga: 'bisnaga',
  bisnagas: 'bisnaga',
  sache: 'sachet',
  sachet: 'sachet',
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
  const fallback = Number(String(raw))
  return Number.isNaN(fallback) ? null : fallback
}

function formatNumber(n: number, maxFraction = 2): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFraction,
  }).format(n)
}

function roundToQuarter(value: number): number {
  return Math.round(value * 4) / 4
}

function formatQuarterFraction(value: number): string {
  const rounded = roundToQuarter(value)
  const whole = Math.floor(rounded)
  const frac = rounded - whole

  let fraction = ''
  if (Math.abs(frac - 0.25) < 0.001) fraction = '1/4'
  else if (Math.abs(frac - 0.5) < 0.001) fraction = '1/2'
  else if (Math.abs(frac - 0.75) < 0.001) fraction = '3/4'

  if (fraction && whole > 0) return `${whole} ${fraction}`
  if (fraction) return fraction
  return String(whole)
}

export function formatPerDoseQuantity(perDose: number, unitRaw: string): string {
  const unit = normalizeUnit(unitRaw)
  if (unit === 'comprimido' || unit === 'capsula') {
    const rounded = roundToQuarter(perDose)
    const decimal = formatNumber(rounded, 2)
    const frac = formatQuarterFraction(rounded)
    const label = unit === 'comprimido' ? 'comprimido' : 'cápsula'
    return `${decimal} (${frac}) ${label}`
  }
  if (unit === 'ml' || unit === 'l') {
    return `${formatNumber(perDose, 2)} ${unit === 'ml' ? 'mL' : 'L'}`
  }
  if (unit === 'gotas') {
    return `${formatNumber(perDose, 0)} gota${perDose > 1 ? 's' : ''}`
  }
  return `${formatNumber(perDose, 2)} ${unitRaw || ''}`.trim()
}

function inferPresentationUnit(presentation: string): string {
  const text = normalizeText(presentation)
  if (text.includes('comprim')) return 'comprimido'
  if (text.includes('capsul')) return 'capsula'
  if (text.includes('gota')) return 'gotas'
  if (text.includes('ml')) return 'ml'
  if (text.includes('suspens')) return 'ml'
  if (text.includes('soluc')) return 'ml'
  if (text.includes('xarope')) return 'ml'
  return 'ml' // Safety fallback, never "unidade"
}

function isDiscreteUnit(unit: string): boolean {
  return DISCRETE_UNITS.has(normalizeUnit(unit))
}

function isDosePerKg(unit: string) {
  return normalizeText(unit).includes('/kg')
}

function getDoseBaseUnit(unit: string) {
  const parts = (unit || '').split('/')
  return (parts[0] || '').trim()
}

function routeToText(route: RouteGroup | undefined): string {
  if (!route) return 'oral'
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
  return map[route] || 'oral'
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
  const withDivider = text.match(/(\d+(?:[.,]\d+)?)\s*([a-zA-ZÀ-ÿ%µ]+)\s*\/\s*(\d+(?:[.,]\d+)?)?\s*([a-zA-ZÀ-ÿ%µ]+)/)
  if (withDivider) {
    const amount = toNumber(withDivider[1]) || 0
    const amountUnit = withDivider[2]
    const perValue = toNumber(withDivider[3] || '1') || 1
    const perUnit = withDivider[4]
    if (amount <= 0 || perValue <= 0) return null
    return { amount, amountUnit, perValue, perUnit }
  }

  const simple = text.match(/(\d+(?:[.,]\d+)?)\s*([a-zA-ZÀ-ÿ%µ]+)/)
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

function normalizeFrequencyForPrint(item: PrescriptionItem): { hours: number | null, label: string } {
  if (item.frequencyToken) {
    const times = FREQUENCY_TOKEN_TO_TIMES[item.frequencyToken];
    const hours = 24 / times;
    return { hours, label: `a cada ${formatNumber(hours, 0)} horas` };
  }

  if (item.frequencyType === 'everyHours') {
    const hours = toNumber(item.everyHours);
    if (hours && hours > 0) {
      return { hours, label: `a cada ${formatNumber(hours, 0)} horas` };
    }
    return { hours: null, label: 'frequência não informada' };
  }

  const numericTimes = item.frequencyToken ? FREQUENCY_TOKEN_TO_TIMES[item.frequencyToken] : toNumber(item.timesPerDay);
  if (!numericTimes || numericTimes <= 0) {
    return { hours: null, label: 'frequência não informada' };
  }

  const hours = 24 / numericTimes;
  const commonMap: Record<number, number> = { 1: 24, 2: 12, 3: 8, 4: 6, 6: 4, 8: 3, 12: 2, 24: 1 };
  const mappedHours = commonMap[numericTimes] || hours;
  const formattedHours = Math.abs(Math.round(mappedHours) - mappedHours) < 0.001 ? formatNumber(mappedHours, 0) : formatNumber(mappedHours, 1);
  return { hours: mappedHours, label: `a cada ${formattedHours} horas` };
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
  const doseValue = toNumber(item.doseValue)
  if (!doseValue || doseValue <= 0) {
    return {
      perDose: null, total: null, unit: '', label: 'Quantidade não calculada',
      memory: { steps: ['Dose não informada.'], baseDose: null, baseDoseUnit: '', perDoseOutput: null, perDoseOutputUnit: '', frequencyPerDay: null, durationDays: null, totalOutput: null },
    }
  }

  const weightKg = toNumber(state.patient.weightKg)
  const doseUnitRaw = (item.doseUnit || '').trim()
  const dosePerKg = isDosePerKg(doseUnitRaw)
  const baseUnitRaw = dosePerKg ? getDoseBaseUnit(doseUnitRaw) : doseUnitRaw
  const baseUnitNorm = normalizeUnit(baseUnitRaw)

  let baseDosePerAdministration = doseValue
  if (dosePerKg) {
    if (!weightKg || weightKg <= 0) {
      return {
        perDose: null, total: null, unit: '', label: 'Peso não informado para cálculo',
        memory: { steps: ['Dose por kg exige peso válido do paciente.'], baseDose: null, baseDoseUnit: baseUnitRaw, perDoseOutput: null, perDoseOutputUnit: '', frequencyPerDay: null, durationDays: null, totalOutput: null },
      }
    }
    baseDosePerAdministration = doseValue * weightKg
    steps.push(`${formatNumber(doseValue)} ${doseUnitRaw} × ${formatNumber(weightKg)} kg = ${formatNumber(baseDosePerAdministration)} ${baseUnitRaw}`)
  } else {
    steps.push(`Dose por administração: ${formatNumber(baseDosePerAdministration)} ${doseUnitRaw || 'mg'}`)
  }

  const concentration = parseConcentration(item.concentration, item.presentation)
  let perDoseOutput = baseDosePerAdministration
  let perDoseOutputUnit = baseUnitRaw || inferPresentationUnit(item.presentation)

  if (concentration) {
    const concentrationAmountUnitNorm = normalizeUnit(concentration.amountUnit)
    if (concentrationAmountUnitNorm === baseUnitNorm && concentration.amount > 0 && concentration.perValue > 0) {
      const ratio = concentration.amount / concentration.perValue
      perDoseOutput = baseDosePerAdministration / ratio
      perDoseOutputUnit = concentration.perUnit || inferPresentationUnit(item.presentation)
      steps.push(`${formatNumber(baseDosePerAdministration)} ${baseUnitRaw} ÷ ${formatNumber(concentration.amount)}/${formatNumber(concentration.perValue)} ${concentration.perUnit} = ${formatNumber(perDoseOutput)} ${perDoseOutputUnit}`)
    } else {
      steps.push(`Concentração "${item.concentration}" não compatível com unidade da dose (${baseUnitRaw || '-'}) para conversão automática.`)
    }
  } else if ((item.concentration || '').trim()) {
    steps.push('Concentração informada sem formato reconhecido para conversão automática.')
  }

  const normUnit = normalizeUnit(perDoseOutputUnit)
  if (normUnit === 'comprimido' || normUnit === 'capsula') {
    const rounded = roundToQuarter(perDoseOutput)
    if (Math.abs(rounded - perDoseOutput) > 0.0001) {
      steps.push(`Arredondamento de sólido em 1/4: ${formatNumber(perDoseOutput)} -> ${formatNumber(rounded, 2)}`)
    }
    perDoseOutput = rounded
  }

  const frequency = resolveFrequency(item).normalizedTimesPerDay
  const durationDays = toNumber(item.durationDays)
  let total: number | null = null

  if (!item.untilFinished && !item.continuousUse && frequency && durationDays && durationDays > 0) {
    total = perDoseOutput * frequency * durationDays
    steps.push(`${formatNumber(perDoseOutput)} × ${formatNumber(frequency)} vezes/dia × ${formatNumber(durationDays, 0)} dias = ${formatNumber(total)} ${perDoseOutputUnit}`)
  }

  const roundedTotal = total === null ? null : isDiscreteUnit(perDoseOutputUnit) ? Math.ceil(total) : total
  const label = roundedTotal !== null
    ? `Total estimado: ${formatNumber(roundedTotal)} ${perDoseOutputUnit}`
    : `Por vez: ${formatPerDoseQuantity(perDoseOutput, perDoseOutputUnit)}`

  return {
    perDose: perDoseOutput, total: roundedTotal, unit: perDoseOutputUnit, label,
    memory: { steps, baseDose: baseDosePerAdministration, baseDoseUnit: baseUnitRaw, perDoseOutput, perDoseOutputUnit, frequencyPerDay: frequency, durationDays: durationDays && durationDays > 0 ? durationDays : null, totalOutput: roundedTotal },
  }
}

export function buildCalculationMemory(item: PrescriptionItem, state: PrescriptionState): string[] {
  const result = calculateMedicationQuantity(item, state)
  return result.memory.steps
}

export function buildAutoInstruction(item: PrescriptionItem, state: PrescriptionState): string {
  const freq = resolveFrequency(item)
  const qty = calculateMedicationQuantity(item, state)

  let perDoseValueText = ''
  if (item.manualQuantity) {
    perDoseValueText = item.manualQuantity
  } else if (qty.perDose !== null && qty.unit) {
    perDoseValueText = formatPerDoseQuantity(qty.perDose, qty.unit)
  }

  const adminSegment = perDoseValueText ? `Administrar ${perDoseValueText} por vez` : 'Administrar conforme orientação clínica'
  const routeSegment = `por via ${routeToText(item.routeGroup)}`
  const frequencySegment = freq.label === 'frequência não informada' ? 'conforme frequência clínica' : frequencyLabelForTutor(item, freq.label)

  let durationSegment = ''
  if (item.continuousUse) durationSegment = 'com uso contínuo até reavaliação'
  else if (item.untilFinished) durationSegment = 'até terminar o medicamento'
  else {
    const days = toNumber(item.durationDays)
    if (days && days > 0) durationSegment = `durante ${formatNumber(days, 0)} dias`
  }

  return [adminSegment, routeSegment, frequencySegment, durationSegment].filter(Boolean).join(', ').trim() + '.'
}

function resolveInstruction(item: PrescriptionItem, state?: PrescriptionState): string {
  if (item.autoInstruction && !item.manualEdited && state) {
    const auto = buildAutoInstruction(item, state)
    if (item.instruction && item.instruction.trim()) {
      return `${auto}\n${item.instruction.trim()}`
    }
    return auto
  }
  return item.instruction
}

export function itemStatus(item: PrescriptionItem, state?: PrescriptionState): 'ok' | 'incomplete' {
  if (!item.name.trim()) return 'incomplete'
  if (!item.routeGroup) return 'incomplete'
  if (!resolveInstruction(item, state).trim()) return 'incomplete'
  return 'ok'
}

function buildItemTitle(item: PrescriptionItem): string {
  const base = [item.name, item.concentration].filter(Boolean).join(' ').trim()
  if (!base) return ''
  if (!item.commercialName?.trim()) return base
  return `${base} (${item.commercialName.trim()})`
}

export function splitPrescriptionByControl(state: PrescriptionState): { standard: PrescriptionState | null, specialControl: PrescriptionState | null } {
  const isControlledItem = (item: PrescriptionItem) => !!item.controlled
  const controlledItems = state.items.filter((item) => isControlledItem(item))
  const standardItems = state.items.filter((item) => !isControlledItem(item))
  if (!controlledItems.length) return { standard: state, specialControl: null }
  const standard = standardItems.length ? { ...state, items: standardItems } : null
  const specialControl = { ...state, items: controlledItems }
  return { standard, specialControl }
}

export function renderRxToPrintDoc(state: PrescriptionState, opts?: { renderMode?: 'final' | 'template'; documentKind?: 'standard' | 'special-control' }): PrintDoc {
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

        // G3: Mostrar cálculo de dose/volume no subtitle
        if (qty.label !== 'Quantidade não calculada') {
          const doseStr = qty.perDose !== null ? `${formatNumber(qty.perDose)} ${qty.unit}` : ''
          const totalStr = qty.total !== null ? ` · Total: ${formatNumber(qty.total)} ${qty.unit}` : ''
          const calcLabel = doseStr ? `Dose calculada: ${doseStr}${totalStr}` : qty.label
          subtitleParts.push(calcLabel)
        } else if (toNumber(item.doseValue) !== null) {
          // G4: Dose presente mas cálculo não pôde ser completado — mostrar hint sem crashar
          const missingWeight = (item.doseUnit || '').includes('/kg') && !toNumber(state.patient.weightKg)
          subtitleParts.push(missingWeight ? 'Peso não informado para cálculo' : 'Sem concentração para cálculo')
        }
        return {
          id: item.id,
          index: idx + 1,
          title: buildItemTitle(item) || 'Medicamento',
          subtitle: subtitleParts.filter(Boolean).join(' - '),
          instruction: instruction || 'Instrução não informada.',
          start_date: item.start_date || '',
          titleBold: !!item.titleBold,
          titleUnderline: !!item.titleUnderline,
          cautions: item.cautions.filter(Boolean),
          status: itemStatus(item, state),
        }
      })

      if (!items.length && renderMode === 'template') {
        if (documentKind === 'special-control') {
          items.push({
            id: `${key}-placeholder-special`,
            index: 1,
            title: 'Amoxicilina + Clavulanato',
            subtitle: 'Comprimido - Uso Oral',
            instruction: 'Administrar 1 comprimido por dose, por via oral, a cada 12 horas, durante 7 dias.',
            cautions: ['Uso sob prescrição e acompanhamento veterinário.'],
            status: 'ok',
          })
        } else {
          items.push({
            id: `${key}-placeholder-standard`,
            index: 1,
            title: 'Dipirona Sódica',
            subtitle: 'Gotas - Uso Oral',
            instruction: 'Administrar o volume calculado por dose, por via oral, a cada 8 horas.',
            cautions: [],
            status: 'ok',
          })
        }
      }

      return { key, title: SECTION_LABEL[key], items }
    })
    .filter(Boolean) as PrintDoc['sections']

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
      ? uniqueByNormalizedText((state.recommendations.examReasons || []).filter(Boolean)).map((line) => `Justificativa: ${line}`)
      : []

  const patientParts: string[] = []
  if (state.patient.breed.trim()) patientParts.push(state.patient.breed)
  if (state.patient.ageText.trim()) patientParts.push(state.patient.ageText)

  const tutorName = state.tutor.name || state.tutor.fullName || (state.tutor as any).full_name || '-'
  const address = [state.tutor.street, state.tutor.number, state.tutor.neighborhood, state.tutor.city].filter(Boolean).join(', ')

  return {
    documentKind,
    documentId: state.prescriber.adminId || 'ADMIN',
    dateLabel: new Date().toLocaleDateString('pt-BR'),
    clinicName: state.prescriber.clinicName || 'CLÍNICA VETERINÁRIA VETIUS',
    prescriberName: state.prescriber.name || 'Dr. Silva',
    prescriberCrmv: state.prescriber.crmv || 'CRMV-SP 00000',
    patientLine: `${state.patient.name || '-'} (${patientParts.join(', ')})`,
    tutorLine: tutorName,
    addressLine: address,
    sections,
    recommendations,
    exams:
      documentKind === 'special-control'
        ? []
        : [...selectedExams, ...examReasons],
  }
}

function quoteSafe(text: string): string {
  return text.replace(/"/g, "'")
}
