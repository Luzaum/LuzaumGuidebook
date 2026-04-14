import type { Disease, TreatmentLineBlock, TreatmentRegime } from '../types'
import { safeList } from './dataUtils'

/** Coleta nomes de fármacos (catálogo) citados em todas as linhas de tratamento. */
export function collectDrugNamesFromDisease(d: Disease): string[] {
  const out: string[] = []
  const pushRegimes = (block?: TreatmentLineBlock) => {
    if (!block) return
    for (const r of safeList(block.regimes)) {
      for (const drug of safeList(r.drugs)) {
        if (drug.name) out.push(drug.name)
      }
    }
  }
  pushRegimes(d.firstLine)
  pushRegimes(d.secondLine)
  pushRegimes(d.thirdLine)
  return out
}

/** Texto plano para busca (sem referências institucionais nos dados). */
export function diseaseSearchBlob(d: Disease): string {
  const parts: string[] = [d.name, d.pathogens, d.notes, d.duration, d.pathophysiologyFull || '']
  const blockText = (b?: TreatmentLineBlock) => {
    if (!b) return
    parts.push(b.title, b.presentation)
    for (const r of safeList(b.regimes)) {
      for (const drug of safeList(r.drugs)) {
        parts.push(drug.name, drug.rationale)
      }
    }
  }
  blockText(d.firstLine)
  blockText(d.secondLine)
  blockText(d.thirdLine)
  return parts.filter(Boolean).join(' ')
}

export function regimeModeLabel(mode: TreatmentRegime['mode']): string {
  if (mode === 'combinacao_simultanea') return 'Associação (uso em conjunto no mesmo período)'
  return 'Opções excludentes (escolher uma; não combinar entre si como 1ª intenção)'
}
