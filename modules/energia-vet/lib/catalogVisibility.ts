import type { FoodItem } from '../types'

function noteValue(notes: string[] | undefined, prefix: string): string | null {
  const hit = notes?.find((n) => n.startsWith(`${prefix}=`))
  return hit ? hit.slice(prefix.length + 1) : null
}

function hasNote(notes: string[] | undefined, token: string): boolean {
  return notes?.includes(token) ?? false
}

/** Alimento oculto do catálogo de seleção (permanece no dataset para auditoria). */
export function isFoodCatalogHidden(food: Pick<FoodItem, 'id' | 'notes' | 'foodType'>): boolean {
  const notes = food.notes ?? []

  if (hasNote(notes, 'catalog_hidden=true')) return true
  if (hasNote(notes, 'hard_block=true')) return true

  const clinicalStatus = noteValue(notes, 'clinical_use_status')
  if (clinicalStatus === 'blocked' || clinicalStatus === 'blocked_pending_data') return true

  const vetClass = noteValue(notes, 'classificacao_veterinaria')
  if (vetClass === 'bloqueado_toxico' || vetClass === 'bloqueado_produto_processado' || vetClass === 'bloqueado_preparo_inadequado') {
    return true
  }

  // Lote FNDDS em inglês — não comercializado como ingrediente BR típico
  if (food.id.startsWith('usda-fndds-')) return true

  return false
}

/** Visível na busca/seleção de alimentos do NutriçãoVET. */
export function isFoodCatalogVisible(food: Pick<FoodItem, 'id' | 'notes' | 'foodType'>): boolean {
  return !isFoodCatalogHidden(food)
}
