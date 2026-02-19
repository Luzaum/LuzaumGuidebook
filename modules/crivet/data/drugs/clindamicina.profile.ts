import type { DrugProfile } from '../../types/drugProfile'

export const clindamicinaProfile: DrugProfile = {
  drug_id: 'clindamicina',
  name_pt: 'Clindamicina',
  name_en: 'Clindamycin',
  synonyms: ['Dalacin', 'Lincosamida'],
  class: ['Antimicrobiano', 'Lincosamida'],

  core_concepts: {
    taglines: [
      'Escolha de primeira linha para piodermites, osteomielites e infecções dentárias.',
      'Ativa contra anaeróbios e Gram-positivos (S. aureus).',
      'Infusão IV rápida pode causar Parada Cardiorrespiratória (hipotensão grave).',
    ],
    mechanism: {
      clinical_metaphor: 'Excelente penetração em osso e pús (tecidos difíceis).',
    },
    pharmacodynamics: {
      onset_iv: 'Rápido.',
    },
    pharmacokinetics: {
      metabolism: 'Hepático.',
      excretion: 'Biliar/Renal. Ajuste em hepatopatas graves.',
    },
  },

  species_notes: {
    dogs: { key_point: 'Uso IV ou Oral. Monitorar hipotensão em infusão.', high_risk_notes: ['Infusão rápida > 30mg/min = PCR.'] },
    cats: { key_point: 'Esofagite comum com comprimidos/cápsulas "a seco".', high_risk_notes: ['Sempre administrar água após oral.'] },
  },

  indications: {
    primary: [
      'Infecções odontológicas/periorais.',
      'Osteomielite estafilocócica.',
      'Infecções de pele profundas / Abcessos.',
      'Toxoplasmose / Neosporose (dose alta).',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Bolus IV rápido',
        why: 'Hipotensão severa e colapso cardiovascular.',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Insuficiência Hepática Grave',
        why: 'Metabolismo reduzido (aumentar intervalo).',
        level: 'WARNING',
      },
      {
        condition: 'Colite pseudomembranosa',
        why: 'Raro em vet, mas possível.',
        level: 'WARNING',
      },
    ],
  },

  alerts_by_comorbidity: [
    {
      key: 'hepatic',
      level: 'WARNING',
      title: 'Hepatopatia Grave',
      why: 'Metabolismo reduzido.',
      action: ['Reduzir dose em 50% ou aumentar intervalo.'],
    },
  ],

  doses: {
    unit_standard_cri: 'mg/kg',
    dog: {
      bolus: {
        mgkg: {
          min: 5.5,
          max: 11,
          note: '5.5-11 mg/kg BID (12/12h). Doses mais altas (até 20 mg/kg) para Toxoplasma.',
        },
        route: 'IV',
      },
      adjustments: {
        comorbidities: 'Hepato: Reduzir dose em 50% ou aumentar intervalo.',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 5.5,
          max: 11,
          note: 'Cuidado oral: pode causar esofagite (seguir com água).',
        },
        route: 'IV',
      },
    },
  },

  presentations: [
    {
      concentration_mg_ml: 150,
      label: 'Clindamicina Injetável (150mg/mL)',
      examples: ['Dalacin C', 'Genérico'],
      concentration_trap_warning: 'Diluir sempre!',
    },
    {
      total_mg: 75,
      label: 'Cápsulas 75mg',
    },
    {
      total_mg: 150,
      label: 'Cápsulas 150mg',
    },
    {
      total_mg: 300,
      label: 'Cápsulas 300mg',
    },
  ],

  calculation_templates: {
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg'],
      algorithm: [
        '1) Mg totais = peso * dose',
        '2) Volume = mg / (concentração mg/mL)',
        '3) Diluir a dose em NaCl ou D5W (concentração final < 12-18 mg/mL recomendada).',
        '4) Infundir em NO MÍNIMO 15-30 min. Taxa máx: 30 mg/min.',
      ],
      outputs: ['drug_volume'],
    },
  },

  dilution_and_preparation: {
    hard_rules: [
      'NUNCA EM BOLUS PURO.',
      'Taxa máxima de infusão: 30 mg/minuto (risco cardíaco).',
      'Diluir sempre antes de IV.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 6, // 6mg/mL
        use_cases: ['Infusão Intermitente'],
        how_to_make: 'Diluir dose 1:25. Ex: 300 mg (2 mL) em 50 mL NaCl.',
        recipe: 'Diluir dose total para correr em 30 min.',
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
  },

  compatibility: {
    compatible_in_syringe_or_bag: ['Metronidazol (Y-site)'],
    incompatible: [
      {
        agent: 'Aminofilina, Barbitúricos, Cálcio, Magnésio',
        why: 'Precipitação.',
        risk: 'precipitação',
      },
    ],
  },

  ui_copy: {
    critical_warning_banner: 'INFUSÃO MAX 30 MG/MIN. Risco de Parada Cardíaca se rápido.',
    common_errors: ['Bolus IV direto (pode matar).', 'Não diluir corretamente.'],
  },

  presets: [
    {
      id: 'clinda_std',
      label: 'Infecção Tecido Mole (11 mg/kg) 🩹',
      dose_mgkg: 11,
      limits: { min: 5.5, max: 20 },
      clinical_target: 'Pele, osso, boca.',
    },
    {
      id: 'clinda_toxo',
      label: 'Toxoplamose (12.5 mg/kg) 🦠',
      dose_mgkg: 12.5,
      limits: { min: 10, max: 25 },
      clinical_target: 'Dose alta para protozoários.',
    },
  ],

  references: [
    {
      section: 'Doses / Segurança Cardíaca',
      source: 'Plumb\'s Veterinary Drug Handbook.',
    },
  ],
}
