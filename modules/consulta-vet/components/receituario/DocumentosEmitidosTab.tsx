import React, { useRef, useState } from 'react';
import {
  Copy,
  Download,
  Eye,
  FileCheck,
  FileText,
  Paperclip,
  Printer,
  Search,
  Upload,
  X,
} from 'lucide-react';
import { uploadSignedCopy } from '../../services/receituarioService';
import { GeneratedDocument, ReceituarioDocumentData } from '../../types/receituario';
import { downloadReceituarioPdf } from '../../utils/receituarioPdf';
import { PrintPreviewA4 } from './PrintPreviewA4';

interface DocumentosEmitidosTabProps {
  documents: GeneratedDocument[];
  onOpenAsNewCopy: (doc: GeneratedDocument) => void;
  onRefreshDocs: () => void;
  clinicId?: string | null;
  userId?: string | null;
}

export function DocumentosEmitidosTab({
  documents,
  onOpenAsNewCopy,
  onRefreshDocs,
  clinicId,
  userId,
}: DocumentosEmitidosTabProps) {
  const [search, setSearch] = useState('');
  const [viewingDoc, setViewingDoc] = useState<GeneratedDocument | null>(null);
  const [uploadingDocId, setUploadingDocId] = useState<string | null>(null);
  const [uploadFeedback, setUploadFeedback] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredDocs = documents.filter((doc) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    return (
      doc.title.toLowerCase().includes(query) ||
      (doc.patient_name && doc.patient_name.toLowerCase().includes(query)) ||
      (doc.responsible_name && doc.responsible_name.toLowerCase().includes(query)) ||
      doc.body_plain_text.toLowerCase().includes(query)
    );
  });

  const handlePrintDoc = (doc: GeneratedDocument) => {
    setViewingDoc(doc);
    setTimeout(() => {
      const cleanup = () => document.body.classList.remove('receituario-printing');
      document.body.classList.add('receituario-printing');
      window.addEventListener('afterprint', cleanup, { once: true });
      window.print();
      window.setTimeout(cleanup, 3000);
    }, 300);
  };

  const toDocumentData = (docItem: GeneratedDocument): ReceituarioDocumentData => docItem.structured_data || {
    title: docItem.title,
    documentType: docItem.document_type,
    identification: {
      patientName: docItem.patient_name || '',
      responsibleName: docItem.responsible_name || '',
      species: '', breed: '', sex: '', age: '', weightKg: '',
    },
    header: {
      clinicName: 'Clínica Veterinária',
      veterinarianName: docItem.veterinarian_name || 'Médico-veterinário',
      crmv: '',
      documentDate: new Date(docItem.issued_at).toLocaleDateString('pt-BR'),
      location: '', time: '',
    },
    bodyPlainText: docItem.body_plain_text,
  };

  const handleExportPDF = (docItem: GeneratedDocument) => downloadReceituarioPdf(toDocumentData(docItem));

  // Upload signed copy handler
  const handleTriggerUpload = (docId: string) => {
    setUploadingDocId(docId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingDocId) return;

    try {
      await uploadSignedCopy({ documentId: uploadingDocId, file, clinicId, userId });
      setUploadFeedback({ tone: 'success', message: 'Cópia assinada anexada com segurança.' });
      onRefreshDocs();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível anexar a cópia assinada.';
      setUploadFeedback({ tone: 'error', message });
    } finally {
      setUploadingDocId(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search File Upload Reference */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,.pdf"
        className="hidden"
      />

      {uploadFeedback ? (
        <div
          className={`rounded-xl border px-4 py-3 text-xs ${
            uploadFeedback.tone === 'success'
              ? 'border-emerald-500/25 bg-emerald-500/[0.06] text-emerald-700 dark:text-emerald-200'
              : 'border-rose-500/25 bg-rose-500/[0.06] text-rose-700 dark:text-rose-200'
          }`}
          role="status"
        >
          {uploadFeedback.message}
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-border/80 bg-card/60 p-4 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar nos documentos emitidos (paciente, título, tutor...)"
            className="w-full rounded-xl border border-border/80 bg-background py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none"
          />
        </div>

        <div className="text-xs text-muted-foreground shrink-0">
          Total emitidos: <strong className="text-foreground">{documents.length}</strong>
        </div>
      </div>

      {/* List of Issued Documents */}
      {filteredDocs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          <FileCheck className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
          <p className="text-sm font-medium text-foreground">Nenhum documento emitido encontrado.</p>
          <p className="text-xs text-muted-foreground mt-1">
            Documentos e receitas salvos no prontuário aparecerão automaticamente nesta lista.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-border/80 bg-card p-4 shadow-sm hover:border-primary/40 transition-colors"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary shrink-0" />
                  <h3 className="text-sm font-semibold text-foreground truncate">{doc.title}</h3>
                  <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
                    Emitido
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  {doc.patient_name && (
                    <span>
                      Paciente: <strong className="text-foreground">{doc.patient_name}</strong>
                    </span>
                  )}
                  {doc.responsible_name && <span>Tutor: {doc.responsible_name}</span>}
                  <span>Data: {new Date(doc.issued_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-border/50">
                {/* Visualizar */}
                <button
                  type="button"
                  onClick={() => setViewingDoc(doc)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-colors"
                  title="Visualizar documento impresso"
                >
                  <Eye className="h-3.5 w-3.5 text-sky-500" />
                  <span>Ver</span>
                </button>

                {/* Imprimir */}
                <button
                  type="button"
                  onClick={() => handlePrintDoc(doc)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-colors"
                  title="Imprimir novamente"
                >
                  <Printer className="h-3.5 w-3.5 text-slate-500" />
                  <span>Imprimir</span>
                </button>

                {/* Exportar PDF */}
                <button
                  type="button"
                  onClick={() => handleExportPDF(doc)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-colors"
                  title="Exportar PDF novamente"
                >
                  <Download className="h-3.5 w-3.5 text-rose-500" />
                  <span>PDF</span>
                </button>

                {/* Anexar cópia assinada */}
                <button
                  type="button"
                  onClick={() => handleTriggerUpload(doc.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    doc.signed_copy_storage_path
                      ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'border-border bg-background hover:bg-muted text-muted-foreground'
                  }`}
                  title="Anexar cópia digitalizada/assinada pelo tutor"
                >
                  <Paperclip className="h-3.5 w-3.5" />
                  <span>{doc.signed_copy_storage_path ? 'Anexo Assinado' : 'Anexar Assinado'}</span>
                </button>

                {/* Modificar / Criar nova cópia */}
                <button
                  type="button"
                  onClick={() => onOpenAsNewCopy(doc)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                  title="Abrir como nova cópia editável"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Gerar nova cópia</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Document View Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative flex h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">
            <div className="flex h-14 items-center justify-between border-b border-border bg-muted/40 px-6">
              <h3 className="text-base font-semibold text-foreground">{viewingDoc.title}</h3>
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Fechar visualização do documento"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-muted/40 p-4">
              <PrintPreviewA4 document={toDocumentData(viewingDoc)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
