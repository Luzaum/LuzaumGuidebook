import { Patient } from './patient';

export type DoseUnit = 'mcg/kg/min' | 'mcg/kg/h' | 'mg/kg/min' | 'mg/kg/h' | 'ng/kg/min' | 'U/kg/h' | 'U/kg/min' | 'mU/kg/min' | 'mU/kg/h' | 'mg/kg' | 'mL/kg' | 'mcg/kg' | 'U/kg' | 'mcg/m2' | 'mcg/m2/h';
export type Diluent = 'NaCl 0.9%' | 'Ringer Lactato' | 'Glicose 5%' | 'Glicose 2.5%' | 'Glicose 7.5%' | 'Glicose 5% + NaCl 0.9%' | 'Água para Injeção' | 'Nenhum';
export type DrugCategory = 
  | 'opioides' 
  | 'anestesicos_analgesicos' 
  | 'sedativos_tranquilizantes' 
  | 'vasopressores_inotropicos' 
  | 'anticonvulsivantes' 
  | 'antiarritmicos' 
  | 'diureticos' 
  | 'metabolicos_insulina' 
  | 'outros';

export type RegimeType = 'CRI' | 'bolus' | 'bolus_maintenance' | 'titratable' | 'patch' | 'epidural';
export type AccessType = 'peripheral' | 'central';
export type PumpType = 'syringe' | 'volumetric';

export interface DrugPresentation {
  id: string;
  description: string;
  concentration: number; 
  concentrationUnit: 'mg/mL' | 'mcg/mL' | 'ng/mL' | 'U/mL';
  volume?: number; // mL
  manufacturer?: string;
  custom?: boolean;
}

export interface DoseRange {
  min: number;
  max: number;
  unit: DoseUnit;
  observations?: string;
}

export interface SpeciesDose {
  dog?: DoseRange;
  cat?: DoseRange;
}

export interface DrugSafetyMetadata {
  preferredDiluent: Diluent;
  allowedDiluents: Diluent[];
  notRecommendedDiluents: Diluent[];
  centralAccessRequired: boolean;
  centralAccessPreferred: boolean;
  peripheralAllowed: boolean;
  syringePumpRequired: boolean;
  dedicatedLineRequired: boolean;
  photosensitive: boolean;
  stabilityAfterDilution: string;
  incompatibilities: string[];
  recommendedMonitoring: string[];
}

export interface DrugAlert {
  id: string;
  condition: (patient: Patient, dose: number, doseUnit: DoseUnit, diluent: Diluent, access: AccessType) => boolean;
  message: string;
  level: 'warning' | 'danger' | 'info';
}

export interface DrugDetailedInfo {
  mechanismOfAction: string;
  metabolism: string;
  excretion: string;
  onsetOfAction: string;
  durationOfAction: string;
  speciesDifferences: string;
  clinicalObservations?: string;
  administrationGuidelines?: string; // Como usar, orientações de administração
  maximumUsageTime?: string; // Tempo máximo de uso sugerido
  extraClinicalNotes?: string[]; // Quaisquer outras informações que eu mandar
}

export interface DrugDoseGuide {
  id: string;
  regimen: Exclude<RegimeType, 'bolus_maintenance'>;
  title: string;
  indication?: string;
  species?: ('dog' | 'cat')[];
  doseText: string;
  rationale?: string;
}

export interface DrugClinicalTip {
  id: string;
  title: string;
  recommendation: string;
  rationale?: string;
  tone?: 'info' | 'success' | 'warning' | 'danger';
 }

export interface Drug {
  id: string;
  namePt: string;
  nameEn: string;
  synonyms: string[];
  category: DrugCategory;
  pharmacologicalClass: string;
  clinicalSummary: string;
  indications: string[];
  contraindications: string[];
  supportedSpecies: ('dog' | 'cat')[];
  allowedRegimes: RegimeType[];
  highAlert?: boolean;
  physiology?: string;
  advantages?: string[];
  limitations?: string[];
  commonProblems?: string[];
  usageErrors?: string[];
  
  // Dosing
  doses: SpeciesDose;
  bolusDoses?: SpeciesDose;
  preferredUnit: DoseUnit;
  allowedUnits: DoseUnit[];
  
  presentations: DrugPresentation[];
  
  // Safety & Compatibility
  safetyMetadata: DrugSafetyMetadata;
  alerts: DrugAlert[];
  adverseEffects: string[];
  
  // Detailed DB Info
  detailedInfo: DrugDetailedInfo;
  references: string[];
  doseGuides?: DrugDoseGuide[];
  diluentGuidance?: DrugClinicalTip[];
  accessGuidance?: DrugClinicalTip[];
  infusionGuidance?: DrugClinicalTip[];
  clinicalPearls?: string[];
}
