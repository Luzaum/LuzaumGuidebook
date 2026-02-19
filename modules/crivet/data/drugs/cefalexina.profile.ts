import type { DrugProfile } from '../../types/drugProfile'

export const cefalexinaProfile: DrugProfile = {
  drug_id: 'cefalexina',
  name_pt: 'Cefalexina',
  name_en: 'Cephalexin',
  synonyms: ['Keflex', 'Rilexine'],
  class: ['Antimicrobiano', 'Cefalosporina de 1ª Geração'],

  core_concepts: {
    taglines: [
      'Padrão ouro para piodermites superficiais (Staphylococcus).',
      'Uso oral exclusivo (não existe apresentação IV confiável em vet).',
      'Seguro em gestantes e filhotes.',
    ],
    mechanism: {
      clinical_metaphor: 'O "feijão com arroz" da dermatologia veterinária.',
      primary_effects: {
        renal_hepatic: 'Excreção renal ativa (bom para ITU).',
      },
    },
    pharmacodynamics: {
      duration: 'Tempo-dependente (manter acima da CIM por 40-50% do intervalo).',
    },
    pharmacokinetics: {
      metabolism: 'Mínimo.',
      excretion: 'Renal (inalterada).',
    },
  },

  species_notes: {
    dogs: {
      key_point: 'Pode causar vômito em jejum. Administrar com alimento reduz efeitos GI.',
    },
    cats: {
      key_point: 'Geralmente melhor tolerada que em cães. Suspensão líquida facilita administração.',
    },
  },

  indications: {
    primary: [
      'Piodermite superficial (Staphylococcus pseudointermedius).',
      'Infecção do Trato Urinário (ITU) não complicada.',
      'Infecções de tecidos moles.',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Hipersensibilidade a cefalosporinas/penicilinas',
        why: 'Anafilaxia cruzada possível.',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Insuficiência Renal Grave',
        why: 'Acúmulo (aumentar intervalo).',
        level: 'WARNING',
      },
    ],
  },

  alerts_by_comorbidity: [
    {
      key: 'vomiting',
      level: 'SAFE',
      title: 'Vômito / Gastrite',
      why: 'Efeito local irritativo.',
      action: ['Dar com comida.'],
    },
    {
      key: 'renal',
      level: 'WARNING',
      title: 'Insuficiência Renal',
      why: 'Excreção renal.',
      action: ['Ajustar intervalo (BID -> SID) em casos graves.'],
    },
  ],

  doses: {
    unit_standard_cri: 'mg/kg', // Não usado, mas obrigatório pelo type
    dog: {
      bolus: {
        mgkg: {
          min: 22,
          max: 30,
          note: '22-30 mg/kg BID (12/12h). Piodermite: 30 mg/kg BID.',
        },
        route: 'PO',
      },
      // CRI REMOVIDO INTENCIONALMENTE
      cri: undefined,
    },
    cat: {
      bolus: {
        mgkg: {
          min: 22,
          max: 30,
          note: '22-30 mg/kg BID. Gotas/Suspensão preferível.',
        },
        route: 'PO',
      },
      cri: undefined,
    },
  },

  presentations: [
    {
      total_mg: 300,
      label: 'Cefalexina 300mg (Vet)',
    },
    {
      total_mg: 600,
      label: 'Cefalexina 600mg (Vet)',
    },
    {
      total_mg: 500,
      label: 'Cefalexina 500mg (Humano)',
    },
    {
      concentration_mg_ml: 50, // 250mg/5mL
      label: 'Suspensão 250mg/5mL (50 mg/mL)',
    },
  ],

  calculation_templates: {
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg'],
      algorithm: [
        '1) Mg totais = peso * dose',
        '2) Comprimidos: Arredondar para apresentação mais próxima (ex: 1/4, 1/2).',
        '3) Suspensão: Volume = mg / concentração.',
      ],
      outputs: ['drug_volume'],
    },
  },

  dilution_and_preparation: {
    hard_rules: [
      'NÃO usar IV ou SC (formulações orais não estéreis).',
    ],
    recommended_targets: [
      {
        target_mg_ml: 50,
        use_cases: ['Suspensão Oral (250 mg/5 mL)'],
        how_to_make: 'Agitar bem antes de usar. Suspensão pronta.',
        recipe: 'N/A (Comercial).',
      },
    ],
    diluents_allowed: [],
  },

  compatibility: {
    compatible_in_syringe_or_bag: ['N/A (Oral)'],
    incompatible: [],
  },

  ui_copy: {
    critical_warning_banner: 'USO ORAL EXCLUSIVO.',
    common_errors: ['Tentar injetar suspensão oral (fatal).', 'Dar em jejum (vômito).'],
  },

  presets: [
    {
      id: 'cefalexina_piodermite',
      label: 'Piodermite (30 mg/kg) 💊',
      dose_mgkg: 30,
      limits: { min: 20, max: 35 },
      clinical_target: 'Dose dermatológica padrão.',
    },
  ],

  references: [
    {
      section: 'Doses',
      source: 'Plumb\'s.',
    },
  ],
}
