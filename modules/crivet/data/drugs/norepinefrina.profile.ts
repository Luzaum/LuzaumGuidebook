import { DrugProfile } from '../../types/drugProfile'

export const norepinefrinaProfile: DrugProfile = {
  drug_id: 'norepinefrina',
  name_pt: 'Norepinefrina (Noradrenalina)',
  name_en: 'Norepinephrine (Noradrenaline)',
  synonyms: ['noradrenalina', 'NE', 'norepi', 'nor-epi'],
  class: [
    'Vasopressor catecolaminérgico',
    'Agonista α1 predominante + β1 moderado'
  ],
  core_concepts: {
    taglines: [
      'Vasopressor de 1ª linha em choque vasodilatado (séptico/vasoplégico) em pequenos animais',
      'Sobe PAM principalmente por vasoconstrição (α1), com algum suporte inotrópico (β1)',
      'Usar a menor dose efetiva: risco de isquemia e de mascarar hipovolemia persistente',
      'Evitar mistura/linha com bicarbonato: catecolaminas são inativadas'
    ],
    mechanism: {
      receptors_targets: [
        'Agonista α1 (predominante)',
        'Agonista β1 (moderado)',
        'Baixa atividade β2'
      ],
      primary_effects: {
        cardiovascular: '↑ SVR (vasoconstrição) → ↑ PAM; Pode aumentar pós-carga; β1 moderado pode ↑ contratilidade; Pode ocorrer bradicardia reflexa apesar de β1',
        respiratory: 'Sem efeito broncodilatador clinicamente relevante; atenção a perfusão/oxigenação global',
        cns: 'Não é sedativo/analgésico; alvo é hemodinâmica (PAM/MAP) e entrega de O2',
        renal_hepatic: 'Redistribui fluxo por vasoconstrição; doses altas podem piorar perfusão esplâncnica/renal',
        gi: 'Risco de hipoperfusão esplâncnica se dose alta ou hipovolemia não corrigida'
      },
      clinical_metaphor: '‘Aperta a mangueira’ (α1) para recuperar pressão e perfusão — mas se apertar demais ou se faltar volume, você “seca” a periferia.'
    },
    pharmacodynamics: {
      onset_iv: 'Muito rápido (minutos).',
      onset_im: 'Não recomendado.',
      peak: 'Minutos (titulável).',
      duration: 'Curta; efeito cai rapidamente (exige bomba).',
      dependencies: [
        'Depende de volume intravascular adequado',
        'Acidose/hipóxia grave reduzem resposta a catecolaminas'
      ]
    },
    pharmacokinetics: {
      metabolism: 'Rapidíssimo por MAO/COMT.',
      excretion: 'Renal (metabólitos).',
      accumulation: 'Incomum (meia-vida curta); risco é iatrogenia de dose.'
    }
  },

  species_notes: {
    dogs: {
      key_point: 'Vasopressor choque vasodilatado; titular por PAM/perfusão.',
      high_risk_notes: ['Cautela em cardiopatas (pós-carga); risco de necrose por extravasamento.']
    },
    cats: {
      key_point: 'Mesma lógica; atenção a cardiomiopatias e bradicardia reflexa.',
      high_risk_notes: ['Extremidades frias/isquemia podem aparecer mais cedo.']
    }
  },

  indications: {
    primary: [
      'Choque vasodilatado (séptico/SIRS) pós-ressuscitação volêmica',
      'Hipotensão refratária a fluidos'
    ],
    secondary: [
      'Perioperatório em paciente crítico para manter PAM',
      'Pós-parada (suporte vasopressor)'
    ],
    off_label_notes: [
      'Prioridade é volume; vasopressor é adjuvante.'
    ]
  },

  contraindications: {
    absolute: [
      { condition: 'Hipovolemia não corrigida', why: 'Vasopressor mascara choque e piora perfusão visceral' },
      { condition: 'Sem monitorização/bomba', why: 'Risco de flutuação grave de PA e arritmias' }
    ],
    relative: [
      { condition: 'Arritmias ventriculares', why: 'Pode exacerbar (pró-arrítmico)' },
      { condition: 'Cardiopatia descompensada', why: 'Aumento de pós-carga pode reduzir DC' }
    ]
  },

  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      cri: {
        mcgkgmin: {
          min: 0.05,
          max: 2.0,
          note: 'Iniciar 0.05-0.1 e titular.'
        }
      }
    },
    cat: {
      cri: {
        mcgkgmin: {
          min: 0.05,
          max: 2.0,
          note: 'Iniciar baixo (0.05) e titular.'
        }
      }
    }
  },

  presentations: [
    { concentration_mg_ml: 1, label: '1 mg/mL Ampola 4ml (comum)', total_mg: 4, volume_ml: 4 },
    { concentration_mg_ml: 2, label: '2 mg/mL Ampola 4ml (comum)', total_mg: 8, volume_ml: 4 }
  ],



  // Seção 7: Compatibilidade
  compatibility: {
    compatible_in_syringe_or_bag: ['NaCl 0.9%'],
    compatible_y_site_only: [],
    incompatible: [
      {
        agent: 'Bicarbonato de Sódio',
        why: 'Inativação de catecolaminas em pH alcalino.',
        risk: 'Perda de eficácia.',
      },
    ],
    dedicated_line_rules: [
      'Norepinefrina é vasopressor titulável: usar bomba de infusão e via dedicada.',
      'Evitar misturas no mesmo lúmen.',
    ],
  },

  // Seção 11: Presets
  presets: [
    {
      id: 'sepsis_start',
      label: 'Choque Séptico (Início) ⚡',
      dose_mcgkgmin: 0.1,
      clinical_target: 'Recuperar PAM > 65mmHg (titular)',
      linked_alerts: [],
    },
  ],

  // Seção 12: Templates de Cálculo
  calculation_templates: {
    cri: {
      required_inputs: [
        'species',
        'weight_kg',
        'dose_mcgkgmin',
        'pump_rate_ml_h',
        'final_volume_ml',
        'drug_concentration_mg_ml',
        'diluent',
      ],
      algorithm: [
        '1) Calcular dose/min (mcg) = dose (mcg/kg/min) × peso (kg)',
        '2) Calcular dose/hora (mcg) = dose/min × 60',
        '3) Concentração necessária (mcg/mL) = dose/hora ÷ taxa da bomba (mL/h)',
        '4) Total de fármaco (mcg) na bolsa = conc. necessária × volume final (mL)',
        '5) Converter para mg = total (mcg) ÷ 1000',
        '6) Volume de fármaco a aspirar (mL) = total (mg) ÷ concentração da ampola (mg/mL)',
        '7) Volume de diluente (mL) = volume final - volume de fármaco',
      ],
      hard_safety_checks: [
        {
          if: 'dose_mcgkgmin <= 0',
          then: 'BLOCK',
          message: 'Dose deve ser maior que zero.',
        },
        {
          if: 'pump_rate_ml_h <= 0',
          then: 'BLOCK',
          message: 'Taxa da bomba deve ser maior que zero.',
        },
        {
          if: 'drug_concentration_mg_ml <= 0',
          then: 'BLOCK',
          message: 'Concentração do fármaco inválida.',
        },
        {
          if: "diluent != 'Glicosado 5%' && diluent != 'D5W' && diluent != 'SG 5%'",
          then: 'WARN',
          message: 'ℹ️ Sugestão: Norepinefrina é mais estável em Glicosado 5% (D5W) devido ao pH levemente ácido que previne oxidação. NaCl 0,9% é aceitável para uso imediato (até 12-24h).',
        },
      ],
      soft_safety_checks: [
        {
          if: 'dose_mcgkgmin > 2',
          then: 'WARN',
          message:
            'Dose > 2 mcg/kg/min: risco altíssimo de vasoconstrição excessiva/hipoperfusão periférica. Monitorização invasiva mandatória.',
        },
        {
          if: 'drug_volume_ml < 0.1',
          then: 'WARN',
          message: 'Volume de fármaco muito baixo (< 0.1 mL). Aumente o volume final da solução ou a taxa para reduzir erro de pipetagem.',
        },
      ],
      outputs: ['drug_volume_ml', 'diluent_volume_ml', 'total_drug_mg'],
      error_cost: 'Erro de diluição ou diluente errado (D5W) viola protocolo de segurança.',
    },
    bolus: {
      required_inputs: [],
      algorithm: [],
      hard_safety_checks: [
        {
          if: 'true',
          then: 'BLOCK',
          message: 'Bloqueado: norepinefrina não deve ser administrada em bolus. Uso exclusivo em CRI titulável.',
        },
      ],
      soft_safety_checks: [],
      outputs: [],
      error_cost: 'Bolus causa pico hipertensivo perigoso.',
    },
    dilution_builder: {
      required_inputs: ['final_volume_ml', 'target_mcg_ml', 'drug_concentration_mg_ml', 'diluent'],
      algorithm: [
        '1) Total necessário (mcg) = meta (mcg/mL) × volume final (mL)',
        '2) Total em mg = total (mcg) ÷ 1000',
        '3) Volume a aspirar (mL) = total (mg) ÷ concentração da ampola (mg/mL)',
      ],
      hard_safety_checks: [

      ],
      soft_safety_checks: [
        {
          if: 'drug_volume_ml < 0.1',
          then: 'WARN',
          message: 'Volume a aspirar < 0.1 mL: risco de erro. Aumente o volume total ou a concentração alvo.',
        },
      ],
      outputs: ['drug_volume_ml', 'diluent_volume_ml'],
      error_cost: 'Seleção incorreta de diluente.',
    },
  },

  dilution_and_preparation: {
    hard_rules: [
      'Norepinefrina é vasopressor titulável: usar bomba de infusão e, idealmente, via central; se periférica, usar veia calibrosa.',
      'Rotular sempre: concentração final (mcg/mL), dose-alvo (mcg/kg/min) e taxa (mL/h).',
      '✅ Diluente PREFERENCIAL: Glicosado 5% (D5W) - protege contra oxidação. NaCl 0,9% é compatível mas menos estável (trocar em 12-24h).',
    ],
    recommended_targets: [
      {
        target_mg_ml: 0.016,
        use_cases: ['UTI Padrão (Solução 16 mcg/mL)'],
        how_to_make: '4 mg (1 ampola típica) em 250 mL SG 5% (D5W)',
      },
      {
        target_mg_ml: 0.032,
        use_cases: ['Restrição de volume / Dose alta'],
        how_to_make: '8 mg (2 ampolas) em 250 mL SG 5% (D5W)',
      },
    ],
    diluents_allowed: ['Glicosado 5%', 'NaCl 0.9%'],
    preferred_diluent: {
      diluent: 'Glicosado 5%',
      why: 'Maior estabilidade (pH ácido previne oxidação das catecolaminas). NaCl 0,9% é aceitável (menor estabilidade).',
    },
    stability: [
      {
        diluent: 'Glicosado 5% (D5W)',
        max_time_hours: 48,
        light_protection: true,
        syringe_bag_change: 'D5W protege a molécula da oxidação. Proteger da luz.',
      },
      {
        diluent: 'NaCl 0.9%',
        max_time_hours: 12,
        light_protection: true,
        syringe_bag_change: 'Menor estabilidade em solução salina (oxidação facilitada). Trocar em 12-24h.',
      },
    ],

    dedicated_line_required: true,
    dedicated_line_why: 'Variações de fluxo por bólus de outros fármacos causam instabilidade grave da PA.',
  },

  // Seção 16: UI Copy
  ui_copy: {
    critical_warning_banner:
      'Norepinefrina: Preferir **Glicosado 5% (D5W)** para maior estabilidade. Uso em NaCl 0,9% é aceitável (trocar a cada 12h).',
    alert_messages: {
      short: 'Use bomba. Titule PAM/Lactato.',
      long: 'D5W é preferível para estabilidade. Doses > 2mcg/kg/min exigem monitorização invasiva por risco de isquemia.',
    },
    block_message: 'Bloqueado: norepinefrina não deve ser administrada em bolus. Use apenas CRI titulável.',
  },

  // Seção 14: Alertas por Comorbidade (e Diluente)
  alerts_by_comorbidity: [
    {
      key: 'norepi_diluent_saline_warning',
      level: 'MONITOR',
      title: 'DILUENTE (NaCl 0,9%)',
      why: 'NaCl 0,9% tem menor capacidade de proteger a norepinefrina da oxidação que o D5W. A solução pode perder potência mais rápido.',
      action: ['Trocar a solução a cada 12-24h se usar NaCl.', 'Proteger da luz.'],
      dose_adjustment: {
        suggest_alternative: 'Considerar D5W se disponível para infusões longas.',
      },
    },
    {
      key: 'hypovolemia',
      title: 'Hipovolemia não corrigida',
      level: 'CRITICAL',
      why: 'Vasopressor com hipovolemia "esconde" o choque e piora perfusão visceral (isquemia).',
      action: ['Ressuscitar volume ANTES de iniciar norepinefrina.'],
    },
  ],

  help: {
    title: 'Norepinefrina - Ajuda Clínica',
    sections: [
      {
        level: 'CRITICAL',
        items: [
          { text: '🟥 Diluir preferencialmente em **Glicosado 5% (D5W)** para estabilidade. NaCl 0,9% oxida mais rápido.' },
          { text: 'Somente APÓS volume adequado (corrigir hipovolemia antes).' },
          { text: 'Risco de necrose extensa por extravasamento (preferir central ou veia calibrosa).' },
        ],
      },
      {
        level: 'IMPORTANT',
        items: [
          { text: 'Incompatível com Bicarbonato (inativação) e soluções alcalinas.' },
          { text: 'Monitorar PAM (invasiva ideal) e perfusão (lactato/SvO2).' },
        ],
      },
    ],
  },
}
