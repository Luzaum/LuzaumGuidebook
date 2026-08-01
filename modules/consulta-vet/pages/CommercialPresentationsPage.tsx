import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Cat, Dog, ExternalLink, Loader2, PackageSearch, Pill, Search } from 'lucide-react';
import { useClinic } from '../../../src/components/ClinicProvider';
import {
  getMedicationPresentations,
  getMedicationRecommendedDoses,
  type MedicationPresentationRecord,
  type MedicationSearchResult,
  type RecommendedDose,
} from '../../../src/lib/clinicRecords';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { normalizeDoseUnit } from '../utils/receituarioDoseEngine';
import { searchPrescriptionMedicationCatalog } from '../services/receituarioCatalogService';

function normalize(value: unknown): string {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function text(item: MedicationSearchResult, ...keys: string[]): string {
  for (const key of keys) { const value = item.metadata?.[key]; if (typeof value === 'string' && value.trim()) return value.trim(); }
  return '';
}

function array(item: MedicationSearchResult, ...keys: string[]): string[] {
  for (const key of keys) { const value = item.metadata?.[key]; if (Array.isArray(value)) return value.map(String); }
  return [];
}

function presentationLabel(item: MedicationPresentationRecord): string {
  return [item.commercial_name, item.pharmaceutical_form, item.concentration_text].filter(Boolean).join(' — ');
}

function sourceLabel(dose: RecommendedDose): string {
  const raw = normalize(dose.source_type || dose.metadata?.source_type || dose.metadata?.source || '');
  const label = dose.source_label || String(dose.metadata?.source_label || dose.metadata?.reference || '');
  if (raw.includes('plumb')) return label || "Plumb's";
  if (/bula|leaflet|label/.test(raw)) return label || 'Bula';
  return label || (dose.source === 'clinic' ? 'Cadastro da clínica' : 'Fonte não informada');
}

export function CommercialPresentationsPage() {
  const { clinicId } = useClinic();
  const catalogClinicId = clinicId || '00000000-0000-0000-0000-000000000000';
  const [catalog, setCatalog] = useState<MedicationSearchResult[]>([]);
  const [query, setQuery] = useState('');
  const [species, setSpecies] = useState<'all' | 'dog' | 'cat'>('all');
  const [selected, setSelected] = useState<MedicationSearchResult | null>(null);
  const [presentations, setPresentations] = useState<MedicationPresentationRecord[]>([]);
  const [doses, setDoses] = useState<RecommendedDose[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true; setLoading(true);
    void searchPrescriptionMedicationCatalog(catalogClinicId, '', 4000).then((items) => active && setCatalog(items)).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [catalogClinicId]);

  useEffect(() => {
    if (!selected) { setPresentations([]); setDoses([]); return; }
    let active = true; setLoading(true);
    Promise.all([getMedicationPresentations(catalogClinicId, selected.id), getMedicationRecommendedDoses(catalogClinicId, selected.id)])
      .then(([nextPresentations, nextDoses]) => { if (active) { setPresentations(nextPresentations); setDoses(nextDoses); } })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [catalogClinicId, selected]);

  const results = useMemo(() => {
    const needle = normalize(query.trim());
    return catalog.filter((item) => {
      const haystack = normalize([item.name, text(item, 'active_ingredient', 'activeIngredient'), ...array(item, 'trade_names', 'tradeNames', 'synonyms')].join(' '));
      const speciesValues = array(item, 'species');
      const speciesMatch = species === 'all' || !speciesValues.length || speciesValues.some((value) => species === 'dog' ? /cao|canin|dog/.test(normalize(value)) : /gato|felin|cat/.test(normalize(value)));
      return speciesMatch && (!needle || haystack.includes(needle));
    }).slice(0, 100);
  }, [catalog, query, species]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 md:p-8">
      <ConsultaVetPageHero eyebrow="ConsultaVet" title="Apresentações comerciais" description="A mesma fonte canônica usada pelo Receituário: medicamento, apresentação e dose permanecem vinculados por ID." icon={PackageSearch} accent="cyan" />
      <section className="grid gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:grid-cols-[1fr_180px]">
        <label className="relative"><Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Princípio ativo, sinônimo ou nome comercial" className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>
        <select value={species} onChange={(event) => setSpecies(event.target.value as typeof species)} className="h-11 rounded-xl border border-border bg-background px-3 text-sm"><option value="all">Todas as espécies</option><option value="dog">Cão</option><option value="cat">Gato</option></select>
      </section>

      <div className="grid min-h-[520px] gap-5 lg:grid-cols-[360px_1fr]">
        <section className="overflow-hidden rounded-2xl border border-border bg-card"><div className="flex items-center justify-between border-b border-border px-4 py-3"><strong className="text-sm">Medicamentos canônicos</strong><span className="text-xs text-muted-foreground">{results.length} resultados</span></div><div className="max-h-[70vh] overflow-y-auto p-2">
          {loading && !catalog.length ? <div className="flex items-center justify-center gap-2 p-8 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Carregando catálogo…</div> : results.map((item) => <button key={item.id} type="button" onClick={() => setSelected(item)} className={`flex min-h-16 w-full items-start gap-3 rounded-xl p-3 text-left transition-colors ${selected?.id === item.id ? 'bg-primary/10 ring-1 ring-primary/30' : 'hover:bg-muted'}`}><Pill className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span className="min-w-0"><strong className="block truncate text-sm">{text(item, 'active_ingredient', 'activeIngredient') || item.name}</strong><span className="block truncate text-xs text-muted-foreground">{item.name}</span><span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{item.source === 'global' ? 'Catálogo global' : 'Clínica'}</span></span></button>)}
        </div></section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          {!selected ? <div className="flex min-h-[480px] flex-col items-center justify-center text-center"><PackageSearch className="h-10 w-10 text-muted-foreground" /><h2 className="mt-4 font-bold">Selecione um princípio ativo</h2><p className="mt-1 max-w-md text-sm text-muted-foreground">As apresentações mostradas aqui são exatamente as que aparecem no cálculo do Receituário.</p></div> : <div className="space-y-6">
            <header className="border-b border-border pb-5"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Princípio ativo</p><h2 className="mt-2 text-2xl font-bold">{text(selected, 'active_ingredient', 'activeIngredient') || selected.name}</h2><p className="mt-1 text-sm text-muted-foreground">{selected.name}{text(selected, 'pharmacologic_class') ? ` • ${text(selected, 'pharmacologic_class')}` : ''}</p><div className="mt-3 flex flex-wrap gap-2">{array(selected, 'species').map((item) => <span key={item} className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold">{/cao|canin|dog/.test(normalize(item)) ? <Dog className="h-3.5 w-3.5" /> : <Cat className="h-3.5 w-3.5" />}{item}</span>)}{text(selected, 'leaflet_url', 'leafletUrl') ? <a href={text(selected, 'leaflet_url', 'leafletUrl')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">Abrir bula <ExternalLink className="h-3 w-3" /></a> : null}</div></header>
            <div><h3 className="font-bold">Apresentações cadastradas</h3><div className="mt-3 grid gap-3 sm:grid-cols-2">{presentations.map((item) => <article key={item.id} className="rounded-xl border border-border p-4"><strong className="text-sm">{presentationLabel(item)}</strong><dl className="mt-3 grid gap-1 text-xs text-muted-foreground"><div>Fabricante: {String(item.metadata?.manufacturer || 'não cadastrado')}</div><div>Embalagem: {item.package_quantity && item.package_unit ? `${item.package_quantity} ${item.package_unit}` : 'não cadastrada'}</div><div>Origem: {[item.pharmacy_veterinary && 'veterinária', item.pharmacy_human && 'humana', item.pharmacy_compounding && 'manipulação'].filter(Boolean).join(', ') || 'não cadastrada'}</div><div>Divisibilidade: {item.tablet_split_increment ? `${item.tablet_split_increment} comprimido` : 'não cadastrada'}</div></dl></article>)}{!loading && !presentations.length ? <p className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">Nenhuma apresentação canônica cadastrada.</p> : null}</div></div>
            <div><h3 className="font-bold">Doses pré-definidas</h3><div className="mt-3 space-y-2">{doses.map((dose) => <article key={dose.id} className="flex flex-col gap-2 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"><div><strong className="text-sm">{dose.indication || 'Uso cadastrado'}</strong><p className="mt-1 text-xs text-muted-foreground">{dose.dose_value}{dose.dose_max != null ? `–${dose.dose_max}` : ''} {normalizeDoseUnit(dose.dose_unit).canonical} • {dose.route} • {dose.frequency_text || dose.frequency || 'frequência não cadastrada'}</p></div><span className="shrink-0 rounded-full bg-sky-500/10 px-2.5 py-1 text-xs font-bold text-sky-700">{sourceLabel(dose)}</span></article>)}{!loading && !doses.length ? <p className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">Não há dose cadastrada para esta espécie e indicação.</p> : null}</div></div>
            {selected.is_controlled ? <p className="flex gap-2 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-xs text-amber-800"><AlertTriangle className="h-4 w-4 shrink-0" />Medicamento marcado como controlado no catálogo. Confirme as exigências vigentes antes da emissão.</p> : null}
          </div>}
        </section>
      </div>
    </div>
  );
}
