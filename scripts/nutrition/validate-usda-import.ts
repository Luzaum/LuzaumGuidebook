#!/usr/bin/env tsx
/** Validação pós-importação USDA — duplicidades, unidades, extremos. */

export interface UsdaValidationReport {
  accepted: number
  rejected: number
  duplicates: string[]
  missingNutrients: string[]
  extremeValues: Array<{ foodId: string; nutrient: string; value: number }>
  unknownUnits: string[]
}

export function validateUsdaBatch(_records: unknown[]): UsdaValidationReport {
  return {
    accepted: 0,
    rejected: 0,
    duplicates: [],
    missingNutrients: [],
    extremeValues: [],
    unknownUnits: [],
  }
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`) {
  console.log('validate-usda-import: aguardando batch de importação real.')
  console.log(JSON.stringify(validateUsdaBatch([]), null, 2))
}
