import type { DrugProfile } from '../../types/drugProfile'

export const ketamineProfile: DrugProfile = {
  // Seção 1: Identidade
  drug_id: 'cetamina',
  name_pt: 'Cetamina (Cloridrato de Cetamina)',
  name_en: 'Ketamine HCl',
  synonyms: ['Ketamine', 'Cloridrato de cetamina', 'Dissociativo NMDA'],
  class: ['Anestésico dissociativo', 'Antagonista não-competitivo NMDA', 'Adjunto analgésico anti-hiperalgésico'],

  // Seção 2: Perfil Farmacológico
  core_concepts: {
    taglines: [
      'Antagonismo NMDA (não-competitivo): reduz sensibilização central e fenômenos de wind-up (dor que "se amplifica" com estímulos repetidos).',
      'Dissociação tálamo–córtex/limbo: estado cataleptoide (aparenta "acordado", olhos abertos, reflexos podem persistir), porém sem resposta adequada ao estímulo nociceptivo.',
      'Ações adicionais descritas para dissociativos: interação com receptores opioides, monoaminérgicos, muscarínicos e canais de cálcio voltagem-dependentes (explica parte de analgesia/bronco e delirium de emergência).',
    ],
    mechanism: {
      receptors_targets: ['NMDA', 'Opioides', 'Monoaminérgicos', 'Muscarínicos'],
      primary_effects: {
        cns: 'Antagonismo NMDA reduz wind-up e sensibilização central. Dissociação tálamo-córtex/limbo com preservação relativa do tronco encefálico.',
        cardiovascular: 'Tendência simpaticomimética clínica (↑ FC/PA/DC) por estímulo simpático — útil em hipotensão/choque selecionados, perigoso em cardiopatias com limitação de enchimento/afterload.',
        respiratory: 'Em doses/bolus rápidos pode haver eventos respiratórios (apneia) e disforia na recuperação se usada isoladamente/sem sedativo.',
      },
      clinical_metaphor: 'Dissociativo NMDA: reduz "memória da dor" (wind-up) e dissocia consciência mantendo reflexos.',
    },
    pharmacodynamics: {
      onset_iv: '≈ 45–90 s (indução IV em combinação típica com benzodiazepínico)',
      onset_im: '≤ 10 min (efeito clínico)',
      peak: '≈ 1 min (IV) | ≈ 10 min (IM)',
      duration: '≈ 20 min (combinações tipo cetamina–diazepam/associados). Em infusão analgésica baixa, redução de resposta a manipulação dolorosa sob anestesia pode aparecer em ~10 min.',
      dependencies: ['Reservas de catecolaminas', 'Função hepática', 'Função renal (gatos)'],
    },
    pharmacokinetics: {
      metabolism: 'Hepático: desmetilação → norketamina (metabólito ativo), seguida de hidroxilação e conjugação → metabólitos hidrossolúveis inativos.',
      excretion: 'Renal (metabólitos/conjugados; em felinos, maior fração de excreção urinária sem metabolismo adicional).',
      dog_vs_cat: 'No gato, a cetamina é biotransformada a norketamina, porém a norketamina é excretada na urina sem metabolismo adicional significativo (diferença clínica importante). Usar com cautela em disfunção hepática e/ou renal → risco de prolongamento de efeito.',
      active_metabolites: 'Norketamina (ativo; excreção renal em gatos sem metabolismo adicional)',
    },
    formulation_notes: {
      stability: 'Compatível com NaCl 0,9%, Ringer Lactato, Glicose 5%',
      equipment_adsorption: 'Sem adsorção significativa em equipos padrão',
    },
  },

  species_notes: {
    dogs: {
      key_point: 'Metabolismo principalmente hepático; duração geralmente previsível.',
      high_risk_notes: [
        'Bolus muito rápido pode causar apneia/disforia',
        'Dose alta exige associação (benzo/opioide) e planejamento ventilatório',
      ],
      metabolism_excretion: 'Metabolismo hepático → norketamina → conjugação → excreção renal',
    },
    cats: {
      key_point: 'Maior relevância de excreção renal de droga ativa/metabólitos ativos. Risco de prolongamento em DRC/obstrução uretral.',
      high_risk_notes: [
        'HCM: contraindicação forte',
        'DRC/obstrução uretral: risco de efeito prolongado importante',
        'Norketamina excretada inalterada na urina sem metabolismo adicional',
      ],
      metabolism_excretion: 'Metabolismo hepático → norketamina → excreção renal sem metabolismo adicional (particularidade felina)',
    },
  },

  // Seção 3: Indicações e Contraindicações
  indications: {
    primary: [
      'Adjunto analgésico em baixa dose (microdose/low-dose CRI) — Dor aguda moderada a intensa (multimodal), especialmente quando se deseja efeito poupador de opioide',
      'Pacientes críticos (trauma, pancreatite, politrauma) como adjuvante analgésico — visando reduzir sensibilização central e consumo de opioide',
      'Analgesia intraoperatória por CRI — Como parte de anestesia balanceada para reduzir resposta autonômica à dor e reduzir inalatório (MAC-sparing)',
      'Indução anestésica (associada, não "solo") — Indução em paciente com risco de hipotensão (selecionado) quando se quer preservar drive simpático, sempre associando benzodiazepínico',
    ],
    secondary: [
      'Procedimentos curtos/diagnóstico por imagem quando protocolo dissociativo fizer sentido',
      'Broncodilatação: útil como adjunto em asma felina/broncoespasmo',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Gato com cardiomiopatia hipertrófica/obstrutiva suspeita',
        why: 'Efeito simpático pode aumentar FC/consumo de O2 e piorar enchimento diastólico, precipitando descompensação.',
        level: 'CRITICAL',
      },
    ],
    relative: [
      {
        condition: 'Gato com DRC/azotemia/obstrução uretral',
        why: 'Em felinos, metabolismo/excreção favorece eliminação urinária com menor metabolismo adicional; pode prolongar efeito quando a excreção renal está comprometida.',
        level: 'WARNING',
      },
      {
        condition: 'Suspeita de pressão intracraniana elevada',
        why: 'Dissociativos podem aumentar fluxo sanguíneo cerebral/CMRO2 e elevar ICP; risco é menor se ventilação controlada e eucapnia forem garantidas.',
        level: 'MONITOR',
      },
      {
        condition: 'Epilepsia/convulsões',
        why: 'Há recomendação clássica de evitar; porém evidências citadas sugerem que pode não reduzir limiar convulsivo em epilépticos e pode ter efeitos anticonvulsivantes/neuroprotetores — trate como decisão caso-a-caso.',
        level: 'WARNING',
      },
      {
        condition: 'Glaucoma/lesão ocular penetrante',
        why: 'Preocupação tradicional com pressão intraocular; escolha alternativa quando possível.',
        level: 'WARNING',
      },
      {
        condition: 'Hipertensão grave',
        why: 'Simpaticomimético clínico pode piorar hipertensão.',
        level: 'WARNING',
      },
    ],
  },

  // Seção 4: Doses
  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      bolus: {
        mgkg: {
          min: 0.25,
          max: 0.5,
          note: 'Loading analgésico (pré-CRI) — IV lento (2-3 min); objetivo é "carregar" compartimento central antes da CRI',
        },
        route: 'IV',
        loading_dose: {
          min: 0.25,
          max: 0.5,
        },
      },
      cri: {
        mcgkgmin: {
          min: 2,
          max: 10,
          note: 'Analgesia pós-operatória (CRI baixa) 2-5 mcg/kg/min = 0,12-0,3 mg/kg/h. Analgesia intraoperatória (CRI moderada) 10 mcg/kg/min = 0,6 mg/kg/h',
        },
        mgkgh: {
          min: 0.12,
          max: 0.6,
        },
        titration: {
          increment: 'Aumentar gradualmente: 2→5→10 mcg/kg/min conforme resposta',
          interval: 'Reavaliar em 10–15 min',
        },
        max: 50,
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 0.25,
          max: 5,
          note: 'Loading analgésico 0,25-0,5 mg/kg IV lento. Indução anestésica 2-5 mg/kg IV sempre associada a benzo/hipnótico',
        },
        route: 'IV',
        loading_dose: {
          min: 0.25,
          max: 0.5,
        },
      },
      cri: {
        mcgkgmin: {
          min: 2,
          max: 10,
          note: 'Analgesia pós-operatória (CRI baixa) 2-5 mcg/kg/min = 0,12-0,3 mg/kg/h. Analgesia intraoperatória (CRI moderada) 10 mcg/kg/min = 0,6 mg/kg/h. Titrar com foco em analgesia e comportamento na recuperação; monitorar mais de perto em suspeita de DRC',
        },
        mgkgh: {
          min: 0.12,
          max: 0.6,
        },
        titration: {
          increment: 'Evitar escalar agressivamente em felinos com comorbidades cardíacas/renais',
          interval: 'Reavaliar em 10–15 min',
        },
        max: 50,
      },
      adjustments: {
        comorbidities: 'Em gatos, considere maior risco de prolongamento em disfunção renal (metabolismo/excreção com particularidade felina)',
      },
    },
  },

  // Seção 5: Apresentações
  presentations: [
    {
      concentration_mg_ml: 100,
      label: '100 mg/mL (10%) — Dopalen/Vetaset/Cetamin',
      examples: ['Dopalen', 'Vetaset', 'Cetamin'],
      concentration_trap_warning: 'Concentração 100 mg/mL (10%) é "alto risco" para pequenos pacientes — favorece erro de volume. Preferir diluição para CRI e, muitas vezes, também para bolus em gatos.',
    },
    {
      concentration_mg_ml: 50,
      label: '50 mg/mL (5%)',
      concentration_trap_warning: 'Ainda concentrado para CRI sem diluição.',
    },
  ],

  // Seção 6: Diluição
  dilution_and_preparation: {
    hard_rules: [
      'CRI requer diluição (bloquear cálculo se usar 50-100 mg/mL como concentração final)',
      'Bolus IV deve ser lento para reduzir apneia/disforia',
    ],
    recommended_targets: [
      {
        target_mg_ml: 1,
        use_cases: ['CRI analgésica (2–10 mcg/kg/min)'],
        how_to_make: 'Facilita taxas >0,1 mL/h em pacientes pequenos e melhora acurácia de bomba',
        recipe: 'Diluir 1:100 a partir de 100 mg/mL (1 mL cetamina 100 mg/mL + 99 mL diluente = 1 mg/mL)',
      },
      {
        target_mg_ml: 2,
        use_cases: ['CRI mista (MLK) com taxas práticas'],
        how_to_make: 'Ajustar conforme volume de seringa',
        recipe: 'Diluir conforme necessidade',
      },
      {
        target_mg_ml: 10,
        use_cases: ['Bolus/indução em pequenos pacientes'],
        how_to_make: '1:10 reduz risco de erro (ex.: 0,15 mL vira 1,5 mL, mais fácil de dosar)',
        recipe: '1 mL cetamina 100 mg/mL + 9 mL diluente = 10 mg/mL',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5%'],
  },

  // Seção 7: Compatibilidade
  compatibility: {
    compatible_in_syringe_or_bag: [
      'Midazolam (preferível para prevenir disforia)',
      'Lidocaína (MLK)',
      'Morfina',
      'Fentanil',
      'Remifentanil',
      'Dexmedetomidina',
    ],
    compatible_y_site_only: [
      'Opioides (ex.: fentanil, morfina/metadona, remifentanil)',
      'Lidocaína (MLK)',
      'Midazolam (para reduzir disforia e melhorar relaxamento)',
    ],
    incompatible: [
      {
        agent: 'Diazepam',
        why: 'Não misturar na mesma seringa, risco de incompatibilidade física',
        risk: 'precipitação',
      },
      {
        agent: 'Barbitúricos (ex.: tiopental)',
        why: 'Incompatibilidade físico-química',
        risk: 'precipitação',
      },
      {
        agent: 'Bicarbonato de sódio',
        why: 'pH alcalino pode inativar/alterar a estabilidade',
        risk: 'inativação',
      },
    ],
    dedicated_line_rules: [
      'Compatibilidade pode variar por concentração/tempo/material; quando em dúvida, via exclusiva ou Y-site testado institucionalmente',
    ],
  },

  // Seção 8: Administração e Titulação
  administration_and_titration: {
    bolus_guidance: [
      'Administrar lentamente (2-3 min) para reduzir apneia/disforia',
      'Evitar bolus rápido ("tiro")',
      'Associar benzodiazepínico conforme protocolo',
    ],
    titration_rules: [
      'Reavaliar em 10–15 min',
      'Se dor persiste e hemodinâmica tolera → escalar CRI (ex.: 2→5; 5→10)',
      'Se disforia/rigidez importante → reduzir e reforçar benzo/sedação ambiental',
    ],
    monitoring_minimum: [
      'PA (idealmente invasiva em CRI intraop/choque)',
      'FC/ritmo (ECG se disponível)',
      'Ventilação (EtCO2/SpO2), sobretudo em bolus/associações',
      'Temperatura',
      'Dor (escores) e qualidade de recuperação (disforia)',
      'Diurese, creatinina/ureia (gatos ou DRC)',
    ],
    endpoints: {
      desired_effect: [
        'Redução de wind-up/sensibilização central',
        'Redução de necessidade de opioide/anestésico inalatório',
        'Analgesia adequada com mínimo de disforia',
      ],
      toxicity_signs: [
        'Disforia/delirium de emergência',
        'Rigidez muscular/catalepsia persistente',
        'Apneia/hipoventilação após bolus rápido',
        'Prolongamento de recuperação (especialmente em gatos renais)',
      ],
    },
    therapeutic_failure: {
      check_first: ['Associação adequada (benzo/opioide)', 'Velocidade de administração (bolus lento)', 'Comorbidades que afetam clearance'],
      common_causes: [
        'Dose insuficiente sem associação adequada',
        'Bolus rápido causando apneia/disforia',
        'Falha em ajustar para comorbidades (renal em gatos)',
      ],
      when_to_change: [
        'Se disforia persistir apesar de benzo adequado',
        'Se dor persistir após escalonamento apropriado',
        'Se houver sinais de toxicidade/prolongamento',
      ],
    },
  },

  // Seção 9: Efeitos Adversos
  adverse_effects_and_toxicity: {
    common: [
      'Rigidez muscular/catalepsia e reflexos persistentes — Fenótipo dissociativo; melhora com benzodiazepínico/associação adequada',
      'Disforia/delirium de emergência — Efeito CNS e recuperação sem sedação adequada; risco maior se reverter sedativo antes da "dissociação" cessar',
    ],
    serious: [
      'Apneia/hipoventilação após bolus rápido — Efeito dose/velocidade-dependente + sinergia com outros depressores',
      'Prolongamento importante em gato com disfunção renal — Particularidade de metabolismo/excreção felina e dependência renal',
    ],
    management: [
      'Reduzir/parar CRI se disforia importante',
      'Associar benzodiazepínico para rigidez/catalepsia',
      'Suporte ventilatório se apneia',
      'Monitorar recuperação prolongada (especialmente gatos renais)',
    ],
    special_events: [
      {
        event: 'Disforia de emergência',
        management: 'Manter ambiente calmo; evitar reverter sedativos precocemente; tratar com benzo/opioide conforme necessidade',
      },
      {
        event: 'Prolongamento em gato renal',
        management: 'Reduzir dose; evitar redoses; monitorar diurese e creatinina',
      },
    ],
  },

  // Seção 10: Alertas por Comorbidade
  alerts_by_comorbidity: [
    {
      key: 'ketamine_cat_ckd',
      level: 'WARNING',
      title: 'Gato com DRC/azotemia/obstrução uretral',
      why: 'Felinos: cetamina/norketamina dependem fortemente de excreção urinária (com particularidade felina). Risco de efeito prolongado.',
      action: [
        'Reduzir dose',
        'Preferir CRI baixa e monitorar recuperação',
        'Evite em DRC avançada',
      ],
      dose_adjustment: {
        reduce_percent: 30,
        avoid_bolus: false,
        require_monitoring: ['Diurese', 'Creatinina/Ureia', 'Recuperação'],
        suggest_alternative: 'Considerar alternativa em DRC avançada',
      },
    },
    {
      key: 'ketamine_suspected_hcm_cat',
      level: 'CRITICAL',
      title: 'Gato com HCM/suspeita',
      why: '↑ FC/consumo O2 e piora do enchimento diastólico pode descompensar HCM.',
      action: [
        'Evitar cetamina',
        'Preferir alternativa (alfaxalona/etomidato conforme cenário) e monitorização avançada',
      ],
      dose_adjustment: {
        suggest_alternative: 'Alfaxalona ou Etomidato',
      },
    },
    {
      key: 'ketamine_increased_icp',
      level: 'MONITOR',
      title: 'Suspeita de ICP elevada',
      why: 'Dissociativos podem ↑ CBF/CMRO2 e ICP. Se usar, garanta ventilação controlada e eucapnia; associe benzo/hipnótico conforme técnica.',
      action: [
        'Garantir ventilação controlada e eucapnia',
        'Associar benzo/hipnótico conforme técnica',
        'Monitorar PA e neurologia',
      ],
      dose_adjustment: {
        require_monitoring: ['EtCO2', 'PA', 'Neurologia'],
      },
    },
    {
      key: 'glaucoma_or_open_globe',
      level: 'WARNING',
      title: 'Glaucoma/lesão ocular penetrante',
      why: 'Possível aumento de pressão intraocular; escolha alternativa quando possível.',
      action: ['Preferir outra estratégia anestésica/sedativa'],
      dose_adjustment: {
        suggest_alternative: 'Alternativa sem risco de PIO',
      },
    },
    {
      key: 'seizure_disorder',
      level: 'WARNING',
      title: 'Epilepsia/convulsões',
      why: 'Pode não reduzir limiar convulsivo em epilépticos; evidências sugerem efeitos anticonvulsivantes/neuroprotetores — decisão caso-a-caso.',
      action: [
        'Associar midazolam',
        'Evitar doses altas/isoladas',
        'Tratar como decisão caso-a-caso',
      ],
    },
    {
      key: 'severe_hypertension',
      level: 'WARNING',
      title: 'Hipertensão grave',
      why: 'Simpaticomimético clínico pode piorar hipertensão.',
      action: ['Preferir microdose', 'Monitorar PA continuamente'],
      dose_adjustment: {
        reduce_percent: 20,
        require_monitoring: ['PA invasiva'],
      },
    },
  ],

  // Seção 11: Presets
  presets: [
    {
      id: 'postop_low',
      label: 'Pós-operatório (CRI baixa) 🟩',
      dose_mcgkgmin: 2,
      clinical_target: 'Adjuvante analgésico conservador',
    },
    {
      id: 'postop_high',
      label: 'Pós-operatório (CRI alta) 🟨',
      dose_mcgkgmin: 5,
      clinical_target: 'Maior intensidade analgésica mantendo faixa de low-dose',
    },
    {
      id: 'intraop_analgesia',
      label: 'Intraoperatório (CRI 10) 🟧',
      dose_mcgkgmin: 10,
      clinical_target: 'Equivalente a 0,6 mg/kg/h, descrita como low-dose analgésica adjunta e usada para MAC-sparing',
    },
    {
      id: 'loading_bolus',
      label: 'Bolus de ataque (loading) 💉',
      dose_mgkg: 0.25,
      clinical_target: 'Padroniza início de CRI (evita "demorar" para fazer efeito)',
    },
  ],

  // Seção 12: Templates de Cálculo
  calculation_templates: {
    cri: {
      required_inputs: ['weight_kg', 'dose_mcg_per_kg_min', 'final_concentration_mg_per_ml'],
      algorithm: [
        '1) Calcular mcg/min: peso(kg) × dose(mcg/kg/min)',
        '2) Converter para mg/h: (mcg/min × 60) ÷ 1000',
        '3) Converter para mL/h: mg/h ÷ concentração final (mg/mL)',
      ],
      outputs: ['rate_ml_per_h'],
      hard_safety_checks: [
        {
          if: 'final_concentration_mg_per_ml >= 50',
          then: 'BLOCK',
          message: 'Concentração final muito alta para CRI. Diluir para 1-2 mg/mL.',
        },
        {
          if: 'species == "cat" AND comorbidities_any IN ["DRC","azotemia","injuria_renal_aguda","obstrucao_uretral"] AND planned_cri_mcg_per_kg_min >= 5',
          then: 'BLOCK',
          message: 'Risco aumentado de recuperação prolongada em felino com comprometimento renal. Prefira CRI baixa e reavalie necessidade.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'calculated_volume_ml < 0.1',
          then: 'WARN',
          message: 'Volume muito pequeno → alto risco de erro. Recomenda-se diluir (ex.: para 10 mg/mL) e recalcular.',
        },
      ],
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_mg_per_kg', 'stock_concentration_mg_per_ml'],
      algorithm: [
        '1) Dose total (mg): peso(kg) × dose(mg/kg)',
        '2) Volume (mL): dose total (mg) ÷ concentração estoque (mg/mL)',
      ],
      outputs: ['volume_ml'],
      soft_safety_checks: [
        {
          if: 'calculated_bolus_volume_ml < 0.1',
          then: 'WARN',
          message: 'Volume muito pequeno → alto risco de erro. Recomenda-se diluir (ex.: para 10 mg/mL) e recalcular.',
        },
        {
          if: 'weight_kg <= 5 && stock_concentration_mg_per_ml >= 100',
          then: 'WARN',
          message: 'Paciente pequeno + frasco 100 mg/mL: considerar diluir para 10 mg/mL.',
        },
      ],
    },
    dilution_builder: {
      required_inputs: ['stock_concentration_mg_per_ml', 'target_concentration_mg_per_ml', 'final_volume_ml'],
      algorithm: [
        '1) Quantidade total de fármaco necessária (mg): alvo(mg/mL) × volume final (mL)',
        '2) Volume do estoque (mL): mg necessários ÷ concentração do estoque (mg/mL)',
        '3) Completar com diluente até volume final',
      ],
      outputs: ['drug_volume_ml', 'diluent_volume_ml'],
    },
  },

  // Seção 13: Bloco Didático
  how_we_got_here_block: {
    title: 'Como chegamos a este resultado',
    render_steps: [
      { step: 1, label: 'Dose por minuto', formula: 'dose_total_mcg_min = dose_mcgkgmin × peso_kg' },
      { step: 2, label: 'Converter para hora', formula: 'dose_total_mcg_h = dose_total_mcg_min × 60' },
      { step: 3, label: 'Converter concentração', formula: 'conc_mcg_ml = conc_mg_ml × 1000' },
      { step: 4, label: 'Taxa final', formula: 'taxa_ml_h = dose_total_mcg_h ÷ conc_mcg_ml' },
    ],
    interpretation_rules: [
      'CRI analgésica (2-10 mcg/kg/min): foco em anti-hiperalgesia, não inconsciência',
      'Se disforia: checar associação com benzodiazepínico e velocidade de bolus',
      'Reavaliar em 10–15 min; escalar se necessário mantendo hemodinâmica estável',
    ],
    example: {
      scenario: 'Cão 20 kg, CRI 5 mcg/kg/min, concentração final 1 mg/mL',
      calculation: [
        '1) 20 kg × 5 mcg/kg/min = 100 mcg/min',
        '2) 100 mcg/min × 60 = 6000 mcg/h = 6 mg/h',
        '3) 1 mg/mL = 1000 mcg/mL',
        '4) 6000 mcg/h ÷ 1000 mcg/mL = 6 mL/h',
      ],
      result: 'Taxa de infusão: 6 mL/h',
    },
  },

  // Seção 14: Integrações
  protocol_integrations: {
    enabled: true,
    protocols: ['MLK', 'Neuroanestesia'],
    why_combo_exists: 'MLK combina três fármacos complementares: Morfina (opioide), Lidocaína (analgesia local/anti-hiperalgésica) e Cetamina (anti-NMDA). Potencia analgesia multimodal e reduz necessidade de anestésico inalatório.',
    rules: [
      {
        if: 'species == "cat" AND comorbidities_any IN ["DRC","azotemia","injuria_renal_aguda","obstrucao_uretral"]',
        then: {
          action: 'REDUCE_DOSE',
          drug_id: 'ketamine_hcl',
          factor: 0.5,
          message: 'Reduzir dose de cetamina em 50% em felinos com comprometimento renal',
        },
      },
    ],
  },

  // Seção 15: Fluxogramas
  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'acute_pain_ketamine_cri',
        title: 'Dor aguda moderada–intensa: quando ligar CRI de cetamina (multimodal)',
        mermaid: `flowchart TD
A[Confirmar cenário de dor e objetivo] --> B{Triagem de risco rápida}
B -->|Gato HCM| X[CONTRAINDICADO: evitar cetamina]
B -->|Gato DRC/obstrução| Y[WARNING: preferir CRI baixa]
B -->|ICP ↑| Z[MONITOR: garantir eucapnia]
B -->|Sem fatores críticos| C[OK: prosseguir]
C --> D[Iniciar loading 0,25 mg/kg IV lento]
D --> E[Iniciar CRI 2 mcg/kg/min pós-op OU 10 mcg/kg/min intraop]
E --> F[Reavaliar em 10–15 min]
F -->|Dor persiste + hemodinâmica OK| G[Escalar CRI: 2→5 ou 5→10]
F -->|Disforia/rigidez| H[Reduzir CRI + reforçar benzo]
G --> I[Parar CRI com plano de transição]
H --> I
I --> J[Garantir analgesia de base: opioide/NSAID]
`,
      },
      {
        id: 'induction_ketamine_benzo',
        title: 'Indução com cetamina: como reduzir disforia e manter segurança ventilatória',
        mermaid: `flowchart TD
A[Definir se cetamina é apropriada] --> B{Gato HCM?}
B -->|Sim| X[Evitar: usar alternativa]
B -->|Não| C{Hipertensão grave?}
C -->|Sim| Y[Evitar/alternativa]
C -->|Não| D[Preparar associação e monitorização]
D --> E[Associar benzodiazepínico/hipnótico]
E --> F[Administrar bolus IV LENTO 2-3 min]
F --> G[Monitorar EtCO2/SpO2]
G --> H[Antecipar recuperação]
H --> I[Evitar reverter sedativos precocemente]
I --> J[Manter ambiente calmo]
`,
      },
    ],
  },

  // Seção 16: UI Copy
  ui_copy: {
    critical_warning_banner:
      'Cetamina é dose-dependente. Microdose = analgesia anti-hiperalgésica. Dose alta = dissociação e risco de disforia se usada isolada. Regra CRIVET: evitar cetamina isolada (associar benzo + opioide).',
    alert_messages: {
      short: 'Frasco 100 mg/mL em paciente pequeno: risco alto de erro. Considere diluir para 10 mg/mL.',
      long: 'Concentração 100 mg/mL (10%) é "alto risco" para pequenos pacientes — favorece erro de volume. Preferir diluição para CRI e, muitas vezes, também para bolus em gatos.',
    },
    block_message: 'Não misturar cetamina e diazepam na mesma seringa (risco de incompatibilidade física).',
    common_errors: [
      'Usar cetamina como sedativo isolado → disforia',
      'Bolus rápido → apneia/disforia',
      'Subdosar sem loading → efeito demorado',
      'Não diluir CRI → erro de volume/velocidade',
      'Ignorar comorbidades renais em gatos → prolongamento',
    ],
  },

  // Seção 17: Referências
  references: [
    {
      section: 'core_concepts',
      source: 'Veterinary Anesthesia and Analgesia (Lumb & Jones), 6th ed.',
      edition: '6th',
      what_it_supported: [
        'Mecanismo e alvos farmacológicos dos dissociativos',
        'PK: pico IV 1 min/IM 10 min; metabolismo hepático; particularidades em gatos; cautela hepato/renal',
        'Indução 45–90 s e duração ~20 min; risco de delirium e cuidado com reversão precoce',
      ],
    },
    {
      section: 'doses',
      source: 'Textbook of Small Animal Emergency Medicine (Wiley Blackwell) – Pain management',
      what_it_supported: [
        'Low-dose ketamine infusion (0,6 mg/kg/h) como adjunto analgésico em cães e gatos',
        'Observação de início de efeito sob anestesia em ~10 min; onset exato em cães/gatos não totalmente determinado',
      ],
    },
    {
      section: 'doses',
      source: 'Small Animal Neurological Emergencies',
      what_it_supported: [
        'CRI: 10 mcg/kg/min (intraop) e 2–5 mcg/kg/min (pós-op) precedidas por loading 0,25 mg/kg; similar em cães e gatos',
      ],
    },
  ],
}
