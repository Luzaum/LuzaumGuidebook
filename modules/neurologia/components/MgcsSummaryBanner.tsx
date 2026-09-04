import React from 'react'
import { Activity } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { MgcsRecord } from '../data/glasgowMgcs'
import { formatMgcsLine, interpretMgcsTotal, isMgcsComplete, mgcsTotal } from '../data/glasgowMgcs'
import { Card } from './UI/Card'

type Props = {
  mgcs: MgcsRecord | null | undefined
  /** Rota da escala MGCS (web ou mobile). */
  glasgowPath?: string
  compact?: boolean
}

export function MgcsSummaryBanner({ mgcs, glasgowPath = '/neurologia/glasgow', compact = false }: Props) {
  if (!mgcs || (mgcs.motor == null && mgcs.brainstem == null && mgcs.consciousness == null)) {
    return null
  }

  const complete = isMgcsComplete(mgcs)
  const total = mgcsTotal(mgcs)
  const line = formatMgcsLine(mgcs)
  const band = total != null ? interpretMgcsTotal(total) : null

  if (compact) {
    return (
      <span className="inline-flex items-center rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] font-semibold text-rose-200 ring-1 ring-rose-500/30">
        {complete && total != null ? `MGCS ${total}/18` : 'MGCS parcial'}
      </span>
    )
  }

  return (
    <Card className="border-rose-500/25 bg-rose-950/20 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <Activity className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" aria-hidden />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-rose-100">Escala de Glasgow (MGCS)</h3>
            {complete && line && band ? (
              <>
                <p className="mt-1 font-mono text-lg font-bold text-rose-50">{total}/18</p>
                <p className="mt-1 text-xs text-rose-100/80">{line}</p>
                <p className="mt-2 text-sm text-rose-50/90">{band.shortText}</p>
              </>
            ) : (
              <p className="mt-1 text-sm text-rose-100/80">
                Seleção parcial — M {mgcs.motor ?? '?'}/6 · TE {mgcs.brainstem ?? '?'}/6 · NC{' '}
                {mgcs.consciousness ?? '?'}/6
              </p>
            )}
          </div>
        </div>
        <Link
          to={glasgowPath}
          className="shrink-0 rounded-lg border border-rose-400/35 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-100 transition hover:bg-rose-500/20"
        >
          {complete ? 'Rever MGCS' : 'Completar MGCS'}
        </Link>
      </div>
    </Card>
  )
}
