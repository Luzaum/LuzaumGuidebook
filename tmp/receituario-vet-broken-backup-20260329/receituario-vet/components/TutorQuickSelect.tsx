import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { DataAdapter } from '../adapters'
import type { TutorInfo } from '../rxTypes'

type TutorQuickSelectProps = {
  adapter: DataAdapter
  value: TutorInfo | null
  onPick: (tutor: TutorInfo) => void
  disabled?: boolean
  onError?: (error: unknown) => void
  placeholder?: string
}

const SEARCH_DEBOUNCE_MS = 300

export function TutorQuickSelect({
  adapter,
  value,
  onPick,
  disabled = false,
  onError,
  placeholder = 'Buscar tutor por nome',
}: TutorQuickSelectProps) {
  const [query, setQuery] = useState(value?.name || '')
  const [results, setResults] = useState<TutorInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 })
  const rootRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const debounceTimerRef = useRef<number | null>(null)
  const searchRequestIdRef = useRef(0)

  useEffect(() => {
    setQuery(value?.name || '')
  }, [value?.name])

  // Atualizar posição do dropdown quando abrir
  useEffect(() => {
    if (open && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const dropdownHeight = 300 // Estimativa segura

      let top = rect.bottom + window.scrollY + 8
      if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
        top = rect.top + window.scrollY - dropdownHeight - 8
      }

      setDropdownPos({
        top,
        left: rect.left + window.scrollX,
        width: rect.width,
      })
    }
  }, [open])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current) return
      const target = event.target
      if (target instanceof Node && !rootRef.current.contains(target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const runSearch = (nextQuery: string) => {
    if (disabled) return
    const trimmed = nextQuery.trim()
    const requestId = searchRequestIdRef.current + 1
    searchRequestIdRef.current = requestId
    setLoading(true)

    void adapter
      .searchTutorsByName(trimmed, 10)
      .then((nextResults) => {
        if (requestId !== searchRequestIdRef.current) return
        setErrorMessage('')
        setResults(nextResults)
        setOpen(true)
      })
      .catch((error) => {
        if (requestId !== searchRequestIdRef.current) return
        setErrorMessage('Falha ao buscar. Verifique conex\u00e3o.')
        setResults([])
        setOpen(true)
        onError?.(error)
      })
      .finally(() => {
        if (requestId === searchRequestIdRef.current) setLoading(false)
      })
  }

  useEffect(() => {
    if (disabled) {
      setOpen(false)
      setResults([])
      setLoading(false)
      setErrorMessage('')
      return
    }

    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current)
    debounceTimerRef.current = window.setTimeout(() => runSearch(query), SEARCH_DEBOUNCE_MS)
    return () => {
      if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current)
    }
  }, [adapter, disabled, query])

  // Renderizar dropdown
  const dropdownContent = open ? (
    <div
      className="fixed z-[9999] overflow-hidden rounded-xl border border-[#2f5b25] bg-[#0f1e0d] shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      style={{
        top: `${dropdownPos.top}px`,
        left: `${dropdownPos.left}px`,
        width: `${dropdownPos.width}px`,
      }}
    >
      {loading ? (
        <p className="px-3 py-3 text-xs text-slate-300">Buscando tutores...</p>
      ) : null}

      {!loading && errorMessage ? (
        <p className="px-3 py-3 text-xs text-red-300">{errorMessage}</p>
      ) : null}

      {!loading && !errorMessage && results.length === 0 ? (
        <p className="px-3 py-3 text-xs text-slate-400">Nenhum tutor encontrado.</p>
      ) : null}

      {!loading && results.length > 0 ? (
        <ul className="max-h-72 overflow-y-auto">
          {results.map((tutor) => (
            <li key={tutor.tutorRecordId}>
              <button
                type="button"
                className="w-full border-b border-[#21401b] px-3 py-2 text-left hover:bg-[#173015]"
                onClick={() => {
                  onPick(tutor)
                  setQuery(tutor.name || '')
                  setErrorMessage('')
                  setOpen(false)
                }}
              >
                <p className="text-sm font-semibold text-white">{tutor.full_name || tutor.name || 'Tutor sem nome'}</p>
                <p className="text-xs text-slate-400">{tutor.phone || tutor.email || 'Sem telefone/email'}</p>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  ) : null

  return (
    <div ref={rootRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        disabled={disabled}
        className="w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white outline-none ring-[#3cff1a] placeholder:text-slate-500 focus:ring-1 disabled:cursor-not-allowed disabled:opacity-60"
        placeholder={placeholder}
        onFocus={() => {
          if (results.length > 0 && !disabled) setOpen(true)
        }}
        onChange={(event) => {
          if (errorMessage) setErrorMessage('')
          setQuery(event.target.value)
        }}
      />
      {dropdownContent && createPortal(dropdownContent, document.body)}
    </div>
  )
}
