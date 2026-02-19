import React from 'react'
import type { HelpContent, HelpItem, HelpLevel, HelpSection } from '../types/help'

const LEVEL_ORDER: HelpLevel[] = ['CRITICAL', 'IMPORTANT', 'INFO']

/* Labels em português brasileiro — sem maiúsculas forçadas */
const LEVEL_LABELS: Record<HelpLevel, string> = {
  CRITICAL: 'Atenção crítica',
  IMPORTANT: 'Importante',
  INFO: 'Informação',
}

/* Cores por nível */
const LEVEL_HEADER_CLASS: Record<HelpLevel, string> = {
  CRITICAL: 'text-red-400 border-red-500/30 bg-red-500/8',
  IMPORTANT: 'text-amber-400 border-amber-500/30 bg-amber-500/8',
  INFO: 'text-sky-400 border-sky-500/30 bg-sky-500/8',
}

const LEVEL_DOT_CLASS: Record<HelpLevel, string> = {
  CRITICAL: 'bg-red-500',
  IMPORTANT: 'bg-amber-500',
  INFO: 'bg-sky-500',
}

const LEVEL_ICON: Record<HelpLevel, string> = {
  CRITICAL: '⚠',
  IMPORTANT: '●',
  INFO: 'ℹ',
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

/* Converte texto em MAIÚSCULAS para Capitalizado (ex: "HEPATICA: METABOLISMO" → "Hepática: metabolismo") */
function normalizeCase(text: string): string {
  if (text === text.toUpperCase() && text.length > 3) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }
  return text
}

export function HelpContentRenderer({ content }: { content: HelpContent }) {
  const sections = mergeSections(content.sections)
  const resolvedSections =
    sections.length > 0
      ? sections
      : [{ level: 'INFO' as HelpLevel, items: [{ text: 'Conteúdo em atualização.' }] }]

  return (
    <div className="space-y-4">
      {resolvedSections.map((section) => (
        <div key={section.level} className={`rounded-xl border p-4 ${LEVEL_HEADER_CLASS[section.level]}`}>
          {/* Cabeçalho da seção */}
          <div className="mb-3 flex items-center gap-2 pb-2 border-b border-current/20">
            <span className="text-base leading-none" aria-hidden="true">
              {LEVEL_ICON[section.level]}
            </span>
            <span className="text-sm font-semibold">
              {LEVEL_LABELS[section.level]}
            </span>
          </div>

          {/* Itens */}
          <div className="space-y-2.5">
            {section.items.map((item, idx) => {
              const renderWithBold = (text: string) => {
                const normalized = normalizeCase(text)
                const parts = normalized.split(/(\*\*.*?\*\*)/g)
                return parts.map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    const cleanContent = part.slice(2, -2).trim()

                    let styleClass = 'text-sky-300 bg-sky-900/30'
                    if (section.level === 'CRITICAL') {
                      styleClass = 'text-red-600 bg-white font-black px-1.5 py-0.5 rounded-sm shadow-sm shadow-red-500/20'
                    } else if (section.level === 'IMPORTANT') {
                      styleClass = 'text-amber-200 bg-amber-950/40 border border-amber-900/30'
                    }

                    return (
                      <strong
                        key={i}
                        className={`font-semibold px-1.5 rounded mx-0.5 ${styleClass}`}
                      >
                        {cleanContent}
                      </strong>
                    )
                  }
                  return part
                })
              }

              return (
                <div
                  key={`${section.level}-${idx}`}
                  className="flex items-start gap-3 text-sm text-slate-200 leading-relaxed"
                >
                  <span
                    className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${LEVEL_DOT_CLASS[section.level]}`}
                    aria-hidden="true"
                  />
                  <p className="whitespace-pre-wrap">
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
