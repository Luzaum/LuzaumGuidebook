import fs from 'node:fs'
import path from 'node:path'
import { createEmptyCompoundedV2, v2ManipulatedToPersistence } from '../../../modules/receituario-vet/compoundedV2'
import { mapCompoundedToPrescriptionItemV2 } from '../../../modules/receituario-vet/compoundedV2Mapper'
import { buildCompoundedInstruction } from '../../../modules/receituario-vet/compoundedUi'

const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'

const v2 = createEmptyCompoundedV2()
const regimenId = v2.regimens[0].id
v2.formula.name = 'Benazepril teste'
v2.formula.pharmaceutical_form = 'Biscoito medicamentoso'
v2.formula.archetype = 'oral_unitario'
v2.formula.administration_unit = 'biscoito'
v2.formula.primary_route = 'VO'
v2.formula.total_quantity_text = '30 unidades'
v2.formula.qsp_text = '30 unidades'
v2.ingredients = [
  {
    id: crypto.randomUUID(),
    name: 'Benazepril',
    role: 'active',
    amount: null,
    unit: 'mg',
    note: '',
    is_controlled: false,
    definition_mode: 'derived_from_regimen',
    follows_primary_regimen: true,
    use_regimen_directly: true,
    target_unit: 'biscoito',
    calculation_basis: 'kg',
    multiplier: null,
    concentration_value: null,
    concentration_unit: '',
  },
]
v2.regimens[0] = {
  ...v2.regimens[0],
  name: 'Regime oral',
  species: 'Canina',
  clinical_indication: 'Controle pressorico',
  administration_unit: 'biscoito',
  dose_mode: 'by_weight',
  dose_min: 0.5,
  dose_max: null,
  dose_unit: 'mg',
  dose_basis: 'kg',
  frequency_mode: 'interval_hours',
  frequency_min: 24,
  frequency_max: null,
  frequency_text: 'a cada 24 horas',
  duration_mode: 'continuous_until_recheck',
  duration_value: null,
  duration_unit: 'dias',
  duration_text: 'ate reavaliacao clinica',
  usage_instruction: '',
  tutor_observation: '',
  internal_note: '',
  pharmacy_note: '',
  is_default: true,
  concentration_value: null,
  concentration_unit: '',
  pharmacy_strategy: 'dose_base_per_unit',
}

const persisted = v2ManipulatedToPersistence(v2)
const item = mapCompoundedToPrescriptionItemV2({
  bundle: {
    medication: persisted.medication,
    ingredients: persisted.ingredients,
    regimens: persisted.regimens,
  },
  patient: { id: 'p1', name: 'Paciente', species: 'Canina', weight_kg: 5 } as any,
  regimenId,
  defaultStartDate: '2026-03-30',
  defaultStartHour: '20:00',
})

const instruction = buildCompoundedInstruction(item as any, { id: 'p1', name: 'Paciente', species: 'Canina', weight_kg: 5 } as any)
const result = {
  ok: /por via oral/i.test(instruction),
  route: item.route,
  dose: item.dose,
  instruction,
}

fs.writeFileSync(path.join(outDir, 'phase5b2-compounded-route-proof.json'), JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
