import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReceituarioChrome from './ReceituarioChrome'
import {
  RxvButton,
  RxvCard,
  RxvChipsMultiSelect,
  RxvField,
  RxvInput,
  RxvSectionHeader,
  RxvSelect,
  RxvTextarea,
  RxvToggle,
} from '../../src/components/receituario/RxvComponents'
import { useClinic } from '../../src/components/ClinicProvider'
import { supabase } from '../../src/lib/supabaseClient'
import {
  deleteCompoundedMedication,
  getCompoundedMedicationBundle,
  listCompoundedMedications,
  saveCompoundedMedicationBundle,
  summarizeCompoundedIngredient,
  type CompoundedIngredientRole,
  type CompoundedMedicationBundle,
  type CompoundedMedicationIngredientRecord,
  type CompoundedMedicationListItem,
  type CompoundedMedicationRecord,
  type CompoundedMedicationRegimenRecord,
} from '../../src/lib/compoundedRecords'
import {
  buildClinicalRuleSummary,
  DOSAGE_FORM_PRESETS,
  getClinicalFormulaMetadata,
  getClinicalRegimenSemantics,
  getDosageFamilyLabel,
  getFormulaTypeLabel,
  getUniversalFormulaType,
  inferAdministrationUnit,
  inferDosageFormFamily,
  normalizeClinicalPharmacyStrategy,
  parseClinicalTextImport,
  type ClinicalFormulaMetadata,
  type DosageFormFamily,
  type ClinicalPharmacyStrategy,
  type UniversalFormulaType,
} from './compoundedClinicalText'

const SPECIES_OPTIONS = ['Canina', 'Felina']
const PHARMACEUTICAL_FORM_OPTIONS = [
  'Suspensão oral',
  'Solução oral',
  'Xarope',
  'Emulsão oral',
  'Pasta oral',
  'Calda',
  'Molho',
  'Seringa dosadora',
  'Cápsula',
  'Cápsula gastrorresistente',
  'Comprimido',
  'Comprimido palatável',
  'Biscoito medicamentoso',
  'Sachê',
  'Filme oral',
  'Unidade mastigável',
  'Gel transdérmico',
  'Creme transdérmico',
  'Pump transdérmico',
  'Spray',
  'Mousse',
  'Espuma',
  'Pomada',
  'Creme',
  'Loção',
  'Gel tópico',
  'Solução tópica',
  'Unguento',
  'Pour-on',
  'Spot-on',
  'Shampoo',
  'Condicionador',
  'Banho seco',
  'Lenço',
  'Colírio',
  'Solução otológica',
  'Pó otológico',
  'Gel dental',
  'Creme dental',
  'Enxaguatório',
  'Solução irrigadora',
  'Espuma bucal',
  'Solução injetável',
]
const DOSAGE_FAMILY_OPTIONS: Array<{ value: DosageFormFamily; label: string }> = [
  { value: 'oral_liquid', label: 'Oral líquida / semilíquida' },
  { value: 'oral_unit', label: 'Oral unitizada' },
  { value: 'transdermal_measured', label: 'Transdérmica doseada' },
  { value: 'topical_free_application', label: 'Tópica de aplicação livre' },
  { value: 'otic_ophthalmic_local', label: 'Oto / oftálmica / bucal local' },
  { value: 'procedural_injectable', label: 'Procedimental / injetável' },
]
const UNIVERSAL_FORMULA_OPTIONS: Array<{ value: UniversalFormulaType; label: string }> = [
  { value: 'fixed_unit_formula', label: 'Concentração / unidade fixa' },
  { value: 'clinical_dose_oriented', label: 'Orientada por dose clínica' },
  { value: 'procedural_topical', label: 'Procedural / tópica livre' },
]
const PHARMACY_STRATEGY_OPTIONS: Array<{ value: ClinicalPharmacyStrategy; label: string }> = [
  { value: 'dose_base_per_1ml', label: 'Cada 1 mL corresponde a 1 dose' },
  { value: 'dose_base_per_custom_volume', label: 'Cada dose usa volume fixo editável' },
  { value: 'dose_base_per_unit', label: 'Cada unidade corresponde a 1 dose' },
  { value: 'dose_base_per_click', label: 'Cada click / pump corresponde a 1 dose' },
  { value: 'qsp_x_doses', label: 'Preparar q.s.p. X doses' },
  { value: 'adjustable_concentration', label: 'Concentração final ajustável na revisão' },
]
const ADMINISTRATION_UNIT_OPTIONS: Record<DosageFormFamily, string[]> = {
  oral_liquid: ['mL', 'gota', 'dose', 'g'],
  oral_unit: ['cápsula', 'comprimido', 'biscoito', 'sachê', 'filme', 'unidade'],
  transdermal_measured: ['mL', 'click', 'pump', 'aplicação'],
  topical_free_application: ['aplicação', 'jato', 'g', 'mL', 'lenço'],
  otic_ophthalmic_local: ['gota', 'jato', 'aplicação', 'filme', 'mL'],
  procedural_injectable: ['mL', 'dose', 'unidade'],
}
const ROUTE_OPTIONS = [
  { value: '', label: 'Selecionar via principal' },
  { value: 'VO', label: 'Via oral (VO)' },
  { value: 'SC', label: 'Subcutânea (SC)' },
  { value: 'IM', label: 'Intramuscular (IM)' },
  { value: 'IV', label: 'Intravenosa (IV)' },
  { value: 'Topica', label: 'Tópica' },
  { value: 'Oftalmica', label: 'Oftálmica' },
  { value: 'Otologica', label: 'Otológica' },
  { value: 'Intranasal', label: 'Intranasal' },
  { value: 'Transdermica', label: 'Transdérmica' },
]
const INGREDIENT_ROLE_OPTIONS: Array<{ value: CompoundedIngredientRole; label: string }> = [
  { value: 'active', label: 'Ativo' },
  { value: 'vehicle', label: 'Veículo' },
  { value: 'flavor', label: 'Sabor' },
  { value: 'excipient', label: 'Excipiente' },
  { value: 'other', label: 'Outro' },
]
const REGIMEN_SPECIES_OPTIONS = [
  { value: '', label: 'Selecionar espécie' },
  { value: 'Canina', label: 'Canina' },
  { value: 'Felina', label: 'Felina' },
]
const DURATION_MODE_OPTIONS = [
  { value: 'fixed_days', label: 'Duração fechada' },
  { value: 'continuous_until_recheck', label: 'Uso contínuo até reavaliação' },
]
const FREQUENCY_PRESET_OPTIONS = [
  { value: '', label: 'Selecionar frequência' },
  { value: 'q24h', label: 'SID • a cada 24 horas' },
  { value: 'q12h', label: 'BID • a cada 12 horas' },
  { value: 'q8h', label: 'TID • a cada 8 horas' },
  { value: 'q6h', label: 'QID • a cada 6 horas' },
]
const CLINICAL_DOSE_BASIS_OPTIONS = [
  { value: 'mg/kg', label: 'mg/kg' },
  { value: 'mcg/kg', label: 'mcg/kg' },
  { value: 'ui/kg', label: 'UI/kg' },
  { value: 'ml/kg', label: 'mL/kg' },
  { value: 'mg/animal', label: 'mg/animal' },
  { value: 'mcg/animal', label: 'mcg/animal' },
  { value: 'ui/animal', label: 'UI/animal' },
  { value: 'mg/unidade', label: 'mg/unidade' },
  { value: 'ml/unidade', label: 'mL/unidade' },
]
const DOSE_SELECTION_OPTIONS = [
  { value: 'min', label: 'Dose mínima' },
  { value: 'mid', label: 'Dose média' },
  { value: 'max', label: 'Dose máxima' },
  { value: 'manual', label: 'Ajuste manual na receita' },
]
const FREQUENCY_MODE_OPTIONS = [
  { value: 'times_per_day', label: 'X vezes ao dia' },
  { value: 'interval_hours', label: 'A cada X horas' },
]
const DURATION_UNIT_OPTIONS = [
  { value: 'dias', label: 'dias' },
  { value: 'semanas', label: 'semanas' },
]

type EditorIngredient = Partial<CompoundedMedicationIngredientRecord>
type EditorRegimen = Partial<CompoundedMedicationRegimenRecord>

type EditorState = {
  medication: Partial<CompoundedMedicationRecord> & { name: string; pharmaceutical_form: string }
  ingredients: EditorIngredient[]
  regimens: EditorRegimen[]
}

function createEmptyIngredient(): EditorIngredient {
  return {
    id: crypto.randomUUID(),
    ingredient_name: '',
    ingredient_role: 'active',
    free_text: '',
    notes: '',
  }
}

function createEmptyRegimen(): EditorRegimen {
  return {
    id: crypto.randomUUID(),
    regimen_name: '',
    indication: '',
    species: 'Canina',
    route: 'VO',
    dosing_mode: 'fixed_per_patient',
    fixed_administration_value: 1,
    fixed_administration_unit: 'mL',
    dose_min: 0.5,
    dose_unit: 'mg',
    per_weight_unit: 'kg',
    concentration_value: 2,
    concentration_unit: 'mg',
    concentration_per_value: 1,
    concentration_per_unit: 'mL',
    frequency_value_min: 12,
    frequency_unit: 'hours',
    frequency_label: 'a cada 12 horas',
    duration_mode: 'fixed_days',
    duration_value: 14,
    duration_unit: 'dias',
    inherit_default_start: true,
    allow_edit: true,
    notes: '',
    default_administration_sig: '',
    default_prepared_quantity_text: '',
  }
}

function createEmptyEditor(): EditorState {
  return {
    medication: {
      id: '',
      name: '',
      description: '',
      pharmaceutical_form: '',
      default_route: '',
      species: ['Canina'],
      routes: [],
      is_controlled: false,
      control_type: 'venda_livre',
      is_active: true,
      default_quantity_text: '',
      default_qsp_text: '',
      default_flavor: '',
      default_vehicle: '',
      default_excipient: '',
      manipulation_instructions: '',
      notes: '',
      metadata: {
        continuous_use_default: false,
        control_document_target: 'standard',
        control_extra_rules: '',
        complement_text: '',
        source_type: 'structured',
        formula_model: 'fixed_concentration',
        formula_type: '',
        dosage_form_family: '',
        dosage_form: '',
        administration_unit: '',
      },
    },
    ingredients: [createEmptyIngredient()],
    regimens: [createEmptyRegimen()],
  }
}

function getClinicalMetadata(state: EditorState): ClinicalFormulaMetadata | null {
  return getClinicalFormulaMetadata(state.medication.metadata || null)
}

function getFormulaModel(state: EditorState): 'fixed_concentration' | 'clinical_dose_oriented' {
  return getClinicalMetadata(state)?.formula_model === 'clinical_dose_oriented' ? 'clinical_dose_oriented' : 'fixed_concentration'
}

function getUniversalType(state: EditorState): UniversalFormulaType {
  return getUniversalFormulaType(state.medication.metadata || null)
}

function getDosageFamily(state: EditorState): DosageFormFamily {
  const metadata = getClinicalMetadata(state)
  return metadata?.dosage_form_family || inferDosageFormFamily(state.medication.pharmaceutical_form)
}

function getAdministrationUnitLabel(state: EditorState): string {
  const metadata = getClinicalMetadata(state)
  return String(metadata?.administration_unit || inferAdministrationUnit(state.medication.pharmaceutical_form))
}

function getClinicalRegimenMeta(state: EditorState, regimenId?: string): ReturnType<typeof getClinicalRegimenSemantics> {
  return getClinicalRegimenSemantics(state.medication.metadata || null, regimenId)
}

function updateClinicalRegimenMeta(
  previousMetadata: Record<string, unknown> | null | undefined,
  regimenId: string,
  patch: Record<string, unknown>
): Record<string, unknown> {
  const current = getClinicalFormulaMetadata(previousMetadata || {}) || {
    source_type: 'clinical_text' as const,
    formula_model: 'clinical_dose_oriented' as const,
    parser_version: 1,
    regimen_semantics: {},
  }

  return {
    ...(previousMetadata || {}),
    ...current,
    source_type: 'clinical_text',
    formula_model: 'clinical_dose_oriented',
    regimen_semantics: {
      ...(current.regimen_semantics || {}),
      [regimenId]: {
        ...(current.regimen_semantics?.[regimenId] || {}),
        regimenId,
        ...patch,
      },
    },
  }
}

function normalizeText(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function isCodexTestMedication(item: Pick<CompoundedMedicationListItem, 'name' | 'description'>): boolean {
  const haystack = normalizeText(`${item.name || ''} ${item.description || ''}`)
  return haystack.includes('codex remoto') || haystack.includes('validacao remota')
}

function boolFromMetadata(value: unknown): boolean {
  return value === true
}

function getMedicationMetadata(state: EditorState) {
  return (state.medication.metadata || {}) as Record<string, unknown>
}

function cloneEditorFromBundle(bundle: CompoundedMedicationBundle): EditorState {
  return {
    medication: {
      ...bundle.medication,
      metadata: {
        ...(bundle.medication.metadata || {}),
      },
    },
    ingredients: bundle.ingredients.length ? bundle.ingredients.map((item) => ({ ...item })) : [createEmptyIngredient()],
    regimens: bundle.regimens.length ? bundle.regimens.map((item) => ({ ...item })) : [createEmptyRegimen()],
  }
}

function buildFrequencyPreset(regimen: EditorRegimen): string {
  const hours = Number(regimen.frequency_value_min || 0)
  if (!regimen.frequency_unit || normalizeText(regimen.frequency_unit) !== 'hours') return ''
  if (hours === 24) return 'q24h'
  if (hours === 12) return 'q12h'
  if (hours === 8) return 'q8h'
  if (hours === 6) return 'q6h'
  return ''
}

function applyFrequencyPreset(regimen: EditorRegimen, preset: string): EditorRegimen {
  const next = { ...regimen }
  if (preset === 'q24h') return { ...next, frequency_value_min: 24, frequency_unit: 'hours', frequency_label: 'a cada 24 horas' }
  if (preset === 'q12h') return { ...next, frequency_value_min: 12, frequency_unit: 'hours', frequency_label: 'a cada 12 horas' }
  if (preset === 'q8h') return { ...next, frequency_value_min: 8, frequency_unit: 'hours', frequency_label: 'a cada 8 horas' }
  if (preset === 'q6h') return { ...next, frequency_value_min: 6, frequency_unit: 'hours', frequency_label: 'a cada 6 horas' }
  return next
}

function buildFrequencySummary(mode: string, minValue: number | null, maxValue: number | null): string {
  if (!minValue || minValue <= 0) return ''
  if (mode === 'times_per_day') {
    if (maxValue && maxValue > minValue) return `${minValue} a ${maxValue} vezes ao dia`
    return `${minValue} vez${minValue > 1 ? 'es' : ''} ao dia`
  }
  if (maxValue && maxValue > minValue) return `a cada ${minValue} a ${maxValue} horas`
  return `a cada ${minValue} horas`
}

function buildDurationSummary(mode: string, minValue: number | null, maxValue: number | null, unit: string): string {
  if (mode === 'continuous_until_recheck') return 'até reavaliação clínica'
  if (!minValue || minValue <= 0) return ''
  if (maxValue && maxValue > minValue) return `${minValue} a ${maxValue} ${unit}`
  return `${minValue} ${unit}`
}

function buildIngredientLine(ingredient: EditorIngredient): string {
  const free = String(ingredient.free_text || '').trim()
  if (free) return free
  return summarizeCompoundedIngredient(ingredient)
}

function buildFormulaSubtitle(state: EditorState) {
  const med = state.medication
  return [
    med.pharmaceutical_form,
    med.default_qsp_text || med.default_quantity_text || '',
    med.default_vehicle ? `Veículo ${med.default_vehicle}` : '',
    med.default_flavor ? `Sabor ${med.default_flavor}` : '',
  ]
    .filter(Boolean)
    .join(' • ')
}

function getFormsForFamily(family: DosageFormFamily): string[] {
  const fromPreset = DOSAGE_FORM_PRESETS.filter((entry) => entry.family === family).map((entry) => entry.value)
  const fromCatalog = PHARMACEUTICAL_FORM_OPTIONS.filter((entry) => inferDosageFormFamily(entry) === family)
  return Array.from(new Set([...fromPreset, ...fromCatalog]))
}

function buildClinicalImportSummary(metadata: ClinicalFormulaMetadata | null, controlled: boolean): string[] {
  if (!metadata) return []
  const rows = [
    `Família funcional: ${getDosageFamilyLabel(metadata.dosage_form_family) || 'Não identificada'}`,
    `Tipo da fórmula: ${getFormulaTypeLabel(getUniversalFormulaType(metadata))}`,
    metadata.dosage_form ? `Forma farmacêutica: ${metadata.dosage_form}` : '',
    metadata.administration_unit ? `Unidade de administração: ${metadata.administration_unit}` : '',
    controlled ? 'Fluxo documental: controle especial' : 'Fluxo documental: receita padrão',
  ]
  return rows.filter(Boolean)
}

function normalizeClinicalDoseBasis(value: unknown): string {
  return normalizeText(String(value || '')).replace(/\s+/g, '')
}

function isMeaningfulIngredient(ingredient: EditorIngredient): boolean {
  return Boolean(String(ingredient.ingredient_name || '').trim())
}

function isFixedIngredientStructured(ingredient: EditorIngredient): boolean {
  return isMeaningfulIngredient(ingredient) && (
    ingredient.quantity_value != null ||
    ingredient.concentration_value != null ||
    String(ingredient.free_text || '').trim().length > 0
  )
}

function isClinicalIngredientStructured(ingredient: EditorIngredient): boolean {
  return isMeaningfulIngredient(ingredient) && (
    (ingredient.quantity_value != null && String(ingredient.quantity_unit || '').trim()) ||
    String(ingredient.free_text || '').trim().length > 0
  )
}

function buildFixedIngredientStructuredText(ingredient: EditorIngredient, administrationUnit: string): string {
  if (String(ingredient.free_text || '').trim()) return String(ingredient.free_text || '').trim()
  const qty = ingredient.quantity_value != null ? String(ingredient.quantity_value).replace('.', ',') : ''
  const qtyUnit = String(ingredient.quantity_unit || '').trim()
  const per = String(ingredient.per_unit || administrationUnit || 'unidade').trim()
  const concentration = ingredient.concentration_value != null
    ? `${String(ingredient.concentration_value).replace('.', ',')} ${String(ingredient.concentration_unit || '').trim()}`.trim()
    : ''
  const main = [qty, qtyUnit].filter(Boolean).join(' ').trim()
  const base = [main || concentration, per ? `por ${per}` : ''].filter(Boolean).join(' ')
  return base.trim()
}

function buildClinicalIngredientRuleText(ingredient: EditorIngredient): string {
  if (String(ingredient.free_text || '').trim()) return String(ingredient.free_text || '').trim()
  const min = ingredient.quantity_value != null ? String(ingredient.quantity_value).replace('.', ',') : ''
  const max = ingredient.concentration_value != null ? String(ingredient.concentration_value).replace('.', ',') : ''
  const unit = String(ingredient.quantity_unit || '').trim()
  const basis = String(ingredient.per_unit || '').trim()
  const range = min && max && min !== max ? `${min} a ${max}` : min || max
  return [range, unit, basis].filter(Boolean).join(' ').trim()
}

function getClinicalRulesForValidation(state: EditorState): number {
  const metadata = getClinicalFormulaMetadata(state.medication.metadata || null)
  const explicitRules = state.ingredients.filter(isClinicalIngredientStructured).length
  if (explicitRules) return explicitRules
  return Object.values(metadata?.regimen_semantics || {}).reduce((count, semantics) => count + (semantics.ingredientRules?.length || 0), 0)
}

function getClinicalDoseSelectionValue(state: EditorState, regimenId: string): string {
  const semantics = getClinicalRegimenSemantics(state.medication.metadata || null, regimenId)
  return String(semantics?.doseSelectionStrategy || 'min')
}

function getClinicalPharmacyStrategyValue(state: EditorState, regimenId: string): ClinicalPharmacyStrategy {
  const semantics = getClinicalRegimenSemantics(state.medication.metadata || null, regimenId)
  return normalizeClinicalPharmacyStrategy(String(semantics?.pharmacyStrategy || ''))
}

function getClinicalScenarioTitle(state: EditorState, regimen: EditorRegimen): string {
  const semantics = getClinicalRegimenSemantics(state.medication.metadata || null, String(regimen.id || ''))
  return String(semantics?.scenarioTitle || regimen.indication || regimen.regimen_name || '')
}

function getClinicalReductionNote(state: EditorState, regimen: EditorRegimen): string {
  const semantics = getClinicalRegimenSemantics(state.medication.metadata || null, String(regimen.id || ''))
  return String(semantics?.reductionNote || '')
}

function syncClinicalMetadataWithEditor(state: EditorState): Record<string, unknown> {
  const previousMetadata = getClinicalFormulaMetadata(state.medication.metadata || null)
  const formulaType = (String((state.medication.metadata || {}).formula_type || '').trim() as UniversalFormulaType | '') || getUniversalType(state)
  const family = (String((state.medication.metadata || {}).dosage_form_family || '').trim() as DosageFormFamily | '') || inferDosageFormFamily(state.medication.pharmaceutical_form)
  const administrationUnit = String((state.medication.metadata || {}).administration_unit || '').trim() || inferAdministrationUnit(state.medication.pharmaceutical_form)
  const activeIngredientRows = state.ingredients.filter((ingredient) => normalizeText(String(ingredient.ingredient_role || 'active')) === 'active' && String(ingredient.ingredient_name || '').trim())

  const regimenSemantics = Object.fromEntries(
    state.regimens.map((regimen) => {
      const regimenId = String(regimen.id || crypto.randomUUID())
      const existing = getClinicalRegimenSemantics(state.medication.metadata || null, regimenId)
      const ingredientRules = activeIngredientRows.flatMap((ingredient) => {
        const basis = normalizeClinicalDoseBasis(ingredient.per_unit)
        const doseUnit = String(ingredient.quantity_unit || '').trim()
        const doseMin = typeof ingredient.quantity_value === 'number' ? ingredient.quantity_value : null
        const doseMax = typeof ingredient.concentration_value === 'number' ? ingredient.concentration_value : null
        if (doseMin != null && doseUnit && basis) {
          const administrationLabel = administrationUnit || inferAdministrationUnit(state.medication.pharmaceutical_form)
          const kind =
            basis.endsWith('/kg')
              ? 'per_kg_per_dose'
              : basis.endsWith('/animal')
                ? 'per_animal_per_dose'
                : basis.endsWith('/unidade')
                  ? 'fixed_per_unit'
                  : basis.endsWith('/dose')
                    ? 'fixed_per_dose'
                    : 'fixed_per_dose'
          return [{
            ingredientName: String(ingredient.ingredient_name || '').trim(),
            ingredientRole: (ingredient.ingredient_role || 'active') as CompoundedIngredientRole,
            rawText: buildClinicalIngredientRuleText(ingredient),
            kind,
            doseMin,
            doseMax: doseMax != null ? doseMax : doseMin,
            doseUnit,
            route: String(regimen.route || state.medication.default_route || ''),
            administrationUnit: administrationLabel,
            isControlled: !!ingredient.is_controlled_ingredient,
            notes: String(ingredient.notes || '').trim() || undefined,
          }]
        }
        if (existing?.ingredientRules?.length) {
          return existing.ingredientRules.filter((rule) => normalizeText(rule.ingredientName) === normalizeText(String(ingredient.ingredient_name || '')))
        }
        return []
      })

      return [regimenId, {
        regimenId,
        scenarioTitle: String(existing?.scenarioTitle || regimen.indication || regimen.regimen_name || ''),
        pharmaceuticalForm: state.medication.pharmaceutical_form,
        dosageFormFamily: family,
        formulaType,
        route: String(regimen.route || state.medication.default_route || ''),
        administrationUnitLabel: administrationUnit,
        totalQuantityText: String(state.medication.default_quantity_text || state.medication.default_qsp_text || ''),
        totalQuantityValue: undefined,
        totalQuantityUnit: undefined,
        qspText: String(state.medication.default_qsp_text || ''),
        frequencyHours: typeof regimen.frequency_value_min === 'number' && String(regimen.frequency_unit || '').trim() === 'hours' ? regimen.frequency_value_min : undefined,
        frequencyLabel: String(regimen.frequency_label || ''),
        durationDays: typeof regimen.duration_value === 'number' && String(regimen.duration_unit || '').trim() === 'dias' ? regimen.duration_value : undefined,
        durationText: regimen.duration_mode === 'fixed_days' && regimen.duration_value ? `${regimen.duration_value} ${regimen.duration_unit || 'dias'}` : '',
        ownerInstruction: String(regimen.default_administration_sig || ''),
        pharmacyInstruction: String(state.medication.manipulation_instructions || ''),
        internalNote: String(regimen.notes || ''),
        reductionNote: String(existing?.reductionNote || ''),
        doseSelectionStrategy: (getClinicalDoseSelectionValue(state, regimenId) || 'min') as 'min' | 'mid' | 'max',
        pharmacyStrategy: getClinicalPharmacyStrategyValue(state, regimenId),
        ingredientRules,
      }]
    })
  )

  return {
    ...(state.medication.metadata || {}),
    ...(previousMetadata || {}),
    source_type: String((state.medication.metadata || {}).source_type || (formulaType === 'fixed_unit_formula' ? 'structured' : 'clinical_text')),
    entry_mode: String((state.medication.metadata || {}).entry_mode || (formulaType === 'fixed_unit_formula' ? 'structured' : 'clinical_text')),
    formula_model: formulaType === 'clinical_dose_oriented' ? 'clinical_dose_oriented' : 'fixed_concentration',
    formula_type: formulaType,
    dosage_form_family: family,
    dosage_form: state.medication.pharmaceutical_form,
    administration_unit: administrationUnit,
    parser_version: previousMetadata?.parser_version || 1,
    imported_clinical_text: previousMetadata?.imported_clinical_text,
    parse_warnings: previousMetadata?.parse_warnings || [],
    regimen_semantics: regimenSemantics,
  }
}

function getEditorDraftIssues(state: EditorState): string[] {
  const issues: string[] = []
  const metadata = getMedicationMetadata(state)
  const formulaType = (String(metadata.formula_type || '').trim() as UniversalFormulaType | '') || (state.medication.pharmaceutical_form ? getUniversalType(state) : '')
  const family = (String(metadata.dosage_form_family || '').trim() as DosageFormFamily | '') || (state.medication.pharmaceutical_form ? inferDosageFormFamily(state.medication.pharmaceutical_form) : '')
  const administrationUnit = String(metadata.administration_unit || '').trim() || (state.medication.pharmaceutical_form ? inferAdministrationUnit(state.medication.pharmaceutical_form) : '')
  const activeRegimen = state.regimens[0]
  const clinicalMetadata = getClinicalFormulaMetadata(state.medication.metadata || null)

  if (!formulaType) issues.push('Escolha o tipo da fórmula.')
  if (!family) issues.push('Escolha a família funcional.')
  if (!state.medication.pharmaceutical_form?.trim()) issues.push('Escolha a forma farmacêutica.')
  if (!administrationUnit) issues.push('Defina a unidade real de administração.')
  if (!state.medication.default_quantity_text?.trim() && !state.medication.default_qsp_text?.trim()) {
    issues.push('Informe a quantidade total a manipular ou o q.s.p.')
  }

  if (formulaType === 'fixed_unit_formula') {
    const hasStructuredComposition = state.ingredients.some(isFixedIngredientStructured)
    if (!hasStructuredComposition) issues.push('Preencha a composição estruturada da unidade fixa.')
  }

  if (formulaType === 'clinical_dose_oriented') {
    const regimenId = String(activeRegimen?.id || '')
    const semantics = regimenId ? getClinicalRegimenSemantics(state.medication.metadata || null, regimenId) : null
    if (!normalizeClinicalPharmacyStrategy(String(semantics?.pharmacyStrategy || ''))) issues.push('Escolha a estratégia farmacotécnica do regime.')
    if (!getClinicalRulesForValidation(state)) issues.push('Estruture as regras de dose dos ingredientes para a fórmula clínica.')
  }

  if (formulaType === 'procedural_topical') {
    if (!state.medication.manipulation_instructions?.trim()) issues.push('Descreva a instrução farmacotécnica principal para a farmácia.')
  }

  if (activeRegimen) {
    if (!String(activeRegimen.route || state.medication.default_route || '').trim()) issues.push('Defina a via principal do regime.')
    if (!String(activeRegimen.frequency_label || '').trim() && !Number(activeRegimen.frequency_value_min || 0)) issues.push('Defina a frequência do regime.')
    if (String(activeRegimen.duration_mode || 'fixed_days') === 'fixed_days' && !Number(activeRegimen.duration_value || 0)) issues.push('Defina a duração do regime.')
  }

  if (clinicalMetadata?.parse_warnings?.length) {
    issues.push('Revise os avisos do parser clínico antes de emitir a receita final.')
  }

  return Array.from(new Set(issues))
}

function parseImportedEditor(raw: unknown): EditorState {
  const input = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {}
  const bundleLike = input.medication || input.ingredients || input.regimens
  if (bundleLike) {
    const medication = ((input.medication as Record<string, unknown> | undefined) || {})
    const form = String(medication.pharmaceutical_form || 'Suspensão oral')
    const family = inferDosageFormFamily(form)
    const administrationUnit = inferAdministrationUnit(form, String(((medication.metadata as Record<string, unknown> | undefined)?.administration_unit) || ''))
    return {
      medication: {
        ...createEmptyEditor().medication,
        ...medication,
        metadata: {
          ...(createEmptyEditor().medication.metadata || {}),
          ...(((medication.metadata as Record<string, unknown> | undefined) || {})),
          formula_type: getUniversalFormulaType((medication.metadata as Record<string, unknown> | undefined) || {}),
          dosage_form_family: family,
          dosage_form: form,
          administration_unit: administrationUnit,
        },
      },
      ingredients: Array.isArray(input.ingredients) && input.ingredients.length ? (input.ingredients as EditorIngredient[]) : [createEmptyIngredient()],
      regimens: Array.isArray(input.regimens) && input.regimens.length ? (input.regimens as EditorRegimen[]) : [createEmptyRegimen()],
    }
  }

  const form = String(input.pharmaceutical_form || input.forma_farmaceutica || 'Suspensão oral')
  const family = inferDosageFormFamily(form)
  const administrationUnit = inferAdministrationUnit(form)
  const formulaType = getUniversalFormulaType({
    formula_model: input.formula_model,
    formula_type: input.formula_type,
  })

  return {
    medication: {
      ...createEmptyEditor().medication,
      name: String(input.name || ''),
      description: String(input.description || ''),
      pharmaceutical_form: form,
      default_route: String(input.default_route || input.via || 'VO'),
      species: Array.isArray(input.species) ? (input.species as string[]) : ['Canina'],
      routes: Array.isArray(input.routes) ? (input.routes as string[]) : [String(input.default_route || input.via || 'VO')],
      is_controlled: !!input.is_controlled,
      control_type: !!input.is_controlled ? 'controlado' : 'venda_livre',
      is_active: input.is_active !== false,
      default_quantity_text: String(input.default_quantity_text || input.quantidade || ''),
      default_qsp_text: String(input.default_qsp_text || input.qsp || ''),
      default_flavor: String(input.default_flavor || input.sabor || ''),
      default_vehicle: String(input.default_vehicle || input.veiculo || ''),
      default_excipient: String(input.default_excipient || input.excipiente || ''),
      manipulation_instructions: String(input.manipulation_instructions || input.texto_manipulacao || ''),
      notes: String(input.notes || input.observacoes || ''),
      metadata: {
        continuous_use_default: !!input.continuous_use_default,
        control_document_target: !!input.is_controlled ? 'controlled' : 'standard',
        control_extra_rules: String(input.control_extra_rules || ''),
        complement_text: String(input.complement_text || ''),
        formula_model: formulaType === 'clinical_dose_oriented' ? 'clinical_dose_oriented' : 'fixed_concentration',
        formula_type: formulaType,
        dosage_form_family: family,
        dosage_form: form,
        administration_unit: administrationUnit,
      },
    },
    ingredients: Array.isArray(input.ingredients) && input.ingredients.length ? (input.ingredients as EditorIngredient[]) : [createEmptyIngredient()],
    regimens: Array.isArray(input.regimens) && input.regimens.length ? (input.regimens as EditorRegimen[]) : [createEmptyRegimen()],
  }
}

export default function ManipuladosPage() {
  const { clinicId } = useClinic()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const cleanupRef = useRef(false)
  const [search, setSearch] = useState('')
  const [items, setItems] = useState<CompoundedMedicationListItem[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [editor, setEditor] = useState<EditorState>(createEmptyEditor)
  const [loadingList, setLoadingList] = useState(false)
  const [loadingBundle, setLoadingBundle] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const [activeRegimenId, setActiveRegimenId] = useState('')
  const [loadedBundle, setLoadedBundle] = useState<CompoundedMedicationBundle | null>(null)
  const [isCreatingNew, setIsCreatingNew] = useState(false)
  const [showClinicalImport, setShowClinicalImport] = useState(false)
  const [clinicalImportText, setClinicalImportText] = useState('')

  const refreshList = useCallback(async (preferredId?: string, options?: { silent?: boolean }) => {
    if (!clinicId) return
    const silent = options?.silent === true && items.length > 0
    if (!silent) setLoadingList(true)
    try {
      let rows = await listCompoundedMedications(clinicId, {
        search,
      })
      if (!cleanupRef.current) {
        cleanupRef.current = true
        const testRows = rows.filter(isCodexTestMedication)
        if (testRows.length) {
          await Promise.allSettled(
            testRows.map((entry) => deleteCompoundedMedication(clinicId, entry.id, { hardDelete: true }))
          )
          rows = await listCompoundedMedications(clinicId, {
            search,
          })
        }
      }
      setItems(rows)
      const nextSelectedId = preferredId && rows.some((entry) => entry.id === preferredId)
        ? preferredId
        : isCreatingNew && !selectedId
          ? ''
          : rows.some((entry) => entry.id === selectedId)
            ? selectedId
            : rows[0]?.id || ''
      setSelectedId(nextSelectedId)
    } finally {
      if (!silent) setLoadingList(false)
    }
  }, [clinicId, isCreatingNew, items.length, search, selectedId])

  useEffect(() => {
    void refreshList()
  }, [refreshList])

  useEffect(() => {
    if (!clinicId || !selectedId) {
      setLoadingBundle(false)
      setLoadedBundle(null)
      return
    }
    let cancelled = false
    setLoadingBundle(true)
    getCompoundedMedicationBundle(clinicId, selectedId)
      .then((bundle) => {
        if (cancelled) return
        setLoadedBundle(bundle)
        if (bundle) {
          setIsCreatingNew(false)
          const nextEditor = cloneEditorFromBundle(bundle)
          setEditor(nextEditor)
          setActiveRegimenId(nextEditor.regimens[0]?.id ? String(nextEditor.regimens[0]?.id) : '')
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingBundle(false)
      })
    return () => {
      cancelled = true
    }
  }, [clinicId, selectedId])

  const activeRegimen = useMemo(
    () => editor.regimens.find((entry) => String(entry.id) === activeRegimenId) || editor.regimens[0] || null,
    [activeRegimenId, editor.regimens]
  )

  const activeIngredients = useMemo(
    () => editor.ingredients.filter((item) => normalizeText(String(item.ingredient_role || '')) === 'active' && String(item.ingredient_name || '').trim()),
    [editor.ingredients]
  )
  const medicationMetadata = useMemo(() => getMedicationMetadata(editor), [editor])
  const selectedFormulaType = useMemo(
    () => {
      const explicit = String(medicationMetadata.formula_type || '').trim()
      if (explicit) return explicit as UniversalFormulaType
      return editor.medication.id || editor.medication.pharmaceutical_form ? getUniversalType(editor) : ''
    },
    [editor, medicationMetadata]
  )
  const selectedDosageFamily = useMemo(
    () => {
      const explicit = String(medicationMetadata.dosage_form_family || '').trim()
      if (explicit) return explicit as DosageFormFamily
      return editor.medication.pharmaceutical_form ? inferDosageFormFamily(editor.medication.pharmaceutical_form) : ''
    },
    [editor.medication.pharmaceutical_form, medicationMetadata]
  )
  const selectedAdministrationUnit = useMemo(
    () => String(medicationMetadata.administration_unit || '').trim() || (editor.medication.pharmaceutical_form ? inferAdministrationUnit(editor.medication.pharmaceutical_form) : ''),
    [editor.medication.pharmaceutical_form, medicationMetadata]
  )
  const formulaModel = useMemo(() => getFormulaModel(editor), [editor])
  const universalFormulaType = useMemo(() => getUniversalType(editor), [editor])
  const dosageFamily = useMemo(() => getDosageFamily(editor), [editor])
  const administrationUnit = useMemo(() => getAdministrationUnitLabel(editor), [editor])
  const familyFormOptions = useMemo(() => getFormsForFamily(dosageFamily), [dosageFamily])
  const availableAdministrationUnits = useMemo(
    () => (selectedDosageFamily ? ADMINISTRATION_UNIT_OPTIONS[selectedDosageFamily] || [] : []),
    [selectedDosageFamily]
  )
  const wizardComplete = useMemo(
    () => Boolean(selectedFormulaType && selectedDosageFamily && editor.medication.pharmaceutical_form && selectedAdministrationUnit),
    [editor.medication.pharmaceutical_form, selectedAdministrationUnit, selectedDosageFamily, selectedFormulaType]
  )
  const isFixedUnitFormula = selectedFormulaType === 'fixed_unit_formula'
  const isClinicalDoseFormula = selectedFormulaType === 'clinical_dose_oriented'
  const isProceduralFormula = selectedFormulaType === 'procedural_topical'
  const activeClinicalRegimen = useMemo(
    () => getClinicalRegimenMeta(editor, String(activeRegimen?.id || '')),
    [activeRegimen, editor]
  )
  const activeDoseSelectionStrategy = useMemo(
    () => String(activeClinicalRegimen?.doseSelectionStrategy || 'min'),
    [activeClinicalRegimen]
  )
  const activePharmacyStrategy = useMemo(
    () => normalizeClinicalPharmacyStrategy(String(activeClinicalRegimen?.pharmacyStrategy || '')),
    [activeClinicalRegimen]
  )
  const activeFrequencyMode = useMemo(() => {
    const explicit = String((activeClinicalRegimen as Record<string, unknown> | null)?.frequencyMode || '').trim()
    if (explicit === 'times_per_day' || explicit === 'interval_hours') return explicit
    return String(activeRegimen?.frequency_unit || '').trim() === 'times_per_day' ? 'times_per_day' : 'interval_hours'
  }, [activeClinicalRegimen, activeRegimen])
  const activeFrequencyMax = useMemo(() => {
    const explicit = Number((activeClinicalRegimen as Record<string, unknown> | null)?.frequencyMaxValue ?? NaN)
    if (Number.isFinite(explicit)) return explicit
    return Number(activeRegimen?.frequency_value_max || 0) || 0
  }, [activeClinicalRegimen, activeRegimen])
  const activeDurationMax = useMemo(() => {
    const explicit = Number((activeClinicalRegimen as Record<string, unknown> | null)?.durationMaxValue ?? NaN)
    if (Number.isFinite(explicit)) return explicit
    return Number(activeRegimen?.duration_value || 0) || 0
  }, [activeClinicalRegimen, activeRegimen])
  const importSummary = useMemo(
    () => buildClinicalImportSummary(getClinicalMetadata(editor), !!editor.medication.is_controlled),
    [editor]
  )
  const editorDraftIssues = useMemo(() => getEditorDraftIssues(editor), [editor])

  const handleNew = useCallback(() => {
    setIsCreatingNew(true)
    setSelectedId('')
    setLoadedBundle(null)
    setShowClinicalImport(false)
    setClinicalImportText('')
    const next = createEmptyEditor()
    setEditor(next)
    setActiveRegimenId(String(next.regimens[0].id))
    setStatus('Novo manipulado pronto para cadastro.')
  }, [])

  const updateMedication = useCallback((patch: Partial<EditorState['medication']>) => {
    setEditor((prev) => ({
      ...prev,
      medication: {
        ...prev.medication,
        ...patch,
      },
    }))
  }, [])

  const updateMedicationMetadata = useCallback((patch: Record<string, unknown>) => {
    setEditor((prev) => ({
      ...prev,
      medication: {
        ...prev.medication,
        metadata: {
          ...(prev.medication.metadata || {}),
          ...patch,
        },
      },
    }))
  }, [])

  const patchRegimenSemantics = useCallback((regimenId: string, patch: Record<string, unknown>) => {
    setEditor((prev) => ({
      ...prev,
      medication: {
        ...prev.medication,
        metadata: updateClinicalRegimenMeta(prev.medication.metadata as Record<string, unknown> | null | undefined, regimenId, patch),
      },
    }))
  }, [])

  const applyFamilyAndForm = useCallback((family: DosageFormFamily, form: string, type?: UniversalFormulaType) => {
    const nextAdministrationUnit = inferAdministrationUnit(form)
    const nextType = type || universalFormulaType
    updateMedication({ pharmaceutical_form: form })
    updateMedicationMetadata({
      dosage_form_family: family,
      dosage_form: form,
      administration_unit: nextAdministrationUnit,
      formula_type: nextType,
      formula_model: nextType === 'clinical_dose_oriented' ? 'clinical_dose_oriented' : 'fixed_concentration',
    })
  }, [universalFormulaType, updateMedication, updateMedicationMetadata])

  const updateIngredient = useCallback((ingredientId: string, patch: Partial<EditorIngredient>) => {
    setEditor((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((item) => String(item.id) === ingredientId ? { ...item, ...patch } : item),
    }))
  }, [])

  const updateRegimen = useCallback((regimenId: string, patch: Partial<EditorRegimen>) => {
    setEditor((prev) => ({
      ...prev,
      regimens: prev.regimens.map((item) => String(item.id) === regimenId ? { ...item, ...patch } : item),
    }))
  }, [])

  const handleImportJson = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const parsed = JSON.parse(text)
      const imported = parseImportedEditor(parsed)
      setIsCreatingNew(true)
      setSelectedId('')
      setLoadedBundle(null)
      setEditor(imported)
      setActiveRegimenId(String(imported.regimens[0]?.id || ''))
      setShowClinicalImport(false)
      setStatus(`JSON importado: ${imported.medication.name || 'fórmula sem nome'}.`)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Não foi possível importar o JSON.')
    } finally {
      event.target.value = ''
    }
  }, [])

  const handleImportClinicalText = useCallback(() => {
    if (!clinicalImportText.trim()) {
      setStatus('Cole o texto clínico antes de importar.')
      return
    }
    try {
      const parsed = parseClinicalTextImport(clinicalImportText)
      const imported = {
        medication: {
          ...createEmptyEditor().medication,
          ...parsed.medication,
          metadata: {
            ...(parsed.medication.metadata || {}),
            source_type: 'clinical_text',
            formula_model: 'clinical_dose_oriented',
          },
        },
        ingredients: parsed.ingredients.length ? parsed.ingredients : [createEmptyIngredient()],
        regimens: parsed.regimens.length ? parsed.regimens : [createEmptyRegimen()],
      } satisfies EditorState
      setIsCreatingNew(true)
      setSelectedId('')
      setLoadedBundle(null)
      setEditor(imported)
      setActiveRegimenId(String(imported.regimens[0]?.id || ''))
      setStatus(
        parsed.warnings.length
          ? `Texto clínico importado com revisão pendente: ${parsed.warnings.join(' ')}`
          : `Texto clínico importado: ${imported.medication.name || 'fórmula sem nome'}. Revise os regimes antes de salvar.`
      )
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Não foi possível interpretar o texto clínico.')
    }
  }, [clinicalImportText])

  const handleSave = useCallback(async () => {
    if (!clinicId) {
      setStatus('Nenhuma clínica ativa.')
      return
    }
    if (loadingBundle) {
      setStatus('Aguarde a fórmula terminar de carregar antes de salvar.')
      return
    }
    if (!editor.medication.name.trim()) {
      setStatus('Informe o nome da fórmula antes de salvar.')
      return
    }
    if (!editor.medication.pharmaceutical_form.trim()) {
      setStatus('Informe a forma farmacêutica.')
      return
    }
    const draftIssues = getEditorDraftIssues(editor)
    if (draftIssues.length) {
      setStatus(`Rascunho incompleto: ${draftIssues[0]}`)
      return
    }

    setSaving(true)
    setStatus('')
    try {
      const { data } = await supabase.auth.getUser()
      const userId = data.user?.id || 'unknown-user'
      const fallbackSpecies = Array.isArray(editor.medication.species) && editor.medication.species.length === 1
        ? String(editor.medication.species[0] || '').trim()
        : ''
      const syncedMetadata = syncClinicalMetadataWithEditor(editor)
      const normalizedRegimens = editor.regimens.map((entry) => ({
        ...entry,
        species: String(entry.species || '').trim() || fallbackSpecies,
        route: String(entry.route || '').trim() || String(editor.medication.default_route || '').trim() || 'VO',
      }))
      if (!normalizedRegimens.some((entry) => String(entry.species || '').trim())) {
        setStatus('Defina a espécie de pelo menos um regime antes de salvar.')
        return
      }
      const payload = {
        ...editor.medication,
        metadata: syncedMetadata,
        control_type: editor.medication.is_controlled ? 'controlado' : 'venda_livre',
        routes: Array.from(new Set([editor.medication.default_route, ...(editor.medication.routes || [])].filter(Boolean) as string[])),
      }
      const normalizedIngredients = editor.ingredients
        .map((entry) => {
          if (isFixedUnitFormula) {
            return {
              ...entry,
              free_text: buildFixedIngredientStructuredText(entry, selectedAdministrationUnit),
            }
          }
          if (isClinicalDoseFormula) {
            return {
              ...entry,
              free_text: buildClinicalIngredientRuleText(entry),
            }
          }
          return entry
        })
      const bundle = await saveCompoundedMedicationBundle({
        clinicId,
        userId,
        medication: payload,
        ingredients: normalizedIngredients,
        regimens: normalizedRegimens,
        allowLocalFallback: false,
      })
      setIsCreatingNew(false)
      setLoadedBundle(bundle)
      setEditor(cloneEditorFromBundle(bundle))
      setActiveRegimenId(String(bundle.regimens[0]?.id || ''))
      setItems((prev) => {
        const nextItem: CompoundedMedicationListItem = {
          id: String(bundle.medication.id),
          name: String(bundle.medication.name || ''),
          description: String(bundle.medication.description || ''),
          pharmaceutical_form: String(bundle.medication.pharmaceutical_form || ''),
          default_route: String(bundle.medication.default_route || ''),
          default_quantity_text: String(bundle.medication.default_quantity_text || ''),
          default_qsp_text: String(bundle.medication.default_qsp_text || ''),
          default_flavor: String(bundle.medication.default_flavor || ''),
          default_vehicle: String(bundle.medication.default_vehicle || ''),
          is_controlled: !!bundle.medication.is_controlled,
          is_active: bundle.medication.is_active !== false,
          updated_at: String(bundle.medication.updated_at || new Date().toISOString()),
          metadata: bundle.medication.metadata || null,
        }
        const withoutCurrent = prev.filter((entry) => entry.id !== nextItem.id)
        return [nextItem, ...withoutCurrent]
      })
      setSelectedId(String(bundle.medication.id))
      const persistenceSource = String((bundle.medication.metadata || {}).persistence_source || 'supabase')
      setStatus(
        persistenceSource === 'local_fallback'
          ? 'Falha ao persistir no catálogo remoto. Revise a conexão e tente salvar novamente.'
          : 'Manipulado salvo no catálogo.'
      )
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Falha ao salvar manipulado.')
    } finally {
      setSaving(false)
    }
  }, [clinicId, editor, loadingBundle])

  const handleDelete = useCallback(async () => {
    if (!clinicId || !selectedId) return
    const confirmed = window.confirm('Deseja excluir este manipulado do catálogo? Esta ação remove a fórmula da clínica.')
    if (!confirmed) return
    await deleteCompoundedMedication(clinicId, selectedId, { hardDelete: true })
    setSelectedId('')
    setLoadedBundle(null)
    setItems((prev) => prev.filter((entry) => entry.id !== selectedId))
    const next = createEmptyEditor()
    setEditor(next)
    setActiveRegimenId(String(next.regimens[0].id))
    setIsCreatingNew(true)
    setStatus('Manipulado excluído do catálogo.')
    await refreshList(undefined, { silent: true })
  }, [clinicId, refreshList, selectedId])

  const sidebarCards = useMemo(() => items.map((item) => {
    const active = item.id === selectedId
    const metadata = getClinicalFormulaMetadata(item.metadata || null)
    const itemFamily = metadata?.dosage_form_family || inferDosageFormFamily(item.pharmaceutical_form)
    const itemType = getUniversalFormulaType(item.metadata || null)
    const subtitle = [
      item.pharmaceutical_form,
      item.default_qsp_text || item.default_quantity_text || '',
    ].filter(Boolean).join(' • ')
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => {
          setIsCreatingNew(false)
          setSelectedId(item.id)
        }}
        className={`w-full rounded-[22px] border px-4 py-3.5 text-left transition ${
          active
            ? 'border-[#39ff14]/45 bg-[linear-gradient(180deg,rgba(20,60,24,0.95),rgba(13,38,16,0.95))] shadow-[0_0_22px_rgba(57,255,20,0.10)]'
            : 'border-slate-800/90 bg-[linear-gradient(180deg,rgba(8,11,8,0.92),rgba(7,8,7,0.78))] hover:border-[#39ff14]/25'
        }`}
        data-testid={`manipulado-list-item-${item.id}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="line-clamp-3 text-[12px] font-black uppercase italic leading-5 text-white">{item.name}</p>
            <p className="mt-1 line-clamp-2 text-[11px] text-slate-400">{subtitle || 'Sem resumo farmacotécnico'}</p>
            <p className="mt-1 line-clamp-1 text-[10px] uppercase tracking-[0.16em] text-slate-500">
              {getDosageFamilyLabel(itemFamily)} • {getFormulaTypeLabel(itemType)}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-1">
            <span className="rounded-full border border-[#39ff14]/25 bg-[#39ff14]/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.18em] text-[#93f784]">
              Manipulado
            </span>
            {item.is_controlled ? (
              <span className="rounded-full border border-red-500/25 bg-red-500/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.18em] text-red-300">
                Controlado
              </span>
            ) : null}
          </div>
        </div>
      </button>
    )
  }), [items, selectedId])

  return (
    <ReceituarioChrome
      section="manipulados"
      title="Manipulados"
      subtitle="Catálogo magistral da clínica, integrado com Nova Receita, controle especial e protocolos."
      actions={
        <>
          <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportJson} />
          <RxvButton variant="secondary" onClick={() => fileInputRef.current?.click()}>
            <span className="material-symbols-outlined text-[18px]">file_open</span>
            Importar JSON
          </RxvButton>
          <RxvButton variant="secondary" onClick={() => setShowClinicalImport((prev) => !prev)}>
            <span className="material-symbols-outlined text-[18px]">notes</span>
            Importar texto clínico
          </RxvButton>
          <RxvButton variant="secondary" onClick={handleNew} data-testid="manipulados-new-button">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Novo manipulado
          </RxvButton>
          {selectedId ? (
            <RxvButton variant="danger" onClick={handleDelete}>
              <span className="material-symbols-outlined text-[18px]">delete</span>
              Excluir manipulado
            </RxvButton>
          ) : null}
          <RxvButton variant="primary" onClick={handleSave} loading={saving} disabled={saving || loadingBundle} data-testid="manipulados-save-button">
            <span className="material-symbols-outlined text-[18px]">save</span>
            Salvar catálogo
          </RxvButton>
        </>
      }
    >
      <div className="space-y-5">
        {showClinicalImport ? (
          <RxvCard className="p-5">
            <RxvSectionHeader icon="notes" title="Importar de Texto Clínico" subtitle="Cole o texto semiestruturado, gere a fórmula revisável e só então salve no catálogo" />
            <div className="grid grid-cols-1 gap-4 2xl:grid-cols-[minmax(0,1fr)_300px]">
              <div className="space-y-4">
                <RxvField label="Texto clínico semiestruturado">
                  <RxvTextarea
                    value={clinicalImportText}
                    onChange={(event) => setClinicalImportText(event.target.value)}
                    className="min-h-[260px]"
                    placeholder="Cole aqui blocos como: cenário clínico, ingredientes com mg/kg/dose, q.s.p., modo de uso e observações de controlado."
                  />
                </RxvField>
                <div className="flex flex-wrap gap-3">
                  <RxvButton variant="primary" onClick={handleImportClinicalText}>
                    <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                    Interpretar texto
                  </RxvButton>
                  <RxvButton variant="secondary" onClick={() => setShowClinicalImport(false)}>
                    Fechar importação
                  </RxvButton>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-800/90 bg-black/25 p-4 text-sm text-slate-300">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Como o parser lê este texto</p>
                <div className="mt-3 space-y-2">
                  <p>Cenários viram regimes clínicos separados.</p>
                  <p>Linhas como <span className="font-semibold text-white">15 mg/kg/dose/VO</span> viram regras posológicas, não concentração fixa.</p>
                  <p>Q.S.P., forma farmacêutica e modo de uso entram como base farmacotécnica do regime.</p>
                  <p>Faixas de dose ficam preservadas para seleção explícita depois na receita.</p>
                  <p>Se houver ingrediente ou observação controlada, a fórmula entra no fluxo especial.</p>
                </div>
                {importSummary.length ? (
                  <div className="mt-4 rounded-2xl border border-slate-800/90 bg-[#071007] p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#8ef986]">Prévia estruturada atual</p>
                    <div className="mt-3 space-y-2 text-xs text-slate-300">
                      {importSummary.map((row) => <p key={row}>{row}</p>)}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </RxvCard>
        ) : null}

        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
        <RxvCard className="p-4 xl:sticky xl:top-5 xl:h-[calc(100vh-180px)] xl:overflow-hidden">
          <RxvSectionHeader icon="science" title="Catálogo Magistral" subtitle="Fórmulas ativas da clínica" bgClass="bg-[#39ff14]/12" colorClass="text-[#8ef986]" shadowClass="shadow-[0_0_24px_rgba(57,255,20,0.14)]" />
          <div className="space-y-4">
            <div className="rounded-[24px] border border-slate-800/90 bg-[linear-gradient(135deg,rgba(18,45,18,0.85),rgba(8,10,8,0.92))] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8ef986]">Lista da clínica</p>
              <p className="mt-2 text-sm font-semibold text-white">Busque, revise e organize suas fórmulas magistrais com leitura clínica mais limpa.</p>
              <p className="mt-3 text-xs text-slate-400">{items.length} fórmula(s) disponível(is)</p>
            </div>

            <RxvField label="Buscar fórmula">
              <RxvInput value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nome, descrição, forma, veículo ou sabor" />
            </RxvField>
            {status ? <div className="rounded-2xl border border-slate-800/90 bg-black/30 px-3 py-3 text-xs text-slate-200">{status}</div> : null}

            <div className="space-y-2 overflow-y-auto pr-2 xl:max-h-[calc(100vh-355px)] [scrollbar-color:#39ff14_#071007] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#39ff14]/35 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#071007] [&::-webkit-scrollbar]:w-2.5">
              {loadingList ? (
                <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-8 text-sm text-slate-500">Carregando catálogo...</div>
              ) : sidebarCards.length ? sidebarCards : (
                <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-8 text-sm text-slate-500">Nenhuma fórmula encontrada com os filtros atuais.</div>
              )}
            </div>
          </div>
        </RxvCard>

        <div className="space-y-5">
          <RxvCard className="overflow-hidden p-0">
            <div className="border-b border-slate-800/90 bg-[linear-gradient(120deg,rgba(57,255,20,0.12),rgba(7,11,7,0.88)_45%,rgba(7,11,7,1)_100%)] px-5 py-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#39ff14]/30 bg-[#39ff14]/10 text-[#8ef986] shadow-[0_0_18px_rgba(57,255,20,0.12)]">
                      <span className="material-symbols-outlined text-[22px]">biotech</span>
                    </span>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#8ef986]">Editor clínico</p>
                      <h2 className="text-2xl font-black italic tracking-tight text-white">{editor.medication.name || 'Nova fórmula magistral'}</h2>
                    </div>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm text-slate-300">
                    {buildFormulaSubtitle(editor) || 'Defina identidade, composição, regimes clínicos e o destino documental da fórmula.'}
                  </p>
                </div>

                <div className="grid min-w-[240px] gap-2 text-sm">
                  <div className="rounded-2xl border border-slate-800/90 bg-black/30 px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Documento</p>
                    <p className="mt-1 font-semibold text-white">{editor.medication.is_controlled ? 'Controle especial' : 'Receita padrão'}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800/90 bg-black/30 px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Ativos principais</p>
                    <p className="mt-1 font-semibold text-white">{activeIngredients.slice(0, 3).map((item) => item.ingredient_name).join(' • ') || 'Sem ativos destacados'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <RxvCard className="p-5">
                <RxvSectionHeader icon="conversion_path" title="Etapa 1 • Estrutura da fórmula" subtitle="Defina primeiro o tipo, a família funcional e a unidade real. O resto do editor se adapta a essa decisão." />
                <div className="grid grid-cols-1 gap-5 2xl:grid-cols-3">
                  <div className="rounded-3xl border border-slate-800/90 bg-[linear-gradient(180deg,rgba(10,15,10,0.95),rgba(7,9,7,0.9))] p-5">
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#8ef986]">Passo 1</p>
                    <h3 className="mt-2 text-lg font-black text-white">Tipo da fórmula</h3>
                    <p className="mt-2 text-sm text-slate-400">Escolha como a farmácia vai receber a lógica desta fórmula.</p>
                    <div className="mt-4 grid gap-3">
                      {UNIVERSAL_FORMULA_OPTIONS.map((option) => {
                        const helper =
                          option.value === 'fixed_unit_formula'
                            ? 'Use quando cada cápsula, mL, biscoito ou unidade já tiver composição fixa.'
                            : option.value === 'clinical_dose_oriented'
                              ? 'Use quando a dose depende do peso, da faixa ou da estratégia clínica.'
                              : 'Use para tópicos e procedurais em que o foco é aplicação e preparo, não dose por kg.'
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => updateMedicationMetadata({
                              formula_type: option.value,
                              formula_model: option.value === 'clinical_dose_oriented' ? 'clinical_dose_oriented' : 'fixed_concentration',
                              source_type: option.value === 'fixed_unit_formula' ? 'structured' : 'clinical_text',
                            })}
                            className={`rounded-3xl border px-4 py-4 text-left transition ${selectedFormulaType === option.value ? 'border-[#39ff14]/45 bg-[#143118] text-white shadow-[0_0_18px_rgba(57,255,20,0.10)]' : 'border-slate-800/90 bg-black/25 text-slate-300 hover:border-[#39ff14]/20'}`}
                          >
                            <span className="block text-sm font-black text-white">{option.label}</span>
                            <span className="mt-1 block text-xs leading-5 text-slate-400">{helper}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-800/90 bg-[linear-gradient(180deg,rgba(10,15,10,0.95),rgba(7,9,7,0.9))] p-5">
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#8ef986]">Passo 2</p>
                    <h3 className="mt-2 text-lg font-black text-white">Família funcional</h3>
                    <p className="mt-2 text-sm text-slate-400">Agrupe a forma farmacêutica pela lógica de uso clínico para não repetir decisões no resto da tela.</p>
                    <div className="mt-4 grid gap-3">
                      {DOSAGE_FAMILY_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            const nextForm = getFormsForFamily(option.value)[0] || ''
                            updateMedicationMetadata({ dosage_form_family: option.value })
                            if (nextForm) applyFamilyAndForm(option.value, nextForm, selectedFormulaType || undefined)
                          }}
                          className={`rounded-3xl border px-4 py-4 text-left transition ${selectedDosageFamily === option.value ? 'border-[#39ff14]/45 bg-[#143118] text-white shadow-[0_0_18px_rgba(57,255,20,0.10)]' : 'border-slate-800/90 bg-black/25 text-slate-300 hover:border-[#39ff14]/20'}`}
                        >
                          <span className="block text-sm font-black text-white">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-800/90 bg-[linear-gradient(180deg,rgba(10,15,10,0.95),rgba(7,9,7,0.9))] p-5">
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#8ef986]">Passo 3</p>
                    <h3 className="mt-2 text-lg font-black text-white">Unidade real de administração</h3>
                    <p className="mt-2 text-sm text-slate-400">Defina em que unidade o tutor ou a aplicação clínica vai usar a fórmula.</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {(availableAdministrationUnits.length ? availableAdministrationUnits : ['mL', 'cápsula', 'comprimido', 'biscoito', 'sachê', 'filme', 'gota', 'click', 'pump', 'aplicação', 'jato', 'g', 'unidade']).map((unit) => (
                        <button
                          key={unit}
                          type="button"
                          onClick={() => updateMedicationMetadata({ administration_unit: unit })}
                          className={`rounded-3xl border px-4 py-4 text-left transition ${selectedAdministrationUnit === unit ? 'border-[#39ff14]/45 bg-[#143118] text-white shadow-[0_0_18px_rgba(57,255,20,0.10)]' : 'border-slate-800/90 bg-black/25 text-slate-300 hover:border-[#39ff14]/20'}`}
                        >
                          <span className="block text-sm font-black text-white">{unit}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {!wizardComplete ? (
                  <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                    Complete os 3 passos acima para liberar os blocos clínicos completos do editor.
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl border border-[#39ff14]/25 bg-[#39ff14]/8 px-4 py-3 text-sm text-[#c9ffbe]">
                    Estrutura base definida. Agora o editor mostra só os campos coerentes com essa fórmula.
                  </div>
                )}
              </RxvCard>

              <RxvCard className="p-5">
                <RxvSectionHeader icon="badge" title="Etapa 2 • Identidade" subtitle="Dados centrais da fórmula. Aqui entra o que o veterinário precisa reconhecer rapidamente." />
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border border-slate-800/90 bg-black/25 px-3 py-1.5 text-slate-300">{selectedFormulaType ? getFormulaTypeLabel(selectedFormulaType) : 'Tipo não definido'}</span>
                    <span className="rounded-full border border-slate-800/90 bg-black/25 px-3 py-1.5 text-slate-300">{selectedDosageFamily ? getDosageFamilyLabel(selectedDosageFamily) : 'Família não definida'}</span>
                    <span className="rounded-full border border-slate-800/90 bg-black/25 px-3 py-1.5 text-slate-300">{selectedAdministrationUnit ? `Administração: ${selectedAdministrationUnit}` : 'Unidade não definida'}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div>
                      <RxvField label="Nome da fórmula">
                        <RxvInput value={editor.medication.name} onChange={(event) => updateMedication({ name: event.target.value })} placeholder="Ex: Gabapentina magistral para dor neuropática" />
                      </RxvField>
                      <p className="mt-1 text-xs text-slate-500">Nome clínico pelo qual você quer localizar esta fórmula no catálogo.</p>
                    </div>

                    <div>
                      <RxvField label="Forma farmacêutica">
                        <RxvSelect
                          value={editor.medication.pharmaceutical_form}
                          onChange={(event) => applyFamilyAndForm(inferDosageFormFamily(event.target.value), event.target.value)}
                          options={[{ value: '', label: 'Selecionar forma farmacêutica' }, ...familyFormOptions.map((value) => ({ value, label: value }))]}
                        />
                      </RxvField>
                      <p className="mt-1 text-xs text-slate-500">Escolha a apresentação magistral real: suspensão, cápsula, biscoito, gel transdérmico, spray, etc.</p>
                    </div>

                    <div className="lg:col-span-2">
                      <RxvChipsMultiSelect label="Espécies-alvo" options={SPECIES_OPTIONS} selected={editor.medication.species || []} onToggle={(option) => {
                        const current = editor.medication.species || []
                        const next = current.includes(option) ? current.filter((item) => item !== option) : [...current, option]
                        updateMedication({ species: next })
                      }} />
                      <p className="mt-1 text-xs text-slate-500">Selecione as espécies em que esta fórmula faz sentido no seu catálogo.</p>
                    </div>

                    <div>
                      <RxvField label="Via principal">
                        <RxvSelect value={String(editor.medication.default_route || '')} onChange={(event) => updateMedication({ default_route: event.target.value })} options={ROUTE_OPTIONS} />
                      </RxvField>
                      <p className="mt-1 text-xs text-slate-500">Via padrão da fórmula. Overrides ficam no regime em modo avançado.</p>
                    </div>

                    <div>
                      <RxvField label="Descrição breve">
                        <RxvTextarea value={String(editor.medication.description || '')} onChange={(event) => updateMedication({ description: event.target.value })} placeholder="Quando usar esta fórmula e em que contexto clínico ela costuma entrar." className="min-h-[92px]" />
                      </RxvField>
                      <p className="mt-1 text-xs text-slate-500">Resumo clínico curto para você localizar a fórmula sem abrir tudo.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="rounded-3xl border border-slate-800/90 bg-black/25 p-4">
                      <p className="text-sm font-black text-white">Controlado</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Define se o item segue para receita padrão ou para controle especial.</p>
                      <div className="mt-4">
                        <RxvToggle
                          checked={!!editor.medication.is_controlled}
                          onChange={(value) => {
                            updateMedication({ is_controlled: value, control_type: value ? 'controlado' : 'venda_livre' })
                            updateMedicationMetadata({ control_document_target: value ? 'controlled' : 'standard' })
                          }}
                        />
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-800/90 bg-black/25 p-4">
                      <p className="text-sm font-black text-white">Uso contínuo</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Marque quando a fórmula costuma entrar em manutenção até reavaliação.</p>
                      <div className="mt-4">
                        <RxvToggle
                          checked={boolFromMetadata(getMedicationMetadata(editor).continuous_use_default)}
                          onChange={(value) => updateMedicationMetadata({ continuous_use_default: value })}
                        />
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-800/90 bg-black/25 p-4">
                      <p className="text-sm font-black text-white">Ativa no catálogo</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Desative para retirar da busca sem perder o histórico clínico.</p>
                      <div className="mt-4">
                        <RxvToggle checked={editor.medication.is_active !== false} onChange={(value) => updateMedication({ is_active: value })} />
                      </div>
                    </div>
                  </div>
                </div>
              </RxvCard>

              <RxvCard className="p-5">
                <RxvSectionHeader
                  icon="medication"
                  title="Etapa 3 • Composição"
                  subtitle={
                    isFixedUnitFormula
                      ? 'Monte a tabela como “cada 1 unidade contém”.'
                      : isClinicalDoseFormula
                        ? 'Estruture os ativos pela regra clínica de dose, sem fingir concentração fixa.'
                        : 'Descreva a composição fixa quando houver e separe os auxiliares da preparação.'
                  }
                />
                {!wizardComplete ? (
                  <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-8 text-sm text-slate-500">
                    Escolha tipo, família, forma e unidade de administração para liberar os campos certos da composição.
                  </div>
                ) : (
                <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_280px]">
                  <div className="space-y-4">
                    {editor.ingredients.map((ingredient, index) => (
                      <div key={String(ingredient.id)} className="rounded-3xl border border-slate-800/90 bg-black/25 p-4">
                        {isClinicalDoseFormula ? (
                          <div className="grid grid-cols-1 gap-3 2xl:grid-cols-[minmax(0,1.5fr)_120px_120px_120px_160px_auto]">
                            <RxvField label={`Ativo ${index + 1}`}>
                              <RxvInput value={String(ingredient.ingredient_name || '')} onChange={(event) => updateIngredient(String(ingredient.id), { ingredient_name: event.target.value, ingredient_role: 'active' })} placeholder="Ex: Gabapentina, fluoxetina, codeína" />
                            </RxvField>
                            <RxvField label="Dose mínima">
                              <RxvInput type="number" step="0.01" value={String(ingredient.quantity_value ?? '')} onChange={(event) => updateIngredient(String(ingredient.id), { quantity_value: event.target.value ? Number(event.target.value) : null })} placeholder="0,1" />
                            </RxvField>
                            <RxvField label="Dose máxima">
                              <RxvInput type="number" step="0.01" value={String(ingredient.concentration_value ?? '')} onChange={(event) => updateIngredient(String(ingredient.id), { concentration_value: event.target.value ? Number(event.target.value) : null })} placeholder="Opcional" />
                            </RxvField>
                            <RxvField label="Unidade">
                              <RxvInput value={String(ingredient.quantity_unit || '')} onChange={(event) => updateIngredient(String(ingredient.id), { quantity_unit: event.target.value })} placeholder="mg" />
                            </RxvField>
                            <RxvField label="Base da dose">
                              <RxvSelect value={String(ingredient.per_unit || '')} onChange={(event) => updateIngredient(String(ingredient.id), { per_unit: event.target.value })} options={[{ value: '', label: 'Selecionar base' }, ...CLINICAL_DOSE_BASIS_OPTIONS]} />
                            </RxvField>
                            <div className="flex items-end">
                              <button type="button" className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-slate-700 bg-black/30 text-slate-400 transition hover:border-red-500/40 hover:text-red-300" onClick={() => setEditor((prev) => ({ ...prev, ingredients: prev.ingredients.length === 1 ? [createEmptyIngredient()] : prev.ingredients.filter((item) => String(item.id) !== String(ingredient.id)) }))} title="Remover ingrediente">
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                              </button>
                            </div>
                            <div className="2xl:col-span-6">
                              <RxvField label="Observação opcional">
                                <RxvInput value={String(ingredient.notes || '')} onChange={(event) => updateIngredient(String(ingredient.id), { notes: event.target.value })} placeholder="Ex: evitar sacarose, regra por faixa de peso, observação clínica ou nota do fornecedor." />
                              </RxvField>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-3 2xl:grid-cols-[minmax(0,1.5fr)_180px_120px_120px_auto]">
                            <RxvField label={`Ingrediente ${index + 1}`}>
                              <RxvInput value={String(ingredient.ingredient_name || '')} onChange={(event) => updateIngredient(String(ingredient.id), { ingredient_name: event.target.value })} placeholder="Ex: Gabapentina, veículo base, aroma, excipiente" />
                            </RxvField>
                            <RxvField label="Tipo">
                              <RxvSelect value={String(ingredient.ingredient_role || 'active')} onChange={(event) => updateIngredient(String(ingredient.id), { ingredient_role: event.target.value as CompoundedIngredientRole })} options={INGREDIENT_ROLE_OPTIONS} />
                            </RxvField>
                            <RxvField label="Quantidade">
                              <RxvInput type="number" step="0.01" value={String(ingredient.quantity_value ?? '')} onChange={(event) => updateIngredient(String(ingredient.id), { quantity_value: event.target.value ? Number(event.target.value) : null })} placeholder="50" />
                            </RxvField>
                            <RxvField label="Unidade">
                              <RxvInput value={String(ingredient.quantity_unit || '')} onChange={(event) => updateIngredient(String(ingredient.id), { quantity_unit: event.target.value })} placeholder={isFixedUnitFormula ? 'mg' : '%, mg/mL, g'} />
                            </RxvField>
                            <div className="flex items-end">
                              <button type="button" className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-slate-700 bg-black/30 text-slate-400 transition hover:border-red-500/40 hover:text-red-300" onClick={() => setEditor((prev) => ({ ...prev, ingredients: prev.ingredients.length === 1 ? [createEmptyIngredient()] : prev.ingredients.filter((item) => String(item.id) !== String(ingredient.id)) }))} title="Remover ingrediente">
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                              </button>
                            </div>
                            <div className="2xl:col-span-5">
                              <RxvField label="Observação opcional">
                                <RxvInput value={String(ingredient.notes || '')} onChange={(event) => updateIngredient(String(ingredient.id), { notes: event.target.value })} placeholder={isFixedUnitFormula ? 'Ex: cada 1 cápsula contém esta quantidade.' : 'Ex: base dermatológica q.s.p., uso externo, protegido de luz.'} />
                              </RxvField>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <RxvButton variant="secondary" onClick={() => setEditor((prev) => ({ ...prev, ingredients: [...prev.ingredients, createEmptyIngredient()] }))}>
                      <span className="material-symbols-outlined text-[18px]">add</span>
                      Adicionar ingrediente
                    </RxvButton>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-3xl border border-slate-800/90 bg-black/25 p-4">
                      <p className="text-sm font-black text-white">Parâmetros auxiliares da preparação</p>
                      <div className="mt-4 space-y-4">
                        <div>
                          <RxvField label="Q.S.P.">
                            <RxvInput value={String(editor.medication.default_qsp_text || '')} onChange={(event) => updateMedication({ default_qsp_text: event.target.value })} placeholder="Ex: q.s.p. 30 mL" />
                          </RxvField>
                          <p className="mt-1 text-xs text-slate-500">Completa a fórmula até o volume, massa ou quantidade final desejada.</p>
                        </div>
                        <div>
                          <RxvField label="Quantidade total a manipular">
                            <RxvInput value={String(editor.medication.default_quantity_text || '')} onChange={(event) => updateMedication({ default_quantity_text: event.target.value })} placeholder="Ex: 30 cápsulas, 60 mL, 28 doses" />
                          </RxvField>
                          <p className="mt-1 text-xs text-slate-500">Total que a farmácia deverá produzir ou dispensar.</p>
                        </div>
                        <div>
                          <RxvField label="Veículo">
                            <RxvInput value={String(editor.medication.default_vehicle || '')} onChange={(event) => updateMedication({ default_vehicle: event.target.value })} placeholder="Ex: suspensão oral palatável, Lipoderm®, base cremosa" />
                          </RxvField>
                          <p className="mt-1 text-xs text-slate-500">Base líquida ou semissólida usada para carregar a fórmula.</p>
                        </div>
                        <div>
                          <RxvField label="Sabor">
                            <RxvInput value={String(editor.medication.default_flavor || '')} onChange={(event) => updateMedication({ default_flavor: event.target.value })} placeholder="Ex: carne, frango, bacon" />
                          </RxvField>
                          <p className="mt-1 text-xs text-slate-500">Opcional. Ajuda a padronizar fórmulas orais palatáveis.</p>
                        </div>
                        <div>
                          <RxvField label="Excipiente base">
                            <RxvInput value={String(editor.medication.default_excipient || '')} onChange={(event) => updateMedication({ default_excipient: event.target.value })} placeholder="Opcional" />
                          </RxvField>
                          <p className="mt-1 text-xs text-slate-500">Componente tecnológico de suporte; opcional em muitas fórmulas.</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-800/90 bg-[#081208] p-4">
                      <p className="text-sm font-black text-white">Feedback da composição</p>
                      <div className="mt-3 space-y-2 text-sm text-slate-300">
                        <p>{buildFormulaSubtitle(editor) || 'Defina q.s.p., quantidade ou veículo para gerar um resumo farmacotécnico.'}</p>
                        <p>{editor.ingredients.filter(isMeaningfulIngredient).slice(0, 3).map((item) => isClinicalDoseFormula ? buildClinicalIngredientRuleText(item) : buildFixedIngredientStructuredText(item, selectedAdministrationUnit)).filter(Boolean).join(' • ') || 'Nenhum ingrediente estruturado ainda.'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </RxvCard>

              <RxvCard className="p-5">
                <RxvSectionHeader icon="clinical_notes" title="Etapa 4 • Regimes de uso" subtitle="Cenário clínico, faixa, frequência, duração e estratégia farmacotécnica do uso." />
                {!wizardComplete ? (
                  <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-8 text-sm text-slate-500">
                    Defina antes o tipo da fórmula, a família funcional e a unidade real de administração.
                  </div>
                ) : (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-[220px_minmax(0,1fr)]">
                  <div className="space-y-2">
                    {editor.regimens.map((regimen, index) => {
                      const active = String(regimen.id) === String(activeRegimenId || editor.regimens[0]?.id || '')
                      return (
                        <button key={String(regimen.id)} type="button" onClick={() => setActiveRegimenId(String(regimen.id))} className={`w-full rounded-2xl border px-4 py-3 text-left transition ${active ? 'border-[#39ff14]/40 bg-[#133018]' : 'border-slate-800/90 bg-black/25 hover:border-[#39ff14]/20'}`}>
                          <p className="text-sm font-black uppercase italic text-white">{regimen.regimen_name || `Regime ${index + 1}`}</p>
                          <p className="mt-1 text-[11px] text-slate-400">{regimen.dosing_mode === 'calculated' ? 'Calculado pelo peso do paciente' : 'Dose fixa do regime'}</p>
                        </button>
                      )
                    })}
                    <RxvButton variant="secondary" onClick={() => {
                      const next = createEmptyRegimen()
                      setEditor((prev) => ({ ...prev, regimens: [...prev.regimens, next] }))
                      setActiveRegimenId(String(next.id))
                    }}>
                      <span className="material-symbols-outlined text-[18px]">add</span>
                      Novo regime
                    </RxvButton>
                  </div>

                  {!activeRegimen ? (
                    <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-10 text-sm text-slate-500">Selecione um regime para editar.</div>
                  ) : (
                    <div className="space-y-4 rounded-3xl border border-slate-800/90 bg-black/20 p-4">
                      <div className="space-y-4">
                      <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div>
                              <RxvField label="Nome do regime">
                                <RxvInput value={String(activeRegimen.regimen_name || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { regimen_name: event.target.value })} placeholder="Ex: Agudo controlado, manutenção felina, dermatite estágio inicial" />
                              </RxvField>
                              <p className="mt-1 text-xs text-slate-500">Nome curto para identificar o cenário de uso deste regime.</p>
                            </div>
                            <div>
                              <RxvField label="Espécie">
                                <RxvSelect value={String(activeRegimen.species || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { species: event.target.value })} options={REGIMEN_SPECIES_OPTIONS} />
                              </RxvField>
                              <p className="mt-1 text-xs text-slate-500">Permite diferenciar regimes caninos e felinos na mesma fórmula.</p>
                            </div>
                            <div className="lg:col-span-2">
                              <RxvField label={isProceduralFormula ? 'Cenário / local clínico' : 'Indicação clínica'}>
                                <RxvInput value={String(activeRegimen.indication || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { indication: event.target.value })} placeholder={isProceduralFormula ? 'Ex: conduto externo, pinna, pele íntegra, uso hospitalar.' : 'Ex: dor neuropática, colapso traqueal, dermatite atópica.'} />
                              </RxvField>
                              <p className="mt-1 text-xs text-slate-500">Descreva em uma linha quando este regime deve ser usado.</p>
                            </div>
                          </div>

                      {isClinicalDoseFormula ? (
                        <div className="space-y-4 rounded-3xl border border-slate-800/90 bg-black/25 p-4">
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div>
                              <RxvField label="Estratégia da dose">
                                <RxvSelect value={activeDoseSelectionStrategy} onChange={(event) => patchRegimenSemantics(String(activeRegimen.id), { doseSelectionStrategy: event.target.value })} options={DOSE_SELECTION_OPTIONS.filter((option) => option.value !== 'manual')} />
                              </RxvField>
                              <p className="mt-1 text-xs text-slate-500">Define como o app escolhe a faixa quando um ativo traz dose mínima e máxima.</p>
                            </div>
                            <div>
                              <RxvField label="Estratégia farmacotécnica">
                                <RxvSelect value={activePharmacyStrategy || 'qsp_x_doses'} onChange={(event) => patchRegimenSemantics(String(activeRegimen.id), { pharmacyStrategy: event.target.value as ClinicalPharmacyStrategy })} options={PHARMACY_STRATEGY_OPTIONS} />
                              </RxvField>
                              <p className="mt-1 text-xs text-slate-500">Como a dose clínica será transformada em unidade manipulada para este regime.</p>
                            </div>
                            <div>
                              <RxvField label="Quantidade final para manipular">
                                <RxvInput value={String(activeRegimen.default_prepared_quantity_text || activeClinicalRegimen?.totalQuantityText || editor.medication.default_quantity_text || '')} onChange={(event) => {
                                  updateRegimen(String(activeRegimen.id), { default_prepared_quantity_text: event.target.value })
                                  patchRegimenSemantics(String(activeRegimen.id), { totalQuantityText: event.target.value })
                                }} placeholder="Ex: 30 mL, 28 doses, 30 biscoitos" />
                              </RxvField>
                              <p className="mt-1 text-xs text-slate-500">Total que a farmácia deverá produzir para este cenário clínico.</p>
                            </div>
                            <div className="rounded-2xl border border-slate-800/90 bg-[#081208] px-4 py-3 text-sm text-slate-300">
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Leitura do regime</p>
                              <p className="mt-2 font-semibold text-white">{getClinicalScenarioTitle(editor, activeRegimen) || 'Sem título clínico'}</p>
                              <p className="mt-1 text-slate-400">{getClinicalReductionNote(editor, activeRegimen) || 'As faixas seguem preservadas para revisão do veterinário na receita.'}</p>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-slate-800/90 bg-[#081208] p-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Regras de dose dos ingredientes</p>
                            <div className="mt-3 space-y-2">
                              {(activeClinicalRegimen?.ingredientRules || []).length ? activeClinicalRegimen.ingredientRules.map((rule) => (
                                <div key={`${activeRegimen.id}-${rule.ingredientName}-${rule.rawText}`} className="rounded-2xl border border-slate-800/90 bg-black/25 px-3 py-3 text-sm text-slate-200">
                                  <p className="font-semibold text-white">{rule.ingredientName}</p>
                                  <p className="mt-1 text-slate-300">{buildClinicalRuleSummary(rule)}</p>
                                  {rule.weightTiers?.length ? <p className="mt-1 text-xs text-slate-400">{rule.weightTiers.map((tier) => tier.label).join(' • ')}</p> : null}
                                </div>
                              )) : (
                                <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-6 text-sm text-slate-500">Estruture os ingredientes na etapa de composição ou use “Importar texto clínico” para gerar as regras automaticamente.</div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4 rounded-3xl border border-slate-800/90 bg-black/25 p-4">
                          {!isProceduralFormula ? (
                            <div className="rounded-2xl border border-slate-800/90 bg-black/25 px-4 py-4">
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Estratégia da dose</p>
                              <div className="mt-3 grid gap-2">
                                <button type="button" onClick={() => updateRegimen(String(activeRegimen.id), { dosing_mode: 'fixed_per_patient' })} className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${activeRegimen.dosing_mode === 'fixed_per_patient' ? 'border-[#39ff14]/40 bg-[#133018] text-white' : 'border-slate-800/90 bg-black/25 text-slate-300'}`}>
                                  <span className="block font-black uppercase tracking-[0.14em]">Dose fixa do regime</span>
                                  <span className="mt-1 block text-xs text-slate-400">A receita entra pronta com dose final por administração.</span>
                                </button>
                                <button type="button" onClick={() => updateRegimen(String(activeRegimen.id), { dosing_mode: 'calculated' })} className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${activeRegimen.dosing_mode === 'calculated' ? 'border-[#39ff14]/40 bg-[#133018] text-white' : 'border-slate-800/90 bg-black/25 text-slate-300'}`}>
                                  <span className="block font-black uppercase tracking-[0.14em]">Calculado pelo peso</span>
                                  <span className="mt-1 block text-xs text-slate-400">O app converte a dose final a partir do peso e da composição fixa.</span>
                                </button>
                              </div>
                            </div>
                          ) : null}

                          {isProceduralFormula ? (
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                              <div>
                                <RxvField label="Local de uso / aplicação">
                                  <RxvInput value={String(activeRegimen.indication || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { indication: event.target.value })} placeholder="Ex: pinna, conduto externo, pele íntegra, mucosa oral." />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Informe o alvo anatômico ou a área clínica de uso.</p>
                              </div>
                              <div>
                                <RxvField label="Unidade de aplicação">
                                  <RxvSelect value={String(activeRegimen.fixed_administration_unit || selectedAdministrationUnit || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { fixed_administration_unit: event.target.value })} options={[{ value: '', label: 'Selecionar unidade' }, ...availableAdministrationUnits.map((value) => ({ value, label: value }))]} />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Use a unidade real de uso: aplicação, jato, mL, lenço ou gota.</p>
                              </div>
                              <div>
                                <RxvField label="Quantidade por aplicação, se medida">
                                  <RxvInput type="number" step="0.01" value={String(activeRegimen.fixed_administration_value ?? '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { fixed_administration_value: event.target.value ? Number(event.target.value) : null })} placeholder="Ex: 0,2" />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Preencha apenas quando a aplicação tiver medida fixa por uso.</p>
                              </div>
                            </div>
                          ) : activeRegimen.dosing_mode === 'calculated' ? (
                            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
                              <div>
                                <RxvField label="Dose mínima">
                                  <RxvInput type="number" step="0.01" value={String(activeRegimen.dose_min ?? '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { dose_min: event.target.value ? Number(event.target.value) : null })} placeholder="0,5" />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Base clínica mínima para o cálculo pelo peso.</p>
                              </div>
                              <div>
                                <RxvField label="Dose máxima">
                                  <RxvInput type="number" step="0.01" value={String(activeRegimen.dose_max ?? '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { dose_max: event.target.value ? Number(event.target.value) : null })} placeholder="Opcional" />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Opcional. Use quando o regime tiver faixa de dose.</p>
                              </div>
                              <div>
                                <RxvField label="Unidade da dose">
                                  <RxvInput value={String(activeRegimen.dose_unit || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { dose_unit: event.target.value })} placeholder="mg" />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Unidade clínica usada no cálculo, como mg, mcg ou UI.</p>
                              </div>
                              <div>
                                <RxvField label="Base da dose">
                                  <RxvInput value={String(activeRegimen.per_weight_unit || 'kg')} onChange={(event) => updateRegimen(String(activeRegimen.id), { per_weight_unit: event.target.value || 'kg' })} placeholder="kg" />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Normalmente kg. Ajuste apenas em casos específicos.</p>
                              </div>
                              <div>
                                <RxvField label="Concentração final da fórmula">
                                  <RxvInput type="number" step="0.01" value={String(activeRegimen.concentration_value ?? '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { concentration_value: event.target.value ? Number(event.target.value) : null })} placeholder="100" />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Concentração usada para converter a dose final em volume ou unidade administrada.</p>
                              </div>
                              <div>
                                <RxvField label="Unidade da concentração">
                                  <RxvInput value={String(activeRegimen.concentration_unit || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { concentration_unit: event.target.value })} placeholder="mg" />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Ex.: mg, mcg ou UI.</p>
                              </div>
                              <div>
                                <RxvField label="Cada">
                                  <RxvInput type="number" step="0.01" value={String(activeRegimen.concentration_per_value ?? '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { concentration_per_value: event.target.value ? Number(event.target.value) : null })} placeholder="1" />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Quantidade da unidade manipulada usada como referência da conversão.</p>
                              </div>
                              <div>
                                <RxvField label="Unidade manipulada">
                                  <RxvSelect value={String(activeRegimen.concentration_per_unit || selectedAdministrationUnit || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { concentration_per_unit: event.target.value })} options={[{ value: '', label: 'Selecionar unidade' }, ...availableAdministrationUnits.map((value) => ({ value, label: value }))]} />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Unidade real que o tutor vai administrar, sem repetir decisão fora do contexto do cálculo.</p>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                              <div>
                                <RxvField label="Dose final por administração">
                                  <RxvInput type="number" step="0.01" value={String(activeRegimen.fixed_administration_value ?? '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { fixed_administration_value: event.target.value ? Number(event.target.value) : null })} placeholder="1" />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Quantidade que entra pronta para o tutor ou para a aplicação clínica.</p>
                              </div>
                              <div>
                                <RxvField label="Unidade da dose">
                                  <RxvSelect value={String(activeRegimen.fixed_administration_unit || selectedAdministrationUnit || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { fixed_administration_unit: event.target.value })} options={[{ value: '', label: 'Selecionar unidade' }, ...availableAdministrationUnits.map((value) => ({ value, label: value }))]} />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Use a unidade real da administração: mL, cápsula, biscoito, gota ou click.</p>
                              </div>
                              <div>
                                <RxvField label="Quantidade final para manipular">
                                  <RxvInput value={String(activeRegimen.default_prepared_quantity_text || editor.medication.default_quantity_text || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { default_prepared_quantity_text: event.target.value })} placeholder="Ex: 30 cápsulas, 60 mL, 28 clicks" />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Total sugerido para preparo e dispensação deste regime.</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                          <div className="rounded-3xl border border-slate-800/90 bg-black/25 p-4">
                            <p className="text-sm font-black text-white">Frequência e duração</p>
                            <p className="mt-1 text-xs leading-5 text-slate-500">O regime clínico fica concentrado aqui: faixa de frequência, faixa de duração e comportamento até reavaliação.</p>
                            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
                              <div>
                                <RxvField label="Modo da frequência">
                                  <RxvSelect value={activeFrequencyMode} onChange={(event) => {
                                    const nextMode = event.target.value
                                    const nextLabel = buildFrequencySummary(nextMode, Number(activeRegimen.frequency_value_min || 0) || null, activeFrequencyMax || null)
                                    updateRegimen(String(activeRegimen.id), { frequency_unit: nextMode === 'times_per_day' ? 'times_per_day' : 'hours', frequency_label: nextLabel })
                                    patchRegimenSemantics(String(activeRegimen.id), { frequencyMode: nextMode })
                                  }} options={FREQUENCY_MODE_OPTIONS} />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Escolha entre frequência em vezes ao dia ou intervalo em horas.</p>
                              </div>
                              <div>
                                <RxvField label={activeFrequencyMode === 'times_per_day' ? 'Frequência mínima' : 'Intervalo mínimo'}>
                                  <RxvInput type="number" min="1" step="1" value={String(activeRegimen.frequency_value_min ?? '')} onChange={(event) => {
                                    const nextValue = event.target.value ? Number(event.target.value) : null
                                    const nextLabel = buildFrequencySummary(activeFrequencyMode, nextValue, activeFrequencyMax || null)
                                    updateRegimen(String(activeRegimen.id), { frequency_value_min: nextValue, frequency_unit: activeFrequencyMode === 'times_per_day' ? 'times_per_day' : 'hours', frequency_label: nextLabel })
                                  }} placeholder={activeFrequencyMode === 'times_per_day' ? '2' : '12'} />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">{activeFrequencyMode === 'times_per_day' ? 'Ex.: 1, 2 ou 3 vezes ao dia.' : 'Ex.: a cada 8, 12 ou 24 horas.'}</p>
                              </div>
                              <div>
                                <RxvField label="Frequência máxima">
                                  <RxvInput type="number" min="0" step="1" value={String(activeFrequencyMax || '')} onChange={(event) => {
                                    const nextValue = event.target.value ? Number(event.target.value) : null
                                    const nextLabel = buildFrequencySummary(activeFrequencyMode, Number(activeRegimen.frequency_value_min || 0) || null, nextValue)
                                    updateRegimen(String(activeRegimen.id), { frequency_value_max: nextValue, frequency_unit: activeFrequencyMode === 'times_per_day' ? 'times_per_day' : 'hours', frequency_label: nextLabel })
                                    patchRegimenSemantics(String(activeRegimen.id), { frequencyMaxValue: nextValue })
                                  }} placeholder="Opcional" />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Use quando o regime tiver faixa, como BID–TID ou q8h–q12h.</p>
                              </div>
                              <div className="rounded-2xl border border-slate-800/90 bg-[#081208] px-4 py-3 text-sm text-slate-300">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Leitura da frequência</p>
                                <p className="mt-2 font-semibold text-white">{buildFrequencySummary(activeFrequencyMode, Number(activeRegimen.frequency_value_min || 0) || null, activeFrequencyMax || null) || 'Frequência ainda não definida'}</p>
                              </div>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-4">
                              <div>
                                <RxvField label="Modo da duração">
                                  <RxvSelect value={String(activeRegimen.duration_mode || 'fixed_days')} onChange={(event) => updateRegimen(String(activeRegimen.id), { duration_mode: event.target.value })} options={DURATION_MODE_OPTIONS} />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Defina se o regime tem tempo fechado ou se segue até reavaliação.</p>
                              </div>
                              {String(activeRegimen.duration_mode || 'fixed_days') === 'fixed_days' ? (
                                <>
                                  <div>
                                    <RxvField label="Duração mínima">
                                      <RxvInput type="number" min="1" step="1" value={String(activeRegimen.duration_value ?? '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { duration_value: event.target.value ? Number(event.target.value) : null })} placeholder="14" />
                                    </RxvField>
                                    <p className="mt-1 text-xs text-slate-500">Tempo mínimo planejado para este cenário clínico.</p>
                                  </div>
                                  <div>
                                    <RxvField label="Duração máxima">
                                      <RxvInput type="number" min="0" step="1" value={String(activeDurationMax || '')} onChange={(event) => patchRegimenSemantics(String(activeRegimen.id), { durationMaxValue: event.target.value ? Number(event.target.value) : null })} placeholder="Opcional" />
                                    </RxvField>
                                    <p className="mt-1 text-xs text-slate-500">Opcional. Use quando o regime tiver faixa, como 7–14 dias.</p>
                                  </div>
                                  <div>
                                    <RxvField label="Unidade da duração">
                                      <RxvSelect value={String(activeRegimen.duration_unit || 'dias')} onChange={(event) => updateRegimen(String(activeRegimen.id), { duration_unit: event.target.value })} options={DURATION_UNIT_OPTIONS} />
                                    </RxvField>
                                    <p className="mt-1 text-xs text-slate-500">Padronize em dias ou semanas conforme o uso clínico da fórmula.</p>
                                  </div>
                                </>
                              ) : (
                                <div className="lg:col-span-3 rounded-2xl border border-slate-800/90 bg-[#081208] px-4 py-3 text-sm text-slate-300">O item entra como uso contínuo até reavaliação clínica.</div>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div>
                              <RxvField label="Orientação ao tutor">
                                <RxvTextarea value={String(activeRegimen.default_administration_sig || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { default_administration_sig: event.target.value })} className="min-h-[92px]" placeholder="Ex: agitar antes de usar, administrar com alimento, usar luvas, alternar pinna." />
                              </RxvField>
                              <p className="mt-1 text-xs text-slate-500">Texto clínico que orienta o tutor após a conversão final da dose na receita.</p>
                            </div>
                            <div>
                              <RxvField label="Nota clínica interna (não imprime)">
                                <RxvTextarea value={String(activeRegimen.notes || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { notes: event.target.value })} className="min-h-[92px]" placeholder="Racional clínico, referências, alertas internos e observações do prescritor." />
                              </RxvField>
                              <p className="mt-1 text-xs text-slate-500">Fica disponível só na UI clínica; não deve ir para a receita impressa.</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="rounded-3xl border border-slate-800/90 bg-[#081208] p-4">
                            <p className="text-sm font-black text-white">Resumo clínico do regime</p>
                            <div className="mt-3 space-y-2 text-sm text-slate-300">
                              <p>{activeRegimen.regimen_name || 'Nome do regime ainda não definido'}</p>
                              <p>{buildFrequencySummary(activeFrequencyMode, Number(activeRegimen.frequency_value_min || 0) || null, activeFrequencyMax || null) || 'Frequência ainda não definida'}</p>
                              <p>{buildDurationSummary(String(activeRegimen.duration_mode || 'fixed_days'), Number(activeRegimen.duration_value || 0) || null, activeDurationMax || null, String(activeRegimen.duration_unit || 'dias')) || 'Duração ainda não definida'}</p>
                              <p>{isClinicalDoseFormula ? `Faixa clínica: ${activeDoseSelectionStrategy === 'mid' ? 'ponto médio da faixa' : activeDoseSelectionStrategy === 'max' ? 'dose máxima' : 'dose mínima'}` : isProceduralFormula ? 'Aplicação livre / procedural' : activeRegimen.dosing_mode === 'calculated' ? 'Regime calculado pelo peso' : 'Regime em dose fixa'}</p>
                            </div>
                          </div>

                          <details className="rounded-3xl border border-slate-800/90 bg-black/25 p-4">
                            <summary className="cursor-pointer text-xs font-black uppercase tracking-[0.24em] text-slate-400">Avançado do regime</summary>
                            <div className="mt-4 space-y-4">
                              <div>
                                <RxvField label="Override de via, se necessário">
                                  <RxvSelect value={String(activeRegimen.route || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { route: event.target.value })} options={ROUTE_OPTIONS} />
                                </RxvField>
                                <p className="mt-1 text-xs text-slate-500">Só use quando este regime precisar de uma via diferente da via principal da fórmula.</p>
                              </div>
                              <div className="rounded-2xl border border-slate-800/90 bg-black/25 px-4 py-3">
                                <p className="text-sm font-black text-white">Permitir edição na receita</p>
                                <p className="mt-1 text-xs text-slate-500">Mantém a posologia revisável quando o item entrar na Nova Receita.</p>
                                <div className="mt-3">
                                  <RxvToggle checked={activeRegimen.allow_edit !== false} onChange={(value) => updateRegimen(String(activeRegimen.id), { allow_edit: value })} />
                                </div>
                              </div>
                              <div className="rounded-2xl border border-slate-800/90 bg-black/25 px-4 py-3">
                                <p className="text-sm font-black text-white">Herdar início padrão</p>
                                <p className="mt-1 text-xs text-slate-500">Usa o início padrão da receita para posicionar este item no cronograma terapêutico.</p>
                                <div className="mt-3">
                                  <RxvToggle checked={activeRegimen.inherit_default_start !== false} onChange={(value) => updateRegimen(String(activeRegimen.id), { inherit_default_start: value })} />
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <RxvButton variant="danger" onClick={() => {
                                  setEditor((prev) => {
                                    const nextRegimens = prev.regimens.length === 1 ? [createEmptyRegimen()] : prev.regimens.filter((item) => String(item.id) !== String(activeRegimen.id))
                                    return { ...prev, regimens: nextRegimens }
                                  })
                                  setActiveRegimenId((prev) => prev === String(activeRegimen.id) ? '' : prev)
                                }}>
                                  <span className="material-symbols-outlined text-[18px]">delete</span>
                                  Remover regime
                                </RxvButton>
                              </div>
                            </div>
                          </details>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                )}
              </RxvCard>

              <RxvCard className="p-5">
                <RxvSectionHeader icon="description" title="Etapa 5 • Saída da receita" subtitle="Defina o destino documental e revise como a fórmula vai sair para farmácia e tutor." />
                {editorDraftIssues.length ? (
                  <div className="mb-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                    <p className="font-semibold">Rascunho incompleto — faltam parâmetros farmacotécnicos para emissão da receita final.</p>
                    <p className="mt-1 text-xs">{editorDraftIssues[0]}</p>
                  </div>
                ) : (
                  <div className="mb-4 rounded-2xl border border-[#39ff14]/25 bg-[#39ff14]/8 px-4 py-3 text-sm text-[#c9ffbe]">
                    Receita final liberada para esta fórmula: estrutura farmacotécnica mínima preenchida.
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800/90 bg-black/25 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Fluxo do documento</p>
                    <div className="mt-3 grid gap-2">
                      <button type="button" onClick={() => {
                        updateMedication({ is_controlled: false, control_type: 'venda_livre' })
                        updateMedicationMetadata({ control_document_target: 'standard' })
                      }} className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${!editor.medication.is_controlled ? 'border-[#39ff14]/40 bg-[#133018] text-white' : 'border-slate-800/90 bg-black/25 text-slate-300'}`}>Receita padrão</button>
                      <button type="button" onClick={() => {
                        updateMedication({ is_controlled: true, control_type: 'controlado' })
                        updateMedicationMetadata({ control_document_target: 'controlled' })
                      }} className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${editor.medication.is_controlled ? 'border-red-500/35 bg-red-500/10 text-white' : 'border-slate-800/90 bg-black/25 text-slate-300'}`}>Controle especial</button>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">Quando marcado como controlado, o item entra no documento especial e exige os dados extras do tutor/comprador.</p>
                  </div>

                  <div className="rounded-2xl border border-slate-800/90 bg-black/25 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Resumo da saída</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-300">
                      <p className="font-semibold text-white">{editor.medication.name || 'Nome da fórmula'}</p>
                      <p>{String(editor.medication.manipulation_instructions || '').trim() ? `Manipulação: ${String(editor.medication.manipulation_instructions || '').trim()}` : 'Manipulação automática será complementada na receita com base na estrutura da fórmula.'}</p>
                      <p>{editor.medication.default_quantity_text || editor.medication.default_qsp_text || 'Quantidade final a manipular ainda não definida.'}</p>
                      <p>{String(activeRegimen?.default_administration_sig || '').trim() || 'Orientação ao tutor ainda não definida.'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div>
                    <RxvField label="Instrução para a farmácia">
                      <RxvTextarea value={String(editor.medication.manipulation_instructions || '')} onChange={(event) => updateMedication({ manipulation_instructions: event.target.value })} className="min-h-[92px]" placeholder="Ex: favor manipular em suspensão oral palatável, manter sob refrigeração, homogeneizar antes do uso." />
                    </RxvField>
                    <p className="mt-1 text-xs text-slate-500">Complementa a instrução farmacotécnica automática; não deve ser a única fonte de preparo.</p>
                  </div>
                  <div>
                    <RxvField label="Observações adicionais ao tutor">
                      <RxvTextarea value={String(editor.medication.notes || '')} onChange={(event) => updateMedication({ notes: event.target.value })} className="min-h-[92px]" placeholder="Ex: agitar antes de usar, administrar com alimento, alternar pinna, evitar lambedura." />
                    </RxvField>
                    <p className="mt-1 text-xs text-slate-500">Observações de apoio ao tutor que podem acompanhar a receita.</p>
                  </div>
                </div>

                <details className="mt-4 rounded-2xl border border-slate-800/90 bg-black/25 p-4">
                  <summary className="cursor-pointer text-xs font-black uppercase tracking-[0.24em] text-slate-400">Avançado</summary>
                  <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <RxvField label="Regras extras do controlado">
                      <RxvTextarea value={String(getMedicationMetadata(editor).control_extra_rules || '')} onChange={(event) => updateMedicationMetadata({ control_extra_rules: event.target.value })} className="min-h-[84px]" placeholder="Ex: exigir CPF do tutor, endereço completo, quantidade por extenso." />
                    </RxvField>
                    <RxvField label="Texto padrão complementar">
                      <RxvTextarea value={String(getMedicationMetadata(editor).complement_text || '')} onChange={(event) => updateMedicationMetadata({ complement_text: event.target.value })} className="min-h-[84px]" placeholder="Texto opcional para enriquecer preview/importação." />
                    </RxvField>
                  </div>
                </details>

                {selectedId ? (
                  <div className="mt-4 flex justify-end">
                    <RxvButton variant="danger" onClick={handleDelete}>
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      Excluir manipulado
                    </RxvButton>
                  </div>
                ) : null}
              </RxvCard>
            </div>
          </RxvCard>

          {loadingBundle && (!loadedBundle || String(loadedBundle.medication.id || '') !== String(selectedId || '')) ? (
            <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-6 text-sm text-slate-500">Carregando fórmula selecionada...</div>
          ) : null}
        </div>
        </div>
      </div>
    </ReceituarioChrome>
  )
}






