import type { DrugProfile } from '../../types/drugProfile'

export const lidocaineProfile: DrugProfile = {
  // Seção 1: Identidade
  drug_id: 'lidocaina',
  name_pt: 'Lidocaína (cloridrato de lidocaína)',
  name_en: 'Lidocaine (lidocaine hydrochloride)',
  synonyms: ['Lidocaína', 'Lidocaine HCl', 'Xylocaine (varia por país/mercado)', 'Lignocaine (grafia alternativa)'],
  class: [
    'Anestésico local do tipo amida (bloqueador de canais de sódio)',
    'Antiarrítmico classe IB (IV) para taquiarritmias ventriculares',
    'Adjuvante analgésico por infusão (sobretudo cães; cautela/evitar em gatos)',
    'Parte do conceito de infusão multimodal (ex.: MLK)',
  ],

  // Seção 2: Perfil Farmacológico
  core_concepts: {
    taglines: [
      'Bloqueia canais de Na+ rápidos: silencia condução em tecido miocárdico doente e fibras de Purkinje → 1ª linha IV em taquiarritmias ventriculares em cães.',
      'Ação IV é rápida, mas dura pouco após bolus (minutos) → manutenção geralmente exige CRI.',
      'Metabolismo hepático rápido (CYP): hepatopatas acumulam e fazem toxicidade mais fácil.',
      'Gatos são bem mais sensíveis: doses menores e risco de depressão cardiovascular/neurotoxicidade.',
    ],
    mechanism: {
      receptors_targets: ['Canais de sódio voltagem-dependentes (Na+ rápidos)', 'Miocárdio (Purkinje/tecido isquêmico) e nervos periféricos (bloqueio de condução)'],
      primary_effects: {
        cardiovascular:
          'Antiarrítmico IB (ventricular) com pouco efeito inotrópico em dose terapêutica quando IV lento; em toxicidade pode causar hipotensão, bradiarritmias e piora de arritmias (proarrítmico). Hipocalemia reduz eficácia; hipercalemia intensifica efeito depressor de membrana.',
        respiratory:
          'Em toxicidade pode ocorrer depressão respiratória/apneia (descrita como relato anedótico em pacientes inconscientes) e secundária a convulsões/sedação.',
        cns: 'Toxicidade típica = excitação do SNC (agitação, ataxia, tremores, nistagmo, convulsões).',
        renal_hepatic: 'Metabolismo hepático rápido por CYP; doença hepática reduz depuração e predispõe à toxicidade.',
        gi: 'Em toxicidade pode haver náusea/vômito; clinicamente, também é usado como "add-on" em infusão multimodal e há uso descrito como adjuvante em distúrbios de motilidade/íleo (principalmente cães, conforme protocolos).',
      },
      clinical_metaphor:
        '"Isolante elétrico": você "isola" os fios (Na+) que estão disparando errado no ventrículo; se exagerar, o isolante também pega nos circuitos normais → convulsão/hipotensão.',
    },
    pharmacodynamics: {
      onset_iv: '≈ 2 min (efeito antiarrítmico após bolus IV)',
      onset_im: 'possível se IV não for possível, porém menos eficaz (antiarrítmico)',
      peak: 'minutos após bolus IV / após atingir nível por CRI',
      duration: '≈ 10–20 min após bolus IV (antiarrítmico); por isso CRI é usada para manter efeito',
      dependencies: [
        'Velocidade do bolus (IV lento reduz picos e toxicidade)',
        'Potássio extracelular: hipocalemia ↓ eficácia; hipercalemia ↑ depressão de membrana',
        'Função hepática (depuração ↓ → acúmulo/toxicidade)',
        'Espécie: gatos mais sensíveis (neuro/cardio)',
      ],
    },
    pharmacokinetics: {
      metabolism: 'Hepático rápido via CYP; metabólitos podem contribuir para efeito e toxicidade.',
      excretion: 'Eliminação como metabólitos (ênfase clínica: depuração depende do fígado).',
      dog_vs_cat: 'Cães: meia-vida <1 h; gatos: meia-vida 1–2 h e maior sensibilidade → doses menores.',
      active_metabolites: 'Possíveis; relevância clínica maior na toxicidade do que no alvo imediato (antiarrítmico).',
      accumulation: 'Risco aumentado em hepatopatas e em infusões prolongadas/altas, sobretudo gatos.',
    },
  },

  species_notes: {
    dogs: {
      key_point:
        'Primeira escolha IV para taquiarritmias ventriculares; repetir bolus até dose total alvo e, se responder, manter por CRI. Monitorar SNC e PA.',
      high_risk_notes: [
        'Toxicidade mais comum = excitação do SNC (tremores/convulsões).',
        'Hipotensão pode ocorrer em concentrações tóxicas.',
        'Hipocalemia pode tornar lidocaína ineficaz; corrigir eletrólitos antes/ao tratar.',
      ],
      metabolism_excretion: 'Metabolismo hepático rápido (CYP); hepatopatas precisam de doses menores e titulação cautelosa.',
    },
    cats: {
      key_point:
        'Muito mais sensíveis à toxicidade (convulsões, depressão respiratória, bradiarritmias e até morte súbita); usar doses menores e monitorização intensiva — e, para infusões analgésicas, risco pode superar benefício.',
      high_risk_notes: [
        'Convulsões e depressão respiratória podem ocorrer com doses próximas das terapêuticas de cães.',
        'Maior meia-vida (1–2 h) e maior risco de acúmulo.',
        'Infusões para analgesia/MAC-sparing em gatos têm risco cardiovascular relevante.',
      ],
      metabolism_excretion: 'Meia-vida 1–2 h; metabolização hepática com maior variabilidade → iniciar muito baixo e titular.',
    },
  },

  // Seção 3: Indicações e Contraindicações
  indications: {
    primary: [
      'Taquiarritmias ventriculares (ex.: VT) e ectopia ventricular com comprometimento hemodinâmico (antiarrítmico classe IB, IV).',
      'Manutenção do controle após resposta ao bolus por CRI (antiarrítmico).',
    ],
    secondary: [
      'Adjuvante analgésico/anestésico-sparing por CRI em cães (em protocolos multimodais; evidência variável).',
      '"Add-on" em infusões multimodais (conceito MLK) e uso descrito em contexto de motilidade/íleo em protocolos específicos (principalmente cães).',
      'Anestesia local/regional (infiltração, bloqueios, tópica).',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Uso de lidocaína com epinefrina para terapia antiarrítmica IV',
        why: 'Para antiarrítmico deve-se usar lidocaína sem epinefrina.',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Gato (qualquer indicação sistêmica/CRI) sem monitorização intensiva',
        why: 'Gatos são particularmente sensíveis: convulsões, depressão respiratória, bradiarritmias e morte súbita; além disso, em gatos o risco cardiovascular de infusão pode superar benefício.',
        level: 'CRITICAL',
      },
      {
        condition: 'Hepatopatia significativa',
        why: 'Metabolismo hepático rápido (CYP) → depuração reduzida e risco de acúmulo/toxicidade.',
        level: 'WARNING',
      },
      {
        condition: 'Hipotensão/choque não corrigido',
        why: 'Em toxicidade pode causar hipotensão; em paciente instável, margem de segurança reduz.',
        level: 'MONITOR',
      },
      {
        condition: 'Hipocalemia',
        why: 'Hipocalemia reduz eficácia antiarrítmica (classe I).',
        level: 'MONITOR',
      },
      {
        condition: 'Histórico de convulsões/epilepsia',
        why: 'Toxicidade típica é excitação do SNC/convulsões; iniciar baixo e monitorar.',
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
          min: 2,
          max: 4,
          note: 'Bolus IV lento; pode repetir até dose total 8 mg/kg em ≥10 min (protocolos de VT).',
        },
        mcgkg: { min: 2000, max: 4000, note: 'Equivalente (2–4 mg/kg).' },
        ukg: { min: 2000, max: 4000, note: 'Equivalente (2–4 mg/kg).' },
        route: 'IV',
        loading_dose: { min: 2, max: 2 },
      },
      cri: {
        mcgkgmin: {
          min: 25,
          max: 80,
          note: 'Após resposta ao bolus: manter 25–80 mcg/kg/min (antiarrítmico). Para analgesia/anestesia-sparing em cães, protocolos frequentemente usam 30–80 mcg/kg/min (e há menções de 30–100 mcg/kg/min em literatura anestésica).',
        },
        mgkgh: {
          min: 1.5,
          max: 4.8,
          note: 'Conversão: mcg/kg/min × 0,06 = mg/kg/h (25→1,5; 80→4,8).',
        },
        titration: {
          increment: 'Aumentar conforme resposta (ex.: 25→50→80 mcg/kg/min) e monitorar PA/SNC.',
          interval: 'Reavaliar em 5–10 min (ritmo/FC, perfusão/PA, sinais neurológicos).',
        },
        max: 80,
      },
      adjustments: {
        obesity: 'Preferir iniciar por peso magro/ideal em CRI e titular por efeito (ritmo/PA).',
        shock: 'Se VT por hipóxia/acidose/eletrólitos, corrigir causa base junto; iniciar no limite baixo e monitorar PA.',
        hypoalbuminemia: 'Sem regra fixa no acervo consultado; na prática, iniciar conservador e titular (risco geral de toxicidade em críticos).',
        comorbidities:
          'Hepatopata: reduzir taxa e vigiar toxicidade; hipocalemia: corrigir (eficácia cai); epilepsia: iniciar mais baixo e monitorar SNC.',
      },
      therapeutic_targets: {
        target_map: 'N/A',
        target_etco2: 'N/A (não é alvo primário; monitorar ventilação se sedado/anestesiado).',
        analgesia_scale: 'Se usado como adjuvante analgésico: melhora objetiva de dor e menor resgate; evidência é variável.',
        sedation_target: 'N/A',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 0.25,
          max: 0.5,
          note: 'IV lento. Pode considerar até 1 mg/kg em situações selecionadas. Pode repetir 0,15–0,25 mg/kg até dose total 4 mg/kg (se efetivo).',
        },
        mcgkg: { min: 250, max: 500, note: 'Equivalente (0,25–0,5 mg/kg).' },
        ukg: { min: 250, max: 500, note: 'Equivalente (0,25–0,5 mg/kg).' },
        route: 'IV',
        loading_dose: { min: 0.25, max: 0.5 },
      },
      cri: {
        mcgkgmin: {
          min: 10,
          max: 40,
          note: 'Somente se respondeu ao bolus e com monitorização intensa (antiarrítmico). Para analgesia/MAC-sparing em gatos, o risco cardiovascular pode superar benefício.',
        },
        mgkgh: {
          min: 0.6,
          max: 2.4,
          note: 'Conversão: mcg/kg/min × 0,06 = mg/kg/h (10→0,6; 40→2,4).',
        },
        titration: {
          increment: 'Titular com passos pequenos (ex.: 10→20→30→40 mcg/kg/min) observando SNC/PA/ritmo.',
          interval: 'Reavaliar em 5–10 min após ajuste.',
        },
        max: 40,
      },
      adjustments: {
        obesity: 'Preferir peso ideal e titulação lenta.',
        shock: 'Evitar se não houver monitorização e correção da causa; iniciar no limite mínimo.',
        hypoalbuminemia: 'Sem regra fixa no acervo consultado; iniciar conservador e monitorar.',
        comorbidities:
          'Hepatopata: reduzir e monitorar (meia-vida maior); cardiopata instável: risco de bradiarritmias/hipotensão; epilepsia: risco convulsivo.',
      },
      therapeutic_targets: {
        target_map: 'N/A',
        target_etco2: 'N/A',
        analgesia_scale: 'Se usado, focar em analgesia multimodal com monitorização; muitos evitam CRI analgésica em gatos por risco CV.',
        sedation_target: 'N/A',
      },
    },
  },

  // Seção 5: Apresentações
  presentations: [
    {
      concentration_mg_ml: 20,
      concentration_percent: 2,
      volume_ml: 20,
      total_mg: 400,
      label: 'Lidocaína 2% = 20 mg/mL (frasco 20 mL; varia por país)',
      examples: ['Xylocaine 2% (varia por país)', 'genéricos'],
      concentration_trap_warning: '2% = 20 mg/mL. Erro comum é confundir % com mg/mL.',
    },
    {
      concentration_mg_ml: 10,
      concentration_percent: 1,
      volume_ml: 20,
      total_mg: 200,
      label: 'Lidocaína 1% = 10 mg/mL',
      examples: ['genéricos'],
      concentration_trap_warning: 'Para CRI/antiarrítmico, padronizar sempre em mg/mL e depois converter para mcg/mL no preparo.',
    },
    {
      label: 'Lidocaína + epinefrina (diversas concentrações)',
      examples: ['formulações odontológicas/dermatológicas (varia)'],
      concentration_trap_warning: 'NÃO usar com epinefrina para terapia antiarrítmica IV; preferir lidocaína sem epinefrina.',
    },
  ],

  // Seção 6: Diluição
  dilution_and_preparation: {
    hard_rules: [
      'Para terapia antiarrítmica IV, usar lidocaína SEM epinefrina.',
      'Bolus deve ser IV lento para reduzir pico e toxicidade.',
      'Gatos: iniciar muito abaixo de cães; monitoração intensa obrigatória.',
      'Se ocorrer toxicidade (SNC/PA/respiração), interromper até sinais cessarem; depois reiniciar em taxa menor se necessário.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 2,
        use_cases: ['CRI antiarrítmica em bomba/bolsa com taxa em mL/h prática', 'Padronização UTI'],
        how_to_make: 'Exemplo com lidocaína 2% (20 mg/mL): diluir 1:10 para 2 mg/mL (2000 mcg/mL).',
        recipe: '10 mL de lidocaína 2% + 90 mL de diluente = 2 mg/mL.',
      },
      {
        target_mg_ml: 1,
        use_cases: ['Pacientes pequenos (reduzir erro de taxa)', 'CRI em seringa'],
        how_to_make: 'Alvo 1 mg/mL (1000 mcg/mL) facilita taxas menores e titulação.',
        recipe: '5 mL de lidocaína 2% + 95 mL de diluente = 1 mg/mL.',
      },
      {
        target_mg_ml: 2,
        use_cases: ['Receita clássica de bolsa (exemplo didático do Nelson)'],
        how_to_make: 'Exemplo para CRI específica usando D5W (padronização por receita).',
        recipe: 'Adicionar 25 mL de lidocaína 2% (20 mg/mL) a 250 mL de D5W (exemplo usado para CRI de 44 mcg/kg/min em método de preparo).',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5% (D5W)'],
    preferred_diluent: {
      diluent: 'Glicose 5% (D5W)',
      why: 'Há receita clássica de preparo em D5W descrita no Nelson (útil para padronização de bolsa/CRI).',
    },
    stability: [
      {
        diluent: 'NaCl 0,9% / Ringer Lactato / D5W',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Trocar seringa/bolsa conforme rotina institucional (comumente ≤24 h) e rotulagem rigorosa (mg/mL e mcg/mL).',
      },
    ],
    dedicated_line_required: false,
    dedicated_line_why: 'Preferível em múltiplas infusões (reduz erro/bolus acidental), mas não mandatória se compatibilidade/flush forem garantidos.',
  },

  // Seção 7: Compatibilidade
  compatibility: {
    diluents_allowed: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5% (D5W)'],
    diluents_ok: ['NaCl 0,9%', 'Ringer Lactato', 'D5W'],
    diluentsAllowed: ['NaCl 0,9%', 'Ringer Lactato', 'D5W'],
    diluents: ['NaCl 0,9%', 'Ringer Lactato', 'D5W'],
    compatible_in_syringe_or_bag: [
      'Em prática anestésica, lidocaína é frequentemente usada em conjunto com opioides e cetamina (conceito MLK); idealmente, seguir padronização/validação do serviço para misturas na mesma seringa/bolsa.',
    ],
    compatible_y_site_only: ['Se necessário, Y-site com flush e observação; preferir não misturar sem compatibilidade confirmada pelo serviço.'],
    incompatible: [
      {
        agent: 'Misturas não validadas (mesma seringa/bolsa)',
        why: 'Risco de incompatibilidade físico-química e erro de dose; padronizar protocolo institucional.',
        risk: 'precipitação',
      },
    ],
    avoid_same_syringe_or_precipitation_risk: ['Evitar misturar com fármacos sem compatibilidade confirmada no serviço.'],
    dedicated_line_rules: [
      'Preferir linha/lúmen dedicado se múltiplos CRIs simultâneos.',
      'Se via compartilhada: flush antes/depois e checar turvação.',
    ],
  },

  // Seção 8: Administração e Titulação
  administration_and_titration: {
    bolus_guidance: [
      'IV lento (reduz pico e toxicidade).',
      'Em VT: repetir bolus conforme resposta até dose total alvo (cão até 8 mg/kg em ≥10 min; gato total menor).',
    ],
    titration_rules: [
      'Se respondeu ao bolus, iniciar CRI e titular dentro da faixa (cão 25–80 mcg/kg/min; gato 10–40 mcg/kg/min) conforme ritmo e sinais de toxicidade.',
      'Se não respondeu ao máximo recomendado, reavaliar diagnóstico (SVT com aberrância vs VT), eletrólitos (especialmente K+) e acesso IV.',
      'Interromper/reduzir imediatamente se surgirem sinais neurológicos, hipotensão ou depressão respiratória.',
    ],
    monitoring_minimum: [
      'ECG contínuo (ritmo e resposta)',
      'PA (ideal invasiva em críticos)',
      'Perfusão (TRC, pulsos, lactato quando aplicável)',
      'Sinais neurológicos (tremores, nistagmo, convulsões)',
      'SpO2/ventilação (especialmente se sedado/anestesiado)',
    ],
    endpoints: {
      desired_effect: [
        'Conversão para ritmo sinusal OU redução da frequência ventricular/ectopia com melhora hemodinâmica',
        'Redução de complexidade ventricular (menos VPCs, menos runs de VT)',
      ],
      toxicity_signs: [
        'Agitação/ataxia/desorientação',
        'Tremores/fasciculações/nistagmo',
        'Convulsões',
        'Hipotensão',
        'Depressão respiratória/apneia (especialmente em gatos ou em paciente inconsciente)',
      ],
    },
    therapeutic_failure: {
      check_first: [
        'Diagnóstico correto (VT vs SVT com aberrância; lidocaína é geralmente ineficaz para SVT)',
        'Potássio (hipocalemia ↓ eficácia) e distúrbios ácido–base/hipóxia',
        'Dose adequada (subdose é causa comum de falha)',
        'Acesso IV funcionando',
      ],
      common_causes: ['Hipocalemia', 'Arritmia não ventricular', 'Subdose ou bolus muito pequeno', 'Problema de cateter/linha'],
      when_to_change: [
        'Após dose total máxima sem resposta: corrigir eletrólitos/diagnóstico e avançar para 2ª linha (ex.: mexiletina/sotalol/amiodarona conforme caso e protocolo).',
      ],
    },
  },

  // Seção 9: Efeitos Adversos
  adverse_effects_and_toxicity: {
    common: ['Excitação do SNC (agitação, ataxia, tremores)', 'Náusea/vômito (descritos em toxicidade)', 'Hipotensão (em concentrações tóxicas)'],
    serious: [
      'Convulsões',
      'Depressão respiratória/arresto respiratório (relatos, especialmente em pacientes inconscientes; gatos em maior risco)',
      'Bradiarritmias e morte súbita (especialmente gatos em toxicidade)',
    ],
    subdose_signs: ['Sem redução da ectopia/VT após bolus adequados', 'Ritmo persiste e paciente mantém sinais de baixo débito'],
    overdose_signs: ['Tremores, nistagmo, convulsões', 'Queda de PA', 'Piora de arritmias (proarrítmico)', 'Depressão respiratória'],
    management: [
      'Interromper lidocaína até sinais cessarem; reiniciar em taxa menor se necessário.',
      'Se convulsões: diazepam IV 0,25–0,5 mg/kg (descrição no Nelson para convulsões induzidas por lidocaína).',
      'Suporte hemodinâmico (fluido/vasoativo conforme quadro) e ventilatório conforme necessidade.',
    ],
    special_events: [
      {
        event: 'convulsão induzida por lidocaína',
        management:
          'Suspender infusão; administrar diazepam IV 0,25–0,5 mg/kg; reavaliar necessidade e reiniciar mais baixo somente após estabilização.',
      },
    ],
  },

  // Seção 10: Alertas por Comorbidade
  alerts_by_comorbidity: [
    {
      key: 'lidocaine_cat_systemic_highrisk',
      level: 'CRITICAL',
      title: 'Gato: risco alto de toxicidade sistêmica',
      why: 'Gatos são particularmente sensíveis: podem desenvolver convulsões, depressão respiratória, bradiarritmias e morte súbita; além disso, em doses para reduzir inalante, pode haver depressão cardiovascular relevante.',
      action: [
        'Preferir alternativas quando possível (especialmente para CRI analgésica).',
        'Se antiarrítmico for necessário: usar doses menores (bolus 0,25–0,5 mg/kg) e monitoração intensiva (ECG/PA).',
        'Ter benzodiazepínico pronto para convulsões.',
      ],
      dose_adjustment: {
        reduce_percent: 75,
        avoid_bolus: false,
        require_monitoring: ['ECG contínuo', 'PA', 'SNC', 'SpO2/ventilação'],
        suggest_alternative: 'Para analgesia, preferir opioide/ketamina baixa dose/bloqueios locais conforme caso.',
      },
    },
    {
      key: 'lidocaine_hepatic_disease',
      level: 'WARNING',
      title: 'Hepatopatia: depuração ↓ → acúmulo/toxicidade',
      why: 'Metabolismo hepático rápido por CYP; doença hepática predispõe à toxicidade.',
      action: ['Iniciar em dose/CRI mais baixa e titular por resposta e sinais neurológicos.', 'Monitorar PA e SNC com mais frequência.'],
      dose_adjustment: { reduce_percent: 30, require_monitoring: ['SNC', 'PA', 'ECG'] },
    },
    {
      key: 'lidocaine_hypokalemia',
      level: 'MONITOR',
      title: 'Hipocalemia: eficácia antiarrítmica pode cair',
      why: 'Hipocalemia pode tornar lidocaína menos efetiva (efeitos classe I influenciados por K+ extracelular).',
      action: ['Dosar e corrigir K+ e Mg2+ conforme protocolo.', 'Reavaliar resposta após correção.'],
    },
    {
      key: 'lidocaine_epilepsy',
      level: 'WARNING',
      title: 'Epilepsia/risco convulsivo: lidocaína pode precipitar convulsões em toxicidade',
      why: 'Toxicidade típica é excitação do SNC com tremores e convulsões.',
      action: ['Evitar escaladas rápidas; usar IV lento.', 'Ter diazepam disponível.', 'Monitorar sinais neurológicos continuamente.'],
      dose_adjustment: { reduce_percent: 20, require_monitoring: ['SNC', 'ECG', 'PA'] },
    },
  ],

  // Seção 11: Presets
  presets: [
    {
      id: 'vt_dog_bolus_then_cri',
      label: 'VT cão (bolus + CRI) 🟥',
      dose_mcgkgmin: 50,
      dose_mgkg: 2,
      limits: { min: 25, max: 80 },
      clinical_target: 'Converter ou reduzir frequência ventricular/ectopia com melhora hemodinâmica.',
      linked_alerts: ['lidocaine_hepatic_disease', 'lidocaine_hypokalemia'],
    },
    {
      id: 'vt_cat_lowdose',
      label: 'VT gato (baixa dose, alto risco) 🟥',
      dose_mcgkgmin: 10,
      dose_mgkg: 0.25,
      limits: { min: 10, max: 40 },
      clinical_target: 'Controle ventricular apenas com monitorização intensiva.',
      linked_alerts: ['lidocaine_cat_systemic_highrisk'],
    },
    {
      id: 'analgesia_dog_adjuvant',
      label: 'Adjuvante analgésico cão (CRI) 🟨',
      dose_mcgkgmin: 30,
      limits: { min: 25, max: 50 },
      clinical_target: 'Reduzir necessidade anestésica e reforçar analgesia multimodal (evidência variável).',
      linked_alerts: ['lidocaine_hepatic_disease', 'lidocaine_epilepsy'],
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
        'Se dose estiver em mg/kg/h: mg/kg/h → mcg/kg/min = (mg × 1000) ÷ 60.',
        'Se concentração estiver em mg/mL: mg/mL → mcg/mL = mg/mL × 1000.',
      ],
      hard_safety_checks: [
        {
          if: 'final_concentration_mcg_ml <= 0',
          then: 'BLOCK',
          message: 'Concentração inválida (mcg/mL).',
        },
        {
          if: "species == 'cat' && dose_mcgkgmin > 40",
          then: 'BLOCK',
          message: 'Gato: acima de 40 mcg/kg/min aumenta muito risco de toxicidade; bloquear.',
        },
      ],
      soft_safety_checks: [
        {
          if: "species == 'dog' && dose_mcgkgmin > 80",
          then: 'WARN',
          message: 'Acima de 80 mcg/kg/min: acima da faixa antiarrítmica típica; alto risco de toxicidade.',
        },
        {
          if: "has_comorbidity('hepatic_disease')",
          then: 'WARN',
          message: 'Hepatopatia: reduzir dose e monitorar SNC/PA (depuração ↓).',
        },
        {
          if: "lab('K') == 'low'",
          then: 'INFO',
          message: 'Hipocalemia pode reduzir eficácia da lidocaína; corrigir eletrólitos.',
        },
      ],
      outputs: ['dose_total_mcg_min', 'dose_total_mcg_h', 'rate_ml_h'],
      error_cost: 'Superdose → convulsões/hipotensão/depressão respiratória; subdose → VT persiste e risco de morte súbita.',
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg', 'drug_concentration_mg_ml'],
      algorithm: [
        'Dose total (mg) = dose_mgkg × weight_kg',
        'Volume (mL) = dose_total_mg ÷ drug_concentration_mg_ml',
        'Administrar IV lento e reavaliar ECG/PA/SNC em 1–2 min.',
      ],
      conversions: ['2% = 20 mg/mL; 1% = 10 mg/mL.'],
      hard_safety_checks: [
        {
          if: "species == 'dog' && cumulative_bolus_mgkg > 8",
          then: 'BLOCK',
          message: 'Cão: não exceder dose cumulativa 8 mg/kg em ~10 min.',
        },
        {
          if: "species == 'cat' && cumulative_bolus_mgkg > 4",
          then: 'BLOCK',
          message: 'Gato: não exceder dose cumulativa ~4 mg/kg; risco alto de toxicidade.',
        },
        {
          if: 'product_contains_epinephrine == true',
          then: 'BLOCK',
          message: 'Antiarrítmico IV: usar lidocaína SEM epinefrina.',
        },
      ],
      soft_safety_checks: [
        {
          if: "species == 'cat' && dose_mgkg > 0.5",
          then: 'WARN',
          message: 'Gato: bolus acima de 0,5 mg/kg aumenta risco; usar somente se necessário e IV lento com monitorização.',
        },
      ],
      outputs: ['dose_total_mg', 'volume_ml'],
      error_cost: 'Erro de %/mg/mL e dose cumulativa é causa comum de neurotoxicidade.',
    },
    dilution_builder: {
      required_inputs: ['stock_concentration_mg_ml', 'stock_volume_ml', 'diluent_volume_ml'],
      algorithm: [
        'Total (mg) = stock_concentration_mg_ml × stock_volume_ml',
        'Volume final (mL) = stock_volume_ml + diluent_volume_ml',
        'Concentração final (mg/mL) = total_mg ÷ volume_final_ml',
        'Concentração final (mcg/mL) = concentração_final_mg_ml × 1000',
      ],
      hard_safety_checks: [
        {
          if: 'stock_concentration_mg_ml <= 0 || stock_volume_ml <= 0 || diluent_volume_ml < 0',
          then: 'BLOCK',
          message: 'Valores inválidos para diluição.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'final_concentration_mg_ml > 5',
          then: 'INFO',
          message: 'Concentração final alta: aumenta risco de erro/bolus acidental; rotular e dupla checagem.',
        },
      ],
      outputs: ['final_concentration_mg_ml', 'final_concentration_mcg_ml', 'final_volume_ml'],
      error_cost: 'Concentração errada altera mL/h e risco de toxicidade.',
    },
  },

  // Seção 13: Bloco Didático
  how_we_got_here_block: {
    title: 'Como chegamos a este resultado (Lidocaína CRI)',
    render_steps: [
      { step: 1, label: 'Dose por minuto', formula: 'mcg/min = (mcg/kg/min) × peso(kg)' },
      { step: 2, label: 'Converter para hora', formula: 'mcg/h = (mcg/min) × 60' },
      { step: 3, label: 'Taxa de infusão', formula: 'mL/h = (mcg/h) ÷ concentração(mcg/mL)' },
    ],
    interpretation_rules: [
      'Antiarrítmico IV: bolus tem duração curta (≈10–20 min) → CRI mantém o efeito.',
      'Falha comum: hipocalemia ou arritmia não ventricular (SVT) — corrija/repense antes de "subir dose".',
      'Primeiros sinais de toxicidade geralmente são neurológicos (tremores/ataxia) — pare cedo.',
    ],
    example: {
      scenario: 'Cão 10 kg, CRI 50 mcg/kg/min, solução 2 mg/mL (2000 mcg/mL)',
      calculation: [
        'mcg/min = 50 × 10 = 500 mcg/min',
        'mcg/h = 500 × 60 = 30000 mcg/h',
        'mL/h = 30000 ÷ 2000 = 15 mL/h',
      ],
      result: 'Programar 15 mL/h e monitorar ECG/PA/SNC; ajustar conforme resposta e toxicidade.',
    },
  },

  // Seção 14: Integrações
  protocol_integrations: {
    enabled: true,
    protocols: ['MLK (conceito)', 'arritmias_ventriculares', 'analgesia_multimodal'],
    why_combo_exists:
      'Lidocaína combina ação antiarrítmica (VT) com uso adjuvante em infusões multimodais (principalmente cães), mas seu limitador é toxicidade neurológica/cardiovascular — especialmente em gatos e hepatopatas.',
    rules: [
      {
        if: "species == 'cat' && indication == 'analgesia_cri'",
        then: {
          action: 'PREFER_ALTERNATIVE',
          drug_id: 'lidocaina',
          message: 'Gatos: infusão de lidocaína para analgesia/MAC-sparing pode causar depressão cardiovascular; preferir alternativas.',
        },
      },
      {
        if: "has_comorbidity('hepatic_disease')",
        then: {
          action: 'REDUCE_DOSE',
          drug_id: 'lidocaina',
          factor: 0.7,
          message: 'Hepatopatia: reduzir taxa e monitorar SNC/PA (depuração ↓).',
        },
      },
      {
        if: 'product_contains_epinephrine == true',
        then: {
          action: 'REMOVE_DRUG',
          drug_id: 'lidocaina',
          message: 'Antiarrítmico IV: remover formulação com epinefrina; usar lidocaína sem epinefrina.',
        },
      },
    ],
  },

  // Seção 15: Fluxogramas
  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'lidocaine_vt_protocol',
        title: 'VT — Lidocaína (bolus → CRI) com checagens de falha',
        mermaid:
          'flowchart TD\nA[Suspeita de VT com compromisso hemodinâmico] --> B[Checar: O2, acid-base, eletrólitos (K+), Ht/TP]\nB --> C[Bolus IV lento]\nC --> D{Resposta? (conversão ou ↓ frequência ventricular)}\nD -- Sim --> E[Iniciar CRI e titular]\nD -- Não --> F[Repetir bolus até dose cumulativa máxima]\nF --> G{Sem resposta no máximo?}\nG -- Sim --> H[Reavaliar diagnóstico (SVT com aberrância), corrigir K+ e checar cateter]\nH --> I[Considerar 2ª linha conforme protocolo]\nG -- Não --> E\nE --> J[Monitorar SNC/PA/ECG continuamente]\nJ --> K{Sinais de toxicidade?}\nK -- Sim --> L[Parar/reduzir; tratar convulsão com diazepam se necessário]\nK -- Não --> E',
      },
    ],
  },

  // Seção 16: UI Copy
  ui_copy: {
    critical_warning_banner:
      'Lidocaína sistêmica pode causar convulsões e hipotensão; em gatos o risco é muito maior — usar doses menores e monitoração intensiva.',
    alert_messages: {
      short: 'Risco principal: neurotoxicidade (tremores/convulsões) e hipotensão; gatos são altamente sensíveis.',
      long: 'Lidocaína é antiarrítmico classe IB (IV) de primeira linha para taquiarritmias ventriculares em cães, com início rápido e duração curta após bolus (minutos), exigindo CRI para manter efeito. Falhas comuns incluem hipocalemia e diagnóstico incorreto (SVT com aberrância). Toxicidade é principalmente neurológica e pode evoluir para convulsões; em gatos a margem de segurança é menor e a infusão pode causar depressão cardiovascular relevante.',
    },
    block_message:
      'Bloqueado: não usar lidocaína com epinefrina para terapia antiarrítmica IV; em gatos, evitar uso sistêmico sem monitoração intensiva.',
    common_errors: [
      'Confundir lidocaína 2% (20 mg/mL) e errar a dose 10×.',
      'Ultrapassar dose cumulativa de bolus (cão 8 mg/kg; gato ~4 mg/kg).',
      'Tratar SVT com lidocaína (geralmente ineficaz).',
      'Ignorar hipocalemia (reduz eficácia).',
      'Usar CRI analgésica em gato sem considerar risco cardiovascular.',
    ],
  },

  // Seção 17: Referências
  references: [
    {
      section: 'pharmacodynamics/pharmacokinetics/doses_cat_dog/toxicity/management',
      source:
        'NELSON & COUTO (6ª ed.) — Distúrbios Cardiovasculares: seção Lidocaine e Tabela 4.2 (doses cão e gato; início/duração bolus; meia-vida; metabolismo hepático CYP; hipocalemia/hipercalemia; toxicidade e manejo com diazepam).',
      page: 'PDF p.119–120 (linhas ~11055–11135 no TXT gerado)',
      edition: '6',
    },
    {
      section: 'doses_dog_vt + CRI range + cautela em gatos',
      source:
        'BSAVA Manual of Canine and Feline Emergency and Critical Care (3rd ed.) — tabela Analgesics/antiarrhythmic e seção de arritmias ventriculares (bolus repetidos até 8 mg/kg; CRI 25–80 mcg/kg/min; gatos mais sensíveis à toxicidade).',
      page: 'PDF p.83 (tabela: linha ~6891) e p.95 (texto VT: linhas ~7948–7980)',
      edition: '3',
    },
    {
      section: 'cats_risk_with_infusion_analgesia + evidência sistêmica variável',
      source:
        'Veterinary Anesthesia and Analgesia (Lumb & Jones, 6th ed.) — Seção de dor: discussão sobre administração sistêmica de anestésicos locais (lidocaína), evidência variável e nota de que, em gatos, a dose para reduzir inalante pode causar depressão cardiovascular e o risco pode superar benefício.',
      page: 'PDF p.1032 (linhas ~73395–73425 no TXT)',
      edition: '6',
    },
  ],
}
