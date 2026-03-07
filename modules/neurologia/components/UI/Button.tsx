import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  loadingText?: string
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-gold via-[#f3cb61] to-[#f0ba37] text-neutral-deep shadow-[0_8px_25px_rgba(245,197,66,0.35)] hover:brightness-105',
  secondary:
    'bg-card text-foreground border border-border hover:border-gold/45 hover:bg-muted/60',
  ghost:
    'bg-transparent text-foreground hover:bg-muted/60 border border-transparent hover:border-border/80',
  outline: 'bg-transparent border border-gold/50 text-gold hover:bg-gold/12',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-xl font-semibold transition-all duration-200',
        'flex items-center justify-center gap-2',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'active:scale-[0.985]',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        (disabled || isLoading) && 'opacity-60 cursor-not-allowed',
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {leftIcon && !isLoading && leftIcon}
      <span>{isLoading ? loadingText || 'Carregando...' : children}</span>
      {rightIcon && !isLoading && rightIcon}
    </button>
  )
}
