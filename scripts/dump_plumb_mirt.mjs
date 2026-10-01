import fs from 'node:fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

async function main() {
  const plumbPath = "C:/Users/luzau/OneDrive/Documentos/Livros/Plumb's Veterinary Drug Handbook, 10th edition.pdf";
  const data = new Uint8Array(fs.readFileSync(plumbPath));
  const pdf = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;
  let fullText = '';
  for (let p = 920; p <= 923; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const text = content.items.map(it => ('str' in it ? it.str : '')).join(' ');
    fullText += `\n\n=== PDF PAGE ${p} ===\n\n` + text;
  }
  fs.writeFileSync('scripts/plumb_mirtazapine.txt', fullText, 'utf8');
  console.log('Saved scripts/plumb_mirtazapine.txt');
}

main().catch(console.error);
