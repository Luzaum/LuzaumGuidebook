import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FileCheck, FileSignature, Pill, Plus, UserCheck } from 'lucide-react';
import { useAuthSession } from '../../../src/components/AuthSessionProvider';
import { useClinic } from '../../../src/components/ClinicProvider';
import { DocumentosEmitidosTab } from '../components/receituario/DocumentosEmitidosTab';
import { MeusModelosTab } from '../components/receituario/MeusModelosTab';
import { ReceitasTab } from '../components/receituario/ReceitasTab';
import { ReceituarioEditorModal } from '../components/receituario/ReceituarioEditorModal';
import { TermosTab } from '../components/receituario/TermosTab';
import {
  deleteCustomTemplate,
  fetchAllTemplates,
  fetchFavorites,
  fetchIssuedDocuments,
  getLocalRecents,
  trackRecentlyUsedTemplate,
  toggleFavorite,
} from '../services/receituarioService';
import { DocumentTemplate, GeneratedDocument } from '../types/receituario';

type TabKey = 'receitas' | 'termos' | 'meus-modelos' | 'emitidos';

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
  };

  // Open Template in Editor
  const handleOpenTemplateInEditor = (
    template: DocumentTemplate,
    customBodyText?: string
  ) => {
    trackRecentlyUsedTemplate(template.id);
    setRecents(getLocalRecents());
    setEditorTemplate(template);
    setEditorInitialBodyText(customBodyText || template.body_plain_text);
    setEditorInitialTitle(template.title);
    setEditorDocType(template.document_type);
    setIsEditorOpen(true);
  };

  // Create new blank model in editor
  const handleCreateNewBlankModel = () => {
    setEditorTemplate(null);
    setEditorInitialTitle('Nova Receita Veterinária');
    setEditorInitialBodyText(`RECOMENDAÇÕES

• Oferecer as medicações conforme os horários prescritos.
• Não interromper o tratamento sem orientação médico-veterinária.
• Procurar atendimento em caso de alteração no estado geral.`);
    setEditorDocType('recipe');
    setIsEditorOpen(true);
  };

  // Open issued document as a new copy
  const handleOpenIssuedAsNewCopy = (doc: GeneratedDocument) => {
    setEditorTemplate(null);
    setEditorInitialTitle(`${doc.title} (Cópia)`);
    setEditorInitialBodyText(doc.body_plain_text);
    setEditorDocType(doc.document_type);
    setIsEditorOpen(true);
  };

  // Separate custom user templates
  const customTemplates = useMemo(() => {
    return templates.filter((t) => !t.is_global);
  }, [templates]);

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
      />
    </div>
  );
}
