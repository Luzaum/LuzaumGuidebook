import fs from 'node:fs';const {refs,data}=JSON.parse(fs.readFileSync('tmp/medication-review/pubmed-audit.json','utf8'));
for(const r of refs){const t=data.result?.[r.pmid]?.title??'UNAVAILABLE'; console.log(r.slug+' | '+r.id+' | '+r.pmid+' | '+t);}
