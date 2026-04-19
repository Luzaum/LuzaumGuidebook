import type { DiseaseRecord } from '../../types/disease';
import type { MedicationRecord } from '../../types/medication';

let diseasesSeedPromise: Promise<DiseaseRecord[]> | null = null;
let medicationsSeedPromise: Promise<MedicationRecord[]> | null = null;

/**
 * Seed editorial de doenças — import dinâmico para code-split (menos JS inicial no Consulta Vet).
 */
export function loadDiseasesEditorialSeed(): Promise<DiseaseRecord[]> {
  if (!diseasesSeedPromise) {
    diseasesSeedPromise = import('./diseases.seed').then((m) => m.diseasesSeed);
  }
  return diseasesSeedPromise;
}

/**
 * Seed editorial de medicamentos — import dinâmico para code-split.
 */
export function loadMedicationsEditorialSeed(): Promise<MedicationRecord[]> {
  if (!medicationsSeedPromise) {
    medicationsSeedPromise = import('./medications.seed').then((m) => m.medicationsSeed);
  }
  return medicationsSeedPromise;
}

/**
 * Dispara carregamento em background ao entrar no módulo (sobrepõe ao primeiro paint do shell).
 */
export function prefetchConsultaVetEditorialSeeds(): void {
  void loadDiseasesEditorialSeed();
  void loadMedicationsEditorialSeed();
  void import('./consensos.seed');
}
