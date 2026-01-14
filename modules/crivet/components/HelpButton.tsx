import React, { useState } from 'react'
import type { TooltipId } from '../data/help.registry'
import { HELP_REGISTRY } from '../data/help.registry'
import { HelpModal } from './HelpModal'

type Props = {
  id: TooltipId
}

export function HelpButton({ id }: Props) {
  const [open, setOpen] = useState(false)
  const item = HELP_REGISTRY[id]

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
        {item.content}
      </HelpModal>
    </>
  )
}
