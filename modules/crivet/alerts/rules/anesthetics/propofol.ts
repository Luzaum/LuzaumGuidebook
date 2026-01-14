import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const propofolRules: Rule[] = [
  {
    id: "propofol_hypovolemia_shock_black",
    drug: "propofol",
    species: "any",
    when: ({ comorbidities, ctx }) =>
      comorbidities.has("hypovolemia_unresolved") ||
      comorbidities.has("shock_hypovolemic") ||
      comorbidities.has("shock_cardiogenic") ||
      (ctx.map !== undefined && ctx.map < 60),
    alert: ({ drug }) => ({
      id: makeAlertId("propofol_hypovolemia_shock_black", drug),
      severity: "black",
      score: severityScore.black,
      title: "Hipovolemia/choque + Propofol = risco alto de colapso hemodinâmico",
      why:
        "Propofol causa vasodilatação e depressão miocárdica dose-dependente → pode derrubar MAP e perfusão rapidamente em pacientes com reserva baixa.",
      do:
        "Evitar indução padrão. Se inevitável: microtitulagem muito lenta + suporte hemodinâmico preparado (fluido/vasopressor/inotrópico conforme caso). Considerar alternativas.",
      tags: ["hemodynamics", "vasodilation"],
    }),
  },
  {
    id: "propofol_hypoalbuminemia_reduce",
    drug: "propofol",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("hypoalbuminemia"),
    alert: ({ drug }) => ({
      id: makeAlertId("propofol_hypoalbuminemia_reduce", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Hipoalbuminemia + Propofol = fração livre ↑ (dose efetiva ↑)",
      why:
        "Maior fração livre aumenta potência clínica → risco de apneia/hipotensão com dose “usual”.",
      do:
        "Reduzir dose e titular lentamente. Monitorar ventilação e PA.",
      tags: ["protein_binding", "resp_depression"],
    }),
  },
  {
    id: "propofol_resp_disease_apnea",
    drug: "propofol",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("resp_disease"),
    alert: ({ drug }) => ({
      id: makeAlertId("propofol_resp_disease_apnea", drug),
      severity: "red",
      score: severityScore.red,
      title: "Doença respiratória + Propofol = risco de apneia/hipoventilação",
      why:
        "Propofol pode causar apneia e reduzir drive ventilatório, principalmente na indução.",
      do:
        "Pré-oxigenar, titular lentamente e ter ventilação assistida pronta. Preferir protocolo que minimize depressão respiratória quando possível.",
      tags: ["resp_depression"],
    }),
  },
];
