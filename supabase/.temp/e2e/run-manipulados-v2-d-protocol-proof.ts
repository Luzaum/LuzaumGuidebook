import fs from 'node:fs'
import { parseClinicalTextImport } from '../../../modules/receituario-vet/compoundedClinicalText'
import { importParsedClinicalToV2, v2ManipulatedToPersistence } from '../../../modules/receituario-vet/compoundedV2'
import { mapCompoundedToProtocolMedicationV2 } from '../../../modules/receituario-vet/compoundedV2Mapper'
import { mapProtocolMedicationToPrescriptionItem } from '../../../modules/receituario-vet/protocolMapper'

const outFile = 'C:/PROJETOS VET/Vetius/supabase/.temp/e2e/manipulados-v2-d-protocol-proof.json'

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
      is_active: true,
    },
    ingredients: [],
    regimens: persisted.regimens.map((regimen, index) => ({
      id: regimen.id || crypto.randomUUID(),
      clinic_id: 'clinic-proof',
      compounded_medication_id: v2.formula.id,
      sort_order: index,
      ...regimen,
    })),
  }
}

const parsed = parseClinicalTextImport(`Benazepril Biscoito
Cães apresentando quadro estável
Benazepril 0,5 mg/kg/biscoito/VO
Biscoitos q.s.p. 30 unidades
Modo de uso: Administrar 1 biscoito a cada 24h.`)
const v2 = importParsedClinicalToV2(parsed)
const bundle = makeBundleFromV2(v2)

const protocolMed = mapCompoundedToProtocolMedicationV2({
  bundle: bundle as never,
  sortOrder: 0,
  regimenId: v2.regimens[0]?.id,
})

protocolMed.dose_value = 0.5
protocolMed.dose_unit = 'mg/kg'
protocolMed.route = 'VO'
protocolMed.times_per_day = 2
protocolMed.interval_hours = null
protocolMed.duration_days = 30
protocolMed.metadata = {
  ...(protocolMed.metadata || {}),
  notes: 'Ajustar conforme pressão arterial e reavaliação clínica.',
}

const rxItem = mapProtocolMedicationToPrescriptionItem(protocolMed)

fs.writeFileSync(outFile, JSON.stringify({
  protocolMedication: protocolMed,
  appliedPrescriptionItem: {
    kind: rxItem.kind,
    name: rxItem.name,
    route: rxItem.route,
    dose: rxItem.dose,
    frequency: rxItem.frequency,
    frequencyMode: rxItem.frequencyMode,
    timesPerDay: rxItem.timesPerDay,
    duration: rxItem.duration,
    durationMode: rxItem.durationMode,
    durationValue: rxItem.durationValue,
    cautionsText: rxItem.cautionsText,
    compoundedMedicationId: rxItem.kind === 'compounded' ? rxItem.compounded_medication_id : null,
    compoundedRegimenId: rxItem.kind === 'compounded' ? rxItem.compounded_regimen_id : null,
  },
}, null, 2))

console.log(outFile)
