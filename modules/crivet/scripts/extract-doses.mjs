import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';

const ACERVO = 'C:\\Users\\luzau\\OneDrive\\Desktop\\Livros';
const CACHE_DIR = path.resolve('scripts/.acervo-cache');

const BOOKS = {
  lumbJones: path.join(ACERVO, 'Lumb and Jones.pdf'),
  plumbs: path.join(ACERVO, "Plumb's Veterinary Drug Handbook, 10th edition.pdf"),
  ettinger: path.join(ACERVO, "Ettinger's Textbook of Veterinary Internal Medicine,9ed 2024.pdf"),
};

const DRUGS = [
  'fentanyl', 'morphine', 'ketamine', 'propofol', 'lidocaine',
  'dexmedetomidine', 'midazolam', 'diazepam', 'dopamine', 'dobutamine',
  'epinephrine', 'norepinephrine', 'vasopressin',
];

const DOSE_RE = /\d+(?:[.,]\d+)?\s*(?:–|-|\sto\s)\s*\d+(?:[.,]\d+)?\s*(?:mcg|µg|mg|mU|U)\/(?:kg(?:\/(?:min|h))?|h)/gi;

async function loadText(key, file) {
  const cacheFile = path.join(CACHE_DIR, `${key}.txt`);
  if (fs.existsSync(cacheFile)) {
    return fs.readFileSync(cacheFile, 'utf8');
  }
  if (!fs.existsSync(file)) return '';
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const parser = new PDFParse({ data: fs.readFileSync(file) });
  const { text } = await parser.getText();
  await parser.destroy();
  fs.writeFileSync(cacheFile, text, 'utf8');
  return text;
}

function findDoseContexts(text, drug) {
  const lower = text.toLowerCase();
  const term = drug.toLowerCase();
  const results = [];
  let pos = 0;

  while (results.length < 8) {
    const idx = lower.indexOf(term, pos);
    if (idx === -1) break;
    pos = idx + term.length;
    const window = text.slice(Math.max(0, idx - 350), Math.min(text.length, idx + 450));
    const doses = window.match(DOSE_RE) ?? [];
    if (doses.length === 0) continue;
    results.push({
      doses: [...new Set(doses.map((d) => d.replace(/\s+/g, ' ')))],
      context: window.replace(/\s+/g, ' ').trim(),
    });
  }

  return results;
}

for (const [key, file] of Object.entries(BOOKS)) {
  console.log(`\n${'='.repeat(70)}\n${key.toUpperCase()}\n${'='.repeat(70)}`);
  const text = await loadText(key, file);
  if (!text) {
    console.log('Arquivo indisponível.');
    continue;
  }
  console.log(`Texto: ${text.length} caracteres`);

  for (const drug of DRUGS) {
    const hits = findDoseContexts(text, drug);
    if (hits.length === 0) continue;
    console.log(`\n### ${drug.toUpperCase()} ###`);
    hits.slice(0, 3).forEach((hit, i) => {
      console.log(`  [${i + 1}] Doses: ${hit.doses.join(' | ')}`);
      console.log(`      ${hit.context.slice(0, 280)}...`);
    });
  }

  for (const proto of ['MLK', 'FLK', 'morphine-lidocaine-ketamine', 'fentanyl-lidocaine']) {
    const idx = text.toLowerCase().indexOf(proto.toLowerCase());
    if (idx === -1) continue;
    const snippet = text.slice(Math.max(0, idx - 120), Math.min(text.length, idx + 400)).replace(/\s+/g, ' ').trim();
    console.log(`\n### PROTO ${proto} ###\n${snippet}`);
  }
}
