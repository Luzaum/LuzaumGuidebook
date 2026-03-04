import type { DrugProfile } from '../../types/drugProfile'

export const flkProfile: DrugProfile = {
  drug_id: 'flk',
  name_pt: 'FLK (Fentanil + Lidocaína + Cetamina)',
  name_en: 'FLK (Fentanyl + Lidocaine + Ketamine)',
  synonyms: ['Infusão Multimodal', 'Analgesia FLK'],
  class: [
    'Analgesia Multimodal',
    'Infusão Contínua Combinada',
    'Opioide + Anestésico Local + Antagonista NMDA',
  ],

  core_concepts: {
    taglines: [
      'Sinergia potente: ataca a dor em três níveis diferentes (central, periférico e wind-up).',
      'Reduz o consumo de opioides e a resposta simpática ao trauma.',
      'Exclusivo para manutenção (CRI) — não administrar em bolus.',
      'Atenção às unidades: Fentanil (mcg/kg/h), Lidocaína e Cetamina (mcg/kg/min).',
    ],
    mechanism: {
      receptors_targets: [
        '🔴 Fentanil: Agonista μ (analgesia central potente)',
        '🟡 Lidocaína: Bloqueio de canais de Na+ (analgesia sistêmica, anti-inflamatório, redução de hiperalgesia)',
        '🟢 Cetamina: Antagonista NMDA (previne sensibilização central/wind-up)',
      ],
      primary_effects: {
        cardiovascular:
          'Fentanil pode causar bradicardia; Lidocaína em doses altas pode deprimir miocárdio; Cetamina mantém tônus simpático (pode causar taquicardia leve). Efeito líquido geralmente é estabilidade hemodinâmica, mas monitorar.',
        respiratory:
          'Fentanil causa depressão respiratória dose-dependente. Lidocaína e Cetamina têm efeito mínimo na ventilação em doses analgésicas.',
        cns: 'Analgesia profunda, sedação leve. Cetamina em dose sub-anestésica previne wind-up sem causar anestesia dissociativa plena.',
        renal_hepatic:
          'Metabolismo hepático complexo (concorrência de substratos). Evitar ou reduzir doses em insuficiência hepática.',
        gi: 'Fentanil pode reduzir motilidade; Lidocaína pró-cinética (leve) e anti-inflamatória visceral.',
      },
      clinical_metaphor:
        '"O ataque em três frentes": Enquanto o Fentanil apaga a percepção da dor no cérebro, a Lidocaína acalma os nervos periféricos inflamados e a Cetamina impede que a medula espinhal "aprenda" e amplifique a dor (wind-up).',
    },
    pharmacodynamics: {
      onset_iv: 'Rápido (minutos após iniciar a infusão)',
      duration: 'Curta (requer infusão contínua para manutenção do nível plasmático estável)',
      dependencies: [
        'Função hepática (metabolismo das 3 drogas)',
        'Proteínas plasmáticas (lidocaína e fentanil)',
      ],
    },
    pharmacokinetics: {
      metabolism: 'Hepático (CYP450) para os três componentes.',
      excretion: 'Renal (metabólitos).',
      dog_vs_cat:
        'GATOS: Lidocaína sistêmica é controversa (risco de cardiotoxicidade e neurotoxicidade é muito maior). A maioria dos protocolos FLK/MLK é padronizada para CÃES. Em gatos, remover a lidocaína ou usar doses extremamente reduzidas com cautela absoluta.',
    },
  },

  species_notes: {
    dogs: {
      key_point:
        'Padrão-ouro para dor intensa (ortopedia, trauma, oncologia). Protocolo bem estabelecido.',
      high_risk_notes: [
        'Monitorar bradicardia (fentanil) e sinais neurológicos (lidocaína).',
        'Cuidado em hepatopatas.',
      ],
      metabolism_excretion: 'Hepático.',
    },
    cats: {
      key_point:
        'Lidocaína IV é de alto risco em gatos (depressão cardiovascular severa). Geralmente EVITA-SE FLK clássico.',
      high_risk_notes: [
        '❌ Lidocaína causa toxicidade cardiovascular grave em doses baixas para cães.',
        'Recomendação: Usar apenas Fentanil + Cetamina (sem lidocaína) ou reduzir lidocaína drasticamente sob monitorização intensiva (não recomendado como rotina).',
      ],
      metabolism_excretion: 'Hepático.',
    },
  },

  indications: {
    primary: [
      'Dor pós-operatória de grande porte (ortopedia, tórax, amputações)',
      'Politrauma com dor intensa',
      'Dor oncológica refratária',
      'Pancreatite aguda grave (analgesia visceral potente)',
    ],
    secondary: ['Redução da CAM (Concentração Alveolar Mínima) de inalatórios no intraoperatório'],
    off_label_notes: [
      'Protocolo multimodal baseado em sinergia farmacológica conhecida.',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Gatos (formulação com Lidocaína de cão)',
        why: 'Risco inaceitável de toxicidade cardiovascular/neurológica pela lidocaína.',
        level: 'BLOCK',
      },
      {
        condition: 'Bloqueio AV ou bradiarritmia grave',
        why: 'Fentanil e Lidocaína podem exacerbar bradicardia/bloqueios.',
        level: 'CRITICAL',
      },
    ],
    relative: [
      {
        condition: 'Insuficiência hepática grave',
        why: 'Acúmulo das 3 drogas; risco de toxicidade por lidocaína.',
        level: 'WARNING',
      },
      {
        condition: 'Insuficiência cardíaca descompensada',
        why: 'Lidocaína é depressora miocárdica; Fentanil bradicardizante.',
        level: 'WARNING',
      },
    ],
  },

  doses: {
    unit_standard_cri: 'ml/kg/h (solução preparada)',
    dog: {
      cri: {
        mcgkgmin: {
          min: 25,
          max: 50,
          note: 'Doses ALVO dos componentes: Fentanil 2–5 mcg/kg/h; Lidocaína 25–50 mcg/kg/min; Cetamina 5–10 mcg/kg/min.',
        },
        mgkgh: {
          min: 0,
          max: 0,
          note: 'Ver cálculo de solução. Fentanil é em mcg/kg/H, outros em mcg/kg/MIN.',
        },
        titration: {
          increment: 'Ajustar taxa da bomba (mL/h) conforme escore de dor',
          interval: 'Reavaliar a cada 30–60 min',
        },
      },
      adjustments: {
        obesity: 'Usar peso magro.',
        shock: 'Estabilizar hemodinâmica antes de iniciar (lidocaína/fentanil podem hipotensar).',
        comorbidities: 'Cardiopatas e hepatopatas: reduzir doses em 25–50%.',
      },
      therapeutic_targets: {
        target_map: 'N/A (analgesia).',
        analgesia_scale: 'Glasgow ou similar: manter escore baixo.',
        sedation_target: 'Sedação leve.',
        target_etco2: 'N/A.',
      },
    },
    cat: {
      cri: {
        mcgkgmin: {
          min: 25,
          max: 25,
          note: 'NÃO RECOMENDADO usar a mistura padrão de cão (lidocaína tóxica). Usar apenas Fentanil + Cetamina se necessário.',
        },
        titration: {
          increment: 'N/A',
          interval: 'N/A',
        },
      },
      adjustments: {
        obesity: 'N/A',
        shock: 'N/A',
        hypoalbuminemia: 'N/A',
        comorbidities: 'N/A',
      },
      therapeutic_targets: {
        target_map: 'N/A.',
        analgesia_scale: 'N/A.',
        sedation_target: 'N/A.',
        target_etco2: 'N/A.',
      },
    },
  },

  dilution_and_preparation: {
    hard_rules: [
      'Atenção às unidades diferentes: Fentanil (HORA), Lidocaína/Cetamina (MINUTO).',
      'Não administrar em bolus rápido (risco de toxicidade por lidocaína/fentanil).',
      'Usar bomba de infusão obrigatória.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 0,
        use_cases: ['Método 1: Solução Calculada (Seringa Única)'],
        how_to_make: 'Calcular dose total de cada fármaco para o volume final desejado.',
        recipe:
          'Passo 1: Definir volume total (ex: 50 mL) e taxa (ex: 2 mL/kg/h). Passo 2: Calcular massa necessária de Fentanil, Lidocaína e Cetamina para durar nesse volume. Passo 3: Misturar com NaCl 0,9%.',
      },
      {
        target_mg_ml: 0,
        use_cases: ['Método 2: Macete Hospitalar "1 mL/kg/h"'],
        how_to_make: 'Alvo: Fentanil 5 mcg/kg/h, Lido 50 mcg/kg/min, Ceta 10 mcg/kg/min.',
        recipe:
          'Para cada 10kg de peso em 50mL final: Fentanil 250 mcg + Lidocaína 150 mg + Cetamina 30 mg. Rodar a 1 mL/kg/h.',
      },
      {
        target_mg_ml: 0,
        use_cases: ['Método 3: Proporção Fixa (Atalho)'],
        how_to_make: 'Para bolsa de 50 mL a 1 mL/kg/h (dose média).',
        recipe:
          '5 mL Fentanil (50mcg/mL) + 10 mL Lidocaína (20mg/mL) + 1 mL Cetamina (50mg/mL). Completar com salina. (Menos preciso, mas rápido).',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Glicose 5%'],
    preferred_diluent: {
      diluent: 'NaCl 0,9%',
      why: 'Padrão de estabilidade. Evitar Ringer Lactato se concentrações de lidocaína forem muito altas (risco teórico de precipitação, embora raro na prática clínica usual).',
    },
    stability: [
      {
        diluent: 'NaCl 0,9%',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Trocar a cada 24h.',
      },
    ],
    dedicated_line_required: true,
    dedicated_line_why: 'Infusão contínua de analgésicos potentes requer fluxo constante sem bolus acidentais.',
  },

  compatibility: {
    compatible_in_syringe_or_bag: ['NaCl 0,9%'],
    incompatible: [
      {
        agent: 'Diazepam',
        why: 'Precipitação provável.',
        risk: 'precipitação',
      },
      {
        agent: 'Fenitoína',
        why: 'Incompatibilidade físico-química.',
        risk: 'precipitação',
      },
    ],
    avoid_same_syringe_or_precipitation_risk: ['Misturar apenas os 3 componentes e o diluente na mesma bolsa/seringa.'],
    dedicated_line_rules: ['Via exclusiva recomendada.'],
  },

  administration_and_titration: {
    bolus_guidance: [
      'Não realizar bolus da mistura FLK.',
      'Se necessário ajuste imediato, titular analgesia com componente isolado em IV lento/titulado conforme protocolo.',
    ],
    titration_rules: [
      'Ajustar taxa da bomba em passos pequenos e reavaliar dor/sedação a cada 30–60 min.',
      'Priorizar titulação lenta para evitar depressão cardiorrespiratória por excesso de opioide.',
    ],
    monitoring_minimum: ['FR', 'SpO2', 'EtCO2 quando disponível', 'FC/PA', 'escala de dor', 'nível de sedação'],
  },

  adverse_effects_and_toxicity: {
    common: [
      'Sedação dose-dependente',
      'Depressão respiratória dose-dependente (principalmente pelo componente opioide)',
      'Bradicardia e hipotensão em pacientes sensíveis',
    ],
    serious: [
      'Depressão respiratória importante/apneia',
      'Toxicidade por lidocaína se erro de preparo/dose',
    ],
  },

  alerts_by_comorbidity: [
    {
      key: 'flk_cat_warning',
      level: 'BLOCK',
      title: 'GATOS: Risco de toxicidade por Lidocaína',
      why: 'Gatos são extremamente sensíveis à lidocaína IV (depressão miocárdica e neurotoxicidade). A mistura FLK padrão de cão é PERIGOSA para gatos.',
      action: [
        'Não usar FLK padrão em gatos.',
        'Usar infusão de Fentanil + Cetamina (sem lidocaína).',
        'Se usar lidocaína, dose deve ser < 10-20 mcg/kg/min com monitorização intensiva (apenas especialistas).',
      ],
    },
    {
      key: 'flk_arrhythmia',
      level: 'WARNING',
      title: 'Bradicardia ou Arritmia',
      why: 'Fentanil causa bradicardia vagal; Lidocaína doses altas deprimem condução.',
      action: [
        'Monitorar ECG e FC.',
        'Se bradicardia significativa: reduzir taxa ou considerar anticolinérgico (se hemodinamicamente relevante).',
      ],
    },
  ],

  calculation_templates: {
    cri: {
      required_inputs: [
        'weight_kg',
        'target_fentanyl_mcgkgh',
        'target_lidocaine_mcgkgmin',
        'target_ketamine_mcgkgmin',
        'final_volume_ml',
        'pump_rate_ml_h',
      ],
      algorithm: [
        '1) Calcular dose total necessária por HORA para o paciente:',
        '   - Fentanil (mcg/h) = peso * dose_fentanyl',
        '   - Lidocaína (mg/h) = peso * dose_lido * 60 / 1000',
        '   - Cetamina (mg/h) = peso * dose_ceta * 60 / 1000',
        '2) Calcular tempo de duração da seringa (h) = volume_final / taxa_bomba',
        '3) Calcular quantidade total de cada fármaco na seringa:',
        '   - Total Fentanil (mcg) = Fentanil (mcg/h) * tempo',
        '   - Total Lidocaína (mg) = Lidocaína (mg/h) * tempo',
        '   - Total Cetamina (mg) = Cetamina (mg/h) * tempo',
        '4) Converter para volume a aspirar (usando conc. padrão: F:50mcg/mL, L:20mg/mL, C:50mg/mL):',
        '   - Vol Fentanil = Total Fent / 50',
        '   - Vol Lido = Total Lido / 20',
        '   - Vol Ceta = Total Ceta / 50',
        '5) Volume de Diluente = Volume Final - (Vol F + Vol L + Vol C)',
      ],
      hard_safety_checks: [
        {
          if: "patient.species === 'cat'",
          then: 'WARN',
          message: 'ATENÇÃO: FLK contém Lidocaína. Uso em gatos exige cautela extrema ou remoção da Lidocaína.',
        },
      ],
      outputs: ['drug_volumes', 'diluent_volume'],
    },
  },

  presets: [
    {
      id: 'flk_dog_standard',
      label: 'FLK Padrão Cão (Dose Média) 🐕',
      dose_mcgkg: 0, // Placeholder, o cálculo é complexo
      limits: { min: 0, max: 0 },
      clinical_target: 'Fent 4 mcg/kg/h + Lido 40 mcg/kg/min + Ceta 8 mcg/kg/min',
      linked_alerts: ['flk_cat_warning'],
    },
    {
      id: 'flk_macete_1mlkgh',
      label: 'Macete Hospitalar 1 mL/kg/h 🏥',
      dose_mcgkg: 0,
      limits: { min: 0, max: 0 },
      clinical_target: 'Preparo ajustado para rodar a mL/h = peso do cão.',
      linked_alerts: ['flk_cat_warning'],
    },
  ],

  presentations: [
    {
      concentration_mg_ml: 0.05,
      label: 'Fentanil 50 mcg/mL (0,05 mg/mL)',
      total_mg: 0.5, // 10ml
    },
    {
      concentration_mg_ml: 20,
      label: 'Lidocaína 2% (20 mg/mL) sem vasoconstritor',
    },
    {
      concentration_mg_ml: 50,
      label: 'Cetamina 5% (50 mg/mL)',
    },
  ],

  ui_copy: {
    critical_warning_banner: 'FLK é para MANUTENÇÃO (CRI). Não fazer bolus da mistura.',
    alert_messages: {
      short: 'Cuidado com unidades: Fentanil é /hora, outros /minuto.',
      long: 'Lidocaína e Cetamina são calculadas em mcg/kg/minuto. Fentanil em mcg/kg/hora. O erro nessa conversão é comum.',
    },
    common_errors: [
      'Fazer IV rápido/bolus da mistura em vez de manter CRI titulada.',
      'Confundir unidades: Fentanil em mcg/kg/h e Lido/Cetamina em mcg/kg/min.',
      'Não reavaliar ventilação após aumento de taxa (risco de depressão respiratória).',
    ],
  },

  how_we_got_here_block: {
    title: 'Entendendo a mistura FLK',
    render_steps: [
      { step: 1, label: 'Alvos', formula: 'Fent: 2-5 mcg/kg/h | Lido: 25-50 mcg/kg/min | Ceta: 5-10 mcg/kg/min' },
      { step: 2, label: 'Conversão', formula: 'Calculamos a massa total de cada fármaco para o tempo que a infusão vai durar.' },
      { step: 3, label: 'Preparo', formula: 'Aspiramos os volumes calculados e completamos com salina até o volume final.' },
    ],
    example: {
      scenario: 'Cão 20kg, seringa 50mL, taxa 2 mL/kg/h (40 mL/h). Solução dura 1,25h.',
      calculation: [
        'Fentanil (4mcg/kg/h): 80 mcg/h -> x1.25h = 100 mcg -> 2 mL',
        'Lidocaína (40mcg/kg/min): 48 mg/h -> x1.25h = 60 mg -> 3 mL',
        'Cetamina (8mcg/kg/min): 9.6 mg/h -> x1.25h = 12 mg -> 0.24 mL',
        'Diluente = 50 - (2 + 3 + 0.24) = 44.76 mL',
      ],
      result: 'Na seringa: 2mL Fent + 3mL Lido + 0.24mL Ceta + 44.76mL Salina.',
    },
  },

  references: [
    {
      section: 'protocol',
      source: 'Plumbs Veterinary Drugs - MLK/FLK Infusions',
    },
    {
      section: 'doses',
      source: 'Pain Management to Veterinary Practice (Mathews et al.)',
    },
  ],
}
