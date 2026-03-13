import { Category } from '../../types/category';

export const categoriesSeed: Category[] = [
  {
    id: 'cat-1',
    slug: 'infecciosas',
    title: 'Doenças Infecciosas',
    description: 'Condições infecciosas com foco em triagem, isolamento e conduta inicial.',
    sortOrder: 1,
  },
  {
    id: 'cat-2',
    slug: 'endocrinologia',
    title: 'Endocrinologia',
    description: 'Distúrbios hormonais e metabólicos com abordagem clínica objetiva.',
    sortOrder: 2,
  },
  {
    id: 'cat-3',
    slug: 'gastroenterologia',
    title: 'Gastroenterologia',
    description: 'Doenças gastrointestinais e terapias de suporte.',
    sortOrder: 3,
  },
  {
    id: 'cat-4',
    slug: 'nefrologia',
    title: 'Nefrologia e Urologia',
    description: 'Alterações renais e urinárias com acompanhamento longitudinal.',
    sortOrder: 4,
  },
  {
    id: 'cat-5',
    slug: 'cardiologia',
    title: 'Cardiologia',
    description: 'Doenças cardiovasculares e monitorização clínica.',
    sortOrder: 5,
  },
  {
    id: 'cat-6',
    slug: 'dermatologia',
    title: 'Dermatologia',
    description: 'Dermatopatias infecciosas, alérgicas e autoimunes.',
    sortOrder: 6,
  },
  {
    id: 'cat-7',
    slug: 'neurologia',
    title: 'Neurologia',
    description: 'Síndromes neurológicas, crises e sequela funcional.',
    sortOrder: 7,
  },
  {
    id: 'cat-8',
    slug: 'oncologia',
    title: 'Oncologia',
    description: 'Conceitos oncológicos essenciais para decisão rápida.',
    sortOrder: 8,
  },
];
