import {
  createEmptyClient,
  loadRxDb,
  saveRxDb,
  upsertClient,
  type ClientAnimalRecord,
  type ClientRecord,
  type PatientRecord,
} from '../rxDb'
import type { PatientInfo, TutorInfo } from '../rxTypes'
import type {
  DataAdapter,
  DataAdapterPatientCreateInput,
  DataAdapterPatientMatch,
  DataAdapterTutorCreateInput,
} from './DataAdapter'

function nowIso() {
  return new Date().toISOString()
}

function normalizeLooseText(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function normalizeSpecies(value: string): PatientInfo['species'] {
  return normalizeLooseText(value).startsWith('fel') ? 'Felina' : 'Canina'
}

function normalizeSex(value: string): PatientInfo['sex'] {
  const sex = normalizeLooseText(value)
  if (sex === 'f' || sex === 'fn' || sex === 'femea') return 'F\u00eamea'
  if (sex === 'm' || sex === 'mn' || sex === 'macho') return 'Macho'
  return 'Sem dados'
}

function normalizeReproductiveStatus(value: string): PatientInfo['reproductiveStatus'] {
  const status = normalizeLooseText(value)
  if (status === 'castrado') return 'Castrado'
  if (status === 'fertil') return 'F\u00e9rtil'
  return 'Sem dados'
}

function buildTutorAddressLine(client: ClientRecord): string {
  return [
    client.addressStreet,
    client.addressNumber,
    client.addressComplement,
    client.addressDistrict,
    client.addressCity,
    client.addressState,
    client.addressZip,
  ]
    .filter(Boolean)
    .join(', ')
}

function toTutorInfo(client: ClientRecord): TutorInfo {
  return {
    tutorRecordId: client.id,
    name: client.fullName || '',
    phone: client.phone || '',
    cpf: client.cpf || '',
    rg: client.rg || '',
    email: client.email || '',
    addressStreet: client.addressStreet || '',
    addressNumber: client.addressNumber || '',
    addressComplement: client.addressComplement || '',
    addressDistrict: client.addressDistrict || '',
    addressCity: client.addressCity || '',
    addressState: client.addressState || '',
    addressZip: client.addressZip || '',
    notes: client.notes || '',
  }
}

function toPatientInfoFromAnimal(animal: ClientAnimalRecord): PatientInfo {
  return {
    patientRecordId: animal.id,
    name: animal.name || '',
    species: normalizeSpecies(animal.species || ''),
    breed: animal.breed || '',
    sex: normalizeSex(animal.sex || ''),
    reproductiveStatus: normalizeReproductiveStatus(animal.reproductiveStatus || ''),
    ageText: animal.ageText || '',
    birthDate: '',
    coat: animal.coat || '',
    weightKg: animal.weightKg || '',
    weightDate: animal.weightDate || '',
    notes: animal.notes || '',
    showNotesInPrint: false,
  }
}

function toPatientInfoFromRecord(record: PatientRecord): PatientInfo {
  return {
    patientRecordId: record.id,
    name: record.name || '',
    species: normalizeSpecies(record.species || ''),
    breed: record.breed || '',
    sex: normalizeSex(record.sex || ''),
    reproductiveStatus: 'Sem dados',
    ageText: record.ageText || '',
    birthDate: '',
    coat: '',
    weightKg: record.weightKg || '',
    weightDate: '',
    notes: '',
    showNotesInPrint: false,
  }
}

function fallbackFindClientForPatient(dbClients: ClientRecord[], record: PatientRecord): ClientRecord | null {
  const byAnimalId = dbClients.find((client) => client.animals.some((animal) => animal.id === record.id))
  if (byAnimalId) return byAnimalId

  const tutorName = normalizeLooseText(record.tutorName || '')
  if (!tutorName) return null
  return dbClients.find((client) => normalizeLooseText(client.fullName || '') === tutorName) || null
}

function makePatientRecord(patient: PatientInfo, tutor: TutorInfo): PatientRecord {
  const tutorAddress = [
    tutor.addressStreet,
    tutor.addressNumber,
    tutor.addressComplement,
    tutor.addressDistrict,
    tutor.addressCity,
    tutor.addressState,
    tutor.addressZip,
  ]
    .filter(Boolean)
    .join(', ')

  return {
    id: patient.patientRecordId,
    name: patient.name,
    species: patient.species,
    breed: patient.breed,
    sex: patient.sex,
    ageText: patient.ageText,
    weightKg: patient.weightKg,
    tutorName: tutor.name,
    tutorPhone: tutor.phone,
    tutorAddress,
    updatedAt: nowIso(),
  }
}

export class LocalAdapter implements DataAdapter {
  source: 'local' = 'local'

  async searchPatientsByName(query: string, limit = 10): Promise<DataAdapterPatientMatch[]> {
    const needle = normalizeLooseText(query)
    if (needle.length < 2) return []

    const db = loadRxDb()
    const hits: DataAdapterPatientMatch[] = []
    const seen = new Set<string>()

    db.clients.forEach((client) => {
      const tutor = toTutorInfo(client)
      client.animals.forEach((animal) => {
        if (!normalizeLooseText(animal.name || '').includes(needle)) return
        const patient = toPatientInfoFromAnimal(animal)
        const key = `${patient.patientRecordId}:${tutor.tutorRecordId}`
        if (seen.has(key)) return
        seen.add(key)
        hits.push({ patient, tutor })
      })
    })

    db.patients.forEach((record) => {
      if (!normalizeLooseText(record.name || '').includes(needle)) return
      const linkedClient = fallbackFindClientForPatient(db.clients, record)
      if (!linkedClient) return
      const tutor = toTutorInfo(linkedClient)
      const patient = toPatientInfoFromRecord(record)
      const key = `${patient.patientRecordId}:${tutor.tutorRecordId}`
      if (seen.has(key)) return
      seen.add(key)
      hits.push({ patient, tutor })
    })

    return hits
      .sort((a, b) => a.patient.name.localeCompare(b.patient.name, 'pt-BR'))
      .slice(0, Math.max(1, limit))
  }

  async searchTutorsByName(query: string, limit = 10): Promise<TutorInfo[]> {
    const needle = normalizeLooseText(query)
    const db = loadRxDb()
    const list = db.clients
      .filter((client) => {
        if (!needle) return true
        return normalizeLooseText(client.fullName || '').includes(needle)
      })
      .map(toTutorInfo)
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))

    return list.slice(0, Math.max(1, limit))
  }

  async getTutorById(id: string): Promise<TutorInfo | null> {
    const targetId = String(id || '').trim()
    if (!targetId) return null
    const db = loadRxDb()
    const found = db.clients.find((client) => client.id === targetId)
    return found ? toTutorInfo(found) : null
  }

  async createTutor(input: DataAdapterTutorCreateInput): Promise<TutorInfo> {
    const name = String(input.name || '').trim()
    if (!name) {
      throw new Error('Nome do tutor e obrigatório.')
    }

    const db = loadRxDb()
    const previousClientIds = new Set(db.clients.map((client) => client.id))
    const nextClient: ClientRecord = {
      ...createEmptyClient(),
      id: '',
      fullName: name,
      phone: input.phone || '',
      email: input.email || '',
      cpf: input.cpf || '',
      rg: input.rg || '',
      addressStreet: input.addressStreet || '',
      addressNumber: input.addressNumber || '',
      addressComplement: input.addressComplement || '',
      addressDistrict: input.addressDistrict || '',
      addressCity: input.addressCity || '',
      addressState: input.addressState || '',
      addressZip: input.addressZip || '',
      notes: input.notes || '',
      animals: [],
      updatedAt: nowIso(),
    }

    const nextDb = upsertClient(db, nextClient)
    saveRxDb(nextDb)

    const persisted =
      nextDb.clients.find((client) => !previousClientIds.has(client.id)) ||
      nextDb.clients.find((client) => normalizeLooseText(client.fullName) === normalizeLooseText(name)) ||
      nextDb.clients[0]

    if (!persisted) {
      throw new Error('Não foi possível criar o tutor no modo local.')
    }

    return toTutorInfo(persisted)
  }

  async createPatient(input: DataAdapterPatientCreateInput): Promise<PatientInfo> {
    const tutorRecordId = String(input.tutorRecordId || '').trim()
    if (!tutorRecordId) {
      throw new Error('Tutor obrigatório para criar paciente.')
    }

    const patientName = String(input.name || '').trim()
    if (!patientName) {
      throw new Error('Nome do paciente e obrigatório.')
    }

    const db = loadRxDb()
    const tutorClient = db.clients.find((client) => client.id === tutorRecordId)
    if (!tutorClient) {
      throw new Error('Tutor não encontrado no banco local.')
    }

    const previousAnimalIds = new Set(tutorClient.animals.map((animal) => animal.id))
    const now = nowIso()
    const draftAnimal: ClientAnimalRecord = {
      id: '',
      name: patientName,
      species: input.species || 'Canina',
      breed: input.breed || '',
      coat: input.coat || '',
      sex: input.sex || 'Sem dados',
      reproductiveStatus: input.reproductiveStatus || 'Sem dados',
      ageText: input.ageText || '',
      weightKg: input.weightKg || '',
      weightDate: input.weightDate || '',
      anamnesis: '',
      notes: input.notes || '',
      weightHistory:
        input.weightKg && String(input.weightKg).trim()
          ? [
              {
                id: `w-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
                date: input.weightDate || now,
                weightKg: input.weightKg,
                source: 'manual',
              },
            ]
          : [],
      updatedAt: now,
    }

    let nextDb = upsertClient(db, {
      ...tutorClient,
      animals: [draftAnimal, ...tutorClient.animals],
      updatedAt: now,
    })

    const persistedTutor = nextDb.clients.find((client) => client.id === tutorRecordId)
    if (!persistedTutor) {
      throw new Error('Falha ao atualizar tutor com novo paciente.')
    }

    const persistedAnimal =
      persistedTutor.animals.find(
        (animal) =>
          !previousAnimalIds.has(animal.id) &&
          normalizeLooseText(animal.name) === normalizeLooseText(patientName)
      ) ||
      persistedTutor.animals.find((animal) => normalizeLooseText(animal.name) === normalizeLooseText(patientName))

    if (!persistedAnimal) {
      throw new Error('Falha ao criar paciente no banco local.')
    }

    const tutor = toTutorInfo(persistedTutor)
    const patient = toPatientInfoFromAnimal({
      ...persistedAnimal,
      notes: input.notes || persistedAnimal.notes || '',
      weightDate: input.weightDate || persistedAnimal.weightDate || '',
    })

    const patientRecord = makePatientRecord(patient, tutor)
    nextDb = {
      ...nextDb,
      patients: [patientRecord, ...nextDb.patients.filter((entry) => entry.id !== patientRecord.id)],
    }

    saveRxDb(nextDb)
    return patient
  }

  async listPatientsByTutorId(tutorId: string): Promise<PatientInfo[]> {
    const targetId = String(tutorId || '').trim()
    if (!targetId) return []
    const db = loadRxDb()
    const tutor = db.clients.find((entry) => entry.id === targetId)
    if (!tutor) return []
    return tutor.animals.map(toPatientInfoFromAnimal)
  }
}
