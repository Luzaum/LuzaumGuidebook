import React, { useEffect, useState } from 'react'

interface HelpConceptButtonProps {
  title: string
  subtitle?: string
  buttonLabel?: string
  children: React.ReactNode
  buttonClassName?: string
}

export default function HelpConceptButton({
  title,
  subtitle,
  buttonLabel = 'Ajuda',
  children,
  buttonClassName,
}: HelpConceptButtonProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <button
        type="button"
        className={buttonClassName || 'inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#3f6f31] bg-[#1a2f15] text-[#a8ff9a] hover:bg-[#24401d]'}
        onClick={() => setOpen(true)}
        title={buttonLabel}
      >
        <span className="material-symbols-outlined text-[18px]">help</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[98] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-[#376b2e] bg-[#12240f] text-slate-100 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#376b2e] bg-[#182f14] px-6 py-4">
              <div>
                <h3 className="text-xl font-bold">{title}</h3>
                {subtitle ? <p className="text-sm text-[#97ce8d]">{subtitle}</p> : null}
              </div>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#376b2e] text-[#b7e7af] hover:bg-[#26431f] hover:text-white"
                onClick={() => setOpen(false)}
                aria-label="Fechar janela"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="max-h-[calc(90vh-76px)] overflow-y-auto p-6">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  )
}
