import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

export type HelpModalProps = {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

export function HelpModal({ open, title, onClose, children }: HelpModalProps) {
  useEffect(() => {
    if (!open) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    /* Bloqueia scroll do body enquanto o modal está aberto */
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  const modal = (
    /* z-[9999] garante que fica acima de qualquer seção da página */
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Painel do modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-modal-title"
        className="
          relative z-10
          w-full max-w-2xl
          rounded-2xl
          border border-white/10
          bg-[#0b1220]
          shadow-2xl shadow-black/60
          flex flex-col
          max-h-[85vh]
          animate-[cv-result-appear_0.2s_ease-out]
        "
      >
        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-4 flex-shrink-0">
          <div>
            <p id="help-modal-title" className="text-base font-semibold text-white leading-snug">
              {title}
            </p>
            <p className="text-xs text-white/50 mt-0.5">Ajuda clínica • CriVET 2.0</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex-shrink-0
              rounded-lg border border-white/15 bg-white/5
              px-3 py-1.5
              text-sm font-medium text-white/80
              hover:bg-white/10 hover:text-white
              transition-colors
            "
          >
            Fechar
          </button>
        </div>

        {/* Conteúdo com scroll interno */}
        <div className="overflow-y-auto px-5 py-4 text-sm leading-relaxed text-white/90 flex-1">
          {children}
        </div>
      </div>
    </div>
  )

  /* Renderiza no <body> via portal — evita ser cortado por overflow:hidden de qualquer pai */
  return createPortal(modal, document.body)
}
