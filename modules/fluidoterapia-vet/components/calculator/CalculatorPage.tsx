import { useMemo, useState } from 'react';
import { Beaker, Sparkles } from 'lucide-react';
import { CalculatorState, FluidSelection, MaintenanceConfig, OngoingLossesConfig, PatientProfile, RehydrationConfig } from '../../types';
import { generateAlerts } from '../../lib/engines/alerts';
import { calculateMaintenance, calculateOngoingLosses, calculateRehydration, calculateResuscitation } from '../../lib/engines/calculations';
import { FluidSelectionCard } from './FluidSelectionCard';
import { LivePreviewPanel } from './LivePreviewPanel';
import { MaintenanceMethodSelector } from './MaintenanceMethodSelector';
import { OngoingLossesEstimator } from './OngoingLossesEstimator';
import { PatientProfileForm } from './PatientProfileForm';
import { RehydrationCard } from './RehydrationCard';

const initialState: CalculatorState = {
  patient: {
    species: 'canine',
    weightKg: 10,
    isObese: false,
    ageGroup: 'adult',
    comorbidities: [],
  },
  maintenance: {
    method: 'allometric',
    manualMlPerKgDay: 60,
    anesthesiaMlPerKgHour: 5,
  },
  rehydration: {
    enabled: false,
    dehydrationPercent: 5,
    correctionHours: 24,
    customCorrectionHours: 24,
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
    presetId: 'canine-standard',
    aliquotMlKg: 15,
    administrationMinutes: 15,
  },
  fluidSelection: {
    type: 'Ringer com lactato',
    route: 'IV',
    deliveryMode: 'auto',
    presentationSize: 500,
  },
};

export function CalculatorPage() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const updatePatient = (updates: Partial<PatientProfile>) => {
    setState((current) => {
      const nextPatient = { ...current.patient, ...updates };
      let nextMaintenance: MaintenanceConfig = current.maintenance;

      if ('species' in updates && updates.species) {
        nextMaintenance = {
          ...current.maintenance,
          anesthesiaMlPerKgHour: updates.species === 'canine' ? 5 : 3,
        };
      }

      if ('ageGroup' in updates && updates.ageGroup === 'obese' && !current.patient.isObese) {
        nextPatient.isObese = true;
      }

      return { ...current, patient: nextPatient, maintenance: nextMaintenance };
    });
  };

  const updateMaintenance = (updates: Partial<MaintenanceConfig>) => setState((current) => ({ ...current, maintenance: { ...current.maintenance, ...updates } }));
  const updateRehydration = (updates: Partial<RehydrationConfig>) => setState((current) => ({ ...current, rehydration: { ...current.rehydration, ...updates } }));
  const updateOngoingLosses = (updates: Partial<OngoingLossesConfig>) => setState((current) => ({ ...current, ongoingLosses: { ...current.ongoingLosses, ...updates } }));
  const updateFluidSelection = (updates: Partial<FluidSelection>) => setState((current) => ({ ...current, fluidSelection: { ...current.fluidSelection, ...updates } }));

  const maintenanceResults = useMemo(() => calculateMaintenance(state.patient, state.maintenance), [state.patient, state.maintenance]);
  const rehydrationResults = useMemo(() => calculateRehydration(state.patient, state.rehydration), [state.patient, state.rehydration]);
  const lossesResults = useMemo(() => calculateOngoingLosses(state.patient, state.ongoingLosses), [state.patient, state.ongoingLosses]);
  const resuscitationResults = useMemo(() => calculateResuscitation(state.patient, state.resuscitation), [state.patient, state.resuscitation]);
  const alerts = useMemo(
    () => generateAlerts(state.patient, state.maintenance, state.rehydration, state.ongoingLosses, state.resuscitation),
    [state.patient, state.maintenance, state.rehydration, state.ongoingLosses, state.resuscitation],
  );

  return (
    <div className="flex h-full w-full flex-col bg-slate-50/50 dark:bg-slate-950/50 lg:flex-row">
      <div className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <header className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Calculadora clinica</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">O modulo calcula, explica, justifica e alerta. Fluido e tratado como prescricao individualizada.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5 dark:border-teal-900/50 dark:bg-teal-950/20">
                <div className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
                  <Beaker className="h-4 w-4" />
                  <p className="text-sm font-bold uppercase tracking-wider">Base clinica</p>
                </div>
                <p className="mt-3 text-sm text-teal-800 dark:text-teal-200">
                  Hipovolemia nao e desidratacao. Manutencao nao substitui ressuscitacao. A conta total deve permanecer separada em manutencao + reidratacao + perdas continuas.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <p className="text-sm font-bold uppercase tracking-wider">Foco do modulo</p>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                  Peso seriado, FR, ausculta, diurese, PA, eletrólitos e sinais de sobrecarga aparecem como centro da decisao, nao como detalhe.
                </p>
              </div>
            </div>
          </header>

          <PatientProfileForm patient={state.patient} onChange={updatePatient} />
          <MaintenanceMethodSelector patient={state.patient} config={state.maintenance} onChange={updateMaintenance} results={maintenanceResults} />
          <FluidSelectionCard config={state.fluidSelection} onChange={updateFluidSelection} />

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">3. Condicoes clinicas</h3>
            <RehydrationCard config={state.rehydration} onChange={updateRehydration} />
            <OngoingLossesEstimator patient={state.patient} config={state.ongoingLosses} onChange={updateOngoingLosses} />
          </div>
        </div>
      </div>

      <div className="sticky top-0 h-full w-full overflow-y-auto border-l border-slate-200/60 bg-white/80 shadow-2xl backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/80 lg:w-[420px] xl:w-[470px] lg:shadow-none">
        <LivePreviewPanel
          state={state}
          alerts={alerts}
          maintenanceResults={maintenanceResults}
          rehydrationResults={rehydrationResults}
          lossesResults={lossesResults}
          resuscitationResults={resuscitationResults}
          onApplyAction={(partialState) => setState((current) => ({ ...current, ...partialState }))}
        />
      </div>
    </div>
  );
}
