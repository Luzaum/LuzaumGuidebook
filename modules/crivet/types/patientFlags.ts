export type PatientFlag =
  | 'neonato'
  | 'geriatrico'
  | 'hepatopata'
  | 'shunt'
  | 'renopata'
  | 'cardiopata_icc'
  | 'sepse'
  | 'endocrino_addison'
  | 'endocrino_diabetes'
  | 'tce_pic'
  | 'glaucoma'
  | 'convulsao_nao_controlada'

export type AlertLevel = 'info' | 'warning' | 'critical'

export type DrugPatientAlert = {
  id: string
  level: AlertLevel
  title: string // "Hepatopatia × Midazolam"
  short: string // curto, acionável (banner)
  why: string[] // bullets (modal)
  actions: string[] // bullets do que fazer (modal)
}

export type DrugRule = {
  drugId: string // "midazolam"
  when: PatientFlag[] // condições que disparam
  alert: Omit<DrugPatientAlert, 'id'>
}
