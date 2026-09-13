import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Baby,
  BookOpen,
  Calculator,
  ChevronRight,
  FileText,
  HeartPulse,
  Info,
  Layers,
  Sparkles,
  Table2,
} from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { OncologyBsaCalculator } from '../components/quickReferences/OncologyBsaCalculator';
import { OncologyBsaTable } from '../components/quickReferences/OncologyBsaTable';
import { BSAVA_BIBLIOGRAPHIC_SOURCES, Species } from '../data/quickReferencesData';
import { cn } from '../../../lib/utils';

type ActiveConsultation = 'oncology-bsa' | 'vital-signs' | 'pediatrics';
type OncologySubView = 'calculator' | 'table';

export function QuickReferencesPage() {
  const [activeConsultation, setActiveConsultation] = useState<ActiveConsultation>('oncology-bsa');
  const [oncologySubView, setOncologySubView] = useState<OncologySubView>('calculator');
  const [weightKg, setWeightKg] = useState<number>(10);
  const [species, setSpecies] = useState<Species>('canine');

  return (
    <div className="mx-auto w-full max-w-[1360px] space-y-6 p-4 md:p-8">
      {/* Breadcrumb */}
      <nav
        className="consulta-vet-breadcrumb flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground"
        aria-label="Navegação estrutural"
      >
        <Link to="/consulta-vet" className="transition-colors hover:text-primary">
          Início
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Referências rápidas</span>
      </nav>

      {/* Hero da Seção */}
      <ConsultaVetPageHero
        title="Referências rápidas"
        description="Catálogo de tabelas, calculadoras e parâmetros clínicos imediatos para consulta ágil no atendimento e plantão veterinário."
        icon={Layers}
        accent="cyan"
        compact
      />

      {/* Seletor de Consultas da Seção */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-3">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Consultas de Referência Rápida">
          <button
            type="button"
            role="tab"
            aria-selected={activeConsultation === 'oncology-bsa'}
            onClick={() => setActiveConsultation('oncology-bsa')}
            className={cn(
              'group relative flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all duration-200',
              activeConsultation === 'oncology-bsa'
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                : 'border border-border/70 bg-card/80 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground'
            )}
          >
            <Calculator className="h-4 w-4" />
            <span>Oncologia: Área de Superfície (m²)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeConsultation === 'vital-signs'}
            onClick={() => setActiveConsultation('vital-signs')}
            className={cn(
              'group relative flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-semibold transition-all duration-200',
              activeConsultation === 'vital-signs'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'border border-border/70 bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground'
            )}
          >
            <HeartPulse className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
            <span>Constantes & Hemodinâmica</span>
            <span className="rounded-md border border-border/60 bg-muted/60 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
              Em breve
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeConsultation === 'pediatrics'}
            onClick={() => setActiveConsultation('pediatrics')}
            className={cn(
              'group relative flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-semibold transition-all duration-200',
              activeConsultation === 'pediatrics'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'border border-border/70 bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground'
            )}
          >
            <Baby className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
            <span>Pediatria & Neonatologia</span>
            <span className="rounded-md border border-border/60 bg-muted/60 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
              Em breve
            </span>
          </button>
        </div>
      </div>

      {/* Conteúdo da Consulta Ativa */}
      <AnimatePresence mode="wait">
        {activeConsultation === 'oncology-bsa' ? (
          <motion.div
            key="oncology-bsa"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Sub-navegação: Calculadora & Doses vs Tabela Completa */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border/70 bg-card/60 p-2 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
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

            {/* Visualização Selecionada */}
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
                onSelectWeight={(w) => {
                  setWeightKg(w);
                  setOncologySubView('calculator');
                }}
                onSpeciesChange={setSpecies}
              />
            )}

            {/* Bloco de Citações Bibliográficas Formais */}
            <div className="rounded-3xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Fontes Bibliográficas & Citações Oficiais
                </h4>
              </div>

              <div className="grid gap-3.5 md:grid-cols-3">
                {BSAVA_BIBLIOGRAPHIC_SOURCES.map((src, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border/60 bg-background/50 p-4 text-xs space-y-2"
                  >
                    <div>
                      <p className="font-bold text-foreground">{src.title}</p>
                      <p className="text-[11px] text-primary">{src.edition} • {src.authors}</p>
                    </div>
                    <p className="font-medium text-muted-foreground">{src.chapter}</p>
                    <p className="text-[11px] text-muted-foreground/80 leading-relaxed">{src.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl border border-dashed border-border p-12 text-center space-y-3"
          >
            <Info className="mx-auto h-8 w-8 text-muted-foreground" />
            <h3 className="text-base font-bold text-foreground">Consulta em Desenvolvimento</h3>
            <p className="max-w-md mx-auto text-xs text-muted-foreground leading-relaxed">
              Esta consulta rápida está estruturada no roadmap de referências do ConsultaVET e será habilitada nas
              próximas atualizações clínicas.
            </p>
            <button
              type="button"
              onClick={() => setActiveConsultation('oncology-bsa')}
              className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Retornar para Oncologia & BSA
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
