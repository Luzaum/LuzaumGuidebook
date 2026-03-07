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
    // 🆘 CRÍTICO — UNIDADES: dose em mU/kg/min (MILIUNIDADES por kg por minuto)
    // A ampola comercial é 20 U/mL (= 20.000 mU/mL). Confundir U com mU = erro 1000×
    // Engine verifica: se concentração inserida >= 10 U/mL → bloqueia e exige pré-diluição
    unit_standard_cri: 'mukgmin', // mU/kg/min — MILIUNIDADES (1 U = 1.000 mU)
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
      '🆘 CRÍTICO — UNIDADES: A dose é em mU/kg/min (MILIUNIDADES). A ampola comercial é 20 U/mL. 1 U = 1.000 mU. Erro de unidade = dose 1.000× maior = necrose isquêmica maciça/morte.',
      '⛔ PRÉ-DILUIÇÃO OBRIGATÓRIA: a engine BLOQUEIA uso de ampola (≥ 10 U/mL) diretamente na seringa de CRI. O usuário deve inserir a concentração APÓS pré-diluição (0,1–1 U/mL).',
      'PRÉ-DILUIÇÃO antes da CRI (Plumb\'s Veterinary Drug Handbook): escolha uma das opções e use ESSA concentração na engine.',
      'CRI OBRIGATÓRIA para choque (não fazer bolus repetido exceto PCR).',
    ],
    recommended_targets: [
      {
        target_u_ml: 0.1, // 100 mU/mL — OPÇÃO A (padrão, mais segura)
        use_cases: ['Padrão UTI — opção mais segura (menor risco de erro de taxa)', 'Cães pequenos e gatos', 'CRI em qualquer paciente'],
        how_to_make: 'ETAPA 1 (pré-diluição): aspirar 0,5 mL da ampola (20 U/mL) = 10 U. Adicionar 99,5 mL de NaCl 0,9% → solução mãe 0,1 U/mL (100 mU/mL). ETAPA 2: usar essa solução mãe para calcular o volume a aspirar para a seringa de CRI.',
        recipe: '0,5 mL da ampola (20 U/mL) + 99,5 mL NaCl 0,9% = 100 mL a 0,1 U/mL = 100 mU/mL.',
      },
      {
        target_u_ml: 0.5, // 500 mU/mL — OPÇÃO B (intermediária)
        use_cases: ['CRI padrão em cães médios/grandes (volumes práticos)', 'Restrição hídrica moderada'],
        how_to_make: 'ETAPA 1: aspirar 0,5 mL da ampola (10 U) + 19,5 mL NaCl 0,9% = 20 mL a 0,5 U/mL. ETAPA 2: usar para calcular seringa.',
        recipe: '0,5 mL da ampola (20 U/mL) + 19,5 mL NaCl 0,9% = 20 mL a 0,5 U/mL = 500 mU/mL.',
      },
      {
        target_u_ml: 1.0, // 1000 mU/mL — OPÇÃO C (concentrada, restrição hídrica)
        use_cases: ['Restrição hídrica extrema', 'Doses altas de resgate'],
        how_to_make: 'ETAPA 1: aspirar 1 mL da ampola (20 U) + 19 mL NaCl 0,9% = 20 mL a 1 U/mL. ETAPA 2: usar para calcular seringa.',
        recipe: '1 mL da ampola (20 U/mL) + 19 mL NaCl 0,9% = 20 mL a 1 U/mL = 1.000 mU/mL.',
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

  administration_and_titration: {
    bolus_guidance: ['Em choque, usar vasopressina em CRI titulada; bolus repetido não é recomendado.'],
    titration_rules: [
      'Titular por targets de PAM, perfusão periférica, lactato e diurese.',
      'Ajustar gradualmente para evitar vasoconstrição excessiva e isquemia.',
      'Preferir acesso central; se periférico, monitorar extravasamento e perfusão distal.',
    ],
    monitoring_minimum: ['PAM', 'lactato seriado', 'diurese', 'perfusão periférica', 'sinais de isquemia'],
  },

  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'vasopressina_shock_flow',
        title: 'Choque refratário: adição e titulação de vasopressina',
        mermaid:
          'flowchart TD\nA[Choque refratário com norepinefrina] --> B[Confirmar volemia e metas de PAM]\nB --> C[Adicionar vasopressina em baixa dose]\nC --> D[Reavaliar PAM/perfusão/lactato/diurese]\nD --> E{Meta atingida?}\nE -- Não --> F[Titular cuidadosamente]\nE -- Sim --> G[Manter menor dose eficaz]\nF --> D',
      },
    ],
  },

  ui_copy: {
    critical_warning_banner:
      '🆘 CRÍTICO — UNIDADES: A dose é em mU/kg/min (MILIUNIDADES). A ampola é 20 U/mL. 1 U = 1.000 mU. Confundir U com mU = dose 1.000× maior = necrose isquêmica generalizada/morte. PRÉ-DILUIÇÃO OBRIGATÓRIA antes de qualquer CRI (ver receitas de diluição).',
    alert_messages: {
      short: 'Dose: mU/kg/min. Ampola: 20 U/mL. 1 U = 1.000 mU. Pré-diluir SEMPRE.',
      long: 'Vasopressina é vasopressor não-adrenérgico com dose clínica de 0,5–5 mU/kg/min (miliunidades). A ampola comercial é altamente concentrada (20 U/mL). Confundir a unidade de prescrição (mU) com a unidade da ampola (U) resulta em dose 1.000× maior — potencialmente fatal por vasoconstrição maciça/isquemia. Pré-diluição para 0,1–1 U/mL é obrigatória (Plumb\'s). A engine bloqueia qualquer tentativa de uso da ampola diretamente na CRI.',
    },
    block_message: '⛔ BLOQUEADO: Concentração de ampola (≥ 10 U/mL) não permitida para CRI direta. Selecione concentração APÓS pré-diluição (0,1 / 0,5 / 1,0 U/mL) e reinsira.',
    common_errors: [
      'Prescrever em U/kg/min em vez de mU/kg/min (dose 1.000× maior — fatal).',
      'Usar ampola (20 U/mL) diretamente na seringa de CRI sem pré-diluição.',
      'Achar que vasopressina substitui expansão volêmica (é vasopressor de resgate, não volume).',
      'Não considerar isquemia de extremidades/mesentérica em doses altas prolongadas.',
      'Manter acesso periférico sem checar extravasamento e perfusão distal.',
    ],
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
