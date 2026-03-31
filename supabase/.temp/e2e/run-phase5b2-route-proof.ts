import fs from 'node:fs'
import path from 'node:path'
import { buildPrescriptionStateFromNovaReceita2 } from '../../../modules/receituario-vet/novaReceita2Adapter'
import { renderRxToPrintDoc } from '../../../modules/receituario-vet/rxRenderer'
import type { NovaReceita2State } from '../../../modules/receituario-vet/NovaReceita2Page'

const outDir = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e'

const state: NovaReceita2State = {
  id: 'phase5b2-route',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  clinicId: '',
  prescriber: { id: '', name: 'Dr. Teste', crmv: '0000', state: 'SP' },
  tutor: { name: 'Tutor Teste' } as any,
  patient: { id: 'p1', name: 'Paciente Teste', species: 'Canina', weight_kg: 5 } as any,
  items: [
    {
      id: 'item-oral',
      kind: 'standard',
      name: 'Benazepril teste',
      dose: '2,5 mg',
      route: 'VO',
      frequency: 'a cada 24 horas',
      duration: '14 dias',
      presentation_metadata: {
        print_line_mode: 'manual',
        print_line_left: 'Benazepril 2,5 mg/biscoito',
        print_line_right: 'Biscoito medicamentoso',
      },
      cautionsText: '',
      cautions: [],
      inheritStartFromPrescription: true,
    } as any,
  ],
  recommendations: '',
  examJustification: '',
  exams: [],
  templateId: '',
  printTemplateId: '',
  quickMode: false,
  defaultStartDate: '2026-03-30',
  defaultStartHour: '20:00',
} as any

const prescription = buildPrescriptionStateFromNovaReceita2(state)
const doc = renderRxToPrintDoc(prescription)
const firstItem = prescription.items[0]
const oralSection = doc.sections.find((section) => section.key === 'ORAL')

const result = {
  ok: firstItem?.routeGroup === 'ORAL' && !!oralSection && oralSection.items[0]?.subtitle === 'Biscoito medicamentoso',
  routeGroup: firstItem?.routeGroup,
  oralSectionTitle: oralSection?.title || '',
  rightSideText: oralSection?.items[0]?.subtitle || '',
  instruction: oralSection?.items[0]?.instruction || '',
}

fs.writeFileSync(path.join(outDir, 'phase5b2-route-proof.json'), JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
