import React, { useMemo, useState } from 'react'
import { helpTopicsById } from '../../data/helpTopics'
import type { HelpTopic } from '../../types/helpTopics'
import { HelpModal } from './HelpModal'

type Props = {
  topicId: string
  theme: 'dark' | 'light'
  size?: 'sm' | 'md'
}

export function HelpButton({ topicId, theme, size = 'sm' }: Props) {
  const [open, setOpen] = useState(false)

  const topic: HelpTopic | null = useMemo(() => {
    return helpTopicsById[topicId] ?? null
  }, [topicId])

  // Se não achar topic, não renderizar (evita placeholder feio)
  if (!topic) return null

  const dims = size === 'sm' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'
  const isDark = theme === 'dark'

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen(true)
        }}
        className={[
          'inline-flex items-center justify-center rounded-full border font-bold',
          dims,
          'transition-transform active:scale-95 pointer-events-auto',
          isDark
            ? 'border-yellow-500/60 bg-yellow-500 text-black hover:bg-yellow-400'
            : 'border-yellow-600/60 bg-yellow-500 text-black hover:bg-yellow-400',
          'shadow-[0_0_18px_rgba(234,179,8,0.25)]',
        ].join(' ')}
        aria-label="Abrir ajuda"
        title="Ajuda"
      >
        ?
      </button>

      <HelpModal open={open} onClose={() => setOpen(false)} topic={topic} theme={theme} />
    </>
  )
}
