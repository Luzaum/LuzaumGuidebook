export type NeuroAxis =
  | 'PROSENCEFALO'
  | 'TRONCO_ENCEFALICO'
  | 'CEREBELO'
  | 'VESTIBULAR_PERIFERICO'
  | 'VESTIBULAR_CENTRAL'
  | 'MEDULA_C1_C5'
  | 'MEDULA_C6_T2'
  | 'MEDULA_T3_L3'
  | 'MEDULA_L4_S3'
  | 'CAUDA_EQUINA'
  | 'NEUROMUSCULAR'
  | 'MULTIFOCAL_OU_DIFUSA'
  | 'INDETERMINADO'

export type MotorPattern = 'UMN' | 'LMN' | 'VESTIBULAR' | 'CEREBELAR' | 'NEUROMUSCULAR' | 'INDEFINIDO'

export type Evidence = { label: string; weight: number }

export type NeuroLocalizationResult = {
  status: 'ok' | 'insufficient_data'
  primary: NeuroAxis
  secondary?: NeuroAxis[]
  distribution: 'FOCAL' | 'MULTIFOCAL' | 'DIFUSA' | 'INDETERMINADA'
  motorPattern: MotorPattern
  confidence: number // 0-100
  supportiveFindings: string[]
  contradictoryFindings: string[]
  narrative: string // textinho
  missing?: string[]
}

export type Differential = {
  name: string
  category:
    | 'INFLAMATORIA'
    | 'INFECCIOSA'
    | 'NEOPLASICA'
    | 'VASCULAR'
    | 'DEGENERATIVA'
    | 'TRAUMATICA'
    | 'TOXICO_METABOLICA'
    | 'COMPRESSIVA'
    | 'IDIOPATICA'
  likelihood: number // 0-100
  why: string[]
  diagnostics: {
    test: string
    priority: 'ALTA' | 'MEDIA' | 'BAIXA'
    whatItAdds: string
    expectedFindings: string
    limitations: string
  }[]
  treatment: {
    phase: '0-6H' | 'DEFINITIVO'
    plan: string[]
    cautions: string[]
  }[]
}

export type CaseReport = {
  generatedAtISO: string
  patientSummary: string
  historySummary: string
  examSummary: string
  neuroLocalization: NeuroLocalizationResult
  differentials: Differential[]
}
