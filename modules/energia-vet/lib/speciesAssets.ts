/** Incrementar quando trocar imagens em `public/` (espécie, ilustrações de dieta) para invalidar cache do browser. */
export const PUBLIC_IMAGE_CACHE_TAG = '2026-04-09'

export function publicImageUrl(path: string): string {
  return `${path}?v=${encodeURIComponent(PUBLIC_IMAGE_CACHE_TAG)}`
}

export const SPECIES_PHOTO = {
  dog: publicImageUrl('/foto-cao.jpg'),
  cat: publicImageUrl('/foto-gato.jpg'),
} as const

let speciesPhotosPreloaded = false

/** Preload + decode antecipado ao entrar no fluxo da calculadora (reduz “foto antiga” / placeholder → foto). */
export function preloadSpeciesPhotos(): void {
  if (typeof document === 'undefined' || speciesPhotosPreloaded) return
  speciesPhotosPreloaded = true

  const hrefs = [SPECIES_PHOTO.dog, SPECIES_PHOTO.cat]
  for (const href of hrefs) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = href
    document.head.appendChild(link)
  }
  for (const href of hrefs) {
    const img = new Image()
    img.src = href
  }
}
