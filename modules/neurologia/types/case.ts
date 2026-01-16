export interface PatientProfile {
  species: 'dog' | 'cat'
  breed?: string
  ageRange: 'pediatric' | 'adult' | 'geriatric'
  ageYears?: number
  sex: 'male' | 'female'
  neutered: boolean
  weight?: number
  comorbidities: string[]
  medications: string[]
}

export interface ClinicalHistory {
  chiefComplaint: string
  course: 'peracute' | 'acute' | 'subacute' | 'chronic' | 'episodic'
  progression: 'progressive' | 'static' | 'improving' | 'fluctuating'
  trauma: boolean
  toxin: boolean
  fever: boolean
  onset: string
  duration: string
}

export interface NeuroExamFindings {
  mentation: string
  behavior: string
  head_posture: string
  ambulation: string
  gait_thoracic: string
  gait_pelvic: string
  ataxia_type: string
  proprioception_thoracic_left: string
  proprioception_thoracic_right: string
  proprioception_pelvic_left: string
  proprioception_pelvic_right: string
  menace_left: string
  menace_right: string
  plr_left: string
  plr_right: string
  nystagmus: string
  strabismus: string
  cn_facial_sensation: string
  cn_swallowing: string
  reflex_patellar_left: string
  reflex_patellar_right: string
  reflex_withdrawal_left_thoracic: string
  reflex_withdrawal_right_thoracic: string
  reflex_panniculus: string
  deep_pain: string
  pain_cervical: string
  pain_thoracolumbar: string
  pain_lumbosacral: string
  [key: string]: string
}

export interface CaseBundle {
  patient: PatientProfile
  history: ClinicalHistory
  neuroExam: NeuroExamFindings
  meta: {
    createdAt: string
    version: string
  }
}

export interface NormalizedFindings {
  mentation: 'normal' | 'depressed' | 'stupor' | 'coma'
  gaitThoracic: 'normal' | 'ataxia' | 'paresis' | 'plegia'
  gaitPelvic: 'normal' | 'ataxia' | 'paresis' | 'plegia'
  patellarLeft: 'normal' | 'increased' | 'decreased' | 'absent'
  patellarRight: 'normal' | 'increased' | 'decreased' | 'absent'
  deepPain: 'present' | 'absent' | 'equivocal'
  spinalPainCervical: 'none' | 'mild' | 'moderate' | 'severe'
  spinalPainThoracolumbar: 'none' | 'mild' | 'moderate' | 'severe'
  spinalPainLumbosacral: 'none' | 'mild' | 'moderate' | 'severe'

  headTilt: boolean
  nystagmusPresent: boolean
  multiCranialDeficits: boolean
  all4PosturalsAffected: boolean
  pelvicOnlyDeficit: boolean
  thoracicAndPelvicDeficit: boolean
  asymmetricPosturals: boolean
  umnPattern: boolean
  lmnPattern: boolean
  spinalPainPresent: boolean
}
