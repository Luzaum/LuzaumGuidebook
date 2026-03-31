import type {
  CompoundedIngredientRole,
  CompoundedMedicationBundle,
  CompoundedMedicationIngredientRecord,
  CompoundedMedicationListItem,
  CompoundedMedicationRecord,
  CompoundedMedicationRegimenRecord,
} from '../../src/lib/compoundedRecords'
import {
  getClinicalFormulaMetadata,
  getClinicalRegimenSemantics,
  inferAdministrationUnit,
  inferDosageFormFamily,
  inferFormulaTypeFromText,
  normalizeClinicalPharmacyStrategy,
  type ClinicalIngredientDoseRule,
  type ClinicalPharmacyStrategy,
  type DosageFormFamily,
  type UniversalFormulaType,
  type ParsedClinicalTextImport,
} from './compoundedClinicalText'
import { sanitizeDeepText, sanitizeVisibleText } from './textSanitizer'

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

export type CompoundedV2CalculationBasis = 'kg' | 'animal' | 'unit' | 'm2' | 'na'

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
  calculation_basis?: CompoundedV2CalculationBasis
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
  ingredients: Array<Partial<CompoundedMedicationIngredientRecord> & Record<string, unknown>>
  regimens: Array<Partial<CompoundedMedicationRegimenRecord> & Record<string, unknown>>
}

function normalizeText(value: unknown): string {
  return sanitizeVisibleText(value).trim()
}

function normalizeArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map((entry) => normalizeText(entry)).filter(Boolean) : []
}

function toNumber(value: unknown): number | null {
  if (value == null || value === '') return null
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  const parsed = Number(String(value).replace(',', '.'))
  return Number.isFinite(parsed) ? parsed : null
}

function slugify(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function familyToArchetype(family: DosageFormFamily): CompoundedV2Archetype {
  if (family === 'oral_unit') return 'oral_unitario'
  if (family === 'oral_liquid') return 'oral_liquido'
  if (family === 'transdermal_measured') return 'transdermico_dosado'
  if (family === 'topical_free_application') return 'topico_livre'
  if (family === 'otic_ophthalmic_local') return 'oto_oftalmico_local'
  return 'procedural_injetavel'
}

function roleToV2(role: CompoundedIngredientRole): CompoundedV2Ingredient['role'] {
  if (role === 'vehicle') return 'vehicle'
  if (role === 'excipient') return 'excipient'
  if (role === 'active') return 'active'
  return 'base'
}

function roleToLegacy(role: CompoundedV2Ingredient['role']): CompoundedIngredientRole {
  if (role === 'vehicle') return 'vehicle'
  if (role === 'excipient') return 'excipient'
  if (role === 'base') return 'other'
  return 'active'
}

function normalizeIngredientNameKey(value: string): string {
  return normalizeText(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function summarizeActivePrinciples(ingredients: CompoundedV2Ingredient[]): string {
  return ingredients
    .filter((ingredient) => ingredient.role === 'active')
    .map((ingredient) => ingredient.name)
    .filter(Boolean)
    .slice(0, 4)
    .join(', ')
}

function inferIngredientMode(
  ingredient: Partial<CompoundedMedicationIngredientRecord>,
  rule: ClinicalIngredientDoseRule | undefined,
  administrationUnit: string,
): Pick<
  CompoundedV2Ingredient,
  'definition_mode' | 'target_unit' | 'calculation_basis' | 'concentration_value' | 'concentration_unit' | 'amount' | 'unit' | 'multiplier' | 'use_regimen_directly' | 'follows_primary_regimen'
> {
  if (rule) {
    if (rule.kind === 'fixed_per_volume') {
      return {
        definition_mode: 'concentration_based',
        target_unit: rule.administrationUnit || administrationUnit || 'mL',
        concentration_value: rule.doseMin ?? null,
        concentration_unit: `${rule.doseUnit}/${rule.administrationUnit || administrationUnit || 'mL'}`,
        amount: rule.doseMin ?? null,
        unit: rule.doseUnit,
        calculation_basis: 'na',
      }
    }

    if (rule.kind === 'fixed_per_unit') {
      return {
        definition_mode: 'fixed_per_unit',
        target_unit: rule.administrationUnit || administrationUnit,
        amount: rule.doseMin ?? null,
        unit: rule.doseUnit,
        calculation_basis: 'unit',
      }
    }

    if (rule.kind === 'fixed_per_dose') {
      return {
        definition_mode: 'derived_from_regimen',
        target_unit: rule.administrationUnit || administrationUnit,
        amount: rule.doseMin ?? null,
        unit: rule.doseUnit,
        calculation_basis: 'animal',
        use_regimen_directly: true,
        follows_primary_regimen: true,
      }
    }

    if (rule.kind === 'per_kg_per_dose' || rule.kind === 'per_kg_per_unit') {
      return {
        definition_mode: 'derived_from_regimen',
        target_unit: rule.administrationUnit || administrationUnit,
        amount: rule.doseMin ?? null,
        unit: rule.doseUnit,
        calculation_basis: 'kg',
        use_regimen_directly: true,
        follows_primary_regimen: true,
      }
    }

    if (rule.kind === 'per_animal_per_dose' || rule.kind === 'per_animal_per_unit') {
      return {
        definition_mode: 'derived_from_regimen',
        target_unit: rule.administrationUnit || administrationUnit,
        amount: rule.doseMin ?? null,
        unit: rule.doseUnit,
        calculation_basis: 'animal',
        use_regimen_directly: true,
        follows_primary_regimen: true,
      }
    }
  }

  if (ingredient.ingredient_role === 'vehicle') {
    return { definition_mode: 'vehicle_or_base', target_unit: administrationUnit, calculation_basis: 'na' }
  }

  if (ingredient.ingredient_role === 'excipient') {
    return { definition_mode: 'excipient', target_unit: administrationUnit, calculation_basis: 'na' }
  }

  return {
    definition_mode: 'fixed_per_unit',
    target_unit: administrationUnit,
    calculation_basis: 'na',
    amount: toNumber(ingredient.quantity_value),
    unit: normalizeText(ingredient.quantity_unit),
  }
}

function getIngredientRuleMap(bundle: CompoundedMedicationBundle): Map<string, ClinicalIngredientDoseRule> {
  const metadata = getClinicalFormulaMetadata(bundle.medication.metadata || null)
  const regimens = Object.values(metadata?.regimen_semantics || {})
  const rules = regimens.flatMap((entry) => entry.ingredientRules || [])
  const map = new Map<string, ClinicalIngredientDoseRule>()
  for (const rule of rules) {
    const key = normalizeIngredientNameKey(rule.ingredientName)
    if (key && !map.has(key)) map.set(key, rule)
  }
  return map
}

function buildFormulaFromMedication(medication: CompoundedMedicationRecord): CompoundedV2Formula {
  const metadata = sanitizeDeepText((medication.metadata || {}) as Record<string, unknown>)
  const payloadFormula = metadata && typeof metadata === 'object' && !Array.isArray(metadata) && (metadata as Record<string, unknown>).payload_v2
  const payloadFormulaRecord = payloadFormula && typeof payloadFormula === 'object' && !Array.isArray(payloadFormula)
    ? ((payloadFormula as Partial<CompoundedMedicationV2>).formula || null)
    : null

  const pharmaceuticalForm = normalizeText(payloadFormulaRecord?.pharmaceutical_form || medication.pharmaceutical_form)
  const administrationUnit = normalizeText(payloadFormulaRecord?.administration_unit || inferAdministrationUnit(pharmaceuticalForm))
  const dosageFormFamily = (payloadFormulaRecord?.dosage_form_family || inferDosageFormFamily(pharmaceuticalForm)) as DosageFormFamily
  const formulaType = (payloadFormulaRecord?.formula_type ||
    getClinicalFormulaMetadata(metadata)?.formula_type ||
    inferFormulaTypeFromText(
      `${medication.name} ${medication.description || ''} ${medication.default_qsp_text || ''}`,
      pharmaceuticalForm,
      administrationUnit,
    )) as UniversalFormulaType

  return {
    id: normalizeText(medication.id),
    clinic_id: normalizeText(medication.clinic_id),
    slug: normalizeText(payloadFormulaRecord?.slug || medication.slug || slugify(medication.name)),
    name: normalizeText(payloadFormulaRecord?.name || medication.name),
    pharmaceutical_form: pharmaceuticalForm,
    archetype: (payloadFormulaRecord?.archetype || familyToArchetype(dosageFormFamily)) as CompoundedV2Archetype,
    formula_type: formulaType,
    dosage_form_family: dosageFormFamily,
    species: normalizeArray(payloadFormulaRecord?.species || medication.species),
    primary_route: normalizeText(payloadFormulaRecord?.primary_route || medication.default_route),
    administration_unit: administrationUnit,
    sale_classification: medication.is_controlled ? 'controlled' : 'free',
    control_type: normalizeText(payloadFormulaRecord?.control_type || medication.control_type) || null,
    is_active: medication.is_active !== false,
    is_continuous_use: !!payloadFormulaRecord?.is_continuous_use,
    short_description: normalizeText(payloadFormulaRecord?.short_description || medication.description),
    active_principles_summary: normalizeText(payloadFormulaRecord?.active_principles_summary),
    qsp_text: normalizeText(payloadFormulaRecord?.qsp_text || medication.default_qsp_text),
    total_quantity_text: normalizeText(payloadFormulaRecord?.total_quantity_text || medication.default_quantity_text || medication.default_qsp_text),
    vehicle: normalizeText(payloadFormulaRecord?.vehicle || medication.default_vehicle),
    flavor: normalizeText(payloadFormulaRecord?.flavor || medication.default_flavor),
    excipient_base: normalizeText(payloadFormulaRecord?.excipient_base || medication.default_excipient),
    ui_version: 2,
    legacy_source: normalizeText(payloadFormulaRecord?.legacy_source) || 'legacy',
  }
}

function buildRegimenFromRecord(
  regimen: CompoundedMedicationRegimenRecord,
  medication: CompoundedMedicationRecord,
): CompoundedV2Regimen {
  const semantics = getClinicalRegimenSemantics(medication.metadata || null, regimen.id)
  const frequencyMode: CompoundedV2FrequencyMode =
    regimen.frequency_unit === 'times_per_day'
      ? 'times_per_day'
      : regimen.frequency_unit === 'hours'
        ? 'interval_hours'
        : 'free_text'
  const durationMode: CompoundedV2DurationMode =
    regimen.duration_mode === 'continuous_until_recheck' ? 'continuous_until_recheck' : regimen.duration_value ? 'fixed' : 'free_text'

  return {
    id: normalizeText(regimen.id),
    name: normalizeText(semantics?.scenarioTitle || regimen.regimen_name || 'Regime padrão'),
    species: normalizeText(regimen.species) || 'Canina',
    clinical_indication: normalizeText(regimen.indication),
    scenario: normalizeText(semantics?.scenarioTitle),
    dose_mode: regimen.dosing_mode === 'calculated' ? 'by_weight' : 'fixed',
    dose_min: toNumber(regimen.dose_min ?? regimen.fixed_administration_value),
    dose_max: toNumber(regimen.dose_max),
    dose_unit: normalizeText(regimen.dose_unit || regimen.fixed_administration_unit),
    dose_basis: normalizeText(regimen.per_weight_unit) || (regimen.dosing_mode === 'calculated' ? 'kg' : 'na'),
    concentration_value: toNumber(regimen.concentration_value),
    concentration_unit: normalizeText(regimen.concentration_unit),
    administration_unit: normalizeText(semantics?.administrationUnitLabel || regimen.fixed_administration_unit),
    frequency_mode: frequencyMode,
    frequency_min: toNumber(regimen.frequency_value_min),
    frequency_max: toNumber(regimen.frequency_value_max),
    frequency_text: normalizeText(regimen.frequency_label),
    duration_mode: durationMode,
    duration_value: toNumber(regimen.duration_value),
    duration_unit: normalizeText(regimen.duration_unit),
    duration_text: normalizeText(semantics?.durationText),
    usage_instruction: normalizeText(semantics?.ownerInstruction || regimen.default_administration_sig),
    tutor_observation: '',
    internal_note: normalizeText(semantics?.internalNote || regimen.notes),
    pharmacy_note: normalizeText(semantics?.pharmacyInstruction),
    pharmacy_strategy: normalizeClinicalPharmacyStrategy(semantics?.pharmacyStrategy || 'qsp_x_doses'),
    is_default: true,
  }
}

function buildIngredientFromRecord(
  ingredient: CompoundedMedicationIngredientRecord,
  rule: ClinicalIngredientDoseRule | undefined,
  administrationUnit: string,
): CompoundedV2Ingredient {
  const inferred = inferIngredientMode(ingredient, rule, administrationUnit)
  return {
    id: normalizeText(ingredient.id),
    name: normalizeText(ingredient.ingredient_name),
    role: roleToV2(ingredient.ingredient_role),
    amount: inferred.amount ?? toNumber(ingredient.quantity_value),
    unit: normalizeText(inferred.unit || ingredient.quantity_unit || ingredient.concentration_unit),
    note: normalizeText(ingredient.notes || ingredient.free_text),
    is_controlled: !!ingredient.is_controlled_ingredient,
    definition_mode: inferred.definition_mode,
    target_unit: normalizeText(inferred.target_unit || administrationUnit),
    calculation_basis: inferred.calculation_basis || 'na',
    multiplier: inferred.multiplier ?? null,
    concentration_value: inferred.concentration_value ?? toNumber(ingredient.concentration_value),
    concentration_unit: normalizeText(inferred.concentration_unit || ingredient.concentration_unit),
    use_regimen_directly: inferred.use_regimen_directly ?? false,
    follows_primary_regimen: inferred.follows_primary_regimen ?? false,
  }
}

function maybeHydrateFromPayload(v2: CompoundedMedicationV2, metadata: Record<string, unknown> | null | undefined): CompoundedMedicationV2 {
  const payload = metadata?.payload_v2
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return v2

  const safePayload = sanitizeDeepText(payload as Partial<CompoundedMedicationV2>)
  const nextFormula = {
    ...v2.formula,
    ...(safePayload.formula || {}),
    id: v2.formula.id,
    clinic_id: v2.formula.clinic_id,
    sale_classification: v2.formula.sale_classification,
    control_type: v2.formula.control_type,
    is_active: v2.formula.is_active,
    ui_version: 2 as const,
  }

  const nextIngredients = Array.isArray(safePayload.ingredients) && safePayload.ingredients.length > 0
    ? safePayload.ingredients.map((ingredient, index) => ({
      ...v2.ingredients[index],
      ...ingredient,
      id: normalizeText(ingredient.id || v2.ingredients[index]?.id || crypto.randomUUID()),
    }))
    : v2.ingredients

  const nextRegimens = Array.isArray(safePayload.regimens) && safePayload.regimens.length > 0
    ? safePayload.regimens.map((regimen, index) => ({
      ...v2.regimens[index],
      ...regimen,
      id: normalizeText(regimen.id || v2.regimens[index]?.id || crypto.randomUUID()),
    }))
    : v2.regimens

  return { formula: nextFormula, ingredients: nextIngredients, regimens: nextRegimens }
}

export function createEmptyCompoundedV2(): CompoundedMedicationV2 {
  const regimenId = crypto.randomUUID()
  return {
    formula: {
      id: crypto.randomUUID(),
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
    ingredients: [{
      id: crypto.randomUUID(),
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
    }],
    regimens: [{
      id: regimenId,
      name: 'Regime padrão',
      species: 'Canina',
      clinical_indication: '',
      scenario: '',
      dose_mode: 'fixed',
      dose_min: 1,
      dose_max: null,
      dose_unit: 'mL',
      dose_basis: 'na',
      concentration_value: null,
      concentration_unit: '',
      administration_unit: 'mL',
      frequency_mode: 'interval_hours',
      frequency_min: 12,
      frequency_max: null,
      frequency_text: '',
      duration_mode: 'fixed',
      duration_value: 7,
      duration_unit: 'dias',
      duration_text: '',
      usage_instruction: '',
      tutor_observation: '',
      internal_note: '',
      pharmacy_note: '',
      pharmacy_strategy: 'qsp_x_doses',
      is_default: true,
    }],
  }
}

export function compoundedListItemToV2(item: CompoundedMedicationListItem): CompoundedMedicationV2 {
  const formula = buildFormulaFromMedication(item)
  return {
    formula: {
      ...formula,
      active_principles_summary: formula.active_principles_summary || normalizeText(item.name),
    },
    ingredients: [],
    regimens: [],
  }
}

export function legacyManipulatedToV2(bundle: CompoundedMedicationBundle): CompoundedMedicationV2 {
  const formula = buildFormulaFromMedication(bundle.medication)
  const ruleMap = getIngredientRuleMap(bundle)
  const regimens = bundle.regimens.length > 0
    ? bundle.regimens.map((regimen, index) => ({ ...buildRegimenFromRecord(regimen, bundle.medication), is_default: index === 0 }))
    : createEmptyCompoundedV2().regimens
  const administrationUnit = regimens[0]?.administration_unit || formula.administration_unit
  const ingredients = bundle.ingredients.length > 0
    ? bundle.ingredients.map((ingredient) =>
      buildIngredientFromRecord(ingredient, ruleMap.get(normalizeIngredientNameKey(ingredient.ingredient_name)), administrationUnit))
    : createEmptyCompoundedV2().ingredients

  const next: CompoundedMedicationV2 = {
    formula: {
      ...formula,
      administration_unit: administrationUnit,
      active_principles_summary: formula.active_principles_summary || summarizeActivePrinciples(ingredients),
    },
    ingredients,
    regimens,
  }

  return maybeHydrateFromPayload(next, bundle.medication.metadata || null)
}

export function importParsedClinicalToV2(parsed: ParsedClinicalTextImport): CompoundedMedicationV2 {
  const medication = parsed.medication
  const metadata = parsed.metadata
  const family = (metadata.dosage_form_family || inferDosageFormFamily(medication.pharmaceutical_form)) as DosageFormFamily
  const formulaType = ((metadata.formula_type)
    || (metadata.formula_model === 'clinical_dose_oriented' ? 'clinical_dose_oriented' : null)
    || inferFormulaTypeFromText(parsed.metadata.imported_clinical_text || '', medication.pharmaceutical_form, metadata.administration_unit)) as UniversalFormulaType
  const administrationUnit = normalizeText(metadata.administration_unit || inferAdministrationUnit(medication.pharmaceutical_form))

  const v2: CompoundedMedicationV2 = {
    formula: {
      id: crypto.randomUUID(),
      clinic_id: normalizeText(medication.clinic_id),
      slug: slugify(medication.name),
      name: normalizeText(medication.name),
      pharmaceutical_form: normalizeText(medication.pharmaceutical_form),
      archetype: familyToArchetype(family),
      formula_type: formulaType,
      dosage_form_family: family,
      species: normalizeArray(medication.species),
      primary_route: normalizeText(medication.default_route),
      administration_unit: administrationUnit,
      sale_classification: medication.is_controlled ? 'controlled' : 'free',
      control_type: normalizeText(medication.control_type) || null,
      is_active: medication.is_active !== false,
      is_continuous_use: false,
      short_description: normalizeText(medication.description),
      active_principles_summary: '',
      qsp_text: normalizeText(medication.default_qsp_text),
      total_quantity_text: normalizeText(medication.default_quantity_text || medication.default_qsp_text),
      vehicle: normalizeText(medication.default_vehicle),
      flavor: normalizeText(medication.default_flavor),
      excipient_base: normalizeText(medication.default_excipient),
      ui_version: 2,
      legacy_source: 'clinical_text_import',
    },
    ingredients: parsed.ingredients.map((ingredient) => {
      const key = normalizeIngredientNameKey(String(ingredient.ingredient_name || ''))
      const rule = Object.values(metadata.regimen_semantics || {})
        .flatMap((entry) => entry.ingredientRules || [])
        .find((entry) => normalizeIngredientNameKey(entry.ingredientName) === key)
      return buildIngredientFromRecord({
        id: crypto.randomUUID(),
        clinic_id: normalizeText(medication.clinic_id),
        compounded_medication_id: '',
        sort_order: 0,
        ingredient_name: normalizeText(ingredient.ingredient_name),
        ingredient_role: (ingredient.ingredient_role || 'active') as CompoundedIngredientRole,
        quantity_value: toNumber(ingredient.quantity_value),
        quantity_unit: normalizeText(ingredient.quantity_unit),
        concentration_value: toNumber(ingredient.concentration_value),
        concentration_unit: normalizeText(ingredient.concentration_unit),
        per_value: toNumber(ingredient.per_value),
        per_unit: normalizeText(ingredient.per_unit),
        free_text: normalizeText(ingredient.free_text),
        is_controlled_ingredient: !!ingredient.is_controlled_ingredient,
        notes: normalizeText(ingredient.notes),
      }, rule, administrationUnit)
    }),
    regimens: parsed.regimens.map((regimen, index) => {
      const regimenId = normalizeText(regimen.id || crypto.randomUUID())
      const semantics = getClinicalRegimenSemantics(metadata, regimenId)
      return {
        id: regimenId,
        name: normalizeText(regimen.regimen_name || semantics?.scenarioTitle || `Regime ${index + 1}`),
        species: normalizeText(regimen.species) || 'Canina',
        clinical_indication: normalizeText(regimen.indication),
        scenario: normalizeText(semantics?.scenarioTitle),
        dose_mode: regimen.dosing_mode === 'calculated' ? 'by_weight' : 'fixed',
        dose_min: toNumber(regimen.dose_min ?? regimen.fixed_administration_value),
        dose_max: toNumber(regimen.dose_max),
        dose_unit: normalizeText(regimen.dose_unit || regimen.fixed_administration_unit),
        dose_basis: normalizeText(regimen.per_weight_unit) || (regimen.dosing_mode === 'calculated' ? 'kg' : 'na'),
        concentration_value: toNumber(regimen.concentration_value),
        concentration_unit: normalizeText(regimen.concentration_unit),
        administration_unit: normalizeText(semantics?.administrationUnitLabel || administrationUnit),
        frequency_mode: regimen.frequency_unit === 'times_per_day'
          ? 'times_per_day'
          : regimen.frequency_unit === 'hours'
            ? 'interval_hours'
            : 'free_text',
        frequency_min: toNumber(regimen.frequency_value_min),
        frequency_max: toNumber(regimen.frequency_value_max),
        frequency_text: normalizeText(regimen.frequency_label || semantics?.frequencyLabel),
        duration_mode: regimen.duration_mode === 'continuous_until_recheck' ? 'continuous_until_recheck' : 'fixed',
        duration_value: toNumber(regimen.duration_value),
        duration_unit: normalizeText(regimen.duration_unit),
        duration_text: normalizeText(semantics?.durationText),
        usage_instruction: normalizeText(semantics?.ownerInstruction || regimen.default_administration_sig),
        tutor_observation: '',
        internal_note: normalizeText(semantics?.internalNote || regimen.notes),
        pharmacy_note: normalizeText(semantics?.pharmacyInstruction),
        pharmacy_strategy: normalizeClinicalPharmacyStrategy(semantics?.pharmacyStrategy || 'qsp_x_doses'),
        is_default: index === 0,
      }
    }),
  }

  return {
    ...v2,
    formula: {
      ...v2.formula,
      active_principles_summary: summarizeActivePrinciples(v2.ingredients),
    },
  }
}

export function v2ManipulatedToPersistence(v2: CompoundedMedicationV2): CompoundedV2PersistencePayload {
  const clean = sanitizeDeepText(v2)
  const metadata = {
    payload_v2: clean,
    ui_version: 2,
    sale_classification: clean.formula.sale_classification,
  }

  return {
    medication: {
      id: clean.formula.id,
      clinic_id: clean.formula.clinic_id,
      slug: clean.formula.slug || slugify(clean.formula.name),
      name: clean.formula.name,
      pharmaceutical_form: clean.formula.pharmaceutical_form,
      description: clean.formula.short_description || null,
      default_route: clean.formula.primary_route || null,
      species: clean.formula.species,
      routes: clean.formula.primary_route ? [clean.formula.primary_route] : [],
      is_controlled: clean.formula.sale_classification === 'controlled',
      control_type: clean.formula.control_type || null,
      is_active: clean.formula.is_active,
      notes: clean.formula.active_principles_summary || null,
      manipulation_instructions: clean.regimens.find((regimen) => regimen.is_default)?.pharmacy_note || null,
      default_quantity_text: clean.formula.total_quantity_text || null,
      default_qsp_text: clean.formula.qsp_text || null,
      default_flavor: clean.formula.flavor || null,
      default_vehicle: clean.formula.vehicle || null,
      default_excipient: clean.formula.excipient_base || null,
      metadata,
    },
    ingredients: clean.ingredients.map((ingredient, index) => ({
      id: ingredient.id,
      sort_order: index,
      ingredient_name: ingredient.name,
      ingredient_role: roleToLegacy(ingredient.role),
      quantity_value: ingredient.definition_mode === 'fixed_total_formula' || ingredient.definition_mode === 'fixed_per_unit' || ingredient.definition_mode === 'derived_from_regimen' || ingredient.definition_mode === 'derived_from_regimen_with_multiplier'
        ? ingredient.amount
        : null,
      quantity_unit: ingredient.unit || null,
      concentration_value: ingredient.definition_mode === 'concentration_based' ? ingredient.concentration_value ?? ingredient.amount : null,
      concentration_unit: ingredient.definition_mode === 'concentration_based' ? ingredient.concentration_unit || ingredient.unit : null,
      per_value: ingredient.definition_mode === 'fixed_per_unit' ? 1 : null,
      per_unit: ingredient.target_unit || null,
      free_text: ingredient.note || null,
      is_controlled_ingredient: ingredient.is_controlled,
      notes: ingredient.note || null,
      metadata: {
        definition_mode: ingredient.definition_mode,
        target_unit: ingredient.target_unit,
        calculation_basis: ingredient.calculation_basis,
        multiplier: ingredient.multiplier,
        concentration_value: ingredient.concentration_value,
        concentration_unit: ingredient.concentration_unit,
        use_regimen_directly: ingredient.use_regimen_directly,
        follows_primary_regimen: ingredient.follows_primary_regimen,
      },
    })),
    regimens: clean.regimens.map((regimen, index) => ({
      id: regimen.id,
      sort_order: index,
      regimen_name: regimen.name || null,
      indication: regimen.clinical_indication || null,
      dosing_mode: regimen.dose_mode === 'by_weight' ? 'calculated' : 'fixed_per_patient',
      species: regimen.species,
      route: clean.formula.primary_route || null,
      dose_min: regimen.dose_min,
      dose_max: regimen.dose_max,
      dose_unit: regimen.dose_unit || null,
      per_weight_unit: regimen.dose_basis || null,
      fixed_administration_value: regimen.dose_mode === 'fixed' ? regimen.dose_min : null,
      fixed_administration_unit: regimen.administration_unit || null,
      concentration_value: regimen.concentration_value,
      concentration_unit: regimen.concentration_unit || null,
      concentration_per_value: 1,
      concentration_per_unit: regimen.administration_unit || null,
      frequency_value_min: regimen.frequency_min,
      frequency_value_max: regimen.frequency_max,
      frequency_unit: regimen.frequency_mode === 'times_per_day' ? 'times_per_day' : regimen.frequency_mode === 'interval_hours' ? 'hours' : null,
      frequency_label: regimen.frequency_text || null,
      duration_mode: regimen.duration_mode === 'continuous_until_recheck' ? 'continuous_until_recheck' : 'fixed_days',
      duration_value: regimen.duration_value,
      duration_unit: regimen.duration_unit || null,
      inherit_default_start: true,
      notes: regimen.internal_note || null,
      allow_edit: true,
      default_prepared_quantity_text: clean.formula.total_quantity_text || clean.formula.qsp_text || null,
      default_administration_sig: regimen.usage_instruction || null,
      calculation_mode: regimen.dose_mode === 'by_weight' ? 'weight_based' : 'fixed_per_animal',
      applied_dose_text: regimen.usage_instruction || null,
      applied_quantity_text: clean.formula.total_quantity_text || clean.formula.qsp_text || null,
      metadata: {
        scenario: regimen.scenario,
        tutor_observation: regimen.tutor_observation,
        pharmacy_note: regimen.pharmacy_note,
        internal_note: regimen.internal_note,
        pharmacy_strategy: regimen.pharmacy_strategy,
      },
    })),
  }
}
