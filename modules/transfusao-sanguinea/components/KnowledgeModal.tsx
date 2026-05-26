import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { sanitizeHTML } from '../../../utils/sanitize';
import { knowledgeBase } from '../data/knowledgeBase';

interface KnowledgeModalProps {
  term: string | null;
  onClose: () => void;
}

export const KnowledgeModal: React.FC<KnowledgeModalProps> = React.memo(({ term, onClose }) => {
  useEffect(() => {
    if (!term) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [term, onClose]);

  if (!term) return null;
  const data = knowledgeBase[term];
  if (!data) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
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
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Corpo com tipografia premium */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <div 
            className="prose max-w-none text-foreground/90 dark:text-foreground/80
                       prose-headings:text-foreground prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-2
                       prose-p:leading-relaxed prose-p:mb-4
                       prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-4
                       prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-4
                       prose-strong:text-red-500 prose-strong:font-semibold"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(data.content) }}
          />
        </div>

        {/* Footer premium sutil */}
        <div className="p-4 border-t border-border/50 bg-muted/30 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 active:scale-95 transition-all shadow-md shadow-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500/40"
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
