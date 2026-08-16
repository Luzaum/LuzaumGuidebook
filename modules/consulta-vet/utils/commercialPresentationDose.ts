import type { CommercialMedicationProduct } from '../types/commercialMedication';
import { formatDecimalPtBr } from './receituarioDoseEngine';

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
  if (/ml|solu|susp|xarope|liqu/.test(normalized)) {
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
  const map = new Map<number, CommercialPotency>();
  for (const item of items) {
    const existing = map.get(item.mgPerUnit);
    if (!existing || existing.source.startsWith('embalagem')) {
      map.set(item.mgPerUnit, item);
    }
  }
  return Array.from(map.values()).sort((a, b) => a.mgPerUnit - b.mgPerUnit);
}

export function parseCommercialPotencies(product: CommercialMedicationProduct): CommercialPotency[] {
  const contextText = [
    product.name,
    product.labelCompositionSummary,
    ...(product.activeComponents || []),
    ...(product.presentations || []),
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

  for (const line of product.presentations || []) {
    if (isPackagingOnlyLine(line)) continue;
    const lineUnit = detectUnitMeta(line);
    if (lineUnit.unitLabel === 'mL' && !/comp|caps|tablet|drag/i.test(normalizeText(line))) {
      continue;
    }
    potencies.push(...parseMgMatches(line, lineUnit, `apresentação: ${line}`));
  }

  const solids = dedupePotencies(potencies.filter((item) => item.unitLabel !== 'mL'));
  if (solids.length) return solids;

  const liquidMgPerMl = parseLiquidMgPerMl(contextText);
  if (liquidMgPerMl) {
    return [{
      mgPerUnit: liquidMgPerMl,
      unitLabel: 'mL',
      wholeUnitOnly: false,
      splitIncrement: 0.01,
      source: 'solução mg/mL',
    }];
  }

  return [];
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
  label: string;
}

export interface CompoundingRecommendation {
  recommended: boolean;
  reason: 'high_dose' | 'low_dose' | 'impractical_fraction' | 'percent_mismatch';
  message: string;
  severity: 'overdose' | 'underdose';
}

export function encodeReceituarioCommercialOptionKey(productId: string, potencyMg?: number | null): string {
  if (potencyMg != null && potencyMg > 0) return `${productId}::${potencyMg}`;
  return productId;
}

export function parseReceituarioCommercialOptionKey(optionKey: string): { productId: string; potencyMg: number | null } {
  const separatorIndex = optionKey.indexOf('::');
  if (separatorIndex === -1) return { productId: optionKey, potencyMg: null };
  const potency = Number(optionKey.slice(separatorIndex + 2));
  return {
    productId: optionKey.slice(0, separatorIndex),
    potencyMg: Number.isFinite(potency) ? potency : null,
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
  for (const product of products) {
    const potencies = parseCommercialPotencies(product);
    const solids = potencies.filter((item) => item.unitLabel !== 'mL');
    const liquids = potencies.filter((item) => item.unitLabel === 'mL');

    if (solids.length <= 1 && liquids.length <= 1 && solids.length + liquids.length <= 1) {
      const potency = solids[0] || liquids[0];
      options.push({
        optionKey: encodeReceituarioCommercialOptionKey(product.id, potency?.mgPerUnit ?? null),
        productId: product.id,
        potencyMg: potency?.mgPerUnit ?? null,
        label: formatCommercialProductOptionLabel(product),
      });
      continue;
    }

    for (const potency of solids) {
      options.push({
        optionKey: encodeReceituarioCommercialOptionKey(product.id, potency.mgPerUnit),
        productId: product.id,
        potencyMg: potency.mgPerUnit,
        label: formatReceituarioPotencyLabel(product, potency),
      });
    }
    for (const potency of liquids) {
      options.push({
        optionKey: encodeReceituarioCommercialOptionKey(product.id, potency.mgPerUnit),
        productId: product.id,
        potencyMg: potency.mgPerUnit,
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
): CommercialPracticalDoseResult | null {
  if (!totalMg || totalMg <= 0) return null;
  const allPotencies = parseCommercialPotencies(product);
  const potencies = selectedPotencyMg != null && selectedPotencyMg > 0
    ? allPotencies.filter((item) => item.mgPerUnit === selectedPotencyMg)
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
): string {
  if (!weightKg || weightKg <= 0) return 'A PREENCHER';
  const totalMg = doseMgKg * weightKg;
  const result = calculateCommercialPracticalDose(product, totalMg, selectedPotencyMg);
  if (!result) return `${formatDecimalPtBr(totalMg)} mg`;
  return result.displayAmount;
}

export function formatCommercialProductOptionLabel(product: CommercialMedicationProduct): string {
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
