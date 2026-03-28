import { useState } from 'react';
import { CalculatorState, PatientProfile, MaintenanceConfig, RehydrationConfig, OngoingLossesConfig, ResuscitationConfig, FluidSelection } from '../../types';
import { PatientProfileForm } from './PatientProfileForm';
import { MaintenanceMethodSelector } from './MaintenanceMethodSelector';
import { RehydrationCard } from './RehydrationCard';
import { OngoingLossesEstimator } from './OngoingLossesEstimator';
import { LivePreviewPanel } from './LivePreviewPanel';
import { generateAlerts } from '../../lib/engines/alerts';
import { calculateMaintenance, calculateRehydration, calculateOngoingLosses, calculateResuscitation } from '../../lib/engines/calculations';

export function CalculatorPage() {
  const [state, setState] = useState<CalculatorState>({
    patient: {
      species: 'canine',
      weightKg: 10,
      isObese: false,
      ageGroup: 'adult',
      comorbidities: [],
    },
    maintenance: {
      method: 'preset_dog',
      manualMlPerKgDay: 60,
      anesthesiaMlPerKgHour: 5,
    },
    rehydration: {
      enabled: false,
      dehydrationPercent: 5,
      correctionHours: 24,
    },
    ongoingLosses: {
      enabled: false,
      type: 'events',
      directMl24h: 0,
      events: [],
    },
    resuscitation: {
      enabled: false,
      mode: 'preset',
      customMlKg: 15,
      customMinutes: 15,
    },
    fluidSelection: {
      type: 'Ringer com lactato',
      route: 'IV',
      deliveryMode: 'auto',
      presentationSize: 500,
    }
  });

  const updatePatient = (updates: Partial<PatientProfile>) => setState(s => ({ ...s, patient: { ...s.patient, ...updates } }));
  const updateMaintenance = (updates: Partial<MaintenanceConfig>) => setState(s => ({ ...s, maintenance: { ...s.maintenance, ...updates } }));
  const updateRehydration = (updates: Partial<RehydrationConfig>) => setState(s => ({ ...s, rehydration: { ...s.rehydration, ...updates } }));
  const updateOngoingLosses = (updates: Partial<OngoingLossesConfig>) => setState(s => ({ ...s, ongoingLosses: { ...s.ongoingLosses, ...updates } }));

  const alerts = generateAlerts(state.patient, state.maintenance, state.rehydration, state.ongoingLosses, state.resuscitation);
  const maintenanceResults = calculateMaintenance(state.patient, state.maintenance);
  const rehydrationResults = calculateRehydration(state.patient, state.rehydration);
  const lossesResults = calculateOngoingLosses(state.patient, state.ongoingLosses);
  const resuscitationResults = calculateResuscitation(state.patient, state.resuscitation);

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-slate-50/50 dark:bg-slate-950/50">
      {/* Left Column - Form */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Calculadora Clínica</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure os parâmetros do paciente e os modificadores clínicos para o plano de fluidoterapia.</p>
          </header>

          <PatientProfileForm patient={state.patient} onChange={updatePatient} />
          <MaintenanceMethodSelector patient={state.patient} config={state.maintenance} onChange={updateMaintenance} results={maintenanceResults} />
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">3. Condições Clínicas</h3>
            <RehydrationCard config={state.rehydration} onChange={updateRehydration} />
            <OngoingLossesEstimator config={state.ongoingLosses} onChange={updateOngoingLosses} />
          </div>
          
        </div>
      </div>

      {/* Right Column - Live Preview */}
      <div className="w-full lg:w-[400px] xl:w-[450px] border-l border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl lg:shadow-none z-10 sticky top-0 h-full overflow-y-auto">
        <LivePreviewPanel 
          state={state} 
          alerts={alerts}
          maintenanceResults={maintenanceResults}
          rehydrationResults={rehydrationResults}
          lossesResults={lossesResults}
          resuscitationResults={resuscitationResults}
          onApplyAction={(partialState) => setState(s => ({ ...s, ...partialState }))}
        />
      </div>
    </div>
  );
}
