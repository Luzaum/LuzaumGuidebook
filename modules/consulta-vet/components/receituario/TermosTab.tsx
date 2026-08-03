import React, { useState } from 'react';
import { AlertTriangle, FileCheck, FileSignature, ShieldAlert, X } from 'lucide-react';
import { DocumentTemplate, QuickRefusalFields } from '../../types/receituario';

interface TermosTabProps {
  templates: DocumentTemplate[];
  onSelectTerm: (template: DocumentTemplate, initialBodyText?: string) => void;
}

export function TermosTab({ templates, onSelectTerm }: TermosTabProps) {
  const termsOnly = templates.filter((t) => t.document_type === 'term');

  // Quick Refusal Dialog state
  const [isRefusalModalOpen, setIsRefusalModalOpen] = useState(false);
  const [refusalTemplate, setRefusalTemplate] = useState<DocumentTemplate | null>(null);
  const [quickFields, setQuickFields] = useState<QuickRefusalFields>({
    conduct: '',
  });

  const handleOpenTerm = (template: DocumentTemplate) => {
    // If Termo Geral de Recusa, open quick input modal first
    if (template.id === 'term-geral-recusa' || template.title.toLowerCase().includes('recusa de procedimento')) {
      setRefusalTemplate(template);
      setQuickFields({
        conduct: '',
      });
      setIsRefusalModalOpen(true);
      return;
    }

    onSelectTerm(template);
  };

  const handleConfirmRefusalFields = () => {
    if (!refusalTemplate) return;

    let updatedText = refusalTemplate.body_plain_text;

    if (quickFields.conduct.trim()) {
      updatedText = updatedText.replace(
        /(CONDUTA RECOMENDADA E RECUSADA:\s*\n+)(?:A PREENCHER|\[[^\]]+\])/i,
        `$1${quickFields.conduct.trim()}`
      );
    }

    setIsRefusalModalOpen(false);
    onSelectTerm(refusalTemplate, updatedText);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Termos Jurídicos e de Consentimento</h2>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Modelos jurídicos simplificados e abrangentes. O <strong>Termo Geral de Recusa</strong> serve para qualquer tipo de recusa (exames, internação, cirurgia, medicação, encaminhamento, etc.).
            </p>
          </div>
        </div>
      </div>

      {/* Grid of 4 Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {termsOnly.map((term) => (
          <div
            key={term.id}
            className="flex flex-col justify-between rounded-xl border border-border/80 bg-card p-5 shadow-sm hover:border-primary/50 transition-all"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <FileSignature className="h-5 w-5 text-primary shrink-0" />
                <h3 className="text-base font-semibold text-foreground">{term.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                {term.body_plain_text.substring(0, 160)}...
              </p>
            </div>

            <div className="pt-3 border-t border-border/50 flex items-center justify-between">
              <span className="text-[11px] font-medium text-muted-foreground">Texto 100% Editável</span>
              <button
                type="button"
                onClick={() => handleOpenTerm(term)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Usar termo</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Input Modal for Termo Geral de Recusa */}
      {isRefusalModalOpen && refusalTemplate && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <div className="flex items-center gap-2 text-amber-500 font-semibold text-base">
                <AlertTriangle className="h-5 w-5" />
                <span>Preenchimento Rápido - Termo de Recusa</span>
              </div>
              <button
                type="button"
                onClick={() => setIsRefusalModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Fechar preenchimento rápido"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground mb-4">
              Informe apenas a conduta que foi recomendada e recusada. Os riscos gerais já estão incluídos no termo e todo o texto poderá ser editado depois.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Conduta recomendada e recusada
                </label>
                <input
                  type="text"
                  value={quickFields.conduct}
                  onChange={(e) =>
                    setQuickFields({ conduct: e.target.value })
                  }
                  placeholder="Ex.: internação veterinária com fluidoterapia e monitorização"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>

            </div>

            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => onSelectTerm(refusalTemplate)}
                className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted"
              >
                Pular / Abrir direto
              </button>
              <button
                type="button"
                onClick={handleConfirmRefusalFields}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <FileCheck className="h-4 w-4" />
                <span>Gerar e Abrir Editor</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
