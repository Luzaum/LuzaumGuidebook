import React from 'react'
import type { TooltipId } from '../data/help.registry'
import { HelpButton } from './HelpButton'

type Props = {
  text: string
  tooltipId?: TooltipId
  className?: string
  rightSlot?: React.ReactNode
  dynamicTooltipContent?: React.ReactNode
}

export function FieldLabel({ text, tooltipId, className, rightSlot, dynamicTooltipContent }: Props) {
  return (
    <div className={`flex items-center justify-between gap-3 ${className || ''}`}>
      <div className="flex items-center">
        <label className="text-sm font-medium text-white">{text}</label>
        {tooltipId ? <HelpButton id={tooltipId} dynamicContent={dynamicTooltipContent} /> : null}
      </div>
      {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
    </div>
  )
}
