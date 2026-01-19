import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import type { HelpTopic, RichContent } from '../../types/helpTopics'
import { RichTextRenderer } from './RichTextRenderer'

type Props = {
  open: boolean
  onClose: () => void
  topic: HelpTopic | null
  theme: 'dark' | 'light'
}

export function HelpModal({ open, onClose, topic, theme }: Props) {
  const isDark = theme === 'dark'

  // Fechar com ESC e bloquear scroll
  useEffect(() => {
    if (!open) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    // Bloquear scroll do body quando modal aberto
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEsc)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEsc)
    }
  }, [open, onClose])

  if (!open || !topic) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center sm:px-4 pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Ajuda: ${topic.title}`}
      onMouseDown={(e) => {
        // fechar ao clicar fora
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={`absolute inset-0 ${isDark ? 'bg-black/70' : 'bg-black/40'}`} />

      <div
        className={[
          'relative w-full flex flex-col',
          'fixed inset-0 sm:relative sm:inset-auto sm:max-w-xl sm:rounded-2xl sm:shadow-xl sm:h-auto',
          'h-[100dvh] sm:h-auto sm:max-h-[85vh]', // Mobile full height, desktop auto height constrained
          isDark
            ? 'bg-neutral-900 border-neutral-700 text-neutral-100'
            : 'bg-white border-neutral-200 text-neutral-900',
        ].join(' ')}
      >
        {/* Header - Sticky on mobile naturally due to flex col */}
        <div className="shrink-0 flex items-start justify-between gap-3 p-4 border-b border-neutral-700/30">
          <div>
            <div className="text-xs uppercase tracking-wide opacity-70">Ajuda Clínica</div>
            <h3 className="text-lg font-semibold leading-snug">{topic.title}</h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={[
              'shrink-0 rounded-full p-2',
              isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100',
            ].join(' ')}
            aria-label="Fechar ajuda"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto overscroll-contain">
          <Section title="O que avalia" content={topic.whatItAssesses} isDark={isDark} />
          <Section title="Neuroanatomia / Neurofisiologia" content={topic.neuroanatomy} isDark={isDark} />
          <Section title="Como executar" content={topic.howToPerform} isDark={isDark} />
          <Section title="Interpretação clínica" content={topic.interpretation} isDark={isDark} />
          <Section title="Armadilhas comuns" content={topic.pitfalls} isDark={isDark} />

          {topic.imageSlot?.enabled && (
            <div
              className={[
                'rounded-xl border p-3',
                isDark ? 'border-neutral-700 bg-neutral-800/40' : 'border-neutral-200 bg-neutral-50',
              ].join(' ')}
            >
              <div className="text-sm font-semibold">Imagem do teste (em breve)</div>
              <div className={`text-sm ${isDark ? 'opacity-80' : 'text-neutral-600'}`}>{topic.imageSlot.caption}</div>
            </div>
          )}
        </div>

        {/* Footer - Sticky bottom */}
        <div className="shrink-0 p-4 border-t border-neutral-700/30 flex justify-end pb-[env(safe-area-inset-bottom)]">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl px-6 py-3 sm:py-2 text-sm font-semibold bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  )
}

function Section({ title, content, isDark }: { title: string; content: string | RichContent[]; isDark: boolean }) {
  if (!content || (Array.isArray(content) && content.length === 0)) return null

  return (
    <div className="space-y-1">
      <div className={`text-sm font-semibold flex items-center gap-2 ${isDark ? 'text-gold' : 'text-yellow-600'}`}>
        {/* Ícone semântico baseado no título se desejado, ou apenas título */}
        {title}
      </div>
      <RichTextRenderer content={content} isDark={isDark} />
    </div>
  )
}
