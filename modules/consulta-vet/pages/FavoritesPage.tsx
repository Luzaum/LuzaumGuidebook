import React, { useEffect, useMemo, useState } from 'react';
import { Bookmark, Stethoscope, Pill, FileText } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { diseaseRepository } from '../services/adapters/local/localDiseaseRepository';
import { medicationRepository } from '../services/adapters/local/localMedicationRepository';
import { DiseaseRecord } from '../types/disease';
import { MedicationRecord } from '../types/medication';
import { ConsensusRecord } from '../types/consenso';
import { EntityCard } from '../components/shared/EntityCard';
import { getConsensoRepository } from '../services/consensoRepository';

export function FavoritesPage() {
  const consensoRepository = useMemo(() => getConsensoRepository(), []);
  const { favorites } = useFavorites();
  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [consensos, setConsensos] = useState<ConsensusRecord[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const loadedDiseases = await diseaseRepository.list();
      const loadedMedications = await medicationRepository.list();
      const loadedConsensos = await consensoRepository.list();

      setDiseases(loadedDiseases.filter((item) => favorites.some((f) => f.entityType === 'disease' && f.entityId === item.id)));
      setMedications(loadedMedications.filter((item) => favorites.some((f) => f.entityType === 'medication' && f.entityId === item.id)));
      setConsensos(loadedConsensos.filter((item) => favorites.some((f) => f.entityType === 'consensus' && f.entityId === item.id)));
    };
    void loadData();
  }, [favorites, consensoRepository]);

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-10 p-4 md:p-8">
      <header>
        <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-foreground">
          <Bookmark className="h-8 w-8 text-rose-600 dark:text-rose-400" />
          Favoritos
        </h1>
        <p className="text-muted-foreground">Acesso rápido aos conteúdos que você salvou.</p>
      </header>

      {favorites.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card py-16 text-center">
          <Bookmark className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
          <h2 className="mb-2 text-lg font-medium text-foreground">Nenhum favorito salvo</h2>
          <p className="text-muted-foreground">Use o ícone de marcador para salvar conteúdos.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {diseases.length > 0 && (
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                <Stethoscope className="h-5 w-5 text-primary" />
                Doenças
              </h2>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {diseases.map((disease) => (
                  <EntityCard
                    key={disease.id}
                    to={`/consulta-vet/doencas/${disease.slug}`}
                    title={disease.title}
                    subtitle={disease.category}
                    description={disease.quickSummary}
                    entityType="disease"
                    entityId={disease.id}
                  />
                ))}
              </div>
            </section>
          )}

          {medications.length > 0 && (
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                <Pill className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                Medicamentos
              </h2>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {medications.map((medication) => (
                  <EntityCard
                    key={medication.id}
                    to={`/consulta-vet/medicamentos/${medication.slug}`}
                    title={medication.title}
                    subtitle={medication.pharmacologicClass}
                    description={medication.indications.join(', ')}
                    entityType="medication"
                    entityId={medication.id}
                  />
                ))}
              </div>
            </section>
          )}

          {consensos.length > 0 && (
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                <FileText className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                Consensos
              </h2>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {consensos.map((consenso) => (
                  <EntityCard
                    key={consenso.id}
                    to={`/consulta-vet/consensos/${consenso.slug}`}
                    title={consenso.title}
                    subtitle={`${consenso.organization || 'Sem organização'}${consenso.year ? ` • ${consenso.year}` : ''}`}
                    description={consenso.description || ''}
                    entityType="consensus"
                    entityId={consenso.id}
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
