// ✅ TutorLookup — Busca de tutores com Portal (dropdown nunca é cortado)
// Regras: busca por clinic_id, debounce 300ms, Portal com z-index alto

import React, { useState, useEffect, useRef, useCallback } from 'react'
import * as Portal from '@radix-ui/react-portal'
import { useClinic } from '../../../src/components/ClinicProvider'
import { supabase } from '../../../src/lib/supabaseClient'
import { RxvInput } from '../../../src/components/receituario/RxvComponents'
import type { TutorInfo } from '../NovaReceita2Page'

interface TutorLookupProps {
  value: TutorInfo | null
  onChange: (tutor: TutorInfo | null) => void
  placeholder?: string
  error?: boolean
}

interface TutorSearchResult {
  id: string
  full_name: string
  phone?: string
  email?: string
  cpf?: string
  rg?: string
  street?: string
  number?: string
  address_complement?: string
  neighborhood?: string
  city?: string
  state?: string
  zipcode?: string
  notes?: string
  created_at?: string
}

export function TutorLookup({ value, onChange, placeholder = 'Buscar tutor...', error }: TutorLookupProps) {
  const { clinicId, loading: clinicLoading } = useClinic()

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<TutorSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // B1: DEV log para diagnóstico mobile
  useEffect(() => {
    if (!import.meta.env.DEV) return
    console.log('[TutorLookup] clinicId', clinicId, 'clinicLoading', clinicLoading)
  }, [clinicId, clinicLoading])

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // ✅ Carregar 5 mais recentes ao focar (sem query) e prefix search ao digitar
  // B2: Aguardar clinicId antes de fazer qualquer query
  useEffect(() => {
    if (!isOpen) {
      setResults([])
      return
    }
    // B2: clinicId ainda carregando — não fazer query vazia que retornaria resultados errados
    if (clinicLoading) {
      setResults([])
      return
    }
    if (!clinicId) {
      setResults([])
      return
    }

    setIsSearching(true)

    const timer = setTimeout(async () => {
      try {
        let data: TutorSearchResult[] = []

        if (import.meta.env.DEV) {
          console.log('[TutorLookup] querying tutors', { clinicId, query: query.trim() || '(recentes)' })
        }

        if (query.trim().length === 0) {
          // B3: Filtrar sempre por clinic_id (garante isolamento entre clínicas)
          const { data: recentData, error: recentError } = await supabase
            .from('tutors')
            .select('*')
            .eq('clinic_id', clinicId)
            .is('deleted_at', null)
            .order('created_at', { ascending: false })
            .limit(5)

          if (recentError) {
            console.error('[TutorLookup] Load recent failed', recentError.message, { clinicId })
          } else {
            data = recentData || []
            if (import.meta.env.DEV) {
              console.log('[TutorLookup] recentes', { clinicId, dataLen: data.length })
            }
          }
        } else {
          // B3: Prefix search (ilike 'query%') com clinic_id correto
          const { data: searchData, error: searchError } = await supabase
            .from('tutors')
            .select('*')
            .eq('clinic_id', clinicId)
            .is('deleted_at', null)
            .ilike('full_name', `${query.trim()}%`)
            .limit(10)

          if (searchError) {
            console.error('[TutorLookup] Search failed', searchError.message, { clinicId })
          } else {
            data = searchData || []
            if (import.meta.env.DEV) {
              console.log('[TutorLookup] busca', { clinicId, query: query.trim(), dataLen: data.length })
            }
          }
        }

        setResults(data)
      } catch (err) {
        console.error('[TutorLookup] Search exception', err)
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }, query.trim().length === 0 ? 0 : 300) // Sem debounce para carregar recentes

    return () => clearTimeout(timer)
  }, [query, clinicId, clinicLoading, isOpen])

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
    (tutor: TutorSearchResult) => {
      onChange({
        id: tutor.id,
        name: tutor.full_name,
        phone: tutor.phone || undefined,
        email: tutor.email || undefined,
        cpf: tutor.cpf || undefined,
        rg: tutor.rg || undefined,
        street: tutor.street || undefined,
        number: tutor.number || undefined,
        complement: tutor.address_complement || undefined,
        neighborhood: tutor.neighborhood || undefined,
        city: tutor.city || undefined,
        state: tutor.state || undefined,
        zipcode: tutor.zipcode || undefined,
        notes: tutor.notes || undefined,
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
            {/* B4: Aguardar bootstrap da clínica antes de exibir resultados */}
            {clinicLoading && (
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-slate-500">Aguardando clínica...</p>
              </div>
            )}

            {!clinicLoading && !clinicId && (
              <div className="px-4 py-4 text-center space-y-2">
                <p className="text-xs text-amber-400 font-semibold">Nenhuma clínica ativa</p>
                <p className="text-[10px] text-slate-500">Selecione uma clínica para buscar tutores.</p>
                <a
                  href="/hub"
                  className="inline-block rounded-lg border border-amber-600/40 bg-amber-900/20 px-3 py-1.5 text-[10px] font-bold text-amber-400 hover:bg-amber-900/40 transition-colors"
                >
                  Selecionar clínica →
                </a>
              </div>
            )}

            {!clinicLoading && clinicId && isSearching && (
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-slate-500">Buscando...</p>
              </div>
            )}

            {!clinicLoading && clinicId && !isSearching && query.trim().length === 0 && results.length === 0 && (
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-slate-500">Carregando tutores recentes...</p>
              </div>
            )}

            {!clinicLoading && clinicId && !isSearching && query.trim().length > 0 && results.length === 0 && (
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-slate-500">Nenhum tutor encontrado</p>
              </div>
            )}

            {!clinicLoading && clinicId && !isSearching && results.length > 0 && (
              <div className="py-1">
                {query.trim().length === 0 && (
                  <div className="px-4 py-2 text-xs text-slate-500 border-b border-slate-900">
                    Tutores recentes:
                  </div>
                )}
                {results.map((tutor) => (
                  <button
                    key={tutor.id}
                    type="button"
                    onPointerDown={(e) => {
                      e.preventDefault()
                      handleSelect(tutor)
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-[#39ff14]/10 transition-colors border-b border-slate-900 last:border-b-0"
                  >
                    <p className="text-sm font-bold text-white">{tutor.full_name}</p>
                    {tutor.phone && (
                      <p className="text-xs text-slate-500 mt-0.5">{tutor.phone}</p>
                    )}
                    {tutor.city && tutor.state && (
                      <p className="text-xs text-slate-600 mt-0.5">
                        {tutor.city} - {tutor.state}
                      </p>
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
