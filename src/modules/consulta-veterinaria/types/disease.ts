import type { ContentFlag } from './common'
import type { ReferenceItem } from './reference'

export type DiseaseSpecies = 'dog' | 'cat' | 'both'

export type DiseaseSectionList = {
  title?: string
  items: string[]
}

export type DiseaseIntroduction = {
  description: string
  cause: string
  affectedHosts: string[]
  transmissionModes: string[]
  mainClinicalSigns: string[]
  summaryDifferentials: string[]
}

export type DiseaseEtiology = {
  overview?: string
  causes: string[]
  riskFactors: string[]
  immunologicFactors: string[]
  environmentalFactors: string[]
  populationFactors: string[]
}

export type DiseaseTransmission = {
  overview?: string
  directTransmission: string[]
  indirectTransmission: string[]
  verticalTransmission: string[]
  sheddingInfo: string[]
  susceptibleGroups: string[]
}

export type DiseasePathophysiology = {
  infectionStart: string[]
  dissemination: string[]
  immuneInteraction: string[]
  tissueDamage: string[]
  cnsLesions: string[]
  possibleSystemsAffected: Array<{
    system: string
    findings: string[]
  }>
  outcomes: string[]
  pathogenElimination: string[]
}

export type DiseaseEpidemiology = {
  incidencePrevalence?: string
  agePredisposition: string[]
  breedPredisposition: string[]
  sexPredisposition: string[]
  speciesPredisposition: string[]
  vaccineRelatedInfo: string[]
  riskFactors: string[]
  environmentalExposure: string[]
}

export type DiseaseClinicalPresentation = {
  historyComplaints: string[]
  generalSigns: string[]
  respiratorySigns: string[]
  gastrointestinalSigns: string[]
  neurologicSigns: string[]
  ocularSigns: string[]
  dermatologicSigns: string[]
  urinarySigns: string[]
  dentalSigns: string[]
  hematologicSigns: string[]
  stageDifferences: string[]
}

export type DiseasePhysicalExam = {
  general: string[]
  ocular: string[]
  respiratory: string[]
  cardiovascular: string[]
  gastrointestinal: string[]
  dermatologic: string[]
  neurologic: string[]
  perfusionHydration: string[]
  otherFindings: string[]
}

export type DiseaseDifferentialDiagnoses = {
  general: string[]
  neurologicForm: string[]
  respiratoryForm: string[]
  gastrointestinalForm: string[]
  infectious: string[]
  inflammatory: string[]
  toxicMetabolicStructural: string[]
}

export type DiseaseDiagnostics = {
  auxiliaryTests: string[]
  hematologyFindings: string[]
  biochemistryFindings: string[]
  urinalysisFindings: string[]
  csfFindings: string[]
  radiographicFindings: string[]
  ultrasoundFindings: string[]
  cytologyFindings: string[]
  histopathologyFindings: string[]
  inclusionBodies: string[]
  serology: string[]
  antigenDetection: string[]
  pcr: string[]
  sampleOptions: string[]
}

export type DiseaseDiagnosticApproach = {
  overview?: string
  clinicalSuspicion: string[]
  firstLineTests: string[]
  mostSensitiveTests: string[]
  mostSpecificTests: string[]
  pitfalls: string[]
  falsePositiveConsiderations: string[]
  falseNegativeConsiderations: string[]
}

export type DiseaseTreatment = {
  overview?: string
  specificTherapy: string[]
  supportiveCare: string[]
  fluidTherapy: string[]
  antibiotics: string[]
  antiemetics: string[]
  anticonvulsants: string[]
  nutritionalSupport: string[]
  oxygenSupport: string[]
  shockManagement: string[]
  glucoseManagement: string[]
  cardiovascularSupport: string[]
  vasoactiveDrugs: string[]
  monitoringChecklist: string[]
  avoidMistakes: string[]
}

export type DiseasePrognosis = {
  overview?: string
  favorableFactors: string[]
  unfavorableFactors: string[]
  mortalityInfo: string[]
  sequelae: string[]
}

export type DiseaseComplications = {
  neurologic: string[]
  respiratory: string[]
  gastrointestinal: string[]
  infectiousSecondary: string[]
  hematologic: string[]
  chronic: string[]
  rare: string[]
}

export type DiseasePrevention = {
  vaccination: string[]
  immunityInfo: string[]
  vaccineProtocol: string[]
  revaccination: string[]
  shelterControl: string[]
  environmentalHygiene: string[]
}

export type DiseaseRecord = ContentFlag & {
  id: string
  slug: string
  title: string
  synonyms: string[]
  species: DiseaseSpecies[]
  category: string
  subcategory?: string
  tags: string[]
  quickSummary: string
  thirtySecondView: string[]
  dontForget: string[]
  redFlags: string[]
  whenToSuspect: string[]
  initialApproach: string[]
  dogVsCatDifferences: string[]
  mostHelpfulTests: string[]
  commonMistakes: string[]
  clinicalPearls: string[]
  introduction: DiseaseIntroduction
  etiology: DiseaseEtiology
  transmission: DiseaseTransmission
  pathophysiology: DiseasePathophysiology
  epidemiology: DiseaseEpidemiology
  clinicalPresentation: DiseaseClinicalPresentation
  physicalExam: DiseasePhysicalExam
  differentialDiagnoses: DiseaseDifferentialDiagnoses
  diagnostics: DiseaseDiagnostics
  diagnosticApproach: DiseaseDiagnosticApproach
  treatment: DiseaseTreatment
  prognosis: DiseasePrognosis
  complications: DiseaseComplications
  prevention: DiseasePrevention
  relatedConsensusIds: string[]
  relatedMedicationSlugs: string[]
  references: ReferenceItem[]
  adminNotesRichText: string
  isDraft: boolean
  createdAt: string
  updatedAt: string
}

