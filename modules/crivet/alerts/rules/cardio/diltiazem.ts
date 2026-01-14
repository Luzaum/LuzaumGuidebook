import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const diltiazemRules: Rule[] = [
  {
    id: "diltiazem_cardiogenic_black",
    drug: "diltiazem",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("shock_cardiogenic"),
    alert: ({ drug }) => ({
      id: makeAlertId("diltiazem_cardiogenic_black", drug),
      severity: "black",
      score: severityScore.black,
      title: "Choque cardiogênico + Diltiazem = risco de piorar débito (inotropismo negativo)",
      why:
        "Bloqueio de canal de Ca reduz contratilidade e pode agravar baixo débito.",
      do:
        "Evitar em cardiogênico/hipotenso. Se for controle de taquiarritmia supraventricular, considerar alternativas conforme estabilidade.",
      tags: ["negative_inotropy"],
    }),
  },
  {
    id: "diltiazem_brady_or_avblock_red",
    drug: "diltiazem",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("arrhythmia_risk") || comorbidities.has("cardiac_disease"),
    alert: ({ drug }) => ({
      id: makeAlertId("diltiazem_brady_or_avblock_red", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Diltiazem: monitorar bradicardia/AV block e hipotensão",
      why:
        "Pode reduzir condução AV e FC; risco maior em pacientes já vagotônicos ou com doença de condução.",
      do:
        "ECG/PA contínuos durante ajuste. Se bradicardia com hipotensão, reduzir/cessar e reavaliar.",
      tags: ["av_block", "ecg_monitoring"],
    }),
  },
];
