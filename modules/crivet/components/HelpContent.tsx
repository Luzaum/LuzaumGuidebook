import React from 'react'
import type { HelpContent, HelpHighlight, HelpItem, HelpLevel, HelpSection } from '../types/help'

const LEVEL_ORDER: HelpLevel[] = ['CRITICAL', 'IMPORTANT', 'INFO']

const LEVEL_LABELS: Record<HelpLevel, string> = {
  CRITICAL: 'CRITICAL',
  IMPORTANT: 'IMPORTANT',
  INFO: 'INFO',
}

const LEVEL_CLASS: Record<HelpLevel, string> = {
  CRITICAL: 'help-critical text-red-500',
  IMPORTANT: 'help-important text-amber-500',
  INFO: 'help-info text-sky-500',
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
    <div className="space-y-6">
      {resolvedSections.map((section) => (
        <div key={section.level} className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-4">
          <div className="mb-3 flex items-center gap-2 border-b border-slate-700/50 pb-2">
            <span className={`text-xs font-black tracking-widest uppercase ${LEVEL_CLASS[section.level]}`}>
              {LEVEL_LABELS[section.level]}
            </span>
          </div>

          <div className="space-y-3">
            {section.items.map((item, idx) => {

              const renderWithBold = (text: string) => {
                const parts = text.split(/(\*\*.*?\*\*)/g)
                return parts.map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    const cleanContent = part.slice(2, -2).trim()

                    // Style logic
                    let styleClass = 'text-sky-300 bg-sky-900/30' // Default INFO color

                    if (section.level === 'CRITICAL') {
                      // CRITICAL Highlight -> White BG, Red Text (High Contrast) for ALL bold keywords
                      styleClass = 'text-red-600 bg-white font-black px-2 py-0.5 rounded-sm uppercase tracking-wide shadow-sm shadow-red-500/20'
                    } else if (section.level === 'IMPORTANT') {
                      // Important -> Amber
                      styleClass = 'text-amber-200 bg-amber-950/40 border border-amber-900/30'
                    }

                    return (
                      <strong
                        key={i}
                        className={`font-bold px-1.5 rounded mx-0.5 ${styleClass}`}
                      >
                        {cleanContent}
                      </strong>
                    )
                  }
                  return part
                })
              }

              return (
                <div key={`${section.level}-${idx}`} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${section.level === 'CRITICAL' ? 'bg-red-500' :
                    section.level === 'IMPORTANT' ? 'bg-amber-500' : 'bg-blue-500'
                    }`} />
                  <p>
                    {renderWithBold(item.text)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
