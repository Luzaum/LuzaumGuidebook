import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReceituarioChrome from './ReceituarioChrome'
import { RxvButton, RxvCard, RxvField, RxvInput, RxvSectionHeader, RxvToggle } from '../../src/components/receituario/RxvComponents'
import { useClinic } from '../../src/components/ClinicProvider'
import { supabase } from '../../src/lib/supabaseClient'
import {
  deleteCompoundedMedication,
  getCompoundedMedicationBundle,
  listCompoundedMedications,
  saveCompoundedMedicationBundle,
  type CompoundedMedicationBundle,
  type CompoundedMedicationListItem,
} from '../../src/lib/compoundedRecords'
import {
  compoundedListItemToV2,
  createEmptyCompoundedV2,
  legacyManipulatedToV2,
  v2ManipulatedToPersistence,
  type CompoundedMedicationV2,
} from './compoundedV2'
import { sanitizeVisibleText } from './textSanitizer'
import { ManipuladosV2CatalogCard } from './components/ManipuladosV2CatalogCard'
import { ManipuladosV2Editor } from './components/ManipuladosV2Editor'

type EditorSource = 'new' | 'v2' | 'legacy'

function summarizeActivePrinciples(v2: CompoundedMedicationV2): string {
  return v2.ingredients
    .filter((ingredient) => ingredient.role === 'active')
    .map((ingredient) => sanitizeVisibleText(ingredient.name))
    .filter(Boolean)
    .slice(0, 5)
    .join(', ')
}

function ensureFormulaForSave(v2: CompoundedMedicationV2, clinicId: string): CompoundedMedicationV2 {
  return {
    ...v2,
    formula: {
      ...v2.formula,
      clinic_id: clinicId,
      active_principles_summary: summarizeActivePrinciples(v2),
    },
  }
}

export default function ManipuladosPage() {
  const { clinicId } = useClinic()
  const [rows, setRows] = useState<CompoundedMedicationListItem[]>([])
  const [search, setSearch] = useState('')
  const [controlledOnly, setControlledOnly] = useState(false)
  const [includeInactive, setIncludeInactive] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [selectedRegimenId, setSelectedRegimenId] = useState('')
  const [editorValue, setEditorValue] = useState<CompoundedMedicationV2 | null>(null)
  const [editorSource, setEditorSource] = useState<EditorSource>('new')
  const [creatingNew, setCreatingNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const creatingNewRef = useRef(false)

  useEffect(() => {
    creatingNewRef.current = creatingNew
  }, [creatingNew])

  const loadList = useCallback(async () => {
    if (!clinicId) return
    const next = await listCompoundedMedications(clinicId, { search, controlledOnly, includeInactive })
    setRows(next)
  }, [clinicId, controlledOnly, includeInactive, search])

  const openBundle = useCallback(async (bundle: CompoundedMedicationBundle | null) => {
    if (!bundle) return
    setCreatingNew(false)
    const hasV2 = !!((bundle.medication.metadata as Record<string, unknown> | null)?.payload_v2)
    const next = legacyManipulatedToV2(bundle)
    setEditorValue(next)
    setEditorSource(hasV2 ? 'v2' : 'legacy')
    setSelectedId(bundle.medication.id)
    setSelectedRegimenId(next.regimens.find((entry) => entry.is_default)?.id || next.regimens[0]?.id || '')
    setMessage(hasV2 ? '' : 'Item legado convertido para edição em Manipulados V2. Ao salvar, payload_v2 será persistido.')
  }, [])

  const openItem = useCallback(async (compoundId: string) => {
    if (!clinicId || !compoundId) return
    setLoading(true)
    try {
      const bundle = await getCompoundedMedicationBundle(clinicId, compoundId)
      if (creatingNewRef.current) return
      await openBundle(bundle)
    } finally {
      setLoading(false)
    }
  }, [clinicId, openBundle])

  useEffect(() => {
    void loadList()
  }, [loadList])

  useEffect(() => {
    if (creatingNew) return
    if (!rows.length) {
      setSelectedId('')
      setEditorValue(null)
      return
    }
    const exists = rows.some((row) => row.id === selectedId)
    const nextId = exists ? selectedId : rows[0].id
    if (!nextId) return
    if (!exists || !editorValue || selectedId !== nextId) {
      void openItem(nextId)
    }
  }, [creatingNew, rows, selectedId, editorValue, openItem])

  const listCards = useMemo(() => rows.map((row) => compoundedListItemToV2(row)), [rows])

  const handleNew = () => {
    if (!clinicId) return
    const next = createEmptyCompoundedV2()
    next.formula.clinic_id = clinicId
    setEditorValue(next)
    setEditorSource('new')
    setCreatingNew(true)
    setSelectedId('')
    setSelectedRegimenId(next.regimens[0]?.id || '')
    setMessage('')
  }

  const handleSave = async () => {
    if (!clinicId || !editorValue) return
    setSaving(true)
    setMessage('')
    try {
      const { data } = await supabase.auth.getUser()
      const userId = data.user?.id
      if (!userId) throw new Error('Usuário autenticado não encontrado para salvar o catálogo.')

      const nextValue = ensureFormulaForSave(editorValue, clinicId)
      const payload = v2ManipulatedToPersistence(nextValue)
      const saved = await saveCompoundedMedicationBundle({
        clinicId,
        userId,
        medication: payload.medication,
        ingredients: payload.ingredients,
        regimens: payload.regimens,
        allowLocalFallback: false,
      })

      await loadList()
      await openBundle(saved)
      setCreatingNew(false)
      setMessage('Manipulado salvo no catálogo da clínica.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Falha ao salvar o manipulado.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!clinicId || !selectedId) return
    if (!window.confirm('Deseja excluir este manipulado do catálogo?')) return
    setSaving(true)
    try {
      await deleteCompoundedMedication(clinicId, selectedId, { hardDelete: false })
      setMessage('Manipulado removido do catálogo ativo.')
      setEditorValue(null)
      setSelectedId('')
      setSelectedRegimenId('')
      setCreatingNew(false)
      await loadList()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Falha ao excluir o manipulado.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <ReceituarioChrome
      section="manipulados"
      title="Manipulados"
      subtitle="Catálogo magistral em V2, com edição clínica única e reaproveitamento direto na Nova Receita."
      actions={
        <>
          <RxvButton variant="secondary" onClick={() => void loadList()}>Atualizar</RxvButton>
          <RxvButton variant="primary" onClick={handleNew}>Novo manipulado</RxvButton>
        </>
      }
    >
      <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="space-y-4 xl:sticky xl:top-6 xl:max-h-[calc(100vh-120px)] xl:overflow-y-auto">
          <RxvCard className="p-5">
            <RxvSectionHeader icon="science" title="Catálogo magistral" subtitle="Abra, filtre e continue no editor V2." />
            <RxvField label="Buscar manipulado">
              <RxvInput value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nome, forma farmacêutica ou resumo..." />
            </RxvField>
            <div className="mt-4 flex flex-wrap gap-4">
              <RxvToggle checked={controlledOnly} onChange={setControlledOnly} label="Só controlados" />
              <RxvToggle checked={includeInactive} onChange={setIncludeInactive} label="Mostrar inativos" />
            </div>
          </RxvCard>

          <div className="space-y-2">
            {listCards.map((item) => (
              <ManipuladosV2CatalogCard key={item.formula.id} item={item} active={selectedId === item.formula.id} onClick={() => void openItem(item.formula.id)} />
            ))}
            {!listCards.length ? (
              <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-8 text-sm text-slate-500">
                Nenhum manipulado encontrado para os filtros atuais.
              </div>
            ) : null}
          </div>
        </div>

        <div className="min-w-0 space-y-4">
          {message ? (
            <div className="rounded-2xl border border-[#39ff14]/20 bg-[#143118] px-4 py-3 text-sm text-[#b7f6ad]">{message}</div>
          ) : null}
          {loading ? (
            <RxvCard className="p-6 text-sm text-slate-400">Carregando manipulado...</RxvCard>
          ) : editorValue ? (
            <ManipuladosV2Editor
              value={editorValue}
              onChange={setEditorValue}
              onSave={handleSave}
              onDelete={selectedId ? handleDelete : undefined}
              saving={saving}
              selectedRegimenId={selectedRegimenId}
              onSelectRegimen={setSelectedRegimenId}
              legacyNotice={editorSource === 'legacy' ? 'Item legado convertido para edição no fluxo V2.' : ''}
            />
          ) : (
            <RxvCard className="p-6 text-sm text-slate-400">
              Selecione um manipulado na lista ou crie um novo item para começar.
            </RxvCard>
          )}
        </div>
      </div>
    </ReceituarioChrome>
  )
}
