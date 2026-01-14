import React, { useEffect } from 'react'

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

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[999]">
      {/* backdrop */}
      <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* modal */}
      <div className="absolute left-1/2 top-1/2 w-[720px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#0b1220] shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-base font-semibold text-white">{title}</p>
            <p className="text-xs text-white/60">Ajuda clínica • CRIVET 2.0</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80 hover:bg-white/10"
          >
            Fechar
          </button>
        </div>

        <div className="max-h-[70vh] overflow-auto px-5 py-4 text-sm leading-relaxed text-white/90">{children}</div>
      </div>
    </div>
  )
}
