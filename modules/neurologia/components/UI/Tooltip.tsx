import React, { useState } from 'react'
import { HelpCircle } from 'lucide-react'
import { cn } from '../../../../lib/utils'

interface TooltipProps {
  content: string
  size?: 'sm' | 'md'
  className?: string
}

export function Tooltip({ content, size = 'md', className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className={cn('relative inline-block', className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <HelpCircle
        className={cn(
          'text-gold/60 hover:text-gold transition-colors cursor-help',
          size === 'sm' ? 'w-4 h-4' : 'w-5 h-5',
        )}
      />

      {isVisible && (
        <div className="absolute z-50 w-64 p-3 mt-2 text-sm bg-neutral-900 text-white rounded-lg shadow-xl border border-gold/20 -left-28">
          {content}
          <div className="absolute w-3 h-3 bg-neutral-900 border-t border-l border-gold/20 rotate-45 -top-1.5 left-1/2 transform -translate-x-1/2" />
        </div>
      )}
    </div>
  )
}
