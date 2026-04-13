/**
 * Ordem sugerida para subseções de diagnóstico: raciocínio e plano antes;
 * exames da triagem aos mais confirmatórios; recursos limitados por último.
 */
export const DIAGNOSTIC_SUBSECTION_PRIORITY: string[] = [
  'teachingOverview',
  'diagnosticReasoning',
  'pathophysiologyExplanation',
  'clinicalSuspicion',
  'summary',
  'overview',
  'description',
  'background',
  'definition',
  'diagnosticPlanStepByStep',
  'firstLineTests',
  'idealTests',
  'mostSensitiveTests',
  'mostSpecificTests',
  'confirmatoryTests',
  'interpretation',
  'limitations',
  'falsePositiveConsiderations',
  'falseNegativeConsiderations',
  'ancillaryTests',
  'laboratoryFindings',
  'laboratory',
  'laboratoryTests',
  'examesLaboratoriais',
  'imagingFindings',
  'imaging',
  'imagingStudies',
  'examesDeImagem',
  'advancedImaging',
  'endoscopy',
  'biopsy',
  'cytology',
  'histopathology',
  'microbiology',
  'molecularTests',
  'serology',
  'culture',
  'monitoringLabs',
  'minimumDatabase',
  'workup',
  'diagnosticPlanIfLimitedResources',
  'drugProtocolExamples',
  'abordagemDiagnostica',
  'examesEConfirmacao',
];

export function sortDiagnosticSubsectionEntries(entries: [string, unknown][]): [string, unknown][] {
  return [...entries].sort(([a], [b]) => {
    const ia = DIAGNOSTIC_SUBSECTION_PRIORITY.indexOf(a);
    const ib = DIAGNOSTIC_SUBSECTION_PRIORITY.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}
