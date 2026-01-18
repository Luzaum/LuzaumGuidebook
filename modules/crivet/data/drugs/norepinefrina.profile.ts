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

  dilution_and_preparation: {
    hard_rules: [
      'CRI obrigatória (Bomba)',
      'Nunca bolus',
      'Não misturar com bicarbonato'
    ],
    recommended_targets: [
      {
        target_mg_ml: 0.016,
        use_cases: ['UTI Padrao'],
        how_to_make: '4mg em 250ml = 16mcg/ml'
      },
      {
        target_mg_ml: 0.032, // 32 mcg/mL
        use_cases: ['Restrição de volume'],
        how_to_make: '8mg em 250ml = 32mcg/ml'
      }
    ],
    diluents_allowed: ['NaCl 0.9%', 'D5W']
  },

  compatibility: {
    compatible_in_syringe_or_bag: ['NaCl 0.9%', 'D5W'],
    incompatible: [
      { agent: 'Bicarbonato de Sódio', why: 'Inativação de catecolaminas em pH alcalino' }
    ]
  },

  alerts_by_comorbidity: [
    {
      key: 'hypovolemia',
      title: 'Choque Hipovolêmico',
      level: 'CRITICAL',
      why: 'Vasopressor com hipovolemia piora perfusão.',
      action: ['Ressuscitar volume antes']
    },
    {
      key: 'cardiac',
      title: 'Cardiopatia',
      level: 'WARNING',
      why: 'Aumento de pós-carga pode reduzir DC.',
      action: ['Monitorar inotropismo', 'Considerar dobutamina']
    }
  ],

  presets: [
    {
      id: 'sepsis_start',
      label: 'Choque Séptico (Início)',
      dose_mcgkgmin: 0.1,
      clinical_target: 'Recuperar PAM > 65mmHg'
    }
  ],

  help: {
    title: 'Norepinefrina - Ajuda Clínica',
    sections: [
      {
        level: 'CRITICAL',
        items: [
          { text: 'Somente APÓS volume adequado.' },
          { text: 'Incompatível com Bicarbonato.' },
          { text: 'Risco de necrose por extravasamento.' }
        ]
      },
      {
        level: 'IMPORTANT',
        items: [
          { text: 'Titule a cada 2-5 min.' },
          { text: 'Alvo: Perfusão (lactato), não só PAM.' }
        ]
      }
    ]
  }
}
