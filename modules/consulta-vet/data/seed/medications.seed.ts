import { MedicationRecord } from '../../types/medication';
import { dipironaMedicationRecord } from './medications.dipirona.seed';
import { phenobarbitalMedicationRecord } from './medications.phenobarbital.seed';

/**
 * Catálogo de Medicamentos do ConsultaVet
 * Recadastro completo no novo padrão ouro aprofundado:
 * - Dipirona (metamizol)
 * - Fenobarbital (Gardenal / Convless)
 * (O arquivo anterior está preservado em medications.seed.legacy-archive.ts para reativação progressiva).
 */
export const medicationsSeed: MedicationRecord[] = [
  dipironaMedicationRecord,
  phenobarbitalMedicationRecord,
];

