import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const metronidazoleRules: Rule[] = [
  {
    id: "metro_hepatic_red",
    drug: "metronidazol",
    species: "any",
    when: ({ comorbidities }) =>
      comorbidities.has("hepatic_dysfunction") || comorbidities.has("portosystemic_shunt"),
    alert: ({ drug }) => ({
      id: makeAlertId("metro_hepatic_red", drug),
      severity: "red",
      score: severityScore.red,
      title: "Hepatopata/Shunt + Metronidazol = risco maior de neurotoxicidade",
      why:
        "Em disfunção hepática, o fármaco pode acumular → sinais neurológicos (ataxia, nistagmo, alteração de comportamento, convulsões).",
      do:
        "Evitar ou reduzir dose e duração. Se surgirem sinais neurológicos: suspender imediatamente e reavaliar terapia.",
      tags: ["neurotoxicity", "hepatic_clearance"],
    }),
  },
  {
    id: "metro_neuro_disease_red",
    drug: "metronidazol",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("neuro_disease") || comorbidities.has("head_trauma"),
    alert: ({ drug }) => ({
      id: makeAlertId("metro_neuro_disease_red", drug),
      severity: "red",
      score: severityScore.red,
      title: "Doença neurológica/TCE + Metronidazol: maior risco/ruído diagnóstico",
      why:
        "Pode induzir ou piorar sinais neurológicos e confundir monitoramento do paciente.",
      do:
        "Preferir alternativa quando possível. Se uso for necessário, monitorar neuro de perto e manter dose mínima eficaz.",
      tags: ["cns_effects"],
    }),
  },
];
