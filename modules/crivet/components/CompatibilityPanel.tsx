import React from 'react'
import { AlertTriangle, CheckCircle2, FlaskConical, Info, XCircle } from 'lucide-react'
import type { DiluentCompatibility, DiluentId, DrugCompatibility } from '../types/drug'
import { getDrugProfile } from '../utils/drugProfileRegistry'
import { normalizeDrug } from '../services/normalizeDrug'

type Props = {
  compat: DrugCompatibility
  selectedDiluentId?: DiluentId
  drugId?: string
}

type DiluentOption = {
  id: DiluentId
  label: string
  aliases: string[]
}

type DiluentStatus = {
  status: DiluentCompatibility['status']
  reason: string
}

const DILUENTS: DiluentOption[] = [
  { id: 'NaCl_09', label: 'NaCl 0,9%', aliases: ['nacl', 'sf', 'soro fisiologico', 'soro fisiológico', '0,9'] },
  { id: 'RL', label: 'Ringer Lactato', aliases: ['ringer', 'rl', 'lactato'] },
  { id: 'D5W', label: 'Glicose 5%', aliases: ['glicose', 'sg 5', 'd5w', 'dextrose'] },
]

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function hasAnyMatch(haystack: string, aliases: string[]): boolean {
  const clean = normalizeText(haystack)
  return aliases.some((alias) => clean.includes(normalizeText(alias)))
}

function getSpecificDiluentStatus(
  compat: DrugCompatibility,
  diluentId: DiluentId,
): DiluentStatus | null {
  const byDiluent = compat.diluents?.find((item) => item.diluentId === diluentId)
  if (!byDiluent) return null

  if (byDiluent.status === 'compatible') {
    return { status: 'compatible', reason: byDiluent.reason || 'Compatível conforme base do fármaco.' }
  }
  if (byDiluent.status === 'avoid') {
    return { status: 'avoid', reason: byDiluent.reason || 'Evitar conforme base do fármaco.' }
  }
  return { status: 'unknown', reason: byDiluent.reason || 'Sem dados específicos para este diluente.' }
}

function getNormalizedDiluentStatus(
  normalizedCompat: any,
  diluent: DiluentOption,
): DiluentStatus | null {
  if (!normalizedCompat) return null

  const incompatible = Array.isArray(normalizedCompat.incompatible) ? normalizedCompat.incompatible : []
  const hitIncompatible = incompatible.find((entry: any) => {
    const agent = typeof entry?.agent === 'string' ? entry.agent : ''
    const why = typeof entry?.why === 'string' ? entry.why : ''
    return hasAnyMatch(agent, diluent.aliases) || hasAnyMatch(why, diluent.aliases)
  })
  if (hitIncompatible) {
    return {
      status: 'avoid',
      reason: typeof hitIncompatible?.why === 'string' && hitIncompatible.why.trim()
        ? hitIncompatible.why
        : 'Incompatibilidade descrita no perfil do fármaco.',
    }
  }

  const allowed = Array.isArray(normalizedCompat.diluentsAllowed) ? normalizedCompat.diluentsAllowed : []
  const isAllowed = allowed.some((allowedItem: string) => hasAnyMatch(allowedItem, diluent.aliases))
  if (isAllowed) {
    return { status: 'compatible', reason: 'Compatível conforme perfil normalizado do fármaco.' }
  }

  return null
}

function getLegacyDiluentStatus(compat: DrugCompatibility, diluent: DiluentOption): DiluentStatus | null {
  if (!Array.isArray(compat.compatibleDiluent) || compat.compatibleDiluent.length === 0) return null
  const isAllowed = compat.compatibleDiluent.some((item) => hasAnyMatch(item, diluent.aliases))
  if (isAllowed) {
    return { status: 'compatible', reason: 'Compatível conforme lista legada de diluentes.' }
  }
  return null
}

function resolveDiluentStatus(
  compat: DrugCompatibility,
  diluent: DiluentOption,
  normalizedCompat: any,
): DiluentStatus {
  const specific = getSpecificDiluentStatus(compat, diluent.id)
  if (specific) return specific

  const normalized = getNormalizedDiluentStatus(normalizedCompat, diluent)
  if (normalized) return normalized

  const legacy = getLegacyDiluentStatus(compat, diluent)
  if (legacy) return legacy

  const hasCompatibilityContext =
    (compat.diluents?.length ?? 0) > 0 ||
    (compat.compatibleDiluent?.length ?? 0) > 0 ||
    (compat.incompatibilities?.length ?? 0) > 0 ||
    (normalizedCompat?.diluentsAllowed?.length ?? 0) > 0 ||
    (normalizedCompat?.incompatible?.length ?? 0) > 0

  if (hasCompatibilityContext) {
    return { status: 'unknown', reason: 'Sem dado específico para este diluente neste protocolo.' }
  }

  return { status: 'unknown', reason: 'Compatibilidade não cadastrada para este fármaco.' }
}

function statusClass(status: DiluentCompatibility['status']): string {
  if (status === 'compatible') return 'bg-emerald-500/10 text-emerald-300 border-emerald-400/35'
  if (status === 'avoid') return 'bg-rose-500/10 text-rose-300 border-rose-400/35'
  return 'bg-amber-500/10 text-amber-300 border-amber-400/35'
}

function statusLabel(status: DiluentCompatibility['status']): string {
  if (status === 'compatible') return 'Compatível'
  if (status === 'avoid') return 'Evitar'
  return 'Sem dados'
}

function hasPreferredSignal(reason: string): boolean {
  const normalized = normalizeText(reason)
  return normalized.includes('preferencial') || normalized.includes('ideal')
}

function StatusIcon({ status }: { status: DiluentCompatibility['status'] }) {
  if (status === 'compatible') return <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
  if (status === 'avoid') return <XCircle className="h-4 w-4" aria-hidden="true" />
  return <Info className="h-4 w-4" aria-hidden="true" />
}

export function CompatibilityPanel({ compat, selectedDiluentId, drugId }: Props) {
  const profile = drugId ? getDrugProfile(drugId) : null
  let normalizedCompat: any = null
  try {
    normalizedCompat = profile ? normalizeDrug(profile).compatibility : null
  } catch {
    normalizedCompat = null
  }

  const rows = DILUENTS.map((diluent) => {
    const resolved = resolveDiluentStatus(compat, diluent, normalizedCompat)
    return {
      ...diluent,
      ...resolved,
      isPreferred: hasPreferredSignal(resolved.reason),
    }
  })

  const selected = rows.find((row) => row.id === selectedDiluentId)

  return (
    <div className="mt-2 rounded-md border border-white/10 bg-white/5 p-3 text-sm">
      <p className="mb-2 font-semibold text-white/90">Compatibilidade com o fluido selecionado</p>

      {selected && (
        <div className="mb-3 rounded-md border border-cyan-400/25 bg-cyan-500/10 px-3 py-2">
          <p className="text-xs text-cyan-200/90">
            Fluido atual: <span className="font-semibold">{selected.label}</span> • {statusLabel(selected.status)}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {rows.map((row) => {
          const isSelected = selectedDiluentId === row.id
          return (
            <article
              key={row.id}
              className={[
                'rounded-md border p-2.5 transition-colors',
                isSelected ? 'border-cyan-300/60 bg-cyan-500/10' : 'border-white/10 bg-black/10',
                row.isPreferred ? 'crivet-diluent-preferred' : '',
              ].join(' ')}
              aria-label={`${row.label}: ${statusLabel(row.status)}`}
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-white/90">
                  <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="font-medium text-xs">{row.label}</span>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${statusClass(row.status)}`}>
                  <StatusIcon status={row.status} />
                  {statusLabel(row.status)}
                </span>
              </div>
              {row.isPreferred && (
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-cyan-200">Diluente ideal</p>
              )}
              <p className="text-[11px] leading-4 text-white/70">{row.reason}</p>
            </article>
          )
        })}
      </div>

      {(compat.compatibleMeds?.length ?? 0) > 0 ||
      (compat.incompatibilities?.length ?? 0) > 0 ||
      (compat.materialWarnings?.length ?? 0) > 0 ? (
        <div className="mt-4 border-t border-white/10 pt-3">
          {compat.compatibleMeds?.length ? (
            <div className="mb-3">
              <p className="mb-1 font-medium text-emerald-300">Misturas geralmente aceitas</p>
              <p className="text-xs text-white/75">{compat.compatibleMeds.join(' • ')}</p>
            </div>
          ) : null}

          {compat.incompatibilities?.length ? (
            <div className="mb-3">
              <p className="mb-1 flex items-center gap-1 font-medium text-rose-300">
                <AlertTriangle className="h-4 w-4" />
                Incompatibilidades
              </p>
              <ul className="list-disc space-y-1 pl-5 text-xs text-white/75">
                {compat.incompatibilities.map((entry) => (
                  <li key={entry.name}>
                    <span className="font-medium">{entry.name}:</span> {entry.message}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {compat.materialWarnings?.length ? (
            <div>
              <p className="mb-1 font-medium text-amber-300">Avisos práticos</p>
              <ul className="list-disc space-y-1 pl-5 text-xs text-white/75">
                {compat.materialWarnings.map((warning, idx) => (
                  <li key={idx}>{warning}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

