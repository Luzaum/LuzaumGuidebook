import assert from 'node:assert/strict';
import test from 'node:test';
import { itraconazolePrednisoloneCommercialProductsSeed } from '../../modules/consulta-vet/data/itraconazolePrednisoloneCommercialProducts.seed';
import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';
import { buildClinicalMedicationPrescriptionBlock, buildDefaultClinicalMedicationOverride } from '../../modules/consulta-vet/utils/clinicalMedicationCatalogBridge';
import {
  buildReceituarioCommercialSelectOptions,
  calculateCommercialPracticalDose,
  evaluateCompoundingRecommendation,
  formatCommercialAdministrationAmount,
  formatCommercialProductOptionLabel,
  parseCommercialPotencies,
} from '../../modules/consulta-vet/utils/commercialPresentationDose';
import { RECEITUARIO_INFECTOLOGIA_MODELS } from '../../modules/consulta-vet/data/receituarioInfectologiaModels';

const eurofarma = itraconazolePrednisoloneCommercialProductsSeed.find((item) => item.id === 'itraconazol-eurofarma-100mg')!;
const decrise = commercialOticProductsSeed.find((item) => item.id === 'decrise-avert')!;
const gabapentina = commercialOticProductsSeed.find((item) => item.id === 'gabapentina-humana-manipulada')!;
const maxicam = {
  id: 'maxicam-ourofino',
  name: 'Maxicam',
  presentations: [
    'Maxicam 0,5 mg comprimidos (10 comp.)',
    'Maxicam 2 mg comprimidos (10 comp.)',
    'Maxicam solução oral 0,1% (frasco)',
  ],
  labelCompositionSummary: 'Meloxicam. Comprimidos: 0,5 mg ou 2,0 mg por comprimido. Solução oral 1 mg/mL.',
  activeComponents: ['meloxicam'],
} as const;

test('detecta concentração de cápsula mesmo quando apresentações não trazem mg', () => {
  const potencies = parseCommercialPotencies(eurofarma);
  assert.equal(potencies.length, 1);
  assert.equal(potencies[0].mgPerUnit, 100);
  assert.equal(potencies[0].unitLabel, 'cápsula');
});

test('itraconazol 6 kg a 10 mg/kg vira quantidade de cápsula, não mg', () => {
  const practical = calculateCommercialPracticalDose(eurofarma, 60);
  assert.ok(practical);
  assert.match(practical!.displayAmount, /1 cápsula/i);
  assert.doesNotMatch(practical!.displayAmount, /60 mg/i);
  assert.equal(formatCommercialAdministrationAmount(eurofarma, 10, 6), '1 cápsula');
});

test('escolhe potência comercial que melhor aproxima a dose', () => {
  const practical = calculateCommercialPracticalDose(maxicam as never, 1);
  assert.ok(practical);
  assert.equal(practical!.mgPerUnit, 0.5);
  assert.equal(practical!.practicalUnits, 2);
  assert.match(practical!.displayAmount, /2 comprimidos/i);
});

test('receita de esporotricose felina prescreve cápsulas com apresentação comercial', () => {
  const model = RECEITUARIO_INFECTOLOGIA_MODELS.find((item) => item.id === 'seed-infectologia-esporotricose-gatos')!.structured_defaults!.clinical_model!;
  const itraconazole = model.options.find((item) => item.key === 'initial')!.medications![0];
  const override = {
    ...buildDefaultClinicalMedicationOverride(itraconazole, 'Gato'),
    commercialProductId: 'itraconazol-eurofarma-100mg',
    commercialPotencyMg: 100,
  };
  const block = buildClinicalMedicationPrescriptionBlock(itraconazole, override, 10, 'Gato', 1);
  assert.match(block || '', /Administrar 1 cápsula/i);
  assert.doesNotMatch(block || '', /Administrar 100 mg/i);
  assert.match(block || '', /Dose clínica: 1 cápsula \(10 mg\/kg\)/i);
});

test('itraconazol informa concentração por cápsula e forma farmacêutica no cabeçalho', () => {
  const model = RECEITUARIO_INFECTOLOGIA_MODELS.find((item) => item.id === 'seed-infectologia-esporotricose-gatos')!.structured_defaults!.clinical_model!;
  const itraconazole = model.options.find((item) => item.key === 'initial')!.medications![0];
  const override = {
    ...buildDefaultClinicalMedicationOverride(itraconazole, 'Gato'),
    commercialProductId: 'itl-cepav',
    commercialPotencyMg: 25,
    selectedDoseValue: 5,
  };
  const block = buildClinicalMedicationPrescriptionBlock(itraconazole, override, 5, 'Gato', 1);
  assert.match(block || '', /^1\. ITRACONAZOL — ITL — 25 mg\/cápsula — Cápsulas/m);
  assert.doesNotMatch(block || '', /durante Até|\.\./);
});

test('solução oral comercial é convertida para mL', () => {
  const vonau = {
    id: 'vonau-vet-avert',
    name: 'Vonau Vet',
    presentations: ['Vonau Vet solução oral 5 mg/mL (30 mL)'],
    labelCompositionSummary: 'Ondansetrona 5 mg/mL em solução oral veterinária.',
    activeComponents: ['ondansetrona'],
  } as const;
  const practical = calculateCommercialPracticalDose(vonau as never, 2.5);
  assert.ok(practical);
  assert.equal(practical!.displayAmount, '0,5 mL');
});

test('ignora linhas de embalagem sem concentração ao interpretar apresentação comercial', () => {
  const potencies = parseCommercialPotencies(eurofarma);
  assert.deepEqual(potencies.map((item) => item.mgPerUnit), [100]);
  assert.equal(formatCommercialProductOptionLabel(eurofarma), 'Itraconazol Eurofarma 100 mg — 100 mg/cápsula — Caixa com 4 cápsulas · Caixa com 15 cápsulas');
});

test('receituário separa apresentações com múltiplas concentrações', () => {
  const options = buildReceituarioCommercialSelectOptions([decrise, gabapentina]);
  assert.ok(options.some((item) => item.productId === 'decrise-avert' && item.potencyMg === 50));
  assert.ok(options.some((item) => item.productId === 'decrise-avert' && item.potencyMg === 100));
  assert.ok(options.some((item) => item.productId === 'decrise-avert' && item.potencyMg === 200));
  assert.ok(options.some((item) => item.productId === 'gabapentina-humana-manipulada' && item.potencyMg === 300));
  assert.ok(options.some((item) => item.productId === 'gabapentina-humana-manipulada' && item.potencyMg === 400));
});

test('gabapentina 6 kg a 10 mg/kg com potência 50 mg indica manipulação por fração impraticável', () => {
  const practical50 = calculateCommercialPracticalDose(decrise, 60, 50);
  assert.ok(practical50);
  assert.equal(practical50!.mgPerUnit, 50);
  assert.match(practical50!.displayAmount, /1,25/i);
  const recommendation = evaluateCompoundingRecommendation(practical50, 60);
  assert.ok(recommendation?.recommended);
});

test('receita com manipulação gera texto pronto baseado na dose', () => {
  const model = RECEITUARIO_INFECTOLOGIA_MODELS.find((item) => item.id === 'seed-infectologia-esporotricose-gatos')!.structured_defaults!.clinical_model!;
  const itraconazole = model.options.find((item) => item.key === 'initial')!.medications![0];
  const override = {
    ...buildDefaultClinicalMedicationOverride(itraconazole, 'Gato'),
    commercialProductId: 'itraconazol-eurofarma-100mg',
    commercialPotencyMg: 100,
    selectedDoseValue: 10,
    useCompounding: true,
  };
  const block = buildClinicalMedicationPrescriptionBlock(itraconazole, override, 6, 'Gato', 1);
  assert.match(block || '', /MANIPULADO/i);
  assert.match(block || '', /60 mg de itraconazol/i);
  assert.match(block || '', /Administrar 1 cápsula/i);
});
