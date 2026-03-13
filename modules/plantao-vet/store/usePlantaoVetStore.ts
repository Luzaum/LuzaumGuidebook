import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { normalizePatientName } from '../lib/patientMatching';
import { buildShiftLabel } from '../lib/shifts';
import {
  createPlantaoVetStorage,
  PLANTAO_VET_STORAGE_NAME,
  PLANTAO_VET_STORAGE_VERSION,
} from '../lib/storage';
import { normalizeShiftImportCopyOptions } from '../lib/shiftImport';
import {
  Bulletin,
  ImportPatientsFromShiftResult,
  MedicationEntry,
  NutritionSupport,
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

function createEmptyNutritionSupport(): NutritionSupport {
  return {
    appetiteSpontaneous: 'unknown',
    foodAcceptance: '',
    dietType: '',
    feedingRoute: '',
    tubeInUse: false,
    tubeType: 'none',
    offeredAmount: '',
    ingestedPercentage: '',
    currentWeight: '',
    bodyConditionScore: '',
    muscleMassScore: '',
    nutritionNotes: '',
    fluidTherapy: '',
    devices: '',
    supportNotes: '',
    eliminations: '',
    updatedAt: null,
  };
}

function createLegacyMedicationEntry(name: string): MedicationEntry {
  const timestamp = nowISO();

  return {
    id: createId('medication'),
    name,
    dose: '',
    frequency: '',
    route: '',
    observations: '',
    status: 'active',
    startedAt: timestamp,
    suspendedAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
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

function mergeProblemLists(sourceProblems: ShiftPatient['problems'], targetProblems: ShiftPatient['problems']) {
  const mergedByTitle = new Map<string, ShiftPatient['problems'][number]>();

  [...targetProblems, ...sourceProblems].forEach((problem) => {
    mergedByTitle.set(normalizePatientName(problem.title), problem);
  });

  return Array.from(mergedByTitle.values());
}

function migratePersistedState(
  persistedState: unknown,
  currentVersion: number
): PlantaoVetPersistedState {
  if (!persistedState || typeof persistedState !== 'object') {
    return createEmptyPersistedState(null);
  }

  const legacy = persistedState as Partial<PlantaoVetPersistedState>;
  const normalized = createEmptyPersistedState(legacy.scopeClinicId || null);
  const normalizedShiftPatientsById = Object.fromEntries(
    Object.entries(legacy.shiftPatientsById || {}).map(([id, patient]) => {
      const nextPatient = {
        importedFromShiftId: null,
        importedFromDate: null,
        importedFromShiftType: null,
        medicationsInUse: [],
        medicationEntries: [],
        importantNotes: '',
        nextShiftPlan: '',
        vitalsRecords: [],
        examRecords: [],
        nutritionSupport: createEmptyNutritionSupport(),
        ...patient,
      };

      const medicationsInUse = nextPatient.medicationsInUse || [];
      const medicationEntries =
        nextPatient.medicationEntries && nextPatient.medicationEntries.length > 0
          ? nextPatient.medicationEntries
          : medicationsInUse.map((name) => createLegacyMedicationEntry(name));

      return [
        id,
        {
          ...nextPatient,
          alertBadges: nextPatient.alertBadges || [],
          importantNotes: nextPatient.importantNotes || '',
          medicationsInUse,
          medicationEntries,
          nextShiftPlan: nextPatient.nextShiftPlan || '',
          vitalsRecords: nextPatient.vitalsRecords || [],
          examRecords: nextPatient.examRecords || [],
          nutritionSupport: {
            ...createEmptyNutritionSupport(),
            ...(nextPatient.nutritionSupport || {}),
          },
          problems: nextPatient.problems || [],
        },
      ];
    })
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
    tasksById: legacy.tasksById || {},
    taskOrder: legacy.taskOrder || [],
    bulletinsById: legacy.bulletinsById || {},
    bulletinOrder: legacy.bulletinOrder || [],
    scopeClinicId:
      currentVersion === PLANTAO_VET_STORAGE_VERSION ? legacy.scopeClinicId || null : legacy.scopeClinicId || null,
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

      toggleTaskCompleted: (taskId) =>
        set((state) => {
          const current = state.tasksById[taskId];

          if (!current) {
            return state;
          }

          const timestamp = nowISO();
          const completed = !current.completed;

          return {
            tasksById: {
              ...state.tasksById,
              [taskId]: {
                ...current,
                completed,
                completedAt: completed ? timestamp : null,
                updatedAt: timestamp,
              },
            },
          };
        }),

      createShift: ({ dateISO, shiftType, label, startedAt = null, endsAt = null }) => {
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
          createdAt: nowISO(),
          updatedAt: nowISO(),
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
          const nextMedicationEntries =
            shiftPatient.medicationEntries && shiftPatient.medicationEntries.length > 0
              ? shiftPatient.medicationEntries
              : (shiftPatient.medicationsInUse || []).map((name) => createLegacyMedicationEntry(name));
          const nextShiftPatient: ShiftPatient = {
            mainDiagnosis: '',
            summary: '',
            definingPhrase: '',
            importantNotes: '',
            nextShiftPlan: '',
            alertBadges: [],
            medicationsInUse: [],
            medicationEntries: [],
            vitalsRecords: [],
            examRecords: [],
            nutritionSupport: createEmptyNutritionSupport(),
            problems: [],
            importedFromShiftId: null,
            importedFromDate: null,
            importedFromShiftType: null,
            sourceRecordText: null,
            lastBulletinAt: null,
            displayName: '',
            species: 'outra',
            breed: '',
            ageLabel: '',
            weightLabel: '',
            tutorName: '',
            status: 'watch',
            patientMasterId: '',
            shiftId: '',
            ...withTimestamps(
              {
                ...shiftPatient,
                id,
                medicationEntries: nextMedicationEntries,
                nutritionSupport: {
                  ...createEmptyNutritionSupport(),
                  ...(shiftPatient.nutritionSupport || {}),
                },
              },
              current
            ),
          };

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

            const targetPatientId = existingTargetPatient?.id || createId('shift-patient');
            const currentTargetPatient = existingTargetPatient || null;
            const useImportedValues = !currentTargetPatient;
            const nextShiftPatientDraft: ShiftPatient = {
              id: targetPatientId,
              createdAt: currentTargetPatient?.createdAt || nowISO(),
              updatedAt: currentTargetPatient?.updatedAt || nowISO(),
              mainDiagnosis: '',
              summary: '',
              definingPhrase: '',
              importantNotes: '',
              nextShiftPlan: '',
              alertBadges: [],
              medicationsInUse: [],
              problems: [],
              importedFromShiftId: null,
              importedFromDate: null,
              importedFromShiftType: null,
              sourceRecordText: null,
              lastBulletinAt: null,
              displayName: '',
              species: 'outra',
              breed: '',
              ageLabel: '',
              weightLabel: '',
              tutorName: '',
              status: 'watch',
              patientMasterId: sourcePatient.patientMasterId,
              shiftId: resolvedTargetShiftId,
              ...(currentTargetPatient || {}),
            };

            nextShiftPatientDraft.displayName =
              normalizedOptions.copyIdentification && (useImportedValues || !currentTargetPatient?.displayName)
                ? sourcePatient.displayName
                : currentTargetPatient?.displayName || sourcePatient.displayName;
            nextShiftPatientDraft.species =
              normalizedOptions.copyIdentification && (useImportedValues || currentTargetPatient?.species === 'outra')
                ? sourcePatient.species
                : currentTargetPatient?.species || sourcePatient.species;
            nextShiftPatientDraft.breed =
              normalizedOptions.copyIdentification && (useImportedValues || !currentTargetPatient?.breed)
                ? sourcePatient.breed
                : currentTargetPatient?.breed || sourcePatient.breed;
            nextShiftPatientDraft.ageLabel =
              normalizedOptions.copyIdentification && (useImportedValues || !currentTargetPatient?.ageLabel)
                ? sourcePatient.ageLabel
                : currentTargetPatient?.ageLabel || sourcePatient.ageLabel;
            nextShiftPatientDraft.weightLabel =
              normalizedOptions.copyIdentification && (useImportedValues || !currentTargetPatient?.weightLabel)
                ? sourcePatient.weightLabel
                : currentTargetPatient?.weightLabel || sourcePatient.weightLabel;
            nextShiftPatientDraft.tutorName =
              normalizedOptions.copyIdentification && (useImportedValues || !currentTargetPatient?.tutorName)
                ? sourcePatient.tutorName
                : currentTargetPatient?.tutorName || sourcePatient.tutorName;
            nextShiftPatientDraft.mainDiagnosis =
              normalizedOptions.copySummary && (useImportedValues || !currentTargetPatient?.mainDiagnosis)
                ? sourcePatient.mainDiagnosis
                : currentTargetPatient?.mainDiagnosis || sourcePatient.mainDiagnosis;
            nextShiftPatientDraft.summary =
              normalizedOptions.copySummary && (useImportedValues || !currentTargetPatient?.summary)
                ? sourcePatient.summary
                : currentTargetPatient?.summary || sourcePatient.summary;
            nextShiftPatientDraft.definingPhrase =
              normalizedOptions.copyDefiningPhrase && (useImportedValues || !currentTargetPatient?.definingPhrase)
                ? sourcePatient.definingPhrase
                : currentTargetPatient?.definingPhrase || sourcePatient.definingPhrase;
            nextShiftPatientDraft.importantNotes = currentTargetPatient?.importantNotes || '';
            nextShiftPatientDraft.nextShiftPlan = currentTargetPatient?.nextShiftPlan || '';
            nextShiftPatientDraft.alertBadges = normalizedOptions.copyAlerts
              ? uniqueStrings([...(currentTargetPatient?.alertBadges || []), ...sourcePatient.alertBadges])
              : currentTargetPatient?.alertBadges || [];
            nextShiftPatientDraft.medicationsInUse = normalizedOptions.copyMedications
              ? uniqueStrings([...(currentTargetPatient?.medicationsInUse || []), ...sourcePatient.medicationsInUse])
              : currentTargetPatient?.medicationsInUse || [];
            nextShiftPatientDraft.medicationEntries = normalizedOptions.copyMedications
              ? [
                  ...(currentTargetPatient?.medicationEntries || []),
                  ...(sourcePatient.medicationEntries || []).filter(
                    (sourceMedication) =>
                      !(currentTargetPatient?.medicationEntries || []).some(
                        (targetMedication) =>
                          normalizePatientName(targetMedication.name) === normalizePatientName(sourceMedication.name) &&
                          targetMedication.status === sourceMedication.status
                      )
                  ),
                ]
              : currentTargetPatient?.medicationEntries || [];
            nextShiftPatientDraft.problems = normalizedOptions.copyProblems
              ? mergeProblemLists(
                  sourcePatient.problems.filter((problem) => problem.status === 'active'),
                  currentTargetPatient?.problems || []
                )
              : currentTargetPatient?.problems || [];
            nextShiftPatientDraft.vitalsRecords = currentTargetPatient?.vitalsRecords || [];
            nextShiftPatientDraft.examRecords = currentTargetPatient?.examRecords || [];
            nextShiftPatientDraft.nutritionSupport = {
              ...createEmptyNutritionSupport(),
              ...(currentTargetPatient?.nutritionSupport || {}),
            };
            nextShiftPatientDraft.importedFromShiftId = sourceShift.id;
            nextShiftPatientDraft.importedFromDate = sourceShift.dateISO;
            nextShiftPatientDraft.importedFromShiftType = sourceShift.shiftType;
            nextShiftPatientDraft.sourceRecordText =
              currentTargetPatient?.sourceRecordText || sourcePatient.sourceRecordText;
            nextShiftPatientDraft.lastBulletinAt =
              currentTargetPatient?.lastBulletinAt || sourcePatient.lastBulletinAt;
            nextShiftPatientDraft.status = currentTargetPatient?.status || sourcePatient.status;

            const nextShiftPatient = withTimestamps(nextShiftPatientDraft, currentTargetPatient) as ShiftPatient;

            nextShiftPatientsById[targetPatientId] = nextShiftPatient;
            nextShiftPatientOrder = insertUniqueId(nextShiftPatientOrder, targetPatientId);

            if (currentTargetPatient) {
              result.updatedShiftPatientIds.push(targetPatientId);
            } else {
              result.importedShiftPatientIds.push(targetPatientId);
            }

            if (normalizedOptions.copyOpenTasks) {
              const sourceTasks = currentState.taskOrder
                .map((id) => currentState.tasksById[id])
                .filter(
                  (task): task is Task =>
                    Boolean(task) &&
                    task.shiftId === sourceShiftId &&
                    task.shiftPatientId === sourcePatient.id &&
                    !task.completed
                );

              sourceTasks.forEach((sourceTask) => {
                const duplicateTask = Object.values(nextTasksById).find(
                  (task) =>
                    task.shiftId === resolvedTargetShiftId &&
                    task.shiftPatientId === targetPatientId &&
                    task.title === sourceTask.title &&
                    task.scheduledTime === sourceTask.scheduledTime &&
                    task.category === sourceTask.category
                );

                if (duplicateTask) {
                  return;
                }

                const taskId = createId('task');
                nextTasksById[taskId] = {
                  ...withTimestamps(
                    {
                      ...sourceTask,
                      id: taskId,
                    },
                    undefined
                  ),
                  shiftId: resolvedTargetShiftId,
                  shiftPatientId: targetPatientId,
                  completed: false,
                  completedAt: null,
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
      storage: createPlantaoVetStorage<PlantaoVetPersistedState>(),
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
      migrate: (persistedState, version) => migratePersistedState(persistedState, version),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('[PlantaoVET] hydration failed', error);
        }
        state?.setHydrated(true);
      },
    }
  )
);
