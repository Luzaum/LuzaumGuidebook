import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { DataAdapter, DataAdapterPatientMatch } from '../adapters'

type PatientQuickSelectProps = {
  adapter: DataAdapter
  onPick: (payload: DataAdapterPatientMatch) => void
  disabled?: boolean
  onError?: (error: unknown) => void
}

const SEARCH_DEBOUNCE_MS = 300
const MIN_QUERY_LENGTH = 2

function buildSubtitle(match: DataAdapterPatientMatch) {
  const pieces: string[] = []
  if (match.patient.species) pieces.push(match.patient.species)
  if (match.patient.breed) pieces.push(match.patient.breed)
  if (match.patient.weightKg) pieces.push(`${match.patient.weightKg} kg`)
  return pieces.join(' - ')
}

export function PatientQuickSelect({ adapter, onPick, disabled = false, onError }: PatientQuickSelectProps) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [results, setResults] = useState<DataAdapterPatientMatch[]>([])
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 })
  const rootRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const debounceTimerRef = useRef<number | null>(null)
  const searchRequestIdRef = useRef(0)

  // Atualizar posição do dropdown quando abrir
  useEffect(() => {
    if (open && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setDropdownPos({
        top: rect.bottom + window.scrollY + 8,
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

  useEffect(() => {
    if (disabled) {
      setOpen(false)
      setLoading(false)
      setErrorMessage('')
      setResults([])
      return
    }

    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current)

    const trimmedQuery = query.trim()
    if (trimmedQuery.length < MIN_QUERY_LENGTH) {
      setOpen(false)
      setLoading(false)
      setErrorMessage('')
      setResults([])
      return
    }

    debounceTimerRef.current = window.setTimeout(() => {
      const requestId = searchRequestIdRef.current + 1
      searchRequestIdRef.current = requestId
      setLoading(true)

      void adapter
        .searchPatientsByName(trimmedQuery, 10)
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
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current)
    }
  }, [adapter, disabled, onError, query])

  const canSearch = query.trim().length >= MIN_QUERY_LENGTH

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
            <p className="px-3 py-3 text-xs text-slate-300">Buscando pacientes...</p>
          ) : null}

          {!loading && errorMessage ? (
            <p className="px-3 py-3 text-xs text-red-300">{errorMessage}</p>
          ) : null}

          {!loading && !errorMessage && results.length === 0 ? (
            <p className="px-3 py-3 text-xs text-slate-400">Nenhum paciente encontrado.</p>
          ) : null}

      {!loading && results.length > 0 ? (
        <ul className="max-h-72 overflow-y-auto">
          {results.map((match) => (
            <li key={`${match.patient.patientRecordId}:${match.tutor.tutorRecordId}`}>
              <button
                type="button"
                className="w-full border-b border-[#21401b] px-3 py-2 text-left hover:bg-[#173015]"
                onClick={() => {
                  onPick(match)
                  setQuery(match.patient.name || '')
                  setErrorMessage('')
                  setOpen(false)
                }}
              >
                <p className="text-sm font-semibold text-white">{match.patient.name || 'Paciente sem nome'}</p>
                <p className="text-xs text-[#9be78c]">Tutor: {match.tutor.name || 'Não informado'}</p>
                {buildSubtitle(match) ? (
                  <p className="text-[11px] text-slate-400">{buildSubtitle(match)}</p>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  ) : null

  return (
    <div ref={rootRef} className="relative">
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-300">
        Buscar paciente...
      </label>
      <input
        ref={inputRef}
        type="text"
        value={query}
        disabled={disabled}
        className="w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white outline-none ring-[#3cff1a] placeholder:text-slate-500 focus:ring-1 disabled:cursor-not-allowed disabled:opacity-60"
        placeholder={disabled ? 'Clínica ativa obrigatoria para modo supabase' : 'Digite ao menos 2 letras'}
        onFocus={() => {
          if (results.length > 0 && canSearch) setOpen(true)
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
