import {
  BloodGasInput,
  ClinicalAlert,
  ConsistencyCheck,
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

function round(value: number, digits = 1): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
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
        'Hipotermia pode alterar a relacao entre os valores reportados pelo analisador e a fisiologia real do paciente.',
        'O paciente pode produzir menos CO2 e consumir menos O2 do que um paciente normotermico.',
        'A temperatura deve ser contextualizada na interpretacao, especialmente em pacientes anestesiados, chocados ou muito graves.',
      ],
    };
  }

  if (input.temperature > 39.7) {
    return {
      domainStatus: 'limited',
      status: 'hyperthermia',
      summary: `Hipertermia relevante (${input.temperature} C).`,
      effectOnInterpretation: [
        'Hipertermia aumenta consumo de O2, producao de CO2 e demanda metabolica.',
        'Valores gasometricos devem ser lidos junto do contexto de perfusao, sepses, dor, estresse ou hipertermia ambiental.',
        'O analisador frequentemente reporta valores padronizados; a temperatura deve ser contextualizada clinicamente.',
      ],
    };
  }

  return {
    domainStatus: 'ok',
    status: 'normal',
    summary: `Temperatura informada (${input.temperature} C) sem alerta termico dominante.`,
    effectOnInterpretation: ['Temperatura registrada e incorporada como fator de contexto da interpretacao.'],
  };
}

function buildQualityAssessment(input: BloodGasInput, fio2Info: ReturnType<typeof normalizeFiO2Input>, temperatureContext: TemperatureContext): DataQualityAssessment {
  const messages: string[] = [];
  const suspectFields: string[] = [];
  const missingForComplete: string[] = [];
  const limitations: string[] = [];
  const consistencyChecks: ConsistencyCheck[] = [];

  const canAssessAcidBase = input.pH !== undefined && input.pCO2 !== undefined && (input.HCO3 !== undefined || input.BE !== undefined);
  const canAssessOxygenation = input.sampleType === 'arterial' && input.pO2 !== undefined;

  if (!canAssessAcidBase) missingForComplete.push('pH, pCO2 e HCO3/BE sao necessarios para interpretacao acido-base completa.');
  if (input.sampleType === 'arterial' && input.pO2 === undefined) missingForComplete.push('pO2 e necessario para avaliacao completa da oxigenacao arterial.');
  if (input.sampleType === 'venous') limitations.push('Amostra venosa nao deve ser usada para julgar desempenho pulmonar com base em pO2/PvO2.');

  const trackedFields: Array<[string, number | undefined, string]> = [
    ['pH', input.pH, ''],
    ['pCO2', input.pCO2, 'mmHg'],
    ['pO2', input.pO2, 'mmHg'],
    ['HCO3', input.HCO3, 'mEq/L'],
    ['BE', input.BE, 'mEq/L'],
    ['lactate', input.lactate, 'mmol/L'],
    ['Na', input.Na, 'mEq/L'],
    ['K', input.K, 'mEq/L'],
    ['Cl', input.Cl, 'mEq/L'],
    ['temperature', input.temperature, 'C'],
  ];

  for (const [field, value, unit] of trackedFields) {
    if (isImplausible(field, value)) {
      suspectFields.push(field);
      messages.push(`Valor de ${field} (${value} ${unit}) parece fisiologicamente implausivel e deve ser revisado.`);
    }
  }

  if (input.fio2 !== undefined) {
    if (fio2Info.warning) {
      suspectFields.push('fio2');
      messages.push(fio2Info.warning);
    }
    if (fio2Info.note) messages.push(fio2Info.note);
  }

  if (input.sampleType === 'venous' && input.pO2 !== undefined && input.pO2 > 80) {
    consistencyChecks.push({
      level: 'critical',
      message: 'Amostra venosa com pO2 muito alta para o padrao venoso habitual.',
      suggestion: 'Confirme se a amostra e realmente venosa ou se houve rotulo/entrada incorretos.',
      fields: ['sampleType', 'pO2'],
    });
  }

  if (input.sampleType === 'arterial' && input.pO2 === undefined) {
    consistencyChecks.push({
      level: 'warning',
      message: 'Amostra arterial sem pO2 informado.',
      suggestion: 'Sem pO2 nao e possivel qualificar a oxigenacao de forma completa.',
      fields: ['sampleType', 'pO2'],
    });
  }

  if (input.HCO3 !== undefined && input.BE !== undefined) {
    if (input.HCO3 < 18 && input.BE > 3) {
      consistencyChecks.push({
        level: 'critical',
        message: 'HCO3 baixo com BE positivo forte e internamente incoerente.',
        suggestion: 'Confirme se o sinal do BE foi digitado corretamente ou se o campo pertence a outra coluna.',
        fields: ['HCO3', 'BE'],
      });
    }
    if (input.HCO3 > 28 && input.BE < -3) {
      consistencyChecks.push({
        level: 'critical',
        message: 'HCO3 alto com BE negativo forte sugere conflito entre parametros.',
        suggestion: 'Revise unidade, sinal do BE e origem do valor copiado.',
        fields: ['HCO3', 'BE'],
      });
    }
  }

  if (input.pH !== undefined && input.pCO2 !== undefined && input.HCO3 !== undefined) {
    const hendersonPlausibility = 6.1 + Math.log10(input.HCO3 / (0.03 * input.pCO2));
    if (Math.abs(hendersonPlausibility - input.pH) > 0.12) {
      consistencyChecks.push({
        level: 'warning',
        message: 'pH, pCO2 e HCO3 formam um conjunto com coerencia interna reduzida.',
        suggestion: 'Confirme casas decimais, erro de OCR ou troca entre HCO3 medido e std HCO3.',
        fields: ['pH', 'pCO2', 'HCO3'],
      });
    }
  }

  if (input.sampleType === 'arterial' && input.sO2 !== undefined && input.pO2 !== undefined && input.pO2 < 60 && input.sO2 > 98) {
    consistencyChecks.push({
      level: 'warning',
      message: 'SatO2 muito alta para uma pO2 arterial baixa.',
      suggestion: 'Confirme se a saturacao pertence ao mesmo exame e se houve erro de parser/unidade.',
      fields: ['sO2', 'pO2'],
    });
  }

  if (fio2Info.displayPercent === 21 && input.pO2 !== undefined && input.pO2 > 140 && input.sampleType === 'arterial') {
    consistencyChecks.push({
      level: 'critical',
      message: 'pO2 arterial muito alta para ar ambiente.',
      suggestion: 'Revise FiO2, tipo de amostra e possivel troca de unidade (0.21 vs 21%).',
      fields: ['pO2', 'fio2'],
    });
  }

  const severeCheck = consistencyChecks.some((entry) => entry.level === 'critical');
  const probableError = severeCheck || suspectFields.length > 0;
  const status = probableError ? 'probable_error' : limitations.length > 0 || consistencyChecks.length > 0 ? 'caution' : 'reliable';

  return {
    status,
    domainStatus: probableError ? 'blocked' : limitations.length > 0 || missingForComplete.length > 0 ? 'limited' : 'ok',
    messages,
    suspectFields,
    canAssessAcidBase,
    canAssessOxygenation,
    missingForComplete,
    limitations,
    consistencyChecks,
    temperatureImpact: temperatureContext.effectOnInterpretation,
    fio2Normalization: fio2Info.fraction !== undefined && input.fio2 !== undefined ? {
      originalValue: input.fio2,
      normalizedFraction: fio2Info.fraction,
      displayPercent: fio2Info.displayPercent || round(fio2Info.fraction * 100, 1),
      source: fio2Info.source || 'fraction',
    } : undefined,
  };
}
function interpretAcidBase(input: BloodGasInput, quality: DataQualityAssessment, steps: string[]): DeepAcidBaseInterpretation {
  const result: DeepAcidBaseInterpretation = {
    domainStatus: 'inconclusive',
    phStatus: 'unknown',
    primaryDisorder: 'unknown',
    primaryLogic: 'Dados insuficientes para definir o disturbio acido-base.',
    compensationStatus: 'not_applicable',
    physiologicalExplanation: 'Sem pH, pCO2 e HCO3/BE suficientes, a avaliacao acido-base fica incompleta.',
    commonCauses: [],
    summary: 'Equilibrio acido-base inconclusivo com os dados atuais.',
  };

  if (!quality.canAssessAcidBase) return result;

  if (['pH', 'pCO2', 'HCO3', 'BE'].some((field) => quality.suspectFields.includes(field))) {
    result.domainStatus = 'blocked';
    result.primaryLogic = 'O dominio acido-base foi bloqueado por valores implausiveis nos parametros centrais.';
    result.summary = 'Analise acido-base bloqueada por dados implausiveis.';
    return result;
  }

  const ph = input.pH!;
  const pCO2 = input.pCO2!;
  const hco3 = input.HCO3;
  const be = input.BE;
  const phLow = input.species === 'canine' ? 7.35 : 7.25;
  const phHigh = input.species === 'canine' ? 7.45 : 7.4;
  const pco2Normal = input.species === 'canine' ? 40 : 31;
  const hco3Normal = input.species === 'canine' ? 22 : 18;

  result.domainStatus = hco3 === undefined ? 'limited' : 'ok';
  result.phStatus = ph < phLow ? 'acidemia' : ph > phHigh ? 'alkalemia' : 'normal';
  steps.push(`Passo 1: pH ${ph} indica ${result.phStatus === 'normal' ? 'pH aparentemente normal' : result.phStatus}.`);

  const metabolicSignal = hco3 !== undefined ? (hco3 < hco3Normal ? 'acidosis' : hco3 > hco3Normal ? 'alkalosis' : 'neutral') : be !== undefined ? (be < -4 ? 'acidosis' : be > 4 ? 'alkalosis' : 'neutral') : 'neutral';
  const respiratorySignal = pCO2 > pco2Normal ? 'acidosis' : pCO2 < pco2Normal ? 'alkalosis' : 'neutral';

  if (result.phStatus === 'acidemia') {
    if (metabolicSignal === 'acidosis' && respiratorySignal === 'acidosis') {
      result.primaryDisorder = 'mixed';
      result.mixedDisorderReason = 'HCO3/BE e pCO2 caminham na mesma direcao acidemica.';
    } else if (metabolicSignal === 'acidosis') {
      result.primaryDisorder = 'metabolic_acidosis';
    } else if (respiratorySignal === 'acidosis') {
      result.primaryDisorder = 'respiratory_acidosis';
    }
  } else if (result.phStatus === 'alkalemia') {
    if (metabolicSignal === 'alkalosis' && respiratorySignal === 'alkalosis') {
      result.primaryDisorder = 'mixed';
      result.mixedDisorderReason = 'HCO3/BE e pCO2 caminham na mesma direcao alcalemica.';
    } else if (metabolicSignal === 'alkalosis') {
      result.primaryDisorder = 'metabolic_alkalosis';
    } else if (respiratorySignal === 'alkalosis') {
      result.primaryDisorder = 'respiratory_alkalosis';
    }
  } else if (metabolicSignal === 'acidosis' && respiratorySignal === 'alkalosis') {
    result.primaryDisorder = 'mixed';
    result.mixedDisorderReason = 'pH normal com HCO3 baixo e pCO2 baixo sugere disturbios opostos se anulando.';
  } else if (metabolicSignal === 'alkalosis' && respiratorySignal === 'acidosis') {
    result.primaryDisorder = 'mixed';
    result.mixedDisorderReason = 'pH normal com HCO3 alto e pCO2 alto sugere disturbios opostos se anulando.';
  } else {
    result.primaryDisorder = 'normal';
  }

  result.primaryLogic = result.mixedDisorderReason || `Sinal metabolico: ${metabolicSignal}. Sinal respiratorio: ${respiratorySignal}.`;
  steps.push(`Passo 2: disturbio primario inferido como ${result.primaryDisorder}.`);

  if (result.primaryDisorder === 'metabolic_acidosis' && hco3 !== undefined) {
    const expectedPCO2 = round((1.5 * hco3) + 8, 1);
    result.expectedCompensation = `Compensacao esperada: pCO2 por volta de ${expectedPCO2} mmHg (formula de Winter adaptada).`;
    result.observedCompensation = `pCO2 observado: ${pCO2} mmHg.`;
    if (Math.abs(pCO2 - expectedPCO2) <= 3) result.compensationStatus = 'compensated';
    else if (pCO2 > expectedPCO2 + 3) {
      result.compensationStatus = 'mixed_suspected';
      result.mixedDisorderReason = 'pCO2 mais alta que o esperado sugere acidose respiratoria associada.';
    } else {
      result.compensationStatus = 'mixed_suspected';
      result.mixedDisorderReason = 'pCO2 mais baixa que o esperado sugere alcalose respiratoria associada.';
    }
  } else if (result.primaryDisorder === 'metabolic_alkalosis' && hco3 !== undefined) {
    const expectedPCO2 = round((0.7 * hco3) + 21, 1);
    result.expectedCompensation = `Compensacao esperada: pCO2 por volta de ${expectedPCO2} mmHg.`;
    result.observedCompensation = `pCO2 observado: ${pCO2} mmHg.`;
    result.compensationStatus = Math.abs(pCO2 - expectedPCO2) <= 3 ? 'compensated' : 'mixed_suspected';
  } else if (result.primaryDisorder === 'respiratory_acidosis' && hco3 !== undefined) {
    const delta = pCO2 - pco2Normal;
    const acuteExpected = round(hco3Normal + (0.1 * delta), 1);
    const chronicExpected = round(hco3Normal + (0.35 * delta), 1);
    result.expectedCompensation = `HCO3 esperado entre ${acuteExpected} (agudo) e ${chronicExpected} (cronico) mEq/L.`;
    result.observedCompensation = `HCO3 observado: ${hco3} mEq/L.`;
    result.compensationStatus = hco3 < acuteExpected - 2 || hco3 > chronicExpected + 2 ? 'mixed_suspected' : 'partially_compensated';
  } else if (result.primaryDisorder === 'respiratory_alkalosis' && hco3 !== undefined) {
    const delta = pco2Normal - pCO2;
    const acuteExpected = round(hco3Normal - (0.2 * delta), 1);
    const chronicExpected = round(hco3Normal - (0.5 * delta), 1);
    result.expectedCompensation = `HCO3 esperado entre ${acuteExpected} (agudo) e ${chronicExpected} (cronico) mEq/L.`;
    result.observedCompensation = `HCO3 observado: ${hco3} mEq/L.`;
    result.compensationStatus = hco3 > acuteExpected + 2 || hco3 < chronicExpected - 2 ? 'mixed_suspected' : 'partially_compensated';
  }

  if (result.primaryDisorder === 'mixed') result.compensationStatus = 'mixed_suspected';

  result.commonCauses = (() => {
    switch (result.primaryDisorder) {
      case 'metabolic_acidosis': return ['DKA', 'choque/hipoperfusao', 'doenca renal', 'diarreia'];
      case 'metabolic_alkalosis': return ['vomitos', 'obstrucao pilorica', 'diureticos', 'hipocalemia'];
      case 'respiratory_acidosis': return ['hipoventilacao', 'fadiga respiratoria', 'sedacao', 'doenca pleural'];
      case 'respiratory_alkalosis': return ['dor', 'ansiedade', 'hipoxemia', 'sepse inicial'];
      case 'mixed': return ['paciente critico com mecanismos concorrentes', 'disturbio triplo possivel', 'dados que exigem correlacao clinica forte'];
      default: return [];
    }
  })();

  result.physiologicalExplanation = [
    `O pH mudou porque a relacao entre componente respiratorio (pCO2 ${pCO2}) e componente metabolico (${hco3 !== undefined ? `HCO3 ${hco3}` : `BE ${be}`}) se desviou da faixa fisiologica.`,
    metabolicSignal !== 'neutral' ? 'O componente metabolico sugere alteracao do pool de bicarbonato e dos acidos nao volateis.' : '',
    respiratorySignal !== 'neutral' ? 'O componente respiratorio sugere alteracao da ventilacao alveolar e da depuracao de CO2.' : '',
    result.mixedDisorderReason || '',
  ].filter(Boolean).join(' ');

  result.summary = result.primaryDisorder === 'normal'
    ? 'Sem disturbio acido-base dominante com os dados disponiveis.'
    : `${result.primaryDisorder} com ${result.compensationStatus === 'mixed_suspected' ? 'suspeita de disturbio misto' : 'avaliacao de compensacao realizada'}.`;

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
    result.limitationNote = 'Amostra venosa nao deve ser usada para julgar desempenho pulmonar.';
    result.physiologicalExplanation = 'Em amostra venosa, o componente metabolico pode ser lido, mas PvO2/PvSatO2 nao devem ser interpretados como troca gasosa pulmonar.';
    result.summary = 'Amostra venosa: interpretar acidobase e contexto metabolico, mas nao desempenho pulmonar.';
    return result;
  }

  if (quality.suspectFields.includes('pO2')) {
    result.domainStatus = 'blocked';
    result.summary = 'Dominio de oxigenacao bloqueado por pO2 implausivel.';
    result.limitationNote = 'Revise pO2, tipo de amostra e FiO2.';
    return result;
  }

  if (input.pO2 === undefined) {
    result.limitationNote = 'Sem pO2, a oxigenacao arterial nao pode ser concluida.';
    return result;
  }

  const fio2Fraction = fio2Info.fraction ?? 0.21;
  const fio2Display = fio2Info.displayPercent ?? 21;
  const pb = getApproxBarometricPressure(input);
  const paO2 = input.pO2;
  const pCO2 = input.pCO2;

  result.domainStatus = fio2Info.warning ? 'limited' : 'ok';
  result.fio2Context = `FiO2 considerada: ${fio2Display}% (${fio2Info.source === 'assumed' || input.fio2 === undefined ? 'assumida' : 'normalizada'}).`;
  result.status = paO2 < 60 ? 'hypoxemia' : paO2 > 120 ? 'hyperoxemia' : 'normal';
  result.severity = paO2 < 40 ? 'severe' : paO2 < 50 ? 'moderate' : paO2 < 60 ? 'mild' : undefined;
  result.paO2Interpretation = `PaO2 ${paO2} mmHg em amostra arterial.`;
  if (input.sO2 !== undefined) result.saO2Interpretation = `SatO2 ${input.sO2}%.`;
  result.pfRatio = round(paO2 / fio2Fraction, 0);

  if (pCO2 !== undefined) {
    const alveolarO2 = (fio2Fraction * (pb - 47)) - (pCO2 / 0.8);
    result.aaGradient = round(alveolarO2 - paO2, 1);
    if (result.status === 'hypoxemia') {
      if (result.aaGradient <= 20 && pCO2 > 45) result.suspectedMechanism = 'Hipoventilacao predominante';
      else if (result.aaGradient > 20 && result.aaGradient <= 35) result.suspectedMechanism = 'V/Q mismatch';
      else if (result.aaGradient > 35) result.suspectedMechanism = 'V/Q mismatch importante, shunt ou barreira de difusao';
    }
  }

  result.ventilationConcordance = pCO2 === undefined
    ? 'Ventilacao nao comparavel sem pCO2.'
    : result.status === 'hypoxemia' && pCO2 > 45
      ? 'Hipoxemia e hipercapnia coexistem, sugerindo componente ventilatorio relevante.'
      : result.status === 'hypoxemia' && pCO2 <= 45
        ? 'Hipoxemia com pCO2 nao elevada sugere falha primariamente de oxigenacao.'
        : 'Oxigenacao e ventilacao sem dissociacao dominante.';

  result.physiologicalExplanation = [
    result.status === 'hypoxemia' ? `Hipoxemia detectada (${result.severity}).` : result.status === 'hyperoxemia' ? 'Hiperoxia detectada.' : 'Oxigenacao sem hipoxemia dominante.',
    result.pfRatio !== undefined ? `Relacao P/F aproximada: ${result.pfRatio}.` : '',
    result.aaGradient !== undefined ? `Gradiente A-a aproximado: ${result.aaGradient} mmHg.` : 'Gradiente A-a nao calculado por dados insuficientes.',
    result.suspectedMechanism ? `Mecanismo mais provavel: ${result.suspectedMechanism}.` : '',
    result.ventilationConcordance || '',
  ].filter(Boolean).join(' ');

  result.summary = result.status === 'hypoxemia'
    ? `Hipoxemia ${result.severity || ''} com interpretacao contextual da FiO2.`
    : result.status === 'hyperoxemia'
      ? 'Hiperoxia detectada.'
      : 'Oxigenacao avaliada sem hipoxemia dominante.';

  return result;
}
function buildFinding(parameter: keyof BloodGasInput, value: number, status: 'low' | 'normal' | 'high'): DeepElectrolyteAssessment {
  const guide = PARAMETER_GUIDE[parameter];
  return {
    parameter: guide?.label || String(parameter),
    status,
    value,
    clinicalExplanation: status === 'high' ? guide?.highMeaning || 'Valor acima da faixa.' : status === 'low' ? guide?.lowMeaning || 'Valor abaixo da faixa.' : 'Sem alteracao dominante.',
    acidBaseRelation: guide?.relationships?.[0] || 'Interpretar junto do conjunto gasometrico.',
    physiologicalImpact: guide?.whatItIs || 'Parametro contextual do exame.',
    mainRisk: guide?.pitfalls?.[0] || 'Correlacionar com o quadro clinico.',
    monitoring: guide?.relationships?.[1] || 'Monitorar em serie conforme contexto clinico.',
  };
}

function interpretElectrolytes(input: BloodGasInput, quality: DataQualityAssessment, alerts: ClinicalAlert[], hypotheses: string[], actions: ClinicalActions): { findings: DeepElectrolyteAssessment[]; summary: string; domainStatus: DomainStatus; anionGap?: InterpretationResult['anionGap']; baseExcess?: InterpretationResult['baseExcess']; } {
  const findings: DeepElectrolyteAssessment[] = [];
  let domainStatus: DomainStatus = 'inconclusive';

  const tracked = [
    ['Na', input.Na, 140, 155],
    ['K', input.K, 3.5, 5.5],
    ['Cl', input.Cl, input.species === 'canine' ? 105 : 115, input.species === 'canine' ? 115 : 125],
    ['lactate', input.lactate, 0.5, 2.5],
    ['glucose', input.glucose, 70, 130],
    ['iCa', input.iCa, 1.1, 1.4],
    ['tCa', input.tCa, 8.5, 11.5],
    ['albumin', input.albumin, 2.5, 4.0],
    ['hematocrit', input.hematocrit, input.species === 'canine' ? 37 : 24, input.species === 'canine' ? 55 : 45],
    ['hemoglobin', input.hemoglobin, input.species === 'canine' ? 12 : 8, input.species === 'canine' ? 18 : 15],
  ] as const;

  for (const [key, value, low, high] of tracked) {
    if (value === undefined || quality.suspectFields.includes(String(key))) continue;
    domainStatus = 'ok';
    const status = value < low ? 'low' : value > high ? 'high' : 'normal';
    if (status !== 'normal') findings.push(buildFinding(key, value, status));
  }

  if (input.K !== undefined && input.K >= 6) {
    alerts.push({ level: 'critical', message: 'Hipercalemia clinicamente perigosa. Considere ECG imediato.' });
    actions.immediate.push('Considerar ECG imediato e reavaliacao seriada do potassio.');
  }

  if (input.lactate !== undefined && input.lactate >= 2.5) {
    actions.serial.push('Repetir lactato em serie para avaliar clearance e resposta terapeutica.');
  }

  if (input.hemoglobin !== undefined && input.hemoglobin < (input.species === 'canine' ? 10 : 7)) {
    hypotheses.push('Anemia clinicamente relevante pode reduzir entrega tecidual de O2 mesmo com PaO2 adequada.');
  }

  let anionGap: InterpretationResult['anionGap'];
  if (input.Na !== undefined && input.K !== undefined && input.Cl !== undefined && input.HCO3 !== undefined) {
    const value = round((input.Na + input.K) - (input.Cl + input.HCO3), 1);
    let status: 'normal' | 'high' | 'low' = 'normal';
    if (value > (input.species === 'canine' ? 24 : 27)) status = 'high';
    if (value < (input.species === 'canine' ? 12 : 13)) status = 'low';
    anionGap = {
      value,
      status,
      explanation: status === 'high'
        ? `AG ${value} mEq/L, elevado para a especie, sugerindo acidos nao mensurados.`
        : status === 'low'
          ? `AG ${value} mEq/L, baixo; considerar hipoalbuminemia ou erro de entrada.`
          : `AG ${value} mEq/L dentro da faixa esperada.`,
    };

    if (input.albumin !== undefined) {
      const corrected = round(value + (2.5 * (3.5 - input.albumin)), 1);
      anionGap.correctedValue = corrected;
      anionGap.correctedStatus = corrected > (input.species === 'canine' ? 24 : 27) ? 'high' : corrected < (input.species === 'canine' ? 12 : 13) ? 'low' : 'normal';
      anionGap.explanation += ` AG corrigido por albumina: ${corrected}.`;
    }
  }

  let baseExcess: InterpretationResult['baseExcess'];
  if (input.BE !== undefined) {
    baseExcess = {
      value: input.BE,
      status: input.BE < -4 ? 'deficit' : input.BE > 4 ? 'excess' : 'normal',
      explanation: input.BE < -4 ? 'Deficit de base compativel com componente metabolico acidemico.' : input.BE > 4 ? 'Excesso de base compativel com componente metabolico alcalemico.' : 'BE sem alteracao dominante.',
    };
  }

  const summary = findings.length > 0
    ? `${findings.length} alteracoes eletroliticas/metabolicas relevantes foram integradas a interpretacao.`
    : domainStatus === 'ok'
      ? 'Sem alteracoes eletroliticas/metabolicas dominantes entre os parametros informados.'
      : 'Dominio eletrolitico inconclusivo com os dados atuais.';

  return { findings, summary, domainStatus, anionGap, baseExcess };
}

function buildHypotheses(input: BloodGasInput, partial: Partial<InterpretationResult>): string[] {
  const hypotheses = CLINICAL_PATTERNS.filter((pattern) => pattern.when(input, partial)).map((pattern) => pattern.label);
  for (const interaction of PARAMETER_INTERACTIONS) {
    if (interaction.trigger.every((key) => key in input)) hypotheses.push(interaction.explanation);
  }
  return Array.from(new Set(hypotheses));
}

function buildActions(input: BloodGasInput, acidBase: DeepAcidBaseInterpretation, oxygenation: DeepOxygenationAssessment, quality: DataQualityAssessment, temperature: TemperatureContext): ClinicalActions {
  const actions: ClinicalActions = { immediate: [], serial: [], correlativeExams: [], whenToRepeat: [] };
  if (quality.status !== 'reliable') actions.immediate.push('Revisar digitacao, unidade, tipo de amostra e possivel erro pre-analitico antes de concluir.');
  if (oxygenation.status === 'hypoxemia') {
    actions.immediate.push('Considerar oxigenioterapia e reavaliar perfusao e ventilacao.');
    actions.correlativeExams.push('Correlacionar com imagem toracica e monitorizacao de SpO2/ETCO2 se disponiveis.');
  }
  if (acidBase.primaryDisorder === 'metabolic_acidosis') actions.correlativeExams.push('Correlacionar com lactato, AG, funcao renal, glicose e cetonas.');
  if (acidBase.primaryDisorder === 'metabolic_alkalosis') actions.correlativeExams.push('Revisar perdas gastricas, cloro, potassio e estrategia de fluidoterapia.');
  if (input.K !== undefined && (input.K < 3 || input.K > 6)) actions.immediate.push('Revisar potassio precocemente e considerar ECG se alteracao importante.');
  if (temperature.status !== 'normal' && temperature.status !== 'unknown') actions.serial.push('Monitorar temperatura em serie e interpretar gasometria junto do contexto termico.');
  actions.serial.push('Repetir hemogasometria conforme mudanca clinica, intervencao ventilatoria ou ajuste de fluidoterapia.');
  actions.whenToRepeat?.push('Repetir em 30-60 min se o paciente estiver instavel ou apos intervencoes importantes.');
  actions.whenToRepeat?.push('Repetir em 2-4 h para acompanhar lactato, pH e tendencia do disturbio principal.');
  return actions;
}
export function interpretBloodGas(input: BloodGasInput): InterpretationResult {
  const fio2Info = input.fio2 !== undefined ? normalizeFiO2Input(input.fio2) : { fraction: 0.21, displayPercent: 21, source: 'assumed' as const };
  const normalizedInput: BloodGasInput = { ...input, fio2: fio2Info.fraction ?? input.fio2 };

  const alerts: ClinicalAlert[] = [];
  const stepByStepLogic: string[] = [];
  const electrolyteHypotheses: string[] = [];
  const electrolyteActions: ClinicalActions = { immediate: [], serial: [], correlativeExams: [], whenToRepeat: [] };
  const temperatureContext = buildTemperatureContext(normalizedInput);
  const dataQuality = buildQualityAssessment(normalizedInput, fio2Info, temperatureContext);
  const deepAcidBase = interpretAcidBase(normalizedInput, dataQuality, stepByStepLogic);
  const deepOxygenation = interpretOxygenation(normalizedInput, dataQuality, fio2Info);
  const electrolyteDomain = interpretElectrolytes(normalizedInput, dataQuality, alerts, electrolyteHypotheses, electrolyteActions);

  const domainStatuses: DomainStatuses = {
    quality: dataQuality.domainStatus,
    acidBase: deepAcidBase.domainStatus,
    oxygenation: deepOxygenation.domainStatus,
    electrolytes: electrolyteDomain.domainStatus,
    hypotheses: 'inconclusive',
    actionPlan: 'limited',
  };

  const partialResult: Partial<InterpretationResult> = { deepOxygenation, deepAcidBase };
  const clinicalHypotheses = Array.from(new Set([...electrolyteHypotheses, ...buildHypotheses(normalizedInput, partialResult)]));
  domainStatuses.hypotheses = clinicalHypotheses.length > 0 ? 'ok' : 'limited';

  const derivedActions = buildActions(normalizedInput, deepAcidBase, deepOxygenation, dataQuality, temperatureContext);
  const clinicalActions: ClinicalActions = {
    immediate: Array.from(new Set([...electrolyteActions.immediate, ...derivedActions.immediate])),
    serial: Array.from(new Set([...electrolyteActions.serial, ...derivedActions.serial])),
    correlativeExams: Array.from(new Set([...electrolyteActions.correlativeExams, ...derivedActions.correlativeExams])),
    whenToRepeat: Array.from(new Set([...(electrolyteActions.whenToRepeat || []), ...(derivedActions.whenToRepeat || [])])),
  };
  domainStatuses.actionPlan = clinicalActions.immediate.length > 0 || clinicalActions.serial.length > 0 ? 'ok' : 'limited';

  if (temperatureContext.status === 'hypothermia') alerts.push({ level: 'warning', message: 'Hipotermia pode alterar a relacao entre o valor reportado e a fisiologia real do paciente.' });
  else if (temperatureContext.status === 'hyperthermia') alerts.push({ level: 'warning', message: 'Hipertermia aumenta consumo de O2 e producao de CO2; interpretar com contexto clinico.' });

  for (const check of dataQuality.consistencyChecks) {
    if (check.level === 'critical') alerts.push({ level: 'critical', message: check.message });
  }

  stepByStepLogic.push(`Passo 3: qualidade dos dados classificada como ${dataQuality.status}.`);
  stepByStepLogic.push(`Passo 4: dominio de oxigenacao classificado como ${deepOxygenation.domainStatus}.`);
  stepByStepLogic.push(`Passo 5: dominio eletrolitico classificado como ${electrolyteDomain.domainStatus}.`);

  const executiveSummary = [
    `Amostra ${normalizedInput.sampleType === 'arterial' ? 'arterial' : 'venosa'} em ${normalizedInput.species === 'canine' ? 'canino' : 'felino'} com confiabilidade ${dataQuality.status === 'reliable' ? 'boa' : dataQuality.status === 'caution' ? 'moderada' : 'reduzida'}.`,
    `Disturbio principal: ${deepAcidBase.primaryDisorder === 'unknown' ? 'inconclusivo' : deepAcidBase.primaryDisorder.replaceAll('_', ' ')}${deepAcidBase.compensationStatus === 'mixed_suspected' ? ', com suspeita de disturbio misto' : ''}.`,
    deepOxygenation.status === 'cannot_assess' ? 'Oxigenacao nao avaliavel com os dados atuais.' : deepOxygenation.summary,
    temperatureContext.summary,
  ].filter(Boolean);

  const expandedPhysiology = [
    'O pH reflete a soma do componente respiratorio (pCO2) e do componente metabolico (HCO3/BE).',
    deepAcidBase.physiologicalExplanation,
    normalizedInput.Cl !== undefined ? 'O cloro ajuda a entender se ha padrao hipercloremico ou hipocloremico e deve ser lido junto do bicarbonato.' : '',
    normalizedInput.lactate !== undefined ? 'O lactato contextualiza perfusao, metabolismo anaerobio e gravidade, principalmente quando o AG esta elevado.' : '',
    deepOxygenation.physiologicalExplanation,
    ...temperatureContext.effectOnInterpretation,
  ].filter(Boolean).join(' ');

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
    temperatureContext,
    electrolyteSummary: electrolyteDomain.summary,
    anionGap: electrolyteDomain.anionGap,
    baseExcess: electrolyteDomain.baseExcess,
    clinicalHypotheses,
    clinicalActions,
    alerts,
    stepByStepLogic,
    expandedPhysiology,
  };
}
