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

export type IndicatedDose = {
  mode: 'CRI' | 'BOLUS'
  species: 'cao' | 'gato' | 'ambos'
  unit: 'mcg/kg/min' | 'mcg/kg/h' | 'mg/kg/min' | 'mg/kg/h'
  range: { min: number; max: number }
  purpose: string // "Analgesia", "Anestesia (ventilado)", etc
  note?: string // opcional
}
