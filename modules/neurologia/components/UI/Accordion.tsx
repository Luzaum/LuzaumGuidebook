import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../../../lib/utils'

interface AccordionItem {
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  className?: string
}

export function Accordion({
  items,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      if (allowMultiple) {
        return prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      }
      return prev.includes(index) ? [] : [index]
    })
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(index)
        return (
          <div
            key={`${item.title}-${index}`}
            className="border border-white/10 rounded-lg overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
            >
              <span className="font-medium text-white">{item.title}</span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-gold transition-transform duration-200',
                  isOpen && 'transform rotate-180',
                )}
              />
            </button>
            {isOpen && (
              <div className="p-4 pt-0 text-white/70">{item.content}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
