import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, ChevronRight, ListChecks } from 'lucide-react';
import { ConsultaVetSurface } from '../components/layout/ConsultaVetSurface';
import { ClinicalQuickGuideBody } from '../components/clinicalQuickGuide/ClinicalQuickGuideBody';
import { getClinicalQuickGuideRepository } from '../services/clinicalQuickGuideRepository';
import { ClinicalQuickGuide } from '../types/clinicalQuickGuide';
import { CLINICAL_QUICK_GUIDE_CATEGORIES } from '../data/seed/clinicalQuickGuides.categories';

const UI_TEXT = {
  home: 'Início',
  section: 'Guia rápido clínico',
  notFoundTitle: 'Guia não encontrado',
  notFoundBody: 'Não foi possível localizar este conteúdo.',
  back: 'Voltar à lista',
  quickTitle: 'Guia rápido',
} as const;

export function ClinicalQuickGuideDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const repo = useMemo(() => getClinicalQuickGuideRepository(), []);
  const [guide, setGuide] = useState<ClinicalQuickGuide | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ok = true;
    if (!slug) {
      setGuide(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    void repo.getBySlug(slug).then((g) => {
      if (!ok) return;
      setGuide(g);
      setLoading(false);
    });
    return () => {
      ok = false;
    };
  }, [repo, slug]);

  const categoryMeta = useMemo(() => {
    if (!guide) return null;
    return CLINICAL_QUICK_GUIDE_CATEGORIES.find((c) => c.id === guide.category);
  }, [guide]);

  const sectionsForBody = useMemo(() => {
    if (!guide) return [];
    const hasYoutube =
      Boolean(guide.youtubeVideoId) || guide.sections.some((b) => b.type === 'youtubeEmbed');
    if (hasYoutube) {
      return guide.sections.filter((b) => b.type !== 'videoPlaceholder');
    }
    return guide.sections;
  }, [guide]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-12">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="mx-auto max-w-lg space-y-6 p-8 text-center">
        <h1 className="text-xl font-bold text-foreground">{UI_TEXT.notFoundTitle}</h1>
        <p className="text-muted-foreground">{UI_TEXT.notFoundBody}</p>
        <Link
          to="/consulta-vet/guias-rapidos"
          className="inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          {UI_TEXT.back}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[900px] space-y-8 p-4 md:p-8">
      <nav className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
        <Link to="/consulta-vet" className="transition-colors hover:text-primary">
          {UI_TEXT.home}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/consulta-vet/guias-rapidos" className="transition-colors hover:text-primary">
          {UI_TEXT.section}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate text-foreground">{guide.title}</span>
      </nav>

      <ConsultaVetSurface accent="emerald" className="p-5 shadow-md md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-teal-500/35 bg-teal-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-200">
            {categoryMeta?.label ?? guide.category}
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">{guide.title}</h1>
        <p className="mt-2 text-sm font-semibold text-muted-foreground">{guide.subtitle}</p>
        <p className="mt-3 max-w-[75ch] text-[15px] leading-7 text-foreground/90">{guide.summary}</p>
      </ConsultaVetSurface>

      {guide.heroImageSrc ? (
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-muted/20">
          <img src={guide.heroImageSrc} alt={guide.heroImageAlt ?? ''} className="h-auto w-full object-cover" loading="lazy" />
        </div>
      ) : null}

      <ConsultaVetSurface accent="sky" className="p-5 md:p-6">
        <div className="mb-4 flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-sky-600 dark:text-sky-400" aria-hidden />
          <h2 className="text-lg font-bold text-foreground">{UI_TEXT.quickTitle}</h2>
        </div>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/90">
          {guide.quickBullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </ConsultaVetSurface>

      <ClinicalQuickGuideBody
        blocks={sectionsForBody}
        youtubeVideoId={guide.youtubeVideoId}
        youtubeTitle={guide.title}
      />

      <div className="flex justify-center border-t border-border/60 pt-8">
        <Link
          to="/consulta-vet/guias-rapidos"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-muted/40"
        >
          <BookOpen className="h-4 w-4" />
          {UI_TEXT.back}
        </Link>
      </div>
    </div>
  );
}
