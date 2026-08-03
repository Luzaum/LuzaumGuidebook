import type { CommercialMedicationProduct } from '../types/commercialMedication';
import type { MedicationRecord } from '../types/medication';

export function normalizeMedicationLinkText(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\b(cloridrato|citrato|sodico|sodica|monoidratado|monoidratada|uso humano|uso veterinario)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isMeaningfulAlias(value: string): boolean {
  return value.length >= 5 && !['acido', 'sodio', 'vitamina'].includes(value);
}

function medicationAliases(medication: Pick<MedicationRecord, 'activeIngredient' | 'title'>): string[] {
  return Array.from(
    new Set([medication.activeIngredient, medication.title].map(normalizeMedicationLinkText).filter(isMeaningfulAlias)),
  );
}

export function commercialProductMatchesMedication(
  product: CommercialMedicationProduct,
  medication: Pick<MedicationRecord, 'activeIngredient' | 'title'>,
): boolean {
  const aliases = medicationAliases(medication);
  return product.activeComponents.some((component) => {
    const normalizedComponent = normalizeMedicationLinkText(component);
    if (!isMeaningfulAlias(normalizedComponent)) return false;
    return aliases.some(
      (alias) =>
        normalizedComponent === alias ||
        normalizedComponent.includes(alias) ||
        alias.includes(normalizedComponent),
    );
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
