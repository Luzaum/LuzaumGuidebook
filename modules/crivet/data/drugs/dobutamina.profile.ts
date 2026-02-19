import type { DrugProfile } from '../../types/drugProfile'

export const dobutaminaProfile: DrugProfile = {
  drug_id: 'dobutamina',
  name_pt: 'Dobutamina',
  name_en: 'Dobutamine',
  synonyms: ['Dobutrex', 'Inotrópico Beta-1'],
  class: ['Inotrópico positivo', 'Simpatomimético', 'Agonista beta-1'],

  core_concepts: {
    taglines: [
      'Aumenta força de contração cardíaca (inotropismo) com pouca vasoconstrição.',
      'Droga de escolha para falência miocárdica e choque cardiogênico (com PAS razoável).',
      'Meia-vida ultra-curta (2 min): requer infusão contínua (CRI).',
    ],
    mechanism: {
      primary_effects: {
        cardiovascular: 'Aumento do Débito Cardíaco (DC), volume sistólico e fluxo renal. Vasodilatação reflexa leve (beta-2) ou neutra.',
      },
      clinical_metaphor: 'O "turbo" do coração pifado. Faz bater mais forte.',
    },
    pharmacodynamics: {
      onset_iv: '1-2 min',
      duration: '< 10 min (após parada da infusão).',
    },
    pharmacokinetics: {
      metabolism: 'Rápido (tecidual e hepático).',
      excretion: 'Renal (metabólitos).',
    },
  },

  species_notes: {
    dogs: {
      key_point: 'Iniciar com 2-5 mcg/kg/min. Seguro.',
    },
    cats: {
      key_point: 'Mais sensíveis a tremores e taquicardia. Dose máx recomendada menor (10 mcg).',
      high_risk_notes: ['Se tiver HCM obstrutiva, usar com extrema cautela ou evitar.'],
    },
  },

  indications: {
    primary: [
      'Insuficiência cardíaca congestiva descompensada (ICD).',
      'Choque cardiogênico.',
      'Suporte inotrópico em sepse (após repleção volêmica).',
      'Hipotensão refratária a fluidos decorrente de contratilidade miocárdica pobre (anestesia).',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Estenose Subaórtica (SAS) grave',
        why: 'Inotropismo agrava obstrução dinâmica da via de saída.',
        level: 'BLOCK',
      },
      {
        condition: 'Cardiomiopatia Hipertrófica Felina (HCM) obstrutiva',
        why: 'Piora obstrução e gradiente de pressão.',
        level: 'CRITICAL',
      },
      {
        condition: 'Bolus IV',
        why: 'Arritmias fatais e taquicardia severa.',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Taquiarritmias ventriculares não tratadas',
        why: 'Pode exacerbar arritmias (efeito beta-1).',
        level: 'WARNING',
      },
    ],
  },

  alerts_by_comorbidity: [
    {
      key: 'hcm_feline',
      level: 'BLOCK',
      title: 'HCM Obstrutiva',
      why: 'Contraindicado inotrópico positivo em obstrução dinâmica.',
      action: ['Não usar.'],
    },
    {
      key: 'arrhythmia',
      level: 'WARNING',
      title: 'Taquiarritmias Ventriculares',
      why: 'Risco de piora.',
      action: ['Monitorar ECG.', 'Considerar reduzir dose.'],
    },
  ],

  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      bolus: {
        mgkg: { min: 0, max: 0, note: 'NUNCA administrar em bolus. Exclusivo para CRI.' },
        route: 'IV',
      },
      cri: {
        mcgkgmin: {
          min: 2,
          max: 20,
          note: 'Start: 2-5 mcg/kg/min. Titular até efeito (PAM, perfusão). Doses > 15-20 aumentam risco de taquicardia/arritmia sem ganho de DC.',
        },
        titration: {
          increment: '1-2 mcg/kg/min',
          interval: '10-15 min',
        },
        max: 20,
      },
      adjustments: {
        obesity: 'Calcular por peso ideal.',
        shock: 'Corrigir hipovolemia antes de iniciar inotrópico.',
        hypoalbuminemia: 'Sem ajuste específico.',
        comorbidities: 'Arritmias: reduzir dose ou trocar. Incompatível com bicarbonato.',
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
          min: 1,
          max: 10,
          note: 'Gatos são mais sensíveis a tremores/convulsões e taquicardia. Dose segura: 1-5 mcg/kg/min.',
        },
        titration: {
          increment: '0.5-1 mcg/kg/min',
          interval: '15 min',
        },
        max: 10,
      },
    },
  },

  presentations: [
    {
      concentration_mg_ml: 12.5,
      label: 'Dobutamina 12.5mg/mL (Ampola)',
      examples: ['Dobutrex 250mg/20mL'],
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
        '3) Calcular mL/h com base na concentração da solução preparada.',
        '4) Hack Comum: 1 ampola (250mg) em 250mL = 1 mg/mL = 1000 mcg/mL.',
      ],
      outputs: ['pump_rate_ml_h'],
    },
  },

  dilution_and_preparation: {
    hard_rules: [
      'Incompatível com bicarbonato (precipita).',
      'Solução pode ficar levemente rosa (oxidação) - seguro se dentro de 24h.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 1, // 1000 mcg/mL
        use_cases: ['Cães médios/grandes', 'Padrão UTI'],
        how_to_make: 'Diluir 1 ampola (250 mg/20mL) em 230mL de diluente (Total 250mL).',
        recipe: '1 Ampola (250mg) + Bag de 250mL (retirar 20mL ou somar) ≈ 1 mg/mL.',
      },
      {
        target_mg_ml: 4, // 4000 mcg/mL
        use_cases: ['Cães gigantes', 'Restrição hídrica'],
        how_to_make: '4 ampolas em 250mL ou 1 ampola em 62.5mL.',
      },
      {
        target_mg_ml: 12.5, // Pura
        use_cases: ['Seringa (Perfusor)'],
        how_to_make: 'Aspirar direto da ampola (12.5 mg/mL).',
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
    compatible_in_syringe_or_bag: ['Lidocaína (pode misturar no bag)'],
    incompatible: [
      {
        agent: 'Bicarbonato de Sódio / Soluções Alcalinas',
        why: 'Inativação química imediata.',
        risk: 'perda de eficácia',
      },
      {
        agent: 'Furosemida',
        why: 'Precipitação.',
        risk: 'precipitação',
      },
    ],
    dedicated_line_rules: ['Não deve ser interrompida para wash/bolus de outras drogas.'],
  },

  ui_copy: {
    critical_warning_banner: 'Inotrópico Potente. Monitorar ECG (Risco de taquiarritmia).',
    common_errors: ['Misturar com Bicarbonato.', 'Achar que resolve hipotensão vasoplégica (precisa de nora).'],
  },

  presets: [
    {
      id: 'dobuta_start_dog',
      label: 'Cão - Início Standard (5 mcg) 🐕',
      dose_mcgkgmin: 5,
      limits: { min: 2, max: 20 },
      clinical_target: 'Suporte inotrópico inicial.',
    },
    {
      id: 'dobuta_cat_low',
      label: 'Gato - Dose Baixa (2 mcg) 🐈',
      dose_mcgkgmin: 2,
      limits: { min: 1, max: 5 },
      clinical_target: 'Melhorar contratilidade evitar taqui.',
    },
    {
      id: 'hack_dobuta_1mgml',
      label: 'Hack: 1 Amp em 250mL SOLUÇÃO',
      clinical_target: 'Gera concentração de 1 mg/mL (1000 mcg/mL).',
      dose_mcgkgmin: 5,
    },
  ],

  references: [
    {
      section: 'Doses',
      source: 'Plumb\'s Veterinary Drug Handbook.',
    },
  ],
}
