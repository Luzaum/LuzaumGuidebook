import type { Species } from './types'
import {
  calculateFoodWaterMl,
  calculateMetabolicWaterMl,
  calculateOralWaterGap,
  estimateWaterFromEnergy,
  estimateWaterMicrobiomeMethod,
  WATER_DISCLAIMER,
} from './waterEngine'
import type { HydrationPlanConfig } from '../clinicalSnapshotTypes'

export type HydrationMethod = HydrationPlanConfig['selectedMethod']

export interface HydrationPlanInput {
  species: Species
  prescribedKcalDay: number
  rerKcalDay: number
  config: HydrationPlanConfig
  foodGrams: number
  moisturePct: number
  proteinGrams: number
  fatGrams: number
  carbGrams: number
  enteralFlushMlDay?: number
  clinicalFlags?: {
    vomiting?: boolean
    diarrhea?: boolean
    polyuria?: boolean
    lactation?: boolean
    renalDisease?: boolean
    urinaryDisease?: boolean
    elevatedTemperature?: boolean
    dryFoodOnly?: boolean
    enteralTube?: boolean
    continuousLosses?: boolean
  }
}

export interface HydrationPlanPreview {
  methodLabel: string
  selectedTargetMlDay?: number
  energyBasedMlDay?: number
  speciesBasedMlDay?: number
  foodWaterMlDay?: number
  metabolicWaterMlDay?: number
  voluntarilyConsumedWaterMlDay?: number | null
  enteralFlushWaterMlDay?: number
  estimatedOralWaterGapMlDay?: number
  alerts: string[]
  disclaimer: string
}

const CLINICAL_ALERT_MESSAGES: Record<string, string> = {
  vomiting: 'Vômito — reavaliar consumo hídrico e tolerância alimentar.',
  diarrhea: 'Diarreia — monitorar hidratação e estado clínico.',
  polyuria: 'Poliúria — consumo hídrico pode estar aumentado.',
  lactation: 'Lactação — demanda hídrica elevada.',
  renalDisease: 'Doença renal — revisar meta hídrica com critério clínico.',
  urinaryDisease: 'Doença urinária — atenção ao consumo voluntário.',
  elevatedTemperature: 'Temperatura elevada — perdas insensíveis aumentadas.',
  dryFoodOnly: 'Alimentação exclusivamente seca — água oral adicional pode ser necessária.',
  enteralTube: 'Sonda enteral — considerar lavagem prescrita separadamente da fluidoterapia.',
  continuousLosses: 'Perdas contínuas — não incluídas nesta estimativa nutricional.',
}

export function buildHydrationPlanPreview(input: HydrationPlanInput): HydrationPlanPreview | null {
  if (input.config.selectedMethod === 'none') return null
  if (input.prescribedKcalDay <= 0) return null

  const energyBased = estimateWaterFromEnergy(input.prescribedKcalDay)
  const speciesBased = estimateWaterMicrobiomeMethod(input.species, input.rerKcalDay)

  let selectedTarget: number | undefined
  let methodLabel = 'Estimativa baseada na energia prescrita (1 mL/kcal)'

  if (input.config.selectedMethod === 'manual') {
    selectedTarget = input.config.manualTargetMlDay
    methodLabel = 'Meta manual definida pelo médico-veterinário'
  } else if (input.config.selectedMethod === 'species_based') {
    selectedTarget = speciesBased
    methodLabel =
      input.species === 'cat'
        ? 'Estimativa por espécie (1,2× RER felino)'
        : 'Estimativa por espécie (1,6× RER canino)'
  } else {
    selectedTarget = energyBased
    methodLabel = 'Estimativa pela energia prescrita'
  }

  const foodWater =
    input.foodGrams > 0 && input.moisturePct > 0
      ? calculateFoodWaterMl(input.foodGrams, input.moisturePct)
      : undefined
  const metabolicWater = calculateMetabolicWaterMl(input.fatGrams, input.carbGrams, input.proteinGrams)

  const voluntaryKnown = input.config.voluntarilyConsumedWaterKnown === true
  const voluntary =
    voluntaryKnown && input.config.voluntarilyConsumedWaterMlDay != null
      ? input.config.voluntarilyConsumedWaterMlDay
      : voluntaryKnown
        ? input.config.voluntarilyConsumedWaterMlDay
        : null

  const flush = input.enteralFlushMlDay ?? input.config.enteralFlushWaterMlDay
  const gap =
    selectedTarget != null
      ? calculateOralWaterGap({
          targetWaterMl: selectedTarget,
          foodWaterMl: foodWater ?? 0,
          metabolicWaterMl: metabolicWater,
          voluntarilyDrunkWaterMl: voluntary ?? undefined,
          enteralFlushWaterMl: flush,
        })
      : undefined

  const alerts: string[] = []
  const flags = input.clinicalFlags ?? {}
  for (const [key, message] of Object.entries(CLINICAL_ALERT_MESSAGES)) {
    if (flags[key as keyof typeof flags]) alerts.push(message)
  }

  return {
    methodLabel,
    selectedTargetMlDay: selectedTarget,
    energyBasedMlDay: energyBased,
    speciesBasedMlDay: speciesBased,
    foodWaterMlDay: foodWater,
    metabolicWaterMlDay: metabolicWater > 0 ? metabolicWater : undefined,
    voluntarilyConsumedWaterMlDay: voluntary,
    enteralFlushWaterMlDay: flush && flush > 0 ? flush : undefined,
    estimatedOralWaterGapMlDay: gap,
    alerts,
    disclaimer: WATER_DISCLAIMER,
  }
}

export function validateManualHydrationTarget(config: HydrationPlanConfig): string | null {
  if (config.selectedMethod !== 'manual') return null
  if (config.manualTargetMlDay == null || config.manualTargetMlDay <= 0) {
    return 'Informe a meta hídrica em mL/dia.'
  }
  if (!config.manualReason?.trim()) {
    return 'Justificativa clínica obrigatória para meta manual.'
  }
  return null
}
