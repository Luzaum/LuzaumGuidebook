/**
 * Léxico PT↔EN para busca de alimentos comerciais no catálogo.
 * Rações permanecem com nome original (EN); a busca expande sinônimos PT.
 */

import { FOOD_DISPLAY_NAME_OVERRIDES } from './foodDisplayNameOverrides'
import type { FoodItem } from '../types'

/** Normaliza: minúsculas, sem acentos, espaços colapsados. */
export function normalizeFoodSearchText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export type FoodDisplayContext = {
  id?: string
  foodType?: FoodItem['foodType']
}

/**
 * Grupos de sinônimos PT↔EN para busca inteligente.
 * Cada termo do grupo encontra os demais na pesquisa.
 */
const SYNONYM_GROUPS: string[][] = [
  ['recovery', 'recuperacao', 'convalescencia', 'convalescence'],
  ['digestive', 'digestivo', 'digestao', 'gastrointestinal', 'intestinal'],
  ['kidney', 'renal', 'rim', 'kd'],
  ['urinary', 'urinario', 'urina', 'ud', 'urologico', 'trato'],
  ['hepatic', 'hepatico', 'figado'],
  ['obesity', 'obesidade', 'sobrepeso', 'emagrecimento', 'overweight'],
  ['diabetic', 'diabetes', 'diabetico', 'glicemia', 'metabolic'],
  ['hypoallergenic', 'hipoalergenico', 'anallergenic', 'anallergenico', 'ultrahypo', 'hidrolisado', 'hydrolyzed', 'hydrolized'],
  ['satiety', 'saciedade'],
  ['weight', 'peso', 'light', 'management', 'controle', 'manejo'],
  ['care', 'cuidado', 'cuidados'],
  ['chicken', 'frango', 'galinha'],
  ['turkey', 'peru'],
  ['tuna', 'atum'],
  ['salmon', 'salmao'],
  ['lamb', 'cordeiro'],
  ['boar', 'javali'],
  ['puppy', 'filhote', 'filhotes'],
  ['kitten', 'filhote', 'filhotes'],
  ['adult', 'adulto', 'adultos'],
  ['mother', 'baby', 'mae', 'filhote', 'filhotes'],
  ['sterilised', 'sterilized', 'castrado', 'castrados', 'neutered', 'castrados'],
  ['senior', 'idoso', 'idosos', 'ageing'],
  ['sensitive', 'sensivel', 'sensibilidade', 'sensitivities'],
  ['mobility', 'mobilidade', 'articular', 'joint'],
  ['oncology', 'oncologico', 'onc', 'cancer'],
  ['cardiac', 'cardiaco', 'cardiaca', 'coracao'],
  ['struvite', 'estruvita'],
  ['pate', 'patê', 'mousse'],
  ['sache', 'sachê', 'umido', 'umida', 'wet'],
  ['stew', 'ensopado', 'molho', 'gravy'],
  ['canned', 'lata', 'enlatado'],
  ['dog', 'cao', 'caes', 'canine', 'canino'],
  ['cat', 'gato', 'gatos', 'feline', 'felino'],
  ['racao', 'racoes', 'racao', 'ração', 'rações', 'commercial'],
  ['seco', 'seca', 'dry'],
  ['premier', 'premierpet'],
  ['hills', 'hill'],
  ['royal', 'canin', 'royalcanin'],
  ['farmina', 'nd', 'vetlife', 'vet', 'life'],
  ['guabi', 'natural'],
  ['purina', 'proplan', 'chow'],
  ['organic', 'organico', 'organica'],
  ['quinoa', 'quinoa'],
  ['pomegranate', 'roma'],
  ['blueberry', 'mirtilo'],
  ['cranberry', 'oxicoco'],
  ['perfect', 'perfeita', 'perfeito'],
  ['hairball', 'bolas', 'pelo', 'bolinha'],
  ['multi', 'multibeneficios', 'multicare'],
  ['urgent', 'urgente', 'urgencia', 'critical'],
  ['low', 'baixo', 'baixa', 'reduzido', 'fat', 'gordura'],
  ['fiber', 'fibra', 'fibras', 'fibre', 'response'],
  ['protein', 'proteina', 'hidrolisada'],
  ['grain', 'free', 'sem', 'graos'],
  ['coat', 'pelagem', 'pele', 'skin'],
  ['fish', 'peixe'],
  ['pork', 'suino', 'suíno'],
  ['potato', 'batata'],
  ['duck', 'pato'],
  ['shrimp', 'camarao', 'camarão'],
  ['sardine', 'sardinha'],
  ['apple', 'maca', 'maçã'],
  ['lentil', 'lentilha'],
  ['cod', 'bacalhau'],
  ['whiting', 'pescada', 'merluza'],
  ['catfish', 'bagre'],
  ['prescription', 'prescricao', 'prescrição', 'diet', 'dieta', 'diets'],
  ['veterinary', 'veterinaria', 'veterinária', 'veterinario'],
  ['formula', 'formulas', 'formula'],
  ['support', 'suporte'],
  ['special', 'especial'],
]

const synonymIndex = new Map<string, Set<string>>()

for (const group of SYNONYM_GROUPS) {
  const normalized = group.map((term) => normalizeFoodSearchText(term))
  const expanded = new Set(normalized)
  for (const term of normalized) {
    synonymIndex.set(term, expanded)
  }
}

/** Expande um token de busca com sinônimos PT/EN. */
export function expandSearchToken(token: string): string[] {
  const normalized = normalizeFoodSearchText(token)
  const group = synonymIndex.get(normalized)
  if (!group) return [normalized]
  return Array.from(group)
}

/** Substituições PT para indexação de busca (não alteram exibição de rações). */
const SEARCH_TERM_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bMother and Baby Cat\b/gi, 'Mãe e Filhote Gato'],
  [/\bMother and Baby\b/gi, 'Mãe e Filhote'],
  [/\bFood Sensitivities\b/gi, 'Sensibilidades Alimentares'],
  [/\bHydrolized protein\b/gi, 'Proteína Hidrolisada'],
  [/\bHydrolyzed protein\b/gi, 'Proteína Hidrolisada'],
  [/\bDigestive Care\b/gi, 'Cuidado Digestivo'],
  [/\bCare Digestive\b/gi, 'Cuidado Digestivo'],
  [/\bKidney Care\b/gi, 'Cuidado Renal'],
  [/\bUrinary Care\b/gi, 'Cuidado Urinário'],
  [/\bJoint Care\b/gi, 'Cuidado Articular'],
  [/\bCoat Care\b/gi, 'Cuidado de Pelagem'],
  [/\bOnc Care\b/gi, 'Cuidado Oncológico'],
  [/\bCritical Care\b/gi, 'Cuidados Críticos'],
  [/\bUrgent Care\b/gi, 'Cuidados Urgentes'],
  [/\bWeight Management\b/gi, 'Controle de Peso'],
  [/\bOverweight Management\b/gi, 'Controle de Sobrepeso'],
  [/\bLight Weight Care\b/gi, 'Controle de Peso'],
  [/\bLow Fat\b/gi, 'Baixo Teor de Gordura'],
  [/\bGrain Free\b/gi, 'Sem Grãos'],
  [/\bSkin & Coat\b/gi, 'Pele e Pelagem'],
  [/\bHypoallergenic\b/gi, 'Hipoalergênico'],
  [/\bHydrolyzed\b/gi, 'Hidrolisado'],
  [/\bRecovery\b/gi, 'Recuperação'],
  [/\bUrinary\b/gi, 'Urinário'],
  [/\bGastrointestinal\b/gi, 'Gastrointestinal'],
  [/\bObesity\b/gi, 'Obesidade'],
  [/\bDiabetic\b/gi, 'Diabético'],
  [/\bPuppy\b/gi, 'Filhote'],
  [/\bKitten\b/gi, 'Filhote'],
  [/\bAdult\b/gi, 'Adulto'],
  [/\bChicken\b/gi, 'Frango'],
  [/\bTurkey\b/gi, 'Peru'],
  [/\bTuna\b/gi, 'Atum'],
  [/\bSalmon\b/gi, 'Salmão'],
  [/\bLamb\b/gi, 'Cordeiro'],
  [/\bFeline\b/gi, 'Felino'],
  [/\bCanine\b/gi, 'Canino'],
  [/\bfeline\b/g, 'felino'],
  [/\bcanine\b/g, 'canino'],
  [/\bCod\b/gi, 'Bacalhau'],
  [/\bWhiting\b/gi, 'Pescada-branca'],
  [/\bCatfish\b/gi, 'Bagre'],
  [/\bPrescription Diet\b/gi, 'Dieta Prescrição'],
  [/\bPomegranate\b/gi, 'Romã'],
  [/\bBlueberry\b/gi, 'Mirtilo'],
  [/\bCranberry\b/gi, 'Oxicoco'],
  [/\bBeef\b/gi, 'Bovino'],
  [/\bPork\b/gi, 'Suíno'],
  [/\bDuck\b/gi, 'Pato'],
  [/\bRabbit\b/gi, 'Coelho'],
  [/\bVenison\b/gi, 'Cervo'],
  [/\bWet\b/gi, 'Úmido'],
  [/\bDry\b/gi, 'Seco'],
  [/\bwith\b/gi, 'com'],
  [/\band\b/gi, 'e'],
  [/\bfor\b/gi, 'para'],
  [/\s&\s/g, ' e '],
]

function applySearchTermReplacements(name: string): string {
  let result = name
  for (const [pattern, replacement] of SEARCH_TERM_REPLACEMENTS) {
    result = result.replace(pattern, replacement)
  }
  return result
}

function resolveContext(context?: string | FoodDisplayContext): FoodDisplayContext | undefined {
  if (typeof context === 'string') return { id: context }
  return context
}

function resolveTranslatedName(name: string, context?: FoodDisplayContext): string {
  if (context?.id && FOOD_DISPLAY_NAME_OVERRIDES[context.id]) {
    return FOOD_DISPLAY_NAME_OVERRIDES[context.id]
  }
  return applySearchTermReplacements(name)
}

/** Nome exibido na UI — sempre em português do Brasil quando possível. */
export function getFoodDisplayName(name: string, context?: string | FoodDisplayContext): string {
  return resolveTranslatedName(name, resolveContext(context))
}

/** Alias PT usados só na indexação de busca (inclui rações em EN). */
export function getFoodSearchAliases(name: string, context?: FoodDisplayContext): string {
  return resolveTranslatedName(name, context)
}

/** Monta haystack expandido para busca (nome + campos + sinônimos PT/EN). */
export function buildFoodSearchHaystack(parts: string[]): string {
  const base = normalizeFoodSearchText(parts.filter(Boolean).join(' '))
  const tokens = base.split(' ').filter(Boolean)
  const expanded = new Set<string>(tokens)

  for (const token of tokens) {
    for (const synonym of expandSearchToken(token)) {
      expanded.add(synonym)
    }
  }

  return [base, ...expanded].join(' ')
}

/** Haystack completo de um alimento — base para busca inteligente bilíngue. */
export function buildFoodSearchHaystackForFood(
  food: Pick<FoodItem, 'name' | 'id' | 'category' | 'categoryNormalized' | 'presentation' | 'foodType' | 'notes'>,
): string {
  const context: FoodDisplayContext = { id: food.id, foodType: food.foodType }
  const typeHints =
    food.foodType === 'commercial'
      ? 'racao ração patê pate sachê sache umido seco commercial'
      : food.foodType === 'natural'
        ? 'natural ingrediente humano'
        : food.foodType ?? ''

  return buildFoodSearchHaystack([
    food.name,
    getFoodSearchAliases(food.name, context),
    food.category,
    food.categoryNormalized,
    food.presentation,
    food.foodType,
    typeHints,
    ...(food.notes ?? []),
  ])
}

/** Verifica se todos os tokens da query casam (com sinônimos PT/EN). */
export function foodSearchTokensMatch(query: string, haystack: string): boolean {
  const tokens = normalizeFoodSearchText(query).split(' ').filter(Boolean)
  if (!tokens.length) return true

  return tokens.every((token) => {
    const forms = expandSearchToken(token)
    return forms.some((form) => haystack.includes(form))
  })
}
