export type Species = 'dog' | 'cat';
export type SampleType = 'arterial' | 'venous' | 'mixed';

export interface BloodGasInputs {
  species: Species;
  ph: number;
  pco2: number;
  hco3: number;
  po2: number;
  temp: number;
  fio2: number;
  na?: number;
  k?: number;
  cl?: number;
  albumin?: number;
  glucose?: number;
  lactate?: number;
  be?: number;
  declaredSampleType: 'arterial' | 'venous';
}

export interface AnalysisResult {
  sampleCheck: {
    probableType: string;
    message: string;
    emoji: string;
  };
  phStatus: {
    state: string;
    emoji: string;
  };
  primaryDisorder: {
    disorder: string;
    cause: string;
    emoji: string;
  };
  compensation: {
    status: string;
    expected: any;
    isCompensated: any;
    mixedDisorder: string | null;
  };
  ventilationStatus: {
    state: string;
    emoji: string;
  };
  oxygenation: {
    content: string;
    emoji: string;
  };
  electrolyteStatus: Array<{
    name: string;
    value: number;
    unit: string;
    status: string;
    alert: string;
    ref: string;
  }>;
  anionGap: {
    value: string;
    correctedValue: string;
    interpretation: string;
  };
  differentials: string[];
}

export interface QuizCase {
  inputs: BloodGasInputs;
  correctAnswers: {
    [key: string]: string | undefined;
  };
}
