// ✅ P0.1: Modal "Adicionar Medicamento" — 100% Catálogo 3.0
// 🚫 ZERO dependências do Catálogo 1/2.0/legado

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  RxvField,
  RxvInput,
  RxvSelect,
  RxvTextarea,
  RxvToggle,
  RxvButton,
} from '../../../src/components/receituario/RxvComponents'
import {
  searchMedications,
  getMedicationPresentations,
  getMedicationRecommendedDoses,
  type RecommendedDose,
} from '../../../src/lib/clinicRecords'
import type { PrescriptionItem, PrescriptionState, RouteGroup, PharmacyType } from '../rxTypes'
import { calculateMedicationQuantity, resolveFrequency } from '../rxRenderer'

// ==================== TYPES ====================

export interface MedicationModalV3Props {
  /** Estado do modal (open/closed) */
  open: boolean
  /** Item em edição (draft) */
  draft: PrescriptionItem | null
  /** Estado completo da prescrição (para acessar dados do paciente) */
  patientState: PrescriptionState
  /** ID da clínica ativa */
  clinicId: string
  /** Modo: criar novo item ou editar existente */
  mode: 'create' | 'edit'
  /** Callback ao fechar modal (true = descartar, false = manter draft) */
  onClose: (discard: boolean) => void
  /** Callback ao salvar item */
  onSave: () => void
  /** Callback para atualizar o draft */
  onDraftChange: (updater: (prev: PrescriptionItem) => PrescriptionItem) => void
}

interface MedicationSearchResult {
  id: string
  name: string
  is_controlled: boolean
  is_private?: boolean
  pharmacy_origin?: string
  default_route?: string
  metadata?: {
    active_ingredient?: string
    therapeutic_class?: string
    tags?: string[]
  }
}

interface PresentationRecord {
  id: string
  medication_id: string
  pharmaceutical_form: string | null
  concentration_text: string | null
  commercial_name: string | null
  presentation_unit: string | null
  is_default?: boolean
  avg_price_brl?: number
  pharmacy_veterinary?: boolean
  pharmacy_human?: boolean
  pharmacy_compounding?: boolean
  metadata?: {
    manufacturer?: string
    obs?: string
  }
}

// ==================== COMPONENT ====================

export function MedicationModalV3({
  open,
  draft,
  patientState,
  clinicId,
  mode,
  onClose,
  onSave,
  onDraftChange,
}: MedicationModalV3Props) {
  // ==================== REFS ====================
  const onCloseRef = useRef(onClose)

  // ==================== STATE ====================
  const [searchQuery, setSearchQuery] = useState('')
  const [medications, setMedications] = useState<MedicationSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedMedicationId, setSelectedMedicationId] = useState<string | null>(null)
  const [presentations, setPresentations] = useState<PresentationRecord[]>([])
  const [selectedPresentationId, setSelectedPresentationId] = useState<string | null>(null)
  const [recommendedDoses, setRecommendedDoses] = useState<RecommendedDose[]>([])
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)

  // ==================== EFFECTS ====================

  // Atualiza ref de onClose
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  // ESC para fechar modal
  useEffect(() => {
    if (!open) return
    const onEscape = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') onCloseRef.current(true)
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [open])

  // ✅ P0.1: Ao abrir modal, listar automaticamente medicamentos da clínica (sem busca)
  useEffect(() => {
    if (!open || !clinicId) {
      setMedications([])
      setSearchQuery('')
      return
    }

    const q = searchQuery.trim()

    // Debounce: sem delay se query vazia (lista inicial)
    const timer = setTimeout(async () => {
      try {
        setIsSearching(true)
        // Se vazio: carrega primeiros 20; senão: busca até 50
        const results = await searchMedications(clinicId, q || '', q ? 50 : 20)
        setMedications(results)
      } catch (err) {
        console.error('[MedicationModalV3] Search failed', err)
        setMedications([])
      } finally {
        setIsSearching(false)
      }
    }, q ? 400 : 0)

    return () => clearTimeout(timer)
  }, [searchQuery, clinicId, open])

  // Reset ao fechar
  useEffect(() => {
    if (!open) {
      setSelectedMedicationId(null)
      setPresentations([])
      setSelectedPresentationId(null)
      setRecommendedDoses([])
    }
  }, [open])

  // ==================== HANDLERS ====================

  /**
   * ✅ P0.1: Ao selecionar medicamento:
   * 1. Carregar apresentações do banco de dados
   * 2. Selecionar automaticamente apresentação padrão (is_default ou primeira)
   * 3. Carregar doses recomendadas
   * 4. Aplicar dose smart (match por espécie)
   */
  const handleMedicationSelect = useCallback(
    async (med: MedicationSearchResult) => {
      if (!clinicId) return

      setSelectedMedicationId(med.id)
      setIsLoadingDetails(true)

      try {
        // 1. Carregar apresentações
        const presentationsData = await getMedicationPresentations(clinicId, med.id)
        setPresentations(presentationsData)

        // 2. Selecionar primeira apresentação disponível
        const defaultPresentation = presentationsData[0]
        setSelectedPresentationId(defaultPresentation?.id || null)

        // 3. Carregar doses recomendadas
        const dosesData = await getMedicationRecommendedDoses(clinicId, med.id)
        setRecommendedDoses(dosesData)

        // 4. ✅ Dose sugerida smart (match por espécie do paciente)
        const patientSpecies = patientState.patient.species === 'Felina' ? 'gato' : 'cão'

        // Match exato por espécie
        let bestDose = dosesData.find((d) => d.species === patientSpecies)

        // Fallback: espécie "ambos"
        if (!bestDose) {
          bestDose = dosesData.find((d) => d.species === 'ambos')
        }

        // Se não tiver dose alguma: deixar vazio (hint na UI)

        // 5. Parse de frequência (se existir dose recomendada)
        let freqToken: any = ''
        let timesPerDay = draft?.timesPerDay || ''
        let everyHours = draft?.everyHours || ''
        let fMode = draft?.frequencyType || 'timesPerDay'

        if (bestDose?.frequency) {
          const f = bestDose.frequency.toUpperCase()
          if (f.includes('SID') || f.includes('1 VEZ')) {
            freqToken = 'SID'
            timesPerDay = '1'
            fMode = 'timesPerDay'
          } else if (f.includes('BID') || f.includes('2 VEZES')) {
            freqToken = 'BID'
            timesPerDay = '2'
            fMode = 'timesPerDay'
          } else if (f.includes('TID') || f.includes('3 VEZES')) {
            freqToken = 'TID'
            timesPerDay = '3'
            fMode = 'timesPerDay'
          } else if (f.includes('QID') || f.includes('4 VEZES')) {
            freqToken = 'QID'
            timesPerDay = '4'
            fMode = 'timesPerDay'
          } else if (f.includes('12/12') || f.includes('12 HORAS')) {
            everyHours = '12'
            fMode = 'everyHours'
          } else if (f.includes('8/8') || f.includes('8 HORAS')) {
            everyHours = '8'
            fMode = 'everyHours'
          } else if (f.includes('24/24') || f.includes('24 HORAS')) {
            everyHours = '24'
            fMode = 'everyHours'
          }
        }

        // 6. ✅ Inserir no draft da receita
        onDraftChange((prev) => ({
          ...prev,
          catalogDrugId: med.id,
          name: med.name,
          controlled: !!med.is_controlled,
          pharmacyType: (med.pharmacy_origin || 'veterinária') as PharmacyType,
          routeGroup: (bestDose?.route || med.default_route || 'ORAL') as RouteGroup,
          // Dose sugerida (se existir)
          doseValue: bestDose ? String(bestDose.dose_value) : prev.doseValue,
          doseUnit: bestDose ? bestDose.dose_unit : prev.doseUnit,
          // Frequência parseada
          frequencyToken: freqToken,
          timesPerDay,
          everyHours,
          frequencyType: fMode,
          autoInstruction: true,
          manualEdited: false,
          // Apresentação padrão
          presentation: defaultPresentation?.pharmaceutical_form || prev.presentation,
          concentration: defaultPresentation?.concentration_text || prev.concentration,
          commercialName: defaultPresentation?.commercial_name || prev.commercialName || '',
        }))

        // Limpar busca
        setSearchQuery('')
      } catch (err) {
        console.error('[MedicationModalV3] Error loading medication details', err)
      } finally {
        setIsLoadingDetails(false)
      }
    },
    [clinicId, draft, onDraftChange, patientState.patient.species]
  )

  /**
   * Aplicar apresentação selecionada no dropdown
   */
  const handlePresentationChange = useCallback(
    (presentationId: string) => {
      setSelectedPresentationId(presentationId)
      const presentation = presentations.find((p) => p.id === presentationId)
      if (!presentation) return

      onDraftChange((prev) => ({
        ...prev,
        presentation: presentation.pharmaceutical_form || prev.presentation,
        concentration: presentation.concentration_text || prev.concentration,
        commercialName: presentation.commercial_name || prev.commercialName || '',
        manualEdited: false,
      }))
    },
    [presentations, onDraftChange]
  )

  /**
   * Aplicar dose recomendada clicada
   */
  const handleDoseClick = useCallback(
    (dose: RecommendedDose) => {
      onDraftChange((prev) => ({
        ...prev,
        doseValue: String(dose.dose_value),
        doseUnit: dose.dose_unit,
        routeGroup: (dose.route || prev.routeGroup) as RouteGroup,
      }))
    },
    [onDraftChange]
  )

  // ==================== RENDER GUARDS ====================

  if (!open || !draft) return null

  // ==================== COMPUTED VALUES ====================

  const selectedPresentation = presentations.find((p) => p.id === selectedPresentationId)
  const quantity = calculateMedicationQuantity(draft, patientState)
  const frequency = resolveFrequency(draft)

  // ==================== RENDER ====================

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-[#2f5b25] bg-[#13220f] text-slate-100 shadow-[0_0_40px_rgba(56,255,20,0.18)]">
        {/* ==================== HEADER ==================== */}
        <div className="flex items-center justify-between border-b border-[#274b20] bg-[#11200e] px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-left">
              {mode === 'create' ? 'Adicionar Medicamento' : 'Editar Medicamento'}
            </h2>
            <p className="text-xs text-slate-400 text-left">
              Busque e selecione medicamentos do seu catálogo. A receita atualiza em tempo real.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg border border-[#3f6f31] px-3 py-1.5 text-sm hover:bg-[#1e3818]"
              onClick={() => onClose(true)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="rounded-lg bg-[#38ff14] px-3 py-1.5 text-sm font-bold text-[#0c1908] hover:bg-[#2cd20f]"
              onClick={onSave}
            >
              Salvar
            </button>
          </div>
        </div>

        {/* ==================== BODY: 2 COLUNAS ==================== */}
        <div className="grid max-h-[calc(92vh-72px)] grid-cols-1 overflow-y-auto lg:grid-cols-3">
          {/* ==================== COLUNA ESQUERDA: FORMULÁRIO ==================== */}
          <div className="space-y-4 border-r border-[#274b20] p-5 lg:col-span-2">
            {/* ==================== BUSCA DE MEDICAMENTOS ==================== */}
            <section className="space-y-3 rounded-xl border border-[#2e5525] bg-[#152913] p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#39ff14] text-left">
                  Catálogo de Medicamentos
                </h3>
                {isSearching && (
                  <span className="material-symbols-outlined animate-spin text-[#39ff14] text-sm">
                    sync
                  </span>
                )}
              </div>

              <input
                className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1 text-left"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Digite para buscar ou veja a lista abaixo..."
              />

              {/* Lista de resultados */}
              {!isSearching && medications.length === 0 && !searchQuery && (
                <p className="text-xs text-slate-400 italic text-left">
                  Carregando medicamentos da clínica...
                </p>
              )}
              {!isSearching && medications.length === 0 && searchQuery && (
                <p className="text-xs text-slate-400 text-left">Nenhum medicamento encontrado.</p>
              )}
              {medications.length > 0 && (
                <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                  {medications.map((med) => (
                    <button
                      type="button"
                      key={med.id}
                      className={`flex w-full items-start justify-between rounded-lg border px-3 py-2 text-left transition-all ${selectedMedicationId === med.id
                        ? 'border-[#39ff14] bg-[#1a3316]'
                        : 'border-[#335c29] bg-[#0c1a0c] hover:border-[#39ff14]'
                        }`}
                      onClick={() => handleMedicationSelect(med)}
                    >
                      <div>
                        <p className="text-sm font-bold text-white uppercase tracking-tight italic text-left">
                          {med.name}
                        </p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold text-left">
                          {med.pharmacy_origin || 'Veterinária'}
                        </p>
                      </div>
                      {med.is_controlled && (
                        <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                          CONTROLADO
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* ==================== APRESENTAÇÕES ==================== */}
            {presentations.length > 0 && (
              <section className="rounded-xl border border-[#2e5525] bg-[#12250f] p-4 space-y-3">
                <h3 className="text-sm font-bold text-slate-200 text-left">
                  Apresentação / Concentração
                </h3>

                {presentations.length > 0 ? (
                  <select
                    className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1 text-left"
                    value={selectedPresentationId || ''}
                    onChange={(e) => handlePresentationChange(e.target.value)}
                  >
                    {(presentations ?? []).map((pres) => (
                      <option key={pres.id} value={pres.id}>
                        {pres.commercial_name || pres.pharmaceutical_form || 'Sem nome'} -{' '}
                        {pres.concentration_text || 'Sem concentração'}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="rounded-lg border border-dashed border-[#335c29] p-3 text-center">
                    <p className="text-xs text-slate-500 italic">Nenhuma apresentação detalhada cadastrada.</p>
                  </div>
                )}

                {selectedPresentation?.avg_price_brl && (
                  <p className="text-xs text-[#97ce8d] text-left">
                    Preço médio de referência: R$ {selectedPresentation.avg_price_brl.toFixed(2)}
                  </p>
                )}
              </section>
            )}

            {/* ==================== DOSES RECOMENDADAS ==================== */}
            {recommendedDoses.length > 0 && (
              <section className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 text-left">
                  Doses indicadas no catálogo
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {recommendedDoses.map((dose, idx) => (
                    <button
                      key={dose.id || idx}
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg bg-[#0c1a0c] px-3 py-2 text-left border border-transparent hover:border-amber-500/50 transition-all"
                      onClick={() => handleDoseClick(dose)}
                    >
                      <div className="text-left">
                        <p className="text-xs font-bold text-amber-200">
                          {dose.species} • {dose.route || 'VO'}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {dose.dose_value} {dose.dose_unit}
                          {dose.frequency && ` • ${dose.frequency}`}
                        </p>
                      </div>
                      <span className="text-[10px] text-amber-500 font-bold">APLICAR</span>
                    </button>
                  ))}
                </div>
                {recommendedDoses.length === 0 && (
                  <p className="text-xs text-slate-500 italic text-left">
                    Sem dose recomendada cadastrada para este medicamento.
                  </p>
                )}
              </section>
            )}

            {/* ==================== CAMPOS DO ITEM ==================== */}
            <section className="space-y-3 rounded-xl border border-[#2e5525] bg-[#152913] p-4">
              <h3 className="text-sm font-bold text-[#39ff14] text-left">Detalhes do Item</h3>

              <RxvField label="Nome do Medicamento">
                <RxvInput
                  value={draft.name || ''}
                  onChange={(e) =>
                    onDraftChange((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Nome do medicamento"
                />
              </RxvField>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <RxvField label="Apresentação">
                  <RxvInput
                    value={draft.presentation || ''}
                    onChange={(e) =>
                      onDraftChange((prev) => ({ ...prev, presentation: e.target.value }))
                    }
                    placeholder="Ex: Comprimido"
                  />
                </RxvField>

                <RxvField label="Concentração">
                  <RxvInput
                    value={draft.concentration || ''}
                    onChange={(e) =>
                      onDraftChange((prev) => ({ ...prev, concentration: e.target.value }))
                    }
                    placeholder="Ex: 10 mg/comprimido"
                  />
                </RxvField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <RxvField label="Dose">
                  <div className="flex gap-2">
                    <RxvInput
                      type="number"
                      step="0.01"
                      value={draft.doseValue || ''}
                      onChange={(e) =>
                        onDraftChange((prev) => ({ ...prev, doseValue: e.target.value }))
                      }
                      placeholder="Ex: 10"
                      className="flex-1"
                    />
                    <RxvInput
                      value={draft.doseUnit || ''}
                      onChange={(e) =>
                        onDraftChange((prev) => ({ ...prev, doseUnit: e.target.value }))
                      }
                      placeholder="Ex: mg/kg"
                      className="flex-1"
                    />
                  </div>
                </RxvField>

                <RxvField label="Via">
                  <RxvSelect
                    value={draft.routeGroup || 'ORAL'}
                    onChange={(e) =>
                      onDraftChange((prev) => ({
                        ...prev,
                        routeGroup: e.target.value as RouteGroup,
                      }))
                    }
                  >
                    <option value="ORAL">Oral</option>
                    <option value="SC">Subcutâneo (SC)</option>
                    <option value="IM">Intramuscular (IM)</option>
                    <option value="IV">Intravenoso (IV)</option>
                    <option value="TOPICO">Tópico</option>
                    <option value="OFTALMICO">Oftálmico</option>
                    <option value="OTOLOGICO">Otológico</option>
                    <option value="INTRANASAL">Intranasal</option>
                    <option value="RETAL">Retal</option>
                  </RxvSelect>
                </RxvField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <RxvField label="Frequência">
                  <RxvInput
                    value={draft.timesPerDay || ''}
                    onChange={(e) =>
                      onDraftChange((prev) => ({ ...prev, timesPerDay: e.target.value }))
                    }
                    placeholder="Ex: 2 (vezes/dia)"
                  />
                </RxvField>

                <RxvField label="Duração (dias)">
                  <RxvInput
                    type="number"
                    value={draft.durationDays || ''}
                    onChange={(e) =>
                      onDraftChange((prev) => ({ ...prev, durationDays: e.target.value }))
                    }
                    placeholder="Ex: 7"
                  />
                </RxvField>

                <RxvField label="Quantidade">
                  <RxvInput
                    value={typeof quantity === 'string' ? quantity : quantity.label}
                    disabled
                    className="bg-[#0c1608] text-[#97ce8d]"
                  />
                </RxvField>
              </div>

              <RxvField label="Instruções">
                <RxvTextarea
                  value={draft.instruction || ''}
                  onChange={(e) =>
                    onDraftChange((prev) => ({ ...prev, instruction: e.target.value }))
                  }
                  placeholder="Instruções de uso..."
                  rows={3}
                />
              </RxvField>
            </section>
          </div>

          {/* ==================== COLUNA DIREITA: PREVIEW ==================== */}
          <div className="space-y-4 bg-[#0f1c0d] p-5">
            <h3 className="text-sm font-bold text-[#39ff14] text-left">Preview do Item</h3>

            <div className="rounded-xl border border-[#2e5525] bg-[#12230f] p-4 space-y-2 text-left">
              <p className="text-xs font-bold text-white uppercase">{draft.name || '(Sem nome)'}</p>
              <p className="text-[10px] text-slate-400">
                {draft.presentation || '(Sem apresentação)'} •{' '}
                {draft.concentration || '(Sem concentração)'}
              </p>
              {draft.commercialName && (
                <p className="text-[10px] text-slate-500">Marca: {draft.commercialName}</p>
              )}
              <hr className="border-[#274b20]" />
              <p className="text-[10px] text-slate-300">
                Dose: {draft.doseValue || '?'} {draft.doseUnit || '?'}
              </p>
              <p className="text-[10px] text-slate-300">Via: {draft.routeGroup || '?'}</p>
              <p className="text-[10px] text-slate-300">Frequência: {typeof frequency === 'string' ? frequency : frequency.label}</p>
              <p className="text-[10px] text-slate-300">
                Duração: {draft.durationDays || '?'} dias
              </p>
              <p className="text-[10px] text-slate-300">Quantidade: {typeof quantity === 'string' ? quantity : quantity.label}</p>
              {draft.instruction && (
                <>
                  <hr className="border-[#274b20]" />
                  <p className="text-[10px] text-slate-400">{draft.instruction}</p>
                </>
              )}
            </div>

            {draft.controlled && (
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3">
                <p className="text-[10px] font-bold text-amber-400 uppercase text-left">
                  ⚠️ Medicamento Controlado
                </p>
                <p className="text-[9px] text-amber-300/70 mt-1 text-left">
                  Requer receituário especial (notificação de receita).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
