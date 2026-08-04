import type {
  NutritionClinicalRecord,
  StoredCalculationReport,
  TherapeuticDietReview,
} from '../types'

export type { NutritionClinicalRecord, StoredCalculationReport, TherapeuticDietReview }

export type NutritionPdfMode = 'tutor_plan' | 'technical_report'

export interface PdfKeyValueRow {
  label: string
  value: string
}

export interface PdfFoodPrescriptionRow {
  name: string
  dailyAmount: string
  perMealAmount: string
  dailyKcal?: string
  energyPct?: string
  exactGrams?: number
  practicalGrams?: number
}

export interface PdfMealScheduleRow {
  time: string
  detail: string
}

export interface PdfNutrientAdequacyRow {
  nutrient: string
  delivered: string
  target: string
  status: string
  interpretation: string
  basis: string
}

export interface PdfDataQualityRow {
  item: string
  quality: string
}

export interface PdfTherapeuticProfileBlock {
  profileName: string
  statusLabel: string
  goalLines: string[]
}

export interface NutritionPdfDocumentModel {
  mode: NutritionPdfMode
  generatedAt: string
  clinicName: string
  veterinarianName: string
  patientName: string
  speciesLabel: string
  breed?: string
  currentWeight?: string
  objectiveTitle: string
  objectiveDetail: string
  headerRows: PdfKeyValueRow[]
  identificationRows: PdfKeyValueRow[]
  bodyCompositionRows: PdfKeyValueRow[]
  energyRows: PdfKeyValueRow[]
  foodRows: PdfFoodPrescriptionRow[]
  mealSchedule: PdfMealScheduleRow[]
  treatsText: string
  hydrationText: string
  transitionRows: string[][]
  preparationBullets: string[]
  monitoringBullets: string[]
  warningBullets: string[]
  macroRows: PdfKeyValueRow[]
  nutrientRows: PdfNutrientAdequacyRow[]
  therapeuticProfiles: PdfTherapeuticProfileBlock[]
  therapeuticConflicts: string[]
  monitoringRecommendations: string[]
  dataQualityRows: PdfDataQualityRow[]
  hospitalRows: PdfKeyValueRow[]
  references: string[]
  comorbidityLabels: string[]
}

export interface BuildPdfModelInput {
  report: StoredCalculationReport
  mode: NutritionPdfMode
  clinicalRecord?: NutritionClinicalRecord
  clinicName?: string
  veterinarianName?: string
}

