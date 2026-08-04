import assert from 'node:assert/strict'
import test from 'node:test'
import { humanOmega3ProductsSeed } from '../../modules/energia-vet/data/humanOmega3/products.seed'
import {
  clearNutritionFeatureOverrides,
  isNutritionFeatureEnabled,
  setNutritionFeatureOverride,
} from '../../modules/energia-vet/lib/featureFlags'
import { filterFoods, getAllFoods, GENUTRI_FOODS } from '../../modules/energia-vet/lib/genutriData'
import {
  calculateOmega3Dose,
  costPer1000MgEpaDha,
  monthlyCost,
  rejectFishOilTitleAsEpaDha,
} from '../../modules/energia-vet/lib/humanOmega3/doseCalculator'
import { humanOmega3ToFoodItem } from '../../modules/energia-vet/lib/humanOmega3/foodBridge'
import {
  canCalculateDose,
  hasBlockedSweetener,
  inferEpaDhaPerUnit,
  isDhaPredominant,
  isMisleadingCommercialTitle,
  isProductBlocked,
  missingEpaDhaToNull,
  shouldWarnSubstituteBalanced,
} from '../../modules/energia-vet/lib/humanOmega3/regulatoryValidation'
import { getHumanOmega3Stats } from '../../modules/energia-vet/lib/humanOmega3/catalogService'
import { VETERINARY_OMEGA3_PRESETS } from '../../modules/energia-vet/lib/humanOmega3/veterinaryDoses'
import type { HumanOmega3Product } from '../../modules/energia-vet/lib/humanOmega3/types'

test.afterEach(() => {
  clearNutritionFeatureOverrides()
})

test('feature flag nutrition_human_omega3 desligada por padrão', () => {
  assert.equal(isNutritionFeatureEnabled('nutrition_human_omega3'), false)
})

test('build legado inalterado com flag desligada', () => {
  assert.equal(getAllFoods().length, GENUTRI_FOODS.length)
})

test('ômega-3 humanos entram como alimentos suplemento quando flag ativa', () => {
  setNutritionFeatureOverride('nutrition_human_omega3', true)
  const merged = getAllFoods()
  assert.ok(merged.length > GENUTRI_FOODS.length)
  const omegaFoods = merged.filter((f) => f.notes?.some((n) => n.startsWith('food_kind=human_omega3_food')))
  assert.ok(omegaFoods.length > 0)
  assert.ok(omegaFoods.every((f) => f.foodType === 'suplemento'))
  assert.ok(omegaFoods.every((f) => f.name.startsWith('[Humano]')))
})

test('1000 mg comercial não equivale a EPA+DHA', () => {
  const product = humanOmega3ProductsSeed.find((p) => p.slug === 'catarinense-omega-3-1000mg')!
  assert.ok(rejectFishOilTitleAsEpaDha(1000, product.epaDhaMgPerUnit!))
  assert.ok(isMisleadingCommercialTitle('Ômega-3 1000 mg'))
})

test('EPA e DHA armazenados separadamente', () => {
  const preferred = humanOmega3ProductsSeed.find((p) => p.slug === 'catarinense-omega-3-concentrado-alasca')!
  assert.equal(preferred.epaMgPerUnit, 570)
  assert.equal(preferred.dhaMgPerUnit, 230)
  assert.notEqual(preferred.epaMgPerUnit, preferred.dhaMgPerUnit)
})

test('produto DHA predominante não substitui balanceado', () => {
  const dhaProduct = humanOmega3ProductsSeed.find((p) => p.slug === 'essential-dha-tg')!
  const balanced = humanOmega3ProductsSeed.find((p) => p.slug === 'essential-super-omega-3-tg')!
  assert.ok(shouldWarnSubstituteBalanced(dhaProduct))
  assert.ok(isDhaPredominant(dhaProduct))
  assert.equal(shouldWarnSubstituteBalanced(balanced), false)
})

test('xilitol bloqueia produto', () => {
  const withXylitol = {
    sweeteners: ['xilitol'],
    veterinarySuitability: 'acceptable',
    marketStatus: 'active',
    clinicalCalculationEnabled: true,
    sourceType: 'fish_oil',
  } as HumanOmega3Product
  assert.ok(hasBlockedSweetener(withXylitol))
  const kids = humanOmega3ProductsSeed.find((p) => p.slug === 'catarinense-omega-3-kids-mastigavel')!
  assert.ok(hasBlockedSweetener(kids))
})

test('multivitamínico bloqueado', () => {
  const multi = humanOmega3ProductsSeed.find((p) => p.slug === 'catarinense-omega-3-multi-a-z')!
  assert.ok(isProductBlocked(multi))
  assert.equal(canCalculateDose(multi), false)
})

test('óleo de fígado de bacalhau bloqueado', () => {
  const cod = humanOmega3ProductsSeed.find((p) => p.sourceType === 'cod_liver_oil')!
  assert.ok(isProductBlocked(cod))
})

test('óleo de linhaça não é equivalente a EPA/DHA', () => {
  const flax = humanOmega3ProductsSeed.find((p) => p.sourceType === 'plant_ala')!
  assert.ok(isProductBlocked(flax))
})

test('mastigável infantil bloqueado', () => {
  const chew = humanOmega3ProductsSeed.find((p) => p.slug === 'catarinense-omega-3-kids-mastigavel')!
  assert.ok(isProductBlocked(chew))
})

test('coenzima Q10 não habilita cálculo automático', () => {
  const q10 = humanOmega3ProductsSeed.find((p) => p.slug === 'puravida-omega-3-pulse')!
  assert.equal(q10.clinicalCalculationEnabled, false)
  assert.equal(canCalculateDose(q10), false)
})

test('conflito de rótulo desabilita cálculo', () => {
  const conflict = humanOmega3ProductsSeed.find((p) => p.slug === 'probiotica-pure-omega-3-tg-1400')!
  assert.equal(conflict.marketStatus, 'conflicting_data')
  assert.equal(canCalculateDose(conflict), false)
})

test('valores ausentes não viram zero', () => {
  assert.equal(missingEpaDhaToNull(undefined), null)
  assert.equal(missingEpaDhaToNull(null), null)
  const inferred = inferEpaDhaPerUnit({
    epaMgPerUnit: null,
    dhaMgPerUnit: null,
    epaDhaMgPerUnit: null,
  } as HumanOmega3Product)
  assert.equal(inferred.epaMgPerUnit, null)
  assert.equal(inferred.dhaMgPerUnit, null)
})

test('dose desconta EPA+DHA da dieta', () => {
  const product = humanOmega3ProductsSeed.find((p) => p.slug === 'catarinense-omega-3-concentrado-alasca')!
  const withoutDiet = calculateOmega3Dose({
    weightKg: 20,
    species: 'dog',
    product,
    prescription: VETERINARY_OMEGA3_PRESETS.nutritional_general,
  })!
  const withDiet = calculateOmega3Dose({
    weightKg: 20,
    species: 'dog',
    product,
    prescription: VETERINARY_OMEGA3_PRESETS.nutritional_general,
    dietEpaDhaMgPerDay: 200,
  })!
  assert.ok(withDiet.exactCapsules < withoutDiet.exactCapsules)
})

test('limite felino gera alerta em dose alta', () => {
  const product = humanOmega3ProductsSeed.find((p) => p.slug === 'catarinense-omega-3-concentrado-alasca')!
  const result = calculateOmega3Dose({
    weightKg: 5,
    species: 'cat',
    product,
    prescription: VETERINARY_OMEGA3_PRESETS.nrc_upper_safe,
  })!
  assert.ok(result.felineLimitAlert)
})

test('dose exata e opções práticas inferiores/superiores', () => {
  const product = humanOmega3ProductsSeed.find((p) => p.slug === 'nutrify-omega-3')!
  const result = calculateOmega3Dose({
    weightKg: 15,
    species: 'dog',
    product,
    prescription: VETERINARY_OMEGA3_PRESETS.nutritional_general,
  })!
  assert.ok(result.exactCapsules > 0)
  assert.equal(result.lowerOption, Math.floor(result.exactCapsules))
  assert.equal(result.upperOption, Math.ceil(result.exactCapsules))
  assert.equal(result.fractionalCapsuleEnabled, false)
})

test('cálculo individual EPA/DHA usa máximo das unidades', () => {
  const product = humanOmega3ProductsSeed.find((p) => p.slug === 'ocean-drop-omega-3-dha-algas')!
  const result = calculateOmega3Dose({
    weightKg: 10,
    species: 'dog',
    product,
    prescription: VETERINARY_OMEGA3_PRESETS.cardiovascular,
  })!
  const unitsForEpa = (40 * 10) / (product.epaMgPerUnit ?? 1)
  const unitsForDha = (25 * 10) / (product.dhaMgPerUnit ?? 1)
  assert.ok(result.exactCapsules >= Math.max(unitsForEpa, unitsForDha) - 0.01)
})

test('custo por 1000 mg EPA+DHA', () => {
  const cost = costPer1000MgEpaDha(120, 60, 680.5)
  assert.ok(cost != null && cost > 0)
  assert.equal(monthlyCost(2, 2), 120)
})

test('produtos humanos identificados como extrarrótulo', () => {
  const food = humanOmega3ToFoodItem(humanOmega3ProductsSeed[0])
  assert.ok(food.notes?.includes('veterinary_use=extra_label'))
  assert.ok(food.notes?.includes('label_species=human'))
})

test('cada apresentação é SKU separado no seed', () => {
  const multiSku = humanOmega3ProductsSeed.filter((p) => p.skus.length > 1)
  assert.ok(multiSku.length > 0)
  assert.ok(multiSku.every((p) => p.skus.every((s) => s.id && s.packageUnits > 0)))
})

test('produtos sem EPA/DHA individualizados permanecem bloqueados', () => {
  const vitafor = humanOmega3ProductsSeed.find((p) => p.slug === 'vitafor-omegafor-plus')!
  assert.equal(vitafor.epaMgPerUnit, null)
  assert.equal(canCalculateDose(vitafor), false)
})

test('estatísticas do catálogo coerentes', () => {
  const stats = getHumanOmega3Stats()
  assert.equal(stats.total, humanOmega3ProductsSeed.length)
  assert.ok(stats.clinicalEnabled <= stats.epaDhaConfirmed)
})

test('filterFoods inclui ômega-3 com flag ativa', () => {
  setNutritionFeatureOverride('nutrition_human_omega3', true)
  const results = filterFoods({ query: 'Humano Catarinense Concentrado' })
  assert.ok(results.some((f) => f.id === 'ho3-catarinense-concentrado-alasca'))
})

test('certificação IFOS permanece metadado do fabricante', () => {
  const nutrify = humanOmega3ProductsSeed.find((p) => p.slug === 'nutrify-omega-3')!
  assert.ok(nutrify.certificationClaims.includes('IFOS'))
  const food = humanOmega3ToFoodItem(nutrify)
  assert.ok(!food.notes?.some((n) => n.includes('vetius_audit')))
})
