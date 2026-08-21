import { supabase } from '../../../src/lib/supabaseClient';
import { getGlobalCatalogMedications, isGlobalMedicationId, makeGlobalMedicationId, parseGlobalMedicationId } from '../../../src/lib/medicationCatalog';
import {
  getMedicationPresentations,
  getMedicationRecommendedDoses,
  searchMedications,
  type MedicationPresentationRecord,
  type MedicationSearchResult,
  type RecommendedDose,
} from '../../../src/lib/clinicRecords';
import type { PrescriptionPrecaution } from '../types/receituario';
import { PUBLIC_CATALOG_MEDICATION_CARD_STUBS } from '../data/publicCatalogCardStubs';

type PrecautionRow = {
  id: string;
  text_for_prescription: string;
  source_type: string;
  source_label: string | null;
  source_url: string | null;
};

function mapRows(rows: PrecautionRow[]): PrescriptionPrecaution[] {
  const seen = new Set<string>();
  return rows.flatMap((row) => {
    const text = String(row.text_for_prescription || '').trim();
    const key = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    if (!text || seen.has(key)) return [];
    seen.add(key);
    return [{ id: row.id, text, sourceType: (row.source_type || 'other') as PrescriptionPrecaution['sourceType'], sourceLabel: row.source_label || 'Cadastro do medicamento', sourceUrl: row.source_url }];
  });
}

export async function fetchPrescriptionPrecautions(clinicId: string, medicationId: string): Promise<PrescriptionPrecaution[]> {
  if (isGlobalMedicationId(medicationId)) {
    const slug = parseGlobalMedicationId(medicationId);
    const medication = await supabase.from('global_medications').select('id').eq('slug', slug).maybeSingle();
    if (medication.error || !medication.data?.id) return [];
    const response = await supabase.from('global_medication_precautions').select('id,text_for_prescription,source_type,source_label,source_url').eq('global_medication_id', medication.data.id).eq('is_active', true);
    return response.error ? [] : mapRows((response.data || []) as PrecautionRow[]);
  }
  const response = await supabase.from('medication_precautions').select('id,text_for_prescription,source_type,source_label,source_url').eq('clinic_id', clinicId).eq('medication_id', medicationId).eq('is_active', true);
  return response.error ? [] : mapRows((response.data || []) as PrecautionRow[]);
}

export async function searchPrescriptionMedicationCatalog(clinicId: string, query = '', limit = 4000): Promise<MedicationSearchResult[]> {
  let remote: MedicationSearchResult[] = [];
  try {
    remote = await searchMedications(clinicId, query, limit);
  } catch {
    // O catálogo empacotado mantém a consulta disponível em modo offline.
  }
  const needle = String(query || '').trim().toLowerCase();
  const bundled = getGlobalCatalogMedications().filter((item) => !needle || [item.name, item.active_ingredient, ...(item.tags || [])].join(' ').toLowerCase().includes(needle)).map((item): MedicationSearchResult => ({
      id: makeGlobalMedicationId(item.slug),
      name: item.name,
      is_controlled: !!item.is_controlled,
      is_private: false,
      source: 'global' as const,
      scope: 'global' as const,
      metadata: { ...(item.metadata || {}), active_ingredient: item.active_ingredient || item.name, species: item.species || [], routes: item.routes || [] },
  }));
  const editorial = PUBLIC_CATALOG_MEDICATION_CARD_STUBS
    .filter((item) => !needle || [item.title, item.activeIngredient, ...(item.tradeNames || []), ...(item.tags || [])].join(' ').toLowerCase().includes(needle))
    .map((item): MedicationSearchResult => ({
      id: `editorial:${item.slug}`,
      name: item.title,
      is_controlled: !!item.isControlled,
      is_private: false,
      source: 'global',
      scope: 'global',
      metadata: {
        active_ingredient: item.activeIngredient || item.title,
        trade_names: item.tradeNames || [],
        pharmacologic_class: item.pharmacologicClass || '',
        species: item.species || [],
        editorial_slug: item.slug,
      },
    }));

  const seen = new Set<string>();
  return [...remote, ...bundled, ...editorial].filter((item) => {
    const key = String(item.metadata?.active_ingredient || item.name || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, limit);
}

function editorialMedicationSlug(medicationId: string): string | null {
  return medicationId.startsWith('editorial:') ? medicationId.slice('editorial:'.length) : null;
}

/**
 * O catálogo editorial é empacotado no app e não possui linhas nas tabelas
 * medication_presentations. Converte suas apresentações para o mesmo contrato
 * usado pelo receituário, para que formas como "Dipirona gotas" sejam pesquisáveis.
 */
export async function getPrescriptionMedicationPresentations(
  clinicId: string,
  medicationId: string,
): Promise<MedicationPresentationRecord[]> {
  const slug = editorialMedicationSlug(medicationId);
  if (!slug) return getMedicationPresentations(clinicId, medicationId);

  const { medicationsSeed } = await import('../data/seed/medications.seed');
  const medication = medicationsSeed.find((item) => item.slug === slug);
  if (!medication) return [];

  return medication.presentations.map((presentation) => ({
    id: `editorial-presentation:${slug}:${presentation.id}`,
    clinic_id: '',
    medication_id: medicationId,
    pharmaceutical_form: presentation.form || null,
    concentration_text: presentation.concentrationValue != null && presentation.concentrationUnit
      ? `${presentation.concentrationValue} ${presentation.concentrationUnit}`
      : null,
    additional_component: null,
    presentation_unit: null,
    // O label editorial contém nome/forma legível e precisa aparecer como opção comercial.
    commercial_name: presentation.label || null,
    value: presentation.concentrationValue ?? null,
    value_unit: presentation.concentrationUnit || null,
    per_value: null,
    per_unit: null,
    avg_price_brl: null,
    pharmacy_veterinary: presentation.channel === 'veterinary',
    pharmacy_human: presentation.channel === 'human_pharmacy',
    pharmacy_compounding: presentation.channel === 'compounded',
    metadata: {
      source: 'editorial_catalog',
      route: presentation.route || null,
      pack_info: presentation.packInfo || null,
      scoring_info: presentation.scoringInfo || null,
    },
    package_quantity: null,
    package_unit: null,
    created_at: '',
    updated_at: '',
    source: 'global',
    tablet_split_increment: null,
  }));
}

/** Mantém as doses do mesmo registro editorial disponíveis depois da seleção. */
export async function getPrescriptionMedicationRecommendedDoses(
  clinicId: string,
  medicationId: string,
): Promise<RecommendedDose[]> {
  const slug = editorialMedicationSlug(medicationId);
  if (!slug) return getMedicationRecommendedDoses(clinicId, medicationId);

  const { medicationsSeed } = await import('../data/seed/medications.seed');
  const medication = medicationsSeed.find((item) => item.slug === slug);
  if (!medication) return [];

  return medication.doses.map((dose) => ({
    id: `editorial-dose:${slug}:${dose.id}`,
    clinic_id: '',
    medication_id: medicationId,
    species: dose.species,
    route: dose.route,
    dose_value: dose.doseMin,
    dose_max: dose.doseMax ?? null,
    dose_unit: dose.doseUnit,
    per_weight_unit: dose.perWeightUnit || null,
    indication: dose.indication || null,
    frequency: dose.frequency || null,
    frequency_text: dose.frequency || null,
    duration: dose.duration || null,
    notes: dose.notes || null,
    is_active: true,
    source: 'global',
    metadata: {
      source: 'editorial_catalog',
      calculator_enabled: dose.calculatorEnabled,
      presentation_id: dose.presentationId || null,
      clinical_context: dose.clinicalContext || null,
      monitoring: dose.monitoring || null,
    },
  }));
}
