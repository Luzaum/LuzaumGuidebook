import type { DrugProfile } from '../../types/drugProfile'

export const ceftriaxonaProfile: DrugProfile = {
  drug_id: 'ceftriaxona',
  name_pt: 'Ceftriaxona',
  name_en: 'Ceftriaxone',
  synonyms: ['Rocefin', 'Triaxon', 'Cefalosporina 3ª geração'],
  class: ['Antimicrobiano', 'Cefalosporina de 3ª geração'],

  core_concepts: {
    taglines: [
      'Excelente penetração na barreira hematoencefálica (meningites).',
      'NUNCA misturar com cálcio (Ringer Lactato) na mesma via (precipitação fatal em neonatos; risco em adultos).',
      'Eliminação biliar significativa (bom para infecções biliares).',
    ],
    mechanism: {
      primary_effects: {
        renal_hepatic: 'Excreção mista: renal e biliar (seguro em renais, não requer ajuste).',
      },
      clinical_metaphor: 'O "coringa" das sepses e pneumonias, mas inimigo do cálcio.',
    },
    pharmacodynamics: {
      duration: 'Dose dependente. Meia-vida longa em cães.',
    },
    pharmacokinetics: {
      metabolism: 'Mínimo.',
      excretion: 'Biliar e Renal.',
    },
  },

  species_notes: {
    dogs: {
      key_point: 'Meia-vida longa (pode ser usado BID em dose padrão, SID possível).',
    },
    cats: {
      key_point: 'Meia-vida longa. Administração SC bem tolerada.',
    },
  },

  indications: {
    primary: [
      'Pneumonia bacteriana grave.',
      'Meningite / Infecções SNC.',
      'Sepse abdominal/biliar.',
      'Infecções ortopédicas.',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Hipersensibilidade a cefalosporinas/penicilinas',
        why: 'Risco de anafilaxia.',
        level: 'BLOCK',
      },
      {
        condition: 'Uso concomitante com soluções contendo Cálcio (Ringer Lactato)',
        why: 'Precipitação de ceftriaxona-cálcio nos pulmões/rins (descrito como fatal em neonatos; evitar em todos).',
        level: 'CRITICAL',
      },
    ],
    relative: [],
  },

  alerts_by_comorbidity: [
    {
      key: 'renal',
      level: 'SAFE', // Nível correto
      title: 'Insuficiência Renal',
      why: 'Excreção biliar compensatória. Não requer ajuste.',
      action: ['Monitorar função renal mas manter dose.'],
    },
  ],

  doses: {
    unit_standard_cri: 'mg/kg',
    dog: {
      bolus: {
        mgkg: {
          min: 30,
          max: 50,
          note: '30 mg/kg BID (12/12h) é padrão. 50 mg/kg para penetração SNC (meningite).',
        },
        route: 'IV',
      },
      adjustments: {
        comorbidities: 'Não requer ajuste em insuficiência renal (excreção biliar compensatória).',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 30,
          max: 50,
          note: '30 mg/kg 12/12h ou 24/24h.',
        },
        route: 'IV',
      },
    },
  },

  presentations: [
    {
      total_mg: 1000, // 1g
      label: 'Ceftriaxona 1g (Pó)',
      examples: ['Rocefin 1g IM/IV'],
      concentration_trap_warning: 'Requer reconstituição.',
    },
    {
      total_mg: 500, // 500mg
      label: 'Ceftriaxona 500mg (Pó)',
    },
  ],

  calculation_templates: {
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg'],
      algorithm: [
        '1) Mg totais = peso * dose',
        '2) Reconstituição recomendada: 1g + 9.6mL diluente = 10 mL (100 mg/mL)',
        '3) Volume droga (mL) = mg / 100',
        '4) Diluição para infusão: Diluir a dose em 10-50 mL de NaCl 0,9% e correr em 15-30 min.',
      ],
      outputs: ['drug_volume'],
    },
    cri: undefined, // Sem CRI, apenas intermittent infusion via bolus template ou ui
  },

  dilution_and_preparation: {
    hard_rules: [
      'NUNCA usar Ringer Lactato para reconstituir ou diluir (contém cálcio).',
      'Reconstituir pó 1g com 9,6 mL (ou 10mL para facilitar, ~100mg/mL) de água estéril ou NaCl.',
      'Correr infusão lenta (15-30 min) para evitar vômito/náusea e flebite.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 20,
        use_cases: ['Infusão Intermitente'],
        how_to_make: 'Diluir a dose calculada em 20-50mL de NaCl 0,9%.',
        recipe: 'Ex: Dose de 300mg (3mL) + 27mL NaCl = 30mL. Correr em 20 min.',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Glicose 5%', 'Água Estéril'],
    stability: [
      {
        diluent: 'NaCl 0,9%',
        max_time_hours: 24, // Reconstituído
        light_protection: false,
        syringe_bag_change: '24h',
      },
    ],
  },

  compatibility: {
    incompatible: [
      {
        agent: 'CÁLCIO (Gluconato, Ringer Lactato)',
        why: 'Precipitação fatal (cristais nos pulmões/rins).',
        risk: 'precipitação grave',
      },
    ],
  },

  ui_copy: {
    critical_warning_banner: 'PERIGO: NÃO MISTURAR COM RINGER LACTATO (Contém Cálcio).',
    common_errors: ['Infusão rápida causa vômito.', 'Esquecer que RL tem cálcio.'],
  },

  presets: [
    {
      id: 'ceftriaxona_padrao',
      label: 'Infusão Padrão (30 mg/kg) 🛡',
      dose_mgkg: 30,
      limits: { min: 30, max: 50 },
      clinical_target: 'Infecção sistêmica.',
    },
  ],

  references: [
    {
      section: 'Doses',
      source: 'Plumb\'s Veterinary Drug Handbook.',
    },
  ],
}
