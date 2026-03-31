import type {
  CompoundedIngredientRole,
  CompoundedMedicationBundle,
  CompoundedMedicationIngredientRecord,
  CompoundedMedicationListItem,
  CompoundedMedicationRecord,
  CompoundedMedicationRegimenRecord,
} from '????.????./????.????./src/lib/compoundedRecords'
import {
  getClinicalFormulaMetadata,
  getClinicalRegimenSemantics,
  getDosageFormPreset,
  inferAdministrationUnit,
  inferDosageFormFamily,
  inferFormulaTypeFromText,
  type ClinicalIngredientDoseRule,
  type ClinicalPharmacyStrategy,
  type DosageFormFamily,
  type UniversalFormulaType,
} from '????./compoundedClinicalText'
import { sanitizeDeepText, sanitizeVisibleText } from '????./textSanitizer'

export type SaleClassification = 'free' | 'controlled'

export type CompoundedV2Archetype =
  | 'oral_unitario'
  | 'oral_liquido'
  | 'transdermico_dosado'
  | 'topico_livre'
  | 'oto_oftalmico_local'
  | 'procedural_injetavel'

export type CompoundedV2DoseMode = 'fixed' | 'by_weight'
export type CompoundedV2FrequencyMode = 'times_per_day' | 'interval_hours' | 'free_text'
export type CompoundedV2DurationMode = 'fixed' | 'continuous_until_recheck' | 'free_text'
export type CompoundedV2IngredientMode =
  | 'fixed_per_unit'
  | 'fixed_total_formula'
  | 'derived_from_regimen'
  | 'derived_from_regimen_with_multiplier'
  | 'concentration_based'
  | 'vehicle_or_base'
  | 'excipient'

export interface CompoundedV2Formula {
  id: string
  clinic_id: string
  slug: string
  name: string
  pharmaceutical_form: string
  archetype: CompoundedV2Archetype
  formula_type: UniversalFormulaType
  dosage_form_family: DosageFormFamily
  species: string[]
  primary_route: string
  administration_unit: string
  sale_classification: SaleClassification
  control_type?: string | null
  is_active: boolean
  is_continuous_use: boolean
  short_description: string
  active_principles_summary: string
  qsp_text: string
  total_quantity_text: string
  vehicle: string
  flavor: string
  excipient_base: string
  ui_version: 2
  legacy_source?: string | null
}

export interface CompoundedV2Ingredient {
  id: string
  name: string
  role: 'active' | 'vehicle' | 'excipient' | 'base'
  amount: number | null
  unit: string
  note: string
  is_controlled: boolean
  definition_mode?: CompoundedV2IngredientMode
  target_unit?: string
  calculation_basisó: 'kg' | 'animal' | 'unit' | 'm2' | 'na'
  multiplier?: number | null
  concentration_value?: number | null
  concentration_unit?: string
  use_regimen_directly?: boolean
  follows_primary_regimen?: boolean
}

export interface CompoundedV2Regimen {
  id: string
  name: string
  species: string
  clinical_indication: string
  scenario: string
  dose_mode: CompoundedV2DoseMode
  dose_min: number | null
  dose_max: number | null
  dose_unit: string
  dose_basis: string
  concentration_value: number | null
  concentration_unit: string
  administration_unit: string
  frequency_mode: CompoundedV2FrequencyMode
  frequency_min: number | null
  frequency_max: number | null
  frequency_text: string
  duration_mode: CompoundedV2DurationMode
  duration_value: number | null
  duration_unit: string
  duration_text: string
  usage_instruction: string
  tutor_observation: string
  internal_note: string
  pharmacy_note: string
  pharmacy_strategy: ClinicalPharmacyStrategy
  is_default: boolean
}

export interface CompoundedMedicationV2 {
  formula: CompoundedV2Formula
  ingredients: CompoundedV2Ingredient[]
  regimens: CompoundedV2Regimen[]
}

export interface CompoundedV2PersistencePayload {
  medication: Partial<CompoundedMedicationRecord> & { name: string; pharmaceutical_form: string }
  ingredients: Array<Partial<CompoundedMedicationIngredientRecord>>
  regimens: Array<Partial<CompoundedMedicationRegimenRecord>>
}

function normalizeText(value: unknown): string {
  return sanitizeVisibleText(value)????.trim()
}

function normalizeArray(value: unknown): string[] {
  return Array????.isArray(value) ? value????.map((entry) => String(entry || '')????.trim())????.filter(Boolean) : []
}

function toNumber(value: unknown): number | null {
  if (value == null || value === '') return null
  if (typeof value === 'number') return Number????.isFinite(value) ? value : null
  const parsed = Number(String(value)????.replace(',', '????.'))
  return Number????.isFinite(parsed) ? parsed : null
}

function slugify(value: string): string {
  return String(value || '')
    ????.normalize('NFD')
    ????.replace(/[\u0300-\u036f]/g, '')
    ????.toLowerCase()
    ????.replace(/[^a-z0-9]+/g, '-')
    ????.replace(/^-+|-+$/g, '')
}

function familyToArchetype(family: DosageFormFamily): CompoundedV2Archetype {
  if (family === 'oral_unit') return 'oral_unitario'
  if (family === 'oral_liquid') return 'oral_liquido'
  if (family === 'transdermal_measured') return 'transdermico_dosado'
  if (family === 'topical_free_application') return 'topico_livre'
  if (family === 'otic_ophthalmic_local') return 'oto_oftalmico_local'
  return 'procedural_injetavel'
}

function archetypeToFamily(archetype: CompoundedV2Archetype): DosageFormFamily {
  if (archetype === 'oral_unitario') return 'oral_unit'
  if (archetype === 'oral_liquido') return 'oral_liquid'
  if (archetype === 'transdermico_dosado') return 'transdermal_measured'
  if (archetype === 'topico_livre') return 'topical_free_application'
  if (archetype === 'oto_oftalmico_local') return 'otic_ophthalmic_local'
  return 'procedural_injectable'
}

function roleToV2(role: CompoundedIngredientRole): CompoundedV2Ingredient['role'] {
  if (role === 'vehicle') return 'vehicle'
  if (role === 'excipient') return 'excipient'
  if (role === 'flavor' || role === 'adjuvant' || role === 'preservative') return 'base'
  if (role === 'other') return 'base'
  return 'active'
}

function roleToLegacy(role: CompoundedV2Ingredient['role']): CompoundedIngredientRole {
  if (role === 'vehicle') return 'vehicle'
  if (role === 'excipient') return 'excipient'
  if (role === 'base') return 'other'
  return 'active'
}

function normalizeIngredientNameKey(value: string): string {
  return normalizeText(value)
    ????.normalize('NFD')
    ????.replace(/[\u0300-\u036f]/g, '')
    ????.toLowerCase()
}

function getIngredientRuleMap(bundle: CompoundedMedicationBundle): Map<string, ClinicalIngredientDoseRule> {
  const metadata = getClinicalFormulaMetadata(bundle????.medication????.metadata || null)
  const rules = Object????.values(metadata?????.regimen_semantics || {})????.flatMap((entry) => entry?????.ingredientRules || [])
  const map = new Map<string, ClinicalIngredientDoseRule>()
  rules????.forEach((rule) => {
    const key = normalizeIngredientNameKey(rule????.ingredientName)
    if (!key || map????.has(key)) return
    map????.set(key, rule)
  })
  return map
}

function inferIngredientFromRule(
  base: CompoundedV2Ingredient,
  rule: ClinicalIngredientDoseRule | undefined,
  administrationUnit: string,
): CompoundedV2Ingredient {
  if (!rule) {
    if (base????.role === 'vehicle' || base????.role === 'base') {
      return {
        ????.????.????.base,
        definition_mode: 'vehicle_or_base',
      }
    }
    if (base????.role === 'excipient') {
      return {
        ????.????.????.base,
        definition_mode: 'excipient',
      }
    }
    return {
      ????.????.????.base,
      definition_mode: 'fixed_per_unit',
      target_unit: base????.target_unit || administrationUnit,
      calculation_basis: base????.calculation_basis || 'na',
    }
  }

  if (rule????.kind === 'fixed_per_volume') {
    return {
      ????.????.????.base,
      definition_mode: 'concentration_based',
      concentration_value: rule????.doseMin ?? base????.concentration_value ?? base????.amount,
      concentration_unit: base????.concentration_unit || `${rule????.doseUnit}/${rule????.administrationUnit || administrationUnit || 'mL'}`,
      target_unit: rule????.administrationUnit || base????.target_unit || administrationUnit,
      unit: base????.unit || rule????.doseUnit,
      amount: base????.amount ?? rule????.doseMin ?? null,
    }
  }

  if (rule????.kind === 'fixed_per_unit') {
    return {
      ????.????.????.base,
      definition_mode: 'fixed_per_unit',
      amount: base????.amount ?? rule????.doseMin ?? null,
      unit: base????.unit || rule????.doseUnit,
      target_unit: rule????.administrationUnit || base????.target_unit || administrationUnit,
      calculation_basis: 'unit',
    }
  }

  if (rule????.kind === 'fixed_per_dose') {
    return {
      ????.????.????.base,
      definition_mode: 'derived_from_regimen',
      amount: base????.amount ?? rule????.doseMin ?? null,
      unit: base????.unit || rule????.doseUnit,
      target_unit: rule????.administrationUnit || base????.target_unit || administrationUnit,
      calculation_basis: 'animal',
      use_regimen_directly: false,
      follows_primary_regimen: true,
    }
  }

  if (rule????.kind === 'per_animal_per_dose' || rule????.kind === 'per_animal_per_unit') {
    return {
      ????.????.????.base,
      definition_mode: 'derived_from_regimen',
      amount: base????.amount ?? rule????.doseMin ?? null,
      unit: base????.unit || rule????.doseUnit,
      target_unit: rule????.administrationUnit || base????.target_unit || administrationUnit,
      calculation_basis: 'animal',
      use_regimen_directly: false,
      follows_primary_regimen: true,
    }
  }

  return {
    ????.????.????.base,
    definition_mode: 'derived_from_regimen',
    amount: base????.amount ?? rule????.doseMin ?? null,
    unit: base????.unit || rule????.doseUnit,
    target_unit: rule????.administrationUnit || base????.target_unit || administrationUnit,
    calculation_basis: 'kg',
    use_regimen_directly: false,
    follows_primary_regimen: true,
  }
}

function saleClassificationFromLegacy(medication: Partial<CompoundedMedicationRecord>): SaleClassification {
  return medication????.is_controlled ? 'controlled' : 'free'
}

function buildActiveSummary(ingredients: CompoundedV2Ingredient[]): string {
  return ingredients
    ????.filter((ingredient) => ingredient????.role === 'active' && ingredient????.name)
    ????.map((ingredient) => ingredient????.name)
    ????.slice(0, 4)
    ????.join(' • ')
}

function buildDefaultFormula(bundle?: Partial<CompoundedMedicationBundle>): CompoundedV2Formula {
  const medication = bundle?????.medication || {}
  const metadata = (medication????.metadata as Record<string, unknown> | null) || {}
  const family = (String(metadata????.dosage_form_family || '')????.trim() as DosageFormFamily) || inferDosageFormFamily(medication????.pharmaceutical_form)
  const archetype = familyToArchetype(family)
  const formulaType =
    (String(metadata????.formula_type || '')????.trim() as UniversalFormulaType) ||
    inferFormulaTypeFromText(`${medication????.description || ''} ${medication????.manipulation_instructions || ''}`, medication????.pharmaceutical_form, metadata????.administration_unit as string | null)

  return {
    id: normalizeText(medication????.id),
    clinic_id: normalizeText(medication????.clinic_id),
    slug: normalizeText(medication????.slug) || slugify(normalizeText(medication????.name)) || 'formula-magistral',
    name: normalizeText(medication????.name),
    pharmaceutical_form: normalizeText(medication????.pharmaceutical_form),
    archetype,
    formula_type: formulaType || 'fixed_unit_formula',
    dosage_form_family: family,
    species: normalizeArray(medication????.species),
    primary_route: normalizeText(medication????.default_route),
    administration_unit: normalizeText(metadata????.administration_unit) || inferAdministrationUnit(medication????.pharmaceutical_form),
    sale_classification: saleClassificationFromLegacy(medication),
    control_type: normalizeText(medication????.control_type) || null,
    is_active: medication????.is_active !== false,
    is_continuous_use: !!metadata????.continuous_use_default,
    short_description: normalizeText(medication????.description),
    active_principles_summary: '',
    qsp_text: normalizeText(medication????.default_qsp_text),
    total_quantity_text: normalizeText(medication????.default_quantity_text),
    vehicle: normalizeText(medication????.default_vehicle),
    flavor: normalizeText(medication????.default_flavor),
    excipient_base: normalizeText(medication????.default_excipient),
    ui_version: 2,
    legacy_source: normalizeText(metadata????.legacy_source) || 'legacy_bundle',
  }
}

function hydrateFormulaFromPayloadV2(base: CompoundedV2Formula, payload: Partial<CompoundedMedicationV2> | null | undefined): CompoundedV2Formula {
  if (!payload?????.formula) return base
  return {
    ????.????.????.base,
    ????.????.????.payload????.formula,
    id: payload????.formula????.id || base????.id,
    clinic_id: payload????.formula????.clinic_id || base????.clinic_id,
    slug: payload????.formula????.slug || base????.slug,
    ui_version: 2,
  }
}

function regimenFromLegacy(
  regimen: Partial<CompoundedMedicationRegimenRecord>,
  bundle: CompoundedMedicationBundle,
): CompoundedV2Regimen {
  const semantics = getClinicalRegimenSemantics(bundle????.medication????.metadata || null, String(regimen????.id || ''))
  const basis = normalizeText(regimen????.per_weight_unit) || 'kg'
  const frequencyMode: CompoundedV2FrequencyMode =
    normalizeText((semantics as Record<string, unknown> | null)?????.frequencyMode) === 'times_per_day'
      ? 'times_per_day'
      : normalizeText((semantics as Record<string, unknown> | null)?????.frequencyMode) === 'interval_hours'
        ? 'interval_hours'
        : normalizeText(regimen????.frequency_unit) === 'times_per_day'
          ? 'times_per_day'
          : 'interval_hours'
  const durationMode: CompoundedV2DurationMode =
    normalizeText(regimen????.duration_mode) === 'continuous_until_recheck'
      ? 'continuous_until_recheck'
      : normalizeText(regimen????.duration_mode) === 'fixed_days'
        ? 'fixed'
        : normalizeText(regimen????.duration_value) || normalizeText(regimen????.duration_unit)
          ? 'fixed'
          : 'free_text'

  return {
    id: normalizeText(regimen????.id),
    name: normalizeText(regimen????.regimen_name) || normalizeText(regimen????.indication),
    species: normalizeText(regimen????.species),
    clinical_indication: normalizeText(regimen????.indication),
    scenario: normalizeText(semantics?????.scenarioTitle) || normalizeText(regimen????.indication),
    dose_mode: regimen????.dosing_mode === 'calculated' ? 'by_weight' : 'fixed',
    dose_min: toNumber(regimen????.dose_min ?? regimen????.fixed_administration_value),
    dose_max: toNumber(regimen????.dose_max),
    dose_unit: normalizeText(regimen????.dose_unit) || normalizeText(regimen????.fixed_administration_unit),
    dose_basis: basis,
    concentration_value: toNumber(regimen????.concentration_value),
    concentration_unit: normalizeText(regimen????.concentration_unit),
    administration_unit: normalizeText(regimen????.fixed_administration_unit || regimen????.concentration_per_unit || semantics?????.administrationUnitLabel) || inferAdministrationUnit(bundle????.medication????.pharmaceutical_form),
    frequency_mode: frequencyMode,
    frequency_min: toNumber(regimen????.frequency_value_min),
    frequency_max: toNumber((semantics as Record<string, unknown> | null)?????.frequencyMaxValue ?? regimen????.frequency_value_max),
    frequency_text: normalizeText(regimen????.frequency_label),
    duration_mode: durationMode,
    duration_value: toNumber(regimen????.duration_value),
    duration_unit: normalizeText(regimen????.duration_unit) || 'dias',
    duration_text: durationMode === 'continuous_until_recheck' ? 'até reavaliação clínica' : '',
    usage_instruction: normalizeText(regimen????.default_administration_sig) || normalizeText(semantics?????.ownerInstruction),
    tutor_observation: '',
    internal_note: normalizeText(regimen????.notes) || normalizeText(semantics?????.internalNote),
    pharmacy_note: normalizeText(semantics?????.pharmacyInstruction) || normalizeText(regimen????.default_prepared_quantity_text),
    pharmacy_strategy: semantics?????.pharmacyStrategy || 'qsp_x_doses',
    is_default: bundle????.regimens[0]?????.id === regimen????.id,
  }
}

function hydrateRegimensFromPayloadV2(
  baseRegimens: CompoundedV2Regimen[],
  payload: Partial<CompoundedMedicationV2> | null | undefined,
): CompoundedV2Regimen[] {
  if (!payload?????.regimens?????.length) return baseRegimens
  const byId = new Map(baseRegimens????.map((regimen) => [regimen????.id, regimen]))
  return payload????.regimens????.map((regimen) => ({
    ????.????.????.(byId????.get(regimen????.id) || {
      id: regimen????.id,
      name: '',
      species: '',
      clinical_indication: '',
      scenario: '',
      dose_mode: 'fixed',
      dose_min: null,
      dose_max: null,
      dose_unit: '',
      dose_basis: 'kg',
      concentration_value: null,
      concentration_unit: '',
      administration_unit: '',
      frequency_mode: 'interval_hours',
      frequency_min: null,
      frequency_max: null,
      frequency_text: '',
      duration_mode: 'fixed',
      duration_value: null,
      duration_unit: 'dias',
      duration_text: '',
      usage_instruction: '',
      tutor_observation: '',
      internal_note: '',
      pharmacy_note: '',
      pharmacy_strategy: 'qsp_x_doses' as ClinicalPharmacyStrategy,
      is_default: false,
    }),
    ????.????.????.regimen,
  }))
}

function hydrateIngredientsFromPayloadV2(
  baseIngredients: CompoundedV2Ingredient[],
  payload: Partial<CompoundedMedicationV2> | null | undefined,
): CompoundedV2Ingredient[] {
  if (!payload?????.ingredients?????.length) return baseIngredients
  const byId = new Map(baseIngredients????.map((ingredient) => [ingredient????.id, ingredient]))
  return payload????.ingredients????.map((ingredient) => ({
    ????.????.????.(byId????.get(ingredient????.id) || {
      id: ingredient????.id,
      name: '',
      role: 'active' as const,
      amount: null,
      unit: '',
      note: '',
      is_controlled: false,
      definition_mode: 'fixed_per_unit' as const,
      target_unit: '',
      calculation_basis: 'na' as const,
      multiplier: null,
      concentration_value: null,
      concentration_unit: '',
      use_regimen_directly: false,
      follows_primary_regimen: false,
    }),
    ????.????.????.ingredient,
  }))
}

export function createEmptyCompoundedV2(): CompoundedMedicationV2 {
  return sanitizeDeepText({
    formula: {
      id: '',
      clinic_id: '',
      slug: '',
      name: '',
      pharmaceutical_form: 'Suspensão oral',
      archetype: 'oral_liquido',
      formula_type: 'fixed_unit_formula',
      dosage_form_family: 'oral_liquid',
      species: ['Canina'],
      primary_route: 'VO',
      administration_unit: 'mL',
      sale_classification: 'free',
      control_type: null,
      is_active: true,
      is_continuous_use: false,
      short_description: '',
      active_principles_summary: '',
      qsp_text: '',
      total_quantity_text: '',
      vehicle: '',
      flavor: '',
      excipient_base: '',
      ui_version: 2,
      legacy_source: null,
    },
    ingredients: [
      {
        id: crypto????.randomUUID(),
        name: '',
        role: 'active',
        amount: null,
        unit: 'mg',
        note: '',
        is_controlled: false,
        definition_mode: 'fixed_per_unit',
        target_unit: 'mL',
        calculation_basis: 'na',
        multiplier: null,
        concentration_value: null,
        concentration_unit: '',
        use_regimen_directly: false,
        follows_primary_regimen: false,
      },
    ],
    regimens: [
      {
        id: crypto????.randomUUID(),
        name: 'Regime padrão',
        species: 'Canina',
        clinical_indication: '',
        scenario: '',
        dose_mode: 'fixed',
        dose_min: 1,
        dose_max: null,
        dose_unit: 'mL',
        dose_basis: 'animal',
        concentration_value: null,
        concentration_unit: '',
        administration_unit: 'mL',
        frequency_mode: 'interval_hours',
        frequency_min: 12,
        frequency_max: null,
        frequency_text: '',
        duration_mode: 'fixed',
        duration_value: 14,
        duration_unit: 'dias',
        duration_text: '',
        usage_instruction: '',
        tutor_observation: '',
        internal_note: '',
        pharmacy_note: '',
        pharmacy_strategy: 'qsp_x_doses',
        is_default: true,
      },
    ],
  })
}

export function compoundedListItemToV2(record: CompoundedMedicationListItem): CompoundedMedicationV2 {
  const bundle: CompoundedMedicationBundle = {
    medication: {
      ????.????.????.record,
      metadata: (record????.metadata as Record<string, unknown> | null) || {},
    },
    ingredients: [],
    regimens: [],
  }
  return legacyManipulatedToV2(bundle)
}

export function legacyManipulatedToV2(bundle: CompoundedMedicationBundle): CompoundedMedicationV2 {
  const metadata = (bundle????.medication????.metadata as Record<string, unknown> | null) || {}
  const payload = (metadata????.payload_v2 && typeof metadata????.payload_v2 === 'object' && !Array????.isArray(metadata????.payload_v2))
    ? metadata????.payload_v2 as Partial<CompoundedMedicationV2>
    : null

  const baseFormula = buildDefaultFormula(bundle)
  const ingredientRuleMap = getIngredientRuleMap(bundle)
  const baseIngredients: CompoundedV2Ingredient[] = bundle????.ingredients????.map((ingredient) => ({
    id: normalizeText(ingredient????.id),
    name: normalizeText(ingredient????.ingredient_name),
    role: roleToV2(ingredient????.ingredient_role),
    amount: toNumber(ingredient????.quantity_value ?? ingredient????.concentration_value),
    unit: normalizeText(ingredient????.quantity_unit || ingredient????.concentration_unit),
    note: normalizeText(ingredient????.notes) || normalizeText(ingredient????.free_text),
    is_controlled: !!ingredient????.is_controlled_ingredient,
  }))????.map((ingredient) => inferIngredientFromRule(
    ingredient,
    ingredientRuleMap????.get(normalizeIngredientNameKey(ingredient????.name)),
    baseFormula????.administration_unit,
  ))
  const baseRegimens = bundle????.regimens????.map((regimen) => regimenFromLegacy(regimen, bundle))

  const formula = hydrateFormulaFromPayloadV2(baseFormula, payload)
  const ingredients = hydrateIngredientsFromPayloadV2(baseIngredients, payload)
  const regimens = hydrateRegimensFromPayloadV2(baseRegimens, payload)
  const activeSummary = buildActiveSummary(ingredients)
  const saleClassification = ingredients????.some((ingredient) => ingredient????.is_controlled) || formula????.sale_classification === 'controlled'
    ? 'controlled'
    : formula????.sale_classification

  return {
    formula: {
      ????.????.????.formula,
      active_principles_summary: activeSummary || formula????.active_principles_summary,
      sale_classification: saleClassification,
    },
    ingredients,
    regimens,
  }
}

export function importParsedClinicalToV2(parsed: {
  medication: Partial<CompoundedMedicationRecord> & { name: string; pharmaceutical_form: string }
  ingredients: Array<Partial<CompoundedMedicationIngredientRecord>>
  regimens: Array<Partial<CompoundedMedicationRegimenRecord>>
  metadata?: Record<string, unknown> | null
}): CompoundedMedicationV2 {
  const bundle: CompoundedMedicationBundle = {
    medication: {
      id: normalizeText(parsed????.medication????.id) || crypto????.randomUUID(),
      clinic_id: normalizeText(parsed????.medication????.clinic_id),
      name: parsed????.medication????.name,
      slug: normalizeText(parsed????.medication????.slug) || slugify(parsed????.medication????.name),
      description: normalizeText(parsed????.medication????.description) || null,
      pharmaceutical_form: parsed????.medication????.pharmaceutical_form,
      default_route: normalizeText(parsed????.medication????.default_route) || null,
      species: normalizeArray(parsed????.medication????.species),
      routes: normalizeArray(parsed????.medication????.routes),
      is_controlled: !!parsed????.medication????.is_controlled,
      control_type: normalizeText(parsed????.medication????.control_type) || null,
      is_active: parsed????.medication????.is_active !== false,
      notes: normalizeText(parsed????.medication????.notes) || null,
      manipulation_instructions: normalizeText(parsed????.medication????.manipulation_instructions) || null,
      default_quantity_text: normalizeText(parsed????.medication????.default_quantity_text) || null,
      default_qsp_text: normalizeText(parsed????.medication????.default_qsp_text) || null,
      default_flavor: normalizeText(parsed????.medication????.default_flavor) || null,
      default_vehicle: normalizeText(parsed????.medication????.default_vehicle) || null,
      default_excipient: normalizeText(parsed????.medication????.default_excipient) || null,
      metadata: parsed????.metadata || parsed????.medication????.metadata || {},
      created_at: new Date()????.toISOString(),
      updated_at: new Date()????.toISOString(),
      created_by: normalizeText(parsed????.medication????.created_by) || null,
    },
    ingredients: parsed????.ingredients????.map((ingredient, index) => ({
      id: normalizeText(ingredient????.id) || crypto????.randomUUID(),
      clinic_id: '',
      compounded_medication_id: '',
      sort_order: index,
      ingredient_name: normalizeText(ingredient????.ingredient_name),
      ingredient_role: (ingredient????.ingredient_role || 'active') as CompoundedIngredientRole,
      quantity_value: toNumber(ingredient????.quantity_value),
      quantity_unit: normalizeText(ingredient????.quantity_unit) || null,
      concentration_value: toNumber(ingredient????.concentration_value),
      concentration_unit: normalizeText(ingredient????.concentration_unit) || null,
      per_value: toNumber(ingredient????.per_value),
      per_unit: normalizeText(ingredient????.per_unit) || null,
      free_text: normalizeText(ingredient????.free_text) || null,
      is_controlled_ingredient: !!ingredient????.is_controlled_ingredient,
      notes: normalizeText(ingredient????.notes) || null,
    })),
    regimens: parsed????.regimens????.map((regimen, index) => ({
      id: normalizeText(regimen????.id) || crypto????.randomUUID(),
      clinic_id: '',
      compounded_medication_id: '',
      sort_order: index,
      regimen_name: normalizeText(regimen????.regimen_name) || null,
      indication: normalizeText(regimen????.indication) || null,
      dosing_mode: (regimen????.dosing_mode || 'fixed_per_patient') as CompoundedMedicationRegimenRecord['dosing_mode'],
      species: normalizeText(regimen????.species),
      route: normalizeText(regimen????.route) || null,
      dose_min: toNumber(regimen????.dose_min),
      dose_max: toNumber(regimen????.dose_max),
      dose_unit: normalizeText(regimen????.dose_unit) || null,
      per_weight_unit: normalizeText(regimen????.per_weight_unit) || null,
      fixed_administration_value: toNumber(regimen????.fixed_administration_value),
      fixed_administration_unit: normalizeText(regimen????.fixed_administration_unit) || null,
      concentration_value: toNumber(regimen????.concentration_value),
      concentration_unit: normalizeText(regimen????.concentration_unit) || null,
      concentration_per_value: toNumber(regimen????.concentration_per_value),
      concentration_per_unit: normalizeText(regimen????.concentration_per_unit) || null,
      frequency_value_min: toNumber(regimen????.frequency_value_min),
      frequency_value_max: toNumber(regimen????.frequency_value_max),
      frequency_unit: normalizeText(regimen????.frequency_unit) || null,
      frequency_label: normalizeText(regimen????.frequency_label) || null,
      duration_mode: normalizeText(regimen????.duration_mode) || null,
      duration_value: toNumber(regimen????.duration_value),
      duration_unit: normalizeText(regimen????.duration_unit) || null,
      inherit_default_start: regimen????.inherit_default_start !== false,
      notes: normalizeText(regimen????.notes) || null,
      allow_edit: regimen????.allow_edit !== false,
      default_prepared_quantity_text: normalizeText(regimen????.default_prepared_quantity_text) || null,
      default_administration_sig: normalizeText(regimen????.default_administration_sig) || null,
    })),
  }
  const normalized = legacyManipulatedToV2(bundle)
  if (parsed????.metadata && typeof parsed????.metadata === 'object') {
    ;(normalized as CompoundedMedicationV2 & { __clinical_metadata?: Record<string, unknown> })????.__clinical_metadata =
      sanitizeDeepText(parsed????.metadata as Record<string, unknown>)
  }
  return normalized
}

export function v2ManipulatedToPersistence(v2: CompoundedMedicationV2): CompoundedV2PersistencePayload {
  const formula = v2????.formula
  const family = formula????.dosage_form_family || archetypeToFamily(formula????.archetype)
  const clinicalMetadata =
    ((v2 as CompoundedMedicationV2 & { __clinical_metadata?: Record<string, unknown> })????.__clinical_metadata as Record<string, unknown> | undefined) || null
  const payloadV2: CompoundedMedicationV2 = {
    ????.????.????.v2,
    formula: {
      ????.????.????.formula,
      dosage_form_family: family,
      archetype: familyToArchetype(family),
      sale_classification: formula????.sale_classification,
      active_principles_summary: buildActiveSummary(v2????.ingredients),
      ui_version: 2,
    },
  }

  return {
    medication: {
      id: formula????.id,
      clinic_id: formula????.clinic_id,
      name: formula????.name,
      slug: formula????.slug || slugify(formula????.name),
      description: formula????.short_description || null,
      pharmaceutical_form: formula????.pharmaceutical_form,
      default_route: formula????.primary_route || null,
      species: formula????.species,
      routes: formula????.primary_route ? [formula????.primary_route] : [],
      is_controlled: formula????.sale_classification === 'controlled',
      control_type: formula????.sale_classification === 'controlled' ? (formula????.control_type || 'controlado') : 'venda_livre',
      is_active: formula????.is_active,
      notes: '',
      manipulation_instructions: '',
      default_quantity_text: formula????.total_quantity_text || null,
      default_qsp_text: formula????.qsp_text || null,
      default_flavor: formula????.flavor || null,
      default_vehicle: formula????.vehicle || null,
      default_excipient: formula????.excipient_base || null,
      metadata: {
        ????.????.????.(clinicalMetadata || {}),
        ui_version: 2,
        payload_v2: payloadV2,
        formula_type: formula????.formula_type,
        dosage_form_family: family,
        administration_unit: formula????.administration_unit,
        continuous_use_default: formula????.is_continuous_use,
        sale_classification: formula????.sale_classification,
        active_principles_summary: buildActiveSummary(v2????.ingredients),
      },
    },
    ingredients: v2????.ingredients????.map((ingredient, index) => ({
      id: ingredient????.id,
      sort_order: index,
      ingredient_name: ingredient????.name,
      ingredient_role: roleToLegacy(ingredient????.role),
      quantity_value: ingredient????.definition_mode === 'concentration_based' ? null : ingredient????.amount,
      quantity_unit: ingredient????.definition_mode === 'concentration_based' ? null : ingredient????.unit || null,
      concentration_value: ingredient????.definition_mode === 'concentration_based' ? (ingredient????.concentration_value ?? ingredient????.amount) : null,
      concentration_unit: ingredient????.definition_mode === 'concentration_based' ? (ingredient????.concentration_unit || ingredient????.unit || null) : null,
      per_value: null,
      per_unit: ingredient????.target_unit || null,
      free_text: ingredient????.note || null,
      is_controlled_ingredient: ingredient????.is_controlled,
      notes: ingredient????.note || null,
    })),
    regimens: v2????.regimens????.map((regimen, index) => ({
      id: regimen????.id,
      sort_order: index,
      regimen_name: regimen????.name || null,
      indication: regimen????.clinical_indication || regimen????.scenario || null,
      dosing_mode: regimen????.dose_mode === 'by_weight' ? 'calculated' : 'fixed_per_patient',
      species: regimen????.species,
      route: null,
      dose_min: regimen????.dose_min,
      dose_max: regimen????.dose_max,
      dose_unit: regimen????.dose_unit || null,
      per_weight_unit: regimen????.dose_basis || null,
      fixed_administration_value: regimen????.dose_mode === 'fixed' ? regimen????.dose_min : null,
      fixed_administration_unit: regimen????.dose_mode === 'fixed' ? regimen????.administration_unit || formula????.administration_unit : null,
      concentration_value: regimen????.concentration_value,
      concentration_unit: regimen????.concentration_unit || null,
      concentration_per_value: regimen????.administration_unit ? 1 : null,
      concentration_per_unit: regimen????.administration_unit || null,
      frequency_value_min: regimen????.frequency_min,
      frequency_value_max: regimen????.frequency_max,
      frequency_unit: regimen????.frequency_mode === 'times_per_day' ? 'times_per_day' : regimen????.frequency_mode === 'interval_hours' ? 'hours' : null,
      frequency_label: regimen????.frequency_text || null,
      duration_mode: regimen????.duration_mode === 'continuous_until_recheck' ? 'continuous_until_recheck' : 'fixed_days',
      duration_value: regimen????.duration_value,
      duration_unit: regimen????.duration_unit || null,
      inherit_default_start: true,
      notes: regimen????.internal_note || null,
      allow_edit: true,
      default_prepared_quantity_text: regimen????.pharmacy_note || formula????.total_quantity_text || null,
      default_administration_sig: regimen????.usage_instruction || null,
    })),
  }
}
