import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const esmololRules: Rule[] = [
  {
    id: "esmolol_shock_black",
    drug: "esmolol",
    species: "any",
    when: ({ comorbidities, ctx }) =>
      comorbidities.has("shock_cardiogenic") ||
      comorbidities.has("shock_hypovolemic") ||
      comorbidities.has("hypovolemia_unresolved") ||
      (ctx.map !== undefined && ctx.map < 65),
    alert: ({ drug }) => ({
      id: makeAlertId("esmolol_shock_black", drug),
      severity: "black",
      score: severityScore.black,
      title: "Instabilidade/choque + Esmolol = pode derrubar débito e perfusão",
      why:
        "Beta-bloqueio reduz FC/contratilidade; em choque pode precipitar colapso.",
      do:
        "Evitar se perfusão não estiver segura. Se taquiarritmia ameaça vida, usar com monitorização invasiva e titulação micro.",
      tags: ["negative_inotropy", "map"],
    }),
  },
  {
    id: "esmolol_resp_disease_orange",
    drug: "esmolol",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("resp_disease"),
    alert: ({ drug }) => ({
      id: makeAlertId("esmolol_resp_disease_orange", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Doença respiratória/broncoespasmo + beta-bloqueador: cautela",
      why:
        "Mesmo sendo mais β1, pode piorar broncoconstrição em pacientes suscetíveis.",
      do:
        "Preferir estratégias alternativas se broncoespasmo ativo. Monitorar padrão respiratório e oxigenação.",
      tags: ["bronchospasm_risk"],
    }),
  },
];
