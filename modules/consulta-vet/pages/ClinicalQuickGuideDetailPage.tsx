import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, ChevronRight, ListChecks, ZoomIn } from 'lucide-react';
import { ConsultaVetSurface } from '../components/layout/ConsultaVetSurface';
import { ClinicalQuickGuideBody } from '../components/clinicalQuickGuide/ClinicalQuickGuideBody';
import { ClinicalGuideInline } from '../components/clinicalQuickGuide/ClinicalGuideInline';
import { ClinicalImageZoomModal } from '../components/clinicalQuickGuide/ClinicalImageZoomModal';
import { getClinicalQuickGuideRepository } from '../services/clinicalQuickGuideRepository';
import { ClinicalQuickGuide } from '../types/clinicalQuickGuide';
import { CLINICAL_QUICK_GUIDE_CATEGORIES } from '../data/seed/clinicalQuickGuides.categories';
import { SectionAnchorNav, type SectionAnchorEntry } from '../components/shared/SectionAnchorNav';
import { getProcedureChapterLabel } from '../utils/procedureChapterLabels';

const UI_TEXT = {
  home: 'Início',
  section: 'Procedimentos',
  notFoundTitle: 'Guia não encontrado',
  notFoundBody: 'Não foi possível localizar este conteúdo.',
  back: 'Voltar à lista',
  quickTitle: 'Resumo prático',
} as const;

export function ClinicalQuickGuideDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const repo = useMemo(() => getClinicalQuickGuideRepository(), []);
  const [guide, setGuide] = useState<ClinicalQuickGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [heroZoomOpen, setHeroZoomOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const readingRef = useRef<HTMLElement>(null);
  const scrollAfterTabChange = useRef(false);

  useEffect(() => {
    let ok = true;
    setActiveTab(0);
    scrollAfterTabChange.current = false;
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

  // Slice before removing placeholders so readingTabs keep their original section indices.
  const readingBlocks = useMemo(() => {
    if (!guide) return [];
    const start = guide.readingTabs?.[activeTab]?.startIndex ?? 0;
    const end = guide.readingTabs?.[activeTab + 1]?.startIndex;
    return guide.sections
      .map((block, index) => ({ block, id: `cqg-section-${index}` }))
      .slice(start, end)
      .filter(({ block }) => sectionsForBody.includes(block));
  }, [guide, activeTab, sectionsForBody]);

  const chapters = useMemo<SectionAnchorEntry[]>(() => [
    { id: 'cqg-summary', label: UI_TEXT.quickTitle },
    ...readingBlocks.flatMap(({ block, id }) => block.type === 'heading' && block.level === 2
      ? [{ id, label: getProcedureChapterLabel(block.text) }]
      : []),
    ...(readingBlocks.some(({ block }) => block.type === 'heading' && block.level === 2)
      ? [] : [{ id: 'clinical-guide-reading', label: 'Conteúdo completo' }]),
  ], [readingBlocks]);

  useEffect(() => {
    if (!scrollAfterTabChange.current) return;
    const frame = window.requestAnimationFrame(() => {
      readingRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      scrollAfterTabChange.current = false;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeTab, reduceMotion]);

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
    <div className="consulta-vet-detail-page mx-auto flex w-full max-w-[1280px] items-start gap-6">
    <div className="min-w-0 flex-1 space-y-8 p-4 md:p-8">
      <nav
        className="consulta-vet-breadcrumb flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground"
        aria-label="Navegação estrutural"
      >
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

      <ConsultaVetSurface accent="emerald" className="p-5 shadow-md md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-teal-500/35 bg-teal-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-200">
                {categoryMeta?.label ?? guide.category}
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">{guide.title}</h1>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">{guide.subtitle}</p>
            <p className="mt-3 max-w-[62ch] text-[15px] leading-7 text-foreground/90">{guide.summary}</p>
          </div>

          {guide.heroImageSrc ? (
            <div
              role="button"
              tabIndex={0}
              onClick={() => setHeroZoomOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setHeroZoomOpen(true);
                }
              }}
              className="group relative w-28 shrink-0 cursor-zoom-in overflow-hidden rounded-xl border border-border/80 bg-muted/20 shadow-sm transition-all hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-32 md:w-36"
              title="Clique para ampliar a imagem"
            >
              <img
                src={guide.heroImageSrc}
                alt={guide.heroImageAlt ?? ''}
                className="aspect-square h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-1 rounded-full bg-slate-900/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-md backdrop-blur-sm">
                  <ZoomIn className="h-3 w-3" />
                  Zoom
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </ConsultaVetSurface>

      <section id="cqg-summary" className="scroll-mt-24">
      <ConsultaVetSurface accent="sky" className="p-5 md:p-6">
        <div className="mb-4 flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-sky-600 dark:text-sky-400" aria-hidden />
          <h2 className="text-lg font-bold text-foreground">{UI_TEXT.quickTitle}</h2>
        </div>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/90">
          {guide.quickBullets.map((b, i) => (
            <li key={i}>{guide.richText ? <ClinicalGuideInline text={b} /> : b}</li>
          ))}
        </ul>
      </ConsultaVetSurface>
      </section>
      {guide.readingTabs ? (
        <nav aria-label="Tópicos do procedimento" className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-3">
          {guide.readingTabs.map((tab, index) => <button type="button" key={tab.label}
            aria-pressed={activeTab === index} aria-controls="clinical-guide-reading"
            onClick={() => {
              if (activeTab === index) return;
              scrollAfterTabChange.current = true;
              setActiveTab(index);
            }}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${activeTab === index ? 'bg-primary text-primary-foreground' : 'bg-muted/40 text-foreground hover:bg-muted'}`}>
            {tab.label}
          </button>)}
        </nav>
      ) : null}
      <SectionAnchorNav
        key={`mobile-${guide.slug}-${activeTab}`}
        sections={chapters}
        variant="mobile"
        title="Índice deste procedimento"
        observerRootMargin="-64px 0px -70% 0px"
        className="md:block xl:hidden"
      />
      <section ref={readingRef} id="clinical-guide-reading" className="scroll-mt-24" aria-label={guide.readingTabs?.[activeTab]?.label ?? 'Conteúdo completo'}>
      <motion.div
        key={`${guide.slug}-${activeTab}`}
        initial={reduceMotion ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
      >
      <ClinicalQuickGuideBody
        richText={guide.richText}
        blocks={readingBlocks.map(({ block }) => block)}
        blockIds={readingBlocks.map(({ id }) => id)}
        youtubeVideoId={guide.youtubeVideoId}
        youtubeTitle={guide.title}
      />
      </motion.div>
      </section>

      <div className="flex justify-center border-t border-border/60 pt-8">
        <Link
          to="/consulta-vet/guias-rapidos"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-muted/40"
        >
          <BookOpen className="h-4 w-4" />
          {UI_TEXT.back}
        </Link>
      </div>

      {guide.heroImageSrc ? (
        <ClinicalImageZoomModal
          isOpen={heroZoomOpen}
          onClose={() => setHeroZoomOpen(false)}
          src={guide.heroImageSrc}
          alt={guide.heroImageAlt ?? guide.title}
          caption={guide.heroImageAlt}
          title={guide.title}
        />
      ) : null}
    </div>
    <aside className="hidden w-60 shrink-0 self-stretch py-8 pr-4 xl:block">
      <SectionAnchorNav
        key={`desktop-${guide.slug}-${activeTab}`}
        sections={chapters}
        variant="desktop"
        title="Índice do procedimento"
        observerRootMargin="-64px 0px -70% 0px"
      />
    </aside>
    </div>
  );
}
