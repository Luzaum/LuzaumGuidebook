import type { CommercialMedicationProduct } from '../types/commercialMedication';
import type { MedicationRecord } from '../types/medication';

export function normalizeMedicationLinkText(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\b(cloridrato|citrato|sodico|sodica|monoidratado|monoidratada|uso humano|uso veterinário)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isMeaningfulAlias(value: string): boolean {
  const blocked = new Set([
    'acido',
    'sodio',
    'potassio',
    'calcio',
    'magnesio',
    'cloreto',
    'sulfato',
    'vitamina',
  ]);
  return value.length >= 5 && !blocked.has(value);
}

function medicationActiveParts(medication: Pick<MedicationRecord, 'activeIngredient' | 'title'>): string[] {
  const splitParts = medication.activeIngredient
    .split(/\s*(?:\+|,|;|\be\b)\s*/i)
    .map(normalizeMedicationLinkText)
    .filter(isMeaningfulAlias);
  const title = normalizeMedicationLinkText(medication.title);
  const parts = [...splitParts];
  if (isMeaningfulAlias(title)) parts.push(title);
  return Array.from(new Set(parts));
}

function activeComponentsMatch(medicationPart: string, productComponent: string): boolean {
  if (medicationPart === productComponent) return true;
  const shorter = medicationPart.length <= productComponent.length ? medicationPart : productComponent;
  const longer = medicationPart.length > productComponent.length ? medicationPart : productComponent;
  if (shorter.length < 10) return false;
  return longer.includes(shorter);
}

export function commercialProductMatchesMedication(
  product: CommercialMedicationProduct,
  medication: Pick<MedicationRecord, 'activeIngredient' | 'title'>,
): boolean {
  const aliases = medicationActiveParts(medication);
  return product.activeComponents.some((component) => {
    const normalizedComponent = normalizeMedicationLinkText(component);
    if (!isMeaningfulAlias(normalizedComponent)) return false;
    return aliases.some((alias) => activeComponentsMatch(alias, normalizedComponent));
  });
}

export function getCommercialProductsForMedication(
  medication: Pick<MedicationRecord, 'activeIngredient' | 'title'>,
  products: CommercialMedicationProduct[],
): CommercialMedicationProduct[] {
  return products.filter((product) => commercialProductMatchesMedication(product, medication));
}

export function getMedicationsForCommercialProduct(
  product: CommercialMedicationProduct,
  medications: MedicationRecord[],
): MedicationRecord[] {
  return medications.filter((medication) => commercialProductMatchesMedication(product, medication));
}
