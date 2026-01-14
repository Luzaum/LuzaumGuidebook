import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const dexRules: Rule[] = [
  {
    id: "dex_shock_hypovolemia_black",
    drug: "dexmedetomidine",
    species: "any",
    when: ({ comorbidities, ctx }) =>
      comorbidities.has("hypovolemia_unresolved") ||
      comorbidities.has("shock_hypovolemic") ||
      comorbidities.has("shock_cardiogenic") ||
      (ctx.map !== undefined && ctx.map < 60),
    alert: ({ drug }) => ({
      id: makeAlertId("dex_shock_hypovolemia_black", drug),
      severity: "black",
      score: severityScore.black,
      title: "Hipovolemia/choque + Dexmedetomidina = risco hemodinâmico alto",
      why:
        "Pode causar vasoconstrição periférica + bradicardia → queda de débito cardíaco e piora de perfusão em pacientes instáveis.",
      do:
        "Evitar até estabilizar perfusão. Se uso excepcional: dose muito baixa, titulada, com monitorização intensiva (ECG/PA).",
      tags: ["hemodynamics", "bradycardia"],
    }),
  },
  {
    id: "dex_cardiac_disease_red",
    drug: "dexmedetomidine",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("cardiac_disease") || comorbidities.has("arrhythmia_risk"),
    alert: ({ drug }) => ({
      id: makeAlertId("dex_cardiac_disease_red", drug),
      severity: "red",
      score: severityScore.red,
      title: "Cardiopata/risco de arritmia + Dex: bradicardia/AV block e DC ↓",
      why:
        "Alfa-2 pode reduzir FC e DC; em cardiopatas isso pode precipitar hipotensão e hipoperfusão.",
      do:
        "Evitar em doença cardíaca significativa/instável. Se usar: dose mínima, ECG contínuo e plano de reversão (atipamezol) se necessário.",
      tags: ["ecg_monitoring", "bradycardia"],
    }),
  },
  {
    id: "dex_sepsis_or_distributive_orange",
    drug: "dexmedetomidine",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("sepsis") || comorbidities.has("shock_distributive"),
    alert: ({ drug }) => ({
      id: makeAlertId("dex_sepsis_or_distributive_orange", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Sepse/choque distributivo + Dex: cautela (perfusão primeiro)",
      why:
        "Efeito vasomotor e bradicardia podem reduzir entrega de O₂ se paciente ainda não está bem ressuscitado.",
      do:
        "Se for usar como sedação (ex.: paciente ventilado/agitado), preferir microdoses e reavaliar perfusão (MAP, lactato, diurese).",
      tags: ["perfusion"],
    }),
  },
];
