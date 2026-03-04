import type { DrugProfile } from '../../types/drugProfile'

export const morfinaProfile: DrugProfile = {
  drug_id: 'morfina',
  name_pt: 'Morfina (sulfato de morfina)',
  name_en: 'Morphine sulfate',
  synonyms: ['Dimorf', 'Opioide Padrão Ouro'],
  class: ['Opioide agonista μ puro', 'Analgésico central'],

  core_concepts: {
    taglines: [
      'Padrão-ouro para analgesia moderada a severa.',
      'Liberação de histamina se IV rápido (hipotensão/rubor) - preferir IM/SC ou CRI lento.',
      'Pode causar vômito (estimula CRTZ).',
    ],
    mechanism: {
      clinical_metaphor: 'A "mãe" dos opioides. Potente mas com efeitos colaterais clássicos.',
      primary_effects: {
        cns: 'Analgesia profunda, sedação, depressão respiratória dose-dependente.',
        gi: 'Vômito inicial, depois estase/constipação.',
        cardiovascular: 'Hipotensão por histamina (IV).',
      },
    },
    pharmacodynamics: {
      onset_iv: '5-10 min (IV lento).',
      peak: '20 min.',
      duration: '2-4h.',
    },
    pharmacokinetics: {
      metabolism: 'Hepático (Glicuronidação).',
      excretion: 'Renal (metabólitos ativos M3G/M6G).',
    },
  },

  species_notes: {
    dogs: {
      key_point: 'Estimula centro do vômito. Libera histamina IV (vasodilatação, hipotensão).',
      high_risk_notes: ['IV Rápido = Colapso vascular. Administrar IV muito lento ou diluído. IM/SC preferível para evitar pico de histamina.'],
    },
    cats: {
      key_point: 'Deficiência na glicuronidação → meia-vida prolongada. Doses menores.',
      high_risk_notes: ['Risco de "Morfina Mania" (midríase, hiperestesia, disforia) em doses altas (> 0.2-0.3 mg/kg). Usar com cautela.'],
    },
  },

  indications: {
    primary: [
      'Analgesia pré/pós-operatória (cirurgias dolorosas).',
      'Edema Pulmonar Cardiogênico (reduz ansiedade e pré-carga - controverso, usar dose baixa).',
      'Protocolos MLK (Morfina-Lidocaína-Cetamina).',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Trauma Cranioencefálico (TCE) com hipertensão intracraniana não controlada',
        why: 'Vômito aumenta PIC. Depressão respiratória retém CO2 -> vasodilatação cerebral -> aumenta PIC.',
        level: 'WARNING',
      },
      {
        condition: 'Obstrução Biliar / Espasmo do esfíncter de Oddi',
        why: 'Pode aumentar pressão biliar (controverso em vet).',
        level: 'WARNING',
      },
    ],
    relative: [
      {
        condition: 'Mastocitoma / Choque Anafilático',
        why: 'Liberação adicional de histamina pode agravar hipotensão.',
        level: 'WARNING', // Monitorar
      },
      {
        condition: 'Hipotensão / Hipovolemia não corrigida',
        why: 'Vasodilatação agrava quadro.',
        level: 'WARNING',
      },
    ],
  },

  alerts_by_comorbidity: [
    {
      key: 'mastocytoma',
      level: 'WARNING',
      title: 'Mastocitoma',
      why: 'Risco de liberação de histamina.',
      action: ['Preferir Metadona ou Fentanil.', 'Administrar anti-histamínico prévio.'],
    },
    {
      key: 'tbi',
      level: 'WARNING',
      title: 'Trauma Craniano',
      why: 'Vômito aumenta pressão intracraniana.',
      action: ['Usar antiemético (Maropitant) antes.', 'Monitorar PIC.'],
    },
    {
      key: 'respiratory_depression',
      level: 'WARNING',
      title: 'Depressão Respiratória',
      why: 'Agrava hipoventilação.',
      action: ['Monitorar EtCO2/SpO2.'],
    },
  ],

  doses: {
    unit_standard_cri: 'mg/kg/h',
    dog: {
      bolus: {
        mgkg: {
          min: 0.1,
          max: 0.5,
          note: '0.1-0.5 mg/kg IM/SC. Se IV: 0.1-0.2 mg/kg LENTO (diluído).',
        },
        route: 'IV',
      },
      cri: {
        mgkgh: {
          min: 0.1,
          max: 0.3,
          note: '0.1-0.3 mg/kg/h (dose loader prévia necessária). Analgesia contínua.',
        },
        titration: {
          increment: '0.05 mg/kg/h',
          interval: '30 min',
        },
        max: 0.5,
      },
      adjustments: {
        obesity: 'Dose pelo peso ideal.',
        shock: 'Pode agravar hipotensão (histamina). Preferir fentanil.',
        hypoalbuminemia: 'Sem ajuste.',
        comorbidities: 'Renais (acúmulo M3G/M6G): reduzir dose e aumentar intervalo.',
      },
      therapeutic_targets: {
        target_map: 'N/A (Causa hipotensão se IV rápido).',
        target_etco2: 'Monitorar ventilação (depressor).',
        analgesia_scale: 'Redução de dor/escores.',
        sedation_target: 'Sedação leve a moderada.',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 0.05,
          max: 0.2,
          note: 'Dose reduzida: 0.05-0.1 mg/kg. Máximo 0.2 mg/kg. Monitorar disforia.',
        },
        route: 'IV',
      },
      cri: {
        mgkgh: {
          min: 0.05,
          max: 0.1, // Bem menor que cão
          note: 'Doses baixas (0.05-0.1 mg/kg/h). Evitar acúmulo.',
        },
        max: 0.2,
      },
    },
  },

  presentations: [
    {
      concentration_mg_ml: 10,
      label: 'Morfina 10 mg/mL (10mg/1mL)',
      examples: ['Dimorf 10mg'],
    },
    {
      concentration_mg_ml: 1, // 0.2 mg/mL se houver epidural, mas padrão é 10 ou 1
      label: 'Dimorf 0.2 mg/mL (Epidural)', // Exemplo
      examples: ['Ampola espinhal'],
    },
    {
      total_mg: 30,
      label: 'Comprimido 30mg', // Oral existe mas biodisponibilidade baixa
    },
  ],

  calculation_templates: {
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg'],
      algorithm: [
        '1) Mg totais = peso * dose',
        '2) Volume = mg / 10 (conc padrão)',
        '3) Se IV: Diluir para 1 mg/mL com NaCl e fazer lento.',
      ],
      outputs: ['drug_volume'],
    },
    cri: {
      required_inputs: ['weight_kg', 'target_mgkgh', 'pump_rate_ml_h_override'],
      algorithm: [
        '1) Calcular mg/h = peso * dose',
        '2) Calcular mL/h com base na diluição.',
      ],
      outputs: ['pump_rate_ml_h'],
    },
  },

  dilution_and_preparation: {
    hard_rules: [
      'IV sempre LENTO (2-5 min) para evitar hipotensão histaminérgica.',
      'Proteger da luz (leve sensibilidade).',
    ],
    recommended_targets: [
      {
        target_mg_ml: 1, // 1 mg/mL
        use_cases: ['IV Direto'],
        how_to_make: 'Diluir 1 mL (10mg) em 9 mL de Soro = 10 mL (1 mg/mL).',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Glicose 5%', 'Ringer Lactato'],
    stability: [
      {
        diluent: 'NaCl 0,9%',
        max_time_hours: 24,
        syringe_bag_change: '24h',
      },
    ],
  },

  compatibility: {
    compatible_in_syringe_or_bag: ['Metoclopramida', 'Midazolam', 'Ketamina (MLK)', 'Lidocaína (MLK)'],
    incompatible: [
      {
        agent: 'Propofol (na mesma seringa)',
        why: 'Emulsão pode quebrar ou precipitar (misturar no Y-site ok).',
        risk: 'precipitação',
      },
      {
        agent: 'Furosemida',
        why: 'Precipitação.',
        risk: 'precipitação',
      },
    ],
  },

  administration_and_titration: {
    bolus_guidance: [
      'IV somente lento/titulado (idealmente 2–5 min) após diluição.',
      'Em pacientes instáveis, preferir IM/SC ou CRI com titulação progressiva.',
    ],
    titration_rules: [
      'Ajustar dose pela resposta clínica e sinais de ventilação/perfusão.',
      'Evitar escalada abrupta para reduzir risco de hipotensão por histamina e depressão respiratória.',
    ],
    monitoring_minimum: ['FR', 'SpO2', 'EtCO2 quando disponível', 'PA', 'FC', 'sedação', 'escala de dor'],
  },

  adverse_effects_and_toxicity: {
    common: ['Sedação', 'Náusea/vômito', 'Constipação', 'Prurido'],
    serious: [
      'Depressão respiratória dose-dependente',
      'Hipotensão clinicamente relevante (especialmente após IV rápido)',
      'Disforia/excitação paradoxal em felinos sensíveis',
    ],
    management: [
      'Reduzir/pausar dose e fornecer suporte ventilatório quando houver hipoventilação.',
      'Para efeitos graves por opioide, considerar reversão parcial com naloxona titulada.',
    ],
  },

  ui_copy: {
    critical_warning_banner: 'IV RÁPIDO LIBERA HISTAMINA (Hipotensão). Use lento ou IM.',
    common_errors: ['Fazer bolus IV rápido em trauma (vômito/hipotensão).', 'Superdosar em gatos.'],
  },

  presets: [
    {
      id: 'morfina_preanestesica',
      label: 'MPA Cão (0.3 mg/kg) 🐕',
      dose_mgkg: 0.3,
      limits: { min: 0.1, max: 0.5 },
      clinical_target: 'Sedação e analgesia preemptiva.',
    },
    {
      id: 'morfina_mlk_rate',
      label: 'Taxa MLK Padrão (0.1 mg/kg/h) 💧',
      dose_mgkgh: 0.1,
      limits: { min: 0.1, max: 0.3 },
      clinical_target: 'Infusão contínua multimodal.',
    },
  ],

  references: [
    {
      section: 'Doses / Segurança',
      source: 'Plumb\'s / WSAVA Pain Guidelines.',
    },
  ],
}
