import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ReceituarioChrome from './ReceituarioChrome'
import { useClinic } from '../../src/components/ClinicProvider'
import { listPrescriptionsByPatient, PrescriptionRecord, voidPrescription, getPdfSignedUrl } from '../../src/lib/prescriptionsRecords'
import { RxvCard, RxvButton, RxvSectionHeader } from '../../src/components/receituario/RxvComponents'
import { RxPrintView } from './RxPrintView'
import { BUILTIN_TEMPLATES } from './builtinTemplates'

export default function HistoricoReceitasPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { clinicId } = useClinic()
    const patientId = searchParams.get('patientId')
    const patientName = searchParams.get('patientName') || 'Paciente'

    const [prescriptions, setPrescriptions] = useState<PrescriptionRecord[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [previewDoc, setPreviewDoc] = useState<PrescriptionRecord | null>(null)

    const loadHistory = useCallback(async () => {
        if (!patientId || !clinicId) return
        setIsLoading(true)
        try {
            const data = await listPrescriptionsByPatient(patientId, clinicId)
            setPrescriptions(data)
        } catch (err) {
            console.error('[Historico] Error loading', err)
        } finally {
            setIsLoading(false)
        }
    }, [patientId, clinicId])

    useEffect(() => {
        loadHistory()
    }, [loadHistory])

    const handleOpen = (record: PrescriptionRecord) => {
        // Direciona para o editor 2.0 com o ID da prescrição
        navigate(`/receituario-vet/nova-receita-2?prescriptionId=${record.id}`)
    }

    const handleVoid = async (record: PrescriptionRecord) => {
        if (!window.confirm('Deseja anular esta receita? Estar ação não pode ser desfeita.')) return
        try {
            await voidPrescription(record.id, clinicId || undefined)
            loadHistory()
        } catch (err) {
            alert('Erro ao anular receita.')
        }
    }

    const handleDownloadPdf = async (record: PrescriptionRecord) => {
        if (!record.pdf_path) return
        try {
            const url = await getPdfSignedUrl(record.pdf_path, 60)
            window.open(url, '_blank', 'noopener,noreferrer')
        } catch (err) {
            console.error('[Historico] signed url error', err)
            alert('Erro ao obter link do PDF.')
        }
    }

    const handleExport = (record: PrescriptionRecord) => {
        // Coloca o stateSnapshot no sessionStorage e vai para a página de print
        if (!record.content?.stateSnapshot) {
            alert('Não é possível exportar: Snapshot de estado ausente.')
            return
        }
        sessionStorage.setItem('vetius:rx2:review-draft', JSON.stringify(record.content.stateSnapshot))
        navigate('/receituario-vet/nova-receita-2-print')
    }

    const formatDate = (iso: string) => {
        return new Date(iso).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <ReceituarioChrome section="historico" title="Histórico de Receitas" subtitle={`Prescrições de ${patientName}`}>
            <div className="space-y-6">
                <RxvCard>
                    <RxvSectionHeader
                        icon="history"
                        title={`Histórico - ${patientName}`}
                        subtitle="Prescrições salvas no Supabase"
                    >
                        <RxvButton variant="secondary" onClick={() => navigate(-1)}>
                            Voltar
                        </RxvButton>
                    </RxvSectionHeader>

                    {isLoading ? (
                        <div className="py-12 text-center text-slate-500">Carrregando histórico...</div>
                    ) : prescriptions.length === 0 ? (
                        <div className="py-12 text-center text-slate-500">Nenhuma receita encontrada para este paciente.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3">Data</th>
                                        <th className="px-4 py-3">Tipo</th>
                                        <th className="px-4 py-3 text-center">Versão</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {prescriptions.map((px) => (
                                        <tr key={px.id} className="group hover:bg-slate-800/20">
                                            <td className="px-4 py-3 text-sm font-medium text-slate-200">
                                                {formatDate(px.created_at)}
                                            </td>
                                            <td className="px-4 py-3 text-xs text-slate-400 capitalize">
                                                {px.content?.kind === 'special-control' ? '💊 Controle Especial' : '📄 Padrão'}
                                            </td>
                                            <td className="px-4 py-3 text-center text-xs font-bold text-slate-500">
                                                v{px.version}
                                            </td>
                                            <td className="px-4 py-3 text-xs">
                                                <span className={`rounded-full px-2 py-0.5 font-bold uppercase tracking-tighter ${px.status === 'void' ? 'bg-red-900/40 text-red-400' :
                                                    px.status === 'signed' ? 'bg-green-900/40 text-green-400' :
                                                        'bg-blue-900/40 text-blue-400'
                                                    }`}>
                                                    {px.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => setPreviewDoc(px)}
                                                        className="rounded bg-slate-800 px-2 py-1 text-[10px] font-bold text-slate-300 hover:bg-slate-700"
                                                    >
                                                        Visualizar
                                                    </button>
                                                    <button
                                                        onClick={() => handleOpen(px)}
                                                        className="rounded bg-slate-800 px-2 py-1 text-[10px] font-bold text-slate-300 hover:bg-slate-700"
                                                    >
                                                        Abrir
                                                    </button>
                                                    <button
                                                        onClick={() => handleExport(px)}
                                                        className="rounded bg-emerald-900/40 px-2 py-1 text-[10px] font-black text-emerald-400 hover:bg-emerald-900/60"
                                                    >
                                                        Exportar
                                                    </button>
                                                    {px.pdf_path && (
                                                        <button
                                                            onClick={() => handleDownloadPdf(px)}
                                                            className="rounded bg-blue-900/40 px-2 py-1 text-[10px] font-black text-blue-400 hover:bg-blue-900/60"
                                                        >
                                                            Baixar PDF
                                                        </button>
                                                    )}
                                                    {px.status !== 'void' && (
                                                        <button
                                                            onClick={() => handleVoid(px)}
                                                            className="rounded px-2 py-1 text-[10px] font-bold text-red-900 hover:text-red-500"
                                                        >
                                                            Anular
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </RxvCard>
            </div>

            {/* Modal de Preview */}
            {previewDoc && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                    <div className="flex max-h-[90vh] w-full max-w-4xl flex-col bg-slate-900 shadow-2xl rounded-2xl overflow-hidden border border-slate-800">
                        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
                            <div>
                                <h3 className="text-lg font-black text-white italic uppercase tracking-tight">Visualização da Receita</h3>
                                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Gerada em {formatDate(previewDoc.created_at)}</p>
                            </div>
                            <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-white">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#0c1a09]">
                            {/* Paper preview */}
                            <div className="mx-auto shadow-2xl bg-white">
                                <RxPrintView
                                    doc={previewDoc.content.printDoc}
                                    template={BUILTIN_TEMPLATES.find(t => t.id === previewDoc.content.templateId) || BUILTIN_TEMPLATES[0]}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-3 border-t border-slate-800 px-6 py-4 bg-slate-950">
                            <RxvButton variant="secondary" onClick={() => setPreviewDoc(null)}>
                                Fechar
                            </RxvButton>
                            <RxvButton variant="primary" onClick={() => handleExport(previewDoc)}>
                                Exportar PDF
                            </RxvButton>
                        </div>
                    </div>
                </div>
            )}
        </ReceituarioChrome>
    )
}
