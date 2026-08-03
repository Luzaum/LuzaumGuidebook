import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Cat, Dog, FileCheck, FileSignature, Pill, Plus, Scale, Star, UserCheck, X } from 'lucide-react';
import { useAuthSession } from '../../../src/components/AuthSessionProvider';
import { useClinic } from '../../../src/components/ClinicProvider';
import { DocumentosEmitidosTab } from '../components/receituario/DocumentosEmitidosTab';
import { MeusModelosTab } from '../components/receituario/MeusModelosTab';
import { ModelosFavoritosTab } from '../components/receituario/ModelosFavoritosTab';
import { ReceitasTab } from '../components/receituario/ReceitasTab';
import { ReceituarioEditorModal } from '../components/receituario/ReceituarioEditorModal';
import { TermosTab } from '../components/receituario/TermosTab';
import {
  deleteCustomTemplate,
  deleteCustomTemplates,
  fetchAllTemplates,
  fetchFavorites,
  fetchIssuedDocuments,
  getLocalRecents,
  trackRecentlyUsedTemplate,
  toggleFavorite,
} from '../services/receituarioService';
import { DocumentTemplate, GeneratedDocument, PrintIdentification, ReceituarioSpecies } from '../types/receituario';
import { parsePositiveDecimal } from '../utils/receituarioMedication';
import { calculateTemplateDosesByWeight } from '../utils/receituarioTemplateCalculator';

type TabKey = 'receitas' | 'termos' | 'meus-modelos' | 'favoritos' | 'emitidos';
type PatientSpecies = Exclude<ReceituarioSpecies, 'ambos'>;

export function ReceituarioPage() {
  const { user } = useAuthSession();
  const { clinicId } = useClinic();

  const [activeTab, setActiveTab] = useState<TabKey>('receitas');

  // Data state
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  const [issuedDocs, setIssuedDocs] = useState<GeneratedDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // Editor Modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorTemplate, setEditorTemplate] = useState<DocumentTemplate | null>(null);
  const [editorInitialBodyText, setEditorInitialBodyText] = useState<string | undefined>(undefined);
  const [editorInitialTitle, setEditorInitialTitle] = useState<string | undefined>(undefined);
  const [editorDocType, setEditorDocType] = useState<'recipe' | 'term'>('recipe');
  const [editorInitialIdentification, setEditorInitialIdentification] = useState<Partial<PrintIdentification>>({});
  const [pendingTemplate, setPendingTemplate] = useState<DocumentTemplate | null>(null);
  const [setupStep, setSetupStep] = useState<'species' | 'weight'>('species');
  const [setupSpecies, setSetupSpecies] = useState<PatientSpecies | null>(null);
  const [setupWeight, setSetupWeight] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [allTemplates, favsList, docsList] = await Promise.all([
        fetchAllTemplates(clinicId, user?.id),
        fetchFavorites(user?.id),
        fetchIssuedDocuments(clinicId, user?.id),
      ]);

      setTemplates(allTemplates);
      setFavorites(favsList);
      setIssuedDocs(docsList);
      setRecents(getLocalRecents());
    } catch (err) {
      console.error('Error loading receituario data:', err);
    } finally {
      setLoading(false);
    }
  }, [clinicId, user?.id]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  // Favorite toggle
  const handleToggleFavorite = async (templateId: string) => {
    const isNowFav = await toggleFavorite(templateId, user?.id);
    setFavorites((prev) =>
      isNowFav ? [...prev, templateId] : prev.filter((id) => id !== templateId)
    );
  };

  // Delete custom template
  const handleDeleteTemplate = async (templateId: string) => {
    await deleteCustomTemplate(templateId, user?.id);
    setTemplates((prev) => prev.filter((t) => t.id !== templateId));
    setFavorites((prev) => prev.filter((id) => id !== templateId));
  };

  const handleDeleteTemplates = async (templateIds: string[]) => {
    await deleteCustomTemplates(templateIds, user?.id);
    const deleted = new Set(templateIds);
    setTemplates((prev) => prev.filter((template) => !deleted.has(template.id)));
    setFavorites((prev) => prev.filter((id) => !deleted.has(id)));
  };

  const openTemplateInEditor = (
    template: DocumentTemplate,
    customBodyText?: string,
    initialIdentification: Partial<PrintIdentification> = {},
  ) => {
    trackRecentlyUsedTemplate(template.id);
    setRecents(getLocalRecents());
    setEditorTemplate(template);
    setEditorInitialBodyText(customBodyText || template.body_plain_text);
    setEditorInitialTitle(template.title);
    setEditorDocType(template.document_type);
    setEditorInitialIdentification(initialIdentification);
    setIsEditorOpen(true);
  };

  // Modelos para ambas as espécies pedem a espécie; modelos exclusivos pedem somente o peso.
  const handleOpenTemplateInEditor = (template: DocumentTemplate, customBodyText?: string) => {
    if (template.document_type !== 'recipe' || customBodyText) {
      openTemplateInEditor(template, customBodyText);
      return;
    }
    const fixedSpecies = template.species === 'ambos' ? null : template.species;
    setPendingTemplate(template);
    setSetupStep(fixedSpecies ? 'weight' : 'species');
    setSetupSpecies(fixedSpecies);
    setSetupWeight('');
  };

  const handleSelectSetupSpecies = (species: PatientSpecies) => {
    if (pendingTemplate?.species !== 'ambos' && pendingTemplate?.species !== species) return;
    setSetupSpecies(species);
    setSetupStep('weight');
  };

  const handleConfirmPatientSetup = () => {
    const weight = parsePositiveDecimal(setupWeight);
    if (!pendingTemplate || !setupSpecies || !weight) return;
    const calculatedBody = pendingTemplate.structured_defaults?.clinical_model
      ? pendingTemplate.body_plain_text
      : calculateTemplateDosesByWeight(pendingTemplate.body_plain_text, weight);
    openTemplateInEditor(pendingTemplate, calculatedBody, {
      species: setupSpecies === 'cão' ? 'Cão' : 'Gato',
      weightKg: String(setupWeight).replace(',', '.'),
    });
    setPendingTemplate(null);
  };

  // Create new blank model in editor
  const handleCreateNewBlankModel = () => {
    setEditorTemplate(null);
    setEditorInitialTitle('Nova Receita Veterinária');
    setEditorInitialBodyText(`RECOMENDAÇÕES

• Oferecer as medicações conforme os horários prescritos.
• Não interromper o tratamento sem orientação médico-veterinária.
• Procurar atendimento em caso de alteração no estado geral.
• Retornar para reavaliação em A PREENCHER ou antes, caso necessário.`);
    setEditorDocType('recipe');
    setEditorInitialIdentification({});
    setIsEditorOpen(true);
  };

  // Open issued document as a new copy
  const handleOpenIssuedAsNewCopy = (doc: GeneratedDocument) => {
    setEditorTemplate(null);
    setEditorInitialTitle(`${doc.title} (Cópia)`);
    setEditorInitialBodyText(doc.body_plain_text);
    setEditorDocType(doc.document_type);
    setEditorInitialIdentification({});
    setIsEditorOpen(true);
  };

  // Separate custom user templates
  const customTemplates = useMemo(() => {
    return templates.filter((t) => !t.is_global);
  }, [templates]);

  const fixedSetupSpeciesLabel = pendingTemplate?.species === 'cão'
    ? 'Cão'
    : pendingTemplate?.species === 'gato'
      ? 'Gato'
      : null;

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Receituário
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Calcule por espécie e peso, revise o documento e salve na sua conta.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCreateNewBlankModel}
          className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Nova receita
        </button>
      </div>

      {/* Main 4 Tabs Navigation */}
      <div className="border-b border-border/80">
        <nav className="flex gap-5 overflow-x-auto pb-px" aria-label="Abas do Receituário" role="tablist">
          <button
            type="button"
            onClick={() => setActiveTab('receitas')}
            role="tab"
            aria-selected={activeTab === 'receitas'}
            className={`inline-flex items-center gap-2 py-3 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'receitas'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            <Pill className="h-4 w-4" />
            <span>Receitas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('termos')}
            role="tab"
            aria-selected={activeTab === 'termos'}
            className={`inline-flex items-center gap-2 py-3 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'termos'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            <FileSignature className="h-4 w-4" />
            <span>Termos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('meus-modelos')}
            role="tab"
            aria-selected={activeTab === 'meus-modelos'}
            className={`inline-flex items-center gap-2 py-3 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'meus-modelos'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            <UserCheck className="h-4 w-4" />
            <span>Meus modelos ({customTemplates.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('favoritos')}
            role="tab"
            aria-selected={activeTab === 'favoritos'}
            className={`inline-flex items-center gap-2 whitespace-nowrap border-b-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'favoritos'
                ? 'border-primary font-semibold text-primary'
                : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
            }`}
          >
            <Star className="h-4 w-4" />
            <span>Meus modelos favoritos ({favorites.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('emitidos')}
            role="tab"
            aria-selected={activeTab === 'emitidos'}
            className={`inline-flex items-center gap-2 py-3 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'emitidos'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            <FileCheck className="h-4 w-4" />
            <span>Documentos emitidos ({issuedDocs.length})</span>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {loading ? (
        <div className="py-16 text-center text-sm text-muted-foreground">Carregando modelos do receituário...</div>
      ) : (
        <div>
          {activeTab === 'receitas' && (
            <ReceitasTab
              templates={templates}
              favorites={favorites}
              recents={recents}
              onToggleFavorite={handleToggleFavorite}
              onSelectTemplate={handleOpenTemplateInEditor}
              onDeleteTemplates={handleDeleteTemplates}
            />
          )}

          {activeTab === 'termos' && (
            <TermosTab
              templates={templates}
              onSelectTerm={(template, customText) => handleOpenTemplateInEditor(template, customText)}
            />
          )}

          {activeTab === 'meus-modelos' && (
            <MeusModelosTab
              customTemplates={customTemplates}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onDeleteTemplate={handleDeleteTemplate}
              onSelectTemplate={handleOpenTemplateInEditor}
              onCreateNewModel={handleCreateNewBlankModel}
            />
          )}

          {activeTab === 'favoritos' && (
            <ModelosFavoritosTab
              templates={templates}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectTemplate={handleOpenTemplateInEditor}
            />
          )}

          {activeTab === 'emitidos' && (
            <DocumentosEmitidosTab
              documents={issuedDocs}
              onOpenAsNewCopy={handleOpenIssuedAsNewCopy}
              onRefreshDocs={loadData}
              clinicId={clinicId}
              userId={user?.id}
            />
          )}
        </div>
      )}

      {pendingTemplate ? (
        <div className="fixed inset-0 z-[105] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Preparar receita">
          <div className="w-full max-w-xl rounded-3xl border border-border bg-background p-5 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Preparar receita</p><h2 className="mt-1 text-xl font-bold">{setupStep === 'species' ? 'Qual é a espécie do paciente?' : 'Insira o peso do paciente'}</h2><p className="mt-1 text-sm text-muted-foreground">{setupStep === 'species' ? 'Escolha uma opção para mostrar somente doses compatíveis.' : fixedSetupSpeciesLabel ? `Espécie definida pelo modelo: ${fixedSetupSpeciesLabel}. Informe apenas o peso para calcular as doses.` : 'O peso será usado para calcular automaticamente as doses em mg/kg e mL/kg.'}</p></div>
              <button type="button" onClick={() => setPendingTemplate(null)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border" aria-label="Cancelar preparação da receita"><X className="h-5 w-5" /></button>
            </div>

            {setupStep === 'species' ? (
              <div className="mt-6 grid grid-cols-2 gap-4">
                {([
                  { value: 'cão' as const, label: 'Cão', Icon: Dog, color: 'border-sky-500/35 bg-sky-500/10 text-sky-700' },
                  { value: 'gato' as const, label: 'Gato', Icon: Cat, color: 'border-violet-500/35 bg-violet-500/10 text-violet-700' },
                ]).map(({ value, label, Icon, color }) => {
                  const disabled = pendingTemplate.species !== 'ambos' && pendingTemplate.species !== value;
                  return <button key={value} type="button" disabled={disabled} onClick={() => handleSelectSetupSpecies(value)} className={`flex min-h-44 flex-col items-center justify-center rounded-2xl border-2 p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-35 ${color}`}><span className="flex h-20 w-20 items-center justify-center rounded-full bg-background/80"><Icon className="h-11 w-11" /></span><strong className="mt-4 text-lg">{label}</strong>{disabled ? <small className="mt-1">Modelo não indicado</small> : <small className="mt-1">Selecionar {label.toLowerCase()}</small>}</button>;
                })}
              </div>
            ) : (
              <form className="mt-6" onSubmit={(event) => { event.preventDefault(); handleConfirmPatientSetup(); }}>
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700"><Scale className="h-12 w-12" /></div>
                <label className="mx-auto mt-5 block max-w-xs"><span className="mb-2 block text-center text-sm font-semibold">Peso em quilogramas</span><div className="relative"><input type="text" inputMode="decimal" autoFocus value={setupWeight} onChange={(event) => setSetupWeight(event.target.value)} placeholder="Ex.: 4,5" className="h-14 w-full rounded-2xl border-2 border-border bg-background px-4 pr-14 text-center text-xl font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" aria-label="Peso do paciente em quilogramas" /><span className="absolute right-4 top-4 font-semibold text-muted-foreground">kg</span></div></label>
                <div className={`mt-6 flex items-center gap-3 ${pendingTemplate.species === 'ambos' ? 'justify-between' : 'justify-end'}`}>
                  {pendingTemplate.species === 'ambos' ? <button type="button" onClick={() => setSetupStep('species')} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold"><ArrowLeft className="h-4 w-4" />Voltar</button> : null}
                  <button type="submit" disabled={!parsePositiveDecimal(setupWeight)} className="min-h-11 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40">Calcular e abrir receita</button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}

      {/* Editor Modal */}
      <ReceituarioEditorModal
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          void loadData();
        }}
        template={editorTemplate}
        initialBodyText={editorInitialBodyText}
        initialTitle={editorInitialTitle}
        documentType={editorDocType}
        initialIdentification={editorInitialIdentification}
      />
    </div>
  );
}
