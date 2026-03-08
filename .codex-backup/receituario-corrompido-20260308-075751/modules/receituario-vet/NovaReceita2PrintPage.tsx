// NovaReceita2PrintPage.tsx
// Página de revisão interativa + impressão/PDF para Nova Receita 2.0
//
// MODOS (via query param mode=):
//   review  → layout 2 colunas: editor esquerda + preview clicável direita (DEFAULT)
//   print   → apenas preview + auto window.print()
//   pdf     → apenas preview + auto download PDF
//
// A edição aqui é apenas do RASCUNHO em memória (sessionStorage).
// Não salva no Supabase.
//
// FIX: Agora gera documentos separados para medicamentos controlados (special-control)

import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { RxPrintView } from './RxPrintView'
import { buildPrintDocsFromNovaReceita2 } from './novaReceita2Adapter'
import { BUILTIN_TEMPLATES } from './builtinTemplates'
import type { NovaReceita2State, PrescriptionItem, TutorInfo, PatientInfo } from './NovaReceita2Page'
import type { TemplateZoneKey } from './rxDb'
import type { PrintDoc } from './rxTypes'
import { uploadPrescriptionPdf, attachPdfToPresc, savePrescription } from '../../src/lib/prescriptionsRecords'
import { getStoredClinicId } from '../../src/lib/clinic'

// ==================== SESSION ====================

const RX2_SESSION_KEY = 'vetius:rx2:review-draft'

function loadSessionState(): NovaReceita2State | null {
    try {
        const raw = sessionStorage.getItem(RX2_SESSION_KEY)
        if (!raw) return null
        return JSON.parse(raw) as NovaReceita2State
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

function buildPdfFileName(patientName: string, tutorName: string, suffix?: string): string {
    const date = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')
    const sfx = suffix ? `_${suffix}` : ''
    return `${sanitizeFilePart(patientName)}_${sanitizeFilePart(tutorName)}_${date}${sfx}.pdf`
}

// ==================== ROUTE OPTIONS ====================

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

// ==================== EDITOR PANEL TYPES ====================

type EditorFocus =
    | { type: 'identification' }
    | { type: 'recommendations' }
    | { type: 'item'; itemId: string }
    | null

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
                    className="mt-2 inline-block text-xs text-[#39ff14] hover:underline"
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
                className="w-full rounded-lg border border-slate-700 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-[#39ff14]/40 focus:outline-none"
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
            items: prev.items.map((i) => (i.id === itemId ? { ...i, [field]: value } : i)),
        }))
    }

    return (
        <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Editando item</p>

            {/* Identificação do medicamento — todos editáveis */}
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

                {/* Controle especial toggle */}
                <label className="flex items-center gap-2 text-xs text-slate-300">
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded"
                        checked={!!item.is_controlled}
                        onChange={(e) => setField('is_controlled', e.target.checked)}
                    />
                    Medicamento de controle especial
                </label>

                {item.isManual && (
                    <span className="inline-block rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                        manual
                    </span>
                )}
            </div>

            {/* Posologia */}
            <div className="rounded-xl border border-slate-800 bg-black/40 p-3 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Posologia</p>

                <div className="grid grid-cols-2 gap-3">
                    <Field label="Dose">
                        <Input
                            value={item.dose || ''}
                            onChange={(e) => setField('dose', e.target.value)}
                            placeholder="Ex: 10 mg/kg"
                        />
                    </Field>
                    <Field label="Via">
                        <select
                            className="w-full rounded-lg border border-slate-700 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#39ff14]/40 focus:outline-none"
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
                    <Field label="Frequência">
                        <Input
                            value={item.frequency || ''}
                            onChange={(e) => setField('frequency', e.target.value)}
                            placeholder="Ex: BID, TID, 12/12h"
                        />
                    </Field>
                    <Field label="Duração">
                        <Input
                            value={item.duration || ''}
                            onChange={(e) => setField('duration', e.target.value)}
                            placeholder="Ex: 7 dias"
                        />
                    </Field>
                </div>

                <Field label="Instruções de uso">
                    <textarea
                        className="w-full rounded-lg border border-slate-700 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-[#39ff14]/40 focus:outline-none"
                        rows={3}
                        placeholder="Instruções específicas para o tutor..."
                        value={item.instructions || ''}
                        onChange={(e) => setField('instructions', e.target.value)}
                    />
                </Field>

                <Field label="Cautelas (uma por linha)">
                    <textarea
                        className="w-full rounded-lg border border-slate-700 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-[#39ff14]/40 focus:outline-none"
                        rows={2}
                        placeholder={"Ex: Não usar em fêmeas prenhes\nMonitorar função renal"}
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
            className="w-full rounded-lg border border-slate-700 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-[#39ff14]/40 focus:outline-none"
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
    const [activeDocIndex, setActiveDocIndex] = useState(0)
    const previewRefs = useRef<Array<HTMLDivElement | null>>([])
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

    const printDocs = useMemo<PrintDoc[]>(() => {
        if (!state) return []
        return buildPrintDocsFromNovaReceita2(state)
    }, [state])

    const hasSpecialControl = useMemo(() => {
        return printDocs.some((doc) => doc.documentKind === 'special-control')
    }, [printDocs])

    const activeDoc = printDocs[activeDocIndex] || printDocs[0] || null

    const selectedTemplate = useMemo(() => {
        if (!state) return BUILTIN_TEMPLATES[0]
        const id = state.templateId || BUILTIN_TEMPLATES[0].id
        return BUILTIN_TEMPLATES.find((t) => t.id === id) || BUILTIN_TEMPLATES[0]
    }, [state])

    // Special control template: use a special one or fall back to the same
    const specialControlTemplate = useMemo(() => {
        const specialTpl = BUILTIN_TEMPLATES.find((t) => (t as any).documentKindTarget === 'special-control')
        return specialTpl || selectedTemplate
    }, [selectedTemplate])

    const templateForDoc = useCallback((doc: PrintDoc) => {
        if (doc.documentKind === 'special-control') return specialControlTemplate
        return selectedTemplate
    }, [selectedTemplate, specialControlTemplate])

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

    // Ensure activeDocIndex stays in bounds
    useEffect(() => {
        if (activeDocIndex >= printDocs.length && printDocs.length > 0) {
            setActiveDocIndex(Math.max(0, printDocs.length - 1))
        }
    }, [activeDocIndex, printDocs.length])

    const handleDownloadPdf = useCallback(async () => {
        if (!previewRefs.current.length || !state) {
            pushToast('Preview não disponível para exportação.')
            return
        }

        setIsExporting(true)
        try {
            const paperSize = (selectedTemplate.paperSize || 'A4').toLowerCase() as 'a4' | 'a5'
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: paperSize,
            })

            // Render each doc (standard + special-control) as a separate page
            for (let idx = 0; idx < printDocs.length; idx += 1) {
                const container = previewRefs.current[idx]
                if (!container) continue
                const canvas = container.querySelector('[data-rx-print-canvas="sheet"]') as HTMLElement | null
                const target = canvas || container

                const renderedCanvas = await html2canvas(target, {
                    scale: 2,
                    backgroundColor: '#ffffff',
                    useCORS: true,
                    logging: false,
                })

                const img = renderedCanvas.toDataURL('image/png')
                if (idx > 0) pdf.addPage()
                const pageW = pdf.internal.pageSize.getWidth()
                const pageH = pdf.internal.pageSize.getHeight()
                pdf.addImage(img, 'PNG', 0, 0, pageW, pageH, undefined, 'FAST')
            }

            const fileName = buildPdfFileName(
                state.patient?.name || 'PACIENTE',
                state.tutor?.name || 'TUTOR'
            )
            pdf.save(fileName)
            pushToast(`PDF gerado: ${fileName}`)

            // Ensure prescription record exists before uploading PDF
            let effectivePrescriptionId = state.supabaseId
            const patientId = state.patient?.id
            const clinicId = getStoredClinicId()
            if (!effectivePrescriptionId && patientId && clinicId && state.tutor?.id) {
                try {
                    const payload = {
                        patient_id: patientId,
                        tutor_id: state.tutor.id,
                        clinic_id: clinicId,
                        content: {
                            kind: selectedTemplate.documentKindTarget as any,
                            templateId: state.templateId,
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

            // Upload para Supabase Storage (best-effort)
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
                    if (import.meta.env.DEV) {
                        console.log('[Rx2Print] PDF salvo no storage', { pdfPath })
                    }
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
    }, [state, selectedTemplate, pushToast, updateState, printDocs])

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
        if (!printDocs.length || autoActionFiredRef.current) return
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

    if (!state || !printDocs.length) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0a0f0a] text-white">
                <div className="text-center">
                    <p className="text-slate-400 mb-4">Nenhuma receita carregada para revisão.</p>
                    <Link
                        to="/receituario-vet/nova-receita-2"
                        className="rounded-lg border border-[#39ff14]/40 px-4 py-2 text-sm font-bold text-[#39ff14] hover:bg-[#39ff14]/10"
                    >
                        ← Voltar ao editor
                    </Link>
                </div>
            </div>
        )
    }

    // ==================== TOPBAR ====================

    const activeDocLabel = activeDoc?.documentKind === 'special-control'
        ? '⚕️ Receita de Controle Especial'
        : '📋 Receita Padrão'

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
                    {hasSpecialControl && (
                        <p className="mt-1 text-xs text-amber-400">
                            ⚠ Medicamentos controlados detectados — receita de controle especial será gerada separadamente.
                        </p>
                    )}
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
                        className="rounded-lg bg-[#38ff14] px-3 py-2 text-sm font-bold text-[#10200d] hover:bg-[#2bd010] disabled:opacity-50"
                        onClick={handleDownloadPdf}
                    >
                        {isExporting ? 'Gerando...' : '⬇ Exportar PDF'}
                    </button>
                </div>
            </div>
        </div>
    )

    // ==================== DOC SWITCHER (for multiple docs) ====================

    const docSwitcher = printDocs.length > 1 ? (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2">
            <div className="text-xs text-slate-300">
                Documento {activeDocIndex + 1} de {printDocs.length} · <span className="font-semibold text-[#9eff8f]">{activeDocLabel}</span>
            </div>
            <div className="flex items-center gap-2">
                {printDocs.map((doc, idx) => (
                    <button
                        key={idx}
                        type="button"
                        className={`rounded border px-2 py-1 text-xs ${idx === activeDocIndex
                            ? 'border-[#39ff14] bg-[#39ff14]/10 text-[#39ff14] font-bold'
                            : 'border-[#335d2a] hover:bg-[#1b3015] text-slate-400'
                            }`}
                        onClick={() => setActiveDocIndex(idx)}
                    >
                        {doc.documentKind === 'special-control' ? '⚕️ Controlada' : '📋 Padrão'}
                    </button>
                ))}
            </div>
        </div>
    ) : null

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
                                            <span className="inline-block w-3 h-3 rounded-full border border-[#39ff14]/50 bg-[#39ff14]/10" />
                                            Clique em <strong className="text-slate-400">Identificação</strong> para editar tutor/paciente
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="inline-block w-3 h-3 rounded-full border border-[#39ff14]/50 bg-[#39ff14]/10" />
                                            Clique em <strong className="text-slate-400">Recomendações</strong> para editar orientações
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="inline-block w-3 h-3 rounded-full border border-[#39ff14]/50 bg-[#39ff14]/10" />
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
                                            ? 'border-[#39ff14]/60 bg-[#39ff14]/10 text-[#39ff14]'
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
                                            ? 'border-[#39ff14]/60 bg-[#39ff14]/10 text-[#39ff14]'
                                            : 'border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                                            }`}
                                    >
                                        #{idx + 1} {item.name.slice(0, 18)}
                                        {item.is_controlled ? ' ⚕️' : ''}
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
                            {docSwitcher}
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
                                    {printDocs.map((doc, idx) => (
                                        <div
                                            key={`${doc.documentKind}-${idx}`}
                                            ref={(el) => { previewRefs.current[idx] = el }}
                                            className={`p-4 ${idx !== activeDocIndex ? 'hidden' : ''}`}
                                        >
                                            {doc.documentKind === 'special-control' && (
                                                <div className="mb-3 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs text-amber-400 font-semibold">
                                                    ⚕️ RECEITA DE CONTROLE ESPECIAL — Medicamentos controlados separados automaticamente
                                                </div>
                                            )}
                                            <RxPrintView
                                                doc={doc}
                                                template={templateForDoc(doc)}
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

                {/* C1: Print CSS para modo review — só imprime a coluna do preview */}
                <style>{`
                    @media print {
                        body { background: white !important; color: black !important; margin: 0 !important; padding: 0 !important; }
                        .print\\:hidden { display: none !important; }

                        /* Ocultar coluna do editor no modo review */
                        .rxv-review-editor-col { display: none !important; }

                        /* Mostrar preview em largura total */
                        .rxv-review-preview-col {
                            display: block !important;
                            width: 100% !important;
                            max-height: none !important;
                            overflow: visible !important;
                            position: static !important;
                        }

                        /* Remover grid / layout app */
                        .rxv-review-grid {
                            display: block !important;
                            padding: 0 !important;
                            margin: 0 !important;
                        }

                        /* Remove decorações do container */
                        .rxv-review-preview-inner {
                            border: none !important;
                            background: white !important;
                            overflow: visible !important;
                        }

                        /* Remove transforms */
                        [style*="transform"] {
                            transform: none !important;
                            width: 100% !important;
                        }

                        @page { margin: 10mm; }
                    }
                `}</style>

                {/* Toast */}
                {toast && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-xl border border-[#3b6c2f] bg-[#12230f] px-6 py-3 text-sm font-semibold text-[#9eff8f] shadow-xl print:hidden">
                        {toast}
                    </div>
                )}
            </div>
        )
    }

    // ==================== PRINT / PDF LAYOUT ====================

    return (
        <>
            {/* TELA: Interface dark (oculta durante window.print) */}
            <div className="rxv-print-root min-h-screen bg-[#0c1a09] text-slate-100 print:hidden">
                {topbar}

                <div
                    className="rxv-print-page-wrapper mx-auto max-w-5xl px-4 py-8"
                    style={{ background: 'radial-gradient(#1e3a18 1px, transparent 1px)', backgroundSize: '18px 18px' }}
                >
                    {docSwitcher}
                    {/* previewRefs usado pelo html2canvas para export PDF — render all docs */}
                    {printDocs.map((doc, idx) => (
                        <div
                            key={`${doc.documentKind}-${idx}`}
                            ref={(el) => { previewRefs.current[idx] = el }}
                            className={`rxv-print-canvas ${idx !== activeDocIndex ? 'hidden print:block' : ''} ${idx > 0 ? 'mt-8' : ''}`}
                        >
                            {doc.documentKind === 'special-control' && (
                                <div className="mb-3 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs text-amber-400 font-semibold print:hidden">
                                    ⚕️ RECEITA DE CONTROLE ESPECIAL — Documento separado para medicamentos controlados
                                </div>
                            )}
                            <RxPrintView
                                doc={doc}
                                template={templateForDoc(doc)}
                            />
                        </div>
                    ))}
                </div>

                {toast && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-xl border border-[#3b6c2f] bg-[#12230f] px-6 py-3 text-sm font-semibold text-[#9eff8f] shadow-xl">
                        {toast}
                    </div>
                )}
            </div>

            {/* IMPRESSÃO: Container limpo — só visível via window.print() */}
            <div className="hidden print:block bg-white text-black">
                {printDocs.map((doc, idx) => (
                    <div key={`print-${doc.documentKind}-${idx}`} className={idx > 0 ? 'break-before-page' : ''}>
                        <RxPrintView
                            doc={doc}
                            template={templateForDoc(doc)}
                        />
                    </div>
                ))}
            </div>

            <style>{`
                @page { margin: 10mm; }
                @media print {
                    body { background: white !important; margin: 0 !important; padding: 0 !important; }
                    .break-before-page { page-break-before: always; }
                }
            `}</style>
        </>
    )
}
