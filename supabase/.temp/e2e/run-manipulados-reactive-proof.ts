import fs from 'node:fs'
import path from 'node:path'
import { createEmptyCompoundedV2 } from '../../../modules/receituario-vet/compoundedV2'
import { mapCompoundedV2ToPrescriptionItem } from '../../../modules/receituario-vet/compoundedV2Mapper'
import { buildCompoundedInstruction } from '../../../modules/receituario-vet/compoundedUi'

const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'

const v2 = createEmptyCompoundedV2()
v2.formula.id = crypto.randomUUID()
v2.formula.name = 'Reatividade Benazepril'
v2.formula.pharmaceutical_form = 'Biscoito medicamentoso'
v2.formula.administration_unit = 'biscoito'
v2.formula.primary_route = 'VO'
v2.formula.qsp_text = '30 unidades'
v2.formula.total_quantity_text = '30 biscoitos'
v2.ingredients[0].name = 'Benazepril'
v2.ingredients[0].definition_mode = 'derived_from_regimen'
v2.ingredients[0].amount = 0.5
v2.ingredients[0].unit = 'mg'
v2.ingredients[0].target_unit = 'biscoito'
v2.ingredients[0].calculation_basis = 'kg'
v2.ingredients[0].follows_primary_regimen = true
v2.ingredients[0].use_regimen_directly = true
v2.regimens[0].dose_mode = 'by_weight'
v2.regimens[0].dose_min = 0.5
v2.regimens[0].dose_unit = 'mg'
v2.regimens[0].dose_basis = 'kg'
v2.regimens[0].administration_unit = 'biscoito'
v2.regimens[0].frequency_mode = 'interval_hours'
v2.regimens[0].frequency_min = 24
v2.regimens[0].duration_mode = 'fixed'
v2.regimens[0].duration_value = 30
v2.regimens[0].duration_unit = 'dias'
v2.regimens[0].usage_instruction = 'Administrar 1 biscoito a cada 24 horas.'

const item = mapCompoundedV2ToPrescriptionItem({
  v2,
  patient: { weight_kg: 5 } as never,
})

const before = buildCompoundedInstruction(item, { weight_kg: 5 } as never)

const edited = {
  ...item,
  instructions: 'Administrar 1 biscoito a cada 24 horas, por 10 dias.',
}

const after = buildCompoundedInstruction(edited, { weight_kg: 5 } as never)

const result = {
  ok: before !== after && /10 dias/i.test(after),
  before,
  after,
}

fs.writeFileSync(path.join(outDir, 'manipulados-reactive-proof.json'), JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
