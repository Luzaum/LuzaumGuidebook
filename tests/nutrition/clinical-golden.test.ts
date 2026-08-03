import assert from 'node:assert/strict'
import test from 'node:test'
import {
  detectTherapeuticProfileConflicts,
  evaluateTherapeuticFoodAssessment,
  getTherapeuticProfileById,
  mapComorbiditySelectionsToTherapeuticProfiles,
} from '../../modules/energia-vet/lib/clinical'
import { legacyGenutriCatalogAdapter } from '../../modules/energia-vet/lib/catalog/legacyGenutriAdapter'
import { computeFediafEnergy } from '../../modules/energia-vet/lib/fediaf'
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
  }
}

test.afterEach(() => clearNutritionFeatureOverrides())

test('golden 1 — cão castrado 15 kg MER ~724 kcal', () => {
  const result = computeFediafEnergy({
    species: 'dog',
    stateId: 'dog_adult_low_activity',
    weightKg: 15,
  })
  assert.equal(Math.round(result.mer), 724)
})

test('golden 2 — gato indoor 4,5 kg MER ~205 kcal', () => {
  const result = computeFediafEnergy({
    species: 'cat',
    stateId: 'cat_adult_neutered_indoor',
    weightKg: 4.5,
  })
  assert.equal(Math.round(result.mer), 205)
})

test('golden 5 — perfil renal gato exige controle de fósforo', () => {
  const profile = getTherapeuticProfileById('renal_ckd_cat')
  assert.ok(profile)
  assert.ok(profile.nutritionalGoals.some((goal) => goal.nutrientKey === 'phosphorusPct'))
})

test('golden 8 — conflito estruvita e oxalato', () => {
  const conflicts = detectTherapeuticProfileConflicts([
    'urinary_struvite_dissolution',
    'urinary_calcium_oxalate_prevention',
  ])
  assert.equal(conflicts.length, 1)
})

test('golden 17 — dieta renal comercial avaliável com perfil renal', () => {
  setNutritionFeatureOverride('nutrition_clinical_rules_v2', true)
  const food = foodDetailsFromLegacyId('racao-premier-nutricao-clinica-renal')
  const assessment = evaluateTherapeuticFoodAssessment(food, {
    species: 'dog',
    weightKg: 15,
    therapeuticProfileIds: ['renal_ckd_dog'],
  })
  assert.ok(['suitable', 'consider'].includes(assessment.suitability))
})

test('golden comorbidade renal legado mapeia perfil', () => {
  const mapped = mapComorbiditySelectionsToTherapeuticProfiles('dog', [
    'dog:doenca-renal-cronica-caes---ms',
  ])
  assert.ok(mapped.some((profile) => profile.includes('renal')))
})

test('golden catálogo legado com flag clínica ativa', async () => {
  setNutritionFeatureOverride('nutrition_clinical_rules_v2', true)
  const assessment = await legacyGenutriCatalogAdapter.getTherapeuticAssessment(
    'racao-premier-nutricao-clinica-renal',
    {
      species: 'dog',
      weightKg: 15,
      therapeuticProfileIds: ['renal_ckd_dog'],
    },
  )
  assert.ok(!assessment.cautions.some((item) => item.code === 'rules_v2_disabled'))
})
