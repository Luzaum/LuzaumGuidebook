import { useState } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './ui/lib/utils';
import { Activity, Beaker, Settings } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('calculator');

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

  const onDrugSelect = (drug: any) => {
    handleDrugSelect(drug);
  };

  const onLoadFavorite = (item: any) => {
    loadFavorite(item);
  };

  return (
    <MainLayout activePage={activePage} onNavigate={setActivePage}>
      {activePage === 'calculator' && (
        <div className="mx-auto w-full max-w-[1680px] space-y-4">
          <div className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-4 py-4 shadow-sm dark:border-cyan-500/15 dark:from-cyan-950/30 dark:via-slate-900 dark:to-emerald-950/20 sm:px-5 md:hidden">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">CRIVET</p>
            <h1 className="mt-1 text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
              Calculadora de Infusão Veterinária
            </h1>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              Fluxo rápido para paciente, fármaco, preparo e conferência clínica.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)] lg:gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(420px,0.8fr)] xl:gap-8 items-start">
            
            {/* Left Column: All steps open and editable simultaneously */}
            <div className="space-y-6">
              
              {/* STEP 1: PATIENT */}
              <PatientForm patient={patient} onChange={setPatient} />

              {/* STEP 2: DRUG SELECTOR */}
              <DrugSelector
                drugs={drugCatalog}
                selectedDrug={selectedDrug}
                onSelect={onDrugSelect}
                patientWeight={patient.weight}
              />

              {/* STEP 3: INFUSION CONFIGURATION */}
              {selectedDrug ? (
                patient.weight > 0 ? (
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
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-center py-10">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-500 dark:bg-amber-950/20 dark:text-amber-400">
                      <Activity className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-700 dark:text-white mt-3">3. Configuração da Infusão</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto font-medium">
                      Defina um peso maior que zero no Passo 1 para liberar as configurações de infusão de <strong>{selectedDrug.namePt}</strong>.
                    </p>
                  </div>
                )
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-center py-10">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                    <Settings className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-700 dark:text-white mt-3">3. Configuração da Infusão</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto font-medium">
                    Selecione um fármaco no Passo 2 para liberar as configurações de infusão.
                  </p>
                </div>
              )}

              {/* Mobile-only Results display at the bottom of the list */}
              {selectedDrug && patient.weight > 0 && (
                <div className="lg:hidden mt-4">
                  <ResultsDisplay input={input} result={result} safety={safety} />
                </div>
              )}

            </div>

            {/* Right Column: Sticky Results display (Desktop only) */}
            <div className="hidden lg:block sticky top-6">
              {selectedDrug && patient.weight > 0 ? (
                <ResultsDisplay input={input} result={result} safety={safety} />
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900 min-h-[400px]">
                  <img src="/apps/CRIVET.png" className="w-24 h-24 rounded-full opacity-20 mb-4 object-contain grayscale" />
                  <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Nenhum cálculo ativo</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                    Preencha o peso do paciente e selecione um fármaco para visualizar os resultados e a memória de cálculo.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {activePage === 'database' && (
        <DrugDatabase
          onUseInCalculator={(drug) => {
            onDrugSelect(drug);
            setActivePage('calculator');
          }}
        />
      )}

      {activePage === 'favorites' && (
        <Favorites
          onLoadFavorite={(item) => {
            onLoadFavorite(item);
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
              onDrugSelect(drug);
              setActivePage('calculator');
            }
          }}
        />
      )}

      {activePage === 'history' && (
        <HistoryView
          onLoadHistory={(item) => {
            onLoadFavorite(item);
            setActivePage('calculator');
          }}
        />
      )}

      {activePage === 'settings' && <SettingsView />}
      {activePage === 'about' && <AboutView />}
    </MainLayout>
  );
}
