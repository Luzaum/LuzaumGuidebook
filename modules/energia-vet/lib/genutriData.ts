import datasetJson from '../data/genutri-dataset.json'
import {
  buildFoodSearchHaystackForFood,
  foodSearchTokensMatch,
  getFoodDisplayName,
  scoreFoodSearchMatch,
} from './foodSearchLexicon'
import { humanOmega3ProductsSeed } from '../data/humanOmega3/products.seed'
import {
  FEDIAF_REQUIREMENT_PROFILES,
  getDefaultRequirementProfileIdForState as getFediafDefaultRequirementProfileIdForState,
} from './fediaf'
import { resolveRequirementProfileIdForEnergyState } from './canonical/requirementBridge'
import { canCalculateDose } from './humanOmega3/regulatoryValidation'
import { humanOmega3ToFoodItem } from './humanOmega3/foodBridge'
import { isNutritionFeatureEnabled } from './featureFlags'
import { isFoodCatalogVisible } from './catalogVisibility'
import type {
  EnergyRule,
  FoodItem,
  GenutriDataset,
  NutrientDefinition,
  RequirementProfile,
  Species,
  SpeciesScope,
  WorkbookIssue,
} from '../types'

const dataset = datasetJson as GenutriDataset

export const GENUTRI_DATASET = dataset
export const GENUTRI_FOODS = dataset.foods

function getHumanOmega3FoodsMerged(): FoodItem[] {
  if (!isNutritionFeatureEnabled('nutrition_human_omega3')) return []
  return humanOmega3ProductsSeed
    .filter((product) => canCalculateDose(product))
    .map(humanOmega3ToFoodItem)
}

/** Alimentos visíveis — GENUTRI legado + ômega-3 humanos (quando flag ativa). */
export function getAllFoods(): FoodItem[] {
  return [...GENUTRI_FOODS, ...getHumanOmega3FoodsMerged()]
}

/** Retorna todas as rações e alimentos comerciais. */
export function getCommercialFoods(): FoodItem[] {
  return getAllFoods().filter((food) => food.foodType === 'commercial')
}

const NON_DUPLICATE_REQUIREMENTS = dataset.requirements.filter((profile) => profile.source !== 'FEDIAF')
export const GENUTRI_REQUIREMENTS = [...FEDIAF_REQUIREMENT_PROFILES, ...NON_DUPLICATE_REQUIREMENTS]
export const GENUTRI_ENERGY_RULES = dataset.energyRules
export const GENUTRI_NUTRIENT_CATALOG = dataset.meta.nutrientCatalog
export const GENUTRI_AUDIT_ISSUES = dataset.audit.issues
export const GENUTRI_SHEET_SUMMARY = dataset.audit.sheetSummary

export function getEnergyRule(species: Species): EnergyRule {
  return (
    GENUTRI_ENERGY_RULES.find((rule) => rule.species === species) ??
    GENUTRI_ENERGY_RULES[0]
  )
}

export function getFoodById(foodId: string): FoodItem | undefined {
  return getAllFoods().find((food) => food.id === foodId || food.slug === foodId)
}

export function getRequirementById(requirementId?: string): RequirementProfile | undefined {
  if (!requirementId) return undefined
  return GENUTRI_REQUIREMENTS.find((profile) => profile.id === requirementId)
}

export function getDefaultRequirement(species: Species, stateId?: string, isNeutered?: boolean): RequirementProfile | undefined {
  const preferredId =
    resolveRequirementProfileIdForEnergyState(species, stateId, isNeutered) ??
    getFediafDefaultRequirementProfileIdForState(species, stateId, isNeutered)
  return (
    GENUTRI_REQUIREMENTS.find((profile) => profile.id === preferredId) ??
    GENUTRI_REQUIREMENTS.find((profile) => profile.source === 'FEDIAF 2025' && profile.species === species) ??
    GENUTRI_REQUIREMENTS.find((profile) => profile.species === species) ??
    GENUTRI_REQUIREMENTS[0]
  )
}

export function foodMatchesSpecies(scope: SpeciesScope, species: Species): boolean {
  return scope === 'both' || scope === 'unknown' || scope === species
}

export { getFoodDisplayName }

export function filterFoods(options: {
  species?: Species
  query?: string
  category?: string
  foodType?: string
  /** Quando true (padrão), oculta itens marcados como catalog_hidden ou bloqueados. */
  catalogOnly?: boolean
}): FoodItem[] {
  // Tokens: cada palavra da query deve aparecer em algum lugar no haystack (PT/EN)
  const query = options.query?.trim()
  const catalogOnly = options.catalogOnly !== false

  return getAllFoods()
    .filter((food) => {
    if (catalogOnly && !isFoodCatalogVisible(food)) {
      return false
    }
    if (options.species) {
      const scope = food.speciesScope
      // Ingredientes naturais/suplementos servem ambas espécies; rações comerciais respeitam espécie.
      if (food.foodType === 'commercial' && !foodMatchesSpecies(scope, options.species)) {
        return false
      }
    }
    if (options.category && food.categoryNormalized !== options.category) {
      return false
    }
    if (options.foodType && food.foodType !== options.foodType) {
      return false
    }
    if (!query) {
      return true
    }

    const haystack = buildFoodSearchHaystackForFood(food)

    return foodSearchTokensMatch(query, haystack)
  })
    .sort((left, right) => {
      if (!query) {
        return left.name.localeCompare(right.name, 'pt-BR')
      }
      const leftScore = scoreFoodSearchMatch(query, left)
      const rightScore = scoreFoodSearchMatch(query, right)
      if (rightScore !== leftScore) return rightScore - leftScore
      return left.name.localeCompare(right.name, 'pt-BR')
    })
}

export function getFoodCategories(): string[] {
  const source = isNutritionFeatureEnabled('nutrition_human_omega3') ? getAllFoods() : GENUTRI_FOODS
  return Array.from(
    new Set(source.map((food) => food.categoryNormalized).filter((value): value is string => Boolean(value))),
  ).sort((left, right) => left.localeCompare(right, 'pt-BR'))
}

export function getFoodTypes(): string[] {
  const source = isNutritionFeatureEnabled('nutrition_human_omega3') ? getAllFoods() : GENUTRI_FOODS
  return Array.from(new Set(source.map((food) => food.foodType))).sort((left, right) =>
    left.localeCompare(right, 'pt-BR'),
  )
}

export function getRequirementOptions(species?: Species): RequirementProfile[] {
  return GENUTRI_REQUIREMENTS.filter((profile) => {
    if (!species) return true
    return profile.species === species || profile.species === 'both' || profile.species === 'unknown'
  })
}

export function getDatasetStats() {
  return {
    foods: getAllFoods().length,
    requirements: GENUTRI_REQUIREMENTS.length,
    energyRules: GENUTRI_ENERGY_RULES.length,
    categories: getFoodCategories().length,
    auditWarnings: GENUTRI_AUDIT_ISSUES.filter((issue) => issue.severity === 'warning').length,
  }
}

export function getNutrientDefinition(key: string): NutrientDefinition | undefined {
  return GENUTRI_NUTRIENT_CATALOG.find((entry) => entry.key === key)
}

export function getTopAuditIssues(limit = 5): WorkbookIssue[] {
  return GENUTRI_AUDIT_ISSUES.slice(0, limit)
}
