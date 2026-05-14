import {
  BloodGasInput,
  AcidBasePrimaryDisorder,
  ClinicalAlert,
  DataQualityAssessment,
  DeepAcidBaseInterpretation,
  DeepElectrolyteAssessment,
  DeepOxygenationAssessment,
  DomainStatus,
  DomainStatuses,
  InterpretationResult,
  TemperatureContext,
} from '../types';
import { CLINICAL_PATTERNS } from '../data/clinicalPatterns';
import { PARAMETER_GUIDE } from '../data/parameterGuide';
import { PARAMETER_INTERACTIONS } from '../data/parameterInteractions';
import { normalizeFiO2Input } from '../utils/fio2';

type ClinicalActions = InterpretationResult['clinicalActions'];
type SubmissionIssue = { level: 'warning' | 'critical'; message: string };

function round(value: number, digits = 1): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function inferDataQualityConfidence(quality: DataQualityAssessment): DataQualityAssessment['confidence'] {
  if (quality.status === 'probable_error' || quality.domainStatus === 'blocked') return 'blocked';
  if (quality.consistencyChecks.some((c) => c.level === 'critical')) return 'blocked';
  if (quality.consistencyChecks.filter((c) => c.level === 'warning').length >= 3) return 'low';
  if (quality.status === 'caution') return 'moderate';
  return 'high';
}

function getApproxBarometricPressure(input: BloodGasInput): number {
  if (input.barometricPressure) return input.barometricPressure;
  if (input.altitude === undefined) return 760;
  const estimated = 760 * Math.exp((-0.00012) * input.altitude);
  return round(estimated, 0);
}

function isImplausible(field: string, value?: number): boolean {
  if (value === undefined) return false;
  const ranges: Record<string, [number, number]> = {
    pH: [6.5, 8.0],
    pCO2: [5, 150],
    pO2: [10, 800],
    HCO3: [3, 60],
    BE: [-30, 30],
    lactate: [0, 25],
    Na: [100, 190],
    K: [1.5, 10],
    Cl: [60, 160],
    temperature: [30, 43],
  };
  const limits = ranges[field];
  return limits ? value < limits[0] || value > limits[1] : false;
}

function buildTemperatureContext(input: BloodGasInput): TemperatureContext {
  if (input.temperature === undefined) {
    return {
      domainStatus: 'inconclusive',
      status: 'unknown',
      summary: 'Temperatura nao informada. O impacto clinico da temperatura sobre a leitura fica limitado.',
      effectOnInterpretation: ['Sem temperatura, o contexto fisiologico fica incompleto.'],
    };
  }

  if (input.temperature < 37) {
    return {
      domainStatus: 'limited',
      status: 'hypothermia',
      summary: `Hipotermia relevante (${input.temperature} C).`,
      effectOnInterpretation: [
        'Hipotermia pode alterar a relacao entre valores reportados e fisiologia real.',
        'A reducao metabolica pode modificar consumo de O2 e producao de CO2.',
      ],
    };
  }

  if (input.temperature > 39.7) {
    return {
      domainStatus: 'limited',
      status: 'hyperthermia',
      summary: `Hipertermia relevante (${input.temperature} C).`,
      effectOnInterpretation: [
        'Hipertermia aumenta consumo de O2 e producao de CO2.',
        'Interpretar com contexto de sepse, dor, estresse e perfusao.',
      ],
    };
  }

  return {
    domainStatus: 'ok',
    status: 'normal',
    summary: `Temperatura informada (${input.temperature} C) sem alerta termico dominante.`,
    effectOnInterpretation: ['Temperatura incorporada como fator de contexto da interpretacao.'],
  };
}

function buildQualityAssessment(
  input: BloodGasInput,
  fio2Info: ReturnType<typeof normalizeFiO2Input>,
  temperatureContext: TemperatureContext,
  submissionIssues: SubmissionIssue[] = []
): DataQualityAssessment {
  const messages: string[] = submissionIssues.map((i) => i.message);
  const suspectFields: string[] = [];
  const missingForComplete: string[] = [];
  const limitations: string[] = [];
  const consistencyChecks: DataQualityAssessment['consistencyChecks'] = [];

  const canAssessAcidBase = input.pH !== undefined && input.pCO2 !== undefined && (input.HCO3 !== undefined || input.BE !== undefined);
  const canAssessOxygenation = input.sampleType === 'arterial' && input.pO2 !== undefined;

  if (!canAssessAcidBase) missingForComplete.push('pH, pCO2 e HCO3/BE sao necessarios para interpretacao acido-base completa.');
  if (input.sampleType === 'arterial' && input.pO2 === undefined) missingForComplete.push('pO2 e necessario para avaliacao completa da oxigenacao arterial.');
  if (input.sampleType === 'venous') limitations.push('Amostra venosa nao deve ser usada para classificar oxigenacao pulmonar arterial.');

  const trackedFields: Array<[string, number | undefined]> = [
    ['pH', input.pH],
    ['pCO2', input.pCO2],
    ['pO2', input.pO2],
    ['HCO3', input.HCO3],
    ['BE', input.BE],
    ['lactate', input.lactate],
    ['Na', input.Na],
    ['K', input.K],
    ['Cl', input.Cl],
    ['temperature', input.temperature],
  ];

  for (const [field, value] of trackedFields) {
    if (isImplausible(field, value)) {
      suspectFields.push(field);
      messages.push(`Valor de ${field} parece fisiologicamente implausivel.`);
    }
  }

  if (input.fio2 !== undefined) {
    if (fio2Info.warning) {
      suspectFields.push('fio2');
      messages.push(fio2Info.warning);
    }
    if (fio2Info.note) messages.push(fio2Info.note);
  }

  if (input.HCO3 !== undefined && input.BE !== undefined) {
    if (input.HCO3 < 18 && input.BE > 3) {
      consistencyChecks.push({
        level: 'critical',
        message: 'HCO3 baixo com BE positivo forte e incoerente.',
        suggestion: 'Confirme sinal/unidade do BE e origem dos valores.',
        fields: ['HCO3', 'BE'],
      });
    }
    if (input.HCO3 > 28 && input.BE < -3) {
      consistencyChecks.push({
        level: 'critical',
        message: 'HCO3 alto com BE negativo forte e incoerente.',
        suggestion: 'Confirme sinal/unidade do BE e origem dos valores.',
        fields: ['HCO3', 'BE'],
      });
    }
  }

  if (input.pH !== undefined && input.pCO2 !== undefined && input.HCO3 !== undefined) {
    const expectedPH = 6.1 + Math.log10(input.HCO3 / (0.03 * input.pCO2));
    if (Math.abs(expectedPH - input.pH) > 0.12) {
      consistencyChecks.push({
        level: 'warning',
        message: 'pH, pCO2 e HCO3 com coerencia interna reduzida.',
        suggestion: 'Revisar casas decimais, unidade e origem dos campos.',
        fields: ['pH', 'pCO2', 'HCO3'],
      });
    }
  }

  if (input.sampleType === 'venous' && input.pO2 !== undefined && input.pO2 > 80) {
    consistencyChecks.push({
      level: 'critical',
      message: 'pO2 venosa muito alta para padrao venoso habitual.',
      suggestion: 'Confirme se a amostra nao foi rotulada incorretamente.',
      fields: ['sampleType', 'pO2'],
    });
  }

  if (input.sampleType === 'arterial' && input.sO2 !== undefined && input.pO2 !== undefined && input.pO2 < 60 && input.sO2 > 98) {
    consistencyChecks.push({
      level: 'warning',
      message: 'SatO2 alta para pO2 arterial baixa.',
      suggestion: 'Revisar se satO2 e pO2 pertencem ao mesmo exame.',
      fields: ['sO2', 'pO2'],
    });
  }

  const probableError = suspectFields.length > 0 || consistencyChecks.some((entry) => entry.level === 'critical') || submissionIssues.some((entry) => entry.level === 'critical');
  const status: DataQualityAssessment['status'] = probableError
    ? 'probable_error'
    : limitations.length > 0 || consistencyChecks.length > 0 || submissionIssues.length > 0
      ? 'caution'
      : 'reliable';

  const quality: DataQualityAssessment = {
    status,
    confidence: 'moderate',
    domainStatus: probableError ? 'blocked' : limitations.length > 0 || missingForComplete.length > 0 ? 'limited' : 'ok',
    messages,
    suspectFields,
    canAssessAcidBase,
    canAssessOxygenation,
    missingForComplete,
    limitations,
    consistencyChecks,
    temperatureImpact: temperatureContext.effectOnInterpretation,
    fio2Normalization: fio2Info.fraction !== undefined && input.fio2 !== undefined
      ? {
          originalValue: input.fio2,
          normalizedFraction: fio2Info.fraction,
          displayPercent: fio2Info.displayPercent || round(fio2Info.fraction * 100, 1),
          source: fio2Info.source || 'fraction',
        }
      : undefined,
  };

  quality.confidence = inferDataQualityConfidence(quality);
  return quality;
}

type AcidBaseReference = {
  phLow: number;
  phHigh: number;
  pco2Low: number;
  pco2High: number;
  pco2Normal: number;
  hco3Low: number;
  hco3High: number;
  hco3Normal: number;
  compensationTolerance: number;
  anionGapLow: number;
  anionGapHigh: number;
};

function getAcidBaseReference(input: BloodGasInput): AcidBaseReference {
  if (input.species === 'feline') {
    return {
      phLow: 7.25,
      phHigh: 7.4,
      pco2Low: input.sampleType === 'venous' ? 33 : 28,
      pco2High: input.sampleType === 'venous' ? 40 : 34,
      pco2Normal: input.sampleType === 'venous' ? 36 : 31,
      hco3Low: input.sampleType === 'venous' ? 15 : 14,
      hco3High: input.sampleType === 'venous' ? 23 : 22,
      hco3Normal: 18,
      compensationTolerance: 5,
      anionGapLow: 13,
      anionGapHigh: 27,
    };
  }

  return {
    phLow: 7.35,
    phHigh: 7.45,
    pco2Low: input.sampleType === 'venous' ? 40 : 35,
    pco2High: input.sampleType === 'venous' ? 50 : 45,
    pco2Normal: input.sampleType === 'venous' ? 45 : 40,
    hco3Low: input.sampleType === 'venous' ? 21 : 20,
    hco3High: input.sampleType === 'venous' ? 26 : 24,
    hco3Normal: 24,
    compensationTolerance: 3,
    anionGapLow: 12,
    anionGapHigh: 24,
  };
}

function acidBaseSeverity(ph: number, phStatus: DeepAcidBaseInterpretation['phStatus']): DeepAcidBaseInterpretation['severity'] {
  if (phStatus === 'acidemia') {
    if (ph < 7.1) return 'life_threatening';
    if (ph < 7.2) return 'severe';
    if (ph < 7.3) return 'moderate';
    return 'mild';
  }
  if (phStatus === 'alkalemia') {
    if (ph > 7.65) return 'life_threatening';
    if (ph > 7.55) return 'severe';
    if (ph > 7.5) return 'moderate';
    return 'mild';
  }
  return undefined;
}

function severityText(severity?: DeepAcidBaseInterpretation['severity']): string {
  if (severity === 'life_threatening') return 'potencialmente ameacadora a vida';
  if (severity === 'severe') return 'grave';
  if (severity === 'moderate') return 'moderada';
  if (severity === 'mild') return 'leve';
  return 'sem gravidade definida pelo pH';
}

function getCalculatedAnionGap(input: BloodGasInput): number | undefined {
  if (input.AG !== undefined) return round(input.AG, 1);
  if (input.Na !== undefined && input.K !== undefined && input.Cl !== undefined && input.HCO3 !== undefined) {
    return round((input.Na + input.K) - (input.Cl + input.HCO3), 1);
  }
  if (input.Na !== undefined && input.Cl !== undefined && input.HCO3 !== undefined) {
    return round(input.Na - (input.Cl + input.HCO3), 1);
  }
  return undefined;
}

function buildClinicalContextPhrases(input: BloodGasInput): string[] {
  const ctx = input.clinicalContext || {};
  const phrases: string[] = [];
  if (ctx.vomiting) phrases.push('Vomito favorece perda de HCl gastrico, hipocloremia, deplecao de volume e alcalose metabolica cloro-responsiva.');
  if (ctx.diarrhea) phrases.push('Diarreia favorece perda intestinal de bicarbonato, acidose metabolica hipercloremica e hipovolemia.');
  if (ctx.shock) phrases.push('Choque/hipoperfusao favorece metabolismo anaerobio, hiperlactatemia e acidose metabolica com anions nao mensurados.');
  if (ctx.dyspnea) phrases.push('Dispneia pode gerar hiperventilacao com alcalose respiratoria; fadiga ventilatoria pode inverter para retencao de CO2.');
  if (ctx.suspectedDKA) phrases.push('Suspeita de cetoacidose diabetica exige correlacionar glicose, cetonas, potassio e anion gap.');
  if (ctx.urethralObstruction) phrases.push('Obstrucao uretral favorece acidose metabolica, hipercalemia e risco eletrico cardiaco.');
  if (ctx.oxygenTherapy) phrases.push('Uso de oxigenio exige interpretar PaO2 pela FiO2 e nao por valor absoluto isolado.');
  if (ctx.mechanicalVentilation) phrases.push('Ventilacao mecanica torna pCO2 um alvo terapeutico direto; ajustar ventilacao minuto conforme tendencia.');
  return phrases;
}

function buildAcidBaseExamCorrelation(input: BloodGasInput, ref: AcidBaseReference): string[] {
  const items: string[] = [];
  const ag = getCalculatedAnionGap(input);
  if (ag !== undefined) {
    if (ag > ref.anionGapHigh) {
      items.push(`Anion gap ${ag} acima da faixa esperada: procurar acidos nao mensurados, especialmente lactato, cetonas, toxicos ou uremia.`);
    } else if (ag < ref.anionGapLow) {
      items.push(`Anion gap ${ag} baixo: correlacionar com albumina baixa, hemodiluicao ou erro analitico antes de concluir.`);
    } else {
      items.push(`Anion gap ${ag} dentro da faixa: se ha acidose metabolica, perda de bicarbonato/hipercloremia ganha peso no diferencial.`);
    }
  } else {
    items.push('Sem Na/K/Cl/HCO3 completos, o anion gap nao foi calculado; isso limita a diferenciacao entre acidose hipercloremica e acidose por acidos nao mensurados.');
  }

  if (input.albumin !== undefined && ag !== undefined) {
    const corrected = round(ag + (2.5 * (3.5 - input.albumin)), 1);
    if (input.albumin < 2.5) {
      items.push(`Albumina ${input.albumin} g/dL pode mascarar aumento do anion gap; AG corrigido aproximado ${corrected}.`);
    }
  }

  if (input.lactate !== undefined) {
    if (input.lactate >= 4) items.push(`Lactato ${input.lactate} mmol/L e alto: correlacionar com perfusao, pressao arterial, temperatura, dor, sepse, hipoxemia e depuracao seriada.`);
    else if (input.lactate >= 2.5) items.push(`Lactato ${input.lactate} mmol/L esta aumentado: repetir em serie e procurar hipoperfusao regional ou sistemica.`);
    else items.push(`Lactato ${input.lactate} mmol/L nao sustenta acidose lactica importante neste momento.`);
  }

  if (input.Na !== undefined && input.Cl !== undefined) {
    const ratio = round(input.Cl / input.Na, 3);
    const difference = round(input.Na - input.Cl, 1);
    if (ratio > 0.79 || difference < 30) {
      items.push(`Cl/Na ${ratio} e Na-Cl ${difference}: padrao relativamente hipercloremico, coerente com efeito acidificante por reducao do strong ion difference.`);
    } else if (ratio < 0.72 || difference > 38) {
      items.push(`Cl/Na ${ratio} e Na-Cl ${difference}: padrao hipocloremico, que sustenta alcalose metabolica cloro-responsiva quando o HCO3 esta alto.`);
    }
  }

  if (input.K !== undefined) {
    if (input.K >= 6) items.push(`Potassio ${input.K} mEq/L: risco arritmico; acidemia e obstrucao urinaria podem deslocar K para o extracelular.`);
    if (input.K <= 3) items.push(`Potassio ${input.K} mEq/L: risco de fraqueza, ileo e agravamento de alcalose; corrigir antes de terapias que empurrem K para dentro da celula.`);
  }

  if (input.glucose !== undefined && input.glucose >= 250) {
    items.push(`Glicose ${input.glucose} mg/dL: se houver acidose metabolica e AG elevado, investigar cetose/cetoacidose e deficit corporal de potassio.`);
  }

  return items;
}

function buildMixedDisorderClues(input: BloodGasInput, ref: AcidBaseReference, disorder: AcidBasePrimaryDisorder, expectedLow?: number, expectedHigh?: number): string[] {
  const clues: string[] = [];
  const pCO2 = input.pCO2;
  const hco3 = input.HCO3;
  const ag = getCalculatedAnionGap(input);

  if (expectedLow !== undefined && expectedHigh !== undefined && pCO2 !== undefined) {
    if (disorder === 'metabolic_acidosis') {
      if (pCO2 > expectedHigh) clues.push('pCO2 acima do esperado para acidose metabolica: componente de acidose respiratoria por hipoventilacao/fadiga deve ser considerado.');
      if (pCO2 < expectedLow) clues.push('pCO2 abaixo do esperado para acidose metabolica: alcalose respiratoria concomitante por dor, sepse, hipoxemia ou hiperventilacao e provavel.');
    }
    if (disorder === 'metabolic_alkalosis') {
      if (pCO2 > expectedHigh) clues.push('pCO2 acima do esperado para alcalose metabolica: hipoventilacao/acidose respiratoria concomitante pode estar presente.');
      if (pCO2 < expectedLow) clues.push('pCO2 abaixo do esperado para alcalose metabolica: alcalose respiratoria concomitante deve ser considerada.');
    }
  }

  if (disorder === 'respiratory_acidosis' && hco3 !== undefined) {
    const delta = (pCO2 ?? ref.pco2Normal) - ref.pco2Normal;
    const acute = ref.hco3Normal + (1.5 * (delta / 10));
    const chronic = ref.hco3Normal + (3.5 * (delta / 10));
    if (hco3 < acute - ref.compensationTolerance) clues.push('HCO3 menor que a compensacao renal esperada: acidose metabolica associada deve ser procurada.');
    if (hco3 > chronic + ref.compensationTolerance) clues.push('HCO3 maior que a compensacao cronica esperada: alcalose metabolica associada e possivel.');
  }

  if (disorder === 'respiratory_alkalosis' && hco3 !== undefined) {
    const delta = ref.pco2Normal - (pCO2 ?? ref.pco2Normal);
    const acute = ref.hco3Normal - (2.5 * (delta / 10));
    const chronic = ref.hco3Normal - (5.5 * (delta / 10));
    if (hco3 > acute + ref.compensationTolerance) clues.push('HCO3 maior que o esperado para alcalose respiratoria: alcalose metabolica associada e possivel.');
    if (hco3 < chronic - ref.compensationTolerance) clues.push('HCO3 menor que o esperado para alcalose respiratoria: acidose metabolica associada deve ser procurada.');
  }

  if (disorder === 'metabolic_acidosis' && ag !== undefined && hco3 !== undefined) {
    const deltaAg = Math.max(0, ag - ref.anionGapHigh);
    const deltaHco3 = Math.max(0.1, ref.hco3Normal - hco3);
    const deltaRatio = round(deltaAg / deltaHco3, 2);
    if (ag > ref.anionGapHigh) {
      clues.push(`Delta ratio aproximado ${deltaRatio}: ajuda a separar acidose por AG alto pura de disturbio metabolico misto.`);
      if (deltaRatio < 0.8 && input.Cl !== undefined) clues.push('Delta ratio baixo sugere componente hipercloremico adicional por perda de bicarbonato ou carga de cloreto.');
      if (deltaRatio > 2) clues.push('Delta ratio alto sugere alcalose metabolica associada ou HCO3 mais alto que o esperado para o AG.');
    }
  }

  return clues;
}

function interpretAcidBase(input: BloodGasInput, quality: DataQualityAssessment, steps: string[]): DeepAcidBaseInterpretation {
  const result: DeepAcidBaseInterpretation = {
    domainStatus: 'inconclusive',
    phStatus: 'unknown',
    primaryDisorder: 'unknown',
    primaryLogic: 'Dados insuficientes para definir o disturbio acido-base.',
    compensationStatus: 'not_applicable',
    physiologicalExplanation: 'Sem pH, pCO2 e HCO3/BE suficientes, a avaliacao acido-base fica limitada.',
    physiologicMechanisms: [],
    clinicalCorrelation: [],
    examCorrelation: [],
    mixedDisorderClues: [],
    commonCauses: [],
    summary: 'Equilibrio acido-base inconclusivo.',
  };

  if (!quality.canAssessAcidBase) return result;
  if (quality.domainStatus === 'blocked') {
    result.domainStatus = 'blocked';
    result.summary = 'Analise acido-base bloqueada por dados incoerentes ou implausiveis.';
    return result;
  }

  const ph = input.pH!;
  const pCO2 = input.pCO2!;
  const hco3 = input.HCO3;
  const be = input.BE;
  const speciesLabel = input.species === 'feline' ? 'felino' : 'canino';
  const ref = getAcidBaseReference(input);
  const { phLow, phHigh, pco2Normal, hco3Normal } = ref;

  result.domainStatus = 'ok';
  result.phStatus = ph < phLow ? 'acidemia' : ph > phHigh ? 'alkalemia' : 'normal';
  result.severity = acidBaseSeverity(ph, result.phStatus);
  steps.push(`Passo 1: pH ${ph} em ${speciesLabel} indica ${result.phStatus === 'normal' ? 'faixa aparentemente normal' : result.phStatus}.`);

  const metabolicSignal = hco3 !== undefined
    ? hco3 < ref.hco3Low ? 'acidosis' : hco3 > ref.hco3High ? 'alkalosis' : 'neutral'
    : be !== undefined
      ? be < -4 ? 'acidosis' : be > 4 ? 'alkalosis' : 'neutral'
      : 'neutral';
  const respiratorySignal = pCO2 > ref.pco2High ? 'acidosis' : pCO2 < ref.pco2Low ? 'alkalosis' : 'neutral';

  if (result.phStatus === 'acidemia') {
    if (metabolicSignal === 'acidosis' && respiratorySignal === 'acidosis') {
      result.primaryDisorder = 'mixed';
      result.mixedDisorderReason = 'Componente metabolico e respiratorio caminham em direcao acidemica.';
    } else if (metabolicSignal === 'acidosis') {
      result.primaryDisorder = 'metabolic_acidosis';
    } else if (respiratorySignal === 'acidosis') {
      result.primaryDisorder = 'respiratory_acidosis';
    }
  } else if (result.phStatus === 'alkalemia') {
    if (metabolicSignal === 'alkalosis' && respiratorySignal === 'alkalosis') {
      result.primaryDisorder = 'mixed';
      result.mixedDisorderReason = 'Componente metabolico e respiratorio caminham em direcao alcalemica.';
    } else if (metabolicSignal === 'alkalosis') {
      result.primaryDisorder = 'metabolic_alkalosis';
    } else if (respiratorySignal === 'alkalosis') {
      result.primaryDisorder = 'respiratory_alkalosis';
    }
  } else {
    if (metabolicSignal !== 'neutral' || respiratorySignal !== 'neutral') {
      result.primaryDisorder = 'mixed';
      result.mixedDisorderReason = 'pH normal nao exclui disturbio misto quando pCO2 e HCO3/BE estao alterados.';
    } else {
      result.primaryDisorder = 'normal';
    }
  }

  result.primaryLogic = result.mixedDisorderReason || `Sinal metabolico: ${metabolicSignal}. Sinal respiratorio: ${respiratorySignal}.`;
  steps.push(`Passo 2: processo primario sugerido: ${result.primaryDisorder}.`);

  const tolerance = ref.compensationTolerance;
  if (hco3 !== undefined) {
    if (result.primaryDisorder === 'metabolic_acidosis') {
      const expected = round(pco2Normal - (0.7 * (hco3Normal - hco3)), 1);
      const low = round(expected - tolerance, 1);
      const high = round(expected + tolerance, 1);
      result.compensationFormula = `pCO2 esperada = pCO2 normal - 0,7 x (HCO3 normal - HCO3 observado), tolerancia aproximada +/- ${tolerance} mmHg.`;
      result.expectedCompensation = `Compensacao esperada: pCO2 ~ ${expected} mmHg (faixa ${low}-${high}).`;
      result.observedCompensation = `pCO2 observado: ${pCO2} mmHg.`;
      result.compensationStatus = Math.abs(pCO2 - expected) <= tolerance ? 'compensated' : 'mixed_suspected';
      result.compensationInterpretation = pCO2 > high
        ? 'Ventilacao menor que a esperada para compensar a acidose metabolica; considerar acidose respiratoria concomitante.'
        : pCO2 < low
          ? 'Ventilacao maior que a esperada; considerar alcalose respiratoria concomitante.'
          : 'Resposta ventilatoria coerente: a queda da pCO2 reduz acido carbonico e tenta elevar o pH.';
      result.mixedDisorderClues = buildMixedDisorderClues(input, ref, result.primaryDisorder, low, high);
    } else if (result.primaryDisorder === 'metabolic_alkalosis') {
      const expected = round(pco2Normal + (0.7 * (hco3 - hco3Normal)), 1);
      const low = round(expected - tolerance, 1);
      const high = round(expected + tolerance, 1);
      result.compensationFormula = `pCO2 esperada = pCO2 normal + 0,7 x (HCO3 observado - HCO3 normal), tolerancia aproximada +/- ${tolerance} mmHg.`;
      result.expectedCompensation = `Compensacao esperada: pCO2 ~ ${expected} mmHg (faixa ${low}-${high}).`;
      result.observedCompensation = `pCO2 observado: ${pCO2} mmHg.`;
      result.compensationStatus = Math.abs(pCO2 - expected) <= tolerance ? 'compensated' : 'mixed_suspected';
      result.compensationInterpretation = pCO2 > high
        ? 'Retencao de CO2 maior que a esperada; avaliar hipoventilacao, sedacao, doenca pulmonar ou fadiga.'
        : pCO2 < low
          ? 'pCO2 baixa demais para compensacao; considerar alcalose respiratoria concomitante.'
          : 'Hipoventilacao compensatoria coerente, limitada pela necessidade de manter oxigenacao.';
      result.mixedDisorderClues = buildMixedDisorderClues(input, ref, result.primaryDisorder, low, high);
    } else if (result.primaryDisorder === 'respiratory_acidosis') {
      const delta = pCO2 - pco2Normal;
      const acute = round(hco3Normal + (1.5 * (delta / 10)), 1);
      const chronic = round(hco3Normal + (3.5 * (delta / 10)), 1);
      result.compensationFormula = 'Acidose respiratoria: HCO3 aumenta pouco no quadro agudo e mais no cronico por retencao renal de bicarbonato.';
      result.expectedCompensation = `HCO3 esperado: ${acute} (aguda) a ${chronic} (cronica) mEq/L.`;
      result.observedCompensation = `HCO3 observado: ${hco3} mEq/L.`;
      result.compensationStatus = hco3 < acute - tolerance || hco3 > chronic + tolerance ? 'mixed_suspected' : 'partially_compensated';
      result.compensationInterpretation = hco3 < acute - tolerance
        ? 'Bicarbonato baixo demais para acidose respiratoria isolada; acidose metabolica associada deve ser investigada.'
        : hco3 > chronic + tolerance
          ? 'Bicarbonato alto demais para compensacao renal esperada; alcalose metabolica associada e possivel.'
          : 'HCO3 compativel com resposta renal esperada para retencao de CO2.';
      result.mixedDisorderClues = buildMixedDisorderClues(input, ref, result.primaryDisorder);
    } else if (result.primaryDisorder === 'respiratory_alkalosis') {
      const delta = pco2Normal - pCO2;
      const acute = round(hco3Normal - (2.5 * (delta / 10)), 1);
      const chronic = round(hco3Normal - (5.5 * (delta / 10)), 1);
      result.compensationFormula = 'Alcalose respiratoria: HCO3 cai por tamponamento e, se cronica, por maior excrecao renal de bicarbonato.';
      result.expectedCompensation = `HCO3 esperado: ${acute} (aguda) a ${chronic} (cronica) mEq/L.`;
      result.observedCompensation = `HCO3 observado: ${hco3} mEq/L.`;
      result.compensationStatus = hco3 > acute + tolerance || hco3 < chronic - tolerance ? 'mixed_suspected' : 'partially_compensated';
      result.compensationInterpretation = hco3 > acute + tolerance
        ? 'HCO3 alto demais para alcalose respiratoria isolada; alcalose metabolica associada e possivel.'
        : hco3 < chronic - tolerance
          ? 'HCO3 baixo demais para compensacao esperada; acidose metabolica associada deve ser procurada.'
          : 'HCO3 compativel com resposta metabolica/renal a queda de CO2.';
      result.mixedDisorderClues = buildMixedDisorderClues(input, ref, result.primaryDisorder);
    } else {
      result.compensationStatus = 'not_applicable';
    }
  }

  if (result.primaryDisorder === 'mixed' && !result.mixedDisorderClues?.length) {
    result.mixedDisorderClues = [
      result.mixedDisorderReason || 'pH, pCO2 e componente metabolico nao seguem um unico disturbio simples.',
      'Em disturbios mistos, o pH pode parecer menos alterado que a gravidade real porque processos opostos se anulam parcialmente.',
    ];
  }

  result.examCorrelation = buildAcidBaseExamCorrelation(input, ref);
  result.clinicalCorrelation = buildClinicalContextPhrases(input);

  result.physiologicMechanisms = (() => {
    switch (result.primaryDisorder) {
      case 'metabolic_acidosis':
        return [
          'O HCO3/BE representa o tampao metabolico. Quando cai, ha consumo ou perda de base e aumento relativo de H+.',
          'A compensacao imediata e hiperventilar para reduzir pCO2; isso desloca o equilibrio CO2-H2CO3-H+ para menor acidez.',
          'A separacao entre AG alto e AG normal define se ha acidos nao mensurados ou perda de bicarbonato com hipercloremia.',
        ];
      case 'metabolic_alkalosis':
        return [
          'O aumento de HCO3 geralmente vem de perda de H+ gastrico, contracao de volume, deplecao de cloreto/potassio ou carga alcalina.',
          'A resposta respiratoria e reter CO2 por hipoventilacao relativa, mas essa compensacao e limitada pela necessidade de oxigenar.',
          'Hipocloremia mantem alcalose porque reduz a capacidade renal de excretar bicarbonato.',
        ];
      case 'respiratory_acidosis':
        return [
          'pCO2 alto indica hipoventilacao alveolar: o CO2 produzido nos tecidos nao esta sendo eliminado adequadamente.',
          'O aumento de CO2 eleva acido carbonico e H+, reduzindo o pH rapidamente em quadros agudos.',
          'A compensacao renal por retencao de bicarbonato leva horas a dias; HCO3 normal em hipercapnia importante sugere quadro agudo.',
        ];
      case 'respiratory_alkalosis':
        return [
          'pCO2 baixo indica hiperventilacao alveolar, comum em dor, ansiedade, hipoxemia, febre ou sepse inicial.',
          'A queda de CO2 reduz acido carbonico e H+, elevando o pH.',
          'Se persistente, o rim aumenta excrecao de bicarbonato para reduzir a alcalemia.',
        ];
      case 'mixed':
        return [
          'Mais de um processo primario parece atuar ao mesmo tempo; a avaliacao de compensacao deixa de seguir uma unica formula simples.',
          'pH normal ou pouco alterado nao garante seguranca quando pCO2, HCO3, cloro, lactato ou AG estao desviados.',
        ];
      default:
        return [
          'pH, pCO2 e HCO3/BE foram avaliados em conjunto; sem desvio dominante, a interpretacao depende da tendencia seriada e do quadro clinico.',
        ];
    }
  })();

  if (input.species === 'feline') {
    result.physiologicalExplanation = `${result.primaryLogic} Gravidade pelo pH: ${severityText(result.severity)}. Em gatos, as formulas de compensacao sao menos previsiveis que em caes; interpretar com cautela clinica adicional. ${result.physiologicMechanisms.join(' ')}`;
  } else {
    result.physiologicalExplanation = `${result.primaryLogic} Gravidade pelo pH: ${severityText(result.severity)}. A relacao pCO2-HCO3 foi usada para avaliar compensacao e suspeita de disturbio misto. ${result.physiologicMechanisms.join(' ')}`;
  }

  result.summary = result.primaryDisorder === 'normal'
    ? 'Sem disturbio acido-base dominante com os dados atuais.'
    : result.compensationStatus === 'mixed_suspected'
      ? `${result.primaryDisorder} com suspeita de disturbio misto por compensacao fora do esperado.`
      : `${result.primaryDisorder} com avaliacao de compensacao realizada.`;

  result.commonCauses = (() => {
    switch (result.primaryDisorder) {
      case 'metabolic_acidosis':
        return ['hipoperfusao/choque', 'DKA', 'doenca renal', 'perda gastrointestinal de bicarbonato'];
      case 'metabolic_alkalosis':
        return ['vomitos', 'obstrucao pilorica', 'diureticos', 'deplecao de cloreto'];
      case 'respiratory_acidosis':
        return ['hipoventilacao alveolar', 'sedacao/anestesia', 'doenca pleural', 'fadiga respiratoria'];
      case 'respiratory_alkalosis':
        return ['dor', 'ansiedade', 'hipoxemia', 'sepse inicial'];
      default:
        return [];
    }
  })();

  steps.push(`Passo 3: avaliacao de compensacao -> ${result.compensationStatus}.`);
  if (result.compensationInterpretation) steps.push(`Passo 3A: ${result.compensationInterpretation}`);
  if (result.mixedDisorderClues.length > 0) steps.push(`Passo 3B: pistas de disturbio misto: ${result.mixedDisorderClues.join(' ')}`);
  return result;
}

function interpretOxygenation(input: BloodGasInput, quality: DataQualityAssessment, fio2Info: ReturnType<typeof normalizeFiO2Input>): DeepOxygenationAssessment {
  const result: DeepOxygenationAssessment = {
    domainStatus: 'inconclusive',
    status: 'cannot_assess',
    physiologicalExplanation: 'Oxigenacao nao avaliavel com os dados atuais.',
    summary: 'Oxigenacao nao avaliavel com os dados atuais.',
  };

  if (input.sampleType === 'venous') {
    result.domainStatus = 'limited';
    result.status = 'cannot_assess';
    result.limitationNote = 'Amostra venosa: pO2 e SatO2 venosos nao devem classificar hipoxemia arterial.';
    result.summary = 'Avaliacao de oxigenacao pulmonar limitada por uso de amostra venosa.';
    result.physiologicalExplanation = input.pO2 !== undefined && input.sO2 !== undefined
      ? `PvO2 ${input.pO2} mmHg e satO2 venosa ${input.sO2}% podem refletir extracao tecidual/consumo de O2; nao equivalem a PaO2/SaO2.`
      : 'Amostra venosa permite leitura metabolica e acido-base, mas nao classifica oxigenacao pulmonar arterial.';
    return result;
  }

  if (quality.domainStatus === 'blocked') {
    result.domainStatus = 'blocked';
    result.limitationNote = 'Dados incoerentes bloqueiam conclusao confiavel de oxigenacao.';
    return result;
  }

  if (input.pO2 === undefined) {
    result.domainStatus = 'limited';
    result.limitationNote = 'Sem PaO2 nao e possivel concluir oxigenacao arterial.';
    return result;
  }

  const fio2Fraction = fio2Info.fraction ?? 0.21;
  const pb = getApproxBarometricPressure(input);
  const paO2 = input.pO2;
  const pCO2 = input.pCO2;
  result.domainStatus = 'ok';
  result.fio2Context = `FiO2 usada: ${(fio2Info.displayPercent ?? 21).toFixed(1)}% (${fio2Info.source || 'assumed'}).`;
  result.status = paO2 < 60 ? 'hypoxemia' : paO2 > 120 ? 'hyperoxemia' : 'normal';
  result.severity = paO2 < 40 ? 'severe' : paO2 < 50 ? 'moderate' : paO2 < 60 ? 'mild' : undefined;
  result.paO2Interpretation = `PaO2 ${paO2} mmHg.`;
  if (input.sO2 !== undefined) result.saO2Interpretation = `SaO2 reportada: ${input.sO2}%.`;
  result.pfRatio = round(paO2 / fio2Fraction, 0);

  if (pCO2 !== undefined) {
    result.pao2 = round((fio2Fraction * (pb - 47)) - (pCO2 / 0.8), 1);
    result.aaGradient = round(result.pao2 - paO2, 1);
  }

  if (result.status === 'hypoxemia' && result.aaGradient !== undefined) {
    if (result.aaGradient <= 20 && (pCO2 ?? 0) > 45) result.suspectedMechanism = 'Hipoventilacao alveolar';
    else if (result.aaGradient > 20 && result.aaGradient <= 35) result.suspectedMechanism = 'V/Q mismatch predominante';
    else if (result.aaGradient > 35) result.suspectedMechanism = 'Shunt/VQ mismatch importante ou difusao';
  }

  const pfText = result.pfRatio === undefined
    ? 'P/F nao calculavel.'
    : result.pfRatio > 500
      ? 'P/F dentro de faixa esperada para ar ambiente ao nivel do mar.'
      : result.pfRatio >= 300
        ? 'P/F sugere comprometimento leve de oxigenacao.'
        : result.pfRatio >= 200
          ? 'P/F sugere comprometimento moderado.'
          : 'P/F sugere comprometimento importante.';

  result.physiologicalExplanation = [
    result.status === 'hypoxemia' ? `Hipoxemia arterial ${result.severity || ''}.` : result.status === 'hyperoxemia' ? 'Hiperoxia detectada.' : 'Sem hipoxemia arterial dominante.',
    result.pao2 !== undefined ? `PAO2 aproximada: ${result.pao2} mmHg.` : 'PAO2 nao calculada por falta de PaCO2.',
    result.aaGradient !== undefined ? `Gradiente A-a aproximado: ${result.aaGradient} mmHg.` : '',
    pfText,
    result.suspectedMechanism ? `Mecanismo mais provavel: ${result.suspectedMechanism}.` : '',
  ].filter(Boolean).join(' ');

  result.summary = result.status === 'normal'
    ? 'Oxigenacao arterial sem alteracao dominante.'
    : result.status === 'hyperoxemia'
      ? 'Oxigenacao arterial elevada (hiperoxia).'
      : `Hipoxemia arterial ${result.severity || ''} com avaliacao de P/F e A-a.`;

  return result;
}

function buildFinding(parameter: keyof BloodGasInput, value: number, status: 'low' | 'normal' | 'high', ratioHint?: string): DeepElectrolyteAssessment {
  const guide = PARAMETER_GUIDE[parameter];
  return {
    parameter: guide?.label || String(parameter),
    status,
    value,
    ratioHint,
    clinicalExplanation: status === 'high' ? guide?.highMeaning || 'Valor acima da faixa.' : status === 'low' ? guide?.lowMeaning || 'Valor abaixo da faixa.' : 'Sem alteracao dominante.',
    acidBaseRelation: guide?.relationships?.[0] || 'Interpretar no conjunto.',
    physiologicalImpact: guide?.whatItIs || 'Parametro de contexto.',
    mainRisk: guide?.pitfalls?.[0] || 'Correlacionar com quadro clinico.',
    monitoring: guide?.relationships?.[1] || 'Monitorar em serie.',
  };
}

function interpretElectrolytes(
  input: BloodGasInput,
  quality: DataQualityAssessment,
  alerts: ClinicalAlert[],
  hypotheses: string[],
  actions: ClinicalActions
): { findings: DeepElectrolyteAssessment[]; summary: string; domainStatus: DomainStatus; anionGap?: InterpretationResult['anionGap']; baseExcess?: InterpretationResult['baseExcess']; } {
  const findings: DeepElectrolyteAssessment[] = [];
  let domainStatus: DomainStatus = 'inconclusive';

  const tracked = [
    ['Na', input.Na, 140, 155],
    ['K', input.K, 3.5, 5.5],
    ['Cl', input.Cl, input.species === 'canine' ? 105 : 115, input.species === 'canine' ? 115 : 125],
    ['lactate', input.lactate, 0.5, 2.5],
    ['glucose', input.glucose, 70, 130],
    ['iCa', input.iCa, 1.1, 1.4],
    ['albumin', input.albumin, 2.5, 4.0],
  ] as const;

  for (const [key, value, low, high] of tracked) {
    if (value === undefined || quality.suspectFields.includes(String(key))) continue;
    domainStatus = 'ok';
    const status = value < low ? 'low' : value > high ? 'high' : 'normal';
    if (status !== 'normal') findings.push(buildFinding(key, value, status));
  }

  if (input.Na !== undefined && input.Cl !== undefined) {
    const clNaRatio = round(input.Cl / input.Na, 3);
    const naMinusCl = round(input.Na - input.Cl, 1);
    let chlorideHint = `Relacao Cl/Na ${clNaRatio} e Na-Cl ${naMinusCl}.`;
    if (clNaRatio > 0.79 || naMinusCl < 30) {
      chlorideHint += ' Tendencia acidificante/hipercloremica.';
    } else if (clNaRatio < 0.72 || naMinusCl > 38) {
      chlorideHint += ' Tendencia alcalinizante/hipoclorêmica.';
    }
    findings.push(buildFinding('Cl', input.Cl, 'normal', chlorideHint));
  }

  if (input.K !== undefined && input.K >= 6) {
    alerts.push({ level: 'critical', message: 'Hipercalemia importante com risco eletrico. ECG imediato deve ser considerado.' });
    actions.immediate.push('Hipercalemia importante: monitorar ECG, considerar cardioprotecao com calcio e medidas de shift transcelular conforme contexto.');
  }
  if (input.K !== undefined && input.K <= 3) {
    actions.immediate.push('Hipocalemia: revisar reposicao de potassio, perdas gastrointestinais e risco de fraqueza/ileo.');
  }
  if (input.lactate !== undefined && input.lactate >= 2.5) {
    hypotheses.push('Hiperlactatemia sugere hipoperfusao ou metabolismo anaerobio aumentado.');
    actions.serial.push('Lactato alto: repetir em serie para avaliar depuracao e resposta terapeutica.');
  }
  if (input.glucose !== undefined && input.glucose < 70) {
    actions.immediate.push('Hipoglicemia: considerar bolus de dextrose e monitorizacao seriada.');
  }
  if (input.Na !== undefined && input.Na > 160) {
    actions.serial.push('Hipernatremia: diferenciar quadro agudo vs cronico e corrigir gradualmente para reduzir risco neurologico.');
  }

  let anionGap: InterpretationResult['anionGap'];
  if (input.Na !== undefined && input.K !== undefined && input.Cl !== undefined && input.HCO3 !== undefined) {
    const value = round((input.Na + input.K) - (input.Cl + input.HCO3), 1);
    const upper = input.species === 'canine' ? 24 : 27;
    const lower = input.species === 'canine' ? 12 : 13;
    const status = value > upper ? 'high' : value < lower ? 'low' : 'normal';
    anionGap = {
      value,
      status,
      explanation: status === 'high'
        ? `AG ${value} mEq/L elevado, sugerindo acidos nao mensurados.`
        : status === 'low'
          ? `AG ${value} mEq/L baixo; considerar hipoalbuminemia ou erro de entrada.`
          : `AG ${value} mEq/L dentro da faixa esperada.`,
    };
    if (input.albumin !== undefined) {
      const corrected = round(value + (2.5 * (3.5 - input.albumin)), 1);
      anionGap.correctedValue = corrected;
      anionGap.correctedStatus = corrected > upper ? 'high' : corrected < lower ? 'low' : 'normal';
      anionGap.explanation += ` AG corrigido por albumina: ${corrected}.`;
    }
  }

  const baseExcess = input.BE !== undefined
    ? {
        value: input.BE,
        status: input.BE < -4 ? 'deficit' as const : input.BE > 4 ? 'excess' as const : 'normal' as const,
        explanation: input.BE < -4 ? 'Deficit de base reforca componente metabolico acidemico.' : input.BE > 4 ? 'Excesso de base reforca componente metabolico alcalemico.' : 'BE sem desvio dominante.',
      }
    : undefined;

  const summary = findings.length > 0
    ? `${findings.length} achados eletroliticos/metabolicos relevantes integrados ao raciocinio.`
    : domainStatus === 'ok'
      ? 'Sem alteracoes eletroliticas/metabolicas dominantes nos parametros informados.'
      : 'Dominio eletrolitico inconclusivo por falta de dados.';

  return { findings, summary, domainStatus, anionGap, baseExcess };
}

function buildHypotheses(input: BloodGasInput, partial: Partial<InterpretationResult>): string[] {
  const hypotheses = CLINICAL_PATTERNS.filter((pattern) => pattern.when(input, partial)).map((pattern) => pattern.label);
  for (const interaction of PARAMETER_INTERACTIONS) {
    if (interaction.trigger.every((key) => key in input)) hypotheses.push(interaction.explanation);
  }
  return Array.from(new Set(hypotheses));
}

function buildActions(input: BloodGasInput, acidBase: DeepAcidBaseInterpretation, oxygenation: DeepOxygenationAssessment, quality: DataQualityAssessment): ClinicalActions {
  const actions: ClinicalActions = { immediate: [], serial: [], correlativeExams: [], whenToRepeat: [] };

  if (quality.confidence === 'blocked') {
    actions.immediate.push('Dados incoerentes: revisar digitacao, unidade, tipo de amostra e possibilidade de erro pre-analitico antes de concluir.');
  }
  if (acidBase.primaryDisorder === 'respiratory_acidosis') {
    actions.immediate.push('Acidose respiratoria: revisar via aerea, sedacao/anestesia, ventilacao e fadiga respiratoria. Bicarbonato nao e terapia primaria.');
    actions.correlativeExams.push('Correlacionar com oximetria, capnografia/EtCO2, imagem toracica e avaliacao de sedacao, obstrucao de via aerea ou fadiga muscular.');
  }
  if (acidBase.primaryDisorder === 'metabolic_acidosis') {
    actions.immediate.push('Acidose metabolica: priorizar perfusao e causa-base; bicarbonato apenas em cenarios selecionados.');
    actions.serial.push('Repetir lactato e gasometria para tendencia de resposta.');
    actions.correlativeExams.push('Correlacionar com lactato seriado, pressao arterial, perfusao periferica, creatinina/ureia, glicose/cetonas, urinalise e anion gap corrigido por albumina.');
  }
  if (acidBase.primaryDisorder === 'metabolic_alkalosis') {
    actions.immediate.push('Alcalose metabolica: revisar deplecao de cloreto/potassio e perdas gastricas; considerar reposicao cloreto-responsiva.');
    actions.correlativeExams.push('Correlacionar com Cl, K, Na-Cl, historico de vomito/diuretico, suspeita de obstrucao gastrica e resposta a reposicao de NaCl/KCl quando indicada.');
  }
  if (acidBase.primaryDisorder === 'respiratory_alkalosis') {
    actions.correlativeExams.push('Correlacionar com dor, febre, sepse inicial, hipoxemia, anemia e qualquer causa de drive ventilatorio aumentado.');
  }
  if (acidBase.compensationStatus === 'mixed_suspected' || acidBase.primaryDisorder === 'mixed') {
    actions.serial.push('Disturbio misto suspeito: repetir gasometria apos intervencoes e comparar pH, pCO2, HCO3/BE, Cl, AG e lactato.');
  }
  if (oxygenation.status === 'hypoxemia') {
    actions.immediate.push('Hipoxemia arterial: iniciar oxigenio suplementar e investigar mecanismo (hipoventilacao, V/Q mismatch, shunt, baixa PiO2, difusao).');
  }
  if (input.sampleType === 'venous') {
    actions.correlativeExams.push('Se ha suspeita respiratoria, correlacionar com SpO2 e considerar gasometria arterial.');
  }
  if (input.clinicalContext?.suspectedDKA || (input.glucose !== undefined && input.glucose >= 250)) {
    actions.correlativeExams.push('Suspeita de CAD/hiperglicemia: medir cetonas/beta-hidroxibutirato, urinalise, potassio seriado e osmolaridade efetiva quando disponivel.');
  }
  if (input.clinicalContext?.urethralObstruction || (input.K !== undefined && input.K >= 6)) {
    actions.correlativeExams.push('Hipercalemia/obstrucao urinaria: ECG, creatinina/ureia, urinalise e reavaliacao de K apos desobstrucao/terapia.');
  }

  actions.whenToRepeat?.push('Repetir hemogasometria em 30-60 min se instabilidade ou apos intervencoes relevantes.');
  actions.whenToRepeat?.push('Repetir em 2-4 h para acompanhar tendencia de pH, pCO2, lactato e eletrólitos.');
  return actions;
}

export function interpretBloodGas(
  input: BloodGasInput,
  context?: { submissionIssues?: SubmissionIssue[]; submissionConfidence?: DataQualityAssessment['confidence'] }
): InterpretationResult {
  const fio2Info = input.fio2 !== undefined
    ? normalizeFiO2Input(input.fio2)
    : { fraction: 0.21, displayPercent: 21, source: 'assumed' as const };
  const normalizedInput: BloodGasInput = { ...input, fio2: fio2Info.fraction ?? input.fio2 };

  const alerts: ClinicalAlert[] = [];
  const stepByStepLogic: string[] = [];
  const electrolyteHypotheses: string[] = [];
  const electrolyteActions: ClinicalActions = { immediate: [], serial: [], correlativeExams: [], whenToRepeat: [] };

  const temperatureContext = buildTemperatureContext(normalizedInput);
  const dataQuality = buildQualityAssessment(normalizedInput, fio2Info, temperatureContext, context?.submissionIssues);
  if (context?.submissionConfidence && context.submissionConfidence === 'blocked') {
    dataQuality.status = 'probable_error';
    dataQuality.domainStatus = 'blocked';
    dataQuality.confidence = 'blocked';
  }

  const deepAcidBase = interpretAcidBase(normalizedInput, dataQuality, stepByStepLogic);
  const deepOxygenation = interpretOxygenation(normalizedInput, dataQuality, fio2Info);
  const electrolyteDomain = interpretElectrolytes(normalizedInput, dataQuality, alerts, electrolyteHypotheses, electrolyteActions);

  const domainStatuses: DomainStatuses = {
    quality: dataQuality.domainStatus,
    acidBase: deepAcidBase.domainStatus,
    oxygenation: deepOxygenation.domainStatus,
    electrolytes: electrolyteDomain.domainStatus,
    hypotheses: 'limited',
    actionPlan: 'limited',
  };

  const partialResult: Partial<InterpretationResult> = { deepOxygenation, deepAcidBase };
  const clinicalHypotheses = Array.from(new Set([...electrolyteHypotheses, ...buildHypotheses(normalizedInput, partialResult)]));
  domainStatuses.hypotheses = clinicalHypotheses.length > 0 ? 'ok' : 'limited';

  const baseActions = buildActions(normalizedInput, deepAcidBase, deepOxygenation, dataQuality);
  const clinicalActions: ClinicalActions = {
    immediate: Array.from(new Set([...baseActions.immediate, ...electrolyteActions.immediate])),
    serial: Array.from(new Set([...baseActions.serial, ...electrolyteActions.serial])),
    correlativeExams: Array.from(new Set([...baseActions.correlativeExams, ...electrolyteActions.correlativeExams])),
    whenToRepeat: Array.from(new Set([...(baseActions.whenToRepeat || []), ...(electrolyteActions.whenToRepeat || [])])),
  };
  domainStatuses.actionPlan = clinicalActions.immediate.length > 0 || clinicalActions.serial.length > 0 ? 'ok' : 'limited';

  const clinicalSynthesis: InterpretationResult['clinicalSynthesis'] = {
    physiology: Array.from(new Set([
      ...(deepAcidBase.physiologicMechanisms || []),
      deepOxygenation.physiologicalExplanation,
      temperatureContext.summary,
    ].filter(Boolean))),
    clinicalCorrelation: Array.from(new Set([
      ...(deepAcidBase.clinicalCorrelation || []),
      ...clinicalHypotheses,
      ...(normalizedInput.clinicalNotes ? [normalizedInput.clinicalNotes] : []),
    ].filter(Boolean))),
    examCorrelation: Array.from(new Set([
      ...(deepAcidBase.examCorrelation || []),
      electrolyteDomain.summary,
      deepAcidBase.expectedCompensation || '',
      deepAcidBase.observedCompensation || '',
      deepAcidBase.compensationInterpretation || '',
    ].filter(Boolean))),
    pitfalls: Array.from(new Set([
      normalizedInput.sampleType === 'venous' ? 'Amostra venosa e excelente para pH/HCO3/lactato/eletrólitos, mas nao deve ser usada para diagnosticar hipoxemia arterial por pO2 venosa.' : '',
      ...(deepAcidBase.mixedDisorderClues || []),
      dataQuality.confidence !== 'high' ? 'Confianca nao alta: revisar tipo de amostra, unidade, temperatura, FiO2 e coerencia pH-pCO2-HCO3 antes de decisoes irreversiveis.' : '',
    ].filter(Boolean))),
  };

  if (temperatureContext.status === 'hypothermia') alerts.push({ level: 'warning', message: 'Hipotermia relevante pode alterar interpretacao fisiologica dos gases.' });
  if (temperatureContext.status === 'hyperthermia') alerts.push({ level: 'warning', message: 'Hipertermia aumenta demanda metabolica e influencia leitura clinica.' });
  for (const check of dataQuality.consistencyChecks) {
    if (check.level === 'critical') alerts.push({ level: 'critical', message: check.message });
  }

  stepByStepLogic.push(`Passo 4: qualidade dos dados ${dataQuality.status} (confianca ${dataQuality.confidence}).`);
  stepByStepLogic.push(`Passo 5: dominio de oxigenacao ${deepOxygenation.domainStatus}.`);
  stepByStepLogic.push(`Passo 6: dominio eletrolitico ${electrolyteDomain.domainStatus}.`);

  const executiveSummary = [
    `Amostra ${normalizedInput.sampleType === 'arterial' ? 'arterial' : 'venosa'} em ${normalizedInput.species === 'canine' ? 'canino' : 'felino'}.`,
    `Confianca global: ${dataQuality.confidence}.`,
    `Disturbio acido-base principal: ${deepAcidBase.primaryDisorder === 'unknown' ? 'inconclusivo' : deepAcidBase.primaryDisorder.replaceAll('_', ' ')}.`,
    deepOxygenation.summary,
    temperatureContext.summary,
  ].filter(Boolean);

  const expandedPhysiology = [
    'O pH resulta da interacao entre ventilacao alveolar (pCO2) e componente metabolico (HCO3/BE).',
    deepAcidBase.physiologicalExplanation,
    `Temperatura: ${temperatureContext.summary}`,
    electrolyteDomain.summary,
    deepOxygenation.physiologicalExplanation,
    'Cloro, lactato e AG ajudam a diferenciar causas metabolicas e a detectar acidos nao mensurados.',
  ].join(' ');

  const referencesUsed = [
    'Guia Pratico da Hemogasometria de Caes e Gatos',
    'Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice',
    'BSAVA Manual of Canine and Feline Emergency and Critical Care',
  ];

  return {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    input: normalizedInput,
    domainStatuses,
    dataQuality,
    executiveSummary,
    deepAcidBase,
    deepOxygenation,
    deepElectrolytes: electrolyteDomain.findings,
    clinicalSynthesis,
    temperatureContext,
    electrolyteSummary: electrolyteDomain.summary,
    anionGap: electrolyteDomain.anionGap,
    baseExcess: electrolyteDomain.baseExcess,
    clinicalHypotheses,
    clinicalActions,
    alerts,
    stepByStepLogic,
    expandedPhysiology,
    referencesUsed,
  };
}

