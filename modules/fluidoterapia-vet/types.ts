export type Species = 'canine' | 'feline';

export type PhysiologicState = 
  | 'adult'
  | 'puppy'
  | 'neonate'
  | 'senior'
  | 'pregnant'
  | 'lactating'
  | 'obese';

export type Comorbidity = 
  | 'cardiopatia'
  | 'doenca_renal'
  | 'tce'
  | 'hipoalbuminemia'
  | 'anemia'
  | 'sepse'
  | 'anestesia';

export type MaintenanceMethod = 
  | 'manual'
  | 'preset_dog'
  | 'preset_cat'
  | 'allometric'
  | 'linear'
  | 'anesthesia';

export type AnimalSize = 'mini' | 'small' | 'medium' | 'large' | 'giant';

export interface PatientProfile {
  species: Species;
  weightKg: number;
  idealWeightKg?: number;
  isObese: boolean;
  ageGroup: PhysiologicState;
  comorbidities: Comorbidity[];
}

export interface MaintenanceConfig {
  method: MaintenanceMethod;
  manualMlPerKgDay: number;
  anesthesiaMlPerKgHour: number;
}

export interface RehydrationConfig {
  enabled: boolean;
  dehydrationPercent: number; // 5 to 15
  correctionHours: number; // 6, 8, 10, 12, 16, 24, 48, custom
  customCorrectionHours?: number;
}

export type OngoingLossEventType = 'vomit' | 'diarrhea' | 'polyuria' | 'drain' | 'third_space' | 'other';

export interface OngoingLossEvent {
  id: string;
  type: OngoingLossEventType;
  animalSize: AnimalSize;
  volumeSize?: 'small' | 'medium' | 'large';
  episodeVolumeMl?: number;
  episodes?: number;
  manualMl24h?: number;
  observation?: string;
}

export interface OngoingLossesConfig {
  enabled: boolean;
  type: 'direct' | 'events';
  directMl24h: number;
  events: OngoingLossEvent[];
}

export interface ResuscitationConfig {
  enabled: boolean;
  mode: 'preset' | 'custom';
  presetId?: string;
  aliquotMlKg: number;
  administrationMinutes: number;
}

export interface FluidSelection {
  type: string;
  route: 'IV' | 'IO' | 'SC' | 'VO';
  deliveryMode: 'auto' | 'macro' | 'micro';
  presentationSize: number;
}

export interface CalculatorState {
  patient: PatientProfile;
  maintenance: MaintenanceConfig;
  rehydration: RehydrationConfig;
  ongoingLosses: OngoingLossesConfig;
  resuscitation: ResuscitationConfig;
  fluidSelection: FluidSelection;
}

export interface ClinicalAlert {
  level: 'INFO' | 'WARNING' | 'HIGH_RISK' | 'CRITICAL';
  title: string;
  explanation: string;
  whyItMatters: string;
  whatToMonitor: string;
  recommendation: string;
  source?: string;
  action?: {
    label: string;
    apply: (state: CalculatorState) => Partial<CalculatorState>;
  };
}
