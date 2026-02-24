import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReceituarioChrome from './ReceituarioChrome'
import HelpConceptButton from './HelpConceptButton'
import { createDefaultItem, createDefaultPrescriptionState } from './rxDefaults'
import { buildCalculationMemory, calculateMedicationQuantity } from './rxRenderer'
import { resolveRxDataSource } from './adapters'
import {
  CatalogDrug,
  RxDatabase,
  RxProtocol,
  RxProtocolFolder,
  createEmptyProtocol,
  createProtocolFolder,
  loadRxDb,
  removeProtocol,
  removeProtocolFolder,
  saveRxDb,
  upsertProtocol,
  upsertProtocolFolder,
} from './rxDb'
import { RouteGroup } from './rxTypes'
import { useClinic } from '../../src/components/ClinicProvider'
import { supabase } from '../../src/lib/supabaseClient'
import { isUuid } from '@/src/lib/isUuid'
import {
  createFolder as sbCreateFolder,
  deleteProtocol as sbDeleteProtocol,
  listFolders as sbListFolders,
  listProtocols as sbListProtocols,
  loadProtocolBundle as sbLoadProtocolBundle,
  saveProtocolBundle as sbSaveProtocolBundle,
  type ProtocolBundle,
  type ProtocolMedicationItem,
} from '@/src/lib/protocols/protocolsRepo'

const ROUTE_OPTIONS: RouteGroup[] = ['ORAL', 'OTOLOGICO', 'OFTALMICO', 'TOPICO', 'INTRANASAL', 'RETAL', 'SC', 'IM', 'IV', 'INALATORIO', 'TRANSDERMICO', 'OUTROS']
const PRESENTATION_OPTIONS = ['Comprimido', 'Cápsula', 'Solução oral', 'Suspensão oral', 'Gotas', 'Injetável', 'Ampola', 'Pomada']
const DOSE_UNIT_OPTIONS = ['mg/kg', 'mcg/kg', 'g/kg', 'mL/kg', 'UI/kg', 'comprimido/kg', 'gota/kg', 'mg', 'mL', 'comprimido', 'gota', 'cápsula']
const CONCENTRATION_UNIT_OPTIONS = ['mg/mL', 'mg/comprimido', 'mg/cápsula', 'mcg/mL', 'UI/mL', 'g/mL', '%']
const DEFAULT_CONCENTRATION_UNIT = CONCENTRATION_UNIT_OPTIONS[0]

const COMMON_EXAMS = [
  'Hemograma completo',
  'Bioquímica sérica',
  'Urinálise',
  'Urocultura',
  'Citologia',
  'Ultrassonografia abdominal',
  'Biópsia lesional',
  'Biópsia tumoral',
  'Tomografia',
  'Ressonância magnética',
  'Ecocardiograma',
  'Eletrocardiograma',
  'Rinoscopia',
  'Endoscopia',
  'Otoscopia',
]

function cloneProtocol(protocol: RxProtocol): RxProtocol {
  const cloned = JSON.parse(JSON.stringify(protocol)) as RxProtocol
  return {
    ...cloned,
    examReasons: Array.isArray(cloned.examReasons) ? cloned.examReasons : [],
  }
}

function orderFolders(folders: RxProtocolFolder[]) {
  return [...folders].sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))
}

function itemFromDrug(drug: CatalogDrug, presentationId?: string) {
  const base = createDefaultItem('medication', drug.routeGroup)
  const presentation = drug.presentations.find((entry) => entry.id === presentationId) || drug.presentations[0]
  return {
    ...base,
    catalogDrugId: drug.id,
    controlled: !!drug.controlled,
    name: drug.name,
    presentation: presentation?.name || 'Comprimido',
    concentration: presentation?.concentration || '',
    commercialName: presentation?.commercialName || '',
    doseUnit: drug.doseUnit || 'mg/kg',
    pharmacyType: drug.pharmacyType,
  }
}

function toNumber(raw: string): number | null {
  const normalized = raw.replace(',', '.').trim()
  if (!normalized) return null
  const parsed = Number(normalized)
  if (Number.isNaN(parsed)) return null
  return parsed
}

function simulationGaugePercent(value: number | null): number {
  if (value === null || !Number.isFinite(value) || value <= 0) return 10
  const normalized = Math.log10(value + 1) / Math.log10(101)
  return Math.max(10, Math.min(100, Math.round(normalized * 100)))
}

function joinConcentration(value: string, unit: string): string {
  const normalizedValue = value.trim()
  const normalizedUnit = unit.trim()
  if (!normalizedValue) return ''
  return normalizedUnit ? `${normalizedValue} ${normalizedUnit}` : normalizedValue
}

function splitConcentration(raw: string): { value: string; unit: string } {
  const normalized = raw.trim()
  if (!normalized) return { value: '', unit: DEFAULT_CONCENTRATION_UNIT }
  const foundUnit = CONCENTRATION_UNIT_OPTIONS.find((unit) =>
    normalized.toLowerCase().endsWith(unit.toLowerCase())
  )
  if (!foundUnit) {
    return { value: normalized, unit: DEFAULT_CONCENTRATION_UNIT }
  }
  const value = normalized.slice(0, normalized.length - foundUnit.length).trim()
  return {
    value,
    unit: foundUnit,
  }
}

function createManualProtocolItemDraft(): RxProtocol['items'][number] {
  const base = createDefaultItem('medication', 'ORAL')
  return {
    ...base,
    name: '',
    presentation: '',
    concentration: '',
    doseValue: '',
    doseUnit: 'mg/kg',
    durationDays: '',
    frequencyType: 'timesPerDay',
    timesPerDay: '',
    everyHours: '',
    instruction: '',
    observations: '',
    controlled: false,
  }
}

const RXV_PROTOCOL_SNAPSHOT_KEY = 'receituario-vet:protocol-snapshot-to-import'

function safeRouteGroup(value: unknown): RouteGroup {
  const raw = String(value || '').trim().toUpperCase()
  if (
    raw === 'ORAL' ||
    raw === 'OTOLOGICO' ||
    raw === 'OFTALMICO' ||
    raw === 'TOPICO' ||
    raw === 'INTRANASAL' ||
    raw === 'RETAL' ||
    raw === 'SC' ||
    raw === 'IM' ||
    raw === 'IV' ||
    raw === 'INALATORIO' ||
    raw === 'TRANSDERMICO' ||
    raw === 'OUTROS'
  ) {
    return raw as RouteGroup
  }
  return 'ORAL'
}

function normalizeExamKey(label: string, idx: number) {
  const base = String(label || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
  return (base || `exam_${idx + 1}`).slice(0, 64)
}

function emptyProtocolDraft(folderId: string): RxProtocol {
  const now = new Date().toISOString()
  return {
    id: '',
    name: '',
    summary: '',
    folderId,
    requiresSpecialControl: false,
    species: 'Geral',
    active: true,
    tags: [],
    durationLabel: '',
    items: [],
    recommendations: [],
    exams: [],
    examReasons: [],
    createdAt: now,
    updatedAt: now,
  }
}

function mapBundleToRxProtocol(bundle: ProtocolBundle, fallbackFolderId: string): RxProtocol {
  const protocol = bundle.protocol
  const now = new Date().toISOString()

  const items = (bundle.medications || []).map((m, idx) => {
    const base = createDefaultItem('medication', safeRouteGroup(m.route))
    const name = String(m.manual_medication_name || m.medication_name || '').trim()
    const presentation = String(m.manual_presentation_label || m.presentation_text || '').trim()

    const frequencyType: RxProtocol['items'][number]['frequencyType'] =
      m.frequency_type === 'interval_hours' ? 'everyHours' : 'timesPerDay'
    const timesPerDay =
      m.frequency_type === 'once_daily'
        ? '1'
        : m.times_per_day !== null && m.times_per_day !== undefined
          ? String(m.times_per_day)
          : ''
    const everyHours =
      m.interval_hours !== null && m.interval_hours !== undefined ? String(m.interval_hours) : ''

    const instruction = String(m.instructions || '').trim()

    return {
      ...base,
      name,
      presentation,
      concentration: '',
      doseValue: m.dose_value !== null && m.dose_value !== undefined ? String(m.dose_value) : '',
      doseUnit: String(m.dose_unit || base.doseUnit || 'mg/kg'),
      routeGroup: safeRouteGroup(m.route),
      durationDays: m.duration_days !== null && m.duration_days !== undefined ? String(m.duration_days) : '',
      frequencyType,
      timesPerDay,
      everyHours,
      instruction,
      observations: '',
      controlled: false,
      createdAt: now,
      updatedAt: now,
    }
  })

  const recommendations = (bundle.recommendations || [])
    .map((r) => String(r.recommendation_text || '').trim())
    .filter(Boolean)

  const exams = (bundle.exam_items || []).map((e) => String(e.exam_label || '').trim()).filter(Boolean)
  const examReasons = (bundle.exam_items || [])
    .map((e) => String(e.justification || '').trim())
    .filter(Boolean)

  return {
    id: protocol.id,
    name: String(protocol.name || '').trim(),
    summary: String(protocol.description || ''),
    folderId: protocol.folder_id || fallbackFolderId,
    requiresSpecialControl: false,
    species: (String(protocol.target_species || '').trim() as RxProtocol['species']) || 'Geral',
    active: protocol.is_active !== false,
    tags: [],
    durationLabel: '',
    items,
    recommendations,
    exams,
    examReasons,
    createdAt: protocol.created_at || now,
    updatedAt: protocol.updated_at || protocol.created_at || now,
  }
}

function mapRxItemToProtocolMedication(item: RxProtocol['items'][number], idx: number): ProtocolMedicationItem {
  const manualName = String(item.name || '').trim()
  const manualPresentation = String(item.presentation || '').trim()

  return {
    medication_id: null,
    medication_name: '',
    presentation_id: null,
    presentation_text: '',
    manual_medication_name: manualName || null,
    manual_presentation_label: manualPresentation || null,
    dose_value: toNumber(item.doseValue),
    dose_unit: String(item.doseUnit || '').trim() || null,
    route: String(item.routeGroup || '').trim() || null,
    frequency_type: item.frequencyType === 'everyHours' ? 'interval_hours' : 'times_per_day',
    times_per_day: toNumber(item.timesPerDay),
    interval_hours: toNumber(item.everyHours),
    duration_days: toNumber(item.durationDays),
    instructions: String(item.instruction || '').trim() || null,
    sort_order: idx,
  }
}

export default function ProtocolosPage() {
  const navigate = useNavigate()
  const { clinicId } = useClinic()
  const rxDataSource = useMemo(() => resolveRxDataSource(import.meta.env.VITE_RX_DATA_SOURCE), [])
  const supabaseMode = rxDataSource === 'supabase'
  const [sbUserId, setSbUserId] = useState<string | null>(null)
  const [sbLoading, setSbLoading] = useState(false)
  const initialDb = useMemo(() => loadRxDb(), [])
  const [protocols, setProtocols] = useState<RxProtocol[]>(initialDb.protocols)
  const [folders, setFolders] = useState<RxProtocolFolder[]>(orderFolders(initialDb.protocolFolders))
  const [selectedFolderId, setSelectedFolderId] = useState('all')
  const [selectedProtocolId, setSelectedProtocolId] = useState(initialDb.protocols[0]?.id || '')
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState(false)
  const [folderModalOpen, setFolderModalOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [newFolderColor, setNewFolderColor] = useState('#39ff14')
  const [customExamDraft, setCustomExamDraft] = useState('')
  const [examReasonDraft, setExamReasonDraft] = useState('')
  const [selectedDrugId, setSelectedDrugId] = useState(initialDb.catalog[0]?.id || '')
  const [selectedDrugPresentationId, setSelectedDrugPresentationId] = useState(initialDb.catalog[0]?.presentations[0]?.id || '')
  const [addItemModalOpen, setAddItemModalOpen] = useState(false)
  const [addItemMode, setAddItemMode] = useState<'catalogo' | 'manual'>('catalogo')
  const [manualItemDraft, setManualItemDraft] = useState(() => createManualProtocolItemDraft())
  const [manualConcentrationValue, setManualConcentrationValue] = useState('')
  const [manualConcentrationUnit, setManualConcentrationUnit] = useState(DEFAULT_CONCENTRATION_UNIT)
  const [simulationWeightKg, setSimulationWeightKg] = useState(10)
  const [simulationWeightInput, setSimulationWeightInput] = useState('10')
  const [draft, setDraft] = useState<RxProtocol>(() => initialDb.protocols[0] ? cloneProtocol(initialDb.protocols[0]) : createEmptyProtocol(initialDb.protocolFolders[0]?.id))

  const folderMap = useMemo(() => {
    const map = new Map<string, RxProtocolFolder>()
    folders.forEach((folder) => map.set(folder.id, folder))
    return map
  }, [folders])

  const visibleProtocols = useMemo(() => {
    return [...protocols]
      .filter((protocol) => selectedFolderId === 'all' || protocol.folderId === selectedFolderId)
      .filter((protocol) => `${protocol.name} ${protocol.summary}`.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  }, [protocols, selectedFolderId, search])

  const selectedDrug = useMemo(
    () => initialDb.catalog.find((entry) => entry.id === selectedDrugId) || null,
    [initialDb.catalog, selectedDrugId]
  )
  const selectedDrugPresentation = useMemo(
    () => selectedDrug?.presentations.find((entry) => entry.id === selectedDrugPresentationId) || selectedDrug?.presentations[0] || null,
    [selectedDrug, selectedDrugPresentationId]
  )

  useEffect(() => {
    if (!selectedDrug) return
    const exists = selectedDrug.presentations.some((entry) => entry.id === selectedDrugPresentationId)
    if (!exists) {
      setSelectedDrugPresentationId(selectedDrug.presentations[0]?.id || '')
    }
  }, [selectedDrug, selectedDrugPresentationId])

  useEffect(() => {
    if (!supabaseMode) return
    const targetClinicId = String(clinicId || '').trim()
    if (!targetClinicId) return

    let cancelled = false
    setSbLoading(true)

    void (async () => {
      const { data, error } = await supabase.auth.getUser()
      if (cancelled) return
      if (error || !data.user?.id) {
        setSbUserId(null)
        return
      }
      const userId = data.user.id
      setSbUserId(userId)

      let sbFolders = await sbListFolders(targetClinicId, userId)
      if (sbFolders.length === 0) {
        await sbCreateFolder(targetClinicId, userId, { name: 'Geral', icon_key: 'folder', sort_order: 0 })
        sbFolders = await sbListFolders(targetClinicId, userId)
      }

      const mappedFolders: RxProtocolFolder[] = sbFolders.map((folder) => ({
        id: folder.id,
        name: folder.name,
        color: '#39ff14',
        icon: folder.icon_key || 'folder',
        sortOrder: folder.sort_order || 0,
      }))

      const orderedFolders = orderFolders(mappedFolders)
      const fallbackFolderId = orderedFolders[0]?.id || ''
      setFolders(orderedFolders)

      const sbProtocols = await sbListProtocols(targetClinicId, userId)
      const mappedProtocols: RxProtocol[] = sbProtocols.map((p) => ({
        id: p.id,
        name: p.name,
        summary: p.description || '',
        folderId: p.folder_id || fallbackFolderId,
        requiresSpecialControl: false,
        species: (String(p.target_species || '').trim() as RxProtocol['species']) || 'Geral',
        active: p.is_active !== false,
        tags: [],
        durationLabel: '',
        items: [],
        recommendations: [],
        exams: [],
        examReasons: [],
        createdAt: p.created_at,
        updatedAt: p.updated_at || p.created_at,
      }))

      setProtocols(mappedProtocols)

      const initialId = mappedProtocols[0]?.id || ''
      setSelectedProtocolId(initialId)
      if (initialId && isUuid(initialId)) {
        const bundle = await sbLoadProtocolBundle(targetClinicId, userId, initialId)
        if (bundle) {
          const full = mapBundleToRxProtocol(bundle, fallbackFolderId)
          setDraft(full)
          setProtocols((prev) => prev.map((entry) => (entry.id === full.id ? full : entry)))
          return
        }
      }

      if (fallbackFolderId) {
        setDraft(emptyProtocolDraft(fallbackFolderId))
        return
      }
    })()
      .catch((err) => {
        if (cancelled) return
        const message = err instanceof Error ? err.message : 'Falha ao carregar protocolos do Supabase.'
        alert(message)
      })
      .finally(() => {
        if (cancelled) return
        setSbLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [supabaseMode, clinicId])

  const writeDb = (nextDb: RxDatabase) => {
    if (supabaseMode) return
    saveRxDb(nextDb)
    setProtocols(nextDb.protocols)
    setFolders(orderFolders(nextDb.protocolFolders))
  }

  const pushSaved = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  const selectProtocol = async (protocol: RxProtocol) => {
    setSelectedProtocolId(protocol.id)

    if (!supabaseMode) {
      setDraft(cloneProtocol(protocol))
      return
    }

    const targetClinicId = String(clinicId || '').trim()
    const userId = String(sbUserId || '').trim()
    if (!targetClinicId || !userId || !isUuid(protocol.id)) {
      setDraft(cloneProtocol(protocol))
      return
    }

    setSbLoading(true)
    try {
      const bundle = await sbLoadProtocolBundle(targetClinicId, userId, protocol.id)
      if (!bundle) {
        setDraft(cloneProtocol(protocol))
        return
      }
      const fallbackFolderId = folders[0]?.id || protocol.folderId
      const full = mapBundleToRxProtocol(bundle, fallbackFolderId)
      setDraft(full)
      setProtocols((prev) => prev.map((entry) => (entry.id === full.id ? full : entry)))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao carregar protocolo.'
      alert(message)
      setDraft(cloneProtocol(protocol))
    } finally {
      setSbLoading(false)
    }
  }

  const saveDraft = async () => {
    const normalizedFolderId = folderMap.has(draft.folderId)
      ? draft.folderId
      : folders[0]?.id || draft.folderId

    if (!supabaseMode) {
      const base = loadRxDb()
      const nextDb = upsertProtocol(base, {
        ...draft,
        folderId: normalizedFolderId,
        tags: draft.tags.filter(Boolean),
        recommendations: draft.recommendations.filter(Boolean),
        exams: draft.exams.filter(Boolean),
        examReasons: draft.examReasons.filter(Boolean),
      })
      writeDb(nextDb)
      setSelectedProtocolId(draft.id)
      pushSaved()
      return
    }

    const targetClinicId = String(clinicId || '').trim()
    const userId = String(sbUserId || '').trim()
    if (!targetClinicId || !userId) {
      alert('Clínica ativa ou usuário não encontrado para salvar protocolo no Supabase.')
      return
    }

    setSbLoading(true)
    try {
      const meds = draft.items.map((item, idx) => mapRxItemToProtocolMedication(item, idx))
      const recs = draft.recommendations
        .map((line, idx) => ({ recommendation_text: String(line || '').trim(), sort_order: idx }))
        .filter((r) => !!r.recommendation_text)
      const exams = draft.exams
        .map((label, idx) => ({
          exam_key: normalizeExamKey(String(label || '').trim(), idx),
          exam_label: String(label || '').trim(),
          is_custom: true,
          justification: null,
        }))
        .filter((e) => !!e.exam_label)

      const savedProtocol = await sbSaveProtocolBundle(targetClinicId, userId, {
        protocol: {
          ...(isUuid(draft.id) ? { id: draft.id } : {}),
          folder_id: normalizedFolderId || null,
          name: draft.name,
          description: draft.summary || null,
          target_species: draft.species || null,
          is_active: draft.active !== false,
        },
        medications: meds,
        recommendations: recs,
        exam_items: exams,
      })

      pushSaved()

      const refreshed = await sbListProtocols(targetClinicId, userId)
      const fallbackFolderId = folders[0]?.id || normalizedFolderId
      const mappedProtocols: RxProtocol[] = refreshed.map((p) => ({
        id: p.id,
        name: p.name,
        summary: p.description || '',
        folderId: p.folder_id || fallbackFolderId,
        requiresSpecialControl: false,
        species: (String(p.target_species || '').trim() as RxProtocol['species']) || 'Geral',
        active: p.is_active !== false,
        tags: [],
        durationLabel: '',
        items: [],
        recommendations: [],
        exams: [],
        examReasons: [],
        createdAt: p.created_at,
        updatedAt: p.updated_at || p.created_at,
      }))

      setProtocols(mappedProtocols)
      setSelectedProtocolId(savedProtocol.id)

      const bundle = await sbLoadProtocolBundle(targetClinicId, userId, savedProtocol.id)
      if (bundle) {
        const full = mapBundleToRxProtocol(bundle, fallbackFolderId)
        setDraft(full)
        setProtocols((prev) => prev.map((entry) => (entry.id === full.id ? full : entry)))
      } else {
        setDraft((prev) => ({ ...prev, id: savedProtocol.id, folderId: normalizedFolderId }))
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao salvar protocolo no Supabase.'
      alert(message)
    } finally {
      setSbLoading(false)
    }
  }

  const createProtocol = () => {
    const folderId = selectedFolderId === 'all' ? folders[0]?.id : selectedFolderId
    if (!folderId) return

    if (!supabaseMode) {
      const next = createEmptyProtocol(folderId)
      setSelectedProtocolId(next.id)
      setDraft(next)
      return
    }

    setSelectedProtocolId('')
    setDraft(emptyProtocolDraft(folderId))
  }

  const deleteProtocolDraft = async () => {
    if (!supabaseMode) {
      const nextDb = removeProtocol(loadRxDb(), draft.id)
      writeDb(nextDb)
      if (nextDb.protocols[0]) {
        setSelectedProtocolId(nextDb.protocols[0].id)
        setDraft(cloneProtocol(nextDb.protocols[0]))
        return
      }
      const empty = createEmptyProtocol(folders[0]?.id)
      setSelectedProtocolId(empty.id)
      setDraft(empty)
      return
    }

    const targetClinicId = String(clinicId || '').trim()
    const userId = String(sbUserId || '').trim()
    if (!targetClinicId || !userId) {
      alert('Clínica ativa ou usuário não encontrado.')
      return
    }

    if (!isUuid(draft.id)) {
      setSelectedProtocolId('')
      setDraft(emptyProtocolDraft(folders[0]?.id || draft.folderId))
      return
    }

    setSbLoading(true)
    try {
      await sbDeleteProtocol(targetClinicId, userId, draft.id)

      const refreshed = await sbListProtocols(targetClinicId, userId)
      const fallbackFolderId = folders[0]?.id || draft.folderId
      const mappedProtocols: RxProtocol[] = refreshed.map((p) => ({
        id: p.id,
        name: p.name,
        summary: p.description || '',
        folderId: p.folder_id || fallbackFolderId,
        requiresSpecialControl: false,
        species: (String(p.target_species || '').trim() as RxProtocol['species']) || 'Geral',
        active: p.is_active !== false,
        tags: [],
        durationLabel: '',
        items: [],
        recommendations: [],
        exams: [],
        examReasons: [],
        createdAt: p.created_at,
        updatedAt: p.updated_at || p.created_at,
      }))
      setProtocols(mappedProtocols)

      setSelectedProtocolId('')
      setDraft(emptyProtocolDraft(fallbackFolderId))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao excluir protocolo.'
      alert(message)
    } finally {
      setSbLoading(false)
    }
  }

  const addItemFromCatalog = () => {
    const drug = initialDb.catalog.find((entry) => entry.id === selectedDrugId)
    if (!drug) return
    setDraft((prev) => ({
      ...prev,
      requiresSpecialControl: prev.requiresSpecialControl || !!drug.controlled,
      items: [...prev.items, itemFromDrug(drug, selectedDrugPresentationId)],
    }))
    setAddItemModalOpen(false)
  }

  const addManualItem = () => {
    if (!manualItemDraft.name.trim()) return
    const fresh = createDefaultItem('medication')
    const concentration = joinConcentration(manualConcentrationValue, manualConcentrationUnit)
    setDraft((prev) => ({
      ...prev,
      requiresSpecialControl: prev.requiresSpecialControl || !!manualItemDraft.controlled,
      items: [
        ...prev.items,
        {
          ...manualItemDraft,
          concentration,
          id: fresh.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    }))
    setManualItemDraft(createManualProtocolItemDraft())
    setManualConcentrationValue('')
    setManualConcentrationUnit(DEFAULT_CONCENTRATION_UNIT)
    setAddItemModalOpen(false)
  }

  const openAddItemModal = () => {
    setAddItemMode('catalogo')
    setManualItemDraft(createManualProtocolItemDraft())
    setManualConcentrationValue('')
    setManualConcentrationUnit(DEFAULT_CONCENTRATION_UNIT)
    setAddItemModalOpen(true)
  }

  const updateItem = (index: number, patch: Partial<RxProtocol['items'][number]>) => {
    setDraft((prev) => ({ ...prev, items: prev.items.map((item, i) => (i === index ? { ...item, ...patch } : item)) }))
  }

  const addFolder = async () => {
    const name = newFolderName.trim()
    if (!name) return

    if (!supabaseMode) {
      const nextDb = upsertProtocolFolder(loadRxDb(), createProtocolFolder(name, newFolderColor))
      writeDb(nextDb)
      setNewFolderName('')
      setNewFolderColor('#39ff14')
      return
    }

    const targetClinicId = String(clinicId || '').trim()
    const userId = String(sbUserId || '').trim()
    if (!targetClinicId || !userId) {
      alert('Clínica ativa ou usuário não encontrado.')
      return
    }

    setSbLoading(true)
    try {
      await sbCreateFolder(targetClinicId, userId, { name, icon_key: 'folder', sort_order: 0 })
      const sbFolders = await sbListFolders(targetClinicId, userId)
      const mappedFolders: RxProtocolFolder[] = sbFolders.map((folder) => ({
        id: folder.id,
        name: folder.name,
        color: '#39ff14',
        icon: folder.icon_key || 'folder',
        sortOrder: folder.sort_order || 0,
      }))
      setFolders(orderFolders(mappedFolders))
      setNewFolderName('')
      setNewFolderColor('#39ff14')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao criar pasta.'
      alert(message)
    } finally {
      setSbLoading(false)
    }
  }

  const dropFolder = (folderId: string) => {
    if (supabaseMode) {
      alert('Exclusão de pasta ainda não está habilitada no modo Supabase.')
      return
    }
    const nextDb = removeProtocolFolder(loadRxDb(), folderId)
    writeDb(nextDb)
    if (selectedFolderId === folderId) setSelectedFolderId('all')
    if (draft.folderId === folderId && nextDb.protocolFolders[0]) {
      setDraft((prev) => ({ ...prev, folderId: nextDb.protocolFolders[0].id }))
    }
  }

  const onSimulationWeightSlider = (value: number) => {
    const safe = Math.min(120, Math.max(1, value))
    setSimulationWeightKg(safe)
    setSimulationWeightInput(String(safe))
  }

  const onSimulationWeightInputChange = (raw: string) => {
    setSimulationWeightInput(raw)
    const parsed = toNumber(raw)
    if (parsed && parsed > 0) {
      setSimulationWeightKg(Math.min(120, Math.max(1, Math.round(parsed))))
    }
  }

  const onSimulationWeightInputBlur = () => {
    const parsed = toNumber(simulationWeightInput)
    if (!parsed || parsed <= 0) {
      setSimulationWeightInput(String(simulationWeightKg))
      return
    }
    const safe = Math.min(120, Math.max(1, parsed))
    setSimulationWeightKg(Math.round(safe))
    setSimulationWeightInput(String(Number(safe.toFixed(2))))
  }

  const simulationState = useMemo(() => {
    const base = createDefaultPrescriptionState()
    return {
      ...base,
      patient: {
        ...base.patient,
        weightKg: simulationWeightInput || String(simulationWeightKg),
      },
    }
  }, [simulationWeightInput, simulationWeightKg])

  const applyInNewRecipe = () => {
    // Snapshot (sem link vivo)
    try {
      sessionStorage.setItem(RXV_PROTOCOL_SNAPSHOT_KEY, JSON.stringify(draft))
    } catch {
      // noop
    }
    navigate('/receituario-vet/nova-receita')
  }

  return (
    <ReceituarioChrome
      section="protocolos"
      title="Protocolos e Modelos"
      subtitle="Gerencie modelos prontos, vinculados ao catálogo de fármacos, e importe direto na receita."
      actions={
        <>
          <Link className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm" to="/receituario-vet/nova-receita">
            <span className="material-symbols-outlined text-[18px]">description</span>
            Nova Receita
          </Link>
          <button type="button" className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm" onClick={createProtocol}>
            <span className="material-symbols-outlined text-[18px]">add</span>
            Novo Protocolo
          </button>
          <button type="button" className="rxv-btn-primary inline-flex items-center gap-2 px-3 py-2 text-sm" onClick={saveDraft}>
            <span className="material-symbols-outlined text-[18px]">save</span>
            Salvar
          </button>
        </>
      }
    >
      <div className="rxv-protocol-layout grid grid-cols-1 gap-6 xl:grid-cols-12">
        <aside className="rxv-card rxv-protocol-glass rxv-protocol-rail p-4 xl:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wide text-[color:var(--rxv-muted)]">Pastas</h3>
            <button type="button" className="rxv-btn-secondary px-2 py-1 text-xs" onClick={() => setFolderModalOpen(true)}>Gerenciar</button>
          </div>
          <div className="mb-3 grid grid-cols-1 gap-2">
            <button type="button" className={`rxv-protocol-chip rounded-lg border px-3 py-2 text-left text-xs font-semibold ${selectedFolderId === 'all' ? 'border-[#39ff14]/50 bg-[#39ff14]/12' : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]'}`} onClick={() => setSelectedFolderId('all')}>
              Todos
            </button>
            {folders.map((folder) => (
              <button key={folder.id} type="button" className={`rxv-protocol-chip rounded-lg border px-3 py-2 text-left text-xs font-semibold ${selectedFolderId === folder.id ? 'border-[#39ff14]/50 bg-[#39ff14]/12' : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]'}`} onClick={() => setSelectedFolderId(folder.id)}>
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[15px]" style={{ color: folder.color }}>{folder.icon}</span>
                  {folder.name}
                </span>
              </button>
            ))}
          </div>
          <input className="rxv-protocol-search mb-3 w-full rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-2 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar protocolo..." />
          <div className="max-h-[58vh] space-y-2 overflow-y-auto pr-1">
            {visibleProtocols.map((protocol) => (
              <button key={protocol.id} type="button" className={`rxv-protocol-list-item w-full rounded-xl border px-3 py-2 text-left ${selectedProtocolId === protocol.id ? 'border-[#5de747]/50 bg-[#5de747]/10' : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/70'}`} onClick={() => selectProtocol(protocol)}>
                <p className="text-sm font-bold">{protocol.name}</p>
                <p className="text-xs text-[color:var(--rxv-muted)]">{protocol.items.length} fármacos - {protocol.durationLabel || 'duração livre'}</p>
                {protocol.requiresSpecialControl ? (
                  <p className="mt-1 inline-flex rounded border border-amber-500/50 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    CONTROLE ESPECIAL
                  </p>
                ) : null}
              </button>
            ))}
          </div>
        </aside>

        <main className="space-y-6 xl:col-span-6 rxv-protocol-main rxv-protocol-form">
          <section className="rxv-card rxv-protocol-glass p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">Dados do Protocolo</h2>
              <button type="button" className="rounded border border-red-800/70 px-3 py-1 text-xs text-red-300 hover:bg-red-950/40" onClick={deleteProtocolDraft}>Excluir</button>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 rxv-protocol-drug-fields">
              <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)] md:col-span-2">Nome
                <input className="mt-1 w-full px-3 py-2" value={draft.name} onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))} />
              </label>
              <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)] md:col-span-2">Descrição
                <textarea className="mt-1 w-full px-3 py-2" rows={2} value={draft.summary} onChange={(e) => setDraft((prev) => ({ ...prev, summary: e.target.value }))} />
              </label>
              <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">Pasta
                <select className="mt-1 w-full px-3 py-2" value={draft.folderId} onChange={(e) => setDraft((prev) => ({ ...prev, folderId: e.target.value }))}>
                  {folders.map((folder) => <option key={folder.id} value={folder.id}>{folder.name}</option>)}
                </select>
              </label>
              <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">Espécie
                <select className="mt-1 w-full px-3 py-2" value={draft.species} onChange={(e) => setDraft((prev) => ({ ...prev, species: e.target.value as RxProtocol['species'] }))}>
                  <option value="Caes">Cães</option><option value="Gatos">Gatos</option><option value="Geral">Geral</option>
                </select>
              </label>
              <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">Duração resumida
                <input className="mt-1 w-full px-3 py-2" value={draft.durationLabel} onChange={(e) => setDraft((prev) => ({ ...prev, durationLabel: e.target.value }))} placeholder="Ex.: 7 dias" />
              </label>
              <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">Tags (vírgula)
                <input className="mt-1 w-full px-3 py-2" value={draft.tags.join(', ')} onChange={(e) => setDraft((prev) => ({ ...prev, tags: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) }))} />
              </label>
              <label className="flex items-center gap-2 text-xs text-[color:var(--rxv-muted)] md:col-span-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded"
                  checked={draft.requiresSpecialControl}
                  onChange={(e) => setDraft((prev) => ({ ...prev, requiresSpecialControl: e.target.checked }))}
                />
                Protocolo de controle especial (gera receita especial quando aplicado)
              </label>
            </div>
          </section>

          <section className="rxv-card rxv-protocol-glass p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-bold">Fármacos do Protocolo</h2>
              <button type="button" className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-1.5 text-xs" onClick={openAddItemModal}>
                <span className="material-symbols-outlined text-[16px]">add</span>
                Adicionar medicamento
              </button>
            </div>
            <div className="rxv-protocol-order-hint mb-3 rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/70 px-3 py-2 text-xs text-[color:var(--rxv-muted)]">
              Ordem de preenchimento: Nome + apresentação · Concentração (valor + unidade) · Dose (valor + unidade) · Via + duração · Frequência + vezes ao dia/intervalo.
            </div>
            <div className="space-y-2 rxv-protocol-drug-fields">
              {draft.items.map((item, idx) => {
                const concentrationParts = splitConcentration(item.concentration)
                return (
                  <div key={item.id} className="rxv-protocol-drug-card rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/60 p-3">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-bold">Item {idx + 1}</p>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1 text-[11px] text-slate-300">
                          <input
                            type="checkbox"
                            className="h-3.5 w-3.5 rounded"
                            checked={!!item.controlled}
                            onChange={(e) => updateItem(idx, { controlled: e.target.checked })}
                          />
                          Controlado
                        </label>
                        <button type="button" className="rounded border border-red-800/70 px-2 py-1 text-[11px] text-red-300 hover:bg-red-950/40" onClick={() => setDraft((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }))}>Remover</button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <label className="rxv-protocol-field text-[11px] font-semibold uppercase tracking-wide text-[color:var(--rxv-muted)]">
                          Nome do medicamento
                          <input className="mt-1 px-2 py-1.5 text-sm" value={item.name} onChange={(e) => updateItem(idx, { name: e.target.value })} placeholder="Ex.: Amoxicilina + Clavulanato" />
                        </label>
                        <label className="rxv-protocol-field text-[11px] font-semibold uppercase tracking-wide text-[color:var(--rxv-muted)]">
                          Apresentação
                          <select className="mt-1 px-2 py-1.5 text-sm" value={item.presentation} onChange={(e) => updateItem(idx, { presentation: e.target.value })}>
                            <option value="">Selecione</option>
                            {PRESENTATION_OPTIONS.map((presentation) => <option key={presentation} value={presentation}>{presentation}</option>)}
                          </select>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <label className="rxv-protocol-field text-[11px] font-semibold uppercase tracking-wide text-[color:var(--rxv-muted)]">
                          Concentração (valor)
                          <input
                            className="mt-1 px-2 py-1.5 text-sm"
                            value={concentrationParts.value}
                            onChange={(e) => updateItem(idx, { concentration: joinConcentration(e.target.value, concentrationParts.unit) })}
                            placeholder="Ex.: 250"
                          />
                        </label>
                        <label className="rxv-protocol-field text-[11px] font-semibold uppercase tracking-wide text-[color:var(--rxv-muted)]">
                          Medida da concentração
                          <select
                            className="mt-1 px-2 py-1.5 text-sm"
                            value={concentrationParts.unit}
                            onChange={(e) => updateItem(idx, { concentration: joinConcentration(concentrationParts.value, e.target.value) })}
                          >
                            {CONCENTRATION_UNIT_OPTIONS.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                          </select>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <label className="rxv-protocol-field text-[11px] font-semibold uppercase tracking-wide text-[color:var(--rxv-muted)]">
                          Dose (valor)
                          <input className="mt-1 px-2 py-1.5 text-sm" value={item.doseValue} onChange={(e) => updateItem(idx, { doseValue: e.target.value })} placeholder="Ex.: 25" />
                        </label>
                        <label className="rxv-protocol-field text-[11px] font-semibold uppercase tracking-wide text-[color:var(--rxv-muted)]">
                          Unidade da dose
                          <select className="mt-1 px-2 py-1.5 text-sm" value={item.doseUnit} onChange={(e) => updateItem(idx, { doseUnit: e.target.value })}>
                            {DOSE_UNIT_OPTIONS.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                          </select>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <label className="rxv-protocol-field text-[11px] font-semibold uppercase tracking-wide text-[color:var(--rxv-muted)]">
                          Via
                          <select className="mt-1 px-2 py-1.5 text-sm" value={item.routeGroup} onChange={(e) => updateItem(idx, { routeGroup: e.target.value as RouteGroup })}>
                            {ROUTE_OPTIONS.map((route) => <option key={route} value={route}>{route}</option>)}
                          </select>
                        </label>
                        <label className="rxv-protocol-field text-[11px] font-semibold uppercase tracking-wide text-[color:var(--rxv-muted)]">
                          Duração (dias)
                          <input className="mt-1 px-2 py-1.5 text-sm" value={item.durationDays} onChange={(e) => updateItem(idx, { durationDays: e.target.value })} placeholder="Ex.: 7" />
                        </label>
                      </div>

                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <label className="rxv-protocol-field text-[11px] font-semibold uppercase tracking-wide text-[color:var(--rxv-muted)]">
                          Frequência
                          <select className="mt-1 px-2 py-1.5 text-sm" value={item.frequencyType} onChange={(e) => updateItem(idx, { frequencyType: e.target.value as RxProtocol['items'][number]['frequencyType'] })}>
                            <option value="timesPerDay">X vezes ao dia</option>
                            <option value="everyHours">A cada X horas</option>
                          </select>
                        </label>
                        {item.frequencyType === 'everyHours' ? (
                          <label className="rxv-protocol-field text-[11px] font-semibold uppercase tracking-wide text-[color:var(--rxv-muted)]">
                            Intervalo em horas
                            <input className="mt-1 px-2 py-1.5 text-sm" value={item.everyHours} onChange={(e) => updateItem(idx, { everyHours: e.target.value })} placeholder="Ex.: 12" />
                          </label>
                        ) : (
                          <label className="rxv-protocol-field text-[11px] font-semibold uppercase tracking-wide text-[color:var(--rxv-muted)]">
                            Vezes ao dia
                            <input className="mt-1 px-2 py-1.5 text-sm" value={item.timesPerDay} onChange={(e) => updateItem(idx, { timesPerDay: e.target.value })} placeholder="Ex.: 2" />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="rxv-card rxv-protocol-glass p-5">
            <h2 className="mb-3 text-lg font-bold">Recomendações e Exames</h2>
            <div className="space-y-2">
              {draft.recommendations.map((line, idx) => (
                <div key={`recommendation-${idx}`} className="flex gap-2">
                  <textarea rows={2} className="flex-1 px-3 py-2 text-sm" value={line} onChange={(e) => setDraft((prev) => ({ ...prev, recommendations: prev.recommendations.map((entry, i) => i === idx ? e.target.value : entry) }))} />
                  <button type="button" className="rounded border border-red-800/70 px-2 text-xs text-red-300 hover:bg-red-950/40" onClick={() => setDraft((prev) => ({ ...prev, recommendations: prev.recommendations.filter((_, i) => i !== idx) }))}>Remover</button>
                </div>
              ))}
            </div>
            <button type="button" className="mt-2 rounded border border-[color:var(--rxv-border)] px-2 py-1 text-xs" onClick={() => setDraft((prev) => ({ ...prev, recommendations: [...prev.recommendations, ''] }))}>+ Adicionar recomendação</button>
            <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
              {COMMON_EXAMS.map((exam) => (
                <label key={exam} className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 rounded" checked={draft.exams.includes(exam)} onChange={(e) => setDraft((prev) => ({ ...prev, exams: e.target.checked ? [...prev.exams, exam] : prev.exams.filter((entry) => entry !== exam) }))} />{exam}</label>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input className="flex-1 px-3 py-2 text-sm" value={customExamDraft} onChange={(e) => setCustomExamDraft(e.target.value)} placeholder="Exame personalizado" />
              <button type="button" className="rounded border border-[color:var(--rxv-border)] px-3 py-1.5 text-sm" onClick={() => { if (!customExamDraft.trim()) return; setDraft((prev) => ({ ...prev, exams: [...prev.exams, customExamDraft.trim()] })); setCustomExamDraft('') }}>Adicionar</button>
            </div>
            <div className="mt-4 space-y-2">
              {draft.examReasons.map((reason, idx) => (
                <div key={`exam-reason-${idx}`} className="flex gap-2">
                  <textarea
                    rows={2}
                    className="flex-1 px-3 py-2 text-sm"
                    value={reason}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        examReasons: prev.examReasons.map((entry, i) => (i === idx ? e.target.value : entry)),
                      }))
                    }
                    placeholder="Justificativa do exame"
                  />
                  <button
                    type="button"
                    className="rounded border border-red-800/70 px-2 text-xs text-red-300 hover:bg-red-950/40"
                    onClick={() => setDraft((prev) => ({ ...prev, examReasons: prev.examReasons.filter((_, i) => i !== idx) }))}
                  >
                    Remover
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  className="flex-1 px-3 py-2 text-sm"
                  value={examReasonDraft}
                  onChange={(e) => setExamReasonDraft(e.target.value)}
                  placeholder="Adicionar justificativa para exames sugeridos"
                />
                <button
                  type="button"
                  className="rounded border border-[color:var(--rxv-border)] px-3 py-1.5 text-sm"
                  onClick={() => {
                    if (!examReasonDraft.trim()) return
                    setDraft((prev) => ({ ...prev, examReasons: [...prev.examReasons, examReasonDraft.trim()] }))
                    setExamReasonDraft('')
                  }}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </section>
        </main>
        <aside className="space-y-4 xl:col-span-3 rxv-protocol-side">
          <section className="rxv-card rxv-protocol-glass p-5">
            <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-[color:var(--rxv-muted)]">Resumo</h3>
            <p className="text-lg font-bold">{draft.name || 'Novo Protocolo'}</p>
            <p className="text-sm text-[color:var(--rxv-muted)]">{draft.items.length} fármacos - {draft.recommendations.length} recomendações</p>
            <div className="mt-3 space-y-1 rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-2">
              {draft.items.slice(0, 6).map((item, idx) => <p key={`${item.id}-${idx}`} className="text-xs">{idx + 1}. {item.name || 'Item sem nome'}</p>)}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2">
              <button type="button" className="rxv-btn-primary px-3 py-2 text-sm" onClick={applyInNewRecipe}>Aplicar em Nova Receita</button>
              <button type="button" className="rxv-btn-secondary px-3 py-2 text-sm" onClick={saveDraft}>Salvar Protocolo</button>
            </div>
          </section>

          <section className="rxv-card rxv-protocol-glass p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#39ff14]">science</span>
              <h3 className="text-sm font-black uppercase tracking-wide text-[color:var(--rxv-muted)]">Simulação de Dose</h3>
              <HelpConceptButton
                title="Memória de cálculo da simulação"
                subtitle="Lógica completa por fármaco com base no peso informado."
                buttonLabel="Ver memória de cálculo"
                buttonClassName="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#3f6f31] bg-[#1a2f15] text-[#a8ff9a] hover:bg-[#24401d]"
              >
                <div className="space-y-4">
                  {draft.items.length === 0 ? (
                    <p className="text-sm text-slate-300">Adicione medicamentos para exibir a memória de cálculo.</p>
                  ) : (
                    draft.items.map((item, index) => (
                      <article key={`memory-${item.id}`} className="rounded-xl border border-[#376b2e] bg-[#12230f] p-4">
                        <h4 className="text-sm font-bold text-white">{index + 1}. {item.name || 'Item sem nome'}</h4>
                        <p className="text-xs text-[#97ce8d]">{item.presentation || 'Sem apresentação'} · {item.concentration || 'Sem concentração'}</p>
                        <ul className="mt-2 space-y-1 text-sm text-slate-200">
                          {buildCalculationMemory(item, simulationState).map((step, idx) => (
                            <li key={`${item.id}-step-${idx}`}>• {step}</li>
                          ))}
                        </ul>
                      </article>
                    ))
                  )}
                </div>
              </HelpConceptButton>
            </div>
            <label className="mb-3 block text-xs text-[color:var(--rxv-muted)]">
              Peso do paciente (exemplo)
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="range"
                  min={1}
                  max={60}
                  className="w-full accent-[#39ff14]"
                  value={simulationWeightKg}
                  onChange={(e) => onSimulationWeightSlider(Number(e.target.value))}
                />
                <input
                  type="number"
                  min={1}
                  max={120}
                  className="w-20 px-2 py-1 text-center text-sm"
                  value={simulationWeightInput}
                  onChange={(e) => onSimulationWeightInputChange(e.target.value)}
                  onBlur={onSimulationWeightInputBlur}
                />
              </div>
            </label>

            <div className="space-y-2">
              {draft.items.slice(0, 4).map((item) => {
                const quantity = calculateMedicationQuantity(item, simulationState)
                const gauge = simulationGaugePercent(quantity.perDose)
                const gaugeStyle = { ['--rxv-dose-gauge' as '--rxv-dose-gauge']: `${gauge}%` } as React.CSSProperties
                return (
                  <div key={`sim-${item.id}`} className="rxv-protocol-sim-card rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/60 p-3" style={gaugeStyle}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold">{item.name || 'Item sem nome'}</p>
                        <p className="text-xs text-[color:var(--rxv-muted)]">{item.presentation || 'Sem apresentação'} - {item.concentration || 'Sem concentração'}</p>
                      </div>
                      <div className="rxv-dose-meter" aria-hidden="true">
                        <span>{quantity.perDose !== null ? quantity.perDose.toFixed(1) : '--'}</span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-[#7bf069]">
                      {quantity.perDose !== null
                        ? `${quantity.perDose.toFixed(2)} ${quantity.unit || 'unidade'} por dose`
                        : 'Dose não definida'}
                    </p>
                    <p className="mt-1 text-xs text-[#9be48e]">{quantity.label}</p>
                  </div>
                )
              })}
              {draft.items.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[color:var(--rxv-border)] px-3 py-4 text-center text-xs text-[color:var(--rxv-muted)]">
                  Adicione medicamentos para ver a simulação.
                </div>
              ) : null}
            </div>
          </section>
        </aside>
      </div>

      {addItemModalOpen ? (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-8"
          onClick={() => setAddItemModalOpen(false)}
        >
          <div
            className="rxv-protocol-modal w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Adicionar medicamento ao protocolo</h3>
              <button type="button" className="rounded border border-[color:var(--rxv-border)] px-2 py-1 text-xs" onClick={() => setAddItemModalOpen(false)}>
                Fechar
              </button>
            </div>

            <div className="mb-4 inline-flex rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-1 text-sm">
              <button
                type="button"
                className={`rounded-md px-3 py-1.5 ${addItemMode === 'catalogo' ? 'bg-[color:var(--rxv-primary)] text-[#0f1d12] font-bold' : 'text-[color:var(--rxv-muted)]'}`}
                onClick={() => setAddItemMode('catalogo')}
              >
                Catálogo
              </button>
              <button
                type="button"
                className={`rounded-md px-3 py-1.5 ${addItemMode === 'manual' ? 'bg-[color:var(--rxv-primary)] text-[#0f1d12] font-bold' : 'text-[color:var(--rxv-muted)]'}`}
                onClick={() => setAddItemMode('manual')}
              >
                Manual
              </button>
            </div>

            {addItemMode === 'catalogo' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 rxv-protocol-drug-fields">
                  <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">
                    Fármaco do catálogo
                    <select
                      className="mt-1 w-full px-3 py-2"
                      value={selectedDrugId}
                      onChange={(e) => {
                        const nextDrugId = e.target.value
                        setSelectedDrugId(nextDrugId)
                        const firstPresentation = initialDb.catalog.find((entry) => entry.id === nextDrugId)?.presentations[0]?.id || ''
                        setSelectedDrugPresentationId(firstPresentation)
                      }}
                    >
                      {initialDb.catalog.map((drug) => (
                        <option key={drug.id} value={drug.id}>
                          {drug.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">
                    Apresentação
                    <select
                      className="mt-1 w-full px-3 py-2"
                      value={selectedDrugPresentationId}
                      onChange={(e) => setSelectedDrugPresentationId(e.target.value)}
                    >
                      {(selectedDrug?.presentations || []).map((presentation) => (
                        <option key={presentation.id} value={presentation.id}>
                          {(presentation.commercialName || presentation.name)} - {presentation.concentration}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/70 p-3 text-sm">
                  <p className="font-semibold">{selectedDrug?.name || 'Fármaco não selecionado'}</p>
                  <p className="text-xs text-[color:var(--rxv-muted)]">
                    {(selectedDrugPresentation?.commercialName || selectedDrugPresentation?.name || 'Apresentação não selecionada')}
                    {selectedDrugPresentation?.concentration ? ` - ${selectedDrugPresentation.concentration}` : ''}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button type="button" className="rxv-btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm" onClick={addItemFromCatalog}>
                    <span className="material-symbols-outlined text-[18px]">playlist_add</span>
                    Adicionar do catálogo
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/65 p-3 text-xs text-[color:var(--rxv-muted)]">
                  Preencha sem valores pré-definidos seguindo a ordem clínica de cadastro.
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 rxv-protocol-drug-fields">
                  <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">
                    Nome do medicamento
                    <input
                      className="mt-1 w-full px-3 py-2"
                      value={manualItemDraft.name}
                      onChange={(e) => setManualItemDraft((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex.: Dipirona Sódica"
                    />
                  </label>
                  <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">
                    Apresentação
                    <select
                      className="mt-1 w-full px-3 py-2"
                      value={manualItemDraft.presentation}
                      onChange={(e) => setManualItemDraft((prev) => ({ ...prev, presentation: e.target.value }))}
                    >
                      <option value="">Selecione</option>
                      {PRESENTATION_OPTIONS.map((presentation) => (
                        <option key={presentation} value={presentation}>
                          {presentation}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">
                    Concentração (valor)
                    <input
                      className="mt-1 w-full px-3 py-2"
                      value={manualConcentrationValue}
                      onChange={(e) => setManualConcentrationValue(e.target.value)}
                      placeholder="Ex.: 500"
                    />
                  </label>
                  <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">
                    Medida da concentração
                    <select
                      className="mt-1 w-full px-3 py-2"
                      value={manualConcentrationUnit}
                      onChange={(e) => setManualConcentrationUnit(e.target.value)}
                    >
                      {CONCENTRATION_UNIT_OPTIONS.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">
                    Dose (valor)
                    <input
                      className="mt-1 w-full px-3 py-2"
                      value={manualItemDraft.doseValue}
                      onChange={(e) => setManualItemDraft((prev) => ({ ...prev, doseValue: e.target.value }))}
                      placeholder="Ex.: 25"
                    />
                  </label>
                  <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">
                    Unidade da dose
                    <select
                      className="mt-1 w-full px-3 py-2"
                      value={manualItemDraft.doseUnit}
                      onChange={(e) => setManualItemDraft((prev) => ({ ...prev, doseUnit: e.target.value }))}
                    >
                      {DOSE_UNIT_OPTIONS.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">
                    Via
                    <select
                      className="mt-1 w-full px-3 py-2"
                      value={manualItemDraft.routeGroup}
                      onChange={(e) => setManualItemDraft((prev) => ({ ...prev, routeGroup: e.target.value as RouteGroup }))}
                    >
                      {ROUTE_OPTIONS.map((route) => (
                        <option key={route} value={route}>
                          {route}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">
                    Duração (dias)
                    <input
                      className="mt-1 w-full px-3 py-2"
                      value={manualItemDraft.durationDays}
                      onChange={(e) => setManualItemDraft((prev) => ({ ...prev, durationDays: e.target.value }))}
                      placeholder="Ex.: 7"
                    />
                  </label>

                  <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">
                    Frequência
                    <select
                      className="mt-1 w-full px-3 py-2"
                      value={manualItemDraft.frequencyType}
                      onChange={(e) =>
                        setManualItemDraft((prev) => ({ ...prev, frequencyType: e.target.value as RxProtocol['items'][number]['frequencyType'] }))
                      }
                    >
                      <option value="timesPerDay">X vezes ao dia</option>
                      <option value="everyHours">A cada X horas</option>
                    </select>
                  </label>
                  {manualItemDraft.frequencyType === 'everyHours' ? (
                    <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">
                      Intervalo (horas)
                      <input
                        className="mt-1 w-full px-3 py-2"
                        value={manualItemDraft.everyHours}
                        onChange={(e) => setManualItemDraft((prev) => ({ ...prev, everyHours: e.target.value }))}
                        placeholder="Ex.: 12"
                      />
                    </label>
                  ) : (
                    <label className="rxv-protocol-field text-xs text-[color:var(--rxv-muted)]">
                      Vezes ao dia
                      <input
                        className="mt-1 w-full px-3 py-2"
                        value={manualItemDraft.timesPerDay}
                        onChange={(e) => setManualItemDraft((prev) => ({ ...prev, timesPerDay: e.target.value }))}
                        placeholder="Ex.: 2"
                      />
                    </label>
                  )}

                  <label className="flex items-center gap-2 text-xs text-[color:var(--rxv-muted)] md:col-span-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded"
                      checked={!!manualItemDraft.controlled}
                      onChange={(e) => setManualItemDraft((prev) => ({ ...prev, controlled: e.target.checked }))}
                    />
                    Marcar medicamento como controlado
                  </label>
                </div>

                <div className="flex justify-end">
                  <button type="button" className="rxv-btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm" onClick={addManualItem}>
                    <span className="material-symbols-outlined text-[18px]">playlist_add</span>
                    Adicionar manualmente
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {folderModalOpen ? (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-8"
          onClick={() => setFolderModalOpen(false)}
        >
          <div
            className="rxv-protocol-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Gerenciar Pastas</h3>
              <button type="button" className="rounded border border-[color:var(--rxv-border)] px-2 py-1 text-xs" onClick={() => setFolderModalOpen(false)}>Fechar</button>
            </div>
            <div className="mb-4 space-y-2">
              {folders.map((folder) => (
                <div key={folder.id} className="flex items-center justify-between rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-2">
                  <span className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-[15px]" style={{ color: folder.color }}>{folder.icon}</span>{folder.name}</span>
                  <button
                    type="button"
                    className="rounded border border-red-800/70 px-2 py-1 text-xs text-red-300"
                    onClick={() => dropFolder(folder.id)}
                    disabled={supabaseMode || folders.length <= 1}
                    title={supabaseMode ? 'Exclusão de pasta indisponível no modo Supabase.' : ''}
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-3">
              <h4 className="mb-2 text-sm font-bold">Nova pasta personalizada</h4>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_130px_auto]">
                <input value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} className="px-3 py-2 text-sm" placeholder="Nome da pasta" />
                <input type="color" value={newFolderColor} onChange={(e) => setNewFolderColor(e.target.value)} className="h-10 w-full rounded border border-[color:var(--rxv-border)] bg-transparent p-1" />
                <button type="button" className="rxv-btn-primary px-3 py-2 text-sm" onClick={addFolder}>Criar</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {saved ? (
        <div className="fixed bottom-6 right-6 z-[120] rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] px-4 py-3 text-sm font-semibold text-[#67e952]">
          Protocolo salvo com sucesso.
        </div>
      ) : null}
    </ReceituarioChrome>
  )
}





