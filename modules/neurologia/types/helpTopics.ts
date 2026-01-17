export type HelpTopic = {
  id: string
  title: string
  whatItAssesses: string
  neuroanatomy: string
  howToPerform: string
  interpretation: string
  pitfalls: string
  imageSlot?: {
    enabled: boolean
    caption: string
  }
  // Campos lógicos/metadados (não exibidos, apenas para motor do app)
  tags?: string[] // ex: ["propriocepcao", "vias-longas", "UMN", "T3-L3", "prosencefalo"]
  severityWeight?: 1 | 2 | 3 // Peso para ranking de hipóteses
  localizationHint?: string[] // Sugestões de neurolocalização
}
