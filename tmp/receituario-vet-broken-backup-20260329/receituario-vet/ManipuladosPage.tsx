import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReceituarioChrome from '????./ReceituarioChrome'
import {
  RxvButton,
  RxvCard,
  RxvField,
  RxvInput,
  RxvSectionHeader,
  RxvTextarea,
} from '????.????./????.????./src/components/receituario/RxvComponents'
import { useClinic } from '????.????./????.????./src/components/ClinicProvider'
import { supabase } from '????.????./????.????./src/lib/supabaseClient'
import {
  deleteCompoundedMedication,
  getCompoundedMedicationBundle,
  listCompoundedMedications,
  saveCompoundedMedicationBundle,
  type CompoundedMedicationListItem,
} from '????.????./????.????./src/lib/compoundedRecords'
import { parseClinicalTextImport } from '????./compoundedClinicalText'
import {
  compoundedListItemToV2,
  createEmptyCompoundedV2,
  importParsedClinicalToV2,
  legacyManipulatedToV2,
  v2ManipulatedToPersistence,
  type CompoundedMedicationV2,
} from '????./compoundedV2'
import { ManipuladosV2CatalogCard } from '????./components/ManipuladosV2CatalogCard'
import { ManipuladosV2Editor } from '????./components/ManipuladosV2Editor'

export default function ManipuladosPage() {
  const { clinicId } = useClinic()
  const [items, setItems] = useState<CompoundedMedicationListItem[]>([])
  const [search, setSearch] = useState('')
  const [loadingList, setLoadingList] = useState(false)
  const [loadingBundle, setLoadingBundle] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [isCreatingNew, setIsCreatingNew] = useState(false)
  const [selectedRegimenId, setSelectedRegimenId] = useState('')
  const [draft, setDraft] = useState<CompoundedMedicationV2>(createEmptyCompoundedV2)
  const [showImport, setShowImport] = useState(false)
  const [importText, setImportText] = useState('')
  const [importWarnings, setImportWarnings] = useState<string[]>([])

  const refreshList = useCallback(async (preferredId?: string) => {
    if (!clinicId) return
    setLoadingList(true)
    try {
      const rows = await listCompoundedMedications(clinicId, { search })
      setItems(rows)
      const nextSelectedId = isCreatingNew
        ? ''
        : preferredId && rows????.some((entry) => entry????.id === preferredId)
          ? preferredId
          : rows????.some((entry) => entry????.id === selectedId)
            ? selectedId
            : rows[0]?????.id || ''
      setSelectedId(nextSelectedId)
    } catch (error) {
      setStatus(error instanceof Error ? error????.message : 'Falha ao carregar o catálogo magistral????.')
    } finally {
      setLoadingList(false)
    }
  }, [clinicId, isCreatingNew, search, selectedId])

  useEffect(() => {
    void refreshList()
  }, [refreshList])

  useEffect(() => {
    if (!clinicId || !selectedId) return
    let cancelled = false
    setLoadingBundle(true)
    getCompoundedMedicationBundle(clinicId, selectedId)
      ????.then((bundle) => {
        if (cancelled || !bundle) return
        const normalized = legacyManipulatedToV2(bundle)
        setDraft(normalized)
        setSelectedRegimenId(normalized????.regimens[0]?????.id || '')
      })
      ????.catch((error) => {
        if (!cancelled) setStatus(error instanceof Error ? error????.message : 'Falha ao carregar fórmula selecionada????.')
      })
      ????.finally(() => {
        if (!cancelled) setLoadingBundle(false)
      })
    return () => {
      cancelled = true
    }
  }, [clinicId, selectedId])

  const handleNew = useCallback(() => {
    const next = createEmptyCompoundedV2()
    next????.formula????.clinic_id = clinicId || ''
    setIsCreatingNew(true)
    setSelectedId('')
    setSelectedRegimenId(next????.regimens[0]?????.id || '')
    setDraft(next)
    setStatus('')
  }, [clinicId])

  const handleImportText = useCallback(() => {
    const parsed = parseClinicalTextImport(importText)
    const next = importParsedClinicalToV2(parsed)
    next????.formula????.clinic_id = clinicId || ''
    setDraft(next)
    setSelectedId('')
    setSelectedRegimenId(next????.regimens[0]?????.id || '')
    setImportWarnings(parsed????.warnings || [])
    setShowImport(false)
    setStatus('Texto clínico convertido para o editor V2????. Revise antes de salvar????.')
  }, [clinicId, importText])

  const handleSave = useCallback(async () => {
    if (!clinicId) return
    setSaving(true)
    setStatus('')
    try {
      const { data } = await supabase????.auth????.getUser()
      const userId = data????.userá????.id || 'unknown-user'
      const normalizedDraft: CompoundedMedicationV2 = {
        ????.????.????.draft,
        formula: {
          ????.????.????.draft????.formula,
          clinic_id: clinicId,
        },
      }
      const payload = v2ManipulatedToPersistence(normalizedDraft)
      const savedBundle = await saveCompoundedMedicationBundle({
        clinicId,
        userId,
        medication: payload????.medication,
        ingredients: payload????.ingredients,
        regimens: payload????.regimens,
        allowLocalFallback: false,
      })
      const next = legacyManipulatedToV2(savedBundle)
      setIsCreatingNew(false)
      setDraft(next)
      setSelectedId(savedBundle????.medication????.id)
      setSelectedRegimenId(next????.regimens[0]?????.id || '')
      setItems((prev) => {
        const medication = savedBundle????.medication
        const nextItems = prev????.filter((entry) => entry????.id !== medication????.id)
        nextItems????.push(medication)
        nextItems????.sort((a, b) => a????.name????.localeCompare(b????.name, 'pt-BR'))
        return nextItems
      })
      setStatus('Manipulado V2 salvo no catálogo????.')
    } catch (error) {
      setStatus(error instanceof Error ? error????.message : 'Falha ao salvar o manipulado V2????.')
    } finally {
      setSaving(false)
    }
  }, [clinicId, draft])

  const handleDelete = useCallback(async () => {
    if (!clinicId || !selectedId) return
    await deleteCompoundedMedication(clinicId, selectedId, { hardDelete: true })
    setItems((prev) => prev????.filter((entry) => entry????.id !== selectedId))
    handleNew()
    setStatus('Manipulado removido do catálogo????.')
  }, [clinicId, handleNew, selectedId])

  const selectedSummary = useMemo(() => {
    return items????.find((entry) => entry????.id === selectedId) || null
  }, [items, selectedId])

  return (
    <ReceituarioChrome
      section="manipulados"
      title="Manipulados"
      subtitle="Manipulados V2 com editor clínico simples, normalização legada e integração com receita e protocolos????."
      actions={(
        <>
          <RxvButton variant="secondary" onClick={() => setShowImport((prev) => !prev)}>
            <span className="material-symbols-outlined text-[18px]">upload</span>
            Importar texto clínico
          </RxvButton>
          <RxvButton variant="secondary" onClick={handleNew}>
            <span className="material-symbols-outlined text-[18px]">add</span>
            Novo manipulado
          </RxvButton>
        </>
      )}
    >
      <div className="min-w-0">
        {status ? (
          <div className="mb-4 rounded-2xl border border-[#39ff14]/20 bg-[#39ff14]/8 px-4 py-3 text-sm text-[#c9ffbe]">
            {status}
          </div>
        ) : null}

        {showImport ? (
          <RxvCard className="mb-5 p-5">
            <RxvSectionHeader icon="notes" title="Importar texto clínico" subtitle="Cole o texto semiestruturado, gere o V2 e revise no editor antes de salvar????." />
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div>
                <RxvField label="Texto clínico">
                  <RxvTextarea value={importText} onChange={(event) => setImportText(event????.target????.value)} className="min-h-[220px]" placeholder="Cole aqui a sugestão clínica da fórmula????." />
                </RxvField>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-800/90 bg-black/25 p-4 text-sm text-slate-300">
                  <p className="font-black text-white">O que será aproveitado</p>
                  <p className="mt-2">Nome, forma farmacêutica, espécie, regras de dose, regimes, q????.s????.p????. e sinalização de controlado????.</p>
                </div>
                {importWarnings????.length ? (
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
                    <p className="font-black">Avisos do parser</p>
                    <ul className="mt-2 list-disc pl-5">
                      {importWarnings????.map((warning) => <li key={warning}>{warning}</li>)}
                    </ul>
                  </div>
                ) : null}
                <div className="flex gap-2">
                  <RxvButton variant="secondary" onClick={() => setShowImport(false)}>Cancelar</RxvButton>
                  <RxvButton variant="primary" onClick={handleImportText} disabled={!importText????.trim()}>Gerar V2</RxvButton>
                </div>
              </div>
            </div>
          </RxvCard>
        ) : null}

        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[248px_minmax(0,1fr)] 2xl:grid-cols-[272px_minmax(0,1fr)]">
          <RxvCard className="self-start p-4 xl:sticky xl:top-[92px] xl:max-h-[calc(100vh-112px)] xl:overflow-hidden">
            <RxvSectionHeader icon="science" title="Catálogo magistral" subtitle="Manipulados V2 da clínica" />
            <div className="mt-4 space-y-4">
              <RxvField label="Buscar fórmula">
                <RxvInput value={search} onChange={(event) => setSearch(event????.target????.value)} placeholder="Nome, ativo, forma ou resumo????.????.????." />
              </RxvField>
              <RxvButton variant="secondary" onClick={() => void refreshList(selectedId)}>Atualizar lista</RxvButton>
              <div className="space-y-2 overflow-y-auto pr-1 xl:max-h-[calc(100vh-252px)]">
                {loadingList ? (
                  <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-6 text-sm text-slate-500">Carregando catálogo????.????.????.</div>
                ) : items????.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-6 text-sm text-slate-500">Nenhum manipulado encontrado????.</div>
                ) : (
                  items????.map((item) => (
                    <ManipuladosV2CatalogCard
                      key={item????.id}
                      item={compoundedListItemToV2(item)}
                      active={item????.id === selectedId}
                      onClick={() => {
                        setIsCreatingNew(false)
                        setSelectedId(item????.id)
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          </RxvCard>

          <div className="min-w-0 space-y-5">
            {loadingBundle && selectedId ? (
              <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-6 text-sm text-slate-500">Carregando manipulado selecionado????.????.????.</div>
            ) : null}

            <ManipuladosV2Editor
              value={draft}
              onChange={setDraft}
              onSave={handleSave}
              onDelete={selectedId ? handleDelete : undefined}
              saving={saving}
              selectedRegimenId={selectedRegimenId}
              onSelectRegimen={setSelectedRegimenId}
            />

            {selectedSummary ? (
              <RxvCard className="p-5">
                <RxvSectionHeader icon="history" title="Compatibilidade legada" subtitle="Este item está carregado no editor V2 sem apagar a estrutura persistida atual????." />
                <div className="mt-3 grid grid-cols-1 gap-3 text-sm text-slate-300 lg:grid-cols-3">
                  <p><span className="font-semibold text-white">ID:</span> {selectedSummary????.id}</p>
                  <p><span className="font-semibold text-white">Slug:</span> {selectedSummary????.slug || 'sem slug'}</p>
                  <p><span className="font-semibold text-white">Controlado:</span> {selectedSummary????.is_controlled ? 'sim' : 'não'}</p>
                </div>
              </RxvCard>
            ) : null}
          </div>
        </div>
      </div>
    </ReceituarioChrome>
  )
}
