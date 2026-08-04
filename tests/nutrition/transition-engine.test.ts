import assert from 'node:assert/strict'
import test from 'node:test'
import { buildTransitionPlan, DEFAULT_SEVEN_DAY_TRANSITION, validateTransitionDayPercents } from '../../modules/energia-vet/lib/nutrition-calculations/transitionEngine'

test('plano padrão de 7 dias soma 100% por dia', () => {
  assert.equal(validateTransitionDayPercents(DEFAULT_SEVEN_DAY_TRANSITION), null)
})

test('transição calcula gramas distintos por densidade energética', () => {
  const result = buildTransitionPlan({
    targetKcalDay: 700,
    previousDiet: { name: 'Dieta A', kcalPerGram: 3.5 },
    newDiet: { name: 'Dieta B', kcalPerGram: 4.0, prescribedGramsPerDay: 175 },
    durationDays: 7,
  })
  assert.ok(!('error' in result))
  if ('error' in result) return
  const day1 = result.rows[0]
  assert.equal(day1.previousDietPercent, 90)
  assert.equal(day1.newDietPercent, 10)
  assert.ok(Math.abs(day1.previousDietGrams - day1.previousDietKcal / 3.5) < 0.01)
  assert.ok(Math.abs(day1.newDietGrams - day1.newDietKcal / 4.0) < 0.01)
  assert.notEqual(day1.previousDietGrams, day1.newDietGrams)
})

test('rejeita percentuais que não somam 100%', () => {
  const result = buildTransitionPlan({
    targetKcalDay: 500,
    previousDiet: { name: 'A', kcalPerGram: 3 },
    newDiet: { name: 'B', kcalPerGram: 3.5, prescribedGramsPerDay: 140 },
    durationDays: 3,
    rows: [
      { day: 1, previousDietPercent: 80, newDietPercent: 10 },
      { day: 2, previousDietPercent: 50, newDietPercent: 50 },
      { day: 3, previousDietPercent: 0, newDietPercent: 100 },
    ],
  })
  assert.ok('error' in result)
})

test('rejeita densidade energética zero', () => {
  const result = buildTransitionPlan({
    targetKcalDay: 500,
    previousDiet: { name: 'A', kcalPerGram: 0 },
    newDiet: { name: 'B', kcalPerGram: 3.5, prescribedGramsPerDay: 140 },
    durationDays: 7,
  })
  assert.ok('error' in result)
})
