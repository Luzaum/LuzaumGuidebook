"use client"

import * as React from 'react'

import { cn } from '../../lib/utils'

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="scroll-area"
      className={cn('relative min-h-0 overflow-auto', className)}
      {...props}
    >
      <div data-slot="scroll-area-viewport" className="size-full rounded-[inherit]">
        {children}
      </div>
    </div>
  )
}

function ScrollBar({ className }: React.ComponentProps<'div'>) {
  return <div aria-hidden className={cn('hidden', className)} />
}

export { ScrollArea, ScrollBar }
