import { useConsultaVetSnapshot } from '../hooks/useConsultaVetSnapshot'
import { useRecents } from '../hooks/useRecents'
import { EmptyState } from '../components/shared/EmptyState'
import { RecentAccessList } from '../components/shared/RecentAccessList'

export function RecentsPage() {
  const { snapshot } = useConsultaVetSnapshot()
  const { recents } = useRecents()

  const items = snapshot
    ? recents
        .map((item) => {
          const disease = snapshot.diseases.find((entry) => entry.id === item.entityId)
          const consensus = snapshot.consensuses.find((entry) => entry.id === item.entityId)
          const medication = snapshot.medications.find((entry) => entry.id === item.entityId)
          if (disease) return { ...item, title: disease.title, subtitle: disease.quickSummary, href: `/consulta-veterinaria/doencas/${disease.slug}` }
          if (consensus) return { ...item, title: consensus.title, subtitle: consensus.summary, href: `/consulta-veterinaria/consensos/${consensus.slug}` }
          if (medication) return { ...item, title: medication.title, subtitle: medication.activeIngredient, href: `/consulta-veterinaria/medicamentos/${medication.slug}` }
          return null
        })
        .filter(Boolean)
    : []

  return (
    <div className="space-y-6">
      <section className="consulta-vet-panel-strong rounded-[32px] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-800 dark:text-blue-200">Recentes</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">Últimos acessos e continuidade de leitura</h1>
      </section>

      {items.length ? (
        <RecentAccessList items={items as any} />
      ) : (
        <EmptyState
          title="Sem acessos recentes"
          description="Entre na doença seed, no consenso em PDF e na página do medicamento para validar o fluxo completo."
        />
      )}
    </div>
  )
}
