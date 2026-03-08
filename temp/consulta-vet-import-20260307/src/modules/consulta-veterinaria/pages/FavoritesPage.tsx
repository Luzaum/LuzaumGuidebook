import React, { useEffect, useState } from 'react';
import { Bookmark, Stethoscope, Pill, FileText } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { diseaseRepository } from '../services/adapters/local/localDiseaseRepository';
import { medicationRepository } from '../services/adapters/local/localMedicationRepository';
import { consensoRepository } from '../services/adapters/local/localConsensoRepository';
import { DiseaseRecord } from '../types/disease';
import { MedicationRecord } from '../types/medication';
import { ConsensusRecord } from '../types/consenso';
import { EntityCard } from '../components/shared/EntityCard';

export function FavoritesPage() {
  const { favorites } = useFavorites();
  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [consensos, setConsensos] = useState<ConsensusRecord[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const d = await diseaseRepository.list();
      const m = await medicationRepository.list();
      const c = await consensoRepository.list();

      setDiseases(d.filter((item) => favorites.some((f) => f.entityType === 'disease' && f.entityId === item.id)));
      setMedications(m.filter((item) => favorites.some((f) => f.entityType === 'medication' && f.entityId === item.id)));
      setConsensos(c.filter((item) => favorites.some((f) => f.entityType === 'consensus' && f.entityId === item.id)));
    };
    loadData();
  }, [favorites]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2 flex items-center gap-3">
          <Bookmark className="w-8 h-8 text-rose-600 dark:text-rose-400" />
          Meus Favoritos
        </h1>
        <p className="text-muted-foreground">Acesso rápido aos seus conteúdos salvos.</p>
      </header>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-3xl border border-border">
          <Bookmark className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <h2 className="text-lg font-medium text-foreground mb-2">Nenhum favorito ainda</h2>
          <p className="text-muted-foreground">Navegue pelo módulo e clique no ícone de marcador para salvar conteúdos aqui.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {diseases.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2 mb-6">
                <Stethoscope className="w-5 h-5 text-primary" /> Doenças
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {diseases.map((d) => (
                  <EntityCard
                    key={d.id}
                    to={`/consulta-veterinaria/doencas/${d.slug}`}
                    title={d.title}
                    subtitle={d.category}
                    description={d.quickSummary}
                    tags={d.tags}
                    entityType="disease"
                    entityId={d.id}
                  />
                ))}
              </div>
            </section>
          )}

          {medications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2 mb-6">
                <Pill className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Medicamentos
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {medications.map((m) => (
                  <EntityCard
                    key={m.id}
                    to={`/consulta-veterinaria/medicamentos/${m.slug}`}
                    title={m.title}
                    subtitle={m.pharmacologicClass}
                    description={m.indications.join(', ')}
                    tags={m.tags}
                    entityType="medication"
                    entityId={m.id}
                  />
                ))}
              </div>
            </section>
          )}

          {consensos.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" /> Consensos
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {consensos.map((c) => (
                  <EntityCard
                    key={c.id}
                    to={`/consulta-veterinaria/consensos/${c.slug}`}
                    title={c.title}
                    subtitle={`${c.sourceOrganization} • ${c.year}`}
                    description={c.summary}
                    tags={c.tags}
                    entityType="consensus"
                    entityId={c.id}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
