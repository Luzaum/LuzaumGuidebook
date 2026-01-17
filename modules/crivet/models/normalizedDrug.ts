export type AlertLevel = "SAFE" | "MONITOR" | "WARNING" | "CRITICAL" | "BLOCK";

export type NormalizedHelpSection = {
  id: string;
  title: string;
  content: string[]; // plain text lines (render bullets/paragraphs)
};

export type NormalizedDoseEntry = {
  label: string;
  route?: string;
  unit: string; // e.g. "mcg/kg/min" or "mg/kg"
  range?: [number, number];
  fixed?: number;
  notes?: string[];
  equivalences?: string[];
};

// Tipos auxiliares para normalizeDrug
export type NormalizedHelpDrawer = {
  sections: Array<{ id: string; title: string; content: string[] }>;
};

export type NormalizedCompatibility = {
  diluentsAllowed: string[];
  incompatible: Array<{ agent: string; why: string; risk?: string }>;
};

export type NormalizedDoses = {
  dog: {
    cri?: {
      mcgkgmin?: { min: number; max: number; note?: string };
      mgkgh?: { min: number; max: number; note?: string };
      u_kg_h?: { min: number; max: number; note?: string };
    };
    bolus?: {
      mgkg?: { min: number; max: number; note?: string };
      mcgkg?: { min: number; max: number; note?: string };
      ukg?: { min: number; max: number; note?: string };
    };
  };
  cat: {
    cri?: {
      mcgkgmin?: { min: number; max: number; note?: string };
      mgkgh?: { min: number; max: number; note?: string };
      u_kg_h?: { min: number; max: number; note?: string };
    };
    bolus?: {
      mgkg?: { min: number; max: number; note?: string };
      mcgkg?: { min: number; max: number; note?: string };
      ukg?: { min: number; max: number; note?: string };
    };
  };
};

export type NormalizedIndications = {
  primary: string[];
  secondary: string[];
  all: string[];
};

// Importar tipos do DrugProfile para reutilizar
import type { IndicatedDose } from '../types/drug';
import type { Preset, ComorbidityAlert } from '../types/drugProfile';

export type NormalizedDrug = {
  id: string;
  namePt: string;
  nameEn: string;
  synonyms: string[];

  class: string[];

  summary: {
    taglines: string[];
  };

  core: {
    mechanism: string[];
    pharmacodynamics: string[];
    pharmacokinetics: string[];
  };

  indications: string[];

  doses: {
    dog: { cri: NormalizedDoseEntry[]; bolus: NormalizedDoseEntry[] };
    cat: { cri: NormalizedDoseEntry[]; bolus: NormalizedDoseEntry[] };
  };

  compatibility: {
    diluentsAllowed: string[]; // e.g. ["NaCl 0.9%", "Ringer Lactato", "Glicose 5%"]
    incompatible: { agent: string; why?: string }[];
    ySiteOnly: string[];
    notes: string[];
  };

  helpDrawer: {
    sections: NormalizedHelpSection[];
  };

  // Campos adicionais para UI
  recommendedUnit?: string; // Unidade recomendada (ex: "mcg/kg/h")
  recommendedUnitWhy?: string[]; // Razões para usar a unidade recomendada
  indicatedDoses?: IndicatedDose[]; // Doses indicadas por modo, espécie e finalidade
  presets?: Preset[]; // Presets clínicos
  alerts?: {
    rules: Array<{
      when: string[]; // PatientFlags que ativam este alerta
      level: AlertLevel;
      title: string;
      short: string;
      why: string[];
      actions: string[];
    }>;
  };

  meta: {
    rawSchemaVersion?: string;
    sources?: string[]; // optional
  };
};
