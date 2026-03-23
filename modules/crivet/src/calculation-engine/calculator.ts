import { CalculationInput, CalculationResult, CalculationStep, CalculationAlert } from '../shared/types/calculation';
import { convertDoseToMcgPerHour, convertConcentrationToMcgPerMl } from './unitConversions';
import { roundClinicalVolume, roundClinicalConcentration, roundClinicalRate, formatNumber } from './rounding';
import { checkVolumeSafety, checkReverseMatchTolerance } from './clinicalSafety';
import { buildDidacticStep } from './regimeTemplates';

const applyClinicalSafetyRules = (input: CalculationInput, alerts: CalculationAlert[]) => {
  const { drug, accessType } = input;
  
  if (drug.safetyMetadata.centralAccessRequired && accessType === 'peripheral') {
    alerts.push({
      id: 'access-critical',
      title: 'Acesso Central Obrigatório',
      message: `${drug.namePt} exige acesso venoso central por sua toxicidade/osmolaridade tecidual.`,
      severity: 'block'
    });
  } else if (drug.safetyMetadata.centralAccessPreferred && accessType === 'peripheral') {
     alerts.push({
      id: 'access-warning',
      title: 'Acesso Central Preferencial',
      message: `Recomenda-se o uso de acesso central para ${drug.namePt} para maior segurança.`,
      severity: 'warning'
    });
  }

  if (drug.safetyMetadata.dedicatedLineRequired) {
    alerts.push({
      id: 'dedicated-line',
      title: 'Via Exclusiva',
      message: `${drug.namePt} deve ser administrado em via exclusiva (sem outras drogas no mesmo lúmen).`,
      severity: 'info'
    });
  }

  if (drug.safetyMetadata.photosensitive) {
     alerts.push({
      id: 'photosensitive',
      title: 'Droga Fotossensível',
      message: `Esta medicação é fotossensível. Proteja a bolsa e o equipo da luz.`,
      severity: 'info'
    });
  }
};

export const calculateCRI = (input: CalculationInput): CalculationResult => {
  if (input.regime === 'bolus' || input.regime === 'bolus_maintenance') {
    return calculateBolus(input);
  }
  if (input.regime === 'epidural') {
    return calculateEpidural(input);
  }
  if (input.regime === 'patch') {
    return calculatePatch(input);
  }
  return calculateContinuous(input);
};

const calculateBolus = (input: CalculationInput): CalculationResult => {
  const { patient, dose, doseUnit, presentation } = input;
  const steps: CalculationStep[] = [];
  const alerts: CalculationAlert[] = [];
  let stepCounter = 1;

  const basePresentationConcMcgMl = convertConcentrationToMcgPerMl(presentation.concentration, presentation.concentrationUnit);
  const presentationConcMcgMl = input.usePreDilution ? basePresentationConcMcgMl / 10 : basePresentationConcMcgMl;
  
  if (input.usePreDilution) {
    steps.push(buildDidacticStep(
      stepCounter++,
      'ESTÁGIO 1: PREPARO DA SOLUÇÃO DE TRABALHO (1:10)',
      'Diluição inicial padrão para facilitar o fracionamento de microdoses.',
      `1 mL de ${input.drug.namePt} + 9 mL de Diluente`,
      '', formatNumber(presentation.concentration / 10), `${presentation.concentrationUnit}/mL`
    ));
  }

  const doseMcg = convertDoseToMcgPerHour(dose, doseUnit, patient.weight, patient.species, presentationConcMcgMl);
  const drugVolumeMl = doseMcg / presentationConcMcgMl;

  const isMlPerKg = doseUnit === 'mL/kg';
  const totalDrugDisplay = doseMcg >= 1000 && presentation.concentrationUnit !== 'U/mL' ? doseMcg / 1000 : doseMcg;
  const totalDrugUnit = presentation.concentrationUnit === 'U/mL' ? 'U' : (doseMcg >= 1000 ? 'mg' : 'mcg');

  steps.push(buildDidacticStep(
    stepCounter++,
    'DOSE TOTAL NECESSÁRIA',
    isMlPerKg ? 'Calculamos o volume total estimado.' : 'Calculamos quanto o paciente precisa receber no total neste bolus.',
    isMlPerKg ? `${dose} mL/kg × ${patient.weight} kg` : `${dose} ${doseUnit} × ${patient.weight} kg`,
    '',
    isMlPerKg ? formatNumber(drugVolumeMl) : formatNumber(totalDrugDisplay),
    isMlPerKg ? 'mL' : totalDrugUnit
  ));

  if (!isMlPerKg) {
    steps.push(buildDidacticStep(
      stepCounter++,
      'VOLUME DO FÁRMACO A ASPIRAR',
      'Convertemos a dose total no volume real a ser aspirado da apresentação.',
      `${formatNumber(totalDrugDisplay)} ${totalDrugUnit} ÷ ${formatNumber(presentation.concentration)} ${presentation.concentrationUnit}/mL`,
      '',
      formatNumber(drugVolumeMl),
      'mL'
    ));
  }

  // Safety checks
  const volumeAlert = checkVolumeSafety(drugVolumeMl);
  if (volumeAlert) alerts.push(volumeAlert);
  applyClinicalSafetyRules(input, alerts);

  // Reverse Check
  const reverseCheckSteps: CalculationStep[] = [];
  const reverseDose = (drugVolumeMl * presentationConcMcgMl) / patient.weight;
  
  if (isMlPerKg) {
    reverseCheckSteps.push(buildDidacticStep(
      1, 'CONFERÊNCIA DE VOLUME', 'Conferimos se o volume bate com a dose prescrita.', 
      `${formatNumber(drugVolumeMl)} mL ÷ ${patient.weight} kg`, '', formatNumber(reverseDose / presentationConcMcgMl), 'mL/kg'
    ));
  } else {
    const reverseDoseDisplay = reverseDose >= 1000 && presentation.concentrationUnit !== 'U/mL' ? reverseDose / 1000 : reverseDose;
    const reverseDoseUnit = presentation.concentrationUnit === 'U/mL' ? 'U' : (reverseDose >= 1000 ? 'mg' : 'mcg');
    reverseCheckSteps.push(buildDidacticStep(
      1, 'CONFERÊNCIA DA DOSE ENTREGUE', 'Refazemos a conta para provar que a dose será exata.',
      `(${formatNumber(drugVolumeMl)} mL × ${formatNumber(presentation.concentration)} ${presentation.concentrationUnit}/mL) ÷ ${patient.weight} kg`, 
      '', formatNumber(reverseDoseDisplay), `${reverseDoseUnit}/kg`
    ));
  }

  const reverseCheckPassed = isMlPerKg 
    ? checkReverseMatchTolerance(drugVolumeMl / patient.weight, dose)
    : checkReverseMatchTolerance(reverseDose, doseMcg / patient.weight);

  const practicalSummary = [
    ...(input.usePreDilution ? [
      `ESTÁGIO 1: Prepare solução de trabalho: 1 mL de ${input.drug.namePt} + 9 mL de NaCl 0.9% (Nova conc: ${formatNumber(presentation.concentration / 10)} ${presentation.concentrationUnit}/mL).`,
      `ESTÁGIO 2: Desta nova solução, aspire ${formatNumber(drugVolumeMl)} mL.`
    ] : [`Aspire ${formatNumber(drugVolumeMl)} mL de ${input.drug.namePt} (${presentation.description}).`]),
    'Diluição final: não realizada.',
    'Bomba: não se aplica.',
    'Administre em bolus IV lento (ou conforme recomendação clínica).'
  ];

  return {
    regimeType: input.regime,
    drugVolume: roundClinicalVolume(drugVolumeMl),
    diluentVolume: 0,
    finalConcentration: presentation.concentration,
    finalConcentrationUnit: presentation.concentrationUnit,
    totalDrugAmount: totalDrugDisplay,
    totalDrugAmountUnit: totalDrugUnit,
    infusionRate: 0,
    deliveredDose: dose,
    deliveredDoseUnit: doseUnit,
    steps,
    reverseCheckSteps,
    practicalSummary,
    alerts,
    nonApplicableFields: ['diluent', 'infusionRate'],
    instructions: practicalSummary.join(' '),
    isImpossible: false,
    reverseCheckPassed,
    clinicalPearls: input.drug.clinicalPearls || []
  };
};

const calculateContinuous = (input: CalculationInput): CalculationResult => {
  const { patient, dose, doseUnit, presentation, totalVolume, infusionRate } = input;
  const steps: CalculationStep[] = [];
  const alerts: CalculationAlert[] = [];
  let stepCounter = 1;

  if (infusionRate <= 0) {
    return {
      regimeType: input.regime, drugVolume: 0, diluentVolume: 0, finalConcentration: 0, finalConcentrationUnit: '',
      totalDrugAmount: 0, totalDrugAmountUnit: '', infusionRate: 0, deliveredDose: 0, deliveredDoseUnit: '',
      steps: [], instructions: 'Taxa de infusão deve ser maior que zero.', isImpossible: true, impossibleReason: 'Taxa de infusão inválida.'
    };
  }

  const basePresentationConcMcgMl = convertConcentrationToMcgPerMl(presentation.concentration, presentation.concentrationUnit);
  const presentationConcMcgMl = input.usePreDilution ? basePresentationConcMcgMl / 10 : basePresentationConcMcgMl;

  if (input.usePreDilution) {
    steps.push(buildDidacticStep(
      stepCounter++,
      'ESTÁGIO 1: PREPARO DA SOLUÇÃO DE TRABALHO (1:10)',
      'Diluição inicial padrão para facilitar o fracionamento de microdoses.',
      `1 mL de ${input.drug.namePt} + 9 mL de Diluente`,
      '', formatNumber(presentation.concentration / 10), `${presentation.concentrationUnit}/mL`
    ));
  }

  const drugRateMcgH = convertDoseToMcgPerHour(dose, doseUnit, patient.weight, patient.species, presentationConcMcgMl);

  let doseFormula = '';
  if (doseUnit.includes('min')) {
    doseFormula = `${dose} ${doseUnit} × ${patient.weight} kg × 60 min`;
  } else if (doseUnit.includes('m2')) {
    doseFormula = `${dose} ${doseUnit} × BSA`;
  } else if (doseUnit === 'mL/kg') {
    doseFormula = `${dose} mL/kg × ${patient.weight} kg × Concentração Estimada`;
  } else {
    doseFormula = `${dose} ${doseUnit} × ${patient.weight} kg`;
  }

  const rateDisplay = drugRateMcgH >= 1000 && presentation.concentrationUnit !== 'U/mL' ? drugRateMcgH / 1000 : drugRateMcgH;
  const rateUnit = presentation.concentrationUnit === 'U/mL' ? 'U' : (drugRateMcgH >= 1000 ? 'mg' : 'mcg');

  steps.push(buildDidacticStep(
    stepCounter++,
    'QUANTO O PACIENTE PRECISA RECEBER POR HORA',
    'Convertemos a dose prescrita para a quantidade que o paciente precisa receber em 1 hora.',
    doseFormula, '', formatNumber(rateDisplay), `${rateUnit}/h`
  ));

  const targetConcentration = drugRateMcgH / infusionRate;
  const targetConcDisplay = targetConcentration >= 1000 && presentation.concentrationUnit !== 'U/mL' ? targetConcentration / 1000 : targetConcentration;
  const targetConcUnit = presentation.concentrationUnit === 'U/mL' ? 'U/mL' : (targetConcentration >= 1000 ? 'mg/mL' : 'mcg/mL');

  steps.push(buildDidacticStep(
    stepCounter++,
    'QUE CONCENTRAÇÃO A SOLUÇÃO PRECISA TER',
    'Calculamos qual deve ser a concentração final da solução para que a bomba entregue a dose correta.',
    `${formatNumber(rateDisplay)} ${rateUnit}/h ÷ ${infusionRate} mL/h`, '', formatNumber(targetConcDisplay), targetConcUnit
  ));

  const totalDrugMcg = targetConcentration * totalVolume;
  const totalDrugDisplay = totalDrugMcg >= 1000 && presentation.concentrationUnit !== 'U/mL' ? totalDrugMcg / 1000 : totalDrugMcg;
  const totalDrugUnit = presentation.concentrationUnit === 'U/mL' ? 'U' : (totalDrugMcg >= 1000 ? 'mg' : 'mcg');

  steps.push(buildDidacticStep(
    stepCounter++,
    'QUANTO DE FÁRMACO PRECISA HAVER NO RECIPIENTE',
    'Transformamos a concentração na quantidade total de droga na bolsa.',
    `${formatNumber(targetConcDisplay)} ${targetConcUnit} × ${totalVolume} mL`, '', formatNumber(totalDrugDisplay), totalDrugUnit
  ));

  const drugVolumeMl = totalDrugMcg / presentationConcMcgMl;

  steps.push(buildDidacticStep(
    stepCounter++,
    'QUANTO ASPIRAR DO ESTOQUE',
    'Convertemos a quantidade total no volume real a ser aspirado da ampola.',
    `${formatNumber(totalDrugDisplay)} ${totalDrugUnit} ÷ ${formatNumber(presentation.concentration)} ${presentation.concentrationUnit}/mL`, '', formatNumber(drugVolumeMl), 'mL'
  ));

  let diluentVolumeMl = totalVolume - drugVolumeMl;
  if (diluentVolumeMl < 0) diluentVolumeMl = 0;

  steps.push(buildDidacticStep(
    stepCounter++,
    'QUANTO COMPLETAR COM DILUENTE',
    'Completamos o volume do fármaco até atingir o volume final.',
    `${totalVolume} mL (Total) - ${formatNumber(drugVolumeMl)} mL (Fármaco)`, '', formatNumber(diluentVolumeMl), 'mL'
  ));

  // Safety checks
  const volumeAlert = checkVolumeSafety(drugVolumeMl);
  if (volumeAlert) alerts.push(volumeAlert);

  if (drugVolumeMl > totalVolume) {
    alerts.push({ id: 'impossible-volume', title: 'Volume Impossível', message: 'Fármaco excede volume total.', severity: 'block' });
  }
  applyClinicalSafetyRules(input, alerts);

  // Reverse Check
  const reverseCheckSteps: CalculationStep[] = [];
  const reverseDoseH = (drugVolumeMl * presentationConcMcgMl) / totalVolume * infusionRate;
  let reverseDoseFinal = reverseDoseH / patient.weight;
  let reverseDoseUnit = 'mcg/kg/h';

  if (doseUnit.includes('min')) {
    reverseDoseFinal = reverseDoseFinal / 60;
    reverseDoseUnit = 'mcg/kg/min';
  }
  
  reverseCheckSteps.push(buildDidacticStep(
    1, 'CONFERÊNCIA FINAL DA DOSE', 'Refazemos a conta para provar que a diluição entrega a dose exata.',
    `(${formatNumber(drugVolumeMl)} mL × ${presentation.concentration} ${presentation.concentrationUnit}/mL ÷ ${totalVolume} mL) × ${infusionRate} mL/h ÷ ${patient.weight} kg`, 
    '', formatNumber(reverseDoseFinal), reverseDoseUnit
  ));

  const practicalSummary = [
    ...(input.usePreDilution ? [
      `ESTÁGIO 1: Prepare solução de trabalho: 1 mL de ${input.drug.namePt} + 9 mL de NaCl 0.9% (Nova conc: ${formatNumber(presentation.concentration / 10)} ${presentation.concentrationUnit}/mL).`,
      `ESTÁGIO 2: Desta nova solução, aspire ${formatNumber(drugVolumeMl)} mL.`
    ] : [`Aspire ${formatNumber(drugVolumeMl)} mL de ${input.drug.namePt}.`]),
    `Complete com ${formatNumber(diluentVolumeMl)} mL de ${input.diluent} (Total = ${totalVolume} mL).`,
    `Administre em bomba a ${infusionRate} mL/h.`
  ];

  return {
    regimeType: input.regime,
    drugVolume: roundClinicalVolume(drugVolumeMl),
    diluentVolume: roundClinicalVolume(diluentVolumeMl),
    finalConcentration: roundClinicalConcentration(targetConcDisplay),
    finalConcentrationUnit: targetConcUnit,
    totalDrugAmount: totalDrugDisplay,
    totalDrugAmountUnit: totalDrugUnit,
    infusionRate,
    deliveredDose: dose,
    deliveredDoseUnit: doseUnit,
    steps,
    reverseCheckSteps,
    practicalSummary,
    alerts,
    nonApplicableFields: [],
    instructions: practicalSummary.join(' '),
    isImpossible: false,
    clinicalPearls: input.drug.clinicalPearls || []
  };
};

const calculateEpidural = (input: CalculationInput): CalculationResult => {
  const { patient, dose, presentation } = input;
  const steps: CalculationStep[] = [];
  const alerts: CalculationAlert[] = [];
  let stepCounter = 1;

  const drugAmount = dose * patient.weight;
  steps.push(buildDidacticStep(
    stepCounter++,
    'DOSE TOTAL (EPIDURAL)',
    'Calculamos a massa total do fármaco para o espaço epidural.',
    `${dose} mg/kg × ${patient.weight} kg`,
    '', formatNumber(drugAmount), 'mg'
  ));

  const drugVolumeMl = drugAmount / presentation.concentration;
  steps.push(buildDidacticStep(
    stepCounter++,
    'VOLUME DO FÁRMACO',
    'Volume da ampola bruta a ser aspirado.',
    `${formatNumber(drugAmount)} mg ÷ ${presentation.concentration} mg/mL`,
    '', formatNumber(drugVolumeMl), 'mL'
  ));

  const targetScale = 0.2; // mL/kg - padrão seguro
  const targetTotalVolume = targetScale * patient.weight;
  
  steps.push(buildDidacticStep(
    stepCounter++,
    'VOLUME ALVO FINAL (0.2 mL/kg)',
    'Para epidural, usamos um volume total fixo por kg para garantir que a droga banhe o canal medular sem excessos.',
    `0.2 mL/kg × ${patient.weight} kg`,
    '', formatNumber(targetTotalVolume), 'mL'
  ));

  const diluentVolumeMl = Math.max(0, targetTotalVolume - drugVolumeMl);
  steps.push(buildDidacticStep(
    stepCounter++,
    'VOLUME DE DILUENTE',
    'Diferença para atingir o volume alvo com segurança.',
    `${formatNumber(targetTotalVolume)} mL - ${formatNumber(drugVolumeMl)} mL`,
    '', formatNumber(diluentVolumeMl), 'mL'
  ));

  const practicalSummary = [
    `Aspire ${formatNumber(drugVolumeMl)} mL de ${input.drug.namePt}.`,
    `Dilua com ${formatNumber(diluentVolumeMl)} mL de Diluente (Total = ${formatNumber(targetTotalVolume)} mL).`,
    'Administre via EPIDURAL com técnica asséptica.'
  ];

  return {
    regimeType: 'epidural',
    drugVolume: drugVolumeMl,
    diluentVolume: diluentVolumeMl,
    finalConcentration: drugAmount / targetTotalVolume,
    finalConcentrationUnit: 'mg/mL',
    totalDrugAmount: drugAmount,
    totalDrugAmountUnit: 'mg',
    infusionRate: 0,
    deliveredDose: dose,
    deliveredDoseUnit: 'mg/kg',
    steps,
    practicalSummary,
    instructions: practicalSummary.join(' '),
    alerts,
    nonApplicableFields: ['infusionRate'],
    clinicalPearls: input.drug.clinicalPearls || [],
    isImpossible: false
  };
};

const calculatePatch = (input: CalculationInput): CalculationResult => {
  const { presentation } = input;
  const steps: CalculationStep[] = [];
  const alerts: CalculationAlert[] = [];
  
  steps.push(buildDidacticStep(
    1,
    'APLICAÇÃO DE PATCH / ADESIVO',
    'O cálculo para adesivos transdérmicos é baseado na taxa de liberação fixa da apresentação escolhida.',
    `Liberação: ${presentation.concentration} ${presentation.concentrationUnit}/h`,
    '', '1', 'Adesivo'
  ));

  const practicalSummary = [
    `Aplique 01 (um) adesivo de ${presentation.description} na pele tricotomizada e limpa.`,
    `Taxa de liberação: ${presentation.concentration} ${presentation.concentrationUnit}/h.`,
    'Troque conforme recomendação (geralmente cada 72h).'
  ];

  return {
    regimeType: 'patch',
    drugVolume: 0,
    diluentVolume: 0,
    finalConcentration: presentation.concentration,
    finalConcentrationUnit: presentation.concentrationUnit,
    totalDrugAmount: presentation.concentration,
    totalDrugAmountUnit: presentation.concentrationUnit,
    infusionRate: 0,
    deliveredDose: presentation.concentration,
    deliveredDoseUnit: presentation.concentrationUnit,
    steps,
    practicalSummary,
    instructions: practicalSummary.join(' '),
    alerts,
    nonApplicableFields: ['drugVolume', 'diluentVolume', 'infusionRate'],
    clinicalPearls: input.drug.clinicalPearls || [],
    isImpossible: false
  };
};
