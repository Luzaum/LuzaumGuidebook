import React, { useEffect, useMemo, useState } from 'react';
import { Bookmark, FileText, Pill, Stethoscope } from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { EntityCard } from '../components/shared/EntityCard';
import { useFavorites } from '../hooks/useFavorites';
import { getConsensoRepository } from '../services/consensoRepository';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { getMedicationRepository } from '../services/medicationRepository';
import { ConsensusRecord } from '../types/consenso';
import { DiseaseRecord } from '../types/disease';
import { MedicationRecord } from '../types/medication';
import { formatSpeciesList } from '../utils/navigation';

const UI_TEXT = {
  eyebrow: 'Sua biblioteca',
  title: 'Favoritos',
  body: 'Acesso r\u00e1pido aos conte\u00fados que voc\u00ea salvou para consulta recorrente.',
  emptyTitle: 'Nenhum favorito salvo',
  emptyBody: 'Use o marcador nos cards e p\u00e1ginas de detalhe para montar sua biblioteca r\u00e1pida.',
  noOrganization: 'Sem organiza\u00e7\u00e3o',
  diseases: 'Doen\u00e7as',
  medications: 'Medicamentos',
  consensos: 'Consensos',
} as const;

export function FavoritesPage() {
  const diseaseRepository = useMemo(() => getDiseaseRepository(), []);
  const medicationRepository = useMemo(() => getMedicationRepository(), []);
  const consensoRepository = useMemo(() => getConsensoRepository(), []);
  const { favorites } = useFavorites();

  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [consensos, setConsensos] = useState<ConsensusRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [loadedDiseases, loadedMedications, loadedConsensos] = await Promise.all([
          diseaseRepository.list(),
          medicationRepository.list(),
          consensoRepository.list(),
        ]);

        if (!isMounted) return;

        setDiseases(
          loadedDiseases.filter((item) =>
            favorites.some((favorite) => favorite.entityType === 'disease' && favorite.entityId === item.id)
          )
        );
        setMedications(
          loadedMedications.filter((item) =>
            favorites.some((favorite) => favorite.entityType === 'medication' && favorite.entityId === item.id)
          )
        );
        setConsensos(
          loadedConsensos.filter((item) =>
            favorites.some((favorite) => favorite.entityType === 'consensus' && favorite.entityId === item.id)
          )
        );
      } catch (loadError) {
        if (!isMounted) return;
        setDiseases([]);
        setMedications([]);
        setConsensos([]);
        setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar favoritos.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [consensoRepository, diseaseRepository, favorites, medicationRepository]);

  return (
    <div className="mx-auto w-full max-w-[1560px] space-y-10 p-4 md:p-8">
      <ConsultaVetPageHero
        eyebrow={UI_TEXT.eyebrow}
        title={UI_TEXT.title}
        description={UI_TEXT.body}
        icon={Bookmark}
        accent="rose"
      />

      {isLoading ? (
        <div className="rounded-2xl border border-border bg-card py-16 text-center">
          <p className="text-muted-foreground">Carregando favoritos...</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-6 py-5">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card py-16 text-center">
          <Bookmark className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
          <h2 className="mb-2 text-lg font-medium text-foreground">{UI_TEXT.emptyTitle}</h2>
          <p className="text-muted-foreground">{UI_TEXT.emptyBody}</p>
        </div>
      ) : (
        <div className="space-y-10">
          {diseases.length > 0 && (
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                <Stethoscope className="h-5 w-5 text-primary" />
                {UI_TEXT.diseases}
              </h2>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {diseases.map((disease) => (
                  <EntityCard
                    key={disease.id}
                    to={`/consulta-vet/doencas/${disease.slug}`}
                    title={disease.title}
                    subtitle={`${disease.category} \u2022 ${formatSpeciesList(disease.species)}`}
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
                <Pill className="h-5 w-5 text-emerald-600" />
                {UI_TEXT.medications}
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
                <FileText className="h-5 w-5 text-violet-600" />
                {UI_TEXT.consensos}
              </h2>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {consensos.map((consenso) => (
                  <EntityCard
                    key={consenso.id}
                    to={`/consulta-vet/consensos/${consenso.slug}`}
                    title={consenso.title}
                    subtitle={`${consenso.organization || UI_TEXT.noOrganization}${consenso.year ? ` \u2022 ${consenso.year}` : ''}`}
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
