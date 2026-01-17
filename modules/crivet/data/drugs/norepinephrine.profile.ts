import type { DrugProfile } from '../../types/drugProfile'

export const norepinephrineProfile: DrugProfile = {
  // Seção 1: Identidade
  drug_id: 'norepinefrina',
  name_pt: 'Norepinefrina (noradrenalina; bitartarato de norepinefrina)',
  name_en: 'Norepinephrine (noradrenaline; norepinephrine bitartrate)',
  synonyms: ['Noradrenalina', 'Norepinephrine', 'Norepinephrine bitartrate'],
  class: ['Catecolamina vasoativa', 'Vasopressor (predomínio alfa-adrenérgico)', 'Agonista adrenérgico α1/α2 e β1 (dose-dependente)'],

  // Seção 2: Perfil Farmacológico
  core_concepts: {
    taglines: [
      'Vasopressor de escolha em choque vasodilatatório: predomínio α → vasoconstrição e ↑ PAM.',
      'Em doses usuais, tende a ↑ pressão com pouca alteração de FC/CO; pode precisar de inotrópico associado se CO estiver baixo.',
      'Extravasamento pode causar necrose tecidual por vasoconstrição local → preferir acesso seguro e vigilância rigorosa.',
      'Usar após (ou junto de) ressuscitação volêmica: vasopressor com hipovolemia não corrigida piora perfusão.',
    ],
    mechanism: {
      receptors_targets: ['α1', 'α2', 'β1'],
      primary_effects: {
        cardiovascular:
          'Predomínio α em doses clínicas → ↑ resistência vascular sistêmica e ↑ pressão arterial; β1 pode ↑ inotropismo (e em doses muito baixas pode ↑ FC/CO). Em doses altas pode ↑ pós-carga e reduzir CO.',
        respiratory: 'Sem efeito broncodilatador clinicamente relevante; impacto respiratório é indireto (perfusão/oxigenação).',
        cns: 'Sem alvo CNS primário em uso clínico como vasopressor; impacto indireto via perfusão/pressão arterial.',
        renal_hepatic:
          'Pode causar vasoconstrição esplâncnica/renal e isquemia (potencialmente agravando disfunção orgânica) — precisa titulação e monitorização hemodinâmica.',
        gi: 'Risco de vasoconstrição esplâncnica e hipoperfusão intestinal em excesso; acompanhar perfusão global e lactato.',
      },
      clinical_metaphor:
        '"Apertar o registro do cano": a norepinefrina "fecha" a vascularização periférica (α1) para subir a pressão; se fechar demais, a água (fluxo) cai e órgãos sofrem.',
    },
    pharmacodynamics: {
      onset_iv: 'muito rápido (efeito em minutos; titulável em CRI)',
      onset_im: 'não recomendado (uso padrão é IV em CRI)',
      peak: 'minutos após ajustes de taxa',
      duration: 'curta; requer infusão contínua para efeito sustentado',
      dependencies: [
        'Dose (baixo vs alto muda balanço β1 vs α)',
        'Estado volêmico (hipovolemia piora perfusão com vasopressor)',
        'Causa do choque (vasodilatatório vs cardiogênico)',
        'Monitorização (PAM invasiva ideal; ECG contínuo)',
      ],
    },
    pharmacokinetics: {
      metabolism:
        'Meia-vida curta; metabolismo rápido semelhante a outras catecolaminas (enzimas como MAO/COMT). Parte pode ser extraída/inativada na passagem pulmonar.',
      excretion: 'Eliminação final via metabólitos (via renal).',
      dog_vs_cat:
        'Sem diferença prática destacada nas referências do acervo para ajuste de PK; abordagem é titular por efeito/monitorização em ambas as espécies.',
      active_metabolites:
        'Metabólitos sem relevância clínica como vasopressor de curta ação (ênfase clínica é na titulação pela resposta).',
      accumulation:
        'Baixo risco de acúmulo por meia-vida curta; risco clínico vem de titulação excessiva (vasoconstrição/hipertensão/isquemia).',
    },
  },

  species_notes: {
    dogs: {
      key_point:
        'Vasopressor comum em hipotensão refratária/choque vasodilatatório; titular por PAM/perfusão e considerar dobutamina se baixo débito.',
      high_risk_notes: [
        'Extravasamento → necrose local: cuidado com cateter e preferir acesso seguro.',
        'Arritmias/taquicardia/hipertensão possíveis: ECG contínuo recomendado.',
        'Doses altas podem ↑ pós-carga e ↓ CO.',
      ],
      metabolism_excretion: 'Catecolamina de meia-vida curta; efeito depende de CRI contínua e titulação.',
    },
    cats: {
      key_point:
        'Mesma lógica terapêutica: choque vasodilatatório/hipotensão refratária; titular com monitorização intensiva e cautela em cardiopatas.',
      high_risk_notes: [
        'Arritmias/hipertensão: ECG contínuo e PA frequente/invasiva ideal.',
        'Se baixo débito (ex.: cardiomiopatia), pode precisar inotrópico associado em vez de apenas aumentar vasoconstrição.',
        'Extravasamento → lesão tecidual.',
      ],
      metabolism_excretion: 'Sem diferença prática destacada no acervo; titulação guiada por hemodinâmica.',
    },
  },

  // Seção 3: Indicações e Contraindicações
  indications: {
    primary: [
      'Choque vasodilatatório (ex.: sepse) após ressuscitação volêmica, para manter PAM e perfusão.',
      'Hipotensão sob anestesia por vasodilatação (ex.: voláteis) quando fluidos/ajustes anestésicos não são suficientes.',
      'Hipotensão refratária em paciente criticamente enfermo (vasopressor de primeira linha em muitas situações).',
    ],
    secondary: [
      'Suporte hemodinâmico em condições específicas com vasoplegia (conforme decisão clínica e monitorização).',
      'Adjunto quando se deseja ↑ pressão com mínima taquicardia (em comparação a outros agentes).',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Hipovolemia não corrigida (choque hipovolêmico sem reposição adequada)',
        why: 'Vasoconstrição com volume inadequado pode piorar perfusão tecidual e agravar isquemia; usar após/associado à ressuscitação volêmica.',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Hipertensão grave pré-existente',
        why: 'Norepinefrina aumenta pressão de forma dose-dependente; risco de hipertensão severa e lesão de órgão-alvo.',
        level: 'WARNING',
      },
      {
        condition: 'Taquiarritmias / cardiopatia com risco arrítmico',
        why: 'Vasopressores podem precipitar arritmias; monitorização contínua é essencial.',
        level: 'WARNING',
      },
      {
        condition: 'Choque cardiogênico/baixo débito (sem vasoplegia dominante)',
        why: 'Aumento de pós-carga pode reduzir CO; considerar inotrópico (ex.: dobutamina) ou combinação guiada por hemodinâmica.',
        level: 'MONITOR',
      },
    ],
  },

  // Seção 4: Doses
  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      bolus: {
        mgkg: { min: 0, max: 0, note: 'Bolus não é prática padrão; usar em CRI titulada.' },
        mcgkg: { min: 0, max: 0, note: 'N/A' },
        ukg: { min: 0, max: 0, note: 'N/A' },
        route: 'IV',
        loading_dose: { min: 0, max: 0 },
      },
      cri: {
        mcgkgmin: {
          min: 0.05,
          max: 2.0,
          note: 'Faixa ampla descrita; em anestesia e choque usar titulação progressiva conforme PAM/perfusão.',
        },
        mgkgh: {
          min: 0.003,
          max: 0.12,
          note: 'Conversão de 0.05–2.0 mcg/kg/min → mg/kg/h (×0.06).',
        },
        titration: {
          increment: 'Subir em passos pequenos (ex.: 0.02–0.05 mcg/kg/min) até PAM alvo; evitar escalada brusca.',
          interval: 'Reavaliar em 5–10 min após ajuste (ou contínuo se PA invasiva).',
        },
        max: 2.0,
      },
      adjustments: {
        obesity: 'Iniciar com peso magro/ideal e titular por PAM/perfusão.',
        shock:
          'Priorizar correção de volume e causa base; iniciar cedo em choque vasodilatatório refratário, com titulação fina.',
        hypoalbuminemia:
          'Sem ajuste fixo; foco é hemodinâmica/perfusão. Monitorar resposta e sinais de vasoconstrição excessiva.',
        comorbidities:
          'Cardiopatas/arrítmicos/hipertensos: iniciar mais baixo e titular com ECG + PA; se baixo débito, associar inotrópico em vez de apenas aumentar dose.',
      },
      therapeutic_targets: {
        target_map: 'Meta típica: PAM ≥ 65 mmHg (individualizar; perfusão, lactato, diurese e mentação guiam).',
        target_etco2:
          'N/A (monitorização ventilatória conforme contexto; perfusão melhora EtCO2 em choque, mas não é alvo primário).',
        analgesia_scale: 'N/A',
        sedation_target: 'N/A',
      },
    },
    cat: {
      bolus: {
        mgkg: { min: 0, max: 0, note: 'Bolus não é prática padrão; usar em CRI titulada.' },
        mcgkg: { min: 0, max: 0, note: 'N/A' },
        ukg: { min: 0, max: 0, note: 'N/A' },
        route: 'IV',
        loading_dose: { min: 0, max: 0 },
      },
      cri: {
        mcgkgmin: {
          min: 0.05,
          max: 2.0,
          note: 'Usar titulação fina e vigilância em cardiopatas; considerar combinação com inotrópico se baixo débito.',
        },
        mgkgh: {
          min: 0.003,
          max: 0.12,
          note: 'Conversão de 0.05–2.0 mcg/kg/min → mg/kg/h (×0.06).',
        },
        titration: {
          increment: 'Subir em passos pequenos (0.02–0.05 mcg/kg/min) conforme PAM/perfusão.',
          interval: 'Reavaliar em 5–10 min após ajuste (PA invasiva ideal).',
        },
        max: 2.0,
      },
      adjustments: {
        obesity: 'Preferir peso ideal/estimado e titular ao efeito.',
        shock: 'Mesmo princípio: ressuscitar volume e tratar causa; norepi quando vasoplegia/hipotensão persistem.',
        hypoalbuminemia: 'Sem ajuste fixo; monitorar perfusão e sinais de vasoconstrição excessiva.',
        comorbidities:
          'HCM/cardiopatia: iniciar baixo, monitorar ECG/PA; se baixo débito, preferir associação com dobutamina (conforme hemodinâmica) em vez de dose alta de norepi.',
      },
      therapeutic_targets: {
        target_map: 'Meta típica: PAM ≥ 65 mmHg (individualizar).',
        target_etco2: 'N/A',
        analgesia_scale: 'N/A',
        sedation_target: 'N/A',
      },
    },
  },

  // Seção 5: Apresentações
  presentations: [
    {
      concentration_mg_ml: 1,
      volume_ml: 4,
      total_mg: 4,
      label: '1 mg/mL — ampola/frasco (bitartrato; pode conter metabissulfito de sódio)',
      examples: ['genéricos (varia por país/marca)'],
      concentration_trap_warning: 'Checar rotulagem (base vs bitartarato) e unidade (mg/mL). Erro de concentração = erro direto de dose.',
    },
    {
      concentration_mg_ml: 1,
      volume_ml: 10,
      total_mg: 10,
      label: '1 mg/mL — frasco (varia por país)',
      examples: ['genéricos (varia por país/marca)'],
    },
  ],

  // Seção 6: Diluição
  dilution_and_preparation: {
    hard_rules: [
      'Administrar como CRI titulada (evitar bolus).',
      'Monitorização hemodinâmica obrigatória; PA invasiva é ideal quando usando drogas vasoativas.',
      'Evitar extravasamento: checar patência do cateter e o local frequentemente.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 0.04,
        use_cases: ['CRI em bomba de seringa com taxas em mL/h mais confortáveis (exemplo clássico de UTI)'],
        how_to_make: 'Exemplo prático para facilitar cálculo (ajuste conforme protocolo do hospital).',
        recipe: 'Se tiver 4 mg em 4 mL (1 mg/mL): adicionar 4 mg em volume final 100 mL = 0.04 mg/mL (40 mcg/mL).',
      },
      {
        target_mg_ml: 0.1,
        use_cases: ['CRI quando se deseja menor volume total em pacientes maiores (com cautela para evitar erro)'],
        how_to_make: 'Concentração mais alta aumenta risco de erro; usar rotulagem e dupla checagem.',
        recipe: '10 mg em volume final 100 mL = 0.1 mg/mL (100 mcg/mL).',
      },
    ],
    diluents_allowed: ['NaCl 0,9% (uso comum em CRI hospitalar; confirmar protocolo local)', 'Glicose 5% (D5W) (uso comum em CRI hospitalar; confirmar protocolo local)'],
    preferred_diluent: {
      diluent: 'Conforme protocolo institucional (NaCl 0,9% ou D5W)',
      why: 'Catecolaminas exigem padronização do serviço para reduzir erro e garantir estabilidade/compatibilidade.',
    },
    stability: [
      {
        diluent: 'Conforme protocolo institucional',
        max_time_hours: 24,
        light_protection: true,
        syringe_bag_change: 'Trocar seringa/bolsa e equipo pelo menos a cada 24 h (ou conforme rotina do hospital).',
      },
    ],
    dedicated_line_required: true,
    dedicated_line_why: 'Reduz risco de incompatibilidades/bolus acidental e facilita segurança com droga vasoativa.',
  },

  // Seção 7: Compatibilidade
  compatibility: {
    diluents_allowed: ['NaCl 0,9%', 'Glicose 5% (D5W)'],
    diluents_ok: ['NaCl 0,9%', 'D5W'],
    diluentsAllowed: ['NaCl 0,9%', 'D5W'],
    diluents: ['NaCl 0,9%', 'D5W'],
    compatible_in_syringe_or_bag: ['Preferir NÃO misturar com outras drogas na mesma seringa/bolsa (padronizar linha dedicada).'],
    compatible_y_site_only: ['Se necessário, usar Y-site apenas com validação do hospital e flush entre drogas.'],
    incompatible: [
      {
        agent: 'Misturas múltiplas não validadas na mesma seringa/bolsa',
        why: 'Risco de incompatibilidade físico-química e erro de dose; catecolaminas devem seguir padronização de UTI.',
        risk: 'inativação',
      },
    ],
    avoid_same_syringe_or_precipitation_risk: [
      'Evitar misturar com qualquer fármaco sem compatibilidade confirmada.',
      'Evitar soluções sem validação do serviço (padronizar).',
    ],
    dedicated_line_rules: [
      'Usar via/lúmen dedicado quando possível.',
      'Se precisar usar via compartilhada: flush antes/depois e monitorar cuidadosamente pressão e resposta.',
    ],
  },

  // Seção 8: Administração e Titulação
  administration_and_titration: {
    bolus_guidance: ['Evitar bolus; preferir CRI titulada com ajustes pequenos e frequentes.'],
    titration_rules: [
      'Após ressuscitação volêmica, iniciar CRI e titular para PAM/perfusão.',
      'Se PA não invasiva: medir a cada 15–30 min inicialmente e após cada ajuste; depois, pelo menos a cada 4 h quando estável.',
      'Se hipotensão for por baixo débito (contractilidade baixa), considerar dobutamina em vez de aumentar apenas norepinefrina.',
    ],
    monitoring_minimum: [
      'PA (ideal: invasiva contínua em pacientes com droga vasoativa)',
      'ECG contínuo (risco de arritmias/taquicardia)',
      'Perfusão periférica, TRC, mentação, temperatura de extremidades',
      'Lactato/acidose (tendência) e diurese (quando possível)',
      'Sinais de vasoconstrição excessiva (frialdade, piora perfusão, isquemia)',
    ],
    endpoints: {
      desired_effect: ['PAM adequada e estável (individualizar; frequentemente ≥ 65 mmHg)', 'Melhora de perfusão (TRC, mentação, lactato em queda, diurese)'],
      toxicity_signs: [
        'Hipertensão importante',
        'Taquiarritmias',
        'Sinais de hipoperfusão por vasoconstrição excessiva (frialdade, piora lactato, isquemia intestinal/renal)',
        'Necrose por extravasamento',
      ],
    },
    therapeutic_failure: {
      check_first: [
        'Hipovolemia ainda presente (precisa de mais volume/controle de perdas?)',
        'Fonte de sepse/vasoplegia não controlada',
        'Sedação/anestesia excessiva causando vasodilatação',
        'Acidose grave/hipóxia reduzindo responsividade vascular',
      ],
      common_causes: [
        'Vasoplegia refratária (considerar vasopressina como adjuvante conforme disponibilidade)',
        'Baixo débito coexistente (precisa de inotrópico)',
      ],
      when_to_change: [
        'Se dose sobe e perfusão piora (lactato sobe/diurese cai) → reduzir vasoconstrição e reavaliar hemodinâmica.',
        'Se arritmias/hipertensão limitantes → reduzir/cessar e escolher alternativa/combinação guiada por monitorização.',
      ],
    },
  },

  // Seção 9: Efeitos Adversos
  adverse_effects_and_toxicity: {
    common: ['Hipertensão (dose-dependente)', 'Taquicardia/arrítmias', 'Vasoconstrição periférica excessiva'],
    serious: ['Isquemia esplâncnica/renal por vasoconstrição excessiva', 'Necrose tecidual por extravasamento'],
    subdose_signs: ['PAM continua baixa apesar de titulação', 'Perfusão continua ruim (lactato persistente/diurese baixa)'],
    overdose_signs: ['Hipertensão importante', 'Bradicardia reflexa ou arritmias', 'Extremidades frias, piora de perfusão, suspeita de isquemia'],
    management: [
      'Reduzir taxa e reavaliar alvo (PAM vs perfusão).',
      'Garantir volume intravascular adequado e tratar causa base.',
      'Se baixo débito: considerar dobutamina/estratégia combinada.',
      'Extravasamento: interromper imediatamente, trocar acesso e manejar lesão local conforme protocolo.',
    ],
    special_events: [
      {
        event: 'extravasamento',
        management:
          'Suspender infusão, trocar acesso; risco de necrose por vasoconstrição local — monitorar e tratar conforme protocolo do hospital.',
      },
    ],
  },

  // Seção 10: Alertas por Comorbidade
  alerts_by_comorbidity: [
    {
      key: 'norepi_shock_hypovolemia',
      level: 'BLOCK',
      title: 'Hipovolemia não corrigida: não "substituir" volume por vasopressor',
      why: 'Vasopressor com volume inadequado pode piorar perfusão/isquemia; usar após/associado à ressuscitação volêmica.',
      action: ['Checar fluidos/ressuscitação e perdas ativas.', 'Reavaliar USG/eco focada, lactato e resposta a fluidos.'],
      dose_adjustment: { avoid_bolus: true, require_monitoring: ['PA', 'perfusão', 'lactato'] },
    },
    {
      key: 'norepi_cat_hcm',
      level: 'WARNING',
      title: 'HCM/cardiopatia: cuidado com pós-carga e arritmias',
      why: 'Aumento de pós-carga e estímulo β1 podem piorar hemodinâmica/arrítmias; preferir doses baixas e titulação fina.',
      action: [
        'Iniciar em faixa baixa e titular por PAM + perfusão.',
        'ECG contínuo e PA invasiva se possível.',
        'Se baixo débito, considerar dobutamina (em vez de escalar norepi).',
      ],
      dose_adjustment: {
        reduce_percent: 30,
        avoid_bolus: true,
        require_monitoring: ['ECG contínuo', 'PA (ideal invasiva)', 'perfusão/lactato'],
      },
    },
    {
      key: 'norepi_ckd_azotemia',
      level: 'MONITOR',
      title: 'DRC/azotemia: risco de hipoperfusão renal se vasoconstrição excessiva',
      why: 'Vasopressores podem reduzir perfusão esplâncnica/renal em excesso; monitorar diurese/creatinina e perfusão global.',
      action: ['Evitar metas de PAM "altas demais" sem benefício claro.', 'Monitorar diurese e tendência de creatinina/ureia, lactato.'],
    },
    {
      key: 'norepi_severe_hypertension',
      level: 'BLOCK',
      title: 'Hipertensão grave: norepinefrina pode piorar',
      why: 'Efeito pressor dose-dependente aumenta risco de lesão de órgão-alvo.',
      action: ['Escolher estratégia alternativa; se imprescindível, usar dose mínima com monitorização intensiva.'],
    },
    {
      key: 'norepi_arrhythmia_risk',
      level: 'WARNING',
      title: 'Risco de arritmias: exigir ECG contínuo',
      why: 'Vasopressores podem causar arritmias/taquicardia/hipertensão.',
      action: ['ECG contínuo', 'PA frequente/invasiva', 'corrigir hipóxia/acidose/eletrólitos'],
    },
  ],

  // Seção 11: Presets
  presets: [
    {
      id: 'septic_shock_start',
      label: 'Choque séptico (início) 🟨',
      dose_mcgkgmin: 0.05,
      limits: { min: 0.02, max: 0.2 },
      clinical_target: 'Início após volume: elevar PAM e perfusão; titular rapidamente conforme resposta.',
      linked_alerts: ['norepi_shock_hypovolemia', 'norepi_arrhythmia_risk'],
    },
    {
      id: 'refractory_hypotension_typical',
      label: 'Hipotensão refratária (típico) 🟧',
      dose_mcgkgmin: 0.2,
      limits: { min: 0.05, max: 1.0 },
      clinical_target: 'Manter PAM adequada com mínima taquicardia; considerar inotrópico se baixo débito.',
      linked_alerts: ['norepi_arrhythmia_risk', 'norepi_ckd_azotemia'],
    },
    {
      id: 'upper_range_icu',
      label: 'UTI (faixa alta) 🟥',
      dose_mcgkgmin: 1.0,
      limits: { min: 0.5, max: 2.0 },
      clinical_target: 'Vasoplegia grave com monitorização intensiva; avaliar isquemia/baixo débito e considerar combinações.',
      linked_alerts: ['norepi_ckd_azotemia', 'norepi_arrhythmia_risk'],
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
        'mcg/kg/min → mg/kg/h: multiplicar por 0.06 e dividir por 1000 (ou: mcg/kg/min × 0.06 = mcg/kg/h; depois /1000 = mg/kg/h).',
        'Se concentração em mg/mL: converter para mcg/mL (mg/mL × 1000).',
      ],
      hard_safety_checks: [
        {
          if: "has_comorbidity('severe_hypertension')",
          then: 'BLOCK',
          message: 'Hipertensão grave: norepinefrina pode piorar. Reavaliar estratégia.',
        },
        {
          if: "shock_type == 'hypovolemic' && !volume_resuscitated",
          then: 'BLOCK',
          message: 'Hipovolemia não corrigida: ressuscitar volume antes de vasopressor.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'dose_mcgkgmin > 1.0',
          then: 'WARN',
          message: 'Dose alta aumenta risco de vasoconstrição/isquemia e queda de CO; exigir monitorização intensiva.',
        },
        {
          if: "has_comorbidity('cardiac_disease') || has_comorbidity('hcm')",
          then: 'WARN',
          message: 'Cardiopatia/HCM: iniciar mais baixo e titular; risco de arritmias e aumento de pós-carga.',
        },
        {
          if: 'final_concentration_mcg_ml >= 100',
          then: 'WARN',
          message: 'Concentração alta aumenta risco de erro de dose; dupla checagem obrigatória.',
        },
      ],
      outputs: ['dose_total_mcg_min', 'dose_total_mcg_h', 'rate_ml_h'],
      error_cost: 'Erro de 10× pode causar hipertensão grave, arritmias e isquemia; subdose mantém choque e piora perfusão.',
    },
    bolus: {
      required_inputs: ['weight_kg'],
      algorithm: ['Bolus não recomendado para norepinefrina; usar CRI titulada.'],
      hard_safety_checks: [
        { if: 'true', then: 'WARN', message: 'Norepinefrina é vasopressor de CRI titulada; bolus não é prática padrão.' },
      ],
      soft_safety_checks: [],
      outputs: [],
      error_cost: 'Bolus pode causar picos pressóricos e arritmias.',
    },
    dilution_builder: {
      required_inputs: ['stock_concentration_mg_ml', 'stock_volume_ml', 'diluent_volume_ml'],
      algorithm: [
        'Total (mg) = stock_concentration_mg_ml × stock_volume_ml',
        'Total (mcg) = total_mg × 1000',
        'Volume final (mL) = stock_volume_ml + diluent_volume_ml',
        'Concentração final (mcg/mL) = total_mcg ÷ volume_final_ml',
      ],
      hard_safety_checks: [
        {
          if: 'diluent_volume_ml == 0',
          then: 'WARN',
          message: 'Evite administrar sem diluição padronizada; aumenta risco de erro e extravasamento.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'final_concentration_mcg_ml < 10 || final_concentration_mcg_ml > 200',
          then: 'INFO',
          message: 'Concentração fora do comum; revisar se taxa em mL/h ficará prática e segura.',
        },
      ],
      outputs: ['final_concentration_mcg_ml', 'final_volume_ml'],
      error_cost: 'Concentração errada altera diretamente taxa (mL/h) e risco de sobre/subdose.',
    },
  },

  // Seção 13: Bloco Didático
  how_we_got_here_block: {
    title: 'Como chegamos a este resultado (Norepinefrina CRI)',
    render_steps: [
      {
        step: 1,
        label: 'Dose por minuto (mcg/min)',
        formula: 'mcg/min = (mcg/kg/min) × peso(kg)',
      },
      {
        step: 2,
        label: 'Converter para hora (mcg/h)',
        formula: 'mcg/h = (mcg/min) × 60',
      },
      {
        step: 3,
        label: 'Converter para taxa (mL/h)',
        formula: 'mL/h = (mcg/h) ÷ concentração(mcg/mL)',
      },
    ],
    interpretation_rules: [
      'Norepinefrina é vasopressor: alvo é PAM + perfusão (não apenas número).',
      'Se PAM sobe mas perfusão piora (lactato/diurese), pode ser vasoconstrição excessiva → reduzir e reavaliar baixo débito/volume.',
      'PA invasiva + ECG contínuo são padrão ouro com drogas vasoativas.',
    ],
    example: {
      scenario: 'Gato 4,2 kg, dose 0,1 mcg/kg/min, solução 50 mcg/mL',
      calculation: ['mcg/min = 0,1 × 4,2 = 0,42 mcg/min', 'mcg/h = 0,42 × 60 = 25,2 mcg/h', 'mL/h = 25,2 ÷ 50 = 0,504 mL/h'],
      result: 'Programar 0,50 mL/h e reavaliar PAM/perfusão em 5–10 min.',
    },
  },

  // Seção 14: Integrações
  protocol_integrations: {
    enabled: true,
    protocols: ['choque_septico', 'hipotensao_anestesia', 'vasoativos_uti'],
    why_combo_exists:
      'Norepinefrina aumenta PAM por vasoconstrição (α). Se o problema principal for baixo débito/contractilidade (ex.: disfunção miocárdica séptica), pode ser necessário associar inotrópico (ex.: dobutamina) em vez de apenas aumentar pós-carga.',
    rules: [
      {
        if: "shock_type == 'hypovolemic' && !volume_resuscitated",
        then: {
          action: 'PREFER_ALTERNATIVE',
          drug_id: 'norepinefrina',
          message: 'Ressuscitar volume primeiro; vasopressor isolado pode piorar perfusão.',
        },
      },
      {
        if: "has_comorbidity('hcm') || has_comorbidity('cardiac_disease')",
        then: {
          action: 'REDUCE_DOSE',
          drug_id: 'norepinefrina',
          factor: 0.7,
          message: 'Cardiopatia/HCM: iniciar mais baixo e titular com ECG + PA; considerar dobutamina se baixo débito.',
        },
      },
    ],
  },

  // Seção 15: Fluxogramas
  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'norepi_septic_shock',
        title: 'Norepinefrina no choque vasodilatatório (ex.: sepse) — decisão prática',
        mermaid:
          'flowchart TD\nA[Hipotensão/choque] --> B[Corrigir via aérea/oxigênio + acesso IV]\nB --> C[Reposição volêmica e controle de fonte]\nC --> D{PAM ainda baixa?}\nD -- Não --> E[Monitorar perfusão]\nD -- Sim --> F[Iniciar norepinefrina CRI 0.05 mcg/kg/min]\nF --> G[Monitorar PA (ideal invasiva) + ECG]\nG --> H[Reavaliar em 5-10 min]\nH --> I{Perfusão e PAM adequadas?}\nI -- Sim --> J[Manter e reduzir progressivamente quando possível]\nI -- Não --> K[Subir em passos 0.02-0.05 mcg/kg/min]\nK --> L{Dose alta >1.0 ou sinais de isquemia/baixo débito?}\nL -- Sim --> M[Reavaliar hemodinâmica: considerar dobutamina/vasopressina e reduzir vasoconstrição]\nL -- Não --> H',
      },
    ],
  },

  // Seção 16: UI Copy
  ui_copy: {
    critical_warning_banner:
      'Norepinefrina é vasopressor de CRI titulada: use após (ou junto de) ressuscitação volêmica, com PA (ideal invasiva) + ECG contínuo, e cuidado extremo com extravasamento.',
    alert_messages: {
      short: 'Vasopressor potente: exige PA/ECG e titulação fina; extravasamento pode necrosar.',
      long: 'Norepinefrina (α1/α2>β1 em doses clínicas) eleva PAM principalmente por vasoconstrição. Em choque vasodilatatório é primeira linha em muitas situações. Doses altas podem reduzir CO e perfusão esplâncnica/renal; reavalie perfusão (lactato/diurese) e considere inotrópico se baixo débito. PA invasiva é ideal; ECG contínuo é essencial.',
    },
    block_message: 'Uso bloqueado: hipertensão grave ou hipovolemia não corrigida — reavaliar ressuscitação/estratégia.',
    common_errors: [
      'Substituir volume por vasopressor (piora perfusão).',
      'Aumentar dose para subir PAM sem checar perfusão/lactato/diurese (vasoconstrição excessiva).',
      'Infundir em acesso periférico instável e não vigiar extravasamento.',
      'Não usar ECG/PA contínuos com droga vasoativa.',
    ],
  },

  // Seção 17: Referências
  references: [
    {
      section: 'mechanism/pharmacodynamics/pharmacokinetics',
      source:
        'Veterinary Anesthesia and Analgesia (Lumb & Jones), 6th ed. — capítulo de fármacos adrenérgicos (Norepinephrine: receptores α1/α2/β1, uso em hipotensão por vasodilatação, efeitos dose-dependentes, extravasamento/necrose, PK curta)',
      page: 'linhas ~33702–33758 do TXT extraído do PDF',
      edition: '6',
    },
    {
      section: 'doses (CRI), indicações em anestesia',
      source:
        'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd ed. — tabela de simpatomiméticos em anestesia (Noradrenaline 0.1–1.0 mcg/kg/min; ↑ BP com mínima mudança de HR/CO; combinar com dobutamina se precisar ↑ CO; usado em hipotensão refratária)',
      page: 'Ch21, p.343 (conforme TXT)',
      edition: '3',
      year: 2018,
    },
    {
      section: 'choque séptico: racional e monitorização; dose range ampla',
      source:
        'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd ed. — capítulo de choque: escolha de vasopressor (noradrenaline/dopamine), mecanismo α, dose 0.05–2 mcg/kg/min, necessidade de PA invasiva ideal e ECG contínuo; risco de vasoconstrição esplâncnica/renal',
      page: 'Ch3 (seção Vasopressor and inotropic therapy; conforme TXT em torno de "present... noradrenaline")',
      edition: '3',
      year: 2018,
    },
    {
      section: 'doses (exemplo clínico em terapêutica), reforço de faixa baixa',
      source: 'Textbook of Small Animal Emergency Medicine (Wiley Blackwell) — Box de terapêutica (ex.: ALF: vasopressor norepinephrine 0.05–0.5 mcg/kg/min IV CRI)',
      page: 'Box 90.4 (conforme TXT, linhas ~53280–53340)',
      edition: '1',
    },
  ],
}
