import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ReceituarioChrome from './ReceituarioChrome'
import { useClinic } from '../../src/components/ClinicProvider'

// ==================== TIPOS ====================

interface Medication {
  id: string
  name: string
  notes: string | null
  is_controlled: boolean
  created_at: string
}

interface Presentation {
  id?: string
  client_id: string
  pharmaceutical_form: string
  commercial_name: string | null
  value: number | null
  value_unit: string
  per_value: number
  per_unit: string
  avg_price_brl: number | null
  pharmacy_veterinary: boolean
  pharmacy_human: boolean
  pharmacy_compounding: boolean
  // Front-end only fields (MVP - não enviados ao Supabase se não existirem na schema)
  manufacturer?: string
  package_quantity?: number
  package_unit?: string
}

interface MedicationWithPresentations extends Medication {
  presentations: Presentation[]
}

// ==================== CONSTANTES ====================

const PHARMACEUTICAL_FORMS = [
  'Comprimido',
  'Cápsula',
  'Solução oral',
  'Suspensão oral',
  'Gotas',
  'Injetável',
  'Ampola',
  'Pomada',
  'Spray'
]

const VALUE_UNITS = ['mg', 'g', 'mcg', 'UI', 'mL', 'L', '%']
const PER_UNITS = ['comprimido', 'cápsula', 'mL', 'gota', 'ampola', 'sachê', 'envelope', 'frasco']

// ==================== HELPERS ====================

function createEmptyPresentation(): Presentation {
  return {
    client_id: crypto.randomUUID(),
    pharmaceutical_form: 'Comprimido',
    commercial_name: null,
    value: null,
    value_unit: 'mg',
    per_value: 1,
    per_unit: 'comprimido',
    avg_price_brl: null,
    pharmacy_veterinary: true,
    pharmacy_human: false,
    pharmacy_compounding: false,
    manufacturer: '',
    package_quantity: undefined,
    package_unit: ''
  }
}

function createEmptyMedication(): MedicationWithPresentations {
  return {
    id: '',
    name: '',
    notes: null,
    is_controlled: false,
    created_at: new Date().toISOString(),
    presentations: [createEmptyPresentation()]
  }
}

// ==================== COMPONENTE PRINCIPAL ====================

export default function Catalogo2Page() {
  // ==================== CLINIC CONTEXT ====================
  const { loading: clinicLoading, clinicId, clinicName } = useClinic()

  // ==================== STATE ====================
  const [medications, setMedications] = useState<MedicationWithPresentations[]>([])
  const [selectedId, setSelectedId] = useState<string>('')
  const [draft, setDraft] = useState<MedicationWithPresentations>(createEmptyMedication())
  const [originalDraft, setOriginalDraft] = useState<MedicationWithPresentations>(createEmptyMedication())
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [showUnsavedModal, setShowUnsavedModal] = useState(false)
  const [pendingMedication, setPendingMedication] = useState<MedicationWithPresentations | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // ==================== COMPUTED ====================

  const isDirty = useMemo(() => {
    return JSON.stringify(draft) !== JSON.stringify(originalDraft)
  }, [draft, originalDraft])

  const filteredMedications = useMemo(() => {
    if (!searchQuery.trim()) return medications
    const query = searchQuery.toLowerCase()
    return medications.filter((med) => med.name.toLowerCase().includes(query))
  }, [medications, searchQuery])

  // ==================== MOUNT LOG ====================
  useEffect(() => {
    console.log('[Catalogo2Page] MOUNTED ✅', new Date().toISOString())
    console.log('[Clinic] clinicId =', clinicId, ', clinicName =', clinicName)
  }, [clinicId, clinicName])

  // ==================== CARREGAR MEDICAMENTOS ====================
  useEffect(() => {
    if (clinicLoading) {
      console.log('[Catalogo2] Waiting for clinic context to load...')
      return
    }
    if (!clinicId) {
      console.error('[Catalogo2] ❌ No clinic ID after clinic loaded')
      setLoading(false)
      return
    }
    loadMedications()
  }, [clinicLoading, clinicId])

  async function loadMedications() {
    try {
      console.log('[Catalogo2] Loading medications from Supabase for clinic:', clinicId)
      setLoading(true)

      if (!clinicId) {
        console.error('[Catalogo2] ❌ No clinic ID available')
        setLoading(false)
        return
      }

      // Importar funções do clinicRecords
      const { listMedications, getMedicationPresentations } = await import('../../src/lib/clinicRecords')

      // Buscar medications
      const meds = await listMedications(clinicId)
      console.log('[Catalogo2] Loaded', meds.length, 'medications')

      // Buscar presentations de cada medication
      const medsWithPres: MedicationWithPresentations[] = await Promise.all(
        meds.map(async (med) => {
          const pres = await getMedicationPresentations(clinicId, med.id)

          return {
            ...med,
            presentations: pres.map((p) => ({
              id: p.id,
              client_id: crypto.randomUUID(),
              pharmaceutical_form: p.pharmaceutical_form || 'Comprimido',
              commercial_name: p.commercial_name,
              value: p.value,
              value_unit: p.value_unit || 'mg',
              per_value: p.per_value ?? 1,
              per_unit: p.per_unit || 'comprimido',
              avg_price_brl: p.avg_price_brl,
              pharmacy_veterinary: p.pharmacy_veterinary || false,
              pharmacy_human: p.pharmacy_human || false,
              pharmacy_compounding: p.pharmacy_compounding || false,
              manufacturer: '',
              package_quantity: undefined,
              package_unit: ''
            }))
          }
        })
      )

      setMedications(medsWithPres)

      // Selecionar primeiro se existir
      if (medsWithPres.length > 0 && !selectedId) {
        const firstMed = medsWithPres[0]
        setSelectedId(firstMed.id)
        setDraft(JSON.parse(JSON.stringify(firstMed)))
        setOriginalDraft(JSON.parse(JSON.stringify(firstMed)))
      }

      setLoading(false)
    } catch (error) {
      console.error('[Catalogo2] Load error:', error)
      setErrors({ load: `Erro ao carregar: ${error instanceof Error ? error.message : String(error)}` })
      setLoading(false)
    }
  }

  // ==================== HANDLERS ====================

  function attemptSelectMedication(med: MedicationWithPresentations) {
    if (isDirty) {
      setPendingMedication(med)
      setShowUnsavedModal(true)
    } else {
      selectMedication(med)
    }
  }

  function selectMedication(med: MedicationWithPresentations) {
    setSelectedId(med.id)
    const copy = JSON.parse(JSON.stringify(med))
    setDraft(copy)
    setOriginalDraft(copy)
    setErrors({})
    setShowUnsavedModal(false)
    setPendingMedication(null)
  }

  function discardAndSelect() {
    if (pendingMedication) {
      selectMedication(pendingMedication)
    }
  }

  function createNew() {
    if (isDirty) {
      setPendingMedication(createEmptyMedication())
      setShowUnsavedModal(true)
    } else {
      const newMed = createEmptyMedication()
      setSelectedId('')
      setDraft(newMed)
      setOriginalDraft(newMed)
      setErrors({})
    }
  }

  function updatePresentation(client_id: string, updates: Partial<Presentation>) {
    setDraft((prev) => ({
      ...prev,
      presentations: prev.presentations.map((p) =>
        p.client_id === client_id ? { ...p, ...updates } : p
      )
    }))
  }

  function addPresentation() {
    setDraft((prev) => ({
      ...prev,
      presentations: [...prev.presentations, createEmptyPresentation()]
    }))
  }

  function removePresentation(client_id: string) {
    setDraft((prev) => ({
      ...prev,
      presentations: prev.presentations.filter((p) => p.client_id !== client_id)
    }))
  }

  // ==================== VALIDAÇÃO ====================

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {}

    // Validar nome
    if (!draft.name.trim()) {
      newErrors.name = 'Nome do medicamento é obrigatório'
    }

    // Validar apresentações
    if (draft.presentations.length === 0) {
      newErrors.presentations = 'Adicione pelo menos uma apresentação'
    }

    // Validar cada apresentação
    draft.presentations.forEach((pres, idx) => {
      if (!pres.pharmacy_veterinary && !pres.pharmacy_human && !pres.pharmacy_compounding) {
        newErrors[`pres_${idx}_pharmacy`] = 'Selecione pelo menos um tipo de farmácia'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ==================== SALVAR ====================

  async function handleSave() {
    console.log('[Catalogo2] ========== SAVE CLICKED ==========', new Date().toISOString())
    console.log('[Catalogo2] draft:', draft)

    // Validar
    if (!validateForm()) {
      console.error('[Catalogo2] Validation failed:', errors)
      return
    }

    try {
      setIsSaving(true)
      setErrors({})

      if (!clinicId) {
        throw new Error('Nenhuma clínica ativa. Faça login novamente.')
      }

      // Obter userId
      const rawUser = localStorage.getItem('luzaum-user')
      const user = rawUser ? JSON.parse(rawUser) : null
      const userId = user?.id

      console.log('[Catalogo2] STEP 1: Context:', { clinicId, userId })

      if (!userId) {
        throw new Error('Usuário não identificado. Faça login novamente.')
      }

      // Preparar payloads (APENAS campos do Supabase, sem manufacturer/package_*)
      const medicationPayload = {
        id: draft.id || undefined,
        name: draft.name.trim(),
        notes: draft.notes?.trim() || null,
        is_controlled: draft.is_controlled
      }

      const presentationsPayload = draft.presentations.map((p) => ({
        pharmaceutical_form: p.pharmaceutical_form,
        commercial_name: p.commercial_name?.trim() || null,
        value: typeof p.value === 'number' ? p.value : null,
        value_unit: p.value_unit,
        per_value: typeof p.per_value === 'number' ? p.per_value : 1,
        per_unit: p.per_unit,
        avg_price_brl: typeof p.avg_price_brl === 'number' ? p.avg_price_brl : null,
        pharmacy_veterinary: !!p.pharmacy_veterinary,
        pharmacy_human: !!p.pharmacy_human,
        pharmacy_compounding: !!p.pharmacy_compounding
        // NÃO enviar: manufacturer, package_quantity, package_unit (front-end only)
      }))

      console.log('[Catalogo2] STEP 2: Payloads')
      console.log('  medication:', medicationPayload)
      console.log('  presentations:', presentationsPayload)

      // Importar e chamar saveMedication
      const { saveMedication, getMedicationDetails, getMedicationPresentations } = await import(
        '../../src/lib/clinicRecords'
      )

      console.log('[Catalogo2] STEP 3: Calling saveMedication...')

      const result = await saveMedication({
        clinicId,
        userId,
        medication: medicationPayload,
        medicationId: draft.id || undefined,
        presentations: presentationsPayload
      })

      console.log('[Catalogo2] STEP 4: Supabase results')
      console.log('  medication:', result.medication)
      console.log('  presentations:', result.presentations)
      console.log('  Saved medication ID:', result.medication.id)

      // Verificação post-save
      console.log('[Catalogo2] STEP 5: POST-SAVE VERIFY (SELECT)')
      const verifyMed = await getMedicationDetails(clinicId, result.medication.id)
      const verifyPres = await getMedicationPresentations(clinicId, result.medication.id)

      console.log('  Verify medication:', verifyMed)
      console.log('  Verify presentations:', verifyPres)

      if (!verifyMed) {
        console.error('[Catalogo2] ⚠️ POST-SAVE VERIFY FAILED: medication NOT FOUND!')
        throw new Error('Medicamento não foi encontrado no banco após salvar. Verifique RLS policies.')
      } else {
        console.log('[Catalogo2] ✅ POST-SAVE VERIFY SUCCESS')
      }

      // Recarregar lista
      await loadMedications()

      // Selecionar o salvo
      const savedMed = await getMedicationDetails(clinicId, result.medication.id)
      const savedPres = await getMedicationPresentations(clinicId, result.medication.id)

      const fullSavedMed: MedicationWithPresentations = {
        ...savedMed!,
        presentations: savedPres.map((p) => ({
          id: p.id,
          client_id: crypto.randomUUID(),
          pharmaceutical_form: p.pharmaceutical_form || 'Comprimido',
          commercial_name: p.commercial_name,
          value: p.value,
          value_unit: p.value_unit || 'mg',
          per_value: p.per_value ?? 1,
          per_unit: p.per_unit || 'comprimido',
          avg_price_brl: p.avg_price_brl,
          pharmacy_veterinary: p.pharmacy_veterinary || false,
          pharmacy_human: p.pharmacy_human || false,
          pharmacy_compounding: p.pharmacy_compounding || false,
          manufacturer: draft.presentations[0]?.manufacturer || '',
          package_quantity: draft.presentations[0]?.package_quantity,
          package_unit: draft.presentations[0]?.package_unit || ''
        }))
      }

      setSelectedId(result.medication.id)
      setDraft(JSON.parse(JSON.stringify(fullSavedMed)))
      setOriginalDraft(JSON.parse(JSON.stringify(fullSavedMed)))

      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)

      console.log('[Catalogo2] ========== SAVE SUCCESS ==========')
    } catch (error: any) {
      console.error('[Catalogo2] ========== SAVE ERROR ==========')
      console.error('  Error object:', error)
      console.error('  message:', error?.message)
      console.error('  details:', error?.details)
      console.error('  hint:', error?.hint)
      console.error('  code:', error?.code)

      // Detectar RLS
      const isRLS =
        error?.code === '42501' ||
        error?.code === 'PGRST301' ||
        error?.message?.toLowerCase().includes('row-level security') ||
        error?.message?.toLowerCase().includes('permission denied')

      if (isRLS) {
        setErrors({
          save: 'ERRO DE PERMISSÃO (RLS): Verifique se você está logado e se é membro da clínica ativa.'
        })
      } else {
        setErrors({
          save: `Erro ao salvar: ${error instanceof Error ? error.message : String(error)}`
        })
      }

      setIsSaving(false)
    }
  }

  // ==================== RENDER ====================

  // Tela de erro: sem clinic ID
  if (!clinicLoading && !clinicId) {
    return (
      <>
        <div
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            background: 'rgba(0, 128, 255, 0.9)',
            color: 'white',
            padding: '10px 16px',
            fontSize: '14px',
            fontWeight: 'bold',
            zIndex: 99999,
            borderRadius: '6px',
            border: '2px solid white',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }}
        >
          Catalogo2Page BUILD: 2026-02-24
        </div>

        <ReceituarioChrome section="catalogo2" title="Catálogo 2.0" subtitle="">
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="max-w-md rounded-2xl border-2 border-red-500/40 bg-red-500/10 p-8 text-center">
              <span className="material-symbols-outlined mb-4 text-6xl text-red-400">error</span>
              <h2 className="mb-2 text-xl font-bold text-red-300">Nenhuma clínica ativa</h2>
              <p className="mb-6 text-sm text-red-200">
                Você precisa estar logado e ter uma clínica ativa para usar o Catálogo 2.0.
              </p>
              <button
                type="button"
                className="rxv-btn-primary px-4 py-2 text-sm"
                onClick={() => window.location.reload()}
              >
                <span className="material-symbols-outlined mr-2 text-[18px]">refresh</span>
                Recarregar página
              </button>
            </div>
          </div>
        </ReceituarioChrome>
      </>
    )
  }

  return (
    <>
      {/* WATERMARK */}
      <div
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(0, 128, 255, 0.9)',
          color: 'white',
          padding: '10px 16px',
          fontSize: '14px',
          fontWeight: 'bold',
          zIndex: 99999,
          borderRadius: '6px',
          border: '2px solid white',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}
      >
        Catalogo2Page BUILD: 2026-02-24
      </div>

      {/* MODAL: UNSAVED CHANGES */}
      {showUnsavedModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-yellow-400">warning</span>
              <h3 className="text-lg font-bold">Alterações não salvas</h3>
            </div>
            <p className="mb-6 text-sm text-[color:var(--rxv-muted)]">
              Você tem alterações não salvas. Deseja descartá-las e continuar?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="rxv-btn-secondary flex-1 px-4 py-2 text-sm"
                onClick={() => setShowUnsavedModal(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="rxv-btn-primary flex-1 px-4 py-2 text-sm"
                onClick={discardAndSelect}
              >
                Descartar alterações
              </button>
            </div>
          </div>
        </div>
      )}

      <ReceituarioChrome
        section="catalogo2"
        title="🔥 Catálogo 2.0"
        subtitle={clinicName ? `Clínica: ${clinicName}` : 'Supabase-only'}
        actions={
          <>
            <Link
              to="/receituario-vet/catalogo"
              className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Catálogo v1
            </Link>
            <button
              type="button"
              className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm"
              onClick={createNew}
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Novo
            </button>
            <button
              type="button"
              className="rxv-btn-primary inline-flex items-center gap-2 px-3 py-2 text-sm"
              onClick={handleSave}
              disabled={isSaving || !isDirty}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isSaving ? 'hourglass_empty' : 'save'}
              </span>
              {isSaving ? 'Salvando...' : isDirty ? 'Salvar *' : 'Salvo'}
            </button>
          </>
        }
      >
        {/* ERROR BANNER */}
        {errors.save && (
          <div className="mb-4 rounded-xl border-2 border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <strong>Erro ao salvar:</strong> {errors.save}
          </div>
        )}

        {errors.load && (
          <div className="mb-4 rounded-xl border-2 border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <strong>Erro ao carregar:</strong> {errors.load}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* SIDEBAR - LISTA DE MEDICAMENTOS */}
          <aside className="rxv-card p-4 xl:col-span-3">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-[color:var(--rxv-muted)]">
              Medicamentos ({medications.length})
            </h3>

            {/* SEARCH */}
            <div className="mb-3">
              <input
                type="text"
                className="w-full rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-3 py-2 text-sm"
                placeholder="🔍 Buscar medicamento..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="max-h-[68vh] space-y-2 overflow-y-auto pr-1">
              {loading ? (
                <div className="flex items-center justify-center py-8 text-sm text-[color:var(--rxv-muted)]">
                  <span className="material-symbols-outlined mr-2 animate-spin text-xl">refresh</span>
                  Carregando...
                </div>
              ) : filteredMedications.length === 0 ? (
                <div className="rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/60 px-4 py-8 text-center">
                  <span className="material-symbols-outlined mb-2 block text-4xl text-[color:var(--rxv-muted)]">
                    inventory_2
                  </span>
                  <p className="mb-1 text-sm font-semibold text-[color:var(--rxv-muted)]">
                    Nenhum medicamento
                  </p>
                  <p className="mb-4 text-xs text-[color:var(--rxv-muted)]">
                    {searchQuery ? 'Nenhum resultado encontrado' : 'Comece criando um novo medicamento'}
                  </p>
                  {!searchQuery && (
                    <button
                      type="button"
                      className="rxv-btn-primary inline-flex items-center gap-1 px-3 py-1.5 text-xs"
                      onClick={createNew}
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                      Criar primeiro
                    </button>
                  )}
                </div>
              ) : (
                filteredMedications.map((med) => (
                  <button
                    type="button"
                    key={med.id}
                    className={`w-full rounded-xl border px-3 py-2.5 text-left transition-all ${
                      selectedId === med.id
                        ? 'border-[#61eb48]/50 bg-[#61eb48]/15 shadow-lg shadow-[#61eb48]/20'
                        : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/60 hover:border-[#61eb48]/30 hover:bg-[#61eb48]/5'
                    }`}
                    onClick={() => attemptSelectMedication(med)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="mb-0.5 text-sm font-semibold leading-tight">{med.name}</p>
                        <p className="text-xs text-[color:var(--rxv-muted)]">
                          {med.presentations.length} apresentação{med.presentations.length !== 1 ? 'ões' : ''}
                        </p>
                      </div>
                      {med.is_controlled && (
                        <span className="ml-2 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-300">
                          Controlado
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </aside>

          {/* MAIN - FORMULÁRIO */}
          <main className="space-y-6 xl:col-span-9">
            {/* Status indicator */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {isDirty ? (
                  <span className="inline-flex items-center gap-1 text-yellow-400">
                    <span className="material-symbols-outlined text-[14px]">edit</span>
                    Não salvo
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-green-400">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Salvo
                  </span>
                )}
              </div>
              {selectedId && (
                <span className="text-[color:var(--rxv-muted)]">ID: {selectedId.slice(0, 8)}...</span>
              )}
            </div>

            {/* Dados do medicamento */}
            <section className="rxv-card p-6 shadow-xl">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
                <span className="material-symbols-outlined text-[24px] text-[#61eb48]">medication</span>
                Dados do medicamento
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm">
                    <span className="mb-1 block font-semibold">
                      Nome do medicamento <span className="text-red-400">*</span>
                    </span>
                    <input
                      type="text"
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${
                        errors.name
                          ? 'border-red-500/50 bg-red-500/10'
                          : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)]'
                      }`}
                      value={draft.name}
                      onChange={(e) => {
                        setDraft((prev) => ({ ...prev, name: e.target.value }))
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
                      }}
                      placeholder="Ex.: Carprofeno"
                    />
                  </label>
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={draft.is_controlled}
                    onChange={(e) => setDraft((prev) => ({ ...prev, is_controlled: e.target.checked }))}
                  />
                  <span className="font-semibold">Medicamento controlado</span>
                </label>
              </div>

              <label className="mt-4 block text-sm">
                <span className="mb-1 block font-semibold">Observações</span>
                <textarea
                  className="w-full rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-3 py-2 text-sm"
                  value={draft.notes || ''}
                  onChange={(e) => setDraft((prev) => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  placeholder="Observações internas sobre o medicamento..."
                />
              </label>
            </section>

            {/* Apresentações */}
            <section className="rxv-card p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <span className="material-symbols-outlined text-[24px] text-[#61eb48]">inventory</span>
                  Apresentações
                </h3>
                <button
                  type="button"
                  className="rxv-btn-secondary inline-flex items-center gap-1 px-3 py-2 text-sm"
                  onClick={addPresentation}
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  Nova apresentação
                </button>
              </div>

              {errors.presentations && (
                <p className="mb-3 text-sm text-red-400">{errors.presentations}</p>
              )}

              <div className="space-y-4">
                {draft.presentations.map((pres, idx) => (
                  <div
                    key={pres.client_id}
                    className="rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/40 p-4 shadow-md"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wide text-[color:var(--rxv-muted)]">
                        Apresentação #{idx + 1}
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-2 py-1 text-xs text-red-300 hover:bg-red-500/20 disabled:opacity-40"
                        onClick={() => removePresentation(pres.client_id)}
                        disabled={draft.presentations.length === 1}
                        title={draft.presentations.length === 1 ? 'Pelo menos uma apresentação é necessária' : 'Remover'}
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                        Remover
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                      {/* Forma farmacêutica */}
                      <label className="text-xs md:col-span-3">
                        <span className="mb-1 block font-semibold">Forma farmacêutica</span>
                        <select
                          className="w-full rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-2 py-2 text-sm"
                          value={pres.pharmaceutical_form}
                          onChange={(e) =>
                            updatePresentation(pres.client_id, { pharmaceutical_form: e.target.value })
                          }
                        >
                          {PHARMACEUTICAL_FORMS.map((form) => (
                            <option key={form} value={form}>
                              {form}
                            </option>
                          ))}
                        </select>
                      </label>

                      {/* Nome comercial */}
                      <label className="text-xs md:col-span-3">
                        <span className="mb-1 block font-semibold">Nome comercial</span>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-2 py-2 text-sm"
                          value={pres.commercial_name || ''}
                          onChange={(e) => updatePresentation(pres.client_id, { commercial_name: e.target.value })}
                          placeholder="Ex.: Rimadyl"
                        />
                      </label>

                      {/* Fabricante (front-end only) */}
                      <label className="text-xs md:col-span-3">
                        <span className="mb-1 block font-semibold">Fabricante</span>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-2 py-2 text-sm"
                          value={pres.manufacturer || ''}
                          onChange={(e) => updatePresentation(pres.client_id, { manufacturer: e.target.value })}
                          placeholder="Ex.: Zoetis"
                        />
                      </label>

                      {/* Preço médio */}
                      <label className="text-xs md:col-span-3">
                        <span className="mb-1 block font-semibold">Preço médio (R$)</span>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-2 py-2 text-sm"
                          value={pres.avg_price_brl ?? ''}
                          onChange={(e) => {
                            const val = e.target.value === '' ? null : Number(e.target.value)
                            updatePresentation(pres.client_id, { avg_price_brl: val })
                          }}
                          placeholder="79.90"
                        />
                      </label>

                      {/* Valor */}
                      <label className="text-xs md:col-span-2">
                        <span className="mb-1 block font-semibold">Valor</span>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-2 py-2 text-sm"
                          value={pres.value ?? ''}
                          onChange={(e) => {
                            const val = e.target.value === '' ? null : Number(e.target.value)
                            updatePresentation(pres.client_id, { value: val })
                          }}
                          placeholder="250"
                        />
                      </label>

                      {/* Unidade do valor */}
                      <label className="text-xs md:col-span-2">
                        <span className="mb-1 block font-semibold">Unidade</span>
                        <select
                          className="w-full rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-2 py-2 text-sm"
                          value={pres.value_unit}
                          onChange={(e) => updatePresentation(pres.client_id, { value_unit: e.target.value })}
                        >
                          {VALUE_UNITS.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                      </label>

                      {/* Por valor */}
                      <label className="text-xs md:col-span-2">
                        <span className="mb-1 block font-semibold">Por valor</span>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-2 py-2 text-sm"
                          value={pres.per_value}
                          onChange={(e) => {
                            const val = e.target.value === '' ? 1 : Number(e.target.value)
                            updatePresentation(pres.client_id, { per_value: val })
                          }}
                        />
                      </label>

                      {/* Por unidade */}
                      <label className="text-xs md:col-span-2">
                        <span className="mb-1 block font-semibold">Por unidade</span>
                        <select
                          className="w-full rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-2 py-2 text-sm"
                          value={pres.per_unit}
                          onChange={(e) => updatePresentation(pres.client_id, { per_unit: e.target.value })}
                        >
                          {PER_UNITS.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                      </label>

                      {/* Qtd embalagem (front-end only) */}
                      <label className="text-xs md:col-span-2">
                        <span className="mb-1 block font-semibold">Qtd embalagem</span>
                        <input
                          type="number"
                          className="w-full rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-2 py-2 text-sm"
                          value={pres.package_quantity ?? ''}
                          onChange={(e) => {
                            const val = e.target.value === '' ? undefined : Number(e.target.value)
                            updatePresentation(pres.client_id, { package_quantity: val })
                          }}
                          placeholder="10"
                        />
                      </label>

                      {/* Unidade embalagem (front-end only) */}
                      <label className="text-xs md:col-span-2">
                        <span className="mb-1 block font-semibold">Unid embalagem</span>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-2 py-2 text-sm"
                          value={pres.package_unit || ''}
                          onChange={(e) => updatePresentation(pres.client_id, { package_unit: e.target.value })}
                          placeholder="caixas"
                        />
                      </label>

                      {/* Tipos de farmácia */}
                      <div className="text-xs md:col-span-12">
                        <p className="mb-2 font-semibold">
                          Tipos de farmácia <span className="text-red-400">*</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <label
                            className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all ${
                              pres.pharmacy_veterinary
                                ? 'border-[#61eb48]/50 bg-[#61eb48]/15 text-[#c8ffc0] shadow-md shadow-[#61eb48]/10'
                                : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/50 text-[color:var(--rxv-muted)] hover:border-[#61eb48]/30'
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4"
                              checked={pres.pharmacy_veterinary}
                              onChange={(e) =>
                                updatePresentation(pres.client_id, { pharmacy_veterinary: e.target.checked })
                              }
                            />
                            Veterinária
                          </label>

                          <label
                            className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all ${
                              pres.pharmacy_human
                                ? 'border-[#61eb48]/50 bg-[#61eb48]/15 text-[#c8ffc0] shadow-md shadow-[#61eb48]/10'
                                : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/50 text-[color:var(--rxv-muted)] hover:border-[#61eb48]/30'
                            }` }
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4"
                              checked={pres.pharmacy_human}
                              onChange={(e) =>
                                updatePresentation(pres.client_id, { pharmacy_human: e.target.checked })
                              }
                            />
                            Humana
                          </label>

                          <label
                            className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all ${
                              pres.pharmacy_compounding
                                ? 'border-[#61eb48]/50 bg-[#61eb48]/15 text-[#c8ffc0] shadow-md shadow-[#61eb48]/10'
                                : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/50 text-[color:var(--rxv-muted)] hover:border-[#61eb48]/30'
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4"
                              checked={pres.pharmacy_compounding}
                              onChange={(e) =>
                                updatePresentation(pres.client_id, { pharmacy_compounding: e.target.checked })
                              }
                            />
                            Manipulação
                          </label>
                        </div>
                        {errors[`pres_${idx}_pharmacy`] && (
                          <p className="mt-1 text-xs text-red-400">{errors[`pres_${idx}_pharmacy`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>

        {/* Toast de sucesso */}
        {saveSuccess && (
          <div className="fixed bottom-6 right-6 z-[120] flex items-center gap-2 rounded-xl border border-green-500/40 bg-green-500/20 px-5 py-3 text-sm font-semibold text-green-300 shadow-2xl">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            Medicamento salvo com sucesso!
          </div>
        )}
      </ReceituarioChrome>
    </>
  )
}
