import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

const VASOACTIVES = new Set([
  "norepinephrine",
  "vasopressin",
  "dopamine",
  "efedrina",
  "dobutamina",
] as const);

export const globalVasoactiveRules: Rule[] = [
  {
    id: "vasoactive_no_perf_targets_orange",
    drug: "any",
    species: "any",
    when: ({ drug, ctx }) =>
      VASOACTIVES.has(drug as any) &&
      ctx.map === undefined &&
      ctx.lactate === undefined,
    alert: ({ drug }) => ({
      id: makeAlertId("vasoactive_no_perf_targets_orange", drug),
      severity: "yellow",
      score: severityScore.yellow,
      title: "Vasoativo sem alvo de perfusão registrado: risco de “tratar número”",
      why:
        "Sem MAP/lactato/diurese, aumenta chance de sub ou supertitular e perder perfusão real.",
      do:
        "Registrar pelo menos MAP e um marcador de perfusão (lactato/diurese/tempo de preenchimento capilar) para orientar titulação.",
      tags: ["monitoring"],
    }),
  },
];
