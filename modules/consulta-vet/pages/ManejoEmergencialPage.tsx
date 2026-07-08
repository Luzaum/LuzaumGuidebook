import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Zap } from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { EmergencyGuideListCard } from '../components/emergency/EmergencyGuideListCard';
import { getEmergencyGuideRepository } from '../services/emergencyGuideRepository';
import { EmergencyGuide } from '../types/emergencyGuide';

const UI_TEXT = {
  home: 'Início',
  title: 'Manejo emergencial',
  lead:
    'Guias de plantão para consulta rápida, com raciocínio em fluxo único: reconhecer gravidade, estabilizar, tratar, monitorar e transicionar com segurança.',
  howTitle: 'Padrão dos manejos',
  howBody:
    'Cada cartilha abre em uma página contínua, com índice lateral, metas, tabelas de dose, fórmulas, pontos críticos e cenários práticos. A ideia é permitir leitura rápida no plantão sem perder profundidade quando o caso exige detalhe.',
  badge: 'Fluxo clínico padronizado',
  searchPlaceholder: 'Pesquisar manejo por nome, sigla, sistema ou tag...',
} as const;

function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function ManejoEmergencialPage() {
  const repo = useMemo(() => getEmergencyGuideRepository(), []);
  const [guides, setGuides] = useState<EmergencyGuide[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let ok = true;
    void repo.list().then(
      (list) => {
        if (ok) setGuides(list);
      },
      () => {
        if (ok) setError('Não foi possível carregar os guias.');
      }
    );
    return () => {
      ok = false;
    };
  }, [repo]);

  const filteredGuides = useMemo(() => {
    const q = normalizeSearch(query);
    if (!q) return guides;
    return guides.filter((guide) => {
      const haystack = normalizeSearch(
        [guide.title, guide.subtitle, guide.description, guide.slug, ...guide.tags, ...guide.species].join(' ')
      );
      return haystack.includes(q);
    });
  }, [guides, query]);

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8 p-4 md:p-8">
      <nav className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
        <Link to="/consulta-vet" className="transition-colors hover:text-primary">
          {UI_TEXT.home}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{UI_TEXT.title}</span>
      </nav>

      <ConsultaVetPageHero
        eyebrow={UI_TEXT.badge}
        title={UI_TEXT.title}
        description={UI_TEXT.lead}
        icon={Zap}
        accent="orange"
        footer={
          <div className="rounded-2xl border border-primary/18 bg-primary/[0.06] px-5 py-5 md:px-6">
            <h2 className="text-sm font-bold text-foreground">{UI_TEXT.howTitle}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{UI_TEXT.howBody}</p>
          </div>
        }
      />

      {error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-5 py-4 text-sm text-destructive">{error}</div>
      ) : null}

      <section className="rounded-2xl border border-border/80 bg-card/70 p-4 shadow-sm md:p-5">
        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground" htmlFor="emergency-guide-search">
          Pesquisar manejos
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            id="emergency-guide-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={UI_TEXT.searchPlaceholder}
            className="h-14 w-full rounded-2xl border border-border/80 bg-background/80 pl-12 pr-4 text-base font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10"
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {query.trim()
            ? `${filteredGuides.length} de ${guides.length} manejos encontrados`
            : `${guides.length} manejos emergenciais disponíveis`}
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGuides.map((g) => (
          <EmergencyGuideListCard key={g.id} guide={g} />
        ))}
      </section>

      {!error && filteredGuides.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/20 px-5 py-8 text-center">
          <p className="text-sm font-semibold text-foreground">Nenhum manejo encontrado.</p>
          <p className="mt-2 text-sm text-muted-foreground">Tente buscar por sigla, sistema, doença ou uma tag do protocolo.</p>
        </div>
      ) : null}
    </div>
  );
}
