import {
  COMMERCIAL_DIET_MEDIA_SEED,
  type CommercialDietMedia,
} from '../data/commercialDietMedia.seed'

export type { CommercialDietMedia }

export interface DietImageMetadata {
  imageUrl: string
  alt: string
  brandName: string
  productUrl?: string
}

/**
 * Dicionário retrocompatível contendo apenas a URL da imagem.
 */
export const COMMERCIAL_DIET_IMAGES: Record<string, string> = Object.fromEntries(
  Object.entries(COMMERCIAL_DIET_MEDIA_SEED).map(([id, item]) => [id, item.imageUrl])
)

/**
 * URLs dos portais oficiais de fabricantes para fallback inteligente.
 */
const BRAND_OFFICIAL_WEBSITES: Array<{ match: RegExp; url: string; brand: string }> = [
  { match: /royal\s*canin/i, url: 'https://www.royalcanin.com/br', brand: 'Royal Canin' },
  { match: /hill'?s/i, url: 'https://www.hillspet.com.br', brand: "Hill's Pet Nutrition" },
  { match: /farmina|vet\s*life/i, url: 'https://www.farmina.com/br', brand: 'Farmina' },
  { match: /premier|premio/i, url: 'https://www.premierpet.com.br', brand: 'PremieR Pet' },
  { match: /purina|pro\s*plan/i, url: 'https://www.purina.com.br', brand: 'Purina' },
  { match: /f[oó]rmula\s*natural|adimax/i, url: 'https://www.adimax.com.br', brand: 'Fórmula Natural' },
  { match: /equil[ií]brio/i, url: 'https://www.equilibrioveterinary.com.br', brand: 'Equilíbrio Veterinary' },
  { match: /pet\s*del[ií]cia/i, url: 'https://www.petdelicia.com.br', brand: 'Pet Delícia' },
  { match: /guabi/i, url: 'https://www.guabinatural.com.br', brand: 'Guabi Natural' },
  { match: /quatree/i, url: 'https://www.quatree.com.br', brand: 'Quatree' },
  { match: /granplus/i, url: 'https://www.granplus.com.br', brand: 'GranPlus' },
  { match: /golden/i, url: 'https://www.goldenpet.com.br', brand: 'Golden' },
]

/**
 * Normaliza o ID para busca com aliases (remove prefixos de forma cosmética).
 */
function normalizeId(id: string): string {
  return id
    .toLowerCase()
    .trim()
    .replace(/^(?:racao|pate|sache)-/i, '')
}

/**
 * Retorna os metadados de mídia completos (foto oficial + link do fabricante).
 */
export function getCommercialDietMedia(foodId: string, foodName?: string): CommercialDietMedia | null {
  if (!foodId) return null

  // 1. Busca direta exata por ID
  const direct = COMMERCIAL_DIET_MEDIA_SEED[foodId]
  if (direct) return direct

  // 2. Busca por ID normalizado
  const normId = normalizeId(foodId)
  for (const [key, item] of Object.entries(COMMERCIAL_DIET_MEDIA_SEED)) {
    if (normalizeId(key) === normId) {
      return item
    }
  }

  // 3. Busca por nome do produto se fornecido
  if (foodName) {
    const nameLower = foodName.toLowerCase()
    for (const [key, item] of Object.entries(COMMERCIAL_DIET_MEDIA_SEED)) {
      if (
        nameLower.includes(key.toLowerCase()) ||
        item.alt.toLowerCase().includes(nameLower) ||
        (item.alt.length > 8 && nameLower.includes(item.alt.toLowerCase()))
      ) {
        return item
      }
    }

    // 4. Fallback de marca com link do portal oficial
    for (const brand of BRAND_OFFICIAL_WEBSITES) {
      if (brand.match.test(foodName) || brand.match.test(foodId)) {
        return {
          brand: brand.brand,
          imageUrl: '',
          productUrl: brand.url,
          alt: foodName,
          verified: false,
        }
      }
    }
  }

  return null
}

/**
 * Retorna a URL da foto oficial da ração comercial, se disponível.
 */
export function getCommercialDietImageUrl(foodId: string, foodName?: string): string | null {
  const media = getCommercialDietMedia(foodId, foodName)
  if (media?.imageUrl) {
    return media.imageUrl
  }
  return COMMERCIAL_DIET_IMAGES[foodId] ?? null
}

/**
 * Retorna a URL da página oficial do produto no site da fabricante.
 */
export function getCommercialDietProductUrl(foodId: string, foodName?: string): string | null {
  const media = getCommercialDietMedia(foodId, foodName)
  return media?.productUrl ?? null
}
