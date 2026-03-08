export interface ConsensusRecord {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  sourceOrganization: string;
  year: number;
  species: 'dog' | 'cat' | 'both';
  category: string;
  tags: string[];
  pdfUrl: string;
  pdfFileName: string;
  summary: string;
  articleSummaryRichText: string;
  adminNotesRichText: string;
  relatedDiseaseSlugs: string[];
  isDemonstrative?: boolean;
  warningLabel?: string;
}
