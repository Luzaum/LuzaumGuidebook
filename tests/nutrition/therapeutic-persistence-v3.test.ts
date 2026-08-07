import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { buildCalculationSnapshotV2 } from '../../modules/energia-vet/lib/calculationPersistenceV2'
import {
  evaluateDietAgainstTherapeuticProfiles,
  THERAPEUTIC_PROFILE_COUNT,
} from '../../modules/energia-vet/lib/nutritionTherapeuticBridge'
import { THERAPEUTIC_NUTRITION_PROFILES_V3 } from '../../modules/energia-vet/lib/canonical/therapeuticProfilesV3'
import { buildReportProvenanceForCurrentEngine } from '../../modules/energia-vet/lib/reportVersions'
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

describe('Perfis terapêuticos canônicos', () => {
  it('catálogo contém perfis declarativos versionados', () => {
    assert.equal(THERAPEUTIC_NUTRITION_PROFILES_V3.length, THERAPEUTIC_PROFILE_COUNT)
    assert.ok(THERAPEUTIC_NUTRITION_PROFILES_V3.every((profile) => profile.version.length > 0))
  })

  it('comorbidade renal ativa perfil canino', () => {
    const review = evaluateDietAgainstTherapeuticProfiles({
      species: 'dog',
      comorbidityIds: ['insuficiencia_renal_estagio_2'],
      evaluation: mockEvaluation(0.8),
    })
    assert.ok(review.activeProfileIds.some((id) => id.startsWith('ckd_dog')))
  })

  it('proveniência V5 referencia motor canônico', () => {
    const provenance = buildReportProvenanceForCurrentEngine('demo')
    assert.equal(provenance.schemaVersion, 5)
    assert.ok(provenance.calculationEngineVersion.length > 0)
  })

  it('snapshot V2 inclui metadados canônicos', () => {
    const snapshot = buildCalculationSnapshotV2({
      patient: { species: 'dog', currentWeight: 10, ageMonths: 36, muscleCondition: 'normal' },
      energy: { mer: 450, rer: 320 },
      target: { targetEnergy: 400, goal: 'weight_loss' },
      reportId: 'test-report',
    })
    assert.ok(snapshot)
    assert.equal(snapshot!.schemaVersion.length > 0, true)
  })
})
