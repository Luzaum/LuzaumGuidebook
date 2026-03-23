import { Drug } from '../../shared/types/drug';

export const diazepam: Drug = {
  id: 'diazepam',
  namePt: 'Diazepam',
  nameEn: 'Diazepam',
  synonyms: ['Valium', 'Compaz'],
  category: 'sedativos_tranquilizantes',
  pharmacologicalClass: 'Benzodiazepínico',
  clinicalSummary: 'Anticonvulsivante de primeira linha e miorrelaxante. Efeito sedativo leve em cães e gatos saudáveis, mas pode causar excitação paradoxal.',
  physiology: 'Potencializa a ação do GABA (ácido gama-aminobutírico), o principal neurotransmissor inibitório do SNC, ao se ligar ao receptor GABA-A. Causa depressão do SNC, relaxamento muscular esquelético e atividade anticonvulsivante. Possui efeitos cardiovasculares e respiratórios mínimos em doses terapêuticas.',
  indications: [
    'Tratamento de emergência do status epilepticus (convulsões ativas)',
    'Relaxamento muscular (ex: obstrução uretral em gatos, tétano)',
    'Pré-medicação anestésica (em associação com opioides ou cetamina)',
    'Estimulante de apetite (uso histórico em gatos, hoje obsoleto devido à toxicidade hepática)'
  ],
  contraindications: [
    'Hipersensibilidade aos benzodiazepínicos',
    'Insuficiência hepática severa (metabolismo hepático extenso)',
    'Gatos (uso oral repetido contraindicado devido ao risco de necrose hepática aguda idiossincrática)'
  ],
  advantages: [
    'Excelente e rápido efeito anticonvulsivante IV',
    'Mínima depressão cardiovascular e respiratória',
    'Bom relaxamento muscular'
  ],
  limitations: [
    'Solubilidade em propilenoglicol (pode causar dor na injeção IV, flebite e absorção errática via IM)',
    'Sedação não confiável em animais jovens e saudáveis (risco de excitação paradoxal)',
    'Não possui efeito analgésico',
    'Adsorve-se a plásticos (seringas, equipos) se armazenado por longos períodos'
  ],
  commonProblems: [
    'Excitação paradoxal, agitação e vocalização (especialmente se usado isoladamente)',
    'Dor à injeção IV e flebite',
    'Ataxia e incoordenação'
  ],
  usageErrors: [
    'Administração IM (absorção dolorosa e imprevisível, exceto em formulações específicas)',
    'Uso como sedativo único em animais saudáveis',
    'Mistura na mesma seringa com outras drogas (precipita com a maioria, exceto cetamina)',
    'Uso oral em gatos (risco de falência hepática fatal)'
  ],
  supportedSpecies: ['dog', 'cat'],
  allowedRegimes: ['bolus', 'CRI'],
  highAlert: false,
  
  doses: {
    dog: { min: 0.5, max: 2.0, unit: 'mg/kg/h', observations: 'CRI: 0.5 - 2.0 mg/kg/h (para controle de convulsões refratárias).' },
    cat: { min: 0.5, max: 1.0, unit: 'mg/kg/h', observations: 'CRI: 0.5 - 1.0 mg/kg/h.' }
  },
  bolusDoses: {
    dog: { min: 0.5, max: 1.0, unit: 'mg/kg', observations: 'Convulsão: 0.5-1.0 mg/kg IV (pode repetir até 3x). Pré-medicação: 0.2-0.5 mg/kg IV.' },
    cat: { min: 0.5, max: 1.0, unit: 'mg/kg', observations: 'Convulsão: 0.5-1.0 mg/kg IV ou retal. Pré-medicação: 0.2-0.5 mg/kg IV.' }
  },
  
  preferredUnit: 'mg/kg',
  allowedUnits: ['mg/kg', 'mg/kg/h'],
  
  presentations: [
    {
      id: 'diazepam_5mg_ml',
      description: 'Diazepam 5 mg/mL - Ampola 2 mL',
      concentration: 5,
      concentrationUnit: 'mg/mL',
      volume: 2
    }
  ],
  
  safetyMetadata: {
    preferredDiluent: 'NaCl 0.9%',
    allowedDiluents: ['NaCl 0.9%', 'Glicose 5%'],
    notRecommendedDiluents: ['Ringer Lactato'],
    centralAccessRequired: false,
    centralAccessPreferred: false,
    peripheralAllowed: true,
    syringePumpRequired: false,
    dedicatedLineRequired: false,
    photosensitive: true,
    stabilityAfterDilution: 'Precipita facilmente. Se diluído para CRI, usar grandes volumes (ex: 50mg em 500mL) e proteger da luz. Trocar a solução a cada 12h devido à adsorção ao plástico.',
    incompatibilities: ['A maioria das drogas (precipita). Exceção notável: Cetamina (podem ser misturados na mesma seringa).'],
    recommendedMonitoring: ['Grau de sedação', 'Padrão respiratório (se em altas doses ou associado a outros depressores)']
  },
  
  alerts: [
    {
      id: 'diazepam-im-absorption',
      condition: (patient) => true,
      message: 'A absorção intramuscular (IM) do diazepam é errática, dolorosa e não confiável devido ao veículo propilenoglicol. A via intravenosa (IV) é a de escolha. Para convulsões sem acesso IV, a via retal é uma alternativa viável.',
      level: 'warning'
    },
    {
      id: 'diazepam-cat-hepatic',
      condition: (patient) => patient.species === 'cat',
      message: 'ALERTA GATOS: O uso ORAL repetido de diazepam em gatos está associado a necrose hepática aguda idiossincrática fatal. O uso IV em dose única é geralmente seguro.',
      level: 'danger'
    },
    {
      id: 'diazepam-precipitation',
      condition: (patient) => true,
      message: 'O diazepam precipita facilmente quando misturado com outras drogas ou fluidos. Lave o cateter com salina antes e depois da administração.',
      level: 'warning'
    }
  ],
  
  adverseEffects: ['Excitação paradoxal', 'Ataxia', 'Flebite', 'Necrose hepática (gatos, via oral)'],
  
  detailedInfo: {
    mechanismOfAction: 'Potencializa a inibição mediada pelo GABA no SNC.',
    metabolism: 'Hepático (oxidação microssomal e glicuronidação). Produz metabólitos ativos (desmetildiazepam, oxazepam), o que prolonga seu efeito.',
    excretion: 'Renal.',
    onsetOfAction: 'IV: 1-5 minutos.',
    durationOfAction: 'Cães: 1-4 horas. Gatos: até 5 horas.',
    speciesDifferences: 'Gatos são muito sensíveis à toxicidade hepática com uso oral. Cães metabolizam rapidamente, necessitando de doses frequentes ou CRI para controle prolongado de convulsões.',
    clinicalObservations: 'Para sedação em animais saudáveis, o midazolam ou a dexmedetomidina são superiores. O diazepam brilha no controle emergencial de convulsões.'
  },
  
  references: ["Plumb's Veterinary Drug Handbook", "Veterinary Anesthesia and Analgesia (Lumb and Jones)"]
};
