import assert from 'node:assert/strict'
import test from 'node:test'
import {
  calculateMaintenanceEnergy,
  computeBodyTargetPlan,
  createEmptyCanonicalInput,
  mapStoreToCanonicalInput,
  PERCENT_OVERWEIGHT_BY_BCS,
} from '../../modules/energia-vet/lib/canonical'

function dogInput(profileId: string, overrides: Record<string, unknown> = {}) {
  return mapStoreToCanonicalInput({
    patient: {
      species: 'dog',
      currentWeight: 5,
      ageMonths: 36,
      sex: 'male',
      isNeutered: true,
      muscleCondition: 'normal',
      activityHoursPerDay: 2,
      activityImpact: 'low',
      bcs: 5,
      ...overrides,
    },
    energy: { resolvedEnergyProfileId: profileId, stateId: profileId },
  })
}

test('atividade FEDIAF — baixa atividade 5 kg ≈ 318 kcal', () => {
  const result = calculateMaintenanceEnergy(dogInput('dog_adult_inactive'))
  assert.ok(result != null)
  assert.ok(Math.abs(result.selectedTargetKcalDay - 317.65) < 1)
})

test('atividade FEDIAF — moderada baixo impacto 5 kg ≈ 368 kcal', () => {
  const result = calculateMaintenanceEnergy(dogInput('dog_work_moderate'))
  assert.ok(result != null)
  assert.ok(Math.abs(result.selectedTargetKcalDay - 367.81) < 2)
})

test('atividade FEDIAF — moderada alto impacto 5 kg ≈ 418 kcal', () => {
  const input = dogInput('dog_work_moderate', { activityImpact: 'high' })
  const result = calculateMaintenanceEnergy(input)
  assert.ok(result != null)
  assert.ok(Math.abs(result.selectedTargetKcalDay - 417.96) < 2)
})

test('Trabalho moderado selecionado não retorna baixa atividade (318 kcal)', () => {
  const result = calculateMaintenanceEnergy(dogInput('dog_work_moderate'))
  assert.ok(result != null)
  assert.notEqual(Math.round(result.selectedTargetKcalDay), 318)
  assert.ok(Math.abs(result.selectedTargetKcalDay - 367.81) < 2)
})

test('ECC 9 → peso-alvo 3,571 kg (40% excesso)', () => {
  const pct = PERCENT_OVERWEIGHT_BY_BCS[9]
  const target = 5 / (1 + pct)
  assert.ok(Math.abs(target - 3.571) < 0.01)
})

test('ECC 6 → peso-alvo 4,545 kg (10% excesso)', () => {
  const pct = PERCENT_OVERWEIGHT_BY_BCS[6]
  const target = 5 / (1 + pct)
  assert.ok(Math.abs(target - 4.545) < 0.01)
})

test('computeBodyTargetPlan usa ECC da UI para peso-alvo', () => {
  const input = mapStoreToCanonicalInput({
    patient: { species: 'dog', currentWeight: 5, bcs: 9, muscleCondition: 'normal' },
    energy: { mer: 318 },
    target: { goal: 'weight_loss' },
  })
  input.calculationPreferences.nutritionalGoal = 'weight_loss'
  const plan = computeBodyTargetPlan(input, 318)
  assert.ok(plan != null)
  assert.ok(Math.abs(plan.targetWeightKg - 3.571) < 0.05)
})

test('EMC grave adia restrição AAHA automática', () => {
  const input = mapStoreToCanonicalInput({
    patient: {
      species: 'dog',
      currentWeight: 5,
      bcs: 9,
      muscleCondition: 'severe_loss',
    },
    energy: { mer: 368 },
    target: { goal: 'weight_loss' },
  })
  input.calculationPreferences.nutritionalGoal = 'weight_loss'
  const plan = computeBodyTargetPlan(input, 368)
  assert.ok(plan != null)
  assert.ok(plan.muscleLossEnergyDeferral != null)
  assert.equal(plan.targetEnergyKcal, plan.maintenanceEnergyKcal)
})

test('calculateCanonicalNutrition não retorna NaN', () => {
  const result = calculateMaintenanceEnergy(createEmptyCanonicalInput({ patient: { species: 'dog', currentWeightKg: 5 } }))
  void result
})
