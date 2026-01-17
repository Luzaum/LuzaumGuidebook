/**
 * SISTEMA UNIFICADO DE ALERTAS
 * 
 * Agora lê alertas APENAS do NormalizedDrug.alerts (que vem do DrugProfile).
 * Sistema legado (logic/alerts/*Rules.ts) será removido após migração completa.
 */

import type { PatientFlag, DrugPatientAlert, AlertLevel } from '../types/patientFlags'
import type { NormalizedDrug } from '../models/normalizedDrug'
import { getDrug } from '../services/getDrug'

// ⚠️ DEPRECATED: Mantido temporariamente para compatibilidade durante migração
// Será removido quando todos os fármacos tiverem alertas no DrugProfile
import { MIDAZOLAM_RULES } from '../logic/alerts/midazolamRules'
import { FENTANYL_RULES } from '../logic/alerts/fentanylRules'
import { REMIFENTANIL_RULES } from '../logic/alerts/remifentanilRules'
import { KETAMINE_RULES } from '../logic/alerts/ketamineRules'
import { LIDOCAINE_RULES } from '../logic/alerts/lidocaineRules'
import { DEXMEDETOMIDINE_RULES } from '../logic/alerts/dexmedetomidineRules'
import { METOCLOPRAMIDE_RULES } from '../logic/alerts/metoclopramideRules'

const LEGACY_DRUG_RULES: Array<{ drugId: string; when: PatientFlag[]; alert: Omit<DrugPatientAlert, 'id'> }> = [
  ...MIDAZOLAM_RULES,
  ...FENTANYL_RULES,
  ...REMIFENTANIL_RULES,
  ...KETAMINE_RULES,
  ...LIDOCAINE_RULES,
  ...DEXMEDETOMIDINE_RULES,
  ...METOCLOPRAMIDE_RULES,
]

/**
 * Avalia alertas de um fármaco baseado nas flags do paciente
 * 
 * NOVO: Lê alertas do NormalizedDrug.alerts (DrugProfile)
 * FALLBACK: Usa sistema legado se fármaco não tem alertas no perfil
 */
export function evaluateDrugAlerts(params: { drugId: string; flags: PatientFlag[] }): DrugPatientAlert[] {
  const { drugId, flags } = params

  // 1. Tentar obter alertas do NormalizedDrug (sistema novo)
  try {
    const drug = getDrug(drugId)
    
    if (drug.alerts && drug.alerts.rules.length > 0) {
      // Usar sistema novo - alertas do DrugProfile
      const matches = drug.alerts.rules
        .filter((rule) => rule.when.every((f) => flags.includes(f as PatientFlag)))
        .map((rule, idx) => ({
          id: `${drugId}-${idx}`,
          level: rule.level as AlertLevel,
          title: rule.title,
          short: rule.short,
          why: rule.why,
          actions: rule.actions,
        }))

      // Ordenar por severidade
      const order: Record<AlertLevel, number> = { critical: 0, warning: 1, info: 2 }
      return matches.sort((a, b) => order[a.level] - order[b.level])
    }
  } catch (error) {
    console.warn(`Erro ao obter alertas do perfil para ${drugId}:`, error)
  }

  // 2. FALLBACK: Sistema legado (será removido após migração completa)
  const legacyMatches = LEGACY_DRUG_RULES.filter((r) => r.drugId === drugId)
    .filter((r) => r.when.every((f) => flags.includes(f)))
    .map((r, idx) => ({ id: `${drugId}-legacy-${idx}`, ...r.alert }))

  // Ordenar por severidade
  const order: Record<AlertLevel, number> = { critical: 0, warning: 1, info: 2 }
  return legacyMatches.sort((a, b) => order[a.level] - order[b.level])
}
