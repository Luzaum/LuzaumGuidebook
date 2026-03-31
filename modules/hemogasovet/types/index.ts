export type Species = 'canine' | 'feline';
export type SampleType = 'arterial' | 'venous';
export type DomainStatus = 'ok' | 'limited' | 'inconclusive' | 'blocked';

export interface BloodGasInput {
  species: Species;
  sampleType: SampleType;
  temperature?: number;
  fio2?: number;
  barometricPressure?: number;
  altitude?: number;
  clinicalNotes?: string;

  // Clinical Context (Optional)
  clinicalContext?: {
    vomiting?: boolean;
    diarrhea?: boolean;
    dyspnea?: boolean;
    urethralObstruction?: boolean;
    suspectedDKA?: boolean;
    shock?: boolean;
    oxygenTherapy?: boolean;
    mechanicalVentilation?: boolean;
  };

  // Parameters
  pH?: number;
  pCO2?: number;
  pO2?: number;
  HCO3?: number;
  tCO2?: number;
  sO2?: number;
  BE?: number;
  Na?: number;
  K?: number;
  Cl?: number;
  albumin?: number;
  lactate?: number;
  glucose?: number;
  iCa?: number;
  tCa?: number;
  hematocrit?: number;
  hemoglobin?: number;
  AG?: number;
  H?: number;
  cHCO3?: number;
}

export interface ParsedField {
  key: keyof BloodGasInput;
  value: any;
  confidence: 'high' | 'medium' | 'low';
  originalText: string;
  normalizedDisplay?: string;
}

export interface ParsedBloodGasInput extends BloodGasInput {
  recognizedFields?: ParsedField[];
  unrecognizedText?: string[];
  suspectFields?: string[];
  missingCrucialParams?: string[];
  parserNotes?: string[];
}

export type AcidBasePrimaryDisorder = 
  | 'normal'
  | 'metabolic_acidosis'
  | 'metabolic_alkalosis'
  | 'respiratory_acidosis'
  | 'respiratory_alkalosis'
  | 'mixed'
  | 'unknown';

export type CompensationStatus = 
  | 'compensated'
  | 'partially_compensated'
  | 'uncompensated'
  | 'inadequately_compensated'
  | 'mixed_suspected'
  | 'not_applicable';

export interface DataQualityAssessment {
  status: 'reliable' | 'caution' | 'probable_error';
  domainStatus: DomainStatus;
  messages: string[];
  suspectFields: string[];
  canAssessAcidBase: boolean;
  canAssessOxygenation: boolean;
  missingForComplete: string[];
  limitations: string[];
  consistencyChecks: ConsistencyCheck[];
  temperatureImpact: string[];
  fio2Normalization?: {
    originalValue: number;
    normalizedFraction: number;
    displayPercent: number;
    source: 'fraction' | 'percentage' | 'assumed';
  };
}

export interface DeepAcidBaseInterpretation {
  domainStatus: DomainStatus;
  phStatus: 'acidemia' | 'alkalemia' | 'normal' | 'unknown';
  primaryDisorder: AcidBasePrimaryDisorder;
  primaryLogic: string;
  expectedCompensation?: string;
  observedCompensation?: string;
  compensationStatus: CompensationStatus;
  physiologicalExplanation: string;
  commonCauses: string[];
  summary: string;
  mixedDisorderReason?: string;
}

export interface DeepOxygenationAssessment {
  domainStatus: DomainStatus;
  status: 'normal' | 'hypoxemia' | 'hyperoxemia' | 'cannot_assess';
  severity?: 'mild' | 'moderate' | 'severe';
  paO2Interpretation?: string;
  saO2Interpretation?: string;
  fio2Context?: string;
  pfRatio?: number;
  aaGradient?: number;
  suspectedMechanism?: string;
  physiologicalExplanation: string;
  ventilationConcordance?: string;
  limitationNote?: string;
  summary: string;
}

export interface DeepElectrolyteAssessment {
  parameter: string;
  status: 'low' | 'normal' | 'high';
  value: number;
  clinicalExplanation: string;
  acidBaseRelation: string;
  physiologicalImpact: string;
  mainRisk: string;
  monitoring: string;
}

export interface ClinicalAlert {
  level: 'info' | 'warning' | 'critical';
  message: string;
}

export interface ConsistencyCheck {
  level: 'info' | 'warning' | 'critical';
  message: string;
  suggestion: string;
  fields?: string[];
}

export interface TemperatureContext {
  domainStatus: DomainStatus;
  status: 'normal' | 'hypothermia' | 'hyperthermia' | 'unknown';
  summary: string;
  effectOnInterpretation: string[];
}

export interface DomainStatuses {
  quality: DomainStatus;
  acidBase: DomainStatus;
  oxygenation: DomainStatus;
  electrolytes: DomainStatus;
  hypotheses: DomainStatus;
  actionPlan: DomainStatus;
}

export interface InterpretationResult {
  id: string;
  timestamp: string;
  input: BloodGasInput;
  
  domainStatuses: DomainStatuses;
  dataQuality: DataQualityAssessment;
  executiveSummary: string[];
  
  deepAcidBase: DeepAcidBaseInterpretation;
  deepOxygenation: DeepOxygenationAssessment;
  deepElectrolytes: DeepElectrolyteAssessment[];
  temperatureContext: TemperatureContext;
  electrolyteSummary: string;
  
  anionGap?: {
    value: number;
    status: 'normal' | 'high' | 'low';
    correctedValue?: number;
    correctedStatus?: 'normal' | 'high' | 'low';
    explanation: string;
  };

  baseExcess?: {
    value: number;
    status: 'deficit' | 'excess' | 'normal';
    explanation: string;
  };

  clinicalHypotheses: string[];
  clinicalActions: {
    immediate: string[];
    serial: string[];
    correlativeExams: string[];
    whenToRepeat?: string[];
  };
  
  alerts: ClinicalAlert[];
  
  stepByStepLogic: string[];
  expandedPhysiology: string;
}

export interface SavedBloodGasRecord {
  id: string;
  patientName: string;
  tutorName?: string;
  date: string;
  result: InterpretationResult;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizCase {
  id: string;
  title: string;
  scenario: string;
  data: Partial<BloodGasInput>;
  questions: QuizQuestion[];
}

export interface TooltipContent {
  title: string;
  content: string;
}
