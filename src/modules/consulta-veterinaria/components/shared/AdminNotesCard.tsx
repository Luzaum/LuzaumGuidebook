import { ShieldCheck } from 'lucide-react'
import { RichTextPreview } from './RichTextPreview'

type AdminNotesCardProps = {
  title?: string
  html: string
}

export function AdminNotesCard({ title = 'Notas do administrador', html }: AdminNotesCardProps) {
  return (
    <div className="consulta-vet-panel rounded-[28px] p-5">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white dark:bg-blue-500/15 dark:text-blue-200">
        <ShieldCheck className="h-3.5 w-3.5" />
        {title}
      </div>
      <RichTextPreview html={html} />
    </div>
  )
}

