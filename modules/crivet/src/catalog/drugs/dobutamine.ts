import { Drug } from '../../shared/types/drug';

export const dobutamine: Drug = {
  id: 'dobutamine',
  namePt: 'Dobutamina',
  nameEn: 'Dobutamine',
  synonyms: ['Dobutrex', 'Cloridrato de Dobutamina'],
  category: 'vasopressores_inotropicos',
  pharmacologicalClass: 'Catecolamina Simpatomimética (Inotrópico Positivo)',
  clinicalSummary: 'Inotrópico positivo sintético de ação direta. Usado primariamente para aumentar o débito cardíaco e a perfusão tecidual em estados de baixo fluxo (ex: choque cardiogênico, insuficiência cardíaca congestiva).',
  physiology: 'Agonista predominantemente beta-1 adrenérgico direto. Aumenta a contratilidade miocárdica (inotropismo positivo) com efeitos cronotrópicos (aumento da frequência cardíaca) e arritmogênicos menores que a dopamina. Possui também leve atividade agonista beta-2 (causando vasodilatação periférica leve) e alfa-1 (vasoconstrição leve), resultando em um efeito líquido de redução ou manutenção da resistência vascular sistêmica (pós-carga), o que facilita o esvaziamento ventricular e aumenta o volume sistólico.',
  indications: [
    'Insuficiência cardíaca congestiva aguda (ICC) com baixo débito cardíaco',
    'Choque cardiogênico (droga de escolha inicial)',
    'Hipotensão associada a baixo débito cardíaco (quando a pressão arterial média está limítrofe ou preservada)',
    'Suporte inotrópico no choque séptico (frequentemente associada à noradrenalina para melhorar a perfusão microvascular após estabilização da pressão arterial)',
    'Depressão miocárdica induzida por anestésicos (ex: inalatórios)'
  ],
  contraindications: [
    'Hipovolemia não corrigida (absoluta - a vasodilatação beta-2 pode causar colapso cardiovascular)',
    'Estenose subaórtica severa ou cardiomiopatia hipertrófica obstrutiva (aumenta a obstrução da via de saída do VE)',
    'Taquiarritmias ventriculares ou supraventriculares não controladas',
    'Hipersensibilidade conhecida aos sulfitos (presentes em algumas formulações)'
  ],
  advantages: [
    'Aumenta significativamente o débito cardíaco sem aumentar (e frequentemente reduzindo) a resistência vascular sistêmica (pós-carga)',
    'Menos taquicardizante e arritmogênica que a dopamina, epinefrina ou isoproterenol em doses equipotentes',
    'Ação direta, não depende da liberação de noradrenalina endógena (eficaz mesmo em corações com estoques depletados de catecolaminas, como na ICC crônica)',
    'Meia-vida muito curta (2 minutos) permite titulação precisa e rápida reversão de efeitos adversos'
  ],
  limitations: [
    'Pode causar ou exacerbar hipotensão se o paciente estiver hipovolêmico ou severamente vasodilatado (devido ao efeito beta-2)',
    'Aumenta o consumo de oxigênio miocárdico (MVO2), o que pode ser deletério em isquemia miocárdica',
    'Desenvolvimento de tolerância (taquifilaxia) aos efeitos hemodinâmicos pode ocorrer após 48-72 horas de infusão contínua'
  ],
  commonProblems: [
    'Taquicardia sinusal (especialmente em doses > 10 mcg/kg/min em cães)',
    'Arritmias ventriculares (CVP)',
    'Hipotensão inicial (se o paciente não estiver adequadamente hidratado)',
    'Tremores musculares e convulsões em gatos (efeito tóxico no SNC)'
  ],
  usageErrors: [
    'Uso em pacientes hipovolêmicos sem reposição volêmica prévia e agressiva',
    'Uso isolado como vasopressor em choque séptico com vasodilatação severa (a dobutamina NÃO é um vasopressor eficaz e pode piorar a hipotensão)',
    'Administração em bolus (pode causar arritmias graves e alterações bruscas de pressão)',
    'Mistura com soluções alcalinas (ex: bicarbonato), que inativam a droga'
  ],
  supportedSpecies: ['dog', 'cat'],
  allowedRegimes: ['CRI'],
  highAlert: true,
  
  doses: {
    dog: { min: 2, max: 20, unit: 'mcg/kg/min', observations: 'Iniciar com 2-5 mcg/kg/min e titular para o efeito (aumento da PA, melhora da perfusão, lactato). Doses > 10 mcg/kg/min aumentam significativamente o risco de taquicardia e arritmias.' },
    cat: { min: 1, max: 5, unit: 'mcg/kg/min', observations: 'ALERTA: Gatos são extremamente sensíveis. Iniciar com 1-2 mcg/kg/min. Doses > 5 mcg/kg/min estão fortemente associadas a convulsões refratárias.' }
  },
  
  preferredUnit: 'mcg/kg/min',
  allowedUnits: ['mcg/kg/min', 'mg/kg/h'],
  
  presentations: [
    {
      id: 'dobutamine_12_5mg_ml',
      description: 'Cloridrato de Dobutamina 12.5 mg/mL (Ampola 20 mL = 250 mg)',
      concentration: 12.5,
      concentrationUnit: 'mg/mL',
      volume: 20
    }
  ],
  
  safetyMetadata: {
    preferredDiluent: 'NaCl 0.9%',
    allowedDiluents: ['NaCl 0.9%', 'Glicose 5%', 'Ringer Lactato'],
    notRecommendedDiluents: [],
    centralAccessRequired: false,
    centralAccessPreferred: true, // Preferível para inotrópicos, embora extravasamento seja menos necrosante que dopamina/noradrenalina
    peripheralAllowed: true,
    syringePumpRequired: true,
    dedicatedLineRequired: true,
    photosensitive: false, // A solução diluída pode ficar rosada devido à oxidação, mas não perde potência em 24h.
    stabilityAfterDilution: 'Estável por 24 horas após diluição em soro. A solução pode adquirir coloração levemente rosada com o tempo (oxidação), mas sem perda significativa de potência se usada dentro de 24h.',
    incompatibilities: ['Bicarbonato de sódio', 'Soluções alcalinas (inativa a dobutamina)', 'Heparina', 'Penicilina', 'Cefazolina'],
    recommendedMonitoring: ['ECG contínuo (obrigatório)', 'Pressão arterial (preferencialmente invasiva)', 'Frequência cardíaca', 'Lactato sérico (para avaliar perfusão tecidual)', 'Débito urinário']
  },
  
  alerts: [
    {
      id: 'dobutamine-cat-seizures',
      condition: (patient, dose, unit) => patient.species === 'cat' && unit === 'mcg/kg/min' && dose > 5,
      message: 'ALERTA CRÍTICO: Gatos são altamente sensíveis aos efeitos tóxicos da dobutamina no sistema nervoso central. Doses acima de 5 mcg/kg/min estão associadas a um risco inaceitável de tremores e convulsões refratárias. Não exceder 5 mcg/kg/min nesta espécie.',
      level: 'danger'
    },
    {
      id: 'dobutamine-hypovolemia',
      condition: (patient) => patient.comorbidities.includes('hypovolemia') || patient.comorbidities.includes('shock'),
      message: 'A hipovolemia DEVE ser agressivamente corrigida antes do uso. A dobutamina possui efeito vasodilatador beta-2 leve; se administrada a um paciente hipovolêmico, pode precipitar hipotensão severa e colapso cardiovascular.',
      level: 'danger'
    },
    {
      id: 'dobutamine-arrhythmia',
      condition: (patient) => patient.comorbidities.includes('cardiopath'),
      message: 'A dobutamina aumenta a condução atrioventricular e a automaticidade ventricular. Pode induzir ou exacerbar taquicardia sinusal e arritmias ventriculares, além de aumentar o consumo de oxigênio miocárdico. Monitorização eletrocardiográfica contínua é essencial.',
      level: 'warning'
    },
    {
      id: 'dobutamine-sepsis',
      condition: (patient) => patient.comorbidities.includes('sepsis'),
      message: 'No choque séptico, a dobutamina NÃO deve ser usada como vasopressor de primeira linha devido à sua tendência de causar vasodilatação. É indicada apenas como inotrópico adjuvante (frequentemente associada à noradrenalina) quando há evidência de disfunção miocárdica séptica ou hipoperfusão persistente apesar de PAM adequada.',
      level: 'info'
    }
  ],
  
  adverseEffects: ['Taquicardia sinusal', 'Arritmias ventriculares (CVP)', 'Hipotensão (se hipovolemia ou vasodilatação excessiva)', 'Convulsões e tremores (especialmente em gatos)', 'Náusea e vômito', 'Flebite no local de injeção'],
  
  detailedInfo: {
    mechanismOfAction: 'Agonista sintético direto dos receptores beta-1 adrenérgicos (principal efeito), com atividade agonista beta-2 e alfa-1 leve e balanceada. Aumenta a contratilidade miocárdica (inotropismo) e o volume sistólico, resultando em aumento do débito cardíaco.',
    metabolism: 'Rápido metabolismo hepático e em outros tecidos pela enzima catecol-O-metiltransferase (COMT) em compostos inativos (3-O-metildobutamina) e conjugação com ácido glicurônico.',
    excretion: 'Principalmente renal (metabólitos inativos) e uma pequena fração biliar.',
    onsetOfAction: 'Rápido: 1 a 2 minutos (pico de ação em 10 minutos).',
    durationOfAction: 'Muito curta: a meia-vida plasmática é de aproximadamente 2 minutos. Os efeitos cessam rapidamente após a interrupção da infusão.',
    speciesDifferences: 'Gatos são notavelmente mais sensíveis aos efeitos tóxicos no SNC (convulsões) do que os cães, exigindo doses máximas muito menores.',
    clinicalObservations: 'Diferente da dopamina, a dobutamina não causa liberação de noradrenalina endógena e não atua em receptores dopaminérgicos para causar vasodilatação renal seletiva. É o inotrópico de escolha para insuficiência cardíaca congestiva e choque cardiogênico devido ao seu perfil favorável de aumentar o débito cardíaco sem aumentar a pós-carga.'
  },
  
  references: ["Plumb's Veterinary Drug Handbook", "Veterinary Emergency and Critical Care Manual (Mathews)", "Silverstein & Hopper: Small Animal Critical Care Medicine", "Lumb and Jones' Veterinary Anesthesia and Analgesia"]
};
