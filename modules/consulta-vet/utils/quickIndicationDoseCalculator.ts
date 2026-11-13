import type { MedicationDose, MedicationQuickIndication } from '../types/medication';

export interface CalculatedIndicationDoseItem {
  label?: string;
  doseText: string;
  note?: string;
  isWarning?: boolean;
}

export interface CalculatedIndicationDoseResult {
  status: 'calculated' | 'fixed' | 'contraindicated' | 'unavailable';
  items: CalculatedIndicationDoseItem[];
}

export interface QuickIndicationWithSource extends MedicationQuickIndication {
  sourceDose?: MedicationDose;
}

const DOSE_UNIT_PATTERN = '(?:mg|mcg|µg|μg|g|UI|mL|ml)';
const TIME_UNIT_PATTERN = '(?:h|hora|horas|dia|min)';

function parsePtNumber(raw: string): number {
  return Number(raw.replace(',', '.'));
}

export function formatPatientDoseNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  const clean = Number(value.toPrecision(6));
  const abs = Math.abs(clean);

  let maxFractionDigits = 2;
  if (abs === 0) {
    maxFractionDigits = 0;
  } else if (abs >= 100) {
    maxFractionDigits = 1;
  } else if (abs >= 1) {
    maxFractionDigits = 2;
  } else if (abs >= 0.05) {
    maxFractionDigits = 3;
  } else {
    maxFractionDigits = 4;
  }

  return new Intl.NumberFormat('pt-BR', {
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFractionDigits,
  }).format(clean);
}

function normalizeDisplayUnit(unit: string): string {
  const trimmed = unit.trim();
  if (/^(?:mcg|μg|µg)$/i.test(trimmed)) return 'µg';
  if (/^ml$/i.test(trimmed)) return 'mL';
  if (/^ui$/i.test(trimmed)) return 'UI';
  if (/^horas?$/i.test(trimmed)) return 'h';
  return trimmed;
}

function formatDoseRangeText(
  minVal: number,
  maxVal: number | undefined,
  unit: string,
  prefix = ''
): string {
  const minFormatted = formatPatientDoseNumber(minVal);
  const rangeStr =
    maxVal !== undefined && Math.abs(maxVal - minVal) > 1e-9
      ? `${minFormatted} a ${formatPatientDoseNumber(maxVal)}`
      : minFormatted;

  return `${prefix}${rangeStr} ${unit}`.trim();
}

function calculateBsaM2(
  weightKg: number,
  species: 'dog' | 'cat' | 'both'
): {
  value: number;
  label: string;
} {
  // Constante padrão veterinária: 0,101 para cães e 0,100 para gatos
  const constant = species === 'cat' ? 0.1 : 0.101;
  const bsa = constant * Math.pow(weightKg, 2 / 3);
  return {
    value: bsa,
    label: `ASC ≈ ${formatPatientDoseNumber(bsa)} m²`,
  };
}

interface CapLimit {
  value: number;
  unit: string;
  per?: string;
}

function extractMaxCap(clause: string): CapLimit | null {
  const regex = new RegExp(
    `(?:m[áa]x(?:imo)?\\.?\\s*(?:de\\s*)?)(\\d+(?:[.,]\\d+)?)\\s*(${DOSE_UNIT_PATTERN})(?!\\s*\\/\\s*kg)(?:\\s*\\/\\s*(dose|dia|aplicação|h))?`,
    'i'
  );
  const match = clause.match(regex);
  if (!match) return null;

  const value = parsePtNumber(match[1]);
  if (!Number.isFinite(value) || value <= 0) return null;

  return {
    value,
    unit: normalizeDisplayUnit(match[2]),
    per: match[3] ? normalizeDisplayUnit(match[3]) : undefined,
  };
}

function applyCapIfApplicable(
  minVal: number,
  maxVal: number | undefined,
  baseUnit: string,
  timeUnit: string | undefined,
  cap: CapLimit | null,
  prefix = ''
): { doseText: string; note?: string; isWarning?: boolean } {
  const fullUnit = timeUnit ? `${baseUnit}/${timeUnit}` : baseUnit;

  if (!cap || cap.unit.toLowerCase() !== baseUnit.toLowerCase()) {
    return { doseText: formatDoseRangeText(minVal, maxVal, fullUnit, prefix) };
  }

  const capIsDaily = cap.per?.toLowerCase() === 'dia';
  const doseIsDaily = timeUnit?.toLowerCase() === 'dia';
  if (capIsDaily && !doseIsDaily) {
    return {
      doseText: formatDoseRangeText(minVal, maxVal, fullUnit, prefix),
      note: `Teto máximo: ${formatPatientDoseNumber(cap.value)} ${cap.unit}/${cap.per}`,
    };
  }

  const capUnitLabel = cap.per ? `${cap.unit}/${cap.per}` : cap.unit;
  const upperVal = maxVal ?? minVal;

  if (minVal >= cap.value) {
    return {
      doseText: `${prefix}${formatPatientDoseNumber(cap.value)} ${fullUnit}`,
      note: `Teto máximo atingido (máx. ${formatPatientDoseNumber(cap.value)} ${capUnitLabel})`,
      isWarning: true,
    };
  }

  if (upperVal > cap.value) {
    return {
      doseText: formatDoseRangeText(minVal, cap.value, fullUnit, prefix),
      note: `Limitado ao teto máx. de ${formatPatientDoseNumber(cap.value)} ${capUnitLabel}`,
      isWarning: true,
    };
  }

  return {
    doseText: formatDoseRangeText(minVal, maxVal, fullUnit, prefix),
    note: `Máx. ${formatPatientDoseNumber(cap.value)} ${capUnitLabel}`,
  };
}

function calculateFromSourceDose(
  dose: MedicationDose,
  weightKg: number
): CalculatedIndicationDoseResult {
  const rawUnit = String(dose.doseUnit || '').trim();
  const rawPer = String(dose.perWeightUnit || '').trim();

  const isPerKg = /^kg$/i.test(rawPer) || /\/\s*kg\b/i.test(rawUnit);
  const isPerM2 = /m[²2]/i.test(rawPer) || /\/\s*m[²2]\b/i.test(rawUnit);

  const cleanBaseUnit = normalizeDisplayUnit(
    rawUnit.replace(/\/\s*(?:kg|m[²2]|gato|c[ãa]o|cao|animal)\b/gi, '').trim()
  );

  const hasRange = dose.doseMax !== undefined && dose.doseMax !== dose.doseMin;
  const maxSource = hasRange ? dose.doseMax : undefined;

  let cap: CapLimit | null = null;
  if (dose.maximumDose) {
    const m = dose.maximumDose.match(
      new RegExp(
        `(\\d+(?:[.,]\\d+)?)\\s*(${DOSE_UNIT_PATTERN})(?:\\s*\\/\\s*[^\\s/]+\\s*\\/\\s*(dia|dose))?`,
        'i'
      )
    );
    if (m) {
      const capVal = parsePtNumber(m[1]);
      if (Number.isFinite(capVal) && capVal > 0) {
        cap = {
          value: capVal,
          unit: normalizeDisplayUnit(m[2]),
          per: m[3]?.toLowerCase(),
        };
      }
    }
  }

  if (isPerKg) {
    const minCalc = dose.doseMin * weightKg;
    const maxCalc = maxSource !== undefined ? maxSource * weightKg : undefined;
    const applied = applyCapIfApplicable(minCalc, maxCalc, cleanBaseUnit, undefined, cap);
    return {
      status: 'calculated',
      items: [
        {
          doseText: applied.doseText,
          note: applied.note || (dose.maximumDose ? `Limite: ${dose.maximumDose}` : undefined),
          isWarning: applied.isWarning,
        },
      ],
    };
  }

  if (isPerM2) {
    const bsa = calculateBsaM2(weightKg, dose.species);
    const minCalc = dose.doseMin * bsa.value;
    const maxCalc = maxSource !== undefined ? maxSource * bsa.value : undefined;
    return {
      status: 'calculated',
      items: [
        {
          doseText: formatDoseRangeText(minCalc, maxCalc, cleanBaseUnit),
          note: bsa.label,
        },
      ],
    };
  }

  const fixedTarget =
    /gato/i.test(rawUnit) || /gato/i.test(rawPer)
      ? 'por gato'
      : /c[ãa]o/i.test(rawUnit) || /c[ãa]o/i.test(rawPer)
      ? 'por cão'
      : 'por animal';

  return {
    status: 'fixed',
    items: [
      {
        label: `Dose fixa (${fixedTarget})`,
        doseText: formatDoseRangeText(dose.doseMin, maxSource, cleanBaseUnit),
      },
    ],
  };
}

/** Divide apenas fora de parênteses para não quebrar notas internas como "(q8h; até 25 mg)". */
function splitOutsideParens(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === '(') {
      depth += 1;
      current += ch;
    } else if (ch === ')') {
      depth = Math.max(0, depth - 1);
      current += ch;
    } else if (depth === 0 && (ch === '|' || ch === ';' || ch === '→')) {
      if (current.trim()) parts.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }

  if (current.trim()) parts.push(current.trim());
  return parts;
}

type PhaseTag = 'default' | 'followup' | 'titration';

function splitSubPhases(parts: string[]): Array<{ text: string; phaseTag: PhaseTag }> {
  const clauses: Array<{ text: string; phaseTag: PhaseTag }> = [];

  for (const part of parts) {
    const followSplit = part.split(
      /,\s*(?:seguid[oa]\s+(?:por|de)|podendo\s+seguir(?:\s+com)?)\s+/i
    );

    followSplit.forEach((sub, idx) => {
      const titrationSplit = sub.split(
        /,\s*(?:tituland[oa]|escaland[oa])\s+(?:progressivamente\s+|gradualmente\s+)?(?:para|at[ée](?:\s+m[ée]dia\s+de)?)\s+/i
      );

      titrationSplit.forEach((sub2, idx2) => {
        const trimmed = sub2.trim();
        if (!trimmed) return;
        const phaseTag: PhaseTag = idx2 > 0 ? 'titration' : idx > 0 ? 'followup' : 'default';
        clauses.push({ text: trimmed, phaseTag });
      });
    });
  }

  return clauses;
}

function shouldSkipClause(rawClause: string, cleanedClause: string): boolean {
  if (!cleanedClause) return true;
  if (/^(?:associad[oa]s?|combinad[oa]s?)\s+(?:a|à|ao|aos|às|com)\b/i.test(cleanedClause)) {
    return true;
  }
  if (/^em\s+associa[çc][ãa]o\s+(?:a|com)\b/i.test(cleanedClause)) return true;
  if (/^(?:nunca\s+usar|evitar|n[ãa]o\s+usar)\b/i.test(cleanedClause)) return true;
  // Conversões comerciais explícitas fora de parênteses, ex.: "Elura 20 mg/mL = 0,1 mL/kg q24h"
  if (
    /\b(?:mg|mcg|µg)\s*\/\s*mL\s*=/i.test(cleanedClause) ||
    /=\s*\d+(?:[.,]\d+)?\s*mL\s*\/\s*kg/i.test(cleanedClause)
  ) {
    return true;
  }
  if (rawClause !== cleanedClause && /\biniciar\s+na\s+faixa/i.test(cleanedClause)) {
    return true;
  }
  return false;
}

function extractClauseLabel(
  rawClause: string,
  cleanedClause: string,
  species: 'dog' | 'cat' | 'both',
  phaseTag: PhaseTag,
  totalClauses: number
): string | undefined {
  const colonMatch = rawClause.match(/^([^:]{2,36}):\s*/);
  if (colonMatch) {
    const candidate = colonMatch[1].replace(/\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
    if (candidate && !/\d/.test(candidate)) {
      return candidate;
    }
  }

  if (species === 'both') {
    const hasDog = /\b(?:c[ãa]es|c[ãa]o)\b/i.test(cleanedClause);
    const hasCat = /\b(?:gatos?|felinos?)\b/i.test(cleanedClause);
    if (hasDog && !hasCat) return 'Cães';
    if (hasCat && !hasDog) return 'Gatos';
  }

  if (phaseTag === 'followup') return 'Manutenção';
  if (phaseTag === 'titration') return 'Titulação';
  if (/\bno\s+dia\s+1\b/i.test(cleanedClause)) return 'Dia 1';
  if (/^iniciar\b/i.test(cleanedClause)) return 'Início';
  if (/^dose\s+padr[ãa]o\b/i.test(cleanedClause)) return 'Dose padrão';
  if (/^dose\s+m[áa]xima\b.*\bidosos\b/i.test(cleanedClause)) return 'Idosos';
  if (/^reduzir\s+para\b/i.test(cleanedClause)) return 'Redução';
  if (/^at[ée]\b/i.test(cleanedClause)) return 'Escalonamento';
  if (/^em\s+SNC\b/i.test(cleanedClause)) return 'SNC';
  if (totalClauses > 1 && /^ou\s+\d+(?:[.,]\d+)?\s*(?:mg|mcg|µg|g|UI|mL)\/kg\s+VO\b/i.test(cleanedClause)) {
    return 'Via Oral (VO)';
  }
  return undefined;
}

interface ParsedMatch {
  kind: 'weight' | 'bsa';
  index: number;
  endIndex: number;
  min: number;
  max?: number;
  unit: string;
  timeUnit?: string;
  prefix: string;
}

function findWeightAndBsaMatches(cleanedClause: string): ParsedMatch[] {
  const matches: ParsedMatch[] = [];

  const weightRegex = new RegExp(
    `(?:(m[áa]ximo|maximo|m[áa]x\\.?|at[ée])\\s+)?(\\d+(?:[.,]\\d+)?)(?:\\s*(?:a|[-–—])\\s*(\\d+(?:[.,]\\d+)?))?\\s*(${DOSE_UNIT_PATTERN})\\s*\\/\\s*(?:(\\d+(?:[.,]\\d+)?)\\s*)?kg(?:\\s*\\/\\s*(${TIME_UNIT_PATTERN}))?`,
    'gi'
  );

  let m: RegExpExecArray | null;
  while ((m = weightRegex.exec(cleanedClause)) !== null) {
    const qualifier = m[1]?.toLowerCase();
    const min = parsePtNumber(m[2]);
    const max = m[3] ? parsePtNumber(m[3]) : undefined;
    const unit = normalizeDisplayUnit(m[4]);
    const divisor = m[5] ? parsePtNumber(m[5]) : 1;
    const timeUnit = m[6] ? normalizeDisplayUnit(m[6]) : undefined;

    if (!Number.isFinite(min) || !Number.isFinite(divisor) || divisor <= 0) continue;

    let prefix = '';
    if (qualifier && /^m[áa]x/.test(qualifier)) prefix = 'máx. ';
    else if (qualifier && /^at[ée]/.test(qualifier)) prefix = 'até ';

    matches.push({
      kind: 'weight',
      index: m.index,
      endIndex: m.index + m[0].length,
      min: min / divisor,
      max: max !== undefined ? max / divisor : undefined,
      unit,
      timeUnit,
      prefix,
    });
  }

  const bsaRegex = new RegExp(
    `(?:(m[áa]ximo|maximo|m[áa]x\\.?|at[ée])\\s+)?(\\d+(?:[.,]\\d+)?)(?:\\s*(?:a|[-–—])\\s*(\\d+(?:[.,]\\d+)?))?\\s*(${DOSE_UNIT_PATTERN})\\s*\\/\\s*m[²2](?:\\s*\\/\\s*(${TIME_UNIT_PATTERN}))?`,
    'gi'
  );

  while ((m = bsaRegex.exec(cleanedClause)) !== null) {
    const qualifier = m[1]?.toLowerCase();
    const min = parsePtNumber(m[2]);
    const max = m[3] ? parsePtNumber(m[3]) : undefined;
    const unit = normalizeDisplayUnit(m[4]);
    const timeUnit = m[5] ? normalizeDisplayUnit(m[5]) : undefined;

    if (!Number.isFinite(min)) continue;

    let prefix = '';
    if (qualifier && /^m[áa]x/.test(qualifier)) prefix = 'máx. ';
    else if (qualifier && /^at[ée]/.test(qualifier)) prefix = 'até ';

    matches.push({
      kind: 'bsa',
      index: m.index,
      endIndex: m.index + m[0].length,
      min,
      max,
      unit,
      timeUnit,
      prefix,
    });
  }

  return matches.sort((a, b) => a.index - b.index);
}

function findFixedDoseMatch(cleanedClause: string): {
  doseText: string;
  label: string;
} | null {
  if (/^iniciar\s+na\s+faixa/i.test(cleanedClause)) return null;

  const perAnimalRegex = new RegExp(
    `(\\d+(?:[.,]\\d+)?)(?:\\s*(?:a|[-–—])\\s*(\\d+(?:[.,]\\d+)?))?\\s*(${DOSE_UNIT_PATTERN})\\s*(?:\\/|por)\\s*(gato|c[ãa]o|cao|animal)\\b`,
    'i'
  );
  const perAnimalMatch = cleanedClause.match(perAnimalRegex);
  if (perAnimalMatch) {
    const min = parsePtNumber(perAnimalMatch[1]);
    const max = perAnimalMatch[2] ? parsePtNumber(perAnimalMatch[2]) : undefined;
    const unit = normalizeDisplayUnit(perAnimalMatch[3]);
    const target = perAnimalMatch[4].toLowerCase().startsWith('gat')
      ? 'por gato'
      : perAnimalMatch[4].toLowerCase().startsWith('c')
      ? 'por cão'
      : 'por animal';

    return {
      label: `Dose fixa (${target})`,
      doseText: formatDoseRangeText(min, max, unit),
    };
  }

  const topicalMatch = cleanedClause.match(
    /(\d+(?:[.,]\d+)?)(?:\s*(?:a|[-–—])\s*(\d+(?:[.,]\d+)?))?\s*(gotas?|cm)\b/i
  );
  if (topicalMatch) {
    const min = parsePtNumber(topicalMatch[1]);
    const max = topicalMatch[2] ? parsePtNumber(topicalMatch[2]) : undefined;
    const rawUnit = topicalMatch[3].toLowerCase();
    const unit = rawUnit.startsWith('gota')
      ? max === undefined && min === 1
        ? 'gota'
        : 'gotas'
      : 'cm';

    return {
      label: 'Dose fixa tópica',
      doseText: formatDoseRangeText(min, max, unit),
    };
  }

  const standaloneRegex = new RegExp(
    `(\\d+(?:[.,]\\d+)?)(?:\\s*(?:a|[-–—])\\s*(\\d+(?:[.,]\\d+)?))?\\s*(${DOSE_UNIT_PATTERN})(?!\\s*\\/)\\b`,
    'i'
  );
  const standaloneMatch = cleanedClause.match(standaloneRegex);
  if (standaloneMatch) {
    const min = parsePtNumber(standaloneMatch[1]);
    const max = standaloneMatch[2] ? parsePtNumber(standaloneMatch[2]) : undefined;
    const unit = normalizeDisplayUnit(standaloneMatch[3]);
    return {
      label: 'Dose fixa',
      doseText: formatDoseRangeText(min, max, unit),
    };
  }

  return null;
}

export function calculateQuickIndicationDose(
  indication: QuickIndicationWithSource,
  weightKg: number
): CalculatedIndicationDoseResult {
  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    return { status: 'unavailable', items: [] };
  }

  if (indication.sourceDose) {
    return calculateFromSourceDose(indication.sourceDose, weightKg);
  }

  const summary = String(indication.doseSummary || '').trim();
  if (!summary || /consultar\s+monografia/i.test(summary)) {
    return { status: 'unavailable', items: [] };
  }

  if (/^\s*CONTRAINDICAD[OA]/i.test(summary)) {
    return {
      status: 'contraindicated',
      items: [
        {
          label: 'Contraindicado',
          doseText: 'Sem dose aplicável para esta indicação',
          isWarning: true,
        },
      ],
    };
  }

  const rawMajorParts = splitOutsideParens(summary);
  const clauses = splitSubPhases(rawMajorParts);

  const calculatedItems: CalculatedIndicationDoseItem[] = [];
  const fixedItems: CalculatedIndicationDoseItem[] = [];

  for (const clause of clauses) {
    const cap = extractMaxCap(clause.text);
    const cleaned = clause.text.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
    if (shouldSkipClause(clause.text, cleaned)) continue;

    const label = extractClauseLabel(
      clause.text,
      cleaned,
      indication.species,
      clause.phaseTag,
      clauses.length
    );
    const matches = findWeightAndBsaMatches(cleaned);

    if (matches.length > 0) {
      const partsText: string[] = [];
      const notes: string[] = [];
      let hasWarning = false;

      matches.forEach((match, idx) => {
        const multiplier =
          match.kind === 'bsa'
            ? calculateBsaM2(weightKg, indication.species).value
            : weightKg;

        const minCalc = match.min * multiplier;
        const maxCalc = match.max !== undefined ? match.max * multiplier : undefined;

        const applied = applyCapIfApplicable(
          minCalc,
          maxCalc,
          match.unit,
          match.timeUnit,
          cap,
          match.prefix
        );

        const segmentText = applied.doseText;
        if (match.kind === 'bsa') {
          const bsa = calculateBsaM2(weightKg, indication.species);
          notes.push(bsa.label);
        }
        if (applied.note) {
          notes.push(applied.note);
        }
        if (applied.isWarning) {
          hasWarning = true;
        }

        if (idx === 0) {
          partsText.push(segmentText);
        } else {
          const between = cleaned.slice(matches[idx - 1].endIndex, match.index);
          if (/\+/.test(between)) {
            partsText.push(`+ ${segmentText}`);
          } else if (/b[óo]lus/i.test(between)) {
            partsText.push(`(bólus de ${segmentText})`);
          } else if (/\bou\b/i.test(between)) {
            if (partsText[partsText.length - 1] !== segmentText) {
              partsText.push(`ou ${segmentText}`);
            }
          } else {
            partsText.push(`/ ${segmentText}`);
          }
        }
      });

      const dedupedNotes = [...new Set(notes)];
      calculatedItems.push({
        label,
        doseText: partsText.join(' '),
        note: dedupedNotes.length > 0 ? dedupedNotes.join(' • ') : undefined,
        isWarning: hasWarning,
      });
      continue;
    }

    const fixed = findFixedDoseMatch(cleaned);
    if (fixed) {
      fixedItems.push({
        label: label ? `${label} — ${fixed.label}` : fixed.label,
        doseText: fixed.doseText,
      });
    }
  }

  if (calculatedItems.length > 0) {
    return { status: 'calculated', items: calculatedItems };
  }

  if (fixedItems.length > 0) {
    return { status: 'fixed', items: fixedItems };
  }

  return { status: 'unavailable', items: [] };
}
