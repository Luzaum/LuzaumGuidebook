import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { mapStoreToCanonicalInput, validatePatientInput } from '../../modules/energia-vet/lib/canonical'

describe('PatientStep — validação canônica', () => {
  it('validação exige peso positivo', () => {
    const issues = validatePatientInput(
      mapStoreToCanonicalInput({
        patient: {
          species: 'dog',
          currentWeight: 0,
          ageMonths: 24,
          sex: 'male',
          isNeutered: true,
          muscleCondition: 'normal',
        },
      }),
    )
    assert.ok(issues.some((issue) => issue.path === 'weight'))
  })

  it('validação exige EMC selecionada', () => {
    const issues = validatePatientInput(
      mapStoreToCanonicalInput({
        patient: {
          species: 'dog',
          currentWeight: 12,
          ageMonths: 24,
          sex: 'male',
          isNeutered: true,
        },
      }),
    )
    assert.ok(issues.some((issue) => issue.path === 'emc'))
  })

  it('filhote com EMC informada passa validação básica', () => {
    const issues = validatePatientInput(
      mapStoreToCanonicalInput({
        patient: {
          species: 'dog',
          currentWeight: 8,
          ageMonths: 6,
          sex: 'male',
          isNeutered: false,
          muscleCondition: 'normal',
          activityHoursPerDay: 2,
        },
      }),
    )
    assert.equal(issues.length, 0)
  })

  it('peso saudável anterior é mapeado para entrada canônica', () => {
    const input = mapStoreToCanonicalInput({
      patient: {
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
    })
    assert.equal(input.patient.previousHealthyWeightKg, 4.8)
  })
})
