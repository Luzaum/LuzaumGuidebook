import type {
  ClinicalMedicationDefinition,
  ClinicalMedicationOverride,
  ClinicalRecipeModel,
  MagistralFormulaComponent,
} from '../types/receituario';
import { buildClinicalMedicationPrescriptionBlock } from './clinicalMedicationCatalogBridge';
import { formatGroupedPrescriptionBlocks, groupMedicationBlocksByRoute } from './receituarioMedication';
import { CLINICAL_DOSE_LABEL } from './receituarioTemplateCalculator';

export type PatientSize = 'small' | 'large' | null;

export interface CalculatedFormulaComponent {
  key: string;
  name: string;
  prescribedDose: string;
  amountPerDose: string;
  dailyAmount: string;
  totalAmount: string;
}

const FILL = 'A PREENCHER';

/** Termos técnicos explicados para o tutor na receita impressa. Ordem: frases mais longas primeiro. */
const PATIENT_TERM_GLOSSARY: Array<[string, string]> = [
  ['colapso intratorácico', 'estreitamento da traqueia dentro do tórax'],
  ['ulceração gastrointestinal', 'feridas no estômago ou intestino'],
  ['hipertensão pulmonar', 'pressão elevada na circulação dos pulmões'],
  ['paralisia laríngea', 'alteração da laringe que dificulta respirar'],
  ['secreção purulenta', 'secreção com pus'],
  ['tecido de granulação', 'tecido de cicatrização'],
  ['hipovolêmica', 'com perda importante de líquidos ou sangue no corpo'],
  ['hipovolêmico', 'com perda importante de líquidos ou sangue no corpo'],
  ['hipovolemia', 'perda importante de líquidos ou sangue no corpo'],
  ['broncomalácia', 'enfraquecimento das vias aéreas'],
  ['malasseziose', 'infecção por fungo na pele ou ouvido'],
  ['broncoespasmo', 'crise respiratória com chiado ou falta de ar'],
  ['tosse produtiva', 'tosse com eliminação de secreção'],
  ['hematêmese', 'vômito com sangue'],
  ['prostração', 'abatimento ou fraqueza intensa'],
  ['hipotensão', 'pressão arterial baixa'],
  ['hipotensa', 'com pressão arterial baixa'],
  ['hipotenso', 'com pressão arterial baixa'],
  ['deiscência', 'abertura da ferida ou dos pontos'],
  ['piodermite', 'infecção bacteriana da pele'],
  ['equimose', 'manchas roxas na pele'],
  ['esofagite', 'inflamação do esôfago'],
  ['anorexia', 'falta de apetite'],
  ['exsudatos', 'secreções ou líquidos'],
  ['exsudato', 'secreção ou líquido na ferida'],
  ['granulação', 'tecido de cicatrização'],
  ['midríase', 'pupilas dilatadas'],
  ['distensão', 'aumento anormal do volume abdominal'],
  ['hipotermia', 'temperatura corporal baixa'],
  ['descamação', 'descamação ou queda de pele'],
  ['melena', 'fezes escuras por sangue digerido'],
  ['cianose', 'mucosas ou língua azuladas'],
  ['icterícia', 'coloração amarelada'],
  ['prurido', 'coceira intensa'],
  ['palidez', 'mucosas muito claras'],
  ['síncope', 'desmaio'],
  ['apatia', 'pouca reação ou letargia'],
  ['necrose', 'morte de tecido na ferida'],
  ['euforia', 'comportamento anormalmente excitado'],
  ['edema', 'inchaço'],
];

export function explainPatientTerms(text: string): string {
  let result = String(text || '');
  for (const [term, explanation] of PATIENT_TERM_GLOSSARY) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`\\b(${escaped})\\b`, 'gi');
    result = result.replace(pattern, (match, word: string, offset: number, source: string) => {
      if (/^\s*\(/.test(source.slice(offset + match.length))) return match;
      return `${word} (${explanation})`;
    });
  }
  return result;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 3 }).format(Number(value.toFixed(3)));
}

function amountRange(min: number, max: number | undefined, unit: string): string {
  if (max != null && max !== min) return `${formatNumber(min)} a ${formatNumber(max)} ${unit}`;
  return `${formatNumber(min)} ${unit}`;
}

function clinicalDoseText(dose: ClinicalMedicationDefinition['dose']): string {
  if (dose.basis === 'manual') return `${CLINICAL_DOSE_LABEL} conforme orientação do fabricante`;
  return `${CLINICAL_DOSE_LABEL} ${formatNumber(dose.min)} ${dose.unit}`;
}

function administrationsPerDay(frequency: string): number {
  const normalized = frequency.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (/dose unica|aplicacao unica/.test(normalized)) return 1;
  const hours = Number(normalized.match(/cada\s+(\d+)\s+horas?/)?.[1]);
  return hours > 0 ? 24 / hours : 1;
}

export function calculateClinicalMedicationAmount(
  medication: ClinicalMedicationDefinition,
  weightKg?: number | null,
): string {
  const { dose } = medication;
  if (dose.basis === 'manual') return FILL;
  if (dose.basis === 'per_animal') return amountRange(dose.min, dose.max, dose.unit.replace('/animal', ''));
  if (!weightKg || weightKg <= 0) return FILL;
  const suffix = dose.basis === 'weight_per_day' ? 'mg por dia' : dose.unit.startsWith('UI') ? 'UI' : dose.unit.startsWith('mcg') ? 'mcg' : 'mg';
  return amountRange(dose.min * weightKg, dose.max == null ? undefined : dose.max * weightKg, suffix);
}

function componentValues(
  component: MagistralFormulaComponent,
  weightKg: number | null,
  patientSize: PatientSize,
): { min: number; max?: number; unit: string } | null {
  if (component.unit === 'mg/animal-small') {
    if (patientSize !== 'small') return null;
    return { min: component.amount, max: component.maxAmount, unit: 'mg' };
  }
  if (component.unit === 'mg/animal-large') {
    if (patientSize !== 'large') return null;
    return { min: component.amount, max: component.maxAmount, unit: 'mg' };
  }
  if (component.unit.endsWith('/animal')) {
    return { min: component.amount, max: component.maxAmount, unit: component.unit.startsWith('mcg') ? 'mcg' : 'mg' };
  }
  if (!weightKg || weightKg <= 0) return null;
  const unit = component.unit.startsWith('UI') ? 'UI' : component.unit.startsWith('mcg') ? 'mcg' : 'mg';
  return { min: component.amount * weightKg, max: component.maxAmount == null ? undefined : component.maxAmount * weightKg, unit };
}

export function calculateMagistralFormula(
  components: MagistralFormulaComponent[],
  weightKg: number | null,
  patientSize: PatientSize,
  frequency: string,
  durationDays: number,
): CalculatedFormulaComponent[] {
  const perDay = administrationsPerDay(frequency);
  return components.flatMap((component) => {
    if (component.unit === 'mg/animal-small' && patientSize === 'large') return [];
    if (component.unit === 'mg/animal-large' && patientSize !== 'large') return [];
    const value = componentValues(component, weightKg, patientSize);
    const prescribedDose = amountRange(component.amount, component.maxAmount, component.unit);
    if (!value) {
      return [{ key: component.key, name: component.name, prescribedDose, amountPerDose: FILL, dailyAmount: FILL, totalAmount: FILL }];
    }
    return [{
      key: component.key,
      name: component.name,
      prescribedDose,
      amountPerDose: amountRange(value.min, value.max, value.unit),
      dailyAmount: amountRange(value.min * perDay, value.max == null ? undefined : value.max * perDay, `${value.unit}/dia`),
      totalAmount: amountRange(value.min * perDay * durationDays, value.max == null ? undefined : value.max * perDay * durationDays, value.unit),
    }];
  });
}

function renderMedication(
  medication: ClinicalMedicationDefinition,
  weightKg: number | null,
  index: number,
  alternativeKey?: string,
  override?: ClinicalMedicationOverride,
  speciesValue?: string,
): string {
  const overrideBlock = buildClinicalMedicationPrescriptionBlock(
    medication,
    override,
    weightKg,
    speciesValue,
    index,
    alternativeKey,
  );
  if (overrideBlock) return overrideBlock;

  const alternative = medication.doseAlternatives?.find((item) => item.key === alternativeKey)
    || medication.doseAlternatives?.[0];
  const resolved = alternative ? { ...medication, dose: alternative.dose, prescriptionText: alternative.prescriptionText } : medication;
  const calculated = calculateClinicalMedicationAmount(resolved, weightKg);
  const text = resolved.prescriptionText.replace(/A PREENCHER/i, calculated);
  const normalizedText = text
    .replace(/^Dose:\s*/gim, `${CLINICAL_DOSE_LABEL} `)
    .replace(/^\d+\./, `${index}.`);
  return /^Dose clínica:/im.test(normalizedText)
    ? normalizedText
    : `${normalizedText}\n\n${clinicalDoseText(resolved.dose)}`;
}

function renderFormula(
  title: string,
  components: CalculatedFormulaComponent[],
  route: string,
  frequency: string,
  durationDays: number,
  index: number,
  pharmaceuticalForm: string,
): string {
  const lines = components.flatMap((component) => [
    `${component.name} — ${component.amountPerDose}.`,
    `${CLINICAL_DOSE_LABEL} ${component.prescribedDose}`,
  ]);
  return [
    `${index}. ${title.toUpperCase()}`,
    '',
    `Forma farmacêutica: ${pharmaceuticalForm || FILL}.`,
    '',
    'Manipular uma dose contendo:',
    '',
    ...lines,
    '',
    `Administrar uma dose por via ${route}, ${frequency}, durante ${durationDays} dias.`,
  ].join('\n');
}

function listSection(title: string, items: string[]): string {
  if (!items.length) return '';
  return `${title}\n\n${items.map((item) => `• ${explainPatientTerms(item.replace(/[.;]\s*$/, ''))}.`).join('\n')}`;
}

function inlineTextSection(title: string, items: string[], leadIn = ''): string {
  if (!items.length) return '';
  const normalized = items.map((item) => explainPatientTerms(item.replace(/[.;]\s*$/, '').trim()));
  const joined = normalized.length === 1
    ? normalized[0]
    : `${normalized.slice(0, -1).join(', ')} ou ${normalized[normalized.length - 1]}`;
  const text = `${leadIn}${joined}`.replace(/\s+/g, ' ').trim();
  return `${title}\n\n${text.endsWith('.') ? text : `${text}.`}`;
}

export function renderClinicalRecipe(
  model: ClinicalRecipeModel,
  selectedOptionKeys: string[],
  weightKg: number | null,
  patientSize: PatientSize = null,
  pharmaceuticalForm = 'cápsula',
  doseAlternativeKeys: Record<string, string> = {},
  medicationOverrides: Record<string, ClinicalMedicationOverride> = {},
  speciesValue = '',
): string {
  const selected = model.options.filter((option) => selectedOptionKeys.includes(option.key));
  let medicationIndex = 1;
  const rawBlocks: string[] = [];
  for (const option of selected) {
    for (const medication of option.medications || []) {
      rawBlocks.push(renderMedication(
        medication,
        weightKg,
        medicationIndex,
        doseAlternativeKeys[medication.key],
        medicationOverrides[medication.key],
        speciesValue,
      ));
      medicationIndex += 1;
    }
    if (option.formula) {
      const calculated = calculateMagistralFormula(
        option.formula.components,
        weightKg,
        patientSize,
        option.formula.frequency,
        option.formula.durationDays,
      );
      rawBlocks.push(renderFormula(
        option.formula.title,
        calculated,
        option.formula.route,
        option.formula.frequency,
        option.formula.durationDays,
        medicationIndex,
        pharmaceuticalForm,
      ));
      medicationIndex += 1;
    }
  }

  const grouped = groupMedicationBlocksByRoute(rawBlocks);
  const formattedTreatments = grouped.length
    ? formatGroupedPrescriptionBlocks(grouped)
    : rawBlocks.length
      ? rawBlocks.join('\n\n')
      : 'TRATAMENTOS OPCIONAIS\n\nSelecione os blocos clínicos que deseja incluir nesta receita.';

  const sections = [
    model.documentHeading,
    model.hospitalWarning,
    formattedTreatments,
    listSection('RECOMENDAÇÕES DA DOENÇA', model.diseaseRecommendations),
    inlineTextSection('SINAIS PARA RETORNO', model.returnSigns, 'Retornar diante de '),
    ...(model.appendBodySectionsBuilder?.(weightKg, speciesValue)
      ?? model.appendBodySections
      ?? []),
  ].filter(Boolean);
  return sections.join('\n\n');
}

export function getClinicalRecipeObservations(
  model: ClinicalRecipeModel,
  selectedOptionKeys: string[],
): string[] {
  const selected = model.options.filter((option) => selectedOptionKeys.includes(option.key));
  return Array.from(new Set([
    ...(model.recipeInformation || []),
    ...(model.veterinarianNotes || []),
    ...model.medicationPrecautions,
    ...selected.flatMap((option) => option.medicationPrecautions || []),
    ...selected.flatMap((option) => option.veterinarianNotes || []),
  ]));
}

export function getDefaultClinicalOptionKeys(model: ClinicalRecipeModel): string[] {
  if (model.selectionMode === 'fixed') return model.options.map((option) => option.key);
  return model.defaultOptionKey ? [model.defaultOptionKey] : [];
}

export function hasTechnicalPlaceholders(value: string): boolean {
  return /{{|}}|\[|\]/.test(value);
}
