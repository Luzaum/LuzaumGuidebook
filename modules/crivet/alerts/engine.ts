import type { Alert, DrugKey, PatientContext, Rule, ComorbidityKey } from "./types";

export function evaluateAlerts(params: {
  drug: DrugKey;
  comorbidities: ComorbidityKey[];
  ctx: PatientContext;
  rules: Rule[];
}): Alert[] {
  const set = new Set<ComorbidityKey>(params.comorbidities);

  const alerts = params.rules
    .filter((r) => (r.drug === "any" ? true : r.drug === params.drug))
    .filter((r) => (r.species ? (params.ctx.species === r.species || r.species === "any") : true))
    .filter((r) => r.when({ drug: params.drug, comorbidities: set, ctx: params.ctx }))
    .map((r) => r.alert({ drug: params.drug, comorbidities: set, ctx: params.ctx }));

  // Dedup por id, mantendo maior score (caso regras colidam)
  const bestById = new Map<string, Alert>();
  for (const a of alerts) {
    const prev = bestById.get(a.id);
    if (!prev || a.score > prev.score) bestById.set(a.id, a);
  }

  // Ordena por score desc, depois title
  const deduplicatedAlerts: Alert[] = [];
  bestById.forEach((alert) => deduplicatedAlerts.push(alert));
  return deduplicatedAlerts.sort((a, b) => (b.score - a.score) || a.title.localeCompare(b.title));
}
