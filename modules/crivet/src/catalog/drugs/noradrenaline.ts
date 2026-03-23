import { DoseUnit, Drug } from '../../shared/types/drug';

const toMcgKgMin = (dose: number, unit: DoseUnit) => {
  switch (unit) {
    case 'mcg/kg/min':
      return dose;
    case 'mcg/kg/h':
      return dose / 60;
    case 'mg/kg/min':
      return dose * 1000;
    case 'mg/kg/h':
      return (dose * 1000) / 60;
    case 'ng/kg/min':
      return dose / 1000;
    default:
      return dose;
  }
};

export const noradrenaline: Drug = {
  id: 'noradrenaline',
  namePt: 'Noradrenalina',
  nameEn: 'Norepinephrine',
  synonyms: [
    'Norepinephrine',
    'Noradrenaline',
    'Norepinefrina',
    'Levarterenol',
    'Norepinephrine bitartrate',
    'Tartarato de norepinefrina',
  ],
  category: 'vasopressores_inotropicos',
  pharmacologicalClass: 'Vasopressor catecolaminico adrenergico',
  clinicalSummary:
    'Vasopressor de escolha para hipotensao vasodilatadora importante, especialmente choque septico/distributivo apos reposicao volêmica adequada, e muito util na hipotensao induzida por isoflurano.',
  physiology:
    'Agonista adrenérgico predominantemente alfa-1/alfa-2, com efeito beta-1 moderado. Em doses usuais predomina o efeito alfa, com vasoconstricao periferica, aumento de resistencia vascular e elevacao da pressao arterial. O objetivo clinico e restaurar pressao de perfusao, nao apenas elevar a pressao.',
  indications: [
    'Hipotensao profunda persistente apos correcao adequada de hipovolemia',
    'Choque septico, distributivo ou vasodilatador',
    'Hipotensao associada a anestesia inalatória, especialmente isoflurano',
    'Vasoplegia refrataria quando e preciso restaurar a perfusao rapidamente',
    'Associacao com dobutamina quando ha componente misto: vasodilatacao + baixo debito',
  ],
  contraindications: [
    'Nao usar como substituto de volume',
    'Hipovolemia nao corrigida',
    'Trombose vascular periferica ou mesenterica / isquemia periferica grave',
    'Arritmias clinicamente relevantes',
    'IAM recente, doenca coronariana importante ou consumo miocardico de O2 criticamente alto',
    'Nao e a escolha de resgate para efeitos cardiovasculares de agonistas alfa-2',
    'Cautela em gestantes e em gatos',
  ],
  supportedSpecies: ['dog', 'cat'],
  allowedRegimes: ['CRI', 'titratable'],
  highAlert: true,
  advantages: [
    'Vasopressor de primeira linha mais limpo para vasoplegia',
    'Inicio de acao muito rapido',
    'Titulacao fina e resposta previsivel',
    'Menor tendencia a taquicardia quando comparada a adrenalina',
    'Muito util em anestesia com isoflurano',
    'Combina bem com dobutamina quando ha componente de baixo debito',
  ],
  limitations: [
    'Exige bomba de infusao e vigilancia continua',
    'Alto risco de extravasamento e necrose tecidual',
    'Idealmente via central; periferica exige muito cuidado',
    'Nao deve ser usada para mascarar hipovolemia',
    'Pode piorar perfusao esplancnica ou renal se o paciente estiver mal ressuscitado ou se a vasoconstricao for excessiva',
    'Meia-vida curta: qualquer interrupcao derruba a pressao rapidamente',
    'Nao e farmaco para bolus rotineiro; o uso pratico e em CRI titulavel',
  ],
  commonProblems: [
    'Extravasamento com lesao isquemica',
    'Arritmias',
    'Perfusao periferica excessivamente reduzida',
    'Queda brusca de pressao quando a infusao interrompe',
  ],
  usageErrors: [
    'Usar o sal como se fosse concentracao de base',
    'Iniciar antes de corrigir volume',
    'Diluir em NaCl 0.9% isolado sem considerar oxidacao',
    'Suspender abruptamente',
    'Escalonar dose sem reavaliar a causa da hipotensao',
  ],

  doses: {
    dog: {
      min: 0.05,
      max: 2,
      unit: 'mcg/kg/min',
      observations:
        'Iniciar apos correcao adequada de volume. Em choque septico ou vasoplegia importante, comecar em 0.05-0.1 mcg/kg/min e titular. Em hipotensao por isoflurano, muita gente permanece entre 0.1-0.5 mcg/kg/min.',
    },
    cat: {
      min: 0.05,
      max: 2,
      unit: 'mcg/kg/min',
      observations:
        'Usar com cautela e titulacao fina. Gatos podem ser mais suscetiveis a eventos cardiovasculares e isquemicos.',
    },
  },
  preferredUnit: 'mcg/kg/min',
  allowedUnits: ['mcg/kg/min', 'mcg/kg/h'],

  presentations: [
    {
      id: 'norepinephrine_bitartrate_2mgml_4ml_amp',
      description:
        'Hemitartarato/Tartarato de Noradrenalina 2 mg/mL - ampola 4 mL',
      concentration: 2,
      concentrationUnit: 'mg/mL',
      volume: 4,
    },
    {
      id: 'norepinephrine_base_1mgml_4ml_vial',
      description: 'Noradrenalina base 1 mg/mL - frasco/ampola 4 mL',
      concentration: 1,
      concentrationUnit: 'mg/mL',
      volume: 4,
    },
  ],

  safetyMetadata: {
    preferredDiluent: 'Glicose 5%',
    allowedDiluents: ['Glicose 5%', 'Glicose 5% + NaCl 0.9%'],
    notRecommendedDiluents: ['NaCl 0.9%'],
    centralAccessRequired: false,
    centralAccessPreferred: true,
    peripheralAllowed: true,
    syringePumpRequired: false,
    dedicatedLineRequired: true,
    photosensitive: true,
    stabilityAfterDilution:
      'Proteger da luz. Estabilidade fisico-quimica por ate 24 horas apos diluicao a 25 C quando preparada conforme orientacao oficial.',
    incompatibilities: [
      'Nao misturar com bicarbonato',
      'Evitar mesma linha com aminofilina',
      'Incompatibilidades relatadas com ranitidina e pantoprazol',
      'Sangue e plasma devem correr separadamente',
    ],
    recommendedMonitoring: [
      'MAP com meta inicial geralmente >= 65 mmHg',
      'ECG continuo',
      'Perfusao periferica e temperatura',
      'Debito urinario',
      'Lactato e tendencia de perfusao',
      'Inspecao frequente do sitio de infusao',
    ],
  },

  alerts: [
    {
      id: 'noradrenaline-high-alert',
      condition: () => true,
      message: 'Medicamento de alto risco. Realizar dupla checagem de concentracao, volume aspirado, diluente e taxa da bomba.',
      level: 'danger',
    },
    {
      id: 'noradrenaline-hypovolemia',
      condition: (patient) => patient.comorbidities.includes('hypovolemia'),
      message: 'Nao usar como substituto de volume. Se a hipotensao for predominantemente hipovolemica, a noradrenalina pode piorar perfusao periferica, renal e esplancnica.',
      level: 'danger',
    },
    {
      id: 'noradrenaline-central-preferred',
      condition: (_patient, _dose, _unit, _diluent, access) => access !== 'central',
      message: 'Via central e preferivel. Se usar acesso periferico, escolha veia calibrosa e monitore o sitio com muita frequencia.',
      level: 'warning',
    },
    {
      id: 'noradrenaline-extravasation',
      condition: (_patient, _dose, _unit, _diluent, access) => access === 'peripheral',
      message: 'Extravasamento pode causar necrose importante. Dor, palidez, frio local ou edema exigem parada imediata da infusao e novo acesso.',
      level: 'danger',
    },
    {
      id: 'noradrenaline-wrong-diluent',
      condition: (_patient, _dose, _unit, diluent) => diluent === 'NaCl 0.9%',
      message: 'Diluir preferencialmente em solucao com glicose. NaCl 0.9% isolado pode favorecer perda de potencia por oxidacao.',
      level: 'warning',
    },
    {
      id: 'noradrenaline-strategy-recheck',
      condition: (patient) => patient.comorbidities.includes('shock') && patient.comorbidities.includes('cardiopath'),
      message: 'Reavalie a estrategia hemodinamica: se houver componente importante de baixo debito ou contratilidade ruim, associar dobutamina pode ser melhor do que apenas subir a noradrenalina.',
      level: 'warning',
    },
    {
      id: 'noradrenaline-arrhythmia-ischemia',
      condition: (patient) => patient.comorbidities.includes('cardiopath') || patient.comorbidities.includes('hypertension'),
      message: 'Cautela em arritmias e isquemia: a noradrenalina pode aumentar demanda miocardica de O2 e piorar arritmias se o contexto clinico nao for adequado.',
      level: 'warning',
    },
    {
      id: 'noradrenaline-pregnancy',
      condition: (patient) => patient.comorbidities.includes('pregnancy_lactation'),
      message: 'Cautela em gestacao. Vasoconstricao pode comprometer perfusao uteroplacentaria.',
      level: 'warning',
    },
    {
      id: 'noradrenaline-dose-recheck',
      condition: (_patient, dose, unit) => {
        const normalized = toMcgKgMin(dose, unit);
        return normalized > 0.5 && normalized <= 1;
      },
      message: 'Dose acima de 0.5 mcg/kg/min: reavalie volume, causa da hipotensao, foco septico, POCUS/ecocardiografia e necessidade de outro agente.',
      level: 'warning',
    },
    {
      id: 'noradrenaline-dose-high',
      condition: (_patient, dose, unit) => {
        const normalized = toMcgKgMin(dose, unit);
        return normalized > 1 && normalized <= 2;
      },
      message: 'Dose alta (>1 mcg/kg/min). Escalonamento cego pode mascarar problema hemodinamico nao resolvido.',
      level: 'danger',
    },
    {
      id: 'noradrenaline-dose-outside-catalog',
      condition: (_patient, dose, unit) => toMcgKgMin(dose, unit) > 2,
      message: 'Dose acima da faixa do catalogo (>2 mcg/kg/min). Revisao obrigatoria da estrategia antes de prosseguir.',
      level: 'danger',
    },
    {
      id: 'noradrenaline-light-protection',
      condition: () => true,
      message: 'Proteger da luz e descartar se a solucao ficar rosada, mais escura que amarelo discreto ou com precipitado.',
      level: 'info',
    },
  ],

  adverseEffects: [
    'Extravasamento com necrose tecidual',
    'Isquemia periferica',
    'Arritmias',
    'Aumento de consumo miocardico de oxigenio',
    'Hipertensao excessiva',
  ],

  detailedInfo: {
    mechanismOfAction:
      'Agonismo alfa-1 e alfa-2 predominante com efeito beta-1 moderado, promovendo vasoconstricao e elevacao de MAP com suporte hemodinamico titulavel.',
    metabolism: 'Rapidamente metabolizada por MAO e COMT em tecidos e terminacoes nervosas.',
    excretion: 'Metabolitos inativos excretados pela urina.',
    onsetOfAction: 'Muito rapido, em geral em 1-2 minutos.',
    durationOfAction: 'Curtissima; a pressao pode cair rapidamente se a infusao for interrompida.',
    speciesDifferences:
      'Gatos merecem cautela adicional por maior susceptibilidade a eventos cardiovasculares e isquemicos em referencias classicas.',
    clinicalObservations:
      'Atenção ao cálculo da dose utilizando a concentração de 2 mg/mL do tartarato de noradrenalina.',
  },

  doseGuides: [
    {
      id: 'noradrenaline-cri-main',
      regimen: 'CRI',
      title: 'Faixa principal de dose',
      doseText: 'Caes: 0.05-2 mcg/kg/min | Gatos: 0.05-2 mcg/kg/min',
      rationale:
        'Iniciar apenas apos correcao adequada de volume. O uso mais comum fica entre 0.05-0.5 mcg/kg/min; acima disso, reavaliar causa da hipotensao.',
    },
    {
      id: 'noradrenaline-septic-shock',
      regimen: 'CRI',
      title: 'Choque septico / distributivo',
      indication: 'Hipotensao apos reposicao volêmica adequada',
      doseText: '0.05-0.1 mcg/kg/min para inicio, titulando ao MAP e perfusao',
      rationale:
        'Primeira escolha operacional para vasoplegia importante. Corrija volume primeiro e associe metas clinicas de perfusao.',
    },
    {
      id: 'noradrenaline-isoflurane',
      regimen: 'CRI',
      title: 'Hipotensao anestesica por isoflurano',
      indication: 'Hipotensao sob inalatorio',
      doseText: '0.05 mcg/kg/min para inicio; muitos pacientes ficam entre 0.1-0.5 mcg/kg/min',
      rationale:
        'Estudos experimentais em caes mostraram aumento dose-dependente de MAP e debito cardiaco entre 0.05 e 2 mcg/kg/min.',
    },
    {
      id: 'noradrenaline-refractory-vasoplegia',
      regimen: 'titratable',
      title: 'Vasoplegia grave ou refrataria',
      indication: 'Quando e preciso restaurar perfusao rapidamente',
      doseText: 'Considerar inicio perto de 0.1 mcg/kg/min com titulacao frequente',
      rationale:
        'Se a dose seguir subindo, nao escale indefinidamente: reavalie volume, foco, POCUS/ecocardiografia e a necessidade de segundo agente.',
    },
  ],

  diluentGuidance: [
    {
      id: 'noradrenaline-diluent-choice',
      title: 'Diluente preferencial',
      recommendation: 'Use Glicose 5% como padrao. Glicose 5% + NaCl 0.9% tambem e aceitavel.',
      rationale: 'A dextrose ajuda a reduzir perda de potencia por oxidacao.',
      tone: 'success',
    },
    {
      id: 'noradrenaline-diluent-avoid',
      title: 'O que evitar',
      recommendation: 'Evite NaCl 0.9% isolado como diluente padrao e nunca misture com bicarbonato.',
      rationale:
        'Tambem evite coadministracao na mesma linha com aminofilina; incompatibilidades tambem sao relatadas com ranitidina e pantoprazol.',
      tone: 'warning',
    },
    {
      id: 'noradrenaline-diluent-examples',
      title: 'Exemplos classicos de concentracao',
      recommendation: '4 mg em 250 mL = 16 mcg/mL; 4 mg em 500 mL = 8 mcg/mL; 4 mg em 1000 mL = 4 mcg/mL.',
      rationale: 'Inspecione a solucao antes do uso e descarte se houver alteracao de cor ou precipitado.',
      tone: 'info',
    },
  ],

  accessGuidance: [
    {
      id: 'noradrenaline-access-central',
      title: 'Via central preferivel',
      recommendation: 'Prefira acesso central e linha dedicada sempre que possivel.',
      rationale: 'O risco de extravasamento e lesao isquemica existe; uma linha exclusiva tambem reduz incompatibilidades.',
      tone: 'warning',
    },
    {
      id: 'noradrenaline-access-peripheral',
      title: 'Uso periferico somente com vigilancia',
      recommendation: 'Se precisar usar via periferica, escolha veia calibrosa e cheque o sitio frequentemente.',
      rationale: 'Dor, edema, palidez ou frio local exigem interrupcao imediata e troca do acesso.',
      tone: 'danger',
    },
    {
      id: 'noradrenaline-access-clinical-logic',
      title: 'Por que a via importa',
      recommendation: 'O objetivo e manter o efeito vasopressor sem pagar o preco de lesao local.',
      rationale: 'Extravasamento grave em caes e gatos foi documentado recentemente, reforcando a necessidade de alerta forte no app.',
      tone: 'info',
    },
  ],

  infusionGuidance: [
    {
      id: 'noradrenaline-infusion-pump',
      title: 'Bomba obrigatoria',
      recommendation: 'Use sempre bomba de infusao; bomba de seringa e especialmente util em pacientes pequenos e para ajustes finos.',
      rationale: 'Nao existe taxa fixa universal. A dose e titulada ao efeito hemodinamico.',
      tone: 'warning',
    },
    {
      id: 'noradrenaline-infusion-targets',
      title: 'Metas clinicas',
      recommendation: 'Trabalhe com meta inicial de MAP >= 65 mmHg e associe a perfusao clinica, lactato e debito urinario.',
      rationale: 'Pressao bonita com perfusao ruim e uma armadilha classica.',
      tone: 'success',
    },
    {
      id: 'noradrenaline-infusion-weaning',
      title: 'Desmame gradual',
      recommendation: 'Nao retire abruptamente. Reduza gradualmente quando a causa da hipotensao estiver controlada.',
      rationale: 'A BSAVA descreve desmame gradual em aproximadamente 6-18 horas em pacientes em melhora.',
      tone: 'info',
    },
    {
      id: 'noradrenaline-infusion-bolus',
      title: 'Bolus nao suportado',
      recommendation: 'Nao use noradrenalina como bolus rotineiro neste app.',
      rationale: 'O uso pratico seguro e em CRI titulavel com monitorizacao continua.',
      tone: 'danger',
    },
  ],

  references: [
    "Plumb's Veterinary Drug Handbook, 10th ed. - Norepinephrine, pp. 943-945",
    "Lumb and Jones - Veterinary Anesthesia and Analgesia, 6th ed. - Norepinephrine, pp. 321-322",
    'Textbook of Small Animal Emergency Medicine - Table 38.1, p. 244',
    'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd ed. - choque / vasopressores, p. 25',
    'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd ed. - simpatomimeticos, p. 343',
    'Documento oficial brasileiro/ANVISA-Ministerio da Saude sobre norepinefrina 2 mg/mL',
  ],
};
