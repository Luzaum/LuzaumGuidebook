import { CalculatorState, ClinicalAlert } from '../../types';
import { Activity, AlertTriangle, Droplet, Zap, ArrowDownToLine, CheckCircle2, Syringe, Clock, Settings2 } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

interface Props {
  state: CalculatorState;
  alerts: ClinicalAlert[];
  maintenanceResults: { mlPerDay: number; mlPerHour: number; x1: number; x1_5: number; x2: number };
  rehydrationResults: { deficitMl: number; hourlyMl: number };
  lossesResults: { mlPerDay: number; hourlyMl: number };
  resuscitationResults: { totalMl: number; mlPerMin: number; timeMinutes: number };
  onApplyAction: (partialState: Partial<CalculatorState>) => void;
}

export function LivePreviewPanel({ state, alerts, maintenanceResults, rehydrationResults, lossesResults, resuscitationResults, onApplyAction }: Props) {
  const totalHourly = maintenanceResults.mlPerHour + rehydrationResults.hourlyMl + lossesResults.hourlyMl;
  const total24h = totalHourly * 24;

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'INFO': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
      case 'WARNING': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800';
      case 'HIGH_RISK': return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800';
      case 'CRITICAL': return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const renderDeliveryMode = () => {
    if (state.fluidSelection.deliveryMode === 'auto') {
      return (
        <div className="flex items-center gap-2 mt-3 p-3 bg-white/10 rounded-lg">
          <Clock className="w-4 h-4 text-teal-100" />
          <span className="text-sm font-medium text-teal-50">Bomba de Infusão: {totalHourly.toFixed(1)} mL/h</span>
        </div>
      );
    } else if (state.fluidSelection.deliveryMode === 'macro') {
      const dropsPerMin = (totalHourly * 20) / 60;
      const secondsPerDrop = 60 / dropsPerMin;
      return (
        <div className="flex items-center gap-2 mt-3 p-3 bg-white/10 rounded-lg">
          <Droplet className="w-4 h-4 text-teal-100" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-teal-50">Macrogotas: {Math.round(dropsPerMin)} gts/min</span>
            <span className="text-xs text-teal-200">1 gota a cada {secondsPerDrop.toFixed(1)} seg</span>
          </div>
        </div>
      );
    } else {
      const dropsPerMin = (totalHourly * 60) / 60;
      const secondsPerDrop = 60 / dropsPerMin;
      return (
        <div className="flex items-center gap-2 mt-3 p-3 bg-white/10 rounded-lg">
          <Droplet className="w-4 h-4 text-teal-100" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-teal-50">Microgotas: {Math.round(dropsPerMin)} gts/min</span>
            <span className="text-xs text-teal-200">1 gota a cada {secondsPerDrop.toFixed(1)} seg</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="p-6 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-500" />
          Preview Clínico
        </h3>
        <p className="text-sm text-slate-500 mt-1">Atualizado em tempo real</p>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-8">
          
          {/* Resumo do Paciente */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Paciente</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {state.patient.species === 'canine' ? 'Cão' : 'Gato'}
              </Badge>
              <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {state.patient.weightKg} kg
              </Badge>
              <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {state.patient.ageGroup}
              </Badge>
              {state.patient.isObese && (
                <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                  Obeso (Ideal: {state.patient.idealWeightKg || '?'} kg)
                </Badge>
              )}
            </div>
          </div>

          <Separator className="dark:bg-slate-800/60" />

          {/* Resultado Final */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Taxa de Infusão Contínua</h4>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg shadow-teal-500/20 text-white">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-teal-100 text-sm font-medium mb-1">Total (Manutenção + Déficits)</p>
                  <p className="text-5xl font-black tracking-tight">
                    {Number.isFinite(totalHourly) ? totalHourly.toFixed(1) : '0.0'} <span className="text-2xl font-semibold opacity-80">mL/h</span>
                  </p>
                </div>
              </div>
              
              {renderDeliveryMode()}

              <div className="mt-4 pt-4 border-t border-white/20 flex justify-between text-sm">
                <span className="text-teal-100">Volume 24h:</span>
                <span className="font-bold">{Number.isFinite(total24h) ? total24h.toFixed(0) : '0'} mL</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md text-white">
                <p className="text-amber-100 text-xs font-medium mb-1 uppercase tracking-wider">1,5x Manutenção</p>
                <p className="text-2xl font-bold tracking-tight">
                  {Number.isFinite(maintenanceResults.x1_5) ? maintenanceResults.x1_5.toFixed(1) : '0.0'} <span className="text-sm font-normal opacity-90">mL/h</span>
                </p>
                <p className="text-xs text-amber-100 mt-1">{Number.isFinite(maintenanceResults.x1_5 * 24) ? (maintenanceResults.x1_5 * 24).toFixed(0) : '0'} mL/dia</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 shadow-md text-white">
                <p className="text-rose-100 text-xs font-medium mb-1 uppercase tracking-wider">2x Manutenção</p>
                <p className="text-2xl font-bold tracking-tight">
                  {Number.isFinite(maintenanceResults.x2) ? maintenanceResults.x2.toFixed(1) : '0.0'} <span className="text-sm font-normal opacity-90">mL/h</span>
                </p>
                <p className="text-xs text-rose-100 mt-1">{Number.isFinite(maintenanceResults.x2 * 24) ? (maintenanceResults.x2 * 24).toFixed(0) : '0'} mL/dia</p>
              </div>
            </div>
          </div>

          {/* Breakdown Matemático */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Composição da Taxa</h4>
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                  <Droplet className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Manutenção</span>
                  <span className="text-xs text-slate-500">{Number.isFinite(maintenanceResults.mlPerDay) ? maintenanceResults.mlPerDay.toFixed(0) : '0'} mL/dia</span>
                </div>
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{Number.isFinite(maintenanceResults.mlPerHour) ? maintenanceResults.mlPerHour.toFixed(1) : '0.0'} mL/h</span>
            </div>

            {state.rehydration.enabled && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-md">
                    <Droplet className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Reidratação</span>
                    <span className="text-xs text-slate-500">Déficit: {Number.isFinite(rehydrationResults.deficitMl) ? rehydrationResults.deficitMl.toFixed(0) : '0'} mL em {state.rehydration.correctionHours === 0 ? state.rehydration.customCorrectionHours : state.rehydration.correctionHours}h</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{Number.isFinite(rehydrationResults.hourlyMl) ? rehydrationResults.hourlyMl.toFixed(1) : '0.0'} mL/h</span>
              </div>
            )}

            {state.ongoingLosses.enabled && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-md">
                    <ArrowDownToLine className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Perdas Contínuas</span>
                    <span className="text-xs text-slate-500">{Number.isFinite(lossesResults.mlPerDay) ? lossesResults.mlPerDay.toFixed(0) : '0'} mL/dia</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{Number.isFinite(lossesResults.hourlyMl) ? lossesResults.hourlyMl.toFixed(1) : '0.0'} mL/h</span>
              </div>
            )}
          </div>

          {/* Alertas */}
          {alerts.length > 0 && (
            <>
              <Separator className="dark:bg-slate-800/60" />
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alertas Clínicos</h4>
                <div className="space-y-3">
                  {alerts.map((alert, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border ${getAlertColor(alert.level)}`}>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div className="space-y-2 w-full">
                          <p className="font-bold text-sm">{alert.title}</p>
                          <p className="text-xs opacity-90">{alert.explanation}</p>
                          <div className="pt-2 mt-2 border-t border-current/10">
                            <p className="text-xs font-semibold">Recomendação:</p>
                            <p className="text-xs opacity-90">{alert.recommendation}</p>
                          </div>
                          {/* Botão Adaptar */}
                          {alert.action && (
                            <button 
                              onClick={() => onApplyAction(alert.action!.apply(state))}
                              className="mt-2 w-full py-2 flex items-center justify-center gap-2 rounded-lg bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 transition-colors text-xs font-bold uppercase tracking-wider"
                            >
                              <Settings2 className="w-3 h-3" />
                              {alert.action.label}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </ScrollArea>
    </div>
  );
}
