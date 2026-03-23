import { Drug } from '../../shared/types/drug';

export const epinephrine: Drug = {
  id: 'epinephrine',
  namePt: 'Epinefrina (Adrenalina)',
  nameEn: 'Epinephrine',
  synonyms: ['Adrenalina', 'Adren', 'Epinefrina 1:1000'],
  category: 'vasopressores_inotropicos',
  pharmacologicalClass: 'Simpatomimético (Agonista Alfa e Beta)',
  clinicalSummary: 'Catecolamina endógena de ação direta. Principal droga na reanimação cardiopulmonar (RCP) e no choque anafilático.',
  physiology: 'Agonista potente dos receptores alfa-1, alfa-2, beta-1 e beta-2 adrenérgicos. Em doses baixas, predominam os efeitos beta (inotropismo positivo, cronotropismo positivo, broncodilatação, vasodilatação muscular). Em doses altas, predominam os efeitos alfa-1 (vasoconstrição periférica severa, aumento da pressão arterial, aumento da resistência vascular sistêmica).',
  indications: [
    'Parada cardiorrespiratória (assistolia, AESP, fibrilação ventricular)',
    'Choque anafilático severo',
    'Broncoespasmo agudo',
    'Hipotensão refratária (como infusão contínua - CRI, após falha da noradrenalina)',
    'Prolongamento da ação de anestésicos locais (vasoconstrição local)'
  ],
  contraindications: [
    'Nenhuma contraindicação absoluta em situações de emergência (RCP ou anafilaxia)',
    'Uso com cautela em pacientes com insuficiência coronariana, hipertireoidismo, ou glaucoma de ângulo fechado',
    'Evitar injeção em extremidades (dedos, orelhas, cauda) devido ao risco de necrose isquêmica'
  ],
  advantages: [
    'Aumento rápido e potente da pressão de perfusão coronariana e cerebral durante a RCP (efeito alfa-1)',
    'Tratamento de escolha para anafilaxia (reverte broncoespasmo e hipotensão)',
    'Ação rápida (segundos a minutos)'
  ],
  limitations: [
    'Aumenta significativamente o consumo de oxigênio miocárdico (MVO2)',
    'Altamente arritmogênica (especialmente em corações isquêmicos ou sob anestesia com halotano)',
    'Causa isquemia esplâncnica e renal severa em altas doses',
    'Meia-vida curtíssima (requer infusão contínua para efeito sustentado)'
  ],
  commonProblems: [
    'Taquicardia sinusal e arritmias ventriculares',
    'Hipertensão severa transitória',
    'Ansiedade, tremores e excitação (se o paciente estiver consciente)',
    'Hiperglicemia e hipocalemia (efeitos beta-2)'
  ],
  usageErrors: [
    'Uso de dose alta na RCP inicial (piora o prognóstico neurológico e miocárdico pós-ressuscitação)',
    'Extravasamento IV (causa necrose tecidual severa)',
    'Injeção intracardíaca (obsoleta, risco de laceração coronariana, pneumotórax e arritmias intratáveis)',
    'Confusão de concentrações (1:1000 = 1 mg/mL vs 1:10000 = 0.1 mg/mL)'
  ],
  supportedSpecies: ['dog', 'cat'],
  allowedRegimes: ['CRI', 'bolus'],
  highAlert: true,
  
  doses: {
    dog: { min: 0.01, max: 0.1, unit: 'mcg/kg/min', observations: 'CRI: 0.01 - 0.1 mcg/kg/min (titular ao efeito). Doses > 0.1 mcg/kg/min causam vasoconstrição severa.' },
    cat: { min: 0.01, max: 0.1, unit: 'mcg/kg/min', observations: 'CRI: 0.01 - 0.1 mcg/kg/min (titular ao efeito).' }
  },
  bolusDoses: {
    dog: { min: 0.01, max: 0.1, unit: 'mg/kg', observations: 'RCP (Dose Baixa): 0.01 mg/kg IV/IO a cada outro ciclo. RCP (Dose Alta): 0.1 mg/kg IV/IO (apenas em RCP prolongada). Anafilaxia: 0.01 mg/kg IM.' },
    cat: { min: 0.01, max: 0.1, unit: 'mg/kg', observations: 'RCP (Dose Baixa): 0.01 mg/kg IV/IO a cada outro ciclo. RCP (Dose Alta): 0.1 mg/kg IV/IO. Anafilaxia: 0.01 mg/kg IM.' }
  },
  
  preferredUnit: 'mcg/kg/min',
  allowedUnits: ['mcg/kg/min', 'mg/kg'],
  
  presentations: [
    {
      id: 'epinephrine_1mg_ml',
      description: 'Epinefrina 1 mg/mL (1:1000) - Ampola 1 mL',
      concentration: 1,
      concentrationUnit: 'mg/mL',
      volume: 1
    }
  ],
  
  safetyMetadata: {
    preferredDiluent: 'NaCl 0.9%',
    allowedDiluents: ['NaCl 0.9%', 'Glicose 5%'],
    notRecommendedDiluents: ['Ringer Lactato'],
    centralAccessRequired: false,
    centralAccessPreferred: true,
    peripheralAllowed: true,
    syringePumpRequired: true,
    dedicatedLineRequired: true,
    photosensitive: true,
    stabilityAfterDilution: 'Usar imediatamente após diluição. Proteger da luz. Descartar se a solução estiver rosada ou marrom.',
    incompatibilities: ['Soluções alcalinas (Bicarbonato de sódio a inativa rapidamente)', 'Nitratos', 'Aminofilina'],
    recommendedMonitoring: ['ECG contínuo (arritmias)', 'Pressão arterial invasiva (se em CRI)', 'Glicemia', 'Potássio sérico']
  },
  
  alerts: [
    {
      id: 'epinephrine-cpr-dose',
      condition: (patient) => true,
      message: 'ALERTA RCP: As diretrizes RECOVER recomendam a dose BAIXA (0.01 mg/kg) a cada outro ciclo de RCP (a cada 3-5 minutos). A dose ALTA (0.1 mg/kg) só deve ser considerada em RCP prolongada (>10 min), pois piora a perfusão miocárdica e neurológica pós-ressuscitação.',
      level: 'danger'
    },
    {
      id: 'epinephrine-extravasation',
      condition: (patient) => true,
      message: 'ALERTA DE EXTRAVASAMENTO: O extravasamento causa necrose isquêmica severa. Se ocorrer, infiltrar a área com fentolamina (bloqueador alfa) diluída em solução salina o mais rápido possível.',
      level: 'danger'
    },
    {
      id: 'epinephrine-arrhythmia',
      condition: (patient) => patient.comorbidities.includes('cardiopath'),
      message: 'A epinefrina é altamente arritmogênica, especialmente em corações isquêmicos ou doentes. Monitoramento eletrocardiográfico contínuo é obrigatório.',
      level: 'warning'
    }
  ],
  
  adverseEffects: ['Arritmias ventriculares (extrassístoles, taquicardia, fibrilação)', 'Hipertensão severa (risco de hemorragia intracraniana)', 'Isquemia miocárdica (aumento do MVO2)', 'Isquemia renal e esplâncnica', 'Hiperglicemia', 'Hipocalemia'],
  
  detailedInfo: {
    mechanismOfAction: 'Estimula diretamente os receptores adrenérgicos alfa e beta. O efeito alfa-1 causa vasoconstrição em leitos esplâncnicos e renais. O efeito beta-1 aumenta a frequência e contratilidade cardíacas. O efeito beta-2 causa broncodilatação e vasodilatação em músculo esquelético.',
    metabolism: 'Rápido, pela COMT (catecol-O-metiltransferase) e MAO (monoamina oxidase) no fígado, rins e outros tecidos.',
    excretion: 'Renal (metabólitos inativos, principalmente ácido vanilmandélico - VMA).',
    onsetOfAction: 'IV: Imediato. IM/SC: 3-5 minutos (absorção variável devido à vasoconstrição local).',
    durationOfAction: 'IV: 1-2 minutos. IM/SC: 10-30 minutos.',
    speciesDifferences: 'A resposta é semelhante em cães e gatos, mas gatos podem ser mais sensíveis aos efeitos arritmogênicos.',
    clinicalObservations: 'Na RCP, o objetivo da epinefrina não é "fazer o coração bater" (efeito beta-1), mas sim causar vasoconstrição periférica intensa (efeito alfa-1) para aumentar a pressão de perfusão aórtica e desviar o sangue para as coronárias e o cérebro durante as compressões torácicas.'
  },
  
  references: ["RECOVER Initiative Guidelines", "Plumb's Veterinary Drug Handbook", "Veterinary Emergency and Critical Care Manual"]
};
