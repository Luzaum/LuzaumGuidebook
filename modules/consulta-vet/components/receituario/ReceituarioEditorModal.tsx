import React, { useEffect, useMemo, useState } from 'react';
import { Calculator, ChevronDown, Copy, Download, FileCheck, FileText, PenLine, Printer, Save, Sparkles, X } from 'lucide-react';
import { useAuthSession } from '../../../../src/components/AuthSessionProvider';
import { useClinic } from '../../../../src/components/ClinicProvider';
import { issueGeneratedDocument, saveCustomTemplate, saveReceituarioDraft } from '../../services/receituarioService';
import type { DocumentTemplate, PrescriptionMedicationSnapshot, PrintIdentification, ReceituarioDocumentData, ReceituarioSpecies } from '../../types/receituario';
import { insertMedicationIntoPrescriptionText, normalizePrescriptionSpecies } from '../../utils/receituarioMedication';
import { buildDocumentPlainText, normalizeLegacyDocumentBody, sanitizeIssuedText } from '../../utils/receituarioDocument';
import { downloadReceituarioPdf } from '../../utils/receituarioPdf';
import { PrescriptionMedicationComposer } from './PrescriptionMedicationComposer';
import { PrintPreviewA4 } from './PrintPreviewA4';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  template?: DocumentTemplate | null;
  initialBodyText?: string;
  initialTitle?: string;
  documentType?: 'recipe' | 'term';
}

const EMPTY_IDENTIFICATION: PrintIdentification = {
  patientName: '', responsibleName: '', species: '', breed: '', sex: '', age: '', weightKg: '',
};

function Field({ label, value, onChange, type = 'text', placeholder }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string }) {
  return <label className="space-y-1.5"><span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>;
}

export function ReceituarioEditorModal({ isOpen, onClose, template, initialBodyText, initialTitle, documentType = 'recipe' }: Props) {
  const { user, profile } = useAuthSession();
  const { clinicId, clinicName } = useClinic();
  const [activeMobileTab, setActiveMobileTab] = useState<'edit' | 'preview'>('edit');
  const [workspace, setWorkspace] = useState<'text' | 'medication'>('text');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [identification, setIdentification] = useState<PrintIdentification>(EMPTY_IDENTIFICATION);
  const [identificationOpen, setIdentificationOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveModelOpen, setSaveModelOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState('');
  const [modelCategory, setModelCategory] = useState('Cuidados gerais');
  const [modelSpecies, setModelSpecies] = useState<ReceituarioSpecies>('ambos');
  const [prescriptionItems, setPrescriptionItems] = useState<PrescriptionMedicationSnapshot[]>([]);

  const metadata = user?.user_metadata || {};
  const header = useMemo(() => ({
    clinicName: clinicName || 'Clínica Veterinária',
    veterinarianName: profile?.name ? `Dr(a). ${profile.name}` : 'Médico-veterinário',
    crmv: String(metadata.crmv || metadata.professional_registry || metadata.veterinary_registry || ''),
    documentDate: new Date().toLocaleDateString('pt-BR'),
    location: '', time: '',
  }), [clinicName, metadata.crmv, metadata.professional_registry, metadata.veterinary_registry, profile?.name]);

  useEffect(() => {
    if (!isOpen) return;
    const nextTitle = initialTitle || template?.title || (documentType === 'recipe' ? 'Receita veterinária' : 'Documento veterinário');
    setTitle(nextTitle);
    setModelTitle(nextTitle);
    setModelCategory(template?.category || 'Cuidados gerais');
    setModelSpecies(template?.species || 'ambos');
    setBody(normalizeLegacyDocumentBody(initialBodyText || template?.body_plain_text || ''));
    setIdentification({ ...EMPTY_IDENTIFICATION, species: template?.species === 'cão' ? 'Cão' : template?.species === 'gato' ? 'Gato' : '' });
    setWorkspace(documentType === 'recipe' ? 'medication' : 'text');
    setActiveMobileTab('edit');
    setIdentificationOpen(false);
    setPrescriptionItems([]);
  }, [documentType, initialBodyText, initialTitle, isOpen, template]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add('receituario-editor-open');
    return () => document.body.classList.remove('receituario-editor-open');
  }, [isOpen]);

  const documentData: ReceituarioDocumentData = useMemo(() => ({
    title, documentType, identification, header, bodyPlainText: sanitizeIssuedText(body),
  }), [body, documentType, header, identification, title]);

  if (!isOpen) return null;
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 3000); };
  const updateIdentification = (key: keyof PrintIdentification, value: string) => setIdentification((current) => ({ ...current, [key]: value }));
  const handleInsert = (block: string, snapshot: PrescriptionMedicationSnapshot) => { setBody((current) => insertMedicationIntoPrescriptionText(current, block)); setPrescriptionItems((current) => [...current, snapshot]); setWorkspace('text'); notify('Medicamento inserido. Revise o documento antes de emitir.'); };
  const handleCopy = async () => { await navigator.clipboard.writeText(buildDocumentPlainText(documentData)); notify('Texto sem formatação copiado.'); };
  const handlePrint = () => { document.body.classList.add('receituario-printing'); window.addEventListener('afterprint', () => document.body.classList.remove('receituario-printing'), { once: true }); window.print(); };

  const handleDraft = async () => {
    setSaving(true);
    try { await saveReceituarioDraft({ clinicId, userId: user?.id, templateId: template?.id || null, document: documentData }); notify('Rascunho sincronizado.'); }
    catch (error) { notify(error instanceof Error ? error.message : 'Não foi possível salvar o rascunho.'); }
    finally { setSaving(false); }
  };

  const handleIssue = async () => {
    if (!user?.id) { notify('Entre na sua conta para salvar o documento.'); return; }
    setSaving(true);
    try {
      await issueGeneratedDocument({ title, document_type: documentType, body_plain_text: buildDocumentPlainText(documentData), structured_data: documentData, prescription_items: prescriptionItems, template_id: template?.id || null, clinic_id: clinicId || null, created_by: user.id });
      notify('Documento emitido e salvo na sua conta.');
    } catch (error) { notify(error instanceof Error ? error.message : 'Não foi possível emitir o documento.'); }
    finally { setSaving(false); }
  };

  const handleSaveModel = async () => {
    if (!modelTitle.trim() || !user?.id) { notify('Informe o título e entre na sua conta.'); return; }
    setSaving(true);
    try { await saveCustomTemplate({ title: modelTitle.trim(), category: modelCategory, document_type: documentType, species: modelSpecies, body_plain_text: sanitizeIssuedText(body), structured_defaults: { ...documentData, identification: EMPTY_IDENTIFICATION }, clinicId, userId: user.id }); setSaveModelOpen(false); notify('Modelo pessoal sincronizado.'); }
    catch (error) { notify(error instanceof Error ? error.message : 'Não foi possível salvar o modelo.'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/60 p-2 backdrop-blur-sm sm:p-4">
      {toast ? <div className="fixed right-5 top-5 z-[130] flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/95 px-4 py-3 text-sm text-emerald-100 shadow-2xl"><FileCheck className="h-4 w-4" />{toast}</div> : null}
      <div className="relative flex h-[calc(100dvh-1rem)] w-full max-w-[1500px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:h-[94vh]">
        <header className="flex min-h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-4 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><FileText className="h-5 w-5" /></span><input value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Título do documento" className="min-w-0 flex-1 bg-transparent text-base font-bold outline-none sm:text-lg" /></div>
          <div className="flex items-center gap-2"><div className="flex rounded-lg border border-border p-1 md:hidden"><button onClick={() => setActiveMobileTab('edit')} className={`min-h-9 rounded-md px-3 text-xs ${activeMobileTab === 'edit' ? 'bg-muted font-bold' : ''}`}>Editar</button><button onClick={() => setActiveMobileTab('preview')} className={`min-h-9 rounded-md px-3 text-xs ${activeMobileTab === 'preview' ? 'bg-muted font-bold' : ''}`}>Visualizar</button></div><button onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-xl border border-border" aria-label="Fechar"><X className="h-5 w-5" /></button></div>
        </header>

        <section className="shrink-0 border-b border-border bg-card/70 px-4 py-3 sm:px-6">
          <div className="grid items-end gap-3 sm:grid-cols-[150px_170px_1fr]">
            <label className="space-y-1.5"><span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Espécie</span><select value={normalizePrescriptionSpecies(identification.species) === 'dog' ? 'Cão' : normalizePrescriptionSpecies(identification.species) === 'cat' ? 'Gato' : ''} onChange={(event) => updateIdentification('species', event.target.value)} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"><option value="">Selecionar</option><option value="Cão">Cão</option><option value="Gato">Gato</option></select></label>
            <Field label="Peso para cálculo" type="number" value={identification.weightKg} onChange={(value) => updateIdentification('weightKg', value)} placeholder="Ex.: 4,5 kg" />
            <button type="button" onClick={() => setIdentificationOpen((open) => !open)} className="flex min-h-10 items-center justify-between rounded-xl border border-border bg-background px-3 text-left text-sm font-semibold"><span>Identificação para impressão <small className="ml-2 font-normal text-muted-foreground">opcional, sem cadastro</small></span><ChevronDown className={`h-4 w-4 transition-transform ${identificationOpen ? 'rotate-180' : ''}`} /></button>
          </div>
          {identificationOpen ? <div className="mt-4 grid gap-3 border-t border-border/70 pt-4 sm:grid-cols-2 lg:grid-cols-3"><Field label="Nome do paciente" value={identification.patientName} onChange={(value) => updateIdentification('patientName', value)} /><Field label="Responsável" value={identification.responsibleName} onChange={(value) => updateIdentification('responsibleName', value)} /><Field label="Raça" value={identification.breed} onChange={(value) => updateIdentification('breed', value)} /><Field label="Sexo" value={identification.sex} onChange={(value) => updateIdentification('sex', value)} /><Field label="Idade" value={identification.age} onChange={(value) => updateIdentification('age', value)} /></div> : null}
        </section>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <section className={`${activeMobileTab === 'edit' ? 'flex' : 'hidden md:flex'} min-w-0 flex-1 flex-col border-r border-border bg-card/30`}>
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 py-3"><div className="flex rounded-xl border border-border bg-muted/40 p-1"><button onClick={() => setWorkspace('text')} className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold ${workspace === 'text' ? 'bg-background shadow-sm' : ''}`}><PenLine className="h-3.5 w-3.5" />Editar texto</button>{documentType === 'recipe' ? <button onClick={() => setWorkspace('medication')} className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold ${workspace === 'medication' ? 'bg-primary text-primary-foreground shadow-sm' : ''}`}><Calculator className="h-3.5 w-3.5" />Adicionar medicamento</button> : null}</div><span className="hidden text-xs text-muted-foreground sm:block">Campos de identificação ficam separados do corpo</span></div>
            {workspace === 'medication' && documentType === 'recipe' ? <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5"><PrescriptionMedicationComposer clinicId={clinicId} species={identification.species} weightKg={identification.weightKg} onInsert={handleInsert} /></div> : <div className="flex min-h-0 flex-1 p-4 sm:p-5"><textarea value={body} onChange={(event) => setBody(event.target.value)} className="min-h-[360px] flex-1 resize-none rounded-xl border border-border bg-background p-4 font-mono text-sm leading-6 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" aria-label="Corpo editável do documento" placeholder="Digite o conteúdo clínico do documento." /></div>}
          </section>
          <section className={`${activeMobileTab === 'preview' ? 'flex' : 'hidden md:flex'} min-w-0 flex-1 overflow-y-auto bg-slate-200/70`}><PrintPreviewA4 document={documentData} /></section>
        </div>

        <footer className="relative z-10 flex shrink-0 flex-col gap-2 border-t border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div className="flex gap-2"><button onClick={handleCopy} className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-border px-3 text-xs font-semibold sm:flex-none"><Copy className="h-4 w-4 text-sky-500" />Copiar</button><button onClick={() => void handleDraft()} disabled={saving} className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-border px-3 text-xs font-semibold sm:flex-none"><Save className="h-4 w-4 text-amber-500" />Rascunho</button><button onClick={() => setSaveModelOpen(true)} className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-border px-3 text-xs font-semibold sm:flex-none"><Sparkles className="h-4 w-4 text-violet-500" />Meu modelo</button></div><div className="flex gap-2"><button onClick={handlePrint} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border sm:w-auto sm:px-3" aria-label="Imprimir"><Printer className="h-4 w-4" /><span className="ml-2 hidden text-xs sm:inline">Imprimir</span></button><button onClick={() => downloadReceituarioPdf(documentData)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border sm:w-auto sm:px-3" aria-label="Exportar PDF"><Download className="h-4 w-4 text-rose-500" /><span className="ml-2 hidden text-xs sm:inline">PDF</span></button><button onClick={() => void handleIssue()} disabled={saving} className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-xs font-bold text-white disabled:opacity-50 sm:flex-none"><FileCheck className="h-4 w-4" />{saving ? 'Salvando…' : 'Emitir e salvar'}</button></div></footer>
      </div>

      {saveModelOpen ? <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"><div className="w-full max-w-md space-y-4 rounded-2xl border border-border bg-background p-6 shadow-2xl"><h2 className="font-bold">Salvar como meu modelo</h2><Field label="Título" value={modelTitle} onChange={setModelTitle} /><label className="space-y-1.5"><span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Categoria</span><select value={modelCategory} onChange={(event) => setModelCategory(event.target.value)} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm">{['Gastroenterologia','Nefrologia e urologia','Endocrinologia','Cardiologia','Respiratório','Neurologia','Dermatologia','Oftalmologia','Infectologia','Dor e pós-operatório','Emergência','Cuidados gerais'].map((item) => <option key={item}>{item}</option>)}</select></label><label className="space-y-1.5"><span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Espécie</span><select value={modelSpecies} onChange={(event) => setModelSpecies(event.target.value as ReceituarioSpecies)} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"><option value="ambos">Cão e gato</option><option value="cão">Cão</option><option value="gato">Gato</option></select></label><div className="flex justify-end gap-2 pt-2"><button onClick={() => setSaveModelOpen(false)} className="min-h-10 rounded-lg border border-border px-4 text-xs font-semibold">Cancelar</button><button onClick={() => void handleSaveModel()} disabled={saving} className="min-h-10 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground">Salvar modelo</button></div></div></div> : null}
    </div>
  );
}
