import type { CommercialMedicationProduct } from '../types/commercialMedication';
import type { MedicationPresentationRecord } from '../../../src/lib/clinicRecords';
import { formatDecimalPtBr } from './receituarioDoseEngine';
import { sanitizeCommercialProductForTakeHome, takeHomeCommercialPresentationLines } from './receituarioTakeHome';

export interface CommercialPotency {
  mgPerUnit: number;
  unitLabel: string;
  wholeUnitOnly: boolean;
  splitIncrement: number;
  source: string;
}

export interface CommercialPracticalDoseResult {
  totalMg: number;
  exactUnits: number;
  practicalUnits: number;
  mgPerUnit: number;
  unitLabel: string;
  actualMg: number;
  percentDifference: number;
  displayAmount: string;
  isLiquid: boolean;
}

function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function parseNumber(value: string): number {
  return Number(value.replace(',', '.'));
}

function detectUnitMeta(text: string): Pick<CommercialPotency, 'unitLabel' | 'wholeUnitOnly' | 'splitIncrement'> {
  const normalized = normalizeText(text);
  if (/caps/.test(normalized)) {
    return { unitLabel: 'cápsula', wholeUnitOnly: true, splitIncrement: 1 };
  }
  if (/comp|tablet|drag/.test(normalized)) {
    return { unitLabel: 'comprimido', wholeUnitOnly: false, splitIncrement: 0.25 };
  }
  if (/gota/.test(normalized)) {
    return { unitLabel: 'gota', wholeUnitOnly: false, splitIncrement: 1 };
  }
  if (/ml|solu|susp|xarope|liqu|injet|ampola|frasco/.test(normalized)) {
    return { unitLabel: 'mL', wholeUnitOnly: false, splitIncrement: 0.01 };
  }
  if (/sache/.test(normalized)) {
    return { unitLabel: 'sachê', wholeUnitOnly: true, splitIncrement: 1 };
  }
  return { unitLabel: 'unidade', wholeUnitOnly: false, splitIncrement: 0.25 };
}

function parseLiquidMgPerMl(text: string): number | null {
  const match = text.match(/(\d+(?:[.,]\d+)?)\s*mg\s*\/\s*mL/i);
  return match ? parseNumber(match[1]) : null;
}

function parseLiquidConcentration(text: string): { value: number; unit: string } | null {
  const massPerVolume = text.match(/(\d+(?:[.,]\d+)?)\s*(mcg|µg|ug|mg|g|UI|U)\s*\/\s*(?:1\s*)?mL/i);
  if (massPerVolume) {
    return { value: parseNumber(massPerVolume[1]), unit: `${massPerVolume[2].replace(/^u$/i, 'UI')}/mL` };
  }
  const percentage = text.match(/(\d+(?:[.,]\d+)?)\s*%/);
  if (percentage) {
    // Soluções farmacêuticas em % m/v: 1% = 10 mg/mL.
    return { value: parseNumber(percentage[1]) * 10, unit: 'mg/mL' };
  }
  return null;
}

function isPackagingOnlyLine(line: string): boolean {
  const normalized = normalizeText(line);
  if (/\d+(?:[.,]\d+)?\s*mg\b/i.test(line)) return false;
  return /caixa com|embalagem com|blister|cartucho|frasco de \d+\s*mL|unidades por/i.test(normalized);
}

function parseMgMatches(
  text: string,
  unitMeta: Pick<CommercialPotency, 'unitLabel' | 'wholeUnitOnly' | 'splitIncrement'>,
  source: string,
): CommercialPotency[] {
  const results: CommercialPotency[] = [];
  const regex = /(\d+(?:[.,]\d+)?)\s*mg\b/gi;
  const seen = new Set<number>();
  let match: RegExpExecArray | null = regex.exec(text);
  while (match) {
    const tail = text.slice(match.index + match[0].length, match.index + match[0].length + 12);
    if (/^\s*\/\s*(kg|ml|dia|m2|m²)/i.test(tail)) {
      match = regex.exec(text);
      continue;
    }
    const mgPerUnit = parseNumber(match[1]);
    if (mgPerUnit > 0 && !seen.has(mgPerUnit)) {
      seen.add(mgPerUnit);
      results.push({ mgPerUnit, ...unitMeta, source });
    }
    match = regex.exec(text);
  }
  return results;
}

function dedupePotencies(items: CommercialPotency[]): CommercialPotency[] {
  const map = new Map<string, CommercialPotency>();
  for (const item of items) {
    const key = `${item.unitLabel}:${item.mgPerUnit}`;
    const existing = map.get(key);
    if (!existing || existing.source.startsWith('embalagem')) {
      map.set(key, item);
    }
  }
  return Array.from(map.values()).sort((a, b) => a.unitLabel.localeCompare(b.unitLabel, 'pt-BR') || a.mgPerUnit - b.mgPerUnit);
}

export function parseCommercialPotencies(product: CommercialMedicationProduct): CommercialPotency[] {
  const takeHomePresentations = takeHomeCommercialPresentationLines(product);
  if (!takeHomePresentations.length) return [];
  const contextText = [
    product.name,
    product.labelCompositionSummary,
    ...(product.activeComponents || []),
    ...takeHomePresentations,
  ].join(' ');
  const defaultUnit = detectUnitMeta(contextText);
  const potencies: CommercialPotency[] = [];

  const namePotencies = parseMgMatches(product.name, defaultUnit, 'nome comercial');
  potencies.push(...namePotencies);

  if (product.labelCompositionSummary) {
    potencies.push(...parseMgMatches(product.labelCompositionSummary, defaultUnit, 'rótulo'));
  }

  for (const component of product.activeComponents || []) {
    potencies.push(...parseMgMatches(component, defaultUnit, 'componente ativo'));
  }

  for (const line of takeHomePresentations) {
    if (isPackagingOnlyLine(line)) continue;
    const lineUnit = detectUnitMeta(line);
    if (lineUnit.unitLabel === 'mL' && !/comp|caps|tablet|drag/i.test(normalizeText(line))) {
      const liquid = parseLiquidConcentration(line)
        || parseLiquidConcentration(product.labelCompositionSummary || '');
      if (liquid && /mg/i.test(liquid.unit)) {
        potencies.push({
          mgPerUnit: liquid.value,
          ...lineUnit,
          source: `apresentação: ${line}`,
        });
      }
      continue;
    }
    potencies.push(...parseMgMatches(line, lineUnit, `apresentação: ${line}`));
  }

  const solids = dedupePotencies(potencies.filter((item) => item.unitLabel !== 'mL'));
  const liquidMgPerMl = parseLiquidMgPerMl(contextText);
  const liquids = dedupePotencies(potencies.filter((item) => item.unitLabel === 'mL'));
  if (liquidMgPerMl) {
    liquids.push({
      mgPerUnit: liquidMgPerMl,
      unitLabel: 'mL',
      wholeUnitOnly: false,
      splitIncrement: 0.01,
      source: 'solução mg/mL',
    });
  }
  return dedupePotencies([...solids, ...liquids]);
}

function commercialPresentationForm(line: string, unitLabel: string): string {
  const normalized = normalizeText(line);
  if (/injet|ampola|frasco.?ampola/.test(normalized)) return 'solução injetável';
  if (/susp/.test(normalized)) return /oral/.test(normalized) ? 'suspensão oral' : 'suspensão';
  if (/solu/.test(normalized)) return /oral/.test(normalized) ? 'solução oral' : 'solução';
  if (/gota/.test(normalized)) return 'gotas';
  if (/caps/.test(normalized) || unitLabel === 'cápsula') return 'cápsula';
  if (/comp|tablet|drag/.test(normalized) || unitLabel === 'comprimido') return 'comprimido';
  if (/pomada|creme|gel|xampu|shampoo|spray/.test(normalized)) return line.match(/pomada|creme|gel|xampu|shampoo|spray/i)?.[0] || 'tópico';
  return unitLabel === 'mL' ? 'solução' : unitLabel;
}

function linePotencies(product: CommercialMedicationProduct, line: string): Array<{ value: number; valueUnit: string; unitLabel: string; splitIncrement: number }> {
  const normalized = normalizeText(line);
  const liquid = parseLiquidConcentration(line);
  if (liquid) {
    return [{ value: liquid.value, valueUnit: liquid.unit, unitLabel: 'mL', splitIncrement: 0.01 }];
  }
  const unitMeta = detectUnitMeta(line);
  const solids = parseMgMatches(line, unitMeta, line);
  if (solids.length) {
    return solids.map((item) => ({
      value: item.mgPerUnit,
      valueUnit: 'mg',
      unitLabel: item.unitLabel,
      splitIncrement: item.splitIncrement,
    }));
  }
  if (/solu|susp|injet|frasco/.test(normalized)) {
    const fallback = parseLiquidConcentration(product.labelCompositionSummary || '');
    if (fallback) return [{ value: fallback.value, valueUnit: fallback.unit, unitLabel: 'mL', splitIncrement: 0.01 }];
  }
  const units = line.match(/(\d+(?:[.,]\d+)?)\s*(UI|U)\s*\/\s*mL/i);
  if (units) return [{ value: parseNumber(units[1]), valueUnit: 'UI/mL', unitLabel: 'mL', splitIncrement: 0.01 }];
  return [];
}

/** Converte as apresentações da aba Comerciais para o contrato usado pela calculadora. */
export function buildCommercialMedicationPresentationRecords(
  product: CommercialMedicationProduct,
  medicationId = `commercial:${product.slug}`,
): MedicationPresentationRecord[] {
  const takeHomeProduct = sanitizeCommercialProductForTakeHome(product);
  if (!takeHomeProduct) return [];
  return takeHomeProduct.presentations.flatMap((line, lineIndex) => {
    const concentrations = linePotencies(takeHomeProduct, line);
    if (!concentrations.length) {
      return [{
        id: `${medicationId}:presentation:${lineIndex}`,
        clinic_id: '', medication_id: medicationId,
        pharmaceutical_form: commercialPresentationForm(line, 'unidade'),
        concentration_text: line,
        additional_component: product.labelCompositionSummary || null,
        presentation_unit: null,
        commercial_name: product.name,
        value: null, value_unit: null, per_value: null, per_unit: null,
        avg_price_brl: null, pharmacy_veterinary: true, pharmacy_human: false, pharmacy_compounding: false,
        metadata: { manufacturer: product.manufacturer, source: 'commercial_catalog', original_label: line },
        package_quantity: null, package_unit: null, created_at: '', source: 'global' as const,
      }];
    }
    return concentrations.map((concentration, concentrationIndex) => ({
      id: `${medicationId}:presentation:${lineIndex}:${concentrationIndex}`,
      clinic_id: '', medication_id: medicationId,
      pharmaceutical_form: commercialPresentationForm(line, concentration.unitLabel),
      concentration_text: `${formatDecimalPtBr(concentration.value)} ${concentration.valueUnit}`,
      additional_component: product.labelCompositionSummary || null,
      presentation_unit: concentration.unitLabel,
      commercial_name: product.name,
      value: concentration.value,
      value_unit: concentration.valueUnit,
      per_value: 1,
      per_unit: concentration.unitLabel,
      avg_price_brl: null,
      pharmacy_veterinary: true,
      pharmacy_human: false,
      pharmacy_compounding: false,
      metadata: { manufacturer: product.manufacturer, source: 'commercial_catalog', original_label: line, split_increment: concentration.splitIncrement },
      package_quantity: null, package_unit: null, created_at: '', source: 'global' as const,
      tablet_split_increment: concentration.unitLabel === 'comprimido' ? concentration.splitIncrement : null,
    }));
  });
}

function roundToIncrement(value: number, increment: number): number {
  return Math.round(value / increment) * increment;
}

function pickBestAlternative(
  exactUnits: number,
  potency: CommercialPotency,
  totalMg: number,
): { practicalUnits: number; actualMg: number; percentDifference: number } | null {
  const increment = potency.wholeUnitOnly ? 1 : potency.splitIncrement;
  const center = roundToIncrement(exactUnits, increment);
  const candidates = [center - increment, center, center + increment]
    .filter((value) => value > 0)
    .filter((value, index, values) => values.indexOf(value) === index);

  const ranked = candidates.map((practicalUnits) => {
    const actualMg = practicalUnits * potency.mgPerUnit;
    return {
      practicalUnits,
      actualMg,
      percentDifference: ((actualMg - totalMg) / totalMg) * 100,
    };
  }).sort((a, b) => Math.abs(a.percentDifference) - Math.abs(b.percentDifference));

  return ranked[0] || null;
}

export interface ReceituarioCommercialSelectOption {
  optionKey: string;
  productId: string;
  potencyMg: number | null;
  unitLabel: string | null;
  label: string;
}

export interface CompoundingRecommendation {
  recommended: boolean;
  reason: 'high_dose' | 'low_dose' | 'impractical_fraction' | 'percent_mismatch';
  message: string;
  severity: 'overdose' | 'underdose';
}

export function encodeReceituarioCommercialOptionKey(productId: string, potencyMg?: number | null, unitLabel?: string | null): string {
  if (potencyMg != null && potencyMg > 0) return `${productId}::${potencyMg}${unitLabel ? `::${encodeURIComponent(unitLabel)}` : ''}`;
  return productId;
}

export function parseReceituarioCommercialOptionKey(optionKey: string): { productId: string; potencyMg: number | null; unitLabel: string | null } {
  const [productId, potencyText, unitText] = optionKey.split('::');
  if (!potencyText) return { productId, potencyMg: null, unitLabel: null };
  const potency = Number(potencyText);
  return {
    productId,
    potencyMg: Number.isFinite(potency) ? potency : null,
    unitLabel: unitText ? decodeURIComponent(unitText) : null,
  };
}

function formatReceituarioPotencyLabel(
  product: CommercialMedicationProduct,
  potency: CommercialPotency,
): string {
  if (potency.unitLabel === 'mL') {
    return `${product.name} — ${formatDecimalPtBr(potency.mgPerUnit)} mg/mL`;
  }
  return `${product.name} — ${formatDecimalPtBr(potency.mgPerUnit)} mg/${potency.unitLabel}`;
}

export function buildReceituarioCommercialSelectOptions(
  products: CommercialMedicationProduct[],
): ReceituarioCommercialSelectOption[] {
  const options: ReceituarioCommercialSelectOption[] = [];
  for (const rawProduct of products) {
    const product = sanitizeCommercialProductForTakeHome(rawProduct);
    if (!product) continue;
    const potencies = parseCommercialPotencies(product);
    const solids = potencies.filter((item) => item.unitLabel !== 'mL');
    const liquids = potencies.filter((item) => item.unitLabel === 'mL');

    if (solids.length <= 1 && liquids.length <= 1 && solids.length + liquids.length <= 1) {
      const potency = solids[0] || liquids[0];
      options.push({
        optionKey: encodeReceituarioCommercialOptionKey(product.id, potency?.mgPerUnit ?? null, potency?.unitLabel),
        productId: product.id,
        potencyMg: potency?.mgPerUnit ?? null,
        unitLabel: potency?.unitLabel ?? null,
        label: formatCommercialProductOptionLabel(product),
      });
      continue;
    }

    for (const potency of solids) {
      options.push({
        optionKey: encodeReceituarioCommercialOptionKey(product.id, potency.mgPerUnit, potency.unitLabel),
        productId: product.id,
        potencyMg: potency.mgPerUnit,
        unitLabel: potency.unitLabel,
        label: formatReceituarioPotencyLabel(product, potency),
      });
    }
    for (const potency of liquids) {
      options.push({
        optionKey: encodeReceituarioCommercialOptionKey(product.id, potency.mgPerUnit, potency.unitLabel),
        productId: product.id,
        potencyMg: potency.mgPerUnit,
        unitLabel: potency.unitLabel,
        label: formatReceituarioPotencyLabel(product, potency),
      });
    }
  }
  return options;
}

export function pickDefaultCommercialPotencyMg(product: CommercialMedicationProduct): number | null {
  const potencies = parseCommercialPotencies(product).filter((item) => item.unitLabel !== 'mL');
  if (!potencies.length) {
    const liquid = parseCommercialPotencies(product).find((item) => item.unitLabel === 'mL');
    return liquid?.mgPerUnit ?? null;
  }
  return potencies.sort((a, b) => a.mgPerUnit - b.mgPerUnit)[0]?.mgPerUnit ?? null;
}

export function resolveCommercialPotencyMg(
  product: CommercialMedicationProduct,
  potencyMg?: number | null,
): number | null {
  const available = parseCommercialPotencies(product).map((item) => item.mgPerUnit);
  if (potencyMg != null && available.includes(potencyMg)) return potencyMg;
  return pickDefaultCommercialPotencyMg(product);
}

export function evaluateCompoundingRecommendation(
  practical: CommercialPracticalDoseResult | null,
  totalMg: number,
): CompoundingRecommendation | null {
  if (!practical || !totalMg || totalMg <= 0) return null;

  const isFractionalUnit = !practical.isLiquid
    && Math.abs(practical.practicalUnits - Math.round(practical.practicalUnits)) > 0.01
    && (practical.unitLabel === 'cápsula'
      || practical.unitLabel === 'sachê'
      || practical.unitLabel === 'unidade');

  if (isFractionalUnit) {
    return {
      recommended: true,
      reason: 'impractical_fraction',
      severity: practical.percentDifference >= 0 ? 'overdose' : 'underdose',
      message: `A dose calculada (${formatDecimalPtBr(practical.totalMg)} mg) não corresponde a unidades inteiras de ${formatDecimalPtBr(practical.mgPerUnit)} mg (${practical.displayAmount}). Indica-se manipulação na concentração exata.`,
    };
  }

  if (Math.abs(practical.percentDifference) > 25) {
    return {
      recommended: true,
      reason: 'percent_mismatch',
      severity: practical.percentDifference > 0 ? 'overdose' : 'underdose',
      message: practical.percentDifference > 0
        ? `A apresentação comercial entrega ${Math.abs(practical.percentDifference).toFixed(1).replace('.', ',')}% a mais do que a dose calculada — manipulação é preferível.`
        : `A apresentação comercial entrega ${Math.abs(practical.percentDifference).toFixed(1).replace('.', ',')}% a menos do que a dose calculada — manipulação é preferível.`,
    };
  }

  if (practical.practicalUnits > 2 && practical.mgPerUnit >= 50 && !practical.isLiquid) {
    return {
      recommended: true,
      reason: 'high_dose',
      severity: 'overdose',
      message: `A dose calculada exige ${practical.displayAmount}, volume alto para ${formatDecimalPtBr(practical.mgPerUnit)} mg por unidade. Manipulação permite concentração sob medida.`,
    };
  }

  if (practical.exactUnits < 0.5 && practical.percentDifference < -10) {
    return {
      recommended: true,
      reason: 'low_dose',
      severity: 'underdose',
      message: `A menor apresentação comercial (${formatDecimalPtBr(practical.mgPerUnit)} mg) ainda supera a dose calculada. Manipulação evita subdose.`,
    };
  }

  return null;
}

export function buildCompoundingDisplayAmount(totalMg: number, pharmaceuticalForm = 'cápsula'): string {
  const roundedMg = Math.round(totalMg * 100) / 100;
  return `1 ${pharmaceuticalForm} (${formatDecimalPtBr(roundedMg)} mg)`;
}

export function calculateCommercialPracticalDose(
  product: CommercialMedicationProduct,
  totalMg: number,
  selectedPotencyMg?: number | null,
  selectedUnitLabel?: string | null,
): CommercialPracticalDoseResult | null {
  if (!totalMg || totalMg <= 0) return null;
  const allPotencies = parseCommercialPotencies(product);
  const potencies = selectedPotencyMg != null && selectedPotencyMg > 0
    ? allPotencies.filter((item) => item.mgPerUnit === selectedPotencyMg && (!selectedUnitLabel || item.unitLabel === selectedUnitLabel))
    : allPotencies;
  if (!potencies.length) return null;

  if (potencies.length === 1 && potencies[0].unitLabel === 'mL') {
    const mgPerMl = potencies[0].mgPerUnit;
    const exactUnits = totalMg / mgPerMl;
    const practicalUnits = Math.round(exactUnits * 100) / 100;
    const actualMg = practicalUnits * mgPerMl;
    return {
      totalMg,
      exactUnits,
      practicalUnits,
      mgPerUnit: mgPerMl,
      unitLabel: 'mL',
      actualMg,
      percentDifference: ((actualMg - totalMg) / totalMg) * 100,
      displayAmount: `${formatDecimalPtBr(practicalUnits)} mL`,
      isLiquid: true,
    };
  }

  let best: CommercialPracticalDoseResult | null = null;
  for (const potency of potencies) {
    const exactUnits = totalMg / potency.mgPerUnit;
    const selected = pickBestAlternative(exactUnits, potency, totalMg);
    if (!selected) continue;

    const pluralSuffix = selected.practicalUnits === 1 ? '' : 's';
    const candidate: CommercialPracticalDoseResult = {
      totalMg,
      exactUnits,
      practicalUnits: selected.practicalUnits,
      mgPerUnit: potency.mgPerUnit,
      unitLabel: potency.unitLabel,
      actualMg: selected.actualMg,
      percentDifference: selected.percentDifference,
      displayAmount: `${formatDecimalPtBr(selected.practicalUnits)} ${potency.unitLabel}${pluralSuffix}`,
      isLiquid: false,
    };

    if (!best || Math.abs(candidate.percentDifference) < Math.abs(best.percentDifference)) {
      best = candidate;
    }
  }

  return best;
}

export function formatCommercialAdministrationAmount(
  product: CommercialMedicationProduct,
  doseMgKg: number,
  weightKg: number | null,
  selectedPotencyMg?: number | null,
  selectedUnitLabel?: string | null,
): string {
  if (!weightKg || weightKg <= 0) return 'A PREENCHER';
  const totalMg = doseMgKg * weightKg;
  const result = calculateCommercialPracticalDose(product, totalMg, selectedPotencyMg, selectedUnitLabel);
  if (!result) return `${formatDecimalPtBr(totalMg)} mg`;
  return result.displayAmount;
}

export function formatCommercialProductOptionLabel(product: CommercialMedicationProduct): string {
  const takeHomeProduct = sanitizeCommercialProductForTakeHome(product);
  if (!takeHomeProduct) return product.name;
  product = takeHomeProduct;
  const potencies = parseCommercialPotencies(product);
  const strength = potencies.length === 1 && potencies[0].unitLabel !== 'mL'
    ? `${formatDecimalPtBr(potencies[0].mgPerUnit)} mg/${potencies[0].unitLabel}`
    : potencies.length > 1
      ? potencies.map((item) => `${formatDecimalPtBr(item.mgPerUnit)} mg`).join(' / ')
      : null;
  const packaging = (product.presentations || [])
    .filter((line) => isPackagingOnlyLine(line))
    .slice(0, 2)
    .join(' · ');
  return [product.name, strength, packaging].filter(Boolean).join(' — ');
}
