import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const dopamineRules: Rule[] = [
  {
    id: "dopamine_arrhythmia_red",
    drug: "dopamine",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("arrhythmia_risk") || comorbidities.has("cardiac_disease"),
    alert: ({ drug }) => ({
      id: makeAlertId("dopamine_arrhythmia_red", drug),
      severity: "red",
      score: severityScore.red,
      title: "Cardiopata/risco de arritmia + Dopamina = maior risco de taquiarritmia",
      why:
        "Efeito β/α dose-dependente pode aumentar FC e ectopia, principalmente em miocárdio irritável.",
      do:
        "Preferir norepinefrina (vasoplegia) ou dobutamina (baixo débito) conforme fenótipo. Se usar dopamina: ECG contínuo e dose mínima eficaz.",
      tags: ["tachyarrhythmia"],
    }),
  },
  {
    id: "dopamine_hypovolemia_black",
    drug: "dopamine",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("hypovolemia_unresolved"),
    alert: ({ drug }) => ({
      id: makeAlertId("dopamine_hypovolemia_black", drug),
      severity: "black",
      score: severityScore.black,
      title: "Hipovolemia não corrigida + Dopamina: pode mascarar choque e piorar perfusão",
      why:
        "Aumentar catecolamina sem volume efetivo pode piorar microcirculação e consumo miocárdico de O₂.",
      do:
        "Otimizar volume/perfusão primeiro. Se precisar amina: escolher baseada no tipo de choque e monitorar resposta real (lactato/diurese).",
      tags: ["shock"],
    }),
  },
];
