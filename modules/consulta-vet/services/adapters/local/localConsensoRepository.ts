import {
  ConsensusDocumentDetails,
  ConsensusRecord,
  CreateConsensusInput,
  ListConsensusFilters,
  UpsertConsensusDocumentDetailsInput,
} from '../../../types/consenso';
import { ConsensusUpsertInput } from '../../../types/editorial';
import { getConsensusDocumentOverride } from '../../../utils/consensusDocumentOverrides';
import { ConsensoRepository } from '../../repositories/consenso.repository';

function mapSeedRecord(record: any): ConsensusRecord {
  const documentOverride = getConsensusDocumentOverride(String(record.slug));

  return {
    id: String(record.id),
    slug: String(record.slug),
    title: String(record.title),
    description: documentOverride?.description ?? record.summary ?? null,
    organization: record.sourceOrganization ?? null,
    year:
      documentOverride?.year ?? (typeof record.year === 'number' ? record.year : null),
    category: record.category ?? null,
    species: record.species === 'cat' || record.species === 'both' ? record.species : 'dog',
    filePath:
      documentOverride?.filePath ?? record.storagePath ?? record.pdfFileName ?? record.slug,
    fileUrl: documentOverride?.fileUrl ?? String(record.pdfUrl ?? ''),
    isPublished: true,
    createdAt: record.updatedAt ?? new Date(0).toISOString(),
    updatedAt: record.updatedAt ?? new Date(0).toISOString(),
    shortTitle: record.shortTitle,
    sourceOrganization: record.sourceOrganization,
    tags: Array.isArray(record.tags) ? record.tags : [],
    pdfUrl: documentOverride?.fileUrl ?? record.pdfUrl,
    pdfFileName: documentOverride?.fileName ?? record.pdfFileName,
    summary: record.summary,
    articleSummaryRichText: record.articleSummaryRichText,
    adminNotesRichText: record.adminNotesRichText,
    relatedDiseaseSlugs: Array.isArray(record.relatedDiseaseSlugs) ? record.relatedDiseaseSlugs : [],
    relatedMedicationSlugs: Array.isArray(record.relatedMedicationSlugs) ? record.relatedMedicationSlugs : [],
    isDemonstrative: record.isDemonstrative,
    warningLabel: record.warningLabel,
    source: 'seed',
    storagePath: documentOverride?.filePath ?? record.storagePath,
    keyPointsText: record.keyPointsText ?? null,
    practicalApplicationText: record.practicalApplicationText ?? null,
    appNotesText: record.appNotesText ?? null,
    references: Array.isArray(record.references) ? record.references : [],
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
        const appNotesText = String(item.appNotesText || item.adminNotesRichText || '').trim() || null;
        const keyPointsText = String(item.keyPointsText || '').trim() || null;
        const practicalApplicationText = String(item.practicalApplicationText || '').trim() || null;
        const references = Array.isArray(item.references) ? item.references : [];

        if (!summaryText && !appNotesText && !keyPointsText && !practicalApplicationText) continue;

        seedDetailsByConsensusId.set(item.id, {
          id: `seed-details-${item.id}`,
          consensusDocumentId: item.id,
          summaryText,
          keyPointsText,
          practicalApplicationText,
          appNotesText,
          references,
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
    throw new Error('O cadastro de consensos está indisponível no momento.');
  }

  async upsert(_input: ConsensusUpsertInput): Promise<ConsensusRecord> {
    throw new Error('A edição de consensos está indisponível no momento.');
  }

  async replacePdf(_consensusId: string, _file: File): Promise<ConsensusRecord> {
    throw new Error('O envio de PDF está indisponível no momento.');
  }

  async getSharedDetailsByConsensusId(consensusDocumentId: string): Promise<ConsensusDocumentDetails | null> {
    const { seedDetailsByConsensusId } = await loadConsensoSeedState();
    return seedDetailsByConsensusId.get(consensusDocumentId) || null;
  }

  async upsertSharedDetails(
    _consensusDocumentId: string,
    _input: UpsertConsensusDocumentDetailsInput
  ): Promise<ConsensusDocumentDetails> {
    throw new Error('A edição dos detalhes está indisponível no momento.');
  }
}

export const localConsensoRepository = new LocalConsensoRepository();
export const consensoRepository = localConsensoRepository;
