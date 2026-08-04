export interface ParenteralNutritionInput {
  currentWeightKg: number
  targetKcalDay: number
  proteinGramsPer100Kcal: number
  lipidFraction?: number
  dextroseFraction?: number
  infusionHours: number
  additionalFluidMlDay?: number
}

export interface ParenteralNutritionResult {
  proteinGramsDay: number
  aminoAcidVolumeMlDay: number
  proteinKcalDay: number
  nonProteinKcalDay: number
  lipidKcalDay: number
  lipidVolumeMlDay: number
  lipidGramsDay: number
  lipidGramsKgDay: number
  dextroseKcalDay: number
  dextroseVolumeMlDay: number
  dextroseGramsDay: number
  glucoseInfusionRateMgKgMin: number
  totalPnVolumeMlDay: number
  pnRateMlHour: number
  alerts: string[]
}

export function calculateParenteralNutrition(input: ParenteralNutritionInput): ParenteralNutritionResult {
  const alerts: string[] = []
  const lipidFraction = input.lipidFraction ?? 0.5
  const dextroseFraction = input.dextroseFraction ?? 0.5

  const proteinGramsDay = (input.targetKcalDay / 100) * input.proteinGramsPer100Kcal
  const aminoAcidVolumeMlDay = proteinGramsDay / 0.085
  const proteinKcalDay = proteinGramsDay * 4
  const nonProteinKcalDay = Math.max(0, input.targetKcalDay - proteinKcalDay)

  const lipidKcalDay = nonProteinKcalDay * lipidFraction
  const lipidVolumeMlDay = lipidKcalDay / 2
  const lipidGramsDay = lipidVolumeMlDay * 0.2
  const lipidGramsKgDay = input.currentWeightKg > 0 ? lipidGramsDay / input.currentWeightKg : 0
  if (lipidGramsKgDay > 2) alerts.push('Lipídios acima de 2 g/kg/dia — revisar tolerância.')

  const dextroseKcalDay = nonProteinKcalDay * dextroseFraction
  const dextroseVolumeMlDay = dextroseKcalDay / 1.7
  const dextroseGramsDay = dextroseVolumeMlDay * 0.5
  const infusionMinutes = input.infusionHours * 60
  const glucoseInfusionRateMgKgMin =
    input.currentWeightKg > 0 && infusionMinutes > 0
      ? (dextroseGramsDay * 1000) / (input.currentWeightKg * infusionMinutes)
      : 0
  if (glucoseInfusionRateMgKgMin > 4) alerts.push('Taxa de infusão de glicose acima de 4 mg/kg/min — revisar.')

  const additionalFluidMlDay = input.additionalFluidMlDay ?? 0
  const totalPnVolumeMlDay =
    aminoAcidVolumeMlDay + lipidVolumeMlDay + dextroseVolumeMlDay + additionalFluidMlDay
  const pnRateMlHour = input.infusionHours > 0 ? totalPnVolumeMlDay / input.infusionHours : 0

  return {
    proteinGramsDay,
    aminoAcidVolumeMlDay,
    proteinKcalDay,
    nonProteinKcalDay,
    lipidKcalDay,
    lipidVolumeMlDay,
    lipidGramsDay,
    lipidGramsKgDay,
    dextroseKcalDay,
    dextroseVolumeMlDay,
    dextroseGramsDay,
    glucoseInfusionRateMgKgMin,
    totalPnVolumeMlDay,
    pnRateMlHour,
    alerts,
  }
}

export const PARENTERAL_PROTEIN_TARGETS = {
  dog: { standard: [4, 5], reduced: [2, 3], increased: [5, 6] },
  cat: { standard: [6, 6], reduced: [4, 5], increased: [6, 8] },
} as const
