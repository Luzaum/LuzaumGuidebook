export type VetSpecies = 'dog' | 'cat';

export type ConsultaVetSource = 'seed' | 'supabase';

export interface EditorialClinicalFinding {
  finding: string;
  mechanism: string;
  clinicalMeaning?: string;
  context?: string[];
  priority?: 'common' | 'heart-failure' | 'low-output' | 'arrhythmia' | 'systemic' | 'uncommon' | 'emergency';
}

export interface EditorialSystemGroup {
  system: string;
  findings: Array<string | EditorialClinicalFinding>;
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
  mechanism?: string;
  reassess?: string;
  cautions?: string;
  contraindications?: string;
  notes?: string;
}

/** Passo estruturado da ordem de prioridade terapêutica (doses, duração, evidência). */
export interface EditorialTreatmentPriorityStep {
  title: string;
  summary: string;
  options?: string;
  dose?: string;
  duration?: string;
  reassess?: string;
  evidence?: string;
}

export interface EditorialDiagnosticStep {
  stepNumber?: number;
  title: string;
  description: string;
  /** Campos opcionais para separar rapidamente finalidade, interpretação e limites do exame. */
  purpose?: string;
  interpretation?: string;
  limitations?: string;
  /** Marca o exame / critério como padrão ouro (exibe troféu na UI). */
  isGoldStandard?: boolean;
}

/** Tabela comparativa clínica (ex.: tipos de HAC) — renderizada com `<table>` acessível. */
export interface EditorialClinicalTable {
  kind: 'clinicalTable';
  /** Título opcional acima da tabela (ex.: "Mapa do acervo"). */
  caption?: string;
  headers: string[];
  /** Uma linha por tipo; número de células = número de colunas. */
  rows: string[][];
}

/** Figura editorial (ex.: pôster IRIS) — `src` relativo à pasta `public/` (ex.: `/assets/consulta-vet/iris.png`). */
export interface EditorialClinicalFigure {
  kind: 'clinicalFigure';
  src: string;
  alt: string;
  caption?: string;
  /** Ajuste editorial da visualizacao: diagramas/citologia podem precisar de mais area que fotos clínicas simples. */
  display?: 'compact' | 'default' | 'wide' | 'full';
}

export type EditorialSectionValue =
  | string
  | string[]
  | EditorialDrugProtocol[]
  | EditorialDiagnosticStep[]
  | Record<
      string,
      | string
      | string[]
      | EditorialSystemGroup[]
      | EditorialDrugProtocol[]
      | EditorialDiagnosticStep[]
      | EditorialClinicalTable
      | EditorialClinicalFigure
      | any
    >;

export type ContentFlag = {
  isDemonstrative?: boolean;
  warningLabel?: string;
  source?: ConsultaVetSource;
  /** Conteúdo VIN ainda não reconciliado — não citar VIN na UI. */
  vinReferencePending?: boolean;
};
