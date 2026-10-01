import fs from 'node:fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

async function main() {
  const plumbPath = "C:/Users/luzau/OneDrive/Documentos/Livros/Plumb's Veterinary Drug Handbook, 10th edition.pdf";
  if (!fs.existsSync(plumbPath)) {
    console.log('Plumb not found');
    return;
  }
  const data = new Uint8Array(fs.readFileSync(plumbPath));
  const pdf = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;
  console.log(`Plumb total pages: ${pdf.numPages}`);
  for (let p = 870; p <= 930; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const text = content.items.map(it => ('str' in it ? it.str : '')).join(' ');
    if (text.includes('MIRTAZAPINE') || text.includes('Mirtazapine')) {
      console.log(`Plumb: Matched on PDF page ${p}:`);
      console.log(text.substring(0, 300));
      console.log('=================================');
    }
  }
}

main().catch(console.error);
