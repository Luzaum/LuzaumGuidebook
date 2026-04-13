import { EditorialSectionValue } from '../types/common';

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return Boolean(v && typeof v === 'object' && !Array.isArray(v));
}

/**
 * Une abordagem diagnóstica e exames num único objeto para leitura contínua:
 * chaves da abordagem primeiro, depois as dos exames (sem colisão típica na prática).
 */
export function mergeDiseaseDiagnosticSections(
  diagnostics: EditorialSectionValue | undefined,
  diagnosticApproach: EditorialSectionValue | undefined
): EditorialSectionValue | undefined {
  const approach = diagnosticApproach;
  const exams = diagnostics;

  if (approach === undefined || approach === null) {
    return exams === undefined || exams === null ? undefined : exams;
  }
  if (exams === undefined || exams === null) {
    return approach;
  }

  if (isPlainObject(approach) && isPlainObject(exams)) {
    return { ...approach, ...exams } as EditorialSectionValue;
  }

  return {
    abordagemDiagnostica: approach as EditorialSectionValue,
    examesEConfirmacao: exams as EditorialSectionValue,
  } as EditorialSectionValue;
}
