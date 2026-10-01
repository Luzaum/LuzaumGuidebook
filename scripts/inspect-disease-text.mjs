import fs from 'node:fs';
import path from 'node:path';

const file = process.argv[2] || 'diseases.cistite-enfisematosa-caes-gatos.seed.ts';
const fullPath = path.join(process.cwd(), 'modules', 'consulta-vet', 'data', 'seed', file);

if (!fs.existsSync(fullPath)) {
  console.error('File not found:', fullPath);
  process.exit(1);
}

const content = fs.readFileSync(fullPath, 'utf8');
const propRegex = /([a-zA-Z0-9_]+):\s*['"`]([\s\S]*?)['"`],/g;
let m;
let count = 0;

while ((m = propRegex.exec(content)) !== null) {
  const k = m[1];
  const v = m[2];
  if (
    !['id', 'slug', 'title', 'subtitle', 'category', 'status', 'version', 'species', 'tags', 'metaDescription', 'lastUpdate'].includes(k) &&
    v.length > 250 &&
    !v.includes('\n-') &&
    !v.includes('\n1.') &&
    !v.includes('\n•')
  ) {
    count++;
    console.log(`[${count}] KEY: ${k} (${v.length} chars)`);
    console.log(v);
    console.log('='.repeat(60));
  }
}

console.log(`Found ${count} monolithic sections in ${file}`);
