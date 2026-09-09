import { prescriptionDurationClause as durationClause, inferPrescriptionDurationPreset as inferDurationPreset } from '../../utils/prescriptionSchedule';
import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, ExternalLink, FileInput, Loader2, Pill, Plus, Search, X } from 'lucide-react';
import {
  type MedicationPresentationRecord,
  type MedicationSearchResult,
  type RecommendedDose,
} from '../../../../src/lib/clinicRecords';
import type { PrescriptionMedicationSnapshot } from '../../types/receituario';
import {
  calculateReceituarioDose,
  formatAdministrationAmount,
  formatDecimalPtBr,
  formatRecommendedDoseUnit,
  isSpeciesCompatible,
  resolveAdministrationBasis,
} from '../../utils/receituarioDoseEngine';
import {
  extractPrescriptionConcentration,
  formatPracticalAmountWithFraction,
  formatPrescriptionFrequency,
  formatPrescriptionMedicationHeader,
  formatPrescriptionRoute,
  normalizePrescriptionRouteToOption,
  normalizePrescriptionSpecies,
  parsePositiveDecimal,
  prescriptionReadyDuration,
  prescriptionPharmaceuticalFormLabel,
  OUTPATIENT_PRESCRIPTION_ROUTES,
} from '../../utils/receituarioMedication';
import { CLINICAL_DOSE_LABEL } from '../../utils/receituarioTemplateCalculator';
import {
  getPrescriptionMedicationPresentations,
  getPrescriptionMedicationRecommendedDoses,
  searchPrescriptionMedicationCatalog,
} from '../../services/receituarioCatalogService';
import { buildCatalogPresentationCommercialResults, buildCommercialProductRecommendedDoses, isKnownInjectionOnlyPrescriptionQuery, searchPrescriptionCommercialProducts } from '../../services/receituarioCommercialCatalogService';
import {
  RECEITUARIO_COMMERCIAL_CLASS_OPTIONS,
  RECEITUARIO_COMMERCIAL_SUBCLASS_LABELS,
  RECEITUARIO_SUBCLASSES_BY_CLASS,
} from '../../data/receituarioCommercialTaxonomy';
import type { CommercialMedicationClass, CommercialMedicationSubclass } from '../../types/commercialMedication';
import { matchesExactMedicationSearch, medicationMatchesCommercialProducts, medicationSearchScore } from '../../utils/medicationSearch';
import {
  isInjectablePrescriptionText,
  isTakeHomePresentationRecord,
  isTakeHomePrescriptionRoute,
} from '../../utils/receituarioTakeHome';

interface Props {
  clinicId?: string | null;
  species?: string;
  weightKg?: string;
  onInsert: (medicationBlock: string, snapshot: PrescriptionMedicationSnapshot) => void;
  editingSnapshot?: PrescriptionMedicationSnapshot | null;
  onUpdate?: (oldBlockText: string, newBlockText: string, updatedSnapshot: PrescriptionMedicationSnapshot) => void;
  onCancelEdit?: () => void;
  addedSnapshots?: PrescriptionMedicationSnapshot[];
  onRemoveSnapshot?: (snapshot: PrescriptionMedicationSnapshot) => void;
  onEditSnapshot?: (snapshot: PrescriptionMedicationSnapshot) => void;
}

type Laterality = '' | 'direito' | 'esquerdo' | 'ambos' | 'afetado';
type FrequencyPreset = '' | 'single' | '2' | '4' | '6' | '8' | '12' | '24' | 'custom';
type DurationPreset = '' | 'continuous' | 'reevaluation' | 'days' | 'weeks' | 'months' | 'administrations' | 'custom';
type CommercialDoseEntry = { title?: string; dose?: string; note?: string };
type CommercialDosageGuidance = { labelDose?: string; plumbs?: Partial<Record<'dog' | 'cat', CommercialDoseEntry[]>> };
type DoseFollowUpPhase = { doseValue: number; frequency: string; duration: string; route?: string };

const FREQUENCY_OPTIONS: Array<{ value: FrequencyPreset; label: string; text: string }> = [
  { value: '', label: 'Selecionar frequência', text: '' },
  { value: 'single', label: 'Dose única', text: 'em dose única' },
  ...['2', '4', '6', '8', '12', '24'].map((hours) => ({
    value: hours as FrequencyPreset,
    label: `A cada ${hours} horas`,
    text: `a cada ${hours} horas`,
  })),
  { value: 'custom', label: 'Escrever outra frequência', text: '' },
];

function inferFrequencyPreset(value: string): FrequencyPreset {
  const normalized = normalize(value);
  if (/dose unica|uma unica vez/.test(normalized)) return 'single';
  const hours = normalized.match(/cada\s+(2|4|6|8|12|24)\s*h(?:ora)?s?/i)?.[1];
  return hours ? hours as FrequencyPreset : value.trim() ? 'custom' : '';
}

function durationText(preset: DurationPreset, quantity: string): string {
  if (preset === 'continuous') return 'uso contínuo';
  if (preset === 'reevaluation') return 'até reavaliação clínica';
  const amount = Number(quantity);
  if (!Number.isFinite(amount) || amount <= 0) return '';
  if (preset === 'days') return `${quantity} ${amount === 1 ? 'dia' : 'dias'}`;
  if (preset === 'weeks') return `${quantity} ${amount === 1 ? 'semana' : 'semanas'}`;
  if (preset === 'months') return `${quantity} ${amount === 1 ? 'mês' : 'meses'}`;
  if (preset === 'administrations') return `${quantity} ${amount === 1 ? 'administração' : 'administrações'}`;
  return '';
}

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

function searchableActiveIngredient(entry: MedicationSearchResult): string {
  const activeIngredient = metadataText(entry, 'active_ingredient', 'activeIngredient');
  return normalize([
    activeIngredient,
    entry.name,
    ...metadataArray(entry, 'synonyms', 'active_ingredient_synonyms'),
    ...metadataArray(entry, 'trade_names'),
    ...metadataArray(entry, 'tags'),
    metadataText(entry, 'pharmacologic_class', 'category'),
  ].join(' '));
}

function commercialActiveIngredientNames(entry: MedicationSearchResult): string[] {
  const components = metadataArray(entry, 'active_components');
  const fallback = metadataText(entry, 'active_ingredient', 'activeIngredient');
  return (components.length ? components : [fallback])
    .map((component) => normalize(component.split(/\d/)[0] || component))
    .map((component) => component.replace(/\b(mg|mcg|g|ml|ui)\b.*$/i, '').trim())
    .filter((component) => component.length >= 3);
}

function doseFollowUpPhases(dose: RecommendedDose | null): DoseFollowUpPhase[] {
  const value = dose?.metadata?.follow_up_phases;
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const record = item as Record<string, unknown>;
    const doseValue = Number(record.doseValue);
    const frequency = String(record.frequency || '').trim();
    const duration = String(record.duration || '').trim();
    if (!Number.isFinite(doseValue) || doseValue <= 0 || !frequency || !duration) return [];
    const route = String(record.route || '').trim();
    return [{ doseValue, frequency, duration, route: route || undefined }];
  });
}

function medicationMatchesActiveIngredient(entry: MedicationSearchResult, ingredients: string[]): boolean {
  const candidate = searchableActiveIngredient(entry);
  if (!candidate) return false;
  const candidateTokens = new Set(candidate.match(/[a-z0-9]+/g) || []);
  const ignored = new Set(['cloridrato', 'citrato', 'sodico', 'sodica', 'di', 'hidratado', 'monoidratado']);
  return ingredients.some((ingredient) => {
    if (candidate.includes(ingredient) || ingredient.includes(candidate)) return true;
    const meaningful = ingredient.split(/[^a-z0-9]+/).filter((token: string) => token.length >= 5 && !ignored.has(token));
    return meaningful.some((token) => candidateTokens.has(token));
  });
}

function embeddedCommercialPresentations(entry: MedicationSearchResult): MedicationPresentationRecord[] {
  const value = entry.metadata?.structured_presentations;
  return Array.isArray(value) ? value as MedicationPresentationRecord[] : [];
}

function uniqueRecordsById<T extends { id?: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item, index) => {
    const key = item.id || `index:${index}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function prescriptionActiveIngredientLabel(entry: MedicationSearchResult): string {
  const components = metadataArray(entry, 'active_components');
  const fallback = metadataText(entry, 'active_ingredient', 'activeIngredient') || entry.name;
  const cleaned = (components.length ? components : fallback.split(/\s*\+\s*/))
    .flatMap((component) => component.split(/\s*\+\s*/))
    .map((component) => component.replace(/\s+\d+(?:[.,]\d+)?\s*(?:mcg|µg|ug|mg|g|mL|ml|UI|U|%).*$/i, '').trim())
    .filter(Boolean);
  const unique = Array.from(new Map(cleaned.map((item) => [normalize(item), item])).values());
  return unique.join(' + ') || fallback;
}

function medicationPrescriptionHeader(
  entry: MedicationSearchResult,
  presentation?: MedicationPresentationRecord | null,
  fallbackPresentation = '',
): string {
  const isCommercial = isCommercialSearchResult(entry);
  const presentationText = [
    fallbackPresentation,
    presentation?.commercial_name,
    presentation?.pharmaceutical_form,
    presentation?.concentration_text,
  ].filter(Boolean).join(' — ');
  return formatPrescriptionMedicationHeader({
    medicationName: isCommercial
      ? prescriptionActiveIngredientLabel(entry)
      : metadataText(entry, 'active_ingredient', 'activeIngredient') || entry.name,
    commercialName: isCommercial ? entry.name : presentation?.commercial_name,
    concentration: presentation?.concentration_text || extractPrescriptionConcentration(presentationText),
    pharmaceuticalForm: presentation?.pharmaceutical_form || prescriptionPharmaceuticalFormLabel(presentationText),
  });
}

function isCommercialSearchResult(entry: MedicationSearchResult): boolean {
  return entry.metadata?.search_result_type === 'commercial' || entry.id.startsWith('commercial:');
}

function commercialSpeciesDescription(entry: MedicationSearchResult): string {
  const species = metadataArray(entry, 'species');
  if (species.includes('dog') && species.includes('cat')) return 'cães e gatos';
  if (species.includes('dog')) return 'cães';
  if (species.includes('cat')) return 'gatos';
  return 'espécie não informada';
}

function isCommercialSpeciesMismatch(entry: MedicationSearchResult, species: 'dog' | 'cat' | null): boolean {
  if (!species) return false;
  const supportedSpecies = metadataArray(entry, 'species');
  return supportedSpecies.length > 0 && !supportedSpecies.includes(species);
}

function manualInstructionSentence(instructionValue: string, route: string): string {
  const instruction = instructionValue.trim().replace(/[.\s]+$/, '');
  if (!instruction) return '';
  if (/^(administrar|aplicar|instilar|pingar|lavar|banhar|oferecer|dar|usar)\b/i.test(instruction)) {
    return instruction.charAt(0).toUpperCase() + instruction.slice(1);
  }
  const action = /oftalm|otolog|nasal/.test(normalize(route)) ? 'Instilar' : /topic|pele/.test(normalize(route)) ? 'Aplicar' : 'Administrar';
  return `${action} ${instruction}`;
}

function inferCommercialRoute(entry: MedicationSearchResult): string {
  const text = normalize([
    entry.name,
    ...metadataArray(entry, 'presentation_labels'),
    metadataText(entry, 'label_directions'),
  ].join(' '));
  if (/oftalm|colirio|ocular|olho/.test(text)) return 'oftálmica';
  if (/otolog|ótico|auricular|ouvido/.test(text)) return 'otológica';
  if (/shampoo|xampu|pomada|creme|gel|spray|topico|pele/.test(text)) return 'tópica';
  if (/nasal|narina/.test(text)) return 'nasal';
  if (/comprim|capsul|solucao oral|suspensão oral|via oral/.test(text)) return 'oral';
  return 'tópica';
}

function commercialBulaGuidance(entry: MedicationSearchResult): string {
  const dosage = entry.metadata?.dosage_guidance as CommercialDosageGuidance | null | undefined;
  const values = [dosage?.labelDose, metadataText(entry, 'label_directions')]
    .map((value) => String(value || '').trim())
    .filter(Boolean);
  return Array.from(new Set(values)).join('\n');
}

function commercialPlumbsGuidance(entry: MedicationSearchResult, species: 'dog' | 'cat' | null): string {
  const dosage = entry.metadata?.dosage_guidance as CommercialDosageGuidance | null | undefined;
  const entries = species ? dosage?.plumbs?.[species] || [] : [];
  if (entries.length) {
    return entries.map((item) => [item.title ? `${item.title}:` : '', item.dose, item.note].filter(Boolean).join(' ')).join('\n');
  }
  return metadataText(entry, 'plumbs_context');
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

export function PrescriptionMedicationComposer({
  clinicId,
  species,
  weightKg,
  onInsert,
  editingSnapshot,
  onUpdate,
  onCancelEdit,
  addedSnapshots,
  onRemoveSnapshot,
  onEditSnapshot,
}: Props) {
  const catalogClinicId = clinicId || '00000000-0000-0000-0000-000000000000';
  const normalizedSpecies = normalizePrescriptionSpecies(species);
  const parsedWeight = parsePositiveDecimal(weightKg);
  const [catalog, setCatalog] = useState<MedicationSearchResult[]>([]);
  const [commercialResults, setCommercialResults] = useState<MedicationSearchResult[]>([]);
  const [catalogCommercialResults, setCatalogCommercialResults] = useState<MedicationSearchResult[]>([]);
  const [commercialLoading, setCommercialLoading] = useState(false);
  const [injectionOnlyQuery, setInjectionOnlyQuery] = useState(false);
  const [commercialClass, setCommercialClass] = useState<CommercialMedicationClass | ''>('');
  const [commercialSubclass, setCommercialSubclass] = useState<CommercialMedicationSubclass | ''>('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<MedicationSearchResult | null>(null);
  const [presentations, setPresentations] = useState<MedicationPresentationRecord[]>([]);
  const [doses, setDoses] = useState<RecommendedDose[]>([]);
  const [doseId, setDoseId] = useState('');
  const [manualDoseChosen, setManualDoseChosen] = useState(false);
  const [presentationId, setPresentationId] = useState('');
  const [doseValue, setDoseValue] = useState('');
  const [frequency, setFrequency] = useState('');
  const [frequencyPreset, setFrequencyPreset] = useState<FrequencyPreset>('');

  const [duration, setDuration] = useState('');
  const [durationPreset, setDurationPreset] = useState<DurationPreset>('');
  const [durationQuantity, setDurationQuantity] = useState('');
  const [laterality, setLaterality] = useState<Laterality>('');
  const [applicationSite, setApplicationSite] = useState('');
  const [manualInstruction, setManualInstruction] = useState('');
  const [manualPresentation, setManualPresentation] = useState('');
  const [manualAdditionalInstructions, setManualAdditionalInstructions] = useState('');
  const [manualRoute, setManualRoute] = useState('');
  const [manualRouteCustom, setManualRouteCustom] = useState('');
  const [manualTarget, setManualTarget] = useState('');
  const [roundingConfirmed, setRoundingConfirmed] = useState(false);
  const [tabletDivisibility, setTabletDivisibility] = useState<'auto' | '0.25' | '0.5' | '1'>('auto');
  const [rawBlockEdit, setRawBlockEdit] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    void searchPrescriptionMedicationCatalog(catalogClinicId, '', 4000).then((items) => {
      if (active) setCatalog(items);
    }).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [catalogClinicId]);

  const activeIngredientResults = useMemo(() => {
    const needle = normalize(query.trim());
    const ranked = catalog
      .map((item) => ({ item, score: normalize(item.name) === needle ? -1 : medicationSearchScore(needle, searchableActiveIngredient(item)) }))
      .filter((entry): entry is { item: MedicationSearchResult; score: number } => entry.score !== null)
      .sort((left, right) => left.score - right.score || left.item.name.localeCompare(right.item.name, 'pt-BR'));
    if (needle.length < 2) return catalog;
    const exactMatches = ranked.filter(({ item }) => matchesExactMedicationSearch(needle, searchableActiveIngredient(item)));
    return (exactMatches.length ? exactMatches : ranked)
      .map(({ item }) => item);
  }, [catalog, query]);

  const availableCommercialSubclasses = useMemo(
    () => commercialClass ? RECEITUARIO_SUBCLASSES_BY_CLASS[commercialClass] : [],
    [commercialClass],
  );

  useEffect(() => {
    const needle = query.trim();
    const browsingByClass = Boolean(commercialClass);
    if (!browsingByClass && needle.length < 2) {
      setCommercialResults([]);
      setInjectionOnlyQuery(false);
      setCommercialLoading(false);
      return;
    }

    let active = true;
    setCommercialResults([]);
    setCommercialLoading(true);
    const timer = window.setTimeout(() => {
      void Promise.all([
        searchPrescriptionCommercialProducts({
          query: needle,
          commercialClass,
          commercialSubclass,
          species: normalizedSpecies,
        }),
        browsingByClass ? Promise.resolve(false) : isKnownInjectionOnlyPrescriptionQuery(needle),
      ])
        .then(([items, injectionOnly]) => {
          if (!active) return;
          setCommercialResults(items);
          setInjectionOnlyQuery(injectionOnly);
        })
        .finally(() => { if (active) setCommercialLoading(false); });
    }, 180);
    return () => { active = false; window.clearTimeout(timer); };
  }, [commercialClass, commercialSubclass, normalizedSpecies, query]);

  useEffect(() => {
    const needle = query.trim();
    if (needle.length < 2 || commercialClass) {
      setCatalogCommercialResults([]);
      return;
    }

    // Não mantém apresentações da consulta anterior enquanto a nova é resolvida.
    setCatalogCommercialResults([]);

    const candidates = activeIngredientResults
      .filter((item) => !item.id.startsWith('manual:'));
    if (!candidates.length) {
      setCatalogCommercialResults([]);
      return;
    }

    let active = true;
    const groups: MedicationSearchResult[][] = Array.from({ length: candidates.length }, () => []);
    let nextCandidate = 0;
    const worker = async () => {
      while (active) {
        const candidateIndex = nextCandidate;
        nextCandidate += 1;
        if (candidateIndex >= candidates.length) return;
        const medication = candidates[candidateIndex];
        try {
          const nextPresentations = await getPrescriptionMedicationPresentations(catalogClinicId, medication.id);
          groups[candidateIndex] = buildCatalogPresentationCommercialResults(medication, nextPresentations);
        } catch {
          groups[candidateIndex] = [];
        }
      }
    };
    void Promise.all(Array.from({ length: Math.min(8, candidates.length) }, () => worker())).then(() => {
      if (active) setCatalogCommercialResults(groups.flat());
    });
    return () => { active = false; };
  }, [activeIngredientResults, catalogClinicId, commercialClass, query]);

  const activeResults = useMemo(() => {
    const filtered = commercialClass
      ? activeIngredientResults.filter((item) => medicationMatchesCommercialProducts(item, commercialResults))
      : activeIngredientResults;
    return filtered;
  }, [activeIngredientResults, commercialClass, commercialResults, query]);
  const productResults = useMemo(() => {
    const byName = new Map<string, MedicationSearchResult>();
    [...commercialResults, ...catalogCommercialResults].forEach((item) => {
      const key = normalize(item.name);
      const isCatalogPresentation = item.metadata?.search_origin === 'catalog_presentation';
      const alreadyRepresentedByProduct = isCatalogPresentation && Array.from(byName.keys())
        .some((productName) => key === productName || key.startsWith(`${productName} `));
      if (alreadyRepresentedByProduct) return;
      if (!byName.has(key)) byName.set(key, item);
    });
    return Array.from(byName.values());
  }, [catalogCommercialResults, commercialResults]);
  const results = [...activeResults, ...productResults];
  const searchIsOpen = query.trim().length >= 2 || Boolean(commercialClass);

  useEffect(() => {
    if (!selected) return;
    let active = true;
    setLoading(true);
    setManualDoseChosen(false);
    const isCommercial = isCommercialSearchResult(selected);
    const catalogRoutes = metadataArray(selected, 'routes');
    const route = isCommercial ? inferCommercialRoute(selected) : catalogRoutes.length === 1 ? catalogRoutes[0] : '';
    setManualRoute(isTakeHomePrescriptionRoute(route) ? route : '');
    setManualRouteCustom('');
    setManualPresentation('');
    setManualAdditionalInstructions('');
    setManualInstruction('');
    setFrequency('');
    setFrequencyPreset('');
    setDuration('');
    setDurationPreset('');
    setDurationQuantity('');

    // Try finding catalog entry for active ingredient if commercial product
    const activeName = isCommercial
      ? metadataText(selected, 'active_ingredient', 'activeIngredient') || selected.name
      : selected.name;
    const commercialActiveNames = isCommercial ? commercialActiveIngredientNames(selected) : [];
    const linkedCatalogMedicationId = isCommercial ? metadataText(selected, 'catalog_medication_id') : '';
    const catalogMatch = isCommercial
      ? catalog.find((item) => item.id === linkedCatalogMedicationId)
        || catalog.find((item) => medicationMatchesActiveIngredient(item, commercialActiveNames))
        || catalog.find((item) => searchableActiveIngredient(item).includes(normalize(activeName)))
      : selected;
    const targetId = linkedCatalogMedicationId || catalogMatch?.id || selected.id;
    const embeddedPresentations = isCommercial ? embeddedCommercialPresentations(selected) : [];
    const embeddedDoses = isCommercial ? buildCommercialProductRecommendedDoses(selected, normalizedSpecies) : [];

    const skipCatalogLookup = selected.id.startsWith('manual:') || (isCommercial && targetId === selected.id);
    Promise.all(skipCatalogLookup
      ? [Promise.resolve([] as MedicationPresentationRecord[]), Promise.resolve([] as RecommendedDose[])]
      : [
        getPrescriptionMedicationPresentations(catalogClinicId, targetId).catch(() => [] as MedicationPresentationRecord[]),
        getPrescriptionMedicationRecommendedDoses(catalogClinicId, targetId).catch(() => [] as RecommendedDose[]),
      ])
      .then(([nextPresentations, nextDoses]) => {
        if (!active) return;
        const matchingCommercialPresentations = isCommercial
          ? nextPresentations.filter((item) => {
            const presentationName = normalize(item.commercial_name || '');
            const selectedName = normalize(selected.name);
            return presentationName === selectedName || presentationName.startsWith(`${selectedName} `);
          })
          : [];
        const restoredPresentation = editingSnapshot?.presentationSnapshot as MedicationPresentationRecord | null | undefined;
        const restoredDose = editingSnapshot?.doseSnapshot as unknown as RecommendedDose | null | undefined;
        const visiblePresentations = uniqueRecordsById([
          ...(restoredPresentation && isTakeHomePresentationRecord(restoredPresentation) ? [restoredPresentation] : []),
          ...embeddedPresentations,
          ...(isCommercial && matchingCommercialPresentations.length ? matchingCommercialPresentations : nextPresentations),
        ]).filter(isTakeHomePresentationRecord);
        const visibleDoses = uniqueRecordsById([
          ...(restoredDose && isTakeHomePrescriptionRoute(restoredDose.route) ? [restoredDose] : []),
          ...embeddedDoses,
          ...nextDoses,
        ]).filter((dose) => isTakeHomePrescriptionRoute(dose.route));
        setPresentations(visiblePresentations);
        setDoses(visibleDoses);
        const editingThisMedication = editingSnapshot && (
          editingSnapshot.medicationId === selected.id
          || normalize(editingSnapshot.activeIngredient) === normalize(activeName)
          || commercialActiveNames.some((ingredient) => normalize(editingSnapshot.activeIngredient).includes(ingredient))
        ) ? editingSnapshot : null;

        if (editingThisMedication) {
          const restoredPresentationId = visiblePresentations.some((item) => item.id === editingThisMedication.presentationId)
            ? editingThisMedication.presentationId || ''
            : visiblePresentations[0]?.id || '';
          setPresentationId(restoredPresentationId);
          setDoseId(editingThisMedication.doseId || 'manual');
          setManualDoseChosen(!editingThisMedication.doseId);
          setDoseValue(editingThisMedication.selectedDose > 0 ? String(editingThisMedication.selectedDose) : '');
          const restoredFrequency = formatPrescriptionFrequency(editingThisMedication.frequency || '');
          setFrequency(restoredFrequency);
          setFrequencyPreset(inferFrequencyPreset(restoredFrequency));
          setDuration(editingThisMedication.duration || '');
          setDurationPreset(inferDurationPreset(editingThisMedication.duration || ''));
          setDurationQuantity(editingThisMedication.duration?.match(/[\d.,]+/)?.[0] || '');
          setManualInstruction(editingThisMedication.manualInstruction || '');
          setManualPresentation(isInjectablePrescriptionText(editingThisMedication.manualPresentation) ? '' : editingThisMedication.manualPresentation || '');
          setManualAdditionalInstructions(editingThisMedication.manualAdditionalInstructions || '');
          setManualTarget(editingThisMedication.manualTarget || '');
          if (editingThisMedication.route && isTakeHomePrescriptionRoute(editingThisMedication.route)) {
            const norm = normalizePrescriptionRouteToOption(editingThisMedication.route);
            if (norm && norm !== 'outra') {
              setManualRoute(norm);
              setManualRouteCustom('');
            } else {
              setManualRoute('outra');
              setManualRouteCustom(editingThisMedication.route);
            }
          }
        } else {
          setPresentationId(visiblePresentations[0]?.id || '');
        }

      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [catalog, catalogClinicId, editingSnapshot, normalizedSpecies, selected]);

  const compatibleDoses = useMemo(
    () => normalizedSpecies ? doses.filter((dose) => (
      isSpeciesCompatible(dose.species, normalizedSpecies)
      && dose.metadata?.calculator_enabled !== false
      && isTakeHomePrescriptionRoute(dose.route)
    )) : [],
    [doses, normalizedSpecies],
  );
  const selectedDose = compatibleDoses.find((dose) => dose.id === doseId);
  const selectedPresentation = presentations.find((item) => item.id === presentationId);
  const commercialSelection = selected ? isCommercialSearchResult(selected) : false;
  const commercialSpeciesMismatch = selected && commercialSelection
    ? isCommercialSpeciesMismatch(selected, normalizedSpecies)
    : false;
  const commercialPresentations = selected ? metadataArray(selected, 'presentation_labels') : [];
  const bulaGuidance = selected && commercialSelection ? commercialBulaGuidance(selected) : '';
  const plumbsGuidance = selected && commercialSelection ? commercialPlumbsGuidance(selected, normalizedSpecies) : '';
  const commercialPrescriptionExample = selected && commercialSelection ? metadataText(selected, 'prescription_example') : '';
  const commercialLabelUrl = selected && commercialSelection ? metadataText(selected, 'label_url') : '';
  const commercialSourceUrl = commercialLabelUrl || (selected && commercialSelection ? metadataText(selected, 'product_page_url') : '');
  const basis = selectedDose ? resolveAdministrationBasis(selectedDose) : null;
  const selectedSource = selectedDose ? doseSource(selectedDose) : null;
  const lateralityTarget = selectedDose ? routeNeedsLaterality(selectedDose.route) : null;

  useEffect(() => {
    const first = compatibleDoses[0];
    if (!first) { setDoseId('manual'); return; }
    if (doseId === 'manual' && manualDoseChosen) return;
    if (!compatibleDoses.some((dose) => dose.id === doseId)) setDoseId(first.id || '');
  }, [compatibleDoses, doseId, manualDoseChosen]);

  useEffect(() => {
    if (!selectedDose) return;
    const restoring = editingSnapshot?.doseId === selectedDose.id ? editingSnapshot : null;
    const initial = restoring?.selectedDose
      ?? selectedDose.calculator_default_dose
      ?? (selectedDose.dose_max == null || selectedDose.dose_max === selectedDose.dose_value
        ? selectedDose.dose_value
        : null);
    const nextFrequency = formatPrescriptionFrequency(restoring?.frequency || selectedDose.frequency_text || selectedDose.frequency || '');
    const nextDuration = restoring?.duration || prescriptionReadyDuration(selectedDose.duration);
    setDoseValue(initial == null ? '' : String(initial));
    setFrequency(nextFrequency);
    setFrequencyPreset(inferFrequencyPreset(nextFrequency));
    setDuration(nextDuration);
    setDurationPreset(inferDurationPreset(nextDuration));
    setDurationQuantity(nextDuration.match(/[\d.,]+/)?.[0] || '');
    setRoundingConfirmed(false);
    setLaterality('');
    const initialRoute = restoring?.route || selectedDose.route || '';
    const normRoute = normalizePrescriptionRouteToOption(initialRoute);
    if (normRoute && normRoute !== 'outra') {
      setManualRoute(normRoute);
      setManualRouteCustom('');
    } else if (initialRoute) {
      setManualRoute('outra');
      setManualRouteCustom(initialRoute);
    } else {
      setManualRoute('');
      setManualRouteCustom('');
    }
  }, [editingSnapshot, selectedDose?.id]);

  useEffect(() => {
    const linkedPresentationId = String(selectedDose?.metadata?.presentation_id || '').trim();
    const linkedConcentrationId = String(selectedDose?.metadata?.presentation_concentration_id || '').trim();
    if (!linkedPresentationId || !presentations.length) return;
    const linkedPresentation = presentations.find((item) => (
      (item.id === linkedPresentationId || item.id.endsWith(`:${linkedPresentationId}`) || item.metadata?.seed_presentation_id === linkedPresentationId)
      && (!linkedConcentrationId || item.metadata?.seed_concentration_id === linkedConcentrationId)
    ));
    if (linkedPresentation) setPresentationId(linkedPresentation.id);
  }, [presentations, selectedDose?.id]);

  const isTabletPresentation = Boolean(
    selectedPresentation && (
      /comprim|tablet|dragea/i.test(selectedPresentation.pharmaceutical_form || '')
      || /comprim/i.test(selectedPresentation.presentation_unit || '')
      || /comprim/i.test(String(selectedPresentation.metadata?.presentation_unit || ''))
      || /comprim/i.test(selectedPresentation.concentration_text || '')
    )
  );

  const effectivePresentation = useMemo(() => {
    if (!selectedPresentation) return null;
    if (!isTabletPresentation) return selectedPresentation;
    let splitIncrement: number | null = null;
    if (tabletDivisibility === '0.25') {
      splitIncrement = 0.25;
    } else if (tabletDivisibility === '0.5') {
      splitIncrement = 0.5;
    } else if (tabletDivisibility === '1') {
      splitIncrement = 1;
    } else {
      const dbIncrement = Number(selectedPresentation.tablet_split_increment ?? selectedPresentation.metadata?.split_increment);
      if (Number.isFinite(dbIncrement) && dbIncrement > 0) {
        splitIncrement = dbIncrement;
      } else {
        splitIncrement = 0.25;
      }
    }
    return {
      ...selectedPresentation,
      tablet_split_increment: splitIncrement,
    };
  }, [isTabletPresentation, selectedPresentation, tabletDivisibility]);

  const selectedRouteOptionValue = useMemo(() => {
    const current = manualRoute || (selectedDose ? selectedDose.route : '');
    if (!current) return '';
    if (current === 'outra') return 'outra';
    const canonical = normalizePrescriptionRouteToOption(current);
    if (OUTPATIENT_PRESCRIPTION_ROUTES.some((opt) => opt.value === canonical)) {
      return canonical;
    }
    return 'outra';
  }, [manualRoute, selectedDose]);

  const resolvedManualRoute = (manualRoute === 'outra' ? manualRouteCustom.trim() : (manualRoute || (selectedDose ? selectedDose.route : ''))) || '';

  const parsedDoseValue = parsePositiveDecimal(doseValue);
  const calculation = useMemo(() => {
    if (!normalizedSpecies || !selectedDose || !parsedDoseValue) return null;
    return calculateReceituarioDose({
      species: normalizedSpecies,
      weightKg: parsedWeight,
      dose: { ...selectedDose, route: resolvedManualRoute || selectedDose.route },
      selectedDoseValue: parsedDoseValue,
      presentation: effectivePresentation,
    });
  }, [normalizedSpecies, parsedDoseValue, parsedWeight, selectedDose, effectivePresentation, resolvedManualRoute]);
  const followUpCalculations = useMemo(() => {
    if (!normalizedSpecies || !selectedDose) return [];
    return doseFollowUpPhases(selectedDose).map((phase) => ({
      phase,
      calculation: calculateReceituarioDose({
        species: normalizedSpecies,
        weightKg: parsedWeight,
        dose: { ...selectedDose, route: phase.route || resolvedManualRoute || selectedDose.route },
        selectedDoseValue: phase.doseValue,
        presentation: effectivePresentation,
      }),
    }));
  }, [normalizedSpecies, parsedWeight, selectedDose, effectivePresentation, resolvedManualRoute]);

  const sourceUrl = selectedDose ? String(selectedDose.source_url || selectedDose.metadata?.source_url || selectedDose.metadata?.url || '') : '';
  const weightMissing = basis === 'weight_based' && !parsedWeight;
  const lateralityMissing = Boolean(lateralityTarget && !laterality);
  const manualMode = Boolean(selected && !selectedDose && doseId === 'manual');
  const manualSentence = manualInstructionSentence(manualInstruction, resolvedManualRoute);
  const manualProductPresentation = manualPresentation.trim()
    || (selectedPresentation ? presentationLabel(selectedPresentation) : commercialSelection ? commercialPresentations[0] || '' : '');
  const manualHeading = selected ? medicationPrescriptionHeader(selected, selectedPresentation, manualProductPresentation) : '';
  const manualTargetText = manualTarget.trim() ? ` em ${manualTarget.trim()}` : '';
  const manualAdministrationLine = manualSentence
    ? `${manualSentence}${resolvedManualRoute ? `, ${formatPrescriptionRoute(resolvedManualRoute)}` : ''}${manualTargetText}${frequency ? `, ${formatPrescriptionFrequency(frequency)}` : ''}${durationClause(duration)}.`
    : '';
  const manualPreviewLines = [
    manualHeading,
    manualAdministrationLine,
    manualAdditionalInstructions.trim() ? `Orientações: ${manualAdditionalInstructions.trim().replace(/[.\s]+$/, '')}.` : '',
  ].filter(Boolean);
  const hasInjectableHomeConflict = !isTakeHomePrescriptionRoute(resolvedManualRoute)
    || isInjectablePrescriptionText(manualPresentation)
    || Boolean(selectedPresentation && !isTakeHomePresentationRecord(selectedPresentation))
    || followUpCalculations.some((item) => !isTakeHomePrescriptionRoute(item.phase.route));
  const manualReady = manualMode && manualInstruction.trim() && resolvedManualRoute && frequency.trim() && duration.trim() && !hasInjectableHomeConflict;
  const followUpBlocked = followUpCalculations.some((item) => Boolean(item.calculation.blockedReason));
  const isDoseDifferenceWarning = Boolean(
    calculation?.blockedReason && /forneceria .* a mais do que a dose calculada|excede a tolerância/i.test(calculation.blockedReason)
  );
  const effectiveBlockedReason = isDoseDifferenceWarning ? undefined : calculation?.blockedReason;
  const requiresRoundingConfirmation = Boolean(
    calculation?.requiresConfirmation
    || isDoseDifferenceWarning
    || followUpCalculations.some((item) => item.calculation.requiresConfirmation)
  );
  const calculatedReady = selectedDose
    && parsedDoseValue
    && frequency.trim()
    && duration.trim()
    && calculation
    && !effectiveBlockedReason
    && !followUpBlocked
    && !weightMissing
    && !lateralityMissing
    && !hasInjectableHomeConflict
    && (!requiresRoundingConfirmation || roundingConfirmed);
  const canInsert = Boolean(selected && !loading && (manualReady || calculatedReady));

  const reset = () => {
    setSelected(null);
    setPresentationId('');
    setDoseId('');
    setDoseValue('');
    setFrequency('');
    setFrequencyPreset('');
    setDuration('');
    setDurationPreset('');
    setDurationQuantity('');
    setRoundingConfirmed(false);
    setTabletDivisibility('auto');
    setLaterality('');
    setApplicationSite('');
    setManualInstruction('');
    setManualPresentation('');
    setManualAdditionalInstructions('');
    setManualRoute('');
    setManualRouteCustom('');
    setManualTarget('');
  };

  const importCommercialPrescription = () => {
    if (!selected || !commercialSelection || !commercialPrescriptionExample) return;
    const productPresentation = selectedPresentation ? presentationLabel(selectedPresentation) : commercialPresentations[0] || '';
    const productHeading = medicationPrescriptionHeader(selected, selectedPresentation, productPresentation);
    onInsert(`${productHeading}\n${commercialPrescriptionExample.trim()}`, {
      medicationId: selected.id,
      medicationName: selected.name,
      activeIngredient: metadataText(selected, 'active_ingredient', 'activeIngredient') || selected.name,
      presentationId: selectedPresentation?.id || null,
      doseId: null,
      doseSourceType: 'other',
      doseSourceLabel: 'Receita prática do catálogo comercial',
      doseSourceUrl: commercialSourceUrl || null,
      doseUnit: 'modelo pronto',
      selectedDose: 0,
      precautions: [],
      rawBlockText: `${productHeading}\n${commercialPrescriptionExample.trim()}`,
      catalogEntrySnapshot: selected as unknown as Record<string, unknown>,
      presentationSnapshot: selectedPresentation as unknown as Record<string, unknown> || null,
    });
  };

  useEffect(() => {
    if (!editingSnapshot) return;
    setRawBlockEdit(editingSnapshot.rawBlockText || '');
    if (editingSnapshot.catalogEntrySnapshot) {
      setSelected(editingSnapshot.catalogEntrySnapshot as unknown as MedicationSearchResult);
      return;
    }
    if (!catalog.length && !editingSnapshot.medicationId.startsWith('manual:')) return;
    const match = catalog.find((item) => item.id === editingSnapshot.medicationId)
      || catalog.find((item) => searchableActiveIngredient(item).includes(normalize(editingSnapshot.activeIngredient)));
    if (match) {
      setSelected(match);
    } else {
      setSelected({
        id: editingSnapshot.medicationId,
        name: editingSnapshot.medicationName,
        is_controlled: false,
        is_private: false,
        metadata: { active_ingredient: editingSnapshot.activeIngredient },
      });
    }
  }, [catalog, editingSnapshot]);

  const insert = () => {
    if (!selected || !canInsert) return;

    if (manualMode) {
      const route = resolvedManualRoute;
      const lines = manualPreviewLines;
      const snapshot: PrescriptionMedicationSnapshot = {
        medicationId: selected.id,
        medicationName: selected.name,
        activeIngredient: metadataText(selected, 'active_ingredient', 'activeIngredient') || selected.name,
        presentationId: selectedPresentation?.id || null,
        doseId: null,
        doseSourceType: 'other',
        doseSourceLabel: 'Definida pelo médico-veterinário',
        doseSourceUrl: null,
        doseUnit: 'modo de uso',
        selectedDose: 0,
        precautions: [],
        rawBlockText: lines.join('\n'),
        frequency,
        duration,
        route,
        manualInstruction,
        manualPresentation,
        manualAdditionalInstructions,
        manualTarget,
        catalogEntrySnapshot: selected as unknown as Record<string, unknown>,
        presentationSnapshot: selectedPresentation as unknown as Record<string, unknown> || null,
      };

      if (editingSnapshot && onUpdate) {
        onUpdate(editingSnapshot.rawBlockText || '', lines.join('\n'), snapshot);
      } else {
        onInsert(lines.join('\n'), snapshot);
      }
      return;
    }


    if (!selectedDose || !calculation) return;
    const unit = formatRecommendedDoseUnit(selectedDose);
    const presentation = selectedPresentation ? presentationLabel(selectedPresentation) : 'Apresentação não selecionada';
    const amount = calculation.practicalAmount != null && calculation.administrationUnit
      ? formatPracticalAmountWithFraction(calculation.practicalAmount, calculation.administrationUnit)
      : `${formatDecimalPtBr(calculation.totalDose)} ${calculation.totalDoseUnit}`;
    const indicatedRange = selectedDose.dose_max != null
      ? `${formatDecimalPtBr(selectedDose.dose_value)} a ${formatDecimalPtBr(selectedDose.dose_max)} ${unit}`
      : `${formatDecimalPtBr(selectedDose.dose_value)} ${unit}`;
    const clinicalDose = `${CLINICAL_DOSE_LABEL} ${formatDecimalPtBr(parsedDoseValue)} ${unit} • Faixa indicada: ${indicatedRange}`;
    const target = lateralityTarget && laterality ? ` no ${lateralityTarget} ${laterality}` : applicationSite ? ` em ${applicationSite}` : '';
    const followUpLines = followUpCalculations.map(({ phase, calculation: phaseCalculation }) => {
      const phaseAmount = phaseCalculation.practicalAmount != null && phaseCalculation.administrationUnit
        ? formatPracticalAmountWithFraction(phaseCalculation.practicalAmount, phaseCalculation.administrationUnit)
        : `${formatDecimalPtBr(phaseCalculation.totalDose)} ${phaseCalculation.totalDoseUnit}`;
      return `Em seguida, administrar ${phaseAmount}${target}, ${formatPrescriptionRoute(phase.route || resolvedManualRoute || selectedDose.route || '')}, ${formatPrescriptionFrequency(phase.frequency)}${durationClause(phase.duration)}.`;
    });
    const lines = [
      medicationPrescriptionHeader(selected, selectedPresentation, presentation),
      `Administrar ${amount}${target}, ${formatPrescriptionRoute(resolvedManualRoute || selectedDose.route || '')}${frequency ? `, ${formatPrescriptionFrequency(frequency)}` : ''}${durationClause(duration)}.`,
      ...followUpLines,
      clinicalDose,
    ];
    const snapshot: PrescriptionMedicationSnapshot = {
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
      precautions: [],
      rawBlockText: lines.join('\n'),
      frequency,
      duration,
      route: resolvedManualRoute || selectedDose.route,
      catalogEntrySnapshot: selected as unknown as Record<string, unknown>,
      presentationSnapshot: selectedPresentation as unknown as Record<string, unknown> || null,
      doseSnapshot: selectedDose as unknown as Record<string, unknown>,
    };

    if (editingSnapshot && onUpdate) {
      onUpdate(editingSnapshot.rawBlockText || '', lines.join('\n'), snapshot);
    } else {
      onInsert(lines.join('\n'), snapshot);
    }
  };

  return (
    <div className="space-y-5" data-testid="prescription-medication-composer">
      {!normalizedSpecies ? <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm">Selecione cão ou gato antes de escolher o medicamento.</p> : null}

      {editingSnapshot ? (
        <div className="space-y-3 rounded-xl border border-sky-500/30 bg-sky-500/10 p-3 text-sm text-sky-900 dark:text-sky-100">
          <div className="flex items-center justify-between gap-3">
            <div>
              <strong className="block text-xs uppercase tracking-wider text-sky-700 dark:text-sky-300">Modo de edição de medicamento</strong>
              <span>Alterando: <strong>{editingSnapshot.medicationName}</strong></span>
            </div>
            {onCancelEdit ? (
              <button type="button" onClick={onCancelEdit} className="min-h-10 rounded-lg border border-sky-500/30 bg-background px-3 text-xs font-semibold text-foreground hover:bg-muted">
                Cancelar edição
              </button>
            ) : null}
          </div>
          <label className="block space-y-1.5">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">Texto deste medicamento na receita</span>
            <textarea
              value={rawBlockEdit}
              onChange={(event) => setRawBlockEdit(event.target.value)}
              rows={4}
              className="w-full resize-y rounded-xl border border-sky-500/30 bg-background p-3 text-sm leading-5 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              aria-label="Texto deste medicamento na receita"
            />
          </label>
          <div className="flex justify-end">
            <button
              type="button"
              disabled={!rawBlockEdit.trim() || !onUpdate}
              onClick={() => onUpdate?.(
                editingSnapshot.rawBlockText || '',
                rawBlockEdit.trim(),
                { ...editingSnapshot, rawBlockText: rawBlockEdit.trim() },
              )}
              className="min-h-10 rounded-lg bg-sky-700 px-4 text-xs font-bold text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Salvar alteração no medicamento
            </button>
          </div>
        </div>
      ) : null}

      {addedSnapshots && addedSnapshots.length > 0 && !selected ? (
        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Medicamentos adicionados nesta receita ({addedSnapshots.length})
            </h4>
          </div>
          <div className="grid gap-2">
            {addedSnapshots.map((item, index) => (
              <div key={`${item.medicationId}-${index}`} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/70 bg-muted/30 p-3 text-xs">
                <div>
                  <strong className="block text-sm">{item.medicationName}</strong>
                  <span className="text-muted-foreground">{item.activeIngredient} • {item.doseUnit} {item.selectedDose ? `(${item.selectedDose})` : ''}</span>
                </div>
                <div className="flex gap-2">
                  {onEditSnapshot ? (
                    <button type="button" onClick={() => onEditSnapshot(item)} className="inline-flex h-8 items-center gap-1 rounded-md border border-border bg-background px-2.5 text-xs font-semibold text-sky-700 hover:bg-sky-50 dark:text-sky-300 dark:hover:bg-sky-950/40">
                      Editar
                    </button>
                  ) : null}
                  {onRemoveSnapshot ? (
                    <button type="button" onClick={() => onRemoveSnapshot(item)} className="inline-flex h-8 items-center gap-1 rounded-md border border-border bg-background px-2.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950/40">
                      Remover
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {!selected ? (
        <div className="relative flex flex-col">
          <FieldLabel>1. Medicamento</FieldLabel>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" autoFocus
              placeholder="Busque princípio ativo, sinônimo ou nome comercial"
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            {loading || commercialLoading ? <Loader2 className="absolute right-3 top-3.5 h-4 w-4 animate-spin text-primary" /> : null}
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Digite o <strong className="font-semibold text-foreground">princípio ativo</strong> (ex.: pimobendan) ou o <strong className="font-semibold text-foreground">nome comercial</strong> (ex.: Vetmedin). A busca aceita pequenos erros de digitação.
          </p>
          <div className="order-2 mt-3 grid gap-3 rounded-xl border border-border/75 bg-muted/25 p-3 sm:grid-cols-2">
            <label className="space-y-1.5">
              <FieldLabel>Categoria / classe</FieldLabel>
              <select
                value={commercialClass}
                onChange={(event) => {
                  setCommercialClass(event.target.value as CommercialMedicationClass | '');
                  setCommercialSubclass('');
                }}
                className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
                aria-label="Categoria ou classe do medicamento"
              >
                <option value="">Buscar pelo nome</option>
                {RECEITUARIO_COMMERCIAL_CLASS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>
            <label className="space-y-1.5">
              <FieldLabel>Subcategoria</FieldLabel>
              <select
                value={commercialSubclass}
                onChange={(event) => setCommercialSubclass(event.target.value as CommercialMedicationSubclass | '')}
                disabled={!commercialClass}
                className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-55"
                aria-label="Subcategoria do medicamento"
              >
                <option value="">Todas as subcategorias</option>
                {availableCommercialSubclasses.map((subclass) => <option key={subclass} value={subclass}>{RECEITUARIO_COMMERCIAL_SUBCLASS_LABELS[subclass]}</option>)}
              </select>
            </label>
            <p className="text-xs text-muted-foreground sm:col-span-2">Se não souber o nome, escolha uma categoria e refine pela subcategoria.</p>
          </div>
          {searchIsOpen ? (
            <div className="order-1 mt-2 max-h-80 overflow-y-auto rounded-xl border border-border bg-card p-1.5 shadow-xl">
              {activeResults.length ? (
                <div className="flex items-center justify-between px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  <span>Medicamentos do catálogo</span><span>{activeResults.length}</span>
                </div>
              ) : null}
              {activeResults.map((item) => (
                <button key={item.id} type="button" onClick={() => { setSelected(item); setQuery(''); }}
                  className="flex min-h-14 w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <Pill className="h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0 flex-1">
                    <strong className="block truncate text-sm">{metadataText(item, 'active_ingredient', 'activeIngredient') || item.name}</strong>
                    <span className="block truncate text-xs text-muted-foreground">
                      {`${item.name}${metadataText(item, 'pharmacologic_class') ? ` • ${metadataText(item, 'pharmacologic_class')}` : ''}`}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">Princípio ativo</span>
                </button>
              ))}
              {productResults.length ? (
                <div className={`${activeResults.length ? 'mt-1 border-t border-border/70' : ''} flex items-center justify-between px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground`}>
                  <span>Apresentações e opções comerciais</span><span>{productResults.length}</span>
                </div>
              ) : null}
              {productResults.map((item) => (
                <button key={item.id} type="button" onClick={() => { setSelected(item); setQuery(''); }}
                  className="flex min-h-14 w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <Pill className="h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
                  <span className="min-w-0 flex-1">
                    <strong className="block truncate text-sm">{item.name}</strong>
                    <span className="block truncate text-xs text-muted-foreground">
                      {[metadataText(item, 'active_ingredient', 'activeIngredient'), metadataText(item, 'manufacturer')].filter(Boolean).join(' • ')}
                    </span>
                    {isCommercialSpeciesMismatch(item, normalizedSpecies) ? (
                      <span className="mt-0.5 block text-[11px] font-semibold text-amber-700 dark:text-amber-300">Cadastrado para {commercialSpeciesDescription(item)} • confirme o uso na espécie selecionada</span>
                    ) : null}
                  </span>
                  <span className="shrink-0 rounded-full border border-sky-500/20 bg-sky-500/10 px-2 py-1 text-[10px] font-bold text-sky-700 dark:text-sky-300">Nome comercial</span>
                </button>
              ))}
              {!loading && !commercialLoading && !results.length ? (
                <div className="p-4 text-center">
                  <p className="text-sm font-semibold text-foreground">Nenhum medicamento encontrado</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {injectionOnlyQuery
                      ? 'Este produto possui somente apresentação injetável e não pode ser incluído em uma receita para uso em casa.'
                      : 'Confira a escrita ou crie uma prescrição manual com o nome informado.'}
                  </p>
                  {query.trim().length >= 2 && !injectionOnlyQuery ? (
                    <button
                      type="button"
                      onClick={() => setSelected({
                        id: `manual:${normalize(query.trim()).replace(/[^a-z0-9]+/g, '-')}`,
                        name: query.trim(),
                        is_controlled: false,
                        is_private: true,
                        metadata: { active_ingredient: query.trim(), search_result_type: 'manual' },
                      })}
                      className="mt-3 inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-primary/25 bg-primary/10 px-4 text-xs font-semibold text-primary transition-colors duration-200 hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <Plus className="h-4 w-4" /> Usar &ldquo;{query.trim()}&rdquo; manualmente
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : loading ? (
        <div role="status" className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Carregando apresentações e doses do medicamento…
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between rounded-xl border border-primary/20 bg-primary/[0.05] p-4">
            <div><p className="text-xs font-bold uppercase tracking-wider text-primary">{isCommercialSearchResult(selected) ? 'Produto comercial selecionado' : 'Princípio ativo selecionado'}</p><p className="mt-1 font-semibold">{isCommercialSearchResult(selected) ? selected.name : metadataText(selected, 'active_ingredient', 'activeIngredient') || selected.name}</p><p className="text-xs text-muted-foreground">{isCommercialSearchResult(selected) ? [metadataText(selected, 'active_ingredient', 'activeIngredient'), metadataText(selected, 'manufacturer')].filter(Boolean).join(' • ') : selected.name}</p></div>
            <button type="button" onClick={reset} className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted" aria-label="Trocar medicamento"><X className="h-4 w-4" /></button>
          </div>

          {commercialSpeciesMismatch ? (
            <div className="flex gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-5 text-amber-900 dark:text-amber-100" role="status">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Este produto está cadastrado para <strong>{commercialSpeciesDescription(selected)}</strong>, mas continua visível por conter o fármaco pesquisado. Confirme a indicação antes de prescrever.</span>
            </div>
          ) : null}

          {commercialSelection ? (
            <div className="space-y-2 rounded-xl border border-sky-500/20 bg-sky-500/[0.06] p-4">
              <FieldLabel>Produto comercial selecionado</FieldLabel>
              <p className="text-sm font-semibold">{selected.name}</p>
              {commercialPresentations.length ? <p className="text-xs text-muted-foreground">{commercialPresentations.join(' • ')}</p> : null}
            </div>
          ) : null}

          {presentations.length ? (
            <div className="space-y-2">
              <FieldLabel>2. Apresentação comercial</FieldLabel>
              <select aria-label="Apresentação e concentração" value={presentationId} onChange={(event) => { setPresentationId(event.target.value); setRoundingConfirmed(false); }} className="min-h-11 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm">
                <option value="">Sem conversão por apresentação</option>
                {presentations.map((item) => <option key={item.id} value={item.id}>{presentationLabel(item)}</option>)}
              </select>
              {selectedPresentation ? <div className="grid gap-1 rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground sm:grid-cols-2"><span>Concentração: {selectedPresentation.concentration_text || 'não cadastrada'}</span><span>Forma: {selectedPresentation.pharmaceutical_form || 'não cadastrada'}</span><span>Fabricante: {String(selectedPresentation.metadata?.manufacturer || 'não cadastrado')}</span><span>Origem: {selectedPresentation.source === 'global' ? 'Catálogo global' : 'Clínica'}</span></div> : null}
            </div>
          ) : null}

          {isTabletPresentation ? (
            <div className="space-y-2 rounded-xl border border-border/80 bg-muted/20 p-3">
              <div className="flex items-center justify-between">
                <FieldLabel>Divisibilidade do comprimido</FieldLabel>
                <span className="text-xs text-muted-foreground">Arredondamento fracionado</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <button
                  type="button"
                  onClick={() => { setTabletDivisibility('0.25'); setRoundingConfirmed(false); }}
                  className={`h-9 rounded-lg border px-2 text-xs font-semibold transition-colors ${tabletDivisibility === '0.25' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background hover:bg-muted'}`}
                >
                  1/4 comp. (0,25)
                </button>
                <button
                  type="button"
                  onClick={() => { setTabletDivisibility('0.5'); setRoundingConfirmed(false); }}
                  className={`h-9 rounded-lg border px-2 text-xs font-semibold transition-colors ${tabletDivisibility === '0.5' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background hover:bg-muted'}`}
                >
                  1/2 comp. (0,5)
                </button>
                <button
                  type="button"
                  onClick={() => { setTabletDivisibility('1'); setRoundingConfirmed(false); }}
                  className={`h-9 rounded-lg border px-2 text-xs font-semibold transition-colors ${tabletDivisibility === '1' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background hover:bg-muted'}`}
                >
                  Inteiro (1,0)
                </button>
                <button
                  type="button"
                  onClick={() => { setTabletDivisibility('auto'); setRoundingConfirmed(false); }}
                  className={`h-9 rounded-lg border px-2 text-xs font-semibold transition-colors ${tabletDivisibility === 'auto' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background hover:bg-muted'}`}
                >
                  Automático (1/4)
                </button>
              </div>
            </div>
          ) : null}

          {!presentations.length && selected ? (
            <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.07] p-3 text-xs text-amber-800 dark:text-amber-200">
              Nenhuma apresentação estruturada foi encontrada. Use a prescrição manual assistida e informe a concentração.
            </div>
          ) : null}

          {commercialSelection && (bulaGuidance || plumbsGuidance) ? (
            <section className="grid gap-3 sm:grid-cols-2" aria-label="Referências de uso do produto comercial">
              {bulaGuidance ? (
                <article className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.07] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">Uso indicado em bula</p><p className="mt-1 text-[11px] text-muted-foreground">Confirme a espécie e a apresentação antes de prescrever.</p></div>
                    {commercialSourceUrl ? <a href={commercialSourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-lg border border-emerald-500/25 px-2 text-[11px] font-semibold text-emerald-700">{commercialLabelUrl ? 'Abrir bula' : 'Abrir fonte'} <ExternalLink className="h-3 w-3" /></a> : null}
                  </div>
                  <p className="mt-3 whitespace-pre-line text-sm leading-5">{bulaGuidance}</p>
                </article>
              ) : null}
              {plumbsGuidance ? (
                <article className="rounded-xl border border-sky-500/25 bg-sky-500/[0.07] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-sky-700">Uso descrito no Plumb&apos;s</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Referência para {normalizedSpecies === 'dog' ? 'cães' : normalizedSpecies === 'cat' ? 'gatos' : 'a espécie selecionada'}.</p>
                  <p className="mt-3 whitespace-pre-line text-sm leading-5">{plumbsGuidance}</p>
                </article>
              ) : null}
            </section>
          ) : null}

          {commercialPrescriptionExample ? (
            <section className="rounded-xl border border-violet-500/25 bg-violet-500/[0.06] p-4" aria-label="Receita pronta do produto comercial">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-violet-700">Como pode ficar na receita</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Importe o exemplo do catálogo e ajuste livremente no editor da receita.</p>
                </div>
                <button type="button" onClick={importCommercialPrescription} className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-600 px-3 text-xs font-semibold text-white hover:bg-violet-700">
                  <FileInput className="h-4 w-4" /> Importar para a receita
                </button>
              </div>
              <p className="mt-3 whitespace-pre-line rounded-lg border border-violet-500/15 bg-background/75 p-3 text-sm leading-5">{commercialPrescriptionExample}</p>
            </section>
          ) : null}

          {compatibleDoses.length ? (
            <div className="space-y-2">
              <FieldLabel>{commercialSelection ? 'Modo de prescrição' : '3. Dose ou modo de uso'}</FieldLabel>
              <select aria-label="Dose ou modo de uso" value={doseId} onChange={(event) => { setDoseId(event.target.value); setManualDoseChosen(event.target.value === 'manual'); }} className="min-h-11 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm">
                {compatibleDoses.map((dose) => <option key={dose.id} value={dose.id}>{dose.indication || 'Indicação não informada'} • {dose.dose_value}{dose.dose_max != null ? `–${dose.dose_max}` : ''} {formatRecommendedDoseUnit(dose)}</option>)}
                <option value="manual">Definir dose ou modo de uso manualmente</option>
              </select>
              {selectedDose ? <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><span>{selectedDose.route} • {selectedDose.frequency_text || selectedDose.frequency || 'frequência não cadastrada'}</span>{sourceUrl ? <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary">Abrir fonte <ExternalLink className="h-3 w-3" /></a> : null}</div> : null}
            </div>
          ) : (
            <div className="flex items-start gap-2 rounded-xl border border-border bg-muted/35 p-3 text-xs leading-5 text-muted-foreground">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <span><strong className="text-foreground">Sem dose estruturada no ConsultaVet.</strong> Preencha a prescrição manual assistida abaixo; nenhum valor será presumido pelo sistema.</span>
            </div>
          )}

          {selectedDose ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {basis === 'weight_based' ? <label className="space-y-2"><FieldLabel>Peso para cálculo</FieldLabel><div className="flex h-11 items-center rounded-xl border border-border bg-muted/35 px-3 text-sm">{parsedWeight ? `${formatDecimalPtBr(parsedWeight)} kg` : 'Informe o peso no início da receita'}</div></label> : null}
              <label className="space-y-2"><FieldLabel>Dose para o cálculo ({formatRecommendedDoseUnit(selectedDose)})</FieldLabel><input type="number" min="0" step="0.001" value={doseValue} onChange={(event) => { setDoseValue(event.target.value); setRoundingConfirmed(false); }} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm" /></label>
              <div className="space-y-2 sm:col-span-2">
                <FieldLabel>Via de administração</FieldLabel>
                <select
                  aria-label="Via de administração"
                  value={selectedRouteOptionValue}
                  onChange={(event) => {
                    const val = event.target.value;
                    setManualRoute(val);
                    if (val !== 'outra') setManualRouteCustom('');
                  }}
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
                >
                  <option value="">Selecionar via</option>
                  {OUTPATIENT_PRESCRIPTION_ROUTES.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {selectedRouteOptionValue === 'outra' ? (
                  <input
                    value={manualRouteCustom}
                    onChange={(event) => setManualRouteCustom(event.target.value)}
                    className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
                    placeholder="Descreva a via de administração (ex.: inalatória)"
                    aria-label="Outra via de administração"
                  />
                ) : null}
              </div>
              {lateralityTarget ? <label className="space-y-2 sm:col-span-2"><FieldLabel>Lateralidade — {lateralityTarget}</FieldLabel><select value={laterality} onChange={(event) => setLaterality(event.target.value as Laterality)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"><option value="">Selecionar</option><option value="direito">Direito</option><option value="esquerdo">Esquerdo</option><option value="ambos">Ambos</option><option value="afetado">Afetado</option></select></label> : basis === 'per_application_site' ? <label className="space-y-2 sm:col-span-2"><FieldLabel>Local de aplicação</FieldLabel><input value={applicationSite} onChange={(event) => setApplicationSite(event.target.value)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm" placeholder="Ex.: camada fina na área afetada" /></label> : null}
            </div>
          ) : null}

          {manualMode ? (
            <section className="space-y-5 rounded-xl border border-primary/25 bg-primary/[0.04] p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><FileInput className="h-4 w-4" /></span>
                <div>
                  <p className="text-sm font-semibold">Prescrição manual assistida</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">Use quando não houver apresentação ou dose cadastrada. O sistema organiza os campos e monta o texto, sem sugerir doses automaticamente.</p>
                </div>
              </div>
              <label className="block space-y-2">
                <FieldLabel>Apresentação ou concentração (opcional)</FieldLabel>
                <input value={manualPresentation} onChange={(event) => setManualPresentation(event.target.value)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Ex.: comprimido 5 mg, solução 10 mg/mL ou produto manipulado" />
              </label>
              <label className="block space-y-2">
                <FieldLabel>Quantidade por administração ou modo de usar</FieldLabel>
                <input value={manualInstruction} onChange={(event) => setManualInstruction(event.target.value)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Ex.: 1 comprimido, 0,5 mL, 2 gotas ou uma camada fina" />
                <span className="block text-[11px] text-muted-foreground">Não informe a frequência aqui; ela será escolhida separadamente abaixo.</span>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <FieldLabel>Via de administração</FieldLabel>
                  <select
                    aria-label="Via de administração"
                    value={selectedRouteOptionValue}
                    onChange={(event) => {
                      const val = event.target.value;
                      setManualRoute(val);
                      if (val !== 'outra') setManualRouteCustom('');
                    }}
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
                  >
                    <option value="">Selecionar via</option>
                    {OUTPATIENT_PRESCRIPTION_ROUTES.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <label className="space-y-2">
                  <FieldLabel>Local ou lateralidade (opcional)</FieldLabel>
                  <input value={manualTarget} onChange={(event) => setManualTarget(event.target.value)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm" placeholder="Ex.: ambos os ouvidos, olho direito, área afetada" />
                </label>
                {selectedRouteOptionValue === 'outra' ? (
                  <label className="space-y-2 sm:col-span-2">
                    <FieldLabel>Descreva a via</FieldLabel>
                    <input
                      value={manualRouteCustom}
                      onChange={(event) => setManualRouteCustom(event.target.value)}
                      className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
                      placeholder="Ex.: inalatória"
                      aria-label="Outra via de administração"
                    />
                  </label>
                ) : null}
              </div>
              <label className="block space-y-2">
                <FieldLabel>Orientação adicional (opcional)</FieldLabel>
                <textarea value={manualAdditionalInstructions} onChange={(event) => setManualAdditionalInstructions(event.target.value)} rows={2} className="min-h-20 w-full resize-y rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Ex.: oferecer cerca de 1 hora antes do alimento; agitar antes de usar" />
              </label>
            </section>
          ) : null}

          <section className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <FieldLabel>Frequência</FieldLabel>
              <select value={frequencyPreset} onChange={(event) => { const value = event.target.value as FrequencyPreset; setFrequencyPreset(value); const option = FREQUENCY_OPTIONS.find((item) => item.value === value); if (value !== 'custom') setFrequency(option?.text || ''); }} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm">
                {FREQUENCY_OPTIONS.map((option) => <option key={option.value || 'empty'} value={option.value}>{option.label}</option>)}
              </select>
              {frequencyPreset === 'custom' ? <input value={frequency} onChange={(event) => setFrequency(event.target.value)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm" placeholder="Ex.: duas vezes ao dia ou conforme necessidade" aria-label="Frequência personalizada" /> : null}
            </label>

            <label className="space-y-2">
              <FieldLabel>Duração</FieldLabel>
              <select value={durationPreset} onChange={(event) => { const value = event.target.value as DurationPreset; setDurationPreset(value); if (value !== 'custom') setDuration(durationText(value, durationQuantity)); }} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm">
                <option value="">Selecionar duração</option>
                <option value="continuous">Uso contínuo</option>
                <option value="reevaluation">Até reavaliação clínica</option>
                <option value="days">Por X dias</option>
                <option value="weeks">Por X semanas</option>
                <option value="months">Por X meses</option>
                <option value="administrations">Por X administrações</option>
                <option value="custom">Escrever outra duração</option>
              </select>
              {['days', 'weeks', 'months', 'administrations'].includes(durationPreset) ? <input type="number" min="1" step="1" value={durationQuantity} onChange={(event) => { setDurationQuantity(event.target.value); setDuration(durationText(durationPreset, event.target.value)); }} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm" placeholder="Quantidade" aria-label="Quantidade da duração" /> : null}
              {durationPreset === 'custom' ? <input value={duration} onChange={(event) => setDuration(event.target.value)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm" placeholder="Ex.: até terminar o frasco" aria-label="Duração personalizada" /> : null}
            </label>
          </section>

          {manualMode ? (
            <section className="rounded-xl border border-border bg-muted/30 p-4" aria-live="polite">
              <FieldLabel>Prévia na receita</FieldLabel>
              {manualAdministrationLine ? (
                <div className="mt-2 whitespace-pre-line rounded-lg border border-border/80 bg-background p-3 text-sm leading-6">
                  {manualPreviewLines.join('\n')}
                </div>
              ) : (
                <p className="mt-2 text-xs leading-5 text-muted-foreground">Preencha quantidade, via, frequência e duração para visualizar o texto final.</p>
              )}
            </section>
          ) : null}

          {calculation ? (
            <section className="rounded-xl border border-border bg-muted/30 p-4">
              {!calculation.blockedReason || isDoseDifferenceWarning ? (
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <FieldLabel>Dose total calculada</FieldLabel>
                    <p className="mt-1 text-lg font-bold">{formatDecimalPtBr(calculation.totalDose)} {calculation.totalDoseUnit}</p>
                  </div>
                  {calculation.exactAmount != null && calculation.administrationUnit ? (
                    <div>
                      <FieldLabel>Quantidade exata</FieldLabel>
                      <p className="mt-1 text-lg font-bold">{formatAdministrationAmount(calculation.exactAmount, calculation.administrationUnit)}</p>
                    </div>
                  ) : null}
                  {calculation.practicalAmount != null && calculation.administrationUnit ? (
                    <div>
                      <FieldLabel>Quantidade prática sugerida</FieldLabel>
                      <p className="mt-1 text-lg font-bold text-primary">
                        {formatPracticalAmountWithFraction(calculation.practicalAmount, calculation.administrationUnit)}
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : null}
              {calculation.actualDosePerBasis != null && (!calculation.blockedReason || isDoseDifferenceWarning) && basis === 'weight_based' ? (
                <p className="mt-3 text-xs text-muted-foreground">
                  Dose real após arredondamento: <strong>{formatDecimalPtBr(calculation.actualDosePerBasis)} {calculation.totalDoseUnit}/kg</strong> • diferença {formatDecimalPtBr(calculation.percentDifference || 0)}%
                </p>
              ) : null}
              {calculation.blockedReason && !isDoseDifferenceWarning ? (
                <p className="mt-3 flex gap-2 rounded-lg border border-rose-500/25 bg-rose-500/10 p-3 text-xs text-rose-700">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  {calculation.blockedReason}
                </p>
              ) : null}
              {isDoseDifferenceWarning && calculation.blockedReason ? (
                <div className="mt-3 flex flex-col gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-900 dark:text-amber-100">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                    Aviso de variação de dose por arredondamento
                  </div>
                  <p>{calculation.blockedReason}</p>
                  <p className="text-[11px] text-muted-foreground">
                    Para confirmar o uso desta apresentação comercial, marque a caixa de ciência abaixo.
                  </p>
                </div>
              ) : null}
              {calculation.warning ? (
                <p className="mt-3 flex gap-2 rounded-lg border border-amber-500/25 bg-amber-500/10 p-3 text-xs text-amber-800">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  {calculation.warning}
                </p>
              ) : null}
              {followUpCalculations.map(({ phase, calculation: phaseCalculation }, index) => phaseCalculation.blockedReason ? (
                <p key={`follow-up-blocked-${index}`} className="mt-3 flex gap-2 rounded-lg border border-rose-500/25 bg-rose-500/10 p-3 text-xs text-rose-700">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  Etapa seguinte: {phaseCalculation.blockedReason}
                </p>
              ) : (
                <p key={`follow-up-${index}`} className="mt-3 rounded-lg border border-sky-500/20 bg-sky-500/10 p-3 text-xs text-sky-900 dark:text-sky-100">
                  <strong>Etapa seguinte calculada:</strong> {phaseCalculation.practicalAmount != null && phaseCalculation.administrationUnit ? formatPracticalAmountWithFraction(phaseCalculation.practicalAmount, phaseCalculation.administrationUnit) : `${formatDecimalPtBr(phaseCalculation.totalDose)} ${phaseCalculation.totalDoseUnit}`}, {formatPrescriptionFrequency(phase.frequency)}{durationClause(phase.duration)}.
                </p>
              ))}
              {requiresRoundingConfirmation ? (
                <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 text-xs text-foreground">
                  <input type="checkbox" checked={roundingConfirmed} onChange={(event) => setRoundingConfirmed(event.target.checked)} />
                  <span className="font-medium">Confirmo as quantidades práticas arredondadas e revisei as doses reais.</span>
                </label>
              ) : null}
            </section>
          ) : null}

          {hasInjectableHomeConflict ? (
            <p className="flex gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-800 dark:text-rose-100" role="alert">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              O Receituário é destinado ao uso em casa e não aceita apresentações ou vias injetáveis.
            </p>
          ) : null}

          <button type="button" disabled={!canInsert} onClick={insert} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-45"><CheckCircle2 className="h-4 w-4" />{editingSnapshot ? 'Salvar alterações no medicamento' : 'Inserir medicamento na receita'}</button>
        </>
      )}
    </div>
  );
}
