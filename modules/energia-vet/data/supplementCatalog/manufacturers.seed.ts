import type { SupplementManufacturer } from '../../lib/supplementCatalog/types'

/** Fabricantes nacionais — CODEX suplementos BR (corte 2026-08-04). */
export const supplementManufacturersSeed: SupplementManufacturer[] = [
  { id: 'mfr-avert', slug: 'avert', name: 'Avert', country: 'BR', officialUrl: 'https://www.avert.com.br' },
  { id: 'mfr-vetnil', slug: 'vetnil', name: 'Vetnil', country: 'BR', officialUrl: 'https://www.vetnil.com.br' },
  { id: 'mfr-organnact', slug: 'organnact', name: 'Organnact', country: 'BR', officialUrl: 'https://www.organnact.com.br' },
  { id: 'mfr-botupharma', slug: 'botupharma', name: 'Botupharma Pet', country: 'BR', officialUrl: 'https://www.botupharma.com.br' },
  { id: 'mfr-nutripharme', slug: 'nutripharme', name: 'Nutripharme', country: 'BR', officialUrl: 'https://www.nutripharme.com.br' },
  { id: 'mfr-soft-care', slug: 'soft-care', name: 'Soft Care', country: 'BR' },
  { id: 'mfr-syntec', slug: 'syntec', name: 'Syntec', country: 'BR' },
  { id: 'mfr-agener-uniao', slug: 'agener-uniao', name: 'Agener União', country: 'BR' },
  { id: 'mfr-ourofino', slug: 'ourofino', name: 'Ourofino Saúde Animal', country: 'BR', officialUrl: 'https://www.ourofino.com' },
  { id: 'mfr-virbac', slug: 'virbac', name: 'Virbac Brasil', country: 'BR', officialUrl: 'https://www.virbac.com.br' },
  { id: 'mfr-coveli', slug: 'coveli', name: 'Coveli', country: 'BR' },
  { id: 'mfr-nutrisana', slug: 'nutrisana', name: 'Mundo Animal — Nutrisana', country: 'BR' },
  { id: 'mfr-happy-med', slug: 'happy-med', name: 'Happy Med', country: 'BR' },
  { id: 'mfr-buddy-nutrition', slug: 'buddy-nutrition', name: 'Buddy Nutrition', country: 'BR' },
  { id: 'mfr-inovet', slug: 'inovet', name: 'Inovet', country: 'BR' },
  { id: 'mfr-bioctal', slug: 'bioctal', name: 'Bioctal', country: 'BR' },
  { id: 'mfr-purina-fortiflora', slug: 'purina-fortiflora', name: 'Nestlé Purina — FortiFlora', country: 'BR' },
  { id: 'mfr-petz', slug: 'petz-private-label', name: 'Marcas próprias — Petz', country: 'BR', notes: 'Exige fabricante industrial e CNPJ; loja não é fabricante.' },
]

export const supplementManufacturerBySlug = Object.fromEntries(
  supplementManufacturersSeed.map((m) => [m.slug, m]),
) as Record<string, SupplementManufacturer>
