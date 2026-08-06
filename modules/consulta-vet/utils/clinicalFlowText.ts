import type { DiseaseQuickSummaryFlowStep } from '../types/disease';
import type { EditorialTreatmentPriorityStep } from '../types/common';

/** Acrescenta citação editorial no fim do parágrafo, no estilo "(Autor et al., ano)." */
export function appendInlineCitation(text: string, citation?: string | null): string {
  const body = text.trim();
  const cite = citation?.trim();
  if (!cite) return body;
  if (!body) return `(${cite}).`;

  if (body.includes(`(${cite})`) || body.includes(cite)) return body;

  const endsWithClosing = /[.!?]$/.test(body);
  return `${body}${endsWithClosing ? ' ' : '. '}(${cite}).`;
}

export function composeFlowStepDetail(step: DiseaseQuickSummaryFlowStep): string | undefined {
  const detail = step.detail?.trim();
  if (!detail && !step.evidence?.trim()) return undefined;
  return appendInlineCitation(detail ?? '', step.evidence);
}

export function composeTreatmentPrioritySummary(step: EditorialTreatmentPriorityStep): string {
  return appendInlineCitation(step.summary, step.evidence);
}
