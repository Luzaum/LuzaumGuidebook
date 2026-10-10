import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { medicationsSeed } from '../../modules/consulta-vet/data/seed/medications.seed';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';

const before = JSON.parse(readFileSync('output/corrections-2026-10-09/catalog-before.json', 'utf8'));
const changes: {slug:string; fields:string[]}[] = [];
assert.equal(medicationsSeed.length, before.medications.length);
assert.equal(diseasesSeed.length, before.diseases.length);
for (const previous of before.medications) {
  const current = medicationsSeed.find(item => item.id === previous.id)!;
  assert.ok(current, previous.id);
  const changed = Object.keys(previous).filter(key => JSON.stringify(previous[key]) !== JSON.stringify((current as any)[key]));
  if (changed.length) changes.push({slug:previous.slug, fields:changed});
  const mutable = new Set(['references','clinicalFoundationsData','attentionData','generalInfoData','doses','contraindications','cautions']);
  for (const key of Object.keys(previous)) if (!mutable.has(key)) assert.deepEqual((current as any)[key], previous[key], `${previous.slug}/${key}`);
  assert.equal(current.doses.length, previous.doses.length, previous.slug);
  for (const [index, dose] of previous.doses.entries()) {
    const actual = current.doses[index];
    assert.ok(actual, dose.id);
    for (const key of Object.keys(dose)) if (key !== 'notes') assert.deepEqual((actual as any)[key], dose[key], `${previous.slug}/${dose.id}/${key}`);
  }
  for (const ref of previous.references ?? []) assert.ok(current.references?.some(item => item.id === ref.id), `${previous.slug}/${ref.id}`);
  for (const key of ['contraindications','cautions']) for (const warning of previous[key] ?? []) assert.ok((current as any)[key]?.includes(warning), `${previous.slug}/${key}/${warning}`);
}
for (const previous of before.diseases) {
  const current = diseasesSeed.find(item => item.id === previous.id)!;
  assert.ok(current, previous.id);
  for (const key of Object.keys(previous)) assert.deepEqual((current as any)[key], previous[key], `${previous.slug}/${key}`);
}
const report = {medications:medicationsSeed.length,diseases:diseasesSeed.length, allPreviousRecordIds:true, allPreviousReferenceIds:true, dosesAndCalculationsUnchanged:true, diseaseContentUnchanged:true, changedMedicationFields:changes};
writeFileSync('output/corrections-2026-10-09/preservation.json', JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
