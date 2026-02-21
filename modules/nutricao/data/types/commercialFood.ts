export type Species = 'DOG' | 'CAT'
export type LifeStage = 'PUPPY' | 'ADULT' | 'SENIOR' | 'ALL'
export type NeuterStatus = 'NEUTERED' | 'INTACT' | 'ANY'

export type GuaranteeRow = {
  key:
    | 'moisture_max_gkg'
    | 'protein_min_gkg'
    | 'fat_min_gkg'
    | 'fiber_max_gkg'
    | 'ash_max_gkg'
    | 'calcium_min_mgkg'
    | 'calcium_max_mgkg'
    | 'phosphorus_min_mgkg'
    | 'phosphorus_max_mgkg'
    | 'sodium_min_mgkg'
    | 'potassium_min_mgkg'
    | 'omega3_min_mgkg'
    | 'omega6_min_mgkg'
    | 'epa_dha_min_mgkg'
    | 'taurine_min_mgkg'
    | 'methionine_min_mgkg'
    | 'mos_min_mgkg'
    | 'fos_min_mgkg'
    | 'inulin_min_mgkg'
    | 'l_carnitine_min_mgkg'
    | 'glucosamine_min_mgkg'
    | 'chondroitin_min_mgkg'
    | 'urinary_ph_min'
    | 'urinary_ph_max'
    | 'hexametaphosphate_min_mgkg'
  value: number
  unit: 'g/kg' | 'mg/kg' | 'kcal/kg' | 'pH'
  note?: string
}

import type { NutritionProfile } from './foodTypes';

export type CommercialFood = {
  id: string // slug estável
  brand: string
  line?: string
  product: string

  species: Species
  lifeStage: LifeStage
  neuterStatus: NeuterStatus

  isTherapeutic: boolean
  therapeuticIndications?: string[] // ex: ["WEIGHT_LOSS", "CKD"]
  cautions?: string[] // ex: ["PANCREATITIS_RISK_HIGH_FAT"]
  
  nutritionProfile?: NutritionProfile
  isCompleteAndBalanced?: boolean
  requiresVetSupervision?: boolean
  speciesSafetyNotes?: { dog?: string[]; cat?: string[] }

  me_kcal_per_kg: number
  me_method_note?: string // ex: "Cálculo NRC (rótulo)"
  guarantees: GuaranteeRow[]

  functionalNotes?: string[] // claims úteis pro app (fibras, probióticos, EPA/DHA etc)
  sources: { label: string; url: string }[]
  updatedAtISO: string
}
