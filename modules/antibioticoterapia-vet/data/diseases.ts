import type { DiseaseSystem } from '../types'
import { reprodutorDiseases } from './diseases/reprodutor'
import { respiratorioDiseases } from './diseases/respiratorio'
import { gastrointestinalDiseases } from './diseases/gastrointestinal'
import { sepseDiseases } from './diseases/sepse'
import { urinarioDiseases } from './diseases/urinario'
import { dermatoOrtopedicoDiseases } from './diseases/dermatoOrtopedico'
import { outrasZoonosesDiseases } from './diseases/outrasZoonoses'
import { perioperatorioDiseases } from './diseases/perioperatorio'

export {
  reprodutorDiseases,
  respiratorioDiseases,
  gastrointestinalDiseases,
  sepseDiseases,
  urinarioDiseases,
  dermatoOrtopedicoDiseases,
  outrasZoonosesDiseases,
  perioperatorioDiseases,
}

/**
 * Catálogo Clínico Oficial por Sistemas — Baseado no Guia de Uso de Antimicrobianos
 * e Controle de Infecção Hospitalar do Hospital Veterinário da UFMG (Edição 2026 - CCIH-EV-UFMG)
 * e consensos internacionais (ISCAID, ACVIM, WAVD).
 */
export const DZ_SEED: DiseaseSystem = {
  'Sistema Respiratório': respiratorioDiseases,
  'Sistema Reprodutor': reprodutorDiseases,
  'Sistema Gastrointestinal e Digestivo': gastrointestinalDiseases,
  'Sepse e instabilidade sistémica': sepseDiseases,
  'Sistema Urinário': urinarioDiseases,
  'Pele, Tecidos Moles e Musculoesquelético': dermatoOrtopedicoDiseases,
  'Outras Infecções e Zoonoses': outrasZoonosesDiseases,
  'Perioperatório': perioperatorioDiseases,
}
