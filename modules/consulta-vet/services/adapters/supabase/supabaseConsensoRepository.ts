import { supabase } from '@/src/lib/supabaseClient';
import {
  ConsensusDocumentDetails,
  ConsensusRecord,
  ConsensusSpecies,
  CreateConsensusInput,
  ListConsensusFilters,
  UpsertConsensusDocumentDetailsInput,
} from '../../../types/consenso';
import { ConsensoRepository } from '../../repositories/consenso.repository';
import { canManageConsensusSharedDetails } from '../../consensusSharedDetailsPermissions';
import { normalizeReferences } from './editorialSupabaseUtils';

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

function parseError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error || 'Erro desconhecido');
}

function ensurePdfFile(file: File) {
  const name = String(file?.name || '').toLowerCase();
  const mime = String(file?.type || '').toLowerCase();
  const hasPdfExtension = name.endsWith('.pdf');
  const hasPdfMime = mime === 'application/pdf';

  if (!hasPdfExtension || !hasPdfMime) {
    throw new Error('Selecione um arquivo PDF v\u00e1lido.');
  }
}

function cleanNullableText(value: string | null | undefined): string | null {
  const parsed = String(value || '').trim();
  return parsed || null;
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
    relatedDiseaseSlugs: [],
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

async function buildUniqueSlug(baseSlug: string): Promise<string> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('slug')
    .ilike('slug', `${baseSlug}%`);

  if (error) {
    throw new Error(`Falha ao validar slug: ${parseError(error)}`);
  }

  const used = new Set((data || []).map((item) => String((item as { slug: string }).slug)));

  if (!used.has(baseSlug)) return baseSlug;

  let counter = 2;
  while (counter < 5000) {
    const candidate = `${baseSlug}-${counter}`;
    if (!used.has(candidate)) return candidate;
    counter += 1;
  }

  throw new Error('N\u00e3o foi poss\u00edvel gerar slug \u00fanico para este consenso.');
}

export class SupabaseConsensoRepository implements ConsensoRepository {
  async list(filters?: ListConsensusFilters): Promise<ConsensusRecord[]> {
    let query = supabase
      .from(TABLE)
      .select('*')
      .eq('is_published', true)
      .order('year', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false });

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

    const { data, error } = await query;
    if (error) {
      throw new Error(`Falha ao carregar consensos: ${parseError(error)}`);
    }

    return (data as ConsensusRow[]).map(mapRow);
  }

  async getBySlug(slug: string): Promise<ConsensusRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error) {
      throw new Error(`Falha ao carregar consenso: ${parseError(error)}`);
    }

    if (!data) return null;
    return mapRow(data as ConsensusRow);
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
      throw new Error(`Falha ao validar autentica\u00e7\u00e3o: ${parseError(authError)}`);
    }
    if (!authData.user) {
      throw new Error('Fa\u00e7a login para cadastrar um consenso.');
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

  async getSharedDetailsByConsensusId(consensusDocumentId: string): Promise<ConsensusDocumentDetails | null> {
    const { data, error } = await supabase
      .from(DETAILS_TABLE)
      .select('*')
      .eq('consensus_document_id', consensusDocumentId)
      .maybeSingle();

    if (error) {
      throw new Error(`Falha ao carregar detalhes do consenso: ${parseError(error)}`);
    }

    if (!data) return null;
    return mapDetailsRow(data as ConsensusDetailsRow);
  }

  async upsertSharedDetails(
    consensusDocumentId: string,
    input: UpsertConsensusDocumentDetailsInput
  ): Promise<ConsensusDocumentDetails> {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) {
      throw new Error(`Falha ao validar autentica\u00e7\u00e3o: ${parseError(authError)}`);
    }
    if (!authData.user) {
      throw new Error('Fa\u00e7a login para editar os detalhes compartilhados.');
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
