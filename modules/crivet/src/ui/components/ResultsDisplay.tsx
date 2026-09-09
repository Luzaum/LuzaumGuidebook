import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Calculator,
  Check,
  ChevronDown,
  ChevronRight,
  Clipboard,
  Copy,
  FlaskConical,
  Heart,
  Info,
  ShieldAlert,
  Star,
} from 'lucide-react';
import { CalculationInput, CalculationResult } from '../../shared/types/calculation';
import { SafetyEvaluation } from '../../safety-rules/evaluator';
import { favoritesService } from '../../application/services/favoritesService';
import { historyService } from '../../application/services/historyService';
import { cn } from '../lib/utils';

interface ResultsProps {
  input: CalculationInput | null;
  result: CalculationResult | null;
  safety: SafetyEvaluation | null;
}

type NoticeSeverity = 'critical' | 'moderate' | 'low';

interface SafetyNotice {
  id: string;
  severity: NoticeSeverity;
  title: string;
  message: string;
}

const severityOrder: Record<NoticeSeverity, number> = { critical: 3, moderate: 2, low: 1 };

const severityCopy = {
  critical: {
    button: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/30',
    card: 'border-red-200 bg-red-50 text-red-950 dark:border-red-900/60 dark:bg-red-950/35 dark:text-red-100',
    label: 'Avisos críticos',
    itemLabel: 'Crítico',
  },
  moderate: {
    button: 'bg-orange-500 text-orange-950 hover:bg-orange-600 focus:ring-orange-500/30',
    card: 'border-orange-200 bg-orange-50 text-orange-950 dark:border-orange-900/60 dark:bg-orange-950/30 dark:text-orange-100',
    label: 'Avisos importantes',
    itemLabel: 'Importante',
  },
  low: {
    button: 'bg-yellow-300 text-yellow-950 hover:bg-yellow-400 focus:ring-yellow-400/30',
    card: 'border-yellow-200 bg-yellow-50 text-yellow-950 dark:border-yellow-800/60 dark:bg-yellow-950/25 dark:text-yellow-100',
    label: 'Avisos informativos',
    itemLabel: 'Informativo',
  },
};

const classifyWarning = (message: string): NoticeSeverity => {
  const normalized = message.toLocaleUpperCase('pt-BR');
  if (normalized.includes('INCOMPATIBILIDADE') || normalized.includes('NEGATIVO') || normalized.includes('EXCEDE')) return 'critical';
  if (normalized.startsWith('NOTA:') || normalized.includes('DILUENTE PREFERENCIAL')) return 'low';
  return 'moderate';
};

export const ResultsDisplay: React.FC<ResultsProps> = ({ input, result, safety }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [favoriteName, setFavoriteName] = useState('');
  const [showSafety, setShowSafety] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);
  const [showMath, setShowMath] = useState(false);

  const notices = useMemo<SafetyNotice[]>(() => {
    if (!input || !result || !safety) return [];

    const items: SafetyNotice[] = [];
    if (result.isImpossible) {
      items.push({
        id: 'impossible',
        severity: 'critical',
        title: 'Preparo inviável',
        message: result.impossibleReason || 'Revise os dados do preparo antes de administrar.',
      });
    }

    result.alerts?.forEach((alert) => {
      items.push({
        id: `calculation-${alert.id}`,
        severity: alert.severity === 'block' || alert.severity === 'critical' ? 'critical' : alert.severity === 'warning' ? 'moderate' : 'low',
        title: alert.title,
        message: alert.recommendation ? `${alert.message} ${alert.recommendation}` : alert.message,
      });
    });

    safety.alerts.forEach((alert) => {
      items.push({
        id: `clinical-${alert.id}`,
        severity: alert.level === 'danger' ? 'critical' : alert.level === 'warning' ? 'moderate' : 'low',
        title: alert.level === 'danger' ? 'Alerta clínico' : alert.level === 'warning' ? 'Atenção clínica' : 'Informação clínica',
        message: alert.message,
      });
    });

    safety.warnings.forEach((message, index) => {
      const severity = classifyWarning(message);
      items.push({
        id: `warning-${index}`,
        severity,
        title: severity === 'critical' ? 'Incompatibilidade ou risco' : severity === 'moderate' ? 'Atenção no preparo' : 'Observação',
        message,
      });
    });

    const unique = Array.from(new Map(items.map((item) => [item.message, item])).values());
    return unique.sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity]);
  }, [input, result, safety]);

  if (!input || !result || !safety) return null;

  const highestSeverity = notices.reduce<NoticeSeverity>(
    (highest, notice) => severityOrder[notice.severity] > severityOrder[highest] ? notice.severity : highest,
    'low',
  );
  const criticalCount = notices.filter((notice) => notice.severity === 'critical').length;
  const moderateCount = notices.filter((notice) => notice.severity === 'moderate').length;
  const lowCount = notices.filter((notice) => notice.severity === 'low').length;
  const sourceList = Array.from(new Set([
    'Lumb & Jones, 6ª ed.',
    "Plumb's Veterinary Drug Handbook, 10ª ed.",
    'Nelson & Couto, 6ª ed.',
    ...input.drug.references,
  ]));

  const practicalLines = (result.practicalSummary || [result.instructions]).filter(Boolean);

  const handleCopySummary = () => {
    const text = [
      'PREPARO E ADMINISTRAÇÃO',
      ...practicalLines,
      '',
      `Paciente: ${input.patient.species === 'dog' ? 'Cão' : 'Gato'} · ${input.patient.weight} kg`,
      `Fármaco: ${input.drug.namePt}`,
      `Apresentação: ${input.presentation.description}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    historyService.addHistory(input, result);
  };

  const handleCopyCalculations = () => {
    navigator.clipboard.writeText([
      'MEMÓRIA DE CÁLCULO',
      ...result.steps.map((step) => `${step.step}. ${step.title || 'Cálculo'}\n${step.formula}\nResultado: ${step.result}${step.unit ? ` ${step.unit}` : ''}`),
      '',
      `Paciente: ${input.patient.weight} kg · Dose: ${input.dose} ${input.doseUnit}`,
    ].join('\n\n'));
  };

  const initiateSave = () => {
    setFavoriteName(`${input.drug.namePt} — ${input.dose} ${input.doseUnit}`);
    setShowSaveForm(true);
  };

  const confirmSave = async () => {
    if (!favoriteName.trim()) return;
    setSaveError(null);
    const outcome = await favoritesService.saveFavorite(favoriteName.trim(), input, result);
    if (outcome.ok === false) {
      setSaveError(outcome.reason === 'auth' ? 'Entre na sua conta Vetius para salvar.' : 'Não foi possível salvar. Tente novamente.');
      return;
    }
    historyService.addHistory(input, result);
    setShowSaveForm(false);
    setIsSaved(true);
    window.setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <section aria-labelledby="result-title" className="space-y-3">
      <div className="overflow-hidden rounded-[24px] bg-slate-950 text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)] dark:ring-1 dark:ring-slate-800">
        <div className="border-b border-white/10 p-5 md:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-400 text-emerald-950">
                <Check className="h-5 w-5 stroke-[3]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">Cálculo concluído</p>
                <h2 id="result-title" className="mt-0.5 text-xl font-bold tracking-tight md:text-2xl">
                  Como preparar
                </h2>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={handleCopySummary} className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-white px-3 text-xs font-bold text-slate-950 hover:bg-slate-100 sm:flex-none">
                <Copy className="h-4 w-4" /> Copiar
              </button>
              <button type="button" onClick={initiateSave} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 text-slate-200 hover:bg-white/10" aria-label="Salvar como favorito">
                <Star className={cn('h-4 w-4', isSaved && 'fill-yellow-300 text-yellow-300')} />
              </button>
            </div>
          </div>

          {showSaveForm && (
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.06] p-3">
              <label className="text-xs font-semibold text-slate-300">Nome do preparo</label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input value={favoriteName} onChange={(event) => setFavoriteName(event.target.value)} className="min-h-11 min-w-0 flex-1 rounded-lg border border-white/15 bg-slate-900 px-3 text-sm text-white outline-none focus:border-emerald-400" autoFocus />
                <div className="flex gap-2">
                  <button type="button" onClick={() => setShowSaveForm(false)} className="min-h-11 flex-1 rounded-lg px-3 text-xs font-bold text-slate-300 hover:bg-white/10">Cancelar</button>
                  <button type="button" onClick={confirmSave} className="min-h-11 flex-1 rounded-lg bg-emerald-400 px-4 text-xs font-bold text-emerald-950">Salvar</button>
                </div>
              </div>
              {saveError && <p className="mt-2 text-xs text-red-300">{saveError}</p>}
            </div>
          )}
        </div>

        {result.isImpossible ? (
          <div className="p-5 md:p-7">
            <p className="text-base font-semibold leading-7 text-red-200">Não administre este preparo antes de revisar os dados.</p>
          </div>
        ) : (
          <>
            <div className="p-5 md:p-7">
              <ol className="space-y-4">
                {practicalLines.map((line, index) => (
                  <li key={`${line}-${index}`} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-[11px] font-bold text-emerald-300">{index + 1}</span>
                    <p className="pt-0.5 text-[15px] font-semibold leading-6 text-slate-100 md:text-base">{line}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-2 border-t border-white/10 md:grid-cols-4">
              {[
                { label: 'Fármaco', value: result.nonApplicableFields?.includes('drugVolume') ? '—' : result.drugVolume.toFixed(2), unit: 'mL' },
                { label: 'Diluente', value: result.nonApplicableFields?.includes('diluent') ? 'Sem diluição' : result.diluentVolume.toFixed(2), unit: result.nonApplicableFields?.includes('diluent') ? '' : 'mL' },
                { label: 'Concentração', value: result.finalConcentration.toFixed(2), unit: result.finalConcentrationUnit },
                { label: 'Bomba', value: result.nonApplicableFields?.includes('infusionRate') ? '—' : result.infusionRate.toFixed(1), unit: result.nonApplicableFields?.includes('infusionRate') ? '' : 'mL/h' },
              ].map((metric) => (
                <div key={metric.label} className="min-w-0 border-b border-r border-white/10 p-4 last:border-r-0 md:border-b-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">{metric.label}</p>
                  <p className="mt-1 truncate text-lg font-bold text-white">{metric.value} <span className="text-[10px] font-medium text-slate-400">{metric.unit}</span></p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {notices.length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setShowSafety((value) => !value)}
            className={cn('flex min-h-14 w-full items-center gap-3 rounded-2xl px-4 text-left shadow-sm outline-none transition focus:ring-4', severityCopy[highestSeverity].button)}
            aria-expanded={showSafety}
          >
            <ShieldAlert className="h-5 w-5 shrink-0" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold">{severityCopy[highestSeverity].label}</span>
              <span className="block text-[11px] font-semibold opacity-75">{notices.length} {notices.length === 1 ? 'item para revisar' : 'itens para revisar'} antes da administração</span>
            </span>
            <span className="hidden items-center gap-1.5 text-[10px] font-bold sm:flex">
              {criticalCount > 0 && <span>{criticalCount} crítico{criticalCount > 1 ? 's' : ''}</span>}
              {moderateCount > 0 && <span>· {moderateCount} importante{moderateCount > 1 ? 's' : ''}</span>}
              {lowCount > 0 && <span>· {lowCount} info.</span>}
            </span>
            <ChevronDown className={cn('h-5 w-5 shrink-0 transition-transform', showSafety && 'rotate-180')} />
          </button>

          {showSafety && (
            <div className="mt-2 rounded-[22px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:p-5">
              <div className="space-y-2.5">
                {notices.map((notice) => {
                  const style = severityCopy[notice.severity];
                  return (
                    <div key={notice.id} className={cn('rounded-xl border p-3.5', style.card)}>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                        <div>
                          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] opacity-70">{style.itemLabel}</p>
                          <p className="mt-0.5 text-sm font-bold">{notice.title}</p>
                          <p className="mt-1 text-xs font-medium leading-5 opacity-85">{notice.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Base clínica da graduação e do fármaco</p>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{sourceList.join(' · ')}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="rounded-[22px] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <button type="button" onClick={() => setShowAdditional((value) => !value)} className="flex min-h-16 w-full items-center gap-3 px-4 text-left md:px-5" aria-expanded={showAdditional}>
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            <Info className="h-4 w-4" />
          </div>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-slate-900 dark:text-white">Informações adicionais</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Dose entregue, estoque, notas clínicas e memória</span>
          </span>
          <ChevronDown className={cn('h-5 w-5 text-slate-400 transition-transform', showAdditional && 'rotate-180')} />
        </button>

        {showAdditional && (
          <div className="border-t border-slate-100 p-4 dark:border-slate-800 md:p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">Dose entregue</p>
                <p className="mt-1 text-xl font-bold text-emerald-950 dark:text-emerald-200">{result.deliveredDose.toFixed(2)} <span className="text-xs font-semibold">{result.deliveredDoseUnit}</span></p>
              </div>
              <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Estoque utilizado</p>
                <p className="mt-1 text-sm font-bold leading-5 text-slate-900 dark:text-white">{input.presentation.description}</p>
              </div>
            </div>

            {result.clinicalPearls && result.clinicalPearls.length > 0 && (
              <div className="mt-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <p className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white"><Heart className="h-4 w-4 text-emerald-600" /> Pontos práticos</p>
                <ul className="mt-3 space-y-2">
                  {result.clinicalPearls.map((pearl) => <li key={pearl} className="flex gap-2 text-xs leading-5 text-slate-600 dark:text-slate-300"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />{pearl}</li>)}
                </ul>
              </div>
            )}

            {result.steps.length > 0 && (
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex min-h-12 items-center gap-2 px-3">
                  <button type="button" onClick={() => setShowMath((value) => !value)} className="flex min-h-10 min-w-0 flex-1 items-center gap-2 text-left" aria-expanded={showMath}>
                    <Calculator className="h-4 w-4 text-slate-400" />
                    <span className="flex-1 text-sm font-bold text-slate-800 dark:text-slate-200">Memória de cálculo</span>
                    <ChevronRight className={cn('h-4 w-4 text-slate-400 transition-transform', showMath && 'rotate-90')} />
                  </button>
                  <button type="button" onClick={handleCopyCalculations} className="flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-[11px] font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><Clipboard className="h-3.5 w-3.5" /> Copiar</button>
                </div>
                {showMath && (
                  <div className="space-y-3 border-t border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950/40">
                    {result.steps.map((step) => (
                      <div key={step.step} className="rounded-lg bg-white p-3 dark:bg-slate-900">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Passo {step.step} · {step.title || 'Cálculo'}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{step.explanation || step.description}</p>
                        <code className="mt-2 block break-words rounded-md bg-slate-100 px-2.5 py-2 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">{step.formula}</code>
                        <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400"><Check className="h-3.5 w-3.5" /> {step.result} {step.unit}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
