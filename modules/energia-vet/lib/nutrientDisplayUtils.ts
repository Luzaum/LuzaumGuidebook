import type { RequirementProfile } from '../types'
import { getBasisLabel } from './fediaf'

export function getNutrientDisplayUnit(
  key: string,
  basisType: RequirementProfile['basisType'],
  catalogUnit?: string,
): string | undefined {
  if (basisType === 'percent_dm') return catalogUnit ?? '%'

  if (basisType === 'per_1000kcal') {
    if (key.endsWith('Pct')) return 'g/1000 kcal'
    if (key.endsWith('Iu')) return 'UI/1000 kcal'
    if (key.endsWith('Mcg')) return 'mcg/1000 kcal'
    if (key.endsWith('Mg') || key.endsWith('PerKg')) return 'mg/1000 kcal'
    return catalogUnit ? `${catalogUnit}/1000 kcal` : '/1000 kcal'
  }

  if (basisType === 'per_100kcal') {
    if (key.endsWith('Pct')) return 'g/100 kcal'
    if (key.endsWith('Iu')) return 'UI/100 kcal'
    if (key.endsWith('Mcg')) return 'mcg/100 kcal'
    if (key.endsWith('Mg') || key.endsWith('PerKg')) return 'mg/100 kcal'
    return catalogUnit ? `${catalogUnit}/100 kcal` : '/100 kcal'
  }

  if (basisType === 'energy_percent') return '% ME'
  if (basisType === 'per_metabolic_bw') return catalogUnit ? `${catalogUnit}/kg^0.75` : undefined
  if (basisType === 'per_kg_bw') return catalogUnit ? `${catalogUnit}/kg PV` : undefined

  return catalogUnit
}

export function getNutrientDisplayLabel(
  catalogLabel: string,
  basisType: RequirementProfile['basisType'],
): string {
  const baseName = catalogLabel.replace(/\s*\([^)]*\)\s*$/, '').trim()

  if (basisType === 'percent_dm') return `${baseName} (% MS)`
  if (basisType === 'per_1000kcal') return `${baseName} (por 1000 kcal ME)`
  if (basisType === 'per_100kcal') return `${baseName} (por 100 kcal ME)`

  return `${baseName} (${getBasisLabel(basisType)})`
}
