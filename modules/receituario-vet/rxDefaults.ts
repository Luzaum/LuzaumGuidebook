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
    specialControlPharmacy: 'veterinária',
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
    pharmacyType: 'veterinária',
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
      name: '',
      species: 'Canina',
      breed: '',
      sex: 'Sem dados',
      reproductiveStatus: 'Sem dados',
      ageText: '',
      birthDate: '',
      coat: '',
      color: '',
      microchip: '',
      weightKg: '',
      weightDate: '',
      anamnesis: '',
      notes: '',
      showNotesInPrint: false,
    },
    tutor: {
      tutorRecordId: '',
      name: '',
      phone: '',
      email: '',
      documentId: '',
      cpf: '',
      rg: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipcode: '',
      notes: '',
    },
    items: [],
    recommendations: createDefaultRecommendations(),
    updatedAt: nowIso(),
  }
}
