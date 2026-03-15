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
}

export type EditorialSectionValue =
  | string
  | string[]
  | EditorialDrugProtocol[]
  | EditorialDiagnosticStep[]
  | Record<string, string | string[] | EditorialSystemGroup[] | EditorialDrugProtocol[] | EditorialDiagnosticStep[] | any>;

export type ContentFlag = {
  isDemonstrative?: boolean;
  warningLabel?: string;
  source?: ConsultaVetSource;
};
