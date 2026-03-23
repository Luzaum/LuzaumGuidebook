export type Species = 'dog' | 'cat';
export type PhysiologicalState = 'neonate' | 'pediatric' | 'adult' | 'senior';
export type Comorbidity = 
  | 'cardiopath' 
  | 'renopath' 
  | 'hepatopath' 
  | 'endocrinopath'
  | 'hypertension'
  | 'shock'
  | 'sepsis'
  | 'hypovolemia'
  | 'respiratory_disease'
  | 'neurological_disease'
  | 'pregnancy_lactation'
  | 'urinary_obstruction';

export interface Patient {
  species: Species;
  weight: number; // in kg
  state: PhysiologicalState;
  comorbidities: Comorbidity[];
}

