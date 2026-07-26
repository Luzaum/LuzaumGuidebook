import { BloodGasInput, InterpretationResult } from '../types';

export interface ClinicalPattern {
  id: string;
  when: (input: BloodGasInput, result: Partial<InterpretationResult>) => boolean;
  label: string;
}

export const CLINICAL_PATTERNS: ClinicalPattern[] = [
  {
    id: 'vomiting-hypochloremic-alkalosis',
    when: (input) => !!input.clinicalContext?.vomiting && (input.Cl ?? 999) < 100 && (input.HCO3 ?? 0) > 26,
    label: 'Vômitos/perda gástrica com alcalose metabólica hipoclorêmica.',
  },
  {
    id: 'diarrhea-hyperchloremic-acidosis',
    when: (input) => !!input.clinicalContext?.diarrhea && (input.Cl ?? 0) > 115 && (input.HCO3 ?? 99) < 18,
    label: 'Perda gastrointestinal de bicarbonato com acidose metabólica hiperclorêmica.',
  },
  {
    id: 'shock-lactate',
    when: (input) => (!!input.clinicalContext?.shock || !!input.clinicalContext?.dyspnea) && (input.lactate ?? 0) >= 2.5,
    label: 'Hipoperfusão/choque com hiperlactatemia clinicamente relevante.',
  },
  {
    id: 'dka-pattern',
    when: (input) => !!input.clinicalContext?.suspectedDKA && (input.glucose ?? 0) >= 250 && (input.HCO3 ?? 99) < 18,
    label: 'Padrão compatível com cetoacidose diabética.',
  },
  {
    id: 'urethral-obstruction',
    when: (input) => !!input.clinicalContext?.urethralObstruction && (input.K ?? 0) >= 6,
    label: 'Obstrução uretral/uroabdome com hipercalemia clinicamente perigosa.',
  },
  {
    id: 'severe-pulmonary-disease',
    when: (input, result) => input.sampleType === 'arterial' && result.deepOxygenation?.status === 'hypoxemia',
    label: 'Doença pulmonar relevante, desequilíbrio entre ventilação e perfusão (V/Q) ou desvio sanguíneo pulmonar devem ser considerados.',
  },
];
