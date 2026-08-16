import React, { useEffect, useMemo } from 'react';
import { AlertTriangle, Database, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ClinicalMedicationDefinition, ClinicalMedicationOverride } from '../../types/receituario';
import type { ClinicalDoseAlert, ClinicalMedicationCatalogStatus } from '../../utils/clinicalMedicationCatalogBridge';
import {
  buildClinicalMedicationOverridesMap,
  buildDefaultClinicalMedicationOverride,
  evaluateClinicalMedicationCatalogStatus,
  evaluateCommercialDoseAlert,
  evaluateEditorialDoseAlert,
  formatCatalogDoseRange,
  formatClinicalModelDoseRange,
  getCommercialProductsByIds,
  getEditorialPresentations,
  getEditorialRecommendedDoses,
  listClinicalMedicationsNeedingRegistration,
  resolveClinicalMedicationSource,
  resolveCommercialCompoundingRecommendation,
} from '../../utils/clinicalMedicationCatalogBridge';
import {
  buildReceituarioCommercialSelectOptions,
  buildCompoundingDisplayAmount,
  calculateCommercialPracticalDose,
  encodeReceituarioCommercialOptionKey,
} from '../../utils/commercialPresentationDose';
import {
  calculateReceituarioDose,
  formatDecimalPtBr,
} from '../../utils/receituarioDoseEngine';
import {
  normalizePrescriptionSpecies,
  parsePositiveDecimal,
} from '../../utils/receituarioMedication';

interface Props {
  medications: ClinicalMedicationDefinition[];
  species?: string;
  weightKg?: string;
  doseAlternativeKeys?: Record<string, string>;
  overrides: Record<string, ClinicalMedicationOverride>;
  onOverridesChange: (overrides: Record<string, ClinicalMedicationOverride>) => void;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="block text-[11px] font-bold uppercase tracking-[0.13em] text-muted-foreground">{children}</span>;
}

function presentationSelectLabel(item: { commercial_name?: string | null; pharmaceutical_form?: string | null; concentration_text?: string | null }): string {
  return [item.commercial_name, item.pharmaceutical_form, item.concentration_text].filter(Boolean).join(' — ');
}

function DoseAlertBanner({ alert }: { alert: ClinicalDoseAlert }) {
  const isOverdose = alert.severity === 'overdose';
  const isCritical = Boolean(alert.critical && isOverdose);
  return (
    <p className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-xs leading-5 ${
      isCritical
        ? 'border-red-500 bg-red-100 text-red-950 dark:border-red-700 dark:bg-red-950/50 dark:text-red-50'
        : isOverdose
          ? 'border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-100'
          : 'border-orange-300 bg-orange-50 text-orange-900 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-100'
    }`}>
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <span>
        <strong>{isCritical ? 'Sobredose grave:' : isOverdose ? 'Alerta de sobredose:' : 'Alerta de subdose:'}</strong>{' '}
        {alert.message}
        {isCritical ? ' A receita será gerada com ERRO DE DOSE P/ CONCENTRAÇÃO até corrigir apresentação ou dose.' : ''}
      </span>
    </p>
  );
}

function CompoundingRecommendationBanner({
  message,
  severity,
  useCompounding,
  onToggle,
}: {
  message: string;
  severity: 'overdose' | 'underdose';
  useCompounding: boolean;
  onToggle: (next: boolean) => void;
}) {
  const isOverdose = severity === 'overdose';
  return (
    <div className={`rounded-lg border px-3 py-3 text-xs leading-5 ${
      isOverdose
        ? 'border-violet-400 bg-violet-50 text-violet-950 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100'
        : 'border-amber-400 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100'
    }`}>
      <p>
        <strong>{isOverdose ? 'Dose alta para apresentação comercial:' : 'Dose baixa para apresentação comercial:'}</strong>{' '}
        {message}
      </p>
      <button
        type="button"
        onClick={() => onToggle(!useCompounding)}
        className="mt-2 rounded-md border border-current px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide hover:bg-background/40"
      >
        {useCompounding ? 'Voltar para apresentação comercial' : 'Prescrever manipulação com texto pronto'}
      </button>
    </div>
  );
}

function ManualWeightMedicationPanel({
  medicationKey,
  modelRange,
  dose,
  doseMgKg,
  override,
  overrides,
  onOverridesChange,
  parsedWeight,
  medicationName,
}: {
  medicationKey: string;
  modelRange: string;
  dose: ClinicalMedicationDefinition['dose'];
  doseMgKg: number;
  override: ClinicalMedicationOverride;
  overrides: Record<string, ClinicalMedicationOverride>;
  onOverridesChange: (overrides: Record<string, ClinicalMedicationOverride>) => void;
  parsedWeight: number | null;
  medicationName: string;
}) {
  const totalMg = parsedWeight && doseMgKg ? doseMgKg * parsedWeight : null;
  const compoundingHint = totalMg && totalMg > 0 && !override.useCompounding
    ? {
      recommended: true,
      reason: 'percent_mismatch' as const,
      severity: 'underdose' as const,
      message: `Sem produto comercial vinculado. Para ${formatDecimalPtBr(totalMg)} mg calculados, prefira manipulação na concentração exata.`,
    }
    : null;

  return (
    <div className="grid gap-3">
      <div className="rounded-lg border border-sky-200/80 bg-sky-50/70 px-3 py-2 text-xs leading-5 text-sky-900 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100">
        <p><strong className="font-semibold">Faixa do modelo clínico:</strong> {modelRange}</p>
        <p className="mt-1 text-muted-foreground">Sem apresentação comercial vinculada — manipulação disponível.</p>
      </div>

      <label className="space-y-1.5">
        <FieldLabel>Dose escolhida (mg/kg)</FieldLabel>
        <input
          type="text"
          inputMode="decimal"
          value={override.selectedDoseValue ?? dose.min}
          onChange={(event) => {
            const parsed = parsePositiveDecimal(event.target.value);
            onOverridesChange({
              ...overrides,
              [medicationKey]: { ...override, selectedDoseValue: parsed },
            });
          }}
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </label>

      {compoundingHint ? (
        <CompoundingRecommendationBanner
          message={compoundingHint.message}
          severity={compoundingHint.severity}
          useCompounding={Boolean(override.useCompounding)}
          onToggle={(next) => onOverridesChange({
            ...overrides,
            [medicationKey]: { ...override, useCompounding: next },
          })}
        />
      ) : null}

      {override.useCompounding && totalMg ? (
        <p className="rounded-lg border border-violet-200/80 bg-violet-50/70 px-3 py-2 text-xs leading-5 text-violet-900 dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-100">
          Texto de manipulação: {medicationName} — {buildCompoundingDisplayAmount(totalMg)} por administração ({formatDecimalPtBr(totalMg)} mg calculados).
        </p>
      ) : totalMg ? (
        <p className="rounded-lg border border-emerald-200/80 bg-emerald-50/70 px-3 py-2 text-xs leading-5 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
          Cálculo para {formatDecimalPtBr(parsedWeight!)} kg: {formatDecimalPtBr(totalMg)} mg por administração.
        </p>
      ) : (
        <p className="text-xs text-amber-700 dark:text-amber-300">Informe o peso para ver o cálculo prático.</p>
      )}
    </div>
  );
}

function CriticalDoseHighlight({ alert, children }: { alert: ClinicalDoseAlert; children: React.ReactNode }) {
  if (!alert.critical || alert.severity !== 'overdose') return <>{children}</>;
  return (
    <span
      title={alert.message}
      className="rounded-sm bg-red-200/90 px-1 text-red-950 underline decoration-red-600 decoration-wavy underline-offset-2 dark:bg-red-900/60 dark:text-red-50"
    >
      {children}
    </span>
  );
}

function CatalogRegistrationNotice({ status }: { status: ClinicalMedicationCatalogStatus }) {
  if (!status.needsRegistration && status.reason && !status.editable) {
    return (
      <p className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <span>{status.reason}</span>
      </p>
    );
  }
  if (!status.needsRegistration) return null;

  return (
    <div className="rounded-lg border border-violet-300 bg-violet-50 px-3 py-3 text-xs leading-5 text-violet-950 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-100">
      <div className="flex items-start gap-2">
        <Database className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="space-y-2">
          <p><strong>Cadastro necessário no ConsultaVet</strong></p>
          <p>{status.reason}</p>
          <p>Busque ou cadastre: <strong>{status.lookupName}</strong></p>
          <div className="flex flex-wrap gap-3 pt-1">
            {status.registrationTargets.includes('medicamentos') ? (
              <Link
                to={status.editorialSlug ? `/consulta-vet/medicamentos/${status.editorialSlug}` : '/consulta-vet/medicamentos'}
                className="inline-flex items-center gap-1 font-semibold text-violet-800 underline-offset-2 hover:underline dark:text-violet-200"
              >
                Consulta Medicamentos <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            ) : null}
            {status.registrationTargets.includes('comerciais') ? (
              <Link
                to="/consulta-vet/apresentacoes-comerciais"
                className="inline-flex items-center gap-1 font-semibold text-violet-800 underline-offset-2 hover:underline dark:text-violet-200"
              >
                Produtos comerciais <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            ) : null}
          </div>
          <p className="text-[11px] opacity-85">Enquanto não cadastrar, edite a apresentação e a dose manualmente em <strong>Editar texto</strong>.</p>
        </div>
      </div>
    </div>
  );
}

export function ClinicalMedicationDosePanel({
  medications,
  species,
  weightKg,
  doseAlternativeKeys = {},
  overrides,
  onOverridesChange,
}: Props) {
  const normalizedSpecies = normalizePrescriptionSpecies(species);
  const parsedWeight = parsePositiveDecimal(weightKg);

  const missingCatalog = useMemo(() => listClinicalMedicationsNeedingRegistration(
    medications,
    species,
    doseAlternativeKeys,
  ), [doseAlternativeKeys, medications, species]);

  useEffect(() => {
    const nextOverrides = buildClinicalMedicationOverridesMap(medications, species, doseAlternativeKeys, overrides);
    const changed = JSON.stringify(nextOverrides) !== JSON.stringify(overrides);
    if (changed) onOverridesChange(nextOverrides);
  }, [doseAlternativeKeys, medications, onOverridesChange, overrides, species]);

  const cards = useMemo(() => medications.map((medication, index) => {
    const alternativeKey = doseAlternativeKeys[medication.key];
    const alternative = medication.doseAlternatives?.find((item) => item.key === alternativeKey)
      || medication.doseAlternatives?.[0];
    const resolvedMedication = alternative
      ? { ...medication, dose: alternative.dose, prescriptionText: alternative.prescriptionText }
      : medication;
    const catalogStatus = evaluateClinicalMedicationCatalogStatus(medication, species, alternativeKey);
    const override = overrides[medication.key] || buildDefaultClinicalMedicationOverride(medication, species, alternativeKey);
    const source = resolveClinicalMedicationSource(resolvedMedication);
    const modelRange = formatClinicalModelDoseRange(resolvedMedication.dose);
    const orderLabel = `${index + 1}. ${resolvedMedication.name}`;

    if (!catalogStatus.editable) {
      return {
        key: medication.key,
        orderLabel,
        body: (
          <div className="grid gap-3">
            <div className="rounded-lg border border-sky-200/80 bg-sky-50/70 px-3 py-2 text-xs leading-5 text-sky-900 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100">
              <strong className="font-semibold">Faixa do modelo clínico:</strong> {modelRange}
            </div>
            <CatalogRegistrationNotice status={catalogStatus} />
          </div>
        ),
      };
    }

    if (source.kind === 'editorial' && source.editorialMedication && normalizedSpecies) {
      const editorialMedication = source.editorialMedication;
      const presentations = getEditorialPresentations(editorialMedication, resolvedMedication);
      const doses = getEditorialRecommendedDoses(editorialMedication, resolvedMedication, normalizedSpecies);
      const selectedDose = doses.find((item) => item.id === override.doseId) || doses[0];
      const selectedPresentation = presentations.find((item) => item.id === override.presentationId) || presentations[0];
      const selectedDoseValue = override.selectedDoseValue ?? resolvedMedication.dose.min;
      const calculation = selectedDose && selectedPresentation
        ? calculateReceituarioDose({
          species: normalizedSpecies,
          weightKg: parsedWeight,
          dose: selectedDose,
          selectedDoseValue,
          presentation: selectedPresentation,
        })
        : null;
      const alert = evaluateEditorialDoseAlert(calculation, selectedDoseValue, selectedDose);

      return {
        key: medication.key,
        orderLabel,
        body: (
          <div className="grid gap-3">
            <div className="rounded-lg border border-sky-200/80 bg-sky-50/70 px-3 py-2 text-xs leading-5 text-sky-900 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100">
              <p><strong className="font-semibold">Faixa do modelo clínico:</strong> {modelRange}</p>
              {selectedDose ? (
                <p className="mt-1"><strong className="font-semibold">Faixa ConsultaVet:</strong> {formatCatalogDoseRange(selectedDose)}</p>
              ) : null}
            </div>

            <label className="space-y-1.5">
              <FieldLabel>Apresentação (Consulta Medicamentos)</FieldLabel>
              <select
                value={override.presentationId || selectedPresentation?.id || ''}
                onChange={(event) => onOverridesChange({
                  ...overrides,
                  [medication.key]: { ...override, presentationId: event.target.value },
                })}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                {presentations.map((item) => (
                  <option key={item.id} value={item.id}>{presentationSelectLabel(item)}</option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5">
              <FieldLabel>Regime indicado (Consulta Medicamentos)</FieldLabel>
              <select
                value={override.doseId || selectedDose?.id || ''}
                onChange={(event) => {
                  const nextDose = doses.find((item) => item.id === event.target.value);
                  onOverridesChange({
                    ...overrides,
                    [medication.key]: {
                      ...override,
                      doseId: event.target.value,
                      selectedDoseValue: nextDose?.dose_value ?? override.selectedDoseValue,
                    },
                  });
                }}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                {doses.map((item) => (
                  <option key={item.id} value={item.id || ''}>{item.indication || item.route} — {formatCatalogDoseRange(item)}</option>
                ))}
              </select>
            </label>

            {resolvedMedication.dose.basis !== 'manual' ? (
              <label className="space-y-1.5">
                <FieldLabel>Dose escolhida (mg/kg)</FieldLabel>
                <CriticalDoseHighlight alert={alert || { severity: 'underdose', message: '' }}>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={override.selectedDoseValue ?? resolvedMedication.dose.min}
                    onChange={(event) => {
                      const parsed = parsePositiveDecimal(event.target.value);
                      onOverridesChange({
                        ...overrides,
                        [medication.key]: { ...override, selectedDoseValue: parsed },
                      });
                    }}
                    title={alert?.critical && alert.severity === 'overdose' ? alert.message : undefined}
                    className={`h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 ${
                      alert?.critical && alert.severity === 'overdose'
                        ? 'border-red-500 text-red-950 focus:border-red-600 focus:ring-red-500/20 dark:text-red-50'
                        : 'border-border focus:border-primary focus:ring-primary/15'
                    }`}
                  />
                </CriticalDoseHighlight>
              </label>
            ) : null}

            {alert ? <DoseAlertBanner alert={alert} /> : null}

            {calculation?.blockedReason ? (
              <p className="flex items-start gap-2 text-xs text-amber-700 dark:text-amber-300">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{calculation.blockedReason}
              </p>
            ) : calculation && parsedWeight ? (
              <p className="rounded-lg border border-emerald-200/80 bg-emerald-50/70 px-3 py-2 text-xs leading-5 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
                <CriticalDoseHighlight alert={alert || { severity: 'underdose', message: '' }}>
                  <span title={alert?.critical && alert.severity === 'overdose' ? alert.message : undefined}>
                    Cálculo prático para {formatDecimalPtBr(parsedWeight)} kg:
                    {' '}
                    {calculation.practicalAmount != null && calculation.administrationUnit
                      ? `${formatDecimalPtBr(calculation.practicalAmount)} ${calculation.administrationUnit}${calculation.practicalAmount > 1 ? 's' : ''}`
                      : `${formatDecimalPtBr(calculation.totalDose)} ${calculation.totalDoseUnit}`}
                  </span>
                </CriticalDoseHighlight>
              </p>
            ) : (
              <p className="text-xs text-amber-700 dark:text-amber-300">Informe o peso para ver o cálculo prático da apresentação.</p>
            )}
          </div>
        ),
      };
    }

    if (source.kind === 'manual' && resolvedMedication.dose.basis === 'weight') {
      const doseMgKg = override.selectedDoseValue ?? resolvedMedication.dose.min;
      return {
        key: medication.key,
        orderLabel,
        body: (
          <ManualWeightMedicationPanel
            medicationKey={medication.key}
            modelRange={modelRange}
            dose={resolvedMedication.dose}
            doseMgKg={doseMgKg}
            override={override}
            overrides={overrides}
            onOverridesChange={onOverridesChange}
            parsedWeight={parsedWeight}
            medicationName={resolvedMedication.name}
          />
        ),
      };
    }

    const products = source.commercialProducts || getCommercialProductsByIds(resolvedMedication.presentationIds || []);
    const commercialOptions = buildReceituarioCommercialSelectOptions(products);
    const selectedOptionKey = encodeReceituarioCommercialOptionKey(
      override.commercialProductId || products[0]?.id || '',
      override.commercialPotencyMg,
    );
    const selectedOption = commercialOptions.find((item) => item.optionKey === selectedOptionKey)
      || commercialOptions[0];
    const selectedProduct = products.find((item) => item.id === (selectedOption?.productId || override.commercialProductId))
      || products[0];
    const selectedPotencyMg = selectedOption?.potencyMg ?? override.commercialPotencyMg ?? null;
    const commercialRange = selectedProduct
      ? [selectedProduct.labelDirections, selectedProduct.dosageGuidance?.labelDose].filter(Boolean).join(' · ')
      : '';
    const doseMgKg = override.selectedDoseValue ?? resolvedMedication.dose.min;
    const alert = selectedProduct && resolvedMedication.dose.basis !== 'manual' && !override.useCompounding
      ? evaluateCommercialDoseAlert(selectedProduct, doseMgKg, parsedWeight, selectedPotencyMg, override.useCompounding)
      : null;
    const commercialPractical = selectedProduct && parsedWeight && resolvedMedication.dose.basis !== 'manual' && !override.useCompounding
      ? calculateCommercialPracticalDose(selectedProduct, doseMgKg * parsedWeight, selectedPotencyMg)
      : null;
    const compoundingRecommendation = selectedProduct && parsedWeight && !override.useCompounding
      ? resolveCommercialCompoundingRecommendation(selectedProduct, doseMgKg, parsedWeight, selectedPotencyMg)
      : null;
    const totalMg = parsedWeight && doseMgKg ? doseMgKg * parsedWeight : null;

    return {
      key: medication.key,
      orderLabel,
      body: (
        <div className="grid gap-3">
          <div className="rounded-lg border border-sky-200/80 bg-sky-50/70 px-3 py-2 text-xs leading-5 text-sky-900 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100">
            <p><strong className="font-semibold">Faixa do modelo clínico:</strong> {modelRange}</p>
            {commercialRange ? (
              <p className="mt-1"><strong className="font-semibold">Catálogo comercial:</strong> {commercialRange}</p>
            ) : null}
          </div>

          {!override.useCompounding ? (
            <label className="space-y-1.5">
              <FieldLabel>Apresentação comercial</FieldLabel>
              <select
                value={selectedOption?.optionKey || ''}
                onChange={(event) => {
                  const nextOption = commercialOptions.find((item) => item.optionKey === event.target.value);
                  if (!nextOption) return;
                  onOverridesChange({
                    ...overrides,
                    [medication.key]: {
                      ...override,
                      commercialProductId: nextOption.productId,
                      commercialPotencyMg: nextOption.potencyMg,
                      useCompounding: false,
                    },
                  });
                }}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                {commercialOptions.map((item) => (
                  <option key={item.optionKey} value={item.optionKey}>{item.label}</option>
                ))}
              </select>
            </label>
          ) : null}

          {resolvedMedication.dose.basis !== 'manual' ? (
            <label className="space-y-1.5">
              <FieldLabel>Dose escolhida (mg/kg)</FieldLabel>
              <CriticalDoseHighlight alert={alert || { severity: 'underdose', message: '' }}>
                <input
                  type="text"
                  inputMode="decimal"
                  value={override.selectedDoseValue ?? resolvedMedication.dose.min}
                  onChange={(event) => {
                    const parsed = parsePositiveDecimal(event.target.value);
                    onOverridesChange({
                      ...overrides,
                      [medication.key]: {
                        ...override,
                        selectedDoseValue: parsed,
                        useCompounding: false,
                      },
                    });
                  }}
                  title={alert?.critical && alert.severity === 'overdose' ? alert.message : undefined}
                  className={`h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 ${
                    alert?.critical && alert.severity === 'overdose'
                      ? 'border-red-500 text-red-950 focus:border-red-600 focus:ring-red-500/20 dark:text-red-50'
                      : 'border-border focus:border-primary focus:ring-primary/15'
                  }`}
                />
              </CriticalDoseHighlight>
            </label>
          ) : null}

          {compoundingRecommendation ? (
            <CompoundingRecommendationBanner
              message={compoundingRecommendation.message}
              severity={compoundingRecommendation.severity}
              useCompounding={Boolean(override.useCompounding)}
              onToggle={(next) => onOverridesChange({
                ...overrides,
                [medication.key]: { ...override, useCompounding: next },
              })}
            />
          ) : null}

          {alert ? <DoseAlertBanner alert={alert} /> : null}

          {override.useCompounding && totalMg ? (
            <p className="rounded-lg border border-violet-200/80 bg-violet-50/70 px-3 py-2 text-xs leading-5 text-violet-900 dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-100">
              Texto de manipulação: {resolvedMedication.name} — {buildCompoundingDisplayAmount(totalMg)} por administração ({formatDecimalPtBr(totalMg)} mg calculados).
            </p>
          ) : commercialPractical ? (
            <p className="rounded-lg border border-emerald-200/80 bg-emerald-50/70 px-3 py-2 text-xs leading-5 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
              <CriticalDoseHighlight alert={alert || { severity: 'underdose', message: '' }}>
                <span title={alert?.critical && alert.severity === 'overdose' ? alert.message : undefined}>
                  Cálculo prático para {formatDecimalPtBr(parsedWeight!)} kg:
                  {' '}
                  {commercialPractical.displayAmount}
                  {' '}
                  ({formatDecimalPtBr(commercialPractical.totalMg)} mg calculados)
                </span>
              </CriticalDoseHighlight>
            </p>
          ) : parsedWeight ? null : (
            <p className="text-xs text-amber-700 dark:text-amber-300">Informe o peso para ver o cálculo prático da apresentação.</p>
          )}

          {selectedProduct?.productPageUrl ? (
            <a
              href={selectedProduct.productPageUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              Ver ficha comercial <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      ),
    };
  }), [doseAlternativeKeys, medications, normalizedSpecies, onOverridesChange, overrides, parsedWeight, species]);

  if (!medications.length) return null;

  return (
    <div className="space-y-3">
      {missingCatalog.length ? (
        <aside className="rounded-xl border border-violet-300/80 bg-violet-50/80 px-3 py-3 text-violet-950 dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-100">
          <p className="text-sm font-bold">
            {missingCatalog.length} medicamento{missingCatalog.length > 1 ? 's' : ''} precisam de cadastro no ConsultaVet
          </p>
          <ul className="mt-2 space-y-1 text-xs leading-5">
            {missingCatalog.map((item) => (
              <li key={item.lookupName}>
                <strong>{item.medicationName}</strong> — {item.reason}
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      {cards.map((card) => (
        <article key={card.key} className="rounded-xl border border-border bg-muted/20 p-3 sm:p-4">
          <h4 className="text-sm font-bold text-foreground">{card.orderLabel}</h4>
          <div className="mt-3">{card.body}</div>
        </article>
      ))}
    </div>
  );
}
