// src/lib/drug-sources/catalog.ts

export type SourceId =
    | 'plumbs_vdh_10'
    | 'lumb_jones_6'
    | 'bsava_ecc_3'
    | 'nelson_couto_6'

export type SourceCatalogEntry = {
    id: SourceId
    short: string
    title: string
    edition: string
    year: number
}

export const SOURCE_CATALOG: Record<SourceId, SourceCatalogEntry> = {
    plumbs_vdh_10: {
        id: 'plumbs_vdh_10',
        short: "Plumb's 10e",
        title: "Plumb's Veterinary Drug Handbook",
        edition: '10th',
        year: 2024,
    },
    lumb_jones_6: {
        id: 'lumb_jones_6',
        short: 'Lumb & Jones 6e',
        title: 'Veterinary Anesthesia and Analgesia (Lumb & Jones)',
        edition: '6th',
        year: 2024,
    },
    bsava_ecc_3: {
        id: 'bsava_ecc_3',
        short: 'BSAVA ECC 3e',
        title: 'BSAVA Manual of Canine and Feline Emergency and Critical Care',
        edition: '3rd',
        year: 2012,
    },
    nelson_couto_6: {
        id: 'nelson_couto_6',
        short: 'Nelson & Couto 6e',
        title: 'Small Animal Internal Medicine (Nelson & Couto)',
        edition: '6th',
        year: 2019,
    },
} as const
