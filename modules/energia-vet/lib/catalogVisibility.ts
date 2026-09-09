import type { FoodItem } from '../types'

function noteValue(notes: string[] | undefined, prefix: string): string | null {
  const hit = notes?.find((n) => n.startsWith(`${prefix}=`))
  return hit ? hit.slice(prefix.length + 1) : null
}

function hasNote(notes: string[] | undefined, token: string): boolean {
  return notes?.includes(token) ?? false
}

/**
 * Lista de IDs de rações comerciais duplicadas / redundantes que devem ser omitidas do catálogo.
 */
const DUPLICATE_COMMERCIAL_FOOD_IDS = new Set([
  // Royal Canin
  'pate-royal-canin-hypoallergenic',
  'pate-royal-canin-gastrointestinal-low-fat-canine',
  'pate-royal-canin-renal-canine',
  'royal-canin-vet-renal-canine-wet-410g',
  'royal-canin-retail-caes-medium-adult-140g',
  'royal-canin-vet-renal-special-canine-pate-410g',
  'racao-royal-canin-vd-satiety-support-canine',
  'racao-royal-felinos-gastrointestinal-hydrolized-protein',
  'racao-royal-canin-gastrointestinal-gatos',

  // PremieR Nutrição Clínica (manter rações secas canônicas e sachês úmidos)
  'racao-obesidade-caes-premir',
  'racao-premierpet-nutricao-clinica-renal-gatos',

  // Purina Pro Plan
  'purina-proplan-vet-om-canino-seco',

  // Hill's (ocultar placeholder vazio e duplicatas)
  'hills-prescription-kd-kidney-care-frango',
  'hills-pate-onc-care',


])

/** Alimento oculto do catálogo de seleção (permanece no dataset para auditoria). */
export function isFoodCatalogHidden(
  food: Pick<FoodItem, 'id' | 'notes' | 'foodType'> &
    Partial<Pick<FoodItem, 'nutrientsAsFed' | 'nutrientsDryMatter' | 'clinicalUseStatus' | 'productStatus' | 'productionLicenseOk'>>
): boolean {
  if (DUPLICATE_COMMERCIAL_FOOD_IDS.has(food.id)) return true

  const notes = food.notes ?? []

  if (hasNote(notes, 'catalog_hidden=true')) return true
  if (hasNote(notes, 'hard_block=true')) return true

  // Alimentos em revisão de rotulagem técnica ou sem teores de nutrientes
  if (hasNote(notes, 'nutrient_levels=pending_label_review')) return true

  const clinicalStatus = food.clinicalUseStatus ?? noteValue(notes, 'clinical_use_status')
  if (
    clinicalStatus === 'blocked' ||
    clinicalStatus === 'blocked_pending_data' ||
    clinicalStatus === 'blocked_license_review' ||
    clinicalStatus === 'blocked_pending_exact_sku' ||
    clinicalStatus === 'consolidated_alias'
  ) {
    return true
  }

  const prodStatus = food.productStatus ?? noteValue(notes, 'product_status')
  if (
    prodStatus === 'consolidated_alias' ||
    prodStatus === 'blocked_pending_data' ||
    prodStatus === 'blocked_license_review' ||
    prodStatus === 'blocked_pending_exact_sku'
  ) {
    return true
  }

  if (food.productionLicenseOk === false || hasNote(notes, 'production_license_ok=false')) {
    return true
  }

  const vetClass = noteValue(notes, 'classificacao_veterinaria')
  if (vetClass === 'bloqueado_toxico' || vetClass === 'bloqueado_produto_processado' || vetClass === 'bloqueado_preparo_inadequado') {
    return true
  }

  // Lote FNDDS em inglês — não comercializado como ingrediente BR típico
  if (food.id.startsWith('usda-fndds-')) return true

  // Alimentos comerciais devem conter ao menos proteína e gordura declaradas
  // para permitir cálculo clínico de energia e macronutrientes.
  if (food.foodType === 'commercial' && (food.nutrientsAsFed || food.nutrientsDryMatter)) {
    const af = food.nutrientsAsFed ?? {}
    const dm = food.nutrientsDryMatter ?? {}
    const hasProtein = (af.crudeProteinPct != null && af.crudeProteinPct > 0) || (dm.crudeProteinPct != null && dm.crudeProteinPct > 0)
    const hasFat = (af.etherExtractPct != null && af.etherExtractPct > 0) || (dm.etherExtractPct != null && dm.etherExtractPct > 0)
    if (!hasProtein || !hasFat) {
      return true
    }
  }

  return false
}

/** Visível na busca/seleção de alimentos do NutriçãoVET. */
export function isFoodCatalogVisible(
  food: Pick<FoodItem, 'id' | 'notes' | 'foodType'> & Partial<Pick<FoodItem, 'nutrientsAsFed' | 'nutrientsDryMatter'>>
): boolean {
  return !isFoodCatalogHidden(food)
}
