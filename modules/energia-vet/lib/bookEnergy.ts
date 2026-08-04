import type { Species } from '../types'

export const BOOK_ENERGY_RULE_SET_VERSION = 'vetius-books-energy-2026.08'

/** RER canônico dos livros de referência (Kleiber / Applied Vet Clinical Nutrition, cap. 3). */
export const BOOK_RER_CONSTANT = 70
export const BOOK_RER_EXPONENT = 0.75

export interface BookDirectMerFormula {
  k: number
  exponent: number
  label: string
}

export interface BookEnergyProfile {
  id: string
  species: Species
  label: string
  group: 'Crescimento' | 'Adulto' | 'Atividade' | 'Reprodução' | 'NRC direto' | 'Clínico'
  description: string
  factor?: number
  factorRange?: [number, number]
  directMer?: BookDirectMerFormula
  requiresLitterSize?: boolean
  requiresLactationWeek?: boolean
  sourcePages: number[]
}

export function calculateBookRER(weightKg: number): number {
  if (weightKg <= 0) return 0
  return BOOK_RER_CONSTANT * Math.pow(weightKg, BOOK_RER_EXPONENT)
}

export function getBookRERFormula(weightKg: number): string {
  const pow = Math.pow(Math.max(0.01, weightKg), BOOK_RER_EXPONENT).toFixed(2)
  const rer = calculateBookRER(weightKg).toFixed(0)
  return `RER = ${BOOK_RER_CONSTANT} × (${weightKg.toFixed(2)} kg)^${BOOK_RER_EXPONENT}\nRER = ${BOOK_RER_CONSTANT} × ${pow}\nRER = ${rer} kcal/dia`
}

export const BOOK_ENERGY_PROFILES: BookEnergyProfile[] = [
  { id: 'dog_puppy_0_4', species: 'dog', label: 'Filhote até 4 meses', group: 'Crescimento', description: 'Crescimento inicial, com acompanhamento frequente do ECC.', factor: 3, sourcePages: [74, 75] },
  { id: 'dog_puppy_4_adult', species: 'dog', label: 'Filhote após 4 meses', group: 'Crescimento', description: 'Crescimento até atingir o porte adulto.', factor: 2, sourcePages: [74, 75] },
  { id: 'dog_adult_neutered', species: 'dog', label: 'Adulto castrado', group: 'Adulto', description: 'Manutenção de cão adulto castrado.', factor: 1.6, sourcePages: [74] },
  { id: 'dog_adult_intact', species: 'dog', label: 'Adulto não castrado', group: 'Adulto', description: 'Manutenção de cão adulto não castrado.', factor: 1.8, sourcePages: [74] },
  { id: 'dog_adult_inactive', species: 'dog', label: 'Baixa atividade / obesidade', group: 'Adulto', description: 'Sedentário ou predisposto ao ganho — 1,2–1,4 × RER.', factor: 1.3, factorRange: [1.2, 1.4], sourcePages: [74] },
  { id: 'dog_senior', species: 'dog', label: 'Sênior', group: 'Adulto', description: 'Gatos e cães idosos — ajustar por ECC e massa muscular.', factor: 1.25, factorRange: [1.1, 1.4], sourcePages: [74] },
  { id: 'dog_work_light', species: 'dog', label: 'Trabalho leve', group: 'Atividade', description: 'Atividade física leve e regular.', factor: 1.8, factorRange: [1.6, 2], sourcePages: [74] },
  { id: 'dog_work_moderate', species: 'dog', label: 'Trabalho moderado', group: 'Atividade', description: 'Trabalho ou exercício com demanda intermediária.', factor: 3.5, factorRange: [2, 5], sourcePages: [74] },
  { id: 'dog_work_heavy', species: 'dog', label: 'Trabalho intenso', group: 'Atividade', description: 'Atividade intensa; exige reavaliação individual.', factor: 8, factorRange: [5, 11], sourcePages: [74] },
  { id: 'dog_gestation', species: 'dog', label: 'Gestação - terço final', group: 'Reprodução', description: 'Primeiros dois terços usam manutenção; o terço final aumenta a demanda.', factor: 3, sourcePages: [74, 79] },
  { id: 'dog_lactation', species: 'dog', label: 'Lactação', group: 'Reprodução', description: 'Demanda definida pelo número de filhotes.', requiresLitterSize: true, sourcePages: [75, 80] },

  { id: 'cat_kitten', species: 'cat', label: 'Filhote', group: 'Crescimento', description: 'Crescimento felino, com controle após a castração.', factor: 2.5, sourcePages: [74] },
  { id: 'cat_adult_neutered', species: 'cat', label: 'Adulto castrado', group: 'Adulto', description: 'Manutenção de gato adulto castrado.', factor: 1.3, factorRange: [1.2, 1.4], sourcePages: [74] },
  { id: 'cat_adult_intact', species: 'cat', label: 'Adulto não castrado', group: 'Adulto', description: 'Manutenção de gato adulto não castrado.', factor: 1.5, factorRange: [1.4, 1.6], sourcePages: [74] },
  { id: 'cat_adult_inactive', species: 'cat', label: 'Indoor / baixa demanda', group: 'Adulto', description: 'Indoor ou baixa atividade — 1,0 × RER (manutenção).', factor: 1, sourcePages: [74] },
  { id: 'cat_senior', species: 'cat', label: 'Sênior', group: 'Adulto', description: 'Gato sênior — reavaliar ECC e massa muscular; 1,1–1,4 × RER.', factor: 1.25, factorRange: [1.1, 1.4], sourcePages: [74] },
  { id: 'cat_elderly', species: 'cat', label: 'Idoso', group: 'Adulto', description: 'Gato idoso — faixa 1,1–1,6 × RER conforme condição.', factor: 1.35, factorRange: [1.1, 1.6], sourcePages: [74] },
  { id: 'cat_gestation', species: 'cat', label: 'Gestação', group: 'Reprodução', description: 'Aumento progressivo da energia durante a gestação.', factor: 1.6, sourcePages: [74, 79] },
  { id: 'cat_lactation', species: 'cat', label: 'Lactação', group: 'Reprodução', description: 'Demanda definida pela semana e pelo número de filhotes.', requiresLitterSize: true, requiresLactationWeek: true, sourcePages: [74, 80] },

  { id: 'dog_nrc_active_pet', species: 'dog', label: 'Pet ativo (NRC)', group: 'NRC direto', description: 'MER = 130 × kg^0,75 — Tabela 3.1, cães ativos em casa ou canil.', directMer: { k: 130, exponent: 0.75, label: '130 × kg^0,75' }, sourcePages: [71, 73] },
  { id: 'dog_nrc_young_active', species: 'dog', label: 'Adulto jovem ativo (NRC)', group: 'NRC direto', description: 'MER = 140 × kg^0,75 — Tabela 3.1.', directMer: { k: 140, exponent: 0.75, label: '140 × kg^0,75' }, sourcePages: [71, 73] },
  { id: 'dog_nrc_inactive', species: 'dog', label: 'Inativo (NRC)', group: 'NRC direto', description: 'MER = 95 × kg^0,75 — Tabela 3.1, cães sedentários.', directMer: { k: 95, exponent: 0.75, label: '95 × kg^0,75' }, sourcePages: [71, 73] },
  { id: 'dog_nrc_senior_active', species: 'dog', label: 'Idoso ativo (NRC)', group: 'NRC direto', description: 'MER = 105 × kg^0,75 — Tabela 3.1.', directMer: { k: 105, exponent: 0.75, label: '105 × kg^0,75' }, sourcePages: [71, 73] },

  { id: 'cat_nrc_lean', species: 'cat', label: 'Magro (NRC)', group: 'NRC direto', description: 'MER = 100 × kg^0,67 — Tabela 3.2, gatos magros.', directMer: { k: 100, exponent: 0.67, label: '100 × kg^0,67' }, sourcePages: [73] },
  { id: 'cat_nrc_overweight', species: 'cat', label: 'Sobrepeso (NRC)', group: 'NRC direto', description: 'MER = 130 × kg^0,40 — Tabela 3.2, gatos com excesso de peso.', directMer: { k: 130, exponent: 0.40, label: '130 × kg^0,40' }, sourcePages: [73] },

  { id: 'dog_weight_loss', species: 'dog', label: 'Perda de peso', group: 'Clínico', description: 'Plano de emagrecimento — 1,0 × RER no peso-alvo (Box 3.1; cap. 9).', factor: 1, sourcePages: [74, 172] },
  { id: 'dog_weight_gain', species: 'dog', label: 'Recuperação de peso', group: 'Clínico', description: 'Recuperação ponderal — 1,2 × RER (Box 3.1).', factor: 1.2, factorRange: [1.2, 1.8], sourcePages: [74] },
  { id: 'dog_critical_care', species: 'dog', label: 'Cuidados críticos', group: 'Clínico', description: 'Hospitalizado — iniciar no RER; ajustar por tolerância (Box 3.1; Nutritional Management cap. 2).', factor: 1, sourcePages: [74, 23] },
  { id: 'cat_weight_loss', species: 'cat', label: 'Perda de peso', group: 'Clínico', description: 'Plano de emagrecimento — 0,8 × RER no peso-alvo (Box 3.1; cap. 9).', factor: 0.8, sourcePages: [74, 172] },
  { id: 'cat_weight_gain', species: 'cat', label: 'Recuperação de peso', group: 'Clínico', description: 'Recuperação ponderal — 1,2–1,8 × RER (Box 3.1).', factor: 1.5, factorRange: [1.2, 1.8], sourcePages: [74] },
  { id: 'cat_critical_care', species: 'cat', label: 'Cuidados críticos', group: 'Clínico', description: 'Hospitalizado — iniciar no RER; ajustar por tolerância (Box 3.1; Nutritional Management cap. 2).', factor: 1, sourcePages: [74, 23] },
]

const SELECTABLE_PROFILE_GROUPS = new Set<BookEnergyProfile['group']>(['Crescimento', 'Adulto', 'Atividade', 'Reprodução'])

/** Perfis exibidos na etapa Energia — sem NRC direto nem Clínico (meta ECC trata perda/ganho). */
export function getSelectableBookEnergyProfiles(species: Species) {
  return BOOK_ENERGY_PROFILES.filter(
    (profile) => profile.species === species && SELECTABLE_PROFILE_GROUPS.has(profile.group),
  )
}

export function getBookEnergyProfiles(species: Species) {
  return BOOK_ENERGY_PROFILES.filter((profile) => profile.species === species)
}

export function getBookEnergyProfileById(id: string) {
  return BOOK_ENERGY_PROFILES.find((profile) => profile.id === id)
}

/** Energia de manutenção no peso atual, conforme perfil energético escolhido. */
export function calculateMaintenanceEnergyFromProfile(options: {
  weightKg: number
  profileId: string
  litterSize?: number
  lactationWeek?: number
}) {
  const profile = getBookEnergyProfileById(options.profileId)
  if (!profile || options.weightKg <= 0) return 0
  return calculateBookProfileEnergy({
    weightKg: options.weightKg,
    profile,
    litterSize: options.litterSize,
    lactationWeek: options.lactationWeek,
  }).kcal
}

/** Meta energética a partir do ECC — peso-alvo + fator clínico no RER do peso-alvo. */
export function calculateEnergyGoalFromBcs(options: {
  species: Species
  currentWeightKg: number
  targetWeightKg: number
  goal: 'maintenance' | 'weight_loss' | 'weight_gain'
  maintenanceEnergyKcal: number
}) {
  if (options.goal === 'maintenance') return options.maintenanceEnergyKcal
  const targetRer = calculateBookRER(Math.max(0.1, options.targetWeightKg))
  if (options.goal === 'weight_loss') {
    return targetRer * (options.species === 'cat' ? 0.8 : 1)
  }
  return targetRer * (options.species === 'cat' ? 1.2 : 1.2)
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
    if (options.ageMonths >= 84) return 'dog_senior'
    return options.isNeutered ? 'dog_adult_neutered' : 'dog_adult_intact'
  }
  if (options.ageMonths > 0 && options.ageMonths < 12) return 'cat_kitten'
  if (options.isIndoor) return 'cat_adult_inactive'
  if (options.ageMonths >= 120) return 'cat_elderly'
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
  weightKg: number
  profile: BookEnergyProfile
  litterSize?: number
  lactationWeek?: number
  rer?: number
}) {
  const rer = options.rer ?? calculateBookRER(options.weightKg)
  const weightKg = Math.max(0.01, options.weightKg)

  if (options.profile.directMer) {
    const { k, exponent } = options.profile.directMer
    const kcal = k * Math.pow(weightKg, exponent)
    return {
      factor: kcal / rer,
      kcal,
      rer,
      formula: `MER = ${k} × ${weightKg.toFixed(2)}^${exponent} = ${kcal.toFixed(0)} kcal/dia`,
    }
  }

  const factor = options.profile.id === 'dog_lactation'
    ? dogLactationFactor(options.litterSize ?? 1)
    : options.profile.id === 'cat_lactation'
      ? catLactationFactor(options.litterSize ?? 1, options.lactationWeek ?? 1)
      : options.profile.factor ?? 1
  const kcal = rer * factor
  return {
    factor,
    kcal,
    rer,
    formula: `RER ${rer.toFixed(0)} kcal/dia × ${factor.toFixed(2)} = ${kcal.toFixed(0)} kcal/dia`,
  }
}

export const BOOK_ENERGY_SOURCE = {
  title: 'Applied Veterinary Clinical Nutrition, 2nd Edition',
  chapter: 'Capítulo 3 - Determining Energy Requirements',
  pages: '70-83',
  note: 'RER = 70 × kg^0,75 (Kleiber) para cães e gatos. Perda e ganho de peso são definidos na etapa Meta corporal (ECC), não nesta seleção de perfil fisiológico.',
}
