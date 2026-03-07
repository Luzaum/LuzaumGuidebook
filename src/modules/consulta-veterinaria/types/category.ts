export type Category = {
  id: string
  slug: string
  title: string
  description?: string
  icon?: string
  sortOrder: number
}

export type CategoryStats = {
  diseases: number
  consensuses: number
  medications: number
}

