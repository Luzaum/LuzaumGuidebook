import fs from 'node:fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
const root='C:/LIVROS/';
for (const prefix of ['Greenes','Plumb','BSAVA Manual of Canine and Feline Nephrology']) {
 const name=fs.readdirSync(root).find(n=>n.startsWith(prefix));
 const doc=await pdfjs.getDocument({data:new Uint8Array(fs.readFileSync(root+name)),useSystemFonts:true}).promise;
 const rows=[];
 async function walk(items){for(const item of items||[]){if(/distemper|cyclosporine|cyproheptadine|meloxicam|micturition|voiding/i.test(item.title)){const dest=typeof item.dest==='string'?await doc.getDestination(item.dest):item.dest;rows.push({title:item.title,page:dest?await doc.getPageIndex(dest[0])+1:null});}await walk(item.items);}}
 await walk(await doc.getOutline());
 console.log(name,JSON.stringify(rows));
 if(!rows.length){let txt='';for(let p=1;p<=18;p++){const page=await doc.getPage(p);txt+=`\nPAGE ${p}\n`+(await page.getTextContent()).items.map(x=>x.str).join(' ');}fs.writeFileSync(`tmp/editorial-fix-20261115/${prefix.split(' ')[0]}-toc.txt`,txt);}
 await doc.destroy();
}
