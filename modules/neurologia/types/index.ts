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

export interface NeuroDisease {
  id: string
  name_pt: string
  category: string
  localizations: string[]
  species: string[]
  onset: string
  course: string
  key_features: string[]
  priority_tests: string[]
  red_flags: string[]
  evidenceLevel: 'CLINICAL_ONLY' | 'CLINICAL_PLUS_BASIC_TESTS' | 'ADVANCED_REQUIRED'
  details?: ExtendedNeuroDiseaseDetails
}

export interface ExtendedNeuroDiseaseDetails {
  typical_age_profile?: {
    peak?: string
    bimodal?: string
    notes?: string
    risk_groups?: string[]
  }
  neuroanatomy_neurophysiology?: {
    primary_system: string
    why_it_makes_sense: string[]
  }
  pathogenesis?: {
    core_mechanism?: string
    core_mechanisms?: string[]
    predisposing_factors?: string[]
    mechanism_of_lactulose?: string // Specific fields can be added or generalized as needed
  }
  diagnosis_in_app_logic?: {
    what_app_can_conclude: string[]
    tests?: string[]
    minimum_next_tests?: string[]
    confirmatory_or_supporting_tests?: string[]
    next_tests_priority?: string[]
  }
  treatment?: {
    emergency?: {
      goal: string
      options: Array<{ drug: string; dose: string; why: string; source?: string }>
    }
    acute?: {
      goals?: string[]
      options?: Array<{ drug: string; dose: string; why: string; source?: string }> // Added to allow generic acute treatments
      lactulose?: { dog_oral: string; cat_oral: string; enema: string; adverse_effects: string }
      antibiotics_to_reduce_colonic_flora?: { examples: string[] }
      dextrose_bolus_adult?: string
      post_bolus?: string
      important_warning?: string
      monitoring?: string[]
      adjuncts_selected_cases?: string[]
      calcium_gluconate_bolus?: string
      calcium_infusion?: string
      monitoring_notes?: string[]
    }
    chronic_control?: {
      goal: string
      strategy: string[]
      special_notes_comorbidities?: string[] // Made optional
    }
    long_term?: {
      goals: string[]
    }
    etiologic_or_subacute?: {
      oral_calcium?: string
      vitamin_d?: string
    }
    iv_supplementation?: {
      typical: string
      hypokalemic_higher_doses: string
      contraindications_cautions: string[]
      oral_note: string
    }
  }
  common_pitfalls?: string[]
  references?: string[]
}
