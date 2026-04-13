import { ContentFlag, EditorialReference, EditorialSectionValue, VetSpecies } from './common';

export interface DiseaseRecord extends ContentFlag {
  id: string;
  slug: string;
  title: string;
  synonyms: string[];
  species: VetSpecies[];
  category: string;
  tags: string[];
  quickSummary: string;
  /** Até 5 frases curtas — faixa horizontal de decisão rápida na ficha. */
  quickDecisionStrip: string[];
  etiology: EditorialSectionValue;
  epidemiology: EditorialSectionValue;
  pathogenesisTransmission: EditorialSectionValue;
  pathophysiology: EditorialSectionValue;
  /** Sinais clínicos correlacionados à fisiopatologia (e exame físico, se aplicável). */
  clinicalSignsPathophysiology: EditorialSectionValue;
  /** Diagnóstico: ordem de exames; use passos com `isGoldStandard` para padrão ouro. */
  diagnosis: EditorialSectionValue;
  treatment: EditorialSectionValue;
  prevention: EditorialSectionValue;
  relatedConsensusSlugs: string[];
  relatedMedicationSlugs: string[];
  references?: EditorialReference[];
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
