import { medicationsSeed } from '../../modules/consulta-vet/data/seed/medications.seed';
for (const record of medicationsSeed) {
  const ids = new Set(record.references?.map(ref => ref.id));
  const missing = new Set([...record.doses, ...(record.detailedIndications ?? [])].flatMap(item => item.referenceIds ?? []).filter(id => !ids.has(id)));
  if (missing.size) console.log(JSON.stringify({slug:record.slug, missing:[...missing], refs:record.references?.map(r=>({id:r.id,citation:r.citationText?.slice(0,160)}))}));
}
