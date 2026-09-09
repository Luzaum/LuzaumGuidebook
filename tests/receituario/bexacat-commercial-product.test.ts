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

test('Bexacat está registrado no catálogo comercial mestre com integridade completa', () => {
  const products = commercialOticProductsSeed.filter((item) => item.slug === 'bexacat');
  assert.equal(products.length, 1, 'Bexacat deve estar presente exatamente uma vez');

  const bexacat = products[0];
  assert.equal(bexacat.id, 'bexacat-elanco');
  assert.equal(bexacat.manufacturer, 'Elanco');
  assert.equal(bexacat.commercialClass, 'endocrine');
  assert.equal(bexacat.commercialSubclass, 'endocrine_sglt2');
  assert.ok(bexacat.commercialSubclasses?.includes('endocrine_insulin'));
  assert.deepEqual(bexacat.species, ['cat'], 'Bexacat é indicado exclusivamente para felinos');
  assert.ok(bexacat.activeComponents.includes('bexagliflozina'));
  assert.match(bexacat.productPageUrl || '', /^https:\/\//);
  assert.match(bexacat.labelUrl || '', /^https:\/\//);
  assert.match(bexacat.imageUrl || '', /^https:\/\//);
  assert.ok(bexacat.presentations.length >= 2);
  assert.ok(bexacat.presentations.some((pres) => pres.includes('15 mg')));
});

test('Bexacat possui posologia prática validada na auditoria de labelDose', () => {
  const bexacat = commercialOticProductsSeed.find((item) => item.slug === 'bexacat')!;
  const audit = auditCommercialLabelDose(bexacat);
  assert.equal(audit.finalStatus, 'ok', 'Posologia de bula do Bexacat deve ser aprovada na auditoria');

  const labelDose = resolveCommercialLabelDose(bexacat)!;
  assert.match(labelDose, /15 mg\/gato/i);
  assert.match(labelDose, /q24h/i);

  const catDose = bexacat.dosageGuidance?.plumbs?.cat?.[0]?.dose;
  assert.ok(catDose && /15 mg\/gato VO q24h/i.test(catDose));
});

test('Bexacat inclui avisos de segurança críticos para eDKA e triagem de BHB', () => {
  const bexacat = commercialOticProductsSeed.find((item) => item.slug === 'bexacat')!;
  assert.match(bexacat.safetyAlert, /cetoacidose diab[eé]tica euglic[eê]mica|eDKA/i);
  assert.match(bexacat.safetyAlert, /beta-hidroxibutirato|BHB/i);
  assert.match(bexacat.safetyAlert, /previamente tratados com insulina/i);
  assert.match(bexacat.safetyAlert, /3(?:,0)?\s*kg/i);
  assert.match(bexacat.safetyAlert, /c[aã]es/i);
});

test('Bexacat é apresentação domiciliar válida (take-home) para receituário', () => {
  const bexacat = commercialOticProductsSeed.find((item) => item.slug === 'bexacat')!;
  const sanitized = sanitizeCommercialProductForTakeHome(bexacat);
  assert.ok(sanitized !== null, 'Bexacat comprimidos deve ser elegível para receituário domiciliar');
  assert.equal(sanitized?.presentations.length, bexacat.presentations.length);
});

test('Busca comercial encontra Bexacat por nome, princípio ativo e classe', async () => {
  const queries = ['bexacat', 'bexagliflozina', 'bexagliflozin', 'sglt2'];

  for (const query of queries) {
    const results = await searchPrescriptionCommercialProductsByName(query);
    assert.ok(
      results.some((item) => item.name.toLowerCase().includes('bexacat')),
      `Busca por "${query}" deveria retornar Bexacat`,
    );
  }

  const endocrineResults = await searchPrescriptionCommercialProducts({
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_sglt2',
  });
  assert.ok(
    endocrineResults.some((item) => item.name.toLowerCase().includes('bexacat')),
    'Filtro por subclasse endocrine_sglt2 deve retornar Bexacat',
  );
});
