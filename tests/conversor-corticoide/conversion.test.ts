import assert from 'node:assert/strict'
import test from 'node:test'
import { corticoids, convertDose, formatDose, parsePositive } from '../../modules/conversor-corticoide/conversion'
const drug = (id: string) => corticoids.find(d => d.id === id)!
test('clinical anchors use equivalent doses, not rounded potency ratios', () => {
  assert.equal(convertDose(5, drug('prednisolona'), drug('dexametasona')), 0.75)
  assert.equal(convertDose(20, drug('hidrocortisona'), drug('metilprednisolona')), 4)
  assert.equal(convertDose(5, drug('prednisolona'), drug('betametasona')), 0.6)
  assert.equal(convertDose(5, drug('prednisolona'), drug('triancinolona')), 4)
  assert.equal(convertDose(5, drug('prednisolona'), drug('flumetasona')), 1.5)
})
test('all supported pairs preserve dose through a round trip', () => {
  for (const from of corticoids.filter(d => d.equivalentMg)) {
    for (const to of corticoids.filter(d => d.equivalentMg)) {
      const converted = convertDose(7.23, from, to)!
      assert.ok(Math.abs(convertDose(converted, to, from)! - 7.23) < 1e-10)
    }
  }
})
test('unsupported drugs never generate a dose in either direction', () => {
  for (const d of corticoids.filter(d => !d.equivalentMg)) {
    assert.equal(convertDose(5, d, drug('prednisolona')), null)
    assert.equal(convertDose(5, drug('prednisolona'), d), null)
  }
})
test('reject invalid and overflow inputs; accept Brazilian decimals', () => {
  for (const text of ['', ' ', '0', '-1', 'NaN', 'Infinity', '1e3', '1,000.5', '1.2.3', 'abc']) assert.equal(parsePositive(text), null)
  assert.equal(parsePositive(' 0,75 '), 0.75)
  assert.equal(parsePositive('1.5'), 1.5)
  for (const n of [0, -1, Infinity, NaN]) assert.equal(convertDose(n, drug('prednisolona'), drug('dexametasona')), null)
  assert.equal(convertDose(Number.MAX_VALUE, drug('betametasona'), drug('hidrocortisona')), null)
  assert.notEqual(formatDose(0.0000002), '0')
})
