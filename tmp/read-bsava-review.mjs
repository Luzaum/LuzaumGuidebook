import fs from 'node:fs';const p=JSON.parse(fs.readFileSync('tmp/medication-review/bsava-pages.json','utf8'));
for(const n of ['Amoxicillin','Ampicillin','Capromorelin','Dipyrone','Metamizole','Aluminium hydroxide','Pradofloxacin','Prednisolone','Trimethoprim']){console.log(n, p.flatMap((t,i)=>t.includes(n)?[i+1]:[]).join(','));}
for(const i of [19,70,108,163,233,243,267,268,271,331,427]) console.log('\nPDF PAGE '+i+'\n'+p[i-1]);
