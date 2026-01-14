import type { Comorbidity, Species as OldSpecies } from "../types/patient";
import type { ComorbidityKey, DrugKey, PatientContext, Species as NewSpecies } from "./types";

/**
 * Mapeia IDs de drogas do formato antigo (ex: "lidocaina", "fentanil") 
 * para o formato novo do sistema de alertas (ex: "lidocaine_cri", "fentanyl")
 */
export function mapDrugIdToDrugKey(drugId: string): DrugKey | null {
  const mapping: Record<string, DrugKey> = {
    lidocaina: "lidocaine",
    lidocaine: "lidocaine",
    norepinefrina: "norepinephrine",
    norepinephrine: "norepinephrine",
    vasopressina: "vasopressin",
    vasopressin: "vasopressin",
    dopamina: "dopamine",
    dopamine: "dopamine",
    dobutamina: "dobutamina",
    efedrina: "efedrina",
    nitroprussiato: "nitroprussiato",
    diltiazem: "diltiazem",
    esmolol: "esmolol",
    fentanil: "fentanyl",
    fentanyl: "fentanyl",
    remifentanil: "remifentanil",
    morfina: "morphine",
    morphine: "morphine",
    metadona: "methadone",
    methadone: "methadone",
    butorfanol: "butorphanol",
    butorphanol: "butorphanol",
    cetamina: "ketamine",
    ketamina: "ketamine",
    dexmedetomidina: "dexmedetomidine",
    dexmedetomidine: "dexmedetomidine",
    propofol: "propofol",
    metoclopramida: "metoclopramida",
    maropitant: "maropitant",
    enrofloxacina: "enrofloxacina",
    enrofloxacin: "enrofloxacina",
    ceftriaxona: "ceftriaxona",
    cefalexina: "cefalexina",
    cephalexin: "cefalexina",
    meropenem: "meropenem",
    clindamicina: "clindamicina",
    clindamycin: "clindamicina",
    metronidazol: "metronidazol",
    metronidazole: "metronidazol",
    mlk: "mlk",
    flk: "flk",
  };

  return mapping[drugId.toLowerCase()] || null;
}

/**
 * Mapeia comorbidades do formato antigo (ex: "Hepatopata", "Renopata")
 * para o formato novo (ex: "hepatic_dysfunction", "ckd")
 */
export function mapComorbidityToComorbidityKey(
  comorbidity: Comorbidity
): ComorbidityKey[] {
  const mapping: Record<Comorbidity, ComorbidityKey[]> = {
    Hepatopata: ["hepatic_dysfunction"],
    Renopata: ["ckd"], // Considerando doença renal crônica como default
    Cardiopata: ["cardiac_disease"],
    Endocrinopata: [], // Muito genérico, requer mais contexto
  };

  return mapping[comorbidity] || [];
}

/**
 * Converte Species do formato antigo para o novo
 */
export function mapSpecies(oldSpecies: OldSpecies): NewSpecies {
  return oldSpecies === "dog" ? "dog" : oldSpecies === "cat" ? "cat" : "any";
}

/**
 * Helper para integrar o sistema antigo com o novo sistema de alertas.
 * Converte automaticamente os tipos e chama getDrugComorbidityAlerts.
 */
import { getDrugComorbidityAlerts } from "./index";

export function getAlertsForLegacySystem(params: {
  drugId: string;
  species: OldSpecies;
  comorbidities: Comorbidity[];
  ctx?: Partial<PatientContext>;
}): ReturnType<typeof getDrugComorbidityAlerts> {
  const drugKey = mapDrugIdToDrugKey(params.drugId);
  if (!drugKey) {
    return []; // Droga não mapeada, retorna vazio
  }

  const comorbidityKeys: ComorbidityKey[] = params.comorbidities.flatMap(
    mapComorbidityToComorbidityKey
  );

  const ctx: PatientContext = {
    species: mapSpecies(params.species),
    ...params.ctx,
  };

  return getDrugComorbidityAlerts(drugKey, comorbidityKeys, ctx);
}
