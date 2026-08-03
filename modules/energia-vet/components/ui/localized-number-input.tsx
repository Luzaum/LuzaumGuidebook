import * as React from 'react'

import { cn } from '../../lib/utils'
import { Input } from './input'

type LocalizedNumberInputProps = Omit<React.ComponentProps<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange' | 'min' | 'max'> & {
  value: number | null | undefined
  onValueChange: (value: number | null) => void
  min?: number
  max?: number
  integer?: boolean
}

export function parseLocalizedNumber(value: string) {
  const normalized = value.trim().replace(',', '.')
  if (!normalized || normalized === '-' || normalized === '.' || normalized === '-.') return null
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : null
}

function formatEditableNumber(value: number | null | undefined) {
  return value == null || !Number.isFinite(value) ? '' : String(value).replace('.', ',')
}

/**
 * Campo numérico que preserva o texto enquanto o usuário digita.
 * Aceita vírgula ou ponto e permite deixar o campo vazio sem repor 0 a cada tecla.
 */
export function LocalizedNumberInput({
  value,
  onValueChange,
  min,
  max,
  integer = false,
  className,
  onFocus,
  onBlur,
  onKeyDown,
  ...props
}: LocalizedNumberInputProps) {
  const [draft, setDraft] = React.useState(() => formatEditableNumber(value))
  const editingRef = React.useRef(false)
  const preserveBlankRef = React.useRef(false)

  React.useEffect(() => {
    if (editingRef.current) return
    if (preserveBlankRef.current && (value == null || value === 0)) {
      preserveBlankRef.current = false
      return
    }
    setDraft(formatEditableNumber(value))
  }, [value])

  const commit = React.useCallback(() => {
    const parsed = parseLocalizedNumber(draft)
    if (parsed == null) {
      preserveBlankRef.current = true
      setDraft('')
      onValueChange(null)
      return
    }

    let next = integer ? Math.round(parsed) : parsed
    if (min != null) next = Math.max(min, next)
    if (max != null) next = Math.min(max, next)
    setDraft(formatEditableNumber(next))
    onValueChange(next)
  }, [draft, integer, max, min, onValueChange])

  return (
    <Input
      {...props}
      type="text"
      inputMode={integer ? 'numeric' : 'decimal'}
      value={draft}
      className={cn('tabular-nums', className)}
      onFocus={(event) => {
        editingRef.current = true
        onFocus?.(event)
      }}
      onChange={(event) => {
        const next = event.target.value
        const pattern = integer ? /^-?\d*$/ : /^-?\d*(?:[.,]\d*)?$/
        if (!pattern.test(next)) return
        setDraft(next)
        const parsed = parseLocalizedNumber(next)
        if (parsed != null) onValueChange(integer ? Math.round(parsed) : parsed)
      }}
      onBlur={(event) => {
        editingRef.current = false
        commit()
        onBlur?.(event)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          commit()
          event.currentTarget.blur()
        }
        onKeyDown?.(event)
      }}
    />
  )
}
