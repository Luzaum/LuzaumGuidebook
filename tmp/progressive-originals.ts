import { diseasesSeed } from '../modules/consulta-vet/data/seed/diseases.seed';
import { medicationsSeed } from '../modules/consulta-vet/data/seed/medications.seed';
import { writeFileSync } from 'node:fs';
const records=[...diseasesSeed.map(d=>({slug:d.slug,simple:d.plainLanguage?.whatIsIt,lead:d.quickSummaryRich?.lead,pillars:d.quickSummaryRich?.pillars?.map(p=>({title:p.title,text:p.body}))??[]})),...medicationsSeed.map(m=>({slug:m.slug,simple:m.plainLanguageSummary,lead:m.mechanismOfAction,pillars:m.pillars?.map(p=>({title:p.title,text:p.desc}))??[]}))];
writeFileSync('tmp/progressive-originals.json',JSON.stringify(records,null,2));
console.log(records.map(r=>`${r.slug}: ${r.pillars.map(p=>p.title).join(' | ')}`).join('\n'));
console.log('total pillars',records.reduce((n,r)=>n+r.pillars.length,0));
