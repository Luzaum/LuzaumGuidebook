/**
 * Feature flags do NutriçãoVET V2.
 * Todas desativadas por padrão — modo legado permanece ativo.
 */

export type NutritionFeatureFlag =
  | 'nutrition_catalog_v2'
  | 'nutrition_clinical_rules_v2'
  | 'nutrition_hospital_v2'
  | 'nutrition_pdf_v2'
  | 'nutrition_recipe_engine_v2'
  | 'nutrition_supplement_catalog'
  | 'nutrition_human_omega3'
  | 'nutrition_calculation_engine_v3'

const DEFAULT_FLAGS: Record<NutritionFeatureFlag, boolean> = {
  nutrition_catalog_v2: false,
  nutrition_clinical_rules_v2: false,
  nutrition_hospital_v2: false,
  nutrition_pdf_v2: false,
  nutrition_recipe_engine_v2: false,
  nutrition_supplement_catalog: false,
  nutrition_human_omega3: false,
  nutrition_calculation_engine_v3: true,
}

/** Overrides em runtime (ex.: painel admin, query param de dev). */
const runtimeOverrides = new Map<NutritionFeatureFlag, boolean>()

/** Overrides via variável de ambiente (build-time / scripts). */
function readEnvFlag(flag: NutritionFeatureFlag): boolean | undefined {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const key = `VITE_${flag.toUpperCase()}`
    const value = (import.meta.env as Record<string, string | undefined>)[key]
    if (value === 'true' || value === '1') return true
    if (value === 'false' || value === '0') return false
  }
  return undefined
}

export function isNutritionFeatureEnabled(flag: NutritionFeatureFlag): boolean {
  if (runtimeOverrides.has(flag)) {
    return runtimeOverrides.get(flag)!
  }
  const fromEnv = readEnvFlag(flag)
  if (fromEnv !== undefined) return fromEnv
  return DEFAULT_FLAGS[flag]
}

export function setNutritionFeatureOverride(flag: NutritionFeatureFlag, enabled: boolean): void {
  runtimeOverrides.set(flag, enabled)
}

export function clearNutritionFeatureOverrides(): void {
  runtimeOverrides.clear()
}

export function getNutritionFeatureFlags(): Record<NutritionFeatureFlag, boolean> {
  return {
    nutrition_catalog_v2: isNutritionFeatureEnabled('nutrition_catalog_v2'),
    nutrition_clinical_rules_v2: isNutritionFeatureEnabled('nutrition_clinical_rules_v2'),
    nutrition_hospital_v2: isNutritionFeatureEnabled('nutrition_hospital_v2'),
    nutrition_pdf_v2: isNutritionFeatureEnabled('nutrition_pdf_v2'),
    nutrition_recipe_engine_v2: isNutritionFeatureEnabled('nutrition_recipe_engine_v2'),
    nutrition_supplement_catalog: isNutritionFeatureEnabled('nutrition_supplement_catalog'),
    nutrition_human_omega3: isNutritionFeatureEnabled('nutrition_human_omega3'),
    nutrition_calculation_engine_v3: isNutritionFeatureEnabled('nutrition_calculation_engine_v3'),
  }
}

export function isLegacyNutritionMode(): boolean {
  return !isNutritionFeatureEnabled('nutrition_catalog_v2')
}
