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
  calculatorEnabled: boolean;
}

export interface MedicationPresentation {
  id: string;
  label: string;
  form: string;
  concentrationValue?: number;
  concentrationUnit?: string;
  scoringInfo?: string;
}

export interface MedicationRecord {
  id: string;
  slug: string;
  title: string;
  activeIngredient: string;
  tradeNames: string[];
  pharmacologicClass: string;
  species: ('Cão' | 'Gato')[];
  category: string;
  tags: string[];
  mechanismOfAction: string;
  indications: string[];
  contraindications: string[];
  cautions: string[];
  adverseEffects: string[];
  doses: MedicationDose[];
  presentations: MedicationPresentation[];
  adminNotesRichText: string;
  relatedDiseaseSlugs: string[];
  isDemonstrative?: boolean;
  warningLabel?: string;
}
