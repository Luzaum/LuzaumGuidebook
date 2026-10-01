import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { HelpButton } from '../components/HelpButton';
import { KnowledgeModal } from '../components/KnowledgeModal';
import { TransfusionIcon } from '../components/TransfusionIcon';
import { PRODUCT_GUIDES, PRODUCT_SOURCES, type Species } from '../data/products';
import { PRODUCT_CATEGORIES, productHelp, protocolFor } from '../data/productProtocols';

export default function ProductsPage() {
  const [species, setSpecies] = useState<Species>('dog');
  const [selectedId, setSelectedId] = useState('ffp');
  const [openCategory, setOpenCategory] = useState('plasma');
  const [mobilePicker, setMobilePicker] = useState(false);
  const [section, setSection] = useState('protocol');
  const [weight, setWeight] = useState('');
  const [helpTerm, setHelpTerm] = useState<string | null>(null);
  const selected = PRODUCT_GUIDES.find(product => product.id === selectedId && product.species.includes(species)) ?? PRODUCT_GUIDES.find(product => product.id === 'ffp')!;
  const profile = protocolFor(selected);
  const helpEntries = productHelp(selected);
  const numericWeight = Number(weight.replace(',', '.'));
  const validWeight = Number.isFinite(numericWeight) && numericWeight > 0 && numericWeight <= 150;
  const volume = selected.dose && validWeight ? `${(selected.dose.min * numericWeight).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}–${(selected.dose.max * numericWeight).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mL` : null;
  const help = (term: string) => <HelpButton term={helpEntries[term].title} onOpenModal={() => setHelpTerm(term)} />;
  const row = (label: string, text: string, term: string) => <section className="py-3"><h4 className="flex items-center justify-between gap-2 text-sm font-semibold">{label}{help(term)}</h4><p className="text-sm leading-relaxed text-muted-foreground">{text}</p></section>;
  function choose(id: string) { setSelectedId(id); setSection('protocol'); setWeight(''); setHelpTerm(null); setMobilePicker(false); }

  return <div className="mx-auto max-w-6xl space-y-4 pb-6">
    <KnowledgeModal term={helpTerm} onClose={() => setHelpTerm(null)} entries={helpEntries} />
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><h2 className="text-lg font-bold">Hemocomponentes e albumina</h2><p className="mt-1 text-xs text-muted-foreground">Selecione o produto. Aprofunde nos botões de ajuda.</p></div>
      <div className="inline-flex rounded-xl border border-border bg-card p-1" role="group" aria-label="Espécie">{([['dog', 'Cão'], ['cat', 'Gato']] as const).map(([id, label]) => <button key={id} type="button" aria-pressed={species === id} onClick={() => { setSpecies(id); setWeight(''); setHelpTerm(null); if (!selected.species.includes(id)) { choose('ffp'); setOpenCategory('plasma'); } }} className={`min-h-10 rounded-lg px-5 text-sm font-semibold ${species === id ? 'bg-red-500 text-white' : 'hover:bg-muted text-muted-foreground'}`}>{label}</button>)}</div>
    </div>
    <div className="grid items-start gap-4 lg:grid-cols-[250px_minmax(0,1fr)]">
      <nav aria-label="Categorias de hemocomponentes" className="rounded-2xl border border-border bg-card p-2">
        <button type="button" onClick={() => setMobilePicker(!mobilePicker)} aria-expanded={mobilePicker} aria-controls="component-categories" className="flex min-h-12 w-full items-center gap-2 px-2 text-left lg:hidden"><TransfusionIcon name={selected.id} /><span className="flex-1 text-sm font-semibold">{selected.name}<span className="block text-xs font-normal text-muted-foreground">Trocar produto</span></span><ChevronDown className="h-4 w-4" /></button>
        <div id="component-categories" className={`${mobilePicker ? 'block' : 'hidden'} lg:block`}>
          <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Categorias</p>
          {PRODUCT_CATEGORIES.map(category => <div key={category.id} className="mb-1">
            <button type="button" onClick={() => setOpenCategory(openCategory === category.id ? '' : category.id)} aria-expanded={openCategory === category.id} aria-controls={`category-${category.id}`} className="flex min-h-12 w-full items-center gap-2 rounded-xl px-2 text-left hover:bg-muted"><TransfusionIcon name={category.icon} className="h-8 w-8" /><span className="flex-1 text-xs font-bold">{category.label}</span><ChevronDown className={`h-3.5 w-3.5 ${openCategory === category.id ? 'rotate-180' : ''}`} /></button>
            {openCategory === category.id && <div id={`category-${category.id}`} className="space-y-1 border-l border-border pl-2 ml-5 my-1">{PRODUCT_GUIDES.filter(product => (category.products as readonly string[]).includes(product.id) && product.species.includes(species)).map(product => <button key={product.id} type="button" onClick={() => choose(product.id)} aria-pressed={selected.id === product.id} className={`flex min-h-12 w-full items-center gap-2 rounded-lg px-2 py-2 text-left ${selected.id === product.id ? 'bg-red-500/10 text-red-700 dark:text-red-300 ring-1 ring-inset ring-red-500/20' : 'text-muted-foreground hover:bg-muted'}`}><TransfusionIcon name={product.id} className="h-8 w-8" /><span className="flex-1 text-xs font-medium leading-snug">{product.name}</span>{selected.id === product.id && <ChevronRight className="h-3 w-3 shrink-0" />}</button>)}</div>}
          </div>)}
        </div>
      </nav>
      <article className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card" aria-labelledby="selected-product-title">
        <header className="flex items-center gap-3 border-b border-border/60 p-4 md:px-5"><TransfusionIcon name={selected.id} className="h-14 w-14" /><div className="min-w-0"><p className="text-[11px] font-medium text-muted-foreground">{profile.category.label} · {species === 'dog' ? 'Cão' : 'Gato'} · {selected.abbreviation}</p><h3 id="selected-product-title" className="mt-1 text-lg font-bold leading-snug">{selected.name}</h3></div></header>
        <div className="flex border-b border-border px-4" role="group" aria-label="Seções do produto">{[['protocol', 'Protocolo'], ['monitor', 'Monitorização'], ['sources', 'Referências']].map(([id, label]) => <button type="button" key={id} aria-pressed={section === id} onClick={() => setSection(id)} className={`min-h-11 border-b-2 px-3 text-xs font-semibold ${section === id ? 'border-red-500 text-red-600 dark:text-red-300' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>{label}</button>)}</div>
        <div className="px-4 pb-4 md:px-5" key={selected.id}>
          {section === 'protocol' && <>
            {row('Indicação e função', selected.indication, 'mechanism')}
            <p className="rounded-lg border-l-2 border-amber-500 bg-amber-500/5 px-3 py-2 text-xs leading-relaxed"><span className="font-semibold">Limite clínico: </span>{selected.doesNotDo}</p>
            <div className="divide-y divide-border/60">{row('Seleção e compatibilidade', selected.selection, 'compatibility')}{row(profile.preparationLabel, selected.administration, 'preparation')}</div>
            <details key={`${selected.id}-quantity`} className="mt-3 rounded-xl border border-border bg-muted/20"><summary className="cursor-pointer px-3 py-3 text-sm font-semibold">{profile.doseLabel}{selected.dose ? ` · ${selected.dose.min}–${selected.dose.max} mL/kg` : ''}</summary><div className="px-3 pb-3"><div className="flex items-start gap-2"><p className="flex-1 text-xs leading-relaxed text-muted-foreground">{profile.quantity}</p>{help('quantity')}</div>{selected.dose && <><p className="mt-2 text-xs text-muted-foreground">{selected.dose.note}</p><div className="mt-3 flex flex-wrap items-end gap-3"><label className="text-xs font-medium">Peso (kg)<input value={weight} inputMode="decimal" onChange={event => setWeight(event.target.value)} placeholder="Ex.: 4,5" aria-invalid={Boolean(weight && !validWeight)} aria-describedby="weight-note" className="mt-1 block min-h-11 w-32 rounded-lg border border-input bg-background px-3 text-sm" /></label><output className="pb-3 text-sm font-semibold" aria-live="polite">{volume ?? 'Informe o peso'}</output></div><p id="weight-note" className="mt-2 text-xs text-muted-foreground">{weight && !validWeight ? 'Informe um peso maior que 0 e até 150 kg.' : 'Volume total de referência, não velocidade de infusão.'}</p></>}</div></details>
          </>}
          {section === 'monitor' && <>{row(profile.responseLabel, selected.monitoring, 'response')}<div className="rounded-xl border border-border bg-muted/20 p-3 text-sm leading-relaxed"><p className="font-semibold">Vigilância durante a infusão</p><p className="mt-2 text-muted-foreground">Registre temperatura, frequência cardíaca e respiratória, perfusão e pressão arterial basais. Reavalie conforme estabilidade e protocolo do produto.</p><p className="mt-2 text-muted-foreground">Se houver suspeita de reação, interrompa a infusão e avalie imediatamente. Utilize a seção <strong>Reações</strong> do módulo para condução.</p>{profile.albumin && <p className="mt-2 text-muted-foreground">Em preparações xenógenas, planeje acompanhamento para hipersensibilidade tardia.</p>}</div></>}
          {section === 'sources' && <>{row('Evidência para este produto', selected.evidence, 'evidence')}<ul className="space-y-1">{selected.sources.map(id => { const source = PRODUCT_SOURCES[id as keyof typeof PRODUCT_SOURCES]; return <li key={id}><a href={source.url} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 py-2 text-sm text-red-600 underline underline-offset-4 dark:text-red-300">{source.label}<ExternalLink className="h-3.5 w-3.5 shrink-0" /></a></li>; })}</ul><p className="mt-3 text-xs leading-relaxed text-muted-foreground">Dose, conservação e prazo dependem da formulação e do hemobanco. Não substitui avaliação e prescrição do médico-veterinário.</p></>}
        </div>
      </article>
    </div>
  </div>;
}
