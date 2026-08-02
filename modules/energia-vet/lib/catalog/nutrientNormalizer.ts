/**
 * Mapeamento GENUTRI (69 chaves) → identificadores canônicos V2.
 * Preserva todas as chaves legadas; IDs canônicos são adicionais.
 */

import type { CanonicalNutrientId } from './types'

/** Chave legada do genutri-dataset → ID canônico. */
export const LEGACY_NUTRIENT_TO_CANONICAL: Record<string, CanonicalNutrientId | string> = {
  moisturePct: 'moisture',
  dryMatterPct: 'dry_matter',
  energyKcalPer100g: 'energy_kcal',
  crudeProteinPct: 'crude_protein',
  etherExtractPct: 'crude_fat',
  crudeFiberPct: 'crude_fiber',
  ashPct: 'ash',
  calciumPct: 'calcium',
  phosphorusPct: 'phosphorus',
  sodiumPct: 'sodium',
  potassiumPct: 'potassium',
  chloridePct: 'chloride',
  magnesiumPct: 'magnesium',
  copperMg: 'copper',
  zincMg: 'zinc',
  ironMg: 'iron',
  manganeseMg: 'manganese',
  seleniumMg: 'selenium',
  iodineMg: 'iodine',
  taurinePct: 'taurine',
  argininePct: 'arginine',
  methioninePct: 'methionine',
  methionineCystinePct: 'cystine',
  lysinePct: 'lysine',
  tryptophanPct: 'tryptophan',
  omega6Pct: 'omega_6_total',
  omega3Pct: 'omega_3_total',
  epaPct: 'epa',
  dhaPct: 'dha',
  vitaminAIu: 'vitamin_a',
  vitaminDIu: 'vitamin_d',
  vitaminEIu: 'vitamin_e',
  thiamineMg: 'thiamine',
  riboflavinMg: 'riboflavin',
  niacinMg: 'niacin',
  pyridoxineMg: 'pyridoxine',
  folicAcidMg: 'folate',
  cobalaminMg: 'cobalamin',
  cholineMg: 'choline',
}

export function mapLegacyNutrientKey(legacyKey: string): string {
  return LEGACY_NUTRIENT_TO_CANONICAL[legacyKey] ?? legacyKey
}

export function normalizeNutrientValue(
  value: number | null | undefined,
  options?: { valueKind?: 'measured_mean' | 'guaranteed_minimum' | 'guaranteed_maximum' | 'not_analyzed' },
): number | null {
  if (value == null || Number.isNaN(value)) {
    return null
  }
  if (options?.valueKind === 'not_analyzed') {
    return null
  }
  return value
}

/** Converte proteína MN% → MS% sem arredondar internamente. */
export function convertPercentMnToMs(mnPercent: number, dryMatterPercent: number): number | null {
  if (dryMatterPercent <= 0) return null
  return (mnPercent * 100) / dryMatterPercent
}

/** Converte proteína MS% → MN%. */
export function convertPercentMsToMn(msPercent: number, dryMatterPercent: number): number | null {
  if (dryMatterPercent <= 0) return null
  return (msPercent * dryMatterPercent) / 100
}

export function listUnmappedLegacyNutrientKeys(legacyKeys: string[]): string[] {
  return legacyKeys.filter((key) => !(key in LEGACY_NUTRIENT_TO_CANONICAL))
}
