import { VetSpecies } from './common';

export type CommercialOticRole =
  | 'maintenance_cleaner'
  | 'sensitive_ear'
  | 'ceruminolytic'
  | 'pre_treatment';

export type CommercialOticStrength = 'mild' | 'moderate' | 'strong';

export type CommercialMedicationClass =
  | 'dermatologic'
  | 'gastrointestinal'
  | 'neurologic'
  | 'cardiologic'
  | 'pneumologic'
  | 'urologic'
  | 'renal'
  | 'orthopedic'
  | 'endocrine'
  | 'ophthalmologic'
  | 'infectious'
  | 'analgesic'
  | 'anesthetic'
  | 'nutraceutical'
  | 'reproductive'
  | 'oncologic'
  | 'emergency'
  | 'parasiticide'
  | 'behavioral'
  | 'dental';

export type CommercialMedicationSubclass =
  | 'otic_ceruminolytic'
  | 'otic_antifungal'
  | 'otic_antibacterial'
  | 'otic_corticosteroid'
  | 'skin_pruritus'
  | 'skin_pyoderma'
  | 'skin_atopy'
  | 'skin_chlorhexidine_shampoo'
  | 'skin_antifungal_shampoo'
  | 'skin_wound_healing'
  | 'skin_seborrhea'
  | 'gi_antiemetic'
  | 'gi_antidiarrheal'
  | 'gi_gastric_protector'
  | 'gi_probiotic'
  | 'neuro_anticonvulsant'
  | 'neuro_pain'
  | 'cardio_inotrope'
  | 'cardio_antiarrhythmic'
  | 'cardio_antihypertensive'
  | 'pneumo_bronchodilator'
  | 'pneumo_antitussive'
  | 'uro_urinary_support'
  | 'renal_ckd_support'
  | 'ortho_joint_support'
  | 'ortho_antiinflammatory';

export interface CommercialMedicationPrice {
  averageLabel: string;
  rangeLabel: string;
  sourceDate: string;
  notes?: string;
}

export interface CommercialMedicationProduct {
  id: string;
  slug: string;
  name: string;
  manufacturer: string;
  commercialClass: CommercialMedicationClass;
  commercialSubclass: CommercialMedicationSubclass;
  commercialSubclasses?: CommercialMedicationSubclass[];
  species: VetSpecies[];
  roles?: CommercialOticRole[];
  strength?: CommercialOticStrength;
  presentations: string[];
  activeComponents: string[];
  labelCompositionSummary: string;
  labelDirections: string;
  plumbsContext: string;
  clinicalUse: string;
  reassessment: string;
  prescriptionExample: string;
  safetyAlert: string;
  price: CommercialMedicationPrice;
  evidenceLevel?: string;
  imageUrl?: string;
  productPageUrl?: string;
}
