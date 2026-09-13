import { MedicationRecord } from '../../types/medication';
import { dipironaMedicationRecord } from './medications.dipirona.seed';

/**
 * Catálogo de Medicamentos do ConsultaVet
 * Iniciando o recadastro completo do zero com o padrão ouro a partir da Dipirona (metamizol).
 * (O arquivo anterior completo está preservado em medications.seed.legacy-archive.ts para reativação progressiva).
 */
export const medicationsSeed: MedicationRecord[] = [
  dipironaMedicationRecord,
];
