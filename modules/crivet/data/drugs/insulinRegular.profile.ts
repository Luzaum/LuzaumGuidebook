import type { DrugProfile } from '../../types/drugProfile'

export const insulinRegularProfile: DrugProfile = {
  drug_id: 'insulina_regular',
  name_pt: 'Insulina Regular (Cristalina / Humana)',
  name_en: 'Regular Insulin',
  synonyms: ['Insulina cristalina', 'Insulina humana regular', 'Humulin R', 'Novolin R'],
  class: ['Hormônio hipoglicemiante', 'Insulina de curta duração', 'Insulina intravenosa de ação rápida'],
  core_concepts: {
    taglines: [
      'Insulina de escolha para emergências hiperglicêmicas',
      'Única insulina segura para uso intravenoso',
      'Permite titulação fina e reversível',
    ],
    mechanism: {
      receptors_targets: ['Receptor de insulina (tirosina-quinase)'],
      primary_effects: {
        cardiovascular:
          'Indireto: melhora volemia e perfusão ao corrigir hiperglicemia',
        respiratory: 'Sem efeito direto',
        cns: 'Reduz neurotoxicidade da hiperglicemia',
        renal_hepatic: 'Reduz glicosúria e diurese osmótica',
        gi: 'Sem efeito direto',
      },
      clinical_metaphor: 'Chave que abre a porta da glicose para dentro da célula',
    },
    pharmacodynamics: {
      onset_iv: '≈ 5–10 min',
      onset_im: '≈ 30–60 min',
      peak: '≈ 1–3 h',
      duration: '≈ 4–6 h',
      dependencies: ['Sensibilidade periférica à insulina', 'Estado ácido-base', 'Potássio sérico'],
    },
    pharmacokinetics: {
      metabolism: 'Captação hepática e renal',
      excretion: 'Metabolização celular (não renal direta)',
      dog_vs_cat: 'Gatos são mais sensíveis a quedas abruptas de glicemia',
      active_metabolites: 'Não aplicável',
      accumulation: 'Não — risco está na hipoglicemia, não em acúmulo',
    },
  },
  species_notes: {
    dogs: {
      key_point: 'Resposta previsível, boa margem para CRI',
      high_risk_notes: ['Hipocalemia durante correção', 'Hipoglicemia tardia'],
      metabolism_excretion: 'Hepática predominante',
    },
    cats: {
      key_point: 'Resposta rápida, risco alto de hipoglicemia',
      high_risk_notes: ['Hipoglicemia silenciosa', 'Resposta exagerada a bolus'],
      metabolism_excretion: 'Menor reserva gliconeogênica',
    },
  },
  indications: {
    primary: [
      'Cetoacidose diabética (CAD)',
      'Estado hiperosmolar hiperglicêmico',
      'Hiperglicemia grave hospitalar',
      'Diabetes mellitus descompensado',
    ],
    secondary: ['Hipercalemia (associada à glicose)', 'Controle glicêmico em UTI'],
  },
  contraindications: {
    absolute: [
      {
        condition: 'Hipoglicemia',
        why: 'Risco de convulsão e morte',
        level: 'CRITICAL',
      },
    ],
    relative: [
      {
        condition: 'Hipocalemia não corrigida',
        why: 'Insulina desloca K+ para o intracelular',
        level: 'WARNING',
      },
    ],
  },
  doses: {
    unit_standard_cri: 'U/kg/h',
    dog: {
      cri: {
        // Nota: usando mgkgh como placeholder estrutural, mas a dose real é em U/kg/h
        // O sistema deve interpretar unit_standard_cri: "U/kg/h" para conversões
        mgkgh: {
          min: 0.05,
          max: 0.1,
          note: 'CRI em cães: 0.05–0.1 U/kg/h para CAD (preferir CRI contínua)',
        },
        titration: {
          increment: 'Ajustar ±0.02–0.05 U/kg/h',
          interval: 'Reavaliar glicemia a cada 1–2 h',
        },
        max: 0.2,
      },
      bolus: {
        ukg: {
          min: 0.1,
          max: 0.2,
          note: 'IM a cada 4–6 h (alternativa quando não há bomba de infusão)',
        },
        route: 'IM',
      },
      adjustments: {
        obesity: 'Usar peso ideal ou ajustado',
        shock: 'Monitorar resposta glicêmica rigorosamente',
        hypoalbuminemia: 'Sem ajuste direto; monitorar resposta',
        comorbidities:
          'Hipocalemia: suplementar K+ seriado; IRC: ajustar titulação e monitorar mais frequentemente',
      },
      therapeutic_targets: {
        target_map: 'N/A (não é vasopressor).',
        target_etco2: 'N/A (não é sedativo/anestésico).',
        analgesia_scale: 'N/A (não é analgésico).',
        sedation_target: 'N/A (não é sedativo).',
      },
    },
    cat: {
      cri: {
        mgkgh: {
          min: 0.025,
          max: 0.05,
          note: 'CRI em gatos: 0.025–0.05 U/kg/h para CAD (gatos são mais sensíveis)',
        },
        titration: {
          increment: 'Ajustar ±0.01–0.02 U/kg/h',
          interval: 'Reavaliar glicemia a cada 1–2 h',
        },
        max: 0.1,
      },
      bolus: {
        ukg: {
          min: 0.05,
          max: 0.1,
          note: 'IM a cada 4–6 h (uso com cautela — risco alto de hipoglicemia)',
        },
        route: 'IM',
      },
      adjustments: {
        obesity: 'Usar peso ideal ou ajustado',
        shock: 'Monitorar resposta glicêmica rigorosamente',
        hypoalbuminemia: 'Sem ajuste direto; monitorar resposta',
        comorbidities:
          'Hipocalemia: suplementar K+ seriado; IRC: ajustar titulação e monitorar mais frequentemente',
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
      concentration_mg_ml: 100,
      volume_ml: 10,
      total_mg: 1000,
      label: '100 U/mL — frasco de 10 mL (1000 U total)',
      examples: ['Humulin R', 'Novolin R'],
      concentration_trap_warning:
        'ALTO RISCO DE ERRO FATAL: concentração 100 U/mL (não mg/mL) — 1 mL contém 100 UNIDADES de insulina. Exige diluição OBRIGATÓRIA para CRI IV. Nunca administrar IV sem diluir. Use seringa de insulina para aspirar volumes pequenos.',
    },
    {
      concentration_mg_ml: 100,
      volume_ml: 3,
      total_mg: 300,
      label: '100 U/mL — frasco de 3 mL (300 U total)',
      examples: ['Humulin R', 'Novolin R (penfill)'],
      concentration_trap_warning:
        'Frasco menor mas mesma concentração (100 U/mL). Mesmas regras de diluição obrigatória para IV.',
    },
  ],
  dilution_and_preparation: {
    hard_rules: [
      'NUNCA administrar insulina 100 U/mL por via IV sem diluir — risco de morte por hipoglicemia',
      'Usar SOMENTE seringa de insulina (graduada em unidades) para aspirar do frasco',
      'Monitorar glicemia seriada obrigatória (a cada 1–2 h durante titulação)',
      'Rotular diluição com concentração final (U/mL), data/hora e profissional responsável',
      'Preparar diluição diariamente e descartar após 24 h (estabilidade)',
    ],
    recommended_targets: [
      {
        target_mg_ml: 1,
        use_cases: [
          'CRI padrão em cães (facilita cálculo: 1 U/mL = 1 mL/h para cada U/h necessária)',
          'Dose típica: 0.05–0.1 U/kg/h → taxa em mL/h = dose U/kg/h × peso',
        ],
        how_to_make:
          'Diluir 1 mL de insulina (100 U/mL) em 99 mL de NaCl 0,9%. Usar seringa de insulina para aspirar 1 mL do frasco (100 U). Exemplo prático: Cão 10 kg, dose 0.1 U/kg/h → 1 U/h → 1 mL/h na bomba. Concentração final de 1 U/mL facilita cálculos e reduz erro de dose.',
        recipe: '1 mL (insulina 100 U/mL) + 99 mL NaCl 0,9% = 100 mL a 1 U/mL',
      },
      {
        target_mg_ml: 0.5,
        use_cases: [
          'CRI mais segura em gatos (maior volume, menor risco de overdose)',
          'Pequenos pacientes ou quando se deseja titulação mais fina',
          'Dose típica: 0.025–0.05 U/kg/h',
        ],
        how_to_make:
          'Diluir 0,5 mL de insulina (50 U de um frasco 100 U/mL) em 99,5 mL de NaCl 0,9%. Usar seringa de insulina para aspirar 0,5 mL (50 U). Exemplo prático: Gato 5 kg, dose 0.05 U/kg/h → 0.25 U/h → 0.5 mL/h na bomba. Maior volume = menor risco de erro em infusão, especialmente importante em gatos.',
        recipe: '0,5 mL (insulina 100 U/mL) + 99,5 mL NaCl 0,9% = 100 mL a 0,5 U/mL',
      },
      {
        target_mg_ml: 0.1,
        use_cases: [
          'CRI ultrabaixa para titulação muito fina (pacientes muito sensíveis ou doses mínimas)',
          'Alternativa para gatos muito pequenos',
        ],
        how_to_make:
          'Diluir 0,1 mL de insulina (10 U) em 99,9 mL de NaCl 0,9%. Usar seringa de insulina para aspirar 0,1 mL (10 U). Mais difícil de preparar com precisão devido ao volume muito pequeno — requer seringa de insulina de alta qualidade e técnica asséptica rigorosa.',
        recipe: '0,1 mL (insulina 100 U/mL) + 99,9 mL NaCl 0,9% = 100 mL a 0,1 U/mL',
      },
    ],
    diluents_allowed: ['NaCl 0,9%'],
    preferred_diluent: {
      diluent: 'NaCl 0,9%',
      why:
        'Estável, não interfere na glicemia, não contém precursores gliconeogênicos (como lactato), e é o padrão ouro para diluição de insulina IV',
    },
    stability: [
      {
        diluent: 'NaCl 0,9%',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change:
          'Preparar diariamente em condições assépticas. Rotular com: concentração final (U/mL), data/hora de preparo, profissional responsável. Descartar após 24 h ou se houver qualquer dúvida sobre integridade.',
      },
    ],
    dedicated_line_required: true,
    dedicated_line_why:
      'Preferir linha dedicada para evitar incompatibilidades e permitir titulação segura.',
  },
  compatibility: {
    diluents_allowed: ['NaCl 0,9%'],
    diluents_ok: ['NaCl 0,9%'],
    diluentsAllowed: ['NaCl 0,9%'],
    diluents: ['NaCl 0,9%'],
    compatible_in_syringe_or_bag: [
      'Não misturar insulina diluída com outros fármacos na mesma bolsa/seringa — risco de incompatibilidade físico-química e perda de atividade',
      'Insulina deve ser administrada em linha separada ou via dedicada',
    ],
    compatible_y_site_only: [
      'Se Y-site absolutamente necessário, usar apenas com NaCl 0,9% correndo — não misturar com outros fármacos',
      'Flush abundante entre drogas se via compartilhada (não recomendado)',
    ],
    incompatible: [
      {
        agent: 'Ringer Lactato (LRS)',
        why:
          'Contém lactato (precursor gliconeogênico via gliconeogênese hepática) — pode interferir na eficácia da insulina e piorar controle glicêmico',
        risk: 'inativação funcional / interferência farmacológica',
      },
      {
        agent: 'Glicose 5% (D5W)',
        why:
          'Contém glicose — contradiz o objetivo de redução glicêmica. Usar apenas se paciente hipoglicêmico e necessário correção simultânea.',
        risk: 'interferência terapêutica',
      },
      {
        agent: 'Outros fármacos na mesma seringa/bolsa',
        why:
          'Dados limitados de compatibilidade. Insulina pode ser inativada por pH, enzimas ou interações físico-químicas.',
        risk: 'precipitação / inativação',
      },
      {
        agent: 'Catecolaminas (epinefrina, norepinefrina)',
        why:
          'Catecolaminas aumentam glicose sérica (glicogenólise/gliconeogênese) — efeito oposto ao da insulina. Se necessário usar ambos, monitorar glicemia intensivamente.',
        risk: 'interferência farmacológica',
      },
    ],
    dedicated_line_rules: [
      'PREFERIR linha dedicada sempre que possível — permite titulação precisa sem interferência',
      'Se linha compartilhada obrigatória, usar apenas com NaCl 0,9% e flush abundante entre fármacos',
      'Nunca misturar insulina com outros fármacos na mesma bolsa/seringa de infusão',
    ],
  },
  administration_and_titration: {
    bolus_guidance: [
      'IM a cada 4–6 h (alternativa quando não há bomba de infusão disponível)',
      'Cães: 0,1–0,2 U/kg IM. Usar seringa de insulina para aspirar do frasco',
      'Gatos: 0,05–0,1 U/kg IM (com cautela — risco alto de hipoglicemia)',
      'NUNCA usar bolus IV — pico muito rápido, risco de hipoglicemia severa',
      'Após bolus IM, monitorar glicemia a cada 2–4 h e ajustar próximo bolus conforme resposta',
    ],
    titration_rules: [
      'CRI é o padrão ouro — permite titulação fina e reversível',
      'Iniciar com dose conservadora: 0.05 U/kg/h (cão) ou 0.025 U/kg/h (gato)',
      'Meta de redução: 50–75 mg/dL/h (não ultrapassar 100 mg/dL/h para evitar edema cerebral)',
      'Reavaliar glicemia a cada 1–2 h durante titulação inicial, depois a cada 2–4 h quando estável',
      'Ajustar taxa: aumentar ±0.02–0.05 U/kg/h (cão) ou ±0.01–0.02 U/kg/h (gato) se glicemia cai muito lento',
      'Reduzir taxa: diminuir em 25–50% se glicemia cai muito rápido (> 100 mg/dL/h) ou se aproximar de 250 mg/dL',
      'Suspender CRI se glicemia < 80 mg/dL ou queda > 100 mg/dL/h',
      'Quando glicemia < 250 mg/dL e paciente estável, considerar redução gradual da taxa ou transição para SC',
    ],
    monitoring_minimum: [
      'Glicemia seriada (OBRIGATÓRIA): a cada 1–2 h durante titulação inicial, depois a cada 2–4 h quando estável',
      'Potássio sérico (OBRIGATÓRIO): a cada 2–4 h inicialmente — hipocalemia é comum e perigosa durante correção',
      'Fosfato sérico: monitorar se possível (hipofosfatemia também comum)',
      'Sinais vitais (PA, FC, FR, temperatura) a cada 2–4 h',
      'Estado neurológico: avaliar frequentemente para detectar hipoglicemia precoce (letargia, fraqueza, convulsões)',
      'Diurese e balanço hídrico: CAD causa poliúria → monitore diurese e correção de desidratação',
      'Cetonas (sangue/urina): avaliar resposta ao tratamento',
      'Ácido-base: reavaliar se paciente grave (bicarbonato, gasometria conforme indicação)',
    ],
    endpoints: {
      desired_effect: [
        'Glicemia em queda gradual (50–75 mg/dL/h)',
        'Resolução de cetoacidose',
        'Melhora do estado geral',
      ],
      toxicity_signs: [
        'Hipoglicemia (< 80 mg/dL ou queda > 100 mg/dL/h)',
        'Hipocalemia (< 3,5 mEq/L)',
        'Alteração neurológica (letargia, convulsões)',
      ],
    },
    therapeutic_failure: {
      check_first: [
        'Confirmar que diluição foi feita corretamente (recalcular: U/mL final?)',
        'Verificar taxa de infusão da bomba (mL/h programado vs mL/h real)',
        'Confirmar que linha está permeável e sem obstruções',
        'Verificar se frasco/seringa está corretamente conectado',
        'Avaliar resistência à insulina: infecção? estresse? medicações (corticoides)?',
        'Confirmar que fluidoterapia está adequada (desidratação corrigida?)',
        'Verificar se há causa de hiperglicemia não tratada (sepsis, pancreatite, etc)',
      ],
      common_causes: [
        'Diluição incorreta (concentração final errada)',
        'Taxa de infusão inadequada (bomba mal programada ou obstrução)',
        'Resistência à insulina não tratada (infecção, estresse, medicações antagonistas)',
        'Fluidoterapia insuficiente ou desidratação não corrigida',
        'Causas de hiperglicemia persistentes (sepsis, pancreatite, hipertiroidismo em gatos)',
        'Insulina degradada (preparo incorreto, tempo excessivo)',
      ],
      when_to_change: [
        'Se glicemia não cai após 2–4 h: reavaliar dose, diluição, taxa e causas de resistência; considerar aumentar taxa em 25–50%',
        'Se hipoglicemia aparecer: suspender CRI IMEDIATAMENTE, tratar com glicose IV, monitorar até estabilizar',
        'Se hipocalemia severa (< 3.5 mEq/L): suplementar K+ IV enquanto continua insulina (hipocalemia piora se parar insulina)',
        'Se glicemia cair muito rápido (> 100 mg/dL/h): reduzir taxa em 50% ou suspender temporariamente',
        'Se paciente não melhora apesar de glicemia controlada: investigar outras causas de CAD (infecção, etc)',
      ],
    },
  },
  adverse_effects_and_toxicity: {
    common: ['Hipocalemia (durante correção inicial)', 'Hipoglicemia tardia'],
    serious: [
      'Hipoglicemia severa (convulsões, coma)',
      'Hipocalemia severa (arritmias cardíacas)',
      'Edema cerebral (correção muito rápida)',
    ],
    subdose_signs: ['Glicemia não reduz após 2–4 h', 'Persistência de cetoacidose'],
    overdose_signs: [
      'Hipoglicemia (< 80 mg/dL)',
      'Queda de glicemia > 100 mg/dL/h',
      'Alteração neurológica',
    ],
    management: [
      'Suspender CRI imediatamente se hipoglicemia',
      'Administrar glicose IV conforme protocolo',
      'Suplementar potássio se hipocalemia',
      'Monitorar glicemia seriada até estabilizar',
    ],
    special_events: [
      {
        event: 'Hipoglicemia durante CRI',
        management:
          'Suspender CRI, administrar glicose IV (0,5–1 g/kg em bolus), monitorar glicemia seriada, reiniciar CRI com dose reduzida quando glicemia > 200 mg/dL.',
      },
    ],
  },
  alerts_by_comorbidity: [
    {
      key: 'insulin_hypokalemia',
      level: 'CRITICAL',
      title: 'Hipocalemia: risco crítico durante correção glicêmica',
      why:
        'Insulina desloca potássio (K+) para o intracelular → hipocalemia é comum e perigosa durante correção de CAD. Pode causar arritmias cardíacas, fraqueza muscular e morte.',
      action: [
        'Dosar potássio sérico a cada 2–4 h durante correção inicial',
        'Suplementar K+ IV conforme protocolo se K+ < 3.5 mEq/L',
        'NÃO suspender insulina por hipocalemia — suplementar K+ enquanto continua CRI',
        'Monitorar ECG continuamente se hipocalemia severa',
      ],
      dose_adjustment: {
        require_monitoring: ['Potássio sérico (a cada 2–4 h)', 'ECG', 'Glicemia seriada'],
      },
    },
    {
      key: 'insulin_hypoglycemia',
      level: 'CRITICAL',
      title: 'Hipoglicemia: suspender CRI imediatamente',
      why:
        'Risco de hipoglicemia severa durante CRI de insulina. Pode causar convulsões, coma e morte. Gatos são mais sensíveis.',
      action: [
        'Suspender CRI de insulina IMEDIATAMENTE se glicemia < 80 mg/dL',
        'Administrar glicose IV (0.5–1 g/kg em bolus 50% ou D5W)',
        'Monitorar glicemia seriada (a cada 15–30 min inicialmente)',
        'Reiniciar CRI apenas quando glicemia > 200 mg/dL, com dose reduzida',
      ],
      dose_adjustment: {
        avoid_bolus: false,
        require_monitoring: ['Glicemia seriada (a cada 15–30 min se hipoglicemia)', 'Estado neurológico'],
        suggest_alternative: 'Suspender CRI até glicemia > 200 mg/dL, então reiniciar com dose 25–50% menor.',
      },
    },
    {
      key: 'insulin_ckd',
      level: 'MONITOR',
      title: 'Doença renal crônica (IRC)',
      why:
        'Menor depuração de glicose e eletrólitos em IRC → resposta à insulina pode ser alterada. Risco aumentado de hipoglicemia ou hiperglicemia persistente.',
      action: [
        'Ajustar titulação com cautela (começar com doses menores)',
        'Monitorar glicemia mais frequentemente (a cada 1–2 h)',
        'Monitorar função renal (uréia, creatinina) e eletrólitos seriado',
        'Ajustar fluidoterapia conforme função renal',
      ],
      dose_adjustment: {
        reduce_percent: 25,
        require_monitoring: ['Glicemia seriada', 'Função renal', 'Potássio sérico'],
      },
    },
    {
      key: 'insulin_hepatic_disease',
      level: 'WARNING',
      title: 'Hepatopatia',
      why:
        'Fígado é importante para metabolismo de insulina e gliconeogênese. Hepatopatia pode alterar resposta à insulina e causar hipoglicemia.',
      action: [
        'Começar com doses menores (reduzir 25–50%)',
        'Monitorar glicemia seriada rigorosamente',
        'Monitorar função hepática (enzimas, coagulação)',
        'Ajustar titulação com cautela',
      ],
      dose_adjustment: {
        reduce_percent: 30,
        require_monitoring: ['Glicemia seriada', 'Função hepática'],
      },
    },
    {
      key: 'insulin_sepsis',
      level: 'WARNING',
      title: 'Sepse/infecção',
      why:
        'Sepse causa resistência à insulina (citocinas, estresse) → pode precisar doses maiores de insulina. Também aumenta risco de complicações metabólicas.',
      action: [
        'Tratar infecção agressivamente (antibióticos, suporte)',
        'Pode precisar doses maiores de insulina (titular conforme resposta)',
        'Monitorar glicemia seriada e eletrólitos rigorosamente',
        'Avaliar resposta ao tratamento da infecção',
      ],
      dose_adjustment: {
        require_monitoring: ['Glicemia seriada', 'Eletrólitos', 'Sinais vitais', 'Marcadores de infecção'],
      },
    },
    {
      key: 'insulin_obesity',
      level: 'MONITOR',
      title: 'Obesidade',
      why:
        'Obesidade causa resistência à insulina periférica → pode precisar doses maiores. Mas risco de hipoglicemia ainda existe.',
      action: [
        'Usar peso ideal ou ajustado para cálculos (não peso total)',
        'Pode precisar doses maiores (titular conforme resposta glicêmica)',
        'Monitorar glicemia seriada',
        'Considerar fatores de comorbidade (hipertensão, IRC, etc)',
      ],
      dose_adjustment: {
        require_monitoring: ['Glicemia seriada', 'Peso ideal vs peso atual'],
      },
    },
  ],
  presets: [
    {
      id: 'cad_dog_standard',
      label: 'CAD – Cão (CRI padrão) 🟥',
      dose_mgkgh: 0.1,
      limits: { min: 0.05, max: 0.1 },
      clinical_target: 'Redução gradual da glicemia (50–75 mg/dL/h)',
      linked_alerts: ['insulin_hypokalemia'],
    },
    {
      id: 'cad_cat_low',
      label: 'CAD – Gato (CRI baixa) 🟧',
      dose_mgkgh: 0.05,
      limits: { min: 0.025, max: 0.05 },
      clinical_target: 'Controle glicêmico seguro',
      linked_alerts: ['insulin_hypokalemia'],
    },
  ],
  calculation_templates: {
    cri: {
      required_inputs: ['weight_kg', 'dose_ukgh', 'drug_concentration_u_ml'],
      algorithm: [
        '1) Dose total (U/h) = dose (U/kg/h) × peso (kg)',
        '2) Volume/hora (mL/h) = U/h ÷ concentração (U/mL)',
        '3) Monitorar glicemia seriada e titular conforme resposta',
      ],
      conversions: ['1 U = 0,01 mL (frasco 100 U/mL)'],
      hard_safety_checks: [
        {
          if: 'dose_ukgh > 0.2',
          then: 'BLOCK',
          message: 'Dose acima do máximo recomendado (0,2 U/kg/h) para CAD em cães.',
        },
        {
          if: 'drug_concentration_u_ml >= 100',
          then: 'BLOCK',
          message: 'NUNCA administrar insulina IV sem diluir. Frasco 100 U/mL deve ser diluído antes do uso.',
        },
      ],
      soft_safety_checks: [
        {
          if: "patient_species == 'cat' && dose_ukgh > 0.1",
          then: 'WARN',
          message: 'Dose alta para gatos; risco elevado de hipoglicemia. Reavaliar necessidade.',
        },
      ],
      outputs: ['cri_u_per_hour', 'cri_ml_per_hour'],
      error_cost: 'Erro de dose ou diluição pode causar hipoglicemia severa ou falha terapêutica.',
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_ukg', 'drug_concentration_u_ml'],
      algorithm: [
        '1) Dose total (U) = dose (U/kg) × peso (kg)',
        '2) Volume (mL) = U ÷ concentração (U/mL)',
        '3) Administrar IM (não usar IV em bolus)',
      ],
      hard_safety_checks: [
        {
          if: 'route == "IV"',
          then: 'BLOCK',
          message: 'Bolus IV de insulina regular não é seguro. Use CRI IV ou bolus IM.',
        },
      ],
      soft_safety_checks: [
        {
          if: "patient_species == 'cat' && dose_ukg > 0.1",
          then: 'WARN',
          message: 'Dose alta para gatos em bolus; risco elevado de hipoglicemia.',
        },
      ],
      outputs: ['bolus_u', 'bolus_volume_ml'],
      error_cost: 'Erro de dose pode causar hipoglicemia severa ou convulsões.',
    },
    dilution_builder: {
      required_inputs: ['stock_concentration_u_ml', 'desired_concentration_u_ml', 'final_volume_ml'],
      algorithm: [
        '1) U totais desejados = desired_concentration_u_ml × final_volume_ml',
        '2) Volume do estoque (mL) = U_totais ÷ stock_concentration_u_ml',
        '3) Volume de diluente = final_volume_ml − volume_estoque',
        '4) Rotular: concentração final (U/mL), data/hora, profissional',
      ],
      hard_safety_checks: [
        {
          if: 'desired_concentration_u_ml > stock_concentration_u_ml',
          then: 'BLOCK',
          message: 'Concentração desejada não pode exceder a do frasco.',
        },
        {
          if: 'desired_concentration_u_ml >= 100 && route == "IV"',
          then: 'BLOCK',
          message: 'NUNCA usar insulina 100 U/mL por via IV sem diluir.',
        },
      ],
      soft_safety_checks: [],
      outputs: ['stock_volume_ml', 'diluent_volume_ml', 'final_concentration_u_ml'],
      error_cost: 'Diluição errada altera dose entregue e pode causar hipoglicemia ou falha terapêutica.',
    },
  },
  how_we_got_here_block: {
    title: 'Como chegamos a este resultado (Insulina Regular – CRI IV)',
    render_steps: [
      { step: 1, label: 'Calcular U/hora', formula: 'U/h = dose (U/kg/h) × peso (kg)' },
      { step: 2, label: 'Calcular mL/hora', formula: 'mL/h = U/h ÷ concentração (U/mL) após diluição' },
      {
        step: 3,
        label: 'Configurar CRI',
        formula:
          'Programar bomba para mL/h calculado. Monitorar glicemia seriada (a cada 1–2 h) e titular.',
      },
    ],
    interpretation_rules: [
      'Meta: reduzir glicemia gradualmente (50–75 mg/dL/h) — não muito rápido.',
      'Reavaliar glicemia a cada 1–2 h e ajustar taxa conforme necessário.',
      'Se glicemia cair muito rápido (> 100 mg/dL/h) ou hipoglicemia aparecer, suspender CRI e tratar.',
      'Monitorar potássio seriado (hipocalemia é comum durante correção).',
    ],
    example: {
      scenario: 'Cão 10 kg, insulina 0,1 U/kg/h CRI, diluição 1 U/mL (100 mL de NaCl 0,9% com 1 mL de insulina 100 U/mL)',
      calculation: ['U/h = 0,1 × 10 = 1 U/h', 'mL/h = 1 ÷ 1 = 1,0 mL/h'],
      result: 'Programar bomba para 1,0 mL/h. Monitorar glicemia seriada e ajustar conforme resposta.',
    },
  },
  protocol_integrations: {
    enabled: true,
    protocols: ['Cetoacidose diabética (CAD)', 'Estado hiperosmolar hiperglicêmico', 'Controle glicêmico em UTI'],
    why_combo_exists:
      'Insulina regular é o tratamento padrão para emergências hiperglicêmicas e permite titulação fina em CRI.',
    rules: [
      {
        if: "patient_has('hypokalemia')",
        then: {
          action: 'WARN',
          message: 'Hipocalemia: suplementar potássio seriado durante correção glicêmica.',
        },
      },
      {
        if: 'blood_glucose < 80',
        then: {
          action: 'BLOCK',
          message: 'Hipoglicemia detectada: suspender CRI imediatamente e tratar.',
        },
      },
    ],
  },
  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'diabetic_ketoacidosis_insulin',
        title: 'Cetoacidose diabética: uso de insulina regular',
        mermaid:
          'flowchart TD\nA[Diagnóstico de CAD confirmado] --> B[Iniciar fluidoterapia + suplementação de K+ se necessário]\nB --> C[Preparar insulina diluída: 1 U/mL (cão) ou 0,5 U/mL (gato)]\nC --> D[Iniciar CRI: 0,05–0,1 U/kg/h (cão) ou 0,025–0,05 U/kg/h (gato)]\nD --> E[Monitorar glicemia a cada 1–2 h]\nE --> F{Glicemia caindo adequadamente? (50–75 mg/dL/h)}\nF -- Sim --> G[Continuar CRI e ajustar conforme resposta]\nF -- Não (muito lento) --> H[Aumentar dose ±0,02–0,05 U/kg/h]\nF -- Não (muito rápido) --> I[Reduzir dose ou suspender temporariamente]\nF -- Hipoglicemia --> J[Suspender CRI imediatamente + glicose IV]\nH --> E\nI --> E\nJ --> K[Monitorar até glicemia > 200 mg/dL, então reiniciar com dose reduzida]',
      },
    ],
  },
  ui_copy: {
    critical_warning_banner:
      'Insulina regular SEMPRE exige monitorização seriada de glicemia. NUNCA administrar IV sem diluir.',
    alert_messages: {
      short: 'Hipoglicemia e hipocalemia são riscos críticos.',
      long: 'Insulina regular é a única insulina segura para uso IV, mas exige diluição obrigatória (frasco 100 U/mL deve ser diluído) e monitorização seriada de glicemia e potássio. Hipoglicemia e hipocalemia são complicações comuns durante correção de CAD.',
    },
    block_message: 'Uso bloqueado: hipoglicemia detectada ou diluição inadequada.',
    common_errors: [
      'Administrar IV sem diluir (frasco 100 U/mL)',
      'Não monitorar glicemia seriada',
      'Reduzir glicemia muito rápido (> 100 mg/dL/h)',
      'Não suplementar potássio durante correção',
    ],
  },
  references: [
    {
      section: 'doses',
      source: 'BSAVA Manual of Canine and Feline Endocrinology',
      edition: '3rd',
      year: 2015,
    },
    {
      section: 'emergency_use',
      source: 'Textbook of Small Animal Emergency Medicine',
      year: 2019,
    },
    {
      section: 'physiology',
      source: "Cunningham's Textbook of Veterinary Physiology",
      edition: '6th',
      year: 2020,
    },
    {
      section: 'fluid_interaction',
      source: 'Fluid, Electrolyte and Acid-Base Disorders in Small Animal Practice',
      year: 2012,
    },
  ],
}
