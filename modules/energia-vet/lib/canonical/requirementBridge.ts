import type { Species } from '../../types'

/** Perfil energético → exigência FEDIAF para adequação nutricional (sem perfis de doença legados). */
export const BOOK_ENERGY_TO_REQUIREMENT_PROFILE: Record<string, string> = {
  dog_puppy_0_4: 'fediaf-dog-early-growth-1000kcal',
  dog_puppy_4_adult: 'fediaf-dog-late-growth-1000kcal',
  dog_adult_neutered: 'fediaf-dog-adult-95-1000kcal',
  dog_adult_intact: 'fediaf-dog-adult-110-1000kcal',
  dog_adult_inactive: 'fediaf-dog-adult-95-1000kcal',
  dog_work_light: 'fediaf-dog-adult-110-1000kcal',
  dog_work_moderate: 'fediaf-dog-adult-110-1000kcal',
  dog_work_heavy: 'fediaf-dog-adult-110-1000kcal',
  dog_gestation: 'fediaf-dog-early-growth-1000kcal',
  dog_lactation: 'fediaf-dog-early-growth-1000kcal',
  dog_senior: 'fediaf-dog-adult-95-1000kcal',
  cat_kitten: 'fediaf-cat-growth-1000kcal',
  cat_adult_neutered: 'fediaf-cat-adult-75-1000kcal',
  cat_adult_intact: 'fediaf-cat-adult-100-1000kcal',
  cat_adult_inactive: 'fediaf-cat-adult-75-1000kcal',
  cat_senior: 'fediaf-cat-adult-75-1000kcal',
  cat_gestation: 'fediaf-cat-growth-1000kcal',
  cat_lactation: 'fediaf-cat-growth-1000kcal',
}

export function resolveRequirementProfileIdForEnergyState(
  species: Species,
  stateId?: string,
  isNeutered?: boolean,
): string | undefined {
  if (stateId && BOOK_ENERGY_TO_REQUIREMENT_PROFILE[stateId]) {
    return BOOK_ENERGY_TO_REQUIREMENT_PROFILE[stateId]
  }
  return species === 'dog'
    ? isNeutered
      ? 'fediaf-dog-adult-95-1000kcal'
      : 'fediaf-dog-adult-110-1000kcal'
    : isNeutered
      ? 'fediaf-cat-adult-75-1000kcal'
      : 'fediaf-cat-adult-100-1000kcal'
}
