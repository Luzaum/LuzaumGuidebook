import assert from 'node:assert/strict';
import test from 'node:test';

import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';
import { commercialProductImageAssets } from '../../modules/consulta-vet/data/commercialProductImageAssets';
import { filterAndRankCommercialProducts } from '../../modules/consulta-vet/services/commercialCatalogSearch';
import { auditCommercialLabelDose } from '../../modules/consulta-vet/utils/commercialLabelDose';

test('Cortishamp (Cortshamp) Agener União está cadastrado com fórmula oficial e ativo de imagem', () => {
  const product = commercialOticProductsSeed.find((item) => item.id === 'cortishamp-agener-uniao');
  assert.ok(product, 'Cortishamp deve existir em commercialOticProductsSeed');
  assert.match(product.name, /Cortishamp/i);
  assert.match(product.name, /Cortshamp/i);
  assert.match(product.manufacturer, /Agener/i);
  assert.equal(product.commercialClass, 'dermatologic');
  assert.equal(product.commercialSubclass, 'skin_pruritus');
  assert.ok(product.species.includes('dog') && product.species.includes('cat'));
  assert.ok(product.presentations.some((p) => /125\s*mL/i.test(p)));
  assert.ok(product.activeComponents.some((c) => /hidrocortisona\s*1%/i.test(c)));
  assert.ok(product.activeComponents.some((c) => /queratina\s*hidrolisada/i.test(c)));
  assert.ok(product.activeComponents.some((c) => /lipossomas/i.test(c)));
  assert.ok(
    commercialProductImageAssets['cortishamp-agener-uniao'],
    'Cortishamp deve possuir imagem mapeada em commercialProductImageAssets',
  );
  assert.equal(auditCommercialLabelDose(product).finalStatus, 'ok');
});

test('Busca comercial encontra Cortishamp tanto por "cortshamp" quanto por "cortishamp"', () => {
  const byCortshamp = filterAndRankCommercialProducts(commercialOticProductsSeed, 'cortshamp');
  assert.ok(
    byCortshamp.some((p) => p.id === 'cortishamp-agener-uniao'),
    'Busca por "cortshamp" (sem i) deve retornar Cortishamp da Agener',
  );
  assert.equal(byCortshamp[0]?.id, 'cortishamp-agener-uniao');

  const byCortishamp = filterAndRankCommercialProducts(commercialOticProductsSeed, 'cortishamp');
  assert.ok(
    byCortishamp.some((p) => p.id === 'cortishamp-agener-uniao'),
    'Busca por "cortishamp" (grafia oficial) deve retornar Cortishamp da Agener',
  );
  assert.equal(byCortishamp[0]?.id, 'cortishamp-agener-uniao');
});

test('Ectocid Cães (Spot-On) Agener União está cadastrado completo com 4 apresentações de peso, fipronil 13%, preço e imagem', () => {
  const product = commercialOticProductsSeed.find((item) => item.id === 'ectocid-agener');
  assert.ok(product, 'Ectocid deve existir em commercialOticProductsSeed');
  assert.match(product.name, /Ectocid/i);
  assert.match(product.manufacturer, /Agener/i);
  assert.equal(product.commercialClass, 'parasiticide');
  assert.equal(product.commercialSubclass, 'parasite_topical_classic');
  assert.deepEqual(product.species, ['dog']);
  assert.equal(product.presentations.length, 4);
  assert.ok(product.presentations.some((p) => /0,67\s*mL/i.test(p) && /87,1\s*mg/i.test(p)));
  assert.ok(product.presentations.some((p) => /1,34\s*mL/i.test(p) && /174,2\s*mg/i.test(p)));
  assert.ok(product.presentations.some((p) => /2,68\s*mL/i.test(p) && /348,4\s*mg/i.test(p)));
  assert.ok(product.presentations.some((p) => /4,02\s*mL/i.test(p) && /522,6\s*mg/i.test(p)));
  assert.ok(product.activeComponents.some((c) => /fipronil\s*13%/i.test(c)));
  assert.ok(
    commercialProductImageAssets['ectocid-agener'],
    'Ectocid deve possuir imagem mapeada em commercialProductImageAssets',
  );
  assert.equal(auditCommercialLabelDose(product).finalStatus, 'ok');
  assert.doesNotMatch(product.price.averageLabel, /incompletos/i);

  const byEctocid = filterAndRankCommercialProducts(commercialOticProductsSeed, 'ectocid');
  assert.ok(byEctocid.some((p) => p.id === 'ectocid-agener'));
  assert.equal(byEctocid[0]?.id, 'ectocid-agener');
});

test('Helfine Plus Cães e Helfine Plus Gatos (Hellfine / Helfine Agener) estão completos e localizáveis por "hellfine" e "helfine"', () => {
  const helfineCaes = commercialOticProductsSeed.find((item) => item.id === 'helfine-plus-caes-agener');
  const helfineGatos = commercialOticProductsSeed.find((item) => item.id === 'helfine-plus-gatos-agener');

  assert.ok(helfineCaes, 'Helfine Plus Cães deve existir');
  assert.ok(helfineGatos, 'Helfine Plus Gatos deve existir');

  assert.ok(helfineCaes.activeComponents.some((c) => /praziquantel\s*50\s*mg/i.test(c)));
  assert.ok(helfineCaes.activeComponents.some((c) => /pirantel\s*144\s*mg/i.test(c)));
  assert.ok(helfineCaes.activeComponents.some((c) => /febantel\s*150\s*mg/i.test(c)));
  assert.ok(helfineCaes.commercialSubclasses?.includes('parasite_giardia'));
  assert.equal(auditCommercialLabelDose(helfineCaes).finalStatus, 'ok');
  assert.ok(commercialProductImageAssets['helfine-plus-caes-agener']);

  assert.ok(helfineGatos.activeComponents.some((c) => /praziquantel\s*20\s*mg/i.test(c)));
  assert.ok(helfineGatos.activeComponents.some((c) => /pirantel\s*230\s*mg/i.test(c)));
  assert.equal(auditCommercialLabelDose(helfineGatos).finalStatus, 'ok');
  assert.doesNotMatch(helfineGatos.price.averageLabel, /incompletos/i);
  assert.ok(commercialProductImageAssets['helfine-plus-gatos-agener']);

  for (const query of ['hellfine', 'helfine', 'hellfine plus', 'helfine plus', 'hellfine normal']) {
    const results = filterAndRankCommercialProducts(commercialOticProductsSeed, query);
    assert.ok(
      results.some((p) => p.id === 'helfine-plus-caes-agener' || p.id === 'helfine-plus-gatos-agener'),
      `Busca por "${query}" deve retornar a linha Helfine da Agener`,
    );
  }
});


