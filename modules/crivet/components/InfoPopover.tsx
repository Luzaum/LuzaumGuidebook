import React, { useEffect, useRef, useState } from 'react'

type Props = {
  content: React.ReactNode
  className?: string
}

export function InfoPopover({ content, className }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  // Fecha ao clicar fora
  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!open) return
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [open])

  // Fecha no ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div ref={ref} className={'relative inline-flex ' + (className ?? '')}>
      <button
        type="button"
        aria-label="Ajuda"
        onClick={() => setOpen((v) => !v)}
        className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/10 text-xs font-bold text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 active:scale-95 relative z-[60] pointer-events-auto transition-colors"
      >
        ?
      </button>

      {open ? (
        <div className="absolute left-0 top-7 z-[70] w-[360px] max-w-[90vw] rounded-lg border border-white/15 bg-[#0b1220] p-3 text-sm text-white shadow-xl">
          <div className="absolute -top-2 left-3 h-3 w-3 rotate-45 border-l border-t border-white/15 bg-[#0b1220]" />
          {content}
        </div>
      ) : null}
    </div>
  )
}
