import type { InstitutionalContentMapping } from '../model/versionedSource'
import { MOLECULE_SHEET_INSTITUTIONAL_MAPPINGS } from './institutionalMappings'

/** Estado explícito de alinhamento com o Guia CCIH versionado (sem inferir página inexistente). */
export type InstitutionalConcordanceState = 'page_locator' | 'metadata_only'

export function concordanceStateFromMapping(
  m: InstitutionalContentMapping | undefined,
): InstitutionalConcordanceState | null {
  if (!m) return null
  if (m.linkStatus === 'linked_verified_page_locator') return 'page_locator'
  if (m.linkStatus === 'linked_verified_metadata') return 'metadata_only'
  return null
}

export function concordanceChipCopy(state: InstitutionalConcordanceState): { label: string; hint: string } {
  if (state === 'page_locator') {
    return {
      label: 'CCIH · página auditada',
      hint: 'Locator com páginas conferidas no exemplar restrito; o PDF não é distribuído pelo app.',
    }
  }
  return {
    label: 'CCIH · só metadados',
    hint: 'SectionRef e política registrados; páginas entram no código apenas após auditoria humana explícita.',
  }
}

/** Resumo do núcleo de moléculas v2 (fichas do módulo). */
export function summarizeV2MoleculeConcordance(): { pageLocator: number; metadataOnly: number; total: number } {
  let pageLocator = 0
  let metadataOnly = 0
  for (const m of Object.values(MOLECULE_SHEET_INSTITUTIONAL_MAPPINGS)) {
    const s = concordanceStateFromMapping(m)
    if (s === 'page_locator') pageLocator++
    else if (s === 'metadata_only') metadataOnly++
  }
  return { pageLocator, metadataOnly, total: pageLocator + metadataOnly }
}

/** Regimes não têm locator próprio no código: herdam o vínculo do perfil da síndrome. */
export const REGIMEN_CONCORDANCE_EXPLANATION =
  'Os regimes listados seguem a concordância institucional do perfil desta síndrome (sem página CCIH separada por regime no código).'
