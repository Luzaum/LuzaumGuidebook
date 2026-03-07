import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar por nome, sinônimo, tag ou referência...',
  className,
}: SearchBarProps) {
  return (
    <label className={cn('relative block', className)}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-2xl border-slate-200/80 bg-white/80 pl-11 text-left shadow-sm dark:border-slate-700 dark:bg-slate-950/70"
      />
    </label>
  )
}

