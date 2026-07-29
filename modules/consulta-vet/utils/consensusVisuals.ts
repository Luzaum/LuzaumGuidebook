import type { ConsultaVetHeroAccent } from '../components/layout/ConsultaVetSurface';

const SYMBOL_ROOT = '/assets/consulta-vet/consensus-symbols';

const CONSENSUS_SYMBOLS: Record<string, string> = {
  'aaha-diabetes-felino-2026': `${SYMBOL_ROOT}/aaha-diabetes-felino-2026.webp`,
  'icatcare-diabetes-felino-2025': `${SYMBOL_ROOT}/icatcare-diabetes-felino-2025.webp`,
  'aaha-endocrinopatias-caes-gatos-2023': `${SYMBOL_ROOT}/aaha-endocrinopatias-caes-gatos-2023.webp`,
  'aaha-diabetes-caes-gatos-2018-2022': `${SYMBOL_ROOT}/aaha-diabetes-caes-gatos-2018-2022.webp`,
  'aafp-hipertireoidismo-felino-2016': `${SYMBOL_ROOT}/aafp-hipertireoidismo-felino-2016.webp`,
  'acvim-hipercortisolismo-canino-2012': `${SYMBOL_ROOT}/acvim-hipercortisolismo-canino-2012.webp`,
  'alive-diabetes-cycle-1-2022': `${SYMBOL_ROOT}/alive-diabetes-cycle-1-2022.webp`,
  'alive-adrenais-cycle-2-2025': `${SYMBOL_ROOT}/alive-adrenais-cycle-2-2025.webp`,
  'alive-tireoide-cycle-3-2026': `${SYMBOL_ROOT}/alive-tireoide-cycle-3-2026.webp`,
  'isfm-diabetes-felino-2015': `${SYMBOL_ROOT}/isfm-diabetes-felino-2015.webp`,
  'acvim-mmvd-canina-2019': `${SYMBOL_ROOT}/acvim-mmvd-canina-2019.webp`,
  'acvim-cardiomiopatias-felinas-2020': `${SYMBOL_ROOT}/acvim-cardiomiopatias-felinas-2020.webp`,
  'acvim-hipertensao-pulmonar-canina-2020': `${SYMBOL_ROOT}/acvim-hipertensao-pulmonar-canina-2020.webp`,
  'esvc-dcm-canina-2003': `${SYMBOL_ROOT}/esvc-dcm-canina-2003.webp`,
  'esvc-dcm-dobermann-2017': `${SYMBOL_ROOT}/esvc-dcm-dobermann-2017.webp`,
  'dcm-screening-caes-2022': `${SYMBOL_ROOT}/dcm-screening-caes-2022.webp`,
  'curative-risco-trombotico-2022': `${SYMBOL_ROOT}/curative-risco-trombotico-2022.webp`,
  'curative-antitromboticos-2019': `${SYMBOL_ROOT}/curative-antitromboticos-2019.webp`,
  'consenso-cardiorrenal-2015': `${SYMBOL_ROOT}/consenso-cardiorrenal-2015.webp`,
  'acvim-valvular-canina-2009': `${SYMBOL_ROOT}/acvim-valvular-canina-2009.webp`,
  'icatcare-dtuif-felina-2025': `${SYMBOL_ROOT}/icatcare-dtuif-felina-2025.webp`,
  'iris-lra-2026': `${SYMBOL_ROOT}/iris-lra-2026.webp`,
  'iscaid-itu-caes-gatos-2019': `${SYMBOL_ROOT}/iscaid-itu-caes-gatos-2019.webp`,
  'acvim-urolitiase-caes-gatos-2016': `${SYMBOL_ROOT}/acvim-urolitiase-caes-gatos-2016.webp`,
  'acvim-incontinencia-urinaria-canina-2024': `${SYMBOL_ROOT}/acvim-incontinencia-urinaria-canina-2024.webp`,
  'iris-doenca-glomerular-canina-2013': `${SYMBOL_ROOT}/iris-doenca-glomerular-canina-2013.webp`,
  'isfm-drc-felina-2016': `${SYMBOL_ROOT}/isfm-drc-felina-2016.webp`,
  'terminologia-infeccoes-urinarias-2026': `${SYMBOL_ROOT}/terminologia-infeccoes-urinarias-2026.webp`,
  'acvim-proteinuria-caes-gatos-2005': `${SYMBOL_ROOT}/acvim-proteinuria-caes-gatos-2005.webp`,
  'leishmaniose-brasileiro-2020': `${SYMBOL_ROOT}/leishmaniose-brasileiro-2020.webp`,
  'iris-drc-2023': `${SYMBOL_ROOT}/iris-drc-2026.webp`,
  'acvim-cie-caes-2026': `${SYMBOL_ROOT}/acvim-cie-caes-2026.webp`,
  leptospirose: `${SYMBOL_ROOT}/leptospirose.webp`,
  'consenso-de-epilepsia': `${SYMBOL_ROOT}/consenso-de-epilepsia.webp`,
  'ddiv-em-caes': `${SYMBOL_ROOT}/ddiv-em-caes.webp`,
  'consenso-doenca-mixomatosa-de-miltral': `${SYMBOL_ROOT}/consenso-doenca-mixomatosa-de-miltral.webp`,
  'hipertensao-sistemica': `${SYMBOL_ROOT}/hipertensao-sistemica.webp`,
};

export type ConsensusEditorialStatus =
  | 'current'
  | 'complementary'
  | 'interdisciplinary'
  | 'historical'
  | 'terminology'
  | 'mixed';

const CONSENSUS_EDITORIAL_STATUSES: Record<string, ConsensusEditorialStatus> = {
  'aaha-diabetes-felino-2026': 'current',
  'icatcare-diabetes-felino-2025': 'current',
  'aaha-endocrinopatias-caes-gatos-2023': 'current',
  'aaha-diabetes-caes-gatos-2018-2022': 'mixed',
  'aafp-hipertireoidismo-felino-2016': 'complementary',
  'acvim-hipercortisolismo-canino-2012': 'complementary',
  'alive-diabetes-cycle-1-2022': 'terminology',
  'alive-adrenais-cycle-2-2025': 'terminology',
  'alive-tireoide-cycle-3-2026': 'terminology',
  'hipertensao-sistemica': 'interdisciplinary',
  'isfm-diabetes-felino-2015': 'historical',
  'acvim-mmvd-canina-2019': 'current',
  'acvim-cardiomiopatias-felinas-2020': 'current',
  'acvim-hipertensao-pulmonar-canina-2020': 'current',
  'esvc-dcm-canina-2003': 'complementary',
  'esvc-dcm-dobermann-2017': 'complementary',
  'dcm-screening-caes-2022': 'complementary',
  'curative-risco-trombotico-2022': 'interdisciplinary',
  'curative-antitromboticos-2019': 'interdisciplinary',
  'consenso-cardiorrenal-2015': 'interdisciplinary',
  'acvim-valvular-canina-2009': 'historical',
  'iris-drc-2023': 'current',
  'iris-lra-2026': 'current',
  'icatcare-dtuif-felina-2025': 'current',
  'iscaid-itu-caes-gatos-2019': 'current',
  'acvim-urolitiase-caes-gatos-2016': 'current',
  'acvim-incontinencia-urinaria-canina-2024': 'current',
  'iris-doenca-glomerular-canina-2013': 'complementary',
  'isfm-drc-felina-2016': 'complementary',
  'terminologia-infeccoes-urinarias-2026': 'terminology',
  'acvim-proteinuria-caes-gatos-2005': 'historical',
};

const STATUS_PRESENTATION: Record<
  ConsensusEditorialStatus,
  { label: string; className: string }
> = {
  current: {
    label: 'Vigente',
    className:
      'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
  },
  complementary: {
    label: 'Complementar',
    className:
      'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
  },
  interdisciplinary: {
    label: 'Interdisciplinar',
    className:
      'border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300',
  },
  historical: {
    label: 'Histórico',
    className:
      'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300',
  },
  terminology: {
    label: 'Terminologia',
    className:
      'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-300',
  },
  mixed: {
    label: 'Vigente em cães',
    className:
      'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/60 dark:text-violet-300',
  },
};

export function getConsensusSymbol(slug: string): string | null {
  return CONSENSUS_SYMBOLS[slug] || null;
}

export function getConsensusEditorialStatus(
  slug: string
): { label: string; className: string } | null {
  const status = CONSENSUS_EDITORIAL_STATUSES[slug];
  return status ? STATUS_PRESENTATION[status] : null;
}

export function getConsensusAccent(category?: string | null): ConsultaVetHeroAccent {
  const normalized = String(category || '')
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-');

  if (['infectologia', 'infecciosa', 'infecciosas'].includes(normalized)) return 'emerald';
  if (['nefrologia', 'urologia', 'nefrologia-urologia'].includes(normalized)) return 'amber';
  if (normalized === 'neurologia') return 'indigo';
  if (['gastroenterologia', 'gastrointestinal'].includes(normalized)) return 'pink';
  if (normalized === 'cardiologia') return 'rose';
  if (normalized === 'endocrinologia') return 'violet';
  return 'primary';
}
