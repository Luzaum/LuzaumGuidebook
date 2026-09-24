import fs from 'node:fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
const root='C:/Users/luzau/OneDrive/Documentos/Livros/';
const name=fs.readdirSync(root).find(n=>n.startsWith('BSAVA Small Animal Formulary'));
const pdf=await pdfjs.getDocument({data:new Uint8Array(fs.readFileSync(root+name)),useSystemFonts:true}).promise;
const pages=[];
for(let i=1;i<=pdf.numPages;i++) {const p=await pdf.getPage(i);const c=await p.getTextContent();pages.push(c.items.map(x=>x.str).join(' '));}
fs.mkdirSync('tmp/medication-review',{recursive:true});
fs.writeFileSync('tmp/medication-review/bsava-pages.json',JSON.stringify(pages));
const names=['Acetylcysteine','Amoxicillin','Ampicillin','Buprenorphine','Capromorelin','Clindamycin','Dipyrone','Enrofloxacin','Phenobarbital','Aluminium','Levetiracetam','Meloxicam','Methadone','Pradofloxacin','Prednisolone','Tramadol','Trimethoprim','Pronefra'];
for(const n of names) console.log(n+': '+pages.flatMap((p,i)=>p.slice(0,420).toLowerCase().includes(n.toLowerCase())?[i+1]:[]).join(','));
