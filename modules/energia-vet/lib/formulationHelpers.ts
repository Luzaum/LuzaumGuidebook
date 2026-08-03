import type { DietFormulaEntry } from '../types'

/** Arredondamento matemático padrão (≥ 0,5 sobe). */
export function roundMealGrams(grams: number): number {
  if (!Number.isFinite(grams)) return 0
  return Math.round(grams)
}

/** Divide 100% igualmente entre todos os alimentos. */
export function equalEntries(entries: DietFormulaEntry[]): DietFormulaEntry[] {
  const value = entries.length ? 100 / entries.length : 0
  return entries.map((entry) => ({ ...entry, inclusionPct: value }))
}

/**
 * Mantém as % dos alimentos travados (editados manualmente) e reparte
 * o restante em partes iguais entre os demais.
 */
export function completeRemainingEqually(
  entries: DietFormulaEntry[],
  lockedFoodIds: ReadonlySet<string>,
): DietFormulaEntry[] | null {
  if (!entries.length) return entries

  const unlocked = entries.filter((entry) => !lockedFoodIds.has(entry.foodId))
  if (!unlocked.length) return null

  const lockedSum = entries
    .filter((entry) => lockedFoodIds.has(entry.foodId))
    .reduce((sum, entry) => sum + Math.max(0, entry.inclusionPct || 0), 0)

  const remainder = 100 - lockedSum
  if (remainder < 0) return null

  const equalShare = remainder / unlocked.length

  return entries.map((entry) =>
    lockedFoodIds.has(entry.foodId) ? entry : { ...entry, inclusionPct: equalShare },
  )
}
