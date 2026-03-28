export type Species = 'dog' | 'cat';
export type Sex = 'male' | 'female';
export type BCS = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface Patient {
  id: string;
  name: string;
  ownerName: string;
  species: Species;
  sex: Sex;
  ageMonths: number;
  isNeutered: boolean;
  breed?: string;
  currentWeight: number; // in kg
  bcs: BCS;
  isHospitalized: boolean;
  clinicalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PhysiologicState {
  id: string;
  label: string;
  species: Species;
  category: string;
  minFactor: number;
  maxFactor: number;
  defaultFactor: number;
  explanation: string;
  source: string;
  clinicalObservation: string;
}

export interface EnergyCalculation {
  id: string;
  patientId: string;
  date: string;
  weightUsed: number;
  isIdealWeight: boolean;
  stateId: string;
  rer: number;
  merFactor: number;
  mer: number;
  notes?: string;
}

export type TargetGoal = 'maintenance' | 'weight_loss' | 'weight_gain';

export interface WeightTargetPlan {
  id: string;
  patientId: string;
  date: string;
  goal: TargetGoal;
  currentWeight: number;
  targetWeight: number;
  isCustomClinicalRule: boolean;
  isManualTarget: boolean;
  weightToUseForEnergy: 'current' | 'target';
  targetEnergy: number; // kcal/day
}

export interface CommercialFood {
  id: string;
  manufacturer: string;
  brand: string;
  name: string;
  species: Species;
  lifeStage: string;
  isWet: boolean;
  isComplete: boolean;
  kcalPerKg: number;
  kcalPer100g: number;
  kcalPerPortion?: number; // cup, can, pouch
  portionName?: string;
  moisture: number;
  crudeProtein: number;
  crudeFat: number;
  crudeFiber: number;
  ash: number;
  carbohydrates?: number;
  calcium?: number;
  phosphorus?: number;
  sodium?: number;
  potassium?: number;
  magnesium?: number;
  taurine?: number;
  // ... other nutrients
}

export interface NaturalFoodIngredient {
  id: string;
  name: string;
  category: string;
  kcalPer100g: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
  moisture: number;
  ash: number;
}

export type DietType = 'commercial' | 'natural' | 'hybrid';

export interface DietPlan {
  id: string;
  patientId: string;
  date: string;
  dietType: DietType;
  commercialFoodId?: string;
  naturalIngredients?: { ingredientId: string; grams: number }[];
  commercialPercent?: number;
  naturalPercent?: number;
  targetEnergy: number;
  gramsPerDay: number;
  mealsPerDay: number;
  gramsPerMeal: number;
}

export interface DietNutrientBreakdown {
  proteinPercent: number;
  fatPercent: number;
  carbPercent: number;
  totalKcal: number;
  proteinGrams: number;
  fatGrams: number;
  carbGrams: number;
  fiberGrams: number;
  moistureGrams: number;
  ashGrams: number;
  calciumMg?: number;
  phosphorusMg?: number;
  sodiumMg?: number;
  potassiumMg?: number;
  magnesiumMg?: number;
  taurineMg?: number;
}

export interface HospitalNutritionPlan {
  id: string;
  patientId: string;
  date: string;
  isAnorexic: boolean;
  daysAnorexic: number;
  isHyporexic: boolean;
  daysHyporexic: number;
  recentIntakePercent: number;
  hasVomiting: boolean;
  hasDiarrhea: boolean;
  feedingRoute: 'oral' | 'tube' | 'parenteral' | 'undefined';
  electrolytes: {
    phosphorus?: number;
    potassium?: number;
    magnesium?: number;
    calcium?: number;
    glucose?: number;
  };
  refeedingRiskLevel: 'low' | 'moderate' | 'high';
  progressionProtocol: '3_days' | '4_days';
  progressionPlan: RefeedingPlan[];
  clinicalNotes?: string;
}

export interface RefeedingPlan {
  day: number;
  percentRER: number;
  kcalTarget: number;
}

export interface Report {
  id: string;
  patientId: string;
  date: string;
  patient: Patient;
  energy: EnergyCalculation;
  target: WeightTargetPlan;
  diet: DietPlan;
  hospital?: HospitalNutritionPlan;
}

