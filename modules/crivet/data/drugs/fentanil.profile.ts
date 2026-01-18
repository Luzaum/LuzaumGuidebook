import type { DrugProfile } from '../../types/drugProfile'

export const fentanilProfile: DrugProfile = {
  // Seção 1: Identidade
  drug_id: 'fentanil',
  name_pt: 'Fentanil (citrato de fentanil)',
  name_en: 'Fentanyl (fentanyl citrate)',
  synonyms: ['Fentanil', 'Fentanyl citrate', 'Sublimaze (varia por país/mercado)', 'Duragesic (adesivo transdérmico; varia por país/mercado)', 'Fentanil patch (transdérmico)'],
  class: ['Opioide agonista μ (mu) de alta potência', 'Fenilpiperidina (opioide sintético)', 'Analgesia perioperatória de curta duração (IV) / CRI', 'Anestésico-sparing (reduz MAC e necessidade de hipnóticos)'],

  // Seção 2: Perfil Farmacológico
  core_concepts: {
    taglines: [
      'Agonista μ muito potente (≈ 75–100× morfina): analgesia forte com início rápido e duração curta após bolus IV.',
      'Ideal em CRI por curta duração e titulação fina; pode causar bradicardia e depressão respiratória dose-dependentes.',
      'Em gatos pode causar euforia/hiperatividade (mais comum em doses IV mais altas).',
      'Extravasamento não é a maior "dor" aqui: o risco real é apneia/hipoventilação e recuperação disfórica após CRI prolongada.',
    ],
    mechanism: {
      receptors_targets: ['Receptor μ-opioide (principal)'],
      primary_effects: {
        cardiovascular:
          'Geralmente pouca depressão hemodinâmica; pode causar bradicardia vagal e, raramente, eventos graves após bolus IV (ex.: bradicardia severa/asistolia relatadas).',
        respiratory:
          'Depressão respiratória dose-dependente; em doses altas pode ocorrer hipoventilação/cianose. Rigidez de parede torácica é descrita em humanos; em cães não foi evidenciada em relatos citados.',
        cns: 'Analgesia potente; sedação variável. Pode ocorrer disforia/recuperação agitada, especialmente após CRI prolongada em cães; em gatos pode haver euforia/hiperatividade.',
        renal_hepatic:
          'Sem nefrotoxicidade direta; metabolismo/eliminações típicas de opioides exigem titulação em disfunções graves (ênfase clínica: efeito e monitorização).',
        gi: 'Menor tendência a vômito em cães (descrito como não indutor de vômito em cães); constipação/íleo são riscos gerais de opioides.',
      },
      clinical_metaphor:
        '"Dimmer da dor com risco de apagar a respiração": você baixa a dor muito rápido, mas se girar demais (dose/associação), o centro respiratório "escurece" e o paciente hipoventila.',
    },
    pharmacodynamics: {
      onset_iv: 'rápido (efeito em minutos; titulável IV)',
      onset_im: 'não é via preferida de rotina para fentanyl injetável no contexto do CRIVET (uso típico: IV/CRI)',
      peak: 'minutos após bolus IV / mudanças de taxa',
      duration: 'curta após bolus (redistribuição rápida); por isso é frequentemente usado em CRI',
      dependencies: [
        'Dose e velocidade do bolus (bradicardia/apneia/hipoventilação)',
        'Duração da CRI (maior risco de disforia no pós-extubação)',
        'Associação com outros depressores (propofol, inalantes, benzos, alfa-2)',
        'Espécie (gatos: euforia/hiperatividade mais comum em doses IV mais altas)',
      ],
    },
    pharmacokinetics: {
      metabolism:
        'Lipofílico e altamente ligado a proteínas; curta duração após bolus por redistribuição rápida do compartimento central para periférico.',
      excretion: 'Eliminação final via metabólitos (ênfase clínica: meia-vida funcional curta e necessidade de CRI para manutenção do efeito).',
      dog_vs_cat:
        'Em cães, CRI por horas é clinicamente útil; em gatos, CRI pode produzir antinocicepção, mas o efeito tende a ser curto após cessar a infusão e doses mais baixas podem falhar em elevar limiares térmicos.',
      active_metabolites: 'Sem foco clínico relevante no uso imediato; o manejo é titulação por efeito.',
      accumulation:
        'Pode haver efeitos cumulativos por CRI prolongada (contexto-dependente em humanos); em cães foi citada utilidade clínica sem relato de grande acúmulo em infusão de 4 h, porém o risco prático é recuperação disfórica/hipoventilação com taxas altas e múltiplos depressores.',
    },
  },

  species_notes: {
    dogs: {
      key_point:
        'Excelente para analgesia aguda e anestesia-sparing, frequentemente em CRI; monitorar bradicardia e ventilação. Disforia no pós-op pode ocorrer após CRI prolongada.',
      high_risk_notes: [
        'Bradicardia vagal e depressão respiratória dose-dependentes.',
        'Disforia após CRI prolongada (pós-extubação) — pode melhorar com dexmedetomidina em bolus muito baixo e lento.',
        'Eventos raros graves relatados após bolus (bradicardia severa/asistolia).',
      ],
      metabolism_excretion: 'Lipofílico, curta duração por redistribuição; manutenção clínica geralmente exige CRI.',
    },
    cats: {
      key_point:
        'Útil para analgesia potente; pode causar euforia/hiperatividade (mais com doses IV mais altas). CRI ~5 µg/kg/h mostrou antinocicepção; ao cessar, efeito pode ser curto.',
      high_risk_notes: [
        'Euforia/hiperatividade/locomoção aumentada (mais comum com doses IV mais altas).',
        'Depressão respiratória com bolus/associações; monitorização ventilatória é crítica.',
      ],
      metabolism_excretion: 'Curta duração; efeito pós-CRI pode ser breve — planejar transição analgésica.',
    },
  },

  // Seção 3: Indicações e Contraindicações
  indications: {
    primary: [
      'Analgesia perioperatória e de emergência (dor aguda moderada a intensa).',
      'CRI intraoperatória para analgesia e redução de MAC/necessidade de anestésico inalatório/hipnótico.',
      'Analgesia pós-operatória por CRI (quando há monitorização adequada).',
    ],
    secondary: [
      'Sedação/anestesia em combinação (opioide como componente de protocolos multimodais).',
      'Uso transdérmico (adesivo) para analgesia pós-operatória prolongada (72–96 h), com início tardio.',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Ausência de capacidade de monitorar ventilação (SpO2/EtCO2) e intervir (oxigênio/ventilação assistida) em paciente que receberá fentanyl IV/CRI',
        why: 'Depressão respiratória pode ser rápida e grave, especialmente com associações e doses altas.',
        level: 'CRITICAL',
      },
    ],
    relative: [
      {
        condition: 'Doença respiratória significativa / hipoventilação / risco de hipercapnia',
        why: 'Opioides deprimem ventilação; hipercapnia e hipóxia podem piorar rapidamente sem suporte.',
        level: 'WARNING',
      },
      {
        condition: 'TCE/ICP elevada (especialmente se ventilação não controlada)',
        why: 'Risco indireto por hipoventilação → hipercapnia → vasodilatação cerebral → piora de ICP; usar somente com controle ventilatório.',
        level: 'WARNING',
      },
      {
        condition: 'Bradicardia significativa / distúrbios de condução',
        why: 'Pode exacerbar bradicardia vagal; monitorar ECG e tratar conforme necessidade clínica.',
        level: 'MONITOR',
      },
      {
        condition: 'Hepatopatia grave / paciente crítico com depuração imprevisível',
        why: 'Titulação deve ser ainda mais conservadora; risco de efeitos prolongados/variabilidade.',
        level: 'MONITOR',
      },
    ],
  },

  // Seção 4: Doses
  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      bolus: {
        mgkg: { min: 0, max: 0, note: 'N/A (usar µg/kg).' },
        mcgkg: {
          min: 1,
          max: 5,
          note: 'IV (bolus); em emergência/analgesia também há referência prática: 2–5 µg/kg IV lento.',
        },
        ukg: { min: 1, max: 5, note: 'Equivalente a mcg/kg.' },
        route: 'IV',
        loading_dose: { min: 1, max: 5 },
      },
      cri: {
        mcgkgmin: {
          min: 0.033,
          max: 0.333,
          note: 'Conversão do intervalo 2–20 µg/kg/h (×/60). Faixa "típica" em emergência: 2–5 µg/kg/h (=0.033–0.083 µg/kg/min).',
        },
        mgkgh: { min: 0, max: 0, note: 'Não usar mg/kg/h para fentanyl (padrão µg).' },
        titration: {
          increment: 'Subir gradualmente (ex.: 2→3→5→10 µg/kg/h conforme dor e ventilação)',
          interval: 'Reavaliar em 5–10 min após ajuste (dor, EtCO2/SpO2, FC/PA).',
        },
        max: 0.333,
      },
      adjustments: {
        obesity: 'Preferir iniciar por peso ideal/magro (especialmente em CRI) e titular por efeito/EtCO2.',
        shock:
          'Em choque, analgesia é benéfica, mas titular conservador; hipotermia/acidose e outros depressores aumentam risco ventilatório.',
        hypoalbuminemia: 'Alta ligação proteica → fração livre pode ↑; iniciar mais baixo e titular.',
        comorbidities:
          'Doença respiratória/TCE sem ventilação controlada: reduzir e monitorar rigorosamente; bradicardia: estar pronto para anticolinérgico se clinicamente indicado; hepatopata grave: iniciar baixo e reavaliar frequentemente.',
      },
      therapeutic_targets: {
        target_map: 'N/A',
        target_etco2: 'Manter EtCO2 dentro do alvo institucional (ex.: normocapnia) e evitar hipoventilação.',
        analgesia_scale: 'Redução objetiva de dor (≥2 pontos na escala usada) e menor necessidade de resgates.',
        sedation_target: 'Sedação compatível com conforto/ventilação segura; evitar depressão respiratória.',
      },
    },
    cat: {
      bolus: {
        mgkg: { min: 0, max: 0, note: 'N/A (usar µg/kg).' },
        mcgkg: {
          min: 2,
          max: 5,
          note: 'Referência prática em emergência: 2–5 µg/kg IV lento. Atenção a euforia/hiperatividade em doses IV mais altas (>20 µg/kg).',
        },
        ukg: { min: 2, max: 5, note: 'Equivalente a mcg/kg.' },
        route: 'IV',
        loading_dose: { min: 2, max: 5 },
      },
      cri: {
        mcgkgmin: {
          min: 0.033,
          max: 0.333,
          note: 'Conversão do intervalo 2–20 µg/kg/h. Evidência citada: CRI 5 µg/kg/h (0.083 µg/kg/min) gerou antinocicepção; 3 µg/kg/h pode ser insuficiente para limiar térmico.',
        },
        mgkgh: { min: 0, max: 0, note: 'Não usar mg/kg/h para fentanyl (padrão µg).' },
        titration: {
          increment: '2→3→5 µg/kg/h (subir conforme dor; vigiar euforia/ventilação)',
          interval: 'Reavaliar em 5–10 min após ajuste.',
        },
        max: 0.333,
      },
      adjustments: {
        obesity: 'Preferir peso ideal e titulação fina.',
        shock: 'Titular conservador (sensibilidade a depressores e hipotermia).',
        hypoalbuminemia: 'Pode ↑ fração livre; iniciar baixo e titular.',
        comorbidities:
          'Doença respiratória/TCE sem ventilação controlada: reduzir e monitorar intensamente; cardiopatia com bradicardia: monitorar ECG; planejar transição analgésica ao interromper CRI (efeito pode ser curto).',
      },
      therapeutic_targets: {
        target_map: 'N/A',
        target_etco2: 'Evitar hipoventilação/hipercapnia (EtCO2 monitorado quando sedação/anestesia).',
        analgesia_scale: 'Analgesia objetiva com menor estresse e menor necessidade de resgates.',
        sedation_target: 'Conforto sem euforia/hiperatividade marcante; ventilação segura.',
      },
    },
  },

  // Seção 5: Apresentações
  presentations: [
    {
      concentration_mcg_ml: 50,
      concentration_mg_ml: 0.05,
      volume_ml: 2,
      total_mg: 0.1,
      label: '50 µg/mL (0,05 mg/mL) — ampola 2 mL',
      examples: ['genéricos (varia por país/marca)'],
      concentration_trap_warning: 'Conferir unidade (µg/mL vs mg/mL). Erro de 10× é comum se alguém "lê" mg como µg.',
    },
    {
      concentration_mcg_ml: 50,
      concentration_mg_ml: 0.05,
      volume_ml: 10,
      total_mg: 0.5,
      label: '50 µg/mL (0,05 mg/mL) — frasco 10 mL (varia por país)',
      examples: ['genéricos (varia por país/marca)'],
      concentration_trap_warning: 'Rotular sempre seringa/bolsa com µg/mL e dose alvo.',
    },
    {
      label: 'Adesivo transdérmico — 25 µg/h',
      examples: ['patch 25 µg/h (varia por marca/mercado)'],
      concentration_trap_warning: 'Início tardio (horas); não serve como analgesia imediata.',
    },
    {
      label: 'Adesivo transdérmico — 50/75/100 µg/h',
      examples: ['patch 50, 75, 100 µg/h (varia por marca/mercado)'],
      concentration_trap_warning: 'Grande variabilidade de absorção; risco de sub/superanalgesia.',
    },
  ],

  // Seção 6: Diluição
  dilution_and_preparation: {
    hard_rules: [
      'CRI deve ser feita com bomba e rotulagem em µg/mL e µg/kg/h (ou µg/kg/min).',
      'Bolus IV deve ser lento para reduzir risco de bradicardia/apneia.',
      'Se CRI foi prolongada e há risco de disforia na recuperação, planejar transição analgésica e considerar estratégia de suavizar recuperação (ex.: microbolus de dexmedetomidina lento IV conforme literatura).',
    ],
    recommended_targets: [
      {
        target_mg_ml: 0.01,
        use_cases: ['CRI em bomba de seringa com taxas em mL/h mais confortáveis', 'Pacientes pequenos (reduz erro)'],
        how_to_make: 'Alvo 10 µg/mL (0,01 mg/mL) é prático para CRI.',
        recipe: 'Retirar 2 mL (100 µg) de fentanyl 50 µg/mL e completar para 10 mL com diluente = 10 µg/mL.',
      },
      {
        target_mg_ml: 0.005,
        use_cases: ['Neonatos/pacientes muito pequenos ou quando se deseja maior precisão de taxa'],
        how_to_make: 'Alvo 5 µg/mL (0,005 mg/mL).',
        recipe: 'Misturar 1 mL (50 µg) de fentanyl 50 µg/mL em volume final 10 mL = 5 µg/mL.',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5% (D5W)'],
    preferred_diluent: {
      diluent: 'NaCl 0,9%',
      why: 'Padronização e disponibilidade ampla para CRI em seringa; facilita dupla checagem.',
    },
    stability: [
      {
        diluent: 'NaCl 0,9%',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Trocar seringa/bolsa pelo menos a cada 24 h (ou conforme rotina institucional).',
      },
      {
        diluent: 'Glicose 5% (D5W)',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Trocar seringa/bolsa pelo menos a cada 24 h.',
      },
    ],
    dedicated_line_required: false,
    dedicated_line_why: 'Recomendável em UTI/anestesia com múltiplas infusões; não é obrigatória se compatibilidade e flush forem garantidos.',
  },

  // Seção 7: Compatibilidade
  compatibility: {
    diluents_allowed: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5% (D5W)'],
    diluents_ok: ['NaCl 0,9%', 'Ringer Lactato', 'D5W'],
    diluentsAllowed: ['NaCl 0,9%', 'Ringer Lactato', 'D5W'],
    diluents: ['NaCl 0,9%', 'Ringer Lactato', 'D5W'],
    compatible_in_syringe_or_bag: [
      'Protocolos multimodais com coadministração (não necessariamente na mesma seringa): lidocaína e cetamina (conceito MLK).',
      'Em prática, preferir padronização do serviço para misturas na mesma seringa/bolsa.',
    ],
    compatible_y_site_only: ['Se necessário, usar Y-site com flush e observação; preferir não misturar sem validação institucional.'],
    incompatible: [
      {
        agent: 'Misturas múltiplas sem validação (mesma seringa/bolsa)',
        why: 'Risco de incompatibilidade físico-química e erro de dose; padronizar protocolos.',
        risk: 'precipitação',
      },
    ],
    avoid_same_syringe_or_precipitation_risk: [
      'Evitar misturar com fármacos sem compatibilidade confirmada (principalmente soluções com solventes especiais).',
    ],
    dedicated_line_rules: [
      'Preferir linha dedicada quando múltiplos CRIs simultâneos.',
      'Se via compartilhada: flush antes/depois e checar turvação/precipitação.',
    ],
  },

  // Seção 8: Administração e Titulação
  administration_and_titration: {
    bolus_guidance: [
      'IV lento (reduz bradicardia/apneia).',
      'Sempre com prontidão para suporte ventilatório, especialmente se associado a outros depressores.',
    ],
    titration_rules: [
      'Preferir CRI para manutenção: iniciar baixo e titular conforme dor e ventilação.',
      'Reavaliar em 5–10 min após ajuste (mais rápido se PA/EtCO2 contínuos).',
      'Planejar "desmame" e transição para analgésicos de maior duração antes de interromper CRI (efeito pós-cessação pode ser curto, especialmente em gatos).',
    ],
    monitoring_minimum: ['FC/ritmo (ECG)', 'FR e esforço respiratório', 'SpO2', 'EtCO2 (ideal em anestesia/sedação profunda)', 'Temperatura', 'Dor (escala) e necessidade de resgates'],
    endpoints: {
      desired_effect: ['Analgesia adequada (queda na escala de dor e menor estresse)', 'MAC-sparing intraoperatório (menos inalante/hipnótico mantendo estabilidade)'],
      toxicity_signs: ['Bradipneia/hipoventilação/apneia', 'Cianose', 'Bradicardia marcada', 'Disforia/recuperação agitada', 'Euforia/hiperatividade (gatos)'],
    },
    therapeutic_failure: {
      check_first: [
        'Dose insuficiente vs dor severa (precisa escalar ou adicionar regional/anti-inflamatório quando possível)',
        'Hiperalgesia/estimulação intensa (precisa multimodal)',
        'Falha de via/infusão (bomba/linha)',
      ],
      common_causes: [
        'Procedimento mais doloroso do que o esperado sem analgesia regional',
        'Interrupções/bolsas vazias/erro de concentração (µg/mL)',
      ],
      when_to_change: [
        'Se depressão respiratória limita: reduzir fentanyl e reforçar analgesia com alternativas (regional, ketamina baixa dose, etc.).',
        'Se disforia importante: reduzir/cessar e ajustar protocolo de recuperação.',
      ],
    },
  },

  // Seção 9: Efeitos Adversos
  adverse_effects_and_toxicity: {
    common: ['Depressão respiratória (dose-dependente)', 'Bradicardia', 'Sedação variável', 'Disforia na recuperação (especialmente após CRI prolongada em cães)'],
    serious: [
      'Hipoventilação/cianose em doses altas',
      'Eventos graves após bolus IV (bradicardia severa/asistolia relatadas em cães)',
      'Possível rigidez de parede torácica (descrita em humanos; considerar no diferencial se ventilação piora abruptamente)',
    ],
    subdose_signs: ['Dor persistente e necessidade de resgates frequentes', 'Aumento de resposta simpática à dor (taquicardia/hipertensão em paciente consciente)'],
    overdose_signs: ['Bradipneia/apneia', 'Hipercapnia (EtCO2 subindo)', 'Bradicardia marcada', 'Recuperação muito sedada ou paradoxalmente disfórica'],
    management: [
      'Reduzir/cessar infusão; garantir via aérea e ventilação assistida se necessário.',
      'Tratar bradicardia se clinicamente relevante (avaliar perfusão/PA).',
      'Considerar antagonismo com naloxona quando risco/benefício justificar (lembrar: reverte analgesia).',
      'Planejar transição analgésica para reduzir "rebote" de dor ao parar CRI.',
    ],
    special_events: [
      {
        event: 'disforia pós-CRI (cães)',
        management: 'Reduzir/cessar; considerar microbolus lento de dexmedetomidina para melhorar recuperação (descrição em Lumb & Jones).',
      },
      {
        event: 'euforia/hiperatividade (gatos)',
        management: 'Reduzir dose e ajustar associações (benzodiazepínico/ambiente calmo); evitar escalada desnecessária.',
      },
    ],
  },

  // Seção 10: Alertas por Comorbidade
  alerts_by_comorbidity: [
    {
      key: 'fentanyl_resp_disease',
      level: 'WARNING',
      title: 'Doença respiratória/hipoventilação: risco alto com fentanyl',
      why: 'Depressão respiratória dose-dependente; pode precipitar hipercapnia/hipóxia, especialmente com outros depressores.',
      action: ['Iniciar mais baixo e titular lentamente', 'Exigir SpO2 e preferir EtCO2', 'Oxigênio e ventilação assistida prontas'],
      dose_adjustment: { reduce_percent: 30, avoid_bolus: false, require_monitoring: ['SpO2', 'EtCO2 (ideal)', 'FR/esforço'] },
    },
    {
      key: 'fentanyl_head_trauma_icp',
      level: 'WARNING',
      title: 'TCE/ICP elevada: usar só com ventilação controlada',
      why: 'Hipoventilação → hipercapnia → vasodilatação cerebral e potencial piora de ICP.',
      action: ['Se ICP elevada, preferir controle ventilatório (EtCO2 alvo) e titulação conservadora', 'Evitar se não houver suporte'],
      dose_adjustment: { reduce_percent: 25, avoid_bolus: false, require_monitoring: ['EtCO2', 'PA', 'neurológico'] },
    },
    {
      key: 'fentanyl_bradyarrhythmia',
      level: 'MONITOR',
      title: 'Bradicardia/arritmia: monitorar ECG e perfusão',
      why: 'Fentanyl pode causar bradicardia vagal; raramente eventos graves após bolus.',
      action: ['ECG contínuo', 'Bolus IV lento', 'Ter plano de manejo para bradicardia clinicamente significativa'],
    },
    {
      key: 'fentanyl_hepatic_severe',
      level: 'MONITOR',
      title: 'Hepatopatia grave: resposta imprevisível → titular com cautela',
      why: 'Opioides podem ter variabilidade de depuração em doença grave; risco de efeitos prolongados/ventilatórios.',
      action: ['Iniciar em faixa baixa', 'Reavaliar frequentemente', 'Preferir CRI titulada em vez de bolus repetidos'],
    },
    {
      key: 'fentanyl_obesity',
      level: 'MONITOR',
      title: 'Obesidade: risco ventilatório ↑',
      why: 'Obesidade aumenta risco de hipoventilação; opioides agravam depressão ventilatória.',
      action: ['Usar peso ideal para iniciar', 'Monitorar EtCO2/SpO2', 'Titular lentamente'],
    },
  ],

  // Seção 11: Presets
  presets: [
    {
      id: 'ecc_bolus_cri_standard',
      label: 'Emergência (bolus + CRI) 🟨',
      dose_mgkg: 0,
      dose_mcgkgmin: 0.066,
      limits: { min: 0.033, max: 0.083 },
      clinical_target: 'Analgesia aguda com titulação fina (equivale a 2–5 µg/kg/h).',
      linked_alerts: ['fentanyl_resp_disease', 'fentanyl_head_trauma_icp'],
    },
    {
      id: 'intraop_typical',
      label: 'Intraoperatório (típico) 🟧',
      dose_mcgkgmin: 0.166,
      limits: { min: 0.083, max: 0.333 },
      clinical_target: 'MAC-sparing e analgesia cirúrgica (equivale a 5–20 µg/kg/h).',
      linked_alerts: ['fentanyl_resp_disease', 'fentanyl_bradyarrhythmia'],
    },
    {
      id: 'postop_low_monitored',
      label: 'Pós-operatório (baixo, monitorado) 🟩',
      dose_mcgkgmin: 0.025,
      limits: { min: 0.017, max: 0.033 },
      clinical_target: 'Manter analgesia com vigilância respiratória (≈1–2 µg/kg/h).',
      linked_alerts: ['fentanyl_resp_disease'],
    },
  ],

  // Seção 12: Templates de Cálculo
  calculation_templates: {
    cri: {
      required_inputs: ['weight_kg', 'dose_mcgkgmin', 'final_concentration_mcg_ml'],
      algorithm: [
        'Dose total (mcg/min) = dose_mcgkgmin × weight_kg',
        'Dose total (mcg/h) = dose_total_mcg_min × 60',
        'Taxa (mL/h) = dose_total_mcg_h ÷ final_concentration_mcg_ml',
      ],
      conversions: [
        'Se a dose estiver em µg/kg/h: converter para µg/kg/min dividindo por 60.',
        'Se a concentração estiver em mg/mL: converter para µg/mL multiplicando por 1000.',
      ],
      hard_safety_checks: [
        {
          if: 'final_concentration_mcg_ml <= 0',
          then: 'BLOCK',
          message: 'Concentração inválida (µg/mL).',
        },
        {
          if: 'no_monitoring("respiratory_support")',
          then: 'WARN',
          message: 'Fentanyl IV/CRI exige monitorização e capacidade de intervir na ventilação.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'dose_mcgkgmin > 0.333',
          then: 'WARN',
          message: 'Acima de 20 µg/kg/h: risco de hipoventilação/bradicardia/disforia aumenta.',
        },
        {
          if: "has_comorbidity('respiratory_disease')",
          then: 'WARN',
          message: 'Doença respiratória: iniciar mais baixo e monitorar EtCO2/SpO2.',
        },
        {
          if: "has_comorbidity('obesity')",
          then: 'INFO',
          message: 'Obesidade: usar peso ideal para iniciar e titular.',
        },
      ],
      outputs: ['dose_total_mcg_min', 'dose_total_mcg_h', 'rate_ml_h'],
      error_cost: 'Superdose pode causar apneia/hipercapnia, bradicardia e eventos graves; subdose mantém dor e instabilidade.',
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_mcgkg', 'drug_concentration_mcg_ml'],
      algorithm: ['Dose total (mcg) = dose_mcgkg × weight_kg', 'Volume (mL) = dose_total_mcg ÷ drug_concentration_mcg_ml'],
      conversions: ['Se concentração em mg/mL: mg/mL × 1000 = µg/mL.'],
      hard_safety_checks: [
        {
          if: 'dose_mcgkg > 10',
          then: 'WARN',
          message: 'Bolus alto aumenta risco de bradicardia/apneia; administrar IV lento e reavaliar.',
        },
      ],
      soft_safety_checks: [
        {
          if: "has_comorbidity('respiratory_disease')",
          then: 'WARN',
          message: 'Doença respiratória: reduzir bolus e monitorar ventilação.',
        },
      ],
      outputs: ['dose_total_mcg', 'volume_ml'],
      error_cost: 'Erro de unidade (mg vs µg) é a falha mais perigosa — checar sempre.',
    },
    dilution_builder: {
      required_inputs: ['stock_concentration_mcg_ml', 'stock_volume_ml', 'diluent_volume_ml'],
      algorithm: [
        'Total (mcg) = stock_concentration_mcg_ml × stock_volume_ml',
        'Volume final (mL) = stock_volume_ml + diluent_volume_ml',
        'Concentração final (mcg/mL) = total_mcg ÷ volume_final_ml',
      ],
      hard_safety_checks: [
        {
          if: 'stock_concentration_mcg_ml <= 0',
          then: 'BLOCK',
          message: 'Concentração estoque inválida.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'final_concentration_mcg_ml < 2 || final_concentration_mcg_ml > 50',
          then: 'INFO',
          message: 'Concentração final incomum; revisar para garantir taxa (mL/h) prática e reduzir risco de erro.',
        },
      ],
      outputs: ['final_concentration_mcg_ml', 'final_volume_ml'],
      error_cost: 'Concentração errada muda diretamente mL/h calculado → subdose (dor) ou overdose (apneia).',
    },
  },

  // Seção 13: Bloco Didático
  how_we_got_here_block: {
    title: 'Como chegamos a este resultado (Fentanil CRI)',
    render_steps: [
      { step: 1, label: 'Dose por minuto', formula: 'mcg/min = (mcg/kg/min) × peso(kg)' },
      { step: 2, label: 'Converter para hora', formula: 'mcg/h = (mcg/min) × 60' },
      { step: 3, label: 'Converter para taxa', formula: 'mL/h = (mcg/h) ÷ concentração(mcg/mL)' },
    ],
    interpretation_rules: [
      'Opioide potente = analgesia forte, mas ventilação é o limitador: sempre monitorar.',
      'Se dor persiste com dose moderada, pense multimodal (regional/AINE/ketamina baixa dose) antes de escalar agressivamente.',
      'Ao parar CRI, planejar transição para opioide de maior duração/analgésico multimodal para evitar rebote de dor.',
    ],
    example: {
      scenario: 'Cão 10 kg, CRI 0,083 µg/kg/min (≈5 µg/kg/h), solução 10 µg/mL',
      calculation: ['mcg/min = 0,083 × 10 = 0,83 mcg/min', 'mcg/h = 0,83 × 60 = 49,8 mcg/h', 'mL/h = 49,8 ÷ 10 = 4,98 mL/h'],
      result: 'Programar ~5,0 mL/h; reavaliar dor e EtCO2/SpO2 em 5–10 min após ajustes.',
    },
  },

  // Seção 14: Integrações
  protocol_integrations: {
    enabled: true,
    protocols: ['analgesia_multimodal', 'anestesia_balanceada', 'uti_analgesia', 'MLK (conceito)'],
    why_combo_exists:
      'Fentanil é excelente para analgesia intensa e MAC-sparing, mas tem curta duração e risco ventilatório; por isso se integra bem a protocolos multimodais (regional, ketamina baixa dose, lidocaína em cães) para reduzir dose e efeitos adversos.',
    rules: [
      {
        if: "has_comorbidity('respiratory_disease')",
        then: {
          action: 'REDUCE_DOSE',
          drug_id: 'fentanil',
          factor: 0.7,
          message: 'Doença respiratória: iniciar mais baixo e exigir EtCO2/SpO2.',
        },
      },
      {
        if: "has_comorbidity('icp_elevated') && !has_monitoring('EtCO2')",
        then: {
          action: 'PREFER_ALTERNATIVE',
          drug_id: 'fentanil',
          message: 'Suspeita de ICP elevada sem EtCO2/ventilação controlada: evitar por risco de hipercapnia.',
        },
      },
    ],
  },

  // Seção 15: Fluxogramas
  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'fentanyl_cri_pain',
        title: 'Fentanil CRI — titulação por dor e ventilação',
        mermaid:
          'flowchart TD\nA[Dor aguda moderada-intensa] --> B{Monitorização respiratória disponível? (SpO2/EtCO2)}\nB -- Não --> C[Preferir alternativa/analgesia regional + opioide de duração maior]\nB -- Sim --> D[Bolus IV lento 2–5 µg/kg]\nD --> E[Iniciar CRI 2–5 µg/kg/h]\nE --> F[Reavaliar em 5–10 min: dor + EtCO2/SpO2 + FC]\nF --> G{Analgesia adequada e ventilação ok?}\nG -- Sim --> H[Manter e planejar transição antes de parar]\nG -- Não, dor --> I[Escalar gradualmente (ex.: 5→10→20 µg/kg/h) + adicionar multimodal]\nG -- Não, ventilação ruim/bradicardia --> J[Reduzir/cessar + suporte ventilatório; ajustar protocolo]\nI --> F\nJ --> F',
      },
      {
        id: 'fentanyl_patch_postop',
        title: 'Adesivo transdérmico — quando faz sentido',
        mermaid:
          'flowchart TD\nA[Pós-operatório com necessidade de analgesia prolongada] --> B{Precisa de analgesia imediata?}\nB -- Sim --> C[Adesivo NÃO serve sozinho no início -> usar IV/IM/CRI e considerar adesivo como manutenção]\nB -- Não --> D[Considerar patch com orientação e monitorização]\nD --> E[Explicar início tardio e variabilidade]\nE --> F[Reavaliar dor e ajustar multimodal]',
      },
    ],
  },

  // Seção 16: UI Copy
  ui_copy: {
    critical_warning_banner:
      'Fentanil é opioide muito potente e de curta duração: use em CRI titulada e monitore ventilação (ideal EtCO2); bolus IV sempre lento.',
    alert_messages: {
      short: 'Risco principal: hipoventilação/apneia e bradicardia. Monitorar EtCO2/SpO2 e ECG.',
      long: 'Fentanil (μ-agonista, 75–100× morfina) tem início rápido e curta duração após bolus, por isso é ideal em CRI. O limitador clínico é ventilatório: depressão respiratória e bradicardia são dose-dependentes, e cães podem ter disforia após CRI prolongada. Em gatos, euforia/hiperatividade pode ocorrer. Titule por dor + EtCO2/SpO2 e planeje transição analgésica antes de cessar.',
    },
    block_message: 'Uso bloqueado: sem capacidade de monitorar e intervir na ventilação para fentanyl IV/CRI.',
    common_errors: [
      'Confundir mg com µg (erro 10×).',
      'Dar bolus rápido → bradicardia/apneia.',
      'Manter CRI prolongada e parar sem transição → rebote de dor e recuperação ruim.',
      'Usar adesivo esperando analgesia imediata (início tardio).',
    ],
  },

  // Seção 17: Referências
  references: [
    {
      section: 'core_concepts/mechanism/pharmacodynamics/species_notes/adverse_effects',
      source:
        'Veterinary Anesthesia and Analgesia (Lumb & Jones), 6th ed. — Chapter 23 (Opioids), seção Fentanyl (potência 75–100×, curta duração/redistribuição, CRI útil, euforia em gatos, disforia pós-CRI em cães, hipoventilação em doses altas, eventos raros graves, patch dose/onset)',
      page: 'TXT ~25340–25390 e ~25360–25410 (Fentanyl + patch)',
      edition: '6',
    },
    {
      section: 'doses (bolus/CRI cães e gatos em emergência)',
      source: 'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd ed. — tabela de analgésicos (Fentanyl 2–5 µg/kg IV lento + CRI 2–5 µg/kg/h)',
      page: 'TXT ~6888–6920 (Analgesics table)',
      edition: '3',
    },
    {
      section: 'doses (bolus IV 1–5 µg/kg; CRI 2–20 µg/kg/h; pós-op 1–2 µg/kg/h)',
      source: 'Veterinary Anesthesia and Analgesia (Lumb & Jones), 6th ed. — tabela perioperatória (exemplo em contexto cirúrgico; opioids fentanyl dosing)',
      page: 'TXT ~68340–68370',
      edition: '6',
    },
  ],
}
