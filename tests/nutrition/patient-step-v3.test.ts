import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  mapPatientFromStore,
  validatePatientStepForV3,
} from '../../modules/energia-vet/lib/nutritionCalculationBridge'
import { calculatePatientEnergy } from '../../modules/energia-vet/lib/nutrition-calculations'

describe('PatientStep — avaliação clínica v3', () => {
  it('validação exige EMC, atividade e peso', () => {
    const issues = validatePatientStepForV3({
      species: 'dog',
      currentWeight: 12,
      ageMonths: 24,
      sex: 'male',
      isNeutered: true,
    })
    assert.ok(issues.some((issue) => issue.code === 'emc'))
    assert.ok(issues.some((issue) => issue.code === 'activity'))
  })

  it('filhote exige peso adulto esperado', () => {
    const issues = validatePatientStepForV3({
      species: 'dog',
      currentWeight: 8,
      ageMonths: 6,
      sex: 'male',
      isNeutered: false,
      muscleCondition: 'normal',
      activityHoursPerDay: 2,
    })
    assert.ok(issues.some((issue) => issue.code === 'expected_adult_weight'))
  })

  it('histórico documentado exige dias e kcal', () => {
    const issues = validatePatientStepForV3({
      species: 'cat',
      currentWeight: 4.5,
      ageMonths: 36,
      sex: 'female',
      isNeutered: true,
      muscleCondition: 'normal',
      activityHoursPerDay: 0.5,
      dietHistory: { documented: true, reliable: true, weightStable: true },
    })
    assert.ok(issues.some((issue) => issue.code === 'diet_days'))
    assert.ok(issues.some((issue) => issue.code === 'diet_kcal'))
  })

  it('ingestão estável calibra manutenção pelo histórico', () => {
    const assessment = mapPatientFromStore(
      {
        species: 'dog',
        currentWeight: 15,
        ageMonths: 48,
        sex: 'male',
        isNeutered: true,
        bcs: 5,
        muscleCondition: 'normal',
        activityHoursPerDay: 1,
        dietHistory: {
          documented: true,
          reliable: true,
          weightStable: true,
          daysRecorded: 7,
          mainFoodKcalPerDay: 800,
          treatsKcalPerDay: 50,
        },
      },
      {},
      'maintenance',
    )

    const { result } = calculatePatientEnergy(assessment)
    assert.ok(result)
    assert.equal(result!.clinicalProfileLabel, 'Ingestão observada estável')
    assert.ok(Math.abs(result!.selectedTargetKcalDay - 850) < 1)
  })

  it('peso saudável anterior alimenta meta de ganho', () => {
    const assessment = mapPatientFromStore(
      {
        species: 'cat',
        currentWeight: 4,
        ageMonths: 48,
        sex: 'male',
        isNeutered: true,
        bcs: 3,
        muscleCondition: 'mild_loss',
        activityHoursPerDay: 1,
        previousHealthyWeightKg: 4.8,
      },
      {},
      'weight_gain',
    )

    assert.equal(assessment.previousWeights?.[0]?.weightKg, 4.8)
  })
})
