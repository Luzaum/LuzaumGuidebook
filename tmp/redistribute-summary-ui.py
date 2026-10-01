from pathlib import Path
p=Path('modules/consulta-vet/components/disease/DiseaseQuickSummaryPanel.tsx')
p.write_text('''import React from 'react';
import { CONCISE_DISEASE_SUMMARIES } from '../../data/conciseClinicalSummaries';
import { ConciseClinicalSummary } from '../shared/ConciseClinicalSummary';
import type { DiseaseQuickSummaryRich } from '../../types/disease';

/** Apenas a síntese. Fluxos, pilares e orientações pertencem às seções clínicas. */
export function DiseaseQuickSummaryPanel({ slug, quickSummary, data }: {
  slug: string;
  quickSummary?: string;
  data?: DiseaseQuickSummaryRich;
  plainLanguage?: { whatIsIt: string; keyPoints: string[] } | null;
}) {
  const summary = CONCISE_DISEASE_SUMMARIES[slug];
  if (summary) return <ConciseClinicalSummary summary={summary} />;
  const text = quickSummary || data?.lead || '';
  return <div className="space-y-3 text-sm leading-6 text-white/90">
    {text && text.trim().split(/\\s+/).length <= 110
      ? <p>{text}</p>
      : <p>Consulte a descrição e as orientações nas seções clínicas abaixo.</p>}
    <div className="flex flex-wrap gap-4 font-semibold">
      <a className="underline" href="#diagnosis">Diagnóstico</a>
      <a className="underline" href="#treatment">Tratamento</a>
    </div>
  </div>;
}
''',encoding='utf8')
p=Path('modules/consulta-vet/components/medication/MedicationQuickSummaryPanel.tsx')
p.write_text('''import React from 'react';
import { FileText } from 'lucide-react';
import { CONCISE_MEDICATION_SUMMARIES } from '../../data/conciseClinicalSummaries';
import { ConciseClinicalSummary } from '../shared/ConciseClinicalSummary';
import type { MedicationRecord } from '../../types/medication';

export function MedicationQuickSummaryPanel({ medication }: { medication: MedicationRecord }) {
  const summary = CONCISE_MEDICATION_SUMMARIES[medication.slug];
  const text = medication.plainLanguageSummary || '';
  return (
    <section id="resumo-rapido" className="scroll-mt-24 overflow-hidden rounded-[20px] border border-border/70 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/80 text-white shadow-xl md:rounded-3xl">
      <div className="space-y-4 p-4 md:p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold"><FileText aria-hidden="true" className="h-5 w-5 text-amber-300" />Resumo rápido</h2>
        {summary ? <ConciseClinicalSummary summary={summary} /> : (
          <p className="text-sm leading-6">{text && text.trim().split(/\\s+/).length <= 110
            ? text : 'Consulte as indicações, a farmacologia e os cuidados nas seções da ficha.'}</p>
        )}
      </div>
    </section>
  );
}
''',encoding='utf8')
p=Path('modules/consulta-vet/pages/DiseaseDetailPage.tsx');s=p.read_text(encoding='utf8')
s=s.replace("import { QuickDecisionStrip } from '../components/disease/QuickDecisionStrip';", "import { ClinicalFlowTimeline } from '../components/disease/ClinicalFlowTimeline';\nimport { redistributeDiseaseClinicalContent } from '../utils/diseaseReadingSections';")
s=s.replace('setDisease(found);','setDisease(found ? redistributeDiseaseClinicalContent(found) : null);')
s=s.replace("    const strip = disease.quickDecisionStrip?.filter((s) => String(s).trim()) || [];\n",'')
s=s.replace("      strip.length ? { id: 'quick-strip', label: 'Decisão rápida' } : null,\n",'')
s=s.replace('          <QuickDecisionStrip items={disease.quickDecisionStrip || []} />','')
start=s.index('                    {(disease.quickSummaryRich || CONCISE_DISEASE_SUMMARIES[disease.slug]) ? (')
end=s.index('\n                  </div>',start)
s=s[:start]+'''                    <DiseaseQuickSummaryPanel slug={disease.slug} quickSummary={disease.quickSummary} />'''+s[end:]
s=s.replace("import { CONCISE_DISEASE_SUMMARIES } from '../data/conciseClinicalSummaries';\n",'')
for key in ['diagnosis','treatment']:
 prop='diagnosticFlow' if key=='diagnosis' else 'treatmentFlow'
 marker=f'                <DiseaseSectionRenderer id="{key}" hideTitle title={{UI_TEXT.{key}}} data={{disease.{key}}} />'
 s=s.replace(marker,marker+f'''\n                {{disease.quickSummaryRich?.{prop} && <div className="mt-6"><ClinicalFlowTimeline flow={{disease.quickSummaryRich.{prop}}} variant="light" /></div>}}''')
# Remap previously stored navigation to a surviving section.
s=s.replace("document.getElementById(resumeState.sectionId || '')", "document.getElementById(resumeState.sectionId === 'quick-strip' ? 'treatment' : resumeState.sectionId || '')")
p.write_text(s,encoding='utf8')
