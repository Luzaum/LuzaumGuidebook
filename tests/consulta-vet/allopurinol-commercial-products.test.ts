import assert from 'node:assert/strict';

import test from 'node:test';

import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';

import {
  auditCommercialLabelDose,
  hasPracticalLabelDoseText,
  resolveCommercialLabelDose,
} from '../../modules/consulta-vet/utils/commercialLabelDose';

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
