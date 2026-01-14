import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const clindamycinRules: Rule[] = [
  {
    id: "clinda_gi_yellow",
    drug: "clindamicina",
    species: "any",
    when: () => true,
    alert: ({ drug }) => ({
      id: makeAlertId("clinda_gi_yellow", drug),
      severity: "yellow",
      score: severityScore.yellow,
      title: "Clindamicina: comum causar intolerância GI (náusea/diarreia)",
      why:
        "Antimicrobianos podem alterar microbiota e irritar trato GI; clinda é notória por isso em alguns pacientes.",
      do:
        "Orientar administração com alimento (se não contraindicado), monitorar diarreia e reavaliar se sinais GI importantes.",
      tags: ["gi_adverse_effects"],
    }),
  },
  {
    id: "clinda_hepatic_yellow",
    drug: "clindamicina",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("hepatic_dysfunction"),
    alert: ({ drug }) => ({
      id: makeAlertId("clinda_hepatic_yellow", drug),
      severity: "yellow",
      score: severityScore.yellow,
      title: "Hepatopata + Clindamicina: usar com reavaliação (tolerância/metabolismo)",
      why:
        "Em doença hepática, metabolismo pode ser menos previsível e EA podem ser menos tolerados.",
      do:
        "Monitorar sinais GI e apetite; reavaliar necessidade e duração.",
      tags: ["hepatic_caution"],
    }),
  },
];
