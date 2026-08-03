import type { Species } from '../types'

export const BOOK_ENERGY_RULE_SET_VERSION = 'vetius-books-energy-2026.08'

export interface BookEnergyProfile {
  id: string
  species: Species
  label: string
  group: 'Crescimento' | 'Adulto' | 'Atividade' | 'Reprodução'
  description: string
  factor?: number
  factorRange?: [number, number]
  requiresLitterSize?: boolean
  requiresLactationWeek?: boolean
  sourcePages: number[]
}

export const BOOK_ENERGY_PROFILES: BookEnergyProfile[] = [
  { id: 'dog_puppy_0_4', species: 'dog', label: 'Filhote até 4 meses', group: 'Crescimento', description: 'Crescimento inicial, com acompanhamento frequente do ECC.', factor: 3, sourcePages: [74, 75] },
  { id: 'dog_puppy_4_adult', species: 'dog', label: 'Filhote após 4 meses', group: 'Crescimento', description: 'Crescimento até atingir o porte adulto.', factor: 2, sourcePages: [74, 75] },
  { id: 'dog_adult_neutered', species: 'dog', label: 'Adulto castrado', group: 'Adulto', description: 'Manutenção de cão adulto castrado.', factor: 1.6, sourcePages: [74] },
  { id: 'dog_adult_intact', species: 'dog', label: 'Adulto não castrado', group: 'Adulto', description: 'Manutenção de cão adulto não castrado.', factor: 1.8, sourcePages: [74] },
  { id: 'dog_adult_inactive', species: 'dog', label: 'Baixa atividade', group: 'Adulto', description: 'Paciente inativo ou predisposto ao ganho de peso.', factor: 1.3, factorRange: [1.2, 1.4], sourcePages: [74] },
  { id: 'dog_work_light', species: 'dog', label: 'Trabalho leve', group: 'Atividade', description: 'Atividade física leve e regular.', factor: 1.8, factorRange: [1.6, 2], sourcePages: [74] },
  { id: 'dog_work_moderate', species: 'dog', label: 'Trabalho moderado', group: 'Atividade', description: 'Trabalho ou exercício com demanda intermediária.', factor: 3.5, factorRange: [2, 5], sourcePages: [74] },
  { id: 'dog_work_heavy', species: 'dog', label: 'Trabalho intenso', group: 'Atividade', description: 'Atividade intensa; exige reavaliação individual.', factor: 8, factorRange: [5, 11], sourcePages: [74] },
  { id: 'dog_gestation', species: 'dog', label: 'Gestação - terço final', group: 'Reprodução', description: 'Primeiros dois terços usam manutenção; o terço final aumenta a demanda.', factor: 3, sourcePages: [74, 79] },
  { id: 'dog_lactation', species: 'dog', label: 'Lactação', group: 'Reprodução', description: 'Demanda definida pelo número de filhotes.', requiresLitterSize: true, sourcePages: [75, 80] },

  { id: 'cat_kitten', species: 'cat', label: 'Filhote', group: 'Crescimento', description: 'Crescimento felino, com controle após a castração.', factor: 2.5, sourcePages: [74] },
  { id: 'cat_adult_neutered', species: 'cat', label: 'Adulto castrado', group: 'Adulto', description: 'Manutenção de gato adulto castrado.', factor: 1.3, factorRange: [1.2, 1.4], sourcePages: [74] },
  { id: 'cat_adult_intact', species: 'cat', label: 'Adulto não castrado', group: 'Adulto', description: 'Manutenção de gato adulto não castrado.', factor: 1.5, factorRange: [1.4, 1.6], sourcePages: [74] },
  { id: 'cat_adult_inactive', species: 'cat', label: 'Baixa atividade', group: 'Adulto', description: 'Paciente indoor, inativo ou predisposto ao ganho de peso.', factor: 1, sourcePages: [74] },
  { id: 'cat_senior', species: 'cat', label: 'Sênior', group: 'Adulto', description: 'Ponto de partida para gatos seniores, ajustado pela evolução.', factor: 1.25, factorRange: [1.1, 1.4], sourcePages: [74] },
  { id: 'cat_gestation', species: 'cat', label: 'Gestação', group: 'Reprodução', description: 'Aumento progressivo da energia durante a gestação.', factor: 1.6, sourcePages: [74, 79] },
  { id: 'cat_lactation', species: 'cat', label: 'Lactação', group: 'Reprodução', description: 'Demanda definida pela semana e pelo número de filhotes.', requiresLitterSize: true, requiresLactationWeek: true, sourcePages: [74, 80] },
]

export function getBookEnergyProfiles(species: Species) {
  return BOOK_ENERGY_PROFILES.filter((profile) => profile.species === species)
}

export function getDefaultBookEnergyProfile(options: {
  species: Species
  ageMonths: number
  isNeutered: boolean
  isIndoor?: boolean
}) {
  if (options.species === 'dog') {
    if (options.ageMonths > 0 && options.ageMonths <= 4) return 'dog_puppy_0_4'
    if (options.ageMonths > 4 && options.ageMonths < 12) return 'dog_puppy_4_adult'
    return options.isNeutered ? 'dog_adult_neutered' : 'dog_adult_intact'
  }
  if (options.ageMonths > 0 && options.ageMonths < 12) return 'cat_kitten'
  if (options.isIndoor) return 'cat_adult_inactive'
  if (options.ageMonths >= 96) return 'cat_senior'
  return options.isNeutered ? 'cat_adult_neutered' : 'cat_adult_intact'
}

function dogLactationFactor(litterSize: number) {
  if (litterSize <= 1) return 3
  if (litterSize === 2) return 3.5
  if (litterSize <= 4) return 4
  if (litterSize <= 6) return 5
  if (litterSize <= 8) return 5.5
  return 6
}

function catLactationFactor(litterSize: number, week: number) {
  const weeklyIncrease = week <= 2 ? 0.3 : week === 3 ? 0.45 : week === 4 ? 0.55 : week === 5 ? 0.65 : week === 6 ? 0.9 : 0.8
  return 1 + Math.max(1, litterSize) * weeklyIncrease
}

export function calculateBookProfileEnergy(options: {
  rer: number
  profile: BookEnergyProfile
  litterSize?: number
  lactationWeek?: number
}) {
  const factor = options.profile.id === 'dog_lactation'
    ? dogLactationFactor(options.litterSize ?? 1)
    : options.profile.id === 'cat_lactation'
      ? catLactationFactor(options.litterSize ?? 1, options.lactationWeek ?? 1)
      : options.profile.factor ?? 1
  return {
    factor,
    kcal: options.rer * factor,
    formula: `RER ${options.rer.toFixed(0)} kcal/dia × ${factor.toFixed(2)} = ${(options.rer * factor).toFixed(0)} kcal/dia`,
  }
}

export const BOOK_ENERGY_SOURCE = {
  title: 'Applied Veterinary Clinical Nutrition, 2nd Edition',
  chapter: 'Capítulo 3 - Determining Energy Requirements',
  pages: '70-83',
  note: 'As equações são estimativas iniciais e devem ser ajustadas conforme peso, ECC, ingestão e resposta clínica.',
}
