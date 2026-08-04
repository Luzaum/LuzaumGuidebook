import { CALCULATION_ENGINE_VERSION, type CalculationAudit } from './types'

let auditCounter = 0

export function createCalculationAudit(options: {
  formulaKey: string
  sourceVersions: string[]
  inputs: Record<string, unknown>
  rawResult: Record<string, number>
  roundedResult?: Record<string, number>
  clinicianOverride?: { value: number; reason: string }
}): CalculationAudit {
  auditCounter += 1
  return {
    calculationId: `nc-${Date.now()}-${auditCounter}`,
    calculationEngineVersion: CALCULATION_ENGINE_VERSION,
    sourceVersions: options.sourceVersions,
    formulaKey: options.formulaKey,
    inputs: options.inputs,
    rawResult: options.rawResult,
    roundedResult: options.roundedResult ?? options.rawResult,
    clinicianOverride: options.clinicianOverride,
    createdAt: new Date().toISOString(),
  }
}
