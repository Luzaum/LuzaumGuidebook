import React, { useEffect, useMemo, useState } from 'react'
import { RxvButton, RxvField, RxvInput, RxvModalShell } from '../../../src/components/receituario/RxvComponents'
import { listManipuladosV1, type ManipuladoV1Row } from '../../../src/lib/manipuladosV1Records'
import type { PatientInfo, PrescriptionItem } from '../NovaReceita2Page'
import { normalizeManipuladoV1 } from '../manipuladosV1'
import { mapManipuladoV1ToPrescriptionItem } from '../manipuladosV1Mapper'
import { getManipuladoV1CatalogSubtitle } from '../manipuladosV1Render'
import { ManipuladosV1CatalogCard } from './ManipuladosV1CatalogCard'

interface AddCompoundedMedicationModalProps {
  open: boolean
  onClose: () => void
  onAdd: (item: PrescriptionItem) => void
  clinicId: string
  patient: PatientInfo | null
  defaultStartDate?: string
  defaultStartHour?: string
}

function rowToFormula(row: ManipuladoV1Row) {
  return normalizeManipuladoV1(row.payload as any)
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
  const [rows, setRows] = useState<ManipuladoV1Row[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [targetDoseValue, setTargetDoseValue] = useState<string>('')

  useEffect(() => {
    if (!open || !clinicId) return
    void listManipuladosV1(clinicId).then(setRows)
  }, [clinicId, open])

  useEffect(() => {
    if (!open) {
      setSearch('')
      setSelectedId('')
      setTargetDoseValue('')
    }
  }, [open])

  const filteredRows = useMemo(() => {
    const needle = search.trim().toLowerCase()
    return rows.filter((row) => {
      if (!needle) return true
      return [row.name, row.pharmaceutical_form, row.indication_summary || '', row.description || ''].join(' ').toLowerCase().includes(needle)
    })
  }, [rows, search])

  useEffect(() => {
    if (!selectedId && filteredRows.length) setSelectedId(filteredRows[0].id)
  }, [filteredRows, selectedId])

  const selectedFormula = useMemo(() => {
    const row = filteredRows.find((entry) => entry.id === selectedId) || rows.find((entry) => entry.id === selectedId) || null
    return row ? rowToFormula(row) : null
  }, [filteredRows, rows, selectedId])

  useEffect(() => {
    if (selectedFormula) {
      setTargetDoseValue(String(selectedFormula.prescribing.dose_min ?? ''))
    }
  }, [selectedId, selectedFormula])

  const hasDoseRange = selectedFormula != null
    && selectedFormula.prescribing.posology_mode === 'mg_per_kg_dose'
    && selectedFormula.prescribing.dose_min != null
    && selectedFormula.prescribing.dose_max != null
    && selectedFormula.prescribing.dose_max !== selectedFormula.prescribing.dose_min

  const targetDoseNum = hasDoseRange && targetDoseValue ? Number(targetDoseValue) : undefined

  const previewItem = useMemo(() => selectedFormula ? mapManipuladoV1ToPrescriptionItem({
    formula: selectedFormula,
    patient,
    defaultStartDate,
    defaultStartHour,
    targetDose: targetDoseNum,
  }) : null, [defaultStartDate, defaultStartHour, patient, selectedFormula, targetDoseNum])

  if (!open) return null

  return (
    <RxvModalShell zIndexClass="z-[90]" overlayClassName="bg-black/85 backdrop-blur-sm">
      <div className="mx-auto flex max-h-[92vh] w-full max-w-[1320px] flex-col overflow-hidden rounded-3xl border border-[#39ff14]/30 bg-[#0a0f0a] text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 bg-black/60 px-6 py-4">
          <div>
            <h2 className="text-lg font-black uppercase italic tracking-tight text-white">Adicionar manipulado</h2>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-slate-500">Catálogo V1 da clínica</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)]">
          <div className="border-b border-slate-800 bg-[#0d140d] p-5 xl:border-b-0 xl:border-r">
            <RxvField label="Buscar manipulado">
              <RxvInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nome, forma, indicação..." data-testid="compounded-modal-search" />
            </RxvField>
            <div className="mt-4 space-y-2 overflow-y-auto pr-1 lg:max-h-[62vh]">
              {filteredRows.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-6 text-sm text-slate-500">Nenhuma fórmula V1 encontrada.</div>
              ) : (
                filteredRows.map((row) => (
                  <ManipuladosV1CatalogCard key={row.id} item={rowToFormula(row)} active={selectedId === row.id} onClick={() => setSelectedId(row.id)} />
                ))
              )}
            </div>
          </div>
          <div className="min-h-0 overflow-y-auto p-6 xl:p-7">
            {!selectedFormula || !previewItem ? (
              <div className="rounded-2xl border border-dashed border-slate-800 px-6 py-10 text-sm text-slate-500">Selecione uma fórmula V1.</div>
            ) : (
              <div className="space-y-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-black text-white">{selectedFormula.identity.name}</h3>
                    <span className="rounded border border-[#39ff14]/30 bg-[#39ff14]/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#98f98e]">Manipulado V1</span>
                    {selectedFormula.identity.sale_classification === 'controlled' ? <span className="rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-red-300">Controlado</span> : null}
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{getManipuladoV1CatalogSubtitle(selectedFormula)}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-black/25 p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Posologia</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-300">
                      <p>{previewItem.instructions || ''}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-black/25 p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Farmácia</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-300">
                      <p>{previewItem.compounded_pharmacy_guidance || ''}</p>
                    </div>
                  </div>
                </div>

                {hasDoseRange && selectedFormula ? (
                  <div className="rounded-2xl border border-[#39ff14]/20 bg-[#39ff14]/5 p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-[#98f98e] mb-3">
                      Escolher dose dentro da faixa
                    </p>
                    <p className="text-xs text-slate-400 mb-3">
                      Faixa: {selectedFormula.prescribing.dose_min}–{selectedFormula.prescribing.dose_max} {selectedFormula.prescribing.dose_unit}
                    </p>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={selectedFormula.prescribing.dose_min ?? 0}
                        max={selectedFormula.prescribing.dose_max ?? 100}
                        step="0.5"
                        value={targetDoseValue}
                        onChange={(e) => setTargetDoseValue(e.target.value)}
                        className="w-28 rounded-xl border border-[#39ff14]/30 bg-black/30 px-3 py-2 text-sm text-white focus:border-[#39ff14]/60 focus:outline-none"
                      />
                      <span className="text-sm text-slate-400">{selectedFormula.prescribing.dose_unit}</span>
                    </div>
                    {patient?.weight_kg ? (
                      <p className="mt-3 text-sm text-slate-300">
                        Dose calculada para {patient.weight_kg} kg:{' '}
                        <strong className="text-white">
                          {targetDoseValue ? Number((Number(targetDoseValue) * Number(patient.weight_kg)).toFixed(2)) : '—'} {selectedFormula.prescribing.dose_unit.replace('/kg', '')}
                        </strong>
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-800 bg-black/50 px-6 py-4">
          <RxvButton variant="secondary" onClick={onClose} data-testid="compounded-modal-cancel">Cancelar</RxvButton>
          <RxvButton variant="primary" onClick={() => previewItem && onAdd(previewItem)} disabled={!previewItem} data-testid="compounded-modal-confirm">Adicionar à receita</RxvButton>
        </div>
      </div>
    </RxvModalShell>
  )
}

export default AddCompoundedMedicationModal
