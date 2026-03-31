import fs from 'node:fs'
import path from 'node:path'
import { createEmptyCompoundedV2 } from '../../../modules/receituario-vet/compoundedV2'
import { mapCompoundedV2ToPrescriptionItem } from '../../../modules/receituario-vet/compoundedV2Mapper'

const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'

function makeItem(name: string, controlled: boolean) {
  const v2 = createEmptyCompoundedV2()
  v2.formula.id = crypto.randomUUID()
  v2.formula.name = name
  v2.formula.sale_classification = controlled ? 'controlled' : 'free'
  v2.formula.control_type = controlled ? 'receita_controlada' : null
  v2.formula.pharmaceutical_form = controlled ? 'Cápsula' : 'Suspensão oral'
  v2.formula.administration_unit = controlled ? 'cápsula' : 'mL'
  v2.ingredients[0].name = controlled ? 'Trazodona' : 'Condroitina'
  v2.ingredients[0].amount = controlled ? 50 : 100
  v2.regimens[0].usage_instruction = controlled
    ? 'Administrar 1 cápsula a cada 12 horas.'
    : 'Administrar 1 mL a cada 12 horas.'
  return v2
}

const free = mapCompoundedV2ToPrescriptionItem({
  v2: makeItem('Livre', false),
  patient: null,
})

const controlled = mapCompoundedV2ToPrescriptionItem({
  v2: makeItem('Controlado', true),
  patient: null,
})

const result = {
  ok: Boolean(!free.is_controlled && controlled.is_controlled),
  free: {
    is_controlled: free.is_controlled,
    control_type: free.control_type || '',
  },
  controlled: {
    is_controlled: controlled.is_controlled,
    control_type: controlled.control_type || '',
  },
}

fs.writeFileSync(path.join(outDir, 'manipulados-controlled-proof.json'), JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
