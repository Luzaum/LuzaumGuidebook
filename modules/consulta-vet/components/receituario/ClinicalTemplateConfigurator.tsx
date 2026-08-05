import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Check, FlaskConical, Hospital, ShieldCheck } from 'lucide-react';
import type { ClinicalMedicationOverride, ClinicalRecipeModel } from '../../types/receituario';
import { buildClinicalMedicationOverridesMap } from '../../utils/clinicalMedicationCatalogBridge';
import {
  getDefaultClinicalOptionKeys,
  renderClinicalRecipe,
  type PatientSize,
} from '../../utils/receituarioClinicalModels';

interface Props {
  model: ClinicalRecipeModel;
  weightKg?: string;
  species?: string;
  onBodyChange: (body: string) => void;
  selectedKeys?: string[];
  onSelectedKeysChange?: (keys: string[]) => void;
  doseAlternativeKeys?: Record<string, string>;
  onDoseAlternativeKeysChange?: (keys: Record<string, string>) => void;
  medicationOverrides?: Record<string, ClinicalMedicationOverride>;
  onMedicationOverridesChange?: (overrides: Record<string, ClinicalMedicationOverride>) => void;
}

function parseWeight(value?: string): number | null {
  const parsed = Number(String(value || '').replace(',', '.'));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export function ClinicalTemplateConfigurator({
  model,
  weightKg,
  species,
  onBodyChange,
  selectedKeys: controlledSelectedKeys,
  onSelectedKeysChange,
  doseAlternativeKeys: controlledDoseAlternativeKeys,
  onDoseAlternativeKeysChange,
  medicationOverrides = {},
  onMedicationOverridesChange,
}: Props) {
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(() => getDefaultClinicalOptionKeys(model));
  const [internalDoseAlternativeKeys, setInternalDoseAlternativeKeys] = useState<Record<string, string>>({});
  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;
  const doseAlternativeKeys = controlledDoseAlternativeKeys ?? internalDoseAlternativeKeys;
  const setSelectedKeys = (updater: string[] | ((current: string[]) => string[])) => {
    const next = typeof updater === 'function' ? updater(selectedKeys) : updater;
    if (onSelectedKeysChange) onSelectedKeysChange(next);
    else setInternalSelectedKeys(next);
  };
  const setDoseAlternativeKeys = (updater: Record<string, string> | ((current: Record<string, string>) => Record<string, string>)) => {
    const next = typeof updater === 'function' ? updater(doseAlternativeKeys) : updater;
    if (onDoseAlternativeKeysChange) onDoseAlternativeKeysChange(next);
    else setInternalDoseAlternativeKeys(next);
  };
  const [patientSize, setPatientSize] = useState<PatientSize>(null);
  const [formulaForm, setFormulaForm] = useState<'cápsula' | 'suspensão oral' | 'outra'>('cápsula');
  const [customFormulaForm, setCustomFormulaForm] = useState('');
  const parsedWeight = parseWeight(weightKg);
  const needsPatientSize = useMemo(() => model.options.some((option) =>
    selectedKeys.includes(option.key) && option.formula?.requiresPatientSize,
  ), [model.options, selectedKeys]);
  const hasSelectedFormula = useMemo(() => model.options.some((option) =>
    selectedKeys.includes(option.key) && option.formula,
  ), [model.options, selectedKeys]);
  const selectedFormulaForm = formulaForm === 'outra' ? customFormulaForm.trim() : formulaForm;
  const medicationsWithAlternatives = useMemo(() => model.options
    .filter((option) => selectedKeys.includes(option.key))
    .flatMap((option) => option.medications || [])
    .filter((item) => item.doseAlternatives?.length), [model.options, selectedKeys]);

  const selectedMedications = useMemo(() => model.options
    .filter((option) => selectedKeys.includes(option.key))
    .flatMap((option) => option.medications || []), [model.options, selectedKeys]);

  const effectiveOverrides = useMemo(() => buildClinicalMedicationOverridesMap(
    selectedMedications,
    species,
    doseAlternativeKeys,
    medicationOverrides,
  ), [doseAlternativeKeys, medicationOverrides, selectedMedications, species]);

  useEffect(() => {
    if (!onMedicationOverridesChange) return;
    const hasMissing = selectedMedications.some((item) => !medicationOverrides[item.key]);
    if (!hasMissing) return;
    onMedicationOverridesChange(effectiveOverrides);
  }, [effectiveOverrides, medicationOverrides, onMedicationOverridesChange, selectedMedications]);

  useEffect(() => {
    setSelectedKeys(getDefaultClinicalOptionKeys(model));
    setPatientSize(null);
    setFormulaForm('cápsula');
    setCustomFormulaForm('');
    setDoseAlternativeKeys({});
  }, [model]);

  useEffect(() => {
    onBodyChange(renderClinicalRecipe(
      model,
      selectedKeys,
      parsedWeight,
      patientSize,
      selectedFormulaForm,
      doseAlternativeKeys,
      effectiveOverrides,
      species,
    ));
  }, [doseAlternativeKeys, effectiveOverrides, model, onBodyChange, parsedWeight, patientSize, selectedFormulaForm, selectedKeys, species]);

  const toggleOption = (key: string) => {
    if (model.selectionMode === 'fixed') return;
    if (model.selectionMode === 'single') {
      setSelectedKeys([key]);
      return;
    }
    setSelectedKeys((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  };

  return (
    <section className="shrink-0 space-y-3 border-b border-border bg-background px-4 py-4 sm:px-5" aria-label="Configuração clínica do modelo">
      {model.hospitalWarning ? (
        <div className="flex items-start gap-2 rounded-xl border border-rose-300 bg-rose-50 px-3 py-2.5 text-sm font-bold text-rose-800 dark:border-rose-900 dark:bg-rose-950/35 dark:text-rose-200">
          <Hospital className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{model.hospitalWarning}</span>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-foreground">{model.selectorLabel || 'Tratamento incluído'}</h3>
          <p className="text-xs text-muted-foreground">
            {model.selectionMode === 'multiple'
              ? 'Marque somente os blocos que deseja prescrever.'
              : model.selectionMode === 'single'
                ? 'Escolha uma variante; o texto e os cálculos serão atualizados.'
                : 'Os itens abaixo fazem parte do mesmo protocolo.'}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800 dark:border-amber-900 dark:bg-amber-950/35 dark:text-amber-200">
          <ShieldCheck className="h-3.5 w-3.5" />Dose do modelo · revisão de fonte pendente
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {model.options.map((option) => {
          const selected = selectedKeys.includes(option.key);
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => toggleOption(option.key)}
              disabled={model.selectionMode === 'fixed'}
              aria-pressed={selected}
              className={`min-h-14 cursor-pointer rounded-xl border px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-100 ${
                selected ? 'border-primary bg-primary/8 text-foreground' : 'border-border bg-card hover:border-primary/50 hover:bg-muted/40'
              }`}
            >
              <span className="flex items-start gap-2">
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background'}`}>
                  {selected ? <Check className="h-3.5 w-3.5" /> : null}
                </span>
                <span>
                  <span className="block text-xs font-bold">{option.label}</span>
                  {option.description ? <span className="mt-1 block text-[11px] leading-4 text-muted-foreground">{option.description}</span> : null}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {model.selectionMode === 'multiple' && selectedKeys.length === 0 ? (
        <p className="flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-800 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-200">
          <FlaskConical className="h-4 w-4 shrink-0" />Nenhum tratamento opcional foi incluído. As recomendações continuam disponíveis para revisão.
        </p>
      ) : null}

      {needsPatientSize ? (
        <fieldset className="rounded-xl border border-border bg-muted/25 p-3">
          <legend className="px-1 text-xs font-bold">Porte do paciente para Coenzima Q10</legend>
          <p className="mb-2 text-[11px] text-muted-foreground">Confirme manualmente; o app não deduz o porte somente pelo peso.</p>
          <div className="flex flex-wrap gap-2">
            {([{ value: 'small', label: 'Pequeno porte' }, { value: 'large', label: 'Grande porte' }] as const).map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setPatientSize(item.value)}
                aria-pressed={patientSize === item.value}
                className={`min-h-11 cursor-pointer rounded-lg border px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${patientSize === item.value ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background hover:border-primary/50'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {hasSelectedFormula ? (
        <div className="grid gap-2 rounded-xl border border-border bg-muted/25 p-3 sm:grid-cols-[220px_1fr]">
          <label className="space-y-1.5">
            <span className="block text-xs font-bold">Forma farmacêutica manipulada</span>
            <select
              value={formulaForm}
              onChange={(event) => setFormulaForm(event.target.value as typeof formulaForm)}
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              <option value="cápsula">Cápsula</option>
              <option value="suspensão oral">Suspensão oral</option>
              <option value="outra">Outra apresentação</option>
            </select>
          </label>
          {formulaForm === 'outra' ? (
            <label className="space-y-1.5">
              <span className="block text-xs font-bold">Descreva a apresentação</span>
              <input
                value={customFormulaForm}
                onChange={(event) => setCustomFormulaForm(event.target.value)}
                placeholder="A PREENCHER"
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </label>
          ) : null}
        </div>
      ) : null}

      {medicationsWithAlternatives.map((item) => (
        <label key={item.key} className="block space-y-1.5 rounded-xl border border-border bg-muted/25 p-3">
          <span className="block text-xs font-bold">Indicação por dose — {item.name}</span>
          <select
            value={doseAlternativeKeys[item.key] || item.doseAlternatives?.[0]?.key || ''}
            onChange={(event) => setDoseAlternativeKeys((current) => ({ ...current, [item.key]: event.target.value }))}
            className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          >
            {item.doseAlternatives?.map((alternative) => (
              <option key={alternative.key} value={alternative.key}>{alternative.label}</option>
            ))}
          </select>
        </label>
      ))}

      {!parsedWeight ? (
        <p className="flex items-center gap-2 text-xs font-medium text-amber-700 dark:text-amber-300">
          <AlertTriangle className="h-4 w-4 shrink-0" />Informe o peso para substituir as doses por kg; até lá, o documento mostrará “A PREENCHER”.
        </p>
      ) : null}

      {model.incompleteProtocolWarning ? (
        <p className="flex items-center gap-2 text-xs font-semibold text-sky-800 dark:text-sky-200">
          <ShieldCheck className="h-4 w-4 shrink-0" />{model.incompleteProtocolWarning}
        </p>
      ) : null}
    </section>
  );
}
