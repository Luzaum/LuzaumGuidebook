import type { DrugProfile } from '../../types/drugProfile'

export const dexmedetomidinaProfile: DrugProfile = {
  // Seção 1: Identidade
  drug_id: 'dexmedetomidina',
  name_pt: 'Dexmedetomidina',
  name_en: 'Dexmedetomidine',
  synonyms: ['Dexdomitor', 'Dexitor', 'Dexmedocord', 'Sileo (gel oromucosal – cães)'],
  class: ['Agonista alfa-2 adrenérgico (α2-agonista)', 'Sedativo-analgésico', 'Ansiolítico (dependente de dose/via)', 'Adjuvante anestésico (MAC-sparing)'],

  // Seção 2: Perfil Farmacológico
  core_concepts: {
    taglines: [
      'Sedação e analgesia por agonismo α2 central (↓ liberação de noradrenalina no SNC).',
      'Efeito cardiovascular típico é bifásico: vasoconstrição inicial → bradicardia reflexa e ↓ débito cardíaco.',
      'Em doses baixas tardias pode predominar simpatólise central → bradicardia + hipotensão.',
      'Ótima para sedação/analgesia e para reduzir necessidade de inalatório (MAC reduction) em CRI.',
    ],
    mechanism: {
      receptors_targets: ['Receptores α2-adrenérgicos (pré e pós-sinápticos) no SNC', 'Receptores α2 periféricos (vasculatura/tecidos) – efeitos adversos hemodinâmicos'],
      primary_effects: {
        cardiovascular:
          'Bifásico: vasoconstrição periférica (α1/α2B) → ↑ SVR e ↑ PA, com bradicardia reflexa e ↓ débito cardíaco; mais tarde/baixas doses pode haver predomínio de simpatólise central → bradicardia e hipotensão.',
        respiratory: 'Depressão respiratória em geral leve a moderada, porém pode somar com outros depressores; monitorar ventilação/oxigenação.',
        cns: 'Sedação, ansiólise e analgesia; promove relaxamento muscular; pode modular resposta neuroendócrina ao estresse.',
        renal_hepatic:
          'Metabolismo predominantemente hepático para metabólitos inativos; variabilidade ↑ com disfunção hepática/albumina/baixo débito.',
        gi: 'Náusea/vômito (estimulação de zona gatilho quimiorreceptora) e redução de motilidade; pode haver hiperglicemia (↓ insulina).',
      },
      clinical_metaphor:
        'Pense em dois "botões": (1) um "aperto de mangueira" periférico no começo (vasoconstrição → PA sobe e o corpo freia o coração por reflexo), e (2) um "freio do simpático" central que pode dominar depois (PA cai e a bradicardia passa a ser por falta de tônus simpático).',
    },
    pharmacodynamics: {
      onset_iv: 'Rápido (minutos; depende do bolus e velocidade de aplicação).',
      onset_im: 'Rápido a moderado (minutos).',
      peak: 'Minutos após IV/IM (varia com dose/via).',
      duration: 'Sedação/analgesia frequentemente 1–3 h (varia com dose, associação e reversão).',
      dependencies: [
        'Dose e velocidade do bolus (hemodinâmica)',
        'Tônus simpático basal/estresse/dor',
        'Co-administração com opioides/inalatórios (sinergia e depressão somatória)',
        'Estado volêmico e função cardíaca',
      ],
    },
    pharmacokinetics: {
      metabolism: 'Predominantemente hepático (hidroxilação/oxidação/conjugação) para metabólitos farmacologicamente inativos.',
      excretion: 'Eliminação principalmente como metabólitos (via renal/biliar conforme conjugados).',
      dog_vs_cat:
        'Em cães, farmacocinética é semelhante à do racemato medetomidina (efeitos do racemato são atribuídos ao enantiômero ativo – dexmedetomidina). Em gatos, há relatos de meia-vida terminal prolongada após IV em anestesia com isoflurano (ordem de horas), sugerindo potencial de duração maior/variabilidade em cenários de anestesia/doença.',
      active_metabolites: 'Não relevantes clinicamente (metabólitos descritos como inativos).',
      accumulation: 'Pode ocorrer com infusões prolongadas/baixo débito/disfunção hepática; titulação e monitorização são essenciais.',
    },
  },

  species_notes: {
    dogs: {
      key_point:
        'Mais propensos a bradicardia marcante; a bradicardia inicial costuma ser reflexa por vasoconstrição (não tratar automaticamente com atropina).',
      high_risk_notes: [
        'Doença cardíaca (especialmente disfunção sistólica), bradiarritmias',
        'Hipovolemia/desidratação, choque e sepse (piora de débito/perfusão)',
        'Associação com outros depressores (opioides, inalatório, propofol) aumenta risco de hipotensão/hipoventilação',
      ],
      metabolism_excretion: 'Metabolismo hepático; variabilidade ↑ com baixo débito e hipoalbuminemia/disfunção hepática.',
    },
    cats: {
      key_point:
        'Usada amplamente para sedação/analgesia; atenção à bradicardia/hipotermia/vômito; reversão com atipamezol é prática comum.',
      high_risk_notes: [
        'Cardiopatas (p.ex., HCM com risco de baixa perfusão se bradicardia/vasoconstrição importantes)',
        'Hipovolemia/desidratação e sepse',
        'Combinações sedativas podem prolongar recuperação/hipotermia',
      ],
      metabolism_excretion: 'Metabolismo hepático para metabólitos inativos; considerar possível maior variabilidade/duração em anestesia/doença.',
    },
  },

  // Seção 3: Indicações e Contraindicações
  indications: {
    primary: [
      'Sedação e analgesia para facilitar exame clínico e procedimentos pouco a moderadamente dolorosos (cães e gatos).',
      'Premedicação antes de anestesia geral (cães e gatos).',
      'CRI como adjuvante analgésico/sedativo e para reduzir MAC de inalatório (intraop e/ou pós-op/UTI).',
    ],
    secondary: [
      'Controle de agitação/delirium de emergência na recuperação anestésica (bolus baixo IV).',
      'Sedação contínua em UTI (ansiólise/analgesia) com titulação fina.',
      'Uso oromucosal (gel) para ansiedade/fobia a ruídos em cães (formulações específicas).',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Hipersensibilidade conhecida ao fármaco',
        why: 'Risco de reação adversa grave.',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Doença cardíaca significativa (especialmente disfunção sistólica), bradiarritmias/AV block',
        why: 'Efeito hemodinâmico típico inclui bradicardia e redução de débito cardíaco; pode descompensar perfusão.',
        level: 'WARNING',
      },
      {
        condition: 'Hipovolemia/desidratação/choque/sepse',
        why: 'Vasoconstrição e bradicardia podem reduzir entrega de O2 e perfusão tecidual; maior risco de hipotensão tardia.',
        level: 'WARNING',
      },
      {
        condition: 'Doença respiratória grave / risco de hipoventilação',
        why: 'Depressão somatória com outros sedativos/opioides pode comprometer ventilação.',
        level: 'MONITOR',
      },
      {
        condition: 'Hepatopatia importante',
        why: 'Metabolismo hepático com variabilidade ↑; risco de sedação prolongada/acúmulo em CRI.',
        level: 'MONITOR',
      },
      {
        condition: 'Diabetes/hiperglicemia descompensada',
        why: 'Pode elevar glicose por ↓ liberação de insulina (efeito α2 em células beta pancreáticas).',
        level: 'MONITOR',
      },
      {
        condition: 'Glaucoma/condições em que vômito/oscilações de pressão são indesejáveis',
        why: 'Pode induzir náusea/vômito; efeitos em PIO variam por espécie.',
        level: 'MONITOR',
      },
    ],
  },

  // Seção 4: Doses
  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      bolus: {
        mgkg: { min: 0, max: 0, note: 'Preferir padronizar em mcg/kg.' },
        mcgkg: {
          min: 1,
          max: 10,
          note: 'Faixa de sedação/analgesia (IM/IV/SC). Em IV, aplicar lentamente e titular ao efeito.',
        },
        ukg: { min: 0, max: 0, note: 'Não aplicável.' },
        route: 'IV',
        loading_dose: { min: 1, max: 5 },
      },
      cri: {
        mcgkgmin: {
          min: 0.0042,
          max: 0.0333,
          note: 'Equivale a 0,25–2 mcg/kg/h. Preferir iniciar baixo e titular.',
        },
        mgkgh: { min: 0.00025, max: 0.002 },
        titration: {
          increment: 'Escalonar CRI: 0,25 → 0,5 → 1 → 2 mcg/kg/h (≈0,004→0,008→0,017→0,033 mcg/kg/min), conforme sedação/analgesia e hemodinâmica.',
          interval: 'Reavaliar a cada 10–15 min após mudanças (PA/FC/perfusão/temperatura).',
        },
        max: 0.0333,
      },
      adjustments: {
        obesity:
          'Preferir peso magro/ajustado para CRI, pois superdosagem aumenta bradicardia/vasoconstrição e prolonga recuperação.',
        shock: 'Evitar bolus; se absolutamente necessário, usar microdose e titulação rigorosa com correção volêmica/vasopressores conforme caso.',
        hypoalbuminemia: 'Pode aumentar fração livre e efeito; iniciar no menor extremo e titular lentamente.',
        comorbidities:
          'Cardiopatas/bradiarritmias: evitar doses altas e bolus rápido; considerar alternativa (opioide/benzodiazepínico) ou co-uso com antagonista periférico (se disponível) e monitorização intensiva.',
      },
      therapeutic_targets: {
        target_map: 'Manter PAM adequada à perfusão (típico ≥ 60–70 mmHg, individualizar por comorbidades).',
        target_etco2: 'Manter EtCO2 em faixa aceitável (se intubado/ventilado) e SpO2 adequada; evitar hipoventilação por somatória.',
        analgesia_scale: 'Reduzir necessidade de resgate analgésico; ausência de resposta autonômica a estímulos dolorosos.',
        sedation_target: 'Sedação suficiente para procedimento sem perda de perfusão/hipotermia; titulação ao efeito.',
      },
    },
    cat: {
      bolus: {
        mgkg: { min: 0, max: 0, note: 'Preferir padronizar em mcg/kg.' },
        mcgkg: {
          min: 1,
          max: 10,
          note: 'Faixa de sedação/analgesia (IM/IV/SC). Em IV, aplicar lentamente e titular ao efeito.',
        },
        ukg: { min: 0, max: 0, note: 'Não aplicável.' },
        route: 'IV',
        loading_dose: { min: 1, max: 5 },
      },
      cri: {
        mcgkgmin: {
          min: 0.0042,
          max: 0.0333,
          note: 'Equivale a 0,25–2 mcg/kg/h. Iniciar baixo, sobretudo em cardiopatas/hipotérmicos.',
        },
        mgkgh: { min: 0.00025, max: 0.002 },
        titration: {
          increment: 'Escalonar CRI: 0,25 → 0,5 → 1 → 2 mcg/kg/h (≈0,004→0,008→0,017→0,033 mcg/kg/min), conforme resposta e hemodinâmica.',
          interval: 'Reavaliar a cada 10–15 min (PA/FC/perfusão/temperatura).',
        },
        max: 0.0333,
      },
      adjustments: {
        obesity: 'Preferir peso magro/ajustado para CRI; reduzir risco de superdosagem e hipotermia.',
        shock: 'Evitar bolus; se sedação for imprescindível, microdose e titulação lenta com suporte hemodinâmico.',
        hypoalbuminemia: 'Iniciar no menor extremo e titular lentamente; maior sensibilidade pode ocorrer.',
        comorbidities: 'HCM/baixo débito: minimizar dose, evitar bolus rápido, monitorização avançada (ECG/PA).',
      },
      therapeutic_targets: {
        target_map: 'Perfusão adequada com PAM individualizada; atenção a gatos com cardiomiopatia.',
        target_etco2: 'Evitar hipoventilação por associação; manter SpO2 adequada.',
        analgesia_scale: 'Menor reatividade e necessidade de resgate; conforto pós-op.',
        sedation_target: 'Sedação estável sem hipotermia/bradicardia clinicamente significativa com má perfusão.',
      },
    },
  },

  // Seção 5: Apresentações
  presentations: [
    {
      concentration_mg_ml: 0.5,
      concentration_mcg_ml: 500,
      volume_ml: 10,
      total_mg: 5,
      label: '0,5 mg/mL (500 mcg/mL) — solução injetável',
      examples: ['Dexdomitor', 'Dexitor', 'genéricos (variam por país)'],
      concentration_trap_warning: 'ALTA concentração (500 mcg/mL): erros de dose e de CRI são comuns se não diluir.',
    },
    {
      concentration_mg_ml: 0.1,
      concentration_mcg_ml: 100,
      label: '0,1 mg/mL (100 mcg/mL) — algumas apresentações/registros em certos mercados',
      examples: ['Dexdomitor 0.1 mg/mL (alguns registros)'],
      concentration_trap_warning: 'Verifique o rótulo: existem concentrações diferentes no mercado.',
    },
    {
      concentration_mg_ml: 0.1,
      concentration_mcg_ml: 100,
      volume_ml: 3,
      label: 'Gel oromucosal 0,1 mg/mL (HCl equivalente a 0,09 mg/mL base) — cães',
      examples: ['Sileo (oromucosal gel)'],
      concentration_trap_warning: 'NÃO é apresentação injetável; uso e dose são específicos para via oromucosal.',
    },
  ],

  // Seção 6: Diluição
  dilution_and_preparation: {
    hard_rules: [
      'Evitar bolus IV rápido: aplicar lentamente e titular ao efeito para reduzir instabilidade hemodinâmica.',
      'Para CRI, preferir sempre trabalhar com seringa/bolsa em concentração baixa (ex.: 4–10 mcg/mL) para reduzir erro de taxa.',
      'Se houver bradicardia + hipertensão logo após dose, tratar como bradicardia REFLEXA (não atropinizar automaticamente).',
      'Se houver bradicardia associada à hipotensão (fase tardia/baixas doses), considerar atropina conforme perfusão e contexto clínico.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 0.004,
        use_cases: ['CRI em bomba de seringa (precisão alta)'],
        how_to_make: 'Partindo de 500 mcg/mL: preparar 4 mcg/mL para facilitar taxas pequenas.',
        recipe: 'Ex.: 0,1 mL (50 mcg) + 12,4 mL diluente = 50 mcg/12,5 mL = 4 mcg/mL',
      },
      {
        target_mg_ml: 0.01,
        use_cases: ['CRI em bomba de seringa (mais "universal")'],
        how_to_make: 'Concentração prática para CRI em cães e gatos.',
        recipe: 'Ex.: 0,1 mL (50 mcg) + 4,9 mL diluente = 50 mcg/5 mL = 10 mcg/mL',
      },
    ],
    diluents_allowed: ['NaCl 0,9%'],
    preferred_diluent: {
      diluent: 'NaCl 0,9%',
      why: 'Compatível com a formulação aquosa (água/sais); reduz risco de incompatibilidade.',
    },
    stability: [
      {
        diluent: 'NaCl 0,9%',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Conservador: trocar seringa/bolsa a cada 24 h (ou antes se houver precipitação/contaminação).',
      },
    ],
    dedicated_line_required: false,
    dedicated_line_why: 'Não é universalmente obrigatório, mas considerar linha dedicada se múltiplas drogas/risco de incompatibilidade (sem dados robustos padronizados no acervo).',
  },

  // Seção 7: Compatibilidade
  compatibility: {
    compatible_in_syringe_or_bag: [
      'Opioides (ex.: fentanil/remifentanil) – uso comum em protocolos multimodais (titulados e monitorizados)',
      'Cetamina (protocolos multimodais) – uso comum',
    ],
    compatible_y_site_only: ['Não padronizado no acervo (preferir evitar mistura no mesmo acesso sem referência local de compatibilidade).'],
    incompatible: [
      {
        agent: 'Sem lista fechada no acervo',
        why: 'Compatibilidade físico-química específica depende de concentração, diluente e tempo; usar referência institucional quando for co-infusão.',
        risk: 'precipitação',
      },
    ],
    dedicated_line_rules: [
      'Misturas sem referência de compatibilidade local (polifarmácia em Y-site): evitar ou usar Y-site com flush.',
      'Se co-infusão for necessária e não houver tabela institucional de compatibilidade, priorizar linha dedicada ou flush entre drogas.',
      'Inspecionar solução/língua: turvação/precipitado = descartar.',
    ],
  },

  // Seção 8: Administração e Titulação
  administration_and_titration: {
    bolus_guidance: [
      'IV: aplicar lentamente e titular (evitar "empurrar" rápido).',
      'IM/SC: início mais lento; planejar tempo de efeito e risco de vômito/hipotermia.',
      "Evitar estímulos dolorosos/ruído: animais podem 'acordar' com estímulo apesar de parecerem bem sedados.",
    ],
    titration_rules: [
      'Em CRI: iniciar no menor extremo e subir em degraus conforme alvo (sedação/analgesia) e hemodinâmica.',
      'Reavaliar PA/FC/perfusão a cada 10–15 min após ajuste; depois, em intervalos regulares.',
    ],
    monitoring_minimum: [
      'PA (preferir PAM)',
      'FC e ritmo (ECG)',
      'SpO2 ± EtCO2 (se intubado/alto risco)',
      'Temperatura (hipotermia é comum)',
      'Perfusão (TRC, pulsos, lactato se crítico)',
    ],
    endpoints: {
      desired_effect: [
        'Sedação adequada para procedimento com manutenção de perfusão',
        'Analgesia/antagonismo de estresse (↓ reatividade autonômica)',
        'Redução de necessidade de inalatório/opioide (quando aplicável)',
      ],
      toxicity_signs: [
        'Bradicardia clinicamente relevante com má perfusão',
        'Hipotensão (especialmente fase tardia/baixas doses) ou queda progressiva de PAM',
        'Bloqueio AV/arrítmias, pulso fraco, extremidades frias excessivas',
        'Hipoventilação/apneia (sobretudo em associações)',
      ],
    },
    therapeutic_failure: {
      check_first: [
        "Paciente está com dor/estresse? (pode 'furar' sedação α2)",
        'Dose/via/tempo de latência respeitados?',
        'Há hipovolemia ou choque reduzindo tolerância à droga?',
        'Associação insuficiente (p.ex., faltou opioide/analgesia)?',
      ],
      common_causes: [
        'Estímulo/ambiente (ruído, contenção inadequada)',
        'Dose baixa para o nível de estímulo nociceptivo',
        'Tolerância individual/variabilidade farmacocinética',
      ],
      when_to_change: [
        'Se hemodinâmica limitar titulação (bradicardia/hipotensão), migrar para alternativa (opioide/benzodiazepínico/propofol/alfaxalona conforme cenário).',
        'Se procedimento é mais doloroso do que o previsto, trocar/associar analgésico em vez de apenas aumentar α2.',
      ],
    },
  },

  // Seção 9: Efeitos Adversos
  adverse_effects_and_toxicity: {
    common: [
      'Bradicardia',
      'Bloqueios AV ocasionais',
      'Hipotermia',
      'Vômito',
      'Hiperglicemia',
      'Micção',
      'Depressão respiratória (geralmente leve a moderada; piora com associações)',
      'Dor à injeção IM',
    ],
    serious: [
      'Apneia',
      'Instabilidade hemodinâmica importante (↓ DC, hipotensão tardia)',
      'Morte por insuficiência circulatória (raro; risco ↑ em doentes/hipovolêmicos/associações)',
    ],
    subdose_signs: ['Sedação insuficiente com reatividade a estímulos', 'Persistência de sinais autonômicos de dor/estresse'],
    overdose_signs: [
      'Bradicardia profunda com má perfusão',
      'Bloqueio AV marcado',
      'Hipotensão (especialmente fase tardia) ou colapso',
      'Hipoventilação/apneia',
      'Sedação prolongada',
    ],
    management: [
      'Reduzir/cessar CRI e reavaliar perfusão/volume/temperatura.',
      'Diferenciar fase inicial (bradicardia + hipertensão/vasoconstrição) de fase tardia (bradicardia + hipotensão).',
      'Em bradicardia + hipertensão inicial: evitar atropina automática; priorizar suporte e tempo/titulação.',
      'Em bradicardia + hipotensão: considerar atropina conforme perfusão e contexto; suporte volêmico/vasopressor conforme necessidade.',
      'Reversão com atipamezol quando indicado (principalmente se sedação excessiva ou evento adverso relacionado).',
    ],
    special_events: [
      {
        event: 'Bradicardia significativa (<50 bpm)',
        management:
          'Se associada à hipertensão/vasoconstrição inicial, tratar como reflexa e monitorar; se associada à hipotensão (fase tardia/baixas doses), considerar atropina e suporte.',
      },
      {
        event: 'Sedação prolongada',
        management: 'Aquecimento, reduzir/cessar infusão, considerar reversão com atipamezol e reavaliar função hepática/hemodinâmica.',
      },
    ],
  },

  // Seção 10: Alertas por Comorbidade
  alerts_by_comorbidity: [
    {
      key: 'dex_cardiac_disease_dogcat',
      level: 'WARNING',
      title: 'Cardiopatas / bradiarritmias: risco hemodinâmico',
      why: 'α2 pode causar bradicardia e reduzir débito cardíaco; em disfunção sistólica/HCM pode piorar perfusão.',
      action: [
        'Evitar doses altas e bolus rápido.',
        'Preferir titulação lenta e associação analgésica para reduzir necessidade de α2.',
        'Monitorização intensiva (ECG + PA).',
      ],
      dose_adjustment: {
        reduce_percent: 25,
        avoid_bolus: true,
        require_monitoring: ['ECG contínuo', 'PA (ideal invasiva se crítico)'],
        suggest_alternative: 'Opioide + benzodiazepínico (ou protocolos com menor impacto cronotrópico), conforme caso.',
      },
    },
    {
      key: 'dex_hypovolemia_shock_sepsis',
      level: 'WARNING',
      title: 'Hipovolemia/choque/sepse: perfusão pode piorar',
      why: 'Vasoconstrição + bradicardia podem reduzir entrega de O2; fase tardia pode cursar com hipotensão.',
      action: [
        'Evitar bolus; se usar, microdose e titulação.',
        'Corrigir volume/perfusão antes e durante.',
        'Reavaliar lactato/perfusão seriada.',
      ],
      dose_adjustment: {
        reduce_percent: 50,
        avoid_bolus: true,
        require_monitoring: ['PA frequente', 'perfusão/lactato', 'temperatura'],
        suggest_alternative: 'Sedação com opioide titulado ± benzodiazepínico; considerar anestesia dissociativa em cenários selecionados.',
      },
    },
    {
      key: 'dex_hepatopathy',
      level: 'MONITOR',
      title: 'Hepatopatia: variabilidade e sedação prolongada',
      why: 'Metabolismo hepático; risco de acúmulo/recuperação lenta em CRI.',
      action: ['Iniciar no menor extremo e titular lentamente.', 'Preferir doses intermitentes pequenas ou alternativas se prolongar demais.'],
      dose_adjustment: {
        reduce_percent: 25,
        avoid_bolus: false,
        require_monitoring: ['sedação (escala)', 'temperatura', 'PA/FC'],
        suggest_alternative: 'Opioide/remifentanil titulado ± benzodiazepínico.',
      },
    },
    {
      key: 'dex_ckd_azotemia',
      level: 'MONITOR',
      title: 'DRC/azotemia: risco indireto por perfusão',
      why: 'Não é primariamente renal, mas alterações hemodinâmicas podem reduzir perfusão renal (especialmente se hipotensão).',
      action: ['Evitar hipotensão; garantir volemia.', 'Monitorar diurese/creatinina conforme cenário.'],
      dose_adjustment: {
        reduce_percent: 0,
        avoid_bolus: false,
        require_monitoring: ['PA', 'diurese', 'temperatura'],
        suggest_alternative: 'Manter dex em baixa dose com titulação, se necessário.',
      },
    },
    {
      key: 'dex_hcm_feline',
      level: 'WARNING',
      title: 'HCM (gato): evitar bradicardia/vasoconstrição intensas',
      why: 'Pode reduzir débito e aumentar carga; risco de piora de perfusão.',
      action: ['Usar menor dose possível; evitar bolus rápido.', 'Associar analgesia para reduzir necessidade de sedativo.'],
      dose_adjustment: {
        reduce_percent: 25,
        avoid_bolus: true,
        require_monitoring: ['ECG', 'PA', 'perfusão'],
        suggest_alternative: 'Opioide titulado ± benzodiazepínico.',
      },
    },
    {
      key: 'dex_pic_neuro',
      level: 'MONITOR',
      title: 'Doença neurológica/PIC: cautela hemodinâmica',
      why: 'O ponto crítico é manter PPC (pressão de perfusão cerebral): bradicardia/hipotensão podem prejudicar.',
      action: ['Evitar hipotensão; preferir titulação e monitorização.', 'Manter ventilação e oxigenação adequadas.'],
      dose_adjustment: {
        reduce_percent: 0,
        avoid_bolus: false,
        require_monitoring: ['PA', 'EtCO2/SpO2', 'temperatura'],
        suggest_alternative: 'Protocolos que preservem PPC conforme caso.',
      },
    },
  ],

  // Seção 11: Presets
  presets: [
    {
      id: 'icu_sedation_low',
      label: 'UTI: sedação/analgesia CRI baixa 🟩',
      dose_mcgkgmin: 0.0083,
      dose_mgkgh: 0.0005,
      limits: { min: 0.0042, max: 0.0167 },
      clinical_target: 'Sedação leve a moderada com estabilidade hemodinâmica (titulável).',
      linked_alerts: ['dex_hypovolemia_shock_sepsis', 'dex_cardiac_disease_dogcat'],
    },
    {
      id: 'intraop_mac_sparing',
      label: 'Intraop: adjuvante MAC-sparing (CRI) 🟨',
      dose_mcgkgmin: 0.0167,
      dose_mgkgh: 0.001,
      limits: { min: 0.0083, max: 0.0333 },
      clinical_target: 'Reduzir necessidade de inalatório e melhorar analgesia multimodal.',
      linked_alerts: ['dex_cardiac_disease_dogcat'],
    },
    {
      id: 'recovery_delirium_bolus',
      label: 'Recuperação: delirium/emergência (bolus baixo IV) 🟨',
      dose_mcgkg: 1,
      limits: { min: 1, max: 2 },
      clinical_target: 'Sedação curta para controle de agitação, com mínima depressão respiratória.',
      linked_alerts: ['dex_cardiac_disease_dogcat'],
    },
  ],

  // Seção 12: Templates de Cálculo
  calculation_templates: {
    cri: {
      required_inputs: ['weight_kg', 'dose_mcgkgmin', 'drug_concentration_mcg_ml', 'final_volume_ml (opcional, se diluição builder)', 'pump_type (mL/h)'],
      algorithm: [
        '1) Calcular dose total (mcg/min) = dose (mcg/kg/min) × peso (kg).',
        '2) Converter para mcg/h: mcg/h = mcg/min × 60.',
        '3) Calcular taxa (mL/h) = (mcg/h) ÷ concentração (mcg/mL).',
      ],
      conversions: ['mcg/kg/h = (mcg/kg/min) × 60', 'mcg/kg/min = (mcg/kg/h) ÷ 60', '0,25–2 mcg/kg/h ≈ 0,0042–0,0333 mcg/kg/min'],
      hard_safety_checks: [
        {
          if: 'drug_concentration_mcg_ml >= 100',
          then: 'WARN',
          message: 'Concentração alta aumenta risco de erro. Considere diluir (ex.: 4–10 mcg/mL) para CRI.',
        },
        {
          if: 'dose_mcgkgmin > 0.0333',
          then: 'BLOCK',
          message: 'Dose acima do teto recomendado para CRI (≈2 mcg/kg/h). Rever prescrição.',
        },
        {
          if: 'dose_mcgkgmin <= 0',
          then: 'BLOCK',
          message: 'Dose inválida (≤0).',
        },
      ],
      soft_safety_checks: [
        {
          if: "patient_has('cardiac_disease')",
          then: 'WARN',
          message: 'Cardiopata: evitar bolus e doses altas; monitorização intensiva (ECG/PA).',
        },
        {
          if: "patient_has('shock') || patient_has('sepsis')",
          then: 'WARN',
          message: 'Choque/sepse: α2 pode piorar perfusão. Evitar bolus; titular microdose com suporte hemodinâmico.',
        },
        {
          if: "patient_has('hepatopathy')",
          then: 'INFO',
          message: 'Hepatopatia pode prolongar efeito; iniciar baixo e titular.',
        },
      ],
      outputs: ['rate_ml_per_h', 'dose_total_mcg_per_h'],
      error_cost: 'Erros de 10× são plausíveis por concentração 500 mcg/mL; podem causar bradicardia grave/instabilidade hemodinâmica.',
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_mcgkg', 'drug_concentration_mcg_ml'],
      algorithm: [
        '1) Calcular dose total (mcg) = dose (mcg/kg) × peso (kg).',
        '2) Calcular volume (mL) = dose total (mcg) ÷ concentração (mcg/mL).',
        '3) Administração IV lenta e titulada ao efeito.',
      ],
      hard_safety_checks: [
        {
          if: 'dose_mcgkg > 10',
          then: 'BLOCK',
          message: 'Dose acima do teto típico (10 mcg/kg). Rever prescrição.',
        },
        {
          if: 'dose_mcgkg <= 0',
          then: 'BLOCK',
          message: 'Dose inválida (≤0).',
        },
      ],
      soft_safety_checks: [
        {
          if: "route_is('IV')",
          then: 'INFO',
          message: 'Aplicar lentamente e titular (evitar bolus rápido).',
        },
      ],
      outputs: ['bolus_volume_ml', 'dose_total_mcg'],
      error_cost: 'Bolus rápido/alto pode precipitar bradicardia, bloqueio AV e queda de débito.',
    },
    dilution_builder: {
      required_inputs: ['stock_concentration_mcg_ml', 'target_concentration_mcg_ml', 'final_volume_ml'],
      algorithm: [
        '1) Calcular quantidade total de fármaco necessária (mcg) = alvo (mcg/mL) × volume final (mL).',
        '2) Calcular volume do estoque (mL) = mcg total ÷ concentração estoque (mcg/mL).',
        '3) Completar com diluente até o volume final.',
      ],
      hard_safety_checks: [
        {
          if: 'target_concentration_mcg_ml <= 0',
          then: 'BLOCK',
          message: 'Concentração alvo inválida (≤0).',
        },
        {
          if: 'target_concentration_mcg_ml > stock_concentration_mcg_ml',
          then: 'BLOCK',
          message: 'Concentração alvo maior que a do estoque. Rever.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'target_concentration_mcg_ml < 2',
          then: 'INFO',
          message: 'Concentração muito baixa pode gerar volumes grandes; confirme viabilidade da bomba/seringa.',
        },
      ],
      outputs: ['stock_volume_ml', 'diluent_volume_ml', 'total_drug_mcg'],
      error_cost: 'Diluição incorreta altera 10× a taxa e risco hemodinâmico.',
    },
  },

  // Seção 13: Bloco Didático
  how_we_got_here_block: {
    title: 'Como chegamos a este resultado (CRI)',
    render_steps: [
      {
        step: 1,
        label: 'Dose por minuto',
        formula: 'mcg/min = (dose mcg/kg/min) × (peso kg)',
      },
      {
        step: 2,
        label: 'Converter para hora',
        formula: 'mcg/h = (mcg/min) × 60',
      },
      {
        step: 3,
        label: 'Transformar em mL/h',
        formula: 'mL/h = (mcg/h) ÷ (concentração mcg/mL)',
      },
    ],
    interpretation_rules: [
      'Se bradicardia ocorre logo após dose com PA alta/vasoconstrição: provável bradicardia reflexa (não atropinizar automaticamente).',
      'Se bradicardia ocorre com hipotensão (especialmente fase tardia/baixas doses): considerar atropina e suporte hemodinâmico conforme perfusão.',
      'Em cardiopatas/hipovolêmicos: preferir doses baixas e titulação lenta; evitar bolus.',
    ],
    example: {
      scenario: 'Cão 20 kg, CRI 0,0167 mcg/kg/min (≈1 mcg/kg/h), solução diluída a 10 mcg/mL',
      calculation: [
        'mcg/min = 0,0167 × 20 = 0,334 mcg/min',
        'mcg/h = 0,334 × 60 = 20,04 mcg/h',
        'mL/h = 20,04 ÷ 10 = 2,004 mL/h',
      ],
      result: 'Programar ~2,0 mL/h',
    },
  },

  // Seção 14: Integrações
  protocol_integrations: {
    enabled: true,
    protocols: ['MLK (variações com α2)', 'sedação UTI', 'MAC-sparing intraoperatório'],
    why_combo_exists:
      'Dexmedetomidina oferece sedação/analgesia e reduz necessidade de inalatório/opioides, mas exige titulação por efeitos hemodinâmicos; combinações multimodais reduzem dose necessária.',
    rules: [
      {
        if: "patient_has('shock') || patient_has('sepsis')",
        then: {
          action: 'REDUCE_DOSE',
          drug_id: 'dexmedetomidina',
          factor: 0.5,
          message: 'Choque/sepse: reduzir dose e evitar bolus; titular com monitorização intensiva.',
        },
      },
      {
        if: "patient_has('cardiac_disease')",
        then: {
          action: 'PREFER_ALTERNATIVE',
          message: 'Cardiopata relevante: preferir alternativa (opioide/benzodiazepínico) ou usar apenas microdose titulada.',
        },
      },
    ],
  },

  // Seção 15: Fluxogramas
  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'dex_bradycardia_management',
        title: 'Bradicardia após dexmedetomidina: o que fazer?',
        mermaid:
          'flowchart TD\nA[Bradicardia após dexmedetomidina] --> B{PA elevada/vasoconstrição inicial?}\nB -->|Sim| C[Bradicardia reflexa\n→ NÃO atropinizar automaticamente\n→ Monitorar perfusão/PA\n→ Considerar reduzir dose/aguardar]\nB -->|Não| D{PA baixa/hipotensão?}\nD -->|Sim| E[Provável fase tardia/simpatólise\n→ Suporte hemodinâmico\n→ Considerar atropina se perfusão ruim\n→ Reduzir/cessar CRI]\nD -->|Não| F[Reavaliar: dor/hipovolemia/associações\n→ Ajustar analgesia e titulação]',
      },
      {
        id: 'dex_cri_titration',
        title: 'Titulação prática da CRI (UTI/intraop)',
        mermaid:
          'flowchart TD\nA[Iniciar CRI] --> B[0,25 mcg/kg/h]\nB --> C{Sedação/analgesia suficiente\n+ perfusão OK?}\nC -->|Sim| D[Manter e monitorar]\nC -->|Não| E[Subir degrau: 0,5 → 1 → 2 mcg/kg/h\n(reavaliar 10–15 min)]\nE --> C\nC -->|Hemodinâmica piorou| F[Reduzir/pausar CRI\ntratar causa (volume/temperatura/dor)\nconsiderar alternativa]',
      },
    ],
  },

  // Seção 16: UI Copy
  ui_copy: {
    critical_warning_banner:
      'Bradicardia com dexmedetomidina pode ser reflexa no início — não atropinize automaticamente; trate o paciente (perfusão/PA) e o contexto.',
    alert_messages: {
      short: 'Atenção: α2 pode causar bradicardia/↓ débito e fase tardia com hipotensão.',
      long: 'Dexmedetomidina tem efeito cardiovascular bifásico. Logo após a administração pode ocorrer vasoconstrição e hipertensão com bradicardia reflexa; mais tarde/baixas doses pode predominar simpatólise central com bradicardia + hipotensão. Titule lentamente e monitore PA/ECG/perfusão.',
    },
    block_message: 'Bloqueado: dose fora do intervalo seguro ou condição crítica incompatível sem suporte/monitorização.',
    common_errors: [
      'Bolus IV rápido → instabilidade hemodinâmica',
      'Tratar bradicardia reflexa inicial com atropina automaticamente',
      'Usar concentração 500 mcg/mL em CRI sem diluir → erro de taxa',
      "Achar que o paciente 'não vai acordar': estímulo pode reverter sedação",
    ],
  },

  // Seção 17: Referências
  references: [
    {
      section: 'mechanism/pharmacokinetics/pharmacodynamics',
      source:
        'Veterinary Anesthesia and Analgesia (Lumb and Jones), 6th ed. Capítulo 22 (Sedatives and Tranquilizers) – seção de α2-agonistas (xylazine/detomidine/romifidine/medetomidine/dexmedetomidine).',
      page: 'pp. 338–344 (numeração do livro exibida no texto)',
      edition: '6th',
      year: 2024,
    },
    {
      section: 'doses/adverse effects/bradycardia guidance',
      source: 'Guia Prático de Sedação e Analgesia na Rotina de Cães e Gatos (2023) – seção Dexmedetomidina.',
      page: 'pp. 10–11 (do PDF; páginas exibidas no rodapé)',
      year: 2023,
    },
    {
      section: 'presentations/indications (label-based)',
      source: 'DailyMed – Dexdomitor (dexmedetomidine hydrochloride) injection: composição (0.5 mg/mL) e indicações em cães e gatos.',
      year: 2025,
    },
    {
      section: 'oromucosal gel concentration/indication',
      source:
        'European Commission Community Register – Sileo (dexmedetomidine hydrochloride) 0.1 mg/mL oromucosal gel (equivalente 0.09 mg/mL base) e indicação (ansiedade por ruído em cães).',
      year: 2015,
    },
  ],
}
