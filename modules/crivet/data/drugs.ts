import type { DrugCompatibility, DrugUnitRules, IndicatedDose } from '../types/drug'
import {
  defaultCompatibility,
  ketamineCompatibilityToDrugCompatibility,
  fentanylCompatibilityToDrugCompatibility,
  remifentanilCompatibilityToDrugCompatibility,
  dobutamineCompatibilityToDrugCompatibility,
} from './drugs/compatibility.helpers'
import { fentanylRecommendedUnit, fentanylRecommendedUnitWhy, fentanylIndicatedDoses } from './drugs/fentanyl'
import { ketamineIndicatedDoses, ketamineRecommendedUnit, ketamineRecommendedUnitWhy } from './drugs/ketamine'
import { midazolamIndicatedDoses } from './drugs/midazolam'
import { remifentanilIndicatedDoses } from './drugs/remifentanil'
import { dobutamineRecommendedUnit, dobutamineRecommendedUnitWhy, dobutamineIndicatedDoses } from './drugs/dobutamine'
import { norepinephrineRecommendedUnit, norepinephrineRecommendedUnitWhy, norepinephrineIndicatedDoses } from './drugs/norepinephrine'
import { norepinephrineCompatibilityToDrugCompatibility } from './drugs/compatibility.helpers'

export type DrugCategory =
  | 'Analgésicos e Anestésicos'
  | 'Agentes Cardiovasculares'
  | 'Antimicrobianos'
  | 'Bloqueadores Neuromusculares'
  | 'Infusões Combinadas'
  | 'Endócrino'
  | 'Antieméticos / Pró-cinéticos'

export interface Drug {
  id: string
  name: string
  category: DrugCategory
  hasCRI: boolean
  concentrations: number[]
  defaultUnit?: string
  compatibility: DrugCompatibility // ✅ obrigatória
  unitRules?: DrugUnitRules // DEPRECATED - usar recommendedUnit
  recommendedUnit?: string // unidade recomendada (ex: "mcg/kg/h")
  recommendedUnitWhy?: string[] // razões para usar a unidade recomendada
  indicatedDoses?: IndicatedDose[] // faixas de dose indicadas por modo, espécie e finalidade
}

export const drugs: Drug[] = [
  // Analgésicos e Anestésicos
  {
    id: 'lidocaina',
    name: 'Lidocaína',
    category: 'Analgésicos e Anestésicos',
    hasCRI: true,
    concentrations: [20],
    compatibility: defaultCompatibility,
  },
  {
    id: 'fentanil',
    name: 'Fentanil (citrato)',
    category: 'Analgésicos e Anestésicos',
    hasCRI: true,
    concentrations: [0.05],
    compatibility: fentanylCompatibilityToDrugCompatibility(),
    recommendedUnit: fentanylRecommendedUnit,
    recommendedUnitWhy: fentanylRecommendedUnitWhy,
    indicatedDoses: fentanylIndicatedDoses,
  },
  {
    id: 'remifentanil',
    name: 'Remifentanil',
    category: 'Analgésicos e Anestésicos',
    hasCRI: true,
    concentrations: [1],
    compatibility: remifentanilCompatibilityToDrugCompatibility(),
    indicatedDoses: remifentanilIndicatedDoses,
  },
  {
    id: 'morfina',
    name: 'Morfina',
    category: 'Analgésicos e Anestésicos',
    hasCRI: true,
    concentrations: [10, 1],
    compatibility: defaultCompatibility,
  },
  {
    id: 'metadona',
    name: 'Metadona',
    category: 'Analgésicos e Anestésicos',
    hasCRI: true,
    concentrations: [10],
    compatibility: defaultCompatibility,
  },
  {
    id: 'butorfanol',
    name: 'Butorfanol',
    category: 'Analgésicos e Anestésicos',
    hasCRI: true,
    concentrations: [10],
    compatibility: defaultCompatibility,
  },
  {
    id: 'cetamina',
    name: 'Cetamina',
    category: 'Analgésicos e Anestésicos',
    hasCRI: true,
    concentrations: [50, 100],
    compatibility: ketamineCompatibilityToDrugCompatibility(),
    recommendedUnit: ketamineRecommendedUnit,
    recommendedUnitWhy: ketamineRecommendedUnitWhy,
    indicatedDoses: ketamineIndicatedDoses,
  },
  {
    id: 'dexmedetomidina',
    name: 'Dexmedetomidina',
    category: 'Analgésicos e Anestésicos',
    hasCRI: true,
    concentrations: [0.5],
    compatibility: defaultCompatibility,
  },
  {
    id: 'propofol',
    name: 'Propofol',
    category: 'Analgésicos e Anestésicos',
    hasCRI: true,
    concentrations: [10],
    compatibility: defaultCompatibility,
  },

  // Agentes Cardiovasculares
  {
    id: 'dobutamina',
    name: 'Dobutamina',
    category: 'Agentes Cardiovasculares',
    hasCRI: true,
    concentrations: [12.5, 50],
    compatibility: dobutamineCompatibilityToDrugCompatibility(),
    recommendedUnit: dobutamineRecommendedUnit,
    recommendedUnitWhy: dobutamineRecommendedUnitWhy,
    indicatedDoses: dobutamineIndicatedDoses,
  },
  {
    id: 'dopamina',
    name: 'Dopamina',
    category: 'Agentes Cardiovasculares',
    hasCRI: true,
    concentrations: [5],
    compatibility: defaultCompatibility,
  },
  {
    id: 'efedrina',
    name: 'Efedrina',
    category: 'Agentes Cardiovasculares',
    hasCRI: true,
    concentrations: [50],
    compatibility: defaultCompatibility,
  },
  {
    id: 'norepinefrina',
    name: 'Norepinefrina',
    category: 'Agentes Cardiovasculares',
    hasCRI: true,
    concentrations: [1, 2],
    compatibility: norepinephrineCompatibilityToDrugCompatibility(),
    recommendedUnit: norepinephrineRecommendedUnit,
    recommendedUnitWhy: norepinephrineRecommendedUnitWhy,
    indicatedDoses: norepinephrineIndicatedDoses,
  },
  {
    id: 'nitroprussiato',
    name: 'Nitroprussiato',
    category: 'Agentes Cardiovasculares',
    hasCRI: true,
    concentrations: [25],
    compatibility: defaultCompatibility,
  },
  {
    id: 'diltiazem',
    name: 'Diltiazem',
    category: 'Agentes Cardiovasculares',
    hasCRI: true,
    concentrations: [5],
    compatibility: defaultCompatibility,
  },
  {
    id: 'esmolol',
    name: 'Esmolol',
    category: 'Agentes Cardiovasculares',
    hasCRI: true,
    concentrations: [10, 250],
    compatibility: defaultCompatibility,
  },
  {
    id: 'vasopressina',
    name: 'Vasopressina',
    category: 'Agentes Cardiovasculares',
    hasCRI: true,
    concentrations: [20],
    compatibility: defaultCompatibility,
  },

  // Antimicrobianos
  {
    id: 'ceftriaxona',
    name: 'Ceftriaxona',
    category: 'Antimicrobianos',
    hasCRI: true,
    concentrations: [100],
    compatibility: defaultCompatibility,
  },
  {
    id: 'meropenem',
    name: 'Meropenem',
    category: 'Antimicrobianos',
    hasCRI: true,
    concentrations: [50],
    compatibility: defaultCompatibility,
  },
  {
    id: 'enrofloxacina',
    name: 'Enrofloxacina',
    category: 'Antimicrobianos',
    hasCRI: true,
    concentrations: [25, 50, 100],
    compatibility: defaultCompatibility,
  },
  {
    id: 'cefalexina',
    name: 'Cefalexina',
    category: 'Antimicrobianos',
    hasCRI: true,
    concentrations: [100],
    compatibility: defaultCompatibility,
  },
  {
    id: 'clindamicina',
    name: 'Clindamicina',
    category: 'Antimicrobianos',
    hasCRI: true,
    concentrations: [150],
    compatibility: defaultCompatibility,
  },
  {
    id: 'metronidazol',
    name: 'Metronidazol',
    category: 'Antimicrobianos',
    hasCRI: true,
    concentrations: [5],
    compatibility: defaultCompatibility,
  },

  // Bloqueadores Neuromusculares
  {
    id: 'rocuronio',
    name: 'Rocurônio',
    category: 'Bloqueadores Neuromusculares',
    hasCRI: true,
    concentrations: [10],
    compatibility: defaultCompatibility,
  },

  // Infusões Combinadas
  {
    id: 'mlk',
    name: 'MLK (Morfina + Lidocaína + Cetamina)',
    category: 'Infusões Combinadas',
    hasCRI: true,
    concentrations: [],
    compatibility: defaultCompatibility,
  },
  {
    id: 'flk',
    name: 'FLK (Fentanil + Lidocaína + Cetamina)',
    category: 'Infusões Combinadas',
    hasCRI: true,
    concentrations: [],
    compatibility: defaultCompatibility,
  },

  // Endócrino
  {
    id: 'insulina_regular',
    name: 'Insulina Regular',
    category: 'Endócrino',
    hasCRI: true,
    concentrations: [100],
    compatibility: defaultCompatibility,
  },
  {
    id: 'insulina_nph',
    name: 'Insulina NPH',
    category: 'Endócrino',
    hasCRI: true,
    concentrations: [100],
    compatibility: defaultCompatibility,
  },
  {
    id: 'insulina_pzi',
    name: 'Insulina PZI',
    category: 'Endócrino',
    hasCRI: true,
    concentrations: [40, 100],
    compatibility: defaultCompatibility,
  },

  // Antieméticos / Pró-cinéticos
  {
    id: 'metoclopramida',
    name: 'Metoclopramida',
    category: 'Antieméticos / Pró-cinéticos',
    hasCRI: true,
    concentrations: [5],
    compatibility: defaultCompatibility,
  },
  {
    id: 'maropitant',
    name: 'Maropitant',
    category: 'Antieméticos / Pró-cinéticos',
    hasCRI: true,
    concentrations: [10],
    compatibility: defaultCompatibility,
  },
]

export const categories: DrugCategory[] = [
  'Analgésicos e Anestésicos',
  'Agentes Cardiovasculares',
  'Antimicrobianos',
  'Bloqueadores Neuromusculares',
  'Infusões Combinadas',
  'Endócrino',
  'Antieméticos / Pró-cinéticos',
]
