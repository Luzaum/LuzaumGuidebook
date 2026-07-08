import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { searchFindings } from '../../neurologia/data/neuroFindings/entries'

export function NeuroMobileDatabaseScreen() {
  const [q, setQ] = useState('')
  const results = useMemo(() => searchFindings(q), [q])

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground">Base Neurológica</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Busque achados clínicos, reflexos, ataxias e termos neurológicos.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar estrabismo, reflexo pupilar, nistagmo..."
          className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
        />
      </div>

      {/* Results List */}
      <div className="space-y-2.5">
        {results.map((e) => (
          <Link
            key={e.id}
            to={`/neuro-mobile/base-dados/${e.slug}`}
            className="block border border-border bg-card/65 rounded-xl p-3.5 active:bg-muted active:scale-[0.99] transition-all nm-fade-in"
          >
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[9px] font-bold tracking-wide uppercase text-gold">
                {e.category}
              </span>
            </div>
            <h3 className="mt-2 text-sm font-bold text-foreground leading-tight">{e.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">{e.summary}</p>
          </Link>
        ))}
        {results.length === 0 && (
          <p className="text-center text-xs text-muted-foreground py-6">Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  )
}
