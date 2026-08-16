import React from 'react';
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BookOpen,
  Cat,
  CircleAlert,
  Dog,
  FlaskConical,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '../../../../lib/utils';
import {
  EditorialClinicalFigure,
  EditorialClinicalTable,
  EditorialDiagnosticStep,
  EditorialDrugProtocol,
  EditorialSectionValue,
  EditorialSystemGroup,
  EditorialTreatmentPriorityStep,
} from '../../types/common';
import { getEditorialSubsectionIcon } from '../../utils/editorialSubsectionIcons';
import {
  getEditorialSubsectionDescription,
  translateEditorialSubsectionKey,
} from '../../utils/editorialSubsectionLabels';
import { sortDiagnosticSubsectionEntries } from '../../utils/editorialSubsectionOrder';
import { type DiseaseSectionVisual, getDiseaseSectionVisual } from '../../utils/diseaseSectionVisual';
import { EditorialClinicalTableBlock } from '../editorial/EditorialClinicalTableBlock';
import { EditorialRichText } from '../shared/EditorialRichText';
import { ClinicalSignsTable } from './ClinicalSignsTable';
import { DiagnosticPathway } from './DiagnosticPathway';
import { TreatmentMonitoringPanel, TreatmentPriorityPanel, TreatmentPriorityRichPanel } from './TreatmentSectionVisual';

interface DiseaseSectionRendererProps {
  id: string;
  title: string;
  data: EditorialSectionValue;
  className?: string;
  /** Título exibido no DiseaseSectionFrame; aqui omite o h3 duplicado */
  hideTitle?: boolean;
}

function isSystemGroupArray(value: unknown): value is EditorialSystemGroup[] {
  return Array.isArray(value) && value.length > 0 && value.every((item) => {
    if (!item || typeof item !== 'object' || !('system' in item) || !('findings' in item)) return false;
    const findings = (item as EditorialSystemGroup).findings;
    return Array.isArray(findings) && findings.every((finding) => {
      if (typeof finding === 'string') return true;
      return Boolean(finding && typeof finding === 'object' && 'finding' in finding && 'mechanism' in finding);
    });
  });
}

function isDrugProtocolArray(value: unknown): value is EditorialDrugProtocol[] {
  return Array.isArray(value) && value.length > 0 && value.every((item) => item && typeof item === 'object' && 'drug' in item);
}

function isTreatmentPriorityStepArray(value: unknown): value is EditorialTreatmentPriorityStep[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => item && typeof item === 'object' && 'title' in item && 'summary' in item)
  );
}

function isDiagnosticStepArray(value: unknown): value is EditorialDiagnosticStep[] {
  return Array.isArray(value) && value.length > 0 && value.every((item) => item && typeof item === 'object' && 'title' in item && 'description' in item);
}

function isClinicalTable(value: unknown): value is EditorialClinicalTable {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  if (v.kind !== 'clinicalTable') return false;
  if (!Array.isArray(v.headers) || v.headers.length === 0 || !v.headers.every((h) => typeof h === 'string')) return false;
  if (!Array.isArray(v.rows) || v.rows.length === 0) return false;
  const n = v.headers.length;
  return v.rows.every((row) => Array.isArray(row) && row.length === n && row.every((cell) => typeof cell === 'string'));
}

function isClinicalFigure(value: unknown): value is EditorialClinicalFigure {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  return v.kind === 'clinicalFigure' && typeof v.src === 'string' && v.src.length > 0 && typeof v.alt === 'string' && v.alt.length > 0;
}

function figureViewportClass(display: EditorialClinicalFigure['display']) {
  switch (display) {
    case 'compact':
      return 'h-52 md:h-60';
    case 'wide':
      return 'h-80 md:h-[30rem]';
    case 'full':
      return 'h-96 md:h-[36rem]';
    default:
      return 'h-64 md:h-72';
  }
}

function figureGridSpanClass(figure: EditorialClinicalFigure) {
  return figure.display === 'full' || figure.display === 'wide' ? 'sm:col-span-2' : '';
}

function ClinicalFigureBlock({ figure }: { figure: EditorialClinicalFigure }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <figure className="space-y-3">
        <div
          onClick={() => setIsOpen(true)}
          className="group relative overflow-hidden rounded-xl border border-border/55 bg-muted/20 p-2 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06] md:p-3 cursor-zoom-in transition-all duration-200 hover:border-primary/30 hover:bg-muted/30"
        >
          <div className={cn('relative w-full flex items-center justify-center bg-black/5 dark:bg-black/20 rounded-lg overflow-hidden', figureViewportClass(figure.display))}>
            <img
              src={figure.src}
              alt={figure.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </div>
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 bg-background/85 dark:bg-background/90 text-foreground text-xs px-3 py-1.5 rounded-full font-medium shadow-md border border-border/50">
              Clique para ampliar
            </span>
          </div>
        </div>
        {figure.caption ? (
          <figcaption className="text-center text-sm leading-relaxed text-muted-foreground">
            <EditorialRichText value={figure.caption} />
          </figcaption>
        ) : null}
      </figure>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-opacity duration-300 cursor-zoom-out"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-200 hover:scale-105"
            aria-label="Fechar ampliação"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center justify-center max-w-[95vw] md:max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 p-2.5 shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center justify-center w-full h-full">
              <img
                src={figure.src}
                alt={figure.alt}
                className="max-w-full max-h-[75vh] md:max-h-[80vh] h-auto object-contain rounded-xl mx-auto"
              />
            </div>
            {figure.caption ? (
              <p className="mt-3 text-center text-sm text-neutral-300 leading-relaxed px-4 pb-1.5 max-w-3xl mx-auto">
                <EditorialRichText value={figure.caption} />
              </p>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

function ClinicalComparisonTable({ table, visual }: { table: EditorialClinicalTable; visual: DiseaseSectionVisual }) {
  return <EditorialClinicalTableBlock table={table} headerTintClass={visual.headerTintClass} />;
}

const BULLET_LINE_RE = /^\s*[-•*]\s+/;
const NUMBERED_LINE_RE = /^\s*\d+[\).]\s+/;
const STUDY_CITATION_RE =
  /\b(?:[A-ZÀ-Ý][A-Za-zÀ-ÿ'-]+(?:\s+[A-ZÀ-Ý][A-Za-zÀ-ÿ'-]+){0,2})\s+et al\.\s*\(\d{4}\)/;
const CLINICAL_METRIC_RE =
  /(\b\d+(?:[.,]\d+)?(?:\s*[–-]\s*\d+(?:[.,]\d+)?)?\s*(?:%|mg\/kg|mg\/gato|mg\/m²|µg\/kg|μg\/kg|mEq\/kg|UI\/kg|dias?|semanas?|meses?|horas?|minutos?|mm|cm|gatos?|cães?|cadelas?)\b)/gi;
const CLINICAL_ALERT_RE =
  /^(atenção|alerta|não\b|nunca\b|evite\b|emergência\b|choque\b|sepse\b|contraindicad|carcinoma mamário inflamatório)/i;

function isReferenceVisual(visual: DiseaseSectionVisual): boolean {
  return visual === getDiseaseSectionVisual('references');
}

function getStudyCitation(value: string, visual: DiseaseSectionVisual): string | null {
  if (isReferenceVisual(visual)) return null;
  return value.match(STUDY_CITATION_RE)?.[0] ?? null;
}

function getClinicalLead(value: string): string | null {
  const colonIndex = value.indexOf(':');
  if (colonIndex < 2 || colonIndex > 78) return null;
  const lead = value.slice(0, colonIndex).trim();
  if (lead.includes('.') || lead.includes('://')) return null;
  return lead;
}

function getClinicalMetrics(value: string): string[] {
  return Array.from(new Set(value.match(CLINICAL_METRIC_RE) ?? [])).slice(0, 4);
}

function ClinicalInlineText({ value, visual }: { value: string; visual: DiseaseSectionVisual }) {
  const lead = getClinicalLead(value);
  if (!lead) return <EditorialRichText value={value} visual={visual} />;

  const body = value.slice(value.indexOf(':') + 1).trim();
  return (
    <>
      <strong className={cn('font-bold', visual.titleClass)}>
        <EditorialRichText value={lead} visual={visual} />
      </strong>
      <span className={cn('mx-1.5 font-bold', visual.titleClass)} aria-hidden>
        →
      </span>
      <EditorialRichText value={body} visual={visual} />
    </>
  );
}

function EvidenceFinding({
  value,
  citation,
  visual,
}: {
  value: string;
  citation: string;
  visual: DiseaseSectionVisual;
}) {
  const metrics = getClinicalMetrics(value);

  return (
    <div
      data-clinical-visual="evidence"
      className="border-y border-cyan-600/20 border-l-4 border-l-cyan-600 bg-cyan-500/[0.06] px-4 py-3.5 dark:border-cyan-400/20 dark:border-l-cyan-400 dark:bg-cyan-400/[0.08] md:px-5"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-800 dark:bg-cyan-400/15 dark:text-cyan-200">
          <FlaskConical className="h-4 w-4" strokeWidth={2.2} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-800/70 dark:text-cyan-200/70">
            Evidência publicada
          </p>
          <p className="text-[13px] font-bold leading-5 text-cyan-950 dark:text-cyan-100">{citation}</p>
        </div>
      </div>
      <p className="mt-2.5 text-[14px] leading-7 text-foreground/90 [text-wrap:pretty] md:text-[15px]">
        <ClinicalInlineText value={value} visual={visual} />
      </p>
      {metrics.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Números principais do estudo">
          {metrics.map((metric) => (
            <span
              key={metric}
              className="inline-flex min-h-6 items-center border border-cyan-600/25 bg-background/70 px-2 py-0.5 text-[11px] font-bold text-cyan-900 dark:border-cyan-300/25 dark:bg-background/30 dark:text-cyan-100"
            >
              {metric}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ClinicalAlert({ value, visual }: { value: string; visual: DiseaseSectionVisual }) {
  return (
    <div
      data-clinical-visual="alert"
      className="flex items-start gap-3 border-l-4 border-l-rose-600 bg-rose-500/[0.07] px-4 py-3 dark:border-l-rose-400 dark:bg-rose-400/[0.09]"
    >
      <CircleAlert className="mt-1 h-4 w-4 shrink-0 text-rose-700 dark:text-rose-300" strokeWidth={2.3} aria-hidden />
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-rose-800/70 dark:text-rose-200/70">
          Atenção clínica
        </p>
        <p className="mt-0.5 text-[14px] leading-7 text-foreground/90 md:text-[15px]">
          <ClinicalInlineText value={value} visual={visual} />
        </p>
      </div>
    </div>
  );
}

/**
 * Quebra narrativas longas em blocos visuais: parágrafos e listas automáticas.
 */
function StructuredNarrative({ value, visual }: { value: string; visual: DiseaseSectionVisual }) {
  const blocks = value
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="w-full space-y-4">
      {blocks.map((block, i) => {
        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
        if (lines.length >= 2 && lines.every((l) => BULLET_LINE_RE.test(l))) {
          const items = lines.map((l) => l.replace(BULLET_LINE_RE, ''));
          return <BulletList key={i} items={items} visual={visual} />;
        }
        if (lines.length >= 2 && lines.every((l) => NUMBERED_LINE_RE.test(l))) {
          const items = lines.map((l) => l.replace(NUMBERED_LINE_RE, ''));
          return (
            <ol key={i} className="space-y-2.5">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-[15px] leading-7 text-foreground/86">
                  <span
                    className={cn(
                      'mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold shadow-sm ring-1 ring-black/[0.05] dark:ring-white/[0.08]',
                      visual.diagnosticNumBgClass,
                      visual.diagnosticNumTextClass
                    )}
                  >
                    {j + 1}
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <ClinicalInlineText value={item} visual={visual} />
                  </span>
                </li>
              ))}
            </ol>
          );
        }

        const citation = getStudyCitation(block, visual);
        if (citation) {
          return <EvidenceFinding key={i} value={block} citation={citation} visual={visual} />;
        }

        if (CLINICAL_ALERT_RE.test(block)) {
          return <ClinicalAlert key={i} value={block} visual={visual} />;
        }

        return (
          <p key={i} className="text-[14px] leading-7 text-foreground/88 [text-wrap:pretty] md:text-[15px]">
            <ClinicalInlineText value={block} visual={visual} />
          </p>
        );
      })}
    </div>
  );
}

function BulletList({ items, visual }: { items: string[]; visual: DiseaseSectionVisual }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => {
        const citation = getStudyCitation(item, visual);
        if (citation) {
          return (
            <li key={`${item}-${index}`}>
              <EvidenceFinding value={item} citation={citation} visual={visual} />
            </li>
          );
        }

        if (CLINICAL_ALERT_RE.test(item)) {
          return (
            <li key={`${item}-${index}`}>
              <ClinicalAlert value={item} visual={visual} />
            </li>
          );
        }

        const hasLead = Boolean(getClinicalLead(item));
        return (
          <li
            key={`${item}-${index}`}
            data-clinical-visual={hasLead ? 'action' : 'finding'}
            className={cn(
              'flex items-start gap-3 text-[14px] leading-7 text-foreground/88 md:text-[15px]',
              hasLead && 'border-l-2 bg-muted/[0.12] px-3 py-2 dark:bg-muted/[0.07]',
              hasLead && visual.leftBarClass
            )}
          >
            {hasLead ? (
              <span
                className={cn(
                  'mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md',
                  visual.iconWrapClass
                )}
                aria-hidden
              >
                <ArrowRight className={cn('h-3 w-3', visual.iconClass)} strokeWidth={2.5} />
              </span>
            ) : (
              <span className={cn('mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full', visual.bulletDotClass)} />
            )}
            <span className="min-w-0">
              <ClinicalInlineText value={item} visual={visual} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function CascataFlowTimeline({ items, visual }: { items: string[]; visual: DiseaseSectionVisual }) {
  return (
    <div className="w-full space-y-2.5 py-1" aria-label="Fluxograma da patogênese">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <div className="group relative flex flex-col sm:flex-row items-center justify-center gap-3.5 rounded-2xl border border-border/70 bg-card p-4 text-center shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-card md:gap-4 md:p-4.5">
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06]',
                  visual.diagnosticNumBgClass,
                  visual.diagnosticNumTextClass
                )}
              >
                {index + 1}
              </span>
              <div className="min-w-0 flex-1 text-center">
                <p className="text-[14px] leading-relaxed text-foreground/90 md:text-[15px] text-center">
                  <ClinicalInlineText value={item} visual={visual} />
                </p>
              </div>
            </div>

            {!isLast && (
              <div className="flex items-center justify-center py-0.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 shadow-xs dark:bg-primary/20 dark:text-primary-foreground">
                  <ArrowDown className="h-4 w-4 stroke-[2.5]" aria-hidden />
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function DiagnosticStepList({ steps, visual }: { steps: EditorialDiagnosticStep[]; visual: DiseaseSectionVisual }) {
  return <DiagnosticPathway steps={steps} visual={visual} />;
}

function DiagnosticSubsection({
  index,
  title,
  children,
  visual,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
  visual: DiseaseSectionVisual;
}) {
  return (
    <section className="grid gap-3 border-b border-border/55 pb-5 last:border-b-0 last:pb-0 md:grid-cols-[2.25rem_minmax(0,1fr)] md:gap-4">
      <span className={cn('hidden h-8 w-8 items-center justify-center rounded-full text-xs font-bold md:inline-flex', visual.diagnosticNumBgClass, visual.diagnosticNumTextClass)} aria-hidden>
        {index + 1}
      </span>
      <div className="min-w-0">
        <h4 className="text-[15px] font-bold leading-6 text-foreground">{title}</h4>
        <div className="mt-2.5">{children}</div>
      </div>
    </section>
  );
}

function DrugProtocolList({ protocols }: { protocols: EditorialDrugProtocol[] }) {
  return (
    <div className="space-y-6">
      {protocols.map((protocol, index) => (
        <div
          key={`${protocol.drug}-${index}`}
          className="rounded-xl border border-border/80 bg-muted/[0.06] px-5 py-4"
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_repeat(4,minmax(0,0.7fr))]">
            <div>
              <h4 className="text-base font-semibold text-foreground">{protocol.drug}</h4>
              {protocol.indication ? <p className="mt-1 text-sm leading-7 text-muted-foreground">{protocol.indication}</p> : null}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Dose</p>
              <p className="mt-1.5 text-sm leading-7 text-foreground">{protocol.dose || '—'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Frequência</p>
              <p className="mt-1.5 text-sm leading-7 text-foreground">{protocol.frequency || '—'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Via</p>
              <p className="mt-1.5 text-sm leading-7 text-foreground">{protocol.route || '—'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Duração</p>
              <p className="mt-1.5 text-sm leading-7 text-foreground">{protocol.duration || '—'}</p>
            </div>
          </div>

          {(protocol.notes || protocol.cautions || protocol.contraindications) ? (
            <div className="mt-4 grid gap-4 border-t border-border/60 pt-4 lg:grid-cols-3">
              {protocol.notes ? (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Observações</p>
                  <p className="mt-1.5 text-sm leading-7 text-muted-foreground">{protocol.notes}</p>
                </div>
              ) : null}
              {protocol.cautions ? (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">Cautelas</p>
                  <p className="mt-1.5 text-sm leading-7 text-foreground/85">{protocol.cautions}</p>
                </div>
              ) : null}
              {protocol.contraindications ? (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-destructive">Contraindicações</p>
                  <p className="mt-1.5 text-sm leading-7 text-foreground/85">{protocol.contraindications}</p>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

type SubsectionTone = 'default' | 'warning' | 'danger' | 'teaching' | 'species' | 'speciesDog';

/** Ordem editorial dos blocos longos do tratamento após a timeline de prioridade (Cushing, DRC, etc.). */
const TREATMENT_NARRATIVE_AFTER_PRIORITY = [
  'principios',
  'tratamentoSuporte',
  'tratamentoDeSuporte',
  'tratamentoDoencasAssociadas',
  'tratamentoDeDoencasAssociadas',
  'tratamentoMonitoramento',
  'protocoloTerapeutico',
  'trilostanoNoCao',
  'mitotanoNoCao',
  'cetoconazolNoCao',
  'cirurgiaEspecializada',
  'tratamentoFelino',
  'iatrogenicoManejo',
  'drcAlertaEstadiamentoInstavel',
  'drcDietaRenal',
  'drcMetasFosforoIRIS',
  'drcCondutaPraticaPorEstagioEspecie',
  'drcFosforoQuelantes',
  'drcProteinuriaRaas',
  'drcHipertensao',
  'drcSintomasUremicos',
  'drcHipocalemiaAcidose',
  'drcAnemia',
  'drcSuplementacaoFerro',
  'drcFluidoterapiaSc',
  'drcNutricaoAssistida',
  'drcCalcitriol',
  'drcUtiOculta',
  'drcTabelaPrognosticoFelino',
  'notaFelinos',
  'notaCaninos',
  /* DMVD — mapa por estágio → evidência → hospital → tabela → detalhes → erros */
  'dmvdEstrategiaPorEstagioAcvim',
  'preclinica',
  'aguda',
  'cronica',
  'dmvdIccAgudaHospitalar',
  'farmacos',
  'dmvdPimobendanFormaJeJumMarcas',
  'dmvdFurosemidaAgudaCronicaTorasemida',
  'dmvdEspironolactonaBloqueioNefron',
  'dmvdIecaBenazeprilEnalapril',
  'dmvdIsosorbidaVasodilatadorOral',
  'dmvdAnlodipinoHipertensao',
  'dmvdUrgenciaHospitalarVasodilatadoresInotropicos',
  'dmvdArrhythmiasFrequenciaCardiaca',
  'errosComuns',
  'dmvdNotaCirurgicaValvar',
  'dmvdPrognosticoLongitudinal',
  /* Arritmias — urgência → fluxos → FA/VT → fármacos → erros */
  'figuraEstratificacaoUrgencia',
  'arrNotaEstratificacao',
  'figuraFluxogramaArritmiasPrincipal',
  'figuraFluxogramaFAOrca',
  'figuraVtComSemPulso',
  'arrFaCaninaOrca',
  'arrAdenosinaAlerta',
  'arrVtAgudaCao',
  'arrVtAgudaGato',
  'arrAivr',
  'arrBradiarritmias',
  'arrSss',
  'arrBloqueiosAv',
  'arrAvrtPreexcitacao',
  'arrAblationAvrt',
  'arrTorsades',
  'arrVfVtSemPulso',
  'farmacos',
  'tabelaClassesAntiarritmicos',
  'arrInteracoesAltoRisco',
  'alertasSeguranca',
  'arrParticularidadesCaes',
  'arrParticularidadesGatos',
  /* Giardíase — higiene → fármacos → falha → pérolas */
  'figuraHigieneAmbiental',
  'fenbendazolCaesGatos',
  'metronidazolAlerta',
  'naoRecomendar',
  'tratarAssintomatico',
  'monitoramentoPosTratamento',
  'falhaReinfecaoAlgoritmo',
  'farmacos',
  'figuraCiuca2021',
  'perolasClinicas',
  'zoonoseCard',
  'vacinaNota',
  /* Cistoisosporose — ponazuril → alertas → suporte → ambiente → fármacos → falha */
  'ponazurilEsquemaTresDias',
  'ponazurilDoseUnicaAlerta',
  'toltrazurilPorFonte',
  'diclazurilDivergenciaAlerta',
  'sulfadimetoxina',
  'terapiaSuporte',
  'controleAmbiental',
  'figuraFluxogramaTerapeutico',
  'falhaTratamento',
  /* Hiperparatireoidismo — PHPT → hipercalcemia → CKD-MBD → NSHP */
  'figuraTresMecanismos',
  'figuraEixoPth',
  'alertaNaoUsarCalcioCorrigido',
  'phptParatireoidectomia',
  'hipercalcemiaGrave',
  'figuraFluxogramaPosCirurgia',
  'hipocalcemiaPosOp',
  'atualizacaoPth2025',
  'ckdMbdDietaQuelante',
  'figuraFluxogramaCkdMbd',
  'fgf23IrisGato',
  'calcitriolNota',
  'cinacalceteNota',
  'nshpTratamento',
  'figuraFluxogramaNshp',
  'tabelaCaoVsGato',
  'errosComuns',
  /* CAD — emergência → alertas → fluido → protocolos → erros */
  'condutaImediata',
  'alertaEdkaSglT2_2026',
  'potassioFundamental',
  'bicarbonatoNaoRotina',
  'antibioticosNaoAutomaticos',
  'nutricaoPrecoceFelino',
  'protocoloEdkaSglT2Aaha2026',
  'fluidoterapia',
  'protocoloFelinoRegularIM',
  'protocoloFelinoGlargina',
  'protocoloCaninoRegularIM',
  'protocoloCaninoCRI',
  'protocoloCaninoLisproAlternativa',
  'monitorizacao',
  'errosQueMatam',
  /* Insulinoma — crise → cirurgia → médico → oncologia → tutor */
  'condutaImediataCrise',
  'estreptozotocinaOncologia',
  'toceranibTerapiaAlvo',
  'orientacaoTutor',
  'orientacaoTutorCrise',
  'evidenciaPublicada',
  'tabelaFarmacos',
] as const;

function subsectionToneForKey(key: string): SubsectionTone {
  if (key === 'notaFelinos') return 'species';
  if (key === 'notaCaninos') return 'speciesDog';
  if (key === 'drcAlertaEstadiamentoInstavel' || key === 'drcAlertaEstadiamentoIRIS') return 'warning';
  if (key === 'hemoTabelaDoxiciclinaGatoAlerta') return 'warning';
  if (key === 'diagnosticPlanIfLimitedResources') return 'warning';
  if (key === 'commonClinicalMistakesExpanded' || key === 'falsePositiveConsiderations' || key === 'falseNegativeConsiderations' || key === 'errosComuns' || key === 'errosQueMatam') {
    return 'danger';
  }
  if (key === 'arrVfVtSemPulso' || key === 'arrVtAgudaGato' || key === 'arrAdenosinaAlerta') return 'danger';
  if (key === 'arrNotaEstratificacao' || key === 'arrAtualizacao2026Gatos') return 'teaching';
  if (
    key === 'alertaPositivoNaoCausa' ||
    key === 'figuraAlertaPositivoNaoCausa' ||
    key === 'metronidazolAlerta' ||
    key === 'alertaCoccidioidomicose' ||
    key === 'ponazurilDoseUnicaAlerta' ||
    key === 'diclazurilDivergenciaAlerta'
  ) {
    return 'warning';
  }
  if (key === 'alertaNaoUsarCalcioCorrigido' || key === 'figuraCardInterpretacaoPth' || key === 'calcitriolNota' || key === 'cinacalceteNota') return 'warning';
  if (
    key === 'alertaRelacaoInsulinaGlicose' ||
    key === 'alertaInsulinaNormalHipoglicemia' ||
    key === 'limitacaoTomografia' ||
    key === 'seloEvidenciaFelinaLimitada' ||
    key === 'alertaBhbPreferencial' ||
    key === 'alertaCetonuriaArmadilha'
  ) {
    return 'warning';
  }
  if (
    key === 'alertaEdkaSglT2_2026' ||
    key === 'condutaImediata' ||
    key === 'potassioFundamental' ||
    key === 'bicarbonatoNaoRotina' ||
    key === 'antibioticosNaoAutomaticos' ||
    key === 'nutricaoPrecoceFelino'
  ) {
    return key === 'alertaEdkaSglT2_2026' || key === 'condutaImediata' ? 'danger' : 'warning';
  }
  if (key === 'alertaInsulinaAbsolutaEstadiamento' || key === 'toceranibTerapiaAlvo' || key === 'evidenciaPublicada') return 'teaching';
  if (key === 'condutaImediataCrise' || key === 'estreptozotocinaOncologia' || key === 'errosQueMatam') return 'danger';
  if (key === 'hipocalcemiaPosOp' || key === 'hipercalcemiaGrave') return 'danger';
  if (key === 'naoRecomendar') return 'danger';
  if (key === 'teachingOverview' || key === 'diagnosticReasoning' || key === 'treatmentReasoning') return 'teaching';
  if (key === 'dmvdPimobendanFormaJeJumMarcas' || key === 'dmvdUrgenciaHospitalarVasodilatadoresInotropicos') return 'warning';
  return 'default';
}

function FlowSubsection({
  title,
  tone,
  children,
  subsectionKey,
  visual,
  className,
}: {
  title: string;
  tone: SubsectionTone;
  children: React.ReactNode;
  subsectionKey?: string;
  visual?: DiseaseSectionVisual;
  className?: string;
}) {
  const description = subsectionKey ? getEditorialSubsectionDescription(subsectionKey) : undefined;
  const TopicGlyph =
    subsectionKey && tone !== 'species' && tone !== 'speciesDog'
      ? getEditorialSubsectionIcon(subsectionKey)
      : undefined;

  if (tone === 'default') {
    return (
      <div
        className={cn(
          'border-l-4 bg-muted/[0.12] px-4 py-3.5 ring-1 ring-border/40 dark:bg-muted/[0.07] md:px-5',
          visual?.leftBarClass,
          className
        )}
      >
        <div className="flex items-start gap-3">
          {TopicGlyph && visual ? (
            <span
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ring-black/[0.04] dark:ring-white/[0.06]',
                visual.iconWrapClass
              )}
              aria-hidden
            >
              <TopicGlyph className={cn('h-4 w-4', visual.iconClass)} strokeWidth={2.2} />
            </span>
          ) : TopicGlyph ? (
            <TopicGlyph className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground opacity-90" strokeWidth={2} aria-hidden />
          ) : null}
          <div className="min-w-0">
            <h4 className={cn('text-[15px] font-bold leading-5', visual?.titleClass ?? 'text-foreground')}>{title}</h4>
            {description ? <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{description}</p> : null}
          </div>
        </div>
        <div className="mt-3 border-t border-border/45 pt-3">{children}</div>
      </div>
    );
  }

  if (tone === 'species') {
    return (
      <div className={cn('border border-violet-500/20 border-l-4 border-l-violet-500 bg-violet-500/[0.06] p-4 dark:border-l-violet-400 dark:bg-violet-400/[0.09] md:px-5', className)}>
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 dark:bg-violet-400/25" aria-hidden>
            <Cat className="h-5 w-5 text-violet-600 dark:text-violet-300" />
          </span>
          <div className="min-w-0">
            <h4 className="text-[15px] font-bold leading-5 text-violet-950 dark:text-violet-100">{title}</h4>
            {description ? <p className="mt-0.5 text-xs leading-5 text-violet-900/65 dark:text-violet-100/65">{description}</p> : null}
          </div>
        </div>
        <div className="mt-3 border-t border-violet-500/20 pt-3 text-foreground/90 dark:border-violet-400/20">{children}</div>
      </div>
    );
  }

  if (tone === 'speciesDog') {
    return (
      <div className={cn('border border-sky-500/20 border-l-4 border-l-sky-600 bg-sky-500/[0.06] p-4 dark:border-l-sky-400 dark:bg-sky-400/[0.09] md:px-5', className)}>
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 dark:bg-sky-400/25" aria-hidden>
            <Dog className="h-5 w-5 text-sky-700 dark:text-sky-300" />
          </span>
          <div className="min-w-0">
            <h4 className="text-[15px] font-bold leading-5 text-sky-950 dark:text-sky-100">{title}</h4>
            {description ? <p className="mt-0.5 text-xs leading-5 text-sky-900/65 dark:text-sky-100/65">{description}</p> : null}
          </div>
        </div>
        <div className="mt-3 border-t border-sky-500/20 pt-3 text-foreground/90 dark:border-sky-400/20">{children}</div>
      </div>
    );
  }

  const shell =
    tone === 'warning'
      ? 'border-amber-500/30 border-l-amber-500 bg-amber-500/[0.06] dark:bg-amber-500/[0.08]'
      : tone === 'danger'
        ? 'border-destructive/30 border-l-destructive bg-destructive/[0.06]'
        : 'border-primary/25 border-l-primary bg-primary/[0.04] dark:bg-primary/[0.07]';

  const ToneIcon =
    tone === 'warning' ? AlertTriangle : tone === 'danger' ? ShieldAlert : BookOpen;
  const LeadIcon = TopicGlyph ?? ToneIcon;
  const leadIconClass =
    TopicGlyph != null && visual
      ? cn('h-5 w-5', visual.iconClass)
      : TopicGlyph != null
        ? 'h-5 w-5 shrink-0 text-muted-foreground opacity-90'
        : tone === 'warning'
          ? 'h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400'
          : tone === 'danger'
            ? 'h-5 w-5 shrink-0 text-destructive'
            : 'h-5 w-5 shrink-0 text-primary';

  return (
    <div className={cn('border border-l-4 p-4 ring-1 ring-black/[0.03] dark:ring-white/[0.06] md:px-5', shell, className)}>
      <div className="flex items-start gap-3">
        {TopicGlyph && visual ? (
          <span
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-black/[0.05] dark:ring-white/[0.08]',
              visual.iconWrapClass
            )}
            aria-hidden
          >
            <LeadIcon className={leadIconClass} strokeWidth={2} />
          </span>
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/50 ring-1 ring-border/60" aria-hidden>
            <LeadIcon className={leadIconClass} strokeWidth={2} />
          </span>
        )}
        <div className="min-w-0">
          <h4 className="text-[15px] font-bold leading-5 text-foreground">{title}</h4>
          {description ? <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{description}</p> : null}
        </div>
      </div>
      <div className="mt-3 border-t border-border/40 pt-3">{children}</div>
    </div>
  );
}

function tryRenderTreatmentRichObject(
  obj: Record<string, unknown>,
  visual: DiseaseSectionVisual
): React.ReactNode | null {
  const ordemEstruturada = isTreatmentPriorityStepArray(obj.ordemDePrioridadeEstruturada)
    ? (obj.ordemDePrioridadeEstruturada as EditorialTreatmentPriorityStep[])
    : [];
  const ordem = Array.isArray(obj.ordemDePrioridade)
    ? (obj.ordemDePrioridade as string[]).map((s) => String(s).trim()).filter(Boolean)
    : [];
  const monitor = Array.isArray(obj.monitoramento)
    ? (obj.monitoramento as string[]).map((s) => String(s).trim()).filter(Boolean)
    : [];
  if (ordemEstruturada.length === 0 && ordem.length === 0 && monitor.length === 0) return null;

  const renderLeaf = (value: unknown, key?: string): React.ReactNode => {
    if (typeof value === 'string') return <StructuredNarrative value={value} visual={visual} />;
    if (isClinicalFigure(value)) {
      return <ClinicalFigureBlock figure={value as EditorialClinicalFigure} />;
    }
    if (isClinicalTable(value)) {
      return <ClinicalComparisonTable table={value as EditorialClinicalTable} visual={visual} />;
    }
    if (Array.isArray(value) && value.length > 0) {
      if (value.every((x) => typeof x === 'string')) {
        if (key && (key === 'cascata' || key.includes('cascata') || key.includes('patogenese'))) {
          return <CascataFlowTimeline items={value as string[]} visual={visual} />;
        }
        return <BulletList items={value as string[]} visual={visual} />;
      }
      if (isDrugProtocolArray(value)) {
        return <DrugProtocolList protocols={value as EditorialDrugProtocol[]} />;
      }
    }
    return <StructuredNarrative value={String(value ?? '')} visual={visual} />;
  };

  const pushNarrative = (key: string, blocks: React.ReactNode[]) => {
    const value = obj[key];
    if (value === null || value === undefined) return;
    if (typeof value === 'string' && !value.trim()) return;
    if (Array.isArray(value) && value.length === 0) return;
    blocks.push(
      <FlowSubsection
        key={key}
        title={translateEditorialSubsectionKey(key)}
        tone={subsectionToneForKey(key)}
        subsectionKey={key}
        visual={visual}
      >
        {renderLeaf(value, key)}
      </FlowSubsection>
    );
  };

  const blocks: React.ReactNode[] = [];

  if (obj.decisaoInicial) pushNarrative('decisaoInicial', blocks);

  if (ordemEstruturada.length > 0) {
    blocks.push(<TreatmentPriorityRichPanel key="ordem-rich" steps={ordemEstruturada} visual={visual} />);
  } else if (ordem.length > 0) {
    blocks.push(<TreatmentPriorityPanel key="ordem" items={ordem} visual={visual} />);
  }

  for (const key of TREATMENT_NARRATIVE_AFTER_PRIORITY) {
    if (obj[key]) pushNarrative(key, blocks);
  }

  const handled = new Set<string>([
    'ordemDePrioridade',
    'ordemDePrioridadeEstruturada',
    'monitoramento',
    'decisaoInicial',
    'prognosticoResumo',
    ...TREATMENT_NARRATIVE_AFTER_PRIORITY,
  ]);
  const extras = Object.keys(obj)
    .filter((k) => !handled.has(k))
    .sort((a, b) => a.localeCompare(b, 'pt'));
  for (const key of extras) {
    if (obj[key]) pushNarrative(key, blocks);
  }

  if (monitor.length > 0) {
    blocks.push(<TreatmentMonitoringPanel key="monitor" items={monitor} visual={visual} />);
  }

  if (obj.prognosticoResumo) pushNarrative('prognosticoResumo', blocks);

  return <div className="space-y-4 md:space-y-5">{blocks}</div>;
}

export function DiseaseSectionRenderer({ id, title, data, className, hideTitle }: DiseaseSectionRendererProps) {
  const visual = getDiseaseSectionVisual(id);

  if (!data || (Array.isArray(data) && data.length === 0)) return null;
  if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0) return null;

  const useDiagnosticOrder = id === 'diagnostics-unified' || id === 'diagnosis';

  const renderContent = (content: EditorialSectionValue | string | string[] | unknown, key?: string): React.ReactNode => {
    if (typeof content === 'string') {
      return <StructuredNarrative value={content} visual={visual} />;
    }

    if (Array.isArray(content)) {
      if (content.length === 0) return null;
      if (isDrugProtocolArray(content)) return <DrugProtocolList protocols={content} />;
      if (isDiagnosticStepArray(content)) return <DiagnosticStepList steps={content} visual={visual} />;
      if (isSystemGroupArray(content)) return <ClinicalSignsTable groups={content} visual={visual} />;
      if (key && (key === 'cascata' || key.includes('cascata') || key.includes('patogenese'))) {
        return <CascataFlowTimeline items={content as string[]} visual={visual} />;
      }
      return <BulletList items={content.filter((item): item is string => typeof item === 'string')} visual={visual} />;
    }

    if (content && typeof content === 'object') {
      if (isClinicalFigure(content)) {
        return <ClinicalFigureBlock figure={content} />;
      }
      if (isClinicalTable(content)) {
        return <ClinicalComparisonTable table={content} visual={visual} />;
      }

      if (id === 'treatment') {
        const rich = tryRenderTreatmentRichObject(content as Record<string, unknown>, visual);
        if (rich !== null) return rich;
      }

      let entries = Object.entries(content).filter(([, value]) => {
        if (value === null || value === undefined) return false;
        if (Array.isArray(value) && value.length === 0) return false;
        return true;
      });

      if (useDiagnosticOrder) {
        entries = sortDiagnosticSubsectionEntries(entries);
      }

      const groupedEntries: (
        | { type: 'single'; entry: [string, unknown] }
        | { type: 'figures'; entries: [string, unknown][] }
      )[] = [];

      for (const entry of entries) {
        const [, value] = entry;
        const isFig = isClinicalFigure(value);

        if (isFig) {
          const lastGroup = groupedEntries[groupedEntries.length - 1];
          if (lastGroup && lastGroup.type === 'figures') {
            lastGroup.entries.push(entry);
          } else {
            groupedEntries.push({ type: 'figures', entries: [entry] });
          }
        } else {
          groupedEntries.push({ type: 'single', entry });
        }
      }

      return (
        <div className="space-y-4 md:space-y-5">
          {groupedEntries.map((group, idx) => {
            if (group.type === 'single') {
              const [k, value] = group.entry;
              const tone = subsectionToneForKey(k);
              if (useDiagnosticOrder) {
                return (
                  <DiagnosticSubsection key={k} index={idx} title={translateEditorialSubsectionKey(k)} visual={visual}>
                    {renderContent(value as EditorialSectionValue, k)}
                  </DiagnosticSubsection>
                );
              }
              return (
                <FlowSubsection
                  key={k}
                  title={translateEditorialSubsectionKey(k)}
                  tone={tone}
                  subsectionKey={k}
                  visual={visual}
                >
                  {renderContent(value as EditorialSectionValue, k)}
                </FlowSubsection>
              );
            } else {
              return (
                <div key={`figures-grid-${idx}`} className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                  {group.entries.map(([k, value]) => {
                    const figure = value as EditorialClinicalFigure;
                    const tone = subsectionToneForKey(k);
                    return (
                      <FlowSubsection
                        key={k}
                        title={translateEditorialSubsectionKey(k)}
                        tone={tone}
                        subsectionKey={k}
                        visual={visual}
                        className={figureGridSpanClass(figure)}
                      >
                        {renderContent(value as EditorialSectionValue)}
                      </FlowSubsection>
                    );
                  })}
                </div>
              );
            }
          })}
        </div>
      );
    }

    return null;
  };

  if (hideTitle) {
    return <div className={cn('max-w-none', className)}>{renderContent(data)}</div>;
  }

  return (
    <section id={id} className={cn('scroll-mt-24', className)}>
      <div className="mb-6 border-b border-border/70 pb-4">
        <h3 className="text-[22px] font-bold tracking-tight text-foreground md:text-[24px]">{title}</h3>
      </div>
      <div className="max-w-none">{renderContent(data)}</div>
    </section>
  );
}
