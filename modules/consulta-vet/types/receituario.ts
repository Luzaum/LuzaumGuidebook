export type ReceituarioSpecies = 'cão' | 'gato' | 'ambos';
export type PrescriptionSpecies = 'dog' | 'cat';
export type DocumentType = 'recipe' | 'term';
export type DocumentStatus = 'draft' | 'issued';

export interface PrintIdentification {
  patientName: string;
  responsibleName: string;
  responsibleCpf?: string;
  species: string;
  breed: string;
  sex: string;
  age: string;
  weightKg: string;
  veterinarianName?: string;
  crmv?: string;
  witness1Name?: string;
  witness1Cpf?: string;
  witness2Name?: string;
  witness2Cpf?: string;
}

export interface DocumentHeaderData {
  clinicName: string;
  veterinarianName: string;
  crmv: string;
  documentDate: string;
  location: string;
  time: string;
}

export interface ReceituarioDocumentData {
  title: string;
  documentType: DocumentType;
  identification: PrintIdentification;
  header: DocumentHeaderData;
  bodyPlainText: string;
}

export type ClinicalDoseBasis = 'weight' | 'weight_per_day' | 'per_animal' | 'manual';

export interface ClinicalMedicationDose {
  min: number;
  max?: number;
  unit: 'mg/kg' | 'mg/kg/dia' | 'UI/kg' | 'mcg/kg' | 'mg/animal' | 'mcg/animal' | 'UI/animal';
  basis: ClinicalDoseBasis;
  route: string;
  frequency: string;
  duration: string;
  maximumMgKg?: number;
  repeatAfterDays?: number;
}

export interface ClinicalMedicationDefinition {
  key: string;
  name: string;
  canonicalMedicationId?: string | null;
  canonicalLookupName: string;
  presentationIds?: string[];
  linkedDoseIds?: string[];
  presentationFilter?: 'immediate_release' | 'injectable' | 'oral' | 'none';
  dose: ClinicalMedicationDose;
  doseAlternatives?: Array<{
    key: string;
    label: string;
    dose: ClinicalMedicationDose;
    prescriptionText: string;
  }>;
  doseSourceLabel: 'Modelo clínico do ConsultaVet';
  sourceReviewStatus: 'Revisão de fonte pendente';
  prescriptionText: string;
  internalAlert?: string;
  linkedProtocolKey?: string;
}

/** Escolhas do veterinário para apresentação/dose ao usar um modelo clínico. */
export interface ClinicalMedicationOverride {
  editorialMedicationId?: string | null;
  commercialProductId?: string | null;
  /** Concentração escolhida no receituário quando o produto tem múltiplas potências. */
  commercialPotencyMg?: number | null;
  presentationId?: string | null;
  doseId?: string | null;
  selectedDoseValue?: number | null;
  /** Quando true, a receita usa texto de manipulação baseado na dose calculada. */
  useCompounding?: boolean;
}

export interface MagistralFormulaComponent {
  key: string;
  name: string;
  amount: number;
  maxAmount?: number;
  unit: 'mg/kg' | 'UI/kg' | 'mcg/kg' | 'mg/animal' | 'mcg/animal' | 'mg/animal-small' | 'mg/animal-large';
}

export interface ClinicalRecipeOption {
  key: string;
  label: string;
  description?: string;
  optional?: boolean;
  medications?: ClinicalMedicationDefinition[];
  medicationPrecautions?: string[];
  veterinarianNotes?: string[];
  formula?: {
    title: string;
    components: MagistralFormulaComponent[];
    route: string;
    frequency: string;
    durationDays: number;
    referenceLabel?: string;
    referenceUrl?: string;
    requiresPatientSize?: boolean;
  };
}

export interface ClinicalRecipeModel {
  schemaVersion: 1;
  careSetting: 'ambulatorial' | 'hospitalar' | 'aplicação veterinária';
  categoryPath: string;
  selectionMode: 'single' | 'multiple' | 'fixed';
  selectorLabel?: string;
  defaultOptionKey?: string;
  documentHeading?: string;
  hospitalWarning?: string;
  incompleteProtocolWarning?: string;
  appendBodySections?: string[];
  appendBodySectionsBuilder?: (weightKg: number | null, species: string) => string[];
  options: ClinicalRecipeOption[];
  recipeInformation?: string[];
  veterinarianNotes?: string[];
  diseaseRecommendations: string[];
  medicationPrecautions: string[];
  returnSigns: string[];
}

export interface ReceituarioTemplateStructuredDefaults extends Partial<ReceituarioDocumentData> {
  clinical_model?: ClinicalRecipeModel;
}

export interface DocumentTemplate {
  id: string;
  clinic_id?: string | null;
  owner_user_id?: string | null;
  title: string;
  category: string;
  document_type: DocumentType;
  species: ReceituarioSpecies;
  body_plain_text: string;
  structured_defaults?: ReceituarioTemplateStructuredDefaults | null;
  medication_ids?: string[];
  is_global: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GeneratedDocument {
  id: string;
  clinic_id?: string | null;
  template_id?: string | null;
  title: string;
  document_type: DocumentType;
  body_plain_text: string;
  structured_data?: ReceituarioDocumentData | null;
  status: DocumentStatus;
  issued_at: string;
  pdf_storage_path?: string | null;
  signed_copy_storage_path?: string | null;
  created_at: string;
  updated_at: string;
  created_by?: string | null;
  patient_name?: string;
  responsible_name?: string;
  veterinarian_name?: string;
}

export interface TemplateFavorite {
  user_id: string;
  template_id: string;
  created_at: string;
}

/** Compatibilidade temporária de leitura; nunca é exibido ao usuário. */
export interface Placeholders {
  patient_name?: string;
  species?: string;
  breed?: string;
  sex?: string;
  age?: string;
  weight_kg?: string;
  responsible_name?: string;
  veterinarian_name?: string;
  crmv?: string;
  clinic_name?: string;
  document_date?: string;
}

export interface QuickRefusalFields {
  conduct: string;
}

export interface ReceituarioFilter {
  search: string;
  species: ReceituarioSpecies | 'all';
  category: string | 'all';
  onlyFavorites: boolean;
}

export type DoseSourceType = 'plumbs' | 'leaflet' | 'clinic' | 'other';
export type AdministrationBasis = 'weight_based' | 'per_animal' | 'per_application_site' | 'weight_band';

export interface PrescriptionPrecaution {
  id: string;
  text: string;
  sourceType: DoseSourceType;
  sourceLabel: string;
  sourceUrl?: string | null;
}

export interface PrescriptionMedicationSnapshot {
  medicationId: string;
  medicationName: string;
  activeIngredient: string;
  presentationId?: string | null;
  doseId?: string | null;
  doseSourceType: DoseSourceType;
  doseSourceLabel: string;
  doseSourceUrl?: string | null;
  doseUnit: string;
  selectedDose: number;
  precautions: PrescriptionPrecaution[];
  rawBlockText?: string;
  frequency?: string;
  duration?: string;
  route?: string;
  manualInstruction?: string;
  manualPresentation?: string;
  manualAdditionalInstructions?: string;
}
