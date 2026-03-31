import type { PatientInfo } from './NovaReceita2Page'
import type { CompoundedMedicationV2, CompoundedV2Ingredient, CompoundedV2IngredientMode, CompoundedV2Regimen } from './compoundedV2'
import { sanitizeVisibleText } from './textSanitizer'

export interface ResolvedCompoundedIngredient {
  id: string
  name: string
  role: CompoundedV2Ingredient['role']
  mode: CompoundedV2IngredientMode
  amount: number | null
  unit: string
  targetUnit: string
  note: string
  displayText: string
}

export interface ResolvedCompoundedInstance {
  regimen: CompoundedV2Regimen | null
  doseValue: number | null
  doseUnit: string
  administrationText: string
  finalQuantityText: string
  warnings: string[]
  ingredients: ResolvedCompoundedIngredient[]
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

function toNumber(value: unknown): number | null {
  if (value == null || value === '') return null
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  const parsed = Number(String(value).replace(',', '.'))
  return Number.isFinite(parsed) ? parsed : null
}

export function formatCompoundedNumber(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return ''
  const rounded = Math.round(value * 1000) / 1000
  return String(rounded).replace('.', ',')
}

function getWeightKg(patient?: PatientInfo | null): number | null {
  return toNumber(patient?.weight_kg)
}

function getDefaultRegimen(v2: CompoundedMedicationV2, regimenId?: string | null): CompoundedV2Regimen | null {
  if (regimenId) {
    const byId = v2.regimens.find((entry) => entry.id === regimenId)
    if (byId) return byId
  }
  return v2.regimens.find((entry) => entry.is_default) || v2.regimens[0] || null
}

function buildFrequencyText(regimen: CompoundedV2Regimen): string {
  if (normalizeText(regimen.frequency_text)) return normalizeText(regimen.frequency_text)
  if (regimen.frequency_mode === 'times_per_day' && regimen.frequency_min) {
    return regimen.frequency_min === 1 ? '1 vez ao dia' : `${formatCompoundedNumber(regimen.frequency_min)} vezes ao dia`
  }
  if (regimen.frequency_mode === 'interval_hours' && regimen.frequency_min) {
    return `a cada ${formatCompoundedNumber(regimen.frequency_min)} horas`
  }
  return ''
}

function buildDurationText(regimen: CompoundedV2Regimen): string {
  if (normalizeText(regimen.duration_text)) return normalizeText(regimen.duration_text)
  if (regimen.duration_mode === 'continuous_until_recheck') return 'até reavaliação'
  if (regimen.duration_value) {
    return `${formatCompoundedNumber(regimen.duration_value)} ${normalizeText(regimen.duration_unit || 'dias')}`.trim()
  }
  return ''
}

function resolveDoseValue(regimen: CompoundedV2Regimen, patient?: PatientInfo | null): { value: number | null; unit: string; warnings: string[] } {
  const warnings: string[] = []
  const weightKg = getWeightKg(patient)
  const unit = normalizeText(regimen.dose_unit)
  const dose = regimen.dose_min

  if (dose == null) {
    warnings.push('Dose não definida no regime.')
    return { value: null, unit, warnings }
  }

  if (regimen.dose_mode === 'by_weight') {
    if (weightKg == null) {
      warnings.push('Peso do paciente necessário para calcular a dose.')
      return { value: null, unit, warnings }
    }
    if (normalizeKey(regimen.dose_basis) === 'kg') {
      return { value: dose * weightKg, unit, warnings }
    }
    return { value: dose, unit, warnings }
  }

  return { value: dose, unit, warnings }
}

function resolveAdministrationText(v2: CompoundedMedicationV2, regimen: CompoundedV2Regimen): string {
  const unit = normalizeText(regimen.administration_unit || v2.formula.administration_unit)
  const route = normalizeText(v2.formula.primary_route)
  const frequency = buildFrequencyText(regimen)
  const duration = buildDurationText(regimen)

  const parts = [
    regimen.usage_instruction || '',
    unit ? `1 ${unit}` : '',
    route ? `por via ${route}` : '',
    frequency,
    duration ? `por ${duration}` : '',
  ].map(normalizeText).filter(Boolean)

  if (normalizeText(regimen.usage_instruction)) return normalizeText(regimen.usage_instruction)
  return parts.join(', ').replace(/^1 aplicação, /i, 'Aplicar 1 aplicação, ')
}

function getIngredientMode(ingredient: CompoundedV2Ingredient): CompoundedV2IngredientMode {
  return ingredient.definition_mode || (ingredient.role === 'vehicle' || ingredient.role === 'base'
    ? 'vehicle_or_base'
    : ingredient.role === 'excipient'
      ? 'excipient'
      : 'fixed_per_unit')
}

function resolveIngredientAmount(
  ingredient: CompoundedV2Ingredient,
  regimen: CompoundedV2Regimen,
  patient?: PatientInfo | null,
): { value: number | null; unit: string; warnings: string[] } {
  const warnings: string[] = []
  const mode = getIngredientMode(ingredient)
  const weightKg = getWeightKg(patient)

  if (mode === 'fixed_per_unit' || mode === 'fixed_total_formula') {
    return { value: ingredient.amount ?? null, unit: ingredient.unit, warnings }
  }

  if (mode === 'concentration_based') {
    return {
      value: ingredient.concentration_value ?? ingredient.amount ?? null,
      unit: ingredient.concentration_unit || ingredient.unit,
      warnings,
    }
  }

  if (mode === 'vehicle_or_base' || mode === 'excipient') {
    return { value: null, unit: ingredient.unit, warnings }
  }

  if (mode === 'derived_from_regimen' || mode === 'derived_from_regimen_with_multiplier') {
    const ingredientBasis = normalizeKey(ingredient.calculation_basis || '')
    const regimenBasis = normalizeKey(regimen.dose_basis)
    const basis = ingredientBasis && ingredientBasis !== 'na' ? ingredientBasis : regimenBasis
    const baseDose = ingredient.use_regimen_directly ? (ingredient.amount ?? regimen.dose_min) : (ingredient.amount ?? regimen.dose_min)
    if (baseDose == null) {
      warnings.push(`Dose base ausente para ${ingredient.name}.`)
      return { value: null, unit: ingredient.unit || regimen.dose_unit, warnings }
    }

    let value = baseDose
    if (basis === 'kg') {
      if (weightKg == null) {
        warnings.push(`Peso necessário para resolver ${ingredient.name}.`)
        return { value: null, unit: ingredient.unit || regimen.dose_unit, warnings }
      }
      value = baseDose * weightKg
    }

    if (mode === 'derived_from_regimen_with_multiplier' && ingredient.multiplier != null) {
      value *= ingredient.multiplier
    }

    return {
      value,
      unit: ingredient.unit || regimen.dose_unit,
      warnings,
    }
  }

  return { value: ingredient.amount ?? null, unit: ingredient.unit, warnings }
}

function formatIngredientDisplay(ingredient: CompoundedV2Ingredient, resolvedAmount: number | null, unit: string): string {
  const mode = getIngredientMode(ingredient)
  if (mode === 'vehicle_or_base') {
    const pieces = [ingredient.name, ingredient.note].map(normalizeText).filter(Boolean)
    return pieces.join(', ')
  }
  if (mode === 'excipient') {
    return [ingredient.name, ingredient.note].map(normalizeText).filter(Boolean).join(', ')
  }
  if (resolvedAmount == null) return ingredient.name
  const target = normalizeText(ingredient.target_unit)
  const byUnit = target ? `por 1 ${target}` : ''
  return `${ingredient.name} ${formatCompoundedNumber(resolvedAmount)} ${unit}${byUnit ? ` ${byUnit}` : ''}`.trim()
}

export function resolveCompoundedInstance(
  v2: CompoundedMedicationV2,
  patient?: PatientInfo | null,
  regimenId?: string | null,
): ResolvedCompoundedInstance {
  const regimen = getDefaultRegimen(v2, regimenId)
  if (!regimen) {
    return {
      regimen: null,
      doseValue: null,
      doseUnit: '',
      administrationText: '',
      finalQuantityText: normalizeText(v2.formula.total_quantity_text || v2.formula.qsp_text),
      warnings: ['Nenhum regime disponível para este manipulado.'],
      ingredients: [],
    }
  }

  const dose = resolveDoseValue(regimen, patient)
  const ingredientResults = v2.ingredients.map((ingredient) => {
    const amount = resolveIngredientAmount(ingredient, regimen, patient)
    return {
      id: ingredient.id,
      name: ingredient.name,
      role: ingredient.role,
      mode: getIngredientMode(ingredient),
      amount: amount.value,
      unit: amount.unit,
      targetUnit: normalizeText(ingredient.target_unit || regimen.administration_unit || v2.formula.administration_unit),
      note: ingredient.note,
      displayText: formatIngredientDisplay(ingredient, amount.value, amount.unit),
      warnings: amount.warnings,
    }
  })

  const finalQuantityText = normalizeText(v2.formula.qsp_text || v2.formula.total_quantity_text)

  return {
    regimen,
    doseValue: dose.value,
    doseUnit: dose.unit,
    administrationText: resolveAdministrationText(v2, regimen),
    finalQuantityText,
    warnings: [...dose.warnings, ...ingredientResults.flatMap((entry) => entry.warnings)],
    ingredients: ingredientResults.map(({ warnings, ...entry }) => entry),
  }
}
