import type { DrugProfile } from '../../types/drugProfile'

export const dopaminaProfile: DrugProfile = {
  drug_id: 'dopamina',
  name_pt: 'Dopamina (cloridrato de dopamina)',
  name_en: 'Dopamine hydrochloride',
  synonyms: ['Dopamine HCl', 'DOPamine', 'catecolamina endógena', 'inotrópico/vasopressor dose-dependente'],
  class: [
    'Catecolamina endógena',
    'Inotrópico / vasopressor dose-dependente',
    'Agonista dopaminérgico (D1), β1 e α1',
  ],

  core_concepts: {
    taglines: [
      'Efeitos dose-dependentes: D1 (baixa) → β1 (média) → α1 (alta)',
      'Dose "renal" (1–3 mcg/kg/min) NÃO tem efeito nefroprotetor comprovado — conceito descreditado',
      'Taquiarritmias são a principal limitação clínica',
      'Incompatível com bicarbonato de sódio (inativação alcalina)',
      'Gatos: mais sensíveis a arritmias catecolaminérgicas',
    ],
    mechanism: {
      receptors_targets: [
        'D1 (dopaminérgico) — doses baixas (1–3 mcg/kg/min): vasodilatação renal/mesentérica',
        'β1 (adrenérgico) — doses médias (3–10 mcg/kg/min): inotropismo ↑, cronotropismo ↑',
        'α1 (adrenérgico) — doses altas (10–20 mcg/kg/min): vasoconstrição sistêmica ↑ PA',
      ],
      primary_effects: {
        cardiovascular:
          'Dose-dependente: baixa → vasodilatação renal (sem benefício clínico comprovado); média → ↑ DC/inotropismo; alta → ↑ PA/vasoconstrição. Risco de taquiarritmias em qualquer dose, especialmente alta.',
        respiratory:
          'Sem efeito broncodilatador relevante. Melhora secundária de oxigenação ao melhorar DC.',
        cns: 'Não sedativo. Alvo é hemodinâmica.',
        renal_hepatic:
          'Dose "renal" (D1): vasodilatação renal descrita, mas sem benefício clínico nefroprotetor comprovado em estudos veterinários e humanos. NÃO usar com objetivo nefroprotetor.',
        gi: 'Vasodilatação mesentérica em doses baixas (D1). Vasoconstrição esplâncnica em doses altas.',
      },
      clinical_metaphor:
        '"O fármaco das três faces": em dose baixa é vasodilatador renal (mas sem benefício real), em dose média é inotrópico, em dose alta é vasopressor. O problema é que as "faces" se sobrepõem e as arritmias aparecem em qualquer dose.',
    },
    pharmacodynamics: {
      onset_iv: 'Rápido (minutos após ajuste na bomba)',
      peak: 'Minutos (titulável)',
      duration: 'Curta; efeito cai rapidamente ao interromper',
      dependencies: [
        'Dose (determina o receptor predominante)',
        'Acidose/hipóxia (reduzem resposta)',
        'Predisposição a arritmias',
      ],
    },
    pharmacokinetics: {
      metabolism: 'Metabolismo por COMT e MAO; meia-vida muito curta.',
      excretion: 'Metabólitos excretados na urina.',
      dog_vs_cat:
        'Gatos parecem mais sensíveis a arritmias catecolaminérgicas. Monitorização mais rigorosa é recomendada em gatos.',
      active_metabolites: 'Não clinicamente relevantes para titulação aguda.',
      accumulation: 'Não é problema pela meia-vida curta. Limitação principal é arritmia.',
    },
  },

  species_notes: {
    dogs: {
      key_point:
        'Usada para suporte inotrópico (3–10 mcg/kg/min) e vasopressor (10–20 mcg/kg/min). Taquiarritmias são a principal limitação. Não usar com objetivo nefroprotetor.',
      high_risk_notes: [
        'Taquiarritmias supraventriculares e ventriculares: monitorar ECG continuamente.',
        'Dose "renal" (1–3 mcg/kg/min): sem benefício nefroprotetor comprovado — não indicar.',
        'Em doses altas (>15 mcg/kg/min): vasoconstrição excessiva e risco de isquemia.',
      ],
      metabolism_excretion: 'Metabolismo por COMT/MAO; meia-vida curta.',
    },
    cats: {
      key_point:
        'Mesmas faixas de dose, mas gatos são mais sensíveis a arritmias. Monitorização ECG contínua é mandatória. Iniciar na dose mínima efetiva.',
      high_risk_notes: [
        'Maior sensibilidade a taquiarritmias catecolaminérgicas.',
        'Monitorização ECG e PA invasiva recomendadas.',
        'Preferir norepinefrina ou dobutamina quando o fenótipo for mais claro.',
      ],
      metabolism_excretion: 'Metabolismo por COMT/MAO.',
    },
  },

  indications: {
    primary: [
      'Choque cardiogênico: suporte inotrópico (3–10 mcg/kg/min)',
      'Hipotensão com baixo débito cardíaco: inotrópico + vasopressor',
    ],
    secondary: [
      'Choque distributivo (séptico) com miocardiodepressão: combinado a vasopressor direto',
      'Hipotensão intra-anestésica com suspeita de baixo DC (quando dobutamina não disponível)',
    ],
    off_label_notes: [
      'Dose "renal" (1–3 mcg/kg/min): NÃO recomendada como estratégia nefroprotetora — evidência não suporta.',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Sem bomba de infusão e sem monitorização (ECG + PA)',
        why: 'Uso sem controle preciso é perigoso — efeitos dose-dependentes e risco de arritmia',
        level: 'BLOCK',
      },
      {
        condition: 'Feocromocitoma',
        why: 'Pode precipitar crise hipertensiva grave',
        level: 'BLOCK',
      },
      {
        condition: 'Incompatível com bicarbonato de sódio na mesma linha',
        why: 'Inativação alcalina da dopamina',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Taquiarritmias ativas',
        why: 'Pode agravar arritmia',
        level: 'CRITICAL',
      },
      {
        condition: 'Hipovolemia não corrigida',
        why: 'Vasopressor sem volume adequado piora perfusão tecidual',
        level: 'WARNING',
      },
    ],
  },

  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      cri: {
        mcgkgmin: {
          min: 3,
          max: 20,
          note: 'Dose-dependente: 3–10 mcg/kg/min (inotrópico/β1); 10–20 mcg/kg/min (vasopressor/α1). Não usar 1–3 mcg/kg/min como nefroprotetor. Máximo usual: 20 mcg/kg/min.',
        },
        titration: {
          increment: 'Ajustar 1–2 mcg/kg/min a cada 5–10 min conforme resposta hemodinâmica',
          interval: 'Reavaliar PA/ECG a cada 5 min durante titulação',
        },
        max: 20,
      },
      adjustments: {
        obesity: 'Calcular por peso magro/ideal.',
        shock: 'Corrigir hipovolemia antes ou concomitantemente. Titular por PA/perfusão.',
        hypoalbuminemia: 'Sem ajuste específico; titular ao efeito.',
        comorbidities:
          'Arritmias: reduzir dose ou trocar por dobutamina/norepinefrina. Acidose: corrigir para melhorar resposta.',
      },
      therapeutic_targets: {
        target_map: 'PAM ≥ 65–70 mmHg (ajustar conforme contexto clínico).',
        target_etco2: 'Normocapnia (EtCO2 35–45 mmHg).',
        analgesia_scale: 'N/A.',
        sedation_target: 'N/A.',
      },
    },
    cat: {
      cri: {
        mcgkgmin: {
          min: 3,
          max: 15,
          note: 'Mesmas faixas, mas gatos são mais sensíveis a arritmias. Iniciar no mínimo e titular com ECG contínuo. Máximo usual: 15 mcg/kg/min em gatos.',
        },
        titration: {
          increment: 'Ajustar 1 mcg/kg/min a cada 5–10 min com ECG contínuo',
          interval: 'Monitorização mais frequente que em cães',
        },
        max: 15,
      },
      adjustments: {
        obesity: 'Usar peso ideal.',
        shock: 'Corrigir hipovolemia primeiro.',
        hypoalbuminemia: 'Sem ajuste específico.',
        comorbidities: 'HCM: cautela; monitorar ECG. Arritmias: preferir alternativa.',
      },
      therapeutic_targets: {
        target_map: 'PAM ≥ 65 mmHg.',
        target_etco2: 'Normocapnia.',
        analgesia_scale: 'N/A.',
        sedation_target: 'N/A.',
      },
    },
  },

  presentations: [
    {
      concentration_mg_ml: 5,
      label: '5 mg/mL — ampola para diluição',
      examples: ['Dopamina HCl 5 mg/mL (genérico)'],
      concentration_trap_warning:
        'Sempre diluir antes de usar. Nunca administrar concentrado (5 mg/mL) diretamente.',
    },
  ],

  dilution_and_preparation: {
    hard_rules: [
      '⛔ NUNCA misturar com bicarbonato de sódio — inativação alcalina.',
      'Administrar exclusivamente por CRI com bomba de infusão.',
      'Monitorização mínima obrigatória: ECG contínuo + PA seriada.',
      'Rotular com: concentração final (mcg/mL) + dose-alvo (mcg/kg/min).',
    ],
    recommended_targets: [
      {
        target_mg_ml: 1.6,
        use_cases: ['CRI padrão — cão e gato (concentração prática para bomba)'],
        how_to_make: 'Diluir em NaCl 0,9% ou Glicose 5%.',
        recipe: '8 mL (40 mg) + 17 mL diluente = 25 mL a 1,6 mg/mL (1600 mcg/mL)',
      },
      {
        target_mg_ml: 0.8,
        use_cases: ['Pacientes menores / maior precisão de titulação'],
        how_to_make: 'Diluição mais conservadora.',
        recipe: '4 mL (20 mg) + 21 mL diluente = 25 mL a 0,8 mg/mL (800 mcg/mL)',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Glicose 5%'],
    preferred_diluent: {
      diluent: 'Glicose 5%',
      why: 'Maior estabilidade da dopamina em meio levemente ácido (D5W). NaCl 0,9% também é aceito.',
    },
    stability: [
      {
        diluent: 'NaCl 0,9% ou Glicose 5%',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Trocar a cada 24h. Descartar se solução escurecer (oxidação).',
      },
    ],
    dedicated_line_required: true,
    dedicated_line_why:
      'Evitar co-infusão com bicarbonato ou fármacos alcalinos. Linha dedicada reduz risco de inativação.',
  },

  compatibility: {
    compatible_in_syringe_or_bag: ['NaCl 0,9%', 'Glicose 5%'],
    compatible_y_site_only: [],
    incompatible: [
      {
        agent: 'Bicarbonato de sódio',
        why: 'Inativação alcalina da dopamina — perde potência',
        risk: 'inativação',
      },
      {
        agent: 'Soluções alcalinas (pH > 7)',
        why: 'Degradação da dopamina em meio alcalino',
        risk: 'inativação',
      },
    ],
    avoid_same_syringe_or_precipitation_risk: [
      'Evitar mistura com bicarbonato ou qualquer solução alcalina.',
    ],
    dedicated_line_rules: [
      'Linha dedicada sempre que possível.',
      'Se Y-site: garantir que não há bicarbonato na mesma via.',
    ],
  },

  administration_and_titration: {
    bolus_guidance: [
      'Dopamina NÃO é administrada em bolus — exclusivamente CRI.',
      'Ajustes de dose devem ser graduais (1–2 mcg/kg/min a cada 5–10 min).',
    ],
    titration_rules: [
      'Titular por resposta hemodinâmica (PA, perfusão, lactato).',
      'Se arritmia surgir: reduzir dose imediatamente; considerar trocar para norepinefrina/dobutamina.',
      'Não usar dose "renal" (1–3 mcg/kg/min) como estratégia nefroprotetora.',
    ],
    monitoring_minimum: [
      'ECG contínuo',
      'PA (ideal invasiva)',
      'SpO2',
      'Perfusão periférica (TRC, pulsos)',
      'Diurese',
      'Lactato seriado (quando disponível)',
    ],
    endpoints: {
      desired_effect: [
        'PAM ≥ 65–70 mmHg',
        'Melhora de perfusão (TRC, pulsos, diurese)',
        'Sem arritmias significativas',
      ],
      toxicity_signs: [
        'Taquiarritmias (SVT, VT, ectopias frequentes)',
        'Hipertensão excessiva',
        'Vasoconstrição periférica excessiva (extremidades frias, palidez)',
        'Isquemia de extremidades (doses muito altas)',
      ],
    },
    therapeutic_failure: {
      check_first: [
        'Hipovolemia corrigida?',
        'Acidose/hipóxia tratadas?',
        'Dose adequada para o fenótipo (inotrópico vs vasopressor)?',
      ],
      common_causes: [
        'Hipovolemia não corrigida',
        'Acidose grave reduzindo resposta às catecolaminas',
        'Fenótipo errado (vasodilatação pura → preferir norepinefrina)',
      ],
      when_to_change: [
        'Choque distributivo puro (vasoplegia): preferir norepinefrina.',
        'Baixo débito sem vasoconstrição: preferir dobutamina.',
        'Arritmias limitantes: trocar por norepinefrina ou dobutamina conforme fenótipo.',
      ],
    },
  },

  adverse_effects_and_toxicity: {
    common: [
      'Taquicardia',
      'Taquiarritmias (supraventriculares e ventriculares)',
      'Hipertensão (doses altas)',
    ],
    serious: [
      'Taquiarritmia sustentada / instabilidade hemodinâmica',
      'Isquemia de extremidades (doses muito altas)',
      'Vasoconstrição excessiva com piora de perfusão tecidual',
    ],
    subdose_signs: [
      'PA não atinge meta',
      'Perfusão inadequada persistente',
    ],
    overdose_signs: [
      'Taquicardia marcada',
      'Arritmias ventriculares',
      'Hipertensão grave',
      'Extremidades frias / isquemia',
    ],
    management: [
      'Arritmias: reduzir dose imediatamente; antiarrítmico conforme tipo e gravidade.',
      'Hipertensão: reduzir dose; considerar vasodilatador se necessário.',
      'Isquemia: reduzir dose; suporte.',
    ],
    special_events: [
      {
        event: 'Extravasamento (se via periférica)',
        management: 'Dopamina pode causar necrose tecidual por extravasamento. Preferir acesso central. Se extravasamento: fentolamine local (se disponível).',
      },
    ],
  },

  alerts_by_comorbidity: [
    {
      key: 'dopamine_arrhythmia_risk',
      level: 'WARNING',
      title: 'Risco de taquiarritmia (principal limitação)',
      why: 'Dopamina pode desencadear taquiarritmias em qualquer dose, especialmente em doses médias e altas.',
      action: [
        'ECG contínuo obrigatório.',
        'Reduzir dose se arritmia surgir.',
        'Considerar trocar para norepinefrina (vasopressor) ou dobutamina (inotrópico) conforme fenótipo.',
      ],
      dose_adjustment: {
        require_monitoring: ['ECG contínuo', 'PA', 'SpO2'],
      },
    },
    {
      key: 'dopamine_renal_dose_myth',
      level: 'MONITOR',
      title: '⚠ Dose "renal" (1–3 mcg/kg/min): sem benefício nefroprotetor',
      why: 'O conceito de "dopamina renal" está descreditado. Estudos não demonstram benefício nefroprotetor clínico consistente.',
      action: [
        'NÃO usar com objetivo nefroprotetor.',
        'Para proteção renal: otimizar perfusão (PA, volemia, DC) e tratar causa base.',
      ],
      dose_adjustment: {
        suggest_alternative: 'Otimização hemodinâmica global (PA, volemia, DC) para proteção renal.',
      },
    },
    {
      key: 'dopamine_hypovolemia',
      level: 'CRITICAL',
      title: 'Hipovolemia não corrigida: vasopressor sem volume piora perfusão',
      why: 'Vasopressor em paciente hipovolêmico pode aumentar PA sem melhorar perfusão tecidual.',
      action: [
        'Corrigir hipovolemia antes ou concomitantemente.',
        'Monitorar lactato e sinais de perfusão.',
      ],
      dose_adjustment: {
        require_monitoring: ['PA', 'lactato', 'diurese', 'perfusão periférica'],
      },
    },
    {
      key: 'dopamine_cat_arrhythmia',
      level: 'WARNING',
      title: 'Gato: maior sensibilidade a arritmias catecolaminérgicas',
      why: 'Gatos parecem mais sensíveis a taquiarritmias induzidas por catecolaminas.',
      action: [
        'Iniciar na dose mínima efetiva.',
        'ECG contínuo obrigatório.',
        'Considerar norepinefrina ou dobutamina como alternativa mais previsível.',
      ],
      dose_adjustment: {
        reduce_percent: 25,
        require_monitoring: ['ECG contínuo', 'PA', 'SpO2'],
        suggest_alternative: 'Norepinefrina (vasopressor) ou dobutamina (inotrópico) conforme fenótipo.',
      },
    },
  ],

  presets: [
    {
      id: 'dopamine_inotropic_dog',
      label: 'Cão — inotrópico (β1) 🟨',
      dose_mcgkgmin: 5,
      limits: { min: 3, max: 10 },
      clinical_target: 'Suporte de débito cardíaco em choque cardiogênico/miocardiodepressão',
      linked_alerts: ['dopamine_arrhythmia_risk', 'dopamine_hypovolemia'],
    },
    {
      id: 'dopamine_vasopressor_dog',
      label: 'Cão — vasopressor (α1) 🟧',
      dose_mcgkgmin: 10,
      limits: { min: 10, max: 20 },
      clinical_target: 'Suporte vasopressor em hipotensão refratária',
      linked_alerts: ['dopamine_arrhythmia_risk', 'dopamine_hypovolemia'],
    },
    {
      id: 'dopamine_inotropic_cat',
      label: 'Gato — inotrópico (conservador) 🟨',
      dose_mcgkgmin: 3,
      limits: { min: 3, max: 10 },
      clinical_target: 'Suporte de DC com ECG contínuo; iniciar no mínimo',
      linked_alerts: ['dopamine_cat_arrhythmia', 'dopamine_arrhythmia_risk'],
    },
  ],

  calculation_templates: {
    cri: {
      required_inputs: [
        'weight_kg',
        'target_mcgkgmin',
        'pump_rate_ml_h_override',
      ],
      algorithm: [
        '1) Calcular mcg/min = peso * dose',
        '2) Calcular mcg/h = mcg/min * 60',
        '3) Calcular mg/h = mcg/h / 1000',
        '4) Calcular mL/h = mg/h / concentração (mg/mL)',
      ],
      outputs: ['pump_rate_ml_h'],
    },
  },

  references: [
    {
      section: 'doses/mechanism/arrhythmia_risk',
      source: 'Textbook of Small Animal Emergency Medicine (Wiley Blackwell), 2019 — Vasopressors and Inotropes',
      year: 2019,
    },
    {
      section: 'renal_dose_myth/clinical_use',
      source: 'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd ed.',
      year: 2018,
    },
  ],
}
