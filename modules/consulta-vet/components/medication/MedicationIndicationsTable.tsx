import React, { useState } from 'react';
import { ChevronDown, ExternalLink, ShieldCheck, FlaskConical, Info } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import type { MedicationDetailedIndication } from '../../types/medication';
import type { EditorialReference } from '../../types/common';

interface MedicationIndicationsTableProps {
  indications: MedicationDetailedIndication[];
  references?: EditorialReference[];
  onReferenceClick?: (referenceId: string) => void;
}

function SpeciesBadge({ species }: { species: 'dog' | 'cat' | 'both' }) {
  if (species === 'dog') {
    return (
      <span className="inline-flex items-center rounded-full border border-sky-500/25 bg-sky-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
        Canino
      </span>
    );
  }
  if (species === 'cat') {
    return (
      <span className="inline-flex items-center rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
        Felino
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
      Cães & Gatos
    </span>
  );
}

function NumericReferenceButton({
  refId,
  index,
  citation,
  onClick,
}: {
  refId: string;
  index: number;
  citation?: string;
  onClick?: (id: string) => void;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick(refId);
      return;
    }
    const target = document.getElementById(refId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.add('ring-2', 'ring-primary', 'transition-all');
      setTimeout(() => target.classList.remove('ring-2', 'ring-primary'), 2000);
    }
  };

  return (
    <a
      href={`#${refId}`}
      onClick={handleClick}
      title={citation || `Ver referência ${index + 1}`}
      className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-1.5 text-xs font-bold text-primary transition-all hover:scale-110 hover:bg-primary/20 hover:text-primary active:scale-95"
    >
      {index + 1}
    </a>
  );
}

/** Disclosure toggle genérico para textos longos */
function ExpandableBlock({
  label,
  icon: Icon,
  children,
  variant = 'default',
}: {
  label: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  variant?: 'default' | 'rationale';
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex w-full items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold transition-all duration-200',
          variant === 'rationale'
            ? 'border border-primary/20 bg-primary/[0.04] text-primary hover:bg-primary/[0.08]'
            : 'border border-border/60 bg-muted/30 text-foreground/80 hover:bg-muted/50',
        )}
      >
        {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
        <span className="flex-1">{label}</span>
        <ChevronDown
          className={cn('h-3.5 w-3.5 shrink-0 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div
          className={cn(
            'mt-1.5 rounded-lg px-3 py-2.5 text-xs leading-relaxed animate-in fade-in-0 slide-in-from-top-1 duration-200',
            variant === 'rationale'
              ? 'border border-primary/15 bg-primary/[0.03] text-foreground/85'
              : 'border border-border/40 bg-muted/20 text-foreground/80',
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function MedicationIndicationsTable({
  indications,
  references = [],
  onReferenceClick,
}: MedicationIndicationsTableProps) {
  if (!indications?.length) return null;

  const getRefIndex = (refId: string): number => {
    const idx = references.findIndex((r) => r.id === refId);
    return idx >= 0 ? idx : 0;
  };

  const getRefCitation = (refId: string): string | undefined => {
    return references.find((r) => r.id === refId)?.citationText;
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xs shadow-xs">
      {/* ──────── Visualização Desktop/Notebook (Cards por Indicação) ──────── */}
      <div className="hidden lg:block">
        <div className="divide-y divide-border/60">
          {indications.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-5 transition-colors hover:bg-muted/10"
            >
              {/* Cabeçalho: Badge + Título + Posologia resumida */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                {/* Lado esquerdo: Espécie + Indicação */}
                <div className="min-w-0 flex-1 max-w-[55%]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <SpeciesBadge species={item.species} />
                  </div>
                  <h4 className="font-bold text-foreground text-[15px] leading-snug">
                    {item.indication}
                  </h4>
                </div>

                {/* Lado direito: Posologia compacta */}
                <div className="shrink-0 text-right space-y-1 max-w-[42%]">
                  <div className="font-bold text-foreground text-sm leading-tight">
                    {item.dose}
                  </div>
                  <div className="text-xs font-medium text-primary">{item.route}</div>
                  <div className="text-xs text-muted-foreground">{item.frequency}</div>
                </div>
              </div>

              {/* Grid inferior: Duração + Monitoramento + Referências */}
              <div className="mt-3 flex flex-wrap items-start gap-3">
                {/* Duração */}
                <div className="rounded-lg bg-muted/30 border border-border/50 px-3 py-2 text-xs">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground block">
                    Duração
                  </span>
                  <span className="mt-0.5 block font-semibold text-foreground text-xs leading-snug">
                    {item.duration}
                  </span>
                </div>

                {/* Monitoramento (se houver) */}
                {item.monitoring && (
                  <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-xs max-w-xs">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-300 block">
                      Monitorar
                    </span>
                    <span className="mt-0.5 block text-amber-900 dark:text-amber-200 leading-snug">
                      {item.monitoring}
                    </span>
                  </div>
                )}

                {/* Referências */}
                <div className="flex items-center gap-2 ml-auto">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.referenceIds?.map((refId) => (
                      <NumericReferenceButton
                        key={refId}
                        refId={refId}
                        index={getRefIndex(refId)}
                        citation={getRefCitation(refId)}
                        onClick={onReferenceClick}
                      />
                    ))}
                  </div>
                  {item.evidenceLevel && (
                    <span className="text-[10px] text-muted-foreground italic max-w-[140px] leading-tight">
                      {item.evidenceLevel}
                    </span>
                  )}
                </div>
              </div>

              {/* Expandibles: Contexto Clínico + Mecanismo + Racional */}
              <div className="mt-2 grid grid-cols-1 xl:grid-cols-3 gap-2">
                {/* Contexto Clínico (expandível) */}
                {item.clinicalContext && (
                  <ExpandableBlock label="Contexto Clínico Detalhado" icon={Info}>
                    <p className="whitespace-pre-line">{item.clinicalContext}</p>
                  </ExpandableBlock>
                )}

                {/* Mecanismo de Ação (expandível) */}
                {item.mechanismOfAction && (
                  <ExpandableBlock label="Mecanismo de Ação" icon={FlaskConical}>
                    <p className="whitespace-pre-line">{item.mechanismOfAction}</p>
                  </ExpandableBlock>
                )}

                {/* Por que e como fazer (expandível) */}
                {item.clinicalRationale && (
                  <ExpandableBlock label="Por que e como fazer" icon={ShieldCheck} variant="rationale">
                    <p className="whitespace-pre-line">{item.clinicalRationale}</p>
                  </ExpandableBlock>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ──────── Visualização Responsiva em Cartões (Mobile & Tablet) ──────── */}
      <div className="divide-y divide-border/60 lg:hidden">
        {indications.map((item, idx) => (
          <details key={item.id || idx} className="group p-4 transition-colors hover:bg-muted/10">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <SpeciesBadge species={item.species} />
                  <span className="text-[11px] font-semibold text-primary">{item.route}</span>
                </div>
                <h4 className="text-sm font-bold text-foreground">{item.indication}</h4>
                <p className="mt-1 text-xs font-semibold text-foreground/90">{item.dose} • {item.frequency}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-muted-foreground group-open:text-primary">
                <span>Detalhes</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
              </div>
            </summary>

            <div className="mt-4 space-y-3.5 border-t border-border/50 pt-3.5 text-xs">
              {item.clinicalContext && (
                <ExpandableBlock label="Contexto Clínico" icon={Info}>
                  <p className="leading-relaxed">{item.clinicalContext}</p>
                </ExpandableBlock>
              )}

              <ExpandableBlock label="Mecanismo de Ação" icon={FlaskConical}>
                <p className="leading-relaxed">{item.mechanismOfAction}</p>
              </ExpandableBlock>

              {item.clinicalRationale && (
                <ExpandableBlock label="Por que e como fazer" icon={ShieldCheck} variant="rationale">
                  <p className="leading-relaxed">{item.clinicalRationale}</p>
                </ExpandableBlock>
              )}

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-lg bg-muted/40 p-2.5">
                  <span className="block font-bold text-[10px] uppercase text-muted-foreground">Duração do tratamento</span>
                  <span className="mt-1 block font-semibold text-foreground">{item.duration}</span>
                </div>
                {item.monitoring ? (
                  <div className="rounded-lg bg-amber-500/10 p-2.5 text-amber-900 dark:text-amber-200">
                    <span className="block font-bold text-[10px] uppercase">O que monitorar</span>
                    <span className="mt-1 block">{item.monitoring}</span>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/40">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-muted-foreground">Fontes:</span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.referenceIds?.map((refId) => (
                      <NumericReferenceButton
                        key={refId}
                        refId={refId}
                        index={getRefIndex(refId)}
                        citation={getRefCitation(refId)}
                        onClick={onReferenceClick}
                      />
                    ))}
                  </div>
                </div>
                {item.evidenceLevel ? (
                  <span className="text-[10px] text-muted-foreground italic">{item.evidenceLevel}</span>
                ) : null}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
