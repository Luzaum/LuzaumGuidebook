import type { FoodItem, NutrientAmountMap, Species, SpeciesScope } from '../../types'

/** Identificadores canônicos estáveis para nutrientes V2. */
export type CanonicalNutrientId =
  | 'energy_kcal'
  | 'energy_kj'
  | 'moisture'
  | 'dry_matter'
  | 'crude_protein'
  | 'crude_fat'
  | 'crude_fiber'
  | 'total_dietary_fiber'
  | 'ash'
  | 'calcium'
  | 'phosphorus'
  | 'sodium'
  | 'potassium'
  | 'chloride'
  | 'magnesium'
  | 'copper'
  | 'zinc'
  | 'iron'
  | 'manganese'
  | 'selenium'
  | 'iodine'
  | 'taurine'
  | 'arginine'
  | 'methionine'
  | 'cystine'
  | 'lysine'
  | 'tryptophan'
  | 'linoleic_acid'
  | 'arachidonic_acid'
  | 'epa'
  | 'dha'
  | 'omega_3_total'
  | 'omega_6_total'
  | 'vitamin_a'
  | 'vitamin_d'
  | 'vitamin_e'
  | 'thiamine'
  | 'riboflavin'
  | 'niacin'
  | 'pyridoxine'
  | 'folate'
  | 'cobalamin'
  | 'choline'

export type FoodScope = 'global' | 'clinic'
export type FoodKind =
  | 'legacy_genutri'
  | 'human_ingredient'
  | 'commercial_veterinary'
  | 'therapeutic_veterinary'
  | 'enteral_formula'
  | 'supplement'
  | 'nutraceutical'
  | 'recipe'
  | 'custom_clinic'

export type CompletenessClass =
  | 'complete'
  | 'complementary'
  | 'coadjuvant'
  | 'ingredient_only'
  | 'supplement_only'
  | 'unknown'

export type DataQualityGrade = 'A' | 'B' | 'C' | 'D' | 'E'

export type NutrientBasis =
  | 'as_fed_per_100g'
  | 'dry_matter_per_100g'
  | 'per_1000_kcal'
  | 'per_mcal'
  | 'per_kg_metabolic_weight'
  | 'per_serving'
  | 'per_ml'
  | 'per_package'

export type NutrientValueKind =
  | 'measured_mean'
  | 'typical_analysis'
  | 'guaranteed_minimum'
  | 'guaranteed_maximum'
  | 'calculated'
  | 'estimated'
  | 'imputed'
  | 'trace'
  | 'not_analyzed'
  | 'unknown'

export type ClinicalSuitability = 'suitable' | 'consider' | 'avoid' | 'insufficient_data'

export interface FoodSearchInput {
  query?: string
  species?: Species
  category?: string
  foodKind?: FoodKind
  foodType?: FoodItem['foodType']
  qualityGrade?: DataQualityGrade
  completenessClass?: CompletenessClass
  limit?: number
  offset?: number
}

export interface CatalogFoodSummary {
  id: string
  legacyFoodId?: string
  canonicalNamePt: string
  foodKind: FoodKind
  speciesScope: SpeciesScope
  category: string | null
  foodType: FoodItem['foodType']
  completenessClass: CompletenessClass
  qualityGrade: DataQualityGrade
  sourceType: string
  isActive: boolean
}

export interface FoodSearchResult {
  items: CatalogFoodSummary[]
  total: number
  source: 'legacy_genutri' | 'supabase' | 'merged'
}

export interface NormalizedNutrientObservation {
  nutrientDefinitionId: CanonicalNutrientId | string
  originalValue: number | null
  originalUnit: string | null
  normalizedValue: number | null
  normalizedUnit: string
  basis: NutrientBasis
  valueKind: NutrientValueKind
  missingReason?: string
  confidence?: number
}

export interface FoodDetails extends CatalogFoodSummary {
  nutrientsAsFed: NutrientAmountMap
  nutrientsDryMatter: NutrientAmountMap
  missingNutrients: string[]
  notes: string[]
  presentation?: string
  /** Ponte para FoodItem legado quando aplicável. */
  legacyItem?: FoodItem
}

export interface FoodVersion {
  foodId: string
  version: number
  validFrom: string
  validTo?: string | null
  sourceType: string
  sourceName: string
  qualityGrade: DataQualityGrade
}

export interface ClinicalPatientContext {
  species: Species
  lifeStage?: string
  weightKg: number
  isNeutered?: boolean
  isIndoor?: boolean
  comorbidityIds?: string[]
  therapeuticProfileIds?: string[]
}

export interface ClinicalReason {
  code: string
  messagePt: string
  severity: 'info' | 'caution' | 'exclusion'
}

export interface MissingCriticalDatum {
  nutrientDefinitionId: string
  labelPt: string
  reason: string
}

export interface ManufacturerClaim {
  claimType: string
  text: string
  sourceReference?: string
}

export interface IndependentAssessment {
  summaryPt: string
  suitability: ClinicalSuitability
}

export interface MonitoringRecommendation {
  parameter: string
  interval: string
  notes?: string
}

export interface EvidenceReference {
  sourceId: string
  title: string
  sourceType: string
}

export interface TherapeuticFoodAssessment {
  suitability: ClinicalSuitability
  positiveMatches: ClinicalReason[]
  cautions: ClinicalReason[]
  hardExclusions: ClinicalReason[]
  missingCriticalData: MissingCriticalDatum[]
  manufacturerClaims: ManufacturerClaim[]
  independentAssessment: IndependentAssessment
  monitoringRecommendations: MonitoringRecommendation[]
  evidence: EvidenceReference[]
}

export interface FoodCatalogRepository {
  search(input: FoodSearchInput): Promise<FoodSearchResult>
  getById(id: string): Promise<FoodDetails | null>
  getVersions(id: string): Promise<FoodVersion[]>
  getTherapeuticAssessment(
    foodId: string,
    patientContext: ClinicalPatientContext,
  ): Promise<TherapeuticFoodAssessment>
}

export interface CatalogDatasetStats {
  foods: number
  requirements: number
  energyRules: number
  categories: number
  auditWarnings: number
  bySource: Record<string, number>
  byQualityGrade: Record<DataQualityGrade, number>
}
