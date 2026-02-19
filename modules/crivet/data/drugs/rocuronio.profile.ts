import type { DrugProfile } from '../../types/drugProfile'

export const rocuronioProfile: DrugProfile = {
  drug_id: 'rocuronio',
  name_pt: 'Rocurônio (brometo de rocurônio)',
  name_en: 'Rocuronium bromide',
  synonyms: ['Rocuronium', 'Esmeron', 'BNM não despolarizante', 'bloqueador neuromuscular'],
  class: [
    'Bloqueador neuromuscular não despolarizante',
    'Aminoesteroide',
    'Reversível por sugammadex',
  ],

  core_concepts: {
    taglines: [
      'BNM não despolarizante de início rápido — escolha para RSI em veterinária',
      'Revertido por sugammadex (dose depende da profundidade do bloqueio)',
      'Monitorização neuromuscular (TOF) obrigatória para uso seguro',
      'Sem efeito analgésico ou sedativo — SEMPRE associar anestesia adequada',
      'Refrigeração antes de abrir; estabilidade limitada após abertura',
    ],
    mechanism: {
      receptors_targets: [
        'Antagonismo competitivo dos receptores nicotínicos na junção neuromuscular',
        'Bloqueia ligação da acetilcolina → paralisia flácida',
      ],
      primary_effects: {
        cardiovascular: 'Mínimo efeito cardiovascular nas doses usuais. Pode causar taquicardia leve (efeito vagolítico fraco).',
        respiratory: 'Paralisia dos músculos respiratórios — ventilação mecânica obrigatória durante bloqueio.',
        cns: 'SEM efeito sedativo, analgésico ou amnésico. Paciente pode estar consciente e com dor se anestesia inadequada.',
        renal_hepatic: 'Excreção biliar predominante (≈75%); excreção renal (≈25%). Prolongamento em hepatopatia grave.',
        gi: 'Sem efeito direto relevante.',
      },
      clinical_metaphor:
        '"Desliga os músculos, mas não a consciência": rocurônio paralisa sem sedar. Sem anestesia adequada, o paciente está acordado e paralisado — situação de alto sofrimento. Sempre garantir hipnose e analgesia antes.',
    },
    pharmacodynamics: {
      onset_iv: '≈ 60–90 seg (0,6 mg/kg); ≈ 60 seg (1,2 mg/kg — RSI)',
      peak: '≈ 1–2 min',
      duration: '≈ 20–35 min (0,6 mg/kg); ≈ 60–90 min (1,2 mg/kg)',
      dependencies: [
        'Dose (maior dose = início mais rápido e duração mais longa)',
        'Temperatura (hipotermia prolonga bloqueio)',
        'Função hepática (excreção biliar predominante)',
        'Eletrólitos (hipocalemia e hipocalcemia potencializam bloqueio)',
      ],
    },
    pharmacokinetics: {
      metabolism: 'Mínimo metabolismo hepático. Excreção predominantemente biliar (≈75%) e renal (≈25%) como fármaco ativo.',
      excretion: 'Biliar (≈75%) e renal (≈25%).',
      dog_vs_cat: 'Mesmas faixas de dose geralmente aplicadas. Monitorização TOF recomendada em ambas as espécies.',
      active_metabolites: 'Metabólito 17-desacetil-rocurônio: atividade bloqueadora fraca, sem relevância clínica usual.',
      accumulation: 'Pode ocorrer com doses repetidas ou CRI prolongada, especialmente em hepatopatia.',
    },
  },

  species_notes: {
    dogs: {
      key_point: 'RSI: 0,6–1,2 mg/kg IV. Manutenção: 0,1–0,2 mg/kg bolus conforme TOF. CRI: 5–12 mcg/kg/min. Reversão com sugammadex.',
      high_risk_notes: [
        'Ventilação mecânica obrigatória durante bloqueio.',
        'Monitorização TOF para guiar redoses e reversão.',
        'Hepatopatia: prolongamento do bloqueio.',
      ],
      metabolism_excretion: 'Biliar (≈75%) e renal (≈25%).',
    },
    cats: {
      key_point: 'Mesmas faixas de dose. Monitorização TOF recomendada. Ventilação mecânica obrigatória.',
      high_risk_notes: [
        'Gatos podem ter variação individual na duração do bloqueio.',
        'Monitorização TOF é especialmente importante.',
      ],
      metabolism_excretion: 'Biliar e renal.',
    },
  },

  indications: {
    primary: [
      'Intubação de sequência rápida (RSI)',
      'Relaxamento muscular durante anestesia geral',
      'Procedimentos que requerem imobilidade absoluta (cirurgia ocular, neurocirurgia)',
    ],
    secondary: [
      'Facilitação de ventilação mecânica em pacientes com assincronia grave',
      'Manutenção de bloqueio neuromuscular em CRI',
    ],
    off_label_notes: [
      'CRI para manutenção de bloqueio: off-label, mas descrita na literatura.',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Sem ventilação mecânica disponível',
        why: 'Paralisia respiratória sem suporte ventilatório é fatal',
        level: 'BLOCK',
      },
      {
        condition: 'Sem anestesia/sedação adequada',
        why: 'Paciente pode estar consciente e com dor durante bloqueio — sofrimento grave',
        level: 'BLOCK',
      },
      {
        condition: 'Sem sugammadex disponível (para RSI com 1,2 mg/kg)',
        why: 'RSI em dose alta sem reversor disponível é de alto risco',
        level: 'CRITICAL',
      },
    ],
    relative: [
      {
        condition: 'Miastenia gravis / doenças neuromusculares',
        why: 'Sensibilidade aumentada ao bloqueio; resposta imprevisível',
        level: 'CRITICAL',
      },
      {
        condition: 'Hepatopatia grave',
        why: 'Excreção biliar reduzida → prolongamento do bloqueio',
        level: 'WARNING',
      },
      {
        condition: 'Hipocalemia / hipocalcemia graves',
        why: 'Potencializam o bloqueio neuromuscular',
        level: 'WARNING',
      },
    ],
  },

  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      bolus: {
        mgkg: {
          min: 0.6,
          max: 1.2,
          note: 'RSI: 1,2 mg/kg IV (bloqueio rápido ~60 seg). Intubação eletiva: 0,6 mg/kg IV. Manutenção: 0,1–0,2 mg/kg conforme TOF.',
        },
        route: 'IV',
        loading_dose: { min: 0.6, max: 1.2 },
      },
      cri: {
        mcgkgmin: {
          min: 5,
          max: 12,
          note: 'CRI para manutenção de bloqueio. Sempre guiar por TOF. Ajustar conforme profundidade desejada.',
        },
        titration: {
          increment: 'Ajustar por TOF (alvo: 1–2 twitch em TOF-4)',
          interval: 'Monitorar TOF a cada 15–30 min',
        },
        max: 12,
      },
      adjustments: {
        obesity: 'Calcular por peso magro/ideal para RSI; evitar superdosagem.',
        shock: 'Sem ajuste específico de dose; monitorar duração do bloqueio.',
        hypoalbuminemia: 'Sem ajuste direto; monitorar TOF.',
        comorbidities: 'Hepatopatia: prolongamento esperado — reduzir dose de manutenção e monitorar TOF. Miastenia: evitar ou usar dose mínima com TOF.',
      },
      therapeutic_targets: {
        target_map: 'N/A (não é cardiovascular).',
        target_etco2: 'Manter normocapnia com ventilação mecânica.',
        analgesia_scale: 'N/A (sem efeito analgésico — garantir analgesia separada).',
        sedation_target: 'N/A (sem efeito sedativo — garantir hipnose separada).',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 0.6,
          max: 1.2,
          note: 'Mesmas faixas. RSI: 1,2 mg/kg. Eletiva: 0,6 mg/kg. Monitorar TOF.',
        },
        route: 'IV',
        loading_dose: { min: 0.6, max: 1.2 },
      },
      cri: {
        mcgkgmin: {
          min: 5,
          max: 12,
          note: 'CRI guiada por TOF.',
        },
        titration: {
          increment: 'Ajustar por TOF',
          interval: 'Monitorar TOF a cada 15–30 min',
        },
        max: 12,
      },
      adjustments: {
        obesity: 'Usar peso ideal.',
        shock: 'Monitorar duração do bloqueio.',
        hypoalbuminemia: 'Monitorar TOF.',
        comorbidities: 'Hepatopatia: prolongamento esperado.',
      },
      therapeutic_targets: {
        target_map: 'N/A.',
        target_etco2: 'Normocapnia com ventilação mecânica.',
        analgesia_scale: 'N/A.',
        sedation_target: 'N/A.',
      },
    },
  },

  presentations: [
    {
      concentration_mg_ml: 10,
      label: '10 mg/mL — solução injetável',
      examples: ['Esmeron® 10 mg/mL', 'Rocurônio 10 mg/mL (genérico)'],
      concentration_trap_warning:
        '❄ Refrigerado antes de abrir (2–8°C). Após aberto: estabilidade limitada (seguir fabricante, geralmente 30 dias em temperatura ambiente).',
    },
  ],

  dilution_and_preparation: {
    hard_rules: [
      '⛔ NUNCA usar sem ventilação mecânica disponível.',
      '⛔ NUNCA usar sem sedação/hipnose adequada.',
      'Ter sugammadex disponível antes de usar (especialmente para RSI com 1,2 mg/kg).',
      'Monitorização TOF obrigatória para uso além do bolus de intubação.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 5,
        use_cases: ['CRI para manutenção de bloqueio'],
        how_to_make: 'Diluir em NaCl 0,9% ou Ringer Lactato.',
        recipe: '25 mL (250 mg) + 25 mL NaCl 0,9% = 50 mL a 5 mg/mL',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5%'],
    preferred_diluent: { diluent: 'NaCl 0,9%', why: 'Compatibilidade padrão.' },
    stability: [
      { diluent: 'NaCl 0,9%', max_time_hours: 24, light_protection: false, syringe_bag_change: 'Trocar a cada 24h.' },
    ],
    dedicated_line_required: false,
    dedicated_line_why: 'Pode compartilhar via; evitar mistura com outros fármacos na mesma seringa.',
  },

  compatibility: {
    compatible_in_syringe_or_bag: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5%'],
    compatible_y_site_only: [],
    incompatible: [
      { agent: 'Propofol (na mesma seringa)', why: 'Precipitação descrita', risk: 'precipitação' },
      { agent: 'Tiopental', why: 'Precipitação em pH alcalino', risk: 'precipitação' },
    ],
    avoid_same_syringe_or_precipitation_risk: ['Evitar mistura com propofol ou barbitúricos.'],
    dedicated_line_rules: ['Flush com cristaloide entre drogas incompatíveis.'],
  },

  alerts_by_comorbidity: [
    {
      key: 'rocuronium_no_ventilation',
      level: 'BLOCK',
      title: '⛔ Sem ventilação mecânica: uso bloqueado',
      why: 'Paralisia respiratória sem suporte ventilatório é fatal.',
      action: ['Garantir ventilação mecânica antes de administrar.'],
      dose_adjustment: { avoid_bolus: true },
    },
    {
      key: 'rocuronium_no_sedation',
      level: 'BLOCK',
      title: '⛔ Sem sedação/hipnose: uso bloqueado',
      why: 'Paciente pode estar consciente e com dor durante bloqueio — sofrimento grave.',
      action: ['Garantir hipnose e analgesia adequadas antes de administrar.'],
      dose_adjustment: { avoid_bolus: true },
    },
    {
      key: 'rocuronium_myasthenia',
      level: 'CRITICAL',
      title: 'Miastenia gravis: sensibilidade aumentada',
      why: 'Resposta imprevisível e prolongada ao bloqueio neuromuscular.',
      action: [
        'Evitar se possível.',
        'Se necessário: dose mínima (0,1–0,2 mg/kg) com TOF contínuo.',
        'Ter sugammadex pronto.',
      ],
      dose_adjustment: {
        reduce_percent: 75,
        require_monitoring: ['TOF contínuo'],
        suggest_alternative: 'Evitar BNM; considerar anestesia dissociativa/inalatória.',
      },
    },
    {
      key: 'rocuronium_hepatic_disease',
      level: 'WARNING',
      title: 'Hepatopatia: prolongamento do bloqueio',
      why: 'Excreção biliar reduzida → duração do bloqueio aumentada.',
      action: [
        'Reduzir dose de manutenção.',
        'Monitorar TOF com maior frequência.',
        'Aguardar recuperação completa antes de extubação.',
      ],
      dose_adjustment: {
        reduce_percent: 30,
        require_monitoring: ['TOF', 'FR espontânea', 'força muscular'],
      },
    },
  ],

  calculation_templates: {
    cri: {
      required_inputs: ['weight_kg', 'target_mcgkgmin', 'drug_concentration_mg_ml'],
      algorithm: [
        '1) Calcular mcg/min = dose × peso',
        '2) Calcular mg/h = (mcg/min × 60) ÷ 1000',
        '3) Calcular mL/h = mg/h ÷ concentração',
      ],
      outputs: ['pump_rate_ml_h'],
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg', 'drug_concentration_mg_ml'],
      algorithm: [
        '1) Mg totais = dose × peso',
        '2) Volume = mg ÷ concentração',
      ],
      outputs: ['bolus_volume_ml'],
    },
  },

  presets: [
    {
      id: 'rocuronium_rsi_dog',
      label: 'RSI — Intubação de sequência rápida 🟥',
      dose_mgkg: 1.2,
      limits: { min: 1.2, max: 1.2 },
      clinical_target: 'Bloqueio rápido (~60 seg) para intubação de emergência. Ter sugammadex pronto.',
      linked_alerts: ['rocuronium_no_ventilation', 'rocuronium_no_sedation'],
    },
    {
      id: 'rocuronium_elective_dog',
      label: 'Intubação eletiva 🟨',
      dose_mgkg: 0.6,
      limits: { min: 0.6, max: 0.6 },
      clinical_target: 'Bloqueio para intubação eletiva; duração ~20–35 min',
      linked_alerts: ['rocuronium_no_ventilation', 'rocuronium_no_sedation'],
    },
    {
      id: 'rocuronium_maintenance_cri',
      label: 'Manutenção — CRI (guiada por TOF) 🟩',
      dose_mcgkgmin: 7,
      limits: { min: 5, max: 12 },
      clinical_target: 'Manutenção de bloqueio neuromuscular; ajustar por TOF',
      linked_alerts: ['rocuronium_no_ventilation', 'rocuronium_hepatic_disease'],
    },
  ],

  references: [
    {
      section: 'doses/reversal/monitoring',
      source: "Plumb's Veterinary Drug Handbook, 10th ed. — Rocuronium",
      year: 2023,
    },
    {
      section: 'clinical_use/RSI',
      source: 'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd ed.',
      year: 2018,
    },
  ],
}
