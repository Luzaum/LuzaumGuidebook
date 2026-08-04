/** Registro interno de fontes científicas — não expor IDs na UI. */

export const SOURCE_VERSIONS = {
  fediaf2025: 'FEDIAF Nutritional Guidelines, September 2025',
  nrc2006: 'Nutrient Requirements of Dogs and Cats, NRC 2006',
  avcn2024: 'Applied Veterinary Clinical Nutrition, 2nd ed., 2024',
  hospital2015: 'Nutritional Management of Hospitalized Small Animals, 2015',
  microbiomes2024: 'Small Animal Microbiomes and Nutrition, 2024',
  aaha2021: 'AAHA Nutrition and Weight Management Guidelines, 2021',
  wsava: 'WSAVA Global Nutrition Guidelines',
  pna: 'Pet Nutrition Alliance',
} as const

export type SourceKey = keyof typeof SOURCE_VERSIONS

export function getSourceLabel(key: SourceKey): string {
  return SOURCE_VERSIONS[key]
}

export function getSourceVersionList(keys: SourceKey[]): string[] {
  return keys.map((k) => SOURCE_VERSIONS[k])
}
