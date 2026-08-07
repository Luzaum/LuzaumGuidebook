import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { computeBodyTargetPlan, mapStoreToCanonicalInput } from '../../modules/energia-vet/lib/canonical'

function planFor(options: {
  patient: Record<string, unknown>
  goal: 'weight_loss' | 'weight_gain' | 'maintenance'
  mer?: number
}) {
  const input = mapStoreToCanonicalInput({
    patient: options.patient,
    target: { goal: options.goal },
  })
  input.calculationPreferences.nutritionalGoal = options.goal
  return computeBodyTargetPlan(input, options.mer)
}

describe('TargetStep — meta corporal canônica', () => {
  it('gato 5 kg ECC 6 — peso-alvo AAHA e energia de perda', () => {
    const plan = planFor({
      patient: {
        species: 'cat',
        currentWeight: 5,
        ageMonths: 48,
        sex: 'female',
        isNeutered: true,
        bcs: 6,
        isIndoor: true,
        muscleCondition: 'normal',
        activityHoursPerDay: 0.5,
      },
      goal: 'weight_loss',
      mer: 260,
    })

    assert.ok(plan)
    assert.ok(Math.abs(plan!.targetWeightKg - 4.545) < 0.02)
    assert.ok(plan!.targetEnergyKcal > 120 && plan!.targetEnergyKcal < 170)
    assert.equal(plan!.maintenanceEnergyKcal, 260)
    assert.ok(plan!.energyFormula.includes('Peso-alvo'))
  })

  it('cão 5 kg ECC 6 — AAHA no peso-alvo (~196 kcal) vs manutenção atual', () => {
    const plan = planFor({
      patient: {
        species: 'dog',
        currentWeight: 5,
        ageMonths: 36,
        sex: 'male',
        isNeutered: false,
        bcs: 6,
        muscleCondition: 'normal',
        activityHoursPerDay: 1,
      },
      goal: 'weight_loss',
      mer: 421,
    })

    assert.ok(plan)
    assert.ok(Math.abs(plan!.targetWeightKg - 4.545) < 0.02)
    assert.ok(Math.abs(plan!.targetEnergyKcal - 196) < 3)
    assert.equal(plan!.maintenanceEnergyKcal, 421)
    assert.ok(plan!.targetEnergyKcal < plan!.maintenanceEnergyKcal * 0.6)
  })

  it('cão 15 kg ECC 7 — peso-alvo 12,5 kg', () => {
    const plan = planFor({
      patient: {
        species: 'dog',
        currentWeight: 15,
        ageMonths: 60,
        sex: 'male',
        isNeutered: true,
        bcs: 7,
        muscleCondition: 'normal',
        activityHoursPerDay: 1,
      },
      goal: 'weight_loss',
    })

    assert.ok(plan)
    assert.ok(Math.abs(plan!.targetWeightKg - 12.5) < 0.01)
    assert.ok(plan!.targetEnergyKcal > 400)
  })

  it('manutenção mantém peso e energia da etapa anterior', () => {
    const plan = planFor({
      patient: {
        species: 'dog',
        currentWeight: 12,
        ageMonths: 36,
        sex: 'male',
        isNeutered: true,
        bcs: 5,
        muscleCondition: 'normal',
        activityHoursPerDay: 1,
      },
      goal: 'maintenance',
      mer: 680,
    })

    assert.ok(plan)
    assert.equal(plan!.targetWeightKg, 12)
    assert.equal(plan!.targetEnergyKcal, 680)
  })

  it('ECC baixo — sinaliza revisão clínica', () => {
    const plan = planFor({
      patient: {
        species: 'cat',
        currentWeight: 4,
        ageMonths: 36,
        sex: 'male',
        isNeutered: true,
        bcs: 3,
        muscleCondition: 'mild_loss',
        activityHoursPerDay: 1,
      },
      goal: 'weight_gain',
    })

    assert.ok(plan)
    assert.equal(plan!.idealWeightEstimate.requiresClinicianReview, true)
  })
})
