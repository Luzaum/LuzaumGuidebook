import {
  ConsensusDocumentDetails,
  ConsensusRecord,
  CreateConsensusInput,
  ListConsensusFilters,
  UpsertConsensusDocumentDetailsInput,
} from '../../../types/consenso';
import { ConsensusUpsertInput } from '../../../types/editorial';
import { ConsensoRepository } from '../../repositories/consenso.repository';

function mapSeedRecord(record: any): ConsensusRecord {
  return {
    id: String(record.id),
    slug: String(record.slug),
    title: String(record.title),
    description: record.summary ?? null,
    organization: record.sourceOrganization ?? null,
    year: typeof record.year === 'number' ? record.year : null,
    category: record.category ?? null,
    species: record.species === 'cat' || record.species === 'both' ? record.species : 'dog',
    filePath: record.storagePath ?? record.pdfFileName ?? record.slug,
    fileUrl: String(record.pdfUrl ?? ''),
    isPublished: true,
    createdAt: record.updatedAt ?? new Date(0).toISOString(),
    updatedAt: record.updatedAt ?? new Date(0).toISOString(),
    shortTitle: record.shortTitle,
    sourceOrganization: record.sourceOrganization,
    tags: Array.isArray(record.tags) ? record.tags : [],
    pdfUrl: record.pdfUrl,
    pdfFileName: record.pdfFileName,
    summary: record.summary,
    articleSummaryRichText: record.articleSummaryRichText,
    adminNotesRichText: record.adminNotesRichText,
    relatedDiseaseSlugs: Array.isArray(record.relatedDiseaseSlugs) ? record.relatedDiseaseSlugs : [],
    relatedMedicationSlugs: Array.isArray(record.relatedMedicationSlugs) ? record.relatedMedicationSlugs : [],
    isDemonstrative: record.isDemonstrative,
    warningLabel: record.warningLabel,
    source: 'seed',
    storagePath: record.storagePath,
  };
}

type ConsensoSeedState = {
  mappedSeed: ConsensusRecord[];
  seedDetailsByConsensusId: Map<string, ConsensusDocumentDetails>;
};

let consensoSeedPromise: Promise<ConsensoSeedState> | null = null;

function loadConsensoSeedState(): Promise<ConsensoSeedState> {
  if (!consensoSeedPromise) {
    consensoSeedPromise = import('../../../data/seed/consensos.seed').then((mod) => {
      const mappedSeed = mod.consensosSeed.map(mapSeedRecord);
      const seedDetailsByConsensusId = new Map<string, ConsensusDocumentDetails>();

      for (const item of mappedSeed) {
        const summaryText = String(item.summary || '').trim() || null;
        const appNotesText = String(item.adminNotesRichText || '').trim() || null;
        if (!summaryText && !appNotesText) continue;

        seedDetailsByConsensusId.set(item.id, {
          id: `seed-details-${item.id}`,
          consensusDocumentId: item.id,
          summaryText,
          keyPointsText: null,
          practicalApplicationText: null,
          appNotesText,
          references: [],
          createdBy: null,
          updatedBy: null,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        });
      }

      return { mappedSeed, seedDetailsByConsensusId };
    });
  }
  return consensoSeedPromise;
}

export class LocalConsensoRepository implements ConsensoRepository {
  async list(filters?: ListConsensusFilters, _options?: { includeDrafts?: boolean }): Promise<ConsensusRecord[]> {
    const { mappedSeed } = await loadConsensoSeedState();
    const base = [...mappedSeed];

    if (!filters) return base;

    const query = String(filters.query || '').trim().toLowerCase();
    const category = String(filters.category || '').trim().toLowerCase();
    const species = String(filters.species || '').trim().toLowerCase();

    return base.filter((item) => {
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        String(item.organization || '').toLowerCase().includes(query);

      const matchesCategory = !category || String(item.category || '').toLowerCase() === category;
      const matchesSpecies = !species || item.species === species;

      return matchesQuery && matchesCategory && matchesSpecies;
    });
  }

  async getBySlug(slug: string, _options?: { includeDrafts?: boolean }): Promise<ConsensusRecord | null> {
    const { mappedSeed } = await loadConsensoSeedState();
    const found = mappedSeed.find((item) => item.slug === slug);
    return found || null;
  }

  async search(query: string): Promise<ConsensusRecord[]> {
    return this.list({ query });
  }

  async listByCategory(categorySlug: string): Promise<ConsensusRecord[]> {
    return this.list({ category: categorySlug });
  }

  async create(_input: CreateConsensusInput): Promise<ConsensusRecord> {
    throw new Error('Cadastro de consenso requer fonte Supabase ativa.');
  }

  async upsert(_input: ConsensusUpsertInput): Promise<ConsensusRecord> {
    throw new Error('Edição editorial de consenso requer fonte Supabase ativa.');
  }

  async replacePdf(_consensusId: string, _file: File): Promise<ConsensusRecord> {
    throw new Error('Upload de PDF requer fonte Supabase ativa.');
  }

  async getSharedDetailsByConsensusId(consensusDocumentId: string): Promise<ConsensusDocumentDetails | null> {
    const { seedDetailsByConsensusId } = await loadConsensoSeedState();
    return seedDetailsByConsensusId.get(consensusDocumentId) || null;
  }

  async upsertSharedDetails(
    _consensusDocumentId: string,
    _input: UpsertConsensusDocumentDetailsInput
  ): Promise<ConsensusDocumentDetails> {
    throw new Error('Edi\u00e7\u00e3o de detalhes compartilhados requer fonte Supabase ativa.');
  }
}

export const localConsensoRepository = new LocalConsensoRepository();
export const consensoRepository = localConsensoRepository;
