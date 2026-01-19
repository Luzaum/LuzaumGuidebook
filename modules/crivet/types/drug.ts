export type CompatibilitySeverity = 'info' | 'warning' | 'critical'

export type CompatibilityItem = {
  name: string // "Diazepam"
  severity: CompatibilitySeverity
  message: string // "NUNCA misturar..."
}

export type DiluentId = 'NaCl_09' | 'RL' | 'D5W'

export type DiluentCompatibility = {
  diluentId: DiluentId
  label: string // "Ringer Lactato"
  status: 'compatible' | 'avoid' | 'unknown'
  reason: string // explicação curta
}

export type DrugCompatibility = {
  diluents?: DiluentCompatibility[] // ✅ novo formato por diluente
  compatibleDiluent?: string[] // DEPRECATED - manter para compatibilidade
  compatibleMeds?: string[] // ["Fentanil", "Cetamina", ...]
  incompatibilities?: CompatibilityItem[] // items com severidade
  materialWarnings?: string[] // PVC, dead space, etc.
}

export type UnitHintLevel = 'info' | 'warning' | 'critical'

export type UnitHint = {
  level: UnitHintLevel
  message: string
}

export type DrugUnitRules = {
  allowedUnitsCRI?: readonly string[] // DEPRECATED - não usar mais
  allowedUnitsBolus?: readonly string[] // DEPRECATED - não usar mais
  preferredUnitCRI?: string // DEPRECATED - usar recommendedUnit
  preferredUnitBolus?: string // DEPRECATED - usar recommendedUnit
  disallow?: readonly string[] // DEPRECATED - não usar mais
  preferredDoseUnit?: string // DEPRECATED - usar recommendedUnit
  unitHints?: Record<string, UnitHint> // alertas por unidade (opcional)
}

export type UnitSafetyBlock = {
  drugId?: string // opcional se estiver dentro do objeto da droga
  block_if_unit: string[]
  message: string
}

export type IndicatedDose = {
  mode: 'CRI' | 'BOLUS'
  species: 'cao' | 'gato' | 'ambos'
  unit: 'mcg/kg/min' | 'mcg/kg/h' | 'mg/kg/min' | 'mg/kg/h' | 'U/kg/h' | 'U/kg/min' | 'mg/kg' | 'mcg/kg' | 'U/kg'
  range: { min: number; max: number }
  purpose: string // "Analgesia", "Anestesia (ventilado)", etc
  note?: string // opcional - deve incluir explicação fisiologia por trás da dose
  routine_default?: string // ex: "50 mcg/kg/min" - valor/faixa mais comum na rotina para pre-seleção visual
}
