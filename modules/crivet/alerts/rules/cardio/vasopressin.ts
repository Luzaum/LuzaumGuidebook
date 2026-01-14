import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const vasopressinRules: Rule[] = [
  {
    id: "vaso_hypovolemia_black",
    drug: "vasopressin",
    species: "any",
    when: ({ comorbidities }) =>
      comorbidities.has("hypovolemia_unresolved") || comorbidities.has("shock_hypovolemic"),
    alert: ({ drug }) => ({
      id: makeAlertId("vaso_hypovolemia_black", drug),
      severity: "black",
      score: severityScore.black,
      title: "Hipovolemia não corrigida + Vasopressina = risco de isquemia periférica/visceral",
      why:
        "Vasoconstrição adicional em paciente com pouco volume pode piorar entrega de O₂ e causar vasoespasmo em leitos vulneráveis.",
      do:
        "Não iniciar antes de otimizar volume/perfusão. Se uso inevitável, dose mínima e vigilância estreita de perfusão periférica e GI.",
      tags: ["ischemia_risk", "perfusion"],
    }),
  },
  {
    id: "vaso_distributive_orange",
    drug: "vasopressin",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("shock_distributive") || comorbidities.has("sepsis"),
    alert: ({ drug }) => ({
      id: makeAlertId("vaso_distributive_orange", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Sepse/vasoplegia + Vasopressina: útil como adjuvante, mas monitorar isquemia",
      why:
        "Pode reduzir necessidade de catecolamina e ajudar em vasoplegia refratária; porém aumenta risco de hipoperfusão regional.",
      do:
        "Usar como adjuvante quando norepi escalando. Monitorar perfusão, lactato, mucosas, extremidades e sinais GI.",
      tags: ["catecholamine_sparing"],
    }),
  },
];
