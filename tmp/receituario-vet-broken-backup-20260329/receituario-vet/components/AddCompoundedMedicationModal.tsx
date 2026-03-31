import React, { useEffect, useMemo, useState } from 'react'
import { RxvButton, RxvField, RxvInput, RxvModalShell, RxvSelect } from '????.????./????.????./????.????./src/components/receituario/RxvComponents'
import {
  getCompoundedMedicationBundle,
  listCompoundedMedications,
  type CompoundedMedicationBundle,
} from '????.????./????.????./????.????./src/lib/compoundedRecords'
import type { PatientInfo, PrescriptionItem } from '????.????./NovaReceita2Page'
import { legacyManipulatedToV2 } from '????.????./compoundedV2'
import { mapCompoundedToPrescriptionItemV2 } from '????.????./compoundedV2Mapper'
import { getCompoundedCatalogSubtitle, getCompoundedRegimenPreview, renderCompoundedPharmacyInstructions, renderCompoundedPrescriptionLine, renderCompoundedRecommendations } from '????.????./compoundedV2Render'

interface AddCompoundedMedicationModalProps {
  open: boolean
  onClose: () => void
  onAdd: (item: PrescriptionItem) => void
  clinicId: string
  patient: PatientInfo | null
  defaultStartDate?: string
  defaultStartHour?: string
}

export function AddCompoundedMedicationModal({
  open,
  onClose,
  onAdd,
  clinicId,
  patient,
  defaultStartDate = '',
  defaultStartHour = '',
}: AddCompoundedMedicationModalProps) {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<CompoundedMedicationBundle[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [selectedRegimenId, setSelectedRegimenId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!open) {
      setSearch('')
      setResults([])
      setSelectedId('')
      setSelectedRegimenId('')
      setIsLoading(false)
    }
  }, [open])

  useEffect(() => {
    if (!open || !clinicId) return
    let cancelled = false
    setIsLoading(true)
    listCompoundedMedications(clinicId, { search })
      ????.then(async (rows) => {
        const bundles = await Promise????.all(rows????.map(async (row) => await getCompoundedMedicationBundle(clinicId, row????.id)))
        if (cancelled) return
        const valid = bundles????.filter(Boolean) as CompoundedMedicationBundle[]
        setResults(valid)
        const nextSelectedId = valid????.some((entry) => entry????.medication????.id === selectedId) ? selectedId : valid[0]?????.medication????.id || ''
        setSelectedId(nextSelectedId)
        const selectedBundle = valid????.find((entry) => entry????.medication????.id === nextSelectedId) || valid[0]
        setSelectedRegimenId(selectedBundle?????.regimens[0]?????.id || '')
      })
      ????.finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [clinicId, open, search, selectedId])

  const selectedBundle = useMemo(() => results????.find((entry) => entry????.medication????.id === selectedId) || null, [results, selectedId])
  const selectedV2 = useMemo(() => selectedBundle ? legacyManipulatedToV2(selectedBundle) : null, [selectedBundle])
  const selectedRegimen = useMemo(
    () => selectedV2?????.regimens????.find((entry) => entry????.id === selectedRegimenId) || selectedV2?????.regimens[0] || null,
    [selectedRegimenId, selectedV2],
  )

  const previewItem = useMemo(() => {
    if (!selectedBundle || !selectedRegimen) return null
    return mapCompoundedToPrescriptionItemV2({
      bundle: selectedBundle,
      regimenId: selectedRegimen????.id,
      patient,
      defaultStartDate,
      defaultStartHour,
    })
  }, [defaultStartDate, defaultStartHour, patient, selectedBundle, selectedRegimen])

  if (!open) return null

  return (
    <RxvModalShell zIndexClass="z-[90]" overlayClassName="bg-black/85 backdrop-blur-sm">
      <div className="mx-auto flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-[#39ff14]/30 bg-[#0a0f0a] text-slate-100 shadow-[0_0_70px_rgba(57,255,20,0????.16)]">
        <div className="flex items-center justify-between border-b border-slate-800 bg-black/60 px-6 py-4">
          <div>
            <h2 className="text-lg font-black uppercase italic tracking-tight text-white">Adicionar manipulado</h2>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-slate-500">Mesmo padrão do catálogo para entrar na Nova Receita</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="border-r border-slate-800 bg-[#0d140d] p-5">
            <RxvField label="Buscar manipulado">
              <RxvInput value={search} onChange={(event) => setSearch(event????.target????.value)} placeholder="Nome da fórmula, ativo ou forma????.????.????." />
            </RxvField>
            <div className="mt-4 space-y-2 overflow-y-auto pr-1 lg:max-h-[62vh]">
              {isLoading ? (
                <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-6 text-sm text-slate-500">Carregando manipulados????.????.????.</div>
              ) : results????.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-6 text-sm text-slate-500">Nenhum manipulado encontrado????.</div>
              ) : (
                results????.map((bundle) => {
                  const v2 = legacyManipulatedToV2(bundle)
                  return (
                    <button
                      key={bundle????.medication????.id}
                      type="button"
                      onClick={() => {
                        setSelectedId(bundle????.medication????.id)
                        setSelectedRegimenId(v2????.regimens[0]?????.id || '')
                      }}
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition ${selectedId === bundle????.medication????.id ? 'border-[#39ff14]/45 bg-[#143316]' : 'border-slate-800 bg-slate-900/40 hover:border-[#39ff14]/20'}`}
                    >
                      <p className="text-sm font-black uppercase italic text-white">{v2????.formula????.name}</p>
                      <p className="mt-2 text-xs text-slate-400">{getCompoundedCatalogSubtitle(v2) || v2????.formula????.short_description || 'Sem resumo clínico'}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <span className="rounded border border-[#39ff14]/30 bg-[#39ff14]/10 px-2 py-0????.5 text-[9px] font-black uppercase tracking-widest text-[#98f98e]">Manipulado</span>
                        {v2????.formula????.sale_classification === 'controlled' ? <span className="rounded border border-red-500/30 bg-red-500/10 px-2 py-0????.5 text-[9px] font-black uppercase tracking-widest text-red-300">Controlado</span> : null}
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </div>

          <div className="min-h-0 overflow-y-auto p-6">
            {!selectedV2 || !selectedRegimen || !previewItem ? (
              <div className="rounded-2xl border border-dashed border-slate-800 px-6 py-10 text-sm text-slate-500">Selecione um manipulado e um regime recomendado????.</div>
            ) : (
              <div className="space-y-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-black text-white">{selectedV2????.formula????.name}</h3>
                    <span className="rounded border border-[#39ff14]/30 bg-[#39ff14]/10 px-2 py-0????.5 text-[10px] font-black uppercase tracking-widest text-[#98f98e]">Manipulado</span>
                    {selectedV2????.formula????.sale_classification === 'controlled' ? <span className="rounded border border-red-500/30 bg-red-500/10 px-2 py-0????.5 text-[10px] font-black uppercase tracking-widest text-red-300">Controle especial</span> : null}
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{getCompoundedCatalogSubtitle(selectedV2)}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <RxvField label="Regime recomendado">
                    <RxvSelect
                      value={selectedRegimen????.id}
                      onChange={(event) => setSelectedRegimenId(event????.target????.value)}
                      options={selectedV2????.regimens????.map((entry) => ({ value: entry????.id, label: entry????.name || 'Regime' }))}
                    />
                  </RxvField>
                  <RxvField label="Resumo clínico">
                    <div className="rounded-xl border border-slate-800 bg-black/30 px-4 py-3 text-sm text-slate-300">
                      {getCompoundedRegimenPreview(selectedV2, selectedRegimen????.id) || 'Sem resumo clínico????.'}
                    </div>
                  </RxvField>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-black/25 p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">Princípios ativos</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedV2????.ingredients????.filter((entry) => entry????.role === 'active')????.map((entry) => (
                      <span key={entry????.id} className="rounded-full border border-[#39ff14]/25 bg-[#39ff14]/8 px-3 py-1 text-xs text-[#98f98e]">
                        {entry????.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-black/25 p-4">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Como entra na receita</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-300">
                      <p>{renderCompoundedPrescriptionLine(selectedV2, patient, selectedRegimen????.id)}</p>
                      {renderCompoundedRecommendations(selectedV2, selectedRegimen????.id)????.length ? (
                        <ul className="list-disc space-y-1 pl-5">
                          {renderCompoundedRecommendations(selectedV2, selectedRegimen????.id)????.map((entry) => <li key={entry}>{entry}</li>)}
                        </ul>
                      ) : (
                        <p>Sem recomendações adicionais ao tutor????.</p>
                      )}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-black/25 p-4">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Como vai para a farmácia</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-300">
                      <p>{renderCompoundedPharmacyInstructions(selectedV2, patient, selectedRegimen????.id)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-800 bg-black/50 px-6 py-4">
          <RxvButton variant="secondary" onClick={onClose}>Cancelar</RxvButton>
          <RxvButton variant="primary" onClick={() => previewItem && onAdd(previewItem)} disabled={!previewItem}>Adicionar à receita</RxvButton>
        </div>
      </div>
    </RxvModalShell>
  )
}

export default AddCompoundedMedicationModal
