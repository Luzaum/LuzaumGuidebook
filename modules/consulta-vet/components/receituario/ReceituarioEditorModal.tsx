import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Calculator, ChevronDown, Copy, Download, FileCheck, FileText, PenLine, Pill, Printer, Save, Sparkles, X } from 'lucide-react';
import { useAuthSession } from '../../../../src/components/AuthSessionProvider';
import { useClinic } from '../../../../src/components/ClinicProvider';
import { RECEITUARIO_CATEGORIES } from '../../data/receituarioSeed';
import { issueGeneratedDocument, saveCustomTemplate, saveReceituarioDraft } from '../../services/receituarioService';
import type { DocumentTemplate, PrescriptionMedicationSnapshot, PrintIdentification, ReceituarioDocumentData, ReceituarioSpecies, ClinicalMedicationOverride } from '../../types/receituario';
import { insertMedicationIntoPrescriptionText, normalizePrescriptionSpecies, removeMedicationFromPrescriptionText, updateMedicationInPrescriptionText } from '../../utils/receituarioMedication';
import { buildDocumentBodyPlainText, buildDocumentPlainText, normalizeLegacyDocumentBody, sanitizeIssuedText, stripTextSignatureSection } from '../../utils/receituarioDocument';
import { downloadReceituarioPdf } from '../../utils/receituarioPdf';
import { ensureEditableRecipeReturn, ensureRecipeClinicalWorseningNotice, normalizeRecipeListMarkers, stripPrescriptionTechnicalDetails } from '../../utils/receituarioTemplateCalculator';
import { resolveSelectedClinicalMedications, listClinicalMedicationsNeedingRegistration } from '../../utils/clinicalMedicationCatalogBridge';
import { getClinicalRecipeObservations, getDefaultClinicalOptionKeys } from '../../utils/receituarioClinicalModels';
import { ClinicalMedicationDosePanel } from './ClinicalMedicationDosePanel';
import { ClinicalRecipeObservations } from './ClinicalRecipeObservations';
import { ClinicalTemplateConfigurator } from './ClinicalTemplateConfigurator';
import { PrescriptionMedicationComposer } from './PrescriptionMedicationComposer';
import { PrintPreviewA4 } from './PrintPreviewA4';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  template?: DocumentTemplate | null;
  initialBodyText?: string;
  initialTitle?: string;
  documentType?: 'recipe' | 'term';
  initialIdentification?: Partial<PrintIdentification>;
}

const EMPTY_IDENTIFICATION: PrintIdentification = {
  patientName: '',
  responsibleName: '',
  responsibleCpf: '',
  species: 'cão',
  breed: '',
  sex: 'macho',
  age: '',
  weightKg: '',
  veterinarianName: '',
  crmv: '',
};

function Field({ label, value, onChange, type = 'text', placeholder }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string }) {
  return <label className="space-y-1.5"><span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>;
}

const FILL_PLACEHOLDER = 'A PREENCHER';

type EditorHighlight = 'plain' | 'placeholder' | 'clinical-dose' | 'dose-error';

function parseWeight(value?: string): number | null {
  const parsed = Number(String(value || '').replace(',', '.'));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function clinicalDoseHelp(line: string, weightKg?: string): { dose: string; calculation: string } {
  const content = line.replace(/^Dose clínica:\s*/i, '').replace(/[.\s]+$/, '').trim();
  const dose = content.split(/\s*\(/)[0]?.trim() || content;
  const weight = parseWeight(weightKg);
  const parenMatch = content.match(/\(([\d.,]+)\s*(mg|mcg|µg|mL|UI)\/(kg(?:\/dia)?|animal)\)/i);
  const inlineMatch = dose.match(/^([\d.,]+)\s*(mg|mcg|µg|mL|UI)\/(kg(?:\/dia)?|animal)/i);
  const match = parenMatch || inlineMatch;
  if (!match) {
    return { dose, calculation: dose.toLowerCase().includes('conforme') ? 'Dose definida manualmente ou pelo fabricante.' : 'Quantidade prática indicada no texto da prescrição.' };
  }
  if (match[3]?.toLowerCase() === 'animal') return { dose, calculation: 'Dose fixa por animal; não depende do peso.' };
  if (!weight) return { dose, calculation: 'Informe o peso do paciente para visualizar o cálculo.' };
  const perKg = Number(match[1].replace(',', '.'));
  const total = perKg * weight;
  const period = match[3]?.toLowerCase().includes('/dia') ? 'por dia' : 'por administração';
  return {
    dose,
    calculation: `${formatDoseHelpNumber(perKg)} ${match[2]}/kg × ${formatDoseHelpNumber(weight)} kg = ${formatDoseHelpNumber(total)} ${match[2]} ${period}.`,
  };
}

function formatDoseHelpNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 3 }).format(value);
}

function doseErrorHelp(fullText: string, lineStart: number): string {
  const lines = fullText.replace(/\r\n/g, '\n').split('\n');
  const lineIndex = fullText.slice(0, lineStart).split('\n').length - 1;
  const nextLine = lines[lineIndex + 1]?.trim() || '';
  const reasonMatch = nextLine.match(/^Erro de dose:\s*(.+)$/i);
  return reasonMatch?.[1]
    || 'A apresentação ou concentração escolhida não permite administrar a dose calculada com segurança.';
}

function HighlightedPlainTextEditor({ value, onChange, weightKg, highlightClinicalDoses = false }: { value: string; onChange: (value: string) => void; weightKg?: string; highlightClinicalDoses?: boolean }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [activeRange, setActiveRange] = useState<{ start: number; end: number } | null>(null);
  const [activeDose, setActiveDose] = useState<{ start: number; line: string; kind: 'clinical-dose' | 'dose-error' } | null>(null);
  const parts = useMemo(() => {
    const matches: Array<{ text: string; start: number; kind: Exclude<EditorHighlight, 'plain'> }> = [];
    for (const match of value.matchAll(new RegExp(FILL_PLACEHOLDER, 'gi'))) {
      matches.push({ text: match[0], start: match.index ?? 0, kind: 'placeholder' });
    }
    if (highlightClinicalDoses) {
      for (const match of value.matchAll(/^Dose clínica:\s*([^\n]*)/gim)) {
        const content = match[1]?.trim() || '';
        if (!content) continue;
        const start = (match.index ?? 0) + match[0].indexOf(content);
        matches.push({ text: content, start, kind: 'clinical-dose' });
      }
      for (const match of value.matchAll(/^Administrar ERRO DE DOSE P\/ CONCENTRAÇÃO[^\n]*/gim)) {
        matches.push({ text: match[0], start: match.index ?? 0, kind: 'dose-error' });
      }
    }
    matches.sort((left, right) => left.start - right.start);
    const result: Array<{ text: string; start: number; kind: EditorHighlight }> = [];
    let cursor = 0;
    for (const match of matches) {
      if (match.start < cursor) continue;
      if (match.start > cursor) result.push({ text: value.slice(cursor, match.start), start: cursor, kind: 'plain' });
      result.push(match);
      cursor = match.start + match.text.length;
    }
    if (cursor < value.length) result.push({ text: value.slice(cursor), start: cursor, kind: 'plain' });
    return result;
  }, [highlightClinicalDoses, value]);

  const selectPlaceholderAtCaret = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const caret = textarea.selectionStart;
    const expression = new RegExp(FILL_PLACEHOLDER, 'gi');
    for (const match of value.matchAll(expression)) {
      const start = match.index ?? 0;
      const end = start + match[0].length;
      if (caret >= start && caret <= end) {
        setActiveRange({ start, end });
        window.requestAnimationFrame(() => textarea.setSelectionRange(start, end));
        return;
      }
    }
    setActiveRange(null);
  };

  const activateDose = (start: number, line: string, kind: 'clinical-dose' | 'dose-error') => {
    setActiveDose({ start, line, kind });
  };

  const deactivateDose = (start: number) => {
    setActiveDose((current) => (current?.start === start ? null : current));
  };

  const doseHelp = activeDose?.kind === 'clinical-dose'
    ? clinicalDoseHelp(activeDose.line.startsWith('Dose clínica:') ? activeDose.line : `Dose clínica: ${activeDose.line}`, weightKg)
    : null;
  const doseErrorReason = activeDose?.kind === 'dose-error' ? doseErrorHelp(value, activeDose.start) : null;

  return (
    <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-xl border border-border bg-background">
      <div ref={highlightRef} className="pointer-events-none absolute inset-0 z-[2] box-border overflow-hidden whitespace-pre-wrap break-words border border-transparent p-4 font-mono text-sm leading-6 text-transparent">
        {parts.map((part) => {
          const isActive = activeRange?.start === part.start;
          if (part.kind === 'placeholder') {
            return <mark aria-hidden="true" key={`${part.start}-${part.text}`} className={isActive ? 'bg-transparent text-transparent' : 'rounded-sm bg-amber-300/75 text-transparent dark:bg-amber-500/35'}>{part.text}</mark>;
          }
          if (part.kind === 'clinical-dose') {
            return (
              <mark
                key={`${part.start}-${part.text}`}
                role="button"
                tabIndex={0}
                aria-label={`${part.text}. Mostrar cálculo da dose`}
                onMouseEnter={() => activateDose(part.start, part.text, 'clinical-dose')}
                onMouseLeave={() => deactivateDose(part.start)}
                onFocus={() => activateDose(part.start, part.text, 'clinical-dose')}
                onBlur={() => deactivateDose(part.start)}
                onClick={() => activateDose(part.start, part.text, 'clinical-dose')}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') activateDose(part.start, part.text, 'clinical-dose'); }}
                className="pointer-events-auto cursor-help rounded-sm bg-sky-200/60 text-transparent outline-none ring-offset-1 focus-visible:ring-2 focus-visible:ring-sky-600 dark:bg-sky-500/35"
              >{part.text}</mark>
            );
          }
          if (part.kind === 'dose-error') {
            return (
              <mark
                key={`${part.start}-${part.text}`}
                role="button"
                tabIndex={0}
                aria-label={`${part.text}. Mostrar motivo do erro de dose`}
                onMouseEnter={() => activateDose(part.start, part.text, 'dose-error')}
                onMouseLeave={() => deactivateDose(part.start)}
                onFocus={() => activateDose(part.start, part.text, 'dose-error')}
                onBlur={() => deactivateDose(part.start)}
                onClick={() => activateDose(part.start, part.text, 'dose-error')}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') activateDose(part.start, part.text, 'dose-error'); }}
                className="pointer-events-auto cursor-help rounded-sm bg-red-300/80 text-transparent outline-none ring-offset-1 focus-visible:ring-2 focus-visible:ring-red-600 dark:bg-red-700/50"
              >{part.text}</mark>
            );
          }
          return <span aria-hidden="true" key={`${part.start}-${part.text.slice(0, 8)}`}>{part.text}</span>;
        })}
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(event) => { setActiveRange(null); setActiveDose(null); onChange(event.target.value); }}
        onClick={() => {
          setActiveDose(null);
          selectPlaceholderAtCaret();
        }}
        onScroll={(event) => {
          if (!highlightRef.current) return;
          highlightRef.current.scrollTop = event.currentTarget.scrollTop;
          highlightRef.current.scrollLeft = event.currentTarget.scrollLeft;
        }}
        className="absolute inset-0 z-[1] box-border h-full w-full resize-none rounded-xl border border-border bg-transparent p-4 font-mono text-sm leading-6 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
        aria-label="Corpo editável do documento"
        placeholder="Digite o conteúdo clínico do documento."
      />
      {doseErrorReason ? (
        <aside className="pointer-events-none absolute inset-x-2 top-2 z-10 rounded-xl border border-red-400/80 bg-red-50/95 px-3 py-2 text-xs text-red-950 shadow-lg backdrop-blur dark:border-red-700 dark:bg-red-950/95 dark:text-red-50" aria-live="polite">
          <p><strong>Erro grave de dose / concentração</strong></p>
          <p className="mt-1">{doseErrorReason}</p>
        </aside>
      ) : null}
      {doseHelp ? (
        <aside className="pointer-events-none absolute inset-x-2 top-2 z-10 rounded-xl border border-sky-300/80 bg-sky-50/95 px-3 py-2 text-xs text-sky-950 shadow-lg backdrop-blur dark:border-sky-700 dark:bg-sky-950/95 dark:text-sky-100" aria-live="polite">
          <p><strong>Dose escolhida:</strong> {doseHelp.dose}</p>
          <p className="mt-1"><strong>Cálculo:</strong> {doseHelp.calculation}</p>
        </aside>
      ) : null}
    </div>
  );
}

export function ReceituarioEditorModal({ isOpen, onClose, template, initialBodyText, initialTitle, documentType = 'recipe', initialIdentification }: Props) {
  const { user, profile } = useAuthSession();
  const { clinicId, clinicName } = useClinic();
  const [activeMobileTab, setActiveMobileTab] = useState<'edit' | 'preview'>('edit');
  const [workspace, setWorkspace] = useState<'text' | 'clinical-medications' | 'medication'>('text');
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
  const [savedPersonalTemplateId, setSavedPersonalTemplateId] = useState<string | null>(null);
  const [prescriptionItems, setPrescriptionItems] = useState<PrescriptionMedicationSnapshot[]>([]);
  const [editingSnapshot, setEditingSnapshot] = useState<PrescriptionMedicationSnapshot | null>(null);
  const [clinicalSelectedKeys, setClinicalSelectedKeys] = useState<string[]>([]);
  const [clinicalDoseAlternativeKeys, setClinicalDoseAlternativeKeys] = useState<Record<string, string>>({});
  const [clinicalMedicationOverrides, setClinicalMedicationOverrides] = useState<Record<string, ClinicalMedicationOverride>>({});
  const editorInitializedRef = useRef(false);
  const prescriptionItemsRef = useRef<PrescriptionMedicationSnapshot[]>([]);
  const clinicalModel = template?.structured_defaults?.clinical_model;

  const metadata = user?.user_metadata || {};
  const header = useMemo(() => ({
    clinicName: clinicName || 'Clínica Veterinária',
    veterinarianName: profile?.name ? `M.V. ${profile.name}` : 'Médico-veterinário',
    crmv: String(metadata.crmv || metadata.professional_registry || metadata.veterinary_registry || ''),
    documentDate: new Date().toLocaleDateString('pt-BR'),
    location: '', time: '',
  }), [clinicName, metadata.crmv, metadata.professional_registry, metadata.veterinary_registry, profile?.name]);

  useEffect(() => {
    if (!isOpen) {
      editorInitializedRef.current = false;
      return;
    }
    if (editorInitializedRef.current) return;
    editorInitializedRef.current = true;
    const nextTitle = initialTitle || template?.title || (documentType === 'recipe' ? 'Receita veterinária' : 'Documento veterinário');
    setTitle(nextTitle);
    setModelTitle(nextTitle);
    setModelCategory(template?.category || 'Cuidados gerais');
    setModelSpecies(template?.species || 'ambos');
    setSavedPersonalTemplateId(template && !template.is_global ? template.id : null);
    const normalizedBody = normalizeLegacyDocumentBody(initialBodyText || template?.body_plain_text || '');
    const editableBody = documentType === 'recipe' ? ensureEditableRecipeReturn(normalizedBody) : normalizedBody;
    setBody(documentType === 'term' ? stripTextSignatureSection(editableBody) : editableBody);
    setIdentification({
      ...EMPTY_IDENTIFICATION,
      species: template?.species === 'cão' ? 'Cão' : template?.species === 'gato' ? 'Gato' : '',
      veterinarianName: header.veterinarianName === 'Médico-veterinário' ? '' : header.veterinarianName,
      crmv: header.crmv,
      ...initialIdentification,
    });
    setWorkspace('text');
    setActiveMobileTab('edit');
    setIdentificationOpen(false);
    setPrescriptionItems([]);
    prescriptionItemsRef.current = [];
    setEditingSnapshot(null);
    setClinicalSelectedKeys(clinicalModel ? getDefaultClinicalOptionKeys(clinicalModel) : []);
    setClinicalDoseAlternativeKeys({});
    setClinicalMedicationOverrides({});
  }, [clinicalModel, documentType, header.crmv, header.veterinarianName, initialBodyText, initialIdentification, initialTitle, isOpen, template]);

  useEffect(() => {
    prescriptionItemsRef.current = prescriptionItems;
  }, [prescriptionItems]);

  const handleClinicalBodyChange = useCallback((nextClinicalBody: string) => {
    const bodyWithAddedMedications = prescriptionItemsRef.current.reduce(
      (current, item) => item.rawBlockText
        ? insertMedicationIntoPrescriptionText(current, item.rawBlockText)
        : current,
      nextClinicalBody,
    );
    setBody(bodyWithAddedMedications);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add('receituario-editor-open');
    return () => document.body.classList.remove('receituario-editor-open');
  }, [isOpen]);

  const documentData: ReceituarioDocumentData = useMemo(() => ({
    title,
    documentType,
    identification,
    header: {
      ...header,
      veterinarianName: identification.veterinarianName?.trim() || header.veterinarianName,
      crmv: identification.crmv?.trim() || header.crmv,
    },
    bodyPlainText: documentType === 'recipe'
      ? ensureRecipeClinicalWorseningNotice(normalizeRecipeListMarkers(stripPrescriptionTechnicalDetails(sanitizeIssuedText(body))))
      : sanitizeIssuedText(body),
  }), [body, documentType, header, identification, title]);

  const selectedClinicalMedications = useMemo(() => (
    clinicalModel ? resolveSelectedClinicalMedications(clinicalModel, clinicalSelectedKeys) : []
  ), [clinicalModel, clinicalSelectedKeys]);

  const clinicalRecipeObservations = useMemo(() => (
    clinicalModel ? getClinicalRecipeObservations(clinicalModel, clinicalSelectedKeys) : []
  ), [clinicalModel, clinicalSelectedKeys]);

  const missingClinicalCatalog = useMemo(() => (
    selectedClinicalMedications.length
      ? listClinicalMedicationsNeedingRegistration(selectedClinicalMedications, identification.species, clinicalDoseAlternativeKeys)
      : []
  ), [clinicalDoseAlternativeKeys, identification.species, selectedClinicalMedications]);

  const showClinicalMedicationEditor = Boolean(clinicalModel && selectedClinicalMedications.length);

  if (!isOpen) return null;
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 3000); };
  const updateIdentification = (key: keyof PrintIdentification, value: string) => setIdentification((current) => ({ ...current, [key]: value }));
  const handleInsert = (block: string, snapshot: PrescriptionMedicationSnapshot) => {
    const editableBlock = sanitizeIssuedText(block);
    setBody((current) => insertMedicationIntoPrescriptionText(current, editableBlock));
    const nextItems = [...prescriptionItemsRef.current, { ...snapshot, rawBlockText: snapshot.rawBlockText || editableBlock }];
    prescriptionItemsRef.current = nextItems;
    setPrescriptionItems(nextItems);
    setWorkspace('text');
    notify('Medicamento inserido. Revise o documento antes de emitir.');
  };
  const handleEditMedication = (snapshot: PrescriptionMedicationSnapshot) => {
    setEditingSnapshot(snapshot);
    setWorkspace('medication');
  };
  const handleRemoveMedication = (snapshot: PrescriptionMedicationSnapshot) => {
    setBody((current) => removeMedicationFromPrescriptionText(current, snapshot.rawBlockText || snapshot.medicationName));
    const nextItems = prescriptionItemsRef.current.filter((item) => item !== snapshot);
    prescriptionItemsRef.current = nextItems;
    setPrescriptionItems(nextItems);
    if (editingSnapshot === snapshot) setEditingSnapshot(null);
    notify('Medicamento removido da receita.');
  };
  const handleUpdateMedication = (
    oldBlockText: string,
    newBlockText: string,
    updatedSnapshot: PrescriptionMedicationSnapshot,
  ) => {
    setBody((current) => updateMedicationInPrescriptionText(current, oldBlockText, sanitizeIssuedText(newBlockText)));
    const nextItems = prescriptionItemsRef.current.map((item) => (
      item === editingSnapshot || item.rawBlockText === oldBlockText
        ? { ...updatedSnapshot, rawBlockText: updatedSnapshot.rawBlockText || sanitizeIssuedText(newBlockText) }
        : item
    ));
    prescriptionItemsRef.current = nextItems;
    setPrescriptionItems(nextItems);
    setEditingSnapshot(null);
    setWorkspace('text');
    notify('Medicamento atualizado. Revise o documento antes de emitir.');
  };
  const handleCopyContent = async () => {
    await navigator.clipboard.writeText(buildDocumentBodyPlainText(documentData));
    notify('Conteúdo da receita copiado sem identificação.');
  };
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
    try {
      const editableModelBody = documentType === 'recipe' ? sanitizeIssuedText(body) : documentData.bodyPlainText;
      const savedTemplate = await saveCustomTemplate({ templateId: savedPersonalTemplateId, title: modelTitle.trim(), category: modelCategory, document_type: documentType, species: modelSpecies, body_plain_text: editableModelBody, structured_defaults: { ...documentData, bodyPlainText: editableModelBody, identification: EMPTY_IDENTIFICATION }, clinicId, userId: user.id });
      setSavedPersonalTemplateId(savedTemplate.id);
      setSaveModelOpen(false);
      notify(savedPersonalTemplateId ? 'Modelo pessoal atualizado.' : 'Modelo pessoal criado.');
    }
    catch (error) { notify(error instanceof Error ? error.message : 'Não foi possível salvar o modelo.'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/60 p-2 backdrop-blur-sm sm:p-4">
      {toast ? <div className="fixed right-5 top-5 z-[130] flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/95 px-4 py-3 text-sm text-emerald-100 shadow-2xl"><FileCheck className="h-4 w-4" />{toast}</div> : null}
      <div className="relative flex h-[calc(100dvh-1rem)] w-full max-w-[1500px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:h-[94vh]">
        <header className="flex min-h-16 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border bg-card px-4 py-2 sm:flex-nowrap sm:gap-3 sm:px-6 sm:py-0">
          <div className="flex min-w-0 flex-1 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><FileText className="h-5 w-5" /></span><input value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Título do documento" className="min-w-0 flex-1 bg-transparent text-base font-bold outline-none sm:text-lg" /></div>
          <button onClick={onClose} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border" aria-label="Fechar"><X className="h-5 w-5" /></button>
          <div className="order-last grid w-full grid-cols-2 rounded-lg border border-border p-1 md:hidden"><button onClick={() => setActiveMobileTab('edit')} className={`min-h-11 rounded-md px-3 text-xs ${activeMobileTab === 'edit' ? 'bg-muted font-bold' : ''}`}>Editar</button><button onClick={() => setActiveMobileTab('preview')} className={`min-h-11 rounded-md px-3 text-xs ${activeMobileTab === 'preview' ? 'bg-muted font-bold' : ''}`}>Visualizar</button></div>
        </header>

        <section className="shrink-0 border-b border-border bg-card/70 px-4 py-3 sm:px-6">
          <div className="grid items-end gap-3 sm:grid-cols-[150px_170px_1fr]">
            <label className="space-y-1.5"><span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Espécie</span><select value={normalizePrescriptionSpecies(identification.species) === 'dog' ? 'Cão' : normalizePrescriptionSpecies(identification.species) === 'cat' ? 'Gato' : ''} onChange={(event) => updateIdentification('species', event.target.value)} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"><option value="">Selecionar</option><option value="Cão">Cão</option><option value="Gato">Gato</option></select></label>
            <Field label="Peso para cálculo" type="number" value={identification.weightKg} onChange={(value) => updateIdentification('weightKg', value)} placeholder="Ex.: 4,5 kg" />
            <button type="button" onClick={() => setIdentificationOpen((open) => !open)} className="flex min-h-10 items-center justify-between rounded-xl border border-border bg-background px-3 text-left text-sm font-semibold"><span>Identificação para impressão <small className="ml-2 font-normal text-muted-foreground">opcional, sem cadastro</small></span><ChevronDown className={`h-4 w-4 transition-transform ${identificationOpen ? 'rotate-180' : ''}`} /></button>
          </div>
          {identificationOpen ? (
            <div className="mt-4 space-y-4 border-t border-border/70 pt-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Nome do paciente" value={identification.patientName} onChange={(value) => updateIdentification('patientName', value)} />
                <Field label="Responsável pelo animal" value={identification.responsibleName} onChange={(value) => updateIdentification('responsibleName', value)} />
                {documentType === 'term' ? <Field label="CPF do responsável" value={identification.responsibleCpf || ''} onChange={(value) => updateIdentification('responsibleCpf', value)} /> : null}
                <Field label="Raça" value={identification.breed} onChange={(value) => updateIdentification('breed', value)} />
                <Field label="Sexo" value={identification.sex} onChange={(value) => updateIdentification('sex', value)} />
                <Field label="Idade" value={identification.age} onChange={(value) => updateIdentification('age', value)} />
              </div>

              <div className="grid gap-3 rounded-xl border border-border/70 bg-muted/25 p-3 sm:grid-cols-2">
                <Field label="Nome do médico-veterinário" value={identification.veterinarianName || ''} onChange={(value) => updateIdentification('veterinarianName', value)} />
                <Field label="CRMV" value={identification.crmv || ''} onChange={(value) => updateIdentification('crmv', value)} />
              </div>

              {documentType === 'term' ? (
                <div className="grid gap-3 rounded-xl border border-border/70 bg-muted/25 p-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Field label="Nome da testemunha 1" value={identification.witness1Name || ''} onChange={(value) => updateIdentification('witness1Name', value)} />
                  <Field label="CPF da testemunha 1" value={identification.witness1Cpf || ''} onChange={(value) => updateIdentification('witness1Cpf', value)} />
                  <Field label="Nome da testemunha 2" value={identification.witness2Name || ''} onChange={(value) => updateIdentification('witness2Name', value)} />
                  <Field label="CPF da testemunha 2" value={identification.witness2Cpf || ''} onChange={(value) => updateIdentification('witness2Cpf', value)} />
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <section className={`${activeMobileTab === 'edit' ? 'flex' : 'hidden md:flex'} min-h-0 min-w-0 flex-1 flex-col overflow-y-auto border-r border-border bg-card/30`}>
            {clinicalModel ? (
              <ClinicalTemplateConfigurator
                model={clinicalModel}
                weightKg={identification.weightKg}
                species={identification.species}
                selectedKeys={clinicalSelectedKeys}
                onSelectedKeysChange={setClinicalSelectedKeys}
                doseAlternativeKeys={clinicalDoseAlternativeKeys}
                onDoseAlternativeKeysChange={setClinicalDoseAlternativeKeys}
                medicationOverrides={clinicalMedicationOverrides}
                onMedicationOverridesChange={setClinicalMedicationOverrides}
                onBodyChange={handleClinicalBodyChange}
              />
            ) : null}
            <div className="sticky top-0 z-10 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
              <div className="flex flex-wrap rounded-xl border border-border bg-muted/40 p-1">
                <button type="button" onClick={() => setWorkspace('text')} className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold ${workspace === 'text' ? 'bg-background shadow-sm' : ''}`}>
                  <PenLine className="h-3.5 w-3.5" />Editar texto
                </button>
                {showClinicalMedicationEditor ? (
                  <button type="button" onClick={() => setWorkspace('clinical-medications')} className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold ${workspace === 'clinical-medications' ? 'bg-background shadow-sm' : ''}`}>
                    <Pill className="h-3.5 w-3.5" />Edição de medicamentos
                  </button>
                ) : null}
                {documentType === 'recipe' ? (
                  <button type="button" onClick={() => setWorkspace('medication')} className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold ${workspace === 'medication' ? 'bg-primary text-primary-foreground shadow-sm' : ''}`}>
                    <Calculator className="h-3.5 w-3.5" />{prescriptionItems.length ? 'Adicionar / editar medicamentos' : 'Adicionar medicamento'}
                  </button>
                ) : null}
              </div>
              <span className="hidden text-xs text-muted-foreground sm:block">Campos de identificação ficam separados do corpo</span>
            </div>
            {workspace === 'clinical-medications' && showClinicalMedicationEditor ? (
              <div className="min-h-[min(480px,52vh)] space-y-4 p-4 sm:p-5">
                <p className="text-xs text-muted-foreground">
                  Ajuste apresentações, doses e confira as faixas indicadas. Alertas em vermelho intenso indicam sobredose grave (a receita mostrará ERRO DE DOSE P/ CONCENTRAÇÃO); em laranja, subdose ou sobredose leve.
                  {missingClinicalCatalog.length ? (
                    <>
                      {' '}Medicamentos em roxo precisam ser cadastrados no ConsultaVet antes de habilitar a edição automática.
                    </>
                  ) : null}
                </p>
                <ClinicalMedicationDosePanel
                  medications={selectedClinicalMedications}
                  species={identification.species}
                  weightKg={identification.weightKg}
                  doseAlternativeKeys={clinicalDoseAlternativeKeys}
                  overrides={clinicalMedicationOverrides}
                  onOverridesChange={setClinicalMedicationOverrides}
                />
                <ClinicalRecipeObservations notes={clinicalRecipeObservations} />
              </div>
            ) : workspace === 'medication' && documentType === 'recipe' ? (
              <div className="min-h-[min(480px,52vh)] p-4 sm:p-5">
                <PrescriptionMedicationComposer
                  clinicId={clinicId}
                  species={identification.species}
                  weightKg={identification.weightKg}
                  onInsert={handleInsert}
                  editingSnapshot={editingSnapshot}
                  onUpdate={handleUpdateMedication}
                  onCancelEdit={() => { setEditingSnapshot(null); setWorkspace('text'); }}
                  addedSnapshots={prescriptionItems}
                  onEditSnapshot={handleEditMedication}
                  onRemoveSnapshot={handleRemoveMedication}
                />
              </div>
            ) : (
              <div className="flex min-h-[min(480px,52vh)] flex-col gap-2 p-4 sm:p-5">
                {documentType === 'term' ? <p className="shrink-0 rounded-lg border border-sky-500/20 bg-sky-500/10 px-3 py-2 text-xs text-sky-800">As assinaturas são organizadas automaticamente em quatro quadros no PDF e na impressão.</p> : null}
                {documentType === 'recipe' && prescriptionItems.length > 0 ? (
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/80 bg-muted/40 p-3 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">Medicamentos adicionados ({prescriptionItems.length}):</span>
                      {prescriptionItems.map((item, index) => (
                        <div key={`${item.medicationId}-${index}`} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs">
                          <span className="font-semibold">{item.medicationName}</span>
                          <button type="button" onClick={() => handleEditMedication(item)} className="font-medium text-sky-600 hover:underline dark:text-sky-400">Editar</button>
                          <button type="button" onClick={() => handleRemoveMedication(item)} className="text-rose-600 hover:text-rose-800 dark:text-rose-400">×</button>
                        </div>
                      ))}
                    </div>
                    <button type="button" onClick={() => { setEditingSnapshot(null); setWorkspace('medication'); }} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                      + Adicionar outro
                    </button>
                  </div>
                ) : null}
                {/A PREENCHER/i.test(body) ? <p className="shrink-0 text-xs text-amber-700 dark:text-amber-300">Os campos destacados precisam ser preenchidos. Clique sobre “A PREENCHER” para substituí-lo.</p> : null}
                {documentType === 'recipe' && /^Dose clínica:/im.test(body) ? <p className="shrink-0 text-xs text-sky-700 dark:text-sky-300">As doses em azul são apoio clínico e não aparecem na receita final. Passe o mouse para ver o cálculo da dose escolhida.</p> : null}
                {documentType === 'recipe' && /ERRO DE DOSE P\/ CONCENTRAÇÃO/i.test(body) ? <p className="shrink-0 text-xs text-red-700 dark:text-red-300">Trechos em vermelho indicam erro grave de dose/concentração. Passe o mouse para ver o motivo; corrija na aba Edição de medicamentos.</p> : null}
                <HighlightedPlainTextEditor value={body} onChange={setBody} weightKg={identification.weightKg} highlightClinicalDoses={documentType === 'recipe'} />
              </div>
            )}
          </section>
          <section className={`${activeMobileTab === 'preview' ? 'flex' : 'hidden md:flex'} min-w-0 flex-1 overflow-y-auto bg-slate-200/70`}><PrintPreviewA4 document={documentData} /></section>
        </div>

        <footer className="relative z-10 flex shrink-0 flex-col gap-2 border-t border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex gap-2">
            <button onClick={() => void handleDraft()} disabled={saving} className="inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-3 text-xs font-semibold transition-colors hover:bg-muted sm:flex-none"><Save className="h-4 w-4 text-amber-500" />Rascunho</button>
            <button onClick={() => setSaveModelOpen(true)} className="inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-3 text-xs font-semibold transition-colors hover:bg-muted sm:flex-none"><Sparkles className="h-4 w-4 text-violet-500" />{savedPersonalTemplateId ? 'Atualizar modelo' : 'Salvar modelo próprio'}</button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => void handleCopyContent()} className="inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-3 text-xs font-semibold transition-colors hover:bg-muted sm:flex-none" aria-label="Copiar somente o conteúdo da receita"><Copy className="h-4 w-4 text-sky-500" />Copiar conteúdo</button>
            <button onClick={handlePrint} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted sm:w-auto sm:px-3" aria-label="Imprimir"><Printer className="h-4 w-4" /><span className="ml-2 hidden text-xs sm:inline">Imprimir</span></button>
            <button onClick={() => downloadReceituarioPdf(documentData)} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted sm:w-auto sm:px-3" aria-label="Exportar PDF"><Download className="h-4 w-4 text-rose-500" /><span className="ml-2 hidden text-xs sm:inline">PDF</span></button>
            <button onClick={() => void handleIssue()} disabled={saving} className="inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-xs font-bold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"><FileCheck className="h-4 w-4" />{saving ? 'Salvando…' : 'Emitir e salvar'}</button>
          </div>
        </footer>
      </div>

      {saveModelOpen ? <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"><div className="w-full max-w-md space-y-4 rounded-2xl border border-border bg-background p-6 shadow-2xl"><h2 className="font-bold">{savedPersonalTemplateId ? 'Atualizar modelo pessoal' : 'Salvar modelo próprio'}</h2><Field label="Título" value={modelTitle} onChange={setModelTitle} /><label className="space-y-1.5"><span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Categoria</span><select value={modelCategory} onChange={(event) => setModelCategory(event.target.value)} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm">{RECEITUARIO_CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select></label><label className="space-y-1.5"><span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Espécie</span><select value={modelSpecies} onChange={(event) => setModelSpecies(event.target.value as ReceituarioSpecies)} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"><option value="ambos">Cão e gato</option><option value="cão">Cão</option><option value="gato">Gato</option></select></label><div className="flex justify-end gap-2 pt-2"><button onClick={() => setSaveModelOpen(false)} className="min-h-10 rounded-lg border border-border px-4 text-xs font-semibold">Cancelar</button><button onClick={() => void handleSaveModel()} disabled={saving} className="min-h-10 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground">{saving ? 'Salvando…' : savedPersonalTemplateId ? 'Atualizar modelo' : 'Salvar modelo próprio'}</button></div></div></div> : null}
    </div>
  );
}
