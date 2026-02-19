import type { DrugProfile } from '../../types/drugProfile'

export const enrofloxacinaProfile: DrugProfile = {
  drug_id: 'enrofloxacina',
  name_pt: 'Enrofloxacina',
  name_en: 'Enrofloxacin',
  synonyms: ['Baytril', 'Flotril'],
  class: ['Antimicrobiano', 'Fluoroquinolona'],

  core_concepts: {
    taglines: [
      'Gatos: Toxicidade Retiniana (Cegueira irreversível) em doses altas.',
      'Potente contra Gram-negativos (Pseudomonas, E. coli).',
      'Cartilagem articular: evitar em filhotes em crescimento rápido (gigantes).',
    ],
    mechanism: {
      clinical_metaphor: 'Bomba atômica para bactérias urinárias e de tecidos moles.',
    },
    pharmacodynamics: {
      duration: 'Concentração-dependente (Dose única diária alta é melhor que dividida).',
    },
    pharmacokinetics: {
      metabolism: 'Hepático (metaboliza em Ciprofloxacina - 10-40%).',
      excretion: 'Renal e Biliar.',
    },
  },

  species_notes: {
    dogs: {
      key_point: 'Doses altas seguras em adultos. Cuidado em filhotes (artropatia).',
    },
    cats: {
      key_point: 'PERIGO: Cegueira permanente se dose > 5 mg/kg sid.',
      high_risk_notes: ['Nunca usar doses off-label em gatos.'],
    },
  },

  indications: {
    primary: [
      'Infecções Urinárias (ITU) complicadas (pielonefrite, prostatite).',
      'Pneumonias Gram-negativas.',
      'Osteomielite.',
      'Infecções de pele profundas (pioderma resistente).',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Gatos: Doses > 5 mg/kg/dia',
        why: 'Degeneração retiniana aguda e cegueira permanente (irreversível).',
        level: 'BLOCK', // Bloqueia input > 5
      },
      {
        condition: 'Filhotes (Cães Gigantes < 18 meses, Pequenos < 8 meses)',
        why: 'Erosão da cartilagem articular (artropatia).',
        level: 'WARNING', // Permite se risco/benefício justificar, mas alerta
      },
    ],
    relative: [
      {
        condition: 'Epilepsia / Convulsões',
        why: 'Reduz limiar convulsivo (pode precipitar crise).',
        level: 'WARNING',
      },
    ],
  },

  alerts_by_comorbidity: [
    {
      key: 'seizure',
      level: 'WARNING',
      title: 'Epilepsia / Convulsões',
      why: 'Reduz limiar convulsivo.',
      action: ['Evitar uso ou monitorar.'],
    },
    {
      key: 'renal',
      level: 'WARNING', // Reduz dose em insuficiencia grave
      title: 'Insuficiência Renal Grave',
      why: 'Acúmulo possível.',
      action: ['Reduzir dose em 50%.'],
    },
  ],

  doses: {
    unit_standard_cri: 'mg/kg',
    dog: {
      bolus: {
        mgkg: {
          min: 5,
          max: 20,
          note: '5-20 mg/kg q24h (SID). Pseudomonas requer dose alta (15-20 mg/kg).',
        },
        route: 'IV',
      },
      adjustments: {
        comorbidities: 'Renal grave: reduzir dose ou aumentar intervalo (q48h) se clearance muito baixo.',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 5,
          max: 5,
          note: 'MÁXIMO 5 mg/kg q24h. NUNCA exceder. Se precisar de dose maior, trocar de antibiótico (ex: Marbofloxacina é mais segura).',
        },
        route: 'IV',
      },
    },
  },

  presentations: [
    {
      concentration_percent: 2.5,
      label: 'Enrofloxacina 2.5% (25mg/mL)',
      examples: ['Baytril 2.5%'],
    },
    {
      concentration_percent: 5,
      label: 'Enrofloxacina 5% (50mg/mL)',
      examples: ['Baytril 5%'],
    },
    {
      concentration_percent: 10,
      label: 'Enrofloxacina 10% (100mg/mL)',
      examples: ['Chemitril 10%'],
      concentration_trap_warning: 'Muito concentrada. Diluir MUITO se IV.',
    },
  ],

  calculation_templates: {
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg'],
      algorithm: [
        '1) Mg totais = peso * dose',
        '2) Volume = mg / (concentração mg/mL)',
        '3) Diluição IV: Diluir 1:2 ou 1:5 em NaCl 0.9% e infundir em 30 min.',
      ],
      outputs: ['drug_volume'],
    },
  },

  dilution_and_preparation: {
    hard_rules: [
      'Gatos: Dose > 5 mg/kg = CEGUEIRA.',
      'IV: Infusão lenta (30-60 min). Diluir pelo menos 1:2 para evitar flebite.',
      'SC: Doloroso e pode causar abscesso estéril (diluir não ajuda muito no volume, mas na irritação). Oral preferível se possível.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 25, // Diluído
        use_cases: ['Infusão IV Lenta'],
        how_to_make: 'Diluir dose (2.5% ou 5%, 10% vet) em NaCl 0.9%.',
        recipe: 'Diluir a dose calculada em volume suficiente para correr em 30 min.',
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
        agent: 'Soluções com Magnésio/Cálcio',
        why: 'Quelação (reduz efeito).',
        risk: 'perda de eficácia',
      },
    ],
  },

  ui_copy: {
    critical_warning_banner: 'GATOS: MÁX 5 mg/kg (Risco de Cegueira). Cuidado em epilépticos.',
    common_errors: ['Usar dose de cão (10-20) em gato.', 'Injetar IV rápido (convulsão/hipotensão).'],
  },

  presets: [
    {
      id: 'enro_std_dog',
      label: 'Cão Padrão (10 mg/kg) 🐕',
      dose_mgkg: 10,
      limits: { min: 5, max: 20 },
      clinical_target: 'Gram-negativos sensíveis.',
    },
    {
      id: 'enro_safe_cat',
      label: 'Gato Seguro (5 mg/kg) 🐈',
      dose_mgkg: 5,
      limits: { min: 5, max: 5 }, // TRAVADO
      clinical_target: 'Limite de segurança retiniana.',
    },
  ],

  references: [
    {
      section: 'Doses / Toxicidade',
      source: 'Plumb\'s Veterinary Drug Handbook.',
    },
  ],
}
