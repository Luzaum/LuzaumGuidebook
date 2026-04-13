import { supabase } from '@/src/lib/supabaseClient';
import { ConsultaVetSource, EditorialReference, EditorialSectionValue, VetSpecies } from '../../../types/common';

export const CONSULTA_VET_CATEGORY_TABLE = 'consulta_vet_categories';
export const CONSULTA_VET_DISEASE_TABLE = 'consulta_vet_diseases';
export const CONSULTA_VET_MEDICATION_TABLE = 'consulta_vet_medications';
export const CONSULTA_VET_DISEASE_MEDICATION_TABLE = 'consulta_vet_disease_medications';
export const CONSULTA_VET_DISEASE_CONSENSO_TABLE = 'consulta_vet_disease_consensos';

export function hasSupabaseEnv(): boolean {
  const url = String(import.meta.env.VITE_SUPABASE_URL || '').trim();
  const key = String(import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
  return Boolean(url && key && !key.includes('...'));
}

export function parseError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error || 'Erro desconhecido');
}

export async function withTimeout<T>(
  operation: Promise<T>,
  label: string,
  timeoutMs = 7000
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<T>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Tempo limite ao ${label}.`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([operation, timeoutPromise]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

export function slugify(raw: string, fallback = 'item'): string {
  const normalized = String(raw || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return normalized || fallback;
}

export function mergeBySlug<T extends { slug: string; source?: ConsultaVetSource }>(
  localItems: T[],
  supabaseItems: T[]
): T[] {
  const merged = new Map<string, T>();

  localItems.forEach((item) => {
    merged.set(item.slug, { ...item, source: item.source || 'seed' });
  });

  supabaseItems.forEach((item) => {
    merged.set(item.slug, { ...item, source: 'supabase' });
  });

  return Array.from(merged.values());
}

export function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item || '').trim())
    .filter(Boolean);
}

export function normalizeSpeciesArray(value: unknown): VetSpecies[] {
  return normalizeStringArray(value).filter((item): item is VetSpecies => item === 'dog' || item === 'cat');
}

export function normalizeSectionValue(value: unknown): EditorialSectionValue {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item || ''));
  }

  if (value && typeof value === 'object') {
    return value as EditorialSectionValue;
  }

  return '';
}

export function normalizeReferences(value: unknown): EditorialReference[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const row = item as Record<string, unknown>;
      const citationText = String(row.citationText || row.citation || row.label || '').trim();
      if (!citationText) return null;

      return {
        id: String(row.id || '').trim() || undefined,
        citationText,
        sourceType: String(row.sourceType || '').trim() || null,
        url: String(row.url || '').trim() || null,
        notes: String(row.notes || '').trim() || null,
        evidenceLevel: String(row.evidenceLevel || row.evidence_level || '').trim() || null,
      } satisfies EditorialReference;
    })
    .filter(Boolean) as EditorialReference[];
}

export async function ensureOwnerUserId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(`Falha ao validar autenticacao: ${parseError(error)}`);
  }
  if (!data.user) {
    throw new Error('Faca login para editar o conteudo editorial.');
  }

  return data.user.id;
}
