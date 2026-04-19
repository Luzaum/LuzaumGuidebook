import type { AntibioticMolecule } from '../model/types'

/** Catálogo mínimo referenciado por ID nos regimes piloto. */
export const ANTIBIOTIC_MOLECULES: Record<string, AntibioticMolecule> = {
  mol_amoxicillin_clavulanate: {
    id: 'mol_amoxicillin_clavulanate',
    displayName: 'Amoxicilina + ácido clavulânico',
    classId: 'aminopenicillin_beta_lactamase_inhibitor',
    ruleTags: ['beta_lactam'],
    referenceKey: 'ref_placeholders.v2_general',
  },
  mol_ampicillin_sulbactam: {
    id: 'mol_ampicillin_sulbactam',
    displayName: 'Ampicilina + sulbactam',
    classId: 'aminopenicillin_beta_lactamase_inhibitor',
    ruleTags: ['beta_lactam'],
    referenceKey: 'ref_placeholders.v2_general',
  },
  mol_enrofloxacin: {
    id: 'mol_enrofloxacin',
    displayName: 'Enrofloxacina',
    classId: 'fluoroquinolone',
    ruleTags: ['fluoroquinolone'],
    referenceKey: 'ref_placeholders.v2_general',
  },
  mol_marbo: {
    id: 'mol_marbo',
    displayName: 'Marbofloxacina',
    classId: 'fluoroquinolone',
    ruleTags: ['fluoroquinolone'],
    referenceKey: 'ref_placeholders.v2_general',
  },
  mol_metronidazole: {
    id: 'mol_metronidazole',
    displayName: 'Metronidazol',
    classId: 'nitroimidazole',
    ruleTags: ['nitroimidazole'],
    referenceKey: 'ref_placeholders.v2_general',
  },
  mol_clindamycin: {
    id: 'mol_clindamycin',
    displayName: 'Clindamicina',
    classId: 'lincosamide',
    ruleTags: ['lincosamide'],
    referenceKey: 'ref_placeholders.v2_general',
  },
  mol_doxycycline: {
    id: 'mol_doxycycline',
    displayName: 'Doxiciclina',
    classId: 'tetracycline',
    ruleTags: ['tetracycline'],
    referenceKey: 'ref_placeholders.v2_general',
  },
  mol_cefovecin: {
    id: 'mol_cefovecin',
    displayName: 'Cefovecina (UL)',
    classId: 'cephalosporin_3g',
    ruleTags: ['cephalosporin_3g'],
    referenceKey: 'ref_placeholders.v2_general',
  },
  mol_penicillin_g: {
    id: 'mol_penicillin_g',
    displayName: 'Penicilina G benzatina / procaina (conforme protocolo)',
    classId: 'penicillin',
    ruleTags: ['beta_lactam'],
    referenceKey: 'ref_placeholders.v2_general',
  },
  mol_azithromycin: {
    id: 'mol_azithromycin',
    displayName: 'Azitromicina',
    classId: 'macrolide',
    ruleTags: ['macrolide'],
    referenceKey: 'ref_placeholders.v2_general',
  },
  mol_gentamicin: {
    id: 'mol_gentamicin',
    displayName: 'Gentamicina',
    classId: 'aminoglycoside',
    ruleTags: ['aminoglycoside'],
    referenceKey: 'ref_placeholders.v2_general',
  },
  mol_cefazolin: {
    id: 'mol_cefazolin',
    displayName: 'Cefazolina (1ª geração)',
    classId: 'cephalosporin_1g',
    ruleTags: ['beta_lactam'],
    referenceKey: 'ref_placeholders.v2_periop',
  },
  /** Referência de classe para futuros regimes / exemplos didáticos (carbapeném). */
  mol_meropenem: {
    id: 'mol_meropenem',
    displayName: 'Meropenem',
    classId: 'carbapenem',
    ruleTags: ['beta_lactam'],
    referenceKey: 'ref_placeholders.v2_general',
  },
  /** Referência de classe (aminoglicosídeo). */
  mol_tobramycin: {
    id: 'mol_tobramycin',
    displayName: 'Tobramicina',
    classId: 'aminoglycoside',
    ruleTags: ['aminoglycoside'],
    referenceKey: 'ref_placeholders.v2_general',
  },
}
