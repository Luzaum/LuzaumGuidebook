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

  meta: {
    rawSchemaVersion?: string;
    sources?: string[]; // optional
  };
};
