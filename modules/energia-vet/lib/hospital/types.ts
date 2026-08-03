import type { BCS, FeedingRoute, Species } from '../../types'

export const LEGACY_REFEEDING_PROTOCOL_V1 = 'legacy-refeeding-v1' as const
export const HOSPITAL_PROTOCOL_V2 = 'hospital-nutrition-v2.0.0' as const

export type RefeedingRiskLevel = 'low' | 'moderate' | 'high' | 'insufficient_data'
export type RefeedingProtocolId = 'legacy_3_days' | 'legacy_4_days' | 'configurable_v2'

export interface RefeedingScreeningInput {
  species: Species
  weightKg: number
  bcs: BCS
  daysAnorexic: number
  daysHyporexic: number
  recentIntakePercent: number
  electrolytesLow: boolean
  phosphorusLow?: boolean
  potassiumLow?: boolean
  magnesiumLow?: boolean
  hasVomiting?: boolean
  hasDiarrhea?: boolean
  baseDisease?: string
  sepsis?: boolean
  trauma?: boolean
  pancreatitis?: boolean
  giLosses?: boolean
  extensiveWounds?: boolean
  onParenteralNutrition?: boolean
}

export interface RefeedingProgressionStep {
  day: number
  percentRer: number
  kcalTarget: number
  requiresToleranceCheck: boolean
  notes?: string
}

export interface RefeedingAssessment {
  protocolVersion: typeof LEGACY_REFEEDING_PROTOCOL_V1 | typeof HOSPITAL_PROTOCOL_V2
  riskLevel: RefeedingRiskLevel
  rer: number
  protocolId: RefeedingProtocolId
  progression: RefeedingProgressionStep[]
  alerts: string[]
  monitoring: string[]
  stopCriteria: string[]
}

export interface EnteralFeedingOrderInput {
  species: Species
  patientName: string
  diagnosis?: string
  feedingRoute: FeedingRoute
  rer: number
  dailyTargetKcal: number
  percentRer: number
  foodName: string
  energyDensityKcalPerGram?: number
  energyDensityKcalPerMl?: number
  administrationsPerDay: number
  tubeType?: string
  tubeSize?: string
  maxVolumePerAdministrationMl?: number
  continuousInfusion?: boolean
  infusionRateMlPerHour?: number
  flushVolumeMl?: number
  dilutionWaterMl?: number
  progression: RefeedingProgressionStep[]
  responsibleClinician?: string
}

export interface EnteralFeedingOrder {
  protocolVersion: typeof HOSPITAL_PROTOCOL_V2
  patientName: string
  diagnosis?: string
  feedingRoute: FeedingRoute
  foodName: string
  energyDensityLabel: string
  rer: number
  dailyTargetKcal: number
  percentRer: number
  gramsOrMlPerDay: number
  gramsOrMlPerAdministration: number
  administrationsPerDay: number
  schedule: string[]
  infusionRateMlPerHour?: number
  flushVolumeMl?: number
  dilutionWaterMl?: number
  progressionSummary: string
  monitoring: string[]
  stopCriteria: string[]
  tubeType?: string
  tubeSize?: string
}

export interface HospitalDailyMonitoringEntry {
  date: string
  weightKg?: number
  bcs?: BCS
  prescribedKcal: number
  receivedKcal: number
  percentReceived: number
  vomiting?: boolean
  nausea?: boolean
  diarrhea?: boolean
  regurgitation?: boolean
  distension?: boolean
  pain?: boolean
  glucose?: number
  phosphorus?: number
  potassium?: number
  magnesium?: number
  hydrationNotes?: string
  tubeIssues?: string
  interruptionReason?: string
  recordedBy?: string
}
