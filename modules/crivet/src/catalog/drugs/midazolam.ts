import { Drug } from '../../shared/types/drug';

export const midazolam: Drug = {
  id: 'midazolam',
  namePt: 'Midazolam',
  nameEn: 'Midazolam',
  synonyms: ['Dormonid', 'Midazolam'],
  category: 'sedativos_tranquilizantes',
  pharmacologicalClass: 'Benzodiazepínico',
  clinicalSummary: 'Sedativo, relaxante muscular e anticonvulsivante hidrossolúvel. Efeito mais rápido e curto que o diazepam, com excelente absorção IM.',
  physiology: 'Potencializa a ação do GABA (ácido gama-aminobutírico) no receptor GABA-A. Causa depressão do SNC, relaxamento muscular esquelético e atividade anticonvulsivante. Possui efeitos cardiovasculares e respiratórios mínimos em doses terapêuticas. Em pH fisiológico, torna-se altamente lipofílico, cruzando rapidamente a barreira hematoencefálica.',
  indications: [
    'Pré-medicação anestésica (em associação com opioides ou cetamina)',
    'Tratamento de emergência de convulsões (via IV, IM ou intranasal)',
    'Relaxamento muscular (ex: obstrução uretral em gatos)',
    'Indução anestésica em pacientes cardiopatas ou instáveis (co-indução com propofol ou cetamina)'
  ],
  contraindications: [
    'Hipersensibilidade aos benzodiazepínicos',
    'Insuficiência hepática severa (metabolismo hepático extenso)',
    'Uso isolado em animais jovens e saudáveis (alto risco de excitação paradoxal)'
  ],
  advantages: [
    'Hidrossolúvel: não causa dor à injeção IV ou IM',
    'Excelente e rápida absorção intramuscular (IM) e intranasal (IN)',
    'Início de ação mais rápido e duração mais curta que o diazepam',
    'Mínima depressão cardiovascular e respiratória'
  ],
  limitations: [
    'Sedação não confiável em animais jovens e saudáveis (risco de excitação paradoxal)',
    'Não possui efeito analgésico',
    'Pode causar depressão respiratória se administrado rapidamente em altas doses IV'
  ],
  commonProblems: [
    'Excitação paradoxal, agitação e vocalização (especialmente se usado isoladamente)',
    'Ataxia e incoordenação',
    'Hipotensão leve se administrado rapidamente IV'
  ],
  usageErrors: [
    'Uso como sedativo único em animais saudáveis',
    'Administração IV rápida em pacientes instáveis (pode causar apneia transitória)'
  ],
  supportedSpecies: ['dog', 'cat'],
  allowedRegimes: ['bolus', 'CRI'],
  highAlert: false,
  
  doses: {
    dog: { min: 0.1, max: 0.5, unit: 'mg/kg/h', observations: 'CRI: 0.1 - 0.5 mg/kg/h (para controle de convulsões refratárias).' },
    cat: { min: 0.1, max: 0.5, unit: 'mg/kg/h', observations: 'CRI: 0.1 - 0.5 mg/kg/h.' }
  },
  bolusDoses: {
    dog: { min: 0.1, max: 0.5, unit: 'mg/kg', observations: 'Pré-medicação/Co-indução: 0.1-0.3 mg/kg IV/IM. Convulsão: 0.2-0.5 mg/kg IV/IM/IN.' },
    cat: { min: 0.1, max: 0.5, unit: 'mg/kg', observations: 'Pré-medicação/Co-indução: 0.1-0.3 mg/kg IV/IM. Convulsão: 0.2-0.5 mg/kg IV/IM/IN.' }
  },
  
  preferredUnit: 'mg/kg',
  allowedUnits: ['mg/kg', 'mg/kg/h'],
  
  presentations: [
    {
      id: 'midazolam_5mg_ml',
      description: 'Midazolam 5 mg/mL - Ampola 3 mL',
      concentration: 5,
      concentrationUnit: 'mg/mL',
      volume: 3
    },
    {
      id: 'midazolam_1mg_ml',
      description: 'Midazolam 1 mg/mL - Ampola 5 mL',
      concentration: 1,
      concentrationUnit: 'mg/mL',
      volume: 5
    }
  ],
  
  safetyMetadata: {
    preferredDiluent: 'NaCl 0.9%',
    allowedDiluents: ['NaCl 0.9%', 'Glicose 5%', 'Ringer Lactato'],
    notRecommendedDiluents: [],
    centralAccessRequired: false,
    centralAccessPreferred: false,
    peripheralAllowed: true,
    syringePumpRequired: false,
    dedicatedLineRequired: false,
    photosensitive: true,
    stabilityAfterDilution: 'Estável por 24 horas após diluição. Proteger da luz.',
    incompatibilities: ['Dexametasona', 'Furosemida', 'Pentobarbital', 'Propofol (na mesma seringa)'],
    recommendedMonitoring: ['Grau de sedação', 'Padrão respiratório (se em altas doses ou associado a outros depressores)']
  },
  
  alerts: [
    {
      id: 'midazolam-paradoxical',
      condition: (patient) => true,
      message: 'ALERTA DE EXCITAÇÃO: O midazolam frequentemente causa excitação paradoxal, agitação e disforia quando usado isoladamente em cães e gatos saudáveis. Deve ser sempre associado a um opioide, alfa-2 agonista ou anestésico dissociativo.',
      level: 'warning'
    },
    {
      id: 'midazolam-im-in',
      condition: (patient) => true,
      message: 'Diferente do diazepam, o midazolam é hidrossolúvel e tem excelente e rápida absorção pelas vias intramuscular (IM) e intranasal (IN), sendo ideal para controle de convulsões quando não há acesso IV.',
      level: 'info'
    }
  ],
  
  adverseEffects: ['Excitação paradoxal', 'Ataxia', 'Depressão respiratória (altas doses IV)', 'Hipotensão leve'],
  
  detailedInfo: {
    mechanismOfAction: 'Potencializa a inibição mediada pelo GABA no SNC.',
    metabolism: 'Hepático (oxidação microssomal - CYP450). Produz metabólitos ativos (alfa-hidroximidazolam), mas com meia-vida muito curta.',
    excretion: 'Renal.',
    onsetOfAction: 'IV: 1-3 minutos. IM/IN: 5-15 minutos.',
    durationOfAction: 'Cães e Gatos: 1-2 horas.',
    speciesDifferences: 'A resposta é semelhante em cães e gatos. Gatos podem apresentar ataxia prolongada.',
    clinicalObservations: 'O midazolam é superior ao diazepam para uso IM e IN devido à sua hidrossolubilidade. É um excelente co-indutor anestésico, permitindo reduzir significativamente a dose de propofol ou alfaxalona, minimizando a depressão cardiovascular.'
  },
  
  references: ["Plumb's Veterinary Drug Handbook", "Veterinary Anesthesia and Analgesia (Lumb and Jones)"]
};
