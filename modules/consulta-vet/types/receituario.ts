export type ReceituarioSpecies = 'cão' | 'gato' | 'ambos';
export type PrescriptionSpecies = 'dog' | 'cat';
export type DocumentType = 'recipe' | 'term';
export type DocumentStatus = 'draft' | 'issued';

export interface PrintIdentification {
  patientName: string;
  responsibleName: string;
  species: string;
  breed: string;
  sex: string;
  age: string;
  weightKg: string;
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

export interface DocumentTemplate {
  id: string;
  clinic_id?: string | null;
  owner_user_id?: string | null;
  title: string;
  category: string;
  document_type: DocumentType;
  species: ReceituarioSpecies;
  body_plain_text: string;
  structured_defaults?: Partial<ReceituarioDocumentData> | null;
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
  recommendedConduct: string;
  refusedConduct: string;
  explainedRisks: string;
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
}
