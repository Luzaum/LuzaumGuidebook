import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  canonicalNutritionReducer,
  createEmptyCanonicalInput,
  mapStoreToCanonicalInput,
  type CanonicalNutritionInput,
  type NutritionAction,
} from '../lib/canonical';
import {
  Patient,
  EnergyCalculation,
  WeightTargetPlan,
  DietPlan,
  HospitalNutritionPlan,
  BCS,
} from '../types';

interface CalculationState {
  patient: Partial<Patient>;
  energy: Partial<EnergyCalculation>;
  target: Partial<WeightTargetPlan>;
  diet: Partial<DietPlan>;
  hospital: Partial<HospitalNutritionPlan>;
  canonical: CanonicalNutritionInput;

  setPatient: (data: Partial<Patient>) => void;
  setEnergy: (data: Partial<EnergyCalculation>) => void;
  setTarget: (data: Partial<WeightTargetPlan>) => void;
  setDiet: (data: Partial<DietPlan>) => void;
  setHospital: (data: Partial<HospitalNutritionPlan>) => void;
  dispatchCanonical: (action: NutritionAction) => void;
  syncCanonicalFromSlices: () => void;
  reset: () => void;
}

const DEFAULT_STATE = {
  patient: {
    species: 'dog' as const,
    sex: 'male' as const,
    ageMonths: 24,
    ageWeeks: 104,
    isNeutered: false,
    isIndoor: false,
    bcs: 5 as BCS,
    isHospitalized: false,
    comorbidityIds: [],
    registrationMode: 'registered' as const,
    muscleCondition: 'normal' as const,
    activityHoursPerDay: 1,
    activityImpact: 'low' as const,
    highImpactHoursPerDay: 0,
  },
  energy: {},
  target: { goal: 'maintenance' as const, isCustomClinicalRule: false, weightToUseForEnergy: 'current' as const },
  diet: { dietType: 'commercial' as const, mealsPerDay: 2, entries: [] },
  hospital: { isAnorexic: false, isHyporexic: false, feedingRoute: 'undefined' as const, progressionProtocol: '3_days' as const },
  canonical: createEmptyCanonicalInput(),
};

export const useCalculationStore = create<CalculationState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,

      setPatient: (data) =>
        set((state) => {
          const patient = { ...state.patient, ...data };
          return {
            patient,
            canonical: mapStoreToCanonicalInput({ patient, energy: state.energy, target: state.target }),
          };
        }),
      setEnergy: (data) =>
        set((state) => {
          const energy = { ...state.energy, ...data };
          return {
            energy,
            canonical: mapStoreToCanonicalInput({ patient: state.patient, energy, target: state.target }),
          };
        }),
      setTarget: (data) =>
        set((state) => {
          const target = { ...state.target, ...data };
          return {
            target,
            canonical: mapStoreToCanonicalInput({ patient: state.patient, energy: state.energy, target }),
          };
        }),
      setDiet: (data) => set((state) => ({ diet: { ...state.diet, ...data } })),
      setHospital: (data) => set((state) => ({ hospital: { ...state.hospital, ...data } })),
      dispatchCanonical: (action) =>
        set((state) => ({ canonical: canonicalNutritionReducer(state.canonical, action) })),
      syncCanonicalFromSlices: () =>
        set((state) => ({
          canonical: mapStoreToCanonicalInput({
            patient: state.patient,
            energy: state.energy,
            target: state.target,
          }),
        })),
      reset: () => set(DEFAULT_STATE),
    }),
    {
      name: 'vetius-nutricao-calc-2026',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persisted, version) => {
        const state = persisted as Partial<CalculationState>
        if (state.energy && state.energy.clinicalMerAdjustmentEnabled !== true) {
          state.energy = { ...state.energy, clinicalMerAdjustmentEnabled: false }
        }
        return state as CalculationState
      },
      // Only persist data fields, not actions
      partialize: (state) => ({
        patient: state.patient,
        energy: state.energy,
        target: state.target,
        diet: state.diet,
        hospital: state.hospital,
        canonical: state.canonical,
      }),
    }
  )
);
