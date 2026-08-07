import type { CommercialMedicationProduct } from '../types/commercialMedication';

/** Remove sedativos e anestésicos injetáveis do catálogo comercial (Dexdomitor, Antisedan, Telazol, Sedalex etc.). */
export function excludeSedativeAnestheticCommercialProducts(
  products: CommercialMedicationProduct[],
): CommercialMedicationProduct[] {
  return products.filter((product) => product.commercialSubclass !== 'sedative_anesthetic');
}
