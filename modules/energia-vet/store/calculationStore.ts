import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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

  setPatient: (data: Partial<Patient>) => void;
  setEnergy: (data: Partial<EnergyCalculation>) => void;
  setTarget: (data: Partial<WeightTargetPlan>) => void;
  setDiet: (data: Partial<DietPlan>) => void;
  setHospital: (data: Partial<HospitalNutritionPlan>) => void;
  reset: () => void;
}

const DEFAULT_STATE = {
  patient: {
    species: 'dog' as const,
    sex: 'male' as const,
    ageMonths: 24,
    isNeutered: false,
    bcs: 5 as BCS,
    isHospitalized: false,
    comorbidityIds: [],
  },
  energy: {},
  target: { goal: 'maintenance' as const, isCustomClinicalRule: false, weightToUseForEnergy: 'current' as const },
  diet: { dietType: 'commercial' as const, mealsPerDay: 2, entries: [] },
  hospital: { isAnorexic: false, isHyporexic: false, feedingRoute: 'undefined' as const, progressionProtocol: '3_days' as const },
};

export const useCalculationStore = create<CalculationState>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,

      setPatient: (data) => set((state) => ({ patient: { ...state.patient, ...data } })),
      setEnergy: (data) => set((state) => ({ energy: { ...state.energy, ...data } })),
      setTarget: (data) => set((state) => ({ target: { ...state.target, ...data } })),
      setDiet: (data) => set((state) => ({ diet: { ...state.diet, ...data } })),
      setHospital: (data) => set((state) => ({ hospital: { ...state.hospital, ...data } })),
      reset: () => set(DEFAULT_STATE),
    }),
    {
      name: 'vetius-energia-vet-calc-v1',
      storage: createJSONStorage(() => localStorage),
      // Only persist data fields, not actions
      partialize: (state) => ({
        patient: state.patient,
        energy: state.energy,
        target: state.target,
        diet: state.diet,
        hospital: state.hospital,
      }),
    }
  )
);
