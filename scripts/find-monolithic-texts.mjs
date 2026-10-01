import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'modules', 'consulta-vet', 'data', 'seed');
const files = fs.readdirSync(dir).filter(f => f.startsWith('diseases.') && f.endsWith('.seed.ts'));

const results = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  // Check string properties in objects: key: 'very long text without newline or bullet'
  const propRegex = /([a-zA-Z0-9_]+):\s*['"`]([\s\S]*?)['"`],/g;
  let match;
  while ((match = propRegex.exec(content)) !== null) {
    const key = match[1];
    const val = match[2];
    if (
      key !== 'id' &&
      key !== 'slug' &&
      key !== 'title' &&
      key !== 'subtitle' &&
      key !== 'quickSummary' &&
      key !== 'lead' &&
      key !== 'whatIsIt' &&
      key !== 'whatIs' &&
      key !== 'warningSigns' &&
      key !== 'diagnosis' &&
      key !== 'homeCare' &&
      key !== 'legend'
    ) {
      if (val.length > 300 && !val.includes('\n-') && !val.includes('\n1.') && !val.includes('\n•')) {
        results.push({
          file,
          key,
          length: val.length,
          snippet: val.slice(0, 100).replace(/\s+/g, ' ')
        });
      }
    }
  }
});

console.log('Total monolithic sections found:', results.length);
// Group by file
const byFile = {};
results.forEach(r => {
  byFile[r.file] = byFile[r.file] || [];
  byFile[r.file].push(r);
});

const sortedFiles = Object.entries(byFile).sort((a, b) => b[1].length - a[1].length);

console.log('\n--- Resumo por arquivo ---');
sortedFiles.forEach(([f, items]) => {
  console.log(`${f.padEnd(50)} : ${items.length} seções`);
});

for (const [file, items] of sortedFiles) {
  console.log(`\n=== ${file} (${items.length} sections) ===`);
  items.slice(0, 10).forEach(it => {
    console.log(`  - ${it.key} (${it.length} chars): ${it.snippet}...`);
  });
}
