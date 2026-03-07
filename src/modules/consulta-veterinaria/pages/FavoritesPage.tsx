import { useConsultaVetSnapshot } from '../hooks/useConsultaVetSnapshot'
import { useFavorites } from '../hooks/useFavorites'
import { ConsensusCard } from '../components/consensus/ConsensusCard'
import { DiseaseCard } from '../components/disease/DiseaseCard'
import { MedicationCard } from '../components/medication/MedicationCard'
import { EmptyState } from '../components/shared/EmptyState'
import { buildFavoriteIdSet } from '../utils/selectors'

export function FavoritesPage() {
  const { snapshot } = useConsultaVetSnapshot()
  const { favorites, toggleFavorite } = useFavorites()
  const favoriteIds = buildFavoriteIdSet(favorites)

  if (!snapshot) return null

  const diseases = snapshot.diseases.filter((item) => favoriteIds.has(item.id))
  const consensuses = snapshot.consensuses.filter((item) => favoriteIds.has(item.id))
  const medications = snapshot.medications.filter((item) => favoriteIds.has(item.id))

  return (
    <div className="space-y-6">
      <section className="consulta-vet-panel-strong rounded-[32px] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-800 dark:text-blue-200">Favoritos</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">Itens salvos para revisão rápida</h1>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Doenças favoritas</h2>
        {diseases.length ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {diseases.map((disease) => (
              <DiseaseCard
                key={disease.id}
                disease={disease}
                isFavorite
                onToggleFavorite={() => toggleFavorite('disease', disease.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="Sem doenças favoritas" description="Abra a cinomose e use o botão de favorito para testar." />
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Consensos favoritos</h2>
        {consensuses.length ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {consensuses.map((consensus) => (
              <ConsensusCard
                key={consensus.id}
                consensus={consensus}
                isFavorite
                onToggleFavorite={() => toggleFavorite('consensus', consensus.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="Sem consensos favoritos" description="Favoritar o consenso seed faz este bloco aparecer." />
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Medicamentos favoritos</h2>
        {medications.length ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {medications.map((medication) => (
              <MedicationCard
                key={medication.id}
                medication={medication}
                isFavorite
                onToggleFavorite={() => toggleFavorite('medication', medication.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="Sem medicamentos favoritos" description="Marque um medicamento demo para validar o agrupamento local." />
        )}
      </section>
    </div>
  )
}

