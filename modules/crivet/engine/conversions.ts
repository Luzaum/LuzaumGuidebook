export type DoseUnit = 'mcg/kg/min' | 'mcg/kg/h' | 'mg/kg/min' | 'mg/kg/h' | 'U/kg/h' | 'U/kg/min'

/**
 * Função universal de conversão de unidades de dose.
 * Converte qualquer unidade para qualquer outra unidade usando mg/kg/h como base interna.
 */
export function convertDose(value: number, from: DoseUnit, to: DoseUnit): number {
  // Se já está na unidade desejada, retorna o valor
  if (from === to) return value

  // Unidades (U) não se convertem para mg/mcg - são sistemas diferentes
  const isUnitFrom = from.startsWith('U/')
  const isUnitTo = to.startsWith('U/')
  
  // Se ambos são unidades, converter apenas entre /h e /min
  if (isUnitFrom && isUnitTo) {
    const fromPerMin = from.endsWith('/min')
    const toPerMin = to.endsWith('/min')
    
    if (fromPerMin && !toPerMin) {
      // U/kg/min -> U/kg/h
      return value * 60
    } else if (!fromPerMin && toPerMin) {
      // U/kg/h -> U/kg/min
      return value / 60
    }
    return value
  }
  
  // Se tentar converter entre unidades e mg/mcg, não é possível
  // Retornar o valor original com warning (pode ser melhorado depois)
  if (isUnitFrom || isUnitTo) {
    console.warn(`Conversão entre unidades (U) e mg/mcg não é suportada. Mantendo valor original: ${value}`)
    return value
  }

  // Conversão normal entre mg/mcg
  // 1) Transformar em mg/kg/h (base interna)
  let mgPerKgPerH: number

  const isMcg = from.startsWith('mcg')
  const perMin = from.endsWith('/min')

  let mgValue = isMcg ? value / 1000 : value // mcg -> mg
  mgPerKgPerH = perMin ? mgValue * 60 : mgValue // /min -> /h

  // 2) Converter da base para o destino
  const toPerMin = to.endsWith('/min')
  const toMcg = to.startsWith('mcg')

  let out = toPerMin ? mgPerKgPerH / 60 : mgPerKgPerH // /h -> /min
  out = toMcg ? out * 1000 : out // mg -> mcg

  return out
}

// Funções de normalização mantidas para compatibilidade (usam convertDose internamente)
export function normalizeDoseToMcgKgMin(dose: number, unit: DoseUnit): number {
  return convertDose(dose, unit, 'mcg/kg/min')
}

export function normalizeDoseToMgKgH(dose: number, unit: DoseUnit): number {
  return convertDose(dose, unit, 'mg/kg/h')
}

export function normalizeConcentration(concMgMl: number) {
  return {
    mgMl: concMgMl,
    mcgMl: concMgMl * 1000,
  }
}
