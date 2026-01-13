import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  icon,
  iconPosition = 'left',
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-medium rounded-full transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent'

  const variantStyles = {
    primary: 'bg-primary text-white hover:shadow-lg hover:scale-[1.02]',
    secondary:
      'bg-surface-2 text-primary hover:bg-surface-2/80 hover:shadow-md',
    ghost: 'bg-transparent hover:bg-surface-2/50 text-primary',
  }

  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'px-5 py-2.5',
    lg: 'text-lg px-6 py-3',
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  )
}
