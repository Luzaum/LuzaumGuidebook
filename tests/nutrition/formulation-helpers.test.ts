import assert from 'node:assert/strict'
import test from 'node:test'
import {
  completeRemainingEqually,
  equalEntries,
  roundMealGrams,
} from '../../modules/energia-vet/lib/formulationHelpers'
import { buildNutrientGapAdvice } from '../../modules/energia-vet/lib/nutrientGapAdvice'
import type { EvaluatedNutrient, FoodContribution } from '../../modules/energia-vet/types'

test('completeRemainingEqually reparte o restante em partes iguais', () => {
  const entries = [
    { foodId: 'a', inclusionPct: 34 },
    { foodId: 'b', inclusionPct: 10 },
    { foodId: 'c', inclusionPct: 10 },
  ]
  const locked = new Set(['a'])
  const next = completeRemainingEqually(entries, locked)
  assert.ok(next)
  assert.equal(next![0].inclusionPct, 34)
  assert.equal(next![1].inclusionPct, 33)
  assert.equal(next![2].inclusionPct, 33)
  assert.equal(next!.reduce((sum, entry) => sum + entry.inclusionPct, 0), 100)
})

test('completeRemainingEqually reduz nao travados quando total informado passa de 100%', () => {
  const entries = [
    { foodId: 'a', inclusionPct: 34 },
    { foodId: 'b', inclusionPct: 50 },
    { foodId: 'c', inclusionPct: 40 },
  ]
  const locked = new Set(['a'])
  const next = completeRemainingEqually(entries, locked)
  assert.ok(next)
  assert.equal(next![0].inclusionPct, 34)
  assert.equal(next![1].inclusionPct, 33)
  assert.equal(next![2].inclusionPct, 33)
})

test('completeRemainingEqually zera nao travados se travados somarem 100% ou mais', () => {
  const entries = [
    { foodId: 'a', inclusionPct: 70 },
    { foodId: 'b', inclusionPct: 40 },
    { foodId: 'c', inclusionPct: 20 },
  ]
  const locked = new Set(['a', 'b'])
  const next = completeRemainingEqually(entries, locked)
  assert.ok(next)
  assert.equal(next![0].inclusionPct, 70)
  assert.equal(next![1].inclusionPct, 40)
  assert.equal(next![2].inclusionPct, 0)
})

test('completeRemainingEqually sem travados equivale a dividir igualmente', () => {
  const entries = [
    { foodId: 'a', inclusionPct: 20 },
    { foodId: 'b', inclusionPct: 50 },
  ]
  const next = completeRemainingEqually(entries, new Set())
  assert.deepEqual(next, equalEntries(entries))
})

test('roundMealGrams usa arredondamento matemático', () => {
  assert.equal(roundMealGrams(12.4), 12)
  assert.equal(roundMealGrams(12.5), 13)
  assert.equal(roundMealGrams(12.6), 13)
})

test('buildNutrientGapAdvice informa referência, entrega e ideias', () => {
  const row: EvaluatedNutrient = {
    key: 'crudeProteinPct',
    label: 'Proteína bruta',
    unit: '% MS',
    basisType: 'percent_dm',
    deliveredValue: 18,
    target: { kind: 'number', value: 22, raw: 22 },
    status: 'below',
    missingData: false,
  }
  const contributions: FoodContribution[] = [
    {
      foodId: 'usda-peito-frango-assado',
      foodName: 'Peito de frango',
      inclusionPct: 34,
      gramsDryMatter: 50,
      gramsAsFed: 70,
      deliveredKcal: 100,
    },
    {
      foodId: 'usda-arroz-branco-cozido',
      foodName: 'Arroz branco',
      inclusionPct: 66,
      gramsDryMatter: 80,
      gramsAsFed: 120,
      deliveredKcal: 150,
    },
  ]

  const advice = buildNutrientGapAdvice(row, contributions)
  assert.match(advice.referenceLabel, /22/)
  assert.match(advice.deliveredLabel, /18/)
  assert.match(advice.gapLabel, /4/)
  assert.ok(advice.supplementIdeas.length > 0)
  assert.ok(advice.formulationIdeas.some((idea) => idea.includes('Peito de frango')))
})
