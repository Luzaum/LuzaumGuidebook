import type { DrugProfile } from '../../types/drugProfile'

export const remifentanilProfile: DrugProfile = {
  // Seção 1: Identidade
  drug_id: 'remifentanil',
  name_pt: 'Remifentanil (cloridrato de remifentanil)',
  name_en: 'Remifentanil (remifentanil hydrochloride)',
  synonyms: ['Remifentanil', 'Remifentanil HCl', 'Ultiva (varia por país/mercado)'],
  class: ['Opioide agonista μ (mu) ultracurto', 'Fenilpiperidina (opioide sintético)', 'Analgésico intraoperatório por CRI (context-insensitive)', 'Anestésico-sparing (reduz necessidade de inalantes)'],

  // Seção 2: Perfil Farmacológico
  core_concepts: {
    taglines: [
      'Opioide μ ultracurto: efeito some em minutos após parar a CRI (context-insensitive).',
      "Metabolismo por esterases inespecíficas em sangue/tecidos → vantagem em hepatopatas/renopatas.",
      "Não costuma precisar de dose de ataque: atinge níveis plasmáticos em poucos minutos de infusão.",
      'Evitar bolus/ataque IV: pode causar bradicardia severa até parada atrial (standstill).',
    ],
    mechanism: {
      receptors_targets: ['Receptor μ-opioide (principal)'],
      primary_effects: {
        cardiovascular:
          'Pode causar bradicardia dose-dependente; bolus/ataque IV aumenta risco de bradicardia severa. Em comparação com fentanyl, hipotensão pode ser mais comum em alguns cenários.',
        respiratory: 'Depressão respiratória dose-dependente (especialmente em anestesia/associação com outros depressores).',
        cns:
          'Analgesia potente e muito titulável; rápida recuperação após cessar CRI facilita avaliação neurológica precoce e pode reduzir disforia cumulativa.',
        renal_hepatic:
          'Depuração alta e metabolismo por esterases inespecíficas → pouca dependência de função hepática/renal (ainda assim, titular por efeito e monitorização).',
        gi: 'Efeitos típicos de opioides (motilidade reduzida/constipação) são menos relevantes no intraop imediato; foco clínico é ventilação e hemodinâmica.',
      },
      clinical_metaphor:
        '"Controle remoto com botão de desligar instantâneo": enquanto a CRI está ligada, você controla a dor; quando desliga, a analgesia some rápido — então a "ponte" analgésica precisa estar pronta.',
    },
    pharmacodynamics: {
      onset_iv: 'muito rápido (plasma/efeito em poucos minutos após iniciar CRI)',
      onset_im: 'não é via de rotina para remifentanil (uso típico: IV em CRI)',
      peak: 'poucos minutos após iniciar/ajustar a CRI',
      duration: 'muito curta; recuperação rápida após interromper (context-sensitive half-time <5 min descrita)',
      dependencies: [
        'Velocidade e dose da CRI (depressão respiratória/bradicardia)',
        'Uso concomitante de inalantes/hipnóticos/α2 (potencializa depressão)',
        'Ausência de analgesia de transição (rebote de dor ao parar)',
      ],
    },
    pharmacokinetics: {
      metabolism: 'Hidrólise por esterases inespecíficas no sangue e nos tecidos (característica PK chave).',
      excretion: 'Eliminação final via metabólitos; clinicamente, a depuração alta explica meia-vida terminal e duração curtas.',
      dog_vs_cat:
        'Em gatos, pode haver necessidade de taxas relativamente maiores para analgesia adequada em alguns modelos/estímulos nociceptivos; em cães a CRI é amplamente titulável e a recuperação é rápida em ambas as espécies.',
      active_metabolites: 'Metabólitos sem relevância clínica para manutenção do efeito (efeito depende da infusão contínua).',
      accumulation:
        'Sem efeitos cumulativos relevantes mesmo após infusões prolongadas (vantagem clínica: menor disforia "cumulativa" e despertar mais previsível).',
    },
  },

  species_notes: {
    dogs: {
      key_point:
        'Ótimo para analgesia intraoperatória titulável e para reduzir inalante; planejar analgesia de transição antes de desligar CRI.',
      high_risk_notes: [
        'Evitar dose de ataque/bolus IV: risco de bradicardia severa até parada atrial.',
        'Depressão respiratória em associação com inalantes/hipnóticos — exige monitorização ventilatória.',
        "Como a analgesia some rápido, rebote de dor é comum se não houver 'ponte' (opioide de maior duração, bloqueio local/regional, AINE quando possível).",
      ],
      metabolism_excretion: 'Metabolismo por esterases inespecíficas em sangue/tecidos; pouca dependência de fígado/rim (vantagem em pacientes críticos).',
    },
    cats: {
      key_point:
        'Boa opção em paciente crítico quando se quer controle fino e despertar rápido; atenção para possível necessidade de doses maiores e para transição analgésica.',
      high_risk_notes: [
        "Evitar dose de ataque IV (mesmo racional: bradicardia severa).",
        'Depressão respiratória/hipoventilação com associações — monitorização é crítica.',
        'Analgesia pós-CRI é muito breve: planejar transição antes de interromper.',
      ],
      metabolism_excretion: 'Metabolismo por esterases inespecíficas; útil em hepatopatas/renopatas (ainda titular por efeito).',
    },
  },

  // Seção 3: Indicações e Contraindicações
  indications: {
    primary: [
      'Analgesia intraoperatória por CRI (dor moderada a intensa), especialmente quando se deseja despertar rápido e previsível.',
      'Anestesia-sparing: reduzir necessidade de anestésicos inalantes em cães e gatos críticos.',
      'Situações em que se prevê necessidade de avaliação neurológica precoce no pós-operatório (despertar rápido).',
    ],
    secondary: [
      'Alternativa quando se quer menor risco de acúmulo (em comparação a opioides de maior duração) durante procedimentos longos.',
      'Uso em pacientes com disfunção hepática/renal, quando se quer droga com metabolismo pouco dependente desses órgãos (ainda com monitorização intensiva).',
    ],
  },

  contraindications: {
    absolute: [
      {
        condition: 'Planejamento de dose de ataque/bolus IV de remifentanil',
        why: 'Dose de ataque IV pode causar bradicardia severa até parada atrial e não é necessária, pois o pico plasmático ocorre em poucos minutos de infusão.',
        level: 'CRITICAL',
      },
    ],
    relative: [
      {
        condition: 'Ausência de capacidade de monitorar e intervir na ventilação (SpO2/EtCO2; oxigênio/ventilação assistida)',
        why: 'Depressão respiratória é dose-dependente e potencializada por anestésicos/associações.',
        level: 'WARNING',
      },
      {
        condition: 'Bradicardia significativa / distúrbios de condução',
        why: 'Remifentanil pode reduzir FC; risco maior com bolus e associações.',
        level: 'WARNING',
      },
      {
        condition: 'Hipovolemia/hipotensão não corrigida',
        why: 'Opioides + anestesia podem piorar hipotensão; titular com monitorização hemodinâmica e tratar causa base.',
        level: 'MONITOR',
      },
    ],
  },

  // Seção 4: Doses
  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      bolus: {
        mgkg: { min: 0, max: 0, note: 'Não recomendado (evitar dose de ataque/bolus IV).' },
        mcgkg: { min: 0, max: 0, note: 'Evitar bolus/ataque IV.' },
        ukg: { min: 0, max: 0, note: 'Evitar bolus/ataque IV.' },
        route: 'IV',
        loading_dose: { min: 0, max: 0 },
      },
      cri: {
        mcgkgmin: {
          min: 0.1,
          max: 0.2,
          note: 'Equivale a 6–12 µg/kg/h (faixa sugerida; pode aumentar para maior anestesia-sparing/analgesia conforme resposta e monitorização).',
        },
        mgkgh: {
          min: 0.006,
          max: 0.012,
          note: 'Conversão de 0.1–0.2 mcg/kg/min → mg/kg/h (×0.06 ÷1000).',
        },
        titration: {
          increment: 'Titular em passos pequenos (ex.: +0.02–0.05 mcg/kg/min) conforme dor/necessidade anestésica e ventilação.',
          interval: 'Reavaliar em 5–10 min após ajuste (analgesia, FC/PA, EtCO2/SpO2).',
        },
        max: 0.5,
      },
      adjustments: {
        obesity: 'Preferir peso ideal/magro para iniciar e titular ao efeito (reduz risco ventilatório).',
        shock: 'Titular com cautela; tratar volume/causa; monitorar PA e perfusão.',
        hypoalbuminemia: 'Menos determinante que em drogas muito proteína-ligadas; ainda assim, iniciar conservador e titular.',
        comorbidities:
          'Hepatopatia/DRC: geralmente favorável (esterases), mas manter monitorização; cardiopatas/bradicárdicos: iniciar mais baixo e evitar qualquer bolus.',
      },
      therapeutic_targets: {
        target_map: 'N/A',
        target_etco2: 'Manter normocapnia (ou alvo institucional) e evitar hipoventilação; EtCO2 é marcador-chave durante CRI.',
        analgesia_scale: 'Queda objetiva na escala de dor e menor resposta autonômica à nocicepção.',
        sedation_target: 'N/A (uso típico intraoperatório; foco é analgesia e estabilidade).',
      },
    },
    cat: {
      bolus: {
        mgkg: { min: 0, max: 0, note: 'Não recomendado (evitar dose de ataque/bolus IV).' },
        mcgkg: { min: 0, max: 0, note: 'Evitar bolus/ataque IV.' },
        ukg: { min: 0, max: 0, note: 'Evitar bolus/ataque IV.' },
        route: 'IV',
        loading_dose: { min: 0, max: 0 },
      },
      cri: {
        mcgkgmin: {
          min: 0.067,
          max: 0.1,
          note: 'Equivale a 4–6 µg/kg/h (faixa sugerida; pode aumentar para maior anestesia-sparing/analgesia conforme resposta e monitorização).',
        },
        mgkgh: {
          min: 0.004,
          max: 0.006,
          note: 'Conversão de 0.067–0.1 mcg/kg/min → mg/kg/h (×0.06 ÷1000).',
        },
        titration: {
          increment: 'Titular em passos pequenos (ex.: +0.01–0.02 mcg/kg/min) conforme resposta e ventilação.',
          interval: 'Reavaliar em 5–10 min após ajuste.',
        },
        max: 0.3,
      },
      adjustments: {
        obesity: 'Preferir peso ideal para iniciar e titular.',
        shock: 'Titular conservador; tratar causa/volume; monitoração intensiva.',
        hypoalbuminemia: 'Sem ajuste fixo; titular ao efeito.',
        comorbidities:
          'Hepatopatia/DRC: geralmente favorável (esterases), mas manter monitorização; bradicardia/cardiopatia: iniciar mais baixo e evitar bolus.',
      },
      therapeutic_targets: {
        target_map: 'N/A',
        target_etco2: 'Evitar hipoventilação/hipercapnia (EtCO2 recomendado).',
        analgesia_scale: 'Analgesia objetiva sem comprometer ventilação.',
        sedation_target: 'N/A',
      },
    },
  },

  // Seção 5: Apresentações
  presentations: [
    {
      label: 'Pó liofilizado para reconstituição (frasco-ampola; teor em mg varia por fabricante)',
      examples: ['Ultiva (varia por país/mercado)', 'genéricos (varia por país/mercado)'],
      concentration_trap_warning: 'Sempre rotular após reconstituição (mcg/mL) e descartar conforme janela de estabilidade do serviço.',
    },
  ],

  // Seção 6: Diluição
  dilution_and_preparation: {
    hard_rules: [
      'Evitar dose de ataque/bolus IV (risco de bradicardia severa até parada atrial).',
      'Uso típico é CRI titulada; o efeito é muito curto — planejar transição analgésica antes de interromper.',
      'Reconstituir/diluir conforme protocolo e rotular com mcg/mL; dupla checagem obrigatória.',
    ],
    recommended_targets: [
      {
        target_mg_ml: 0.05,
        use_cases: ['CRI em bomba de seringa (concentração prática)', 'Pacientes pequenos/médios'],
        how_to_make: 'Exemplo didático: escolher um alvo em mcg/mL que gere taxas em mL/h práticas e minimize erro.',
        recipe: 'Preparar solução final 50 mcg/mL (0,05 mg/mL) ajustando volume final conforme o total (mcg) disponível após reconstituição.',
      },
      {
        target_mg_ml: 0.02,
        use_cases: ['CRI com necessidade de maior precisão em pacientes muito pequenos'],
        how_to_make: 'Concentração mais baixa reduz risco de "microbolus" por erro de bomba/linha.',
        recipe: 'Preparar solução final 20 mcg/mL (0,02 mg/mL) ajustando volume final conforme o total (mcg) disponível.',
      },
    ],
    diluents_allowed: ['NaCl 0,9%', 'Glicose 5% (D5W)'],
    preferred_diluent: {
      diluent: 'NaCl 0,9%',
      why: 'Padronização e compatibilidade prática para CRI; também há uso descrito com glicose 5%.',
    },
    stability: [
      {
        diluent: 'NaCl 0,9% ou Glicose 5% (conforme reconstituição/diluição)',
        max_time_hours: 24,
        light_protection: false,
        syringe_bag_change: 'Após reconstituição, descartar em 24 h (ou conforme protocolo institucional).',
      },
    ],
    dedicated_line_required: false,
    dedicated_line_why: 'Recomendável em anestesia/UTI com múltiplas infusões, mas não mandatária se compatibilidade e flush forem garantidos.',
  },

  // Seção 7: Compatibilidade
  compatibility: {
    diluents_allowed: ['NaCl 0,9%', 'Glicose 5% (D5W)'],
    diluents_ok: ['NaCl 0,9%', 'D5W'],
    diluentsAllowed: ['NaCl 0,9%', 'D5W'],
    diluents: ['NaCl 0,9%', 'D5W'],
    compatible_in_syringe_or_bag: ['Preferir administrar como infusão dedicada quando possível (segurança e redução de erros).'],
    compatible_y_site_only: ['Se necessário, Y-site apenas com validação do serviço + flush e observação de turvação/precipitação.'],
    incompatible: [
      {
        agent: 'Misturas múltiplas não validadas na mesma seringa/bolsa',
        why: 'Risco de incompatibilidade físico-química e erro de dose; padronizar protocolo do hospital.',
        risk: 'precipitação',
      },
    ],
    avoid_same_syringe_or_precipitation_risk: ['Evitar misturar com qualquer fármaco sem compatibilidade confirmada pelo serviço.'],
    dedicated_line_rules: [
      'Preferir um lúmen/linha para CRI opioide quando múltiplos CRIs simultâneos.',
      'Se via compartilhada: flush antes/depois e checar resposta clínica após manipulações.',
    ],
  },

  // Seção 8: Administração e Titulação
  administration_and_titration: {
    bolus_guidance: ['Evitar bolus/dose de ataque IV.', 'Iniciar CRI e titular; atinge concentração plasmática em poucos minutos.'],
    titration_rules: [
      'Iniciar em faixa baixa e titular conforme necessidade (dor/estímulo cirúrgico e anestesia-sparing), sempre com foco em ventilação e FC.',
      "Planejar 'ponte' analgésica (opioide de maior duração, bloqueio local/regional, AINE quando possível) antes de desligar a CRI, pois o efeito some muito rápido.",
    ],
    monitoring_minimum: ['ECG/FC (bradicardia)', 'PA', 'SpO2', 'EtCO2 (ideal; remifentanil pode reduzir ventilação)', 'Temperatura'],
    endpoints: {
      desired_effect: ['Analgesia intraoperatória adequada (menor resposta autonômica ao estímulo)', 'Redução de inalante/hipnótico mantendo estabilidade'],
      toxicity_signs: ['Bradicardia significativa', 'Hipotensão', 'Hipoventilação/hipercapnia (EtCO2 subindo) ou apneia'],
    },
    therapeutic_failure: {
      check_first: [
        'Concentração (mcg/mL) e programação da bomba (mL/h)',
        'Linha e permeabilidade',
        'Profundidade anestésica e necessidade de multimodal (bloqueio local/ketamina/lidocaína em cães, etc.)',
      ],
      common_causes: ['Subdose relativa por estímulo cirúrgico intenso', 'Interrupções/bolsa vazia/erro de preparo'],
      when_to_change: [
        'Se ventilação/hemodinâmica limitam escalada, reduzir remifentanil e reforçar analgesia com alternativa (regional/multimodal).',
        'Se necessidade persistente muito alta, reavaliar plano anestésico global (hipnótico/inalante/analgesia regional).',
      ],
    },
  },

  // Seção 9: Efeitos Adversos
  adverse_effects_and_toxicity: {
    common: ['Bradicardia', 'Depressão respiratória (dose-dependente)', 'Hipotensão (dependendo do contexto anestésico e associações)'],
    serious: [
      'Bradicardia severa até parada atrial (standstill), especialmente com bolus/dose de ataque IV',
      'Apneia/hipoventilação importante',
    ],
    subdose_signs: ['Resposta autonômica ao estímulo (↑ FC/PA) e sinais de nocicepção', 'Necessidade de elevar muito inalante/hipnótico'],
    overdose_signs: ['Bradicardia marcada', 'Hipoventilação/apneia e hipercapnia', 'Hipotensão'],
    management: [
      'Reduzir/cessar CRI e reavaliar ventilação (oxigênio/ventilação assistida se necessário).',
      'Tratar bradicardia/hipotensão conforme quadro hemodinâmico e protocolo do serviço.',
      'Garantir analgesia de transição para evitar rebote de dor quando a CRI é interrompida.',
    ],
    special_events: [
      {
        event: 'bradicardia severa após bolus/ataque IV',
        management: 'Suspender administração, suporte hemodinâmico e seguir protocolo de bradicardia do serviço; evitar repetir bolus.',
      },
      {
        event: 'rebote de dor ao parar CRI',
        management: 'Implementar ponte analgésica antes da interrupção (opioide de maior duração, bloqueios locais/regionais, AINE quando indicado).',
      },
    ],
  },

  // Seção 10: Alertas por Comorbidade
  alerts_by_comorbidity: [
    {
      key: 'remi_bolus_iv_block',
      level: 'BLOCK',
      title: 'Bloquear dose de ataque/bolus IV de remifentanil',
      why: 'Pode causar bradicardia severa até parada atrial e não é necessária, pois o pico plasmático ocorre em poucos minutos de CRI.',
      action: ['Iniciar CRI sem bolus.', 'Titular por efeito em 5–10 min.'],
      dose_adjustment: { avoid_bolus: true },
    },
    {
      key: 'remi_resp_disease',
      level: 'WARNING',
      title: 'Doença respiratória/hipoventilação: risco alto',
      why: 'Depressão respiratória é dose-dependente e potencializada por anestésicos/associações.',
      action: ['Exigir SpO2 e preferir EtCO2.', 'Iniciar dose mais baixa e titular lentamente.', 'Oxigênio e ventilação assistida disponíveis.'],
      dose_adjustment: {
        reduce_percent: 25,
        avoid_bolus: true,
        require_monitoring: ['SpO2', 'EtCO2', 'FR/esforço'],
      },
    },
    {
      key: 'remi_hepatic_renal',
      level: 'SAFE',
      title: 'Hepatopatia/DRC: opção favorável (esterases)',
      why: 'Metabolismo por esterases inespecíficas em sangue/tecidos é uma vantagem em doença hepática/renal.',
      action: [
        'Ainda assim, titular por efeito e monitorar hemodinâmica/ventilação.',
        'Planejar ponte analgésica ao desligar CRI.',
      ],
    },
    {
      key: 'remi_bradyarrhythmia',
      level: 'WARNING',
      title: 'Bradicardia/condutopatias: monitorização obrigatória',
      why: 'Remifentanil pode reduzir FC; risco maior com anestesia profunda e associações.',
      action: ['ECG contínuo e PA.', 'Evitar qualquer bolus/ataque.', 'Titulação conservadora.'],
      dose_adjustment: { reduce_percent: 20, avoid_bolus: true, require_monitoring: ['ECG contínuo', 'PA', 'EtCO2'] },
    },
  ],

  // Seção 11: Presets
  presets: [
    {
      id: 'intraop_standard_dog',
      label: 'Intraoperatório cão (padrão) 🟧',
      dose_mcgkgmin: 0.1,
      limits: { min: 0.05, max: 0.2 },
      clinical_target: 'Analgesia intraop e anestesia-sparing com titulação fina; sem bolus.',
      linked_alerts: ['remi_bolus_iv_block', 'remi_resp_disease'],
    },
    {
      id: 'intraop_standard_cat',
      label: 'Intraoperatório gato (padrão) 🟧',
      dose_mcgkgmin: 0.067,
      limits: { min: 0.05, max: 0.1 },
      clinical_target: 'Analgesia intraop titulável; planejar transição antes de parar.',
      linked_alerts: ['remi_bolus_iv_block', 'remi_resp_disease'],
    },
    {
      id: 'bridge_required',
      label: 'Alerta: exigir ponte analgésica 🟨',
      dose_mcgkgmin: 0.0,
      limits: { min: 0.0, max: 0.0 },
      clinical_target: 'Ao interromper, analgesia some rápido — garantir opioide de maior duração/bloqueio regional/AINE quando possível.',
      linked_alerts: [],
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
      conversions: ['mcg/kg/h → mcg/kg/min: dividir por 60.', 'mg/mL → mcg/mL: multiplicar por 1000.'],
      hard_safety_checks: [
        {
          if: 'use_bolus == true',
          then: 'BLOCK',
          message: 'Remifentanil: bloquear bolus/dose de ataque IV (risco de bradicardia severa até parada atrial).',
        },
        {
          if: 'final_concentration_mcg_ml <= 0',
          then: 'BLOCK',
          message: 'Concentração inválida (mcg/mL).',
        },
      ],
      soft_safety_checks: [
        {
          if: 'dose_mcgkgmin > 0.2',
          then: 'WARN',
          message: 'Acima da faixa sugerida inicial: aumenta risco de depressão respiratória/bradicardia; exigir EtCO2/ECG e titulação cautelosa.',
        },
        {
          if: "has_comorbidity('respiratory_disease')",
          then: 'WARN',
          message: 'Doença respiratória: reduzir dose inicial e monitorar EtCO2/SpO2.',
        },
      ],
      outputs: ['dose_total_mcg_min', 'dose_total_mcg_h', 'rate_ml_h'],
      error_cost: 'Superdose pode causar apneia/bradicardia severa; subdose mantém nocicepção e aumenta necessidade de inalante/hipnótico.',
    },
    bolus: {
      required_inputs: [],
      algorithm: ['Remifentanil: bolus/dose de ataque IV não recomendado. Use CRI titulada.'],
      hard_safety_checks: [
        {
          if: 'true',
          then: 'BLOCK',
          message: 'Bloqueado: remifentanil não deve ser administrado como bolus/dose de ataque IV.',
        },
      ],
      soft_safety_checks: [],
      outputs: [],
      error_cost: 'Bolus/ataque IV aumenta risco de bradicardia severa e instabilidade.',
    },
    dilution_builder: {
      required_inputs: ['total_drug_mcg_available', 'final_volume_ml'],
      algorithm: ['Concentração final (mcg/mL) = total_drug_mcg_available ÷ final_volume_ml'],
      hard_safety_checks: [
        {
          if: 'final_volume_ml <= 0 || total_drug_mcg_available <= 0',
          then: 'BLOCK',
          message: 'Valores inválidos para preparo.',
        },
      ],
      soft_safety_checks: [
        {
          if: 'final_concentration_mcg_ml > 100',
          then: 'WARN',
          message: 'Concentração alta aumenta risco de erro; rotular e dupla checagem obrigatórias.',
        },
      ],
      outputs: ['final_concentration_mcg_ml'],
      error_cost: 'Concentração errada altera diretamente a taxa (mL/h) e o risco de sobre/subdose.',
    },
  },

  // Seção 13: Bloco Didático
  how_we_got_here_block: {
    title: 'Como chegamos a este resultado (Remifentanil CRI)',
    render_steps: [
      {
        step: 1,
        label: 'Dose por minuto',
        formula: 'mcg/min = (mcg/kg/min) × peso(kg)',
      },
      {
        step: 2,
        label: 'Converter para hora',
        formula: 'mcg/h = (mcg/min) × 60',
      },
      {
        step: 3,
        label: 'Converter para taxa',
        formula: 'mL/h = (mcg/h) ÷ concentração(mcg/mL)',
      },
    ],
    interpretation_rules: [
      "Remifentanil 'desliga' rápido: sempre planejar ponte analgésica antes de parar a CRI.",
      'Evitar bolus/ataque IV: risco de bradicardia severa e não é necessário.',
      'Limite clínico é ventilação/FC: EtCO2 e ECG são os monitores mais úteis.',
    ],
    example: {
      scenario: 'Cão 20 kg, 0,1 mcg/kg/min, solução 50 mcg/mL',
      calculation: ['mcg/min = 0,1 × 20 = 2 mcg/min', 'mcg/h = 2 × 60 = 120 mcg/h', 'mL/h = 120 ÷ 50 = 2,4 mL/h'],
      result: 'Programar 2,4 mL/h e reavaliar em 5–10 min (dor/estímulo, EtCO2/SpO2, FC/PA).',
    },
  },

  // Seção 14: Integrações
  protocol_integrations: {
    enabled: true,
    protocols: ['analgesia_multimodal', 'anestesia_balanceada', 'avaliacao_neurologica_precoce', 'paciente_critico_hepato_reno'],
    why_combo_exists:
      'Remifentanil é excelente para controle intraoperatório e despertar rápido, mas não "cobre" o pós-op: precisa ser combinado com ponte analgésica (opioide de maior duração, bloqueios locais/regionais, AINE quando indicado) para evitar rebote de dor.',
    rules: [
      {
        if: "plan_stop_infusion_within('30min') && !has_bridge_analgesia",
        then: {
          action: 'PREFER_ALTERNATIVE',
          drug_id: 'remifentanil',
          message: 'Remifentanil vai "desligar" rápido: defina ponte analgésica antes de interromper (opioide de maior duração/bloqueio/AINE).',
        },
      },
      {
        if: "has_comorbidity('hepatic_disease') || has_comorbidity('ckd')",
        then: {
          action: 'PREFER_ALTERNATIVE',
          drug_id: 'remifentanil',
          message: 'Pode ser vantajoso em hepatopatas/renopatas por metabolismo por esterases — manter monitorização ventilatória/hemodinâmica.',
        },
      },
      {
        if: 'attempt_bolus == true',
        then: {
          action: 'REMOVE_DRUG',
          drug_id: 'remifentanil',
          message: 'Bloquear bolus/dose de ataque IV por risco de bradicardia severa até parada atrial.',
        },
      },
    ],
  },

  // Seção 15: Fluxogramas
  clinical_flowcharts: {
    format: 'mermaid',
    flows: [
      {
        id: 'remi_intraop_titration',
        title: 'Remifentanil CRI intraoperatório — titulação e ponte',
        mermaid:
          'flowchart TD\nA[Cirurgia/estímulo doloroso] --> B[Confirmar monitorização: ECG + PA + SpO2 + EtCO2]\nB --> C[Iniciar CRI (sem bolus)]\nC --> D[Reavaliar em 5-10 min: nocicepção + EtCO2 + FC/PA]\nD --> E{Analgesia adequada e ventilação ok?}\nE -- Sim --> F[Manter dose mínima eficaz]\nE -- Não, dor --> G[Subir em passos pequenos]\nE -- Não, ventilação/FC ruim --> H[Reduzir CRI + suporte ventilatório/hemodinâmico]\nF --> I{Vai parar CRI em breve?}\nI -- Sim --> J[Garantir ponte analgésica: opioide de maior duração/bloqueio/AINE]\nI -- Não --> D\nG --> D\nH --> D',
      },
    ],
  },

  // Seção 16: UI Copy
  ui_copy: {
    critical_warning_banner:
      'Remifentanil é opioide ultracurto: usar em CRI (sem bolus) com ECG + EtCO2; ao parar, analgesia some rápido — ponte analgésica é obrigatória.',
    alert_messages: {
      short: 'Sem bolus! CRI ultracurta, exige EtCO2/ECG e ponte analgésica antes de parar.',
      long: 'Remifentanil (μ-agonista) tem meia-vida extremamente curta e recuperação rápida mesmo após infusões prolongadas, porque é metabolizado por esterases inespecíficas. Isso o torna muito titulável e útil em pacientes críticos (incluindo hepato/renais). O risco principal é bradicardia (especialmente com bolus/ataque IV) e depressão respiratória. Como o efeito some em minutos após parar a CRI, sempre planeje transição analgésica.',
    },
    block_message: 'Bloqueado: remifentanil não deve ser administrado como bolus/dose de ataque IV.',
    common_errors: [
      'Dar dose de ataque/bolus IV (pode causar bradicardia severa até parada atrial).',
      'Parar CRI sem ponte analgésica (rebote de dor imediato).',
      'Escalar dose sem EtCO2/ECG (perde o principal limitador de segurança).',
      'Erro de unidade (µg/kg/h vs µg/kg/min) ao programar bomba.',
    ],
  },

  // Seção 17: Referências
  references: [
    {
      section: 'doses/contraindications/dilution_and_preparation/species_notes',
      source:
        'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd ed. — Chapter 21 (Anaesthesia, sedation and analgesia of the critical patient): tabela de opioides e texto de remifentanil (CRI cão 6–12 µg/kg/h; gato 4–6 µg/kg/h; metabolizado por esterases; reconstituição em NaCl 0,9% ou glicose 5%; expira 24 h após reconstituição; evitar dose de ataque IV por bradicardia severa até parada atrial; sem efeitos cumulativos).',
      page: 'Ch21 p.346–347 (no TXT: região ~30620–30705)',
      edition: '3',
      year: 2018,
    },
    {
      section: 'mechanism/pharmacokinetics/pharmacodynamics',
      source:
        'Veterinary Anesthesia and Analgesia, The 6th Edition of Lumb and Jones — Chapter 23 (Opioids): remifentanil (μ-agonista; meia-vida extremamente curta ~6 min em cães; metabolismo por esterases inespecíficas; context-sensitive half-time <5 min; notas de espécie em gatos e diferenças de antinocicepção).',
      page: 'Ch23 p.380–381 (no TXT: região ~25390–25415)',
      edition: '6',
    },
  ],
}
