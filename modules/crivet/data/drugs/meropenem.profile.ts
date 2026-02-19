import type { DrugProfile } from '../../types/drugProfile'

export const meropenemProfile: DrugProfile = {
  drug_id: 'meropenem',
  name_pt: 'Meropenem',
  name_en: 'Meropenem',
  synonyms: ['Merrem'],
  class: ['Antimicrobiano', 'Carbapenêmico'],

  core_concepts: {
    taglines: [
      'Carbapenêmico para infecções graves multirresistentes.',
      'Excelente penetração tecidual e estabilidade contra beta-lactamases.',
      'Instável após reconstituição: preparar imediatamente antes do uso.',
    ],
    mechanism: {
      primary_effects: {
        renal_hepatic: 'Excreção renal predominante. Requer ajuste em insuficiência renal.',
      },
      clinical_metaphor: 'A "artilharia pesada" para Gram-negativos resistentes (exceto MRSA).',
    },
    pharmacodynamics: {
      duration: 'Curta meia-vida. Intervalo de dose (TID) é crítico.',
    },
    pharmacokinetics: {
      metabolism: 'Mínimo.',
      excretion: 'Renal.',
    },
  },

  species_notes: {
    dogs: { key_point: 'Uso TID (q8h) preferencial em UTI. Alta segurança.' },
    cats: { key_point: 'Uso q12h aceitável em infecções leves, mas q8h ideal.' },
  },

  indications: {
    primary: [
      'Sepse grave com foco desconhecido ou multirresistente.',
      'Peritonite séptica.',
      'Pneumonia nosocomial.',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Hipersensibilidade a carbapenêmicos/beta-lactâmicos',
        why: 'Risco de anafilaxia.',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Insuficiência Renal Grave',
        why: 'Acúmulo da droga. Requer aumento do intervalo ou redução da dose.',
        level: 'WARNING',
      },
    ],
  },

  alerts_by_comorbidity: [
    {
      key: 'renal',
      level: 'WARNING',
      title: 'Insuficiência Renal',
      why: 'Excreção renal. Ajustar intervalo.',
      action: ['Verificar creatinina.'],
    },
  ],

  doses: {
    unit_standard_cri: 'mg/kg',
    dog: {
      bolus: {
        mgkg: {
          min: 10,
          max: 30,
          note: '10–30 mg/kg q8h (TID). Para Pseudomonas ou SNC, usar dose alta (30 mg/kg).',
        },
        route: 'IV',
      },
      adjustments: {
        comorbidities: 'Renal: Reduzir dose e/ou aumentar intervalo conforme creatinina/clearance.',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 10,
          max: 20,
          note: '10–20 mg/kg q12h-q8h. TID preferido em sepse.',
        },
        route: 'IV',
      },
    },
  },

  presentations: [
    {
      total_mg: 1000,
      label: 'Meropenem 1g (Pó)',
    },
    {
      total_mg: 500,
      label: 'Meropenem 500mg (Pó)',
    },
  ],

  calculation_templates: {
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg'],
      algorithm: [
        '1) Mg totais = peso * dose',
        '2) Reconstituição: Frasco 500mg + 10mL = 50 mg/mL.',
        '3) Volume droga (mL) = mg / 50',
        '4) Diluição: Diluir a dose em 10-50 mL de NaCl 0,9%.',
        '5) Tempo: Correr em 15-30 min.',
      ],
      outputs: ['drug_volume'],
    },
  },

  dilution_and_preparation: {
    hard_rules: [
      'Instabilidade química rápida: usar logo após reconstituir.',
      'Não congelar solução reconstituída.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 10,
        use_cases: ['Infusão Intermitente'],
        how_to_make: 'Diluir a dose em NaCl 0,9% para volume final conveniente.',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Glicose 5%'],
    stability: [
      {
        diluent: 'NaCl 0,9%',
        max_time_hours: 1, // Muito curto em temperatura ambiente
        light_protection: false,
        syringe_bag_change: 'Uso imediato',
      },
    ],
  },

  compatibility: {
    incompatible: [
      {
        agent: 'Soluções ácidas',
        why: 'Instabilidade.',
        risk: 'perda de eficácia',
      },
    ],
  },

  ui_copy: {
    critical_warning_banner: 'USO IMEDIATO. Instável após reconstituição.',
    common_errors: ['Reconstituir e guardar na geladeira por dias (perde potência).'],
  },

  presets: [
    {
      id: 'meropenem_uti',
      label: 'Dose UTI (Sepse) 🛑',
      dose_mgkg: 20,
      limits: { min: 10, max: 30 },
      clinical_target: 'Cobertura ampla.',
    },
  ],

  references: [
    {
      section: 'Doses',
      source: 'Plumb\'s.',
    },
  ],
}
