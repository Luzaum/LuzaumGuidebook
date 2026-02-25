// ✅ AddMedicationModal2 — Modal para adicionar medicamentos (100% Catálogo 3.0)
// Versão completa com todos os campos de apresentação do schema Supabase

import React, { useState, useEffect, useCallback } from 'react'
import {
  RxvField,
  RxvInput,
  RxvSelect,
  RxvTextarea,
  RxvButton,
} from '../../../src/components/receituario/RxvComponents'
import {
  searchMedications,
  getMedicationPresentations,
  getMedicationRecommendedDoses,
  type RecommendedDose,
} from '../../../src/lib/clinicRecords'
import type { PrescriptionItem, PatientInfo } from '../NovaReceita2Page'

// ===================== ROUTE OPTIONS =====================
const ROUTE_OPTIONS = [
  { value: 'VO', label: 'Oral (VO)' },
  { value: 'SC', label: 'Subcutâneo (SC)' },
  { value: 'IM', label: 'Intramuscular (IM)' },
  { value: 'IV', label: 'Intravenoso (IV)' },
  { value: 'Tópico', label: 'Tópico' },
  { value: 'Oftálmico', label: 'Oftálmico' },
  { value: 'Otológico', label: 'Otológico' },
  { value: 'Intranasal', label: 'Intranasal' },
  { value: 'Retal', label: 'Retal' },
  { value: 'Inalatório', label: 'Inalatório' },
  { value: 'Transdérmico', label: 'Transdérmico' },
]

// ===================== TYPES =====================
interface AddMedicationModal2Props {
  open: boolean
  onClose: () => void
  onAdd: (item: PrescriptionItem) => void
  clinicId: string
  patient: PatientInfo | null
  /** Se true, ignora busca no catálogo e exibe apenas o formulário manual */
  manualMode?: boolean
}

interface MedicationSearchResult {
  id: string
  name: string
  is_controlled: boolean
  pharmacy_origin?: string
  default_route?: string
}

/** Schema completo da tabela medication_presentations */
interface PresentationRecord {
  id: string
  medication_id: string
  pharmaceutical_form: string | null
  concentration_text: string | null
  additional_component: string | null
  presentation_unit: string | null
  commercial_name: string | null
  is_default?: boolean
  value?: string | null
  value_unit?: string | null
  per_value?: string | null
  per_unit?: string | null
  avg_price_brl?: number | null
  package_quantity?: string | null
  package_unit?: string | null
}

// ===================== COMPONENT =====================
export function AddMedicationModal2({ open, onClose, onAdd, clinicId, patient, manualMode = false }: AddMedicationModal2Props) {
  // Catalog state
  const [searchQuery, setSearchQuery] = useState('')
  const [medications, setMedications] = useState<MedicationSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState<MedicationSearchResult | null>(null)
  const [presentations, setPresentations] = useState<PresentationRecord[]>([])
  const [selectedPresentationId, setSelectedPresentationId] = useState<string | null>(null)
  const [recommendedDoses, setRecommendedDoses] = useState<RecommendedDose[]>([])

  // Form state
  const [dose, setDose] = useState('')
  const [frequency, setFrequency] = useState('')
  const [route, setRoute] = useState('VO')
  const [duration, setDuration] = useState('')
  const [instructions, setInstructions] = useState('')
  const [cautions, setCautions] = useState('')

  // Manual mode only: extra fields
  const [manualName, setManualName] = useState('')
  const [manualConcentration, setManualConcentration] = useState('')
  const [manualForm, setManualForm] = useState('')

  // ==================== EFFECTS ====================

  useEffect(() => {
    if (!open) return
    const onEscape = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [open, onClose])

  // Auto-search on open
  useEffect(() => {
    if (!open || !clinicId || manualMode) {
      setMedications([])
      return
    }

    const q = searchQuery.trim()
    const timer = setTimeout(async () => {
      try {
        setIsSearching(true)
        const results = await searchMedications(clinicId, q || '', q ? 50 : 20)
        setMedications(results)
      } catch (err) {
        console.error('[AddMedicationModal2] Search failed', err)
        setMedications([])
      } finally {
        setIsSearching(false)
      }
    }, q ? 400 : 0)

    return () => clearTimeout(timer)
  }, [searchQuery, clinicId, open, manualMode])

  // Reset on close
  useEffect(() => {
    if (!open) {
      setSelectedMedication(null)
      setPresentations([])
      setSelectedPresentationId(null)
      setRecommendedDoses([])
      setSearchQuery('')
      setDose('')
      setFrequency('')
      setRoute('VO')
      setDuration('')
      setInstructions('')
      setCautions('')
      setManualName('')
      setManualConcentration('')
      setManualForm('')
    }
  }, [open])

  // ==================== HANDLERS ====================

  const handleMedicationSelect = useCallback(
    async (med: MedicationSearchResult) => {
      if (!clinicId) return

      setSelectedMedication(med)

      try {
        const presentationsData = await getMedicationPresentations(clinicId, med.id) as PresentationRecord[]
        setPresentations(presentationsData)

        const defaultPresentation = presentationsData.find((p) => p.is_default) || presentationsData[0]
        setSelectedPresentationId(defaultPresentation?.id || null)

        const dosesData = await getMedicationRecommendedDoses(clinicId, med.id)
        setRecommendedDoses(dosesData)

        // Sugerir dose para a espécie do paciente
        if (patient) {
          const patientSpecies = (patient.species || '').toLowerCase().includes('felin') ? 'gato' : 'cão'
          const bestDose =
            dosesData.find((d) => d.species === patientSpecies) ||
            dosesData.find((d) => d.species === 'ambos')

          if (bestDose) {
            setDose(`${bestDose.dose_value} ${bestDose.dose_unit}`)
            setRoute(bestDose.route || 'VO')
            setFrequency(bestDose.frequency || '')
          }
        }

        setSearchQuery('')
      } catch (err) {
        console.error('[AddMedicationModal2] Error loading medication details', err)
      }
    },
    [clinicId, patient]
  )

  const handleAdd = useCallback(() => {
    if (manualMode) {
      // Modo manual: nome é obrigatório
      if (!manualName.trim()) return

      const newItem: PrescriptionItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        type: 'medication',
        isManual: true,
        name: manualName.trim(),
        pharmaceutical_form: manualForm || undefined,
        concentration_text: manualConcentration || undefined,
        dose,
        frequency,
        route,
        duration,
        instructions,
        cautions: cautions.split('\n').map(s => s.trim()).filter(Boolean),
      }

      onAdd(newItem)
      onClose()
      return
    }

    if (!selectedMedication) return

    const selectedPresentation = presentations.find((p) => p.id === selectedPresentationId)

    // label legível para exibição na lista do editor
    const presentationLabel =
      selectedPresentation
        ? [selectedPresentation.pharmaceutical_form, selectedPresentation.concentration_text]
          .filter(Boolean)
          .join(' - ')
        : undefined

    const newItem: PrescriptionItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type: 'medication',
      isManual: false,
      medication_id: selectedMedication.id,
      presentation_id: selectedPresentationId || undefined,

      // Nome base
      name: selectedMedication.name,
      presentation_label: presentationLabel,

      // ✅ Todos os campos da apresentação (para adapter construir title/subtitle completos)
      pharmaceutical_form: selectedPresentation?.pharmaceutical_form || undefined,
      concentration_text: selectedPresentation?.concentration_text || undefined,
      commercial_name: selectedPresentation?.commercial_name || undefined,
      additional_component: selectedPresentation?.additional_component || undefined,
      value: selectedPresentation?.value || undefined,
      value_unit: selectedPresentation?.value_unit || undefined,
      per_value: selectedPresentation?.per_value || undefined,
      per_unit: selectedPresentation?.per_unit || undefined,
      avg_price_brl: selectedPresentation?.avg_price_brl ?? undefined,
      package_quantity: selectedPresentation?.package_quantity || undefined,
      package_unit: selectedPresentation?.package_unit || undefined,

      // Campos de dosagem
      dose,
      frequency,
      route,
      duration,
      instructions,
      cautions: cautions.split('\n').map(s => s.trim()).filter(Boolean),
    }

    onAdd(newItem)
    onClose()
  }, [
    manualMode,
    manualName,
    manualForm,
    manualConcentration,
    selectedMedication,
    presentations,
    selectedPresentationId,
    dose,
    frequency,
    route,
    duration,
    instructions,
    cautions,
    onAdd,
    onClose,
  ])

  if (!open) return null

  const selectedPresentation = presentations.find((p) => p.id === selectedPresentationId)
  const canAdd = manualMode ? !!manualName.trim() : !!selectedMedication

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-[#2f5b25] bg-[#0a0f0a] text-slate-100 shadow-[0_0_60px_rgba(57,255,20,0.2)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-black/60 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-white">
              {manualMode ? 'Adicionar Medicamento Manual' : 'Adicionar Medicamento do Catálogo'}
            </h2>
            <p className="text-xs text-slate-500">
              {manualMode
                ? 'Preencha os dados do medicamento manualmente'
                : 'Busque no Catálogo 3.0 e adicione à receita'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <RxvButton variant="secondary" onClick={onClose}>
              Cancelar
            </RxvButton>
            <RxvButton variant="primary" onClick={handleAdd} disabled={!canAdd}>
              Adicionar à Receita
            </RxvButton>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[calc(92vh-80px)] overflow-y-auto p-6 space-y-6">

          {/* ==================== MODO CATÁLOGO ==================== */}
          {!manualMode && (
            <>
              {/* Busca */}
              {!selectedMedication && (
                <div className="space-y-3">
                  <RxvField label="Buscar medicamento">
                    <div className="relative">
                      <RxvInput
                        placeholder="Digite para buscar ou veja a lista abaixo..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {isSearching && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined animate-spin text-[#39ff14] text-[18px]">
                          sync
                        </span>
                      )}
                    </div>
                  </RxvField>

                  {!isSearching && medications.length === 0 && !searchQuery && (
                    <p className="text-xs text-slate-500 italic text-center py-4">
                      Carregando medicamentos da clínica...
                    </p>
                  )}
                  {!isSearching && medications.length === 0 && searchQuery && (
                    <p className="text-xs text-slate-500 text-center py-4">
                      Nenhum medicamento encontrado para "{searchQuery}"
                    </p>
                  )}
                  {medications.length > 0 && (
                    <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                      {medications.map((med) => (
                        <button
                          key={med.id}
                          type="button"
                          className="w-full rounded-xl border border-slate-800 bg-black/40 px-4 py-3 text-left hover:border-[#39ff14]/50 hover:bg-[#39ff14]/5 transition-all"
                          onClick={() => handleMedicationSelect(med)}
                        >
                          <p className="text-sm font-bold text-white">{med.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {med.pharmacy_origin || 'Veterinária'}
                            {med.is_controlled && ' • Controlado'}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Medicamento selecionado */}
              {selectedMedication && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl border border-[#39ff14]/30 bg-[#39ff14]/5 px-4 py-3">
                    <div>
                      <p className="text-base font-bold text-white">{selectedMedication.name}</p>
                      <p className="text-xs text-slate-500">{selectedMedication.pharmacy_origin || 'Veterinária'}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedMedication(null)}
                      className="text-slate-500 hover:text-red-400"
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>

                  {/* Apresentação */}
                  {presentations.length > 0 && (
                    <div className="space-y-2">
                      <RxvField label="Apresentação">
                        <RxvSelect
                          value={selectedPresentationId || ''}
                          onChange={(e) => setSelectedPresentationId(e.target.value)}
                          options={presentations.map((p) => ({
                            value: p.id,
                            label: [
                              p.commercial_name || p.pharmaceutical_form || 'Sem nome',
                              p.concentration_text,
                              p.is_default ? '(Padrão)' : undefined,
                            ].filter(Boolean).join(' - '),
                          }))}
                        />
                      </RxvField>

                      {/* Preview da apresentação selecionada */}
                      {selectedPresentation && (
                        <div className="rounded-xl border border-slate-800 bg-black/30 px-4 py-3 space-y-1 text-xs text-slate-400">
                          {selectedPresentation.concentration_text && (
                            <p>Concentração: <span className="text-white">{selectedPresentation.concentration_text}</span></p>
                          )}
                          {selectedPresentation.pharmaceutical_form && (
                            <p>Forma: <span className="text-white">{selectedPresentation.pharmaceutical_form}</span></p>
                          )}
                          {selectedPresentation.commercial_name && (
                            <p>Nome comercial: <span className="text-amber-300">{selectedPresentation.commercial_name}</span></p>
                          )}
                          {selectedPresentation.package_quantity && selectedPresentation.package_unit && (
                            <p>Embalagem: <span className="text-white">{selectedPresentation.package_quantity} {selectedPresentation.package_unit}</span></p>
                          )}
                          {selectedPresentation.avg_price_brl && selectedPresentation.avg_price_brl > 0 && (
                            <p>Preço médio: <span className="text-emerald-400">R$ {selectedPresentation.avg_price_brl.toFixed(2)}</span></p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Doses recomendadas */}
                  {recommendedDoses.length > 0 && (
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                        Doses indicadas no catálogo
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {recommendedDoses.map((rd, idx) => (
                          <button
                            key={rd.id || idx}
                            type="button"
                            className="flex w-full items-center justify-between rounded-lg bg-black/40 px-3 py-2 text-left border border-transparent hover:border-amber-500/50 transition-all"
                            onClick={() => {
                              setDose(`${rd.dose_value} ${rd.dose_unit}`)
                              setRoute(rd.route || 'VO')
                              setFrequency(rd.frequency || '')
                            }}
                          >
                            <div>
                              <p className="text-xs font-bold text-amber-200">
                                {rd.species} • {rd.route || 'VO'}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {rd.dose_value} {rd.dose_unit}
                                {rd.frequency && ` • ${rd.frequency}`}
                              </p>
                            </div>
                            <span className="text-[10px] text-amber-500 font-bold">APLICAR</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* ==================== MODO MANUAL ==================== */}
          {manualMode && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RxvField label="Nome do medicamento *">
                  <RxvInput
                    placeholder="Ex: Amoxicilina"
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                  />
                </RxvField>

                <RxvField label="Concentração">
                  <RxvInput
                    placeholder="Ex: 500 mg"
                    value={manualConcentration}
                    onChange={(e) => setManualConcentration(e.target.value)}
                  />
                </RxvField>

                <RxvField label="Forma farmacêutica">
                  <RxvInput
                    placeholder="Ex: Comprimido, Suspensão oral"
                    value={manualForm}
                    onChange={(e) => setManualForm(e.target.value)}
                  />
                </RxvField>

                <RxvField label="Via de administração">
                  <RxvSelect
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    options={ROUTE_OPTIONS}
                  />
                </RxvField>
              </div>
            </div>
          )}

          {/* ==================== CAMPOS COMUNS (dose/freq/duração) ==================== */}
          {(selectedMedication || manualMode) && (
            <div className="space-y-4">
              <div className="h-px bg-slate-800/60" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <RxvField label="Dose">
                  <RxvInput
                    placeholder="Ex: 10 mg/kg"
                    value={dose}
                    onChange={(e) => setDose(e.target.value)}
                  />
                </RxvField>

                {!manualMode && (
                  <RxvField label="Via de administração">
                    <RxvSelect
                      value={route}
                      onChange={(e) => setRoute(e.target.value)}
                      options={ROUTE_OPTIONS}
                    />
                  </RxvField>
                )}

                <RxvField label="Frequência">
                  <RxvInput
                    placeholder="Ex: BID, TID, 12/12h"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                </RxvField>

                <RxvField label="Duração">
                  <RxvInput
                    placeholder="Ex: 7 dias"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </RxvField>
              </div>

              <RxvField label="Instruções de uso">
                <RxvTextarea
                  placeholder="Ex: Dar com alimento, evitar sol..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={3}
                />
              </RxvField>

              <RxvField label="Cautelas (uma por linha)">
                <RxvTextarea
                  placeholder="Ex: Não usar em fêmeas prenhes&#10;Monitorar função renal"
                  value={cautions}
                  onChange={(e) => setCautions(e.target.value)}
                  rows={2}
                />
              </RxvField>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
