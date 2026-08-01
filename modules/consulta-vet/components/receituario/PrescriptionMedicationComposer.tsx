import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, BookOpen, CheckCircle2, ExternalLink, Loader2, Pill, Plus, Search, X } from 'lucide-react';
import {
  getMedicationPresentations,
  getMedicationRecommendedDoses,
  type MedicationPresentationRecord,
  type MedicationSearchResult,
  type RecommendedDose,
} from '../../../../src/lib/clinicRecords';
import type { PrescriptionMedicationSnapshot, PrescriptionPrecaution } from '../../types/receituario';
import {
  calculateReceituarioDose,
  formatDecimalPtBr,
  isSpeciesCompatible,
  normalizeDoseUnit,
  resolveAdministrationBasis,
} from '../../utils/receituarioDoseEngine';
import { normalizePrescriptionSpecies, parsePositiveDecimal } from '../../utils/receituarioMedication';
import { fetchPrescriptionPrecautions, searchPrescriptionMedicationCatalog } from '../../services/receituarioCatalogService';

interface Props {
  clinicId?: string | null;
  species?: string;
  weightKg?: string;
  onInsert: (medicationBlock: string, snapshot: PrescriptionMedicationSnapshot) => void;
}

type Laterality = '' | 'direito' | 'esquerdo' | 'ambos' | 'afetado';

function normalize(value: unknown): string {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function metadataText(entry: MedicationSearchResult, ...keys: string[]): string {
  for (const key of keys) {
    const value = entry.metadata?.[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function metadataArray(entry: MedicationSearchResult, ...keys: string[]): string[] {
  for (const key of keys) {
    const value = entry.metadata?.[key];
    if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

function searchableMedication(entry: MedicationSearchResult): string {
  return normalize([
    entry.name,
    metadataText(entry, 'active_ingredient', 'activeIngredient'),
    ...metadataArray(entry, 'synonyms', 'trade_names', 'tradeNames', 'active_ingredient_synonyms'),
  ].join(' '));
}

function doseSource(dose: RecommendedDose) {
  const metadata = dose.metadata || {};
  const raw = normalize(dose.source_type || metadata.source_type || metadata.source || metadata.origin || '');
  const sourceLabel = dose.source_label || String(metadata.source_label || metadata.reference || '');
  const edition = dose.source_edition ? `, ${dose.source_edition}` : '';
  if (raw.includes('plumb')) return { type: 'plumbs', label: `${sourceLabel || "Plumb's"}${edition}` };
  if (raw.includes('bula') || raw.includes('leaflet') || raw.includes('label')) return { type: 'leaflet', label: `${sourceLabel || 'Bula'}${edition}` };
  if (dose.source === 'clinic') return { type: 'clinic', label: sourceLabel || 'Cadastro da clínica' };
  return { type: 'other', label: sourceLabel || 'Fonte não informada' };
}

function presentationLabel(item: MedicationPresentationRecord): string {
  return [item.commercial_name, item.pharmaceutical_form, item.concentration_text, item.package_quantity && item.package_unit ? `${item.package_quantity} ${item.package_unit}` : '']
    .filter(Boolean).join(' — ');
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-muted-foreground">{children}</span>;
}

function routeNeedsLaterality(route: string): 'olho' | 'ouvido' | 'narina' | null {
  const value = normalize(route);
  if (/oft|ocular|olho/.test(value)) return 'olho';
  if (/otic|auricular|ouvido/.test(value)) return 'ouvido';
  if (/nasal|narina/.test(value)) return 'narina';
  return null;
}

export function PrescriptionMedicationComposer({ clinicId, species, weightKg, onInsert }: Props) {
  const catalogClinicId = clinicId || '00000000-0000-0000-0000-000000000000';
  const normalizedSpecies = normalizePrescriptionSpecies(species);
  const parsedWeight = parsePositiveDecimal(weightKg);
  const [catalog, setCatalog] = useState<MedicationSearchResult[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<MedicationSearchResult | null>(null);
  const [presentations, setPresentations] = useState<MedicationPresentationRecord[]>([]);
  const [doses, setDoses] = useState<RecommendedDose[]>([]);
  const [doseId, setDoseId] = useState('');
  const [presentationId, setPresentationId] = useState('');
  const [doseValue, setDoseValue] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [laterality, setLaterality] = useState<Laterality>('');
  const [applicationSite, setApplicationSite] = useState('');
  const [roundingConfirmed, setRoundingConfirmed] = useState(false);
  const [precautions, setPrecautions] = useState<PrescriptionPrecaution[]>([]);
  const [extraPrecaution, setExtraPrecaution] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    void searchPrescriptionMedicationCatalog(catalogClinicId, '', 4000).then((items) => {
      if (active) setCatalog(items);
    }).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [catalogClinicId]);

  const results = useMemo(() => {
    const needle = normalize(query.trim());
    if (needle.length < 2) return [];
    return catalog.filter((item) => searchableMedication(item).includes(needle)).slice(0, 12);
  }, [catalog, query]);

  useEffect(() => {
    if (!selected) return;
    let active = true;
    setLoading(true);
    Promise.all([
      getMedicationPresentations(catalogClinicId, selected.id),
      getMedicationRecommendedDoses(catalogClinicId, selected.id),
      fetchPrescriptionPrecautions(catalogClinicId, selected.id),
    ]).then(([nextPresentations, nextDoses, canonicalPrecautions]) => {
      if (!active) return;
      setPresentations(nextPresentations);
      setDoses(nextDoses);
      setPresentationId(nextPresentations[0]?.id || '');
      const cautionTexts = [
        ...metadataArray(selected, 'cautions', 'precautions'),
        ...metadataArray(selected, 'contraindications'),
      ];
      const fallbackPrecautions: PrescriptionPrecaution[] = Array.from(new Set(cautionTexts.map((text) => text.trim()).filter(Boolean))).map((text, index) => ({
        id: `${selected.id}-precaution-${index}`,
        text,
        sourceType: 'other' as const,
        sourceLabel: 'Cadastro do medicamento',
        sourceUrl: metadataText(selected, 'leaflet_url', 'leafletUrl') || null,
      }));
      setPrecautions(canonicalPrecautions.length ? canonicalPrecautions : fallbackPrecautions);
    }).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [catalogClinicId, selected]);

  const compatibleDoses = useMemo(
    () => normalizedSpecies ? doses.filter((dose) => isSpeciesCompatible(dose.species, normalizedSpecies)) : [],
    [doses, normalizedSpecies],
  );
  const selectedDose = compatibleDoses.find((dose) => dose.id === doseId);
  const selectedPresentation = presentations.find((item) => item.id === presentationId);
  const basis = selectedDose ? resolveAdministrationBasis(selectedDose) : null;
  const selectedSource = selectedDose ? doseSource(selectedDose) : null;
  const lateralityTarget = selectedDose ? routeNeedsLaterality(selectedDose.route) : null;

  useEffect(() => {
    const first = compatibleDoses[0];
    if (!first) { setDoseId(''); return; }
    if (!compatibleDoses.some((dose) => dose.id === doseId)) setDoseId(first.id || '');
  }, [compatibleDoses, doseId]);

  useEffect(() => {
    if (!selectedDose) return;
    const initial = selectedDose.calculator_default_dose ?? (selectedDose.dose_max == null ? selectedDose.dose_value : null);
    setDoseValue(initial == null ? '' : String(initial));
    setFrequency(selectedDose.frequency_text || selectedDose.frequency || '');
    setDuration(selectedDose.duration || '');
    setRoundingConfirmed(false);
    setLaterality('');
  }, [selectedDose?.id]);

  const parsedDoseValue = parsePositiveDecimal(doseValue);
  const calculation = useMemo(() => {
    if (!normalizedSpecies || !selectedDose || !parsedDoseValue) return null;
    return calculateReceituarioDose({
      species: normalizedSpecies,
      weightKg: parsedWeight,
      dose: selectedDose,
      selectedDoseValue: parsedDoseValue,
      presentation: selectedPresentation,
    });
  }, [normalizedSpecies, parsedDoseValue, parsedWeight, selectedDose, selectedPresentation]);

  const sourceUrl = selectedDose ? String(selectedDose.source_url || selectedDose.metadata?.source_url || selectedDose.metadata?.url || '') : '';
  const weightMissing = basis === 'weight_based' && !parsedWeight;
  const lateralityMissing = Boolean(lateralityTarget && !laterality);
  const canInsert = Boolean(selected && selectedDose && parsedDoseValue && calculation && !calculation.blockedReason && !weightMissing && !lateralityMissing && (!calculation.requiresConfirmation || roundingConfirmed));

  const reset = () => {
    setSelected(null); setQuery(''); setPresentations([]); setDoses([]); setDoseId(''); setPresentationId('');
    setDoseValue(''); setFrequency(''); setDuration(''); setPrecautions([]); setLaterality(''); setApplicationSite('');
  };

  const addPrecaution = () => {
    const text = extraPrecaution.trim();
    if (!text || precautions.some((item) => normalize(item.text) === normalize(text))) return;
    setPrecautions((current) => [...current, { id: `manual-${Date.now()}`, text, sourceType: 'clinic', sourceLabel: 'Incluída nesta receita' }]);
    setExtraPrecaution('');
  };

  const insert = () => {
    if (!selected || !selectedDose || !calculation || !canInsert) return;
    const unit = normalizeDoseUnit(selectedDose.dose_unit).canonical;
    const presentation = selectedPresentation ? presentationLabel(selectedPresentation) : 'Apresentação não selecionada';
    const amount = calculation.practicalAmount != null && calculation.administrationUnit
      ? `${formatDecimalPtBr(calculation.practicalAmount)} ${calculation.administrationUnit}${calculation.practicalAmount === 1 ? '' : 's'}`
      : `${formatDecimalPtBr(calculation.totalDose)} ${calculation.totalDoseUnit}`;
    const target = lateralityTarget && laterality ? ` no ${lateralityTarget} ${laterality}` : applicationSite ? ` em ${applicationSite}` : '';
    const lines = [
      `${metadataText(selected, 'active_ingredient', 'activeIngredient') || selected.name.toUpperCase()} — ${presentation}`,
      `Administrar ${amount}${target}, por via ${selectedDose.route || 'indicada'}${frequency ? `, ${frequency}` : ''}${duration ? `, durante ${duration}` : ''}.`,
      `Dose selecionada: ${formatDecimalPtBr(parsedDoseValue || 0)} ${unit} — fonte: ${selectedSource?.label || 'não informada'}.`,
    ];
    if (calculation.actualDosePerBasis != null && basis === 'weight_based') {
      lines.push(`Dose real após conversão: ${formatDecimalPtBr(calculation.actualDosePerBasis)} ${calculation.totalDoseUnit}/kg (${formatDecimalPtBr(calculation.percentDifference || 0)}% de diferença).`);
    }
    if (precautions.length) {
      lines.push('', 'ORIENTAÇÕES E CUIDADOS IMPORTANTES', ...precautions.map((item) => `• ${item.text}`));
    }
    onInsert(lines.join('\n'), {
      medicationId: selected.id,
      medicationName: selected.name,
      activeIngredient: metadataText(selected, 'active_ingredient', 'activeIngredient') || selected.name,
      presentationId: selectedPresentation?.id || null,
      doseId: selectedDose.id || null,
      doseSourceType: (selectedSource?.type || 'other') as PrescriptionMedicationSnapshot['doseSourceType'],
      doseSourceLabel: selectedSource?.label || 'Fonte não informada',
      doseSourceUrl: sourceUrl || null,
      doseUnit: unit,
      selectedDose: parsedDoseValue || 0,
      precautions,
    });
  };

  return (
    <div className="space-y-5" data-testid="prescription-medication-composer">
      {!normalizedSpecies ? <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm">Selecione cão ou gato antes de escolher o princípio ativo.</p> : null}

      {!selected ? (
        <div className="relative">
          <FieldLabel>1. Princípio ativo</FieldLabel>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" autoFocus
              placeholder="Busque princípio ativo, sinônimo ou nome comercial"
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            {loading ? <Loader2 className="absolute right-3 top-3.5 h-4 w-4 animate-spin text-primary" /> : null}
          </div>
          {query.trim().length >= 2 ? (
            <div className="mt-2 max-h-72 overflow-y-auto rounded-xl border border-border bg-card p-1.5 shadow-xl">
              {results.map((item) => (
                <button key={item.id} type="button" onClick={() => { setSelected(item); setQuery(''); }}
                  className="flex min-h-14 w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <Pill className="h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0"><strong className="block truncate text-sm">{metadataText(item, 'active_ingredient', 'activeIngredient') || item.name}</strong>
                    <span className="block truncate text-xs text-muted-foreground">{item.name}{metadataText(item, 'pharmacologic_class') ? ` • ${metadataText(item, 'pharmacologic_class')}` : ''}</span></span>
                </button>
              ))}
              {!loading && !results.length ? <p className="p-4 text-center text-xs text-muted-foreground">Nenhum princípio ativo encontrado.</p> : null}
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between rounded-xl border border-primary/20 bg-primary/[0.05] p-4">
            <div><p className="text-xs font-bold uppercase tracking-wider text-primary">Princípio ativo selecionado</p><p className="mt-1 font-semibold">{metadataText(selected, 'active_ingredient', 'activeIngredient') || selected.name}</p><p className="text-xs text-muted-foreground">{selected.name}</p></div>
            <button type="button" onClick={reset} className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted" aria-label="Trocar princípio ativo"><X className="h-4 w-4" /></button>
          </div>

          <div className="space-y-2">
            <FieldLabel>2. Apresentação comercial</FieldLabel>
            <select value={presentationId} onChange={(event) => { setPresentationId(event.target.value); setRoundingConfirmed(false); }} className="min-h-11 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm">
              <option value="">Sem conversão por apresentação</option>
              {presentations.map((item) => <option key={item.id} value={item.id}>{presentationLabel(item)}</option>)}
            </select>
            {selectedPresentation ? <div className="grid gap-1 rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground sm:grid-cols-2"><span>Concentração: {selectedPresentation.concentration_text || 'não cadastrada'}</span><span>Forma: {selectedPresentation.pharmaceutical_form || 'não cadastrada'}</span><span>Fabricante: {String(selectedPresentation.metadata?.manufacturer || 'não cadastrado')}</span><span>Origem: {selectedPresentation.source === 'global' ? 'Catálogo global' : 'Clínica'}</span></div> : null}
          </div>

          <div className="space-y-2">
            <FieldLabel>3. Doses pré-definidas</FieldLabel>
            <select value={doseId} onChange={(event) => setDoseId(event.target.value)} className="min-h-11 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm">
              {!compatibleDoses.length ? <option value="">Não há dose cadastrada para esta espécie e indicação.</option> : null}
              {compatibleDoses.map((dose) => { const source = doseSource(dose); return <option key={dose.id} value={dose.id}>{source.label} • {dose.indication || 'Uso cadastrado'} • {dose.dose_value}{dose.dose_max != null ? `–${dose.dose_max}` : ''} {normalizeDoseUnit(dose.dose_unit).canonical}</option>; })}
            </select>
            {selectedDose ? <div className="flex flex-wrap items-center gap-2 text-xs"><span className={`rounded-full px-2.5 py-1 font-bold ${selectedSource?.type === 'plumbs' ? 'bg-sky-500/10 text-sky-700' : selectedSource?.type === 'leaflet' ? 'bg-emerald-500/10 text-emerald-700' : 'bg-amber-500/10 text-amber-700'}`}>{selectedSource?.label}</span><span>{selectedDose.route} • {selectedDose.frequency_text || selectedDose.frequency || 'frequência não cadastrada'}</span>{sourceUrl ? <a href={sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary">Abrir fonte <ExternalLink className="h-3 w-3" /></a> : null}</div> : null}
          </div>

          {selectedDose ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {basis === 'weight_based' ? <label className="space-y-2"><FieldLabel>Peso para cálculo</FieldLabel><div className="flex h-11 items-center rounded-xl border border-border bg-muted/35 px-3 text-sm">{parsedWeight ? `${formatDecimalPtBr(parsedWeight)} kg` : 'Informe o peso no início da receita'}</div></label> : null}
              <label className="space-y-2"><FieldLabel>Dose para o cálculo ({normalizeDoseUnit(selectedDose.dose_unit).canonical})</FieldLabel><input type="number" min="0" step="0.001" value={doseValue} onChange={(event) => { setDoseValue(event.target.value); setRoundingConfirmed(false); }} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm" /></label>
              <label className="space-y-2"><FieldLabel>Frequência</FieldLabel><input value={frequency} onChange={(event) => setFrequency(event.target.value)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm" placeholder="Ex.: a cada 12 horas" /></label>
              <label className="space-y-2"><FieldLabel>Duração</FieldLabel><input value={duration} onChange={(event) => setDuration(event.target.value)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm" placeholder="Ex.: 7 dias" /></label>
              {lateralityTarget ? <label className="space-y-2 sm:col-span-2"><FieldLabel>Lateralidade — {lateralityTarget}</FieldLabel><select value={laterality} onChange={(event) => setLaterality(event.target.value as Laterality)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"><option value="">Selecionar</option><option value="direito">Direito</option><option value="esquerdo">Esquerdo</option><option value="ambos">Ambos</option><option value="afetado">Afetado</option></select></label> : basis === 'per_application_site' ? <label className="space-y-2 sm:col-span-2"><FieldLabel>Local de aplicação</FieldLabel><input value={applicationSite} onChange={(event) => setApplicationSite(event.target.value)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm" placeholder="Ex.: camada fina na área afetada" /></label> : null}
            </div>
          ) : null}

          {calculation ? (
            <section className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="grid gap-3 sm:grid-cols-3"><div><FieldLabel>Dose total calculada</FieldLabel><p className="mt-1 text-lg font-bold">{formatDecimalPtBr(calculation.totalDose)} {calculation.totalDoseUnit}</p></div>{calculation.exactAmount != null ? <div><FieldLabel>Quantidade exata</FieldLabel><p className="mt-1 text-lg font-bold">{formatDecimalPtBr(calculation.exactAmount)} {calculation.administrationUnit}</p></div> : null}{calculation.practicalAmount != null ? <div><FieldLabel>Quantidade prática sugerida</FieldLabel><p className="mt-1 text-lg font-bold text-primary">{formatDecimalPtBr(calculation.practicalAmount)} {calculation.administrationUnit}</p></div> : null}</div>
              {calculation.actualDosePerBasis != null && basis === 'weight_based' ? <p className="mt-3 text-xs text-muted-foreground">Dose real após arredondamento: <strong>{formatDecimalPtBr(calculation.actualDosePerBasis)} {calculation.totalDoseUnit}/kg</strong> • diferença {formatDecimalPtBr(calculation.percentDifference || 0)}%</p> : null}
              {calculation.blockedReason ? <p className="mt-3 flex gap-2 rounded-lg border border-rose-500/25 bg-rose-500/10 p-3 text-xs text-rose-700"><AlertTriangle className="h-4 w-4 shrink-0" />{calculation.blockedReason}</p> : null}
              {calculation.warning ? <p className="mt-3 flex gap-2 rounded-lg border border-amber-500/25 bg-amber-500/10 p-3 text-xs text-amber-800"><AlertTriangle className="h-4 w-4 shrink-0" />{calculation.warning}</p> : null}
              {calculation.requiresConfirmation ? <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3 text-xs"><input type="checkbox" checked={roundingConfirmed} onChange={(event) => setRoundingConfirmed(event.target.checked)} /><span>Confirmo a quantidade prática arredondada e revisei a dose real.</span></label> : null}
            </section>
          ) : null}

          <section className="space-y-3 rounded-xl border border-border p-4">
            <div><FieldLabel>Orientações e cuidados importantes</FieldLabel><p className="mt-1 text-xs text-muted-foreground">Importadas do cadastro canônico; você pode retirar ou complementar nesta receita.</p></div>
            {precautions.map((item) => <div key={item.id} className="flex items-start gap-2 rounded-lg bg-muted/40 p-3 text-xs"><BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /><span className="flex-1">{item.text}<small className="mt-1 block text-muted-foreground">Origem: {item.sourceLabel}</small></span><button type="button" onClick={() => setPrecautions((current) => current.filter((entry) => entry.id !== item.id))} className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-background" aria-label="Remover orientação"><X className="h-3.5 w-3.5" /></button></div>)}
            <div className="flex gap-2"><input value={extraPrecaution} onChange={(event) => setExtraPrecaution(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addPrecaution(); } }} className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-xs" placeholder="Adicionar orientação específica" /><button type="button" onClick={addPrecaution} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border" aria-label="Adicionar orientação"><Plus className="h-4 w-4" /></button></div>
          </section>

          <button type="button" disabled={!canInsert} onClick={insert} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-45"><CheckCircle2 className="h-4 w-4" />Inserir medicamento na receita</button>
        </>
      )}
    </div>
  );
}
