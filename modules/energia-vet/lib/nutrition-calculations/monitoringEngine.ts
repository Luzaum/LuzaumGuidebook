import type { NutritionMonitoringEvent } from './types'

export function calibrateEnergyFromMonitoring(events: NutritionMonitoringEvent[]): number | null {
  const stable = events.filter(
    (e) =>
      e.actualConsumedKcalDay != null &&
      e.actualConsumedKcalDay > 0 &&
      e.bcs9 >= 4 &&
      e.bcs9 <= 5,
  )
  if (stable.length < 2) return null
  const sum = stable.reduce((s, e) => s + (e.actualConsumedKcalDay ?? 0), 0)
  return sum / stable.length
}

export function suggestEnergyAdjustment(options: {
  prescribedKcal: number
  weightTrend: 'stable' | 'gain' | 'loss'
  goal: 'maintenance' | 'weight_loss' | 'weight_gain'
  adherenceConfirmed: boolean
}): { factor: number; reason: string } | null {
  if (!options.adherenceConfirmed) return null
  if (options.goal === 'maintenance' && options.weightTrend === 'gain') {
    return { factor: 0.9, reason: 'Ganho não desejado com adesão confirmada.' }
  }
  if (options.goal === 'maintenance' && options.weightTrend === 'loss') {
    return { factor: 1.1, reason: 'Perda não desejada com adesão confirmada.' }
  }
  return null
}

export const MONITORING_INTERVALS = {
  dietChangeWeeks: [2, 4],
  weightLossInitialWeeks: 1,
  hospitalizedDays: 1,
  refeeding: 'before_each_advance',
} as const
