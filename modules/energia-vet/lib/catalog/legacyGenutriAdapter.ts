import type { FoodItem } from '../../types'
import { filterFoods, GENUTRI_FOODS, getFoodById, getDatasetStats } from '../genutriData'
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

function inferQualityGrade(food: FoodItem): DataQualityGrade {
  const missingRequired = food.missingNutrients.length
  if (missingRequired === 0 && food.notes.length === 0) return 'B'
  if (missingRequired <= 3) return 'C'
  if (missingRequired <= 8) return 'D'
  return 'E'
}

function mapFoodToSummary(food: FoodItem): CatalogFoodSummary {
  return {
    id: food.id,
    legacyFoodId: food.id,
    canonicalNamePt: food.name,
    foodKind: 'legacy_genutri',
    speciesScope: food.speciesScope,
    category: food.categoryNormalized,
    foodType: food.foodType,
    completenessClass:
      food.foodType === 'natural' ? 'ingredient_only' : food.foodType === 'suplemento' ? 'supplement_only' : 'unknown',
    qualityGrade: inferQualityGrade(food),
    sourceType: 'genutri_workbook',
    isActive: true,
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

  async getTherapeuticAssessment(_foodId: string, _ctx: ClinicalPatientContext): Promise<TherapeuticFoodAssessment> {
    return insufficientDataAssessment()
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
