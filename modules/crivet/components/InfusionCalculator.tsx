import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { ClipboardList, AlertTriangle } from 'lucide-react'
import { DoseUnit } from '../engine/conversions'
import { calculateDirectInfusion, calculatePreparation } from '../engine/calculateCRI'
import { getClinicalAlerts, doseRanges } from '../engine/alerts'
import { suggestPumpRate } from '../utils/pumpRate'
import { suggestRates, preferredRateHint } from '../data/tooltips.pumpRate'
import { formatNumberPtBR } from '../../../utils/format'
import { CompatibilityPanel } from './CompatibilityPanel'
import { FieldLabel } from './FieldLabel'
import { ClinicalAlertBanner } from './ClinicalAlertBanner'
import { DrugProfileWarning } from './DrugProfileWarning'
import { HelpModal } from './HelpModal'
import { HelpContentRenderer } from './HelpContent'
import { getDrugProfileValidation } from '../utils/drugProfileRegistry'
import { InsulinDKAProtocolCard } from './cards/InsulinDKAProtocolCard'
import { INSULIN_CONCENTRATIONS, InsulinConcentrationOption } from '../data/drugs/insulin_concentrations'
import { convertDose } from '../engine/conversions'
import { evaluateDrugAlerts } from '../engine/drugAlerts'
import { convertToPatientFlags } from '../utils/patientFlags'
import type { Drug } from '../data/drugs'
import type { Species, PhysiologyState, Comorbidity } from '../types/patient'
import type { FluidType } from '../types/patient'
import type { DiluentId, IndicatedDose } from '../types/drug'

const SYRINGE_VOLUMES = [10, 20, 60] as const
const BAG_VOLUMES = [100, 250, 500, 1000] as const

type InfusionCalculatorProps = {
  patientWeight: string
  selectedDrug: Drug | null
  species: Species
  physiology: PhysiologyState
  comorbidities: Comorbidity[]
}

type AppError = { type?: string; level?: string; title?: string; message: string } | string | null | undefined

function renderError(err: AppError): string {
  if (!err) return ''
  if (typeof err === 'string') return err
  if (typeof err === 'object' && 'message' in err) return err.message
  return 'Erro inesperado.'
}

function renderErrorTitle(err: AppError): string {
  if (!err) return '⛔ Atenção'
  if (typeof err === 'string') return '⛔ Atenção'
  if (typeof err === 'object' && 'title' in err && err.title) return err.title
  if (typeof err === 'object' && 'message' in err) return '⛔ Atenção'
  return '⛔ Atenção'
}

export default function InfusionCalculator({
  patientWeight,
  selectedDrug,
  species,
  physiology,
  comorbidities,
}: InfusionCalculatorProps) {
  const weightKg = Number(patientWeight) || 0

  const [dose, setDose] = useState('')
  const [doseUnit, setDoseUnit] = useState<DoseUnit>('mcg/kg/min')
  const [physiologyModalOpen, setPhysiologyModalOpen] = useState(false)
  const [concentration, setConcentration] = useState('')
  const [isCustomConcentration, setIsCustomConcentration] = useState(false)
  const [dilutionType, setDilutionType] = useState<'syringe' | 'bag'>('syringe')
  const [dilutionVolume, setDilutionVolume] = useState('20')
  const [fluidType, setFluidType] = useState<FluidType>('NaCl 0.9%')
  const [mode, setMode] = useState<'direct' | 'preparation'>('direct')
  const [pumpRate, setPumpRate] = useState<number | null>(null)
  const [userOverrodeRate, setUserOverrodeRate] = useState(false)
  const [showCalculation, setShowCalculation] = useState(false)

  useEffect(() => {
    if (selectedDrug) {
      if (selectedDrug.concentrations.length > 0) {
        setConcentration(selectedDrug.concentrations[0].toString())
        setIsCustomConcentration(false)
      } else {
        setConcentration('')
        setIsCustomConcentration(true)
      }
      setDose('')
      setUserOverrodeRate(false) // Reset quando trocar fármaco
      setPumpRate(null)

      // Forçar unidade recomendada ao selecionar fármaco
      if (selectedDrug.recommendedUnit) {
        setDoseUnit(selectedDrug.recommendedUnit as DoseUnit)
      } else if (selectedDrug.unitRules?.preferredDoseUnit) {
        // Fallback para sistema antigo (compatibilidade)
        setDoseUnit(selectedDrug.unitRules.preferredDoseUnit as DoseUnit)
      }
    }
  }, [selectedDrug]) // Removido 'mode' das dependências para não zerar dose ao trocar modo

  // Taxa automática quando mudar veículo ou peso (se usuário não tiver sobrescrito)
  useEffect(() => {
    if (userOverrodeRate) return
    if (!weightKg || weightKg <= 0) return
    if (mode !== 'preparation') return

    const suggested = suggestPumpRate({ vehicle: dilutionType, weightKg })
    setPumpRate(suggested)
  }, [mode, dilutionType, weightKg, userOverrodeRate])

  // Ajustar volume quando trocar tipo de veículo
  const volumes = dilutionType === 'bag' ? BAG_VOLUMES : SYRINGE_VOLUMES
  useEffect(() => {
    const currentVolume = parseFloat(dilutionVolume) || 0
    const volumesArray = Array.from(volumes)
    if (!volumesArray.includes(currentVolume as any)) {
      setDilutionVolume(dilutionType === 'bag' ? '250' : '20')
    }
  }, [dilutionType])

  const weight = weightKg // Mantido para compatibilidade com código existente
  const doseValue = useMemo(() => parseFloat(dose) || 0, [dose])
  const concentrationValue = useMemo(() => parseFloat(concentration) || 0, [concentration])
  const pumpRateValue = pumpRate ?? 0
  const vehicleVolume = useMemo(() => parseFloat(dilutionVolume) || 0, [dilutionVolume])

  const isValidDirect = useMemo(
    () => weight > 0 && doseValue > 0 && concentrationValue > 0 && selectedDrug?.hasCRI,
    [weight, doseValue, concentrationValue, selectedDrug],
  )

  const isValidPreparation = useMemo(
    () =>
      weight > 0 &&
      doseValue > 0 &&
      concentrationValue > 0 &&
      pumpRateValue > 0 &&
      vehicleVolume > 0 &&
      selectedDrug?.hasCRI,
    [weight, doseValue, concentrationValue, pumpRateValue, vehicleVolume, selectedDrug],
  )

  const clinicalAlerts = useMemo(
    () => (selectedDrug ? getClinicalAlerts(selectedDrug.id, species, physiology, comorbidities) : []),
    [selectedDrug, species, physiology, comorbidities],
  )

  // Alertas baseados em condições do paciente × fármaco selecionado
  const patientFlags = useMemo(
    () => convertToPatientFlags(physiology, comorbidities),
    [physiology, comorbidities],
  )

  const drugPatientAlerts = useMemo(() => {
    if (!selectedDrug) return []
    return evaluateDrugAlerts({ drugId: selectedDrug.id, flags: patientFlags })
  }, [selectedDrug, patientFlags])

  const directResult = useMemo(() => {
    if (!isValidDirect) return null
    return calculateDirectInfusion(doseValue, doseUnit, weight, concentrationValue)
  }, [isValidDirect, doseValue, doseUnit, weight, concentrationValue])

  const preparationResult = useMemo(() => {
    if (!isValidPreparation) return null
    return calculatePreparation(doseValue, doseUnit, weight, pumpRateValue, vehicleVolume, concentrationValue)
  }, [isValidPreparation, doseValue, doseUnit, weight, pumpRateValue, vehicleVolume, concentrationValue])

  const handleDoseChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDose(event.target.value)
  }, [])

  const handleDoseUnit = useCallback((unit: DoseUnit) => setDoseUnit(unit), [])

  const handleConcentrationChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setConcentration(event.target.value)
    setIsCustomConcentration(true)
  }, [])

  const handleConcentrationSelect = useCallback((value: string) => {
    if (value === 'custom') {
      setIsCustomConcentration(true)
      setConcentration('')
    } else {
      setConcentration(value)
      setIsCustomConcentration(false)
    }
  }, [])

  const handlePumpRateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value) || 0
      setPumpRate(value)
      setUserOverrodeRate(true)
    },
    [],
  )

  const handlePumpRatePreset = useCallback(
    (rate: number) => {
      setPumpRate(rate)
      setUserOverrodeRate(true)
    },
    [],
  )

  const suggestedRates = useMemo(() => suggestRates(dilutionType), [dilutionType])
  const pumpRateHint = useMemo(
    () => (pumpRateValue > 0 ? preferredRateHint(pumpRateValue, dilutionType) : null),
    [pumpRateValue, dilutionType],
  )

  const ALL_UNITS: DoseUnit[] = ['mcg/kg/min', 'mcg/kg/h', 'mg/kg/min', 'mg/kg/h', 'U/kg/h', 'U/kg/min']

  // Calcular dose indicada baseada no fármaco, modo, espécie e unidade selecionada
  const indicatedDose = useMemo(() => {
    if (!selectedDrug?.indicatedDoses || selectedDrug.indicatedDoses.length === 0) return null

    // Por enquanto, ambos os modos (direct/preparation) são CRI
    // Se no futuro houver modo BOLUS, adicionar lógica aqui
    const currentMode: 'CRI' | 'BOLUS' = 'CRI'
    const currentSpecies = species === 'dog' ? 'cao' : species === 'cat' ? 'gato' : 'ambos'

    // Filtrar por modo e espécie
    const matching = selectedDrug.indicatedDoses.filter((dose) => {
      const modeMatch = dose.mode === currentMode
      const speciesMatch = dose.species === 'ambos' || dose.species === currentSpecies
      return modeMatch && speciesMatch
    })

    if (matching.length === 0) return null

    // Pegar a primeira correspondência (pode melhorar com lógica de prioridade depois)
    const dose = matching[0]

    // Para bolus, não converter unidades (já está em dose única)
    // Para CRI, converter para a unidade selecionada
    let convertedMin = dose.range.min
    let convertedMax = dose.range.max

    if (dose.mode === 'CRI') {
      convertedMin = convertDose(dose.range.min, dose.unit as DoseUnit, doseUnit)
      convertedMax = convertDose(dose.range.max, dose.unit as DoseUnit, doseUnit)
    } else {
      // Para BOLUS, manter o valor original (não é por hora/minuto)
      convertedMin = dose.range.min
      convertedMax = dose.range.max
    }

    return {
      min: convertedMin,
      max: convertedMax,
      purpose: dose.purpose,
      note: dose.note,
    }
  }, [selectedDrug, mode, species, doseUnit])

  const indicatedText = indicatedDose
    ? `${formatNumberPtBR(indicatedDose.min, 2)}–${formatNumberPtBR(indicatedDose.max, 2)} para ${indicatedDose.purpose}`
    : null

  // Alerta de sobredose/subdose baseado no indicatedDose
  const doseRangeAlert = useMemo(() => {
    // Usar indicatedDose dinâmico ao invés de doseRanges fixo
    // Verificar se temos os dados necessários
    if (!selectedDrug || !indicatedDose) return null
    // Não precisa de isValidDirect aqui, apenas verificar se doseValue é válido
    if (!doseValue || doseValue <= 0) return null

    const { min, max } = indicatedDose

    if (doseValue < min) {
      return {
        severity: 'warning' as const,
        message: `SUBDOSE: abaixo de ${formatNumberPtBR(min, 2)} ${doseUnit} → dose pode ser insuficiente. Reavaliar dose e titulação.`,
      }
    }
    if (doseValue > max) {
      return {
        severity: 'critical' as const,
        message: `SOBREDOSE: acima de ${formatNumberPtBR(max, 2)} ${doseUnit} → risco de efeitos adversos graves. Reavaliar dose imediatamente.`,
      }
    }
    return null
  }, [selectedDrug, doseUnit, doseValue, indicatedDose])

  // Mapear FluidType para DiluentId
  const getDiluentId = (fluidType: FluidType): DiluentId => {
    if (fluidType === 'NaCl 0.9%') return 'NaCl_09'
    if (fluidType === 'Ringer Lactato') return 'RL'
    if (fluidType === 'SG 5%') return 'D5W'
    return 'NaCl_09' // default
  }

  return (
    <div className="space-y-6 overflow-visible">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-700 text-xs font-black">
            3
          </span>
          Cálculo de infusão
        </h2>
        {(isValidDirect || isValidPreparation) && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
            Pronto
          </span>
        )}
      </div>

      {/* Aviso de perfil incompleto */}
      {selectedDrug && (() => {
        const validation = getDrugProfileValidation(selectedDrug.id)
        if (validation.completeness < 100) {
          return (
            <DrugProfileWarning
              validation={validation}
              drugName={selectedDrug.name}
              showDetails={true}
            />
          )
        }
        return null
      })()}

      {clinicalAlerts.length > 0 && (
        <div className="space-y-2">
          {clinicalAlerts.map((alert, index) => (
            <div
              key={index}
              className={`rounded-lg border p-4 ${alert.severity === 'critical'
                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
                }`}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className={`w-5 h-5 flex-shrink-0 ${alert.severity === 'critical'
                    ? 'text-red-500'
                    : 'text-amber-500'
                    }`}
                />
                <div className="flex-1">
                  <p
                    className={`text-sm font-semibold ${alert.severity === 'critical'
                      ? 'text-red-800 dark:text-red-200'
                      : 'text-amber-800 dark:text-amber-200'
                      }`}
                  >
                    {alert.title}
                  </p>
                  <p
                    className={`text-sm mt-1 ${alert.severity === 'critical'
                      ? 'text-red-700 dark:text-red-200'
                      : 'text-amber-700 dark:text-amber-200'
                      }`}
                  >
                    {alert.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {doseRangeAlert && (
        <div
          className={`rounded-lg border p-4 ${doseRangeAlert.severity === 'critical'
            ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
            }`}
        >
          <div className="flex gap-3">
            <AlertTriangle
              className={`w-5 h-5 flex-shrink-0 ${doseRangeAlert.severity === 'critical' ? 'text-red-500' : 'text-amber-500'
                }`}
            />
            <p
              className={`text-sm font-semibold ${doseRangeAlert.severity === 'critical'
                ? 'text-red-900 dark:text-red-100'
                : 'text-amber-900 dark:text-amber-100'
                }`}
            >
              {doseRangeAlert.message}
            </p>
          </div>
        </div>
      )}

      {drugPatientAlerts.length > 0 && (
        <div className="space-y-2">
          {drugPatientAlerts.map((alert) => (
            <ClinicalAlertBanner
              key={alert.id}
              level={alert.level}
              title={alert.title}
              message={alert.short}
              helpTitle={alert.title}
              helpContent={{
                title: alert.title,
                sections: [
                  {
                    level: (alert.level === 'critical' ? 'CRITICAL' : alert.level === 'warning' ? 'IMPORTANT' : 'INFO') as 'CRITICAL' | 'IMPORTANT' | 'INFO',
                    items: alert.why.map((reason) => ({ text: reason })),
                  },
                  ...(alert.actions.length
                    ? [
                      {
                        level: 'INFO' as const,
                        items: alert.actions.map((action) => ({ text: action, highlight: 'green' })),
                      },
                    ]
                    : []),
                ],
              }}
            />
          ))}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          {/* Dose indicada em destaque amarelo com botao "?" - ACIMA do campo Dose alvo */}
          {indicatedDose && (
            <>
              <div className="rounded-lg border-2 border-yellow-400/50 bg-yellow-500/15 dark:bg-yellow-500/10 p-3 flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400 dark:text-yellow-300 font-semibold text-sm">
                      Dose indicada:
                    </span>
                    <span className="text-yellow-900 dark:text-yellow-100 font-bold text-sm">
                      {formatNumberPtBR(indicatedDose.min, 2)}-{formatNumberPtBR(indicatedDose.max, 2)} {doseUnit}
                    </span>
                  </div>
                  <p className="text-yellow-800 dark:text-yellow-200 text-xs font-medium">
                    Para: {indicatedDose.purpose}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Explicar fisiologia da dose indicada"
                  onClick={() => setPhysiologyModalOpen(true)}
                  className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full border border-yellow-400/50 bg-yellow-500/20 text-xs font-bold text-yellow-900 dark:text-yellow-100 hover:bg-yellow-500/30 active:scale-95 transition"
                >
                  ?
                </button>
              </div>
              <HelpModal
                open={physiologyModalOpen}
                title={`Por que ${formatNumberPtBR(indicatedDose.min, 2)}-${formatNumberPtBR(indicatedDose.max, 2)} ${doseUnit} para ${indicatedDose.purpose}?`}
                onClose={() => setPhysiologyModalOpen(false)}
              >
                <HelpContentRenderer
                  content={{
                    title: `Por que ${formatNumberPtBR(indicatedDose.min, 2)}-${formatNumberPtBR(indicatedDose.max, 2)} ${doseUnit} para ${indicatedDose.purpose}?`,
                    sections: [
                      {
                        level: 'IMPORTANT',
                        items: [
                          {
                            text:
                              indicatedDose.note ||
                              'Informacao de fisiologia nao disponivel para esta dose. Adicione as notas nas doses indicadas do farmaco.',
                          },
                        ],
                      },
                      {
                        level: 'INFO',
                        items: [
                          {
                            text:
                              'Esta dose foi baseada em protocolos clinicos validados e literatura veterinaria especializada.',
                          },
                        ],
                      },
                    ],
                  }}
                />
              </HelpModal>
            </>
          )}
          <FieldLabel text="Dose alvo" tooltipId="dose_help" />
          <div className="flex gap-2">
            <input
              type="number"
              value={dose}
              onChange={handleDoseChange}
              placeholder="0.0"
              step="0.01"
              className="flex-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 px-3 text-sm focus:border-sky-500 focus:ring-sky-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {ALL_UNITS.map((unit) => {
                const isRecommended = unit === selectedDrug?.recommendedUnit
                const isSelected = unit === doseUnit

                return (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => handleDoseUnit(unit)}
                    className={[
                      'px-3 py-2 rounded-md border text-xs transition flex items-center gap-2',
                      isSelected
                        ? 'bg-white/10 border-white/25'
                        : 'bg-transparent border-white/10 hover:bg-white/5',
                      isRecommended
                        ? 'border-[#39ff14] text-[#39ff14] shadow-[0_0_0_1px_#39ff14]'
                        : 'text-white/80',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <span>{unit}</span>
                    {isRecommended && (
                      <span className="rounded-full bg-[#39ff14]/10 px-2 py-0.5 text-[10px] font-semibold text-[#39ff14]">
                        Recomendada
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            {/* Painel explicativo da unidade recomendada */}
            {selectedDrug?.recommendedUnit && (
              <div className="mt-2 rounded-lg border border-[#39ff14]/30 bg-[#39ff14]/5 p-3 text-sm text-white/90">
                <p className="font-semibold text-[#39ff14]">
                  Unidade recomendada: {selectedDrug.recommendedUnit}
                </p>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-white/85">
                  {(selectedDrug.recommendedUnitWhy ?? []).map((line: string) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-white/60">
                  Dica: o CRIVET aceita qualquer unidade, mas manter a recomendada reduz risco de erro (min↔hora e
                  mcg↔mg).
                </p>
              </div>
            )}
            {/* Banner de alerta para unidade incomum (opcional) */}
            {selectedDrug?.unitRules?.unitHints?.[doseUnit] && (
              <div
                className={`rounded-md border p-2 text-xs ${selectedDrug.unitRules.unitHints[doseUnit].level === 'critical'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                  : selectedDrug.unitRules.unitHints[doseUnit].level === 'warning'
                    ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200'
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
                  }`}
              >
                <p className="font-semibold">
                  {selectedDrug.unitRules.unitHints[doseUnit].level === 'critical' && '⛔ '}
                  {selectedDrug.unitRules.unitHints[doseUnit].level === 'warning' && '⚠️ '}
                  {selectedDrug.unitRules.unitHints[doseUnit].level === 'info' && 'ℹ️ '}
                  {selectedDrug.unitRules.unitHints[doseUnit].message}
                </p>
              </div>
            )}
            {/* Banner de alerta crítico para unidade BLOQUEADA (safetyBlocks) */}
            {selectedDrug?.safetyBlocks?.filter(block => block.block_if_unit.includes(doseUnit)).map((block, idx) => (
              <div
                key={`block-${idx}`}
                className="rounded-md border p-2 text-xs bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
              >
                <p className="font-semibold">
                  ⛔ {block.message}
                </p>
              </div>
            ))}
          </div>
        </div>

        {selectedDrug?.id === 'insulina_regular' && (
          <div className="mb-4">
            <InsulinDKAProtocolCard />
          </div>
        )}

        <div className="space-y-2">
          <FieldLabel
            text={selectedDrug?.id === 'insulina_regular' ? "Apresentação / Concentração (Insulina)" : "Concentração do fármaco"}
            tooltipId="drug_concentration_help"
          />
          {selectedDrug?.id === 'insulina_regular' ? (
            <div className="space-y-3">
              <div className="relative">
                <select
                  value={concentration} // Value is the numeric concentration (e.g. 100 or 40)
                  onChange={(event) => {
                    const val = event.target.value;
                    if (val === 'custom') {
                      setIsCustomConcentration(true);
                      setConcentration('');
                    } else {
                      // Find the option to get the exact numeric value just in case, though value holds it
                      // Actually, we can just use the value directly if it's unique enough or handle logic
                      // But here value is the concentration string.
                      // Let's rely on the numeric value.
                      setConcentration(val);
                      setIsCustomConcentration(false);
                    }
                  }}
                  className="w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-3 px-3 text-sm focus:border-sky-500 focus:ring-sky-500 shadow-sm"
                >
                  <option value="" disabled>Selecione a insulina...</option>
                  {INSULIN_CONCENTRATIONS.map((opt) => (
                    <option key={opt.id} value={opt.units_per_ml}>
                      {opt.concentration_label}
                    </option>
                  ))}
                  <option value="custom">Outra / Diluição Customizada...</option>
                </select>
              </div>

              {/* Show selected insulin details/warnings */}
              {!isCustomConcentration && concentration && (() => {
                const selectedOpt = INSULIN_CONCENTRATIONS.find(opt => opt.units_per_ml.toString() === concentration);
                if (selectedOpt) {
                  return (
                    <div className={`text-xs p-3 rounded-md border ${selectedOpt.u_strength === 'U-40'
                      ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
                      : 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}>
                      <div className="flex gap-2 items-start">
                        <span className="mt-0.5">{selectedOpt.u_strength === 'U-40' ? '⚠️' : 'ℹ️'}</span>
                        <div>
                          <p className="font-semibold">{selectedOpt.name_commercial} ({selectedOpt.u_strength})</p>
                          <p>{selectedOpt.notes_syringe_match}</p>
                          {selectedOpt.mg_per_ml_if_known && (
                            <p className="mt-1 opacity-75">Conc. massa: ~{selectedOpt.mg_per_ml_if_known} mg/mL</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                }
                return null;
              })()}

              {isCustomConcentration && (
                <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                  <label className="block text-xs text-slate-500 mb-1">Concentração manual (U/mL):</label>
                  <input
                    type="number"
                    value={concentration}
                    onChange={handleConcentrationChange}
                    placeholder="Ex: 100"
                    step="0.1"
                    className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 px-3 text-sm focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>
              )}
            </div>
          ) : (
            /* STANDARD SELECTOR FOR OTHER DRUGS */
            !isCustomConcentration && selectedDrug?.concentrations.length ? (
              <select
                value={concentration}
                onChange={(event) => handleConcentrationSelect(event.target.value)}
                className="w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-2 px-3 text-sm focus:border-sky-500 focus:ring-sky-500"
              >
                {selectedDrug.concentrations.map((c) => (
                  <option key={c} value={c}>
                    {c} mg/mL
                  </option>
                ))}
                <option value="custom">Custom...</option>
              </select>
            ) : (
              <div className="flex gap-2">
                <input
                  type="number"
                  value={concentration}
                  onChange={handleConcentrationChange}
                  placeholder="Conc. (mg/mL)"
                  step="0.01"
                  className="flex-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 px-3 text-sm focus:border-sky-500 focus:ring-sky-500"
                />
                {selectedDrug?.concentrations.length ? (
                  <button
                    onClick={() => handleConcentrationSelect(selectedDrug.concentrations[0].toString())}
                    className="px-3 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200"
                  >
                    Lista
                  </button>
                ) : null}
              </div>
            )
          )}
        </div>

        {mode === 'preparation' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <FieldLabel text="Taxa da bomba (mL/h)" tooltipId="rate_help" />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={pumpRateValue || ''}
                  onChange={handlePumpRateChange}
                  placeholder="0"
                  step="0.1"
                  min="0"
                  className="flex-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 px-3 text-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
              {suggestedRates.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {suggestedRates.map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => handlePumpRatePreset(rate)}
                      className="px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                    >
                      {rate} mL/h
                    </button>
                  ))}
                </div>
              )}
              {pumpRateHint && (
                <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <span className="font-semibold">💡 Sugestão do CRIVET:</span> {pumpRateHint.message}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <FieldLabel text="Volume do veículo" tooltipId="vehicle_help" />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDilutionType('syringe')}
                  className={`px-4 py-2 rounded-md border text-sm transition ${dilutionType === 'syringe'
                    ? 'bg-sky-50 dark:bg-sky-900/20 border-sky-500 text-sky-700 dark:text-sky-300 font-medium'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                >
                  Seringa
                </button>
                <button
                  type="button"
                  onClick={() => setDilutionType('bag')}
                  className={`px-4 py-2 rounded-md border text-sm transition ${dilutionType === 'bag'
                    ? 'bg-sky-50 dark:bg-sky-900/20 border-sky-500 text-sky-700 dark:text-sky-300 font-medium'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                >
                  Bolsa
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {volumes.map((vol) => (
                  <button
                    key={vol}
                    type="button"
                    onClick={() => setDilutionVolume(vol.toString())}
                    className={[
                      'rounded-md border px-3 py-2 text-xs transition',
                      dilutionVolume === vol.toString()
                        ? 'bg-white/10 border-white/25'
                        : 'bg-transparent border-white/10 hover:bg-white/5',
                    ].join(' ')}
                  >
                    {vol} mL
                  </button>
                ))}
                <input
                  type="number"
                  value={dilutionVolume}
                  onChange={(e) => setDilutionVolume(e.target.value)}
                  placeholder="Custom"
                  step="1"
                  min="1"
                  className="flex-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 px-3 text-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <FieldLabel text="Tipo de fluido" tooltipId="compatibility_help" />
              <select
                value={fluidType}
                onChange={(e) => setFluidType(e.target.value as FluidType)}
                className="w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-2 px-3 text-sm focus:border-sky-500 focus:ring-sky-500"
              >
                <option value="NaCl 0.9%">NaCl 0,9% (SF)</option>
                <option value="Ringer Lactato">Ringer Lactato</option>
                <option value="SG 5%">Solução Glicosada 5%</option>
              </select>
              {selectedDrug && (
                <CompatibilityPanel
                  compat={selectedDrug.compatibility}
                  selectedDiluentId={getDiluentId(fluidType)}
                  drugId={selectedDrug.id}
                />
              )}
            </div>

            {/* Tabela de protocolo de insulina - apenas para insulina em bolsa */}
            {selectedDrug?.id === 'insulina_regular' && dilutionType === 'bag' && (
              <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400/50 dark:border-yellow-500/30 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💉</span>
                  <h4 className="font-bold text-sm text-yellow-900 dark:text-yellow-100">
                    Protocolo "Bolsa de Insulina Regular" para CAD
                  </h4>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="bg-white dark:bg-slate-800 rounded-md p-3 border border-yellow-200 dark:border-yellow-800">
                    <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Preparo da bolsa (CRI):</p>
                    <p className="text-yellow-800 dark:text-yellow-200 mb-1">
                      Adicionar insulina regular em <span className="font-semibold">250 mL de NaCl 0,9%</span>
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-yellow-800 dark:text-yellow-200">
                      <li><span className="font-semibold">Cão:</span> 2,2 U/kg na bolsa (250 mL)</li>
                      <li><span className="font-semibold">Gato:</span> 1,1 U/kg na bolsa (250 mL)</li>
                    </ul>
                    <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2 italic">
                      Monitorar glicemia a cada 1–2 h e ajustar para que a glicose não caia &gt; 50–100 mg/dL/h.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-md p-3 border border-yellow-200 dark:border-yellow-800">
                    <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                      Tabela de controle da glicemia durante a CRI (bolsa)
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-yellow-100 dark:bg-yellow-900/30">
                            <th className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5 text-left font-semibold text-yellow-900 dark:text-yellow-100">
                              Glicemia (mg/dL)
                            </th>
                            <th className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5 text-left font-semibold text-yellow-900 dark:text-yellow-100">
                              Taxa da bolsa (mL/h)
                            </th>
                            <th className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5 text-left font-semibold text-yellow-900 dark:text-yellow-100">
                              Dextrose no cristalóide (%)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-yellow-800 dark:text-yellow-200">
                          <tr>
                            <td className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5 font-semibold">&gt; 350</td>
                            <td className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5">10</td>
                            <td className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5">0</td>
                          </tr>
                          <tr className="bg-yellow-50 dark:bg-yellow-900/10">
                            <td className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5 font-semibold">250–350</td>
                            <td className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5">7</td>
                            <td className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5">0</td>
                          </tr>
                          <tr>
                            <td className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5 font-semibold">150–250</td>
                            <td className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5">5</td>
                            <td className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5">2,5</td>
                          </tr>
                          <tr className="bg-yellow-50 dark:bg-yellow-900/10">
                            <td className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5 font-semibold">100–150</td>
                            <td className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5">3–5</td>
                            <td className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5">5</td>
                          </tr>
                          <tr className="bg-red-50 dark:bg-red-900/20">
                            <td className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5 font-semibold text-red-700 dark:text-red-300">≤ 100</td>
                            <td className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5 text-red-700 dark:text-red-300 font-semibold">
                              Suspender CRI de insulina
                            </td>
                            <td className="border border-yellow-300 dark:border-yellow-700 px-2 py-1.5">Manter 5%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-md p-2 border border-amber-200 dark:border-amber-800">
                    <p className="text-xs text-amber-800 dark:text-amber-200">
                      <span className="font-semibold">⚠️ Nota de segurança:</span> Em diabetes ambulatorial, a AAHA não recomenda diluir insulina por risco de resultados imprevisíveis/contaminação—isso não invalida protocolos de UTI/CAD, mas é um alerta para "não banalizar diluição" fora do contexto hospitalar.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode('direct')}
            className={`px-4 py-2 rounded-md border text-sm transition ${mode === 'direct'
              ? 'bg-sky-50 dark:bg-sky-900/20 border-sky-500 text-sky-700 dark:text-sky-300 font-medium'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
          >
            Infusão direta
          </button>
          <button
            type="button"
            onClick={() => setMode('preparation')}
            className={`px-4 py-2 rounded-md border text-sm transition ${mode === 'preparation'
              ? 'bg-sky-50 dark:bg-sky-900/20 border-sky-500 text-sky-700 dark:text-sky-300 font-medium'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
          >
            Preparo (seringa/bolsa)
          </button>
        </div>
      </div>

      {isValidDirect && mode === 'direct' && directResult && (
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Resultado</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Taxa de infusão</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {formatNumberPtBR(directResult.rateMlHr, 2)} <span className="text-sm font-normal">mL/h</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Taxa por minuto</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {formatNumberPtBR(directResult.rateMlMin, 4)} <span className="text-sm font-normal">mL/min</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {isValidPreparation && mode === 'preparation' && preparationResult && (
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          {preparationResult.error ? (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-bold text-sm text-red-900 dark:text-red-100">
                    {renderErrorTitle(preparationResult.error as any)}
                  </p>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {renderError(preparationResult.error as any)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Resultado</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Volume fármaco</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {formatNumberPtBR(preparationResult.drugVolumeMl, 2)} <span className="text-sm font-normal">mL</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Volume diluente</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {formatNumberPtBR(preparationResult.diluentVolumeMl, 2)} <span className="text-sm font-normal">mL</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Conc. final</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {formatNumberPtBR(preparationResult.finalConcentrationMgMl, 4)} <span className="text-sm font-normal">mg/mL</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Total fármaco</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {formatNumberPtBR(preparationResult.totalDrugMg, 2)} <span className="text-sm font-normal">mg</span>
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 flex gap-3">
                <ClipboardList className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                  <p>
                    Preparar {formatNumberPtBR(vehicleVolume)} mL ({dilutionType === 'syringe' ? 'seringa' : 'bolsa'}). Aspirar{' '}
                    {formatNumberPtBR(preparationResult.drugVolumeMl, 2)} mL do fármaco e completar com{' '}
                    {formatNumberPtBR(preparationResult.diluentVolumeMl, 2)} mL de diluente.
                  </p>
                  <p>Taxa na bomba: {formatNumberPtBR(pumpRateValue, 1)} mL/h. Fluido: {fluidType}.</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {((isValidDirect && directResult) || (isValidPreparation && preparationResult)) && (
        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowCalculation(!showCalculation)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400"
            >
              <span>{showCalculation ? '▼' : '▶'}</span>
              <span>Cálculo explicado</span>
            </button>

            {showCalculation && (
              <button
                type="button"
                className="text-xs text-sky-600 dark:text-sky-400 hover:underline"
                onClick={() => {
                  const steps = mode === 'direct' ? directResult?.steps || [] : preparationResult?.steps || []
                  navigator.clipboard.writeText(steps.join('\n'))
                }}
              >
                Copiar
              </button>
            )}
          </div>

          {showCalculation && (
            <div className="mt-3 space-y-2">
              {(mode === 'direct' ? directResult?.steps : preparationResult?.steps)?.map((line, idx) => (
                <div
                  key={`${idx}-${line.slice(0, 20)}`}
                  className="flex gap-2 rounded-lg bg-white dark:bg-slate-800 px-3 py-2"
                >
                  <span className="opacity-60 text-slate-500 dark:text-slate-400">{idx + 1}.</span>
                  <span className="text-sm text-slate-900 dark:text-white">{line}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
