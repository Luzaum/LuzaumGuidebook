import type { DrugCompatibility, DrugUnitRules, IndicatedDose, UnitSafetyBlock } from '../types/drug'
import type { DrugProfile } from '../types/drugProfile'
import {
  defaultCompatibility,
  ketamineCompatibilityToDrugCompatibility,
  fentanylCompatibilityToDrugCompatibility,
  remifentanilCompatibilityToDrugCompatibility,
  dobutamineCompatibilityToDrugCompatibility,
  norepinephrineCompatibilityToDrugCompatibility,
  maropitantCompatibilityToDrugCompatibility,
  ephedrineCompatibilityToDrugCompatibility,
} from './drugs/compatibility.helpers'
import { fentanylRecommendedUnit, fentanylRecommendedUnitWhy, fentanylIndicatedDoses } from './drugs/fentanyl'
import { ketamineIndicatedDoses, ketamineRecommendedUnit, ketamineRecommendedUnitWhy } from './drugs/ketamine'
import { midazolamIndicatedDoses } from './drugs/midazolam'
import { remifentanilIndicatedDoses, remifentanilRecommendedUnit, remifentanilRecommendedUnitWhy } from './drugs/remifentanil'
import { dobutamineRecommendedUnit, dobutamineRecommendedUnitWhy, dobutamineIndicatedDoses } from './drugs/dobutamine'
import { norepinephrineRecommendedUnit, norepinephrineRecommendedUnitWhy, norepinephrineIndicatedDoses } from './drugs/norepinephrine'
import { lidocaineRecommendedUnit, lidocaineRecommendedUnitWhy, lidocaineIndicatedDoses } from './drugs/lidocaine'
import { dexmedetomidineRecommendedUnit, dexmedetomidineRecommendedUnitWhy, dexmedetomidineIndicatedDoses } from './drugs/dexmedetomidine'
import { propofolRecommendedUnit, propofolRecommendedUnitWhy, propofolIndicatedDoses } from './drugs/propofol'
import { methadoneRecommendedUnit, methadoneRecommendedUnitWhy, methadoneIndicatedDoses } from './drugs/methadone'
import { insulinRegularRecommendedUnit, insulinRegularRecommendedUnitWhy, insulinRegularIndicatedDoses, insulinSafetyBlocks } from './drugs/insulinRegular'
import { metoclopramidaRecommendedUnit, metoclopramidaRecommendedUnitWhy, metoclopramidaIndicatedDoses } from './drugs/metoclopramida'
import { maropitantRecommendedUnit, maropitantRecommendedUnitWhy, maropitantIndicatedDoses } from './drugs/maropitant'
import { ephedrineRecommendedUnit, ephedrineRecommendedUnitWhy, ephedrineIndicatedDoses } from './drugs/ephedrine'
import { morphineSafetyBlocks } from './drugs/morphine.blocks'
import { remifentanilSafetyBlocks } from './drugs/remifentanil.blocks'

// New Profile Imports
import { lidocainaProfile } from './drugs/lidocaina.profile'
import { fentanilProfile } from './drugs/fentanil.profile'
import { remifentanilProfile } from './drugs/remifentanil.profile'
import { morfinaProfile } from './drugs/morfina.profile'
import { metadonaProfile } from './drugs/metadona.profile'
import { butorfanolProfile } from './drugs/butorfanol.profile'
import { cetaminaProfile } from './drugs/cetamina.profile'
import { dexmedetomidinaProfile } from './drugs/dexmedetomidina.profile'
import { propofolProfile } from './drugs/propofol.profile'
import { dobutaminaProfile } from './drugs/dobutamina.profile'
import { dopaminaProfile } from './drugs/dopamina.profile'
import { efedrinaProfile } from './drugs/efedrina.profile'
import { norepinefrinaProfile } from './drugs/norepinefrina.profile'
import { nitroprussiatoProfile } from './drugs/nitroprussiato.profile'
import { diltiazemProfile } from './drugs/diltiazem.profile'
import { esmololProfile } from './drugs/esmolol.profile'
import { vasopressinaProfile } from './drugs/vasopressina.profile'
import { ceftriaxonaProfile } from './drugs/ceftriaxona.profile'
import { meropenemProfile } from './drugs/meropenem.profile'
import { enrofloxacinaProfile } from './drugs/enrofloxacina.profile'
import { cefalexinaProfile } from './drugs/cefalexina.profile'
import { clindamicinaProfile } from './drugs/clindamicina.profile'
import { metronidazolProfile } from './drugs/metronidazol.profile'
import { rocuronioProfile } from './drugs/rocuronio.profile'
import { mlkProfile } from './drugs/mlk.profile'
import { flkProfile } from './drugs/flk.profile'
import { insulina_regularProfile } from './drugs/insulina_regular.profile'
import { metoclopramidaProfile } from './drugs/metoclopramida.profile'
import { maropitantProfile } from './drugs/maropitant.profile'

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
  safetyBlocks?: UnitSafetyBlock[] // Bloqueios de segurança por unidade
  profile?: DrugProfile // ✅ NOVO: Perfil completo vinculado
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
    recommendedUnit: lidocaineRecommendedUnit,
    recommendedUnitWhy: lidocaineRecommendedUnitWhy,
    indicatedDoses: lidocaineIndicatedDoses,
    profile: lidocainaProfile,
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
    profile: fentanilProfile,
  },
  {
    id: 'remifentanil',
    name: 'Remifentanil',
    category: 'Analgésicos e Anestésicos',
    hasCRI: true,
    concentrations: [1],
    compatibility: remifentanilCompatibilityToDrugCompatibility(),
    recommendedUnit: remifentanilRecommendedUnit,
    recommendedUnitWhy: remifentanilRecommendedUnitWhy,
    indicatedDoses: remifentanilIndicatedDoses,
    safetyBlocks: remifentanilSafetyBlocks,
    profile: remifentanilProfile,
  },
  {
    id: 'morfina',
    name: 'Morfina',
    category: 'Analgésicos e Anestésicos',
    hasCRI: true,
    concentrations: [10, 1],
    compatibility: defaultCompatibility,
    safetyBlocks: morphineSafetyBlocks,
    profile: morfinaProfile,
  },
  {
    id: 'metadona',
    name: 'Metadona',
    category: 'Analgésicos e Anestésicos',
    hasCRI: true,
    concentrations: [10],
    compatibility: defaultCompatibility,
    recommendedUnit: methadoneRecommendedUnit,
    recommendedUnitWhy: methadoneRecommendedUnitWhy,
    indicatedDoses: methadoneIndicatedDoses,
    profile: metadonaProfile,
  },
  {
    id: 'butorfanol',
    name: 'Butorfanol',
    category: 'Analgésicos e Anestésicos',
    hasCRI: true,
    concentrations: [10],
    compatibility: defaultCompatibility,
    profile: butorfanolProfile,
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
    profile: cetaminaProfile,
  },
  {
    id: 'dexmedetomidina',
    name: 'Dexmedetomidina',
    category: 'Analgésicos e Anestésicos',
    hasCRI: true,
    concentrations: [0.5],
    compatibility: defaultCompatibility,
    recommendedUnit: dexmedetomidineRecommendedUnit,
    recommendedUnitWhy: dexmedetomidineRecommendedUnitWhy,
    indicatedDoses: dexmedetomidineIndicatedDoses,
    profile: dexmedetomidinaProfile,
  },
  {
    id: 'propofol',
    name: 'Propofol',
    category: 'Analgésicos e Anestésicos',
    hasCRI: true,
    concentrations: [10],
    compatibility: defaultCompatibility,
    recommendedUnit: propofolRecommendedUnit,
    recommendedUnitWhy: propofolRecommendedUnitWhy,
    indicatedDoses: propofolIndicatedDoses,
    profile: propofolProfile,
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
    profile: dobutaminaProfile,
  },
  {
    id: 'dopamina',
    name: 'Dopamina',
    category: 'Agentes Cardiovasculares',
    hasCRI: true,
    concentrations: [5],
    compatibility: defaultCompatibility,
    profile: dopaminaProfile,
  },
  {
    id: 'efedrina',
    name: 'Efedrina',
    category: 'Agentes Cardiovasculares',
    hasCRI: true,
    concentrations: [50],
    compatibility: ephedrineCompatibilityToDrugCompatibility(),
    recommendedUnit: ephedrineRecommendedUnit,
    recommendedUnitWhy: ephedrineRecommendedUnitWhy,
    indicatedDoses: ephedrineIndicatedDoses,
    profile: efedrinaProfile,
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
    profile: norepinefrinaProfile,
  },
  {
    id: 'nitroprussiato',
    name: 'Nitroprussiato',
    category: 'Agentes Cardiovasculares',
    hasCRI: true,
    concentrations: [25],
    compatibility: defaultCompatibility,
    profile: nitroprussiatoProfile,
  },
  {
    id: 'diltiazem',
    name: 'Diltiazem',
    category: 'Agentes Cardiovasculares',
    hasCRI: true,
    concentrations: [5],
    compatibility: defaultCompatibility,
    profile: diltiazemProfile,
  },
  {
    id: 'esmolol',
    name: 'Esmolol',
    category: 'Agentes Cardiovasculares',
    hasCRI: true,
    concentrations: [10, 250],
    compatibility: defaultCompatibility,
    profile: esmololProfile,
  },
  {
    id: 'vasopressina',
    name: 'Vasopressina',
    category: 'Agentes Cardiovasculares',
    hasCRI: true,
    concentrations: [20],
    compatibility: defaultCompatibility,
    profile: vasopressinaProfile,
  },

  // Antimicrobianos
  {
    id: 'ceftriaxona',
    name: 'Ceftriaxona',
    category: 'Antimicrobianos',
    hasCRI: true,
    concentrations: [100],
    compatibility: defaultCompatibility,
    profile: ceftriaxonaProfile,
  },
  {
    id: 'meropenem',
    name: 'Meropenem',
    category: 'Antimicrobianos',
    hasCRI: true,
    concentrations: [50],
    compatibility: defaultCompatibility,
    profile: meropenemProfile,
  },
  {
    id: 'enrofloxacina',
    name: 'Enrofloxacina',
    category: 'Antimicrobianos',
    hasCRI: true,
    concentrations: [25, 50, 100],
    compatibility: defaultCompatibility,
    profile: enrofloxacinaProfile,
  },
  {
    id: 'cefalexina',
    name: 'Cefalexina',
    category: 'Antimicrobianos',
    hasCRI: true,
    concentrations: [100],
    compatibility: defaultCompatibility,
    profile: cefalexinaProfile,
  },
  {
    id: 'clindamicina',
    name: 'Clindamicina',
    category: 'Antimicrobianos',
    hasCRI: true,
    concentrations: [150],
    compatibility: defaultCompatibility,
    profile: clindamicinaProfile,
  },
  {
    id: 'metronidazol',
    name: 'Metronidazol',
    category: 'Antimicrobianos',
    hasCRI: true,
    concentrations: [5],
    compatibility: defaultCompatibility,
    profile: metronidazolProfile,
  },

  // Bloqueadores Neuromusculares
  {
    id: 'rocuronio',
    name: 'Rocurônio',
    category: 'Bloqueadores Neuromusculares',
    hasCRI: true,
    concentrations: [10],
    compatibility: defaultCompatibility,
    profile: rocuronioProfile,
  },

  // Infusões Combinadas
  {
    id: 'mlk',
    name: 'MLK (Morfina + Lidocaína + Cetamina)',
    category: 'Infusões Combinadas',
    hasCRI: true,
    concentrations: [],
    compatibility: defaultCompatibility,
    profile: mlkProfile,
  },
  {
    id: 'flk',
    name: 'FLK (Fentanil + Lidocaína + Cetamina)',
    category: 'Infusões Combinadas',
    hasCRI: true,
    concentrations: [],
    compatibility: defaultCompatibility,
    profile: flkProfile,
  },

  // Endócrino
  {
    id: 'insulina_regular',
    name: 'Insulina Regular',
    category: 'Endócrino',
    hasCRI: true,
    concentrations: [100, 1, 0.5], // 100 U/mL (frasco), 1 U/mL (diluição padrão cão), 0.5 U/mL (diluição padrão gato)
    compatibility: defaultCompatibility,
    recommendedUnit: insulinRegularRecommendedUnit,
    recommendedUnitWhy: insulinRegularRecommendedUnitWhy,
    indicatedDoses: insulinRegularIndicatedDoses,
    safetyBlocks: insulinSafetyBlocks,
    profile: insulina_regularProfile,
  },

  // Antieméticos / Pró-cinéticos
  {
    id: 'metoclopramida',
    name: 'Metoclopramida',
    category: 'Antieméticos / Pró-cinéticos',
    hasCRI: true,
    concentrations: [5],
    compatibility: defaultCompatibility,
    recommendedUnit: metoclopramidaRecommendedUnit,
    recommendedUnitWhy: metoclopramidaRecommendedUnitWhy,
    indicatedDoses: metoclopramidaIndicatedDoses,
    profile: metoclopramidaProfile,
  },
  {
    id: 'maropitant',
    name: 'Maropitant',
    category: 'Antieméticos / Pró-cinéticos',
    hasCRI: true,
    concentrations: [10],
    compatibility: maropitantCompatibilityToDrugCompatibility(),
    recommendedUnit: maropitantRecommendedUnit,
    recommendedUnitWhy: maropitantRecommendedUnitWhy,
    indicatedDoses: maropitantIndicatedDoses,
    profile: maropitantProfile,
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
