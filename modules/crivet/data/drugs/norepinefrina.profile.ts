import type { DrugProfile } from '../../types/drugProfile'

export const norepinefrinaProfile: DrugProfile = {
  drug_id: 'norepinefrina',
  name_pt: 'Norepinefrina (Noradrenalina)',
  name_en: 'Norepinephrine',
  synonyms: ['Levophed', 'Vasopressor'],
  class: ['Vasopressor', 'Catecolamina', 'Simpatomimético'],

  core_concepts: {
    taglines: [
      'Vasopressor de primeira escolha para choque séptico e hipotensão refratária.',
      'Potente efeito alfa-1 (vasoconstrição) e leve beta-1 (inotropismo positivo).',
      'Extravasamento causa necrose tecidual grave (antídoto: fentolamina local).',
    ],
    mechanism: {
      primary_effects: {
        cardiovascular: 'Vasoconstrição potente (arterial e venosa) = ↑ RVS e PAM. Aumento moderado da contratilidade (beta-1); FC pode cair por reflexo vagal.',
      },
      clinical_metaphor: 'Aperta os vasos para subir a pressão.',
    },
    pharmacodynamics: {
      onset_iv: 'Imediato (segundos a 1 min).',
      duration: '1-2 min após parar infusão.',
    },
    pharmacokinetics: {
      metabolism: 'Rápido (médula adrenal, tecidos).',
      excretion: 'Renal (metabólitos).',
    },
  },

  species_notes: {
    dogs: { key_point: 'Iniciar com 0.1-0.2 mcg/kg/min.' },
    cats: { key_point: 'Doses semelhantes. Monitorar arritmias.' },
  },

  indications: {
    primary: [
      'Choque séptico (vasoplegia).',
      'Hipotensão grave durante anestesia (após bolus de fluidos ineficaz).',
      'Choque pós-PCR.',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Hipovolemia não corrigida',
        why: 'Vasoconstrição em sistema "vazio" causa isquemia orgânica e acidose láctica.',
        level: 'CRITICAL',
      },
    ],
    relative: [
      {
        condition: 'Trombose vascular mesentérica/periférica',
        why: 'Piora a isquemia.',
        level: 'WARNING',
      },
    ],
  },

  alerts_by_comorbidity: [
    {
      key: 'hypovolemia',
      level: 'CRITICAL',
      title: 'Hipovolemia',
      why: 'Risco de isquemia grave.',
      action: ['Corrigir volume antes.'],
    },
  ],

  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      bolus: {
        mgkg: { min: 0, max: 0, note: 'NUNCA FAZER BOLUS' },
        route: 'IV',
      },
      cri: {
        mcgkgmin: {
          min: 0.1,
          max: 2.0,
          note: 'Start: 0.1-0.5 mcg/kg/min. Titular para PAM > 65 mmHg. Sepse grave requer > 1.0 mcg/kg/min.',
        },
        titration: {
          increment: '0.1 mcg/kg/min',
          interval: '3-5 min',
        },
        max: 3.0,
      },
      adjustments: {
        obesity: 'Calcular por peso ideal.',
        shock: 'Corrigir hipovolemia antes de vasopressor.',
        hypoalbuminemia: 'Sem ajuste.',
        comorbidities: 'Arritmias: monitorar ECG. Extravasamento: necrose.',
      },
      therapeutic_targets: {
        target_map: 'PAM > 65-70 mmHg',
        target_etco2: 'Monitorar perfusão e lactato',
        analgesia_scale: 'N/A',
        sedation_target: 'N/A',
      },
    },
    cat: {
      cri: {
        mcgkgmin: {
          min: 0.1,
          max: 1.0,
          note: 'Semelhante a cães, mas monitorar arritmias.',
        },
        titration: {
          increment: '0.05-0.1 mcg/kg/min',
          interval: '5 min',
        },
        max: 2.0,
      },
    },
  },

  presentations: [
    {
      concentration_mg_ml: 1, // 1mg/mL
      label: 'Norepinefrina 1 mg/mL (4mg/4mL)',
      examples: ['Hemitartarato 4mg/4mL'],
    },
    {
      concentration_mg_ml: 2, // 2mg/mL
      label: 'Norepinefrina 2 mg/mL (8mg/4mL)',
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
        '3) Calcular mL/h com base na concentração.',
      ],
      outputs: ['pump_rate_ml_h'],
    },
  },

  dilution_and_preparation: {
    hard_rules: [
      'Diluir em glicose 5% (preferível para estabilidade longa) ou NaCl 0,9% (estável por 24h).',
      'Proteger da luz se infusão prolongada.',
      'Risco grave de necrose se extravasar: usar cateter central ou periférico calibroso e seguro.',
    ],
    recommended_targets: [
      {
        target_mcg_ml: 16,
        use_cases: ['Cães pequenos/Gatos', 'Doses baixas'],
        how_to_make: 'Diluir 1 ampola (4mg) em 250mL de SG5% ou SF.',
        recipe: '4000 mcg / 250 mL = 16 mcg/mL.',
      },
      {
        target_mcg_ml: 32,
        use_cases: ['Cães médios', 'Sepse padrão'],
        how_to_make: 'Diluir 2 ampolas (8mg) em 250mL.',
        recipe: '8000 mcg / 250 mL = 32 mcg/mL.',
      },
      {
        target_mcg_ml: 64,
        use_cases: ['Cães gigantes', 'Choque refratário'],
        how_to_make: 'Diluir 4 ampolas (16mg) em 250mL.',
        recipe: '16000 mcg / 250 mL = 64 mcg/mL.',
      },
    ],
    diluents_allowed: ['Glicose 5% (ideal)', 'NaCl 0,9% (aceitável)'],
    stability: [
      {
        diluent: 'Glicose 5%',
        max_time_hours: 24,
        syringe_bag_change: '24h',
      },
    ],
  },

  compatibility: {
    compatible_in_syringe_or_bag: ['Dobutamina', 'Fentanil'],
    incompatible: [
      {
        agent: 'Bicarbonato de Sódio / Soluções Alcalinas',
        why: 'Inativação óbvia (oxidação rosa/marrom).',
        risk: 'perda de eficácia',
      },
    ],
    dedicated_line_rules: ['Via exclusiva altamente recomendada.'],
  },

  administration_and_titration: {
    bolus_guidance: ['Norepinefrina é exclusiva para CRI; não administrar em bolus.'],
    titration_rules: [
      'Titular por targets de PAM, perfusão periférica, lactato e diurese.',
      'Ajustar em passos pequenos a cada 3–5 min conforme resposta hemodinâmica.',
      'Priorizar acesso central; se periférico, monitorar extravasamento e dor local continuamente.',
    ],
    monitoring_minimum: ['PAM contínua/invasiva', 'FC/ECG', 'lactato seriado', 'diurese', 'perfusão periférica'],
  },

  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'norepi_shock_flow',
        title: 'Choque séptico/vasoplégico: titulação de norepinefrina',
        mermaid:
          'flowchart TD\nA[Choque vasoplégico] --> B[Corrigir volemia e iniciar monitorização]\nB --> C[Iniciar norepinefrina em CRI]\nC --> D[Reavaliar PAM/perfusão/lactato/diurese em 3-5 min]\nD --> E{Meta atingida?}\nE -- Não --> F[Titular dose]\nE -- Sim --> G[Manter menor dose eficaz]\nF --> D',
      },
    ],
  },

  ui_copy: {
    critical_warning_banner: 'VASOPRESSOR POTENTE. Extravasamento = NECROSE.',
    common_errors: [
      'Tentar corrigir hipovolemia com amina sem dar volume antes.',
      'Acesso venoso inadequado.',
      'Infundir em via periférica sem vigilância ativa de extravasamento.',
      'Titular sem alvo explícito de PAM/perfusão.',
    ],
  },

  presets: [
    {
      id: 'norepi_septic_shock',
      label: 'Choque Séptico Inicial (0.2 mcg) 🦠',
      dose_mcgkgmin: 0.2,
      limits: { min: 0.05, max: 2.0 },
      clinical_target: 'Manter PAM > 65 mmHg.',
    },
    {
      id: 'diluicao_padrao_4mg_250ml',
      label: 'Diluição: 1 Amp (4mg) em 250mL',
      clinical_target: 'Concentração final 16 mcg/mL.',
      dose_mcgkgmin: 0.1, // Apenas para inicializar
    },
  ],

  references: [
    {
      section: 'Doses',
      source: 'Surviving Sepsis Campaign / Plumb\'s.',
    },
  ],
}
