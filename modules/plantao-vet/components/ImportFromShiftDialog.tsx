import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, CheckSquare2, Copy, Moon, Sun, X } from 'lucide-react';

import { compareScheduledTimes, getPatientStatusLabel, getPatientStatusVariant } from '../lib/presentation';
import { SHIFT_TYPE_LABELS, SHIFT_WINDOW_LABELS, formatDateLong } from '../lib/shifts';
import {
  getActiveShift,
  getPreviousShifts,
  getShiftPatients,
  getShiftTasks,
  usePlantaoVetSnapshot,
} from '../store/selectors';
import { usePlantaoVetStore } from '../store/usePlantaoVetStore';
import { ShiftImportCopyOptions } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

const defaultOptions: ShiftImportCopyOptions = {
  copyIdentification: true,
  copySummary: true,
  copyDefiningPhrase: true,
  copyProblems: true,
  copyMedications: true,
  copyAlerts: true,
  copyOpenTasks: false,
};

interface ImportFromShiftDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ImportFromShiftDialog({ open, onClose }: ImportFromShiftDialogProps) {
  const snapshot = usePlantaoVetSnapshot();
  const importPatientsFromShift = usePlantaoVetStore((state) => state.importPatientsFromShift);

  const activeShift = useMemo(() => getActiveShift(snapshot), [snapshot]);
  const previousShifts = useMemo(() => getPreviousShifts(snapshot, activeShift?.id || null), [activeShift?.id, snapshot]);

  const [sourceShiftId, setSourceShiftId] = useState<string | null>(null);
  const [selectedPatientIds, setSelectedPatientIds] = useState<string[]>([]);
  const [copyOptions, setCopyOptions] = useState<ShiftImportCopyOptions>(defaultOptions);

  useEffect(() => {
    if (!open) {
      return;
    }

    const nextSourceShiftId = previousShifts[0]?.id || null;
    setSourceShiftId(nextSourceShiftId);
    setCopyOptions(defaultOptions);
  }, [open, previousShifts]);

  const sourcePatients = useMemo(
    () => getShiftPatients(snapshot, sourceShiftId),
    [snapshot, sourceShiftId]
  );

  const sourceTasks = useMemo(
    () => getShiftTasks(snapshot, sourceShiftId),
    [snapshot, sourceShiftId]
  );

  useEffect(() => {
    setSelectedPatientIds(sourcePatients.map((patient) => patient.id));
  }, [sourcePatients]);

  function togglePatientSelection(patientId: string) {
    setSelectedPatientIds((current) =>
      current.includes(patientId) ? current.filter((id) => id !== patientId) : [...current, patientId]
    );
  }

  function toggleOption(key: keyof ShiftImportCopyOptions) {
    setCopyOptions((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function handleImport() {
    if (!activeShift || !sourceShiftId || selectedPatientIds.length === 0) {
      return;
    }

    importPatientsFromShift({
      sourceShiftId,
      targetShiftId: activeShift.id,
      shiftPatientIds: selectedPatientIds,
      copyOptions,
    });

    onClose();
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="plantao-vet-backdrop" onClick={onClose} aria-label="Fechar importacao entre plantoes" />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            className="plantao-vet-modal relative z-10 w-full max-w-6xl overflow-hidden rounded-3xl"
          >
            <div className="grid min-h-[620px] lg:grid-cols-[280px_minmax(0,1fr)]">
              <div className="border-b border-[var(--pv-border)] bg-[var(--pv-surface-hover)]/45 p-6 lg:border-b-0 lg:border-r">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-[var(--pv-text-main)]">Importar de outro plantao</h2>
                    <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                      Escolha o plantao de origem para trazer pacientes para o turno ativo.
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar dialogo">
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {previousShifts.length > 0 ? (
                    previousShifts.map((shift) => {
                      const isSelected = shift.id === sourceShiftId;
                      const isDayShift = shift.shiftType === 'diurno';

                      return (
                        <button
                          key={shift.id}
                          type="button"
                          onClick={() => setSourceShiftId(shift.id)}
                          className={[
                            'w-full rounded-2xl border p-4 text-left transition-colors',
                            isSelected
                              ? 'border-[var(--pv-primary)] bg-[var(--pv-surface)]'
                              : 'border-[var(--pv-border)] bg-[var(--pv-surface)] hover:border-[var(--pv-primary)]/35',
                          ].join(' ')}
                        >
                          <div className="mb-3 flex items-center gap-3">
                            <div
                              className={[
                                'flex h-10 w-10 items-center justify-center rounded-xl',
                                isDayShift
                                  ? 'bg-[var(--pv-accent-yellow)]/15 text-[var(--pv-accent-yellow-strong)]'
                                  : 'bg-[var(--pv-primary)]/10 text-[var(--pv-primary)]',
                              ].join(' ')}
                            >
                              {isDayShift ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </div>
                            <div>
                              <p className="font-semibold text-[var(--pv-text-main)]">
                                {SHIFT_TYPE_LABELS[shift.shiftType]}
                              </p>
                              <p className="text-sm text-[var(--pv-text-muted)]">{formatDateLong(shift.dateISO)}</p>
                            </div>
                          </div>
                          <p className="text-xs text-[var(--pv-text-muted)]">
                            {SHIFT_WINDOW_LABELS[shift.shiftType]}
                          </p>
                        </button>
                      );
                    })
                  ) : (
                    <div className="rounded-2xl border border-dashed border-[var(--pv-border)] bg-[var(--pv-surface)] p-6 text-center">
                      <Calendar className="mx-auto mb-3 h-8 w-8 text-[var(--pv-text-muted)]/50" />
                      <p className="font-medium text-[var(--pv-text-main)]">Nenhum plantao anterior disponivel</p>
                      <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                        Assim que houver outro plantao salvo, a importacao entre turnos aparece aqui.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                {sourceShiftId ? (
                  <div className="flex h-full flex-col">
                    <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--pv-text-main)]">Pacientes do plantao de origem</h3>
                        <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                          Selecione individualmente ou importe todos os pacientes deste plantao.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" onClick={() => setSelectedPatientIds(sourcePatients.map((patient) => patient.id))}>
                          Importar todos
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedPatientIds([])}>
                          Limpar selecao
                        </Button>
                      </div>
                    </div>

                    <div className="grid flex-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                      <div className="space-y-3">
                        {sourcePatients.length > 0 ? (
                          sourcePatients.map((patient) => {
                            const openTasks = sourceTasks
                              .filter((task) => task.shiftPatientId === patient.id && !task.completed)
                              .sort((a, b) => compareScheduledTimes(a.scheduledTime, b.scheduledTime));

                            return (
                              <button
                                key={patient.id}
                                type="button"
                                onClick={() => togglePatientSelection(patient.id)}
                                className={[
                                  'w-full rounded-2xl border p-4 text-left transition-colors',
                                  selectedPatientIds.includes(patient.id)
                                    ? 'border-[var(--pv-primary)] bg-[var(--pv-primary)]/5'
                                    : 'border-[var(--pv-border)] bg-[var(--pv-surface)] hover:border-[var(--pv-primary)]/35',
                                ].join(' ')}
                              >
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                  <span className="text-lg font-semibold text-[var(--pv-text-main)]">
                                    {patient.displayName}
                                  </span>
                                  <Badge variant={getPatientStatusVariant(patient.status)}>
                                    {getPatientStatusLabel(patient.status)}
                                  </Badge>
                                  {patient.importedFromShiftId ? (
                                    <Badge variant="secondary">Importado anteriormente</Badge>
                                  ) : null}
                                </div>
                                <p className="text-sm text-[var(--pv-text-muted)]">
                                  {patient.mainDiagnosis || 'Sem diagnostico principal registrado.'}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {patient.alertBadges.slice(0, 3).map((badge) => (
                                    <Badge key={badge} variant="outline" className="bg-[var(--pv-surface-hover)]">
                                      {badge}
                                    </Badge>
                                  ))}
                                  {openTasks[0] ? (
                                    <Badge variant="secondary">
                                      {openTasks[0].scheduledTime || '--'} • {openTasks[0].title}
                                    </Badge>
                                  ) : null}
                                </div>
                              </button>
                            );
                          })
                        ) : (
                          <div className="rounded-2xl border border-dashed border-[var(--pv-border)] bg-[var(--pv-surface)] p-8 text-center text-[var(--pv-text-muted)]">
                            Este plantao nao possui pacientes para importar.
                          </div>
                        )}
                      </div>

                      <div className="rounded-2xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)]/45 p-5">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--pv-text-muted)]">
                          O que copiar
                        </p>
                        <div className="space-y-3 text-sm text-[var(--pv-text-main)]">
                          {[
                            ['copyIdentification', 'Identificacao do paciente'],
                            ['copySummary', 'Resumo clinico e diagnostico'],
                            ['copyDefiningPhrase', 'Frase definidora'],
                            ['copyProblems', 'Problemas ativos'],
                            ['copyMedications', 'Medicacoes em uso'],
                            ['copyAlerts', 'Alertas'],
                            ['copyOpenTasks', 'Pendencias nao concluidas'],
                          ].map(([key, label]) => (
                            <label key={key} className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                className="mt-1 h-4 w-4 rounded border-[var(--pv-border)]"
                                checked={copyOptions[key as keyof ShiftImportCopyOptions]}
                                onChange={() => toggleOption(key as keyof ShiftImportCopyOptions)}
                              />
                              <span>{label}</span>
                            </label>
                          ))}
                        </div>

                        <div className="mt-5 rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface)] p-4 text-sm text-[var(--pv-text-muted)]">
                          Tarefas concluidas e boletins antigos nao sao copiados. O paciente importado recebe metadados de origem do plantao anterior.
                        </div>

                        <div className="mt-5 space-y-3">
                          <Button
                            className="w-full"
                            onClick={handleImport}
                            disabled={!activeShift || !sourceShiftId || selectedPatientIds.length === 0}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Importar selecionados
                          </Button>
                          <p className="text-xs text-[var(--pv-text-muted)]">
                            {selectedPatientIds.length} paciente(s) selecionado(s) para {activeShift?.label || 'o plantao ativo'}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-[var(--pv-border)] bg-[var(--pv-surface)] text-center">
                    <div className="max-w-md p-6">
                      <CheckSquare2 className="mx-auto mb-3 h-8 w-8 text-[var(--pv-text-muted)]/50" />
                      <p className="font-medium text-[var(--pv-text-main)]">Escolha um plantao de origem</p>
                      <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                        A lista de pacientes e as opcoes de copia aparecem aqui depois que um plantao e selecionado.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
