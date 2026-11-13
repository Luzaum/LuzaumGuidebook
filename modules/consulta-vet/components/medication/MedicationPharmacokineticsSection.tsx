import React from 'react';
import { Activity, AlertCircle, Brain, Clock, ShieldCheck } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import type { MedicationPharmacokinetics } from '../../types/medication';

function renderFormattedInline(content: string) {
  if (!content) return null;
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

type ParsedBulletItem = {
  header: string | null;
  stepNumber: string | null;
  body: string;
  routeName: string | null;
  routeCode: string | null;
  bioavailabilityPct: number | null;
  bioavailabilityLabel: string | null;
  isAlert: boolean;
};

type ParsedPKBlock =
  | { kind: 'routes'; intro: string | null; items: ParsedBulletItem[] }
  | { kind: 'list'; intro: string | null; items: ParsedBulletItem[] }
  | { kind: 'paragraphs'; paragraphs: string[] };

function extractBioavailability(body: string): { pct: number | null; label: string | null } {
  const plain = body.replace(/\*\*/g, '');
  const firstPart = plain.slice(0, 140);
  if (!/biodisponibilidade|fração\s+(?:sistêmica|biodisponível|ativa)|absorção/i.test(firstPart)) {
    return { pct: null, label: null };
  }

  const rangeMatch = firstPart.match(/([~≈]?\s*\d+(?:[.,]\d+)?)\s*%?\s*(?:a|-|–)\s*([~≈]?\s*\d+(?:[.,]\d+)?)\s*%/i);
  if (rangeMatch) {
    const min = Number.parseFloat(rangeMatch[1].replace(/[~≈\s]/g, '').replace(',', '.'));
    const max = Number.parseFloat(rangeMatch[2].replace(/[~≈\s]/g, '').replace(',', '.'));
    if (Number.isFinite(min) && Number.isFinite(max)) {
      const avg = Math.min(100, Math.max(0, Math.round((min + max) / 2)));
      const prefix = rangeMatch[1].trim().startsWith('~') || rangeMatch[1].trim().startsWith('≈') ? '~' : '';
      return {
        pct: avg,
        label: `${prefix}${rangeMatch[1].replace(/[~≈\s]/g, '')}–${rangeMatch[2].replace(/[~≈\s]/g, '')}%`,
      };
    }
  }

  const singleMatch = firstPart.match(/([~≈]?\s*\d+(?:[.,]\d+)?)\s*%/);
  if (singleMatch) {
    const val = Number.parseFloat(singleMatch[1].replace(/[~≈\s]/g, '').replace(',', '.'));
    if (Number.isFinite(val)) {
      return {
        pct: Math.min(100, Math.max(0, Math.round(val))),
        label: singleMatch[0].replace(/\s+/g, ''),
      };
    }
  }

  return { pct: null, label: null };
}

function parseBulletItem(raw: string): ParsedBulletItem {
  const colonIdx = raw.indexOf(':');
  const hasHeader = colonIdx > 0 && colonIdx < 80;
  const rawHeader = hasHeader ? raw.slice(0, colonIdx).replace(/\*\*/g, '').trim() : null;
  const body = hasHeader ? raw.slice(colonIdx + 1).trim() : raw;

  let header = rawHeader;
  let stepNumber: string | null = null;
  if (header) {
    const numMatch = header.match(/^(\d+)\.\s+(.+)$/);
    if (numMatch) {
      stepNumber = numMatch[1];
      header = numMatch[2].trim();
    }
  }

  let routeName: string | null = null;
  let routeCode: string | null = null;
  if (header) {
    const routeMatch = header.match(/^Via\s+([^(]+?)(?:\s*\(([^)]+)\))?$/i);
    if (routeMatch) {
      routeName = `Via ${routeMatch[1].trim()}`;
      routeCode = routeMatch[2]?.trim().toUpperCase() || null;
    }
  }

  const { pct, label } = routeName ? extractBioavailability(body) : { pct: null, label: null };
  const isAlert = Boolean(
    header && /alerta|atenção|cuidado|acúmulo|particularidade|risco|contraindic/i.test(header)
  );

  return {
    header,
    stepNumber,
    body,
    routeName,
    routeCode,
    bioavailabilityPct: pct,
    bioavailabilityLabel: label,
    isAlert,
  };
}

function normalizePKDisplay(text: string): string {
  return text
    .replace(/\(\s*t[½1]\s*(?:\/\s*2)?\s*[αβ]?\s*\)/gi, '(meia-vida de eliminação)')
    .replace(/\bt[½]\s*β\b/gi, 'meia-vida de eliminação');
}

function splitLongProseIntoBullets(text: string): string[] | null {
  if (text.length < 220) return null;
  const protectedText = text
    .replace(/\b(et al|ed|Cap|Fig|Vol|spp|Dr|Sr|Sra|nº|approx|aprox)\./gi, '$1__DOT__')
    .replace(/(?<=\d)\.(?=\d)/g, '__DOT__');

  const rawSentences = protectedText
    .split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÀÂÊÔÃÕÇ])/)
    .map((s) => s.replace(/__DOT__/g, '.').trim())
    .filter(Boolean);

  if (rawSentences.length < 2) return null;

  // Agrupa pares curtos de frases relacionadas para evitar micro-itens excessivos
  const chunks: string[] = [];
  for (const sentence of rawSentences) {
    const startsTopic =
      /^(?:[A-ZÁÉÍÓÚÀÂÊÔÃÕÇ][^:]{2,42}:|Em cães|Em gatos|Na espécie|Nos cães|Nos gatos|Por via|A via|Em pacientes|Alerta|Contudo,|Entretanto,|Todavia,|Observação)/i.test(
        sentence
      );
    const prev = chunks[chunks.length - 1];
    if (prev && !startsTopic && prev.length + sentence.length < 240) {
      chunks[chunks.length - 1] = `${prev} ${sentence}`;
    } else {
      chunks.push(sentence);
    }
  }

  return chunks.length >= 2 ? chunks : null;
}

function parsePKContent(text?: string, allowRoutes = false): ParsedPKBlock | null {
  if (!text || !text.trim()) return null;

  const trimmed = normalizePKDisplay(text.trim());

  if (trimmed.includes('•')) {
    const startsWithBullet = trimmed.startsWith('•');
    const rawParts = trimmed.split('•').map((p) => p.trim()).filter(Boolean);
    let intro: string | null = null;
    let rawItems = rawParts;

    if (!startsWithBullet && rawParts.length > 1) {
      intro = rawParts[0].replace(/\*\*/g, '').trim();
      rawItems = rawParts.slice(1);
    }

    const items = rawItems.map(parseBulletItem);
    const routeCount = items.filter((item) => item.routeName !== null).length;
    if (allowRoutes && routeCount >= 2 && routeCount >= Math.ceil(items.length / 2)) {
      return { kind: 'routes', intro, items };
    }

    return { kind: 'list', intro, items };
  }

  if (/^\s*\d+\.\s+/m.test(trimmed)) {
    const lines = trimmed
      .split(/(?=\n\s*\d+\.\s+)/)
      .map((p) => p.trim())
      .filter(Boolean);
    return { kind: 'list', intro: null, items: lines.map(parseBulletItem) };
  }

  const paragraphs = trimmed
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length === 1) {
    const chunks = splitLongProseIntoBullets(paragraphs[0]);
    if (chunks) {
      return { kind: 'list', intro: null, items: chunks.map(parseBulletItem) };
    }
  }

  return { kind: 'paragraphs', paragraphs };
}

type StageAccent = 'amber' | 'blue' | 'purple' | 'emerald';

const STAGE_STYLES: Record<
  StageAccent,
  {
    badge: string;
    borderLeft: string;
    dot: string;
    routePill: string;
  }
> = {
  amber: {
    badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    borderLeft: 'border-l-amber-500/70',
    dot: 'bg-amber-500',
    routePill: 'bg-amber-500/10 text-amber-800 dark:text-amber-200 border-amber-500/25',
  },
  blue: {
    badge: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30',
    borderLeft: 'border-l-sky-500/70',
    dot: 'bg-sky-500',
    routePill: 'bg-sky-500/10 text-sky-800 dark:text-sky-200 border-sky-500/25',
  },
  purple: {
    badge: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30',
    borderLeft: 'border-l-purple-500/70',
    dot: 'bg-purple-500',
    routePill: 'bg-purple-500/10 text-purple-800 dark:text-purple-200 border-purple-500/25',
  },
  emerald: {
    badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    borderLeft: 'border-l-emerald-500/70',
    dot: 'bg-emerald-500',
    routePill: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 border-emerald-500/25',
  },
};

function getBioBarColor(pct: number): string {
  if (pct >= 75) return 'bg-emerald-500';
  if (pct >= 40) return 'bg-amber-500';
  return 'bg-rose-400 dark:bg-rose-500';
}

function ADMEStageContent({
  text,
  accent,
  allowRoutes = false,
}: {
  text?: string;
  accent: StageAccent;
  allowRoutes?: boolean;
}) {
  const parsed = parsePKContent(text, allowRoutes);
  if (!parsed) return null;

  const styles = STAGE_STYLES[accent];

  if (parsed.kind === 'routes') {
    return (
      <div className="space-y-3">
        {parsed.intro && (
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            {parsed.intro}
          </p>
        )}
        <div className="overflow-hidden rounded-xl border border-border/70 bg-background/70 divide-y divide-border/60">
          {parsed.items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2.5 p-3.5 transition-colors hover:bg-muted/25 sm:flex-row sm:items-start sm:gap-5 sm:px-4 sm:py-3.5"
            >
              {/* Coluna esquerda: Via + Barra de Biodisponibilidade */}
              <div className="flex shrink-0 flex-col gap-1.5 sm:w-52">
                <div className="flex items-center justify-between gap-2 sm:justify-start">
                  <div className="flex items-center gap-2">
                    {item.routeCode && (
                      <span
                        className={cn(
                          'inline-flex min-w-[2.5rem] items-center justify-center rounded-md border px-1.5 py-0.5 text-[11px] font-extrabold tracking-wide',
                          styles.routePill
                        )}
                      >
                        {item.routeCode}
                      </span>
                    )}
                    <span className="text-xs font-bold text-foreground sm:text-sm">
                      {item.routeName || item.header}
                    </span>
                  </div>
                  {item.bioavailabilityLabel && (
                    <span className="text-xs font-extrabold tabular-nums text-foreground sm:hidden">
                      {item.bioavailabilityLabel}
                    </span>
                  )}
                </div>

                {item.bioavailabilityPct !== null && (
                  <div className="hidden items-center gap-2 sm:flex">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn('h-full rounded-full transition-all', getBioBarColor(item.bioavailabilityPct))}
                        style={{ width: `${Math.max(8, item.bioavailabilityPct)}%` }}
                      />
                    </div>
                    <span className="w-16 text-right text-[11px] font-bold tabular-nums text-muted-foreground">
                      {item.bioavailabilityLabel}
                    </span>
                  </div>
                )}
              </div>

              {/* Coluna direita: Detalhes clínicos da via */}
              <div className="min-w-0 flex-1 text-xs leading-relaxed text-foreground/90 sm:text-sm">
                {renderFormattedInline(item.body)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (parsed.kind === 'list') {
    return (
      <div className="space-y-3">
        {parsed.intro && (
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            {parsed.intro}
          </p>
        )}
        <ul className="divide-y divide-border/50 rounded-xl border border-border/60 bg-background/60">
          {parsed.items.map((item, idx) => (
            <li
              key={idx}
              className={cn(
                'flex items-start gap-3 px-3.5 py-3 text-xs leading-relaxed sm:px-4 sm:py-3.5 sm:text-sm',
                item.isAlert && 'bg-amber-500/[0.05]'
              )}
            >
              {item.isAlert ? (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
              ) : item.stepNumber ? (
                <span
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold',
                    styles.badge
                  )}
                >
                  {item.stepNumber}
                </span>
              ) : (
                <span className={cn('mt-2 h-2 w-2 shrink-0 rounded-full', styles.dot)} />
              )}

              <div className="min-w-0 flex-1">
                {item.header && (
                  <strong
                    className={cn(
                      'font-bold mr-1.5',
                      item.isAlert ? 'text-amber-800 dark:text-amber-300' : 'text-foreground'
                    )}
                  >
                    {item.header}:
                  </strong>
                )}
                <span className="text-foreground/90">{renderFormattedInline(item.body)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 text-xs leading-relaxed text-foreground/90 sm:text-sm">
      {parsed.paragraphs.map((p, idx) => (
        <p key={idx}>{renderFormattedInline(p)}</p>
      ))}
    </div>
  );
}

export function MedicationPharmacokineticsSection({
  data,
}: {
  data?: MedicationPharmacokinetics;
}) {
  if (!data) return null;

  const stages: Array<{
    code: 'A' | 'D' | 'M' | 'E';
    title: string;
    subtitle: string;
    accent: StageAccent;
    text?: string;
    allowRoutes?: boolean;
  }> = [
    {
      code: 'A',
      title: 'Absorção & Biodisponibilidade por Via',
      subtitle: 'Velocidade de início e fração ativa conforme a via escolhida',
      accent: 'amber',
      text: data.absorption,
      allowRoutes: true,
    },
    {
      code: 'D',
      title: 'Distribuição Tecidual & Cinética',
      subtitle: 'Volume de distribuição, redistribuição e risco de acúmulo',
      accent: 'blue',
      text: data.distribution,
    },
    {
      code: 'M',
      title: 'Biotransformação & Metabolismo',
      subtitle: 'Vias enzimáticas hepáticas, metabólitos ativos e diferenças entre espécies',
      accent: 'purple',
      text: data.metabolism,
    },
    {
      code: 'E',
      title: 'Eliminação & Excreção',
      subtitle: 'Rotas de depuração e alertas em pacientes renais ou hepatopatas',
      accent: 'emerald',
      text: data.elimination,
    },
  ];

  return (
    <section
      id="farmacocinetica"
      className="scroll-mt-24 rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-xs space-y-6"
    >
      {/* Cabeçalho da Seção */}
      <div className="flex items-center gap-3 border-b border-border/70 pb-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
          <Activity className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Farmacocinética Aplicada (ADME)
          </h3>
          <p className="text-xs text-muted-foreground">
            Absorção, distribuição, biotransformação e eliminação nas espécies veterinárias
          </p>
        </div>
      </div>

      {/* Parâmetros-Chave Rápidos */}
      {(data.halfLife || data.plasmaBinding || data.cnsPenetration) && (
        <div className="space-y-3">
          {(data.halfLife || data.plasmaBinding) && (
            <div className="grid gap-3 sm:grid-cols-2">
              {data.halfLife && (
                <div className="flex items-start gap-3 rounded-2xl border border-purple-500/20 bg-purple-500/[0.06] p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300">
                      Meia-vida de Eliminação
                    </span>
                    <p className="text-xs font-semibold leading-relaxed text-foreground sm:text-sm">
                      {renderFormattedInline(data.halfLife)}
                    </p>
                  </div>
                </div>
              )}

              {data.plasmaBinding && (
                <div className="flex items-start gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                      Ligação a Proteínas Plasmáticas
                    </span>
                    <p className="text-xs font-semibold leading-relaxed text-foreground sm:text-sm">
                      {renderFormattedInline(data.plasmaBinding)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {data.cnsPenetration && (
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <Brain className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Penetração no Sistema Nervoso Central (SNC) & Barreira Hematoencefálica
                </span>
                <p className="text-xs leading-relaxed text-foreground/90 sm:text-sm">
                  {renderFormattedInline(data.cnsPenetration)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Fluxo Sequencial ADME (A → D → M → E) */}
      <div className="space-y-4">
        {stages.map((stage) => {
          if (!stage.text) return null;
          const styles = STAGE_STYLES[stage.accent];

          return (
            <div
              key={stage.code}
              className={cn(
                'rounded-2xl border border-border/80 border-l-4 bg-muted/15 p-4 sm:p-5 space-y-3.5',
                styles.borderLeft
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-sm font-black',
                    styles.badge
                  )}
                >
                  {stage.code}
                </span>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-foreground sm:text-base">
                    {stage.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {stage.subtitle}
                  </p>
                </div>
              </div>

              <ADMEStageContent
                text={stage.text}
                accent={stage.accent}
                allowRoutes={stage.allowRoutes}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
