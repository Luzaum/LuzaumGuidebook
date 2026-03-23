import React, { useState } from 'react';
import { CalculationInput, CalculationResult } from '../../shared/types/calculation';
import { SafetyEvaluation } from '../../safety-rules/evaluator';
import {
  Activity,
  AlertTriangle,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Copy,
  Droplets,
  FlaskConical,
  Gauge,
  Info,
  ShieldAlert,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { favoritesService } from '../../application/services/favoritesService';
import { historyService } from '../../application/services/historyService';

interface ResultsProps {
  input: CalculationInput | null;
  result: CalculationResult | null;
  safety: SafetyEvaluation | null;
}

export const ResultsDisplay: React.FC<ResultsProps> = ({ input, result, safety }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [favoriteName, setFavoriteName] = useState('');

  if (!input || !result || !safety) return null;

  const handleCopySummary = () => {
    const text = [
      '🐾 CRIVET — PRESCRIÇÃO PRÁTICA',
      '--------------------------------',
      ...(result.practicalSummary || [result.instructions]),
      '--------------------------------',
      `• Paciente: ${input.patient.species === 'dog' ? 'Cão' : 'Gato'} (${input.patient.weight} kg)`,
      `• Droga: ${input.drug.namePt}`,
      `• Apresentação: ${input.presentation.description}`,
      '',
      'Calculado via CRIVET - Calculadora Veterinária Didática'
    ].join('\n');

    navigator.clipboard.writeText(text);
    historyService.addHistory(input, result);
  };

  const handleCopyCalculations = () => {
    const text = [
      '📐 CRIVET — MEMÓRIA DE CÁLCULO (Auditável)',
      '--------------------------------',
      ...result.steps.map(s => `[PASSO ${s.step}] ${s.title}\n   ${s.explanation}\n   Cálculo: ${s.formula}\n   Resultado: ${s.result} ${s.unit}\n`),
      '🔹 CHECAGEM REVERSA:',
      ...(result.reverseCheckSteps?.map(r => `   ${r.explanation}\n   Provado: ${r.result}`) || []),
      '--------------------------------',
      `Paciente: ${input.patient.weight} kg | Dose: ${input.dose} ${input.doseUnit}`,
    ].join('\n');

    navigator.clipboard.writeText(text);
  };

  const initiateSave = () => {
    setFavoriteName(`${input.drug.namePt} - ${input.dose} ${input.doseUnit}`);
    setShowSaveForm(true);
  };

  const confirmSave = async () => {
    if (!favoriteName.trim()) return;
    await favoritesService.saveFavorite(favoriteName.trim(), input, result);
    historyService.addHistory(input, result);
    setShowSaveForm(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const hasDanger = result.isImpossible || safety.alerts.some((alert) => alert.level === 'danger');
  const hasWarnings = safety.alerts.length > 0 || safety.warnings.length > 0;

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.16fr)_minmax(360px,0.84fr)] 2xl:grid-cols-[minmax(0,1.22fr)_minmax(380px,0.78fr)]">
      <div className="space-y-5">
        {!result.isImpossible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900 p-5 text-white shadow-xl md:p-6"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 opacity-[0.04]">
              <FlaskConical className="h-64 w-64 rotate-12" />
            </div>

            <div className="relative z-10">
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/15 text-emerald-300">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-white">Prescricao pronta</h2>
                    <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-400">
                      calculo conferivel
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={handleCopySummary}
                    className="flex min-h-10 items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition-all hover:bg-emerald-500/20"
                  >
                    <Copy className="h-4 w-4" /> Copiar Resumo
                  </button>
                  <button
                    onClick={handleCopyCalculations}
                    className="flex min-h-10 items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-all hover:border-slate-600 hover:bg-slate-700"
                  >
                    <Calculator className="h-4 w-4" /> Copiar Memória
                  </button>
                  <button
                    onClick={initiateSave}
                    className={cn(
                      'flex min-h-10 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all',
                      isSaved ? 'bg-amber-500 text-amber-950' : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700',
                    )}
                  >
                    <Star className={cn('h-4 w-4', isSaved && 'fill-amber-950')} />
                    {isSaved ? 'Salvo' : 'Favoritar'}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {showSaveForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-5 overflow-hidden"
                  >
                    <div className="flex flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-800/80 p-4 backdrop-blur-sm lg:flex-row lg:items-end">
                      <div className="min-w-0 flex-1">
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                          Nome do protocolo
                        </label>
                        <input
                          type="text"
                          value={favoriteName}
                          onChange={(event) => setFavoriteName(event.target.value)}
                          className="w-full rounded-xl border border-slate-600 bg-slate-900/60 px-4 py-3 text-white transition-all focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          autoFocus
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowSaveForm(false)}
                          className="min-h-10 rounded-xl bg-slate-700 px-5 py-2 text-sm font-bold transition-colors hover:bg-slate-600"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={confirmSave}
                          className="min-h-10 rounded-xl bg-emerald-600 px-5 py-2 text-sm font-bold transition-colors hover:bg-emerald-500"
                        >
                          Confirmar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-4 backdrop-blur-md md:p-5">
                {result.practicalSummary ? (
                  result.practicalSummary.map((line, idx) => (
                    <p key={idx} className="text-base font-semibold leading-relaxed text-slate-100 md:text-lg mb-1">{line}</p>
                  ))
                ) : (
                  <p className="text-base font-semibold leading-relaxed text-slate-100 md:text-lg">{result.instructions}</p>
                )}
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-700/50 bg-slate-800/35 p-4">
                  <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    <FlaskConical className="h-3.5 w-3.5 text-emerald-400/80" /> Vol. farmaco
                  </p>
                  <div className="flex items-baseline gap-1">
                    {result.nonApplicableFields?.includes('drugVolume') ? (
                      <span className="text-lg font-bold tracking-tight text-slate-500">Não se aplica</span>
                    ) : (
                      <>
                        <span className="text-2xl font-bold tracking-tight text-emerald-400">{result.drugVolume.toFixed(2)}</span>
                        <span className="text-xs text-slate-500">mL</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-700/50 bg-slate-800/35 p-4">
                  <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    <Droplets className="h-3.5 w-3.5 text-blue-400/80" /> Vol. diluente
                  </p>
                  <div className="flex items-baseline gap-1">
                    {result.nonApplicableFields?.includes('diluent') ? (
                      <span className="text-lg font-bold tracking-tight text-slate-500">Sem diluição</span>
                    ) : (
                      <>
                        <span className="text-2xl font-bold tracking-tight text-blue-400">{result.diluentVolume.toFixed(2)}</span>
                        <span className="text-xs text-slate-500">mL</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-700/50 bg-slate-800/35 p-4">
                  <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    <Activity className="h-3.5 w-3.5 text-amber-400/80" /> Conc. final
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold tracking-tight text-amber-400">{result.finalConcentration.toFixed(2)}</span>
                    <span className="text-xs text-slate-500">{result.finalConcentrationUnit}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-700/50 bg-slate-800/35 p-4">
                  <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    <Gauge className="h-3.5 w-3.5 text-white/80" /> Taxa bomba
                  </p>
                  <div className="flex items-baseline gap-1">
                    {result.nonApplicableFields?.includes('infusionRate') ? (
                      <span className="text-lg font-bold tracking-tight text-slate-500">Não se aplica</span>
                    ) : (
                      <>
                        <span className="text-2xl font-bold tracking-tight text-white">{result.infusionRate.toFixed(1)}</span>
                        <span className="text-xs text-slate-500">mL/h</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.8fr)]">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-400">Dose entregue</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-xl font-bold tracking-tight text-emerald-300">{result.deliveredDose.toFixed(2)}</span>
                    <span className="text-xs text-emerald-500/80">{result.deliveredDoseUnit}</span>
                  </div>
                </div>

                <div
                  className={cn(
                    'rounded-2xl border p-4',
                    input.presentation.custom
                      ? 'border-indigo-500/20 bg-indigo-500/10'
                      : 'border-slate-700/50 bg-slate-800/35',
                  )}
                >
                  <p
                    className={cn(
                      'text-[10px] font-bold uppercase tracking-[0.24em]',
                      input.presentation.custom ? 'text-indigo-300' : 'text-slate-400',
                    )}
                  >
                    Estoque utilizado
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-white">{input.presentation.description}</p>
                  <p className={cn('mt-1 text-xs', input.presentation.custom ? 'text-indigo-200/80' : 'text-slate-400')}>
                    {input.presentation.custom ? 'Apresentacao personalizada aplicada ao calculo.' : 'Apresentacao cadastrada no catalogo.'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {!result.isImpossible && result.steps.length > 0 && (
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900 md:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">Memoria de calculo</h3>
                <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  Passo a passo matematico para conferencia.
                </p>
              </div>
            </div>

            <div className="relative space-y-4 before:absolute before:bottom-0 before:left-5 before:top-0 before:w-px before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent dark:before:via-slate-700">
              {result.steps.map((step) => (
                <div key={step.step} className="relative flex items-start gap-3">
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-indigo-100 text-sm font-bold text-indigo-700 shadow dark:border-slate-900 dark:bg-indigo-500/20 dark:text-indigo-400">
                    {step.step}
                  </div>
                  <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700/50 dark:bg-slate-800/50">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-indigo-500 dark:text-indigo-400">PASSO {step.step} — {step.title || 'Cálculo'}</p>
                    <p className="mt-1 mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {step.explanation || step.description}
                    </p>
                    
                    <div className="rounded-xl border border-slate-200/60 bg-white p-3 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/50">
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-1">Cálculo</p>
                      <code className="block break-all text-sm font-mono text-slate-800 dark:text-slate-200">
                        {step.formula}
                      </code>
                    </div>
                    
                    <div className="mt-3 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                      <div className="flex-1">
                        <span className="text-[10px] block font-bold uppercase tracking-[0.1em] text-emerald-600/70 dark:text-emerald-400/70 mb-0.5">Resultado</span>
                        <span className="text-lg font-bold tracking-tight">{step.result}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {result.reverseCheckSteps && result.reverseCheckSteps.length > 0 && (
                <div className="relative pt-4">
                  <div className="absolute left-10 right-0 top-0 h-px bg-slate-200 dark:bg-slate-800" />
                  <div className="relative flex items-start gap-3">
                    <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-emerald-100 text-sm font-bold text-emerald-700 shadow dark:border-slate-900 dark:bg-emerald-500/20 dark:text-emerald-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1 rounded-2xl border-2 border-emerald-100 bg-emerald-50/50 p-4 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">CHECAGEM REVERSA</p>
                      {result.reverseCheckSteps.map((rk, idx) => (
                        <div key={idx} className="mt-3">
                          <p className="mb-2 text-sm font-medium text-emerald-900/80 dark:text-emerald-100/80">
                            {rk.explanation}
                          </p>
                          <code className="block break-all rounded-xl border border-emerald-200/50 bg-white/60 px-3 py-2 text-xs text-emerald-900 shadow-sm dark:border-emerald-500/30 dark:bg-slate-900/60 dark:text-emerald-100">
                            {rk.formula}
                          </code>
                          <div className="mt-2 flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400">
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-lg">{rk.result}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-5">


        <AnimatePresence>
          {(safety.alerts.length > 0 || safety.warnings.length > 0 || result.isImpossible) && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                <ShieldAlert className="h-5 w-5 text-amber-500" />
                <h3 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">Avisos e Segurança</h3>
              </div>
              {result.isImpossible && (
                <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-4 shadow-sm dark:border-red-900/50 dark:bg-red-950/30">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                    <div>
                      <h4 className="font-bold text-red-800 dark:text-red-300">Motivo da inviabilidade</h4>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-red-700 dark:text-red-400/90">
                        {result.impossibleReason}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {safety.alerts.map((alert, index) => (
                <div
                  key={`${alert.id}-${index}`}
                  className={cn(
                    'rounded-2xl border-2 p-4 shadow-sm',
                    alert.level === 'danger'
                      ? 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30'
                      : 'border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      className={cn(
                        'mt-0.5 h-5 w-5 shrink-0',
                        alert.level === 'danger' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400',
                      )}
                    />
                    <div>
                      <h4
                        className={cn(
                          'font-bold',
                          alert.level === 'danger' ? 'text-red-800 dark:text-red-300' : 'text-amber-800 dark:text-amber-300',
                        )}
                      >
                        Alerta clinico
                      </h4>
                      <p
                        className={cn(
                          'mt-1 text-sm font-medium leading-relaxed',
                          alert.level === 'danger' ? 'text-red-700 dark:text-red-400/90' : 'text-amber-700 dark:text-amber-400/90',
                        )}
                      >
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {safety.warnings.map((warning, index) => (
                <div key={`${warning}-${index}`} className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4 shadow-sm dark:border-blue-900/50 dark:bg-blue-950/30">
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                    <div>
                      <h4 className="font-bold text-blue-800 dark:text-blue-300">Aviso clinico</h4>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-blue-700 dark:text-blue-400/90">{warning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {result.clinicalPearls && result.clinicalPearls.length > 0 && (
          <div className="rounded-[28px] border border-amber-200 bg-amber-50/50 p-5 shadow-sm dark:border-amber-500/20 dark:bg-amber-500/5 md:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                <Star className="h-5 w-5 fill-current" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-amber-900 dark:text-amber-100">Pérolas Clínicas</h3>
                <p className="text-xs font-medium text-amber-700/70 dark:text-amber-300/60">Dicas essenciais para este fármaco.</p>
              </div>
            </div>
            <ul className="space-y-3">
              {result.clinicalPearls.map((pearl, i) => (
                <li key={i} className="flex gap-3 text-sm font-medium leading-relaxed text-amber-800 dark:text-amber-200">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span>{pearl}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
