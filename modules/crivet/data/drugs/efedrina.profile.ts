import type { DrugProfile } from '../../types/drugProfile'

export const efedrinaProfile: DrugProfile = {
  drug_id: 'efedrina',
  name_pt: 'Efedrina (cloridrato de efedrina)',
  name_en: 'Ephedrine (ephedrine hydrochloride)',
  synonyms: [
    'Ephedrine HCl',
    'Efedrina',
    'Pseudoefedrina (não é a mesma apresentação terapêutica; isômero relacionado)',
    'Formulações humanas de descongestionante (não usar como referência de dose/anestesia)',
  ],
  class: [
    'Simpaticomimético misto (ação direta + indireta)',
    'Agonista adrenérgico α/β (α1, α2, β1, β2)',
    'Vasopressor/inotrópico de bolus (hipotensão intra-anestésica)',
  ],
  core_concepts: {
    taglines: [
      'Aumenta PA e DC via efeito α/β + liberação endógena de noradrenalina.',
      'Útil para hipotensão durante anestesia quando se quer efeito com bolus (dispensa CRI em muitos casos).',
      'Taquifilaxia é esperada com doses repetidas (depleção de estoques de NE).',
      'Pode estimular SNC e precipitar taquicardia/arrítmias em predispostos.',
    ],
    mechanism: {
      receptors_targets: [
        'Agonismo α1, α2, β1, β2 (ação direta)',
        'Liberação de noradrenalina endógena (ação indireta)',
        'Inibição do metabolismo de noradrenalina por MAO (efeito descrito)',
      ],
      primary_effects: {
        cardiovascular:
          '↑ PA (principal) e ↑ DC; pode ↑ FC e ↑ contratilidade; risco de taquicardia/arrítmias; resposta cai com doses repetidas (taquifilaxia).',
        respiratory:
          'Efeito broncodilatador via β2 é possível, mas o uso clínico aqui é como vasopressor na anestesia; monitorar consumo de O2/taquicardia.',
        cns: 'Estimulação de SNC pode ocorrer (agitação/tremor em alguns pacientes).',
        renal_hepatic:
          'Sem alvo terapêutico principal; efeito hemodinâmico pode alterar perfusão renal secundariamente conforme PA/DC.',
        gi: 'Sem efeito terapêutico principal; pode reduzir motilidade por simpaticomimese.',
      },
      clinical_metaphor:
        '"Chamar reforços": além de apertar os receptores α/β, a efedrina "puxa" noradrenalina do estoque. Funciona bem no começo, mas se você ficar chamando toda hora, o estoque acaba e ela para de responder (taquifilaxia).',
    },
    pharmacodynamics: {
      onset_iv: '≈ 1–2 min (efeito pressor clínico rápido após bolus IV)',
      onset_im: 'Uso não padrão para hipotensão intra-anestésica (preferir IV).',
      peak: '≈ 2–5 min (após bolus IV, titulado ao efeito)',
      duration: '≈ 10–15 min (efeito clínico típico após bolus)',
      dependencies: [
        'Estoques endógenos de noradrenalina (taquifilaxia com doses repetidas)',
        'Plano anestésico e causa base da hipotensão (profundidade/vasodilatação/hipovolemia)',
        'Predisposição a taquiarritmias/hipertensão',
      ],
    },
    pharmacokinetics: {
      metabolism:
        'Não catecolamina sintética; metabolismo não é o principal limitante do uso agudo em bolus (efeito clínico guiado por mecanismo simpaticomimético e duração curta).',
      excretion:
        'Excreção renal em parte (especialmente em humanos; em pequenos animais, considerar que eliminação pode ser influenciada por pH urinário, mas isso raramente guia uso perioperatório).',
      dog_vs_cat:
        'Atividade documentada em cães e gatos; magnitude pode variar entre espécies e entre isômeros. Na prática anestésica, dose de bolus é semelhante para cão/gato em tabelas de fármacos perioperatórios.',
      active_metabolites:
        'Não destacado como clinicamente relevante para uso anestésico em bolus.',
      accumulation:
        'Não é problema típico em uso de bolus; a limitação principal é taquifilaxia por depleção de NE com repetição.',
    },
  },
  species_notes: {
    dogs: {
      key_point:
        'Boa opção de resgate para hipotensão em anestesia quando se quer resposta com bolus; se falhar após repetição, suspeitar taquifilaxia e trocar para vasopressor direto/CRI.',
      high_risk_notes: [
        'Taquiarritmias/miocardiopatia: pode piorar FC e demanda miocárdica',
        'Hipertensão grave: risco de overshoot pressórico se bolus alto',
        'Hipovolemia não corrigida: resposta pode ser incompleta; primeiro corrigir causa (profundidade/volemia)',
      ],
      metabolism_excretion:
        'Uso clínico guiado por efeito simpaticomimético e curta duração; taquifilaxia é limitação maior que PK.',
    },
    cats: {
      key_point:
        'Pode elevar PA/DC com bolus; cautela em cardiomiopatias (ex.: HCM) e taquiarritmias.',
      high_risk_notes: [
        'HCM/obstrução dinâmica: ↑ FC/contratilidade pode piorar gradiente e perfusão',
        'Hipertensão: risco de aumento excessivo de PA',
        'Resposta reduzida após repetição (taquifilaxia)',
      ],
      metabolism_excretion:
        'Sem particularidade prática além de variação individual; titular ao efeito com monitorização rigorosa.',
    },
  },
  indications: {
    primary: [
      'Tratamento de hipotensão durante anestesia (bolus IV)',
      'Resgate hemodinâmico quando se deseja efeito mais duradouro do que vasopressores ultracurtos e sem preparar CRI imediatamente',
    ],
    secondary: [
      'Poupador de anestésico indireto: corrigindo hipotensão, permite ajustar plano anestésico com segurança',
      'Alternativa quando bradicardia não é a causa principal e deseja-se ↑ PA/DC',
    ],
  },
  contraindications: {
    absolute: [
      {
        condition: 'Taquiarritmia grave não controlada (ex.: SVT/VT ativa) com instabilidade',
        why: 'Simpaticomimético pode piorar arritmia e aumentar demanda miocárdica.',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Cardiomiopatia hipertrófica (gatos), especialmente com obstrução dinâmica',
        why: '↑ FC/contratilidade e simpaticomimese podem piorar obstrução e isquemia.',
        level: 'WARNING',
      },
      {
        condition: 'Hipertensão grave pré-existente',
        why: 'Risco de overshoot pressórico e complicações (hemorragia/lesão de órgão-alvo).',
        level: 'CRITICAL',
      },
      {
        condition: 'Hipovolemia/choque hemorrágico não corrigido',
        why: 'Vasopressor sem volume pode piorar perfusão tecidual; tratar causa base primeiro (reduzir anestésico + fluidos/hemocomponentes).',
        level: 'WARNING',
      },
    ],
  },
  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      bolus: {
        mgkg: {
          min: 0.1,
          max: 0.2,
          note: 'Bolus IV para hipotensão intra-anestésica. Se 2ª dose for pouco efetiva, suspeitar taquifilaxia (depleção de NE) e trocar estratégia.',
        },
        mcgkg: { min: 0, max: 0, note: 'Não aplicável para bolus padrão.' },
        ukg: { min: 0, max: 0, note: 'Não aplicável.' },
        route: 'IV',
        loading_dose: { min: 0.1, max: 0.2 },
      },
      cri: {
        mcgkgmin: {
          min: 0,
          max: 0,
          note: 'CRI não é o uso típico da efedrina em anestesia; preferir bolus. Se necessidade persistente, migrar para vasopressor/inotrópico em CRI (ex.: norepinefrina/dobutamina/epinefrina conforme cenário).',
        },
        mgkgh: { min: 0, max: 0, note: 'N/A' },
        titration: { increment: 'N/A', interval: 'N/A' },
        max: 0,
      },
      adjustments: {
        obesity:
          'Usar peso magro/ajustado como ponto de partida e titular ao efeito pressórico (evitar overshoot).',
        shock:
          'Se choque com catecolaminas depletadas, resposta pode ser menor; considerar vasopressor direto (ex.: norepinefrina) e correção de causa (volemia/hemorragia).',
        hypoalbuminemia: 'Sem ajuste específico; titular ao efeito hemodinâmico.',
        comorbidities:
          'Arritmias/cardiomiopatia: reduzir dose e monitorar ECG; hipertensão: evitar ou usar mínimo efetivo; HCM felina: preferir alternativa.',
      },
      therapeutic_targets: {
        target_map:
          'Meta clínica: restaurar PAM adequada (ex.: ≥ 60–70 mmHg em rotina; maior em neurocrítico conforme CPP).',
        target_etco2:
          'Manter normocapnia (EtCO2 ~35–45) — evitar que hipoventilação/anestésico profundo seja a causa da hipotensão.',
        analgesia_scale: 'N/A (não é analgésico).',
        sedation_target: 'N/A (não é sedativo).',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 0.1,
          max: 0.2,
          note: 'Bolus IV para hipotensão intra-anestésica. Titular ao efeito e evitar repetição frequente (taquifilaxia).',
        },
        mcgkg: { min: 0, max: 0, note: 'Não aplicável.' },
        ukg: { min: 0, max: 0, note: 'Não aplicável.' },
        route: 'IV',
        loading_dose: { min: 0.1, max: 0.2 },
      },
      cri: {
        mcgkgmin: {
          min: 0,
          max: 0,
          note: 'CRI não é uso típico. Se hipotensão persistente, preferir vasopressor direto/CRI apropriada.',
        },
        mgkgh: { min: 0, max: 0, note: 'N/A' },
        titration: { increment: 'N/A', interval: 'N/A' },
        max: 0,
      },
      adjustments: {
        obesity: 'Peso magro/ajustado e titulação ao efeito.',
        shock: 'Pode falhar por depleção de NE; preferir vasopressor direto e corrigir volemia.',
        hypoalbuminemia: 'Sem ajuste específico; titular ao efeito.',
        comorbidities: 'HCM: evitar ou usar mínimo; taquiarritmias: evitar; hipertensão: evitar.',
      },
      therapeutic_targets: {
        target_map: 'Restaurar PAM adequada sem taquicardia/arrítmia.',
        target_etco2: 'Normocapnia (EtCO2 ~35–45).',
        analgesia_scale: 'N/A.',
        sedation_target: 'N/A.',
      },
    },
  },
  presentations: [
    {
      concentration_mg_ml: 50,
      volume_ml: 1,
      total_mg: 50,
      label: '50 mg/mL — solução injetável (uso humano; frequentemente utilizada em anestesia veterinária)',
      examples: ['Ephedrine HCl 50 mg/mL (genéricos humanos)'],
      concentration_trap_warning:
        'ALTO RISCO de erro de dose (mL pequenos = mg altos). Considerar diluir para 1–5 mg/mL para titulação segura.',
    },
    {
      concentration_mg_ml: 30,
      volume_ml: 1,
      total_mg: 30,
      label: '30 mg/mL — solução injetável',
      examples: ['Ephedrine HCl 30 mg/mL (genéricos humanos)'],
      concentration_trap_warning:
        'Confirmar concentração antes de calcular (30 vs 50 mg/mL muda muito o volume).',
    },
  ],
  dilution_and_preparation: {
    hard_rules: [
      'Evitar redoses repetidas em curto intervalo: taquifilaxia é esperada (depleção de noradrenalina).',
      'Sempre tratar primeiro causas comuns de hipotensão: reduzir anestésico inalatório/propofol, otimizar ventilação e corrigir volemia.',
      'Se a 2ª dose for pouco efetiva, migrar para vasopressor/inotrópico direto (ex.: norepinefrina/dobutamina) em vez de insistir.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 1,
        use_cases: [
          'Titulação fina em gatos/pequenos',
          'Reduzir erro por volume muito pequeno (frasco 50 mg/mL)',
        ],
        how_to_make:
          'Diluir efedrina concentrada em NaCl 0,9% para facilitar bolus em mL maiores e mais seguros.',
        recipe: '1 mL (50 mg/mL) + 49 mL NaCl 0,9% = 50 mL a 1 mg/mL',
      },
      {
        target_mg_ml: 5,
        use_cases: [
          'Bolus mais prático em cães médios/grandes',
          'Reduzir risco de erro mantendo volumes moderados',
        ],
        how_to_make: 'Diluição intermediária para uso em centro cirúrgico com titulação mais rápida.',
        recipe: '1 mL (50 mg/mL) + 9 mL NaCl 0,9% = 10 mL a 5 mg/mL',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5%'],
    preferred_diluent: {
      diluent: 'NaCl 0,9%',
      why: 'Diluente padrão e previsível para preparo em seringa e flushing.',
    },
    stability: [
      {
        diluent: 'NaCl 0,9% (seringa)',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change:
          'Preferir preparo diário/asséptico e rotulagem rigorosa (concentração final).',
      },
    ],
    dedicated_line_required: false,
    dedicated_line_why:
      'Pode ser administrada em bolus por via existente; ainda assim, fazer flushing e evitar mistura no mesmo corpo de seringa com outros fármacos.',
  },
  compatibility: {
    compatible_in_syringe_or_bag: ['Administração IV em linha com cristaloide correndo (com flushing)'],
    compatible_y_site_only: [
      'Preferir Y-site e flushing entre drogas quando a via é compartilhada (regra de segurança, dados específicos variam por concentração).',
    ],
    incompatible: [
      {
        agent: 'Misturas com outros fármacos no mesmo corpo de seringa sem referência explícita',
        why: 'Ausência de tabela de compatibilidade específica no acervo atual para combinações; risco depende de concentração/pH.',
        risk: 'precipitação',
      },
    ],
    avoid_same_syringe_or_precipitation_risk: [
      'Evitar misturar na mesma seringa com outros fármacos; preferir administração separada com flush.',
    ],
    dedicated_line_rules: [
      'Se via compartilhada: administrar, fazer flush com cristaloide e reavaliar efeito antes de outras drogas.',
    ],
  },
  administration_and_titration: {
    bolus_guidance: [
      'Bolus IV lento, titulado ao efeito pressórico.',
      'Reavaliar PA/FC/ECG em 1–3 min após bolus; duração típica ~10–15 min.',
      'Evitar sequência de múltiplos bolus: se resposta cai, suspeitar taquifilaxia e trocar estratégia.',
    ],
    titration_rules: [
      'Antes de vasopressor: checar profundidade anestésica, ventilação, volume intravascular e dor/estímulo.',
      'Se hipotensão persistente: escolher vasopressor conforme fenótipo (bradicardia vs normo/taqui; vasodilatação vs baixo débito).',
    ],
    monitoring_minimum: [
      'PA (ideal invasiva)',
      'FC/ritmo (ECG)',
      'SpO2',
      'EtCO2',
      'temperatura',
      'profundidade anestésica',
    ],
    endpoints: {
      desired_effect: [
        'PAM atinge meta clínica',
        'Sem taquiarritmia clinicamente relevante',
        'Perfusão melhora (pulsos, TRC, lactato/EtCO2 conforme contexto)',
      ],
      toxicity_signs: [
        'Taquicardia excessiva',
        'Arritmias (SVT/VT, ectopias frequentes)',
        'Hipertensão (overshoot) e sangramento em cirurgias de risco',
      ],
    },
    therapeutic_failure: {
      check_first: [
        'Profundidade anestésica excessiva (reduzir inalatório/propofol)',
        'Hipovolemia/hemorragia (corrigir volume/hemocomponentes)',
        'Hipercapnia por hipoventilação (ventilar; hipercapnia piora vasodilatação)',
        'Bradicardia como causa primária (considerar anticolinérgico conforme caso)',
      ],
      common_causes: [
        'Taquifilaxia após doses repetidas',
        'Catecolaminas endógenas depletadas (choque prolongado/doença grave)',
        'Causa base não corrigida (vasodilatação anestésica/hipovolemia)',
      ],
      when_to_change: [
        'Se 2ª dose já foi pouco efetiva: migrar para vasopressor direto (norepinefrina/phenylefrina) ou inotrópico (dobutamina) conforme fenótipo.',
        'Se surgirem taquiarritmias/hipertensão: suspender e escolher alternativa.',
      ],
    },
  },
  adverse_effects_and_toxicity: {
    common: [
      'Taquicardia',
      'Aumento de PA (pode haver overshoot)',
      'Ectopias/arrítmias em predispostos',
      'Estimulação de SNC (agitação/tremor)',
    ],
    serious: [
      'Taquiarritmia sustentada/instabilidade hemodinâmica',
      'Hipertensão severa iatrogênica',
      'Isquemia miocárdica em cardiopatas (por ↑ demanda de O2)',
    ],
    subdose_signs: ['PA não atinge meta após 1–3 min', 'Efeito muito curto sem sustentação (principalmente se causa base não tratada)'],
    overdose_signs: ['Taquicardia marcada', 'Hipertensão significativa', 'Arritmias'],
    management: [
      'Interromper novas doses e tratar causa base da hipotensão (profundidade/volemia/ventilação).',
      'Se taquiarritmia: suporte, reduzir estímulo simpático; considerar antiarrítmico conforme cenário e fonte institucional.',
      'Se hipertensão iatrogênica: suspender, reduzir anestésico/estímulos, reavaliar; tratar conforme gravidade.',
    ],
    special_events: [
      {
        event: 'Taquifilaxia (2ª dose ineficaz)',
        management: 'Parar de insistir e migrar para vasopressor direto/CRI apropriada.',
      },
    ],
  },
  alerts_by_comorbidity: [
    {
      key: 'ephedrine_hcm_feline',
      level: 'WARNING',
      title: 'HCM felina: pode piorar taquicardia/obstrução dinâmica',
      why: 'Simpaticomimético pode ↑ FC/contratilidade e aumentar demanda de O2, piorando obstrução/ischemia.',
      action: [
        'Evitar se possível; preferir vasopressor direto com menor cronotropismo conforme fenótipo (avaliar caso).',
        'Se usar: dose mínima efetiva + monitorização ECG/PA invasiva.',
      ],
      dose_adjustment: {
        reduce_percent: 25,
        avoid_bolus: false,
        require_monitoring: ['ECG', 'PA (preferir invasiva)', 'EtCO2', 'SpO2'],
        suggest_alternative:
          'Norepinefrina titulada (se vasodilatação) ou abordagem guiada por ecocardiografia/hemodinâmica.',
      },
    },
    {
      key: 'ephedrine_tachyarrhythmia',
      level: 'BLOCK',
      title: 'Taquiarritmia ativa: evitar efedrina',
      why: 'Pode agravar arritmia e precipitar instabilidade.',
      action: [
        'Não usar efedrina.',
        'Tratar arritmia/corrigir causa da hipotensão (profundidade/volemia).',
        'Escolher vasopressor/inotrópico alternativo conforme fenótipo.',
      ],
      dose_adjustment: {
        avoid_bolus: true,
        suggest_alternative:
          'Fenilefrina/norepinefrina (dependendo do caso) ou suporte inotrópico se baixo débito.',
      },
    },
    {
      key: 'ephedrine_severe_hypertension',
      level: 'CRITICAL',
      title: 'Hipertensão grave: alto risco de overshoot pressórico',
      why: 'Efedrina eleva PA; pode piorar lesão de órgão-alvo.',
      action: [
        'Evitar ou usar dose mínima com PA invasiva.',
        'Tratar causa base da hipotensão (profundidade/volemia) antes.',
      ],
      dose_adjustment: { reduce_percent: 30, avoid_bolus: false, require_monitoring: ['PA invasiva', 'ECG'] },
    },
    {
      key: 'ephedrine_shock_depleted_catecholamines',
      level: 'MONITOR',
      title: 'Choque prolongado/catecolaminas baixas: pode responder pouco',
      why: 'Parte do efeito depende de liberação de NE endógena; depleção → menor resposta e taquifilaxia precoce.',
      action: [
        'Se pouca resposta, migrar cedo para vasopressor direto (norepinefrina) e corrigir volemia.',
        'Evitar múltiplos bolus repetidos.',
      ],
      dose_adjustment: {
        avoid_bolus: false,
        require_monitoring: ['PA', 'ECG', 'EtCO2'],
        suggest_alternative: 'Norepinefrina titulada + correção de causa.',
      },
    },
  ],
  presets: [
    {
      id: 'hypotension_rescue_standard',
      label: 'Hipotensão intra-anestésica (bolus) 🟨',
      dose_mgkg: 0.1,
      limits: { min: 0.1, max: 0.2 },
      clinical_target: 'Elevar PAM/DC por 10–15 min para ganhar tempo e corrigir causa base',
      linked_alerts: ['ephedrine_tachyarrhythmia', 'ephedrine_severe_hypertension', 'ephedrine_hcm_feline'],
    },
    {
      id: 'hypotension_rescue_stronger',
      label: 'Hipotensão intra-anestésica (bolus alto) 🟧',
      dose_mgkg: 0.2,
      limits: { min: 0.1, max: 0.2 },
      clinical_target: 'Resposta pressórica quando 0,1 mg/kg é insuficiente (titrar e monitorar)',
      linked_alerts: ['ephedrine_tachyarrhythmia', 'ephedrine_severe_hypertension'],
    },
  ],
  calculation_templates: {
    cri: {
      required_inputs: ['weight_kg', 'dose_mcgkgmin', 'drug_concentration_mg_ml'],
      algorithm: [
        'Efedrina não é padronizada para CRI no uso anestésico de rotina.',
        'Se usuário tentar CRI, orientar a migrar para vasopressor direto em CRI (ex.: norepinefrina/dobutamina) conforme cenário.',
      ],
      conversions: [],
      hard_safety_checks: [
        {
          if: 'dose_mcgkgmin > 0',
          then: 'BLOCK',
          message: 'CRI de efedrina não é recomendada/padronizada no CRIVET. Use bolus ou selecione vasopressor em CRI.',
        },
      ],
      soft_safety_checks: [],
      outputs: ['message_only'],
      error_cost: 'CRI não padronizada pode atrasar tratamento apropriado e aumentar risco de erro.',
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg', 'drug_concentration_mg_ml'],
      algorithm: [
        '1) Dose total (mg) = dose_mgkg × peso_kg',
        '2) Volume (mL) = mg ÷ concentração_mg_ml',
        '3) Administrar IV lento e reavaliar PA/ECG em 1–3 min',
      ],
      hard_safety_checks: [
        {
          if: 'dose_mgkg > 0.2',
          then: 'BLOCK',
          message: 'Dose acima do teto (0,2 mg/kg) para bolus de efedrina no CRIVET.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'drug_concentration_mg_ml >= 30',
          then: 'WARN',
          message:
            'Concentração alta (30–50 mg/mL): risco de erro por volumes muito pequenos. Considere diluir para 1–5 mg/mL.',
        },
        {
          if: "patient_has('tachyarrhythmia')",
          then: 'WARN',
          message: 'Risco de piora de arritmia — considere alternativa.',
        },
      ],
      outputs: ['bolus_mg', 'bolus_volume_ml'],
      error_cost: 'Erro de mL em soluções concentradas pode causar hipertensão/arrítmia.',
    },
    dilution_builder: {
      required_inputs: ['stock_concentration_mg_ml', 'desired_concentration_mg_ml', 'final_volume_ml'],
      algorithm: [
        '1) mg totais desejados = desired_concentration_mg_ml × final_volume_ml',
        '2) Volume do estoque (mL) = mg_totais ÷ stock_concentration_mg_ml',
        '3) Volume de diluente = final_volume_ml − volume_estoque',
        '4) Rotular: concentração final, data/hora, profissional',
      ],
      hard_safety_checks: [
        {
          if: 'desired_concentration_mg_ml > stock_concentration_mg_ml',
          then: 'BLOCK',
          message: 'Concentração desejada não pode exceder a do frasco.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'desired_concentration_mg_ml < 0.5',
          then: 'WARN',
          message: 'Diluição muito baixa pode gerar volumes grandes e aumentar chance de erro; confirme se faz sentido.',
        },
      ],
      outputs: ['stock_volume_ml', 'diluent_volume_ml', 'final_concentration_mg_ml'],
      error_cost: 'Diluição errada altera dose entregue e segurança hemodinâmica.',
    },
  },
  how_we_got_here_block: {
    title: 'Como chegamos a este resultado (Efedrina – bolus IV)',
    render_steps: [
      { step: 1, label: 'Calcular mg', formula: 'mg = dose (mg/kg) × peso (kg)' },
      { step: 2, label: 'Calcular mL', formula: 'mL = mg ÷ concentração (mg/mL)' },
      {
        step: 3,
        label: 'Interpretar resposta',
        formula: 'Reavaliar PA/ECG em 1–3 min; duração típica 10–15 min; repetir pode falhar por taquifilaxia.',
      },
    ],
    interpretation_rules: [
      'Se a resposta for fraca e a causa base não foi corrigida (profundidade/volemia/ventilação), corrija antes de redosar.',
      'Se 2ª dose for ineficaz, trate como taquifilaxia e migre para vasopressor direto/CRI.',
      'Se aparecer taquiarritmia/hipertensão, pare e reavalie estratégia.',
    ],
    example: {
      scenario: 'Cão 10 kg, efedrina 0,1 mg/kg IV, frasco 50 mg/mL',
      calculation: [
        'mg = 0,1 × 10 = 1 mg',
        'mL = 1 ÷ 50 = 0,02 mL → preferir diluir (ex.: 1 mg/mL) para administrar 1,0 mL',
      ],
      result: 'Sem diluição: 0,02 mL (alto risco). Com diluição 1 mg/mL: 1,0 mL.',
    },
  },
  protocol_integrations: {
    enabled: true,
    protocols: ['Hipotensão intra-anestésica', 'Anestesia inalatória (vasodilatação)', 'Resgate sem CRI pronta'],
    why_combo_exists:
      'Efedrina pode restaurar PA/DC com bolus e ganhar tempo para corrigir a causa base; se persistente, protocolos recomendam migração para drogas em CRI e/ou ajustes de plano anestésico/volume.',
    rules: [
      {
        if: "hypotension_persists_after('ephedrine_bolus')",
        then: {
          action: 'PREFER_ALTERNATIVE',
          message:
            'Hipotensão persistente ou taquifilaxia: migrar para vasopressor direto/CRI (ex.: norepinefrina) e corrigir causa base (profundidade/volemia).',
        },
      },
      {
        if: "patient_has('tachyarrhythmia')",
        then: {
          action: 'REMOVE_DRUG',
          drug_id: 'efedrina',
          message: 'Taquiarritmia ativa: evitar efedrina; usar alternativa.',
        },
      },
    ],
  },
  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'intraop_hypotension_ephedrine',
        title: 'Hipotensão intraoperatória: quando usar efedrina',
        mermaid:
          'flowchart TD\nA[Detectou hipotensão: confirmar PAM e tendência] --> B[Checar profundidade anestésica e reduzir inalatório/propofol se possível]\nB --> C[Checar ventilação: evitar hipercapnia (EtCO2 alto)]\nC --> D[Checar volemia/hemorragia: bolus de cristaloide/hemocomponente conforme necessidade]\nD --> E{Bradicardia é causa principal?}\nE -- Sim --> F[Considerar anticolinérgico conforme caso]\nE -- Não --> G{Normo/taqui + vasodilatação provável?}\nG -- Sim --> H[Efedrina 0,1 mg/kg IV lento]\nH --> I[Reavaliar PA/ECG em 1–3 min]\nI --> J{Resposta adequada?}\nJ -- Sim --> K[Monitorar: efeito 10–15 min; corrigir causa base]\nJ -- Não --> L{Já repetiu e falhou?}\nL -- Sim --> M[Taquifilaxia/estoque baixo: migrar para vasopressor direto/CRI (ex.: norepinefrina) e/ou inotrópico conforme fenótipo]\nL -- Não --> N[Considerar 0,2 mg/kg IV com cautela + monitorização]\nN --> I',
      },
    ],
  },
  ui_copy: {
    critical_warning_banner:
      'Efedrina pode perder efeito com doses repetidas (taquifilaxia) e precipitar taquiarritmia — titule e monitore PA/ECG.',
    alert_messages: {
      short: 'Taquifilaxia e arritmias: cuidado com repetição.',
      long: 'Efedrina é simpaticomimético misto (α/β + liberação de NE). Funciona bem em bolus para hipotensão, mas pode falhar com repetição por depleção de NE (taquifilaxia). Pode causar taquicardia/arrítmias e overshoot hipertensivo; monitorize PA/ECG e trate causa base da hipotensão.',
    },
    block_message: 'Uso bloqueado: taquiarritmia ativa/instável — escolha alternativa.',
    common_errors: [
      'Tentar corrigir hipotensão sem reduzir profundidade anestésica/sem corrigir volemia',
      'Repetir bolus várias vezes apesar de taquifilaxia',
      'Erro de dose por concentração alta (30–50 mg/mL) e volumes minúsculos',
      'Ignorar taquiarritmia/hipertensão após administração',
    ],
  },
  references: [
    {
      section: 'mechanism/pharmacodynamics/indications/tachyphylaxis/formulations',
      source: 'Veterinary Anesthesia and Analgesia (Lumb and Jones), 6th ed. — seção "Mixed α- and β-adrenergic receptor agonists: Ephedrine"',
      page: 'PDF p.344 (aprox.)',
      edition: '6th',
      year: 2022,
    },
    {
      section: 'dose/duration/key effects',
      source: 'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd ed. — Chapter 21 (Anaesthesia/sedation/analgesia of the critical patient): tabela de simpatomiméticos (Ephedrine 0.1–0.2 mg/kg bolus; duração ~15 min; 2ª dose ineficaz; CNS stimulation)',
      page: 'Ch21 p.343 (PDF p.352)',
      edition: '3rd',
      year: 2018,
    },
  ],
}
