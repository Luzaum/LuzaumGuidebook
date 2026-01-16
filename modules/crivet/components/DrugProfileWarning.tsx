/**
 * Componente de Aviso de Perfil de Fármaco Incompleto
 * Exibe alertas quando informações estão faltando no perfil do fármaco
 */

import React from 'react'
import { AlertTriangle, Info, XCircle, CheckCircle } from 'lucide-react'
import type { ValidationResult } from '../utils/drugProfileValidation'
import { getMissingFieldsBySection } from '../utils/drugProfileValidation'

interface DrugProfileWarningProps {
  validation: ValidationResult
  drugName: string
  onDismiss?: () => void
  showDetails?: boolean
}

export function DrugProfileWarning({
  validation,
  drugName,
  onDismiss,
  showDetails = false,
}: DrugProfileWarningProps) {
  const criticalMissing = validation.missing.filter((m) => m.severity === 'critical')
  const warningMissing = validation.missing.filter((m) => m.severity === 'warning')
  const infoMissing = validation.missing.filter((m) => m.severity === 'info')

  if (validation.isValid && validation.completeness === 100) {
    return (
      <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span className="font-medium">Perfil completo: {drugName} possui todas as informações necessárias.</span>
        </div>
      </div>
    )
  }

  const bySection = getMissingFieldsBySection(validation)

  return (
    <div
      className={`mb-4 rounded-lg border p-4 ${
        criticalMissing.length > 0
          ? 'border-red-500/50 bg-red-500/10 text-red-800 dark:text-red-400'
          : warningMissing.length > 0
          ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-800 dark:text-yellow-400'
          : 'border-blue-500/50 bg-blue-500/10 text-blue-800 dark:text-blue-400'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1">
          {criticalMissing.length > 0 ? (
            <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          )}
          <div className="flex-1">
            <div className="font-semibold mb-1">
              {criticalMissing.length > 0
                ? `⚠️ Perfil Incompleto: ${drugName}`
                : `ℹ️ Informações Parciais: ${drugName}`}
            </div>
            <div className="text-sm mb-2">
              Completude: <strong>{validation.completeness}%</strong> ({validation.missing.length} campos faltando)
            </div>

            {criticalMissing.length > 0 && (
              <div className="text-sm mb-2 font-medium">
                🔴 {criticalMissing.length} campo(s) crítico(s) faltando - podem impedir uso seguro
              </div>
            )}

            {showDetails && validation.missing.length > 0 && (
              <details className="mt-3">
                <summary className="cursor-pointer font-medium text-sm mb-2 hover:underline">
                  Ver campos faltando ({validation.missing.length})
                </summary>
                <div className="mt-2 space-y-3 text-sm">
                  {Object.entries(bySection).map(([section, fields]) => (
                    <div key={section} className="border-l-2 border-current/30 pl-3">
                      <div className="font-medium mb-1">{section}</div>
                      <ul className="space-y-1">
                        {fields.map((field, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span>
                              {field.severity === 'critical' ? '🔴' : field.severity === 'warning' ? '🟡' : '🔵'}
                            </span>
                            <span>
                              <code className="text-xs bg-black/10 dark:bg-white/10 px-1 rounded">{field.field}</code>:{' '}
                              {field.description}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            )}

            {validation.warnings.length > 0 && (
              <div className="mt-2 text-sm">
                <div className="font-medium mb-1">Avisos:</div>
                <ul className="list-disc list-inside space-y-1">
                  {validation.warnings.map((warning, idx) => (
                    <li key={idx}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-current/60 hover:text-current p-1"
            aria-label="Fechar aviso"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// Banner compacto para uso em lista de fármacos
export function DrugProfileStatusBadge({ completeness, hasCritical }: { completeness: number; hasCritical: boolean }) {
  if (completeness === 100) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/30">
        <CheckCircle className="h-3 w-3" />
        Completo
      </span>
    )
  }

  if (hasCritical) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/30">
        <XCircle className="h-3 w-3" />
        {completeness}% (Crítico)
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border border-yellow-500/30">
      <AlertTriangle className="h-3 w-3" />
      {completeness}%
    </span>
  )
}
