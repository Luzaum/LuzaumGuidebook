import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex min-h-[1.5rem] items-center justify-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors [&>svg]:pointer-events-none [&>svg]:h-3 [&>svg]:w-3',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive/15 text-destructive',
        outline: 'border-border bg-transparent text-foreground',
        ghost: 'border-transparent bg-transparent text-foreground hover:bg-muted',
        link: 'border-transparent bg-transparent px-0 text-primary underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
