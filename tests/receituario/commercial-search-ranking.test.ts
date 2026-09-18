import assert from 'node:assert/strict';
import test from 'node:test';
import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';
import { filterAndRankCommercialProducts } from '../../modules/consulta-vet/services/receituarioCommercialCatalogService';

test('prefixo no nome comercial vem antes do mesmo prefixo encontrado na composição', () => {
  const matches = filterAndRankCommercialProducts(commercialOticProductsSeed, 'benza');

  assert.equal(matches[0]?.id, 'benzafibrato-bezafibrato-generico');
  assert.ok(matches.some((product) => product.id === 'ganadol-pomada-zoetis'));
});

test('prefixo específico de benzafibrato elimina coincidências fracas', () => {
  const matches = filterAndRankCommercialProducts(commercialOticProductsSeed, 'benzaf');

  assert.deepEqual(matches.map((product) => product.id), ['benzafibrato-bezafibrato-generico']);
});

test('termo completo da composição ainda encontra o produto correspondente', () => {
  const matches = filterAndRankCommercialProducts(commercialOticProductsSeed, 'benzatina');

  assert.equal(matches[0]?.id, 'ganadol-pomada-zoetis');
});
