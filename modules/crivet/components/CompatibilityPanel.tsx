import React from 'react'
import type { DrugCompatibility, DiluentId, DiluentCompatibility } from '../types/drug'
import { AlertTriangle } from 'lucide-react'
import { getDrugProfile } from '../utils/drugProfileRegistry'
import { normalizeDrug } from '../services/normalizeDrug'

type Props = {
  compat: DrugCompatibility
  selectedDiluentId?: DiluentId
  drugId?: string // Adicionar drugId para acessar perfil normalizado
}

/**
 * Mapeia DiluentId para nome do diluente (para verificar na lista geral)
 */
function getDiluentName(diluentId: DiluentId): string {
  const mapping: Record<DiluentId, string> = {
    NaCl_09: 'NaCl 0,9%',
    RL: 'Ringer Lactato',
    D5W: 'Glicose 5%',
  }
  return mapping[diluentId] || ''
}

/**
 * Verifica se um diluente está na lista de incompatíveis (normalizada)
 */
function isIncompatible(normalizedCompat: any, diluentName: string): boolean {
  if (!normalizedCompat?.incompatible || normalizedCompat.incompatible.length === 0) return false
  return normalizedCompat.incompatible.some((inc: any) => {
    const agent = inc.agent?.toLowerCase() || ''
    const why = inc.why?.toLowerCase() || ''
    const diluentLower = diluentName.toLowerCase()
    return agent.includes(diluentLower) || why.includes(diluentLower) || 
           (diluentName.includes('Bicarbonato') && agent.includes('bicarbonato'))
  })
}

function getDiluentStatus(
  compat: DrugCompatibility, 
  selected: DiluentId,
  normalizedCompat?: any
): DiluentCompatibility | null {
  // Primeiro, tentar encontrar status específico na tabela por diluente
  if (compat.diluents && compat.diluents.length > 0) {
    const specific = compat.diluents.find((d) => d.diluentId === selected)
    if (specific) return specific
  }

  // Se não houver específico, usar compatibilidade geral
  if (normalizedCompat) {
    const diluentName = getDiluentName(selected)
    
    // Verificar se está na lista de incompatíveis
    if (isIncompatible(normalizedCompat, diluentName)) {
      return {
        diluentId: selected,
        label: diluentName,
        status: 'avoid',
        reason: 'Incompatível de acordo com dados gerais do fármaco.',
      }
    }

    // Verificar se está na lista de compatíveis gerais
    const allowedList = normalizedCompat.diluentsAllowed || []
    const isInAllowedList = allowedList.some((allowed: string) => {
      const allowedLower = allowed.toLowerCase()
      const nameLower = diluentName.toLowerCase()
      return allowedLower.includes(nameLower) || nameLower.includes(allowedLower) ||
             (selected === 'NaCl_09' && (allowedLower.includes('sf') || allowedLower.includes('nacl') || allowedLower.includes('soro fisiológico'))) ||
             (selected === 'RL' && (allowedLower.includes('ringer') || allowedLower.includes('rl'))) ||
             (selected === 'D5W' && (allowedLower.includes('glicose') || allowedLower.includes('sg') || allowedLower.includes('dextrose')))
    })

    if (isInAllowedList) {
      return {
        diluentId: selected,
        label: diluentName,
        status: 'compatible',
        reason: 'Compatível de acordo com dados gerais do fármaco.',
      }
    }
  }

  // Fallback: verificar lista legada (compatibleDiluent)
  if (compat.compatibleDiluent && compat.compatibleDiluent.length > 0) {
    const diluentName = getDiluentName(selected)
    const isInLegacyList = compat.compatibleDiluent.some((allowed: string) => {
      const allowedLower = allowed.toLowerCase()
      const nameLower = diluentName.toLowerCase()
      return allowedLower.includes(nameLower) || nameLower.includes(allowedLower)
    })

    if (isInLegacyList) {
      return {
        diluentId: selected,
        label: diluentName,
        status: 'compatible',
        reason: 'Compatível de acordo com dados do fármaco.',
      }
    }
  }

  // Se não encontrou nada, retornar null (será tratado como "Sem dados")
  return null
}

export function CompatibilityPanel({ compat, selectedDiluentId, drugId }: Props) {
  // Obter perfil normalizado se drugId foi fornecido
  const profile = drugId ? getDrugProfile(drugId) : null
  let normalized = null
  try {
    normalized = profile ? normalizeDrug(profile) : null
  } catch (error) {
    console.warn(`Erro ao normalizar fármaco ${drugId}:`, error)
    normalized = null
  }

  const diluentStatus = selectedDiluentId 
    ? getDiluentStatus(compat, selectedDiluentId, normalized?.compatibility) 
    : null

  // Verificar se há dados de compatibilidade em qualquer lugar
  const hasAnyCompatibilityData = 
    (compat.diluents && compat.diluents.length > 0) ||
    (normalized?.compatibility.diluentsAllowed && normalized.compatibility.diluentsAllowed.length > 0) ||
    (compat.compatibleDiluent && compat.compatibleDiluent.length > 0) ||
    (normalized?.compatibility.incompatible && normalized.compatibility.incompatible.length > 0) ||
    (compat.incompatibilities && compat.incompatibilities.length > 0)

  return (
    <div className="mt-2 rounded-md border border-white/10 bg-white/5 p-3 text-sm">
      <p className="font-semibold mb-2 text-white/90">Compatibilidade com o fluido selecionado</p>

      {diluentStatus ? (
        <div className="flex items-start gap-3">
          <div
            className={[
              'mt-0.5 rounded-full px-2 py-0.5 text-xs font-semibold',
              diluentStatus.status === 'compatible'
                ? 'bg-emerald-400/10 text-emerald-300 border border-emerald-300/30'
                : diluentStatus.status === 'avoid'
                ? 'bg-red-400/10 text-red-200 border border-red-300/30'
                : 'bg-yellow-400/10 text-yellow-200 border border-yellow-300/30',
            ].join(' ')}
          >
            {diluentStatus.status === 'compatible'
              ? '✅ Compatível'
              : diluentStatus.status === 'avoid'
              ? '⛔ Evitar'
              : '⚠️ Sem dados'}
          </div>

          <div>
            <p className="text-white/90">{diluentStatus.label}</p>
            <p className="text-white/70 text-xs mt-1">{diluentStatus.reason}</p>
          </div>
        </div>
      ) : hasAnyCompatibilityData ? (
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full px-2 py-0.5 text-xs font-semibold bg-yellow-400/10 text-yellow-200 border border-yellow-300/30">
            ⚠️ Verifique dados gerais
          </div>
          <div>
            <p className="text-white/90">{getDiluentName(selectedDiluentId!)}</p>
            <p className="text-white/70 text-xs mt-1">
              Dados específicos não disponíveis para este diluente, mas há informações de compatibilidade geral.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-xs text-white/60">Sem dados de compatibilidade para este diluente.</p>
      )}

      {/* Seção completa de compatibilidade (opcional, pode manter ou remover) */}
      {(compat.compatibleMeds?.length ?? 0) > 0 ||
      (compat.incompatibilities?.length ?? 0) > 0 ||
      (compat.materialWarnings?.length ?? 0) > 0 ? (
        <div className="mt-4 pt-4 border-t border-white/10">
          {compat.compatibleMeds?.length ? (
            <div className="mb-3">
              <p className="font-medium text-blue-400 mb-1">✅ Misturas geralmente aceitas</p>
              <p className="text-white/70 text-xs opacity-90">{compat.compatibleMeds.join(' • ')}</p>
            </div>
          ) : null}

          {compat.incompatibilities?.length ? (
            <div className="mb-3">
              <p className="font-medium text-red-400 mb-1 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                ⛔ Incompatibilidades
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                {compat.incompatibilities.map((x) => (
                  <li key={x.name} className="text-white/70">
                    <span className="font-medium">{x.name}:</span>{' '}
                    <span
                      className={
                        x.severity === 'critical'
                          ? 'text-red-300'
                          : x.severity === 'warning'
                          ? 'text-amber-300'
                          : ''
                      }
                    >
                      {x.message}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {compat.materialWarnings?.length ? (
            <div>
              <p className="font-medium text-amber-400 mb-1">⚠️ Avisos práticos</p>
              <ul className="list-disc pl-5 space-y-1 opacity-90 text-white/70 text-xs">
                {compat.materialWarnings.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
