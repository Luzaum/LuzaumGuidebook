import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { diseasesSeed } from '../modules/consulta-vet/data/seed/diseases.seed';

const sections = ['etiology', 'epidemiology', 'pathogenesisTransmission', 'pathophysiology', 'clinicalSignsPathophysiology', 'diagnosis', 'treatment', 'complications', 'prevention'] as const;
const metadata = new Set(['id','kind','src','alt','caption','url','display','evidence','source','sourceType','evidenceLevel','references','books','pages','citation','citationText','title','headers']);
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value.replace(/<\/?[a-z][^>]*>/gi, ' ')];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.entries(value).filter(([key]) => !metadata.has(key)).flatMap(([, value]) => strings(value));
  return [];
}
function words(value: unknown) { return strings(value).join(' ').match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0; }
function count(value: unknown, predicate: (v: any) => boolean): number {
  if (!value || typeof value !== 'object') return 0;
  return (predicate(value) ? 1 : 0) + Object.values(value).reduce<number>((n, item) => n + count(item, predicate), 0);
}
let date = '';
const dates: Record<string, string> = {};
for (const line of execFileSync('git', ['log','--diff-filter=A','--date=short','--format=DATE %ad','--name-only','--','modules/consulta-vet/data/seed/diseases*.seed.ts'], {encoding:'utf8'}).split(/\r?\n/)) {
  if (line.startsWith('DATE ')) date = line.slice(5);
  else if (line.endsWith('.ts')) dates[line] = date;
}
const dir = 'modules/consulta-vet/data/seed/';
const files = fs.readdirSync(dir).filter(x => /^diseases\..+\.seed\.ts$/.test(x));
const rows = diseasesSeed.map(record => {
  const file = files.find(file => new RegExp(`slug:\\s*['"]${record.slug}['"]`).test(fs.readFileSync(dir + file, 'utf8')));
  const depth = Object.fromEntries(sections.map(section => [section, words(record[section])])) as Record<typeof sections[number], number>;
  return { title:record.title,slug:record.slug,file:file ? dir+file : '',firstFileDate:file ? dates[dir+file] ?? null : null,createdAt:record.createdAt ?? null,
    total: Object.values(depth).reduce((a,b)=>a+b,0),depth,
    tables: count(sections.map(key=>record[key]),x=>x.kind==='clinicalTable'),
    protocols: count(record.treatment,x=>typeof x.drug==='string' && typeof x.dose==='string'),
    references:record.references?.length ?? 0,
    missing:sections.filter(section=>depth[section]===0),
    fullText: Object.fromEntries(sections.map(section=>[section,strings(record[section]).join('\n')])) };
}).sort((a,b)=>a.total-b.total);
fs.mkdirSync('tmp/disease-depth-audit-20261004',{recursive:true});
fs.writeFileSync('tmp/disease-depth-audit-20261004/inventory.json', JSON.stringify(rows,null,2));
console.log(JSON.stringify({count:rows.length,median:rows[Math.floor(rows.length/2)].total,rows:rows.map(({fullText,...row})=>row)},null,2));
