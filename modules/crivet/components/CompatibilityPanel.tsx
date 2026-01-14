import React from 'react'
import type { DrugCompatibility, DiluentId, DiluentCompatibility } from '../types/drug'
import { AlertTriangle } from 'lucide-react'

type Props = {
  compat: DrugCompatibility
  selectedDiluentId?: DiluentId
}

function getDiluentStatus(compat: DrugCompatibility, selected: DiluentId): DiluentCompatibility | null {
  if (!compat.diluents || compat.diluents.length === 0) return null
  return compat.diluents.find((d) => d.diluentId === selected) ?? null
}

export function CompatibilityPanel({ compat, selectedDiluentId }: Props) {
  const diluentStatus = selectedDiluentId ? getDiluentStatus(compat, selectedDiluentId) : null

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
