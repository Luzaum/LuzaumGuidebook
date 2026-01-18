import { DrugProfile } from '../../types/drugProfile'

export const dobutaminaProfile: DrugProfile = {
  drug_id: 'dobutamina',
  name_pt: 'Dobutamina',
  name_en: 'Dobutamine',
  synonyms: ['dobutamine HCl', 'DOB', 'inotrópico β1', 'catecolamina sintética'],
  class: ['Inotrópico catecolaminérgico', 'Agonista β1 predominante (β2/α1 em doses mais altas)'],
  core_concepts: {
    taglines: [
      'Aumenta contratilidade com efeito relativamente menor em FC e PA nas doses usuais',
      'Escolha clássica para estados de baixo débito (miocárdio “fraco”) com hipotensão/hipoperfusão',
      'CRI titulável, meia-vida curta: liga/desliga rápido',
      'Risco de taquiarritmias em doses altas e tolerância com infusão prolongada'
    ],
    mechanism: {
      receptors_targets: [
        'Agonista β1 (predominante)',
        'Em taxas mais altas (≈5–10 mcg/kg/min): também β2 e α1',
        'Sem efeito em α2'
      ],
      primary_effects: {
        cardiovascular: '↑ inotropismo (↑ contratilidade) → ↑ débito cardíaco (DC) em estados de baixo DC; Efeitos hemodinâmicos dose-dependentes; em cães anestesiados pode ↑ DC/FC e também SVR em certas condições',
        respiratory: 'Sem ação broncodilatadora clinicamente relevante; melhora secundária de oxigenação ocorre ao melhorar DC/perfusão.',
        cns: 'Não sedativo/analgésico; alvo é hemodinâmica (DC/perfusão).',
        renal_hepatic: 'Melhora perfusão renal/esplâncnica se aumentar DC de forma efetiva; em doses excessivas pode haver efeitos menos previsíveis por SVR/FC.',
        gi: 'Pode melhorar perfusão esplâncnica via ↑ DC; evitar taquicardia/vasoconstrição excessiva por dose alta em pacientes frágeis.'
      },
      clinical_metaphor: '‘Aperta a bomba’ (coração contrai melhor) — útil quando a pressão está baixa porque o coração não consegue ejetar bem.'
    },
    pharmacodynamics: {
      onset_iv: 'Rápido (minutos); início e fim de ação rápidos pela meia-vida curta.',
      onset_im: 'Não recomendado (uso clínico é IV em CRI).',
      peak: 'Minutos após ajustes na bomba (titulável).',
      duration: 'Curta; efeito cai rapidamente ao interromper.',
      dependencies: [
        'Resposta reduzida em acidose/hipóxia graves (corrigir ventilação/oxigenação e perfusão)',
        'Precisa de monitorização: pode induzir taquiarritmias, especialmente em doses maiores'
      ]
    },
    pharmacokinetics: {
      metabolism: 'Metabolismo predominante hepático via catecol-O-metiltransferase (COMT) para metabólitos inativos.',
      excretion: 'Metabólitos conjugados excretados na urina.',
      dog_vs_cat: 'Em gatos, efeitos pressóricos podem ser limitados, com ↑ FC e ↓ SVR atribuídos a ação β2 periférica (interpretação clínica: titule por perfusão, não espere ‘subir PA’ sempre).',
      accumulation: 'Acúmulo farmacocinético é incomum pela meia-vida curta; o problema clínico relevante é tolerância ao efeito inotrópico com infusão prolongada.',
      active_metabolites: 'Não clinicamente relevantes para titulação aguda.'
    }
  },

  species_notes: {
    dogs: {
      key_point: 'Usada para aumentar DC em estados de baixo débito; em hipotensão anestésica pode não elevar PA de forma robusta — avaliar resposta por perfusão/medidas avançadas quando possível.',
      high_risk_notes: [
        'Risco de taquiarritmias supraventriculares/ventriculares em doses altas; requer ECG e PA seriada.',
        'Tolerância ao efeito inotrópico pode ocorrer com infusões prolongadas.'
      ]
    },
    cats: {
      key_point: 'Pode ↑ FC e reduzir SVR (β2 periférico), com efeito limitado em PA; titule por DC/perfusão e sinais clínicos.',
      high_risk_notes: [
        'Cautela em cardiomiopatias (HCM/RCM): avaliar se há obstrução dinâmica e resposta hemodinâmica; monitorização estreita.',
        'Arritmias em doses altas também são preocupação.'
      ]
    }
  },

  indications: {
    primary: [
      'Estados de baixo débito cardíaco por disfunção miocárdica (choque cardiogênico/miocardiodepressão)',
      'Suporte inotrópico em insuficiência cardíaca aguda com hipoperfusão (quando indicado) e hipotensão associada'
    ],
    secondary: [
      'Hipotensão durante anestesia quando há suspeita de queda de DC (p.ex., depressão miocárdica por anestésico), sempre após avaliar profundidade anestésica/volemia',
      'Pós-ressuscitação: disfunção ventricular esquerda pós-ROSC (quando protocolo/avaliação indicar suporte inotrópico)'
    ],
    off_label_notes: [
      'Em choque distributivo (séptico) com miocardiodepressão coexistente, pode ser combinada a vasopressor (ex.: norepinefrina) para equilibrar SVR e DC.'
    ]
  },

  contraindications: {
    absolute: [
      { condition: 'Sem monitorização/bomba', why: 'Uso sem bomba de infusão e sem monitorização (ECG + PA) é perigoso' },
      { condition: 'Taquiarritmias graves', why: 'Risco de piora não controlada' }
    ],
    relative: [
      { condition: 'Cardiomiopatia hipertrófica (HCM)', why: 'Pode piorar gradiente em obstrução dinâmica (LVOTO); monitorar.' },
      { condition: 'Hipovolemia não corrigida', why: 'Pode não resolver perfusão; reavaliar volume e causa base.' }
    ]
  },

  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      cri: {
        mcgkgmin: {
          min: 2,
          max: 15,
          note: 'Começar baixo e titular por efeito (PA/perfusão/eco). Risco de taquiarritmias cresce com doses altas.'
        }
      }
    },
    cat: {
      cri: {
        mcgkgmin: {
          min: 1,
          max: 5,
          note: 'Começar no extremo inferior e titular; pode ↑ FC e ↓ SVR; monitorar PA e perfusão.'
        }
      }
    }
  },

  presentations: [
    { concentration_mg_ml: 12.5, label: '12.5 mg/mL (Frasco/Ampola)', examples: ['Genéricos (variável)'] },
    { concentration_mg_ml: 50, label: '50 mg/mL (Frasco/Ampola)', examples: ['Genéricos (variável)'] }
  ],

  dilution_and_preparation: {
    hard_rules: [
      'Administrar exclusivamente por CRI (meia-vida curta).',
      'Usar bomba de infusão; monitorização mínima: ECG contínuo + PA seriada/frequente.',
      'Rotular sempre com: concentração final (mg/mL ou mcg/mL) + dose-alvo em mcg/kg/min.'
    ],
    recommended_targets: [
      {
        target_mg_ml: 1,
        use_cases: ['Seringa para titulação fina em pacientes pequenos'],
        how_to_make: 'Defina volume final. Ex 50ml: 50mg total. Se frasco 12.5mg/ml -> 4ml.'
      },
      {
        target_mg_ml: 0.5,
        use_cases: ['Pacientes menores ou maior precisão'],
        how_to_make: 'Defina volume final. Ex 50ml: 25mg total. Se frasco 50mg/ml -> 0.5ml.'
      }
    ],
    diluents_allowed: ['NaCl 0.9%', 'Dextrose 5% (D5W)']
  },

  compatibility: {
    compatible_in_syringe_or_bag: ['NaCl 0.9%', 'Dextrose 5% (D5W)'],
    incompatible: []
  },

  alerts_by_comorbidity: [
    {
      key: 'dobutamine_arrhythmia_risk',
      title: 'Risco de Arritmia',
      level: 'WARNING',
      why: 'Dobutamina pode desencadear taquiarritmias (especialmente em doses altas).',
      action: ['ECG contínuo', 'Reduzir dose se arritmia surgir']
    },
    {
      key: 'dobutamine_cardiomyopathy_hcm',
      title: 'HCM Felina',
      level: 'MONITOR',
      why: 'Alterações de contratilidade podem mudar dinâmica de obstrução (SAM).',
      action: ['Priorizar eco', 'Dose mínima efetiva']
    }
  ],

  presets: [
    {
      id: 'dobutamine_start_dog_low_output',
      label: 'Cão — baixo débito (conservador)',
      dose_mcgkgmin: 2,
      clinical_target: 'Aumentar contratilidade e melhorar perfusão sem induzir taquiarritmia.'
    },
    {
      id: 'dobutamine_start_cat_low_output',
      label: 'Gato — baixo débito (conservador)',
      dose_mcgkgmin: 1,
      clinical_target: 'Melhorar DC/perfusão com vigilância de FC/PA.'
    }
  ],

  help: {
    title: 'Dobutamina - Ajuda Clínica',
    sections: [
      {
        level: 'CRITICAL',
        items: [
          { text: 'Dobutamina é CRI titulável (meia-vida curta): usar bomba e monitorização (ECG + PA).' },
          { text: 'Doses altas aumentam risco de taquiarritmias (atenção especial ≥10 mcg/kg/min).' }
        ]
      },
      {
        level: 'IMPORTANT',
        items: [
          { text: 'Se a hipotensão é por vasoplegia (SVR baixo), dobutamina pode não resolver PA: considere vasopressor associado.' },
          { text: 'Monitorar perfusão (lactato/diurese), não apenas PA; meta é melhorar DC efetivo.' }
        ]
      }
    ]
  }
}
