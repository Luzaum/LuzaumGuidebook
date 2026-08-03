import type { EnteralFeedingOrder, EnteralFeedingOrderInput } from './types'
import { HOSPITAL_PROTOCOL_V2 } from './types'

function defaultSchedule(administrationsPerDay: number): string[] {
  if (administrationsPerDay <= 1) return ['08:00']
  if (administrationsPerDay === 2) return ['08:00', '20:00']
  if (administrationsPerDay === 3) return ['08:00', '14:00', '20:00']
  if (administrationsPerDay === 4) return ['08:00', '12:00', '16:00', '20:00']
  return Array.from({ length: administrationsPerDay }, (_, index) => {
    const hour = 8 + Math.floor((index * 12) / administrationsPerDay)
    return `${String(hour).padStart(2, '0')}:00`
  })
}

export function buildEnteralFeedingOrder(input: EnteralFeedingOrderInput): EnteralFeedingOrder {
  const densityKcalPerG = input.energyDensityKcalPerGram
  const densityKcalPerMl = input.energyDensityKcalPerMl
  const useMl = densityKcalPerMl != null && densityKcalPerMl > 0

  const density = useMl ? densityKcalPerMl! : densityKcalPerG ?? 0
  const gramsOrMlPerDay = density > 0 ? input.dailyTargetKcal / density : 0
  const gramsOrMlPerAdministration =
    input.administrationsPerDay > 0 ? gramsOrMlPerDay / input.administrationsPerDay : 0

  const progressionSummary = input.progression
    .map((step) => `D${step.day}: ${step.percentRer.toFixed(0)}% RER (${step.kcalTarget.toFixed(0)} kcal)`)
    .join(' · ')

  return {
    protocolVersion: HOSPITAL_PROTOCOL_V2,
    patientName: input.patientName,
    diagnosis: input.diagnosis,
    feedingRoute: input.feedingRoute,
    foodName: input.foodName,
    energyDensityLabel: useMl
      ? `${densityKcalPerMl!.toFixed(2)} kcal/ml`
      : `${(densityKcalPerG ?? 0).toFixed(2)} kcal/g`,
    rer: input.rer,
    dailyTargetKcal: input.dailyTargetKcal,
    percentRer: input.percentRer,
    gramsOrMlPerDay: Math.round(gramsOrMlPerDay * 10) / 10,
    gramsOrMlPerAdministration: Math.round(gramsOrMlPerAdministration * 10) / 10,
    administrationsPerDay: input.administrationsPerDay,
    schedule: defaultSchedule(input.administrationsPerDay),
    infusionRateMlPerHour: input.continuousInfusion ? input.infusionRateMlPerHour : undefined,
    flushVolumeMl: input.flushVolumeMl,
    dilutionWaterMl: input.dilutionWaterMl,
    progressionSummary,
    monitoring: [
      'Registrar volume efetivamente administrado.',
      'Monitorar vômito, regurgitação e distensão.',
      'Reavaliar eletrólitos conforme risco de realimentação.',
    ],
    stopCriteria: [
      'Vômito repetido ou regurgitação.',
      'Distensão abdominal.',
      'Hipofosfatemia / hipocalemia / hipomagnesemia.',
    ],
    tubeType: input.tubeType,
    tubeSize: input.tubeSize,
  }
}

export function computeReceivedPercent(prescribedKcal: number, receivedKcal: number): number {
  if (prescribedKcal <= 0) return 0
  return Math.min(100, Math.round((receivedKcal / prescribedKcal) * 1000) / 10)
}
