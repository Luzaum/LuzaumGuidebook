import type { PatientFlag, DrugPatientAlert, DrugRule, AlertLevel } from '../types/patientFlags'
import { MIDAZOLAM_RULES } from '../logic/alerts/midazolamRules'
import { FENTANYL_RULES } from '../logic/alerts/fentanylRules'
import { REMIFENTANIL_RULES } from '../logic/alerts/remifentanilRules'
import { KETAMINE_RULES } from '../logic/alerts/ketamineRules'
import { LIDOCAINE_RULES } from '../logic/alerts/lidocaineRules'
import { DEXMEDETOMIDINE_RULES } from '../logic/alerts/dexmedetomidineRules'
import { METOCLOPRAMIDE_RULES } from '../logic/alerts/metoclopramideRules'

export const DRUG_RULES: DrugRule[] = [
  ...MIDAZOLAM_RULES,
  ...FENTANYL_RULES,
  ...REMIFENTANIL_RULES,
  ...KETAMINE_RULES,
  ...LIDOCAINE_RULES,
  ...DEXMEDETOMIDINE_RULES,
  ...METOCLOPRAMIDE_RULES,
]

export function evaluateDrugAlerts(params: { drugId: string; flags: PatientFlag[] }): DrugPatientAlert[] {
  const { drugId, flags } = params

  const matches = DRUG_RULES.filter((r) => r.drugId === drugId)
    .filter((r) => r.when.every((f) => flags.includes(f)))
    .map((r, idx) => ({ id: `${drugId}-${idx}`, ...r.alert }))

  // Ordenar por severidade
  const order: Record<AlertLevel, number> = { critical: 0, warning: 1, info: 2 }
  return matches.sort((a, b) => order[a.level] - order[b.level])
}
