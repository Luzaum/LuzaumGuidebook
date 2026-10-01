import fs from 'node:fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

async function main() {
  const bsavaPath = "C:/Users/luzau/OneDrive/Documentos/Livros/BSAVA Small Animal Formulary, Part A, Canine and Feline, 10th Edition (VetBooks.ir).pdf";
  const data = new Uint8Array(fs.readFileSync(bsavaPath));
  const pdf = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;
  let fullText = '';
  for (let p of [286, 287]) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const text = content.items.map(it => ('str' in it ? it.str : '')).join(' ');
    fullText += `\n\n=== BSAVA PDF PAGE ${p} ===\n\n` + text;
  }
  fs.writeFileSync('scripts/bsava_mirtazapine.txt', fullText, 'utf8');
  console.log('Saved scripts/bsava_mirtazapine.txt');
}

main().catch(console.error);
