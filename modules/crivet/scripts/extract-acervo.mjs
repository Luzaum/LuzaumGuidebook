import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';

const ACERVO = 'C:\\Users\\luzau\\OneDrive\\Desktop\\Livros';

const BOOKS = {
  lumbJones: {
    file: path.join(ACERVO, 'Lumb and Jones.pdf'),
    label: 'Lumb & Jones — Veterinary Anesthesia and Analgesia',
  },
  plumbs: {
    file: path.join(ACERVO, "Plumb's Veterinary Drug Handbook, 10th edition.pdf"),
    label: "Plumb's Veterinary Drug Handbook, 10ª ed.",
  },
  ettinger: {
    file: path.join(ACERVO, "Ettinger's Textbook of Veterinary Internal Medicine,9ed 2024.pdf"),
    label: "Ettinger's Textbook of Veterinary Internal Medicine, 9ª ed. (medicina interna)",
  },
};

const SEARCH = [
  'fentanyl',
  'morphine',
  'ketamine',
  'propofol',
  'lidocaine',
  'dexmedetomidine',
  'midazolam',
  'diazepam',
  'dopamine',
  'dobutamine',
  'epinephrine',
  'norepinephrine',
  'vasopressin',
  'MLK',
  'FLK',
];

async function extractBook({ file, label }) {
  if (!fs.existsSync(file)) {
    console.log(`\n[SKIP] ${label}\nArquivo ausente: ${file}`);
    return null;
  }

  console.log(`\n${'='.repeat(72)}\n${label}\n${'='.repeat(72)}`);
  const buffer = fs.readFileSync(file);
  const parser = new PDFParse({ data: buffer });
  const info = await parser.getInfo();
  const textResult = await parser.getText();
  await parser.destroy();

  const text = textResult.text ?? '';
  console.log(`Páginas: ${info.total}, caracteres extraídos: ${text.length}`);

  if (text.length < 500) {
    console.log('AVISO: pouco texto — PDF pode ser escaneado/imagem.');
    return text;
  }

  const lower = text.toLowerCase();
  for (const term of SEARCH) {
    let from = 0;
    let hits = 0;
    while (hits < 2) {
      const idx = lower.indexOf(term.toLowerCase(), from);
      if (idx === -1) break;
      hits += 1;
      from = idx + term.length;
      const snippet = text.slice(Math.max(0, idx - 180), Math.min(text.length, idx + 320)).replace(/\s+/g, ' ').trim();
      console.log(`\n[${term} #${hits}]\n${snippet}`);
    }
  }

  return text;
}

const target = process.argv[2];
if (target && BOOKS[target]) {
  await extractBook(BOOKS[target]);
} else {
  for (const book of Object.values(BOOKS)) {
    await extractBook(book);
  }
}
