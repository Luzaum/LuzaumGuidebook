// ============================================================
// TYPES — AAP2: Acidentes com Animais Peçonhentos
// ============================================================

// --- Entidades do Domínio ---

export type SignificanceLevel = 'pathognomonic' | 'characteristic' | 'general';

export interface ClinicalSign {
    name: string;
    explanation: string;
    significance: SignificanceLevel;
}

export interface Animal {
    id: string;                  // slug único, ex: 'jararaca'
    name: string;                // nome completo, ex: 'Jararaca (Bothrops spp.)'
    accidentName: string;        // ex: 'Acidente Botrópico'
    imagePrompt: string;         // prompt para geração de imagem por IA
    staticImagePath?: string;    // caminho para imagem estática em /public/images/
    identification: string;      // descrição morfológica para identificação
    signs: ClinicalSign[];
    epidemiology: string;
    diagnosis: string;           // suporta markdown **bold** e \n
    treatment: string;           // suporta markdown **bold** e \n
}

export interface AnimalCategory {
    id: string;                  // slug, ex: 'cobras'
    label: string;               // ex: 'Cobras'
    color: string;               // CSS color token, ex: 'var(--color-cobra)'
    animals: Animal[];
}

// --- Protocolos de Tratamento ---

export interface ProtocolSection {
    title: string;
    content: string;             // suporta HTML parcial (<strong>) e emojis
}

export interface TreatmentProtocol {
    accidentName: string;        // chave que liga ao Animal.accidentName
    keyTherapy: ProtocolSection;
    supportiveCare: ProtocolSection;
    painManagement: ProtocolSection;
    complications?: ProtocolSection;
    monitoring: ProtocolSection;
    contraindications: ProtocolSection;
    references: string;
}

// --- Formulário de Suspeitas ---

export type PatientSpecies = 'Canino' | 'Felino';
export type PatientStatus = 'Adulto Saudável' | 'Filhote' | 'Idoso' | 'Gestante' | 'Lactante';
export type Comorbidity = 'Nenhuma' | 'Cardiopatia' | 'Hepatopatia' | 'Doença Renal Crônica (DRC)' | 'Endocrinopatia';

export interface PatientData {
    species: PatientSpecies;
    weight: string;
    status: PatientStatus;
    comorbidities: Comorbidity[];
}

// --- Resultados de Diagnóstico ---

export interface DiagnosisResult {
    animal: Animal & { categoryId: string; categoryColor: string };
    score: number;
    probability: number;         // 0–100
    matchingSigns: ClinicalSign[];
}

// --- Cache de Imagens ---

export interface ImageCacheEntry {
    dataUrl: string;
    timestamp: number;
}

// --- Navegação ---

export type AppPage = 'home' | 'bulario' | 'suspeitas' | 'tratamentos' | 'enciclopedia' | 'species_detail';

// --- Respostas da API ---

export interface AIAnalysisResponse {
    html: string;
}

export interface AIImageResponse {
    dataUrl: string;
}
