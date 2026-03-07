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
        'rounded-2xl p-6 backdrop-blur-md border transition-all duration-300 shadow-[0_8px_24px_rgba(2,6,23,0.25)]',
        variant === 'default'
          ? 'bg-card/90 border-border hover:border-gold/45'
          : 'bg-gradient-to-br from-gold/20 via-gold/10 to-card border-gold/35 hover:border-gold/60',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
