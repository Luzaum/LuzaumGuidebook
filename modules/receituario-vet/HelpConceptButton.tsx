import React, { useState } from 'react'

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
        <div className="fixed inset-0 z-[98] flex items-center justify-center bg-black/70 px-4 py-8" onClick={() => setOpen(false)}>
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
                className="rounded-lg border border-[#376b2e] px-2 py-1 text-sm hover:bg-[#26431f]"
                onClick={() => setOpen(false)}
              >
                Fechar
              </button>
            </div>
            <div className="max-h-[calc(90vh-76px)] overflow-y-auto p-6">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  )
}
