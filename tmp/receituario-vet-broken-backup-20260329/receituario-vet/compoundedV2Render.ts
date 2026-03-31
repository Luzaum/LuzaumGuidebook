import type { PatientInfo } from '????./NovaReceita2Page'
import type { CompoundedMedicationV2, CompoundedV2Ingredient, CompoundedV2Regimen } from '????./compoundedV2'
import { formatCompoundedNumber, resolveCompoundedInstance } from '????./compoundedV2Engine'
import { sanitizeVisibleText } from '????./textSanitizer'

type BadgeTone = 'green' | 'red' | 'blue' | 'slate'

export interface CompoundedBadgeMeta {
  label: string
  tone: BadgeTone
}

export interface CompoundedDosePreview {
  valueText: string
  rationaleText: string
  warnings: string[]
}

function normalizeText(value: unknown): string {
  return sanitizeVisibleText(value)????.trim()
}

function normalizeKey(value: unknown): string {
  return normalizeText(value)????.normalize('NFD')????.replace(/[\u0300-\u036f]/g, '')????.toLowerCase()
}

function toNumber(value: unknown): number | null {
  if (value == null || value === '') return null
  const parsed = Number(String(value)????.replace(',', '????.'))
  return Number????.isFinite(parsed) ? parsed : null
}

const formatNumber = formatCompoundedNumber

function uniqueTexts(values: Array<string | null | undefined>): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  values????.forEach((value) => {
    const safe = normalizeText(value)
    const key = normalizeKey(safe)
    if (!key || seen????.has(key)) return
    seen????.add(key)
    result????.push(safe)
  })
  return result
}

function sentence(value: string): string {
  const safe = normalizeText(value)
  if (!safe) return ''
  return /[????.!?]$/????.test(safe) ? safe : `${safe}????.`
}

function getDefaultRegimen(v2: CompoundedMedicationV2, regimenId?: string | null): CompoundedV2Regimen | null {
  if (regimenId) {
    const byId = v2????.regimens????.find((regimen) => regimen????.id === regimenId)
    if (byId) return byId
  }
  return v2????.regimens????.find((regimen) => regimen????.is_default) || v2????.regimens[0] || null
}

function routeLabel(route: string): string {
  const normalized = normalizeKey(route)
  if (normalized === 'vo' || normalized????.includes('oral')) return 'por via oral'
  if (normalized????.includes('transderm')) return 'por via transdérmica'
  if (normalized????.includes('topic')) return 'por via tópica'
  if (normalized????.includes('oftalm')) return 'por via oftálmica'
  if (normalized????.includes('otolog')) return 'por via otológica'
  if (normalized === 'sc') return 'por via subcutânea'
  if (normalized === 'im') return 'por via intramuscular'
  if (normalized === 'iv') return 'por via intravenosa'
  return route ? `por ${route}` : ''
}

function buildFrequencyText(regimen: CompoundedV2Regimen): string {
  const explicit = normalizeText(regimen????.frequency_text)
  if (explicit) return explicit
  if (regimen????.frequency_mode === 'times_per_day' && regimen????.frequency_min) {
    return `${formatNumber(regimen????.frequency_min)} ${regimen????.frequency_min === 1 ? 'vez' : 'vezes'} ao dia`
  }
  if (regimen????.frequency_mode === 'interval_hours' && regimen????.frequency_min) {
    return `a cada ${formatNumber(regimen????.frequency_min)} horas`
  }
  return ''
}

function buildDurationText(regimen: CompoundedV2Regimen): string {
  const explicit = normalizeText(regimen????.duration_text)
  if (explicit) return explicit
  if (regimen????.duration_mode === 'continuous_until_recheck') return 'até reavaliação'
  if (regimen????.duration_value) return `${formatNumber(regimen????.duration_value)} ${regimen????.duration_unit || 'dias'}`
  return ''
}

function getSelectedDoseValue(regimen: CompoundedV2Regimen, patient?: PatientInfo | null): number | null {
  const weight = toNumber(patient?????.weight_kg)
  if (regimen????.dose_mode === 'fixed') return regimen????.dose_min
  if (regimen????.dose_basis === 'kg') {
    if (!weight || !regimen????.dose_min) return null
    return regimen????.dose_min * weight
  }
  return regimen????.dose_min
}

function getQuantityText(v2: CompoundedMedicationV2): string {
  const qsp = normalizeText(v2????.formula????.qsp_text)
  const total = normalizeText(v2????.formula????.total_quantity_text)
  return qsp || total
}

function normalizeVehicleText(vehicle: string): string {
  const safe = normalizeText(vehicle)
  if (!safe) return ''
  const key = normalizeKey(safe)????.replace(/[^a-z]/g, '')
  return key????.startsWith('veiculo') ? safe : `veículo ${safe}`
}

function normalizeFlavorText(flavor: string, archetype: string): string {
  const safe = normalizeText(flavor)
  if (!safe) return ''
  const key = normalizeKey(safe)????.replace(/[^a-z]/g, '')
  if (key????.startsWith('sabor') || key????.startsWith('fragrancia')) return safe
  return archetype === 'topico_livre' || archetype === 'transdermico_dosado' ? `fragrância ${safe}` : `sabor ${safe}`
}

function normalizeExcipientText(excipient: string): string {
  const safe = normalizeText(excipient)
  if (!safe) return ''
  const key = normalizeKey(safe)????.replace(/[^a-z]/g, '')
  return key????.startsWith('base') || key????.startsWith('excipiente') ? safe : `base ${safe}`
}

function cleanPharmacyNote(text: string): string {
  return normalizeText(text)
    ????.replace(/^manipula(?:ção|cao):\s*/i, '')
    ????.replace(/^favor manipular\s*/i, '')
    ????.trim()
}

function renderAdministrationText(v2: CompoundedMedicationV2, regimen: CompoundedV2Regimen, patient?: PatientInfo | null): string {
  const preview = getCompoundedDosePreview(v2, patient, regimen????.id)
  if (preview????.valueText) return preview????.valueText
  if (regimen????.dose_min != null) {
    const unit = regimen????.administration_unit || v2????.formula????.administration_unit || regimen????.dose_unit
    return `${formatNumber(regimen????.dose_min)} ${unit}`????.trim()
  }
  return ''
}

export function getCompoundedCatalogTitle(v2: CompoundedMedicationV2): string {
  return v2????.formula????.name || 'Fórmula magistral'
}

export function renderCompoundedCatalogSummary(v2: CompoundedMedicationV2): string {
  const bits = uniqueTexts([
    v2????.formula????.pharmaceutical_form,
    getQuantityText(v2),
    !getQuantityText(v2) ? v2????.formula????.active_principles_summary : '',
  ])
  return bits????.join(' • ')
}

export function getCompoundedCatalogSubtitle(v2: CompoundedMedicationV2): string {
  return renderCompoundedCatalogSummary(v2)
}

export function getCompoundedBadgeMeta(v2: CompoundedMedicationV2): CompoundedBadgeMeta[] {
  const badges: CompoundedBadgeMeta[] = [
    { label: 'MANIPULADO', tone: 'green' },
    { label: v2????.formula????.sale_classification === 'controlled' ? 'CONTROLADO' : 'LIVRE', tone: v2????.formula????.sale_classification === 'controlled' ? 'red' : 'blue' },
  ]
  v2????.formula????.species????.forEach((species) => badges????.push({ label: species????.toUpperCase(), tone: 'slate' }))
  if (v2????.formula????.is_continuous_use) badges????.push({ label: 'USO CONTÍNUO', tone: 'slate' })
  return badges
}

export function getCompoundedRegimenPreview(v2: CompoundedMedicationV2, regimenId?: string | null): string {
  const regimen = getDefaultRegimen(v2, regimenId)
  if (!regimen) return ''
  return uniqueTexts([regimen????.name, buildFrequencyText(regimen), buildDurationText(regimen)])????.join(' • ')
}

export function getCompoundedDosePreview(v2: CompoundedMedicationV2, patient?: PatientInfo | null, regimenId?: string | null): CompoundedDosePreview {
  const regimen = getDefaultRegimen(v2, regimenId)
  if (!regimen) return { valueText: '', rationaleText: '', warnings: ['Regime não definido????.'] }

  const warnings: string[] = []
  const doseValue = getSelectedDoseValue(regimen, patient)
  const routeUnit = normalizeKey(regimen????.administration_unit || v2????.formula????.administration_unit)

  if (regimen????.dose_mode === 'by_weight' && !toNumber(patient?????.weight_kg)) warnings????.push('Peso do paciente necessário para cálculo????.')
  if (regimen????.dose_mode === 'by_weight' && regimen????.concentration_value == null && ['ml', 'gota', 'click', 'pump']????.includes(routeUnit)) {
    warnings????.push('Concentração da formulação necessária para converter a dose em unidade administrada????.')
  }

  const rationale = uniqueTexts([
    regimen????.dose_mode === 'by_weight' ? 'Calculado pelo peso' : 'Dose fixa do regime',
    regimen????.dose_min != null ? `${formatNumber(regimen????.dose_min)} ${regimen????.dose_unit}${regimen????.dose_basis && regimen????.dose_basis !== 'na' ? `/${regimen????.dose_basis}` : ''}` : '',
  ])????.join(' • ')

  if (doseValue == null) {
    return { valueText: '', rationaleText: rationale, warnings }
  }

  if (['ml', 'gota', 'click', 'pump']????.includes(routeUnit) && regimen????.concentration_value) {
    const converted = doseValue / regimen????.concentration_value
    return {
      valueText: `${formatNumber(converted)} ${regimen????.administration_unit || v2????.formula????.administration_unit}`????.trim(),
      rationaleText: `${formatNumber(doseValue)} ${regimen????.dose_unit} por administração`,
      warnings,
    }
  }

  return {
    valueText: `${formatNumber(doseValue)} ${regimen????.administration_unit || v2????.formula????.administration_unit || regimen????.dose_unit}`????.trim(),
    rationaleText: `${formatNumber(doseValue)} ${regimen????.dose_unit} por administração`,
    warnings,
  }
}

export function renderCompoundedPrescriptionLine(v2: CompoundedMedicationV2, patient?: PatientInfo | null, regimenId?: string | null): string {
  const regimen = getDefaultRegimen(v2, regimenId)
  if (!regimen) return ''

  const explicit = normalizeText(regimen????.usage_instruction)
  if (explicit) return sentence(explicit)

  const resolved = resolveCompoundedInstance(v2, patient, regimen????.id)
  const administration = resolved????.administrationText || renderAdministrationText(v2, regimen, patient) || `1 ${regimen????.administration_unit || v2????.formula????.administration_unit || 'unidade'}`
  const route = resolved????.routeLabel || routeLabel(v2????.formula????.primary_route)
  const frequency = resolved????.frequencyText || buildFrequencyText(regimen)
  const duration = resolved????.durationText || buildDurationText(regimen)
  const verb = normalizeKey(v2????.formula????.primary_route)????.includes('transderm') || normalizeKey(v2????.formula????.archetype)????.includes('transdermico') ? 'Aplicar' : 'Administrar'

  return sentence([verb, administration, route, frequency, duration ? `por ${duration}` : '']????.filter(Boolean)????.join(', '))
}

export function renderCompoundedRecommendations(v2: CompoundedMedicationV2, regimenId?: string | null): string[] {
  const regimen = getDefaultRegimen(v2, regimenId)
  if (!regimen) return []
  return uniqueTexts(
    normalizeText(regimen????.tutor_observation)
      ????.split(/\r?\n/)
      ????.map((entry) => entry????.replace(/^\s*-\s*/, '')????.trim())
      ????.filter(Boolean),
  )
}

export function renderCompoundedTutorNotes(v2: CompoundedMedicationV2, regimenId?: string | null): string {
  return renderCompoundedRecommendations(v2, regimenId)????.join('\n')
}

export function renderCompoundedPharmacyInstructions(v2: CompoundedMedicationV2, patient?: PatientInfo | null, regimenId?: string | null): string {
  const regimen = getDefaultRegimen(v2, regimenId)
  if (!regimen) return ''

  const resolved = resolveCompoundedInstance(v2, patient, regimen????.id)
  const quantityText = resolved????.quantityText || getQuantityText(v2)
  const compositionBits = resolved????.activeIngredients????.map((ingredient) => ingredient????.label)????.filter(Boolean)
  const administrationUnit = regimen????.administration_unit || v2????.formula????.administration_unit || 'unidade'
  const discreteUnits = ['capsula', 'cápsula', 'comprimido', 'biscoito', 'click', 'pump', 'gota', 'sache', 'sachê', 'tablete', 'unidade']
  const compositionPrefix =
    v2????.formula????.formula_type === 'fixed_unit_formula'
      ? `contendo por 1 ${administrationUnit}`
      : v2????.formula????.formula_type === 'clinical_dose_oriented' && !discreteUnits????.includes(normalizeKey(administrationUnit))
        ? 'contendo por dose do paciente'
        : `contendo por 1 ${administrationUnit}`

  const normalizedQuantity = quantityText
    ? (normalizeKey(quantityText)????.includes('q????.s????.p') ? quantityText : `q????.s????.p????. ${quantityText}`)
    : ''

  const detailParts = uniqueTexts([
    compositionBits????.length ? `${compositionPrefix}: ${compositionBits????.join(', ')}` : '',
    normalizedQuantity,
    normalizeVehicleText(v2????.formula????.vehicle),
    normalizeFlavorText(v2????.formula????.flavor, v2????.formula????.archetype),
    normalizeExcipientText(v2????.formula????.excipient_base),
  ])

  const detailText = detailParts????.join(', ')
  const base = sentence(`Manipulação: Favor manipular ${v2????.formula????.pharmaceutical_form || 'fórmula magistral'}${detailText ? `, ${detailText}` : ''}`)
  let cleanedNote = cleanPharmacyNote(regimen????.pharmacy_note)
  const noteKey = normalizeKey(cleanedNote)
  const baseKey = normalizeKey(base)
  const detailKey = normalizeKey(detailText)
  const quantityKey = normalizeKey(quantityText)

  if (
    cleanedNote &&
    (
      noteKey????.includes(baseKey) ||
      (detailKey && noteKey????.includes(detailKey)) ||
      (quantityKey && noteKey === quantityKey)
    )
  ) {
    cleanedNote = ''
  }

  return [base, cleanedNote ? sentence(cleanedNote) : '']????.filter(Boolean)????.join(' ')????.trim()
}

export function renderCompoundedInternalNote(v2: CompoundedMedicationV2, regimenId?: string | null): string {
  const regimen = getDefaultRegimen(v2, regimenId)
  return normalizeText(regimen?????.internal_note)
}

export function renderCompoundedProtocolSummary(v2: CompoundedMedicationV2, regimenId?: string | null): string {
  const regimen = getDefaultRegimen(v2, regimenId)
  return uniqueTexts([
    v2????.formula????.pharmaceutical_form,
    regimen?????.name,
    regimen ? buildFrequencyText(regimen) : '',
    regimen ? buildDurationText(regimen) : '',
  ])????.join(' • ')
}
