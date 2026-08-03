import { RECEITUARIO_INFECTOLOGIA_MODELS } from '../modules/consulta-vet/data/receituarioInfectologiaModels';
import { RECEITUARIO_PROTOCOL_MODELS } from '../modules/consulta-vet/data/receituarioProtocolModels';
import { evaluateClinicalMedicationCatalogStatus, resolveClinicalMedicationSource } from '../modules/consulta-vet/utils/clinicalMedicationCatalogBridge';
import type { ClinicalMedicationDefinition } from '../modules/consulta-vet/types/receituario';

type Entry = {
  modelId: string;
  modelTitle: string;
  optionKey: string;
  medicationKey: string;
  name: string;
  species: string;
  editorial: boolean;
  commercial: boolean;
  editable: boolean;
  needsRegistration: boolean;
  reason?: string;
  targets: string[];
};

function collectMedications(): Entry[] {
  const rows: Entry[] = [];
  const templates = [...RECEITUARIO_PROTOCOL_MODELS, ...RECEITUARIO_INFECTOLOGIA_MODELS];

  for (const template of templates) {
    const model = template.structured_defaults?.clinical_model;
    if (!model) continue;
    const species = template.species === 'ambos' ? 'cão' : template.species;

    for (const option of model.options) {
      for (const medication of option.medications || []) {
        const alternatives = medication.doseAlternatives?.length
          ? medication.doseAlternatives.map((item) => ({ key: item.key, med: medication }))
          : [{ key: undefined as string | undefined, med: medication }];

        for (const alt of alternatives) {
          const status = evaluateClinicalMedicationCatalogStatus(medication, species, alt.key);
          const resolved: ClinicalMedicationDefinition = alt.key
            ? { ...medication, dose: medication.doseAlternatives!.find((item) => item.key === alt.key)!.dose }
            : medication;
          const source = resolveClinicalMedicationSource(resolved);

          rows.push({
            modelId: template.id,
            modelTitle: template.title,
            optionKey: option.key,
            medicationKey: medication.key,
            name: medication.name,
            species,
            editorial: source.kind === 'editorial',
            commercial: source.kind === 'commercial',
            editable: status.editable,
            needsRegistration: status.needsRegistration,
            reason: status.reason,
            targets: status.registrationTargets,
          });
        }
      }
    }
  }

  return rows;
}

function uniqueByName(rows: Entry[]) {
  const map = new Map<string, Entry[]>();
  for (const row of rows) {
    const key = row.name.toLowerCase();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(row);
  }
  return map;
}

const rows = collectMedications();
const missing = rows.filter((row) => row.needsRegistration);
const missingEditorial = missing.filter((row) => row.targets.includes('medicamentos'));
const missingCommercial = missing.filter((row) => row.targets.includes('comerciais'));

console.log('=== MEDICAMENTOS SEM CADASTRO (modelos clínicos) ===\n');
console.log(`Total de entradas analisadas: ${rows.length}`);
console.log(`Precisam cadastro: ${missing.length}\n`);

console.log('--- Sem monografia no Consulta Medicamentos ---');
for (const [name, items] of uniqueByName(missingEditorial)) {
  const sample = items[0];
  console.log(`• ${sample.name}`);
  console.log(`  Motivo: ${sample.reason}`);
  console.log(`  Modelos: ${Array.from(new Set(items.map((item) => item.modelTitle))).join('; ')}`);
}

console.log('\n--- Sem produto comercial vinculado / catálogo comercial ---');
for (const [name, items] of uniqueByName(missingCommercial)) {
  const sample = items[0];
  console.log(`• ${sample.name}`);
  console.log(`  Motivo: ${sample.reason}`);
  console.log(`  Modelos: ${Array.from(new Set(items.map((item) => item.modelTitle))).join('; ')}`);
}

console.log('\n--- Cadastrados e editáveis ---');
for (const [name, items] of uniqueByName(rows.filter((row) => row.editable))) {
  const sample = items[0];
  const via = sample.editorial ? 'monografia' : sample.commercial ? 'comercial' : 'manual';
  console.log(`• ${sample.name} (${via})`);
}
