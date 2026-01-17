import type { DrugProfile } from '../../types/drugProfile'

export const propofolProfile: DrugProfile = {
  // Seção 1: Identidade
  drug_id: 'propofol',
  name_pt: 'Propofol',
  name_en: 'Propofol',
  synonyms: ['2,6-diisopropilfenol', 'PropoFlo 28', 'Propoflo 28', 'Rapinovet'],
  class: ['Hipnótico intravenoso (anestésico injetável)', 'Modulador positivo do receptor GABA-A', 'Agente de indução e manutenção (TIVA/CRI)'],

  // Seção 2: Perfil Farmacológico
  core_concepts: {
    taglines: [
      'Hipnose rápida e recuperação geralmente limpa por redistribuição + metabolismo extenso.',
      'Depressão cardiovascular e respiratória é dose- e velocidade-dependente (titrar lentamente).',
      'Analgesia mínima/ausente → quase sempre precisa de opioide/analgésico associado.',
      'Emulsão lipídica sem conservante: alto risco de contaminação se manuseio ruim.',
    ],
    mechanism: {
      receptors_targets: ['GABA-A (principal)', 'NMDA (modulação/inibição de canal – contribuição secundária)'],
      primary_effects: {
        cardiovascular:
          'Vasodilatação + ↓ contratilidade miocárdica → ↓ PAM; ↓ barorreflexo; pode potencializar arritmogenicidade da adrenalina (epinefrina).',
        respiratory: '↓ volume corrente, ↓ FR e ↓ resposta ventilatória ao CO2; apneia é comum se bolus rápido (dependente de dose/velocidade).',
        cns: 'Hipnose; efeito neuroprotetor: ↓ EEG/CMRO2/CBF e ↓ PIC (útil quando ventilação controlada e perfusão mantida).',
        renal_hepatic:
          'Metabolismo predominantemente hepático (com contribuição extra-hepática); em cães não reduz TFG; em gatos meia-vida plasmática tende a ser maior (especialmente em infusões prolongadas).',
        gi: 'Em humanos tem efeito antiemético; em pequenos animais a utilidade é menos estabelecida. Veículo lipídico pode ser indesejável em pancreatite.',
      },
      clinical_metaphor:
        '"Interruptor de luz": liga o cérebro em segundos (hipnose), mas pode "apagar o ventilador e a pressão" se você apertar rápido demais — por isso o segredo é titrar devagar até o efeito.',
    },
    pharmacodynamics: {
      onset_iv: '≈ 20–30 s (IV)',
      onset_im: 'Não recomendado/uso não padrão (formulação e volumes limitam IM)',
      peak: '≈ 1 min (IV, próximo ao final da titulação)',
      duration: 'Inconsciência ≈ 2–8 min após bolus; efeito clínico típico ≈ 10–15 min (pode chegar a ~20 min em gatos).',
      dependencies: [
        'Velocidade de administração (bolus rápido → apneia/hipotensão mais prováveis)',
        'Estado hemodinâmico (baixo débito → "lag" maior e dose menor necessária)',
        'Premedicação e depressão SNC prévia (reduz dose necessária)',
        'Espécie (gato tende a maior meia-vida, sobretudo após infusões)',
      ],
    },
    pharmacokinetics: {
      metabolism:
        'Extenso metabolismo hepático para metabólitos inativos hidrossolúveis (sulfato/glucuronídeo) + contribuição extra-hepática (ex.: evidência de metabolismo pulmonar em gatos).',
      excretion: 'Renal (metabólitos).',
      dog_vs_cat:
        'Em gatos a meia-vida plasmática é mais longa do que em cães, especialmente após infusões prolongadas; duração de efeito pode ser maior (~20 min).',
      active_metabolites: 'Não (metabólitos descritos como inativos/hidrossolúveis).',
      accumulation:
        'Acúmulo geralmente baixo por redistribuição rápida e metabolismo extenso; porém em gatos e em infusões prolongadas pode haver recuperação mais lenta. Risco particular: doses repetidas/prolongadas em gatos (Heinz bodies).',
    },
  },

  species_notes: {
    dogs: {
      key_point: 'Indução suave e rápida; titular lentamente reduz apneia/hipotensão e reduz dose total.',
      high_risk_notes: [
        'Hipovolemia/instabilidade cardiovascular: risco maior de hipotensão importante',
        'Bolus rápido: apneia é comum e dose-dependente',
      ],
      metabolism_excretion: 'Metabolismo hepático extenso + possível extra-hepático; excreção renal de metabólitos.',
    },
    cats: {
      key_point:
        'Meia-vida plasmática tende a ser maior (especialmente com infusões prolongadas) e há risco de alterações oxidativas em hemácias com repetição/prolongamento.',
      high_risk_notes: [
        'Doses repetidas/consecutivas ou infusões prolongadas: risco de Heinz bodies e piora clínica em gatos susceptíveis (especialmente se anêmicos)',
        'Bolus rápido: apneia é comum e dose-dependente',
      ],
      metabolism_excretion: 'Metabolismo hepático + extra-hepático (há evidência em tecido pulmonar); excreção renal de metabólitos.',
    },
  },

  // Seção 3: Indicações e Contraindicações
  indications: {
    primary: [
      'Indução de anestesia geral (IV, titulado ao efeito)',
      'Manutenção de anestesia por CRI (TIVA)',
      'Sedação/anestesia em pacientes com doença intracraniana e PIC elevada (preferencialmente com ventilação controlada e PAM/CPP bem mantidas)',
      'Controle de convulsões refratárias/status epilepticus (incluindo pacientes com doença hepática/encefalopatia hepática, quando outras opções são limitadas)',
    ],
    secondary: [
      'Co-indução com opioides/benzodiazepínicos/lidocaína para reduzir dose de propofol e efeitos hemodinâmicos',
      'Facilitar procedimentos rápidos (ex.: intubação, curativos, passagem de sondas), quando monitorização e via aérea estão prontas',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Impossibilidade de garantir via aérea/ventilação em paciente com alto risco de apneia (ex.: obstrução de via aérea superior grave sem plano para intubação imediata)',
        why: 'Propofol pode causar apneia; segurança depende de suporte ventilatório imediato se necessário.',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Instabilidade cardiovascular/choque hipovolêmico não corrigido',
        why: 'Efeitos cardiovasculares são dose/velocidade-dependentes e incluem queda de PAM por vasodilatação + ↓ contratilidade; risco maior em hipovolemia.',
        level: 'CRITICAL',
      },
      {
        condition: 'Gatos anêmicos (especialmente) + necessidade de doses repetidas/prolongadas',
        why: 'Risco de Heinz bodies e sinais sistêmicos relatados com propofol em administrações repetidas; cautela maior se já houver anemia.',
        level: 'WARNING',
      },
      {
        condition: 'Pancreatite',
        why: 'Veículo lipídico (emulsão) pode ser indesejável; considerar alternativa conforme contexto clínico.',
        level: 'WARNING',
      },
    ],
  },

  // Seção 4: Doses
  doses: {
    unit_standard_cri: 'mg/kg/h',
    dog: {
      bolus: {
        mgkg: {
          min: 1,
          max: 6,
          note: 'Titrar em bolus incrementais lentos (ex.: 0,5–1 mg/kg por vez) até intubação. Sem premedicação pode exigir doses mais altas (há referência de 3–10 mg/kg IV como faixa ampla).',
        },
        mcgkg: { min: 0, max: 0, note: 'Não aplicável.' },
        ukg: { min: 0, max: 0, note: 'Não aplicável.' },
        route: 'IV',
        loading_dose: { min: 1, max: 6 },
      },
      cri: {
        mcgkgmin: {
          min: 0,
          max: 0,
          note: 'Preferir mg/kg/h para propofol.',
        },
        mgkgh: {
          min: 6,
          max: 30,
          note: 'Expresso como 0,1–0,5 mg/kg/min. Para TIVA com associações (ex.: fentanyl/ketamina), pode ser suficiente 6–18 mg/kg/h (0,1–0,3 mg/kg/min).',
        },
        titration: {
          increment: 'Ajustar em passos de ~2–6 mg/kg/h (≈0,03–0,1 mg/kg/min) conforme profundidade/PA/ventilação.',
          interval: 'Reavaliar a cada 3–5 min após ajuste (efeito rápido).',
        },
        max: 60,
      },
      adjustments: {
        obesity: 'Usar peso magro/ajustado para estimativa inicial e titular ao efeito (evita superdose).',
        shock: 'Evitar bolus rápido; considerar co-indução (opioide/benzo/lidocaína) e iniciar com doses menores; priorizar correção volêmica/vasopressores conforme necessidade.',
        hypoalbuminemia: 'Não é altamente dependente de albumina como algumas drogas, mas doente crítico tende a precisar de menos; titular lentamente.',
        comorbidities:
          'Em cardiopatas/hipovolêmicos, reduzir dose e velocidade; em neurocrítico, manter PAM/CPP (pode exigir vasopressor) e ventilação controlada.',
      },
      therapeutic_targets: {
        target_map: 'Manter PAM adequada (ex.: ≥ 60–70 mmHg em rotina; mais alto em neurocrítico conforme CPP desejada).',
        target_etco2: 'Ventilar para normocapnia (EtCO2 ~35–45 mmHg) e evitar hipercapnia (↑ PIC).',
        analgesia_scale: 'Analgesia deve ser fornecida por outros fármacos (propofol não analgesia).',
        sedation_target:
          'Plano anestésico adequado sem perda excessiva de reflexos/hipotensão; se palpebral ausente pode estar profundo demais (especialmente em protocolos citados).',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 1,
          max: 10,
          note: 'Titrar lentamente ao efeito. Faixa ampla descrita para indução: 5–10 mg/kg IV; em doente/premedicado frequentemente menos. Evitar repetição/prolongamento em gatos anêmicos.',
        },
        mcgkg: { min: 0, max: 0, note: 'Não aplicável.' },
        ukg: { min: 0, max: 0, note: 'Não aplicável.' },
        route: 'IV',
        loading_dose: { min: 1, max: 10 },
      },
      cri: {
        mcgkgmin: { min: 0, max: 0, note: 'Preferir mg/kg/h para propofol.' },
        mgkgh: {
          min: 12,
          max: 60,
          note: 'Expresso como 0,2–1,0 mg/kg/min. Considerar que gatos podem ter meia-vida mais longa (especialmente em infusões prolongadas) e recuperar mais devagar.',
        },
        titration: {
          increment: 'Ajustar em passos de ~3–6 mg/kg/h conforme profundidade/PA/ventilação.',
          interval: 'Reavaliar a cada 3–5 min após ajuste.',
        },
        max: 60,
      },
      adjustments: {
        obesity: 'Usar peso magro/ajustado e titular ao efeito.',
        shock: 'Evitar bolus rápido; iniciar com dose muito menor e co-indução; estabilizar hemodinâmica antes.',
        hypoalbuminemia: 'Doente crítico geralmente precisa menos; titular lentamente.',
        comorbidities:
          'Em anemia: evitar repetição/prolongamento; em cardiopatas/hipovolêmicos: reduzir dose/velocidade e monitorizar PA de forma agressiva.',
      },
      therapeutic_targets: {
        target_map: 'Evitar hipotensão; em neurocrítico manter CPP (PA frequentemente precisa ser mais alta).',
        target_etco2: 'Normocapnia (EtCO2 ~35–45 mmHg).',
        analgesia_scale: 'Sempre associar analgésico (opioide ± outros).',
        sedation_target: 'Plano anestésico suficiente com estabilidade hemodinâmica/ventilatória.',
      },
    },
  },

  // Seção 5: Apresentações
  presentations: [
    {
      concentration_mg_ml: 10,
      volume_ml: 20,
      total_mg: 200,
      label: '10 mg/mL (1%) — emulsão lipídica (soja/lecitina/glicerol)',
      examples: ['Propofol (genéricos)', 'Rapinovet'],
      concentration_trap_warning: 'Atenção: sempre confirmar se é 1% (10 mg/mL). Erros de concentração/dose em bolus causam apneia/hipotensão graves.',
    },
    {
      concentration_mg_ml: 10,
      volume_ml: 20,
      total_mg: 200,
      label: '10 mg/mL (1%) com conservante (ex.: benzyl alcohol) — frasco multidoses (ex.: PropoFlo 28/Propoflo 28)',
      examples: ['PropoFlo 28', 'Propoflo 28'],
      concentration_trap_warning: 'Mesmo com conservante, manter técnica asséptica e respeitar validade pós-abertura conforme rótulo/local.',
    },
  ],

  // Seção 6: Diluição
  dilution_and_preparation: {
    hard_rules: [
      'Preferir titração IV lenta (≈60–90 s para dose total) para reduzir apneia/hipotensão.',
      'Não misturar propofol no mesmo frasco/seringa com outros fármacos (risco físico-químico e/ou contaminação); se necessário, usar linha dedicada.',
      'Emulsão lipídica: técnica asséptica rigorosa; frascos sem conservante devem ser descartados poucas horas após abertos.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 10,
        use_cases: ['Indução IV titulada', 'CRI/TIVA em seringa-bomba (uso padrão)'],
        how_to_make: 'Usar a apresentação padrão 1% (10 mg/mL) sem diluir. Se houver dor à injeção, preferir veia maior, pré-bolus de lidocaína IV ou administrar no equipo com fluido correndo.',
        recipe: 'Padrão: 10 mg/mL pronto para uso (não requer diluição).',
      },
    ],
    diluents_allowed: ['NaCl 0,9% (administração em linha com fluido correndo)', 'Ringer Lactato (administração em linha com fluido correndo)'],
    preferred_diluent: {
      diluent: 'NaCl 0,9% (em linha correndo)',
      why: 'Estratégia prática para "diluir na linha" e reduzir dor à injeção; evita misturas no mesmo recipiente.',
    },
    stability: [
      {
        diluent: 'Frasco sem conservante (emulsão 1%)',
        max_time_hours: 6,
        light_protection: false,
        syringe_bag_change: 'Descartar frasco aberto em ~6 h; em CRI, considerar troca de equipo/linha a cada ~12 h ou se suspeita de contaminação.',
      },
      {
        diluent: 'Formulações com conservante (ex.: PropoFlo 28/Propoflo 28)',
        max_time_hours: 672,
        light_protection: false,
        syringe_bag_change: 'Validade pós-abertura pode chegar a ~28 dias (confirmar no rótulo/local).',
      },
    ],
    dedicated_line_required: true,
    dedicated_line_why: 'Reduz risco de incompatibilidade física/mistura inadvertida e facilita controle de dose (TIVA/CRI) com menor risco de bolus acidental.',
  },

  // Seção 7: Compatibilidade
  compatibility: {
    diluents_allowed: ['NaCl 0,9%', 'Ringer Lactato'],
    diluents_ok: ['NaCl 0,9%', 'Ringer Lactato'],
    diluentsAllowed: ['NaCl 0,9%', 'Ringer Lactato'],
    diluents: ['NaCl 0,9%', 'Ringer Lactato'],
    compatible_in_syringe_or_bag: [],
    compatible_y_site_only: ['Cristaloides em linha correndo (NaCl 0,9%, Ringer Lactato) para administração IV'],
    incompatible: [
      {
        agent: 'Mistura no mesmo frasco/seringa com outros fármacos (regra prática)',
        why: 'Emulsão lipídica + risco de incompatibilidade física e principalmente risco de contaminação; preferir linha dedicada.',
        risk: 'precipitação',
      },
    ],
    avoid_same_syringe_or_precipitation_risk: ['Evitar misturar com outros fármacos na mesma seringa/bolsa; usar linha dedicada.'],
    dedicated_line_rules: [
      'Preferir via exclusiva para CRI de propofol.',
      'Se precisar usar a mesma via, manter Y-site distante e assegurar flushing adequado (evitar bolus inadvertido).',
    ],
  },

  // Seção 8: Administração e Titulação
  administration_and_titration: {
    bolus_guidance: [
      'Administrar IV em bolus incrementais lentos (ex.: 0,5–1 mg/kg por vez) até efeito.',
      'Quando possível, administrar a dose total lentamente (~60–90 s) para reduzir apneia/hipotensão.',
      'Estar pronto para intubar e ventilar: apneia transitória pode ocorrer mesmo com titulação lenta.',
    ],
    titration_rules: [
      'Ajustar CRI em pequenos passos e reavaliar em 3–5 min clarificando PA/ventilação/profundidade.',
      'Se instabilidade hemodinâmica: reduzir taxa, otimizar volemia e considerar co-hipnóticos/analgesia para reduzir requerimento.',
    ],
    monitoring_minimum: [
      'PA (ideal invasiva em doente crítico)',
      'ECG (FC/ritmo)',
      'SpO2',
      'EtCO2 (ventilação/apneia)',
      'Temperatura',
      'Profundidade anestésica (reflexos, tônus mandibular, posição ocular)',
    ],
    endpoints: {
      desired_effect: [
        'Intubação fácil sem excitação',
        'Plano anestésico estável com PA aceitável',
        'Ventilação adequada (EtCO2 dentro da meta, sem apneia sustentada)',
      ],
      toxicity_signs: [
        'Apneia prolongada',
        'Hipotensão significativa/refratária',
        'Bradicardia/arrítmias clinicamente relevantes',
        'Recuperação muito prolongada (especialmente em gatos com infusão prolongada)',
      ],
    },
    therapeutic_failure: {
      check_first: [
        'Dores/estímulo cirúrgico sem analgesia adequada (propofol não analgesia)',
        'Taxa de infusão/bolus insuficiente ou vazamento na linha',
        'Erro de peso/concentração (10 mg/mL = 1%)',
        'Co-administração de fármacos que alteram necessidade (premedicação ausente → dose maior)',
      ],
      common_causes: [
        'Subanalgesia (principal causa de "movimento" sob propofol)',
        'Bomba/linha com oclusão ou bolus acidental',
        'Tolerância situacional por estímulo intenso',
      ],
      when_to_change: [
        'Se necessidade de taxas muito altas com instabilidade hemodinâmica, preferir associar opioide/ketamina/lidocaína ou migrar para inalatória com suporte apropriado.',
        'Se apneia/hipotensão persistirem apesar de redução e suporte, trocar agente.',
      ],
    },
  },

  // Seção 9: Efeitos Adversos
  adverse_effects_and_toxicity: {
    common: [
      'Hipotensão (vasodilatação + ↓ contratilidade), especialmente em hipovolêmicos',
      'Depressão respiratória e apneia (mais com bolus rápido)',
      'Dor à injeção (mais em vasos pequenos)',
    ],
    serious: [
      'Apneia prolongada com hipoxemia/hipercapnia se não ventilar',
      'Hipotensão grave/choque iatrogênico em paciente instável',
      'Eventos relacionados a contaminação (emulsão lipídica sem conservante) se manuseio inadequado',
      'Síndrome de infusão de propofol / hipertrigliceridemia em infusões prolongadas (descrita como preocupação com uso prolongado)',
    ],
    subdose_signs: [
      'Movimento ao estímulo cirúrgico',
      'Mandíbula rígida/retorno de reflexos com sinais autonômicos (taquicardia/hipertensão)',
      'Tosse/laringoespasmo em manipulação de via aérea',
    ],
    overdose_signs: [
      'Apneia',
      'Hipotensão marcada',
      'Bradidisritmias/depressão cardiovascular',
      'Recuperação prolongada (especialmente em gatos após infusão longa)',
    ],
    management: [
      'Reduzir/pausar infusão e ventilar (O2 + ventilação controlada) se apneia.',
      'Tratar hipotensão: reduzir dose, fluidos conforme responsividade, vasopressor/inotrópico conforme indicação.',
      'Se dor à injeção: usar veia maior, pré-bolus lidocaína IV ou administrar no equipo com fluido correndo.',
      'Controle de assepsia: descartar frasco aberto no tempo recomendado; trocar equipo/linhas em infusão prolongada.',
    ],
    special_events: [
      {
        event: 'Dor à injeção',
        management: 'Preferir vaso calibroso, lidocaína IV antes, ou injetar no equipo com fluido correndo.',
      },
      {
        event: 'Heinz bodies em gatos (uso repetido/prolongado)',
        management:
          'Evitar repetição/prolongamento em gatos anêmicos; monitorar PCV/hemograma se curso repetido; considerar alternativa (alfaxalona/etomidato conforme caso).',
      },
      {
        event: 'Risco de contaminação do frasco/equipo',
        management: 'Técnica asséptica rígida; descartar frasco sem conservante em poucas horas e trocar equipo em CRI prolongada.',
      },
    ],
  },

  // Seção 10: Alertas por Comorbidade
  alerts_by_comorbidity: [
    {
      key: 'propofol_hypovolemia_shock',
      level: 'CRITICAL',
      title: 'Hipovolemia/choque: risco alto de hipotensão profunda',
      why: 'Propofol reduz PAM por vasodilatação e ↓ contratilidade; efeito piora com bolus rápido e em paciente hipovolêmico.',
      action: [
        'Evitar bolus rápido; usar co-indução para reduzir dose (opioide/benzo/lidocaína).',
        'Monitorizar PA agressivamente (ideal invasiva).',
        'Preparar suporte: fluidos responsivos + vasopressor/inotrópico conforme necessidade.',
      ],
      dose_adjustment: {
        reduce_percent: 30,
        avoid_bolus: true,
        require_central_line: false,
        require_monitoring: ['PA (preferir invasiva)', 'EtCO2', 'SpO2', 'ECG'],
        suggest_alternative: 'Alfaxalona ou etomidato (dependendo do cenário), com analgesia adequada.',
      },
    },
    {
      key: 'propofol_cardiovascular_instability',
      level: 'WARNING',
      title: 'Instabilidade cardiovascular/cardiopatia: titular com muita cautela',
      why: 'Efeito depressor cardiovascular é dose/velocidade-dependente; pode haver hipotensão e piora de perfusão.',
      action: [
        'Titrar lentamente ao efeito.',
        'Associar analgésico/co-indução para reduzir requerimento.',
        'Manter metas de PA/CPP (especialmente em neurocrítico).',
      ],
      dose_adjustment: { reduce_percent: 20, avoid_bolus: true },
    },
    {
      key: 'propofol_cat_anemia_repeated',
      level: 'WARNING',
      title: 'Gato anêmico + doses repetidas/infusão prolongada: risco de Heinz bodies',
      why: 'Administrações repetidas em gatos foram associadas a Heinz bodies e sinais sistêmicos; risco maior se anêmico.',
      action: [
        'Evitar repetição/prolongamento quando possível.',
        'Se inevitável: monitorar PCV/hemograma e reduzir exposição total.',
        'Preferir alternativa quando apropriado.',
      ],
      dose_adjustment: {
        reduce_percent: 20,
        avoid_bolus: false,
        require_monitoring: ['Hemograma/PCV seriado', 'PA', 'EtCO2', 'SpO2'],
      },
    },
    {
      key: 'propofol_pancreatitis',
      level: 'WARNING',
      title: 'Pancreatite: atenção ao veículo lipídico',
      why: 'Propofol é emulsão lipídica; em alguns contextos clínicos, evitar carga lipídica pode ser desejável.',
      action: [
        'Avaliar alternativa (alfaxalona/etomidato/inalatória) conforme estabilidade e objetivo.',
        'Se usar: preferir menor dose efetiva e curso curto.',
      ],
    },
    {
      key: 'propofol_increased_icp',
      level: 'MONITOR',
      title: 'PIC elevada: pode ser favorável, mas exige PA/ventilação sob controle',
      why: 'Propofol reduz CBF/CMRO2 e PIC, mas pode reduzir PAM; hipercapnia por hipoventilação aumenta PIC.',
      action: [
        'Ventilação controlada para normocapnia.',
        'Manter PAM/CPP com fluido/vasopressor se necessário.',
        'Evitar bolus rápido e monitorizar EtCO2 continuamente.',
      ],
      dose_adjustment: {
        reduce_percent: 10,
        avoid_bolus: true,
        require_monitoring: ['PA', 'EtCO2', 'SpO2', 'ECG'],
      },
    },
  ],

  // Seção 11: Presets
  presets: [
    {
      id: 'induction_titrated',
      label: 'Indução titulada (IV lenta) 🟩',
      dose_mgkg: 4,
      limits: { min: 1, max: 6 },
      clinical_target: 'Intubação suave com mínima apneia/hipotensão',
      linked_alerts: ['propofol_hypovolemia_shock', 'propofol_cardiovascular_instability'],
    },
    {
      id: 'maintenance_cri_standard',
      label: 'Manutenção CRI padrão 🟨',
      dose_mgkgh: 18,
      limits: { min: 6, max: 30 },
      clinical_target: 'Plano anestésico estável (associar analgesia)',
      linked_alerts: ['propofol_increased_icp'],
    },
    {
      id: 'tiva_with_opioid_ketamine',
      label: 'TIVA multimodal (propofol + opioide ± ketamina) 🟩',
      dose_mgkgh: 12,
      limits: { min: 6, max: 18 },
      clinical_target: 'Reduzir dose de propofol e melhorar analgesia/estabilidade',
      linked_alerts: ['propofol_hypovolemia_shock'],
    },
  ],

  // Seção 12: Templates de Cálculo
  calculation_templates: {
    cri: {
      required_inputs: ['weight_kg', 'dose_mgkg_h', 'drug_concentration_mg_ml', 'final_volume_ml'],
      algorithm: [
        '1) Calcular dose total por hora (mg/h): dose_mgkg_h × peso_kg',
        '2) Converter para mL/h: (mg/h) ÷ (concentracao_mg_ml)',
        '3) Se for preparar seringa: calcular mg totais na seringa = concentracao_mg_ml × volume_final_ml',
        '4) Estimar duração da seringa (h) = (mg totais na seringa) ÷ (mg/h)',
      ],
      conversions: ['mg/kg/min → mg/kg/h: multiplicar por 60', 'mg/kg/h → mg/kg/min: dividir por 60'],
      hard_safety_checks: [
        {
          if: 'drug_concentration_mg_ml != 10',
          then: 'WARN',
          message: 'Propofol normalmente é 1% (10 mg/mL). Confirme a concentração para evitar erro crítico.',
        },
        {
          if: 'dose_mgkg_h > 60',
          then: 'BLOCK',
          message: 'Dose acima do teto seguro configurado (60 mg/kg/h). Reavalie.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'dose_mgkg_h > 30',
          then: 'WARN',
          message: 'Dose alta para cães em muitos cenários. Considere co-analgesia/co-indução e reavalie PA/ventilação.',
        },
        {
          if: "patient_has('hypovolemia') || patient_has('shock')",
          then: 'WARN',
          message: 'Hipovolemia/choque aumenta risco de hipotensão grave com propofol. Prefira titração lenta e doses menores.',
        },
        {
          if: "species == 'cat' && patient_has('anemia')",
          then: 'WARN',
          message: 'Gato anêmico: evite doses repetidas/infusão prolongada (risco de Heinz bodies).',
        },
      ],
      outputs: ['rate_ml_h', 'dose_mg_h', 'syringe_duration_h'],
      error_cost: 'Erro de concentração/dose pode causar apneia e hipotensão graves.',
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg', 'drug_concentration_mg_ml'],
      algorithm: [
        '1) Calcular dose total (mg): dose_mgkg × peso_kg',
        '2) Converter para volume (mL): mg ÷ concentracao_mg_ml',
        '3) Administrar lentamente em incrementos e parar ao atingir efeito.',
      ],
      hard_safety_checks: [
        {
          if: 'drug_concentration_mg_ml != 10',
          then: 'WARN',
          message: 'Confirme concentração (padrão 10 mg/mL).',
        },
      ],
      soft_safety_checks: [
        {
          if: 'planned_admin_time_sec < 60',
          then: 'WARN',
          message: 'Bolus rápido aumenta risco de apneia/hipotensão. Preferir 60–90 s (ou incrementos).',
        },
      ],
      outputs: ['bolus_volume_ml', 'bolus_mg'],
      error_cost: 'Bolus rápido/alto pode causar apneia imediata.',
    },
    dilution_builder: {
      required_inputs: ['note_context'],
      algorithm: [
        'Propofol geralmente é usado pronto (10 mg/mL) e NÃO requer diluição.',
        'Se objetivo for reduzir dor à injeção: usar veia maior, lidocaína IV prévia, ou administrar no equipo com cristaloide correndo.',
      ],
      hard_safety_checks: [
        {
          if: "user_requests('mix_in_bag_or_syringe_with_other_drugs')",
          then: 'BLOCK',
          message: 'Evite misturar propofol com outros fármacos no mesmo recipiente. Use linha dedicada.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'infusion_expected_hours >= 12',
          then: 'INFO',
          message: 'Em CRI prolongada, considerar troca de equipo/linha (~12 h) e rigor de assepsia.',
        },
      ],
      outputs: ['best_practice_instructions'],
      error_cost: 'Misturas e manuseio inadequado elevam risco de contaminação e eventos graves.',
    },
  },

  // Seção 13: Bloco Didático
  how_we_got_here_block: {
    title: 'Como chegamos a este resultado (Propofol – CRI/bolus)',
    render_steps: [
      {
        step: 1,
        label: 'Dose por hora',
        formula: 'mg/h = (dose em mg/kg/h) × (peso em kg)',
      },
      {
        step: 2,
        label: 'Converter para mL/h',
        formula: 'mL/h = (mg/h) ÷ (concentração em mg/mL)',
      },
      {
        step: 3,
        label: 'Checagens de segurança',
        formula: 'Concentração padrão = 10 mg/mL (1%); bolus lento (60–90 s) reduz apneia/hipotensão.',
      },
    ],
    interpretation_rules: [
      'Se PA cair: reduzir propofol e otimizar analgesia/co-indução antes de "subir" dose.',
      'Se EtCO2 subir/apneia: ventilar; propofol deprime resposta ao CO2 e pode causar apneia dose-dependente.',
      'Propofol não fornece analgesia → sempre planejar opioide/analgesia multimodal.',
    ],
    example: {
      scenario: 'Cão 10 kg, CRI 18 mg/kg/h (≈0,3 mg/kg/min), propofol 10 mg/mL',
      calculation: ['mg/h = 18 × 10 = 180 mg/h', 'mL/h = 180 ÷ 10 = 18 mL/h'],
      result: 'Taxa = 18 mL/h',
    },
  },

  // Seção 14: Integrações
  protocol_integrations: {
    enabled: true,
    protocols: ['TIVA multimodal', 'Neuroanestesia (controle de PIC)', 'Co-indução com opioide/benzodiazepínico/lidocaína'],
    why_combo_exists:
      'Propofol fornece hipnose rápida mas analgesia mínima; associações reduzem dose total e melhoram estabilidade hemodinâmica/analgesia.',
    rules: [
      {
        if: "protocol == 'TIVA multimodal' && using_opioid == true",
        then: {
          action: 'REDUCE_DOSE',
          factor: 0.7,
          message: 'Opioide pode reduzir requerimento de propofol; comece ~30% mais baixo e titule.',
        },
      },
      {
        if: "patient_has('hypovolemia') || patient_has('shock')",
        then: {
          action: 'PREFER_ALTERNATIVE',
          message: 'Em hipovolemia/choque, considere alternativa (alfaxalona/etomidato) ou co-indução forte + titração muito lenta.',
        },
      },
    ],
  },

  // Seção 15: Fluxogramas
  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'propofol_induction_safe',
        title: 'Indução segura com propofol (cão/gato)',
        mermaid:
          'flowchart TD\nA[Pré-checagem: via aérea + ventilação + PA/ECG/SpO2/EtCO2] --> B{Hipovolemia/instável?}\nB -- Sim --> C[Co-indução (opioide/benzo/lido) + dose menor + titração MUITO lenta]\nB -- Não --> D[Titular propofol IV em incrementos lentos]\nC --> E{Apneia/EtCO2 subindo?}\nD --> E\nE -- Sim --> F[Intubar/ventilar + reduzir/pausar propofol]\nE -- Não --> G{PAM caiu?}\nG -- Sim --> H[Reduzir propofol + otimizar analgesia + fluidos/vasoativo]\nG -- Não --> I[Manter plano e monitorização contínua]',
      },
      {
        id: 'propofol_cri_adjust',
        title: 'Ajuste de CRI de propofol (TIVA)',
        mermaid:
          'flowchart TD\nA[Iniciar CRI baixa-moderada] --> B[Checar profundidade + PA + ventilação (EtCO2)]\nB --> C{Movimento/hipertensão?}\nC -- Sim --> D[Adicionar/otimizar analgesia (opioide ± ketamina/lido) e subir CRI em pequenos passos]\nC -- Não --> E{Hipotensão/apneia?}\nE -- Sim --> F[Baixar CRI/pausar + ventilar + tratar PA]\nE -- Não --> G[Manter e reavaliar em 3-5 min após qualquer ajuste]',
      },
    ],
  },

  // Seção 16: UI Copy
  ui_copy: {
    critical_warning_banner: 'Propofol deprime respiração e pressão — TITRE IV LENTAMENTE e esteja pronto para intubar/ventilar.',
    alert_messages: {
      short: 'Risco de apneia/hipotensão: titrar lentamente e monitorizar PA/EtCO2.',
      long: 'Propofol causa depressão cardiovascular e respiratória dose/velocidade-dependente. Em hipovolemia/cardiopatas, reduza dose e evite bolus rápido; prepare suporte ventilatório e hemodinâmico. Em gatos anêmicos, evite doses repetidas/infusões prolongadas (Heinz bodies).',
    },
    block_message: 'Uso bloqueado: não é seguro administrar propofol sem capacidade de garantir via aérea e ventilação.',
    common_errors: [
      'Bolus rápido → apneia e hipotensão',
      'Tratar "movimento" aumentando propofol sem analgesia → instabilidade',
      'Não confirmar concentração (padrão 10 mg/mL) → erro de dose',
      'Manuseio não asséptico do frasco/equipo → risco de contaminação',
    ],
  },

  // Seção 17: Referências
  references: [
    {
      section: 'mechanism/pharmacokinetics/doses/stability',
      source: 'Veterinary Anesthesia and Analgesia (Lumb and Jones), 6th ed. — Chapter 27: Injectable Anesthetics (Propofol)',
      page: '466–469',
      edition: '6th',
      year: 2022,
    },
    {
      section: 'onset/admin/titration/apnea/pain_on_injection/contamination',
      source: 'Veterinary Anesthesia and Analgesia (Lumb and Jones), 6th ed. — Chapter 27: Injectable Anesthetics (Clinical use; contamination guidance)',
      page: '466–468',
      edition: '6th',
      year: 2022,
    },
    {
      section: 'cardiovascular/respiratory effects/contraindications/clinical dosing (critical patient)',
      source: 'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd ed. — Chapter 21: Anaesthesia, sedation and analgesia of the critical patient (Propofol section + dose table)',
      page: '338–339',
      edition: '3rd',
      year: 2018,
    },
    {
      section: 'pancreatitis warning; CRI example range in hepatic disease context',
      source:
        'Nelson & Couto — Small Animal Internal Medicine (6th ed.) — Hepatobiliary/Pancreatic disorders table (propofol CRI 0.1–0.2 mg/kg/min; avoid in pancreatitis due to lipid vehicle)',
      page: '646',
      edition: '6th',
      year: 2019,
    },
  ],
}
