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
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import type { MedicationDetailedIndication } from '../../types/medication';
import type { EditorialReference } from '../../types/common';

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

/** Termos clínicos e farmacológicos essenciais destacados automaticamente para aprendizado */
const DEFAULT_EDUCATIONAL_TERMS = [
  'receptores NMDA pós-sinápticos',
  'receptores sinápticos inibitórios GABA-A',
  'receptores excitatórios NMDA',
  'canais marcapasso HCN1',
  'receptores NMDA',
  'receptor NMDA',
  'antagonista NMDA',
  'bloqueio NMDA',
  'canais NMDA',
  'receptores GABA-A',
  'receptor GABA-A',
  'receptores AMPA',
  'receptor AMPA',
  'subunidade GluN2B',
  'receptores opioides mu',
  'canais HCN1',
  'receptores alfa-2',
  'complexo TrkB–mTORC1',
  'via BDNF–TrkB–mTORC1',
  'fator eEF2',
  'mTORC1',
  'BDNF',
  'TrkB',
  'eEF2',
  'sinaptogênese cortical',
  'sinaptogênese rápida',
  'sinaptogênese',
  'plasticidade glutamatérgica',
  'somação temporal medular',
  'somação temporal',
  'fenômeno de "wind-up"',
  'fenômeno de wind-up',
  'wind-up',
  'fibras C nociceptivas',
  'fibras C',
  'sensibilização central',
  'sensibilização medular',
  'hiperalgesia induzida por opioides',
  'dor neuropática refratária',
  'alodinia',
  'hiperalgesia',
  'poupança de opioides',
  'corno dorsal da medula espinhal',
  'potenciação nociceptiva de longo prazo',
  'desconexão talamocortical',
  'dissociação talamocortical',
  'inconsciência dissociativa',
  'estado cataléptico',
  'analgesia somática',
  'analgesia visceral',
  'delírio de despertar',
  'delírio de emergência',
  'laringoespasmo reflexo',
  'laringoespasmo',
  'reflexo laríngeo',
  'cartilagens aritenoides',
  'lidocaína tópica',
  'lidocaína a 2%',
  'resistência vascular sistêmica',
  'barorreflexo',
  'pressão de perfusão cerebral',
  'inotrópico negativo',
  'depleção de catecolaminas',
  'tônus simpático',
  'reserva simpática',
  'bolus pré-incisional',
  'bolus de ataque',
  'infusão contínua',
  'desmame escalonado',
  'infusão contínua subanestésica',
  'co-indução',
  'indução dissociativa',
  'protocolo multimodal quádruplo',
  'protocolo multimodal',
  'contenção química intramuscular',
  'estado de mal epiléptico refratário',
  'crises agrupadas em salva',
  'excitotoxicidade neuronal',
  'internalização endocítica',
  'externalização maciça',
  'edema citotóxico',
  'sedação dissociativa',
  'agitação psicomotora extrema',
  'agitação psicomotora',
  'depressão resistente ao tratamento',
  'ideação suicida aguda',
  'escetamina S(+)',
  'cetamina racêmica',
  'arcetamina R(-)',
  'escetamina intranasal',
  'Spravato®',
  'dexmedetomidina',
  'propofol',
  'alfaxalona',
  'metadona',
  'butorfanol',
  'midazolam',
  'diazepam',
  'atipamezole',
  'cistite ulcerativa hemorrágica',
  'cistite ulcerativa',
  'lesão hepatocelular',
  'uropatia ulcerativa',
  'hepatotoxicidade',
  'rigidez extensora',
];

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Grifa-texto dinâmico para fixação e aprendizado dos termos essenciais */
function renderEducationalHighlightedText(
  text: string,
  customHighlights: string[] = [],
  variant: TabKey = 'context'
): React.ReactNode {
  if (!text) return null;

  const allTerms = [...new Set([...customHighlights, ...DEFAULT_EDUCATIONAL_TERMS])]
    .map((t) => t.trim())
    .filter((t) => t.length > 2)
    .sort((a, b) => b.length - a.length);

  type Seg = { mark: boolean; value: string };
  let segments: Seg[] = [{ mark: false, value: text }];

  for (const term of allTerms) {
    const nextSegs: Seg[] = [];
    const r = new RegExp(escapeRegExp(term), 'gi');

    for (const seg of segments) {
      if (seg.mark) {
        nextSegs.push(seg);
        continue;
      }

      let last = 0;
      let m: RegExpExecArray | null;
      while ((m = r.exec(seg.value)) !== null) {
        if (m.index > last) {
          nextSegs.push({ mark: false, value: seg.value.slice(last, m.index) });
        }
        nextSegs.push({ mark: true, value: m[0] });
        last = m.index + m[0].length;
      }
      if (last < seg.value.length) {
        nextSegs.push({ mark: false, value: seg.value.slice(last) });
      }
    }
    segments = nextSegs;
  }

  const markClassName =
    variant === 'mechanism'
      ? 'mx-0.5 inline-block rounded bg-purple-200/90 text-purple-950 dark:bg-purple-900/50 dark:text-purple-100 border border-purple-300/80 dark:border-purple-700/60 px-1.5 py-0.5 text-xs sm:text-[13px] font-bold shadow-2xs'
      : variant === 'rationale'
      ? 'mx-0.5 inline-block rounded bg-emerald-200/90 text-emerald-950 dark:bg-emerald-900/50 dark:text-emerald-100 border border-emerald-300/80 dark:border-emerald-700/60 px-1.5 py-0.5 text-xs sm:text-[13px] font-bold shadow-2xs'
      : 'mx-0.5 inline-block rounded bg-sky-200/90 text-sky-950 dark:bg-sky-900/50 dark:text-sky-100 border border-sky-300/80 dark:border-sky-700/60 px-1.5 py-0.5 text-xs sm:text-[13px] font-bold shadow-2xs';

  return (
    <>
      {segments.map((seg, i) =>
        seg.mark ? (
          <mark key={i} className={markClassName}>
            {seg.value}
          </mark>
        ) : (
          <React.Fragment key={i}>{seg.value}</React.Fragment>
        )
      )}
    </>
  );
}

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

  const paragraphs = activeContentText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop suave */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Caixa do Pop-up */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex w-full max-w-3xl flex-col max-h-[90vh] overflow-hidden rounded-2xl sm:rounded-3xl border border-border/90 bg-background text-foreground shadow-2xl"
      >
        {/* Cabeçalho do Modal */}
        <div className="border-b border-border/80 bg-muted/20 px-5 pt-5 pb-4 sm:px-7 sm:pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <SpeciesBadge species={indication.species} />
                {indication.evidenceLevel && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    <FileText className="h-3 w-3 text-muted-foreground/80" />
                    {indication.evidenceLevel}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  <Sparkles className="h-3 w-3" /> Aprofundamento Clínico
                </span>
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
              {/* Box de Instrução Didática */}
              <div className="rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2 text-xs text-muted-foreground flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  Os termos destacados em cores representam conceitos-chave de farmacologia e conduta clínica.
                </span>
                <span className="font-bold text-[10px] uppercase text-primary shrink-0">
                  Grifa-texto ativo
                </span>
              </div>

              {/* Parágrafos formatados com grifa-texto */}
              <div className="space-y-3.5 text-sm sm:text-[15px] leading-relaxed text-foreground/90">
                {paragraphs.length > 0 ? (
                  paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {renderEducationalHighlightedText(p, indication.highlights, activeTab)}
                    </p>
                  ))
                ) : (
                  <p className="leading-relaxed">
                    {renderEducationalHighlightedText(
                      activeContentText,
                      indication.highlights,
                      activeTab
                    )}
                  </p>
                )}
              </div>

              {/* Referências Bibliográficas vinculadas */}
              {indication.referenceIds && indication.referenceIds.length > 0 && (
                <div className="mt-5 rounded-xl border border-border/60 bg-muted/20 p-3.5 sm:p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-primary" />
                      Referências Clínicas desta Conduta:
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {indication.referenceIds.map((refId) => (
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
            {/* Top Bar: Espécie + Evidência + Referências */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <SpeciesBadge species={item.species} />
                {item.evidenceLevel && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-muted/40 px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    <FileText className="h-3 w-3 text-muted-foreground/80" />
                    {item.evidenceLevel}
                  </span>
                )}
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
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  Aprofundamento & Racional Clínico:
                </span>
                <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                  <ExternalLink className="h-3 w-3 text-primary" />
                  Abre em janela detalhada com grifa-texto
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
