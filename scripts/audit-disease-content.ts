import fs from 'node:fs';
import { diseasesSeed } from '../modules/consulta-vet/data/seed/diseases.seed';
import { applyDiseaseOverviewOverride } from '../modules/consulta-vet/data/seed/diseaseOverviewOverrides';

// Triage editorial: contagem de palavras não certifica qualidade clínica.
const sections = ['etiology', 'epidemiology', 'pathogenesisTransmission', 'pathophysiology', 'clinicalSignsPathophysiology', 'diagnosis', 'treatment', 'complications', 'prevention'] as const;
const metadata = new Set(['id', 'slug', 'url', 'src', 'kind', 'source', 'sourceType', 'evidenceLevel', 'priority', 'system', 'species', 'references', 'editorialReferences', 'synonyms', 'relatedDiseaseSlugs', 'relatedMedicationSlugs', 'relatedConsensusSlugs', 'createdAt', 'updatedAt']);
function strings(value: unknown, path = ''): { path: string; text: string }[] {
  if (typeof value === 'string') return [{ path, text: value }];
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([key, item]) => metadata.has(key) ? [] : strings(item, path ? `${path}.${key}` : key));
}
const words = (value: unknown) => strings(value).reduce((sum, item) => sum + (item.text.match(/\S+/g)?.length ?? 0), 0);
const english = /\b(?:workup|follow-up|gold standard|indoor|outdoor|pitfalls?|screening|baseline|washout|endpoints?|rule.out|saddle thrombus|panting|grooming|head tilt|head pressing|failure to thrive|burned-out|smoke)\b/gi;
const rows = diseasesSeed.map(applyDiseaseOverviewOverride).map(record => {
  const depth = Object.fromEntries(sections.map(key => [key, words(record[key])]));
  const total = Object.values(depth).reduce((a, b) => a + b, 0);
  const missing = sections.filter(key => !depth[key]);
  const brief = sections.filter(key => depth[key] > 0 && depth[key] < 60);
  const legacy = sections.filter(key => typeof record[key] === 'string');
  const text = strings(record);
  const issues = text.flatMap(item => {
    const found = item.text.match(english);
    const technical = /isGoldStandard\s*:|\[object Object\]|\bTODO\s*:|Lorem ipsum/.test(item.text);
    return found || technical ? [{ path: item.path, terms: found ?? [], technical, excerpt: item.text.slice(0, 220) }] : [];
  });
  return { title: record.title, slug: record.slug, totalWords: total, depth, missing, brief, legacy, references: record.references?.length ?? 0,
    recadastro: total < 1800 || depth.diagnosis < 100 || depth.treatment < 150 || legacy.length >= 4 || missing.some(key => !['complications', 'prevention'].includes(key)), issues };
}).sort((a, b) => a.totalWords - b.totalWords);
const result = { scope: 'Catálogo local efetivo: seeds + overrides. Não inclui registros exclusivos do Supabase.', criteria: 'Triagem para revisão/recadastro: menos de 1800 palavras nas seções clínicas; diagnóstico <100; tratamento <150; quatro seções em texto legado; ou seção central ausente. Não é certificação clínica nem prova de versão antiga.', count: rows.length, candidates: rows.filter(row => row.recadastro).length, rows };
const output = process.argv[2];
if (output) fs.writeFileSync(output, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ count: rows.length, candidates: rows.filter(row => row.recadastro).map(({ title, totalWords, brief, legacy }) => ({ title, totalWords, brief, legacy })), languageFindings: rows.reduce((n, row) => n + row.issues.length, 0) }, null, 2));
