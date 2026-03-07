export type Species = 'dog' | 'cat';

export interface BloodGasInputs {
    species: Species;
    declaredSampleType: 'arterial' | 'venous';
    fio2: number;
    ph: number;
    pco2: number;
    hco3: number;
    po2: number;
    temp: number;
    na: number;
    k: number;
    cl: number;
    albumin: number;
    glucose?: number;
    lactate?: number;
    be: number;
}

export interface AnalysisResult {
    primaryDisturbance: string;
    compensatoryResponse: string;
    oxygenationStatus: string;
    anionGap: number;
    sid: number;
    clinicalSigns: string[];
    treatmentSuggestions: string[];
    isCompensated: boolean;
    notes: string[];
}

export interface QuizCase {
    id: string;
    description: string;
    inputs: BloodGasInputs;
    correctAnswers: {
        primaryDisturbance: string;
        compensation: string;
        oxygenation: string;
    };
}
