import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { normalizePatientName } from '../lib/patientMatching';
import { buildShiftLabel } from '../lib/shifts';
import {
  createDailySummaryEntry,
  createEmptyNutritionSupport,
  createEmptyShiftPatientFields,
  createMedicationEntryFromName,
  createWeightRecord,
} from '../lib/shiftPatientDefaults';
import {
  createPlantaoVetStorage,
  PLANTAO_VET_STORAGE_NAME,
  PLANTAO_VET_STORAGE_VERSION,
} from '../lib/storage';
import { normalizeShiftImportCopyOptions } from '../lib/shiftImport';
import {
  Bulletin,
  DailySummaryEntry,
  ImportPatientsFromShiftResult,
  MedicationEntry,
  PatientMaster,
  PlantaoVetPersistedState,
  PlantaoVetState,
  Shift,
  ShiftPatient,
  Task,
  TimestampedEntity,
} from '../types';

function nowISO() {
  return new Date().toISOString();
}

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createEmptyPersistedState(scopeClinicId: string | null): PlantaoVetPersistedState {
  return {
    scopeClinicId,
    activeShiftId: null,
    shiftsById: {},
    shiftOrder: [],
    patientMastersById: {},
    patientMasterOrder: [],
    shiftPatientsById: {},
    shiftPatientOrder: [],
    tasksById: {},
    taskOrder: [],
    bulletinsById: {},
    bulletinOrder: [],
  };
}

function withTimestamps<T extends object>(
  entity: T & Partial<TimestampedEntity>,
  current?: TimestampedEntity | null
) {
  const currentTimestamp = nowISO();

  return {
    ...entity,
    createdAt: current?.createdAt || entity.createdAt || currentTimestamp,
    updatedAt: currentTimestamp,
  };
}

function insertUniqueId(order: string[], id: string) {
  return order.includes(id) ? order : [...order, id];
}

function uniqueStrings(values: string[]) {
  const registry = new Set<string>();

  return values.filter((value) => {
    const normalized = value.trim().toLowerCase();

    if (!normalized || registry.has(normalized)) {
      return false;
    }

    registry.add(normalized);
    return true;
  });
}

function normalizeMedicationEntry(entry: Partial<MedicationEntry>, fallbackName = ''): MedicationEntry {
  const timestamp = nowISO();
  return {
    id: entry.id || createId('medication'),
    name: entry.name || fallbackName,
    concentration: entry.concentration || '',
    dose: entry.dose || '',
    frequency: entry.frequency || '',
    route: entry.route || '',
    observations: entry.observations || '',
    status: entry.status || 'active',
    startedAt: entry.startedAt || null,
    suspendedAt: entry.suspendedAt || null,
    inPrescription: entry.inPrescription ?? true,
    newBadgeDate: entry.newBadgeDate || null,
    createdAt: entry.createdAt || timestamp,
    updatedAt: entry.updatedAt || timestamp,
  };
}

function normalizeShiftPatient(patient: Partial<ShiftPatient>, current?: ShiftPatient | null): ShiftPatient {
  const baseFields = createEmptyShiftPatientFields();
  const baseWeight = patient.baseWeightLabel || patient.weightLabel || current?.baseWeightLabel || current?.weightLabel || '';
  const weightHistory = patient.weightHistory || current?.weightHistory || [];
  const normalizedMedicationEntries =
    patient.medicationEntries && patient.medicationEntries.length > 0
      ? patient.medicationEntries.map((entry) => normalizeMedicationEntry(entry))
      : (patient.medicationsInUse || current?.medicationsInUse || []).map((name) => createMedicationEntryFromName(name));

  return {
    id: patient.id || current?.id || createId('shift-patient'),
    shiftId: patient.shiftId || current?.shiftId || '',
    patientMasterId: patient.patientMasterId || current?.patientMasterId || '',
    displayName: patient.displayName || current?.displayName || '',
    species: patient.species || current?.species || 'outra',
    breed: patient.breed || current?.breed || '',
    ageLabel: patient.ageLabel || current?.ageLabel || '',
    tutorName: patient.tutorName || current?.tutorName || '',
    status: patient.status || current?.status || 'watch',
    ...baseFields,
    ...current,
    ...patient,
    weightLabel: patient.weightLabel || current?.weightLabel || baseWeight,
    baseWeightLabel: baseWeight,
    weightHistory:
      weightHistory.length > 0
        ? weightHistory
        : baseWeight
          ? [createWeightRecord(baseWeight, 'ficha', current?.createdAt || nowISO(), true)]
          : [],
    tags: uniqueStrings(patient.tags || current?.tags || []),
    alertBadges: uniqueStrings(patient.alertBadges || current?.alertBadges || []),
    medicationsInUse: uniqueStrings(
      (patient.medicationsInUse || current?.medicationsInUse || []).concat(
        normalizedMedicationEntries.filter((entry) => entry.status === 'active').map((entry) => entry.name)
      )
    ),
    medicationEntries: normalizedMedicationEntries,
    vitalsRecords: patient.vitalsRecords || current?.vitalsRecords || [],
    examRecords: patient.examRecords || current?.examRecords || [],
    nutritionSupport: {
      ...createEmptyNutritionSupport(),
      ...(current?.nutritionSupport || {}),
      ...(patient.nutritionSupport || {}),
    },
    problems: patient.problems || current?.problems || [],
    dailySummaryEntries: (patient.dailySummaryEntries || current?.dailySummaryEntries || []).map((entry) =>
      createDailySummaryEntry({
        ...entry,
        shiftId: entry.shiftId || patient.shiftId || current?.shiftId || '',
        shiftPatientId: entry.shiftPatientId || patient.id || current?.id || '',
        type: entry.type || 'manual',
        title: entry.title || 'Registro',
        content: entry.content || '',
        occurredAt: entry.occurredAt || entry.updatedAt || nowISO(),
      })
    ),
    importWarnings: patient.importWarnings || current?.importWarnings || [],
    importedFromShiftId: patient.importedFromShiftId ?? current?.importedFromShiftId ?? null,
    importedFromDate: patient.importedFromDate ?? current?.importedFromDate ?? null,
    importedFromShiftType: patient.importedFromShiftType ?? current?.importedFromShiftType ?? null,
    sourceRecordText: patient.sourceRecordText ?? current?.sourceRecordText ?? null,
    lastBulletinAt: patient.lastBulletinAt ?? current?.lastBulletinAt ?? null,
    ...withTimestamps({ ...current, ...patient, id: patient.id || current?.id || createId('shift-patient') }, current),
  };
}

function migratePersistedState(
  persistedState: unknown
): PlantaoVetPersistedState {
  if (!persistedState || typeof persistedState !== 'object') {
    return createEmptyPersistedState(null);
  }

  const legacy = persistedState as Partial<PlantaoVetPersistedState>;
  const normalized = createEmptyPersistedState(legacy.scopeClinicId || null);
  const normalizedShiftPatientsById = Object.fromEntries(
    Object.entries(legacy.shiftPatientsById || {}).map(([id, patient]) => [id, normalizeShiftPatient({ id, ...(patient as Partial<ShiftPatient>) })])
  );
  const normalizedTasksById = Object.fromEntries(
    Object.entries(legacy.tasksById || {}).map(([id, task]) => {
      const currentTask = task as Partial<Task>;
      return [
        id,
        {
          shiftId: '',
          shiftPatientId: null,
          title: '',
          description: '',
          scheduledTime: null,
          category: 'other',
          priority: 'medium',
          completed: false,
          completedAt: null,
          reviewRequired: false,
          origin: 'manual',
          deletedAt: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...currentTask,
          id,
        } satisfies Task,
      ];
    })
  );
  const normalizedBulletinsById = Object.fromEntries(
    Object.entries(legacy.bulletinsById || {}).map(([id, bulletin]) => [
      id,
      {
        shiftId: '',
        shiftPatientId: null,
        type: 'clinical',
        title: '',
        content: '',
        authorLabel: '',
        generated: false,
        manualEdited: false,
        deletedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...(bulletin as Partial<Bulletin>),
        id,
      } satisfies Bulletin,
    ])
  );

  return {
    ...normalized,
    ...legacy,
    shiftsById: legacy.shiftsById || {},
    shiftOrder: legacy.shiftOrder || [],
    patientMastersById: legacy.patientMastersById || {},
    patientMasterOrder: legacy.patientMasterOrder || [],
    shiftPatientsById: normalizedShiftPatientsById,
    shiftPatientOrder: legacy.shiftPatientOrder || [],
    tasksById: normalizedTasksById,
    taskOrder: legacy.taskOrder || [],
    bulletinsById: normalizedBulletinsById,
    bulletinOrder: legacy.bulletinOrder || [],
    scopeClinicId: legacy.scopeClinicId || null,
  };
}

export const usePlantaoVetStore = create<PlantaoVetState>()(
  persist(
    (set, get) => ({
      ...createEmptyPersistedState(null),
      isHydrated: false,

      ensureClinicScope: (clinicId) =>
        set((state) => {
          if (state.scopeClinicId === clinicId) {
            return state;
          }

          return {
            ...createEmptyPersistedState(clinicId),
            isHydrated: state.isHydrated,
          };
        }),

      setHydrated: (isHydrated) => set({ isHydrated }),

      setActiveShift: (shiftId) =>
        set((state) => {
          if (shiftId && !state.shiftsById[shiftId]) {
            return state;
          }

          return { activeShiftId: shiftId };
        }),

      appendDailySummaryEntry: (shiftPatientId, entry) =>
        set((state) => {
          const patient = state.shiftPatientsById[shiftPatientId];
          if (!patient) {
            return state;
          }

          const nextEntry = createDailySummaryEntry({
            ...entry,
            shiftId: patient.shiftId,
            shiftPatientId: patient.id,
          });

          return {
            shiftPatientsById: {
              ...state.shiftPatientsById,
              [patient.id]: {
                ...patient,
                dailySummaryEntries: [nextEntry, ...patient.dailySummaryEntries],
                updatedAt: nowISO(),
              },
            },
          };
        }),

      updateDailySummaryEntry: (shiftPatientId, entryId, patch) =>
        set((state) => {
          const patient = state.shiftPatientsById[shiftPatientId];
          if (!patient) {
            return state;
          }

          let changed = false;
          const nextEntries = patient.dailySummaryEntries.map((entry) => {
            if (entry.id !== entryId) {
              return entry;
            }

            changed = true;
            return createDailySummaryEntry({
              ...entry,
              ...patch,
              id: entry.id,
              shiftId: entry.shiftId,
              shiftPatientId: entry.shiftPatientId,
              type: (patch.type || entry.type) as DailySummaryEntry['type'],
              title: patch.title ?? entry.title,
              content: patch.content ?? entry.content,
              occurredAt: patch.occurredAt ?? entry.occurredAt,
              createdAt: entry.createdAt,
            });
          });

          if (!changed) {
            return state;
          }

          return {
            shiftPatientsById: {
              ...state.shiftPatientsById,
              [patient.id]: {
                ...patient,
                dailySummaryEntries: nextEntries,
                updatedAt: nowISO(),
              },
            },
          };
        }),

      deleteDailySummaryEntry: (shiftPatientId, entryId) =>
        set((state) => {
          const patient = state.shiftPatientsById[shiftPatientId];
          if (!patient) {
            return state;
          }

          return {
            shiftPatientsById: {
              ...state.shiftPatientsById,
              [patient.id]: {
                ...patient,
                dailySummaryEntries: patient.dailySummaryEntries.map((entry) =>
                  entry.id === entryId
                    ? {
                        ...entry,
                        deletedAt: nowISO(),
                        updatedAt: nowISO(),
                      }
                    : entry
                ),
                updatedAt: nowISO(),
              },
            },
          };
        }),

      toggleTaskCompleted: (taskId) =>
        set((state) => {
          const current = state.tasksById[taskId];

          if (!current || current.deletedAt) {
            return state;
          }

          const timestamp = nowISO();
          const completed = !current.completed;
          const nextTask = {
            ...current,
            completed,
            completedAt: completed ? timestamp : null,
            updatedAt: timestamp,
          };
          const patient = current.shiftPatientId ? state.shiftPatientsById[current.shiftPatientId] : null;
          const nextShiftPatientsById = { ...state.shiftPatientsById };

          if (patient) {
            const entry = createDailySummaryEntry({
              shiftId: current.shiftId,
              shiftPatientId: patient.id,
              type: completed ? 'task_completed' : 'task_reopened',
              title: completed ? 'Tarefa concluída' : 'Tarefa reaberta',
              content: current.title,
              details: current.description || '',
              occurredAt: timestamp,
              sourceId: current.id,
              sourceType: current.origin,
              relatedEntityType: 'task',
            });

            nextShiftPatientsById[patient.id] = {
              ...patient,
              dailySummaryEntries: [entry, ...patient.dailySummaryEntries],
              updatedAt: timestamp,
            };
          }

          return {
            tasksById: {
              ...state.tasksById,
              [taskId]: nextTask,
            },
            shiftPatientsById: nextShiftPatientsById,
          };
        }),

      deleteTask: (taskId) =>
        set((state) => {
          const current = state.tasksById[taskId];
          if (!current) {
            return state;
          }

          return {
            tasksById: {
              ...state.tasksById,
              [taskId]: {
                ...current,
                deletedAt: nowISO(),
                updatedAt: nowISO(),
              },
            },
          };
        }),

      deleteBulletin: (bulletinId) =>
        set((state) => {
          const current = state.bulletinsById[bulletinId];
          if (!current) {
            return state;
          }

          return {
            bulletinsById: {
              ...state.bulletinsById,
              [bulletinId]: {
                ...current,
                deletedAt: nowISO(),
                updatedAt: nowISO(),
              },
            },
          };
        }),

      createShift: ({ dateISO, shiftType, label, startedAt = null, endsAt = null }) => {
        const timestamp = nowISO();
        const newShift: Shift = {
          id: createId('shift'),
          clinicId: get().scopeClinicId,
          dateISO,
          shiftType,
          status: 'open',
          label: label?.trim() || buildShiftLabel(dateISO, shiftType),
          startedAt,
          endsAt,
          archivedAt: null,
          createdAt: timestamp,
          updatedAt: timestamp,
        };

        set((state) => ({
          shiftsById: {
            ...state.shiftsById,
            [newShift.id]: newShift,
          },
          shiftOrder: insertUniqueId(state.shiftOrder, newShift.id),
          activeShiftId: newShift.id,
        }));

        return newShift;
      },

      upsertPatientMaster: (patientMaster) =>
        set((state) => {
          const id = patientMaster.id || createId('patient-master');
          const current = state.patientMastersById[id];
          const nextPatientMaster: PatientMaster = {
            clinicId: state.scopeClinicId,
            sex: 'unknown',
            ageLabel: '',
            weightLabel: '',
            breed: '',
            tutorName: '',
            name: '',
            species: 'outra',
            ...withTimestamps({ ...patientMaster, id }, current),
          };

          return {
            patientMastersById: {
              ...state.patientMastersById,
              [id]: nextPatientMaster,
            },
            patientMasterOrder: insertUniqueId(state.patientMasterOrder, id),
          };
        }),

      upsertShiftPatient: (shiftPatient) =>
        set((state) => {
          const id = shiftPatient.id || createId('shift-patient');
          const current = state.shiftPatientsById[id];
          const nextShiftPatient = normalizeShiftPatient({ ...shiftPatient, id }, current);

          return {
            shiftPatientsById: {
              ...state.shiftPatientsById,
              [id]: nextShiftPatient,
            },
            shiftPatientOrder: insertUniqueId(state.shiftPatientOrder, id),
          };
        }),

      upsertTask: (task) => {
        const id = task.id || createId('task');
        const current = get().tasksById[id];
        const nextTask: Task = {
          shiftId: '',
          shiftPatientId: null,
          title: '',
          description: '',
          scheduledTime: null,
          category: 'other',
          priority: 'medium',
          completed: false,
          completedAt: null,
          reviewRequired: false,
          origin: 'manual',
          deletedAt: null,
          ...withTimestamps({ ...task, id }, current),
        };

        set((state) => ({
          tasksById: {
            ...state.tasksById,
            [id]: nextTask,
          },
          taskOrder: insertUniqueId(state.taskOrder, id),
        }));

        return nextTask;
      },

      upsertBulletin: (bulletin) => {
        const id = bulletin.id || createId('bulletin');
        const current = get().bulletinsById[id];
        const nextBulletin: Bulletin = {
          shiftId: '',
          shiftPatientId: null,
          type: 'clinical',
          title: '',
          content: '',
          authorLabel: '',
          generated: false,
          manualEdited: false,
          deletedAt: null,
          ...withTimestamps({ ...bulletin, id }, current),
        };

        set((state) => ({
          bulletinsById: {
            ...state.bulletinsById,
            [id]: nextBulletin,
          },
          bulletinOrder: insertUniqueId(state.bulletinOrder, id),
        }));

        return nextBulletin;
      },

      importPatientsFromShift: ({ sourceShiftId, targetShiftId, shiftPatientIds, copyOptions }) => {
        const normalizedOptions = normalizeShiftImportCopyOptions(copyOptions);
        const resolvedTargetShiftId = targetShiftId || get().activeShiftId;
        const state = get();

        if (!resolvedTargetShiftId || !state.shiftsById[sourceShiftId] || !state.shiftsById[resolvedTargetShiftId]) {
          return { importedShiftPatientIds: [], updatedShiftPatientIds: [] };
        }

        const sourceShift = state.shiftsById[sourceShiftId];
        const sourcePatients = shiftPatientIds
          .map((id) => state.shiftPatientsById[id])
          .filter((patient): patient is ShiftPatient => Boolean(patient) && patient.shiftId === sourceShiftId);

        const result: ImportPatientsFromShiftResult = {
          importedShiftPatientIds: [],
          updatedShiftPatientIds: [],
        };

        set((currentState) => {
          const nextShiftPatientsById = { ...currentState.shiftPatientsById };
          let nextShiftPatientOrder = [...currentState.shiftPatientOrder];
          const nextTasksById = { ...currentState.tasksById };
          let nextTaskOrder = [...currentState.taskOrder];

          sourcePatients.forEach((sourcePatient) => {
            const existingTargetPatient = currentState.shiftPatientOrder
              .map((id) => currentState.shiftPatientsById[id])
              .find((patient) => {
                if (!patient || patient.shiftId !== resolvedTargetShiftId) {
                  return false;
                }

                return (
                  patient.patientMasterId === sourcePatient.patientMasterId ||
                  normalizePatientName(patient.displayName) === normalizePatientName(sourcePatient.displayName)
                );
              });

            const baseTarget = existingTargetPatient || normalizeShiftPatient({
              id: createId('shift-patient'),
              shiftId: resolvedTargetShiftId,
              patientMasterId: sourcePatient.patientMasterId,
              displayName: sourcePatient.displayName,
              species: sourcePatient.species,
              breed: sourcePatient.breed,
              ageLabel: sourcePatient.ageLabel,
              weightLabel: sourcePatient.weightLabel,
              baseWeightLabel: sourcePatient.baseWeightLabel || sourcePatient.weightLabel,
              tutorName: sourcePatient.tutorName,
              status: sourcePatient.status,
            });

            const mergedMedicationEntries = normalizedOptions.copyMedications
              ? [...baseTarget.medicationEntries, ...sourcePatient.medicationEntries]
              : baseTarget.medicationEntries;

            const nextTarget = normalizeShiftPatient(
              {
                ...baseTarget,
                shiftId: resolvedTargetShiftId,
                medicalRecordNumber: normalizedOptions.copyIdentification
                  ? sourcePatient.medicalRecordNumber || baseTarget.medicalRecordNumber
                  : baseTarget.medicalRecordNumber,
                admissionDateLabel: normalizedOptions.copyIdentification
                  ? sourcePatient.admissionDateLabel || baseTarget.admissionDateLabel
                  : baseTarget.admissionDateLabel,
                responsibleVet: normalizedOptions.copyIdentification
                  ? sourcePatient.responsibleVet || baseTarget.responsibleVet
                  : baseTarget.responsibleVet,
                belongings: normalizedOptions.copyIdentification
                  ? sourcePatient.belongings || baseTarget.belongings
                  : baseTarget.belongings,
                patientObservations: normalizedOptions.copyIdentification
                  ? sourcePatient.patientObservations || baseTarget.patientObservations
                  : baseTarget.patientObservations,
                summary: normalizedOptions.copySummary ? sourcePatient.summary || baseTarget.summary : baseTarget.summary,
                clinicalHistory: normalizedOptions.copySummary
                  ? sourcePatient.clinicalHistory || baseTarget.clinicalHistory
                  : baseTarget.clinicalHistory,
                currentComplaint: normalizedOptions.copySummary
                  ? sourcePatient.currentComplaint || baseTarget.currentComplaint
                  : baseTarget.currentComplaint,
                currentAdmissionReason: normalizedOptions.copySummary
                  ? sourcePatient.currentAdmissionReason || baseTarget.currentAdmissionReason
                  : baseTarget.currentAdmissionReason,
                definingPhrase: normalizedOptions.copyDefiningPhrase
                  ? sourcePatient.definingPhrase || baseTarget.definingPhrase
                  : baseTarget.definingPhrase,
                problems: normalizedOptions.copyProblems
                  ? [...baseTarget.problems, ...sourcePatient.problems].filter(
                      (problem, index, collection) =>
                        collection.findIndex(
                          (item) => normalizePatientName(item.title) === normalizePatientName(problem.title)
                        ) === index
                    )
                  : baseTarget.problems,
                alertBadges: normalizedOptions.copyAlerts
                  ? uniqueStrings([...baseTarget.alertBadges, ...sourcePatient.alertBadges])
                  : baseTarget.alertBadges,
                medicationsInUse: normalizedOptions.copyMedications
                  ? uniqueStrings([...baseTarget.medicationsInUse, ...sourcePatient.medicationsInUse])
                  : baseTarget.medicationsInUse,
                medicationEntries: normalizedOptions.copyMedications ? mergedMedicationEntries : baseTarget.medicationEntries,
                importedFromShiftId: sourceShift.id,
                importedFromDate: sourceShift.dateISO,
                importedFromShiftType: sourceShift.shiftType,
              },
              existingTargetPatient
            );

            nextShiftPatientsById[nextTarget.id] = nextTarget;
            nextShiftPatientOrder = insertUniqueId(nextShiftPatientOrder, nextTarget.id);

            if (existingTargetPatient) {
              result.updatedShiftPatientIds.push(nextTarget.id);
            } else {
              result.importedShiftPatientIds.push(nextTarget.id);
            }

            if (normalizedOptions.copyOpenTasks) {
              currentState.taskOrder
                .map((id) => currentState.tasksById[id])
                .filter(
                  (task): task is Task =>
                    Boolean(task) &&
                    task.shiftPatientId === sourcePatient.id &&
                    task.shiftId === sourceShiftId &&
                    !task.completed &&
                    !task.deletedAt
                )
                .forEach((task) => {
                  const taskId = createId('task');
                  nextTasksById[taskId] = {
                    ...task,
                    id: taskId,
                    shiftId: resolvedTargetShiftId,
                    shiftPatientId: nextTarget.id,
                    completed: false,
                    completedAt: null,
                    createdAt: nowISO(),
                    updatedAt: nowISO(),
                  };
                  nextTaskOrder = insertUniqueId(nextTaskOrder, taskId);
                });
            }
          });

          return {
            shiftPatientsById: nextShiftPatientsById,
            shiftPatientOrder: nextShiftPatientOrder,
            tasksById: nextTasksById,
            taskOrder: nextTaskOrder,
          };
        });

        return result;
      },

      resetClinicState: () =>
        set((state) => ({
          ...createEmptyPersistedState(state.scopeClinicId),
          isHydrated: state.isHydrated,
        })),
    }),
    {
      name: PLANTAO_VET_STORAGE_NAME,
      version: PLANTAO_VET_STORAGE_VERSION,
      storage: createPlantaoVetStorage<PlantaoVetState>(),
      partialize: (state) => ({
        scopeClinicId: state.scopeClinicId,
        activeShiftId: state.activeShiftId,
        shiftsById: state.shiftsById,
        shiftOrder: state.shiftOrder,
        patientMastersById: state.patientMastersById,
        patientMasterOrder: state.patientMasterOrder,
        shiftPatientsById: state.shiftPatientsById,
        shiftPatientOrder: state.shiftPatientOrder,
        tasksById: state.tasksById,
        taskOrder: state.taskOrder,
        bulletinsById: state.bulletinsById,
        bulletinOrder: state.bulletinOrder,
      }),
      migrate: (persistedState) => migratePersistedState(persistedState),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
