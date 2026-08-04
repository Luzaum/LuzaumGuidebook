import assert from 'node:assert/strict'
import { afterEach, describe, it } from 'node:test'
import { buildCalculationSnapshotV2 } from '../../modules/energia-vet/lib/calculationPersistenceV2'
import {
  evaluateDietAgainstTherapeuticProfiles,
  THERAPEUTIC_PROFILE_COUNT,
} from '../../modules/energia-vet/lib/nutritionTherapeuticBridge'
import { THERAPEUTIC_PROFILES } from '../../modules/energia-vet/lib/clinical/therapeuticProfiles'
import { buildReportProvenanceForCurrentEngine } from '../../modules/energia-vet/lib/reportVersions'
import {
  clearNutritionFeatureOverrides,
  setNutritionFeatureOverride,
} from '../../modules/energia-vet/lib/featureFlags'
import type { DietEvaluation } from '../../modules/energia-vet/types'

function mockEvaluation(phosphorusPct: number | null): DietEvaluation {
  return {
    totalDelivered: { phosphorusPct: phosphorusPct != null ? (phosphorusPct * 50) / 100 : null },
    deliveredAsPercentDm: { phosphorusPct },
    deliveredPer1000Kcal: {},
    deliveredPer100Kcal: {},
    deliveredPerMetabolicBw: {},
    deliveredPerKgBw: {},
    macroSplit: [],
    adequacy: [],
    appliedRequirementIds: [],
    missingDataFlags: [],
    alerts: [],
  }
}

describe('Perfis terapêuticos v3', () => {
  it('catálogo versionado contém 28 perfis', () => {
    assert.equal(THERAPEUTIC_PROFILES.length, THERAPEUTIC_PROFILE_COUNT)
    assert.ok(THERAPEUTIC_PROFILES.every((profile) => profile.ruleSetVersion.includes('nutrition-clinical')))
  })

  it('perfil renal canino avalia fósforo entregue', () => {
    const review = evaluateDietAgainstTherapeuticProfiles({
      species: 'dog',
      therapeuticProfileIds: ['renal_ckd_dog'],
      evaluation: mockEvaluation(0.8),
      totalDryMatterGrams: 100,
    })

    assert.ok(review.activeProfileIds.includes('renal_ckd_dog'))
    const renal = review.profiles.find((profile) => profile.profileId === 'renal_ckd_dog')
    assert.ok(renal)
    assert.equal(renal!.status, 'caution')
  })

  it('sem comorbidades — revisão terapêutica vazia', () => {
    const review = evaluateDietAgainstTherapeuticProfiles({
      species: 'cat',
      comorbidityIds: [],
      evaluation: mockEvaluation(0.4),
      totalDryMatterGrams: 80,
    })
    assert.equal(review.overallStatus, 'none')
    assert.equal(review.profiles.length, 0)
  })
})

describe('Persistência e proveniência v3', () => {
  afterEach(() => clearNutritionFeatureOverrides())

  it('snapshot v2 inclui assessment e energia prescrita', () => {
    const snapshot = buildCalculationSnapshotV2({
      patient: {
        species: 'dog',
        currentWeight: 15,
        ageMonths: 48,
        sex: 'male',
        isNeutered: true,
        bcs: 5,
        muscleCondition: 'normal',
        activityHoursPerDay: 1,
      },
      energy: { mer: 850, rer: 534 },
      target: { goal: 'maintenance', targetEnergy: 850 },
    })

    assert.ok(snapshot)
    assert.ok(snapshot!.prescribedEnergy.finalPrescribedKcalDay > 0)
    assert.equal(snapshot!.assessment.species, 'dog')
  })

  it('proveniência v5 usa motor v3 quando flag ativa', () => {
    setNutritionFeatureOverride('nutrition_calculation_engine_v3', true)
    const provenance = buildReportProvenanceForCurrentEngine()
    assert.match(provenance.calculationEngineVersion, /nutrition-calc-v3/)
    assert.match(provenance.clinicalRuleSetVersion, /nutrition-clinical-v2/)
  })
})
