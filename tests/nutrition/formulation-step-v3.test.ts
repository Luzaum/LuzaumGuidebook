import assert from 'node:assert/strict'
import { afterEach, describe, it } from 'node:test'
import { computeDietPlan } from '../../modules/energia-vet/lib/dietEngine'
import {
  clearNutritionFeatureOverrides,
  setNutritionFeatureOverride,
} from '../../modules/energia-vet/lib/featureFlags'

describe('FormulationStep — alocação calórica v3', () => {
  afterEach(() => clearNutritionFeatureOverrides())

  it('v3 — 70/30 fecha exatamente a meta calórica', () => {
    setNutritionFeatureOverride('nutrition_calculation_engine_v3', true)
    const plan = computeDietPlan({
      entries: [
        { foodId: 'racao-all-canis-adultos', inclusionPct: 70 },
        { foodId: 'suplemento-critical-care-caes', inclusionPct: 30 },
      ],
      targetEnergy: 724,
      species: 'dog',
      weightKg: 15,
      mealsPerDay: 2,
      patientName: 'Rex',
    })

    assert.equal(plan.contributions.length, 2)
    assert.ok(Math.abs(plan.totalKcal - 724) < 0.1)
    assert.ok(plan.evaluation.alerts.every((alert) => !alert.includes('Proporções calóricas somam')))
  })

  it('v3 — bloqueia cálculo quando soma ≠ 100%', () => {
    setNutritionFeatureOverride('nutrition_calculation_engine_v3', true)
    const plan = computeDietPlan({
      entries: [
        { foodId: 'racao-all-canis-adultos', inclusionPct: 70 },
        { foodId: 'suplemento-critical-care-caes', inclusionPct: 20 },
      ],
      targetEnergy: 724,
      species: 'dog',
      weightKg: 15,
      mealsPerDay: 2,
      patientName: 'Rex',
    })

    assert.equal(plan.contributions.length, 0)
    assert.ok(plan.evaluation.alerts.some((alert) => alert.includes('Proporções calóricas somam 90.0%')))
  })

  it('legado — normaliza silenciosamente 70/20 para 100%', () => {
    const plan = computeDietPlan({
      entries: [
        { foodId: 'racao-all-canis-adultos', inclusionPct: 70 },
        { foodId: 'suplemento-critical-care-caes', inclusionPct: 20 },
      ],
      targetEnergy: 724,
      species: 'dog',
      weightKg: 15,
      mealsPerDay: 2,
      patientName: 'Rex',
    })

    assert.equal(plan.contributions.length, 2)
    assert.ok(Math.abs(plan.totalKcal - 724) < 1)
    const pctSum = plan.contributions.reduce((sum, item) => sum + item.inclusionPct, 0)
    assert.ok(Math.abs(pctSum - 100) < 0.01)
  })
})
