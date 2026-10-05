import React, { useId, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { UltrasoundOrganId, UltrasoundSpecies } from '../data/ultrasoundReferenceData';
import { getUltrasoundReportPatterns, ULTRASOUND_PHYSICS_GUIDE } from '../data/ultrasoundInterpretationData';
import { getUltrasoundDifferentialExplanations } from '../data/ultrasoundClinicalMechanisms';
import { getUltrasoundClinicalImage } from '../data/ultrasoundClinicalImages';
import { ULTRASOUND_COMPLEMENTARY_ASSESSMENT } from '../data/ultrasoundComplementaryAssessment';
import { ReadableTable } from './shared/ReadableTable';

function Explanation({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h5 className="mb-1 font-bold text-foreground">{title}</h5><div className="leading-relaxed text-muted-foreground">{children}</div></div>;
}

/** Preserve complete sentences and clinical qualifiers; never truncate the source text. */
function ProgressiveText({ text }: { text: string }) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const lead = sentences[0];
  const rest = sentences.slice(1).join(' ');
  return <><p>{lead}</p>{rest && <details className="mt-2"><summary className="cursor-pointer font-semibold text-primary">Ler explicação completa</summary><p className="mt-2">{rest}</p></details>}</>;
}

export function UltrasoundReportInterpretation({ organ, species }: { organ: UltrasoundOrganId; species: UltrasoundSpecies }) {
  const [query, setQuery] = useState('');
  const searchId = useId();
  const imageId = useId();
  const rows = useMemo(() => getUltrasoundReportPatterns(organ, species, query), [organ, species, query]);
  const image = getUltrasoundClinicalImage(organ, species);
  const panel = image.panel ?? { x: 0, y: 0, width: image.width, height: image.height };
  return (
    <section id="interpretar-laudo" className="scroll-mt-6 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm" aria-label="Interpretar alterações do laudo">
      <div className="space-y-4 border-b border-border/60 p-4 sm:p-6">
        <div><h3 className="text-xl font-extrabold text-foreground">Interpretação do laudo</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Leia cada linha da esquerda para a direita. As causas aparecem nos diferenciais; clique em uma delas para entender o mecanismo e relacioná-lo ao paciente.</p></div>
        <div><label htmlFor={searchId} className="mb-2 block text-sm font-bold text-foreground">Pesquisar alteração ou diferencial neste órgão</label><div className="relative"><Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden /><input id={searchId} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Ex.: grosseiro, nódulo, fibrose, edema…" className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /></div></div>
      </div>
      {rows.length ? <ReadableTable style={{ tableLayout: 'fixed' }} className="w-full min-w-[1120px] border-collapse text-left text-sm" aria-label="Alterações ultrassonográficas e diferenciais">
        <caption className="sr-only">Alteração, aparência no ultrassom, mecanismo de formação, diferenciais e raciocínio clínico</caption>
        <colgroup><col style={{ width: '17%' }} /><col style={{ width: '19%' }} /><col style={{ width: '20%' }} /><col style={{ width: '24%' }} /><col style={{ width: '20%' }} /></colgroup>
        <thead className="bg-muted/60 text-foreground"><tr>{['Alteração no laudo', 'Como vejo no ultrassom', 'Como a alteração se forma', 'Diferenciais', 'O que o clínico deve pensar'].map(title => <th scope="col" key={title} className="border-b border-r border-border p-4 align-top font-extrabold last:border-r-0">{title}</th>)}</tr></thead>
        <tbody>{rows.map(row => {
          const differentials = getUltrasoundDifferentialExplanations(organ, row.differentials, species);
          const cell = 'border-b border-r border-border/60 p-4 align-top leading-relaxed text-muted-foreground last:border-r-0';
          return <tr key={row.id} data-pattern-id={row.id} className="odd:bg-background even:bg-muted/20">
            <th scope="row" className={`${cell} font-normal`}><p className="font-bold text-foreground">{row.term}</p><p className="mt-2">{row.meaning}</p>{row.urgent && <p className="mt-3 rounded-lg bg-amber-500/10 p-2 text-xs font-bold text-amber-800 dark:text-amber-200">Avalie a urgência no contexto clínico</p>}</th>
            <td className={cell}><ProgressiveText text={row.appearance ?? row.meaning} /></td>
            <td className={cell}><ProgressiveText text={row.mechanism} /></td>
            <td className={cell}><div className="space-y-2">{differentials.map(item => <details key={item.name} className="border-b border-border/50 pb-2 last:border-b-0"><summary className="cursor-pointer font-semibold text-primary">{item.name}<span className="sr-only"> · Explicar mecanismo</span></summary><div className="mt-3 space-y-4"><Explanation title="Fisiopatologia e lesão"><p>{item.pathophysiology}</p></Explanation><Explanation title="Por que produz este aspecto"><p>{item.appearance}</p></Explanation><Explanation title="Como relacionar com o paciente"><p>{item.clinical}</p></Explanation></div></details>)}</div><details className="mt-3"><summary className="cursor-pointer text-xs font-semibold text-primary">Lista completa e contexto</summary><p className="mt-2">{row.differentials}</p></details></td>
            <td className={cell}><p>{row.consider}</p></td>
          </tr>;
        })}</tbody>
      </ReadableTable> : <p role="status" className="p-6 text-sm text-muted-foreground">Nenhum achado encontrado. Tente outro termo ou limpe a pesquisa.</p>}
      <div className="space-y-3 p-4 sm:p-6">
        <details className="rounded-xl border border-border p-4"><summary className="cursor-pointer text-sm font-bold text-primary">Ver exemplo de imagem · {image.speciesLabel}</summary><figure className="mt-4 grid gap-4 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:items-center">
          <svg role="img" aria-labelledby={imageId} width={panel.width} height={panel.height} viewBox={`${panel.x} ${panel.y} ${panel.width} ${panel.height}`} className="h-auto w-full rounded-lg bg-black" style={{ maxWidth: `${Math.min(360, 320 * panel.width / panel.height)}px` }}>
            <title id={imageId}>{`${image.speciesLabel}. ${image.caption}`}</title>
            <defs><clipPath id={`${imageId}-panel`}><rect x={panel.x} y={panel.y} width={panel.width} height={panel.height} /></clipPath></defs>
            <image href={image.src} width={image.width} height={image.height} clipPath={`url(#${imageId}-panel)`} />
          </svg>
          <figcaption className="text-sm leading-relaxed text-muted-foreground"><p className="mb-2 font-bold text-foreground">{image.speciesLabel}</p><p>{image.caption}</p><p className="mt-3 text-xs">Exemplo ilustrativo: não representa todos os achados da tabela. Créditos em Referências.</p></figcaption>
        </figure></details>
        <details className="rounded-xl border border-border p-4"><summary className="cursor-pointer text-sm font-bold text-primary">Como o ultrassom forma a imagem</summary><div className="mt-4 grid gap-4 md:grid-cols-2">{ULTRASOUND_PHYSICS_GUIDE.map(item => <article key={item.term}><h4 className="text-sm font-bold text-foreground">{item.term}</h4><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.explanation}</p></article>)}</div></details>
        {ULTRASOUND_COMPLEMENTARY_ASSESSMENT[organ] && <details className="rounded-xl border border-border p-4"><summary className="cursor-pointer text-sm font-bold text-primary">Quando complementar a investigação</summary><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{ULTRASOUND_COMPLEMENTARY_ASSESSMENT[organ]}</p></details>}
      </div>
      <p className="border-t border-border/60 bg-muted/20 p-4 text-xs leading-relaxed text-muted-foreground">A aparência orienta hipóteses; sinais, exames e evolução definem sua relevância para o paciente. Os achados podem ocorrer em diferentes idades; o filtro de fase de vida se aplica às medidas acima.</p>
    </section>
  );
}
