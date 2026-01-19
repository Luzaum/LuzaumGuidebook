export type Species = 'dog' | 'cat'
export type PhysiologyState = 'Neonato' | 'Filhote' | 'Adulto' | 'Idoso'
export type Comorbidity = 'Cardiopata' | 'Endocrinopata' | 'Hepatopata' | 'Renopata'

export type FluidType = 'NaCl 0.9%' | 'Ringer Lactato' | 'SG 5%'

export interface Patient {
  species: Species
  weight: string
  physiology: PhysiologyState
  comorbidities: Comorbidity[]
}
