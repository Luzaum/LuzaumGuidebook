import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';
import { DIAGNOSTIC_SUBSECTION_PRIORITY } from '../../modules/consulta-vet/utils/editorialSubsectionOrder';

const SLUG = 'insuficiencia-cardiaca-congestiva-caes-gatos';

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') {
    out.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, out);
  } else if (value && typeof value === 'object') {
    for (const v of Object.values(value)) collectStrings(v, out);
  }
  return out;
}

function collectFigures(value: unknown, out: Array<Record<string, unknown>> = []): Array<Record<string, unknown>> {
  if (Array.isArray(value)) {
    for (const item of value) collectFigures(item, out);
  } else if (value && typeof value === 'object') {
    const rec = value as Record<string, unknown>;
    if (rec.kind === 'clinicalFigure') out.push(rec);
    for (const v of Object.values(rec)) collectFigures(v, out);
  }
  return out;
}

test('ICC em cães e gatos está cadastrada, publicada e sincronizada no catálogo público', () => {
  const rec = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(rec, `Registro ${SLUG} não encontrado em diseasesSeed`);
  assert.equal(rec.isPublished, true);
  assert.deepEqual(rec.species, ['dog', 'cat']);
  assert.equal(rec.category, 'cardiologia');
  assert.deepEqual(rec.tags, ['Cães e Gatos']);

  assert.ok(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG),
    `${SLUG} ausente em CONSULTA_VET_PUBLIC_DISEASE_SLUGS`
  );
  assert.ok(
    PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((s) => s.slug === SLUG),
    `${SLUG} ausente em PUBLIC_CATALOG_DISEASE_CARD_STUBS`
  );
  assert.ok(DISEASE_PLAIN_LANGUAGE[SLUG], `${SLUG} ausente em DISEASE_PLAIN_LANGUAGE`);
});

test('ICC possui todas as chaves icc* rotuladas e subseções diagnósticas ordenadas', () => {
  const rec = diseasesSeed.find((d) => d.slug === SLUG)!;
  const sectionObjects = [
    rec.etiology,
    rec.epidemiology,
    rec.pathogenesisTransmission,
    rec.pathophysiology,
    rec.clinicalSignsPathophysiology,
    rec.diagnosis,
    rec.treatment,
    rec.prevention,
    rec.complications,
  ];

  for (const sec of sectionObjects) {
    if (sec && typeof sec === 'object' && !Array.isArray(sec)) {
      for (const key of Object.keys(sec)) {
        if (key.startsWith('icc')) {
          assert.ok(FULL_KEY_LABELS[key], `Chave ${key} ausente em FULL_KEY_LABELS`);
        }
      }
    }
  }

  if (rec.diagnosis && typeof rec.diagnosis === 'object' && !Array.isArray(rec.diagnosis)) {
    for (const key of Object.keys(rec.diagnosis)) {
      if (key === 'algoritmoDiagnosticoInterativo') continue;
      assert.ok(
        DIAGNOSTIC_SUBSECTION_PRIORITY.includes(key),
        `Subseção diagnóstica ${key} ausente em DIAGNOSTIC_SUBSECTION_PRIORITY`
      );
    }
  }
});

test('ICC possui 6 figuras locais válidas em public/ com fallbackSrc HTTPS', () => {
  const rec = diseasesSeed.find((d) => d.slug === SLUG)!;
  const figures = collectFigures(rec);
  assert.equal(figures.length, 6, `Esperadas 6 figuras clínicas, encontradas ${figures.length}`);

  const publicRoot = path.resolve(process.cwd(), 'public');
  for (const fig of figures) {
    assert.equal(typeof fig.src, 'string');
    const src = fig.src as string;
    assert.ok(src.startsWith('/consulta-vet/insuficiencia-cardiaca-congestiva-caes-gatos/'), `src inesperado: ${src}`);
    const filePath = path.join(publicRoot, src.replace(/^\//, ''));
    assert.ok(fs.existsSync(filePath), `Arquivo de imagem ausente em public/: ${filePath}`);
    assert.ok(fs.statSync(filePath).size > 10_000, `Arquivo de imagem muito pequeno/corrompido: ${filePath}`);

    assert.equal(typeof fig.fallbackSrc, 'string', `fallbackSrc ausente em ${src}`);
    assert.ok((fig.fallbackSrc as string).startsWith('https://'), `fallbackSrc inválido em ${src}`);
  }
});

test('ICC respeita formatação limpa, citações válidas e cobertura clínica integral', () => {
  const rec = diseasesSeed.find((d) => d.slug === SLUG)!;
  const allStrings = collectStrings(rec);
  const fullText = allStrings.join('\n');

  // Sem marcadores markdown brutos ** ou LaTeX \[ / \(
  assert.equal(fullText.includes('**'), false, 'Encontrado marcador literal ** na monografia ICC');
  assert.equal(/\\\[|\\\(/.test(fullText), false, 'Encontrado LaTeX bruto \\[ ou \\( na monografia ICC');

  // Sem ==, * ou {{ref: em quickSummaryRich.lead ou plainLanguage
  const cleanLead = rec.quickSummaryRich?.lead ?? '';
  assert.equal(/==|\*|\{\{ref:/.test(cleanLead), false, 'quickSummaryRich.lead contém formatação proibida');
  const plainText = collectStrings(rec.plainLanguage).join(' ');
  assert.equal(/==|\*|\{\{ref:/.test(plainText), false, 'plainLanguage contém formatação proibida');

  // Todos os tokens {{ref:...}} existem na lista de referências
  const refIds = new Set((rec.references ?? []).map((r) => r.id));
  const usedRefs = [...fullText.matchAll(/\{\{ref:([^}]+)\}\}/g)].map((m) => m[1]);
  assert.ok(usedRefs.length >= 15, 'Esperadas pelo menos 15 citações inline de estudos/consensos');
  for (const id of usedRefs) {
    assert.ok(refIds.has(id), `Referência inline {{ref:${id}}} não encontrada em references`);
  }

  // Cobertura clínica essencial solicitada
  const requiredConcepts = [
    'DC = FC × VS',
    'Jv = Kf[(Pc − Pi) − σ(πc − πi)]',
    'ΔP = 4v²',
    'glicocálix',
    'Quente e úmido',
    'Frio e úmido',
    'Diana et al. (2022)',
    '57,8%',
    '84,5%',
    'Ward et al. (2018)',
    '78,8%',
    '83,3%',
    '95,2%',
    'NKCC2',
    'LVOTO',
    'toracocentese',
    'tamponamento cardíaco',
    'retenção pós-diurético',
    'fenômeno de frenagem',
    '5–10%',
    'SGLT2',
    'EPIC',
    '1.228',
    'QUEST',
    'PROTECT',
    'BESST',
    'CARPODIEM',
    '41,6%',
    'FAT CAT',
    '443 dias',
    'Buchanan',
    '155 dias',
    'TEER',
    '86,4%',
    '< 30 irpm',
    '7,5 kg × 2 mg/kg = 15 mg',
  ];
  for (const term of requiredConcepts) {
    assert.ok(fullText.includes(term), `Conceito clínico obrigatório ausente: "${term}"`);
  }
});
