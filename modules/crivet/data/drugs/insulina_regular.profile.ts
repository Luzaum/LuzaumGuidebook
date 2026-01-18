import type { DrugProfile } from '../../types/drugProfile'

export const insulina_regularProfile: DrugProfile = {
  drug_id: 'insulina_regular',
  name_pt: 'Insulina Regular (Cristalina / Humana)',
  name_en: 'Regular insulin (human regular insulin)',
  synonyms: ['Insulina cristalina', 'Insulina humana regular', 'Humulin R', 'Novolin R'],
  class: ['Hormônio hipoglicemiante', 'Insulina de ação curta', 'Insulina de escolha para uso IV em emergências'],
  core_concepts: {
    taglines: [
      'Insulina de escolha para CAD/HHS: titulação fina e reversível',
      'Única insulina rotineiramente usada por via intravenosa em pequenos animais',
      'Corrige cetogênese e hiperglicemia, mas pode piorar hipocalemia/hipofosfatemia',
    ],
    mechanism: {
      receptors_targets: ['Receptor de insulina (tirosina-quinase)'],
      primary_effects: {
        cardiovascular:
          'Indireto: melhora perfusão ao reduzir diurese osmótica e hiperosmolalidade; pode precipitar arritmias se induzir hipocalemia',
        respiratory: 'Sem efeito direto; melhora respiração acidótica ao reverter cetogênese',
        cns: 'Reduz neurotoxicidade da hiperosmolalidade/hiperglicemia; queda rápida de glicose/osmolalidade aumenta risco de edema cerebral (meta: queda gradual)',
        renal_hepatic: 'Diminui glicosúria/diurese osmótica; depuração/catabolismo hepato-renal',
        gi: 'Sem pró-cinética; melhora náusea secundária à cetose ao reverter produção de corpos cetônicos',
      },
      clinical_metaphor: 'A "chave" que abre a porta da glicose; em CAD o objetivo principal é "apagar o incêndio" da cetogênese, não "zerar" a glicemia.',
    },
    pharmacodynamics: {
      onset_iv: '≈ 5–10 min',
      onset_im: '≈ 30–60 min (variável)',
      peak: '≈ 1–3 h',
      duration: '≈ 4–6 h (IV/IM)',
      dependencies: [
        'Perfusão tecidual (hidratação/choque)',
        'Potássio, fósforo e magnésio séricos',
        'Hiperosmolalidade (sensibilidade à insulina aumenta após fluidoterapia)',
      ],
    },
    pharmacokinetics: {
      metabolism: 'Captação e catabolismo principalmente hepático e renal',
      excretion: 'Metabolização celular (não excreção renal direta como fármaco ativo)',
      dog_vs_cat:
        'Em gatos, protocolos "mais conservadores" (dose/bolus e ajuste) são usados com maior frequência por risco de hipoglicemia; alguns protocolos usam menor carga de insulina no preparo da bolsa (1,1 U/kg).',
      active_metabolites: 'Não aplicável',
      accumulation:
        'Não é o problema clínico; o risco é hipoglicemia e distúrbios eletrolíticos por excesso relativo.',
    },
  },
  species_notes: {
    dogs: {
      key_point: 'CAD: CRI baixa e contínua é padrão; alvo é reverter cetogênese e reduzir glicose de forma gradual.',
      high_risk_notes: [
        'Insulina piora hipocalemia e hipofosfatemia — corrigir/monitorar',
        'Evitar queda de glicose rápida (meta ~50–75 mg/dL/h)',
      ],
      metabolism_excretion: 'Catabolismo hepato-renal',
    },
    cats: {
      key_point: 'CAD/DK: CRI baixa (muitas vezes com dose efetiva menor via sliding-scale).',
      high_risk_notes: [
        'Hipoglicemia pode ser silenciosa — monitorização mais frequente',
        'Cautela com bolus/IM: resposta variável',
      ],
      metabolism_excretion: 'Catabolismo hepato-renal',
    },
  },
  indications: {
    primary: [
      'Cetoacidose diabética (CAD) / cetose diabética com doença sistêmica',
      'Síndrome hiperglicêmica hiperosmolar (HHS)',
      'Hiperglicemia grave em paciente crítico quando indicada titulação IV',
    ],
    secondary: [
      'Hipercalemia (emergência eletrolítica) — com dextrose',
      'Crise Addisoniana com hipercalemia (como parte do protocolo)',
    ],
  },
  contraindications: {
    absolute: [
      {
        condition: 'Hipoglicemia documentada ou suspeita',
        why: 'Risco de convulsão, coma e morte',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'K+ sérico < 3,5 mEq/L (ou hipocalemia importante)',
        why: 'Insulina promove shift intracelular de K+ e pode precipitar arritmias; idealmente adiar até correção',
        level: 'CRITICAL',
      },
      {
        condition: 'Choque/hipotensão não ressuscitados',
        why: 'Insulina sem reanimação pode piorar hipovolemia por shift de glicose/água para intracelular',
        level: 'WARNING',
      },
    ],
  },
  doses: {
    unit_standard_cri: 'U/kg/h',
    dog: {
      bolus: {
        mgkg: { min: 0, max: 0, note: 'N/A (insulina em Unidades)' },
        mcgkg: { min: 0, max: 0, note: 'N/A' },
        ukg: {
          min: 0.2,
          max: 0.25,
          note: 'ALTERNATIVA se não há bomba: 0,2–0,25 U/kg IM inicial, depois 0,1 U/kg IM q2–4h (ajustar ±25%). Evitar SC no início se desidratado/hipotenso.',
        },
        route: 'IM',
        loading_dose: { min: 0.2, max: 0.25 },
      },
      cri: {
        mcgkgmin: { min: 0, max: 0, note: 'N/A (insulina em Unidades)' },
        mgkgh: {
          min: 0.025,
          max: 0.1,
          note: 'CAD/HHS: preferir CRI IV baixa. Alvo de queda glicêmica ~50–70 mg/dL/h (não normalizar rápido).',
        },
        titration: {
          increment:
            'Ajustar por sliding-scale (±25–50%) conforme queda/hora e sinais de hipoglicemia',
          interval: 'Glicemia q1–2h no início; eletrólitos (K/P/Mg) q4–6h',
        },
        max: 0.2,
      },
      adjustments: {
        obesity: 'Calcular por peso magro/ideal para evitar superdosagem.',
        shock: 'Iniciar insulina somente após ressuscitação volêmica adequada.',
        hypoalbuminemia: 'Sem ajuste específico; foco em monitorização e suporte.',
        comorbidities:
          'Pancreatite/sepse aumentam resistência à insulina; preferir CRI titulada e metas de queda gradual.',
      },
      therapeutic_targets: {
        target_map: 'Alvo de queda glicêmica: ~50–75 mg/dL/h; objetivo primário é reversão da cetogênese.',
        target_etco2: '',
        analgesia_scale: '',
        sedation_target: '',
      },
    },
    cat: {
      bolus: {
        mgkg: { min: 0, max: 0, note: 'N/A (insulina em Unidades)' },
        mcgkg: { min: 0, max: 0, note: 'N/A' },
        ukg: {
          min: 0.1,
          max: 0.1,
          note: 'ALTERNATIVA (menos preferida): 0,1 U/kg IM inicial, depois 0,05 U/kg IM q2–4h (ajustar ±25%).',
        },
        route: 'IM',
        loading_dose: { min: 0.1, max: 0.1 },
      },
      cri: {
        mcgkgmin: { min: 0, max: 0, note: 'N/A (insulina em Unidades)' },
        mgkgh: {
          min: 0.0125,
          max: 0.05,
          note: 'CAD/HHS: usar CRI IV mais conservadora; gatos tendem a receber menos insulina efetiva quando se usa sliding-scale.',
        },
        titration: {
          increment:
            'Ajustar por sliding-scale, reduzir 25–50% se queda rápida; monitorar mais frequentemente',
          interval: 'Glicemia q1–2h no início; eletrólitos (K/P/Mg) q4–6h',
        },
        max: 0.1,
      },
      adjustments: {
        obesity: 'Usar peso ideal/BCS para evitar superdosagem.',
        shock: 'Aguardar estabilização hemodinâmica antes de iniciar.',
        hypoalbuminemia: 'Sem ajuste direto; priorizar monitorização.',
        comorbidities:
          'Maior risco de hipoglicemia; preferir abordagem conservadora e ajustes mais frequentes.',
      },
      therapeutic_targets: {
        target_map: 'Meta de queda glicêmica ~50–70 mg/dL/h; HHS: ainda mais lenta (doses ~50% menores).',
        target_etco2: '',
        analgesia_scale: '',
        sedation_target: '',
      },
    },
  },
  presentations: [
    {
      concentration_mg_ml: 100,
      volume_ml: 10,
      total_mg: 1000,
      label: 'Insulina Regular U-100 (100 U/mL) — frasco-ampola',
      examples: ['Humulin R', 'Novolin R'],
      concentration_trap_warning:
        'CONFERIR U-100 (100 U/mL). Erro de seringa (U-40 vs U-100) é causa comum de dose 2,5×. ⛔ RISCO FATAL: nunca administrar 100 U/mL por via IV sem diluir.',
    },
  ],
  dilution_and_preparation: {
    hard_rules: [
      'Em CAD/HHS, evitar SC no início (absorção imprevisível em desidratação/hipotensão).',
      'Preferir NaCl 0,9% como diluente do preparo de insulina (seringa/bolsa).',
      'Primar/descartar ~50 mL iniciais quando usar bolsa/linha para reduzir subdosagem por adsorção ao plástico.',
      'Quando BG < 250 mg/dL, adicionar dextrose aos fluidos (não "parar" insulina; manter para resolver cetose).',
    ],
    recommended_targets: [
      {
        target_mg_ml: 1,
        use_cases: ['CRI em seringa (bomba) — cães e gatos'],
        how_to_make: 'Facilita cálculo e reduz erro de mL/h; recomendada para bombas de seringa.',
        recipe: '1 mL de U-100 (100 U) + 99 mL de NaCl 0,9% = 1 U/mL',
      },
      {
        target_mg_ml: 0.5,
        use_cases: ['CRI em seringa — gatos pequenos (mais segurança)'],
        how_to_make: 'Concentração menor reduz impacto de pequenos erros na taxa (mL/h).',
        recipe: '0,5 mL de U-100 (50 U) + 99,5 mL de NaCl 0,9% = 0,5 U/mL',
      },
      {
        target_mg_ml: 0.0088,
        use_cases: [
          'CAD — protocolo "bolsa 250 mL" (cães): 2,2 U/kg em 250 mL, taxa inicial 10 mL/h',
        ],
        how_to_make:
          'Adicionar 2,2 U/kg (dose total por peso) em 250 mL NaCl 0,9%; prime 50 mL e iniciar 10 mL/h, ajustando por glicemia horária.',
        recipe: 'Bolsa 250 mL: (2,2 U/kg) + NaCl 0,9% → iniciar 10 mL/h; ajustar por sliding-scale',
      },
      {
        target_mg_ml: 0.0044,
        use_cases: [
          'CAD — protocolo "bolsa 250 mL" (gatos): 1,1 U/kg em 250 mL, taxa inicial 10 mL/h',
        ],
        how_to_make:
          'Adicionar 1,1 U/kg em 250 mL NaCl 0,9%; prime 50 mL; iniciar 10 mL/h; ajustar por glicemia.',
        recipe: 'Bolsa 250 mL: (1,1 U/kg) + NaCl 0,9% → iniciar 10 mL/h; ajustar por sliding-scale',
      },
    ],
    diluents_allowed: ['NaCl 0,9%'],
    preferred_diluent: {
      diluent: 'NaCl 0,9%',
      why: 'Protocolos clássicos de CAD/HHS recomendam preparo da insulina regular em NaCl 0,9%.',
    },
    stability: [
      {
        diluent: 'NaCl 0,9%',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Trocar solução/linha em até 24h (ou conforme POP institucional).',
      },
    ],
    dedicated_line_required: true,
    dedicated_line_why:
      'Evita variação de entrega por co-infusão/flush e reduz risco de erros e incompatibilidades.',
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
        agent: 'Glicosado 5% como DILUENTE da insulina',
        why: 'D5W deve ser usado para SUPORTE (quando BG cai), não como diluente do preparo da insulina; aumenta risco de erro e confusão operacional.',
        risk: 'erro de preparo',
      },
      {
        agent: 'Misturar insulina com outros fármacos na mesma seringa/bolsa',
        why: 'Dados de compatibilidade variáveis e alto risco de erro; preferir linha dedicada.',
        risk: 'inativação',
      },
    ],
    avoid_same_syringe_or_precipitation_risk: [
      'Não co-misturar com outros fármacos (usar linha dedicada).',
      'Evitar preparar a insulina em D5W; preparar em NaCl 0,9% e adicionar dextrose ao fluido do paciente quando indicado.',
    ],
    dedicated_line_rules: [
      'Linha dedicada sempre que possível.',
      'Se Y-site for inevitável, minimizar flush e documentar qualquer alteração de taxa.',
    ],
  },
  administration_and_titration: {
    bolus_guidance: [
      'Hipercalemia: insulina IV em bolus, seguida de dextrose (ver doses por condição).',
      'Em CAD/HHS, evitar bolus IV de insulina (preferir CRI ou IM intermitente).',
    ],
    titration_rules: [
      'CAD: medir glicemia q1–2h no início e ajustar para queda ~50–75 mg/dL/h.',
      'Se queda for rápida, reduzir insulina 25–50% (ou reduzir taxa/pausar conforme protocolo).',
      'Iniciar dextrose no fluido quando BG < 250 mg/dL para continuar insulina e resolver cetose.',
      'Adiar insulina se K+ < 3,5 mEq/L até suplementar adequadamente.',
    ],
    monitoring_minimum: [
      'Glicemia (q1–2h inicialmente)',
      'K+, fósforo e magnésio seriados',
      'ECG se hipocalemia/hipercalemia ou arritmias',
      'Pressão arterial e perfusão',
      'Diurese',
    ],
    endpoints: {
      desired_effect: [
        'Queda gradual de glicose (~50–75 mg/dL/h)',
        'Resolução de cetonemia/cetonúria (tendência) e melhora clínica',
        'Estabilização eletrolítica sem hipoglicemia',
      ],
      toxicity_signs: [
        'Hipoglicemia (tremores, fraqueza, alteração mental, convulsão)',
        'Hipocalemia (fraqueza, ileus, arritmias)',
        'Hipofosfatemia (hemólise, fraqueza, disfunção miocárdica)',
      ],
    },
    therapeutic_failure: {
      check_first: [
        'Perfusão ainda inadequada? (insulina "não pega" sem fluidoterapia)',
        'Resistência à insulina por doença concorrente (pancreatite/infecção/diestrus/corticosteroides)',
        'Erro de preparo (U-100 vs seringa errada; adsorção/prime não feito)',
      ],
      common_causes: [
        'Dose excessiva com necessidade de reduzir por queda rápida',
        'Dose insuficiente por resistência marcada',
        'Interrupções/flushs alterando entrega efetiva',
      ],
      when_to_change: [
        'Se não atinge queda alvo após ajustes e perfusão adequada, considerar protocolo alternativo/consulta intensivista.',
        'Em gatos, considerar protocolos alternativos (p.ex., glargina em CAD) quando apropriado e institucionalmente aceito.',
      ],
    },
  },
  adverse_effects_and_toxicity: {
    common: ['Hipoglicemia iatrogênica', 'Hipocalemia por shift', 'Hipofosfatemia por shift'],
    serious: [
      'Convulsões/coma por hipoglicemia',
      'Arritmias por distúrbios eletrolíticos',
      'Potencial contribuição para edema cerebral se queda de glicose/osmolalidade for muito rápida',
    ],
    subdose_signs: [
      'Glicemia não reduz conforme meta após ressuscitação',
      'Persistência de cetonemia/cetose e acidose',
    ],
    overdose_signs: [
      'Queda de glicose > 75–100 mg/dL/h',
      'Glicemia < 80–100 mg/dL (ou sinais clínicos) durante tratamento',
      'Sinais neurológicos compatíveis',
    ],
    management: [
      'Se hipoglicemia: reduzir/pausar insulina e iniciar dextrose (bolus + CRI conforme protocolo).',
      'Se hipocalemia/hipofosfatemia: suplementar e reavaliar; pode ser necessário reduzir insulina temporariamente.',
      'Manter objetivo primário (resolver cetose) com glicose no fluido quando BG < 250 mg/dL.',
    ],
    special_events: [
      {
        event: 'Erro de seringa U-40 vs U-100',
        management:
          'Bloquear no app se "seringa U-40" selecionada para U-100 sem confirmação; exibir alerta CRITICAL.',
      },
      {
        event: 'Adsorção ao plástico (subdosagem inicial)',
        management: 'Primar linha/descartar ~50 mL iniciais e usar linha dedicada.',
      },
    ],
  },
  alerts_by_comorbidity: [
    {
      key: 'insulina_regular_hypokalemia',
      level: 'CRITICAL',
      title: 'Hipocalemia (K+ < 3,5 mEq/L)',
      why: 'Insulina desloca K+ para o intracelular e pode precipitar arritmias; recomenda-se adiar insulina até correção.',
      action: [
        'Suplementar K+ antes de iniciar insulina',
        'ECG/monitorização contínua se K+ muito baixo',
        'Reavaliar K+ seriado',
      ],
      dose_adjustment: {
        reduce_percent: 50,
        avoid_bolus: true,
        require_monitoring: ['K+ seriado', 'ECG', 'glicemia q1h'],
      },
    },
    {
      key: 'insulina_regular_hhs',
      level: 'WARNING',
      title: 'HHS (síndrome hiperosmolar)',
      why: 'Risco de queda rápida de glicose/osmolalidade → edema cerebral; insulina pode ser postergada até hidratação e usada em dose ~50% menor.',
      action: [
        'Priorizar fluidoterapia antes de insulina',
        'Usar dose reduzida e metas de queda lenta',
        'Monitorar neurologicamente',
      ],
      dose_adjustment: {
        reduce_percent: 50,
        require_monitoring: ['glicemia q1–2h', 'Na+/osmolalidade calculada', 'status neurológico'],
      },
    },
    {
      key: 'insulina_regular_hyperkalemia',
      level: 'CRITICAL',
      title: 'Hipercalemia com alterações de ECG/bradicardia',
      why: 'Insulina + dextrose reduz K+ rapidamente por shift; exige monitorização de glicose.',
      action: [
        'Administrar cálcio (cardioproteção) conforme protocolo se indicado',
        'Administrar insulina IV + dextrose',
        'Monitorar glicemia seriada e ECG',
      ],
      dose_adjustment: {
        avoid_bolus: false,
        require_monitoring: ['glicemia seriada', 'ECG', 'K+ seriado'],
      },
    },
    {
      key: 'insulina_regular_ckd',
      level: 'MONITOR',
      title: 'DRC/azotemia',
      why: 'Maior risco de distúrbios eletrolíticos e variação de resposta; monitorização intensiva é mandatória.',
      action: [
        'Monitorar K/P/Mg e glicemia com maior frequência',
        'Ajustar dose por resposta (sliding-scale)',
      ],
    },
    {
      key: 'insulina_regular_hcm_feline',
      level: 'MONITOR',
      title: 'HCM (gato)',
      why: 'Insulina em si não é cardiodepressora, mas correções rápidas e distúrbios eletrolíticos podem precipitar arritmias.',
      action: [
        'Evitar queda rápida',
        'ECG se eletrólitos alterados',
        'Suporte hemodinâmico cuidadoso',
      ],
    },
  ],
  presets: [
    {
      id: 'cad_dog_bag_250',
      label: 'CAD — Cão (bolsa 250 mL) 🟥',
      dose_mgkgh: 2.2,
      limits: { min: 5, max: 20 },
      clinical_target: 'Queda glicêmica ~50–75 mg/dL/h + reversão de cetogênese',
      linked_alerts: ['insulina_regular_hypokalemia', 'insulina_regular_hhs'],
    },
    {
      id: 'cad_cat_bag_250',
      label: 'CAD — Gato (bolsa 250 mL) 🟧',
      dose_mgkgh: 1.1,
      limits: { min: 5, max: 15 },
      clinical_target: 'Queda glicêmica segura + reversão de cetose',
      linked_alerts: ['insulina_regular_hypokalemia', 'insulina_regular_hhs', 'insulina_regular_hcm_feline'],
    },
    {
      id: 'hhs_low_dose_cri',
      label: 'HHS — Dose reduzida (CRI) 🟨',
      dose_mgkgh: 0.025,
      limits: { min: 0.01, max: 0.05 },
      clinical_target: 'Queda mais lenta; evitar edema cerebral',
      linked_alerts: ['insulina_regular_hhs'],
    },
    {
      id: 'hyperkalemia_iv_bolus',
      label: 'Hipercalemia — Insulina + Dextrose 🟥',
      dose_mgkg: 0.2,
      limits: { min: 0.2, max: 0.5 },
      clinical_target: 'Redução rápida de K+ (shift) com segurança glicêmica',
      linked_alerts: ['insulina_regular_hyperkalemia'],
    },
  ],
  calculation_templates: {
    cri: {
      required_inputs: [
        'weight_kg',
        'target_u_kg_h',
        'final_volume_ml',
        'stock_u_ml',
        'pump_ml_h',
        'species',
        'protocol_mode',
      ],
      algorithm: [
        '1) Dose por hora (U/h) = target_u_kg_h × weight_kg',
        '2) Concentração necessária (U/mL) = (U/h) ÷ pump_ml_h',
        '3) Total de unidades na seringa/bolsa = concentração (U/mL) × final_volume_ml',
        '4) Volume a aspirar do frasco (mL) = total_unidades ÷ stock_u_ml',
        '5) Completar com diluente até final_volume_ml',
      ],
      conversions: [
        'U-100 = 100 U/mL',
        'Se usar "bolsa 250 mL" (CAD): total_unidades = (dose_u_total_per_kg_for_bag × weight_kg)',
      ],
      hard_safety_checks: [
        {
          if: "unit_selected in ['mcg/kg/h','mcg/kg/hr','mcg/kg/min','mg/kg/h']",
          then: 'BLOCK',
          message: 'INSULINA usa UNIDADES (U). Selecione U/kg/h.',
        },
        {
          if: "diluent == 'Glicosado 5%'",
          then: 'WARN',
          message:
            'Evite preparar insulina em D5W. Prepare em NaCl 0,9% e adicione dextrose ao fluido do paciente quando BG < 250 mg/dL.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'k_meq_l < 3.5',
          then: 'WARN',
          message: 'K+ < 3,5 mEq/L: idealmente adiar insulina e suplementar potássio antes.',
        },
        {
          if: 'expected_glucose_drop_mgdl_h > 75',
          then: 'WARN',
          message: 'Queda de glicose muito rápida aumenta risco neurológico; reduzir insulina 25–50%.',
        },
        {
          if: "protocol_mode == 'HHS'",
          then: 'INFO',
          message: 'HHS: considerar dose ~50% menor e, em alguns casos, postergar insulina até hidratação.',
        },
      ],
      outputs: ['total_units', 'drug_volume_ml', 'diluent_volume_ml', 'final_concentration_u_ml', 'pump_ml_h'],
      error_cost: 'Hipoglicemia/arrítmias por distúrbios eletrolíticos e queda rápida de osmolalidade.',
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_u_kg', 'stock_u_ml'],
      algorithm: [
        '1) Dose total (U) = dose_u_kg × weight_kg',
        '2) Volume (mL) = Dose total (U) ÷ stock_u_ml',
      ],
      hard_safety_checks: [
        {
          if: 'dose_u_kg > 0.5',
          then: 'WARN',
          message: 'Bolus > 0,5 U/kg é alto — confirmar indicação (ex.: hipercalemia) e fornecer dextrose.',
        },
      ],
      soft_safety_checks: [
        {
          if: "indication == 'hyperkalemia'",
          then: 'INFO',
          message: 'Hipercalemia: administrar dextrose junto e monitorar glicemia seriada.',
        },
      ],
      outputs: ['dose_total_u', 'volume_ml'],
      error_cost: 'Hipoglicemia grave se dextrose/monitorização inadequadas.',
    },
    dilution_builder: {
      required_inputs: ['target_u_ml', 'final_volume_ml', 'stock_u_ml'],
      algorithm: [
        '1) Total de unidades desejadas = target_u_ml × final_volume_ml',
        '2) Volume de insulina (mL) = total_unidades ÷ stock_u_ml',
        '3) Volume de diluente (mL) = final_volume_ml − volume_insulina',
      ],
      hard_safety_checks: [
        {
          if: 'target_u_ml > 2',
          then: 'WARN',
          message: 'Concentração alta aumenta risco de erro em mL/h; preferir 0,5–1 U/mL para CRI.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'final_volume_ml < 20',
          then: 'INFO',
          message: 'Volumes muito pequenos exigem seringa/bomba mais precisa; considerar diluição adicional.',
        },
      ],
      outputs: ['total_units', 'drug_volume_ml', 'diluent_volume_ml'],
      error_cost: 'Erros de preparo são causa comum de hipoglicemia/ineficácia.',
    },
  },
  how_we_got_here_block: {
    title: 'Como chegamos a este resultado (Insulina Regular)',
    render_steps: [
      {
        step: 1,
        label: 'Converter dose para Unidades por hora',
        formula: 'U/h = (U/kg/h) × peso(kg)',
      },
      {
        step: 2,
        label: 'Achar a concentração necessária para a taxa da bomba',
        formula: 'U/mL = (U/h) ÷ taxa(mL/h)',
      },
      {
        step: 3,
        label: 'Calcular total de Unidades no volume final',
        formula: 'U totais = (U/mL) × volume_final(mL)',
      },
      {
        step: 4,
        label: 'Converter Unidades em mL do frasco U-100',
        formula: 'mL do frasco = (U totais) ÷ 100',
      },
    ],
    interpretation_rules: [
      'Meta clínica em CAD/HHS é queda gradual (~50–75 mg/dL/h), não normoglicemia imediata.',
      'Adicionar dextrose quando BG < 250 mg/dL para manter insulina e resolver cetose.',
      'Se K+ < 3,5 mEq/L, idealmente corrigir antes de iniciar insulina.',
    ],
    example: {
      scenario: 'Cão 10 kg, CAD, alvo efetivo 0,05 U/kg/h, bomba 2 mL/h, seringa 50 mL, U-100',
      calculation: [
        'U/h = 0,05 × 10 = 0,5 U/h',
        'U/mL = 0,5 ÷ 2 = 0,25 U/mL',
        'U totais = 0,25 × 50 = 12,5 U',
        'mL frasco = 12,5 ÷ 100 = 0,125 mL',
        'Completar com 49,875 mL de NaCl 0,9%',
      ],
      result: 'Preparar 50 mL a 0,25 U/mL; infundir 2 mL/h para entregar 0,05 U/kg/h.',
    },
  },
  protocol_integrations: {
    enabled: true,
    protocols: ['CAD', 'HHS', 'hipercalemia', 'Addison_crisis'],
    why_combo_exists:
      'Em CAD/HHS, insulina é pilar para reverter cetogênese e controlar hiperglicemia; em hipercalemia, promove shift intracelular de K+.',
    rules: [
      {
        if: "protocol == 'CAD' && route == 'SC' && patient_dehydrated_or_hypotensive == true",
        then: {
          action: 'PREFER_ALTERNATIVE',
          message: 'Evitar SC no início em CAD (absorção imprevisível). Preferir CRI IV ou IM intermitente.',
        },
      },
      {
        if: 'k_meq_l < 3.5',
        then: {
          action: 'REDUCE_DOSE',
          factor: 0.5,
          message: 'Hipocalemia: idealmente adiar; se não possível, reduzir e suplementar com monitorização intensiva.',
        },
      },
      {
        if: "protocol == 'HHS'",
        then: {
          action: 'REDUCE_DOSE',
          factor: 0.5,
          message: 'HHS: usar ~50% da dose de CAD e considerar postergar até hidratação adequada.',
        },
      },
    ],
  },
  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'dka_regular_insulin_path',
        title: 'CAD — decisão de via e titulação (Insulina Regular)',
        mermaid:
          'flowchart TD\nA[Suspeita/diagnóstico de CAD] --> B[Iniciar fluidoterapia + correção eletrolítica]\nB --> C{K+ < 3,5 mEq/L?}\nC -- Sim --> C1[Suplementar K+ e adiar insulina]\nC1 --> D\nC -- Não --> D{Perfusão adequada?}\nD -- Não --> D1[Reanimação volêmica antes da insulina]\nD1 --> D\nD -- Sim --> E{Bomba/linha disponível?}\nE -- Sim --> F[CRI IV de insulina regular (preferido)]\nE -- Não --> G[IM intermitente (alternativa)]\nF --> H[Meta: queda 50–75 mg/dL/h]\nG --> H\nH --> I{BG < 250 mg/dL?}\nI -- Sim --> J[Adicionar dextrose ao fluido e manter insulina p/ resolver cetose]\nI -- Não --> K[Seguir ajustes por sliding-scale]\nJ --> L[Monitorar K/P/Mg + status clínico]\nK --> L\nL --> M[Transição para insulina de longa ação quando hidratado, comendo e cetose resolvendo]',
      },
      {
        id: 'hyperkalemia_insulin_path',
        title: 'Hipercalemia — Insulina + Dextrose (resumo seguro)',
        mermaid:
          'flowchart TD\nA[Hipercalemia significativa/ECG alterado] --> B[Cardioproteção com cálcio se indicado]\nB --> C[Insulina regular IV 0,2–0,5 U/kg]\nC --> D[Dextrose IV conforme protocolo]\nD --> E[Monitorar glicemia seriada + ECG]\nE --> F[Reavaliar K+ e repetir medidas conforme resposta]',
      },
    ],
  },
  ui_copy: {
    critical_warning_banner:
      'CAD/HHS: mantenha queda de glicose CONTROLADA e continue insulina após entrar com dextrose para resolver cetose.',
    alert_messages: {
      short: 'Monitorar glicemia e eletrólitos (K/P/Mg) seriados',
      long: 'Insulina regular é essencial em CAD/HHS e hipercalemia, mas pode causar hipoglicemia e piorar hipocalemia/hipofosfatemia. Ajuste por sliding-scale e mantenha queda glicêmica controlada.',
    },
    block_message: 'Insulina regular bloqueada: hipoglicemia ou contraindicação crítica sem correção.',
    common_errors: [
      'Unidade errada (mcg/kg/h em vez de U/kg/h) — BLOQUEAR',
      'Preparar insulina em D5W (confusão operacional)',
      'Não primar a linha/bolsa (adsorção → subdose inicial)',
      'Queda glicêmica rápida por ajuste agressivo',
      'Erro de seringa U-40 vs U-100',
    ],
  },
  references: [
    {
      section: 'cad_hhs_protocols_and_dilution',
      source: 'Textbook of Small Animal Emergency Medicine (Wiley Blackwell) — Complicated Diabetes Mellitus',
      page: 'p. 764 (Table 113.2)',
      year: 2019,
    },
    {
      section: 'cad_im_and_low_dose_iv_bag_protocol',
      source: 'Nelson & Couto — Disorders of the Endocrine Pancreas — Diabetic Ketoacidosis — Insulin Therapy',
      page: 'p. 872',
      edition: '6ª',
      year: 2020,
    },
    {
      section: 'electrolyte_safety_k_delay_and_sliding_scale',
      source:
        'Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice — Fluid Therapy in Endocrine and Metabolic Disorders (Table 20-1)',
      page: 'p. 508',
      year: 2012,
    },
    {
      section: 'hyperkalemia_bolus_dose',
      source: 'Lumb & Jones — Veterinary Anesthesia and Analgesia — Hyperkalemia management (Table 42.1)',
      page: 'p. 912',
      edition: '6ª',
      year: 2024,
    },
    {
      section: 'evidence_dka_dogs_low_dose_iv',
      source: 'Macintire DK. Treatment of diabetic ketoacidosis in dogs by continuous low-dose intravenous infusion of insulin. J Am Vet Med Assoc.',
      year: 1993,
      internal_link: 'PubMed: 8496083',
    },
    {
      section: 'evidence_cats_infusion_dose_comparison',
      source: 'Claus MA, Silverstein DC, Shofer FS, Mellema MS. Comparison of regular insulin infusion doses in critically ill diabetic cats. J Vet Emerg Crit Care.',
      year: 2010,
      internal_link: 'PubMed: 20955302',
    },
    {
      section: 'guidelines_general_diabetes_context',
      source: 'AAHA Diabetes Management Guidelines for Dogs and Cats (update PDF)',
      year: 2022,
      internal_link: 'AAHA guideline PDF',
    },
  ],
}
