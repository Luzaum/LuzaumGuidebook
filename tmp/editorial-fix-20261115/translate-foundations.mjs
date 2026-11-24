import fs from 'node:fs';
for(const file of ['modules/consulta-vet/data/medicationBookFoundations.ts','modules/consulta-vet/data/conciseClinicalSummaries.ts']){
 let text=fs.readFileSync(file,'utf8');
 const backup='tmp/editorial-fix-20261115/'+file.replaceAll('/','__');
 if(!fs.existsSync(backup))fs.writeFileSync(backup,text);
 text=text.replace(/ \(steady-state\)/g,'').replace(/ \("washout"\)/g,'').replace(/período de washout/g,'período de suspensão').replace(/washout/g,'intervalo de suspensão');
 fs.writeFileSync(file,text);
}
