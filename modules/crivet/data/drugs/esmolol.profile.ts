import type { DrugProfile } from '../../types/drugProfile'

export const esmololProfile: DrugProfile = {
  drug_id: 'esmolol',
  name_pt: 'Esmolol',
  name_en: 'Esmolol',
  synonyms: ['Brevibloc'],
  class: ['Beta-bloqueador seletivo (beta-1)', 'Antiarrítmico Classe II'],

  core_concepts: {
    taglines: [
      'Beta-bloqueador ultra-curto (meia-vida ~9 min).',
      'Ideal para teste terapêutico (efeito desaparece rápido se suspender).',
      'Controle de taquicardia sinusal grave ou supraventricular (TSV) intraoperatória.',
    ],
    mechanism: {
      clinical_metaphor: 'O "freio de emergência" do coração (pisa e solta rápido).',
      primary_effects: {
        cardiovascular: 'Reduz FC, contratilidade e consumo de O2 miocárdico. Bloqueio seletivo beta-1 (em doses baixas/médias).',
      },
    },
    pharmacodynamics: {
      onset_iv: '1-2 min (rápido).',
      duration: '10-20 min (cessa logo após parar infusão).',
    },
    pharmacokinetics: {
      metabolism: 'Hidrólise por esterases plasmáticas (independente de fígado/rins).',
    },
  },

  species_notes: {
    dogs: {
      key_point: 'Excelente para taquiarritmias intraoperatórias e tempestade adrenérgica (feocromocitoma).',
      high_risk_notes: ['Meia-vida ~9 min → ideal para titulação em UTI.'],
    },
    cats: {
      key_point: 'Sensíveis à bradicardia e depressão miocárdica.',
      high_risk_notes: ['Usar com cautela em cardiopatas descompensados.'],
    },
  },

  indications: {
    primary: [
      'Taquicardia Supraventricular (TSV) aguda.',
      'Controle agudo de frequência em FA.',
      'Hipertensão/Taquicardia intraoperatória.',
      'Tempestade tiretóxica ou feocromocitoma.',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Bradicardia sinusal',
        why: 'Piora severa.',
        level: 'BLOCK',
      },
      {
        condition: 'Bloqueio AV > 1º grau',
        why: 'Piora bloqueio da condução.',
        level: 'BLOCK',
      },
      {
        condition: 'Choque Cardiogênico',
        why: 'Reduz contratilidade (inotropismo negativo).',
        level: 'CRITICAL',
      },
    ],
    relative: [
      {
        condition: 'Asma / Broncoconstrição',
        why: 'Apesar de seletivo beta-1, pode bloquear beta-2 em doses altas (broncoespasmo).',
        level: 'WARNING',
      },
      {
        condition: 'Diabetes Mellitus',
        why: 'Mascara sinais adrenérgicos de hipoglicemia (taquicardia).',
        level: 'WARNING',
      },
    ],
  },

  alerts_by_comorbidity: [
    {
      key: 'asthma',
      level: 'WARNING',
      title: 'Asma / Bronquite Felina',
      why: 'Risco de broncoespasmo em doses altas (perda da seletividade).',
      action: ['Monitorar respiração.', 'Ter broncodilatador à mão.'],
    },
    {
      key: 'diabetes',
      level: 'WARNING',
      title: 'Diabetes Mellitus',
      why: 'Mascara taquicardia da hipoglicemia.',
      action: ['Monitorar glicemia rigorosamente.'],
    },
    {
      key: 'icc_decompensated',
      level: 'WARNING',
      title: 'ICC Descompensada',
      why: 'Inotropismo negativo.',
      action: ['Evitar em choque cardiogênico.'],
    },
  ],

  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      bolus: {
        mgkg: {
          min: 0.25, // 250 mcg
          max: 0.5, // 500 mcg
          note: 'Bolus de ataque: 250-500 mcg/kg (0.25-0.5 mg/kg) lento em 1-2 min.',
        },
        route: 'IV',
        loading_dose: { min: 0.25, max: 0.5 },
      },
      cri: {
        mcgkgmin: {
          min: 25,
          max: 200,
          note: 'Start: 25-50 mcg/kg/min. Titular a cada 5 min. Dose média: 50-100 mcg/kg/min.',
        },
        titration: {
          increment: '25-50 mcg/kg/min',
          interval: '5 min',
        },
        max: 300,
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 0.1, // Dose menor gato
          max: 0.25,
          note: 'Bolus reduzido. 100-250 mcg/kg.',
        },
        route: 'IV',
      },
      cri: {
        mcgkgmin: {
          min: 10,
          max: 100,
          note: 'Gatos: 10-50 mcg/kg/min inicial.',
        },
        max: 150,
      },
    },
  },

  presentations: [
    {
      concentration_mg_ml: 10,
      label: 'Esmolol 10 mg/mL (100mg/10mL)',
      examples: ['Brevibloc (Frasco pronto)'],
    },
    {
      concentration_mg_ml: 250,
      label: 'Esmolol 250 mg/mL (Ampola Concentrada)',
      concentration_trap_warning: 'PERIGO: DILUIR ANTES DE USAR. Ampola concentrada.',
      examples: ['Ampola 2.5g/10mL'],
    },
  ],

  calculation_templates: {
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg'],
      algorithm: [
        '1) Mg totais = peso * dose',
        '2) Volume = mg / (concentração mg/mL)',
        '3) Atenção à concentração: Se usar de 250mg/mL, o volume será ínfimo (diluir!). Se 10mg/mL, volume ok.',
      ],
      outputs: ['drug_volume'],
    },
    cri: {
      required_inputs: ['weight_kg', 'target_mcgkgmin', 'pump_rate_ml_h_override'],
      algorithm: [
        '1) Calcular mcg/min = peso * dose',
        '2) Calcular mL/h baseado na concentração da solução (us usually 10 mg/mL).',
      ],
      outputs: ['pump_rate_ml_h'],
    },
  },

  dilution_and_preparation: {
    hard_rules: [
      'Ampolas de 250 mg/mL DEVEM ser diluídas para máx 10 mg/mL antes de infusão (vesicante/hiperosmolar).',
      'Incompatível com Bicarbonato e Furosemida.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 10, // 10000 mcg/mL
        use_cases: ['Padrão UTI', 'CRI', 'Bolus'],
        how_to_make: 'Se tiver ampola de 250mg/mL (10mL): retirar 20mL de um bag de 250mL e injetar a ampola (Diluição ~10mg/mL) ou usar frasco pronto de 10mg/mL.',
        recipe: 'Diluição padrão segura: 10 mg/mL.',
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
    compatible_in_syringe_or_bag: ['Dobutamina', 'Dopamina', 'Lidocaína'],
    incompatible: [
      {
        agent: 'Bicarbonato de Sódio',
        why: 'Precipitação/Inativação.',
        risk: 'precipitação',
      },
      {
        agent: 'Furosemida',
        why: 'Precipitação.',
        risk: 'precipitação',
      },
      {
        agent: 'Diazepam',
        why: 'Precipitação.',
        risk: 'precipitação',
      },
    ],
  },

  ui_copy: {
    critical_warning_banner: 'CUIDADO: Há ampolas de 250mg/mL (CONCENTRADA) e frascos de 10mg/mL (PRONTO). Cheque o frasco!',
    common_errors: ['Injetar ampola de 2.5g (250mg/mL) direto em bolus (superdosagem 25x).'],
  },

  presets: [
    {
      id: 'esmolol_bolus_test',
      label: 'Bolus Teste (0.5 mg/kg) ⏱',
      dose_mgkg: 0.5,
      limits: { min: 0.1, max: 0.5 },
      clinical_target: 'Avaliar resposta antes de CRI.',
    },
    {
      id: 'esmolol_cri_std',
      label: 'CRI Manutenção (50 mcg) 📉',
      dose_mcgkgmin: 50,
      limits: { min: 25, max: 200 },
      clinical_target: 'Controle contínuo.',
    },
  ],

  references: [
    {
      section: 'Doses / Segurança',
      source: 'Plumb\'s Veterinary Drug Handbook.',
    },
  ],
}
