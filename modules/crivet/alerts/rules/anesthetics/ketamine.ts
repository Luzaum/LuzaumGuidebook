import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const ketamineRules: Rule[] = [
  {
    id: "ketamine_cardiac_or_arrhythmia_orange",
    drug: "ketamine",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("cardiac_disease") || comorbidities.has("arrhythmia_risk"),
    alert: ({ drug }) => ({
      id: makeAlertId("ketamine_cardiac_or_arrhythmia_orange", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Cardiopata/risco de arritmia + Cetamina: pode aumentar demanda miocárdica",
      why:
        "Estimulação simpática pode elevar FC/PA e consumo de O₂ do miocárdio, potencialmente piorando isquemia/arrítmias em alguns cardiopatas.",
      do:
        "Evitar em cardiopatia instável. Se benefício superar risco (analgesia/hipotensão), usar dose baixa titulada + monitorização (ECG/PA).",
      tags: ["sympathomimetic", "ecg_monitoring"],
    }),
  },
  {
    id: "ketamine_increased_icp_caution",
    drug: "ketamine",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("increased_icp") || comorbidities.has("head_trauma"),
    alert: ({ drug }) => ({
      id: makeAlertId("ketamine_increased_icp_caution", drug),
      severity: "yellow",
      score: severityScore.yellow,
      title: "TCE/ICP ↑: Cetamina = usar com critério e ventilação adequada",
      why:
        "Dependendo do cenário (CO₂, ventilação, sedação associada), pode haver preocupação com hemodinâmica cerebral; o risco é mais relevante se hipoventilar e subir CO₂.",
      do:
        "Se usar: garantir ventilação/controle de CO₂ e analgesia/sedação adequada. Monitorar neurológico e perfusão.",
      tags: ["neuro", "ventilation"],
    }),
  },
  {
    id: "ketamine_hypovolemia_green_note",
    drug: "ketamine",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("hypovolemia_unresolved") || comorbidities.has("shock_hypovolemic"),
    alert: ({ drug }) => ({
      id: makeAlertId("ketamine_hypovolemia_green_note", drug),
      severity: "green",
      score: severityScore.green,
      title: "Hipovolemia/choque: Cetamina pode preservar PA melhor que indutores vasodilatadores",
      why:
        "Em muitos pacientes, tende a manter tônus simpático relativo, ajudando a evitar quedas abruptas de PA (ainda depende do estado catecolamínico do paciente).",
      do:
        "Não é “garantia”. Use dose baixa titulada, trate a causa do choque e monitore PA/perfusão.",
      tags: ["hemodynamics"],
    }),
  },
];
