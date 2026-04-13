import type { InstitutionalContentMapping } from '../model/versionedSource'
import { mergeCciPageAudit, type CciPriorityPageAuditKey } from './ccih2024PageAudit'
import { INSTITUTIONAL_SOURCE_CCIH_2024 } from './sourceRegistry'

const LOCATOR_AUDIT_NOTE_METADATA_ONLY =
  'Metadados auditáveis (sectionRef). Páginas: preencher em data-v2/ccih2024PageAudit.ts após auditoria humana com exemplar restrito Guia_CCIH_2024 — não inventar números.'

function linkedMetadata(sectionRef: string, topicHint: string): InstitutionalContentMapping {
  return {
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    linkStatus: 'linked_verified_metadata',
    topicHint,
    locator: {
      sectionRef,
      pageStart: null,
      pageEnd: null,
      auditNote: LOCATOR_AUDIT_NOTE_METADATA_ONLY,
    },
  }
}

/** Bloco prioritário: tenta fundir com CCIH_2024_PRIORITY_PAGE_AUDIT; senão mantém metadata only. */
function withPriorityPageAudit(
  auditKey: CciPriorityPageAuditKey,
  sectionRef: string,
  topicHint: string,
): InstitutionalContentMapping {
  return mergeCciPageAudit(auditKey, sectionRef, topicHint) ?? linkedMetadata(sectionRef, topicHint)
}

/**
 * Síndromes v2 — prioritárias para auditoria de página (ver ccih2024PageAudit.ts).
 */
export const SYNDROME_INSTITUTIONAL_MAPPINGS: Record<string, InstitutionalContentMapping> = {
  piometra: withPriorityPageAudit('piometra', 'CCIH-2024/CLIN/SYN-PIOMETRA', 'Piometra / infecção uterina fechada'),
  metrite_aguda: withPriorityPageAudit(
    'metrite_aguda',
    'CCIH-2024/CLIN/SYN-METRITE-AG',
    'Metrite aguda',
  ),
  endometrite: withPriorityPageAudit('endometrite', 'CCIH-2024/CLIN/SYN-ENDOMETR', 'Endometrite'),
  cistite_esporadica: withPriorityPageAudit(
    'cistite_esporadica',
    'CCIH-2024/CLIN/SYN-UTI-LOW',
    'Cistite esporádica / ITU inferior não complicada',
  ),
  cistite_recorrente: withPriorityPageAudit(
    'cistite_recorrente',
    'CCIH-2024/CLIN/SYN-UTI-REC',
    'Cistite recorrente',
  ),
  pielonefrite: withPriorityPageAudit('pielonefrite', 'CCIH-2024/CLIN/SYN-PYELON', 'Pielonefrite / ITU alta'),
  pneumonia: withPriorityPageAudit('pneumonia', 'CCIH-2024/CLIN/SYN-PNEUMO', 'Pneumonia'),
  piotórax: withPriorityPageAudit('piotórax', 'CCIH-2024/CLIN/SYN-PYOTHX', 'Piotórax / empiema pleural'),
  sepse: withPriorityPageAudit('sepse', 'CCIH-2024/CLIN/SYN-SEPSIS', 'Sepse / instabilidade sistêmica'),
  perioperatorio: withPriorityPageAudit(
    'perioperatorio',
    'CCIH-2024/CLIN/SYN-PERIOP',
    'Profilaxia e cuidados perioperatórios',
  ),
  prostatite: withPriorityPageAudit(
    'prostatite',
    'CCIH-2024/CLIN/SYN-PROSTAT',
    'Prostatite bacteriana / infecção prostática',
  ),
  rinite: withPriorityPageAudit('rinite', 'CCIH-2024/CLIN/SYN-RHINIT', 'Rinite bacteriana / supurativa (suspeita)'),
  traqueobronquite: withPriorityPageAudit(
    'traqueobronquite',
    'CCIH-2024/CLIN/SYN-TRBRON',
    'Traqueobronquite infecciosa (tosse dos canis e afins)',
  ),
  oral_extracao_dentaria: withPriorityPageAudit(
    'oral_extracao_dentaria',
    'CCIH-2024/CLIN/SYN-ORAL-EXT',
    'Cavidade oral / extração dentária (profilaxia e terapêutica)',
  ),
  gengivite_periodontite: withPriorityPageAudit(
    'gengivite_periodontite',
    'CCIH-2024/CLIN/SYN-GING-PERIO',
    'Gengivite e periodontite (infecção odontogênica)',
  ),
  fcgs: withPriorityPageAudit('fcgs', 'CCIH-2024/CLIN/SYN-FCGS', 'FCGS / estomatite crônica felina'),
  ferida_mordedura: withPriorityPageAudit(
    'ferida_mordedura',
    'CCIH-2024/CLIN/SYN-BITE',
    'Feridas por mordedura e inoculação polimicrobiana',
  ),
  artrite_septica: withPriorityPageAudit('artrite_septica', 'CCIH-2024/CLIN/SYN-SEPT-ARTH', 'Artrite séptica'),
  osteomielite: withPriorityPageAudit('osteomielite', 'CCIH-2024/CLIN/SYN-OSTEO', 'Osteomielite'),
  bacteriuria_subclinica: withPriorityPageAudit(
    'bacteriuria_subclinica',
    'CCIH-2024/CLIN/SYN-SUBCLIN-BAC',
    'Bacteriúria subclínica / assintomática',
  ),
}

export const HOSPITAL_CARD_INSTITUTIONAL_MAPPINGS: Record<string, InstitutionalContentMapping> = {
  signal_inpatient_risk: linkedMetadata('CCIH-2024/HOSP/RISK-INPAT', 'Risco de internação e gravidade'),
  compulsory_notification: withPriorityPageAudit(
    'compulsory_notification',
    'CCIH-2024/HOSP/NOTIF-COMP',
    'Notificação compulsória de microrganismos',
  ),
  isolation_precaution: linkedMetadata('CCIH-2024/HOSP/ISO-PREC', 'Isolamento e precauções'),
  suspect_mdr: linkedMetadata('CCIH-2024/HOSP/MDR-SUSP', 'Suspeita de multirresistência'),
  culture_before_antibiotic: withPriorityPageAudit(
    'culture_antibiogram',
    'CCIH-2024/HOSP/CULT-PREAB',
    'Cultura antes do antimicrobiano',
  ),
  urinary_catheter_observations: withPriorityPageAudit(
    'urinary_catheter_observations',
    'CCIH-2024/HOSP/CATH-UTI-OBS',
    'Cateter urinário — observações de uso',
  ),
  catheter_signs_of_cystitis: withPriorityPageAudit(
    'catheter_signs_of_cystitis',
    'CCIH-2024/HOSP/CATH-CYST-SIG',
    'Cateter urinário e sinais de cistite',
  ),
  nosocomial_reasoning: withPriorityPageAudit(
    'hospital_nosocomial_catheter_cystitis',
    'CCIH-2024/HOSP/NOSO',
    'Infecção nosocomial e vigilância',
  ),
  reassess_deescalate: withPriorityPageAudit(
    'stewardship_general',
    'CCIH-2024/HOSP/STEW-DEESC',
    'Reavaliação e descalonamento',
  ),
  avoid_unnecessary_escalation: withPriorityPageAudit(
    'stewardship_general',
    'CCIH-2024/HOSP/STEW-NO-ESC',
    'Evitar escalonamento desnecessário',
  ),
  antibiotic_may_not_be_indicated: withPriorityPageAudit(
    'culture_antibiogram',
    'CCIH-2024/HOSP/STEW-IND-REV',
    'Indicação de antimicrobiano',
  ),
}

export const RESISTANCE_INSTITUTIONAL_MAPPINGS: Record<string, InstitutionalContentMapping> = {
  mrsp: withPriorityPageAudit('mrsp', 'CCIH-2024/MICR/RES-MRSP', 'MRSP e precauções'),
  mrsa: withPriorityPageAudit('mrsa', 'CCIH-2024/MICR/RES-MRSA', 'MRSA e precauções'),
  esbl: withPriorityPageAudit('esbl', 'CCIH-2024/MICR/RES-ESBL', 'ESBL / Enterobacterales'),
  intrinsic_resistance: withPriorityPageAudit(
    'intrinsic_resistance',
    'CCIH-2024/MICR/RES-INTRINSIC',
    'Resistência intrínseca e interpretação',
  ),
  commensal_vs_pathogen: withPriorityPageAudit(
    'culture_antibiogram',
    'CCIH-2024/MICR/LAB-COMM-VS-PATH',
    'Comensal versus patógeno',
  ),
  low_value_sample: withPriorityPageAudit(
    'culture_antibiogram',
    'CCIH-2024/MICR/LAB-LOW-VAL',
    'Amostra de baixo valor interpretativo',
  ),
  adequate_sample_preatb: withPriorityPageAudit(
    'culture_antibiogram',
    'CCIH-2024/MICR/LAB-PREAB',
    'Amostragem pré-antimicrobiano',
  ),
}

export const THEMATIC_CC_INSTITUTIONAL_MAPPINGS: Record<string, InstitutionalContentMapping> = {
  clinical_group_yellow: withPriorityPageAudit(
    'clinical_group_yellow',
    'CCIH-2024/CLS/GROUP-YELLOW',
    'Grupo amarelo (classificação clínica assistencial)',
  ),
  clinical_group_red: withPriorityPageAudit(
    'clinical_group_red',
    'CCIH-2024/CLS/GROUP-RED',
    'Grupo vermelho (classificação clínica assistencial)',
  ),
  stewardship_general: withPriorityPageAudit(
    'stewardship_general',
    'CCIH-2024/STEW/GENERAL',
    'Stewardship antimicrobiano geral',
  ),
  culture_antibiogram: withPriorityPageAudit(
    'culture_antibiogram',
    'CCIH-2024/LAB/CULT-AB',
    'Cultura, antibiograma e interpretação laboratorial',
  ),
}

export const MOLECULE_SHEET_INSTITUTIONAL_MAPPINGS: Record<string, InstitutionalContentMapping> = {
  mol_amoxicillin_clavulanate: linkedMetadata('CCIH-2024/PHARM/MOL-AMOX-CLAV', 'Formulário / uso institucional — amoxicilina-clavulanato'),
  mol_ampicillin_sulbactam: linkedMetadata('CCIH-2024/PHARM/MOL-AMP-SULB', 'Formulário / uso institucional — ampicilina-sulbactam'),
  mol_cefazolin: linkedMetadata('CCIH-2024/PHARM/MOL-CEFAZ', 'Formulário / uso institucional — cefazolina'),
  mol_clindamycin: linkedMetadata('CCIH-2024/PHARM/MOL-CLINDA', 'Formulário / uso institucional — clindamicina'),
  mol_doxycycline: linkedMetadata('CCIH-2024/PHARM/MOL-DOXY', 'Formulário / uso institucional — doxiciclina'),
  mol_enrofloxacin: linkedMetadata('CCIH-2024/PHARM/MOL-ENRO', 'Formulário / uso institucional — enrofloxacino'),
  mol_gentamicin: linkedMetadata('CCIH-2024/PHARM/MOL-GENTA', 'Formulário / uso institucional — gentamicina'),
  mol_marbo: linkedMetadata('CCIH-2024/PHARM/MOL-MARBO', 'Formulário / uso institucional — marbofloxacino'),
  mol_metronidazole: linkedMetadata('CCIH-2024/PHARM/MOL-METRO', 'Formulário / uso institucional — metronidazol'),
}

export function getSyndromeInstitutionalMapping(syndromeId: string): InstitutionalContentMapping | undefined {
  return SYNDROME_INSTITUTIONAL_MAPPINGS[syndromeId]
}

export function getHospitalCardInstitutionalMapping(cardId: string): InstitutionalContentMapping | undefined {
  return HOSPITAL_CARD_INSTITUTIONAL_MAPPINGS[cardId]
}

export function getResistanceInstitutionalMapping(conceptId: string): InstitutionalContentMapping | undefined {
  return RESISTANCE_INSTITUTIONAL_MAPPINGS[conceptId]
}

export function getMoleculeInstitutionalMapping(moleculeSheetId: string): InstitutionalContentMapping | undefined {
  return MOLECULE_SHEET_INSTITUTIONAL_MAPPINGS[moleculeSheetId]
}

export function listThematicCcInstitutionalMappings(): InstitutionalContentMapping[] {
  return Object.values(THEMATIC_CC_INSTITUTIONAL_MAPPINGS)
}

const isMeta = (m: InstitutionalContentMapping) => m.linkStatus === 'linked_verified_metadata'
const isPage = (m: InstitutionalContentMapping) => m.linkStatus === 'linked_verified_page_locator'

/** Contagem por domínio — apenas linked_verified_metadata. */
export function countLinkedVerifiedMetadataMappings(): {
  syndromes: number
  hospitalCards: number
  resistance: number
  molecules: number
  thematic: number
} {
  const count = (rec: Record<string, InstitutionalContentMapping>) => Object.values(rec).filter(isMeta).length
  return {
    syndromes: count(SYNDROME_INSTITUTIONAL_MAPPINGS),
    hospitalCards: count(HOSPITAL_CARD_INSTITUTIONAL_MAPPINGS),
    resistance: count(RESISTANCE_INSTITUTIONAL_MAPPINGS),
    molecules: count(MOLECULE_SHEET_INSTITUTIONAL_MAPPINGS),
    thematic: count(THEMATIC_CC_INSTITUTIONAL_MAPPINGS),
  }
}

/** Contagem por domínio — linked_verified_page_locator (páginas registadas após auditoria humana). */
export function countLinkedVerifiedPageLocatorMappings(): {
  syndromes: number
  hospitalCards: number
  resistance: number
  molecules: number
  thematic: number
} {
  const count = (rec: Record<string, InstitutionalContentMapping>) => Object.values(rec).filter(isPage).length
  return {
    syndromes: count(SYNDROME_INSTITUTIONAL_MAPPINGS),
    hospitalCards: count(HOSPITAL_CARD_INSTITUTIONAL_MAPPINGS),
    resistance: count(RESISTANCE_INSTITUTIONAL_MAPPINGS),
    molecules: count(MOLECULE_SHEET_INSTITUTIONAL_MAPPINGS),
    thematic: count(THEMATIC_CC_INSTITUTIONAL_MAPPINGS),
  }
}
