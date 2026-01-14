import { evaluateAlerts } from "./engine";
import { ALL_RULES } from "./rules";
import type { DrugKey, ComorbidityKey, PatientContext, Alert } from "./types";

/**
 * Função principal para obter alertas de comorbidades para uma droga específica.
 * 
 * @param drug - Identificador da droga (ex: "midazolam", "lidocaine_cri")
 * @param comorbidities - Lista de comorbidades do paciente
 * @param ctx - Contexto do paciente (espécie, parâmetros clínicos, flags)
 * @returns Lista de alertas ordenada por severidade (score decrescente)
 */
export function getDrugComorbidityAlerts(
  drug: DrugKey,
  comorbidities: ComorbidityKey[],
  ctx: PatientContext
): Alert[] {
  return evaluateAlerts({ drug, comorbidities, ctx, rules: ALL_RULES });
}

// Re-exportar tipos e funções principais
export type { Alert, DrugKey, ComorbidityKey, PatientContext, Rule, Severity, Species } from "./types";
export { evaluateAlerts } from "./engine";
export { ALL_RULES } from "./rules";
export { severityScore, makeAlertId } from "./scoring";
