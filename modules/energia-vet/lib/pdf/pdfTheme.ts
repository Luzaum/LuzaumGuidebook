export const PDF_PAGE = {
  width: 210,
  height: 297,
  marginLeft: 14,
  marginRight: 14,
  marginTop: 16,
  marginBottom: 18,
  contentWidth: 182,
} as const

export const PDF_COLORS = {
  brand: [229, 99, 10] as [number, number, number],
  text: [29, 26, 23] as [number, number, number],
  muted: [98, 89, 79] as [number, number, number],
  border: [222, 217, 208] as [number, number, number],
  headFill: [246, 244, 241] as [number, number, number],
  altFill: [251, 250, 248] as [number, number, number],
}

export const PDF_TEMPLATE_VERSION = 'nutrition-pdf-v5.0.0'
