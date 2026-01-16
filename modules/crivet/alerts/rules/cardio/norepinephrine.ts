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
  {
    id: "norepi_renal_safe",
    drug: "norepinephrine",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("ckd") || comorbidities.has("aki"),
    alert: ({ drug }) => ({
      id: makeAlertId("norepi_renal_safe", drug),
      severity: "green",
      score: severityScore.green,
      title: "Renopata + Norepinefrina: SAFE / REQUIRED quando há hipotensão",
      why:
        "Manter TAM adequada (≥65 mmHg cães, ≥60 mmHg gatos) é mais protetor para o rim que evitar vasopressor. Hipotensão prolongada piora função renal mais que vasoconstrição controlada.",
      do:
        "Usar quando necessário para manter MAP alvo. Monitorar débito urinário rigorosamente, especialmente em gatos (mais sensíveis à vasoconstrição renal). Titular por MAP e perfusão.",
      tags: ["renal", "perfusion"],
    }),
  },
  {
    id: "norepi_hepatic_monitor",
    drug: "norepinephrine",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("hepatic_dysfunction"),
    alert: ({ drug }) => ({
      id: makeAlertId("norepi_hepatic_monitor", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Hepatopata + Norepinefrina: monitorar excesso de vasoconstrição",
      why:
        "Metabolismo da norepinefrina independe do fígado (COMT e MAO em tecidos periféricos), mas excesso de vasoconstrição pode reduzir perfusão hepática.",
      do:
        "Usar quando necessário, mas evitar doses muito altas. Monitorar sinais de hipoperfusão hepática (acidose láctica, encefalopatia). Titular por MAP e perfusão sistêmica.",
      tags: ["hepatic", "monitoring"],
    }),
  },
  {
    id: "norepi_cardiac_disease_critical",
    drug: "norepinephrine",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("cardiac_disease"),
    alert: ({ drug }) => ({
      id: makeAlertId("norepi_cardiac_disease_critical", drug),
      severity: "red",
      score: severityScore.red,
      title: "Cardiopatia ICC + Norepinefrina: risco crítico de aumento de pós-carga",
      why:
        "Aumenta resistência vascular sistêmica (pós-carga). Em insuficiência cardíaca, pode piorar débito cardíaco, aumentar trabalho cardíaco e consumo de O₂. Pode precipitar descompensação. Atenção especial em doses >0.5 mcg/kg/min.",
      do:
        "Monitorar ECO/USG point-of-care se disponível. Avaliar lactato, sinais de baixo débito (extremidades frias, oligúria). Considerar inotrópico associado ou reduzir dose se débito comprometido. Reavaliar estratégia se piorar sinais. Em doses altas (>0.5 mcg/kg/min), monitoramento intensivo obrigatório.",
      tags: ["afterload", "cardiac", "hemodynamics"],
    }),
  },
  {
    id: "norepi_cat_renal_sensitivity",
    drug: "norepinephrine",
    species: "cat",
    when: () => true,
    alert: ({ drug }) => ({
      id: makeAlertId("norepi_cat_renal_sensitivity", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Gato + Norepinefrina: monitorar débito urinário rigorosamente",
      why:
        "Gatos são mais sensíveis à vasoconstrição renal que cães. Risco maior de redução de perfusão renal mesmo em doses moderadas.",
      do:
        "Monitorar débito urinário rigorosamente. Titular cuidadosamente por MAP (alvo: ≥60 mmHg). Se oligúria persistir, reavaliar dose e considerar estratégia alternativa. Teto absoluto: 0.5 mcg/kg/min.",
      tags: ["species_sensitivity", "renal"],
    }),
  },
  {
    id: "norepi_low_map_warning",
    drug: "norepinephrine",
    species: "any",
    when: ({ ctx }) => {
      if (ctx.map === undefined) return false
      const isDog = ctx.species === 'dog'
      const targetMap = isDog ? 65 : 60
      return ctx.map < targetMap
    },
    alert: ({ drug, ctx }) => {
      const isDog = ctx.species === 'dog'
      const targetMap = isDog ? 65 : 60
      return {
        id: makeAlertId("norepi_low_map_warning", drug),
        severity: "orange",
        score: severityScore.orange,
        title: `MAP abaixo do alvo (${targetMap} mmHg) - considerar titulação`,
        why:
          `MAP atual (${ctx.map} mmHg) abaixo do alvo terapêutico (≥${targetMap} mmHg). Pode indicar necessidade de aumentar dose de norepinefrina ou reavaliar volume responsivo.`,
        do:
          "Titular +0.05 mcg/kg/min a cada 5–10 min se volume já otimizado. Reavaliar volume intravascular. Monitorar perfusão: lactato, diurese, extremidades. Se oligúria persistir ou lactato não reduzir, aumentar dose progressivamente.",
        tags: ["monitoring", "map"],
      }
    },
  },
  {
    id: "norepi_high_map_warning",
    drug: "norepinephrine",
    species: "any",
    when: ({ ctx }) => ctx.map !== undefined && ctx.map > 100,
    alert: ({ drug, ctx }) => ({
      id: makeAlertId("norepi_high_map_warning", drug),
      severity: "red",
      score: severityScore.red,
      title: "Sobredose: Hipertensão severa detectada",
      why:
        `Hipertensão severa (MAP: ${ctx.map} mmHg) indica excesso de vasoconstrição. Pode causar bradicardia reflexa (via barorreceptores), arritmias e hipoperfusão periférica paradoxal (extremidades frias, acidose láctica).`,
      do:
        "Reduzir dose imediatamente. Monitorar ECG (bradicardia/arritmias). Avaliar extremidades (frias/marmorizadas indicam hipoperfusão periférica). Reavaliar lactato e estratégia global.",
      tags: ["overdose", "monitoring", "hemodynamics"],
    }),
  },
];
