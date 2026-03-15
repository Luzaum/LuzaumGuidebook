import { supabase } from '@/src/lib/supabaseClient';
import {
  ConsensusDocumentDetails,
  ConsensusRecord,
  ConsensusSpecies,
  CreateConsensusInput,
  ListConsensusFilters,
  UpsertConsensusDocumentDetailsInput,
} from '../../../types/consenso';
import { ConsensusUpsertInput } from '../../../types/editorial';
import { ConsensoRepository } from '../../repositories/consenso.repository';
import { canManageConsensusSharedDetails } from '../../consensusSharedDetailsPermissions';
import { localConsensoRepository } from '../local/localConsensoRepository';
import { normalizeReferences, withTimeout } from './editorialSupabaseUtils';
import { ensureOwnerUserId, parseError } from './editorialSupabaseUtils';

const TABLE = 'consensus_documents';
const DETAILS_TABLE = 'consensus_document_details';
const DEFAULT_BUCKET = 'consulta-consensos';

type ConsensusRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  organization: string | null;
  year: number | null;
  category: string | null;
  species: ConsensusSpecies | null;
  file_path: string;
  file_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  related_disease_slugs?: unknown;
  related_medication_slugs?: unknown;
  created_by?: string | null;
  updated_by?: string | null;
};

type ConsensusDetailsRow = {
  id: string;
  consensus_document_id: string;
  summary_text: string | null;
  key_points_text: string | null;
  practical_application_text: string | null;
  app_notes_text: string | null;
  references: unknown;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

function resolveBucketName(): string {
  const fromEnv = String(import.meta.env.VITE_SUPABASE_CONSENSUS_BUCKET || '').trim();
  return fromEnv || DEFAULT_BUCKET;
}

function slugify(raw: string): string {
  const normalized = String(raw || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return normalized || 'consenso';
}

function ensurePdfFile(file: File) {
  const name = String(file?.name || '').toLowerCase();
  const mime = String(file?.type || '').toLowerCase();
  const hasPdfExtension = name.endsWith('.pdf');
  const hasPdfMime = mime === 'application/pdf';

  if (!hasPdfExtension || !hasPdfMime) {
    throw new Error('Selecione um arquivo PDF válido.');
  }
}

function cleanNullableText(value: string | null | undefined): string | null {
  const parsed = String(value || '').trim();
  return parsed || null;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item || '').trim()).filter(Boolean);
}

function mapRow(row: ConsensusRow): ConsensusRecord {
  const fileUrl = String(row.file_url || '').trim();

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    organization: row.organization,
    year: row.year,
    category: row.category,
    species: row.species || 'both',
    filePath: row.file_path,
    fileUrl,
    isPublished: row.is_published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    shortTitle: row.title,
    sourceOrganization: row.organization || '',
    summary: row.description || '',
    pdfUrl: fileUrl,
    pdfFileName: row.file_path.split('/').pop() || row.slug,
    relatedDiseaseSlugs: normalizeStringArray(row.related_disease_slugs),
    relatedMedicationSlugs: normalizeStringArray(row.related_medication_slugs),
    tags: [],
    source: 'supabase',
    storagePath: row.file_path,
  };
}

function mapDetailsRow(row: ConsensusDetailsRow): ConsensusDocumentDetails {
  return {
    id: row.id,
    consensusDocumentId: row.consensus_document_id,
    summaryText: row.summary_text,
    keyPointsText: row.key_points_text,
    practicalApplicationText: row.practical_application_text,
    appNotesText: row.app_notes_text,
    references: normalizeReferences(row.references),
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function buildUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('slug')
    .ilike('slug', `${baseSlug}%`);

  if (error) {
    throw new Error(`Falha ao validar slug: ${parseError(error)}`);
  }

  const used = new Set((data || []).map((item) => String((item as { slug: string }).slug)));

  if (!used.has(baseSlug) || excludeId) return baseSlug;

  let counter = 2;
  while (counter < 5000) {
    const candidate = `${baseSlug}-${counter}`;
    if (!used.has(candidate)) return candidate;
    counter += 1;
  }

  throw new Error('Não foi possível gerar slug único para este consenso.');
}

export class SupabaseConsensoRepository implements ConsensoRepository {
  async list(
    filters?: ListConsensusFilters,
    options?: { includeDrafts?: boolean }
  ): Promise<ConsensusRecord[]> {
    try {
      let query = supabase
        .from(TABLE)
        .select('*')
        .order('year', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });

      if (!options?.includeDrafts) {
        query = query.eq('is_published', true);
      }

      const searchText = String(filters?.query || '').trim();
      if (searchText) {
        const escaped = searchText.replace(/,/g, ' ');
        query = query.or(`title.ilike.%${escaped}%,organization.ilike.%${escaped}%`);
      }

      const category = String(filters?.category || '').trim();
      if (category) {
        query = query.eq('category', category);
      }

      const species = String(filters?.species || '').trim();
      if (species) {
        query = query.eq('species', species);
      }

      const queryResult = await query as { data: ConsensusRow[] | null; error: { message: string } | null };
      const { data, error } = queryResult;
      if (error) {
        throw new Error(`Falha ao carregar consensos: ${parseError(error)}`);
      }

      return ((data ?? []) as ConsensusRow[]).map(mapRow);
    } catch (error) {
      console.warn('[ConsultaVet] consensus fallback', error);
      return localConsensoRepository.list(filters);
    }
  }

  async getBySlug(slug: string, options?: { includeDrafts?: boolean }): Promise<ConsensusRecord | null> {
    try {
      let query = supabase
        .from(TABLE)
        .select('*')
        .eq('slug', slug);

      if (!options?.includeDrafts) {
        query = query.eq('is_published', true);
      }

      const singleResult = await query.maybeSingle() as { data: ConsensusRow | null; error: { message: string } | null };
      const { data, error } = singleResult;

      if (error) {
        throw new Error(`Falha ao carregar consenso: ${parseError(error)}`);
      }

      if (!data) return null;
      return mapRow(data as ConsensusRow);
    } catch (error) {
      console.warn('[ConsultaVet] consensus fallback', error);
      return localConsensoRepository.getBySlug(slug);
    }
  }

  async search(query: string): Promise<ConsensusRecord[]> {
    return this.list({ query });
  }

  async listByCategory(categorySlug: string): Promise<ConsensusRecord[]> {
    return this.list({ category: categorySlug });
  }

  async create(input: CreateConsensusInput): Promise<ConsensusRecord> {
    ensurePdfFile(input.file);

    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) {
      throw new Error(`Falha ao validar autenticação: ${parseError(authError)}`);
    }
    if (!authData.user) {
      throw new Error('Faça login para cadastrar um consenso.');
    }

    const initialSlug = slugify(input.title);
    const slug = await buildUniqueSlug(initialSlug);

    const yearSegment = input.year && Number.isFinite(input.year) ? String(input.year) : 'sem-ano';
    const filePath = `consensos/${yearSegment}/${slug}-${Date.now()}.pdf`;
    const bucket = resolveBucketName();

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, input.file, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'application/pdf',
      });

    if (uploadError) {
      throw new Error(`Falha no upload do PDF: ${parseError(uploadError)}`);
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
    const publicUrl = String(publicUrlData.publicUrl || '').trim();

    const payload = {
      slug,
      title: input.title,
      description: input.description?.trim() || null,
      organization: input.organization?.trim() || null,
      year: input.year ?? null,
      category: input.category?.trim() || null,
      species: input.species,
      file_path: filePath,
      file_url: publicUrl || null,
      is_published: input.isPublished ?? true,
    };

    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      await supabase.storage.from(bucket).remove([filePath]);
      throw new Error(`Falha ao salvar consenso: ${parseError(error)}`);
    }

    return mapRow(data as ConsensusRow);
  }

  async upsert(input: ConsensusUpsertInput): Promise<ConsensusRecord> {
    const userId = await ensureOwnerUserId();
    const isNew = !input.id;
    const normalizedSlug = slugify(input.slug || input.title);

    // Se for novo e tiver arquivo, faz upload primeiro
    let filePath: string | undefined;
    let fileUrl: string | undefined;

    if (input.file) {
      ensurePdfFile(input.file);

      const yearSegment =
        input.year && Number.isFinite(input.year)
          ? String(input.year)
          : 'sem-ano';
      const slugForPath = isNew
        ? await buildUniqueSlug(normalizedSlug, undefined)
        : normalizedSlug;
      filePath = `consensos/${yearSegment}/${slugForPath}-${Date.now()}.pdf`;
      const bucket = resolveBucketName();

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, input.file, {
          cacheControl: '3600',
          upsert: false,
          contentType: 'application/pdf',
        });

      if (uploadError) {
        throw new Error(`Falha no upload do PDF: ${parseError(uploadError)}`);
      }

      const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
      fileUrl = String(publicUrlData.publicUrl || '').trim();
    }

    // Buscar registro existente para manter dados de criação
    let existingId: string | undefined = input.id;
    let existingFilePath: string | undefined;
    let existingCreatedBy: string | null = null;

    if (input.id) {
      const { data: existingRow } = await supabase
        .from(TABLE)
        .select('id, file_path, created_by')
        .eq('id', input.id)
        .maybeSingle();

      if (existingRow) {
        const row = existingRow as { id: string; file_path: string; created_by: string | null };
        existingId = row.id;
        existingFilePath = row.file_path;
        existingCreatedBy = row.created_by;
      }
    } else {
      // Check by slug for upsert
      const { data: existingBySlug } = await supabase
        .from(TABLE)
        .select('id, file_path, created_by')
        .eq('slug', normalizedSlug)
        .maybeSingle();

      if (existingBySlug) {
        const row = existingBySlug as { id: string; file_path: string; created_by: string | null };
        existingId = row.id;
        existingFilePath = row.file_path;
        existingCreatedBy = row.created_by;
      }
    }

    const payload: Record<string, unknown> = {
      slug: normalizedSlug,
      title: input.title,
      description: cleanNullableText(input.description),
      organization: cleanNullableText(input.organization),
      year: input.year ?? null,
      category: cleanNullableText(input.category),
      species: input.species,
      is_published: input.isPublished ?? true,
      related_disease_slugs: input.relatedDiseaseSlugs || [],
      related_medication_slugs: input.relatedMedicationSlugs || [],
      created_by: existingCreatedBy || userId,
      updated_by: userId,
    };

    // Only update file fields if a new file was uploaded
    if (filePath && fileUrl) {
      payload.file_path = filePath;
      payload.file_url = fileUrl;
    } else if (!existingId) {
      // New record without a file — set empty placeholders
      payload.file_path = '';
      payload.file_url = null;
    }

    let savedId: string;

    if (existingId) {
      // Update by id
      const { data, error: updateError } = await supabase
        .from(TABLE)
        .update(payload)
        .eq('id', existingId)
        .select('*')
        .single();

      if (updateError) {
        throw new Error(`Falha ao salvar consenso: ${parseError(updateError)}`);
      }

      savedId = existingId;

      // Delete old PDF from storage if we replaced it
      if (filePath && existingFilePath && existingFilePath !== filePath) {
        await supabase.storage.from(resolveBucketName()).remove([existingFilePath]).catch(() => {
          console.warn('[ConsultaVet] Não foi possível remover PDF antigo do storage.');
        });
      }

      void data;
    } else {
      const { data, error: insertError } = await supabase
        .from(TABLE)
        .insert(payload)
        .select('*')
        .single();

      if (insertError) {
        if (filePath) {
          await supabase.storage.from(resolveBucketName()).remove([filePath]).catch(() => { });
        }
        throw new Error(`Falha ao criar consenso: ${parseError(insertError)}`);
      }

      savedId = (data as ConsensusRow).id;
    }

    // Upsert shared details if any editorial details were provided
    const hasDetails =
      input.summaryText !== undefined ||
      input.keyPointsText !== undefined ||
      input.practicalApplicationText !== undefined ||
      input.appNotesText !== undefined ||
      input.references !== undefined;

    if (hasDetails) {
      const detailsPayload = {
        consensus_document_id: savedId,
        summary_text: cleanNullableText(input.summaryText),
        key_points_text: cleanNullableText(input.keyPointsText),
        practical_application_text: cleanNullableText(input.practicalApplicationText),
        app_notes_text: cleanNullableText(input.appNotesText),
        references: input.references || [],
        created_by: existingCreatedBy || userId,
        updated_by: userId,
      };

      await supabase
        .from(DETAILS_TABLE)
        .upsert(detailsPayload, { onConflict: 'consensus_document_id' });
    }

    const result = await this.getBySlug(normalizedSlug, { includeDrafts: true });
    if (!result) {
      throw new Error('Consenso salvo, mas não foi possível reler o registro.');
    }

    return result;
  }

  async replacePdf(consensusId: string, file: File): Promise<ConsensusRecord> {
    ensurePdfFile(file);
    const userId = await ensureOwnerUserId();

    // Load existing record
    const { data: existingRow, error: existingError } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id', consensusId)
      .single();

    if (existingError || !existingRow) {
      throw new Error('Consenso não encontrado.');
    }

    const row = existingRow as ConsensusRow;
    const oldFilePath = row.file_path;
    const bucket = resolveBucketName();

    const yearSegment = row.year ? String(row.year) : 'sem-ano';
    const newFilePath = `consensos/${yearSegment}/${row.slug}-${Date.now()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(newFilePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'application/pdf',
      });

    if (uploadError) {
      throw new Error(`Falha no upload do novo PDF: ${parseError(uploadError)}`);
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(newFilePath);
    const newPublicUrl = String(publicUrlData.publicUrl || '').trim();

    const { data: updatedData, error: updateError } = await supabase
      .from(TABLE)
      .update({
        file_path: newFilePath,
        file_url: newPublicUrl || null,
        updated_by: userId,
      })
      .eq('id', consensusId)
      .select('*')
      .single();

    if (updateError) {
      // Try to clean up uploaded file
      await supabase.storage.from(bucket).remove([newFilePath]).catch(() => { });
      throw new Error(`Falha ao atualizar PDF no banco: ${parseError(updateError)}`);
    }

    // Delete old file from bucket (best-effort)
    if (oldFilePath && oldFilePath !== newFilePath) {
      await supabase.storage.from(bucket).remove([oldFilePath]).catch(() => {
        console.warn('[ConsultaVet] Não foi possível remover PDF anterior do storage.');
      });
    }

    return mapRow(updatedData as ConsensusRow);
  }

  async getSharedDetailsByConsensusId(consensusDocumentId: string): Promise<ConsensusDocumentDetails | null> {
    try {
      const { data, error } = await withTimeout(
        supabase
          .from(DETAILS_TABLE)
          .select('*')
          .eq('consensus_document_id', consensusDocumentId)
          .maybeSingle(),
        'carregar detalhes do consenso'
      );

      if (error) {
        throw new Error(`Falha ao carregar detalhes do consenso: ${parseError(error)}`);
      }

      if (!data) return null;
      return mapDetailsRow(data as ConsensusDetailsRow);
    } catch (error) {
      console.warn('[ConsultaVet] consensus details fallback', error);
      return localConsensoRepository.getSharedDetailsByConsensusId(consensusDocumentId);
    }
  }

  async upsertSharedDetails(
    consensusDocumentId: string,
    input: UpsertConsensusDocumentDetailsInput
  ): Promise<ConsensusDocumentDetails> {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) {
      throw new Error(`Falha ao validar autenticação: ${parseError(authError)}`);
    }
    if (!authData.user) {
      throw new Error('Faça login para editar os detalhes compartilhados.');
    }
    if (!(await canManageConsensusSharedDetails())) {
      throw new Error('Somente perfis owner podem editar os detalhes compartilhados deste consenso.');
    }

    const currentUserId = authData.user.id;
    const existing = await this.getSharedDetailsByConsensusId(consensusDocumentId);

    const payload = {
      consensus_document_id: consensusDocumentId,
      summary_text: cleanNullableText(input.summaryText),
      key_points_text: cleanNullableText(input.keyPointsText),
      practical_application_text: cleanNullableText(input.practicalApplicationText),
      app_notes_text: cleanNullableText(input.appNotesText),
      references: input.references || [],
      created_by: existing?.createdBy || currentUserId,
      updated_by: currentUserId,
    };

    const { data, error } = await supabase
      .from(DETAILS_TABLE)
      .upsert(payload, { onConflict: 'consensus_document_id' })
      .select('*')
      .single();

    if (error) {
      throw new Error(`Falha ao salvar detalhes do consenso: ${parseError(error)}`);
    }

    return mapDetailsRow(data as ConsensusDetailsRow);
  }
}

export const supabaseConsensoRepository = new SupabaseConsensoRepository();
