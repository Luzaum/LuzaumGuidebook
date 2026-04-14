import React from 'react'
import Icon from './Icon'

interface ModalProps {
  open: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
  /** Modal largo e rolável (textos longos, ex.: fisiopatologia). */
  wide?: boolean
}

const Modal: React.FC<ModalProps> = ({ open, title, children, onClose, wide }) => {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/60 px-3 pb-8 pt-[max(3.5rem,env(safe-area-inset-top,0px))] animate-fade-in sm:px-8 sm:pb-10 sm:pt-[max(4.5rem,env(safe-area-inset-top,0px))]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Detalhes'}
    >
      <div
        className={`my-2 flex w-full flex-col overflow-hidden rounded-3xl shadow-2xl sm:my-4 ${
          wide ? 'max-w-[min(96vw,72rem)]' : 'max-w-xl'
        } max-h-[min(78vh,800px)]`}
        style={{
          background: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
          border: '1px solid hsl(var(--border))',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex shrink-0 items-center justify-between border-b px-4 py-3 sm:px-6 sm:py-4"
          style={{ borderColor: 'hsl(var(--border))' }}
        >
          <h3 className="pr-4 text-lg font-bold sm:text-xl" style={{ color: 'hsl(var(--foreground))' }}>
            {title || 'Detalhes'}
          </h3>
          <button
            type="button"
            className="shrink-0 rounded-lg p-1 transition hover:opacity-80"
            style={{ color: 'hsl(var(--muted-foreground))' }}
            onClick={onClose}
            aria-label="Fechar"
          >
            <Icon name="close" />
          </button>
        </div>
        <div
          className={`min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5 ${wide ? 'text-[hsl(var(--foreground))]' : 'whitespace-pre-line leading-relaxed'} `}
          style={{ color: wide ? undefined : 'hsl(var(--muted-foreground))' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
