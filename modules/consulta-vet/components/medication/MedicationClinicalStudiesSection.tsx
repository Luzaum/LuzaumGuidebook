import React from 'react';
import { BookOpen, CheckCircle2, FlaskConical, ExternalLink } from 'lucide-react';
import type { MedicationClinicalStudyCommented } from '../../types/medication';

export function MedicationClinicalStudiesSection({
  studies,
}: {
  studies?: MedicationClinicalStudyCommented[];
}) {
  if (!studies || studies.length === 0) return null;

  return (
    <section id="estudos-clinicos" className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center gap-3 border-b border-border/70 pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <BookOpen className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Estudos Clínicos & Farmacológicos Comentados
          </h3>
          <p className="text-xs text-muted-foreground">
            Evidências de ensaios randomizados, farmacocinética cruzada e antinocicepção felina
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {studies.map((study, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-2xl border border-border/80 bg-muted/20 p-5 sm:p-6 space-y-4 transition hover:border-emerald-500/30 hover:bg-muted/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                  <FlaskConical className="h-3.5 w-3.5" />
                  {study.journal}
                </span>
                {study.referenceId && (
                  <a
                    href={`#${study.referenceId}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
                    title="Ver referência bibliográfica completa"
                  >
                    <span>Ref. #{study.referenceId.replace('ref-', '')}</span>
                  </a>
                )}
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-bold text-foreground leading-snug">
                  {study.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 font-medium">
                  {study.authorsYear}
                </p>
              </div>

              <div className="rounded-xl bg-background/60 p-3 text-xs border border-border/60 space-y-1.5">
                <div>
                  <span className="font-bold text-foreground/80">Delineamento: </span>
                  <span className="text-muted-foreground">{study.studyDesign}</span>
                </div>
                <div>
                  <span className="font-bold text-foreground/80">Amostragem: </span>
                  <span className="text-muted-foreground">{study.sampleSize}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Principais Achados Científicos
                </span>
                <p className="text-xs leading-relaxed text-foreground/90">
                  {study.mainFindings}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-border/60 rounded-xl bg-emerald-500/10 p-3.5 border border-emerald-500/20">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Conclusão Clínica Prática
              </span>
              <p className="text-xs font-semibold leading-relaxed text-emerald-950 dark:text-emerald-100">
                {study.clinicalTakeaway}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
