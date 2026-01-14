import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const norepinephrineRules: Rule[] = [
  {
    id: "norepi_hypovolemia_black",
    drug: "norepinephrine",
    species: "any",
    when: ({ comorbidities }) =>
      comorbidities.has("hypovolemia_unresolved") || comorbidities.has("shock_hypovolemic"),
    alert: ({ drug }) => ({
      id: makeAlertId("norepi_hypovolemia_black", drug),
      severity: "black",
      score: severityScore.black,
      title: "Hipovolemia não corrigida + Norepinefrina = risco alto de hipoperfusão/isquemia",
      why:
        "Vasoconstrição intensa com volume circulante efetivo baixo pode piorar perfusão (rim/intestino) e mascarar choque.",
      do:
        "Priorizar ressuscitação volêmica guiada por perfusão. Se precisar vasopressor: dose mínima, reavaliar MAP + perfusão (lactato, diurese, extremidades) frequentemente.",
      tags: ["perfusion", "shock"],
    }),
  },
  {
    id: "norepi_cardiogenic_orange",
    drug: "norepinephrine",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("shock_cardiogenic"),
    alert: ({ drug }) => ({
      id: makeAlertId("norepi_cardiogenic_orange", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Choque cardiogênico + Norepinefrina: pode ajudar MAP, mas atenção ao pós-carga",
      why:
        "Aumento de resistência vascular pode elevar pós-carga e piorar débito em alguns cardiogênicos; em outros, melhora perfusão coronariana ao subir MAP.",
      do:
        "Usar se MAP muito baixo, titulando com monitorização (ECO/USG point-of-care se tiver). Considerar inotrópico associado se baixo débito.",
      tags: ["afterload", "hemodynamics"],
    }),
  },
  {
    id: "norepi_distributive_green",
    drug: "norepinephrine",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("shock_distributive") || comorbidities.has("sepsis"),
    alert: ({ drug }) => ({
      id: makeAlertId("norepi_distributive_green", drug),
      severity: "green",
      score: severityScore.green,
      title: "Choque distributivo (sepse/anafilaxia) + Norepinefrina: escolha fisiologicamente coerente",
      why:
        "Vasoplegia é o problema central; norepi reduz o “continente” vascular e melhora MAP/perfusão quando volume já foi otimizado.",
      do:
        "Titulagem por MAP e perfusão. Reavaliar volume responsivo e necessidade de adicionar vasopressina se doses sobem muito.",
      tags: ["vasoplegia"],
    }),
  },
];
