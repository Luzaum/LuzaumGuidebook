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

export function calculateCommercialPracticalDose(
  product: CommercialMedicationProduct,
  totalMg: number,
): CommercialPracticalDoseResult | null {
  if (!totalMg || totalMg <= 0) return null;
  const potencies = parseCommercialPotencies(product);
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
): string {
  if (!weightKg || weightKg <= 0) return 'A PREENCHER';
  const totalMg = doseMgKg * weightKg;
  const result = calculateCommercialPracticalDose(product, totalMg);
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
