export type VetSpecies = 'dog' | 'cat';

export type ConsultaVetSource = 'seed' | 'supabase';

export interface EditorialSystemGroup {
  system: string;
  findings: string[];
}

export interface EditorialReference {
  id?: string;
  citationText: string;
  sourceType?: string | null;
  url?: string | null;
  notes?: string | null;
  /** Ex.: A, B, meta-análise, consenso — livre para o editorial. */
  evidenceLevel?: string | null;
}

export interface EditorialDrugProtocol {
  drug: string;
  indication?: string;
  dose?: string;
  frequency?: string;
  duration?: string;
  route?: string;
  cautions?: string;
  contraindications?: string;
  notes?: string;
}

export interface EditorialDiagnosticStep {
  stepNumber?: number;
  title: string;
  description: string;
  /** Marca o exame / critério como padrão ouro (exibe troféu na UI). */
  isGoldStandard?: boolean;
}

/** Tabela comparativa clínica (ex.: tipos de HAC) — renderizada com `<table>` acessível. */
export interface EditorialClinicalTable {
  kind: 'clinicalTable';
  headers: string[];
  /** Uma linha por tipo; número de células = número de colunas. */
  rows: string[][];
}

export type EditorialSectionValue =
  | string
  | string[]
  | EditorialDrugProtocol[]
  | EditorialDiagnosticStep[]
  | Record<string, string | string[] | EditorialSystemGroup[] | EditorialDrugProtocol[] | EditorialDiagnosticStep[] | EditorialClinicalTable | any>;

export type ContentFlag = {
  isDemonstrative?: boolean;
  warningLabel?: string;
  source?: ConsultaVetSource;
};
