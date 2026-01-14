import type { Severity } from "./types";

export const severityScore: Record<Severity, number> = {
  green: 10,
  yellow: 30,
  orange: 60,
  red: 85,
  black: 100,
};

export function makeAlertId(ruleId: string, drug: string) {
  return `${ruleId}:${drug}`;
}
