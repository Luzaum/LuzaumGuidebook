import React from 'react'
import { cn } from '../../../../lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'highlight'
}

export function Card({
  children,
  className,
  variant = 'default',
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300',
        variant === 'default'
          ? 'bg-white/5 border-white/10 hover:border-gold/40'
          : 'bg-gradient-to-br from-gold/20 to-white/5 border-gold/30 hover:border-gold/60',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
