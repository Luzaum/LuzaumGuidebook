import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

export const dobutamineRules: Rule[] = [
  {
    id: "dobu_cat_neurotoxic_red",
    drug: "dobutamina",
    species: "cat",
    when: () => true, // Sempre alertar em gatos devido à margem terapêutica muito estreita
    alert: ({ drug }) => ({
      id: makeAlertId("dobu_cat_neurotoxic_red", drug),
      severity: "red",
      score: severityScore.red,
      title: "Gato + Dobutamina: risco crítico de neurotoxicidade (tremores/convulsões)",
      why:
        "Gatos são muito mais sensíveis às catecolaminas que cães. Margem terapêutica extremamente estreita. Doses acima de 5 mcg/kg/min têm risco elevado de tremor, convulsões e agitação extrema/comportamento agressivo. Doses 'normais de cão' podem ser neurotóxicas em gatos.",
      do:
        "Teto ABSOLUTO: 5.0 mcg/kg/min. Iniciar em 0.5–1.0 µg/kg/min. Titular +0.5 µg/kg/min a cada 15–30 min com monitorização intensiva. Se surgirem tremores/convulsões → DESLIGAR IMEDIATAMENTE e reavaliar estratégia.",
      tags: ["neurotoxicity", "species_sensitivity"],
    }),
  },
  {
    id: "dobu_cardiac_disease_hcm_black",
    drug: "dobutamina",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("cardiac_disease"),
    alert: ({ drug }) => ({
      id: makeAlertId("dobu_cardiac_disease_hcm_black", drug),
      severity: "red",
      score: severityScore.red,
      title: "Cardiopatia + Dobutamina: CONTRAINDICADO em HCM/estenose aórtica",
      why:
        "Em HCM (especialmente felina) e estenoses fixas (aórtica/pulmonar), o aumento do inotropismo piora a obstrução dinâmica/fixa, aumenta consumo de O₂ e pode precipitar síncope/morte súbita. O coração não consegue aumentar o fluxo, só aumenta a pressão contra a obstrução.",
      do:
        "Evitar em HCM felina e estenoses fixas. Se uso excepcional em outros tipos de cardiopatia: dose mínima, ECG contínuo, monitorização intensiva. Reavaliar imediatamente se piorar sinais.",
      tags: ["contraindication", "hemodynamics"],
    }),
  },
  {
    id: "dobu_arrhythmia_orange",
    drug: "dobutamina",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("arrhythmia_risk"),
    alert: ({ drug }) => ({
      id: makeAlertId("dobu_arrhythmia_orange", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Risco de arritmia + Dobutamina: pode precipitar taquiarritmias",
      why:
        "Inotrópico β1 pode aumentar automaticidade, facilitar condução AV e aumentar consumo de O₂ do miocárdio → risco de taquiarritmias ventriculares.",
      do:
        "ECG contínuo, começar baixo (2.5–5.0 µg/kg/min em cães; 0.5–1.0 em gatos) e titular cuidadosamente. Se taquiarritmia piorar, reduzir/cessar e reavaliar estratégia.",
      tags: ["ecg_monitoring"],
    }),
  },
  {
    id: "dobu_sepsis_distributive_orange",
    drug: "dobutamina",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("sepsis") || comorbidities.has("shock_distributive"),
    alert: ({ drug }) => ({
      id: makeAlertId("dobu_sepsis_distributive_orange", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Sepse/choque distributivo + Dobutamina: pode ↓ PA (vasodilatação β2)",
      why:
        "Em sepse vasodilatada, a ação β2 secundária pode causar queda adicional da resistência vascular sistêmica. Pressão arterial pode cair após iniciar dobutamina isoladamente, apesar de melhorar débito.",
      do:
        "Se disfunção miocárdica documentada (eco com FE baixa), associar com norepinefrina para manter PAM enquanto melhora contratilidade. Titular com PA invasiva quando possível.",
      tags: ["hemodynamics", "sepsis"],
    }),
  },
  {
    id: "dobu_hypotension_orange",
    drug: "dobutamina",
    species: "any",
    when: ({ ctx }) => ctx.map !== undefined && ctx.map < 60,
    alert: ({ drug }) => ({
      id: makeAlertId("dobu_hypotension_orange", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "MAP baixa + Dobutamina: pode piorar hipotensão (vasodilatação β2)",
      why:
        "Ação β2 secundária causa vasodilatação periférica leve. Em pacientes com baixa reserva de pressão, a PA pode cair após iniciar dobutamina, apesar de melhorar débito cardíaco.",
      do:
        "Se MAP muito baixa, considerar norepi associado (fenótipo: baixo débito + vasoplegia) e titular com PA invasiva se possível. Monitorar perfusão (lactato, diurese, extremidades).",
      tags: ["hemodynamics"],
    }),
  },
];
