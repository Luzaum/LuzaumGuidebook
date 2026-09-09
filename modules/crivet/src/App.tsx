import { useEffect, useRef, useState } from 'react';
import { MainLayout } from './ui/layouts/MainLayout';
import { PatientForm } from './ui/components/PatientForm';
import { DrugSelector } from './ui/components/DrugSelector';
import { CalculationConfig } from './ui/components/CalculationConfig';
import { ResultsDisplay } from './ui/components/ResultsDisplay';
import { DrugDatabase } from './ui/components/DrugDatabase';
import { Favorites } from './ui/components/Favorites';
import { HistoryView } from './ui/components/HistoryView';
import { ProtocolsView } from './ui/components/ProtocolsView';
import { SettingsView } from './ui/components/SettingsView';
import { AboutView } from './ui/components/AboutView';
import { useCalculation } from './application/hooks/useCalculation';
import { drugCatalog } from './catalog/drugs';
import { Check, ChevronDown, FlaskConical, PawPrint } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('calculator');
  const previousDrugId = useRef<string | null>(null);

  const {
    patient,
    setPatient,
    selectedDrug,
    handleDrugSelect,
    config,
    handleConfigChange,
    loadFavorite,
    input,
    result,
    safety,
  } = useCalculation();

  const patientReady = patient.weight > 0;
  const canCalculate = Boolean(selectedDrug && patientReady);
  const hasResults = Boolean(input && result && safety);

  useEffect(() => {
    if (selectedDrug && previousDrugId.current !== selectedDrug.id) {
      window.setTimeout(() => {
        document.getElementById('preparo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 180);
    }
    previousDrugId.current = selectedDrug?.id ?? null;
  }, [selectedDrug]);

  return (
    <MainLayout activePage={activePage} onNavigate={setActivePage}>
      {activePage === 'calculator' && (
        <div className="mx-auto w-full max-w-[920px] pb-10">
          <header className="mb-7 pt-2 md:mb-9 md:pt-1">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              <FlaskConical className="h-4 w-4" /> Calculadora de infusão veterinária
            </div>
            <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white md:text-[2.65rem]">
              Prepare com clareza.
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 md:text-base">
              Informe o paciente, escolha o fármaco e ajuste o preparo. A prescrição aparece logo abaixo.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-2" aria-label="Progresso do cálculo">
              {[
                { label: 'Paciente', done: patientReady, active: !patientReady },
                { label: 'Fármaco', done: Boolean(selectedDrug), active: patientReady && !selectedDrug },
                { label: 'Preparo', done: hasResults, active: Boolean(selectedDrug) && !hasResults },
              ].map((item, index) => (
                <div key={item.label} className="min-w-0">
                  <div className={`h-1 rounded-full ${item.done ? 'bg-emerald-500' : item.active ? 'bg-slate-700 dark:bg-white' : 'bg-slate-200 dark:bg-slate-800'}`} />
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${item.done ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : item.active ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-400 dark:bg-slate-900'}`}>
                      {item.done ? <Check className="h-3 w-3" /> : index + 1}
                    </span>
                    <span className={`truncate text-[11px] font-semibold sm:text-xs ${item.done || item.active ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-600'}`}>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </header>

          <div className="space-y-4 md:space-y-5">
            <div id="paciente" className="scroll-mt-20 md:scroll-mt-8">
              <PatientForm patient={patient} onChange={setPatient} />
            </div>

            {patientReady ? (
              <div id="farmaco" className="scroll-mt-20 md:scroll-mt-8">
                <DrugSelector
                  drugs={drugCatalog}
                  selectedDrug={selectedDrug}
                  onSelect={handleDrugSelect}
                  patientWeight={patient.weight}
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-4 text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                  <PawPrint className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Comece pelo paciente</p>
                  <p className="text-xs">Informe um peso válido para liberar a escolha do fármaco.</p>
                </div>
              </div>
            )}

            {selectedDrug && patientReady ? (
              <div id="preparo" className="scroll-mt-20 md:scroll-mt-8">
                <CalculationConfig
                  drug={selectedDrug}
                  species={patient.species}
                  dose={config.dose}
                  doseUnit={config.doseUnit}
                  presentationId={config.presentationId}
                  diluent={config.diluent}
                  totalVolume={config.totalVolume}
                  infusionRate={config.infusionRate}
                  regime={config.regime}
                  accessType={config.accessType}
                  pumpType={config.pumpType}
                  customPresentationConcentration={config.customPresentationConcentration}
                  customPresentationUnit={config.customPresentationUnit}
                  customVolumeEnabled={config.customVolumeEnabled}
                  usePreDilution={config.usePreDilution}
                  onChange={handleConfigChange}
                />
              </div>
              ) : (
                patientReady && (
                  <div className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-4 text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
                    <ChevronDown className="h-4 w-4 shrink-0" />
                    <p className="text-sm">Selecione o fármaco para liberar as opções de preparo.</p>
                  </div>
                )
              )}

            {canCalculate && (
              <div id="resultado" className="scroll-mt-20 md:scroll-mt-8">
                <ResultsDisplay input={input} result={result} safety={safety} />
              </div>
            )}
          </div>
        </div>
      )}

      {activePage === 'database' && (
        <DrugDatabase
          onUseInCalculator={(drug) => {
            handleDrugSelect(drug);
            setActivePage('calculator');
          }}
        />
      )}

      {activePage === 'favorites' && (
        <Favorites
          onLoadFavorite={(item) => {
            loadFavorite(item);
            setActivePage('calculator');
          }}
        />
      )}

      {activePage === 'protocols' && (
        <ProtocolsView
          patient={patient}
          onPatientChange={setPatient}
          onLoadDrug={(drugId) => {
            const drug = drugCatalog.find((item) => item.id === drugId);
            if (drug) {
              handleDrugSelect(drug);
              setActivePage('calculator');
            }
          }}
        />
      )}

      {activePage === 'history' && (
        <HistoryView
          onLoadHistory={(item) => {
            loadFavorite(item);
            setActivePage('calculator');
          }}
        />
      )}

      {activePage === 'settings' && <SettingsView />}
      {activePage === 'about' && <AboutView />}
    </MainLayout>
  );
}
