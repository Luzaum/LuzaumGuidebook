// ✅ Protocolos 3.0 — Refatoração Completa (100% Supabase)
// 🚫 ZERO localStorage, ZERO rxDb, ZERO mistura de fontes

import React, { useState, useEffect, useCallback } from 'react'
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
} from '../../src/components/receituario/RxvComponents'
import {
  listFolders,
  listProtocols,
  loadProtocolBundle,
  saveProtocolBundle,
  deleteProtocol,
<<<<<<< Updated upstream
=======
  createFolder,
  deleteFolder,
  ensureDefaultSpecialtyProtocolSeed,
>>>>>>> Stashed changes
  type ProtocolFolderRecord,
  type ProtocolRecord,
  type ProtocolBundle,
  type ProtocolMedicationItem,
  type ProtocolRecommendation,
} from '../../src/lib/protocols/protocolsRepo'
import { safeStringify } from '../../src/lib/clinicScopedDb'
import {
  mapProtocolMedicationToPrescriptionItem,
  mapProtocolRecommendationsToString,
} from './protocolMapper'
import {
  searchMedications,
  getMedicationPresentations,
} from '../../src/lib/clinicRecords'
import { useLocalDraft } from '../../hooks/useLocalDraft'

// ==================== TYPES ====================

interface MedicationSearchResult {
  id: string
  name: string
  is_controlled: boolean
  pharmacy_origin?: string
  default_route?: string
}

interface PresentationRecord {
  id: string
  medication_id: string
  pharmaceutical_form: string | null
  concentration_text: string | null
  commercial_name: string | null
  is_default?: boolean
}

// ==================== COMPONENT ====================

export default function Protocolos3Page() {
  const navigate = useNavigate()
  const { clinicId } = useClinic()
  const [userId, setUserId] = useState<string | null>(null)

  // ✅ Estado: lista de pastas e protocolos
  const [folders, setFolders] = useState<ProtocolFolderRecord[]>([])
  const [protocols, setProtocols] = useState<ProtocolRecord[]>([])
  const [isLoadingFolders, setIsLoadingFolders] = useState(false)
  const [isLoadingProtocols, setIsLoadingProtocols] = useState(false)

  // ✅ Estado: seleção STITCH layout
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [selectedProtocolId, setSelectedProtocolId] = useState<string | null>(null)
  const [selectedProtocolBundle, setSelectedProtocolBundle] = useState<ProtocolBundle | null>(null)

  // ✅ Estado: modal criar/editar protocolo
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

<<<<<<< Updated upstream
=======
  // ✅ Estado: criar pasta
  const [createFolderOpen, setCreateFolderOpen] = useState(false)
  const [createFolderName, setCreateFolderName] = useState('')
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)


>>>>>>> Stashed changes
  // ✅ Estado: busca de medicamentos
  const [medicationSearchOpen, setMedicationSearchOpen] = useState(false)
  const [medicationSearchQuery, setMedicationSearchQuery] = useState('')
  const [medications, setMedications] = useState<MedicationSearchResult[]>([])
  const [isSearchingMedications, setIsSearchingMedications] = useState(false)

  // ==================== EFFECTS ====================

  // ✅ Obter userId do Supabase
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUserId(data.user.id)
        console.log('[Protocolos3] userId', data.user.id)
      }
    })
  }, [])

  // ✅ Carregar pastas (apenas após clinicId e userId estarem definidos)
  useEffect(() => {
    if (!clinicId || !userId) {
      console.log('[Protocolos3] Aguardando clinicId e userId', { clinicId, userId })
      return
    }

    console.log('[Protocolos3] Carregando folders', { clinicId, userId })
    setIsLoadingFolders(true)

    listFolders(clinicId, userId)
<<<<<<< Updated upstream
      .then((data) => {
        console.log('[Protocolos3] Folders carregados', data)
        setFolders(data)
=======
      .then(async (data) => {
        console.log('[Protocolos3] Folders carregados', data)
        await ensureDefaultSpecialtyProtocolSeed(clinicId, userId)
        const [refreshedFolders, refreshedProtocols] = await Promise.all([
          listFolders(clinicId, userId),
          listProtocols(clinicId, userId),
        ])
        setFolders(refreshedFolders)
        setProtocols(refreshedProtocols)
>>>>>>> Stashed changes
      })
      .catch((err) => {
        console.error('[Protocolos3] Erro ao carregar folders', err)
        setFolders([])
      })
      .finally(() => setIsLoadingFolders(false))
  }, [clinicId, userId])

  // ✅ Carregar protocolos (apenas após clinicId e userId estarem definidos)
  useEffect(() => {
    if (!clinicId || !userId) {
      console.log('[Protocolos3] Aguardando clinicId e userId para protocolos', { clinicId, userId })
      return
    }

    console.log('[Protocolos3] Carregando protocols', { clinicId, userId })
    setIsLoadingProtocols(true)

    listProtocols(clinicId, userId)
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

  // ✅ Busca de medicamentos (Catálogo 3.0) com debounce
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
    if (!modalOpen) return
    if (!hasProtocolDraft || !protocolDraft) return
    if (!editingProtocol) return
    if (editingProtocol.protocol.id) return
    setEditingProtocol(protocolDraft)
  }, [modalOpen, hasProtocolDraft, protocolDraft, editingProtocol])

  useEffect(() => {
    if (!modalOpen || !editingProtocol) return
    if (editingProtocol.protocol.id) return
    setProtocolDraft(editingProtocol)
  }, [modalOpen, editingProtocol, setProtocolDraft])

  // ==================== HANDLERS ====================

  const handleCreateProtocol = useCallback(() => {
    if (!clinicId || !userId) return

    setEditingProtocol({
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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      medications: [],
      recommendations: [],
      // NOTE: no exam_items — table does not exist in this schema
    })
    setModalOpen(true)
  }, [clinicId, userId, selectedFolderId])

  const handleEditProtocol = useCallback(
    async (protocolId: string) => {
      if (!clinicId || !userId) return

      try {
        console.log('[Protocolos3] Carregando protocolo para edição', protocolId)
        const bundle = await loadProtocolBundle(clinicId, userId, protocolId)
        if (bundle) {
          setEditingProtocol(bundle)
          setModalOpen(true)
        }
      } catch (err) {
        console.error('[Protocolos3] Erro ao carregar protocolo', err)
      }
    },
    [clinicId, userId]
  )

  const handleSaveProtocol = useCallback(async () => {
    if (!clinicId || !userId || !editingProtocol) return

    try {
      console.log('[Protocolos3] Salvando protocolo', editingProtocol.protocol.name)
      await saveProtocolBundle(clinicId, userId, editingProtocol)

      // Recarregar lista
      const updatedProtocols = await listProtocols(clinicId, userId)
      console.log('[Protocolos3] Protocols recarregados após salvar', updatedProtocols)
      setProtocols(updatedProtocols)

      setModalOpen(false)
      setEditingProtocol(null)
      clearProtocolDraft()
    } catch (err) {
      console.error('[Protocolos3] Erro ao salvar protocolo', err)
      const errorDetails = safeStringify(err)
      console.error('[Protocolos3] Detalhes do erro:', errorDetails)
      alert(`Falha ao salvar protocolo\n\nDetalhes:\n${errorDetails}`)
    }
  }, [clinicId, userId, editingProtocol])

  const handleDeleteProtocol = useCallback(
    async (protocolId: string) => {
      if (!clinicId || !userId) return
      if (!confirm('Deseja realmente excluir este protocolo?')) return

      try {
        console.log('[Protocolos3] Excluindo protocolo', protocolId)
        await deleteProtocol(clinicId, userId, protocolId)

        // Recarregar lista
        const updatedProtocols = await listProtocols(clinicId, userId)
        console.log('[Protocolos3] Protocols recarregados após exclusão', updatedProtocols)
        setProtocols(updatedProtocols)
      } catch (err) {
        console.error('[Protocolos3] Erro ao excluir protocolo', err)
        const errorDetails = safeStringify(err)
        console.error('[Protocolos3] Detalhes do erro de exclusão:', errorDetails)
        alert(`Falha ao excluir protocolo\n\nDetalhes:\n${errorDetails}`)
      }
    },
    [clinicId, userId]
  )

  const handleApplyToNovaReceita = useCallback(
    async (protocolId: string) => {
      if (!clinicId || !userId) {
        alert('Clínica ou usuário não identificado.')
        return
      }

      try {
        console.log('[Protocolos3] Carregando protocolo para aplicar em Nova Receita', protocolId)

        // Carregar bundle completo do protocolo
        const bundle = await loadProtocolBundle(clinicId, userId, protocolId)
        if (!bundle) {
          alert('Protocolo não encontrado.')
          return
        }

        // Converter medicamentos do protocolo para itens da receita
        const prescriptionItems = bundle.medications.map(mapProtocolMedicationToPrescriptionItem)

        // Converter recomendações para string
        const recommendationsText = mapProtocolRecommendationsToString(bundle.recommendations)

        // Construir payload para navegação
        const payload = {
          items: prescriptionItems,
          recommendations: recommendationsText,
          sourceProtocol: {
            id: bundle.protocol.id,
            name: bundle.protocol.name,
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

      setSelectedProtocolId(protocolId)
      setSelectedProtocolBundle(null) // Clear previous bundle while loading

      try {
        console.log('[Protocolos3] Carregando detalhes do protocolo', protocolId)
        const bundle = await loadProtocolBundle(clinicId, userId, protocolId)
        if (bundle) {
          setSelectedProtocolBundle(bundle)
          console.log('[Protocolos3] Protocolo carregado com sucesso', bundle.protocol.name)
        } else {
          console.error('[Protocolos3] Protocolo não encontrado', protocolId)
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

  const handleAddMedication = useCallback(
    async (medication: MedicationSearchResult) => {
      if (!clinicId || !editingProtocol) return

      try {
        console.log('[Protocolos3] Adicionando medicamento', medication.name)

        // Buscar apresentações do medicamento
        const presentations = await getMedicationPresentations(clinicId, medication.id)
        const defaultPresentation = presentations[0] // Use first available presentation

        if (!defaultPresentation) {
          alert('Medicamento não possui apresentações cadastradas.')
          return
        }

        // Create item — only fields that exist in the DB schema
        const newItem: ProtocolMedicationItem = {
          medication_id: medication.id,
          presentation_id: defaultPresentation.id,
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
          // NOTE: no `instructions` — column does not exist in DB
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

  // ==================== RENDER ====================

  if (!clinicId) {
    return (
      <ReceituarioChrome section="protocolos" title="Carregando...">
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-slate-500">Carregando clínica...</p>
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
<<<<<<< Updated upstream
            {folders.map(folder => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolderId(folder.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedFolderId === folder.id ? 'bg-[#39ff14]/10 text-[#39ff14] border border-[#39ff14]/20' : 'text-slate-400 hover:bg-slate-800/50'
                  }`}
              >
                <span className="material-symbols-outlined text-[18px]">folder</span>
                {folder.name}
              </button>
            ))}
=======
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

>>>>>>> Stashed changes
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Topbar Intermediária */}
          <div className="sticky top-0 z-30 border-b border-slate-800/50 bg-black/60 backdrop-blur-md px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-white italic tracking-tight uppercase leading-none">
                {selectedFolderId ? folders.find(f => f.id === selectedFolderId)?.name : 'Todos os Protocolos'}
              </h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1.5 opacity-80">
                {protocols.length} protocolos encontrados
              </p>
            </div>
            <RxvButton variant="primary" onClick={handleCreateProtocol}>
              + Novo Protocolo
            </RxvButton>
          </div>

          <div className="p-8">
            {isLoadingProtocols ? (
              <div className="flex flex-col items-center justify-center py-20">
                <span className="material-symbols-outlined animate-spin text-[#39ff14] text-[48px]">sync</span>
                <p className="mt-4 text-slate-500 text-sm font-bold uppercase tracking-widest">Carregando catálogo...</p>
              </div>
            ) : protocols.filter(p => !selectedFolderId || p.folder_id === selectedFolderId).length === 0 ? (
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-slate-800 text-[80px]">inventory_2</span>
                <p className="mt-4 text-xl font-bold text-slate-600">Nada por aqui</p>
                <p className="mt-2 text-sm text-slate-500">Crie seu primeiro protocolo para agilizar seus atendimentos.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {protocols
                  .filter(p => !selectedFolderId || p.folder_id === selectedFolderId)
                  .map((protocol) => (
                    <div
                      key={protocol.id}
                      onClick={() => handleSelectProtocol(protocol.id)}
                      className="group"
                    >
                      <RxvCard
                        className={`p-6 h-full transition-all border-l-4 ${selectedProtocolId === protocol.id ? 'border-l-[#39ff14] bg-[#39ff14]/10 shadow-[0_0_30px_rgba(57,255,20,0.1)]' : 'border-l-transparent hover:border-l-slate-700'
                          }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1 min-w-0 pr-4">
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
                            <span key={tag} className="text-[9px] font-black uppercase px-2.5 py-1 rounded bg-slate-800 text-slate-500 tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <RxvButton
                          variant="secondary"
                          onClick={(e) => { e.stopPropagation(); handleApplyToNovaReceita(protocol.id); }}
                          className="w-full text-[10px] h-10 font-black tracking-widest uppercase mt-auto"
                        >
                          Utilizar Protocolo
                        </RxvButton>
                      </RxvCard>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal Criar/Editar Protocolo */}
      {modalOpen && editingProtocol && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4 py-8">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-[#2f5b25] bg-[#0a0f0a] text-slate-100 shadow-[0_0_60px_rgba(57,255,20,0.2)] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-black/60 px-8 py-6">
              <div>
                <h2 className="text-xl font-black text-white italic uppercase tracking-tight">
                  {editingProtocol.protocol.id ? 'Editar Protocolo' : 'Novo Protocolo'}
                </h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Configure medicamentos e recomendações pré-definidas
                </p>
              </div>
              <div className="flex items-center gap-3">
                <RxvButton variant="secondary" onClick={() => { setModalOpen(false); setEditingProtocol(null); }}>
                  Cancelar
                </RxvButton>
                <RxvButton variant="primary" onClick={handleSaveProtocol}>
                  Salvar
                </RxvButton>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {/* Informações básicas */}
              <div className="space-y-6">
                <RxvField label="Nome do protocolo">
                  <RxvInput
                    placeholder="Ex: Dermatite Atópica"
                    value={editingProtocol.protocol.name}
                    onChange={(e) =>
                      setEditingProtocol({
                        ...editingProtocol,
                        protocol: { ...editingProtocol.protocol, name: e.target.value },
                      })
                    }
                  />
                </RxvField>

                <RxvField label="Descrição">
                  <RxvTextarea
                    placeholder="Descrição breve para ajudá-lo a encontrar no futuro..."
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

                  <RxvField label="Tags (separadas por vírgula)">
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
                  <RxvField label="Espécie alvo">
                    <RxvSelect
                      value={editingProtocol.protocol.species || ''}
                      onChange={(e) =>
                        setEditingProtocol({
                          ...editingProtocol,
                          protocol: { ...editingProtocol.protocol, species: e.target.value || null },
                        })
                      }
                      options={[
                        { value: '', label: 'Todas as espécies' },
                        { value: 'Canina', label: 'Canina' },
                        { value: 'Felina', label: 'Felina' },
                        { value: 'Equina', label: 'Equina' },
                        { value: 'Outros', label: 'Outras' },
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
                        { value: 'false', label: 'Não (Receituário Comum)' },
                        { value: 'true', label: 'Sim (Notificação/Portaria 344)' },
                      ]}
                    />
                  </RxvField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RxvField label="Duração Resumida">
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
                      placeholder="Justificativa padrão para exames"
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
                              {med.manual_presentation_label || 'Apresentação não definida'}
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

              {/* Recomendações */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-black text-[#39ff14] uppercase tracking-widest italic">
                    Recomendações e Orientações
                  </h3>
                </div>

                <div className="space-y-4">
                  {editingProtocol.recommendations.map((rec, idx) => (
                    <div key={idx} className="relative group">
                      <RxvTextarea
                        placeholder="Ex: Oferecer água fresca, evitar banhos frios..."
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
                      + Adicionar campo de recomendação
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Buscar Medicamentos */}
      {medicationSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md px-4">
          <div className="max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-[#39ff14]/30 bg-black shadow-[0_0_80px_rgba(57,255,20,0.2)] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-8 py-5">
              <h2 className="text-lg font-black text-white uppercase italic italic tracking-tight">Buscar no Catálogo</h2>
              <button
                type="button"
                onClick={() => {
                  setMedicationSearchOpen(false)
                  setMedicationSearchQuery('')
                }}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="p-6 bg-black">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
                <input
                  placeholder="Nome do fármaco ou princípio ativo..."
                  value={medicationSearchQuery}
                  onChange={(e) => setMedicationSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white font-bold outline-none focus:border-[#39ff14]/50 transition-all placeholder:text-slate-700"
                />
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-2">
              {isSearchingMedications ? (
                <div className="flex flex-col items-center justify-center py-10 opacity-50">
                  <span className="material-symbols-outlined animate-spin text-[#39ff14]">sync</span>
                  <p className="mt-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">Pesquisando catálogo...</p>
                </div>
              ) : medications.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">
                    {medicationSearchQuery.trim() ? 'Nenhum resultado encontrado' : 'Inicie a busca digitando acima'}
                  </p>
                </div>
              ) : (
                medications.map((med) => (
                  <button
                    key={med.id}
                    type="button"
                    onClick={() => handleAddMedication(med)}
                    className="w-full text-left p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-[#39ff14]/40 hover:bg-slate-900 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-sm font-black text-white uppercase italic group-hover:text-[#39ff14] transition-colors">
                        {med.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {med.default_route && (
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mr-2">
                            Via: {med.default_route}
                          </span>
                        )}
                        {med.is_controlled && (
                          <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded bg-red-500/10 text-red-500 border border-red-500/20">
                            CONTROLADO
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-700 group-hover:text-[#39ff14] transition-colors">add_circle</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </ReceituarioChrome>
  )
}
