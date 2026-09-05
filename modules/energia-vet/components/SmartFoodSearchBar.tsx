import { useEffect, useRef, useState } from 'react'
import { Clock, Command, Mic, MicOff, Search, Sparkles, X } from 'lucide-react'
import { Badge } from './ui/badge'
import { SMART_SEARCH_SUGGESTIONS } from '../lib/foodSearchLexicon'
import { cn } from '../lib/utils'

const RECENT_SEARCHES_KEY = 'vetius_nutrition_recent_searches_v1'

function getRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.slice(0, 6) : []
  } catch {
    return []
  }
}

function saveRecentSearch(query: string) {
  const trimmed = query.trim()
  if (!trimmed || trimmed.length < 2) return
  try {
    const current = getRecentSearches()
    const next = [trimmed, ...current.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(0, 6)
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next))
  } catch {
    // Ignore storage issues
  }
}

function clearRecentSearches() {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  } catch {
    // Ignore
  }
}

export interface SmartFoodSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  autoFocus?: boolean
  showQuickChips?: boolean
  showVoiceSearch?: boolean
  showKeyboardShortcut?: boolean
}

export function SmartFoodSearchBar({
  value,
  onChange,
  placeholder = 'Buscar por alimento, marca, indicação clínica ou ingrediente...',
  className,
  autoFocus,
  showQuickChips = true,
  showVoiceSearch = true,
  showKeyboardShortcut = true,
}: SmartFoodSearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>(() => getRecentSearches())
  const [isListening, setIsListening] = useState(false)
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Speech Recognition support
  useEffect(() => {
    if (!showVoiceSearch) return

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      setHasSpeechSupport(true)
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'pt-BR'

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        if (transcript) {
          onChange(transcript)
          saveRecentSearch(transcript)
          setRecentSearches(getRecentSearches())
        }
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [onChange, showVoiceSearch])

  // Keyboard shortcut (Ctrl+K / Cmd+K or /)
  useEffect(() => {
    if (!showKeyboardShortcut) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        inputRef.current?.select()
        setIsOpen(true)
      } else if (e.key === 'Escape') {
        setIsOpen(false)
        inputRef.current?.blur()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showKeyboardShortcut])

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectQuery = (queryText: string) => {
    onChange(queryText)
    saveRecentSearch(queryText)
    setRecentSearches(getRecentSearches())
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleClear = () => {
    onChange('')
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const toggleVoiceSearch = () => {
    if (!recognitionRef.current) return
    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch {
        setIsListening(false)
      }
    }
  }

  const quickFilterChips = [
    { label: 'Renal', query: 'renal' },
    { label: 'Gastrointestinal', query: 'gastrointestinal' },
    { label: 'Hipoalergênico', query: 'hipoalergenico' },
    { label: 'Recovery / Convalescença', query: 'recovery' },
    { label: 'Peito de Frango', query: 'frango' },
    { label: 'Sachê & Lata', query: 'sachê' },
  ]

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div className="group relative flex items-center">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            if (!isOpen) setIsOpen(true)
          }}
          onFocus={() => {
            setRecentSearches(getRecentSearches())
            setIsOpen(true)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value.trim()) {
              saveRecentSearch(value)
              setRecentSearches(getRecentSearches())
              setIsOpen(false)
            }
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={cn(
            'h-11 w-full rounded-2xl border border-input bg-card pl-10 text-sm font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary/50 focus:ring-4 focus:ring-primary/10',
            showVoiceSearch || showKeyboardShortcut ? 'pr-24' : 'pr-10',
          )}
        />

        <div className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Limpar busca"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}

          {showVoiceSearch && hasSpeechSupport && (
            <button
              type="button"
              onClick={toggleVoiceSearch}
              title={isListening ? 'Ouvindo... clique para parar' : 'Buscar por voz'}
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-lg transition-colors',
                isListening
                  ? 'bg-rose-500/10 text-rose-600 animate-pulse'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {isListening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
            </button>
          )}

          {showKeyboardShortcut && (
            <span className="hidden items-center gap-0.5 rounded-md border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground sm:inline-flex">
              <Command className="h-3 w-3" /> K
            </span>
          )}
        </div>
      </div>

      {/* Sugestões Popover Inteligente */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[420px] overflow-y-auto rounded-2xl border border-border bg-popover/95 p-3 shadow-xl backdrop-blur-md transition-all animate-in fade-in zoom-in-95">
          {recentSearches.length > 0 && !value && (
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between px-2">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" /> Buscas recentes
                </span>
                <button
                  type="button"
                  onClick={() => {
                    clearRecentSearches()
                    setRecentSearches([])
                  }}
                  className="text-[11px] text-muted-foreground hover:text-foreground"
                >
                  Limpar histórico
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 px-2">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleSelectQuery(item)}
                    className="flex items-center gap-1.5 rounded-xl border border-border bg-muted/40 px-2.5 py-1 text-xs text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                  >
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {SMART_SEARCH_SUGGESTIONS.map((category) => (
              <div key={category.title}>
                <p className="mb-1.5 flex items-center gap-1.5 px-2 text-xs font-semibold text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  {category.title}
                </p>
                <div className="grid gap-1 sm:grid-cols-2">
                  {category.items.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleSelectQuery(item.query)}
                      className="flex items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs transition-colors hover:bg-muted/70 group"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.label}
                        </span>
                        {item.description && (
                          <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {item.badge && (
                        <Badge variant="outline" className="shrink-0 text-[10px] font-normal">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pílulas rápidas abaixo da barra */}
      {showQuickChips && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-medium text-muted-foreground mr-1">Sugestões:</span>
          {quickFilterChips.map((chip) => {
            const isSelected = value.toLowerCase().trim() === chip.query.toLowerCase()
            return (
              <button
                key={chip.query}
                type="button"
                onClick={() => {
                  if (isSelected) onChange('')
                  else handleSelectQuery(chip.query)
                }}
                className={cn(
                  'rounded-full px-2.5 py-0.5 text-xs font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isSelected
                    ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                    : 'border border-border/80 bg-muted/40 text-muted-foreground hover:border-primary/40 hover:bg-primary/[0.06] hover:text-primary',
                )}
              >
                {chip.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
