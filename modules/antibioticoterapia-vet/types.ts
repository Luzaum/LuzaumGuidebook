
export type Species = 'Cão' | 'Gato';

export type LifeStageKey = 'filhote' | 'adulto' | 'gestante' | 'lactante' | 'idoso';

export interface LifeStage {
  label: string;
  warn?: string;
  warn_why?: string;
}

export interface Antibiotic {
  name: string;
  spectrum: string;
  dose_dog: string;
  dose_cat: string;
  indications: string;
  cautions: string;
  // NEW detailed fields
  mechanism?: string;
  prep_admin?: string;
  infusion?: string;
  infusion_why?: string;
  duration?: string;
  contraindications?: string;
  adverse_effects?: string;
}

export interface AntibioticClass {
  [className: string]: Antibiotic[];
}

/** Fármaco citado com a justificativa naquela condição. */
export interface DiseaseTreatmentDrug {
  name: string
  rationale: string
  /** Dose resumida quando não há ficha legada correspondente em `AB_SEED`. */
  doseHintDog?: string
  doseHintCat?: string
}

/**
 * - `combinacao_simultanea`: os fármacos listados são usados em associação (mesmo período / conjunto).
 * - `opcoes_exclusivas`: cada fármaco (ou subconjunto futuro) representa uma alternativa — escolher um esquema.
 */
export type TreatmentRegimeMode = 'combinacao_simultanea' | 'opcoes_exclusivas'

export interface TreatmentRegime {
  label?: string
  mode: TreatmentRegimeMode
  drugs: DiseaseTreatmentDrug[]
}

/** Bloco: 1ª linha, 2ª linha, 3ª linha… */
export interface TreatmentLineBlock {
  title: string
  /** Como ler: associação vs opções, simultâneo vs sequencial, etc. */
  presentation: string
  regimes: TreatmentRegime[]
}

/** Conteúdo visual para o modal de fisiopatologia (tabelas, fluxos, destaques). */
export interface PathophysiologyTable {
  caption?: string
  columns: string[]
  rows: string[][]
}

export interface PathophysiologyFlowStep {
  title: string
  subtitle?: string
}

export interface PathophysiologySection {
  id: string
  title: string
  lead?: string
  paragraphs?: string[]
  bullets?: string[]
  highlightTerms?: { term: string; description: string }[]
  table?: PathophysiologyTable
  flow?: {
    title?: string
    steps: PathophysiologyFlowStep[]
  }
  callout?: {
    kind: 'info' | 'clinical'
    title?: string
    text: string
  }
}

export interface PathophysiologyVisual {
  intro?: string
  /** @deprecated opcional — preferir texto corrido nas seções */
  keyConcepts?: { label: string; short: string }[]
  sections: PathophysiologySection[]
}

export interface Disease {
  name: string
  pathogens: string
  firstLine: TreatmentLineBlock
  secondLine?: TreatmentLineBlock
  thirdLine?: TreatmentLineBlock
  duration: string
  notes: string
  /** Fisiopatologia e quadro clínico completos (modal); conteúdo clássico/consensos, sem resumo forçado. */
  pathophysiologyFull?: string
  /** Versão rica (tabelas, fluxogramas) para o mesmo modal; quando ausente, usa só pathophysiologyFull. */
  pathophysiologyVisual?: PathophysiologyVisual
}

export interface DiseaseSystem {
  [systemName: string]: Disease[];
}

export interface PkPdInfo {
  pd: string;
  hydro: string;
  elim: string;
  moa: string;
}

export interface ClassStyle {
  emoji: string;
  bg: string;
  border: string;
}

export interface DiseaseExplanation {
  physio: string;
  why: string;
  signs: string;
  adjuncts: string;
}

/** Alvo de navegação a partir da busca unificada (abas institucionais v2). */
export type AbvInstitutionalFocus =
  | { kind: 'pathogen'; id: string }
  | { kind: 'resistance'; id: string }
  | { kind: 'reference'; key: string }

/** Navegação principal do módulo (shell interno; sem router). */
export type AbvTab =
  | 'home'
  | 'syndrome'
  | 'diseases'
  | 'antibiotics'
  | 'pathogens'
  | 'perioperative'
  | 'patient-context'
  | 'references'

/** Alias legado para compatibilidade com imports existentes */
export type Page = AbvTab

export interface ComorbidityState {
  renal: boolean;
  hepatic: boolean;
  septic: boolean;
  cardiac: boolean;
  /** Piloto v2 / engine: base neurológica para alertas (ex.: FQ em gato). */
  neurological: boolean;
}
