import React, { useEffect, useMemo, useState } from 'react'
import { BookOpen, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { clinicalAcronyms, type ClinicalAcronym } from '../data/clinicalAcronyms.v2'

type ClinicalAcronymGlossaryProps = {
  contentRoot: React.RefObject<HTMLElement | null>
}

type VisibleAcronym = {
  entry: ClinicalAcronym
  term: string
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function entryTerms(entry: ClinicalAcronym): string[] {
  return [entry.acronym, ...(entry.aliases ?? [])]
}

function termPattern(term: string): RegExp {
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegExp(term)}(?=$|[^\\p{L}\\p{N}])`, 'u')
}

function findVisibleAcronyms(text: string): VisibleAcronym[] {
  return clinicalAcronyms
    .map((entry) => {
      const matches = entryTerms(entry)
        .map((term) => {
          const match = termPattern(term).exec(text)
          return { term, position: match ? match.index : -1 }
        })
        .filter(({ position }) => position >= 0)
        .sort((left, right) => left.position - right.position)

      return {
        entry,
        term: matches[0]?.term ?? entry.acronym,
        position: matches[0]?.position ?? -1,
      }
    })
    .filter(({ position }) => position >= 0)
    .sort((left, right) => left.position - right.position)
    .map(({ entry, term }) => ({ entry, term }))
}

function readClinicalText(root: HTMLElement): string {
  const ignored =
    'script, style, noscript, [aria-hidden="true"], [data-acronym-ignore], [id*="refer" i], [class*="bibliograph" i]'

  const collect = (node: Node): string => {
    if (node instanceof Element && node.matches(ignored)) return ''
    if (node.nodeType === Node.TEXT_NODE) return node.textContent || ''
    return Array.from(node.childNodes, collect).join(' ')
  }

  return collect(root)
}

export function ClinicalAcronymGlossaryV2({ contentRoot }: ClinicalAcronymGlossaryProps) {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [visibleEntries, setVisibleEntries] = useState<VisibleAcronym[]>([])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    let timer: number | undefined
    let frame: number | undefined
    let observer: MutationObserver | undefined

    const update = (root: HTMLElement) => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        setVisibleEntries(findVisibleAcronyms(readClinicalText(root)))
      }, 80)
    }

    const connect = () => {
      const root = contentRoot.current
      if (!root) {
        frame = window.requestAnimationFrame(connect)
        return
      }

      update(root)
      observer = new MutationObserver(() => update(root))
      observer.observe(root, { childList: true, characterData: true, subtree: true })
    }

    connect()

    return () => {
      observer?.disconnect()
      if (frame !== undefined) window.cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [contentRoot, location.pathname])

  useEffect(() => {
    if (!isOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  const glossary = useMemo(() => {
    if (typeof document === 'undefined' || visibleEntries.length === 0) return null

    return createPortal(
      <>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 z-[90] inline-flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-200 bg-white text-emerald-700 shadow-lg transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-300 dark:hover:bg-slate-800 md:bottom-5"
          aria-label={`Abrir siglas desta página: ${visibleEntries.length} ${visibleEntries.length === 1 ? 'termo' : 'termos'}`}
          title="Siglas desta página"
        >
          <BookOpen className="h-5 w-5" aria-hidden="true" />
          <span className="absolute -right-1.5 -top-1.5 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
            {visibleEntries.length}
          </span>
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-[110]">
            <button
              type="button"
              className="absolute inset-0 cursor-default bg-slate-950/45 backdrop-blur-[1px]"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar siglas"
            />
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="clinical-acronym-title"
              className="absolute bottom-0 right-0 top-0 flex w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950"
            >
              <header className="flex min-h-16 items-center justify-between gap-4 border-b border-slate-200 px-5 dark:border-slate-800">
                <div className="min-w-0">
                  <h2 id="clinical-acronym-title" className="text-base font-bold text-slate-950 dark:text-white">
                    Siglas desta página
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {visibleEntries.length} {visibleEntries.length === 1 ? 'termo encontrado' : 'termos encontrados'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:hover:bg-slate-900 dark:hover:text-white"
                  aria-label="Fechar siglas"
                  title="Fechar"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto">
                <dl className="divide-y divide-slate-100 px-5 dark:divide-slate-900">
                  {visibleEntries.map(({ entry, term }) => (
                    <div key={entry.acronym} className="py-4">
                      <dt className="text-xs font-extrabold uppercase text-emerald-700 dark:text-emerald-300">
                        {term}
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
                        {entry.meaning}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          </div>
        )}
      </>,
      document.body,
    )
  }, [isOpen, visibleEntries])

  return glossary
}
