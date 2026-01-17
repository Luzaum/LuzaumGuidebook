import type { DrugProfile } from '../../types/drugProfile'

export const maropitantProfile: DrugProfile = {
  drug_id: 'maropitant',
  name_pt: 'Maropitant',
  name_en: 'Maropitant citrate',
  synonyms: ['Cerenia', 'Maropitant citrate'],
  class: ['Antiemético', 'Antagonista do receptor NK-1', 'Modulador central da náusea'],
  core_concepts: {
    taglines: [
      'Bloqueia substância P no centro do vômito',
      'Antiemético central e periférico potente',
      'Reduz náusea independentemente da causa',
    ],
    mechanism: {
      receptors_targets: ['Receptor NK-1 (Substância P)'],
      primary_effects: {
        cardiovascular: 'Sem efeito hemodinâmico direto relevante',
        respiratory: 'Sem depressão respiratória',
        cns: 'Inibição do centro do vômito (área postrema e NTS)',
        renal_hepatic: 'Metabolismo hepático; excreção biliar',
        gi: 'Reduz estímulo aferente vagal e emético',
      },
      clinical_metaphor: 'Desliga o alarme central do vômito, independentemente do gatilho',
    },
    pharmacodynamics: {
      onset_iv: '≈ 5–10 min',
      onset_im: '≈ 20–45 min',
      peak: '≈ 1 h',
      duration: '≈ 24 h',
      dependencies: ['Função hepática', 'Ligação proteica'],
    },
    pharmacokinetics: {
      metabolism: 'Hepático (CYP450)',
      excretion: 'Biliar/fecal predominante',
      dog_vs_cat: 'Gatos apresentam meia-vida mais curta e maior sensibilidade local à injeção',
      active_metabolites: 'Não clinicamente relevantes',
      accumulation: 'Possível com uso diário prolongado em hepatopatas',
    },
  },
  species_notes: {
    dogs: {
      key_point: 'Excelente controle de vômito agudo e induzido por quimioterapia',
      high_risk_notes: ['Cautela em hepatopatas', 'Pode mascarar obstrução GI'],
      metabolism_excretion: 'Hepático → biliar',
    },
    cats: {
      key_point: 'Eficaz para vômitos agudos; uso IV preferível',
      high_risk_notes: ['Dor significativa IM/SC', 'Evitar uso prolongado sem monitoramento'],
      metabolism_excretion: 'Hepático → biliar',
    },
  },
  indications: {
    primary: [
      'Vômitos agudos de qualquer etiologia',
      'Prevenção de náusea e vômito perioperatório',
      'Vômitos induzidos por quimioterapia',
    ],
    secondary: ['Cinetose (principalmente cães)', 'Adjunto em pancreatite', 'Redução de náusea associada à uremia'],
  },
  contraindications: {
    absolute: [
      {
        condition: 'Hipersensibilidade ao maropitant',
        why: 'Risco de reação adversa',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Hepatopatia grave',
        why: 'Metabolismo hepático predominante',
        level: 'WARNING',
      },
      {
        condition: 'Obstrução gastrointestinal não diagnosticada',
        why: 'Pode mascarar sinais clínicos',
        level: 'MONITOR',
      },
    ],
  },
  doses: {
    unit_standard_cri: 'mg/kg',
    dog: {
      bolus: {
        mgkg: { min: 1, max: 1 },
        route: 'SC',
        loading_dose: { min: 1, max: 1 },
      },
      cri: {
        mgkgh: { min: 0.05, max: 0.1 },
        titration: {
          increment: 'Ajustar conforme resposta clínica',
          interval: '24 h',
        },
        max: 1,
      },
      adjustments: {
        obesity: 'Calcular pelo peso magro',
        shock: 'Sem ajuste direto',
        hypoalbuminemia: 'Monitorar resposta',
        comorbidities: 'Reduzir intervalo em hepatopatas',
      },
      therapeutic_targets: {
        target_map: 'N/A (não é vasopressor).',
        target_etco2: 'N/A (não é sedativo/anestésico).',
        analgesia_scale: 'N/A (não é analgésico).',
        sedation_target: 'N/A (não é sedativo).',
      },
    },
    cat: {
      bolus: {
        mgkg: { min: 1, max: 1 },
        route: 'IV',
        loading_dose: { min: 1, max: 1 },
      },
      cri: {
        mgkgh: { min: 0.05, max: 0.1 },
        titration: {
          increment: 'Manter dose mínima eficaz',
          interval: '24 h',
        },
        max: 1,
      },
      adjustments: {
        obesity: 'Usar peso ideal',
        shock: 'Preferir IV lento',
        hypoalbuminemia: 'Monitorar',
        comorbidities: 'Evitar uso prolongado em hepatopatas',
      },
      therapeutic_targets: {
        target_map: 'N/A (não é vasopressor).',
        target_etco2: 'N/A (não é sedativo/anestésico).',
        analgesia_scale: 'N/A (não é analgésico).',
        sedation_target: 'N/A (não é sedativo).',
      },
    },
  },
  presentations: [
    {
      concentration_mg_ml: 10,
      volume_ml: 1,
      total_mg: 10,
      label: '10 mg/mL — Cerenia injetável',
      examples: ['Cerenia®'],
      concentration_trap_warning: 'Não confundir com dose oral',
    },
    {
      total_mg: 16,
      label: 'Comprimidos 16 mg',
      examples: ['Cerenia® oral'],
    },
  ],
  dilution_and_preparation: {
    hard_rules: [
      'Não misturar com outros fármacos na mesma seringa',
      'Administração IV deve ser lenta',
    ],
    recommended_targets: [
      {
        target_mg_ml: 10,
        use_cases: ['Bolus SC/IV'],
        how_to_make: 'Usar apresentação comercial',
        recipe: 'Pronto para uso',
      },
    ],
    diluents_allowed: ['NaCl 0,9%'],
    preferred_diluent: {
      diluent: 'NaCl 0,9%',
      why: 'Compatibilidade garantida',
    },
    stability: [
      {
        diluent: 'NaCl 0,9%',
        max_time_hours: 24,
        light_protection: false,
      },
    ],
    dedicated_line_required: false,
    dedicated_line_why:
      'Pode ser administrado por via compartilhada, mas prefira via exclusiva se IV para evitar interações.',
  },
  compatibility: {
    diluents_allowed: ['NaCl 0,9%'],
    diluents_ok: ['NaCl 0,9%'],
    diluentsAllowed: ['NaCl 0,9%'],
    diluents: ['NaCl 0,9%'],
    compatible_in_syringe_or_bag: [],
    compatible_y_site_only: [],
    incompatible: [
      {
        agent: 'Outros fármacos na mesma seringa',
        why: 'Ausência de dados de compatibilidade',
        risk: 'inativação',
      },
    ],
    dedicated_line_rules: ['Preferir via exclusiva se IV'],
  },
  administration_and_titration: {
    bolus_guidance: [
      'Cães: SC (preferível) ou IV lento',
      'Gatos: IV lento (evitar IM/SC por dor local)',
      'Duração de efeito ~24 h após dose única',
    ],
    titration_rules: [
      'Em CRI, ajustar conforme resposta clínica e tolerabilidade',
      'Em uso prolongado, monitorar função hepática',
    ],
    monitoring_minimum: ['Sinais vitais', 'Função hepática (uso prolongado)', 'Eficácia antiemética'],
    endpoints: {
      desired_effect: ['Cessação de vômitos', 'Melhora do estado geral', 'Apetite restaurado'],
      toxicity_signs: ['Letargia excessiva', 'Reações cutâneas', 'Disfunção hepática'],
    },
    therapeutic_failure: {
      check_first: [
        'Confirmar que causa do vômito foi identificada e tratada',
        'Verificar dose e via de administração',
        'Avaliar necessidade de antiemético adjunto',
      ],
      common_causes: [
        'Obstrução GI não diagnosticada',
        'Causa central não tratada',
        'Dose insuficiente ou via inadequada',
      ],
      when_to_change: [
        'Se vômitos persistem após 24h, reavaliar diagnóstico e considerar antiemético adjunto',
        'Se sinais de toxicidade aparecerem, suspender e tratar suportivamente',
      ],
    },
  },
  adverse_effects_and_toxicity: {
    common: ['Dor no local da aplicação', 'Letargia leve'],
    serious: ['Reações anafiláticas raras'],
    subdose_signs: ['Persistência de náusea', 'Vômitos recorrentes'],
    overdose_signs: ['Letargia', 'Hiporexia'],
    management: ['Suporte clínico', 'Suspender se reação grave'],
    special_events: [
      {
        event: 'Dor intensa SC/IM',
        management: 'Preferir IV lento ou refrigerar solução',
      },
    ],
  },
  alerts_by_comorbidity: [
    {
      key: 'maropitant_hepatopathy',
      level: 'WARNING',
      title: 'Hepatopatia',
      why: 'Metabolismo hepático',
      action: ['Usar menor duração possível', 'Monitorar enzimas'],
      dose_adjustment: {
        reduce_percent: 25,
      },
    },
  ],
  presets: [
    {
      id: 'antiemetic_standard_dog',
      label: 'Antiemético padrão (cão) 🟨',
      dose_mgkg: 1,
      limits: { min: 1, max: 1 },
      clinical_target: 'Prevenção e tratamento de vômitos agudos',
      linked_alerts: ['maropitant_hepatopathy'],
    },
    {
      id: 'antiemetic_standard_cat',
      label: 'Antiemético padrão (gato) 🟨',
      dose_mgkg: 1,
      limits: { min: 1, max: 1 },
      clinical_target: 'Prevenção e tratamento de vômitos agudos (IV preferível)',
      linked_alerts: ['maropitant_hepatopathy'],
    },
  ],
  calculation_templates: {
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg', 'drug_concentration_mg_ml'],
      algorithm: [
        '1) Dose total (mg) = dose_mgkg × peso_kg',
        '2) Volume (mL) = mg ÷ concentração_mg_ml',
        '3) Administrar SC (cão) ou IV lento (gato)',
      ],
      hard_safety_checks: [],
      soft_safety_checks: [
        {
          if: "patient_species == 'cat' && route == 'IM'",
          then: 'WARN',
          message: 'Evitar IM em gatos por dor local significativa; preferir IV lento.',
        },
      ],
      outputs: ['bolus_mg', 'bolus_volume_ml'],
      error_cost: 'Erro de dose pode resultar em eficácia reduzida ou toxicidade.',
    },
    cri: {
      required_inputs: ['weight_kg', 'dose_mgkgh', 'drug_concentration_mg_ml'],
      algorithm: [
        '1) Dose total (mg) = dose_mgkgh × peso_kg',
        '2) Volume/hora (mL/h) = mg/h ÷ concentração_mg_ml',
        '3) Monitorar eficácia e função hepática em uso prolongado',
      ],
      hard_safety_checks: [
        {
          if: 'dose_mgkgh > 0.1',
          then: 'WARN',
          message: 'Dose acima do máximo recomendado (0,1 mg/kg/h); reavaliar necessidade.',
        },
      ],
      soft_safety_checks: [],
      outputs: ['cri_mg_per_hour', 'cri_ml_per_hour'],
      error_cost: 'Dose excessiva em CRI pode causar acumulação e toxicidade hepática.',
    },
  },
  how_we_got_here_block: {
    title: 'Como chegamos a este resultado (Maropitant – bolus SC/IV)',
    render_steps: [
      { step: 1, label: 'Calcular mg', formula: 'mg = dose (mg/kg) × peso (kg)' },
      { step: 2, label: 'Calcular mL', formula: 'mL = mg ÷ concentração (mg/mL)' },
      {
        step: 3,
        label: 'Administrar',
        formula: 'Cão: SC (preferível) ou IV lento; Gato: IV lento. Duração ~24h.',
      },
    ],
    interpretation_rules: [
      'Duração de efeito é longa (~24h); evite redosagem precoce.',
      'Se vômitos persistem, investigar causa base antes de redosar.',
      'Em gatos, sempre preferir IV lento para evitar dor local.',
    ],
    example: {
      scenario: 'Cão 10 kg, maropitant 1 mg/kg SC, frasco 10 mg/mL',
      calculation: ['mg = 1 × 10 = 10 mg', 'mL = 10 ÷ 10 = 1,0 mL'],
      result: 'Administrar 1,0 mL por via SC.',
    },
  },
  protocol_integrations: {
    enabled: true,
    protocols: ['Náusea e vômito perioperatório', 'Quimioterapia', 'Pancreatite'],
    why_combo_exists:
      'Maropitant é antiemético eficaz para prevenção perioperatória e tratamento de vômitos de múltiplas causas.',
    rules: [
      {
        if: "patient_has('hepatopathy') && treatment_duration > 48",
        then: {
          action: 'WARN',
          message: 'Uso prolongado em hepatopata requer monitoramento de função hepática.',
        },
      },
    ],
  },
  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'antiemetic_decision_tree',
        title: 'Árvore de decisão: uso de maropitant',
        mermaid:
          'flowchart TD\nA[Paciente com vômitos] --> B[Investigar causa base: exame físico, imagem, laboratório]\nB --> C{Obstrução GI confirmada?}\nC -- Sim --> D[NÃO usar antiemético até resolver obstrução]\nC -- Não --> E{Urgência/prevenção perioperatória?}\nE -- Sim --> F[Maropitant 1 mg/kg]\nF --> G{Cão ou Gato?}\nG -- Cão --> H[Via SC (preferível) ou IV lento]\nG -- Gato --> I[Via IV lento (evitar IM/SC)]\nI --> J[Monitorar eficácia em 24h]\nH --> J\nJ --> K{Vômitos cessaram?}\nK -- Sim --> L[Manter monitoramento; dose dura ~24h]\nK -- Não --> M[Reavaliar diagnóstico; considerar antiemético adjunto]',
      },
    ],
  },
  ui_copy: {
    critical_warning_banner: 'Antiemético potente pode mascarar doenças obstrutivas.',
    alert_messages: {
      short: 'Cautela em hepatopatas',
      long: 'O maropitant é metabolizado no fígado e pode acumular em uso prolongado. Sempre investigue a causa base do vômito antes de usar antieméticos.',
    },
    block_message: 'Uso bloqueado por contraindicação absoluta.',
    common_errors: [
      'Usar sem investigar causa do vômito',
      'Aplicar IM em gatos',
      'Uso prolongado sem monitoramento hepático',
    ],
  },
  references: [
    {
      section: 'mechanism',
      source: 'Lumb & Jones – Veterinary Anesthesia and Analgesia',
      edition: '6ª edição',
      year: 2024,
    },
    {
      section: 'doses',
      source: "Plumb's Veterinary Drug Handbook",
      year: 2023,
    },
    {
      section: 'clinical_use',
      source: 'Textbook of Small Animal Emergency Medicine',
      year: 2019,
    },
    {
      section: 'species_notes',
      source: 'Guia Prático de Sedação e Analgesia',
      year: 2023,
    },
  ],
}
