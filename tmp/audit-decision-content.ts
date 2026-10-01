import { diseasesSeed } from '../modules/consulta-vet/data/seed/diseases.seed';
import { writeFileSync } from 'node:fs';
writeFileSync('tmp/decision-content-audit.json',JSON.stringify(diseasesSeed.map(d=>({slug:d.slug,strip:d.quickDecisionStrip,pillars:d.quickSummaryRich?.pillars?.map(x=>x.title)})),null,2));
console.log(diseasesSeed.map(d=>d.slug+': '+d.quickDecisionStrip.map((s,i)=>i+' '+s).join(' | ')).join('\n'));
