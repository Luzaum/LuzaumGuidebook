import type { ProtocolMedicationItem } from '../../src/lib/protocols/protocolsRepo'
import type { PatientInfo, PrescriptionItem } from './NovaReceita2Page'
import { sanitizeVisibleText } from './textSanitizer'
import { formatDurationPhrase, normalizeManipuladoV1, type ManipuladoV1Formula } from './manipuladosV1'
import {
  getManipuladoV1CatalogSubtitle,
  getManipuladoV1PrintLineLeft,
  getManipuladoV1PrintLineRight,
  renderManipuladoV1PharmacyInstruction,
  renderManipuladoV1Recommendations,
  renderManipuladoV1TutorInstruction,
} from './manipuladosV1Render'
import { sanitizeVisibleText } from './textSanitizer'

function defaultDoseEditorUnit(formula: ManipuladoV1Formula): string {
  const safeUnit = sanitizeVisibleText(formula.prescribing.dose_unit || '')
  if (formula.prescribing.posology_mode === 'mg_per_kg_dose') return `${safeUnit}/kg`
  if (formula.prescribing.posology_mode === 'mg_per_m2_dose') return `${safeUnit}/m²`
  if (formula.prescribing.posology_mode === 'fixed_per_animal') return `${safeUnit}/animal`
  if (formula.prescribing.posology_mode === 'fixed_per_application') return `${safeUnit}/dose`
  return safeUnit
}

function resolveDoseText(formula: ManipuladoV1Formula, patient: PatientInfo | null, targetDose?: number | null): string {
  const dose = targetDose ?? formula.prescribing.dose_min
  if (dose == null) return ''
  if (formula.prescribing.posology_mode === 'mg_per_kg_dose') {
    const weight = Number(patient?.weight_kg || 0)
    if (weight > 0) return `${Number((dose * weight).toFixed(2))} ${formula.prescribing.dose_unit}`
    return `${dose} ${formula.prescribing.dose_unit}/kg`
  }
  if (formula.prescribing.posology_mode === 'mg_per_m2_dose') {
    return `${dose} ${formula.prescribing.dose_unit}/m²`
  }
  return `${dose} ${formula.prescribing.dose_unit}`.trim()
}

function resolveTutorInstruction(formula: ManipuladoV1Formula, patient: PatientInfo | null, targetDose?: number | null): string {
  const doseText = resolveDoseText(formula, patient, targetDose) || '1 dose'
  const route = sanitizeVisibleText(formula.identity.primary_route || 'ORAL').toLowerCase()
  const frequency = sanitizeVisibleText(formula.prescribing.frequency_label || '')
  const duration =
    sanitizeVisibleText(formula.prescribing.duration_label || '') ||
    (formula.prescribing.duration_value ? `${formula.prescribing.duration_value} ${formula.prescribing.duration_unit}` : '')
  return sanitizeVisibleText(
    [
      `Administrar ${doseText}`,
      route ? `por via ${route}` : '',
      frequency,
      duration ? formatDurationPhrase(duration) : '',
    ].filter(Boolean).join(', ') + '.'
  )
}

export function mapManipuladoV1ToPrescriptionItem(params: {
  formula: ManipuladoV1Formula
  patient: PatientInfo | null
  defaultStartDate?: string
  defaultStartHour?: string
  targetDose?: number | null
}): PrescriptionItem {
  const formula = normalizeManipuladoV1(params.formula)
  const doseText = resolveDoseText(formula, params.patient, params.targetDose)
  const instructions = resolveTutorInstruction(formula, params.patient, params.targetDose) || renderManipuladoV1TutorInstruction(formula)
  const cautions = renderManipuladoV1Recommendations(formula)

  return {
    id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    kind: 'compounded',
    type: 'medication',
    isManual: false,
    is_controlled: formula.identity.sale_classification === 'controlled',
    catalog_source: 'clinic',
    compounded_medication_id: formula.identity.id,
    compounded_regimen_id: null,
    name: formula.identity.name,
    presentation_label: getManipuladoV1CatalogSubtitle(formula),
    route: formula.identity.primary_route,
    startDate: params.defaultStartDate || '',
    startHour: params.defaultStartHour || '',
    start_date: params.defaultStartDate && params.defaultStartHour ? `${params.defaultStartDate}T${params.defaultStartHour}:00` : params.defaultStartDate || undefined,
    inheritStartFromPrescription: true,
    cautionsText: cautions.join('\n'),
    cautions,
    pharmaceutical_form: formula.identity.pharmaceutical_form,
    package_quantity: formula.pharmacy.total_quantity || formula.pharmacy.qsp_text,
    presentation_metadata: {
      manipulados_v1: true,
      print_line_mode: 'manual',
      print_line_left: getManipuladoV1PrintLineLeft(formula),
      print_line_right: getManipuladoV1PrintLineRight(formula),
      compounded_selected_dose_value: params.targetDose ?? formula.prescribing.dose_min ?? '',
      compounded_selected_dose_unit: defaultDoseEditorUnit(formula),
      compounded_recommended_min: formula.prescribing.dose_min ?? '',
      compounded_recommended_max: formula.prescribing.dose_max ?? '',
      compounded_recommended_unit: defaultDoseEditorUnit(formula),
    },
    manualQuantity: formula.pharmacy.total_quantity || formula.pharmacy.qsp_text,
    compounded_pharmacy_guidance: renderManipuladoV1PharmacyInstruction(formula),
    compounded_internal_note: formula.prescribing.clinical_note || formula.identity.description || '',
    compounded_snapshot: {
      medication_id: formula.identity.id,
      medication_name: formula.identity.name,
      description: formula.identity.description,
      pharmaceutical_form: formula.identity.pharmaceutical_form,
      default_route: formula.identity.primary_route,
      is_controlled: formula.identity.sale_classification === 'controlled',
      control_type: formula.identity.sale_classification === 'controlled' ? 'controlled' : '',
      quantity_text: formula.pharmacy.total_quantity,
      qsp_text: formula.pharmacy.qsp_text,
      flavor: formula.pharmacy.flavor_mode === 'Outro' ? formula.pharmacy.flavor_text : formula.pharmacy.flavor_mode,
      vehicle: formula.pharmacy.base_text,
      excipient: formula.pharmacy.base_text,
      notes: formula.identity.description,
      manipulation_instructions: formula.pharmacy.compounding_instructions,
      metadata: {
        payload_v1: formula,
      },
      ingredients: formula.ingredients.map((ingredient) => ({
        id: ingredient.id,
        ingredient_name: ingredient.name,
        ingredient_role: ingredient.role === 'base' ? 'other' : ingredient.role,
        quantity_value: ingredient.quantity,
        quantity_unit: ingredient.unit,
        concentration_value: null,
        concentration_unit: null,
        per_value: null,
        per_unit: null,
        free_text: ingredient.note,
        is_controlled_ingredient: false,
        notes: ingredient.note,
      })),
    },
    compounded_regimen_snapshot: {
      id: formula.identity.id,
      regimen_name: formula.identity.indication_summary || 'Posologia padrão',
      indication: formula.identity.indication_summary || null,
      dosing_mode: formula.prescribing.posology_mode === 'mg_per_kg_dose' || formula.prescribing.posology_mode === 'mg_per_m2_dose' ? 'calculated' : 'fixed_per_patient',
      species: formula.identity.species_scope,
      route: formula.identity.primary_route,
      dose_min: formula.prescribing.dose_min,
      dose_max: formula.prescribing.dose_max,
      dose_unit: formula.prescribing.dose_unit,
      per_weight_unit: formula.prescribing.posology_mode === 'mg_per_kg_dose' ? 'kg' : formula.prescribing.posology_mode === 'mg_per_m2_dose' ? 'm2' : null,
      fixed_administration_value: formula.prescribing.posology_mode === 'fixed_per_animal' || formula.prescribing.posology_mode === 'fixed_per_application' ? formula.prescribing.dose_min : null,
      fixed_administration_unit: formula.pharmacy.final_unit,
      concentration_value: null,
      concentration_unit: null,
      concentration_per_value: 1,
      concentration_per_unit: formula.pharmacy.final_unit,
      frequency_value_min: null,
      frequency_value_max: null,
      frequency_unit: null,
      frequency_label: formula.prescribing.frequency_label,
      duration_mode: formula.prescribing.duration_label ? 'fixed_days' : 'continuous_until_recheck',
      duration_value: formula.prescribing.duration_value,
      duration_unit: formula.prescribing.duration_unit,
      inherit_default_start: true,
      notes: formula.prescribing.clinical_note || null,
      allow_edit: true,
      default_prepared_quantity_text: formula.pharmacy.total_quantity || formula.pharmacy.qsp_text,
      default_administration_sig: instructions,
      calculation_mode: formula.prescribing.posology_mode === 'mg_per_kg_dose' ? 'weight_based' : 'fixed_per_animal',
      applied_dose_text: doseText,
      applied_quantity_text: formula.pharmacy.total_quantity || formula.pharmacy.qsp_text,
      metadata: {
        payload_v1: formula,
      },
    },
    dose: doseText,
    frequency: formula.prescribing.frequency_label,
    duration: formula.prescribing.duration_label,
    durationValue: formula.prescribing.duration_value || undefined,
    durationUnit: formula.prescribing.duration_unit || undefined,
    instructions,
  }
}

export function mapManipuladoV1ToProtocolMedication(params: {
  formula: ManipuladoV1Formula
  sortOrder: number
}): ProtocolMedicationItem {
  const formula = normalizeManipuladoV1(params.formula)
  return {
    item_type: 'compounded',
    medication_id: null,
    compounded_medication_id: null,
    compounded_regimen_id: null,
    medication_name: formula.identity.name,
    presentation_id: null,
    presentation_text: getManipuladoV1CatalogSubtitle(formula),
    manual_medication_name: formula.identity.name,
    manual_presentation_label: getManipuladoV1PrintLineRight(formula),
    concentration_value: null,
    concentration_unit: null,
    dose_value: formula.prescribing.dose_min,
    dose_unit: formula.prescribing.dose_unit || null,
    route: formula.identity.primary_route,
    frequency_type: formula.prescribing.frequency_mode === 'q24h' ? 'once_daily' : 'times_per_day',
    times_per_day: formula.prescribing.frequency_mode === 'q24h' ? 1 : null,
    interval_hours: formula.prescribing.frequency_mode === 'q12h' ? 12 : formula.prescribing.frequency_mode === 'q8h' ? 8 : formula.prescribing.frequency_mode === 'q6h' ? 6 : null,
    duration_days: formula.prescribing.duration_value || null,
    is_controlled: formula.identity.sale_classification === 'controlled',
    sort_order: params.sortOrder,
    metadata: {
      payload_v1: formula,
      notes: formula.prescribing.clinical_note || '',
      runtime_source: 'manipulados_v1',
    },
  }
}
