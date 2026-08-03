import type { FoodItem } from '../types'

export const BOOK_FOOD_CATEGORIES = [
  'Dietas comerciais completas',
  'Dietas terapêuticas',
  'Fórmulas enterais',
  'Carnes, vísceras, ovos e pescados',
  'Leite e derivados',
  'Cereais, tubérculos e fontes de amido',
  'Leguminosas e proteínas vegetais',
  'Hortaliças e fontes de fibra',
  'Frutas',
  'Óleos e gorduras',
  'Suplementos minerais e vitamínicos',
  'Outros ingredientes',
] as const

export type BookFoodCategory = typeof BOOK_FOOD_CATEGORIES[number]

function normalizedFoodText(food: FoodItem) {
  return `${food.name} ${food.category ?? ''} ${food.categoryNormalized ?? ''} ${food.presentation ?? ''}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function classifyFoodByBook(food: FoodItem): BookFoodCategory {
  const text = normalizedFoodText(food)
  if (food.foodType === 'enteral') return 'Fórmulas enterais'
  if (food.foodType === 'suplemento') return 'Suplementos minerais e vitamínicos'
  if (food.foodType === 'commercial') {
    return /renal|urinari|urinary|diabet|hepatic|gastro|hipo|hypo|satiety|obes|cardiac|recovery|onc|therapeutic/.test(text)
      ? 'Dietas terapêuticas'
      : 'Dietas comerciais completas'
  }
  if (/oleo|gordura|banha|azeite|manteiga/.test(text)) return 'Óleos e gorduras'
  if (/leite|iogurte|queijo|ricota|coalhada/.test(text)) return 'Leite e derivados'
  if (/carne|frango|peru|peixe|salmao|sardinha|atum|ovo|figado|rim|coracao|viscera/.test(text)) return 'Carnes, vísceras, ovos e pescados'
  if (/arroz|milho|aveia|trigo|cevada|batata|mandioca|inhame|macarrao|farinha|amido/.test(text)) return 'Cereais, tubérculos e fontes de amido'
  if (/feijao|lentilha|ervilha|grao.de.bico|soja/.test(text)) return 'Leguminosas e proteínas vegetais'
  if (/abobora|cenoura|brocol|couve|chuchu|abobrinha|beterraba|fibra|celulose|psyllium/.test(text)) return 'Hortaliças e fontes de fibra'
  if (/banana|maca|pera|mamao|melancia|melao|fruta/.test(text)) return 'Frutas'
  return 'Outros ingredientes'
}

export const BOOK_FOOD_TAXONOMY_SOURCE = {
  title: 'Nutrient Requirements of Dogs and Cats',
  chapters: 'Capítulos 12 e 13 - Diet formulation, feed processing e composição de ingredientes',
  pages: '656-679',
}
