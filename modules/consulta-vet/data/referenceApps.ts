import { modules } from '../../registry';

type ReferenceApp = {
  id: string;
  name: string;
  to: string;
  iconSrc?: string;
  description?: string;
  keywords?: string[];
};

const THUMBNAIL_ROOT = '/consulta-vet/reference-apps/thumbnails';
const moduleThumbnails: Record<string, string> = {
  'energia-vet': 'nutricao',
  'escalas-dor': 'escalas-dor',
};

export const REFERENCE_APPS: ReferenceApp[] = [
  ...modules.map((module) => {
    const thumbnail = moduleThumbnails[module.id];
    return {
      id: module.id,
      name: module.title,
      to: module.route,
      description: module.description,
      keywords: [module.id],
      iconSrc: thumbnail ? `${THUMBNAIL_ROOT}/${thumbnail}.webp` : module.iconImage,
    };
  }),
  { id: 'sara', name: 'SARA / SDRA', keywords: ['ARDS', 'síndrome da angústia respiratória aguda'], to: '/consulta-vet/referencias-rapidas/sara', iconSrc: `${THUMBNAIL_ROOT}/sara-lungs.webp` },
  {
    id: 'apple',
    name: 'APPLE Score',
    keywords: ['escore APPLE', 'gravidade clínica'],
    to: '/consulta-vet/referencias-rapidas/apple',
    iconSrc: `${THUMBNAIL_ROOT}/apple.webp`,
  },
  {
    id: 'oncologia',
    name: 'Oncologia',
    keywords: ['quimioterapia', 'superfície corporal', 'BSA'],
    to: '/consulta-vet/referencias-rapidas/oncologia',
    iconSrc: `${THUMBNAIL_ROOT}/oncologia-chemo.webp`,
  },
  {
    id: 'vhs',
    name: 'VHS',
    keywords: ['vertebral heart size', 'silhueta cardíaca', 'radiografia torácica'],
    to: '/consulta-vet/referencias-rapidas/vhs',
    iconSrc: `${THUMBNAIL_ROOT}/vhs.webp`,
  },
  {
    id: 'ultrassom',
    name: 'Ultrassom',
    keywords: ['ultrassonografia', 'ecografia'],
    to: '/consulta-vet/referencias-rapidas/ultrassom',
    iconSrc: `${THUMBNAIL_ROOT}/ultrassom.webp`,
  },
];
