import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  FlaskConical,
  Info,
  Syringe,
  Clock,
  AlertTriangle,
  Activity,
  FileText,
  BookOpen,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import type { MedicationDetailedIndication } from '../../types/medication';
import type { EditorialReference } from '../../types/common';
import { sanitizeReferenceText } from '../../utils/referenceSanitizer';

interface MedicationIndicationsTableProps {
  indications: MedicationDetailedIndication[];
  references?: EditorialReference[];
  onReferenceClick?: (referenceId: string) => void;
}

type TabKey = 'context' | 'mechanism' | 'rationale';

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
      className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-1 text-[10px] font-bold text-primary transition-all hover:scale-110 hover:bg-primary/20 hover:text-primary active:scale-95 sm:h-6 sm:min-w-6 sm:px-1.5 sm:text-xs"
    >
      {index + 1}
    </a>
  );
}



type PointTone = 'warning' | 'practice' | 'evidence' | 'mechanism' | 'default';

interface StructuredPoint {
  label: string;
  body: string;
  tone: PointTone;
}

const CLINICAL_HIGHLIGHT_REGEX =
  /(\b\d+(?:[.,]\d+)?(?:\s*[–-]\s*\d+(?:[.,]\d+)?)?\s*(?:mg\/kg(?:\/h)?|µg\/kg|mcg\/kg|mL\/kg(?:\/min)?|ng\/mL|mg\/mL|L\/kg|%|min(?:utos?)?|horas?|h)\b|\b(?:contraindicad[oa]s?|inadequad[oa]s?|nunca|obrigatóri[oa]s?|efeito teto|hipoxemia|bradicardia|depressão respiratória|oxigenoterapia|resgate analgésico|reversão parcial|passagem de primeira|primeira passagem)\b|\b(?:receptores?\s*(?:κ|µ|δ|NMDA|GABA|α2)|agonistas?\s*(?:κ|µ(?:\s*plenos?)?|alfa-?2)|antagonis(?:mo|ta)\s*(?:funcional\s*)?(?:µ|NMDA)?|somação temporal|CAM|Vdss|clearance|SpO2|EtCO2|IV|IM|SC|VO|OTM|CRI)\b|\b(?:butorfanol|cetamina|escetamina|dexmedetomidina|medetomidina|xilazina|acepromazina|midazolam|diazepam|alfaxalona|propofol|metadona|morfina|buprenorfina|hidromorfona|fentanil|naloxona|isoflurano|Lumb\s*&\s*Jones|Plumb[’']?s|BSAVA|ISFM\s*2022|AAHA\s*2022|ACVIM\s*\d{4})\b)/gi;

function renderClinicalHighlights(text: string): React.ReactNode {
  if (!text) return null;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = new RegExp(CLINICAL_HIGHLIGHT_REGEX.source, 'gi');
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    const lower = token.toLowerCase();

    let cls = 'font-semibold text-sky-700 dark:text-sky-300';
    if (
      /^\d/.test(token) ||
      /mg\/kg|µg\/kg|mcg\/kg|ml\/kg|ng\/ml|mg\/ml|l\/kg|%|min|hora/i.test(lower)
    ) {
      cls =
        'inline rounded px-1.5 py-0.5 font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border border-emerald-500/25';
    } else if (
      /contraindicad|inadequad|nunca|obrigatóri|efeito teto|hipoxemia|bradicardia|depressão|oxigenoterapia|resgate|reversão|primeira passagem/i.test(
        lower
      )
    ) {
      cls =
        'inline rounded px-1.5 py-0.5 font-bold bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/25';
    } else if (
      /receptor|agonista|antagonis|somação|cam|vdss|clearance|spo2|etco2|\b(?:iv|im|sc|vo|otm|cri)\b/i.test(
        lower
      )
    ) {
      cls =
        'inline rounded px-1 py-0.5 font-semibold bg-purple-500/15 text-purple-800 dark:text-purple-200 border border-purple-500/20';
    }

    parts.push(
      <span key={key++} className={cls}>
        {token}
      </span>
    );
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function classifyPointTone(text: string, tab: TabKey): { tone: PointTone; label: string } {
  if (
    /contraindicad|inadequado|inadequada|nunca|evitar|cuidado|atenção|risco|exigindo|efeito teto|alerta|proibid|alterar|retenção|hipoxemia|bradicardia|mascarar/i.test(
      text
    )
  ) {
    return { tone: 'warning', label: 'Atenção & Limitação' };
  }
  if (
    /portanto|recomenda|deve(?:-se)?|preferir|substitu|titular|protocolo|reserva-se|observar estritamente|prioridade|assegura|garante/i.test(
      text
    )
  ) {
    return { tone: 'practice', label: 'Conduta Prática' };
  }
  if (
    /estudo|ensaio|consenso|Lumb\s*&\s*Jones|Plumb|BSAVA|ISFM|AAHA|ACVIM|et al\.|\(\d{4}\)/i.test(
      text
    )
  ) {
    return { tone: 'evidence', label: 'Evidência & Referência' };
  }
  if (tab === 'mechanism') {
    return { tone: 'mechanism', label: 'Mecanismo & Via' };
  }
  if (tab === 'context') {
    return { tone: 'evidence', label: 'Indicação & Cenário' };
  }
  return { tone: 'practice', label: 'Racional Clínico' };
}

function parseStructuredModalPoints(rawText: string, tab: TabKey): StructuredPoint[] {
  const blocks = rawText
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const rawSentences: string[] = [];

  for (const block of blocks) {
    // Se já vier separado por marcadores explícitos
    if (block.includes('•')) {
      const bullets = block
        .split('•')
        .map((s) => s.trim())
        .filter(Boolean);
      rawSentences.push(...bullets);
      continue;
    }

    // Divide sentenças longas com segurança sem quebrar et al., 6ª ed., p. 382, etc.
    const protectedText = block
      .replace(/\b(et al|ed|pp?|Cap|Fig|Vol|spp|Dr|Sr|Sra|nº|aprox|máx|mín)\./gi, '$1__DOT__')
      .replace(/(?<=\d)\.(?=\d)/g, '__DOT__');

    const splitSentences = protectedText
      .split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÀÂÊÔÃÕÇ(])/)
      .map((s) => s.replace(/__DOT__/g, '.').trim())
      .filter(Boolean);

    if (splitSentences.length <= 1) {
      rawSentences.push(block);
    } else {
      rawSentences.push(...splitSentences);
    }
  }

  return rawSentences.map((sentence) => {
    const colonIdx = sentence.indexOf(':');
    const hasInlineHeader =
      colonIdx > 3 && colonIdx < 64 && !/^https?:/i.test(sentence.slice(0, colonIdx + 2));
    const { tone, label: inferredLabel } = classifyPointTone(sentence, tab);

    if (hasInlineHeader) {
      return {
        label: sentence.slice(0, colonIdx).replace(/\*\*/g, '').trim(),
        body: sentence.slice(colonIdx + 1).trim(),
        tone,
      };
    }

    return {
      label: inferredLabel,
      body: sentence,
      tone,
    };
  });
}

const POINT_TONE_STYLES: Record<
  PointTone,
  {
    stripe: string;
    badge: string;
    titleText: string;
    bgAccent: string;
  }
> = {
  warning: {
    stripe: 'border-l-amber-500',
    badge: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30',
    titleText: 'text-amber-700 dark:text-amber-300',
    bgAccent: 'bg-amber-500/[0.05]',
  },
  practice: {
    stripe: 'border-l-emerald-500',
    badge: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
    titleText: 'text-emerald-700 dark:text-emerald-300',
    bgAccent: '',
  },
  evidence: {
    stripe: 'border-l-sky-500',
    badge: 'bg-sky-500/15 text-sky-800 dark:text-sky-300 border-sky-500/30',
    titleText: 'text-sky-700 dark:text-sky-300',
    bgAccent: '',
  },
  mechanism: {
    stripe: 'border-l-purple-500',
    badge: 'bg-purple-500/15 text-purple-800 dark:text-purple-300 border-purple-500/30',
    titleText: 'text-purple-700 dark:text-purple-300',
    bgAccent: '',
  },
  default: {
    stripe: 'border-l-primary',
    badge: 'bg-primary/10 text-primary border-primary/25',
    titleText: 'text-primary',
    bgAccent: '',
  },
};

/** Modal Pop-up Fluido com Design System Vetius */
function IndicationDetailModal({
  indication,
  isOpen,
  onClose,
  initialTab = 'context',
  references = [],
  onReferenceClick,
}: {
  indication: MedicationDetailedIndication | null;
  isOpen: boolean;
  onClose: () => void;
  initialTab?: TabKey;
  references?: EditorialReference[];
  onReferenceClick?: (id: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !indication) return null;

  const getRefIndex = (refId: string): number => {
    const idx = references.findIndex((r) => r.id === refId);
    return idx >= 0 ? idx : 0;
  };

  const getRefCitation = (refId: string): string | undefined => {
    return references.find((r) => r.id === refId)?.citationText;
  };

  const tabs: Array<{
    id: TabKey;
    label: string;
    sublabel: string;
    icon: React.ComponentType<{ className?: string }>;
    accentClass: string;
    badgeClass: string;
  }> = [
    {
      id: 'context',
      label: 'Contexto Clínico',
      sublabel: 'Quando e como indicar',
      icon: Info,
      accentClass:
        'border-sky-500/30 bg-sky-500/10 text-sky-800 dark:text-sky-200 shadow-xs ring-1 ring-sky-500/30',
      badgeClass: 'bg-sky-500/20 text-sky-700 dark:text-sky-300',
    },
    {
      id: 'mechanism',
      label: 'Mecanismo de Ação',
      sublabel: 'Farmacodinâmica e vias',
      icon: FlaskConical,
      accentClass:
        'border-purple-500/30 bg-purple-500/10 text-purple-800 dark:text-purple-200 shadow-xs ring-1 ring-purple-500/30',
      badgeClass: 'bg-purple-500/20 text-purple-700 dark:text-purple-300',
    },
    {
      id: 'rationale',
      label: 'Por que e como fazer',
      sublabel: 'Racional e conduta prática',
      icon: ShieldCheck,
      accentClass:
        'border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 shadow-xs ring-1 ring-emerald-500/30',
      badgeClass: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
    },
  ];

  const currentTabIdx = tabs.findIndex((t) => t.id === activeTab);

  const handlePrevTab = () => {
    const prevIdx = currentTabIdx > 0 ? currentTabIdx - 1 : tabs.length - 1;
    setActiveTab(tabs[prevIdx].id);
  };

  const handleNextTab = () => {
    const nextIdx = currentTabIdx < tabs.length - 1 ? currentTabIdx + 1 : 0;
    setActiveTab(tabs[nextIdx].id);
  };

  const activeContentText =
    activeTab === 'context'
      ? indication.clinicalContext || 'Contexto clínico detalhado em revisão editorial.'
      : activeTab === 'mechanism'
      ? indication.mechanismOfAction || 'Mecanismo farmacológico detalhado em revisão editorial.'
      : indication.clinicalRationale || 'Racional clínico e condutas práticas em revisão editorial.';

  const structuredPoints = parseStructuredModalPoints(activeContentText, activeTab);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop suave */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/65 dark:bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Caixa do Pop-up Ampliada */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex w-full max-w-5xl h-[90vh] max-h-[92vh] flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-border/90 bg-background text-foreground shadow-2xl"
      >
        {/* Cabeçalho do Modal */}
        <div className="border-b border-border/80 bg-muted/20 px-5 pt-5 pb-4 sm:px-7 sm:pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <SpeciesBadge species={indication.species} />
              </div>
              <h3 className="text-base sm:text-xl font-black text-foreground leading-snug tracking-tight">
                {indication.indication}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/80 bg-background/80 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Fechar janela"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Posologia Rápida de Apoio no topo da janela */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2 rounded-xl border border-primary/20 bg-primary/[0.04] px-3.5 py-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-primary">
              <Syringe className="h-3.5 w-3.5 shrink-0" />
              <span>Dose:</span>
            </div>
            <span className="font-semibold text-foreground">{indication.dose}</span>
            <span className="text-muted-foreground/40 hidden sm:inline">&bull;</span>
            <span className="text-muted-foreground font-medium">{indication.route}</span>
            {indication.duration && (
              <>
                <span className="text-muted-foreground/40 hidden sm:inline">&bull;</span>
                <span className="text-muted-foreground font-medium hidden sm:inline">
                  Duração: {indication.duration}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Barra de Abas do Modal */}
        <div className="border-b border-border/70 bg-background px-4 sm:px-6 pt-3 pb-2.5">
          <div className="grid grid-cols-3 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'relative flex flex-col items-center justify-center rounded-xl p-2 sm:p-2.5 text-center transition-all duration-200',
                    isActive
                      ? tab.accentClass
                      : 'border border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold tracking-tight">
                      {tab.label}
                    </span>
                  </div>
                  <span className="text-[10px] hidden sm:block opacity-80 mt-0.5">
                    {tab.sublabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conteúdo da Aba com Grifa-Texto e Animação Fluida */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6 space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="space-y-4"
            >
              {/* Conteúdo estruturado com listras alternadas, código de cores e grifa-texto */}
              <div className="overflow-hidden rounded-2xl border border-border/80 divide-y divide-border/60 shadow-2xs">
                {structuredPoints.map((point, pIdx) => {
                  const toneStyle = POINT_TONE_STYLES[point.tone];
                  const zebraBg =
                    point.tone === 'warning'
                      ? toneStyle.bgAccent
                      : pIdx % 2 === 0
                      ? 'bg-background/95'
                      : 'bg-muted/35';

                  return (
                    <div
                      key={pIdx}
                      className={cn(
                        'border-l-4 px-4 py-3.5 sm:px-5 sm:py-4 transition-colors',
                        toneStyle.stripe,
                        zebraBg
                      )}
                    >
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                            toneStyle.badge
                          )}
                        >
                          {pIdx + 1}. {point.label}
                        </span>
                      </div>

                      <p
                        className={cn(
                          'text-sm sm:text-[15px] leading-relaxed',
                          point.tone === 'warning'
                            ? 'text-amber-950 dark:text-amber-100/95'
                            : 'text-foreground/90'
                        )}
                      >
                        {renderClinicalHighlights(point.body)}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Referências Clínicas desta Conduta por Extenso */}
              {indication.referenceIds && indication.referenceIds.length > 0 && (
                <div className="mt-5 rounded-2xl border border-border/80 bg-muted/20 p-4 sm:p-5 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Referências Clínicas desta Conduta
                  </span>

                  <div className="space-y-2.5 pt-1">
                    {indication.referenceIds.map((refId) => {
                      const refIndex = getRefIndex(refId);
                      const ref = references.find((r) => r.id === refId);
                      const citation = sanitizeReferenceText(
                        ref?.citationText || ref?.citation || 'Referência bibliográfica'
                      );
                      const cleanNotes = sanitizeReferenceText(ref?.notes);
                      const sourceType = ref?.sourceType || 'Literatura Científica';
                      const url =
                        ref?.url ||
                        (ref?.doi ? `https://doi.org/${ref.doi}` : undefined) ||
                        (ref?.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/` : undefined) ||
                        `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(citation.slice(0, 160))}`;

                      return (
                        <div
                          key={refId}
                          className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-background/80 p-3 text-xs"
                        >
                          <span className="inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {refIndex + 1}
                          </span>
                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="inline-block rounded-md bg-primary/[0.08] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                                {sourceType}
                              </span>
                            </div>
                            <p className="text-foreground/90 leading-relaxed font-medium">
                              {citation}
                            </p>
                            {cleanNotes && (
                              <p className="text-muted-foreground leading-relaxed">
                                {cleanNotes}
                              </p>
                            )}
                            {url && (
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline pt-0.5"
                              >
                                <span>Acessar publicação / fonte oficial</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Parâmetros Práticos Complementares (Duração & Monitoramento) */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border border-border/70 bg-muted/30 p-3.5 text-xs">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground block">
                    Duração Recomendada
                  </span>
                  <span className="mt-1 block font-semibold text-foreground text-xs sm:text-sm leading-snug">
                    {indication.duration}
                  </span>
                </div>

                {indication.monitoring && (
                  <div className="rounded-xl border border-amber-500/25 bg-amber-500/10 p-3.5 text-xs">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-300 block">
                      Vigilância & Monitoramento
                    </span>
                    <span className="mt-1 block text-amber-900 dark:text-amber-200 text-xs sm:text-sm leading-snug">
                      {indication.monitoring}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Rodapé de Ações do Modal */}
        <div className="border-t border-border/80 bg-muted/20 px-5 py-3 sm:px-7 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevTab}
              className="inline-flex items-center gap-1 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Aba Anterior</span>
            </button>
            <button
              type="button"
              onClick={handleNextTab}
              className="inline-flex items-center gap-1 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <span>Próxima Aba</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all active:scale-95"
          >
            Concluir Leitura
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function MedicationIndicationsTable({
  indications,
  references = [],
  onReferenceClick,
}: MedicationIndicationsTableProps) {
  const [modalIndication, setModalIndication] = useState<MedicationDetailedIndication | null>(null);
  const [modalTab, setModalTab] = useState<TabKey>('context');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!indications?.length) return null;

  const getRefIndex = (refId: string): number => {
    const idx = references.findIndex((r) => r.id === refId);
    return idx >= 0 ? idx : 0;
  };

  const getRefCitation = (refId: string): string | undefined => {
    return references.find((r) => r.id === refId)?.citationText;
  };

  const handleOpenModal = (item: MedicationDetailedIndication, tab: TabKey) => {
    setModalIndication(item);
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div id="indicacoes-clinicas" className="scroll-mt-24 space-y-4">
        {indications.map((item, idx) => (
          <div
            key={item.id || idx}
            className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/75 backdrop-blur-xs p-4 sm:p-6 shadow-xs transition-all duration-200 hover:border-primary/40 hover:shadow-md"
          >
            {/* Top Bar: Espécie + Referências */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <SpeciesBadge species={item.species} />
              </div>

              {item.referenceIds && item.referenceIds.length > 0 && (
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="text-[10px] font-medium text-muted-foreground hidden sm:inline">
                    Fontes:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.referenceIds.map((refId) => (
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
              )}
            </div>

            {/* Título da Indicação com destaque e espaçamento generoso */}
            <h4 className="mt-2.5 text-base sm:text-lg font-bold text-foreground leading-snug tracking-tight">
              {item.indication}
            </h4>

            {/* Box Central Estruturado de Dose & Posologia */}
            <div className="mt-3.5 rounded-xl border border-primary/20 bg-primary/[0.03] dark:bg-primary/[0.07] p-3.5 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-primary/10 pb-2 mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                  <Syringe className="h-3.5 w-3.5 shrink-0" />
                  <span>Dose & Esquema Posológico</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-background/90 px-2 py-0.5 text-[11px] font-semibold text-foreground shadow-2xs">
                    <Activity className="h-3 w-3 text-primary" />
                    {item.route}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background/70 px-2 py-0.5 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    {item.frequency}
                  </span>
                </div>
              </div>
              <p className="text-sm sm:text-[15px] font-semibold text-foreground leading-relaxed">
                {item.dose}
              </p>
            </div>

            {/* Grid de Parâmetros Práticos (Duração & Monitoramento) */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Duração */}
              <div className="rounded-xl border border-border/60 bg-muted/30 p-3 text-xs flex flex-col justify-between">
                <span className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider text-muted-foreground">
                  <Clock className="h-3 w-3 text-muted-foreground" /> Duração do Tratamento
                </span>
                <span className="mt-1 font-medium text-foreground leading-snug">
                  {item.duration}
                </span>
              </div>

              {/* Monitoramento */}
              {item.monitoring && (
                <div className="rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-xs flex flex-col justify-between">
                  <span className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-300">
                    <AlertTriangle className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                    O Que Monitorar
                  </span>
                  <span className="mt-1 text-amber-900 dark:text-amber-200 leading-snug">
                    {item.monitoring}
                  </span>
                </div>
              )}
            </div>

            {/* Botões Interativos de Aprofundamento (Abrem em Pop-up com animação fluida) */}
            <div className="mt-4 pt-3.5 border-t border-border/60">
              <div className="mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  Aprofundamento & Racional Clínico
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* Botão Contexto Clínico */}
                <button
                  type="button"
                  onClick={() => handleOpenModal(item, 'context')}
                  className="flex items-center justify-between gap-2 rounded-xl border border-sky-500/25 bg-sky-500/[0.04] p-2.5 text-left text-xs font-semibold text-sky-800 dark:text-sky-200 transition-all hover:bg-sky-500/10 hover:border-sky-500/40 hover:shadow-xs active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-700 dark:text-sky-300">
                      <Info className="h-4 w-4" />
                    </div>
                    <div className="truncate">
                      <span className="block font-bold">Contexto Clínico</span>
                      <span className="text-[10px] text-sky-700/80 dark:text-sky-300/80 block font-normal truncate">
                        Quando e como indicar
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-sky-600 dark:text-sky-400 opacity-60" />
                </button>

                {/* Botão Mecanismo de Ação */}
                <button
                  type="button"
                  onClick={() => handleOpenModal(item, 'mechanism')}
                  className="flex items-center justify-between gap-2 rounded-xl border border-purple-500/25 bg-purple-500/[0.04] p-2.5 text-left text-xs font-semibold text-purple-800 dark:text-purple-200 transition-all hover:bg-purple-500/10 hover:border-purple-500/40 hover:shadow-xs active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-700 dark:text-purple-300">
                      <FlaskConical className="h-4 w-4" />
                    </div>
                    <div className="truncate">
                      <span className="block font-bold">Mecanismo de Ação</span>
                      <span className="text-[10px] text-purple-700/80 dark:text-purple-300/80 block font-normal truncate">
                        Farmacodinâmica e vias
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-purple-600 dark:text-purple-400 opacity-60" />
                </button>

                {/* Botão Por que e como fazer */}
                <button
                  type="button"
                  onClick={() => handleOpenModal(item, 'rationale')}
                  className="flex items-center justify-between gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.04] p-2.5 text-left text-xs font-semibold text-emerald-800 dark:text-emerald-200 transition-all hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:shadow-xs active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div className="truncate">
                      <span className="block font-bold">Por que e como fazer</span>
                      <span className="text-[10px] text-emerald-700/80 dark:text-emerald-300/80 block font-normal truncate">
                        Racional clínico e conduta
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400 opacity-60" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Janela Pop-up Fluida */}
      <AnimatePresence>
        {isModalOpen && modalIndication && (
          <IndicationDetailModal
            indication={modalIndication}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            initialTab={modalTab}
            references={references}
            onReferenceClick={onReferenceClick}
          />
        )}
      </AnimatePresence>
    </>
  );
}
