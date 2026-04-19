import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button } from './Button'
import { cn } from '../../../../lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: React.ReactNode
}

const sizeStyles: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  /** Ocupa quase todo o viewport — relatório rápido e leituras longas */
  full: 'max-w-[min(99vw,100rem)] w-full',
}

export function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  /** Portal para `document.body`: evita ficar preso ao stacking context da área principal (z-10) abaixo da sidebar (z-30). */
  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-1 backdrop-blur-sm sm:p-3"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'neuro-modal-title' : undefined}
        className={cn(
          'relative w-full bg-neutral-900 border border-gold/20 rounded-2xl shadow-2xl max-h-[min(92vh,56rem)] overflow-hidden',
          sizeStyles[size],
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 id="neuro-modal-title" className="text-xl font-semibold text-white">
              {title}
            </h2>
            <Button
              variant="ghost"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}

        <div className="max-h-[calc(96vh-4.5rem)] overflow-y-auto p-4 sm:p-6">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
