import {
  calculateParenteralOsmolarity,
  DEFAULT_PERIPHERAL_OSMOLARITY_LIMIT_MOSM_L,
  TYPICAL_PN_COMPONENT_OSMOLARITY,
  type ParenteralComponent,
} from './parenteralOsmolarityEngine'

export interface ParenteralNutritionInput {
  currentWeightKg: number
  targetKcalDay: number
  proteinGramsPer100Kcal: number
  lipidFraction?: number
  dextroseFraction?: number
  infusionHours: number
  additionalFluidMlDay?: number
  vascularAccess?: 'peripheral' | 'central' | 'not_defined'
  peripheralOsmolarityLimitMosmL?: number
  customComponents?: ParenteralComponent[]
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
  estimatedOsmolarityMosmL: number | null
  osmolarityAlerts: string[]
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

  const energyFractionSum = lipidFraction + dextroseFraction
  if (Math.abs(energyFractionSum - 1) > 0.01) {
    alerts.push('Frações energéticas de lipídios e dextrose não somam 100% — revisar.')
  }
  if (proteinKcalDay > input.targetKcalDay) {
    alerts.push('Energia proteica maior que energia total prescrita.')
  }
  if (pnRateMlHour > 0 && totalPnVolumeMlDay > 0 && input.infusionHours <= 0) {
    alerts.push('Taxa de infusão incompatível com volume e tempo de infusão.')
  }

  const defaultComponents: ParenteralComponent[] = [
    {
      name: 'Solução de aminoácidos 8,5%',
      volumeMl: aminoAcidVolumeMlDay,
      osmolarityMosmL: TYPICAL_PN_COMPONENT_OSMOLARITY['aminoacidos_8.5'],
      source: 'manufacturer',
    },
    {
      name: 'Dextrose 50%',
      volumeMl: dextroseVolumeMlDay,
      osmolarityMosmL: TYPICAL_PN_COMPONENT_OSMOLARITY.dextrose_50,
      source: 'manufacturer',
    },
    {
      name: 'Emulsão lipídica 20%',
      volumeMl: lipidVolumeMlDay,
      osmolarityMosmL: TYPICAL_PN_COMPONENT_OSMOLARITY.lipideos_20,
      source: 'manufacturer',
    },
  ]

  const osmResult = calculateParenteralOsmolarity({
    components: input.customComponents ?? defaultComponents,
    additionalDiluentMl: additionalFluidMlDay > 0 ? additionalFluidMlDay : undefined,
    additionalDiluentOsmolarityMosmL: TYPICAL_PN_COMPONENT_OSMOLARITY.agua_destilada,
    peripheralOsmolarityLimitMosmL:
      input.peripheralOsmolarityLimitMosmL ?? DEFAULT_PERIPHERAL_OSMOLARITY_LIMIT_MOSM_L,
    vascularAccess: input.vascularAccess ?? 'not_defined',
  })

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
    estimatedOsmolarityMosmL: osmResult.finalOsmolarityMosmL,
    osmolarityAlerts: osmResult.alerts,
    alerts: [...alerts, ...osmResult.alerts],
  }
}

export { DEFAULT_PERIPHERAL_OSMOLARITY_LIMIT_MOSM_L, type ParenteralComponent } from './parenteralOsmolarityEngine'

export const PARENTERAL_PROTEIN_TARGETS = {
  dog: { standard: [4, 5], reduced: [2, 3], increased: [5, 6] },
  cat: { standard: [6, 6], reduced: [4, 5], increased: [6, 8] },
} as const
