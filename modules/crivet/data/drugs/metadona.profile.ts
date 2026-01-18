import type { DrugProfile } from '../../types/drugProfile'

export const metadonaProfile: DrugProfile = {
  // Seção 1: Identidade
  drug_id: 'metadona',
  name_pt: 'Metadona (cloridrato de metadona)',
  name_en: 'Methadone (methadone hydrochloride)',
  synonyms: ['Methadone HCl', 'Comfortan 10 mg/mL', 'Physeptone (humano)', 'Semfortan/Comfortan (varia por país)'],
  class: ['Opioide agonista μ completo', 'Fenilheptilamina', 'Modulador de dor multimodal (μ + monoaminas + NMDA)'],

  // Seção 2: Perfil Farmacológico
  core_concepts: {
    taglines: [
      'Agonista μ completo com componente anti-hiperalgésico (NMDA) e monoaminérgico.',
      'Boa escolha perioperatória: analgesia potente com sedação geralmente leve a moderada.',
      'Depressão respiratória é dose-dependente: monitorização é obrigatória em pacientes frágeis.',
      'Via SC pode ter absorção/níveis mais variáveis (preferir IV/IM quando previsibilidade é crítica).',
    ],
    mechanism: {
      receptors_targets: [
        'Receptor μ-opioide (principal)',
        'Receptores monoaminérgicos (efeitos de recaptação/atividade em monoaminas – contribuição clínica)',
        'Receptor NMDA (antagonismo – componente anti-hiperalgésico/anti-sensibilização)',
      ],
      primary_effects: {
        cardiovascular:
          'Pode reduzir FC de forma dose-dependente (depressão cardiovascular mais evidente em FC do que morfina, em estudos citados); em geral, tende a preservar estabilidade quando usada como analgésico/premed, mas monitorizar PA/FC/ECG.',
        respiratory: 'Depressão respiratória dose-dependente (↓ resposta ao CO2); risco maior quando associada a outros depressores de SNC.',
        cns: 'Analgesia + sedação geralmente leve; pode causar vocalização/"whining" ocasional em cães; potencial benefício em dor crônica/hiperalgesia por componente NMDA.',
        renal_hepatic:
          'Metabolismo hepático (CYP; potencial de interação com inibidores enzimáticos); eliminação por vias metabólicas com excreção de metabólitos.',
        gi: 'Vômito geralmente raro; pode ocorrer. Pode dificultar gastroduodenoscopia em pacientes não dolorosos (efeito em motilidade/relaxamento).',
      },
      clinical_metaphor:
        '"Trava-multiportas da dor": fecha a porta principal (μ) e ainda reduz "eco"/amplificação da dor (NMDA/monoaminas), mas pode "baixar o fôlego" se você exagerar na dose.',
    },
    pharmacodynamics: {
      onset_iv: '≈ minutos (efeito analgésico/sedativo clínico rápido após IV; titular ao efeito)',
      onset_im: '≈ 10–20 min (varia com perfusão e formulação)',
      peak: '≈ 15–30 min (IM) / próximo ao fim da titulação (IV)',
      duration: '≈ 4–6 h (cães e gatos, uso clínico típico)',
      dependencies: [
        'Dose total e associação com outros depressores de SNC',
        'Via (SC mais variável em concentração plasmática do que IV/IM)',
        'Estado hemodinâmico/perfusão periférica (impacta IM/SC)',
        'Interações por CYP (ex.: inibidores enzimáticos podem alterar PK)',
      ],
    },
    pharmacokinetics: {
      metabolism: 'Predominantemente hepático (CYP; suscetível a interações).',
      excretion: 'Excreção de metabólitos (principalmente renal; parte biliar pode ocorrer conforme espécie).',
      dog_vs_cat:
        'Usada em cães e gatos; em geral semelhante como analgésico perioperatório. Referência destaca maior variabilidade de níveis com via SC (formulações padrão) em cães e gatos.',
      active_metabolites: 'Não enfatizados como determinantes clínicos na referência-base utilizada.',
      accumulation: 'Risco de acúmulo aumenta com doses repetidas frequentes, disfunção hepática e/ou interações (inibidores enzimáticos).',
    },
  },

  species_notes: {
    dogs: {
      key_point:
        'Analgesia perioperatória potente; sedação costuma ser leve e pode ocorrer vocalização ocasional. Evitar SC quando previsibilidade for crucial.',
      high_risk_notes: [
        'Depressão respiratória dose-dependente — atenção em braquicefálicos/doença respiratória',
        'Interações por CYP podem aumentar efeito (ex.: alguns antifúngicos/antibióticos) — monitorizar sedação/ventilação',
      ],
      metabolism_excretion: 'Metabolismo hepático; excreção de metabólitos.',
    },
    cats: {
      key_point:
        'Boa opção analgésica (perioperatória) com duração clínica típica de 4–6 h; monitorização respiratória é essencial.',
      high_risk_notes: [
        'Depressão respiratória dose-dependente (especialmente com benzo/propofol/inalatórios)',
        'Via SC pode ser menos previsível (absorção variável) — preferir IV/IM quando possível',
      ],
      metabolism_excretion: 'Metabolismo hepático; excreção de metabólitos.',
    },
  },

  // Seção 3: Indicações e Contraindicações
  indications: {
    primary: [
      'Analgesia perioperatória (pré-medicação, transoperatória e pós-operatória) em cães e gatos',
      'Neuroleptoanalgesia/premedicação em associação a tranquilizantes/sedativos',
      'Dor moderada a intensa (especialmente quando se busca componente anti-hiperalgésico por NMDA)',
    ],
    secondary: [
      'Adjuvante em dor crônica/hiperalgesia/sensibilização central (contexto multimodal)',
      'Infusão contínua (CRI) em cães quando se deseja analgesia estável e poupadora de anestésico/inalatório',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Sem capacidade de monitorização e suporte ventilatório em paciente de alto risco respiratório',
        why: 'Opioides causam depressão respiratória dose-dependente; risco é inaceitável sem suporte.',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Doença respiratória significativa / braquicefálico / obstrução de vias aéreas superiores',
        why: 'A depressão respiratória é dose-dependente e pode precipitar hipoventilação/hipoxemia.',
        level: 'CRITICAL',
      },
      {
        condition: 'Hepatopatia moderada a grave',
        why: 'Metabolismo hepático → maior duração/efeito e risco de acúmulo com doses repetidas.',
        level: 'WARNING',
      },
      {
        condition: 'Paciente não doloroso para procedimentos endoscópicos',
        why: 'Pode dificultar gastroduodenoscopia; considerar alternativa (ex.: butorfanol conforme objetivo).',
        level: 'MONITOR',
      },
    ],
  },

  // Seção 4: Doses
  doses: {
    unit_standard_cri: 'mg/kg/h',
    dog: {
      bolus: {
        mgkg: {
          min: 0.5,
          max: 1.0,
          note: 'Faixa recomendada (IM/IV) q3–4 h. Para sedação/analgesia rápida, titular IV lentamente ao efeito dentro da faixa.',
        },
        mcgkg: { min: 0, max: 0, note: 'Não aplicável.' },
        ukg: { min: 0, max: 0, note: 'Não aplicável.' },
        route: 'IV',
        loading_dose: { min: 0.5, max: 1.0 },
      },
      cri: {
        mcgkgmin: { min: 0, max: 0, note: 'Preferir mg/kg/h para metadona.' },
        mgkgh: {
          min: 0.05,
          max: 0.2,
          note: 'Referência descreve CRI em cães em 0,1 mg/kg/h; usar como centro e titular conforme dor/sedação/ventilação.',
        },
        titration: {
          increment: 'Ajustar em passos pequenos (ex.: 0,05 → 0,1 → 0,15 → 0,2 mg/kg/h) conforme dor e efeitos adversos.',
          interval: 'Reavaliar em 10–15 min após ajuste (ou continuamente em paciente crítico).',
        },
        max: 0.3,
      },
      adjustments: {
        obesity: 'Calcular dose inicial pelo peso ideal/ajustado e titular ao efeito clínico (reduz sobredose).',
        shock: 'Preferir IV/IM (SC pode ser imprevisível). Titrar cautelosamente e monitorar perfusão/ventilação.',
        hypoalbuminemia: 'Não é a principal limitação, mas doente crítico tende a precisar menos; titular ao efeito.',
        comorbidities:
          'Hepatopatas: espaçar doses e/ou reduzir; respiratórios: reduzir dose e intensificar monitorização; interações CYP: reduzir e monitorar.',
      },
      therapeutic_targets: {
        target_map: 'Manter perfusão adequada; se sedação profunda com hipotensão, reduzir dose e reequilibrar protocolo.',
        target_etco2: 'Manter normocapnia (EtCO2 ~35–45 mmHg) e evitar hipoventilação.',
        analgesia_scale: 'Metas por escala validada (ex.: dor moderada→ leve) e redução de sinais autonômicos (taquicardia/hipertensão por dor).',
        sedation_target: 'Sedação leve–moderada conforme procedimento; evitar sedação profunda com hipoventilação.',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 0.3,
          max: 0.5,
          note: 'Faixa recomendada (IM/IV) q4 h. Guia prático sugere 0,1–0,5 mg/kg IM/IV/SC com duração 4–6 h; titular ao efeito.',
        },
        mcgkg: { min: 0, max: 0, note: 'Não aplicável.' },
        ukg: { min: 0, max: 0, note: 'Não aplicável.' },
        route: 'IV',
        loading_dose: { min: 0.3, max: 0.5 },
      },
      cri: {
        mcgkgmin: { min: 0, max: 0, note: 'Preferir mg/kg/h; CRI em gatos não está padronizado nesta base — usar bolus e reavaliar.' },
        mgkgh: { min: 0, max: 0, note: 'Sem faixa CRI padronizada aqui (não bloquear: gato já tem bolus).' },
        titration: {
          increment: 'N/A',
          interval: 'N/A',
        },
        max: 0,
      },
      adjustments: {
        obesity: 'Dose inicial pelo peso ideal/ajustado e titular ao efeito.',
        shock: 'Preferir IV/IM; evitar SC por absorção variável. Monitorar ventilação de perto.',
        hypoalbuminemia: 'Doente crítico tende a necessitar menos; titular ao efeito.',
        comorbidities: 'Hepatopatas: reduzir/espaçar; respiratórios: reduzir e monitorizar (EtCO2/SpO2).',
      },
      therapeutic_targets: {
        target_map: 'Perfusão adequada sem sedação excessiva.',
        target_etco2: 'Normocapnia (EtCO2 ~35–45 mmHg).',
        analgesia_scale: 'Redução sustentada da dor em escala validada.',
        sedation_target: 'Sedação leve–moderada conforme necessidade, mantendo ventilação.',
      },
    },
  },

  // Seção 5: Apresentações
  presentations: [
    {
      concentration_mg_ml: 10,
      volume_ml: 1,
      total_mg: 10,
      label: '10 mg/mL — solução injetável (metadona HCl)',
      examples: ['Comfortan 10 mg/mL', 'Insistor 10 mg/mL (varia por mercado)'],
      concentration_trap_warning: 'Confirmar sempre concentração (muitos serviços trabalham com 10 mg/mL; erro de mL→mg pode causar depressão respiratória grave).',
    },
  ],

  // Seção 6: Diluição
  dilution_and_preparation: {
    hard_rules: [
      'Titrar IV lentamente ao efeito (reduz pico de depressão respiratória/sedação).',
      'Em pacientes frágeis, evitar empilhamento (redose precoce) — reavaliar dor e ventilação antes de repetir.',
      'Preferir IV/IM quando previsibilidade for importante; via SC pode ter maior variabilidade plasmática.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 1,
        use_cases: ['Microtitulação IV em gatos pequenos', 'Reduzir erro de dose por mL em pacientes muito leves'],
        how_to_make: 'Diluir metadona 10 mg/mL em NaCl 0,9% para 1 mg/mL para facilitar titulação (usar técnica asséptica e rotulagem rigorosa).',
        recipe: '1 mL (10 mg/mL) + 9 mL NaCl 0,9% = 10 mL a 1 mg/mL',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5%'],
    preferred_diluent: {
      diluent: 'NaCl 0,9%',
      why: 'Diluente padrão e previsível para titulação IV e preparo em seringa.',
    },
    stability: [
      {
        diluent: 'NaCl 0,9% (seringa/bolsa)',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Trocar seringa/bolsa conforme política do serviço (preferir preparo diário/asséptico).',
      },
    ],
    dedicated_line_required: false,
    dedicated_line_why: 'Não costuma exigir linha dedicada, mas em CRI multimodal vale padronizar flushing e evitar mistura inadvertida no mesmo lúmen.',
  },

  // Seção 7: Compatibilidade
  compatibility: {
    diluents_allowed: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5%'],
    diluents_ok: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5%'],
    diluentsAllowed: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5%'],
    diluents: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5%'],
    compatible_in_syringe_or_bag: ['Cristaloides para administração IV (em linha correndo), com flushing adequado'],
    compatible_y_site_only: [
      'Protocolos com benzodiazepínicos/indutores devem preferir administração separada e flush entre fármacos (regra prática de segurança)',
    ],
    incompatible: [
      {
        agent: 'Misturas no mesmo recipiente sem checagem de compatibilidade formal',
        why: 'Ausência de dados confiáveis no acervo atual para combinações específicas; risco de incompatibilidade físico-química depende de concentrações e diluentes.',
        risk: 'precipitação',
      },
    ],
    avoid_same_syringe_or_precipitation_risk: ['Evitar misturar com outros fármacos no mesmo corpo de seringa sem referência explícita de compatibilidade.'],
    dedicated_line_rules: [
      'Se em CRI (seringa-bomba), padronizar via/porta e flushing para evitar bolus acidental.',
      'Se via compartilhada, administrar em Y-site e lavar com cristaloide entre drogas.',
    ],
  },

  // Seção 8: Administração e Titulação
  administration_and_titration: {
    bolus_guidance: [
      'IV: administrar lentamente e titular ao efeito (analgesia/sedação), especialmente em pacientes com risco respiratório.',
      'IM: considerar início em ~10–20 min; reavaliar antes de redosar.',
      'SC: usar com cautela (absorção/níveis podem ser mais variáveis); preferir IV/IM quando previsibilidade é crucial.',
    ],
    titration_rules: [
      'Redose guiada por escala de dor e por ventilação (FR/EtCO2/SpO2), não por relógio apenas.',
      'Evitar "empilhamento": se sedado/hipoventilando, atrasar redose e tratar causa (dor vs depressão).',
    ],
    monitoring_minimum: ['FR/padrão respiratório', 'SpO2', 'EtCO2 (se disponível)', 'FC/ritmo (ECG)', 'PA', 'temperatura', 'escala de dor'],
    endpoints: {
      desired_effect: ['Redução sustentada da dor em escala validada', 'Sedação adequada ao procedimento sem hipoventilação clinicamente relevante'],
      toxicity_signs: [
        'Bradipneia/hipoventilação, queda de SpO2/elevação de EtCO2',
        'Sedação excessiva/estupor',
        'Bradicardia clinicamente relevante (contexto e dose-dependência)',
      ],
    },
    therapeutic_failure: {
      check_first: [
        'Dor intensa não coberta (precisa multimodal: AINE, bloqueios locais, cetamina, etc.)',
        'Via/absorção (SC variável; IM em hipoperfusão pode atrasar)',
        'Interações ou dose insuficiente para magnitude da dor',
      ],
      common_causes: [
        'Subanalgesia por estímulo cirúrgico alto sem multimodal',
        'Erro de peso/dose (mg vs mL em 10 mg/mL)',
        'Redose precoce evitada por sedação (confundir sedação com analgesia)',
      ],
      when_to_change: [
        'Se analgesia insuficiente com risco respiratório crescente, preferir adicionar adjuvantes (bloqueios, cetamina baixa dose, lidocaína) em vez de apenas aumentar metadona.',
        'Se efeitos adversos dominarem (hipoventilação/sedação), reduzir dose/intervalo e considerar alternativa.',
      ],
    },
  },

  // Seção 9: Efeitos Adversos
  adverse_effects_and_toxicity: {
    common: [
      'Depressão respiratória dose-dependente',
      'Sedação (geralmente leve; pode aumentar com associações)',
      'Vômito (geralmente raro, mas possível)',
      'Bradicardia (dose-dependente, em alguns contextos)',
    ],
    serious: [
      'Hipoventilação importante/apneia (especialmente com outros depressores de SNC)',
      'Depressão cardiovascular clinicamente relevante (principalmente queda de FC e hipotensão em pacientes frágeis)',
    ],
    subdose_signs: [
      'Persistência de dor em escala validada',
      'Sinais autonômicos de dor (taquicardia, hipertensão, midríase, vocalização por dor) apesar de sedação',
    ],
    overdose_signs: ['Bradipneia/hipercapnia, queda de SpO2', 'Sedação profunda', 'Bradicardia e hipotensão (dependendo do paciente e associações)'],
    management: [
      'Suporte ventilatório (O2, ventilação assistida) se hipoventilação/apneia.',
      'Reduzir/adiar redoses e tratar dor com multimodal não-opioide quando possível.',
      'Naloxona pode reverter efeitos opioides em intoxicação significativa (titular para reverter depressão respiratória mantendo alguma analgesia quando possível).',
      'Monitorar continuamente em pacientes de risco e após associações com propofol/benzodiazepínicos/inalatórios.',
    ],
    special_events: [
      {
        event: 'Vocalização/"whining" em cães',
        management:
          'Reavaliar dor vs efeito comportamental; considerar ajuste de dose e associação com tranquilizante (ex.: acepromazina) quando apropriado.',
      },
      {
        event: 'Via SC com resposta imprevisível',
        management: 'Preferir IV/IM em pacientes críticos; se SC inevitável, reavaliar com maior frequência e evitar redose precoce.',
      },
    ],
  },

  // Seção 10: Alertas por Comorbidade
  alerts_by_comorbidity: [
    {
      key: 'methadone_respiratory_disease',
      level: 'CRITICAL',
      title: 'Doença respiratória/braquicefálico: risco alto de hipoventilação',
      why: 'Depressão respiratória é dose-dependente e potencializa com outros depressores de SNC.',
      action: [
        'Reduzir dose inicial e titular lentamente (preferir IV).',
        'Evitar associações múltiplas depressoras sem monitorização (EtCO2/SpO2).',
        'Preparar O2 e suporte ventilatório.',
      ],
      dose_adjustment: {
        reduce_percent: 25,
        avoid_bolus: false,
        require_monitoring: ['SpO2', 'EtCO2', 'FR', 'PA', 'ECG'],
        suggest_alternative: 'Analgesia locorregional + AINE (se indicado) + adjuvantes (ex.: cetamina baixa dose) para poupar opioide.',
      },
    },
    {
      key: 'methadone_hepatic_disease',
      level: 'WARNING',
      title: 'Hepatopatia: risco de efeito prolongado/acúmulo',
      why: 'Metabolismo predominantemente hepático e suscetível a interações por CYP.',
      action: ['Reduzir dose e/ou espaçar intervalos.', 'Evitar empilhamento (redose precoce).', 'Monitorar sedação/ventilação por tempo maior.'],
      dose_adjustment: {
        reduce_percent: 20,
        avoid_bolus: false,
        require_monitoring: ['FR', 'SpO2', 'sedação', 'dor em escala'],
      },
    },
    {
      key: 'methadone_ckd_azotemia',
      level: 'MONITOR',
      title: 'DRC/azotemia: geralmente utilizável, mas monitorar sedação/ventilação',
      why: 'Efeito clínico é mais guiado por sensibilidade do paciente e associações do que por eliminação renal direta do fármaco ativo.',
      action: ['Preferir doses menores e reavaliar por escala de dor.', 'Evitar polifarmácia depressora sem monitorização.'],
    },
    {
      key: 'methadone_cardiac_instability',
      level: 'MONITOR',
      title: 'Cardiopatia/instabilidade: monitorar FC/PA/ECG',
      why: 'Pode reduzir FC de forma dose-dependente e alterar estabilidade em pacientes frágeis, especialmente em associação.',
      action: [
        'Titular lentamente ao efeito.',
        'Monitorização de PA/ECG.',
        'Se hipotensão/bradicardia relevantes, reduzir dose e ajustar protocolo.',
      ],
    },
  ],

  // Seção 11: Presets
  presets: [
    {
      id: 'periop_dog_standard',
      label: 'Perioperatório cão (analgesia potente) 🟩',
      dose_mgkg: 0.5,
      limits: { min: 0.5, max: 1.0 },
      clinical_target: 'Analgesia perioperatória com sedação leve',
      linked_alerts: ['methadone_respiratory_disease', 'methadone_hepatic_disease'],
    },
    {
      id: 'periop_cat_standard',
      label: 'Perioperatório gato 🟩',
      dose_mgkg: 0.3,
      limits: { min: 0.3, max: 0.5 },
      clinical_target: 'Analgesia perioperatória 4–6 h com monitorização respiratória',
      linked_alerts: ['methadone_respiratory_disease'],
    },
    {
      id: 'dog_cri_analgesia',
      label: 'Cão CRI analgesia (poupador) 🟨',
      dose_mgkgh: 0.1,
      limits: { min: 0.05, max: 0.2 },
      clinical_target: 'Analgesia estável, reduzir picos e poupar anestésico',
      linked_alerts: ['methadone_respiratory_disease', 'methadone_hepatic_disease'],
    },
  ],

  // Seção 12: Templates de Cálculo
  calculation_templates: {
    cri: {
      required_inputs: ['weight_kg', 'dose_mgkg_h', 'drug_concentration_mg_ml', 'final_volume_ml'],
      algorithm: [
        '1) Calcular dose total por hora (mg/h): dose_mgkg_h × peso_kg',
        '2) Converter para mL/h: (mg/h) ÷ (concentracao_mg_ml)',
        '3) (Opcional) Se preparar seringa: mg totais na seringa = concentracao_mg_ml × volume_final_ml',
        '4) (Opcional) Duração da seringa (h) = (mg totais na seringa) ÷ (mg/h)',
      ],
      conversions: [],
      hard_safety_checks: [
        {
          if: 'dose_mgkg_h > 0.3',
          then: 'BLOCK',
          message: 'CRI acima do teto configurado para metadona (0,3 mg/kg/h). Reavalie.',
        },
        {
          if: 'drug_concentration_mg_ml <= 0',
          then: 'BLOCK',
          message: 'Concentração inválida.',
        },
      ],
      soft_safety_checks: [
        {
          if: "patient_has('respiratory_disease') || patient_has('brachycephalic')",
          then: 'WARN',
          message: 'Risco respiratório: reduza dose e intensifique monitorização (SpO2/EtCO2).',
        },
        {
          if: "patient_has('hepatic_disease')",
          then: 'WARN',
          message: 'Hepatopatia: risco de efeito prolongado/acúmulo. Considere reduzir e espaçar.',
        },
      ],
      outputs: ['rate_ml_h', 'dose_mg_h', 'syringe_duration_h'],
      error_cost: 'Superdose aumenta risco de depressão respiratória grave.',
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg', 'drug_concentration_mg_ml'],
      algorithm: [
        '1) Dose total (mg) = dose_mgkg × peso_kg',
        '2) Volume (mL) = mg ÷ concentracao_mg_ml',
        '3) Se IV: administrar lentamente e titular ao efeito',
      ],
      hard_safety_checks: [
        {
          if: "dose_mgkg > 1.0 && species == 'dog'",
          then: 'WARN',
          message: 'Dose acima do topo recomendado para cães (1 mg/kg IM/IV). Titular com cautela.',
        },
        {
          if: "dose_mgkg > 0.5 && species == 'cat'",
          then: 'WARN',
          message: 'Dose acima do topo recomendado para gatos (0,5 mg/kg IM/IV). Titular com cautela.',
        },
      ],
      soft_safety_checks: [
        {
          if: "route == 'SC'",
          then: 'INFO',
          message: 'Via SC pode ter absorção mais variável; reavaliar antes de redose.',
        },
      ],
      outputs: ['bolus_volume_ml', 'bolus_mg'],
      error_cost: 'Erro mg↔mL em 10 mg/mL pode causar depressão respiratória.',
    },
    dilution_builder: {
      required_inputs: ['desired_concentration_mg_ml', 'final_volume_ml'],
      algorithm: [
        '1) Calcular mg totais necessários: desired_concentration × final_volume',
        '2) Calcular volume de metadona 10 mg/mL: mg_totais ÷ 10',
        '3) Completar com diluente até o volume final',
        '4) Rotular: concentração final, data/hora, responsável',
      ],
      hard_safety_checks: [
        {
          if: 'desired_concentration_mg_ml > 10',
          then: 'BLOCK',
          message: 'Concentração desejada não pode exceder a apresentação original (10 mg/mL).',
        },
      ],
      soft_safety_checks: [
        {
          if: 'desired_concentration_mg_ml < 0.2',
          then: 'WARN',
          message: 'Diluição muito baixa aumenta risco de volume grande e erro de administração; confira viabilidade.',
        },
      ],
      outputs: ['drug_volume_ml', 'diluent_volume_ml', 'final_concentration_mg_ml'],
      error_cost: 'Diluição incorreta pode levar a subdose (dor) ou superdose (depressão respiratória).',
    },
  },

  // Seção 13: Bloco Didático
  how_we_got_here_block: {
    title: 'Como chegamos a este resultado (Metadona – bolus/CRI)',
    render_steps: [
      {
        step: 1,
        label: 'Converter dose em mg',
        formula: 'mg = (dose mg/kg) × (peso kg)',
      },
      {
        step: 2,
        label: 'Converter mg em mL',
        formula: 'mL = (mg) ÷ (concentração mg/mL)',
      },
      {
        step: 3,
        label: 'CRI (se aplicável)',
        formula: 'mg/h = (dose mg/kg/h) × (peso kg) ; mL/h = (mg/h) ÷ (mg/mL)',
      },
    ],
    interpretation_rules: [
      'Sedação ≠ analgesia: sempre reavaliar por escala de dor (não apenas "está quieto").',
      'Se FR cai ou EtCO2 sobe, a prioridade é ventilação/suporte e redução de opioide.',
      'Via SC pode atrasar e ser variável: evite redose precoce "por ansiedade" antes do tempo de pico.',
    ],
    example: {
      scenario: 'Cão 20 kg, metadona 0,5 mg/kg IV, frasco 10 mg/mL',
      calculation: ['mg = 0,5 × 20 = 10 mg', 'mL = 10 ÷ 10 = 1,0 mL (administrar lentamente IV)'],
      result: 'Volume = 1,0 mL',
    },
  },

  // Seção 14: Integrações
  protocol_integrations: {
    enabled: true,
    protocols: ['Premedicação multimodal', 'Neuroleptoanalgesia', 'Sedação para pacientes especiais (geriátricos, obesos, DRC)'],
    why_combo_exists:
      'Metadona fornece analgesia potente, mas associações permitem reduzir dose total e melhorar sedação/controle de ansiedade, mantendo monitorização respiratória.',
    rules: [
      {
        if: "patient_has('respiratory_disease') || patient_has('brachycephalic')",
        then: {
          action: 'REDUCE_DOSE',
          factor: 0.75,
          message: 'Risco respiratório: iniciar ~25% menor e titular ao efeito com SpO2/EtCO2.',
        },
      },
      {
        if: "patient_has('hepatic_disease')",
        then: {
          action: 'REDUCE_DOSE',
          factor: 0.8,
          message: 'Hepatopatia: reduzir e espaçar; evitar empilhamento.',
        },
      },
    ],
  },

  // Seção 15: Fluxogramas
  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'methadone_periop_use',
        title: 'Uso perioperatório de metadona (cão/gato)',
        mermaid:
          'flowchart TD\nA[Definir objetivo: analgesia perioperatória / sedação] --> B{Risco respiratório alto?}\nB -- Sim --> C[Reduzir dose inicial 20–30% + preferir IV lento + monitorar SpO2/EtCO2]\nB -- Não --> D[Escolher dose na faixa e via IV/IM]\nC --> E[Reavaliar dor e ventilação em 10–20 min]\nD --> E\nE --> F{Dor controlada?}\nF -- Sim --> G[Manter e programar redose guiada por escala]\nF -- Não --> H[Adicionar multimodal (bloqueio local/AINE/cetamina baixa dose) antes de subir metadona]\nH --> E',
      },
    ],
  },

  // Seção 16: UI Copy
  ui_copy: {
    critical_warning_banner: 'Metadona deprime respiração de forma dose-dependente — titule e monitore (SpO2/EtCO2), principalmente em pacientes respiratórios.',
    alert_messages: {
      short: 'Risco respiratório: monitorar e titular.',
      long: 'Metadona é agonista μ completo e pode causar depressão respiratória dose-dependente, especialmente em associação com outros depressores de SNC. Prefira IV lento/IM previsível e evite empilhamento; via SC pode ser mais variável.',
    },
    block_message: 'Uso bloqueado: paciente de alto risco respiratório sem monitorização/suporte ventilatório disponível.',
    common_errors: [
      'Confundir sedação com analgesia e não usar escala de dor',
      'Redose precoce antes do pico (principalmente IM/SC)',
      'Erro mg↔mL em frasco 10 mg/mL',
      'Associação de múltiplos depressores sem monitorização (SpO2/EtCO2)',
    ],
  },

  // Seção 17: Referências
  references: [
    {
      section: 'doses',
      source: 'Veterinary Anesthesia and Analgesia (Lumb and Jones), 6th ed. — Chapter 23 (Opioids), Table 23.8',
      page: '375',
      edition: '6th',
      year: 2022,
    },
    {
      section: 'mechanism/pharmacodynamics/species notes/interactions',
      source: 'Veterinary Anesthesia and Analgesia (Lumb and Jones), 6th ed. — Chapter 23 (Opioids): seção "Methadone" (Dogs and cats)',
      page: '377–378',
      edition: '6th',
      year: 2022,
    },
    {
      section: 'duration/quick dosing pearls',
      source: 'Guia Prático de Sedação e Analgesia na Rotina de Cães e Gatos (2023) — Direto ao ponto: Analgésicos (Metadona)',
      page: '45',
      edition: '2023',
      year: 2023,
    },
    {
      section: 'patient special adjustments (obesos/geriátricos) e faixas práticas',
      source: 'Guia Prático de Sedação e Analgesia na Rotina de Cães e Gatos (2023) — Direto ao ponto: Pacientes especiais',
      page: '37–38',
      edition: '2023',
      year: 2023,
    },
    {
      section: 'presentations',
      source: 'Comfortan 10 mg/mL solution for injection for dogs and cats — Summary of Product Characteristics (HPRA)',
      year: 2023,
    },
  ],
}
