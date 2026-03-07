import React, { useState } from 'react'
import type { TooltipId } from '../data/help.registry'
import { HELP_REGISTRY } from '../data/help.registry'
import { HelpModal } from './HelpModal'
import { HelpContentRenderer } from './HelpContent'

type Props = {
  id: TooltipId
  dynamicContent?: React.ReactNode
}

export function HelpButton({ id, dynamicContent }: Props) {
  const [open, setOpen] = useState(false)
  const item = HELP_REGISTRY[id]

  if (!item) {
    console.warn(`Help ID "${id}" não encontrado no registry`)
    return null
  }

  return (
    <>
      <button
        type="button"
        aria-label="Ajuda"
        onClick={() => setOpen(true)}
        className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-bold text-white hover:bg-white/20 active:scale-95"
      >
        ?
      </button>

      <HelpModal open={open} title={item.title} onClose={() => setOpen(false)}>
        <HelpContentRenderer content={item} />
        {dynamicContent && (
          <div className="mt-6 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {dynamicContent}
          </div>
        )}
      </HelpModal>
    </>
  )
}
