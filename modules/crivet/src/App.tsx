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

  return (
    <MainLayout activePage={activePage} onNavigate={setActivePage}>
      {activePage === 'calculator' && (
        <div className="mx-auto w-full max-w-[1680px] space-y-3 sm:space-y-4 xl:space-y-5 2xl:space-y-6">
          <div className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-4 py-4 shadow-sm dark:border-cyan-500/15 dark:from-cyan-950/30 dark:via-slate-900 dark:to-emerald-950/20 sm:px-5 md:hidden">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">CRIVET</p>
            <h1 className="mt-1 text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
              Calculadora de Infusao Veterinaria
            </h1>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              Fluxo rapido para paciente, farmaco, preparo e conferencia clinica.
            </p>
          </div>

          <div className="grid gap-3 sm:gap-4 xl:grid-cols-[minmax(340px,0.78fr)_minmax(0,1.22fr)] 2xl:grid-cols-[minmax(360px,0.8fr)_minmax(0,1.2fr)]">
            <PatientForm patient={patient} onChange={setPatient} />
            <DrugSelector drugs={drugCatalog} selectedDrug={selectedDrug} onSelect={handleDrugSelect} />
          </div>

          <AnimatePresence mode="wait">
            {selectedDrug && (
              <motion.div
                key="config"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 sm:space-y-4 xl:space-y-5 2xl:space-y-6"
              >
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

                <ResultsDisplay input={input} result={result} safety={safety} />
              </motion.div>
            )}
          </AnimatePresence>
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
