import type { EnergyCalculationResult } from './types'
import { getSourceLabel } from './sourceRegistry'
import { calculateRerAllometric } from './energyRer'

export function calculateHospitalEnergy(currentWeightKg: number): EnergyCalculationResult {
  const rer = calculateRerAllometric(currentWeightKg)
  return {
    rerKcalDay: rer,
    estimatedRangeKcalDay: { minimum: rer * 0.8, maximum: rer * 1.25 },
    selectedTargetKcalDay: rer,
    weightBasis: 'current_weight',
    weightUsedKg: currentWeightKg,
    clinicalProfileLabel: 'Paciente hospitalizado — RER inicial',
    confidence: 'moderate',
    requiresMonitoring: true,
    methodSummary:
      'Meta inicial no RER do peso atual. Ajustar por tolerância, perdas e evolução clínica — sem fator de doença automático.',
    sourceLabel: getSourceLabel('hospital2015'),
  }
}

export function suggestHospitalIncrease(currentTargetKcal: number): number {
  return currentTargetKcal * 1.25
}

/** Fatores históricos — documentação interna, NÃO aplicados automaticamente. */
export const DEPRECATED_DISEASE_FACTORS = {
  cancer: 1.5,
  sepsis: 2,
  trauma: 1.4,
  surgery: 1.3,
} as const

export const DEPRECATED_DISEASE_FACTOR_NOTICE =
  'Multiplicadores de doença possuem evidência limitada em cães e gatos e não são aplicados como padrão.'
