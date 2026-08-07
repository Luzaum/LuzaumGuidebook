import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

const SLUG = 'imunodeficiencia-felina-fiv';
const ASSET_DIR = join(
  process.cwd(),
  'public/assets/consulta-vet/diseases/imunodeficiencia-felina-fiv'
);

test('FIV existe em diseasesSeed', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.deepEqual(record?.species, ['cat']);
  assert.equal(record?.category, 'infecciosas');
});

test('FIV está no catálogo público', () => {
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
});

test('FIV tem cartão de listagem', () => {
  assert.ok(PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === SLUG));
});

test('FIV tem estrutura editorial mínima', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 10);
  assert.ok(record!.references && record!.references.length >= 10);
  assert.ok(record!.plainLanguage || DISEASE_PLAIN_LANGUAGE[SLUG]);
  const signs = record!.clinicalSignsPathophysiology;
  assert.ok(Array.isArray(signs));
  const firstFinding = signs[0]?.findings?.[0];
  assert.ok(firstFinding && typeof firstFinding === 'object' && 'mechanism' in firstFinding);
});

test('FIV inclui figuras e tabelas clínicas', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const patho = record?.pathophysiology as Record<string, unknown> | undefined;
  assert.ok(patho?.figuraEstagios);
  assert.ok(patho?.figuraAlgoritmo);
  assert.ok(patho?.tabelaTestesPOC);
  const fig = patho?.figuraEstagios as { src?: string };
  assert.match(fig?.src ?? '', /imunodeficiencia-felina-fiv/);
});

test('FIV assets de figuras existem', () => {
  for (const file of [
    'fiv-infection-stages-westman.jpg',
    'fiv-cd4-cd8-timeline-westman.jpg',
    'fiv-gingivostomatitis-westman.jpg',
    'fiv-diagnostic-algorithm-westman.jpg',
  ]) {
    const path = join(ASSET_DIR, file);
    assert.ok(existsSync(path), `missing ${file}`);
    assert.ok(statSync(path).size > 10_000, `too small ${file}`);
  }
});

test('FIV relaciona FeLV e PIF', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record?.relatedDiseaseSlugs?.includes('leucemia-viral-felina'));
  assert.ok(record?.relatedDiseaseSlugs?.includes('peritonite-infecciosa-felina'));
});

test('FIV documenta reteste 60 dias e AZT', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /60 dias/);
  assert.match(strip, /AZT|5–10 mg\/kg|5-10 mg\/kg/);
});
