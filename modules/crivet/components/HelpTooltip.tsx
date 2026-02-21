import React, { useState } from 'react'
import { HelpModal } from './HelpModal'
import { TOOLTIP_REGISTRY, TooltipId } from '../data/tooltips.registry'
import { HelpCircle } from 'lucide-react'

type Props = {
  id: TooltipId
  className?: string
  title?: string
}

export function HelpTooltip({ id, className, title }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const content = TOOLTIP_REGISTRY[id]
  const displayTitle = title || id.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  if (!content) {
    console.warn(`Tooltip ID "${id}" não encontrado no registry`)
    return null
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors ml-1 ${className || ''}`}
        aria-label="Mais informações"
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      <HelpModal open={isOpen} title={displayTitle} onClose={() => setIsOpen(false)}>
        {content}
      </HelpModal>
    </>
  )
}
