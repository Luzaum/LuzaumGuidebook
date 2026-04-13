import React from 'react'
import Icon from './Icon'

interface ModalProps {
  open: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ open, title, children, onClose }) => {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Detalhes'}
    >
      <div
        className="w-full max-w-xl rounded-2xl p-6 shadow-2xl"
        style={{
          background: 'var(--card)',
          color: 'var(--card-foreground)',
          border: '1px solid var(--border)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
            {title || 'Detalhes'}
          </h3>
          <button
            type="button"
            className="rounded-lg p-1 transition hover:opacity-80"
            style={{ color: 'var(--muted-foreground)' }}
            onClick={onClose}
            aria-label="Fechar"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="whitespace-pre-line leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
