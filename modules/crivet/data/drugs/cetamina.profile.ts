import type { DrugProfile } from '../../types/drugProfile'

export const cetaminaProfile: DrugProfile = {
  // Seção 1: Identidade
  drug_id: 'cetamina',
  name_pt: 'Cetamina (cloridrato de cetamina)',
  name_en: 'Ketamine (ketamine hydrochloride)',
  synonyms: ['Ketamine HCl', 'Cetamina HCl', 'Ketaset', 'Ketalar', 'Vetaset', 'Dopalen (varia por país/registro)'],
  class: ['Anestésico dissociativo', 'Antagonista NMDA', 'Agente analgésico adjuvante (anti-hiperalgesia/anti-wind-up)', 'Simpaticomimético dose-dependente'],

  // Seção 2: Perfil Farmacológico
  core_concepts: {
    taglines: [
      'Antagonismo NMDA reduz sensibilização central (wind-up) → útil como adjuvante analgésico, inclusive em CRI.',
      'Dissociativo: analgesia moderada + catalepsia, mas relaxamento muscular ruim → geralmente combinar com benzodiazepínico e/ou opioide.',
      'Simpaticomimético dose-dependente → pode ↑ FC/PA e ↑ consumo de O2; reduzir dose em cardiopatas/hipertensos.',
      'Gato: pode haver excreção urinária de fármaco inalterado → obstrução urinária/uroabdome pode prolongar sedação.',
    ],
    mechanism: {
      receptors_targets: ['NMDA (principal)', 'Modulação da sensibilização espinhal (anti-wind-up)', 'Efeito simpaticomimético dose-dependente (via catecolaminas/endógeno)'],
      primary_effects: {
        cardiovascular:
          'Simpaticomimético dose-dependente: pode ↑ FC e ↑ demanda miocárdica de O2; em alguns protocolos é escolhido quando se quer evitar vasodilatação/hipotensão de outros indutores, mas exige cautela em cardiopatas/hipertensos.',
        respiratory:
          'Depressão respiratória geralmente menor que indutores GABAérgicos em doses sedativas, porém pode ocorrer hipoventilação/apneia quando combinado com outros depressores ou em doses de indução; manter via aérea e ventilação prontas.',
        cns: 'Dissociação + catalepsia; pode ↑ metabolismo cerebral e não é recomendado quando há risco de PIC elevada (TCE etc.).',
        renal_hepatic:
          'Cães: metabolismo hepático com eliminação renal de metabólitos (efeito clínico mais guiado por farmacodinâmica); gatos: pode haver excreção urinária de fármaco inalterado → retenção urinária pode prolongar sedação.',
        gi: 'Sem alvo principal; efeito clínico indireto (estresse/catecolaminas).',
      },
      clinical_metaphor: '"Desliga o amplificador da dor": o NMDA é o botão do \'volume\' da sensibilização central. A cetamina baixa esse volume; se você gira demais (dose alta), ela também "pisa no acelerador" do coração.',
    },
    pharmacodynamics: {
      onset_iv: 'rápido (minutos; indução/efeito titulável quando IV)',
      onset_im: 'minutos (mais lento que IV; útil em contenção/sedação IM)',
      peak: 'minutos após IV/IM (dependente de dose e combinações)',
      duration: 'variável com dose e combinação; analgesia adjuvante pode persistir horas (ex.: guias rápidos citam 4–6 h em alguns usos IM/SC/VO)',
      dependencies: [
        'Dose (simpatomimético e efeitos adversos ↑ com dose)',
        'Coadministração (opioide/benzodiazepínico reduz disforia e melhora qualidade da sedação)',
        'Estado cardiovascular (cardiopatia/hipertensão)',
        'Pressão intracraniana (risco/benefício em TCE)',
        'Patologias urinárias em gatos (excreção urinária pode prolongar sedação)',
      ],
    },
    pharmacokinetics: {
      metabolism:
        'Predominantemente hepático em cães (metabólitos com eliminação renal); em gatos, pode haver fração excretada inalterada na urina (relevante clinicamente em obstrução/uroabdome).',
      excretion: 'Renal (metabólitos e/ou fração inalterada conforme espécie).',
      dog_vs_cat:
        'Gatos: excreção urinária inalterada pode tornar a duração mais imprevisível quando não há eliminação urinária (obstrução/ruptura vesical). Cães: efeito mais previsível, porém ainda dose/combinação-dependente.',
      active_metabolites:
        'Potencial de metabólitos com atividade é descrito em farmacologia geral, mas no CRIVET focar no impacto clínico: duração/recuperação e variabilidade por espécie/condição urinária.',
      accumulation: 'Risco de prolongamento/recuperação agitada aumenta com doses repetidas/associação inadequada e com retenção urinária em gatos.',
    },
    formulation_notes: {
      stability: 'Compatível com NaCl 0,9%, Ringer Lactato, Glicose 5%',
      equipment_adsorption: 'Sem adsorção significativa em equipos padrão',
    },
  },

  species_notes: {
    dogs: {
      key_point: 'Excelente adjuvante em sedação e analgesia multimodal; para indução, combinar com benzodiazepínico/opioide por relaxamento muscular e melhor recuperação.',
      high_risk_notes: [
        'Cautela em cardiopatas/hipertensos (efeito simpaticomimético dose-dependente).',
        'Cautela/evitar em suspeita de PIC elevada (TCE).',
        'Pode aumentar pressão intraocular → cautela em glaucoma/trauma ocular.',
      ],
      metabolism_excretion: 'Metabolismo hepático predominante, eliminação renal de metabólitos (efeito clínico mais guiado por dose/combinações).',
    },
    cats: {
      key_point: 'Útil IM/IV em sedação/indução; atenção especial a doença cardíaca e a condições urinárias (obstrução/uroabdome) por possível excreção urinária inalterada → sedação prolongada.',
      high_risk_notes: [
        'Cautela em cardiopatas/hipertensos (simpaticomimético).',
        'Pode prolongar sedação se não houver eliminação urinária (obstrução/ruptura vesical).',
        'Cautela/evitar em risco de PIC elevada (TCE) e em glaucoma/trauma ocular.',
      ],
      metabolism_excretion: 'Pode ser excretada inalterada na urina; eliminação urinária prejudicada pode prolongar sedação.',
    },
  },

  // Seção 3: Indicações e Contraindicações
  indications: {
    primary: [
      'Adjuvante analgésico (anti-wind-up) em dor moderada a intensa, inclusive em CRI (intra e pós-operatório).',
      'Sedação/IMobilização (IM) para contenção e pequenos procedimentos, geralmente em combinação com opioide e/ou alfa-2.',
      'Indução anestésica como parte de coindução (ex.: com benzodiazepínico/opioide), especialmente quando se quer reduzir dose de indutor e preservar estabilidade hemodinâmica relativa.',
    ],
    secondary: [
      'Componente de protocolos combinados (ex.: DKT/DKB/TKX e variações) em cães e gatos.',
      'Analgesia "resgate" em pacientes com hiperalgesia/tolerância a opioides (multimodal).',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Suspeita/risco de hipertensão intracraniana (ex.: TCE com sinais neurológicos e risco de PIC elevada)',
        why: 'Pode aumentar metabolismo cerebral e não é recomendada em risco de PIC elevada conforme referência de emergência.',
        level: 'CRITICAL',
      },
    ],
    relative: [
      {
        condition: 'Cardiopatia significativa / HCM/HOCM / insuficiência cardíaca descompensada / hipertensão grave',
        why: 'Atividade simpaticomimética dose-dependente → pode piorar taquicardia, consumo de O2 e pressão arterial; reduzir dose e monitorar de perto.',
        level: 'WARNING',
      },
      {
        condition: 'Glaucoma ou trauma ocular',
        why: 'Pode aumentar pressão intraocular; pode ser clinicamente relevante em glaucoma/trauma ocular.',
        level: 'WARNING',
      },
      {
        condition: 'Obstrução uretral / uroabdome (gatos)',
        why: 'Pode ocorrer excreção urinária inalterada; retenção urinária pode prolongar sedação até remoção da urina do corpo.',
        level: 'WARNING',
      },
      {
        condition: 'Hepatopatia/nefropatia graves',
        why: 'Guias rápidos citam evitar em nefro/hepatopatas graves; risco de recuperação imprevisível e maior sensibilidade clínica.',
        level: 'MONITOR',
      },
    ],
  },

  // Seção 4: Doses
  doses: {
    unit_standard_cri: 'mg/kg/h',
    dog: {
      bolus: {
        mgkg: {
          min: 2,
          max: 7,
          note: 'IV (coindução/sedação profunda) frequentemente com benzodiazepínico/opioide; IM para sedação/contenção. Dissociação, inibidor NMDA.',
        },
        mcgkg: { min: 0, max: 0, note: 'N/A' },
        ukg: { min: 0, max: 0, note: 'N/A' },
        route: 'IV',
        loading_dose: { min: 0, max: 0 },
      },
      cri: {
        mcgkgmin: { min: 0, max: 0, note: 'N/A (padrão do CRIVET para cetamina: mg/kg/h).' },
        mgkgh: {
          min: 0.1,
          max: 1.0,
          note: 'Sub-dissociativa/analgesia adjuvante: 0,1–0,6 mg/kg/h (Plumb\'s Veterinary Drug Handbook; Textbook SAEM 2019). Dose máxima aceitável: 1,0 mg/kg/h (início de efeito dissociativo leve). Faixa anterior de 0,6–1,8 mg/kg/h é dissociativa/anestésica — requer protocolo de anestesia completo e não é recomendada para analgesia adjuvante rotineira. Iniciar em 0,1–0,2 mg/kg/h e titular ao efeito analgésico.',
        },
        titration: {
          increment: '0,1 → 0,2 → 0,3 → 0,6 mg/kg/h (titular por analgesia e efeitos adversos; acima de 0,6 mg/kg/h monitorar para disforia/dissociação)',
          interval: 'Reavaliar a cada 15–30 min (dor, FC/PA, ventilação, qualidade de recuperação, comportamento).',
        },
        max: 1.0,
      },
      adjustments: {
        obesity: 'Preferir peso magro/estimado para iniciar; titular ao efeito (analgesia/recuperação).',
        shock: 'Evitar escalar agressivamente se choque for hipovolêmico não corrigido; priorizar estabilização e analgesia multimodal.',
        hypoalbuminemia: 'Sem ajuste fixo obrigatório no CRIVET; iniciar baixo e titular (sensibilidade clínica pode aumentar em doentes críticos).',
        comorbidities:
          'Cardiopatia/hipertensão: reduzir 25–50% e evitar bolus altos; TCE/PIC: evitar; glaucoma/trauma ocular: evitar/monitorar; hepatopata/nefropata grave: evitar ou usar dose mínima.',
      },
      therapeutic_targets: {
        target_map: 'N/A',
        target_etco2: 'Manter ventilação adequada; se sedação profunda/associação com depressores, monitorar EtCO2/SpO2.',
        analgesia_scale: 'Objetivo: queda ≥2 pontos em escala de dor usada no hospital + redução de alodinia/hiperalgesia (quando presente).',
        sedation_target: 'Sedação suficiente para procedimento com preservação de via aérea (quando possível) e recuperação tranquila.',
      },
    },
    cat: {
      bolus: {
        mgkg: {
          min: 2,
          max: 7.5,
          note: 'IV para sedação/coindução; IM para sedação/contenção. Dissociação, inibidor NMDA.',
        },
        mcgkg: { min: 0, max: 0, note: 'N/A' },
        ukg: { min: 0, max: 0, note: 'N/A' },
        route: 'IV',
        loading_dose: { min: 0, max: 0 },
      },
      cri: {
        mcgkgmin: { min: 0, max: 0, note: 'N/A (padrão do CRIVET para cetamina: mg/kg/h).' },
        mgkgh: {
          min: 0.1,
          max: 1.0,
          note: 'Sub-dissociativa/analgesia adjuvante: 0,1–0,6 mg/kg/h (Plumb\'s; Textbook SAEM). Máximo: 1,0 mg/kg/h. Em gatos: usar extremo cuidado; iniciar baixo (0,1 mg/kg/h); doses acima de 0,6 mg/kg/h aumentam disforia, sedação prolongada e em obstrução urinária/uroabdome podem prolongar recuperação (preferir evitar). Cardiopatas/hipertensos: reduzir 25–50%.',
        },
        titration: {
          increment: '0,1 → 0,2 → 0,4 → 0,6 mg/kg/h (se apropriado e monitorado; parar ao primeiro sinal de disforia/comportamento anormal)',
          interval: 'Reavaliar a cada 15–30 min.',
        },
        max: 1.0,
      },
      adjustments: {
        obesity: 'Preferir peso magro/ideal para iniciar e titular ao efeito.',
        shock: 'Evitar escalada agressiva; priorizar estabilização e multimodal.',
        hypoalbuminemia: 'Sem ajuste fixo; iniciar baixo e titular pela resposta/EA.',
        comorbidities: 'Cardiopatia/hipertensão: reduzir 25–50% e evitar bolus; TCE/PIC: evitar; glaucoma/trauma ocular: evitar/monitorar; obstrução uretral/uroabdome: evitar (prolonga).',
      },
      therapeutic_targets: {
        target_map: 'N/A',
        target_etco2: 'Monitorar ventilação (EtCO2/SpO2) se sedação profunda ou associação com depressores.',
        analgesia_scale: 'Redução clara de dor e hiperalgesia; melhora funcional e menor necessidade de resgates opioides.',
        sedation_target: 'Contenção/indução com recuperação tranquila (sempre combinar para reduzir disforia).',
      },
    },
  },

  // Seção 5: Apresentações
  presentations: [
    {
      concentration_mg_ml: 100,
      concentration_percent: 10,
      volume_ml: 10,
      total_mg: 1000,
      label: '100 mg/mL (10%) — frasco-ampola 10 mL',
      examples: ['Ketaset', 'Ketalar', 'Vetaset', 'genéricos'],
      concentration_trap_warning: 'ALTA concentração (100 mg/mL): risco de erro de dose/diluição em CRI e em pequenos pacientes.',
    },
    {
      concentration_mg_ml: 50,
      volume_ml: 10,
      total_mg: 500,
      label: '50 mg/mL — frasco-ampola 10 mL',
      examples: ['genéricos (varia por país)'],
      concentration_trap_warning: 'Confirmar mg/mL no rótulo (há variações comerciais).',
    },
    {
      concentration_mg_ml: 10,
      volume_ml: 20,
      total_mg: 200,
      label: '10 mg/mL — frasco (uso hospitalar, varia por país)',
      examples: ['genéricos (varia por país)'],
      concentration_trap_warning: 'Menos comum; útil para reduzir erro em pequenos pacientes.',
    },
  ],

  // Seção 6: Diluição
  dilution_and_preparation: {
    hard_rules: [
      'Para analgesia/CRI, usar sempre diluída e com bomba (seringa/equipo).',
      'Evitar usar cetamina isolada para sedação: preferir combinar com opioide e/ou benzodiazepínico para melhor qualidade e menos recuperação agitada.',
      'Em gatos com obstrução uretral/uroabdome: evitar (ou usar com extrema cautela), pois a sedação pode se prolongar.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 1,
        use_cases: ['CRI analgésica em cães/gatos', 'Facilitar taxas em mL/h'],
        how_to_make: 'Meta simples para CRI: 1 mg/mL.',
        recipe: 'Adicionar 1 mL de cetamina 100 mg/mL em 99 mL de diluente = 1 mg/mL.',
      },
      {
        target_mg_ml: 2,
        use_cases: ['CRI analgésica quando se deseja reduzir volume total'],
        how_to_make: 'Concentração intermediária para CRI.',
        recipe: 'Adicionar 2 mL de cetamina 100 mg/mL em 98 mL de diluente = 2 mg/mL.',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5% (D5W)'],
    preferred_diluent: {
      diluent: 'NaCl 0,9%',
      why: 'Disponibilidade ampla e prática para CRI em seringa; compatibilidade clínica usual.',
    },
    stability: [
      {
        diluent: 'NaCl 0,9%',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Trocar bolsa/seringa pelo menos a cada 24 h (ou conforme protocolo institucional).',
      },
      {
        diluent: 'Ringer Lactato',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Trocar bolsa/seringa pelo menos a cada 24 h.',
      },
      {
        diluent: 'Glicose 5% (D5W)',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Trocar bolsa/seringa pelo menos a cada 24 h.',
      },
    ],
    dedicated_line_required: false,
    dedicated_line_why: 'Preferível para CRIs (organização/segurança), mas não estritamente obrigatório se compatibilidade e flush forem garantidos.',
  },

  // Seção 7: Compatibilidade
  compatibility: {
    compatible_in_syringe_or_bag: [
      'Opioides (ex.: morfina/fentanil/metadona) — uso em associação é descrito em protocolos',
      'Benzodiazepínicos (ex.: midazolam) — frequentemente associados (qualidade de sedação/anestesia)',
      'Lidocaína (em esquemas tipo MLK: morfina–lidocaína–cetamina é descrito)',
    ],
    compatible_y_site_only: ['Sem padronização robusta no acervo para Y-site; se necessário, usar flush e observar precipitação/turvação.'],
    incompatible: [
      {
        agent: 'Misturas múltiplas sem validação (na mesma seringa/bolsa)',
        why: 'Risco de incompatibilidade físico-química e erro de dose; preferir preparar separadamente ou seguir receita padronizada do protocolo.',
        risk: 'precipitação',
      },
    ],
    dedicated_line_rules: [
      'Evitar misturar com fármacos sem compatibilidade confirmada por fonte (principalmente quando houver solventes não aquosos/propilenoglicol).',
      'Em CRI analgésica, preferir linha dedicada quando múltiplas infusões simultâneas ou quando houver risco de incompatibilidade.',
      'Se co-infusão for inevitável, realizar flush e checar visualmente precipitação.',
    ],
  },

  // Seção 8: Administração e Titulação
  administration_and_titration: {
    bolus_guidance: [
      'IV: administrar lentamente e com coindução (benzodiazepínico/opioide) para reduzir rigidez e recuperação agitada.',
      'IM: útil para contenção/sedação; preferir associar opioide ± alfa-2 conforme estabilidade do paciente.',
    ],
    titration_rules: [
      'Para CRI analgésica: iniciar baixo (ex.: 0.12 mg/kg/h) e escalar conforme dor e efeitos adversos.',
      'Reavaliar a cada 15–30 min durante escalonamento.',
      'Se ocorrer disforia/recuperação ruim, reduzir dose e reforçar associação com opioide/benzodiazepínico.',
    ],
    monitoring_minimum: [
      'FC e ritmo (ECG se disponível, especialmente em cardiopatas/hipertensos)',
      'PA',
      'SpO2 (e EtCO2 se sedação profunda/anestesia)',
      'Temperatura',
      'Nível de sedação/qualidade de recuperação',
      'Dor (escala) e necessidade de resgates',
    ],
    endpoints: {
      desired_effect: [
        'Melhora objetiva da analgesia (redução de resgates, menor alodinia/hiperalgesia, paciente mais confortável)',
        'Sedação suficiente para procedimento com manutenção segura de via aérea/ventilação (quando aplicável)',
      ],
      toxicity_signs: [
        'Recuperação agitada/disforia',
        'Taquicardia/hipertensão importantes (simpaticomimético)',
        'Hipoventilação/apneia (especialmente com outros depressores)',
        'Sinais neurológicos indesejáveis em risco de PIC',
      ],
    },
    therapeutic_failure: {
      check_first: [
        'Dor subtratada (precisa reforço de opioide/analgesia regional)',
        'Dose insuficiente (CRI muito baixa)',
        'Associação inadequada (cetamina isolada → sedação ruim/disforia)',
        'Hipóxia/hipercapnia/acidose ou hipotermia afetando resposta',
      ],
      common_causes: [
        'Hiperalgesia intensa exigindo multimodal (opioide + regional + AINE quando possível)',
        'Procedimento mais doloroso do que o previsto (precisa escalonar abordagem)',
      ],
      when_to_change: [
        'Se EA cardiovasculares/oculares/neurológicos → reduzir/cessar e trocar por alternativa (ex.: opioide/alpha-2/alfaxalona conforme caso).',
        'Se obstrução urinária/uroabdome em gato e sedação prolongando → priorizar desobstrução/drenagem e evitar novas doses.',
      ],
    },
  },

  // Seção 9: Efeitos Adversos
  adverse_effects_and_toxicity: {
    common: ['Recuperação possivelmente agitada/disforia (especialmente se usada isolada)', 'Taquicardia e/ou hipertensão (dose-dependente)', 'Hipoventilação quando associada a outros depressores'],
    serious: [
      'Piora clínica em pacientes com risco de PIC elevada (não recomendado)',
      'Aumento clinicamente relevante de pressão intraocular (glaucoma/trauma ocular)',
      'Sedação prolongada em gatos com eliminação urinária comprometida (obstrução/uroabdome)',
    ],
    subdose_signs: ['Analgesia insuficiente (continua necessitando resgates frequentes)', 'Sedação insuficiente para contenção/procedimento'],
    overdose_signs: [
      'Disforia grave/recuperação ruim',
      'Hipertensão/taquicardia marcantes',
      'Depressão respiratória/apneia (sobretudo com associações)',
    ],
    management: [
      'Reduzir/cessar cetamina; reforçar sedação/analgesia com opioide e/ou benzodiazepínico conforme necessidade clínica.',
      'Suporte ventilatório e via aérea se hipoventilação/apneia.',
      'Em cardiopatas/hipertensos: reduzir dose e tratar instabilidade conforme quadro (analgesia alternativa/controle hemodinâmico).',
      'Em gato com obstrução/uroabdome: remover urina do corpo (desobstrução/drenagem) para reduzir prolongamento.',
    ],
    special_events: [
      {
        event: 'disforia/recuperação agitada',
        management: 'Evitar cetamina isolada; combinar com opioide ± benzodiazepínico; reduzir dose; ambiente calmo e baixa estimulação.',
      },
      {
        event: 'sedação prolongada em gato com obstrução urinária/uroabdome',
        management: 'Priorizar correção da condição urinária (desobstrução/drenagem); evitar redoses; monitorar até recuperação.',
      },
    ],
  },

  // Seção 10: Alertas por Comorbidade
  alerts_by_comorbidity: [
    {
      key: 'ketamine_any_pic',
      level: 'BLOCK',
      title: 'Risco de PIC elevada (TCE etc.): evitar cetamina',
      why: 'Referência de emergência descreve que aumenta metabolismo cerebral e não é recomendada quando há risco de PIC elevada.',
      action: [
        'Bloquear uso quando "PIC elevada/TCE" selecionado.',
        'Sugerir alternativa de sedação/anestesia conforme cenário (ex.: opioide + benzodiazepínico; indução com agentes alternativos).',
      ],
      dose_adjustment: {
        suggest_alternative: 'Preferir protocolos sem cetamina em suspeita de PIC elevada.',
      },
    },
    {
      key: 'ketamine_any_glaucoma',
      level: 'WARNING',
      title: 'Glaucoma/trauma ocular: cetamina pode ↑ PIO',
      why: 'Pode causar aumento leve de pressão intraocular, relevante em glaucoma/trauma ocular.',
      action: ['Evitar quando possível.', 'Se inevitável, usar menor dose e monitorar clinicamente.'],
      dose_adjustment: {
        reduce_percent: 25,
        avoid_bolus: false,
        require_monitoring: ['PA', 'profundidade anestésica/sedação'],
      },
    },
    {
      key: 'ketamine_any_hypertension_cardiac',
      level: 'WARNING',
      title: 'Cardiopatia/hipertensão: reduzir dose (simpaticomimético)',
      why: 'Atividade simpaticomimética é dose-dependente; recomendada cautela e redução em cardiopatas/hipertensos.',
      action: ['Iniciar com 25–50% menos dose.', 'Evitar bolus altos; preferir coindução/CRI baixa.', 'Monitorar PA/ECG.'],
      dose_adjustment: {
        reduce_percent: 40,
        avoid_bolus: true,
        require_monitoring: ['PA', 'ECG (se possível)', 'SpO2/EtCO2 se sedação profunda'],
      },
    },
    {
      key: 'ketamine_cat_uo_uroabdomen',
      level: 'CRITICAL',
      title: 'Gato com obstrução uretral/uroabdome: risco de sedação prolongada',
      why: 'Pode ser excretada inalterada na urina em gatos; retenção/uroabdome pode prolongar sedação até remoção da urina do corpo.',
      action: ['Evitar cetamina se possível.', 'Se já usada e sedação prolonga, priorizar desobstrução/drenagem.', 'Evitar redoses.'],
      dose_adjustment: {
        avoid_bolus: true,
        suggest_alternative: 'Preferir alternativas que não dependam de eliminação urinária imediata.',
      },
    },
    {
      key: 'ketamine_any_hepato_nephro_severe',
      level: 'MONITOR',
      title: 'Hepato/nefropatia grave: evitar ou usar dose mínima',
      why: 'Guia rápido sugere evitar em nefro/hepato graves; recuperação pode ser imprevisível.',
      action: ['Preferir alternativa quando possível.', 'Se usar, dose mínima e monitorização intensiva.'],
      dose_adjustment: {
        reduce_percent: 30,
        avoid_bolus: true,
        require_monitoring: ['PA', 'SpO2', 'temperatura', 'qualidade de recuperação'],
      },
    },
  ],

  // Seção 11: Presets
  presets: [
    {
      id: 'cri_analgesia_low',
      label: 'CRI dissociação/analgesia (início) 🟩',
      dose_mgkgh: 0.6,
      limits: { min: 0.6, max: 1.0 },
      clinical_target: 'Infusão contínua para dissociação e analgesia adjuvante. Dissociação, inibidor NMDA.',
      linked_alerts: ['ketamine_any_hypertension_cardiac', 'ketamine_any_pic', 'ketamine_cat_uo_uroabdomen'],
    },
    {
      id: 'cri_analgesia_typical',
      label: 'CRI dissociação/analgesia (típica) 🟨',
      dose_mgkgh: 1.2,
      limits: { min: 1.0, max: 1.5 },
      clinical_target: 'Infusão contínua para dissociação e analgesia. Dissociação, inibidor NMDA.',
      linked_alerts: ['ketamine_any_hypertension_cardiac', 'ketamine_any_pic', 'ketamine_cat_uo_uroabdomen'],
    },
    {
      id: 'cri_analgesia_high',
      label: 'CRI dissociação/analgesia (alta) 🟧',
      dose_mgkgh: 1.8,
      limits: { min: 1.5, max: 1.8 },
      clinical_target: 'Infusão contínua em faixa alta. Dissociação, inibidor NMDA. Monitorar efeitos adversos.',
      linked_alerts: ['ketamine_any_hypertension_cardiac', 'ketamine_any_pic', 'ketamine_cat_uo_uroabdomen'],
    },
    {
      id: 'bolus_dissociation',
      label: 'Bolus dissociação (IM/IV) 🟨',
      dose_mgkg: 5,
      limits: { min: 2, max: 7 },
      clinical_target: 'Dissociação, inibidor NMDA. Cães: 2-7 mg/kg; Gatos: 2-7,5 mg/kg.',
      linked_alerts: ['ketamine_any_hypertension_cardiac', 'ketamine_any_pic', 'ketamine_any_glaucoma'],
    },
  ],

  // Seção 12: Templates de Cálculo
  calculation_templates: {
    cri: {
      required_inputs: ['weight_kg', 'dose_mgkgh', 'final_concentration_mg_ml'],
      algorithm: ['Dose total (mg/h) = dose_mgkgh × weight_kg', 'Taxa (mL/h) = dose_total_mg_h ÷ final_concentration_mg_ml'],
      conversions: ['Se necessário: mg/kg/h → mg/h (multiplica pelo peso)', 'Se solução em mg/mL: taxa mL/h = mg/h ÷ mg/mL'],
      hard_safety_checks: [
        {
          if: "has_comorbidity('pic_elevated')",
          then: 'BLOCK',
          message: 'Risco de PIC elevada: evitar cetamina.',
        },
        {
          if: "species == 'cat' && (has_comorbidity('urethral_obstruction') || has_comorbidity('uroabdomen'))",
          then: 'WARN',
          message: 'Gato com obstrução/uroabdome: cetamina pode prolongar sedação; prefira evitar.',
        },
      ],
      soft_safety_checks: [
        {
          if: "has_comorbidity('hypertension') || has_comorbidity('cardiac_disease')",
          then: 'WARN',
          message: 'Cardiopata/hipertenso: reduzir 25–50% e monitorar PA/ECG.',
        },
        {
          if: 'dose_mgkgh > 1.8',
          then: 'WARN',
          message: 'Dose acima da faixa recomendada de CRI (1.8 mg/kg/h) aumenta risco de EA e recuperação ruim.',
        },
      ],
      outputs: ['dose_total_mg_h', 'rate_ml_h'],
      error_cost: 'Superdose pode causar disforia grave, hipertensão/taquicardia e depressão respiratória (em associação).',
    },
    bolus: {
      required_inputs: ['weight_kg', 'dose_mgkg', 'drug_concentration_mg_ml'],
      algorithm: ['Dose total (mg) = dose_mgkg × weight_kg', 'Volume (mL) = dose_total_mg ÷ drug_concentration_mg_ml'],
      hard_safety_checks: [
        {
          if: "has_comorbidity('pic_elevated')",
          then: 'BLOCK',
          message: 'Risco de PIC elevada: evitar cetamina.',
        },
      ],
      soft_safety_checks: [
        {
          if: "species == 'cat' && (has_comorbidity('urethral_obstruction') || has_comorbidity('uroabdomen'))",
          then: 'WARN',
          message: 'Gato com obstrução/uroabdome: risco de sedação prolongada.',
        },
        {
          if: "has_comorbidity('cardiac_disease') || has_comorbidity('hypertension')",
          then: 'WARN',
          message: 'Cardiopatia/hipertensão: reduzir dose e evitar bolus altos.',
        },
      ],
      outputs: ['dose_total_mg', 'volume_ml'],
      error_cost: 'Erro de 10× com frasco 100 mg/mL é plausível e perigoso (EA cardiovasculares/recuperação ruim).',
    },
    dilution_builder: {
      required_inputs: ['stock_concentration_mg_ml', 'stock_volume_ml', 'diluent_volume_ml'],
      algorithm: [
        'Total (mg) = stock_concentration_mg_ml × stock_volume_ml',
        'Volume final (mL) = stock_volume_ml + diluent_volume_ml',
        'Concentração final (mg/mL) = total_mg ÷ volume_final_ml',
      ],
      hard_safety_checks: [
        {
          if: 'stock_concentration_mg_ml >= 100 && diluent_volume_ml == 0',
          then: 'WARN',
          message: 'Usar 100 mg/mL sem diluição aumenta risco de erro (especialmente em CRI e pequenos pacientes).',
        },
      ],
      soft_safety_checks: [
        {
          if: 'final_concentration_mg_ml < 0.5 || final_concentration_mg_ml > 5',
          then: 'INFO',
          message: 'Faixa prática comum para CRI costuma ficar ~1–2 mg/mL (ajuste para facilitar taxa e reduzir erro).',
        },
      ],
      outputs: ['final_concentration_mg_ml', 'final_volume_ml'],
      error_cost: 'Concentração errada altera diretamente taxa calculada → subdose (dor) ou overdose (EA).',
    },
  },

  // Seção 13: Bloco Didático
  how_we_got_here_block: {
    title: 'Como chegamos a este resultado (Cetamina CRI)',
    render_steps: [
      {
        step: 1,
        label: 'Converter dose em mg por hora',
        formula: 'mg/h = (mg/kg/h) × peso(kg)',
      },
      {
        step: 2,
        label: 'Converter mg/h em mL/h',
        formula: 'mL/h = (mg/h) ÷ concentração(mg/mL)',
      },
    ],
    interpretation_rules: [
      'Cetamina para analgesia é adjuvante: quase sempre combine com opioide ± benzodiazepínico.',
      'Se aparecer disforia/recuperação ruim, reduza dose e reforce associação; ambiente calmo ajuda.',
      'Em cardiopatas/hipertensos, use a menor dose eficaz (simpaticomimético dose-dependente).',
    ],
    example: {
      scenario: 'Cão 20 kg, CRI 1.2 mg/kg/h, solução 1 mg/mL',
      calculation: ['mg/h = 1.2 × 20 = 24 mg/h', 'mL/h = 24 ÷ 1 = 24 mL/h'],
      result: 'Programar bomba em 24 mL/h; reavaliar dor/PA/FC a cada 15–30 min e ajustar.',
    },
  },

  // Seção 14: Integrações
  protocol_integrations: {
    enabled: true,
    protocols: ['MLK', 'sedacao_im', 'coinducao', 'analgesia_multimodal'],
    why_combo_exists:
      'A cetamina reduz sensibilização central (NMDA) e é frequentemente usada em associação (opioide/benzodiazepínico; e em MLK com morfina + lidocaína) para potencializar analgesia e reduzir necessidade de outros agentes.',
    rules: [
      {
        if: "has_comorbidity('pic_elevated')",
        then: {
          action: 'REMOVE_DRUG',
          drug_id: 'cetamina',
          message: 'Risco de PIC elevada: evitar cetamina.',
        },
      },
      {
        if: "species == 'cat' && (has_comorbidity('urethral_obstruction') || has_comorbidity('uroabdomen'))",
        then: {
          action: 'PREFER_ALTERNATIVE',
          drug_id: 'cetamina',
          message: 'Gato com obstrução/uroabdome: risco de sedação prolongada; prefira alternativa.',
        },
      },
      {
        if: "has_comorbidity('cardiac_disease') || has_comorbidity('hypertension')",
        then: {
          action: 'REDUCE_DOSE',
          drug_id: 'cetamina',
          factor: 0.6,
          message: 'Cardiopatia/hipertensão: reduzir dose (simpaticomimético dose-dependente) e monitorar PA/ECG.',
        },
      },
    ],
  },

  // Seção 15: Fluxogramas
  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'ketamine_analgesia_cri',
        title: 'Cetamina como adjuvante analgésico (CRI) — decisão prática',
        mermaid:
          'flowchart TD\nA[Paciente com dor moderada-intensa / hiperalgesia] --> B{Risco de PIC elevada?}\nB -- Sim --> C[EVITAR cetamina (BLOCK) -> usar multimodal sem NMDA]\nB -- Não --> D{Cardiopatia/hipertensão significativa?}\nD -- Sim --> E[Iniciar dose 25-50% menor + PA/ECG]\nD -- Não --> F[Iniciar CRI 0.12 mg/kg/h]\nE --> G[Reavaliar dor/PA/FC em 15-30 min]\nF --> G\nG --> H{Analgesia adequada?}\nH -- Sim --> I[Manter dose + monitorar]\nH -- Não --> J[Escalonar 0.12 -> 0.3 -> 0.6 mg/kg/h]\nJ --> K{EA: disforia/HTN/taquicardia/hipoventilacao?}\nK -- Sim --> L[Reduzir/cessar + reforcar opioide/BDZ e suporte]\nK -- Não --> G',
      },
      {
        id: 'ketamine_cat_urinary',
        title: 'Gato com obstrução uretral/uroabdome — alerta de sedação prolongada',
        mermaid:
          'flowchart TD\nA[Gato com sedacao planejada] --> B{Obstrucao uretral ou uroabdome?}\nB -- Sim --> C[Preferir evitar cetamina (CRITICAL)]\nC --> D[Escolher alternativa + priorizar desobstrucao/drenagem]\nB -- Não --> E[Se usar cetamina: sempre em combo + monitorar recuperacao]',
      },
    ],
  },

  // Seção 16: UI Copy
  ui_copy: {
    critical_warning_banner:
      'Nunca use cetamina isolada para sedação: combine com opioide ± benzodiazepínico e reduza dose em cardiopatas/hipertensos; evite se houver risco de PIC elevada.',
    alert_messages: {
      short: 'Cautela: simpaticomimético e pode causar disforia — use em combo e monitore PA/FC.',
      long: 'Cetamina (NMDA) ajuda na analgesia anti-wind-up, mas é simpaticomimética (dose-dependente) e pode aumentar PIO/PIC em contextos específicos; em gatos com obstrução/uroabdome pode prolongar sedação. Prefira combinação com opioide ± benzodiazepínico e titule pela resposta.',
    },
    block_message: 'Uso bloqueado: risco de PIC elevada (TCE etc.) — evitar cetamina.',
    common_errors: [
      'Usar cetamina sozinha → recuperação agitada/disforia.',
      'Esquecer que frasco 100 mg/mL facilita erro de 10× em pequenos pacientes/CRI.',
      'Usar dose padrão em cardiopata/hipertenso → taquicardia/hipertensão.',
      'Usar em gato com obstrução/uroabdome → sedação prolongada.',
    ],
  },

  // Seção 17: Referências
  references: [
    {
      section: 'mechanism/contraindications/species_notes (PIC, PIO, cardiopatia/hipertensão, obstrução urinária em gatos, MLK)',
      source: 'Textbook of Small Animal Emergency Medicine (Wiley Blackwell) — seção de sedação/analgesia e indução (Ketamine: NMDA, simpatomimético dose-dependente, PIC/PIO, excreção urinária em gatos, MLK)',
      page: 'PDF p.1260',
      edition: '1',
    },
    {
      section: 'doses.cri (exemplo de CRI 0.6 mg/kg/h) e protocolos associados',
      source: 'Textbook of Small Animal Emergency Medicine (Wiley Blackwell) — protocolos/estudos citando Ketamine CRI 0.6 mg/kg/h',
      page: 'PDF p.1264–1265',
      edition: '1',
    },
    {
      section: 'presentations/protocols (ketamine 100 mg/mL; combinações DKB/TKX e receitas)',
      source: 'Veterinary Anesthesia and Analgesia (Lumb & Jones), 6th ed. — protocolos com Ketamine (100 mg/mL) e combinações (DKB/TKX)',
      page: 'PDF p.1061',
      edition: '6',
      year: 2024,
    },
    {
      section: 'doses (exemplo IV em gatos para ecocardiografia) e efeito em FC',
      source: 'Nelson & Couto (6ª ed.) — sedação para eco (acepromazina seguida de ketamine 2 mg/kg IV ou 5–10 mg/gato IV; pode ↑ FC)',
      page: 'PDF p.50',
      edition: '6',
    },
    {
      section: 'quick_doses (dose analgésica IM/SC/VO e duração 4–6 h; evitar em nefro/hepato/cardiopatas graves; recuperação possivelmente agitada)',
      source: 'Guia Prático de Sedação e Analgesia na Rotina de Cães e Gatos (2023) — guia rápido de analgésicos (Cetamina 0,1–1,0 IM/SC/VO; 4–6 h; notas de cautela)',
      page: 'PDF p.52',
      edition: '2023',
    },
    {
      section: 'sedation_choices (IM/IV doses práticas cães e gatos em combos; notas de "no ketamine" em sopro cardíaco felino)',
      source: 'Ultimate Veterinary Notes Bundle — tabelas de escolhas de sedação canina e felina (inclui doses IM/IV e recomendações de cautela)',
      page: 'PDF p.82–83',
      edition: 'bundle',
    },
  ],
}
