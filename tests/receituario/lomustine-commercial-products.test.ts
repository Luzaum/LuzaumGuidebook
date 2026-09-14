import assert from 'node:assert/strict';
import test from 'node:test';
import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';
import {
  searchPrescriptionCommercialProducts,
  searchPrescriptionCommercialProductsByName,
} from '../../modules/consulta-vet/services/receituarioCommercialCatalogService';
import {
  auditCommercialLabelDose,
  resolveCommercialLabelDose,
} from '../../modules/consulta-vet/utils/commercialLabelDose';
import { sanitizeCommercialProductForTakeHome } from '../../modules/consulta-vet/utils/receituarioTakeHome';

test('Citostal® está registrado no catálogo comercial com dados oficiais do mercado brasileiro', () => {
  const products = commercialOticProductsSeed.filter((item) => item.slug === 'citostal-lomustina');
  assert.equal(products.length, 1, 'Citostal deve estar presente exatamente uma vez');

  const citostal = products[0];
  assert.equal(citostal.id, 'citostal-lomustina-bms');
  assert.equal(citostal.manufacturer, 'Bristol-Myers Squibb');
  assert.equal(citostal.commercialClass, 'oncologic');
  assert.equal(citostal.commercialSubclass, 'oncologic_chemotherapy');
  assert.equal(citostal.isControlled, true, 'Quimioterápico deve ter controle especial');
  assert.deepEqual(citostal.species.sort(), ['cat', 'dog'].sort());
  assert.ok(citostal.activeComponents.some((comp) => comp.includes('lomustina')));
  assert.match(citostal.labelCompositionSummary, /1\.0180\.0097/);
  assert.match(citostal.productPageUrl || '', /^https:\/\//);
  assert.match(citostal.labelUrl || '', /^https:\/\//);
  assert.match(citostal.imageUrl || '', /^https:\/\//);
  assert.ok(citostal.presentations.some((p) => p.includes('10 mg')));
  assert.ok(citostal.presentations.some((p) => p.includes('40 mg')));
});

test('Lomustina Manipulada Veterinária e Gleostine® complementam o mercado oncológico', () => {
  const manipulada = commercialOticProductsSeed.find((item) => item.id === 'lomustina-manipulada-veterinaria');
  assert.ok(manipulada, 'Lomustina manipulada deve estar registrada');
  assert.equal(manipulada.commercialClass, 'oncologic');
  assert.equal(manipulada.commercialSubclass, 'oncologic_chemotherapy');
  assert.ok(manipulada.presentations[0].includes('personalizada'));

  const gleostine = commercialOticProductsSeed.find((item) => item.id === 'gleostine-lomustina-importado');
  assert.ok(gleostine, 'Gleostine importado deve estar registrado');
  assert.equal(gleostine.commercialClass, 'oncologic');
  assert.equal(gleostine.commercialSubclass, 'oncologic_chemotherapy');
  assert.ok(gleostine.presentations.some((p) => p.includes('5 mg')));
  assert.ok(gleostine.presentations.some((p) => p.includes('100 mg')));
});

test('Produtos de lomustina possuem posologia prática em mg/m² e mg/kg aprovada na auditoria', () => {
  const ids = ['citostal-lomustina-bms', 'lomustina-manipulada-veterinaria', 'gleostine-lomustina-importado'];

  for (const id of ids) {
    const product = commercialOticProductsSeed.find((item) => item.id === id)!;
    const audit = auditCommercialLabelDose(product);
    assert.equal(audit.finalStatus, 'ok', `${product.name} deve ser aprovado na auditoria de posologia`);

    const labelDose = resolveCommercialLabelDose(product)!;
    assert.match(labelDose, /mg\/m²/i);
    assert.match(labelDose, /mg\/kg/i);
    assert.match(labelDose, /semanas/i);
  }
});

test('Citostal inclui avisos críticos: mielossupressão, hepatoproteção SAMe, luvas e cães <10 kg', () => {
  const citostal = commercialOticProductsSeed.find((item) => item.id === 'citostal-lomustina-bms')!;
  assert.match(citostal.safetyAlert, /mielossupress[aã]o/i);
  assert.match(citostal.safetyAlert, /nadir/i);
  assert.match(citostal.safetyAlert, /hepatotoxicidade/i);
  assert.match(citostal.safetyAlert, /SAMe/);
  assert.match(citostal.safetyAlert, /silimarina|silibina/i);
  assert.match(citostal.safetyAlert, /10\s*kg/);
  assert.match(citostal.safetyAlert, /1,5\s*a\s*2,0\s*mg\/kg/i);
  assert.match(citostal.safetyAlert, /nunca abrir/i);
  assert.match(citostal.safetyAlert, /luvas/i);
});

test('Apresentações de lomustina em cápsulas são elegíveis para prescrição domiciliar (take-home)', () => {
  const ids = ['citostal-lomustina-bms', 'lomustina-manipulada-veterinaria', 'gleostine-lomustina-importado'];

  for (const id of ids) {
    const product = commercialOticProductsSeed.find((item) => item.id === id)!;
    const sanitized = sanitizeCommercialProductForTakeHome(product);
    assert.ok(sanitized !== null, `${product.name} deve ser elegível para receituário domiciliar`);
    assert.ok(sanitized.presentations.length > 0);
  }
});

test('Busca comercial localiza medicamentos por "citostal", "lomustina", "ccnu" e filtro oncológico', async () => {
  const citostalResults = await searchPrescriptionCommercialProductsByName('citostal');
  assert.ok(citostalResults.some((item) => item.name.includes('Citostal')));

  const lomustinaResults = await searchPrescriptionCommercialProductsByName('lomustina');
  assert.ok(lomustinaResults.some((item) => item.name.includes('Citostal')));
  assert.ok(lomustinaResults.some((item) => item.name.includes('Lomustina')));

  const ccnuResults = await searchPrescriptionCommercialProductsByName('ccnu');
  assert.ok(ccnuResults.some((item) => item.name.includes('Citostal') || item.name.includes('Lomustina')));

  const oncoResults = await searchPrescriptionCommercialProducts({
    commercialClass: 'oncologic',
    commercialSubclass: 'oncologic_chemotherapy',
  });
  assert.ok(oncoResults.some((item) => item.name.includes('Citostal')));
  assert.ok(oncoResults.some((item) => item.name.includes('Lomustina')));
  assert.ok(oncoResults.some((item) => item.name.includes('Gleostine')));
});
