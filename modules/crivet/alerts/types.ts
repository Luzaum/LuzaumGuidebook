export type Species = "dog" | "cat" | "any";

export type Severity = "green" | "yellow" | "orange" | "red" | "black";

export type ComorbidityKey =
  | "hepatic_dysfunction"
  | "portosystemic_shunt"
  | "hypoalbuminemia"
  | "ckd"
  | "aki"
  | "cardiac_disease"
  | "arrhythmia_risk"
  | "resp_disease"
  | "neuro_disease"
  | "sepsis"
  | "hypovolemia_unresolved"
  | "shock_distributive"
  | "shock_cardiogenic"
  | "shock_hypovolemic"
  | "head_trauma"
  | "increased_icp"
  | "pregnant"
  | "neonate";

export type DrugKey =
  | "lidocaine"
  | "fentanyl"
  | "remifentanil"
  | "morphine"
  | "methadone"
  | "butorphanol"
  | "ketamine"
  | "dexmedetomidine"
  | "propofol"
  | "mlk"
  | "flk"
  | "norepinephrine"
  | "vasopressin"
  | "dopamine"
  | "dobutamina"
  | "efedrina"
  | "nitroprussiato"
  | "diltiazem"
  | "esmolol"
  | "metoclopramida"
  | "maropitant"
  | "enrofloxacina"
  | "ceftriaxona"
  | "cefalexina"
  | "clindamicina"
  | "metronidazol"
  | "meropenem"
  | "any";

export interface PatientContext {
  species: Species;
  map?: number;        // mmHg
  lactate?: number;    // mmol/L
  creatinine?: number; // mg/dL
  alt?: number;
  alp?: number;
  albumin?: number;    // g/dL
  onVentilator?: boolean;
}

export interface Alert {
  id: string;
  severity: Severity;
  score: number; // used to sort
  title: string;
  why: string;
  do: string;
  tags?: string[];
}

export interface Rule {
  id: string;
  drug: DrugKey | "any";
  species?: Species;
  when: (c: {
    drug: DrugKey;
    comorbidities: Set<ComorbidityKey>;
    ctx: PatientContext;
  }) => boolean;
  alert: (c: {
    drug: DrugKey;
    comorbidities: Set<ComorbidityKey>;
    ctx: PatientContext;
  }) => Alert;
}
