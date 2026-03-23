import { Drug } from '../../shared/types/drug';

export const dopamine: Drug = {
  id: 'dopamine',
  namePt: 'Dopamina',
  nameEn: 'Dopamine',
  synonyms: ['Revivan', 'Cloridrato de Dopamina'],
  category: 'vasopressores_inotropicos',
  pharmacologicalClass: 'Catecolamina Simpatomimética (Inotrópico / Vasopressor)',
  clinicalSummary: 'Inotrópico positivo e vasopressor com efeitos dose-dependentes (dopaminérgicos, beta-1 e alfa-1). Usado para suporte hemodinâmico em hipotensão e choque.',
  physiology: 'Precursor imediato da noradrenalina. Atua em receptores dopaminérgicos (D1, D2), beta-1 e alfa-1 adrenérgicos de forma dose-dependente. Doses baixas (1-3 mcg/kg/min) causam vasodilatação renal e esplâncnica (efeito dopaminérgico). Doses médias (3-10 mcg/kg/min) aumentam a contratilidade miocárdica e o débito cardíaco (efeito beta-1). Doses altas (>10 mcg/kg/min) causam vasoconstrição periférica (efeito alfa-1).',
  indications: [
    'Hipotensão refratária a fluidos (quando a noradrenalina não está disponível ou como adjuvante)',
    'Choque cardiogênico (frequentemente associada ou substituída por dobutamina)',
    'Suporte inotrópico e vasopressor em pacientes anestesiados',
    'Insuficiência cardíaca congestiva aguda (com hipotensão severa)'
  ],
  contraindications: [
    'Hipovolemia não corrigida (absoluta)',
    'Taquiarritmias ventriculares ou supraventriculares não controladas',
    'Fibrilação ventricular',
    'Feocromocitoma'
  ],
  advantages: [
    'Efeitos tituláveis e previsíveis baseados na dose (inotrópico vs. vasopressor)',
    'Meia-vida muito curta (1-2 minutos) permite rápido ajuste e reversão de efeitos adversos',
    'Aumenta o fluxo sanguíneo renal e esplâncnico em doses baixas (efeito D1)'
  ],
  limitations: [
    'Forte potencial arritmogênico (maior que a dobutamina), induzindo taquicardia sinusal e arritmias ventriculares',
    'Aumenta significativamente o consumo de oxigênio miocárdico (MVO2)',
    'A eficácia da "dose renal" (baixa dose) para prevenir insuficiência renal aguda é controversa e não suportada por evidências atuais em medicina veterinária',
    'Pode causar necrose tecidual severa se houver extravasamento'
  ],
  commonProblems: [
    'Taquicardia sinusal desproporcional (especialmente em doses > 5 mcg/kg/min)',
    'Arritmias ventriculares (CVP)',
    'Vasoconstrição excessiva com extremidades frias e pálidas (doses > 10 mcg/kg/min)',
    'Náusea e vômito (efeito dopaminérgico central, comum em cães acordados)'
  ],
  usageErrors: [
    'Uso como substituto para reposição volêmica adequada (piora a perfusão tecidual)',
    'Administração em bolus (pode causar arritmias fatais e picos hipertensivos)',
    'Uso em via periférica sem monitoramento rigoroso do local de inserção (risco de necrose)',
    'Mistura com soluções alcalinas (ex: bicarbonato), que inativam a droga'
  ],
  supportedSpecies: ['dog', 'cat'],
  allowedRegimes: ['CRI'],
  highAlert: true,
  
  doses: {
    dog: { min: 2, max: 20, unit: 'mcg/kg/min', observations: 'Efeito dopaminérgico (renal/esplâncnico): 1-3 mcg/kg/min. Efeito inotrópico (beta-1): 3-10 mcg/kg/min. Efeito vasopressor (alfa-1): 10-20 mcg/kg/min. Titular para o efeito desejado.' },
    cat: { min: 2, max: 20, unit: 'mcg/kg/min', observations: 'Gatos possuem menos receptores dopaminérgicos renais, tornando a "dose renal" ineficaz. São muito sensíveis aos efeitos arritmogênicos. Iniciar com doses baixas (2-5 mcg/kg/min).' }
  },
  
  preferredUnit: 'mcg/kg/min',
  allowedUnits: ['mcg/kg/min', 'mg/kg/h'],
  
  presentations: [
    {
      id: 'dopamine_5mg_ml',
      description: 'Cloridrato de Dopamina 5 mg/mL (Ampola 10 mL = 50 mg)',
      concentration: 5,
      concentrationUnit: 'mg/mL',
      volume: 10
    }
  ],
  
  safetyMetadata: {
    preferredDiluent: 'NaCl 0.9%',
    allowedDiluents: ['NaCl 0.9%', 'Glicose 5%', 'Ringer Lactato'],
    notRecommendedDiluents: [],
    centralAccessRequired: false,
    centralAccessPreferred: true, // Fortemente recomendado devido ao risco de necrose
    peripheralAllowed: true,
    syringePumpRequired: true,
    dedicatedLineRequired: true,
    photosensitive: true,
    stabilityAfterDilution: 'Estável por 24 horas após diluição. Proteger da luz.',
    incompatibilities: ['Bicarbonato de sódio', 'Soluções alcalinas (inativa a dopamina)', 'Ampicilina', 'Anfotericina B', 'Furosemida'],
    recommendedMonitoring: ['Pressão arterial (preferencialmente invasiva)', 'ECG contínuo (obrigatório)', 'Frequência cardíaca', 'Débito urinário', 'Inspeção frequente do local do cateter venoso']
  },
  
  alerts: [
    {
      id: 'dopamine-extravasation',
      condition: (patient, dose, unit, diluent, access) => access === 'peripheral',
      message: 'ALERTA CRÍTICO: Alto risco de necrose isquêmica severa em caso de extravasamento em acesso periférico. Acesso venoso central é fortemente recomendado. Se usar via periférica, inspecionar o local a cada hora. Em caso de extravasamento, infiltrar fentolamina na área.',
      level: 'danger'
    },
    {
      id: 'dopamine-arrhythmia',
      condition: (patient) => patient.comorbidities.includes('cardiopath') || patient.species === 'cat',
      message: 'A dopamina é altamente arritmogênica, especialmente em felinos e pacientes cardiopatas. Pode induzir taquicardia sinusal severa e arritmias ventriculares. Monitorização eletrocardiográfica contínua é essencial. Aumenta significativamente o consumo de oxigênio miocárdico.',
      level: 'warning'
    },
    {
      id: 'dopamine-hypovolemia',
      condition: (patient) => patient.comorbidities.includes('hypovolemia') || patient.comorbidities.includes('shock'),
      message: 'A hipovolemia DEVE ser corrigida com fluidoterapia adequada antes do início da infusão de dopamina. O uso de vasopressores em pacientes hipovolêmicos causa vasoconstrição severa, piorando a isquemia tecidual e a perfusão de órgãos vitais.',
      level: 'danger'
    },
    {
      id: 'dopamine-high-dose',
      condition: (patient, dose, unit) => unit === 'mcg/kg/min' && dose > 10,
      message: 'Doses acima de 10 mcg/kg/min resultam predominantemente em efeitos alfa-1 adrenérgicos (vasoconstrição periférica intensa), podendo reduzir o débito cardíaco devido ao aumento da pós-carga. Se o objetivo primário for inotropismo, considere associar ou trocar para dobutamina.',
      level: 'info'
    }
  ],
  
  adverseEffects: ['Taquicardia sinusal', 'Arritmias ventriculares', 'Hipertensão (doses altas)', 'Necrose tecidual (extravasamento)', 'Vômito e náusea', 'Aumento da pressão intraocular (PIO)'],
  
  detailedInfo: {
    mechanismOfAction: 'Ação direta em receptores dopaminérgicos (D1, D2), beta-1 e alfa-1 adrenérgicos, dependendo da dose infundida. Também atua indiretamente estimulando a liberação de noradrenalina endógena das vesículas de armazenamento simpáticas.',
    metabolism: 'Rápido metabolismo hepático, renal e plasmático pelas enzimas MAO (monoamina oxidase) e COMT (catecol-O-metiltransferase).',
    excretion: 'Renal (principalmente como metabólitos inativos, como o ácido homovanílico).',
    onsetOfAction: 'Rápido (dentro de 5 minutos).',
    durationOfAction: 'Muito curta (menos de 10 minutos após a descontinuação da infusão).',
    speciesDifferences: 'Gatos possuem significativamente menos receptores dopaminérgicos renais em comparação com cães, tornando a vasodilatação renal induzida por dopamina ("dose renal") ineficaz nesta espécie. Gatos também são mais propensos a desenvolver arritmias com dopamina.',
    clinicalObservations: 'A prática de usar "dose renal" (1-3 mcg/kg/min) para prevenir insuficiência renal aguda ou tratar oligúria não é mais recomendada na medicina veterinária moderna, pois carece de evidências de benefício na sobrevida ou função renal a longo prazo, e pode induzir efeitos adversos. O foco deve ser na otimização da hemodinâmica global (débito cardíaco e pressão arterial).'
  },
  
  references: ["Plumb's Veterinary Drug Handbook", "Veterinary Emergency and Critical Care Manual (Mathews)", "Silverstein & Hopper: Small Animal Critical Care Medicine", "Lumb and Jones' Veterinary Anesthesia and Analgesia"]
};
