/** IDs canônicos de síndromes v2 (bloco clínico principal). */
export type SyndromeId =
  | 'piometra'
  | 'metrite_aguda'
  | 'endometrite'
  | 'cistite_esporadica'
  | 'cistite_recorrente'
  | 'pielonefrite'
  | 'pneumonia'
  | 'piotórax'
  | 'sepse'
  | 'perioperatorio'
  | 'prostatite'
  | 'rinite'
  | 'traqueobronquite'
  | 'oral_extracao_dentaria'
  | 'gengivite_periodontite'
  | 'fcgs'
  | 'ferida_mordedura'
  | 'artrite_septica'
  | 'osteomielite'
  | 'bacteriuria_subclinica'

/** Ordem de exibição no guia por suspeita (v2 primeiro). */
export const SYNDROME_V2_DISPLAY_ORDER: SyndromeId[] = [
  'piometra',
  'metrite_aguda',
  'endometrite',
  'cistite_esporadica',
  'cistite_recorrente',
  'pielonefrite',
  'pneumonia',
  'piotórax',
  'sepse',
  'perioperatorio',
  'prostatite',
  'rinite',
  'traqueobronquite',
  'oral_extracao_dentaria',
  'gengivite_periodontite',
  'fcgs',
  'ferida_mordedura',
  'artrite_septica',
  'osteomielite',
  'bacteriuria_subclinica',
]

export const SYNDROME_IDS: SyndromeId[] = [...SYNDROME_V2_DISPLAY_ORDER]

export function isSyndromeId(v: string): v is SyndromeId {
  return (SYNDROME_IDS as string[]).includes(v)
}
