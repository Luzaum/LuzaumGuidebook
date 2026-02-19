import type { DrugProfile } from '../../types/drugProfile'

export const diltiazemProfile: DrugProfile = {
  drug_id: 'diltiazem',
  name_pt: 'Diltiazem',
  name_en: 'Diltiazem',
  synonyms: ['Cardizem', 'Balcor'],
  class: ['Antiarrítmico Classe IV', 'Bloqueador de Canal de Cálcio'],

  core_concepts: {
    taglines: [
      'Controle de frequência cardíaca em Fibrilação Atrial (FA) e Taquiarritmias Supraventriculares.',
      'Reduz condução no nó AV (efeito dromotrópico negativo).',
      'Vasodilatador coronariano e periférico suave.',
    ],
    mechanism: {
      clinical_metaphor: 'O "freio de mão" para o nó AV taquicárdico.',
      primary_effects: {
        cardiovascular: 'Reduz FC e condução AV. Inotropismo negativo leve (cuidado em ICC sistólica). Relaxamento diastólico (lusitrópico positivo) importante em HCM.',
      },
    },
    pharmacodynamics: {
      onset_iv: '3 min (Bolus).',
      duration: '1-3h (Bolus), requer CRI ou doses repetidas.',
    },
    pharmacokinetics: {
      metabolism: 'Hepático extenso (CYP450).',
    },
  },

  species_notes: {
    dogs: {
      key_point: 'Biodisponibilidade oral variável. Meia-vida curta (3-5h).',
      high_risk_notes: ['Em ICC sistólica (DCM avançada), pode reduzir contratilidade. Usar com cautela.'],
    },
    cats: {
      key_point: 'Uso clássico em Cardiomiopatia Hipertrófica (HCM) para melhorar relaxamento diastólico e reduzir FC.',
      high_risk_notes: ['Pode ser substituído por Atenolol em protocolos modernos, mas útil se intolerância a beta-bloqueador.'],
    },
  },

  indications: {
    primary: [
      'Taquiarritmias Supraventriculares (TSV).',
      'Fibrilação Atrial (controle de frequência ventricular).',
      'Cardiomiopatia Hipertrófica Felina (HCM) - controle de FC/relaxamento.',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Bloqueio Atrioventricular (AV) de 2º ou 3º grau',
        why: 'Bloqueia ainda mais a condução nodal (risco de assistolia).',
        level: 'BLOCK',
      },
      {
        condition: 'Hipotensão Severa',
        why: 'Vasodilatação agrava o choque.',
        level: 'CRITICAL',
      },
      {
        condition: 'Síndrome do Nódulo Sinusal (sem marcapasso)',
        why: 'Bradicardia grave.',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Insuficiência Cardíaca Congestiva (ICC) Sistólica',
        why: 'Efeito inotrópico negativo pode descompensar (menor que verapamil, mas existe).',
        level: 'WARNING',
      },
    ],
  },

  alerts_by_comorbidity: [
    {
      key: 'icc_decompensated',
      level: 'WARNING',
      title: 'ICC Descompensada (Baixo Débito)',
      why: 'Pode piorar contratilidade.',
      action: ['Evitar em choque cardiogênico.'],
    },
    {
      key: 'av_block',
      level: 'BLOCK',
      title: 'Bloqueio AV (2º/3º grau)',
      why: 'Contraindicado (bloqueador nodal).',
      action: ['Não usar.'],
    },
    {
      key: 'hypotension',
      level: 'WARNING',
      title: 'Hipotensão Sistêmica',
      why: 'Pode piorar pela vasodilatação.',
      action: ['Monitorar PAM.'],
    },
  ],

  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      bolus: {
        mgkg: {
          min: 0.05,
          max: 0.25,
          note: '0.05-0.25 mg/kg IV lento (2 min). Pode repetir. Cuidado com hipotensão.',
        },
        route: 'IV',
      },
      cri: {
        mcgkgmin: {
          min: 1,
          max: 5,
          note: 'Start: 1-2 mcg/kg/min. Titular até controle da FC. (Uso hospitalar restrito).',
        },
        titration: {
          increment: '1 mcg/kg/min',
          interval: '15-30 min',
        },
        max: 10,
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 0.05,
          max: 0.1, // Doses menores para gatos
          note: 'IV lento. Cuidado bradicardia.',
        },
        route: 'IV',
      },
      cri: {
        mcgkgmin: {
          min: 1,
          max: 4,
          note: 'CRI em gatos é menos comum, preferir oral para manutenção.',
        },
        max: 5,
      },
    },
  },

  presentations: [
    {
      concentration_mg_ml: 5,
      label: 'Diltiazem 5 mg/mL (Injetável)',
      examples: ['Balcor 25mg/5mL'],
    },
    {
      total_mg: 30,
      label: 'Comprimido 30mg',
    },
    {
      total_mg: 60,
      label: 'Comprimido 60mg',
    },
  ],

  calculation_templates: {
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg'],
      algorithm: [
        '1) Mg totais = peso * dose',
        '2) Volume = mg / 5 (conc. mg/mL)',
        '3) Administrar IV lento (2 min) monitorando ECG.',
      ],
      outputs: ['drug_volume'],
    },
    cri: {
      required_inputs: ['weight_kg', 'target_mcgkgmin', 'pump_rate_ml_h_override'],
      algorithm: [
        '1) Calcular mcg/min = peso * dose',
        '2) Calcular mcg/h = mcg/min * 60',
        '3) Calcular mL/h baseado na diluição.',
      ],
      outputs: ['pump_rate_ml_h'],
    },
  },

  dilution_and_preparation: {
    hard_rules: [
      'Incompatível com Furosemida (precipitação imediata).',
      'Monitorar ECG continuamente durante bolus e CRI.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 0.5, // 500 mcg/mL
        use_cases: ['Cães médios', 'CRI'],
        how_to_make: 'Diluir 1 ampola (25mg/5mL) em 45mL de soro = 50mL total (0.5 mg/mL).',
      },
      {
        target_mg_ml: 1, // 1000 mcg/mL
        use_cases: ['Cães grandes'],
        how_to_make: 'Diluir 2 ampolas (50mg) em 40mL soro = 50mL total (1 mg/mL).',
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
    incompatible: [
      {
        agent: 'Furosemida',
        why: 'Precipitação (cristais brancos).',
        risk: 'precipitação',
      },
      {
        agent: 'Diazepam',
        why: 'Precipitação.',
        risk: 'precipitação',
      },
    ],
    dedicated_line_rules: ['Não misturar com Furosemida na mesma via.'],
  },

  ui_copy: {
    critical_warning_banner: 'MONITORAR ECG. Bloqueia nó AV. Cuidado com Furosemida (precipita).',
    common_errors: ['Misturar com lasix (furosemida).', 'Usar em bloqueio AV de 2º/3º grau.'],
  },

  presets: [
    {
      id: 'diltiazem_bolus_dog',
      label: 'Bolus Cão (0.1 mg/kg) 💉',
      dose_mgkg: 0.1,
      limits: { min: 0.05, max: 0.25 },
      clinical_target: 'Controle agudo de TSV.',
    },
    {
      id: 'diltiazem_cri_start',
      label: 'CRI Inicial (2 mcg/kg/min)',
      dose_mcgkgmin: 2.0,
      limits: { min: 1, max: 10 },
      clinical_target: 'Manter controle de frequência.',
    },
  ],

  references: [
    {
      section: 'Doses e Protocolos',
      source: 'Plumb\'s Veterinary Drug Handbook.',
    },
  ],
}
