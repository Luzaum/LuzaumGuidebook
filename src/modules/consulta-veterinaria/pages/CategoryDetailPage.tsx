import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useConsultaVetSnapshot } from '../hooks/useConsultaVetSnapshot'
import { useFavorites } from '../hooks/useFavorites'
import { buildCategoryStats, buildFavoriteIdSet } from '../utils/selectors'
import { CategoryOverviewHero } from '../components/category/CategoryOverviewHero'
import { ConsensusCard } from '../components/consensus/ConsensusCard'
import { DiseaseCard } from '../components/disease/DiseaseCard'
import { MedicationCard } from '../components/medication/MedicationCard'
import { EmptyState } from '../components/shared/EmptyState'

export function CategoryDetailPage() {
  const { slug = '' } = useParams()
  const { snapshot } = useConsultaVetSnapshot()
  const { favorites, toggleFavorite } = useFavorites()
  const favoriteIds = buildFavoriteIdSet(favorites)

  const category = snapshot?.categories.find((item) => item.slug === slug)
  const related = useMemo(() => {
    if (!snapshot) return { diseases: [], consensuses: [], medications: [] }
    return {
      diseases: snapshot.diseases.filter((item) => item.category === slug),
      consensuses: snapshot.consensuses.filter((item) => item.category === slug),
      medications: snapshot.medications.filter((item) => item.category === slug),
    }
  }, [slug, snapshot])

  if (!snapshot || !category) {
    return (
      <EmptyState
        title="Categoria não encontrada"
        description="Verifique a rota ou volte para a listagem principal de categorias."
      />
    )
  }

  const stats = buildCategoryStats({
    categorySlug: slug,
    diseases: snapshot.diseases,
    consensuses: snapshot.consensuses,
    medications: snapshot.medications,
  })

  return (
    <div className="space-y-6">
      <CategoryOverviewHero category={category} stats={stats} />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Doenças</h2>
        {related.diseases.length ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {related.diseases.map((disease) => (
              <DiseaseCard
                key={disease.id}
                disease={disease}
                isFavorite={favoriteIds.has(disease.id)}
                onToggleFavorite={() => toggleFavorite('disease', disease.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="Sem doenças nesta categoria" description="A arquitetura já está pronta para receber novos conteúdos." />
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Consensos</h2>
        {related.consensuses.length ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {related.consensuses.map((consensus) => (
              <ConsensusCard
                key={consensus.id}
                consensus={consensus}
                isFavorite={favoriteIds.has(consensus.id)}
                onToggleFavorite={() => toggleFavorite('consensus', consensus.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="Sem consensos nesta categoria" description="Associe PDFs e resumos quando a curadoria estiver pronta." />
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Medicamentos</h2>
        {related.medications.length ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {related.medications.map((medication) => (
              <MedicationCard
                key={medication.id}
                medication={medication}
                isFavorite={favoriteIds.has(medication.id)}
                onToggleFavorite={() => toggleFavorite('medication', medication.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="Sem medicamentos nesta categoria" description="O módulo já aceita novas apresentações, doses e relações futuras." />
        )}
      </section>
    </div>
  )
}
