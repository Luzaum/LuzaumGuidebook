/**
 * PONTO ÚNICO DE ACESSO A FÁRMACOS
 * 
 * Esta é a ÚNICA forma de acessar dados de fármacos no CRIVET.
 * UI nunca deve ler data/drugs.ts diretamente.
 * 
 * Pipeline: DrugProfile (registry) -> normalizeDrug -> NormalizedDrug
 */

import { getDrugProfile } from '../utils/drugProfileRegistry'
import { normalizeDrug } from './normalizeDrug'
import type { NormalizedDrug } from '../models/normalizedDrug'

// Cache de fármacos normalizados
const normalizedCache = new Map<string, NormalizedDrug>()

/**
 * Obtém um fármaco normalizado pelo ID
 * 
 * @param drugId - ID do fármaco (ex: 'fentanil', 'insulina_regular')
 * @returns NormalizedDrug - sempre retorna um objeto válido, nunca null
 * 
 * @throws Error se drugId não for fornecido
 */
export function getDrug(drugId: string): NormalizedDrug {
  if (!drugId || typeof drugId !== 'string') {
    throw new Error(`getDrug: drugId deve ser uma string não vazia. Recebido: ${drugId}`)
  }

  // Verificar cache
  if (normalizedCache.has(drugId)) {
    return normalizedCache.get(drugId)!
  }

  // Carregar perfil do registry
  const profile = getDrugProfile(drugId)

  if (!profile) {
    // Se não existe perfil, normalizar um objeto vazio para obter defaults
    // Isso garante que UI nunca receba null/undefined e sempre tenha dados úteis
    const emptyProfile = {
      drug_id: drugId,
      name_pt: `Fármaco ${drugId}`,
      name_en: '',
      class: [],
    }
    
    const fallback = normalizeDrug(emptyProfile)
    normalizedCache.set(drugId, fallback)
    return fallback
  }

  // Normalizar o perfil
  try {
    const normalized = normalizeDrug(profile)
    
    // Garantir que ID está correto
    normalized.id = drugId
    
    // Cachear resultado
    normalizedCache.set(drugId, normalized)
    
    return normalized
  } catch (error) {
    console.error(`Erro ao normalizar fármaco ${drugId}:`, error)
    
    // Em caso de erro, tentar normalizar com dados mínimos do profile
    // normalizeDrug já garante defaults, então isso deve funcionar
    try {
      const minimalProfile = {
        drug_id: drugId,
        name_pt: profile.name_pt || `Fármaco ${drugId}`,
        name_en: profile.name_en || '',
        class: profile.class || [],
        core_concepts: {
          taglines: profile.core_concepts?.taglines || [`Fármaco ${drugId}`],
        },
      }
      
      const fallback = normalizeDrug(minimalProfile)
      // Adicionar seção de erro ao help drawer
      fallback.helpDrawer.sections.push({
        title: 'Aviso',
        content: [`Erro ao processar alguns dados do perfil: ${String(error)}`],
      })
      
      normalizedCache.set(drugId, fallback)
      return fallback
    } catch (fallbackError) {
      // Se até o fallback falhar, usar objeto mínimo
      const minimal = normalizeDrug({
        drug_id: drugId,
        name_pt: `Fármaco ${drugId}`,
      })
      normalizedCache.set(drugId, minimal)
      return minimal
    }
  }
}

/**
 * Lista todos os IDs de fármacos disponíveis
 * 
 * @returns Array de drugIds
 */
export function getAllDrugIds(): string[] {
  // Importar registry dinamicamente para evitar circular dependency
  const { drugs } = require('../data/drugs')
  return drugs.map((drug: { id: string }) => drug.id)
}

/**
 * Verifica se um fármaco existe
 */
export function hasDrug(drugId: string): boolean {
  const profile = getDrugProfile(drugId)
  return profile !== null
}

/**
 * Limpa o cache (útil para testes ou reload de dados)
 */
export function clearDrugCache(): void {
  normalizedCache.clear()
}
