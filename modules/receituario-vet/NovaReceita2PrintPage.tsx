// NovaReceita2PrintPage.tsx
// Página de revisão interativa + impressão/PDF para Nova Receita 2.0
//
// MODOS (via query param ?mode=):
//   review  → layout 2 colunas: editor esquerda + preview clicável direita (DEFAULT)
//   print   → apenas preview + auto window.print()
//   pdf     → apenas preview + auto window.print()
//
// A edição aqui é apenas do RASCUNHO em memória (sessionStorage).
// Não salva no Supabase.

import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RxPrintView } from './RxPrintView'
import { buildPrintDocsFromNovaReceita2 } from './novaReceita2Adapter'
import { BUILTIN_TEMPLATES, DEFAULT_NOVA_RECEITA_TEMPLATE_ID } from './builtinTemplates'
import { normalizeNovaReceita2State } from './NovaReceita2Page'
import type { NovaReceita2State, PrescriptionItem, TutorInfo, PatientInfo } from './NovaReceita2Page'
import type { TemplateZoneKey } from './rxDb'
import { uploadPrescriptionPdf, attachPdfToPresc, savePrescription, savePrescriptionDocuments } from '../../src/lib/prescriptionsRecords'
import { getStoredClinicId } from '../../src/lib/clinic'
import { buildAdministrationDoseText } from './compoundedStructuredEditing'

// ==================== SESSION ====================

const RX2_SESSION_KEY = 'vetius:rx2:review-draft'

function loadSessionState(): NovaReceita2State | null {
    try {
        const raw = sessionStorage.getItem(RX2_SESSION_KEY)
        if (!raw) return null
        return normalizeNovaReceita2State(JSON.parse(raw) as NovaReceita2State)
    } catch {
        return null
    }
}

function saveSessionState(state: NovaReceita2State) {
    try {
        sessionStorage.setItem(RX2_SESSION_KEY, JSON.stringify(state))
    } catch {
        // noop
    }
}

// ==================== PDF ====================

function sanitizeFilePart(value: string): string {
    return (value || 'SEM_DADO')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .toUpperCase()
}

function buildPdfFileName(patientName: string, tutorName: string): string {
    const date = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')
    return `${sanitizeFilePart(patientName)}_${sanitizeFilePart(tutorName)}_${date}.pdf`
}

// ==================== CONSTANTS ====================

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

const FREQUENCY_OPTIONS = [
    { value: '', label: 'Selecionar frequência' },
    { value: '1', label: '1× ao dia (a cada 24h)' },
    { value: '2', label: '2× ao dia (a cada 12h)' },
    { value: '3', label: '3× ao dia (a cada 8h)' },
    { value: '4', label: '4× ao dia (a cada 6h)' },
    { value: '6', label: '6× ao dia (a cada 4h)' },
    { value: '8', label: '8× ao dia (a cada 3h)' },
    { value: '12', label: '12× ao dia (a cada 2h)' },
]

const DURATION_MODE_OPTIONS = [
    { value: 'fixed_days', label: 'Duração fechada' },
    { value: 'continuous_until_recheck', label: 'Uso contínuo até reavaliação' },
    { value: 'until_recheck', label: 'Até reavaliação clínica' },
    { value: 'continuous_use', label: 'Uso contínuo' },
    { value: 'until_finished', label: 'Até terminar o medicamento' },
]

const DURATION_UNIT_OPTIONS = [
    { value: 'dias', label: 'dias' },
    { value: 'semanas', label: 'semanas' },
    { value: 'meses', label: 'meses' },
]

const DOSE_UNIT_OPTIONS = [
    'mg/kg', 'mcg/kg', 'g/kg', 'UI/kg', 'mL/kg',
    'mg', 'mcg', 'g', 'UI', 'mL',
    'mg/mL', 'mcg/mL', '%',
    'comprimido(s)', 'cápsula(s)', 'gota(s)', 'ampola(s)', 'sachê(s)',
]

function formatFrequency(timesPerDay: number | undefined): string {
    if (!timesPerDay) return ''
    const hours = 24 / timesPerDay
    return `${timesPerDay}× ao dia (a cada ${hours}h)`
}

function formatIntervalHours(hours: number | undefined): string {
    if (!hours) return ''
    return `a cada ${hours} horas`
}

function parseDoseString(raw?: string): { value: string; unit: string } {
    const str = String(raw || '').trim()
    if (!str) return { value: '', unit: 'mg/kg' }
    const match = str.match(/^(\d+(?:[.,]\d+)?)\s*(.+)$/)
    if (!match) return { value: str, unit: 'mg/kg' }
    return { value: match[1], unit: match[2].trim() }
}

// ==================== EDITOR PANEL TYPES ====================

type EditorFocus =
  | { type: 'identification' }
  | { type: 'recommendations' }
  | { type: 'item'; itemId: string }
  | null

function getDefaultNovaReceitaTemplateId(): string {
  return BUILTIN_TEMPLATES.find((template) => template.id === DEFAULT_NOVA_RECEITA_TEMPLATE_ID)?.id || BUILTIN_TEMPLATES[0].id
}

// ==================== EDITOR: IDENTIFICATION ====================

function EditorIdentification({
    state,
    onStateChange,
}: {
    state: NovaReceita2State
    onStateChange: (updater: (prev: NovaReceita2State) => NovaReceita2State) => void
}) {
    const tutor = state.tutor
    const patient = state.patient

    const setTutor = (field: keyof TutorInfo, value: string) => {
        onStateChange((prev) => ({
            ...prev,
            tutor: prev.tutor ? { ...prev.tutor, [field]: value } : prev.tutor,
        }))
    }

    const setPatient = (field: keyof PatientInfo, value: string) => {
        onStateChange((prev) => ({
            ...prev,
            patient: prev.patient ? { ...prev.patient, [field]: value } : prev.patient,
        }))
    }

    if (!tutor && !patient) {
        return (
            <div className="rounded-xl border border-dashed border-slate-700 p-6 text-center">
                <p className="text-sm text-slate-500">Nenhum tutor ou paciente selecionado.</p>
                <Link
                    to="/receituario-vet/nova-receita-2"
                    className="mt-2 inline-block text-xs text-[color:var(--rxv-primary)] hover:underline"
                >
                    ← Voltar ao editor para selecionar
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {tutor && (
                <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tutor</p>
                    <Field label="Nome">
                        <Input
                            value={tutor.name}
                            onChange={(e) => setTutor('name', e.target.value)}
                        />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="CPF">
                            <Input
                                value={tutor.cpf || ''}
                                onChange={(e) => setTutor('cpf', e.target.value)}
                                placeholder="000.000.000-00"
                            />
                        </Field>
                        <Field label="RG">
                            <Input
                                value={tutor.rg || ''}
                                onChange={(e) => setTutor('rg', e.target.value)}
                            />
                        </Field>
                        <Field label="Telefone">
                            <Input
                                value={tutor.phone || ''}
                                onChange={(e) => setTutor('phone', e.target.value)}
                                placeholder="(00) 00000-0000"
                            />
                        </Field>
                        <Field label="CEP">
                            <Input
                                value={tutor.zipcode || ''}
                                onChange={(e) => setTutor('zipcode', e.target.value)}
                            />
                        </Field>
                    </div>
                    <Field label="Endereço">
                        <Input
                            value={tutor.street || ''}
                            onChange={(e) => setTutor('street', e.target.value)}
                            placeholder="Rua, Av..."
                        />
                    </Field>
                    <div className="grid grid-cols-3 gap-3">
                        <Field label="Número">
                            <Input
                                value={tutor.number || ''}
                                onChange={(e) => setTutor('number', e.target.value)}
                            />
                        </Field>
                        <Field label="Complemento">
                            <Input
                                value={tutor.complement || ''}
                                onChange={(e) => setTutor('complement', e.target.value)}
                            />
                        </Field>
                        <Field label="Bairro">
                            <Input
                                value={tutor.neighborhood || ''}
                                onChange={(e) => setTutor('neighborhood', e.target.value)}
                            />
                        </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Cidade">
                            <Input
                                value={tutor.city || ''}
                                onChange={(e) => setTutor('city', e.target.value)}
                            />
                        </Field>
                        <Field label="UF">
                            <Input
                                value={tutor.state || ''}
                                onChange={(e) => setTutor('state', e.target.value)}
                                placeholder="SP"
                            />
                        </Field>
                    </div>
                </div>
            )}

            {patient && (
                <div className="space-y-3 pt-4 border-t border-slate-800">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Paciente</p>
                    <Field label="Nome">
                        <Input
                            value={patient.name}
                            onChange={(e) => setPatient('name', e.target.value)}
                        />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Raça">
                            <Input
                                value={patient.breed || ''}
                                onChange={(e) => setPatient('breed', e.target.value)}
                            />
                        </Field>
                        <Field label="Idade">
                            <Input
                                value={patient.age_text || ''}
                                onChange={(e) => setPatient('age_text', e.target.value)}
                                placeholder="Ex: 3 anos"
                            />
                        </Field>
                    </div>
                </div>
            )}
        </div>
    )
}

// ==================== EDITOR: RECOMMENDATIONS ====================

function EditorRecommendations({
    state,
    onStateChange,
}: {
    state: NovaReceita2State
    onStateChange: (updater: (prev: NovaReceita2State) => NovaReceita2State) => void
}) {
    return (
        <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Recomendações gerais</p>
            <textarea
                className="w-full rounded-lg border border-slate-700 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-[color:color-mix(in_srgb,var(--rxv-primary)_40%,transparent)] focus:outline-none"
                rows={8}
                placeholder="Digite orientações ao tutor..."
                value={state.recommendations}
                onChange={(e) =>
                    onStateChange((prev) => ({ ...prev, recommendations: e.target.value }))
                }
            />
            {state.exams.length > 0 && (
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Exames solicitados</p>
                    <div className="flex flex-wrap gap-1.5">
                        {state.exams.map((exam) => (
                            <span key={exam} className="rounded-full border border-slate-700 px-2 py-0.5 text-xs text-slate-400">
                                {exam}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

// ==================== EDITOR: ITEM ====================

function EditorItem({
    state,
    itemId,
    onStateChange,
}: {
    state: NovaReceita2State
    itemId: string
    onStateChange: (updater: (prev: NovaReceita2State) => NovaReceita2State) => void
}) {
    const item = state.items.find((i) => i.id === itemId)
    const [doseModalOpen, setDoseModalOpen] = useState(false)
    const [doseValue, setDoseValue] = useState('')
    const [doseUnit, setDoseUnit] = useState('mg/kg')

    if (!item) {
        return (
            <div className="rounded-xl border border-dashed border-slate-700 p-6 text-center">
                <p className="text-sm text-slate-500">Item não encontrado.</p>
            </div>
        )
    }

    const setField = (field: keyof PrescriptionItem, value: unknown) => {
        onStateChange((prev) => ({
            ...prev,
            items: prev.items.map((i) => {
                if (i.id !== itemId) return i
                if (field === 'instructions') {
                    const nextInstructions = String(value ?? '')
                    const hasManualInstructions = nextInstructions.trim().length > 0
                    return {
                        ...i,
                        instructions: nextInstructions,
                        manualEdited: hasManualInstructions,
                        autoInstruction: !hasManualInstructions,
                    }
                }
                return { ...i, [field]: value }
            }),
        }))
    }

    const openDoseModal = () => {
        const parsed = parseDoseString(item.dose)
        setDoseValue(parsed.value)
        setDoseUnit(DOSE_UNIT_OPTIONS.includes(parsed.unit) ? parsed.unit : 'mg/kg')
        setDoseModalOpen(true)
    }

    const applyDose = () => {
        if (!doseValue.trim()) {
            setDoseModalOpen(false)
            return
        }
        const calculated = buildAdministrationDoseText(doseValue.trim(), doseUnit, state.patient?.weight_kg)
        const doseText = calculated || `${doseValue.trim()} ${doseUnit}`
        onStateChange((prev) => ({
            ...prev,
            items: prev.items.map((i) => {
                if (i.id !== itemId) return i
                const prevMeta = (i.presentation_metadata as Record<string, unknown> | null) || {}
                return {
                    ...i,
                    dose: doseText,
                    presentation_metadata: {
                        ...prevMeta,
                        compounded_selected_dose_value: doseValue.trim(),
                        compounded_selected_dose_unit: doseUnit,
                    },
                }
            }),
        }))
        setDoseModalOpen(false)
    }

    // Faixa recomendada (apenas para manipulados com regimen)
    const regimenDoseRange = item.kind === 'compounded' && item.compounded_regimen_snapshot
        ? (() => {
            const r = item.compounded_regimen_snapshot
            if (r.dose_min != null && r.dose_max != null) {
                return `${r.dose_min}–${r.dose_max} ${r.dose_unit || ''}${r.per_weight_unit ? '/' + r.per_weight_unit : ''}`.trim()
            }
            return null
        })()
        : null

    return (
        <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Editando item</p>

            {/* Identificação */}
            <div className="rounded-xl border border-slate-800 bg-black/40 p-3 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Identificação</p>

                <Field label="Nome do fármaco">
                    <Input
                        value={item.name}
                        onChange={(e) => setField('name', e.target.value)}
                        placeholder="Ex: Amoxicilina"
                    />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                    <Field label="Concentração">
                        <Input
                            value={item.concentration_text || ''}
                            onChange={(e) => setField('concentration_text', e.target.value)}
                            placeholder="Ex: 500 mg/comp"
                        />
                    </Field>
                    <Field label="Nome comercial">
                        <Input
                            value={item.commercial_name || ''}
                            onChange={(e) => setField('commercial_name', e.target.value)}
                            placeholder="Ex: Clavulin"
                        />
                    </Field>
                </div>

                {item.pharmaceutical_form !== undefined && (
                    <Field label="Forma farmacêutica">
                        <Input
                            value={item.pharmaceutical_form || ''}
                            onChange={(e) => setField('pharmaceutical_form', e.target.value)}
                            placeholder="Ex: Comprimido"
                        />
                    </Field>
                )}

                {item.isManual && (
                    <span className="inline-block rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                        manual
                    </span>
                )}
            </div>

            {/* Dose */}
            <div className="rounded-xl border border-slate-800 bg-black/40 p-3 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                    {item.kind === 'compounded' ? 'Dose final por administração' : 'Dose'}
                </p>

                <div className="flex items-center gap-3">
                    <div className="flex-1 rounded-lg border border-slate-700 bg-black/30 px-3 py-2 text-sm text-white">
                        {item.dose || <span className="text-slate-600">Não definida</span>}
                    </div>
                    <button
                        type="button"
                        onClick={openDoseModal}
                        className="shrink-0 rounded-lg border border-[color:color-mix(in_srgb,var(--rxv-primary)_40%,transparent)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_10%,transparent)] px-3 py-2 text-xs font-bold text-[color:var(--rxv-primary)] hover:bg-[color:color-mix(in_srgb,var(--rxv-primary)_20%,transparent)] transition-colors"
                    >
                        Editar dose
                    </button>
                </div>

                {regimenDoseRange && (
                    <p className="text-[11px] text-slate-500">
                        Faixa recomendada: <span className="font-semibold text-slate-400">{regimenDoseRange}</span>
                    </p>
                )}

                {/* Modal de edição de dose */}
                {doseModalOpen && (
                    <div className="rounded-xl border border-[color:color-mix(in_srgb,var(--rxv-primary)_30%,transparent)] bg-[#0d1f0b] p-4 space-y-4">
                        <p className="text-xs font-black uppercase tracking-widest text-[color:var(--rxv-primary)]">Editar dose</p>

                        {regimenDoseRange && (
                            <div className="rounded-lg border border-slate-700 bg-black/30 px-3 py-2">
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Faixa recomendada</p>
                                <p className="mt-1 text-sm font-semibold text-slate-300">{regimenDoseRange}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-[1fr_160px] gap-3">
                            <Field label="Dose escolhida">
                                <Input
                                    type="number"
                                    step="any"
                                    min="0"
                                    value={doseValue}
                                    onChange={(e) => setDoseValue(e.target.value)}
                                    placeholder="Ex: 10"
                                />
                            </Field>
                            <Field label="Unidade">
                                <select
                                    className="w-full rounded-lg border border-slate-700 bg-black/40 px-3 py-2 text-sm text-white focus:border-[color:color-mix(in_srgb,var(--rxv-primary)_40%,transparent)] focus:outline-none"
                                    value={doseUnit}
                                    onChange={(e) => setDoseUnit(e.target.value)}
                                >
                                    {DOSE_UNIT_OPTIONS.map((u) => (
                                        <option key={u} value={u}>{u}</option>
                                    ))}
                                </select>
                            </Field>
                        </div>

                        <div className="rounded-lg border border-slate-800 bg-black/20 px-3 py-2 text-sm text-slate-300">
                            Dose final: <span className="font-semibold text-white">{doseValue ? `${doseValue} ${doseUnit}` : '—'}</span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={applyDose}
                                className="flex-1 rounded-lg bg-[color:var(--rxv-primary)] px-4 py-2 text-sm font-bold text-[color:var(--rxv-on-primary)] hover:brightness-110 transition-colors"
                            >
                                Aplicar
                            </button>
                            <button
                                type="button"
                                onClick={() => setDoseModalOpen(false)}
                                className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Posologia estruturada */}
            <div className="rounded-xl border border-slate-800 bg-black/40 p-3 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Posologia</p>

                <Field label="Via de administração">
                    <select
                        className="w-full rounded-lg border border-slate-700 bg-black/40 px-3 py-2 text-sm text-white focus:border-[color:color-mix(in_srgb,var(--rxv-primary)_40%,transparent)] focus:outline-none"
                        value={item.route || 'VO'}
                        onChange={(e) => setField('route', e.target.value)}
                    >
                        {ROUTE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </Field>

                {/* Modo de frequência */}
                <Field label="Modo de frequência">
                    <select
                        className="w-full rounded-lg border border-slate-700 bg-black/40 px-3 py-2 text-sm text-white focus:border-[color:color-mix(in_srgb,var(--rxv-primary)_40%,transparent)] focus:outline-none"
                        value={item.frequencyMode || 'times_per_day'}
                        onChange={(e) => {
                            const mode = e.target.value as 'times_per_day' | 'interval_hours'
                            onStateChange((prev) => ({
                                ...prev,
                                items: prev.items.map((i) => i.id === itemId ? {
                                    ...i,
                                    frequencyMode: mode,
                                    timesPerDay: mode === 'times_per_day' ? (i.timesPerDay || 2) : undefined,
                                    intervalHours: mode === 'interval_hours' ? (i.intervalHours || 12) : undefined,
                                    frequency: mode === 'interval_hours'
                                        ? formatIntervalHours(i.intervalHours || 12)
                                        : formatFrequency(i.timesPerDay || 2),
                                } : i),
                            }))
                        }}
                    >
                        <option value="times_per_day">Vezes por dia</option>
                        <option value="interval_hours">Intervalo em horas</option>
                    </select>
                </Field>

                {/* Frequência — select ou input numérico */}
                {item.frequencyMode === 'interval_hours' ? (
                    <Field label="Intervalo (horas)">
                        <Input
                            type="number"
                            min="1"
                            step="1"
                            value={item.intervalHours ?? ''}
                            placeholder="Ex: 12"
                            onChange={(e) => {
                                const hours = e.target.value ? Number(e.target.value) : undefined
                                onStateChange((prev) => ({
                                    ...prev,
                                    items: prev.items.map((i) => i.id === itemId ? {
                                        ...i,
                                        frequencyMode: 'interval_hours',
                                        intervalHours: hours,
                                        frequency: formatIntervalHours(hours),
                                    } : i),
                                }))
                            }}
                        />
                    </Field>
                ) : (
                    <Field label="Frequência">
                        <select
                            className="w-full rounded-lg border border-slate-700 bg-black/40 px-3 py-2 text-sm text-white focus:border-[color:color-mix(in_srgb,var(--rxv-primary)_40%,transparent)] focus:outline-none"
                            value={item.timesPerDay ? String(item.timesPerDay) : ''}
                            onChange={(e) => {
                                const times = e.target.value ? Number(e.target.value) : undefined
                                onStateChange((prev) => ({
                                    ...prev,
                                    items: prev.items.map((i) => i.id === itemId ? {
                                        ...i,
                                        frequencyMode: times ? 'times_per_day' : undefined,
                                        timesPerDay: times,
                                        intervalHours: undefined,
                                        frequency: formatFrequency(times),
                                    } : i),
                                }))
                            }}
                        >
                            {FREQUENCY_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </Field>
                )}

                {/* Resumo de frequência */}
                {(item.timesPerDay || item.intervalHours) && (
                    <div className="rounded-lg border border-slate-800 bg-black/20 px-3 py-1.5 text-xs text-slate-400">
                        {item.frequencyMode === 'interval_hours'
                            ? formatIntervalHours(item.intervalHours)
                            : formatFrequency(item.timesPerDay)}
                    </div>
                )}
            </div>

            {/* Duração estruturada */}
            <div className="rounded-xl border border-slate-800 bg-black/40 p-3 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Duração</p>

                <Field label="Modo de duração">
                    <select
                        className="w-full rounded-lg border border-slate-700 bg-black/40 px-3 py-2 text-sm text-white focus:border-[color:color-mix(in_srgb,var(--rxv-primary)_40%,transparent)] focus:outline-none"
                        value={item.durationMode || 'fixed_days'}
                        onChange={(e) => {
                            const mode = e.target.value as typeof item.durationMode
                            onStateChange((prev) => ({
                                ...prev,
                                items: prev.items.map((i) => i.id === itemId ? {
                                    ...i,
                                    durationMode: mode,
                                    duration: mode === 'fixed_days'
                                        ? (i.durationValue ? `${i.durationValue} ${i.durationUnit || 'dias'}` : '')
                                        : '',
                                } : i),
                            }))
                        }}
                    >
                        {DURATION_MODE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </Field>

                {(item.durationMode === 'fixed_days' || !item.durationMode) && (
                    <div className="grid grid-cols-[1fr_140px] gap-3">
                        <Field label="Valor">
                            <Input
                                type="number"
                                min="1"
                                step="1"
                                value={item.durationValue ?? ''}
                                placeholder="Ex: 7"
                                onChange={(e) => {
                                    const val = e.target.value ? Number(e.target.value) : undefined
                                    onStateChange((prev) => ({
                                        ...prev,
                                        items: prev.items.map((i) => i.id === itemId ? {
                                            ...i,
                                            durationMode: 'fixed_days',
                                            durationValue: val,
                                            duration: val ? `${val} ${i.durationUnit || 'dias'}` : '',
                                        } : i),
                                    }))
                                }}
                            />
                        </Field>
                        <Field label="Unidade">
                            <select
                                className="w-full rounded-lg border border-slate-700 bg-black/40 px-3 py-2 text-sm text-white focus:border-[color:color-mix(in_srgb,var(--rxv-primary)_40%,transparent)] focus:outline-none"
                                value={item.durationUnit || 'dias'}
                                onChange={(e) => {
                                    const unit = e.target.value
                                    onStateChange((prev) => ({
                                        ...prev,
                                        items: prev.items.map((i) => i.id === itemId ? {
                                            ...i,
                                            durationUnit: unit,
                                            duration: i.durationValue ? `${i.durationValue} ${unit}` : '',
                                        } : i),
                                    }))
                                }}
                            >
                                {DURATION_UNIT_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </Field>
                    </div>
                )}

                {/* Resumo de duração */}
                <div className="rounded-lg border border-slate-800 bg-black/20 px-3 py-1.5 text-xs text-slate-400">
                    {item.durationMode === 'continuous_until_recheck' && 'Uso contínuo até reavaliação clínica'}
                    {item.durationMode === 'until_recheck' && 'Até reavaliação clínica'}
                    {item.durationMode === 'continuous_use' && 'Uso contínuo'}
                    {item.durationMode === 'until_finished' && 'Até terminar o medicamento'}
                    {(item.durationMode === 'fixed_days' || !item.durationMode) && (
                        item.durationValue
                            ? `por ${item.durationValue} ${item.durationUnit || 'dias'}`
                            : 'Sem duração definida'
                    )}
                </div>
            </div>

            {/* Instruções */}
            <div className="rounded-xl border border-slate-800 bg-black/40 p-3 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Instruções</p>

                <Field label="Instruções adicionais de uso (opcional)">
                    <textarea
                        className="w-full rounded-lg border border-slate-700 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-[color:color-mix(in_srgb,var(--rxv-primary)_40%,transparent)] focus:outline-none"
                        rows={3}
                        placeholder="Instruções específicas para o tutor..."
                        value={item.instructions || ''}
                        onChange={(e) => setField('instructions', e.target.value)}
                    />
                    <p className="mt-1 text-[10px] text-slate-500">
                        Texto adicional incluído abaixo da posologia gerada automaticamente ("Administrar X...").
                    </p>
                </Field>

                <Field label="Cautelas (uma por linha)">
                    <textarea
                        className="w-full rounded-lg border border-slate-700 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-[color:color-mix(in_srgb,var(--rxv-primary)_40%,transparent)] focus:outline-none"
                        rows={2}
                        placeholder={`Não usar em fêmeas prenhes\nMonitorar função renal`}
                        value={(item.cautions || []).join('\n')}
                        onChange={(e) =>
                            setField('cautions', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))
                        }
                    />
                </Field>
            </div>
        </div>
    )
}

// ==================== MINI FIELD COMPONENTS ====================

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {label}
            </label>
            {children}
        </div>
    )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="w-full rounded-lg border border-slate-700 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-[color:color-mix(in_srgb,var(--rxv-primary)_40%,transparent)] focus:outline-none"
        />
    )
}

// ==================== ZONE LABEL ====================

const ZONE_LABEL: Record<TemplateZoneKey, string> = {
    header: 'Cabeçalho (clínica/médico)',
    patient: 'Identificação (tutor/paciente)',
    body: 'Corpo da receita',
    recommendations: 'Recomendações',
    signature: 'Assinatura',
}

// ==================== MAIN PAGE ====================

export default function NovaReceita2PrintPage() {
    const location = useLocation()
    const mode = new URLSearchParams(location.search).get('mode') || 'review'
    const isReviewMode = mode === 'review'
    const isPrintMode = mode === 'print'
    const isPdfMode = mode === 'pdf'

    const [state, setState] = useState<NovaReceita2State | null>(() => loadSessionState())
    const [toast, setToast] = useState<string | null>(null)
    const [isExporting, setIsExporting] = useState(false)
    const [activeZone, setActiveZone] = useState<TemplateZoneKey | null>(null)
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
    const previewRef = useRef<HTMLDivElement | null>(null)
    const autoActionFiredRef = useRef(false)

    const pushToast = useCallback((msg: string) => {
        setToast(msg)
        window.setTimeout(() => setToast(null), 3500)
    }, [])

    // ==================== STATE UPDATE ====================

    const updateState = useCallback(
        (updater: (prev: NovaReceita2State) => NovaReceita2State) => {
            setState((prev) => {
                if (!prev) return prev
                const next = { ...updater(prev), updatedAt: new Date().toISOString() }
                saveSessionState(next)
                return next
            })
        },
        []
    )

    // ==================== MEMO ====================

    const printDocs = useMemo(() => {
        if (!state) return null
        return buildPrintDocsFromNovaReceita2(state)
    }, [state])
    const primaryPrintDoc = printDocs?.[0] || null

    const selectedTemplate = useMemo(() => {
        const fallbackTemplateId = getDefaultNovaReceitaTemplateId()
        if (!state) return BUILTIN_TEMPLATES.find((t) => t.id === fallbackTemplateId) || BUILTIN_TEMPLATES[0]
        const id = state.printTemplateId || state.templateId || fallbackTemplateId
        return BUILTIN_TEMPLATES.find((t) => t.id === id) || BUILTIN_TEMPLATES.find((t) => t.id === fallbackTemplateId) || BUILTIN_TEMPLATES[0]
    }, [state])

    // ==================== EDITOR FOCUS ====================

    const editorFocus: EditorFocus = useMemo(() => {
        if (selectedItemId) return { type: 'item', itemId: selectedItemId }
        if (activeZone === 'patient') return { type: 'identification' }
        if (activeZone === 'recommendations') return { type: 'recommendations' }
        return null
    }, [activeZone, selectedItemId])

    const editorTitle = useMemo(() => {
        if (!editorFocus) return 'Clique no preview para editar'
        if (editorFocus.type === 'item') {
            const item = state?.items.find((i) => i.id === editorFocus.itemId)
            return `Editando: ${item?.name || 'Item'}`
        }
        if (editorFocus.type === 'identification') return 'Identificação (Tutor/Paciente)'
        if (editorFocus.type === 'recommendations') return 'Recomendações'
        return 'Editor'
    }, [editorFocus, state])

    // ==================== HANDLERS ====================

    const handleZoneSelect = useCallback((zone: TemplateZoneKey) => {
        setSelectedItemId(null)
        setActiveZone(zone)
    }, [])

    const handleItemSelect = useCallback((itemId: string) => {
        setSelectedItemId(itemId)
        setActiveZone('body')
    }, [])

    const handlePrint = useCallback(() => {
        window.print()
    }, [])

    const handleDownloadPdf = useCallback(async () => {
        const container = previewRef.current
        if (!container) {
            pushToast('Preview não disponível para exportação.')
            return
        }
        const hasControlledDoc = !!printDocs?.some((doc) => doc.documentKind === 'special-control')
        const hasTutorAddress = !![
            state?.tutor?.street,
            state?.tutor?.number,
            state?.tutor?.neighborhood,
            state?.tutor?.city,
            state?.tutor?.state,
            state?.tutor?.zipcode,
        ].filter(Boolean).length
        if (hasControlledDoc && (!state?.tutor?.cpf || !hasTutorAddress)) {
            pushToast('Receita de controle especial exige CPF e endereço completo do tutor.')
            return
        }

        const sheets = Array.from(container.querySelectorAll('[data-rx-print-canvas="sheet"]')) as HTMLElement[]
        const targets = sheets.length ? sheets : [container]

        setIsExporting(true)
        try {
            const [{ jsPDF }, html2canvasModule] = await Promise.all([
                import('jspdf'),
                import('html2canvas'),
            ])
            const html2canvas = html2canvasModule.default
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: (selectedTemplate?.paperSize || 'A4').toLowerCase() as 'a4' | 'a5',
            })

            const pageW = pdf.internal.pageSize.getWidth()
            const pageH = pdf.internal.pageSize.getHeight()
            for (let i = 0; i < targets.length; i += 1) {
                const renderedCanvas = await html2canvas(targets[i], {
                    scale: 2,
                    backgroundColor: '#ffffff',
                    useCORS: true,
                    logging: false,
                })
                const img = renderedCanvas.toDataURL('image/png')
                if (i > 0) pdf.addPage()
                pdf.addImage(img, 'PNG', 0, 0, pageW, pageH, undefined, 'FAST')
            }

            const fileName = buildPdfFileName(
                state?.patient?.name || 'PACIENTE',
                state?.tutor?.name || 'TUTOR'
            )
            pdf.save(fileName)
            pushToast(`PDF gerado: ${fileName}`)

            let effectivePrescriptionId = state?.supabaseId
            const patientId = state?.patient?.id
            const clinicId = getStoredClinicId()
            if (!effectivePrescriptionId && patientId && clinicId && state?.tutor?.id) {
                try {
                    const payload = {
                        patient_id: patientId,
                        tutor_id: state.tutor.id,
                        clinic_id: clinicId,
                        content: {
                            kind: selectedTemplate?.documentKindTarget as any,
                            templateId: state.printTemplateId || state.templateId,
                            printDoc: primaryPrintDoc,
                            printDocs,
                            stateSnapshot: state,
                            createdAtLocal: new Date().toISOString(),
                            appVersion: '2.0.0-parity'
                        }
                    }
                    const saved = await savePrescription(payload)
                    effectivePrescriptionId = saved.id
                    updateState(prev => ({ ...prev, supabaseId: saved.id }))
                } catch (saveErr) {
                    console.error('[Rx2Print] Failed to save prescription', saveErr)
                }
            }

            if (effectivePrescriptionId && patientId && clinicId) {
                try {
                    const blob = pdf.output('blob')
                    const pdfPath = await uploadPrescriptionPdf({
                        clinicId,
                        patientId,
                        prescriptionId: effectivePrescriptionId,
                        blob,
                    })
                    await attachPdfToPresc({ prescriptionId: effectivePrescriptionId, pdfPath, clinicId })
                    await savePrescriptionDocuments({
                        prescriptionId: effectivePrescriptionId,
                        clinicId,
                        documents: (printDocs || []).map((doc) => ({
                            document_type: doc.documentKind === 'special-control' ? 'controlled' : 'standard',
                            pdf_path: pdfPath,
                            pdf_bucket: 'receituario-media',
                            snapshot_json: doc as any,
                        })),
                    })
                } catch (uploadErr) {
                    console.error('[Rx2Print] Storage upload failed (non-fatal)', uploadErr)
                }
            }
        } catch (err) {
            console.error('[Rx2Print] PDF export failed', err)
            pushToast('Erro ao gerar PDF. Tente imprimir diretamente.')
        } finally {
            setIsExporting(false)
        }
    }, [state, selectedTemplate, pushToast, updateState, primaryPrintDoc, printDocs])

    const handleWhatsApp = useCallback(async () => {
        const phone = state?.tutor?.phone || ''
        if (!phone) {
            pushToast('Tutor sem telefone cadastrado.')
            return
        }
        const digits = phone.replace(/\D/g, '')
        const normalized = digits.startsWith('55') ? digits : `55${digits}`
        const msg = `Olá ${state?.tutor?.name || ''}, segue a receita do paciente ${state?.patient?.name || ''}.`
        window.open(`https://wa.me/${normalized}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer')
        try { await handleDownloadPdf() } catch { /* ignore */ }
    }, [state, pushToast, handleDownloadPdf])

    // ==================== AUTO-ACTIONS ====================

    useEffect(() => {
        if (!printDocs?.length || autoActionFiredRef.current) return
        if (isPrintMode) {
            autoActionFiredRef.current = true
            const t = window.setTimeout(() => window.print(), 600)
            return () => window.clearTimeout(t)
        }
        if (isPdfMode) {
            autoActionFiredRef.current = true
            const t = window.setTimeout(() => handleDownloadPdf(), 600)
            return () => window.clearTimeout(t)
        }
    }, [isPrintMode, isPdfMode, printDocs, handleDownloadPdf])

    // ==================== EMPTY STATE ====================

    if (!state || !printDocs?.length) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0a0f0a] text-white">
                <div className="text-center">
                    <p className="text-slate-400 mb-4">Nenhuma receita carregada para revisão.</p>
                    <Link
                        to="/receituario-vet/nova-receita-2"
                        className="rounded-lg border border-[color:color-mix(in_srgb,var(--rxv-primary)_40%,transparent)] px-4 py-2 text-sm font-bold text-[color:var(--rxv-primary)] hover:bg-[color:color-mix(in_srgb,var(--rxv-primary)_10%,transparent)]"
                    >
                        ← Voltar ao editor
                    </Link>
                </div>
            </div>
        )
    }

    // ==================== TOPBAR ====================

    const topbar = (
        <div className="sticky top-0 z-30 border-b border-[#274b20] bg-[#0a1507]/90 backdrop-blur-md px-4 py-3 print:hidden">
            <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 flex-wrap">
                <div>
                    <h1 className="text-lg font-black text-white">
                        {isReviewMode ? '✏️ Revisão Interativa' : isPrintMode ? '🖨️ Impressão' : '📄 Exportar PDF'}
                    </h1>
                    <p className="text-xs text-slate-400">
                        {isReviewMode
                            ? 'Clique nas seções do preview para editar'
                            : `Template: ${selectedTemplate.name}`}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Link
                        to="/receituario-vet/nova-receita-2"
                        className="rounded-lg border border-[#345d2a] bg-[#1a2e16] px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-[#22381d]"
                    >
                        ← Editor
                    </Link>
                    <button
                        type="button"
                        className="rounded-lg border border-[#345d2a] bg-[#1a2e16] px-3 py-2 text-sm font-semibold hover:bg-[#22381d]"
                        onClick={handleWhatsApp}
                    >
                        WhatsApp
                    </button>
                    <button
                        type="button"
                        className="rounded-lg border border-[#345d2a] bg-[#1a2e16] px-3 py-2 text-sm font-semibold hover:bg-[#22381d]"
                        onClick={handlePrint}
                    >
                        🖨️ Imprimir
                    </button>
                    <button
                        type="button"
                        disabled={isExporting}
                        className="rounded-lg bg-[color:var(--rxv-primary)] px-3 py-2 text-sm font-bold text-[color:var(--rxv-on-primary)] hover:brightness-110 disabled:opacity-50"
                        onClick={handleDownloadPdf}
                    >
                        {isExporting ? 'Gerando...' : '⬇ Exportar PDF'}
                    </button>
                </div>
            </div>
        </div>
    )

    // ==================== REVIEW LAYOUT ====================

    if (isReviewMode) {
        return (
            <div className="min-h-screen bg-[#0a0f0a] text-slate-100">
                {topbar}

                <div className="mx-auto max-w-[1600px] px-4 py-6">
                    <div className="rxv-review-grid grid grid-cols-1 gap-6 lg:grid-cols-[420px_1fr]">

                        {/* ============ COLUNA ESQUERDA: EDITOR CONTEXTUAL ============ */}
                        <div className="rxv-review-editor-col space-y-4">
                            {/* Hint */}
                            <div className="rounded-xl border border-slate-800 bg-black/40 p-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">
                                    Editor
                                </p>
                                <p className="text-sm font-semibold text-white mb-1">{editorTitle}</p>
                                {!editorFocus && (
                                    <div className="space-y-2 text-xs text-slate-500 mt-3">
                                        <p className="flex items-center gap-2">
                                            <span className="inline-block w-3 h-3 rounded-full border border-[color:color-mix(in_srgb,var(--rxv-primary)_50%,transparent)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_10%,transparent)]" />
                                            Clique em <strong className="text-slate-400">Identificação</strong> para editar tutor/paciente
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="inline-block w-3 h-3 rounded-full border border-[color:color-mix(in_srgb,var(--rxv-primary)_50%,transparent)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_10%,transparent)]" />
                                            Clique em <strong className="text-slate-400">Recomendações</strong> para editar orientações
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="inline-block w-3 h-3 rounded-full border border-[color:color-mix(in_srgb,var(--rxv-primary)_50%,transparent)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_10%,transparent)]" />
                                            Clique em qualquer <strong className="text-slate-400">medicamento</strong> para editar dose/instrução
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Zone buttons (atalho rápido) */}
                            <div className="flex flex-wrap gap-2">
                                {(['patient', 'recommendations'] as TemplateZoneKey[]).map((zone) => (
                                    <button
                                        key={zone}
                                        type="button"
                                        onClick={() => handleZoneSelect(zone)}
                                        className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-all ${activeZone === zone && !selectedItemId
                                            ? 'border-[color:color-mix(in_srgb,var(--rxv-primary)_60%,transparent)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_10%,transparent)] text-[color:var(--rxv-primary)]'
                                            : 'border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                                            }`}
                                    >
                                        {ZONE_LABEL[zone]}
                                    </button>
                                ))}
                                {state.items.map((item, idx) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => handleItemSelect(item.id)}
                                        className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-all ${selectedItemId === item.id
                                            ? 'border-[color:color-mix(in_srgb,var(--rxv-primary)_60%,transparent)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_10%,transparent)] text-[color:var(--rxv-primary)]'
                                            : 'border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                                            }`}
                                    >
                                        #{idx + 1} {item.name.slice(0, 18)}
                                    </button>
                                ))}
                            </div>

                            {/* Editor content */}
                            <div className="rounded-xl border border-slate-800 bg-black/30 p-4">
                                {editorFocus?.type === 'identification' && (
                                    <EditorIdentification state={state} onStateChange={updateState} />
                                )}
                                {editorFocus?.type === 'recommendations' && (
                                    <EditorRecommendations state={state} onStateChange={updateState} />
                                )}
                                {editorFocus?.type === 'item' && (
                                    <EditorItem
                                        state={state}
                                        itemId={editorFocus.itemId}
                                        onStateChange={updateState}
                                    />
                                )}
                                {!editorFocus && (
                                    <p className="py-4 text-center text-xs text-slate-600">
                                        Selecione uma seção ou item no preview →
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* ============ COLUNA DIREITA: PREVIEW INTERATIVO ============ */}
                        <div className="rxv-review-preview-col lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto">
                            <div className="rxv-review-preview-inner rounded-xl border border-slate-700 bg-slate-900/50 overflow-hidden">
                                <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 bg-black/40">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                        Preview clicável — {selectedTemplate.name}
                                    </span>
                                    <span className="text-[10px] text-slate-600">
                                        {activeZone ? `Zona ativa: ${ZONE_LABEL[activeZone] || activeZone}` : selectedItemId ? 'Item selecionado' : 'Nenhuma seleção'}
                                    </span>
                                </div>

                                <div
                                    className="overflow-auto"
                                    style={{ maxHeight: 'calc(100vh - 10rem)' }}
                                >
                                    <div ref={previewRef} className="p-4">
                                        <div className="space-y-4">
                                            {printDocs.map((doc, idx) => (
                                                <div key={`${doc.documentKind || 'standard'}-${idx}`} className="space-y-2">
                                                    {printDocs.length > 1 && (
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                            {doc.documentKind === 'special-control' ? 'Prévia: Receita de controle especial' : 'Prévia: Receita padrão'}
                                                        </p>
                                                    )}
                                                    <RxPrintView
                                                        doc={doc}
                                                        template={selectedTemplate}
                                                        interactive={true}
                                                        activeZone={activeZone || undefined}
                                                        onZoneSelect={handleZoneSelect}
                                                        selectedItemId={selectedItemId || undefined}
                                                        onItemSelect={handleItemSelect}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Print CSS — só imprime a coluna do preview */}
                <style>{`
                    @media print {
                        body { background: white !important; color: black !important; margin: 0 !important; padding: 0 !important; }
                        .print\\:hidden { display: none !important; }
                        .rxv-review-editor-col { display: none !important; }
                        .rxv-review-preview-col {
                            display: block !important;
                            width: 100% !important;
                            max-height: none !important;
                            overflow: visible !important;
                            position: static !important;
                        }
                        .rxv-review-grid {
                            display: block !important;
                            padding: 0 !important;
                            margin: 0 !important;
                        }
                        .rxv-review-preview-inner {
                            border: none !important;
                            background: white !important;
                            overflow: visible !important;
                        }
                        [style*="transform"] {
                            transform: none !important;
                            width: 100% !important;
                        }
                        @page { margin: 10mm; }
                    }
                `}</style>

                {/* Toast */}
                {toast && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-xl border border-[color:color-mix(in_srgb,var(--rxv-primary)_38%,var(--rxv-border))] bg-[color:color-mix(in_srgb,var(--rxv-primary)_6%,var(--rxv-surface))] px-6 py-3 text-sm font-semibold text-[color:color-mix(in_srgb,var(--rxv-primary)_78%,#f1f5f9)] shadow-xl print:hidden">
                        {toast}
                    </div>
                )}
            </div>
        )
    }

    // ==================== PRINT / PDF LAYOUT ====================
    // Estratégia de isolamento de impressão:
    //   - Div de TELA (print:hidden): contém topbar + wrapper escuro + previewRef para PDF
    //   - Div de IMPRESSÃO (hidden print:block): apenas RxPrintView limpo, sem decoração
    // Isso garante que window.print() nunca vaza estilos do app dark-theme para a impressão.

    return (
        <>
            {/* TELA: Interface dark (oculta durante window.print) */}
            <div className="rxv-print-root min-h-screen bg-[#0c1a09] text-slate-100 print:hidden">
                {topbar}

                <div
                    className="rxv-print-page-wrapper mx-auto max-w-5xl px-4 py-8"
                    style={{ background: 'radial-gradient(#1e3a18 1px, transparent 1px)', backgroundSize: '18px 18px' }}
                >
                    <div ref={previewRef} className="rxv-print-canvas">
                        <div className="space-y-6">
                            {printDocs.map((doc, idx) => (
                                <div key={`${doc.documentKind || 'standard'}-${idx}`} className="rounded-lg border border-slate-700/40 bg-white p-2">
                                    <RxPrintView
                                        doc={doc}
                                        template={selectedTemplate}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {toast && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-xl border border-[color:color-mix(in_srgb,var(--rxv-primary)_38%,var(--rxv-border))] bg-[color:color-mix(in_srgb,var(--rxv-primary)_6%,var(--rxv-surface))] px-6 py-3 text-sm font-semibold text-[color:color-mix(in_srgb,var(--rxv-primary)_78%,#f1f5f9)] shadow-xl">
                        {toast}
                    </div>
                )}
            </div>

            {/* IMPRESSÃO: Container limpo — só visível via window.print() */}
            <div className="hidden print:block bg-white text-black">
                {printDocs.map((doc, idx) => (
                    <div key={`${doc.documentKind || 'standard'}-${idx}`} className={idx > 0 ? 'page-break-before-always' : ''}>
                        <RxPrintView
                            doc={doc}
                            template={selectedTemplate}
                        />
                    </div>
                ))}
            </div>

            <style>{`
                @page { margin: 10mm; }
                @media print {
                    body { background: white !important; margin: 0 !important; padding: 0 !important; }
                }
            `}</style>
        </>
    )
}
