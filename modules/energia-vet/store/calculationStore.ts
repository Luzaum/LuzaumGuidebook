import { create } from 'zustand';
import { 
  Patient, 
  EnergyCalculation, 
  WeightTargetPlan, 
  DietPlan, 
  HospitalNutritionPlan 
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

export const useCalculationStore = create<CalculationState>((set) => ({
  patient: {
    species: 'dog',
    sex: 'male',
    isNeutered: false,
    bcs: 5,
    isHospitalized: false,
  },
  energy: {},
  target: {
    goal: 'maintenance',
    isCustomClinicalRule: false,
    weightToUseForEnergy: 'current',
  },
  diet: {
    dietType: 'commercial',
    mealsPerDay: 2,
  },
  hospital: {
    isAnorexic: false,
    isHyporexic: false,
    feedingRoute: 'undefined',
    progressionProtocol: '3_days',
  },

  setPatient: (data) => set((state) => ({ patient: { ...state.patient, ...data } })),
  setEnergy: (data) => set((state) => ({ energy: { ...state.energy, ...data } })),
  setTarget: (data) => set((state) => ({ target: { ...state.target, ...data } })),
  setDiet: (data) => set((state) => ({ diet: { ...state.diet, ...data } })),
  setHospital: (data) => set((state) => ({ hospital: { ...state.hospital, ...data } })),
  reset: () => set({
    patient: { species: 'dog', sex: 'male', isNeutered: false, bcs: 5, isHospitalized: false },
    energy: {},
    target: { goal: 'maintenance', isCustomClinicalRule: false, weightToUseForEnergy: 'current' },
    diet: { dietType: 'commercial', mealsPerDay: 2 },
    hospital: { isAnorexic: false, isHyporexic: false, feedingRoute: 'undefined', progressionProtocol: '3_days' },
  }),
}));

