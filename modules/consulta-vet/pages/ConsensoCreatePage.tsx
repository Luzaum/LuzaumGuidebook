import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LoaderCircle, Upload } from 'lucide-react';
import { ConsensusSpecies } from '../types/consenso';
import { getConsensoRepository } from '../services/consensoRepository';

type FormState = {
  title: string;
  description: string;
  organization: string;
  year: string;
  category: string;
  species: ConsensusSpecies;
  file: File | null;
};

const INITIAL_STATE: FormState = {
  title: '',
  description: '',
  organization: '',
  year: '',
  category: '',
  species: 'both',
  file: null,
};

function isPdf(file: File): boolean {
  const name = file.name.toLowerCase();
  return file.type === 'application/pdf' && name.endsWith('.pdf');
}

export function ConsensoCreatePage() {
  const navigate = useNavigate();
  const repository = useMemo(() => getConsensoRepository(), []);

  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFieldChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!form.title.trim()) {
      setError('Título é obrigatório.');
      return;
    }

    if (!form.file) {
      setError('Selecione um arquivo PDF.');
      return;
    }

    if (!isPdf(form.file)) {
      setError('O arquivo deve ser PDF válido (.pdf).');
      return;
    }

    const parsedYear = form.year.trim() ? Number(form.year.trim()) : null;
    if (parsedYear !== null && (!Number.isInteger(parsedYear) || parsedYear < 1900 || parsedYear > 3000)) {
      setError('Ano inválido. Informe um valor entre 1900 e 3000.');
      return;
    }

    setIsSubmitting(true);

    try {
      const created = await repository.create({
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        organization: form.organization.trim() || undefined,
        year: parsedYear,
        category: form.category.trim() || undefined,
        species: form.species,
        file: form.file,
      });

      navigate(`/consulta-vet/consensos/${created.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao cadastrar consenso.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[920px] space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Adicionar consenso</h1>
          <p className="mt-1 text-muted-foreground">Cadastro de consenso real com upload de PDF para Supabase Storage.</p>
        </div>

        <Link
          to="/consulta-vet/consensos"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-5 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-foreground">Título *</span>
            <input
              type="text"
              value={form.title}
              onChange={(event) => handleFieldChange('title', event.target.value)}
              placeholder="Ex.: Diretrizes de manejo da DRC"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-foreground">Organização</span>
            <input
              type="text"
              value={form.organization}
              onChange={(event) => handleFieldChange('organization', event.target.value)}
              placeholder="Ex.: WSAVA"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-foreground">Descrição curta</span>
          <textarea
            value={form.description}
            onChange={(event) => handleFieldChange('description', event.target.value)}
            rows={3}
            placeholder="Resumo breve do conteúdo"
            className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-foreground">Ano</span>
            <input
              type="number"
              min={1900}
              max={3000}
              value={form.year}
              onChange={(event) => handleFieldChange('year', event.target.value)}
              placeholder="2026"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-foreground">Categoria</span>
            <input
              type="text"
              value={form.category}
              onChange={(event) => handleFieldChange('category', event.target.value)}
              placeholder="Ex.: nefrologia"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-foreground">Espécie</span>
            <select
              value={form.species}
              onChange={(event) => handleFieldChange('species', event.target.value as ConsensusSpecies)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="dog">Canino</option>
              <option value="cat">Felino</option>
              <option value="both">Ambos</option>
            </select>
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-foreground">Arquivo PDF *</span>
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(event) => handleFieldChange('file', event.target.files?.[0] || null)}
            className="block w-full cursor-pointer rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium"
            required
          />
          <p className="text-xs text-muted-foreground">Apenas arquivos PDF são aceitos.</p>
        </label>

        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Salvar consenso
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
