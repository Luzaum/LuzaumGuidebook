import type { CommercialMedicationProduct } from '../types/commercialMedication';
import type { MedicationPresentation } from '../types/medication';
import type { MedicationPresentationRecord } from '../../../src/lib/clinicRecords';

function normalizeTakeHomeText(value: unknown): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

const INJECTABLE_ROUTE_PATTERN = /(?:^|[^a-z0-9])(iv|im|sc|sq|io)(?:$|[^a-z0-9])|injet|inject|intraven|endoven|intramusc|subcut|intraosse|parenter|bolus|infusao|infundir|frasco\s*[-–—]?\s*ampola/;
const TAKE_HOME_ROUTE_PATTERN = /(?:^|[^a-z0-9])(vo|po|otm|oral)(?:$|[^a-z0-9])|boca|gengiva|mucosa|transmucos|subling|topic|dermat|transderm|cutane|spot\s*[-–—]?\s*on|pipeta|otolog|otic|ouvido|oftalm|ocular|olho|inalat|aeross|nebul|nasal|retal/;

/** Identifica uma apresentação ou via que exige aplicação parenteral. */
export function isInjectablePrescriptionText(value: unknown): boolean {
  const normalized = normalizeTakeHomeText(value);
  if (!normalized) return false;
  if (/\bampola\b/.test(normalized) && !/pipeta|spot\s*[-–—]?\s*on|pour\s*[-–—]?\s*on|topico|transderm/.test(normalized)) {
    return true;
  }
  return INJECTABLE_ROUTE_PATTERN.test(normalized);
}

/** O Receituário só oferece vias que o tutor pode administrar em casa. */
export function isTakeHomePrescriptionRoute(route: unknown): boolean {
  return !isInjectablePrescriptionText(route);
}

export function isTakeHomeMedicationPresentation(presentation: MedicationPresentation): boolean {
  return !isInjectablePrescriptionText([
    presentation.label,
    presentation.form,
    presentation.route,
    presentation.packInfo,
  ].filter(Boolean).join(' '));
}

export function isTakeHomePresentationRecord(presentation: MedicationPresentationRecord | null | undefined): boolean {
  if (!presentation) return false;
  return !isInjectablePrescriptionText([
    presentation.pharmaceutical_form,
    presentation.concentration_text,
    presentation.presentation_unit,
    presentation.commercial_name,
    presentation.metadata?.route,
    presentation.metadata?.original_label,
  ].filter(Boolean).join(' '));
}

function commercialDirections(product: CommercialMedicationProduct): string {
  const plumbsEntries = [
    ...(product.dosageGuidance?.plumbs?.dog || []),
    ...(product.dosageGuidance?.plumbs?.cat || []),
  ];
  return [
    product.labelDirections,
    product.dosageGuidance?.labelDose,
    ...plumbsEntries.flatMap((entry) => [entry.dose, entry.note]),
    product.prescriptionExample,
  ].filter(Boolean).join(' ');
}

/**
 * Mantém somente as apresentações domiciliares de um produto comercial.
 * A verificação do texto de uso cobre produtos como insulinas em caneta, cuja
 * apresentação nem sempre contém a palavra "injetável", mas cuja única via é SC.
 */
export function takeHomeCommercialPresentationLines(product: CommercialMedicationProduct): string[] {
  const directions = normalizeTakeHomeText(commercialDirections(product));
  const injectionOnlyProduct = isInjectablePrescriptionText(directions) && !TAKE_HOME_ROUTE_PATTERN.test(directions);
  if (injectionOnlyProduct) return [];
  return (product.presentations || []).filter((line) => !isInjectablePrescriptionText(line));
}

export function sanitizeCommercialProductForTakeHome(product: CommercialMedicationProduct): CommercialMedicationProduct | null {
  const presentations = takeHomeCommercialPresentationLines(product);
  if (!presentations.length) return null;
  return { ...product, presentations };
}
