import React from 'react'
import { HelpModal } from './HelpModal'
import { TOOLTIP_REGISTRY, TooltipId } from '../data/tooltips.registry'

type Props = {
  id: TooltipId
  className?: string
  title?: string
}

export function HelpTooltip({ id, className, title }: Props) {
  const content = TOOLTIP_REGISTRY[id]
  const displayTitle = title || id.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  if (!content) {
    console.warn(`Tooltip ID "${id}" não encontrado no registry`)
    return null
  }

  return <HelpModal title={displayTitle} content={content} buttonClassName={className} />
}
