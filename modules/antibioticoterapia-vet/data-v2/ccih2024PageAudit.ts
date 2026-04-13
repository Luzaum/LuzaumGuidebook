/**
 * Auditoria humana assistida — Guia_CCIH_2024 (circulação restrita).
 *
 * Editar APENAS após confronto direto com o exemplar institucional (não inventar páginas).
 * Este ficheiro não inclui o PDF e não expõe download; apenas números de página acordados na auditoria.
 *
 * Formato:
 *   chave_prioritária: { pageStart, pageEnd, auditNote }
 * Use pageStart === pageEnd quando o tópico couber numa única página.
 *
 * Exemplo comentado (substituir por valores reais e descomentar):
 * ```
 * piometra: {
 *   pageStart: 0,
 *   pageEnd: 0,
 *   auditNote: 'Conferido com Guia_CCIH_2024 em DD/MM/AAAA — responsável: ...',
 * },
 * ```
 */

import type { InstitutionalContentMapping } from '../model/versionedSource'
import { INSTITUTIONAL_SOURCE_CCIH_2024 } from './sourceRegistry'

/** Chaves alinhadas a institutionalMappings (ids de síndrome / tema / conceito). */
export type CciPriorityPageAuditKey =
  | 'piometra'
  | 'metrite_aguda'
  | 'endometrite'
  | 'perioperatorio'
  | 'pneumonia'
  | 'piotórax'
  | 'cistite_esporadica'
  | 'cistite_recorrente'
  | 'pielonefrite'
  | 'sepse'
  | 'stewardship_general'
  | 'culture_antibiogram'
  | 'clinical_group_yellow'
  | 'clinical_group_red'
  | 'mrsp'
  | 'mrsa'
  | 'esbl'
  | 'intrinsic_resistance'
  | 'prostatite'
  | 'rinite'
  | 'traqueobronquite'
  | 'oral_extracao_dentaria'
  | 'gengivite_periodontite'
  | 'fcgs'
  | 'bacteriuria_subclinica'
  | 'artrite_septica'
  | 'osteomielite'
  | 'ferida_mordedura'
  /** ITU hospitalar: cateter, sinais de cistite e cistite nosocomial (mesma página no guia). */
  | 'hospital_nosocomial_catheter_cystitis'
  | 'compulsory_notification'
  | 'urinary_catheter_observations'
  | 'catheter_signs_of_cystitis'

export interface CciHumanPageAuditEntry {
  pageStart: number
  pageEnd: number
  /** Obrigatório: quem/quando ou referência mínima à sessão de auditoria. */
  auditNote: string
}

/** Texto padrão da sessão de auditoria humana (exemplar restrito; sem PDF no app). */
const HUMAN_PAGE_AUDIT_NOTE =
  'Página validada manualmente a partir do Guia CCIH 2024 restrito; locator persistido no código sem distribuição do PDF.'

/**
 * Mapa preenchido pela equipa CCIH/clínica após leitura do PDF restrito.
 * Enquanto vazio, os mapeamentos permanecem em linked_verified_metadata.
 */
export const CCIH_2024_PRIORITY_PAGE_AUDIT: Partial<Record<CciPriorityPageAuditKey, CciHumanPageAuditEntry>> = {
  piometra: { pageStart: 16, pageEnd: 16, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  metrite_aguda: { pageStart: 17, pageEnd: 17, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  endometrite: { pageStart: 18, pageEnd: 18, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  perioperatorio: { pageStart: 21, pageEnd: 24, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  pneumonia: { pageStart: 25, pageEnd: 25, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  piotórax: { pageStart: 26, pageEnd: 26, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  sepse: { pageStart: 33, pageEnd: 33, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  cistite_esporadica: { pageStart: 35, pageEnd: 35, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  cistite_recorrente: { pageStart: 36, pageEnd: 36, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  pielonefrite: { pageStart: 36, pageEnd: 36, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  clinical_group_red: { pageStart: 6, pageEnd: 6, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  clinical_group_yellow: { pageStart: 7, pageEnd: 7, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  stewardship_general: { pageStart: 9, pageEnd: 9, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  mrsp: { pageStart: 7, pageEnd: 7, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  esbl: { pageStart: 7, pageEnd: 7, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  culture_antibiogram: { pageStart: 11, pageEnd: 12, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  mrsa: { pageStart: 12, pageEnd: 12, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  intrinsic_resistance: { pageStart: 12, pageEnd: 14, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  prostatite: { pageStart: 19, pageEnd: 19, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  rinite: { pageStart: 25, pageEnd: 25, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  traqueobronquite: { pageStart: 25, pageEnd: 25, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  oral_extracao_dentaria: { pageStart: 27, pageEnd: 27, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  gengivite_periodontite: { pageStart: 27, pageEnd: 27, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  fcgs: { pageStart: 27, pageEnd: 27, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  bacteriuria_subclinica: { pageStart: 35, pageEnd: 35, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  artrite_septica: { pageStart: 39, pageEnd: 39, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  osteomielite: { pageStart: 39, pageEnd: 39, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  ferida_mordedura: { pageStart: 39, pageEnd: 39, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  hospital_nosocomial_catheter_cystitis: { pageStart: 37, pageEnd: 37, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  compulsory_notification: { pageStart: 5, pageEnd: 5, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  urinary_catheter_observations: { pageStart: 36, pageEnd: 36, auditNote: HUMAN_PAGE_AUDIT_NOTE },
  catheter_signs_of_cystitis: { pageStart: 37, pageEnd: 37, auditNote: HUMAN_PAGE_AUDIT_NOTE },
}

export function isValidCciPageAuditEntry(e: CciHumanPageAuditEntry | undefined): e is CciHumanPageAuditEntry {
  if (!e) return false
  return (
    Number.isInteger(e.pageStart) &&
    Number.isInteger(e.pageEnd) &&
    e.pageStart > 0 &&
    e.pageEnd > 0 &&
    e.pageStart <= e.pageEnd &&
    typeof e.auditNote === 'string' &&
    e.auditNote.trim().length > 0
  )
}

/**
 * Funde sectionRef + topicHint com entrada auditada; caso inválida ou ausente, devolve null (use fallback metadata).
 */
export function mergeCciPageAudit(
  auditKey: CciPriorityPageAuditKey,
  sectionRef: string,
  topicHint: string,
): InstitutionalContentMapping | null {
  const raw = CCIH_2024_PRIORITY_PAGE_AUDIT[auditKey]
  if (!isValidCciPageAuditEntry(raw)) return null
  return {
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    linkStatus: 'linked_verified_page_locator',
    topicHint,
    locator: {
      sectionRef,
      pageStart: raw.pageStart,
      pageEnd: raw.pageEnd,
      auditNote: raw.auditNote.trim(),
    },
  }
}

/** Lista de chaves prioritárias (checklist na UI Referências). */
export const CCIH_PRIORITY_PAGE_AUDIT_KEYS: CciPriorityPageAuditKey[] = [
  'piometra',
  'metrite_aguda',
  'endometrite',
  'perioperatorio',
  'prostatite',
  'pneumonia',
  'piotórax',
  'rinite',
  'traqueobronquite',
  'oral_extracao_dentaria',
  'gengivite_periodontite',
  'fcgs',
  'cistite_esporadica',
  'cistite_recorrente',
  'pielonefrite',
  'bacteriuria_subclinica',
  'sepse',
  'artrite_septica',
  'osteomielite',
  'ferida_mordedura',
  'stewardship_general',
  'culture_antibiogram',
  'clinical_group_yellow',
  'clinical_group_red',
  'mrsp',
  'mrsa',
  'esbl',
  'intrinsic_resistance',
  'hospital_nosocomial_catheter_cystitis',
  'compulsory_notification',
  'urinary_catheter_observations',
  'catheter_signs_of_cystitis',
]

/** Quantas chaves prioritárias têm entrada de página válida (auditoria humana). */
export function countValidPriorityPageAuditEntries(): number {
  return CCIH_PRIORITY_PAGE_AUDIT_KEYS.filter((k) => isValidCciPageAuditEntry(CCIH_2024_PRIORITY_PAGE_AUDIT[k])).length
}
