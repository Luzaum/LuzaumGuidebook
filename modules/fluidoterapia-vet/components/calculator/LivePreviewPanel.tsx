import { Activity, AlertTriangle, ArrowDownToLine, Clock, Droplet, HeartPulse, Settings2 } from 'lucide-react';
import { CalculatorState, ClinicalAlert } from '../../types';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

interface Props {
  state: CalculatorState;
  alerts: ClinicalAlert[];
  maintenanceResults: { mlPerDay: number; mlPerHour: number; x1: number; x1_5: number; x2: number };
  rehydrationResults: { deficitMl: number; hourlyMl: number; hours: number };
  lossesResults: { mlPerDay: number; hourlyMl: number };
  resuscitationResults: { totalMl: number; mlPerMin: number; mlPerHour: number; timeMinutes: number };
  onApplyAction: (partialState: Partial<CalculatorState>) => void;
}

export function LivePreviewPanel({
  state,
  alerts,
  maintenanceResults,
  rehydrationResults,
  lossesResults,
  onApplyAction,
}: Props) {
  const totalHourly = maintenanceResults.mlPerHour + rehydrationResults.hourlyMl + lossesResults.hourlyMl;
  const total24h = totalHourly * 24;

  const deliveryText = state.fluidSelection.deliveryMode === 'auto'
    ? `${totalHourly.toFixed(1)} mL/h em bomba`
    : state.fluidSelection.deliveryMode === 'macro'
      ? `${Math.max(0, Math.round((totalHourly * 20) / 60))} gts/min em macrogotas`
      : `${Math.max(0, Math.round(totalHourly))} gts/min em microgotas`;

  const alertClasses: Record<ClinicalAlert['level'], string> = {
    INFO: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300',
    WARNING: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300',
    HIGH_RISK: 'border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-300',
    CRITICAL: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300',
  };

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/80 p-6 backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/80">
        <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100">
          <Activity className="h-5 w-5 text-teal-500" />
          Preview clinico
        </h3>
        <p className="mt-1 text-sm text-slate-500">Calcula, justifica e lembra o que precisa ser monitorado.</p>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-8">
          <section className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Prescricao atual</h4>
            <div className="rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 p-6 text-white shadow-lg shadow-teal-500/15">
              <p className="text-sm font-medium text-teal-100">Taxa total continua</p>
              <p className="mt-2 text-5xl font-black tracking-tight">{Number.isFinite(totalHourly) ? totalHourly.toFixed(1) : '0.0'} <span className="text-2xl font-semibold opacity-80">mL/h</span></p>
              <div className="mt-4 rounded-2xl bg-white/10 p-4 text-sm">
                <p>Volume 24 h: {Number.isFinite(total24h) ? total24h.toFixed(0) : '0'} mL</p>
                <p className="mt-1">Fluido: {state.fluidSelection.type}</p>
                <p className="mt-1">Via: {state.fluidSelection.route} | Entrega: {deliveryText}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 p-4 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-100">1,5x manutencao</p>
                <p className="mt-2 text-2xl font-black">{maintenanceResults.x1_5.toFixed(1)} <span className="text-sm font-medium opacity-90">mL/h</span></p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 p-4 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-rose-100">2x manutencao</p>
                <p className="mt-2 text-2xl font-black">{maintenanceResults.x2.toFixed(1)} <span className="text-sm font-medium opacity-90">mL/h</span></p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Composicao da taxa</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center gap-3">
                  <Droplet className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Manutencao</p>
                    <p className="text-xs text-slate-500">{maintenanceResults.mlPerDay.toFixed(0)} mL/dia</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{maintenanceResults.mlPerHour.toFixed(1)} mL/h</span>
              </div>

              {state.rehydration.enabled ? (
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-indigo-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Reidratacao</p>
                      <p className="text-xs text-slate-500">Deficit {rehydrationResults.deficitMl.toFixed(0)} mL em {rehydrationResults.hours} h</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{rehydrationResults.hourlyMl.toFixed(1)} mL/h</span>
                </div>
              ) : null}

              {state.ongoingLosses.enabled ? (
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex items-center gap-3">
                    <ArrowDownToLine className="h-4 w-4 text-amber-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Perdas continuas</p>
                      <p className="text-xs text-slate-500">{lossesResults.mlPerDay.toFixed(0)} mL/dia</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{lossesResults.hourlyMl.toFixed(1)} mL/h</span>
                </div>
              ) : null}
            </div>
          </section>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
            <p className="font-semibold text-slate-800 dark:text-slate-100">Fluido e droga.</p>
            <p className="mt-2">A conta total sempre deve ficar separada em ressuscitacao + reidratacao + perdas continuas + manutencao. O bolus de ressuscitacao nao entra misturado aqui.</p>
          </div>

          <Separator className="dark:bg-slate-800/60" />

          <section className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Monitorizacao central</h4>
            <div className="grid gap-3">
              {[
                'Peso corporal seriado',
                'FR e esforco respiratorio',
                'Ausculta',
                'Diurese e balanço hidrico',
                'PA e perfusao',
                'Eletrólitos e sinais de sobrecarga',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <HeartPulse className="h-4 w-4 text-teal-500" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {alerts.length > 0 ? (
            <>
              <Separator className="dark:bg-slate-800/60" />
              <section className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Alertas clinicos</h4>
                {alerts.map((alert, index) => (
                  <div key={`${alert.title}-${index}`} className={`rounded-2xl border p-4 ${alertClasses[alert.level]}`}>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                      <div className="space-y-2">
                        <p className="text-sm font-bold">{alert.title}</p>
                        <p className="text-sm">{alert.explanation}</p>
                        <p className="text-xs"><strong>Por que importa:</strong> {alert.whyItMatters}</p>
                        <p className="text-xs"><strong>Monitorar:</strong> {alert.whatToMonitor}</p>
                        <p className="text-xs"><strong>Conduta:</strong> {alert.recommendation}</p>
                        {alert.action ? (
                          <button
                            type="button"
                            onClick={() => onApplyAction(alert.action!.apply(state))}
                            className="mt-2 flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 text-xs font-bold uppercase tracking-wider text-current transition-colors hover:bg-white dark:bg-black/20 dark:hover:bg-black/35"
                          >
                            <Settings2 className="h-3.5 w-3.5" />
                            {alert.action.label}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </>
          ) : null}
        </div>
      </ScrollArea>
    </div>
  );
}
