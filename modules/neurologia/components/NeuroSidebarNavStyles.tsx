import React from 'react'
import { cn } from '../../../lib/utils'
import type { LucideIcon } from 'lucide-react'

/** Estilo alinhado ao menu principal (MAIN_NAV) em NeuroShell — mesma “peça” visual. */
export function neuroSidebarNavItemClassName(opts: {
  active: boolean
  /** Etapa já concluída (assistente de exame) */
  done?: boolean
}) {
  const { active, done } = opts
  if (active) {
    return cn(
      'border-gold/60 bg-gold/15 text-foreground shadow-[0_8px_30px_rgba(245,197,66,0.12)]',
    )
  }
  if (done) {
    return cn(
      'border-emerald-500/30 bg-emerald-500/[0.07] text-foreground hover:border-emerald-400/45 hover:bg-emerald-500/10',
    )
  }
  return cn(
    'border-transparent bg-background/40 text-muted-foreground hover:border-gold/30 hover:bg-card hover:text-foreground',
  )
}

export function NeuroSidebarIconWrap({
  active,
  done,
  children,
}: {
  active: boolean
  done?: boolean
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        'shrink-0 rounded-xl p-2',
        active && 'bg-gold/25 text-gold',
        !active && done && 'bg-emerald-500/20 text-emerald-300',
        !active && !done && 'bg-muted/80 text-gold',
      )}
    >
      {children}
    </span>
  )
}

export type NeuroSidebarNavIcon = LucideIcon
