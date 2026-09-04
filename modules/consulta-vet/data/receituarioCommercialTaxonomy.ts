import type { CommercialMedicationClass, CommercialMedicationSubclass } from '../types/commercialMedication';

export const RECEITUARIO_COMMERCIAL_CLASS_LABELS: Record<CommercialMedicationClass, string> = {
  dermatologic: 'Dermatológicas', gastrointestinal: 'Gastrointestinais', neurologic: 'Neurológicas',
  cardiologic: 'Cardiológicos', pneumologic: 'Medicações pneumo', urologic: 'Urológicas', renal: 'Renais',
  orthopedic: 'Ortopédicas', endocrine: 'Endócrinas', ophthalmologic: 'Oftalmológicas',
  infectious: 'Infecciosas / antimicrobianos', analgesic: 'Analgésicas', antiinflammatory: 'Anti-inflamatórios',
  nutraceutical: 'Nutracêuticas', reproductive: 'Reprodutivas', oncologic: 'Oncológicas', emergency: 'Emergenciais',
  parasiticide: 'Antiparasitárias', behavioral: 'Comportamentais', dental: 'Odontológicas',
};

export const RECEITUARIO_COMMERCIAL_SUBCLASS_LABELS: Record<CommercialMedicationSubclass, string> = {
  otic_ceruminolytic: 'Otológico ceruminolítico', otic_antifungal: 'Otológico antifúngico',
  otic_antibacterial: 'Otológico antibacteriano', otic_corticosteroid: 'Corticoide otológico',
  ophthalmic_lubricant: 'Oftálmico lubrificante', ophthalmic_immunomodulator: 'Oftálmico imunomodulador',
  ophthalmic_antibiotic: 'Oftálmico antibiótico', ophthalmic_epithelial: 'Oftálmico reparador/epitelizante',
  ophthalmic_mydriatic: 'Oftálmico midriático/cicloplégico', ophthalmic_glaucoma: 'Glaucoma / pressão intraocular',
  ophthalmic_corticosteroid: 'Corticoide oftálmico', ophthalmic_antibiotic_steroid: 'Oftálmico antibiótico + corticoide',
  ophthalmic_nsaid: 'AINE oftálmico', skin_pruritus: 'Prurido de pele', skin_pyoderma: 'Piodermites',
  skin_atopy: 'Dermatite atópica', skin_hydration: 'Hidratação cutânea', skin_barrier: 'Barreira cutânea',
  skin_chlorhexidine_shampoo: 'Shampoo antisséptico com clorexidina',
  skin_antifungal_shampoo: 'Shampoo antifúngico/antisséptico', skin_wound_healing: 'Feridas e cicatrização',
  skin_seborrhea: 'Seborreia', parasite_oral_isoxazoline_dog: 'Isoxazolina oral para cão',
  parasite_oral_endectocide_dog: 'Endectocida oral para cão', parasite_topical_isoxazoline_cat: 'Isoxazolina tópica para gato',
  parasite_oral_antifleas_cat: 'Antipulgas oral para gato', parasite_oral_adulticide_flea: 'Adulticida oral para pulgas',
  parasite_topical_classic: 'Tópicos clássicos', parasite_topical_endectocide: 'Tópicos endectocidas',
  parasite_collar: 'Coleiras antiparasitárias', parasite_vector_repellent_dog: 'Repelentes vetoriais para cães',
  parasite_dewormer_dog: 'Vermífugos para cães', parasite_dewormer_cat: 'Vermífugos para gatos',
  parasite_heartworm_prevention: 'Prevenção de dirofilariose', parasite_giardia: 'Giardia',
  gi_antiemetic: 'Antieméticos', gi_prokinetic: 'Procinéticos', gi_antidiarrheal: 'Antidiarreicos',
  gi_gastric_protector: 'Protetores gástricos', gi_antiflatulent: 'Antiflatulentos / antigases',
  gi_laxative: 'Laxantes / encefalopatia hepática', gi_probiotic: 'Probióticos',
  gi_antiprotozoal: 'Antiprotozoários gastrointestinais', gi_pancreatic_enzyme: 'Enzimas pancreáticas',
  gi_hepatobiliary: 'Hepatobiliares', gi_orexigenic: 'Orexígenos', analgesic_nonopioid: 'Analgésicos não opioides', analgesic_opioid_combo: 'Analgésicos multimodais',
  sedative_anesthetic: 'Sedativos / anestesia clínica', neuro_anticonvulsant: 'Anticonvulsivantes', neuro_pain: 'Dor neuropática',
  cardio_inotrope: 'Inotrópicos', cardio_loop_diuretic: 'Diuréticos de alça', cardio_raas_aldosterone: 'SRAA / aldosterona',
  cardio_antithrombotic: 'Antitrombóticos', cardio_pulmonary_vasodilator: 'Vasodilatadores pulmonares',
  cardio_antiarrhythmic: 'Antiarrítmicos', cardio_antihypertensive: 'Anti-hipertensivos',
  pneumo_bronchodilator: 'Broncodilatadores', pneumo_antitussive: 'Antitussígenos', uro_urinary_support: 'Suporte urinário',
  renal_ckd_support: 'Doença renal crônica', nutra_general_support: 'Suporte nutricional geral',
  nutra_mineral_vitamin: 'Vitaminas / minerais', endocrine_adrenal: 'Adrenais', endocrine_insulin: 'Insulinas',
  endocrine_thyroid: 'Tireoide', endocrine_erythropoiesis: 'Eritropoiese / DRC', endocrine_diagnostic: 'Diagnóstico endócrino',
  infectious_antifungal: 'Antifúngicos sistêmicos', infectious_antibiotic: 'Antimicrobianos sistêmicos', oncologic_tki: 'Inibidores de tirosina quinase',
  repro_antigalactogenic: 'Antigalactogênicos', ortho_joint_support: 'Suporte articular',
  ortho_antiinflammatory: 'Anti-inflamatórios ortopédicos', nutra_omega3: 'Ômega 3 / EPA + DHA',
  dental_chlorhexidine: 'Antissépticos bucais com clorexidina', dental_water_additive: 'Aditivos para água',
  dental_toothpaste_gel: 'Pasta, gel e escovação', dental_gum_support: 'Gengiva sensível / pós-procedimento',
  dental_plaque_supplement: 'Suporte contra placa e halitose', dental_antibiotic: 'Antibióticos odontológicos',
};

export const RECEITUARIO_SUBCLASSES_BY_CLASS: Record<CommercialMedicationClass, CommercialMedicationSubclass[]> = {
  dermatologic: ['otic_ceruminolytic', 'otic_antifungal', 'otic_antibacterial', 'otic_corticosteroid', 'skin_pruritus', 'skin_pyoderma', 'skin_atopy', 'skin_hydration', 'skin_barrier', 'skin_chlorhexidine_shampoo', 'skin_antifungal_shampoo', 'skin_wound_healing', 'skin_seborrhea'],
  gastrointestinal: ['gi_antiemetic', 'gi_prokinetic', 'gi_gastric_protector', 'gi_antiflatulent', 'gi_antidiarrheal', 'gi_laxative', 'gi_probiotic', 'gi_antiprotozoal', 'gi_pancreatic_enzyme', 'gi_hepatobiliary', 'gi_orexigenic'],
  neurologic: ['neuro_anticonvulsant', 'neuro_pain'],
  cardiologic: ['cardio_inotrope', 'cardio_loop_diuretic', 'cardio_raas_aldosterone', 'cardio_antihypertensive', 'cardio_antithrombotic', 'cardio_pulmonary_vasodilator', 'cardio_antiarrhythmic'],
  pneumologic: ['pneumo_bronchodilator', 'pneumo_antitussive'], urologic: ['uro_urinary_support'],
  renal: ['renal_ckd_support', 'endocrine_erythropoiesis'], orthopedic: ['ortho_joint_support', 'ortho_antiinflammatory'],
  endocrine: ['endocrine_insulin', 'endocrine_adrenal', 'endocrine_thyroid', 'endocrine_erythropoiesis', 'endocrine_diagnostic'],
  ophthalmologic: ['ophthalmic_lubricant', 'ophthalmic_immunomodulator', 'ophthalmic_antibiotic', 'ophthalmic_epithelial', 'ophthalmic_mydriatic', 'ophthalmic_glaucoma', 'ophthalmic_corticosteroid', 'ophthalmic_antibiotic_steroid', 'ophthalmic_nsaid'],
  infectious: ['infectious_antifungal', 'infectious_antibiotic'], analgesic: ['analgesic_nonopioid', 'analgesic_opioid_combo', 'neuro_pain', 'sedative_anesthetic'],
  antiinflammatory: ['ortho_antiinflammatory'], nutraceutical: ['nutra_omega3', 'nutra_general_support', 'nutra_mineral_vitamin', 'gi_probiotic'],
  reproductive: ['repro_antigalactogenic'], oncologic: ['oncologic_tki'], emergency: ['sedative_anesthetic', 'endocrine_diagnostic'],
  parasiticide: ['parasite_oral_isoxazoline_dog', 'parasite_oral_endectocide_dog', 'parasite_topical_isoxazoline_cat', 'parasite_oral_antifleas_cat', 'parasite_oral_adulticide_flea', 'parasite_topical_classic', 'parasite_topical_endectocide', 'parasite_collar', 'parasite_vector_repellent_dog', 'parasite_dewormer_dog', 'parasite_dewormer_cat', 'parasite_heartworm_prevention', 'parasite_giardia'],
  behavioral: [], dental: ['dental_chlorhexidine', 'dental_water_additive', 'dental_toothpaste_gel', 'dental_gum_support', 'dental_plaque_supplement', 'dental_antibiotic'],
};

export const RECEITUARIO_COMMERCIAL_CLASS_OPTIONS = Object.entries(RECEITUARIO_COMMERCIAL_CLASS_LABELS)
  .map(([value, label]) => ({ value: value as CommercialMedicationClass, label }))
  .sort((left, right) => left.label.localeCompare(right.label, 'pt-BR'));
