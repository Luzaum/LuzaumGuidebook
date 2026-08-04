import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { computeBodyTargetPlan } from '../../modules/energia-vet/lib/nutritionCalculationBridge'

describe('TargetStep — ponte corporal v3', () => {
  it('gato 5 kg ECC 6 — peso-alvo AAHA e energia de perda', () => {
    const plan = computeBodyTargetPlan({
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
      energyStepMerKcal: 260,
    })

    assert.ok(plan)
    assert.ok(Math.abs(plan!.targetWeightKg - 4.545) < 0.02)
    assert.ok(plan!.targetEnergyKcal > 120 && plan!.targetEnergyKcal < 170)
    assert.equal(plan!.maintenanceEnergyKcal, 260)
    assert.ok(plan!.energyFormula.includes('Peso-alvo'))
  })

  it('cão 15 kg ECC 7 — peso-alvo 12,5 kg', () => {
    const plan = computeBodyTargetPlan({
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
    const plan = computeBodyTargetPlan({
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
      energyStepMerKcal: 680,
    })

    assert.ok(plan)
    assert.equal(plan!.targetWeightKg, 12)
    assert.equal(plan!.targetEnergyKcal, 680)
  })

  it('ECC baixo — sinaliza revisão clínica', () => {
    const plan = computeBodyTargetPlan({
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
