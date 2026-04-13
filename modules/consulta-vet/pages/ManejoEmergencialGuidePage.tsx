import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { EmergencyGuideReader } from '../components/emergency/EmergencyGuideReader';
import { getEmergencyGuideRepository } from '../services/emergencyGuideRepository';
import { EmergencyGuide } from '../types/emergencyGuide';

const UI_TEXT = {
  home: 'Início',
  section: 'Manejo emergencial',
  notFoundTitle: 'Guia não encontrado',
  notFoundBody: 'Não foi possível localizar esta cartilha.',
  back: 'Voltar à lista',
} as const;

export function ManejoEmergencialGuidePage() {
  const { slug } = useParams<{ slug: string }>();
  const repo = useMemo(() => getEmergencyGuideRepository(), []);
  const [guide, setGuide] = useState<EmergencyGuide | null>(null);
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
          to="/consulta-vet/manejo-emergencial"
          className="inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          {UI_TEXT.back}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-8 p-4 md:p-8">
      <nav className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
        <Link to="/consulta-vet" className="transition-colors hover:text-primary">
          {UI_TEXT.home}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/consulta-vet/manejo-emergencial" className="transition-colors hover:text-primary">
          {UI_TEXT.section}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate text-foreground">{guide.title}</span>
      </nav>

      <div className="rounded-[28px] border border-border/80 bg-card/80 p-5 shadow-sm md:p-8">
        <p className="text-sm font-medium text-muted-foreground">{guide.subtitle}</p>
        <p className="mt-2 max-w-[95ch] text-[15px] leading-7 text-foreground/85">{guide.description}</p>
      </div>

      <EmergencyGuideReader guide={guide} />
    </div>
  );
}
