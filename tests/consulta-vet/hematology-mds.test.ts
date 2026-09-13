import assert from 'node:assert/strict';
import test from 'node:test';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

const SLUG = 'sindrome-mielodisplasica-caes-gatos';

test('MDS existe em diseasesSeed com metadados corretos', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG);
  assert.ok(disease, `esperava encontrar ${SLUG} em diseasesSeed`);
  assert.equal(disease!.category, 'hematologia');
  assert.ok(disease!.categories?.includes('oncologia'));
  assert.ok(disease!.categories?.includes('clinica-medica'));
  assert.equal(disease!.isPublished, true);
  assert.ok(disease!.species.includes('dog'));
  assert.ok(disease!.species.includes('cat'));
  assert.ok(disease!.tags.includes('MDS'));
  assert.ok(disease!.tags.includes('Hematopoiese ineficaz'));
});

test('MDS está listada no catálogo público e possui stub de card', () => {
  assert.ok(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG),
    `esperava encontrar ${SLUG} em CONSULTA_VET_PUBLIC_DISEASE_SLUGS`,
  );
  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((card) => card.slug === SLUG);
  assert.ok(cardStub, `esperava encontrar stub para ${SLUG}`);
  assert.ok(cardStub!.quickSummary.length > 50);
  assert.equal(cardStub!.title, 'Síndrome mielodisplásica (MDS)');
  assert.ok(cardStub!.species.includes('dog'));
  assert.ok(cardStub!.species.includes('cat'));
});

test('MDS possui linguagem simples completa para tutores', () => {
  const plain = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(plain, 'esperava registro de linguagem simples para MDS');
  assert.ok(plain.whatIsIt.length > 100);
  assert.ok(plain.keyPoints.length >= 3);
});

test('MDS possui faixa de decisão rápida e rica estrutura editorial', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  assert.ok(disease.quickDecisionStrip.length >= 8);
  assert.ok((disease.references ?? []).length >= 10);
  assert.ok(disease.quickSummaryRich);
  assert.ok(disease.quickSummaryRich.pillars.length >= 4);
  assert.ok(disease.quickSummaryRich.diagnosticFlow?.steps.length! >= 5);
  assert.ok(disease.quickSummaryRich.treatmentFlow?.steps.length! >= 4);
});

test('MDS aborda achados críticos: medula hipercelular, macrocitose não regenerativa e FeLV', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease).toLowerCase();
  assert.ok(serialized.includes('medula cheia') || serialized.includes('hipercelular'), 'deve citar medula hipercelular');
  assert.ok(serialized.includes('macrocitose'), 'deve citar macrocitose');
  assert.ok(serialized.includes('felv'), 'deve citar associação com FeLV');
  assert.ok(serialized.includes('dismielopoiese secundária') || serialized.includes('dismielopoiese secundaria'), 'deve citar dismielopoiese secundária');
});

test('MDS detalha os estudos seminais: Meredith 2025, Matsuyama 2023, Weiss & Aird 2001', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease);
  assert.ok(serialized.includes('Meredith'), 'deve citar estudo de Meredith et al. 2025');
  assert.ok(serialized.includes('Matsuyama'), 'deve citar estudo de Matsuyama et al. 2023');
  assert.ok(serialized.includes('Weiss'), 'deve citar Weiss & Aird 2001');
  assert.ok(serialized.includes('384') && serialized.includes('6 dias'), 'deve citar sobrevida 384 dias vs 6 dias da AML');
});

test('MDS não contém marcadores literais de asterisco duplo (**)', () => {
  const disease = diseasesSeed.find((item) => item.slug === SLUG)!;
  const serialized = JSON.stringify(disease);
  assert.ok(!serialized.includes('**'), 'não deve conter ** em nenhum campo');
});
