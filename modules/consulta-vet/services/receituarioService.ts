import { supabase } from '../../../src/lib/supabaseClient';
import { GLOBAL_RECIPE_TEMPLATE_IDS, isRetiredRecipeTemplate, SEEDED_TEMPLATES as RECEITUARIO_SEED_TEMPLATES } from '../data/receituarioSeed';
import type { DocumentTemplate, GeneratedDocument, Placeholders, PrescriptionMedicationSnapshot, ReceituarioDocumentData } from '../types/receituario';
import { sanitizeIssuedText } from '../utils/receituarioDocument';

const CACHE_PREFIX = 'vetius:receituario:cache:v2';
const RECENTS_KEY = `${CACHE_PREFIX}:recents`;
const SIGNED_COPIES_BUCKET = 'receituario-signed-copies';

function readCache<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; }
}
function writeCache<T>(key: string, value: T): void { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* cache não é fonte primária */ } }
function requireUser(userId?: string | null): string { if (!userId) throw new Error('Entre na sua conta para sincronizar estes dados.'); return userId; }
function cacheKey(scope: string, userId?: string | null): string { return `${CACHE_PREFIX}:${scope}:${userId || 'anonymous'}`; }

/** Apenas importa modelos antigos em memória; qualquer marcador restante vira texto seguro. */
export function applyPlaceholders(text: string, placeholders: Placeholders): string {
  let result = String(text || '');
  for (const [key, value] of Object.entries(placeholders)) result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(value || 'A PREENCHER'));
  return sanitizeIssuedText(result);
}

export function getLocalRecents(): string[] { return readCache<string[]>(RECENTS_KEY, []); }
export function trackRecentlyUsedTemplate(templateId: string): void { writeCache(RECENTS_KEY, [templateId, ...getLocalRecents().filter((id) => id !== templateId)].slice(0, 8)); }

export async function fetchAllTemplates(clinicId?: string | null, userId?: string | null): Promise<DocumentTemplate[]> {
  const cached = readCache<DocumentTemplate[]>(cacheKey('templates', userId), []).filter((template) => !isRetiredRecipeTemplate(template));
  if (!userId) return [...RECEITUARIO_SEED_TEMPLATES, ...cached].filter((template) => !isRetiredRecipeTemplate(template));
  let query = supabase.from('document_templates').select('*').eq('is_active', true).order('title');
  query = clinicId ? query.or(`is_global.eq.true,and(owner_user_id.eq.${userId},clinic_id.eq.${clinicId})`) : query.or(`is_global.eq.true,owner_user_id.eq.${userId}`);
  const { data, error } = await query;
  if (error) return [...RECEITUARIO_SEED_TEMPLATES, ...cached];
  const remote = ((data || []) as DocumentTemplate[]).filter((template) =>
    !isRetiredRecipeTemplate(template)
    && (!template.is_global || template.document_type !== 'recipe' || GLOBAL_RECIPE_TEMPLATE_IDS.has(template.id)),
  );
  writeCache(cacheKey('templates', userId), remote.filter((item) => !item.is_global));
  const map = new Map<string, DocumentTemplate>();
  RECEITUARIO_SEED_TEMPLATES.forEach((item) => map.set(item.id, item));
  remote.forEach((item) => map.set(item.id, item));
  return Array.from(map.values());
}

export async function fetchFavorites(userId?: string | null): Promise<string[]> {
  if (!userId) return [];
  const { data, error } = await supabase.from('template_favorites').select('template_id').eq('user_id', userId);
  if (error) return readCache<string[]>(cacheKey('favorites', userId), []);
  const ids = (data || []).map((row) => String(row.template_id)); writeCache(cacheKey('favorites', userId), ids); return ids;
}

export async function toggleFavorite(templateId: string, userId?: string | null): Promise<boolean> {
  const owner = requireUser(userId);
  const { data, error } = await supabase.from('template_favorites').select('template_id').eq('user_id', owner).eq('template_id', templateId).maybeSingle();
  if (error) throw new Error(`Não foi possível consultar o favorito: ${error.message}`);
  if (data) {
    const response = await supabase.from('template_favorites').delete().eq('user_id', owner).eq('template_id', templateId);
    if (response.error) throw new Error(`Não foi possível remover o favorito: ${response.error.message}`);
    return false;
  }
  const response = await supabase.from('template_favorites').insert({ user_id: owner, template_id: templateId });
  if (response.error) throw new Error(`Não foi possível favoritar: ${response.error.message}`);
  return true;
}

export async function saveCustomTemplate(input: {
  title: string; category: string; document_type: 'recipe' | 'term'; species: 'cão' | 'gato' | 'ambos'; body_plain_text: string;
  templateId?: string | null; structured_defaults?: Partial<ReceituarioDocumentData> | null; medication_ids?: string[]; clinicId?: string | null; userId?: string | null;
}): Promise<DocumentTemplate> {
  const owner = requireUser(input.userId);
  const values = {
    clinic_id: input.clinicId || null, owner_user_id: owner, title: input.title, category: input.category,
    document_type: input.document_type, species: input.species, body_plain_text: sanitizeIssuedText(input.body_plain_text),
    structured_defaults: input.structured_defaults || {}, medication_ids: input.medication_ids || [], is_global: false, is_active: true,
  };
  const response = input.templateId
    ? await supabase.from('document_templates').update({ ...values, updated_at: new Date().toISOString() }).eq('id', input.templateId).eq('owner_user_id', owner).eq('is_global', false).select().single()
    : await supabase.from('document_templates').insert(values).select().single();
  const { data, error } = response;
  if (error || !data) throw new Error(`Não foi possível ${input.templateId ? 'atualizar' : 'salvar'} o modelo: ${error?.message || 'resposta vazia'}`);
  return data as DocumentTemplate;
}

export async function deleteCustomTemplate(templateId: string, userId?: string | null): Promise<void> {
  await deleteCustomTemplates([templateId], userId);
}

export async function deleteCustomTemplates(templateIds: string[], userId?: string | null): Promise<void> {
  const owner = requireUser(userId);
  const ids = Array.from(new Set(templateIds.filter(Boolean)));
  if (!ids.length) return;
  const { error } = await supabase.from('document_templates').delete().in('id', ids).eq('owner_user_id', owner).eq('is_global', false);
  if (error) throw new Error(`Não foi possível excluir o modelo: ${error.message}`);
  await Promise.all([
    supabase.from('template_favorites').delete().eq('user_id', owner).in('template_id', ids),
    supabase.from('receituario_drafts').delete().eq('user_id', owner).in('template_id', ids),
  ]);
  const cached = readCache<DocumentTemplate[]>(cacheKey('templates', owner), []).filter((template) => !ids.includes(template.id));
  writeCache(cacheKey('templates', owner), cached);
}

export async function saveReceituarioDraft(input: { clinicId?: string | null; userId?: string | null; templateId?: string | null; document: ReceituarioDocumentData }): Promise<void> {
  const owner = requireUser(input.userId);
  const { error } = await supabase.from('receituario_drafts').upsert({
    user_id: owner, clinic_id: input.clinicId || null, template_id: input.templateId || '__new__', draft_data: input.document, updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,template_id' });
  if (error) throw new Error(`Não foi possível sincronizar o rascunho: ${error.message}`);
  writeCache(cacheKey('draft', owner), input.document);
}

export async function issueGeneratedDocument(input: {
  title: string; document_type: 'recipe' | 'term'; body_plain_text: string; structured_data: ReceituarioDocumentData;
  prescription_items?: PrescriptionMedicationSnapshot[]; template_id?: string | null; clinic_id?: string | null; created_by?: string | null;
}): Promise<GeneratedDocument> {
  const owner = requireUser(input.created_by);
  const now = new Date().toISOString();
  const { data, error } = await supabase.from('generated_documents').insert({
    clinic_id: input.clinic_id || null, template_id: input.template_id || null, title: input.title,
    document_type: input.document_type, body_plain_text: sanitizeIssuedText(input.body_plain_text), structured_data: input.structured_data,
    status: 'issued', issued_at: now, created_by: owner,
  }).select().single();
  if (error || !data) throw new Error(`Não foi possível emitir o documento: ${error?.message || 'resposta vazia'}`);
  if (input.prescription_items?.length) {
    const links = input.prescription_items.map((item, index) => ({
      generated_document_id: data.id,
      sort_order: index,
      medication_id: item.medicationId,
      presentation_id: item.presentationId || null,
      dose_id: item.doseId || null,
      medication_snapshot: item,
    }));
    const linked = await supabase.from('generated_document_medications').insert(links);
    if (linked.error) throw new Error(`Documento salvo, mas os vínculos clínicos falharam: ${linked.error.message}`);
  }
  return data as GeneratedDocument;
}

export async function fetchIssuedDocuments(clinicId?: string | null, userId?: string | null): Promise<GeneratedDocument[]> {
  if (!userId) return [];
  let query = supabase.from('generated_documents').select('*').eq('created_by', userId).order('issued_at', { ascending: false });
  if (clinicId) query = query.eq('clinic_id', clinicId);
  const { data, error } = await query;
  if (error) return readCache<GeneratedDocument[]>(cacheKey('documents', userId), []);
  const docs = (data || []) as GeneratedDocument[]; writeCache(cacheKey('documents', userId), docs); return docs;
}

function safeFileName(value: string): string { return String(value || 'anexo').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]+/g, '-').toLowerCase(); }

export async function uploadSignedCopy(input: { documentId: string; file: File; clinicId?: string | null; userId?: string | null }): Promise<string> {
  const owner = requireUser(input.userId);
  if (!input.clinicId) throw new Error('Selecione a clínica antes de anexar.');
  if (!['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes(input.file.type)) throw new Error('Envie PDF, JPG, PNG ou WebP.');
  if (input.file.size > 10 * 1024 * 1024) throw new Error('O anexo deve ter no máximo 10 MB.');
  const path = `${input.clinicId}/${owner}/${input.documentId}/${crypto.randomUUID()}-${safeFileName(input.file.name)}`;
  const upload = await supabase.storage.from(SIGNED_COPIES_BUCKET).upload(path, input.file, { contentType: input.file.type, upsert: false });
  if (upload.error) throw new Error(`Não foi possível enviar o anexo: ${upload.error.message}`);
  const update = await supabase.from('generated_documents').update({ signed_copy_storage_path: path, updated_at: new Date().toISOString() }).eq('id', input.documentId).eq('created_by', owner);
  if (update.error) { await supabase.storage.from(SIGNED_COPIES_BUCKET).remove([path]); throw new Error(`Não foi possível vincular o anexo: ${update.error.message}`); }
  return path;
}

export async function createSignedCopyUrl(path: string, userId?: string | null): Promise<string> {
  requireUser(userId);
  const { data, error } = await supabase.storage.from(SIGNED_COPIES_BUCKET).createSignedUrl(path, 300);
  if (error || !data?.signedUrl) throw new Error('Não foi possível abrir o anexo assinado.');
  return data.signedUrl;
}

export async function updateSignedCopyPath(): Promise<void> {
  throw new Error('Use upload privado; anexos locais não são mais aceitos.');
}
