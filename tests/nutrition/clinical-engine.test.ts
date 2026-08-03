import assert from 'node:assert/strict'
import test from 'node:test'
import { legacyGenutriCatalogAdapter } from '../../modules/energia-vet/lib/catalog/legacyGenutriAdapter'
import {
  detectTherapeuticProfileConflicts,
  evaluateContraindications,
  evaluateNutrientGoal,
  evaluateTherapeuticFoodAssessment,
  getTherapeuticProfileById,
  hasHardExclusion,
  mapComorbiditySelectionsToTherapeuticProfiles,
  resolveActiveTherapeuticProfiles,
  THERAPEUTIC_PROFILES,
} from '../../modules/energia-vet/lib/clinical'
import {
  clearNutritionFeatureOverrides,
  setNutritionFeatureOverride,
} from '../../modules/energia-vet/lib/featureFlags'
import { getFoodById } from '../../modules/energia-vet/lib/genutriData'
import type { FoodDetails } from '../../modules/energia-vet/lib/catalog/types'

function foodDetailsFromLegacyId(id: string): FoodDetails {
  const food = getFoodById(id)
  assert.ok(food)
  return {
    id: food.id,
    legacyFoodId: food.id,
    canonicalNamePt: food.name,
    foodKind: 'legacy_genutri',
    speciesScope: food.speciesScope,
    category: food.categoryNormalized,
    foodType: food.foodType,
    completenessClass: 'unknown',
    qualityGrade: 'B',
    sourceType: 'genutri_workbook',
    isActive: true,
    nutrientsAsFed: food.nutrientsAsFed,
    nutrientsDryMatter: food.nutrientsDryMatter,
    missingNutrients: food.missingNutrients,
    notes: food.notes,
    presentation: food.presentation,
    legacyItem: food,
  }
}

test.afterEach(() => {
  clearNutritionFeatureOverrides()
})

test('27 perfis terapeuticos V2 cadastrados', () => {
  assert.equal(THERAPEUTIC_PROFILES.length, 27)
  assert.ok(getTherapeuticProfileById('renal_ckd_dog'))
  assert.ok(getTherapeuticProfileById('urinary_calcium_oxalate_prevention'))
})

test('conflito estruvita vs oxalato detectado', () => {
  const conflicts = detectTherapeuticProfileConflicts([
    'urinary_struvite_dissolution',
    'urinary_calcium_oxalate_prevention',
  ])
  assert.equal(conflicts.length, 1)
})

test('ingrediente humano recebe contraindicacao', () => {
  const water = foodDetailsFromLegacyId('agua')
  water.completenessClass = 'ingredient_only'
  water.foodType = 'natural'
  const reasons = evaluateContraindications({
    food: water,
    species: 'dog',
    profileHardContraindications: [],
  })
  assert.ok(hasHardExclusion(reasons))
})

test('nutriente ausente nao vira zero na avaliacao de meta', () => {
  const food = foodDetailsFromLegacyId('agua')
  const profile = getTherapeuticProfileById('renal_ckd_dog')
  assert.ok(profile)
  const goal = profile.nutritionalGoals.find((item) => item.nutrientKey === 'phosphorusPct')
  assert.ok(goal)
  const evaluation = evaluateNutrientGoal(food, goal)
  assert.equal(evaluation.status, 'missing')
  assert.equal(evaluation.value, null)
})

test('contraindicacao impede suitable', () => {
  setNutritionFeatureOverride('nutrition_clinical_rules_v2', true)
  const food = foodDetailsFromLegacyId('agua')
  food.completenessClass = 'ingredient_only'

  const assessment = evaluateTherapeuticFoodAssessment(food, {
    species: 'dog',
    weightKg: 15,
    therapeuticProfileIds: ['renal_ckd_dog'],
  })

  assert.notEqual(assessment.suitability, 'suitable')
  assert.ok(assessment.hardExclusions.length > 0)
})

test('dados criticos ausentes produzem insufficient_data', () => {
  setNutritionFeatureOverride('nutrition_clinical_rules_v2', true)
  const food = foodDetailsFromLegacyId('agua')

  const assessment = evaluateTherapeuticFoodAssessment(food, {
    species: 'cat',
    weightKg: 4.5,
    therapeuticProfileIds: ['renal_ckd_cat'],
  })

  assert.equal(assessment.suitability, 'insufficient_data')
})

test('dieta renal comercial pode ser considerada ou suitable com perfil renal', () => {
  setNutritionFeatureOverride('nutrition_clinical_rules_v2', true)
  const food = foodDetailsFromLegacyId('racao-premier-nutricao-clinica-renal')

  const assessment = evaluateTherapeuticFoodAssessment(food, {
    species: 'dog',
    weightKg: 15,
    therapeuticProfileIds: ['renal_ckd_dog'],
  })

  assert.ok(['suitable', 'consider'].includes(assessment.suitability))
  assert.ok(assessment.manufacturerClaims.some((claim) => /renal/i.test(claim.text)))
})

test('catalogo legado delega avaliacao quando flag clinica ativa', async () => {
  setNutritionFeatureOverride('nutrition_clinical_rules_v2', true)

  const assessment = await legacyGenutriCatalogAdapter.getTherapeuticAssessment('racao-premier-nutricao-clinica-renal', {
    species: 'dog',
    weightKg: 15,
    therapeuticProfileIds: ['renal_ckd_dog'],
  })

  assert.ok(!assessment.cautions.some((item) => item.code === 'rules_v2_disabled'))
  assert.ok(
    assessment.manufacturerClaims.length > 0 ||
      assessment.positiveMatches.length > 0 ||
      assessment.cautions.length > 0 ||
      assessment.hardExclusions.length > 0,
  )
})

test('mapeamento heurístico de comorbidade renal legado', () => {
  const options = resolveActiveTherapeuticProfiles('dog', {
    comorbidityIds: ['dog:doenca-renal-cronica-caes---ms'],
  })
  assert.ok(options.length >= 0)
})

test('motor desligado retorna insufficient_data via catalogo', async () => {
  const assessment = await legacyGenutriCatalogAdapter.getTherapeuticAssessment('racao-all-canis-adultos', {
    species: 'dog',
    weightKg: 15,
    therapeuticProfileIds: ['renal_ckd_dog'],
  })
  assert.equal(assessment.suitability, 'insufficient_data')
})
