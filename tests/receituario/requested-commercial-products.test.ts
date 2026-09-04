import assert from 'node:assert/strict';
import test from 'node:test';
import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';
import { searchPrescriptionCommercialProductsByName } from '../../modules/consulta-vet/services/receituarioCommercialCatalogService';

const bySlug = (slug: string) => {
  const products = commercialOticProductsSeed.filter((product) => product.slug === slug);
  assert.equal(products.length, 1, `esperado exatamente um produto com slug ${slug}`);
  return products[0];
};

const requestedSlugs = [
  'panacur-10-fenbendazol',
  'marquis-ponazuril-15',
  'baycox-5-toltrazuril',
  'drontal-plus-caes',
  'nexgard-caes-afoxolaner',
  'sulfaprim-sulfametoxazol-trimetoprima',
];

test('os seis produtos solicitados aparecem uma única vez e têm links completos', () => {
  requestedSlugs.forEach((slug) => {
    const product = bySlug(slug);
    assert.match(product.productPageUrl || '', /^https:\/\//);
    assert.match(product.labelUrl || '', /^https:\/\//);
    assert.match(product.imageUrl || '', /^https:\/\//);
    assert.ok(product.presentations.length > 0);
    assert.ok(product.activeComponents.length > 0);
    assert.ok(product.dosageGuidance?.labelDose);
    assert.ok(product.evidenceLevel?.includes('Plumb’s'));
  });
});

test('Panacur mantém concentração, conversão e dose de bula do fenbendazol', () => {
  const panacur = bySlug('panacur-10-fenbendazol');
  assert.match(panacur.labelCompositionSummary, /100 mg\/mL/i);
  assert.match(panacur.dosageGuidance?.labelDose || '', /100 mg\/kg.*dose única/i);
  assert.match(panacur.dosageGuidance?.labelDose || '', /50 mg\/kg.*3 dias/i);
  assert.match(panacur.dosageGuidance?.notes?.join(' ') || '', /÷ 100/);
});

test('Marquis deixa explícitos o rótulo equino, a diluição e o uso extrabula', () => {
  const marquis = bySlug('marquis-ponazuril-15');
  assert.match(marquis.labelCompositionSummary, /150 mg\/g/i);
  assert.match(marquis.labelDirections, /NÃO é a dose de cães e gatos/i);
  assert.match(marquis.dosageGuidance?.notes?.join(' ') || '', /diluíd/i);
  assert.match(marquis.safetyAlert, /não confundir ponazuril com toltrazuril/i);
});

test('Baycox separa a bula bovina dos protocolos extrabula de cães e gatos', () => {
  const baycox = bySlug('baycox-5-toltrazuril');
  assert.match(baycox.labelCompositionSummary, /50 mg\/mL/i);
  assert.match(baycox.dosageGuidance?.labelDose || '', /Bezerros.*3 mL\/10 kg/i);
  assert.match(baycox.dosageGuidance?.plumbs?.dog?.[0]?.dose || '', /10–30 mg\/kg.*1–3 dias/i);
  assert.match(baycox.dosageGuidance?.notes?.join(' ') || '', /Toltrazuril não é ponazuril/i);
});

test('Drontal Plus usa a composição e a tabela da bula brasileira de 2025', () => {
  const drontal = bySlug('drontal-plus-caes');
  assert.match(drontal.labelCompositionSummary, /febantel 150 mg/i);
  assert.match(drontal.labelCompositionSummary, /praziquantel 50 mg/i);
  assert.match(drontal.labelCompositionSummary, /pamoato de pirantel 144 mg/i);
  assert.match(drontal.dosageGuidance?.labelDose || '', /1 comprimido\/10 kg/i);
  assert.match(drontal.labelDirections, /Giardíase.*3 dias/i);
  assert.match(drontal.labelUrl || '', /assets\.elanco\.com/);
});

test('NexGard mantém as quatro faixas brasileiras e a dose mínima mensal', () => {
  const nexgard = bySlug('nexgard-caes-afoxolaner');
  assert.deepEqual(
    nexgard.presentations.slice(0, 4).map((entry) => entry.match(/11,3|28,3|68|136/)?.[0]),
    ['11,3', '28,3', '68', '136'],
  );
  assert.match(nexgard.dosageGuidance?.labelDose || '', /2,5 mg\/kg.*mês/i);
  assert.match(nexgard.safetyAlert, /8 semanas e 2 kg/i);
  assert.match(nexgard.safetyAlert, /convulsões/i);
});

test('Sulfaprim não mistura a frequência q24h da bula com os esquemas q12h do Plumb’s', () => {
  const sulfaprim = bySlug('sulfaprim-sulfametoxazol-trimetoprima');
  assert.match(sulfaprim.labelCompositionSummary, /500 mg.*100 mg/i);
  assert.match(sulfaprim.dosageGuidance?.labelDose || '', /1 comprimido\/20 kg.*q24h.*5–7 dias/i);
  assert.match(sulfaprim.dosageGuidance?.plumbs?.dog?.[1]?.dose || '', /q12h/i);
  assert.match(sulfaprim.dosageGuidance?.notes?.join(' ') || '', /Não converter automaticamente/i);
  assert.match(sulfaprim.safetyAlert, /menos de 15 meses/i);
});

test('as grafias informadas pelo usuário localizam os produtos comerciais', async () => {
  const cases = [
    ['febendazol', 'Panacur 10%'],
    ['poltraazuril', 'Marquis 15% (ponazuril)'],
    ['toltrazuril', 'Baycox 5% (toltrazuril)'],
    ['drontal plus', 'Drontal Plus Mais Sabor 10 kg'],
    ['nexgard', 'NexGard Cães'],
    ['sulfa + trimetoprima', 'Sulfaprim Comprimidos'],
  ] as const;

  for (const [query, expectedName] of cases) {
    const results = await searchPrescriptionCommercialProductsByName(query);
    assert.ok(results.some((result) => result.name === expectedName), `${query} deveria localizar ${expectedName}`);
  }
});
