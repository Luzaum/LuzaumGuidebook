import { MedicationRecord } from '../../types/medication';
import { applyMedicationBookFoundations } from '../medicationBookFoundations';
import { acetilcisteinaMedicationRecord } from './medications.acetilcisteina.seed';
import { amoxicilinaClavulanatoMedicationRecord } from './medications.amoxicilina-clavulanato.seed';
import { ampicilinaSulbactamMedicationRecord } from './medications.ampicilina-sulbactam.seed';
import { buprenorfinaMedicationRecord } from './medications.buprenorfina.seed';
import { capromorelinaMedicationRecord } from './medications.capromorelina.seed';
import { clindamicinaMedicationRecord } from './medications.clindamicina.seed';
import { dipironaMedicationRecord } from './medications.dipirona.seed';
import { enrofloxacinaMedicationRecord } from './medications.enrofloxacina.seed';
import { hidroxidoDeAluminioMedicationRecord } from './medications.hidroxido-de-aluminio.seed';
import { levetiracetamMedicationRecord } from './medications.levetiracetam.seed';
import { meloxicamMedicationRecord } from './medications.meloxicam.seed';
import { metadonaMedicationRecord } from './medications.metadona.seed';
import { phenobarbitalMedicationRecord } from './medications.phenobarbital.seed';
import { pradofloxacinaMedicationRecord } from './medications.pradofloxacina.seed';
import { prednisolonaMedicationRecord } from './medications.prednisolona.seed';
import { pronefraMedicationRecord } from './medications.pronefra.seed';
import { sulfametoxazolTrimetoprimaMedicationRecord } from './medications.sulfametoxazol-trimetoprima.seed';
import { tramadolMedicationRecord } from './medications.tramadol.seed';

/**
 * Catálogo de Medicamentos do ConsultaVet
 * Recadastro completo no novo padrão ouro aprofundado:
 * - Acetilcisteína (N-Acetilcisteína / NAC / Fluimucil)
 * - Amoxicilina + Clavulanato (4:1)
 * - Ampicilina + Sulbactam (injetável 2:1)
 * - Buprenorfina (Buprenex / Vetergesic / Temgesic / Restiva)
 * - Capromorelina (Elura / Entyce)
 * - Clindamicina (Clinbacter / Dalacin C)
 * - Dipirona (metamizol)
 * - Enrofloxacina (Baytril / Zelotril)
 * - Fenobarbital (Gardenal / Convless)
 * - Hidróxido de Alumínio [Al(OH)3] (quelante de fosfato e antiácido)
 * - Metadona (Mytedom / Comfortan)
 * - Pradofloxacina (Veraflox)
 * - Pronefra (CaCO3 + MgCO3 + quitosana + hidrolisado de peixe)
 * - Sulfametoxazol / Sulfadiazina + Trimetoprima (1:5)
 * - Tramadol (Cronidor / Tramal)
 * (O arquivo anterior está preservado em medications.seed.legacy-archive.ts para reativação progressiva).
 */
export const medicationsSeed: MedicationRecord[] = [
  acetilcisteinaMedicationRecord,
  amoxicilinaClavulanatoMedicationRecord,
  ampicilinaSulbactamMedicationRecord,
  buprenorfinaMedicationRecord,
  capromorelinaMedicationRecord,
  clindamicinaMedicationRecord,
  dipironaMedicationRecord,
  enrofloxacinaMedicationRecord,
  hidroxidoDeAluminioMedicationRecord,
  levetiracetamMedicationRecord,
  meloxicamMedicationRecord,
  metadonaMedicationRecord,
  phenobarbitalMedicationRecord,
  pradofloxacinaMedicationRecord,
  prednisolonaMedicationRecord,
  pronefraMedicationRecord,
  sulfametoxazolTrimetoprimaMedicationRecord,
  tramadolMedicationRecord,
].map(applyMedicationBookFoundations);
