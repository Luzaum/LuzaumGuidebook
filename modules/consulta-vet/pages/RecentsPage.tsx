import React, { useEffect, useMemo, useState } from 'react';
import { Clock, FileText, Pill, Stethoscope } from 'lucide-react';
import { EntityCard } from '../components/shared/EntityCard';
import { useRecents } from '../hooks/useRecents';
import { getConsensoRepository } from '../services/consensoRepository';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { getMedicationRepository } from '../services/medicationRepository';
import { buildResumeState, formatSpeciesList } from '../utils/navigation';

type RecentItem = {
  entityType: 'disease' | 'medication' | 'consensus';
  entityId: string;
  visitedAt: string;
  pageNumber?: number;
  sectionId?: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
};

const UI_TEXT = {
  title: 'Recentes',
  body: 'Retome rapidamente os \u00faltimos conte\u00fados acessados e continue do ponto em que parou.',
  emptyTitle: 'Nenhum hist\u00f3rico recente',
  emptyBody: 'Seus \u00faltimos acessos aparecer\u00e3o aqui conforme voc\u00ea navega no m\u00f3dulo.',
  noOrganization: 'Sem organiza\u00e7\u00e3o',
} as const;

export function RecentsPage() {
  const diseaseRepository = useMemo(() => getDiseaseRepository(), []);
  const medicationRepository = useMemo(() => getMedicationRepository(), []);
  const consensoRepository = useMemo(() => getConsensoRepository(), []);
  const { recents } = useRecents();
  const [items, setItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [loadedDiseases, loadedMedications, loadedConsensos] = await Promise.all([
        diseaseRepository.list(),
        medicationRepository.list(),
        consensoRepository.list(),
      ]);

      const nextItems = recents
        .map((recent) => {
          if (recent.entityType === 'disease') {
            const found = loadedDiseases.find((item) => item.id === recent.entityId);
            if (!found) return null;

            return {
              ...recent,
              slug: found.slug,
              title: found.title,
              subtitle: `${found.category} \u2022 ${formatSpeciesList(found.species)}`,
              description: found.quickSummary,
            } satisfies RecentItem;
          }

          if (recent.entityType === 'medication') {
            const found = loadedMedications.find((item) => item.id === recent.entityId);
            if (!found) return null;

            return {
              ...recent,
              slug: found.slug,
              title: found.title,
              subtitle: found.pharmacologicClass,
              description: found.indications.join(', '),
            } satisfies RecentItem;
          }

          const found = loadedConsensos.find((item) => item.id === recent.entityId);
          if (!found) return null;

          return {
            ...recent,
            slug: found.slug,
            title: found.title,
            subtitle: `${found.organization || UI_TEXT.noOrganization}${found.year ? ` \u2022 ${found.year}` : ''}`,
            description: found.description || '',
          } satisfies RecentItem;
        })
        .filter(Boolean) as RecentItem[];

      setItems(nextItems);
    };

    void loadData();
  }, [consensoRepository, diseaseRepository, medicationRepository, recents]);

  return (
    <div className="mx-auto w-full max-w-[1560px] space-y-8 p-4 md:p-8">
      <section className="rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">{UI_TEXT.title}</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{UI_TEXT.body}</p>
          </div>
        </div>
      </section>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card py-16 text-center">
          <Clock className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
          <h2 className="mb-2 text-lg font-medium text-foreground">{UI_TEXT.emptyTitle}</h2>
          <p className="text-muted-foreground">{UI_TEXT.emptyBody}</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            if (item.entityType === 'disease') {
              return (
                <EntityCard
                  key={`${item.entityType}-${item.entityId}`}
                  to={`/consulta-vet/doencas/${item.slug}`}
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                  icon={<Stethoscope className="h-5 w-5 text-primary" />}
                  entityType="disease"
                  entityId={item.entityId}
                  linkState={buildResumeState(item)}
                />
              );
            }

            if (item.entityType === 'medication') {
              return (
                <EntityCard
                  key={`${item.entityType}-${item.entityId}`}
                  to={`/consulta-vet/medicamentos/${item.slug}`}
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                  icon={<Pill className="h-5 w-5 text-emerald-600" />}
                  entityType="medication"
                  entityId={item.entityId}
                  linkState={buildResumeState(item)}
                />
              );
            }

            return (
              <EntityCard
                key={`${item.entityType}-${item.entityId}`}
                to={`/consulta-vet/consensos/${item.slug}`}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                icon={<FileText className="h-5 w-5 text-violet-600" />}
                entityType="consensus"
                entityId={item.entityId}
                linkState={buildResumeState(item)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
