import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateOncologyVolumes, getOncologyPresentations } from '../../modules/consulta-vet/data/oncologyPresentations';
import {
  BSAVA_ONCOLOGY_DRUGS,
  calculateOncologyDose,
  getOncologyDoses,
} from '../../modules/consulta-vet/data/quickReferencesData';

function getDrug(id: string) {
  const drug = BSAVA_ONCOLOGY_DRUGS.find((entry) => entry.id === id);
  assert.ok(drug, id);
  return drug;
}

test('todos os esquemas têm apresentação e o volume respeita forma, via e unidade', () => {
  for (const drug of BSAVA_ONCOLOGY_DRUGS) assert.ok(getOncologyPresentations(drug.id).length, drug.id);

  const [injectable, solid, oralLiquid] = getOncologyPresentations('ciclofosfamida');
  assert.deepEqual(calculateOncologyVolumes([100, 125], 'mg', injectable, 20, false), [5, 6.25]);
  assert.deepEqual(calculateOncologyVolumes([50], 'mg', injectable, 20, true), []);
  assert.deepEqual(calculateOncologyVolumes([50], 'mg', solid, 50, true), []);
  assert.deepEqual(calculateOncologyVolumes([5], 'mg', oralLiquid, 2, true), [2.5]);
  assert.deepEqual(calculateOncologyVolumes([5], 'mg', oralLiquid, 0, true), []);
  assert.deepEqual(calculateOncologyVolumes([5], 'mg', oralLiquid, Infinity, true), []);
  assert.deepEqual(calculateOncologyVolumes([5], 'UI', oralLiquid, 2, true), []);
  assert.deepEqual(calculateOncologyVolumes([4000], 'UI', getOncologyPresentations('crisantaspase')[0], 5000, false), [0.8]);
  assert.ok(getOncologyPresentations('ciclofosfamida-metronomica-canina').every((option) => option.kind !== 'injectable'));
});

test('ciclofosfamida convencional e metronômica usam doses e intervalos próprios', () => {
  const conventional = getDrug('ciclofosfamida');
  const metronomic = getDrug('ciclofosfamida-metronomica-canina');
  assert.equal(conventional.regimen, 'conventional');
  assert.equal(metronomic.regimen, 'metronomic');
  const [pulse, fractionated] = getOncologyDoses(conventional, 'canine', 11);
  const [daily] = getOncologyDoses(metronomic, 'canine', 11);
  assert.match(pulse.schedule, /21 dias/);
  assert.match(fractionated.schedule, /48 h/);
  assert.match(daily.schedule, /24 h/);
  assert.deepEqual(calculateOncologyDose(pulse, 11, 0.5), [100, 125]);
  assert.deepEqual(calculateOncologyDose(daily, 11, 0.5), [5, 7.5]);
  assert.deepEqual(getOncologyDoses(metronomic, 'feline', 4), []);
});

test('clorambucila metronômica felina usa mg/kg em vez de superfície corporal', () => {
  const drug = getDrug('clorambucila-metronomica-felina');
  const [dose] = getOncologyDoses(drug, 'feline', 4);
  assert.equal(dose.basis, 'mg/kg');
  assert.match(dose.schedule, /48 h/);
  assert.deepEqual(calculateOncologyDose(dose, 4, 0.252), [1.6, 2.4]);
  assert.deepEqual(calculateOncologyDose(dose, 0, 0), []);
  assert.deepEqual(getOncologyDoses(drug, 'canine', 4), []);
});

test('esquemas convencionais respeitam os intervalos por espécie e a regra ponderal da doxorrubicina', () => {
  const lomustine = getDrug('lomustina');
  assert.match(getOncologyDoses(lomustine, 'canine', 12)[0].schedule, /3 semanas/);
  assert.match(getOncologyDoses(lomustine, 'feline', 4)[0].schedule, /5–6 semanas/);
  assert.deepEqual(getOncologyDoses(getDrug('mitoxantrona'), 'feline', 4)[0].rates, [6.5]);
  const doxorubicin = getDrug('doxorrubicina');
  assert.equal(getOncologyDoses(doxorubicin, 'canine', 14.9)[0].basis, 'mg/kg');
  assert.equal(getOncologyDoses(doxorubicin, 'canine', 15)[0].basis, 'mg/m²');
  assert.equal(getOncologyDoses(doxorubicin, 'feline', 4)[0].basis, 'mg/kg');
});
