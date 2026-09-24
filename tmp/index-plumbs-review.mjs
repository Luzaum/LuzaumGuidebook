import fs from 'node:fs';
const pages=fs.readFileSync('tmp/pdfs/plumbs-10/plumbs-10.txt','utf8').split(/===== PDF_PAGE_\d+ =====/);
for(const term of ['Acetylcysteine','Amoxicillin/Clavulanate','Ampicillin/Sulbactam','Buprenorphine','Capromorelin','Clindamycin','Dipyrone','Enrofloxacin','Phenobarbital','Aluminum Hydroxide','Levetiracetam','Meloxicam','Methadone','Pradofloxacin','PrednisoLONE','Sulfa-/Trimethoprim','TraMADol']) {
const found=[];for(let i=30;i<pages.length;i++){let t=pages[i];if(t.slice(0,110).toLowerCase().includes(term.toLowerCase()))found.push(i);}console.log(term,found.join(','));
}
