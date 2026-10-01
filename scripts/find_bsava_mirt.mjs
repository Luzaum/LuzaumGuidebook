import fs from 'node:fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

async function main() {
  const bsavaPath = "C:/Users/luzau/OneDrive/Documentos/Livros/BSAVA Small Animal Formulary, Part A, Canine and Feline, 10th Edition (VetBooks.ir).pdf";
  const data = new Uint8Array(fs.readFileSync(bsavaPath));
  const pdf = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;
  console.log(`BSAVA total pages: ${pdf.numPages}`);
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const text = content.items.map(it => ('str' in it ? it.str : '')).join(' ');
    if (text.includes('Mirtazapine') && (text.includes('Formulary') || text.includes('DOSE') || text.includes('Doses') || text.includes('Action:'))) {
      console.log(`BSAVA: Matched on PDF page ${p}:`);
      console.log(text.substring(0, 400));
      console.log('=================================');
    }
  }
}

main().catch(console.error);
