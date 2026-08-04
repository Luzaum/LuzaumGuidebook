import type { FoodItem } from '../../types'
import type { HumanOmega3Product } from './types'
import { canCalculateDose } from './regulatoryValidation'

const EMPTY_NUTRIENTS = {
  moisturePct: null,
  dryMatterPct: null,
  energyKcalPer100g: null,
  crudeProteinPct: null,
  etherExtractPct: null,
  ashPct: null,
  crudeFiberPct: null,
  nitrogenFreeExtractPct: null,
  calciumPct: null,
  phosphorusPct: null,
  potassiumPct: null,
  sodiumPct: null,
  chloridePct: null,
  magnesiumPct: null,
  manganeseMg: null,
  copperMg: null,
  zincMg: null,
  seleniumMg: null,
  vitaminAIu: null,
  vitaminDIu: null,
  vitaminEIu: null,
  thiamineMg: null,
  riboflavinMg: null,
  pyridoxineMg: null,
  taurinePct: null,
  methionineCystinePct: null,
  omega3Pct: null,
  omega6Pct: null,
  mcfaPct: null,
  cholineMg: null,
  ironMg: null,
  iodineMg: null,
  niacinMg: null,
  pantothenicAcidMg: null,
  biotinMg: null,
  folicAcidMg: null,
  cobalaminMcg: null,
  vitaminKMg: null,
} as FoodItem['nutrientsAsFed']

export function humanOmega3ToFoodItem(product: HumanOmega3Product): FoodItem {
  const skuLabel = product.skus[0]?.packageLabel ?? 'cápsula'
  const notes: string[] = [
    'food_kind=human_omega3_food',
    'completeness_class=supplement_only',
    'source_type=human_omega3_codex',
    'label_species=human',
    'veterinary_use=extra_label',
    'requires_veterinarian_prescription=true',
    `veterinary_suitability=${product.veterinarySuitability}`,
    `clinical_calculation_enabled=${product.clinicalCalculationEnabled}`,
    `market_status=${product.marketStatus}`,
    `manufacturer=${product.manufacturer}`,
  ]

  if (product.epaMgPerUnit != null) notes.push(`epa_mg_per_unit=${product.epaMgPerUnit}`)
  if (product.dhaMgPerUnit != null) notes.push(`dha_mg_per_unit=${product.dhaMgPerUnit}`)
  if (product.epaDhaMgPerUnit != null) notes.push(`epa_dha_mg_per_unit=${product.epaDhaMgPerUnit}`)
  if (product.cannotSubstituteBalancedEpaDha) notes.push('cannot_substitute_balanced_epa_dha=true')
  if (product.blockReason) notes.push(`block_reason=${product.blockReason}`)
  if (product.qualityIssues.length) notes.push(`quality_issues=${product.qualityIssues.join('|')}`)
  if (product.officialSource) notes.push(`official_source=${product.officialSource}`)

  if (!canCalculateDose(product)) {
    notes.push('clinical_use_status=blocked_pending_data')
  }

  return {
    id: product.id,
    slug: product.slug,
    name: `[Humano] ${product.commercialName}`,
    category: 'Ômega-3 humano',
    categoryNormalized: 'Ômega-3 humano',
    sourceSheet: 'Alimentos MN',
    sourceReference: {
      workbook: 'CODEX Ômega-3 humanos BR 2026-08-04',
      mnRow: 0,
      msRow: null,
    },
    speciesScope: 'both',
    foodType: 'suplemento',
    presentation: `${skuLabel} — ${product.manufacturer} (uso extrarrótulo)`,
    nutrientsAsFed: { ...EMPTY_NUTRIENTS },
    nutrientsDryMatter: { ...EMPTY_NUTRIENTS, dryMatterPct: 100 },
    missingNutrients: Object.keys(EMPTY_NUTRIENTS),
    notes,
  }
}

export function getHumanOmega3FoodItems(products: HumanOmega3Product[]): FoodItem[] {
  return products.filter((product) => canCalculateDose(product)).map(humanOmega3ToFoodItem)
}
