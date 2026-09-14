import { MedicationRecord } from '../../types/medication';
import { amoxicilinaClavulanatoMedicationRecord } from './medications.amoxicilina-clavulanato.seed';
import { ampicilinaSulbactamMedicationRecord } from './medications.ampicilina-sulbactam.seed';
import { capromorelinaMedicationRecord } from './medications.capromorelina.seed';
import { clindamicinaMedicationRecord } from './medications.clindamicina.seed';
import { dipironaMedicationRecord } from './medications.dipirona.seed';
import { enrofloxacinaMedicationRecord } from './medications.enrofloxacina.seed';
import { hidroxidoDeAluminioMedicationRecord } from './medications.hidroxido-de-aluminio.seed';
import { phenobarbitalMedicationRecord } from './medications.phenobarbital.seed';
import { pronefraMedicationRecord } from './medications.pronefra.seed';
import { sulfametoxazolTrimetoprimaMedicationRecord } from './medications.sulfametoxazol-trimetoprima.seed';
import { tramadolMedicationRecord } from './medications.tramadol.seed';

/**
 * Catálogo de Medicamentos do ConsultaVet
 * Recadastro completo no novo padrão ouro aprofundado:
 * - Amoxicilina + Clavulanato (4:1)
 * - Ampicilina + Sulbactam (injetável 2:1)
 * - Capromorelina (Elura / Entyce)
 * - Clindamicina (Clinbacter / Dalacin C)
 * - Dipirona (metamizol)
 * - Enrofloxacina (Baytril / Zelotril)
 * - Fenobarbital (Gardenal / Convless)
 * - Hidróxido de Alumínio [Al(OH)3] (quelante de fosfato e antiácido)
 * - Pronefra (CaCO3 + MgCO3 + quitosana + hidrolisado de peixe)
 * - Sulfametoxazol / Sulfadiazina + Trimetoprima (1:5)
 * - Tramadol (Cronidor / Tramal)
 * (O arquivo anterior está preservado em medications.seed.legacy-archive.ts para reativação progressiva).
 */
export const medicationsSeed: MedicationRecord[] = [
  amoxicilinaClavulanatoMedicationRecord,
  ampicilinaSulbactamMedicationRecord,
  capromorelinaMedicationRecord,
  clindamicinaMedicationRecord,
  dipironaMedicationRecord,
  enrofloxacinaMedicationRecord,
  hidroxidoDeAluminioMedicationRecord,
  phenobarbitalMedicationRecord,
  pronefraMedicationRecord,
  sulfametoxazolTrimetoprimaMedicationRecord,
  tramadolMedicationRecord,
];

