import type { SyndromeProfileV2 } from '../model/types'

/** Cenários compartilhados: infecções uterinas agudas (piometra / metrite / endometrite). */
const SCENARIOS_UTERINO_AGUDO: NonNullable<SyndromeProfileV2['scenarios']> = {
  septic_unstable: {
    firstLineRegimenIds: ['reg_piometra_iv_beta_lactam_aminoglycoside_metronidazole'],
    alternativeRegimenIds: ['reg_piometra_iv_clinda_enro'],
    rationaleBullets: [
      'Cenário séptico: priorizar IV, estabilização e controle do foco (cirúrgico quando indicado).',
      'Aminoglicosídeo exige cautela renal e monitorização.',
    ],
  },
  severe: {
    firstLineRegimenIds: ['reg_piometra_iv_beta_lactam_aminoglycoside_metronidazole'],
    alternativeRegimenIds: ['reg_piometra_iv_clinda_enro'],
    rationaleBullets: ['Grave: ampla cobertura empírica até cultura e desfecho definitivo do foco.'],
  },
  hospitalized: {
    firstLineRegimenIds: ['reg_piometra_iv_beta_lactam_aminoglycoside_metronidazole'],
    alternativeRegimenIds: ['reg_piometra_iv_clinda_enro', 'reg_piometra_oral_amox_clav_metronidazole'],
    rationaleBullets: ['Internado: preferir IV empírico; VO como transição se estável.'],
  },
  ambulatory_stable: {
    firstLineRegimenIds: ['reg_piometra_oral_amox_clav_metronidazole'],
    alternativeRegimenIds: ['reg_piometra_iv_clinda_enro'],
    rationaleBullets: [
      'Ambulatorial “estável” é exceção; confirmar ausência de sepse oculta e definir plano cirúrgico quando aplicável.',
    ],
  },
}

export const SYNDROME_PROFILES_V2: Record<string, SyndromeProfileV2> = {
  piometra: {
    id: 'piometra',
    slug: 'piometra',
    label: 'Piometra',
    synonyms: ['piometra', 'infeção uterina', 'pyometra'],
    summary:
      'Emergência uterina; o tratamento definitivo costuma ser cirúrgico (OHE). Antimicrobiano empírico cobre anaeróbios e Gram-negativos enquanto se estabiliza e coleta material.',
    antibioticIndication: 'yes_empiric',
    cultureRecommendation: 'strong',
    likelyMicrobiologySummary:
      'Polimicrobiano: frequentemente anaeróbios e Enterobacterales; variável conforme meio e idade.',
    durationGuidance:
      'Perioperatório e pós-operatório conforme resposta clínica e cultura; não fixar sem reavaliação.',
    stewardshipNotes: [
      'Evitar fluoroquinolonas como “primeira linha universal” sem contexto e cultura.',
      'Descalonar após cultura e controle do foco.',
      'Amostras antes de antibiótico quando possível.',
    ],
    interpretiveNotes: [
      'Urocultura isolada pode não refletir o foco uterino profundo.',
      'Hemocultura pode ser negativa mesmo com sepse sistêmica; não excluir gravidade.',
    ],
    scenarios: SCENARIOS_UTERINO_AGUDO,
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_piometra'],
  },

  metrite_aguda: {
    id: 'metrite_aguda',
    slug: 'metrite_aguda',
    label: 'Metrite aguda',
    synonyms: ['metrite', 'útero infeccionado', 'endometrite puerperal'],
    summary:
      'Infecção uterina aguda fora do contexto clássico de piometra fechada; o manejo depende de estágio reprodutivo, estabilidade e necessidade de drenagem/cirurgia.',
    antibioticIndication: 'yes_empiric',
    cultureRecommendation: 'strong',
    likelyMicrobiologySummary:
      'Mistura de anaeróbios e bacilos Gram-negativos é comum; variável se pós-parto imediato ou outro contexto.',
    durationGuidance: 'Conforme resposta, cultura e controle do foco; reavaliar precocemente.',
    stewardshipNotes: [
      'Priorizar identificação do foco e estabilização.',
      'Evitar prolongar empirismo amplo sem amostras quando o quadro permitir.',
    ],
    interpretiveNotes: [
      'Diferenciar quadros que exigem intervenção cirúrgica imediata dos que permitem estabilização médica inicial.',
    ],
    scenarios: SCENARIOS_UTERINO_AGUDO,
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_metrite'],
  },

  endometrite: {
    id: 'endometrite',
    slug: 'endometrite',
    label: 'Endometrite',
    synonyms: ['endometrite', 'infecção endometrial'],
    summary:
      'Inflamação/infeção do endométrio; no pós-parto pode coexistir com retenção ou metrite. Antimicrobiano empírico segue lógica de infecção uterina até cultura.',
    antibioticIndication: 'yes_empiric',
    cultureRecommendation: 'strong',
    likelyMicrobiologySummary:
      'Enterobacterales, anaeróbios e estreptococos conforme contexto; cultura de conteúdo/secreção quando possível.',
    durationGuidance: 'Ajustar pela resolução clínica, cultura e presença de foco persistente.',
    stewardshipNotes: [
      'Amostragem antes de mudanças repetidas de esquema.',
      'Descalonar após identificação e desfecho obstétrico/cirúrgico.',
    ],
    interpretiveNotes: [
      'Associar sempre avaliação de retenção de placenta/crion e necessidade de procedimento.',
    ],
    scenarios: SCENARIOS_UTERINO_AGUDO,
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_endometrite'],
  },

  cistite_esporadica: {
    id: 'cistite_esporadica',
    slug: 'cistite_esporadica',
    label: 'Cistite esporádica (ITU inferior não complicada)',
    synonyms: ['cistite', 'itu inferior', 'infecção urinária baixa'],
    summary:
      'ITU não complicada em adulto: priorizar espectro estreito guiado por cultura quando possível; evitar fluoroquinolona de rotina.',
    antibioticIndication: 'yes_empiric',
    cultureRecommendation: 'recommended',
    likelyMicrobiologySummary:
      'Enterobacterales (ex.: E. coli) predominam; outros conforme histórico e fatores de risco.',
    durationGuidance: 'Cursos curtos conforme resposta e cultura; reavaliar se recidiva.',
    stewardshipNotes: [
      'Reservar fluoroquinolonas para indicações específicas.',
      'Em gato, interpretação de urocultura pode ser limitada por contaminação/transporte.',
    ],
    interpretiveNotes: [
      'Diferenciar bacteriúria assintomática (muitas vezes não tratar) de cistite sintomática.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_cistite_simples_amox_clav'],
        alternativeRegimenIds: ['reg_cistite_fq_alt'],
        rationaleBullets: [
          'Ambulatorial estável: beta-lactâmico com inibidor costuma alinhar a stewardship.',
          'Fluoroquinolona como alternativa, não como padrão universal.',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_cistite_complicated_iv'],
        alternativeRegimenIds: ['reg_cistite_simples_amox_clav'],
        rationaleBullets: [
          'Internado sugere complicação, obstrução, sepse ou necessidade de IV — cultura guia descalonamento.',
        ],
      },
      severe: {
        firstLineRegimenIds: ['reg_cistite_complicated_iv'],
        alternativeRegimenIds: ['reg_cistite_fq_alt'],
        rationaleBullets: ['Grave: tratar como complicado até prova em contrário; suporte e amostras.'],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_cistite_complicated_iv'],
        alternativeRegimenIds: ['reg_cistite_fq_alt'],
        rationaleBullets: [
          'Sepse: priorizar estabilização, IV e cultura; evitar subtratar foco obstrutivo.',
        ],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_uti'],
  },

  cistite_recorrente: {
    id: 'cistite_recorrente',
    slug: 'cistite_recorrente',
    label: 'Cistite recorrente',
    synonyms: ['itu recorrente', 'rbv recidivante'],
    summary:
      'Recidivas sintomáticas justificam urocultura antes de novo ciclo empírico repetido; evitar “rodízio” de quinolonas sem microbiologia.',
    antibioticIndication: 'yes_after_sampling',
    cultureRecommendation: 'strong',
    likelyMicrobiologySummary:
      'Enterobacterales recorrentes; considerar resistência adquirida, anatomicamente complicada ou persistência de fatores predisponentes.',
    durationGuidance: 'Definir duração após identificação; avaliar causa subjacente se recidivas frequentes.',
    stewardshipNotes: [
      'Cultura orienta escolha e duração; repetir empirismo idêntico sem amostra aumenta pressão seletiva.',
      'Investigar fatores anatômicos/comportamentais conforme caso.',
    ],
    interpretiveNotes: [
      'Diferenciar reinfecção de persistência bacteriana e de bacteriúria assintomática.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_cistite_simples_amox_clav'],
        alternativeRegimenIds: ['reg_cistite_fq_alt'],
        rationaleBullets: [
          'Se cultura recente não disponível e o paciente está estável, esquema estreito típico pode ser ponto de partida — idealmente após amostra.',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_cistite_complicated_iv'],
        alternativeRegimenIds: ['reg_pyelo_iv_amp_sulb_enro'],
        rationaleBullets: ['Internado: tratar como ITU complicada até excluir pielonefrite/obstrução.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_cistite_complicated_iv'],
        alternativeRegimenIds: ['reg_pyelo_iv_amp_sulb_enro'],
        rationaleBullets: ['Grave: priorizar IV, cultura e exclusão de ascensão/complicação.'],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_pyelo_iv_amp_sulb_enro'],
        alternativeRegimenIds: ['reg_cistite_complicated_iv'],
        rationaleBullets: ['Instabilidade: considerar ascensão/complicação abdominal; hemocultura quando indicado.'],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_uti_recurrence'],
  },

  pielonefrite: {
    id: 'pielonefrite',
    slug: 'pielonefrite',
    label: 'Pielonefrite',
    synonyms: ['pielonefrite', 'itu alta', 'infecção renal'],
    summary:
      'ITU ascendente com envolvimento renal: priorizar internação/IV na maioria dos casos; cultura de urina e frequentemente hemocultura.',
    antibioticIndication: 'yes_empiric',
    cultureRecommendation: 'strong',
    likelyMicrobiologySummary:
      'Enterobacterales predominam; outros patógenos conforme histórico, cálculos e complicações.',
    durationGuidance: 'Curso mais longo que ITU baixa; transição VO conforme desfecho clínico e cultura.',
    stewardshipNotes: [
      'Descalonar após identificação; evitar FQ de rotina sem indicação.',
      'Reavaliar função renal e necessidade de imagem conforme caso.',
    ],
    interpretiveNotes: [
      'Quadro “ambulatorial estável” é incomum na pielonefrite franca — confirmar diagnóstico e gravidade.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_cistite_complicated_iv'],
        alternativeRegimenIds: ['reg_pyelo_iv_amp_sulb_enro'],
        rationaleBullets: [
          'Se realmente estável, ainda assim cultura e seguimento próximo; muitos protocolos preferem internação.',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_cistite_complicated_iv'],
        alternativeRegimenIds: ['reg_pyelo_iv_amp_sulb_enro'],
        rationaleBullets: ['Internado: IV até melhora clínica; depois transição guiada por cultura.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_pyelo_iv_amp_sulb_enro'],
        alternativeRegimenIds: ['reg_cistite_complicated_iv'],
        rationaleBullets: ['Grave: espectro ampliado e monitorização; descalonar com identificação.'],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_pyelo_iv_amp_sulb_enro'],
        alternativeRegimenIds: ['reg_piometra_iv_beta_lactam_aminoglycoside_metronidazole'],
        rationaleBullets: [
          'Sepse: hemocultura; suporte; revisar obstrução e foco abdominal.',
        ],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_pyelo'],
  },

  pneumonia: {
    id: 'pneumonia',
    slug: 'pneumonia',
    label: 'Pneumonia (suspeita clínica / radiológica)',
    synonyms: ['pneumonia', 'infecção pulmonar', 'tbv'],
    summary:
      'Espectro depende de gravidade, aspiração, comorbidades e risco de resistência; cultura de escarro/BAL nem sempre disponível em ambulatorial.',
    antibioticIndication: 'yes_empiric',
    cultureRecommendation: 'recommended',
    likelyMicrobiologySummary:
      'Variável: Gram-positivos, Gram-negativos e anaeróbios (aspiração); Mycoplasma depende de contexto regional.',
    durationGuidance: 'Duração conforme resposta, etiologia e complicações; reavaliação em 48–72 h quando aplicável.',
    stewardshipNotes: [
      'Evitar esquemas empíricos amplos sem critério clínico.',
      'Vírus e causas não bacterianas: antibiótico pode não ser necessário — avaliar quadro.',
    ],
    interpretiveNotes: [
      'Radiografia pode não diferenciar causa viral vs bacteriana.',
      'Citologia/cultura de vias aéreas pode refletir comensais.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_pneumo_outpatient_doxy'],
        alternativeRegimenIds: ['reg_pneumo_outpatient_amox_clav'],
        rationaleBullets: [
          'Ambulatorial estável: opções orais com bom perfil para patógenos típicos (conforme protocolo).',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_pneumo_inpatient_iv_beta_lactam'],
        alternativeRegimenIds: ['reg_pneumo_outpatient_amox_clav'],
        rationaleBullets: ['Internado: IV até melhora clínica; depois transição VO.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_pneumo_inpatient_iv_beta_lactam'],
        alternativeRegimenIds: ['reg_pneumo_septic_combo'],
        rationaleBullets: ['Grave: monitorização intensiva; ampliar empiricamente só com critério clínico.'],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_pneumo_septic_combo'],
        alternativeRegimenIds: ['reg_pneumo_inpatient_iv_beta_lactam'],
        rationaleBullets: [
          'Séptico/instável: empírico amplo + suporte; hemocultura/amostras respiratórias quando possível.',
        ],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_pneumo'],
  },

  piotórax: {
    id: 'piotórax',
    slug: 'piotorax',
    label: 'Piotórax',
    synonyms: ['piotórax', 'empiema pleural', 'tórax purulento'],
    summary:
      'Emergência: drenagem pleural efetiva é o pilar; antimicrobiano empírico cobre flora mista até cultura do líquido/lavado.',
    antibioticIndication: 'yes_empiric',
    cultureRecommendation: 'strong',
    likelyMicrobiologySummary:
      'Flora mista (anaeróbios, aeróbios, bastonetes); variável com aspiração, mordedura, extensão de pneumonia.',
    durationGuidance: 'Prolongada conforme resolução do empiema e controle do foco; reavaliar com imagem.',
    stewardshipNotes: [
      'Sem drenagem adequada, antibiótico isolado falha.',
      'Evitar monoterapia inadequada para anaeróbios quando o contexto exigir cobertura combinada.',
    ],
    interpretiveNotes: [
      'Quadro raramente é “ambulatorial estável” na apresentação clássica — confirmar gravidade.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_pyothorax_iv_amp_sulb_metronidazole'],
        alternativeRegimenIds: ['reg_piometra_iv_clinda_enro'],
        rationaleBullets: [
          'Se rotulado como ambulatorial, ainda assim priorizar internação e drenagem — revisar classificação de gravidade.',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_pyothorax_iv_amp_sulb_metronidazole'],
        alternativeRegimenIds: ['reg_piometra_iv_clinda_enro'],
        rationaleBullets: ['Internado: IV empírico até cultura pleural; ajustar por sensibilidade.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_pyothorax_iv_amp_sulb_metronidazole'],
        alternativeRegimenIds: ['reg_pneumo_septic_combo'],
        rationaleBullets: ['Grave: suporte respiratório; revisar necessidade de ampliação empírica conforme protocolo.'],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_pneumo_septic_combo'],
        alternativeRegimenIds: ['reg_pyothorax_iv_amp_sulb_metronidazole'],
        rationaleBullets: [
          'Sepse: hemocultura; estabilização; drenagem; descalonar com identificação.',
        ],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_pyothorax'],
  },

  sepse: {
    id: 'sepse',
    slug: 'sepse',
    label: 'Sepse (foco inicialmente não especificado)',
    synonyms: ['sepse', 'choque séptico', 'instabilidade séptica'],
    summary:
      'Priorizar estabilização hemodinâmica, amostras antes de antimicrobiano quando seguro, e reavaliação precoce; espectro empírico amplo até culturas.',
    antibioticIndication: 'yes_empiric',
    cultureRecommendation: 'strong',
    likelyMicrobiologySummary:
      'Dependente do foco oculto; Gram-positivos, Gram-negativos e anaeróbios devem ser considerados no empirismo inicial conforme suspeita clínica.',
    durationGuidance: 'Descalonar assim que possível após identificação; evitar esquema amplo prolongado sem critério.',
    stewardshipNotes: [
      'Reavaliar em 48–72 h: desescalar ou refinar com base em culturas e foco controlado.',
      'Evitar duplicar coberturas sem indicação após estabilização.',
    ],
    interpretiveNotes: [
      '“Ambulatorial estável” é inconsistente com sepse verdadeira — o motor prioriza cenário hospitalar.',
      'Marcar sepse no perfil do paciente e alinhar gravidade assistencial.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_sepsis_iv_broad_gn_anaerobe'],
        alternativeRegimenIds: ['reg_pneumo_septic_combo'],
        rationaleBullets: [
          'Nota: sepse costuma exigir internação; se você marcou ambulatorial, o cenário foi ajustado para hospitalar no motor.',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_sepsis_iv_broad_gn_anaerobe'],
        alternativeRegimenIds: ['reg_pneumo_septic_combo'],
        rationaleBullets: ['Internado: IV empírico amplo; hemocultura; procurar e controlar foco.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_sepsis_iv_broad_gn_anaerobe'],
        alternativeRegimenIds: ['reg_sepsis_iv_amp_gent_met'],
        rationaleBullets: ['Grave: monitorização; considerar aminoglicosídeo só com função renal adequada e monitorização.'],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_sepsis_iv_amp_gent_met'],
        alternativeRegimenIds: ['reg_sepsis_iv_broad_gn_anaerobe'],
        rationaleBullets: [
          'Instável: priorizar estabilização + empirismo IV; aminoglicosídeo com cautelas renais.',
        ],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_sepsis'],
  },

  perioperatorio: {
    id: 'perioperatorio',
    slug: 'perioperatorio',
    label: 'Perioperatório (profilaxia e cenários cirúrgicos básicos)',
    synonyms: ['profilaxia cirúrgica', 'perioperatório', 'cirurgia limpa'],
    summary:
      'Distingue profilaxia para procedimento limpo/contaminado vs terapia de infecção estabelecida; seguir protocolo institucional e duração mínima eficaz.',
    antibioticIndication: 'conditional',
    cultureRecommendation: 'optional',
    likelyMicrobiologySummary:
      'Profilaxia visa patógenos de pele/ferimento; infecção estabelecida requer cultura do sítio quando possível.',
    durationGuidance:
      'Profilaxia: em geral dose única ou curto conforme protocolo; terapêutico: até controle de foco + resposta clínica.',
    stewardshipNotes: [
      'Não estender profilaxia “por precaução” sem critério.',
      'Cirurgia contaminada/infectada: tratar como infecção, não como profilaxia simples.',
    ],
    interpretiveNotes: [
      'Cenário “ambulatorial estável” modela cirurgia limpa eletiva sem profilaxia sistêmica de rotina.',
      '“Internado” modela profilaxia típica com beta-lactâmico de 1ª dose.',
      'Grave/séptico modela contaminação ou sepse peroperatória — terapêutico amplo.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_periop_clean_no_systemic'],
        alternativeRegimenIds: ['reg_periop_single_dose_cefazolin'],
        rationaleBullets: [
          'Cirurgia limpa eletiva: muitas vezes sem antimicrobiano sistêmico de rotina — ver protocolo local.',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_periop_single_dose_cefazolin'],
        alternativeRegimenIds: ['reg_cistite_complicated_iv'],
        rationaleBullets: ['Profilaxia perioperatória padrão: dose única de beta-lactâmico no timing adequado.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_periop_contaminated_amp_sulb_met'],
        alternativeRegimenIds: ['reg_pyothorax_iv_amp_sulb_metronidazole'],
        rationaleBullets: [
          'Cirurgia contaminada: cobertura anaeróbio + Gram-negativos até cultura e controle cirúrgico.',
        ],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_pneumo_septic_combo'],
        alternativeRegimenIds: ['reg_sepsis_iv_broad_gn_anaerobe'],
        rationaleBullets: [
          'Instabilidade séptica peroperatória: tratar como sepse até foco controlado; não confundir com profilaxia simples.',
        ],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_periop'],
  },

  prostatite: {
    id: 'prostatite',
    slug: 'prostatite',
    label: 'Prostatite bacteriana / infecção prostática',
    synonyms: ['prostatite', 'prostata infeccionada', 'abscesso prostático'],
    summary:
      'Quadro urogenital profundo; o espectro empírico costuma alinhar-se a ITU complicada até cultura de urina/secreção e imagem quando indicada.',
    antibioticIndication: 'yes_empiric',
    cultureRecommendation: 'strong',
    likelyMicrobiologySummary:
      'Enterobacterales frequentes; outros conforme histórico, obstrução e procedimentos prévios.',
    durationGuidance:
      'Curso prolongado relativo à localização prostática; reavaliar clínica, função renal e cultura de controle conforme protocolo.',
    stewardshipNotes: [
      'Hemocultura/urinocultura antes de mudanças repetidas de esquema quando seguro.',
      'Fluoroquinolonas: reservar para contexto e sensibilidade, não como padrão universal.',
    ],
    interpretiveNotes: [
      'Diferenciar prostatite aguda sistêmica de quadros crônicos/recorrentes no plano assistencial.',
      'Considerar abscesso e necessidade de drenagem — antibiótico isolado pode ser insuficiente.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_cistite_simples_amox_clav'],
        alternativeRegimenIds: ['reg_pneumo_outpatient_doxy', 'reg_cistite_fq_alt'],
        rationaleBullets: [
          'Estável: VO com beta-lactâmico + inibidor é linha comum empírica até urocultura.',
          'Doxiciclina pode ser opção contextual pela penetração tecidual; individualizar.',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_cistite_complicated_iv'],
        alternativeRegimenIds: ['reg_pyelo_iv_amp_sulb_enro'],
        rationaleBullets: ['Internado: IV até melhora clínica; transição guiada por cultura e função renal.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_pyelo_iv_amp_sulb_enro'],
        alternativeRegimenIds: ['reg_cistite_complicated_iv'],
        rationaleBullets: ['Grave: espectro ampliado e monitorização; descalonar com identificação.'],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_pyelo_iv_amp_sulb_enro'],
        alternativeRegimenIds: ['reg_piometra_iv_beta_lactam_aminoglycoside_metronidazole'],
        rationaleBullets: [
          'Sepse: tratar como foco urogenital profundo com suporte; hemocultura quando possível.',
        ],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_prostatite'],
  },

  rinite: {
    id: 'rinite',
    slug: 'rinite',
    label: 'Rinite bacteriana / supurativa (suspeita)',
    synonyms: ['rinite supurativa', 'rinite bacteriana', 'nariz purulento', 'sinusite canina'],
    summary:
      'Suspeita de sobreinfeção bacteriana das cavidades nasais (diferenciar de alérgica/viral); cultura de material representativo nem sempre trivial.',
    antibioticIndication: 'conditional',
    cultureRecommendation: 'recommended',
    likelyMicrobiologySummary:
      'Variável: bastonetes, cocos e anaeróbios conforme dentição, corpo estranho e extensão; fungos em contexto específico.',
    durationGuidance: 'Conforme resposta, exame de imagem e achado microbiológico; reavaliar se secreção persistir.',
    stewardshipNotes: [
      'Investigar corpo estranho, dentição e massa antes de ciclos longos empíricos.',
      'Amostra de qualidade evita tratar colonização de vias aéreas superiores.',
    ],
    interpretiveNotes: [
      'Epistaxe e obstrução nasal crônica exigem diagnóstico etiológico além do antimicrobiano.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_pneumo_outpatient_amox_clav'],
        alternativeRegimenIds: ['reg_pneumo_outpatient_doxy', 'reg_cistite_fq_alt'],
        rationaleBullets: [
          'Ambulatorial: beta-lactâmico + inibidor cobre patógenos típicos de vias aéreas e odontogênicos associados.',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_pneumo_inpatient_iv_beta_lactam'],
        alternativeRegimenIds: ['reg_pneumo_outpatient_amox_clav'],
        rationaleBullets: ['Internado: IV até melhora; depois transição VO com cultura se disponível.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_pneumo_inpatient_iv_beta_lactam'],
        alternativeRegimenIds: ['reg_pneumo_septic_combo'],
        rationaleBullets: ['Grave: monitorização; ampliar empiricamente só com critério clínico e protocolo.'],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_pneumo_septic_combo'],
        alternativeRegimenIds: ['reg_pneumo_inpatient_iv_beta_lactam'],
        rationaleBullets: ['Instável: foco nasal/orofaringe pode ser porta de sepse — amostras e suporte.'],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_rinite'],
  },

  traqueobronquite: {
    id: 'traqueobronquite',
    slug: 'traqueobronquite',
    label: 'Traqueobronquite infecciosa',
    synonyms: ['traqueobronquite', 'tosse dos canis', 'kennel cough', 'traqueíte infecciosa'],
    summary:
      'Síndrome respiratória alta de predominio autolimitado em muitos casos; antibiótico só quando critério clínico (febre, toxemia, pneumonia associada, comorbidades).',
    antibioticIndication: 'conditional',
    cultureRecommendation: 'optional',
    likelyMicrobiologySummary:
      'Bordetella, vírus e Mycoplasma (contexto); flora secundária se pneumonia sobreposta.',
    durationGuidance: 'Curso curto com reavaliação; prolongar só com complicação documentada.',
    stewardshipNotes: [
      'Evitar antibiótico para tosse isolada sem critério de complicação.',
      'Vacinação e biossegurança reduzem surtos.',
    ],
    interpretiveNotes: [
      'Quadro “ambulatorial estável” costuma ser observação; regimes abaixo são para complicação ou alto risco assistencial.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_pneumo_outpatient_doxy'],
        alternativeRegimenIds: ['reg_pneumo_outpatient_amox_clav'],
        rationaleBullets: [
          'Quando antibiótico é escolhido: doxiciclina é opção frequente em cães adultos conforme protocolo.',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_pneumo_inpatient_iv_beta_lactam'],
        alternativeRegimenIds: ['reg_pneumo_outpatient_doxy'],
        rationaleBullets: ['Internado sugere complicação ou desidratação — IV até transição.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_pneumo_inpatient_iv_beta_lactam'],
        alternativeRegimenIds: ['reg_pneumo_septic_combo'],
        rationaleBullets: ['Grave: considerar pneumonia sobreposta e monitorização.'],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_pneumo_septic_combo'],
        alternativeRegimenIds: ['reg_pneumo_inpatient_iv_beta_lactam'],
        rationaleBullets: ['Sepse: tratar como doença respiratória baixa complicada até prova contrária.'],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_traqueobronquite'],
  },

  oral_extracao_dentaria: {
    id: 'oral_extracao_dentaria',
    slug: 'oral_extracao_dentaria',
    label: 'Cavidade oral / extração dentária',
    synonyms: ['extração dentária', 'odontologia', 'cavidade oral', 'pós-exodontia'],
    summary:
      'Distingue procedimento odontológico eletivo sem indicação de profilaxia sistêmica de rotina vs cenários com infecção estabelecida ou risco assistencial elevado.',
    antibioticIndication: 'conditional',
    cultureRecommendation: 'optional',
    likelyMicrobiologySummary:
      'Profilaxia mira flora oral/periodontal; infecção estabelecida: anaeróbios e bastonetes conforme sítio.',
    durationGuidance:
      'Profilaxia perioperatória curta conforme protocolo; terapêutico até controle de foco odontológico.',
    stewardshipNotes: [
      'Não antibioticizar “por rotina” todas as extrações sem critério.',
      'Infecção com abscesso: drenagem e odontologia são centrais.',
    ],
    interpretiveNotes: [
      'Cenário ambulatorial “limpo” modela ausência de profilaxia sistêmica habitual; use alternativas se o protocolo local indicar.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_periop_clean_no_systemic'],
        alternativeRegimenIds: ['reg_cistite_simples_amox_clav'],
        rationaleBullets: [
          'Procedimento limpo sem fatores de risco: muitas vezes sem ATB sistêmico — confirmar protocolo local.',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_periop_single_dose_cefazolin'],
        alternativeRegimenIds: ['reg_cistite_complicated_iv'],
        rationaleBullets: ['Profilaxia perioperatória IV típica quando internação/indicação institucional.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_periop_contaminated_amp_sulb_met'],
        alternativeRegimenIds: ['reg_pyothorax_iv_amp_sulb_metronidazole'],
        rationaleBullets: ['Contaminação/infeção estabelecida: tratar como infecção de foco até cultura.'],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_pneumo_septic_combo'],
        alternativeRegimenIds: ['reg_sepsis_iv_broad_gn_anaerobe'],
        rationaleBullets: ['Sepse: estabilização, cultura se possível, controle cirúrgico do foco oral.'],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_oral_extracao'],
  },

  gengivite_periodontite: {
    id: 'gengivite_periodontite',
    slug: 'gengivite_periodontite',
    label: 'Gengivite e periodontite',
    synonyms: ['gengivite', 'periodontite', 'doença periodontal', 'boca infeccionada'],
    summary:
      'Primeira linha assistencial é odontologia (limpeza, extrações seletivas); antimicrobiano adjuvante quando infecção ativa/complicação o exige.',
    antibioticIndication: 'conditional',
    cultureRecommendation: 'optional',
    likelyMicrobiologySummary:
      'Flora oral mista (anaeróbios, bastonetes); cultura pouco rotineira salvo refratariedade ou abscesso profundo.',
    durationGuidance: 'Curso curto adjuvante à terapia local; evitar repetir sem reavaliação odontológica.',
    stewardshipNotes: [
      'Evitar múltiplos ciclos sem procedimento dentário — falha esperada.',
      'Clindamicina: considerar perfil de resistência local (ex.: MRSP) em cães.',
    ],
    interpretiveNotes: [
      'Gengivite leve sem sistêmica pode não precisar ATB; o módulo modela cenários com indicação farmacológica.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_cistite_simples_amox_clav'],
        alternativeRegimenIds: ['reg_piometra_oral_amox_clav_metronidazole', 'reg_oral_clindamycin_monotherapy'],
        rationaleBullets: [
          'VO: beta-lactâmico + inibidor; reforçar anaeróbios se abscesso fétido ou suspeita anaeróbia alta.',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_cistite_complicated_iv'],
        alternativeRegimenIds: ['reg_periop_contaminated_amp_sulb_met'],
        rationaleBullets: ['Internado: IV até procedimento/controle de foco; depois transição.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_periop_contaminated_amp_sulb_met'],
        alternativeRegimenIds: ['reg_pyothorax_iv_amp_sulb_metronidazole'],
        rationaleBullets: ['Grave: abscesso profundo ou extensão — cobertura anaeróbia e controle cirúrgico.'],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_sepsis_iv_broad_gn_anaerobe'],
        alternativeRegimenIds: ['reg_pneumo_septic_combo'],
        rationaleBullets: ['Sepse rara mas possível por foco odontogênico — tratar como sepse com foco cabeça/pescoço.'],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_gengivite_periodontite'],
  },

  fcgs: {
    id: 'fcgs',
    slug: 'fcgs',
    label: 'FCGS (estomatite crônica felina)',
    synonyms: ['fcgs', 'estomatite felina', 'gingivoestomatite crônica'],
    summary:
      'Doença imunoinflamatória multifatorial; antimicrobiano não é base da terapia salvo sobreinfeção documentada ou protocolo especializado.',
    antibioticIndication: 'conditional',
    cultureRecommendation: 'optional',
    likelyMicrobiologySummary:
      'Flora oral secundária se úlceras infectadas; Calicivírus e outros agentes virais no contexto inflamatório.',
    durationGuidance: 'Se ATB for usado: curso definido com reavaliação; evitar uso crônico sem critério.',
    stewardshipNotes: [
      'Priorizar extrações dentárias selecionadas e manejo da dor conforme especialista.',
      'Evitar repetir o mesmo esquema sem controle de foco e sem cultura em falhas.',
    ],
    interpretiveNotes: [
      'Doxiciclina aparece em protocolos por efeito anti-inflamatório e cobertura parcial — não confundir com “cura única”.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_fcgs_first_line_non_antibiotic'],
        alternativeRegimenIds: ['reg_pneumo_outpatient_doxy', 'reg_pneumo_outpatient_amox_clav'],
        rationaleBullets: [
          'Primeira linha modelada sem ATB obrigatório; alternativas para cenários com indicação contextual.',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_pneumo_inpatient_iv_beta_lactam'],
        alternativeRegimenIds: ['reg_pneumo_outpatient_amox_clav'],
        rationaleBullets: ['Internado: IV se desidratação, dor intensa ou complicação sistêmica — individualizar.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_pneumo_inpatient_iv_beta_lactam'],
        alternativeRegimenIds: ['reg_pneumo_septic_combo'],
        rationaleBullets: ['Grave: suspeitar sobreinfeção secundária e necessidade de suporte.'],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_pneumo_septic_combo'],
        alternativeRegimenIds: ['reg_sepsis_iv_broad_gn_anaerobe'],
        rationaleBullets: ['Instável: tratar como sepse até estabilização e definição de foco.'],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_fcgs_syndrome'],
  },

  ferida_mordedura: {
    id: 'ferida_mordedura',
    slug: 'ferida_mordedura',
    label: 'Feridas por mordedura',
    synonyms: ['mordedura', 'mordida', 'bite wound', 'ferida penetrante'],
    summary:
      'Inoculação polimicrobiana (boca/anal/perianal conforme contexto); anaeróbios e bastonetes são comuns. Lavagem, drenagem e imagem quando profunda.',
    antibioticIndication: 'yes_empiric',
    cultureRecommendation: 'strong',
    likelyMicrobiologySummary:
      'Pasteurella e outros Gram-negativos, estafilococos, estreptococos, anaeróbios; risco de flora entérica em alguns cenários.',
    durationGuidance: 'Curso conforme profundidade, resposta e cultura; revisar em 24–48 h se piora local ou sistêmica.',
    stewardshipNotes: [
      'Amostra de ferida antes de mudanças repetidas de esquema quando possível.',
      'Vacinação antirrábica e lei local além do ATB.',
    ],
    interpretiveNotes: [
      'Feridas puncture profundas e próximo a articulações exigem alta suspeita de complicações ortopédicas.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_piometra_oral_amox_clav_metronidazole'],
        alternativeRegimenIds: ['reg_cistite_simples_amox_clav'],
        rationaleBullets: [
          'Ambulatorial: amoxi-clavul + metronidazol cobre patógenos típicos de mordedura e anaeróbios.',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_periop_contaminated_amp_sulb_met'],
        alternativeRegimenIds: ['reg_pyothorax_iv_amp_sulb_metronidazole'],
        rationaleBullets: ['Internado: IV empírico até cultura e desbridamento quando necessário.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_pyothorax_iv_amp_sulb_metronidazole'],
        alternativeRegimenIds: ['reg_pneumo_septic_combo'],
        rationaleBullets: ['Grave: celulite extensa ou toxemia — espectro ampliado e suporte.'],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_sepsis_iv_broad_gn_anaerobe'],
        alternativeRegimenIds: ['reg_sepsis_iv_amp_gent_met'],
        rationaleBullets: ['Sepse: hemocultura se possível; controle cirúrgico do foco.'],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_mordedura'],
  },

  artrite_septica: {
    id: 'artrite_septica',
    slug: 'artrite_septica',
    label: 'Artrite séptica',
    synonyms: ['artrite séptica', 'artrite infecciosa', 'junta infeccionada'],
    summary:
      'Emergência ortopédica/infecciosa: aspirado articular e cultura guiam terapia; antibiótico empírico até resultados com suporte adequado.',
    antibioticIndication: 'yes_after_sampling',
    cultureRecommendation: 'strong',
    likelyMicrobiologySummary:
      'Staphylococcus e Streptococcus frequentes; Gram-negativos em filhotes ou cenários específicos; considerar anaeróbios se inoculação por mordedura.',
    durationGuidance: 'Prolongada IV inicialmente; transição VO conforme cultura, estabilidade e desfecho cirúrgico.',
    stewardshipNotes: [
      'Drenagem/ lavado articular ou cirurgia podem ser necessários — ATB isolado falha se pus organizado.',
      'Evitar monoterapia oral precoce sem controle de foco.',
    ],
    interpretiveNotes: [
      '“Ambulatorial estável” é raro na apresentação clássica — o motor prioriza internação no modelo.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_cistite_complicated_iv'],
        alternativeRegimenIds: ['reg_pyelo_iv_amp_sulb_enro'],
        rationaleBullets: [
          'Se classificado como ambulatorial, confirme ausência de sepse e defina punção/cultura urgentes.',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_cistite_complicated_iv'],
        alternativeRegimenIds: ['reg_pyothorax_iv_amp_sulb_metronidazole'],
        rationaleBullets: ['IV beta-lactâmico empírico até cultura do líquido articular; ajustar por sensibilidade.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_pyelo_iv_amp_sulb_enro'],
        alternativeRegimenIds: ['reg_piometra_iv_beta_lactam_aminoglycoside_metronidazole'],
        rationaleBullets: ['Grave: ampliar empiricamente com critério institucional e função renal.'],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_sepsis_iv_amp_gent_met'],
        alternativeRegimenIds: ['reg_sepsis_iv_broad_gn_anaerobe'],
        rationaleBullets: ['Sepse: estabilização + empirismo IV amplo; controle ortopédico do foco.'],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_artrite_septica'],
  },

  osteomielite: {
    id: 'osteomielite',
    slug: 'osteomielite',
    label: 'Osteomielite',
    synonyms: ['osteomielite', 'infecção óssea', 'osso infeccionado'],
    summary:
      'Infecção óssea frequentemente prolongada; cultura de material ósseo/pus e imagem guiam terapia. Controle cirúrgico do foco costuma ser central.',
    antibioticIndication: 'yes_after_sampling',
    cultureRecommendation: 'strong',
    likelyMicrobiologySummary:
      'Staphylococcus spp. comum; Gram-negativos e anaeróbios conforme trauma, mordedura ou cirurgia prévia.',
    durationGuidance: 'Terapia prolongada relativa à resposta clínica, desbridamento e culturas de controle.',
    stewardshipNotes: [
      'Biofilme e necrose óssea limitam sucesso de ATB sem procedimento.',
      'Descalonar com antibiograma; evitar esquema amplo indefinido.',
    ],
    interpretiveNotes: [
      'Quadro “ambulatorial estável” inicial ainda exige confirmação de ausência de sepse e plano de amostragem.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_cistite_complicated_iv'],
        alternativeRegimenIds: ['reg_pyelo_iv_amp_sulb_enro'],
        rationaleBullets: ['Ambulatorial no modelo ainda prioriza IV empírico até definição — revisar gravidade real.'],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_cistite_complicated_iv'],
        alternativeRegimenIds: ['reg_pyothorax_iv_amp_sulb_metronidazole'],
        rationaleBullets: ['IV empírico até cultura; considerar anaeróbios se contexto de mordedura ou tecido necrótico.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_pyelo_iv_amp_sulb_enro'],
        alternativeRegimenIds: ['reg_piometra_iv_beta_lactam_aminoglycoside_metronidazole'],
        rationaleBullets: ['Grave: espectro ampliado e monitorização; ajuste renal obrigatório com aminoglicosídeo.'],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_sepsis_iv_broad_gn_anaerobe'],
        alternativeRegimenIds: ['reg_sepsis_iv_amp_gent_met'],
        rationaleBullets: ['Sepse: tratar foco ósseo como fonte até controle cirúrgico e estabilização.'],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_osteomielite'],
  },

  bacteriuria_subclinica: {
    id: 'bacteriuria_subclinica',
    slug: 'bacteriuria_subclinica',
    label: 'Bacteriúria subclínica (assintomática)',
    synonyms: ['bacteriúria assintomática', 'subclínica', 'colonização urinária'],
    summary:
      'Urina com crescimento bacteriano sem sinais clínicos compatíveis com ITU: em geral não tratar, salvo exceções protocolares.',
    antibioticIndication: 'no_not_routine',
    cultureRecommendation: 'recommended',
    likelyMicrobiologySummary:
      'Enterobacterales e outros conforme meio; interpretar colonização vs infecção pelo quadro clínico.',
    durationGuidance: 'Sem tratamento de rotina; se exceção institucional, curso definido por protocolo e reavaliação.',
    stewardshipNotes: [
      'Evitar tratar urinocultura “positiva” isolada sem sintoma.',
      'Repetir amostra se dúvida de contaminação.',
    ],
    interpretiveNotes: [
      'Alternativa com beta-lactâmico modela via excepcional (ex.: preparo para procedimento) — não é padrão universal.',
    ],
    scenarios: {
      ambulatory_stable: {
        firstLineRegimenIds: ['reg_bacteriuria_subclinical_no_antibiotic'],
        alternativeRegimenIds: ['reg_cistite_simples_amox_clav'],
        rationaleBullets: [
          'Primeira linha: observação; tratar só com critério explícito (protocolo local / caso especial).',
        ],
      },
      hospitalized: {
        firstLineRegimenIds: ['reg_bacteriuria_subclinical_no_antibiotic'],
        alternativeRegimenIds: ['reg_cistite_complicated_iv'],
        rationaleBullets: ['Internado com achado de urinocultura: revisar se há ITU sintomática ou outro foco sistêmico.'],
      },
      severe: {
        firstLineRegimenIds: ['reg_bacteriuria_subclinical_no_antibiotic'],
        alternativeRegimenIds: ['reg_cistite_complicated_iv'],
        rationaleBullets: [
          'Gravidade sistêmica deve redirecionar o diagnóstico (ITU alta, sepse) — não ficar no rótulo “subclínica” sozinho.',
        ],
      },
      septic_unstable: {
        firstLineRegimenIds: ['reg_pyelo_iv_amp_sulb_enro'],
        alternativeRegimenIds: ['reg_sepsis_iv_broad_gn_anaerobe'],
        rationaleBullets: [
          'Sepse: tratar o paciente, não a cultura isolada — buscar foco urinário/obstrutivo e estabilizar.',
        ],
      },
    },
    globalAvoidMoleculeIds: [],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_bacteriuria_subclinica'],
  },
}
