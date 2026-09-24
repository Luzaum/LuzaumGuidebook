import fs from 'node:fs';
import {medicationsSeed} from '../modules/consulta-vet/data/seed/medications.seed';
const refs=medicationsSeed.flatMap(m=>(m.references??[]).filter(r=>r.url?.includes('pubmed.ncbi.nlm.nih.gov/')).map(r=>({slug:m.slug,...r,pmid:r.url!.match(/gov\/(\d+)/)?.[1]}))).filter(r=>r.pmid);
const ids=[...new Set(refs.map(r=>r.pmid))];
const result=await fetch('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id='+ids.join(','));
const data=await result.json();fs.writeFileSync('tmp/medication-review/pubmed-audit.json',JSON.stringify({refs,data},null,2));
for(const r of refs) console.log(r.slug+' | '+r.id+' | '+r.pmid+' | '+(data.result?.[r.pmid!]?.title??'UNAVAILABLE')+' | CITED: '+r.citationText);
