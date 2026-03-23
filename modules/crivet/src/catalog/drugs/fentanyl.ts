import { Drug } from '../../shared/types/drug';

export const fentanyl: Drug = {
  id: 'fentanyl',
  namePt: 'Fentanil',
  nameEn: 'Fentanyl',
  synonyms: ['Citrato de Fentanila'],
  category: 'opioides',
  pharmacologicalClass: 'Analgésico Opioide (Agonista Mu)',
  clinicalSummary: 'Opioide sintético de curta duração e ação rápida, ideal para analgesia transoperatória e infusão contínua para dor moderada a grave.',
  physiology: 'Agonista forte e seletivo dos receptores opioides mu (μ) no sistema nervoso central. Inibe as vias ascendentes da dor e altera a percepção da dor. Possui alta lipossolubilidade, o que explica seu rápido início de ação e curta duração (redistribuição).',
  indications: [
    'Analgesia de resgate intraoperatória',
    'Infusão contínua para dor moderada a grave (CRI)',
    'Anestesia balanceada (redução da CAM de inalatórios)',
    'Indução anestésica em pacientes cardiopatas (associado a benzodiazepínicos)'
  ],
  contraindications: [
    'Pacientes com histórico de hipersensibilidade a opioides',
    'Cautela extrema em pacientes com aumento da pressão intracraniana (PIC) sem ventilação controlada',
    'Cautela em hepatopatas graves (metabolismo hepático)'
  ],
  advantages: [
    'Início de ação muito rápido (1-2 minutos IV)',
    'Excelente estabilidade cardiovascular (não causa liberação de histamina ou depressão miocárdica direta)',
    'Reduz significativamente a necessidade de anestésicos inalatórios (poupador de CAM)'
  ],
  limitations: [
    'Duração de ação muito curta após bolus único (20-30 min), exigindo infusão contínua ou bolus repetidos',
    'Pode causar bradicardia vagal profunda',
    'Pode causar depressão respiratória dose-dependente'
  ],
  commonProblems: [
    'Bradicardia',
    'Depressão respiratória / Apneia',
    'Disforia (especialmente em gatos ou na recuperação sem sedação adequada)',
    'Retenção urinária'
  ],
  usageErrors: [
    'Administração em bolus muito rápido (pode causar rigidez muscular torácica)',
    'Uso como agente único para procedimentos dolorosos (não produz inconsciência)',
    'Falha em antecipar a necessidade de ventilação mecânica em altas doses'
  ],
  supportedSpecies: ['dog', 'cat'],
  allowedRegimes: ['CRI', 'bolus', 'bolus_maintenance'],
  highAlert: true,
  
  doses: {
    dog: { min: 2, max: 20, unit: 'mcg/kg/h', observations: 'Doses acima de 10 mcg/kg/h geralmente requerem ventilação mecânica controlada.' },
    cat: { min: 2, max: 10, unit: 'mcg/kg/h', observations: 'Gatos são mais sensíveis à disforia. Doses acima de 5 mcg/kg/h requerem monitoramento rigoroso.' }
  },
  bolusDoses: {
    dog: { min: 2, max: 10, unit: 'mcg/kg', observations: 'Administrar lentamente (ao longo de 1-2 minutos) para evitar rigidez muscular e apneia súbita.' },
    cat: { min: 1, max: 5, unit: 'mcg/kg', observations: 'Titular ao efeito.' }
  },
  
  preferredUnit: 'mcg/kg/h',
  allowedUnits: ['mcg/kg/h', 'mcg/kg/min'],
  
  presentations: [
    {
      id: 'fentanyl-50-2ml',
      description: 'Citrato de Fentanila 50 mcg/mL - Ampola 2 mL',
      concentration: 50,
      concentrationUnit: 'mcg/mL',
      volume: 2
    },
    {
      id: 'fentanyl-50-10ml',
      description: 'Citrato de Fentanila 50 mcg/mL - Ampola 10 mL',
      concentration: 50,
      concentrationUnit: 'mcg/mL',
      volume: 10
    }
  ],
  
  safetyMetadata: {
    preferredDiluent: 'NaCl 0.9%',
    allowedDiluents: ['NaCl 0.9%', 'Ringer Lactato', 'Glicose 5%'],
    notRecommendedDiluents: [],
    centralAccessRequired: false,
    centralAccessPreferred: false,
    peripheralAllowed: true,
    syringePumpRequired: true, // Recomendado para precisão em CRI
    dedicatedLineRequired: false,
    photosensitive: false,
    stabilityAfterDilution: '24 horas em temperatura ambiente',
    incompatibilities: ['Tiopental', 'Metoxital', 'Fenitoína'],
    recommendedMonitoring: ['Frequência cardíaca', 'Frequência respiratória', 'Pressão arterial', 'Oximetria de pulso', 'Capnografia (se intubado)']
  },
  
  alerts: [
    {
      id: 'fentanyl-bradycardia',
      condition: (patient) => patient.comorbidities.includes('cardiopath'),
      message: 'Atenção em cardiopatas: Fentanil pode causar bradicardia vagal significativa, reduzindo o débito cardíaco. Considere uso prévio ou concomitante de anticolinérgicos (atropina/glicopirrolato) se a frequência cardíaca cair excessivamente.',
      level: 'warning'
    },
    {
      id: 'fentanyl-respiratory',
      condition: (patient) => patient.comorbidities.includes('respiratory_disease'),
      message: 'Risco de depressão respiratória severa. Monitorar padrão respiratório, SpO2 e EtCO2. Esteja preparado para intubação e ventilação com pressão positiva.',
      level: 'danger'
    },
    {
      id: 'fentanyl-cat-dysphoria',
      condition: (patient, dose, unit) => patient.species === 'cat' && unit === 'mcg/kg/h' && dose > 5,
      message: 'Doses de infusão acima de 5 mcg/kg/h em gatos aumentam significativamente o risco de disforia, excitação e hipertermia. Considere associar sedativos (ex: dexmedetomidina, acepromazina) ou reduzir a dose.',
      level: 'warning'
    },
    {
      id: 'fentanyl-high-dose-dog',
      condition: (patient, dose, unit) => patient.species === 'dog' && unit === 'mcg/kg/h' && dose > 10,
      message: 'Doses de infusão elevadas (>10 mcg/kg/h) frequentemente resultam em hipoventilação ou apneia. Ventilação mecânica é fortemente recomendada.',
      level: 'warning'
    },
    {
      id: 'fentanyl-neuro',
      condition: (patient) => patient.comorbidities.includes('neurological_disease'),
      message: 'A depressão respiratória induzida pelo fentanil pode causar hipercapnia, o que leva à vasodilatação cerebral e aumento da Pressão Intracraniana (PIC). Garantir normocapnia através de ventilação adequada.',
      level: 'warning'
    }
  ],
  
  adverseEffects: ['Bradicardia vagal', 'Depressão respiratória dose-dependente', 'Disforia e vocalização (especialmente na recuperação)', 'Rigidez muscular (com bolus rápido)', 'Retenção urinária', 'Íleo paralítico (uso prolongado)'],
  
  detailedInfo: {
    mechanismOfAction: 'Agonista seletivo dos receptores opioides mu (μ) no cérebro e na medula espinhal. Inibe a liberação de neurotransmissores nociceptivos (como a Substância P) e hiperpolariza os neurônios pós-sinápticos.',
    metabolism: 'Hepático (citocromo P450, principalmente CYP3A4). A meia-vida sensível ao contexto aumenta significativamente após infusões prolongadas (>2-4 horas), retardando a recuperação.',
    excretion: 'Renal (metabólitos inativos).',
    onsetOfAction: '1 a 2 minutos (IV).',
    durationOfAction: '20 a 30 minutos após bolus único (devido à rápida redistribuição para tecidos adiposos e musculares).',
    speciesDifferences: 'Gatos são mais propensos a excitação central (disforia) e hipertermia com doses altas em comparação aos cães.',
    clinicalObservations: 'Pode ser revertido com antagonistas puros (Naloxona). A bradicardia responde bem à atropina ou glicopirrolato. Para evitar rigidez muscular torácica ("chest wall rigidity"), administrar bolus lentamente.'
  },
  
  references: ["Plumb's Veterinary Drug Handbook", "Tratado de Anestesiologia Veterinária", "Lumb and Jones' Veterinary Anesthesia and Analgesia"]
};
