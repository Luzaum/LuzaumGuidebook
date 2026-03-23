import { DoseUnit, Drug } from '../../shared/types/drug';

const toMuKgMin = (dose: number, unit: DoseUnit) => {
  switch (unit) {
    case 'mU/kg/min':
      return dose;
    case 'mU/kg/h':
      return dose / 60;
    case 'U/kg/min':
      return dose * 1000;
    case 'U/kg/h':
      return (dose * 1000) / 60;
    default:
      return dose;
  }
};

export const vasopressin: Drug = {
  id: 'vasopressin',
  namePt: 'Vasopressina',
  nameEn: 'Vasopressin',
  synonyms: [
    'Arginine vasopressin',
    'AVP',
    'ADH',
    'Antidiuretic hormone',
    'Hormônio antidiurético',
    'Arginina vasopressina',
  ],
  category: 'vasopressores_inotropicos',
  pharmacologicalClass: 'Vasopressor não catecolamínico',
  clinicalSummary:
    'Vasopressor não catecolamínico usado principalmente como agente de segunda linha para choque vasodilatador refratário, especialmente quando a resposta às catecolaminas é ruim ou quando há acidose importante.',
  physiology:
    'A vasopressina atua principalmente em receptores V1a do músculo liso vascular, promovendo vasoconstrição. Também atua em V2 no túbulo coletor renal, aumentando reabsorção de água. Em choque, isso importa muito porque ela não depende de receptor adrenérgico para gerar efeito pressor. Além disso, a resposta vasopressora tende a ser menos prejudicada pela acidose do que a de catecolaminas. Em fases iniciais do choque ocorre elevação de AVP endógena, mas depois pode haver queda relativa por esgotamento de estoques.',
  indications: [
    'Choque vasodilatador refratário / vasoplegia',
    'Choque séptico ou SIRS com hipotensão persistente após ressuscitação adequada',
    'Hipotensão refratária a catecolaminas',
    'Hipotensão pós-PCR por vasodilatação',
    'Análise complementar em anafilaxia com choque refratário',
    'CPR como vasopressor alternativo/associado ao protocolo de adrenalina em ritmos indicados',
  ],
  contraindications: [
    'Não usar como substituto de volume',
    'Hipovolemia não corrigida',
    'Doença vascular/isquêmica importante',
    'Risco elevado de isquemia esplâncnica, intestinal, renal ou periférica',
    'Cardiopatia com alto risco isquêmico',
    'Arritmias clinicamente relevantes',
    'Insuficiência cardíaca importante',
    'Asma/broncoespasmo',
    'Doença convulsiva',
    'Gestação',
    'Pacientes com risco alto de retenção hídrica/hiponatremia em uso prolongado',
  ],
  supportedSpecies: ['dog', 'cat'],
  allowedRegimes: ['CRI', 'titratable'], // Bolus handled separately if needed for CPR
  highAlert: true,
  advantages: [
    'Atua fora da via adrenérgica',
    'Pode funcionar melhor que catecolaminas em acidose',
    'Pode reduzir necessidade de doses crescentes de catecolaminas',
    'Menor tendência a taquicardia do que adrenalina/dopamina',
    'Muito útil como adjuvante, não necessariamente como primeira droga',
    'Tem papel importante em CPR e em vasoplegia refratária',
  ],
  limitations: [
    'Não corrige hipovolemia',
    'Pode causar vasoconstrição excessiva e piorar perfusão mesentérica/renal',
    'Exige bomba de infusão e monitorização hemodinâmica contínua',
    'Alto risco de erro de dose (U/kg/min vs mU/kg/min)',
    'Pode causar extravasamento/lesão local',
    'Evidência veterinária clínica ainda é mais limitada que a da noradrenalina',
    'Em geral não deve ser a primeira escolha para choque séptico; costuma entrar como segunda linha',
  ],
  commonProblems: [
    'Alto risco de confusão matemática: dose de CRI em mU/kg/min x frasco em U/mL x dose de CPR em U/kg.',
    'Concentração final muito baixa exigindo volumes aspirados muito pequenos se diluído excessivamente.',
  ],
  usageErrors: [
    'Confundir mU/kg/min com U/kg/min',
    'Insistir no uso isolado antes da noradrenalina em cenários clássicos de choque séptico',
    'Preparar soluções muito diluídas resultando em volumes impossíveis de precisão na seringa',
  ],

  doses: {
    dog: {
      min: 0.5,
      max: 5,
      unit: 'mU/kg/min',
      observations:
        'CRI Titulável: Iniciar baixo (0.5 mU/kg/min) preferencialmente como segunda linha após noradrenalina. Titular conforme MAP, perfusão e necessidade de catecolamina.',
    },
    cat: {
      min: 0.5,
      max: 5,
      unit: 'mU/kg/min',
      observations:
        'CRI Titulável: Usar como adjuvante para vasoplegia refratária. Risco potencial alto de efeitos isquêmicos se vasoconstrição excessiva.',
    },
  },
  bolusDoses: {
    dog: {
      min: 0.8,
      max: 0.8,
      unit: 'U/kg',
      observations: 'Dose especial de CPR: Repetir a cada 3-5 minutos conforme protocolo RECOVER.',
    },
    cat: {
      min: 0.8,
      max: 0.8,
      unit: 'U/kg',
      observations: 'Dose especial de CPR: Repetir a cada 3-5 minutos conforme protocolo RECOVER.',
    },
  },
  preferredUnit: 'mU/kg/min',
  allowedUnits: ['mU/kg/min', 'mU/kg/h'],

  presentations: [
    {
      id: 'vasopressin_20Uml_1ml_vial',
      description: 'Vasopressina 20 U/mL – frasco/ampola 1 mL',
      concentration: 20,
      concentrationUnit: 'U/mL',
      volume: 1,
    },
    {
      id: 'vasopressin_20Uml_10ml_vial',
      description: 'Vasopressina 20 U/mL – frasco múltipla dose 10 mL',
      concentration: 20,
      concentrationUnit: 'U/mL',
      volume: 10,
    },
    {
      id: 'vasopressin_rtu_0_2Uml_100ml',
      description: 'Vasopressina pronta para uso 0,2 U/mL – 100 mL',
      concentration: 0.2,
      concentrationUnit: 'U/mL',
      volume: 100,
    },
    {
      id: 'vasopressin_rtu_0_4Uml_100ml',
      description: 'Vasopressina pronta para uso 0,4 U/mL – 100 mL',
      concentration: 0.4,
      concentrationUnit: 'U/mL',
      volume: 100,
    },
    {
      id: 'vasopressin_rtu_0_6Uml_100ml',
      description: 'Vasopressina pronta para uso 0,6 U/mL – 100 mL',
      concentration: 0.6,
      concentrationUnit: 'U/mL',
      volume: 100,
    },
  ],

  safetyMetadata: {
    preferredDiluent: 'NaCl 0.9%',
    allowedDiluents: ['NaCl 0.9%', 'Glicose 5%'],
    notRecommendedDiluents: [],
    centralAccessRequired: false,
    centralAccessPreferred: true,
    peripheralAllowed: true,
    syringePumpRequired: false,
    dedicatedLineRequired: true,
    photosensitive: false,
    stabilityAfterDilution:
      'Solução diluída em temperatura ambiente: descartar após 18 horas. Refrigerada: até 24 horas.',
    incompatibilities: [
      'Ampicilina',
      'Diazepam',
      'Furosemida',
      'Insulina regular',
      'Fenitoína',
    ],
    recommendedMonitoring: [
      'MAP geralmente >= 65 mmHg',
      'FC e ECG contínuo',
      'Débito urinário',
      'Lactato (tendência)',
      'Perfusão periférica',
      'Balanço hídrico e sódio (uso prolongado)',
    ],
  },

  alerts: [
    {
      id: 'vasopressin-high-alert',
      condition: () => true,
      message: 'Medicamento de alto risco. A dose de CRI deve ser prescrita em mU/kg/min. Exige dupla checagem.',
      level: 'danger',
    },
    {
      id: 'vasopressin-unit-confusion',
      condition: (_patient, _dose, unit) => unit.includes('U') && !unit.includes('mU'),
      message: 'Risco crítico de erro de unidade: CRI deve ser prescrito em mU/kg/min. Confundir com U/kg/min gera erro de 1000 vezes.',
      level: 'danger',
    },
    {
      id: 'vasopressin-hypovolemia',
      condition: (patient) => patient.comorbidities.includes('hypovolemia'),
      message: 'Não usar como substituto de ressuscitação volêmica. Se a causa da hipotensão for hipovolemia, a vasopressina pode piorar a perfusão tecidual.',
      level: 'danger',
    },
    {
      id: 'vasopressin-peripheral-limit',
      condition: (_patient, dose, unit, _diluent, access) => access === 'peripheral' && toMuKgMin(dose, unit) > 0.04,
      message: 'CRÍTICO: Dose acima de 0.04 mU/kg/min exige obrigatoriamente acesso venoso central. Risco altíssimo de necrose tecidual isquêmica em via periférica.',
      level: 'danger',
    },
    {
      id: 'vasopressin-central-preferred',
      condition: (_patient, _dose, _unit, _diluent, access) => access !== 'central',
      message: 'Extravasamento pode causar lesão tecidual severa. Via central é preferível para qualquer dose, e OBRIGATÓRIA acima de 0.04 mU/kg/min.',
      level: 'warning',
    },
    {
      id: 'vasopressin-ischemia',
      condition: (_patient, dose, unit) => toMuKgMin(dose, unit) > 2,
      message: 'Cautela com vasoconstrição excessiva. Doses altas podem reduzir perfusão esplâncnica e renal. Monitorar lactato, débito urinário e mucosas.',
      level: 'warning',
    },
    {
      id: 'vasopressin-water-intoxication',
      condition: () => true, // Apply generally for continuous infusions
      message: 'Monitorar retenção hídrica e eletrólitos: Em uso prolongado, a ação antidiurética da vasopressina pode favorecer retenção hídrica e distúrbios de sódio.',
      level: 'info',
    },
    {
      id: 'vasopressin-cpr-vs-cri',
      condition: () => true,
      message: 'A dose de PCR (0.8 U/kg) é diferente da dose de CRI (mU/kg/min). Não confunda as faixas e indicações.',
      level: 'danger',
    },
    {
      id: 'vasopressin-arrhythmia-bronchospasm',
      condition: (patient) => patient.comorbidities.includes('cardiopath') || patient.comorbidities.includes('respiratory_disease') || patient.comorbidities.includes('neurological_disease'),
      message: 'Cautela em cardiopatas, asmáticos e convulsivos: pode causar arritmias, broncoconstrição e efeitos sistêmicos relevantes.',
      level: 'warning',
    },
    {
      id: 'vasopressin-concentration-outside-range',
      condition: (_patient, dose, unit, diluent) => {
        // We do a rough check. Actually, the result object should do this, but we can warn based on logic if possible.
        return true; 
      },
      message: 'Atenção à concentração final: O ideal é preparar soluções concentradas entre 0.1 e 1 U/mL para evitar margem de erro nos microvolumes aspirados.',
      level: 'info',
    },
  ],

  adverseEffects: [
    'Isquemia esplâncnica e renal',
    'Necrose tecidual por extravasamento',
    'Intoxicação hídrica / Hiponatremia (uso prolongado)',
    'Arritmias e aumento do consumo miocárdico de oxigênio',
    'Broncoespasmo',
  ],

  detailedInfo: {
    mechanismOfAction:
      'Age em receptores V1a causando vasoconstrição. Também tem ação V2 renal promovendo reabsorção de água. Pode restaurar resposta vascular em estados de depleção relativa de vasopressina endógena.',
    metabolism: 'Rápida inativação tecidual hepática e renal; clivagem proteolítica.',
    excretion: 'Mecanismos renais.',
    onsetOfAction: 'Rápido, dentro de minutos.',
    durationOfAction: 'Curta (10 a 20 minutos). A pressão cai rápido se a infusão for interrompida.',
    speciesDifferences:
      'Gatos podem ter uma resposta vascular mais errática; titular rigorosamente a dose para evitar consequências isquêmicas.',
    administrationGuidelines: 'Administrar exclusivamente por via intravenosa, idealmente em acesso central exclusivo, utilizando bomba de seringa ou volumétrica de precisão. Não interromper abruptamente o gotejamento devido ao risco de choque rebote; o desmame deve ser feito diminuindo-se a taxa progressivamente.',
    maximumUsageTime: 'Não há limite estrito estipulado na literatura, mas infusões acima de 48-72h podem aumentar significativamente o risco de necrose tecidual isquêmica, intoxicação hídrica (hiponatremia) e isquemia esplâncnica. Deve-se reavaliar constantemente o desmame conforme tolerado pela pressão arterial.',
    extraClinicalNotes: [
      'A meia-vida curtíssima da vasopressina (10-20 min) significa que qualquer atraso na troca de seringas/bolsas causará hipotensão profunda imediata.',
      'Sempre monitore sódio sérico a cada 24h em pacientes sob perfusão de vasopressina devido a seu potente efeito V2 (antidiurético) que retém água livre.',
      'Pode haver redução brutal do débito urinário mesmo com elevação da Pressão Arterial Sistêmica, caso a vasoconstrição renal se sobreponha à perfusão.',
      'No protocolo RECOVER, seu uso em PCR de forma associada à adrenalina ainda carece de comprovação forte, mas é utilizado em fibrilações ou assistolias refratárias.',
      'MACETE DE PREPARAÇÃO: (A) 1 ampola de 20 U/mL em 100 mL de diluente = 200 mU/mL. (B) Aspirar 2 mL dessa solução e completar para 20 mL com diluente (em seringa de 20) = 20 mU/mL final.',
      'MACETE ALTERNATIVO: Aspirar 1 mL da solução "A" (200 mU/mL) e completar para 10 mL (em seringa de 10) = 20 mU/mL final.',
    ],
    clinicalObservations:
      'Usar preferencialmente como adjuvante em choque vasodilatador refratário. Monitorização hemodinâmica rigorosa é mandatória.',
  },

  doseGuides: [
    {
      id: 'vasopressin-cri-main',
      regimen: 'CRI',
      title: 'Choque séptico / vasodilatório refratário',
      indication: 'Segurança após noradrenalina',
      doseText: '0.5 – 1 mU/kg/min para início. Titular conforme resposta para 1 - 5 mU/kg/min.',
      rationale:
        'Iniciar baixo e titular conforme retorno da perfusão e poupando catecolamina. Faixa segura: 0.5–5 mU/kg/min.',
    },
    {
      id: 'vasopressin-peripheral-max',
      regimen: 'CRI',
      title: 'Limite para Acesso Periférico (AVP)',
      indication: 'Segurança em via periférica',
      doseText: 'Máximo 0.04 mU/kg/min',
      rationale: 'Doses acima de 0.04 mU/kg/min exigem OBRIGATORIAMENTE acesso venoso central devido ao risco extremo de necrose tecidual isquêmica.',
    },
    {
      id: 'vasopressin-anaphylaxis',
      regimen: 'CRI',
      title: 'Anafilaxia com choque refratário',
      indication: 'Indicação complementar, não substitui adrenalina',
      doseText: '0.5 – 1.25 mU/kg/min',
      rationale:
        'Em cães e gatos, adjuvante em quadros não responsivos à terapia primária e reposição volêmica.',
    },
    {
      id: 'vasopressin-post-arrest',
      regimen: 'CRI',
      title: 'Hipotensão pós-PCR por vasodilatação',
      indication: 'Refratária a ressuscitação standard',
      doseText: '0.5 – 5 mU/kg/min',
      rationale: 'Titular rigorosamente a pressão de perfusão. Nunca confundir mU com U.',
    },
  ],

  diluentGuidance: [
    {
      id: 'vasopressin-diluent-choice',
      title: 'Diluente e concentração ideal',
      recommendation: 'NaCl 0.9% ou Glicose 5%. Concentração final ideal entre 0.1 – 1 U/mL.',
      rationale: 'Concentrações muito baixas favorecem erro de preparo e exigem microvolumes difíceis de aspirar.',
      tone: 'success',
    },
    {
      id: 'vasopressin-macete-preparo',
      title: 'Macete de Preparação (Diluição 2 etapas)',
      recommendation: 'Passo 1: 1 ampola (20U) em 100mL (resultado: 200mU/mL). Passo 2: Puxar 2mL dessa mistura e completar para 20mL (resultado final: 20mU/mL).',
      rationale: 'Facilita a precisão para pacientes pequenos, resultando em uma solução de 20 mU/mL pronta para a bomba.',
      tone: 'info',
    },
    {
      id: 'vasopressin-diluent-caution',
      title: 'Sugestão de montagem',
      recommendation: 'Use bombas de seringa e volumes de preparo menores (ex: seringas de 50 mL) se a taxa de infusão for baixa.',
      rationale: 'Reduz o desperdício e a dificuldade matemática.',
      tone: 'info',
    },
  ],

  accessGuidance: [
    {
      id: 'vasopressin-access-central',
      title: 'Via central preferível',
      recommendation: 'Acesso central ideal em infusões prolongadas.',
      rationale: 'Risco de necrose severa por extravasamento.',
      tone: 'warning',
    },
    {
      id: 'vasopressin-line-incompatibility',
      title: 'Compatibilidade de linha',
      recommendation: 'Preferir linha exclusiva.',
      rationale: 'Incompatível com fenitoína, furosemida, insulina regular e diazepam.',
      tone: 'danger',
    },
  ],

  infusionGuidance: [
    {
      id: 'vasopressin-infusion-pump',
      title: 'Bomba obrigatória',
      recommendation: 'Use bomba de seringa ou de infusão. Nunca use gotejamento manual.',
      rationale: 'As margens de ajuste exigem rigor absoluto.',
      tone: 'warning',
    },
    {
      id: 'vasopressin-infusion-confusion',
      title: 'Unidade perigosa: mU vs U',
      recommendation: 'Sempre garanta que a dose é mU/kg/min (miliUnidades).',
      rationale: 'Há risco histórico na literatura de confundir 1 mU com 1 U - erro de mil vezes.',
      tone: 'danger',
    },
    {
      id: 'vasopressin-weaning',
      title: 'Desmame e Retirada',
      recommendation: 'Desmamar gradualmente, mantendo a menor dose compatível com perfusão.',
      rationale: 'A interrupção súbita pode causar recidiva forte da vasoplegia.',
      tone: 'info',
    },
  ],

  references: [
    "Plumb's Veterinary Drug Handbook, 10th ed. - Vasopressin, pp. 1293-1295",
    "Lumb and Jones - Veterinary Anesthesia and Analgesia, 6th ed. - Vasopressin, p. 448",
    'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd ed. - choque/vasopressores, p. 25; pós-PCR e CPR, pp. 325, 329',
    'Textbook of Small Animal Emergency Medicine - anafilaxia, p. 965',
    'Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice, pp. 573-574',
    'Diretrizes RECOVER 2024 para Ressuscitação Cardiopulmonar',
  ],
};
