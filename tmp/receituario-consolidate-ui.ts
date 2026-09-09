import {readFileSync,writeFileSync,existsSync} from 'node:fs';
const files=[...Array.from({length:7},(_,i)=>`tmp/receituario-add-sweep-${String(i+1).padStart(2,'0')}.log`),'tmp/receituario-add-sweep-retry.log','tmp/receituario-add-sweep-retry2.log'];
const attempts:any[]=[];
for(const file of files){
 if(!existsSync(file))continue;
 const lines=readFileSync(file,'utf8').replace(/^\uFEFF/,'').split(/\r?\n/);
 const start=lines.indexOf('### Result');
 if(start<0||!lines[start+1])continue;
 const data=JSON.parse(lines[start+1]);
 attempts.push(...data.results.map((result:any)=>({...result,evidence:file})));
}
const latest=[...new Map(attempts.map(item=>[item.id,item])).values()];
const cases=latest.flatMap(item=>item.cases);
const report={date:'2026-09-07',scope:'Interações automatizadas nos componentes reais isolados; frequência e duração fictícias de teste. Não substitui revisão clínica nem fluxo autenticado. Tentativas com timeout permanecem pendentes.',
 medicationsAttempted:latest.length,cases:cases.length,insertions:cases.filter(item=>item.inserted).length,invalidNumbers:cases.filter(item=>item.invalidNumber).length,
 unresolved:latest.filter(item=>item.error).map(({title,error,selected})=>({title,error,selected})),results:latest,attempts};
writeFileSync('docs/receituario-ui-additions-2026-09-07.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({...report,results:undefined,attempts:undefined},null,2));
