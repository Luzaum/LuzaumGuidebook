import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { medicationsSeed } from '../../modules/consulta-vet/data/seed/medications.seed';
import { translateEditorialSubsectionKey } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';
import { writeFileSync } from 'node:fs';
const sections = ['etiology','epidemiology','pathogenesisTransmission','pathophysiology','clinicalSignsPathophysiology','diagnosis','treatment','prognosis','prevention'];
const skip = /references|editorialReferences|url|doi|authors|citation|image|src|referenceId|highlights/i;
const suspicious = /\b(findings|system|physical|exam|meaning|red|flags|overview|pitfalls|workup|workflow|take|home|key|points|monitoring|management|risk|factors|supportive|care|follow|up|approach|pearls|baseline)\b/i;
const labels:any[] = [], duplicates:any[] = [], coexist:any[] = [], terms:any[] = [];
for(const [kind, records] of [['doenca', diseasesSeed], ['medicamento',medicationsSeed]] as const) {
 for(const r of records) {
  const seen = new Map<string,string[]>();
  function walk(v:any,p:string) {
   if(typeof v === 'string') {
    const n=v.replace(/\{\{ref:[^}]+\}\}/g,'').replace(/\s+/g,' ').trim();
    if(n.length>=100) seen.set(n,[...(seen.get(n)||[]),p]);
    if(/\b(washout|steady[- ]state|chewing-gum fits|hard pad|take.home|red flags|follow-up|gold standard)\b/i.test(v)) terms.push({kind,slug:r.slug,path:p,text:v});
   } else if(Array.isArray(v)) v.forEach((x,i)=>walk(x,`${p}[${i}]`));
   else if(v && typeof v==='object') for(const [k,x] of Object.entries(v)) {
    if(skip.test(k)) continue;
    if(kind==='doenca' && sections.includes(p.split('.')[0]) && !/\[/.test(p)) {
     const label=translateEditorialSubsectionKey(k);
     if(suspicious.test(label)) labels.push({slug:r.slug,path:`${p}.${k}`,key:k,label});
    }
    walk(x,p?`${p}.${k}`:k);
   }
  }
  walk(r,'');
  for(const [text,paths] of seen) if(paths.length>1) duplicates.push({kind,slug:r.slug,text,paths});
  const cs:any=(r as any).clinicalSignsPathophysiology;
  if(cs && !Array.isArray(cs) && cs.findingsBySystem) coexist.push({slug:r.slug,keys:Object.keys(cs),groups:cs.findingsBySystem.length});
 }
}
const result={scope:{diseases:diseasesSeed.length,medications:medicationsSeed.length},labels,duplicates,coexist,terms};
writeFileSync(process.argv[2] || 'output/audits/editorial-language-audit-2026-11-15.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({scope:result.scope,labels:labels.reduce((a:any,x:any)=>{(a[x.label]??=[]).push(x.slug);return a},{}),duplicatePrecautionExplanations:duplicates.filter(x=>x.paths.some((p:string)=>p.endsWith('.condition'))&&x.paths.some((p:string)=>p.endsWith('.physiologicalExplanation'))).length,coexist,termRecords:[...new Set(terms.map(x=>x.slug))]},null,2));
