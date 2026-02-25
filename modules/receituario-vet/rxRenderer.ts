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

const DISCRETE_UNITS = new Set(['comprimido', 'capsula', 'gota', 'ampola', 'frasco', 'bisnaga', 'unidade', 'sachê', 'sache'])

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
}

function normalizeUnit(unit: string): string {
  const key = normalizeText(unit).replace(/\./g, '')
  return UNIT_ALIASES[key] || key
}

function toNumber(raw: string): number | null {
  const normalized = (raw || '').replace(',', '.').trim()
  if (!normalized) return null
  const n = Number(normalized)
  if (Number.isNaN(n)) return null
  return n
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
      perDose: null,
      total: null,
      unit: '',
      label: 'Quantidade não calculada',
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

  let baseDosePerAdministration = doseValue
  if (dosePerKg) {
    if (!weightKg || weightKg <= 0) {
      return {
        perDose: null,
        total: null,
        unit: '',
        label: 'Peso não informado para cálculo',
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

  const concentration = parseConcentration(item.concentration, item.presentation)
  let perDoseOutput = baseDosePerAdministration
  let perDoseOutputUnit = baseUnitRaw || inferPresentationUnit(item.presentation)

  if (concentration) {
    const concentrationAmountUnitNorm = normalizeUnit(concentration.amountUnit)
    if (concentrationAmountUnitNorm === baseUnitNorm && concentration.amount > 0 && concentration.perValue > 0) {
      const ratio = concentration.amount / concentration.perValue
      perDoseOutput = baseDosePerAdministration / ratio
      perDoseOutputUnit = concentration.perUnit || inferPresentationUnit(item.presentation)
      steps.push(
        `${formatNumber(baseDosePerAdministration)} ${baseUnitRaw} ÷ ${formatNumber(concentration.amount)}/${formatNumber(concentration.perValue)} ${concentration.perUnit} = ${formatNumber(perDoseOutput)} ${perDoseOutputUnit}`
      )
    } else {
      steps.push(
        `Concentração "${item.concentration}" não compatível com unidade da dose (${baseUnitRaw || '-'}) para conversão automática.`
      )
    }
  } else if (item.concentration.trim()) {
    steps.push('Concentração informada sem formato reconhecido para conversão automática.')
  }

  const frequency = resolveFrequency(item).normalizedTimesPerDay
  const durationDays = toNumber(item.durationDays)
  let total: number | null = null

  if (!item.untilFinished && !item.continuousUse && frequency && durationDays && durationDays > 0) {
    total = perDoseOutput * frequency * durationDays
    steps.push(`${formatNumber(perDoseOutput)} × ${formatNumber(frequency)} vezes/dia × ${formatNumber(durationDays, 0)} dias = ${formatNumber(total)} ${perDoseOutputUnit}`)
  } else if (item.continuousUse) {
    steps.push('Uso contínuo: total estimado não calculado.')
  } else if (item.untilFinished) {
    steps.push('Até acabar: total estimado não calculado.')
  } else {
    steps.push('Frequência e/ou duração inválidas para cálculo de total.')
  }

  const roundedTotal = total === null ? null : isDiscreteUnit(perDoseOutputUnit) ? Math.ceil(total) : total
  const label = roundedTotal !== null
    ? `Total estimado: ${formatNumber(roundedTotal)} ${perDoseOutputUnit}`
    : `Por dose: ${formatNumber(perDoseOutput)} ${perDoseOutputUnit}`

  return {
    perDose: perDoseOutput,
    total: roundedTotal,
    unit: perDoseOutputUnit,
    label,
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
  const doseValue = toNumber(item.doseValue)
  const doseUnit = (item.doseUnit || '').trim()
  const weightKg = toNumber(state.patient.weightKg)
  const baseDoseUnit = doseUnit.includes('/kg') ? getDoseBaseUnit(doseUnit) : doseUnit

  let perDoseValueText = ''
  if (qty.perDose !== null && qty.unit) {
    perDoseValueText = `${formatNumber(qty.perDose)} ${qty.unit}`
  } else if (doseValue && doseUnit) {
    if (isDosePerKg(doseUnit) && weightKg) perDoseValueText = `${formatNumber(doseValue * weightKg)} ${baseDoseUnit}`
    else perDoseValueText = `${formatNumber(doseValue)} ${doseUnit}`
  }

  const adminSegment = perDoseValueText ? `Administrar ${perDoseValueText} por dose` : 'Administrar conforme orientação clínica'
  const routeSegment = `por via ${routeToText(item.routeGroup)}`
  const frequencySegment =
    freq.label === 'frequência não informada' ? 'conforme frequência clínica' : frequencyLabelForTutor(item, freq.label)

  let durationSegment = ''
  if (item.continuousUse) durationSegment = 'com uso contínuo até reavaliação do paciente'
  else if (item.untilFinished) durationSegment = 'até terminar o medicamento'
  else {
    const days = toNumber(item.durationDays)
    if (days && days > 0) durationSegment = `durante ${formatNumber(days, 0)} dias`
  }

  return [adminSegment, routeSegment, frequencySegment, durationSegment]
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
  return 'ok'
}

function buildItemTitle(item: PrescriptionItem): string {
  const base = [item.name, item.concentration].filter(Boolean).join(' ').trim()
  if (!base) return ''
  if (!item.commercialName?.trim()) return base
  return `${base} (${item.commercialName.trim()})`
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
        if (qty.label !== 'Quantidade não calculada') subtitleParts.push(qty.label)
        return {
          id: item.id,
          index: idx + 1,
          title: buildItemTitle(item) || 'Medicamento',
          subtitle: subtitleParts.filter(Boolean).join(' - '),
          instruction: instruction || 'Instrução não informada.',
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

      return {
        key,
        title: SECTION_LABEL[key],
        items,
      }
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
    patientLine: `${state.patient.name || '-'} (${patientParts.join(', ')})`,
    tutorLine: tutorLineParts.join(' — '),
    addressLine: tutorAddressLine,
    sections,
    recommendations,
    exams:
      documentKind === 'special-control'
        ? []
        : [...selectedExams, ...examReasons],
  }
}


