import type { DrugProfile } from '../../types/drugProfile'

export const butorfanolProfile: DrugProfile = {
  drug_id: 'butorfanol',
  name_pt: 'Butorfanol (tartrato de butorfanol)',
  name_en: 'Butorphanol tartrate',
  synonyms: ['Butorphanol tartrate', 'Torbugesic', 'Dolorex', 'opioide κ', 'agonista-antagonista'],
  class: [
    'Opioide agonista κ / antagonista μ parcial',
    'Sedativo / analgésico leve-moderado',
    'Antitussígeno (aprovado FDA em cães)',
  ],

  core_concepts: {
    taglines: [
      'Agonista κ + antagonista μ parcial: sedação boa, analgesia limitada (efeito teto)',
      'Analgesia curta (~50 min em cães, ~90 min em gatos); sedação mais longa (2–4h)',
      'Não libera histamina: mais estável hemodinamicamente que morfina',
      'Efeito teto para analgesia: doses maiores NÃO aumentam analgesia',
      'Excelente para sedação, premedicação e antitussígeno; fraco para dor intensa',
    ],
    mechanism: {
      receptors_targets: [
        'Agonista κ (kappa) — sedação, analgesia espinhal, analgesia visceral',
        'Antagonista μ (mu) parcial — bloqueia/reverte parcialmente opioides μ',
        '4–7x mais potente que morfina em peso (mas com efeito teto)',
      ],
      primary_effects: {
        cardiovascular:
          'Mínimo efeito cardiovascular nas doses usuais. Não libera histamina (diferente da morfina). Pode ocorrer bradicardia leve por tônus vagal.',
        respiratory:
          'Depressão respiratória menos pronunciada que opioides μ puros (efeito teto). Seguro em doses terapêuticas.',
        cns: 'Sedação dose-dependente (2–4h); analgesia curta (50–90 min). Efeito teto para analgesia: aumentar dose não aumenta analgesia e pode reduzi-la.',
        renal_hepatic:
          'Metabolismo hepático; excreção renal/biliar. Sem acúmulo clínico relevante nas doses usuais.',
        gi: 'Menor efeito sobre motilidade GI que morfina. Menos emetogênico.',
      },
      clinical_metaphor:
        '"O opioide do equilíbrio": sedação confiável, hemodinamicamente estável, mas não espere dele para dor intensa — tem teto. Pense nele como sedativo com bônus analgésico leve.',
    },
    pharmacodynamics: {
      onset_iv: '≈ 3–5 min',
      onset_im: '≈ 10–15 min',
      peak: '≈ 15–30 min (IV/IM)',
      duration: 'Analgesia: ~50 min (cão), ~90 min (gato). Sedação: 2–4h.',
      dependencies: [
        'Espécie (gatos têm analgesia mais longa)',
        'Via de administração',
        'Intensidade da dor (efeito teto limita eficácia em dor intensa)',
        'Combinação com outros sedativos (potencialização da sedação)',
      ],
    },
    pharmacokinetics: {
      metabolism: 'Hepático. Sem metabólitos ativos clinicamente relevantes.',
      excretion: 'Renal e biliar.',
      dog_vs_cat:
        'Gatos têm analgesia mais longa (~90 min vs ~50 min em cães). Ambas as espécies respondem bem à sedação (2–4h). Gatos são particularmente responsivos à sedação com butorfanol.',
      active_metabolites: 'Não clinicamente relevantes.',
      accumulation:
        'Não é problema clínico relevante nas doses usuais. Sem acúmulo significativo.',
    },
  },

  species_notes: {
    dogs: {
      key_point:
        'Melhor uso: sedação, premedicação, antitussígeno e analgesia leve-moderada (dor visceral). Analgesia curta (~50 min) — não usar como único opioide para dor intensa ou somática grave.',
      high_risk_notes: [
        'Efeito teto: doses acima de 0,4 mg/kg não aumentam analgesia.',
        'Se usado após morfina/metadona: pode antagonizar parcialmente o efeito μ.',
        'Antitussígeno: 15–20x mais potente que codeína.',
      ],
      metabolism_excretion: 'Hepático; excreção renal/biliar. Sem ajuste específico em DRC leve.',
    },
    cats: {
      key_point:
        'Excelente para sedação em gatos. Analgesia mais longa que em cães (~90 min). Combinação com dexmedetomidina é clássica para contenção/exames. Aprovado FDA para analgesia em gatos.',
      high_risk_notes: [
        'Sedação potente em gatos: monitorar FR e SpO2.',
        'Combinação com dexmedetomidina: ↓ FC e débito cardíaco — monitorar PA.',
        'Efeito teto para analgesia também se aplica em gatos.',
      ],
      metabolism_excretion: 'Hepático; excreção renal/biliar.',
    },
  },

  indications: {
    primary: [
      'Sedação e premedicação anestésica (cão e gato)',
      'Analgesia leve a moderada (dor visceral, pós-operatório de procedimentos menores)',
      'Antitussígeno (aprovado FDA em cães)',
    ],
    secondary: [
      'Contenção química em gatos (combinação com dexmedetomidina)',
      'Reversão parcial de opioides μ (reduzir efeitos adversos mantendo alguma analgesia)',
      'Analgesia pós-operatória de curta duração',
    ],
    off_label_notes: [
      'CRI: off-label, mas descrita na literatura para analgesia contínua.',
      'Combinação butorfanol + dexmedetomidina em gatos: amplamente usada, off-label para contenção.',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Uso concomitante com opioides μ puros (morfina, metadona, fentanil) quando se quer manter analgesia μ',
        why: 'Antagonismo μ parcial → pode reverter analgesia do opioide μ',
        level: 'BLOCK',
      },
    ],
    relative: [
      {
        condition: 'Dor intensa / somática grave',
        why: 'Efeito teto para analgesia: butorfanol não é eficaz para dor intensa; usar opioide μ puro',
        level: 'WARNING',
      },
      {
        condition: 'Hepatopatia grave',
        why: 'Metabolismo hepático reduzido → efeito prolongado',
        level: 'MONITOR',
      },
      {
        condition: 'Cardiomiopatia grave (gatos) com instabilidade',
        why: 'Combinação com dexmedetomidina pode reduzir DC significativamente',
        level: 'WARNING',
      },
    ],
  },

  doses: {
    unit_standard_cri: 'mg/kg/h',
    dog: {
      bolus: {
        mgkg: {
          min: 0.2,
          max: 0.4,
          note: 'IV, IM ou SC. Doses maiores aumentam sedação (efeito teto para analgesia).',
        },
        route: 'IV',
        loading_dose: { min: 0.2, max: 0.4 },
      },
      cri: {
        mgkgh: {
          min: 0.1,
          max: 0.4,
          note: 'CRI 0,1–0,4 mg/kg/h. Analgesia visceral e sedação leve.',
        },
        titration: {
          increment: '0,05 mg/kg/h',
          interval: '60 min',
        },
        max: 0.4,
      },
      adjustments: {
        obesity: 'Peso magro.',
        shock: 'Seguro cardiovascularmente; usar dose mínima.',
        hypoalbuminemia: 'Sem ajuste.',
        comorbidities: 'Seguro em cardiopatas.',
      },
      therapeutic_targets: {
        target_map: 'Estável.',
        sedation_target: 'Sedação leve.',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 0.2,
          max: 0.4,
          note: 'IV, IM, SC. Seguro e eficaz para gatos.',
        },
        route: 'IV',
        loading_dose: { min: 0.2, max: 0.4 },
      },
      cri: {
        mgkgh: {
          min: 0.1,
          max: 0.2,
          note: 'CRI segura em gatos. Menor risco de disforia que morfina.',
        },
        titration: {
          increment: '0,05 mg/kg/h',
          interval: 'Frequentemente',
        },
        max: 0.2,
      },
      adjustments: {
        obesity: 'Peso magro.',
        shock: 'Seguro.',
        hypoalbuminemia: 'Sem ajuste.',
        comorbidities: 'Renal/Hepático: geralmente seguro.',
      },
      therapeutic_targets: {
        target_map: 'Estável.',
        analgesia_scale: 'Dor visceral.',
      },
    },
  },

  calculation_templates: {
    cri: {
      required_inputs: [
        'weight_kg',
        'target_mgkgh',
        'final_volume_ml',
        'pump_rate_ml_h',
      ],
      algorithm: [
        '1) Calcular dose mg/h = peso * target_mgkgh',
        '2) Tempo (h) = volume / taxa',
        '3) Mg totais = mg/h * tempo',
        '4) Volume Butorfanol (10mg/mL) = mg totais / 10',
        '5) Diluente = volume - vol_butorfanol',
      ],
      outputs: ['drug_volume', 'diluent_volume'],
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg'],
      algorithm: [
        '1) Mg totais = peso * dose',
        '2) Volume = mg / 10',
      ],
      outputs: ['drug_volume'],
    },
  },

  presets: [
    {
      id: 'butor_cri_analgesia',
      label: 'CRI Analgesia Padrão',
      dose_mgkgh: 0.15,
      limits: { min: 0.1, max: 0.2 },
      clinical_target: 'Analgesia visceral leve/moderada.',
    },
    {
      id: 'butor_macete_1mlkgh',
      label: 'Macete: 1 mL/h = Dose/kg',
      dose_mgkgh: 0.2,
      limits: { min: 0.1, max: 0.4 },
      clinical_target: 'Preparo 1 mL/h.',
    },
  ],

  presentations: [
    {
      concentration_mg_ml: 10,
      label: '10 mg/mL — solução injetável (mais comum no Brasil)',
      examples: ['Torbugesic® 10 mg/mL', 'Dolorex® 10 mg/mL', 'Butorfanol tartrato 10 mg/mL (genérico)'],
      concentration_trap_warning:
        '⚠ ATENÇÃO: 1,5 mg de butorfanol TARTRATO = 1 mg de base ativa. Confirmar se a dose do livro é em tartrato ou base. Plumb\'s usa tartrato.',
    },
  ],

  dilution_and_preparation: {
    hard_rules: [
      'Não administrar junto com opioides μ puros (morfina, metadona, fentanil) — antagonismo.',
      'IV: pode ser administrado em bolus lento; sem risco de liberação de histamina.',
      'Rotular sempre com concentração final e dose-alvo.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 1,
        use_cases: ['CRI em seringa — cão e gato'],
        how_to_make: 'Diluir em NaCl 0,9%.',
        recipe: '1 mL (10 mg) + 9 mL NaCl 0,9% = 10 mL a 1 mg/mL',
      },
      {
        target_mg_ml: 0.5,
        use_cases: ['CRI em gatos ou pacientes pequenos'],
        how_to_make: 'Diluição mais conservadora.',
        recipe: '0,5 mL (5 mg) + 9,5 mL NaCl 0,9% = 10 mL a 0,5 mg/mL',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Glicose 5%', 'Ringer Lactato'],
    preferred_diluent: {
      diluent: 'NaCl 0,9%',
      why: 'Compatibilidade padrão e amplamente documentada.',
    },
    stability: [
      {
        diluent: 'NaCl 0,9%',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Trocar a cada 24h.',
      },
    ],
    dedicated_line_required: false,
    dedicated_line_why:
      'Pode compartilhar via; evitar mistura na mesma seringa com outros opioides.',
  },

  compatibility: {
    compatible_in_syringe_or_bag: ['NaCl 0,9%', 'Glicose 5%', 'Ringer Lactato'],
    compatible_y_site_only: [],
    incompatible: [
      {
        agent: 'Morfina / metadona / fentanil (opioides μ puros)',
        why: 'Antagonismo μ parcial → reverte analgesia do opioide μ',
        risk: 'perda de analgesia',
      },
      {
        agent: 'Tramadol',
        why: 'Risco de convulsões (interação serotoninérgica descrita)',
        risk: 'convulsões',
      },
      {
        agent: 'SSRIs (fluoxetina, etc.)',
        why: 'Risco de depressão adicional do SNC',
        risk: 'depressão SNC',
      },
    ],
    avoid_same_syringe_or_precipitation_risk: [
      'Não misturar com opioides μ puros na mesma seringa.',
    ],
    dedicated_line_rules: [
      'Se via compartilhada: flush com cristaloide entre drogas.',
    ],
  },

  administration_and_titration: {
    bolus_guidance: [
      'IV: bolus lento (1–2 min); sem risco de histamina.',
      'IM/SC: onset mais lento, mas prático para premedicação.',
      'Reavaliar analgesia em 15–30 min após bolus IV; 30–60 min após IM/SC.',
      'Lembrar: analgesia curta (~50 min cão, ~90 min gato) — repetir conforme necessidade.',
    ],
    titration_rules: [
      'Não ultrapassar 0,4–0,5 mg/kg em bolus (efeito teto).',
      'Em CRI: iniciar com loading e titular por sedação/analgesia.',
      'Se dor persistente com dose máxima: trocar por opioide μ puro.',
    ],
    monitoring_minimum: [
      'FR e SpO2',
      'Nível de sedação',
      'Escala de dor',
      'FC e PA (especialmente se combinado com dexmedetomidina)',
    ],
    endpoints: {
      desired_effect: [
        'Sedação adequada para procedimento/premedicação',
        'Escore de dor baixo (para dor leve-moderada)',
        'FR e SpO2 normais',
      ],
      toxicity_signs: [
        'Sedação excessiva / depressão respiratória (raro nas doses usuais)',
        'Bradicardia (especialmente com dexmedetomidina)',
        'Disforia (raro, mais descrito em humanos)',
      ],
    },
    therapeutic_failure: {
      check_first: [
        'Intensidade da dor: butorfanol tem efeito teto — não eficaz para dor intensa.',
        'Tipo de dor: melhor para visceral; fraco para somática intensa.',
        'Dose adequada para o peso?',
      ],
      common_causes: [
        'Dor intensa somática (efeito teto limita eficácia)',
        'Analgesia curta (repetição necessária após ~50 min em cães)',
        'Antagonismo se usado após opioide μ puro',
      ],
      when_to_change: [
        'Dor intensa: trocar por opioide μ puro (morfina, metadona, fentanil).',
        'Se usado após morfina/metadona: aguardar clearance antes de usar butorfanol.',
      ],
    },
  },

  adverse_effects_and_toxicity: {
    common: [
      'Sedação (dose-dependente)',
      'Bradicardia leve',
      'Ataxia transitória',
    ],
    serious: [
      'Depressão respiratória (raro nas doses usuais; mais provável em combinação com outros depressores)',
      'Bradicardia significativa (especialmente com dexmedetomidina)',
    ],
    subdose_signs: [
      'Dor persistente (efeito teto atingido)',
      'Sedação insuficiente para procedimento',
    ],
    overdose_signs: [
      'Sedação profunda',
      'Depressão respiratória',
      'Ataxia grave',
    ],
    management: [
      'Depressão respiratória: suporte ventilatório + naloxona (reverte parcialmente — agonista κ é menos sensível à naloxona).',
      'Bradicardia com dexmedetomidina: atropina ou glicopirrolato conforme protocolo.',
    ],
    special_events: [
      {
        event: 'Antagonismo de opioide μ (morfina/metadona)',
        management: 'Suspender butorfanol; aguardar clearance; reiniciar opioide μ se necessário.',
      },
      {
        event: 'Efeito teto atingido (dor persistente)',
        management: 'Trocar por opioide μ puro; não aumentar dose de butorfanol.',
      },
    ],
  },

  alerts_by_comorbidity: [
    {
      key: 'butorphanol_mu_opioid_antagonism',
      level: 'CRITICAL',
      title: 'Uso concomitante com opioide μ puro: antagonismo',
      why: 'Butorfanol é antagonista μ parcial → pode reverter analgesia de morfina, metadona ou fentanil.',
      action: [
        'NÃO administrar junto com opioides μ puros se o objetivo é manter analgesia μ.',
        'Se transição de μ para butorfanol: aguardar clearance do opioide μ.',
        'Se reversão parcial intencional: usar dose baixa e monitorar.',
      ],
      dose_adjustment: {
        avoid_bolus: false,
        require_monitoring: ['nível de sedação', 'escala de dor', 'FR', 'SpO2'],
        suggest_alternative: 'Manter opioide μ puro para dor intensa.',
      },
    },
    {
      key: 'butorphanol_severe_pain',
      level: 'WARNING',
      title: 'Dor intensa / somática grave: efeito teto limita eficácia',
      why: 'Butorfanol tem efeito teto para analgesia — doses maiores não aumentam e podem reduzir analgesia.',
      action: [
        'Não usar como único opioide para dor intensa.',
        'Usar opioide μ puro (morfina, metadona, fentanil) para dor moderada a intensa.',
        'Butorfanol pode ser usado como adjunto sedativo.',
      ],
      dose_adjustment: {
        suggest_alternative: 'Morfina, metadona ou fentanil para dor intensa.',
      },
    },
    {
      key: 'butorphanol_dexmedetomidine_cat',
      level: 'MONITOR',
      title: 'Combinação com dexmedetomidina (gatos): ↓ FC e débito cardíaco',
      why: 'Combinação clássica para sedação/contenção em gatos, mas pode reduzir FC e DC significativamente.',
      action: [
        'Monitorar FC, PA e SpO2.',
        'Ter atropina/glicopirrolato pronto.',
        'Evitar em gatos com cardiomiopatia grave ou instabilidade hemodinâmica.',
      ],
      dose_adjustment: {
        require_monitoring: ['FC', 'PA', 'SpO2', 'ECG'],
      },
    },
    {
      key: 'butorphanol_hepatic_disease',
      level: 'MONITOR',
      title: 'Hepatopatia: metabolismo reduzido',
      why: 'Metabolismo hepático; hepatopatia grave pode prolongar efeito.',
      action: [
        'Reduzir dose e monitorar sedação por mais tempo.',
        'Evitar redoses precoces.',
      ],
      dose_adjustment: {
        reduce_percent: 20,
        require_monitoring: ['sedação', 'FR'],
      },
    },
  ],

  references: [
    {
      section: 'doses/pharmacokinetics/interactions/ceiling_effect',
      source: "Plumb's Veterinary Drug Handbook, 10th ed. — Butorphanol Tartrate",
      year: 2023,
    },
    {
      section: 'clinical_use/species_notes/combinations',
      source: 'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd ed. — Chapter 21',
      year: 2018,
    },
  ],
}
