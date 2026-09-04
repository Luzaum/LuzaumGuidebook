/** Caminho local do acervo bibliográfico do usuário — única fonte de PDFs de referência. */
export const ACERVO_PATH = 'C:\\Users\\luzau\\OneDrive\\Desktop\\Livros';

export type AcervoRole = 'anesthesia' | 'pharmacology' | 'internal';

export interface AcervoBook {
  id: string;
  title: string;
  shortLabel: string;
  authors: string;
  edition: string;
  filename: string;
  role: AcervoRole;
  priority: 1 | 2 | 3;
  note?: string;
}

/** Ordem de prioridade clínica: Lumb & Jones → Plumb's → Ettinger (medicina interna). */
export const ACERVO_BOOKS: AcervoBook[] = [
  {
    id: 'lumb-jones',
    title: 'Veterinary Anesthesia and Analgesia',
    shortLabel: 'Lumb & Jones',
    authors: 'Lumb & Jones',
    edition: '6ª ed.',
    filename: 'Lumb and Jones.pdf',
    role: 'anesthesia',
    priority: 1,
    note: 'Referência principal para anestesia, analgesia, CRI e protocolos multimodais.',
  },
  {
    id: 'plumbs',
    title: "Plumb's Veterinary Drug Handbook",
    shortLabel: "Plumb's",
    authors: 'Plumb',
    edition: '10ª ed.',
    filename: "Plumb's Veterinary Drug Handbook, 10th edition.pdf",
    role: 'pharmacology',
    priority: 2,
    note: 'Monografias de fármacos, doses, interações e receitas de mistura (MLK, FLK, DMLK).',
  },
  {
    id: 'ettinger',
    title: "Ettinger's Textbook of Veterinary Internal Medicine",
    shortLabel: 'Ettinger',
    authors: 'Ettinger et al.',
    edition: '9ª ed.',
    filename: "Ettinger's Textbook of Veterinary Internal Medicine,9ed 2024.pdf",
    role: 'internal',
    priority: 3,
    note: 'Medicina interna de pequenos animais (linha sucessora de Nelson & Couto).',
  },
];

export const getAcervoFilePath = (bookId: string): string | null => {
  const book = ACERVO_BOOKS.find((item) => item.id === bookId);
  return book ? `${ACERVO_PATH}\\${book.filename}` : null;
};

export const cite = {
  lumbJones: (page?: string | number) =>
    `Lumb & Jones, 6ª ed.${page != null ? `, p. ${page}` : ''}`,
  plumbs: (page?: string | number) =>
    `Plumb's, 10ª ed.${page != null ? `, p. ${page}` : ''}`,
  ettinger: (page?: string | number) =>
    `Ettinger, 9ª ed.${page != null ? `, p. ${page}` : ''}`,
};

/** Referências padrão citadas nos monografias do catálogo. */
export const DEFAULT_DRUG_REFERENCES = [
  cite.lumbJones(),
  cite.plumbs(),
  cite.ettinger(),
];
