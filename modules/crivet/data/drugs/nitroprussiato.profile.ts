import type { DrugProfile } from '../../types/drugProfile'

export const nitroprussiatoProfile: DrugProfile = {
  drug_id: 'nitroprussiato',
  name_pt: 'Nitroprussiato de Sódio',
  name_en: 'Sodium Nitroprusside',
  synonyms: ['Nipride', 'Nitropress'],
  class: ['Vasodilatador direto', 'Doador de óxido nítrico'],

  core_concepts: {
    taglines: [
      'Vasodilatador arterial e venoso potente e ultra-rápido.',
      'Reduz pré-carga e pós-carga imediatamente (ideal para Edema Pulmonar Cardiogênico grave / HAS severa).',
      'Fotossensível: proteger equipos e frascos da luz.',
    ],
    mechanism: {
      clinical_metaphor: 'Abre as comportas vasculares instantaneamente para "desafogar" o coração.',
      primary_effects: {
        cardiovascular: 'Vasodilatação intensa e imediata (Doação de NO no músculo liso vascular). Redução abrupta da PA média, pré e pós-carga.',
      },
    },
    pharmacodynamics: {
      onset_iv: '< 1 min (imediato).',
      duration: '1-10 min (cessa logo após parar infusão).',
    },
    pharmacokinetics: {
      metabolism: 'Eritrócitos (libera cianeto -> hepático -> tiocianato).',
      excretion: 'Renal (tiocianato). Risco de acúmulo.',
    },
  },

  species_notes: {
    dogs: {
      key_point: 'Monitorização invasiva da pressão arterial (PAI) é mandatória/ideal.',
      high_risk_notes: ['Hipotensão severa se bolus ou erro de cálculo.'],
    },
    cats: {
      key_point: 'Mais sensíveis à hipotensão abrupta e toxicidade por cianeto.',
      high_risk_notes: ['Gatos têm metabolismo de cianeto menos eficiente? Cautela em infusão prolongada (>24h).'],
    },
  },

  indications: {
    primary: [
      'Crise hipertensiva grave.',
      'Edema agudo de pulmão cardiogênico (IC esquerda fulminante) - reduz pós-carga.',
      'Regurgitação mitral aguda grave.',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Hipotensão Pré-existente',
        why: 'Vasodilatação agravará o choque fatalmente.',
        level: 'BLOCK',
      },
      {
        condition: 'Hipertensão Intracraniana (TCE)',
        why: 'Pode manter ou elevar PIC por vasodilatação cerebral (aumenta volume sanguíneo cerebral).',
        level: 'CRITICAL',
      },
      {
        condition: 'Bolus IV',
        why: 'Hipotensão Irreversível e Morte.',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Insuficiência Hepática Grave',
        why: 'Risco de intoxicação por cianeto.',
        level: 'CRITICAL',
      },
      {
        condition: 'Insuficiência Renal Grave',
        why: 'Acúmulo de tiocianato (tóxico: psicose, convulsão).',
        level: 'CRITICAL',
      },
    ],
  },

  alerts_by_comorbidity: [
    {
      key: 'liver_failure',
      level: 'CRITICAL',
      title: 'Hepatopatia',
      why: 'Risco de toxicidade por cianeto.',
      action: ['Evitar uso prolongado.', 'Monitorar lactato/acidose.'],
    },
    {
      key: 'renal_failure',
      level: 'CRITICAL',
      title: 'Insuficiência Renal',
      why: 'Acúmulo de tiocianato.',
      action: ['Monitorar sinais neurológicos.'],
    },
    {
      key: 'icp',
      level: 'BLOCK',
      title: 'Hipertensão Intracraniana',
      why: 'Aumenta fluxo cerebral e PIC.',
      action: ['Evitar (prefira Labetalol/Esmolol se precisar).'],
    },
  ],

  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      // BOLUS REMOVIDO INTENCIONALMENTE
      cri: {
        mcgkgmin: {
          min: 0.5,
          max: 10,
          note: 'Start: 0.5-1 mcg/kg/min. Titular a cada 3-5 min. Dose média usual: 1-3 mcg/kg/min.',
        },
        titration: {
          increment: '0.5 mcg/kg/min',
          interval: '3-5 min',
        },
        max: 10,
      },
    },
    cat: {
      // BOLUS REMOVIDO
      cri: {
        mcgkgmin: {
          min: 0.5,
          max: 5,
          note: 'Start low: 0.5 mcg/kg/min. Monitorar hipotensão severa.',
        },
        titration: {
          increment: '0.25-0.5 mcg/kg/min',
          interval: '5 min',
        },
        max: 5,
      },
    },
  },

  presentations: [
    {
      total_mg: 50,
      label: 'Nitroprussiato 50mg (Pó Liofilizado)',
      examples: ['Nipride 50mg'],
      concentration_trap_warning: 'Requer reconstituição e DEPOIS diluição obrigatória!',
    },
  ],

  calculation_templates: {
    cri: {
      required_inputs: [
        'weight_kg',
        'target_mcgkgmin',
        'pump_rate_ml_h_override',
      ],
      algorithm: [
        '1) Calcular mcg/min = peso * dose',
        '2) Calcular mcg/h = mcg/min * 60',
        '3) Calcular mL/h com base na concentração (usualmente 50 mcg/mL ou 100 mcg/mL).',
      ],
      outputs: ['pump_rate_ml_h'],
    },
  },

  dilution_and_preparation: {
    hard_rules: [
      'FOTOSSENSÍVEL: Envolver frasco e equipo em papel alumínio ou plástico opaco imediatamente.',
      'Diluir preferencialmente em Glicose 5% (D5W) para maior estabilidade.',
      'Solução deve ser levemente marrom/laranja clara. Se ficar azul, verde ou vermelho escuro = inativado/tóxico (não usar).',
      'NUNCA EM BOLUS.',
    ],
    recommended_targets: [
      {
        target_mcg_ml: 50,
        use_cases: ['Padrão Hospitalar', 'Cães peq/médios e Gatos'],
        how_to_make: 'Diluir 50 mg em 1000 mL D5W (ou 12.5 mg em 250 mL).',
        recipe: '50 mg / 1000 mL = 50 mcg/mL.',
      },
      {
        target_mcg_ml: 200,
        use_cases: ['Cães grandes', 'Restrição hídrica'],
        how_to_make: 'Diluir 50 mg em 250 mL D5W.',
        recipe: '50 mg / 250 mL = 200 mcg/mL.',
      },
    ],
    diluents_allowed: ['Glicose 5% (Ideal)', 'NaCl 0,9% (Aceitável, menos estável)'],
    stability: [
      {
        diluent: 'Glicose 5%',
        max_time_hours: 24,
        light_protection: true,
        syringe_bag_change: 'Trocar solução a cada 4-24h se exposta (mesmo protegida). (Anteriormente 24h)',
      },
    ],
    dedicated_line_required: true,
  },

  compatibility: {
    incompatible: [
      {
        agent: 'Muitas drogas',
        why: 'Incompatibilidade química complexa.',
        risk: 'precipitação/inativação',
      },
    ],
    dedicated_line_rules: ['Via exclusiva obrigatória.'],
  },

  administration_and_titration: {
    bolus_guidance: ['Nitroprussiato é exclusivo para CRI; bolus é contraindicado.'],
    titration_rules: [
      'Titular em passos pequenos com alvo claro de PAM, perfusão periférica, lactato e diurese.',
      'Reavaliar em intervalos curtos (3–5 min) para evitar queda abrupta de pressão.',
      'Preferir acesso central; se periférico, monitorar local de punção para extravasamento.',
    ],
    monitoring_minimum: ['PAM contínua/invasiva', 'FC/ECG', 'lactato', 'perfusão periférica', 'diurese'],
  },

  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'nitro_shock_hypertension_flow',
        title: 'Choque hipertensivo/afterload alto: uso de nitroprussiato',
        mermaid:
          'flowchart TD\nA[Paciente crítico com alvo de redução de pós-carga/PAM] --> B[Confirmar monitorização contínua]\nB --> C[Iniciar CRI baixa]\nC --> D[Reavaliar PAM/perfusão/lactato/diurese em 3-5 min]\nD --> E{Meta atingida?}\nE -- Não --> F[Titular gradualmente]\nE -- Sim --> G[Manter menor dose eficaz]\nF --> D',
      },
    ],
  },

  ui_copy: {
    critical_warning_banner: 'PROTEGER DA LUZ. Hipotensor potente - monitorar PA continuamente.',
    common_errors: [
      'Deixar exposto à luz (inativa em horas).',
      'Causar hipotensão profunda por titular muito rápido.',
      'Ignorar risco de extravasamento em acesso periférico frágil.',
      'Titular sem meta objetiva de PAM e perfusão.',
    ],
  },

  presets: [
    {
      id: 'nitro_hypertensive_crisis',
      label: 'Crise Hipertensiva (Start 1 mcg) 📉',
      dose_mcgkgmin: 1.0,
      limits: { min: 0.5, max: 10 },
      clinical_target: 'Reduzir PAM gradualmente.',
    },
    {
      id: 'nitro_edema_pulmonar',
      label: 'EAP Cardiogênico (Start 0.5 mcg) 🫀',
      dose_mcgkgmin: 0.5,
      limits: { min: 0.5, max: 5 },
      clinical_target: 'Vasodilatação para reduzir pré-carga.',
    },
  ],

  references: [
    {
      section: 'Doses e Segurança',
      source: 'Plumb\'s Veterinary Drug Handbook.',
    },
  ],
}
