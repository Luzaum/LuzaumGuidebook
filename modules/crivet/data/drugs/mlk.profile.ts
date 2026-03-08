import type { DrugProfile } from '../../types/drugProfile'

export const mlkProfile: DrugProfile = {
  drug_id: 'mlk',
  name_pt: 'MLK (Morfina + Lidocaína + Cetamina)',
  name_en: 'MLK (Morphine + Lidocaine + Ketamine)',
  synonyms: ['Infusão Multimodal', 'Analgesia MLK', 'Triad Analgesia de baixo custo'],
  class: [
    'Analgesia Multimodal',
    'Infusão Contínua Combinada',
    'Opioide + Anestésico Local + Antagonista NMDA',
  ],

  core_concepts: {
    taglines: [
      'Alternativa de baixo custo ao FLK (substitui Fentanil por Morfina).',
      'Analgesia multimodal potente em três frentes: central, periférica e wind-up.',
      'Exclusivo para manutenção (CRI) — não administrar em bolus.',
      'Atenção: Morfina tem maior risco de vômito/náusea e liberação de histamina que Fentanil.',
    ],
    mechanism: {
      receptors_targets: [
        '🔴 Morfina: Agonista μ (analgesia central potente)',
        '🟡 Lidocaína: Bloqueio de canais de Na+ (analgesia sistêmica, anti-inflamatório)',
        '🟢 Cetamina: Antagonista NMDA (previne sensibilização central/wind-up)',
      ],
      primary_effects: {
        cardiovascular:
          'Morfina pode liberar histamina (vasodilatação/hipotensão); Lidocaína doses altas deprimem miocárdio. Geralmente estável se titulado.',
        respiratory:
          'Depressão respiratória dose-dependente pela Morfina. Potencializada se houver outros depressores.',
        cns: 'Analgesia profunda, sedação leve a moderada. Morfina causa mais sedação e disforia que Fentanil.',
        renal_hepatic:
          'Metabolismo hepático complexo. Morfina tem metabólitos ativos que acumulam em nefropatas.',
        gi: 'Morfina reduz motilidade (constipação) e pode causar vômito (estímulo CRTZ).',
      },
      clinical_metaphor:
        '"O FLK raiz": Mesma lógica de "ataque em três frentes", mas usando Morfina (mais barata e duradoura, porém com mais efeitos adversos como vômito e sedação) no lugar do Fentanil.',
    },
    pharmacodynamics: {
      onset_iv: 'Lento moderado (Morfina demora mais para atingir pico que Fentanil)',
      duration: 'Morfina tem meia-vida mais longa, mas na mistura CRI o efeito é contínuo.',
      dependencies: [
        'Função renal (acúmulo de M6G da morfina)',
        'Função hepática (metabolismo das 3 drogas)',
      ],
    },
    pharmacokinetics: {
      metabolism: 'Hepático (glucuronidação da morfina; CYP para lido/ceta).',
      excretion: 'Renal (atenção aos metabólitos da morfina em renais crônicos).',
      dog_vs_cat:
        'GATOS: Lidocaína sistêmica é tóxica e Morfina em doses caninas causa disforia/excitação. MLK Padrão Cão é PROIBIDO em gatos.',
    },
  },

  species_notes: {
    dogs: {
      key_point:
        'Excelente custo-benefício para dor intensa (ortopedia, oncológica). Padrão: Morfina 0,1–0,3 mg/kg/h.',
      high_risk_notes: [
        'Monitorar hipotensão (histamina da morfina).',
        'Cuidado com vômitos em pacientes com risco de aspiração.',
      ],
      metabolism_excretion: 'Hepático/Renal.',
    },
    cats: {
      key_point:
        '❌ MLK Padrão contém Lidocaína tóxica e Morfina em dose alta. NÃO USAR a mistura de cão.',
      high_risk_notes: [
        'Lidocaína: Risco cardiotóxico grave.',
        'Morfina: Risco de excitação/disforia ("mania de gato").',
      ],
      metabolism_excretion: 'Deficiência de glicuronidação (morfina).',
    },
  },

  indications: {
    primary: [
      'Dor pós-operatória de grande porte (mastectomia, ortopedia)',
      'Trauma extenso com restrição de custo (fentanil indisponível)',
      'Dor crônica agudizada (câncer)',
    ],
    secondary: ['Redução da CAM no intraoperatório (menos que FLK, mas útil)'],
    off_label_notes: [
      'Uso off-label consagrado na prática veterinária.',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Gatos (formulação padrão)',
        why: 'Toxicidade da lidocaína e dose inadequada de morfina.',
        level: 'BLOCK',
      },
      {
        condition: 'Mastocitoma / Choque anafilático',
        why: 'Morfina libera histamina, piorando a degranulação/vasodilatação.',
        level: 'CRITICAL',
      },
    ],
    relative: [
      {
        condition: 'Insuficiência renal grave',
        why: 'Acúmulo de metabólitos ativos da morfina.',
        level: 'WARNING',
      },
      {
        condition: 'Íleo paralítico / obstrução GI',
        why: 'Morfina reduz motilidade intestinal.',
        level: 'WARNING',
      },
    ],
  },

  doses: {
    unit_standard_cri: 'ml/kg/h (solução preparada)',
    dog: {
      cri: {
        mgkgh: {
          min: 0.1,
          max: 0.3,
          note: 'Doses ALVO: Morfina 0,1–0,3 mg/kg/h; Lidocaína 25–50 mcg/kg/min; Cetamina 5–10 mcg/kg/min.',
        },
        mcgkgmin: {
          min: 0,
          max: 0,
          note: 'Ver cálculo de solução. Morfina é mg/kg/H, outros mcg/kg/MIN.',
        },
        titration: {
          increment: 'Ajustar taxa da bomba (mL/h) conforme dor/sedação',
          interval: 'Reavaliar a cada 60 min',
        },
      },
      adjustments: {
        obesity: 'Peso magro.',
        shock: 'Estabilizar antes (risco de hipotensão por morfina/lido).',
        comorbidities: 'Renais: reduzir dose de morfina. Cardiopatas: reduzir lido/ceta.',
      },
      therapeutic_targets: {
        target_map: 'N/A (analgesia).',
        analgesia_scale: 'Manter conforto.',
        sedation_target: 'Sedação leve aceitável; profunda indica excesso.',
        target_etco2: 'N/A.',
      },
    },
    cat: {
      cri: {
        mgkgh: {
          min: 0.1,
          max: 0.1,
          note: 'NÃO USAR MLK PADRÃO. Risco de morte.',
        },
        titration: {
          increment: 'N/A',
          interval: 'N/A',
        },
      },
      adjustments: {
        obesity: 'N/A',
        shock: 'N/A',
        hypoalbuminemia: 'N/A',
        comorbidities: 'N/A',
      },
      therapeutic_targets: {
        target_map: 'N/A.',
        analgesia_scale: 'N/A.',
        sedation_target: 'N/A.',
        target_etco2: 'N/A.',
      },
    },
  },

  dilution_and_preparation: {
    hard_rules: [
      'Morfina (MG/kg/h) vs Lido/Ceta (MCG/kg/min). Cuidado com as unidades.',
      'Preparar solução para 1 mL/kg/h facilita ajustes.',
      'Proteger da luz (boa prática, embora estável por 24h).',
    ],
    recommended_targets: [
      {
        target_mg_ml: 0,
        use_cases: ['Método 1: Solução Calculada'],
        how_to_make: 'Calcular dose total de cada fármaco para o volume final desejado.',
        recipe:
          'Passo 1: Volume final (ex: 50mL). Passo 2: Calcular massa de Morfina, Lido e Ceta para a duração prevista. Passo 3: Misturar.',
      },
      {
        target_mg_ml: 0,
        use_cases: ['Método 2: Macete Hospitalar "1 mL/kg/h"'],
        how_to_make: 'Alvo: Morfina 0,15 mg/kg/h, Lido 40 mcg/kg/min, Ceta 8 mcg/kg/min.',
        recipe:
          'Calcular dose total baseada no tempo de infusão a 1 mL/kg/h e adicionar ao diluente.',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Glicose 5%'],
    preferred_diluent: {
      diluent: 'NaCl 0,9%',
      why: 'Padrão universal.',
    },
    stability: [
      {
        diluent: 'NaCl 0,9%',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Trocar a cada 24h.',
      },
    ],
    dedicated_line_required: true,
    dedicated_line_why: 'Evitar bolus acidental de morfina/lidocaína.',
  },

  compatibility: {
    compatible_in_syringe_or_bag: ['NaCl 0,9%'],
    incompatible: [
      { agent: 'Diazepam', why: 'Precipitação.', risk: 'precipitação' },
      { agent: 'Furosemida', why: 'Precipitação provável.', risk: 'precipitação' },
    ],
    avoid_same_syringe_or_precipitation_risk: ['Misturar apenas os 3 componentes.'],
    dedicated_line_rules: ['Via exclusiva recomendada.'],
  },

  alerts_by_comorbidity: [
    {
      key: 'mlk_cat_warning',
      level: 'BLOCK',
      title: 'GATOS: Risco de morte (Lidocaína)',
      why: 'A mistura contém Lidocaína em dose tóxica para gatos e Morfina em dose alta. NÃO administrar a mistura de cão em gatos.',
      action: [
        'Não usar MLK padrão em gatos.',
        'Usar infusão de Fentanil ou Metadona isolados, ou Ketamina + Opioide em doses felinas.',
      ],
    },
    {
      key: 'mlk_renais',
      level: 'WARNING',
      title: 'Insuficiência Renal',
      why: 'Morfina tem metabólitos ativos que acumulam, causando sedação prolongada e depressão respiratória.',
      action: [
        'Reduzir dose de morfina em 50%.',
        'Monitorar sedação.',
      ],
    },
  ],

  calculation_templates: {
    cri: {
      required_inputs: [
        'weight_kg',
        'target_morphine_mgkgh',
        'target_lidocaine_mcgkgmin',
        'target_ketamine_mcgkgmin',
        'final_volume_ml',
        'pump_rate_ml_h',
      ],
      algorithm: [
        '1) Calcular dose total por HORA:',
        '   - Morfina (mg/h) = peso * dose_morphine',
        '   - Lidocaína (mg/h) = peso * dose_lido * 60 / 1000',
        '   - Cetamina (mg/h) = peso * dose_ceta * 60 / 1000',
        '2) Tempo de duração (h) = volume_final / taxa_bomba',
        '3) Total na seringa:',
        '   - Total Morfina (mg) = Morfina (mg/h) * tempo',
        '   - Total Lidocaína (mg) = Lidocaína (mg/h) * tempo',
        '   - Total Cetamina (mg) = Cetamina (mg/h) * tempo',
        '4) Volumes a aspirar (Morfina 10mg/mL, Lido 20mg/mL, Ceta 50mg/mL):',
        '   - Vol Morf = Total Morf / 10',
        '   - Vol Lido = Total Lido / 20',
        '   - Vol Ceta = Total Ceta / 50',
        '5) Diluente = Volume Final - Soma dos volumes',
      ],
      hard_safety_checks: [
        {
          if: "patient.species === 'cat'",
          then: 'BLOCK',
          message: 'MLK padrão é contraindicado em gatos (Lidocaína tóxica).',
        },
      ],
      outputs: ['drug_volumes', 'diluent_volume'],
    },
  },

  presets: [
    {
      id: 'mlk_dog_standard',
      label: 'MLK Padrão Cão 🐕',
      dose_mgkg: 0,
      limits: { min: 0, max: 0 },
      clinical_target: 'Morf 0.15 mg/kg/h + Lido 40 mcg/kg/min + Ceta 8 mcg/kg/min',
      linked_alerts: ['mlk_cat_warning'],
    },
    {
      id: 'mlk_macete_1mlkgh',
      label: 'Macete Hospitalar 1 mL/kg/h 🏥',
      dose_mgkg: 0,
      limits: { min: 0, max: 0 },
      clinical_target: 'Ajustado para 1 mL/h = peso do cão.',
      linked_alerts: ['mlk_cat_warning'],
    },
  ],

  presentations: [
    {
      concentration_mg_ml: 10,
      label: 'Morfina 10 mg/mL (1%)',
    },
    {
      concentration_mg_ml: 20,
      label: 'Lidocaína 2% (20 mg/mL)',
    },
    {
      concentration_mg_ml: 50,
      label: 'Cetamina 5% (50 mg/mL)',
    },
  ],

  ui_copy: {
    critical_warning_banner: 'MLK é para MANUTENÇÃO (CRI). Não fazer bolus.',
    alert_messages: {
      short: 'Morfina libera histamina; cuidado com hipotensão.',
      long: 'Diferente do Fentanil, a Morfina pode causar liberação de histamina e vômitos. Monitore pressão e náusea.',
    },
  },

  references: [
    {
      section: 'protocol',
      source: 'Plumbs Veterinary Drugs - MLK Infusions',
    },
    {
      section: 'doses',
      source: 'Handbook of Veterinary Pain Management (Gaynor & Muir)',
    },
  ],
}
