import React from 'react'

type CardProps = {
  children: React.ReactNode
  variant?: 'default' | 'metric' | 'featured'
  className?: string
  onClick?: () => void
}

export function Card({
  children,
  variant = 'default',
  className = '',
  onClick,
}: CardProps) {
  const baseStyles = 'rounded-2xl transition-all duration-200 backdrop-blur-md'

  const variantStyles = {
    default:
      'bg-surface-2/60 border border-border hover:shadow-md hover:scale-[1.01]',
    metric: 'bg-surface-2/70 border border-border shadow-md',
    featured:
      'bg-surface-2/60 border border-border shadow-lg hover:shadow-xl hover:scale-[1.02]',
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

  return (
    <div className={combinedClassName} onClick={onClick}>
      {children}
    </div>
  )
}
