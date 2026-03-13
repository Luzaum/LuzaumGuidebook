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

export type EditorialSectionValue =
  | string
  | string[]
  | Record<string, string | string[] | EditorialSystemGroup[]>;

export type ContentFlag = {
  isDemonstrative?: boolean;
  warningLabel?: string;
  source?: ConsultaVetSource;
};
