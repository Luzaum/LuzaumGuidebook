import { CLASS_STYLE } from '../constants'
import type { ClassStyle } from '../types'

/** Mapeia `classId` do catálogo v2 (`ANTIBIOTIC_MOLECULES`) para chave de `CLASS_STYLE`. */
const CLASS_ID_TO_STYLE_KEY: Record<string, keyof typeof CLASS_STYLE> = {
  aminopenicillin_beta_lactamase_inhibitor: 'penicilina',
  fluoroquinolone: 'fluoro',
  nitroimidazole: 'nitro',
  lincosamide: 'lincosamida',
  tetracycline: 'tetraciclina',
  cephalosporin_1g: 'cefalosporina',
  cephalosporin_3g: 'cefalosporina',
  cephalosporin_2g: 'cefalosporina',
  penicillin: 'penicilina',
  macrolide: 'macrolideo',
  aminoglycoside: 'aminoglico',
  carbapenem: 'carbapenemico',
  monobactam: 'penicilina',
  glycopeptide: 'glicopeptideo',
  lipopeptide: 'glicopeptideo',
  oxazolidinone: 'glicopeptideo',
  sulfonamide: 'sulfa',
  trimethoprim_synergy: 'sulfa',
  fosfomycin_class: 'fosfonato',
  rifamycin: 'rifamicina',
  phenicol: 'anfenicol',
}

export function getClassStyleForMoleculeClassId(classId: string): ClassStyle {
  const key = CLASS_ID_TO_STYLE_KEY[classId] ?? 'penicilina'
  return CLASS_STYLE[key] || CLASS_STYLE.penicilina
}
