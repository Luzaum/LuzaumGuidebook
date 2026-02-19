import type { DrugProfile } from '../../types/drugProfile'

export const vasopressinaProfile: DrugProfile = {
  drug_id: 'vasopressina',
  name_pt: 'Vasopressina (ADH)',
  name_en: 'Vasopressin (Argipressin)',
  synonyms: ['Hormônio Antidiurético', 'Pitressina'],
  class: ['Vasopressor não-adrenérgico', 'Hormônio hipofisário'],

  core_concepts: {
    taglines: [
      'Vasopressor de resgate em choque refratário a catecolaminas (vasoplegia severa).',
      'Funciona em pH ácido (diferente da norepinefrina/adrenalina).',
      'Poupadora de catecolaminas ("catecholamine-sparing effect").',
    ],
    mechanism: {
      clinical_metaphor: 'Espreme os vasos periféricos custe o que custar (mecanismo V1).',
      primary_effects: {
        cardiovascular: 'Vasoconstrição intensa via receptores V1 (pele, músculo, intestino).',
        renal_hepatic: 'Retenção de água livre via receptores V2 (efeito antidiurético).',
      },
    },
    pharmacodynamics: {
      onset_iv: 'Rápido (minutos).',
      duration: 'Curta (10-20 min).',
    },
    pharmacokinetics: {
      metabolism: 'Hepático e Renal.',
    },
  },

  species_notes: {
    dogs: { key_point: 'Dose padrão de resgate: 0.5-2 mU/kg/min.', high_risk_notes: ['Monitorar PAM alvo > 65mmHg.'] },
    cats: { key_point: 'Mais sensíveis à vasoconstrição.', high_risk_notes: ['Iniciar com doses menores (0.5 mU/kg/min).'] },
  },

  indications: {
    primary: [
      'Choque Vasoplégico Séptico Refratário (após noradrenalina > 1-2 mcg/kg/min).',
      'Parada Cardiorrespiratória (substituto da Epinefrina - menos arritmogênico, controverso).',
      'Diabetes Insipidus Central (doses baixas).',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Hipovolemia não corrigida',
        why: 'Isquemia esplâncnica/renal grave.',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Insuficiência Vascular Crônica',
        why: 'Piora perfusão periférica.',
        level: 'WARNING',
      },
    ],
  },

  alerts_by_comorbidity: [
    {
      key: 'vascular_disease',
      level: 'WARNING',
      title: 'Doença Vascular Periférica',
      why: 'Risco de isquemia distal.',
      action: ['Monitorar perfusão de extremidades.'],
    },
    {
      key: 'coronary_disease',
      level: 'WARNING',
      title: 'Doença Coronariana',
      why: 'Vasoconstrição pode reduzir perfusão miocárdica (isquemia).',
      action: ['Monitorar ECG (ST).'],
    },
    {
      key: 'asthma',
      level: 'SAFE', // Leve
      title: 'Asma',
      why: 'Pode causar broncoconstrição leve.',
      action: ['Monitorar respiração.'],
    },
  ],

  doses: {
    unit_standard_cri: 'mukgmin', // Mili-unidades/kg/min
    dog: {
      bolus: {
        ukg: { min: 0.8, max: 0.8, note: 'PCR APENAS: 0.8 U/kg IV dose única (alternativa à epinefrina). Em choque: CRI apenas.' },
        route: 'IV',
      },
      cri: {
        mukgmin: {
          min: 0.5,
          max: 5,
          note: 'Start: 0.5-1 mU/kg/min. Adicionar à Noradrenalina. Dose "fisiológica" repositora: 1-2 mU/kg/min. Doses > 5 mU aumentam risco isquêmico.',
        },
        titration: {
          increment: '0.5 mU/kg/min',
          interval: '10-30 min',
        },
        max: 10,
      },
      adjustments: {
        obesity: 'Dose pelo peso ideal.',
        shock: 'Vasopressor de resgate (última linha).',
        hypoalbuminemia: 'Sem ajuste.',
        comorbidities: 'Doença vascular/coronariana: extremo risco de isquemia.',
      },
      therapeutic_targets: {
        target_map: 'PAM > 65 mmHg (Resgate)',
        target_etco2: 'Monitorar perfusão',
        analgesia_scale: 'N/A',
        sedation_target: 'N/A',
      },
    },
    cat: {
      bolus: {
        ukg: { min: 0.8, max: 0.8, note: 'PCR APENAS.' },
        route: 'IV',
      },
      cri: {
        mukgmin: {
          min: 0.5,
          max: 3,
          note: 'Start low. Gatos são sensíveis à bradicardia e isquemia.',
        },
        titration: {
          increment: '0.5 mU/kg/min',
          interval: '10-30 min',
        },
        max: 5,
      },
    },
  },

  calculation_templates: {
    cri: {
      required_inputs: [
        'weight_kg',
        'target_mukgmin',
        'pump_rate_ml_h_override',
      ],
      algorithm: [
        '1) Calcular mU/min = peso * dose',
        '2) Calcular mU/h = mU/min * 60',
        '3) Converter mU/h para U/h = mU / 1000',
        '4) Calcular mL/h = U/h / (U/mL da seringa)',
        'EXEMPLO: 10kg, 1 mU/kg/min -> 600 mU/h -> 0.6 U/h. Se diluição 0.1 U/mL -> 6 mL/h.',
      ],
      outputs: ['pump_rate_ml_h'],
      conversions: ['1 U = 1000 mU'],
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_ukg'], // Unidades
      algorithm: [
        '1) Calcular Unidades totais = peso * dose (U/kg)',
        '2) Volume = U / 20 (concentração 20 U/mL)',
        '3) CUIDADO: PCR APENAS.',
      ],
      outputs: ['drug_volume'],
    },
  },

  presentations: [
    {
      volume_ml: 1, // 20U/mL
      label: 'Vasopressina (20 U/mL)',
    },
  ],

  dilution_and_preparation: {
    hard_rules: [
      'NUNCA confundir Unidades (U) com Miliunidades (mU). Erro de 1000x é fatal (necrose/isquemia maciça).',
      'Diluir sempre. A ampola é muito concentrada (20 U/mL) para uso direto em CRI.',
      'CRI OBRIGATÓRIA para choque (não fazer bolus repetido).',
    ],
    recommended_targets: [
      {
        target_u_ml: 0.1, // 100 mU/mL
        use_cases: ['Padrão (Seguro)', 'CRI'],
        how_to_make: 'Diluir 1 U (0.05 mL da ampola) em 9.95 mL = 10 mL (difícil aspirar). MELHOR: 10 U (0.5 mL) em 100 mL.',
        recipe: 'Diluir 0.5 mL da ampola (10 U) em 100 mL NaCl 0.9% = 0.1 U/mL.',
      },
      {
        target_u_ml: 1, // 1000 mU/mL
        use_cases: ['Restrição hídrica extrema', 'Grandes animais'],
        how_to_make: 'Diluir 1 mL (20 U) em 19 mL = 20 mL de 1 U/mL. Ou 1 ampola (20 U) em 20 mL.',
        recipe: '1 U/mL = 1000 mU/mL.',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Glicose 5%'],
    stability: [
      {
        diluent: 'NaCl 0,9%',
        max_time_hours: 24,
        syringe_bag_change: '24h',
      },
    ],
    dedicated_line_required: true,
  },

  compatibility: {
    compatible_in_syringe_or_bag: ['Norepinefrina (Y-site geralmente ok)'],
  },

  ui_copy: {
    critical_warning_banner: 'CUIDADO UNIDADES: Dose é em mU/kg/min. Ampola é em U/mL. (1 U = 1000 mU).',
    common_errors: ['Prescrever em U/kg/min (dose 1000x maior = morte).', 'Achar que substitui volume.'],
  },

  presets: [
    {
      id: 'vaso_septic_shock',
      label: 'Choque Séptico Resgate (1 mU) 🆘',
      dose_mukgmin: 1.0,
      limits: { min: 0.5, max: 2.0 },
      clinical_target: 'Poupar noradrenalina / elevar PAM em refratários.',
    },
    {
      id: 'vaso_pcr',
      label: 'PCR (0.8 U/kg Bolus) ⚡',
      dose_ukg: 0.8, // Bolus
      limits: { min: 0.8, max: 0.8 },
      clinical_target: 'Parada Cardíaca (Alternativa Epinefrina).',
    },
  ],

  references: [
    {
      section: 'Doses',
      source: 'Plumb\'s Veterinary Drug Handbook / Surviving Sepsis.',
    },
  ],
}
