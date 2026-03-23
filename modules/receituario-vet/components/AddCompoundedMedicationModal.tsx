import React, { useEffect, useMemo, useState } from 'react'
import { RxvButton, RxvField, RxvInput, RxvModalShell, RxvSelect } from '../../../src/components/receituario/RxvComponents'
import {
  getCompoundedMedicationBundle,
  listCompoundedMedications,
  type CompoundedMedicationBundle,
} from '../../../src/lib/compoundedRecords'
import type { PatientInfo, PrescriptionItem } from '../NovaReceita2Page'
import { buildCompoundedPrescriptionItem } from '../compoundedItemBuilder'
import {
  buildCompoundedCardSubtitle,
  buildCompoundedInstruction,
  buildCompoundedPharmacyInstruction,
  buildCompoundedRegimenSummary,
  getCompoundedActiveIngredients,
} from '../compoundedUi'

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
      .then(async (rows) => {
        const bundles = await Promise.all(rows.map(async (row) => await getCompoundedMedicationBundle(clinicId, row.id)))
        if (cancelled) return
        const valid = bundles.filter(Boolean) as CompoundedMedicationBundle[]
        setResults(valid)

        if (!valid.length) {
          setSelectedId('')
          setSelectedRegimenId('')
          return
        }

        const nextSelectedId = valid.some((entry) => entry.medication.id === selectedId)
          ? selectedId
          : valid[0].medication.id

        setSelectedId(nextSelectedId)

        const selectedBundle = valid.find((entry) => entry.medication.id === nextSelectedId) || valid[0]
        const nextRegimenId = selectedBundle.regimens.some((entry) => entry.id === selectedRegimenId)
          ? selectedRegimenId
          : (selectedBundle.regimens[0]?.id || '')

        setSelectedRegimenId(nextRegimenId)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [clinicId, open, search, selectedId, selectedRegimenId])

  const selectedBundle = useMemo(
    () => results.find((entry) => entry.medication.id === selectedId) || null,
    [results, selectedId]
  )

  const selectedRegimen = useMemo(
    () => selectedBundle?.regimens.find((entry) => entry.id === selectedRegimenId) || selectedBundle?.regimens[0] || null,
    [selectedBundle, selectedRegimenId]
  )

  const previewItem = useMemo(() => {
    if (!selectedBundle || !selectedRegimen) return null
    return buildCompoundedPrescriptionItem({
      bundle: selectedBundle,
      regimen: selectedRegimen,
      patient,
      defaultStartDate,
      defaultStartHour,
    })
  }, [defaultStartDate, defaultStartHour, patient, selectedBundle, selectedRegimen])

  if (!open) return null

  const handleConfirm = () => {
    if (!previewItem) return
    onAdd(previewItem)
  }

  const activeIngredients = previewItem ? getCompoundedActiveIngredients(previewItem.compounded_snapshot) : []

  return (
    <RxvModalShell zIndexClass="z-[90]" overlayClassName="bg-black/85 backdrop-blur-sm">
      <div className="mx-auto flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-[#39ff14]/30 bg-[#0a0f0a] text-slate-100 shadow-[0_0_70px_rgba(57,255,20,0.16)]">
        <div className="flex items-center justify-between border-b border-slate-800 bg-black/60 px-6 py-4">
          <div>
            <h2 className="text-lg font-black uppercase italic tracking-tight text-white">Adicionar manipulado</h2>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-slate-500">Catálogo magistral da clínica com regimes reutilizáveis</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-0 lg:grid-cols-[320px_1fr]">
          <div className="border-r border-slate-800 bg-[#0d140d] p-5">
            <RxvField label="Buscar manipulado">
              <RxvInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nome da fórmula, ativo ou forma..."
                data-testid="compounded-modal-search"
              />
            </RxvField>
            <div className="mt-4 space-y-2 overflow-y-auto pr-1 lg:max-h-[62vh]">
              {isLoading ? (
                <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-6 text-sm text-slate-500">Carregando manipulados...</div>
              ) : results.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-6 text-sm text-slate-500">Nenhum manipulado encontrado.</div>
              ) : (
                results.map((bundle) => (
                  <button
                    key={bundle.medication.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(bundle.medication.id)
                      setSelectedRegimenId(bundle.regimens[0]?.id || '')
                    }}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      selectedId === bundle.medication.id
                        ? 'border-[#39ff14]/55 bg-[#143316]'
                        : 'border-slate-800 bg-slate-900/40 hover:border-[#39ff14]/35'
                    }`}
                    data-testid={`compounded-modal-item-${bundle.medication.id}`}
                  >
                    <p className="text-sm font-black uppercase italic text-white">{bundle.medication.name}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="rounded border border-[#39ff14]/30 bg-[#39ff14]/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#98f98e]">Manipulado</span>
                      {bundle.medication.is_controlled ? <span className="rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-red-300">Controlado</span> : null}
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{bundle.medication.pharmaceutical_form}</p>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="min-h-0 overflow-y-auto p-6">
            {!selectedBundle || !selectedRegimen || !previewItem ? (
              <div className="rounded-2xl border border-dashed border-slate-800 px-6 py-10 text-sm text-slate-500">Selecione um manipulado e um regime recomendado.</div>
            ) : (
              <div className="space-y-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-black text-white">{selectedBundle.medication.name}</h3>
                    <span className="rounded border border-[#39ff14]/30 bg-[#39ff14]/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#98f98e]">Manipulado</span>
                    {selectedBundle.medication.is_controlled ? <span className="rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-red-300">Controle especial</span> : null}
                  </div>
                  <p className="mt-2 text-sm text-slate-400">
                    {buildCompoundedCardSubtitle(previewItem, patient) || [selectedBundle.medication.pharmaceutical_form, selectedBundle.medication.default_qsp_text, selectedBundle.medication.default_quantity_text].filter(Boolean).join(' • ')}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <RxvField label="Regime recomendado">
                    <RxvSelect
                      value={selectedRegimen.id}
                      onChange={(e) => setSelectedRegimenId(e.target.value)}
                      options={selectedBundle.regimens.map((entry) => ({
                        value: entry.id,
                        label: entry.regimen_name || `${entry.species} • ${entry.route || 'sem via'}`,
                      }))}
                    />
                  </RxvField>
                  <RxvField label="Resumo clínico">
                    <div className="rounded-xl border border-slate-800 bg-black/30 px-4 py-3 text-sm text-slate-300">
                      {selectedRegimen.indication || selectedBundle.medication.description || 'Sem indicação cadastrada.'}
                    </div>
                  </RxvField>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-black/25 p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">Ativos da fórmula</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeIngredients.length ? activeIngredients.map((entry) => (
                      <span key={entry} className="rounded-full border border-[#39ff14]/25 bg-[#39ff14]/8 px-3 py-1 text-xs text-[#98f98e]">
                        {entry}
                      </span>
                    )) : <span className="text-sm text-slate-500">Nenhum ativo destacado</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-black/25 p-4">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Estrutura clínica</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-300">
                      <p>Modo: {selectedRegimen.dosing_mode === 'calculated' ? 'Dose calculada pelo peso' : 'Dose fixa do regime'}</p>
                      <p>Regime: {selectedRegimen.regimen_name || 'Posologia padrão'}</p>
                      <p>Paciente atual: {patient?.weight_kg ? `${patient.weight_kg} kg` : 'peso não informado'}</p>
                      <p>{buildCompoundedRegimenSummary(previewItem, patient) || 'Sem cálculo clínico adicional'}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-black/25 p-4">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Prévia do item</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-300">
                      <p>{buildCompoundedCardSubtitle(previewItem, patient) || selectedBundle.medication.pharmaceutical_form}</p>
                      <p>{activeIngredients.join(' • ') || 'Sem ativos destacados'}</p>
                      <p>{buildCompoundedInstruction(previewItem, patient)}</p>
                      <p>{buildCompoundedPharmacyInstruction(previewItem, patient)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-800 bg-black/50 px-6 py-4">
          <RxvButton variant="secondary" onClick={onClose} data-testid="compounded-modal-cancel">Cancelar</RxvButton>
          <RxvButton variant="primary" onClick={handleConfirm} disabled={!previewItem} data-testid="compounded-modal-confirm">Adicionar à receita</RxvButton>
        </div>
      </div>
    </RxvModalShell>
  )
}

export default AddCompoundedMedicationModal
