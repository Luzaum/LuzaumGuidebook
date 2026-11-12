import assert from 'node:assert/strict';
import { test } from 'node:test';
import { APPLE_MODELS, calculateApple } from '../../modules/consulta-vet/data/appleScore';
import { APPLE_HELP } from '../../modules/consulta-vet/data/appleHelp';

for (const model of Object.values(APPLE_MODELS)) {
  test(`${model.id}: all-zero and maximum scores, missing parameters and help coverage`, () => {
    const zeros = Object.fromEntries(model.variables.map((item) => [item.id, item.ranges.findIndex((range) => range.points === 0)]));
    const maximum = Object.fromEntries(model.variables.map((item) => [item.id, item.ranges.findIndex((range) => range.points === Math.max(...item.ranges.map((entry) => entry.points)))]));
    assert.equal(calculateApple(model, zeros).total, 0);
    assert.equal(calculateApple(model, maximum).total, model.max);
    assert.equal(calculateApple(model, {}).total, null);
    assert.equal(calculateApple(model, {}).risk, null);
    delete zeros[model.variables[0].id];
    assert.equal(calculateApple(model, zeros).complete, false);
    assert.equal(calculateApple(model, zeros).risk, null);
    for (const item of model.variables) {
      assert.ok(APPLE_HELP[item.id], `Missing explanation for ${item.id}`);
      assert.equal(item.ranges.filter((range) => range.points === 0).length, 1);
      assert.ok(item.ranges.every((range) => Number.isInteger(range.points)));
      item.alternateUnits?.forEach((alternate) => assert.equal(alternate.labels.length, item.ranges.length));
    }
  });
}

test('canine FAST clinical example totals 32/50 and 72.1% historical risk', () => {
  const result = calculateApple(APPLE_MODELS['dog-fast'], { glucose: 1, albumin: 0, lactate: 1, platelets: 1, mentation: 2 });
  assert.equal(result.total, 32);
  assert.equal(result.risk?.toFixed(1), '72.1');
});

test('feline FULL preserves the original figure order and weights', () => {
  const model = APPLE_MODELS['cat-full'];
  assert.deepEqual(model.variables.map((item) => item.id), ['mentation', 'temperature', 'pressure', 'lactate', 'pcv', 'urea', 'chloride', 'fluid']);
  assert.deepEqual(model.variables.map((item) => item.ranges.map((range) => range.points)), [
    [0, 4, 7, 8, 9], [6, 4, 3, 0, 1], [9, 4, 0, 1], [0, 5, 6, 9],
    [0, 11, 16, 14, 13, 17], [11, 7, 0, 12, 7, 6], [12, 9, 11, 0, 11, 7], [0, 3, 6],
  ]);
  const result = calculateApple(model, { mentation: 2, temperature: 0, pressure: 1, lactate: 1, pcv: 1, urea: 2, chloride: 0, fluid: 0 });
  assert.equal(result.total, 45);
});

test('invalid range indexes never turn an incomplete score into a result', () => {
  const selections = { glucose: 1, albumin: 0, lactate: 1, platelets: 1, mentation: 2 };
  for (const invalid of [-1, 99, 1.5, NaN]) {
    const result = calculateApple(APPLE_MODELS['dog-fast'], { ...selections, mentation: invalid });
    assert.equal(result.answered, 4);
    assert.equal(result.total, null);
    assert.equal(result.risk, null);
  }
});

test('zero-point paradoxes are preserved, and FULL is not FAST plus extra variables', () => {
  const dog = APPLE_MODELS['dog-fast'];
  assert.equal(dog.variables[0].ranges[4].points, 0);
  assert.equal(dog.variables[0].ranges[3].points, 10);
  const cat = APPLE_MODELS['cat-fast'];
  assert.equal(cat.variables[4].ranges[0].points, 0);
  assert.equal(cat.variables[4].ranges[1].points, 12);
  assert.notDeepEqual(cat.variables[0].ranges, APPLE_MODELS['cat-full'].variables[0].ranges);
});
