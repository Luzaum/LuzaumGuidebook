import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const maropitantRules: Rule[] = [
  {
    id: "maropitant_hepatic_yellow",
    drug: "maropitant",
    species: "any",
    when: ({ comorbidities }) =>
      comorbidities.has("hepatic_dysfunction") || comorbidities.has("portosystemic_shunt"),
    alert: ({ drug }) => ({
      id: makeAlertId("maropitant_hepatic_yellow", drug),
      severity: "yellow",
      score: severityScore.yellow,
      title: "Hepatopata/Shunt + Maropitant: usar com titulação e reavaliação",
      why:
        "Em disfunção hepática, metabolismo pode ser menos previsível; risco principal é maior duração/efeito e necessidade de ajuste.",
      do:
        "Usar menor dose efetiva e reavaliar resposta. Monitorar sedação/disposição e sinais GI.",
      tags: ["hepatic_metabolism"],
    }),
  },
];
