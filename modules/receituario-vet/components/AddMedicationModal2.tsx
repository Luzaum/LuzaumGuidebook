// ✅ AddMedicationModal2 — Modal para adicionar medicamentos (100% Catálogo 3.0)
// Versão completa com todos os campos de apresentação do schema Supabase

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  RxvField,
  RxvInput,
  RxvSelect,
  RxvTextarea,
  RxvButton,
} from '../../../src/components/receituario/RxvComponents'
import { createPortal } from 'react-dom'
import {
  searchMedications,
  getMedicationPresentations,
  getMedicationRecommendedDoses,
  type RecommendedDose,
} from '../../../src/lib/clinicRecords'
import type { PrescriptionItem, PatientInfo } from '../NovaReceita2Page'

// ===================== OPTIONS =====================
const FORM_OPTIONS = [
  { value: 'Comprimido', label: 'Comprimido' },
  { value: 'Cápsula', label: 'Cápsula' },
  { value: 'Suspensão Oral', label: 'Suspensão Oral' },
  { value: 'Solução Oral', label: 'Solução Oral' },
  { value: 'Xarope', label: 'Xarope' },
  { value: 'Gotas', label: 'Gotas' },
  { value: 'Injetável', label: 'Injetável' },
  { value: 'Pomada', label: 'Pomada' },
  { value: 'Creme', label: 'Creme' },
  { value: 'Gel', label: 'Gel' },
  { value: 'Colírio', label: 'Colírio' },
  { value: 'Otológico', label: 'Otológico' },
  { value: 'Transdérmico', label: 'Transdérmico' },
  { value: 'Shampoo', label: 'Shampoo' },
  { value: 'Loção', label: 'Loção' },
  { value: 'Spray', label: 'Spray' },
  { value: 'Pó', label: 'Pó' },
  { value: 'Outro', label: 'Outro' },
]

const CONC_UNIT_OPTIONS = [
  'mg', 'g', 'mcg', 'mL', 'mg/mL', 'g/mL', 'mg/comprimido', 'mg/cápsula', 'mg/g', '%', 'UI/mL', 'UI', 'UI/comprimido', 'mEq/mL', 'mEq'
].map(u => ({ value: u, label: u }))

const DOSE_UNIT_OPTIONS = [
  'mg/kg', 'mg', 'mL/kg', 'mL', 'gotas/kg', 'gotas', 'UI/kg', 'UI', 'UI/comprimido', 'mcg/kg', 'mcg', 'comprimido(s)', 'cápsula(s)'
].map(u => ({ value: u, label: u }))

const FREQ_OPTIONS = [
  { value: 'q1h', label: 'q1h (a cada 1h)' },
  { value: 'q2h', label: 'q2h (a cada 2h)' },
  { value: 'q4h', label: 'q4h (a cada 4h)' },
  { value: 'q6h', label: 'q6h (a cada 6h)' },
  { value: 'q8h', label: 'q8h (a cada 8h)' },
  { value: 'q12h', label: 'q12h (a cada 12h)' },
  { value: 'q24h', label: 'q24h (a cada 24h)' },
  { value: '1x ao dia', label: '1x ao dia' },
  { value: '2x ao dia', label: '2x ao dia' },
  { value: '3x ao dia', label: '3x ao dia' },
  { value: '4x ao dia', label: '4x ao dia' },
  { value: '6x ao dia', label: '6x ao dia' },
  { value: '8x ao dia', label: '8x ao dia' },
  { value: '12x ao dia', label: '12x ao dia' },
  { value: '24x ao dia', label: '24x ao dia' },
  { value: 'Uso contínuo', label: 'Uso contínuo' },
  { value: 'Dose única', label: 'Dose única' },
]

const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const t = `${String(i).padStart(2, '0')}:00`
  return { value: t, label: t }
})


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
  value?: number | null
  value_unit?: string | null
  per_value?: number | null
  per_unit?: string | null
  avg_price_brl?: number | null
  package_quantity?: string | null
  package_unit?: string | null
  /** metadata JSON — fallback para campos que o DB armazena como JSON em vez de coluna direta */
  metadata?: Record<string, unknown> | null
}

/** Extrai um campo de PresentationRecord, com fallback no metadata JSON */
function extractPresentationField(pres: PresentationRecord, field: string): string | undefined {
  const direct = (pres as unknown as Record<string, unknown>)[field]
  if (direct != null && direct !== '') return String(direct)
  const fromMeta = pres.metadata?.[field]
  if (fromMeta != null && fromMeta !== '') return String(fromMeta)
  return undefined
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
  const [doseValueInput, setDoseValueInput] = useState('')
  const [doseUnitInput, setDoseUnitInput] = useState('mg/kg')
  const [dose, setDose] = useState('')
  const [frequency, setFrequency] = useState('')
  const [route, setRoute] = useState('VO')
  const [duration, setDuration] = useState('')
  const [instructions, setInstructions] = useState('')
  const [cautions, setCautions] = useState('')
  const [manualQuantity, setManualQuantity] = useState('')

  // Manual mode only: extra fields
  const [manualName, setManualName] = useState('')
  const [manualConcentration, setManualConcentration] = useState('')
  const [manualConcentrationUnit, setManualConcentrationUnit] = useState('mg')
  const [manualForm, setManualForm] = useState('Comprimido')
  const [manualCommercialName, setManualCommercialName] = useState('')
  const [manualDoseUnit, setManualDoseUnit] = useState('mg/kg')
  const [manualIsControlled, setManualIsControlled] = useState(false)

  // A3: Uso contínuo toggle (substitui duração)
  const [isContinuous, setIsContinuous] = useState(false)
  // A4: Iniciar em (data + hora) — vai para start_date do item
  const [startDate, setStartDate] = useState(() => {
    const d = new Date()
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
  })
  const [startTime, setStartTime] = useState('')

  // Date picker conversion
  const isoStartDate = useMemo(() => {
    if (!startDate) return ''
    const [day, month] = startDate.split('/')
    if (!day || !month) return ''
    const year = new Date().getFullYear()
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }, [startDate])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const iso = e.target.value
    if (!iso) {
      setStartDate('')
      return
    }
    const [year, month, day] = iso.split('-')
    setStartDate(`${day.padStart(2, '0')}/${month.padStart(2, '0')}`)
  }

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
      setDoseValueInput('')
      setDoseUnitInput('mg/kg')
      setFrequency('')
      setRoute('VO')
      setDuration('')
      setInstructions('')
      setCautions('')
      setManualQuantity('')
      setManualName('')
      setManualConcentration('')
      setManualConcentrationUnit('mg')
      setManualForm('Comprimido')
      setManualCommercialName('')
      setManualDoseUnit('mg/kg')
      setManualIsControlled(false)
      setIsContinuous(false)
      const d = new Date()
      setStartDate(`${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`)
      setStartTime('')
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
            setDoseValueInput(String(bestDose.dose_value || ''))
            setDoseUnitInput(bestDose.dose_unit || 'mg/kg')
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
    // A3: duração efetiva: "uso contínuo" se toggle ativo
    const effectiveDuration = isContinuous ? 'uso contínuo' : duration
    // A4: start_date formatado "DD/MM às HH:MM"
    const startDateStr = startDate
      ? `${startDate}${startTime ? ` às ${startTime}` : ' às __:__'}`
      : undefined

    if (manualMode) {
      // Modo manual: nome é obrigatório
      if (!manualName.trim()) return

      const newItem: PrescriptionItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        type: 'medication',
        isManual: true,
        name: manualName.trim(),
        pharmaceutical_form: manualForm || undefined,
        concentration_text: manualConcentration ? `${manualConcentration} ${manualConcentrationUnit}` : undefined,
        commercial_name: manualCommercialName.trim() || undefined,
        dose: doseValueInput ? `${doseValueInput} ${doseUnitInput}` : undefined,
        doseValue: doseValueInput || undefined,
        doseUnit: doseUnitInput || undefined,
        frequency,
        route,
        duration: effectiveDuration,
        instructions,
        cautions: cautions.split('\n').map(s => s.trim()).filter(Boolean),
        is_controlled: manualIsControlled,
        start_date: startDateStr,
        manualQuantity: manualQuantity.trim() || undefined,
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
      value: selectedPresentation?.value != null ? String(selectedPresentation.value) : undefined,
      value_unit: selectedPresentation?.value_unit || undefined,
      per_value: selectedPresentation?.per_value != null ? String(selectedPresentation.per_value) : undefined,
      per_unit: selectedPresentation?.per_unit || undefined,
      avg_price_brl: selectedPresentation?.avg_price_brl ?? undefined,
      package_quantity: selectedPresentation ? extractPresentationField(selectedPresentation, 'package_quantity') : undefined,
      package_unit: selectedPresentation ? extractPresentationField(selectedPresentation, 'package_unit') : undefined,

      // Campos de dosagem
      dose: doseValueInput ? `${doseValueInput} ${doseUnitInput}` : undefined,
      doseValue: doseValueInput || undefined,
      doseUnit: doseUnitInput || undefined,
      frequency,
      route,
      duration: effectiveDuration,
      instructions,
      cautions: cautions.split('\n').map(s => s.trim()).filter(Boolean),
      is_controlled: selectedMedication.is_controlled || false,
      start_date: startDateStr,
      manualQuantity: manualQuantity.trim() || undefined,
    }

    onAdd(newItem)
    onClose()
  }, [
    manualMode,
    manualName,
    manualForm,
    manualConcentration,
    manualConcentrationUnit,
    manualDoseUnit,
    manualCommercialName,
    manualIsControlled,
    selectedMedication,
    presentations,
    selectedPresentationId,
    doseValueInput,
    doseUnitInput,
    dose,
    frequency,
    route,
    duration,
    instructions,
    cautions,
    isContinuous,
    startDate,
    startTime,
    manualQuantity,
    onAdd,
    onClose,
  ])

  if (!open) return null

  const selectedPresentation = presentations.find((p) => p.id === selectedPresentationId)
  const canAdd = manualMode ? !!manualName.trim() : !!selectedMedication

  return createPortal(
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
                              setDoseValueInput(String(rd.dose_value || ''))
                              setDoseUnitInput(rd.dose_unit || 'mg/kg')
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
                <RxvField label="Nome comercial (opcional)">
                  <RxvInput
                    placeholder="Ex: Amoxivet"
                    value={manualCommercialName}
                    onChange={(e) => setManualCommercialName(e.target.value)}
                  />
                </RxvField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RxvField label="Concentração">
                  <div className="flex gap-2">
                    <div className="flex-[2]">
                      <RxvInput
                        placeholder="Valor (ex: 500)"
                        value={manualConcentration}
                        onChange={(e) => setManualConcentration(e.target.value)}
                      />
                    </div>
                    <div className="flex-[1]">
                      <RxvSelect
                        value={manualConcentrationUnit}
                        onChange={(e) => setManualConcentrationUnit(e.target.value)}
                        options={CONC_UNIT_OPTIONS}
                      />
                    </div>
                  </div>
                </RxvField>

                <RxvField label="Forma farmacêutica">
                  <RxvSelect
                    value={manualForm}
                    onChange={(e) => setManualForm(e.target.value)}
                    options={FORM_OPTIONS}
                  />
                </RxvField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RxvField label="Dose">
                  <div className="flex gap-2">
                    <div className="flex-[2]">
                      <RxvInput
                        placeholder="Valor"
                        value={doseValueInput}
                        onChange={(e) => setDoseValueInput(e.target.value)}
                      />
                    </div>
                    <div className="flex-[1]">
                      <RxvSelect
                        value={doseUnitInput}
                        onChange={(e) => setDoseUnitInput(e.target.value)}
                        options={DOSE_UNIT_OPTIONS}
                      />
                    </div>
                  </div>
                </RxvField>

                {!doseValueInput || (doseUnitInput.includes('/kg') && (!patient || !patient.weight_kg)) ? (
                  <RxvField label="Quantidade / Volume por dose *">
                    <RxvInput
                      placeholder="Ex: 1/2 comprimido, 2 mL"
                      value={manualQuantity}
                      onChange={(e) => setManualQuantity(e.target.value)}
                    />
                  </RxvField>
                ) : null}

                <RxvField label="Frequência">
                  <RxvSelect
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    options={FREQ_OPTIONS}
                  />
                </RxvField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RxvField label="Via de administração">
                  <RxvSelect
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    options={ROUTE_OPTIONS}
                  />
                </RxvField>

                {/* A3: Duração com toggle "Uso contínuo" */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Duração</label>
                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isContinuous}
                        onChange={(e) => setIsContinuous(e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-slate-600 bg-black/40 accent-[#39ff14]"
                      />
                      <span className="text-[10px] font-bold text-[#39ff14]">Uso contínuo</span>
                    </label>
                  </div>
                  {isContinuous ? (
                    <div className="rounded-xl border border-[#39ff14]/30 bg-[#39ff14]/5 px-3 py-2.5 text-xs font-bold text-[#39ff14]">
                      Uso contínuo (sem data de término)
                    </div>
                  ) : (
                    <RxvInput
                      placeholder="Ex: 7 dias"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  )}
                </div>
              </div>

              {/* A4: Iniciar em */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RxvField label="Iniciar em (data)">
                  <RxvInput
                    type="date"
                    value={isoStartDate}
                    onChange={handleDateChange}
                  />
                </RxvField>
                <RxvField label="Horário de início">
                  <RxvSelect
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    options={[{ value: '', label: 'Selecione' }, ...TIME_OPTIONS]}
                  />
                </RxvField>
              </div>

              <RxvField label="Instruções de uso adicionais">
                <RxvTextarea
                  placeholder="Ex: Dar com alimento, evitar sol..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={2}
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

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={manualIsControlled}
                  onChange={(e) => setManualIsControlled(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-600 bg-black/40 accent-amber-400"
                />
                <span className="text-sm text-amber-300 font-semibold">
                  Medicamento controlado (gera receita especial)
                </span>
              </label>
            </div>
          )}

          {/* ==================== CAMPOS COMUNS (dose/freq/duração) (SÓ CATÁLOGO) ==================== */}
          {(!manualMode && selectedMedication) && (
            <div className="space-y-4">
              <div className="h-px bg-slate-800/60" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <RxvField label="Dose">
                  <div className="flex gap-2">
                    <div className="flex-[2]">
                      <RxvInput
                        placeholder="Valor"
                        value={doseValueInput}
                        onChange={(e) => setDoseValueInput(e.target.value)}
                      />
                    </div>
                    <div className="flex-[1]">
                      <RxvSelect
                        value={doseUnitInput}
                        onChange={(e) => setDoseUnitInput(e.target.value)}
                        options={DOSE_UNIT_OPTIONS}
                      />
                    </div>
                  </div>
                </RxvField>

                {!doseValueInput || (doseUnitInput.includes('/kg') && (!patient || !patient.weight_kg)) || (selectedPresentation && !selectedPresentation.concentration_text) ? (
                  <RxvField label="Quantidade / Volume por dose *">
                    <RxvInput
                      placeholder="Ex: 1/2 comprimido, 2 mL"
                      value={manualQuantity}
                      onChange={(e) => setManualQuantity(e.target.value)}
                    />
                  </RxvField>
                ) : null}

                <RxvField label="Via de administração">
                  <RxvSelect
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    options={ROUTE_OPTIONS}
                  />
                </RxvField>

                <RxvField label="Frequência">
                  <RxvSelect
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    options={FREQ_OPTIONS}
                  />
                </RxvField>
              </div>

              {/* A3: Duração com toggle "Uso contínuo" */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Duração</label>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isContinuous}
                      onChange={(e) => setIsContinuous(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-slate-600 bg-black/40 accent-[#39ff14]"
                    />
                    <span className="text-[10px] font-bold text-[#39ff14]">Uso contínuo</span>
                  </label>
                </div>
                {isContinuous ? (
                  <div className="rounded-xl border border-[#39ff14]/30 bg-[#39ff14]/5 px-3 py-2.5 text-xs font-bold text-[#39ff14]">
                    Uso contínuo (sem data de término)
                  </div>
                ) : (
                  <RxvInput
                    placeholder="Ex: 7 dias"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                )}
              </div>

              {/* A4: Iniciar em */}
              <div className="grid grid-cols-2 gap-4">
                <RxvField label="Iniciar em (data)">
                  <RxvInput
                    type="date"
                    value={isoStartDate}
                    onChange={handleDateChange}
                  />
                </RxvField>
                <RxvField label="Horário de início">
                  <RxvSelect
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    options={[{ value: '', label: 'Selecione' }, ...TIME_OPTIONS]}
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
    </div>,
    document.body
  )
}
