import type {
  ClinicalMedicationDefinition,
  ClinicalMedicationDose,
  ClinicalRecipeModel,
  DocumentTemplate,
} from '../types/receituario';
import { getDefaultClinicalOptionKeys, renderClinicalRecipe } from '../utils/receituarioClinicalModels';
import {
  buildIvddEmergencySection,
  buildIvddHomeCareSection,
  buildIvddMedicationCareSection,
  buildIvddRestSection,
  buildIvddReturnSection,
  buildIvddSurgerySection,
  buildIvddTermsSection,
  buildIvddUrineCareSection,
  buildTraumaVertEmergencySection,
  buildTraumaVertMedicationCare,
  buildTraumaVertRecommendations,
  buildTraumaVertUrineCare,
  buildVestibularAvoidSection,
  buildVestibularCatEmergencySection,
  buildVestibularCatRecommendations,
  buildVestibularCentralSignsSection,
  buildVestibularDogEmergencySection,
  buildVestibularDogEvolutionSection,
  buildVestibularDogRecommendations,
  buildVestibularDogReturnSection,
  buildVestibularEarCareSection,
  IVDD_INTRO,
  TRAUMA_VERT_INTRO,
  VESTIBULAR_CAT_INTRO,
  VESTIBULAR_DOG_INTRO,
} from './receituarioNeurologiaSharedSections';

const NOW = '2026-08-06T00:00:00.000Z';

const MELOXICAM_ORAL_PRODUCTS = ['maxicam-ourofino', 'meloxivet-duprat', 'mellis-vet-avert'];
const CARPROFEN_ORAL_PRODUCTS = ['carproflan-agener-uniao', 'rimadyl-comprimidos-zoetis'];
const ROBENACOXIB_ORAL_PRODUCTS = ['onsior-elanco'];
const GABAPENTIN_PRODUCTS = ['gabapentina-humana-manipulada', 'decrise-avert'];
const PREGABALIN_PRODUCTS = ['pregabalina-humana-manipulada'];
const ONDANSETRON_ORAL_PRODUCTS = ['vonau-vet-avert', 'vonau-flash-biolab', 'emedron-agener'];
const MAROPITANT_ORAL_PRODUCTS = ['cerenia-zoetis'];

type MedicationOptions = {
  canonicalId?: string | null;
  presentations?: string[];
  doseAlternatives?: ClinicalMedicationDefinition['doseAlternatives'];
  presentationFilter?: ClinicalMedicationDefinition['presentationFilter'];
  alert?: string;
};

function medication(
  key: string,
  name: string,
  dose: ClinicalMedicationDose,
  prescriptionText: string,
  options: MedicationOptions = {},
): ClinicalMedicationDefinition {
  return {
    key,
    name,
    canonicalMedicationId: options.canonicalId ?? null,
    canonicalLookupName: name,
    presentationIds: options.presentations || [],
    doseAlternatives: options.doseAlternatives,
    presentationFilter: options.presentationFilter || 'none',
    dose,
    doseSourceLabel: 'Modelo clínico do ConsultaVet',
    sourceReviewStatus: 'Revisão de fonte pendente',
    prescriptionText,
    internalAlert: options.alert,
  };
}

function template(
  id: string,
  title: string,
  category: string,
  species: 'cão' | 'gato' | 'ambos',
  model: ClinicalRecipeModel,
): DocumentTemplate {
  return {
    id,
    title,
    category,
    document_type: 'recipe',
    species,
    body_plain_text: renderClinicalRecipe(model, getDefaultClinicalOptionKeys(model), null),
    structured_defaults: { clinical_model: model },
    medication_ids: Array.from(new Set(model.options.flatMap((option) =>
      (option.medications || []).map((item) => item.canonicalMedicationId).filter((value): value is string => Boolean(value)),
    ))),
    is_global: true,
    is_active: true,
    created_at: NOW,
    updated_at: NOW,
  };
}

const TRAUMA_VERT_DOG: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Neurologia > Trauma vertebromedular',
  selectionMode: 'multiple',
  selectorLabel: 'Medicações',
  defaultOptionKey: 'gabapentin',
  documentHeading: 'TRAUMA VERTEBROMEDULAR — CÃO — ALTA APÓS ESTABILIZAÇÃO',
  hospitalWarning: TRAUMA_VERT_INTRO,
  options: [
    {
      key: 'gabapentin',
      label: 'Gabapentina — analgesia neuropática',
      medications: [medication('gabapentin-trauma-dog', 'Gabapentina', {
        min: 10, max: 20, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 8 horas', duration: '7 a 14 dias',
      }, `1. GABAPENTINA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 8 horas, durante 7 a 14 dias.

Após esse período, reavaliar. Se o medicamento tiver sido utilizado por tempo prolongado, reduzir gradualmente antes da suspensão.`, {
        presentations: GABAPENTIN_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'metocarbamol',
      label: 'Metocarbamol — contratura ou espasmo muscular',
      optional: true,
      medications: [medication('metocarbamol-trauma-dog', 'Metocarbamol', {
        min: 20, max: 30, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 8 horas', duration: '5 a 7 dias',
      }, `2. METOCARBAMOL — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 8 horas, durante 5 a 7 dias.

Utilizar somente quando houver rigidez ou espasmos musculares associados à lesão.`, {
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'carprofen',
      label: 'Carprofeno — anti-inflamatório',
      medications: [medication('carprofen-trauma-dog', 'Carprofeno', {
        min: 2.2, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 12 horas', duration: '5 a 7 dias',
      }, `3. CARPROFENO — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 12 horas, durante 5 a 7 dias.

O anti-inflamatório somente deve ser administrado após confirmação de que o paciente está hidratado, com pressão arterial adequada e sem evidências de lesão renal, hemorragia ou ulceração gastrointestinal.`, {
        presentations: CARPROFEN_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'meloxicam',
      label: 'Meloxicam — anti-inflamatório',
      medications: [medication('meloxicam-trauma-dog', 'Meloxicam', {
        min: 0.1, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '5 a 7 dias',
      }, `3. MELOXICAM — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 5 a 7 dias.

O anti-inflamatório somente deve ser administrado após confirmação de que o paciente está hidratado, com pressão arterial adequada e sem evidências de lesão renal, hemorragia ou ulceração gastrointestinal.`, {
        presentations: MELOXICAM_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
  ],
  appendBodySections: [
    buildTraumaVertRecommendations(),
    buildTraumaVertUrineCare(),
    buildTraumaVertMedicationCare(),
    buildTraumaVertEmergencySection(),
  ],
  diseaseRecommendations: [],
  medicationPrecautions: [
    'Escolher apenas uma opção de anti-inflamatório (carprofeno ou meloxicam)',
    'Utilizar metocarbamol somente quando houver rigidez ou espasmo muscular',
  ],
  returnSigns: [],
  veterinarianNotes: [
    'O tratamento do trauma medular depende da presença de contusão, compressão e instabilidade vertebral. Fraturas ou luxações instáveis e lesões compressivas podem necessitar de cirurgia, mesmo quando o paciente ainda apresenta algum movimento.',
  ],
};

const TRAUMA_VERT_CAT: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Neurologia > Trauma vertebromedular',
  selectionMode: 'multiple',
  selectorLabel: 'Medicações',
  defaultOptionKey: 'gabapentin',
  documentHeading: 'TRAUMA VERTEBROMEDULAR — GATO — ALTA APÓS ESTABILIZAÇÃO',
  hospitalWarning: TRAUMA_VERT_INTRO,
  options: [
    {
      key: 'gabapentin',
      label: 'Gabapentina — analgesia neuropática',
      medications: [medication('gabapentin-trauma-cat', 'Gabapentina', {
        min: 5, max: 10, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 8 a 12 horas', duration: '7 a 14 dias',
      }, `1. GABAPENTINA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 8 a 12 horas, durante 7 a 14 dias.

Reduzir a dose em pacientes com doença renal.`, {
        presentations: GABAPENTIN_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'metocarbamol',
      label: 'Metocarbamol — espasmo muscular',
      optional: true,
      medications: [medication('metocarbamol-trauma-cat', 'Metocarbamol', {
        min: 20, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 8 horas', duration: '3 a 5 dias',
      }, `2. METOCARBAMOL — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 8 horas, durante 3 a 5 dias.`, {
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'robenacoxib',
      label: 'Robenacoxibe — anti-inflamatório',
      medications: [medication('robenacoxib-trauma-cat', 'Robenacoxibe', {
        min: 1, max: 2.4, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: 'até 3 dias',
      }, `3. ROBENACOXIBE — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante até 3 dias.

Não prolongar o tratamento sem reavaliação veterinária.`, {
        presentations: ROBENACOXIB_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
  ],
  appendBodySections: [
    buildTraumaVertRecommendations(),
    buildTraumaVertUrineCare(),
    buildTraumaVertMedicationCare(),
    buildTraumaVertEmergencySection(),
  ],
  diseaseRecommendations: [],
  medicationPrecautions: [
    'Utilizar metocarbamol somente quando houver espasmo muscular',
    'Administrar robenacoxibe somente quando não houver contraindicação',
  ],
  returnSigns: [],
  veterinarianNotes: [
    'O tratamento do trauma medular depende da presença de contusão, compressão e instabilidade vertebral. Fraturas ou luxações instáveis e lesões compressivas podem necessitar de cirurgia, mesmo quando o paciente ainda apresenta algum movimento.',
  ],
};

const IVDD_DOG: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Neurologia > Hérnia de disco',
  selectionMode: 'multiple',
  selectorLabel: 'Medicações',
  defaultOptionKey: 'gabapentin',
  documentHeading: 'HÉRNIA DE DISCO — CÃO — MANEJO CONSERVADOR',
  hospitalWarning: IVDD_INTRO,
  options: [
    {
      key: 'carprofen',
      label: 'Carprofeno — anti-inflamatório',
      medications: [medication('carprofen-ivdd-dog', 'Carprofeno', {
        min: 2.2, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 12 horas', duration: '5 a 7 dias',
      }, `1. CARPROFENO — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 12 horas, durante 5 a 7 dias.`, {
        presentations: CARPROFEN_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'meloxicam',
      label: 'Meloxicam — anti-inflamatório',
      medications: [medication('meloxicam-ivdd-dog', 'Meloxicam', {
        min: 0.1, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '5 a 7 dias',
      }, `1. MELOXICAM — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 5 a 7 dias.`, {
        presentations: MELOXICAM_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'gabapentin',
      label: 'Gabapentina — analgesia neuropática',
      medications: [medication('gabapentin-ivdd-dog', 'Gabapentina', {
        min: 10, max: 20, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 8 horas', duration: '10 a 14 dias',
      }, `2. GABAPENTINA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 8 horas, durante 10 a 14 dias.

Após esse período, reavaliar a necessidade de manutenção ou redução gradual.`, {
        presentations: GABAPENTIN_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'pregabalin',
      label: 'Pregabalina — alternativa à gabapentina',
      medications: [medication('pregabalin-ivdd-dog', 'Pregabalina', {
        min: 4, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 12 horas', duration: '10 a 14 dias',
      }, `2. PREGABALINA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 12 horas, durante 10 a 14 dias.

Não utilizar gabapentina e pregabalina simultaneamente como protocolo rotineiro.`, {
        canonicalId: 'med-pregabalina',
        presentations: PREGABALIN_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'metocarbamol',
      label: 'Metocarbamol — espasmo ou contratura muscular',
      optional: true,
      medications: [medication('metocarbamol-ivdd-dog', 'Metocarbamol', {
        min: 20, max: 30, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 8 horas', duration: '5 a 7 dias',
      }, `3. METOCARBAMOL — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 8 horas, durante 5 a 7 dias.

Não incluir automaticamente quando não houver rigidez ou espasmo muscular.`, {
        presentationFilter: 'oral',
      })],
    },
  ],
  appendBodySections: [
    buildIvddRestSection(),
    buildIvddTermsSection(),
    buildIvddHomeCareSection(),
    buildIvddUrineCareSection(),
    buildIvddMedicationCareSection(),
    buildIvddSurgerySection(),
    buildIvddReturnSection(),
    buildIvddEmergencySection(),
  ],
  diseaseRecommendations: [],
  medicationPrecautions: [
    'Escolher apenas uma opção de anti-inflamatório (carprofeno ou meloxicam)',
    'Escolher gabapentina ou pregabalina; não utilizar ambas simultaneamente como protocolo rotineiro',
    'Incluir metocarbamol somente quando houver rigidez ou espasmo muscular',
  ],
  returnSigns: [],
  recipeInformation: [
    'A terapia conservadora recomendada inclui restrição de atividade, analgesia, manejo urinário quando necessário e prevenção de lesões de pele',
    'O consenso ACVIM recomenda anti-inflamatório não esteroidal por aproximadamente 5–7 dias, desde que não existam contraindicações, e permite o uso de gabapentina, pregabalina e relaxantes musculares como adjuvantes',
    'O consenso ACVIM recomenda pelo menos quatro semanas de restrição, sem caminhadas sem guia, saltos, móveis ou escadas',
  ],
  veterinarianNotes: [
    'Referência: Olby NJ et al. ACVIM Consensus Statement on Diagnosis and Management of Acute Canine Thoracolumbar Intervertebral Disc Extrusion. Journal of Veterinary Internal Medicine. 2022.',
  ],
};

const VESTIBULAR_DOG: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Neurologia > Síndrome vestibular',
  selectionMode: 'multiple',
  selectorLabel: 'Medicações',
  defaultOptionKey: 'maropitant',
  documentHeading: 'SÍNDROME VESTIBULAR — CÃO',
  hospitalWarning: VESTIBULAR_DOG_INTRO,
  options: [
    {
      key: 'maropitant',
      label: 'Maropitant — náusea ou vômito',
      medications: [medication('maropitant-vest-dog', 'Maropitant', {
        min: 2, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '3 a 5 dias',
      }, `1. MAROPITANT — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 3 a 5 dias.`, {
        canonicalId: 'med-maropitant',
        presentations: MAROPITANT_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'ondansetron',
      label: 'Ondansetrona — náusea ou vômito',
      medications: [medication('ondansetron-vest-dog', 'Ondansetrona', {
        min: 0.5, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 8 a 12 horas', duration: '3 a 5 dias',
      }, `1. ONDANSETRONA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 8 a 12 horas, durante 3 a 5 dias.`, {
        presentations: ONDANSETRON_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'meclizine',
      label: 'Meclizina — desequilíbrio e enjoo',
      optional: true,
      medications: [medication('meclizine-vest-dog', 'Meclizina', {
        min: 1, max: 2, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '2 a 3 dias',
      }, `2. MECLIZINA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 2 a 3 dias.

Não manter por períodos prolongados sem reavaliação.

A meclizina pode causar sonolência, boca seca, taquicardia e retenção urinária. Utilizar com cautela em cães com glaucoma, dificuldade para urinar, obstrução gastrointestinal ou doença prostática.`, {
        presentationFilter: 'oral',
      })],
    },
  ],
  appendBodySections: [
    buildVestibularDogRecommendations(),
    buildVestibularEarCareSection(),
    buildVestibularAvoidSection(),
    buildVestibularDogEvolutionSection(),
    buildVestibularCentralSignsSection(),
    buildVestibularDogReturnSection(),
    buildVestibularDogEmergencySection(),
  ],
  diseaseRecommendations: [],
  medicationPrecautions: [
    'Escolher apenas uma opção principal para náusea ou vômito (maropitant ou ondansetrona)',
    'Utilizar meclizina somente em caso de intensa sensação de movimento, desequilíbrio e enjoo',
  ],
  returnSigns: [],
};

const VESTIBULAR_CAT: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Neurologia > Síndrome vestibular',
  selectionMode: 'single',
  selectorLabel: 'Antiemético',
  defaultOptionKey: 'maropitant',
  documentHeading: 'SÍNDROME VESTIBULAR — GATO',
  hospitalWarning: VESTIBULAR_CAT_INTRO,
  options: [
    {
      key: 'maropitant',
      label: 'Maropitant',
      medications: [medication('maropitant-vest-cat', 'Maropitant', {
        min: 1, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '3 a 5 dias',
      }, `1. MAROPITANT — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 3 a 5 dias.`, {
        canonicalId: 'med-maropitant',
        presentations: MAROPITANT_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'ondansetron',
      label: 'Ondansetrona',
      medications: [medication('ondansetron-vest-cat', 'Ondansetrona', {
        min: 0.5, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 12 horas', duration: '3 a 5 dias',
      }, `1. ONDANSETRONA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 12 horas, durante 3 a 5 dias.`, {
        presentations: ONDANSETRON_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
  ],
  appendBodySections: [
    buildVestibularCatRecommendations(),
    buildVestibularCatEmergencySection(),
  ],
  diseaseRecommendations: [],
  medicationPrecautions: [
    'Escolher apenas uma opção para náusea ou vômito; não selecionar maropitant e ondansetrona automaticamente',
  ],
  returnSigns: [],
  veterinarianNotes: [
    'Referências: Nelson & Couto. Small Animal Internal Medicine, 6ª ed., cap. 63 e 65; Platt & Garosi. Small Animal Neurological Emergencies, cap. 21, 22, 30 e 32.',
  ],
};

export const RECEITUARIO_NEUROLOGIA_MODELS: DocumentTemplate[] = [
  template('seed-trauma-vertebromedular-cao', 'Trauma vertebromedular — Cão', 'Neurologia', 'cão', TRAUMA_VERT_DOG),
  template('seed-trauma-vertebromedular-gato', 'Trauma vertebromedular — Gato', 'Neurologia', 'gato', TRAUMA_VERT_CAT),
  template('seed-hernia-disco-cao', 'Hérnia de disco — Cão (manejo conservador)', 'Neurologia', 'cão', IVDD_DOG),
  template('seed-sindrome-vestibular-cao', 'Síndrome vestibular — Cão', 'Neurologia', 'cão', VESTIBULAR_DOG),
  template('seed-sindrome-vestibular-gato', 'Síndrome vestibular — Gato', 'Neurologia', 'gato', VESTIBULAR_CAT),
];
