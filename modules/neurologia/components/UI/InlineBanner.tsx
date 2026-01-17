import React from 'react'
import { AlertTriangle, Info, CheckCircle2, AlertCircle, X } from 'lucide-react'

type BannerVariant = 'info' | 'warn' | 'error' | 'success'

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
    container: 'bg-blue-950/20 border-blue-500/30',
    icon: <Info className="w-5 h-5 text-blue-400" />,
    title: 'text-blue-400',
    text: 'text-foreground/90',
  },
  warn: {
    container: 'bg-yellow-950/20 border-yellow-500/30',
    icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
    title: 'text-yellow-400',
    text: 'text-foreground/90',
  },
  error: {
    container: 'bg-red-950/20 border-red-500/30',
    icon: <AlertCircle className="w-5 h-5 text-red-400" />,
    title: 'text-red-400',
    text: 'text-foreground/90',
  },
  success: {
    container: 'bg-green-950/20 border-green-500/30',
    icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
    title: 'text-green-400',
    text: 'text-foreground/90',
  },
}

export function InlineBanner({ variant, title, message, onClose, className = '' }: InlineBannerProps) {
  const styles = variantStyles[variant]
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
