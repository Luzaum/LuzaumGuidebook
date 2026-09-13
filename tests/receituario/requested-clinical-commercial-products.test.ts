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

const EXPECTED_SLUGS = [
  'apevitin-bc',
  'cobavital',
  'same-complex-pet-tabs',
  'ezetimiba',
  'benzafibrato',
  'leukeran',
] as const;

test('Todos os 6 novos fármacos estão registrados no catálogo comercial mestre sem duplicação', () => {
  for (const slug of EXPECTED_SLUGS) {
    const products = commercialOticProductsSeed.filter((item) => item.slug === slug);
    assert.equal(products.length, 1, `Fármaco ${slug} deve estar cadastrado exatamente uma vez`);
    const product = products[0];
    assert.ok(product.name.length > 0);
    assert.ok(product.manufacturer.length > 0);
    assert.ok(product.activeComponents.length > 0);
    assert.ok(product.presentations.length > 0);
    assert.ok(product.safetyAlert.length > 0);
    assert.ok(product.price.averageLabel.length > 0);
  }
});

test('Todos os 6 fármacos possuem posologia prática válida aprovada pela auditoria de labelDose', () => {
  for (const slug of EXPECTED_SLUGS) {
    const product = commercialOticProductsSeed.find((item) => item.slug === slug)!;
    const audit = auditCommercialLabelDose(product);
    assert.equal(
      audit.finalStatus,
      'ok',
      `Posologia de ${product.name} deve ser aprovada na auditoria de labelDose (status ok)`,
    );

    const labelDose = resolveCommercialLabelDose(product);
    assert.ok(labelDose && labelDose.length > 10, `Dose resolvida de ${product.name} deve ser prática e completa`);
  }
});

test('Todos os 6 fármacos são elegíveis para prescrição domiciliar (take-home)', () => {
  for (const slug of EXPECTED_SLUGS) {
    const product = commercialOticProductsSeed.find((item) => item.slug === slug)!;
    const sanitized = sanitizeCommercialProductForTakeHome(product);
    assert.ok(sanitized !== null, `${product.name} deve ser elegível para receituário domiciliar`);
    assert.ok(sanitized!.presentations.length >= 1, `${product.name} deve manter apresentações domiciliares`);
  }
});

test('Apevitin BC possui doses e alertas corretos para cães e gatos', () => {
  const apevitin = commercialOticProductsSeed.find((item) => item.slug === 'apevitin-bc')!;
  assert.deepEqual(apevitin.species.sort(), ['cat', 'dog'].sort());
  assert.equal(apevitin.commercialSubclass, 'gi_orexigenic');
  assert.ok(apevitin.activeComponents.some((comp) => comp.toLowerCase().includes('ciproeptadina')));
  assert.ok(apevitin.dosageGuidance?.plumbs?.cat?.some((entry) => entry.dose.includes('1 a 2 mg/gato')));
  assert.ok(apevitin.dosageGuidance?.plumbs?.dog?.some((entry) => entry.dose.includes('0,1 a 0,2 mg/kg')));
  assert.match(apevitin.safetyAlert, /disforia/i);
  assert.match(apevitin.safetyAlert, /diabetes/i);
});

test('Cobavital possui microcomprimidos e cobamamida com regra de não triturar', () => {
  const cobavital = commercialOticProductsSeed.find((item) => item.slug === 'cobavital')!;
  assert.deepEqual(cobavital.species.sort(), ['cat', 'dog'].sort());
  assert.ok(cobavital.activeComponents.some((comp) => comp.toLowerCase().includes('cobamamida')));
  assert.ok(cobavital.activeComponents.some((comp) => comp.toLowerCase().includes('ciproeptadina')));
  assert.ok(cobavital.dosageGuidance?.plumbs?.cat?.some((entry) => entry.dose.includes('microcomprimido')));
  assert.match(cobavital.safetyAlert, /triturar/i);
});

test('SAMe Complex Pet Tabs inclui SAMe, silimarina, vitamina E e regra de jejum', () => {
  const same = commercialOticProductsSeed.find((item) => item.slug === 'same-complex-pet-tabs')!;
  assert.deepEqual(same.species.sort(), ['cat', 'dog'].sort());
  assert.equal(same.commercialSubclass, 'gi_hepatobiliary');
  assert.ok(same.activeComponents.some((comp) => comp.toLowerCase().includes('s-adenosil')));
  assert.ok(same.activeComponents.some((comp) => comp.toLowerCase().includes('silimarina')));
  assert.ok(same.activeComponents.some((comp) => comp.toLowerCase().includes('vitamina e')));
  assert.match(same.dosageGuidance?.labelDose || '', /jejum/i);
  assert.match(same.safetyAlert, /não é cura|adjuvante|não removem depósitos de cobre/i);
});

test('Ezetimiba está categorizada como hipolipemiante e exige dieta hipogordurosa', () => {
  const ezetimiba = commercialOticProductsSeed.find((item) => item.slug === 'ezetimiba')!;
  assert.equal(ezetimiba.commercialClass, 'endocrine');
  assert.equal(ezetimiba.commercialSubclass, 'endocrine_lipid_lowering');
  assert.ok(ezetimiba.species.includes('dog'));
  assert.ok(ezetimiba.dosageGuidance?.plumbs?.dog?.some((entry) => entry.dose.includes('0,1 a 1,0 mg/kg')));
  assert.match(ezetimiba.prescriptionExample, /gordura|low-fat|hipogordurosa/i);
});

test('Benzafibrato é específico para cães e alerta contra quebra de comprimido retard', () => {
  const bezafibrato = commercialOticProductsSeed.find((item) => item.slug === 'benzafibrato')!;
  assert.deepEqual(bezafibrato.species, ['dog'], 'Benzafibrato é indicado para cães e contraindicado em gatos');
  assert.equal(bezafibrato.commercialSubclass, 'endocrine_lipid_lowering');
  assert.match(bezafibrato.safetyAlert, /retard/i);
  assert.match(bezafibrato.safetyAlert, /felinos|gatos/i);
  assert.ok(bezafibrato.dosageGuidance?.plumbs?.dog?.some((entry) => entry.dose.includes('2 a 5 mg/kg')));
});

test('Leukeran é controlado e possui protocolos contínuo/pulsado e biossegurança com luvas', () => {
  const leukeran = commercialOticProductsSeed.find((item) => item.slug === 'leukeran')!;
  assert.equal(leukeran.isControlled, true, 'Leukeran deve ter flag isControlled = true');
  assert.equal(leukeran.commercialClass, 'oncologic');
  assert.equal(leukeran.commercialSubclass, 'oncologic_chemotherapy');
  assert.ok(leukeran.species.includes('cat'));
  assert.ok(leukeran.species.includes('dog'));
  assert.match(leukeran.safetyAlert, /mielossupress[aã]o|neutropenia/i);
  assert.match(leukeran.prescriptionExample, /luvas/i);
  assert.ok(leukeran.dosageGuidance?.plumbs?.cat?.some((entry) => entry.dose.includes('2 mg/gato')));
});

test('Busca comercial encontra todos os 6 fármacos por nome e princípio ativo', async () => {
  const queries = [
    { query: 'apevitin', expectedSlug: 'apevitin-bc' },
    { query: 'cobavital', expectedSlug: 'cobavital' },
    { query: 'same complex', expectedSlug: 'same-complex-pet-tabs' },
    { query: 'ezetimiba', expectedSlug: 'ezetimiba' },
    { query: 'benzafibrato', expectedSlug: 'benzafibrato' },
    { query: 'leukeran', expectedSlug: 'leukeran' },
    { query: 'ciproeptadina', expectedSlug: 'apevitin-bc' },
    { query: 'cobamamida', expectedSlug: 'cobavital' },
    { query: 'clorambucil', expectedSlug: 'leukeran' },
  ];

  for (const { query, expectedSlug } of queries) {
    const results = await searchPrescriptionCommercialProductsByName(query);
    assert.ok(
      results.some((item) => item.id.includes(expectedSlug) || item.name.toLowerCase().includes(query.toLowerCase())),
      `Busca por "${query}" deveria retornar produto relacionado a ${expectedSlug}`,
    );
  }
});

test('Filtros de subclasse retornam os novos fármacos correspondentes', async () => {
  const lipidResults = await searchPrescriptionCommercialProducts({
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_lipid_lowering',
  });
  assert.ok(lipidResults.some((item) => item.name.toLowerCase().includes('ezetimiba')));
  assert.ok(lipidResults.some((item) => item.name.toLowerCase().includes('bezafibrato') || item.name.toLowerCase().includes('benzafibrato')));

  const oncoResults = await searchPrescriptionCommercialProducts({
    commercialClass: 'oncologic',
    commercialSubclass: 'oncologic_chemotherapy',
  });
  assert.ok(oncoResults.some((item) => item.name.toLowerCase().includes('leukeran')));

  const orexigenicResults = await searchPrescriptionCommercialProducts({
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_orexigenic',
  });
  assert.ok(orexigenicResults.some((item) => item.name.toLowerCase().includes('apevitin')));
  assert.ok(orexigenicResults.some((item) => item.name.toLowerCase().includes('cobavital')));
});
