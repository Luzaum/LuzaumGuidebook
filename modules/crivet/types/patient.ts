export type Species = 'dog' | 'cat'
export type PhysiologyState = 'Neonato' | 'Filhote' | 'Adulto' | 'Idoso'
export type Comorbidity = 'Cardiopata' | 'Endocrinopata' | 'Hepatopata' | 'Renopata'

export interface Patient {
  species: Species
  weight: string
  physiology: PhysiologyState
  comorbidities: Comorbidity[]
}
