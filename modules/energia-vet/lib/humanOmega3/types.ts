/** Ômega-3 humanos — uso extrarrótulo veterinário (cães e gatos). */

export type HumanOmega3MarketStatus =
  | 'active'
  | 'pending_label_confirmation'
  | 'conflicting_data'
  | 'not_recommended'
  | 'blocked'

export type HumanOmega3DosageForm =
  | 'softgel'
  | 'mini_softgel'
  | 'enteric_softgel'
  | 'liquid'
  | 'chewable'

export type HumanOmega3SourceType =
  | 'fish_oil'
  | 'algae_oil'
  | 'krill_oil'
  | 'cod_liver_oil'
  | 'plant_ala'

export type HumanOmega3ChemicalForm =
  | 'triglyceride'
  | 'reesterified_triglyceride'
  | 'ethyl_ester'
  | 'phospholipid'
  | 'not_declared'

export type HumanOmega3VeterinarySuitability =
  | 'preferred'
  | 'preferred_high_concentration'
  | 'acceptable'
  | 'acceptable_with_flavoring_review'
  | 'specific_use'
  | 'label_required'
  | 'low_concentration'
  | 'not_preferred'
  | 'specialist_only_extra_active'
  | 'blocked'
  | 'blocked_multiple_micronutrients'
  | 'blocked_chewable_human_product'
  | 'blocked_as_epa_dha_substitute'

export interface HumanOmega3AdditionalActive {
  name: string
  amount?: number
  unit?: string
}

export interface HumanOmega3Sku {
  id: string
  packageUnits: number
  packageLabel: string
}

export interface HumanOmega3Product {
  id: string
  slug: string
  manufacturer: string
  commercialName: string
  country: 'Brazil'
  humanSupplement: true
  veterinaryUse: 'extra_label'
  requiresVeterinarianPrescription: true
  labelSpecies: 'human'
  marketStatus: HumanOmega3MarketStatus
  dosageForm: HumanOmega3DosageForm
  skus: HumanOmega3Sku[]
  unitsPerHumanServing?: number | null
  epaMgPerServing?: number | null
  dhaMgPerServing?: number | null
  omega3TotalMgPerServing?: number | null
  epaMgPerUnit?: number | null
  dhaMgPerUnit?: number | null
  epaDhaMgPerUnit?: number | null
  epaDhaRatio?: number | null
  sourceType: HumanOmega3SourceType
  chemicalForm: HumanOmega3ChemicalForm
  antioxidant?: 'mixed_tocopherols' | 'vitamin_e' | 'not_declared'
  additionalActives: HumanOmega3AdditionalActive[]
  flavorings: string[]
  sweeteners: string[]
  allergens: string[]
  certificationClaims: string[]
  officialSource?: string
  officialSourceAccessedAt: string
  veterinarySuitability: HumanOmega3VeterinarySuitability
  clinicalCalculationEnabled: boolean
  requiresCurrentLabelPhoto?: boolean
  requiresFlavoringReview?: boolean
  cannotSubstituteBalancedEpaDha?: boolean
  qualityIssues: string[]
  blockReason?: string
  notes?: string
}

export type VeterinaryOmega3Indication =
  | 'nutritional_general'
  | 'nrc_upper_safe'
  | 'hyperlipidemia'
  | 'renal_disease'
  | 'cardiovascular'
  | 'osteoarthritis_metabolic'
  | 'osteoarthritis_individual'
  | 'inflammatory_immunologic'
  | 'atopic_cyclosporine_sparing'
  | 'symmetric_lupoid_onychodystrophy'
  | 'glomerular_disease'
  | 'custom_combined'
  | 'custom_epa_dha'

export interface Omega3DosePrescription {
  indication: VeterinaryOmega3Indication
  /** mg/kg^0.75/dia — EPA+DHA combinados */
  combinedMgPerMetabolicKg?: number
  /** mg/kg/dia — EPA individual */
  epaMgPerKg?: number
  /** mg/kg/dia — DHA individual */
  dhaMgPerKg?: number
  /** Limite absoluto diário EPA+DHA (g) */
  maxCombinedGramsPerDay?: number
}

export interface Omega3DoseCalculationInput {
  weightKg: number
  species: 'dog' | 'cat'
  product: HumanOmega3Product
  prescription: Omega3DosePrescription
  /** EPA+DHA já fornecidos pela dieta (mg/dia) */
  dietEpaDhaMgPerDay?: number
  metabolicExponent?: number
}

export interface Omega3EffectiveDose {
  epaMg: number
  dhaMg: number
  epaDhaMg: number
}

export interface Omega3DoseCalculationResult {
  targetEpaMg: number
  targetDhaMg: number
  targetCombinedMg: number
  adjustedCombinedTargetMg: number
  exactCapsules: number
  lowerOption: number
  upperOption: number
  lowerEffective: Omega3EffectiveDose
  upperEffective: Omega3EffectiveDose
  percentDifferenceLower: number
  percentDifferenceUpper: number
  requiresVeterinarianChoice: true
  fractionalCapsuleEnabled: false
  felineLimitAlert?: string
  warnings: string[]
}

export const HUMAN_OMEGA3_DISCLAIMERS = [
  'PRODUTO HUMANO — USO EXTRARRÓTULO EM CÃES OU GATOS.',
  'A DOSE É CALCULADA PELO EPA E DHA, NÃO PELO PESO TOTAL DO ÓLEO.',
  'CONFIRA O RÓTULO ANTES DE CADA NOVA COMPRA. A FÓRMULA PODE MUDAR.',
  'NÃO UTILIZAR PRODUTOS COM XILITOL, VITAMINA A, VITAMINA D OU OUTROS ATIVOS SEM REVISÃO.',
  'CONSIDERAR O EPA E DHA JÁ PRESENTES NA RAÇÃO OU DIETA TERAPÊUTICA.',
] as const

export const FELINE_EPA_DHA_CAUTION_MG_PER_METABOLIC = 75
export const FELINE_METABOLIC_EXPONENT = 0.67
export const CANINE_METABOLIC_EXPONENT = 0.75
