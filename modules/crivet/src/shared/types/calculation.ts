import { Patient } from './patient';
import { Drug, DrugPresentation, DoseUnit, Diluent, RegimeType, AccessType, PumpType } from './drug';

export interface CalculationInput {
  patient: Patient;
  drug: Drug;
  regime: RegimeType;
  dose: number;
  doseUnit: DoseUnit;
  presentation: DrugPresentation;
  diluent: Diluent;
  totalVolume: number; // mL (volume final da solução)
  infusionRate: number; // mL/h (taxa da bomba)
  accessType: AccessType;
  pumpType: PumpType;
  usePreDilution?: boolean; // Define se calcula com solução de trabalho 1:10
}

export type AlertSeverity = 'info' | 'warning' | 'critical' | 'block';

export interface CalculationAlert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  recommendation?: string;
}

export interface CalculationStep {
  step: number;
  // Legacy description
  description?: string; 
  
  // New Didactic Fields
  title?: string;
  explanation?: string;
  formula: string;
  substitution?: string;
  result: string;
  unit?: string;
  note?: string;
}

export interface CalculationResult {
  // Legacy & Raw math outputs
  drugVolume: number; // mL
  diluentVolume: number; // mL
  finalConcentration: number; 
  finalConcentrationUnit: string;
  totalDrugAmount: number; 
  totalDrugAmountUnit: string;
  infusionRate: number; // mL/h
  deliveredDose: number;
  deliveredDoseUnit: string;
  instructions: string;
  isImpossible: boolean;
  impossibleReason?: string;
  
  // New Audit & Safety Fields
  regimeType?: RegimeType | 'bolus_maintenance' | string;
  reverseCheckPassed?: boolean;
  
  // New Didactic & UI Fields
  steps: CalculationStep[];
  reverseCheckSteps?: CalculationStep[];
  practicalSummary?: string[];
  alerts?: CalculationAlert[];
  clinicalPearls?: string[];
  nonApplicableFields?: string[];
}

