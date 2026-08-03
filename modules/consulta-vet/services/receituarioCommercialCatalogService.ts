import type { MedicationSearchResult } from '../../../src/lib/clinicRecords';
import { RECEITUARIO_SUBCLASSES_BY_CLASS } from '../data/receituarioCommercialTaxonomy';
import type { CommercialMedicationClass, CommercialMedicationProduct, CommercialMedicationSubclass } from '../types/commercialMedication';
import type { VetSpecies } from '../types/common';

function normalizeSearchTerm(value: unknown): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function mapCommercialProduct(product: CommercialMedicationProduct): MedicationSearchResult {
  const subclasses = Array.from(new Set([product.commercialSubclass, ...(product.commercialSubclasses || [])]));
  return {
    id: `commercial:${product.slug}`,
    name: product.name,
    is_controlled: false,
    is_private: false,
    source: 'global' as const,
    scope: 'global' as const,
    metadata: {
      search_result_type: 'commercial',
      active_ingredient: product.activeComponents.join(' + '),
      active_components: product.activeComponents,
      manufacturer: product.manufacturer,
      species: product.species,
      commercial_class: product.commercialClass,
      commercial_subclasses: subclasses,
      presentation_labels: product.presentations,
      label_directions: product.labelDirections,
      dosage_guidance: product.dosageGuidance || null,
      plumbs_context: product.plumbsContext || null,
      prescription_example: product.prescriptionExample || null,
      product_page_url: product.productPageUrl || null,
      label_url: product.labelUrl || null,
    },
  };
}

export interface PrescriptionCommercialSearchOptions {
  query?: string;
  commercialClass?: CommercialMedicationClass | '';
  commercialSubclass?: CommercialMedicationSubclass | '';
  species?: VetSpecies | null;
  limit?: number;
}

/** Catálogo comercial consultado exclusivamente pelo compositor do Receituário. */
export async function searchPrescriptionCommercialProducts({
  query = '', commercialClass = '', commercialSubclass = '', species = null, limit = 80,
}: PrescriptionCommercialSearchOptions): Promise<MedicationSearchResult[]> {
  const needle = normalizeSearchTerm(query);
  if (needle.length < 2 && !commercialClass) return [];

  const { commercialOticProductsSeed } = await import('../data/commercialOticProducts.seed');
  return commercialOticProductsSeed
    .filter((product) => {
      const subclasses = Array.from(new Set([product.commercialSubclass, ...(product.commercialSubclasses || [])]));
      const classSubclasses = commercialClass ? RECEITUARIO_SUBCLASSES_BY_CLASS[commercialClass] : [];
      const matchesClass = !commercialClass || product.commercialClass === commercialClass || subclasses.some((item) => classSubclasses.includes(item));
      const matchesSubclass = !commercialSubclass || subclasses.includes(commercialSubclass);
      const matchesSpecies = !species || product.species.includes(species);
      const searchText = normalizeSearchTerm([
        product.name, product.manufacturer, ...product.activeComponents, product.clinicalUse,
        product.labelDirections, ...subclasses,
      ].join(' '));
      return matchesClass && matchesSubclass && matchesSpecies && (!needle || searchText.includes(needle));
    })
    .sort((left, right) => {
      const leftName = normalizeSearchTerm(left.name);
      const rightName = normalizeSearchTerm(right.name);
      if (needle && leftName.startsWith(needle) !== rightName.startsWith(needle)) return leftName.startsWith(needle) ? -1 : 1;
      return left.name.localeCompare(right.name, 'pt-BR');
    })
    .slice(0, limit)
    .map(mapCommercialProduct);
}

/** Mantém o fallback de busca por nome usado no fluxo já existente. */
export async function searchPrescriptionCommercialProductsByName(query: string): Promise<MedicationSearchResult[]> {
  return searchPrescriptionCommercialProducts({ query });
}
