import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  applyGoalCalibratedTargets,
  buildNutrientCalibrationContext,
  calibrateNutrientTargets,
} from '../../modules/energia-vet/lib/canonical/nutrientTargetCalibration'
import { mapStoreToCanonicalInput } from '../../modules/energia-vet/lib/canonical/mappers'
import { resolveTherapeuticConflicts } from '../../modules/energia-vet/lib/canonical/therapeuticConflictResolver'
import type { ResolvedNutrientTarget } from '../../modules/energia-vet/lib/canonical/types'

describe('Calibração de metas nutricionais', () => {
  it('eleva proteína mínima em %MS durante emagrecimento', () => {
    const input = mapStoreToCanonicalInput({
      patient: { species: 'dog', currentWeight: 15, bcs: 8, comorbidityIds: ['obesidade'] },
      energy: { mer: 450 },
      target: { goal: 'weight_loss', targetWeight: 12 },
      nutritionalGoal: 'weight_loss',
    })
    input.calculationPreferences.nutritionalGoal = 'weight_loss'

    const ctx = buildNutrientCalibrationContext(input, {
      maintenanceEnergyKcal: 900,
      targetEnergyKcal: 650,
    })

    const targets: ResolvedNutrientTarget[] = [
      {
        nutrientKey: 'crudeProteinPct',
        labelPt: 'Proteína',
        basis: 'dry_matter_pct',
        minimum: 14,
        maximum: 20,
        unit: '% MS',
        profileId: 'obesity_dog',
        profileVersion: 'v3',
        evidenceIds: ['aaha-2021-nutrition'],
        confidence: 'high',
        rationale: 'Base AAHA.',
      },
    ]

    const calibrated = calibrateNutrientTargets(targets, ctx)
    assert.ok(calibrated[0].minimum != null)
    assert.ok(calibrated[0].minimum! > 14)
    assert.ok(calibrated[0].calibratedForGoal === 'weight_loss')
    assert.ok(calibrated[0].equivalentPer1000Kcal?.minimum != null)
  })

  it('adiciona metas basais para cardiopatia e neoplasia', () => {
    const input = mapStoreToCanonicalInput({
      patient: { species: 'dog', currentWeight: 20, comorbidityIds: ['insuficiencia_cardiaca', 'neoplasia'] },
      energy: { mer: 700 },
    })
    input.calculationPreferences.nutritionalGoal = 'maintenance'

    const ctx = buildNutrientCalibrationContext(input, {
      maintenanceEnergyKcal: 700,
      targetEnergyKcal: 700,
    })

    const calibrated = applyGoalCalibratedTargets(input, [], {
      maintenanceEnergyKcal: 700,
      targetEnergyKcal: 700,
      activeProfileIds: ['cardiac_dog_stage_c', 'oncology_support'],
    })

    assert.ok(calibrated.some((t) => t.nutrientKey === 'sodiumPct'))
    assert.ok(calibrated.some((t) => t.nutrientKey === 'crudeProteinPct'))
    assert.ok(calibrated.every((t) => t.minimum != null || t.maximum != null || t.rationale.length > 0))
    void ctx
  })

  it('moderates gordura máxima no emagrecimento', () => {
    const input = mapStoreToCanonicalInput({
      patient: { species: 'dog', currentWeight: 12 },
    })
    input.calculationPreferences.nutritionalGoal = 'weight_loss'

    const ctx = buildNutrientCalibrationContext(input, {
      maintenanceEnergyKcal: 600,
      targetEnergyKcal: 480,
    })

    const targets: ResolvedNutrientTarget[] = [
      {
        nutrientKey: 'etherExtractPct',
        labelPt: 'Gordura',
        basis: 'percent_me',
        maximum: 30,
        unit: '% ME',
        profileId: 'pancreatitis_dog',
        profileVersion: 'v3',
        evidenceIds: ['applied-clinical-nutrition'],
        confidence: 'low',
        rationale: 'Base pancreatite.',
      },
    ]

    const calibrated = calibrateNutrientTargets(targets, ctx)
    assert.ok(calibrated[0].maximum != null)
    assert.ok(calibrated[0].maximum! <= 25)
  })

  it('diabetes + DRC IRIS 3 expõe fibra numérica e conflito proteico', () => {
    const input = mapStoreToCanonicalInput({
      patient: {
        species: 'dog',
        currentWeight: 5,
        comorbidityIds: ['diabetes_mellitus', 'insuficiencia_renal_estagio_3'],
      },
      energy: { resolvedEnergyProfileId: 'dog_adult_intact', clinicalMerAdjustmentEnabled: false, mer: 421 },
      target: { goal: 'maintenance' },
    })

    const result = resolveTherapeuticConflicts(input)

    const fiber = result.resolvedTargets.find((t) => t.nutrientKey === 'crudeFiberPct')
    assert.ok(fiber)
    assert.equal(fiber?.minimum, 7)
    assert.equal(fiber?.maximum, 15)

    const proteins = result.resolvedTargets.filter((t) => t.nutrientKey === 'crudeProteinPct')
    assert.equal(proteins.length, 2)
    assert.ok(result.unresolvedConflicts.some((c) => c.nutrientKey === 'crudeProteinPct'))
    assert.equal(input.calculationPreferences.clinicianEnergyOverrideKcalDay, undefined)
  })
})
