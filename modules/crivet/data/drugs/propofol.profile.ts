import type { DrugProfile } from '../../types/drugProfile'

export const propofolProfile: DrugProfile = {
  drug_id: 'propofol',
  name_pt: 'Propofol',
  name_en: 'Propofol',
  synonyms: ['Diprivan', 'Propoflo', 'Leite do Esquecimento'],
  class: ['Hipnótico geral', 'Agente de indução IV', 'Anestésico não barbitúrico'],

  core_concepts: {
    taglines: [
      'Indutor padrão-ouro para procedimentos rápidos e ambulatoriais.',
      'Causa apneia e hipotensão se administrado rápido.',
      'NÃO analgésico: requer co-adjuvantes para dor.',
      'Emulsão lipídica favorece contaminação bacteriana (técnica asséptica rigorosa).',
    ],
    mechanism: {
      receptors_targets: ['GABA-A (potencialização)', 'Canais de sódio (secundário)'],
      primary_effects: {
        cns: 'Hipnose rápida, redução da PIC e metabolismo cerebral. Anticonvulsivante.',
        respiratory: 'Depressão respiratória dose-dependente (apneia comum na indução rápida).',
        cardiovascular: 'Vasodilatação arterial e venosa (hipotensão), inotropismo negativo.',
      },
      clinical_metaphor: 'Desliga o cérebro rápido, mas derruba a pressão se o sistema estiver "vazio" (hipovolemia).',
    },
    pharmacodynamics: {
      onset_iv: '30-60 segundos (um "braço-cérebro").',
      duration: '5-10 minutos após bolus único.',
      peak: '1-2 minutos.',
      dependencies: ['Débito cardíaco (menor DC = indução mais rápida/violenta).'],
    },
    pharmacokinetics: {
      metabolism: 'Hepático e Extra-hepático (pulmão, rim). Clearance muito rápido.',
      excretion: 'Metabólitos renais inativos.',
      dog_vs_cat: 'Gatos: metabolismo mais lento (deficiência de glucuronidação). Risco de lesão oxidativa (Heinz bodies) em infusões longas ou dias consecutivos.',
    },
  },

  species_notes: {
    dogs: {
      key_point: 'Recuperação rápida por redistribuição. Metabolismo hepático + extra-hepático eficiente.',
    },
    cats: {
      key_point: 'Deficiência parcial na glicuronidação. Recuperação mais lenta após infusões longas.',
      high_risk_notes: ['Infusões prolongadas (> 30-60 min ou uso repetido dias consecutivos): Formação de Corpos de Heinz e Anemia oxidativa.'],
    },
  },

  indications: {
    primary: [
      'Indução anestésica para intubação.',
      'Manutenção anestésica total intravenosa (TIVA).',
      'Sedação para procedimentos curtos e não dolorosos (ex: exames de imagem).',
      'Controle de status epilepticus refratário.',
    ],
    secondary: ['Cesariana (rápida eliminação neonatal).'],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Hipersensibilidade conhecida (componentes da emulsão: ovo, soja).',
        why: 'Risco de anafilaxia (raro).',
        level: 'BLOCK',
      },
      {
        condition: 'Choque / Hipotensão grave não tratada',
        why: 'Vasodilatação e inotropismo negativo podem causar PCR.',
        level: 'CRITICAL',
      },
    ],
    relative: [
      {
        condition: 'Gatos com uso repetido diário',
        why: 'Risco de anemia hemolítica por corpos de Heinz.',
        level: 'WARNING',
      },
      {
        condition: 'Hiperlipidemia grave / Pancreatite',
        why: 'Veículo lipídico pode agravar (teórico, mas cautela).',
        level: 'WARNING',
      },
    ],
  },

  alerts_by_comorbidity: [
    {
      key: 'cardiac_disease',
      level: 'WARNING',
      title: 'Cardiopatia: Risco de descompensação',
      why: 'Redução da contratilidade e vasodilatação. Cardiopatas têm menor reserva.',
      action: ['Reduzir dose em 30-50%', 'Titular muito lentamente', 'Monitorar PA invasiva se possível'],
      dose_adjustment: { reduce_percent: 40 },
    },
    {
      key: 'hypovolemia_shock',
      level: 'CRITICAL',
      title: 'Hipovolemia/Choque: Contraindicado',
      why: 'Veias "vazias" + vasodilatação = Parada cardíaca. Droga agrava hipotensão.',
      action: ['Estabilizar volemia antes', 'Usar co-indução poupadora', 'Considerar etomidato ou alfaxalona'],
    },
    {
      key: 'neurologic_increased_icp',
      level: 'SAFE',
      title: 'Hipertensão Intracraniana (PIC)',
      why: 'Propofol reduz fluxo sanguíneo cerebral e metabolismo, reduzindo PIC.',
      action: ['Benéfico em neuroanestesia', 'Manter CAM baixa', 'Cuidar para não baixar PAM (PPC = PAM - PIC)'],
    },
    {
      key: 'obesity',
      level: 'WARNING',
      title: 'Obesidade',
      why: 'Alta lipossolubilidade. Dose pelo peso real causa overdose massiva e despertar lento.',
      action: ['Calcular dose pelo PESO MAGRO'],
    },
  ],

  doses: {
    unit_standard_cri: 'mg/kg/min',
    dog: {
      bolus: {
        mgkg: {
          min: 4,
          max: 6,
          note: 'Indução: 4-6 mg/kg IV lento (titular). Se pré-medicado: 2-4 mg/kg. Manutenção intermitente: 1-2 mg/kg a cada 10-20 min.',
        },
        route: 'IV',
        loading_dose: { min: 1, max: 2 },
      },
      cri: {
        mgkgmin: {
          min: 0.1,
          max: 0.4,
          note: 'Uso exclusivo anestesia / UTI avançada (TIVA/Convulsão). 0,1–0,4 mg/kg/min.',
        },
        titration: {
          increment: '0,05 mg/kg/min',
          interval: 'Imediato',
        },
        max: 0.8,
      },
      adjustments: {
        obesity: 'Dose pelo peso ideal.',
        shock: 'Reduzir dose em 50-75%. Titular com extrema cautela.',
        hypoalbuminemia: 'Ajustar (alta ligação proteica).',
        comorbidities: 'Cardiopatas e idosos: reduzir dose.',
      },
      therapeutic_targets: {
        target_map: 'N/A (Causa hipotensão).',
        target_etco2: 'Manter ventilação (apneia comum).',
        analgesia_scale: 'N/A (Não é analgésico).',
        sedation_target: 'Indução suave e manutenção de hipnose.',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 4,
          max: 8,
          note: 'Indução: 4-8 mg/kg IV lento. Evitar infusões longas (>30min) ou repetidas dias seguidos (risco de Heinz bodies).',
        },
        route: 'IV',
        loading_dose: { min: 1, max: 2 },
      },
      cri: {
        mgkgmin: {
          min: 0.1,
          max: 0.3,
          note: 'TIVA < 30 min. Evitar infusões prolongadas (lesão oxidativa em hemácias/corpúsculos de Heinz).',
        },
        titration: {
          increment: '0,05 mg/kg/min',
          interval: 'Imediato',
        },
        max: 0.5,
      },
      adjustments: {
        obesity: 'Peso magro.',
        shock: 'Reduzir dose.',
        comorbidities: 'Anêmicos: evitar repetidas anestesias com propofol.',
      },
    },
  },

  calculation_templates: {
    cri: {
      required_inputs: [
        'weight_kg',
        'target_mgkgmin',
        'pump_rate_ml_h_override',
      ],
      algorithm: [
        '1) Calcular mg/min = peso * dose',
        '2) Calcular mg/h = mg/min * 60',
        '3) Calcular mL/h = mg/h / 10 (concentração fixa 10mg/mL)',
        '4) AVISO: Usar PURO na seringa/equipo.',
      ],
      outputs: ['pump_rate_ml_h'],
      hard_safety_checks: [
        {
          if: "true",
          then: "WARN",
          message: "NÃO DILUIR: Propofol deve ser usado puro (10 mg/mL). Risco de instabilidade e contaminação se diluído."
        }
      ]
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg'],
      algorithm: [
        '1) Mg totais = peso * dose',
        '2) Volume = mg / 10',
      ],
      outputs: ['drug_volume'],
    },
  },

  presets: [
    {
      id: 'propofol_tiva_dog',
      label: 'TIVA Cão (Manutenção) 🐕',
      dose_mgkgmin: 0.2, // 12 mg/kg/h
      limits: { min: 0.1, max: 0.4 },
      clinical_target: 'Manutenção anestésica IV total.',
    },
    {
      id: 'propofol_sedation_cri',
      label: 'Sedação Leve (CRI) 💤',
      dose_mgkgmin: 0.05, // 3 mg/kg/h
      limits: { min: 0.02, max: 0.1 },
      clinical_target: 'Sedação para ventilação ou procedimentos não dolorosos.',
    },
  ],

  ui_copy: {
    critical_warning_banner: 'NÃO DILUIR. Usar puro (10mg/mL). Risco de contaminação bacteriana.',
    alert_messages: {
      short: 'Use técnica asséptica rigorosa.',
      long: 'Emulsão lipídica favorece crescimento bacteriano. Descartar frasco aberto após 6-12h.',
    },
  },

  presentations: [
    {
      concentration_mg_ml: 10,
      label: 'Propofol 1% (10 mg/mL)',
      examples: ['Propofol', 'Diprivan', 'Propoflo'],
      concentration_trap_warning: 'Confira se é 1% (10 mg/mL) ou 2% (20 mg/mL - raro em vet, mas existe).',
    },
  ],

  dilution_and_preparation: {
    hard_rules: [
      'NÃO misturar com outros fármacos na mesma seringa (exceto lidocaína em co-indução imediata, se protocolo aceito, mas preferir separado).',
      'Técnica asséptica rigorosa (meio de cultura rico).',
      'Descartar frascos abertos conforme recomendação (6h sem conservante, 28 dias com conservante).',
    ],
    recommended_targets: [
      {
        target_mg_ml: 10,
        use_cases: ['Indução', 'CRI'],
        how_to_make: 'Usar puro (10 mg/mL).',
      },
    ],
    diluents_allowed: ['D5W', 'NaCl 0.9% (embora raramente diluído)'],
    dedicated_line_required: true,
  },

  compatibility: {
    incompatible: [
      {
        agent: 'Fluidos com cálcio, muitos antibióticos',
        why: 'Emulsão instável, risco de quebra da emulsão ou precipitação.',
        risk: 'Embolia gorda / precipitação',
      },
    ],
    dedicated_line_rules: ['Idealmente administrar em via exclusiva ou Y-site muito próximo com flush.'],
  },

  references: [
    {
      section: 'Geral',
      source: 'Lumb & Jones – Veterinary Anesthesia and Analgesia, 6th Edition',
    },
  ],
}
