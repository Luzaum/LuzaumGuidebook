import type { ContentFlag } from './common'
import type { ReferenceItem } from './reference'

export type MedicationSpecies = 'dog' | 'cat' | 'both'

export type MedicationPresentation = {
  id: string
  label: string
  concentrationValue?: number
  concentrationUnit?: string
  form: string
  packInfo?: string
  route?: string
  scoringInfo?: string
}

export type MedicationDose = {
  id: string
  medicationId: string
  species: MedicationSpecies
  indication?: string
  doseMin?: number
  doseMax?: number
  doseUnit: string
  perWeightUnit?: string
  route?: string
  frequency?: string
  duration?: string
  notes?: string
  calculatorEnabled: boolean
}

export type MedicationRecord = ContentFlag & {
  id: string
  slug: string
  title: string
  activeIngredient: string
  tradeNames: string[]
  species: MedicationSpecies[]
  category: string
  pharmacologicClass: string
  tags: string[]
  mechanismOfAction: string
  indications: string[]
  contraindications: string[]
  cautions: string[]
  adverseEffects: string[]
  interactions: string[]
  routes: string[]
  presentations: MedicationPresentation[]
  doses: MedicationDose[]
  adminNotesRichText: string
  relatedDiseaseSlugs: string[]
  references: ReferenceItem[]
  isDraft: boolean
  createdAt: string
  updatedAt: string
}
