import fs from 'node:fs';
import path from 'node:path';

const seedDir = path.join(process.cwd(), 'modules', 'consulta-vet', 'data', 'seed');
const files = fs.readdirSync(seedDir).filter(f => f.startsWith('diseases.') && f.endsWith('.seed.ts'));

interface MonolithicItem {
  file: string;
  path: string;
  length: number;
  snippet: string;
}

const allMonolithic: MonolithicItem[] = [];

import { pathToFileURL } from 'node:url';

for (const file of files) {
  const filePath = path.join(seedDir, file);
  try {
    const fileUrl = pathToFileURL(filePath).href;
    const mod = await import(fileUrl);
    const exports = Object.values(mod);
    for (const record of exports) {
      if (!record || typeof record !== 'object') continue;

      function walk(obj: any, currentPath: string) {
      if (!obj || typeof obj !== 'object') return;
      for (const [key, val] of Object.entries(obj)) {
        const nextPath = currentPath ? `${currentPath}.${key}` : key;
        if (typeof val === 'string') {
          // ignore metadata keys
          if (['id', 'slug', 'title', 'subtitle', 'category', 'status', 'version', 'species', 'tags', 'metaDescription', 'lastUpdate', 'url', 'aspectRatio'].includes(key)) {
            continue;
          }
          // Check if it's long and lacks formatting
          if (val.length > 250) {
            const hasList = val.includes('\n-') || val.includes('\n*') || val.includes('\n1.') || val.includes('\n•') || val.includes('\n  -');
            const hasParagraphs = val.includes('\n\n') || val.includes('\n');
            const hasColonsLead = val.includes(':\n');

            // Monolithic means a wall of text: no linebreaks or only 1 line, or long block without lists or leads
            if (!hasList && !hasColonsLead) {
              allMonolithic.push({
                file,
                path: nextPath,
                length: val.length,
                snippet: val.slice(0, 80).replace(/\s+/g, ' ')
              });
            }
          }
        } else if (Array.isArray(val)) {
          val.forEach((item, idx) => {
            if (typeof item === 'object') {
              walk(item, `${nextPath}[${idx}]`);
            }
          });
        } else if (typeof val === 'object') {
          walk(val, nextPath);
        }
      }
    }

    walk(record, '');
    }
  } catch (err) {
    // console.error(`Error loading ${file}:`, err);
  }
}

const byFile: Record<string, MonolithicItem[]> = {};
allMonolithic.forEach(item => {
  byFile[item.file] = byFile[item.file] || [];
  byFile[item.file].push(item);
});

const sorted = Object.entries(byFile).sort((a, b) => b[1].length - a[1].length);

console.log(`\n=== AUDITORIA DE PAREDES DE TEXTO EM DOENÇAS ===`);
console.log(`Total de seções monolíticas encontradas: ${allMonolithic.length}\n`);

for (const [f, items] of sorted) {
  console.log(`${f.padEnd(55)} : ${items.length} seções`);
}

if (process.argv[2]) {
  const target = process.argv[2];
  const items = byFile[target] || [];
  console.log(`\n--- Detalhes para ${target} (${items.length} seções) ---`);
  items.forEach((it, idx) => {
    console.log(`[${idx + 1}] ${it.path} (${it.length} chars)`);
    console.log(`    "${it.snippet}..."`);
  });
}
