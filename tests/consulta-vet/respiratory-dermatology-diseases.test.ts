import assert from 'node:assert/strict';
import test from 'node:test';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';

const EXPECTED_SLUGS = ['asma-felina', 'bronquite-cronica-caes-gatos', 'granuloma-eosinofilico-felino'];

test('as 3 doenças respiratórias/dermatológicas existem em diseasesSeed', () => {
  const slugs = diseasesSeed.map((disease) => disease.slug);
  for (const slug of EXPECTED_SLUGS) {
    assert.ok(slugs.includes(slug), `esperava encontrar ${slug} em diseasesSeed`);
  }
});

test('as 3 doenças estão no catálogo público (CONSULTA_VET_PUBLIC_DISEASE_SLUGS)', () => {
  for (const slug of EXPECTED_SLUGS) {
    assert.ok(
      (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(slug),
      `esperava encontrar ${slug} em CONSULTA_VET_PUBLIC_DISEASE_SLUGS`,
    );
  }
});

test('as 3 doenças têm cartão de listagem em PUBLIC_CATALOG_DISEASE_CARD_STUBS', () => {
  const stubSlugs = PUBLIC_CATALOG_DISEASE_CARD_STUBS.map((disease) => disease.slug);
  for (const slug of EXPECTED_SLUGS) {
    assert.ok(stubSlugs.includes(slug), `esperava encontrar ${slug} em PUBLIC_CATALOG_DISEASE_CARD_STUBS`);
  }
});

test('cada doença tem quickDecisionStrip com pelo menos 5 itens', () => {
  for (const slug of EXPECTED_SLUGS) {
    const disease = diseasesSeed.find((item) => item.slug === slug);
    assert.ok(disease, `esperava encontrar ${slug} em diseasesSeed`);
    assert.ok(
      disease!.quickDecisionStrip.length >= 5,
      `${slug} deveria ter ao menos 5 itens em quickDecisionStrip, tem ${disease!.quickDecisionStrip.length}`,
    );
  }
});

test('cada doença tem ao menos 5 referências', () => {
  for (const slug of EXPECTED_SLUGS) {
    const disease = diseasesSeed.find((item) => item.slug === slug);
    assert.ok(disease, `esperava encontrar ${slug} em diseasesSeed`);
    const references = disease!.references ?? [];
    assert.ok(
      references.length >= 5,
      `${slug} deveria ter ao menos 5 referências, tem ${references.length}`,
    );
  }
});

test('cada doença está publicada (isPublished true)', () => {
  for (const slug of EXPECTED_SLUGS) {
    const disease = diseasesSeed.find((item) => item.slug === slug);
    assert.ok(disease, `esperava encontrar ${slug} em diseasesSeed`);
    assert.equal(disease!.isPublished, true, `${slug} deveria estar com isPublished true`);
  }
});
