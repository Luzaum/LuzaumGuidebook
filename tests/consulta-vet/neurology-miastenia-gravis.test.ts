import assert from 'node:assert/strict';
import test from 'node:test';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';

const SLUG = 'miastenia-gravis-caes-gatos';

test('miastenia gravis existe em diseasesSeed', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG);
  assert.ok(disease, `esperava encontrar ${SLUG} em diseasesSeed`);
  assert.equal(disease!.category, 'neurologia');
  assert.ok(disease!.species.includes('dog'));
  assert.ok(disease!.species.includes('cat'));
});

test('miastenia gravis está no catálogo público', () => {
  assert.ok(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG),
    `esperava encontrar ${SLUG} em CONSULTA_VET_PUBLIC_DISEASE_SLUGS`,
  );
});

test('miastenia gravis tem cartão de listagem', () => {
  const stubSlugs = PUBLIC_CATALOG_DISEASE_CARD_STUBS.map((disease) => disease.slug);
  assert.ok(stubSlugs.includes(SLUG), `esperava encontrar ${SLUG} em PUBLIC_CATALOG_DISEASE_CARD_STUBS`);
});

test('miastenia gravis tem estrutura editorial mínima', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  assert.ok(disease.quickDecisionStrip.length >= 5);
  assert.ok((disease.references ?? []).length >= 20);
  assert.equal(disease.isPublished, true);
  assert.ok(disease.quickSummaryRich?.diagnosticFlow?.steps.length);
  assert.ok(disease.quickSummaryRich?.treatmentFlow?.steps.length);
  assert.ok(disease.plainLanguage?.whatIsIt);
  assert.ok(disease.etiology && typeof disease.etiology === 'object' && 'definicao' in (disease.etiology as object));
  const pathophys = disease.pathophysiology as Record<string, unknown>;
  assert.ok(pathophys?.mgFiguraBloqueioJnm);
});

const CMS_SLUG = 'sindromes-miastenicas-congenitas-caes-gatos';

test('CMS existe como doença separada e linkada à MG adquirida', () => {
  const cms = diseasesSeed.find((item) => item.slug === CMS_SLUG);
  assert.ok(cms);
  assert.ok(cms!.plainLanguage?.whatIsIt);
  assert.ok(cms!.relatedDiseaseSlugs?.includes(SLUG));
  const mg = diseasesSeed.find((item) => item.slug === SLUG)!;
  assert.ok(mg.relatedDiseaseSlugs?.includes(CMS_SLUG));
  assert.ok((CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(CMS_SLUG));
});
