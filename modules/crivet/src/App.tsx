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
import { PageHeader } from './ui/components/PageHeader';
import { Calculator, Beaker } from 'lucide-react';

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

  const canCalculate = Boolean(selectedDrug && patient.weight > 0);
  const hasResults = Boolean(input && result && safety);

  return (
    <MainLayout activePage={activePage} onNavigate={setActivePage}>
      {activePage === 'calculator' && (
        <div className="mx-auto w-full max-w-[1600px]">
          <PageHeader
            icon={Calculator}
            title="Calculadora"
            description="Paciente → fármaco → preparo → prescrição"
            className="hidden md:block"
          />

          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-6">
            <div className="space-y-4">
              <PatientForm patient={patient} onChange={setPatient} />

              <DrugSelector
                drugs={drugCatalog}
                selectedDrug={selectedDrug}
                onSelect={handleDrugSelect}
                patientWeight={patient.weight}
              />

              {selectedDrug && patient.weight > 0 ? (
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
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
                  <Beaker className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />
                  <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                    {!selectedDrug
                      ? 'Selecione um fármaco para configurar a infusão.'
                      : 'Informe o peso do paciente para continuar.'}
                  </p>
                </div>
              )}

              {canCalculate && (
                <div className="lg:hidden">
                  <ResultsDisplay input={input} result={result} safety={safety} />
                </div>
              )}
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-6">
                {hasResults ? (
                  <ResultsDisplay input={input} result={result} safety={safety} />
                ) : (
                  <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
                    <Calculator className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                    <h3 className="mt-4 text-base font-semibold text-slate-700 dark:text-slate-300">
                      Resultados aparecem aqui
                    </h3>
                    <p className="mt-2 max-w-xs text-sm text-slate-500 dark:text-slate-400">
                      Preencha paciente, fármaco e configuração para ver a prescrição e a memória de cálculo.
                    </p>
                  </div>
                )}
              </div>
            </div>
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
