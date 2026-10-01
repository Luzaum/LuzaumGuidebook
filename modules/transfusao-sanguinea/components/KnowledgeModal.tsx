import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { sanitizeHTML } from '../../../utils/sanitize';
import { knowledgeBase, type KnowledgeItem } from '../data/knowledgeBase';

interface KnowledgeModalProps {
  term: string | null;
  onClose: () => void;
  entries?: Record<string, KnowledgeItem>;
}

export const KnowledgeModal: React.FC<KnowledgeModalProps> = React.memo(({ term, onClose, entries = knowledgeBase }) => {
  const dialog = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    if (!term) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close.current();
      if (e.key === 'Tab') {
        const items = dialog.current?.querySelectorAll<HTMLElement>('button, a[href], input, [tabindex="0"]');
        if (!items?.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [term]);

  if (!term) return null;
  const data = entries[term];
  if (!data) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={data.title}
    >
      <div ref={dialog}
        className="relative bg-card border border-border/80 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com tom de sangue vermelho sutil e gradiente */}
        <div className="flex items-center justify-between p-5 border-b border-border/50 bg-gradient-to-r from-red-500/5 to-transparent">
          <h3 
            className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(data.title) }}
          />
          <button 
            onClick={onClose}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-red-500/40"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Corpo com tipografia premium */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <div 
            className="prose max-w-none text-foreground/90 dark:text-foreground/80 [&_p]:mb-4 [&_p]:leading-relaxed
                       prose-headings:text-foreground prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-2
                       prose-p:leading-relaxed prose-p:mb-4
                       prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-4
                       prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-4
                       prose-strong:text-red-500 prose-strong:font-semibold"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(data.content) }}
          />
          {data.sources && <div className="mt-5 space-y-2 border-t border-border pt-4"><p className="text-xs font-semibold text-muted-foreground">Fontes e leitura complementar</p>{data.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="block py-2 text-sm text-red-600 underline underline-offset-4 dark:text-red-300">{source.label}</a>)}</div>}
        </div>

        {/* Footer premium sutil */}
        <div className="p-4 border-t border-border/50 bg-muted/30 text-right">
          <button
            onClick={onClose}
            className="min-h-11 rounded-xl bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-red-500/10 transition-all hover:bg-red-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/40"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
});

KnowledgeModal.displayName = 'KnowledgeModal';
export default KnowledgeModal;
