import fs from 'node:fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
const root='C:/LIVROS/';
for(const [prefix,pages] of [['Greenes',[926,927,928,929,930,931,932,933,934,935,936,937,938,939,940,941,942,943,944,945,946]],['Plumb',[349,350,354,355,852,853,854]]]) {
 const name=fs.readdirSync(root).find(n=>n.startsWith(prefix));
 const doc=await pdfjs.getDocument({data:new Uint8Array(fs.readFileSync(root+name)),useSystemFonts:true}).promise;
 let txt='';for(const p of pages){const pg=await doc.getPage(p); const t=(await pg.getTextContent()).items.map(x=>x.str).join(' ');txt+=`\nPDF PAGE ${p}\n${t}\n`;}
 fs.writeFileSync(`tmp/editorial-fix-20261115/${prefix}-consulted.txt`,txt);
 console.log(prefix,txt.match(/.{0,180}(clinical signs|myoclonus|enamel|steady.state|washout|contraindications).{0,450}/gi)?.slice(0,14)); await doc.destroy();
}
