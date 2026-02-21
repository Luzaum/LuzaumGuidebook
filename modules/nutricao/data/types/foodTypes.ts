export type NutritionProfile =
  | 'COMPLETE'
  | 'VET_THERAPEUTIC_COMPLETE'
  | 'VET_RECOVERY_COMPLETE'
  | 'SUPPORT_ENTERAL'
  | 'SUPPLEMENT'
  | 'HUMAN_ENTERAL';

export type FoodUnit = 'g' | 'ml';

export interface FoodItem {
  name: string;
  species: Array<'dog' | 'cat'>;
  calories: number; // kcal por unit (g ou ml)
  unit: FoodUnit;
  protein: string | null;
  fat: string | null;
  indication: string;

  lifeStage: 'PUPPY' | 'ADULT' | 'SENIOR' | 'ALL';
  neuterStatus: 'NEUTERED' | 'INTACT' | 'ANY';
  isTherapeutic: boolean;
  therapeuticIndications?: Array<'CKD' | 'WEIGHT_LOSS' | 'GI' | 'URINARY' | 'ALLERGY' | 'HEPATIC' | 'JOINT'>;

  nutritionProfile: NutritionProfile;
  isCompleteAndBalanced: boolean;
  requiresVetSupervision: boolean;
  speciesSafetyNotes?: { dog?: string[]; cat?: string[] };
  
  // Campos opcionais existentes
  alerts?: Array<{
    type: 'green' | 'red' | 'yellow';
    text: string;
  }>;
  dilution?: {
    scoop_g: number;
    water_ml: number;
  };
  updatedAtISO?: string;
}

export interface CaloriesInfo {
  kcalPerUnit: number;
  unit: FoodUnit;
}
