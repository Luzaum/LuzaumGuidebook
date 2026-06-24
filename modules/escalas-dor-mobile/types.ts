export type Species = 'dog' | 'cat';
export type PainType = 'acute' | 'chronic';
export type QuestionType = 'radio' | 'slider' | 'grimace' | 'text';
export type Severity = 'none' | 'mild' | 'moderate' | 'severe' | 'extreme';

export interface Option {
  score: number;
  text: string;
  imageDescription?: string; // For placeholder images
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: Option[];
  min?: number;
  max?: number;
  step?: number;
  labelMin?: string;
  labelMax?: string;
  category?: string;
  imageDescription?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  questions: Question[];
  hasImage?: boolean;
  imageDescription?: string;
}

export interface SubScore {
  name: string;
  score: number;
  maxScore: number;
  threshold?: number;
  needsRescue?: boolean;
}

export interface InterpretationResult {
  totalScore: number;
  maxScore: number;
  displayScore: string;
  needsRescue: boolean;
  severity: Severity;
  recommendation: string;
  subscores?: SubScore[];
}

export interface Scale {
  id: string;
  name: string;
  fullName: string;
  species: Species;
  painType: PainType;
  recommended?: boolean;
  description: string;
  developer: string;
  maxScore: number;
  rescueThreshold: number;
  rescueLabel: string;
  categories: Category[];
  interpretation: (answers: Record<string, number | string>) => InterpretationResult;
  assessmentProtocol: string[];
  references: string[];
}

export interface PainGuideSection {
  id: string;
  title: string;
  icon: string;
  content: PainGuideContent[];
}

export interface PainGuideContent {
  type: 'text' | 'list' | 'table' | 'alert';
  title?: string;
  body?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  alertType?: 'info' | 'warning' | 'danger';
}

export interface Reference {
  id: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  topic: string;
  category: 'dog' | 'cat' | 'general';
}
