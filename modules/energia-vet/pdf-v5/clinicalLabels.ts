import type { MuscleCondition } from '../types'

export function speciesLabel(species?: string): string {
  if (species === 'dog') return 'Cão'
  if (species === 'cat') return 'Gato'
  return 'Não informado'
}

export function sexLabel(sex?: string): string {
  if (sex === 'male') return 'Macho'
  if (sex === 'female') return 'Fêmea'
  return 'Não informado'
}

export function neuterLabel(isNeutered?: boolean): string {
  if (isNeutered == null) return 'Não informado'
  return isNeutered ? 'Castrado' : 'Não castrado'
}

export function muscleConditionLabel(value?: MuscleCondition): string {
  const map: Record<MuscleCondition, string> = {
    normal: 'Normal',
    mild_loss: 'Perda leve',
    moderate_loss: 'Perda moderada',
    severe_loss: 'Perda acentuada',
  }
  if (!value) return 'Não informado'
  return map[value] ?? 'Não informado'
}

export function goalTitle(goal?: string): string {
  if (goal === 'weight_loss') return 'Redução de peso'
  if (goal === 'weight_gain') return 'Recuperação de peso'
  return 'Manutenção do peso e da condição corporal'
}

export function goalDetail(goal?: string, species?: string): string {
  if (goal === 'weight_loss') {
    return 'Objetivo: promover redução gradual de peso, preservando a massa muscular.'
  }
  if (goal === 'weight_gain') {
    return 'Objetivo: recuperar condição corporal com ganho ponderal controlado.'
  }
  if ((species === 'dog' || species === 'cat') && goal === 'maintenance') {
    return 'Objetivo: manter peso e condição corporal atuais com dieta equilibrada.'
  }
  return 'Objetivo: manter aporte nutricional adequado ao paciente.'
}

export function confidenceLabel(confidence?: string): string {
  const map: Record<string, string> = {
    patient_calibrated: 'Calibrado pela ingestão observada',
    high: 'Alta',
    moderate: 'Moderada',
    low: 'Baixa',
  }
  if (!confidence) return 'Não informado'
  return map[confidence] ?? 'Moderada'
}

export function weightBasisLabel(basis?: string): string {
  const map: Record<string, string> = {
    current_weight: 'Peso atual',
    ideal_weight: 'Peso ideal',
    expected_adult_weight: 'Peso adulto esperado',
    clinician_defined: 'Peso definido pelo médico-veterinário',
  }
  if (!basis) return 'Peso atual'
  return map[basis] ?? 'Peso atual'
}

export function adequacyStatusLabel(status: string): string {
  const map: Record<string, string> = {
    adequate: 'Adequado',
    below: 'Abaixo da meta',
    above: 'Acima da faixa',
    insufficient_data: 'Dados insuficientes',
    manual: 'Revisão manual',
  }
  return map[status] ?? 'Não aplicável'
}

export function therapeuticStatusLabel(status: string): string {
  if (status === 'adequate') return 'Adequado'
  if (status === 'caution') return 'Atenção'
  if (status === 'insufficient_data') return 'Dados insuficientes'
  return 'Não aplicável'
}

export const CLINICAL_REFERENCES = [
  'FEDIAF Nutritional Guidelines, 2025.',
  'NRC. Nutrient Requirements of Dogs and Cats, 2006.',
  'Fascetti AJ et al. Applied Veterinary Clinical Nutrition, 2ª ed., 2024.',
  'Chan DL. Nutritional Management of Hospitalized Small Animals, 2015.',
  'WSAVA Global Nutrition Guidelines.',
  'AAHA Nutrition and Weight Management Guidelines, 2021.',
]

export const FORBIDDEN_DEV_TERMS = [
  'feature flag',
  'feature',
  'legacy',
  'migration',
  'supabase',
  'localstorage',
  'snapshot',
  'engineversion',
  'formulaid',
  'sourceid',
  'debug',
  'staging',
  'nutrition-calc',
  'nutrition-pdf',
  'clinicalrulesetversion',
  'placeholder',
  ' todo',
  'motor v3',
  'engine v3',
]
