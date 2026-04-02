import type { BCS, PhysiologicState, Species } from '../types'
import { getEnergyRule } from './genutriData'
import {
  computeFediafEnergy,
  FEDIAF_PHYSIOLOGIC_STATES,
  getDefaultFediafStateId,
  getFediafPhysiologicStateById,
  getFediafPhysiologicStates,
  resolveCatAdultState,
  resolveDogAdultStateFromActivity,
  resolveDogGrowthStateFromAge,
} from './fediaf'

export function calculateRER(weightKg: number, species: Species): number {
  const rule = getEnergyRule(species)
  return rule.constant * Math.pow(weightKg, rule.exponent)
}

export function getRERFormula(weightKg: number, species: Species): string {
  const rule = getEnergyRule(species)
  const pow = Math.pow(weightKg, rule.exponent).toFixed(2)
  const rer = calculateRER(weightKg, species).toFixed(0)
  return `RER = ${rule.constant} × (${weightKg} kg)^${rule.exponent}\nRER = ${rule.constant} × ${pow}\nRER = ${rer} kcal/dia`
}

export function calculateMER(rer: number, factor: number): number {
  return rer * factor
}

export const DOG_PHYSIOLOGIC_STATES: PhysiologicState[] = FEDIAF_PHYSIOLOGIC_STATES.filter((state) => state.species === 'dog')
export const CAT_PHYSIOLOGIC_STATES: PhysiologicState[] = FEDIAF_PHYSIOLOGIC_STATES.filter((state) => state.species === 'cat')

export function getPhysiologicStates(species: Species): PhysiologicState[] {
  return getFediafPhysiologicStates(species)
}

export function getPhysiologicStateById(id: string): PhysiologicState | undefined {
  return getFediafPhysiologicStateById(id)
}

export function getDefaultStateId(species: Species, isNeutered: boolean): string {
  return getDefaultFediafStateId(species, isNeutered)
}

export function computePhysiologicEnergy(options: {
  species: Species
  stateId: string
  weightKg: number
  ageWeeks?: number
  expectedAdultWeightKg?: number
  activityHoursPerDay?: number
  activityImpact?: 'low' | 'high'
  obesityProne?: boolean
  litterSize?: number
  lactationWeek?: number
  specialBreedObservation?: 'none' | 'great_dane' | 'newfoundland'
}) {
  return computeFediafEnergy(options)
}

export { resolveDogAdultStateFromActivity, resolveDogGrowthStateFromAge, resolveCatAdultState }

export function calculateIdealWeightCustom(currentWeight: number, bcs: BCS, goal: 'weight_loss' | 'weight_gain'): number {
  if (goal === 'weight_loss') {
    if (bcs === 6) return currentWeight * 0.85
    if (bcs === 7) return currentWeight * 0.8
    if (bcs === 8) return currentWeight * 0.7
    if (bcs === 9) return currentWeight * 0.6
  }

  if (goal === 'weight_gain') {
    if (bcs === 4) return currentWeight * 1.15
    if (bcs === 3) return currentWeight * 1.2
    if (bcs === 2) return currentWeight * 1.3
    if (bcs === 1) return currentWeight * 1.4
  }

  return currentWeight
}

export function getWeightLossPercent(bcs: BCS): number | null {
  const map: Record<number, number> = { 6: 15, 7: 20, 8: 30, 9: 40 }
  return map[bcs] ?? null
}

export function getWeightGainPercent(bcs: BCS): number | null {
  const map: Record<number, number> = { 4: 15, 3: 20, 2: 30, 1: 40 }
  return map[bcs] ?? null
}

export function getBCSDescription(bcs: BCS): { label: string; color: string; detail: string } {
  if (bcs <= 3) {
    return {
      label: 'Abaixo do ideal',
      color: 'blue',
      detail: bcs === 1 ? 'Caquexia grave' : bcs === 2 ? 'Muito abaixo do peso' : 'Abaixo do peso',
    }
  }
  if (bcs <= 5) {
    return { label: 'Peso ideal', color: 'green', detail: bcs === 4 ? 'Levemente abaixo do ideal' : 'Peso corporal ideal' }
  }
  if (bcs === 6) {
    return { label: 'Levemente acima do ideal', color: 'yellow', detail: 'Sobrepeso leve' }
  }
  if (bcs === 7) {
    return { label: 'Sobrepeso', color: 'orange', detail: 'Sobrepeso moderado' }
  }
  return { label: 'Obeso', color: 'red', detail: bcs === 8 ? 'Obeso' : 'Obeso grave' }
}

export function calculateRefeedingRisk(
  daysAnorexic: number,
  daysHyporexic: number,
  recentIntakePercent: number,
  bcs: BCS,
  electrolytesLow: boolean,
): 'low' | 'moderate' | 'high' {
  if (electrolytesLow || daysAnorexic >= 5 || (daysAnorexic >= 3 && bcs <= 3)) {
    return 'high'
  }
  if (daysAnorexic >= 3 || daysHyporexic >= 5 || recentIntakePercent <= 25) {
    return 'moderate'
  }
  return 'low'
}

export function getProgressionPlan3Days(rer: number): { day: number; percent: number; kcal: number }[] {
  return [
    { day: 1, percent: 33, kcal: rer * 0.33 },
    { day: 2, percent: 66, kcal: rer * 0.66 },
    { day: 3, percent: 100, kcal: rer },
  ]
}

export function getProgressionPlan4Days(rer: number): { day: number; percent: number; kcal: number }[] {
  return [
    { day: 1, percent: 25, kcal: rer * 0.25 },
    { day: 2, percent: 50, kcal: rer * 0.5 },
    { day: 3, percent: 75, kcal: rer * 0.75 },
    { day: 4, percent: 100, kcal: rer },
  ]
}

export const MEALS_OPTIONS = [2, 3, 4, 5, 6]

export const CLINICAL_ENERGY_DISCLAIMER =
  'As estimativas energéticas e nutricionais são ponto de partida. Ajuste conforme evolução clínica, ECC, condição muscular, ingestão real e tolerância do paciente.'

export interface CommercialFoodEntry {
  id: string
  manufacturer: string
  brand: string
  name: string
  species: Species | 'both'
  type: 'seca' | 'úmida' | 'mista'
  lifeStage: 'filhote' | 'adulto' | 'sênior' | 'todos'
  kcalPer100g: number
  crudeProtein: number
  crudeFat: number
  moisture: number
}

export const COMMERCIAL_FOODS: CommercialFoodEntry[] = [
  {
    id: 'rc-medium-adult',
    manufacturer: 'Royal Canin',
    brand: 'Size Health Nutrition',
    name: 'Medium Adult',
    species: 'dog',
    type: 'seca',
    lifeStage: 'adulto',
    kcalPer100g: 384,
    crudeProtein: 25,
    crudeFat: 14,
    moisture: 9,
  },
  {
    id: 'premier-ambientes-internos',
    manufacturer: 'Premier Pet',
    brand: 'Ambientes Internos',
    name: 'Cães Adultos Portes Pequenos - Frango e Arroz',
    species: 'dog',
    type: 'seca',
    lifeStage: 'adulto',
    kcalPer100g: 395,
    crudeProtein: 28,
    crudeFat: 18,
    moisture: 10,
  },
  {
    id: 'hills-sciet-diet-cat',
    manufacturer: 'Hills',
    brand: 'Science Diet',
    name: 'Gatos Adultos 1-6 Anos',
    species: 'cat',
    type: 'seca',
    lifeStage: 'adulto',
    kcalPer100g: 402,
    crudeProtein: 32,
    crudeFat: 20,
    moisture: 8,
  },
  {
    id: 'farmina-nd-grain-free',
    manufacturer: 'Farmina',
    brand: 'N&D Grain Free',
    name: 'Abóbora, Cordeiro e Mirtilo - Gatos Adultos',
    species: 'cat',
    type: 'seca',
    lifeStage: 'adulto',
    kcalPer100g: 412,
    crudeProtein: 42,
    crudeFat: 20,
    moisture: 8,
  },
]
