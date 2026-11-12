import assert from 'node:assert/strict';
import test from 'node:test';
import { calculatePracticalEquivalent } from '../../modules/consulta-vet/utils/practicalEquivalent';

test('respeita a divisibilidade cadastrada em meios de comprimido', () => {
  const result = calculatePracticalEquivalent({
    totalDosePerAdmin: 7.5,
    doseUnit: 'mg',
    presentation: {
      pharmaceutical_form: 'Comprimido',
      value: 10,
      value_unit: 'mg/comprimido',
      per_value: 1,
      per_unit: 'comprimido',
      split_increment: 0.5,
    },
  });

  assert.equal(result.success, true);
  assert.equal(result.equivalentValue, 1);
  assert.match(String(result.alert), /divisibilidade cadastrada/);
});

test('não sugere fração de comprimido sem divisibilidade cadastrada', () => {
  const result = calculatePracticalEquivalent({
    totalDosePerAdmin: 5,
    doseUnit: 'mg',
    presentation: {
      pharmaceutical_form: 'Comprimido',
      value: 10,
      value_unit: 'mg/comprimido',
      per_value: 1,
      per_unit: 'comprimido',
    },
  });

  assert.equal(result.success, false);
  assert.match(String(result.failReason), /Divisibilidade/);
});

test('não recomenda fracionar cápsulas', () => {
  const result = calculatePracticalEquivalent({
    totalDosePerAdmin: 25,
    doseUnit: 'mg',
    presentation: {
      pharmaceutical_form: 'Cápsula',
      value: 50,
      value_unit: 'mg/cápsula',
      per_value: 1,
      per_unit: 'cápsula',
    },
  });

  assert.equal(result.success, false);
  assert.match(String(result.failReason), /não devem ser fracionadas/);
});

test('interpreta o denominador numérico de mg/5 mL', () => {
  const result = calculatePracticalEquivalent({
    totalDosePerAdmin: 20,
    doseUnit: 'mg',
    presentation: {
      pharmaceutical_form: 'Suspensão oral',
      value: 20,
      value_unit: 'mg/5 mL',
      per_value: 1,
      per_unit: 'mL',
    },
  });

  assert.equal(result.success, true);
  assert.equal(result.equivalentValue, 5);
  assert.equal(result.equivalentUnit, 'mL');
});
