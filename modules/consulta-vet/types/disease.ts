import { ContentFlag, EditorialReference, EditorialSectionValue, VetSpecies } from './common';

export interface DiseaseQuickSummaryFlow {
  title: string;
  steps: { label: string; detail?: string }[];
}

/** Conteúdo estruturado do “Resumo rápido” (fluxos, grifos, faixas). Opcional por doença. */
export interface DiseaseQuickSummaryRich {
  /** Texto-base; `highlights` são substrings destacadas com efeito marca-texto. */
  lead: string;
  leadHighlights?: string[];
  /** Blocos lado a lado (ex.: definição / população / conduta imediata). */
  pillars?: { title: string; body: string; highlights?: string[] }[];
  diagnosticFlow?: DiseaseQuickSummaryFlow;
  treatmentFlow?: DiseaseQuickSummaryFlow;
}

export interface DiseaseRecord extends ContentFlag {
  id: string;
  slug: string;
  title: string;
  synonyms: string[];
  species: VetSpecies[];
  category: string;
  tags: string[];
  quickSummary: string;
  /** Versão rica do resumo (fluxogramas, grifos, faixas de dose). Se ausente, usa só `quickSummary`. */
  quickSummaryRich?: DiseaseQuickSummaryRich;
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
