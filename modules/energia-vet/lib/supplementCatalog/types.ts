/** CODEX — Catálogo nacional exclusivo de suplementos alimentares veterinários (BR). */

export type NutritionalProductClass =
  | 'suplemento_alimentar'
  | 'suplemento_vitaminico'
  | 'suplemento_mineral'
  | 'suplemento_aminoacido'
  | 'suplemento_proteico'
  | 'suplemento_energetico'
  | 'suplemento_eletrolitico'
  | 'suplemento_acidos_graxos'
  | 'suplemento_vitaminico_mineral'
  | 'suplemento_vitaminico_mineral_aminoacido'
  | 'probiotico'
  | 'prebiotico'
  | 'simbiotico'
  | 'premix_balanceador'
  | 'alimento_complementar'
  | 'alimento_especifico'
  | 'alimento_enteral_complementar'
  | 'substituto_do_leite'
  | 'petisco_funcional'

export type RegulatoryClass =
  | 'produto_destinado_alimentacao_animal'
  | 'suplemento_alimentar'
  | 'alimento_complementar'
  | 'premix'
  | 'substituto_do_leite'
  | 'registro_dispensado_confirmado'
  | 'classificacao_pendente'

export type MedicineStatus =
  | 'not_medicine_confirmed'
  | 'possible_medicine'
  | 'medicine_confirmed'
  | 'unknown'

export type CatalogEligibility = 'eligible' | 'staging_only' | 'excluded'

export type SourceTier =
  | 'A_OFFICIAL_LABEL'
  | 'B_OFFICIAL_PRODUCT_PAGE'
  | 'C_OFFICIAL_CATALOG'
  | 'D_OFFICIAL_DISTRIBUTOR'
  | 'E_MAJOR_RETAILER'
  | 'F_MARKETPLACE_DISCOVERY'

export type NutritionalCategory =
  | 'vitaminas'
  | 'minerais'
  | 'vitaminas_e_minerais'
  | 'aminoacidos'
  | 'proteina'
  | 'energia'
  | 'eletrolitos_hidratacao'
  | 'omega_3'
  | 'omega_6'
  | 'pele_pelagem'
  | 'intestinal'
  | 'microbiota'
  | 'fibras'
  | 'imunonutricao'
  | 'hematopoiese_nutricional'
  | 'articulacoes_nutricional'
  | 'musculo_sarcopenia'
  | 'antioxidantes'
  | 'geriatria_nutricional'
  | 'gestacao_lactacao'
  | 'reproducao_nutricional'
  | 'neonatal'
  | 'recuperacao_convalescenca'
  | 'suporte_renal_nutricional'
  | 'suporte_hepatico_nutricional'
  | 'suporte_urinario_nutricional'
  | 'premix_dieta_caseira'
  | 'petisco_funcional'
  | 'substituto_do_leite'

export type MarketStatus =
  | 'active'
  | 'probably_active'
  | 'pending_confirmation'
  | 'historical'
  | 'discontinued'
  | 'active_recent_launch'
  | 'imported_pending_confirmation'

export type DosageForm =
  | 'comprimido'
  | 'comprimido_mastigavel'
  | 'capsula'
  | 'capsula_mole'
  | 'po'
  | 'pasta'
  | 'gel'
  | 'suspensao_oral'
  | 'solucao_oral'
  | 'seringa'
  | 'sache'
  | 'stick'
  | 'petisco'
  | 'barra'
  | 'outro'

export type IngredientAmountBasis =
  | 'por_comprimido'
  | 'por_capsula'
  | 'por_grama'
  | 'por_ml'
  | 'por_sache'
  | 'por_dose_diaria'
  | 'por_kg_produto'
  | 'nao_informado'

export type IngredientValueType =
  | 'quantidade_declarada'
  | 'nivel_minimo_garantia'
  | 'nivel_maximo_garantia'
  | 'presenca_qualitativa'
  | 'nao_informado'

export type NutritionalAlertLevel =
  | 'informativo'
  | 'duplicidade'
  | 'potencial_excesso'
  | 'revisao_veterinaria'
  | 'nao_associar'

export type SupplementSpecies = 'dog' | 'cat'

export interface PremixPrescriptionRules {
  cannotCombineWithCompleteFood: boolean
  cannotCombineWithAnotherPremix: boolean
  requiresExactRecipeAssociation: boolean
  requiresIngredientWeights: boolean
  requiresCookingMethod: boolean
  requiresRecipeYield: boolean
  requiresRecipeVersion: boolean
  requiresVeterinaryNutritionistReview: boolean
}

export interface SupplementManufacturer {
  id: string
  slug: string
  name: string
  country: string
  officialUrl?: string
  cnpj?: string
  notes?: string
}

export interface SupplementProduct {
  id: string
  slug: string
  manufacturerId: string
  manufacturerSlug: string
  brand?: string
  family?: string
  commercialName: string
  canonicalName: string
  productClass: NutritionalProductClass
  primaryCategory: NutritionalCategory
  secondaryCategories: NutritionalCategory[]
  species: SupplementSpecies[]
  lifeStages: string[]
  regulatoryClass: RegulatoryClass
  medicineStatus: MedicineStatus
  catalogEligibility: CatalogEligibility
  marketStatus: MarketStatus
  clinicalRecommendationEnabled: boolean
  lastVerifiedAt?: string
  requiresSixMonthReaudit?: boolean
  bundleIsNotAProduct?: boolean
  duplicateActivesCheckRequired?: boolean
  premixRules?: PremixPrescriptionRules
  labelStatus: 'complete' | 'partial' | 'pending'
  formulaStatus: 'complete' | 'partial' | 'pending'
  doseStatus: 'confirmed' | 'pending'
  notes?: string
}

export interface SupplementSku {
  id: string
  productId: string
  productSlug: string
  dosageForm: DosageForm
  packageSize: string
  concentrationLabel?: string
  unitsPerPackage?: number
  netWeightG?: number
  netVolumeMl?: number
  flavor?: string
  barcode?: string
}

export interface SupplementIngredient {
  id: string
  canonicalName: string
  aliases: string[]
}

export interface SupplementProductIngredient {
  productId: string
  canonicalIngredientId: string
  declaredIngredientName: string
  amount?: number | null
  unit?: string | null
  amountBasis: IngredientAmountBasis
  valueType: IngredientValueType
  chemicalForm?: string
  sourceIngredient?: string
}

export interface Omega3Profile {
  fishOilMg?: number | null
  totalOmega3Mg?: number | null
  epaMg?: number | null
  dhaMg?: number | null
  epaDhaMg?: number | null
  alaMg?: number | null
  glaMg?: number | null
  amountBasis: IngredientAmountBasis
}

export interface ProbioticProfile {
  genus?: string
  species?: string
  strain?: string
  cfuPerUnit?: number | null
  cfuPerDailyDose?: number | null
  cfuGuaranteeBasis?: string
  storageInstructions?: string
  viabilityGuaranteedUntilExpiry?: boolean
}

export interface SupplementSource {
  id: string
  productId: string
  tier: SourceTier
  url?: string
  documentTitle?: string
  consultedAt: string
  notes?: string
}

export interface SupplementCatalogFilters {
  query?: string
  manufacturerSlug?: string
  species?: SupplementSpecies
  primaryCategory?: NutritionalCategory
  productClass?: NutritionalProductClass
  catalogEligibility?: CatalogEligibility
  clinicalOnly?: boolean
  dosageForm?: DosageForm
}

export interface SupplementCatalogSearchResult {
  items: SupplementProduct[]
  total: number
  manufacturers: SupplementManufacturer[]
}

export interface SupplementCatalogStats {
  manufacturers: number
  productsTotal: number
  productsEligible: number
  productsStaging: number
  productsExcluded: number
  skus: number
  formulasComplete: number
  formulasIncomplete: number
  dosesConfirmed: number
  dosesPending: number
}

export const CLINICAL_SOURCE_TIERS: SourceTier[] = [
  'A_OFFICIAL_LABEL',
  'B_OFFICIAL_PRODUCT_PAGE',
  'C_OFFICIAL_CATALOG',
]

export const PRESCRIPTION_DISCLAIMER_PT = [
  'ESTE É UM SUPLEMENTO ALIMENTAR, NÃO UM MEDICAMENTO.',
  'A POSOLOGIA EXIBIDA CORRESPONDE AO RÓTULO DO FABRICANTE E DEVE SER AJUSTADA À DIETA E À CONDIÇÃO DO PACIENTE.',
] as const

export const DEFAULT_PREMIX_RULES: PremixPrescriptionRules = {
  cannotCombineWithCompleteFood: true,
  cannotCombineWithAnotherPremix: true,
  requiresExactRecipeAssociation: true,
  requiresIngredientWeights: true,
  requiresCookingMethod: true,
  requiresRecipeYield: true,
  requiresRecipeVersion: true,
  requiresVeterinaryNutritionistReview: true,
}
