import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from './button'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }
    if (open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/50 dark:bg-black/70 transition-opacity"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-lg">
        {children}
      </div>
    </div>
  )
}

interface DialogContentProps {
  children: React.ReactNode
  onClose: () => void
}

export function DialogContent({ children, onClose }: DialogContentProps) {
  return (
    <div className="max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-lg border border-border bg-card text-card-foreground shadow-xl sm:max-h-[85dvh]">
      <button
        onClick={onClose}
        className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground sm:right-4 sm:top-4"
        aria-label="Fechar"
      >
        <X className="w-5 h-5" />
      </button>
      {children}
    </div>
  )
}

interface DialogHeaderProps {
  children: React.ReactNode
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return (
    <div className="border-b border-border px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
      {children}
    </div>
  )
}

interface DialogTitleProps {
  children: React.ReactNode
}

export function DialogTitle({ children }: DialogTitleProps) {
  return (
    <h2 className="text-xl font-bold text-foreground pr-8">
      {children}
    </h2>
  )
}

interface DialogTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

export function DialogTrigger({ asChild, children }: DialogTriggerProps) {
  return <>{children}</>
}
