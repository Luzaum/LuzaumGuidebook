import { ContentFlag, EditorialReference, VetSpecies } from './common';

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
  calculatorEnabled: boolean;
}

export interface MedicationPresentation {
  id: string;
  label: string;
  form: string;
  concentrationValue?: number;
  concentrationUnit?: string;
  packInfo?: string;
  route?: string;
  scoringInfo?: string;
}

export interface MedicationRecord extends ContentFlag {
  id: string;
  slug: string;
  title: string;
  activeIngredient: string;
  tradeNames: string[];
  pharmacologicClass: string;
  species: VetSpecies[];
  category: string;
  tags: string[];
  mechanismOfAction: string;
  indications: string[];
  contraindications: string[];
  cautions: string[];
  adverseEffects: string[];
  interactions?: string[];
  routes?: string[];
  doses: MedicationDose[];
  presentations: MedicationPresentation[];
  clinicalNotesRichText: string;
  adminNotesText?: string;
  relatedDiseaseSlugs: string[];
  references?: EditorialReference[];
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
