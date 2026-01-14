import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const dobutamineRules: Rule[] = [
  {
    id: "dobu_arrhythmia_orange",
    drug: "dobutamina",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("arrhythmia_risk"),
    alert: ({ drug }) => ({
      id: makeAlertId("dobu_arrhythmia_orange", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Risco de arritmia + Dobutamina: pode precipitar taquiarritmias",
      why:
        "Inotrópico β1 pode aumentar automaticidade e consumo de O₂ do miocárdio.",
      do:
        "ECG contínuo, começar baixo e titular. Se taquiarritmia piorar, reduzir/cessar e reavaliar estratégia.",
      tags: ["ecg_monitoring"],
    }),
  },
  {
    id: "dobu_hypotension_orange",
    drug: "dobutamina",
    species: "any",
    when: ({ ctx }) => ctx.map !== undefined && ctx.map < 60,
    alert: ({ drug }) => ({
      id: makeAlertId("dobu_hypotension_orange", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "MAP baixa + Dobutamina: pode piorar hipotensão (vasodilatação β2)",
      why:
        "Alguns pacientes caem MAP com dobutamina por vasodilatação relativa, apesar de melhorar débito.",
      do:
        "Se MAP muito baixa, considerar norepi associado (fenótipo: baixo débito + vasoplegia) e titular com PA invasiva se possível.",
      tags: ["hemodynamics"],
    }),
  },
];
