import React from 'react';
import { ChevronDown, ExternalLink, ShieldCheck } from 'lucide-react';
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
      <span className="inline-flex items-center rounded-full border border-sky-500/25 bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
        Canino
      </span>
    );
  }
  if (species === 'cat') {
    return (
      <span className="inline-flex items-center rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
        Felino
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
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
      {/* Visualização em Tabela Completa (Desktop & Notebook) */}
      <div className="hidden xl:block overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-left" aria-label="Indicações de uso detalhadas com mecanismo de ação e posologia">
          <thead>
            <tr className="border-b border-border/80 bg-muted/40 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              <th scope="col" className="w-[23%] px-5 py-4">Indicação Clínica & Quadro</th>
              <th scope="col" className="w-[33%] px-5 py-4">Mecanismo de Ação na Indicação</th>
              <th scope="col" className="w-[18%] px-5 py-4">Posologia & Como Fazer</th>
              <th scope="col" className="w-[14%] px-5 py-4">Duração & Conduta</th>
              <th scope="col" className="w-[12%] px-5 py-4">Fontes & Nível</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-sm">
            {indications.map((item, idx) => (
              <tr key={item.id || idx} className="align-top transition-colors hover:bg-muted/20">
                {/* Indicação & Espécie */}
                <td className="px-5 py-4.5">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <SpeciesBadge species={item.species} />
                  </div>
                  <h4 className="font-bold text-foreground text-sm leading-snug">{item.indication}</h4>
                  {item.clinicalContext ? (
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.clinicalContext}</p>
                  ) : null}
                </td>

                {/* Mecanismo de ação detalhado */}
                <td className="px-5 py-4.5 text-[13px] leading-relaxed text-foreground/90">
                  <p className="whitespace-pre-line">{item.mechanismOfAction}</p>
                  {item.clinicalRationale ? (
                    <div className="mt-2.5 rounded-lg border border-primary/20 bg-primary/[0.04] p-2.5 text-xs leading-relaxed text-foreground/85">
                      <span className="font-bold text-primary">Por que e como fazer: </span>
                      {item.clinicalRationale}
                    </div>
                  ) : null}
                </td>

                {/* Posologia & Via */}
                <td className="px-5 py-4.5">
                  <div className="font-bold text-foreground text-xs leading-tight">
                    {item.dose}
                  </div>
                  <div className="mt-1 text-xs text-primary font-medium">{item.route}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{item.frequency}</div>
                </td>

                {/* Duração & Monitoramento */}
                <td className="px-5 py-4.5 text-xs leading-relaxed">
                  <div className="font-semibold text-foreground">{item.duration}</div>
                  {item.monitoring ? (
                    <div className="mt-2 rounded-md bg-amber-500/10 px-2 py-1.5 text-[11px] text-amber-900 dark:text-amber-200">
                      <span className="font-bold">Monitorar:</span> {item.monitoring}
                    </div>
                  ) : null}
                </td>

                {/* Fontes com botões numéricos ancorados */}
                <td className="px-5 py-4.5">
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
                  {item.evidenceLevel ? (
                    <p className="mt-2 text-[11px] leading-tight text-muted-foreground">
                      {item.evidenceLevel}
                    </p>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visualização Responsiva em Cartões (Mobile & Tablet) */}
      <div className="divide-y divide-border/60 xl:hidden">
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
                {item.clinicalContext ? (
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.clinicalContext}</p>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-muted-foreground group-open:text-primary">
                <span>Detalhes</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
              </div>
            </summary>

            <div className="mt-4 space-y-3.5 border-t border-border/50 pt-3.5 text-xs">
              <div>
                <h5 className="font-bold uppercase tracking-wider text-muted-foreground text-[10px]">Mecanismo de ação na indicação</h5>
                <p className="mt-1 leading-relaxed text-foreground/90">{item.mechanismOfAction}</p>
              </div>

              {item.clinicalRationale ? (
                <div className="rounded-lg border border-primary/20 bg-primary/[0.04] p-3 leading-relaxed text-foreground/85">
                  <span className="font-bold text-primary">Por que e como fazer: </span>
                  {item.clinicalRationale}
                </div>
              ) : null}

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
