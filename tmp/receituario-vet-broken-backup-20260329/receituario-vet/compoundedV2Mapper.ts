import type { ProtocolMedicationItem } from '????.????./????.????./src/lib/protocols/protocolsRepo'
import type { CompoundedMedicationBundle } from '????.????./????.????./src/lib/compoundedRecords'
import type { CompoundedPrescriptionItem, PatientInfo, PrescriptionItem } from '????./NovaReceita2Page'
import { legacyManipulatedToV2, type CompoundedMedicationV2 } from '????./compoundedV2'
import { resolveCompoundedInstance } from '????./compoundedV2Engine'
import {
  getCompoundedCatalogSubtitle,
  renderCompoundedInternalNote,
  renderCompoundedPharmacyInstructions,
  renderCompoundedPrescriptionLine,
  renderCompoundedProtocolSummary,
  renderCompoundedRecommendations,
  renderCompoundedTutorNotes,
} from '????./compoundedV2Render'
import { sanitizeDeepText, sanitizeVisibleText } from '????./textSanitizer'

function normalizeText(value: unknown): string {
  return sanitizeVisibleText(value)????.trim()
}

function buildLegacySnapshot(bundle: CompoundedMedicationBundle) {
  return {
    medication_id: bundle????.medication????.id,
    medication_name: bundle????.medication????.name,
    description: bundle????.medication????.description || '',
    pharmaceutical_form: bundle????.medication????.pharmaceutical_form,
    default_route: bundle????.medication????.default_route || '',
    is_controlled: !!bundle????.medication????.is_controlled,
    control_type: bundle????.medication????.control_type || '',
    quantity_text: bundle????.medication????.default_quantity_text || '',
    qsp_text: bundle????.medication????.default_qsp_text || '',
    flavor: bundle????.medication????.default_flavor || '',
    vehicle: bundle????.medication????.default_vehicle || '',
    excipient: bundle????.medication????.default_excipient || '',
    notes: bundle????.medication????.notes || '',
    manipulation_instructions: bundle????.medication????.manipulation_instructions || '',
    metadata: bundle????.medication????.metadata || {},
    ingredients: bundle????.ingredients????.map((ingredient) => ({
      id: ingredient????.id,
      ingredient_name: ingredient????.ingredient_name,
      ingredient_role: ingredient????.ingredient_role,
      quantity_value: ingredient????.quantity_value,
      quantity_unit: ingredient????.quantity_unit,
      concentration_value: ingredient????.concentration_value,
      concentration_unit: ingredient????.concentration_unit,
      per_value: ingredient????.per_value,
      per_unit: ingredient????.per_unit,
      free_text: ingredient????.free_text,
      is_controlled_ingredient: ingredient????.is_controlled_ingredient,
      notes: ingredient????.notes,
    })),
  }
}

function parseDoseText(dose?: string | null): { value: number | null; unit: string } {
  const safe = normalizeText(dose)
  if (!safe) return { value: null, unit: '' }
  const match = safe????.match(/^(\d+(?:[????.,]\d+)?)\s*(????.*)$/)
  if (!match) return { value: null, unit: safe }
  const value = Number(match[1]????.replace(',', '????.'))
  return {
    value: Number????.isFinite(value) ? value : null,
    unit: normalizeText(match[2]),
  }
}

function applyPrescriptionOverridesToV2(v2: CompoundedMedicationV2, item: CompoundedPrescriptionItem): CompoundedMedicationV2 {
  const regimenId = item????.compounded_regimen_id || item????.compounded_regimen_snapshot?????.id || null
  const targetRegimen = v2????.regimens????.find((entry) => entry????.id === regimenId) || v2????.regimens????.find((entry) => entry????.is_default) || v2????.regimens[0]
  if (!targetRegimen) return v2

  const parsedDose = parseDoseText(item????.dose)
  const nextFrequencyMode =
    item????.frequencyMode === 'times_per_day'
      ? 'times_per_day'
      : item????.frequencyMode === 'interval_hours'
        ? 'interval_hours'
        : targetRegimen????.frequency_mode

  return {
    ????.????.????.v2,
    formula: {
      ????.????.????.v2????.formula,
      primary_route: normalizeText(item????.route) || v2????.formula????.primary_route,
      total_quantity_text: normalizeText(item????.manualQuantity) || v2????.formula????.total_quantity_text,
      qsp_text: normalizeText(item????.manualQuantity) || v2????.formula????.qsp_text,
      sale_classification: item????.is_controlled ? 'controlled' : v2????.formula????.sale_classification,
    },
    regimens: v2????.regimens????.map((regimen) => regimen????.id !== targetRegimen????.id ? regimen : {
      ????.????.????.regimen,
      administration_unit: normalizeText(item????.compounded_regimen_snapshot?????.fixed_administration_unit) || regimen????.administration_unit,
      dose_min: parsedDose????.value ?? regimen????.dose_min,
      dose_unit: parsedDose????.unit || regimen????.dose_unit,
      frequency_mode: nextFrequencyMode,
      frequency_min: item????.timesPerDay ?? item????.intervalHours ?? regimen????.frequency_min,
      frequency_text: normalizeText(item????.frequency) || regimen????.frequency_text,
      duration_mode: item????.durationMode === 'continuous_until_recheck' ? 'continuous_until_recheck' : regimen????.duration_mode,
      duration_value: item????.durationValue ?? regimen????.duration_value,
      duration_unit: normalizeText(item????.durationUnit) || regimen????.duration_unit,
      duration_text: normalizeText(item????.duration) || regimen????.duration_text,
      tutor_observation: normalizeText(item????.cautionsText) || regimen????.tutor_observation,
      usage_instruction: normalizeText(item????.instructions) || regimen????.usage_instruction,
      pharmacy_note: normalizeText(item????.compounded_pharmacy_guidance) || regimen????.pharmacy_note,
      internal_note: normalizeText(item????.compounded_internal_note) || regimen????.internal_note,
    }),
  }
}

export function mapCompoundedToPrescriptionItemV2(params: {
  bundle: CompoundedMedicationBundle
  patient: PatientInfo | null
  regimenId?: string | null
  defaultStartDate?: string
  defaultStartHour?: string
}): PrescriptionItem {
  const { bundle, patient, regimenId, defaultStartDate = '', defaultStartHour = '' } = params
  const v2 = sanitizeDeepText(legacyManipulatedToV2(bundle))
  const regimen = v2????.regimens????.find((entry) => entry????.id === regimenId) || v2????.regimens????.find((entry) => entry????.is_default) || v2????.regimens[0]
  const recommendations = renderCompoundedRecommendations(v2, regimen?????.id)
  const resolved = resolveCompoundedInstance(v2, patient, regimen?????.id)

  return {
    id: `item-${Date????.now()}-${Math????.random()????.toString(36)????.slice(2, 9)}`,
    kind: 'compounded',
    type: 'medication',
    isManual: false,
    is_controlled: v2????.formula????.sale_classification === 'controlled',
    catalog_source: 'clinic',
    compounded_medication_id: v2????.formula????.id,
    compounded_regimen_id: regimen?????.id,
    name: v2????.formula????.name,
    presentation_label: getCompoundedCatalogSubtitle(v2),
    route: v2????.formula????.primary_route,
    startDate: defaultStartDate,
    startHour: defaultStartHour,
    start_date: defaultStartDate && defaultStartHour ? `${defaultStartDate}T${defaultStartHour}:00` : defaultStartDate || undefined,
    inheritStartFromPrescription: true,
    cautionsText: recommendations????.join('\n'),
    cautions: recommendations,
    pharmaceutical_form: v2????.formula????.pharmaceutical_form,
    package_quantity: v2????.formula????.total_quantity_text,
    presentation_metadata: {
      compounded: true,
      ui_version: 2,
    },
    manualQuantity: v2????.formula????.total_quantity_text || v2????.formula????.qsp_text,
    compounded_pharmacy_guidance: renderCompoundedPharmacyInstructions(v2, patient, regimen?????.id),
    compounded_internal_note: renderCompoundedInternalNote(v2, regimen?????.id),
    compounded_snapshot: {
      ????.????.????.buildLegacySnapshot(bundle),
      metadata: {
        ????.????.????.(bundle????.medication????.metadata || {}),
        payload_v2: v2,
        ui_version: 2,
        sale_classification: v2????.formula????.sale_classification,
      },
    },
    compounded_regimen_snapshot: regimen ? {
      id: regimen????.id,
      regimen_name: regimen????.name || null,
      indication: regimen????.clinical_indication || null,
      dosing_mode: regimen????.dose_mode === 'by_weight' ? 'calculated' : 'fixed_per_patient',
      species: regimen????.species,
      route: null,
      dose_min: regimen????.dose_min,
      dose_max: regimen????.dose_max,
      dose_unit: regimen????.dose_unit || null,
      per_weight_unit: regimen????.dose_basis || null,
      fixed_administration_value: regimen????.dose_mode === 'fixed' ? regimen????.dose_min : null,
      fixed_administration_unit: regimen????.administration_unit || null,
      concentration_value: regimen????.concentration_value,
      concentration_unit: regimen????.concentration_unit || null,
      concentration_per_value: 1,
      concentration_per_unit: regimen????.administration_unit || null,
      frequency_value_min: regimen????.frequency_min,
      frequency_value_max: regimen????.frequency_max,
      frequency_unit: regimen????.frequency_mode === 'times_per_day' ? 'times_per_day' : regimen????.frequency_mode === 'interval_hours' ? 'hours' : null,
      frequency_label: regimen????.frequency_text || null,
      duration_mode: regimen????.duration_mode === 'continuous_until_recheck' ? 'continuous_until_recheck' : 'fixed_days',
      duration_value: regimen????.duration_value,
      duration_unit: regimen????.duration_unit || null,
      inherit_default_start: true,
      notes: renderCompoundedInternalNote(v2, regimen????.id) || null,
      allow_edit: true,
      default_prepared_quantity_text: v2????.formula????.total_quantity_text || null,
      default_administration_sig: regimen????.usage_instruction || null,
      calculation_mode: regimen????.dose_mode === 'by_weight' ? 'weight_based' : 'fixed_per_animal',
      applied_dose_text: resolved????.administrationText || renderCompoundedPrescriptionLine(v2, patient, regimen????.id),
      applied_quantity_text: v2????.formula????.total_quantity_text || v2????.formula????.qsp_text,
      metadata: {
        doseSelectionStrategy: 'min',
        pharmacyStrategy: regimen????.pharmacy_strategy,
        payload_v2: v2,
      },
    } : null,
    dose: resolved????.administrationText || '',
    frequency: regimen?????.frequency_text || '',
    duration: regimen?????.duration_text || '',
    instructions: renderCompoundedPrescriptionLine(v2, patient, regimen?????.id),
  }
}

export function mapCompoundedToProtocolMedicationV2(params: {
  bundle: CompoundedMedicationBundle
  sortOrder: number
  regimenId?: string | null
}): ProtocolMedicationItem {
  const { bundle, sortOrder, regimenId } = params
  const v2 = sanitizeDeepText(legacyManipulatedToV2(bundle))
  const regimen = v2????.regimens????.find((entry) => entry????.id === regimenId) || v2????.regimens????.find((entry) => entry????.is_default) || v2????.regimens[0]

  return {
    item_type: 'compounded',
    medication_id: null,
    compounded_medication_id: v2????.formula????.id,
    compounded_regimen_id: regimen?????.id || null,
    medication_name: v2????.formula????.name,
    presentation_id: null,
    presentation_text: renderCompoundedProtocolSummary(v2, regimen?????.id),
    manual_medication_name: null,
    manual_presentation_label: getCompoundedCatalogSubtitle(v2) || null,
    concentration_value: regimen?????.concentration_value ?? null,
    concentration_unit: normalizeText(regimen?????.concentration_unit) || null,
    dose_value: regimen?????.dose_min ?? null,
    dose_unit: normalizeText(regimen?????.dose_unit) || null,
    route: v2????.formula????.primary_route || null,
    frequency_type: regimen?????.frequency_mode === 'times_per_day' ? 'times_per_day' : regimen?????.frequency_mode === 'interval_hours' ? 'interval_hours' : 'as_needed',
    times_per_day: regimen?????.frequency_mode === 'times_per_day' ? regimen????.frequency_min : null,
    interval_hours: regimen?????.frequency_mode === 'interval_hours' ? regimen????.frequency_min : null,
    duration_days: regimen?????.duration_mode === 'fixed' ? regimen????.duration_value : null,
    is_controlled: v2????.formula????.sale_classification === 'controlled',
    sort_order: sortOrder,
    metadata: {
      item_kind: 'compounded',
      notes: renderCompoundedTutorNotes(v2, regimen?????.id) || '',
      rx_item_snapshot: mapCompoundedToPrescriptionItemV2({ bundle, patient: null, regimenId: regimen?????.id }),
      payload_v2: v2,
    },
  }
}

export function mapCompoundedPrescriptionItemToProtocolMedicationV2(item: CompoundedPrescriptionItem, sortOrder: number): ProtocolMedicationItem {
  const payloadV2 = (item????.compounded_snapshot?????.metadata as Record<string, unknown> | null)?????.payload_v2 as CompoundedMedicationV2 | undefined
  const v2Base = payloadV2 || {
    formula: {
      id: item????.compounded_medication_id || item????.compounded_snapshot????.medication_id || '',
      clinic_id: '',
      slug: '',
      name: item????.name,
      pharmaceutical_form: item????.compounded_snapshot????.pharmaceutical_form || item????.pharmaceutical_form || '',
      archetype: 'oral_liquido' as const,
      formula_type: 'fixed_unit_formula' as const,
      dosage_form_family: 'oral_liquid' as const,
      species: [],
      primary_route: item????.route || item????.compounded_snapshot????.default_route || '',
      administration_unit: '',
      sale_classification: item????.is_controlled ? 'controlled' as const : 'free' as const,
      control_type: item????.compounded_snapshot????.control_type || null,
      is_active: true,
      is_continuous_use: false,
      short_description: item????.compounded_snapshot????.description || '',
      active_principles_summary: '',
      qsp_text: item????.compounded_snapshot????.qsp_text || '',
      total_quantity_text: item????.compounded_snapshot????.quantity_text || '',
      vehicle: item????.compounded_snapshot????.vehicle || '',
      flavor: item????.compounded_snapshot????.flavor || '',
      excipient_base: item????.compounded_snapshot????.excipient || '',
      ui_version: 2,
      legacy_source: 'rx_item_snapshot',
    },
    ingredients: [],
    regimens: [],
  }
  const v2 = applyPrescriptionOverridesToV2(v2Base, item)

  const regimenId = item????.compounded_regimen_id || item????.compounded_regimen_snapshot?????.id || null
  return {
    item_type: 'compounded',
    medication_id: null,
    compounded_medication_id: item????.compounded_medication_id || item????.compounded_snapshot????.medication_id || null,
    compounded_regimen_id: regimenId,
    medication_name: item????.name,
    presentation_id: null,
    presentation_text: renderCompoundedProtocolSummary(v2, regimenId),
    manual_medication_name: null,
    manual_presentation_label: getCompoundedCatalogSubtitle(v2) || null,
    concentration_value: typeof item????.value === 'number' ? item????.value : null,
    concentration_unit: item????.value_unit || null,
    dose_value: null,
    dose_unit: null,
    route: item????.route || null,
    frequency_type: item????.frequencyMode === 'times_per_day' ? 'times_per_day' : item????.frequencyMode === 'interval_hours' ? 'interval_hours' : 'as_needed',
    times_per_day: item????.timesPerDay ?? null,
    interval_hours: item????.intervalHours ?? null,
    duration_days: item????.durationMode === 'fixed_days' ? item????.durationValue ?? null : null,
    is_controlled: !!item????.is_controlled,
    sort_order: sortOrder,
    metadata: {
      item_kind: 'compounded',
      notes: item????.cautionsText || '',
      rx_item_snapshot: item,
      payload_v2: v2,
    },
  }
}
