import type { PatientInfo } from '????./NovaReceita2Page'
import type { CompoundedMedicationV2, CompoundedV2Ingredient, CompoundedV2IngredientMode, CompoundedV2Regimen } from '????./compoundedV2'
import { sanitizeVisibleText } from '????./textSanitizer'

export interface ResolvedCompoundedIngredient {
  ingredientId: string
  name: string
  mode: CompoundedV2IngredientMode
  role: CompoundedV2Ingredient['role']
  resolvedAmount: number | null
  resolvedUnit: string
  targetUnit: string
  label: string
  warning?: string
}

export interface ResolvedCompoundedInstance {
  regimen: CompoundedV2Regimen | null
  administrationText: string
  routeLabel: string
  frequencyText: string
  durationText: string
  quantityText: string
  activeIngredients: ResolvedCompoundedIngredient[]
  supportingIngredients: ResolvedCompoundedIngredient[]
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
  if (typeof value === 'number') return Number????.isFinite(value) ? value : null
  const parsed = Number(String(value)????.replace(',', '????.'))
  return Number????.isFinite(parsed) ? parsed : null
}

export function formatCompoundedNumber(value: number, maxFractionDigits = 2): string {
  return new Intl????.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFractionDigits,
  })????.format(value)
}

function getDefaultRegimen(v2: CompoundedMedicationV2, regimenId?: string | null): CompoundedV2Regimen | null {
  if (regimenId) {
    const exact = v2????.regimens????.find((entry) => entry????.id === regimenId)
    if (exact) return exact
  }
  return v2????.regimens????.find((entry) => entry????.is_default) || v2????.regimens[0] || null
}

function routeLabel(route: string): string {
  const normalized = normalizeKey(route)
  if (normalized === 'vo' || normalized????.includes('oral')) return 'por via oral'
  if (normalized????.includes('transderm')) return 'por via transdérmica'
  if (normalized????.includes('topic')) return 'por via tópica'
  if (normalized????.includes('oftalm')) return 'por via oftálmica'
  if (normalized????.includes('otolog')) return 'por via otológica'
  return route ? `por ${route}` : ''
}

function buildFrequencyText(regimen: CompoundedV2Regimen): string {
  if (normalizeText(regimen????.frequency_text)) return normalizeText(regimen????.frequency_text)
  if (regimen????.frequency_mode === 'times_per_day' && regimen????.frequency_min) {
    return `${formatCompoundedNumber(regimen????.frequency_min, 0)} ${regimen????.frequency_min === 1 ? 'vez' : 'vezes'} ao dia`
  }
  if (regimen????.frequency_mode === 'interval_hours' && regimen????.frequency_min) {
    return `a cada ${formatCompoundedNumber(regimen????.frequency_min, 0)} horas`
  }
  return ''
}

function buildDurationText(regimen: CompoundedV2Regimen): string {
  if (normalizeText(regimen????.duration_text)) return normalizeText(regimen????.duration_text)
  if (regimen????.duration_mode === 'continuous_until_recheck') return 'até reavaliação'
  if (regimen????.duration_value) return `${formatCompoundedNumber(regimen????.duration_value, 0)} ${regimen????.duration_unit || 'dias'}`
  return ''
}

function resolveDoseValue(regimen: CompoundedV2Regimen, patient?: PatientInfo | null): { value: number | null; unit: string; warning?: string } {
  const weight = toNumber(patient?????.weight_kg)
  if (regimen????.dose_mode === 'fixed') {
    return { value: regimen????.dose_min ?? null, unit: normalizeText(regimen????.dose_unit) }
  }

  const doseValue = regimen????.dose_min ?? null
  const basis = normalizeKey(regimen????.dose_basis || 'kg')
  if (doseValue == null) return { value: null, unit: normalizeText(regimen????.dose_unit), warning: 'Dose do regime não definida????.' }
  if (basis === 'kg') {
    if (!weight || weight <= 0) return { value: null, unit: normalizeText(regimen????.dose_unit), warning: 'Peso do paciente necessário para cálculo????.' }
    return { value: doseValue * weight, unit: normalizeText(regimen????.dose_unit) }
  }
  if (basis === 'm2') {
    return { value: null, unit: normalizeText(regimen????.dose_unit), warning: 'Cálculo por m² ainda não configurado para este paciente????.' }
  }
  return { value: doseValue, unit: normalizeText(regimen????.dose_unit) }
}

function isMeasuredAdministrationUnit(unit: string): boolean {
  const key = normalizeKey(unit)
  return ['ml', 'gota', 'click', 'pump']????.includes(key)
}

function parseConcentrationUnit(unit: string): { doseUnit: string; adminUnit: string } | null {
  const safe = normalizeText(unit)
  if (!safe????.includes('/')) return null
  const [doseUnit, adminUnit] = safe????.split('/')????.map((entry) => normalizeText(entry))
  if (!doseUnit || !adminUnit) return null
  return { doseUnit, adminUnit }
}

function resolveAdministrationText(v2: CompoundedMedicationV2, regimen: CompoundedV2Regimen, patient?: PatientInfo | null): { text: string; warnings: string[] } {
  const warnings: string[] = []
  const administrationUnit = normalizeText(regimen????.administration_unit || v2????.formula????.administration_unit || regimen????.dose_unit || 'unidade')
  const dose = resolveDoseValue(regimen, patient)
  if (dose????.warning) warnings????.push(dose????.warning)

  if (isMeasuredAdministrationUnit(administrationUnit) && regimen????.concentration_value && regimen????.concentration_unit && dose????.value != null) {
    const concentrationInfo = parseConcentrationUnit(regimen????.concentration_unit)
    if (concentrationInfo && normalizeKey(concentrationInfo????.doseUnit) === normalizeKey(dose????.unit)) {
      const converted = dose????.value / regimen????.concentration_value
      return { text: `${formatCompoundedNumber(converted)} ${concentrationInfo????.adminUnit}`????.trim(), warnings }
    }
  }

  if (!isMeasuredAdministrationUnit(administrationUnit)) {
    if (regimen????.dose_mode === 'fixed' && normalizeKey(regimen????.dose_unit) === normalizeKey(administrationUnit) && regimen????.dose_min != null) {
      return { text: `${formatCompoundedNumber(regimen????.dose_min)} ${administrationUnit}`????.trim(), warnings }
    }
    return { text: `1 ${administrationUnit}`????.trim(), warnings }
  }

  if (dose????.value != null && normalizeKey(dose????.unit) === normalizeKey(administrationUnit)) {
    return { text: `${formatCompoundedNumber(dose????.value)} ${administrationUnit}`????.trim(), warnings }
  }

  return { text: `1 ${administrationUnit}`????.trim(), warnings }
}

function resolveIngredientAmount(
  ingredient: CompoundedV2Ingredient,
  regimen: CompoundedV2Regimen,
  patient?: PatientInfo | null,
): { value: number | null; unit: string; warning?: string } {
  const mode = ingredient????.definition_mode || (ingredient????.role === 'vehicle' || ingredient????.role === 'base' ? 'vehicle_or_base' : ingredient????.role === 'excipient' ? 'excipient' : 'fixed_per_unit')
  const weight = toNumber(patient?????.weight_kg)
  const multiplier = ingredient????.multiplier ?? 1

  if (mode === 'fixed_per_unit' || mode === 'fixed_total_formula') {
    return { value: ingredient????.amount ?? null, unit: normalizeText(ingredient????.unit) }
  }

  if (mode === 'concentration_based') {
    return { value: ingredient????.concentration_value ?? ingredient????.amount ?? null, unit: normalizeText(ingredient????.concentration_unit || ingredient????.unit) }
  }

  if (mode === 'vehicle_or_base' || mode === 'excipient') {
    return { value: ingredient????.amount ?? null, unit: normalizeText(ingredient????.unit) }
  }

  if (ingredient????.follows_primary_regimen && (ingredient????.use_regimen_directly || ingredient????.amount == null)) {
    const dose = resolveDoseValue(regimen, patient)
    return {
      value: dose????.value != null ? dose????.value * multiplier : null,
      unit: normalizeText(ingredient????.unit || dose????.unit),
      warning: dose????.warning,
    }
  }

  const basis = normalizeKey(ingredient????.calculation_basis || 'na')
  if (basis === 'kg') {
    if (!weight || weight <= 0) {
      return { value: null, unit: normalizeText(ingredient????.unit), warning: `Peso do paciente necessário para resolver ${ingredient????.name}????.` }
    }
    return { value: ingredient????.amount * weight * multiplier, unit: normalizeText(ingredient????.unit) }
  }
  if (basis === 'm2') {
    return { value: null, unit: normalizeText(ingredient????.unit), warning: `Cálculo por m² ainda não configurado para ${ingredient????.name}????.` }
  }
  return { value: ingredient????.amount * multiplier, unit: normalizeText(ingredient????.unit) }
}

function buildResolvedIngredient(
  ingredient: CompoundedV2Ingredient,
  regimen: CompoundedV2Regimen,
  v2: CompoundedMedicationV2,
  patient?: PatientInfo | null,
): ResolvedCompoundedIngredient {
  const mode = ingredient????.definition_mode || (ingredient????.role === 'vehicle' || ingredient????.role === 'base' ? 'vehicle_or_base' : ingredient????.role === 'excipient' ? 'excipient' : 'fixed_per_unit')
  const targetUnit = normalizeText(ingredient????.target_unit || regimen????.administration_unit || v2????.formula????.administration_unit)
  const resolved = resolveIngredientAmount(ingredient, regimen, patient)
  const amountText = resolved????.value != null && resolved????.unit ? `${formatCompoundedNumber(resolved????.value)} ${resolved????.unit}`????.trim() : ''
  const label =
    mode === 'concentration_based'
      ? [ingredient????.name, amountText]????.filter(Boolean)????.join(' ')
      : mode === 'fixed_total_formula'
        ? [ingredient????.name, amountText, 'na fórmula total']????.filter(Boolean)????.join(' ')
        : [ingredient????.name, amountText]????.filter(Boolean)????.join(' ')

  return {
    ingredientId: ingredient????.id,
    name: ingredient????.name,
    mode,
    role: ingredient????.role,
    resolvedAmount: resolved????.value,
    resolvedUnit: resolved????.unit,
    targetUnit,
    label: label????.trim(),
    warning: resolved????.warning,
  }
}

export function resolveCompoundedInstance(v2: CompoundedMedicationV2, patient?: PatientInfo | null, regimenId?: string | null): ResolvedCompoundedInstance {
  const regimen = getDefaultRegimen(v2, regimenId)
  if (!regimen) {
    return {
      regimen: null,
      administrationText: '',
      routeLabel: '',
      frequencyText: '',
      durationText: '',
      quantityText: normalizeText(v2????.formula????.qsp_text || v2????.formula????.total_quantity_text),
      activeIngredients: [],
      supportingIngredients: [],
      warnings: ['Regime não definido????.'],
    }
  }

  const administration = resolveAdministrationText(v2, regimen, patient)
  const resolvedIngredients = v2????.ingredients
    ????.filter((ingredient) => normalizeText(ingredient????.name))
    ????.map((ingredient) => buildResolvedIngredient(ingredient, regimen, v2, patient))

  const warnings = [
    ????.????.????.administration????.warnings,
    ????.????.????.resolvedIngredients????.map((ingredient) => ingredient????.warning)????.filter(Boolean) as string[],
  ]

  return {
    regimen,
    administrationText: administration????.text,
    routeLabel: routeLabel(v2????.formula????.primary_route),
    frequencyText: buildFrequencyText(regimen),
    durationText: buildDurationText(regimen),
    quantityText: normalizeText(v2????.formula????.qsp_text || v2????.formula????.total_quantity_text),
    activeIngredients: resolvedIngredients????.filter((ingredient) => ingredient????.role === 'active'),
    supportingIngredients: resolvedIngredients????.filter((ingredient) => ingredient????.role !== 'active'),
    warnings,
  }
}
