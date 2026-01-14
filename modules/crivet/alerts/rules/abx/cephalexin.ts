import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const cephalexinRules: Rule[] = [
  {
    id: "cephalexin_renal_yellow",
    drug: "cefalexina",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("ckd") || comorbidities.has("aki"),
    alert: ({ drug }) => ({
      id: makeAlertId("cephalexin_renal_yellow", drug),
      severity: "yellow",
      score: severityScore.yellow,
      title: "DRC/IRA + Cefalexina: pode precisar ajuste de intervalo",
      why:
        "Alterações de depuração podem exigir ajuste para evitar acúmulo e desconforto GI.",
      do:
        "Revisar dose/intervalo e monitorar tolerância GI e evolução clínica.",
      tags: ["renal_adjustment"],
    }),
  },
];
