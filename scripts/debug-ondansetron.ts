import { RECEITUARIO_PROTOCOL_MODELS } from '../modules/consulta-vet/data/receituarioProtocolModels';
import { resolveClinicalMedicationSource, buildDefaultClinicalMedicationOverride, buildClinicalMedicationPrescriptionBlock } from '../modules/consulta-vet/utils/clinicalMedicationCatalogBridge';

const gastroTemplate = RECEITUARIO_PROTOCOL_MODELS.find(item => item.id === 'seed-gastroenterite-aguda-nao-complicada-cao');
const gastroModel = gastroTemplate!.structured_defaults!.clinical_model!;
const ondansetron = gastroModel.options.find(item => item.key === 'ondansetron')!.medications![0];

console.log('ondansetron:', ondansetron);
console.log('source:', resolveClinicalMedicationSource(ondansetron));
const override = buildDefaultClinicalMedicationOverride(ondansetron, 'cão');
console.log('override:', override);
const block = buildClinicalMedicationPrescriptionBlock(ondansetron, override, 5, 'Cão', 2);
console.log('block:\n', block);
