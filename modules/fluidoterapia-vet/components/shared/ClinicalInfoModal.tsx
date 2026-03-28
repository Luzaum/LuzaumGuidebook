import { X } from 'lucide-react';
import { InfoContent } from '../../data/clinicalContent';
import { ScrollArea } from '../ui/scroll-area';

interface Props {
  open: boolean;
  content?: InfoContent;
  onClose: () => void;
}

export function ClinicalInfoModal({ open, content, onClose }: Props) {
  if (!open || !content) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{content.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{content.summary}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-100"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-6 p-6">
            {content.sections.map((section) => (
              <section key={section.heading} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/50">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{section.heading}</h4>
                <ul className="mt-3 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {content.footer ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
                {content.footer}
              </div>
            ) : null}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
