import { ShiftImportCopyOptions } from '../types';

export const DEFAULT_SHIFT_IMPORT_COPY_OPTIONS: ShiftImportCopyOptions = {
  copyIdentification: true,
  copySummary: true,
  copyDefiningPhrase: true,
  copyProblems: true,
  copyMedications: true,
  copyAlerts: true,
  copyOpenTasks: false,
};

export function normalizeShiftImportCopyOptions(
  input?: Partial<ShiftImportCopyOptions>
): ShiftImportCopyOptions {
  return {
    ...DEFAULT_SHIFT_IMPORT_COPY_OPTIONS,
    ...input,
  };
}
