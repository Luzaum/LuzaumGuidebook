import { calculateRER, calculateRefeedingRisk, getProgressionPlan3Days, getProgressionPlan4Days } from '../nutrition'
import {
  HOSPITAL_PROTOCOL_V2,
  LEGACY_REFEEDING_PROTOCOL_V1,
  type RefeedingAssessment,
  type RefeedingProgressionStep,
  type RefeedingProtocolId,
  type RefeedingRiskLevel,
  type RefeedingScreeningInput,
} from './types'

const V1 = LEGACY_REFEEDING_PROTOCOL_V1
const V2 = HOSPITAL_PROTOCOL_V2

function mapLegacyRisk(risk: 'low' | 'moderate' | 'high'): RefeedingRiskLevel {
  return risk
}

function buildLegacyProgression(
  rer: number,
  protocolId: RefeedingProtocolId,
): RefeedingProgressionStep[] {
  const plan =
    protocolId === 'legacy_3_days' ? getProgressionPlan3Days(rer) : getProgressionPlan4Days(rer)

  return plan.map((step) => ({
    day: step.day,
    percentRer: step.percent,
    kcalTarget: step.kcal,
    requiresToleranceCheck: step.day > 1,
    notes: step.day === 1 ? 'Avaliar tolerância antes de progredir.' : undefined,
  }))
}

function assessRiskV2(input: RefeedingScreeningInput): RefeedingRiskLevel {
  const electrolytesLow =
    input.electrolytesLow ||
    input.phosphorusLow ||
    input.potassiumLow ||
    input.magnesiumLow

  if (input.weightKg <= 0) return 'insufficient_data'

  const legacy = calculateRefeedingRisk(
    input.daysAnorexic,
    input.daysHyporexic,
    input.recentIntakePercent,
    input.bcs,
    electrolytesLow,
  )

  let risk = mapLegacyRisk(legacy)

  if (input.onParenteralNutrition && input.daysAnorexic >= 3) {
    risk = 'high'
  }
  if (input.sepsis || input.trauma) {
    if (risk === 'low') risk = 'moderate'
  }
  if (input.pancreatitis && input.hasVomiting) {
    risk = risk === 'high' ? 'high' : 'moderate'
  }

  return risk
}

function buildMonitoring(risk: RefeedingRiskLevel): string[] {
  const base = [
    'Registrar ingestão realmente administrada (não apenas prescrita).',
    'Pesar ou estimar peso diariamente quando aplicável.',
    'Avaliar vômito, regurgitação, distensão e dor abdominal.',
  ]

  if (risk === 'high' || risk === 'moderate') {
    base.push('Fósforo sérico a cada 12–24 h nas primeiras 72 h.')
    base.push('Potássio e magnésio séricos diariamente.')
    base.push('Suplementar tiamina antes/durante realimentação.')
  }

  return base
}

function buildStopCriteria(risk: RefeedingRiskLevel): string[] {
  return [
    'Vômito ou regurgitação repetidos.',
    'Distensão abdominal ou dor progressiva.',
    'Hipofosfatemia, hipocalemia ou hipomagnesemia documentada.',
    risk === 'high' ? 'Qualquer sinal neurológico ou arritmia.' : 'Reduzir ou suspender se tolerância inadequada.',
  ]
}

export function assessRefeedingPlan(
  input: RefeedingScreeningInput,
  options?: { protocolId?: RefeedingProtocolId; useV2?: boolean },
): RefeedingAssessment {
  const rer = calculateRER(input.weightKg, input.species)
  const protocolId = options?.protocolId ?? 'legacy_4_days'
  const useV2 = options?.useV2 ?? false

  const riskLevel = useV2 ? assessRiskV2(input) : mapLegacyRisk(
    calculateRefeedingRisk(
      input.daysAnorexic,
      input.daysHyporexic,
      input.recentIntakePercent,
      input.bcs,
      input.electrolytesLow,
    ),
  )

  const progression = buildLegacyProgression(rer, protocolId)

  const alerts: string[] = []
  if (riskLevel === 'high') {
    alerts.push('Alto risco de síndrome de realimentação — não avançar automaticamente sem reavaliação.')
  }
  if (input.recentIntakePercent > 0 && input.recentIntakePercent <= 25) {
    alerts.push(`Ingestão recente estimada em ${input.recentIntakePercent}% da necessidade.`)
  }

  return {
    protocolVersion: useV2 ? V2 : V1,
    riskLevel,
    rer,
    protocolId,
    progression,
    alerts,
    monitoring: buildMonitoring(riskLevel),
    stopCriteria: buildStopCriteria(riskLevel),
  }
}

export function adjustProgressionStep(
  progression: RefeedingProgressionStep[],
  day: number,
  action: 'maintain' | 'advance' | 'reduce' | 'suspend',
  justification: string,
): RefeedingProgressionStep[] {
  return progression.map((step) => {
    if (step.day !== day) return step
    if (action === 'suspend') {
      return { ...step, kcalTarget: 0, percentRer: 0, notes: `Suspenso: ${justification}` }
    }
    if (action === 'reduce') {
      return {
        ...step,
        kcalTarget: step.kcalTarget * 0.75,
        percentRer: step.percentRer * 0.75,
        notes: `Reduzido: ${justification}`,
      }
    }
    if (action === 'maintain') {
      return { ...step, notes: `Mantido: ${justification}` }
    }
    return { ...step, notes: `Avançado após tolerância: ${justification}` }
  })
}

export { V1 as LEGACY_REFEEDING_PROTOCOL_V1, V2 as HOSPITAL_PROTOCOL_V2 }
