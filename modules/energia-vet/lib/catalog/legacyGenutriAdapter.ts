import type { FoodItem } from '../../types'
import { filterFoods, GENUTRI_FOODS, getFoodById, getDatasetStats, getFoodDisplayName } from '../genutriData'
import { evaluateTherapeuticFoodAssessment } from '../clinical/clinicalRuleEngine'
import { isNutritionFeatureEnabled } from '../featureFlags'
import type {
  CatalogDatasetStats,
  CatalogFoodSummary,
  ClinicalPatientContext,
  DataQualityGrade,
  FoodCatalogRepository,
  FoodDetails,
  FoodSearchInput,
  FoodSearchResult,
  FoodVersion,
  TherapeuticFoodAssessment,
} from './types'

function parseNoteValue(notes: string[], key: string): string | undefined {
  const prefix = `${key}=`
  const hit = notes.find((note) => note.startsWith(prefix))
  return hit ? hit.slice(prefix.length) : undefined
}

function inferQualityGrade(food: FoodItem): DataQualityGrade {
  const explicit = parseNoteValue(food.notes, 'quality_grade') as DataQualityGrade | undefined
  if (explicit && ['A', 'B', 'C', 'D', 'E'].includes(explicit)) return explicit
  const missingRequired = food.missingNutrients.length
  if (missingRequired === 0 && food.notes.length === 0) return 'B'
  if (missingRequired <= 3) return 'C'
  if (missingRequired <= 8) return 'D'
  return 'E'
}

function inferFoodKind(food: FoodItem): CatalogFoodSummary['foodKind'] {
  const explicit = parseNoteValue(food.notes, 'food_kind') as CatalogFoodSummary['foodKind'] | undefined
  if (explicit) return explicit
  if (food.notes.some((note) => note.includes('ingredient_only'))) return 'human_ingredient'
  if (food.foodType === 'natural') return 'human_ingredient'
  if (food.foodType === 'suplemento') return 'supplement'
  if (food.foodType === 'commercial') return 'commercial_veterinary'
  return 'legacy_genutri'
}

function inferCompletenessClass(food: FoodItem): CatalogFoodSummary['completenessClass'] {
  const explicit = parseNoteValue(food.notes, 'completeness_class') as CatalogFoodSummary['completenessClass'] | undefined
  if (explicit) return explicit
  if (food.foodType === 'natural') return 'ingredient_only'
  if (food.foodType === 'suplemento') return 'supplement_only'
  return 'unknown'
}

function mapFoodToSummary(food: FoodItem): CatalogFoodSummary {
  return {
    id: food.id,
    legacyFoodId: food.id,
    canonicalNamePt: getFoodDisplayName(food.name, { id: food.id, foodType: food.foodType }),
    foodKind: inferFoodKind(food),
    speciesScope: food.speciesScope,
    category: food.categoryNormalized,
    foodType: food.foodType,
    completenessClass: inferCompletenessClass(food),
    qualityGrade: inferQualityGrade(food),
    sourceType: parseNoteValue(food.notes, 'source_type') ?? 'genutri_workbook',
    isActive: parseNoteValue(food.notes, 'clinical_use_status') !== 'blocked_pending_data',
  }
}

function mapFoodToDetails(food: FoodItem): FoodDetails {
  return {
    ...mapFoodToSummary(food),
    nutrientsAsFed: food.nutrientsAsFed,
    nutrientsDryMatter: food.nutrientsDryMatter,
    missingNutrients: food.missingNutrients,
    notes: food.notes,
    presentation: food.presentation,
    legacyItem: food,
  }
}

function insufficientDataAssessment(): TherapeuticFoodAssessment {
  return {
    suitability: 'insufficient_data',
    positiveMatches: [],
    cautions: [],
    hardExclusions: [],
    missingCriticalData: [],
    manufacturerClaims: [],
    independentAssessment: {
      summaryPt: 'Avaliação clínica independente disponível apenas com catálogo V2 e regras clínicas ativas.',
      suitability: 'insufficient_data',
    },
    monitoringRecommendations: [],
    evidence: [],
  }
}

export class LegacyGenutriCatalogAdapter implements FoodCatalogRepository {
  async search(input: FoodSearchInput): Promise<FoodSearchResult> {
    const filtered = filterFoods({
      species: input.species,
      query: input.query,
      category: input.category,
      foodType: input.foodType,
    })

    let items = filtered.map(mapFoodToSummary)

    if (input.qualityGrade) {
      items = items.filter((item) => item.qualityGrade === input.qualityGrade)
    }
    if (input.completenessClass) {
      items = items.filter((item) => item.completenessClass === input.completenessClass)
    }
    if (input.foodKind) {
      items = items.filter((item) => item.foodKind === input.foodKind)
    }

    const total = items.length
    const offset = input.offset ?? 0
    const limit = input.limit ?? total
    items = items.slice(offset, offset + limit)

    return { items, total, source: 'legacy_genutri' }
  }

  async getById(id: string): Promise<FoodDetails | null> {
    const food = getFoodById(id)
    return food ? mapFoodToDetails(food) : null
  }

  async getVersions(id: string): Promise<FoodVersion[]> {
    const food = getFoodById(id)
    if (!food) return []
    return [
      {
        foodId: id,
        version: 1,
        validFrom: '2026-03-29T00:00:00.000Z',
        sourceType: 'genutri_workbook',
        sourceName: food.sourceReference.workbook,
        qualityGrade: inferQualityGrade(food),
      },
    ]
  }

  async getTherapeuticAssessment(foodId: string, ctx: ClinicalPatientContext): Promise<TherapeuticFoodAssessment> {
    if (!isNutritionFeatureEnabled('nutrition_clinical_rules_v2')) {
      return insufficientDataAssessment()
    }
    const food = await this.getById(foodId)
    if (!food) {
      return {
        ...insufficientDataAssessment(),
        cautions: [{ code: 'food_not_found', messagePt: 'Alimento não encontrado.', severity: 'caution' }],
      }
    }
    return evaluateTherapeuticFoodAssessment(food, ctx)
  }
}

export function getLegacyCatalogStats(): CatalogDatasetStats {
  const base = getDatasetStats()
  const byQuality: Record<DataQualityGrade, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 }
  for (const food of GENUTRI_FOODS) {
    byQuality[inferQualityGrade(food)] += 1
  }
  return {
    ...base,
    bySource: { legacy_genutri: base.foods },
    byQualityGrade: byQuality,
  }
}

export const legacyGenutriCatalogAdapter = new LegacyGenutriCatalogAdapter()
