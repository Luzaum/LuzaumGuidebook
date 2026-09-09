import React from 'react'
import { AlertTriangle, Info, CheckCircle2, AlertCircle, X } from 'lucide-react'

type BannerVariant = 'info' | 'warn' | 'warning' | 'error' | 'success'

interface InlineBannerProps {
  variant: BannerVariant
  title?: string
  message: string | string[]
  onClose?: () => void
  className?: string
}

const variantStyles: Record<
  BannerVariant,
  {
    container: string
    icon: React.ReactNode
    title: string
    text: string
  }
> = {
  info: {
    container: 'bg-blue-500/10 border-blue-500/30 dark:bg-blue-950/25',
    icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    title: 'text-blue-700 dark:text-blue-300',
    text: 'text-foreground/90',
  },
  warn: {
    container: 'bg-amber-500/10 border-amber-500/30 dark:bg-amber-950/25',
    icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    title: 'text-amber-700 dark:text-amber-300',
    text: 'text-foreground/90',
  },
  warning: {
    container: 'bg-amber-500/10 border-amber-500/30 dark:bg-amber-950/25',
    icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    title: 'text-amber-700 dark:text-amber-300',
    text: 'text-foreground/90',
  },
  error: {
    container: 'bg-red-500/10 border-red-500/30 dark:bg-red-950/25',
    icon: <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />,
    title: 'text-red-700 dark:text-red-300',
    text: 'text-foreground/90',
  },
  success: {
    container: 'bg-emerald-500/10 border-emerald-500/30 dark:bg-emerald-950/25',
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    title: 'text-emerald-700 dark:text-emerald-300',
    text: 'text-foreground/90',
  },
}

export function InlineBanner({ variant, title, message, onClose, className = '' }: InlineBannerProps) {
  const styles = variantStyles[variant] ?? variantStyles.info
  const messages = Array.isArray(message) ? message : [message]

  return (
    <div
      className={`rounded-lg border p-4 ${styles.container} ${className}`}
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">{styles.icon}</div>
        <div className="flex-1 space-y-1">
          {title && <h4 className={`text-sm font-semibold ${styles.title}`}>{title}</h4>}
          <div className={styles.text}>
            {messages.length === 1 ? (
              <p className="text-sm">{messages[0]}</p>
            ) : (
              <ul className="list-disc list-inside space-y-1 text-sm">
                {messages.map((msg, idx) => (
                  <li key={idx}>{msg}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
