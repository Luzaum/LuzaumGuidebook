import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '../public/assets/consulta-vet/diseases/colapso-traqueal-canino');
mkdirSync(outDir, { recursive: true });

const candidates = [
  'https://www.frontiersin.org/files/Articles/489234/fvets-11-1448249-HTML/image_m/fvets-11-1448249-g001.jpg',
  'https://www.frontiersin.org/files/Articles/489234/fvets-11-1448249-HTML/image_m/fvets-11-1448249-g002.jpg',
  'https://www.frontiersin.org/files/Articles/489234/fvets-11-1448249-HTML/image_m/fvets-11-1448249-g003.jpg',
  'https://www.frontiersin.org/files/Articles/489234/fvets-11-1448249-HTML/image_m/fvets-11-1448249-g004.jpg',
];

let fluoroscopy = null;
for (const url of candidates) {
  const head = await fetch(url, { method: 'HEAD' });
  console.log(head.status, url);
  if (head.ok) {
    fluoroscopy = url;
    break;
  }
}

if (!fluoroscopy) {
  const articleUrl = 'https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2024.1448249/full';
  const html = await fetch(articleUrl).then((r) => r.text());
  const urls = [...new Set([...html.matchAll(/(?:https?:)?\/\/[^"'\\s>]+\.(?:jpg|jpeg|png|gif)/gi)].map((m) => m[0].replace(/^\/\//, 'https://')))];
  console.log('HTML images:', urls.length);
  fluoroscopy = urls[0] ?? null;
}

if (!fluoroscopy) {
  console.error('No image URL found');
  process.exit(1);
}

const res = await fetch(fluoroscopy);
if (!res.ok) {
  console.error('Download failed', res.status, fluoroscopy);
  process.exit(1);
}
const buf = Buffer.from(await res.arrayBuffer());
const ext = fluoroscopy.match(/\.(jpg|jpeg|png|gif)/i)?.[1] ?? 'jpg';
const outPath = join(outDir, `fluoroscopia-kim-2024.${ext}`);
writeFileSync(outPath, buf);
console.log('Saved', outPath, buf.length, 'bytes from', fluoroscopy);
