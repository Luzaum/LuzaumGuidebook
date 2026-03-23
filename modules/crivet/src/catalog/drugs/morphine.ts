import { Drug } from '../../shared/types/drug';

export const morphine: Drug = {
  id: 'morphine',
  namePt: 'Morfina',
  nameEn: 'Morphine',
  synonyms: ['Dimorf', 'Sulfato de Morfina'],
  category: 'anestesicos_analgesicos',
  pharmacologicalClass: 'Opioide Agonista Mu Puro',
  clinicalSummary: 'Analgésico opioide de referência. Excelente para dor moderada a severa, somática e visceral.',
  physiology: 'Agonista total dos receptores opioides mu (μ) no sistema nervoso central e periférico. Inibe a liberação de neurotransmissores nociceptivos (substância P) e hiperpolariza neurônios pós-sinápticos, bloqueando a transmissão da dor. Causa depressão respiratória dose-dependente e estimulação vagal (bradicardia).',
  indications: [
    'Dor aguda moderada a severa (trans e pós-operatória)',
    'Analgesia em infusão contínua (CRI), frequentemente associada a lidocaína e cetamina (MLK)',
    'Edema pulmonar cardiogênico (efeito venodilatador e ansiolítico)',
    'Pré-medicação anestésica (excelente analgesia preventiva)'
  ],
  contraindications: [
    'Hipersensibilidade conhecida',
    'Trauma cranioencefálico com aumento da pressão intracraniana (se houver hipoventilação/hipercapnia)',
    'Asma felina ou doença respiratória severa (devido à liberação de histamina e depressão respiratória)',
    'Obstrução biliar ou pancreatite (pode causar espasmo do esfíncter de Oddi, embora controverso)'
  ],
  advantages: [
    'Padrão-ouro em eficácia analgésica para dor severa',
    'Duração de ação mais longa que o fentanil (2-4 horas)',
    'Efeito sedativo sinérgico com fenotiazínicos e alfa-2 agonistas',
    'Baixo custo e ampla disponibilidade'
  ],
  limitations: [
    'Causa liberação de histamina se administrada rapidamente por via IV (resultando em hipotensão severa)',
    'Alta incidência de êmese e náusea quando usada na pré-medicação (pacientes não dolorosos)',
    'Pode causar disforia, especialmente em gatos e cavalos (se usada sem sedativos adjuvantes)'
  ],
  commonProblems: [
    'Vômito e salivação (muito comum em cães)',
    'Bradicardia vagal',
    'Hipotensão (se injeção IV rápida)',
    'Retenção urinária e constipação',
    'Panting (ofegação) em cães (alteração do centro termorregulador)'
  ],
  usageErrors: [
    'Administração IV em bolus rápido (risco de choque anafilactoide por histamina)',
    'Uso isolado em gatos sem sedação concomitante (risco de excitação/disforia)',
    'Uso em pacientes com mastocitoma (devido à liberação de histamina)'
  ],
  supportedSpecies: ['dog', 'cat'],
  allowedRegimes: ['CRI', 'bolus', 'bolus_maintenance'],
  highAlert: true,
  
  doses: {
    dog: { min: 0.1, max: 0.3, unit: 'mg/kg/h', observations: 'CRI: 0.1 - 0.3 mg/kg/h. Bolus inicial de 0.1-0.2 mg/kg IV lento.' },
    cat: { min: 0.05, max: 0.1, unit: 'mg/kg/h', observations: 'CRI: 0.05 - 0.1 mg/kg/h. Bolus inicial de 0.05-0.1 mg/kg IV lento.' }
  },
  bolusDoses: {
    dog: { min: 0.1, max: 0.5, unit: 'mg/kg', observations: 'Bolus IV deve ser administrado LENTAMENTE (ao longo de 2-5 minutos) ou diluído. IM/SC: 0.3-0.5 mg/kg.' },
    cat: { min: 0.05, max: 0.2, unit: 'mg/kg', observations: 'Bolus IV LENTO. IM/SC: 0.1-0.2 mg/kg. Doses maiores podem causar disforia severa.' }
  },
  
  preferredUnit: 'mg/kg/h',
  allowedUnits: ['mg/kg/h', 'mcg/kg/min', 'mg/kg/min'],
  
  presentations: [
    {
      id: 'morphine_10mg_ml',
      description: 'Sulfato de Morfina 10 mg/mL - Ampola 1 mL',
      concentration: 10,
      concentrationUnit: 'mg/mL',
      volume: 1
    },
    {
      id: 'morphine_1mg_ml',
      description: 'Sulfato de Morfina 1 mg/mL - Ampola 2 mL (Sem conservantes - ideal para epidural)',
      concentration: 1,
      concentrationUnit: 'mg/mL',
      volume: 2
    }
  ],
  
  safetyMetadata: {
    preferredDiluent: 'NaCl 0.9%',
    allowedDiluents: ['NaCl 0.9%', 'Glicose 5%', 'Ringer Lactato'],
    notRecommendedDiluents: [],
    centralAccessRequired: false,
    centralAccessPreferred: false,
    peripheralAllowed: true,
    syringePumpRequired: true,
    dedicatedLineRequired: false,
    photosensitive: true,
    stabilityAfterDilution: 'Estável por 24 horas após diluição. Proteger da luz.',
    incompatibilities: ['Fenobarbital', 'Fenitoína', 'Heparina', 'Bicarbonato de sódio'],
    recommendedMonitoring: ['Frequência respiratória e padrão', 'Frequência cardíaca', 'Pressão arterial (especialmente após bolus IV)', 'Grau de sedação/disforia']
  },
  
  alerts: [
    {
      id: 'morphine-histamine',
      condition: (patient) => true,
      message: 'ALERTA: A morfina causa liberação não-imunológica de histamina. A administração intravenosa (bolus) DEVE ser feita LENTAMENTE (ao longo de 2-5 minutos) para evitar hipotensão severa e taquicardia reflexa.',
      level: 'danger'
    },
    {
      id: 'morphine-cat-dysphoria',
      condition: (patient) => patient.species === 'cat',
      message: 'Gatos são mais propensos a desenvolver excitação paradoxal (disforia) com opioides mu-agonistas puros. Recomenda-se o uso de doses menores e associação com sedativos (ex: dexmedetomidina, acepromazina, midazolam).',
      level: 'warning'
    },
    {
      id: 'morphine-respiratory',
      condition: (patient) => patient.comorbidities.includes('respiratory_disease'),
      message: 'Opioides causam depressão respiratória dose-dependente. Usar com cautela em pacientes com doença respiratória preexistente ou aumento da pressão intracraniana.',
      level: 'warning'
    }
  ],
  
  adverseEffects: ['Vômito e náusea', 'Liberação de histamina (hipotensão se IV rápido)', 'Bradicardia vagal', 'Depressão respiratória', 'Disforia (gatos e cavalos)', 'Retenção urinária', 'Constipação', 'Panting (cães)'],
  
  detailedInfo: {
    mechanismOfAction: 'Agonista total dos receptores opioides mu (μ) e, em menor grau, kappa (κ) no cérebro e na medula espinhal.',
    metabolism: 'Hepático (glicuronidação). Em cães, o principal metabólito é a morfina-3-glicuronídeo (M3G), que não tem efeito analgésico e pode causar excitação. A morfina-6-glicuronídeo (M6G), o metabólito analgésico ativo em humanos, é produzida em quantidades mínimas em cães.',
    excretion: 'Renal (metabólitos) e biliar.',
    onsetOfAction: 'IV: 5-10 minutos. IM: 15-30 minutos.',
    durationOfAction: '2 a 4 horas (dependendo da dose e via de administração).',
    speciesDifferences: 'Gatos têm deficiência na glicuronidação, mas metabolizam a morfina via sulfatação. A meia-vida em gatos é ligeiramente maior que em cães. Gatos são mais sensíveis aos efeitos excitatórios (midríase, disforia) do que os cães (miose, sedação).',
    clinicalObservations: 'A morfina é um excelente analgésico, mas seus efeitos adversos (vômito, liberação de histamina) limitam seu uso em alguns cenários. A metadona é frequentemente preferida na pré-medicação por não causar vômito ou liberação de histamina, embora a morfina seja mais barata e amplamente utilizada em CRI (MLK).'
  },
  
  references: ["Plumb's Veterinary Drug Handbook", "Veterinary Anesthesia and Analgesia (Lumb and Jones)", "BSAVA Manual of Canine and Feline Anaesthesia and Analgesia"]
};
