import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const lidocaineRules: Rule[] = [
  {
    id: "lido_cat_high_risk_systemic",
    drug: "lidocaine",
    species: "cat",
    when: () => true,
    alert: ({ drug }) => ({
      id: makeAlertId("lido_cat_high_risk_systemic", drug),
      severity: "red",
      score: severityScore.red,
      title: "Gato + Lidocaína sistêmica = maior risco de toxicidade",
      why:
        "Gatos tendem a ter menor margem de segurança para anestésicos locais sistêmicos, com risco aumentado de sinais neurológicos (tremores/convulsões) e cardiovasculares.",
      do:
        "Evitar por padrão no CRIVET. Se uso excepcional, dose mínima titulada, monitorização contínua (ECG/PA/neurológico) e critério de suspensão precoce.",
      tags: ["species_sensitivity", "neurotoxicity"],
    }),
  },
  {
    id: "lido_hepatic_reduce_or_avoid",
    drug: "lidocaine",
    species: "dog",
    when: ({ comorbidities }) =>
      comorbidities.has("hepatic_dysfunction") || comorbidities.has("portosystemic_shunt"),
    alert: ({ drug }) => ({
      id: makeAlertId("lido_hepatic_reduce_or_avoid", drug),
      severity: "red",
      score: severityScore.red,
      title: "Hepatopata/Shunt + Lidocaína = risco de acúmulo/toxicidade",
      why:
        "Disfunção hepática pode reduzir clearance → maior risco de neurotoxicidade e efeitos cardiovasculares.",
      do:
        "Preferir evitar se disfunção moderada–grave. Se optar por usar, reduzir significativamente e titular; monitorar sinais neurológicos e ECG.",
      tags: ["hepatic_clearance", "neurotoxicity"],
    }),
  },
  {
    id: "lido_hypoalbuminemia_more_free_drug",
    drug: "lidocaine",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("hypoalbuminemia"),
    alert: ({ drug }) => ({
      id: makeAlertId("lido_hypoalbuminemia_more_free_drug", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Hipoalbuminemia + Lidocaína = fração livre ↑ (toxicidade relativa)",
      why:
        "Maior fração livre aumenta efeito clínico e risco de toxicidade mesmo com dose “padrão”.",
      do:
        "Reduzir dose/taxa e titular ao efeito. Monitorar tremores, nistagmo, alteração de comportamento e ECG.",
      tags: ["protein_binding"],
    }),
  },
  {
    id: "lido_arrhythmia_caution",
    drug: "lidocaine",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("arrhythmia_risk"),
    alert: ({ drug }) => ({
      id: makeAlertId("lido_arrhythmia_caution", drug),
      severity: "yellow",
      score: severityScore.yellow,
      title: "Arritmia/risco elétrico + Lidocaína: usar com alvo claro e ECG",
      why:
        "Apesar de ser antiarrítmico ventricular, pode deprimir condução/contratilidade em alguns cenários e mascarar piora se não houver monitorização.",
      do:
        "Se for indicação antiarrítmica: usar com ECG contínuo e objetivos (redução de VPC/TV). Se for analgesia/MLK: reavaliar custo-benefício.",
      tags: ["ecg_monitoring"],
    }),
  },
];
