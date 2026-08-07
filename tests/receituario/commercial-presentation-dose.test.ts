import assert from 'node:assert/strict';
import test from 'node:test';
import { itraconazolePrednisoloneCommercialProductsSeed } from '../../modules/consulta-vet/data/itraconazolePrednisoloneCommercialProducts.seed';
import { buildClinicalMedicationPrescriptionBlock, buildDefaultClinicalMedicationOverride } from '../../modules/consulta-vet/utils/clinicalMedicationCatalogBridge';
import {
  calculateCommercialPracticalDose,
  formatCommercialAdministrationAmount,
  formatCommercialProductOptionLabel,
  parseCommercialPotencies,
} from '../../modules/consulta-vet/utils/commercialPresentationDose';
import { RECEITUARIO_INFECTOLOGIA_MODELS } from '../../modules/consulta-vet/data/receituarioInfectologiaModels';

const eurofarma = itraconazolePrednisoloneCommercialProductsSeed.find((item) => item.id === 'itraconazol-eurofarma-100mg')!;
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
  };
  const block = buildClinicalMedicationPrescriptionBlock(itraconazole, override, 6, 'Gato', 1);
  assert.match(block || '', /Administrar 1 cápsula/i);
  assert.doesNotMatch(block || '', /Administrar 60 mg/i);
  assert.match(block || '', /Dose clínica: 1 cápsula \(10 mg\/kg\)/i);
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
