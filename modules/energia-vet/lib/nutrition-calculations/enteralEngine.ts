export function calculateEnteralDailyVolume(targetKcalDay: number, dietKcalPerMl: number): number | null {
  if (dietKcalPerMl <= 0) return null
  return targetKcalDay / dietKcalPerMl
}

export function calculateEnteralDailyGrams(targetKcalDay: number, dietKcalPerG: number): number | null {
  if (dietKcalPerG <= 0) return null
  return targetKcalDay / dietKcalPerG
}

export function calculateBolusMeal(
  dailyVolumeMl: number,
  dailyKcal: number,
  mealsPerDay: number,
): { mlPerMeal: number; kcalPerMeal: number } {
  const n = Math.max(1, mealsPerDay)
  return { mlPerMeal: dailyVolumeMl / n, kcalPerMeal: dailyKcal / n }
}

export function calculateContinuousInfusion(
  dailyVolumeMl: number,
  dailyKcal: number,
  infusionHoursPerDay: number,
): { mlPerHour: number; kcalPerHour: number } {
  const h = Math.max(1, infusionHoursPerDay)
  return { mlPerHour: dailyVolumeMl / h, kcalPerHour: dailyKcal / h }
}

export function calculateReceivedPercent(prescribedKcal: number, receivedKcal: number): number {
  if (prescribedKcal <= 0) return 0
  return (receivedKcal / prescribedKcal) * 100
}

/** Percentual real recebido — pode exceder 100% quando clinicamente relevante. */
export function calculateDeliveredPercent(prescribedKcal: number, receivedKcal: number): number {
  return calculateReceivedPercent(prescribedKcal, receivedKcal)
}

export function calculateCaloricDeficit(prescribedKcal: number, receivedKcal: number): number {
  return Math.max(0, prescribedKcal - receivedKcal)
}
