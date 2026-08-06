import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  PERCENT_OVERWEIGHT_BY_BCS,
  estimateIdealWeightFromOverweight,
  estimateTargetWeight,
} from '../../modules/energia-vet/lib/nutrition-calculations/bodyComposition'
import {
  buildWeightLossEnergyOptions,
  calculateDogWeightLossAaha,
  calculateCatWeightLossAaha,
  selectWeightLossEnergy,
} from '../../modules/energia-vet/lib/nutrition-calculations/energyWeightManagement'
import { formatClinicalLabelPtBr, normalizeClinicalKey } from '../../modules/energia-vet/lib/clinicalLabelUtils'
import type { NutritionPatientAssessment } from '../../modules/energia-vet/lib/nutrition-calculations/types'

describe('Cutover canônico AAHA — peso-alvo 15 kg', () => {
  const cases = [
    { bcs: 6, expected: 13.636 },
    { bcs: 7, expected: 12.5 },
    { bcs: 8, expected: 11.538 },
    { bcs: 9, expected: 10.714 },
  ] as const

  for (const { bcs, expected } of cases) {
    it(`ECC ${bcs}/9 → ${expected.toFixed(3)} kg`, () => {
      const est = estimateIdealWeightFromOverweight(15, bcs)
      assert.ok(Math.abs(est.targetWeightKg - expected) < 0.01)
      assert.equal(est.method, 'aaha_ecc_estimate')
    })
  }

  it('ECC 6 não usa multiplicador legado ×0,85', () => {
    const legacyWrong = 15 * 0.85
    const canonical = estimateIdealWeightFromOverweight(15, 6).targetWeightKg
    assert.notEqual(Math.round(canonical * 100), Math.round(legacyWrong * 100))
    assert.ok(Math.abs(canonical - 13.636) < 0.01)
  })
})

describe('Seleção energética — sem média entre métodos', () => {
  const assessment: NutritionPatientAssessment = {
    species: 'dog',
    currentWeightKg: 15,
    bodyConditionScore9: 7,
    muscleCondition: 'normal',
    ageMonths: 48,
    sex: 'female',
    neuterStatus: 'neutered',
    lifeStage: 'adult',
    activity: { environment: 'indoor', lowImpactHoursPerDay: 1 },
    nutritionalGoal: 'weight_loss',
    currentDietHistory: {
      reliable: true,
      weightStable: true,
      daysRecorded: 7,
      foods: [{ foodId: 'main', kcalPerDay: 900 }],
      treatsKcalPerDay: 50,
      chewsKcalPerDay: 0,
      medicationVehicleKcalPerDay: 0,
      supplementsKcalPerDay: 0,
    },
  }

  it('AAHA e histórico permanecem distintos', () => {
    const options = buildWeightLossEnergyOptions(assessment, 12.5)
    assert.ok(options.observed)
    assert.notEqual(options.aaha.selectedTargetKcalDay, options.observed!.selectedTargetKcalDay)
    const avg = (options.aaha.selectedTargetKcalDay + options.observed!.selectedTargetKcalDay) / 2
    assert.notEqual(selectWeightLossEnergy(options, 'aaha2021').selectedTargetKcalDay, avg)
  })
})

describe('Rótulos clínicos PT-BR', () => {
  it('normaliza chaves e formata rótulos', () => {
    assert.equal(normalizeClinicalKey('Gestação'), 'gestacao')
    assert.equal(formatClinicalLabelPtBr('Cancer Cães'), 'Câncer Cães')
    assert.equal(formatClinicalLabelPtBr('Doença Intestinal Inflamatoria Cães'), 'Doença Intestinal Inflamatória Cães')
  })
})

describe('Wizard novo — sem calculateIdealWeightCustom', () => {
  it('TargetStep não importa motor legado de peso-alvo', () => {
    const source = readFileSync(
      resolve('modules/energia-vet/pages/steps/TargetStep.tsx'),
      'utf8',
    )
    assert.ok(!source.includes('calculateIdealWeightCustom'))
    assert.ok(!source.includes('calculateEnergyGoalFromBcs'))
  })
})

describe('Goldens energéticos AAHA', () => {
  it('cão 12,5 kg ideal', () => {
    const a = calculateDogWeightLossAaha(12.5)
    assert.ok(Math.abs(a.kcal - 63 * Math.pow(12.5, 0.75)) < 1)
  })

  it('gato 4,25 kg ideal', () => {
    const a = calculateCatWeightLossAaha(4.25)
    assert.ok(Math.abs(a.kcal - 52 * Math.pow(4.25, 0.711)) < 2)
  })
})

describe('Hierarquia peso-alvo', () => {
  it('peso saudável anterior precede ECC', () => {
    const est = estimateTargetWeight({
      species: 'dog',
      currentWeightKg: 15,
      bcs: 7,
      goal: 'weight_loss',
      previousHealthyWeightKg: 13.2,
    })
    assert.equal(est.targetWeightKg, 13.2)
    assert.equal(est.method, 'previous_healthy_weight')
  })
})
