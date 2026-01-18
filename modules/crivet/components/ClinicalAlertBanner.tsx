import React, { useState } from 'react'
import { AlertTriangle, Info, XCircle } from 'lucide-react'
import { HelpModal } from './HelpModal'
import { HelpContentRenderer } from './HelpContent'
import type { HelpContent } from '../types/help'
import type { AlertLevel } from '../types/patientFlags'

type Props = {
  level: AlertLevel
  title: string
  message: string
  helpTitle: string
  helpContent: HelpContent
}

export function ClinicalAlertBanner({ level, title, message, helpTitle, helpContent }: Props) {
  const [helpOpen, setHelpOpen] = useState(false)

  const iconClass =
    level === 'critical'
      ? 'text-red-500'
      : level === 'warning'
      ? 'text-amber-500'
      : 'text-blue-500'

  const bgClass =
    level === 'critical'
      ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      : level === 'warning'
      ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
      : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'

  const textClass =
    level === 'critical'
      ? 'text-red-900 dark:text-red-100'
      : level === 'warning'
      ? 'text-amber-900 dark:text-amber-100'
      : 'text-blue-900 dark:text-blue-100'

  const Icon = level === 'critical' ? XCircle : level === 'warning' ? AlertTriangle : Info

  const borderClass =
    level === 'critical'
      ? 'border-red-500/30'
      : level === 'warning'
      ? 'border-amber-500/30'
      : 'border-blue-500/30'

  return (
    <>
      <div className={`rounded-lg border p-3 ${bgClass}`}>
        <div className="flex items-start gap-3">
          <Icon className={`w-5 h-5 flex-shrink-0 ${iconClass} mt-0.5`} />
          <div className="flex-1 min-w-0">
            <p className={`font-semibold text-sm ${textClass}`}>{title}</p>
            <p className={`text-sm mt-1 ${textClass} opacity-90`}>{message}</p>
          </div>
          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            className={`h-6 w-6 rounded-full border ${borderClass} flex items-center justify-center text-sm font-medium flex-shrink-0 transition-colors ${iconClass}`}
            aria-label="Ajuda detalhada"
          >
            ?
          </button>
        </div>
      </div>
      <HelpModal open={helpOpen} title={helpTitle} onClose={() => setHelpOpen(false)}>
        <HelpContentRenderer content={helpContent} />
      </HelpModal>
    </>
  )
}
