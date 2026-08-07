import assert from 'node:assert/strict'
import test from 'node:test'
import { computeDietPlan } from '../../modules/energia-vet/lib/dietEngine'
import { computeFediafEnergy } from '../../modules/energia-vet/lib/fediaf'
import { getDatasetStats, getFoodById } from '../../modules/energia-vet/lib/genutriData'
import {
  calculateIdealWeightCustom,
  calculateRER,
  getWeightGainPercent,
  getWeightLossPercent,
} from '../../modules/energia-vet/lib/nutrition'
import { buildVetiusNutritionPdfFilename } from '../../modules/energia-vet/lib/reportDocument'
import {
  clearNutritionFeatureOverrides,
  setNutritionFeatureOverride,
} from '../../modules/energia-vet/lib/featureFlags'
import { REPORT_V4_SAMPLE } from './fixtures/report-v4-sample'

test('dataset GENUTRI mantém 580 alimentos e 55 perfis', () => {
  const stats = getDatasetStats()
  assert.equal(stats.foods, 580)
  assert.equal(stats.requirements, 55)
  assert.equal(stats.energyRules, 2)
})

test('cão adulto íntegro 15 kg — MER baseline', () => {
  const result = computeFediafEnergy({
    species: 'dog',
    stateId: 'dog_adult_moderate_low_impact',
    weightKg: 15,
  })
  assert.equal(Math.round(result.mer), 838)
  assert.ok(result.rer > 0)
})

test('cão adulto castrado 15 kg — MER baseline', () => {
  const result = computeFediafEnergy({
    species: 'dog',
    stateId: 'dog_adult_low_activity',
    weightKg: 15,
  })
  assert.equal(Math.round(result.mer), 724)
})

test('cão predisposto à obesidade 15 kg — MER baseline', () => {
  const result = computeFediafEnergy({
    species: 'dog',
    stateId: 'dog_adult_obese_prone',
    weightKg: 15,
  })
  assert.equal(Math.round(result.mer), 686)
})

test('gato adulto ativo 4,5 kg — MER baseline', () => {
  const result = computeFediafEnergy({
    species: 'cat',
    stateId: 'cat_adult_active',
    weightKg: 4.5,
  })
  assert.equal(Math.round(result.mer), 274)
})

test('gato indoor/castrado 4,5 kg — MER baseline', () => {
  const result = computeFediafEnergy({
    species: 'cat',
    stateId: 'cat_adult_neutered_indoor',
    weightKg: 4.5,
  })
  assert.equal(Math.round(result.mer), 205)
})

test('manutenção — RER positivo para cão e gato', () => {
  assert.ok(calculateRER(15, 'dog') > 0)
  assert.ok(calculateRER(4.5, 'cat') > 0)
})

test('perda de peso — meta e percentual ECC 7', () => {
  assert.equal(calculateIdealWeightCustom(15, 7, 'weight_loss'), 12)
  assert.equal(getWeightLossPercent(7), 20)
})

test('ganho de peso — meta ECC 3', () => {
  assert.ok(Math.abs(calculateIdealWeightCustom(4.5, 3, 'weight_gain') - 5.4) < 0.01)
  assert.equal(getWeightGainPercent(3), 20)
})

test('dieta com um alimento — quantidade e energia', () => {
  const plan = computeDietPlan({
    entries: [{ foodId: 'racao-all-canis-adultos', inclusionPct: 100 }],
    targetEnergy: 724,
    species: 'dog',
    weightKg: 15,
    mealsPerDay: 2,
    patientName: 'Rex',
    requirementProfileId: 'fediaf-dog-adult-95-1000kcal',
  })

  assert.equal(plan.contributions.length, 1)
  assert.equal(plan.totalAsFedGrams, 192.04)
  assert.equal(plan.totalKcal, 724)
  assert.ok(plan.totalAsFedGrams > 0)
  assert.ok(plan.totalKcal >= 0)
})

test('dieta com múltiplos alimentos — normalização e energia', () => {
  const plan = computeDietPlan({
    entries: [
      { foodId: 'racao-all-canis-adultos', inclusionPct: 70 },
      { foodId: 'suplemento-critical-care-caes', inclusionPct: 30 },
    ],
    targetEnergy: 724,
    species: 'dog',
    weightKg: 15,
    mealsPerDay: 2,
    patientName: 'Rex',
  })

  assert.equal(plan.contributions.length, 2)
  assert.equal(plan.totalAsFedGrams, 187.41)
  assert.equal(plan.totalKcal, 724)
  const pctSum = plan.contributions.reduce((sum, item) => sum + item.inclusionPct, 0)
  assert.ok(Math.abs(pctSum - 100) < 0.01)
})

test('conversão MN → MS preserva equivalência dentro da tolerância', () => {
  const food = getFoodById('racao-all-canis-adultos')
  assert.ok(food)

  const proteinMn = food.nutrientsAsFed.crudeProteinPct
  const proteinMs = food.nutrientsDryMatter.crudeProteinPct
  const dryMatter = food.nutrientsAsFed.dryMatterPct

  assert.ok(proteinMn != null && proteinMs != null && dryMatter != null && dryMatter > 0)

  const roundtrip = (proteinMn * 100) / dryMatter
  assert.ok(Math.abs(roundtrip - proteinMs) < 0.001)
})

test('nutriente ausente no alimento permanece null (não vira zero)', () => {
  const food = getFoodById('agua')
  assert.ok(food)
  assert.equal(food.nutrientsAsFed.crudeProteinPct, null)
  assert.equal(food.nutrientsDryMatter.crudeProteinPct, null)
})

test('relatório — nome PDF do plano para o tutor', () => {
  const filename = buildVetiusNutritionPdfFilename(REPORT_V4_SAMPLE)
  assert.match(filename, /^VETIUS_NUTRICAO_REX_PLANO_TUTOR_\d{4}-\d{2}-\d{2}\.pdf$/)
  assert.ok(REPORT_V4_SAMPLE.energy.mer)
  assert.ok(REPORT_V4_SAMPLE.diet.entries.length > 0)
  assert.ok(REPORT_V4_SAMPLE.formula.contributions.length > 0)
})
