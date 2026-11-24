import fs from 'node:fs';
import { diseasesSeed } from '../modules/consulta-vet/data/seed/diseases.seed';
const issues: unknown[] = [];
function walk(value: unknown, path: string) {
 if (!value || typeof value !== 'object') return;
 const item = value as Record<string, unknown>;
 if (Array.isArray(item.headers) && Array.isArray(item.rows)) {
  item.rows.forEach((row, i) => { if (Array.isArray(row) && row.length !== (item.headers as unknown[]).length) issues.push({path, row:i, headers:(item.headers as unknown[]).length,cells:row.length}); });
 }
 if (typeof item.src === 'string' && item.src.startsWith('/') && !fs.existsSync('public'+item.src)) issues.push({path, missingAsset:item.src});
 for(const [k,v] of Object.entries(item)) { if (!['references','editorialReferences'].includes(k)) walk(v,path+'.'+k); }
}
diseasesSeed.forEach(d => walk(d,d.slug));
fs.writeFileSync('tmp/disease-assets-audit.json', JSON.stringify(issues,null,2));
console.log(JSON.stringify(issues));
