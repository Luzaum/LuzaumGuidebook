import fs from 'node:fs';import {medicationsSeed} from '../modules/consulta-vet/data/seed/medications.seed';
const refs=medicationsSeed.flatMap(m=>(m.references??[]).filter((r:any)=>r.pmid).map((r:any)=>({slug:m.slug,...r})));
const d=await(await fetch('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id='+refs.map(r=>r.pmid).join(','))).json();
fs.writeFileSync('tmp/medication-review/structured-pmid-audit.json',JSON.stringify({refs,d},null,2));
for(const r of refs) console.log(r.id+' | '+r.title+' | ACTUAL '+d.result?.[r.pmid]?.title);
for(const m of medicationsSeed){const ids=new Set(m.references?.map(r=>r.id));for(const x of [...m.doses,...(m.detailedIndications??[])])for(const id of x.referenceIds??[])if(!ids.has(id))console.log('MISSING '+m.slug+' '+id);}
