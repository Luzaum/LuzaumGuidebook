import { MedicationRecord } from '../../types/medication';
import { applyMedicationBookFoundations } from '../medicationBookFoundations';
import { applyPlumbs10MedicationAudit } from '../plumbs10MedicationAudit';
import { acetilcisteinaMedicationRecord } from './medications.acetilcisteina.seed';
import { alopurinolMedicationRecord } from './medications.alopurinol.seed';
import { amantadinaMedicationRecord } from './medications.amantadina.seed';
import { amitriptilinaMedicationRecord } from './medications.amitriptilina.seed';
import { amoxicilinaClavulanatoMedicationRecord } from './medications.amoxicilina-clavulanato.seed';
import { ampicilinaSulbactamMedicationRecord } from './medications.ampicilina-sulbactam.seed';
import { betanecolMedicationRecord } from './medications.betanecol.seed';
import { buprenorfinaMedicationRecord } from './medications.buprenorfina.seed';
import { capromorelinaMedicationRecord } from './medications.capromorelina.seed';
import { ceftriaxonaMedicationRecord } from './medications.ceftriaxona.seed';
import { ciclosporinaMedicationRecord } from './medications.ciclosporina.seed';
import { ciproeptadinaMedicationRecord } from './medications.ciproeptadina.seed';
import { clindamicinaMedicationRecord } from './medications.clindamicina.seed';
import { clorambucilMedicationRecord } from './medications.clorambucil.seed';
import { diazepamMedicationRecord } from './medications.diazepam.seed';
import { dipironaMedicationRecord } from './medications.dipirona.seed';
import { domperidonaMedicationRecord } from './medications.domperidona.seed';
import { enrofloxacinaMedicationRecord } from './medications.enrofloxacina.seed';
import { gabapentinaMedicationRecord } from './medications.gabapentina.seed';
import { hidroxidoDeAluminioMedicationRecord } from './medications.hidroxido-de-aluminio.seed';
import { levetiracetamMedicationRecord } from './medications.levetiracetam.seed';
import { marbofloxacinaMedicationRecord } from './medications.marbofloxacina.seed';
import { maropitantMedicationRecord } from './medications.maropitant.seed';
import { meloxicamMedicationRecord } from './medications.meloxicam.seed';
import { metadonaMedicationRecord } from './medications.metadona.seed';
import { metoclopramidaMedicationRecord } from './medications.metoclopramida.seed';
import { micofenolatoMofetilaMedicationRecord } from './medications.micofenolato-mofetila.seed';
import { miltefosinaMedicationRecord } from './medications.miltefosina.seed';
import { mirtazapinaMedicationRecord } from './medications.mirtazapina.seed';
import { molidustatMedicationRecord } from './medications.molidustat.seed';
import { ondansetronaMedicationRecord } from './medications.ondansetrona.seed';
import { phenobarbitalMedicationRecord } from './medications.phenobarbital.seed';
import { pradofloxacinaMedicationRecord } from './medications.pradofloxacina.seed';
import { prednisolonaMedicationRecord } from './medications.prednisolona.seed';
import { pronefraMedicationRecord } from './medications.pronefra.seed';
import { sucralfatoMedicationRecord } from './medications.sucralfato.seed';
import { sulfametoxazolTrimetoprimaMedicationRecord } from './medications.sulfametoxazol-trimetoprima.seed';
import { tramadolMedicationRecord } from './medications.tramadol.seed';
import { trazodonaMedicationRecord } from './medications.trazodona.seed';

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
  alopurinolMedicationRecord,
  amantadinaMedicationRecord,
  amitriptilinaMedicationRecord,
  amoxicilinaClavulanatoMedicationRecord,
  ampicilinaSulbactamMedicationRecord,
  betanecolMedicationRecord,
  buprenorfinaMedicationRecord,
  capromorelinaMedicationRecord,
  ceftriaxonaMedicationRecord,
  ciclosporinaMedicationRecord,
  ciproeptadinaMedicationRecord,
  clindamicinaMedicationRecord,
  clorambucilMedicationRecord,
  diazepamMedicationRecord,
  dipironaMedicationRecord,
  domperidonaMedicationRecord,
  enrofloxacinaMedicationRecord,
  gabapentinaMedicationRecord,
  hidroxidoDeAluminioMedicationRecord,
  levetiracetamMedicationRecord,
  marbofloxacinaMedicationRecord,
  maropitantMedicationRecord,
  meloxicamMedicationRecord,
  metadonaMedicationRecord,
  metoclopramidaMedicationRecord,
  micofenolatoMofetilaMedicationRecord,
  miltefosinaMedicationRecord,
  mirtazapinaMedicationRecord,
  molidustatMedicationRecord,
  ondansetronaMedicationRecord,
  phenobarbitalMedicationRecord,
  pradofloxacinaMedicationRecord,
  prednisolonaMedicationRecord,
  pronefraMedicationRecord,
  sucralfatoMedicationRecord,
  sulfametoxazolTrimetoprimaMedicationRecord,
  tramadolMedicationRecord,
  trazodonaMedicationRecord,
].map(applyPlumbs10MedicationAudit).map(applyMedicationBookFoundations);
