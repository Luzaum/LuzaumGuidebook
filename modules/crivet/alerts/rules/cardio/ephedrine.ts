import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const ephedrineRules: Rule[] = [
  {
    id: "ephedrine_cardiac_red",
    drug: "efedrina",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("cardiac_disease") || comorbidities.has("arrhythmia_risk"),
    alert: ({ drug }) => ({
      id: makeAlertId("ephedrine_cardiac_red", drug),
      severity: "red",
      score: severityScore.red,
      title: "Cardiopata/risco de arritmia + Efedrina = risco alto de taquicardia/ectopia",
      why:
        "Ação simpaticomimética aumenta FC, contratilidade e demanda de O₂; pode descompensar cardiopatas e precipitar arritmias.",
      do:
        "Preferir correção de causa da hipotensão e agentes tituláveis (norepi/dobutamina) conforme fenótipo. Se usar: dose mínima e ECG/PA.",
      tags: ["tachycardia"],
    }),
  },
];
