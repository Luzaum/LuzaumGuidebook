import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const nitroprussideRules: Rule[] = [
  {
    id: "nitroprusside_hypotension_black",
    drug: "nitroprussiato",
    species: "any",
    when: ({ ctx, comorbidities }) =>
      comorbidities.has("shock_hypovolemic") ||
      comorbidities.has("shock_distributive") ||
      comorbidities.has("hypovolemia_unresolved") ||
      (ctx.map !== undefined && ctx.map < 65),
    alert: ({ drug }) => ({
      id: makeAlertId("nitroprusside_hypotension_black", drug),
      severity: "black",
      score: severityScore.black,
      title: "Hipotensão/choque + Nitroprussiato = risco de colapso hemodinâmico",
      why:
        "Vasodilatação potente pode derrubar MAP e perfusão rapidamente.",
      do:
        "Evitar em pacientes instáveis. Se houver indicação (ex.: hipertensão grave com emergência), usar titulação finíssima e monitorização contínua.",
      tags: ["vasodilation", "map"],
    }),
  },
];
