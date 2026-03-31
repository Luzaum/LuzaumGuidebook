import type { PatientInfo } from './NovaReceita2Page'
import type { CompoundedMedicationV2, CompoundedV2Regimen } from './compoundedV2'
import { formatCompoundedNumber, resolveCompoundedInstance } from './compoundedV2Engine'
import { sanitizeVisibleText } from './textSanitizer'

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
  return sanitizeVisibleText(value).trim()
}

function normalizeKey(value: unknown): string {
  return normalizeText(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function uniqueTexts(values: Array<string | null | undefined>): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const value of values) {
    const safe = normalizeText(value)
    const key = normalizeKey(safe)
    if (!key || seen.has(key)) continue
    seen.add(key)
    result.push(safe)
  }
  return result
}

function sentence(value: string): string {
  const safe = normalizeText(value)
  if (!safe) return ''
  return /[.!?]$/.test(safe) ? safe : `${safe}.`
}

function getDefaultRegimen(v2: CompoundedMedicationV2, regimenId?: string | null): CompoundedV2Regimen | null {
  if (regimenId) {
    const byId = v2.regimens.find((regimen) => regimen.id === regimenId)
    if (byId) return byId
  }
  return v2.regimens.find((regimen) => regimen.is_default) || v2.regimens[0] || null
}

function formatFrequencyText(regimen: CompoundedV2Regimen): string {
  if (normalizeText(regimen.frequency_text)) return normalizeText(regimen.frequency_text)
  if (regimen.frequency_mode === 'times_per_day' && regimen.frequency_min) {
    return regimen.frequency_min === 1 ? '1 vez ao dia' : `${formatCompoundedNumber(regimen.frequency_min)} vezes ao dia`
  }
  if (regimen.frequency_mode === 'interval_hours' && regimen.frequency_min) {
    return `a cada ${formatCompoundedNumber(regimen.frequency_min)} horas`
  }
  return ''
}

function formatDurationText(regimen: CompoundedV2Regimen): string {
  if (normalizeText(regimen.duration_text)) return normalizeText(regimen.duration_text)
  if (regimen.duration_mode === 'continuous_until_recheck') return 'até reavaliação'
  if (regimen.duration_value) {
    return `por ${formatCompoundedNumber(regimen.duration_value)} ${normalizeText(regimen.duration_unit || 'dias')}`
  }
  return ''
}

function formatRouteText(route: string): string {
  const safe = normalizeText(route)
  if (!safe) return ''
  if (/^vo$/i.test(safe)) return 'por via oral'
  return `por via ${safe}`
}

export function getCompoundedCatalogTitle(v2: CompoundedMedicationV2): string {
  return normalizeText(v2.formula.name)
}

export function renderCompoundedCatalogSummary(v2: CompoundedMedicationV2): string {
  const parts = uniqueTexts([
    v2.formula.pharmaceutical_form,
    v2.formula.total_quantity_text || v2.formula.qsp_text,
    v2.formula.active_principles_summary,
  ])
  return parts.join(' • ')
}

export function getCompoundedCatalogSubtitle(v2: CompoundedMedicationV2): string {
  const parts = uniqueTexts([
    v2.formula.pharmaceutical_form,
    v2.formula.total_quantity_text || v2.formula.qsp_text,
    v2.formula.short_description,
  ])
  return parts.join(' • ')
}

export function getCompoundedBadgeMeta(v2: CompoundedMedicationV2): CompoundedBadgeMeta[] {
  const badges: CompoundedBadgeMeta[] = [{ label: 'Manipulado', tone: 'green' }]
  if (v2.formula.sale_classification === 'controlled') badges.push({ label: 'Controlado', tone: 'red' })
  for (const species of v2.formula.species) {
    badges.push({ label: species, tone: 'blue' })
  }
  if (v2.formula.is_continuous_use) badges.push({ label: 'Uso contínuo', tone: 'slate' })
  return badges
}

export function getCompoundedRegimenPreview(v2: CompoundedMedicationV2, regimenId?: string | null): string {
  const regimen = getDefaultRegimen(v2, regimenId)
  if (!regimen) return ''
  const parts = uniqueTexts([
    regimen.name,
    regimen.clinical_indication,
    formatFrequencyText(regimen),
    formatDurationText(regimen),
  ])
  return parts.join(' • ')
}

export function getCompoundedDosePreview(v2: CompoundedMedicationV2, patient?: PatientInfo | null, regimenId?: string | null): CompoundedDosePreview {
  const resolved = resolveCompoundedInstance(v2, patient, regimenId)
  return {
    valueText: resolved.doseValue != null ? `${formatCompoundedNumber(resolved.doseValue)} ${resolved.doseUnit}`.trim() : '',
    rationaleText: resolved.administrationText,
    warnings: resolved.warnings,
  }
}

export function renderCompoundedPrescriptionLine(v2: CompoundedMedicationV2, patient?: PatientInfo | null, regimenId?: string | null): string {
  const resolved = resolveCompoundedInstance(v2, patient, regimenId)
  const regimen = resolved.regimen
  if (!regimen) return ''
  if (normalizeText(regimen.usage_instruction)) return sentence(regimen.usage_instruction)

  const unit = normalizeText(regimen.administration_unit || v2.formula.administration_unit)
  const frequency = formatFrequencyText(regimen)
  const duration = formatDurationText(regimen)
  const route = formatRouteText(v2.formula.primary_route)
  return sentence(uniqueTexts([
    unit ? `Administrar 1 ${unit}` : 'Administrar',
    route,
    frequency,
    duration,
  ]).join(', '))
}

export function renderCompoundedRecommendations(v2: CompoundedMedicationV2, regimenId?: string | null): string[] {
  const regimen = getDefaultRegimen(v2, regimenId)
  if (!regimen) return []
  return String(regimen.tutor_observation || '')
    .split(/\r?\n/)
    .map((line) => normalizeText(line.replace(/^\s*-\s*/, '')))
    .filter(Boolean)
}

export function renderCompoundedTutorNotes(v2: CompoundedMedicationV2, regimenId?: string | null): string {
  return renderCompoundedRecommendations(v2, regimenId).map(sentence).join(' ')
}

export function renderCompoundedPharmacyInstructions(v2: CompoundedMedicationV2, patient?: PatientInfo | null, regimenId?: string | null): string {
  const resolved = resolveCompoundedInstance(v2, patient, regimenId)
  const activeIngredients = resolved.ingredients
    .filter((ingredient) => ingredient.role === 'active' && ingredient.displayText)
    .map((ingredient) => ingredient.displayText.replace(/\s+por\s+1\s+/i, ' por 1 '))
  const quantity = normalizeText(v2.formula.qsp_text || v2.formula.total_quantity_text)
  const vehicle = normalizeText(v2.formula.vehicle)
  const flavor = normalizeText(v2.formula.flavor)
  const regimen = resolved.regimen
  const note = normalizeText(regimen?.pharmacy_note)

  const parts = [
    `Manipulação: Favor manipular ${normalizeText(v2.formula.pharmaceutical_form)}`,
    activeIngredients.length ? `contendo ${activeIngredients.join(', ')}` : '',
    quantity ? `q.s.p. ${quantity}` : '',
    vehicle ? vehicle : '',
    flavor ? `sabor ${flavor}` : '',
  ].map(normalizeText).filter(Boolean)

  const baseInstruction = sentence(parts.join(', ').replace(/, q\.s\.p\./i, ', q.s.p.'))
  if (!note) return baseInstruction
  const lowered = normalizeKey(note)
  if (lowered.includes('favor manipular') || (quantity && lowered === normalizeKey(quantity))) return baseInstruction
  return `${baseInstruction} ${sentence(note)}`.trim()
}

export function renderCompoundedInternalNote(v2: CompoundedMedicationV2, regimenId?: string | null): string {
  const regimen = getDefaultRegimen(v2, regimenId)
  return normalizeText(regimen?.internal_note)
}

export function renderCompoundedProtocolSummary(v2: CompoundedMedicationV2, regimenId?: string | null): string {
  const regimen = getDefaultRegimen(v2, regimenId)
  const parts = uniqueTexts([
    v2.formula.pharmaceutical_form,
    v2.formula.total_quantity_text || v2.formula.qsp_text,
    regimen?.name,
    regimen?.dose_min != null ? `${formatCompoundedNumber(regimen.dose_min)} ${regimen.dose_unit}` : '',
  ])
  return parts.join(' — ')
}
