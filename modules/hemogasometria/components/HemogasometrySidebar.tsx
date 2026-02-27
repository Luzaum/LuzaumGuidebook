import React from 'react';
import { AnalysisResult } from '../types/hemoTypes';

interface Props {
  result: AnalysisResult | null;
  inputs: any;
  onOpenModal: (key: string) => void;
  onPrint?: () => void;
}

export const HemogasometrySidebar: React.FC<Props> = ({ result, inputs, onOpenModal, onPrint }) => {
  if (!result) return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl border-l border-white/10 dark:border-slate-800 rounded-3xl">
      <div className="size-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl text-blue-500/50">hourglass_empty</span>
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Aguardando Dados</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px]">Preencha os parâmetros para visualizar a análise completa.</p>
    </div>
  );

  const alerts = [];
  if (result.anionGap.interpretation === 'Alto Anion Gap (Normoclorêmico)') {
    alerts.push({ type: 'warning', msg: `Ânion Gap corrigido elevado (<strong>${result.anionGap.correctedValue}</strong>).`, key: 'anionGap' });
  }
  if (result.compensation.mixedDisorder) {
    alerts.push({ type: 'warning', msg: `Compensação inadequada: <strong>${result.compensation.mixedDisorder}</strong>.`, key: 'compensation' });
  }
  result.electrolyteStatus.forEach(e => {
    if (e.alert && !e.status.toLowerCase().includes('hipercalemia')) {
      alerts.push({ type: 'warning', msg: e.alert, key: e.status.toLowerCase() });
    }
    if (e.status.toLowerCase().includes('hipercalemia')) {
      alerts.push({ type: 'critical', msg: e.alert, key: 'hipercalemia' });
    }
  });

  if (result.sampleCheck.probableType !== inputs.declaredSampleType && result.sampleCheck.probableType !== 'mista/indeterminada') {
    alerts.push({ type: 'critical', msg: `Provável origem <strong>${result.sampleCheck.probableType === 'arterial' ? 'Arterial' : 'Venosa'}</strong> (declarada como ${inputs.declaredSampleType}).`, key: 'sampleType' });
  }

  const phValue = parseFloat(inputs.ph);
  if (phValue < 7.2 || phValue > 7.6) {
    alerts.push({ type: 'critical', msg: `pH de <strong>${phValue}</strong> em nível crítico. Risco de vida iminente.`, key: 'diagnosis' });
  }

  return (
    <div className="h-full flex flex-col gap-6 p-6 bg-white/20 dark:bg-slate-900/20 backdrop-blur-3xl border-l border-white/10 dark:border-slate-800 rounded-l-3xl shadow-2xl overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-xl">
          <span className="material-symbols-outlined">clinical_notes</span>
        </div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Impressão Clínica</h3>
      </div>

      <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">Diagnóstico Principal</div>
        <div className="text-2xl font-black text-slate-800 dark:text-white leading-tight">{result.primaryDisorder.disorder}</div>
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="material-symbols-outlined text-sm">history_edu</span> {result.primaryDisorder.cause}
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1 px-1">Alertas e Notificações</div>
          {alerts.map((alert, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex gap-3 animate-in slide-in-from-right-4 duration-300`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <span className={`material-symbols-outlined ${alert.type === 'critical' ? 'text-red-500' : 'text-amber-500'}`}>
                {alert.type === 'critical' ? 'emergency' : 'warning'}
              </span>
              <div className="flex-grow">
                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: alert.msg }} />
              </div>
              <button onClick={() => onOpenModal(alert.key || '')} className="text-xs text-slate-400 hover:text-blue-500">
                <span className="material-symbols-outlined text-sm">help</span>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto pt-6 border-t border-white/10 dark:border-slate-800">
        <div className="flex flex-col gap-3">
          <button
            onClick={onPrint}
            className="w-full py-4 bg-white/5 dark:bg-slate-800/50 hover:bg-white/10 border border-white/10 dark:border-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined">print</span> Imprimir Análise
          </button>
          <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 transition-all">
            <span className="material-symbols-outlined">save</span> Salvar no Prontuário
          </button>
        </div>
      </div>
    </div>
  );
};
