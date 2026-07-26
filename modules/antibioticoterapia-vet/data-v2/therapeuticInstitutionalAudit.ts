/**
 * Matriz de auditoria terapêutica institucional (núcleo v2).
 *
 * Separa explicitamente:
 * - vínculo da molécula (ficha / formulário institucional em institutionalMappings)
 * - vínculo do regime sob um perfil de síndrome (sem linha de regime na diretriz no código)
 *
 * Regra: não promover “explícito por tabela” para regime — o código não mantém locator CCIH por regime nesta versão.
 */

import type { InstitutionalContentMapping } from '../model/versionedSource'
import { V2_LIBRARY_MOLECULE_IDS } from './antibiotics'
import { ANTIBIOTIC_REGIMENS } from './regimens'
import {
  getMoleculeInstitutionalMapping,
  getSyndromeInstitutionalMapping,
  MOLECULE_SHEET_INSTITUTIONAL_MAPPINGS,
} from './institutionalMappings'
import { SYNDROME_PROFILES_V2 } from './syndromes'

/** Estados semânticos da auditoria terapêutica institucional. */
export type TherapeuticInstitutionalAuditState =
  | 'explicitly_supported_by_institutional_table'
  | 'contextually_supported_by_syndrome'
  | 'institutionally_present_but_not_fully_closed'
  | 'metadata_only'
  | 'pending_audit'
  | 'outside_current_scope'

function mappingToMoleculeState(m: InstitutionalContentMapping | undefined): TherapeuticInstitutionalAuditState {
  if (!m) return 'pending_audit'
  if (m.linkStatus === 'linked_verified_page_locator') return 'explicitly_supported_by_institutional_table'
  if (m.linkStatus === 'linked_verified_metadata') return 'metadata_only'
  return 'pending_audit'
}

/**
 * Auditoria da ficha de molécula v2 (biblioteca alinhada a ANTIBIOTIC_SHEETS_V2).
 */
export function getMoleculeTherapeuticAudit(moleculeSheetId: string): {
  state: TherapeuticInstitutionalAuditState
  clinicianNote: string
} {
  if (!V2_LIBRARY_MOLECULE_IDS.includes(moleculeSheetId)) {
    return {
      state: 'outside_current_scope',
      clinicianNote: 'Não foi identificada recomendação institucional específica para esta molécula.',
    }
  }

  const m = getMoleculeInstitutionalMapping(moleculeSheetId)
  if (!m) {
    return {
      state: 'pending_audit',
      clinicianNote: 'Não foi identificada recomendação institucional específica para esta ficha.',
    }
  }

  const state = mappingToMoleculeState(m)
  if (state === 'explicitly_supported_by_institutional_table') {
    return {
      state,
      clinicianNote: 'A recomendação foi conferida na diretriz institucional, com páginas identificadas.',
    }
  }
  if (state === 'metadata_only') {
    return {
      state,
      clinicianNote: 'Há referência institucional geral, sem página específica para esta ficha.',
    }
  }
  return {
    state: 'pending_audit',
    clinicianNote: 'A relação com a diretriz institucional ainda não está definida para esta ficha.',
  }
}

/**
 * Coleta pares (síndrome, regime) usados nos cenários v2 — base para auditoria de regime em contexto.
 */
export function listSyndromeRegimenPairsV2(): Array<{ syndromeId: string; regimenId: string }> {
  const seen = new Set<string>()
  const out: Array<{ syndromeId: string; regimenId: string }> = []
  for (const [syndromeId, profile] of Object.entries(SYNDROME_PROFILES_V2)) {
    const scenarios = profile.scenarios
    if (!scenarios) continue
    for (const sc of Object.values(scenarios)) {
      for (const regimenId of [...sc.firstLineRegimenIds, ...sc.alternativeRegimenIds]) {
        const k = `${syndromeId}::${regimenId}`
        if (seen.has(k)) continue
        seen.add(k)
        out.push({ syndromeId, regimenId })
      }
    }
  }
  return out
}

/**
 * Auditoria do regime no contexto de um perfil de síndrome v2.
 * Não atribui "explicitly_supported_by_institutional_table" ao regime — não há entidade de regime na matriz CCIH do código.
 */
export function getRegimenTherapeuticAuditInSyndrome(
  syndromeId: string,
  regimenId: string,
): {
  state: TherapeuticInstitutionalAuditState
  clinicianNote: string
} {
  const regimen = ANTIBIOTIC_REGIMENS[regimenId]
  if (!regimen) {
    return {
      state: 'outside_current_scope',
      clinicianNote: 'Não foi identificada uma orientação específica para este regime.',
    }
  }

  const syndromeMap = getSyndromeInstitutionalMapping(syndromeId)
  if (!syndromeMap) {
    return {
      state: 'pending_audit',
      clinicianNote: 'Não foi identificada recomendação institucional específica para este perfil.',
    }
  }

  const syndromeHasPage = syndromeMap.linkStatus === 'linked_verified_page_locator'
  const syndromeMetadataOnly = syndromeMap.linkStatus === 'linked_verified_metadata'

  if (regimen.moleculeIds.length === 0) {
    if (syndromeHasPage) {
      return {
        state: 'contextually_supported_by_syndrome',
        clinicianNote:
          'A orientação procedimental está vinculada ao perfil clínico e foi conferida na diretriz institucional.',
      }
    }
    return {
      state: 'institutionally_present_but_not_fully_closed',
      clinicianNote:
        'Há orientação institucional para o perfil clínico, sem recomendação específica para este regime.',
    }
  }

  const moleculeStates = regimen.moleculeIds.map((id) => getMoleculeTherapeuticAudit(id).state)
  const anyOutside = moleculeStates.some((s) => s === 'outside_current_scope')
  const anyPending = moleculeStates.some((s) => s === 'pending_audit')

  if (anyOutside || anyPending) {
    return {
      state: 'institutionally_present_but_not_fully_closed',
      clinicianNote:
        'O esquema combina fármacos com níveis distintos de suporte institucional; interpretar conforme foco, cultura e protocolo local.',
    }
  }

  if (syndromeMetadataOnly && !syndromeHasPage) {
    return {
      state: 'institutionally_present_but_not_fully_closed',
      clinicianNote:
        'Há apoio institucional pelo perfil da síndrome, sem recomendação específica para este regime.',
    }
  }

  return {
    state: 'contextually_supported_by_syndrome',
    clinicianNote:
      'Regime apresentado sob perfil clínico institucional; vínculo direto à diretriz é pelo síndrome + fichas de molécula — não por tabela de regime isolada.',
  }
}

/** Rótulos discretos para UI (tom clínico, sem semáforo). */
export const THERAPEUTIC_AUDIT_LABEL: Record<TherapeuticInstitutionalAuditState, string> = {
  explicitly_supported_by_institutional_table: 'Recomendação conferida',
  contextually_supported_by_syndrome: 'Apoio pelo perfil clínico',
  institutionally_present_but_not_fully_closed: 'Orientação institucional parcial',
  metadata_only: 'Referência institucional geral',
  pending_audit: 'Sem recomendação institucional específica',
  outside_current_scope: 'Sem recomendação institucional específica',
}

export function summarizeMoleculeAuditStatesV2(): Record<TherapeuticInstitutionalAuditState, number> {
  const init = (): Record<TherapeuticInstitutionalAuditState, number> => ({
    explicitly_supported_by_institutional_table: 0,
    contextually_supported_by_syndrome: 0,
    institutionally_present_but_not_fully_closed: 0,
    metadata_only: 0,
    pending_audit: 0,
    outside_current_scope: 0,
  })
  const counts = init()
  for (const id of V2_LIBRARY_MOLECULE_IDS) {
    const { state } = getMoleculeTherapeuticAudit(id)
    counts[state]++
  }
  return counts
}

export function summarizeRegimenAuditStatesInV2Syndromes(): Record<TherapeuticInstitutionalAuditState, number> {
  const init = (): Record<TherapeuticInstitutionalAuditState, number> => ({
    explicitly_supported_by_institutional_table: 0,
    contextually_supported_by_syndrome: 0,
    institutionally_present_but_not_fully_closed: 0,
    metadata_only: 0,
    pending_audit: 0,
    outside_current_scope: 0,
  })
  const counts = init()
  for (const { syndromeId, regimenId } of listSyndromeRegimenPairsV2()) {
    const { state } = getRegimenTherapeuticAuditInSyndrome(syndromeId, regimenId)
    counts[state]++
  }
  return counts
}

/** Cobertura: moléculas com entrada em institutionalMappings (núcleo v2). */
export function countV2MoleculeMappingRows(): number {
  return Object.keys(MOLECULE_SHEET_INSTITUTIONAL_MAPPINGS).length
}
