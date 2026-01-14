import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const comboRules: Rule[] = [
  {
    id: "mlk_cat_red_default",
    drug: "mlk",
    species: "cat",
    when: () => true,
    alert: ({ drug }) => ({
      id: makeAlertId("mlk_cat_red_default", drug),
      severity: "red",
      score: severityScore.red,
      title: "MLK em gato: risco alto (principalmente por lidocaína sistêmica)",
      why:
        "No combo, o componente mais limitante em gatos costuma ser a lidocaína sistêmica.",
      do:
        "Evitar por padrão. Se for fazer “MLK-like”, construir multimodal sem lidocaína sistêmica ou com protocolo alternativo bem justificado.",
      tags: ["species_sensitivity"],
    }),
  },
  {
    id: "flk_cat_orange",
    drug: "flk",
    species: "cat",
    when: () => true,
    alert: ({ drug }) => ({
      id: makeAlertId("flk_cat_orange", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "FLK em gato: cautela (lidocaína + depressão respiratória por opioide)",
      why:
        "Somatório de riscos: lidocaína sistêmica + opioide → atenção redobrada em ventilação/perfusão.",
      do:
        "Se usar, microtitulagem e monitorização contínua. Considerar versões modificadas do combo.",
      tags: ["resp_depression", "neurotoxicity"],
    }),
  },
];
