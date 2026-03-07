import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useConsultaVetSnapshot } from '../hooks/useConsultaVetSnapshot'
import { useFavorites } from '../hooks/useFavorites'
import { buildFavoriteIdSet } from '../utils/selectors'
import { MedicationCard } from '../components/medication/MedicationCard'
import { EmptyState } from '../components/shared/EmptyState'
import { LoadingSkeleton } from '../components/shared/LoadingSkeleton'

export function MedicationsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { snapshot, loading } = useConsultaVetSnapshot()
  const { favorites, toggleFavorite } = useFavorites()
  const favoriteIds = buildFavoriteIdSet(favorites.filter((item) => item.entityType === 'medication'))
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [speciesFilter, setSpeciesFilter] = useState('all')
  const [routeFilter, setRouteFilter] = useState('all')
  const [favoritesOnly, setFavoritesOnly] = useState(false)

  const medications = useMemo(() => {
    if (!snapshot) return []
    return snapshot.medications.filter((medication) => {
      const matchesQuery = !query || [medication.title, medication.activeIngredient, medication.tradeNames.join(' '), medication.tags.join(' ')].join(' ').toLowerCase().includes(query.toLowerCase())
      const matchesCategory = categoryFilter === 'all' || medication.category === categoryFilter
      const matchesSpecies = speciesFilter === 'all' || medication.species.includes(speciesFilter as any)
      const matchesRoute = routeFilter === 'all' || medication.routes.includes(routeFilter)
      const matchesFavorite = !favoritesOnly || favoriteIds.has(medication.id)
      return matchesQuery && matchesCategory && matchesSpecies && matchesRoute && matchesFavorite
    })
  }, [categoryFilter, favoriteIds, favoritesOnly, query, routeFilter, snapshot, speciesFilter])

  return (
    <div className="space-y-6">
      <section className="consulta-vet-panel-strong rounded-[32px] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-800 dark:text-blue-200">Medicamentos</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">Bulário inteligente para consulta rápida</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Busca por princípio ativo e nome comercial, com doses demonstrativas conectadas à doença seed.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="h-12 rounded-2xl border border-slate-200 bg-white/80 px-4 text-sm dark:border-slate-700 dark:bg-slate-950/80">
            <option value="all">Todas as categorias</option>
            {snapshot?.categories.map((category) => (
              <option key={category.id} value={category.slug}>{category.title}</option>
            ))}
          </select>
          <select value={speciesFilter} onChange={(event) => setSpeciesFilter(event.target.value)} className="h-12 rounded-2xl border border-slate-200 bg-white/80 px-4 text-sm dark:border-slate-700 dark:bg-slate-950/80">
            <option value="all">Todas as espécies</option>
            <option value="dog">Cão</option>
            <option value="cat">Gato</option>
          </select>
          <select value={routeFilter} onChange={(event) => setRouteFilter(event.target.value)} className="h-12 rounded-2xl border border-slate-200 bg-white/80 px-4 text-sm dark:border-slate-700 dark:bg-slate-950/80">
            <option value="all">Todas as vias</option>
            {[...new Set(snapshot?.medications.flatMap((item) => item.routes) || [])].map((route) => (
              <option key={route} value={route}>{route}</option>
            ))}
          </select>
          <button type="button" onClick={() => setFavoritesOnly((current) => !current)} className="rounded-2xl border border-slate-200 bg-white/80 px-4 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100">
            {favoritesOnly ? 'Mostrando favoritos' : 'Filtrar favoritos'}
          </button>
        </div>
      </section>

      {loading || !snapshot ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <LoadingSkeleton key={index} className="h-72 rounded-[28px]" />
          ))}
        </div>
      ) : medications.length ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {medications.map((medication) => (
            <MedicationCard
              key={medication.id}
              medication={medication}
              isFavorite={favoriteIds.has(medication.id)}
              onToggleFavorite={() => toggleFavorite('medication', medication.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhum medicamento encontrado"
          description="Busque por maropitant, diazepam ou ajuste os filtros por via e categoria."
        />
      )}
    </div>
  )
}

