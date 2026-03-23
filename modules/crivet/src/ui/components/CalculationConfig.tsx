import React, { useMemo, useState } from 'react';
import { AccessType, Diluent, DoseUnit, Drug, PumpType, RegimeType } from '../../shared/types/drug';
import { Species } from '../../shared/types/patient';
import { Activity, BadgeCheck, Droplets, Gauge, Settings2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { InfoModal } from './InfoModal';
import { TipButton } from './TipButton';
import {
  CUSTOM_PRESENTATION_ID,
  formatAccessLabel,
  formatRegimeLabel,
  getAccessSections,
  getCurrentDoseHint,
  getDiluentOptions,
  getDiluentSections,
  getDoseGuides,
  getInfusionSections,
  getPresentationOptions,
  getSupportedRegimes,
  SupportedRegime,
} from '../lib/drugContent';

interface ConfigProps {
  drug: Drug;
  species: Species;
  dose: number;
  doseUnit: DoseUnit;
  presentationId: string;
  diluent: Diluent;
  totalVolume: number;
  infusionRate: number;
  regime: RegimeType;
  accessType: AccessType;
  pumpType: PumpType;
  customPresentationConcentration: number;
  customPresentationUnit: 'mg/mL' | 'mcg/mL' | 'ng/mL' | 'U/mL';
  customVolumeEnabled: boolean;
  usePreDilution: boolean;
  onChange: (field: string, value: any) => void;
}

type TipModalKey = 'dose' | 'diluent' | 'access' | 'infusion' | null;

const bags = [100, 250, 500, 1000];
const syringes = [5, 10, 20, 60];

export const CalculationConfig: React.FC<ConfigProps> = ({
  drug,
  species,
  dose,
  doseUnit,
  presentationId,
  diluent,
  totalVolume,
  infusionRate,
  regime,
  accessType,
  pumpType,
  customPresentationConcentration,
  customPresentationUnit,
  customVolumeEnabled,
  usePreDilution,
  onChange,
}) => {
  const [activeModal, setActiveModal] = useState<TipModalKey>(null);

  const supportedRegimes = getSupportedRegimes(drug);
  const activeRegime = (
    supportedRegimes.includes(regime as SupportedRegime) ? regime : supportedRegimes[0]
  ) as SupportedRegime;
  const currentDoseHint = getCurrentDoseHint(drug, species, activeRegime);
  const presentationOptions = getPresentationOptions(drug);
  const availableDiluents = useMemo(
    () => Array.from(new Set<Diluent>([...getDiluentOptions(drug), 'Nenhum'])),
    [drug],
  );
  const selectedPresentation = presentationOptions.find((item) => item.id === presentationId);
  const doseGuides = getDoseGuides(drug).filter(
    (guide) =>
      guide.regimen === activeRegime &&
      (!guide.species || guide.species.length === 0 || guide.species.includes(species)),
  );
  const diluentSections = getDiluentSections(drug);
  const accessSections = getAccessSections(drug);
  const infusionSections = getInfusionSections(drug, activeRegime);

  const renderSections = (
    sections: { title: string; description?: string; items?: string[] }[],
    emptyMessage: string,
  ) => {
    if (sections.length === 0) {
      return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
          {emptyMessage}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50"
          >
            <h4 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">{section.title}</h4>
            {section.description && (
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                {section.description}
              </p>
            )}
            {section.items && section.items.length > 0 && (
              <div className="mt-3 space-y-2">
                {section.items.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const chipButtonClass =
    'min-h-10 rounded-xl border-2 px-3.5 py-2 text-sm font-bold transition-all';

  return (
    <>
      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900 md:p-6 xl:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
            <Settings2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">3. Configuracao da infusao</h2>
            <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              Ajuste dose, estoque, preparo e administracao em uma malha mais ampla.
            </p>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(340px,0.9fr)] 2xl:grid-cols-[minmax(0,1.38fr)_minmax(360px,0.85fr)]">
          <div className="space-y-5">
            <section className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/35">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Activity className="h-4 w-4 text-slate-400 dark:text-slate-500" /> Regime terapêutico <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {supportedRegimes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onChange('regime', item)}
                    className={cn(
                      'min-h-10 min-w-[132px] rounded-xl border-2 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] transition-all',
                      activeRegime === item
                        ? 'border-amber-500 bg-amber-50/70 text-amber-700 shadow-sm dark:border-amber-500/50 dark:bg-amber-500/20 dark:text-amber-300'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800',
                    )}
                  >
                    {formatRegimeLabel(item)}
                  </button>
                ))}
              </div>
            </section>

            <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <section className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/35">
                <div className="flex items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <BadgeCheck className="h-4 w-4 text-slate-400 dark:text-slate-500" /> Dose alvo <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <TipButton compact label="Guia" onClick={() => setActiveModal('dose')} />
                </div>
                <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_170px]">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={dose === 0 ? '' : dose}
                    onChange={(event) => {
                      const val = event.target.value.replace(',', '.');
                      onChange('dose', val === '' ? 0 : parseFloat(val));
                    }}
                    className={cn(
                      'rounded-xl border-2 px-3 py-2.5 text-base font-bold transition-all focus:outline-none focus:ring-4',
                      dose <= 0
                        ? 'border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/50 dark:bg-red-500/10 dark:text-red-100 dark:focus:border-red-500 dark:focus:ring-red-500/20'
                        : 'border-slate-200 bg-white text-slate-800 focus:border-amber-500 focus:ring-amber-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500/20',
                    )}
                    placeholder="Ex: 0.05"
                  />
                  <select
                    value={doseUnit}
                    onChange={(event) => onChange('doseUnit', event.target.value as DoseUnit)}
                    className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-800 transition-all focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                  >
                    {(['bolus', 'bolus_maintenance'].includes(regime)
                      ? ['mcg/kg', 'mg/kg', 'mL/kg']
                      : drug.allowedUnits.filter(u => !['mcg/kg', 'mg/kg', 'mL/kg', 'U/kg', 'mcg/m2'].includes(u))
                    ).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>

                {currentDoseHint && (
                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-300">
                        <BadgeCheck className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-700 dark:text-indigo-300">
                          Dose indicada
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-relaxed text-indigo-950 dark:text-indigo-100">
                          {currentDoseHint.title}: {currentDoseHint.doseText}
                        </p>
                        {currentDoseHint.rationale && (
                          <p className="mt-2 text-sm leading-relaxed text-indigo-800/90 dark:text-indigo-200/80">
                            {currentDoseHint.rationale}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {doseGuides.length > 1 && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                      Outras faixas cadastradas
                    </p>
                    <div className="mt-2 space-y-2">
                      {doseGuides.slice(0, 3).map((guide) => (
                        <div key={guide.id} className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                          <span className="font-semibold text-slate-900 dark:text-white">{guide.title}:</span> {guide.doseText}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {dose <= 0 && <p className="text-xs font-medium text-red-500 dark:text-red-400">A dose deve ser maior que zero.</p>}
              </section>

              <section className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/35">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <Droplets className="h-4 w-4 text-slate-400 dark:text-slate-500" /> Apresentação <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <select
                  value={presentationId}
                  onChange={(event) => onChange('presentationId', event.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
                >
                  {presentationOptions.map((presentation) => (
                    <option key={presentation.id} value={presentation.id}>
                      {presentation.description}
                    </option>
                  ))}
                </select>

                {selectedPresentation && selectedPresentation.id !== CUSTOM_PRESENTATION_ID && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-3.5 text-sm font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    Estoque cadastrado: {selectedPresentation.concentration} {selectedPresentation.concentrationUnit}
                  </div>
                )}

                {presentationId === CUSTOM_PRESENTATION_ID && (
                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">
                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_160px]">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={customPresentationConcentration === 0 ? '' : customPresentationConcentration}
                        onChange={(event) => {
                          const val = event.target.value.replace(',', '.');
                          onChange(
                            'customPresentationConcentration',
                            val === '' ? 0 : parseFloat(val),
                          );
                        }}
                        className={cn(
                          'rounded-xl border-2 px-3 py-2.5 text-base font-bold transition-all focus:outline-none focus:ring-4',
                          customPresentationConcentration <= 0
                            ? 'border-red-300 bg-white text-red-900 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/50 dark:bg-slate-900 dark:text-red-100 dark:focus:border-red-500 dark:focus:ring-red-500/20'
                            : 'border-slate-200 bg-white text-slate-800 focus:border-indigo-500 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20',
                        )}
                        placeholder="Concentração"
                      />
                      <select
                        value={customPresentationUnit}
                        onChange={(event) => onChange('customPresentationUnit', event.target.value)}
                        className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-800 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
                      >
                        {['mg/mL', 'mcg/mL', 'U/mL', 'mU/mL'].map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="mt-3 text-xs font-medium leading-relaxed text-indigo-800/80 dark:text-indigo-200/80">
                      O cálculo passa a usar exatamente esse estoque no preparo e no resumo final.
                    </p>
                  </div>
                )}
                
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                  <label className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={usePreDilution}
                      onChange={(event) => onChange('usePreDilution', event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Pré-diluição 1:10 (Solução de Trabalho)
                  </label>
                  <p className="mt-1.5 ml-7 text-xs text-slate-500 dark:text-slate-400">
                    Gera um passo inicial de diluição para 10x o volume da ampola (útil para volumes a aspirar &lt; 0.1 mL).
                  </p>
                </div>
              </section>
            </div>

            <section className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/35">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Droplets className="h-4 w-4 text-slate-400 dark:text-slate-500" /> Recipiente de preparo
              </label>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Bolsas
                </span>
                <div className="flex flex-wrap gap-2">
                  {bags.map((value) => (
                    <button
                      key={`bag-${value}`}
                      type="button"
                      onClick={() => {
                        onChange('customVolumeEnabled', false);
                        onChange('totalVolume', value);
                      }}
                      className={cn(
                        chipButtonClass,
                        totalVolume === value && !customVolumeEnabled
                          ? 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-amber-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400',
                      )}
                    >
                      {value} mL
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Seringas
                </span>
                <div className="flex flex-wrap gap-2">
                  {syringes.map((value) => (
                    <button
                      key={`syringe-${value}`}
                      type="button"
                      onClick={() => {
                        onChange('customVolumeEnabled', false);
                        onChange('totalVolume', value);
                      }}
                      className={cn(
                        chipButtonClass,
                        totalVolume === value && !customVolumeEnabled
                          ? 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-amber-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400',
                      )}
                    >
                      {value} mL
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">
                <label className="flex min-h-10 items-center gap-3 text-sm font-semibold text-indigo-900 dark:text-indigo-100">
                  <input
                    type="checkbox"
                    checked={customVolumeEnabled}
                    onChange={(event) => onChange('customVolumeEnabled', event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Usar volume personalizado
                </label>
                <input
                  type="number"
                  min="1"
                  step="any"
                  disabled={!customVolumeEnabled}
                  value={customVolumeEnabled && totalVolume > 0 ? totalVolume : ''}
                  onChange={(event) => {
                    const val = event.target.value.replace(',', '.');
                    onChange('totalVolume', val === '' ? 0 : parseFloat(val));
                  }}
                  className={cn(
                    'mt-3 w-full rounded-xl border-2 px-3 py-2.5 text-base font-bold transition-all focus:outline-none focus:ring-4',
                    !customVolumeEnabled
                      ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500'
                      : totalVolume <= 0
                        ? 'border-red-300 bg-white text-red-900 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/50 dark:bg-slate-900 dark:text-red-100 dark:focus:border-red-500 dark:focus:ring-red-500/20'
                        : 'border-slate-200 bg-white text-slate-800 focus:border-indigo-500 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20',
                  )}
                  placeholder="Ex: 75 mL"
                />
              </div>

              {totalVolume <= 0 && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">O volume total deve ser maior que zero.</p>
              )}
            </section>
          </div>

          <div className="space-y-5">
            <section className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/35">
              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <Droplets className="h-4 w-4 text-slate-400 dark:text-slate-500" /> Diluente <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <TipButton compact label="Guia" onClick={() => setActiveModal('diluent')} />
              </div>
              <select
                value={diluent}
                onChange={(event) => onChange('diluent', event.target.value as Diluent)}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 transition-all focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
              >
                {availableDiluents.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 text-sm font-medium leading-relaxed text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                Diluente preferencial: {drug.safetyMetadata.preferredDiluent}
              </div>
            </section>

            <section className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/35">
              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <Activity className="h-4 w-4 text-slate-400 dark:text-slate-500" /> Via de acesso
                </label>
                <TipButton compact label="Guia" onClick={() => setActiveModal('access')} />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => onChange('accessType', 'peripheral')}
                  className={cn(
                    chipButtonClass,
                    accessType === 'peripheral'
                      ? 'border-slate-800 bg-slate-800 text-white shadow-sm dark:border-slate-600 dark:bg-slate-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800',
                  )}
                >
                  Periférico
                </button>
                <button
                  type="button"
                  onClick={() => onChange('accessType', 'central')}
                  className={cn(
                    chipButtonClass,
                    accessType === 'central'
                      ? 'border-slate-800 bg-slate-800 text-white shadow-sm dark:border-slate-600 dark:bg-slate-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800',
                  )}
                >
                  Central
                </button>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{formatAccessLabel(accessType)}</p>
            </section>

            <section className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/35">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Gauge className="h-4 w-4 text-slate-400 dark:text-slate-500" /> Tipo de bomba
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => onChange('pumpType', 'syringe')}
                  className={cn(
                    chipButtonClass,
                    pumpType === 'syringe'
                      ? 'border-slate-800 bg-slate-800 text-white shadow-sm dark:border-slate-600 dark:bg-slate-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800',
                  )}
                >
                  Seringa
                </button>
                <button
                  type="button"
                  onClick={() => onChange('pumpType', 'volumetric')}
                  className={cn(
                    chipButtonClass,
                    pumpType === 'volumetric'
                      ? 'border-slate-800 bg-slate-800 text-white shadow-sm dark:border-slate-600 dark:bg-slate-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800',
                  )}
                >
                  Infusão
                </button>
              </div>
            </section>

            {activeRegime !== 'bolus' && (
              <section className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/35">
                <div className="flex items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <Gauge className="h-4 w-4 text-slate-400 dark:text-slate-500" /> Taxa de infusão na bomba (mL/h)
                  </label>
                  <TipButton compact label="Guia" onClick={() => setActiveModal('infusion')} />
                </div>
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={infusionRate === 0 ? '' : infusionRate}
                  onChange={(event) => {
                    const val = event.target.value.replace(',', '.');
                    onChange('infusionRate', val === '' ? 0 : parseFloat(val));
                  }}
                  className={cn(
                    'w-full rounded-xl border-2 px-3 py-2.5 text-base font-bold transition-all focus:outline-none focus:ring-4',
                    infusionRate <= 0
                      ? 'border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/50 dark:bg-red-500/10 dark:text-red-100 dark:focus:border-red-500 dark:focus:ring-red-500/20'
                      : 'border-slate-200 bg-white text-slate-800 focus:border-amber-500 focus:ring-amber-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500/20',
                  )}
                />
                <div className="rounded-2xl border border-slate-200 bg-white p-3.5 text-sm font-medium leading-relaxed text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  A taxa da bomba define a concentração final necessária no preparo e quanto tempo a solução vai durar.
                </div>
                {infusionRate <= 0 && (
                  <p className="text-xs font-medium text-red-500 dark:text-red-400">
                    A taxa de infusão deve ser maior que zero.
                  </p>
                )}
              </section>
            )}
          </div>
        </div>
      </div>

      <InfoModal
        open={activeModal === 'dose'}
        onClose={() => setActiveModal(null)}
        title={`Doses indicadas • ${drug.namePt}`}
        subtitle="Faixas clínicas disponíveis para o regime selecionado"
        icon={<BadgeCheck className="h-5 w-5" />}
      >
        {renderSections(
          doseGuides.map((guide) => ({
            title: guide.title,
            description: guide.indication ? `${guide.indication}: ${guide.doseText}` : guide.doseText,
            items: guide.rationale ? [guide.rationale] : undefined,
          })),
          'Nenhuma dose orientativa cadastrada para este regime.',
        )}
      </InfoModal>

      <InfoModal
        open={activeModal === 'diluent'}
        onClose={() => setActiveModal(null)}
        title={`Diluente • ${drug.namePt}`}
        subtitle="Compatibilidade, estabilidade e raciocinio de preparo"
        icon={<Droplets className="h-5 w-5" />}
      >
        {renderSections(diluentSections, 'Nenhuma orientacao de diluente cadastrada para este farmaco.')}
      </InfoModal>

      <InfoModal
        open={activeModal === 'access'}
        onClose={() => setActiveModal(null)}
        title={`Via de acesso • ${drug.namePt}`}
        subtitle="Orientacao clinica para via central, periferica e linha dedicada"
        icon={<Activity className="h-5 w-5" />}
      >
        {renderSections(accessSections, 'Nenhuma orientacao de acesso cadastrada para este farmaco.')}
      </InfoModal>

      <InfoModal
        open={activeModal === 'infusion'}
        onClose={() => setActiveModal(null)}
        title={`Taxa de infusão • ${drug.namePt}`}
        subtitle="Faixas de administracao, monitorização e logica operacional"
        icon={<Gauge className="h-5 w-5" />}
      >
        {renderSections(infusionSections, 'Nenhuma orientacao de infusao cadastrada para este farmaco.')}
      </InfoModal>
    </>
  );
};
