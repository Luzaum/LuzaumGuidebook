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

type CardHeaderProps = {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`p-6 pb-4 ${className}`}>
      {children}
    </div>
  )
}

type CardTitleProps = {
  children: React.ReactNode
  className?: string
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`text-xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  )
}

type CardDescriptionProps = {
  children: React.ReactNode
  className?: string
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`text-sm text-muted-foreground mt-1.5 ${className}`}>
      {children}
    </p>
  )
}

type CardContentProps = {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  )
}
