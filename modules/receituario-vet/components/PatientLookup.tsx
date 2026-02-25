// ✅ PatientLookup — Busca de pacientes com Portal (dropdown nunca é cortado)
// Regras: busca por clinic_id, debounce 300ms, Portal com z-index alto

import React, { useState, useEffect, useRef, useCallback } from 'react'
import * as Portal from '@radix-ui/react-portal'
import { useClinic } from '../../../src/components/ClinicProvider'
import { supabase } from '../../../src/lib/supabaseClient'
import type { PatientInfo } from '../NovaReceita2Page'

interface PatientLookupProps {
  value: PatientInfo | null
  onChange: (patient: PatientInfo | null) => void
  tutorId?: string // Filtrar por tutor (opcional)
  placeholder?: string
  error?: boolean
}

interface PatientSearchResult {
  id: string
  tutor_id: string
  name: string
  species?: string
  breed?: string
  sex?: string
  age_text?: string
  weight_kg?: string
  coat?: string
  reproductive_condition?: string
  microchipped?: boolean
  microchip_number?: string
  anamnesis?: string
  notes?: string
  created_at?: string
}

export function PatientLookup({ value, onChange, tutorId, placeholder = 'Buscar paciente...', error }: PatientLookupProps) {
  const { clinicId } = useClinic()

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PatientSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // ✅ Carregar 5 mais recentes ao focar (sem query) e prefix search ao digitar
  useEffect(() => {
    if (!clinicId || !isOpen) {
      setResults([])
      return
    }

    setIsSearching(true)

    const timer = setTimeout(async () => {
      try {
        let data: PatientSearchResult[] = []

        if (query.trim().length === 0) {
          // Carregar 5 mais recentes
          let queryBuilder = supabase
            .from('patients')
            .select('*')
            .eq('clinic_id', clinicId)
            .is('deleted_at', null)
            .order('created_at', { ascending: false })
            .limit(5)

          if (tutorId) {
            queryBuilder = queryBuilder.eq('tutor_id', tutorId)
          }

          const { data: recentData, error: recentError } = await queryBuilder

          if (recentError) {
            console.error('[PatientLookup] Load recent failed', recentError)
          } else {
            data = recentData || []
          }
        } else {
          // Prefix search (ilike 'query%')
          let queryBuilder = supabase
            .from('patients')
            .select('*')
            .eq('clinic_id', clinicId)
            .is('deleted_at', null)
            .ilike('name', `${query.trim()}%`)
            .limit(10)

          if (tutorId) {
            queryBuilder = queryBuilder.eq('tutor_id', tutorId)
          }

          const { data: searchData, error: searchError } = await queryBuilder

          if (searchError) {
            console.error('[PatientLookup] Search failed', searchError)
          } else {
            data = searchData || []
          }
        }

        setResults(data)
      } catch (err) {
        console.error('[PatientLookup] Search exception', err)
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }, query.trim().length === 0 ? 0 : 300) // Sem debounce para carregar recentes

    return () => clearTimeout(timer)
  }, [query, clinicId, tutorId, isOpen])

  // ✅ Fechar dropdown ao clicar fora
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // ✅ Posicionar dropdown (abaixo ou acima do input)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    if (!isOpen || !inputRef.current) return

    const updatePosition = () => {
      const rect = inputRef.current!.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top

      const dropdownHeight = 300 // max-height do dropdown

      // Se tem espaço embaixo, abrir embaixo; senão, abrir em cima
      if (spaceBelow >= dropdownHeight || spaceBelow > spaceAbove) {
        setDropdownStyle({
          position: 'fixed',
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width,
          maxHeight: Math.min(dropdownHeight, spaceBelow - 20),
          overflowY: 'auto',
          zIndex: 9999,
        })
      } else {
        setDropdownStyle({
          position: 'fixed',
          bottom: window.innerHeight - rect.top + 4,
          left: rect.left,
          width: rect.width,
          maxHeight: Math.min(dropdownHeight, spaceAbove - 20),
          overflowY: 'auto',
          zIndex: 9999,
        })
      }
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isOpen])

  // ✅ Handlers
  const handleSelect = useCallback(
    (patient: PatientSearchResult) => {
      onChange({
        id: patient.id,
        name: patient.name,
        species: patient.species || undefined,
        breed: patient.breed || undefined,
        sex: patient.sex || undefined,
        age_text: patient.age_text || undefined,
        weight_kg: patient.weight_kg || undefined,
        coat: patient.coat || undefined,
        reproductive_condition: patient.reproductive_condition || undefined,
        microchipped: patient.microchipped || false,
        microchip_number: patient.microchip_number || undefined,
        anamnesis: patient.anamnesis || undefined,
        notes: patient.notes || undefined,
      })
      setIsOpen(false)
      setQuery('')
    },
    [onChange]
  )

  const handleClear = useCallback(() => {
    onChange(null)
    setQuery('')
    setIsOpen(false)
  }, [onChange])

  // ==================== RENDER ====================

  return (
    <div className="relative">
      {/* Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={value ? value.name : placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className={`w-full rounded-xl border border-slate-800 bg-black/60 px-4 py-3.5 text-sm font-bold text-white outline-none transition-all focus:border-[#39ff14]/50 focus:ring-1 focus:ring-[#39ff14]/20 placeholder:text-slate-700 ${error ? 'border-red-500/50 focus:border-red-500' : ''} ${value ? 'text-[#39ff14] font-black' : ''}`}
        />

        {/* Ícone/Loader */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="text-slate-500 hover:text-red-400 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          {isSearching && (
            <span className="material-symbols-outlined animate-spin text-[#39ff14] text-[18px]">
              sync
            </span>
          )}
          {!isSearching && !value && (
            <span className="material-symbols-outlined text-slate-700 text-[18px]">search</span>
          )}
        </div>
      </div>

      {/* ✅ Dropdown usando Portal (nunca é cortado por overflow) */}
      {isOpen && (
        <Portal.Root>
          <div ref={dropdownRef} style={dropdownStyle} className="rounded-xl border border-slate-800 bg-[#0a0f0a] shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            {isSearching && (
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-slate-500">Buscando...</p>
              </div>
            )}

            {!isSearching && query.trim().length === 0 && results.length === 0 && (
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-slate-500">Carregando pacientes recentes...</p>
              </div>
            )}

            {!isSearching && query.trim().length > 0 && results.length === 0 && (
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-slate-500">Nenhum paciente encontrado</p>
              </div>
            )}

            {!isSearching && results.length > 0 && (
              <div className="py-1">
                {query.trim().length === 0 && (
                  <div className="px-4 py-2 text-xs text-slate-500 border-b border-slate-900">
                    Pacientes recentes:
                  </div>
                )}
                {results.map((patient) => (
                  <button
                    key={patient.id}
                    type="button"
                    onPointerDown={(e) => {
                      e.preventDefault()
                      handleSelect(patient)
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-[#39ff14]/10 transition-colors border-b border-slate-900 last:border-b-0"
                  >
                    <p className="text-sm font-bold text-white">{patient.name}</p>
                    {(patient.species || patient.breed) && (
                      <p className="text-xs text-slate-500 mt-0.5">
                        {patient.species} {patient.breed ? `- ${patient.breed}` : ''}
                      </p>
                    )}
                    {patient.age_text && (
                      <p className="text-xs text-slate-600 mt-0.5">{patient.age_text}</p>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Portal.Root>
      )}
    </div>
  )
}
