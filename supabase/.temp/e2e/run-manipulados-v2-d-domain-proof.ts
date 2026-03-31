import fs from 'node:fs'
import path from 'node:path'
import { parseClinicalTextImport } from '../../../modules/receituario-vet/compoundedClinicalText'
import { importParsedClinicalToV2, v2ManipulatedToPersistence } from '../../../modules/receituario-vet/compoundedV2'
import { mapCompoundedToPrescriptionItemV2 } from '../../../modules/receituario-vet/compoundedV2Mapper'
import { buildCompoundedInstruction, buildCompoundedPharmacyInstruction, getCompoundedCalculationSummary } from '../../../modules/receituario-vet/compoundedUi'
import { renderCompoundedPharmacyInstructions, renderCompoundedPrescriptionLine } from '../../../modules/receituario-vet/compoundedV2Render'

const outFile = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e/manipulados-v2-d-domain-proof.json'

function makeBundleFromV2(v2: ReturnType<typeof importParsedClinicalToV2>) {
  const persisted = v2ManipulatedToPersistence(v2)
  return {
    medication: {
      id: v2.formula.id || crypto.randomUUID(),
      clinic_id: v2.formula.clinic_id || 'clinic-proof',
      slug: v2.formula.slug || 'proof',
      name: persisted.medication.name,
      pharmaceutical_form: persisted.medication.pharmaceutical_form,
      description: persisted.medication.description || '',
      default_route: persisted.medication.default_route || '',
      is_controlled: persisted.medication.is_controlled || false,
      control_type: persisted.medication.control_type || null,
      default_quantity_text: persisted.medication.default_quantity_text || '',
      default_qsp_text: persisted.medication.default_qsp_text || '',
      default_vehicle: persisted.medication.default_vehicle || '',
      default_excipient: persisted.medication.default_excipient || '',
      default_flavor: persisted.medication.default_flavor || '',
      notes: persisted.medication.notes || '',
      manipulation_instructions: persisted.medication.manipulation_instructions || '',
      metadata: persisted.medication.metadata || {},
      species: persisted.medication.species || [],
      is_active: persisted.medication.is_active !== false,
    },
    ingredients: persisted.ingredients.map((ingredient, index) => ({
      id: crypto.randomUUID(),
      clinic_id: v2.formula.clinic_id || 'clinic-proof',
      compounded_medication_id: v2.formula.id || 'proof-medication',
      ingredient_name: ingredient.ingredient_name || `Ingrediente ${index + 1}`,
      ingredient_role: ingredient.ingredient_role || 'active',
      quantity_value: ingredient.quantity_value ?? null,
      quantity_unit: ingredient.quantity_unit || '',
      concentration_value: ingredient.concentration_value ?? null,
      concentration_unit: ingredient.concentration_unit || '',
      per_value: ingredient.per_value ?? null,
      per_unit: ingredient.per_unit || '',
      free_text: ingredient.free_text || '',
      is_controlled_ingredient: ingredient.is_controlled_ingredient || false,
      notes: ingredient.notes || '',
      metadata: ingredient.metadata || {},
      sort_order: index,
    })),
    regimens: persisted.regimens.map((regimen, index) => ({
      id: regimen.id || crypto.randomUUID(),
      clinic_id: v2.formula.clinic_id || 'clinic-proof',
      compounded_medication_id: v2.formula.id || 'proof-medication',
      regimen_name: regimen.regimen_name || `Regime ${index + 1}`,
      indication: regimen.indication || '',
      species: regimen.species || '',
      route: regimen.route || '',
      dosing_mode: regimen.dosing_mode || 'fixed_per_patient',
      dose_min: regimen.dose_min ?? null,
      dose_max: regimen.dose_max ?? null,
      dose_unit: regimen.dose_unit || '',
      per_weight_unit: regimen.per_weight_unit || '',
      fixed_administration_value: regimen.fixed_administration_value ?? null,
      fixed_administration_unit: regimen.fixed_administration_unit || '',
      concentration_value: regimen.concentration_value ?? null,
      concentration_unit: regimen.concentration_unit || '',
      concentration_per_value: regimen.concentration_per_value ?? null,
      concentration_per_unit: regimen.concentration_per_unit || '',
      frequency_value_min: regimen.frequency_value_min ?? null,
      frequency_value_max: regimen.frequency_value_max ?? null,
      frequency_unit: regimen.frequency_unit || '',
      frequency_label: regimen.frequency_label || '',
      duration_mode: regimen.duration_mode || 'fixed_days',
      duration_value: regimen.duration_value ?? null,
      duration_unit: regimen.duration_unit || '',
      inherit_default_start: regimen.inherit_default_start ?? true,
      notes: regimen.notes || '',
      allow_edit: regimen.allow_edit ?? true,
      default_prepared_quantity_text: regimen.default_prepared_quantity_text || '',
      default_administration_sig: regimen.default_administration_sig || '',
      calculation_mode: regimen.calculation_mode || 'fixed_per_animal',
      applied_dose_text: regimen.applied_dose_text || '',
      applied_quantity_text: regimen.applied_quantity_text || '',
      metadata: regimen.metadata || {},
      sort_order: index,
    })),
  }
}

const patient = { id: 'patient-proof', name: 'Paciente Prova', species: 'cão', weight_kg: '5' }

const benazeprilParsed = parseClinicalTextImport(`Benazepril Biscoito
Cães apresentando quadro estável
Benazepril 0,5 mg/kg/biscoito/VO
Biscoitos q.s.p. 30 unidades
Modo de uso: Administrar 1 biscoito a cada 24h.`)
const benazeprilV2 = importParsedClinicalToV2(benazeprilParsed)
const benazeprilBundle = makeBundleFromV2(benazeprilV2)
const benazeprilItem = mapCompoundedToPrescriptionItemV2({
  bundle: benazeprilBundle as never,
  patient: patient as never,
  regimenId: benazeprilV2.regimens[0]?.id,
})
const benazeprilCalc = getCompoundedCalculationSummary(benazeprilItem, patient as never)

const clickV2 = {
  formula: {
    id: 'click-proof',
    clinic_id: 'clinic-proof',
    slug: 'gabapentina-click-proof',
    name: 'Gabapentina gel transdérmico',
    pharmaceutical_form: 'Gel transdérmico',
    archetype: 'transdermico_dosado',
    formula_type: 'fixed_unit_formula',
    dosage_form_family: 'transdermal_measured',
    species: ['Felina'],
    primary_route: 'Transdérmica',
    administration_unit: 'click',
    sale_classification: 'free',
    control_type: null,
    is_active: true,
    is_continuous_use: false,
    short_description: 'Gel transdérmico felino',
    active_principles_summary: 'Gabapentina',
    qsp_text: '10 mL',
    total_quantity_text: '10 mL',
    vehicle: 'base transdérmica tipo Lipoderm®',
    flavor: '',
    excipient_base: '',
    ui_version: 2 as const,
    legacy_source: 'proof',
  },
  ingredients: [{ id: 'i1', name: 'Gabapentina', role: 'active', amount: 100, unit: 'mg', note: '', is_controlled: false }],
  regimens: [{
    id: 'r1',
    name: 'Manutenção',
    species: 'Felina',
    clinical_indication: 'Dor crônica',
    scenario: '',
    dose_mode: 'fixed' as const,
    dose_min: 1,
    dose_max: null,
    dose_unit: 'click',
    dose_basis: 'animal',
    concentration_value: 100,
    concentration_unit: 'mg/click',
    administration_unit: 'click',
    frequency_mode: 'interval_hours' as const,
    frequency_min: 8,
    frequency_max: null,
    frequency_text: '',
    duration_mode: 'fixed' as const,
    duration_value: 7,
    duration_unit: 'dias',
    duration_text: '',
    usage_instruction: '',
    tutor_observation: 'Usar luvas durante a aplicação.',
    internal_note: '',
    pharmacy_note: 'Ajustar para fornecer 100 mg por click.',
    pharmacy_strategy: 'dose_base_per_click',
    is_default: true,
  }],
}

const dropV2 = {
  ...clickV2,
  formula: {
    ...clickV2.formula,
    id: 'drop-proof',
    slug: 'solucao-otologica-proof',
    name: 'Solução otológica manipulada',
    pharmaceutical_form: 'Solução otológica',
    archetype: 'oto_oftalmico_local',
    dosage_form_family: 'otic_ophthalmic_local',
    administration_unit: 'gota',
    primary_route: 'Otológica',
    vehicle: '',
  },
  regimens: [{
    ...clickV2.regimens[0],
    id: 'r2',
    dose_unit: 'gota',
    concentration_unit: 'mg/gota',
    administration_unit: 'gota',
    frequency_min: 12,
  }],
}

const pumpV2 = {
  ...clickV2,
  formula: { ...clickV2.formula, id: 'pump-proof', slug: 'creme-pump-proof', name: 'Creme dosado em pump', administration_unit: 'pump' },
  regimens: [{ ...clickV2.regimens[0], id: 'r3', dose_unit: 'pump', concentration_unit: 'mg/pump', administration_unit: 'pump' }],
}

const ointmentV2 = {
  ...clickV2,
  formula: {
    ...clickV2.formula,
    id: 'ointment-proof',
    slug: 'pomada-proof',
    name: 'Pomada dermatológica',
    pharmaceutical_form: 'Pomada',
    archetype: 'topico_livre',
    dosage_form_family: 'topical_free_application',
    administration_unit: 'aplicação',
    primary_route: 'Tópica',
    qsp_text: '30 g',
    total_quantity_text: '30 g',
    vehicle: '',
  },
  regimens: [{
    ...clickV2.regimens[0],
    id: 'r4',
    dose_unit: 'aplicação',
    administration_unit: 'aplicação',
    concentration_value: null,
    concentration_unit: '',
    usage_instruction: 'Aplicar fina camada no local afetado a cada 12 horas por 7 dias.',
  }],
}

const proof = {
  benazepril: {
    warnings: benazeprilCalc?.warnings || [],
    ingredientBreakdown: benazeprilCalc?.ingredientBreakdown || [],
    tutorInstruction: buildCompoundedInstruction(benazeprilItem, patient as never),
    pharmacyInstruction: buildCompoundedPharmacyInstruction(benazeprilItem, patient as never),
    finalQuantity: benazeprilCalc?.finalQuantityText || '',
  },
  click: {
    tutorInstruction: renderCompoundedPrescriptionLine(clickV2 as never, patient as never, 'r1'),
    pharmacyInstruction: renderCompoundedPharmacyInstructions(clickV2 as never, patient as never, 'r1'),
  },
  drop: {
    tutorInstruction: renderCompoundedPrescriptionLine(dropV2 as never, patient as never, 'r2'),
    pharmacyInstruction: renderCompoundedPharmacyInstructions(dropV2 as never, patient as never, 'r2'),
  },
  pump: {
    tutorInstruction: renderCompoundedPrescriptionLine(pumpV2 as never, patient as never, 'r3'),
    pharmacyInstruction: renderCompoundedPharmacyInstructions(pumpV2 as never, patient as never, 'r3'),
  },
  ointment: {
    tutorInstruction: renderCompoundedPrescriptionLine(ointmentV2 as never, patient as never, 'r4'),
    pharmacyInstruction: renderCompoundedPharmacyInstructions(ointmentV2 as never, patient as never, 'r4'),
  },
}

fs.writeFileSync(outFile, JSON.stringify(proof, null, 2))
console.log(outFile)
