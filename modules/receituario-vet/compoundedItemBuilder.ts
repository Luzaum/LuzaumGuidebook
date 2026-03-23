import type { CompoundedMedicationBundle, CompoundedMedicationRegimenRecord } from '../../src/lib/compoundedRecords'
import type { PatientInfo, PrescriptionItem } from './NovaReceita2Page'
import { getClinicalFormulaMetadata, getClinicalRegimenSemantics } from './compoundedClinicalText'
import { getCompoundedCalculationSummary, resolveCompoundedRoute } from './compoundedUi'

function buildLegacyStartDate(startDate?: string, startHour?: string): string | undefined {
  const safeDate = String(startDate || '').trim()
  const safeHour = String(startHour || '').trim()
  if (!safeDate && !safeHour) return undefined
  if (safeDate && safeHour) return `${safeDate}T${safeHour}:00`
  if (safeDate) return safeDate
  return safeHour
}

function buildCompoundedDurationText(regimen: CompoundedMedicationRegimenRecord): string {
  if (regimen.duration_mode === 'continuous_until_recheck') return 'até reavaliação clínica'
  if (regimen.duration_mode === 'until_recheck') return 'até reavaliação clínica'
  if (regimen.duration_mode === 'continuous_use') return 'uso contínuo'
  if (regimen.duration_mode === 'until_finished') return 'até terminar o medicamento'
  if (regimen.duration_value) return `${regimen.duration_value} ${regimen.duration_unit || 'dias'}`
  return ''
}

function buildCompoundedFrequencyText(regimen: CompoundedMedicationRegimenRecord): string {
  if (regimen.frequency_label) return regimen.frequency_label
  if (regimen.frequency_value_min && regimen.frequency_unit) {
    return `a cada ${regimen.frequency_value_min} ${regimen.frequency_unit}`
  }
  return ''
}

export function buildCompoundedConcentrationText(regimen: CompoundedMedicationRegimenRecord): string {
  if (!regimen.concentration_value || !regimen.concentration_unit) return ''
  const perValue = regimen.concentration_per_value || 1
  const perUnit = regimen.concentration_per_unit || 'mL'
  return `${regimen.concentration_value} ${regimen.concentration_unit}/${perValue} ${perUnit}`.replace('/1 ', '/')
}

export function buildCompoundedPrescriptionItem(params: {
  bundle: CompoundedMedicationBundle
  regimen: CompoundedMedicationRegimenRecord
  patient: PatientInfo | null
  defaultStartDate?: string
  defaultStartHour?: string
}): PrescriptionItem {
  const { bundle, regimen, patient, defaultStartDate = '', defaultStartHour = '' } = params
  const formulaMetadata = getClinicalFormulaMetadata(bundle.medication.metadata || null)
  const clinicalRegimen = getClinicalRegimenSemantics(bundle.medication.metadata || null, regimen.id)
  const concentrationText = buildCompoundedConcentrationText(regimen)
  const legacyStart = buildLegacyStartDate(defaultStartDate, defaultStartHour)
  const intervalHours = regimen.frequency_unit && regimen.frequency_unit.toLowerCase().includes('hour')
    ? (regimen.frequency_value_min || undefined)
    : undefined
  const timesPerDay = intervalHours && intervalHours > 0 && 24 % intervalHours === 0
    ? 24 / intervalHours
    : undefined

  const baseItem: PrescriptionItem = {
    id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    kind: 'compounded',
    type: 'medication',
    isManual: false,
    is_controlled: !!bundle.medication.is_controlled,
    catalog_source: 'clinic',
    compounded_medication_id: bundle.medication.id,
    compounded_regimen_id: regimen.id,
    name: bundle.medication.name,
    presentation_label: [
      clinicalRegimen?.pharmaceuticalForm || bundle.medication.pharmaceutical_form,
      clinicalRegimen?.totalQuantityText || bundle.medication.default_qsp_text || bundle.medication.default_quantity_text || '',
    ].filter(Boolean).join(' • '),
    dose: formulaMetadata?.formula_model === 'clinical_dose_oriented'
      ? (clinicalRegimen?.administrationUnitLabel === 'dose' ? '1 dose' : `1 ${clinicalRegimen?.administrationUnitLabel || 'dose'}`)
      : '',
    frequency: intervalHours ? `a cada ${intervalHours} horas` : buildCompoundedFrequencyText(regimen),
    frequencyMode: intervalHours && !timesPerDay ? 'interval_hours' : timesPerDay ? 'times_per_day' : undefined,
    timesPerDay,
    intervalHours,
    route: clinicalRegimen?.route || regimen.route || bundle.medication.default_route || '',
    duration: buildCompoundedDurationText(regimen),
    start_date: legacyStart,
    startDate: defaultStartDate,
    startHour: defaultStartHour,
    inheritStartFromPrescription: regimen.inherit_default_start !== false,
    durationMode: (regimen.duration_mode as PrescriptionItem['durationMode']) || 'fixed_days',
    durationValue: regimen.duration_value || undefined,
    durationUnit: regimen.duration_unit || 'dias',
    instructions: '',
    cautions: [],
    cautionsText: clinicalRegimen?.ownerInstruction || regimen.default_administration_sig || '',
    manualQuantity: '',
    pharmaceutical_form: clinicalRegimen?.pharmaceuticalForm || bundle.medication.pharmaceutical_form,
    concentration_text: formulaMetadata?.formula_model === 'clinical_dose_oriented' ? '' : concentrationText,
    package_quantity: clinicalRegimen?.totalQuantityText || bundle.medication.default_quantity_text || '',
    presentation_metadata: {
      compounded: true,
    },
    compounded_pharmacy_guidance: clinicalRegimen?.pharmacyInstruction || regimen.default_prepared_quantity_text || bundle.medication.manipulation_instructions || '',
    compounded_internal_note: [clinicalRegimen?.internalNote, clinicalRegimen?.reductionNote, regimen.notes, bundle.medication.notes].filter(Boolean).join(' ').trim(),
    compounded_snapshot: {
      medication_id: bundle.medication.id,
      medication_name: bundle.medication.name,
      description: bundle.medication.description || '',
      pharmaceutical_form: clinicalRegimen?.pharmaceuticalForm || bundle.medication.pharmaceutical_form,
      default_route: bundle.medication.default_route || '',
      is_controlled: !!bundle.medication.is_controlled,
      control_type: bundle.medication.control_type || '',
      quantity_text: clinicalRegimen?.totalQuantityText || bundle.medication.default_quantity_text || '',
      qsp_text: clinicalRegimen?.qspText || bundle.medication.default_qsp_text || '',
      flavor: bundle.medication.default_flavor || '',
      vehicle: bundle.medication.default_vehicle || '',
      excipient: bundle.medication.default_excipient || '',
      notes: bundle.medication.notes || '',
      manipulation_instructions: bundle.medication.manipulation_instructions || '',
      metadata: bundle.medication.metadata || {},
      ingredients: bundle.ingredients.map((entry) => ({
        id: entry.id,
        ingredient_name: entry.ingredient_name,
        ingredient_role: entry.ingredient_role,
        quantity_value: entry.quantity_value,
        quantity_unit: entry.quantity_unit,
        concentration_value: entry.concentration_value,
        concentration_unit: entry.concentration_unit,
        per_value: entry.per_value,
        per_unit: entry.per_unit,
        free_text: entry.free_text,
        is_controlled_ingredient: entry.is_controlled_ingredient,
        notes: entry.notes,
      })),
    },
    compounded_regimen_snapshot: {
      ...regimen,
      calculation_mode: regimen.dosing_mode === 'calculated' ? 'weight_based' : 'fixed_per_animal',
      applied_dose_text: '',
      applied_quantity_text: '',
      metadata: clinicalRegimen || null,
    },
  }

  const calculation = getCompoundedCalculationSummary(baseItem, patient)
  const fixedAdministrationText =
    regimen.fixed_administration_value && regimen.fixed_administration_unit
      ? `${regimen.fixed_administration_value} ${regimen.fixed_administration_unit}`
      : ''

  const doseText =
    calculation?.perAdministrationText ||
    fixedAdministrationText ||
    ''

  const quantityText =
    calculation?.finalQuantityText ||
    clinicalRegimen?.totalQuantityText ||
    regimen.default_prepared_quantity_text ||
    bundle.medication.default_qsp_text ||
    bundle.medication.default_quantity_text ||
    ''

  return {
    ...baseItem,
    route: resolveCompoundedRoute(baseItem),
    dose: doseText,
    manualQuantity: quantityText,
    compounded_regimen_snapshot: {
      ...baseItem.compounded_regimen_snapshot,
      applied_dose_text: doseText,
      applied_quantity_text: quantityText,
    },
  }
}
