import type { ConsultaVetHeroAccent } from '../components/layout/ConsultaVetSurface';

const SYMBOL_ROOT = '/assets/consulta-vet/consensus-symbols';

const CONSENSUS_SYMBOLS: Record<string, string> = {
  'icatcare-dtuif-felina-2025': `${SYMBOL_ROOT}/icatcare-dtuif-felina-2025.webp`,
  'leishmaniose-brasileiro-2020': `${SYMBOL_ROOT}/leishmaniose-brasileiro-2020.webp`,
  'iris-drc-2023': `${SYMBOL_ROOT}/iris-drc-2023.webp`,
  'acvim-cie-caes-2026': `${SYMBOL_ROOT}/acvim-cie-caes-2026.webp`,
  leptospirose: `${SYMBOL_ROOT}/leptospirose.webp`,
  'consenso-de-epilepsia': `${SYMBOL_ROOT}/consenso-de-epilepsia.webp`,
  'ddiv-em-caes': `${SYMBOL_ROOT}/ddiv-em-caes.webp`,
  'consenso-doenca-mixomatosa-de-miltral': `${SYMBOL_ROOT}/consenso-doenca-mixomatosa-de-miltral.webp`,
  'hipertensao-sistemica': `${SYMBOL_ROOT}/hipertensao-sistemica.webp`,
};

export function getConsensusSymbol(slug: string): string | null {
  return CONSENSUS_SYMBOLS[slug] || null;
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
  return 'primary';
}
