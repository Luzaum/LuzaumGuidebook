import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { computeDietPlan } from '../../modules/energia-vet/lib/dietEngine'

describe('FormulationStep — alocação calórica', () => {
  it('70/30 fecha exatamente a meta calórica', () => {
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

  it('alerta quando soma ≠ 100%', () => {
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
})
