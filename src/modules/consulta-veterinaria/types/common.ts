export type ContentFlag = {
  isDemonstrative?: boolean
  warningLabel?: string
}

export type ClinicalSpecies = 'dog' | 'cat' | 'both'

export type EntityType = 'disease' | 'consensus' | 'medication'

export type SortOption = {
  value: string
  label: string
}

export type SelectOption = {
  value: string
  label: string
}

export type KeyValueItem = {
  label: string
  value: string
}

