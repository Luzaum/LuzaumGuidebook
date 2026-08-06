/** Chaves técnicas normalizadas (sem acento, ASCII). */
export function normalizeClinicalKey(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ç/gi, 'c')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

const DISPLAY_OVERRIDES: Record<string, string> = {
  cancer: 'Câncer',
  gestacao: 'Gestação',
  lactacao: 'Lactação',
  reproducao: 'Reprodução',
  inflamatoria: 'Inflamatória',
  inflamatória: 'Inflamatória',
  energetica: 'Energética',
  energetico: 'Energético',
  cardiaca: 'Cardíaca',
  hepatica: 'Hepática',
  pancreatica: 'Pancreática',
  urinaria: 'Urinária',
  doenca_intestinal_inflamatoria: 'Doença intestinal inflamatória',
  doenca_renal_cronica: 'Doença renal crônica',
}

/** Rótulo visível em português brasileiro correto. */
export function formatClinicalLabelPtBr(raw: string | null | undefined): string {
  if (!raw?.trim()) return 'Perfil clínico'

  let label = raw
    .replace(/_/g, ' ')
    .replace(/\s*-\s*%MS/gi, '')
    .replace(/\s*MS%/gi, '')
    .replace(/\s*-\s*%Contribuição Energética/gi, '')
    .replace(/\s*-\s*%Contribuicao Energetica/gi, '')
    .replace(/\s*-\s*100 kcal/gi, '')
    .replace(/\s*%MS/gi, '')
    .replace(/\bCancer\b/g, 'Câncer')
    .replace(/Inflamatoria/gi, 'Inflamatória')
    .replace(/\bGestacao\b/g, 'Gestação')
    .replace(/\bLactacao\b/g, 'Lactação')
    .replace(/\bReproducao\b/gi, 'Reprodução')
    .replace(/\bCondicao\b/gi, 'Condição')
    .replace(/\benergetica\b/gi, 'energética')
    .replace(/\benergetico\b/gi, 'energético')
    .replace(/\badult maintenance\b/gi, 'adulto em manutenção')
    .replace(/\bnormal activity\b/gi, 'atividade moderada')
    .replace(/\blow activity\b/gi, 'baixa atividade')
    .replace(/\bweight loss\b/gi, 'perda de peso')
    .replace(/\bgrowth\b/gi, 'crescimento')
    .replace(/\bgestation\b/gi, 'gestação')
    .replace(/\blactation\b/gi, 'lactação')
    .replace(/\s+/g, ' ')
    .trim()

  const key = normalizeClinicalKey(label.split(' ')[0] ?? label)
  if (DISPLAY_OVERRIDES[key]) {
    label = label.replace(new RegExp(`^${raw.split(' ')[0]}`, 'i'), DISPLAY_OVERRIDES[key])
  }

  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function resolveClinicalDisplayName(id: string, fallbackLabel?: string): string {
  const normalized = normalizeClinicalKey(id)
  if (DISPLAY_OVERRIDES[normalized]) return DISPLAY_OVERRIDES[normalized]
  return formatClinicalLabelPtBr(fallbackLabel ?? id)
}
