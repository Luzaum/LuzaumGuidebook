import type { Rule } from "../../types";
import { severityScore, makeAlertId } from "../../scoring";

const opioidCommonRespRule = (drug: "fentanyl" | "remifentanil" | "morphine" | "methadone" | "butorphanol"): Rule => ({
  id: `opioid_resp_disease_${drug}`,
  drug,
  species: "any",
  when: ({ comorbidities, ctx }) => comorbidities.has("resp_disease") || ctx.onVentilator === false,
  alert: ({ drug }) => ({
    id: makeAlertId(`opioid_resp_disease_${drug}`, drug),
    severity: "orange",
    score: severityScore.orange,
    title: "Doença respiratória + Opioide = maior risco de hipoventilação",
    why:
      "Opioides deprimem centro respiratório e podem reduzir drive ventilatório, especialmente com sedação concomitante.",
    do:
      "Titulagem lenta, monitorar ETCO₂/SpO₂ e padrão ventilatório. Considerar suporte ventilatório se necessário. Preferir analgesia multimodal para reduzir dose.",
    tags: ["resp_depression"],
  }),
});

export const opioidRules: Rule[] = [
  // depressão respiratória (todos)
  opioidCommonRespRule("fentanyl"),
  opioidCommonRespRule("remifentanil"),
  opioidCommonRespRule("morphine"),
  opioidCommonRespRule("methadone"),
  opioidCommonRespRule("butorphanol"),

  // Morfina + renal (metabólitos)
  {
    id: "morphine_renal_accumulation",
    drug: "morphine",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("ckd") || comorbidities.has("aki"),
    alert: ({ drug }) => ({
      id: makeAlertId("morphine_renal_accumulation", drug),
      severity: "red",
      score: severityScore.red,
      title: "DRC/IRA + Morfina = risco de acúmulo de metabólitos e sedação prolongada",
      why:
        "Em disfunção renal, metabólitos podem acumular → depressão do SNC/respiração e recuperação lenta.",
      do:
        "Evitar se possível. Preferir remifentanil (mais previsível) ou ajustar estratégia analgésica. Se usar, reduzir dose e monitorar sedação/ventilação.",
      tags: ["renal_clearance", "active_metabolites"],
    }),
  },

  // Morfina + choque/hipotensão (histamina / vasodilatação)
  {
    id: "morphine_hypotension_shock",
    drug: "morphine",
    species: "any",
    when: ({ comorbidities, ctx }) =>
      comorbidities.has("shock_hypovolemic") ||
      comorbidities.has("shock_cardiogenic") ||
      comorbidities.has("hypovolemia_unresolved") ||
      (ctx.map !== undefined && ctx.map < 60),
    alert: ({ drug }) => ({
      id: makeAlertId("morphine_hypotension_shock", drug),
      severity: "red",
      score: severityScore.red,
      title: "Hipotensão/choque + Morfina = piora hemodinâmica possível",
      why:
        "Pode causar vasodilatação e liberação de histamina (especialmente bolus/IV rápido), piorando perfusão.",
      do:
        "Evitar bolus rápido. Preferir opioide mais titulável (fentanil/remifentanil) e corrigir perfusão antes.",
      tags: ["hemodynamics"],
    }),
  },

  // Fentanil + bradicardia/instabilidade
  {
    id: "fentanyl_bradycardia_risk",
    drug: "fentanyl",
    species: "any",
    when: ({ comorbidities }) => comorbidities.has("cardiac_disease") || comorbidities.has("arrhythmia_risk"),
    alert: ({ drug }) => ({
      id: makeAlertId("fentanyl_bradycardia_risk", drug),
      severity: "yellow",
      score: severityScore.yellow,
      title: "Cardiopata/risco de arritmia + Fentanil: monitorar FC/ECG",
      why:
        "Pode aumentar tônus vagal → bradicardia; em cardiopatas isso pode reduzir DC e piorar perfusão.",
      do:
        "Titulagem lenta; monitorar ECG/PA. Se bradicardia com hipotensão: reavaliar dose e considerar anticolinérgico conforme cenário.",
      tags: ["bradycardia", "ecg_monitoring"],
    }),
  },

  // Remifentanil “ponto forte” em hepato/renal (alerta informativo)
  {
    id: "remi_prefer_in_hepatic_renal",
    drug: "remifentanil",
    species: "any",
    when: ({ comorbidities }) =>
      comorbidities.has("hepatic_dysfunction") ||
      comorbidities.has("portosystemic_shunt") ||
      comorbidities.has("ckd") ||
      comorbidities.has("aki"),
    alert: ({ drug }) => ({
      id: makeAlertId("remi_prefer_in_hepatic_renal", drug),
      severity: "green",
      score: severityScore.green,
      title: "Hepato/renal: Remifentanil costuma ser mais previsível (sem “cauda” longa)",
      why:
        "Tende a ter offset rápido e menor risco de sedação prolongada comparado a opioides com metabólitos/depuração dependente de órgão.",
      do:
        "Pode ser uma boa escolha quando você quer controle fino e despertar rápido. Ainda exige monitor de ventilação (apneia/hipoventilação podem ocorrer).",
      tags: ["predictable_offset"],
    }),
  },

  // Butorfanol — alerta “de eficácia”
  {
    id: "butorphanol_ceiling_analgesia",
    drug: "butorphanol",
    species: "any",
    when: () => true,
    alert: ({ drug }) => ({
      id: makeAlertId("butorphanol_ceiling_analgesia", drug),
      severity: "yellow",
      score: severityScore.yellow,
      title: "Butorfanol: analgesia limitada para dor moderada–grave",
      why:
        "Agonista-antagonista → efeito analgésico com “teto”; pode ser insuficiente para dor intensa e pode antagonizar parcialmente agonistas μ.",
      do:
        "Se dor moderada–grave: preferir agonista μ pleno (metadona/morfina/fentanil) + multimodal. Use butorfanol mais para sedação/antitussígeno e dor leve.",
      tags: ["analgesia_ceiling"],
    }),
  },

  // Metadona + hepatopata (depuração)
  {
    id: "methadone_hepatic_caution",
    drug: "methadone",
    species: "any",
    when: ({ comorbidities }) =>
      comorbidities.has("hepatic_dysfunction") || comorbidities.has("portosystemic_shunt"),
    alert: ({ drug }) => ({
      id: makeAlertId("methadone_hepatic_caution", drug),
      severity: "orange",
      score: severityScore.orange,
      title: "Hepatopata/Shunt + Metadona: risco de efeito prolongado",
      why:
        "Em disfunção hepática, depuração pode cair → sedação/efeitos mais duradouros.",
      do:
        "Reduzir dose e titular ao efeito. Monitorar ventilação e tempo de recuperação.",
      tags: ["hepatic_metabolism"],
    }),
  },
];
