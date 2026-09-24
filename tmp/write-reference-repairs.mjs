import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync('tmp/medication-review/verified-reference-corrections.json','utf8'));
for(const entries of Object.values(data))for(const r of Object.values(entries))r.citationText=r.citationText.replace('et al..','et al.');
const header=`import type { EditorialReference } from '../types/common';\nimport type { MedicationRecord } from '../types/medication';\n\n/** Metadados conferidos via NCBI ESummary; não validam números de resumos antigos. */\nconst corrections: Record<string, Record<string, EditorialReference>> = `;
const tail=`;

const withdrawn: Record<string, string[]> = {
  dipirona: ['ref-ferreira-2019', 'ref-steagall-2020', 'ref-giorgi-repeated-2018'],
  fenobarbital: ['ref-bailey-feline-2009', 'ref-gizzi-tdm-2020'],
};

export function repairMedicationReferences(medication: MedicationRecord): MedicationRecord {
  const replacements = corrections[medication.slug] ?? {};
  const removed = new Set(withdrawn[medication.slug] ?? []);
  const keepIds = (ids: string[]) => ids.filter((id) => !removed.has(id));
  return {
    ...medication,
    references: medication.references?.filter((ref) => !removed.has(ref.id ?? '')).map((ref) => replacements[ref.id ?? ''] ?? ref),
    doses: medication.doses.map((dose) => ({ ...dose, referenceIds: dose.referenceIds ? keepIds(dose.referenceIds) : undefined })),
    detailedIndications: medication.detailedIndications?.map((item) => ({ ...item, referenceIds: keepIds(item.referenceIds) })),
    // Resumos das referências incorretas precisam de nova leitura, não só de uma URL nova.
    clinicalStudiesCommented: medication.clinicalStudiesCommented?.filter((study) =>
      !removed.has(study.referenceId ?? '') && !replacements[study.referenceId ?? '']),
  };
}
`;
fs.writeFileSync('modules/consulta-vet/data/medicationReferenceCorrections.ts',header+JSON.stringify(data,null,2)+tail);
