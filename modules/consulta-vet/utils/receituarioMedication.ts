import { MedicationDose, MedicationPresentation, MedicationRecord } from '../types/medication';
import { calculatePracticalEquivalent, PracticalEquivalentResult, toPracticalPresentation } from './practicalEquivalent';

export type PrescriptionSpecies = 'dog' | 'cat';

export interface PrescriptionCalculation {
  doseMgPerKg: number;
  totalDoseMg: number;
  practicalEquivalent: PracticalEquivalentResult;
}

export interface BuildPrescriptionMedicationInput {
  medication: MedicationRecord;
  dose: MedicationDose;
  presentation: MedicationPresentation;
  calculation: PrescriptionCalculation;
  duration?: string;
  additionalInstructions?: string;
}

function normalize(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

export function parsePositiveDecimal(value: string | number | undefined): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) && value > 0 ? value : null;
  }

  const parsed = Number(String(value || '').trim().replace(',', '.'));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export function normalizePrescriptionSpecies(value: string | undefined): PrescriptionSpecies | null {
  const normalized = normalize(value || '');
  if (/^(cao|canino|canina|dog)$/.test(normalized) || normalized.includes('canin')) return 'dog';
  if (/^(gato|gata|felino|felina|cat)$/.test(normalized) || normalized.includes('felin')) return 'cat';
  return null;
}

export function isWeightBasedMedicationDose(dose: MedicationDose): boolean {
  const unit = normalize(dose.doseUnit);
  const perWeight = normalize(dose.perWeightUnit);
  return dose.calculatorEnabled && unit === 'mg' && perWeight === 'kg';
}

export function isDoseWithinReferenceRange(dose: MedicationDose, doseMgPerKg: number): boolean {
  const maximum = dose.doseMax ?? dose.doseMin;
  return doseMgPerKg >= dose.doseMin && doseMgPerKg <= maximum;
}

export function calculatePrescriptionDose(
  weightKg: number,
  doseMgPerKg: number,
  presentation: MedicationPresentation
): PrescriptionCalculation | null {
  if (!Number.isFinite(weightKg) || weightKg <= 0 || !Number.isFinite(doseMgPerKg) || doseMgPerKg <= 0) {
    return null;
  }

  const totalDoseMg = weightKg * doseMgPerKg;
  const practicalEquivalent = calculatePracticalEquivalent({
    presentation: toPracticalPresentation(presentation),
    totalDosePerAdmin: totalDoseMg,
    doseUnit: 'mg',
  });

  return {
    doseMgPerKg,
    totalDoseMg,
    practicalEquivalent,
  };
}

function formatPtBr(value: number, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(value);
}

function expandRouteToken(token: string): string {
  const routeMap: Record<string, string> = {
    vo: 'oral',
    po: 'oral',
    iv: 'intravenosa',
    im: 'intramuscular',
    sc: 'subcutânea',
    topica: 'tópica',
    topico: 'tópica',
  };
  return routeMap[normalize(token)] || token.toLowerCase();
}

export function formatPrescriptionRoute(route: string): string {
  const cleaned = String(route || '').trim();
  if (!cleaned) return 'pela via indicada';

  const expanded = cleaned.replace(/\b(VO|PO|IV|IM|SC)\b/gi, (match) => expandRouteToken(match));
  if (/^uso\s+/i.test(expanded)) return expanded.toLowerCase();
  if (/^via\s+/i.test(expanded)) return `por ${expanded.toLowerCase()}`;
  return `por via ${expanded.toLowerCase()}`;
}

export function formatPrescriptionFrequency(frequency: string): string {
  const cleaned = String(frequency || '').trim();
  if (!cleaned) return 'na frequência indicada';

  const exactAliases: Record<string, string> = {
    sid: 'a cada 24 horas',
    bid: 'a cada 12 horas',
    tid: 'a cada 8 horas',
    qid: 'a cada 6 horas',
  };
  const exact = exactAliases[normalize(cleaned)];
  if (exact) return exact;

  const qRange = cleaned.match(/^q\s*(\d+)\s*[–—-]\s*(\d+)\s*h$/i);
  if (qRange) return `a cada ${qRange[1]} a ${qRange[2]} horas`;

  const qHours = cleaned.match(/^q\s*(\d+)\s*h$/i);
  if (qHours) return `a cada ${qHours[1]} horas`;

  return cleaned
    .replace(/\bSID\b/gi, 'a cada 24 horas')
    .replace(/\bBID\b/gi, 'a cada 12 horas')
    .replace(/\bTID\b/gi, 'a cada 8 horas')
    .replace(/\bQID\b/gi, 'a cada 6 horas')
    .replace(/q\s*(\d+)\s*[–—-]\s*(\d+)\s*h/gi, 'a cada $1 a $2 horas')
    .replace(/q\s*(\d+)\s*h/gi, 'a cada $1 horas');
}

function stripTrailingPunctuation(value: string): string {
  return String(value || '').trim().replace(/[.;:,]+$/g, '');
}

export function buildPrescriptionMedicationBlock({
  medication,
  dose,
  presentation,
  calculation,
  duration,
  additionalInstructions,
}: BuildPrescriptionMedicationInput): string {
  const presentationLabel = String(presentation.label || presentation.form || '').trim();
  const medicineTitle = String(medication.activeIngredient || medication.title).trim().toUpperCase();
  const practical = calculation.practicalEquivalent;
  const quantity = practical.success
    ? practical.label
    : `${formatPtBr(calculation.totalDoseMg)} mg`;
  const mgDetail = practical.success
    ? ` (${formatPtBr(calculation.totalDoseMg)} mg por administração)`
    : '';

  const lines = [
    `${medicineTitle}${presentationLabel ? ` — ${presentationLabel}` : ''}`,
    `Administrar ${quantity}${mgDetail} ${formatPrescriptionRoute(dose.route)}, ${formatPrescriptionFrequency(dose.frequency)}.`,
  ];

  const cleanedDuration = stripTrailingPunctuation(duration || '');
  if (cleanedDuration) lines.push(`Duração: ${cleanedDuration}.`);

  const cleanedInstructions = stripTrailingPunctuation(additionalInstructions || '');
  if (cleanedInstructions) lines.push(`Orientação: ${cleanedInstructions}.`);

  return lines.join('\n');
}

export function insertMedicationIntoPrescriptionText(bodyText: string, medicationBlock: string): string {
  const normalizedBody = String(bodyText || '').replace(/\r\n/g, '\n');
  const placeholderPattern = /^(\d+)\.\s+NOME DO MEDICAMENTO[^\n]*\n(?:\s*\n)?Administrar\s+\[quantidade\][^\n]*(?:\n)?/im;
  const placeholderMatch = normalizedBody.match(placeholderPattern);

  if (placeholderMatch) {
    return normalizedBody.replace(placeholderPattern, `${placeholderMatch[1]}. ${medicationBlock}\n`);
  }

  const recommendationsIndex = normalizedBody.search(/^RECOMENDAÇÕES\s*$/im);
  const medicationSection = recommendationsIndex >= 0
    ? normalizedBody.slice(0, recommendationsIndex)
    : normalizedBody;
  const existingNumbers = Array.from(medicationSection.matchAll(/^(\d+)\.\s+/gm)).map((match) => Number(match[1]));
  const nextNumber = existingNumbers.length ? Math.max(...existingNumbers) + 1 : 1;
  const numberedBlock = `${nextNumber}. ${medicationBlock}`;

  if (recommendationsIndex >= 0) {
    const before = normalizedBody.slice(0, recommendationsIndex).trimEnd();
    const after = normalizedBody.slice(recommendationsIndex).trimStart();
    return `${before}\n\n${numberedBlock}\n\n${after}`;
  }

  return `${normalizedBody.trimEnd()}${normalizedBody.trim() ? '\n\n' : ''}${numberedBlock}\n`;
}
