import assert from 'node:assert/strict';
import test from 'node:test';
import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';
import {
  filterAndRankCommercialProducts,
  searchPrescriptionCommercialProducts,
  searchPrescriptionCommercialProductsByName,
} from '../../modules/consulta-vet/services/receituarioCommercialCatalogService';
import {
  auditCommercialLabelDose,
  hasPracticalLabelDoseText,
  resolveCommercialLabelDose,
} from '../../modules/consulta-vet/utils/commercialLabelDose';
import { sanitizeCommercialProductForTakeHome } from '../../modules/consulta-vet/utils/receituarioTakeHome';

test('Zyloric®, Alopurinol Genérico e Manipulado Veterinário estão registrados no catálogo comercial', () => {
  const zyloric = commercialOticProductsSeed.find((item) => item.id === 'zyloric-alopurinol-aspen');
  assert.ok(zyloric, 'Zyloric deve existir no catálogo comercial');
  assert.equal(zyloric.manufacturer, 'Aspen Pharma');
  assert.equal(zyloric.commercialClass, 'infectious');
  assert.equal(zyloric.commercialSubclass, 'infectious_leishmaniasis');
  assert.ok(zyloric.commercialSubclasses?.includes('uro_urinary_urate'));
  assert.deepEqual(zyloric.species, ['dog', 'cat']);
  assert.equal(zyloric.presentations.length, 2);
  assert.ok(zyloric.presentations.some((p) => p.includes('100 mg')));
  assert.ok(zyloric.presentations.some((p) => p.includes('300 mg')));
  assert.match(zyloric.labelCompositionSummary, /1\.3764\.0122/);

  const generic = commercialOticProductsSeed.find((item) => item.id === 'alopurinol-generico-humano');
  assert.ok(generic, 'Alopurinol genérico deve existir no catálogo comercial');
  assert.equal(generic.commercialSubclass, 'infectious_leishmaniasis');
  assert.equal(generic.presentations.length, 3);

  const comp = commercialOticProductsSeed.find((item) => item.id === 'alopurinol-manipulado-veterinario');
  assert.ok(comp, 'Alopurinol manipulado deve existir no catálogo comercial');
  assert.ok(comp.presentations.some((p) => /cápsulas/i.test(p)));
  assert.ok(comp.presentations.some((p) => /suspensão/i.test(p)));
});

test('Apresentações de alopurinol possuem posologia prática validada na auditoria de labelDose', () => {
  for (const id of ['zyloric-alopurinol-aspen', 'alopurinol-generico-humano', 'alopurinol-manipulado-veterinario']) {
    const product = commercialOticProductsSeed.find((item) => item.id === id)!;
    const audit = auditCommercialLabelDose(product);
    assert.equal(audit.finalStatus, 'ok', `${id} deve passar na auditoria`);

    const dose = resolveCommercialLabelDose(product)!;
    assert.match(dose, /10 mg\/kg/i, `${id} deve conter dose de LVC em mg/kg`);
    assert.match(dose, /10 a 15 mg\/kg/i, `${id} deve conter dose de urólitos em mg/kg`);
    assert.ok(hasPracticalLabelDoseText(dose), `${id} deve ser dose prática`);
  }
});

test('Alopurinol inclui alertas de biossegurança: xantinúria, dieta hipopurínica, ultrassom e ajuste na DRC', () => {
  const zyloric = commercialOticProductsSeed.find((item) => item.id === 'zyloric-alopurinol-aspen')!;
  assert.match(zyloric.safetyAlert, /XANTINÚRIA/i);
  assert.match(zyloric.safetyAlert, /URÓLITOS DE XANTINA/i);
  assert.match(zyloric.safetyAlert, /DIETA HIPOPURÍNICA/i);
  assert.match(zyloric.safetyAlert, /ULTRASSOM/i);
  assert.match(zyloric.safetyAlert, /DRC|DOENÇA RENAL CRÔNICA/i);
  assert.match(zyloric.safetyAlert, /CONTRAINDICADO NA GESTAÇÃO/i);
});

test('Comprimidos e cápsulas de alopurinol são elegíveis para prescrição domiciliar (take-home)', () => {
  for (const id of ['zyloric-alopurinol-aspen', 'alopurinol-generico-humano', 'alopurinol-manipulado-veterinario']) {
    const product = commercialOticProductsSeed.find((item) => item.id === id)!;
    const takeHome = sanitizeCommercialProductForTakeHome(product);
    assert.ok(takeHome, `${id} deve ser produto take-home`);
    assert.ok(takeHome.presentations.length > 0);
  }
});

test('Busca comercial localiza alopurinol por marca, princípio ativo, doença e termos-chave', async () => {
  // Busca por marca Zyloric
  const zyloricResults = await searchPrescriptionCommercialProductsByName('zyloric');
  assert.ok(zyloricResults.some((item) => item.name.includes('Zyloric')));

  // Busca por princípio ativo Alopurinol
  const alopurinolResults = await searchPrescriptionCommercialProductsByName('alopurinol');
  assert.ok(alopurinolResults.some((item) => item.name.includes('Zyloric')));
  assert.ok(alopurinolResults.some((item) => item.name.includes('Genérico')));

  // Busca por indicação: leishmaniose
  const leishResults = await searchPrescriptionCommercialProducts({ query: 'leishmaniose' });
  assert.ok(leishResults.some((item) => item.name.includes('Alopurinol')));

  // Busca por indicação: urato
  const uratoResults = await searchPrescriptionCommercialProducts({ query: 'urato' });
  assert.ok(uratoResults.some((item) => item.name.includes('Alopurinol')));

  // Busca por termo fisiopatológico: xantina oxidase
  const xantinaMatches = filterAndRankCommercialProducts(commercialOticProductsSeed, 'xantina oxidase');
  assert.ok(xantinaMatches.some((item) => item.name.includes('Alopurinol')));
});
