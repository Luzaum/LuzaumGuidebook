import React, { useEffect } from 'react'
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
      className="fixed inset-0 z-[80] flex items-center justify-center px-4 pointer-events-auto"
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
          'relative w-full max-w-xl rounded-2xl border shadow-xl',
          isDark
            ? 'bg-neutral-900 border-neutral-700 text-neutral-100'
            : 'bg-white border-neutral-200 text-neutral-900',
        ].join(' ')}
      >
        <div className="flex items-start justify-between gap-3 p-4 border-b border-neutral-700/30">
          <div>
            <div className="text-xs uppercase tracking-wide opacity-70">Ajuda Clínica</div>
            <h3 className="text-lg font-semibold leading-snug">{topic.title}</h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={[
              'shrink-0 rounded-full px-3 py-1 text-sm font-medium',
              isDark ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-100 hover:bg-neutral-200',
            ].join(' ')}
            aria-label="Fechar ajuda"
          >
            Fechar
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[70vh] overflow-auto">
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

        <div className="p-4 border-t border-neutral-700/30 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-semibold bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
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
