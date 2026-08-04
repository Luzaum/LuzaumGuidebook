import { GENUTRI_NUTRIENT_CATALOG, getFoodDisplayName } from './genutriData'
import type { FoodItem, NutrientDefinition } from '../types'

export function formatFoodNutrient(value: number | null | undefined, unit?: string | null, decimals = 2) {
  if (value == null) return '—'
  return `${value.toFixed(decimals)} ${unit ?? ''}`.trim()
}

const NOTE_LABELS: Record<string, string> = {
  food_kind: 'Tipo de item',
  completeness_class: 'Classe de completude',
  basis: 'Base de composição',
  source_type: 'Tipo de fonte',
  fonteNome: 'Fonte',
  fonteInstituicao: 'Instituição',
  fonteEdicao: 'Edição',
  fonteAno: 'Ano da fonte',
  baseComposicao: 'Base analítica',
  tipoValor: 'Tipo de valor analítico',
  paisReferencia: 'País de referência',
  fonteOficial: 'Fonte oficial',
  fonteBrasileira: 'Fonte brasileira',
  estadoAtualizacao: 'Estado de atualização',
  requerRevisaoPeriodica: 'Requer revisão periódica',
  classeCompletude: 'Classe de completude',
  dietaCompleta: 'Dieta completa',
  auto_prescription: 'Prescrição automática',
  requires_veterinary_review: 'Requer avaliação veterinária',
  prescricaoAutomatica: 'Prescrição automática',
  requerAvaliacaoVeterinaria: 'Requer avaliação veterinária',
  energy_value_kind: 'Tipo de valor energético',
  energy_derivation: 'Derivação energética',
  taco_id: 'Código TACO',
  canonical_food_key: 'Chave canônica',
  quality_grade: 'Grau de qualidade',
  clinical_use_status: 'Status de uso clínico',
  classificacao_veterinaria: 'Classificação veterinária',
  adequacao_especie: 'Adequação por espécie',
  adequacao_caes: 'Adequação — cães',
  adequacao_gatos: 'Adequação — gatos',
  limite_energetico: 'Limite energético',
  oferta_recomendada: 'Forma de oferta recomendada',
  ofertaDireta: 'Oferta direta',
  exigeCozimento: 'Exige cozimento',
  exigeCozimentoCompleto: 'Exige cozimento completo',
  retirarEspinhas: 'Retirar espinhas',
  retirarOssos: 'Retirar ossos',
  problema_qualidade: 'Alerta de qualidade',
  qualidade_fonte: 'Qualidade da fonte',
  valor_original_carboidrato: 'Carboidrato original (fonte)',
  valor_normalizado_carboidrato: 'Carboidrato normalizado',
  usda_food_code: 'Código USDA/FNDDS',
  canonical_name_en: 'Nome canônico (EN)',
  common_name_pt: 'Nome comum (PT)',
  catalog_hidden: 'Oculto do catálogo',
  taco_preferred_source: 'Fonte preferencial TACO',
  hard_block: 'Bloqueio rígido',
  hard_flags: 'Flags de bloqueio',
  clinical_flags: 'Flags clínicas',
  ingredient_class: 'Classe do ingrediente',
  classeIngrediente: 'Classe do ingrediente',
  naoTratarComoCarneMuscular: 'Não tratar como carne muscular',
  requires_drained_weight: 'Requer peso drenado',
  requires_label_verification: 'Requer verificação de rótulo',
  requires_commercial_label_check: 'Requer checagem de rótulo comercial',
  requires_unsalted_version_review: 'Revisar versão sem sal',
  requires_fdc_refresh: 'Requer atualização FDC',
  sodium_interpretation: 'Interpretação de sódio',
  species_mapping_status: 'Mapeamento de espécie',
  regional_variety_status: 'Variedade regional',
  allergen_flag: 'Alerta de alérgeno',
}

const SPECIES_LABELS: Record<FoodItem['speciesScope'], string> = {
  dog: 'Cão',
  cat: 'Gato',
  both: 'Cão e gato',
  unknown: 'Não especificado',
}

const FOOD_TYPE_LABELS: Record<FoodItem['foodType'], string> = {
  commercial: 'Comercial veterinário',
  natural: 'Ingrediente natural / humano',
  suplemento: 'Suplemento',
  enteral: 'Fórmula enteral',
  unknown: 'Não classificado',
}

function humanizeNoteKey(key: string): string {
  if (NOTE_LABELS[key]) return NOTE_LABELS[key]
  return key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatNoteValue(value: string): string {
  if (value === 'true') return 'Sim'
  if (value === 'false') return 'Não'
  return value.replace(/_/g, ' ')
}

export type FoodDetailRow = { label: string; value: string }

export type ParsedFoodNotes = {
  structured: FoodDetailRow[]
  freeText: string[]
  flags: string[]
}

export function parseAllFoodNotes(notes: string[] | undefined): ParsedFoodNotes {
  const structured: FoodDetailRow[] = []
  const freeText: string[] = []
  const flags: string[] = []

  for (const note of notes ?? []) {
    if (!note.includes('=')) {
      freeText.push(note)
      continue
    }
    const eq = note.indexOf('=')
    const key = note.slice(0, eq)
    const value = note.slice(eq + 1)
    if (key === 'flag' || key.startsWith('clinical_flags') || key === 'hard_flags') {
      flags.push(value)
      continue
    }
    structured.push({ label: humanizeNoteKey(key), value: formatNoteValue(value) })
  }

  return { structured, freeText, flags }
}

export function buildFoodIdentityRows(food: FoodItem): FoodDetailRow[] {
  const displayName = getFoodDisplayName(food.name, { id: food.id, foodType: food.foodType })
  const rows: FoodDetailRow[] = [
    { label: 'Nome exibido', value: displayName },
    { label: 'Nome cadastrado', value: food.name },
    { label: 'Identificador', value: food.id },
    { label: 'Slug', value: food.slug },
    { label: 'Categoria', value: food.categoryNormalized ?? food.category ?? '—' },
    { label: 'Apresentação / preparo', value: food.presentation || '—' },
    { label: 'Tipo de alimento', value: FOOD_TYPE_LABELS[food.foodType] ?? food.foodType },
    { label: 'Espécie-alvo', value: SPECIES_LABELS[food.speciesScope] ?? food.speciesScope },
    { label: 'Planilha de origem', value: food.sourceSheet },
    { label: 'Referência', value: food.sourceReference.workbook },
    { label: 'Linha MN / MS', value: `${food.sourceReference.mnRow}${food.sourceReference.msRow != null ? ` / ${food.sourceReference.msRow}` : ''}` },
  ]
  return rows.filter((row) => row.value && row.value !== '—')
}

export function getAllNutrientDefinitions(): NutrientDefinition[] {
  return GENUTRI_NUTRIENT_CATALOG
}

export function getMissingNutrientLabels(food: FoodItem): string[] {
  const byKey = new Map(GENUTRI_NUTRIENT_CATALOG.map((n) => [n.key, n.label]))
  return food.missingNutrients.map((key) => byKey.get(key) ?? key)
}

export function countReportedNutrients(food: FoodItem): { asFed: number; dryMatter: number; catalogTotal: number } {
  const catalogTotal = GENUTRI_NUTRIENT_CATALOG.length
  const asFed = GENUTRI_NUTRIENT_CATALOG.filter(
    (n) => food.nutrientsAsFed[n.key as keyof typeof food.nutrientsAsFed] != null,
  ).length
  const dryMatter = GENUTRI_NUTRIENT_CATALOG.filter(
    (n) => food.nutrientsDryMatter[n.key as keyof typeof food.nutrientsDryMatter] != null,
  ).length
  return { asFed, dryMatter, catalogTotal }
}

export const FOOD_DETAIL_DISCLAIMERS = [
  'Os valores correspondem exatamente à forma de preparo descrita na fonte.',
  'Um alimento cru não possui a mesma composição por 100 g após o cozimento.',
  'Ingredientes isolados não constituem dieta completa e balanceada.',
  'Campos marcados com "—" não foram informados pela fonte (não são zero).',
]
