import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const metoclopramideRules: Rule[] = [
  {
    id: "metoclopramide_renal_red",
    drug: "metoclopramida",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("ckd") || comorbidities.has("aki"),
    alert: ({ drug }) => ({
      id: makeAlertId("metoclopramide_renal_red", drug),
      severity: "red",
      score: severityScore.red,
      title: "DRC/IRA + Metoclopramida = risco de acúmulo e efeitos extrapiramidais",
      why:
        "Disfunção renal pode reduzir eliminação → maior risco de agitação, tremores, vocalização, alterações comportamentais.",
      do:
        "Preferir maropitant ou reduzir dose/taxa e monitorar sinais neurológicos. Suspender se surgirem sinais extrapiramidais.",
      tags: ["renal_clearance", "extrapyramidal"],
    }),
  },
  {
    id: "metoclopramide_neuro_orange",
    drug: "metoclopramida",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("neuro_disease") || comorbidities.has("head_trauma"),
    alert: ({ drug }) => ({
      id: makeAlertId("metoclopramide_neuro_orange", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Doença neurológica/TCE + Metoclopramida: maior risco de efeitos centrais",
      why:
        "Bloqueio dopaminérgico central pode precipitar sinais extrapiramidais e alterar avaliação neurológica.",
      do:
        "Preferir maropitant quando possível. Se usar, monitorar de perto comportamento e exame neurológico.",
      tags: ["cns_effects"],
    }),
  },
  {
    id: "metoclopramide_possible_obstruction_black",
    drug: "metoclopramida",
    species: "any",
    when: ({ comorbidities }) =>
      comorbidities.has("shock_hypovolemic") || comorbidities.has("shock_cardiogenic"),
    alert: ({ drug }) => ({
      id: makeAlertId("metoclopramide_possible_obstruction_black", drug),
      severity: "yellow",
      score: severityScore.yellow,
      title: "Paciente muito instável: pró-cinético pode piorar desconforto se causa não for esclarecida",
      why:
        "Em casos com íleo/hipoperfusão ou suspeita de obstrução, estimular motilidade sem diagnóstico pode piorar dor/náusea e atrasar decisão cirúrgica.",
      do:
        "Se suspeita de obstrução/abdome agudo: priorizar imagem (US/RX) e analgesia/estabilização antes de pró-cinético.",
      tags: ["gi_workup"],
    }),
  },
];
