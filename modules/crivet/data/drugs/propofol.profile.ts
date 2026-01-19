import type { DrugProfile } from '../../types/drugProfile'

export const propofolProfile: DrugProfile = {
  // Seção 1: Identidade
  drug_id: 'propofol',
  name_pt: 'Propofol',
  name_en: 'Propofol',
  synonyms: ['2,6-diisopropilfenol', 'PropoFlo', 'Propoclear', 'Rapinovet'],
  class: [
    'Anestésico geral intravenoso hipnótico (não analgésico)',
    'Modulador positivo do receptor GABA-A',
  ],

  // Seção 2: Perfil Farmacológico
  core_concepts: {
    taglines: [
      'Propofol é um hipnótico potente que exige titulação lenta.',
      'Depressão cardiovascular e respiratória são dose- e velocidade-dependentes.',
      'Emulsão lipídica sem conservante: alto risco de contaminação.',
      'Gatos anêmicos: risco de corpos de Heinz em uso repetido.',
    ],
    mechanism: {
      receptors_targets: ['GABA-A (aumento da condutância de Cl⁻)', 'Hiperpolarização neuronal'],
      primary_effects: {
        cardiovascular: 'Vasodilatação periférica e redução da contratilidade miocárdica (dose-dependente).',
        respiratory: 'Depressão do centro respiratório (apneia) e redução da resposta ao CO2.',
        cns: 'Hipnose rápida, redução do CMRO2 e PIC (neuroprotetor se perfusão mantida).',
        renal_hepatic: 'Metabolismo hepático e extra-hepático; excreção renal de metabólitos inativos.',
      },
      clinical_metaphor: 'Titulação lenta é chave: "Ligue o cérebro (off) devagar para não desligar o coração junto".',
    },
    pharmacodynamics: {
      onset_iv: '30–60 segundos',
      peak: '1–2 minutos',
      duration: '5–10 minutos (bolus único)',
      dependencies: ['Velocidade de injeção', 'Débito cardíaco'],
    },
    pharmacokinetics: {
      metabolism: 'Conjugação hepática (glucuronidação) e significativa extra-hepática (pulmões, rins).',
      excretion: 'Renal (metabólitos inativos).',
      dog_vs_cat: 'Gatos têm eliminação mais lenta e risco de oxidação (corpos de Heinz).',
      accumulation: 'Baixo em cães; risco de recuperação prolongada em gatos após >30-60 min.',
    },
  },

  species_notes: {
    dogs: {
      key_point: 'Boa tolerância quando titulado. Hipotensão é o principal efeito adverso comum.',
      high_risk_notes: ['Cardiopatas', 'Hipovolêmicos', 'Geriátricos'],
      metabolism_excretion: 'Metabolismo rápido e eficiente.',
    },
    cats: {
      key_point: 'Maior sensibilidade e metabolismo mais lento. Risco oxidativo (corpos de Heinz).',
      high_risk_notes: ['Infusões prolongadas (>30 min)', 'Uso repetido em dias consecutivos', 'Gatos anêmicos'],
      metabolism_excretion: 'Deficiência em glucuronidação prolonga eliminação.',
    },
  },

  // Seção 3: Indicações e Contraindicações
  indications: {
    primary: [
      'Indução anestésica em cães e gatos',
      'Manutenção anestésica de curta duração (TIVA)',
      'Controle de status epilepticus refratário',
      'Sedação profunda para procedimentos diagnósticos',
    ],
    secondary: ['Redução de PIC em neuroanestesia (se ventilado)'],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Hipersensibilidade conhecida',
        why: 'Risco de anafilaxia.',
        level: 'BLOCK',
      },
      {
        condition: 'Incapacidade de intubar/ventilar',
        why: 'Apneia é um efeito esperado e comum; via aérea segura é obrigatória.',
        level: 'BLOCK',
      },
      {
        condition: 'Hipovolemia/Choque não corrigido (sem estabilização)',
        why: 'Colapso cardiovascular iminente devido à vasodilatação.',
        level: 'CRITICAL',
      },
    ],
    relative: [
      {
        condition: 'Pancreatite / Hiperlipidemia grave',
        why: 'Veículo lipídico pode exacerbar condição.',
        level: 'WARNING',
      },
      {
        condition: 'Insuficiência cardíaca descompensada',
        why: 'Depressão miocárdica pode ser fatal se não titulado com extrema cautela.',
        level: 'CRITICAL',
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
          note: 'Indução: 4-6 mg/kg (padrão), 2-4 mg/kg (premedicado), 1-2 mg/kg (alto risco). Titular em 60s.',
        },
        route: 'IV',
      },
      cri: {
        mgkgh: {
          min: 6,
          max: 24,
          note: 'Equivalente a 0.1-0.4 mg/kg/min. Ajustar à resposta clínica.',
        },
        titration: {
          increment: '2-4 mg/kg/h',
          interval: '3-5 min',
        },
        maintenance: { min: 6, max: 24 },
        max: 60,
      },
      adjustments: {
        obesity: 'Calcular dose pelo peso magro ou ajustado. Nunca pelo peso total.',
        shock: 'Contraindicado até estabilização. Se necessário, doses mínimas co-induzidas.',
        comorbidities: 'Reduzir 30-50% em geriátricos e cardiopatas.',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 2,
          max: 8,
          note: 'Indução: 4-8 mg/kg (padrão), 2-4 mg/kg (premedicado). Titular muito lentamente.',
        },
        route: 'IV',
      },
      cri: {
        mgkgh: {
          min: 6,
          max: 18,
          note: 'Equivalente a 0.1-0.3 mg/kg/min. Evitar CRIs prolongadas (>60 min).',
        },
        titration: {
          increment: '2-3 mg/kg/h',
          interval: '3-5 min',
        },
        maintenance: { min: 6, max: 18 },
        max: 60,
      },
      adjustments: {
        obesity: 'Usar peso magro.',
        shock: 'Contraindicado até estabilização.',
      },
    },
  },

  // Seção 5: Apresentações
  presentations: [
    {
      concentration_mg_ml: 10,
      label: 'Propofol 1% (10 mg/mL)',
      examples: ['Propofol', 'Diprivan', 'Propoflo'],
      concentration_trap_warning: 'Confira se é 1% (10 mg/mL) ou 2% (20 mg/mL - raro em vet, mas existe).',
    },
  ],

  // Seção 6: Diluição
  dilution_and_preparation: {
    hard_rules: [
      'NÃO misturar com outros fármacos na mesma seringa (exceto lidocaína em co-indução imediata, se protocolo aceito, mas preferir separado).',
      'Técnica asséptica rigorosa (meio de cultura rico).',
      'Descartar frascos abertos conforme recomendação (6h sem conservante, 28 dias com conservante).',
    ],
    recommended_targets: [
      {
        target_mg_ml: 10,
        use_cases: ['Indução', 'CRI'],
        how_to_make: 'Usar puro (10 mg/mL).',
      },
    ],
    diluents_allowed: ['D5W', 'NaCl 0.9% (embora raramente diluído)'],
    dedicated_line_required: true,
  },

  // Seção 7: Compatibilidade
  compatibility: {
    incompatible: [
      {
        agent: 'Fluidos com cálcio, muitos antibióticos',
        why: 'Emulsão instável, risco de quebra da emulsão ou precipitação.',
        risk: 'Embolia gorda / precipitação',
      },
    ],
    dedicated_line_rules: ['Idealmente administrar em via exclusiva ou Y-site muito próximo com flush.'],
  },

  // Seção 8: Administração
  administration_and_titration: {
    bolus_guidance: [
      'IMPORTANTE: 4-6 mg/kg é a dose TOTAL calculada, não o bolus inicial.',
      'Administrar 1/4 da dose calculada lentamente (10-15s).',
      'Aguardar 30s. Checar reflexos.',
      'Repetir incrementos pequenos até intubação.',
      'NUNCA fazer bolus rápido ("push").',
    ],
    monitoring_minimum: ['SpO2', 'EtCO2 (essencial)', 'PA (essencial)', 'ECG'],
    therapeutic_failure: {
      check_first: ['Acesso venoso (extravasamento?)', 'Apneia (paciente parou de respirar mas ainda tem reflexo?)'],
    },
  },

  // Seção 9: Efeitos Adversos
  adverse_effects_and_toxicity: {
    common: ['Apneia (transitória ou prolongada)', 'Hipotensão', 'Bradicardia', 'Dor à injeção'],
    serious: ['Colapso cardiovascular (em instáveis)', 'Mioclonias/Excitação (fase I/II)', 'Síndrome da infusão do propofol (uso muito prolongado/alto - raro em vet)'],
    management: [
      'Apneia: Intubar e ventilar.',
      'Hipotensão: Fluidos, reduzir taxa, vasopressor.',
      'Dor: Lidocaína prévia ou veia calibrosa.',
    ],
  },

  // Seção 10: Alertas por Comorbidade
  alerts_by_comorbidity: [
    {
      key: 'cardiac_disease',
      level: 'WARNING',
      title: 'Cardiopatia: Risco de descompensação',
      why: 'Redução da contratilidade e vasodilatação. Cardiopatas têm menor reserva.',
      action: ['Reduzir dose em 30-50%', 'Titular muito lentamente', 'Monitorar PA invasiva se possível'],
      dose_adjustment: { reduce_percent: 40 },
    },
    {
      key: 'hypovolemia_shock',
      level: 'CRITICAL',
      title: 'Hipovolemia/Choque: Contraindicado',
      why: 'Veias "vazias" + vasodilatação = Parada cardíaca. Droga agrava hipotensão.',
      action: ['Estabilizar volemia antes', 'Usar co-indução poupadora', 'Considerar etomidato ou alfaxalona'],
    },
    {
      key: 'neurologic_increased_icp',
      level: 'SAFE',
      title: 'Hipertensão Intracraniana (PIC)',
      why: 'Propofol reduz fluxo sanguíneo cerebral e metabolismo, reduzindo PIC.',
      action: ['Benéfico em neuroanestesia', 'Manter CAM baixa', 'Cuidar para não baixar PAM (PPC = PAM - PIC)'],
    },
    {
      key: 'hepatic_disease',
      level: 'MONITOR',
      title: 'Hepatopatia',
      why: 'Bem tolerado devido ao metabolismo extra-hepático.',
      action: ['Titular com cuidado (clearance pode estar levemente reduzido)'],
    },
    {
      key: 'renal_disease',
      level: 'MONITOR',
      title: 'Doença Renal',
      why: 'Sem nefrotoxicidade direta, mas hipotensão causa lesão renal aguda.',
      action: ['Manter PA > 60-70 mmHg o tempo todo'],
    },
    {
      key: 'obesity',
      level: 'WARNING',
      title: 'Obesidade',
      why: 'Alta lipossolubilidade. Dose pelo peso real causa overdose massiva e despertar lento.',
      action: ['Calcular dose pelo PESO MAGRO'],
    },
  ],

  // Seção 13: Didático
  how_we_got_here_block: {
    title: 'Entendendo a indução com Propofol',
    render_steps: [
      { step: 1, label: 'Cálculo da Dose Total', formula: 'Peso (kg) x Dose (mg/kg) = Dose Total (mg)' },
      { step: 2, label: 'Preparação', formula: 'Aspirar dose total. Não diluir (geralmente).' },
      { step: 3, label: 'Administração (O Pulo do Gato)', formula: 'Aplicar 25% da dose. Esperar 30s. Repetir se necessário.' },
    ],
    interpretation_rules: [
      'A dose calculada é um TETO, não uma meta.',
      'Muitos pacientes indutem com 50-70% da dose calculada.',
      'Se fizer tudo rápido, o paciente para de respirar e pressão cai antes de você conseguir intubar.',
    ],
  },

  // Seção 16: UI Copy
  ui_copy: {
    critical_warning_banner: 'Propofol é um hipnótico potente, de início rápido, que exige titulação lenta e ajustes rigorosos conforme estado cardiovascular, idade e composição corporal.',
    common_errors: [
      'Bolus rápido ("push")',
      'Dose cheia em cardiopatas',
      'Cálculo por peso total em obesos',
      'CRI prolongada em gatos',
      'Achar que propofol tira dor (ele não é analgésico)',
    ],
  },

  references: [
    {
      section: 'Geral',
      source: 'Lumb & Jones – Veterinary Anesthesia and Analgesia, 6th Edition',
    },
    {
      section: 'Monografia',
      source: 'Plumb’s Veterinary Drug Handbook, 10th Edition',
    },
    {
      section: 'Formulário',
      source: 'BSAVA Small Animal Formulary, 10th Edition',
    },
    {
      section: 'Neuroanestesia',
      source: 'Small Animal Neurological Emergencies - Chapter 29',
    },
  ],
}
