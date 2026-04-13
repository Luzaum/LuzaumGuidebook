import { useMemo, useState } from 'react';
import { Activity } from 'lucide-react';
import { CalculatorState, MaintenanceConfig, OngoingLossesConfig, PatientProfile, RehydrationConfig } from '../../types';
import { generateAlerts } from '../../lib/engines/alerts';
import { calculateMaintenance, calculateOngoingLosses, calculateRehydration, calculateResuscitation } from '../../lib/engines/calculations';
import { LivePreviewPanel } from './LivePreviewPanel';
import { MobileClinicalPreviewSheet } from './MobileClinicalPreviewSheet';
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
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

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
  const maintenanceResults = useMemo(() => calculateMaintenance(state.patient, state.maintenance), [state.patient, state.maintenance]);
  const rehydrationResults = useMemo(() => calculateRehydration(state.patient, state.rehydration), [state.patient, state.rehydration]);
  const lossesResults = useMemo(() => calculateOngoingLosses(state.patient, state.ongoingLosses), [state.patient, state.ongoingLosses]);
  const resuscitationResults = useMemo(() => calculateResuscitation(state.patient, state.resuscitation), [state.patient, state.resuscitation]);
  const alerts = useMemo(
    () => generateAlerts(state.patient, state.maintenance, state.rehydration, state.ongoingLosses, state.resuscitation),
    [state.patient, state.maintenance, state.rehydration, state.ongoingLosses, state.resuscitation],
  );

  const previewProps = {
    state,
    alerts,
    maintenanceResults,
    rehydrationResults,
    lossesResults,
    resuscitationResults,
    onApplyAction: (partialState: Partial<CalculatorState>) => setState((current) => ({ ...current, ...partialState })),
  } as const;

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-slate-50/50 dark:bg-slate-950/50 lg:flex-row">
      <div className="min-h-0 flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="mx-auto w-full space-y-8">
          <header className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Calculadora clínica</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">O módulo calcula, explica, justifica e alerta. Fluido é tratado como prescrição individualizada.</p>
            </div>

          </header>

          <PatientProfileForm patient={state.patient} onChange={updatePatient} />
          <MaintenanceMethodSelector patient={state.patient} config={state.maintenance} onChange={updateMaintenance} results={maintenanceResults} />


          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">3. Condições clínicas</h3>
            <RehydrationCard config={state.rehydration} onChange={updateRehydration} />
            <OngoingLossesEstimator patient={state.patient} config={state.ongoingLosses} onChange={updateOngoingLosses} />
          </div>
        </div>
      </div>

      <div className="hidden h-full min-h-0 w-full overflow-y-auto border-l border-slate-200/60 bg-white/80 shadow-2xl backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/80 lg:block lg:w-[420px] xl:w-[470px] lg:shadow-none">
        <LivePreviewPanel {...previewProps} />
      </div>

      <button
        type="button"
        className="fixed right-4 z-[45] flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-teal-900/30 transition hover:bg-teal-500 lg:hidden"
        style={{ bottom: 'calc(4.75rem + env(safe-area-inset-bottom, 0px))' }}
        onClick={() => setMobilePreviewOpen(true)}
      >
        <Activity className="h-4 w-4" />
        Preview
      </button>

      <MobileClinicalPreviewSheet open={mobilePreviewOpen} onOpenChange={setMobilePreviewOpen}>
        <div className="flex h-[min(72dvh,560px)] min-h-0 flex-col sm:h-[min(75dvh,620px)]">
          <LivePreviewPanel {...previewProps} hideHeader />
        </div>
      </MobileClinicalPreviewSheet>
    </div>
  );
}
