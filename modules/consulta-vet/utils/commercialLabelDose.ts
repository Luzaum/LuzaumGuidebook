import type { CommercialMedicationDoseEntry, CommercialMedicationProduct } from '../types/commercialMedication';

export const PRACTICAL_DOSE_PATTERN =
  /(\d+(?:[,.]\d+)?\s*(?:a|-)?\s*\d*(?:[,.]\d+)?\s*(?:mg|mcg|ug|µg|m²|m2|ml|mL|UI|U|%)\s*(?:\/\s*(?:kg|m²|m2|5 kg|10 kg|20 kg|40 kg))?|\d+(?:[,.]\d+)?\s*(?:a|-)\s*\d+(?:[,.]\d+)?\s*mm\b|\d+(?:[,.]\d+)?\s*mm\b|\d+(?:[,.]\d+)?\s*(?:cm|min|minuto|minutos|h|hora|horas|dia|dias|semana|semanas)\b|\d+\s*(?:a|-)\s*\d+\s*(?:x|vez|vezes)\s*(?:\/|por)?\s*(?:dia|semana)|\d+\s*(?:x|vez|vezes)\s*(?:\/|por)?\s*(?:dia|semana)|(?:uma|duas|tres|três)\s+vez(?:es)?\s+(?:ao|por)\s+(?:dia|mes|mês|semana)|\b(?:q\s*\d+\s*h?|q\d+h?|sid|bid|tid|qid)\b|\b(?:a\s+)?cada\s+\d+|\d+\s*(?:gota|gotas|pipeta|pipetas|tablete|tabletes|aplicador|aplicadores|flaconete|flaconetes|comprimido|comprimidos|comp|capsula|capsulas|cápsula|cápsulas|spray|jato|jatos|borrifada|borrifadas|aplicação|aplicações|aplicacao|aplicacoes|coleira)\b|(?:preencher|instilar)\s+(?:o\s+)?conduto|quantidade\s+suficiente|(?:camada|pel[ií]cula)\s+fina|fina\s+camada|faixa\s+de\s+peso|dose\s+do\s+medidor|diretamente\s+(?:na|no)|todas\s+as\s+refeições|número\s+de\s+borrifadas|(?:borrifar|borrifação|embeber\s+algodão|seringa\s+graduada|pós-banho|troca\s+de\s+curativo)|(?:deixar\s+agir|tempo\s+de\s+contato|banhar|molhar|umedecer|massagear|enxaguar|aplicar\s+no\s+banho|escovar)|diariamente|semanal(?:mente)?|mensal(?:mente)?)/i;

/** Textos-placeholder que não devem aparecer como posologia de bula principal. */
export const BLOCKED_DOSE_PATTERN =
  /(dose bloqueada|bloquear receita|conferir bula|pendente de bula|posologia de bula n[aã]o cadastrada|sem dose padr[aã]o|sem dose espec[ií]fica|dose conforme indica[cç][aã]o|conforme indica[cç][aã]o registrada|seguir bula|sem bula veterin[aá]ria|sem dose veterin[aá]ria|bula veterin[aá]ria varia|calcular a dose de|conforme apresenta[cç][aã]o|conforme protocolo|dose por bula|conforme faixas de peso|dose por faixa de peso|conforme peso\/esp[eé]cie|dose individualizada|dose por indica[cç][aã]o|conforme bula\/orienta[cç][aã]o|aplicar conforme bula)/i;

/** Posologia acionável — dose por peso, por animal ou faixa comercial explícita. */
export const STRONG_DOSE_PATTERN =
  /(\d+(?:[,.]\d+)?\s*(?:a|-)?\s*\d*(?:[,.]\d+)?\s*(?:mg|mcg|ug|µg|ml|mL|UI|U|%)\s*\/\s*(?:kg|m²|m2|gato|gatos|c[aã]o|c[aã]es|5 kg|10 kg|20 kg|40 kg)|\d+(?:[,.]\d+)?\s*(?:comp|tablete|tabletes|capsula|c[aá]psula|pipeta|pipetas|gota|gotas|mL|ml|aplicador|aplicadores|spray|jato|jatos|borrifada|borrifadas|flaconete|flaconetes)\s*\/\s*\d+\s*kg|\d+(?:[,.]\d+)?\s*(?:mg|UI|mL)\/(?:gato|gatos|c[aã]o|c[aã]es)|faixa\s+de\s+peso|\d+(?:[,.]\d+)?\s*(?:a|-)\s*\d+(?:[,.]\d+)?\s*mm\b|\d+(?:[,.]\d+)?\s*mm\b|(?:camada|pel[ií]cula)\s+fina|fina\s+camada|troca\s+de\s+curativo|quantidade\s+suficiente|\d+\s*(?:comp|tablete|capsula|c[aá]psula|pipeta|gota|gotas|mL|ml)\b.*(?:at[eé]|acima|kg|gato|c[aã]o))/i;

export function hasPracticalLabelDoseText(dose: string | undefined): dose is string {
  if (!dose) return false;
  if (BLOCKED_DOSE_PATTERN.test(dose) && !STRONG_DOSE_PATTERN.test(dose)) return false;
  return PRACTICAL_DOSE_PATTERN.test(dose);
}

function practicalPlumbsEntries(product: CommercialMedicationProduct) {
  const dog = (product.dosageGuidance?.plumbs?.dog || []).filter((entry) => hasPracticalLabelDoseText(entry.dose));
  const cat = (product.dosageGuidance?.plumbs?.cat || []).filter((entry) => hasPracticalLabelDoseText(entry.dose));
  return { dog, cat };
}

function summarizePlumbs(entries: CommercialMedicationDoseEntry[]) {
  return entries
    .slice(0, 2)
    .map((entry) => `${entry.title}: ${entry.dose}`)
    .join('; ');
}

function extractPracticalSentence(text: string): string | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const sentences = trimmed
    .split(/(?<=[.;])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  const practical = sentences.find((sentence) => hasPracticalLabelDoseText(sentence));
  if (practical) return practical.replace(/\.$/, '');

  if (hasPracticalLabelDoseText(trimmed)) {
    return trimmed.replace(/\.$/, '');
  }

  return null;
}

function buildPlumbsLabelDose(product: CommercialMedicationProduct): string | null {
  const { dog, cat } = practicalPlumbsEntries(product);
  const parts: string[] = [];

  if (dog.length) parts.push(`Cães: ${summarizePlumbs(dog)}`);
  if (cat.length) parts.push(`Gatos: ${summarizePlumbs(cat)}`);

  if (!parts.length) return null;
  const combined = parts.join('. ');
  return hasPracticalLabelDoseText(combined) ? combined : null;
}

/** Preenche labelDose a partir de labelDirections, Plumb's ou receita quando ausente ou genérico. */
export function resolveCommercialLabelDose(product: CommercialMedicationProduct): string | undefined {
  const current = product.dosageGuidance?.labelDose?.trim();
  if (current && hasPracticalLabelDoseText(current)) return current;

  const fromDirections = extractPracticalSentence(product.labelDirections || '');
  if (fromDirections) return fromDirections;

  const fromPlumbs = buildPlumbsLabelDose(product);
  if (fromPlumbs) return fromPlumbs;

  const fromPrescription = extractPracticalSentence(product.prescriptionExample || '');
  if (fromPrescription) return fromPrescription;

  return current || undefined;
}

export function enrichCommercialProductLabelDose(product: CommercialMedicationProduct): CommercialMedicationProduct {
  const resolved = resolveCommercialLabelDose(product);
  const current = product.dosageGuidance?.labelDose?.trim();

  if (!resolved || resolved === current) return product;

  return {
    ...product,
    dosageGuidance: {
      ...product.dosageGuidance,
      labelDose: resolved,
    },
  };
}

export type CommercialLabelDoseAuditStatus = 'ok' | 'blocked' | 'missing' | 'weak' | 'enriched';

export function auditCommercialLabelDose(product: CommercialMedicationProduct) {
  const raw = product.dosageGuidance?.labelDose?.trim() || '';
  const resolved = resolveCommercialLabelDose(product) || '';

  let rawStatus: CommercialLabelDoseAuditStatus = 'ok';
  if (!raw) rawStatus = 'missing';
  else if (BLOCKED_DOSE_PATTERN.test(raw)) rawStatus = 'blocked';
  else if (!hasPracticalLabelDoseText(raw)) rawStatus = 'weak';

  const finalStatus: CommercialLabelDoseAuditStatus =
    hasPracticalLabelDoseText(resolved) && resolved !== raw ? 'enriched' : rawStatus;

  return {
    id: product.id,
    name: product.name,
    commercialClass: product.commercialClass,
    rawLabelDose: raw,
    resolvedLabelDose: resolved,
    rawStatus,
    finalStatus: hasPracticalLabelDoseText(resolved) ? 'ok' : finalStatus === 'enriched' ? 'ok' : finalStatus,
    wasEnriched: Boolean(resolved && resolved !== raw && hasPracticalLabelDoseText(resolved)),
  };
}
