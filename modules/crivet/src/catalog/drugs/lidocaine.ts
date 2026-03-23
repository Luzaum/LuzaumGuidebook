import { Drug } from '../../shared/types/drug';

export const lidocaine: Drug = {
  id: 'lidocaine',
  namePt: 'Lidocaína',
  nameEn: 'Lidocaine',
  synonyms: ['Xylocaína', 'Cloridrato de Lidocaína'],
  category: 'antiarritmicos',
  pharmacologicalClass: 'Anestésico Local (Amida) / Antiarrítmico Classe Ib',
  clinicalSummary: 'Anestésico local do tipo amida e antiarrítmico ventricular. Usado em infusão contínua (CRI) para analgesia sistêmica, redução da CAM de inalatórios e efeito pró-cinético gastrointestinal.',
  physiology: 'Bloqueia os canais de sódio voltagem-dependentes (fase 0 do potencial de ação), diminuindo a taxa de despolarização e a velocidade de condução. No coração, atua preferencialmente em tecidos isquêmicos (ventrículos), encurtando o potencial de ação e o período refratário efetivo. Sistemicamente, reduz a transmissão de impulsos nociceptivos e possui propriedades anti-inflamatórias e pró-cinéticas.',
  indications: [
    'Tratamento de arritmias ventriculares (Taquicardia Ventricular, CVP frequentes/multiformes) - Principalmente em cães',
    'Analgesia sistêmica adjuvante em infusão contínua (CRI)',
    'Tratamento de íleo paralítico pós-operatório (cães)',
    'Redução da necessidade de anestésicos inalatórios (poupador de CAM)',
    'Anestesia local, regional ou epidural'
  ],
  contraindications: [
    'Pacientes com bloqueio atrioventricular (BAV) de 2º ou 3º grau sem marca-passo',
    'Ritmo de escape idioventricular (a lidocaína pode suprimir o único marcapasso viável)',
    'Hipersensibilidade a anestésicos locais do tipo amida',
    'Uso sistêmico em gatos (relativo/contraindicado na maioria dos casos devido à alta toxicidade)'
  ],
  advantages: [
    'Rápido início de ação IV (1-2 minutos)',
    'Efeito analgésico sistêmico significativo sem causar sedação profunda ou depressão respiratória (em doses terapêuticas)',
    'Propriedades pró-cinéticas úteis em cirurgias gastrointestinais (cães)'
  ],
  limitations: [
    'Janela terapêutica estreita, especialmente em gatos',
    'Eficácia antiarrítmica limitada a arritmias ventriculares (ineficaz em arritmias supraventriculares)',
    'Metabolismo hepático dependente do fluxo sanguíneo (reduzir dose em choque ou insuficiência cardíaca)'
  ],
  commonProblems: [
    'Tremores musculares e fasciculações (sinal precoce de toxicidade)',
    'Nistagmo e ataxia',
    'Convulsões (toxicidade grave)',
    'Hipotensão e bradicardia (em altas doses ou injeção rápida)'
  ],
  usageErrors: [
    'Uso de formulações contendo epinefrina (vasoconstritor) por via intravenosa',
    'Administração de bolus rápido (aumenta o risco de convulsões e hipotensão)',
    'Uso sistêmico em gatos sem monitoramento intensivo e doses drasticamente reduzidas'
  ],
  supportedSpecies: ['dog', 'cat'],
  allowedRegimes: ['CRI', 'bolus', 'bolus_maintenance'],
  highAlert: true,
  
  doses: {
    dog: { min: 20, max: 80, unit: 'mcg/kg/min', observations: 'Para analgesia/pró-cinético: 20-50 mcg/kg/min. Para arritmias: 50-80 mcg/kg/min.' },
    cat: { min: 5, max: 20, unit: 'mcg/kg/min', observations: 'USO EXTREMAMENTE CAUTELOSO. Muitos autores não recomendam CRI em gatos. Se necessário, não exceder 20 mcg/kg/min.' }
  },
  bolusDoses: {
    dog: { min: 1, max: 2, unit: 'mg/kg', observations: 'Pode ser repetido até um máximo de 8 mg/kg no total. Administrar lentamente.' },
    cat: { min: 0.25, max: 0.5, unit: 'mg/kg', observations: 'Administrar muito lentamente. Risco altíssimo de toxicidade neurológica e cardiovascular.' }
  },
  
  preferredUnit: 'mcg/kg/min',
  allowedUnits: ['mcg/kg/min', 'mg/kg/h', 'mg/kg/min'],
  
  presentations: [
    {
      id: 'lidocaine_2_percent',
      description: 'Cloridrato de Lidocaína 2% SEM vasoconstritor (20 mg/mL) - Frasco 20 mL',
      concentration: 20,
      concentrationUnit: 'mg/mL',
      volume: 20
    }
  ],
  
  safetyMetadata: {
    preferredDiluent: 'NaCl 0.9%',
    allowedDiluents: ['NaCl 0.9%', 'Ringer Lactato', 'Glicose 5%'],
    notRecommendedDiluents: [],
    centralAccessRequired: false,
    centralAccessPreferred: false,
    peripheralAllowed: true,
    syringePumpRequired: true, // Essencial devido à janela terapêutica estreita
    dedicatedLineRequired: false,
    photosensitive: false,
    stabilityAfterDilution: 'Estável por 24h após diluição em temperatura ambiente',
    incompatibilities: ['Soluções alcalinas (precipita)', 'Cefazolina', 'Fenitoína'],
    recommendedMonitoring: ['ECG contínuo (obrigatório se uso antiarrítmico)', 'Sinais neurológicos (tremores, nistagmo, depressão)', 'Pressão arterial']
  },
  
  alerts: [
    {
      id: 'lidocaine-cat-toxicity',
      condition: (patient) => patient.species === 'cat',
      message: 'ALERTA CRÍTICO: Gatos são extremamente sensíveis à toxicidade cardiovascular e neurológica da lidocaína. O uso sistêmico (bolus ou CRI) é geralmente contraindicado ou requer doses drasticamente reduzidas (máx 20 mcg/kg/min) com monitorização intensiva. Sinais de toxicidade incluem depressão miocárdica severa e convulsões.',
      level: 'danger'
    },
    {
      id: 'lidocaine-hepatic',
      condition: (patient) => patient.comorbidities.includes('hepatopath') || patient.comorbidities.includes('shock'),
      message: 'A lidocaína tem alta taxa de extração hepática. Em pacientes com hepatopatia, choque ou insuficiência cardíaca (baixo débito), o clearance hepático é reduzido, aumentando o risco de toxicidade. Reduzir a dose de infusão em até 50%.',
      level: 'warning'
    },
    {
      id: 'lidocaine-cardio-block',
      condition: (patient) => patient.comorbidities.includes('cardiopath'),
      message: 'Contraindicado em bloqueios atrioventriculares (BAV) de 2º ou 3º grau e ritmos de escape ventricular, pois pode causar assistolia.',
      level: 'danger'
    }
  ],
  
  adverseEffects: ['Toxicidade do SNC (tremores, nistagmo, fasciculações, convulsões)', 'Depressão miocárdica e hipotensão (doses altas)', 'Bradicardia', 'Vômito (especialmente injeção rápida)'],
  
  detailedInfo: {
    mechanismOfAction: 'Bloqueio reversível dos canais de sódio voltagem-dependentes, impedindo a geração e condução do potencial de ação nervoso e cardíaco.',
    metabolism: 'Extenso metabolismo hepático (desalquilação oxidativa) pelo citocromo P450. O clearance é dependente do fluxo sanguíneo hepático.',
    excretion: 'Renal (menos de 10% inalterado).',
    onsetOfAction: '1 a 2 minutos (IV).',
    durationOfAction: '10 a 20 minutos (após bolus IV).',
    speciesDifferences: 'Gatos possuem deficiência na via de glicuronidação e metabolismo hepático mais lento para a lidocaína, predispondo à toxicidade severa mesmo em doses baixas.',
    clinicalObservations: 'Sinais de toxicidade inicial no SNC (tremores, nistagmo, sedação) geralmente precedem a toxicidade cardiovascular (hipotensão, arritmias, colapso). Em caso de toxicidade grave (convulsões), tratar com diazepam ou propofol e intubação/ventilação. Emulsão lipídica intravenosa (ILE) pode ser considerada em intoxicações refratárias.'
  },
  
  references: ["Plumb's Veterinary Drug Handbook", "Silverstein & Hopper: Small Animal Critical Care Medicine", "Tratado de Anestesiologia Veterinária"]
};
