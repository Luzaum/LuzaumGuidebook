import fs from 'node:fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
for (const name of fs.readdirSync('C:/LIVROS').filter(n=>n.startsWith("Plumb's")||n.startsWith('BSAVA Small Animal Formulary, Part A'))) {
 const pdf=await pdfjs.getDocument({data:new Uint8Array(fs.readFileSync('C:/LIVROS/'+name)),useSystemFonts:true}).promise;
 const hits=[];
 for(let i=1;i<=pdf.numPages;i++) {const p=await pdf.getPage(i); const c=await p.getTextContent(); const t=c.items.map(x=>x.str||'').join(' '); if(/relative.*potenc|glucocorticoid.*potenc|prednisolone.*dexamethasone/i.test(t)&&/cortico|predni/i.test(t))hits.push({page:i,text:t}); p.cleanup();}
 fs.writeFileSync('tmp/corticoide/'+(name.startsWith('Plumb')?'plumb':'bsava')+'.json',JSON.stringify(hits,null,2)); console.log(name,hits.map(x=>x.page));
}
