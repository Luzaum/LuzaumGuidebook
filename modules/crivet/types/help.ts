export type HelpLevel = 'CRITICAL' | 'IMPORTANT' | 'INFO'
export type HelpHighlight = 'red' | 'yellow' | 'green'

export type HelpItem = {
  text: string
  highlight?: HelpHighlight
}

export type HelpSection = {
  level: HelpLevel
  items: HelpItem[]
}

export type HelpContent = {
  title: string
  sections: HelpSection[]
}
