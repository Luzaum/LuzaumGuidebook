import { supabase } from '../../../src/lib/supabaseClient';
import { getGlobalCatalogMedications, isGlobalMedicationId, makeGlobalMedicationId, parseGlobalMedicationId } from '../../../src/lib/medicationCatalog';
import { searchMedications, type MedicationSearchResult } from '../../../src/lib/clinicRecords';
import type { PrescriptionPrecaution } from '../types/receituario';

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
  try {
    const remote = await searchMedications(clinicId, query, limit);
    if (remote.length) return remote;
  } catch {
    // O catálogo empacotado mantém a consulta disponível em modo offline.
  }
  const needle = String(query || '').trim().toLowerCase();
  return getGlobalCatalogMedications().filter((item) => !needle || [item.name, item.active_ingredient, ...(item.tags || [])].join(' ').toLowerCase().includes(needle)).slice(0, limit).map((item) => ({
      id: makeGlobalMedicationId(item.slug),
      name: item.name,
      is_controlled: !!item.is_controlled,
      is_private: false,
      source: 'global',
      scope: 'global',
      metadata: { ...(item.metadata || {}), active_ingredient: item.active_ingredient || item.name, species: item.species || [], routes: item.routes || [] },
  }));
}
