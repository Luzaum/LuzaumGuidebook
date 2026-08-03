import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { SEEDED_TEMPLATES } from '../modules/consulta-vet/data/receituarioSeed';
import { medicationsSeed } from '../modules/consulta-vet/data/seed/medications.seed';
import { hepatoprotectorMedicationsSeed } from '../modules/consulta-vet/data/seed/medications.hepatoprotectors.seed';
import { getGlobalCatalogMedications } from '../src/lib/medicationCatalog';
import { hasLegacyPlaceholders } from '../modules/consulta-vet/utils/receituarioDocument';

function normalize(value: unknown): string {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

const editorial = [...medicationsSeed, ...hepatoprotectorMedicationsSeed];
const global = getGlobalCatalogMedications();

function medicationNames(body: string): string[] {
  return Array.from(body.matchAll(/^\d+\.\s+([^—\n]+)/gm)).map((match) => match[1].trim()).filter(Boolean);
}

function resolveMedication(name: string) {
  const needle = normalize(name);
  const editorialMatch = editorial.find((item) => [item.title, item.activeIngredient, ...item.tradeNames].some((candidate) => {
    const normalized = normalize(candidate); return normalized === needle || normalized.includes(needle) || needle.includes(normalized);
  }));
  if (editorialMatch) return {
    id: editorialMatch.id,
    activeIngredient: editorialMatch.activeIngredient,
    presentations: editorialMatch.presentations.map((item) => ({ id: item.id, label: item.label })),
    doses: editorialMatch.doses.map((item) => ({ id: item.id, value: item.doseMin, max: item.doseMax ?? null, unit: `${item.doseUnit}${item.perWeightUnit ? `/${item.perWeightUnit}` : ''}`, indication: item.indication })),
    sources: (editorialMatch.references || []).map((item) => item.title).filter(Boolean),
    precautions: editorialMatch.cautions,
  };
  const globalMatch = global.find((item) => [item.name, item.active_ingredient].some((candidate) => {
    const normalized = normalize(candidate); return normalized === needle || normalized.includes(needle) || needle.includes(normalized);
  }));
  if (!globalMatch) return null;
  return {
    id: `global:${globalMatch.slug}`,
    activeIngredient: globalMatch.active_ingredient || globalMatch.name,
    presentations: (globalMatch.presentations || []).map((item) => ({ id: item.id || item.slug, label: item.commercial_name || item.concentration_text || item.pharmaceutical_form || item.slug })),
    doses: (globalMatch.recommended_doses || []).map((item) => ({ id: item.id || item.slug, value: item.dose_value, max: item.dose_max ?? null, unit: item.dose_unit, indication: item.indication || '' })),
    sources: [],
    precautions: [],
  };
}

const audit = SEEDED_TEMPLATES.map((template) => {
  const names = medicationNames(template.body_plain_text);
  const resolved = names.map((name) => ({ name, record: resolveMedication(name) }));
  const recommendations = template.body_plain_text.split('\n').filter((line) => /^[•*-]\s/.test(line.trim()));
  const issues: string[] = [];
  if (hasLegacyPlaceholders(template.body_plain_text)) issues.push('Possui placeholder legado.');
  if (resolved.some((item) => !item.record)) issues.push('Possui medicamento sem vínculo canônico.');
  if (/\b\d+(?:[,.]\d+)?\s*(?:mg|mcg|UI|mL)\b/i.test(template.body_plain_text)) issues.push('Possui concentração ou dose digitada no texto histórico.');
  if (names.length && resolved.every((item) => !item.record?.sources.length)) issues.push('Não há fonte estruturada vinculada às doses do modelo.');
  if (!recommendations.length && template.document_type === 'recipe') issues.push('Não possui recomendações em lista.');
  return {
    templateId: template.id,
    title: template.title,
    condition: template.title,
    category: template.category,
    species: [template.species],
    type: template.document_type,
    medications: resolved.map((item) => ({ enteredName: item.name, medicationId: item.record?.id || null, activeIngredient: item.record?.activeIngredient || null })),
    linkedCommercialPresentations: resolved.flatMap((item) => item.record?.presentations || []),
    doses: resolved.flatMap((item) => item.record?.doses || []),
    doseSources: resolved.flatMap((item) => item.record?.sources || []),
    precautions: resolved.flatMap((item) => item.record?.precautions || []),
    recommendations,
    warningSigns: recommendations.filter((line) => /procurar|atendimento|piora|alerta/i.test(line)),
    followUp: recommendations.find((line) => /retorn|reavalia/i.test(line)) || '',
    placeholders: hasLegacyPlaceholders(template.body_plain_text) ? ['legado detectado'] : [],
    issues,
    status: issues.length === 0 ? 'complete' : issues.length <= 2 ? 'needs-review' : 'incomplete',
  };
});

const countBy = (key: 'species' | 'category' | 'type') => Object.fromEntries(Array.from(new Set(audit.flatMap((item) => key === 'species' ? item.species : [String(item[key])]))).sort().map((value) => [value, audit.filter((item) => key === 'species' ? item.species.includes(value) : item[key] === value).length]));
const summary = {
  generatedAt: new Date().toISOString(),
  sources: ['Código: modules/consulta-vet/data/receituarioSeed.ts', 'Catálogo: medications.seed.ts, medications.hepatoprotectors.seed.ts e globalMedicationCatalog.json'],
  supabaseReceituario: 'A migration 20260801120000 foi aplicada ao projeto remoto Vetius em 2026-08-01. A auditoria reflete somente os modelos ativos atualmente versionados no código e seus vínculos com o catálogo canônico.',
  total: audit.length,
  bySpecies: countBy('species'),
  byCategory: countBy('category'),
  byType: countBy('type'),
  incomplete: audit.filter((item) => item.status === 'incomplete').length,
  withoutSource: audit.filter((item) => item.medications.length > 0 && item.doseSources.length === 0).length,
  withUnlinkedMedication: audit.filter((item) => item.medications.some((medication) => !medication.medicationId)).length,
  withGenericRecommendations: audit.filter((item) => item.recommendations.some((line) => /conforme orientação|caso necessário|estado geral/i.test(line))).length,
};

const markdown = `# Auditoria dos modelos do Receituário\n\nGerado em ${summary.generatedAt}. O relatório reflete os modelos carregados pelo código e os catálogos canônicos empacotados. ${summary.supabaseReceituario}\n\n## Resumo geral\n\n- Total de modelos: ${summary.total}\n- Por espécie: ${JSON.stringify(summary.bySpecies)}\n- Por categoria: ${JSON.stringify(summary.byCategory)}\n- Por tipo: ${JSON.stringify(summary.byType)}\n- Incompletos: ${summary.incomplete}\n- Sem fonte estruturada: ${summary.withoutSource}\n- Com medicamento não vinculado: ${summary.withUnlinkedMedication}\n- Com recomendações genéricas: ${summary.withGenericRecommendations}\n\n## Modelos\n\n${audit.map((item) => `### ${item.title}\n\n| Campo | Valor |\n|---|---|\n| ID | ${item.templateId} |\n| Condição | ${item.condition} |\n| Categoria | ${item.category} |\n| Espécie | ${item.species.join(', ')} |\n| Tipo | ${item.type} |\n| Medicamentos | ${item.medications.map((medication) => `${medication.enteredName} → ${medication.medicationId || 'não vinculado'}`).join('; ') || 'Nenhum'} |\n| Apresentações vinculadas | ${item.linkedCommercialPresentations.map((entry) => entry.label).join('; ') || 'Nenhuma'} |\n| Doses cadastradas | ${item.doses.map((entry) => `${entry.value}${entry.max ? `–${entry.max}` : ''} ${entry.unit}`).join('; ') || 'Nenhuma'} |\n| Fontes | ${item.doseSources.join('; ') || 'Nenhuma fonte estruturada'} |\n| Precauções | ${item.precautions.join('; ') || 'Nenhuma'} |\n| Recomendações | ${item.recommendations.join(' / ') || 'Nenhuma'} |\n| Sinais de alerta | ${item.warningSigns.join(' / ') || 'Nenhum'} |\n| Retorno | ${item.followUp || 'Não informado'} |\n| Placeholders | ${item.placeholders.join(', ') || 'Nenhum'} |\n| Problemas | ${item.issues.join(' / ') || 'Nenhum'} |\n| Status | ${item.status} |\n`).join('\n')}\n`;

const docsDir = resolve('docs');
await mkdir(docsDir, { recursive: true });
await writeFile(resolve(docsDir, 'receituario-models-audit.json'), JSON.stringify({ summary, models: audit }, null, 2) + '\n', 'utf8');
await writeFile(resolve(docsDir, 'receituario-models-audit.md'), markdown, 'utf8');
console.log(`Auditoria gerada: ${audit.length} modelos.`);
