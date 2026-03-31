import { ParsedBloodGasInput, Species, SampleType, ParsedField, BloodGasInput } from '../types';
import { normalizeFiO2Input } from '../utils/fio2';

type PatternDef = {
  regex: RegExp;
  key: keyof BloodGasInput;
  name: string;
};

const PATTERNS: PatternDef[] = [
  { regex: /(?:pH)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'pH', name: 'pH' },
  { regex: /(?:pCO2|PaCO2|PvCO2|PCO2|press[aã]o\s*parcial\s*de\s*CO2|CO2\s*p)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'pCO2', name: 'pCO2' },
  { regex: /(?:pO2|PaO2|PvO2|PO2|press[aã]o\s*parcial\s*de\s*O2|O2\s*p)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'pO2', name: 'pO2' },
  { regex: /(?:HCO3|cHCO3|std\s*HCO3|bicarbonato|bic|HCO3\-)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'HCO3', name: 'HCO3' },
  { regex: /(?:tCO2|cCO2|ctCO2|CO2\s*total|Total\s*CO2)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'tCO2', name: 'tCO2' },
  { regex: /(?:BE|Base\s*Excess|SBE|ABE|d[eé]ficit\s*de\s*base|Excesso\s*de\s*base|BE\(ecf\)|BE\(B\)|BEB)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'BE', name: 'Base Excess' },
  { regex: /(?:sO2|SatO2|SaO2|SO2|Satura[çc][ãa]o\s*(?:de\s*)?O2|Sat\s*O2)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'sO2', name: 'SatO2' },
  { regex: /(?:Na\+?|S[óo]dio|Sodium)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'Na', name: 'Sodio' },
  { regex: /(?:K\+?|Pot[aá]ssio|Potassium)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'K', name: 'Potassio' },
  { regex: /(?:Cl\-?|Cloro|Cloreto|Chloride)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'Cl', name: 'Cloro' },
  { regex: /(?:Albumina|Alb|Albumin)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'albumin', name: 'Albumina' },
  { regex: /(?:Lactato|Lac|Lactate|[Áa]cido\s*l[aá]tico)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'lactate', name: 'Lactato' },
  { regex: /(?:Glicose|Glucose|Glu|Glicemia|GLI)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'glucose', name: 'Glicose' },
  { regex: /(?:iCa|Ca\+\+|C[aá]lcio\s*ionizado|ionized\s*calcium|Ca\s*ion)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'iCa', name: 'Calcio ionizado' },
  { regex: /(?:tCa|C[aá]lcio\s*total|Ca\s*Total|Total\s*Calcium)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'tCa', name: 'Calcio total' },
  { regex: /(?:Ht|HCT|Hemat[oó]crito|Microhemat[oó]crito)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'hematocrit', name: 'Hematocrito' },
  { regex: /(?:Hb|HGB|tHb|Hemoglobina)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'hemoglobin', name: 'Hemoglobina' },
  { regex: /(?:AG|Anion\s*Gap|Hiato\s*ani[oô]nico|GAP)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'AG', name: 'Anion gap' },
  { regex: /(?:FiO2|FIO2|Fra[çc][ãa]o\s*inspirada\s*de\s*oxig[eê]nio)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'fio2', name: 'FiO2' },
  { regex: /(?:Temperatura|Temp|T\s*\(C\)|T\(C\))\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'temperature', name: 'Temperatura' },
  { regex: /(?:H\+)\s*[:=.\-]*\s*([-+]?\d+[.,]\d+|[-+]?\d+)/gi, key: 'H', name: 'H+' },
];

function parseNumeric(raw: string): number | undefined {
  const normalized = raw.replace(',', '.').trim();
  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) ? value : undefined;
}

function getConfidence(key: keyof BloodGasInput, value: number): 'high' | 'medium' | 'low' {
  if (key === 'pH' && (value < 6.5 || value > 8.0)) return 'low';
  if (key === 'pCO2' && (value < 5 || value > 150)) return 'low';
  if (key === 'pO2' && (value < 10 || value > 800)) return 'low';
  if (key === 'HCO3' && (value < 3 || value > 60)) return 'low';
  if (key === 'BE' && (value < -35 || value > 35)) return 'low';
  if (key === 'Na' && (value < 100 || value > 190)) return 'low';
  if (key === 'K' && (value < 1.5 || value > 10)) return 'low';
  if (key === 'Cl' && (value < 60 || value > 160)) return 'low';
  if (key === 'temperature' && (value < 30 || value > 43)) return 'low';
  if (key === 'fio2' && value > 0 && value < 0.21) return 'low';
  return 'high';
}

export function parseBloodGasText(text: string, species: Species, sampleType: SampleType): ParsedBloodGasInput {
  const result: ParsedBloodGasInput = {
    species,
    sampleType,
    recognizedFields: [],
    unrecognizedText: [],
    suspectFields: [],
    parserNotes: [],
  };

  const working = text.replace(/\u0000/g, ' ');
  const consumedSegments = new Set<string>();
  const valuesByKey = new Map<keyof BloodGasInput, number[]>();

  for (const pattern of PATTERNS) {
    const matches = Array.from(working.matchAll(pattern.regex));

    for (const match of matches) {
      const rawValue = match[1];
      const parsed = parseNumeric(rawValue);

      if (parsed === undefined) {
        continue;
      }

      const segment = match[0];
      consumedSegments.add(segment);

      let value = parsed;
      let confidence = getConfidence(pattern.key, parsed);
      let normalizedDisplay: string | undefined;

      if (pattern.key === 'fio2') {
        const normalized = normalizeFiO2Input(parsed);
        if (normalized.fraction !== undefined) {
          value = normalized.fraction;
          normalizedDisplay = normalized.displayPercent !== undefined ? `${normalized.displayPercent}%` : undefined;
          if (normalized.note) {
            result.parserNotes?.push(normalized.note);
          }
          if (normalized.warning) {
            result.parserNotes?.push(normalized.warning);
            confidence = 'medium';
            result.suspectFields?.push('fio2');
          }
        } else {
          confidence = 'low';
          result.suspectFields?.push('fio2');
          if (normalized.warning) {
            result.parserNotes?.push(normalized.warning);
          }
        }
      }

      if (pattern.key === 'pO2' && /PvO2/i.test(segment) && sampleType === 'arterial') {
        confidence = 'medium';
        result.parserNotes?.push('Valor rotulado como PvO2 em um contexto de amostra arterial. Confirme o tipo de amostra.');
      }

      if (pattern.key === 'pO2' && /PaO2/i.test(segment) && sampleType === 'venous') {
        confidence = 'medium';
        result.parserNotes?.push('Valor rotulado como PaO2 em uma amostra venosa. Confirme o tipo de amostra.');
      }

      const previousValues = valuesByKey.get(pattern.key) || [];
      previousValues.push(value);
      valuesByKey.set(pattern.key, previousValues);

      result.recognizedFields?.push({
        key: pattern.key,
        value,
        confidence,
        originalText: segment,
        normalizedDisplay,
      });
    }
  }

  for (const [key, values] of valuesByKey.entries()) {
    const unique = Array.from(new Set(values.map((value) => value.toFixed(4))));

    if (unique.length > 1) {
      result.suspectFields?.push(key);
      result.parserNotes?.push(`Foram encontrados valores conflitantes para ${String(key)}. O primeiro valor reconhecido foi mantido no formulario.`);
    }

    const first = values[0];
    (result as Record<string, unknown>)[key] = first;
  }

  const residualText = working
    .split(/[\n\r]+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 2 && !/^[\s.,:;=-]+$/.test(line))
    .filter((line) => !Array.from(consumedSegments).some((segment) => line.includes(segment)));

  if (residualText.length > 0) {
    result.unrecognizedText = residualText;
  }

  const missing: string[] = [];
  if (result.pH === undefined) missing.push('pH');
  if (result.pCO2 === undefined) missing.push('pCO2');
  if (result.HCO3 === undefined && result.BE === undefined) missing.push('HCO3 ou BE');
  if (sampleType === 'arterial' && result.pO2 === undefined) missing.push('pO2');

  if (missing.length > 0) {
    result.missingCrucialParams = missing;
  }

  return result;
}
