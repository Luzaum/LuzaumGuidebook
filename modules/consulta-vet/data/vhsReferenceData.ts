export type VhsSpecies = 'dog' | 'cat';

export type VhsReference = {
  id: string;
  label: string;
  species: VhsSpecies;
  lifeStage: 'adult' | 'puppy';
  mean?: number;
  standardDeviation?: number;
  lower: number;
  upper: number;
  intervalBasis: 'published-range' | 'derived-2sd';
};

export type VhsInterpretation = {
  status: 'below' | 'within' | 'above';
  title: string;
  summary: string;
};

type BreedReferenceSeed = {
  id: string;
  label: string;
  mean: number;
  standardDeviation: number;
};

const DOG_BREED_SEEDS: BreedReferenceSeed[] = [
  { id: 'australian-cattle-dog', label: 'Australian Cattle Dog', mean: 10.5, standardDeviation: 0.5 },
  { id: 'beagle', label: 'Beagle', mean: 10.3, standardDeviation: 0.4 },
  { id: 'boston-terrier', label: 'Boston Terrier', mean: 11.7, standardDeviation: 1.4 },
  { id: 'boxer', label: 'Boxer', mean: 11.6, standardDeviation: 0.8 },
  { id: 'bulldog', label: 'Bulldog', mean: 12.7, standardDeviation: 1.7 },
  { id: 'cavalier-king-charles-spaniel', label: 'Cavalier King Charles Spaniel', mean: 10.6, standardDeviation: 0.5 },
  { id: 'chihuahua', label: 'Chihuahua', mean: 10.0, standardDeviation: 0.6 },
  { id: 'dachshund', label: 'Dachshund', mean: 9.7, standardDeviation: 0.5 },
  { id: 'dobermann', label: 'Dobermann', mean: 10.0, standardDeviation: 0.6 },
  { id: 'german-shepherd-dog', label: 'Pastor-alemão', mean: 9.7, standardDeviation: 0.7 },
  { id: 'greyhound', label: 'Greyhound', mean: 10.5, standardDeviation: 0.1 },
  { id: 'labrador-retriever', label: 'Labrador Retriever', mean: 10.8, standardDeviation: 0.6 },
  { id: 'lhasa-apso', label: 'Lhasa Apso', mean: 9.6, standardDeviation: 0.8 },
  { id: 'norwich-terrier', label: 'Norwich Terrier', mean: 10.6, standardDeviation: 0.6 },
  { id: 'pomeranian', label: 'Spitz alemão / Pomeranian', mean: 10.5, standardDeviation: 0.9 },
  { id: 'pug', label: 'Pug', mean: 10.7, standardDeviation: 0.9 },
  { id: 'rottweiler', label: 'Rottweiler', mean: 9.8, standardDeviation: 0.1 },
  { id: 'whippet', label: 'Whippet', mean: 11.0, standardDeviation: 0.5 },
  { id: 'yorkshire-terrier', label: 'Yorkshire Terrier', mean: 9.7, standardDeviation: 0.5 },
];

function roundToTenth(value: number) {
  return Math.round(value * 10) / 10;
}

export const VHS_REFERENCES: VhsReference[] = [
  {
    id: 'dog-general',
    label: 'Cão adulto — multirraças',
    species: 'dog',
    lifeStage: 'adult',
    mean: 9.7,
    standardDeviation: 0.5,
    lower: 8.5,
    upper: 10.5,
    intervalBasis: 'published-range',
  },
  {
    id: 'dog-puppy',
    label: 'Cão filhote',
    species: 'dog',
    lifeStage: 'puppy',
    lower: 8.5,
    upper: 10.5,
    intervalBasis: 'published-range',
  },
  ...DOG_BREED_SEEDS.map<VhsReference>((reference) => ({
    ...reference,
    species: 'dog',
    lifeStage: 'adult',
    lower: roundToTenth(reference.mean - reference.standardDeviation * 2),
    upper: roundToTenth(reference.mean + reference.standardDeviation * 2),
    intervalBasis: 'derived-2sd',
  })),
  {
    id: 'cat-general',
    label: 'Gato — referência geral',
    species: 'cat',
    lifeStage: 'adult',
    mean: 7.5,
    standardDeviation: 0.3,
    lower: 6.9,
    upper: 8.1,
    intervalBasis: 'derived-2sd',
  },
];

export const VHS_SOURCE = {
  title: 'BSAVA Manual of Canine and Feline Thoracic Imaging',
  edition: '2ª edição',
  year: 2024,
  chapter: 'Capítulo 9 — The heart and great vessels',
  pages: 'pp. 179–180 (PDF pp. 186–187), Figuras 9.15–9.16',
  authors: 'Joanna Dukes-McEwan; eds. Tobias Schwarz e Peter Scrivani',
} as const;

export function calculateVhs(longAxisV: number, shortAxisV: number): number {
  if (!Number.isFinite(longAxisV) || !Number.isFinite(shortAxisV) || longAxisV <= 0 || shortAxisV <= 0) {
    return 0;
  }

  return roundToTenth(longAxisV + shortAxisV);
}

export function interpretVhs(vhs: number, reference: VhsReference): VhsInterpretation {
  if (vhs < reference.lower) {
    return {
      status: 'below',
      title: 'Abaixo da faixa selecionada',
      summary:
        'O escore está abaixo do intervalo de comparação. Revise inspiração, posicionamento, marcos e condição corporal; um VHS baixo ou normal não exclui cardiopatia.',
    };
  }

  if (vhs > reference.upper) {
    return {
      status: 'above',
      title: 'Acima da faixa selecionada',
      summary:
        'O escore sustenta aumento radiográfico da silhueta cardíaca quando a técnica está adequada, mas não fecha diagnóstico nem identifica a câmara envolvida. Correlacione com clínica e ecocardiografia.',
    };
  }

  return {
    status: 'within',
    title: 'Dentro da faixa selecionada',
    summary:
      'O escore está dentro do intervalo de comparação escolhido. Isso não exclui cardiopatia; radiografias têm limitações para tamanho de câmaras e devem ser integradas à avaliação clínica.',
  };
}
