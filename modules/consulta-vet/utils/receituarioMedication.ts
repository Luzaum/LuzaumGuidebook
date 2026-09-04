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
export interface PrescriptionMedicationHeaderInput {
  medicationName: string;
  commercialName?: string | null;
  concentration?: string | null;
  pharmaceuticalForm?: string | null;
}

export function prescriptionPharmaceuticalFormLabel(value: unknown): string {
  const raw = String(value || '').trim();
  const normalized = normalize(raw);
  if (!normalized) return '';
  if (/comprim.*mastig/.test(normalized)) return 'Comprimidos mastigáveis';
  if (/comprim|tablet|dragea/.test(normalized)) return 'Comprimidos';
  if (/capsul/.test(normalized)) return 'Cápsulas';
  if (/solucao.*oftalm|colirio/.test(normalized)) return 'Solução oftálmica';
  if (/pomada.*oftalm/.test(normalized)) return 'Pomada oftálmica';
  if (/solucao.*otolog|solucao.*otic/.test(normalized)) return 'Solução otológica';
  if (/suspensão.*oral/.test(normalized)) return 'Suspensão oral';
  if (/solucao.*oral/.test(normalized)) return 'Solução oral';
  if (/solucao.*injet|injetav/.test(normalized)) return 'Solução injetável';
  if (/xarope/.test(normalized)) return 'Xarope';
  if (/pomada/.test(normalized)) return 'Pomada';
  if (/creme/.test(normalized)) return 'Creme';
  if (/shampoo|xampu/.test(normalized)) return 'Xampu';
  if (/spray/.test(normalized)) return 'Spray';
  if (/sache/.test(normalized)) return 'Sachês';
  if (/gota/.test(normalized)) return 'Gotas';
  if (/gel/.test(normalized)) return 'Gel';
  return '';
}

export function extractPrescriptionConcentration(value: unknown): string {
  const text = String(value || '').trim();
  const match = text.match(/\d+(?:[.,]\d+)?\s*(?:mcg|µg|ug|mg|g|mL|ml|UI|U)(?:\s*\/\s*(?:comprimido|cápsula|capsula|mL|ml|gota|dose|aplicação|aplicacao|animal))?/i);
  return match?.[0]
    ?.replace(/\bml\b/gi, 'mL')
    .replace(/\bui\b/gi, 'UI')
    .trim() || '';
}

function concentrationDenominator(form: string): string {
  const normalized = normalize(form);
  if (normalized.includes('comprim')) return 'comprimido';
  if (normalized.includes('capsul')) return 'cápsula';
  if (/solucao|suspensão|xarope/.test(normalized)) return 'mL';
  if (normalized.includes('gota')) return 'gota';
  if (normalized.includes('sache')) return 'sachê';
  return '';
}

export function formatPrescriptionMedicationHeader({
  medicationName,
  commercialName,
  concentration,
  pharmaceuticalForm,
}: PrescriptionMedicationHeaderInput): string {
  const medicine = String(medicationName || '').trim().toUpperCase();
  const brand = String(commercialName || '').trim();
  const form = prescriptionPharmaceuticalFormLabel(pharmaceuticalForm);
  let strength = extractPrescriptionConcentration(concentration);
  if (strength && !strength.includes('/')) {
    const denominator = concentrationDenominator(form);
    if (denominator) strength = `${strength}/${denominator}`;
  }

  const leftParts = [medicine];
  if (brand && normalize(brand) !== normalize(medicine)) leftParts.push(brand.toUpperCase());
  if (strength) leftParts.push(strength);
  if (form) leftParts.push(form);
  return leftParts.filter(Boolean).join(' — ');
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
  if (/^(cao|canino|canina|dog)$/.test(normalized) || /^c.{1,3}o$/.test(normalized) || normalized.includes('canin')) return 'dog';
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

export const ROUTE_ORDER = [
  'USO ORAL',
  'USO TÓPICO',
  'USO OTOLÓGICO',
  'USO OFTÁLMICO',
  'USO INJETÁVEL',
  'USO INALATÓRIO',
  'OUTRAS VIAS',
] as const;

export function getRouteCategory(routeOrText: string): string {
  const normalized = normalize(routeOrText);
  if (/oftalm|colirio|ocular|\bolho\b|\bolhos\b/.test(normalized)) return 'USO OFTÁLMICO';
  if (/otolog|ótico|auricular|\bouvido\b|\bouvidos\b|\borelha\b/.test(normalized)) return 'USO OTOLÓGICO';
  if (/shampoo|xampu|pomada|creme|gel|spray|topico|topica|\bpele\b|banho/.test(normalized)) return 'USO TÓPICO';
  if (/subcutan|intramuscul|intravenos|endovenos|\bsc\b|\bim\b|\biv\b|\bev\b|injetav/.test(normalized)) return 'USO INJETÁVEL';
  if (/inalat|nebuliz|inalac/.test(normalized)) return 'USO INALATÓRIO';
  if (/comprim|capsul|xarope|solucao oral|suspensão oral|oral|\bvo\b|\bpo\b|dragea|pasta/.test(normalized)) return 'USO ORAL';
  if (normalized.includes('oral') || !normalized.trim()) return 'USO ORAL';
  return 'OUTRAS VIAS';
}

function cleanMedicationItemBlock(blockText: string): string {
  const cleaned = String(blockText || '')
    .trim()
    .replace(/^(\d+)\.\s*/, '')
    .replace(/^USO\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ\s]+(?:\n+|$)/i, '')
    .trim();

  const normalized = normalize(cleaned);
  if (!cleaned || /^uso\s+(oral|topico|topica|otologico|otologica|oftálmico|oftálmica|injetavel|inalatorio|outras\s+vias)$/.test(normalized)) {
    return '';
  }

  return cleaned;
}

function isNonMedicationSectionHeading(line: string): boolean {
  const normalized = normalize(line);
  return /^(recomendacoes|sinais para retorno|orientacoes|alerta|aviso de piora|observacoes|nota)/.test(normalized);
}

export function groupMedicationBlocksByRoute(blocks: string[]): Array<{ route: string; items: string[] }> {
  const groups: Record<string, string[]> = {};
  for (const block of blocks) {
    const cleaned = cleanMedicationItemBlock(block);
    if (!cleaned || /NOME DO MEDICAMENTO|Administrar\s+\[quantidade\]/i.test(cleaned)) continue;
    const category = getRouteCategory(cleaned);
    if (!groups[category]) groups[category] = [];
    // Avoid duplicate blocks
    if (!groups[category].includes(cleaned)) {
      groups[category].push(cleaned);
    }
  }

  const result: Array<{ route: string; items: string[] }> = [];
  for (const route of ROUTE_ORDER) {
    if (groups[route] && groups[route].length) {
      result.push({ route, items: groups[route] });
    }
  }
  return result;
}

export function formatGroupedPrescriptionBlocks(grouped: Array<{ route: string; items: string[] }>): string {
  let globalIndex = 1;
  const sections: string[] = [];

  for (const group of grouped) {
    const itemLines = group.items.map((item) => {
      const numbered = `${globalIndex}. ${item}`;
      globalIndex += 1;
      return numbered;
    });
    sections.push(`${group.route}\n\n${itemLines.join('\n\n')}`);
  }

  return sections.join('\n\n');
}

export function insertMedicationIntoPrescriptionText(bodyText: string, medicationBlock: string): string {
  const normalizedBody = String(bodyText || '').replace(/\r\n/g, '\n').trim();
  const cleanedNewBlock = cleanMedicationItemBlock(medicationBlock);

  if (!normalizedBody) {
    const category = getRouteCategory(cleanedNewBlock);
    return `${category}\n\n1. ${cleanedNewBlock}`;
  }

  // Split body into medication area and tail (recommendations, return signs, etc.)
  const lines = normalizedBody.split('\n');
  let tailIndex = -1;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (isNonMedicationSectionHeading(line)) {
      tailIndex = i;
      break;
    }
  }

  const medSectionText = tailIndex >= 0 ? lines.slice(0, tailIndex).join('\n') : normalizedBody;
  const tailText = tailIndex >= 0 ? lines.slice(tailIndex).join('\n').trim() : '';

  // Extract existing medication blocks
  const rawBlocks = medSectionText
    .split(/\n(?=(?:\d+\.\s+|USO\s+[A-ZÁÉÍÓÚ\s]+\n))/i)
    .map((b) => b.trim())
    .filter(Boolean);

  const existingItems = rawBlocks
    .map(cleanMedicationItemBlock)
    .filter((b) => b && !/NOME DO MEDICAMENTO|Administrar\s+\[quantidade\]/i.test(b));

  const allItems = [...existingItems, cleanedNewBlock];
  const grouped = groupMedicationBlocksByRoute(allItems);
  const formattedMeds = formatGroupedPrescriptionBlocks(grouped);

  if (tailText) {
    return `${formattedMeds}\n\n${tailText}`;
  }

  return formattedMeds;
}

export function removeMedicationFromPrescriptionText(bodyText: string, blockTextToRemove: string): string {
  const normalizedBody = String(bodyText || '').replace(/\r\n/g, '\n').trim();
  const targetClean = cleanMedicationItemBlock(blockTextToRemove);
  const targetTitle = targetClean.split('\n')[0]?.trim() || '';

  const lines = normalizedBody.split('\n');
  let tailIndex = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (isNonMedicationSectionHeading(lines[i].trim())) {
      tailIndex = i;
      break;
    }
  }

  const medSectionText = tailIndex >= 0 ? lines.slice(0, tailIndex).join('\n') : normalizedBody;
  const tailText = tailIndex >= 0 ? lines.slice(tailIndex).join('\n').trim() : '';

  const rawBlocks = medSectionText
    .split(/\n(?=(?:\d+\.\s+|USO\s+[A-ZÁÉÍÓÚ\s]+\n))/i)
    .map((b) => b.trim())
    .filter(Boolean);

  const remainingItems = rawBlocks
    .map(cleanMedicationItemBlock)
    .filter((b) => {
      if (!b || /NOME DO MEDICAMENTO|Administrar\s+\[quantidade\]/i.test(b)) return false;
      if (targetClean && b === targetClean) return false;
      if (targetTitle && normalize(b).includes(normalize(targetTitle))) return false;
      return true;
    });

  if (!remainingItems.length) {
    return tailText;
  }

  const grouped = groupMedicationBlocksByRoute(remainingItems);
  const formattedMeds = formatGroupedPrescriptionBlocks(grouped);

  return tailText ? `${formattedMeds}\n\n${tailText}` : formattedMeds;
}
export function updateMedicationInPrescriptionText(
  bodyText: string,
  oldBlockText: string,
  newBlockText: string,
): string {
  const normalizedBody = String(bodyText || '').replace(/\r\n/g, '\n').trim();
  const oldClean = cleanMedicationItemBlock(oldBlockText);
  const oldTitle = oldClean.split('\n')[0]?.trim() || '';
  const newClean = cleanMedicationItemBlock(newBlockText);

  const lines = normalizedBody.split('\n');
  let tailIndex = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (isNonMedicationSectionHeading(lines[i].trim())) {
      tailIndex = i;
      break;
    }
  }

  const medSectionText = tailIndex >= 0 ? lines.slice(0, tailIndex).join('\n') : normalizedBody;
  const tailText = tailIndex >= 0 ? lines.slice(tailIndex).join('\n').trim() : '';

  const rawBlocks = medSectionText
    .split(/\n(?=(?:\d+\.\s+|USO\s+[A-ZÁÉÍÓÚ\s]+\n))/i)
    .map((b) => b.trim())
    .filter(Boolean);

  let replaced = false;
  const updatedItems = rawBlocks
    .map(cleanMedicationItemBlock)
    .filter((b) => Boolean(b) && !/NOME DO MEDICAMENTO|Administrar\s+\[quantidade\]/i.test(b))
    .map((b) => {
      if (!replaced && ((oldClean && b === oldClean) || (oldTitle && normalize(b).includes(normalize(oldTitle))))) {
        replaced = true;
        return newClean;
      }
      return b;
    });

  if (!replaced) {
    updatedItems.push(newClean);
  }

  const grouped = groupMedicationBlocksByRoute(updatedItems);
  const formattedMeds = formatGroupedPrescriptionBlocks(grouped);

  return tailText ? `${formattedMeds}\n\n${tailText}` : formattedMeds;
}
