export enum Species {
  Dog = 'Dog',
  Cat = 'Cat',
}

export enum Sex {
  Male = 'M',
  Female = 'F',
}

export enum PhysiologicState {
  Intact = 'Inteiro',
  Castrated = 'Castrado',
  Pregnant = 'Gestante',
  Lactating = 'Lactante',
  Pediatric = 'Pediátrico',
  Geriatric = 'Geriátrico',
}

export enum TimeCourse {
  Peracute = 'Peragudo (<24h)',
  Acute = 'Agudo (24-48h)',
  Subacute = 'Subagudo (dias)',
  Chronic = 'Crônico (semanas/meses)',
  Episodic = 'Episódico',
}

export enum Course {
  Progressive = 'Progressivo',
  Static = 'Estático',
  Improving = 'Melhorando',
  WaxingWaning = 'Flutuante',
}

export enum Severity {
  Absent = 'Ausente',
  Mild = 'Leve',
  Moderate = 'Moderado',
  Severe = 'Severo',
}

export enum EvaluationStatus {
  Normal = 'Normal',
  Altered = 'Alterado',
  NotEvaluable = 'Não Avaliável',
}

export interface PatientProfile {
  species: Species | null
  age: { years: number; months: number }
  sex: Sex | null
  physiologicState: PhysiologicState[]
  weight: number
  comorbidities: string[]
  medications: { name: string; dose?: string }[]
  temporalPattern: TimeCourse | null
  course: Course | null
  redFlags: string[]
  observations?: string
}

export interface NeuroExam {
  findings: Record<string, any>
  timestamp: string
}

export interface NeuroLocalization {
  primary: string
  secondary: string[]
  explanation: string
  confidence: number
}

export interface Etiology {
  name: string
  category: string
  confidence: number
  justification: string
}

export interface DiagnosticPlan {
  test: string
  priority: number
  rationale: string
  expectedYield: string
}

export interface AnalysisResult {
  localization: NeuroLocalization
  etiologies: Etiology[]
  diagnostics: DiagnosticPlan[]
  alerts: string[]
}

export interface AppState {
  currentStep: number
  patient: PatientProfile
  chiefComplaints: string[]
  exam: NeuroExam
  analysis: AnalysisResult | null
  theme: 'dark' | 'light'
}
