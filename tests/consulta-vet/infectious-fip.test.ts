import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SLUG = 'peritonite-infecciosa-felina';
const ASSET_DIR = join(
  process.cwd(),
  'public/assets/consulta-vet/diseases/peritonite-infecciosa-felina'
);

test('PIF existe em diseasesSeed', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.deepEqual(record?.species, ['cat']);
  assert.equal(record?.category, 'infecciosas');
});

test('PIF está no catálogo público', () => {
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
});

test('PIF tem cartão de listagem', () => {
  assert.ok(PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === SLUG));
});

test('PIF tem estrutura editorial mínima', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 5);
  assert.ok(record!.references && record!.references.length >= 5);
  assert.ok(record!.plainLanguage || DISEASE_PLAIN_LANGUAGE[SLUG]);
  const signs = record!.clinicalSignsPathophysiology;
  assert.ok(Array.isArray(signs));
  const firstFinding = signs[0]?.findings?.[0];
  assert.ok(firstFinding && typeof firstFinding === 'object' && 'mechanism' in firstFinding);
});

test('PIF inclui figuras e tabelas clínicas locais', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const patho = record?.pathophysiology as Record<string, unknown> | undefined;
  assert.ok(patho?.figuraUveite);
  assert.ok(patho?.tabelaDosesGS);
  assert.ok(patho?.tabelaTesteAmostra);
  const fig = patho?.figuraUveite as { src?: string };
  assert.match(fig?.src ?? '', /peritonite-infecciosa-felina/);
});

test('PIF asset de figura existe e é válido', () => {
  const assetPath = join(ASSET_DIR, 'fip-uveitis-response-gs441524.jpg');
  assert.ok(existsSync(assetPath));
  assert.ok(statSync(assetPath).size > 10_000);
});

test('PIF relaciona FeLV no diferencial', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record?.relatedDiseaseSlugs?.includes('leucemia-viral-felina'));
});

test('PIF documenta GS-441524 como primeira linha', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /GS-441524/);
  assert.match(strip, /15 mg\/kg/);
});
