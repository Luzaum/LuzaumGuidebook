import React from 'react';
import { Activity, ArrowRight, BookOpen, ShieldAlert } from 'lucide-react';
import { Drug, DrugCategory } from '../../shared/types/drug';
import { cn } from '../lib/utils';

interface DrugReferenceCardProps {
  drug: Drug;
  categories: { id: DrugCategory | 'all'; label: string }[];
  onUseInCalculator?: (drug: Drug) => void;
  condensed?: boolean;
}

export const DrugReferenceCard: React.FC<DrugReferenceCardProps> = ({
  drug,
  categories,
  onUseInCalculator,
  condensed = false,
}) => (
  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900">
    <div className="relative overflow-hidden bg-slate-900 p-6 text-white md:p-8">
      <div className="absolute -right-8 -top-10 opacity-10 pointer-events-none">
        <BookOpen className="h-48 w-48" />
      </div>
      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{drug.namePt}</h2>
            <span className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
              {categories.find((category) => category.id === drug.category)?.label}
            </span>
          </div>
          <p className="text-sm text-slate-300">
            {drug.nameEn} • {drug.pharmacologicalClass}
          </p>
          {drug.synonyms.length > 0 && (
            <p className="mt-1 text-xs text-slate-400">Sinônimos: {drug.synonyms.join(', ')}</p>
          )}
        </div>

        {onUseInCalculator && (
          <button
            type="button"
            onClick={() => onUseInCalculator(drug)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-400"
          >
            Usar na Calculadora <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>

    <div className={cn('space-y-6 p-5 md:p-8', condensed && 'space-y-5 p-4 md:p-5')}>
      <section>
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          <BookOpen className="h-5 w-5 text-indigo-500 dark:text-indigo-400" /> Resumo Clínico
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{drug.clinicalSummary}</p>
        {drug.physiology && (
          <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">
            <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-800 dark:text-indigo-300">
              Fisiologia e racional
            </h4>
            <p className="text-sm leading-relaxed text-indigo-900 dark:text-indigo-100">{drug.physiology}</p>
          </div>
        )}

        {drug.doseGuides && drug.doseGuides.length > 0 && (
          <div className="mt-6">
            <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200">
              Doses indicadas
            </h4>
            <div className="grid gap-3 md:grid-cols-2">
              {drug.doseGuides.map((guide) => (
                <div key={guide.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                  <p className="font-bold text-slate-900 dark:text-white">{guide.title}</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{guide.doseText}</p>
                  {guide.indication && <p className="mt-1 text-xs font-medium text-slate-500">{guide.indication}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="space-y-5">
          <section>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200">
              Indicações
            </h4>
            <ul className="space-y-2">
              {drug.indications.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200">
              Contraindicações
            </h4>
            <ul className="space-y-2">
              {drug.contraindications.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-medium leading-relaxed text-rose-700 dark:text-rose-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {drug.advantages && drug.advantages.length > 0 && (
            <section>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                Vantagens
              </h4>
              <ul className="space-y-2">
                {drug.advantages.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-medium leading-relaxed text-emerald-700 dark:text-emerald-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {drug.limitations && drug.limitations.length > 0 && (
            <section>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
                Limitações
              </h4>
              <ul className="space-y-2">
                {drug.limitations.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-medium leading-relaxed text-amber-700 dark:text-amber-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700/50 dark:bg-slate-800/50">
            <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-200">
              <ShieldAlert className="h-4 w-4 text-amber-500 dark:text-amber-400" /> Segurança e preparo
            </h4>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Diluente preferencial</span>
                <span className="text-right font-semibold text-slate-800 dark:text-slate-200">
                  {drug.safetyMetadata.preferredDiluent}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Acesso central</span>
                <span
                  className={cn(
                    'text-right font-semibold',
                    drug.safetyMetadata.centralAccessRequired
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-slate-800 dark:text-slate-200',
                  )}
                >
                  {drug.safetyMetadata.centralAccessRequired
                    ? 'Obrigatório'
                    : drug.safetyMetadata.centralAccessPreferred
                      ? 'Preferível'
                      : 'Não obrigatório'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Linha exclusiva</span>
                <span
                  className={cn(
                    'text-right font-semibold',
                    drug.safetyMetadata.dedicatedLineRequired
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-slate-800 dark:text-slate-200',
                  )}
                >
                  {drug.safetyMetadata.dedicatedLineRequired ? 'Sim' : 'Não'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Fotossensível</span>
                <span
                  className={cn(
                    'text-right font-semibold',
                    drug.safetyMetadata.photosensitive
                      ? 'text-amber-700 dark:text-amber-400'
                      : 'text-slate-800 dark:text-slate-200',
                  )}
                >
                  {drug.safetyMetadata.photosensitive ? 'Sim' : 'Não'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500 dark:text-slate-400">Estabilidade</span>
                <span className="text-right font-semibold text-slate-800 dark:text-slate-200">
                  {drug.safetyMetadata.stabilityAfterDilution}
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950/40">
            <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-200">
              <Activity className="h-4 w-4 text-indigo-500 dark:text-indigo-400" /> Farmacologia e prática
            </h4>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div>
                <p className="mb-1 font-bold text-slate-700 dark:text-slate-300">Mecanismo de ação</p>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400">{drug.detailedInfo.mechanismOfAction}</p>
              </div>
              <div>
                <p className="mb-1 font-bold text-slate-700 dark:text-slate-300">Início e duração</p>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                  Início: {drug.detailedInfo.onsetOfAction} | Duração: {drug.detailedInfo.durationOfAction}
                </p>
              </div>
              <div>
                <p className="mb-1 font-bold text-slate-700 dark:text-slate-300">Metabolismo e excreção</p>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                  {drug.detailedInfo.metabolism} / {drug.detailedInfo.excretion}
                </p>
              </div>
              {drug.detailedInfo.speciesDifferences && (
                <div>
                  <p className="mb-1 font-bold text-slate-700 dark:text-slate-300">Diferenças entre espécies</p>
                  <p className="leading-relaxed text-slate-600 dark:text-slate-400">{drug.detailedInfo.speciesDifferences}</p>
                </div>
              )}
              {drug.detailedInfo.administrationGuidelines && (
                <div>
                  <p className="mb-1 font-bold text-slate-700 dark:text-slate-300">Como usar / Diretrizes de administração</p>
                  <p className="leading-relaxed text-slate-600 dark:text-slate-400">{drug.detailedInfo.administrationGuidelines}</p>
                </div>
              )}
              {drug.detailedInfo.maximumUsageTime && (
                <div>
                  <p className="mb-1 font-bold text-slate-700 dark:text-slate-300">Tempo máximo de uso</p>
                  <p className="leading-relaxed text-slate-600 dark:text-slate-400">{drug.detailedInfo.maximumUsageTime}</p>
                </div>
              )}
              {drug.detailedInfo.clinicalObservations && (
                <div>
                  <p className="mb-1 font-bold text-slate-700 dark:text-slate-300">Observações Clínicas Adicionais</p>
                  <p className="leading-relaxed text-slate-600 dark:text-slate-400">{drug.detailedInfo.clinicalObservations}</p>
                </div>
              )}
              {drug.detailedInfo.extraClinicalNotes && drug.detailedInfo.extraClinicalNotes.length > 0 && (
                <div className="mt-2 space-y-2 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-800 dark:text-indigo-300">Notas extras</p>
                  <ul className="space-y-2">
                    {drug.detailedInfo.extraClinicalNotes.map((note, index) => (
                      <li key={index} className="text-sm leading-relaxed text-indigo-900 dark:text-indigo-100 flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
);
