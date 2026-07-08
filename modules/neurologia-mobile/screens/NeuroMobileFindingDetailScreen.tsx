import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, Brain, MapPin, ListChecks, ChevronDown, ChevronUp } from 'lucide-react'
import { getFindingBySlug } from '../../neurologia/data/neuroFindings/entries'
import { cn } from '../../../lib/utils'

export function NeuroMobileFindingDetailScreen() {
  const { slug } = useParams<{ slug: string }>()
  const entry = slug ? getFindingBySlug(slug) : undefined
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    anatomy: true,
    location: true,
    differentials: true,
  })

  const toggleSection = (name: string) => {
    setExpandedSections((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  if (!entry) {
    return (
      <div className="space-y-4">
        <p className="text-xs text-muted-foreground">Achado clínico não encontrado.</p>
        <Link to="/neuro-mobile/base-dados" className="inline-flex items-center gap-1.5 text-xs font-bold text-gold">
          <ArrowLeft className="h-4 w-4" /> Voltar à base
        </Link>
      </div>
    )
  }

  return (
    <article className="space-y-5 nm-fade-in pb-10">
      <Link
        to="/neuro-mobile/base-dados"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground active:text-gold"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Base neurológica
      </Link>

      <header className="space-y-2">
        <span className="inline-block rounded-full bg-gold/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold">
          {entry.category}
        </span>
        <h2 className="text-xl font-extrabold text-foreground leading-tight">{entry.title}</h2>
        <p className="text-xs text-muted-foreground leading-relaxed mt-1">{entry.summary}</p>
        {entry.synonyms.length > 0 && (
          <p className="text-[10px] text-muted-foreground">
            <span className="font-semibold text-foreground/80">Sinônimos: </span>
            {entry.synonyms.join(', ')}
          </p>
        )}
      </header>

      {/* Image if available */}
      {entry.images?.map((im, idx) => (
        <figure
          key={idx}
          className="overflow-hidden rounded-xl border border-dashed border-border bg-card/40 p-4 text-center"
        >
          {im.src ? (
            <img src={im.src} alt={im.alt} className="mx-auto max-h-48 rounded-lg object-contain" />
          ) : (
            <div className="flex flex-col items-center justify-center py-4">
              <span className="text-3xl opacity-40">📷</span>
              <p className="mt-2 text-[10px] text-muted-foreground">{im.alt}</p>
            </div>
          )}
          {im.caption && <figcaption className="mt-1.5 text-[9px] text-muted-foreground">{im.caption}</figcaption>}
        </figure>
      ))}

      {/* Accordion List for Detail Sections */}
      <div className="space-y-3">
        {/* Neuroanatomia & Fisiologia */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <button
            onClick={() => toggleSection('anatomy')}
            className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-foreground active:bg-muted/50 text-left"
          >
            <span className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-gold" />
              Neuroanatomia e Fisiologia
            </span>
            {expandedSections.anatomy ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          {expandedSections.anatomy && (
            <div className="px-4 pb-4 pt-1 border-t border-border/40 text-[11px] leading-relaxed text-muted-foreground space-y-2">
              <p>
                <strong className="text-foreground/90">Anatomia: </strong>
                {entry.neuroanatomia}
              </p>
              <p>
                <strong className="text-foreground/90">Fisiologia: </strong>
                {entry.neurofisiologia}
              </p>
              {entry.patofisiologia && (
                <p>
                  <strong className="text-foreground/90">Fisiopatologia: </strong>
                  {entry.patofisiologia}
                </p>
              )}
              {entry.patologia && (
                <p>
                  <strong className="text-foreground/90">Patologia: </strong>
                  {entry.patologia}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Localização Neurológica */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <button
            onClick={() => toggleSection('location')}
            className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-foreground active:bg-muted/50 text-left"
          >
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" />
              Localização Neurológica
            </span>
            {expandedSections.location ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          {expandedSections.location && (
            <div className="px-4 pb-4 pt-1 border-t border-border/40 text-[11px] leading-relaxed text-muted-foreground">
              {entry.localizacao}
            </div>
          )}
        </div>

        {/* Diferenciais e Populações */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <button
            onClick={() => toggleSection('differentials')}
            className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-foreground active:bg-muted/50 text-left"
          >
            <span className="flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-gold" />
              Diferenciais e Epidemiologia
            </span>
            {expandedSections.differentials ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          {expandedSections.differentials && (
            <div className="px-4 pb-4 pt-1 border-t border-border/40 text-[11px] leading-relaxed text-muted-foreground space-y-3">
              <div>
                <strong className="text-foreground/95 block mb-1">Diagnósticos Diferenciais:</strong>
                <ul className="list-disc list-inside space-y-0.5 pl-1">
                  {entry.diferenciais.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              {entry.etiologia && (
                <p>
                  <strong className="text-foreground/90 font-bold block mb-0.5">Etiologia: </strong>
                  {entry.etiologia}
                </p>
              )}
              {entry.epidemiologia && (
                <p>
                  <strong className="text-foreground/90 font-bold block mb-0.5">Epidemiologia: </strong>
                  {entry.epidemiologia}
                </p>
              )}
              <p>
                <strong className="text-foreground/90 font-bold block mb-0.5">Populações de risco: </strong>
                {entry.populacoes}
              </p>
            </div>
          )}
        </div>

        {/* Referências */}
        {entry.referencias && entry.referencias.length > 0 && (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <button
              onClick={() => toggleSection('references')}
              className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-foreground active:bg-muted/50 text-left"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-gold" />
                Referências
              </span>
              {expandedSections.references ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </button>
            {expandedSections.references && (
              <div className="px-4 pb-4 pt-1 border-t border-border/40 text-[10px] leading-relaxed text-slate-400">
                <ol className="list-decimal list-inside space-y-1">
                  {entry.referencias.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
