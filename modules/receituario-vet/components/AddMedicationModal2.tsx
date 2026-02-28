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
  { value: 'Tópico', label: 'Tópica' },
  { value: 'Oftálmico', label: 'Oftálmica' },
  { value: 'Otológico', label: 'Otológica' },
  { value: 'Intranasal', label: 'Intranasal' },
  { value: 'Retal', label: 'Retal' },
  { value: 'Inalatório', label: 'Inalatória' },
  { value: 'Transdérmico', label: 'Transdérmica' },
]

// ===================== TYPES =====================
interface AddMedicationModal2Props {
  open: boolean
  onClose: () => void
  onAdd: (item: PrescriptionItem) => void
  clinicId: string
  patient: PatientInfo | null
  manualMode?: boolean
  editingItem?: PrescriptionItem | null
}

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
  metadata?: Record<string, unknown> | null
}

function extractPresentationField(pres: PresentationRecord, field: string): string | undefined {
  const direct = (pres as unknown as Record<string, unknown>)[field]
  if (direct != null && direct !== '') return String(direct)
  const fromMeta = pres.metadata?.[field]
  if (fromMeta != null && fromMeta !== '') return String(fromMeta)
  return undefined
}

// ===================== COMPONENT =====================
export function AddMedicationModal2({ open, onClose, onAdd, clinicId, patient, manualMode = false, editingItem }: AddMedicationModal2Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [medications, setMedications] = useState<MedicationSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState<MedicationSearchResult | null>(null)
  const [presentations, setPresentations] = useState<PresentationRecord[]>([])
  const [selectedPresentationId, setSelectedPresentationId] = useState<string | null>(null)
  const [rxTheme, setRxTheme] = useState<'dark' | 'light'>(() => {
    try {
      return localStorage.getItem('receituario-vet:theme:v1') === 'light' ? 'light' : 'dark'
    } catch { return 'dark' }
  })
  const isDark = rxTheme === 'dark'
  const [recommendedDoses, setRecommendedDoses] = useState<RecommendedDose[]>([])

  // Form state
  const [dose, setDose] = useState('')
  const [frequency, setFrequency] = useState('')
  const [route, setRoute] = useState('VO')
  const [duration, setDuration] = useState('')
  const [instructions, setInstructions] = useState('')
  const [cautions, setCautions] = useState('')

  const [manualName, setManualName] = useState('')
  const [manualConcentration, setManualConcentration] = useState('')
  const [manualForm, setManualForm] = useState('')
  const [manualCommercialName, setManualCommercialName] = useState('')

  useEffect(() => {
    if (!open) return
    const onEscape = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onEscape)

    // Sync theme
    const theme = localStorage.getItem('receituario-vet:theme:v1') === 'light' ? 'light' : 'dark'
    setRxTheme(theme)

    return () => window.removeEventListener('keydown', onEscape)
  }, [open, onClose])

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
      setManualCommercialName('')
    }
  }, [open])

  // ==================== HANDLERS ====================

  const handleMedicationSelect = useCallback(
    async (med: MedicationSearchResult) => {
      if (!clinicId) return

      setSelectedMedication(med)

      try {
        const presentationsData = await getMedicationPresentations(clinicId, med.id) as unknown as PresentationRecord[]
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
        console.error('[AddMedicationModal2] Failed to load presentations', err)
      }
    },
    [clinicId, patient]
  )

  const handleAdd = useCallback(() => {
    if (manualMode) {
      if (!manualName.trim()) return
      const newItem: PrescriptionItem = {
        ...editingItem,
        id: editingItem?.id || `item-${Date.now()}`,
        type: 'medication',
        isManual: true,
        name: manualName.trim(),
        pharmaceutical_form: manualForm || undefined,
        concentration_text: manualConcentration || undefined,
        commercial_name: manualCommercialName.trim() || undefined,
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
    const newItem: PrescriptionItem = {
      ...editingItem,
      id: editingItem?.id || `item-${Date.now()}`,
      type: 'medication',
      medication_id: selectedMedication.id,
      presentation_id: selectedPresentationId || undefined,
      name: selectedMedication.name,
      pharmaceutical_form: selectedPresentation?.pharmaceutical_form || undefined,
      concentration_text: selectedPresentation?.concentration_text || undefined,
      commercial_name: selectedPresentation?.commercial_name || undefined,
      additional_component: selectedPresentation?.additional_component || undefined,
      value: selectedPresentation?.value || undefined,
      value_unit: selectedPresentation?.value_unit || undefined,
      per_value: selectedPresentation?.per_value || undefined,
      per_unit: selectedPresentation?.per_unit || undefined,
      avg_price_brl: selectedPresentation?.avg_price_brl ?? undefined,
      package_quantity: selectedPresentation ? extractPresentationField(selectedPresentation, 'package_quantity') : undefined,
      package_unit: selectedPresentation ? extractPresentationField(selectedPresentation, 'package_unit') : undefined,

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
    manualCommercialName,
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
    editingItem,
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
            <h2 className="text-lg font-bold text-white">{manualMode ? 'Medicamento Manual' : 'Medicamento Catálogo'}</h2>
          </div>
          <div className="flex items-center gap-2">
            <RxvButton variant="secondary" onClick={onClose}>Cancelar</RxvButton>
            <RxvButton variant="primary" onClick={handleAdd} disabled={!canAdd}>Adicionar</RxvButton>
          </div>
        </div>

        <div className="max-h-[calc(92vh-80px)] overflow-y-auto p-6 space-y-6">
          {!manualMode ? (
            <div className="space-y-4">
              <RxvField label="Buscar medicamento">
                <RxvInput placeholder="Digite para buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </RxvField>
              {medications.length > 0 && (
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {medications.map(m => (
                    <button key={m.id} className={`w-full p-3 border rounded-xl text-left transition-all ${isDark
                      ? 'bg-black/40 border-slate-800 hover:border-[#39ff14]'
                      : 'bg-white border-slate-200 hover:border-[#39ff14] hover:bg-slate-50'
                      }`} onClick={() => handleMedicationSelect(m)}>
                      <p className="font-bold">{m.name}</p>
                    </button>
                  ))}
                </div>
              )}
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
            </div>
          ) : (
            /* ==================== MODO MANUAL ==================== */
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

                <RxvField label="Nome comercial">
                  <RxvInput
                    placeholder="Ex: Amoxivet, Claritin Vet"
                    value={manualCommercialName}
                    onChange={(e) => setManualCommercialName(e.target.value)}
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

              <RxvField label="Cautelas / Observações">
                <RxvTextarea
                  placeholder="Uma cautela por linha..."
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
