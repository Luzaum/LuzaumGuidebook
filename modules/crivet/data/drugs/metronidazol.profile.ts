import type { DrugProfile } from '../../types/drugProfile'

export const metronidazolProfile: DrugProfile = {
  drug_id: 'metronidazol',
  name_pt: 'Metronidazol',
  name_en: 'Metronidazole',
  synonyms: ['Flagyl', 'nitroimidazol', 'antibiótico tempo-dependente', 'antiprotozoário'],
  class: [
    'Nitroimidazol',
    'Antibiótico/antiprotozoário tempo-dependente',
    'Ativo contra anaeróbios e protozoários',
  ],

  core_concepts: {
    taglines: [
      'Tempo-dependente: CRI mantém nível estável e reduz risco de neurotoxicidade por pico',
      'Neurotoxicidade dose-dependente: ataxia, nistagmo, tremores, convulsão — reversível',
      'Apresentação 5 mg/mL pode ser usada diretamente em CRI',
      'Infusão IV lenta obrigatória (>30–60 min)',
      'Ajuste em hepatopatia: metabolismo hepático extenso',
    ],
    mechanism: {
      receptors_targets: [
        'Redução intracelular → metabólito ativo que danifica DNA bacteriano/protozoário',
        'Bactericida/protozoicida para anaeróbios e protozoários',
        'Inativo contra aeróbios obrigatórios',
      ],
      primary_effects: {
        cardiovascular: 'Sem efeito cardiovascular direto relevante nas doses usuais.',
        respiratory: 'Sem efeito respiratório direto.',
        cns: 'Neurotoxicidade dose-dependente: ataxia, nistagmo, tremores, convulsão. Relacionada a dose cumulativa alta e hepatopatia. Reversível após suspensão.',
        renal_hepatic:
          'Metabolismo hepático extenso. Ajustar em hepatopatia grave. Excreção renal dos metabólitos.',
        gi: 'Náusea, vômito, anorexia (especialmente em gatos). Sabor amargo (PO).',
      },
      clinical_metaphor:
        '"O antibiótico dos anaeróbios e protozoários": penetra em abscessos e tecidos anóxicos onde outros antibióticos não chegam. Tempo-dependente — CRI é a estratégia ideal para infecções graves, e ainda reduz o risco de neurotoxicidade por pico.',
    },
    pharmacodynamics: {
      onset_iv: 'Início de ação em 30–60 min',
      peak: 'Pico sérico após infusão',
      duration: 'T>MIC: depende da dose e intervalo; CRI mantém nível estável',
      dependencies: [
        'Função hepática (metabolismo)',
        'Dose cumulativa (neurotoxicidade)',
        'MIC do patógeno',
      ],
    },
    pharmacokinetics: {
      metabolism: 'Hepático extenso (oxidação e glucuronidação). Metabólitos ativos e inativos.',
      excretion: 'Renal (60–80%) e fecal.',
      dog_vs_cat: 'Gatos: mais sensíveis a efeitos GI (náusea, anorexia). Mesmas faixas de dose.',
      active_metabolites: 'Hidroximetronidazol: atividade antibacteriana parcial.',
      accumulation: 'Em hepatopatia grave: acúmulo → risco aumentado de neurotoxicidade.',
    },
  },

  species_notes: {
    dogs: {
      key_point:
        'Bolus: 15–25 mg/kg q12h IV/PO. CRI: 0,5–1 mg/kg/h após dose de ataque 10–15 mg/kg. Total diário: 15–25 mg/kg/dia.',
      high_risk_notes: [
        'Neurotoxicidade: monitorar ataxia, nistagmo, tremores. Suspender se aparecerem.',
        'Infusão IV lenta (>30–60 min).',
        'Hepatopatia: reduzir dose e monitorar.',
      ],
      metabolism_excretion: 'Hepático extenso; excreção renal e fecal.',
    },
    cats: {
      key_point:
        'Mesma faixa de dose. Evitar exceder 20 mg/kg/dia. Gatos são mais sensíveis a efeitos GI. Monitorar sinais neurológicos.',
      high_risk_notes: [
        'Efeitos GI mais pronunciados: náusea, anorexia, vômito.',
        'Neurotoxicidade: mesmos sinais que em cães.',
        'Hepatopatia: reduzir dose.',
      ],
      metabolism_excretion: 'Hepático; excreção renal e fecal.',
    },
  },

  indications: {
    primary: [
      'Infecções anaeróbias (peritonite, abscesso abdominal, infecções dentárias)',
      'Diarreia por Clostridium spp.',
      'Giardíase (Giardia spp.)',
    ],
    secondary: [
      'Infecções mistas (combinado com antibiótico aeróbio)',
      'Colite por Trichomonas (gatos)',
      'Sepse abdominal por anaeróbios (CRI)',
    ],
    off_label_notes: [
      'CRI: off-label, mas justificada pela farmacodinâmica tempo-dependente e redução de neurotoxicidade por pico.',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Hipersensibilidade conhecida ao metronidazol ou nitroimidazóis',
        why: 'Risco de reação alérgica',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Hepatopatia grave',
        why: 'Metabolismo reduzido → acúmulo → risco aumentado de neurotoxicidade',
        level: 'CRITICAL',
      },
      {
        condition: 'Distúrbios neurológicos / epilepsia',
        why: 'Pode agravar sinais neurológicos',
        level: 'WARNING',
      },
      {
        condition: 'Gestação (1º trimestre)',
        why: 'Potencial teratogênico (dados em roedores)',
        level: 'WARNING',
      },
    ],
  },

  doses: {
    unit_standard_cri: 'mg/kg/h',
    dog: {
      bolus: {
        mgkg: {
          min: 15,
          max: 25,
          note: 'q12h IV (infusão lenta >30–60 min) ou PO. Total diário: 15–25 mg/kg/dia. Para CRI: dose de ataque 10–15 mg/kg antes de iniciar.',
        },
        route: 'IV',
        loading_dose: { min: 10, max: 15 },
      },
      cri: {
        mgkgh: {
          min: 0.5,
          max: 1,
          note: 'CRI IV após dose de ataque 10–15 mg/kg. Apresentação 5 mg/mL pode ser usada diretamente. Total diário: 15–25 mg/kg/dia. CRI reduz risco de neurotoxicidade por pico.',
        },
        titration: {
          increment: 'Sem titulação por efeito imediato; ajustar por resposta clínica',
          interval: 'Monitorar sinais neurológicos diariamente',
        },
        max: 1,
      },
      adjustments: {
        obesity: 'Calcular por peso magro/ideal.',
        shock: 'Infundir lentamente; sem ajuste específico de dose.',
        hypoalbuminemia: 'Sem ajuste direto.',
        comorbidities: 'Hepatopatia: reduzir dose 25–50% e monitorar sinais neurológicos. Epilepsia: cautela.',
      },
      therapeutic_targets: {
        target_map: 'N/A.',
        target_etco2: 'N/A.',
        analgesia_scale: 'N/A.',
        sedation_target: 'N/A.',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 10,
          max: 20,
          note: 'q12h IV (infusão lenta >30–60 min) ou PO. Evitar exceder 20 mg/kg/dia. Monitorar sinais GI e neurológicos.',
        },
        route: 'IV',
        loading_dose: { min: 10, max: 15 },
      },
      cri: {
        mgkgh: {
          min: 0.5,
          max: 1,
          note: 'CRI IV após dose de ataque. Evitar exceder 20 mg/kg/dia. Monitorar sinais neurológicos.',
        },
        titration: {
          increment: 'Sem titulação; manter dose dentro do limite diário',
          interval: 'Monitorar sinais neurológicos e GI diariamente',
        },
        max: 1,
      },
      adjustments: {
        obesity: 'Usar peso ideal.',
        shock: 'Infundir lentamente.',
        hypoalbuminemia: 'Sem ajuste direto.',
        comorbidities: 'Hepatopatia: reduzir dose. Epilepsia: evitar.',
      },
      therapeutic_targets: {
        target_map: 'N/A.',
        target_etco2: 'N/A.',
        analgesia_scale: 'N/A.',
        sedation_target: 'N/A.',
      },
    },
  },

  presentations: [
    {
      concentration_mg_ml: 5,
      label: '5 mg/mL — solução IV pronta (500 mg/100 mL)',
      examples: ['Flagyl® 5 mg/mL IV', 'Metronidazol 5 mg/mL (genérico)'],
      concentration_trap_warning:
        'Pode ser usada diretamente em CRI sem diluição adicional. Infundir lentamente (>30–60 min).',
    },
    {
      concentration_mg_ml: 0,
      label: 'Comprimidos: 250 mg, 400 mg',
      examples: ['Flagyl® comprimidos', 'Metronidazol comprimidos (genérico)'],
      concentration_trap_warning: 'Via oral: administrar com alimento para reduzir irritação GI.',
    },
  ],

  dilution_and_preparation: {
    hard_rules: [
      'Infundir IV sempre lentamente (>30–60 min): bolus rápido pode causar náusea e desconforto.',
      'Apresentação 5 mg/mL pode ser usada diretamente em CRI sem diluição adicional.',
      'Monitorar sinais neurológicos diariamente (ataxia, nistagmo, tremores).',
      'Não ultrapassar dose diária máxima: 25 mg/kg/dia (cão), 20 mg/kg/dia (gato).',
    ],
    recommended_targets: [
      {
        target_mg_ml: 5,
        use_cases: ['CRI padrão — cão e gato (usar diretamente)'],
        how_to_make: 'Apresentação 5 mg/mL: usar diretamente na bomba de infusão.',
        recipe: 'Frasco 500 mg/100 mL (5 mg/mL) — usar diretamente. Calcular velocidade (mL/h) pela dose-alvo (mg/kg/h) e peso.',
      },
      {
        target_mg_ml: 2.5,
        use_cases: ['Diluição adicional para pacientes pequenos'],
        how_to_make: 'Diluir 5 mg/mL em NaCl 0,9%.',
        recipe: '50 mL (250 mg) + 50 mL NaCl 0,9% = 100 mL a 2,5 mg/mL',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Glicose 5%'],
    preferred_diluent: { diluent: 'NaCl 0,9%', why: 'Compatibilidade padrão; 5 mg/mL pode ser usada diretamente.' },
    stability: [
      { diluent: 'NaCl 0,9%', max_time_hours: 24, light_protection: false, syringe_bag_change: 'Trocar a cada 24h.' },
    ],
    dedicated_line_required: false,
    dedicated_line_why: 'Pode compartilhar via; flush entre drogas incompatíveis.',
  },

  compatibility: {
    compatible_in_syringe_or_bag: ['NaCl 0,9%', 'Glicose 5%'],
    compatible_y_site_only: [],
    incompatible: [
      { agent: 'Alumínio (equipos/agulhas com alumínio)', why: 'Reação de oxidação com alumínio', risk: 'degradação' },
    ],
    avoid_same_syringe_or_precipitation_risk: ['Evitar mistura com outros antibióticos sem referência de compatibilidade.'],
    dedicated_line_rules: ['Flush com cristaloide entre drogas.'],
  },

  alerts_by_comorbidity: [
    {
      key: 'metronidazole_neurotoxicity',
      level: 'WARNING',
      title: 'Neurotoxicidade: dose-dependente e reversível',
      why: 'Relacionada a dose cumulativa alta e hepatopatia. Sinais: ataxia, nistagmo, tremores, convulsão. Reversível após suspensão.',
      action: [
        'Monitorar sinais neurológicos diariamente.',
        'Suspender imediatamente se ataxia, nistagmo ou tremores aparecerem.',
        'Não ultrapassar dose diária máxima.',
        'Reduzir dose em hepatopatia.',
      ],
      dose_adjustment: {
        require_monitoring: ['status neurológico', 'ataxia', 'nistagmo', 'tremores'],
      },
    },
    {
      key: 'metronidazole_hepatic_disease',
      level: 'CRITICAL',
      title: 'Hepatopatia: acúmulo → risco aumentado de neurotoxicidade',
      why: 'Metabolismo hepático extenso; hepatopatia grave reduz clearance → acúmulo → neurotoxicidade.',
      action: [
        'Reduzir dose 25–50%.',
        'Monitorar sinais neurológicos com mais frequência.',
        'Considerar alternativa em hepatopatia grave.',
      ],
      dose_adjustment: {
        reduce_percent: 40,
        require_monitoring: ['status neurológico', 'função hepática'],
        suggest_alternative: 'Clindamicina para anaeróbios em hepatopatia grave.',
      },
    },
    {
      key: 'metronidazole_daily_dose_limit',
      level: 'WARNING',
      title: 'Dose diária máxima: não ultrapassar',
      why: 'Neurotoxicidade relacionada a dose cumulativa. Cão: máx 25 mg/kg/dia. Gato: máx 20 mg/kg/dia.',
      action: [
        'Calcular dose total diária antes de iniciar CRI.',
        'Não ultrapassar limites diários.',
      ],
      dose_adjustment: { require_monitoring: ['dose total diária', 'status neurológico'] },
    },
  ],

  calculation_templates: {
    cri: {
      required_inputs: ['weight_kg', 'dose_mgkg_h', 'drug_concentration_mg_ml'],
      algorithm: [
        '1) Calcular dose total (mg/h) = dose_mgkg_h × peso',
        '2) Calcular volume (mL/h) = mg/h ÷ concentração',
        '3) Apresentação 5 mg/mL: uso direto',
      ],
      outputs: ['pump_rate_ml_h'],
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg', 'drug_concentration_mg_ml'],
      algorithm: [
        '1) Mg totais = dose × peso',
        '2) Volume = mg ÷ concentração',
        '3) Infusão lenta (>30 min)',
      ],
      outputs: ['bolus_volume_ml'],
    },
  },

  presets: [
    {
      id: 'metronidazole_bolus_dog',
      label: 'Cão — bolus IV q12h 🟨',
      dose_mgkg: 15,
      limits: { min: 15, max: 25 },
      clinical_target: 'Infecção anaeróbia, diarreia por Clostridium, giardíase. Infundir em >30–60 min.',
      linked_alerts: ['metronidazole_neurotoxicity', 'metronidazole_daily_dose_limit'],
    },
    {
      id: 'metronidazole_cri_dog',
      label: 'Cão — CRI (sepse anaeróbia/peritonite) 🟩',
      dose_mgkgh: 0.5,
      limits: { min: 0.5, max: 1 },
      clinical_target: 'Manutenção de T>MIC em infecção grave. Após dose de ataque 10–15 mg/kg. Usar 5 mg/mL diretamente.',
      linked_alerts: ['metronidazole_neurotoxicity', 'metronidazole_hepatic_disease'],
    },
    {
      id: 'metronidazole_bolus_cat',
      label: 'Gato — bolus IV q12h 🟨',
      dose_mgkg: 10,
      limits: { min: 10, max: 20 },
      clinical_target: 'Infecção anaeróbia. Máx 20 mg/kg/dia. Monitorar sinais GI e neurológicos.',
      linked_alerts: ['metronidazole_neurotoxicity', 'metronidazole_daily_dose_limit'],
    },
  ],

  references: [
    {
      section: 'doses/neurotoxicity/pharmacokinetics',
      source: "Plumb's Veterinary Drug Handbook, 10th ed. — Metronidazole",
      year: 2023,
    },
    {
      section: 'CRI_rationale/time_dependent',
      source: 'Textbook of Small Animal Emergency Medicine (Wiley Blackwell), 2019',
      year: 2019,
    },
  ],
}
