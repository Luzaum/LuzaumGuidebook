import { useId, useState } from 'react';
import { Activity, BookOpen, Calculator, ChevronRight, Droplets, List, Pill, ShieldCheck, Syringe } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { BSAVA_SAFETY_GUIDELINES } from '../../data/quickReferencesData';

type Guideline = (typeof BSAVA_SAFETY_GUIDELINES)[number];

const topics = {
  dose: { label: 'Base da dose', icon: Calculator, category: 'Cálculo' },
  vesicants: { label: 'Punção de vesicantes', icon: Syringe, category: 'Administração' },
  tablets: { label: 'Comprimidos citotóxicos', icon: Pill, category: 'Manuseio' },
  urinary: { label: 'Sinais urinários', icon: Droplets, category: 'Monitorização' },
  nadir: { label: 'Nadir e hemograma', icon: Activity, category: 'Monitorização' },
} satisfies Record<Guideline['id'], { label: string; icon: typeof Calculator; category: string }>;

function GuidelineContent({ guideline }: { guideline: Guideline }) {
  const { category, icon: Icon } = topics[guideline.id];

  return (
    <article className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-primary">
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        {category}
      </div>
      <h4 className="text-lg font-bold leading-snug text-foreground sm:text-xl">{guideline.title}</h4>
      <p className="max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
        {guideline.summary}
      </p>
    </article>
  );
}

export function OncologySafetyGuide() {
  const headingId = useId();
  const contentId = useId();
  const [selected, setSelected] = useState<Guideline>(BSAVA_SAFETY_GUIDELINES[0]);
  const [showAll, setShowAll] = useState(false);

  return (
    <section aria-labelledby={headingId} className="overflow-hidden rounded-3xl border border-border/80 bg-card/90">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-border/70 p-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 id={headingId} className="text-base font-bold text-foreground">Regras de Ouro &amp; Biossegurança BSAVA</h3>
        </div>
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          aria-controls={contentId}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-3 text-xs font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {showAll ? <BookOpen className="h-4 w-4" aria-hidden="true" /> : <List className="h-4 w-4" aria-hidden="true" />}
          {showAll ? 'Voltar aos tópicos' : 'Ler todas as orientações'}
        </button>
      </div>

      <div id={contentId}>
        {showAll ? (
          <div className="mx-auto max-w-3xl divide-y divide-border/70 px-5 sm:px-8">
            {BSAVA_SAFETY_GUIDELINES.map((guideline) => (
              <div key={guideline.id} className="py-5 sm:py-6">
                <GuidelineContent guideline={guideline} />
              </div>
            ))}
          </div>
        ) : (
          <div className="md:grid md:grid-cols-[minmax(14rem,0.65fr)_minmax(0,1.6fr)]">
            <div role="group" aria-label="Tópicos de biossegurança" className="grid grid-cols-2 content-start gap-1.5 border-b border-border/70 p-3 md:grid-cols-1 md:border-b-0 md:border-r md:p-4">
              {BSAVA_SAFETY_GUIDELINES.map((guideline) => {
                const { icon: Icon, label } = topics[guideline.id];
                const active = guideline.id === selected.id;

                return (
                  <button
                    key={guideline.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelected(guideline)}
                    className={cn(
                      'flex min-h-11 items-center gap-2 rounded-xl border px-2.5 py-2 text-left text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-sm md:gap-3 md:px-3',
                      active
                        ? 'border-primary/30 bg-primary/10 text-primary'
                        : 'border-transparent text-foreground hover:bg-muted/70',
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="flex-1">{label}</span>
                    <ChevronRight className={cn('hidden h-4 w-4 shrink-0 md:block', !active && 'opacity-0')} aria-hidden="true" />
                  </button>
                );
              })}
            </div>

            <div aria-live="polite" className="min-w-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent p-5 sm:p-7 md:p-8">
              <GuidelineContent guideline={selected} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
