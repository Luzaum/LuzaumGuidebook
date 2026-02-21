import {
  FrequencyType,
  ItemCategory,
  PrescriptionItem,
  PrescriptionState,
  RecommendationsState,
  RouteGroup,
} from './rxTypes'

function nowIso() {
  return new Date().toISOString()
}

export function generateRxId() {
  return `rx-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function createDefaultRecommendations(): RecommendationsState {
  return {
    bullets: ['Retornar em 7 dias para reavaliação clínica.'],
    waterMlPerDay: '1950',
    exams: [],
    customExams: [],
    examReasons: [],
    specialControlPharmacy: 'veterinaria',
    standardTemplateId: '',
    specialControlTemplateId: '',
  }
}

export function createDefaultItem(
  category: ItemCategory = 'medication',
  routeGroup: RouteGroup = 'ORAL',
  frequencyType: FrequencyType = 'timesPerDay'
): PrescriptionItem {
  const now = nowIso()
  return {
    id: `item-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    category,
    controlled: false,
    name: '',
    presentation: '',
    concentration: '',
    commercialName: '',
    pharmacyType: 'veterinaria',
    packageType: 'caixa',
    pharmacyName: '',
    observations: '',
    routeGroup,
    doseValue: '',
    doseUnit: 'mg/kg',
    autoInstruction: true,
    frequencyType,
    frequencyToken: '',
    timesPerDay: '2',
    everyHours: '',
    durationDays: '7',
    untilFinished: false,
    continuousUse: false,
    instruction: '',
    manualEdited: false,
    titleBold: false,
    titleUnderline: false,
    cautions: [],
    createdAt: now,
    updatedAt: now,
  }
}

export function createDefaultPrescriptionState(): PrescriptionState {
  return {
    id: generateRxId(),
    prescriber: {
      profileId: 'default',
      adminId: 'ADMIN',
      name: 'Dr. Silva',
      crmv: 'CRMV-SP 12345',
      clinicName: 'CLÍNICA VETERINÁRIA VETIUS',
    },
    patient: {
      patientRecordId: '',
      name: 'Thor',
      species: 'Canina',
      breed: 'Golden Retriever',
      sex: 'Macho',
      reproductiveStatus: 'Sem dados',
      ageText: '5 anos',
      birthDate: '',
      coat: '',
      weightKg: '32,5',
      weightDate: '',
      notes: '',
      showNotesInPrint: false,
    },
    tutor: {
      tutorRecordId: '',
      name: 'Mariana Silva',
      phone: '',
      cpf: '',
      rg: '',
      email: '',
      addressStreet: '',
      addressNumber: '',
      addressComplement: '',
      addressDistrict: '',
      addressCity: '',
      addressState: '',
      addressZip: '',
      notes: '',
    },
    items: [],
    recommendations: createDefaultRecommendations(),
    updatedAt: nowIso(),
  }
}
