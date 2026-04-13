import type { CultureRecommendationLevel, CultureRecommendationDetail } from '../model/types'

const COPY: Record<CultureRecommendationLevel, { summary: string; because: string[] }> = {
  strong: {
    summary: 'Cultura fortemente recomendada antes ou no início do antimicrobiano (quando seguro).',
    because: [
      'Reduz empirismo prolongado e permite descalonamento.',
      'Este quadro costuma justificar material de qualidade para guiar terapia.',
    ],
  },
  recommended: {
    summary: 'Cultura recomendada; priorizar antes do ATB quando o caso permitir.',
    because: [
      'Stewardship: espectro mais estreito após identificação.',
      'Útil para recidiva, falha terapêutica ou complicações.',
    ],
  },
  optional: {
    summary: 'Cultura opcional conforme disponibilidade e caso clínico.',
    because: ['Em alguns cenários ambulatoriais simples, a decisão local pode priorizar curso curto com reavaliação.'],
  },
  not_typically_indicated: {
    summary: 'Cultura frequentemente sem valor ou não indicada de rotina.',
    because: ['Interpretar com cautela conforme sítio e método de coleta.'],
  },
}

export function cultureDetail(level: CultureRecommendationLevel): CultureRecommendationDetail {
  const c = COPY[level]
  return { level, summary: c.summary, because: [...c.because] }
}
