import React from 'react'
import type { HelpContent, HelpHighlight, HelpItem, HelpLevel, HelpSection } from '../types/help'

const LEVEL_ORDER: HelpLevel[] = ['CRITICAL', 'IMPORTANT', 'INFO']

const LEVEL_LABELS: Record<HelpLevel, string> = {
  CRITICAL: 'CRITICAL',
  IMPORTANT: 'IMPORTANT',
  INFO: 'INFO',
}

const LEVEL_CLASS: Record<HelpLevel, string> = {
  CRITICAL: 'help-critical',
  IMPORTANT: 'help-important',
  INFO: 'help-info',
}

const HIGHLIGHT_CLASS: Record<HelpHighlight, string> = {
  red: 'hl-red',
  yellow: 'hl-yellow',
  green: 'hl-green',
}

function mergeSections(sections: HelpSection[]): Array<{ level: HelpLevel; items: HelpItem[] }> {
  const merged = new Map<HelpLevel, HelpItem[]>()
  sections.forEach((section) => {
    if (!section || !section.items?.length) return
    const items = section.items
      .map((item) => ({
        text: item.text?.trim(),
        highlight: item.highlight,
      }))
      .filter((item) => item.text) as HelpItem[]
    if (items.length === 0) return
    const current = merged.get(section.level) ?? []
    merged.set(section.level, current.concat(items))
  })

  return LEVEL_ORDER.map((level) => ({
    level,
    items: merged.get(level) ?? [],
  })).filter((section) => section.items.length > 0)
}

export function HelpContentRenderer({ content }: { content: HelpContent }) {
  const sections = mergeSections(content.sections)
  const resolvedSections =
    sections.length > 0
      ? sections
      : [{ level: 'INFO', items: [{ text: 'Conteudo em atualizacao.' }] }]

  return (
    <div className="space-y-4">
      {resolvedSections.map((section) => (
        <details key={section.level} open={section.level === 'CRITICAL'} className="rounded-lg border border-white/10 bg-white/5 p-3">
          <summary className="cursor-pointer list-none">
            <span className={`text-xs tracking-[0.2em] uppercase ${LEVEL_CLASS[section.level]}`}>
              {LEVEL_LABELS[section.level]}
            </span>
          </summary>
          <div className="mt-3 space-y-2">
            {section.items.map((item, idx) => {
              const highlightClass = item.highlight ? HIGHLIGHT_CLASS[item.highlight] : ''

              const renderWithBold = (text: string) => {
                const parts = text.split(/(\*\*.*?\*\*)/g)
                return parts.map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="font-extrabold inherit-color">{part.slice(2, -2)}</strong>
                  }
                  return part
                })
              }

              return (
                <div key={`${section.level}-${idx}`} className="flex items-start gap-2">
                  <span className={`${LEVEL_CLASS[section.level]} mt-1 text-[8px]`}>*</span>
                  <p className={`text-sm leading-relaxed ${LEVEL_CLASS[section.level]}`}>
                    {highlightClass ? <span className={highlightClass}>{renderWithBold(item.text)}</span> : renderWithBold(item.text)}
                  </p>
                </div>
              )
            })}
          </div>
        </details>
      ))}
    </div>
  )
}
