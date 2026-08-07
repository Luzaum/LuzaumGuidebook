import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildAssessmentFingerprint,
  calculateCanonicalNutrition,
  canonicalNutritionReducer,
  createEmptyCanonicalInput,
  mapLegacySnapshotToCanonical,
  mapStoreToCanonicalInput,
  resolveTherapeuticConflicts,
  validateCanonicalInput,
} from '../../modules/energia-vet/lib/canonical'

function baseDogInput() {
  return createEmptyCanonicalInput({
    patient: {
      species: 'dog',
      currentWeightKg: 5,
      ageMonths: 36,
      sex: 'male',
      neuterStatus: 'neutered',
      bodyConditionScore: { value: 5, scale: 9 },
      muscleConditionScore: 'normal',
      activityHoursPerDay: 2,
      activityImpact: 'low',
    },
    calculationPreferences: {
      selectedBookEnergyProfileId: 'dog_work_moderate',
      nutritionalGoal: 'maintenance',
      safetyMode: 'standard',
    },
  })
}

test('reducer puro altera peso sem mutar referência anterior', () => {
  const before = baseDogInput()
  const after = canonicalNutritionReducer(before, {
    type: 'patient/currentWeightChanged',
    payload: { kg: 6 },
  })
  assert.equal(before.patient.currentWeightKg, 5)
  assert.equal(after.patient.currentWeightKg, 6)
})

test('calculateCanonicalNutrition não retorna NaN', () => {
  const { result } = calculateCanonicalNutrition(baseDogInput())
  assert.ok(result != null)
  assert.ok(Number.isFinite(result!.energy.rerKcalDay))
  assert.ok(Number.isFinite(result!.energy.selectedEnergyTarget.kcalDay))
})

test('Trabalho moderado ≠ baixa atividade', () => {
  const { result } = calculateCanonicalNutrition(baseDogInput())
  assert.ok(result != null)
  assert.notEqual(Math.round(result!.energy.selectedEnergyTarget.kcalDay), 318)
})

test('conflito estruvita vs oxalato exige decisão clínica', () => {
  const input = baseDogInput()
  input.clinical.diagnoses = [
    {
      diagnosisId: 'urolith_struvite_dissolution',
      displayNamePtBr: 'Estruvita',
      species: 'dog',
      active: true,
      source: 'manual',
    },
    {
      diagnosisId: 'urolith_calcium_oxalate_prevention',
      displayNamePtBr: 'Oxalato',
      species: 'dog',
      active: true,
      source: 'manual',
    },
  ]
  const resolution = resolveTherapeuticConflicts(input)
  assert.ok(resolution.unresolvedConflicts.some((c) => c.requiresClinicianDecision))
})

test('fingerprint estável independente da ordem de comorbidades', () => {
  const a = baseDogInput()
  a.clinical.comorbidityIds = ['b', 'a']
  const b = baseDogInput()
  b.clinical.comorbidityIds = ['a', 'b']
  assert.equal(buildAssessmentFingerprint(a), buildAssessmentFingerprint(b))
})

test('migração de snapshot legado gera schema canônico', () => {
  const migrated = mapLegacySnapshotToCanonical({
    patient: { species: 'dog', currentWeight: 5, bcs: 5 },
  })
  assert.ok(migrated.provenance.migratedFromSchemaVersion != null)
})

test('peso zero falha validação', () => {
  const input = baseDogInput()
  input.patient.currentWeightKg = 0
  const issues = validateCanonicalInput(input)
  assert.ok(issues.some((i) => i.severity === 'error'))
})

test('mapStoreToCanonicalInput preserva comorbidades', () => {
  const canonical = mapStoreToCanonicalInput({
    patient: { species: 'dog', currentWeight: 5, comorbidityIds: ['renal-est-3'] },
  })
  assert.deepEqual(canonical.clinical.comorbidityIds, ['renal-est-3'])
})
