import type { DrugProfile } from '../../types/drugProfile'

export const diltiazemProfile: DrugProfile = {
  drug_id: 'diltiazem',
  name_pt: 'Diltiazem',
  name_en: '',
  class: ['Agentes Cardiovasculares'],
  
  core_concepts: {
    taglines: [],
    mechanism: {
      receptors_targets: [],
      primary_effects: {}
    },
    pharmacodynamics: {
      onset_iv: '',
      peak: '',
      duration: ''
    },
    pharmacokinetics: {
      metabolism: '',
      excretion: '',
      dog_vs_cat: ''
    }
  },

  indications: {
    primary: [],
    secondary: [],
    when_to_use: ''
  },
  
  contraindications: {
    absolute: [],
    relative: []
  },

  doses: {
    unit_standard_cri: 'mcg/kg/min',
    dog: {
      cri: {
        mcgkgmin: { min: 0, max: 0, note: "" },
        mgkgh: { min: 0, max: 0, note: "" }
      },
      bolus: {
        mgkg: { min: 0, max: 0, note: "" }
      }
    },
    cat: {
      cri: {
        mcgkgmin: { min: 0, max: 0, note: "" },
        mgkgh: { min: 0, max: 0, note: "" }
      },
      bolus: {
        mgkg: { min: 0, max: 0, note: "" }
      }
    }
  },

  presentations: [
    { concentration: 5, unit: 'mg/ml' }
  ],

  dilution_and_preparation: {
    diluents_allowed: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5%'],
    recommended_targets: [],
    max_concentration: '5 mg/ml'
  },

  compatibility: {
    incompatible: [],
    avoid_same_syringe_or_precipitation_risk: []
  },

  alerts_by_comorbidity: [],
  
  presets: [],
  
  references: []
}
