import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Calculator, ChevronLeft, ChevronRight, Table2 } from 'lucide-react';
import { ConsultaVetPageHero } from '../../components/layout/ConsultaVetPageHero';
import { OncologyBsaCalculator } from '../../components/quickReferences/OncologyBsaCalculator';
import { OncologyBsaTable } from '../../components/quickReferences/OncologyBsaTable';
import { BSAVA_BIBLIOGRAPHIC_SOURCES, Species } from '../../data/quickReferencesData';
import { cn } from '../../../../lib/utils';

type OncologySubView = 'calculator' | 'table';

export function OncologyReferencePage() {
  const [oncologySubView, setOncologySubView] = useState<OncologySubView>('calculator');
  const [weightKg, setWeightKg] = useState<number>(10);
  const [species, setSpecies] = useState<Species>('canine');

  return (
    <div className="mx-auto w-full max-w-[1360px] space-y-6 p-4 md:p-8">
      <nav
        className="consulta-vet-breadcrumb flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground"
        aria-label="Navegação estrutural"
      >
        <Link to="/consulta-vet" className="transition-colors hover:text-primary">
          Início
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <Link to="/consulta-vet/referencias-rapidas" className="transition-colors hover:text-primary">
          Referências clínicas
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <span className="text-foreground">Oncologia</span>
      </nav>

      <div className="flex items-center gap-3">
        <Link
          to="/consulta-vet/referencias-rapidas"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Voltar aos mini-apps"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div className="min-w-0 flex-1">
          <ConsultaVetPageHero
            title="Oncologia"
            description="Área de superfície corporal, doses dinâmicas e tabelas de referência para cães e gatos."
            icon={Calculator}
            accent="violet"
            compact
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/60 p-2 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setOncologySubView('calculator')}
            className={cn(
              'flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all',
              oncologySubView === 'calculator'
                ? 'bg-background text-foreground shadow-sm ring-1 ring-border/70'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>Calculadora & Doses Dinâmicas</span>
          </button>
          <button
            type="button"
            onClick={() => setOncologySubView('table')}
            className={cn(
              'flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all',
              oncologySubView === 'table'
                ? 'bg-background text-foreground shadow-sm ring-1 ring-border/70'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Table2 className="h-3.5 w-3.5" />
            <span>Tabela BSAVA Oficial (Fig. 7.3 & 7.4)</span>
          </button>
        </div>

        <div className="px-3 text-xs text-muted-foreground">
          Fonte canônica:{' '}
          <span className="font-semibold text-foreground">BSAVA Manual of Small Animal Oncology</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={oncologySubView}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          {oncologySubView === 'calculator' ? (
            <OncologyBsaCalculator
              currentWeightKg={weightKg}
              species={species}
              onWeightChange={setWeightKg}
              onSpeciesChange={setSpecies}
            />
          ) : (
            <OncologyBsaTable
              currentWeightKg={weightKg}
              species={species}
              onSelectWeight={(nextWeight) => {
                setWeightKg(nextWeight);
                setOncologySubView('calculator');
              }}
              onSpeciesChange={setSpecies}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="space-y-4 rounded-3xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Fontes Bibliográficas & Citações Oficiais
          </h2>
        </div>

        <div className="grid gap-3.5 md:grid-cols-3">
          {BSAVA_BIBLIOGRAPHIC_SOURCES.map((source) => (
            <div
              key={`${source.title}-${source.edition}`}
              className="space-y-2 rounded-2xl border border-border/60 bg-background/50 p-4 text-xs"
            >
              <div>
                <p className="font-bold text-foreground">{source.title}</p>
                <p className="text-[11px] text-primary">
                  {source.edition} • {source.authors}
                </p>
              </div>
              <p className="font-medium text-muted-foreground">{source.chapter}</p>
              <p className="text-[11px] leading-relaxed text-muted-foreground/80">{source.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
