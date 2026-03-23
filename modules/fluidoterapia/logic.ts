export type Species = 'cao' | 'gato'
export type PhysState = 'adulto' | 'filhote' | 'idoso' | 'gestante' | 'obeso'
export type MaintenanceMethodId =
  | 'aaha-caes'
  | 'aaha-gatos'
  | 'aaha-allometric'
  | 'aaha-linear'
  | 'custom'
  | 'aaha-pediatric'

export const DROPS_PER_ML_MACRO = 20
export const SECONDS_PER_HOUR = 3600

export const RANGE_BY_STATE: Record<PhysState, { min: number; max: number; hint: string }> = {
  adulto: { min: 40, max: 60, hint: 'Faixa prática mais usada na rotina clínica.' },
  filhote: { min: 80, max: 120, hint: 'Filhotes exigem manutenção maior e reavaliação mais próxima.' },
  idoso: { min: 30, max: 50, hint: 'Pacientes idosos tendem a tolerar pior excesso de volume.' },
  gestante: { min: 60, max: 90, hint: 'Gestação e lactação elevam a demanda hídrica.' },
  obeso: { min: 30, max: 50, hint: 'Evite superestimar dose diária usando taxas agressivas.' },
}

export function formatNumber(value: number, digits = 1) {
  if (!Number.isFinite(value)) {
    return '--'
  }

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)
}

export function calculateRateMetrics(rateMlHr: number) {
  return {
    macroDropsPerSecond: (rateMlHr / SECONDS_PER_HOUR) * DROPS_PER_ML_MACRO,
    microDropsPerMinute: rateMlHr,
  }
}

export function resolveAdultMaintenanceBases(
  species: Species | null,
  weight: number,
  customRate: number,
) {
  if (!species || !Number.isFinite(weight) || weight <= 0 || !Number.isFinite(customRate)) {
    return {
      'aaha-weight': 0,
      'aaha-allometric': 0,
      'aaha-linear': 0,
      custom: 0,
    }
  }

  return {
    'aaha-caes': weight * 60,
    'aaha-gatos': weight * 40,
    'aaha-allometric': (species === 'cao' ? 132 : 80) * weight ** 0.75,
    'aaha-linear': 30 * weight + 70,
    custom: weight * customRate,
  }
}

export function resolveMaintenanceMethods({
  species,
  weight,
  customRate,
  state,
  pediatricBase,
}: {
  species: Species | null
  weight: number
  customRate: number
  state: PhysState
  pediatricBase: 'aaha-weight' | 'aaha-allometric' | 'aaha-linear' | 'custom'
}) {
  const range = RANGE_BY_STATE[state]
  const bases = resolveAdultMaintenanceBases(species, weight, customRate)

  const methods: Array<{
    id: MaintenanceMethodId
    title: string
    source: string
    formula: string
    daily: number
    note: string
  }> = [
    {
      id: 'aaha-caes',
      title: 'AAHA Cães',
      source: 'Diretriz AAHA',
      formula: '60 mL/kg/dia',
      daily: bases['aaha-caes'],
      note: 'Taxa empírica clássica para caninos.',
    },
    {
      id: 'aaha-gatos',
      title: 'AAHA Gatos',
      source: 'Diretriz AAHA',
      formula: '40 mL/kg/dia',
      daily: bases['aaha-gatos'],
      note: 'Taxa empírica ajustada para felinos (prevenção de sobrecarga).',
    },
    {
      id: 'aaha-allometric',
      title: 'Alométrico',
      source: 'Diretriz AAHA',
      formula: species === 'cao' ? '132 x kg^0,75' : '80 x kg^0,75',
      daily: bases['aaha-allometric'],
      note: 'Serve bem como comparação metabólica com o método direto por kg.',
    },
    {
      id: 'aaha-linear',
      title: 'Linear',
      source: 'Diretriz AAHA',
      formula: '30 x kg + 70',
      daily: bases['aaha-linear'],
      note: 'Método linear clássico e fácil de auditar.',
    },
    {
      id: 'custom',
      title: 'Faixa clínica ajustável',
      source: 'Ajuste clínico',
      formula: `${customRate} mL/kg/dia`,
      daily: bases.custom,
      note: range.hint,
    },
  ]

  if (state === 'filhote') {
    methods.splice(3, 0, {
      id: 'aaha-pediatric',
      title: 'Pediátrico AAHA',
      source: 'Diretriz AAHA',
      formula: `${species === 'cao' ? '3' : '2,5'} x dose adulta`,
      daily: bases[pediatricBase] * (species === 'cao' ? 3 : 2.5),
      note: 'O app deixa explícita a base adulta usada antes do multiplicador pediátrico.',
    })
  }

  return methods
}
