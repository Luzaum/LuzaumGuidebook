import { Copy, Eraser, FileText } from 'lucide-react'
import { formatDateTime } from '../../utils/date'

type NotesEditorProps = {
  title?: string
  value: string
  onChange: (value: string) => void
  onClear: () => void
  updatedAt?: string
}

export function NotesEditor({
  title = 'Minhas anotações',
  value,
  onChange,
  onClear,
  updatedAt,
}: NotesEditorProps) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
  }

  return (
    <div className="consulta-vet-panel rounded-[28px] p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-800 dark:text-blue-200">
            <FileText className="h-3.5 w-3.5" />
            {title}
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Autosave local ativo{updatedAt ? ` • atualizado em ${formatDateTime(updatedAt)}` : ''}.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={handleCopy} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
            <Copy className="h-3.5 w-3.5" />
            Copiar
          </button>
          <button type="button" onClick={onClear} className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 dark:border-rose-500/30 dark:text-rose-200">
            <Eraser className="h-3.5 w-3.5" />
            Limpar
          </button>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={8}
        className="min-h-[180px] w-full rounded-[24px] border border-slate-200 bg-white/80 px-4 py-4 text-sm leading-7 text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100"
        placeholder="Escreva insights rápidos, esquemas, doses validadas pela sua rotina ou lembretes pessoais."
      />
    </div>
  )
}

export const LocalNotesEditor = NotesEditor

