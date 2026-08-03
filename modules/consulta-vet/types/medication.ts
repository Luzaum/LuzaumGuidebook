import { ContentFlag, EditorialClinicalTable, EditorialReference, VetSpecies } from './common';

/** Destaque contextual na ficha de medicamento (além de tabelas). */
export type MedicationCalloutVariant = 'info' | 'caution' | 'brazil';

export interface MedicationClinicalCallout {
  kind: 'clinicalCallout';
  variant: MedicationCalloutVariant;
  title: string;
  body: string;
}

/** Tabelas editoriais + callouts — ordem preservada no array. */
export type MedicationStructuredBlock = EditorialClinicalTable | MedicationClinicalCallout;

/** Origem / canal de obtenção da apresentação (para cálculo e orientação ao usuário). */
export type MedicationSupplyChannel = 'human_pharmacy' | 'veterinary' | 'compounded';

export interface MedicationDose {
  id: string;
  species: 'dog' | 'cat' | 'both';
  indication: string;
  doseMin: number;
  doseMax?: number;
  doseUnit: string;
  perWeightUnit: string;
  route: string;
  frequency: string;
  duration?: string;
  notes?: string;
  /** Doenças às quais este regime se aplica. Mantém a dose ligada ao contexto clínico. */
  diseaseSlugs?: string[];
  /** Fase ou gravidade em que o regime se aplica (agudo, manutenção, estágio etc.). */
  clinicalContext?: string;
  /** O que deve ser acompanhado durante o uso deste regime. */
  monitoring?: string;
  /** Limite absoluto, quando a literatura definir um teto independente do peso. */
  maximumDose?: string;
  /** IDs das referências que sustentam especificamente este regime. */
  referenceIds?: string[];
  /** Classificação editorial livre: consenso, ensaio clínico, bula, extrapolação etc. */
  evidenceLevel?: string;
  calculatorEnabled: boolean;
  /** Se definido, a calculadora sugere esta apresentação para esta indicação. */
  presentationId?: string;
  /** Se a apresentação tiver concentrationOptions, sugere a concentração inicial. */
  presentationConcentrationId?: string;
}

export interface MedicationPresentation {
  id: string;
  label: string;
  form: string;
  concentrationValue?: number;
  concentrationUnit?: string;
  concentrationOptions?: Array<{
    id: string;
    label: string;
    concentrationValue: number;
    concentrationUnit: string;
  }>;
  packInfo?: string;
  route?: string;
  scoringInfo?: string;
  channel?: MedicationSupplyChannel;
  /** Produto da seção Comerciais que representa esta apresentação. */
  commercialProductSlug?: string;
}

export interface MedicationPriceReference {
  amountBrl: number;
  label: string;
  presentation: string;
  sourceName: string;
  sourceUrl: string;
  checkedAt: string;
  notes?: string | null;
}

export interface MedicationRecord extends ContentFlag {
  id: string;
  slug: string;
  title: string;
  activeIngredient: string;
  tradeNames: string[];
  officialSiteUrl?: string | null;
  leafletUrl?: string | null;
  imageUrl?: string | null;
  priceReference?: MedicationPriceReference | null;
  pharmacologicClass: string;
  species: VetSpecies[];
  category: string;
  tags: string[];
  mechanismOfAction: string;
  /** Explicação curta e acessível, mostrada antes do mecanismo técnico. */
  plainLanguageSummary?: string;
  indications: string[];
  contraindications: string[];
  cautions: string[];
  adverseEffects: string[];
  interactions?: string[];
  routes?: string[];
  doses: MedicationDose[];
  presentations: MedicationPresentation[];
  clinicalNotesRichText: string;
  /** Blocos estruturados (tabelas, destaques) renderizados antes do HTML de observações clínicas. */
  clinicalStructuredBlocks?: MedicationStructuredBlock[];
  adminNotesText?: string;
  relatedDiseaseSlugs: string[];
  references?: EditorialReference[];
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
