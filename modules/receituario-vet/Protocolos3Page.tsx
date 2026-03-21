// Ã¢Å“â€¦ Protocolos 3.0 Ã¢â‚¬â€ RefatoraÃƒÂ§ÃƒÂ£o Completa (100% Supabase)
// Ã°Å¸Å¡Â« ZERO localStorage, ZERO rxDb, ZERO mistura de fontes

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClinic } from '../../src/components/ClinicProvider'
import { supabase } from '../../src/lib/supabaseClient'
import ReceituarioChrome from './ReceituarioChrome'
import {
  RxvCard,
  RxvSectionHeader,
  RxvField,
  RxvInput,
  RxvSelect,
  RxvTextarea,
  RxvButton,
  RxvModalShell,
  RxvToggle,
} from '../../src/components/receituario/RxvComponents'
import {
  listFolders,
  listCombinedProtocols,
  loadProtocolBundle,
  loadGlobalProtocolBundle,
  saveProtocolBundle,
  deleteProtocol,
  deleteGlobalProtocol,
  createFolder,
  deleteFolder,
  findLinkedGlobalProtocols,
  publishProtocolAsGlobal,
  duplicateGlobalProtocolToClinic,
  type ProtocolFolderRecord,
  type ProtocolRecord,
  type ProtocolBundle,
  type ProtocolMedicationItem,
  type ProtocolRecommendation,
  type ProtocolListEntry,
  type GlobalProtocolRecord,
  type GlobalProtocolBundle,
} from '../../src/lib/protocols/protocolsRepo'
import { safeStringify } from '../../src/lib/clinicScopedDb'
import {
  mapProtocolMedicationToPrescriptionItem,
  mapPrescriptionItemToProtocolMedicationItem,
  mapProtocolRecommendationsToString,
} from './protocolMapper'
import {
  searchMedications,
  getMedicationPresentations,
  type MedicationPresentationRecord,
} from '../../src/lib/clinicRecords'
import { useLocalDraft } from '../../hooks/useLocalDraft'
import { AddMedicationModal2 } from './components/AddMedicationModal2'

// ==================== TYPES ====================

interface MedicationSearchResult {
  id: string
  name: string
  is_controlled: boolean
  pharmacy_origin?: string
  default_route?: string
}

type PublishGlobalMode = 'new' | 'update'
type ProtocolScopeFilter = 'all' | 'clinic' | 'global'

const PROTOCOL_SPECIES_OPTIONS = [
  { value: '', label: 'Ambas as especies' },
  { value: 'Canina', label: 'Canina' },
  { value: 'Felina', label: 'Felina' },
]

const PROTOCOL_CONTROL_OPTIONS = [
  { value: 'false', label: 'Nao (receituario comum)' },
  { value: 'true', label: 'Sim (controle especial)' },
]

const PROTOCOL_ROUTE_OPTIONS = [
  { value: '', label: 'Selecionar via' },
  { value: 'VO', label: 'Oral (VO)' },
  { value: 'SC', label: 'Subcutaneo (SC)' },
  { value: 'IM', label: 'Intramuscular (IM)' },
  { value: 'IV', label: 'Intravenoso (IV)' },
  { value: 'Topico', label: 'Topico' },
  { value: 'Oftalmico', label: 'Oftalmico' },
  { value: 'Otologico', label: 'Otologico' },
  { value: 'Intranasal', label: 'Intranasal' },
  { value: 'Retal', label: 'Retal' },
  { value: 'Inalatorio', label: 'Inalatorio' },
  { value: 'Transdermico', label: 'Transdermico' },
]

const PROTOCOL_FREQUENCY_OPTIONS = [
  { value: '', label: 'Selecionar frequencia' },
  { value: '1', label: '1x ao dia' },
  { value: '2', label: '2x ao dia' },
  { value: '3', label: '3x ao dia' },
  { value: '4', label: '4x ao dia' },
  { value: '6', label: '6x ao dia' },
  { value: '8', label: '8x ao dia' },
  { value: '12', label: '12x ao dia' },
  { value: '24', label: '24x ao dia' },
]

const PROTOCOL_DOSE_UNIT_OPTIONS = ['mg/kg', 'mg', 'mcg/kg', 'mcg', 'g', 'mL/kg', 'mL', 'UI/kg', 'UI', 'comprimido', 'capsula', 'gota', 'puff']
const PROTOCOL_DURATION_MODE_OPTIONS = [
  { value: 'fixed_days', label: 'Duracao fechada' },
  { value: 'continuous_until_recheck', label: 'Uso continuo ate reavaliacao' },
]

const COMMON_EXAMS = [
  'Hemograma completo',
  'Bioquimica serica',
  'Urinalise',
  'Urocultura',
  'Citologia',
  'Ultrassonografia abdominal',
  'Biopsia lesional',
  'Biopsia tumoral',
  'Tomografia',
  'Ressonancia magnetica',
  'Ecocardiograma',
  'Eletrocardiograma',
  'Rinoscopia',
  'Endoscopia',
  'Otoscopia',
]

type PublishGlobalDraft = {
  name: string
  description: string
  species: string
  tagsText: string
  slug: string
  mode: PublishGlobalMode
  globalProtocolId: string
}

function readText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function hasTruthyFlag(value: unknown): boolean {
  if (value === true) return true
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()
    return normalized === 'true' || normalized === '1' || normalized === 'yes'
  }
  return false
}

function slugifyProtocolName(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function buildPresentationLabel(presentation: MedicationPresentationRecord): string {
  return [
    presentation.pharmaceutical_form,
    presentation.commercial_name,
    presentation.concentration_text,
  ].filter(Boolean).join(' - ')
}

function buildExamKeyFromLabel(label: string): string {
  return slugifyProtocolName(label).replace(/-/g, '_')
}

function buildProtocolExamItemsFromDraft(commonItems: ProtocolBundle['examItems'], customExamText: string): ProtocolBundle['examItems'] {
  const selectedCommonExams = (commonItems || []).filter(
    (item) => !item.is_custom && COMMON_EXAMS.includes(item.label)
  )
  const customItems = customExamText
    .split('\n')
    .map((line) => line.replace(/\r/g, ''))
    .filter((line) => line.trim().length > 0)
    .map((label) => ({
      label,
      exam_key: buildExamKeyFromLabel(label),
      is_custom: true,
      sort_order: 0,
    }))

  return [...selectedCommonExams, ...customItems].map((item, index) => ({
    ...item,
    sort_order: index,
  }))
}

function parseTagsText(value: string): string[] {
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
}

function normalizeSearchText(value: unknown): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function matchesProtocolSearch(protocol: ProtocolListEntry, query: string): boolean {
  const needle = normalizeSearchText(query)
  if (!needle) return true

  const haystacks = [
    protocol.name,
    protocol.description,
    protocol.species,
    ...(protocol.tags || []),
  ]

  return haystacks.some((value) => normalizeSearchText(value).includes(needle))
}

function getMedicationObservation(item: ProtocolMedicationItem): string {
  const notes = item.metadata && typeof item.metadata === 'object' ? (item.metadata as Record<string, unknown>).notes : null
  return typeof notes === 'string' ? notes : ''
}

function getMedicationFrequencyLabel(item: ProtocolMedicationItem): string {
  if (item.frequency_type === 'times_per_day' && item.times_per_day) {
    return `${item.times_per_day}x ao dia`
  }
  if (item.frequency_type === 'interval_hours' && item.interval_hours) {
    return `A cada ${item.interval_hours} horas`
  }
  if (item.frequency_type === 'once_daily') return '1x ao dia'
  if (item.frequency_type === 'as_needed') return 'Se necessario'
  return 'Frequencia nao definida'
}

function canUserPublishGlobal(role: 'owner' | 'member' | null, user: any): boolean {
  if (role === 'owner') return true
  const userMetadata = (user?.user_metadata || {}) as Record<string, unknown>
  const appMetadata = (user?.app_metadata || {}) as Record<string, unknown>
  return (
    hasTruthyFlag(userMetadata.is_admin) ||
    hasTruthyFlag(userMetadata.global_protocol_publisher) ||
    hasTruthyFlag(userMetadata.global_content_admin) ||
    hasTruthyFlag(appMetadata.is_admin) ||
    hasTruthyFlag(appMetadata.global_protocol_publisher) ||
    hasTruthyFlag(appMetadata.global_content_admin) ||
    readText(appMetadata.role) === 'admin'
  )
}

// ==================== COMPONENT ====================

export default function Protocolos3Page() {
  const navigate = useNavigate()
  const { clinicId, role } = useClinic()
  const [userId, setUserId] = useState<string | null>(null)
  const [canPublishGlobalProtocols, setCanPublishGlobalProtocols] = useState(false)

  // Ã¢Å“â€¦ Estado: lista de pastas e protocolos
  const [folders, setFolders] = useState<ProtocolFolderRecord[]>([])
  const [protocols, setProtocols] = useState<ProtocolListEntry[]>([])
  const [isLoadingFolders, setIsLoadingFolders] = useState(false)
  const [isLoadingProtocols, setIsLoadingProtocols] = useState(false)
  const [scopeFilter, setScopeFilter] = useState<ProtocolScopeFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Ã¢Å“â€¦ Estado: seleÃƒÂ§ÃƒÂ£o STITCH layout
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [selectedProtocolKey, setSelectedProtocolKey] = useState<string | null>(null)
  const [selectedProtocolBundle, setSelectedProtocolBundle] = useState<ProtocolBundle | null>(null)
  const [globalProtocolViewer, setGlobalProtocolViewer] = useState<GlobalProtocolBundle | null>(null)
  const [isLoadingGlobalViewer, setIsLoadingGlobalViewer] = useState(false)
  const [isDuplicatingGlobal, setIsDuplicatingGlobal] = useState(false)
  const [isSavingProtocol, setIsSavingProtocol] = useState(false)

  // Ã¢Å“â€¦ Estado: modal criar/editar protocolo
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProtocol, setEditingProtocol] = useState<ProtocolBundle | null>(null)
  const [protocolDraft, setProtocolDraft, clearProtocolDraft, hasProtocolDraft] = useLocalDraft<ProtocolBundle | null>(
    'protocolos3-editor',
    clinicId || null,
    userId,
    null,
    {
      debounceMs: 800,
      enabled: !!clinicId && !!userId && modalOpen && !!editingProtocol && !editingProtocol.protocol.id,
    }
  )

  // Ã¢Å“â€¦ Estado: criar pasta
  const [createFolderOpen, setCreateFolderOpen] = useState(false)
  const [createFolderName, setCreateFolderName] = useState('')
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [protocolMedicationModalOpen, setProtocolMedicationModalOpen] = useState(false)

  // Ã¢Å“â€¦ Estado: busca de medicamentos
  const [medicationSearchOpen, setMedicationSearchOpen] = useState(false)
  const [medicationSearchQuery, setMedicationSearchQuery] = useState('')
  const [medications, setMedications] = useState<MedicationSearchResult[]>([])
  const [isSearchingMedications, setIsSearchingMedications] = useState(false)
  const [presentationPickerMedication, setPresentationPickerMedication] = useState<MedicationSearchResult | null>(null)
  const [presentationOptions, setPresentationOptions] = useState<MedicationPresentationRecord[]>([])
  const [isLoadingPresentationOptions, setIsLoadingPresentationOptions] = useState(false)
  const [protocolExamDraft, setProtocolExamDraft] = useState('')
  const [protocolCustomExamText, setProtocolCustomExamText] = useState('')
  const [publishGlobalOpen, setPublishGlobalOpen] = useState(false)
  const [publishGlobalDraft, setPublishGlobalDraft] = useState<PublishGlobalDraft | null>(null)
  const [linkedGlobalProtocols, setLinkedGlobalProtocols] = useState<GlobalProtocolRecord[]>([])
  const [isLoadingGlobalProtocols, setIsLoadingGlobalProtocols] = useState(false)
  const [isPublishingGlobal, setIsPublishingGlobal] = useState(false)
  const [protocolTagDraft, setProtocolTagDraft] = useState('')

  // ==================== EFFECTS ====================

  // Ã¢Å“â€¦ Obter userId do Supabase
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUserId(data.user.id)
        setCanPublishGlobalProtocols(canUserPublishGlobal(role, data.user))
        console.log('[Protocolos3] userId', data.user.id)
      } else {
        setCanPublishGlobalProtocols(false)
      }
    })
  }, [role])

  // Ã¢Å“â€¦ Carregar pastas (apenas apÃƒÂ³s clinicId e userId estarem definidos)
  useEffect(() => {
    if (!clinicId || !userId) {
      console.log('[Protocolos3] Aguardando clinicId e userId', { clinicId, userId })
      return
    }

    console.log('[Protocolos3] Carregando folders', { clinicId, userId })
    setIsLoadingFolders(true)

    listFolders(clinicId, userId)
      .then(async (data) => {
        console.log('[Protocolos3] Folders carregados', data)
        const [refreshedFolders, refreshedProtocols] = await Promise.all([
          listFolders(clinicId, userId),
          listCombinedProtocols(clinicId, userId),
        ])
        setFolders(refreshedFolders)
        setProtocols(refreshedProtocols)
      })
      .catch((err) => {
        console.error('[Protocolos3] Erro ao carregar folders', err)
        setFolders([])
      })
      .finally(() => setIsLoadingFolders(false))
  }, [clinicId, userId])

  // Ã¢Å“â€¦ Carregar protocolos (apenas apÃƒÂ³s clinicId e userId estarem definidos)
  useEffect(() => {
    if (!clinicId || !userId) {
      console.log('[Protocolos3] Aguardando clinicId e userId para protocolos', { clinicId, userId })
      return
    }

    console.log('[Protocolos3] Carregando protocols', { clinicId, userId })
    setIsLoadingProtocols(true)

    listCombinedProtocols(clinicId, userId)
      .then((data) => {
        console.log('[Protocolos3] Protocols carregados', data)
        setProtocols(data)
      })
      .catch((err) => {
        console.error('[Protocolos3] Erro ao carregar protocols', err)
        setProtocols([])
      })
      .finally(() => setIsLoadingProtocols(false))
  }, [clinicId, userId])

  // Ã¢Å“â€¦ Busca de medicamentos (CatÃƒÂ¡logo 3.0) com debounce
  useEffect(() => {
    if (!clinicId || !medicationSearchOpen) {
      setMedications([])
      return
    }

    const q = medicationSearchQuery.trim()

    const timer = setTimeout(async () => {
      try {
        setIsSearchingMedications(true)
        const results = await searchMedications(clinicId, q || '', q ? 50 : 20)
        console.log('[Protocolos3] Medicamentos encontrados', results.length)
        setMedications(results)
      } catch (err) {
        console.error('[Protocolos3] Erro ao buscar medicamentos', err)
        setMedications([])
      } finally {
        setIsSearchingMedications(false)
      }
    }, q ? 400 : 0)

    return () => clearTimeout(timer)
  }, [medicationSearchQuery, clinicId, medicationSearchOpen])

  useEffect(() => {
    if (!modalOpen || !editingProtocol) return
    if (editingProtocol.protocol.id) return
    setProtocolDraft(editingProtocol)
  }, [modalOpen, editingProtocol, setProtocolDraft])

  useEffect(() => {
    if (!modalOpen || !editingProtocol) {
      setProtocolCustomExamText('')
      return
    }

    const customExamLines = (editingProtocol.examItems || [])
      .filter((item) => item.is_custom)
      .map((item) => item.label || '')
      .filter(Boolean)
      .join('\n')

    setProtocolCustomExamText(customExamLines)
  }, [modalOpen, editingProtocol?.protocol.id])

  const reloadProtocols = useCallback(async () => {
    if (!clinicId || !userId) return
    const data = await listCombinedProtocols(clinicId, userId)
    setProtocols(data)
  }, [clinicId, userId])

  const visibleProtocols = useMemo(() => {
    return protocols.filter((protocol) => {
      if (scopeFilter !== 'all' && protocol.scope !== scopeFilter) return false
      if (selectedFolderId) {
        if (protocol.scope !== 'clinic') return false
        if (protocol.folder_id !== selectedFolderId) return false
      }
      if (!matchesProtocolSearch(protocol, searchQuery)) return false
      return true
    })
  }, [protocols, scopeFilter, searchQuery, selectedFolderId])

  const clinicProtocolsVisible = useMemo(
    () => visibleProtocols.filter((protocol) => protocol.scope === 'clinic'),
    [visibleProtocols]
  )

  const globalProtocolsVisible = useMemo(
    () => visibleProtocols.filter((protocol) => protocol.scope === 'global'),
    [visibleProtocols]
  )

  const updateEditingProtocol = useCallback((updater: (prev: ProtocolBundle) => ProtocolBundle) => {
    setEditingProtocol((prev) => (prev ? updater(prev) : prev))
  }, [])

  const updateProtocolHeader = useCallback((patch: Partial<ProtocolRecord>) => {
    updateEditingProtocol((prev) => ({
      ...prev,
      protocol: {
        ...prev.protocol,
        ...patch,
      },
    }))
  }, [updateEditingProtocol])

  const updateMedicationAt = useCallback((index: number, updater: (item: ProtocolMedicationItem) => ProtocolMedicationItem) => {
    updateEditingProtocol((prev) => ({
      ...prev,
      medications: prev.medications.map((item, itemIndex) => (itemIndex === index ? updater(item) : item)),
    }))
  }, [updateEditingProtocol])

  const updateRecommendationAt = useCallback((index: number, text: string) => {
    updateEditingProtocol((prev) => ({
      ...prev,
      recommendations: prev.recommendations.map((item, itemIndex) =>
        itemIndex === index ? { ...item, text } : item
      ),
    }))
  }, [updateEditingProtocol])

  const removeRecommendationAt = useCallback((index: number) => {
    updateEditingProtocol((prev) => ({
      ...prev,
      recommendations: prev.recommendations
        .filter((_, itemIndex) => itemIndex !== index)
        .map((item, itemIndex) => ({ ...item, sort_order: itemIndex })),
    }))
  }, [updateEditingProtocol])

  const addRecommendationField = useCallback(() => {
    updateEditingProtocol((prev) => ({
      ...prev,
      recommendations: [
        ...prev.recommendations,
        { text: '', sort_order: prev.recommendations.length, metadata: {} },
      ],
    }))
  }, [updateEditingProtocol])

  const addExamField = useCallback(() => {
    updateEditingProtocol((prev) => ({
      ...prev,
      examItems: [
        ...(prev.examItems || []),
        {
          label: '',
          exam_key: '',
          is_custom: true,
          sort_order: (prev.examItems || []).length,
          metadata: {},
        },
      ],
    }))
  }, [updateEditingProtocol])

  const updateExamAt = useCallback((index: number, updater: (item: NonNullable<ProtocolBundle['examItems']>[number]) => NonNullable<ProtocolBundle['examItems']>[number]) => {
    updateEditingProtocol((prev) => ({
      ...prev,
      examItems: (prev.examItems || []).map((item, itemIndex) => (itemIndex === index ? updater(item) : item)),
    }))
  }, [updateEditingProtocol])

  const removeExamAt = useCallback((index: number) => {
    updateEditingProtocol((prev) => ({
      ...prev,
      examItems: (prev.examItems || [])
        .filter((_, itemIndex) => itemIndex !== index)
        .map((item, itemIndex) => ({ ...item, sort_order: itemIndex })),
    }))
  }, [updateEditingProtocol])

  const toggleCommonExam = useCallback((label: string) => {
    updateEditingProtocol((prev) => {
      const currentItems = prev.examItems || []
      const existingIndex = currentItems.findIndex((item) => item.label === label)
      const nextItems = existingIndex >= 0
        ? currentItems.filter((_, itemIndex) => itemIndex !== existingIndex)
        : [
            ...currentItems,
            {
              label,
              exam_key: buildExamKeyFromLabel(label),
              is_custom: false,
              sort_order: currentItems.length,
            },
          ]

      return {
        ...prev,
        examItems: nextItems.map((item, itemIndex) => ({ ...item, sort_order: itemIndex })),
      }
    })
  }, [updateEditingProtocol])

  const addCustomProtocolExam = useCallback(() => {
    const label = protocolExamDraft.trim()
    if (!label) return
    setProtocolCustomExamText((prev) => {
      const currentLines = prev.split('\n').map((line) => line.trim()).filter(Boolean)
      if (currentLines.includes(label)) return prev
      return prev.trim() ? `${prev}\n${label}` : label
    })
    setProtocolExamDraft('')
  }, [protocolExamDraft])

  const updateProtocolExamsFromText = useCallback((value: string) => {
    setProtocolCustomExamText(value)
  }, [])

  // ==================== HANDLERS ====================

  const handleCreateProtocol = useCallback(() => {
    if (!clinicId || !userId) return
    const restoredDraft = hasProtocolDraft && protocolDraft && !protocolDraft.protocol.id
      ? {
          ...protocolDraft,
          examItems: protocolDraft.examItems || [],
        }
      : null

    setEditingProtocol(restoredDraft || {
      protocol: {
        id: '',
        clinic_id: clinicId,
        owner_user_id: userId,
        folder_id: selectedFolderId || null,
        name: '',
        description: null,
        species: null,
        duration_summary: null,
        tags: [],
        is_control_special: false,
        exams_justification: null,
        metadata: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      medications: [],
      recommendations: [],
      examItems: [],
    })
    setProtocolTagDraft('')
    setModalOpen(true)
  }, [clinicId, userId, selectedFolderId, hasProtocolDraft, protocolDraft])

  const handleEditProtocol = useCallback(
    async (protocolId: string) => {
      if (!clinicId || !userId) return

      try {
        console.log('[Protocolos3] Carregando protocolo para ediÃƒÂ§ÃƒÂ£o', protocolId)
        const bundle = await loadProtocolBundle(clinicId, userId, protocolId)
        if (bundle) {
          setEditingProtocol({ ...bundle, examItems: bundle.examItems || [] })
          setProtocolTagDraft('')
          setModalOpen(true)
        }
      } catch (err) {
        console.error('[Protocolos3] Erro ao carregar protocolo', err)
      }
    },
    [clinicId, userId]
  )

  const handleSaveProtocol = useCallback(async () => {
    if (!clinicId || !userId || !editingProtocol || isSavingProtocol) return

    try {
      setIsSavingProtocol(true)
      const bundleToSave: ProtocolBundle = {
        ...editingProtocol,
        examItems: buildProtocolExamItemsFromDraft(editingProtocol.examItems, protocolCustomExamText),
      }
      console.log('[Protocolos3] Salvando protocolo', bundleToSave.protocol.name)
      await saveProtocolBundle(clinicId, userId, bundleToSave)
      await reloadProtocols()

      setModalOpen(false)
      setEditingProtocol(null)
      setProtocolTagDraft('')
      clearProtocolDraft()
    } catch (err) {
      console.error('[Protocolos3] Erro ao salvar protocolo', err)
      const errorDetails = safeStringify(err)
      console.error('[Protocolos3] Detalhes do erro:', errorDetails)
      alert(`Falha ao salvar protocolo\n\nDetalhes:\n${errorDetails}`)
    } finally {
      setIsSavingProtocol(false)
    }
  }, [clinicId, userId, editingProtocol, isSavingProtocol, clearProtocolDraft, protocolCustomExamText, reloadProtocols])

  const handleOpenPublishGlobalModal = useCallback(async () => {
    if (!clinicId || !editingProtocol) return
    if (!editingProtocol.protocol.id) {
      alert('Salve o protocolo local antes de publicar como global.')
      return
    }

    try {
      setIsLoadingGlobalProtocols(true)
      const linked = await findLinkedGlobalProtocols(editingProtocol.protocol.id, clinicId)
      setLinkedGlobalProtocols(linked)
      setPublishGlobalDraft({
        name: editingProtocol.protocol.name,
        description: editingProtocol.protocol.description || '',
        species: editingProtocol.protocol.species || '',
        tagsText: (editingProtocol.protocol.tags || []).join(', '),
        slug: slugifyProtocolName(editingProtocol.protocol.name),
        mode: linked.length ? 'update' : 'new',
        globalProtocolId: linked[0]?.id || '',
      })
      setPublishGlobalOpen(true)
    } catch (err) {
      console.error('[Protocolos3] Erro ao abrir publicaÃƒÂ§ÃƒÂ£o global', err)
      alert(`Falha ao preparar publicaÃƒÂ§ÃƒÂ£o global\n\n${safeStringify(err)}`)
    } finally {
      setIsLoadingGlobalProtocols(false)
    }
  }, [clinicId, editingProtocol])

  const handleClosePublishGlobalModal = useCallback(() => {
    setPublishGlobalOpen(false)
    setPublishGlobalDraft(null)
    setLinkedGlobalProtocols([])
  }, [])

  const handlePublishGlobalProtocol = useCallback(async () => {
    if (!clinicId || !editingProtocol?.protocol.id || !publishGlobalDraft) return

    const name = publishGlobalDraft.name.trim()
    const slug = slugifyProtocolName(publishGlobalDraft.slug || publishGlobalDraft.name)
    if (!name) {
      alert('Informe um nome global para publicar o protocolo.')
      return
    }
    if (!slug) {
      alert('Slug global invÃƒÂ¡lido.')
      return
    }
    if (publishGlobalDraft.mode === 'update' && !publishGlobalDraft.globalProtocolId) {
      alert('Selecione qual protocolo global vinculado deve ser atualizado.')
      return
    }

    try {
      setIsPublishingGlobal(true)
      const result = await publishProtocolAsGlobal({
        protocolId: editingProtocol.protocol.id,
        mode: publishGlobalDraft.mode,
        globalProtocolId: publishGlobalDraft.mode === 'update' ? publishGlobalDraft.globalProtocolId : null,
        name,
        description: publishGlobalDraft.description.trim() || null,
        species: publishGlobalDraft.species.trim() || null,
        tags: parseTagsText(publishGlobalDraft.tagsText),
        slug,
      })

      const refreshedLinked = await findLinkedGlobalProtocols(editingProtocol.protocol.id, clinicId)
      setLinkedGlobalProtocols(refreshedLinked)
      alert(
        result.mode === 'update'
          ? `Protocolo global atualizado com sucesso.\n\nSlug: ${result.slug}\nVersÃƒÂ£o: ${result.version}`
          : `Protocolo global publicado com sucesso.\n\nSlug: ${result.slug}\nVersÃƒÂ£o: ${result.version}`
      )
      handleClosePublishGlobalModal()
    } catch (err) {
      console.error('[Protocolos3] Erro ao publicar protocolo global', err)
      alert(`Falha ao publicar protocolo global\n\n${safeStringify(err)}`)
    } finally {
      setIsPublishingGlobal(false)
    }
  }, [clinicId, editingProtocol?.protocol.id, handleClosePublishGlobalModal, publishGlobalDraft])

  const handleDeleteProtocol = useCallback(
    async (protocolId: string) => {
      if (!clinicId || !userId) return
      if (!confirm('Deseja realmente excluir este protocolo?')) return

      try {
        console.log('[Protocolos3] Excluindo protocolo', protocolId)
        await deleteProtocol(clinicId, userId, protocolId)
        await reloadProtocols()
      } catch (err) {
        console.error('[Protocolos3] Erro ao excluir protocolo', err)
        const errorDetails = safeStringify(err)
        console.error('[Protocolos3] Detalhes do erro de exclusÃƒÂ£o:', errorDetails)
        alert(`Falha ao excluir protocolo\n\nDetalhes:\n${errorDetails}`)
      }
    },
    [clinicId, userId, reloadProtocols]
  )

  const handleDeleteFolder = useCallback(
    async (folderId: string, folderName: string) => {
      if (!clinicId || !userId) return
      if (!confirm(`Excluir pasta "${folderName}"? Os protocolos dentro serÃƒÂ£o movidos para Todos.`)) return
      try {
        await deleteFolder(clinicId, userId, folderId)
        const [refreshedFolders, refreshedProtocols] = await Promise.all([
          listFolders(clinicId, userId),
          listCombinedProtocols(clinicId, userId),
        ])
        setFolders(refreshedFolders)
        setProtocols(refreshedProtocols)
        if (selectedFolderId === folderId) setSelectedFolderId(null)
      } catch (err) {
        console.error('[Protocolos3] Erro ao excluir pasta', err)
        alert(`Falha ao excluir pasta\n\n${safeStringify(err)}`)
      }
    },
    [clinicId, userId, selectedFolderId]
  )

  const handleApplyToNovaReceita = useCallback(
    async (protocol: ProtocolListEntry) => {
      if (!clinicId || !userId) {
        alert('Cl?nica ou usu?rio n?o identificado.')
        return
      }

      try {
        console.log('[Protocolos3] Carregando protocolo para aplicar em Nova Receita', protocol.id)

        const bundle =
          protocol.scope === 'global'
            ? await loadGlobalProtocolBundle(protocol.id)
            : await loadProtocolBundle(clinicId, userId, protocol.id)
        if (!bundle) {
          alert('Protocolo nÃƒÂ£o encontrado.')
          return
        }

        // Converter medicamentos do protocolo para itens da receita
        const prescriptionItems = bundle.medications.map(mapProtocolMedicationToPrescriptionItem)

        // Converter recomendaÃƒÂ§ÃƒÂµes para string
        const recommendationsText = mapProtocolRecommendationsToString(bundle.recommendations)

        // Construir payload para navegaÃƒÂ§ÃƒÂ£o
        const payload = {
          items: prescriptionItems,
          recommendations: recommendationsText,
          exams: (bundle.examItems || []).map((exam) => exam.label).filter(Boolean),
          examJustification: bundle.protocol.exams_justification || '',
          sourceProtocol: {
            id: bundle.protocol.id,
            name: bundle.protocol.name,
            scope: protocol.scope,
          },
        }

        console.log('[Protocolos3] Payload para Nova Receita 2.0:', payload)

        // Navegar para Nova Receita 2.0 com o payload
        navigate('/receituario-vet/nova-receita-2', { state: payload })

      } catch (err) {
        console.error('[Protocolos3] Erro ao aplicar protocolo em Nova Receita', err)
        alert(`Erro ao aplicar protocolo: ${err instanceof Error ? err.message : String(err)}`)
      }
    },
    [clinicId, userId, navigate]
  )

  const handleSelectProtocol = useCallback(
    async (protocolId: string) => {
      if (!clinicId || !userId) return

      setSelectedProtocolKey(`clinic:${protocolId}`)
      setSelectedProtocolBundle(null) // Clear previous bundle while loading

      try {
        console.log('[Protocolos3] Carregando detalhes do protocolo', protocolId)
        const bundle = await loadProtocolBundle(clinicId, userId, protocolId)
        if (bundle) {
          setSelectedProtocolBundle(bundle)
          console.log('[Protocolos3] Protocolo carregado com sucesso', bundle.protocol.name)
        } else {
          console.error('[Protocolos3] Protocolo nÃƒÂ£o encontrado', protocolId)
          setSelectedProtocolId(null)
        }
      } catch (err) {
        console.error('[Protocolos3] Erro ao carregar detalhes do protocolo', err)
        const errorDetails = safeStringify(err)
        alert(`Falha ao carregar protocolo\n\nDetalhes:\n${errorDetails}`)
        setSelectedProtocolId(null)
      }
    },
    [clinicId, userId]
  )

  const handleOpenGlobalProtocol = useCallback(async (protocolId: string) => {
    try {
      setSelectedProtocolKey(`global:${protocolId}`)
      setIsLoadingGlobalViewer(true)
      const bundle = await loadGlobalProtocolBundle(protocolId)
      if (!bundle) {
        alert('Protocolo global nÃƒÂ£o encontrado.')
        return
      }
      setGlobalProtocolViewer(bundle)
    } catch (err) {
      console.error('[Protocolos3] Erro ao abrir protocolo global', err)
      alert(`Falha ao carregar protocolo global\n\n${safeStringify(err)}`)
    } finally {
      setIsLoadingGlobalViewer(false)
    }
  }, [])

  const handleCloseGlobalProtocol = useCallback(() => {
    setGlobalProtocolViewer(null)
    setSelectedProtocolKey(null)
  }, [])

  const handleDuplicateGlobalProtocol = useCallback(async () => {
    if (!clinicId || !userId || !globalProtocolViewer) return

    try {
      setIsDuplicatingGlobal(true)
      const duplicated = await duplicateGlobalProtocolToClinic(clinicId, userId, globalProtocolViewer.protocol.id)
      await reloadProtocols()
      const bundle = await loadProtocolBundle(clinicId, userId, duplicated.id)
      if (bundle) {
        setEditingProtocol({ ...bundle, examItems: bundle.examItems || [] })
        setProtocolTagDraft('')
        setModalOpen(true)
      }
      setGlobalProtocolViewer(null)
      alert('Protocolo global duplicado para a sua cl?nica com sucesso.')
    } catch (err) {
      console.error('[Protocolos3] Erro ao duplicar protocolo global', err)
      const message = err instanceof Error ? err.message : safeStringify(err)
      alert(`Falha ao duplicar protocolo global\n\n${message}`)
    } finally {
      setIsDuplicatingGlobal(false)
    }
  }, [clinicId, userId, globalProtocolViewer, reloadProtocols])

  const handleDeleteGlobalProtocol = useCallback(async (protocolId?: string, protocolName?: string) => {
    const safeProtocolId = typeof protocolId === 'string' ? protocolId : undefined
    const safeProtocolName = typeof protocolName === 'string' ? protocolName : undefined
    const targetId = safeProtocolId || globalProtocolViewer?.protocol.id
    const targetName = safeProtocolName || globalProtocolViewer?.protocol.name || 'este protocolo global'
    if (!targetId) return
    if (!confirm(`Excluir o protocolo global "${targetName}"?`)) return

    try {
      await deleteGlobalProtocol(targetId, clinicId)
      await reloadProtocols()
      if (globalProtocolViewer?.protocol.id === targetId) {
        setGlobalProtocolViewer(null)
        setSelectedProtocolKey(null)
      }
      alert('Protocolo global excluido com sucesso.')
    } catch (err) {
      console.error('[Protocolos3] Erro ao excluir protocolo global', err)
      const message = err instanceof Error ? err.message : safeStringify(err)
      alert(`Falha ao excluir protocolo global\n\n${message}`)
    }
  }, [clinicId, globalProtocolViewer, reloadProtocols])

  const handleAddMedication = useCallback(
    async (medication: MedicationSearchResult) => {
      if (!clinicId || !editingProtocol) return

      try {
        console.log('[Protocolos3] Adicionando medicamento', medication.name)

        // Buscar apresentaÃƒÂ§ÃƒÂµes do medicamento
        const presentations = await getMedicationPresentations(clinicId, medication.id)
        const defaultPresentation = presentations[0] // Use first available presentation

        if (!defaultPresentation) {
          alert('Medicamento nÃƒÂ£o possui apresentaÃƒÂ§ÃƒÂµes cadastradas.')
          return
        }

        // Create item Ã¢â‚¬â€ only fields that exist in the DB schema
        const newItem: ProtocolMedicationItem = {
          medication_id: medication.id,
          medication_name: medication.name,
          presentation_id: defaultPresentation.id,
          presentation_text: [
            defaultPresentation.pharmaceutical_form,
            defaultPresentation.commercial_name,
            defaultPresentation.concentration_text,
          ].filter(Boolean).join(' Ã¢â‚¬â€ '),
          manual_medication_name: null,
          manual_presentation_label: null,
          concentration_value: (defaultPresentation as any).concentration_value || null,
          concentration_unit: (defaultPresentation as any).concentration_unit || null,
          route: medication.default_route || null,
          frequency_type: 'times_per_day',
          times_per_day: 2,
          interval_hours: null,
          duration_days: 7,
          is_controlled: medication.is_controlled,
          sort_order: editingProtocol.medications.length,
          // NOTE: no `instructions` Ã¢â‚¬â€ column does not exist in DB
        }

        setEditingProtocol({
          ...editingProtocol,
          medications: [...editingProtocol.medications, newItem],
        })

        setMedicationSearchOpen(false)
        setMedicationSearchQuery('')
      } catch (err) {
        console.error('[Protocolos3] Erro ao adicionar medicamento', err)
        alert(`Erro ao adicionar medicamento: ${err instanceof Error ? err.message : String(err)}`)
      }
    },
    [clinicId, editingProtocol]
  )

  const handleRemoveMedication = useCallback(
    (index: number) => {
      if (!editingProtocol) return

      const updated = editingProtocol.medications.filter((_, i) => i !== index)
      setEditingProtocol({
        ...editingProtocol,
        medications: updated,
      })
    },
    [editingProtocol]
  )

  const handleAddMedicationFromProtocolModal = useCallback((item: any) => {
    updateEditingProtocol((prev) => ({
      ...prev,
      medications: [
        ...prev.medications,
        mapPrescriptionItemToProtocolMedicationItem(item, prev.medications.length),
      ],
    }))
    setProtocolMedicationModalOpen(false)
  }, [updateEditingProtocol])

  const handleAddMedicationToDraft = useCallback(async (medication: MedicationSearchResult) => {
    if (!clinicId) return

    try {
      setIsLoadingPresentationOptions(true)
      const presentations = await getMedicationPresentations(clinicId, medication.id)
      setPresentationPickerMedication(medication)
      setPresentationOptions(presentations)
    } catch (err) {
      console.error('[Protocolos3] Erro ao adicionar medicamento', err)
      alert(`Erro ao adicionar medicamento: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsLoadingPresentationOptions(false)
    }
  }, [clinicId, updateEditingProtocol])

  const handleSelectMedicationWithoutPresentation = useCallback(() => {
    if (!presentationPickerMedication) return

    updateEditingProtocol((prev) => ({
      ...prev,
      medications: [
        ...prev.medications,
        {
          medication_id: presentationPickerMedication.id,
          medication_name: presentationPickerMedication.name,
          presentation_id: null,
          presentation_text: '',
          manual_medication_name: null,
          manual_presentation_label: null,
          concentration_value: null,
          concentration_unit: null,
          dose_value: null,
          dose_unit: 'mg/kg',
          route: presentationPickerMedication.default_route || 'VO',
          frequency_type: 'times_per_day',
          times_per_day: 2,
          interval_hours: null,
          duration_days: 7,
          is_controlled: presentationPickerMedication.is_controlled,
          sort_order: prev.medications.length,
          metadata: {
            notes: '',
          },
        },
      ],
    }))

    setPresentationPickerMedication(null)
    setPresentationOptions([])
    setMedicationSearchOpen(false)
    setMedicationSearchQuery('')
  }, [presentationPickerMedication, updateEditingProtocol])

  const handleRemoveMedicationFromDraft = useCallback((index: number) => {
    updateEditingProtocol((prev) => ({
      ...prev,
      medications: prev.medications
        .filter((_, itemIndex) => itemIndex !== index)
        .map((item, itemIndex) => ({ ...item, sort_order: itemIndex })),
    }))
  }, [updateEditingProtocol])

  const handleSelectMedicationPresentation = useCallback((presentation: MedicationPresentationRecord) => {
    if (!presentationPickerMedication) return

    const presentationMetadata = ((presentation as any).metadata || {}) as Record<string, unknown>
    updateEditingProtocol((prev) => ({
      ...prev,
      medications: [
        ...prev.medications,
        {
          medication_id: presentationPickerMedication.id,
          medication_name: presentationPickerMedication.name,
          presentation_id: presentation.id,
          presentation_text: buildPresentationLabel(presentation),
          manual_medication_name: null,
          manual_presentation_label: null,
          concentration_value: presentation.value ?? null,
          concentration_unit: presentation.value_unit || null,
          dose_value: null,
          dose_unit: 'mg/kg',
          route: presentationPickerMedication.default_route || 'VO',
          frequency_type: 'times_per_day',
          times_per_day: 2,
          interval_hours: null,
          duration_days: 7,
          is_controlled: presentationPickerMedication.is_controlled,
          sort_order: prev.medications.length,
          metadata: {
            ...presentationMetadata,
            notes: typeof presentationMetadata.notes === 'string' ? presentationMetadata.notes : '',
          },
        },
      ],
    }))

    setPresentationPickerMedication(null)
    setPresentationOptions([])
    setMedicationSearchOpen(false)
    setMedicationSearchQuery('')
  }, [presentationPickerMedication, updateEditingProtocol])

  const handleAddProtocolTag = useCallback(() => {
    const normalizedTag = protocolTagDraft.trim()
    if (!normalizedTag) return
    updateEditingProtocol((prev) => {
      const currentTags = prev.protocol.tags || []
      if (currentTags.includes(normalizedTag)) return prev
      return {
        ...prev,
        protocol: {
          ...prev.protocol,
          tags: [...currentTags, normalizedTag],
        },
      }
    })
    setProtocolTagDraft('')
  }, [protocolTagDraft, updateEditingProtocol])

  const handleRemoveProtocolTag = useCallback((tag: string) => {
    updateEditingProtocol((prev) => ({
      ...prev,
      protocol: {
        ...prev.protocol,
        tags: (prev.protocol.tags || []).filter((currentTag) => currentTag !== tag),
      },
    }))
  }, [updateEditingProtocol])

  const renderProtocolCardV2 = useCallback((protocol: ProtocolListEntry) => (
    <div
      key={`${protocol.scope}:${protocol.id}`}
      onClick={() =>
        protocol.scope === 'global'
          ? handleOpenGlobalProtocol(protocol.id)
          : handleSelectProtocol(protocol.id)
      }
      className="group"
    >
      <RxvCard
        className={`h-full border-l-4 p-6 transition-all ${
          selectedProtocolKey === `${protocol.scope}:${protocol.id}`
            ? 'border-l-[#39ff14] bg-[#39ff14]/10 shadow-[0_0_30px_rgba(57,255,20,0.1)]'
            : 'border-l-transparent hover:border-l-slate-700'
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 pr-2">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] ${
                  protocol.scope === 'global'
                    ? 'border border-cyan-400/25 bg-cyan-500/12 text-cyan-200'
                    : 'border border-[#39ff14]/20 bg-[#39ff14]/12 text-[#9CFF87]'
                }`}
              >
                {protocol.scope === 'global' ? 'GLOBAL' : 'DA CL?NICA'}
              </span>
            </div>
            <h3 className="truncate text-lg font-black uppercase italic leading-tight text-white">
              {protocol.name}
            </h3>
            {protocol.description && (
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
                {protocol.description}
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1">
            {protocol.scope === 'clinic' ? (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleEditProtocol(protocol.id) }}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-2 text-slate-400 transition-colors hover:bg-slate-800"
                  title="Editar"
                >
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleDeleteProtocol(protocol.id) }}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-2 text-red-500/70 transition-colors hover:bg-slate-800 hover:text-red-400"
                  title="Excluir"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleOpenGlobalProtocol(protocol.id) }}
                  disabled={isLoadingGlobalViewer}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-2 text-cyan-300 transition-colors hover:bg-slate-800"
                  title="Visualizar"
                >
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
                {canPublishGlobalProtocols && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      void handleDeleteGlobalProtocol(protocol.id, protocol.name)
                    }}
                    className="rounded-xl border border-slate-800 bg-slate-900/50 p-2 text-red-500/70 transition-colors hover:bg-slate-800 hover:text-red-400"
                    title="Excluir global"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {protocol.species && (
            <span className="rounded border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-blue-400">
              {protocol.species}
            </span>
          )}
          {protocol.is_control_special && (
            <span className="rounded border border-yellow-500/20 bg-yellow-500/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-yellow-500">
              Controlado
            </span>
          )}
          {protocol.tags?.map((tag) => (
            <span key={tag} className="rounded bg-slate-800 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-slate-400">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          {protocol.scope === 'global' && (
            <RxvButton
              variant="secondary"
              onClick={(e) => { e.stopPropagation(); handleOpenGlobalProtocol(protocol.id) }}
              loading={isLoadingGlobalViewer && selectedProtocolKey === `global:${protocol.id}`}
              className="h-10 w-full text-[10px] font-black uppercase tracking-widest"
            >
              Visualizar protocolo
            </RxvButton>
          )}
          <RxvButton
            variant="secondary"
            onClick={(e) => { e.stopPropagation(); handleApplyToNovaReceita(protocol) }}
            className="h-10 w-full text-[10px] font-black uppercase tracking-widest"
          >
            Utilizar protocolo
          </RxvButton>
        </div>
      </RxvCard>
    </div>
  ), [
    canPublishGlobalProtocols,
    handleApplyToNovaReceita,
    handleDeleteGlobalProtocol,
    handleDeleteProtocol,
    handleEditProtocol,
    handleOpenGlobalProtocol,
    handleSelectProtocol,
    isLoadingGlobalViewer,
    selectedProtocolKey,
  ])

  const renderProtocolGridV2 = useCallback((items: ProtocolListEntry[]) => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((protocol) => renderProtocolCardV2(protocol))}
    </div>
  ), [renderProtocolCardV2])

  const renderProtocolEditorModal = useCallback(() => {
    if (!editingProtocol) return null

    const tags = editingProtocol.protocol.tags || []
    const examItems = editingProtocol.examItems || []
    const commonExamLabels = examItems.filter((item) => !item.is_custom).map((item) => item.label)

    return (
      <RxvModalShell zIndexClass="z-[90]" overlayClassName="bg-black/90 backdrop-blur-sm">
        <div className="mx-auto flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#2f5b25] bg-[#0a0f0a] text-slate-100 shadow-[0_0_60px_rgba(57,255,20,0.2)]">
          <div className="flex items-center justify-between border-b border-slate-800 bg-black/60 px-8 py-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded bg-[#39ff14]/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-[#7CFF64] border border-[#39ff14]/20">
                  DA CL?NICA
                </span>
              </div>
              <h2 className="text-xl font-black uppercase italic tracking-tight text-white">
                {editingProtocol.protocol.id ? 'Editar protocolo' : 'Novo protocolo'}
              </h2>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Configure medicamentos, recomendacoes e exames pre-definidos
              </p>
            </div>
            <div className="flex items-center gap-3">
              {canPublishGlobalProtocols && (
                <RxvButton
                  variant="secondary"
                  onClick={handleOpenPublishGlobalModal}
                  disabled={!editingProtocol.protocol.id || isLoadingGlobalProtocols}
                  title={editingProtocol.protocol.id ? 'Publicar protocolo para todos os usuarios' : 'Salve o protocolo local antes de publicar'}
                >
                  {isLoadingGlobalProtocols ? 'Carregando vinculo...' : 'Salvar como global'}
                </RxvButton>
              )}
              <RxvButton variant="secondary" onClick={() => { setModalOpen(false); setEditingProtocol(null); handleClosePublishGlobalModal() }}>
                Cancelar
              </RxvButton>
              <RxvButton variant="primary" onClick={handleSaveProtocol} loading={isSavingProtocol}>
                Salvar
              </RxvButton>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <RxvField label="Nome do protocolo">
                  <RxvInput
                    placeholder="Ex: Dermatite atopica"
                    value={editingProtocol.protocol.name}
                    onChange={(e) => updateProtocolHeader({ name: e.target.value })}
                  />
                </RxvField>
                <RxvField label="Pasta">
                  <RxvSelect
                    value={editingProtocol.protocol.folder_id || ''}
                    onChange={(e) => updateProtocolHeader({ folder_id: e.target.value || null })}
                    options={[
                      { value: '', label: 'Nenhuma pasta (raiz)' },
                      ...folders.map((folder) => ({ value: folder.id, label: folder.name })),
                    ]}
                  />
                </RxvField>
              </div>

              <RxvField label="Descricao">
                <RxvTextarea
                  placeholder="Descricao breve para facilitar a busca do protocolo."
                  rows={3}
                  value={editingProtocol.protocol.description || ''}
                  onChange={(e) => updateProtocolHeader({ description: e.target.value || null })}
                />
              </RxvField>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <RxvField label="Especie alvo">
                  <RxvSelect
                    value={editingProtocol.protocol.species || ''}
                    onChange={(e) => updateProtocolHeader({ species: e.target.value || null })}
                    options={PROTOCOL_SPECIES_OPTIONS}
                  />
                </RxvField>
                <RxvField label="Controle especial">
                  <RxvSelect
                    value={editingProtocol.protocol.is_control_special ? 'true' : 'false'}
                    onChange={(e) => updateProtocolHeader({ is_control_special: e.target.value === 'true' })}
                    options={PROTOCOL_CONTROL_OPTIONS}
                  />
                </RxvField>
              </div>

              <div className="space-y-3">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <RxvField label="Tags">
                      <RxvInput
                        placeholder="Digite uma tag"
                        value={protocolTagDraft}
                        onChange={(e) => setProtocolTagDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddProtocolTag()
                          }
                        }}
                      />
                    </RxvField>
                  </div>
                  <RxvButton variant="secondary" onClick={handleAddProtocolTag}>
                    Adicionar tag
                  </RxvButton>
                </div>
                {tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleRemoveProtocolTag(tag)}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-300 hover:border-red-500/40 hover:text-red-300"
                      >
                        {tag}
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">Nenhuma tag adicionada.</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-sm font-black uppercase tracking-widest italic text-[#39ff14]">
                  Medicamentos do protocolo
                </h3>
                <RxvButton variant="secondary" onClick={() => setProtocolMedicationModalOpen(true)} className="h-8 text-[10px]">
                  + Adicionar
                </RxvButton>
              </div>

              {editingProtocol.medications.length === 0 ? (
                <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-800 bg-black/20 py-10">
                  <span className="material-symbols-outlined text-[40px] text-slate-700">medical_services</span>
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest italic text-slate-500">
                    Nenhum medicamento configurado
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {editingProtocol.medications.map((med, idx) => (
                    <div key={`${med.medication_id || med.manual_medication_name || 'med'}-${idx}`} className="rounded-2xl border border-slate-800 bg-black/30 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-black uppercase italic text-white">
                            {med.medication_name || med.manual_medication_name || 'Medicamento'}
                          </p>
                          <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            {med.manual_presentation_label || med.presentation_text || 'Apresentação não definida'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveMedicationFromDraft(idx)}
                          className="rounded-xl p-2 text-red-500/80 transition-colors hover:bg-red-900/20 hover:text-red-400"
                          title="Remover medicamento"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
                        <RxvField label="Dose">
                          <RxvInput
                            value={med.dose_value ?? ''}
                            onChange={(e) => updateMedicationAt(idx, (current) => ({
                              ...current,
                              dose_value: e.target.value ? Number(String(e.target.value).replace(',', '.')) : null,
                            }))}
                            placeholder="Ex: 1 ou 0.5"
                          />
                        </RxvField>
                        <RxvField label="Unidade">
                          <RxvInput
                            value={med.dose_unit || ''}
                            onChange={(e) => updateMedicationAt(idx, (current) => ({ ...current, dose_unit: e.target.value }))}
                            placeholder="Ex: mg/kg"
                            list="protocol-dose-unit-options"
                          />
                        </RxvField>
                        <RxvField label="Via">
                          <RxvSelect
                            value={med.route || ''}
                            onChange={(e) => updateMedicationAt(idx, (current) => ({ ...current, route: e.target.value || null }))}
                            options={PROTOCOL_ROUTE_OPTIONS}
                          />
                        </RxvField>
                        <RxvField label="Frequência">
                          <RxvSelect
                            value={med.times_per_day ? String(med.times_per_day) : ''}
                            onChange={(e) => updateMedicationAt(idx, (current) => ({
                              ...current,
                              frequency_type: 'times_per_day',
                              times_per_day: e.target.value ? Number(e.target.value) : null,
                              interval_hours: null,
                            }))}
                            options={PROTOCOL_FREQUENCY_OPTIONS}
                          />
                        </RxvField>
                        <RxvField label="Modo de duração">
                          <RxvSelect
                            value={med.duration_days === -1 ? 'continuous_until_recheck' : 'fixed_days'}
                            onChange={(e) => updateMedicationAt(idx, (current) => ({
                              ...current,
                              duration_days: e.target.value === 'continuous_until_recheck'
                                ? -1
                                : (current.duration_days === -1 ? 7 : current.duration_days),
                            }))}
                            options={PROTOCOL_DURATION_MODE_OPTIONS}
                          />
                        </RxvField>
                        <RxvField label="Duração (dias)">
                          <RxvInput
                            type="number"
                            value={med.duration_days && med.duration_days > 0 ? med.duration_days : ''}
                            onChange={(e) => updateMedicationAt(idx, (current) => ({
                              ...current,
                              duration_days: e.target.value ? Number(e.target.value) : null,
                            }))}
                            placeholder="Ex: 7"
                            disabled={med.duration_days === -1}
                          />
                        </RxvField>
                        <div className="flex items-end">
                          <RxvToggle
                            checked={!!med.is_controlled}
                            onChange={(checked) => updateMedicationAt(idx, (current) => ({ ...current, is_controlled: checked }))}
                            label="Controlado"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <RxvField label="Observações do medicamento">
                          <RxvTextarea
                            rows={3}
                            placeholder="Observações que devem acompanhar este item no protocolo."
                            value={getMedicationObservation(med)}
                            onChange={(e) => updateMedicationAt(idx, (current) => ({
                              ...current,
                              metadata: {
                                ...(current.metadata || {}),
                                notes: e.target.value,
                              },
                            }))}
                          />
                        </RxvField>
                      </div>

                      <div className="mt-3 rounded-xl border border-slate-800 bg-black/20 px-3 py-3 text-xs text-slate-400">
                        <p className="font-semibold text-slate-200">Resumo</p>
                        <p>{med.route || 'Via não definida'} • {getMedicationFrequencyLabel(med)} • {med.duration_days === -1 ? 'Uso contínuo até reavaliação do paciente' : med.duration_days ? `${med.duration_days} dia(s)` : 'Duração não definida'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-sm font-black uppercase tracking-widest italic text-[#39ff14]">
                  Recomendacoes e orientacoes
                </h3>
                <RxvButton variant="secondary" onClick={addRecommendationField} className="h-8 text-[10px]">
                  + Adicionar
                </RxvButton>
              </div>
              {editingProtocol.recommendations.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-800 bg-black/20 px-4 py-8 text-center text-xs font-bold uppercase tracking-widest text-slate-500">
                  Nenhuma recomendacao configurada
                </div>
              ) : (
                <div className="space-y-3">
                  {editingProtocol.recommendations.map((recommendation, idx) => (
                    <div key={`rec-${idx}`} className="rounded-2xl border border-slate-800 bg-black/20 p-3">
                      <div className="mb-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeRecommendationAt(idx)}
                          className="rounded-lg p-1.5 text-red-500/80 transition-colors hover:bg-red-900/20 hover:text-red-400"
                          title="Remover recomendacao"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                      <RxvTextarea
                        rows={3}
                        placeholder="Ex: Retornar em 7 dias para reavaliacao."
                        value={recommendation.text}
                        onChange={(e) => updateRecommendationAt(idx, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-sm font-black uppercase tracking-widest italic text-[#39ff14]">
                  Exames do protocolo
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {COMMON_EXAMS.map((exam) => {
                    const selected = commonExamLabels.includes(exam)
                    return (
                      <button
                        key={exam}
                        type="button"
                        onClick={() => toggleCommonExam(exam)}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                          selected
                            ? 'border-[#39ff14]/60 bg-[#39ff14]/10 text-[#39ff14]'
                            : 'border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                        }`}
                      >
                        {selected ? 'Ã¢Å“â€œ ' : ''}{exam}
                      </button>
                    )
                  })}
                </div>

                <RxvField label="Justificativa">
                  <RxvTextarea
                    placeholder="Ex: Ficam sugeridos os seguintes exames para avaliar a funcao dos rins e do figado do paciente..."
                    rows={4}
                    value={editingProtocol.protocol.exams_justification || ''}
                    onChange={(e) => updateProtocolHeader({ exams_justification: e.target.value })}
                  />
                </RxvField>

                <RxvField label="Exames adicionais por linha">
                  <RxvTextarea
                    placeholder="Ex: Cultura fungica&#10;PCR para cinomose&#10;Bioquimico completo"
                    rows={6}
                    value={protocolCustomExamText}
                    onChange={(e) => updateProtocolExamsFromText(e.target.value)}
                  />
                </RxvField>

                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <RxvField label="Adicionar outro exame">
                      <RxvInput
                        placeholder="Digite um exame fora da lista acima"
                        value={protocolExamDraft}
                        onChange={(e) => setProtocolExamDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addCustomProtocolExam()
                          }
                        }}
                      />
                    </RxvField>
                  </div>
                  <RxvButton variant="secondary" onClick={addCustomProtocolExam}>
                    Adicionar exame
                  </RxvButton>
                </div>
              </div>
            </div>
          </div>

          <datalist id="protocol-dose-unit-options">
            {PROTOCOL_DOSE_UNIT_OPTIONS.map((unit) => (
              <option key={unit} value={unit} />
            ))}
          </datalist>
        </div>
      </RxvModalShell>
    )
  }, [
    addCustomProtocolExam,
    addRecommendationField,
    canPublishGlobalProtocols,
    editingProtocol,
    folders,
    handleAddProtocolTag,
    handleClosePublishGlobalModal,
    handleOpenPublishGlobalModal,
    handleRemoveMedicationFromDraft,
    handleRemoveProtocolTag,
    handleSaveProtocol,
    isLoadingGlobalProtocols,
    isSavingProtocol,
    protocolExamDraft,
    protocolCustomExamText,
    protocolTagDraft,
    removeRecommendationAt,
    setModalOpen,
    setProtocolExamDraft,
    setProtocolTagDraft,
    updateMedicationAt,
    updateProtocolExamsFromText,
    updateProtocolHeader,
    updateRecommendationAt,
    toggleCommonExam,
  ])

  // ==================== RENDER ====================

  const renderProtocolCard = (protocol: ProtocolListEntry) => (
    <div
      key={`${protocol.scope}:${protocol.id}`}
      onClick={() =>
        protocol.scope === 'global'
          ? handleOpenGlobalProtocol(protocol.id)
          : handleSelectProtocol(protocol.id)
      }
      className="group"
    >
      <RxvCard
        className={`p-6 h-full transition-all border-l-4 ${
          selectedProtocolKey === `${protocol.scope}:${protocol.id}`
            ? 'border-l-[#39ff14] bg-[#39ff14]/10 shadow-[0_0_30px_rgba(57,255,20,0.1)]'
            : 'border-l-transparent hover:border-l-slate-700'
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0 pr-4">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-[0.18em] ${
                  protocol.scope === 'global'
                    ? 'bg-cyan-500/12 text-cyan-200 border border-cyan-400/25'
                    : 'bg-[#39ff14]/12 text-[#9CFF87] border border-[#39ff14]/20'
                }`}
              >
                {protocol.scope === 'global' ? 'GLOBAL' : 'DA CL?NICA'}
              </span>
            </div>
            <h3 className="text-lg font-black text-white leading-tight truncate uppercase italic">
              {protocol.name}
            </h3>
            {protocol.description && (
              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                {protocol.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {protocol.scope === 'clinic' ? (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleEditProtocol(protocol.id); }}
                  className="p-2 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-400 transition-colors"
                  title="Editar"
                >
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleDeleteProtocol(protocol.id); }}
                  className="p-2 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-red-500/70 hover:text-red-400 transition-colors"
                  title="Excluir"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </>
            ) : scopeFilter === 'all' ? (
              <div className="space-y-10">
                {clinicProtocolsVisible.length > 0 && (
                  <section className="space-y-5">
                    <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#7CFF64]">
                        Protocolos da cl?nica
                      </span>
                      <span className="h-px flex-1 bg-slate-800" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        {clinicProtocolsVisible.length} item(ns)
                      </span>
                    </div>
                    {renderProtocolGrid(clinicProtocolsVisible)}
                  </section>
                )}

                {globalProtocolsVisible.length > 0 && (
                  <section className="space-y-5">
                    <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                        Protocolos globais
                      </span>
                      <span className="h-px flex-1 bg-slate-800" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        {globalProtocolsVisible.length} item(ns)
                      </span>
                    </div>
                    {renderProtocolGrid(globalProtocolsVisible)}
                  </section>
                )}
              </div>
            ) : scopeFilter === 'all' ? (
              <div className="space-y-10">
                {clinicProtocolsVisible.length > 0 && (
                  <section className="space-y-5">
                    <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#7CFF64]">
                        Protocolos da cl?nica
                      </span>
                      <span className="h-px flex-1 bg-slate-800" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        {clinicProtocolsVisible.length} item(ns)
                      </span>
                    </div>
                    {renderProtocolGrid(clinicProtocolsVisible)}
                  </section>
                )}

                {globalProtocolsVisible.length > 0 && (
                  <section className="space-y-5">
                    <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                        Protocolos globais
                      </span>
                      <span className="h-px flex-1 bg-slate-800" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        {globalProtocolsVisible.length} item(ns)
                      </span>
                    </div>
                    {renderProtocolGrid(globalProtocolsVisible)}
                  </section>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleOpenGlobalProtocol(protocol.id); }}
                disabled={isLoadingGlobalViewer}
                className="p-2 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-cyan-300 transition-colors"
                title="Visualizar"
              >
                <span className="material-symbols-outlined text-[20px]">visibility</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          {protocol.species && (
            <span className="text-[9px] font-black uppercase px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 tracking-wider">
              {protocol.species}
            </span>
          )}
          {protocol.is_control_special && (
            <span className="text-[9px] font-black uppercase px-2.5 py-1 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 tracking-wider">
              Controlado
            </span>
          )}
          {protocol.tags?.map(tag => (
            <span key={tag} className="text-[9px] font-black uppercase px-2.5 py-1 rounded bg-slate-800 text-slate-400 tracking-wider">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          {protocol.scope === 'global' && (
            <RxvButton
              variant="secondary"
              onClick={(e) => { e.stopPropagation(); handleOpenGlobalProtocol(protocol.id); }}
              loading={isLoadingGlobalViewer && selectedProtocolKey === `global:${protocol.id}`}
              className="w-full text-[10px] h-10 font-black tracking-widest uppercase"
            >
              Visualizar Protocolo
            </RxvButton>
          )}
          <RxvButton
            variant="secondary"
            onClick={(e) => { e.stopPropagation(); handleApplyToNovaReceita(protocol); }}
            className="w-full text-[10px] h-10 font-black tracking-widest uppercase"
          >
            Utilizar Protocolo
          </RxvButton>
        </div>
      </RxvCard>
    </div>
  )

  const renderProtocolGrid = (items: ProtocolListEntry[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {items.map((protocol) => renderProtocolCard(protocol))}
    </div>
  )

  if (!clinicId) {
    return (
      <ReceituarioChrome section="protocolos" title="Carregando...">
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-slate-500">Carregando cl?nica...</p>
        </div>
      </ReceituarioChrome>
    )
  }

  return (
    <ReceituarioChrome
      section="protocolos"
      title="Meus Protocolos"
      actions={
        <button
          type="button"
          className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm disabled:opacity-50"
          onClick={() => {
            clearProtocolDraft()
            if (modalOpen && editingProtocol && !editingProtocol.protocol.id) {
              handleCreateProtocol()
            }
          }}
          disabled={!hasProtocolDraft}
        >
          <span className="material-symbols-outlined text-[18px]">ink_eraser</span>
          Limpar rascunho
        </button>
      }
    >
      <div className="flex min-h-[calc(100vh-64px)] bg-[#0a0f0a]">
        {/* Sidebar: Pastas */}
        <aside className="w-64 border-r border-slate-800/50 bg-black/40 p-4 shrink-0 overflow-y-auto">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Pastas
            </h2>
            <button className="p-1 hover:bg-slate-800 rounded text-[#39ff14]">
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setSelectedFolderId(null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedFolderId === null ? 'bg-[#39ff14]/10 text-[#39ff14] border border-[#39ff14]/20' : 'text-slate-400 hover:bg-slate-800/50'
                }`}
            >
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Todos
            </button>
            {isLoadingFolders ? (
              <div className="flex items-center gap-2 px-3 py-2 text-slate-600">
                <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                <span className="text-xs">Carregando...</span>
              </div>
            ) : (
              folders.map(folder => (
                <div key={folder.id} className="group relative">
                  <button
                    onClick={() => setSelectedFolderId(folder.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all pr-8 ${selectedFolderId === folder.id ? 'bg-[#39ff14]/10 text-[#39ff14] border border-[#39ff14]/20' : 'text-slate-400 hover:bg-slate-800/50'
                      }`}
                  >
                    <span className="material-symbols-outlined text-[18px]" style={{ color: folder.color || undefined }}>{folder.icon_key || 'folder'}</span>
                    <span className="truncate">{folder.name}</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteFolder(folder.id, folder.name) }}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-red-900/30 text-red-500/60 hover:text-red-400 transition-all"
                    title="Excluir pasta"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                  </button>
                </div>
              ))
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Topbar IntermediÃƒÂ¡ria */}
          <div className="sticky top-0 z-30 border-b border-slate-800/50 bg-black/60 backdrop-blur-md px-8 py-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
              <h1 className="text-2xl font-black text-white italic tracking-tight uppercase leading-none">
                {selectedFolderId ? folders.find(f => f.id === selectedFolderId)?.name : 'Todos os Protocolos'}
              </h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1.5 opacity-80">
                {visibleProtocols.length} protocolos encontrados
              </p>
              <div className="mt-4 inline-flex rounded-2xl border border-slate-800 bg-black/40 p-1">
                {[
                  { value: 'all', label: 'Todos' },
                  { value: 'clinic', label: 'Da cl?nica' },
                  { value: 'global', label: 'Globais' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setScopeFilter(option.value as ProtocolScopeFilter)}
                    className={`rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-colors ${
                      scopeFilter === option.value
                        ? 'bg-[#39ff14]/15 text-[#7CFF64] border border-[#39ff14]/25'
                        : 'text-slate-500 hover:text-slate-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              </div>
              <div className="flex flex-col gap-3 xl:w-[28rem]">
                <label className="block">
                  <span className="sr-only">Buscar protocolo</span>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar protocolo por nome, descricao ou tag"
                      className="w-full rounded-2xl border border-slate-800 bg-black/40 py-3 pl-12 pr-4 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[#39ff14]/35"
                    />
                  </div>
                </label>
                <div className="flex justify-end">
                  <RxvButton variant="primary" onClick={handleCreateProtocol}>
                    + Novo Protocolo
                  </RxvButton>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {isLoadingProtocols ? (
              <div className="flex flex-col items-center justify-center py-20">
                <span className="material-symbols-outlined animate-spin text-[#39ff14] text-[48px]">sync</span>
                <p className="mt-4 text-slate-500 text-sm font-bold uppercase tracking-widest">Carregando protocolos...</p>
              </div>
            ) : visibleProtocols.length === 0 ? (
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-slate-800 text-[80px]">inventory_2</span>
                <p className="mt-4 text-xl font-bold text-slate-600">Nada por aqui</p>
                {searchQuery.trim() ? (
                  <p className="mt-2 text-sm text-slate-500">
                    Nenhum protocolo encontrado para esta busca.
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">
                    {scopeFilter === 'global'
                      ? 'Nenhum protocolo global disponivel neste momento.'
                      : 'Crie seu primeiro protocolo para agilizar seus atendimentos.'}
                  </p>
                )}
              </div>
            ) : (
              scopeFilter === 'all' ? (
                <div className="space-y-10">
                  {clinicProtocolsVisible.length > 0 && (
                    <section className="space-y-5">
                      <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#7CFF64]">
                          Protocolos da cl?nica
                        </span>
                        <span className="h-px flex-1 bg-slate-800" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                          {clinicProtocolsVisible.length} item(ns)
                        </span>
                      </div>
                      {renderProtocolGridV2(clinicProtocolsVisible)}
                    </section>
                  )}
                  {globalProtocolsVisible.length > 0 && (
                    <section className="space-y-5">
                      <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                          Protocolos globais
                        </span>
                        <span className="h-px flex-1 bg-slate-800" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                          {globalProtocolsVisible.length} item(ns)
                        </span>
                      </div>
                      {renderProtocolGridV2(globalProtocolsVisible)}
                    </section>
                  )}
                </div>
              ) : (
                renderProtocolGridV2(visibleProtocols)
              )
            )}
          </div>
        </main>
      </div>

      {/* Modal Criar/Editar Protocolo */}
      {modalOpen && editingProtocol && renderProtocolEditorModal()}
      {protocolMedicationModalOpen && editingProtocol && clinicId && (
        <AddMedicationModal2
          open={protocolMedicationModalOpen}
          onClose={() => setProtocolMedicationModalOpen(false)}
          onAdd={handleAddMedicationFromProtocolModal}
          clinicId={clinicId}
          patient={null}
          storageScope="protocol"
          title="Adicionar medicamento ao protocolo"
          subtitle="Busque no Catálogo 3.0 e configure apresentação, dose, frequência, duração e observações que devem entrar quando o protocolo for aplicado."
          confirmLabel="Adicionar ao protocolo"
          hideStartControls={true}
        />
      )}

      {false && modalOpen && editingProtocol && (
        <RxvModalShell zIndexClass="z-[90]" overlayClassName="bg-black/90 backdrop-blur-sm">
          <div className="mx-auto max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-[#2f5b25] bg-[#0a0f0a] text-slate-100 shadow-[0_0_60px_rgba(57,255,20,0.2)] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-black/60 px-8 py-6">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[9px] font-black uppercase px-2.5 py-1 rounded bg-[#39ff14]/10 text-[#7CFF64] border border-[#39ff14]/20 tracking-wider">
                    DA CL?NICA
                  </span>
                </div>
                <h2 className="text-xl font-black text-white italic uppercase tracking-tight">
                  {editingProtocol.protocol.id ? 'Editar Protocolo' : 'Novo Protocolo'}
                </h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Configure medicamentos e recomendaÃƒÂ§ÃƒÂµes prÃƒÂ©-definidas
                </p>
              </div>
              <div className="flex items-center gap-3">
                {canPublishGlobalProtocols && (
                  <RxvButton
                    variant="secondary"
                    onClick={handleOpenPublishGlobalModal}
                    disabled={!editingProtocol.protocol.id || isLoadingGlobalProtocols}
                    title={editingProtocol.protocol.id ? 'Publicar protocolo para todos os usuÃƒÂ¡rios' : 'Salve o protocolo local antes de publicar globalmente'}
                  >
                    {isLoadingGlobalProtocols ? 'Carregando vÃƒÂ­nculo...' : 'Salvar como global'}
                  </RxvButton>
                )}
                <RxvButton variant="secondary" onClick={() => { setModalOpen(false); setEditingProtocol(null); handleClosePublishGlobalModal(); }}>
                  Cancelar
                </RxvButton>
                <RxvButton variant="primary" onClick={handleSaveProtocol}>
                  Salvar
                </RxvButton>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {/* InformaÃƒÂ§ÃƒÂµes bÃƒÂ¡sicas */}
              <div className="space-y-6">
                <RxvField label="Nome do protocolo">
                  <RxvInput
                    placeholder="Ex: Dermatite AtÃƒÂ³pica"
                    value={editingProtocol.protocol.name}
                    onChange={(e) =>
                      setEditingProtocol({
                        ...editingProtocol,
                        protocol: { ...editingProtocol.protocol, name: e.target.value },
                      })
                    }
                  />
                </RxvField>

                <RxvField label="DescriÃƒÂ§ÃƒÂ£o">
                  <RxvTextarea
                    placeholder="DescriÃƒÂ§ÃƒÂ£o breve para ajudÃƒÂ¡-lo a encontrar no futuro..."
                    value={editingProtocol.protocol.description || ''}
                    onChange={(e) =>
                      setEditingProtocol({
                        ...editingProtocol,
                        protocol: { ...editingProtocol.protocol, description: e.target.value },
                      })
                    }
                    rows={2}
                  />
                </RxvField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RxvField label="Pasta">
                    <RxvSelect
                      value={editingProtocol.protocol.folder_id || ''}
                      onChange={(e) =>
                        setEditingProtocol({
                          ...editingProtocol,
                          protocol: { ...editingProtocol.protocol, folder_id: e.target.value || null },
                        })
                      }
                      options={[
                        { value: '', label: 'Nenhuma pasta (Raiz)' },
                        ...folders.map(f => ({ value: f.id, label: f.name })),
                      ]}
                    />
                  </RxvField>

                  <RxvField label="Tags (separadas por vÃƒÂ­rgula)">
                    <RxvInput
                      placeholder="Ex: dermatologia, pug, __inactive"
                      value={(editingProtocol.protocol.tags || []).join(', ')}
                      onChange={(e) =>
                        setEditingProtocol({
                          ...editingProtocol,
                          protocol: { ...editingProtocol.protocol, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) },
                        })
                      }
                    />
                  </RxvField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RxvField label="EspÃƒÂ©cie alvo">
                    <RxvSelect
                      value={editingProtocol.protocol.species || ''}
                      onChange={(e) =>
                        setEditingProtocol({
                          ...editingProtocol,
                          protocol: { ...editingProtocol.protocol, species: e.target.value || null },
                        })
                      }
                      options={[
                      { value: '', label: 'Ambas as especies' },
                      { value: 'Canina', label: 'Canina' },
                      { value: 'Felina', label: 'Felina' },
                    ]}
                    />
                  </RxvField>

                  <RxvField label="Controlado especial?">
                    <RxvSelect
                      value={editingProtocol.protocol.is_control_special ? 'true' : 'false'}
                      onChange={(e) =>
                        setEditingProtocol({
                          ...editingProtocol,
                          protocol: { ...editingProtocol.protocol, is_control_special: e.target.value === 'true' },
                        })
                      }
                      options={[
                        { value: 'false', label: 'NÃƒÂ£o (ReceituÃƒÂ¡rio Comum)' },
                        { value: 'true', label: 'Sim (NotificaÃƒÂ§ÃƒÂ£o/Portaria 344)' },
                      ]}
                    />
                  </RxvField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RxvField label="DuraÃƒÂ§ÃƒÂ£o Resumida">
                    <RxvInput
                      placeholder="Ex: 15 a 30 dias"
                      value={editingProtocol.protocol.duration_summary || ''}
                      onChange={(e) =>
                        setEditingProtocol({
                          ...editingProtocol,
                          protocol: { ...editingProtocol.protocol, duration_summary: e.target.value || null },
                        })
                      }
                    />
                  </RxvField>

                  <RxvField label="Justificativa Exames (Opcional)">
                    <RxvInput
                      placeholder="Justificativa padrÃƒÂ£o para exames"
                      value={editingProtocol.protocol.exams_justification || ''}
                      onChange={(e) =>
                        setEditingProtocol({
                          ...editingProtocol,
                          protocol: { ...editingProtocol.protocol, exams_justification: e.target.value || null },
                        })
                      }
                    />
                  </RxvField>
                </div>
              </div>

              {/* Medicamentos */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-black text-[#39ff14] uppercase tracking-widest italic">
                    Medicamentos do Protocolo
                  </h3>
                  <RxvButton
                    variant="secondary"
                    onClick={() => setMedicationSearchOpen(true)}
                    className="h-8 text-[10px]"
                  >
                    + Adicionar
                  </RxvButton>
                </div>

                {editingProtocol.medications.length === 0 ? (
                  <div className="bg-black/20 border border-dashed border-slate-800 rounded-2xl py-10 flex flex-col items-center">
                    <span className="material-symbols-outlined text-slate-700 text-[40px]">medical_services</span>
                    <p className="mt-2 text-xs text-slate-500 font-bold uppercase tracking-widest italic">
                      Nenhum medicamento configurado
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {editingProtocol.medications.map((med, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-black/40 border border-slate-800 hover:border-slate-700 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 group-hover:bg-[#39ff14]/10 group-hover:text-[#39ff14] transition-colors">
                            <span className="material-symbols-outlined text-[20px]">pill</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-white uppercase italic truncate">
                              {med.medication_name || med.manual_medication_name}
                            </p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5 truncate">
                              {med.manual_presentation_label || med.presentation_text || 'ApresentaÃƒÂ§ÃƒÂ£o nÃƒÂ£o definida'}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveMedication(idx)}
                            className="p-2 rounded-xl hover:bg-red-900/20 text-red-500/80 hover:text-red-400 transition-colors"
                            title="Remover"
                          >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-black/60 p-3 rounded-xl border border-slate-800/80 mt-3">
                          <RxvField label="Dose">
                            <RxvInput type="number" value={med.dose_value || ''} onChange={e => {
                              const up = [...editingProtocol.medications];
                              up[idx] = { ...med, dose_value: e.target.value ? parseFloat(e.target.value) : null };
                              setEditingProtocol({ ...editingProtocol, medications: up });
                            }} placeholder="Ex: 5" />
                          </RxvField>
                          <RxvField label="Unid">
                            <RxvInput value={med.dose_unit || ''} onChange={e => {
                              const up = [...editingProtocol.medications];
                              up[idx] = { ...med, dose_unit: e.target.value };
                              setEditingProtocol({ ...editingProtocol, medications: up });
                            }} placeholder="mg" />
                          </RxvField>
                          <RxvField label="Via">
                            <RxvInput value={med.route || ''} onChange={e => {
                              const up = [...editingProtocol.medications];
                              up[idx] = { ...med, route: e.target.value };
                              setEditingProtocol({ ...editingProtocol, medications: up });
                            }} placeholder="Ex: Oral" />
                          </RxvField>
                          <RxvField label="Vezes/dia">
                            <RxvInput type="number" value={med.times_per_day || ''} onChange={e => {
                              const up = [...editingProtocol.medications];
                              up[idx] = { ...med, frequency_type: 'times_per_day', times_per_day: e.target.value ? parseInt(e.target.value) : null };
                              setEditingProtocol({ ...editingProtocol, medications: up });
                            }} />
                          </RxvField>
                          <RxvField label="Dias">
                            <RxvInput type="number" value={med.duration_days || ''} onChange={e => {
                              const up = [...editingProtocol.medications];
                              up[idx] = { ...med, duration_days: e.target.value ? parseInt(e.target.value) : null };
                              setEditingProtocol({ ...editingProtocol, medications: up });
                            }} />
                          </RxvField>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* RecomendaÃƒÂ§ÃƒÂµes */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-black text-[#39ff14] uppercase tracking-widest italic">
                    RecomendaÃƒÂ§ÃƒÂµes e OrientaÃƒÂ§ÃƒÂµes
                  </h3>
                </div>

                <div className="space-y-4">
                  {editingProtocol.recommendations.map((rec, idx) => (
                    <div key={idx} className="relative group">
                      <RxvTextarea
                        placeholder="Ex: Oferecer ÃƒÂ¡gua fresca, evitar banhos frios..."
                        value={rec.text}
                        onChange={(e) => {
                          const updated = [...editingProtocol.recommendations]
                          updated[idx] = { ...rec, text: e.target.value }
                          setEditingProtocol({ ...editingProtocol, recommendations: updated })
                        }}
                        rows={2}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingProtocol.recommendations.filter((_, i) => i !== idx)
                          setEditingProtocol({ ...editingProtocol, recommendations: updated })
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all border border-slate-800"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() =>
                      setEditingProtocol({
                        ...editingProtocol,
                        recommendations: [
                          ...editingProtocol.recommendations,
                          { text: '', sort_order: editingProtocol.recommendations.length },
                        ],
                      })
                    }
                    className="w-full py-4 border border-dashed border-slate-800 rounded-2xl hover:border-[#39ff14]/30 hover:bg-[#39ff14]/5 transition-all group"
                  >
                    <span className="text-[10px] font-black text-slate-500 group-hover:text-[#39ff14] uppercase tracking-widest">
                      + Adicionar campo de recomendaÃƒÂ§ÃƒÂ£o
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </RxvModalShell>
      )}

      {globalProtocolViewer && (
        <RxvModalShell zIndexClass="z-[100]" overlayClassName="bg-black/90 backdrop-blur-sm">
          <div className="mx-auto max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#071014] text-slate-100 shadow-[0_0_60px_rgba(34,211,238,0.15)] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 bg-black/60 px-8 py-6">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[9px] font-black uppercase px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 tracking-wider">
                    GLOBAL
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    leitura
                  </span>
                </div>
                <h2 className="text-xl font-black text-white italic uppercase tracking-tight">
                  {globalProtocolViewer.protocol.name}
                </h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  DisponÃƒÂ­vel para todos os usuÃƒÂ¡rios
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseGlobalProtocol}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-slate-800 bg-black/30 p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">DescriÃƒÂ§ÃƒÂ£o</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">
                    {globalProtocolViewer.protocol.description || 'Sem descriÃƒÂ§ÃƒÂ£o.'}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-black/30 p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Metadados</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {globalProtocolViewer.protocol.species && (
                      <span className="text-[9px] font-black uppercase px-2.5 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 tracking-wider">
                        {globalProtocolViewer.protocol.species}
                      </span>
                    )}
                    {globalProtocolViewer.protocol.is_control_special && (
                      <span className="text-[9px] font-black uppercase px-2.5 py-1 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 tracking-wider">
                        Controlado
                      </span>
                    )}
                    {(globalProtocolViewer.protocol.tags || []).map((tag) => (
                      <span key={tag} className="text-[9px] font-black uppercase px-2.5 py-1 rounded bg-slate-800 text-slate-300 tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-black text-cyan-300 uppercase tracking-widest italic">
                    Medicamentos do Protocolo
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {globalProtocolViewer.medications.length} item(ns)
                  </span>
                </div>
                {globalProtocolViewer.medications.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-800 bg-black/20 px-4 py-8 text-center text-xs font-bold uppercase tracking-widest text-slate-500">
                    Nenhum medicamento configurado
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {globalProtocolViewer.medications.map((med, idx) => (
                      <div key={`${med.id || idx}`} className="rounded-2xl border border-slate-800 bg-black/30 p-4">
                        <p className="text-sm font-black text-white uppercase italic truncate">
                          {med.medication_name || med.manual_medication_name}
                        </p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 truncate">
                          {med.manual_presentation_label || med.presentation_text || 'ApresentaÃƒÂ§ÃƒÂ£o nÃƒÂ£o definida'}
                        </p>
                        <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-3 text-xs text-slate-300">
                          <div><span className="block text-[10px] uppercase tracking-widest text-slate-500">Dose</span>{med.dose_value || '-'} {med.dose_unit || ''}</div>
                          <div><span className="block text-[10px] uppercase tracking-widest text-slate-500">Via</span>{med.route || '-'}</div>
                          <div>
                            <span className="block text-[10px] uppercase tracking-widest text-slate-500">Freq.</span>
                            {med.frequency_type === 'times_per_day'
                              ? `${med.times_per_day || '-'}x/dia`
                              : med.frequency_type === 'interval_hours'
                                ? (med.interval_hours ? `${med.interval_hours}h` : '-')
                                : med.frequency_type === 'once_daily'
                                  ? '1x/dia'
                                  : med.frequency_type === 'as_needed'
                                    ? 'Se necessÃƒÂ¡rio'
                                    : '-'}
                          </div>
                          <div><span className="block text-[10px] uppercase tracking-widest text-slate-500">Dias</span>{med.duration_days || '-'}</div>
                          <div><span className="block text-[10px] uppercase tracking-widest text-slate-500">Origem</span>{med.global_medication_id ? 'CatÃƒÂ¡logo global' : 'Manual'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-black text-cyan-300 uppercase tracking-widest italic">
                    RecomendaÃƒÂ§ÃƒÂµes
                  </h3>
                </div>
                {(globalProtocolViewer.recommendations || []).length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-800 bg-black/20 px-4 py-8 text-center text-xs font-bold uppercase tracking-widest text-slate-500">
                    Nenhuma recomendaÃƒÂ§ÃƒÂ£o configurada
                  </div>
                ) : (
                  <div className="space-y-3">
                    {globalProtocolViewer.recommendations.map((recommendation, idx) => (
                      <div key={`${recommendation.id || idx}`} className="rounded-2xl border border-slate-800 bg-black/30 px-4 py-4 text-sm leading-relaxed text-slate-200">
                        {recommendation.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-black text-cyan-300 uppercase tracking-widest italic">
                    Exames
                  </h3>
                </div>
                {(globalProtocolViewer.examItems || []).length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-800 bg-black/20 px-4 py-8 text-center text-xs font-bold uppercase tracking-widest text-slate-500">
                    Nenhum exame configurado
                  </div>
                ) : (
                  <div className="space-y-3">
                    {globalProtocolViewer.examItems.map((exam, idx) => (
                      <div key={`${exam.id || idx}`} className="rounded-2xl border border-slate-800 bg-black/30 px-4 py-4">
                        <p className="text-sm font-bold text-white">{exam.label}</p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          {exam.is_custom ? 'Personalizado' : exam.exam_key || 'Exame'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-800 bg-black/50 px-8 py-5">
              {canPublishGlobalProtocols && (
                <RxvButton variant="danger" onClick={() => void handleDeleteGlobalProtocol()}>
                  Excluir global
                </RxvButton>
              )}
              <RxvButton
                variant="secondary"
                onClick={() => handleApplyToNovaReceita({ ...globalProtocolViewer.protocol, scope: 'global' })}
              >
                Utilizar Protocolo
              </RxvButton>
              <RxvButton variant="primary" onClick={handleDuplicateGlobalProtocol} loading={isDuplicatingGlobal}>
                Duplicar para minha cl?nica
              </RxvButton>
            </div>
          </div>
        </RxvModalShell>
      )}

      {publishGlobalOpen && publishGlobalDraft && editingProtocol && (
        <RxvModalShell zIndexClass="z-[110]" overlayClassName="bg-black/95 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-2xl rounded-2xl border border-[#2f5b25] bg-[#0a0f0a] text-slate-100 shadow-[0_0_60px_rgba(57,255,20,0.15)]">
            <div className="flex items-center justify-between border-b border-slate-800 bg-black/60 px-8 py-6">
              <div>
                <h2 className="text-xl font-black text-white italic uppercase tracking-tight">
                  Salvar como global
                </h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Publica este protocolo para todos os usuÃƒÂ¡rios via fluxo server-side
                </p>
              </div>
              <button
                type="button"
                onClick={handleClosePublishGlobalModal}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-6 px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RxvField label="Nome global do protocolo">
                  <RxvInput
                    value={publishGlobalDraft.name}
                    onChange={(e) =>
                      setPublishGlobalDraft({
                        ...publishGlobalDraft,
                        name: e.target.value,
                        slug: publishGlobalDraft.slug === slugifyProtocolName(editingProtocol.protocol.name)
                          ? slugifyProtocolName(e.target.value)
                          : publishGlobalDraft.slug,
                      })
                    }
                    placeholder="Ex: Gastroenterite aguda - base"
                  />
                </RxvField>

                <RxvField label="Slug sugerido">
                  <RxvInput
                    value={publishGlobalDraft.slug}
                    onChange={(e) =>
                      setPublishGlobalDraft({
                        ...publishGlobalDraft,
                        slug: slugifyProtocolName(e.target.value),
                      })
                    }
                    placeholder="gastroenterite-aguda-base"
                  />
                </RxvField>
              </div>

              <RxvField label="DescriÃƒÂ§ÃƒÂ£o">
                <RxvTextarea
                  rows={3}
                  value={publishGlobalDraft.description}
                  onChange={(e) =>
                    setPublishGlobalDraft({
                      ...publishGlobalDraft,
                      description: e.target.value,
                    })
                  }
                  placeholder="Resumo curto do protocolo global"
                />
              </RxvField>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RxvField label="EspÃƒÂ©cie">
                  <RxvSelect
                    value={publishGlobalDraft.species}
                    onChange={(e) =>
                      setPublishGlobalDraft({
                        ...publishGlobalDraft,
                        species: e.target.value,
                      })
                    }
                    options={[
                      { value: '', label: 'Ambas as especies' },
                      { value: 'Canina', label: 'Canina' },
                      { value: 'Felina', label: 'Felina' },
                    ]}
                  />
                </RxvField>

                <RxvField label="Modo de publicaÃƒÂ§ÃƒÂ£o">
                  <RxvSelect
                    value={publishGlobalDraft.mode}
                    onChange={(e) =>
                      setPublishGlobalDraft({
                        ...publishGlobalDraft,
                        mode: (e.target.value === 'update' && linkedGlobalProtocols.length ? 'update' : 'new') as PublishGlobalMode,
                        globalProtocolId:
                          e.target.value === 'update'
                            ? (publishGlobalDraft.globalProtocolId || linkedGlobalProtocols[0]?.id || '')
                            : '',
                      })
                    }
                    options={[
                      ...(linkedGlobalProtocols.length
                        ? [{ value: 'update', label: 'Atualizar global existente' }]
                        : []),
                      { value: 'new', label: 'Salvar como novo global' },
                    ]}
                  />
                </RxvField>
              </div>

              {linkedGlobalProtocols.length > 0 && publishGlobalDraft.mode === 'update' && (
                <RxvField label="Global vinculado">
                  <RxvSelect
                    value={publishGlobalDraft.globalProtocolId}
                    onChange={(e) =>
                      setPublishGlobalDraft({
                        ...publishGlobalDraft,
                        globalProtocolId: e.target.value,
                      })
                    }
                    options={linkedGlobalProtocols.map((protocol) => ({
                      value: protocol.id,
                      label: `${protocol.name} Ã¢â‚¬Â¢ slug ${protocol.slug} Ã¢â‚¬Â¢ v${protocol.version}`,
                    }))}
                  />
                </RxvField>
              )}

              <RxvField label="Tags">
                <RxvInput
                  value={publishGlobalDraft.tagsText}
                  onChange={(e) =>
                    setPublishGlobalDraft({
                      ...publishGlobalDraft,
                      tagsText: e.target.value,
                    })
                  }
                  placeholder="Ex: gastro, base, editable"
                />
              </RxvField>

              {linkedGlobalProtocols.length > 0 ? (
                <div className="rounded-2xl border border-slate-800 bg-black/30 px-4 py-4 text-xs text-slate-400 leading-relaxed">
                  {publishGlobalDraft.mode === 'update'
                    ? 'O protocolo global selecionado terÃƒÂ¡ versÃƒÂ£o incrementada e os itens filhos serÃƒÂ£o substituÃƒÂ­dos pelo conteÃƒÂºdo atual do protocolo local.'
                    : 'Este protocolo local jÃƒÂ¡ possui vÃƒÂ­nculo global. Se escolher salvar como novo, um novo registro global serÃƒÂ¡ criado mantendo a rastreabilidade da origem.'}
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-800 bg-black/30 px-4 py-4 text-xs text-slate-400 leading-relaxed">
                  Ser? criado um protocolo global novo, com rastreabilidade para o protocolo local e a cl?nica de origem.
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-800 bg-black/50 px-8 py-5">
              <RxvButton variant="secondary" onClick={handleClosePublishGlobalModal}>
                Cancelar
              </RxvButton>
              <RxvButton variant="primary" onClick={handlePublishGlobalProtocol} loading={isPublishingGlobal}>
                {publishGlobalDraft.mode === 'update' ? 'Atualizar global' : 'Publicar global'}
              </RxvButton>
            </div>
          </div>
        </RxvModalShell>
      )}

      {/* Modal Buscar Medicamentos */}
      {medicationSearchOpen && (
        <RxvModalShell zIndexClass="z-[100]" overlayClassName="bg-black/95 backdrop-blur-md">
          <div className="mx-auto flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-[#39ff14]/30 bg-black shadow-[0_0_80px_rgba(57,255,20,0.2)]">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-8 py-5">
              <div>
                <h2 className="text-lg font-black uppercase italic tracking-tight text-white">
                  {presentationPickerMedication ? 'Escolher apresentacao' : 'Buscar no Catalogo'}
                </h2>
                {presentationPickerMedication ? (
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {presentationPickerMedication.name}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => {
                  setPresentationPickerMedication(null)
                  setPresentationOptions([])
                  setMedicationSearchOpen(false)
                  setMedicationSearchQuery('')
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/50 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {!presentationPickerMedication && (
              <div className="bg-black p-6">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
                  <input
                    placeholder="Nome do farmaco ou principio ativo..."
                    value={medicationSearchQuery}
                    onChange={(e) => setMedicationSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900 py-4 pl-12 pr-4 font-bold text-white outline-none transition-all placeholder:text-slate-700 focus:border-[#39ff14]/50"
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-2">
              {presentationPickerMedication ? (
                <>
                  <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3">
                    <p className="text-xs font-semibold text-slate-300">
                      Escolha uma apresentacao comercial ou adicione o medicamento sem travar a apresentacao.
                    </p>
                    <RxvButton
                      variant="secondary"
                      onClick={() => {
                        setPresentationPickerMedication(null)
                        setPresentationOptions([])
                      }}
                    >
                      Voltar
                    </RxvButton>
                  </div>

                  <button
                    type="button"
                    onClick={handleSelectMedicationWithoutPresentation}
                    className="w-full rounded-2xl border border-dashed border-[#39ff14]/30 bg-[#39ff14]/6 p-4 text-left transition-all hover:border-[#39ff14]/60 hover:bg-[#39ff14]/10"
                  >
                    <p className="text-sm font-black uppercase italic text-[#9eff8f]">
                      Adicionar sem apresentacao definida
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      A apresentacao podera ser escolhida depois, na Nova Receita 2.0, conforme o paciente.
                    </p>
                  </button>

                  {isLoadingPresentationOptions ? (
                    <div className="flex flex-col items-center justify-center py-10 opacity-50">
                      <span className="material-symbols-outlined animate-spin text-[#39ff14]">sync</span>
                      <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Carregando apresentacoes...</p>
                    </div>
                  ) : presentationOptions.length === 0 ? (
                    <div className="py-10 text-center">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
                        Nenhuma apresentacao encontrada
                      </p>
                    </div>
                  ) : (
                    presentationOptions.map((presentation) => (
                      <button
                        key={presentation.id}
                        type="button"
                        onClick={() => handleSelectMedicationPresentation(presentation)}
                        className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-left transition-all group hover:border-[#39ff14]/40 hover:bg-slate-900"
                      >
                        <p className="text-sm font-black uppercase italic text-white transition-colors group-hover:text-[#39ff14]">
                          {buildPresentationLabel(presentation) || 'Apresentacao'}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {presentation.source && (
                            <span className="rounded border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[8px] font-black uppercase text-cyan-300">
                              {presentation.source === 'global' ? 'GLOBAL' : 'CL?NICA'}
                            </span>
                          )}
                          {presentation.presentation_unit && (
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                              Unidade: {presentation.presentation_unit}
                            </span>
                          )}
                        </div>
                      </button>
                    ))
                  )}
                </>
              ) : isSearchingMedications ? (
                <div className="flex flex-col items-center justify-center py-10 opacity-50">
                  <span className="material-symbols-outlined animate-spin text-[#39ff14]">sync</span>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Pesquisando catalogo...</p>
                </div>
              ) : medications.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
                    {medicationSearchQuery.trim() ? 'Nenhum resultado encontrado' : 'Inicie a busca digitando acima'}
                  </p>
                </div>
              ) : (
                medications.map((med) => (
                  <button
                    key={med.id}
                    type="button"
                    onClick={() => handleAddMedicationToDraft(med)}
                    className="group flex w-full items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-left transition-all hover:border-[#39ff14]/40 hover:bg-slate-900"
                  >
                    <div>
                      <p className="text-sm font-black uppercase italic text-white transition-colors group-hover:text-[#39ff14]">
                        {med.name}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        {med.default_route && (
                          <span className="mr-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
                            Via: {med.default_route}
                          </span>
                        )}
                        {med.is_controlled && (
                          <span className="rounded border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[8px] font-black uppercase text-red-500">
                            CONTROLADO
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-700 transition-colors group-hover:text-[#39ff14]">add_circle</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </RxvModalShell>
      )}
    </ReceituarioChrome>
  )
}


