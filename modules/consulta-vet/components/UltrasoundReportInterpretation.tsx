import { ULTRASOUND_COMPLEMENTARY_ASSESSMENT } from '../data/ultrasoundComplementaryAssessment';
import React, { useId, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { UltrasoundOrganId, UltrasoundSpecies } from '../data/ultrasoundReferenceData';
import { getUltrasoundReportPatterns, ULTRASOUND_PHYSICS_GUIDE } from '../data/ultrasoundInterpretationData';
import { getUltrasoundDifferentialExplanations } from '../data/ultrasoundClinicalMechanisms';
import { ULTRASOUND_CLINICAL_IMAGES } from '../data/ultrasoundClinicalImages';

function Explanation({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="space-y-2"><h5 className="text-sm font-extrabold text-foreground">{title}</h5><div className="text-sm leading-7 text-muted-foreground">{children}</div></div>;
}
export function UltrasoundReportInterpretation({ organ, species }: { organ: UltrasoundOrganId; species: UltrasoundSpecies }) {
  const [query, setQuery] = useState('');
  const searchId = useId();
  const rows = useMemo(() => getUltrasoundReportPatterns(organ, species, query), [organ, species, query]);
  const image = ULTRASOUND_CLINICAL_IMAGES[organ];
  return (
    <section id="interpretar-laudo" className="scroll-mt-6 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm" aria-label="Interpretar alterações do laudo">
      <div className="space-y-5 border-b border-border/60 p-4 sm:p-6">
        <div><h3 className="text-xl font-extrabold text-foreground">Entenda a alteração do laudo</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Selecione um achado para entender sua aparência, como ele se forma e quais causas investigar. Nos diferenciais, abra o mecanismo para aprofundar.</p></div>
        <figure className="overflow-hidden rounded-2xl border border-border bg-background">
          <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
            <a href={image.src} target="_blank" rel="noreferrer" aria-label="Ampliar imagem ultrassonográfica" className="block rounded-xl bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><img src={image.src} width={image.width} height={image.height} alt={`${image.speciesLabel}. ${image.caption}`} loading="lazy" decoding="async" className="mx-auto max-h-80 w-full object-contain" /></a>
            <figcaption className="space-y-2"><p className="text-xs font-extrabold uppercase tracking-wide text-primary">Imagem ultrassonográfica · {image.speciesLabel}</p><p className="text-sm leading-7 text-muted-foreground">{image.caption}</p><p className="text-xs text-muted-foreground">Clique na imagem para ampliar. Créditos em Referências.</p></figcaption>
          </div>
        </figure>
        <div><label htmlFor={searchId} className="mb-2 block text-sm font-bold text-foreground">Pesquisar alteração ou diferencial neste órgão</label><div className="relative"><Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden /><input id={searchId} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Ex.: grosseiro, nódulo, fibrose, edema…" className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /></div></div>
        <details className="rounded-xl bg-muted/40 p-3"><summary className="cursor-pointer text-sm font-bold text-primary">Como o ultrassom forma a imagem</summary><div className="mt-4 grid gap-4 md:grid-cols-2">{ULTRASOUND_PHYSICS_GUIDE.map(item => <article key={item.term} className="rounded-xl border border-border/60 bg-background p-4"><h4 className="text-sm font-bold text-foreground">{item.term}</h4><p className="mt-2 text-sm leading-7 text-muted-foreground">{item.explanation}</p></article>)}</div></details>
      </div>
      <div className="space-y-3 p-4 sm:p-6">
        {rows.length ? rows.map(row => {
          const differentials = getUltrasoundDifferentialExplanations(organ, row.differentials, species);
          return <details key={row.id} className="rounded-2xl border border-border/70 bg-background/60">
            <summary className="cursor-pointer p-4 text-foreground marker:text-primary sm:p-5"><span className="font-extrabold">{row.term}</span><span className="mt-2 block text-sm font-normal leading-relaxed text-muted-foreground">{row.meaning}</span>{row.urgent && <span className="mt-2 inline-block rounded-lg bg-amber-500/10 px-2 py-1 text-xs font-bold text-amber-800 dark:text-amber-200">Avalie a urgência no contexto clínico</span>}</summary>
            <div className="space-y-6 border-t border-border/60 p-4 sm:p-5">
              <Explanation title="Como vejo no ultrassom"><p>{row.appearance ?? row.meaning}</p></Explanation>
              <Explanation title="Como a alteração se forma"><p>{row.mechanism}</p></Explanation>
              <Explanation title="Diferenciais"><p>{row.differentials}</p><div className="mt-3 space-y-2">{differentials.map(item => <details key={item.name} className="rounded-xl border border-primary/15 bg-primary/[0.03] p-3 sm:p-4"><summary className="cursor-pointer text-sm font-bold text-primary">{item.name} · explicar mecanismo</summary><div className="mt-4 space-y-4"><Explanation title="Fisiopatologia e lesão"><p>{item.pathophysiology}</p></Explanation><Explanation title="Por que produz este aspecto"><p>{item.appearance}</p></Explanation><Explanation title="Como relacionar com o paciente"><p>{item.clinical}</p></Explanation></div></details>)}</div></Explanation>
              <Explanation title="O que o clínico deve pensar ao ler o laudo"><p>{row.consider}</p></Explanation>
            </div>
          </details>;
        }) : <p role="status" className="py-4 text-sm text-muted-foreground">Nenhum achado encontrado. Tente outro termo ou limpe a pesquisa.</p>}
      </div>
      {ULTRASOUND_COMPLEMENTARY_ASSESSMENT[organ] && <details className="mx-4 mb-5 rounded-xl border border-border/60 p-4 sm:mx-6"><summary className="cursor-pointer text-sm font-bold text-primary">Quando complementar a investigação</summary><p className="mt-3 text-sm leading-7 text-muted-foreground">{ULTRASOUND_COMPLEMENTARY_ASSESSMENT[organ]}</p></details>}
      <p className="border-t border-border/60 bg-muted/20 p-4 text-xs leading-relaxed text-muted-foreground">A aparência orienta hipóteses; sinais, exames e evolução definem sua relevância para o paciente. Os achados podem ocorrer em diferentes idades; o filtro de fase de vida se aplica às medidas acima.</p>
    </section>
  );
}
