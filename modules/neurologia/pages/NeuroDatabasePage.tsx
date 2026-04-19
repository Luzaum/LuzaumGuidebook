import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { searchFindings } from '../data/neuroFindings/entries'

export function NeuroDatabasePage() {
  const [q, setQ] = useState('')
  const results = useMemo(() => searchFindings(q), [q])

  return (
    <div className="relative z-10 w-full space-y-6 pb-16">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Base neurológica</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Busque por achado (nome ou sinônimo). Cada cartão leva à página detalhada.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ex.: estrabismo, nistagmo, head tilt…"
          className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
        />
      </div>

      <div className="grid gap-3">
        {results.map((e) => (
          <Link
            key={e.id}
            to={`/neurologia/base-dados/${e.slug}`}
            className="rounded-2xl border border-border bg-card/80 p-4 transition hover:border-gold/40 hover:bg-card"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs font-medium text-gold">
                {e.category}
              </span>
            </div>
            <h2 className="mt-2 text-lg font-semibold text-foreground">{e.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{e.summary}</p>
          </Link>
        ))}
        {results.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">Nenhum resultado.</p>
        )}
      </div>
    </div>
  )
}
