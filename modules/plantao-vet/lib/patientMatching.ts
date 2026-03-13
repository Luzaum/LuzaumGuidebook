import { ShiftPatient } from '../types';

export function normalizePatientName(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getPatientMatchScore(a: string, b: string) {
  const normalizedA = normalizePatientName(a);
  const normalizedB = normalizePatientName(b);

  if (!normalizedA || !normalizedB) {
    return 0;
  }

  if (normalizedA === normalizedB) {
    return 1;
  }

  if (normalizedA.includes(normalizedB) || normalizedB.includes(normalizedA)) {
    return 0.86;
  }

  const tokensA = normalizedA.split(' ');
  const tokensB = normalizedB.split(' ');
  const sharedTokens = tokensA.filter((token) => token && tokensB.includes(token));
  const longestLength = Math.max(tokensA.length, tokensB.length);

  return longestLength > 0 ? sharedTokens.length / longestLength : 0;
}

export function findLikelyShiftPatientMatches(patients: ShiftPatient[], name: string, threshold = 0.45) {
  return patients
    .map((patient) => ({
      patient,
      score: getPatientMatchScore(patient.displayName, name),
    }))
    .filter((match) => match.score >= threshold)
    .sort((a, b) => b.score - a.score);
}
