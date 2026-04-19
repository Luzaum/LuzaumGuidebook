import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getFindingBySlug } from '../data/neuroFindings/entries'

export function NeuroFindingDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const entry = slug ? getFindingBySlug(slug) : undefined

  if (!entry) {
    return (
      <div className="relative z-10 pb-16">
        <p className="text-muted-foreground">Achado não encontrado.</p>
        <Link to="/neurologia/base-dados" className="mt-4 inline-block text-gold hover:underline">
          Voltar à base
        </Link>
      </div>
    )
  }

  return (
    <article className="relative z-10 w-full space-y-8 pb-20">
      <Link
        to="/neurologia/base-dados"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-gold"
      >
        <ArrowLeft className="h-4 w-4" />
        Base neurológica
      </Link>

      <header>
        <span className="text-xs font-semibold uppercase tracking-wide text-gold">{entry.category}</span>
        <h1 className="mt-2 text-3xl font-bold text-foreground">{entry.title}</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{entry.summary}</p>
        {entry.synonyms.length > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground/80">Sinônimos: </span>
            {entry.synonyms.join(', ')}
          </p>
        )}
      </header>

      {entry.images?.map((im, idx) => (
        <figure
          key={idx}
          className="overflow-hidden rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center"
        >
          <div className="text-4xl opacity-40" aria-hidden>
            📷
          </div>
          {im.src ? (
            <img src={im.src} alt={im.alt} className="mx-auto mt-4 max-h-64 rounded-lg object-contain" />
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">{im.alt}</p>
          )}
          <figcaption className="mt-2 text-xs text-muted-foreground">{im.caption}</figcaption>
        </figure>
      ))}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Neuroanatomia</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{entry.neuroanatomia}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Neurofisiologia</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{entry.neurofisiologia}</p>
      </section>

      {entry.patofisiologia && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Fisiopatologia (complementar)</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{entry.patofisiologia}</p>
        </section>
      )}

      {entry.patologia && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Patologia</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{entry.patologia}</p>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Localização neurológica</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{entry.localizacao}</p>
      </section>

      {entry.etiologia && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Etiologia</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{entry.etiologia}</p>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Diferenciais</h2>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          {entry.diferenciais.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Epidemiologia e populações</h2>
        {entry.epidemiologia && (
          <p className="text-sm leading-relaxed text-muted-foreground">{entry.epidemiologia}</p>
        )}
        <p className="text-sm leading-relaxed text-muted-foreground">{entry.populacoes}</p>
      </section>

      {entry.referencias && entry.referencias.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-foreground">Referências</h2>
          <ul className="mt-2 list-inside list-decimal text-sm text-muted-foreground">
            {entry.referencias.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
