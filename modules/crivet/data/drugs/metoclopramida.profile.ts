import type { DrugProfile } from '../../types/drugProfile'

export const metoclopramidaProfile: DrugProfile = {
  drug_id: 'metoclopramida',
  name_pt: 'Metoclopramida',
  name_en: 'Metoclopramide',
  synonyms: ['Reglan', 'Emeprid', 'Vomend', 'Metoclopramide HCl'],
  class: [
    'Antiemético (antagonista dopaminérgico D2)',
    'Procinético GI (trato superior)',
    'Antagonista 5-HT3 em doses mais altas',
    'Agonista 5-HT4 (efeito pró-cinético)',
  ],
  core_concepts: {
    taglines: [
      'Antiemético central via antagonismo D2 (CRTZ), com ação pró-cinética no GI superior',
      'Mais útil como CRI em vômito persistente/parvovirose do que como bolus isolado',
      'Em gatos tende a ser menos eficaz como antiemético (CRTZ menos dependente de D2) e com mais efeitos extrapiramidais',
    ],
    mechanism: {
      receptors_targets: ['D2 (antagonista)', '5-HT3 (antagonista em doses maiores)', '5-HT4 (agonismo funcional pró-cinético)'],
      primary_effects: {
        cardiovascular:
          'Sem efeito hemodinâmico desejado; risco indireto por agitação/excitação e distúrbios eletrolíticos em pacientes graves',
        respiratory: 'Sem depressão respiratória direta',
        cns: 'Antiemético por bloqueio dopaminérgico no CRTZ; pode causar excitação e sinais extrapiramidais (dose-dependente, mais em gatos)',
        renal_hepatic: 'Excreção urinária relevante → reduzir dose em insuficiência renal',
        gi: 'Aumenta tônus e motilidade gástrica; melhora coordenação antro-piloro-duodenal; pode aumentar pressão do esfíncter esofágico inferior',
      },
      clinical_metaphor: '"Freio no gatilho do vômito" (CRTZ) + "empurrão no trânsito do estômago" (procinético do GI superior).',
    },
    pharmacodynamics: {
      onset_iv: '≈ minutos (antiemético central)',
      onset_im: '≈ 15–30 min (variável)',
      peak: '≈ 30–60 min',
      duration: '≈ 1–2 h (antiemético) | pró-cinético pode exigir doses repetidas/CRI',
      dependencies: [
        'Perfusão (absorção SC/IM pior em choque/desidratação)',
        'Espécie (gatos: menor eficácia antiemética e mais efeitos SNC)',
        'Função renal (excreção urinária)',
        'Dose (mais D2 em dose baixa; mais 5-HT3 em dose alta)',
      ],
    },
    pharmacokinetics: {
      metabolism: 'Metabolismo hepático + eliminação renal (excreção urinária clinicamente importante)',
      excretion: 'Urinária (dose reduzir em insuficiência renal)',
      dog_vs_cat:
        'Em gatos a eficácia antiemética é menor e efeitos SNC (excitação/tremores) são mais comuns; usar com mais cautela e preferir alternativas (p.ex., maropitant/ondansetron) quando objetivo é antiemese pura',
      active_metabolites: 'Não destacado como determinante clínico nos textos consultados',
      accumulation: 'Risco maior em insuficiência renal (eventos SNC mais prováveis)',
    },
  },
  species_notes: {
    dogs: {
      key_point:
        'Mais útil como CRI em vômito persistente/parvovirose e como pró-cinético do GI superior; menos potente que NK-1 (maropitant) para náusea/vômito em geral.',
      high_risk_notes: [
        'Pode mascarar obstrução/FB (não usar antes de excluir obstrução)',
        'Excitação/tremores dose-dependentes',
        'Reduzir dose em insuficiência renal',
      ],
      metabolism_excretion: 'Excreção urinária relevante → reduzir dose em renal',
    },
    cats: {
      key_point:
        'Antiemese frequentemente inferior (CRTZ menos D2-dependente); maior risco de sinais extrapiramidais—preferir maropitant/ondansetron quando objetivo principal é antiemese.',
      high_risk_notes: [
        'Maior risco de excitação/tremores/efeitos extrapiramidais',
        'Reduzir dose em insuficiência renal',
        'Evitar em suspeita de obstrução GI',
      ],
      metabolism_excretion: 'Excreção urinária relevante → reduzir dose em renal',
    },
  },
  indications: {
    primary: [
      'Vômito persistente quando se deseja componente pró-cinético do GI superior',
      'Refluxo/risco de refluxo gastroesofágico (evidência variável; benefício clínico nem sempre consistente)',
      'Ileus/hipomotilidade do GI superior (adjuvante; não atua bem em íleo de intestino delgado distal)',
    ],
    secondary: [
      'Parvovirose em filhotes (CRI relatada como particularmente útil)',
      'Adjunto quando maropitant/5-HT3 não são suficientes ou quando há componente de estase gástrica',
      'Uso perioperatório selecionado (redução de refluxo em alguns cenários; dados conflitantes)',
    ],
  },
  contraindications: {
    absolute: [
      {
        condition: 'Obstrução gastrointestinal (suspeita ou confirmada), corpo estranho, perfuração',
        why: 'Procinético pode aumentar pressão luminal e mascarar sinais, atrasando diagnóstico/intervenção; risco de piora/complicações',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Insuficiência renal moderada a grave',
        why: 'Excreção urinária → maior risco de efeitos SNC; requer redução de dose e monitorização',
        level: 'WARNING',
      },
      {
        condition: 'Histórico de reações extrapiramidais/excitação',
        why: 'Efeitos SNC dose-dependentes, mais em gatos',
        level: 'WARNING',
      },
      {
        condition: 'Epilepsia/limiar convulsivo reduzido',
        why: 'Risco teórico de piora de sinais neurológicos com excitação/tremores; usar com cautela',
        level: 'MONITOR',
      },
    ],
  },
  doses: {
    unit_standard_cri: 'mg/kg/h',
    dog: {
      bolus: {
        mgkg: {
          min: 0.1,
          max: 0.5,
          note: 'Dose típica antiemética/pró-cinética (q6–8h). Preferir dose menor em cães sensíveis/idosos/renal.',
        },
        mcgkg: { min: 0, max: 0, note: 'N/A' },
        ukg: { min: 0, max: 0, note: 'N/A' },
        route: 'IV',
        loading_dose: { min: 0.1, max: 0.5 },
      },
      cri: {
        mcgkgmin: { min: 0, max: 0, note: 'N/A' },
        mgkgh: {
          min: 0.04,
          max: 0.08,
          note: 'Equivalente a 1–2 mg/kg/dia. CRI costuma ter melhor eficácia clínica (especialmente em parvo/vômito persistente).',
        },
        titration: {
          increment: 'Subir dentro da faixa (≈ 0,04 → 0,06 → 0,08 mg/kg/h) conforme resposta',
          interval: 'Reavaliar em 30–60 min no início; depois a cada 2–4 h',
        },
        max: 0.3,
      },
      adjustments: {
        obesity: 'Calcular pelo peso magro/ideal para evitar superdosagem e efeitos SNC.',
        shock: 'Evitar SC/IM (absorção imprevisível); preferir IV/CRI quando indicado.',
        hypoalbuminemia: 'Sem ajuste específico nos textos-base; monitorar resposta/efeitos.',
        comorbidities: 'Insuficiência renal: reduzir dose e ampliar intervalo; preferir alternativas se efeitos SNC.',
      },
      therapeutic_targets: {
        target_map: '',
        target_etco2: '',
        analgesia_scale: '',
        sedation_target: 'Meta é reduzir vômito/retorno de motilidade gástrica sem excitação/tremores.',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 0.1,
          max: 0.3,
          note: 'Em gatos, preferir menor dose por maior risco de excitação/tremores e menor eficácia antiemética.',
        },
        mcgkg: { min: 0, max: 0, note: 'N/A' },
        ukg: { min: 0, max: 0, note: 'N/A' },
        route: 'IV',
        loading_dose: { min: 0.1, max: 0.3 },
      },
      cri: {
        mcgkgmin: { min: 0, max: 0, note: 'N/A' },
        mgkgh: {
          min: 0.03,
          max: 0.06,
          note: 'CRI conservadora (≈ 0,72–1,44 mg/kg/dia) para reduzir risco de efeitos SNC; considerar alternativa se antiemese pura for objetivo.',
        },
        titration: {
          increment: 'Subir gradualmente (0,03 → 0,045 → 0,06 mg/kg/h) conforme resposta',
          interval: 'Reavaliar em 30–60 min no início; depois a cada 2–4 h',
        },
        max: 0.1,
      },
      adjustments: {
        obesity: 'Peso ideal/BCS.',
        shock: 'Preferir IV; evitar SC/IM inicialmente.',
        hypoalbuminemia: 'Sem ajuste específico; monitorar.',
        comorbidities: 'Renal: reduzir dose e monitorar SNC; considerar maropitant/ondansetron.',
      },
      therapeutic_targets: {
        target_map: '',
        target_etco2: '',
        analgesia_scale: '',
        sedation_target: 'Reduzir vômito sem sinais extrapiramidais (tremores/ataxia/excitação).',
      },
    },
  },
  presentations: [
    {
      concentration_mg_ml: 5,
      volume_ml: 2,
      total_mg: 10,
      label: 'Metoclopramida injetável 5 mg/mL — frasco/ampola (verificar rótulo)',
      examples: ['Reglan® (humano, variações por país)', 'Emeprid™ (vet)', 'Vomend™ (vet)'],
      concentration_trap_warning: 'Confirmar concentração e apresentação local; evitar erro de mg/mL em CRI.',
    },
    {
      concentration_mg_ml: 1,
      volume_ml: 100,
      total_mg: 100,
      label: 'Metoclopramida solução oral 1 mg/mL (varia por fabricante)',
      examples: ['Formulações orais humanas/veterinárias (variável)'],
    },
    {
      total_mg: 10,
      label: 'Comprimidos 10 mg (variável por fabricante)',
      examples: ['Genéricos humanos (variável)'],
    },
  ],
  dilution_and_preparation: {
    hard_rules: [
      'Não usar em suspeita de obstrução GI/corpo estranho/perfuração (bloquear no app).',
      'Para CRI, proteger da luz quando aplicável (bolsa/equipo opacos) — especialmente formulações injetáveis veterinárias descritas como fotossensíveis.',
      'Preferir CRI (melhor efeito clínico em vômito persistente) ao invés de bolus repetidos quando possível.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 0.5,
        use_cases: ['CRI em cães pequenos/gatos', 'Titulação mais segura'],
        how_to_make: 'Criar concentração baixa para facilitar taxa (mL/h) e reduzir erro.',
        recipe: 'Ex.: adicionar 1 mL (5 mg) em 9 mL de NaCl 0,9% → 0,5 mg/mL',
      },
      {
        target_mg_ml: 1,
        use_cases: ['CRI em cães médios/grandes'],
        how_to_make: 'Facilita cálculo: mg/h = (mL/h) × (mg/mL).',
        recipe: 'Ex.: 2 mL (10 mg) + 8 mL NaCl 0,9% → 1 mg/mL (10 mL)',
      },
    ],
    diluents_allowed: ['NaCl 0,9%'],
    preferred_diluent: {
      diluent: 'NaCl 0,9%',
      why: 'Escolha padrão segura para CRIs e compatibilidade operacional no hospital.',
    },
    stability: [
      {
        diluent: 'NaCl 0,9%',
        max_time_hours: 24,
        light_protection: true,
        syringe_bag_change: 'Trocar seringa/bolsa e equipo em até 24h (ou POP institucional).',
      },
    ],
    dedicated_line_required: false,
    dedicated_line_why: 'Preferível se houver múltiplas drogas em Y-site; se não, ao menos flush padronizado e documentação.',
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
        agent: 'Misturar na mesma seringa/bolsa com outros fármacos (sem validação)',
        why: 'Compatibilidades variam e o risco de erro/precipitação é evitável; preferir administração separada',
        risk: 'precipitação',
      },
    ],
    avoid_same_syringe_or_precipitation_risk: ['Evitar co-mistura com qualquer fármaco sem tabela institucional.'],
    dedicated_line_rules: ['Se infundindo múltiplas drogas, preferir Y-site com flush padronizado ou linha exclusiva.'],
  },
  administration_and_titration: {
    bolus_guidance: [
      'IV lento quando possível (reduz chance de efeitos SNC abruptos).',
      'Se objetivo é vômito persistente, considerar CRI ao invés de bolus repetidos.',
      'Evitar SC/IM em choque/desidratação por absorção imprevisível.',
    ],
    titration_rules: [
      'CRI: iniciar no mínimo da faixa e subir conforme resposta e ausência de tremores/excitação.',
      'Se surgirem sinais extrapiramidais (tremores/ataxia/excitação): reduzir dose 25–50% ou suspender e trocar antiemético.',
    ],
    monitoring_minimum: [
      'Frequência de vômitos/retornos',
      'Apetite/náusea (quando avaliável)',
      'Status neurológico (excitação, tremores, ataxia)',
      'Hidratação/perfusão (especialmente se via SC/IM)',
    ],
    endpoints: {
      desired_effect: [
        'Redução/cessação de vômitos',
        'Melhora de estase gástrica (quando presente)',
        'Menos necessidade de resgate antiemético',
      ],
      toxicity_signs: [
        'Excitação/agitação',
        'Tremores/ataxia (extrapiramidal)',
        'Piora paradoxal do vômito (raro)',
      ],
    },
    therapeutic_failure: {
      check_first: [
        'Obstrução/FB/volvo? (procinético pode piorar e mascarar)',
        'Dor/sepse/pancreatite causando náusea refratária (precisa tratar causa)',
        'Escolha do antiemético: preferir NK-1/5-HT3 se antiemese pura',
      ],
      common_causes: [
        'Gatos: baixa eficácia antiemética (CRTZ menos D2)',
        'Dose insuficiente/sem CRI em vômito persistente',
        'Obstrução mecânica presente',
      ],
      when_to_change: [
        'Se vômito persiste após tentativa adequada e obstrução foi excluída: trocar para maropitant ou ondansetron (ou combinar conforme caso).',
        'Se surgirem efeitos SNC: suspender e trocar classe.',
      ],
    },
  },
  adverse_effects_and_toxicity: {
    common: ['Excitação/agitação', 'Tremores musculares', 'Mudanças comportamentais', 'Letargia (menos comum)'],
    serious: [
      'Sinais extrapiramidais marcantes (especialmente em gatos)',
      'Piora de quadro em obstrução GI (por aumento de motilidade/pressão)',
    ],
    subdose_signs: ['Vômito persiste sem redução de frequência', 'Sem melhora de estase gástrica'],
    overdose_signs: [
      'Excitação intensa',
      'Tremores/ataxia',
      'Desorientação',
      'Possível piora do vômito por contrações gástricas excessivas (raro)',
    ],
    management: [
      'Suspender ou reduzir 25–50% se sinais SNC',
      'Trocar para NK-1 (maropitant) ou 5-HT3 (ondansetron) se antiemese pura',
      'Em suspeita de obstrução: suspender e priorizar diagnóstico por imagem',
    ],
    special_events: [
      {
        event: 'Efeito paradoxal: piora do vômito',
        management: 'Suspender; avaliar se há obstrução/dor intensa; escolher antiemético alternativo.',
      },
      {
        event: 'Fotossensibilidade (CRI/bolsa)',
        management: 'Obscurecer bolsa/equipo; reduzir exposição à luz.',
      },
    ],
  },
  alerts_by_comorbidity: [
    {
      key: 'metoclopramida_gi_obstrucao',
      level: 'BLOCK',
      title: 'Suspeita/confirmada obstrução GI (corpo estranho/perfuração)',
      why: 'Procinético pode piorar pressão intraluminal e mascarar sinais, atrasando diagnóstico',
      action: [
        'Bloquear uso até exclusão por imagem/avaliação clínica',
        'Preferir antiemético sem ação pró-cinética (maropitant/ondansetron) enquanto investiga',
      ],
      dose_adjustment: { avoid_bolus: true },
    },
    {
      key: 'metoclopramida_renal',
      level: 'WARNING',
      title: 'Insuficiência renal / azotemia',
      why: 'Excreção urinária → maior risco de efeitos SNC; dose deve ser reduzida',
      action: ['Iniciar no mínimo da faixa', 'Aumentar intervalo ou reduzir CRI', 'Monitorar sinais extrapiramidais'],
      dose_adjustment: {
        reduce_percent: 25,
        require_monitoring: ['status neurológico', 'resposta antiemética'],
      },
    },
    {
      key: 'metoclopramida_cat',
      level: 'WARNING',
      title: 'Gato (eficácia menor + mais efeitos SNC)',
      why: 'CRTZ felina menos dependente de D2; efeitos extrapiramidais historicamente mais comuns',
      action: [
        'Preferir maropitant/ondansetron quando objetivo é antiemese',
        'Se usar, manter dose conservadora e preferir CRI baixa',
        'Suspender se tremores/excitação',
      ],
      dose_adjustment: {
        reduce_percent: 25,
        suggest_alternative: 'maropitant ou ondansetron',
      },
    },
    {
      key: 'metoclopramida_interacoes',
      level: 'MONITOR',
      title: 'Interações (glucocorticoides, fenotiazínicos, fluoxetina)',
      why: 'Potenciação/maior risco de efeitos SNC descritos',
      action: ['Revisar medicações concomitantes', 'Preferir antiemético alternativo se sinais SNC surgirem'],
      dose_adjustment: {
        reduce_percent: 25,
        require_monitoring: ['SNC/comportamento'],
      },
    },
  ],
  presets: [
    {
      id: 'antiemesis_bolus_standard',
      label: 'Antiemese (bolus) 🟨',
      dose_mgkg: 0.2,
      limits: { min: 0.1, max: 0.5 },
      clinical_target: 'Reduzir vômito sem excitação/tremores',
      linked_alerts: ['metoclopramida_gi_obstrucao', 'metoclopramida_cat', 'metoclopramida_renal'],
    },
    {
      id: 'prokinetic_cri_standard',
      label: 'Procinético/antiemese (CRI) 🟩',
      dose_mgkgh: 0.06,
      limits: { min: 0.04, max: 0.08 },
      clinical_target: 'Controle de vômito persistente + promover esvaziamento gástrico (GI superior)',
      linked_alerts: ['metoclopramida_gi_obstrucao', 'metoclopramida_cat', 'metoclopramida_renal'],
    },
    {
      id: 'parvo_puppy_cri',
      label: 'Parvovirose (CRI) 🟩',
      dose_mgkgh: 0.06,
      limits: { min: 0.04, max: 0.08 },
      clinical_target: 'Reduzir vômito persistente em filhotes (adjuvante)',
      linked_alerts: ['metoclopramida_gi_obstrucao'],
    },
  ],
  calculation_templates: {
    cri: {
      required_inputs: ['weight_kg', 'target_mg_kg_h', 'final_volume_ml', 'stock_mg_ml', 'pump_ml_h'],
      algorithm: [
        '1) Dose por hora (mg/h) = target_mg_kg_h × weight_kg',
        '2) Concentração necessária (mg/mL) = (mg/h) ÷ pump_ml_h',
        '3) Total de mg no volume final = concentração (mg/mL) × final_volume_ml',
        '4) Volume do fármaco (mL) = total_mg ÷ stock_mg_ml',
        '5) Volume de diluente = final_volume_ml − volume_fármaco',
      ],
      conversions: ['1–2 mg/kg/dia = 0,04–0,08 mg/kg/h'],
      hard_safety_checks: [
        {
          if: 'suspected_gi_obstruction == true',
          then: 'BLOCK',
          message: 'Metoclopramida é CONTRAINDICADA se houver suspeita/confirmada obstrução GI/corpo estranho/perfuração.',
        },
      ],
      soft_safety_checks: [
        {
          if: "species == 'cat' && target_mg_kg_h > 0.06",
          then: 'WARN',
          message: 'Gatos: maior risco de efeitos extrapiramidais. Prefira CRI conservadora ou alternativa (maropitant/ondansetron).',
        },
        {
          if: 'renal_disease == true',
          then: 'WARN',
          message: 'Insuficiência renal: reduzir dose e monitorar sinais SNC (excitação/tremores).',
        },
        {
          if: 'light_protection == false',
          then: 'INFO',
          message: 'Formulações injetáveis podem ser fotossensíveis em CRI: considere proteger bolsa/equipo da luz.',
        },
      ],
      outputs: ['total_mg', 'drug_volume_ml', 'diluent_volume_ml', 'final_concentration_mg_ml', 'pump_ml_h'],
      error_cost: 'Falha terapêutica (se obstrução não reconhecida) e efeitos SNC (extrapiramidais), especialmente em gatos/renais.',
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_mg_kg', 'stock_mg_ml'],
      algorithm: ['1) Dose total (mg) = dose_mg_kg × weight_kg', '2) Volume (mL) = dose_total_mg ÷ stock_mg_ml'],
      hard_safety_checks: [
        {
          if: 'suspected_gi_obstruction == true',
          then: 'BLOCK',
          message: 'Bloqueado: não usar metoclopramida em suspeita de obstrução GI/FB/perfuração.',
        },
      ],
      soft_safety_checks: [
        {
          if: "species == 'cat' && dose_mg_kg > 0.3",
          then: 'WARN',
          message: 'Gatos: dose alta aumenta risco de excitação/tremores. Preferir dose menor ou alternativa.',
        },
      ],
      outputs: ['dose_total_mg', 'volume_ml'],
      error_cost: 'Efeitos SNC e mascaramento de obstrução.',
    },
    dilution_builder: {
      required_inputs: ['target_mg_ml', 'final_volume_ml', 'stock_mg_ml'],
      algorithm: [
        '1) Total mg desejado = target_mg_ml × final_volume_ml',
        '2) Volume do fármaco (mL) = total_mg ÷ stock_mg_ml',
        '3) Volume de diluente (mL) = final_volume_ml − volume_fármaco',
      ],
      hard_safety_checks: [
        {
          if: 'target_mg_ml > stock_mg_ml',
          then: 'BLOCK',
          message: 'Concentração alvo não pode ser maior que a concentração do frasco.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'target_mg_ml >= 2',
          then: 'WARN',
          message: 'Concentração alta aumenta risco de erro em mL/h; prefira 0,5–1 mg/mL para CRI.',
        },
      ],
      outputs: ['total_mg', 'drug_volume_ml', 'diluent_volume_ml'],
      error_cost: 'Erro de preparo → subdose/sobredose e efeitos SNC.',
    },
  },
  how_we_got_here_block: {
    title: 'Como chegamos a este resultado (Metoclopramida)',
    render_steps: [
      {
        step: 1,
        label: 'Converter dose para mg/h (CRI)',
        formula: 'mg/h = (mg/kg/h) × peso(kg)',
      },
      {
        step: 2,
        label: 'Encontrar concentração necessária para a taxa da bomba',
        formula: 'mg/mL = (mg/h) ÷ taxa(mL/h)',
      },
      {
        step: 3,
        label: 'Calcular total de fármaco no volume final',
        formula: 'mg totais = (mg/mL) × volume_final(mL)',
      },
      {
        step: 4,
        label: 'Converter mg totais em mL do frasco',
        formula: 'mL do frasco = mg totais ÷ (mg/mL do frasco)',
      },
    ],
    interpretation_rules: [
      'Se suspeita de obstrução GI/corpo estranho/perfuração → BLOQUEAR metoclopramida.',
      'CRI costuma funcionar melhor que bolus em vômito persistente (p.ex., parvovirose).',
      'Em gatos, preferir alternativas se objetivo for antiemese pura; se usar, doses conservadoras e monitorar efeitos SNC.',
      'Em insuficiência renal, reduzir dose e monitorar.',
    ],
    example: {
      scenario: 'Cão 10 kg, CRI 0,06 mg/kg/h, taxa 2 mL/h, seringa 50 mL, frasco 5 mg/mL',
      calculation: [
        'mg/h = 0,06 × 10 = 0,6 mg/h',
        'mg/mL = 0,6 ÷ 2 = 0,3 mg/mL',
        'mg totais = 0,3 × 50 = 15 mg',
        'mL do frasco = 15 ÷ 5 = 3 mL',
        'Completar com 47 mL de NaCl 0,9% (proteger da luz se aplicável)',
      ],
      result: 'Preparar 50 mL a 0,3 mg/mL; infundir 2 mL/h para entregar 0,06 mg/kg/h.',
    },
  },
  protocol_integrations: {
    enabled: true,
    protocols: ['vômito_persistente', 'parvovirose', 'antiemetic_ladder', 'procinéticos_GI_superior'],
    why_combo_exists:
      'Metoclopramida é escolhida quando se deseja combinação de antiemese (CRTZ) + pró-cinética do GI superior, especialmente em vômito persistente e quando CRI é viável.',
    rules: [
      {
        if: 'suspected_gi_obstruction == true',
        then: {
          action: 'REMOVE_DRUG',
          drug_id: 'metoclopramida',
          message: 'Contraindicada em obstrução/FB/perfuração: prefira maropitant/ondansetron enquanto investiga.',
        },
      },
      {
        if: "species == 'cat' && primary_goal == 'antiemesis'",
        then: {
          action: 'PREFER_ALTERNATIVE',
          message: 'Gatos: eficácia antiemética menor e mais efeitos extrapiramidais. Preferir maropitant/ondansetron.',
        },
      },
      {
        if: 'renal_disease == true',
        then: {
          action: 'REDUCE_DOSE',
          factor: 0.75,
          message: 'Excreção urinária: reduzir dose e monitorar SNC.',
        },
      },
    ],
  },
  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'metoclopramida_vomito_persistente',
        title: 'Vômito persistente — quando escolher metoclopramida vs alternativas',
        mermaid:
          'flowchart TD\nA[Vômito persistente] --> B{Suspeita de obstrução/FB/perfuração?}\nB -- Sim --> C[Não usar metoclopramida; diagnóstico por imagem + antiemético sem pró-cinética]\nB -- Não --> D{Espécie?}\nD -- Gato --> E{Objetivo é antiemese pura?}\nE -- Sim --> F[Preferir maropitant/ondansetron]\nE -- Não --> G[Metoclopramida CRI baixa + monitorar SNC]\nD -- Cão --> H{Há componente de estase gástrica/hipomotilidade?}\nH -- Sim --> I[Metoclopramida (preferir CRI 1–2 mg/kg/dia)]\nH -- Não --> J[Preferir NK-1/5-HT3 como primeira linha]\nI --> K[Reavaliar vômito + SNC em 30–60 min]\nG --> K\nK --> L{Resposta adequada?}\nL -- Sim --> M[Manter e ajustar dentro da faixa]\nL -- Não --> N[Trocar/associar antiemético (NK-1/5-HT3) e tratar causa de base]\n',
      },
    ],
  },
  ui_copy: {
    critical_warning_banner: 'Não use metoclopramida se houver suspeita de obstrução GI/corpo estranho/perfuração.',
    alert_messages: {
      short: 'Cautela em gatos e renais (efeitos SNC)',
      long: 'Metoclopramida é menos eficaz como antiemético em gatos e pode causar excitação/tremores (extrapiramidal). Reduzir dose em insuficiência renal e preferir NK-1/5-HT3 quando objetivo é antiemese pura.',
    },
    block_message: 'Bloqueado: metoclopramida contraindicada em suspeita de obstrução/perfuração GI.',
    common_errors: [
      'Dar antes de excluir obstrução (pode mascarar e atrasar diagnóstico)',
      'Usar em gatos como primeira linha para antiemese pura',
      'Não reduzir dose em insuficiência renal',
      'Ignorar excitação/tremores (extrapiramidal) e continuar subindo dose',
      'Não proteger bolsa/equipo da luz quando aplicável',
    ],
  },
  references: [
    {
      section: 'mechanism_species_notes_interactions_light_protection',
      source: 'BSAVA Manual of Canine and Feline Gastroenterology, 3rd Edition — seção de antieméticos/procinéticos (Metoclopramide)',
      page: 'PDF p. 137',
      edition: '3rd',
      year: 2019,
    },
    {
      section: 'doses_cri_and_routes',
      source: 'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd Edition — tabela de antieméticos/procinéticos',
      page: 'PDF p. 318',
      edition: '3rd',
      year: 2019,
    },
    {
      section: 'po_dose_and_clinical_notes_obstruction_risk',
      source: 'Textbook of Small Animal Emergency Medicine (Wiley Blackwell) — seções de terapêutica GI/antieméticos',
      page: 'PDF p. 214',
      year: 2019,
    },
    {
      section: 'comparative_efficacy_obstruction_masking_renal_risk_and_cri_example',
      source: 'Nelson & Couto, 6ª ed. — seção de antieméticos (Metoclopramide/Reglan) e notas clínicas',
      page: 'PDF p. 468',
      edition: '6ª',
      year: 2020,
    },
    {
      section: 'perioperative_reflux_evidence_and_high_dose_study_context',
      source: 'Lumb & Jones, 6ª ed. — capítulo de fármacos adjuvantes/antieméticos (Metoclopramide)',
      page: 'PDF p. 445',
      edition: '6ª',
      year: 2024,
    },
  ],
}
