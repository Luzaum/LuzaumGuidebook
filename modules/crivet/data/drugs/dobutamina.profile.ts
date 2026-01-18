import type { DrugProfile } from '../../types/drugProfile'

export const dobutaminaProfile: DrugProfile = {
  // Seção 1: Identidade
  drug_id: 'dobutamina',
  name_pt: 'Dobutamina',
  name_en: 'Dobutamine',
  synonyms: ['Dobutrex', 'Dobutamine hydrochloride', 'Dobutamina (genéricos)'],
  class: ['Agonista β1-adrenérgico (catecolamina sintética)', 'Inotrópico positivo', 'Agente adrenérgico (simpaticomimético) de ação direta'],

  // Seção 2: Perfil Farmacológico
  core_concepts: {
    taglines: [
      'Inotrópico β1: aumenta contratilidade para elevar débito cardíaco.',
      'Efeito é dose-dependente: em doses mais altas pode recrutar β2 e α1 (mudando SVR e FC).',
      'Meia-vida curta → início/offset rápidos → sempre por CRI e titulado ao efeito.',
    ],
    mechanism: {
      receptors_targets: ['β1-adrenérgico (principal)', 'β2-adrenérgico (recrutado em doses mais altas)', 'α1-adrenérgico (recrutado em doses mais altas)', 'cAMP/Ca2+ intracelular (via sinalização β1)'],
      primary_effects: {
        cardiovascular:
          '↑ contratilidade (inotropismo) e, dependendo da dose, ↑ FC; pode alterar SVR: em gatos pode ↓ SVR por efeito β2 (vasodilatação), enquanto em doses mais altas pode ↑ SVR por efeito α1; risco de taquiarritmias em doses elevadas (especialmente ≥10 mcg/kg/min).',
        respiratory: 'Efeito direto pequeno; benefício indireto por melhora de perfusão/DO2 quando aumenta DC.',
        cns: 'Sem alvo primário; pode aumentar consumo miocárdico de O2 por ↑ trabalho cardíaco, predispondo arritmias em pacientes suscetíveis.',
        renal_hepatic:
          'Melhora perfusão renal indiretamente ao elevar DC; metabolismo hepático predominante por COMT para metabólitos inativos com excreção urinária.',
        gi: 'Efeito indireto via perfusão sistêmica; alterações dependem do estado hemodinâmico e da dose.',
      },
      clinical_metaphor: '"Turbo do ventrículo": você pisa no acelerador da força de contração (β1). Se acelerar demais, começa a mexer também no \'calibre dos canos\' (β2/α1), podendo mudar a resistência vascular e disparar arritmias.',
    },
    pharmacodynamics: {
      onset_iv: 'minutos (rápido; por CRI)',
      onset_im: 'N/A (uso clínico é IV em infusão contínua)',
      peak: 'minutos após ajuste de taxa (efeito titulável)',
      duration: 'muito curta; efeito cai rapidamente após interromper a infusão',
      dependencies: ['Dose (recrutamento β2/α1 em taxas mais altas)', 'Estado miocárdico (reserva contrátil)', 'Arritmogenicidade basal/hipóxia/acidose', 'Uso concomitante de β-bloqueadores (pode reduzir resposta)'],
    },
    pharmacokinetics: {
      metabolism: 'Predominantemente hepático via catechol-O-methyltransferase (COMT) → metabólitos inativos; conjugação e eliminação urinária.',
      excretion: 'Renal (metabólitos conjugados/inativos na urina).',
      dog_vs_cat:
        'Em cães e gatos, o efeito hemodinâmico pode diferir mais por farmacodinâmica (sensibilidade vascular/miocárdica) do que por diferenças marcantes de eliminação; em gatos, pode haver redução de SVR por efeito β2 em taxas semelhantes às estudadas em cães.',
      active_metabolites: 'Não relevantes clinicamente (metabólitos descritos como inativos).',
      accumulation: 'Acúmulo clínico é improvável pela meia-vida curta; porém ocorre tolerância/taquifilaxia com infusão prolongada (tipicamente evitar >48 h quando possível).',
    },
  },

  species_notes: {
    dogs: {
      key_point: 'Em cães anestesiados (isoflurano), taxas até ~10 mcg/kg/min têm efeito limitado em PA, mas aumentam DC/FC e podem aumentar SVR; ideal é guiar por perfusão e, se disponível, medidas de DC/ecocardiografia.',
      high_risk_notes: [
        'Doses altas (≥10 mcg/kg/min) aumentam risco de taquiarritmias.',
        'Resposta pode ser atenuada por anestésicos inalatórios e por β-bloqueadores.',
        'Monitorização contínua de ECG e PA é fortemente recomendada durante uso.',
      ],
      metabolism_excretion: 'Metabolismo hepático (COMT) → metabólitos inativos; excreção urinária.',
    },
    cats: {
      key_point: 'Em gatos, pode aumentar FC e reduzir SVR por efeito β2; efeito em PA pode ser limitado — monitorar perfusão (PA, lactato, UO, CRT) e ritmo (ECG).',
      high_risk_notes: [
        'Evitar/contraindicar em HCM obstrutiva (HOCM) e em cardiopatias com obstrução dinâmica de via de saída (risco de piora por ↑ inotropismo).',
        'Doses altas (≥10 mcg/kg/min) aumentam risco de taquiarritmias.',
        'Uso prolongado → tolerância; preferir ponte curta (24–48 h) até estabilização e transição para terapia oral quando possível.',
      ],
      metabolism_excretion: 'Metabolismo hepático (COMT) → metabólitos inativos; excreção urinária.',
    },
  },

  // Seção 3: Indicações e Contraindicações
  indications: {
    primary: [
      'Baixo débito cardíaco por disfunção miocárdica (suporte inotrópico de curto prazo).',
      'Insuficiência cardíaca congestiva aguda descompensada com hipotensão/baixa perfusão e suspeita de falha sistólica.',
      'Hipotensão durante anestesia (especialmente quando associada a baixa contratilidade), como opção titulável por CRI.',
    ],
    secondary: [
      'Ponte hemodinâmica curta (24–48 h) enquanto se otimiza diurético/vasodilatador e se inicia terapia crônica (ex.: pimobendan em cães quando apropriado).',
      'Suporte de perfusão em choque cardiogênico selecionado (com monitorização avançada idealmente).',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'HCM obstrutiva (HOCM) / obstrução dinâmica de via de saída em gatos',
        why: 'Inotrópicos podem piorar gradiente de obstrução e a instabilidade hemodinâmica; recomendado considerar como contraindicação.',
        level: 'CRITICAL',
      },
    ],
    relative: [
      {
        condition: 'Taquiarritmias supraventriculares/ventriculares não controladas',
        why: 'Dobutamina é pró-arrítmica em doses altas; pode precipitar ou piorar taquiarritmias.',
        level: 'WARNING',
      },
      {
        condition: 'Hipovolemia/choque distributivo sem correção de volume',
        why: 'Se o problema dominante é vasodilatação/hipovolemia, apenas aumentar inotropismo pode não restaurar PA/perfusão; risco de taquicardia/↑ consumo de O2.',
        level: 'MONITOR',
      },
      {
        condition: 'Obstruções fixas ao fluxo (ex.: estenose aórtica fixa)',
        why: 'Aumentar contratilidade pode não aumentar CO e pode elevar demanda miocárdica/arrítmias; positivo inotrópico não é indicado quando não há como aumentar ejeção.',
        level: 'WARNING',
      },
    ],
  },

  // Seção 4: Doses
  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      bolus: {
        mgkg: { min: 0, max: 0, note: 'Bolus não é prática padrão; preferir CRI titulada ao efeito (meia-vida curta).' },
        mcgkg: { min: 0, max: 0, note: 'Evitar bolus; usar apenas CRI.' },
        ukg: { min: 0, max: 0, note: 'N/A' },
        route: 'IV',
        loading_dose: { min: 0, max: 0 },
      },
      cri: {
        mcgkgmin: {
          min: 1,
          max: 20,
          note: 'Iniciar baixo e titular a cada 15–30 min; doses altas aumentam risco de taquiarritmias. Muitas vezes 3–7 mcg/kg/min tem efeitos mínimos em FC/PA.',
        },
        mgkgh: { min: 0.06, max: 1.2 },
        titration: {
          increment: 'Escalonar gradualmente: 1→2→3→5→7→10→15→20 (conforme resposta e ECG/PA)',
          interval: 'Reavaliar a cada 15–30 min (ou mais rápido se monitorização invasiva/eco disponível).',
        },
        max: 20,
      },
      adjustments: {
        obesity: 'Usar peso magro/estimado para iniciar (soft check); titular ao efeito hemodinâmico.',
        shock: 'Se choque for predominantemente distributivo, considerar vasopressor (ex.: norepinefrina) em vez de escalar dobutamina isoladamente; se cardiogênico, usar dobutamina com monitorização estreita.',
        hypoalbuminemia: 'Sem ajuste obrigatório por ligação proteica; foco em perfusão/ritmo e em reduzir escaladas agressivas (maior risco de instabilidade).',
        comorbidities: 'Em arritmias, hipóxia, acidose, hipocalemia/hipomagnesemia: corrigir primeiro e manter dose na menor eficaz.',
      },
      therapeutic_targets: {
        target_map: 'Objetivo prático: PAM ≥ 65–70 mmHg (ou PAS ≥ 90–100 mmHg) + melhora de perfusão (CRT, temperatura periférica, mentação).',
        target_etco2: 'Se sob ventilação controlada, manter EtCO2 adequado; não é alvo primário do fármaco.',
      },
    },
    cat: {
      bolus: {
        mgkg: { min: 0, max: 0, note: 'Bolus não recomendado; usar CRI titulada ao efeito.' },
        mcgkg: { min: 0, max: 0, note: 'Evitar bolus; usar apenas CRI.' },
        ukg: { min: 0, max: 0, note: 'N/A' },
        route: 'IV',
        loading_dose: { min: 0, max: 0 },
      },
      cri: {
        mcgkgmin: {
          min: 1,
          max: 10,
          note: 'Iniciar baixo e titular a cada 15–30 min; atenção especial em HCM/HOCM (contraindicado na forma obstrutiva).',
        },
        mgkgh: { min: 0.06, max: 0.6 },
        titration: {
          increment: 'Escalonar gradualmente: 1→2→3→5→7.5→10 (conforme resposta e ECG/PA)',
          interval: 'Reavaliar a cada 15–30 min.',
        },
        max: 10,
      },
      adjustments: {
        obesity: 'Usar peso magro/estimado para iniciar; titular ao efeito.',
        shock: 'Em hipotensão por vasodilatação (sepse/anestesia profunda), pode ser necessário vasopressor; não escalar dobutamina como única medida.',
        hypoalbuminemia: 'Sem ajuste obrigatório; monitorar resposta/ritmo.',
        comorbidities: 'Em HOCM: bloquear uso; em taquiarritmias/hipertensão grave: usar com extrema cautela e menor dose eficaz.',
      },
      therapeutic_targets: {
        target_map: 'PAM ≥ 65–70 mmHg (ou PAS ≥ 90 mmHg) + melhora perfusional (UO, mentação, lactato).',
      },
    },
  },

  // Seção 5: Apresentações
  presentations: [
    {
      concentration_mg_ml: 12.5,
      volume_ml: 20,
      total_mg: 250,
      label: '12.5 mg/mL — frasco 20 mL (total 250 mg)',
      examples: ['Dobutrex (varia por país)', 'genéricos'],
      concentration_trap_warning: 'Atenção: existem apresentações mais concentradas (até 50 mg/mL). Confirmar mg/mL no rótulo antes de preparar CRI.',
    },
    {
      concentration_mg_ml: 50,
      volume_ml: 5,
      total_mg: 250,
      label: '50 mg/mL — frasco 5 mL (total 250 mg)',
      examples: ['genéricos (varia por país)'],
      concentration_trap_warning: 'ALTA concentração (50 mg/mL): maior risco de erro de diluição. CRI deve ser preparada por regra de diluição e checagem dupla.',
    },
  ],

  // Seção 6: Diluição
  dilution_and_preparation: {
    hard_rules: [
      'Usar apenas em CRI IV com bomba (seringa ou equipo volumétrico) e titular ao efeito; bolus não é prática padrão.',
      'Conferir a concentração do frasco (há 12.5–50 mg/mL).',
      'Monitorização mínima obrigatória: PA + ECG contínuo durante titulação.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 0.5,
        use_cases: ['CRI em pequenos pacientes (facilita taxas em mL/h)', 'Reduz erro de microtaxas'],
        how_to_make: 'Objetivo clássico para facilitar cálculo: 500 mcg/mL (0.5 mg/mL).',
        recipe: 'Adicionar 250 mg em 500 mL de D5W ou Ringer Lactato → 500 mcg/mL (0.5 mg/mL).',
      },
      {
        target_mg_ml: 1,
        use_cases: ['Quando se deseja reduzir volume total (bolsas menores) mantendo taxas manejáveis'],
        how_to_make: 'Dobrar a concentração em relação a 0.5 mg/mL; mantém cálculo simples.',
        recipe: 'Adicionar 250 mg em 250 mL de D5W ou Ringer Lactato → 1 mg/mL.',
      },
    ],
    diluents_allowed: ['Glicose 5% (D5W)', 'Ringer Lactato'],
    preferred_diluent: {
      diluent: 'Glicose 5% (D5W)',
      why: 'Uso comum em catecolaminas e facilita estabilidade/manuseio em CRI (quando disponível).',
    },
    stability: [
      {
        diluent: 'D5W',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Trocar bolsa/seringa pelo menos a cada 24 h (ou conforme protocolo institucional).',
      },
      {
        diluent: 'Ringer Lactato',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Trocar bolsa/seringa pelo menos a cada 24 h (ou conforme protocolo institucional).',
      },
    ],
    dedicated_line_required: true,
    dedicated_line_why: 'Minimiza risco de incompatibilidades físico-químicas e permite titulação segura (catecolamina de curto efeito com necessidade de ajustes frequentes).',
  },

  // Seção 7: Compatibilidade
  compatibility: {
    diluents_allowed: ['Glicose 5% (D5W)', 'Ringer Lactato'],
    diluents_ok: ['D5W', 'Lactated Ringer\'s Solution (LRS)'],
    diluentsAllowed: ['D5W', 'LRS'],
    diluents: ['D5W', 'LRS'],
    compatible_in_syringe_or_bag: [
      'Sem dados robustos padronizados no acervo para misturas em mesma seringa/bolsa (recomendação: evitar misturas e usar linha dedicada).',
    ],
    compatible_y_site_only: ['Sem dados robustos padronizados no acervo para Y-site (recomendação: preferir linha dedicada).'],
    incompatible: [
      {
        agent: 'Misturas não testadas / múltiplos fármacos na mesma bolsa',
        why: 'Risco de incompatibilidade e perda de potência; catecolamina requer previsibilidade de entrega e titulação.',
        risk: 'inativação',
      },
    ],
    avoid_same_syringe_or_precipitation_risk: [
      'Evitar co-infusão na mesma seringa/bolsa sem compatibilidade confirmada.',
      'Preferir linha dedicada e flush entre medicações.',
    ],
    dedicated_line_rules: [
      'Manter dobutamina em linha dedicada sempre que possível.',
      'Se precisar usar Y-site, realizar flush adequado e observar turvação/precipitação (se ocorrer, interromper e substituir equipo/solução).',
    ],
  },

  // Seção 8: Administração e Titulação
  administration_and_titration: {
    bolus_guidance: [
      'Bolus não recomendado (não é prática padrão).',
      'Se houver necessidade excepcional (raro), deve ser decisão de especialista e com monitorização avançada — fora do escopo padrão do CRIVET.',
    ],
    titration_rules: [
      'Iniciar baixo (ex.: 1 mcg/kg/min) e aumentar gradualmente conforme perfusão/PA/ECG.',
      'Reavaliar a cada 15–30 min durante escalonamento.',
      'Evitar manter infusão por >48 h quando possível devido à tolerância; fazer desmame gradual quando estabilizar.',
    ],
    monitoring_minimum: [
      'PA (idealmente PAM; preferir invasiva se paciente crítico)',
      'ECG contínuo (ritmo e ectopias)',
      'FC',
      'Perfusão periférica (CRT, temperatura de extremidades, pulso)',
      'Diurese (UO) e/ou tendência de lactato quando disponível',
      'SpO2/EtCO2 se sob anestesia/ventilação',
    ],
    endpoints: {
      desired_effect: [
        'Melhora de mentação e perfusão periférica',
        'Aumento/normalização de PAM/PAS quando baixa perfusão',
        'Aumento de diurese e melhora de marcadores de perfusão (ex.: lactato em queda)',
      ],
      toxicity_signs: [
        'Taquicardia importante',
        'Ectopias frequentes / taquiarritmias SV ou V',
        'Piora de hipotensão (se vasodilatação/efeito relativo β2 predominar)',
        'Sinais de aumento de consumo miocárdico de O2 (piora clínica, isquemia suspeita)',
      ],
    },
    therapeutic_failure: {
      check_first: ['Hipovolemia/precarga inadequada', 'Hipóxia/hipercapnia', 'Acidose, distúrbios eletrolíticos (K/Mg)', 'Anestesia profunda/vasodilatação dominante', 'β-bloqueador concomitante'],
      common_causes: [
        'Choque distributivo predominante (precisa vasopressor)',
        'Tolerância à catecolamina (infusão prolongada)',
        'Dose insuficiente ou bomba/linha com falha',
        'Miocárdio sem reserva contrátil (doença terminal)',
      ],
      when_to_change: [
        'Se dose moderada-alta sem ganho perfusional e com arritmias → reduzir/cessar e considerar alternativa (ex.: milrinona selecionada).',
        'Se hipotensão por vasodilatação → adicionar/alternar para vasopressor (ex.: norepinefrina) em vez de escalar dobutamina.',
      ],
    },
  },

  // Seção 9: Efeitos Adversos
  adverse_effects_and_toxicity: {
    common: ['Taquicardia (dose-dependente)', 'Aumento de consumo miocárdico de O2 (via ↑ trabalho cardíaco)'],
    serious: [
      'Taquiarritmias supraventriculares ou ventriculares (especialmente em doses altas)',
      'Possível piora hemodinâmica se SVR cair em alguns pacientes (p.ex., vasodilatação relativa)',
    ],
    subdose_signs: [
      'Sem melhora de perfusão/PA/UO',
      'Lactato persistente ou crescente (se monitorado)',
      'Extremidades frias, CRT prolongado persistente',
    ],
    overdose_signs: [
      'FC muito elevada',
      'Ectopias/taquiarritmias',
      'Hipertensão ou aumento de SVR em doses altas (pode ocorrer por recrutamento α1)',
      'Agitação/instabilidade hemodinâmica',
    ],
    management: [
      'Reduzir dose ou interromper temporariamente; por meia-vida curta, melhora costuma ser rápida após ajuste.',
      'Tratar arritmias conforme ACLS/conduta clínica (corrigir hipóxia/acidose/eletrolitos; antiarrítmicos se indicado).',
      'Se perfusão não melhora e dose está alta, considerar troca para outra estratégia (vasopressor/inodilatador).',
    ],
    special_events: [
      {
        event: 'tolerância/taquifilaxia (infusão prolongada)',
        management: 'Planejar uso como ponte curta (24–48 h) e desmame gradual quando estabilizar; considerar alternativas se necessário.',
      },
    ],
  },

  // Seção 10: Alertas por Comorbidade
  alerts_by_comorbidity: [
    {
      key: 'dobutamina_cat_hocm',
      level: 'BLOCK',
      title: 'Gato com HCM obstrutiva (HOCM): evitar dobutamina',
      why: 'Inotrópicos podem piorar obstrução dinâmica e descompensar hemodinamicamente.',
      action: [
        'Bloquear uso no app quando HOCM selecionado.',
        'Sugerir alternativas de manejo conforme cenário (controle de estresse/ansiedade, O2, diurético, betabloqueio quando indicado por cardiologia).',
      ],
      dose_adjustment: {
        suggest_alternative: 'Evitar inotrópicos; discutir estratégia com cardiologia/intensivista.',
      },
    },
    {
      key: 'dobutamina_any_arrhythmia',
      level: 'CRITICAL',
      title: 'Arritmia significativa: risco de piora com dobutamina',
      why: 'Catecolaminas podem ser pró-arrítmicas, especialmente em doses altas.',
      action: [
        'Exigir ECG contínuo.',
        'Corrigir hipóxia/acidose e distúrbios eletrolíticos antes de escalar dose.',
        'Usar a menor dose eficaz e reavaliar a cada 15–30 min.',
      ],
      dose_adjustment: {
        reduce_percent: 25,
        avoid_bolus: true,
        require_monitoring: ['ECG contínuo', 'PA frequente/invasiva se possível'],
      },
    },
    {
      key: 'dobutamina_cat_hcm_nonobstructive',
      level: 'WARNING',
      title: 'Gato com HCM (não obstrutiva/end-stage): uso só se disfunção sistólica documentada',
      why: 'Em HCM, inotrópicos geralmente não são indicados; exceção é disfunção sistólica (end-stage), e mesmo assim off-label.',
      action: [
        'Sinalizar alerta e recomendar confirmação ecocardiográfica de disfunção sistólica antes de iniciar.',
        'Se usar, iniciar em dose baixa e titular lentamente com ECG/PA.',
      ],
      dose_adjustment: {
        reduce_percent: 25,
        avoid_bolus: true,
        require_monitoring: ['ECG', 'PA', 'tendência de perfusão/diurese'],
      },
    },
    {
      key: 'dobutamina_ckd',
      level: 'MONITOR',
      title: 'DRC/azotemia: foco em perfusão e diurese (sem ajuste obrigatório)',
      why: 'Eliminação é de metabólitos inativos na urina; o objetivo clínico é melhorar perfusão renal sem induzir taquiarritmias.',
      action: ['Monitorar UO, creatinina/ureia seriadas e PA.', 'Evitar doses altas se ocorrer taquicardia/arrítmias.'],
    },
    {
      key: 'dobutamina_hepatopathy',
      level: 'MONITOR',
      title: 'Hepatopatia: possível alteração de metabolismo (monitorar resposta)',
      why: 'Metabolismo descrito como predominantemente hepático (COMT); impacto clínico é incerto, mas requer vigilância.',
      action: ['Iniciar em dose baixa e titular ao efeito.', 'Monitorar resposta hemodinâmica e efeitos adversos.'],
    },
    {
      key: 'dobutamina_severe_htn',
      level: 'WARNING',
      title: 'Hipertensão grave: risco de piora por aumento de trabalho cardíaco',
      why: 'Dobutamina pode aumentar FC/contratilidade e, em doses altas, SVR; pode agravar hipertensão e demanda miocárdica.',
      action: ['Confirmar necessidade (baixo débito) e monitorar PA de perto.', 'Evitar escalada agressiva; reavaliar frequentemente.'],
    },
  ],

  // Seção 11: Presets
  presets: [
    {
      id: 'low_start',
      label: 'Início baixo (ponte) 🟩',
      dose_mcgkgmin: 1,
      limits: { min: 0.5, max: 3 },
      clinical_target: 'Testar responsividade inotrópica com segurança; observar PA/ECG/perfusão.',
      linked_alerts: ['dobutamina_any_arrhythmia', 'dobutamina_cat_hocm'],
    },
    {
      id: 'typical_support',
      label: 'Suporte típico 🟨',
      dose_mcgkgmin: 5,
      limits: { min: 3, max: 7 },
      clinical_target: 'Melhora de perfusão (PAM/PAS, UO, CRT) com menor risco de taquiarritmia.',
      linked_alerts: ['dobutamina_any_arrhythmia'],
    },
    {
      id: 'high_end_rescue',
      label: 'Resgate (alto risco) 🟥',
      dose_mcgkgmin: 10,
      limits: { min: 7, max: 20 },
      clinical_target: 'Refratário com baixo débito; exige ECG/PA contínuos e reavaliação frequente.',
      linked_alerts: ['dobutamina_any_arrhythmia'],
    },
  ],

  // Seção 12: Templates de Cálculo
  calculation_templates: {
    cri: {
      required_inputs: ['weight_kg', 'dose_mcgkgmin', 'bag_or_syringe_volume_ml', 'final_concentration_mcg_ml'],
      algorithm: [
        'Dose total (mcg/min) = dose_mcgkgmin × weight_kg',
        'Taxa (mL/min) = [Dose total (mcg/min)] ÷ final_concentration_mcg_ml',
        'Taxa (mL/h) = taxa (mL/min) × 60',
      ],
      conversions: ['mg/kg/h = mcg/kg/min × 0.06', 'Se usar alvo 500 mcg/mL: taxa (mL/h) = dose_mcgkgmin × weight_kg × 60 ÷ 500'],
      hard_safety_checks: [
        {
          if: "route != 'IV'",
          then: 'BLOCK',
          message: 'Dobutamina no CRIVET é somente IV por CRI.',
        },
        {
          if: 'dose_mcgkgmin > 20 && species == "dog"',
          then: 'BLOCK',
          message: 'Dose acima do máximo recomendado para cães (20 mcg/kg/min).',
        },
        {
          if: 'dose_mcgkgmin > 10 && species == "cat"',
          then: 'BLOCK',
          message: 'Dose acima do máximo recomendado para gatos (10 mcg/kg/min).',
        },
        {
          if: "has_comorbidity('hocm') && species == 'cat'",
          then: 'BLOCK',
          message: 'HOCM em gato: evitar dobutamina (risco de piora da obstrução).',
        },
      ],
      soft_safety_checks: [
        {
          if: 'dose_mcgkgmin >= 10',
          then: 'WARN',
          message: 'Doses altas aumentam risco de taquiarritmias; ECG e PA contínuos são recomendados.',
        },
        {
          if: "has_comorbidity('arrhythmia')",
          then: 'WARN',
          message: 'Arritmia prévia: iniciar baixo e titular lentamente; corrigir hipóxia/acidose/eletrolitos antes de escalar.',
        },
        {
          if: 'infusion_planned_hours > 48',
          then: 'WARN',
          message: 'Infusões prolongadas tendem a perder eficácia por tolerância; planejar ponte curta e desmame.',
        },
      ],
      outputs: ['rate_ml_h', 'dose_mcg_min_total', 'dose_mg_kg_h_equivalent'],
      error_cost: 'Erro de 10× é clinicamente perigoso (taquiarritmia, instabilidade hemodinâmica).',
    },
    bolus: {
      required_inputs: ['weight_kg'],
      algorithm: ['Bolus não recomendado para dobutamina; usar CRI titulada ao efeito.'],
      hard_safety_checks: [
        {
          if: 'attempt_bolus == true',
          then: 'BLOCK',
          message: 'Dobutamina: bolus não é prática padrão; usar CRI com bomba e monitorização.',
        },
      ],
      soft_safety_checks: [],
      outputs: [],
      error_cost: 'Bolus inadvertido pode causar taquicardia/arrítmias e instabilidade.',
    },
    dilution_builder: {
      required_inputs: ['vial_concentration_mg_ml', 'vial_volume_ml_used', 'diluent_volume_ml'],
      algorithm: [
        'Total dobutamina (mg) = vial_concentration_mg_ml × vial_volume_ml_used',
        'Concentração final (mg/mL) = total_mg ÷ (vial_volume_ml_used + diluent_volume_ml)',
        'Concentração final (mcg/mL) = concentração_final_mg_ml × 1000',
      ],
      hard_safety_checks: [
        {
          if: 'vial_concentration_mg_ml >= 50 && (vial_volume_ml_used > 0) && final_concentration_mcg_ml > 2000',
          then: 'WARN',
          message: 'Concentração final muito alta para CRI; aumentar diluição para reduzir risco de erro de microtaxa.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'final_concentration_mcg_ml < 200 || final_concentration_mcg_ml > 1000',
          then: 'INFO',
          message: 'Faixa prática comum de CRI costuma ficar ~200–1000 mcg/mL; ajuste para facilitar taxas e reduzir erro.',
        },
      ],
      outputs: ['final_concentration_mcg_ml', 'final_concentration_mg_ml'],
      error_cost: 'Concentração errada altera diretamente a taxa calculada (risco de subdose ou overdose).',
    },
  },

  // Seção 13: Bloco Didático
  how_we_got_here_block: {
    title: 'Como chegamos a este resultado (Dobutamina CRI)',
    render_steps: [
      {
        step: 1,
        label: 'Transformar dose em microgramas por minuto',
        formula: 'mcg/min = (mcg/kg/min) × peso(kg)',
      },
      {
        step: 2,
        label: 'Converter microgramas por minuto em mL por minuto',
        formula: 'mL/min = (mcg/min) ÷ concentração(mcg/mL)',
      },
      {
        step: 3,
        label: 'Converter para mL por hora (taxa da bomba)',
        formula: 'mL/h = (mL/min) × 60',
      },
    ],
    interpretation_rules: [
      'Ajuste de dobutamina é por efeito (perfusão/PA/ECG), não por número fixo.',
      'Quanto maior a concentração (mcg/mL), menor será o mL/h para a mesma dose.',
      'Se surgirem taquiarritmias, reduza a dose imediatamente (meia-vida curta → melhora rápida após ajuste).',
    ],
    example: {
      scenario: 'Cão 10 kg, alvo 5 mcg/kg/min, solução 500 mcg/mL',
      calculation: ['mcg/min = 5 × 10 = 50 mcg/min', 'mL/min = 50 ÷ 500 = 0.1 mL/min', 'mL/h = 0.1 × 60 = 6 mL/h'],
      result: 'Programar bomba em 6 mL/h (reavaliar em 15–30 min e titular conforme PA/ECG/perfusão).',
    },
  },

  // Seção 14: Integrações
  protocol_integrations: {
    enabled: true,
    protocols: ['suporte_hemodinamico', 'anestesia_hipotensao', 'icc_aguda'],
    why_combo_exists:
      'Dobutamina é usada como suporte inotrópico de curto prazo em baixo débito/hipotensão selecionada; frequentemente integra bundles de estabilização (O2, diurético/vasodilatador quando indicado, correção de acidose/eletrólitos) até transição para terapia definitiva.',
    rules: [
      {
        if: "species == 'cat' && has_comorbidity('hocm')",
        then: {
          action: 'REMOVE_DRUG',
          drug_id: 'dobutamina',
          message: 'HOCM: evitar dobutamina por risco de piora da obstrução dinâmica.',
        },
      },
      {
        if: "has_comorbidity('arrhythmia') && dose_mcgkgmin >= 10",
        then: {
          action: 'REDUCE_DOSE',
          drug_id: 'dobutamina',
          factor: 0.75,
          message: 'Arritmia + dose alta: reduzir e priorizar controle de ritmo/causas (hipóxia/acidose/eletrolitos).',
        },
      },
    ],
  },

  // Seção 15: Fluxogramas
  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'dobutamine_low_cardiac_output',
        title: 'Baixo débito/hipoperfusão: quando considerar dobutamina (cães/gatos)',
        mermaid:
          'flowchart TD\nA[Paciente com hipoperfusão] --> B{Há hipotensão/baixo DC suspeito?}\nB -- Não --> C[Investigar outras causas: dor, sepse inicial, hipoxemia, etc.]\nB -- Sim --> D[Checar/otimizar: volume, oxigenação, acid-base, K/Mg]\nD --> E{Cardiopatia com obstrução dinâmica? (HOCM gato)}\nE -- Sim --> F[EVITAR dobutamina (BLOCK); manejar conforme cardiologia]\nE -- Não --> G[Iniciar dobutamina CRI baixa (ex 1 mcg/kg/min)]\nG --> H[Monitorar: PA + ECG + perfusão/UO]\nH --> I{Melhora perfusão/PA sem arritmia?}\nI -- Sim --> J[Manter/ajustar lentamente; planejar ponte curta 24–48h]\nI -- Não --> K{Taquiarritmia/taquicardia importante?}\nK -- Sim --> L[Reduzir/pausar; corrigir causas; considerar alternativa]\nK -- Não --> M[Escalonar dose gradualmente a cada 15–30 min]\nM --> H',
      },
      {
        id: 'dobutamine_wean',
        title: 'Desmame de dobutamina após estabilização',
        mermaid:
          'flowchart TD\nA[Edema/perfusão em melhora] --> B[Iniciar transição para terapia definitiva quando indicada (ex. pimobendan em cães)]\nB --> C[Reduzir dobutamina gradualmente ao longo de 12–24h]\nC --> D{Perfusão/PA se mantém?}\nD -- Sim --> E[Descontinuar CRI]\nD -- Não --> F[Retornar à menor dose eficaz e reavaliar causa (volume, vasodilatação, arritmia, tolerância)]',
      },
    ],
  },

  // Seção 16: UI Copy
  ui_copy: {
    critical_warning_banner:
      'Dobutamina é catecolamina de meia-vida curta: use apenas em CRI IV com ECG/PA e titule ao efeito (cuidado com taquiarritmias, especialmente ≥10 mcg/kg/min).',
    alert_messages: {
      short: 'Risco de taquiarritmia — monitore ECG/PA e titule devagar.',
      long: 'Dobutamina é pró-arrítmica em doses altas e pode ter resposta variável em PA; use bomba, ECG contínuo, PA frequente/invasiva e reavalie perfusão (UO, CRT, lactato) a cada ajuste.',
    },
    block_message: 'Uso bloqueado: HOCM em gato (inotrópico pode piorar obstrução dinâmica).',
    common_errors: [
      'Não conferir mg/mL do frasco (existem 12.5–50 mg/mL) → erro de diluição.',
      'Escalar rapidamente sem reavaliar em 15–30 min → arritmia.',
      'Usar como "vasopressor" em choque distributivo predominante → falha terapêutica.',
      'Manter >48 h sem plano de transição → tolerância e perda de efeito.',
    ],
  },

  // Seção 17: Referências
  references: [
    {
      section: 'mechanism/pharmacokinetics/presentations',
      source: 'Veterinary Anesthesia and Analgesia (Lumb & Jones), 6th ed., Cap. 21 (Adrenergic Agents) — Dobutamine (receptores β1/β2/α1, apresentações 12.5–50 mg/mL, metabisulfito, metabolismo por COMT, pró-arrítmico em doses altas)',
      page: '323',
      edition: '6',
      year: 2024,
    },
    {
      section: 'species_notes/adverse_effects',
      source: 'Veterinary Anesthesia and Analgesia (Lumb & Jones), 6th ed., Cap. 21 — efeitos hemodinâmicos em cães/gatos e risco pró-arrítmico ≥10 mcg/kg/min',
      page: '323',
      edition: '6',
      year: 2024,
    },
    {
      section: 'doses/titration (dog/cat) + wean',
      source: 'Nelson & Couto, Small Animal Internal Medicine, 6th ed., Cap. 3 (Management of Heart Failure) — dobutamina CRI inicial 1 mcg/kg/min; cães até 20; gatos até 10; titulação q15–30 min; desmame 24–48 h',
      page: '63',
      edition: '6',
    },
    {
      section: 'dilution example',
      source: 'Nelson & Couto, 6th ed., Cap. 3 — diluição 250 mg em 500 mL (D5W ou Ringer Lactato) = 500 mcg/mL; 0.6 mL/kg/h = 5 mcg/kg/min',
      page: '63',
      edition: '6',
    },
    {
      section: 'monitoring/tolerance/contra (HOCM)',
      source: 'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd ed. — dobutamina: β1 seletiva, CRI titulada, risco taquiarritmias em doses altas, monitorização (PA/ECG), tolerância com infusão prolongada; HOCM como contraindicação a inotrópicos',
      edition: '3',
    },
    {
      section: 'tolerance window (prática emergência)',
      source: 'Textbook of Small Animal Emergency Medicine (Wiley Blackwell) — dobutamina/dopamina tituladas por marcadores de DC; tolerância rápida; raramente >48 h',
      edition: '1',
    },
  ],
}
