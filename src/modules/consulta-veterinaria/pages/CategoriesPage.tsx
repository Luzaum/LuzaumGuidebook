import { useConsultaVetSnapshot } from '../hooks/useConsultaVetSnapshot'
import { CategoryCard } from '../components/category/CategoryCard'
import { LoadingSkeleton } from '../components/shared/LoadingSkeleton'
import { buildCategoryStats } from '../utils/selectors'

export function CategoriesPage() {
  const { snapshot, loading } = useConsultaVetSnapshot()

  return (
    <div className="space-y-6">
      <section className="consulta-vet-panel-strong rounded-[32px] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-800 dark:text-blue-200">Categorias</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">Mapa completo do conteúdo clínico</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Cada categoria agrega doença, consenso e medicamento, pronta para crescer sem retrabalho.
        </p>
      </section>

      {loading || !snapshot ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <LoadingSkeleton key={index} className="h-52 rounded-[28px]" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {snapshot.categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              stats={buildCategoryStats({
                categorySlug: category.slug,
                diseases: snapshot.diseases,
                consensuses: snapshot.consensuses,
                medications: snapshot.medications,
              })}
            />
          ))}
        </div>
      )}
    </div>
  )
}

