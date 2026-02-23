import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReceituarioChrome from './ReceituarioChrome'
import { BRAZIL_STATE_SUGGESTIONS, citySuggestionsForState, lookupAddressByCep, normalizeStateInput } from './rxBrazilData'
import { digitsOnly, maskCep, maskCpf, maskPhoneBr, maskRg } from './rxInputMasks'
import { breedOptionsForSpecies, coatOptionsForSpecies } from './rxReferenceData'
import {
  ClientAnimalRecord,
  ClientRecord,
  HistoryRecord,
  createEmptyClient,
  createEmptyClientAnimal,
  loadRxDb,
  removeClient,
  saveRxDb,
  upsertClient,
} from './rxDb'
import { useClinic } from '@/src/components/ClinicProvider'
import { insertTutor, insertPatient, listTutors } from '@/src/lib/clinicRecords'
import { createRxDataAdapter, resolveRxDataSource } from './adapters'
import { isUuid } from '@/src/lib/isUuid'
import type { TutorInfo, PatientInfo } from './rxTypes'

function createClientName(client: ClientRecord) {
  return client.fullName.trim() || 'Tutor sem nome'
}

function normalizeLooseText(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

const NUMERIC_ID_PATTERN = /^\d{5}$/

function isNumericRecordId(value: string | null | undefined): boolean {
  return NUMERIC_ID_PATTERN.test(String(value || '').trim())
}

function nextNumericRecordId(existingIds: string[]): string {
  let max = 0
  existingIds.forEach((rawId) => {
    const id = String(rawId || '').trim()
    if (!isNumericRecordId(id)) return
    const numeric = Number(id)
    if (Number.isFinite(numeric) && numeric > max) max = numeric
  })
  return String(max + 1).padStart(5, '0')
}

function parseWeight(value: string): number | null {
  const normalized = String(value || '').replace(',', '.')
  const numeric = Number(normalized)
  if (!Number.isFinite(numeric) || numeric <= 0) return null
  return numeric
}

function formatWeight(value: string): string {
  const numeric = parseWeight(value)
  if (numeric === null) return '-'
  return `${numeric.toFixed(2).replace('.', ',')} kg`
}

function formatDate(value: string): string {
  const dt = new Date(value)
  if (Number.isNaN(dt.getTime())) return '-'
  return dt.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function sparklinePath(animal: ClientAnimalRecord, width = 360, height = 120): string {
  const points = [...(animal.weightHistory || [])]
    .filter((entry) => parseWeight(entry.weightKg) !== null)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((entry) => ({
      xLabel: entry.date,
      value: parseWeight(entry.weightKg) || 0,
    }))
  if (points.length === 0) return ''
  if (points.length === 1) {
    const y = height / 2
    return `M 20 ${y} L ${width - 20} ${y}`
  }

  const minY = Math.min(...points.map((entry) => entry.value))
  const maxY = Math.max(...points.map((entry) => entry.value))
  const spanY = Math.max(maxY - minY, 0.01)
  const left = 20
  const right = width - 20
  const top = 14
  const bottom = height - 20
  const chartWidth = right - left
  const chartHeight = bottom - top

  return points
    .map((entry, index) => {
      const x = left + (index / (points.length - 1)) * chartWidth
      const y = top + (1 - (entry.value - minY) / spanY) * chartHeight
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
}

function buildUpdatedAnimalForSave(animal: ClientAnimalRecord): ClientAnimalRecord {
  const now = new Date().toISOString()
  const history: Array<{ id: string; date: string; weightKg: string; source: 'manual' | 'prescription' }> = [...(animal.weightHistory || [])]
    .map((entry) => ({
      id: entry.id || `w-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      date: entry.date || now,
      weightKg: String(entry.weightKg || '').trim(),
      source: (entry.source === 'prescription' ? 'prescription' : 'manual') as 'manual' | 'prescription',
    }))
    .filter((entry) => !!entry.weightKg)
  const currentWeight = String(animal.weightKg || '').trim()
  if (currentWeight) {
    const last = history[history.length - 1]
    if (!last || last.weightKg !== currentWeight) {
      history.push({
        id: `w-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
        date: now,
        weightKg: currentWeight,
        source: 'manual',
      })
    }
  }
  return {
    ...animal,
    weightHistory: history,
    weightDate: (animal.weightDate || history[history.length - 1]?.date || '').slice(0, 10),
    updatedAt: now,
  }
}

function historyForAnimal(records: HistoryRecord[], client: ClientRecord, animal: ClientAnimalRecord): HistoryRecord[] {
  const tutorId = client.id
  const patientId = animal.id
  const tutorName = normalizeLooseText(client.fullName)
  const patientName = normalizeLooseText(animal.name)

  return [...records]
    .filter((entry) => {
      if (entry.patientId && entry.patientId === patientId) return !entry.tutorId || entry.tutorId === tutorId
      const byName = normalizeLooseText(entry.patientName) === patientName
      if (!byName) return false
      if (entry.tutorId) return entry.tutorId === tutorId
      return normalizeLooseText(entry.tutorName) === tutorName
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export default function ClientesPage() {
  const { clinicId } = useClinic()
  const rxDataSource = useMemo(
    () => resolveRxDataSource(import.meta.env.VITE_RX_DATA_SOURCE),
    []
  )
  const rxAdapter = useMemo(
    () => createRxDataAdapter({ source: rxDataSource, clinicId }),
    [clinicId, rxDataSource]
  )

  // ----- LOCAL mode state -----
  const [db, setDb] = useState(() => loadRxDb())

  // ----- SUPABASE mode state -----
  const [supabaseTutors, setSupabaseTutors] = useState<TutorInfo[]>([])
  const [supabasePatientsMap, setSupabasePatientsMap] = useState<Record<string, PatientInfo[]>>({})
  const [supabaseLoading, setSupabaseLoading] = useState(false)
  const [supabaseSaving, setSupabaseSaving] = useState(false)

  // Load tutors from Supabase when in Supabase mode
  const loadSupabaseTutors = useCallback(async () => {
    if (rxDataSource !== 'supabase') return
    setSupabaseLoading(true)
    try {
      const tutors = await rxAdapter.searchTutorsByName('', 100)
      setSupabaseTutors(tutors)
    } catch (err) {
      if (import.meta.env.DEV) console.error('[ClientesPage] Failed to load Supabase tutors', err)
    } finally {
      setSupabaseLoading(false)
    }
  }, [rxAdapter, rxDataSource])

  useEffect(() => {
    if (rxDataSource === 'supabase') {
      void loadSupabaseTutors()
    }
  }, [rxDataSource, loadSupabaseTutors])

  // Load patients for a Supabase tutor
  const loadSupabasePatientsForTutor = useCallback(async (tutorId: string) => {
    if (rxDataSource !== 'supabase') return
    if (supabasePatientsMap[tutorId]) return // already loaded
    try {
      if (rxAdapter.listPatientsByTutorId) {
        const patients = await rxAdapter.listPatientsByTutorId(tutorId)
        setSupabasePatientsMap((prev) => ({ ...prev, [tutorId]: patients }))
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error('[ClientesPage] Failed to load patients for tutor', tutorId, err)
    }
  }, [rxAdapter, rxDataSource, supabasePatientsMap])

  // ----- SHARED state -----
  const [selectedId, setSelectedId] = useState<string>('')
  const [draft, setDraft] = useState<ClientRecord>(() => {
    const localDb = loadRxDb()
    if (localDb.clients[0]) return localDb.clients[0]
    const empty = createEmptyClient()
    const nextClientId = nextNumericRecordId(localDb.clients.map((entry) => entry.id))
    const nextAnimalId = nextNumericRecordId(localDb.clients.flatMap((entry) => entry.animals.map((animal) => animal.id)))
    return {
      ...empty,
      id: nextClientId,
      animals: empty.animals.map((animal, idx) => ({ ...animal, id: idx === 0 ? nextAnimalId : animal.id })),
    }
  })
  const [toast, setToast] = useState<string | null>(null)
  const [cepLookupLoading, setCepLookupLoading] = useState(false)
  const [cepLookupMessage, setCepLookupMessage] = useState<string | null>(null)

  // List shown in sidebar
  const sidebarClients = rxDataSource === 'supabase' ? [] : db.clients
  const sidebarSupabaseTutors = rxDataSource === 'supabase' ? supabaseTutors : []

  const selectedClient = useMemo(
    () => db.clients.find((entry) => entry.id === selectedId) || null,
    [db.clients, selectedId]
  )
  const citySuggestions = useMemo(
    () => citySuggestionsForState(draft.addressState || ''),
    [draft.addressState]
  )

  const syncToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 2400)
  }

  const selectClient = (clientId: string) => {
    const found = db.clients.find((entry) => entry.id === clientId)
    if (!found) return
    setSelectedId(found.id)
    setDraft(JSON.parse(JSON.stringify(found)) as ClientRecord)
    setCepLookupMessage(null)
  }

  const selectSupabaseTutor = (tutor: TutorInfo) => {
    setSelectedId(tutor.tutorRecordId)
    // Map TutorInfo back to ClientRecord-like draft
    const patients = supabasePatientsMap[tutor.tutorRecordId] || []
    setDraft({
      ...createEmptyClient(),
      id: tutor.tutorRecordId,
      fullName: tutor.name,
      phone: tutor.phone || '',
      email: tutor.email || '',
      cpf: tutor.cpf || '',
      rg: tutor.rg || '',
      addressStreet: tutor.addressStreet || '',
      addressNumber: tutor.addressNumber || '',
      addressComplement: tutor.addressComplement || '',
      addressDistrict: tutor.addressDistrict || '',
      addressCity: tutor.addressCity || '',
      addressState: tutor.addressState || '',
      addressZip: tutor.addressZip || '',
      notes: tutor.notes || '',
      animals: patients.map((p) => ({
        ...createEmptyClientAnimal(),
        id: p.patientRecordId,
        name: p.name,
        species: p.species || 'Canina',
        breed: p.breed || '',
        sex: p.sex || 'Sem dados',
        reproductiveStatus: p.reproductiveStatus || 'Sem dados',
        ageText: p.ageText || '',
        coat: p.coat || '',
        weightKg: p.weightKg || '',
        weightDate: p.weightDate || '',
        notes: p.notes || '',
        weightHistory: [],
        anamnesis: '',
        updatedAt: new Date().toISOString(),
      })),
      updatedAt: new Date().toISOString(),
    })
    // Eagerly load patients if not yet loaded
    void loadSupabasePatientsForTutor(tutor.tutorRecordId)
    setCepLookupMessage(null)
  }

  const createNewClient = () => {
    const next = createEmptyClient()
    if (rxDataSource === 'supabase') {
      // In Supabase mode, clear ID (UUID will be generated on save)
      setSelectedId('')
      setDraft({
        ...next,
        id: '',
        animals: [{ ...createEmptyClientAnimal(), id: '' }],
      })
      setCepLookupMessage(null)
      return
    }
    const nextClientId = nextNumericRecordId([
      ...db.clients.map((entry) => entry.id),
      ...((draft?.id && isNumericRecordId(draft.id)) ? [draft.id] : []),
    ])
    const nextAnimalId = nextNumericRecordId([
      ...db.clients.flatMap((entry) => entry.animals.map((animal) => animal.id)),
      ...((draft?.animals || []).map((animal) => animal.id)),
    ])
    setSelectedId('')
    setDraft({
      ...next,
      id: nextClientId,
      animals: next.animals.map((animal, idx) => ({ ...animal, id: idx === 0 ? nextAnimalId : animal.id })),
    })
    setCepLookupMessage(null)
  }

  const patchField = <K extends keyof ClientRecord>(key: K, value: ClientRecord[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  const patchAnimal = <K extends keyof ClientAnimalRecord>(index: number, key: K, value: ClientAnimalRecord[K]) => {
    setDraft((prev) => ({
      ...prev,
      animals: prev.animals.map((animal, idx) => (idx === index ? { ...animal, [key]: value } : animal)),
    }))
  }

  const addAnimal = () => {
    setDraft((prev) => {
      const nextAnimalId = nextNumericRecordId([
        ...db.clients.flatMap((entry) => entry.animals.map((animal) => animal.id)),
        ...prev.animals.map((animal) => animal.id),
      ])
      return {
        ...prev,
        animals: [...prev.animals, { ...createEmptyClientAnimal(), id: nextAnimalId }],
      }
    })
  }

  const removeAnimal = (index: number) => {
    setDraft((prev) => ({
      ...prev,
      animals: prev.animals.length === 1 ? prev.animals : prev.animals.filter((_, idx) => idx !== index),
    }))
  }

  const appendManualWeight = (index: number) => {
    const animal = draft.animals[index]
    if (!animal) return
    const currentWeight = String(animal.weightKg || '').trim()
    if (!currentWeight) {
      syncToast('Preencha o peso atual antes de registrar na evolução.')
      return
    }
    const history = [...(animal.weightHistory || [])]
    const last = history[history.length - 1]
    if (last?.weightKg === currentWeight) {
      syncToast('Peso atual já está registrado na evolução.')
      return
    }
    const now = new Date()
    const todayDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    const entryDate = animal.weightDate || todayDate
    history.push({
      id: `w-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      date: entryDate,
      weightKg: currentWeight,
      source: 'manual',
    })
    patchAnimal(index, 'weightDate', entryDate)
    patchAnimal(index, 'weightHistory', history)
    syncToast('Peso adicionado ao gráfico de evolução.')
  }

  const fetchCep = async (rawCep: string) => {
    const cepDigits = digitsOnly(rawCep).slice(0, 8)
    if (cepDigits.length !== 8) {
      setCepLookupMessage(null)
      return
    }
    setCepLookupLoading(true)
    setCepLookupMessage(null)
    const address = await lookupAddressByCep(cepDigits)
    setCepLookupLoading(false)
    if (!address) {
      setCepLookupMessage('CEP não encontrado.')
      return
    }

    setDraft((prev) => ({
      ...prev,
      addressZip: maskCep(address.cep || cepDigits),
      addressStreet: address.street || prev.addressStreet || '',
      addressDistrict: address.district || prev.addressDistrict || '',
      addressCity: address.city || prev.addressCity || '',
      addressState: normalizeStateInput(address.state || prev.addressState || ''),
      addressComplement: prev.addressComplement || address.complement || '',
    }))
    setCepLookupMessage('Endereço preenchido automaticamente pelo CEP.')
  }

  const saveClientDraft = async () => {
    const now = new Date().toISOString()
    const animals = (draft.animals.length ? draft.animals : [createEmptyClientAnimal()]).map((animal) =>
      buildUpdatedAnimalForSave(animal)
    )
    const nextClient: ClientRecord = {
      ...draft,
      fullName: draft.fullName.trim(),
      cpf: maskCpf(draft.cpf),
      rg: maskRg(draft.rg),
      phone: maskPhoneBr(draft.phone),
      addressState: normalizeStateInput(draft.addressState || ''),
      addressZip: maskCep(draft.addressZip),
      animals,
      updatedAt: now,
    }

    if (rxDataSource === 'supabase') {
      // MODO SUPABASE: Salvar tutor E pacientes no banco remoto
      const fullName = nextClient.fullName.trim()
      if (!fullName) {
        syncToast('Preencha o nome do tutor antes de salvar.')
        return
      }
      setSupabaseSaving(true)
      try {
        // 1. Determine if this is a new tutor or existing (by UUID in selectedId)
        let tutorId: string
        const isExistingTutor = isUuid(selectedId)

        if (isExistingTutor) {
          // For existing tutors we skip re-inserting (Supabase upsert not implemented yet)
          // Just use existing ID and proceed to save new animals
          tutorId = selectedId
          if (import.meta.env.DEV) {
            console.log('[ClientesPage] Updating existing Supabase tutor (animals only):', tutorId)
          }
        } else {
          // Insert new tutor
          if (import.meta.env.DEV) {
            console.log('[ClientesPage] Inserting new Supabase tutor:', fullName)
          }
          const result = await insertTutor(
            {
              full_name: fullName,
              phone: nextClient.phone || undefined,
              email: nextClient.email || undefined,
              notes: nextClient.notes || undefined,
            },
            clinicId
          )
          const inserted = Array.isArray(result) ? result[0] : result
          tutorId = (inserted as { id: string }).id
          if (!tutorId) throw new Error('ID do tutor não retornado pelo Supabase.')
          if (import.meta.env.DEV) console.log('[ClientesPage] New tutor ID:', tutorId)
        }

        // 2. Save each animal as a patient linked to this tutor
        const animalsToSave = animals.filter((a) => a.name.trim())
        const newPatients: PatientInfo[] = []
        for (const animal of animalsToSave) {
          // Skip animals that already have a UUID (already saved)
          if (isUuid(animal.id)) {
            // Already a Supabase patient — skip re-insert
            continue
          }
          try {
            const patientResult = await insertPatient(
              {
                tutor_id: tutorId,
                name: animal.name.trim(),
                species: animal.species || undefined,
                breed: animal.breed || undefined,
                sex: animal.sex || undefined,
                age_text: animal.ageText || undefined,
                weight_kg: animal.weightKg || undefined,
                notes: animal.notes || undefined,
              },
              clinicId
            )
            const insertedPatient = Array.isArray(patientResult) ? patientResult[0] : patientResult
            if (insertedPatient) {
              newPatients.push({
                patientRecordId: (insertedPatient as { id: string }).id,
                name: animal.name,
                species: (animal.species || 'Canina') as PatientInfo['species'],
                breed: animal.breed || '',
                sex: (animal.sex || 'Sem dados') as PatientInfo['sex'],
                reproductiveStatus: (animal.reproductiveStatus || 'Sem dados') as PatientInfo['reproductiveStatus'],
                ageText: animal.ageText || '',
                birthDate: '',
                coat: animal.coat || '',
                weightKg: animal.weightKg || '',
                weightDate: animal.weightDate || '',
                notes: animal.notes || '',
                showNotesInPrint: false,
              })
            }
          } catch (patientErr) {
            const msg = patientErr instanceof Error ? patientErr.message : 'Erro'
            syncToast(`Erro ao salvar paciente "${animal.name}": ${msg}`)
            if (import.meta.env.DEV) console.error('[ClientesPage] Patient save error:', patientErr)
          }
        }

        // Update local state
        setSelectedId(tutorId)
        setDraft((prev) => ({
          ...prev,
          id: tutorId,
          animals: prev.animals.map((a, idx) => {
            if (isUuid(a.id)) return a // already persisted
            const saved = newPatients[idx]
            return saved ? { ...a, id: saved.patientRecordId } : a
          }),
        }))

        // Refresh Supabase tutor list and patient cache
        await loadSupabaseTutors()
        if (rxAdapter.listPatientsByTutorId) {
          const refreshed = await rxAdapter.listPatientsByTutorId(tutorId)
          setSupabasePatientsMap((prev) => ({ ...prev, [tutorId]: refreshed }))
        }

        const savedCount = animalsToSave.filter((a) => !isUuid(a.id)).length
        syncToast(`Tutor e ${savedCount} paciente(s) salvos no Supabase com sucesso.`)
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Erro ao salvar'
        syncToast(`Erro ao salvar tutor: ${msg}`)
        if (import.meta.env.DEV) console.error('[ClientesPage] Supabase save error:', error)
      } finally {
        setSupabaseSaving(false)
      }
    } else {
      // MODO LOCAL: Salvar no banco legado
      const nextDb = upsertClient(db, nextClient)
      saveRxDb(nextDb)
      setDb(nextDb)
      const persistedClient =
        nextDb.clients.find((entry) => isNumericRecordId(nextClient.id) && entry.id === nextClient.id) ||
        nextDb.clients.find(
          (entry) =>
            normalizeLooseText(entry.fullName) === normalizeLooseText(nextClient.fullName) &&
            digitsOnly(entry.phone) === digitsOnly(nextClient.phone)
        ) ||
        nextDb.clients[0]
      if (persistedClient) {
        setSelectedId(persistedClient.id)
        setDraft(JSON.parse(JSON.stringify(persistedClient)) as ClientRecord)
      }
      syncToast('Tutor e pacientes salvos com sucesso.')
    }
  }

  const deleteSelectedClient = () => {
    if (!selectedClient) return
    const confirmDelete = window.confirm('Deseja remover este tutor e todos os pacientes vinculados?')
    if (!confirmDelete) return
    const nextDb = removeClient(db, selectedClient.id)
    saveRxDb(nextDb)
    setDb(nextDb)
    if (nextDb.clients[0]) {
      setSelectedId(nextDb.clients[0].id)
      setDraft(JSON.parse(JSON.stringify(nextDb.clients[0])) as ClientRecord)
    } else {
      setSelectedId('')
      const empty = createEmptyClient()
      const nextClientId = nextNumericRecordId(nextDb.clients.map((entry) => entry.id))
      const nextAnimalId = nextNumericRecordId(nextDb.clients.flatMap((entry) => entry.animals.map((animal) => animal.id)))
      setDraft({
        ...empty,
        id: nextClientId,
        animals: empty.animals.map((animal, idx) => ({ ...animal, id: idx === 0 ? nextAnimalId : animal.id })),
      })
    }
    syncToast('Tutor removido.')
  }

  return (
    <ReceituarioChrome
      section="clientes"
      title="Tutores e Pacientes"
      subtitle="Banco de dados robusto para receitas controladas: tutor, animais, evolução de peso e histórico clínico."
      actions={
        <>
          <button type="button" className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm" onClick={createNewClient}>
            <span className="material-symbols-outlined text-[18px]">add</span>
            Novo tutor
          </button>
          <button
            type="button"
            className="rxv-btn-primary inline-flex items-center gap-2 px-3 py-2 text-sm disabled:opacity-60"
            onClick={() => void saveClientDraft()}
            disabled={supabaseSaving}
          >
            <span className="material-symbols-outlined text-[18px]">{supabaseSaving ? 'sync' : 'save'}</span>
            {supabaseSaving ? 'Salvando...' : 'Salvar'}
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <aside className="rxv-card p-4 xl:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wide text-[color:var(--rxv-muted)]">Tutores</h3>
            <span className="rounded-full border border-[color:var(--rxv-border)] px-2 py-0.5 text-xs text-[color:var(--rxv-muted)]">
              {rxDataSource === 'supabase' ? supabaseTutors.length : db.clients.length}
            </span>
          </div>
          <div className="space-y-2">
            {rxDataSource === 'supabase' ? (
              supabaseLoading ? (
                <p className="rounded-lg border border-dashed border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-3 text-xs text-[color:var(--rxv-muted)]">
                  Carregando tutores...
                </p>
              ) : supabaseTutors.length === 0 ? (
                <p className="rounded-lg border border-dashed border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-3 text-xs text-[color:var(--rxv-muted)]">
                  Nenhum tutor no banco. Crie um usando o botão "Novo tutor".
                </p>
              ) : (
                supabaseTutors.map((tutor) => (
                  <button
                    type="button"
                    key={tutor.tutorRecordId}
                    className={`w-full rounded-xl border px-3 py-2 text-left ${tutor.tutorRecordId === selectedId ? 'border-[#61eb48]/45 bg-[#61eb48]/10' : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/60'
                      }`}
                    onClick={() => {
                      selectSupabaseTutor(tutor)
                    }}
                  >
                    <p className="text-sm font-semibold">{tutor.name || 'Tutor sem nome'}</p>
                    <p className="text-xs text-[color:var(--rxv-muted)]">{tutor.phone || tutor.email || 'Sem contato'}</p>
                  </button>
                ))
              )
            ) : (
              db.clients.length === 0 ? (
                <p className="rounded-lg border border-dashed border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-3 text-xs text-[color:var(--rxv-muted)]">
                  Nenhum tutor cadastrado.
                </p>
              ) : (
                db.clients.map((client) => (
                  <button
                    type="button"
                    key={client.id}
                    className={`w-full rounded-xl border px-3 py-2 text-left ${client.id === selectedId ? 'border-[#61eb48]/45 bg-[#61eb48]/10' : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/60'
                      }`}
                    onClick={() => selectClient(client.id)}
                  >
                    <p className="text-sm font-semibold">#{client.id} - {createClientName(client)}</p>
                    <p className="text-xs text-[color:var(--rxv-muted)]">{client.animals.length} paciente(s)</p>
                  </button>
                ))
              )
            )}
          </div>
          {rxDataSource === 'supabase' && (
            <button
              type="button"
              className="mt-3 w-full rounded-lg border border-[color:var(--rxv-border)]/60 px-3 py-1.5 text-xs text-[color:var(--rxv-muted)] hover:bg-[color:var(--rxv-surface-2)] disabled:opacity-40"
              onClick={() => void loadSupabaseTutors()}
              disabled={supabaseLoading}
            >
              {supabaseLoading ? 'Atualizando...' : '↺ Atualizar lista'}
            </button>
          )}
          {rxDataSource === 'local' && (
            <button
              type="button"
              className="mt-4 w-full rounded-lg border border-red-700/60 px-3 py-2 text-sm text-red-300 hover:bg-red-900/20 disabled:opacity-40"
              disabled={!selectedClient}
              onClick={deleteSelectedClient}
            >
              Remover tutor
            </button>
          )}
        </aside>

        <main className="space-y-6 xl:col-span-9">
          <section className="rxv-card p-5">
            <h2 className="mb-4 text-lg font-bold">Dados do tutor</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {rxDataSource === 'local' ? (
                <label className="text-xs text-[color:var(--rxv-muted)]">
                  ID do tutor
                  <input className="mt-1 w-full px-3 py-2" value={draft.id} readOnly />
                </label>
              ) : (
                <div className="text-xs text-[color:var(--rxv-muted)]">
                  <label>ID do tutor (UUID)</label>
                  <div className="mt-1 w-full px-3 py-2 rounded bg-slate-800 text-slate-400 overflow-x-auto text-ellipsis text-sm font-mono">
                    {isUuid(draft.id) ? draft.id : 'Será gerado ao salvar'}
                  </div>
                </div>
              )}
              <label className="text-xs text-[color:var(--rxv-muted)] md:col-span-2">
                Nome completo *
                <input className="mt-1 w-full px-3 py-2" value={draft.fullName} onChange={(e) => patchField('fullName', e.target.value)} />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                CPF *
                <input
                  className="mt-1 w-full px-3 py-2"
                  inputMode="numeric"
                  maxLength={14}
                  placeholder="000.000.000-00"
                  value={draft.cpf}
                  onChange={(e) => patchField('cpf', maskCpf(e.target.value))}
                />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                RG
                <input
                  className="mt-1 w-full px-3 py-2"
                  maxLength={12}
                  placeholder="00.000.000-0"
                  value={draft.rg}
                  onChange={(e) => patchField('rg', maskRg(e.target.value))}
                />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Telefone *
                <input
                  className="mt-1 w-full px-3 py-2"
                  inputMode="tel"
                  maxLength={15}
                  placeholder="(00) 00000-0000"
                  value={draft.phone}
                  onChange={(e) => patchField('phone', maskPhoneBr(e.target.value))}
                />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)] md:col-span-2">
                E-mail
                <input className="mt-1 w-full px-3 py-2" value={draft.email} onChange={(e) => patchField('email', e.target.value)} />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)] md:col-span-2">
                Rua *
                <input className="mt-1 w-full px-3 py-2" value={draft.addressStreet} onChange={(e) => patchField('addressStreet', e.target.value)} />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Número *
                <input className="mt-1 w-full px-3 py-2" value={draft.addressNumber} onChange={(e) => patchField('addressNumber', e.target.value)} />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)] md:col-span-2">
                Complemento
                <input className="mt-1 w-full px-3 py-2" value={draft.addressComplement} onChange={(e) => patchField('addressComplement', e.target.value)} />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Bairro *
                <input className="mt-1 w-full px-3 py-2" value={draft.addressDistrict} onChange={(e) => patchField('addressDistrict', e.target.value)} />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Estado (UF) *
                <input
                  className="mt-1 w-full px-3 py-2"
                  list="rx-client-state-options"
                  placeholder="SP ou São Paulo"
                  value={draft.addressState}
                  onChange={(e) => patchField('addressState', e.target.value)}
                  onBlur={(e) => patchField('addressState', normalizeStateInput(e.target.value))}
                />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Cidade *
                <input
                  className="mt-1 w-full px-3 py-2"
                  list="rx-client-city-options"
                  placeholder="Digite para buscar"
                  value={draft.addressCity}
                  onChange={(e) => patchField('addressCity', e.target.value)}
                />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                CEP *
                <div className="mt-1 flex gap-2">
                  <input
                    className="w-full px-3 py-2"
                    inputMode="numeric"
                    maxLength={9}
                    placeholder="00000-000"
                    value={draft.addressZip}
                    onChange={(e) => patchField('addressZip', maskCep(e.target.value))}
                    onBlur={(e) => void fetchCep(e.target.value)}
                  />
                  <button
                    type="button"
                    className="rounded-lg border border-[color:var(--rxv-border)] px-3 py-1 text-xs font-semibold text-[color:var(--rxv-muted)] hover:bg-[color:var(--rxv-surface-2)]"
                    onClick={() => void fetchCep(draft.addressZip)}
                    disabled={cepLookupLoading}
                  >
                    {cepLookupLoading ? '...' : 'Buscar'}
                  </button>
                </div>
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)] md:col-span-3">
                Observações do tutor
                <textarea className="mt-1 w-full px-3 py-2" rows={2} value={draft.notes} onChange={(e) => patchField('notes', e.target.value)} />
              </label>
            </div>
            <datalist id="rx-client-state-options">
              {BRAZIL_STATE_SUGGESTIONS.map((entry) => (
                <option key={entry} value={entry} />
              ))}
            </datalist>
            <datalist id="rx-client-city-options">
              {citySuggestions.map((entry) => (
                <option key={entry} value={entry} />
              ))}
            </datalist>
            {cepLookupMessage ? <p className="mt-3 text-xs font-semibold text-[#9be78c]">{cepLookupMessage}</p> : null}
          </section>

          <section className="rxv-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Pacientes do tutor</h2>
              <button type="button" className="rxv-btn-secondary px-3 py-1.5 text-sm" onClick={addAnimal}>
                + Adicionar paciente
              </button>
            </div>

            <div className="space-y-6">
              {draft.animals.map((animal, index) => {
                const historyEntries = historyForAnimal(db.history, draft, animal)
                const weightLine = sparklinePath(animal)
                const sortedWeightHistory = [...(animal.weightHistory || [])].sort(
                  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                const breedOptions = breedOptionsForSpecies(animal.species === 'Felina' ? 'Felina' : 'Canina')
                const coatOptions = coatOptionsForSpecies(animal.species === 'Felina' ? 'Felina' : 'Canina')
                return (
                  <article key={animal.id} className="rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-bold">Paciente {index + 1}</p>
                      <button type="button" className="rounded border border-red-700/60 px-2 py-1 text-xs text-red-300 hover:bg-red-900/20" onClick={() => removeAnimal(index)}>
                        Remover
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      <label className="text-xs text-[color:var(--rxv-muted)]">
                        ID do paciente
                        <input className="mt-1 w-full px-3 py-2" value={animal.id} readOnly />
                      </label>
                      <label className="text-xs text-[color:var(--rxv-muted)]">
                        Nome *
                        <input className="mt-1 w-full px-3 py-2" value={animal.name} onChange={(e) => patchAnimal(index, 'name', e.target.value)} />
                      </label>
                      <label className="text-xs text-[color:var(--rxv-muted)]">
                        Espécie *
                        <select className="mt-1 w-full px-3 py-2" value={animal.species} onChange={(e) => patchAnimal(index, 'species', e.target.value)}>
                          <option value="Canina">Canina</option>
                          <option value="Felina">Felina</option>
                        </select>
                      </label>
                      <label className="text-xs text-[color:var(--rxv-muted)]">
                        Sexo
                        <select className="mt-1 w-full px-3 py-2" value={animal.sex} onChange={(e) => patchAnimal(index, 'sex', e.target.value)}>
                          <option value="Macho">Macho</option>
                          <option value="Fêmea">Fêmea</option>
                          <option value="Sem dados">Sem dados</option>
                        </select>
                      </label>
                      <label className="text-xs text-[color:var(--rxv-muted)]">
                        Estado reprodutivo
                        <select className="mt-1 w-full px-3 py-2" value={animal.reproductiveStatus} onChange={(e) => patchAnimal(index, 'reproductiveStatus', e.target.value)}>
                          <option value="Castrado">Castrado</option>
                          <option value="Fértil">Fértil</option>
                          <option value="Sem dados">Sem dados</option>
                        </select>
                      </label>
                      <label className="text-xs text-[color:var(--rxv-muted)]">
                        Raça
                        <input
                          list={`rx-client-breed-options-${index}`}
                          className="mt-1 w-full px-3 py-2"
                          value={animal.breed}
                          onChange={(e) => patchAnimal(index, 'breed', e.target.value)}
                          placeholder={animal.species === 'Canina' ? 'Ex.: Labrador Retriever' : 'Ex.: Siamês'}
                        />
                        <datalist id={`rx-client-breed-options-${index}`}>
                          {breedOptions.map((entry) => (
                            <option key={entry} value={entry} />
                          ))}
                        </datalist>
                      </label>
                      <label className="text-xs text-[color:var(--rxv-muted)]">
                        Idade
                        <input className="mt-1 w-full px-3 py-2" value={animal.ageText} onChange={(e) => patchAnimal(index, 'ageText', e.target.value)} />
                      </label>
                      <label className="text-xs text-[color:var(--rxv-muted)]">
                        Pelagem
                        <input
                          list={`rx-client-coat-options-${index}`}
                          className="mt-1 w-full px-3 py-2"
                          value={animal.coat || ''}
                          onChange={(e) => patchAnimal(index, 'coat', e.target.value)}
                          placeholder={animal.species === 'Canina' ? 'Ex.: Caramelo' : 'Ex.: Rajado clássico'}
                        />
                        <datalist id={`rx-client-coat-options-${index}`}>
                          {coatOptions.map((entry) => (
                            <option key={entry} value={entry} />
                          ))}
                        </datalist>
                      </label>
                      <label className="text-xs text-[color:var(--rxv-muted)]">
                        Peso atual (kg) *
                        <div className="mt-1 flex gap-2">
                          <input className="w-full px-3 py-2" value={animal.weightKg} onChange={(e) => patchAnimal(index, 'weightKg', e.target.value)} />
                          <button type="button" className="rounded-lg border border-[color:var(--rxv-border)] px-3 py-1 text-xs font-semibold text-[color:var(--rxv-muted)] hover:bg-[color:var(--rxv-surface)]" onClick={() => appendManualWeight(index)}>
                            Registrar
                          </button>
                        </div>
                      </label>
                      <label className="text-xs text-[color:var(--rxv-muted)]">
                        Data da pesagem
                        <input
                          type="date"
                          className="mt-1 w-full px-3 py-2"
                          value={animal.weightDate || ''}
                          onChange={(e) => patchAnimal(index, 'weightDate', e.target.value)}
                        />
                      </label>
                      <label className="text-xs text-[color:var(--rxv-muted)] md:col-span-3">
                        Anamnese básica
                        <textarea className="mt-1 w-full px-3 py-2" rows={2} value={animal.anamnesis} onChange={(e) => patchAnimal(index, 'anamnesis', e.target.value)} />
                      </label>
                      <label className="text-xs text-[color:var(--rxv-muted)] md:col-span-3">
                        Observações do paciente
                        <textarea className="mt-1 w-full px-3 py-2" rows={2} value={animal.notes} onChange={(e) => patchAnimal(index, 'notes', e.target.value)} />
                      </label>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <div className="rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] p-3">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[color:var(--rxv-muted)]">Evolução de peso</p>
                        <div className="rounded-lg border border-[color:var(--rxv-border)] bg-[#0f1f11] p-2">
                          <svg viewBox="0 0 360 120" className="h-[120px] w-full">
                            <rect x="0" y="0" width="360" height="120" fill="transparent" />
                            <line x1="20" y1="100" x2="340" y2="100" stroke="rgba(151,206,141,0.25)" strokeWidth="1" />
                            {weightLine ? (
                              <path d={weightLine} fill="none" stroke="#61eb48" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                            ) : (
                              <text x="20" y="60" fill="rgba(151,206,141,0.72)" fontSize="12">
                                Sem dados de peso para plotar.
                              </text>
                            )}
                          </svg>
                        </div>
                        <div className="mt-2 space-y-1 text-xs text-[color:var(--rxv-muted)]">
                          {sortedWeightHistory.length === 0 ? (
                            <p>Nenhum peso registrado.</p>
                          ) : (
                            sortedWeightHistory.slice(-6).map((entry) => (
                              <p key={entry.id}>
                                {formatDate(entry.date)} - {formatWeight(entry.weightKg)}
                              </p>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] p-3">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[color:var(--rxv-muted)]">Relatório do paciente</p>
                        <div className="space-y-3 text-sm">
                          <div className="rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-2">
                            <p className="text-xs font-semibold text-[color:var(--rxv-muted)]">Identificação</p>
                            <p>Espécie: {animal.species || '-'}</p>
                            <p>Raça: {animal.breed || '-'}</p>
                            <p>Pelagem: {animal.coat || '-'}</p>
                          </div>
                          <div className="rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-2">
                            <p className="text-xs font-semibold text-[color:var(--rxv-muted)]">Anamnese</p>
                            <p>{animal.anamnesis?.trim() || 'Sem anamnese registrada.'}</p>
                          </div>
                          <div className="rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-2">
                            <p className="text-xs font-semibold text-[color:var(--rxv-muted)]">Observações (tutor + paciente)</p>
                            <p>Tutor: {draft.notes?.trim() || '-'}</p>
                            <p>Paciente: {animal.notes?.trim() || '-'}</p>
                          </div>
                          <div className="rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-2">
                            <p className="mb-1 text-xs font-semibold text-[color:var(--rxv-muted)]">Receitas já emitidas</p>
                            {historyEntries.length === 0 ? (
                              <p className="text-xs text-[color:var(--rxv-muted)]">Nenhuma receita encontrada para este paciente.</p>
                            ) : (
                              <ul className="space-y-1 text-xs">
                                {historyEntries.map((entry) => (
                                  <li key={entry.id} className="flex items-center justify-between gap-2 rounded border border-[color:var(--rxv-border)] px-2 py-1">
                                    <span>{formatDate(entry.createdAt)}</span>
                                    <span className="font-semibold text-[#8de976]">#{entry.prescriptionId.slice(-8)}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        </main>
      </div>

      {toast ? (
        <div className="fixed bottom-6 right-6 z-[120] rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] px-4 py-3 text-sm font-semibold text-[#67e952]">
          {toast}
        </div>
      ) : null}
    </ReceituarioChrome>
  )
}


