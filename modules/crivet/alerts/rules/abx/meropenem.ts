import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const meropenemRules: Rule[] = [
  {
    id: "mero_stewardship_orange",
    drug: "meropenem",
    species: "any",
    when: () => true,
    alert: ({ drug }) => ({
      id: makeAlertId("mero_stewardship_orange", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Meropenem: reservar para infecção grave/ESBL ou falha documentada (stewardship)",
      why:
        "Carbapenêmico é recurso crítico; uso indiscriminado aumenta pressão seletiva e resistência.",
      do:
        "Idealmente usar com cultura/antibiograma e/ou forte suspeita de multirresistência em paciente grave. Reavaliar descalonamento assim que possível.",
      tags: ["stewardship"],
    }),
  },
  {
    id: "mero_renal_orange",
    drug: "meropenem",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("ckd") || comorbidities.has("aki"),
    alert: ({ drug }) => ({
      id: makeAlertId("mero_renal_orange", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "DRC/IRA + Meropenem: ajustar dose/intervalo e vigiar neurotoxicidade",
      why:
        "Exposição pode aumentar em disfunção renal; em alguns beta-lactâmicos, níveis altos podem predispor a sinais neurológicos.",
      do:
        "Ajustar por função renal e monitorar status neurológico. Preferir PA/fluido guiado para melhorar perfusão renal.",
      tags: ["renal_adjustment", "neuro_watch"],
    }),
  },
];
