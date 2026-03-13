import { useMemo } from 'react';

import { usePlantaoVetStore } from './usePlantaoVetStore';
import { compareShifts } from '../lib/shifts';
import {
  Bulletin,
  DashboardSummary,
  PlantaoVetPersistedState,
  PlantaoVetState,
  Shift,
  ShiftPatient,
  Task,
} from '../types';

export const selectPlantaoHydrated = (state: PlantaoVetState) => state.isHydrated;
export const selectScopeClinicId = (state: PlantaoVetState) => state.scopeClinicId;
export const selectActiveShiftId = (state: PlantaoVetState) => state.activeShiftId;
export const selectShiftOrder = (state: PlantaoVetState) => state.shiftOrder;
export const selectShiftsById = (state: PlantaoVetState) => state.shiftsById;
export const selectPatientMasterOrder = (state: PlantaoVetState) => state.patientMasterOrder;
export const selectPatientMastersById = (state: PlantaoVetState) => state.patientMastersById;
export const selectShiftPatientOrder = (state: PlantaoVetState) => state.shiftPatientOrder;
export const selectShiftPatientsById = (state: PlantaoVetState) => state.shiftPatientsById;
export const selectTaskOrder = (state: PlantaoVetState) => state.taskOrder;
export const selectTasksById = (state: PlantaoVetState) => state.tasksById;
export const selectBulletinOrder = (state: PlantaoVetState) => state.bulletinOrder;
export const selectBulletinsById = (state: PlantaoVetState) => state.bulletinsById;

type PlantaoVetSnapshot = Pick<
  PlantaoVetPersistedState,
  | 'scopeClinicId'
  | 'activeShiftId'
  | 'shiftsById'
  | 'shiftOrder'
  | 'patientMastersById'
  | 'patientMasterOrder'
  | 'shiftPatientsById'
  | 'shiftPatientOrder'
  | 'tasksById'
  | 'taskOrder'
  | 'bulletinsById'
  | 'bulletinOrder'
>;

const EMPTY_DASHBOARD_SUMMARY: DashboardSummary = {
  totalShifts: 0,
  activePatients: 0,
  activeTasks: 0,
  criticalPatients: 0,
  bulletins: 0,
};

function orderedValues<T>(order: string[], entities: Record<string, T>) {
  return order
    .map((id) => entities[id])
    .filter((entity): entity is T => Boolean(entity));
}

export function usePlantaoVetSnapshot(): PlantaoVetSnapshot & { isHydrated: boolean } {
  const scopeClinicId = usePlantaoVetStore(selectScopeClinicId);
  const activeShiftId = usePlantaoVetStore(selectActiveShiftId);
  const shiftsById = usePlantaoVetStore(selectShiftsById);
  const shiftOrder = usePlantaoVetStore(selectShiftOrder);
  const patientMastersById = usePlantaoVetStore(selectPatientMastersById);
  const patientMasterOrder = usePlantaoVetStore(selectPatientMasterOrder);
  const shiftPatientsById = usePlantaoVetStore(selectShiftPatientsById);
  const shiftPatientOrder = usePlantaoVetStore(selectShiftPatientOrder);
  const tasksById = usePlantaoVetStore(selectTasksById);
  const taskOrder = usePlantaoVetStore(selectTaskOrder);
  const bulletinsById = usePlantaoVetStore(selectBulletinsById);
  const bulletinOrder = usePlantaoVetStore(selectBulletinOrder);
  const isHydrated = usePlantaoVetStore(selectPlantaoHydrated);

  return useMemo(
    () => ({
      scopeClinicId,
      activeShiftId,
      shiftsById,
      shiftOrder,
      patientMastersById,
      patientMasterOrder,
      shiftPatientsById,
      shiftPatientOrder,
      tasksById,
      taskOrder,
      bulletinsById,
      bulletinOrder,
      isHydrated,
    }),
    [
      scopeClinicId,
      activeShiftId,
      shiftsById,
      shiftOrder,
      patientMastersById,
      patientMasterOrder,
      shiftPatientsById,
      shiftPatientOrder,
      tasksById,
      taskOrder,
      bulletinsById,
      bulletinOrder,
      isHydrated,
    ]
  );
}

export function getOrderedShifts(snapshot: PlantaoVetSnapshot) {
  return [...orderedValues(snapshot.shiftOrder, snapshot.shiftsById)].sort(compareShifts);
}

export function getActiveShift(snapshot: PlantaoVetSnapshot): Shift | null {
  if (!snapshot.activeShiftId) {
    return null;
  }

  return snapshot.shiftsById[snapshot.activeShiftId] || null;
}

export function getShiftsByDate(snapshot: PlantaoVetSnapshot, dateISO: string) {
  return getOrderedShifts(snapshot).filter((shift) => shift.dateISO === dateISO);
}

export function getShiftById(snapshot: PlantaoVetSnapshot, shiftId: string | null) {
  if (!shiftId) {
    return null;
  }

  return snapshot.shiftsById[shiftId] || null;
}

export function getOrderedShiftPatients(snapshot: PlantaoVetSnapshot) {
  return orderedValues(snapshot.shiftPatientOrder, snapshot.shiftPatientsById);
}

export function getShiftPatients(snapshot: PlantaoVetSnapshot, shiftId: string | null): ShiftPatient[] {
  if (!shiftId) {
    return [];
  }

  return getOrderedShiftPatients(snapshot).filter((patient) => patient.shiftId === shiftId);
}

export function getActiveShiftPatients(snapshot: PlantaoVetSnapshot) {
  return getShiftPatients(snapshot, snapshot.activeShiftId);
}

export function getOrderedTasks(snapshot: PlantaoVetSnapshot) {
  return orderedValues(snapshot.taskOrder, snapshot.tasksById);
}

export function getShiftTasks(snapshot: PlantaoVetSnapshot, shiftId: string | null): Task[] {
  if (!shiftId) {
    return [];
  }

  return getOrderedTasks(snapshot).filter((task) => task.shiftId === shiftId);
}

export function getActiveShiftTasks(snapshot: PlantaoVetSnapshot) {
  return getShiftTasks(snapshot, snapshot.activeShiftId);
}

export function getShiftPatientTasks(snapshot: PlantaoVetSnapshot, shiftPatientId: string | null) {
  if (!shiftPatientId) {
    return [];
  }

  return getOrderedTasks(snapshot).filter((task) => task.shiftPatientId === shiftPatientId);
}

export function getShiftPatientBulletins(snapshot: PlantaoVetSnapshot, shiftPatientId: string | null) {
  if (!shiftPatientId) {
    return [];
  }

  return orderedValues(snapshot.bulletinOrder, snapshot.bulletinsById).filter(
    (bulletin) => bulletin.shiftPatientId === shiftPatientId
  );
}

export function getOrderedBulletins(snapshot: PlantaoVetSnapshot): Bulletin[] {
  return orderedValues(snapshot.bulletinOrder, snapshot.bulletinsById);
}

export function getShiftBulletins(snapshot: PlantaoVetSnapshot, shiftId: string | null) {
  if (!shiftId) {
    return [];
  }

  return getOrderedBulletins(snapshot).filter((bulletin) => bulletin.shiftId === shiftId);
}

export function getActiveShiftBulletins(snapshot: PlantaoVetSnapshot) {
  return getShiftBulletins(snapshot, snapshot.activeShiftId);
}

export function getPreviousShifts(snapshot: PlantaoVetSnapshot, currentShiftId: string | null) {
  return getOrderedShifts(snapshot)
    .filter((shift) => shift.id !== currentShiftId)
    .slice()
    .reverse();
}

export function getDashboardSummary(snapshot: PlantaoVetSnapshot): DashboardSummary {
  const patients = getActiveShiftPatients(snapshot);
  const tasks = getActiveShiftTasks(snapshot);

  if (!snapshot.activeShiftId && snapshot.shiftOrder.length === 0) {
    return EMPTY_DASHBOARD_SUMMARY;
  }

  return {
    totalShifts: snapshot.shiftOrder.length,
    activePatients: patients.length,
    activeTasks: tasks.filter((task) => !task.completed).length,
    criticalPatients: patients.filter((patient) => patient.status === 'critical').length,
    bulletins: getActiveShiftBulletins(snapshot).length,
  };
}
