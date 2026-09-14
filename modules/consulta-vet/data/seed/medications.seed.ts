import { MedicationRecord } from '../../types/medication';
import { amoxicilinaClavulanatoMedicationRecord } from './medications.amoxicilina-clavulanato.seed';
import { ampicilinaSulbactamMedicationRecord } from './medications.ampicilina-sulbactam.seed';
import { capromorelinaMedicationRecord } from './medications.capromorelina.seed';
import { dipironaMedicationRecord } from './medications.dipirona.seed';
import { phenobarbitalMedicationRecord } from './medications.phenobarbital.seed';
import { tramadolMedicationRecord } from './medications.tramadol.seed';

/**
 * Catálogo de Medicamentos do ConsultaVet
 * Recadastro completo no novo padrão ouro aprofundado:
 * - Amoxicilina + Clavulanato (4:1)
 * - Ampicilina + Sulbactam (injetável 2:1)
 * - Capromorelina (Elura / Entyce)
 * - Dipirona (metamizol)
 * - Fenobarbital (Gardenal / Convless)
 * - Tramadol (Cronidor / Tramal)
 * (O arquivo anterior está preservado em medications.seed.legacy-archive.ts para reativação progressiva).
 */
export const medicationsSeed: MedicationRecord[] = [
  amoxicilinaClavulanatoMedicationRecord,
  ampicilinaSulbactamMedicationRecord,
  capromorelinaMedicationRecord,
  dipironaMedicationRecord,
  phenobarbitalMedicationRecord,
  tramadolMedicationRecord,
];

