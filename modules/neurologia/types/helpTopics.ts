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
}
