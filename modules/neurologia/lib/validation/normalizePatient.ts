import type { Sex } from '../stores/caseStore'

export function normalizePatient<T extends { sex?: Sex | null; pregnant?: boolean; lactating?: boolean }>(
  p: T,
): T {
  const out = { ...p }
  if (out.sex === 'male') {
    out.pregnant = false
    out.lactating = false
  }
  return out
}
