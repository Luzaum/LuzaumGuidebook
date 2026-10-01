from pathlib import Path
p=Path('modules/consulta-vet/components/medication/MedicationQuickSummaryPanel.tsx')
s=p.read_text(encoding='utf8')
s=s.replace("import React, { useMemo } from 'react';", "import React, { useMemo } from 'react';\nimport { CONCISE_MEDICATION_SUMMARIES } from '../../data/conciseClinicalSummaries';\nimport { ConciseClinicalSummary } from '../shared/ConciseClinicalSummary';")
s=s.replace('export function MedicationQuickSummaryPanel({','function MedicationExpandedOverview({',1)
s=s.replace('id="resumo-rapido"','id="visao-geral-complementar"',1)
s=s.replace('Resumo Clínico Executivo','Visão geral complementar',1)
s+='''

export function MedicationQuickSummaryPanel({ medication }: { medication: MedicationRecord }) {
  const summary = CONCISE_MEDICATION_SUMMARIES[medication.slug];
  if (!summary) return <MedicationExpandedOverview medication={medication} />;
  return (
    <section id="resumo-rapido" className="scroll-mt-24 overflow-hidden rounded-[20px] border border-border/70 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/80 text-white shadow-xl md:rounded-3xl">
      <div className="space-y-4 p-4 md:p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold"><FileText aria-hidden="true" className="h-5 w-5 text-amber-300" />Resumo rápido</h2>
        <ConciseClinicalSummary summary={summary} />
        <details className="border-t border-white/15 pt-3">
          <summary className="w-fit cursor-pointer rounded text-sm font-semibold text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Ver indicações, cuidados e explicações complementares</summary>
          <div className="mt-4"><MedicationExpandedOverview medication={medication} /></div>
        </details>
      </div>
    </section>
  );
}
'''
# Preserve anchor also for unpublished records with no authored summary.
s=s.replace('if (!summary) return <MedicationExpandedOverview medication={medication} />;', 'if (!summary) return <div id="resumo-rapido" className="scroll-mt-24"><MedicationExpandedOverview medication={medication} /></div>;')
p.write_text(s,encoding='utf8')
p=Path('modules/consulta-vet/components/disease/DiseaseQuickSummaryPanel.tsx');s=p.read_text(encoding='utf8')
s=s.replace("import React, { useMemo, useState } from 'react';", "import React, { useMemo, useState } from 'react';\nimport { CONCISE_DISEASE_SUMMARIES } from '../../data/conciseClinicalSummaries';\nimport { ConciseClinicalSummary } from '../shared/ConciseClinicalSummary';")
s=s.replace("  const simpleDef =", "  const conciseSummary = CONCISE_DISEASE_SUMMARIES[slug];\n  const simpleDef =",1)
s=s.replace("{activeTab === 'overview' && (", "{activeTab === 'overview' && conciseSummary && <ConciseClinicalSummary summary={conciseSummary} />}\n        {activeTab === 'overview' && !conciseSummary && (",1)
p.write_text(s,encoding='utf8')
p=Path('modules/consulta-vet/pages/DiseaseDetailPage.tsx');s=p.read_text(encoding='utf8')
s="import { CONCISE_DISEASE_SUMMARIES } from '../data/conciseClinicalSummaries';\n"+s
s=s.replace('{disease.quickSummaryRich ? (','{(disease.quickSummaryRich || CONCISE_DISEASE_SUMMARIES[disease.slug]) ? (',1)
s=s.replace('data={disease.quickSummaryRich}', 'data={disease.quickSummaryRich ?? { lead: disease.quickSummary }}',1)
p.write_text(s,encoding='utf8')
p=Path('modules/consulta-vet/data/conciseClinicalSummaries.ts');s=p.read_text(encoding='utf8').replace("'ver capítulo de puerpério'", "'166–168'");p.write_text(s,encoding='utf8')
