import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const enrofloxacinRules: Rule[] = [
  {
    id: "enro_neonate_pregnant_red",
    drug: "enrofloxacina",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("neonate") || comorbidities.has("pregnant"),
    alert: ({ drug }) => ({
      id: makeAlertId("enro_neonate_pregnant_red", drug),
      severity: "red",
      score: severityScore.red,
      title: "Neonato/gestação + Enrofloxacina: evitar quando possível",
      why:
        "Fluoroquinolonas podem afetar cartilagem em animais em crescimento; em gestação/lactação a decisão deve ser muito bem justificada.",
      do:
        "Evitar por padrão; se uso for inevitável, registrar justificativa e preferir alternativa segura quando houver.",
      tags: ["developmental_risk"],
    }),
  },
  {
    id: "enro_ckd_orange",
    drug: "enrofloxacina",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("ckd") || comorbidities.has("aki"),
    alert: ({ drug }) => ({
      id: makeAlertId("enro_ckd_orange", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "DRC/IRA + Enrofloxacina: cautela e reavaliar dose/intervalo",
      why:
        "Disfunção renal pode alterar exposição e aumentar risco de efeitos adversos; precisa de dose/intervalo ajustados ao paciente.",
      do:
        "Revisar ajuste por função renal e monitorar resposta/EA. Preferir cultura/antibiograma quando possível.",
      tags: ["renal_adjustment"],
    }),
  },
];
