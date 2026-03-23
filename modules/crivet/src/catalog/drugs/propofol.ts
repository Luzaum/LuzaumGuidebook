import { Drug } from '../../shared/types/drug';

export const propofol: Drug = {
  id: 'propofol',
  namePt: 'Propofol',
  nameEn: 'Propofol',
  synonyms: ['Diprivan', 'Provive', 'Propovan'],
  category: 'anestesicos_analgesicos',
  pharmacologicalClass: 'Anestésico Geral Intravenoso (Alquilfenol)',
  clinicalSummary: 'Anestésico geral de ultracurta duração, utilizado para indução rápida, manutenção da anestesia geral (TIVA) e sedação. Não possui propriedades analgésicas.',
  physiology: 'Aumenta a atividade inibitória do neurotransmissor GABA no receptor GABA-A, promovendo depressão profunda do SNC. Causa vasodilatação arterial e venosa direta (reduzindo pré e pós-carga) e depressão miocárdica dose-dependente, resultando em hipotensão. É um potente depressor respiratório.',
  indications: [
    'Indução anestésica rápida e suave',
    'Manutenção anestésica por infusão contínua (TIVA - Total Intravenous Anesthesia)',
    'Sedação para procedimentos curtos e não dolorosos (ex: exames de imagem)',
    'Tratamento de status epilepticus refratário a benzodiazepínicos e fenobarbital'
  ],
  contraindications: [
    'Pacientes em choque hipovolêmico ou cardiogênico descompensado (risco de colapso cardiovascular)',
    'Hipersensibilidade conhecida ao propofol ou aos componentes do veículo (óleo de soja, lecitina de ovo)',
    'Pacientes com hiperlipidemia grave ou pancreatite (devido à emulsão lipídica)',
    'Uso prolongado (CRI > 1-2 horas) em gatos (risco de toxicidade)'
  ],
  advantages: [
    'Início de ação extremamente rápido (30-60 segundos)',
    'Recuperação rápida, suave e livre de excitação na maioria dos casos',
    'Metabolismo extra-hepático significativo (pulmonar), útil em hepatopatas',
    'Reduz a pressão intracraniana (PIC) e o fluxo sanguíneo cerebral, sendo seguro para pacientes neurológicos'
  ],
  limitations: [
    'Zero efeito analgésico (requer coadministração de analgésicos para procedimentos dolorosos)',
    'Causa hipotensão e apneia dose e velocidade-dependentes',
    'Veículo lipídico suporta crescimento bacteriano rápido (risco de sepse se não manuseado com técnica estéril)'
  ],
  commonProblems: [
    'Apneia transitória após bolus de indução',
    'Hipotensão arterial (vasodilatação + depressão miocárdica)',
    'Dor à injeção IV (comum em cães)',
    'Mioclonias ou tremores musculares durante a indução ou recuperação'
  ],
  usageErrors: [
    'Administração em bolus muito rápido (aumenta drasticamente o risco de apneia prolongada e hipotensão severa)',
    'Uso como agente único para cirurgias dolorosas (o paciente pode se mover e terá respostas autonômicas à dor)',
    'Armazenamento de sobras em seringas para uso posterior (alto risco de contaminação bacteriana e sepse)'
  ],
  supportedSpecies: ['dog', 'cat'],
  allowedRegimes: ['CRI', 'bolus', 'bolus_maintenance'],
  highAlert: true,
  
  doses: {
    dog: { min: 0.1, max: 0.4, unit: 'mg/kg/min', observations: 'TIVA: 0.1 - 0.4 mg/kg/min. A dose necessária diminui significativamente quando coadministrado com opioides, alfa-2 agonistas ou cetamina.' },
    cat: { min: 0.1, max: 0.3, unit: 'mg/kg/min', observations: 'TIVA: 0.1 - 0.3 mg/kg/min. Evitar CRI prolongada (> 1-2 horas) devido ao risco de lesão oxidativa eritrocitária e recuperação muito prolongada.' }
  },
  bolusDoses: {
    dog: { min: 2, max: 6, unit: 'mg/kg', observations: 'Indução: 2-6 mg/kg IV. Titular lentamente (1/4 da dose calculada a cada 30 seg) até o efeito desejado. Doses menores se pré-medicado.' },
    cat: { min: 4, max: 8, unit: 'mg/kg', observations: 'Indução: 4-8 mg/kg IV. Titular lentamente até o efeito. Doses menores se pré-medicado.' }
  },
  
  preferredUnit: 'mg/kg/min',
  allowedUnits: ['mg/kg/min', 'mg/kg/h', 'mcg/kg/min'],
  
  presentations: [
    {
      id: 'propofol_10mg_ml',
      description: 'Propofol 1% (10 mg/mL) - Ampola/Frasco 20 mL',
      concentration: 10,
      concentrationUnit: 'mg/mL',
      volume: 20
    },
    {
      id: 'propofol_10mg_ml_50',
      description: 'Propofol 1% (10 mg/mL) - Frasco 50 mL',
      concentration: 10,
      concentrationUnit: 'mg/mL',
      volume: 50
    }
  ],
  
  safetyMetadata: {
    preferredDiluent: 'Nenhum',
    allowedDiluents: ['Glicose 5%', 'Nenhum'], // Geralmente administrado puro
    notRecommendedDiluents: ['Ringer Lactato', 'NaCl 0.9%'], // Podem quebrar a emulsão lipídica
    centralAccessRequired: false,
    centralAccessPreferred: false,
    peripheralAllowed: true,
    syringePumpRequired: true, // Essencial para TIVA
    dedicatedLineRequired: false,
    photosensitive: false,
    stabilityAfterDilution: 'Uso imediato após abertura do frasco. Descartar sobras em 6h (formulações sem conservantes) ou 24h (com conservantes, ex: Propofol 28).',
    incompatibilities: ['Ringer Lactato', 'Maioria das outras drogas (risco de quebra da emulsão ou precipitação) - não misturar na mesma seringa.'],
    recommendedMonitoring: ['Pressão arterial (esperada hipotensão)', 'Frequência e ritmo cardíaco', 'Oximetria de pulso', 'Capnografia (risco de apneia/hipoventilação)', 'Temperatura (hipotermia)']
  },
  
  alerts: [
    {
      id: 'propofol-hypotension',
      condition: (patient) => patient.comorbidities.includes('shock') || patient.comorbidities.includes('cardiopath') || patient.comorbidities.includes('hypovolemia'),
      message: 'ALERTA CRÍTICO: Propofol causa vasodilatação e depressão miocárdica dose-dependentes. O uso em pacientes hipovolêmicos, chocados ou com disfunção cardíaca severa pode resultar em colapso cardiovascular fatal. Reduzir a dose drasticamente, titular muito lentamente ou escolher outro agente indutor (ex: etomidato, alfaxalona).',
      level: 'danger'
    },
    {
      id: 'propofol-cat-toxicity',
      condition: (patient, dose, unit, diluent, access) => patient.species === 'cat',
      message: 'Gatos têm deficiência na via de glicuronidação (principal via de metabolização do propofol). O uso em infusão contínua (CRI) prolongada ou administrações repetidas em dias consecutivos pode causar formação de corpúsculos de Heinz (lesão oxidativa), letargia, diarreia e recuperação anestésica extremamente prolongada.',
      level: 'warning'
    },
    {
      id: 'propofol-apnea',
      condition: (patient) => true,
      message: 'A apneia pós-indução é muito comum, especialmente com injeção rápida. Esteja preparado para intubação orotraqueal imediata e ventilação com pressão positiva.',
      level: 'warning'
    }
  ],
  
  adverseEffects: ['Hipotensão arterial', 'Apneia e hipoventilação', 'Dor à injeção intravenosa', 'Mioclonias', 'Síndrome da Infusão do Propofol (PRIS - rara em veterinária, associada a altas doses por tempo prolongado)'],
  
  detailedInfo: {
    mechanismOfAction: 'Potencialização da ação inibitória do ácido gama-aminobutírico (GABA) no receptor GABA-A, aumentando a condutância ao cloreto e hiperpolarizando o neurônio.',
    metabolism: 'Metabolismo hepático rápido (glicuronidação e sulfatação) e metabolismo extra-hepático significativo (pulmões e rins), o que explica a rápida recuperação mesmo em pacientes com disfunção hepática moderada.',
    excretion: 'Renal (como metabólitos inativos conjugados).',
    onsetOfAction: 'Muito rápido: 30 a 60 segundos (tempo circulação braço-cérebro).',
    durationOfAction: 'Curta: 10 a 20 minutos após dose única (devido à rápida redistribuição do cérebro para tecidos periféricos).',
    speciesDifferences: 'Gatos metabolizam o propofol mais lentamente que os cães devido à deficiência na enzima fenol-UDP-glicuronosiltransferase, tornando-os suscetíveis a toxicidade cumulativa e recuperação prolongada com infusões contínuas.',
    clinicalObservations: 'Para minimizar a hipotensão e apneia durante a indução, administre 25% da dose calculada a cada 30 segundos até a perda do reflexo palpebral e tônus mandibular. A co-indução com midazolam ou fentanil reduz significativamente a dose necessária de propofol.'
  },
  
  references: ["Plumb's Veterinary Drug Handbook", "Veterinary Anesthesia and Analgesia (Lumb and Jones)", "Tratado de Anestesiologia Veterinária", "BSAVA Manual of Canine and Feline Anaesthesia and Analgesia"]
};
