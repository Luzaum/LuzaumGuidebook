import datasetJson from '../data/genutri-dataset.json'
import {
  FEDIAF_REQUIREMENT_PROFILES,
  getDefaultRequirementProfileIdForState,
} from './fediaf'
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
  return GENUTRI_FOODS.find((food) => food.id === foodId)
}

export function getRequirementById(requirementId?: string): RequirementProfile | undefined {
  if (!requirementId) return undefined
  return GENUTRI_REQUIREMENTS.find((profile) => profile.id === requirementId)
}

export function getDefaultRequirement(species: Species, stateId?: string, isNeutered?: boolean): RequirementProfile | undefined {
  const preferredId = getDefaultRequirementProfileIdForState(species, stateId, isNeutered)
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

export function filterFoods(options: {
  species?: Species
  query?: string
  category?: string
  foodType?: string
}): FoodItem[] {
  const query = options.query?.trim().toLowerCase()
  return GENUTRI_FOODS.filter((food) => {
    if (options.species && !foodMatchesSpecies(food.speciesScope, options.species)) {
      return false
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

    return [
      food.name,
      food.category,
      food.categoryNormalized,
      food.presentation,
      food.foodType,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(query)
  })
}

export function getFoodCategories(): string[] {
  return Array.from(
    new Set(GENUTRI_FOODS.map((food) => food.categoryNormalized).filter((value): value is string => Boolean(value))),
  ).sort((left, right) => left.localeCompare(right, 'pt-BR'))
}

export function getFoodTypes(): string[] {
  return Array.from(new Set(GENUTRI_FOODS.map((food) => food.foodType))).sort((left, right) =>
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
    foods: GENUTRI_FOODS.length,
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
