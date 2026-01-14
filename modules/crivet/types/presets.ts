export type Species = 'dog' | 'cat'
export type DoseMode = 'CRI' | 'BOLUS'

export type DoseUnit =
  | 'mcg/kg/min'
  | 'mg/kg/h'
  | 'mg/kg'
  | 'mcg/kg'
  | 'mcg/kg/h'
  | 'mg/kg/min'

export type Route = 'IV' | 'IM' | 'IO' | 'PO' | 'IN'

export type DosePreset = {
  id: string // "ketamine_cri_micro_low"
  label: string // "Microdose (LOW)"
  mode: DoseMode // "CRI" ou "BOLUS"
  species?: Species | 'both' // preset pode ser geral ou específico
  route?: Route // se bolus/IM etc.
  unit: DoseUnit // unidade que o seu input entende
  value: number // valor numérico do preset
  range?: { min: number; max: number } // se quiser mostrar faixa
  note?: string // tooltip do chip
  tags?: string[] // ["analgesia", "wind-up", "ICU"]
  // Ações extras opcionais ao aplicar preset (ex.: setar concentração alvo, modo volume mínimo)
  apply?: {
    setTargetConcentrationMgMl?: number // ex.: 1 ou 2 mg/mL
    setTargetConcentrationMcgMl?: number // ex.: 50 mcg/mL (remifentanil)
    preferMinimalVolume?: boolean
  }
}
