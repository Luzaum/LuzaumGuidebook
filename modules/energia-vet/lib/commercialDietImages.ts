export interface DietImageMetadata {
  imageUrl: string
  alt: string
  brandName: string
}

// Mapeamento curado de imagens com links diretos confiáveis
export const COMMERCIAL_DIET_IMAGES: Record<string, string> = {
  // Royal Canin Renais e Clínicas
  'royal-canin-renal-caes': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIVeTiZbdfrZDqT5_1UETYJF3eNczvVJXcWsfIK_IRA&s=10',
  'royal-canin-renal-small-dog': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIVeTiZbdfrZDqT5_1UETYJF3eNczvVJXcWsfIK_IRA&s=10',
  'racao-royal-canin-renal-special-caes': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIVeTiZbdfrZDqT5_1UETYJF3eNczvVJXcWsfIK_IRA&s=10',
  'pate-royal-canin-renal-canine': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIVeTiZbdfrZDqT5_1UETYJF3eNczvVJXcWsfIK_IRA&s=10',
  'royal-canin-vet-renal-canine-wet-410g': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIVeTiZbdfrZDqT5_1UETYJF3eNczvVJXcWsfIK_IRA&s=10',
  'royal-canin-renal-feline': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIVeTiZbdfrZDqT5_1UETYJF3eNczvVJXcWsfIK_IRA&s=10',
  'royal-canin-renal-special-feline': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIVeTiZbdfrZDqT5_1UETYJF3eNczvVJXcWsfIK_IRA&s=10',
  'royal-canin-vet-renal-feline-85g': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIVeTiZbdfrZDqT5_1UETYJF3eNczvVJXcWsfIK_IRA&s=10',
  'royal-canin-recovery-mousse': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIVeTiZbdfrZDqT5_1UETYJF3eNczvVJXcWsfIK_IRA&s=10',
  'pate-royal-canin-gastrointestinal-low-fat-canine': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIVeTiZbdfrZDqT5_1UETYJF3eNczvVJXcWsfIK_IRA&s=10',
  'royal-canin-veterinary-hypoallergenic-canine-pate': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIVeTiZbdfrZDqT5_1UETYJF3eNczvVJXcWsfIK_IRA&s=10',
  
  // Farmina Vet Life
  'racao-vetlife-renal-canine-farmina': 'https://www.farmina.com/fotoprodotti/1663748281_vetlife-canine-renal-2kg.png',
  'farmina-vet-life-caes-renal': 'https://www.farmina.com/fotoprodotti/1663748281_vetlife-canine-renal-2kg.png',
  'racao-vetlife-renal-feline-farmina': 'https://www.farmina.com/fotoprodotti/1663748281_vetlife-feline-renal-2kg.png',
  'pate-vetlife-renal-caes-farmina': 'https://www.farmina.com/fotoprodotti/1663748281_vetlife-canine-renal-wet.png',

  // PremieR Pet Nutrição Clínica
  'racao-premier-nutricao-clinica-renal': 'https://www.premierpet.com.br/wp-content/uploads/2021/04/premier-nutricao-clinica-renal-caes.png',
  'racao-premierpet-nutricao-clinica-renal-estagios-iniciais': 'https://www.premierpet.com.br/wp-content/uploads/2021/04/premier-nutricao-clinica-renal-estagios-iniciais.png',
  'premier-nutricao-clinica-renal-caes-pequeno': 'https://www.premierpet.com.br/wp-content/uploads/2021/04/premier-nutricao-clinica-renal-caes.png',
  'premier-nutricao-clinica-renal-caes-medio-grande': 'https://www.premierpet.com.br/wp-content/uploads/2021/04/premier-nutricao-clinica-renal-caes.png',
}

export function getCommercialDietImageUrl(foodId: string, foodName: string): string {
  if (COMMERCIAL_DIET_IMAGES[foodId]) {
    return COMMERCIAL_DIET_IMAGES[foodId]
  }

  const nameLower = foodName.toLowerCase()
  if (nameLower.includes('royal canin')) {
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIVeTiZbdfrZDqT5_1UETYJF3eNczvVJXcWsfIK_IRA&s=10'
  }
  if (nameLower.includes('renal')) {
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIVeTiZbdfrZDqT5_1UETYJF3eNczvVJXcWsfIK_IRA&s=10'
  }

  return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIVeTiZbdfrZDqT5_1UETYJF3eNczvVJXcWsfIK_IRA&s=10'
}
