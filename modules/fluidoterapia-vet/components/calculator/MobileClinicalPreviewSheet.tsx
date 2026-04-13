import { useEffect, type ReactNode } from 'react';
import { Activity, X } from 'lucide-react';

interface MobileClinicalPreviewSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
}

/**
 * Folha inferior só em &lt;lg&gt;. Altura fixa + min-h-0 para o preview não colapsar (evita ecrã em branco).
 */
export function MobileClinicalPreviewSheet({
  open,
  onOpenChange,
  title = 'Preview clínico',
  children,
}: MobileClinicalPreviewSheetProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-labelledby="fluid-preview-sheet-title">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Fechar preview"
        onClick={() => onOpenChange(false)}
      />
      <div className="absolute bottom-0 left-0 right-0 flex max-h-[min(88dvh,900px)] flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
          <div className="min-w-0">
            <h2 id="fluid-preview-sheet-title" className="flex items-center gap-2 truncate text-lg font-bold text-slate-900 dark:text-slate-100">
              <Activity className="h-5 w-5 shrink-0 text-teal-500" />
              {title}
            </h2>
            <p className="truncate text-xs text-slate-500">Taxas, composição e alertas em tempo real</p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
