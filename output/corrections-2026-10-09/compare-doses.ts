import { readFileSync } from 'node:fs';
import { medicationsSeed } from '../../modules/consulta-vet/data/seed/medications.seed';
const before=JSON.parse(readFileSync('output/corrections-2026-10-09/catalog-before.json','utf8'));
for (const record of medicationsSeed) {
 const old=before.medications.find((r:any)=>r.id===record.id);
 const changes=record.doses.flatMap((dose,i)=>Object.keys(old.doses[i]??{}).filter(k=>k!=='notes' && JSON.stringify((dose as any)[k])!==JSON.stringify(old.doses[i][k])).map(k=>({id:dose.id,key:k,before:old.doses[i][k],after:(dose as any)[k]})));
 if(changes.length) console.log(JSON.stringify({slug:record.slug,changes}));
}
