import React, { useMemo, useState } from 'react';
import { AlertTriangle, BookOpenCheck, ShieldCheck } from 'lucide-react';
import type { DiseaseRecord } from '../../types/disease';
import type { MedicationRecord } from '../../types/medication';
import { getSimplifiedMedicationDefinition } from '../../utils/simplifiedMedicationDefinitions';

type SummaryTab = 'overview' | 'use' | 'safety';

export function MedicationQuickSummaryPanel({
  medication,
  relatedDiseases,
}: {
  medication: MedicationRecord;
  relatedDiseases: DiseaseRecord[];
}) {
  const [activeTab, setActiveTab] = useState<SummaryTab>('overview');
  const simplified = useMemo(() => getSimplifiedMedicationDefinition(medication.slug), [medication.slug]);
  const tabs = [
    { id: 'overview' as const, label: 'Em palavras simples', icon: BookOpenCheck },
    { id: 'use' as const, label: 'Onde se encaixa', icon: ShieldCheck },
    { id: 'safety' as const, label: 'Principal cuidado', icon: AlertTriangle },
  ];

  return (
    <section id="quick-summary" className="scroll-mt-24 overflow-hidden rounded-[32px] border border-amber-500/20 bg-gradient-to-br from-amber-950 via-amber-900 to-orange-800 text-white shadow-sm">
      <div className="px-6 py-7 md:px-9 md:py-9">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-amber-100/80">Resumo rápido</p>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={
                activeTab === id
                  ? 'inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-amber-950 shadow-sm'
                  : 'inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:bg-white/15'
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-[24px] border border-white/15 bg-white/10 p-5 backdrop-blur-sm md:p-7">
          {activeTab === 'overview' ? (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-amber-200">O que ele faz?</h2>
              <p className="mt-4 max-w-[90ch] text-lg font-semibold leading-8 text-white">
                {medication.plainLanguageSummary || simplified?.whatItDoes || `${medication.title} pertence à classe ${medication.pharmacologicClass}. A explicação técnica do mecanismo está detalhada nesta monografia.`}
              </p>
              {simplified?.keyPoints?.length ? (
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {simplified.keyPoints.map((point) => (
                    <p key={point} className="rounded-2xl bg-black/15 px-4 py-3 text-sm leading-6 text-amber-50/90">{point}</p>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {activeTab === 'use' ? (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-amber-200">Usos cadastrados</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {medication.indications.slice(0, 6).map((indication) => (
                  <p key={indication} className="rounded-2xl bg-black/15 px-4 py-3 text-sm leading-6 text-amber-50/90">{indication}</p>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === 'safety' ? (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-amber-200">Antes de prescrever</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {[...medication.contraindications.slice(0, 2), ...medication.cautions.slice(0, 2)].map((item) => (
                  <p key={item} className="flex gap-3 rounded-2xl bg-black/15 px-4 py-3 text-sm leading-6 text-amber-50/90">
                    <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-amber-200" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
