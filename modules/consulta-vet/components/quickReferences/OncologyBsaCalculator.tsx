import React, { useMemo, useState } from 'react';

import {
  Calculator,
  ChevronDown,
  Clock,
  Search,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { calculateOncologyVolumes, getOncologyPresentations } from '../../data/oncologyPresentations';
import './oncologyRegimens.css';
import {
  BSAVA_ONCOLOGY_DRUGS,
  calculateBsa,
  calculateOncologyDose,
  getOncologyDoses,
  OncologyRegimen,
  Species,
} from '../../data/quickReferencesData';

interface OncologyBsaCalculatorProps {
  currentWeightKg: number;
  species: Species;
  onWeightChange: (weight: number) => void;
  onSpeciesChange: (species: Species) => void;
}

import { OncologyHelpButton } from './OncologyHelpButton';
import { OncologySafetyGuide } from './OncologySafetyGuide';

const formatDose = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 3 });
const formatVolume = new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 5 });

const REGIMENS: Record<OncologyRegimen, string> = {
  conventional: 'Convencional',
  metronomic: 'Metronômica',
};

const PRESET_WEIGHTS: Record<Species, number[]> = {
  canine: [2, 5, 8, 12, 15, 20, 25, 30, 40],
  feline: [1.5, 2.5, 3.5, 4, 4.5, 5, 6, 7],
};

export function OncologyBsaCalculator({
  currentWeightKg,
  species,
  onWeightChange,
  onSpeciesChange,
}: OncologyBsaCalculatorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [regimen, setRegimen] = useState<OncologyRegimen | null>(null);
  const [expandedDrugId, setExpandedDrugId] = useState<string | null>(null);
  const [presentations, setPresentations] = useState<Record<string, { index: number; concentration: string }>>({});

  const bsa = useMemo(() => calculateBsa(currentWeightKg, species), [currentWeightKg, species]);

  const filteredDrugs = useMemo(() => {
    const normalize = (value: string) =>
      value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const q = normalize(searchTerm.trim());
    return BSAVA_ONCOLOGY_DRUGS
      .filter((drug) => drug.regimen === regimen)
      .filter((drug) => normalize([drug.name, drug.class, drug.route, drug.indication].join(' ')).includes(q))
      .map((drug) => ({ drug, doses: getOncologyDoses(drug, species, currentWeightKg) }))
      .filter(({ doses }) => doses.length > 0);
  }, [currentWeightKg, regimen, searchTerm, species]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!Number.isNaN(val) && val >= 0) {
      onWeightChange(Math.min(val, 120));
    } else if (e.target.value === '') {
      onWeightChange(0);
    }
  };

  return (
    <div className="space-y-6">
      <section aria-labelledby="oncology-bsa-heading" className="overflow-hidden rounded-2xl border border-border/80 bg-card">
        <div className="flex items-center gap-2.5 border-b border-border/70 px-5 py-4">
          <Calculator className="h-4 w-4 text-primary" aria-hidden="true" />
          <h2 id="oncology-bsa-heading" className="font-bold text-foreground">Superfície corporal</h2>
        </div>
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
          <div className="space-y-4 p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <fieldset className="min-w-0">
                <legend className="mb-2 text-sm font-medium text-foreground">Espécie</legend>
                <div className="grid grid-cols-2 rounded-xl bg-muted/60 p-1">
                  {(['canine', 'feline'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={species === option}
                      onClick={() => onSpeciesChange(option)}
                      className={cn(
                        'min-h-9 rounded-lg px-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                        species === option ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {option === 'canine' ? 'Cão' : 'Gato'}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="min-w-0">
                <label htmlFor="patient-weight-input" className="mb-2 block text-sm font-medium text-foreground">Peso (kg)</label>
                <input
                  id="patient-weight-input"
                  type="number"
                  step="0.1"
                  min="0.2"
                  max="120"
                  value={currentWeightKg || ''}
                  onChange={handleInputChange}
                  placeholder="Ex.: 12,5"
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-base font-semibold tabular-nums text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <details className="text-sm text-muted-foreground">
              <summary className="w-fit cursor-pointer rounded-sm font-medium hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Pesos predefinidos</summary>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRESET_WEIGHTS[species].map((weight) => (
                  <button
                    key={weight}
                    type="button"
                    aria-pressed={currentWeightKg === weight}
                    onClick={() => onWeightChange(weight)}
                    className="rounded-lg border border-border px-2.5 py-1.5 text-xs hover:bg-muted aria-pressed:border-primary aria-pressed:text-primary"
                  >
                    {formatDose.format(weight)} kg
                  </button>
                ))}
              </div>
            </details>
          </div>
          <div className="flex flex-col justify-center gap-2 border-t border-border/70 bg-primary/5 p-5 md:border-l md:border-t-0 md:px-7">
            <label htmlFor="oncology-bsa-result" className="text-sm font-semibold text-primary">Superfície corporal estimada</label>
            <output id="oncology-bsa-result" htmlFor="patient-weight-input" className="text-3xl font-bold tabular-nums tracking-tight text-foreground">
              {bsa > 0 ? `${bsa.toLocaleString('pt-BR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} m²` : '—'}
            </output>
            <p className="text-xs text-muted-foreground">
              {bsa > 0
                ? `${species === 'canine' ? '0,101' : '0,100'} × (${formatDose.format(currentWeightKg)} kg)²⁄³`
                : 'Informe o peso para calcular.'}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="oncology-regimens-heading" className="space-y-4">
        <h2 id="oncology-regimens-heading" className="text-lg font-bold text-foreground">Esquemas de quimioterapia</h2>
        {regimen && <p className="text-sm text-muted-foreground">Confira a concentração no rótulo. Para injetáveis, o volume exibido é o aspirado antes de eventual diluição para infusão.</p>}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-2" role="group" aria-label="Modalidade de quimioterapia">
            {(['conventional', 'metronomic'] as const).map((option) => (
              <div key={option} className={cn('oncology-regimen relative isolate flex items-center gap-2 overflow-hidden rounded-2xl border p-2', option === 'conventional' ? 'oncology-regimen--violet border-violet-500/30' : 'oncology-regimen--teal border-teal-500/30', regimen === option && 'ring-2 ring-current')}>
                <button
                  type="button"
                  aria-pressed={regimen === option}
                  onClick={() => {
                    setRegimen(option);
                    setExpandedDrugId(null);
                  }}
                  className="min-h-[4.5rem] flex-1 rounded-xl px-3 text-center text-base font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
                >
                  Quimioterapia {REGIMENS[option].toLocaleLowerCase('pt-BR')}
                </button>
                <OncologyHelpButton id={option} label={`Quimioterapia ${REGIMENS[option]}`} />
              </div>
            ))}
          </div>
          {regimen && (
            <div className="relative ml-auto w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                aria-label="Buscar quimioterápico"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar quimioterápico"
                className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}
        </div>

        {filteredDrugs.length > 0 && (
          <div className="grid gap-5">
            {filteredDrugs.map(({ drug, doses }) => {
              const isExpanded = expandedDrugId === drug.id;
              const detailsId = `oncology-details-${drug.id}`;
              const options = getOncologyPresentations(drug.id);
              const selection = presentations[drug.id] ?? { index: 0, concentration: '' };
              const presentation = options[selection.index];
              const concentration = presentation?.kind !== 'solid'
                ? presentation?.concentration ?? Number(selection.concentration.replace(',', '.'))
                : 0;

              return (
                <article key={drug.id} className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
                  <header className="border-b border-border/70 bg-gradient-to-r from-primary/5 to-transparent px-4 py-3 sm:px-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold tracking-tight text-foreground">{drug.name}</h3>
                        <OncologyHelpButton id={drug.id} label={drug.name} />
                        {drug.vesicant && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/10 px-1.5 py-0.5 text-xs font-semibold text-rose-700 dark:text-rose-400">
                            <ShieldAlert className="h-3 w-3" aria-hidden="true" />
                            Vesicante
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{drug.class}</p>
                    </div>
                  </header>

                  <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.46fr)]">
                    <ul className="min-w-0 divide-y divide-border/70 px-4 sm:px-5">
                      {doses.map((dose) => {
                        const rate = dose.rates.filter((value) => value !== undefined)
                          .map((value) => formatDose.format(value)).join('–');
                        const totals = calculateOncologyDose(dose, currentWeightKg, bsa);
                        const total = totals.map((value) => formatDose.format(value)).join('–');
                        const doseUnit = dose.basis.startsWith('UI') ? 'UI' : 'mg';
                        const route = dose.route ?? drug.route;
                        const oralOnly = /^(?:VO\b|oral\b)/i.test(route) && !/\bIV\b/.test(route);
                        const volumes = calculateOncologyVolumes(totals, doseUnit, presentation, concentration, oralOnly);
                        const volume = volumes.map((value) => formatVolume.format(value)).join('–');

                        return (
                          <li key={dose.schedule} className="grid gap-3 py-4 text-sm sm:grid-cols-[minmax(0,1fr)_minmax(9rem,0.7fr)] sm:items-start">
                            <div>
                              <p className="font-semibold tabular-nums text-foreground">{rate} {dose.basis}</p>
                              <p className="mt-1 text-sm text-foreground">{route}</p>
                              <p className="text-xs leading-relaxed text-muted-foreground">{dose.schedule}</p>
                            </div>
                            {total && (dose.basis !== 'mg' || volume) && (
                              <div className="rounded-xl bg-primary/5 px-3 py-2.5">
                                <span className="block text-xs text-muted-foreground">Dose calculada</span>
                                <span className="text-lg font-bold tabular-nums text-foreground">{total} {doseUnit}</span>
                                {volume && (
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    {presentation?.kind === 'injectable' ? 'Volume a aspirar (injetável)' : 'Volume oral'} · <strong className="text-foreground">{volume} mL</strong>
                                  </p>
                                )}
                                {oralOnly && presentation?.kind === 'injectable' && (
                                  <p className="mt-1 text-xs text-muted-foreground">Selecione uma apresentação oral para este esquema.</p>
                                )}
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>

                    <div className="min-w-0 space-y-3 border-t border-border/70 bg-muted/25 p-4 lg:border-l lg:border-t-0 lg:p-5">
                      <label className="block text-xs font-semibold text-foreground">
                        Apresentação e concentração
                        <select
                          aria-label={`Apresentação de ${drug.name}`}
                          value={selection.index}
                          onChange={(event) => setPresentations((previous) => ({
                            ...previous, [drug.id]: { index: Number(event.target.value), concentration: '' },
                          }))}
                          className="mt-1 min-h-10 w-full min-w-0 rounded-lg border border-border bg-background px-2 text-sm"
                        >
                          {options.map((option, index) => <option key={option.label} value={index}>{option.label}</option>)}
                        </select>
                      </label>
                      {presentation && presentation.kind !== 'solid' && presentation.concentration === undefined && (
                        <label className="block text-xs text-muted-foreground">
                          Concentração confirmada ({presentation.unit})
                          <input
                            type="text"
                            inputMode="decimal"
                            value={selection.concentration}
                            onChange={(event) => {
                              const value = event.target.value;
                              if (!/^\d*(?:[.,]\d*)?$/.test(value)) return;
                              setPresentations((previous) => ({ ...previous, [drug.id]: { ...selection, concentration: value } }));
                            }}
                            className="mt-1 min-h-9 w-full rounded-lg border border-border bg-background px-2 text-sm text-foreground"
                          />
                        </label>
                      )}
                      {presentation?.kind === 'solid' && <p className="text-xs text-muted-foreground">Dose em mg. Mantenha comprimidos e cápsulas íntegros.</p>}
                      {presentation?.source && <a href={presentation.source} target="_blank" rel="noreferrer" className="block text-xs text-primary underline">Fonte da apresentação</a>}
                    </div>
                  </div>

                  <footer className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-border/70 px-4 py-2 sm:px-5">
                    {drug.nadirDays && (
                      <p className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Clock className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                        Nadir e monitorização · {drug.nadirDays}
                      </p>
                    )}
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={detailsId}
                      aria-label={`${isExpanded ? 'Recolher' : 'Ver'} detalhes de ${drug.name}`}
                      onClick={() => setExpandedDrugId(isExpanded ? null : drug.id)}
                      className="inline-flex min-h-9 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      Detalhes do fármaco
                      <ChevronDown className={cn('h-4 w-4', isExpanded && 'rotate-180')} aria-hidden="true" />
                    </button>
                  </footer>
                  <div id={detailsId} hidden={!isExpanded} className="space-y-3 border-t border-border/70 p-4 sm:p-5 text-sm leading-relaxed text-muted-foreground">
                    {isExpanded && (
                      <>
                        <div className="flex items-center justify-between gap-3">
                          <p><strong className="text-foreground">Indicação</strong> · {drug.indication}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Informações importantes</h4>
                          <ul className="list-disc space-y-1 pl-5">
                            {drug.keyNotes.map((note) => <li key={note}>{note}</li>)}
                          </ul>
                        </div>
                        {drug.precautions.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-amber-800 dark:text-amber-300">Precauções/Alertas</h4>
                            <ul className="list-disc space-y-1 pl-5">
                              {drug.precautions.map((precaution) => <li key={precaution}>{precaution}</li>)}
                            </ul>
                          </div>
                        )}
                        <p className="text-xs">
                          {drug.sourceUrl ? (
                            <a href={drug.sourceUrl} target="_blank" rel="noreferrer" className="underline">{drug.source}</a>
                          ) : drug.source}
                        </p>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {filteredDrugs.length === 0 && (
          <p className="text-sm text-muted-foreground">
            {regimen ? 'Nenhum esquema encontrado para a espécie, modalidade e busca selecionadas.' : 'Selecione uma modalidade para consultar os esquemas.'}
          </p>
        )}
      </section>

      <OncologySafetyGuide />
    </div>
  );
}
