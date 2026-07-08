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
  | 'antiinflammatory'
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
  | 'ophthalmic_lubricant'
  | 'ophthalmic_immunomodulator'
  | 'ophthalmic_antibiotic'
  | 'ophthalmic_epithelial'
  | 'ophthalmic_mydriatic'
  | 'ophthalmic_glaucoma'
  | 'ophthalmic_corticosteroid'
  | 'ophthalmic_antibiotic_steroid'
  | 'ophthalmic_nsaid'
  | 'skin_pruritus'
  | 'skin_pyoderma'
  | 'skin_atopy'
  | 'skin_hydration'
  | 'skin_barrier'
  | 'skin_chlorhexidine_shampoo'
  | 'skin_antifungal_shampoo'
  | 'skin_wound_healing'
  | 'skin_seborrhea'
  | 'parasite_oral_isoxazoline_dog'
  | 'parasite_oral_endectocide_dog'
  | 'parasite_topical_isoxazoline_cat'
  | 'parasite_oral_antifleas_cat'
  | 'parasite_oral_adulticide_flea'
  | 'parasite_topical_classic'
  | 'parasite_topical_endectocide'
  | 'parasite_collar'
  | 'parasite_vector_repellent_dog'
  | 'parasite_dewormer_dog'
  | 'parasite_dewormer_cat'
  | 'parasite_heartworm_prevention'
  | 'parasite_giardia'
  | 'gi_antiemetic'
  | 'gi_prokinetic'
  | 'gi_antidiarrheal'
  | 'gi_gastric_protector'
  | 'gi_antiflatulent'
  | 'gi_laxative'
  | 'gi_probiotic'
  | 'gi_antiprotozoal'
  | 'gi_pancreatic_enzyme'
  | 'gi_hepatobiliary'
  | 'gi_orexigenic'
  | 'analgesic_opioid_combo'
  | 'sedative_anesthetic'
  | 'neuro_anticonvulsant'
  | 'neuro_pain'
  | 'cardio_inotrope'
  | 'cardio_loop_diuretic'
  | 'cardio_raas_aldosterone'
  | 'cardio_antithrombotic'
  | 'cardio_pulmonary_vasodilator'
  | 'cardio_antiarrhythmic'
  | 'cardio_antihypertensive'
  | 'pneumo_bronchodilator'
  | 'pneumo_antitussive'
  | 'uro_urinary_support'
  | 'renal_ckd_support'
  | 'nutra_general_support'
  | 'nutra_mineral_vitamin'
  | 'endocrine_adrenal'
  | 'endocrine_thyroid'
  | 'endocrine_erythropoiesis'
  | 'endocrine_diagnostic'
  | 'infectious_antibiotic'
  | 'oncologic_tki'
  | 'repro_antigalactogenic'
  | 'ortho_joint_support'
  | 'ortho_antiinflammatory'
  | 'nutra_omega3'
  | 'dental_chlorhexidine'
  | 'dental_water_additive'
  | 'dental_toothpaste_gel'
  | 'dental_gum_support'
  | 'dental_plaque_supplement'
  | 'dental_antibiotic';

export interface CommercialMedicationPrice {
  averageLabel: string;
  rangeLabel: string;
  sourceDate: string;
  notes?: string;
}

export interface CommercialMedicationDoseEntry {
  title: string;
  dose: string;
  note?: string;
}

export interface CommercialMedicationDosageGuidance {
  labelDose?: string;
  plumbs?: Partial<Record<VetSpecies, CommercialMedicationDoseEntry[]>>;
  notes?: string[];
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
  dosageGuidance?: CommercialMedicationDosageGuidance;
  plumbsContext: string;
  clinicalUse: string;
  reassessment: string;
  prescriptionExample: string;
  safetyAlert: string;
  price: CommercialMedicationPrice;
  evidenceLevel?: string;
  imageUrl?: string;
  productPageUrl?: string;
  labelUrl?: string;
}
